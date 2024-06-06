/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tools
 */

import {
  itemDefToToolbarActionItem,
  itemDefToToolbarGroupItem,
} from "../toolbar/ToolbarHelper";
import type {
  ToolbarActionItem,
  ToolbarGroupItem,
} from "../toolbar/ToolbarItem";
import { CoreTools } from "./CoreToolDefinitions";

/* eslint-disable deprecation/deprecation */

/** @beta */
export namespace ToolbarItems {
  /** */
  export function createShowKeyinPalette(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      CoreTools.keyinPaletteButtonItemDef,
      overrides
    );
  }

  /** */
  export function createFitView(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(CoreTools.fitViewCommand, overrides);
  }

  /** */
  export function createWindowArea(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(CoreTools.windowAreaCommand, overrides);
  }

  /** */
  export function createZoomView(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(CoreTools.zoomViewCommand, overrides);
  }

  /** */
  export function createPanView(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(CoreTools.panViewCommand, overrides);
  }

  /** */
  export function createRotateView(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(CoreTools.rotateViewCommand, overrides);
  }

  /** */
  export function createWalkView(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(CoreTools.walkViewCommand, overrides);
  }

  /** */
  export function createSelectElement(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(
      CoreTools.selectElementCommand,
      overrides
    );
  }

  /** */
  export function createSetupWalkCamera(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(CoreTools.setupCameraWalkTool, overrides);
  }

  /** */
  export function createToggleCameraView(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      CoreTools.toggleCameraViewCommand,
      overrides
    );
  }

  /** */
  export function createFlyView(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(CoreTools.flyViewCommand, overrides);
  }

  /** */
  export function createViewUndo(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(CoreTools.viewUndoCommand, overrides);
  }

  /** */
  export function createViewRedo(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(CoreTools.viewRedoCommand, overrides);
  }

  /** */
  export function createSectionByPlane(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(
      CoreTools.sectionByPlaneCommandItemDef,
      overrides
    );
  }

  /** */
  export function createSectionByElement(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      CoreTools.sectionByElementCommandItemDef,
      overrides
    );
  }

  /** */
  export function createSectionByRange(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(
      CoreTools.sectionByRangeCommandItemDef,
      overrides
    );
  }

  /** */
  export function createSectionByShape(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(
      CoreTools.sectionByShapeCommandItemDef,
      overrides
    );
  }

  /** */
  export function createSectionGroup(overrides?: Partial<ToolbarGroupItem>) {
    return itemDefToToolbarGroupItem(CoreTools.sectionToolGroup, overrides);
  }

  /** */
  export function createMeasureDistance(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      CoreTools.measureDistanceToolItemDef,
      overrides
    );
  }

  /** */
  export function createMeasureLocation(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      CoreTools.measureLocationToolItemDef,
      overrides
    );
  }

  /** */
  export function createMeasureGroup(overrides?: Partial<ToolbarGroupItem>) {
    return itemDefToToolbarGroupItem(CoreTools.measureToolGroup, overrides);
  }

  /** */
  export function createClearSelection(overrides?: Partial<ToolbarActionItem>) {
    return itemDefToToolbarActionItem(
      CoreTools.clearSelectionItemDef,
      overrides
    );
  }

  /** */
  export function createRestoreFrontstageLayout(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return itemDefToToolbarActionItem(
      CoreTools.restoreFrontstageLayoutCommandItemDef,
      overrides
    );
  }
}
