/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  PreviewFeatures,
  PreviewFeaturesProvider,
  StagePanelState,
  UiItemsProvider,
  WidgetState,
} from "@itwin/appui-react";
import { SvgMore } from "@itwin/itwinui-icons-react";
import {
  Button,
  DropdownMenu,
  IconButton,
  Input,
  Label,
  MenuItem,
} from "@itwin/itwinui-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstageProvider, createWidget } from "../Utils";

function Content({ id }: { id: string }) {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <Label>Widget {id} content</Label>
      <Button onClick={() => setCount((prev) => ++prev)}>{count}++</Button>
      <Input />
      <DropdownMenu
        menuItems={(close) =>
          [...Array(6)].map((_, index) => (
            <MenuItem key={index + 1} onClick={close}>
              Item {index + 1}
            </MenuItem>
          ))
        }
      >
        <IconButton>
          <SvgMore />
        </IconButton>
      </DropdownMenu>
    </div>
  );
}

function createProvider(): UiItemsProvider {
  return {
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
  };
}

type PreviewStoryProps = Pick<
  Required<PreviewFeatures>,
  "reparentPopoutWidgets"
>;

/** `reparentPopoutWidgets` preview feature. When enabled widget content will be reparented to a popout content container. */
export function PreviewStory(props: PreviewStoryProps) {
  const provider = createProvider();
  return (
    <PreviewFeaturesProvider features={props}>
      <AppUiStory
        itemProviders={[provider]}
        frontstageProviders={[
          createFrontstageProvider({
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
