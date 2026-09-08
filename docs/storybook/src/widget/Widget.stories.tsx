/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { WidgetState } from "@itwin/appui-react";
import { BadgeType } from "@itwin/core-react";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { StrataKitIcon } from "../../.storybook/addons/theme-bridge/StrataKitIcon";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { WidgetStory } from "./Widget";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

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
