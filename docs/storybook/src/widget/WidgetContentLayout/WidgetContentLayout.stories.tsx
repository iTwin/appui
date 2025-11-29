/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppUiDecorator } from "../../Decorators";
import WidgetContentLayout from "./WidgetContentLayout";
import { Page } from "src/AppUiStory";

const meta = {
  title: "Widget/Layout",
  component: WidgetContentLayout,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
      source: {
        code: `<WidgetContentLayout id="basic-widget" isLoading={false}>
          <WidgetContentLayout.Header title="Header" />
          <WidgetContentLayout.Body>Body</WidgetContentLayout.Body>
          <WidgetContentLayout.Footer>Footer</WidgetContentLayout.Footer>
        </WidgetContentLayout>`,
      },
    },
  },
} as Meta<typeof WidgetContentLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoadingOverlay: Story = {
  args: {
    isLoading: false,
  },
  argTypes: {
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
