/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
  ButtonGroupEditorParams,
  CustomFormattedNumberParams,
  StandardEditorNames as Editor,
  PropertyEditorParamTypes as EditorParam,
  IconEditorParams,
  ImageCheckBoxParams,
  InputEditorSizeParams,
  MultilineTextEditorParams,
  ParseResults,
  PropertyRecord,
  PropertyValueFormat,
  RangeEditorParams,
  SliderEditorParams,
  StandardTypeNames as Type,
} from "@itwin/appui-abstract";
import { EditorContainer, PropertyRecordEditor } from "@itwin/components-react";
import {
  Divider,
  DropdownMenu,
  Flex,
  IconButton,
  MenuItem,
  Text,
} from "@itwin/itwinui-react";
import { SvgDetails } from "@itwin/itwinui-icons-react";

/** List of render sizes
 *  when merging to #576, remove this comment and use below instead.
 * ["small", "medium", "large"] as ("small" | "medium" | "large")[]
 * Don't forget to add back the size prop to EditorContainer below.
 */
const availableSizes = ["default"];

/** Create a property record to test, allowing editors to be defined. */
function createPropertyRecord(
  type: Type,
  value: any,
  editor?: Editor | PropertyRecord["property"]["editor"]
) {
  return new PropertyRecord(
    {
      valueFormat: PropertyValueFormat.Primitive,
      value,
    },
    {
      typename: type,
      name: "",
      displayLabel: "",
      editor: typeof editor === "string" ? { name: editor } : editor,
    }
  );
}

/** Create Enum typed property record, with filled "yellow", "red", "green" choices.  */
function createEnumProperty(
  editor?: Editor | PropertyRecord["property"]["editor"]
) {
  const record = createPropertyRecord(Type.Enum, "red", editor);
  record.property.enum = {
    choices: [
      { label: "Yellow", value: "yellow" },
      { label: "Red", value: "red" },
      { label: "Green", value: "green" },
    ],
    isStrict: false,
  };
  return record;
}

/** Param for NumberCustom editor, used multiple times. */
const customFormattedNumberParams = {
  type: EditorParam.CustomFormattedNumber,
  formatFunction: (numberValue: number): string => numberValue.toFixed(2),
  parseFunction: (stringValue: string): ParseResults => ({
    value: Number.parseFloat(stringValue),
  }),
} as CustomFormattedNumberParams;

/** Param for NumericEditor, used multiple times. */
const inputEditorSizeParams = {
  type: EditorParam.InputEditorSize,
  size: 5,
  maxLength: 5,
} as InputEditorSizeParams;

const propertyRecords = [
  createPropertyRecord(Type.String, "hi"),
  createPropertyRecord(Type.String, "hi", {
    name: Editor.MultiLine,
    params: [
      {
        type: EditorParam.MultilineText,
        rows: 5,
      } as MultilineTextEditorParams,
    ],
  }),
  // BROKEN!
  // createPropertyRecord(Type.String, "icon-app-2", {
  //   name: Editor.IconPicker,
  //   params: [
  //     {
  //       type: EditorParam.IconListData,
  //       iconValue: "icon-app-2",
  //       numColumns: 2,
  //       iconValues: ["icon-app-1", "icon-app-2", "icon-apps-itwin"],
  //     } as IconListEditorParams,
  //   ],
  // }),
  createPropertyRecord(Type.DateTime, new Date(2018, 0, 1)),
  createPropertyRecord(Type.ShortDate, new Date(2018, 0, 1)),
  createPropertyRecord(Type.Number, 1, {
    name: Editor.Slider,
    params: [
      {
        type: EditorParam.Slider,
        minimum: 0,
        maximum: 10,
      } as SliderEditorParams,
    ],
  }),
  createPropertyRecord(Type.Number, 1, {
    name: Editor.NumberCustom,
    params: [customFormattedNumberParams],
  }),
  createPropertyRecord(Type.Number, 1, {
    name: Editor.NumberCustom,
    params: [
      customFormattedNumberParams,
      {
        type: EditorParam.Icon,
        definition: { iconSpec: "icon-placeholder" },
      } as IconEditorParams,
    ],
  }),
  createPropertyRecord(Type.Number, 1, Editor.NumericInput),
  createPropertyRecord(Type.Number, 1, {
    name: Editor.NumericInput,
    params: [inputEditorSizeParams],
  }),
  createPropertyRecord(Type.Number, 1, {
    name: Editor.NumericInput,
    params: [
      {
        type: EditorParam.Range,
        minimum: 0,
        maximum: 10,
        step: 0.5,
        precision: 1,
      } as RangeEditorParams,
    ],
  }),
  createPropertyRecord(Type.Number, 1, {
    name: Editor.NumericInput,
    params: [
      inputEditorSizeParams,
      {
        type: EditorParam.Range,
        minimum: 0,
        maximum: 10,
        step: 0.25,
        precision: 2,
      } as RangeEditorParams,
    ],
  }),
  createPropertyRecord(Type.Boolean, true),
  createPropertyRecord(Type.Boolean, true, Editor.Toggle),
  createPropertyRecord(Type.Boolean, true, {
    name: "image-check-box",
    params: [
      {
        type: EditorParam.CheckBoxImages,
        imageOff: "icon-visibility-hide-2",
        imageOn: "icon-visibility",
      } as ImageCheckBoxParams,
    ],
  }),
  createEnumProperty(),
  createEnumProperty(Editor.EnumButtonGroup),
  createEnumProperty({
    name: Editor.EnumButtonGroup,
    params: [
      {
        type: EditorParam.ButtonGroupData,
        buttons: [
          {
            iconSpec: "icon-app-1",
          },
          {
            iconSpec: "icon-app-2",
          },
          {
            iconSpec: "icon-apps-itwin",
          },
        ],
      } as ButtonGroupEditorParams,
    ],
  }),
];

/** Component that display at least 1 of each variety of editors registered by default in Components-react. */
export function EditorExampleComponent() {
  return (
    <Flex
      flexDirection="column"
      alignItems="flex-start"
      gap="m"
      style={{ width: "100%" }}
    >
      {propertyRecords.map((record) => {
        const key = `${PropertyValueFormat[record.value.valueFormat]}:${
          record.property.typename
        }:${record.property.editor?.name ?? "Default"}[${
          record.property.editor?.params?.map((p) => p.type).join(",") ?? ""
        }]`.replace("[]", "");
        return (
          <Flex key={key} flexDirection="column">
            <Flex flexDirection="row" gap="xl">
              <Flex.Item alignSelf="flex-start" style={{ width: "300px" }}>
                <OldEditorRenderer record={record} />
              </Flex.Item>
              <Divider orientation="vertical" />
              <Flex.Item alignSelf="flex-end" style={{ width: "300px" }}>
                <NewEditorRenderer record={record} />
              </Flex.Item>
            </Flex>
            <Flex.Item alignSelf="flex-start">
              <Text variant="small" isMuted>
                {record.property.editor && (
                  <DropdownMenu
                    menuItems={(close) => [
                      <MenuItem key={1} onClick={close}>
                        <Text variant="leading">Editor config:</Text>
                        <code style={{ whiteSpace: "pre", display: "block" }}>
                          {JSON.stringify(record.property.editor, undefined, 2)}
                        </code>
                      </MenuItem>,
                    ]}
                  >
                    <IconButton styleType="borderless" size="small">
                      <SvgDetails />
                    </IconButton>
                  </DropdownMenu>
                )}
              </Text>
            </Flex.Item>
          </Flex>
        );
      })}
    </Flex>
  );
}

function OldEditorRenderer({ record }: { record: PropertyRecord }) {
  return (
    <Flex flexDirection="row" flexWrap="nowrap" alignItems="flex-end">
      {availableSizes.map((localSize) => (
        <Flex.Item key={localSize}>
          <EditorContainer
            propertyRecord={record}
            onCommit={() => undefined}
            onCancel={() => undefined}
            // Use when merging #576 size={localSize === "small" ? undefined : localSize}
          />
        </Flex.Item>
      ))}
    </Flex>
  );
}

function NewEditorRenderer({ record }: { record: PropertyRecord }) {
  return (
    <Flex flexDirection="row" flexWrap="nowrap" alignItems="flex-end">
      {availableSizes.map((localSize) => (
        <Flex.Item key={localSize}>
          <PropertyRecordEditor
            propertyRecord={record}
            onCommit={() => undefined}
            onCancel={() => undefined}
            size="small" // size={localSize}
          />
        </Flex.Item>
      ))}
    </Flex>
  );
}
