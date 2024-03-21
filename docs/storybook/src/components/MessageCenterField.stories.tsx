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
import { DropdownButton, MenuItem } from "@itwin/itwinui-react";

const menuItems = [
  <MenuItem
    key={1}
    onClick={() => {
      MessageManager.clearMessages();
      MessageManager.addToMessageCenter(
        new NotifyMessageDetails(OutputMessagePriority.Info, "info")
      );
    }}
  >
    Primary
  </MenuItem>,
  <MenuItem
    key={1}
    onClick={() => {
      MessageManager.clearMessages();
      MessageManager.addToMessageCenter(
        new NotifyMessageDetails(OutputMessagePriority.Error, "error")
      );
    }}
  >
    Error
  </MenuItem>,
  <MenuItem
    key={1}
    onClick={() => {
      MessageManager.clearMessages();
    }}
  >
    Clear
  </MenuItem>,
];

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
      <DropdownButton
        styleType="borderless"
        size="small"
        menuItems={() => menuItems}
      >
        Update Messages
      </DropdownButton>
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
