/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tools
 */

import * as React from "react";
import type { ToolType } from "@itwin/core-frontend";
import {
  FitViewTool,
  FlyViewTool,
  IModelApp,
  MeasureDistanceTool,
  MeasureLocationTool,
  PanViewTool,
  RotateViewTool,
  SelectionTool,
  SetupWalkCameraTool,
  ViewClipByElementTool,
  ViewClipByPlaneTool,
  ViewClipByRangeTool,
  ViewClipByShapeTool,
  ViewClipDecorationProvider,
  ViewRedoTool,
  ViewToggleCameraTool,
  ViewUndoTool,
  WalkViewTool,
  WindowAreaTool,
  ZoomViewTool,
} from "@itwin/core-frontend";
import {
  ConditionalBooleanValue,
  ConditionalStringValue,
} from "@itwin/appui-abstract";
import { getIsHiddenIfSelectionNotActive } from "../selection/SelectionContextItemDef.js";
import { CommandItemDef } from "../shared/CommandItemDef.js";
import { ToolItemDef } from "../shared/ToolItemDef.js";
import { SyncUiEventId } from "../syncui/UiSyncEvent.js";
import { GroupItemDef } from "../toolbar/GroupItem.js";
import { RestoreFrontstageLayoutTool } from "./RestoreLayoutTool.js";
import { UiFramework } from "../UiFramework.js";
import { SvgSectionTool } from "../icons/SvgSectionTool.js";
import {
  SvgMeasure,
  SvgProcess,
  SvgSelectionClear,
} from "@itwin/itwinui-icons-react";
import type { ToolbarItems } from "./ToolbarItems.js";
import { getActiveViewport } from "../utils/getActiveViewport.js";
import { StrataKitIcon } from "../preview/use-stratakit/StrataKitIcon.js";
import type { ToolItemProps } from "../shared/ItemProps.js";
import { ToolUtilities } from "@itwin/imodel-components-react";

const svgMeasure = async () => import("@stratakit/icons/measure.svg");
const svgKeyboard = async () => import("@stratakit/icons/keyboard.svg");
const svgSelectionClear = async () =>
  import("@stratakit/icons/selection-clear.svg");

/* eslint-disable @typescript-eslint/no-deprecated */

/** Utility Class that provides definitions of tools provided by the ($core-frontend) core. These definitions can be used to populate the UI.
 * @public
 * @deprecated in 4.15.0. Use {@link ToolbarItems} instead.
 */
export class CoreTools {
  public static get keyinPaletteButtonItemDef() {
    return new ToolItemDef({
      toolId: "uif:keyinpalette",
      icon: <StrataKitIcon href={svgKeyboard} iconNode={<SvgProcess />} />,
      labelKey: "UiFramework:keyinbrowser.label",
      execute: () => {
        UiFramework.showKeyinPalette(
          IModelApp.tools.getToolList().map((tool) => ({ value: tool.keyin }))
        );
      },
    });
  }

  public static get fitViewCommand() {
    return createForTool(FitViewTool, {
      execute: async () =>
        IModelApp.tools.run(
          FitViewTool.toolId,
          IModelApp.viewManager.selectedView,
          true
        ),
    });
  }

  public static get windowAreaCommand() {
    return createForTool(WindowAreaTool, {
      execute: async () =>
        IModelApp.tools.run(
          WindowAreaTool.toolId,
          IModelApp.viewManager.selectedView
        ),
    });
  }

  public static get zoomViewCommand() {
    return createForTool(ZoomViewTool, {
      execute: async () =>
        IModelApp.tools.run(
          ZoomViewTool.toolId,
          IModelApp.viewManager.selectedView
        ),
    });
  }

  public static get panViewCommand() {
    return createForTool(PanViewTool, {
      execute: async () =>
        IModelApp.tools.run(
          PanViewTool.toolId,
          IModelApp.viewManager.selectedView
        ),
    });
  }

  public static get rotateViewCommand() {
    return createForTool(RotateViewTool, {
      execute: async () =>
        IModelApp.tools.run(
          RotateViewTool.toolId,
          IModelApp.viewManager.selectedView
        ),
    });
  }

  public static get walkViewCommand() {
    return createForTool(WalkViewTool, {
      isHidden: new ConditionalBooleanValue(() => {
        const viewport = getActiveViewport();
        return !!viewport?.view.is2d();
      }, [
        SyncUiEventId.ActiveContentChanged,
        SyncUiEventId.ActiveViewportChanged,
        SyncUiEventId.ViewStateChanged,
      ]),
      execute: async () =>
        IModelApp.tools.run(
          WalkViewTool.toolId,
          IModelApp.viewManager.selectedView
        ),
    });
  }

  public static get selectElementCommand() {
    return createForTool(SelectionTool, {
      execute: async () => IModelApp.tools.run(SelectionTool.toolId),
    });
  }

  public static get setupCameraWalkTool() {
    return createForTool(SetupWalkCameraTool, {
      execute: async () => IModelApp.tools.run(SetupWalkCameraTool.toolId),
    });
  }

  public static get toggleCameraViewCommand() {
    return createForTool(ViewToggleCameraTool, {
      label: new ConditionalStringValue(() => {
        const viewport = getActiveViewport();
        if (viewport?.view.is3d() && viewport?.isCameraOn) {
          return UiFramework.translate(
            "tools.View.ToggleCamera.turnOffFlyover"
          );
        }
        return UiFramework.translate("tools.View.ToggleCamera.turnOnFlyover");
      }, [
        SyncUiEventId.ActiveContentChanged,
        SyncUiEventId.ActiveViewportChanged,
        SyncUiEventId.ViewStateChanged,
      ]),
      isHidden: new ConditionalBooleanValue(() => {
        const viewport = getActiveViewport();
        return !(viewport?.view.is3d() && viewport?.view.supportsCamera());
      }, [
        SyncUiEventId.ActiveContentChanged,
        SyncUiEventId.ActiveViewportChanged,
        SyncUiEventId.ViewStateChanged,
      ]),
      execute: async () =>
        IModelApp.tools.run(
          ViewToggleCameraTool.toolId,
          IModelApp.viewManager.selectedView
        ),
    });
  }

  public static get flyViewCommand() {
    return createForTool(FlyViewTool, {
      execute: async () =>
        IModelApp.tools.run(
          FlyViewTool.toolId,
          IModelApp.viewManager.selectedView
        ),
    });
  }

  // TODO - Need to provide a sync message that is fired when the Undo/Redo button needs to be refreshed in the
  // active view.
  public static get viewUndoCommand() {
    return createForTool(ViewUndoTool, {
      isDisabled: new ConditionalBooleanValue(() => {
        const viewport = getActiveViewport();
        if (!viewport) return false;
        return !viewport.isUndoPossible;
      }, [
        SyncUiEventId.ActiveContentChanged,
        SyncUiEventId.ActiveViewportChanged,
        SyncUiEventId.ViewStateChanged,
      ]),
      execute: async () =>
        IModelApp.tools.run(
          ViewUndoTool.toolId,
          IModelApp.viewManager.selectedView
        ),
    });
  }

  public static get viewRedoCommand() {
    return createForTool(ViewRedoTool, {
      execute: async () =>
        IModelApp.tools.run(
          ViewRedoTool.toolId,
          IModelApp.viewManager.selectedView
        ),
      isDisabled: new ConditionalBooleanValue(() => {
        const viewport = getActiveViewport();
        if (!viewport) return false;
        return !viewport.isRedoPossible;
      }, [
        SyncUiEventId.ActiveContentChanged,
        SyncUiEventId.ActiveViewportChanged,
        SyncUiEventId.ViewStateChanged,
      ]),
    });
  }

  private static turnOnClipVolume() {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp || !vp.view.is3d()) return;

    // Turn on clip volume flag for section tools
    vp.viewFlags = vp.viewFlags.with("clipVolume", true);
  }

  // note current ViewClipByPlaneTool is not automatically registered so the app must call ViewClipByPlaneTool.register();
  public static get sectionByPlaneCommandItemDef() {
    return createForTool(ViewClipByPlaneTool, {
      execute: async () => {
        this.turnOnClipVolume();
        return IModelApp.tools.run(
          ViewClipByPlaneTool.toolId,
          ViewClipDecorationProvider.create()
        );
      },
    });
  }

  // note current ViewClipByElementTool is not automatically registered so the app must call ViewClipByElementTool.register();
  public static get sectionByElementCommandItemDef() {
    return createForTool(ViewClipByElementTool, {
      execute: async () => {
        this.turnOnClipVolume();
        return IModelApp.tools.run(
          ViewClipByElementTool.toolId,
          ViewClipDecorationProvider.create()
        );
      },
    });
  }

  // note current ViewClipByRangeTool is not automatically registered so the app must call ViewClipByRangeTool.register();
  public static get sectionByRangeCommandItemDef() {
    return createForTool(ViewClipByRangeTool, {
      execute: async () => {
        this.turnOnClipVolume();
        return IModelApp.tools.run(
          ViewClipByRangeTool.toolId,
          ViewClipDecorationProvider.create()
        );
      },
    });
  }

  // note current ViewClipByShapeTool is not automatically registered so the app must call ViewClipByShapeTool.register();
  public static get sectionByShapeCommandItemDef() {
    return createForTool(ViewClipByShapeTool, {
      execute: async () => {
        this.turnOnClipVolume();
        return IModelApp.tools.run(
          ViewClipByShapeTool.toolId,
          ViewClipDecorationProvider.create()
        );
      },
    });
  }

  public static get sectionToolGroup() {
    ViewClipByElementTool.register();
    ViewClipByPlaneTool.register();
    ViewClipByRangeTool.register();
    ViewClipByShapeTool.register();

    return new GroupItemDef({
      groupId: "sectionTools-group",
      labelKey: "UiFramework:tools.sectionTools",
      icon: <SvgSectionTool />,
      isHidden: new ConditionalBooleanValue(() => {
        const viewport = getActiveViewport();
        return !!viewport?.view.is2d();
      }, [
        SyncUiEventId.ActiveContentChanged,
        SyncUiEventId.ActiveViewportChanged,
        SyncUiEventId.ViewStateChanged,
      ]),
      items: [
        this.sectionByPlaneCommandItemDef,
        this.sectionByElementCommandItemDef,
        this.sectionByRangeCommandItemDef,
        this.sectionByShapeCommandItemDef,
      ],
      itemsInColumn: 4,
    });
  }

  public static get sectionToolGroupWithPanel() {
    ViewClipByElementTool.register();
    ViewClipByPlaneTool.register();
    ViewClipByRangeTool.register();
    ViewClipByShapeTool.register();

    return new GroupItemDef({
      groupId: "sectionTools-group-with-panel",
      labelKey: "UiFramework:tools.sectionTools",
      panelLabelKey: "UiFramework:tools.sectionPanelLabel",
      icon: <SvgSectionTool />,
      isHidden: new ConditionalBooleanValue(() => {
        const viewport = getActiveViewport();
        return !!viewport?.view.is2d();
      }, [
        SyncUiEventId.ActiveContentChanged,
        SyncUiEventId.ActiveViewportChanged,
        SyncUiEventId.ViewStateChanged,
      ]),
      items: [
        new ToolItemDef({
          ...this.sectionByPlaneCommandItemDef,
          labelKey: "UiFramework:tools.sectionByPlane",
        }),
        new ToolItemDef({
          ...this.sectionByElementCommandItemDef,
          labelKey: "UiFramework:tools.sectionByElement",
        }),
        new ToolItemDef({
          ...this.sectionByRangeCommandItemDef,
          labelKey: "UiFramework:tools.sectionByRange",
        }),
        new ToolItemDef({
          ...this.sectionByShapeCommandItemDef,
          labelKey: "UiFramework:tools.sectionByShape",
        }),
      ],
      itemsInColumn: 4,
    });
  }

  // note current MeasureDistanceTool is not automatically registered so the app must call MeasureDistanceTool.register();
  public static get measureDistanceToolItemDef() {
    return createForTool(MeasureDistanceTool, {
      execute: async () => {
        return IModelApp.tools.run(MeasureDistanceTool.toolId);
      },
    });
  }

  // note current MeasureLocationTool is not automatically registered so the app must call MeasureLocationTool.register();
  public static get measureLocationToolItemDef() {
    return createForTool(MeasureLocationTool, {
      execute: async () => {
        return IModelApp.tools.run(MeasureLocationTool.toolId);
      },
    });
  }

  public static get measureToolGroup() {
    MeasureDistanceTool.register();
    MeasureLocationTool.register();

    return new GroupItemDef({
      groupId: "measureTools-group",
      labelKey: "UiFramework:tools.measureTools",
      icon: <StrataKitIcon href={svgMeasure} iconNode={<SvgMeasure />} />,
      items: [this.measureDistanceToolItemDef, this.measureLocationToolItemDef],
      itemsInColumn: 2,
    });
  }

  public static get clearSelectionItemDef() {
    return new CommandItemDef({
      commandId: "UiFramework.ClearSelection",
      icon: (
        <StrataKitIcon
          href={svgSelectionClear}
          iconNode={<SvgSelectionClear />}
        />
      ),
      labelKey: "UiFramework:buttons.clearSelection",
      isHidden: getIsHiddenIfSelectionNotActive(),
      execute: async () => {
        const iModelConnection = UiFramework.getIModelConnection();
        if (iModelConnection) {
          iModelConnection.selectionSet.emptyAll();
        }
        const tool = IModelApp.toolAdmin.primitiveTool;
        if (tool) await tool.onRestartTool();
        else await IModelApp.toolAdmin.startDefaultTool();
      },
    });
  }

  public static get restoreFrontstageLayoutCommandItemDef() {
    return createForTool(RestoreFrontstageLayoutTool, {
      execute: async () => {
        return IModelApp.tools.run(RestoreFrontstageLayoutTool.toolId);
      },
    });
  }
}

function getToolIcon(toolType: ToolType) {
  if (!ToolUtilities.isWithIcon(toolType)) return undefined;
  return toolType.iconElement;
}

function createForTool(toolType: ToolType, overrides?: Partial<ToolItemProps>) {
  const icon = getToolIcon(toolType);
  return new ToolItemDef({
    toolId: toolType.toolId,
    iconSpec: toolType.iconSpec,
    label: toolType.flyover,
    description: toolType.description,
    ...(icon ? { icon } : {}),
    ...overrides,
  });
}
