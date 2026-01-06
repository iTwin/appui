/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { WidgetContentLayout } from "@itwin/appui-react";
import { StagePanelState, UiItemsProvider } from "@itwin/appui-react";
import { AppUiStory } from "../../AppUiStory";
import { createFrontstage, createWidget } from "../../Utils";

/**
 * Showcases the WidgetContentLayout component with its Header, Content, and Footer sections.
 * The WidgetContentLayout provides a flexible layout structure for widgets with optional header controls,
 * scrollable content area, and footer actions.
 */
function WidgetContentLayoutStory(
  props: React.ComponentProps<typeof WidgetContentLayout>
) {
  const widgetContent = (
    <WidgetContentLayout {...props}>
      <WidgetContentLayout.Header title="Header" />
      <WidgetContentLayout.Body>Body</WidgetContentLayout.Body>
      <WidgetContentLayout.Footer>Footer</WidgetContentLayout.Footer>
    </WidgetContentLayout>
  );

  const provider: UiItemsProvider = {
    id: "widget-layout-provider",
    getWidgets: () => [
      createWidget(1, {
        content: widgetContent,
        label: "Widget Layout Demo",
      }),
    ],
  };

  return (
    <AppUiStory
      itemProviders={[provider]}
      frontstages={[
        createFrontstage({
          leftPanelProps: {
            defaultState: StagePanelState.Open,
            pinned: true,
          },
        }),
      ]}
    />
  );
}

export default WidgetContentLayoutStory;
