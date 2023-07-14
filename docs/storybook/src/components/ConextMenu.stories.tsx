/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { StateManager, ThemeManager } from "@itwin/appui-react";
import { ContextMenuItem, ContextSubMenu } from "@itwin/core-react";
import { ContextMenu } from "@itwin/core-react/src/core-react/contextmenu/ContextMenu";
import { Provider } from "react-redux";

const meta = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    opened: true,
  },
  render: (props) => {
    // TODO:
    new StateManager();
    return (
      <Provider store={StateManager.store}>
        <ThemeManager>
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
        </ThemeManager>
      </Provider>
    );
  },
};
