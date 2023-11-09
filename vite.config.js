import { defineConfig } from 'vite'
// https://vitejs.dev/config/
export default defineConfig({
    base: "/javascript-data-visualisation-exercise/",
    server: {
        proxy: {
        '/api': {
            target: 'https://canvasjs.com/services/data/datapoints.php', // Replace with the base URL of the external API
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '/services/data/datapoints.php'),
        },
        },
    },

  
});