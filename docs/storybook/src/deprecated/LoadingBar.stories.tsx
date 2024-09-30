/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { LoadingBar } from "@itwin/core-react-internal/src/core-react/loading/LoadingBar";
import { AppUiDecorator } from "../Decorators";

const meta = {
  title: "Deprecated/LoadingBar",
  component: LoadingBar,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof LoadingBar>;

export default meta;
type Story = StoryObj<typeof LoadingBar>;

export const Basic: Story = {};
