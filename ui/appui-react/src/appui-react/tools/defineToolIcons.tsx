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

  const iconNode = is2d ? <SvgRotateLeft /> : <SvgGyroscope />;
  return (
    <StrataKitIcon
      href={(importIcon) => {
        const { svgRotateLeft } = importIcon("@stratakit/icons/rotate-left");
        const { svgRotatePoint } = importIcon("@stratakit/icons/rotate-point");
        return is2d ? svgRotateLeft : svgRotatePoint;
      }}
      iconNode={iconNode}
    />
  );
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

  const href: React.ComponentProps<typeof StrataKitIcon>["href"] = cameraEnabled
    ? (importIcon) => importIcon("@stratakit/icons/camera-video").svgCameraVideo
    : (importIcon) =>
        importIcon("@stratakit/icons/camera-video-disabled")
          .svgCameraVideoDisabled;
  const iconNode = cameraEnabled ? (
    <SvgCameraAnimation />
  ) : (
    <SvgCameraAnimationDisabled />
  );
  return (
    <StrataKitIcon
      href={href}
      iconNode={iconNode}
      iconSpec={ViewToggleCameraTool.iconSpec}
    />
  );
}
