/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  PreviewFeatures,
  PreviewFeaturesProvider,
  StagePanelState,
  UiItemsProvider,
  WidgetState,
} from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstageProvider, createWidget } from "../Utils";

function createProvider(visibleWidgets: number): UiItemsProvider {
  return {
    id: "widgets",
    getWidgets: () => {
      const count = Math.max(5, visibleWidgets + 3);
      return [...Array(count)].map((_, index) => {
        const id = index + 1;
        return createWidget(id, {
          defaultState: index < visibleWidgets ? undefined : WidgetState.Hidden,
        });
      });
    },
  };
}

interface PreviewStoryProps
  extends Pick<Required<PreviewFeatures>, "controlWidgetVisibility"> {
  /** Number of non-hidden widgets. */
  visibleWidgets: number;
  /** Threshold of `widgetActionDropdown`. */
  dropdownThreshold: number;
}

/** `enableMaximizedFloatingWidget` and `enableMaximizedPanelWidget` preview features. When enabled the widget will have a "maximize" button. */
export function PreviewStory({
  controlWidgetVisibility,
  dropdownThreshold,
  visibleWidgets,
}: PreviewStoryProps) {
  const provider = createProvider(visibleWidgets);
  return (
    <PreviewFeaturesProvider
      features={{
        controlWidgetVisibility,
        widgetActionDropdown: { threshold: dropdownThreshold },
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
