/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  IModelViewportControl,
  UiFramework,
  UiItemsManager,
  ConfigurableUiContent,
  StandardFrontstageProvider,
  StageUsage,
} from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";
import { AppUiDecorator } from "../../AppUiDecorator";
import { viewpointsProvider } from "../providers/viewpointsProvider";
import { layersProvider } from "../providers/layersProvider";
import { assetsProvider } from "../providers/assetsProvider";

function Demo() {
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    const providers = [viewpointsProvider, layersProvider, assetsProvider];

    void (async function () {
      await IModelApp.startup();
      await UiFramework.initialize(undefined);

      UiFramework.frontstages.addFrontstageProvider(
        new StandardFrontstageProvider({
          id: "main-frontstage",
          usage: StageUsage.Private,
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
        })
      );

      for (const provider of providers) {
        UiItemsManager.register(provider);
      }
      await UiFramework.frontstages.setActiveFrontstage("main-frontstage");
      setInitialized(true);
    })();
    return () => {
      for (const provider of providers) {
        UiItemsManager.unregister(provider.id);
      }
    };
  }, []);
  if (!initialized) return null;
  return <ConfigurableUiContent style={{ height: "100vh" }} />;
}

const meta: Meta = {
  title: "Layouts/Panels",
  component: Demo,
  decorators: [AppUiDecorator],
} satisfies Meta<typeof Demo>;

export default meta;

type Story = StoryObj<typeof Demo>;

export const Basic: Story = {};
