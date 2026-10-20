/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { PreviewFeaturesContext } from "../providers/PreviewFeaturesToggleProvider.js";
import { Icon } from "@stratakit/mui";

interface StrataKitIconProps {
  href: string;
  iconNode?: React.ReactNode;
}

export function StrataKitIcon(props: StrataKitIconProps) {
  const strataKit = useStrataKit();
  if (strataKit) {
    return <Icon href={props.href} />;
  }

  return <>{props.iconNode}</>;
}

function useStrataKit() {
  const [features] = React.useContext(PreviewFeaturesContext) ?? [];
  return !!features?.useStrataKit;
}
