/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "@itwin/core-react-internal/src/core-react/dialog/Dialog";
import { AppUiDecorator } from "../Decorators";
import { DialogButtonType } from "@itwin/appui-abstract";

const meta = {
  title: "Deprecated/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Basic: Story = {
  args: {
    opened: true,
    title: "Title",
    children: "Content",
    buttonCluster: [
      {
        type: DialogButtonType.Cancel,
        onClick: () => undefined,
        label: "Cancel",
      },
      { type: DialogButtonType.OK, onClick: () => undefined, label: "OK" },
    ],
  },
};
