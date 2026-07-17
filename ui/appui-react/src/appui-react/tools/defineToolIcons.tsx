/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
  FitViewTool,
  FlyViewTool,
  MeasureDistanceTool,
  MeasureLocationTool,
  PanViewTool,
  RotateViewTool,
  SelectionTool,
  ViewRedoTool,
  ViewToggleCameraTool,
  ViewUndoTool,
  WalkViewTool,
  WindowAreaTool,
  ZoomViewTool,
} from "@itwin/core-frontend";
import { ToolUtilities } from "@itwin/imodel-components-react";
import {
  SvgCameraAnimation,
  SvgCameraAnimationDisabled,
  SvgRotateLeft,
} from "@itwin/itwinui-icons-react";
import { StrataKitIcon } from "../preview/use-stratakit/StrataKitIcon.js";
import { useConditionalValue } from "../hooks/useConditionalValue.js";
import { getActiveViewport } from "../utils/getActiveViewport.js";
import { SyncUiEventId } from "../syncui/UiSyncEvent.js";
import { SvgGyroscope } from "../icons/SvgGyroscope.js";

import type { ToolType } from "@itwin/core-frontend";

const svgFitToView = async () => import("@stratakit/icons/fit-to-view.svg");
const svgWindowArea = async () => import("@stratakit/icons/window-area.svg");
const svgSearch = async () => import("@stratakit/icons/search.svg");
const svgHand = async () => import("@stratakit/icons/hand.svg");
const svgWalk = async () => import("@stratakit/icons/walk.svg");
const svgCursor = async () => import("@stratakit/icons/cursor.svg");
const svgAirplane = async () => import("@stratakit/icons/airplane.svg");
const svgWindowBack = async () => import("@stratakit/icons/window-back.svg");
const svgWindowForward = async () =>
  import("@stratakit/icons/window-forward.svg");
const svgMeasureDistance = async () =>
  import("@stratakit/icons/measure-distance.svg");
const svgMeasureLocation = async () =>
  import("@stratakit/icons/measure-location.svg");
const svgRotateLeft = async () => import("@stratakit/icons/rotate-left.svg");
const svgRotatePoint = async () => import("@stratakit/icons/rotate-point.svg");
const svgCameraVideo = async () => import("@stratakit/icons/camera-video.svg");
const svgCameraVideoDisabled = async () =>
  import("@stratakit/icons/camera-video-disabled.svg");

/** @internal */
export function defineToolIcons() {
  defineIcon(FitViewTool, svgFitToView);
  defineIcon(WindowAreaTool, svgWindowArea);
  defineIcon(ZoomViewTool, svgSearch);
  defineIcon(PanViewTool, svgHand);
  defineIconElement(RotateViewTool, <RotateViewIcon />);
  defineIcon(WalkViewTool, svgWalk);
  defineIcon(SelectionTool, svgCursor);
  // defineIcon(SetupWalkCameraTool, "icon-camera-location");
  defineIconElement(ViewToggleCameraTool, <ToggleCameraViewIcon />);
  defineIcon(FlyViewTool, svgAirplane);
  defineIcon(ViewUndoTool, svgWindowBack);
  defineIcon(ViewRedoTool, svgWindowForward);
  // defineIcon(ViewClipByPlaneTool, "icon-section-plane");
  // defineIcon(ViewClipByElementTool, "icon-section-element");
  // defineIcon(ViewClipByRangeTool, "icon-section-range");
  // defineIcon(ViewClipByShapeTool, "icon-section-shape");
  defineIcon(MeasureDistanceTool, svgMeasureDistance);
  defineIcon(MeasureLocationTool, svgMeasureLocation);
}

function defineIcon(
  toolType: ToolType,
  icon: () => Promise<{ default: string }>
) {
  if (ToolUtilities.isWithIcon(toolType)) return;
  ToolUtilities.defineIcon(
    toolType,
    <StrataKitIcon href={icon} iconSpec={toolType.iconSpec} />
  );
}

function defineIconElement(toolType: ToolType, icon: React.ReactElement) {
  if (ToolUtilities.isWithIcon(toolType)) return;
  ToolUtilities.defineIcon(toolType, icon);
}

function RotateViewIcon() {
  const viewport = useConditionalValue(getActiveViewport, [
    SyncUiEventId.ActiveContentChanged,
    SyncUiEventId.ActiveViewportChanged,
    SyncUiEventId.ViewStateChanged,
  ]);
  const is2d = viewport?.view.is2d() ?? false;
  const icon = is2d ? svgRotateLeft : svgRotatePoint;
  const iconNode = is2d ? <SvgRotateLeft /> : <SvgGyroscope />;
  return (
    <StrataKitIcon
      href={icon}
      iconNode={iconNode}
      iconSpec={RotateViewTool.iconSpec}
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
  const iconNode = cameraEnabled ? (
    <SvgCameraAnimation />
  ) : (
    <SvgCameraAnimationDisabled />
  );
  return (
    <StrataKitIcon
      href={icon}
      iconNode={iconNode}
      iconSpec={ViewToggleCameraTool.iconSpec}
    />
  );
}
