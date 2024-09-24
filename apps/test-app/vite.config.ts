/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import fs from "fs";
import { createLogger, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

const customLogger = createLogger();
const warn = customLogger.warn;

customLogger.warn = (msg, options) => {
  if (
    msg.includes(`Module "fs" has been externalized`) &&
    msg.includes("node_modules/electron/index.js")
  )
    return;
  if (
    msg.includes(`Module "path" has been externalized`) &&
    msg.includes("node_modules/electron/index.js")
  )
    return;
  warn(msg, options);
};

// https://vitejs.dev/config/
export default defineConfig((_command, mode) => {
  const env = loadEnv(mode, process.cwd(), "");
  const bimDir = env.IMJS_BIM_DIR;
  const files = bimDir ? fs.readdirSync(bimDir) : [];
  const bimFiles = files.filter(
    (file) => file.endsWith(".bim") || file.endsWith(".ibim")
  );
  return {
    build: {
      chunkSizeWarningLimit: 7000,
    },
    customLogger,
    plugins: [
      TanStackRouterVite(),
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
      {
        name: "markdown-loader",
        transform(code, id) {
          if (!id.endsWith(".md")) return;

          // For .md files, get the raw content
          return `export default ${JSON.stringify(code)};`;
        },
      },
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
    define: {
      __BIM_FILES__: JSON.stringify(bimFiles),
    },
  };
});
