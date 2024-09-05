/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@itwin/itwinui-layouts-react";
import { config } from "../frontend/config";
import { SnapshotConnection } from "@itwin/core-frontend";
import { createViewState } from "../frontend/createViewState";
import { appInitializer } from "../frontend/AppInitializer";
import { App } from "../frontend/App";
import { UiFramework } from "@itwin/appui-react";
import {
  AppParams,
  useFeatureOverrideParams,
  useSyncFrontstageParam,
} from "../frontend/SearchParams";
import { registerFrontstages } from "../frontend/registerFrontstages";

export const Route = createFileRoute("/local/$fileName")({
  component: Local,
  loader: async (ctx) => {
    await appInitializer.initialize();

    const filePath = `${config.bimDir}/${ctx.params.fileName}`;
    const iModelConnection = await SnapshotConnection.openFile(filePath);
    const viewState = await createViewState(iModelConnection);

    registerFrontstages({ iModelConnection, viewState });
    UiFramework.setIModelConnection(iModelConnection);
    UiFramework.setDefaultViewState(viewState);

    return {
      iModelConnection,
      viewState,
    };
  },
  validateSearch: (search: AppParams) => {
    return search;
  },
  shouldReload: (ctx) => {
    return ctx.cause === "enter";
  },
  gcTime: 0,
});

function Local() {
  useSyncFrontstageParam();
  const featureOverrides = useFeatureOverrideParams();
  return (
    <PageLayout.Content>
      <App featureOverrides={featureOverrides} />
    </PageLayout.Content>
  );
}
