/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { StrataKitSymbol, usePreviewFeatures } from "../PreviewFeatures.js";
import { webFontToStrataKitIcon } from "./webFontToStrataKitIcon.js";

import type { enable } from "../../../useStrataKit.js";

type UseStrataKit = ReturnType<typeof enable>;
type UseStrataKitModules = UseStrataKit[typeof StrataKitSymbol]["modules"];
type StrataKitIconModules = Omit<UseStrataKitModules, "@stratakit/mui">;
type StrataKitIconModule = keyof StrataKitIconModules;

/** @internal */
export function useStrataKitIcon(icon: StrataKitIconModule | undefined) {
  const { useStrataKit } = usePreviewFeatures();
  if (!useStrataKit) return undefined;
  if (!icon) return undefined;

  const modules = useStrataKit[StrataKitSymbol].modules;
  return modules[icon];
}

/** @internal */
export function useWebFontStrataKitIcon(webFontIcon: string | undefined) {
  const icon = webFontIcon ? webFontToStrataKitIcon[webFontIcon] : undefined;
  return useStrataKitIcon(icon);
}
