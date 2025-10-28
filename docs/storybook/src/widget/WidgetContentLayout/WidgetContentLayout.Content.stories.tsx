/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppUiDecorator, ConsoleToActionsDecorator, InitializerDecorator } from "../../Decorators";
import { Page } from "../../AppUiStory";
import { WidgetContentLayoutContent } from "./WidgetContentLayout.Content";

const meta = {
  title: "Widget/Widget Content Layout/WidgetContentLayout.Content",
  component: WidgetContentLayoutContent,
  tags: ["autodocs"],
  decorators: [InitializerDecorator, ConsoleToActionsDecorator, AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
      source: {
        code: `<WidgetContentLayout>
    <WidgetContentLayout.Header title="Header" />
    <WidgetContentLayout.Content>Content</WidgetContentLayout.Content>
    <WidgetContentLayout.Footer>Footer</WidgetContentLayout.Footer>
  </WidgetContentLayout>`,
      },
    },
  }
} as Meta<typeof WidgetContentLayoutContent>

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    isLoading: false,
    isNonBlockingLoading: false,
    centerContent: false,
  },
  argTypes: {
    isLoading: {
      description: 'Renders a blocking loading overlay covering the content area when true.',
      control: { type: 'boolean' },
      table: { category: 'WidgetContentLayout.Content', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    isNonBlockingLoading: {
      description: 'Shows a non-blocking loading indicator (does not prevent interaction) when true.',
      control: { type: 'boolean' },
      table: { category: 'WidgetContentLayout.Content', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    centerContent: {
      description: 'Centers the content both vertically and horizontally inside the content area when true.',
      control: { type: 'boolean' },
      table: { category: 'WidgetContentLayout.Content', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
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

export const CenteredContent: Story = {
  args: {
    centerContent: true,
  },
};
