/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../Decorators";
import { AutoSuggest } from "@itwin/core-react/src/core-react/autosuggest/AutoSuggest";

const meta = {
  title: "Components/AutoSuggest",
  component: AutoSuggest,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof AutoSuggest>;

export default meta;
type Story = StoryObj<typeof AutoSuggest>;

export const Basic: Story = {
  args: {
    options: [
      { value: "1", label: "Label 1" },
      { value: "1_1", label: "Label 1_1" },
      { value: "1_2", label: "Label 1_2" },
      { value: "2", label: "Label 2" },
      { value: "3_1", label: "Label 3_1" },
      { value: "3_2", label: "Label 3_2" },
    ],
  },
};
