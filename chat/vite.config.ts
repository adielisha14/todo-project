import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/chat",
  plugins: [
    react(),
    federation({
      name: "chat",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
      },
      shared: ["react",
        "react-dom",
        "react-router-dom"],
    }),
  ], 
  build: {
    target: "esnext", // Set the target environment to esnext
  },

})
