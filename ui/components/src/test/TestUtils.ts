/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { I18N } from "@bentley/imodeljs-i18n";
import { PropertyRecord, PrimitiveValue, PropertyValueFormat, PropertyDescription, ArrayValue, StructValue, PropertyEditorParamTypes } from "@bentley/imodeljs-frontend";
import { UiComponents } from "../ui-components";
import { UiCore } from "@bentley/ui-core";

export default class TestUtils {
  private static _i18n?: I18N;
  private static _uiComponentsInitialized = false;

  public static get i18n(): I18N {
    if (!TestUtils._i18n) {
      // const port = process.debugPort;
      // const i18nOptions = { urlTemplate: "http://localhost:" + port + "/locales/{{lng}}/{{ns}}.json" };
      TestUtils._i18n = new I18N([], "" /*, i18nOptions*/);
    }
    return TestUtils._i18n;
  }

  public static async initializeUiComponents() {
    if (!TestUtils._uiComponentsInitialized) {
      // This is required by our I18n module (specifically the i18next package).
      (global as any).XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest; // tslint:disable-line:no-var-requires

      await UiComponents.initialize(TestUtils.i18n);
      await UiCore.initialize(TestUtils.i18n);
      TestUtils._uiComponentsInitialized = true;
    }
  }

  public static terminateUiComponents() {
    UiCore.terminate();
    UiComponents.terminate();
    TestUtils._uiComponentsInitialized = false;
  }

  /** Waits until all async operations finish */
  public static async flushAsyncOperations() {
    return new Promise((resolve) => setTimeout(resolve));
  }

  public static createPrimitiveStringProperty(name: string, rawValue: string, displayValue: string = rawValue.toString()) {
    const value: PrimitiveValue = {
      displayValue,
      value: rawValue,
      valueFormat: PropertyValueFormat.Primitive,
    };

    const description: PropertyDescription = {
      displayLabel: name,
      name,
      typename: "string",
    };

    const property = new PropertyRecord(value, description);
    property.isReadonly = false;
    return property;
  }

  public static createArrayProperty(name: string, items?: PropertyRecord[]) {
    if (!items)
      items = [];

    const value: ArrayValue = {
      items,
      valueFormat: PropertyValueFormat.Array,
      itemsTypeName: items.length !== 0 ? items[0].property.typename : "string",
    };

    const description: PropertyDescription = {
      displayLabel: name,
      name,
      typename: "array",
    };
    const property = new PropertyRecord(value, description);
    property.isReadonly = false;
    return property;
  }

  public static createStructProperty(name: string, members?: { [name: string]: PropertyRecord }) {
    if (!members)
      members = {};

    const value: StructValue = {
      members,
      valueFormat: PropertyValueFormat.Struct,
    };

    const description: PropertyDescription = {
      displayLabel: name,
      name,
      typename: "struct",
    };
    const property = new PropertyRecord(value, description);
    property.isReadonly = false;
    return property;
  }

  public static createEnumProperty(name: string, index: string | number) {
    const value: PrimitiveValue = {
      displayValue: "",
      value: index,
      valueFormat: PropertyValueFormat.Primitive,
    };

    const description: PropertyDescription = {
      displayLabel: name,
      name,
      typename: "enum",
    };

    const propertyRecord = new PropertyRecord(value, description);
    propertyRecord.isReadonly = false;
    propertyRecord.property.enum = { choices: [], isStrict: false };
    propertyRecord.property.enum.choices = [
      { label: "Yellow", value: 0 },
      { label: "Red", value: 1 },
      { label: "Green", value: 2 },
      { label: "Blue", value: 3 },
    ];

    return propertyRecord;
  }

  public static blueEnumValueIsEnabled = true;
  public static toggleBlueEnumValueEnabled() { TestUtils.blueEnumValueIsEnabled = !TestUtils.blueEnumValueIsEnabled; }
  public static addEnumButtonGroupEditorSpecification(propertyRecord: PropertyRecord) {
    propertyRecord.property.editor = {
      name: "enum-buttongroup",
      params: [
        {
          type: PropertyEditorParamTypes.ButtonGroupData,
          buttons: [
            { iconClass: "icon-yellow" },
            { iconClass: "icon-red" },
            { iconClass: "icon-green" },
            {
              iconClass: "icon-blue",
              isEnabledFunction: () => TestUtils.blueEnumValueIsEnabled,
            },
          ],
        },
      ],
    };
  }

  public static createBooleanProperty(name: string, booleanValue: boolean, editor?: string) {
    const value: PrimitiveValue = {
      displayValue: "",
      value: booleanValue,
      valueFormat: PropertyValueFormat.Primitive,
    };

    const description: PropertyDescription = {
      displayLabel: name,
      name,
      typename: "boolean",
      editor: editor ? { name: editor } : undefined,
    };

    const propertyRecord = new PropertyRecord(value, description);
    propertyRecord.isReadonly = false;

    return propertyRecord;
  }

}
