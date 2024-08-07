/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Hooks
 */

import { useEffect, useState } from "react";
import { UiFramework } from "../UiFramework";

/** @internal */
export function useUiVisibility() {
  const [uiIsVisible, setUiIsVisible] = useState(UiFramework.getIsUiVisible());
  useEffect(() => {
    return UiFramework.onUiVisibilityChanged.addListener((args) => {
      setUiIsVisible(args.visible);
    });
  }, []);
  return uiIsVisible;
}
