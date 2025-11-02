import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
   base: './',
   build: {
      outDir: 'dist',
   },
   optimizeDeps: {
      include: ['react-fast-marquee']
   },
   plugins: [
      react(),
      VitePWA({
         registerType: 'prompt',
         includeAssets: ['favicon.ico', 'logo.svg', '/logo/*.png'],
         manifest: {
            name: 'Meta',
            short_name: 'Meta',
            description: 'Ứng dụng Meta',
            theme_color: '#4a90e2',
            background_color: '#ffffff',
            start_url: '/',
            display: 'standalone',
            icons: [
               {
                  src: '/logo.svg',
                  sizes: '192x192 512x512',
                  type: 'image/svg+xml',
                  purpose: 'any maskable'
               }
            ]
         },
         workbox: {
            runtimeCaching: [
               {
                  urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                  handler: 'CacheFirst',
                  options: {
                     cacheName: 'google-fonts-cache',
                     expiration: {
                        maxEntries: 10,
                        maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
                     },
                     cacheableResponse: {
                        statuses: [0, 200]
                     }
                  }
               },
               {
                  urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
                  handler: 'CacheFirst',
                  options: {
                     cacheName: 'images-cache',
                     expiration: {
                        maxEntries: 50,
                        maxAgeSeconds: 60 * 60 * 24 * 30 // <== 30 days
                     }
                  }
               },
               {
                  urlPattern: /^https:\/\/api\.*/i,
                  handler: 'NetworkFirst',
                  options: {
                     cacheName: 'api-cache',
                     expiration: {
                        maxEntries: 10,
                        maxAgeSeconds: 60 * 60 // <== 1 hour
                     },
                     networkTimeoutSeconds: 10
                  }
               }
            ]
         },
         devOptions: {
            // bật tắt cái pwa
            enabled: false,
            type: 'module',
            navigateFallback: 'index.html'
         }
      })
   ],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
      },
   },
   server: {
      port: 3000,
      open: true,
      host: '0.0.0.0',
      strictPort: true,
      proxy: {
         '/api': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            secure: false,
         }
      },
   },
}); 