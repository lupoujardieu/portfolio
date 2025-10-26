import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
    return {
        server: {
            host: true
        },
        publicDir: "./public",
        build:
            {
                outDir: "./dist", // Output in the dist/ folder
                emptyOutDir: true, // Empty the folder first
                sourcemap: true // Add sourcemap
            },
        plugins: [react()],
    }
})
