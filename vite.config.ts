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
 
});


