/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageAppButton,
  BackstageComposer,
  BackstageItemUtilities,
  PreviewFeatures,
  PreviewFeaturesProvider,
  StagePanelLocation,
  StagePanelSection,
  StagePanelState,
  UiItemsManager,
  useActiveFrontstageId,
} from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage, createWidget } from "../Utils";
import { Button, Input, Text } from "@itwin/itwinui-react";

function AppContent() {
  const [count, setCount] = React.useState(0);
  const activeFrontstageId = useActiveFrontstageId();
  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
        gap: 8,
        height: "100%",
      }}
    >
      <Text>{activeFrontstageId}</Text>
      <Input />
      <Button onClick={() => setCount((prev) => ++prev)}>{count}++</Button>
    </div>
  );
}

type ActiveFrontstageStoryProps = Pick<
  Required<PreviewFeatures>,
  "stableContentLayout"
>;

export function ActiveFrontstageStory(props: ActiveFrontstageStoryProps) {
  const { stableContentLayout } = props;
  const frontstage1 = createFrontstage({
    id: "frontstage1",
    content: <AppContent />,
    hideStatusBar: true,
    hideToolSettings: true,
    cornerButton: <BackstageAppButton />,
    leftPanelProps: {
      defaultState: StagePanelState.Open,
      pinned: true,
    },
  });
  const frontstage2 = createFrontstage({
    id: "frontstage2",
    content: <AppContent />,
    hideStatusBar: true,
    hideToolSettings: true,
    cornerButton: <BackstageAppButton />,
    rightPanelProps: {
      defaultState: StagePanelState.Open,
      pinned: true,
    },
  });
  return (
    <PreviewFeaturesProvider
      features={{
        stableContentLayout,
      }}
    >
      <AppUiStory
        appBackstage={<BackstageComposer />}
        layout="fullscreen"
        frontstages={[frontstage1, frontstage2]}
        itemProviders={[
          {
            id: "backstage-items",
            getBackstageItems: () => [
              BackstageItemUtilities.createStageLauncher({
                stageId: frontstage1.id,
                label: "Frontstage 1",
              }),
              BackstageItemUtilities.createStageLauncher({
                stageId: frontstage2.id,
                label: "Frontstage 2",
              }),
            ],
          },
        ]}
        onInitialize={async () => {
          UiItemsManager.register(
            {
              id: "frontstage1-widgets",
              getWidgets: () => [createWidget(1)],
            },
            {
              stageIds: [frontstage1.id],
            }
          );
          UiItemsManager.register(
            {
              id: "frontstage2-widgets",
              getWidgets: () => [
                createWidget(2, {
                  layouts: {
                    standard: {
                      location: StagePanelLocation.Right,
                      section: StagePanelSection.Start,
                    },
                  },
                }),
              ],
            },
            {
              stageIds: [frontstage2.id],
            }
          );
        }}
      />
    </PreviewFeaturesProvider>
  );
}
