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
}

export function StrataKitIcon(props: StrataKitIconProps) {
  const themeBridge = React.useContext(ThemeBridgeContext);
  if (!themeBridge) {
    return <SvgPlaceholder />;
  }

  return <Icon href={props.href} />;
}
