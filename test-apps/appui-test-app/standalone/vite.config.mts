import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          // copy assets from `@itwin` dependencies
          src: "./node_modules/@itwin/*/lib/public/*",
          dest: ".",
        },
        {
          // copy localization files
          src: "./lib/locales",
          dest: ".",
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      {
        find: "~@itwin/appui-react",
        replacement: "@itwin/appui-react",
      },
      {
        find: "~@itwin/core-react",
        replacement: "@itwin/core-react",
      },
    ],
  },
  envPrefix: "IMJS_",
  server: {
    port: 3000,
    strictPort: true,
  },
});
