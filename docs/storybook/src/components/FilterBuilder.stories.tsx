/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { Meta, StoryObj } from "@storybook/react";
import {
  PropertyDescription,
  PropertyValueFormat,
  StandardTypeNames,
} from "@itwin/appui-abstract";
import {
  FilterRuleGroupOperator,
  Filter,
  FilterRuleOperator,
} from "@itwin/components-react";
import { AppUiDecorator } from "../AppUiDecorator";
import { FilterBuilderStory } from "./FilterBuilder";

const meta = {
  title: "Components/FilterBuilder",
  component: FilterBuilderStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof FilterBuilderStory>;

export default meta;
type Story = StoryObj<typeof FilterBuilderStory>;

export const Basic: Story = {
  args: {
    properties: createProperties(),
  },
};

export const WithInitialFilter: Story = {
  args: {
    initialFilter: createInitialFilter(),
    properties: createProperties(),
  },
};

function createProperties(): PropertyDescription[] {
  return [
    {
      name: "string-prop",
      displayLabel: "String Property",
      typename: StandardTypeNames.String,
    },
    {
      name: "int-prop",
      displayLabel: "Integer Property",
      typename: StandardTypeNames.Integer,
    },
    {
      name: "double-prop",
      displayLabel: "Double Property",
      typename: StandardTypeNames.Double,
    },
    {
      name: "date-prop",
      displayLabel: "Date Property",
      typename: StandardTypeNames.DateTime,
    },
    {
      name: "bool-prop",
      displayLabel: "Boolean Property",
      typename: StandardTypeNames.Boolean,
    },
    {
      name: "enum-prop",
      displayLabel: "Enum Property",
      typename: StandardTypeNames.Enum,
      enum: {
        choices: [
          { label: "Choice 1", value: 1 },
          { label: "Choice 2", value: 2 },
          { label: "Choice 3", value: 3 },
        ],
      },
    },
  ];
}

function createInitialFilter(): Filter {
  const properties = createProperties();
  return {
    operator: FilterRuleGroupOperator.Or,
    rules: [
      {
        property: properties[1],
        operator: FilterRuleOperator.Less,
        value: { valueFormat: PropertyValueFormat.Primitive, value: 123 },
      },
      {
        property: properties[0],
        operator: FilterRuleOperator.Like,
      },
    ],
  };
}
