/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Icon as IconSpecRenderer } from "@itwin/core-react";
import type { StrataKitIcon as CoreStrataKitIcon } from "@itwin/core-react/internal";
import type { Icon } from "@stratakit/mui";
import { StrataKitSymbol, usePreviewFeatures } from "../PreviewFeatures.js";
import { webFontToStrataKitIcon } from "./webFontToStrataKitIcon.js";
import { useStrataKitIcon } from "./useStrataKitIcon.js";

type IconProps = React.ComponentProps<typeof Icon>;

type CoreStrataKitIconProps = React.ComponentProps<typeof CoreStrataKitIcon>;

interface StrataKitIconProps
  extends CoreStrataKitIconProps,
    Pick<IconProps, "href" | "size"> {}

/**
 * Renders in following order based on what's available:
 * - StrataKit icon if `useStrataKit` preview feature
 * - `iconNode` if provided
 * - Legacy icon using `iconSpec` if provided
 *
 * StrataKit icon is resolved in order:
 * - `href` prop
 * - `module` prop
 * - `iconSpec` prop resolved via web font mapping
 *
 * @internal
 */
export function StrataKitIcon(props: StrataKitIconProps): React.ReactNode {
  const { href: hrefProp, module, iconSpec, iconNode, size, ...rest } = props;

  const moduleHref = useStrataKitIcon(module);

  const webFontIcon = typeof iconSpec === "string" ? iconSpec : undefined;
  const iconSpecHref = useWebFontStrataKitIcon(webFontIcon);

  const href = hrefProp ?? moduleHref ?? iconSpecHref;

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

function useWebFontStrataKitIcon(webFontIcon: string | undefined) {
  const icon = webFontIcon ? webFontToStrataKitIcon[webFontIcon] : undefined;
  return useStrataKitIcon(icon);
}
