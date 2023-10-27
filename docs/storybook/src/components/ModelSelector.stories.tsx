/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import { IModelViewportControl, UiFramework } from "@itwin/appui-react";
import {
  CheckpointConnection,
  IModelConnection,
  ViewCreator3d,
} from "@itwin/core-frontend";
import { createFrontstageProvider } from "../Utils";
import { AppUiDecorator } from "../AppUiDecorator";
import { AppUiStory } from "../AppUiStory";
import { demoIModels } from "../demoModels";

function ModelSelector() {
  return (
    <AppUiStory
      onInitialize={async () => {
        const demoModel = demoIModels[0];
        const { iTwinId, iModelId } = demoModel;
        const iModelConnection = await CheckpointConnection.openRemote(
          iTwinId,
          iModelId
        );
        UiFramework.setIModelConnection(iModelConnection, true);
        const viewState = await getViewState(iModelConnection);
        UiFramework.setDefaultViewState(viewState, true);
      }}
      frontstageProviders={() => [
        createFrontstageProvider({
          id: "main-frontstage",
          contentGroupProps: {
            id: "ViewportContentGroup",
            layout: StandardContentLayouts.singleView,
            contents: [
              {
                id: "ViewportContent",
                classId: IModelViewportControl,
                applicationData: {
                  viewState: UiFramework.getDefaultViewState,
                  iModelConnection: UiFramework.getIModelConnection,
                },
              },
            ],
          },
        }),
      ]}
    />
  );
}

const meta = {
  title: "Components/ModelSelector",
  component: ModelSelector,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof ModelSelector>;

export default meta;
type Story = StoryObj<typeof ModelSelector>;

export const Basic: Story = {};

async function getViewState(iModelConnection: IModelConnection) {
  const viewCreator = new ViewCreator3d(iModelConnection);
  return viewCreator.createDefaultView();
}
