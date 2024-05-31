/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./TabOutline.scss";
import classnames from "classnames";
import * as React from "react";
import { useTargeted } from "../base/DragManager";
import { WidgetIdContext } from "../widget/Widget";
import { isWidgetDropTargetState } from "../state/DropTargetState";
import { useSendBackHomeState } from "../widget/SendBack";

/** @internal */
export function TabOutline() {
  const hidden = useHidden();
  const className = classnames("nz-outline-tabOutline", hidden && "nz-hidden");
  return <div className={className} />;
}

function useHidden() {
  const widgetId = React.useContext(WidgetIdContext);
  const targeted = useTargeted();
  const activeHomeState = useSendBackHomeState();

  return React.useMemo(() => {
    if (activeHomeState?.widgetId === widgetId) return false;

    if (!targeted) return true;

    if (!isWidgetDropTargetState(targeted)) return true;

    if (targeted.widgetId !== widgetId) return true;

    return false;
  }, [targeted, widgetId, activeHomeState]);
}
