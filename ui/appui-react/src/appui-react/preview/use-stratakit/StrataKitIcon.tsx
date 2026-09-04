/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Icon as IconSpecRenderer } from "@itwin/core-react";
import { StrataKitSymbol, usePreviewFeatures } from "../PreviewFeatures.js";
import { useWebFontStrataKitIcon } from "./useStrataKitIcon.js";

import type { IconSpec } from "@itwin/core-react";
import type { Icon } from "@stratakit/mui";

type IconProps = React.ComponentProps<typeof Icon>;

interface StrataKitIconProps extends IconProps {
  href?: string;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  iconSpec?: IconSpec;
  iconNode?: React.ReactNode;
}

/**
 * Renders in following order based on what's available:
 * - StrataKit icon if `useStrataKit` preview feature
 * - `iconNode` if provided
 * - Legacy icon using `iconSpec` if provided
 *
 * StrataKit icon is resolved in order:
 * - `href` prop
 * - StrataKit icon resolved from web font mapping
 *
 * @internal
 */
export function StrataKitIcon(props: StrataKitIconProps): React.ReactNode {
  const { href: hrefProp, iconSpec, iconNode, size, ...rest } = props;

  const webFontIcon = typeof iconSpec === "string" ? iconSpec : undefined;
  const iconSpecHref = useWebFontStrataKitIcon(webFontIcon);

  const href = hrefProp ?? iconSpecHref;

  const { useStrataKit } = usePreviewFeatures();
  const modules = useStrataKit?.[StrataKitSymbol]?.modules;
  const { Icon } = modules?.["@stratakit/mui"] ?? {};

  if (href && Icon) {
    return <Icon {...rest} size={size} href={href} />;
  }

  if (iconNode) return iconNode;

  if (iconSpec) {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return <IconSpecRenderer iconSpec={iconSpec} />;
  }

  return undefined;
}
