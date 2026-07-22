/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { StrataKitSymbol, usePreviewFeatures } from "../PreviewFeatures.js";

import type { enable } from "../../../useStrataKit.js";

type UseStrataKit = ReturnType<typeof enable>;
type UseStrataKitModules = UseStrataKit[typeof StrataKitSymbol]["modules"];
type IconModules = Omit<UseStrataKitModules, "@stratakit/mui">;

/** @internal */
export function useStrataKitIcon(icon: keyof IconModules) {
  const { useStrataKit } = usePreviewFeatures();
  if (!useStrataKit) return undefined;

  const modules = useStrataKit[StrataKitSymbol].modules;
  return modules[icon];
}
