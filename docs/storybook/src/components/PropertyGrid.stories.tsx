/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import {
  ArrayValue,
  PrimitiveValue,
  PropertyDescription,
  PropertyRecord,
  PropertyValue,
  PropertyValueFormat,
  StandardTypeNames,
  StructValue,
} from "@itwin/appui-abstract";
import { action } from "storybook/actions";
import {
  Orientation,
  PropertyValueRendererManager,
} from "@itwin/components-react";
import { MultilineTextPropertyValueRenderer } from "@itwin/components-react-internal/src/components-react/properties/renderers/value/MultilineTextPropertyValueRenderer";

import { AppUiDecorator } from "../Decorators";
import { PropertyGridStory } from "./PropertyGrid";
import { ButtonGroup, IconButton } from "@itwin/itwinui-react";
import { SvgCopy, SvgSelection } from "@itwin/itwinui-icons-react";

const multilineString =
  // cspell:disable-next-line
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n";

const PaddingDecorator: Decorator = (Story) => {
  return (
    <div style={{ padding: "5px" }}>
      <Story />
    </div>
  );
};

const createStructRecord = (
  property: Partial<PropertyDescription> & { displayLabel: string },
  value: {
    count: number;
    createMember: (name: string) => PropertyRecord;
  }
): PropertyRecord => {
  return new PropertyRecord(
    {
      valueFormat: PropertyValueFormat.Struct,
      members: new Array(value.count).fill(0).reduce((members, _, index) => {
        const name = `member${index + 1}`;
        members[name] = value.createMember(`Member ${index + 1}`);
        return members;
      }, {} as { [name: string]: PropertyRecord }),
    },
    {
      typename: "struct",
      name: property.displayLabel,
      ...property,
    }
  );
};

const createArrayRecord = (
  property: Partial<PropertyDescription> & { displayLabel: string },
  value: {
    count: number;
    type: string;
    createItem: (index: number) => PropertyRecord;
  }
): PropertyRecord => {
  return new PropertyRecord(
    {
      valueFormat: PropertyValueFormat.Array,
      items: Array.from({ length: value.count }, (_, index) =>
        value.createItem(index)
      ),
      itemsTypeName: value.type,
    },
    {
      typename: "struct",
      name: property.displayLabel,
      ...property,
    }
  );
};

const rendererManager = new PropertyValueRendererManager();

const meta = {
  title: "Components/PropertyGrid",
  component: PropertyGridStory,
  tags: ["autodocs"],
  decorators: [PaddingDecorator, AppUiDecorator],
  args: {
    height: 900,
    width: 500,
  },
} satisfies Meta<typeof PropertyGridStory>;

export default meta;
type Story = StoryObj<typeof PropertyGridStory>;

export const Basic: Story = {
  args: {
    data: {
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
    },
    onPropertyContextMenu: undefined,
  },
};

export const ComplexProperties: Story = {
  args: {
    data: {
      label: PropertyRecord.fromString("Record 1"),
      categories: [{ name: "all", label: "All", expand: true }],
      records: {
        all: [
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
          createArrayRecord(
            {
              displayLabel: "Array property",
            },
            {
              count: 2,
              type: "string",
              createItem: (index) =>
                PropertyRecord.fromString(`Item ${index}`, `Item ${index}`),
            }
          ),
          createStructRecord(
            {
              displayLabel: "Struct property",
            },
            {
              count: 3,
              createMember: (name) =>
                PropertyRecord.fromString(`Value for ${name}`, name),
            }
          ),
          createArrayRecord(
            {
              displayLabel: "Array of Structs property",
            },
            {
              count: 2,
              type: "struct",
              createItem: (index) =>
                createStructRecord(
                  {
                    displayLabel: `Struct in array ${index}`,
                  },
                  {
                    count: 3,
                    createMember: (name) =>
                      PropertyRecord.fromString(`Value for ${name}`, name),
                  }
                ),
            }
          ),
          createStructRecord(
            {
              displayLabel: "Struct with Arrays property",
            },
            {
              count: 2,
              createMember: (name) =>
                createArrayRecord(
                  {
                    displayLabel: `Array in struct ${name}`,
                  },
                  {
                    count: 2,
                    type: "string",
                    createItem: (index) =>
                      PropertyRecord.fromString(
                        `Value for ${name} item ${index}`,
                        `Item ${index}`
                      ),
                  }
                ),
            }
          ),
        ],
      },
    },
  },
};

export const SimpleCategorization: Story = {
  args: {
    orientation: Orientation.Vertical,
    data: {
      label: PropertyRecord.fromString("Record 1"),
      categories: [
        {
          name: "item",
          label: "Item",
          expand: true,
          childCategories: [
            {
              name: "relatedSameItem",
              label: "Categorized Properties",
              expand: true,
            },
          ],
        },
        { name: "relatedItem", label: "Related Item", expand: true },
      ],
      records: {
        item: [
          PropertyRecord.fromString("Item name", "Name"),
          PropertyRecord.fromString("20m", "Height"),
        ],
        relatedSameItem: [
          PropertyRecord.fromString("Name of related direct item", "Name"),
          PropertyRecord.fromString("35m", "Height"),
          PropertyRecord.fromString("Tower", "Type"),
        ],
        relatedItem: [
          PropertyRecord.fromString(
            "Name of non directly related item",
            "Name"
          ),
          PropertyRecord.fromString("50m", "Width"),
        ],
      },
    },
  },
};

export const StructRendering: Story = {
  args: {
    orientation: Orientation.Vertical,
    propertyValueRendererManager: rendererManager,
    data: {
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
              value: undefined,
            },
            {
              name: "noValueStruct",
              displayLabel: "Struct property with no value",
              typename: "struct",
            }
          ),
          createStructRecord(
            {
              name: "noRendererStructProperty",
              displayLabel: "Struct property (no renderer)",
            },
            {
              count: 3,
              createMember: (name) =>
                PropertyRecord.fromString(`Value for ${name}`, name),
            }
          ),
          createStructRecord(
            {
              name: "defaultRendererStructProperty",
              displayLabel: "Struct property (default renderer)",
              renderer: { name: "defaultRendererPropertyRenderer" },
            },
            {
              count: 3,
              createMember: (name) =>
                PropertyRecord.fromString(`Value for ${name}`, name),
            }
          ),
          createStructRecord(
            {
              name: "customRendererStructProperty",
              displayLabel: "Struct property (custom renderer)",
              renderer: { name: "customRendererStructPropertyRenderer" },
            },
            {
              count: 3,
              createMember: (name) =>
                PropertyRecord.fromString(`Value for ${name}`, name),
            }
          ),
        ],
      },
    },
  },
};

export const ArrayRendering: Story = {
  args: {
    orientation: Orientation.Horizontal,
    propertyValueRendererManager: rendererManager,
    data: {
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
          createArrayRecord(
            {
              name: "noRendererStructProperty",
              displayLabel: "Array property (no renderer)",
              typename: "array",
            },
            {
              count: 3,
              type: "array",
              createItem: (index) =>
                PropertyRecord.fromString(
                  `Value ${index + 1}`,
                  `Item ${index + 1}`
                ),
            }
          ),
          createArrayRecord(
            {
              name: "defaultRendererArrayProperty",
              displayLabel: "Array property (default renderer)",
              typename: "array",
              renderer: { name: "defaultRendererPropertyRenderer" },
            },
            {
              count: 3,
              type: "array",
              createItem: (index) =>
                PropertyRecord.fromString(
                  `Value ${index + 1}`,
                  `Item ${index + 1}`
                ),
            }
          ),
          createArrayRecord(
            {
              name: "customRendererArrayPropertyRenderer",
              displayLabel: "Array property (custom renderer)",
              typename: "array",
              renderer: { name: "customRendererArrayPropertyRenderer" },
            },
            {
              count: 3,
              type: "array",
              createItem: (index) =>
                PropertyRecord.fromString(
                  `Value ${index + 1}`,
                  `Item ${index + 1}`
                ),
            }
          ),
        ],
      },
    },
  },
};

export const NestedCategories: Story = {
  args: {
    orientation: Orientation.Horizontal,
    data: {
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
    },
  },
};

export const Links: Story = {
  args: {
    data: {
      label: PropertyRecord.fromString("Record 1"),
      categories: [{ name: "Group_1", label: "Group 1", expand: true }],
      records: {
        Group_1: [
          PropertyRecord.fromString("https://www.bentley.com"),
          PropertyRecord.fromString("pw://test"),
        ],
      },
    },
    onPropertyContextMenu: undefined,
  },
};

export const PropertyActions: Story = {
  args: {
    data: {
      label: PropertyRecord.fromString("Record 1"),
      categories: [{ name: "item", label: "Item", expand: true }],
      records: {
        item: [
          PropertyRecord.fromString("Some value", "Property with actions"),
          PropertyRecord.fromString("Other value", "Property without actions"),
        ],
      },
    },
    onPropertyContextMenu: undefined,
    isPropertyHoverEnabled: true,
    actionButtonRenderers: [
      ({ property, isPropertyHovered }) => {
        if (
          property.property.displayLabel === "Property with actions" &&
          isPropertyHovered
        ) {
          return (
            <ButtonGroup>
              <IconButton label="Copy" styleType="borderless" size="small">
                <SvgCopy />
              </IconButton>
              <IconButton label="Focus" styleType="borderless" size="small">
                <SvgSelection />
              </IconButton>
            </ButtonGroup>
          );
        }
      },
    ],
  },
};

export const Editable: Story = {
  args: {
    isPropertyEditingEnabled: true,
    onPropertyUpdated: async ({ propertyRecord, newValue }) => {
      action("onPropertyUpdated")(
        `Property "${propertyRecord.property.name}" updated to: ${
          (newValue as PrimitiveValue).value
        }`
      );
      return true;
    },
    data: {
      label: PropertyRecord.fromString("Record 1"),
      categories: [
        { name: "Editable", label: "Editable", expand: true },
        { name: "Readonly", label: "Readonly", expand: true },
        { name: "Disabled", label: "Disabled", expand: true },
      ],
      records: {
        Editable: createPropertyRecords("editable_"),
        Readonly: createPropertyRecords("readonly_", { isReadonly: true }),
        Disabled: createPropertyRecords("disabled_", { isDisabled: true }),
      },
    },
  },
};

export const MergedProperties: Story = {
  args: {
    data: {
      label: PropertyRecord.fromString("Multi-selection"),
      categories: [
        { name: "Merged", label: "Merged Properties", expand: true },
      ],
      records: {
        Merged: [
          (() => {
            const record = new PropertyRecord(
              {
                valueFormat: PropertyValueFormat.Primitive,
                value: 42,
                displayValue: "-- ft",
              },
              {
                name: "mergedQuantity",
                displayLabel: "Length (quantity with unit)",
                typename: StandardTypeNames.Double,
                quantityType: "Length",
              }
            );
            record.isMerged = true;
            return record;
          })(),
          (() => {
            const record = new PropertyRecord(
              {
                valueFormat: PropertyValueFormat.Primitive,
                value: "hello",
                displayValue: "hello",
              },
              {
                name: "mergedString",
                displayLabel: "Name (no unit)",
                typename: StandardTypeNames.String,
              }
            );
            record.isMerged = true;
            return record;
          })(),
          (() => {
            const record = new PropertyRecord(
              {
                valueFormat: PropertyValueFormat.Primitive,
                value: 100,
                displayValue: "-- m²",
              },
              {
                name: "mergedArea",
                displayLabel: "Area (quantity with unit)",
                typename: StandardTypeNames.Double,
                quantityType: "Area",
              }
            );
            record.isMerged = true;
            return record;
          })(),
          (() => {
            const record = new PropertyRecord(
              {
                valueFormat: PropertyValueFormat.Primitive,
                value: 14.23,
                displayValue: "14.23 ft",
              },
              {
                name: "mergedWithValue",
                displayLabel: "Width (value without --)",
                typename: StandardTypeNames.Double,
                quantityType: "Length",
              }
            );
            record.isMerged = true;
            return record;
          })(),
        ],
      },
    },
    onPropertyContextMenu: undefined,
  },
};

export const AlwaysVisibleEditor: Story = {
  args: {
    data: {
      label: PropertyRecord.fromString("Record 1"),
      categories: [
        { name: "Group_1", label: "Group 1", expand: true },
        { name: "Group_2", label: "Group 2", expand: true },
      ],
      records: {
        Group_1: [
          new PropertyRecord(
            {
              valueFormat: PropertyValueFormat.Primitive,
              value: true,
            },
            {
              name: "toggleProperty",
              displayLabel: "Always visible toggle editor",
              typename: "boolean",
              editor: { name: "toggle" },
            }
          ),
          new PropertyRecord(
            {
              valueFormat: PropertyValueFormat.Primitive,
              value: false,
            },
            {
              name: "toggleProperty2",
              displayLabel: "Always visible toggle editor",
              typename: "boolean",
              editor: { name: "toggle" },
            }
          ),
        ],
        Group_2: [
          new PropertyRecord(
            {
              valueFormat: PropertyValueFormat.Primitive,
              value: true,
            },
            {
              name: "toggleProperty3",
              displayLabel: "Not always visible boolean editor",
              typename: "boolean",
            }
          ),
          new PropertyRecord(
            {
              valueFormat: PropertyValueFormat.Primitive,
              value: "Text",
            },
            {
              name: "stringProperty",
              displayLabel: "Not always visible string editor",
              typename: "string",
            }
          ),
        ],
        Group_3: [],
      },
    },
    onPropertyContextMenu: undefined,
    isPropertyEditingEnabled: true,
    alwaysShowEditor: (propertyRecord: PropertyRecord) =>
      propertyRecord.property.editor?.name === "toggle",
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
    return <div>Should not render</div>;
  },
});

rendererManager.registerRenderer(
  "multiline",
  new MultilineTextPropertyValueRenderer()
);

function createPropertyRecords(
  prefix: string = "",
  recordProps?: { isDisabled?: boolean; isReadonly?: boolean }
) {
  return [
    createPropertyRecord(
      {
        valueFormat: PropertyValueFormat.Primitive,
        value: "text value",
      },
      {
        name: `${prefix}stringProperty`,
        displayLabel: "String Property",
        typename: StandardTypeNames.String,
      },
      recordProps
    ),
    createPropertyRecord(
      {
        valueFormat: PropertyValueFormat.Primitive,
        value: 42,
      },
      {
        name: `${prefix}intProperty`,
        displayLabel: "Int Property",
        typename: StandardTypeNames.Int,
      },
      recordProps
    ),
    createPropertyRecord(
      {
        valueFormat: PropertyValueFormat.Primitive,
        value: true,
        displayValue: "True",
      },
      {
        name: `${prefix}boolProperty`,
        displayLabel: "Boolean Property",
        typename: StandardTypeNames.Boolean,
      },
      recordProps
    ),
    createPropertyRecord(
      {
        valueFormat: PropertyValueFormat.Primitive,
        value: new Date(),
      },
      {
        name: `${prefix}dateProperty`,
        displayLabel: "Date Property",
        typename: StandardTypeNames.ShortDate,
      },
      recordProps
    ),
    createPropertyRecord(
      {
        valueFormat: PropertyValueFormat.Primitive,
        value: new Date(),
      },
      {
        name: `${prefix}dateTimeProperty`,
        displayLabel: "DateTime Property",
        typename: StandardTypeNames.DateTime,
      },
      recordProps
    ),
    createPropertyRecord(
      {
        valueFormat: PropertyValueFormat.Primitive,
        value: 1,
      },
      {
        name: `${prefix}enumProperty`,
        displayLabel: "Enum Property",
        typename: StandardTypeNames.Enum,
        enum: {
          choices: [
            { value: 1, label: "Choice 1" },
            { value: 2, label: "Choice 2" },
            { value: 3, label: "Choice 3" },
          ],
        },
      },
      recordProps
    ),
  ];
}

function createPropertyRecord(
  value: PropertyValue,
  property: PropertyDescription,
  recordProps?: { isDisabled?: boolean; isReadonly?: boolean }
): PropertyRecord {
  const record = new PropertyRecord(value, property);
  record.isDisabled = recordProps?.isDisabled;
  record.isReadonly = recordProps?.isReadonly;
  return record;
}

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
