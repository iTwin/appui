/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Hooks
 */

import { useEffect, useState } from "react";
import type { UiVisibilityEventArgs } from "../UiFramework";
import { UiFramework } from "../UiFramework";

/** @internal */
export function useUiVisibility() {
  const [uiIsVisible, setUiIsVisible] = useState(UiFramework.getIsUiVisible());
  useEffect(() => {
    // eslint-disable-next-line deprecation/deprecation
    const handleUiVisibilityChanged = (args: UiVisibilityEventArgs): void =>
      setUiIsVisible(args.visible);
    UiFramework.onUiVisibilityChanged.addListener(handleUiVisibilityChanged);
    return () => {
      UiFramework.onUiVisibilityChanged.removeListener(
        handleUiVisibilityChanged
      );
    };
  }, []);
  return uiIsVisible;
}
