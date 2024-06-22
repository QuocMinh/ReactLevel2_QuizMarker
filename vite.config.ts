import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@api", replacement: resolve(__dirname, "src/api") },
      { find: "@components", replacement: resolve(__dirname, "src/components"), },
      { find: "@constants", replacement: resolve(__dirname, "src/constants") },
      { find: "@models", replacement: resolve(__dirname, "src/models") },
      { find: "@partials", replacement: resolve(__dirname, "src/partials") },
    ],
  },
});
