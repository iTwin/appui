/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
export { Badge } from "./core-react/badge/Badge.js";
export { BadgeKind } from "./core-react/badge/BadgeType.js";

export {
  isNavigationKey,
  ItemKeyboardNavigator,
} from "./core-react/focus/ItemKeyboardNavigator.js";
export {
  focusIntoContainer,
  FocusTrap,
} from "./core-react/focustrap/FocusTrap.js";

export { usePackageTranslation } from "./core-react/l10n/usePackageTranslation.js";

export { PopupContext } from "./core-react/popup/Popup.js";

export {
  TOOLBAR_BACKDROP_FILTER_BLUR_DEFAULT,
  TOOLBAR_BOX_SHADOW_OPACITY_DEFAULT,
  TOOLBAR_OPACITY_DEFAULT,
  calculateBackdropFilterBlur,
  calculateBoxShadowOpacity,
  calculateToolbarOpacity,
  getToolbarBackdropFilter,
  getToolbarBackgroundColor,
  getToolbarBoxShadow,
} from "./core-react/utils/hooks/useProximityToMouse.js";
export { useRefEffect } from "./core-react/utils/hooks/useRefEffect.js";
export { useRefs } from "./core-react/utils/hooks/useRefs.js";
export { useRefState } from "./core-react/utils/hooks/useRefState.js";
export {
  useProximityToMouse,
  WidgetElementSet,
} from "./core-react/utils/hooks/useProximityToMouse.js";
export { useResizeObserver } from "./core-react/utils/hooks/useResizeObserver.js";
export { useTargeted } from "./core-react/utils/hooks/useTargeted.js";
export {
  useWidgetOpacityContext,
  WidgetOpacityContext,
} from "./core-react/utils/hooks/useWidgetOpacityContext.js";

export { ListenerType } from "./core-react/utils/ListenerType.js";
export { Point } from "./core-react/utils/Point.js";
export { Rectangle } from "./core-react/utils/Rectangle.js";
