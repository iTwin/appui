/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Hooks
 */

import { useEffect, useState } from "react";
import { UiFramework } from "../UiFramework.js";

/** React hook that maintains the active stage Id.
 * @public
 */
export function useActiveStageId(): string {
  const [activeStageId, setActiveStageId] = useState(
    UiFramework.frontstages.activeFrontstageId
  );
  useEffect(() => {
    return UiFramework.frontstages.onFrontstageActivatedEvent.addListener(
      (args) => {
        setActiveStageId(args.activatedFrontstageDef.id);
      }
    );
  }, []);
  return activeStageId;
}
