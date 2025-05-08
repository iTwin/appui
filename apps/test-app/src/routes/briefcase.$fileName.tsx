/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { createFileRoute } from "@tanstack/react-router";
import { BriefcaseConnection } from "@itwin/core-frontend";
import { createViewState } from "../frontend/createViewState";
import { appInitializer } from "../frontend/AppInitializer";
import { UiFramework } from "@itwin/appui-react";
import { AppParams } from "../frontend/SearchParams";
import { registerFrontstages } from "../frontend/registerFrontstages";
import { config } from "../frontend/config";
import { ProcessDetector } from "@itwin/core-bentley";

export const Route = createFileRoute("/briefcase/$fileName")({
  loaderDeps: ({ search }) => {
    if ("filePath" in search && typeof search.filePath === "string")
      return { filePath: search.filePath };
    return {};
  },
  loader: async (ctx) => {
    await appInitializer.initialize();

    const filePath = ctx.deps.filePath ?? config.bimDir;
    const fileName = `${filePath}/${ctx.params.fileName}`;
    const iModelConnection = await BriefcaseConnection.openFile({
      fileName,
    });
    const viewState = await createViewState(iModelConnection);

    registerFrontstages({ iModelConnection, viewState });
    UiFramework.setIModelConnection(iModelConnection);
    UiFramework.setDefaultViewState(viewState);

    return {
      iModelConnection,
      viewState,
    };
  },
  onLeave: (ctx) => {
    const iModelConnection = ctx.loaderData?.iModelConnection;
    void iModelConnection?.close();
  },
  validateSearch: (
    search: AppParams & { filePath?: string }
  ): AppParams & { filePath?: string } => {
    if (ProcessDetector.isElectronAppFrontend) {
      return search;
    }
    const { filePath: _filePath, ...rest } = search;
    return rest;
  },
  shouldReload: (ctx) => {
    return ctx.cause === "enter";
  },
  gcTime: 0,
});
