/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ColorByName } from "@itwin/core-common";
import type {
  ArrayValue,
  BasePropertyEditorParams,
  ButtonGroupEditorParams,
  ColorEditorParams,
  CustomFormattedNumberParams,
  DisplayMessageType,
  ImageCheckBoxParams,
  MessagePresenter,
  ParseResults,
  Primitives,
  PrimitiveValue,
  PropertyDescription,
  PropertyEditorInfo,
  PropertyValue,
  StructValue,
} from "@itwin/appui-abstract";
import {
  MessageSeverity,
  PropertyEditorParamTypes,
  PropertyRecord,
  PropertyValueFormat,
  StandardEditorNames,
  StandardTypeNames,
  UiAdmin,
} from "@itwin/appui-abstract";
import type { AsyncValueProcessingResult } from "@itwin/components-react";
import { DataControllerBase } from "@itwin/components-react";
import { UiIModelComponents } from "../imodel-components-react/UiIModelComponents";
import { act, prettyDOM } from "@testing-library/react";
import { expect } from "chai";

// cSpell:ignore buttongroup

/** @internal */
export class TestUtils {
  private static _uiIModelComponentsInitialized = false;

  public static async initializeUiIModelComponents() {
    if (!TestUtils._uiIModelComponentsInitialized) {
      await UiIModelComponents.initialize();
      TestUtils._uiIModelComponentsInitialized = true;

      const mp: MessagePresenter = {
        displayMessage: (
          _severity: MessageSeverity,
          _briefMessage: HTMLElement | string,
          _detailedMessage?: HTMLElement | string,
          _messageType?: DisplayMessageType.Toast
        ): void => {},
        displayInputFieldMessage: (
          _inputField: HTMLElement,
          _severity: MessageSeverity,
          _briefMessage: HTMLElement | string,
          _detailedMessage?: HTMLElement | string
        ): void => {},
        closeInputFieldMessage: (): void => {},
      };
      UiAdmin.messagePresenter = mp;
    }
  }

  public static terminateUiIModelComponents() {
    UiIModelComponents.terminate();
    TestUtils._uiIModelComponentsInitialized = false;
  }

  /** Waits until all async operations finish */
  public static async flushAsyncOperations() {
    return new Promise((resolve) => setTimeout(resolve));
  }

  public static createPropertyRecord(
    value: any,
    column: { key: string; label: string },
    typename: string
  ) {
    const v: PrimitiveValue = {
      valueFormat: PropertyValueFormat.Primitive,
      value,
      displayValue: value,
    };
    const pd: PropertyDescription = {
      typename,
      name: column.key,
      displayLabel: column.label,
    };
    return new PropertyRecord(v, pd);
  }

  public static createPrimitiveStringProperty(
    name: string,
    rawValue: string,
    displayValue: string = rawValue.toString(),
    editorInfo?: PropertyEditorInfo,
    autoExpand?: boolean
  ) {
    const value: PrimitiveValue = {
      displayValue,
      value: rawValue,
      valueFormat: PropertyValueFormat.Primitive,
    };

    const description: PropertyDescription = {
      displayLabel: name,
      name,
      typename: StandardTypeNames.String,
    };

    if (editorInfo) description.editor = editorInfo;

    const property = new PropertyRecord(value, description);
    property.isReadonly = false;
    property.autoExpand = autoExpand;
    if (property.autoExpand === undefined) delete property.autoExpand;

    return property;
  }

  public static createMultilineTextPropertyRecord(name: string, value: string) {
    const record = TestUtils.createPrimitiveStringProperty(name, value);
    record.property.renderer = { name: "multiline" };
    return record;
  }

  public static createArrayProperty(
    name: string,
    items?: PropertyRecord[],
    autoExpand?: boolean
  ) {
    if (!items) items = [];

    const value: ArrayValue = {
      items,
      valueFormat: PropertyValueFormat.Array,
      itemsTypeName: items.length !== 0 ? items[0].property.typename : "string",
    };

    const description: PropertyDescription = {
      displayLabel: name,
      name,
      typename: StandardTypeNames.Array,
    };
    const property = new PropertyRecord(value, description);
    property.isReadonly = false;
    property.autoExpand = autoExpand;
    return property;
  }

  public static createStructProperty(
    name: string,
    members?: { [name: string]: PropertyRecord },
    autoExpand?: boolean
  ) {
    if (!members) members = {};

    const value: StructValue = {
      members,
      valueFormat: PropertyValueFormat.Struct,
    };

    const description: PropertyDescription = {
      displayLabel: name,
      name,
      typename: StandardTypeNames.Struct,
    };
    const property = new PropertyRecord(value, description);
    property.isReadonly = false;
    property.autoExpand = autoExpand;
    return property;
  }

  public static createEnumStringProperty(name: string, index: string) {
    const value: PrimitiveValue = {
      displayValue: "",
      value: index,
      valueFormat: PropertyValueFormat.Primitive,
    };

    const description: PropertyDescription = {
      displayLabel: name,
      name,
      typename: StandardTypeNames.Enum,
    };

    const propertyRecord = new PropertyRecord(value, description);
    propertyRecord.isReadonly = false;
    propertyRecord.property.enum = {
      choices: [
        { label: "Yellow", value: "yellow" },
        { label: "Red", value: "red" },
        { label: "Green", value: "green" },
      ],
      isStrict: false,
    };

    return propertyRecord;
  }
  public static createEnumProperty(name: string, index: string | number) {
    const value: PrimitiveValue = {
      displayValue: name,
      value: index,
      valueFormat: PropertyValueFormat.Primitive,
    };

    const description: PropertyDescription = {
      displayLabel: name,
      name,
      typename: StandardTypeNames.Enum,
    };

    const getChoices = async () => {
      return [
        { label: "Yellow", value: 0 },
        { label: "Red", value: 1 },
        { label: "Green", value: 2 },
        { label: "Blue", value: 3 },
      ];
    };

    const propertyRecord = new PropertyRecord(value, description);
    propertyRecord.isReadonly = false;
    propertyRecord.property.enum = { choices: getChoices(), isStrict: false };

    return propertyRecord;
  }

  public static blueEnumValueIsEnabled = true;
  public static toggleBlueEnumValueEnabled() {
    TestUtils.blueEnumValueIsEnabled = !TestUtils.blueEnumValueIsEnabled;
  }
  public static addEnumButtonGroupEditorSpecification(
    propertyRecord: PropertyRecord
  ) {
    propertyRecord.property.editor = {
      name: "enum-buttongroup",
      params: [
        {
          type: PropertyEditorParamTypes.ButtonGroupData,
          buttons: [
            { iconSpec: "icon-yellow" },
            { iconSpec: "icon-red" },
            { iconSpec: "icon-green" },
            {
              iconSpec: "icon-blue",
              isEnabledFunction: () => TestUtils.blueEnumValueIsEnabled,
            },
          ],
        } as ButtonGroupEditorParams,
      ],
    };
  }

  public static createBooleanProperty(
    name: string,
    booleanValue: boolean,
    editor?: string
  ) {
    const value: PrimitiveValue = {
      displayValue: "",
      value: booleanValue,
      valueFormat: PropertyValueFormat.Primitive,
    };

    const description: PropertyDescription = {
      displayLabel: name,
      name,
      typename: StandardTypeNames.Boolean,
      editor: editor ? { name: editor } : undefined,
    };

    const propertyRecord = new PropertyRecord(value, description);
    propertyRecord.isReadonly = false;

    return propertyRecord;
  }

  public static createImageCheckBoxProperty(
    name: string,
    booleanValue: boolean
  ) {
    const value: PrimitiveValue = {
      displayValue: "",
      value: booleanValue,
      valueFormat: PropertyValueFormat.Primitive,
    };

    const description: PropertyDescription = {
      displayLabel: name,
      name,
      typename: StandardTypeNames.Boolean,
    };
    const propertyRecord = new PropertyRecord(value, description);
    propertyRecord.property.editor = {
      name: "image-check-box",
      params: [
        {
          type: PropertyEditorParamTypes.CheckBoxImages,
          imageOff: "icon-visibility-hide-2",
          imageOn: "icon-visibility",
        } as ImageCheckBoxParams,
      ],
    };
    propertyRecord.isReadonly = false;
    return propertyRecord;
  }
  public static createColorProperty(propertyName: string, colorValue: number) {
    const value: PrimitiveValue = {
      displayValue: "",
      value: colorValue,
      valueFormat: PropertyValueFormat.Primitive,
    };

    const description: PropertyDescription = {
      name: propertyName,
      displayLabel: propertyName,
      typename: StandardTypeNames.Number,
      editor: {
        name: "color-picker",
        params: [
          {
            type: PropertyEditorParamTypes.ColorData,
            colorValues: [
              ColorByName.blue,
              ColorByName.red,
              ColorByName.green,
              ColorByName.yellow,
              ColorByName.black,
              ColorByName.gray,
              ColorByName.purple,
              ColorByName.pink,
            ],
            numColumns: 2,
          } as ColorEditorParams,
        ],
      },
    };

    const propertyRecord = new PropertyRecord(value, description);
    propertyRecord.isReadonly = false;
    return propertyRecord;
  }

  public static createWeightProperty(propertyName: string, weight: number) {
    const value: PrimitiveValue = {
      displayValue: "",
      value: weight,
      valueFormat: PropertyValueFormat.Primitive,
    };

    const description: PropertyDescription = {
      name: propertyName,
      displayLabel: propertyName,
      typename: StandardTypeNames.Number,
      editor: {
        name: StandardEditorNames.WeightPicker,
      },
    };

    const propertyRecord = new PropertyRecord(value, description);
    propertyRecord.isReadonly = false;
    return propertyRecord;
  }

  private static _formatLength = (numberValue: number): string =>
    numberValue.toFixed(2);

  public static createCustomNumberProperty(
    propertyName: string,
    numVal: number,
    displayVal?: string,
    editorParams?: BasePropertyEditorParams[]
  ) {
    const value: PrimitiveValue = {
      displayValue: displayVal,
      value: numVal,
      valueFormat: PropertyValueFormat.Primitive,
    };

    const description: PropertyDescription = {
      name: propertyName,
      displayLabel: propertyName,
      typename: StandardTypeNames.Number,
      editor: {
        name: StandardEditorNames.NumberCustom,
        params: [
          {
            type: PropertyEditorParamTypes.CustomFormattedNumber,
            formatFunction: TestUtils._formatLength,
            parseFunction: (stringValue: string): ParseResults => {
              const rtnValue = Number.parseFloat(stringValue);
              if (Number.isNaN(rtnValue)) {
                return {
                  parseError: `Unable to parse ${stringValue} into a valid length`,
                };
              } else {
                return { value: rtnValue };
              }
            },
          } as CustomFormattedNumberParams,
        ],
      },
    };

    if (editorParams) {
      editorParams.forEach((params: BasePropertyEditorParams) => {
        description.editor!.params!.push(params);
      });
    }

    const propertyRecord = new PropertyRecord(value, description);
    propertyRecord.isReadonly = false;
    return propertyRecord;
  }

  public static createNumericProperty(
    propertyName: string,
    numericValue: number,
    editorName: string,
    editorParams?: BasePropertyEditorParams[]
  ) {
    const value: PrimitiveValue = {
      displayValue: "",
      value: numericValue,
      valueFormat: PropertyValueFormat.Primitive,
    };

    const description: PropertyDescription = {
      name: propertyName,
      displayLabel: propertyName,
      typename: StandardTypeNames.Number,
      editor: {
        name: editorName,
        params: editorParams,
      },
    };

    const propertyRecord = new PropertyRecord(value, description);
    propertyRecord.isReadonly = false;
    return propertyRecord;
  }

  public static createNavigationProperty(
    name: string,
    value: Primitives.InstanceKey,
    displayValue?: string
  ): PropertyRecord {
    const property = TestUtils.createPrimitiveStringProperty(
      name,
      "",
      displayValue
    );
    property.property.typename = StandardTypeNames.Navigation;
    (property.value as PrimitiveValue).value = value;
    return property;
  }

  public static createURIProperty(
    name: string,
    value: string,
    displayValue?: string
  ): PropertyRecord {
    const property = TestUtils.createPrimitiveStringProperty(
      name,
      value,
      displayValue
    );
    property.property.typename = StandardTypeNames.URL;
    return property;
  }
}

/** @internal */
export class MineDataController extends DataControllerBase {
  public override async validateValue(
    _newValue: PropertyValue,
    _record: PropertyRecord
  ): Promise<AsyncValueProcessingResult> {
    return {
      encounteredError: true,
      errorMessage: { severity: MessageSeverity.Error, briefMessage: "Test" },
    };
  }
}

/** Returns tag, id and classes of the information used by CSS selectors */
function getPartialSelectorInfo(e: HTMLElement) {
  return `${e.tagName}${e.id ? `#${e.id}` : ""}${Array.from(
    e.classList.values()
  )
    .map((c) => `.${c}`)
    .join("")}`;
}

/** Returns the full list of classes and tag chain for an element up to HTML */
function currentSelectorInfo(e: HTMLElement) {
  let w = e;
  const chain = [getPartialSelectorInfo(w)];
  while (w.parentElement) {
    w = w.parentElement;
    chain.unshift(getPartialSelectorInfo(w));
  }
  return chain.join(" > ");
}

/**
 * Function to generate a `satisfy` function and the relevant error message.
 * @param selectors selector string used in `matches`
 * @returns satisfy function which returns `tested.matches(selectors)`
 */
export function selectorMatches(selectors: string) {
  const satisfier = (e: HTMLElement) => {
    // \b\b\b... removes default "[Function : " part to get clear message in output.
    const message = `\b\b\b\b\b\b\b\b\b\b\belement.matches('${selectors}'); current element selector: '${currentSelectorInfo(
      e
    )}'\n\n${prettyDOM()}`;
    Object.defineProperty(satisfier, "name", { value: message });
    return e.matches(selectors);
  };
  return satisfier;
}

/**
 * Function to generate a `satisfy` function
 * @param style Style object to compare, each properties of this object should be on the element style
 * @returns satisfy function
 */
export function styleMatch(style: Partial<CSSStyleDeclaration>) {
  return (e: HTMLElement) => {
    for (const prop in style) {
      if (Object.prototype.hasOwnProperty.call(style, prop)) {
        expect(e.style).to.have.property(prop, style[prop]);
      }
    }
    return true;
  };
}

/** https://floating-ui.com/docs/react#testing */
export async function waitForPosition() {
  return act(async () => {});
}

/** Simplified type for `sinon.SinonSpy`.
 * @internal
 */
export type SinonSpy<T extends (...args: any) => any> = sinon.SinonSpy<
  Parameters<T>,
  ReturnType<T>
>;

/** Simplified type for `sinon.SinonSpy` for a React component.
 * @internal
 */
export type ComponentSpy<
  T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
  K extends keyof React.ComponentProps<T>
> = SinonSpy<React.ComponentProps<T>[K]>;

export default TestUtils;
