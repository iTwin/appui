/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { action } from "@storybook/addon-actions";
import { StagePanelState, UiItemsProvider, Widget } from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage, createWidget } from "../Utils";

export function StoryWidget({ id }: { id: string }) {
  React.useEffect(() => {
    action(`Widget ${id} mounted`)();
    return () => {
      action(`Widget ${id} unmounted`)();
    };
  });
  return <>Widget {id} content </>;
}

function createProvider(widgets: WidgetStoryProps["widgets"]): UiItemsProvider {
  return {
    id: "widgets",
    getWidgets: () => {
      return Array.from({ length: widgets.length }, (_, index) => {
        const widget = widgets[index];
        const id = index + 1;
        return createWidget(id, {
          content: <StoryWidget id={`${id}`} />,
          ...widget,
        });
      });
    },
  };
}

interface WidgetStoryProps {
  widgets: Partial<Widget>[];
}

/** [Widget](https://www.itwinjs.org/reference/appui-react/widget/widget) interface allows you to configure the widget. */
export function WidgetStory(props: WidgetStoryProps) {
  const provider = createProvider(props.widgets);
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
