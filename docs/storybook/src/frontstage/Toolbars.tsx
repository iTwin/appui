/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  BackstageAppButton,
  PreviewFeatures,
  PreviewFeaturesProvider,
  ToolbarOrientation,
  ToolbarUsage,
  UiFramework,
  UiItemsProvider,
} from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage } from "../Utils";

interface ToolbarStoryProps
  extends Pick<PreviewFeatures, "controlWidgetVisibility"> {
  usage: ToolbarUsage;
  orientation: ToolbarOrientation;
  length: number;
  getItemProvider: (props: ToolbarStoryProps) => UiItemsProvider;
  hideNavigationAid: boolean;
  cornerButton: boolean;
  contentManipulationHorizontalLength?: number;
  contentManipulationVerticalLength?: number;
  viewNavigationHorizontalLength?: number;
  viewNavigationVerticalLength?: number;
  viewSettingsHorizontalLength?: number;
  viewSettingsVerticalLength?: number;
}

export function ToolbarsStory(props: ToolbarStoryProps) {
  const frontstage = createFrontstage({
    rightPanelProps: {
      sizeSpec: 250,
    },
    hideNavigationAid: props.hideNavigationAid,
    cornerButton: props.cornerButton ? <BackstageAppButton /> : undefined,
  });
  const provider = props.getItemProvider?.(props);
  return (
    <PreviewFeaturesProvider
      features={{ controlWidgetVisibility: props.controlWidgetVisibility }}
    >
      <AppUiStory
        layout="fullscreen"
        frontstages={[frontstage]}
        itemProviders={[provider]}
        onInitialize={async () => {
          UiFramework.visibility.autoHideUi = false;
        }}
      />
    </PreviewFeaturesProvider>
  );
}
