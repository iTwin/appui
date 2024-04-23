/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { LoadingStatus } from "@itwin/core-react/src/core-react/loading/LoadingStatus";
import { AppUiDecorator } from "../Decorators";

const meta = {
  title: "Deprecated/LoadingStatus",
  component: LoadingStatus,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof LoadingStatus>;

export default meta;
type Story = StoryObj<typeof LoadingStatus>;

export const Basic: Story = {
  args: {
    message: "Loading...",
    percent: 33,
  },
};
