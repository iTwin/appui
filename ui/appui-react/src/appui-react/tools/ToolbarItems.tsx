/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tools
 */

import * as React from "react";
import { StrataKitIcon } from "../preview/use-stratakit/StrataKitIcon.js";
import { SelectionContextToolDefinitions } from "../selection/SelectionContextItemDef.js";
import {
  itemDefToToolbarActionItem,
  itemDefToToolbarGroupItem,
} from "../toolbar/ToolbarHelper.js";
import { CoreTools } from "./CoreToolDefinitions.js";
import { useConditionalValue } from "../hooks/useConditionalValue.js";
import { SyncUiEventId } from "../syncui/UiSyncEvent.js";
import { getActiveViewport } from "../utils/getActiveViewport.js";

import type { CommandItemDef } from "../shared/CommandItemDef.js";
import type { ToolItemDef } from "../shared/ToolItemDef.js";
import {
  isToolbarGroupItem,
  type ToolbarActionItem,
  type ToolbarGroupItem,
} from "../toolbar/ToolbarItem.js";

import svgCursor from "@stratakit/icons/cursor.svg";
import svgFitToView from "@stratakit/icons/fit-to-view.svg";
import svgKeyboard from "@stratakit/icons/keyboard.svg";
import svgWindowArea from "@stratakit/icons/window-area.svg";
import svgSearch from "@stratakit/icons/search.svg";
import svgHand from "@stratakit/icons/hand.svg";
import svgRotateLeft from "@stratakit/icons/rotate-left.svg";
import svgRotatePoint from "@stratakit/icons/rotate-point.svg";
import svgWalk from "@stratakit/icons/walk.svg";
import svgCameraVideo from "@stratakit/icons/camera-video.svg";
import svgCameraVideoDisabled from "@stratakit/icons/camera-video-disabled.svg";
import svgAirplane from "@stratakit/icons/airplane.svg";
import svgWindowBack from "@stratakit/icons/window-back.svg";
import svgWindowForward from "@stratakit/icons/window-forward.svg";
import svgMeasureDistance from "@stratakit/icons/measure-distance.svg";
import svgMeasureLocation from "@stratakit/icons/measure-location.svg";
import svgMeasure from "@stratakit/icons/measure.svg";
import svgSelectionClear from "@stratakit/icons/selection-clear.svg";
import svgVisibilityDisabled from "@stratakit/icons/visibility-disabled.svg";
import svgVisibilityEmphasis from "@stratakit/icons/visibility-emphasis.svg";
import svgIsolate from "@stratakit/icons/isolate.svg";

import type { GroupItemDef } from "../toolbar/GroupItem.js";
import type { Draft } from "immer";
import { castDraft, produce } from "immer";

/* eslint-disable @typescript-eslint/no-deprecated */

/** Helper namespace to create commonly used toolbar items.
 * @beta
 */
export namespace ToolbarItems {
  /** Creates an action item to open a keyin palette. */
  export function createShowKeyinPalette(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return toToolbarActionItem(CoreTools.keyinPaletteButtonItemDef, overrides);
  }

  /** Creates an action item that runs a `FitViewTool`. */
  export function createFitView(overrides?: Partial<ToolbarActionItem>) {
    return toToolbarActionItem(CoreTools.fitViewCommand, overrides);
  }

  /** Creates an action item that runs a `WindowAreaTool`. */
  export function createWindowArea(overrides?: Partial<ToolbarActionItem>) {
    return toToolbarActionItem(CoreTools.windowAreaCommand, overrides);
  }

  /** Creates an action item that runs a `ZoomViewTool`. */
  export function createZoomView(overrides?: Partial<ToolbarActionItem>) {
    return toToolbarActionItem(CoreTools.zoomViewCommand, overrides);
  }

  /** Creates an action item that runs a `PanViewTool`. */
  export function createPanView(overrides?: Partial<ToolbarActionItem>) {
    return toToolbarActionItem(CoreTools.panViewCommand, overrides);
  }

  /** Creates an action item that runs a `RotateViewTool`. */
  export function createRotateView(overrides?: Partial<ToolbarActionItem>) {
    return toToolbarActionItem(CoreTools.rotateViewCommand, overrides);
  }

  /** Creates an action item that runs a `WalkViewTool`. */
  export function createWalkView(overrides?: Partial<ToolbarActionItem>) {
    return toToolbarActionItem(CoreTools.walkViewCommand, overrides);
  }

  /** Creates an action item that runs a `SelectionTool`. */
  export function createSelectElement(overrides?: Partial<ToolbarActionItem>) {
    return toToolbarActionItem(CoreTools.selectElementCommand, overrides);
  }

  /** Creates an action item that runs a `SetupWalkCameraTool`. */
  export function createSetupWalkCamera(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return toToolbarActionItem(CoreTools.setupCameraWalkTool, overrides);
  }

  /** Creates an action item that runs a `ViewToggleCameraTool`. */
  export function createToggleCameraView(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return toToolbarActionItem(CoreTools.toggleCameraViewCommand, overrides);
  }

  /** Creates an action item that runs a `FlyViewTool`. */
  export function createFlyView(overrides?: Partial<ToolbarActionItem>) {
    return toToolbarActionItem(CoreTools.flyViewCommand, overrides);
  }

  /** Creates an action item that runs a `ViewUndoTool`. */
  export function createViewUndo(overrides?: Partial<ToolbarActionItem>) {
    return toToolbarActionItem(CoreTools.viewUndoCommand, overrides);
  }

  /** Creates an action item that runs a `ViewRedoTool`. */
  export function createViewRedo(overrides?: Partial<ToolbarActionItem>) {
    return toToolbarActionItem(CoreTools.viewRedoCommand, overrides);
  }

  /** Creates an action item that runs a `ViewClipByPlaneTool`. */
  export function createSectionByPlane(overrides?: Partial<ToolbarActionItem>) {
    return toToolbarActionItem(
      CoreTools.sectionByPlaneCommandItemDef,
      overrides
    );
  }

  /** Creates an action item that runs a `ViewClipByElementTool`. */
  export function createSectionByElement(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return toToolbarActionItem(
      CoreTools.sectionByElementCommandItemDef,
      overrides
    );
  }

  /** Creates an action item that runs a `ViewClipByRangeTool`. */
  export function createSectionByRange(overrides?: Partial<ToolbarActionItem>) {
    return toToolbarActionItem(
      CoreTools.sectionByRangeCommandItemDef,
      overrides
    );
  }

  /** Creates an action item that runs a `ViewClipByShapeTool`. */
  export function createSectionByShape(overrides?: Partial<ToolbarActionItem>) {
    return toToolbarActionItem(
      CoreTools.sectionByShapeCommandItemDef,
      overrides
    );
  }

  /** Creates a group item with all sectioning tools. */
  export function createSectionGroup(overrides?: Partial<ToolbarGroupItem>) {
    return toToolbarGroupItem(CoreTools.sectionToolGroup, overrides);
  }

  /** Creates an action item that runs a `MeasureDistanceTool`. */
  export function createMeasureDistance(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return toToolbarActionItem(CoreTools.measureDistanceToolItemDef, overrides);
  }

  /** Creates an action item that runs a `MeasureLocationTool`. */
  export function createMeasureLocation(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return toToolbarActionItem(CoreTools.measureLocationToolItemDef, overrides);
  }

  /** Creates a group item with all measurement tools. */
  export function createMeasureGroup(overrides?: Partial<ToolbarGroupItem>) {
    return toToolbarGroupItem(CoreTools.measureToolGroup, overrides);
  }

  /** Creates an action item that clears a selection set. */
  export function createClearSelection(overrides?: Partial<ToolbarActionItem>) {
    return toToolbarActionItem(CoreTools.clearSelectionItemDef, overrides);
  }

  /** Creates an action item that runs a `RestoreFrontstageLayoutTool`. */
  export function createRestoreFrontstageLayout(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return toToolbarActionItem(
      CoreTools.restoreFrontstageLayoutCommandItemDef,
      overrides
    );
  }

  /** Creates an action item that isolates models in the selection. */
  export function createIsolateModelsInSelection(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return toToolbarActionItem(
      SelectionContextToolDefinitions.isolateModelsInSelectionItemDef,
      overrides
    );
  }

  /** Creates an action item that isolates categories in the selection. */
  export function createIsolateCategoriesInSelection(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return toToolbarActionItem(
      SelectionContextToolDefinitions.isolateCategoriesInSelectionItemDef,
      overrides
    );
  }

  /** Creates an action item that runs isolates elements. */
  export function createIsolateElements(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return toToolbarActionItem(
      SelectionContextToolDefinitions.isolateElementsItemDef,
      overrides
    );
  }

  /** Creates a group item with all isolation tools. */
  export function createIsolateSelectionGroup(
    overrides?: Partial<ToolbarGroupItem>
  ) {
    return toToolbarGroupItem(
      SelectionContextToolDefinitions.isolateSelectionToolGroup,
      overrides
    );
  }

  /** Creates an action item that hides models in selection. */
  export function createHideModelsInSelection(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return toToolbarActionItem(
      SelectionContextToolDefinitions.hideModelsInSelectionItemDef,
      overrides
    );
  }

  /** Creates an action item that hides categories in selection. */
  export function createHideCategoriesInSelection(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return toToolbarActionItem(
      SelectionContextToolDefinitions.hideCategoriesInSelectionItemDef,
      overrides
    );
  }

  /** Creates an action item that hides selected elements. */
  export function createHideElements(overrides?: Partial<ToolbarActionItem>) {
    return toToolbarActionItem(
      SelectionContextToolDefinitions.hideElementsItemDef,
      overrides
    );
  }

  /** Creates a group item with all hide tools. */
  export function createHideSectionGroup(
    overrides?: Partial<ToolbarGroupItem>
  ) {
    return toToolbarGroupItem(
      SelectionContextToolDefinitions.hideSectionToolGroup,
      overrides
    );
  }

  /** Creates an action item that emphasizes selected elements. */
  export function createEmphasizeElements(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return toToolbarActionItem(
      SelectionContextToolDefinitions.emphasizeElementsItemDef,
      overrides
    );
  }

  /** Creates an action item that clears hide, isolate and emphasize visibility modifiers. */
  export function createClearHideIsolateEmphasizeElements(
    overrides?: Partial<ToolbarActionItem>
  ) {
    return toToolbarActionItem(
      SelectionContextToolDefinitions.clearHideIsolateEmphasizeElementsItemDef,
      overrides
    );
  }
}

function toToolbarActionItem(
  itemDef: ToolItemDef | CommandItemDef,
  overrides?: Partial<ToolbarActionItem>
) {
  const item = itemDefToToolbarActionItem(itemDef);
  const iconNode = getIconNode(itemDef.id);
  return {
    ...item,
    ...(iconNode ? { iconNode } : {}),
    ...overrides,
  };
}

function toToolbarGroupItem(
  itemDef: GroupItemDef,
  overrides?: Partial<ToolbarGroupItem>
) {
  let item = itemDefToToolbarGroupItem(itemDef);
  const iconNode = getIconNode(itemDef.id);
  item = produce(item, (draft) => {
    overrideIcons(draft.items);
  });
  return {
    ...item,
    ...(iconNode ? { iconNode } : {}),
    ...overrides,
  };
}

function overrideIcons(items: Draft<ToolbarGroupItem["items"]>) {
  for (const item of items) {
    const icon = getIconNode(item.id);
    if (icon) {
      item.iconNode = icon;
    }

    if (isToolbarGroupItem(item)) {
      overrideIcons(castDraft(item.items));
    }
  }
}

function RotateViewIcon() {
  const viewport = useConditionalValue(getActiveViewport, [
    SyncUiEventId.ActiveContentChanged,
    SyncUiEventId.ActiveViewportChanged,
    SyncUiEventId.ViewStateChanged,
  ]);
  const is2d = viewport?.view.is2d() ?? false;
  const icon = is2d ? svgRotateLeft : svgRotatePoint;
  return (
    <StrataKitIcon
      href={icon}
      iconSpec={CoreTools.rotateViewCommand.iconSpec}
    />
  );
}

function ToggleCameraViewIcon() {
  const viewport = useConditionalValue(getActiveViewport, [
    SyncUiEventId.ActiveContentChanged,
    SyncUiEventId.ActiveViewportChanged,
    SyncUiEventId.ViewStateChanged,
  ]);

  const cameraEnabled = viewport?.view.is3d() && viewport?.isCameraOn;
  const icon = cameraEnabled ? svgCameraVideo : svgCameraVideoDisabled;
  return (
    <StrataKitIcon
      href={icon}
      iconSpec={CoreTools.toggleCameraViewCommand.iconSpec}
    />
  );
}

interface IconMap {
  [key: string]: React.ReactNode;
}

// Define once to avoid re-definitions in group items.
let iconNodes: IconMap | undefined;
function getIconNodes() {
  if (!iconNodes) {
    iconNodes = {};
    const { add, addNode } = initializer(iconNodes);

    add(CoreTools.keyinPaletteButtonItemDef, svgKeyboard);
    add(CoreTools.fitViewCommand, svgFitToView);
    add(CoreTools.windowAreaCommand, svgWindowArea);
    add(CoreTools.zoomViewCommand, svgSearch);
    add(CoreTools.panViewCommand, svgHand);
    addNode(CoreTools.rotateViewCommand, <RotateViewIcon />);
    add(CoreTools.walkViewCommand, svgWalk);
    add(CoreTools.selectElementCommand, svgCursor);
    // add(CoreTools.setupCameraWalkTool, "icon-camera-location");
    addNode(CoreTools.toggleCameraViewCommand, <ToggleCameraViewIcon />);
    add(CoreTools.flyViewCommand, svgAirplane);
    add(CoreTools.viewUndoCommand, svgWindowBack);
    add(CoreTools.viewRedoCommand, svgWindowForward);
    // add(CoreTools.sectionByPlaneCommandItemDef, "icon-section-plane");
    // add(CoreTools.sectionByElementCommandItemDef, "icon-section-element");
    // add(CoreTools.sectionByRangeCommandItemDef, "icon-section-range");
    // add(CoreTools.sectionByShapeCommandItemDef, "icon-section-shape");
    // add(CoreTools.sectionToolGroup, <SvgSectionTool />);
    add(CoreTools.measureDistanceToolItemDef, svgMeasureDistance);
    add(CoreTools.measureLocationToolItemDef, svgMeasureLocation);
    add(CoreTools.measureToolGroup, svgMeasure);
    add(CoreTools.clearSelectionItemDef, svgSelectionClear);
    // add(CoreTools.restoreFrontstageLayoutCommandItemDef, <SvgViewLayouts />);
    // add(SelectionContextToolDefinitions.isolateModelsInSelectionItemDef, <SvgModelIsolate />);
    // add(SelectionContextToolDefinitions.isolateCategoriesInSelectionItemDef, <SvgLayersIsolate />);
    // add(SelectionContextToolDefinitions.isolateElementsItemDef, <SvgAssetIsolate />);
    add(SelectionContextToolDefinitions.isolateSelectionToolGroup, svgIsolate);
    // add(SelectionContextToolDefinitions.hideModelsInSelectionItemDef, <SvgModelHide />);
    // add(SelectionContextToolDefinitions.hideCategoriesInSelectionItemDef, <SvgLayersHide />);
    // add(SelectionContextToolDefinitions.hideElementsItemDef, <SvgAssetClassificationHide />);
    add(
      SelectionContextToolDefinitions.hideSectionToolGroup,
      svgVisibilityDisabled
    );
    add(
      SelectionContextToolDefinitions.emphasizeElementsItemDef,
      svgVisibilityEmphasis
    );
    // add(SelectionContextToolDefinitions.clearHideIsolateEmphasizeElementsItemDef, <SvgVisibilityShow />);
  }

  return iconNodes;
}

function getIconNode(id: string): React.ReactNode | undefined {
  const icons = getIconNodes();
  return icons[id];
}

function initializer(icons: IconMap) {
  return {
    add: (
      itemDef: ToolItemDef | CommandItemDef | GroupItemDef,
      icon: string
    ) => {
      icons[itemDef.id] = (
        <StrataKitIcon href={icon} iconSpec={itemDef.iconSpec} />
      );
    },
    addNode: (
      itemDef: ToolItemDef | CommandItemDef | GroupItemDef,
      icon: React.ReactNode
    ) => {
      icons[itemDef.id] = icon;
    },
  };
}
