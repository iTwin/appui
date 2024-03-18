/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator, InitializerDecorator } from "../Decorators";
import { MessageCenterField } from "@itwin/appui-react/src/appui-react/statusfields/message-center/MessageCenterField";
import { MessageManager } from "@itwin/appui-react";
import { useEffect } from "react";
import {
  NotifyMessageDetails,
  OutputMessagePriority,
} from "@itwin/core-frontend";
import { Button } from "@itwin/itwinui-react";

const AlignComponent: Decorator = (Story) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        paddingBlock: "2em",
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

export const Basic: Story = {};

// NoTification

const NotificationDecorator: Decorator = (Story) => {
  useEffect(() => {
    MessageManager.addToMessageCenter(
      new NotifyMessageDetails(OutputMessagePriority.Info, "info")
    );

    return MessageManager.clearMessages();
  }, []);

  return (
    <div>
      <Story />
      <Button
        size="small"
        onClick={() =>
          MessageManager.addToMessageCenter(
            new NotifyMessageDetails(OutputMessagePriority.Info, "info")
          )
        }
      >
        Update Messages
      </Button>
    </div>
  );
};

export const Notification: Story = {
  decorators: NotificationDecorator,
};
