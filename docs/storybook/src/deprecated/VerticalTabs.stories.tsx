/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../Decorators";
import { VerticalTabs } from "@itwin/core-react/src/core-react/tabs/VerticalTabs";
import { Svg2D } from "@itwin/itwinui-icons-react";

const meta = {
  title: "Deprecated/VerticalTabs",
  component: VerticalTabs,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  args: {
    labels: [
      {
        label: "Tab 1",
        tabId: "tab1",
        icon: <Svg2D />,
        subLabel: "Sublabel 1",
        tooltip: "Tooltip 1",
      },
      "Tab 2",
      "Tab 3",
    ],
  },
} satisfies Meta<typeof VerticalTabs>;

export default meta;
type Story = StoryObj<typeof VerticalTabs>;

export const Basic: Story = {};
