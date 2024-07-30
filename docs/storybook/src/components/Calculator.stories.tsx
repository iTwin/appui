/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { Calculator } from "@itwin/appui-react";
import { action } from "@storybook/addon-actions";
import { AppUiDecorator } from "../Decorators";

const meta = {
  title: "Components/Calculator",
  component: Calculator,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof Calculator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    engine: undefined!, // set via defaultProps
    onOk: action("onOk"),
    onCancel: action("onCancel"),
  },
};
