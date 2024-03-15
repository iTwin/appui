/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { Point } from "@itwin/core-react";
import * as React from "react";
import { useTransientState } from "../../widget-panels/useTransientState";
import "./Content.scss";

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
  const scrollPosition = React.useRef(new Point());
  const ref = React.useRef<HTMLDivElement>(null);
  const onSave = React.useCallback(() => {
    if (!ref.current) return;
    scrollPosition.current = new Point(
      ref.current.scrollLeft,
      ref.current.scrollTop
    );
  }, []);
  const onRestore = React.useCallback(() => {
    if (!ref.current) return;
    ref.current.scrollLeft = scrollPosition.current.x;
    ref.current.scrollTop = scrollPosition.current.y;
  }, []);
  useTransientState(onSave, onRestore);
  return (
    <div
      data-item-id={props.itemId}
      data-item-provider-id={props.providerId}
      data-item-type="widget-content"
      className="nz-widget-content"
      ref={ref}
    >
      {props.children}
    </div>
  );
}
