/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { LoadingSpinner } from "@itwin/core-react-internal/src/core-react/loading/LoadingSpinner";
import { AppUiDecorator } from "../Decorators";

const meta = {
  title: "Deprecated/LoadingSpinner",
  component: LoadingSpinner,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

export const Basic: Story = {};
