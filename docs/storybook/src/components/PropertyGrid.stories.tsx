/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { Decorator, Meta, StoryObj } from "@storybook/react";
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
} from "@itwin/components-react-internal/src/components-react";
import { AppUiDecorator } from "../Decorators";
import { Orientation } from "@itwin/core-react";

const PaddingDecorator: Decorator = (Story) => {
  return (
    <div style={{ padding: "5px" }}>
      <Story />
    </div>
  );
};

const rendererManager = new PropertyValueRendererManager();

const meta = {
  title: "Components/PropertyGrid",
  component: VirtualizedPropertyGridWithDataProvider,
  tags: ["autodocs"],
  decorators: [PaddingDecorator, AppUiDecorator],
  args: {
    height: 600,
    width: 1300,
  },
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
    onPropertyContextMenu: undefined,
  },
};

export const StructRendering: Story = {
  args: {
    orientation: Orientation.Vertical,
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
            new PropertyRecord(
              {
                valueFormat: PropertyValueFormat.Primitive,
                value: "string value",
              },
              {
                name: "simpleProperty",
                displayLabel: "Simple property",
                typename: "string",
              }
            ),
            new PropertyRecord(
              {
                valueFormat: PropertyValueFormat.Primitive,
                value: multilineString,
              },
              {
                name: "multilineProperty",
                displayLabel: "Multiline property",
                typename: "string",
                renderer: { name: "multiline" },
              }
            ),
            new PropertyRecord(
              {
                valueFormat: PropertyValueFormat.Primitive,
                value: undefined,
              },
              {
                name: "noValueStruct",
                displayLabel: "Struct property with no value",
                typename: "struct",
              }
            ),
            new PropertyRecord(
              {
                valueFormat: PropertyValueFormat.Struct,
                members: structMembers,
              },
              {
                name: "noRendererStructProperty",
                displayLabel: "Struct property (no renderer)",
                typename: "struct",
              }
            ),
            new PropertyRecord(
              {
                valueFormat: PropertyValueFormat.Struct,
                members: structMembers,
              },
              {
                name: "defaultRendererStructProperty",
                displayLabel: "Struct property (default renderer)",
                typename: "struct",
                renderer: { name: "defaultRendererPropertyRenderer" },
              }
            ),
            new PropertyRecord(
              {
                valueFormat: PropertyValueFormat.Struct,
                members: structMembers,
              },
              {
                name: "customRendererStructProperty",
                displayLabel: "Struct property (custom renderer)",
                typename: "struct",
                renderer: { name: "customRendererStructPropertyRenderer" },
              }
            ),
          ],
        },
      }),
      onDataChanged: new PropertyDataChangeEvent(),
    },
  },
};

export const ArrayRendering: Story = {
  args: {
    orientation: Orientation.Horizontal,
    propertyValueRendererManager: rendererManager,
    dataProvider: {
      getData: async () => ({
        label: PropertyRecord.fromString("Record 1"),
        categories: [
          {
            name: "arrayPropertyRendering",
            label: "Array property rendering",
            expand: true,
          },
        ],
        records: {
          arrayPropertyRendering: [
            new PropertyRecord(
              {
                valueFormat: PropertyValueFormat.Primitive,
                value: "string value",
              },
              {
                name: "simpleProperty",
                displayLabel: "Simple property",
                typename: "string",
              }
            ),
            new PropertyRecord(
              {
                valueFormat: PropertyValueFormat.Primitive,
                value: multilineString,
              },
              {
                name: "multilineProperty",
                displayLabel: "Multiline property",
                typename: "string",
                renderer: { name: "multiline" },
              }
            ),
            new PropertyRecord(
              {
                valueFormat: PropertyValueFormat.Array,
                items: [],
                itemsTypeName: "array",
              },
              {
                name: "emptyArray",
                displayLabel: "Array property with no items",
                typename: "array",
              }
            ),
            new PropertyRecord(
              {
                valueFormat: PropertyValueFormat.Array,
                items: arrayMembers,
                itemsTypeName: "array",
              },
              {
                name: "noRendererStructProperty",
                displayLabel: "Array property (no renderer)",
                typename: "array",
              }
            ),
            new PropertyRecord(
              {
                valueFormat: PropertyValueFormat.Array,
                items: arrayMembers,
                itemsTypeName: "array",
              },
              {
                name: "defaultRendererArrayProperty",
                displayLabel: "Array property (default renderer)",
                typename: "array",
                renderer: { name: "defaultRendererPropertyRenderer" },
              }
            ),
            new PropertyRecord(
              {
                valueFormat: PropertyValueFormat.Array,
                items: arrayMembers,
                itemsTypeName: "array",
              },
              {
                name: "customRendererArrayPropertyRenderer",
                displayLabel: "Array property (custom renderer)",
                typename: "struct",
                renderer: { name: "customRendererArrayPropertyRenderer" },
              }
            ),
          ],
        },
      }),
      onDataChanged: new PropertyDataChangeEvent(),
    },
  },
};

export const NestedCategories: Story = {
  args: {
    orientation: Orientation.Horizontal,
    dataProvider: {
      getData: async () => ({
        label: PropertyRecord.fromString("Record 1"),
        categories: [
          {
            name: "category1",
            label: "Category 1",
            expand: true,
            childCategories: [
              {
                name: "category11",
                label: "Category 1-1",
                expand: true,
                childCategories: [
                  {
                    name: "category111",
                    label: "Category 1-1-1",
                    expand: true,
                  },
                  {
                    name: "category112",
                    label: "Category 1-1-2",
                    expand: true,
                  },
                ],
              },
              {
                name: "category12",
                label: "Category 1-2",
                expand: true,
              },
            ],
          },
          {
            name: "category2",
            label: "Category 2",
            expand: true,
            childCategories: [
              {
                name: "category21",
                label: "Category 2-1",
                expand: true,
                childCategories: [
                  {
                    name: "category211",
                    label: "Category 2-1-1",
                    expand: true,
                  },
                  {
                    name: "category212",
                    label: "Category 2-1-2",
                    expand: true,
                  },
                ],
              },
              {
                name: "category22",
                label: "Category 2-2",
                expand: true,
              },
            ],
          },
        ],
        records: {
          category1: createDefaultRecords(),
          category11: createDefaultRecords(),
          category111: createDefaultRecords(),
          category112: createDefaultRecords(),
          category12: createDefaultRecords(),
          category2: createDefaultRecords(),
          category21: createDefaultRecords(),
          category211: createDefaultRecords(),
          category212: createDefaultRecords(),
          category22: createDefaultRecords(),
        },
      }),
      onDataChanged: new PropertyDataChangeEvent(),
    },
  },
};

export const Links: Story = {
  args: {
    dataProvider: {
      getData: async () => ({
        label: PropertyRecord.fromString("Record 1"),
        categories: [{ name: "Group_1", label: "Group 1", expand: true }],
        records: {
          Group_1: [
            PropertyRecord.fromString("https://www.bentley.com"),
            PropertyRecord.fromString("pw://test"),
          ],
        },
      }),
      onDataChanged: new PropertyDataChangeEvent(),
    },
    onPropertyContextMenu: undefined,
  },
};

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
  member1: PropertyRecord.fromString("Value 1", "Member 1"),
  member2: PropertyRecord.fromString("Value 2", "Member 2"),
  member3: PropertyRecord.fromString("Value 3", "Member 3"),
};

const arrayMembers = [
  PropertyRecord.fromString("Value 1", "Item 1"),
  PropertyRecord.fromString("Value 2", "Item 2"),
  PropertyRecord.fromString("Value 3", "Item 3"),
];

const multilineString =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n";

function createDefaultRecords() {
  return [
    new PropertyRecord(
      {
        valueFormat: PropertyValueFormat.Primitive,
        value: "string value",
      },
      {
        name: "stringProperty",
        displayLabel: "String property",
        typename: "string",
      }
    ),
    new PropertyRecord(
      {
        valueFormat: PropertyValueFormat.Primitive,
        value: 123,
      },
      {
        name: "intProperty",
        displayLabel: "Int property",
        typename: "int",
      }
    ),
    new PropertyRecord(
      {
        valueFormat: PropertyValueFormat.Primitive,
        value: 123.456,
      },
      {
        name: "doubleProperty",
        displayLabel: "DoubleProperty",
        typename: "double",
      }
    ),
  ];
}
