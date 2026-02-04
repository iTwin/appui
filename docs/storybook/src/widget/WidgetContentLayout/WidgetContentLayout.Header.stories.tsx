/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppUiDecorator } from "../../Decorators";
import { Page } from "../../AppUiStory";
import { WidgetContentLayoutHeader } from "./WidgetContentLayout.Header";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { Button } from "@itwin/itwinui-react";
import { action } from "storybook/actions";
import { unionArgType } from "../../Utils";

const meta = {
  title: "Widget/Layout/Header",
  component: WidgetContentLayoutHeader,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
} as Meta<typeof WidgetContentLayoutHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Title",
    menu: {
      title: "Select what is displayed below",
      items: [
        { label: "Item 1", onClick: action("Item 1 clicked") },
        { label: "Item 2", onClick: action("Item 2 clicked") },
      ],
    },
    icons: [
      {
        label: "Icon 1",
        icon: <SvgPlaceholder />,
        onClick: action("Icon 1 clicked"),
      },
      {
        label: "Icon 2",
        icon: <SvgPlaceholder />,
        onClick: action("Icon 2 clicked"),
      },
    ],
    iconSize: "small",
    toggle: {
      label: "Toggle",
      onChange: action("Toggle changed"),
    },
    buttons: [
      <Button
        styleType="high-visibility"
        key="button-1"
        onClick={action("Primary button clicked")}
      >
        Primary
      </Button>,
      <Button key="button-2" onClick={action("Secondary button clicked")}>
        Secondary
      </Button>,
    ],
    onSearch: action("Search performed"),
  },
  argTypes: {
    iconSize: unionArgType(["small", undefined, "large"]),
  },
};

export const Title: Story = {
  args: {
    title: "Title Only",
  },
};

export const Menu: Story = {
  args: {
    menu: {
      title: "Dropdown Menu",
      items: [
        { label: "Item 1", onClick: action("Item 1 clicked") },
        { label: "Item 2", onClick: action("Item 2 clicked") },
      ],
    },
  },
};

export const IconsAndSearch: Story = {
  args: {
    title: "Icons and Search",
    icons: [
      {
        label: "Icon 1",
        tooltipContent: "This is the content of the tooltip for Icon 1",
        icon: <SvgPlaceholder />,
        onClick: action("Icon 1 clicked"),
      },
      {
        label: "Icon 2",
        icon: <SvgPlaceholder />,
        onClick: action("Icon 2 clicked"),
      },
    ],
    onSearch: action("Search performed"),
  },
  argTypes: {
    iconSize: unionArgType(["small", undefined, "large"]),
  },
};

export const Buttons: Story = {
  args: {
    buttons: [
      <Button
        styleType="high-visibility"
        key="button-1"
        onClick={action("Primary button clicked")}
      >
        Primary
      </Button>,
      <Button key="button-2" onClick={action("Secondary button clicked")}>
        Secondary
      </Button>,
    ],
    onSearch: action("Search performed"),
  },
};

export const Toggle: Story = {
  args: {
    toggle: {
      label: "Toggle",
      onChange: action("Toggle changed"),
    },
  },
};

export const CustomHeader: Story = {
  args: {
    children: (
      <div
        style={{
          padding: "8px",
          fontWeight: "bold",
          backgroundColor: "var(--iui-color-background-accent)",
        }}
      >
        Custom Header Content
      </div>
    ),
  },
};
