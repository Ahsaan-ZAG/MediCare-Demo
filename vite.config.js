import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));

const PAGE_ENTRIES = [
  'index', 'about', 'departments', 'doctors', 'doctor-details',
  'department-details', 'services', 'facilities', 'appointment',
  'blog', 'blog-details', 'gallery', 'contact', 'faq',
  'privacy-policy', '404'
];

const input = Object.fromEntries(
  PAGE_ENTRIES
    .filter((name) => existsSync(resolve(root, `${name}.html`)))
    .map((name) => [name, resolve(root, `${name}.html`)])
);

export default defineConfig({
  root,
  base: './', // Offline file:// ya local server ke liye zaroori hai
  server: { port: 5173, open: true },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate', // Khud-ba-khud update karega
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'], // In tamam files ko cache karega
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: 'MediCare Hospital Demo',
        short_name: 'MediCare',
        description: 'Premium 3D Glassmorphism Healthcare Demo',
        theme_color: '#061918',
        background_color: '#061918',
        display: 'standalone',
        start_url: './index.html',
        icons: [
          {
            src: './favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      input,
      output: {
        manualChunks: {
          three: ['three'],
          gsap: ['gsap']
        }
      }
    }
  }
});