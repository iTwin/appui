/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { Meta, Decorator, StoryObj } from "@storybook/react-vite";
import { AppUiDecorator, InitializerDecorator } from "../Decorators";
import { MessageManager } from "@itwin/appui-react";
import { MessageCenterFieldSk } from "@itwin/appui-react";
import { PreviewFeaturesProvider } from "@itwin/appui-react-internal/src/appui-react/preview/PreviewFeatures";
import { OutputMessagePriority } from "@itwin/core-frontend";
import { createMessageDecorator } from "src/Utils";

const meta = {
  title: "PreviewFeatures/MessageCenterFieldWithStratakitUI",
  component: MessageCenterFieldSk,
  tags: ["autodocs"],
  globals: { themeBridge: true },
  decorators: [InitializerDecorator, AppUiDecorator],
  args: {
    style: { marginTop: 350 },
  },
} satisfies Meta<typeof MessageCenterFieldSk>;

export default meta;
type Story = StoryObj<typeof meta>;

const NoMessages: Decorator = (Story) => {
  React.useEffect(() => {
    MessageManager.clearMessages();
  }, []);

  return (
    <PreviewFeaturesProvider
      features={{
        useStratakit: true,
      }}
    >
      <Story />
    </PreviewFeaturesProvider>
  );
};

export const Empty: Story = {
  decorators: [NoMessages],
};

export const Success: Story = {
  decorators: [
    createMessageDecorator({
      priority: OutputMessagePriority.Success,
      detailedMessage: "This is a detailed success message.",
    }),
  ],
};

export const Error: Story = {
  decorators: [
    createMessageDecorator({
      priority: OutputMessagePriority.Error,
      detailedMessage: "This is a detailed error message.",
    }),
  ],
};

export const Warning: Story = {
  decorators: [
    createMessageDecorator({
      priority: OutputMessagePriority.Warning,
      detailedMessage: "This is a detailed warning message.",
    }),
  ],
};

export const Info: Story = {
  decorators: [
    createMessageDecorator({
      priority: OutputMessagePriority.Info,
      detailedMessage: "This is a detailed info message.",
    }),
  ],
};
