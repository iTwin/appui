/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  PreviewFeaturesProvider,
  StagePanelState,
  UiItemsProvider,
  WidgetState,
} from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstageProvider, createWidget } from "../Utils";

function createProvider(): UiItemsProvider {
  return {
    id: "widgets",
    getWidgets: () => {
      return [
        createWidget(1),
        createWidget(2, {
          defaultState: WidgetState.Hidden,
        }),
        createWidget(3, {
          defaultState: WidgetState.Hidden,
        }),
        createWidget(4, {
          defaultState: WidgetState.Hidden,
        }),
      ];
    },
  };
}

interface PreviewStoryProps {
  /** Threshold of `widgetActionDropdown`. */
  threshold: number;
}

/** `enableMaximizedFloatingWidget` and `enableMaximizedPanelWidget` preview features. When enabled the widget will have a "maximize" button. */
export function PreviewStory({ threshold }: PreviewStoryProps) {
  const provider = createProvider();
  return (
    <PreviewFeaturesProvider
      features={{
        controlWidgetVisibility: true,
        widgetActionDropdown: { threshold },
      }}
    >
      <AppUiStory
        itemProviders={[provider]}
        frontstageProviders={[
          createFrontstageProvider({
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
