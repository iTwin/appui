/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { LoadingPrompt } from "@itwin/core-react-internal/src/core-react/loading/LoadingPrompt";
import { AppUiDecorator } from "../Decorators";

const meta = {
  title: "Deprecated/LoadingPrompt",
  component: LoadingPrompt,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof LoadingPrompt>;

export default meta;
type Story = StoryObj<typeof LoadingPrompt>;

export const Basic: Story = {};
