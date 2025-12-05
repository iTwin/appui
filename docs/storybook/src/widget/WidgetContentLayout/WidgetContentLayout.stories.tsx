/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppUiDecorator } from "../../Decorators";
import WidgetContentLayoutStory from "./WidgetContentLayout";
import { Page } from "src/AppUiStory";

const meta = {
  title: "Widget/Layout",
  component: WidgetContentLayoutStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
} as Meta<typeof WidgetContentLayoutStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: false,
    hideDividers: false,
  },
};

export const LoadingOverlay: Story = {
  args: {
    isLoading: true,
  },
};

export const HideDivider: Story = {
  args: {
    hideDividers: true,
  },
};
