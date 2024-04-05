/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import type {
  ArrayValue,
  BasePropertyEditorParams,
  ButtonGroupEditorParams,
  CustomFormattedNumberParams,
  ImageCheckBoxParams,
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
import { ITwinLocalization } from "@itwin/core-i18n";
import { prettyDOM } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AsyncValueProcessingResult } from "../components-react";
import { DataControllerBase, UiComponents } from "../components-react";

export { userEvent };

/** @internal */
export class TestUtils {
  private static _i18n?: ITwinLocalization;
  private static _uiComponentsInitialized = false;

  public static get i18n(): ITwinLocalization {
    return TestUtils._i18n!;
  }

  public static async initializeUiComponents() {
    if (!TestUtils._uiComponentsInitialized) {
      TestUtils._i18n = new ITwinLocalization();
      await TestUtils.i18n.initialize(["IModelJs"]);

      await UiComponents.initialize(TestUtils.i18n);
      TestUtils._uiComponentsInitialized = true;

      UiAdmin.messagePresenter = {
        displayMessage: () => {},
        displayInputFieldMessage: () => {},
        closeInputFieldMessage: () => {},
      };
    }
  }

  public static terminateUiComponents() {
    UiComponents.terminate();
    TestUtils._uiComponentsInitialized = false;
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

  public static createPrimitiveDoubleProperty(
    name: string,
    rawValue: number,
    displayValue: string = rawValue.toString(),
    editorInfo?: PropertyEditorInfo
  ) {
    const value: PrimitiveValue = {
      displayValue,
      value: rawValue,
      valueFormat: PropertyValueFormat.Primitive,
    };

    const description: PropertyDescription = {
      displayLabel: name,
      name,
      typename: StandardTypeNames.Double,
    };

    if (editorInfo) description.editor = editorInfo;

    const property = new PropertyRecord(value, description);
    property.isReadonly = false;

    return property;
  }

  public static createMultilineTextPropertyRecord(
    propertyRecord: PropertyRecord
  ) {
    propertyRecord.property.renderer = { name: "multiline" };
    return propertyRecord;
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
 * Function to generate a `satisfy` function and the relevant error message.
 * @param selectors selector string used in `querySelector` of the element tested.
 * @returns satisfy function which returns `!!tested.querySelector(selectors)`
 */
export function childStructure(selectors: string) {
  const satisfier = (e: HTMLElement) => {
    // \b\b\b... removes default "[Function : " part to get clear message in output.
    const message = `\b\b\b\b\b\b\b\b\b\belement.querySelector('${selectors}'); but is: \n${prettyDOM(
      e
    )}`;
    Object.defineProperty(satisfier, "name", { value: message });
    return !!e.querySelector(selectors);
  };
  return satisfier;
}

/**
 * Type to allow CSSStyleDeclaration to be a regexp that will be matched against the
 * property instead of the string value.
 */
type Matchable<T> = { [P in keyof T]: T[P] | RegExp };

/**
 * Function to generate a `satisfy` function
 * @param style Style object to compare, each properties of this object should be on the element style
 * @returns satisfy function
 */
export function styleMatch(style: Matchable<Partial<CSSStyleDeclaration>>) {
  return (e: HTMLElement) => {
    expect(e).to.be.instanceOf(HTMLElement).and.have.property("style");
    for (const prop in style) {
      if (Object.prototype.hasOwnProperty.call(style, prop)) {
        const value = style[prop];
        if (value instanceof RegExp) {
          expect(e.style, `property ${prop}`)
            .to.have.property(prop)
            .that.match(value);
        } else {
          expect(e.style).to.have.property(prop, value);
        }
      }
    }
    return true;
  };
}

/** Props for `TestErrorBoundary` */
export interface TestErrorBoundaryProps {
  children: React.ReactNode;
  onError: (error: Error, componentStack: any) => void;
}
/** Internal state of `TestErrorBoundary` */
export interface TestErrorBoundaryState {
  hasError?: boolean;
}
/**
 * A component for testing component's error reporting. React error boundaries only capture errors thrown
 * in React's lifecycle and render methods. Errors thrown outside of that (e.g. in async callbacks) aren't captured.
 * The purpose of this component is to help test is the errors are thrown correctly.
 *
 * Example usage:
 * ```tsx
 * const errorSpy = vi.fn();
 * render(
 *   <TestErrorBoundary onError={errorSpy}>
 *     <TestComponent />
 *   </TestErrorBoundary>
 * );
 * await waitFor(() => {
 *   expect(errorSpy).toHaveBeenCalledOnce();
 *   expect(errorSpy.mock.calls[0][0].message).toEqual("test error");
 * });
 * ```
 */
export class TestErrorBoundary extends React.Component<
  TestErrorBoundaryProps,
  TestErrorBoundaryState
> {
  public constructor(props: TestErrorBoundaryProps) {
    super(props);
    this.state = {};
  }
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  static getDerivedStateFromError(): TestErrorBoundaryState {
    return { hasError: true };
  }
  public override componentDidCatch(error: Error, info: any) {
    this.props.onError(error, info.componentStack);
  }
  public override render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default TestUtils;
