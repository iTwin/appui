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
import { createFrontstageProvider } from "../Utils";

function createProvider(): UiItemsProvider {
  return {
    id: "widgets",
    getWidgets: () => {
      return [
        {
          id: "w1",
          label: "Widget 1",
          canPopout: true,
          layouts: {
            standard: {
              location: StagePanelLocation.Bottom,
              section: StagePanelSection.Start,
            },
          },
        },
        {
          id: "w2",
          label: "Widget 2",
          defaultState: WidgetState.Floating,
          layouts: {
            standard: {
              location: StagePanelLocation.Left,
              section: StagePanelSection.Start,
            },
          },
        },
      ];
    },
  };
}

type PreviewStoryProps = Required<PreviewFeatures>["widgetActionDropdown"];

/** `widgetActionDropdown` preview feature. When widget title bar buttons exceed the specified threshold a drop down menu is rendered instead. */
export function PreviewStory(props: PreviewStoryProps) {
  const provider = createProvider();
  return (
    <PreviewFeaturesProvider
      features={{
        enableMaximizedFloatingWidget: true,
        horizontalPanelAlignment: true,
        widgetActionDropdown: { threshold: props.threshold },
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
