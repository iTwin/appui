/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Icon as IconSpecRenderer } from "@itwin/core-react";
import type { StrataKitIcon as CoreStrataKitIcon } from "@itwin/core-react/internal";
import { StrataKitSymbol, usePreviewFeatures } from "../PreviewFeatures.js";
import { webFontToStrataKitIcon } from "./webFontToStrataKitIcon.js";
import type { StrataKitIconModules } from "./StrataKitIconModules.js";

type CoreStrataKitIconProps = React.ComponentProps<typeof CoreStrataKitIcon>;

interface StrataKitIconProps
  extends Omit<CoreStrataKitIconProps, "href" | "module"> {
  /**
   * Function to resolve the href for the StrataKit icon.
   * `importIcon` argument is used to look up the StrataKit icon module exposed via `useStrataKit` subpath export.
   */
  href?: (
    importIcon: <M extends keyof StrataKitIconModules>(
      path: M
    ) => StrataKitIconModules[M]
  ) => string | undefined;
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
  const { href: hrefProp, iconSpec, iconNode, size, ...rest } = props;

  const { useStrataKit } = usePreviewFeatures();
  const modules = useStrataKit?.[StrataKitSymbol]?.modules;
  const { Icon } = modules?.["@stratakit/mui"] ?? {};

  const webFontIcon = typeof iconSpec === "string" ? iconSpec : undefined;
  const iconSpecHref = useWebFontStrataKitHref(webFontIcon);

  const href = React.useMemo(() => {
    const newHref =
      hrefProp && modules
        ? hrefProp((module) => {
            return modules[module];
          })
        : undefined;
    return newHref ?? iconSpecHref;
  }, [hrefProp, modules, iconSpecHref]);

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

function useWebFontStrataKitHref(webFontIcon: string | undefined) {
  const { useStrataKit } = usePreviewFeatures();
  const modules = useStrataKit?.[StrataKitSymbol]?.modules;
  if (!modules) return undefined;

  if (!webFontIcon) return undefined;
  const getHref = webFontToStrataKitIcon[webFontIcon];
  if (!getHref) return undefined;

  return getHref((module) => {
    return modules[module];
  });
}
