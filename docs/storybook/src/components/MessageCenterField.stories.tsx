/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { AppUiDecorator, InitializerDecorator } from "../Decorators";
import { MessageManager, MessageCenterField } from "@itwin/appui-react";
import {
  NotifyMessageDetails,
  OutputMessagePriority,
} from "@itwin/core-frontend";
import { DropdownButton, MenuItem } from "@itwin/itwinui-react";
import { createMessageDecorator } from "src/Utils";

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
  title: "Components/Status fields/MessageCenterField",
  component: MessageCenterField,
  tags: ["autodocs"],
  decorators: [AlignComponent, InitializerDecorator, AppUiDecorator],
  args: {
    style: { marginTop: 350 },
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
  decorators: [NoMessages],
};

export const Success: Story = {
  decorators: [
    createMessageDecorator({ priority: OutputMessagePriority.Success }),
  ],
};

export const Info: Story = {
  decorators: [
    createMessageDecorator({ priority: OutputMessagePriority.Info }),
  ],
};

export const Warning: Story = {
  decorators: [
    createMessageDecorator({ priority: OutputMessagePriority.Warning }),
  ],
};

export const Error: Story = {
  decorators: [
    createMessageDecorator({ priority: OutputMessagePriority.Error }),
  ],
};

export const Detailed: Story = {
  decorators: [
    createMessageDecorator({
      priority: OutputMessagePriority.Success,
      briefMessage: "Brief message",
      detailedMessage: "Detailed message",
    }),
  ],
};

const DynamicDecorator: Decorator = (Story) => {
  const idRef = React.useRef(0);
  return (
    <>
      <Story />
      <DropdownButton
        menuItems={() => [
          <MenuItem
            onClick={() => {
              MessageManager.addToMessageCenter(
                new NotifyMessageDetails(
                  OutputMessagePriority.Info,
                  `Info Message ${++idRef.current}`
                )
              );
            }}
          >
            Info
          </MenuItem>,
          <MenuItem
            onClick={() => {
              MessageManager.addToMessageCenter(
                new NotifyMessageDetails(
                  OutputMessagePriority.Error,
                  `Error Message ${++idRef.current}`
                )
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
                  `Detailed message ${++idRef.current}`,
                  "Additional message details"
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
        ]}
        styleType="borderless"
        style={{ alignSelf: "flex-end" }}
      >
        Add Messages
      </DropdownButton>
    </>
  );
};

export const Dynamic: Story = {
  decorators: [NoMessages, DynamicDecorator],
};
