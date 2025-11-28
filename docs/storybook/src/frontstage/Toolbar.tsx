/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  ToolbarOrientation,
  ToolbarUsage,
  UiFramework,
  UiItemsProvider,
} from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage } from "../Utils";

type ToolbarStoryProps = {
  usage: ToolbarUsage;
  orientation: ToolbarOrientation;
  getItemProvider: (props: ToolbarStoryProps) => UiItemsProvider;
};

export function ToolbarStory(props: ToolbarStoryProps) {
  const frontstage = createFrontstage({
    rightPanelProps: {
      sizeSpec: 250,
    },
    hideStatusBar: true,
    hideToolSettings: true,
  });
  const provider = props.getItemProvider?.(props);
  return (
    <AppUiStory
      layout="fullscreen"
      frontstages={[frontstage]}
      itemProviders={[provider]}
      onInitialize={async () => {
        UiFramework.visibility.autoHideUi = false;
      }}
    />
  );
}
