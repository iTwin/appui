/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@itwin/core-react": "@itwin/core-react/lib/esm/core-react.js",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    restoreMocks: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.ts?(x)"],
    outputFile: "coverage/junit.xml",
    coverage: {
      thresholds: {
        lines: 97,
        functions: 95,
        statements: 97,
        branches: 97,
      },
    },
  },
});
