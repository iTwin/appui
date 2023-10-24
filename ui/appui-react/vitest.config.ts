/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineConfig } from 'vitest/config'
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    include: ["**/MenuButton.test.tsx"],

    experimentalVmThreads: true,
    css: false,
    deps: {
      optimizer: {
        web: {
          enabled: true,
          include: ["@itwin/core-react"]
        }
      },
      web: {
        transformCss: false,
        transformAssets: true
      },
    }
  },
  build: {
    commonjsOptions: {
      include: ["@itwin/core-react"]
    }
  },
  optimizeDeps: {
    force: true,
    include: ["@itwin/core-react"],
  }
})
