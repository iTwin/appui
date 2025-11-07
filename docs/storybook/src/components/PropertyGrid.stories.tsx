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
import { PropertyValueRendererManager } from "@itwin/components-react";
import { MultilineTextPropertyValueRenderer } from "@itwin/components-react-internal/src/components-react/properties/renderers/value/MultilineTextPropertyValueRenderer";

import { AppUiDecorator } from "../Decorators";
import { useState } from "react";
import { Orientation } from "@itwin/core-react";
import { PropertyGridStory } from "./PropertyGrid";

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
  // cspell:disable-next-line
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n";

const PaddingDecorator: Decorator = (Story) => {
  return (
    <div style={{ padding: "5px" }}>
      <Story />
    </div>
  );
};

// Create renderer manager via a factory so it can be recreated on HMR reloads.
let rendererManager = createRendererManager();

function createRendererManager() {
  const mgr = new PropertyValueRendererManager();
  // register default/custom renderers
  mgr.registerRenderer("customRendererStructPropertyRenderer", {
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

  mgr.registerRenderer("customRendererArrayPropertyRenderer", {
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

  mgr.registerRenderer("defaultRendererPropertyRenderer", {
    canRender: () => false,
    render: () => {
      return <div>Should not render</div>;
    },
  });

  mgr.registerRenderer("multiline", new MultilineTextPropertyValueRenderer());

  return mgr;
}

const meta = {
  title: "Components/PropertyGrid",
  component: PropertyGridStory,
  tags: ["autodocs"],
  decorators: [PaddingDecorator, AppUiDecorator],
  args: {
    height: 600,
    width: 1300,
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

function EditableStoryComponent(props: any) {
  const [editableRecords, setEditableRecords] = useState(() =>
    createPropertyRecords("editable_")
  );
  const [readonlyRecords] = useState(() =>
    createPropertyRecords("readonly_", { isReadonly: true })
  );
  const [disabledRecords] = useState(() =>
    createPropertyRecords("disabled_", { isDisabled: true })
  );

  const onPropertyUpdated = async ({
    propertyRecord,
    newValue,
  }: {
    propertyRecord: PropertyRecord;
    newValue: PropertyValue;
  }) => {
    action("onPropertyUpdated")(
      `Property "${propertyRecord.property.name}" updated to: ${
        (newValue as PrimitiveValue).value
      }`
    );

    const name = propertyRecord.property.name;
    setEditableRecords((prev) =>
      prev.map((r) => {
        if (r.property.name !== name) return r;
        return new PropertyRecord(
          {
            valueFormat: PropertyValueFormat.Primitive,
            value: (newValue as PrimitiveValue).value,
            displayValue: (newValue as PrimitiveValue).displayValue,
          },
          r.property
        );
      })
    );

    return true;
  };

  const data = {
    label: PropertyRecord.fromString("Record 1"),
    categories: [
      { name: "Editable", label: "Editable", expand: true },
      { name: "Readonly", label: "Readonly", expand: true },
      { name: "Disabled", label: "Disabled", expand: true },
    ],
    records: {
      Editable: editableRecords,
      Readonly: readonlyRecords,
      Disabled: disabledRecords,
    },
  };

  return (
    <PropertyGridStory
      {...props}
      data={data}
      alwaysShowEditor={(_propertyRecord: PropertyRecord) => false}
      onPropertyUpdated={onPropertyUpdated}
    />
  );
}

export const Editable: Story = {
  args: {
    height: 1000,
    isPropertyEditingEnabled: true,
  },
  render: (args) => <EditableStoryComponent {...args} />,
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
              value: 6565.66562,
            },
            {
              name: "numberProperty",
              displayLabel: "Testing double editor",
              typename: "double",
              editor: { name: "number" },
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
    alwaysShowEditor: (_propertyRecord: PropertyRecord) => true,
  },
};

// On HMR re-create renderer manager so updated renderers are used.
if ((import.meta as any).hot) {
  const hot = (import.meta as any).hot;
  hot.accept(() => {
    // When this module or dependencies are updated, create a fresh manager
    rendererManager = createRendererManager();
  });
  hot.dispose(() => {
    // nothing specific to dispose for now, but reserve hook for cleanup
  });
}

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
        value: 42.3434,
      },
      {
        name: `${prefix}intProperty`,
        displayLabel: "Int Property",
        kindOfQuantityName: "Length",
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
