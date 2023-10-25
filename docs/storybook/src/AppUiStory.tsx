/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  Controls,
  Description,
  Primary,
  Subtitle,
  Title,
} from "@storybook/blocks";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  ConfigurableUiContent,
  FrameworkToolAdmin,
  IModelViewportControl,
  StageUsage,
  StandardFrontstageProps,
  StandardFrontstageProvider,
  UiFramework,
  UiItemsManager,
  UiItemsProvider,
} from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";

export interface AppUiStoryProps {
  onInitialize?: () => Promise<void>;
  frontstage?: Partial<StandardFrontstageProps>;
  itemProviders?: UiItemsProvider[];
}

export function AppUiStory(props: AppUiStoryProps) {
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    void (async function () {
      await IModelApp.startup({
        toolAdmin: new FrameworkToolAdmin(),
      });
      await UiFramework.initialize(undefined);
      await props.onInitialize?.();

      UiFramework.frontstages.addFrontstageProvider(
        new StandardFrontstageProvider({
          id: "main-frontstage",
          usage: StageUsage.Private,
          version: Math.random(),
          contentGroupProps: {
            id: "ViewportContentGroup",
            layout: StandardContentLayouts.singleView,
            contents: [
              {
                id: "ViewportContent",
                classId: IModelViewportControl,
                applicationData: {},
              },
            ],
          },
          hideStatusBar: true,
          hideToolSettings: true,
          hideNavigationAid: true,
          ...props.frontstage,
        })
      );
      for (const provider of props.itemProviders ?? []) {
        UiItemsManager.register(provider);
      }
      await UiFramework.frontstages.setActiveFrontstage("main-frontstage");
      setInitialized(true);
    })();
    return () => {
      void UiFramework.frontstages.setActiveFrontstageDef(undefined);
      UiFramework.frontstages.clearFrontstageProviders();
      for (const provider of props.itemProviders ?? []) {
        UiItemsManager.unregister(provider.id);
      }
    };
  }, [props]);
  if (!initialized) return null;
  return <ConfigurableUiContent style={{ height: "calc(100vh - 2rem)" }} />;
}

export function Page() {
  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      <Primary />
      <Controls />
    </>
  );
}
