/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tools
 */

import { SelectionContextToolDefinitions } from "../selection/SelectionContextItemDef.js";
import {
  itemDefToToolbarActionItem,
  itemDefToToolbarGroupItem,
} from "../toolbar/ToolbarHelper.js";
import type {
  ToolbarActionItem,
  ToolbarGroupItem,
} from "../toolbar/ToolbarItem.js";
import { CoreTools } from "./CoreToolDefinitions.js";

/* eslint-disable deprecation/deprecation */

/** Helper namespace to create commonly used toolbar items.
 * @beta
 */
export namespace ToolbarItems {
  /** Creates an action item to open a keyin palette. */
  export function createShowKeyinPalette(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      CoreTools.keyinPaletteButtonItemDef,
      overrides
    );
  }

  /** Creates an action item that runs a `FitViewTool`. */
  export function createFitView(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(CoreTools.fitViewCommand, overrides);
  }

  /** Creates an action item that runs a `WindowAreaTool`. */
  export function createWindowArea(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(CoreTools.windowAreaCommand, overrides);
  }

  /** Creates an action item that runs a `ZoomViewTool`. */
  export function createZoomView(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(CoreTools.zoomViewCommand, overrides);
  }

  /** Creates an action item that runs a `PanViewTool`. */
  export function createPanView(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(CoreTools.panViewCommand, overrides);
  }

  /** Creates an action item that runs a `RotateViewTool`. */
  export function createRotateView(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(CoreTools.rotateViewCommand, overrides);
  }

  /** Creates an action item that runs a `WalkViewTool`. */
  export function createWalkView(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(CoreTools.walkViewCommand, overrides);
  }

  /** Creates an action item that runs a `SelectionTool`. */
  export function createSelectElement(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(
      CoreTools.selectElementCommand,
      overrides
    );
  }

  /** Creates an action item that runs a `SetupWalkCameraTool`. */
  export function createSetupWalkCamera(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(CoreTools.setupCameraWalkTool, overrides);
  }

  /** Creates an action item that runs a `ViewToggleCameraTool`. */
  export function createToggleCameraView(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      CoreTools.toggleCameraViewCommand,
      overrides
    );
  }

  /** Creates an action item that runs a `FlyViewTool`. */
  export function createFlyView(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(CoreTools.flyViewCommand, overrides);
  }

  /** Creates an action item that runs a `ViewUndoTool`. */
  export function createViewUndo(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(CoreTools.viewUndoCommand, overrides);
  }

  /** Creates an action item that runs a `ViewRedoTool`. */
  export function createViewRedo(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(CoreTools.viewRedoCommand, overrides);
  }

  /** Creates an action item that runs a `ViewClipByPlaneTool`. */
  export function createSectionByPlane(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(
      CoreTools.sectionByPlaneCommandItemDef,
      overrides
    );
  }

  /** Creates an action item that runs a `ViewClipByElementTool`. */
  export function createSectionByElement(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      CoreTools.sectionByElementCommandItemDef,
      overrides
    );
  }

  /** Creates an action item that runs a `ViewClipByRangeTool`. */
  export function createSectionByRange(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(
      CoreTools.sectionByRangeCommandItemDef,
      overrides
    );
  }

  /** Creates an action item that runs a `ViewClipByShapeTool`. */
  export function createSectionByShape(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(
      CoreTools.sectionByShapeCommandItemDef,
      overrides
    );
  }

  /** Creates a group item with all sectioning tools. */
  export function createSectionGroup(overrides?: Partial<ToolbarGroupItem>) {
    return itemDefToToolbarGroupItem(CoreTools.sectionToolGroup, overrides);
  }

  /** Creates an action item that runs a `MeasureDistanceTool`. */
  export function createMeasureDistance(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      CoreTools.measureDistanceToolItemDef,
      overrides
    );
  }

  /** Creates an action item that runs a `MeasureLocationTool`. */
  export function createMeasureLocation(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      CoreTools.measureLocationToolItemDef,
      overrides
    );
  }

  /** Creates a group item with all measurement tools. */
  export function createMeasureGroup(overrides?: Partial<ToolbarGroupItem>) {
    return itemDefToToolbarGroupItem(CoreTools.measureToolGroup, overrides);
  }

  /** Creates an action item that clears a selection set. */
  export function createClearSelection(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(
      CoreTools.clearSelectionItemDef,
      overrides
    );
  }

  /** Creates an action item that runs a `RestoreFrontstageLayoutTool`. */
  export function createRestoreFrontstageLayout(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      CoreTools.restoreFrontstageLayoutCommandItemDef,
      overrides
    );
  }

  /** Creates an action item that isolates models in the selection. */
  export function createIsolateModelsInSelection(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      SelectionContextToolDefinitions.isolateModelsInSelectionItemDef,
      overrides
    );
  }

  /** Creates an action item that isolates categories in the selection. */
  export function createIsolateCategoriesInSelection(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      SelectionContextToolDefinitions.isolateCategoriesInSelectionItemDef,
      overrides
    );
  }

  /** Creates an action item that runs isolates elements. */
  export function createIsolateElements(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      SelectionContextToolDefinitions.isolateElementsItemDef,
      overrides
    );
  }

  /** Creates a group item with all isolation tools. */
  export function createIsolateSelectionGroup(
    overrides?: Partial<ToolbarGroupItem>
  ) {
    return itemDefToToolbarGroupItem(
      SelectionContextToolDefinitions.isolateSelectionToolGroup,
      overrides
    );
  }

  /** Creates an action item that hides models in selection. */
  export function createHideModelsInSelection(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      SelectionContextToolDefinitions.hideModelsInSelectionItemDef,
      overrides
    );
  }

  /** Creates an action item that hides categories in selection. */
  export function createHideCategoriesInSelection(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      SelectionContextToolDefinitions.hideCategoriesInSelectionItemDef,
      overrides
    );
  }

  /** Creates an action item that hides selected elements. */
  export function createHideElements(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(
      SelectionContextToolDefinitions.hideElementsItemDef,
      overrides
    );
  }

  /** Creates a group item with all hide tools. */
  export function createHideSectionGroup(
    overrides?: Partial<ToolbarGroupItem>
  ) {
    return itemDefToToolbarGroupItem(
      SelectionContextToolDefinitions.hideSectionToolGroup,
      overrides
    );
  }

  /** Creates an action item that emphasizes selected elements. */
  export function createEmphasizeElements(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      SelectionContextToolDefinitions.emphasizeElementsItemDef,
      overrides
    );
  }

  /** Creates an action item that clears hide, isolate and emphasize visibility modifiers. */
  export function createClearHideIsolateEmphasizeElements(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      SelectionContextToolDefinitions.clearHideIsolateEmphasizeElementsItemDef,
      overrides
    );
  }
}
