/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type {
  FrontstageConfig,
  SyncToolSettingsPropertiesEventArgs,
  ToolSettingsEntry,
} from "../../appui-react.js";
import {
  ConfigurableCreateInfo,
  ContentControl,
  FrontstageProvider,
  ToolUiProvider,
  UiFramework,
} from "../../appui-react.js";
import { ToolInformation } from "../../appui-react/toolsettings/ToolInformation.js";
import TestUtils from "../TestUtils.js";
import type {
  DialogItemValue,
  DialogPropertySyncItem,
} from "@itwin/appui-abstract";
import { UiLayoutDataProvider } from "@itwin/appui-abstract";
import { Input, Slider } from "@itwin/itwinui-react";
import { InternalFrontstageManager } from "../../appui-react/frontstage/InternalFrontstageManager.js";

describe("ToolUiProvider", () => {
  function FancySlider() {
    const handleSliderChange = React.useCallback(
      (_values: ReadonlyArray<number>) => {},
      []
    );
    return (
      <Slider
        style={{ minWidth: "160px" }}
        min={0}
        max={100}
        values={[30, 70]}
        step={5}
        tickLabels={["", "", "", "", "", "", "", "", "", "", ""]}
        tooltipProps={(_: number, val: number) => {
          return { content: `\$${val}.00` };
        }}
        onChange={handleSliderChange}
      />
    );
  }

  function BasicSlider() {
    const handleSliderChange = React.useCallback(
      (_values: ReadonlyArray<number>) => {},
      []
    );
    return (
      <Slider
        style={{ minWidth: "160px" }}
        min={0}
        max={100}
        values={[50]}
        step={1}
        onChange={handleSliderChange}
      />
    );
  }
  class Tool2UiProvider extends ToolUiProvider {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);

      this.toolSettingsNode = <>Tool Settings Node</>;
      this.horizontalToolSettingNodes = this.getHorizontalToolSettings();
    }

    private getHorizontalToolSettings(): ToolSettingsEntry[] | undefined {
      return [
        {
          labelNode: <label htmlFor="range">Month</label>,
          editorNode: <input type="month" />,
        },
        {
          labelNode: "Number",
          editorNode: <input type="number" min="10" max="20" />,
        },
        { labelNode: "Slider", editorNode: <BasicSlider /> },
        { labelNode: "Slider w/ Ticks", editorNode: <FancySlider /> },
        { labelNode: "Input", editorNode: <Input /> },
      ];
    }
  }

  const testToolId = "ToolUiProvider-TestTool";

  class Frontstage1 extends FrontstageProvider {
    public static stageId = "ToolUiProvider-TestFrontstage";

    public override get id(): string {
      return Frontstage1.stageId;
    }

    public override frontstageConfig(): FrontstageConfig {
      return {
        id: this.id,
        version: 1,
        contentGroup: TestUtils.TestContentGroup1,
        statusBar: {
          id: "statusBar",
        },
      };
    }
  }

  const frontstageProvider = new Frontstage1();
  UiFramework.frontstages.addFrontstageProvider(frontstageProvider);

  UiFramework.controls.register(testToolId, Tool2UiProvider);

  class TestDataProvider extends UiLayoutDataProvider {}

  it("can set/get uidataprovider", () => {
    const testDataProvider = new TestDataProvider();
    const tool2uiProvider = new Tool2UiProvider(
      new ConfigurableCreateInfo("test", "test", "test"),
      undefined
    );
    tool2uiProvider.dataProvider = testDataProvider;
    expect(tool2uiProvider.dataProvider === testDataProvider);
  });

  it("starting a tool with tool settings", async () => {
    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
      "ToolUiProvider-TestFrontstage"
    );
    expect(frontstageDef).toBeTruthy();

    if (frontstageDef) {
      await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);

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
          // cover syncToolSettingsProperties
          const useLengthValue: DialogItemValue = { value: false };
          const syncItem: DialogPropertySyncItem = {
            value: useLengthValue,
            propertyName: "useLengthName",
            isDisabled: false,
          };
          const syncArgs = {
            toolId: testToolId,
            syncProperties: [syncItem],
          } as SyncToolSettingsPropertiesEventArgs;
          toolUiProvider.syncToolSettingsProperties(syncArgs);
          //    expect(toolUiProvider.dataProvider).toEqual(undefined);
        }
      }

      const toolSettingsProvider =
        InternalFrontstageManager.activeToolSettingsProvider;
      expect(toolSettingsProvider).toBeTruthy();

      const toolSettingsNode =
        InternalFrontstageManager.activeToolSettingsProvider?.toolSettingsNode;
      expect(toolSettingsNode).toBeTruthy();

      const horizontalToolSettingsNode =
        InternalFrontstageManager.activeToolSettingsProvider
          ?.horizontalToolSettingNodes;
      expect(horizontalToolSettingsNode).toBeTruthy();
      expect(horizontalToolSettingsNode!.length).toEqual(5);
    }
  });

  class TestContentControl extends ContentControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);

      this.reactNode = <div />;
    }
  }

  it("ToolInformation with invalid ToolUiProvider should throw Error", () => {
    UiFramework.controls.register("ToolTest1", TestContentControl);
    const toolInfo = new ToolInformation("ToolTest1");
    expect(() => toolInfo.toolUiProvider).to.throw(Error);
    UiFramework.controls.unregister("ToolTest1");
  });
});
