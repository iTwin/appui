/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppUiDecorator } from "../Decorators";
import { ImageCheckBox } from "@itwin/core-react-internal/src/core-react/imagecheckbox/ImageCheckBox";
import { Svg2D, Svg3D } from "@itwin/itwinui-icons-react";
import { StrataKitIcon } from "../../.storybook/addons/theme-bridge/StrataKitIcon";

import svg2d from "@stratakit/icons/2d.svg";
import svg3d from "@stratakit/icons/3d.svg";

const meta = {
  title: "Deprecated/ImageCheckBox",
  component: ImageCheckBox,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  args: {
    imageOn: <StrataKitIcon href={svg2d} iconNode={<Svg2D />} />,
    imageOff: <StrataKitIcon href={svg3d} iconNode={<Svg3D />} />,
    checked: false,
  },
} satisfies Meta<typeof ImageCheckBox>;

export default meta;
type Story = StoryObj<typeof ImageCheckBox>;

export const Basic: Story = {};
