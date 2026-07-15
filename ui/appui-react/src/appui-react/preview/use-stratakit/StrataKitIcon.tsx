/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";
import { Icon as IconSpecRenderer } from "@itwin/core-react";
import { usePreviewFeatures } from "../PreviewFeatures.js";
import { Icon } from "@stratakit/foundations";

import type { IconSpec } from "@itwin/core-react";

interface StrataKitIconProps {
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  iconSpec: IconSpec;
}

/** Renders the StrataKit icon if `useStrataKit` preview feature is enabled, otherwise renders the legacy icon.
 * @internal
 */
export function StrataKitIcon(props: StrataKitIconProps) {
  const { href, iconSpec } = props;
  const { useStrataKit } = usePreviewFeatures();
  if (useStrataKit) {
    return <Icon href={href} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return <IconSpecRenderer iconSpec={iconSpec} />;
}
