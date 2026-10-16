/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { Icon } from "@stratakit/mui";
import { ThemeBridgeContext } from "./ThemeBridge";

interface StrataKitIconProps {
  href: string;
  iconNode?: React.ReactNode;
}

export function StrataKitIcon(props: StrataKitIconProps) {
  const themeBridge = React.useContext(ThemeBridgeContext);
  const useStrataKit = themeBridge === "useStrataKit";
  if (!useStrataKit) {
    return props.iconNode ? <>{props.iconNode}</> : <SvgPlaceholder />;
  }

  return <Icon href={props.href} />;
}
