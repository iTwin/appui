/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppUiDecorator } from "../../Decorators";
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
