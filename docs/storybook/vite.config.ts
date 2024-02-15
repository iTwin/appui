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

const localeDirs = [
  "./node_modules/@itwin/appui-react/lib/public/locales",
  "./node_modules/@itwin/core-react/lib/public/locales",
  "./node_modules/@itwin/core-frontend/lib/public/locales",
  "./node_modules/@itwin/components-react/lib/public/locales",
  "./node_modules/@itwin/imodel-components-react/lib/public/locales",
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    fixedViteCommonjs({
      include: ["@itwin/core-frontend"],
    }),
    viteStaticCopy({
      targets: [
        ...localeDirs.map((dir) => ({
          src: dir,
          dest: ".",
        })),
        ...localeDirs.map((dir) => ({
          src: `${dir}/en/**`,
          dest: "./locales/en-US",
        })),
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
