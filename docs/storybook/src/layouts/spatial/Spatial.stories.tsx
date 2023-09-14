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
  UiFramework,
  UiItemsManager,
  ConfigurableUiContent,
  CustomFrontstageProvider,
  WidgetPanelsFrontstageContent,
  SpatialFrontstage,
  createSpatialLayout,
} from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";
import { AppUiDecorator } from "../../AppUiDecorator";
import {
  ContentManipulationToolbar,
  ContextNavigationToolbar,
  ViewNavigationToolbar,
} from "./Toolbars";
import { WidgetsInfo } from "./WidgetsInfo";
import { SpatialProviders } from "./Providers";

interface DemoProps {
  widgetsInfo: boolean;
}

const DemoContext = React.createContext<DemoProps>({ widgetsInfo: true });

function Demo(props: DemoProps) {
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    const providers = [
      SpatialProviders.contentManipulation,
      SpatialProviders.contextNavigation,
      SpatialProviders.viewNavigation,
      SpatialProviders.widgets,
      SpatialProviders.viewpoints(),
      SpatialProviders.layers(),
    ];

    void (async function () {
      await IModelApp.startup();
      await UiFramework.initialize(undefined);

      UiFramework.frontstages.addFrontstageProvider(
        new CustomFrontstageProvider({
          id: "main-frontstage",
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
          content: <Layout />,
          layout: createSpatialLayout(),
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
  return (
    <DemoContext.Provider value={props}>
      <ConfigurableUiContent />
    </DemoContext.Provider>
  );
}

function Layout() {
  return (
    <SpatialFrontstage
      style={{ height: "100vh" }}
      content={<Content />}
      contextNavigation={<ContextNavigationToolbar />}
      viewNavigation={<ViewNavigationToolbar />}
      contentManipulation={<ContentManipulationToolbar />}
      panel={<SpatialLayoutWidget />}
    />
  );
}

function Content() {
  const { widgetsInfo } = React.useContext(DemoContext);
  return (
    <>
      <WidgetPanelsFrontstageContent /> {/* TODO: currently @internal */}
      <WidgetsInfo style={{ visibility: widgetsInfo ? undefined : "hidden" }} />
    </>
  );
}

const meta: Meta = {
  title: "Layouts/Spatial",
  component: Demo,
  decorators: [AppUiDecorator],
  args: {
    widgetsInfo: true,
  },
} satisfies Meta<typeof Demo>;

export default meta;

type Story = StoryObj<typeof Demo>;

export const Basic: Story = {};
