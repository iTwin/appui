/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { WidgetState } from "@itwin/appui-react";
import { BadgeType } from "@itwin/core-react";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { StoryWidget, WidgetStory } from "./Widget";

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
    id: "w1",
    label: "Widget 1",
    content: <StoryWidget id="w1" />,
  },
} satisfies Meta<typeof WidgetStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Unloaded: Story = {
  args: {
    defaultState: WidgetState.Unloaded,
  },
};

export const Floating: Story = {
  args: {
    defaultState: WidgetState.Floating,
  },
};

export const Badge: Story = {
  args: {
    badge: BadgeType.TechnicalPreview,
  },
};

export const Icon: Story = {
  args: {
    iconNode: <SvgPlaceholder />,
  },
};

export const CSSIcon: Story = {
  args: {
    iconNode: <i className="icon icon-placeholder" />,
  },
};

export const IconSpec: Story = {
  name: "Icon Spec (deprecated)",
  args: {
    icon: "icon-placeholder",
  },
};

export const IconSpecNode: Story = {
  name: "Icon Spec Node (deprecated)",
  args: {
    icon: <SvgPlaceholder />,
  },
};
