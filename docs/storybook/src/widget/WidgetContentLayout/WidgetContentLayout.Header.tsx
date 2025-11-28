/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ComponentProps } from "react";
import { WidgetContentLayout as WCL } from "@itwin/appui-react";
import { StagePanelState, UiItemsProvider } from "@itwin/appui-react";
import { AppUiStory } from "../../AppUiStory";
import { createFrontstage, createWidget } from "../../Utils";

/**
 * Showcases the WidgetContentLayout component with its Header, Content, and Footer sections.
 * The WidgetContentLayout provides a flexible layout structure for widgets with optional header controls,
 * scrollable content area, and footer actions.
 */
export function WidgetContentLayoutHeader(
  props: ComponentProps<typeof WCL.Header>
) {
  const widgetContent = (
    <WCL>
      <WCL.Header {...props} />
      <WCL.Body>Body</WCL.Body>
      <WCL.Footer>Footer</WCL.Footer>
    </WCL>
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
