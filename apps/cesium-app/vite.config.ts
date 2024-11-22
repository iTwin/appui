/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

const cesiumSource = "node_modules/cesium/Build/Cesium";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    CESIUM_BASE_URL: JSON.stringify(`/`),
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: `${cesiumSource}/ThirdParty`, dest: "." },
        { src: `${cesiumSource}/Workers`, dest: "." },
        { src: `${cesiumSource}/Assets`, dest: "." },
        { src: `${cesiumSource}/Widgets`, dest: "." },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
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
});
