import {minimal2023Preset} from '@vite-pwa/assets-generator/config';
import {VitePWA} from 'vite-plugin-pwa';

export const vitePluginPwa = VitePWA({
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
    scope: '/',
    start_url: '/',
  },
  devOptions: {
    enabled: true,
  },
});
