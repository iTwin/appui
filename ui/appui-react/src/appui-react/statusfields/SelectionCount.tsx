/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import type { IModelConnection } from "@itwin/core-frontend";
import type { CommonProps } from "@itwin/core-react";
import { Icon } from "@itwin/core-react";
import { SvgCursor } from "@itwin/itwinui-icons-react";
import classnames from "classnames";
import { StatusBarCornerComponentContext } from "../statusbar/StatusBarCornerComponentContext";
import "./SelectionCount.scss";

/** Properties for the [[SelectionCountField]] component.
 * @beta
 */
// eslint-disable-next-line deprecation/deprecation
export interface SelectionCountFieldProps extends CommonProps {
  count: number;
}

/** Status field component used to display the number of selected items.
 * @note Use [[useSelectionSetSize]] hook to get the selection count.
 * @beta
 */
export function SelectionCountField(props: SelectionCountFieldProps) {
  const cornerContext = React.useContext(StatusBarCornerComponentContext);
  const className = classnames(
    "uifw-statusFields-selectionCount",
    cornerContext === "left-corner" && "uifw-left-corner",
    cornerContext === "right-corner" && "uifw-right-corner",
    props.className
  );
  return (
    <div className={className} style={props.style}>
      {/* eslint-disable-next-line deprecation/deprecation */}
      <Icon iconSpec={<SvgCursor />} />
      {props.count}
    </div>
  );
}

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
    return iModel.selectionSet.onChanged.addListener((ev) => {
      setSize(ev.set.size);
    });
  }, [iModel]);
  return size;
}
