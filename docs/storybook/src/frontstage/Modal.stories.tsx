/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { ModalFrontstageStory } from "./Modal";

const meta = {
  title: "Frontstage/ModalFrontstage",
  component: ModalFrontstageStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
    layout: "fullscreen",
  },
} satisfies Meta<typeof ModalFrontstageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
