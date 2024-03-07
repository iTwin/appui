/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { NestedMenu } from "@itwin/appui-react/src/appui-react/toolbar/group/NestedMenu";
import { AppUiDecorator } from "../Decorators";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { action } from "@storybook/addon-actions";

const meta = {
  title: "Components/internal/NestedMenu",
  component: NestedMenu,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  args: {
    title: "Menu title",
    onBack: action("back"),
    children: (
      <NestedMenu.Column>
        <NestedMenu.Item icon={<SvgPlaceholder />} children="Test 1" />
        <NestedMenu.Item icon={<SvgPlaceholder />} children="Test 2" />
        <NestedMenu.Item icon={<SvgPlaceholder />} children="Test 3" submenu />
      </NestedMenu.Column>
    ),
  },
} satisfies Meta<typeof NestedMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Nested: Story = {
  args: {
    nested: true,
  },
};

export const Columns: Story = {
  args: {
    children: (
      <>
        <NestedMenu.Column>
          <NestedMenu.Item icon={<SvgPlaceholder />} children="Test 1_1" />
          <NestedMenu.Item
            icon={<SvgPlaceholder />}
            children="Test 1_2"
            submenu
          />
          <NestedMenu.Item icon={<SvgPlaceholder />} children="Test 1_3" />
        </NestedMenu.Column>
        <NestedMenu.Column>
          <NestedMenu.Item
            icon={<SvgPlaceholder />}
            children="Test 2_1"
            submenu
          />
          <NestedMenu.Item icon={<SvgPlaceholder />} children="Test 2_2" />
        </NestedMenu.Column>
      </>
    ),
  },
};
