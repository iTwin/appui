/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type * as React from "react";
import type {
  ButtonGroupEditorParams,
  DialogItem,
  DialogItemValue,
  DialogPropertySyncItem,
  PropertyDescription,
  SuppressLabelEditorParams,
} from "@itwin/appui-abstract";
import { PropertyEditorParamTypes } from "@itwin/appui-abstract";
import { render } from "@testing-library/react";
import type {
  FrontstageConfig,
  SyncToolSettingsPropertiesEventArgs,
} from "../../appui-react.js";
import { FrontstageProvider, UiFramework } from "../../appui-react.js";
import TestUtils from "../TestUtils.js";
import { InternalFrontstageManager } from "../../appui-react/frontstage/InternalFrontstageManager.js";
import type { DefaultToolSettingsProvider } from "../../appui-react/toolsettings/DefaultToolSettingsProvider.js";

describe("DefaultToolUiSettingsProvider", () => {
  const firstToolId = "DefaultToolUiSettingsProvider-FirstTestTool";
  const testToolId = "DefaultToolUiSettingsProvider-TestTool";
  const useLengthDescription: PropertyDescription = {
    name: "use-length",
    displayLabel: "TEST-USELENGTH",
    typename: "boolean",
    editor: {
      params: [
        {
          type: PropertyEditorParamTypes.SuppressEditorLabel,
        } as SuppressLabelEditorParams,
      ],
    },
  };

  const lengthDescription: PropertyDescription = {
    name: "length",
    displayLabel: "TEST-LENGTH",
    typename: "string",
  };

  const enumDescription: PropertyDescription = {
    displayLabel: "TEST-ENUM-PICKER",
    name: "test-enum",
    typename: "enum",
    enum: {
      choices: [
        { label: "Yellow", value: 0 },
        { label: "Red", value: 1 },
        { label: "Green", value: 2 },
        { label: "Blue", value: 3 },
      ],
      isStrict: false,
    },
  };
  const testEnumDescription1: PropertyDescription = {
    name: "buttongroup1",
    displayLabel: "",
    typename: "enum",
    editor: {
      name: "enum-buttongroup",
      params: [
        {
          type: PropertyEditorParamTypes.ButtonGroupData,
          buttons: [{ iconSpec: "testIconOne" }, { iconSpec: "testIconTwo" }],
        } as ButtonGroupEditorParams,
        {
          type: PropertyEditorParamTypes.SuppressEditorLabel,
          suppressLabelPlaceholder: true,
        } as SuppressLabelEditorParams,
      ],
    },
    enum: {
      choices: [
        { label: "Choice 1", value: 10 },
        { label: "Choice 2", value: 20 },
      ],
    },
  };

  const testEnumDescription2: PropertyDescription = {
    name: "buttongroup2",
    displayLabel: "",
    typename: "enum",
    editor: {
      name: "enum-buttongroup",
      params: [
        {
          type: PropertyEditorParamTypes.ButtonGroupData,
          buttons: [
            { iconSpec: "plusOne" },
            { iconSpec: "plusTwo" },
            { iconSpec: "plusThree" },
          ],
        } as ButtonGroupEditorParams,
        {
          type: PropertyEditorParamTypes.SuppressEditorLabel,
          suppressLabelPlaceholder: true,
        } as SuppressLabelEditorParams,
      ],
    },
    enum: {
      choices: [
        { label: "Plus 1", value: 100 },
        { label: "Plus 2", value: 200 },
        { label: "Plus 3", value: 300 },
      ],
    },
  };

  const methodsDescription: PropertyDescription = {
    name: "methods",
    displayLabel: "",
    typename: "enum",
    editor: {
      name: "enum-buttongroup",
      params: [
        {
          type: PropertyEditorParamTypes.ButtonGroupData,
          buttons: [
            { iconSpec: "icon-select-single" },
            { iconSpec: "icon-select-line" },
            { iconSpec: "icon-select-box" },
          ],
        } as ButtonGroupEditorParams,
        {
          type: PropertyEditorParamTypes.SuppressEditorLabel,
          suppressLabelPlaceholder: true,
        } as SuppressLabelEditorParams,
      ],
    },
    enum: {
      choices: [
        { label: "Pick", value: 0 },
        { label: "Line", value: 1 },
        { label: "Box", value: 2 },
      ],
    },
  };

  beforeEach(async () => {
    class Frontstage1 extends FrontstageProvider {
      public static stageId = "ToolUiProvider-TestFrontstage";
      public get id(): string {
        return Frontstage1.stageId;
      }

      public override frontstageConfig(): FrontstageConfig {
        return {
          id: this.id,
          version: 1,
          contentGroup: TestUtils.TestContentGroup1,
          toolSettings: {
            id: "toolSettings",
          },
        };
      }
    }

    const frontstageProvider = new Frontstage1();
    UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
    UiFramework.toolSettings.useDefaultToolSettingsProvider = false;
  });

  it("starting a tool with undefined tool settings", async () => {
    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
      "ToolUiProvider-TestFrontstage"
    );
    expect(frontstageDef).toBeTruthy();
    if (frontstageDef) {
      await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);

      InternalFrontstageManager.ensureToolInformationIsSet(firstToolId);

      // If a tool does not define toolSettingsProperties then useDefaultToolSettingsProvider should be false, but make sure we can gracefully handle
      // case where useDefaultToolSettingsProvider is true but toolSettingsProperties are not defined.
      UiFramework.toolSettings.useDefaultToolSettingsProvider = true;

      UiFramework.frontstages.setActiveToolId(firstToolId);
      expect(UiFramework.frontstages.activeToolId).toEqual(firstToolId);

      const toolInformation = UiFramework.frontstages.activeToolInformation;
      expect(toolInformation).toBeTruthy();

      if (toolInformation) {
        const toolUiProvider = toolInformation.toolUiProvider;
        expect(toolUiProvider).toEqual(undefined);
      }
    }
  });

  it("starting a tool with tool settings", async () => {
    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
      "ToolUiProvider-TestFrontstage"
    );
    expect(frontstageDef).toBeTruthy();

    if (frontstageDef) {
      await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);

      const toolSettingsProperties: DialogItem[] = [];
      const useLengthValue: DialogItemValue = { value: false };
      const lengthValue: DialogItemValue = {
        value: 1.2345,
        displayValue: "1.2345",
      };
      const enumValue: DialogItemValue = { value: "1" };
      const methodsValue: DialogItemValue = { value: 0 };
      const groupOneValue: DialogItemValue = { value: 10 };
      const groupTwoValue: DialogItemValue = { value: 100 };

      toolSettingsProperties.push({
        value: useLengthValue,
        property: useLengthDescription,
        editorPosition: { rowPriority: 0, columnIndex: 1 },
      });
      toolSettingsProperties.push({
        value: lengthValue,
        property: lengthDescription,
        editorPosition: { rowPriority: 0, columnIndex: 3 },
      });
      toolSettingsProperties.push({
        value: enumValue,
        property: enumDescription,
        editorPosition: { rowPriority: 1, columnIndex: 3 },
      });
      toolSettingsProperties.push({
        value: methodsValue,
        property: methodsDescription,
        editorPosition: { rowPriority: 2, columnIndex: 1 },
      });
      toolSettingsProperties.push({
        value: groupOneValue,
        property: testEnumDescription1,
        editorPosition: { rowPriority: 3, columnIndex: 1 },
      });
      toolSettingsProperties.push({
        value: groupTwoValue,
        property: testEnumDescription2,
        editorPosition: { rowPriority: 3, columnIndex: 2 },
        isDisabled: true,
      });
      UiFramework.toolSettings.initializeToolSettingsData(
        toolSettingsProperties,
        testToolId,
        "testToolLabel",
        "testToolDescription"
      );

      // override the property getter to return the properties needed for the test
      const propertyDescriptorToRestore = Object.getOwnPropertyDescriptor(
        UiFramework.toolSettings,
        "toolSettingsProperties"
      )!;
      Object.defineProperty(
        UiFramework.toolSettings,
        "toolSettingsProperties",
        {
          get: () => toolSettingsProperties,
        }
      );

      expect(UiFramework.toolSettings.useDefaultToolSettingsProvider).toEqual(
        true
      );
      expect(UiFramework.toolSettings.toolSettingsProperties.length).to.equal(
        toolSettingsProperties.length
      );
      InternalFrontstageManager.ensureToolInformationIsSet(testToolId);
      UiFramework.frontstages.setActiveToolId(testToolId);
      expect(UiFramework.frontstages.activeToolId).toEqual(testToolId);

      const toolInformation = UiFramework.frontstages.activeToolInformation;
      expect(toolInformation).toBeTruthy();

      if (toolInformation) {
        const toolSettingsProvider =
          toolInformation.toolUiProvider as DefaultToolSettingsProvider;
        expect(toolSettingsProvider).toBeTruthy();

        if (toolSettingsProvider) {
          const tsNode = toolSettingsProvider.toolSettingsNode;
          expect(tsNode).toBeTruthy();
        }
      }

      const toolSettingsNode =
        InternalFrontstageManager.activeToolSettingsProvider?.toolSettingsNode;
      expect(toolSettingsNode).toBeTruthy();

      const renderedComponent = render(
        toolSettingsNode as React.ReactElement<any>
      );
      expect(renderedComponent).toBeTruthy();

      expect(renderedComponent.queryByText("TEST-USELENGTH:")).toEqual(null);

      const toggleEditor = renderedComponent.getByTestId(
        "components-checkbox-editor"
      );
      expect(toggleEditor).toBeTruthy();

      const textLabel = renderedComponent.getByText("TEST-LENGTH:");
      expect(textLabel).toBeTruthy();

      const textEditor = renderedComponent.getByTestId(
        "components-text-editor"
      );
      expect(textEditor).toBeTruthy();

      const enumLabel = renderedComponent.getByText("TEST-ENUM-PICKER:");
      expect(enumLabel).toBeTruthy();

      const enumEditor = renderedComponent.getByTestId(
        "components-select-editor"
      );
      expect(enumEditor).toBeTruthy();

      const buttonGroupEnumButton = renderedComponent.getByTestId("Pick");
      expect(buttonGroupEnumButton).toBeTruthy();

      const buttonGroup1EnumButton = renderedComponent.getByTestId("Choice 1");
      expect(buttonGroup1EnumButton).toBeTruthy();

      const buttonGroup2EnumButton = renderedComponent.getByTestId("Plus 1");
      expect(buttonGroup2EnumButton).toBeTruthy();

      // simulate sync from tool
      const newUseLengthValue: DialogItemValue = { value: false };
      const syncItem: DialogPropertySyncItem = {
        value: newUseLengthValue,
        propertyName: useLengthDescription.name,
        isDisabled: false,
      };
      const syncArgs = {
        toolId: testToolId,
        syncProperties: [syncItem],
      } as SyncToolSettingsPropertiesEventArgs;
      // UiFramework.toolSettings.onSyncToolSettingsProperties.emit(syncArgs);
      InternalFrontstageManager.activeToolSettingsProvider?.syncToolSettingsProperties(
        syncArgs
      );
      InternalFrontstageManager.activeToolSettingsProvider?.reloadPropertiesFromTool();
      UiFramework.frontstages.onToolSettingsReloadEvent.emit();
      // restore the overriden property getter
      Object.defineProperty(
        UiFramework.toolSettings,
        "toolSettingsProperties",
        propertyDescriptorToRestore
      );
    }
  });

  it("starting a tool with nested lock toggle in tool settings", async () => {
    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
      "ToolUiProvider-TestFrontstage"
    );
    expect(frontstageDef).toBeTruthy();

    if (frontstageDef) {
      await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);

      const toolSettingsProperties: DialogItem[] = [];
      const useLengthValue: DialogItemValue = { value: false };
      const lengthValue: DialogItemValue = {
        value: 1.2345,
        displayValue: "1.2345",
      };

      const lockToggle: DialogItem = {
        value: useLengthValue,
        property: useLengthDescription,
        editorPosition: { rowPriority: 0, columnIndex: 1 },
      };
      toolSettingsProperties.push({
        value: lengthValue,
        property: lengthDescription,
        editorPosition: { rowPriority: 0, columnIndex: 3 },
        isDisabled: false,
        lockProperty: lockToggle,
      });
      UiFramework.toolSettings.initializeToolSettingsData(
        toolSettingsProperties,
        testToolId,
        "testToolLabel",
        "testToolDescription"
      );

      // override the property getter to return the properties needed for the test
      const propertyDescriptorToRestore = Object.getOwnPropertyDescriptor(
        UiFramework.toolSettings,
        "toolSettingsProperties"
      )!;
      Object.defineProperty(
        UiFramework.toolSettings,
        "toolSettingsProperties",
        {
          get: () => toolSettingsProperties,
        }
      );

      expect(UiFramework.toolSettings.useDefaultToolSettingsProvider).toEqual(
        true
      );
      expect(UiFramework.toolSettings.toolSettingsProperties.length).to.equal(
        toolSettingsProperties.length
      );
      InternalFrontstageManager.ensureToolInformationIsSet(testToolId);
      UiFramework.frontstages.setActiveToolId(testToolId);
      expect(UiFramework.frontstages.activeToolId).toEqual(testToolId);

      const toolInformation = UiFramework.frontstages.activeToolInformation;
      expect(toolInformation).toBeTruthy();

      if (toolInformation) {
        const toolUiProvider = toolInformation.toolUiProvider;
        expect(toolUiProvider).toBeTruthy();

        if (toolUiProvider) {
          expect(toolUiProvider.toolSettingsNode).toBeTruthy();
          // simulate property update

          const newlengthValue: DialogItemValue = { value: 7.5 };
          const lengthSyncItem: DialogPropertySyncItem = {
            value: newlengthValue,
            propertyName: lengthDescription.name,
          };
          const newUselengthValue: DialogItemValue = { value: false };
          const useLengthSyncItem: DialogPropertySyncItem = {
            value: newUselengthValue,
            propertyName: useLengthDescription.name,
          };
          const defaultProvider = toolUiProvider as DefaultToolSettingsProvider;
          if (defaultProvider) {
            defaultProvider.uiDataProvider.applyUiPropertyChange(
              lengthSyncItem
            );
            defaultProvider.uiDataProvider.applyUiPropertyChange(
              useLengthSyncItem
            );
          }
        }
      }

      const toolSettingsNode =
        InternalFrontstageManager.activeToolSettingsProvider?.toolSettingsNode;
      expect(toolSettingsNode).toBeTruthy();

      const renderedComponent = render(
        toolSettingsNode as React.ReactElement<any>
      );
      expect(renderedComponent).toBeTruthy();

      expect(renderedComponent.queryByText("TEST-USELENGTH:")).toEqual(null);

      const toggleEditor = renderedComponent.getByTestId(
        "components-checkbox-editor"
      );
      expect(toggleEditor).toBeTruthy();

      const textLabel = renderedComponent.getByText("TEST-LENGTH:");
      expect(textLabel).toBeTruthy();

      const textEditor = renderedComponent.getByTestId(
        "components-text-editor"
      );
      expect(textEditor).toBeTruthy();

      // simulate sync from tool
      const newUseLengthValue: DialogItemValue = { value: false };
      const syncItem: DialogPropertySyncItem = {
        value: newUseLengthValue,
        propertyName: useLengthDescription.name,
        isDisabled: false,
      };
      const syncArgs = {
        toolId: testToolId,
        syncProperties: [syncItem],
      } as SyncToolSettingsPropertiesEventArgs;
      InternalFrontstageManager.activeToolSettingsProvider?.syncToolSettingsProperties(
        syncArgs
      );
      InternalFrontstageManager.activeToolSettingsProvider?.reloadPropertiesFromTool();
      UiFramework.frontstages.onToolSettingsReloadEvent.emit();

      // restore the overriden property getter
      Object.defineProperty(
        UiFramework.toolSettings,
        "toolSettingsProperties",
        propertyDescriptorToRestore
      );
    }
  });
});
