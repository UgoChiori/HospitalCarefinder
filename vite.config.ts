/// <reference types="vitest" />
/// <reference types="vite/client" />



import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdPlugin from "vite-plugin-md";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mdPlugin({
      wrapperComponent: "div",
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
        breaks: true,
      },
    }),
  ],

  assetsInclude: ["**/*.md"],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./src/test/setup.ts",

  }

 
});


