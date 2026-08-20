/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  StagePanelState,
  UiItemsProvider,
  WidgetState,
  useSpecificWidgetDef,
} from "@itwin/appui-react";
import { Button } from "@itwin/itwinui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage, createWidget } from "../Utils";

/** Demonstrates that a popped-out widget remains popped out after being hidden
 * (e.g. because it has no content to display) and then shown again.
 *
 * The hide/show controls live outside of the widget (as `AppUiStory` children)
 * since hiding the widget unmounts its content, which would otherwise take the
 * "Show widget" button down with it.
 *
 * To reproduce: pop the widget out (drag its tab out, or use the "..." menu),
 * then click "Hide widget" and "Show widget". Before the fix (AB#2024472) the
 * widget would dock back into the panel instead of staying popped out.
 */
export function PopoutRestoreStory() {
  const provider = {
    id: "widgets",
    getWidgets: () => [
      createWidget(1, {
        canPopout: true,
        content: <div style={{ padding: "0.5em" }}>Widget content</div>,
      }),
    ],
  } satisfies UiItemsProvider;
  return (
    <AppUiStory
      itemProviders={[provider]}
      frontstages={[
        createFrontstage({
          leftPanelProps: {
            defaultState: StagePanelState.Open,
          },
        }),
      ]}
    >
      <WidgetVisibilityControls />
    </AppUiStory>
  );
}

function WidgetVisibilityControls() {
  const widgetDef = useSpecificWidgetDef("w1");

  const hide = () => {
    widgetDef?.setWidgetState(WidgetState.Hidden);
  };
  const show = () => {
    widgetDef?.setWidgetState(WidgetState.Open);
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 1000,
        padding: "0.5em",
        display: "flex",
        gap: "0.5em",
      }}
    >
      <Button onClick={hide} size="small">
        Hide widget
      </Button>
      <Button onClick={show} styleType="cta" size="small">
        Show widget
      </Button>
    </div>
  );
}
