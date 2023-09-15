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

function Content() {
  return <>Widget content</>;
}

function createFloatingWidget(canFloat: CanFloatWidgetOptions): Widget {
  return {
    id: "w1",
    content: <Content />,
    defaultState: WidgetState.Floating,
    canFloat,
  };
}

/** [canFloat](https://www.itwinjs.org/reference/appui-react/widget/widget/canfloat) property can be used to configure a floating widget. */
export function CanFloatOptions(props: CanFloatWidgetOptions) {
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    const providers: UiItemsProvider[] = [
      {
        id: "widgets",
        provideWidgets: () => [createFloatingWidget(props)],
      },
    ];
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
      for (const provider of providers) {
        UiItemsManager.register(provider);
      }

      await UiFramework.frontstages.setActiveFrontstage("main-frontstage");
      setInitialized(true);
    })();
    return () => {
      UiFramework.frontstages.clearFrontstageProviders();
      for (const provider of providers) {
        UiItemsManager.unregister(provider.id);
      }
    };
  }, [props]);
  if (!initialized) return null;
  return <ConfigurableUiContent style={{ height: "400px" }} />;
}
