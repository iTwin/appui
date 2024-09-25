/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../Decorators";
import { ElementSeparator } from "@itwin/core-react-internal/src/core-react/elementseparator/ElementSeparator";

const meta = {
  title: "Deprecated/ElementSeparator",
  component: ElementSeparator,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof ElementSeparator>;

export default meta;
type Story = StoryObj<typeof ElementSeparator>;

export const Basic: Story = {};
