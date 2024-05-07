/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { WidgetIdContext } from "../../layout/widget/Widget";
import { WidgetContentContainer } from "../../layout/widget/ContentContainer";
import { usePopoutsStore } from "./usePopoutsStore";

/** @internal */
export function PopoutWidget() {
  const widgetId = React.useContext(WidgetIdContext);
  const popoutContainer = usePopoutsStore((state) =>
    widgetId ? state.popouts[widgetId] : undefined
  );
  if (!popoutContainer) return null;
  return ReactDOM.createPortal(<WidgetContentContainer />, popoutContainer);
}
