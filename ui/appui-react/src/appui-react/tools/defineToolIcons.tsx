/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { RotateViewTool, ViewToggleCameraTool } from "@itwin/core-frontend";
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

import type { ToolType } from "@itwin/core-frontend";

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

  return is2d ? <SvgRotateLeft /> : <SvgGyroscope />;
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

  return cameraEnabled ? (
    <SvgCameraAnimation />
  ) : (
    <SvgCameraAnimationDisabled />
  );
}
