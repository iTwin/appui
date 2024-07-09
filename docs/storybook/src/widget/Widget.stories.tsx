/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { BadgeType } from "@itwin/core-react";
import { Widget, WidgetState } from "@itwin/appui-react";
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
} satisfies Meta<typeof WidgetStory>;

export default meta;
type Story = StoryObj<typeof meta>;

const widgets = createWidgets();

export const Default: Story = {
  args: { widgets: [widgets.widget1, widgets.widget2] },
};

export const Unloaded: Story = {
  args: {
    widgets: [
      { ...widgets.widget1, defaultState: WidgetState.Unloaded },
      widgets.widget2,
    ],
  },
};

export const Floating: Story = {
  args: {
    widgets: [
      { ...widgets.widget1, defaultState: WidgetState.Floating },
      widgets.widget2,
    ],
  },
};

export const Badge: Story = {
  args: {
    widgets: [
      { ...widgets.widget1, badge: BadgeType.TechnicalPreview },
      { ...widgets.widget2, badgeKind: "deprecated" },
      widgets.widget3,
    ],
  },
};

function createWidgets() {
  const widget1: Widget = {
    id: "w1",
    label: "Widget 1",
    content: <StoryWidget id="w1" />,
  };

  const widget2: Widget = {
    id: "w2",
    label: "Widget 2",
    content: <StoryWidget id="w2" />,
  };

  const widget3: Widget = {
    id: "w3",
    label: "Widget 3",
    content: <StoryWidget id="w3" />,
  };

  return { widget1, widget2, widget3 };
}
