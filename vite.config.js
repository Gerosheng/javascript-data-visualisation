import { defineConfig } from 'vite'
// https://vitejs.dev/config/
export default defineConfig({
    base: "/javascript-data-visualisation/",
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    server: {
        proxy: {
        '/api': {
            target: process.env.NODE_ENV === 'production'
            ? 'https://canvasjs.com/services/data/datapoints.php'
            : 'https://canvasjs.com/services/data/datapoints.php', // Replace with the base URL of the external API
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '/services/data/datapoints.php'),
        },
        },
    },

  
});