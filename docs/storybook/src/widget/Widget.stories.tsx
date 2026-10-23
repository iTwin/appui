/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { WidgetState } from "@itwin/appui-react";
import { BadgeType } from "@itwin/core-react";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import SkButton from "@mui/material/Button";
import SkMenu from "@mui/material/Menu";
import SkMenuItem from "@mui/material/MenuItem";
import { StrataKitIcon } from "../../.storybook/addons/theme-bridge/StrataKitIcon";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { WidgetStory } from "./Widget";

import placeholderIcon from "@stratakit/icons/placeholder.svg";
import { Button, DropdownMenu, MenuItem } from "@itwin/itwinui-react";
import { ThemeBridgeContext } from "../../.storybook/addons/theme-bridge/ThemeBridge";

const meta = {
  title: "Widget/Widget",
  component: WidgetStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
  args: {
    widgets: [{}, {}],
    widgetTabActions: false,
  },
} satisfies Meta<typeof WidgetStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Unloaded: Story = {
  args: {
    widgets: [{ defaultState: WidgetState.Unloaded }, {}],
  },
};

export const Floating: Story = {
  args: {
    widgets: [{ defaultState: WidgetState.Floating }, {}],
  },
};

export const Badge: Story = {
  args: {
    widgets: [
      { badge: BadgeType.TechnicalPreview },
      { badgeKind: "deprecated" },
      {},
    ],
  },
};

export const Icons: Story = {
  args: {
    widgets: [
      { iconNode: <SvgPlaceholder />, label: "iTwinUI icon" },
      {
        iconNode: <StrataKitIcon href={placeholderIcon} />,
        label: "StrataKit icon",
      },
      { icon: <SvgPlaceholder />, label: "iTwinUI icon spec (deprecated)" },
      { icon: "icon-placeholder", label: "Font icon spec (deprecated)" },
      {
        iconNode: <i className="icon icon-placeholder" />,
        label: "Font icon (deprecated)",
      },
    ],
  },
};

export const Content: Story = {
  args: {
    widgets: [
      {
        iconNode: <StrataKitIcon href={placeholderIcon} />,
        label: "Portalled",
        content: <PortalledContent />,
        canPopout: true,
        defaultState: WidgetState.Floating,
      },
      {},
    ],
  },
};

function PortalledContent() {
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
      <DropdownMenu
        closeOnItemClick
        menuItems={
          <>
            <MenuItem>Item #1</MenuItem>
            <MenuItem>Item #2</MenuItem>
            <MenuItem disabled>Item #3</MenuItem>
          </>
        }
      >
        <Button>DropdownMenu (iTwinUI)</Button>
      </DropdownMenu>
      <StrataKitMenu />
    </div>
  );
}

function StrataKitMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
