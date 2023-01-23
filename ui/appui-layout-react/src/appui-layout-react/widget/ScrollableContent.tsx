/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./ScrollableContent.scss";
import * as React from "react";

/** Properties of [[ScrollableWidgetContent]] component.
 * @internal
 */
export interface ScrollableWidgetContentProps {
  /** Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id */
  itemId?: string;
  providerId?: string;
  children?: React.ReactNode;
}

/** Component that enables widget content scrolling.
 * @internal
 */
export function ScrollableWidgetContent(props: ScrollableWidgetContentProps) {
  return (
    <div
      data-item-id={props.itemId}
      data-item-provider-id={props.providerId}
      data-item-type="widget-content"
      className="nz-widget-content"
    >
      {props.children}
    </div>
  );
}
