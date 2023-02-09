/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ActionButton, CommonToolbarItem, ConditionalStringValue, ToolbarItemUtilities, ToolbarOrientation, ToolbarUsage, WidgetState } from "@itwin/appui-abstract";
import {
  BackstageAppButton, CommandItemDef, ContentGroup, CoreTools, FrontstageConfig, FrontstageDef, FrontstageManager,
  FrontstageProvider, ItemDefBase, ModalDialogManager, NavigationAidHost, NavigationWidgetComposer, NestedFrontstage, ToolbarComposer,
  ToolbarHelper, ToolItemDef, ToolWidgetComposer,
} from "@itwin/appui-react";
import { AppTools } from "../../tools/ToolSpecifications";
import { SmallStatusBarWidgetControl } from "../statusbars/SmallStatusBar";
import { HorizontalPropertyGridWidgetControl, VerticalPropertyGridWidgetControl } from "../widgets/PropertyGridDemoWidget";
import { NestedFrontstage2 } from "./NestedFrontstage2";
import { AppUi } from "../AppUi";
import { TestModalDialog } from "../dialogs/TestModalDialog";
import { IModelApp } from "@itwin/core-frontend";
import { IconHelper } from "@itwin/core-react";

export class NestedFrontstage1 extends FrontstageProvider {
  public static stageId = "ui-test-app:NestedFrontstage1";

  public override get id(): string {
    return NestedFrontstage1.stageId;
  }

  public override frontstageConfig(): FrontstageConfig {
    const contentGroup = new ContentGroup(AppUi.TestContentGroup1);

    return {
      id: this.id,
      version: 1,
      contentGroup,
      contentManipulation: {
        id: "contentManipulation",
        content: <FrontstageToolWidget />,
      },
      toolSettings: {
        id: "toolSettings",
      },
      viewNavigation: {
        id: "viewNavigation",
        content: <FrontstageNavigationWidget />,
      },
      statusBar: {
        id: "statusBar",
        icon: "icon-placeholder",
        labelKey: "SampleApp:widgets.StatusBar",
        control: SmallStatusBarWidgetControl,
      },
      rightPanel: {
        sections: {
          end: [
            {
              id: "HorizontalPropertyGrid",
              defaultState: WidgetState.Closed,
              icon: "icon-placeholder",
              labelKey: "SampleApp:widgets.HorizontalPropertyGrid",
              control: HorizontalPropertyGridWidgetControl,
            },
            {
              id: "VerticalPropertyGrid",
              defaultState: WidgetState.Hidden,
              icon: "icon-placeholder",
              labelKey: "SampleApp:widgets.VerticalPropertyGrid",
              control: VerticalPropertyGridWidgetControl,
            },
          ],
        },
      },
    };
  }
}

/** Define a ToolWidget with Buttons to display in the TopLeft zone.
 */
class FrontstageToolWidget extends React.Component {
  private static _frontstage2Def: FrontstageDef | undefined;
  private static async getFrontstage2Def() {
    if (!this._frontstage2Def) {
      const frontstageProvider = new NestedFrontstage2();
      this._frontstage2Def = await FrontstageDef.create(frontstageProvider);
    }
    return this._frontstage2Def;
  }

  /** Command that opens a nested Frontstage */
  private get _openNestedFrontstage2() {
    return new CommandItemDef({
      iconSpec: "icon-placeholder",
      labelKey: "SampleApp:buttons.openNestedFrontstage2",
      execute: async () => {
        const frontstage2Def = await FrontstageToolWidget.getFrontstage2Def();
        await FrontstageManager.openNestedFrontstage(frontstage2Def);
      },
    });
  }

  private get _openModal() {
    return new CommandItemDef({
      iconSpec: "icon-smiley-happy",
      label: "Open Modal Dialog",
      execute: () => ModalDialogManager.openDialog(<TestModalDialog />),
    });
  }

  private _horizontalItems: CommonToolbarItem[] = [
    ToolbarHelper.createToolbarItemFromItemDef(10, CoreTools.selectElementCommand),
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item1),
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item2),
    ToolbarHelper.createToolbarItemFromItemDef(10, this._openNestedFrontstage2),
    ToolbarHelper.createToolbarItemFromItemDef(10, this._openModal),
  ];

  private _verticalItems: CommonToolbarItem[] = [
    ToolbarHelper.createToolbarItemFromItemDef(10, CoreTools.rotateViewCommand),
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.tool1),
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.tool2),
    ToolbarItemUtilities.createGroupButton("SampleApp:anotherGroup", 10, "icon-placeholder", IModelApp.localization.getLocalizedString("SampleApp:anotherGroup"), [
      AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.tool1),
      AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.tool2),
      AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item3),
      AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item4),
      AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item5),
      AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item6),
      AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item7),
      AppToolbarUtilities.createActionButtonFromItemDef(10, AppTools.item8),
    ]),
  ];

  public override render() {
    return (
      <ToolWidgetComposer
        cornerItem={<BackstageBackButton />}
        verticalToolbar={<ToolbarComposer items={this._verticalItems} usage={ToolbarUsage.ContentManipulation} orientation={ToolbarOrientation.Vertical} />}
        horizontalToolbar={<ToolbarComposer items={this._horizontalItems} usage={ToolbarUsage.ContentManipulation} orientation={ToolbarOrientation.Horizontal} />}
      />
    );
  }
}

/** Define a NavigationWidget with Buttons to display in the TopRight zone.
 */
class FrontstageNavigationWidget extends React.Component {
  private _horizontalItems: CommonToolbarItem[] = [
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item5),
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item6),
  ];

  private _verticalItems: CommonToolbarItem[] = [
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item7),
    ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item8),
  ];

  public override render() {
    return (
      <NavigationWidgetComposer
        navigationAidHost={<NavigationAidHost />} // StandardRotationNavigationAid
        verticalToolbar={<ToolbarComposer items={this._verticalItems} usage={ToolbarUsage.ViewNavigation} orientation={ToolbarOrientation.Vertical} />}
        horizontalToolbar={<ToolbarComposer items={this._horizontalItems} usage={ToolbarUsage.ViewNavigation} orientation={ToolbarOrientation.Horizontal} />}
      />
    );
  }
}

export function BackstageBackButton() {
  const label = IModelApp.localization.getLocalizedString("UiFramework:commands.backToPreviousFrontstage");
  return (
    <BackstageAppButton
      icon="icon-progress-backward"
      label={label}
      execute={NestedFrontstage.backToPreviousFrontstageCommand.execute}
    />
  );
}

export namespace AppToolbarUtilities {
  function getStringOrConditionalString(inString: ItemDefBase["rawLabel"]): string | ConditionalStringValue {
    if (inString instanceof ConditionalStringValue || typeof inString === "string")
      return inString;

    return inString();
  }

  // TODO: need something similar in `ToolbarHelper`.
  export function createActionButtonFromItemDef(itemPriority: number, itemDef: CommandItemDef | ToolItemDef, overrides?: Partial<ActionButton>): ActionButton {
    const isHidden = itemDef.isHidden;
    const isDisabled = itemDef.isDisabled;
    const internalData = new Map<string, any>();  // used to store ReactNode if iconSpec hold a ReactNode
    const icon = IconHelper.getIconData(itemDef.iconSpec, internalData);
    const label = getStringOrConditionalString(itemDef.rawLabel);
    const badgeType = itemDef.badgeType;

    return {
      id: itemDef.id,
      itemPriority,
      icon,
      label,
      isHidden,
      isDisabled,
      isActive: itemDef.isActive,
      execute: itemDef.execute,
      badgeType,
      internalData,
      ...overrides,
    };
  }
}
