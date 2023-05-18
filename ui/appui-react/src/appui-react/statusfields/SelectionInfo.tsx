/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import type { IModelConnection } from "@itwin/core-frontend";
import { SelectionCountField } from "./SelectionCount";
import { useActiveIModelConnection } from "../hooks/useActiveIModelConnection";

/** Arguments for [[useSelectionSetSize]] hook.
 * @beta
 */
export interface UseSelectionSetSizeArgs {
  iModel: IModelConnection | undefined;
}

/** React hook that returns element count of a selection set.
 * @beta
 */
export function useSelectionSetSize(args: UseSelectionSetSizeArgs): number {
  const [size, setSize] = React.useState(0);
  const { iModel } = args;
  React.useEffect(() => {
    if (!iModel) {
      setSize(0);
      return;
    }
    setSize(iModel.selectionSet.size);
  }, [iModel]);
  React.useEffect(() => {
    if (!iModel)
      return;
    return iModel.selectionSet.onChanged.addListener((ev) => {
      setSize(ev.set.size);
    });
  }, [iModel]);
  return size;
}

/**
 * SelectionInfo Status Field React component. This component is designed to be specified in a status bar definition.
 * It is used to display the number of selected items based on the Presentation Rules Selection Manager.
 * This React component is Redux connected.
 * @public
 * @deprecated in 4.0. Use [[SelectionCountField]] with [[useSelectionSetSize]] instead.
 */
export function SelectionInfoField(props: CommonProps) {
  const iModel = useActiveIModelConnection();
  const count = useSelectionSetSize({ iModel });
  return (
    <SelectionCountField
      className={props.className}
      style={props.style}
      count={count}
    />
  );
}
