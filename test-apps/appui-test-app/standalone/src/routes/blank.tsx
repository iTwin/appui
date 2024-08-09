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

export const Route = createFileRoute("/blank")({
  component: Blank,
  loader: async () => {
    await appInitializer.initialize();

    const iModelConnection = createBlankConnection();
    const viewState = createBlankViewState(iModelConnection);

    return {
      iModelConnection,
      viewState,
    };
  },
});

function Blank() {
  const { iModelConnection, viewState } = Route.useLoaderData();
  return (
    <PageLayout.Content>
      <App iModelConnection={iModelConnection} viewState={viewState} />
    </PageLayout.Content>
  );
}
