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
    deps: {
      web: {
        transformAssets: false,
      }
    }
  }
})
