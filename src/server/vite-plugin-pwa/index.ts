import {minimal2023Preset} from '@vite-pwa/assets-generator/config';
import {VitePWA} from 'vite-plugin-pwa';

export const vitePluginPwa = VitePWA({
  workbox: {
    // by default use edit.html
    navigateFallback: '/time/edit.html',
    // TODO: fix notifications:
    // importScripts: ['./src/view/notifications-sw.js'],
  },
  pwaAssets: {
    preset: {
      ...minimal2023Preset,
      apple: {
        ...minimal2023Preset.apple,
        resizeOptions: {
          background: '#00001A',
        },
      },
      maskable: {
        ...minimal2023Preset.maskable,
        resizeOptions: {
          background: '#00001A',
        },
      },
      transparent: {
        ...minimal2023Preset.transparent,
        resizeOptions: {
          background: '#00001A',
        },
      },
    },
    image: 'public/logo.png',
  },
  registerType: 'autoUpdate',
  includeAssets: ['**/*'],
  manifest: {
    theme_color: '#00001A',
    background_color: '#00001A',
    scope: '/time',
    start_url: '/time',
  },
  devOptions: {
    enabled: true,
  },
});
