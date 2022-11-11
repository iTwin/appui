/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageAppButton, CommandItemDef, ContentGroup, ContentViewManager, CoreTools, FrontstageProps, FrontstageProvider, GroupItemDef, NavigationWidgetComposer, SelectionContextToolDefinitions,
  SessionStateActionId, SyncUiEventId, ToolbarComposer, ToolbarHelper, ToolWidgetComposer, UiFramework,
} from "@itwin/appui-react";
import { AppTools } from "../../tools/ToolSpecifications";
import { TreeExampleContentControl } from "../contentviews/TreeExampleContent";
import { SmallStatusBarWidgetControl } from "../statusbars/SmallStatusBar";
import {
  HorizontalPropertyGridContentControl, HorizontalPropertyGridWidgetControl,
} from "../widgets/PropertyGridDemoWidget";
import { IModelApp } from "@itwin/core-frontend";
import { CommonToolbarItem, ConditionalBooleanValue, StandardContentLayouts, ToolbarOrientation, ToolbarUsage, WidgetState } from "@itwin/appui-abstract";

export class Frontstage2 extends FrontstageProvider {
  public static stageId = "ui-test-app:Test2";

  public override get id(): string {
    return Frontstage2.stageId;
  }

  public override get frontstage(): FrontstageProps {
    const contentGroup = new ContentGroup(
      {
        id: "frontstage2",
        layout: StandardContentLayouts.fourQuadrants,
        contents: [
          {
            id: "imodelView1",
            classId: "UiFramework.IModelViewportControl",
            applicationData: { label: "Content 1a", bgColor: "black" },
          },
          {
            id: "treeView",
            classId: TreeExampleContentControl,
            applicationData: { label: "Content 2a", bgColor: "black" },
          },
          {
            id: "imodelView2",
            classId: "TestApp.IModelViewport",
            applicationData: { label: "Content 3a", bgColor: "black" },
          },
          {
            id: "gridView",
            classId: HorizontalPropertyGridContentControl,
            applicationData: { label: "Content 4a", bgColor: "black" },
          },
        ],
      },
    );

    return {
      id: this.id,
      defaultTool: CoreTools.selectElementCommand,
      contentGroup,
      applicationData: { key: "value" },
      contentManipulation: {
        element: <FrontstageToolWidget />,
      },
      toolSettings: {},
      viewNavigation: {
        element: <FrontstageNavigationWidget />,
      },
      statusBar: {
        control: SmallStatusBarWidgetControl,
      },
      rightPanel: {
        sections: {
          end: {
            widgets: [
              {
                defaultState: WidgetState.Hidden,
                iconSpec: "icon-placeholder",
                labelKey: "SampleApp:widgets.HorizontalPropertyGrid",
                control: HorizontalPropertyGridWidgetControl,
              },
            ],
          },
        },
      },
    };
  }
}

function getSelectionContextSyncEventIds(): string[] {
  return [SyncUiEventId.SelectionSetChanged, SyncUiEventId.ActiveContentChanged, SyncUiEventId.ActiveViewportChanged, SessionStateActionId.SetNumItemsSelected];
}

function isSelectionSetEmpty(): boolean {
  const activeContentControl = ContentViewManager.getActiveContentControl();
  let selectionCount = 0;
  if (!UiFramework.frameworkStateKey)
    selectionCount = UiFramework.store.getState()[UiFramework.frameworkStateKey].frameworkState.sessionState.numItemsSelected;

  if (activeContentControl && activeContentControl.viewport
    && (activeContentControl.viewport.view.iModel.selectionSet.size > 0 || selectionCount > 0))
    return false;
  return true;
}

function getIsHiddenIfSelectionNotActive(): ConditionalBooleanValue {
  return new ConditionalBooleanValue(isSelectionSetEmpty, getSelectionContextSyncEventIds());
}

/** Define a ToolWidget with Buttons to display in the TopLeft zone.
 */
class FrontstageToolWidget extends React.Component {
  // example toolbar item that hides/shows based on selection set
  public get myClearSelectionItemDef() {
    return new CommandItemDef({
      commandId: "UiFramework.ClearSelection",
      iconSpec: "icon-selection-clear",
      labelKey: "UiFramework:buttons.clearSelection",
      isHidden: getIsHiddenIfSelectionNotActive(),
      execute: async () => {
        const iModelConnection = UiFramework.getIModelConnection();
        if (iModelConnection) {
          iModelConnection.selectionSet.emptyAll();
        }
        const tool = IModelApp.toolAdmin.primitiveTool;
        if (tool)
          await tool.onRestartTool();
        else
          await IModelApp.toolAdmin.startDefaultTool();
      },
    });
  }

  private get _horizontalToolbarItems() {
    const toolGroup = new GroupItemDef({
      groupId: "SampleApp:buttons-toolGroup",
      labelKey: "SampleApp:buttons.toolGroup",
      iconSpec: "icon-symbol",
      items: [AppTools.tool1, AppTools.tool2],
      itemsInColumn: 7,
    });

    const items: CommonToolbarItem[] = [
      ToolbarHelper.createToolbarItemFromItemDef(10, CoreTools.clearSelectionItemDef),
      ToolbarHelper.createToolbarItemFromItemDef(20, SelectionContextToolDefinitions.clearHideIsolateEmphasizeElementsItemDef),
      ToolbarHelper.createToolbarItemFromItemDef(30, SelectionContextToolDefinitions.hideSectionToolGroup),
      ToolbarHelper.createToolbarItemFromItemDef(40, SelectionContextToolDefinitions.isolateSelectionToolGroup),
      ToolbarHelper.createToolbarItemFromItemDef(50, SelectionContextToolDefinitions.emphasizeElementsItemDef),
      ToolbarHelper.createToolbarItemFromItemDef(50, AppTools.item1),
      ToolbarHelper.createToolbarItemFromItemDef(50, AppTools.item2),
      ToolbarHelper.createToolbarItemFromItemDef(50, toolGroup),
    ];
    return items;
  }

  private get _verticalToolbarItems() {
    const items: CommonToolbarItem[] = [
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item3),
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item4),
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item5),
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item6),
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item7),
      ToolbarHelper.createToolbarItemFromItemDef(10, AppTools.item8),
    ];
    return items;
  }

  public override render() {
    return (
      <ToolWidgetComposer
        cornerItem={<BackstageAppButton />}
        horizontalToolbar={<ToolbarComposer items={this._horizontalToolbarItems} usage={ToolbarUsage.ContentManipulation} orientation={ToolbarOrientation.Horizontal} />}
        verticalToolbar={<ToolbarComposer items={this._verticalToolbarItems} usage={ToolbarUsage.ContentManipulation} orientation={ToolbarOrientation.Vertical} />}
      />
    );
  }
}

/** Define a NavigationWidget with Buttons to display in the TopRight zone.
 */
function FrontstageNavigationWidget() {
  const horizontalItems = React.useMemo(() => ToolbarHelper.createToolbarItemsFromItemDefs([
    CoreTools.fitViewCommand,
    CoreTools.windowAreaCommand,
    CoreTools.zoomViewCommand,
    CoreTools.panViewCommand,
    CoreTools.rotateViewCommand,
  ]), []);

  const verticalItems = React.useMemo(() => ToolbarHelper.createToolbarItemsFromItemDefs([
    CoreTools.toggleCameraViewCommand,
  ]), []);

  return (
    <NavigationWidgetComposer
      horizontalToolbar={<ToolbarComposer items={horizontalItems} usage={ToolbarUsage.ViewNavigation} orientation={ToolbarOrientation.Horizontal} />}
      verticalToolbar={<ToolbarComposer items={verticalItems} usage={ToolbarUsage.ViewNavigation} orientation={ToolbarOrientation.Vertical} />}
    />
  );
}
