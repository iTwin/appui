/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  IModelViewportControl,
  SpatialLayoutWidget,
  SpatialLayout,
  StageUsage,
  UiFramework,
  UiItemsManager,
} from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";
import { AppUiDecorator } from "../../AppUiDecorator";
import { StorybookFrontstageProvider } from "../../StorybookFrontstageProvider";
import {
  contentManipulationProvider,
  contextNavigationProvider,
  viewNavigationProvider,
} from "./ToolbarProviders";
import { widgetProvider } from "./WidgetProvider";
import { WidgetsInfo } from "./WidgetsInfo";
import {
  ContentManipulationToolbar,
  ContextNavigationToolbar,
  ViewNavigationToolbar,
} from "./Toolbars";

function Demo() {
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    const providers = [
      contentManipulationProvider,
      contextNavigationProvider,
      viewNavigationProvider,
      widgetProvider,
    ];

    void (async function () {
      await IModelApp.startup();
      await UiFramework.initialize(undefined);
      UiFramework.frontstages.addFrontstageProvider(
        new StorybookFrontstageProvider({
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
          hideStatusBar: true,
          hideToolSettings: true,
          hideNavigationAid: true,
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
  return <Initialized />;
}

function Initialized() {
  return (
    <SpatialLayout style={{ height: "100vh" }} content={<Viewport />}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "0.5em",
          boxSizing: "border-box",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ContextNavigationToolbar />
          <ViewNavigationToolbar />
        </div>
        <SpatialLayoutWidget />
        <ContentManipulationToolbar />
      </div>
    </SpatialLayout>
  );
}

function Viewport() {
  const [hidden, setHidden] = React.useState(true);
  return (
    <>
      <div
        style={{
          height: "100%",
          background: "radial-gradient(#666, #00000000)",
          cursor: "pointer",
        }}
        onClick={() => setHidden((prev) => !prev)}
      />
      <WidgetsInfo style={{ visibility: hidden ? "hidden" : undefined }} />
    </>
  );
}

const meta: Meta = {
  title: "Layouts/Spatial",
  component: Demo,
  decorators: [AppUiDecorator],
} satisfies Meta<typeof Demo>;

export default meta;

type Story = StoryObj<typeof Demo>;

export const Basic: Story = {};
