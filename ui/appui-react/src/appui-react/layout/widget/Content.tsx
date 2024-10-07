/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { Point } from "@itwin/core-react/internal";
import { useTransientState } from "../../widget-panels/useTransientState.js";
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
  const contentRef = React.useRef<HTMLDivElement>(null);
  const onSave = React.useCallback(() => {
    const content = contentRef.current;
    if (!content) return;
    scrollPosition.current = new Point(content.scrollLeft, content.scrollTop);
  }, []);
  const onRestore = React.useCallback(() => {
    const content = contentRef.current;
    if (!content) return;
    content.scrollLeft = scrollPosition.current.x;
    content.scrollTop = scrollPosition.current.y;
  }, []);
  useTransientState(onSave, onRestore);
  return (
    <div
      data-item-id={props.itemId}
      data-item-provider-id={props.providerId}
      data-item-type="widget-content"
      className="nz-widget-content"
      ref={contentRef}
    >
      {props.children}
    </div>
  );
}
