/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { SelectionCountField } from "./SelectionCount";
import { useReduxFrameworkState } from "../uistate/useReduxFrameworkState";

/** `SelectionInfoField` component is designed to be specified in a status bar.
 * It is used to display the number of items in a selection set.
 * @note Requires redux provider.
 * @public
 * @deprecated in 4.15.0. Use {@link SelectionCountField} instead.
 */
// eslint-disable-next-line deprecation/deprecation
export function SelectionInfoField(props: CommonProps) {
  const numItemsSelected = useReduxFrameworkState(
    // eslint-disable-next-line deprecation/deprecation
    (state) => state?.sessionState.numItemsSelected ?? 0
  );
  return (
    <SelectionCountField
      className={props.className}
      style={props.style}
      count={numItemsSelected}
    />
  );
}
