/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@itwin/imodel-components-react":
        "@itwin/imodel-components-react/lib/esm/imodel-components-react.js",
      "@itwin/components-react":
        "@itwin/components-react/lib/esm/components-react.js",
      "@itwin/core-react": "@itwin/core-react/lib/esm/core-react.js",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    restoreMocks: true,
    reporters: ["junit", "default"],
    setupFiles: ["src/test/setup.ts"],
    include: ["src/**/*.test.ts?(x)"],
    outputFile: "coverage/junit.xml",
    coverage: {
      thresholds: {
        lines: 90,
        functions: 84,
        statements: 90,
        branches: 87,
      },
    },
  },
});
