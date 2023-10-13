/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineConfig } from "vite";
import {
  esbuildCommonjs,
  viteCommonjs,
  Options,
} from "@originjs/vite-plugin-commonjs";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// Fixes: ReferenceError: require is not defined
function fixedViteCommonjs(options: Options) {
  const plugin = viteCommonjs(options);
  plugin.apply = undefined;
  return plugin;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    fixedViteCommonjs({
      include: ["@itwin/core-frontend"],
    }),
    viteStaticCopy({
      targets: [
        {
          src: "./node_modules/@itwin/core-react/lib/public/locales",
          dest: ".",
        },
        {
          src: "./node_modules/@itwin/components-react/lib/public/locales",
          dest: ".",
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      {
        // Resolve SASS tilde imports.
        find: /^~(.*)$/,
        replacement: "$1",
      },
    ],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(["@itwin/core-frontend"])],
    },
  },
});
