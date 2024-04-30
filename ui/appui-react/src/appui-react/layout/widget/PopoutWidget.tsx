/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { WidgetIdContext } from "./Widget";
import { useContainersStore } from "./ContentManager";
import { WidgetContentContainer } from "./ContentContainer";

/** @internal */
export function PopoutWidget() {
  const widgetId = React.useContext(WidgetIdContext);
  const popoutContainer = useContainersStore((state) =>
    widgetId ? state.popoutContainers[widgetId] : undefined
  );
  if (!popoutContainer) return null;
  return ReactDOM.createPortal(<WidgetContentContainer />, popoutContainer);
}
