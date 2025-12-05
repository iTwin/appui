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
import { fn } from "storybook/test";

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
        { label: "Item 1", onClick: fn() },
        { label: "Item 2", onClick: fn() },
      ],
    },
    icons: [
      {
        label: "Icon 1",
        icon: <SvgPlaceholder />,
        onClick: fn(),
      },
      {
        label: "Icon 2",
        icon: <SvgPlaceholder />,
        onClick: fn(),
      },
    ],
    iconSize: "small",
    toggle: {
      label: "Toggle",
      onChange: fn(),
    },
    buttons: [
      <Button styleType="high-visibility" key="button-1" onClick={fn()}>
        Primary
      </Button>,
      <Button key="button-2" onClick={fn()}>
        Secondary
      </Button>,
    ],
    onSearch: fn(),
  },
  argTypes: {
    iconSize: {
      control: { type: "inline-radio" },
      options: ["small", undefined, "large"],
      table: {
        category: "WidgetContentLayout.Header",
        type: { summary: `'small' | undefined | 'large'` },
        defaultValue: { summary: "undefined" },
      },
    },
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
        { label: "Item 1", onClick: fn() },
        { label: "Item 2", onClick: fn() },
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
        icon: <SvgPlaceholder />,
        onClick: fn(),
      },
      {
        label: "Icon 2",
        icon: <SvgPlaceholder />,
        onClick: fn(),
      },
    ],
    onSearch: fn(),
  },
  argTypes: {
    iconSize: {
      control: { type: "inline-radio" },
      options: ["small", undefined, "large"],
    },
  },
};

export const Buttons: Story = {
  args: {
    buttons: [
      <Button styleType="high-visibility" key="button-1" onClick={fn()}>
        Primary
      </Button>,
      <Button key="button-2" onClick={fn()}>
        Secondary
      </Button>,
    ],
    onSearch: fn(),
  },
};

export const Toggle: Story = {
  args: {
    toggle: {
      label: "Toggle",
      onChange: fn(),
    },
  },
};

export const CustomHeader: Story = {
  args: {
    onSearch: fn(),
    children: (
      <div
        style={{ padding: "8px", fontWeight: "bold", backgroundColor: "red" }}
      >
        Custom Header Content
      </div>
    ),
  },
};
