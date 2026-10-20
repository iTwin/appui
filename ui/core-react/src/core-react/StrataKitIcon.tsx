/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Icon } from "./icons/IconComponent.js";
import type { IconSpec } from "./icons/IconComponent.js";

/**
 * StrataKit icon modules are setup via `@itwin/appui-react/useStrataKit`. Modules are later used by `StrataKitIcon` component.
 * This context enables usage of `StrataKitIcon` component of `@appui-react` in its dependencies.
 * @internal
 */
export const StrataKitIconContext = React.createContext<
  React.ComponentType<StrataKitIconProps> | undefined
>(undefined);

/** @internal */
export interface StrataKitIconModules {
  "@stratakit/icons/add": Record<"svgAdd", string>;
  "@stratakit/icons/caret-down": Record<"svgCaretDown", string>;
  "@stratakit/icons/caret-left": Record<"svgCaretLeft", string>;
  "@stratakit/icons/caret-right": Record<"svgCaretRight", string>;
  "@stratakit/icons/caret-up": Record<"svgCaretUp", string>;
  "@stratakit/icons/calendar": Record<"svgCalendar", string>;
  "@stratakit/icons/checkmark": Record<"svgCheckmark", string>;
  "@stratakit/icons/chevron-down": Record<"svgChevronDown", string>;
  "@stratakit/icons/chevron-left": Record<"svgChevronLeft", string>;
  "@stratakit/icons/chevron-right": Record<"svgChevronRight", string>;
  "@stratakit/icons/delete": Record<"svgDelete", string>;
  "@stratakit/icons/dismiss": Record<"svgDismiss", string>;
  "@stratakit/icons/help": Record<"svgHelp" | "svgHelpLarge", string>;
  "@stratakit/icons/info": Record<"svgInfo" | "svgInfoLarge", string>;
  "@stratakit/icons/loop": Record<"svgLoop", string>;
  "@stratakit/icons/moon": Record<"svgMoon", string>;
  "@stratakit/icons/pause": Record<"svgPause", string>;
  "@stratakit/icons/placeholder": Record<"svgPlaceholder", string>;
  "@stratakit/icons/play": Record<"svgPlay", string>;
  "@stratakit/icons/rotate-left": Record<"svgRotateLeft", string>;
  "@stratakit/icons/search": Record<"svgSearch", string>;
  "@stratakit/icons/settings": Record<"svgSettings", string>;
  "@stratakit/icons/sort-descending": Record<"svgSortDescending", string>;
  "@stratakit/icons/status-error": Record<
    "svgStatusError" | "svgStatusErrorLarge",
    string
  >;
  "@stratakit/icons/status-rejected": Record<
    "svgStatusRejected" | "svgStatusRejectedLarge",
    string
  >;
  "@stratakit/icons/status-success": Record<
    "svgStatusSuccess" | "svgStatusSuccessLarge",
    string
  >;
  "@stratakit/icons/status-warning": Record<
    "svgStatusWarning" | "svgStatusWarningLarge",
    string
  >;
  "@stratakit/icons/sun": Record<"svgSun", string>;
}

interface StrataKitIconProps extends Omit<React.ComponentProps<"svg">, "href"> {
  /**
   * Function to resolve the href for the StrataKit icon.
   * `importIcon` argument is used to look up the StrataKit icon module exposed via `useStrataKit` subpath export.
   */
  href?: (
    importIcon: <M extends keyof StrataKitIconModules>(
      path: M
    ) => StrataKitIconModules[M]
  ) => string | undefined;
  iconNode?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  iconSpec?: IconSpec;
  size?: "regular" | "large";
}

/** @internal */
export function StrataKitIcon(props: StrataKitIconProps) {
  const StrataKitIconComponent = React.useContext(StrataKitIconContext);
  if (StrataKitIconComponent) {
    return <StrataKitIconComponent {...props} />;
  }

  if (props.iconNode) {
    return <>{props.iconNode}</>;
  }

  if (props.iconSpec) {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return <Icon iconSpec={props.iconSpec} />;
  }

  return undefined;
}
