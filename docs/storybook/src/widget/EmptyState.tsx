/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  StagePanelState,
  UiItemsProvider,
  WidgetState,
  useSpecificWidgetDef,
} from "@itwin/appui-react";
import { Button } from "@itwin/itwinui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage } from "../Utils";

interface EmptyStateStoryProps {
  /** Toggle this on to hide the widget when there is no data to display. */
  hideOnEmptyState: boolean;
}

/** Showcases different strategies to display widgets in an empty state.
 * A combination of [useSpecificWidgetDef](https://www.itwinjs.org/reference/appui-react/frontstage/usespecificwidgetdef/) and
 * [setWidgetState](https://www.itwinjs.org/reference/appui-react/widget/widgetdef/#setwidgetstate) APIs can be used to
 * hide widgets in an empty state.
 */
export function EmptyStateStory(props: EmptyStateStoryProps) {
  const provider = {
    id: "widgets",
    provideWidgets: () => [
      {
        id: "w1",
        label: "Widget 1",
        content: <Widget hideOnEmptyState={props.hideOnEmptyState} />,
      },
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
    />
  );
}

function Widget(props: Pick<EmptyStateStoryProps, "hideOnEmptyState">) {
  const [data, resetData] = useWidgetData();
  useHideWidget(props.hideOnEmptyState, data);
  return (
    <div style={{ padding: "0.5em" }}>
      {!data ? (
        <div>No data</div>
      ) : (
        <>
          <div>{data}</div>
          <Button onClick={resetData} styleType="cta" size="small">
            Reset data
          </Button>
        </>
      )}
    </div>
  );
}

// Hides the widget w/o data.
function useHideWidget(enabled: boolean, data: string | undefined) {
  const widgetDef = useSpecificWidgetDef("w1");
  React.useEffect(() => {
    if (!enabled) return;
    widgetDef?.setWidgetState(data ? WidgetState.Open : WidgetState.Hidden);
  }, [data, enabled, widgetDef]);
}

// Simulates a data fetch with a capability to re-fetch.
function useWidgetData(): [string | undefined, () => void] {
  const [data, setData] = React.useState<string>();
  React.useEffect(() => {
    if (data) return;
    setTimeout(() => {
      setData("Widget data");
    }, 2000);
  }, [data]);
  const reset = () => {
    setData(undefined);
  };
  return [data, reset];
}
