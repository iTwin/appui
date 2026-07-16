/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Icon as IconSpecRenderer } from "@itwin/core-react";
import { usePreviewFeatures } from "../PreviewFeatures.js";
import { Icon } from "@stratakit/foundations";

import type { IconSpec } from "@itwin/core-react";
import { useDefaultExport } from "../../hooks/useDefaultExport.js";

interface StrataKitIconProps {
  href?: string | (() => Promise<{ default: string }>);
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
  const { href: hrefProp, iconSpec, iconNode } = props;
  const { useStrataKit } = usePreviewFeatures();

  const loadHref = typeof hrefProp === "function" && useStrataKit;
  const hrefExport = useDefaultExport(loadHref ? hrefProp : undefined);

  const href = typeof hrefProp === "string" ? hrefProp : hrefExport;

  if (useStrataKit && href) {
    return <Icon href={href} />;
  }

  if (iconNode) return iconNode;

  if (iconSpec) {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return <IconSpecRenderer iconSpec={iconSpec} />;
  }

  return undefined;
}
