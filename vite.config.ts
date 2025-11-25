import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: './', // Меняем на относительные пути!
    build: {
        outDir: 'dist',
        assetsDir: 'assets'
    }
})