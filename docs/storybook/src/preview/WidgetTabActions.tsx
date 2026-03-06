/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  PreviewFeatures,
  PreviewFeaturesProvider,
  StagePanelState,
} from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage, createWidget } from "../Utils";

type PreviewStoryProps = Pick<
  Required<PreviewFeatures>,
  "enableMaximizedFloatingWidget" | "enableMaximizedPanelWidget"
>;

/** `widgetTabActions` preview feature. Widget tab actions are displayed for individual tabs instead of the default behavior where only active tab actions are exposed. */
export function PreviewStory(props: PreviewStoryProps) {
  return (
    <PreviewFeaturesProvider
      features={{
        controlWidgetVisibility: true,
        widgetTabActions: true,
        ...props,
      }}
    >
      <AppUiStory
        itemProviders={[
          {
            id: "widgets",
            getWidgets: () => {
              return [
                createWidget(1),
                createWidget(2),
                createWidget(3),
                createWidget(4),
                createWidget(5),
              ];
            },
          },
        ]}
        frontstages={[
          createFrontstage({
            leftPanelProps: {
              defaultState: StagePanelState.Open,
              pinned: true,
            },
          }),
        ]}
      />
    </PreviewFeaturesProvider>
  );
}
