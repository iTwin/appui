/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { OutputMessagePriority, OutputMessageType } from "@itwin/core-frontend";
import { Page } from "../../AppUiStory";
import { NotificationsStory } from "./OutputMessage";

const meta = {
  title: "Frontstage/Notifications/OutputMessage",
  component: NotificationsStory,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => <Page />,
    },
    layout: "fullscreen",
  },
  args: {
    messagePriority: OutputMessagePriority.Debug,
    briefMessage: "Brief message",
  },
} satisfies Meta<typeof NotificationsStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Error: Story = {
  args: {
    messagePriority: OutputMessagePriority.Error,
  },
};

export const Detailed: Story = {
  args: {
    detailedMessage: "Detailed message",
  },
};

export const Pointer: Story = {
  args: {
    messageType: OutputMessageType.Pointer,
  },
};

export const Alert: Story = {
  args: {
    messageType: OutputMessageType.Alert,
  },
};

export const Sticky: Story = {
  args: {
    messageType: OutputMessageType.Sticky,
  },
};
