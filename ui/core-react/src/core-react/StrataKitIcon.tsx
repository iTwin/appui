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
export type StrataKitIconModule =
  | "@stratakit/icons/add.svg"
  | "@stratakit/icons/caret-down.svg"
  | "@stratakit/icons/caret-left.svg"
  | "@stratakit/icons/caret-right.svg"
  | "@stratakit/icons/caret-up.svg"
  | "@stratakit/icons/calendar.svg"
  | "@stratakit/icons/checkmark.svg"
  | "@stratakit/icons/chevron-down.svg"
  | "@stratakit/icons/chevron-left.svg"
  | "@stratakit/icons/chevron-right.svg"
  | "@stratakit/icons/delete.svg"
  | "@stratakit/icons/dismiss.svg"
  | "@stratakit/icons/help.svg"
  | "@stratakit/icons/info.svg"
  | "@stratakit/icons/loop.svg"
  | "@stratakit/icons/moon.svg"
  | "@stratakit/icons/pause.svg"
  | "@stratakit/icons/placeholder.svg"
  | "@stratakit/icons/play.svg"
  | "@stratakit/icons/rotate-left.svg"
  | "@stratakit/icons/search.svg"
  | "@stratakit/icons/settings.svg"
  | "@stratakit/icons/sort-descending.svg"
  | "@stratakit/icons/status-error.svg"
  | "@stratakit/icons/status-rejected.svg"
  | "@stratakit/icons/status-success.svg"
  | "@stratakit/icons/status-warning.svg"
  | "@stratakit/icons/sun.svg";

interface StrataKitIconProps extends React.ComponentProps<"svg"> {
  /** `href` is resolved from the specified StrataKit icon module. */
  module?: StrataKitIconModule;
  iconNode?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  iconSpec?: IconSpec;
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
