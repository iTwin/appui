/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  PreviewFeatures,
  PreviewFeaturesProvider,
  StagePanelLocation,
  StagePanelSection,
  StagePanelState,
  UiItemsProvider,
  WidgetState,
} from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage, createWidget } from "../Utils";

function createProvider(): UiItemsProvider {
  return {
    id: "widgets",
    getWidgets: () => {
      return [
        createWidget(1, {
          canPopout: true,
          layouts: {
            standard: {
              location: StagePanelLocation.Bottom,
              section: StagePanelSection.Start,
            },
          },
        }),
        createWidget(2, {
          defaultState: WidgetState.Floating,
        }),
      ];
    },
  };
}

type PreviewStoryProps = Pick<
  Required<PreviewFeatures>,
  "enableMaximizedFloatingWidget" | "enableMaximizedPanelWidget"
>;

/** `enableMaximizedFloatingWidget` and `enableMaximizedPanelWidget` preview features. When enabled the widget will have a "maximize" button. */
export function PreviewStory(props: PreviewStoryProps) {
  const provider = createProvider();
  return (
    <PreviewFeaturesProvider features={props}>
      <AppUiStory
        itemProviders={[provider]}
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
