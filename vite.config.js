import { defineConfig } from 'vite';

export default defineConfig({
    // Rutas relativas: funciona en GitHub Pages (/deltarune-trivia/) y en Azure (raíz)
    base: './',
    build: {
        outDir: 'dist',
    },
});
