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
  FrameworkToolAdmin,
  FrontstageProvider,
  UiFramework,
  UiItemsManager,
  UiItemsProvider,
} from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";
import { createFrontstageProvider } from "./Utils";

export interface AppUiStoryProps {
  onInitialize?: () => Promise<void>;
  itemProviders?: UiItemsProvider[];
  layout?: "fullscreen";
  frontstageProviders?: FrontstageProvider[] | (() => FrontstageProvider[]);
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

      const frontstageProviders = getFrontstageProviders(
        props.frontstageProviders
      ) ?? [createFrontstageProvider()];
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

function getFrontstageProviders(
  frontstageProviders: AppUiStoryProps["frontstageProviders"]
) {
  if (!frontstageProviders) return undefined;
  if (Array.isArray(frontstageProviders)) return frontstageProviders;
  return frontstageProviders();
}
