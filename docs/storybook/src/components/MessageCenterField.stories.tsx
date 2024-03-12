/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator, InitializerDecorator } from "../Decorators";
import { MessageCenterField } from "@itwin/appui-react/src/appui-react/statusfields/message-center/MessageCenterField";
import { useArgs } from "@storybook/preview-api";
import { AnyChain } from "@itwin/core-geometry";

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

export const Notification: Story = {
  args: {
    notify: "primary",
    render: function Render(args: any) {
      const [{ messages }, updateArgs] = useArgs();

      function onChange() {
        updateArgs({ messages: messages });
      }

      return (
        <MessageCenterField {...args} onChange={onChange} messages={messages} />
      );
    },
    messages: [
      {
        priority: 12,
        briefMessage: "Distance: 2441'-6 5/8\"",
        msgType: 2,
        openAlert: 0,
        displayTime: {
          _milliseconds: 5000,
        },
        relativePosition: 5,
      },
      {
        priority: 12,
        briefMessage: "Cumulative Distance: 4979'-3 1/8\"",
        msgType: 2,
        openAlert: 0,
        displayTime: {
          _milliseconds: 5000,
        },
        relativePosition: 5,
      },
      {
        priority: 12,
        briefMessage: "Cumulative Distance: 16635'-6 3/4\"",
        msgType: 2,
        openAlert: 0,
        displayTime: {
          _milliseconds: 5000,
        },
        relativePosition: 5,
      },
    ],
  },
};
