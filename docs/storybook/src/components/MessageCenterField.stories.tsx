/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator, InitializerDecorator } from "../Decorators";
import { MessageManager, MessageCenterField } from "@itwin/appui-react";
import {
  NotifyMessageDetails,
  OutputMessagePriority,
} from "@itwin/core-frontend";
import { DropdownButton, MenuItem } from "@itwin/itwinui-react";

const AlignComponent: Decorator = (Story) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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

const NoMessages: Decorator = (Story) => {
  React.useEffect(() => {
    MessageManager.clearMessages();
  }, []);
  return <Story />;
};

export const Empty: Story = {
  decorators: [...meta.decorators, NoMessages],
};

const InfoMessages: Decorator = (Story) => {
  React.useEffect(() => {
    MessageManager.clearMessages();
    ["1", "2", "3", "4"].forEach((num) => {
      MessageManager.addToMessageCenter(
        new NotifyMessageDetails(OutputMessagePriority.Info, `Message ${num}`)
      );
    });
  }, []);
  return <Story />;
};

export const Info: Story = {
  decorators: [...meta.decorators, InfoMessages],
};

const ErrorMessages: Decorator = (Story) => {
  React.useEffect(() => {
    MessageManager.clearMessages();
    ["1", "2", "3", "4"].forEach((num) => {
      MessageManager.addToMessageCenter(
        new NotifyMessageDetails(OutputMessagePriority.Error, `Error ${num}`)
      );
    });
  }, []);
  return <Story />;
};

export const Error: Story = {
  decorators: [...meta.decorators, ErrorMessages],
};

const DetailedMessages: Decorator = (Story) => {
  React.useEffect(() => {
    MessageManager.clearMessages();
    [1, 2, 3, 4].forEach(() => {
      MessageManager.addToMessageCenter(
        new NotifyMessageDetails(
          1,
          "This is the brief message",
          "This is the detailed message"
        )
      );
    });
  }, []);
  return <Story />;
};

export const Detailed: Story = {
  decorators: [...meta.decorators, DetailedMessages],
};

const menuItems = () => [
  <MenuItem
    onClick={() => {
      MessageManager.addToMessageCenter(
        new NotifyMessageDetails(OutputMessagePriority.Info, `Info Message`)
      );
    }}
  >
    Info{" "}
  </MenuItem>,
  <MenuItem
    onClick={() => {
      MessageManager.addToMessageCenter(
        new NotifyMessageDetails(OutputMessagePriority.Error, `Error Message`)
      );
    }}
  >
    Error
  </MenuItem>,
  <MenuItem
    onClick={() => {
      MessageManager.addToMessageCenter(
        new NotifyMessageDetails(
          1,
          "This is the brief message",
          "This is the detailed message"
        )
      );
    }}
  >
    Detailed
  </MenuItem>,
  <MenuItem
    onClick={() => {
      MessageManager.clearMessages();
    }}
  >
    Clear
  </MenuItem>,
];

const DynamicDecorator: Decorator = (Story) => {
  return (
    <>
      <Story />
      <DropdownButton menuItems={menuItems} styleType="borderless">
        Add Messages
      </DropdownButton>
    </>
  );
};

export const Dynamic: Story = {
  decorators: [...meta.decorators, NoMessages, DynamicDecorator],
};
