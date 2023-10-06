/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// cSpell:ignore picklist

import { Point3d } from "@itwin/core-geometry";
import {
  BeButtonEvent,
  EventHandled,
  IModelApp,
  PrimitiveTool,
  ToolAssistance,
  ToolAssistanceImage,
} from "@itwin/core-frontend";
import {
  DialogItem,
  DialogItemValue,
  DialogPropertySyncItem,
  EnumerationChoice,
  PropertyDescription,
  ToolbarItemUtilities,
} from "@itwin/appui-abstract";
import dynamicToolSvg from "./DynamicTool.svg";
import { AppUiTestProviders } from "../AppUiTestProviders";
import { createWebComponentIconSpec } from "@itwin/appui-react";

interface MajorCities {
  state: number;
  cities: string[];
}

enum StateOptions {
  None = 0,
  Alabama = 1,
  California = 2,
  Pennsylvania = 3,
  NewYork = 4,
}

const cities: MajorCities[] = [
  { state: StateOptions.None, cities: [] },
  {
    state: StateOptions.Alabama,
    cities: ["Birmingham", "Montgomery", "Huntsville", "Mobile"],
  },
  {
    state: StateOptions.California,
    cities: ["Los Angeles", "San Diego", "San Jose", "San Francisco"],
  },
  {
    state: StateOptions.Pennsylvania,
    cities: ["Philadelphia", "Pittsburgh", "Allentown", "Erie"],
  },
  {
    state: StateOptions.NewYork,
    cities: ["New York", "Buffalo", "Rochester", "Yonkers"],
  },
];

export class ToolWithDynamicSettings extends PrimitiveTool {
  public static override toolId =
    "uiItemsProvidersTest-ToolWithDynamicSettings";
  public static override iconSpec = dynamicToolSvg;
  public points: Point3d[] = [];
  private static translate(str: string) {
    return AppUiTestProviders.translate(`tools.${this.toolId}.${str}`);
  }

  // ------------- State List ---------------
  private static _statePropertyName = "state";
  private static getStateDescription(): PropertyDescription {
    return {
      name: this._statePropertyName,
      displayLabel: this.translate("Prompts.State"),
      typename: "enum",
      enum: {
        choices: [
          {
            label: this.translate("State.None"),
            value: StateOptions.None,
          },
          {
            label: this.translate("State.Alabama"),
            value: StateOptions.Alabama,
          },
          {
            label: this.translate("State.California"),
            value: StateOptions.California,
          },
          {
            label: this.translate("State.Pennsylvania"),
            value: StateOptions.Pennsylvania,
          },
          {
            label: this.translate("State.NewYork"),
            value: StateOptions.NewYork,
          },
        ],
      },
    };
  }

  private _stateValue: DialogItemValue = { value: StateOptions.None };
  public get state(): StateOptions {
    return this._stateValue.value as StateOptions;
  }

  public set state(option: StateOptions) {
    this._stateValue.value = option;
  }

  // ------------- City List ---------------
  private static _cityPropertyName = "city";
  private static getCityDescription(stateId: number): PropertyDescription {
    const availableCitiesChoices: EnumerationChoice[] = cities[
      stateId
    ].cities.map((cityName) => {
      return { label: cityName, value: cityName };
    });

    return {
      name: this._cityPropertyName,
      displayLabel: this.translate("Prompts.City"),
      typename: "enum",
      enum: {
        choices: availableCitiesChoices,
      },
    };
  }

  private _cityValue: DialogItemValue = { value: "" };
  public get city(): string {
    return this._cityValue.value as string;
  }

  public set city(option: string) {
    this._cityValue.value = option;
  }

  // -------- end of ToolSettings ----------

  public override requireWriteableTarget(): boolean {
    return false;
  }
  public override async onPostInstall() {
    await super.onPostInstall();
    this.setupAndPromptForNextAction();
    this.points = [];
  }
  public override async onUnsuspend() {
    this.provideToolAssistance();
  }

  /** Establish current tool state and initialize drawing aides following onPostInstall, onDataButtonDown, onUndoPreviousStep, or other events that advance or back up the current tool state.
   * Enable snapping or auto-locate for AccuSnap.
   * Setup AccuDraw using AccuDrawHintBuilder.
   * Set view cursor when default cursor isn't applicable.
   * Provide tool assistance.
   */
  protected setupAndPromptForNextAction(): void {
    this.provideToolAssistance();
  }

  /** A tool is responsible for providing tool assistance appropriate to the current tool state following significant events.
   * After onPostInstall to establish instructions for the initial tool state.
   * After onUnsuspend to reestablish instructions when no longer suspended by a ViewTool or InputCollector.
   * After onDataButtonDown (or other tool event) advances or backs up the current tool state.
   * After onUndoPreviousStep or onRedoPreviousStep modifies the current tool state.
   */
  protected provideToolAssistance(): void {
    const mainInstruction = ToolAssistance.createInstruction(
      ToolAssistanceImage.CursorClick,
      ToolWithDynamicSettings.translate("Prompts.GetPoint")
    );
    const instructions = ToolAssistance.createInstructions(mainInstruction);

    IModelApp.notifications.setToolAssistance(instructions);
  }

  public override async onDataButtonDown(
    _ev: BeButtonEvent
  ): Promise<EventHandled> {
    this.setupAndPromptForNextAction();
    return EventHandled.No;
  }

  public override async onResetButtonUp(
    _ev: BeButtonEvent
  ): Promise<EventHandled> {
    /* Common reset behavior for primitive tools is calling onReinitialize to restart or exitTool to terminate. */
    await this.onReinitialize();
    return EventHandled.No;
  }

  public async onRestartTool() {
    const tool = new ToolWithDynamicSettings();
    if (!(await tool.run())) return this.exitTool();
  }

  /** Used to supply DefaultToolSettingProvider with a list of properties to use to generate ToolSettings.  If undefined then no ToolSettings will be displayed */
  public override supplyToolSettingsProperties(): DialogItem[] | undefined {
    const toolSettings = new Array<DialogItem>();
    toolSettings.push({
      value: this._stateValue,
      property: ToolWithDynamicSettings.getStateDescription(),
      editorPosition: { rowPriority: 1, columnIndex: 1 },
    });
    if (this.state > 0 && this.state < cities.length) {
      this.city = cities[this.state].cities[0];
      toolSettings.push({
        value: this._cityValue,
        property: ToolWithDynamicSettings.getCityDescription(this.state),
        editorPosition: { rowPriority: 2, columnIndex: 1 },
      });
    }
    return toolSettings;
  }

  /** Called from UI to update properties in tool */
  public override async applyToolSettingPropertyChange(
    updatedValue: DialogPropertySyncItem
  ): Promise<boolean> {
    if (
      updatedValue.propertyName === ToolWithDynamicSettings._statePropertyName
    ) {
      const newStateValue = updatedValue.value.value as number;
      if (this.state !== newStateValue) {
        this.state = newStateValue;
        // update the UI to show/remove city option any time state value changes.
        this.reloadToolSettingsProperties();
      }
    }

    // return true is change is valid
    return true;
  }

  public static getActionButtonDef(
    itemPriority: number,
    groupPriority?: number
  ) {
    const overrides = undefined !== groupPriority ? { groupPriority } : {};
    const iconSpec = createWebComponentIconSpec(
      this.iconSpec
    );

    return ToolbarItemUtilities.createActionButton(
      ToolWithDynamicSettings.toolId,
      itemPriority,
      iconSpec,
      ToolWithDynamicSettings.flyover,
      async () => {
        await IModelApp.tools.run(ToolWithDynamicSettings.toolId);
      },
      overrides
    );
  }
}
