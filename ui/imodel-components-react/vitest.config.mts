/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@itwin/core-react": "@itwin/core-react/lib/esm/core-react.js",
      "@itwin/components-react":
        "@itwin/components-react/lib/esm/components-react.js",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    restoreMocks: true,
    setupFiles: ["src/test/setup.ts"],
    include: ["src/**/*.test.ts?(x)"],
    coverage: {
      thresholds: {
        lines: 93,
        functions: 82,
        statements: 93,
        branches: 91,
      },
    },
  },
});
