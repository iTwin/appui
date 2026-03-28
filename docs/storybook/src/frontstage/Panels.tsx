/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  StagePanelState,
  UiFramework,
  UiItemsProvider,
} from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage } from "../Utils";

interface PanelsStoryProps {
  getItemProvider: (props: PanelsStoryProps) => UiItemsProvider;
}

export function PanelsStory(props: PanelsStoryProps) {
  const frontstage = createFrontstage({
    leftPanelProps: {
      defaultState: StagePanelState.Open,
    },
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
