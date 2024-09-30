/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { IconInput } from "@itwin/core-react-internal/src/core-react/inputs/iconinput/IconInput";
import { Svg2D } from "@itwin/itwinui-icons-react";
import { AppUiDecorator } from "../Decorators";

const meta = {
  title: "Deprecated/IconInput",
  component: IconInput,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof IconInput>;

export default meta;
type Story = StoryObj<typeof IconInput>;

export const Basic: Story = {
  args: {
    icon: <Svg2D />,
  },
};
