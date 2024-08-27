import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from "@originjs/vite-plugin-federation";

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    federation({name: "app",
    remotes: {
      chat: "http://localhost:5002/chat/assets/remoteEntry.js",
    },
    shared: ["react",
      "react-dom",
      "react-router-dom"],
  }),
],
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/lib/utils': path.resolve(__dirname, 'src/lib/utils'),
    },
  },
  target: "esnext", // Ensures compatibility with the latest JavaScript features

});
