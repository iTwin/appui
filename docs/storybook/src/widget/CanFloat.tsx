/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  CanFloatWidgetOptions,
  UiItemsProvider,
  WidgetState,
} from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";
import { createWidget } from "../Utils";

function createProvider(props: CanFloatWidgetOptions): UiItemsProvider {
  return {
    id: "widgets",
    getWidgets: () => {
      return [
        createWidget(1, {
          defaultState: WidgetState.Floating,
          canFloat: props,
        }),
        createWidget(2, {
          defaultState: props.containerId ? WidgetState.Floating : undefined,
          canFloat: props.containerId
            ? {
                containerId: props.containerId,
              }
            : undefined,
        }),
      ];
    },
  };
}

/** [canFloat](https://www.itwinjs.org/reference/appui-react/widget/widget/canfloat) property can be used to configure a floating widget. */
export function CanFloatStory(props: CanFloatWidgetOptions) {
  const provider = createProvider(props);
  return <AppUiStory itemProviders={[provider]} {...props} />;
}
