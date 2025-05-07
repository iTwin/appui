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

export const Route = createFileRoute("/briefcase")({
  loaderDeps: ({ search }) => {
    if ("fileName" in search) return { fileName: search.fileName };
    return { filePath: search.filePath };
  },
  loader: async (ctx) => {
    await appInitializer.initialize();

    const fileName = ctx.deps.fileName
      ? `${config.bimDir}/${ctx.deps.fileName}`
      : ctx.deps.filePath!;
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
    search: AppParams & ({ filePath: string } | { fileName: string })
  ) => {
    return search;
  },
  shouldReload: (ctx) => {
    return ctx.cause === "enter";
  },
  gcTime: 0,
});
