/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { GlobalDialog } from "@itwin/core-react-internal/src/core-react/dialog/GlobalDialog";
import { DialogButtonType } from "@itwin/appui-abstract";
import { ThemeProvider } from "@itwin/itwinui-react";

const StoryDecorator: Decorator = (Story) => {
  return (
    <ThemeProvider>
      <Story />
      <div id="core-dialog-root" />
    </ThemeProvider>
  );
};

const meta = {
  title: "Deprecated/GlobalDialog",
  component: GlobalDialog,
  tags: ["autodocs"],
  decorators: [StoryDecorator],
} satisfies Meta<typeof GlobalDialog>;

export default meta;
type Story = StoryObj<typeof GlobalDialog>;

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
    identifier: "my-dialog-1",
  },
};
