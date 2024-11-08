/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@itwin/itwinui-layouts-react";
import { Button, Text } from "@itwin/itwinui-react";
import { UiFramework } from "@itwin/appui-react";
import { appInitializer } from "../frontend/AppInitializer";
import { registerFrontstages } from "../frontend/registerFrontstages";

export const Route = createFileRoute("/settings")({
  component: Settings,
  loader: async () => {
    await appInitializer.initialize();

    return registerFrontstages({});
  },
});

function Settings() {
  const frontstageIds = Route.useLoaderData();
  return (
    <PageLayout.Content padded={true}>
      <PageLayout.TitleArea>
        <Text variant="headline">Settings</Text>
      </PageLayout.TitleArea>
      <Button
        onClick={async () => {
          for (const frontstageId of frontstageIds) {
            const frontstageDef =
              await UiFramework.frontstages.getFrontstageDef(frontstageId);
            if (!frontstageDef) continue;
            frontstageDef.restoreLayout();
          }
        }}
      >
        Restore layout
      </Button>
    </PageLayout.Content>
  );
}
