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
import { useStrataKitIcon } from "../preview/use-stratakit/useStrataKitIcon.js";

/** @internal */
export function defineToolIcons() {
  defineIcon(FitViewTool, <FitViewToolIcon />);
  defineIcon(WindowAreaTool, <WindowAreaToolIcon />);
  defineIcon(ZoomViewTool, <ZoomViewToolIcon />);
  defineIcon(PanViewTool, <PanViewToolIcon />);
  defineIcon(RotateViewTool, <RotateViewIcon />);
  defineIcon(WalkViewTool, <WalkViewToolIcon />);
  defineIcon(SelectionTool, <SelectionToolIcon />);
  // defineIcon(SetupWalkCameraTool, "icon-camera-location");
  defineIcon(ViewToggleCameraTool, <ToggleCameraViewIcon />);
  defineIcon(FlyViewTool, <FlyViewToolIcon />);
  defineIcon(ViewUndoTool, <ViewUndoToolIcon />);
  defineIcon(ViewRedoTool, <ViewRedoToolIcon />);
  // defineIcon(ViewClipByPlaneTool, "icon-section-plane");
  // defineIcon(ViewClipByElementTool, "icon-section-element");
  // defineIcon(ViewClipByRangeTool, "icon-section-range");
  // defineIcon(ViewClipByShapeTool, "icon-section-shape");
  defineIcon(MeasureDistanceTool, <MeasureDistanceToolIcon />);
  defineIcon(MeasureLocationTool, <MeasureLocationToolIcon />);
}

function defineIcon(toolType: ToolType, icon: React.ReactElement) {
  if (ToolUtilities.isWithIcon(toolType)) return;
  ToolUtilities.defineIcon(toolType, icon);
}

function FitViewToolIcon() {
  const svgFitToView = useStrataKitIcon("@stratakit/icons/fit-to-view.svg");

  return <StrataKitIcon href={svgFitToView} iconSpec={FitViewTool.iconSpec} />;
}

function WindowAreaToolIcon() {
  const svgWindowArea = useStrataKitIcon("@stratakit/icons/window-area.svg");

  return (
    <StrataKitIcon href={svgWindowArea} iconSpec={WindowAreaTool.iconSpec} />
  );
}

function ZoomViewToolIcon() {
  const svgSearch = useStrataKitIcon("@stratakit/icons/search.svg");

  return <StrataKitIcon href={svgSearch} iconSpec={ZoomViewTool.iconSpec} />;
}

function PanViewToolIcon() {
  const svgHand = useStrataKitIcon("@stratakit/icons/hand.svg");

  return <StrataKitIcon href={svgHand} iconSpec={PanViewTool.iconSpec} />;
}

function RotateViewIcon() {
  const viewport = useConditionalValue(getActiveViewport, [
    SyncUiEventId.ActiveContentChanged,
    SyncUiEventId.ActiveViewportChanged,
    SyncUiEventId.ViewStateChanged,
  ]);

  const svgRotateLeft = useStrataKitIcon("@stratakit/icons/rotate-left.svg");
  const svgRotatePoint = useStrataKitIcon("@stratakit/icons/rotate-point.svg");

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

function WalkViewToolIcon() {
  const svgWalk = useStrataKitIcon("@stratakit/icons/walk.svg");

  return <StrataKitIcon href={svgWalk} iconSpec={WalkViewTool.iconSpec} />;
}

function SelectionToolIcon() {
  const svgCursor = useStrataKitIcon("@stratakit/icons/cursor.svg");

  return <StrataKitIcon href={svgCursor} iconSpec={SelectionTool.iconSpec} />;
}

function ToggleCameraViewIcon() {
  const viewport = useConditionalValue(getActiveViewport, [
    SyncUiEventId.ActiveContentChanged,
    SyncUiEventId.ActiveViewportChanged,
    SyncUiEventId.ViewStateChanged,
  ]);

  const svgCameraVideo = useStrataKitIcon("@stratakit/icons/camera-video.svg");
  const svgCameraVideoDisabled = useStrataKitIcon(
    "@stratakit/icons/camera-video-disabled.svg"
  );

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

function FlyViewToolIcon() {
  const svgAirplane = useStrataKitIcon("@stratakit/icons/airplane.svg");

  return <StrataKitIcon href={svgAirplane} iconSpec={FlyViewTool.iconSpec} />;
}

function ViewUndoToolIcon() {
  const svgWindowBack = useStrataKitIcon("@stratakit/icons/window-back.svg");

  return (
    <StrataKitIcon href={svgWindowBack} iconSpec={ViewUndoTool.iconSpec} />
  );
}

function ViewRedoToolIcon() {
  const svgWindowForward = useStrataKitIcon(
    "@stratakit/icons/window-forward.svg"
  );

  return (
    <StrataKitIcon href={svgWindowForward} iconSpec={ViewRedoTool.iconSpec} />
  );
}

function MeasureDistanceToolIcon() {
  const svgMeasureDistance = useStrataKitIcon(
    "@stratakit/icons/measure-distance.svg"
  );

  return (
    <StrataKitIcon
      href={svgMeasureDistance}
      iconSpec={MeasureDistanceTool.iconSpec}
    />
  );
}

function MeasureLocationToolIcon() {
  const svgMeasureLocation = useStrataKitIcon(
    "@stratakit/icons/measure-location.svg"
  );

  return (
    <StrataKitIcon
      href={svgMeasureLocation}
      iconSpec={MeasureLocationTool.iconSpec}
    />
  );
}
