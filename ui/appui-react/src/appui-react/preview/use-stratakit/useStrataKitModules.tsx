/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { StrataKitSymbol, usePreviewFeatures } from "../PreviewFeatures.js";

import type { enable } from "../../../useStrataKit.js";

type Modules = ReturnType<typeof enable>[typeof StrataKitSymbol]["modules"];

/** @internal */
export function useStrataKitModules(): Modules | undefined {
  const { useStrataKit } = usePreviewFeatures();
  if (!useStrataKit) return undefined;

  return useStrataKit[StrataKitSymbol].modules;
}
