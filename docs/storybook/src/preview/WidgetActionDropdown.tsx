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
import { createFrontstageProvider, createWidget } from "../Utils";

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

type PreviewStoryProps = Required<PreviewFeatures>["widgetActionDropdown"];

/** `widgetActionDropdown` preview feature. When widget title bar buttons exceed the specified threshold a drop down menu is rendered instead. */
export function PreviewStory(props: PreviewStoryProps) {
  const provider = createProvider();
  return (
    <PreviewFeaturesProvider
      features={{
        enableMaximizedFloatingWidget: true,
        horizontalPanelAlignment: true,
        controlWidgetVisibility: true,
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
