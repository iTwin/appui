/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@itwin/itwinui-layouts-react";
import {
  BackstageComposer,
  ConfigurableUiContent,
  UiFramework,
} from "@itwin/appui-react";
import { createMainFrontstage } from "../frontend/appui/frontstages/MainFrontstage";
import { appConfig } from "../frontend/appConfig";
import { SnapshotConnection } from "@itwin/core-frontend";
import { createViewState } from "../frontend/appui/frontstages/LocalFileStage";
import { appInitializer } from "../frontend/AppInitializer";

export const Route = createFileRoute("/local/$fileName")({
  component: Local,
  loader: async (ctx) => {
    await appInitializer.initialize();

    const filePath = `${appConfig.snapshotPath}/${ctx.params.fileName}`;
    const iModelConnection = await SnapshotConnection.openFile(filePath);
    const viewState = await createViewState(iModelConnection);
    return {
      iModelConnection,
      viewState,
    };
  },
});

function Local() {
  const { iModelConnection, viewState } = Route.useLoaderData();
  React.useEffect(() => {
    const mainFrontstage = createMainFrontstage({
      contentProps: {
        imodel: iModelConnection,
        viewState,
      },
    });
    const frontstages = [mainFrontstage];
    frontstages.forEach((frontstage) => {
      void UiFramework.frontstages.addFrontstage(frontstage);
    });
    void UiFramework.frontstages.setActiveFrontstage(mainFrontstage.id);
    return () => {
      UiFramework.frontstages.clearFrontstageDefs();
    };
  }, [iModelConnection, viewState]);
  return (
    <PageLayout.Content>
      <ConfigurableUiContent appBackstage={<BackstageComposer />} />
    </PageLayout.Content>
  );
}
