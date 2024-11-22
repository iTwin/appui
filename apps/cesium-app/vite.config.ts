/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
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
