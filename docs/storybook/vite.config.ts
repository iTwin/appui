/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import tsconfigPaths from "vite-tsconfig-paths";

const localeDirs = [
  "./node_modules/@itwin/appui-react/lib/public/locales",
  "./node_modules/@itwin/core-react/lib/public/locales",
  "./node_modules/@itwin/core-frontend/lib/public/locales",
  "./node_modules/@itwin/components-react/lib/public/locales",
  "./node_modules/@itwin/imodel-components-react/lib/public/locales",
];

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  plugins: [
    react({
      babel: {
        generatorOpts: {
          importAttributesKeyword: "with",
        },
      },
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
    tsconfigPaths(),
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
});
