/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  PreviewFeatures,
  StagePanelState,
  UiItemsProvider,
  WidgetState,
} from "@itwin/appui-react";
import {
  Button,
  DropdownMenu,
  Input,
  Label,
  MenuItem,
} from "@itwin/itwinui-react";
import SkButton from "@mui/material/Button";
import SkMenu from "@mui/material/Menu";
import SkMenuItem from "@mui/material/MenuItem";
import { ThemeBridgeContext } from "../../.storybook/addons/theme-bridge/ThemeBridge";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage, createWidget } from "../Utils";

function Content({ id }: { id: string }) {
  const [count, setCount] = React.useState(0);
  return (
    <div
      style={{
        padding: "var(--iui-size-xs)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--iui-size-xs)",
        alignItems: "flex-start",
      }}
    >
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
        <Button>DropdownMenu (iTwinUI)</Button>
      </DropdownMenu>
      <StrataKitMenu />
    </div>
  );
}

function StrataKitMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const themeBridge = React.useContext(ThemeBridgeContext);
  const useStrataKit = themeBridge === "useStrataKit";
  if (!useStrataKit) return undefined;

  return (
    <>
      <SkButton
        aria-haspopup="true"
        aria-expanded={open ? "true" : "false"}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        User actions
      </SkButton>
      <SkMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <SkMenuItem onClick={handleClose}>Profile</SkMenuItem>
        <SkMenuItem onClick={handleClose}>My account</SkMenuItem>
        <SkMenuItem onClick={handleClose}>Logout</SkMenuItem>
      </SkMenu>
    </>
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
    <AppUiStory
      features={props}
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
