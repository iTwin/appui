/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { Point, useRefs } from "@itwin/core-react";
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
export const ScrollableWidgetContent = React.forwardRef(
  function ScrollableWidgetContent(
    props: ScrollableWidgetContentProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
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
    const refs = useRefs(ref, contentRef);
    return (
      <div
        data-item-id={props.itemId}
        data-item-provider-id={props.providerId}
        data-item-type="widget-content"
        className="nz-widget-content"
        ref={refs}
      >
        {props.children}
      </div>
    );
  }
);
