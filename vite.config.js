import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  base: "/art-gallery-frontend/",

  server: {
    proxy: {
      "/met": {
        target: "https://collectionapi.metmuseum.org",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/met/, ""),
      },
    },
  },
});
