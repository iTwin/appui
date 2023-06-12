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
import { useSelector } from "react-redux";
import { UiFramework } from "../UiFramework";
import type { FrameworkState } from "../redux/FrameworkState";

/**
 * SelectionInfo Status Field React component. This component is designed to be specified in a status bar definition.
 * It is used to display the number of items in a selection set.
 * This React component is Redux connected.
 * @note Use [[SelectionCountField]] to display custom selection count.
 * @public
 */
export function SelectionInfoField(props: CommonProps) {
  const count = useSelector((state: any) => {
    const frameworkState: FrameworkState | undefined =
      state[UiFramework.frameworkStateKey];
    if (!frameworkState) return 0;

    return frameworkState.sessionState.numItemsSelected;
  });
  return (
    <SelectionCountField
      className={props.className}
      style={props.style}
      count={count}
    />
  );
}
