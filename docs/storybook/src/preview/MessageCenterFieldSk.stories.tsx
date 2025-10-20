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
  title: "PreviewFeatures/MessageCenterFieldSK",
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
      briefMessage: "This is a success message.",
      detailedMessage: "This is a detailed success message.",
    }),
  ],
};

export const Error: Story = {
  decorators: [
    createMessageDecorator({
      priority: OutputMessagePriority.Error,
      briefMessage: "This is an error message.",
      detailedMessage: "This is a detailed error message.",
    }),
  ],
};

export const Warning: Story = {
  decorators: [
    createMessageDecorator({
      priority: OutputMessagePriority.Warning,
      briefMessage: "This is a warning message.",
      detailedMessage: "This is a detailed warning message.",
    }),
  ],
};

export const Info: Story = {
  decorators: [
    createMessageDecorator({
      priority: OutputMessagePriority.Info,
      briefMessage: "This is an info message.",
      detailedMessage: "This is a detailed info message.",
    }),
  ],
};
