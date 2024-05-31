/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { RadialButton, RadialMenu } from "@itwin/core-react";
import { Svg2D, Svg3D, SvgActivity } from "@itwin/itwinui-icons-react";
import { AppUiDecorator } from "../Decorators";

const meta = {
  title: "Deprecated/RadialMenu",
  component: RadialMenu,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  args: {
    opened: true,
    innerRadius: 150,
    outerRadius: 220,
    left: "50%",
    top: "50%",
    children: [
      <RadialButton icon={<Svg2D />} onSelect={action("Item 1")}>
        Item 1
      </RadialButton>,
      <RadialButton icon={<Svg3D />} onSelect={action("Item 2")}>
        Item 2
      </RadialButton>,
      <RadialButton icon={<SvgActivity />} onSelect={action("Item 3")}>
        Item 3
      </RadialButton>,
    ],
  },
} satisfies Meta<typeof RadialMenu>;

export default meta;
type Story = StoryObj<typeof RadialMenu>;

export const Basic: Story = {};
