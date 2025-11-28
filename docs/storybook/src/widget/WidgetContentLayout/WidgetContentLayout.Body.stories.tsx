/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AppUiDecorator,
} from "../../Decorators";
import { Page } from "../../AppUiStory";
import { WidgetContentLayoutBody } from "./WidgetContentLayout.Body";

const meta = {
  title: "Widget/Layout/Body",
  component: WidgetContentLayoutBody,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
      source: {
        code: `<WidgetContentLayout>
    <WidgetContentLayout.Header title="Header" />
    <WidgetContentLayout.Body>Body</WidgetContentLayout.Body>
    <WidgetContentLayout.Footer>Footer</WidgetContentLayout.Footer>
  </WidgetContentLayout>`,
      },
    },
  },
} as Meta<typeof WidgetContentLayoutBody>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    isLoading: false,
    isNonBlockingLoading: false,
  },
  argTypes: {
    isLoading: {
      description:
        "Renders a blocking loading overlay covering the content area when true.",
      control: { type: "boolean" },
      table: {
        category: "WidgetContentLayout.Body",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isNonBlockingLoading: {
      description:
        "Shows a non-blocking loading indicator (does not prevent interaction) when true.",
      control: { type: "boolean" },
      table: {
        category: "WidgetContentLayout.Body",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export const BlockingLoading: Story = {
  args: {
    isLoading: true,
  },
};

export const NonBlockingLoading: Story = {
  args: {
    isNonBlockingLoading: true,
  },
};
