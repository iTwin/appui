/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Icon } from "@stratakit/mui";
import svgAdd from "@stratakit/icons/add.svg";
import svgAirplane from "@stratakit/icons/airplane.svg";
import svgCameraVideo from "@stratakit/icons/camera-video.svg";
import svgCameraVideoDisabled from "@stratakit/icons/camera-video-disabled.svg";
import svgChat from "@stratakit/icons/chat.svg";
import svgCheckmark from "@stratakit/icons/checkmark.svg";
import svgChevronDown from "@stratakit/icons/chevron-down.svg";
import svgChevronLeft from "@stratakit/icons/chevron-left.svg";
import svgChevronRight from "@stratakit/icons/chevron-right.svg";
import svgCursor from "@stratakit/icons/cursor.svg";
import svgCursorClick from "@stratakit/icons/cursor-click.svg";
import svgDismiss from "@stratakit/icons/dismiss.svg";
import svgDockBottom from "@stratakit/icons/dock-bottom.svg";
import svgDockLeft from "@stratakit/icons/dock-left.svg";
import svgDockRight from "@stratakit/icons/dock-right.svg";
import svgDockTop from "@stratakit/icons/dock-top.svg";
import svgDocument from "@stratakit/icons/document.svg";
import svgDragHandleVertical from "@stratakit/icons/drag-handle-vertical.svg";
import svgFitToView from "@stratakit/icons/fit-to-view.svg";
import svgGestureOneFingerDrag from "@stratakit/icons/gesture-one-finger-drag.svg";
import svgGestureOneFingerTap from "@stratakit/icons/gesture-one-finger-tap.svg";
import svgGestureOneFingerDoubleTap from "@stratakit/icons/gesture-one-finger-double-tap.svg";
import svgGesturePinch from "@stratakit/icons/gesture-pinch.svg";
import svgGestureTwoFingerDrag from "@stratakit/icons/gesture-two-finger-drag.svg";
import svgGestureTwoFingerTap from "@stratakit/icons/gesture-two-finger-tap.svg";
import svgHand from "@stratakit/icons/hand.svg";
import svgHome from "@stratakit/icons/home.svg";
import svgInfo from "@stratakit/icons/info.svg";
import svgIsolate from "@stratakit/icons/isolate.svg";
import svgKeyboard from "@stratakit/icons/keyboard.svg";
import svgList from "@stratakit/icons/list.svg";
import svgLock from "@stratakit/icons/lock.svg";
import svgLockUnlocked from "@stratakit/icons/lock-unlocked.svg";
import svgMeasure from "@stratakit/icons/measure.svg";
import svgMeasureDistance from "@stratakit/icons/measure-distance.svg";
import svgMeasureLocation from "@stratakit/icons/measure-location.svg";
import svgMore from "@stratakit/icons/more-horizontal.svg";
import svgMoreVertical from "@stratakit/icons/more-vertical.svg";
import svgMouseClickLeft from "@stratakit/icons/mouse-click-left.svg";
import svgMouseClickRight from "@stratakit/icons/mouse-click-right.svg";
import svgMouseClickMiddle from "@stratakit/icons/mouse-click-middle.svg";
import svgPin from "@stratakit/icons/pin.svg";
import svgPinUnpin from "@stratakit/icons/pin-unpin.svg";
import svgPlaceholder from "@stratakit/icons/placeholder.svg";
import svgRotateLeft from "@stratakit/icons/rotate-left.svg";
import svgRotatePoint from "@stratakit/icons/rotate-point.svg";
import svgSearch from "@stratakit/icons/search.svg";
import svgSelectionClear from "@stratakit/icons/selection-clear.svg";
import svgSettings from "@stratakit/icons/settings.svg";
import svgStatusError from "@stratakit/icons/status-error.svg";
import svgStatusSuccess from "@stratakit/icons/status-success.svg";
import svgStatusWarning from "@stratakit/icons/status-warning.svg";
import svgVisibilityHide from "@stratakit/icons/visibility-hide.svg";
import svgVisibilityPartial from "@stratakit/icons/visibility-partial.svg";
import svgVisibilityShow from "@stratakit/icons/visibility-show.svg";
import svgWalk from "@stratakit/icons/walk.svg";
import svgWindowArea from "@stratakit/icons/window-area.svg";
import svgWindowBack from "@stratakit/icons/window-back.svg";
import svgWindowForward from "@stratakit/icons/window-forward.svg";
import svgWindowMaximize from "@stratakit/icons/window-maximize.svg";
import svgWindowMinimize from "@stratakit/icons/window-minimize.svg";
import svgWindowPopout from "@stratakit/icons/window-popout.svg";
import svgWindowSettings from "@stratakit/icons/window-settings.svg";
import { StrataKitSymbol } from "./appui-react/preview/PreviewFeatures.js";

/** @public */
export function enable() {
  const modules = {
    "@stratakit/mui": {
      // 'IconProps' from external module cannot be named. ts(4058)
      Icon: Icon as unknown as typeof Icon,
    },
    "@stratakit/icons/airplane.svg": svgAirplane,
    "@stratakit/icons/add.svg": svgAdd,
    "@stratakit/icons/camera-video.svg": svgCameraVideo,
    "@stratakit/icons/camera-video-disabled.svg": svgCameraVideoDisabled,
    "@stratakit/icons/chat.svg": svgChat,
    "@stratakit/icons/checkmark.svg": svgCheckmark,
    "@stratakit/icons/chevron-down.svg": svgChevronDown,
    "@stratakit/icons/chevron-left.svg": svgChevronLeft,
    "@stratakit/icons/chevron-right.svg": svgChevronRight,
    "@stratakit/icons/cursor.svg": svgCursor,
    "@stratakit/icons/cursor-click.svg": svgCursorClick,
    "@stratakit/icons/dismiss.svg": svgDismiss,
    "@stratakit/icons/dock-bottom.svg": svgDockBottom,
    "@stratakit/icons/dock-left.svg": svgDockLeft,
    "@stratakit/icons/dock-right.svg": svgDockRight,
    "@stratakit/icons/dock-top.svg": svgDockTop,
    "@stratakit/icons/document.svg": svgDocument,
    "@stratakit/icons/drag-handle-vertical.svg": svgDragHandleVertical,
    "@stratakit/icons/fit-to-view.svg": svgFitToView,
    "@stratakit/icons/gesture-one-finger-drag.svg": svgGestureOneFingerDrag,
    "@stratakit/icons/gesture-one-finger-tap.svg": svgGestureOneFingerTap,
    "@stratakit/icons/gesture-one-finger-double-tap.svg":
      svgGestureOneFingerDoubleTap,
    "@stratakit/icons/gesture-pinch.svg": svgGesturePinch,
    "@stratakit/icons/gesture-two-finger-drag.svg": svgGestureTwoFingerDrag,
    "@stratakit/icons/gesture-two-finger-tap.svg": svgGestureTwoFingerTap,
    "@stratakit/icons/hand.svg": svgHand,
    "@stratakit/icons/home.svg": svgHome,
    "@stratakit/icons/info.svg": svgInfo,
    "@stratakit/icons/isolate.svg": svgIsolate,
    "@stratakit/icons/keyboard.svg": svgKeyboard,
    "@stratakit/icons/list.svg": svgList,
    "@stratakit/icons/lock.svg": svgLock,
    "@stratakit/icons/lock-unlocked.svg": svgLockUnlocked,
    "@stratakit/icons/measure.svg": svgMeasure,
    "@stratakit/icons/measure-distance.svg": svgMeasureDistance,
    "@stratakit/icons/measure-location.svg": svgMeasureLocation,
    "@stratakit/icons/more-horizontal.svg": svgMore,
    "@stratakit/icons/more-vertical.svg": svgMoreVertical,
    "@stratakit/icons/mouse-click-left.svg": svgMouseClickLeft,
    "@stratakit/icons/mouse-click-right.svg": svgMouseClickRight,
    "@stratakit/icons/mouse-click-middle.svg": svgMouseClickMiddle,
    "@stratakit/icons/pin.svg": svgPin,
    "@stratakit/icons/pin-unpin.svg": svgPinUnpin,
    "@stratakit/icons/placeholder.svg": svgPlaceholder,
    "@stratakit/icons/rotate-left.svg": svgRotateLeft,
    "@stratakit/icons/rotate-point.svg": svgRotatePoint,
    "@stratakit/icons/search.svg": svgSearch,
    "@stratakit/icons/selection-clear.svg": svgSelectionClear,
    "@stratakit/icons/settings.svg": svgSettings,
    "@stratakit/icons/status-error.svg": svgStatusError,
    "@stratakit/icons/status-success.svg": svgStatusSuccess,
    "@stratakit/icons/status-warning.svg": svgStatusWarning,
    "@stratakit/icons/visibility-hide.svg": svgVisibilityHide,
    "@stratakit/icons/visibility-partial.svg": svgVisibilityPartial,
    "@stratakit/icons/visibility-show.svg": svgVisibilityShow,
    "@stratakit/icons/walk.svg": svgWalk,
    "@stratakit/icons/window-area.svg": svgWindowArea,
    "@stratakit/icons/window-back.svg": svgWindowBack,
    "@stratakit/icons/window-forward.svg": svgWindowForward,
    "@stratakit/icons/window-maximize.svg": svgWindowMaximize,
    "@stratakit/icons/window-minimize.svg": svgWindowMinimize,
    "@stratakit/icons/window-popout.svg": svgWindowPopout,
    "@stratakit/icons/window-settings.svg": svgWindowSettings,
  } as const;
  return {
    [StrataKitSymbol]: {
      modules,
    },
  };
}
