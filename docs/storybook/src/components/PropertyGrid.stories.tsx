/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { Meta, StoryObj } from "@storybook/react";
import {
  PropertyDataChangeEvent,
  VirtualizedPropertyGridWithDataProvider,
} from "@itwin/components-react/src/components-react";
import { AppUiDecorator } from "../AppUiDecorator";
import { PropertyRecord } from "@itwin/appui-abstract";

const meta = {
  title: "Components/PropertyGrid",
  component: VirtualizedPropertyGridWithDataProvider,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof VirtualizedPropertyGridWithDataProvider>;

export default meta;
type Story = StoryObj<typeof VirtualizedPropertyGridWithDataProvider>;

export const Basic: Story = {
  args: {
    dataProvider: {
      getData: async () => ({
        label: PropertyRecord.fromString("Record 1"),
        categories: [
          { name: "Group_1", label: "Group 1", expand: true },
          { name: "Group_2", label: "Group 2", expand: false },
        ],
        records: {
          Group_1: [
            PropertyRecord.fromString("Record 1_1"),
            PropertyRecord.fromString("Record 1_2"),
          ],
          Group_2: [
            PropertyRecord.fromString("Record 2_1"),
            PropertyRecord.fromString("Record 2_2"),
          ],
        },
      }),
      onDataChanged: new PropertyDataChangeEvent(),
    },
    height: 400,
  },
};
