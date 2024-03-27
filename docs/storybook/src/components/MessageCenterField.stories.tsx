/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator, InitializerDecorator } from "../Decorators";
import { MessageManager, MessageCenterField } from "@itwin/appui-react";
import {
  NotifyMessageDetails,
  OutputMessagePriority,
} from "@itwin/core-frontend";
import { DropdownButton, MenuItem, Button } from "@itwin/itwinui-react";
import { useEffect } from "react";

const AlignComponent: Decorator = (Story) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        paddingBlock: "2em",
        gap: "10",
      }}
    >
      <Story />
    </div>
  );
};

const meta = {
  title: "Components/MessageCenterField",
  component: MessageCenterField,
  tags: ["autodocs"],
  decorators: [AlignComponent, InitializerDecorator, AppUiDecorator],
  args: {
    style: { marginTop: 150 },
  },
} satisfies Meta<typeof MessageCenterField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

const NotificationDecorator: Decorator = (Story) => {
  return (
    <div>
      <Story />
      <Button
        styleType="borderless"
        onClick={() => {
          MessageManager.clearMessages();
          MessageManager.addToMessageCenter(
            new NotifyMessageDetails(OutputMessagePriority.Info, "info")
          );
        }}
      >
        Info
      </Button>
    </div>
  );
};

export const Notification: Story = {
  decorators: NotificationDecorator,
};

const ErrorDecorator: Decorator = (Story) => {
  return (
    <div>
      <Story />
      <Button
        styleType="borderless"
        onClick={() => {
          MessageManager.clearMessages();
          MessageManager.addToMessageCenter(
            new NotifyMessageDetails(OutputMessagePriority.Error, "error")
          );
        }}
      >
        Error
      </Button>
    </div>
  );
};

export const Error: Story = {
  decorators: ErrorDecorator,
};

const DetailedDecorator: Decorator = (Story) => {
  return (
    <div>
      <Story />
      <Button
        styleType="borderless"
        onClick={() => {
          MessageManager.clearMessages();
          MessageManager.addToMessageCenter(
            new NotifyMessageDetails(
              1,
              "This is the brief message",
              "This is the detailed message",
              OutputMessagePriority.Success
            )
          );
        }}
      >
        Detailed Message
      </Button>
    </div>
  );
};

export const Detailed: Story = {
  decorators: DetailedDecorator,
};
