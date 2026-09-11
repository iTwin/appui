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

import type { enable } from "../../../useStrataKit.js";

type IconProps = React.ComponentProps<typeof Icon>;

type CoreStrataKitIconProps = React.ComponentProps<typeof CoreStrataKitIcon>;

type UseStrataKit = ReturnType<typeof enable>;
type UseStrataKitModules = UseStrataKit[typeof StrataKitSymbol]["modules"];
type StrataKitIconModules = Omit<UseStrataKitModules, "@stratakit/mui">;
type StrataKitIconModule = keyof StrataKitIconModules;

interface StrataKitIconProps
  extends Omit<CoreStrataKitIconProps, "href" | "module">,
    Pick<IconProps, "size"> {
  module?: StrataKitIconModule;
}

/**
 * Renders in following order based on what's available:
 * - Resolved StrataKit icon when `useStrataKit` preview feature is enabled
 * - `iconNode` if provided
 * - Legacy icon if `iconSpec` is provided
 *
 * StrataKit icon is resolved in order:
 * - `module` prop
 * - `iconSpec` prop used as a key in web font mapping
 *
 * @internal
 */
export function StrataKitIcon(props: StrataKitIconProps): React.ReactNode {
  const { module: moduleProp, iconSpec, iconNode, size, ...rest } = props;

  const webFontIcon = typeof iconSpec === "string" ? iconSpec : undefined;
  const iconSpecModule = useWebFontStrataKitModule(webFontIcon);

  const href = useStrataKitIcon(moduleProp ?? iconSpecModule);

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

function useStrataKitIcon(icon: StrataKitIconModule | undefined) {
  const { useStrataKit } = usePreviewFeatures();
  if (!useStrataKit) return undefined;
  if (!icon) return undefined;

  const modules = useStrataKit[StrataKitSymbol].modules;
  return modules[icon];
}

function useWebFontStrataKitModule(webFontIcon: string | undefined) {
  return webFontIcon ? webFontToStrataKitIcon[webFontIcon] : undefined;
}
