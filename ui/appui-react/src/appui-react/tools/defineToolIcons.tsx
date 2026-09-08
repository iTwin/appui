/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { RotateViewTool, ViewToggleCameraTool } from "@itwin/core-frontend";
import type { ToolType } from "@itwin/core-frontend";
import { ToolUtilities } from "@itwin/imodel-components-react";
import {
  SvgCameraAnimation,
  SvgCameraAnimationDisabled,
  SvgRotateLeft,
} from "@itwin/itwinui-icons-react";
import { useConditionalValue } from "../hooks/useConditionalValue.js";
import { getActiveViewport } from "../utils/getActiveViewport.js";
import { SyncUiEventId } from "../syncui/UiSyncEvent.js";
import { SvgGyroscope } from "../icons/SvgGyroscope.js";
import { StrataKitIcon } from "../preview/use-stratakit/StrataKitIcon.js";
import { useStrataKitIcon } from "../preview/use-stratakit/useStrataKitIcon.js";

/** @internal */
export function defineToolIcons() {
  defineIcon(RotateViewTool, <RotateViewIcon />);
  defineIcon(ViewToggleCameraTool, <ToggleCameraViewIcon />);
}

function defineIcon(toolType: ToolType, icon: React.ReactElement) {
  if (ToolUtilities.isWithIcon(toolType)) return;
  ToolUtilities.defineIcon(toolType, icon);
}

function RotateViewIcon() {
  const is2d = useConditionalValue(() => {
    const viewport = getActiveViewport();
    return viewport?.view.is2d() ?? false;
  }, [
    SyncUiEventId.ActiveContentChanged,
    SyncUiEventId.ActiveViewportChanged,
    SyncUiEventId.ViewStateChanged,
  ]);

  const svgRotateLeft = useStrataKitIcon("@stratakit/icons/rotate-left.svg");
  const svgRotatePoint = useStrataKitIcon("@stratakit/icons/rotate-point.svg");

  const icon = is2d ? svgRotateLeft : svgRotatePoint;
  const iconNode = is2d ? <SvgRotateLeft /> : <SvgGyroscope />;
  return <StrataKitIcon href={icon} iconNode={iconNode} />;
}

function ToggleCameraViewIcon() {
  const cameraEnabled = useConditionalValue(() => {
    const viewport = getActiveViewport();
    return viewport?.view.is3d() && viewport?.isCameraOn;
  }, [
    SyncUiEventId.ActiveContentChanged,
    SyncUiEventId.ActiveViewportChanged,
    SyncUiEventId.ViewStateChanged,
  ]);

  const svgCameraVideo = useStrataKitIcon("@stratakit/icons/camera-video.svg");
  const svgCameraVideoDisabled = useStrataKitIcon(
    "@stratakit/icons/camera-video-disabled.svg"
  );

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
