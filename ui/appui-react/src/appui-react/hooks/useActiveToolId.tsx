/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Hooks
 */

import * as React from "react";
import { UiFramework } from "../UiFramework";

/** @internal */
export function useActiveToolId() {
  const [toolId, setToolId] = React.useState(
    UiFramework.frontstages.activeToolId
  );
  React.useEffect(() => {
    return UiFramework.frontstages.onToolActivatedEvent.addListener((args) => {
      setToolId(args.toolId);
    });
  }, []);
  return toolId;
}
