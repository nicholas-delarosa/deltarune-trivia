# Deploy de la Trivia DELTARUNE

El proyecto se compila con **Vite** y se publica en dos lugares con cada push a `main`:

| Destino | URL | Workflow |
|---|---|---|
| Azure App Service (Linux, Node 24) | https://app-deltarune-trivia-hgezb2hgdea7avhn.brazilsouth-01.azurewebsites.net/ | `.github/workflows/main_app-deltarune-trivia.yml` |
| GitHub Pages | https://nicholas-delarosa.github.io/deltarune-trivia/ | `.github/workflows/deploy-pages.yml` |

---

## Qué se hizo, paso a paso

### 1. Arreglo del error de build (`ASSIGN_TO_IMPORT`)

`npm run build` fallaba con `Cannot assign to import 'puntaje'`. En JavaScript, una variable importada es de solo lectura, así que `main.js` no puede hacer `puntaje--` sobre un valor que viene de `juego.js`.

- La lógica de restar el punto al tocar "Anterior" se movió a `retrocederPregunta()` en `assets/js/juego.js`, que es el archivo donde vive `puntaje`.
- `main.js` ahora solo llama a `retrocederPregunta()`.

### 2. Rutas de archivos que se cargan por código

`preguntas.json` y las 3 músicas de fondo se cargaban con rutas en texto (`'assets/js/preguntas.json'`). Vite no detecta esas rutas, así que no las copiaba a `dist/`. Se cambiaron a:

```js
new URL('./preguntas.json', import.meta.url)
new URL('../audio/trash.mp3', import.meta.url).href
```

Con esa forma Vite las incluye en el build, y el `index.html` sigue funcionando si se abre sin Vite.

### 3. Configuración de Vite y del proyecto

- **`vite.config.js`**: `base: './'`. Las rutas quedan relativas, así que el sitio funciona tanto en la raíz (Azure) como en `/deltarune-trivia/` (GitHub Pages).
- **`package.json`**: scripts `dev`, `build` y `preview`, y `"type": "module"`.
- **`public/web.config`**: Vite lo copia a `dist/`. Solo se usaría si el App Service fuera Windows (IIS). En Linux no molesta.
- **`.gitignore`**: se volvió a ignorar `dist/`, que es el resultado del build. No se versiona porque lo generan los workflows.

### 4. GitHub Pages

- Se agregó `.github/workflows/deploy-pages.yml`. Hace `npm ci`, `npm run build` y publica `dist/` en Pages.
- En el repo, en **Settings → Pages → Source**, tiene que estar seleccionado **GitHub Actions**.

### 5. Azure App Service (`app-deltarune-trivia`)

Todo esto se hizo en portal.azure.com:

1. **Configuración → Configuración general → "Credenciales de publicación de autenticación básica de SCM"** se activó. Sin esto, el Centro de implementación no deja usar "Autenticación básica" y el botón Guardar queda deshabilitado.
2. **Configuración → Configuración de la pila → Comando de inicio**:
   ```
   pm2 serve /home/site/wwwroot --no-daemon --spa
   ```
   Un App Service Linux con Node no sirve archivos estáticos por sí solo. `pm2` (ya viene instalado) sirve la carpeta del sitio.
3. **Centro de implementación**:
   - Origen: **GitHub**. Organización `nicholas-delarosa`, repositorio `deltarune-trivia`, rama `main`.
   - Opción de flujo de trabajo: **Agregar un flujo de trabajo**.
   - Tipo de autenticación: **Autenticación básica**.
   - **Guardar**. Azure commiteó `.github/workflows/main_app-deltarune-trivia.yml` y guardó el perfil de publicación como secreto del repo (`AZUREAPPSERVICE_PUBLISHPROFILE_...`).
4. La app estaba **Detenida** y se inició desde **Introducción → Inicio**.
5. El workflow que generó Azure subía el repo entero, con `node_modules` incluido. Se modificó para que haga `npm ci` y `npm run build` y suba **solo `dist/`**.

> El aviso "Ahora se encuentra en el espacio de producción, lo que no se recomienda para la configuración de CI/CD" es solo una recomendación de usar slots de staging. Se puede ignorar.

---

## Qué hacer cuando subas cambios nuevos

### Flujo normal

1. Hacé los cambios en el código (`index.html`, `assets/...`).
2. Probalo en local:
   ```bash
   npm run dev        # servidor de desarrollo con recarga automática
   ```
3. Antes de subir, verificá que el build compila:
   ```bash
   npm run build      # si falla acá, también va a fallar en GitHub
   npm run preview    # sirve dist/ en http://localhost:4173 para probar la versión final
   ```
4. Commit y push a `main`:
   ```bash
   git add .
   git commit -m "Descripción del cambio"
   git push
   ```
5. Listo. El push dispara los dos workflows. Podés seguirlos en la pestaña **Actions** del repo. En 1 a 3 minutos el cambio está en Azure y en Pages.

### Reglas para que no se rompa el build

- **No modifiques variables importadas.** Si necesitás cambiar un valor de `juego.js` desde `main.js`, creá una función en `juego.js` que lo haga (como `retrocederPregunta()` o `reiniciarEstadoJuego()`) y llamala desde `main.js`.
- **Archivos que se cargan por código** (con `fetch`, `new Audio()` o `.src = ...`): usá `new URL('ruta/relativa', import.meta.url)` para que Vite los incluya. Los que están en el HTML (`<img src>`, `<audio src>`, `<link>`) Vite los detecta solo.
- **Archivos que no se importan por ningún lado** pero tienen que estar en el sitio: ponelos en `public/`. Vite los copia tal cual a la raíz de `dist/`.
- **No subas `dist/` ni `node_modules/`.** Ya están en `.gitignore`.
- Si instalás una dependencia nueva (`npm install algo`), commiteá también `package-lock.json`. El workflow usa `npm ci`, que necesita el lock actualizado.

### Si algo falla

| Síntoma | Qué revisar |
|---|---|
| El workflow sale en rojo en **Actions** | Abrí el run y mirá el paso que falló. Casi siempre es `npm run build`: corré `npm run build` en local y vas a ver el mismo error. |
| Azure muestra la página por defecto ("Your web app is running...") | Revisá que el **Comando de inicio** siga siendo `pm2 serve /home/site/wwwroot --no-daemon --spa` y reiniciá la app. |
| Azure no responde | Revisá en **Introducción** que el estado sea "En ejecución". Si dice "Detenido", dale a **Inicio**. |
| El deploy a Azure falla con error de autenticación (401) | Alguien desactivó la autenticación básica de SCM o se regeneró el perfil de publicación. Reactivala en Configuración general, o descargá el perfil nuevo (**Descargar perfil de publicación**) y actualizá el secreto `AZUREAPPSERVICE_PUBLISHPROFILE_...` en GitHub (**Settings → Secrets and variables → Actions**). |
| Pages muestra la versión vieja o el README | Revisá que en **Settings → Pages** el Source sea **GitHub Actions**. |
| Falta un sonido o las preguntas en producción, pero en `npm run dev` andan | Ese archivo se carga con una ruta en texto. Pasalo a `new URL(..., import.meta.url)` o movelo a `public/`. |
