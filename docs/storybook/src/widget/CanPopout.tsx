/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { StagePanelState, UiItemsProvider, Widget } from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";
import { createWidget } from "../Utils";

function createProvider(props: CanPopoutStoryProps): UiItemsProvider {
  return {
    id: "widgets",
    getWidgets: () => [
      createWidget(1, {
        canPopout: props.canPopout,
      }),
    ],
  };
}

export type CanPopoutStoryProps = Pick<Widget, "canPopout">;

/** [canPopout](https://www.itwinjs.org/reference/appui-react/widget/widget/#canpopout) property can be used to enable user to pop the widget out to a separate window. */
export function CanPopoutStory(props: CanPopoutStoryProps) {
  const provider = createProvider(props);
  return (
    <AppUiStory
      frontstage={{
        leftPanelProps: {
          defaultState: StagePanelState.Open,
        },
      }}
      itemProviders={[provider]}
    />
  );
}
