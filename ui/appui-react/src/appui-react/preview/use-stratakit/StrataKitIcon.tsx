/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Icon as IconSpecRenderer } from "@itwin/core-react";
import { StrataKitSymbol, usePreviewFeatures } from "../PreviewFeatures.js";

import type { IconSpec } from "@itwin/core-react";
import type { Icon } from "@stratakit/mui";

type IconProps = React.ComponentProps<typeof Icon>;

interface StrataKitIconProps extends Pick<IconProps, "size"> {
  href?: string;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  iconSpec?: IconSpec;
  iconNode?: React.ReactNode;
}

/**
 * Renders in following order based on what's available:
 * - StrataKit icon if `useStrataKit` preview feature is enabled and `href` is provided
 * - `iconNode` if provided
 * - Legacy icon using `iconSpec` if provided
 * @internal
 */
export function StrataKitIcon(props: StrataKitIconProps): React.ReactNode {
  const { href, iconSpec, iconNode, size } = props;
  const { useStrataKit } = usePreviewFeatures();

  const modules = useStrataKit?.[StrataKitSymbol]?.modules;
  const { Icon } = modules?.["@stratakit/mui"] ?? {};

  if (href && Icon) {
    return <Icon size={size} href={href} />;
  }

  if (iconNode) return iconNode;

  if (iconSpec) {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return <IconSpecRenderer iconSpec={iconSpec} />;
  }

  return undefined;
}
