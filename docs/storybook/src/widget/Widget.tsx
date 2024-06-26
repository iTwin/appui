/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { action } from "@storybook/addon-actions";
import { StagePanelState, UiItemsProvider, Widget } from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage } from "../Utils";

export function StoryWidget({ id }: { id: string }) {
  React.useEffect(() => {
    action(`Widget ${id} mounted`)();
    return () => {
      action(`Widget ${id} unmounted`)();
    };
  });
  return <>Widget {id} content </>;
}

function createProvider(props: Widget): UiItemsProvider {
  return {
    id: "widgets",
    provideWidgets: () => {
      const widget2: Widget = {
        id: "w2",
        label: "Widget 2",
        content: <StoryWidget id="w2" />,
      };
      return [props, widget2];
    },
  };
}

/** [Widget](https://www.itwinjs.org/reference/appui-react/widget/widget) interface allows you to configure the widget. */
export function WidgetStory(props: Widget) {
  const provider = createProvider(props);
  return (
    <AppUiStory
      frontstages={[
        createFrontstage({
          leftPanelProps: {
            defaultState: StagePanelState.Open,
            pinned: true,
          },
        }),
      ]}
      itemProviders={[provider]}
      {...props}
    />
  );
}
