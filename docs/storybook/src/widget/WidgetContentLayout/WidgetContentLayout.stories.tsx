/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AppUiDecorator,
} from "../../Decorators";
import WidgetContentLayout from "./WidgetContentLayout";
import { Page } from "src/AppUiStory";

const meta = {
  title: "Widget/Widget Content Layout",
  component: WidgetContentLayout,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
      source: {
        code: `<WidgetContentLayout id="basic-widget" isLoading={false}>
          <WidgetContentLayout.Header title="Header" />
          <WidgetContentLayout.Content>Content</WidgetContentLayout.Content>
          <WidgetContentLayout.Footer>Footer</WidgetContentLayout.Footer>
        </WidgetContentLayout>`,
      },
    },
  },
} as Meta<typeof WidgetContentLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    id: "basic-widget",
    isLoading: false,
  },
  argTypes: {
    id: {
      description:
        "Widget identifier used to determine layout padding and responsive gaps. If omitted, default spacing is applied.",
      control: { type: "text" },
      table: {
        category: "WidgetContentLayout",
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    isLoading: {
      description:
        "When true, renders a blocking loading overlay covering the content area.",
      control: { type: "boolean" },
      table: {
        category: "WidgetContentLayout",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export const LoadingOverlay: Story = {
  args: {
    isLoading: true,
  },
};
