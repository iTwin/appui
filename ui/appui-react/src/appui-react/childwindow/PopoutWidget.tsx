/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ChildWindowManager
 */

import "./PopoutWidget.scss";
import * as React from "react";
import {
  WidgetContentContainer,
  WidgetProvider,
} from "@itwin/appui-layout-react";

interface PopoutWidgetProps {
  widgetContainerId: string;
}

/** Component used to wrap a widget for use in a child window.
 * @internal
 */
export function PopoutWidget({ widgetContainerId }: PopoutWidgetProps) {
  const content = React.useMemo(
    () => <WidgetContentContainer></WidgetContentContainer>,
    []
  );

  return (
    <div
      className="uifw-popout-widget-filled-container"
      data-widget-id={widgetContainerId}
    >
      <WidgetProvider id={widgetContainerId}>{content}</WidgetProvider>
    </div>
  );
}
