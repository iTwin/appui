/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../Decorators";
import { ImageCheckBox } from "@itwin/core-react/src/core-react/imagecheckbox/ImageCheckBox";
import { Svg2D, Svg3D } from "@itwin/itwinui-icons-react";

const meta = {
  title: "Deprecated/ImageCheckBox",
  component: ImageCheckBox,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof ImageCheckBox>;

export default meta;
type Story = StoryObj<typeof ImageCheckBox>;

export const Basic: Story = {
  args: {
    imageOn: <Svg3D />,
    imageOff: <Svg2D />,
  },
};
