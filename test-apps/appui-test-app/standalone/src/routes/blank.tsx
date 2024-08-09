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

export const Route = createFileRoute("/blank")({
  component: Blank,
  loader: async () => {
    await appInitializer.initialize();

    const iModelConnection = createBlankConnection();
    const viewState = createBlankViewState(iModelConnection);

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
});

function Blank() {
  const { iModelConnection, viewState } = Route.useLoaderData();
  const frontstageId = useSyncFrontstageParam();
  const featureOverrides = useFeatureOverrideParams();
  return (
    <PageLayout.Content>
      <App
        iModelConnection={iModelConnection}
        viewState={viewState}
        frontstageId={frontstageId}
        featureOverrides={featureOverrides}
      />
    </PageLayout.Content>
  );
}
