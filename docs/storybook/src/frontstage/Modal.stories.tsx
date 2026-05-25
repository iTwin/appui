/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { ModalFrontstageStory } from "./Modal";
import {
  ModalFrontstage,
  ModalFrontstageButton,
  UiFramework,
} from "@itwin/appui-react";

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
  args: {
    notifyCloseRequest: false,
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

export const AppBarRight: Story = {
  args: {
    appBarRight: <>appBarRight</>,
  },
};

export const NotifyCloseRequest: Story = {
  args: {
    notifyCloseRequest: true,
  },
};

export const CustomLayout: Story = {
  args: {
    renderModalFrontstage: ({ info, isOpen }) => (
      <ModalFrontstage
        isOpen={isOpen}
        title={info.title}
        navigateBack={() => {
          UiFramework.frontstages.closeModalFrontstage();
        }}
        style={{
          backgroundColor: "var(--background-3)",
        }}
      >
        {info.content} (custom layout)
      </ModalFrontstage>
    ),
  },
};
