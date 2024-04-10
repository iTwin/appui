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
import * as React from "react";

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

const EmptyDecorator: Decorator = (Story) => {
  React.useEffect(() => {
    MessageManager.clearMessages();
  });
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

export const Empty: Story = { decorators: EmptyDecorator };

//Info UseCase
const InfoDecorator: Decorator = (Story) => {
  React.useEffect(() => {
    MessageManager.clearMessages();
    ["1", "2", "3", "4"].forEach((num) => {
      MessageManager.addToMessageCenter(
        new NotifyMessageDetails(OutputMessagePriority.Info, `Message ${num}`)
      );
    });
  });

  return (
    <div>
      <Story />
    </div>
  );
};

export const Info: Story = {
  decorators: InfoDecorator,
};

//Error Use Case

const ErrorDecorator: Decorator = (Story) => {
  React.useEffect(() => {
    MessageManager.clearMessages();
    ["1", "2", "3", "4"].forEach((num) => {
      MessageManager.addToMessageCenter(
        new NotifyMessageDetails(OutputMessagePriority.Error, `Error ${num}`)
      );
    });
  });

  return (
    <div>
      <Story />
    </div>
  );
};

export const Error: Story = {
  decorators: ErrorDecorator,
};

//Detailed Message

const DetailedDecorator: Decorator = (Story) => {
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
  });

  return (
    <div>
      <Story />
    </div>
  );
};

export const Detailed: Story = {
  decorators: DetailedDecorator,
};

//Dynamic Use Case

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
  React.useEffect(() => {
    MessageManager.clearMessages();
  });

  return (
    <div>
      <Story />
      <DropdownButton menuItems={menuItems} styleType="borderless">
        Add Messages
      </DropdownButton>
    </div>
  );
};

export const Dynamic: Story = {
  decorators: DynamicDecorator,
};
