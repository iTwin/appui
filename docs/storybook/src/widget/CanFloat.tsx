/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  CanFloatWidgetOptions,
  UiItemsProvider,
  Widget,
  WidgetState,
} from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";

function createProvider(props: CanFloatWidgetOptions): UiItemsProvider {
  return {
    id: "widgets",
    provideWidgets: () => {
      const widget1: Widget = {
        id: "w1",
        label: "Widget 1",
        content: <>Widget 1 content</>,
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
export function CanFloatStory(props: CanFloatWidgetOptions) {
  const provider = createProvider(props);
  return <AppUiStory itemProviders={[provider]} {...props} />;
}
