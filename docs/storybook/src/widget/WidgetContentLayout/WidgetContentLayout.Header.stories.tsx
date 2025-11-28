/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AppUiDecorator,
} from "../../Decorators";
import { Page } from "../../AppUiStory";
import { WidgetContentLayoutHeader } from "./WidgetContentLayout.Header";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { Button } from "@itwin/itwinui-react";

const meta = {
  title: "Widget/Layout/Header",
  component: WidgetContentLayoutHeader,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
      source: {
        code: `<WidgetContentLayout id="header-widget">
    <WidgetContentLayout.Header
      title="Title"
      menu={{
        title: "Dropdown Menu",
        items: [
          { label: "Item 1", onClick: () => console.log("Item 1 clicked") },
          { label: "Item 2", onClick: () => console.log("Item 2 clicked") },
        ],
      }}
      icons={[
        { label: "Icon 1", icon: <SvgPlaceholder />, onClick: () => console.log("Icon 1 clicked") },
        { label: "Icon 2", icon: <SvgPlaceholder />, onClick: () => console.log("Icon 2 clicked") },
      ]}
      buttons={[
        <Button>Button 1</Button>,
        <Button>Button 2</Button>
      ]}
    />
    <WidgetContentLayout.Body>Body</WidgetContentLayout.Body>
    <WidgetContentLayout.Footer>Footer</WidgetContentLayout.Footer>
  </WidgetContentLayout>`,
      },
    },
  },
} as Meta<typeof WidgetContentLayoutHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    title: "Title",
    menu: {
      title: "Select what is displayed below",
      items: [
        { label: "Item 1", onClick: () => console.log("Item 1 clicked") },
        { label: "Item 2", onClick: () => console.log("Item 2 clicked") },
      ],
    },
    icons: [
      {
        label: "Icon 1",
        icon: <SvgPlaceholder />,
        onClick: () => console.log("Icon 1 clicked"),
      },
      {
        label: "Icon 2",
        icon: <SvgPlaceholder />,
        onClick: () => console.log("Icon 2 clicked"),
      },
    ],
    iconSize: "small",
    toggle: {
      label: "Toggle",
    },
    buttons: [
      <Button
        styleType="high-visibility"
        key="button-1"
        onClick={() => console.log("Primary button clicked")}
      >
        Primary
      </Button>,
      <Button
        key="button-2"
        onClick={() => console.log("Secondary button clicked")}
      >
        Secondary
      </Button>,
    ],
    onSearch: (value: string) => console.log(`Search for: ${value}`),
  },
  argTypes: {
    title: {
      description: "Primary header title text shown in the header area.",
      control: { type: "text" },
      table: {
        category: "WidgetContentLayout.Header",
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    menu: {
      description:
        "Optional dropdown menu configuration. Provide { title, items } where items is an array of { label, onClick }.",
      control: { type: "object" },
      table: {
        category: "WidgetContentLayout.Header",
        type: { summary: "object" },
        defaultValue: { summary: "undefined" },
      },
    },
    icons: {
      description:
        "Array of icon definitions displayed in the header (label, icon, onClick).",
      control: { type: "object" },
      table: {
        category: "WidgetContentLayout.Header",
        type: { summary: "Array" },
        defaultValue: { summary: "[]" },
      },
    },
    buttons: {
      description: "Array of JSX Buttons to render in the header actions area.",
      control: { type: "object" },
      table: {
        category: "WidgetContentLayout.Header",
        type: { summary: "Array<JSX.Element>" },
        defaultValue: { summary: "[]" },
      },
    },
    onSearch: {
      description:
        "Optional search callback function called with the search input value when the user submits a search.",
      table: {
        category: "WidgetContentLayout.Header",
        type: { summary: "(value: string) => void" },
        defaultValue: { summary: "undefined" },
      },
    },
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
        { label: "Item 1", onClick: () => console.log("Item 1 clicked") },
        { label: "Item 2", onClick: () => console.log("Item 2 clicked") },
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
        onClick: () => console.log("Icon 1 clicked"),
      },
      {
        label: "Icon 2",
        icon: <SvgPlaceholder />,
        onClick: () => console.log("Icon 2 clicked"),
      },
    ],
    onSearch: (value: string) => console.log(`Search for: ${value}`),
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
      <Button
        styleType="high-visibility"
        key="button-1"
        onClick={() => console.log("Primary button clicked")}
      >
        Primary
      </Button>,
      <Button
        key="button-2"
        onClick={() => console.log("Secondary button clicked")}
      >
        Secondary
      </Button>,
    ],
    onSearch: (value: string) => console.log(`Search for: ${value}`),
  },
};

export const Toggle: Story = {
  args: {
    toggle: {
      label: "Toggle",
      onChange: (e) => console.log(`Toggle is now ${e.target.checked}`),
    },
  },
};

export const CustomHeader: Story = {
  args: {
    onSearch: (value: string) => console.log(`Search for: ${value}`),
    children: (
      <div
        style={{ padding: "8px", fontWeight: "bold", backgroundColor: "red" }}
      >
        Custom Header Content
      </div>
    ),
  },
};
