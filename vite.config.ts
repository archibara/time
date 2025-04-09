import {ConfigEnv, defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react-swc';
// import {vitePluginPwa} from './src/server/vite-plugin-pwa';

type ServerEnv = {
  SERVER_ALLOWED_HOSTS: string;
};

export default (params: ConfigEnv) => {
  const env = loadEnv(params.mode, process.cwd(), '') as unknown as ServerEnv;
  return defineConfig({
    base: '/time',
    server: {
      allowedHosts: Boolean(env.SERVER_ALLOWED_HOSTS) || undefined,
    },
    build: {
      rollupOptions: {
        input: {
          edit: 'edit.html',
          view: 'index.html',
        },
      },
    },
    plugins: [
      react(),
      // vitePluginPwa,
    ],
  });
};
