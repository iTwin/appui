/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { ModalFrontstageStory } from "./Modal";
import { ModalFrontstageButton, UiFramework } from "@itwin/appui-react";

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

export const BackButton: Story = {
  args: {
    backButton: (
      <ModalFrontstageButton
        onClick={() => {
          const result = confirm("Are you sure you want to go back?");
          if (!result) return;
          UiFramework.frontstages.closeModalFrontstage();
        }}
      />
    ),
  },
};
