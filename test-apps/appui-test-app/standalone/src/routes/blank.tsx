/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@itwin/itwinui-layouts-react";
import { appInitializer } from "../frontend/AppInitializer";
import {
  createBlankConnection,
  createBlankViewState,
} from "@itwin/appui-test-providers";
import { App } from "../frontend/App";
import { UiFramework } from "@itwin/appui-react";
import {
  AppParams,
  useFeatureOverrideParams,
  useSyncFrontstageParam,
} from "../frontend/SearchParams";
import { registerFrontstages } from "../frontend/registerFrontstages";

export const Route = createFileRoute("/blank")({
  component: Blank,
  loader: async () => {
    await appInitializer.initialize();

    const iModelConnection = createBlankConnection();
    const viewState = createBlankViewState(iModelConnection);

    registerFrontstages({ iModelConnection, viewState });
    UiFramework.setIModelConnection(iModelConnection);
    UiFramework.setDefaultViewState(viewState);
  },
  validateSearch: (search: AppParams) => {
    return search;
  },
  shouldReload: (ctx) => {
    return ctx.cause === "enter";
  },
  gcTime: 0,
});

function Blank() {
  useSyncFrontstageParam();
  const featureOverrides = useFeatureOverrideParams();
  return (
    <PageLayout.Content>
      <App featureOverrides={featureOverrides} />
    </PageLayout.Content>
  );
}
