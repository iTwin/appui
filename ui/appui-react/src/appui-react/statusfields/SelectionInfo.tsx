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
import { useFrameworkState } from "../uistate/useFrameworkState";

/** `SelectionInfoField` component is designed to be specified in a status bar.
 * It is used to display the number of items in a selection set.
 * @note Use [[SelectionCountField]] to display custom selection count.
 * @note Requires redux provider.
 * @public
 * @deprecated in 4.14.x. Use {@link SelectionCountField} instead.
 */
export function SelectionInfoField(props: CommonProps) {
  const frameworkState = useFrameworkState();
  const numItemsSelected = frameworkState
    ? frameworkState.session.numItemsSelected
    : 0;
  return (
    <SelectionCountField
      className={props.className}
      style={props.style}
      count={numItemsSelected}
    />
  );
}
