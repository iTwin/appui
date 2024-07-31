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
import { WidgetStory } from "./Widget";

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

export const Icon: Story = {
  args: {
    widgets: [{ iconNode: <SvgPlaceholder /> }, {}, {}],
  },
};

export const CSSIcon: Story = {
  args: {
    widgets: [{ iconNode: <i className="icon icon-placeholder" /> }, {}, {}],
  },
};

export const IconSpec: Story = {
  name: "Icon Spec (deprecated)",
  args: {
    widgets: [{ icon: "icon-placeholder" }, {}, {}],
  },
};

export const IconSpecNode: Story = {
  name: "Icon Spec Node (deprecated)",
  args: {
    widgets: [{ icon: <SvgPlaceholder /> }, {}, {}],
  },
};
