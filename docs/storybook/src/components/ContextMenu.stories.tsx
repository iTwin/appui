/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { ContextMenuItem, ContextSubMenu } from "@itwin/core-react";
import { ContextMenu } from "@itwin/core-react/src/core-react/contextmenu/ContextMenu";
import { AppUiDecorator } from "../Decorators";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";

const meta = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  args: {
    opened: true,
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (props) => {
    return (
      <ContextMenu {...props}>
        <ContextSubMenu label="Test 1" id="1">
          <ContextMenuItem>Test 1.1</ContextMenuItem>
        </ContextSubMenu>
        <ContextSubMenu label="Test 2" id="2">
          <ContextMenuItem>Test 2.1</ContextMenuItem>
          <ContextSubMenu label="Test 2.2" id="22">
            <ContextMenuItem>Test 2.2.1</ContextMenuItem>
          </ContextSubMenu>
        </ContextSubMenu>
      </ContextMenu>
    );
  },
};

export const WithIcons: Story = {
  render: (props) => {
    return (
      <ContextMenu {...props}>
        <ContextSubMenu icon={<SvgPlaceholder />} label="Test 1" id="1">
          <ContextMenuItem icon={<SvgPlaceholder />}>Test 1.1</ContextMenuItem>
        </ContextSubMenu>
        <ContextSubMenu icon={<SvgPlaceholder />} label="Test 2" id="2">
          <ContextMenuItem icon={<SvgPlaceholder />}>Test 2.1</ContextMenuItem>
          <ContextSubMenu icon={<SvgPlaceholder />} label="Test 2.2" id="22">
            <ContextMenuItem icon={<SvgPlaceholder />}>
              Test 2.2.1
            </ContextMenuItem>
          </ContextSubMenu>
        </ContextSubMenu>
      </ContextMenu>
    );
  },
};
