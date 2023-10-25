/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { UiItemsProvider, Widget } from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";

function createProvider(props: Widget): UiItemsProvider {
  return {
    id: "widgets",
    provideWidgets: () => {
      const widget2: Widget = {
        id: "w2",
        label: "Widget 2",
        content: <>Widget 2 content </>,
      };
      return [props, widget2];
    },
  };
}

/** [Widget](https://www.itwinjs.org/reference/appui-react/widget/widget) interface allows you to configure the widget. */
export function WidgetStory(props: Widget) {
  const provider = createProvider(props);
  return <AppUiStory itemProviders={[provider]} {...props} />;
}
