/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../Decorators";
import { SearchBox } from "@itwin/core-react-internal/src/core-react/searchbox/SearchBox";
import { action } from "@storybook/addon-actions";

const meta = {
  title: "Deprecated/SearchBox",
  component: SearchBox,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  args: {
    onValueChanged: action("onValueChanged"),
    onClear: action("onClear"),
    onEnterPressed: action("onEnterPressed"),
    onEscPressed: action("onEscPressed"),
  },
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof SearchBox>;

export const Basic: Story = {};

export const WithDelay: Story = {
  args: {
    ...meta.args,
    valueChangedDelay: 1000,
  },
};
