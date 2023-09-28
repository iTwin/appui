/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  CanFloatWidgetOptions,
  ConfigurableUiContent,
  IModelViewportControl,
  StageUsage,
  StandardFrontstageProvider,
  UiFramework,
  UiItemsManager,
  UiItemsProvider,
  Widget,
  WidgetState,
} from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";

function createProvider(props: CanFloatWidgetOptions): UiItemsProvider {
  return {
    id: "widgets",
    provideWidgets: () => {
      const widget1: Widget = {
        id: "w1",
        label: "Widget 1",
        content: <>Widget 1 content </>,
        defaultState: WidgetState.Floating,
        canFloat: props,
      };
      const widget2: Widget = {
        id: "w2",
        label: "Widget 2",
        content: <>Widget 2 content </>,
        defaultState: props.containerId ? WidgetState.Floating : undefined,
        canFloat: props.containerId
          ? {
              containerId: props.containerId,
            }
          : undefined,
      };
      return [widget1, widget2];
    },
  };
}

/** [canFloat](https://www.itwinjs.org/reference/appui-react/widget/widget/canfloat) property can be used to configure a floating widget. */
export function CanFloatOptions(props: CanFloatWidgetOptions) {
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    const provider = createProvider(props);
    void (async function () {
      await IModelApp.startup();
      await UiFramework.initialize(undefined);
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
        })
      );
      UiItemsManager.register(provider);
      await UiFramework.frontstages.setActiveFrontstage("main-frontstage");
      setInitialized(true);
    })();
    return () => {
      void UiFramework.frontstages.setActiveFrontstageDef(undefined);
      UiFramework.frontstages.clearFrontstageProviders();
      UiItemsManager.unregister(provider.id);
    };
  }, [props]);
  if (!initialized) return null;
  return <ConfigurableUiContent style={{ height: "calc(100vh - 2rem)" }} />;
}
