/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  PreviewFeatures,
  PreviewFeaturesProvider,
  StagePanelState,
  WidgetState,
} from "@itwin/appui-react";
import { Button, Label } from "@itwin/itwinui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage, createWidget } from "../Utils";

function Content({ id }: { id: string }) {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <Label>Widget {id} content</Label>
      <Button onClick={() => setCount((prev) => ++prev)}>{count}++</Button>
    </div>
  );
}

type PreviewStoryProps = Pick<
  Required<PreviewFeatures>,
  "popoutDraggedWidgets"
>;

/** `popoutDraggedWidgets` preview feature. When enabled the widget is popped out when dragged outside the window. */
export function PreviewStory(props: PreviewStoryProps) {
  return (
    <PreviewFeaturesProvider features={props}>
      <AppUiStory
        itemProviders={[
          {
            id: "widgets",
            getWidgets: () => {
              return [
                createWidget(1, {
                  canPopout: true,
                  content: <Content id="1" />,
                  defaultState: WidgetState.Floating,
                }),
                createWidget(2, {
                  canPopout: true,
                  content: <Content id="2" />,
                }),
                createWidget(3, {
                  canPopout: true,
                  content: <Content id="3" />,
                }),
              ];
            },
          },
        ]}
        frontstages={[
          createFrontstage({
            leftPanelProps: {
              defaultState: StagePanelState.Open,
              pinned: true,
            },
          }),
        ]}
      />
    </PreviewFeaturesProvider>
  );
}
