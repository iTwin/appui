/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { createFileRoute } from "@tanstack/react-router";
import { ProcessDetector } from "@itwin/core-bentley";
import { appInitializer } from "../frontend/AppInitializer";

export const Route = createFileRoute("/local")({
  loader: async () => {
    if (!ProcessDetector.isElectronAppFrontend) return;
    await appInitializer.initialize();
  },
});
