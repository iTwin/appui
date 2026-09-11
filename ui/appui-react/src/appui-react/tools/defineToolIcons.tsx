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

  const module = is2d
    ? "@stratakit/icons/rotate-left.svg"
    : "@stratakit/icons/rotate-point.svg";
  const iconNode = is2d ? <SvgRotateLeft /> : <SvgGyroscope />;
  return <StrataKitIcon module={module} iconNode={iconNode} />;
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

  const module = cameraEnabled
    ? "@stratakit/icons/camera-video.svg"
    : "@stratakit/icons/camera-video-disabled.svg";
  const iconNode = cameraEnabled ? (
    <SvgCameraAnimation />
  ) : (
    <SvgCameraAnimationDisabled />
  );
  return (
    <StrataKitIcon
      module={module}
      iconNode={iconNode}
      iconSpec={ViewToggleCameraTool.iconSpec}
    />
  );
}
