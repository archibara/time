import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        edit: 'edit.html',
        view: 'index.html',
      },
    },
  },
  plugins: [react()],
});
