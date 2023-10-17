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
import {
  ConfigurableUiContent,
  FrontstageProvider,
  UiFramework,
  UiItemsManager,
  UiItemsProvider,
} from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";
import { createFrontstageProvider } from "./Utils";

export interface AppUiStoryProps {
  itemProviders?: UiItemsProvider[];
  frontstageProviders?: FrontstageProvider[];
  layout?: "fullscreen";
}

export function AppUiStory(props: AppUiStoryProps) {
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    void (async function () {
      await IModelApp.startup();
      await UiFramework.initialize(undefined);

      const frontstageProviders = props.frontstageProviders ?? [
        createFrontstageProvider(),
      ];
      for (const provider of frontstageProviders) {
        UiFramework.frontstages.addFrontstageProvider(provider);
      }
      for (const provider of props.itemProviders ?? []) {
        UiItemsManager.register(provider);
      }
      const defaultFrontstage = frontstageProviders[0];
      defaultFrontstage &&
        (await UiFramework.frontstages.setActiveFrontstage(
          defaultFrontstage.id
        ));
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
  return (
    <ConfigurableUiContent
      style={{
        height: props.layout === "fullscreen" ? "100vh" : "calc(100vh - 2rem)",
      }}
    />
  );
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
