/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { Meta, StoryObj } from "@storybook/react";
import {
  ArrayValue,
  PrimitiveValue,
  PropertyRecord,
  PropertyValueFormat,
  StructValue,
} from "@itwin/appui-abstract";
import {
  MultilineTextPropertyValueRenderer,
  PropertyDataChangeEvent,
  PropertyValueRendererManager,
  VirtualizedPropertyGridWithDataProvider,
} from "@itwin/components-react/src/components-react";
import { AppUiDecorator } from "../Decorators";

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

const rendererManager = new PropertyValueRendererManager();

rendererManager.registerRenderer("customRendererStructPropertyRenderer", {
  canRender: () => true,
  render: (record) => {
    const entries = Object.entries((record.value as StructValue).members);
    return (
      <ul>
        {entries.map((entry) => {
          return (
            <li key={entry[0]}>
              {entry[0]} = {(entry[1].value as PrimitiveValue).displayValue}
            </li>
          );
        })}
      </ul>
    );
  },
});

rendererManager.registerRenderer("customRendererArrayPropertyRenderer", {
  canRender: () => true,
  render: (record) => {
    const items = (record.value as ArrayValue).items;
    return (
      <ol>
        {items.map((item, index) => {
          return (
            <li key={index}>{(item.value as PrimitiveValue).displayValue}</li>
          );
        })}
      </ol>
    );
  },
});

rendererManager.registerRenderer("defaultRendererPropertyRenderer", {
  canRender: () => false,
  render: () => {
    <div>Should not render</div>;
  },
});

rendererManager.registerRenderer(
  "multiline",
  new MultilineTextPropertyValueRenderer()
);

const structMembers = {
  member1: PropertyRecord.fromString("Value 1"),
  member2: PropertyRecord.fromString("Value 2"),
  member3: PropertyRecord.fromString("Value 3"),
};

const arrayMembers = [
  PropertyRecord.fromString("Value 1"),
  PropertyRecord.fromString("Value 2"),
  PropertyRecord.fromString("Value 3"),
];

export const StructRendering: Story = {
  args: {
    propertyValueRendererManager: rendererManager,
    dataProvider: {
      getData: async () => ({
        label: PropertyRecord.fromString("Record 1"),
        categories: [
          {
            name: "structPropertyRendering",
            label: "Struct property rendering",
            expand: true,
          },
        ],
        records: {
          structPropertyRendering: [
            {
              value: {
                valueFormat: PropertyValueFormat.Primitive,
                value: "string value",
              },
              property: {
                name: "simpleProperty",
                displayLabel: "Simple property",
                typename: "string",
              },
              copyWithNewValue: () => ({} as unknown as PropertyRecord),
              getChildrenRecords: () => [],
            },
            {
              value: {
                valueFormat: PropertyValueFormat.Primitive,
                value:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \nquis nostrud exercitation ullamco laboris nisi ut aliquip ex \nea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
              property: {
                name: "multilineProperty",
                displayLabel: "Multiline property",
                typename: "string",
                renderer: { name: "multiline" },
              },
              copyWithNewValue: () => ({} as unknown as PropertyRecord),
              getChildrenRecords: () => [],
            },
            {
              value: {
                valueFormat: PropertyValueFormat.Primitive,
                value: undefined,
              },
              property: {
                name: "noValueStruct",
                displayLabel: "Struct property with no value",
                typename: "struct",
              },
              copyWithNewValue: () => ({} as unknown as PropertyRecord),
              getChildrenRecords: () => [],
            },
            {
              value: {
                valueFormat: PropertyValueFormat.Struct,
                members: structMembers,
              } as StructValue,
              property: {
                name: "noRendererStructProperty",
                displayLabel: "Struct property (no renderer)",
                typename: "struct",
              },
              copyWithNewValue: () => ({} as unknown as PropertyRecord),
              getChildrenRecords: () => arrayMembers,
            },
            {
              value: {
                valueFormat: PropertyValueFormat.Struct,
                members: structMembers,
              } as StructValue,
              property: {
                name: "defaultRendererStructProperty",
                displayLabel: "Struct property (default renderer)",
                typename: "struct",
                renderer: { name: "defaultRendererPropertyRenderer" },
              },
              copyWithNewValue: () => ({} as unknown as PropertyRecord),
              getChildrenRecords: () => arrayMembers,
            },
            {
              value: {
                valueFormat: PropertyValueFormat.Struct,
                members: structMembers,
              } as StructValue,
              property: {
                name: "customRendererStructProperty",
                displayLabel: "Struct property (custom renderer)",
                typename: "struct",
                renderer: { name: "customRendererStructPropertyRenderer" },
              },
              copyWithNewValue: () => ({} as unknown as PropertyRecord),
              getChildrenRecords: () => arrayMembers,
            },
          ],
        },
      }),
      onDataChanged: new PropertyDataChangeEvent(),
    },
    height: 400,
  },
};

export const ArrayRendering: Story = {
  args: {
    propertyValueRendererManager: rendererManager,
    dataProvider: {
      getData: async () => ({
        label: PropertyRecord.fromString("Record 1"),
        categories: [
          {
            name: "structPropertyRendering",
            label: "Struct property rendering",
            expand: true,
          },
        ],
        records: {
          structPropertyRendering: [
            {
              value: {
                valueFormat: PropertyValueFormat.Primitive,
                value: "string value",
              },
              property: {
                name: "simpleProperty",
                displayLabel: "Simple property",
                typename: "string",
              },
              copyWithNewValue: () => ({} as unknown as PropertyRecord),
              getChildrenRecords: () => [],
            },
            {
              value: {
                valueFormat: PropertyValueFormat.Primitive,
                value:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              },
              property: {
                name: "multilineProperty",
                displayLabel: "Multiline property",
                typename: "string",
                renderer: { name: "multiline" },
              },
              copyWithNewValue: () => ({} as unknown as PropertyRecord),
              getChildrenRecords: () => [],
            },
            {
              value: {
                valueFormat: PropertyValueFormat.Array,
                items: [],
                itemsTypeName: "array",
              } as ArrayValue,
              property: {
                name: "emptyArray",
                displayLabel: "Array property with no items",
                typename: "array",
              },
              copyWithNewValue: () => ({} as unknown as PropertyRecord),
              getChildrenRecords: () => [],
            },
            {
              value: {
                valueFormat: PropertyValueFormat.Array,
                items: arrayMembers,
                itemsTypeName: "array",
              } as ArrayValue,
              property: {
                name: "noRendererStructProperty",
                displayLabel: "Array property (no renderer)",
                typename: "array",
              },
              copyWithNewValue: () => ({} as unknown as PropertyRecord),
              getChildrenRecords: () => arrayMembers,
            },
            {
              value: {
                valueFormat: PropertyValueFormat.Array,
                items: arrayMembers,
                itemsTypeName: "array",
              } as ArrayValue,
              property: {
                name: "defaultRendererArrayProperty",
                displayLabel: "Array property (default renderer)",
                typename: "array",
                renderer: { name: "defaultRendererPropertyRenderer" },
              },
              copyWithNewValue: () => ({} as unknown as PropertyRecord),
              getChildrenRecords: () => arrayMembers,
            },
            {
              value: {
                valueFormat: PropertyValueFormat.Array,
                items: arrayMembers,
                itemsTypeName: "array",
              } as ArrayValue,
              property: {
                name: "customRendererArrayPropertyRenderer",
                displayLabel: "Array property (custom renderer)",
                typename: "struct",
                renderer: { name: "customRendererArrayPropertyRenderer" },
              },
              copyWithNewValue: () => ({} as unknown as PropertyRecord),
              getChildrenRecords: () => arrayMembers,
            },
          ],
        },
      }),
      onDataChanged: new PropertyDataChangeEvent(),
    },
    height: 400,
  },
};
