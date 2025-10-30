/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { PreviewFeatures } from "../PreviewFeatures.js";
import { usePreviewFeatures } from "../PreviewFeatures.js";

type UseStrataKitType = NonNullable<PreviewFeatures["useStrataKit"]>;
type UseStrataKitFlags = Exclude<UseStrataKitType, boolean>;
type UseStrataKitFlagKeys = keyof UseStrataKitFlags;

/** @internal */
export function useStrataKit(flag: UseStrataKitFlagKeys): boolean {
  const { useStrataKit: useStrataKitFeature } = usePreviewFeatures();
  if (typeof useStrataKitFeature === "object") {
    return !!useStrataKitFeature[flag];
  }
  return !!useStrataKitFeature;
}
