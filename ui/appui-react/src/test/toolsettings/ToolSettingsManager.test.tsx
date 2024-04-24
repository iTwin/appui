/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import { IModelApp } from "@itwin/core-frontend";
import type {
  DialogItem,
  DialogItemValue,
  DialogPropertySyncItem,
  PropertyDescription,
  SuppressLabelEditorParams,
} from "@itwin/appui-abstract";
import { PropertyEditorParamTypes } from "@itwin/appui-abstract";
import type { SyncToolSettingsPropertiesEventArgs } from "../../appui-react";
import { SyncUiEventDispatcher } from "../../appui-react";
import { InternalToolSettingsManager } from "../../appui-react/toolsettings/InternalToolSettingsManager";

// cSpell:Ignore USELENGTH

describe("InternalToolSettingsManager", () => {
  const testToolId = "InternalToolSettingsManager-TestTool";
  const testToolLabel = "TestTool";
  const testToolDescription = "TestToolDescription";
  const useLengthName = "use-length";

  const useLengthDescription: PropertyDescription = {
    name: useLengthName,
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

  it("check initial values", () => {
    expect(InternalToolSettingsManager.useDefaultToolSettingsProvider).toEqual(
      false
    );
    expect(InternalToolSettingsManager.toolSettingsProperties).to.be.empty;
  });

  it("simulate a tool starting", () => {
    const toolSettingsProperties: DialogItem[] = [];
    const useLengthValue: DialogItemValue = { value: false };
    const lengthValue: DialogItemValue = {
      value: 1.2345,
      displayValue: "1.2345",
    };
    const enumValue: DialogItemValue = { value: "1" };

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
    InternalToolSettingsManager.initializeToolSettingsData(
      toolSettingsProperties,
      testToolId,
      testToolLabel,
      testToolDescription
    );

    // override the property getter to return the properties needed for the test
    const propertyDescriptorToRestore = Object.getOwnPropertyDescriptor(
      InternalToolSettingsManager,
      "toolSettingsProperties"
    )!;
    Object.defineProperty(
      InternalToolSettingsManager,
      "toolSettingsProperties",
      {
        get: () => toolSettingsProperties,
      }
    );

    expect(InternalToolSettingsManager.useDefaultToolSettingsProvider).toEqual(
      true
    );
    expect(InternalToolSettingsManager.toolSettingsProperties.length).to.equal(
      toolSettingsProperties.length
    );
    expect(InternalToolSettingsManager.activeToolLabel).toEqual(testToolLabel);
    expect(InternalToolSettingsManager.activeToolDescription).toEqual(
      testToolDescription
    );

    // restore the overriden property getter
    Object.defineProperty(
      InternalToolSettingsManager,
      "toolSettingsProperties",
      propertyDescriptorToRestore
    );

    InternalToolSettingsManager.clearToolSettingsData();
    expect(InternalToolSettingsManager.useDefaultToolSettingsProvider).toEqual(
      false
    );
    expect(InternalToolSettingsManager.toolSettingsProperties).to.be.empty;
    expect(InternalToolSettingsManager.activeToolLabel).to.be.empty;
    expect(InternalToolSettingsManager.activeToolDescription).to.be.empty;
  });

  it("should handle no tool settings", () => {
    const toolSettingsProperties: DialogItem[] = [];
    const result = InternalToolSettingsManager.initializeToolSettingsData(
      toolSettingsProperties
    );
    expect(result).toEqual(false);
  });

  it("should support setting active tool label", () => {
    const label = "Test Label";
    InternalToolSettingsManager.activeToolLabel = label;
    expect(InternalToolSettingsManager.activeToolLabel).toEqual(label);
  });

  it("handleSyncToolSettingsPropertiesEvent", () => {
    let eventCalled = false;
    const useLengthValue: DialogItemValue = { value: false };

    const syncItem: DialogPropertySyncItem = {
      value: useLengthValue,
      propertyName: useLengthName,
      isDisabled: false,
    };

    const handleSyncToolSettingsPropertiesEvent = (
      args: SyncToolSettingsPropertiesEventArgs // eslint-disable-line deprecation/deprecation
    ): void => {
      eventCalled = true;
      expect(args.toolId).toEqual(testToolId);
      expect(args.syncProperties.length).toEqual(1);
      expect(args.syncProperties[0].propertyName).toEqual(useLengthName);
    };

    InternalToolSettingsManager.onSyncToolSettingsProperties.addListener(
      handleSyncToolSettingsPropertiesEvent
    );
    expect(eventCalled).toEqual(false);
    const syncArgs = {
      toolId: testToolId,
      syncProperties: [syncItem],
    } as SyncToolSettingsPropertiesEventArgs; // eslint-disable-line deprecation/deprecation
    InternalToolSettingsManager.onSyncToolSettingsProperties.emit(syncArgs);
    expect(eventCalled).toEqual(true);
    InternalToolSettingsManager.onSyncToolSettingsProperties.removeListener(
      handleSyncToolSettingsPropertiesEvent
    );
    eventCalled = false;
    InternalToolSettingsManager.onSyncToolSettingsProperties.emit(syncArgs);
    expect(eventCalled).toEqual(false);
    InternalToolSettingsManager.onReloadToolSettingsProperties.emit();
    expect(eventCalled).toEqual(false);
  });

  it("handleSyncToolSettingsPropertiesEvent", () => {
    let eventCalled = false;

    const handleReloadToolSettingsPropertiesEvent = (): void => {
      eventCalled = true;
    };

    InternalToolSettingsManager.onReloadToolSettingsProperties.addListener(
      handleReloadToolSettingsPropertiesEvent
    );
    expect(eventCalled).toEqual(false);
    InternalToolSettingsManager.onReloadToolSettingsProperties.emit();
    expect(eventCalled).toEqual(true);
    InternalToolSettingsManager.onReloadToolSettingsProperties.removeListener(
      handleReloadToolSettingsPropertiesEvent
    );
    eventCalled = false;
    InternalToolSettingsManager.onReloadToolSettingsProperties.emit();
    expect(eventCalled).toEqual(false);
  });

  it("handleDispatchSyncUiEvent", () => {
    InternalToolSettingsManager.initialize();
    const immediateStub = vi.spyOn(
      SyncUiEventDispatcher,
      "dispatchImmediateSyncUiEvent"
    );
    const timerStub = vi.spyOn(SyncUiEventDispatcher, "dispatchSyncUiEvent");
    IModelApp.toolAdmin.dispatchUiSyncEvent("test1");
    expect(timerStub).toHaveBeenCalledOnce();

    IModelApp.toolAdmin.dispatchImmediateUiSyncEvent("test2");
    expect(immediateStub).toHaveBeenCalledOnce();
  });

  describe("focusIntoToolSettings", () => {
    it("should return false if no ToolSettings div found", async () => {
      render(<div data-testid="div"></div>);
      expect(InternalToolSettingsManager.focusIntoToolSettings()).toEqual(
        false
      );
    });

    it("should return true if focusable item in docked ToolSettings", async () => {
      render(
        <div className="nz-toolSettings-docked">
          <button />
        </div>
      );
      expect(InternalToolSettingsManager.focusIntoToolSettings()).toEqual(true);
    });

    it("should return false if no focusable item in docked ToolSettings", async () => {
      render(<div className="nz-toolSettings-docked"></div>);
      expect(InternalToolSettingsManager.focusIntoToolSettings()).toEqual(
        false
      );
    });

    it("should return true if focusable item in floating ToolSettings", async () => {
      render(
        <div className="uifw-tool-settings-grid-container">
          <button />
        </div>
      );
      expect(InternalToolSettingsManager.focusIntoToolSettings()).toEqual(true);
    });

    it("should return false if no focusable item in floating ToolSettings", async () => {
      render(<div className="uifw-tool-settings-grid-container"></div>);
      expect(InternalToolSettingsManager.focusIntoToolSettings()).toEqual(
        false
      );
    });

    // NEEDSWORK - need tests with real Tool Settings for V1 & V2
  });
});
