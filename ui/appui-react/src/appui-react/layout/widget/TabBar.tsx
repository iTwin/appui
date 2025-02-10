/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./TabBar.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { Timer } from "@itwin/core-react";
import { Point } from "@itwin/core-react/internal";
import type {
  PointerCaptorArgs,
  PointerCaptorEvent,
} from "../base/usePointerCaptor.js";
import { usePointerCaptor } from "../base/usePointerCaptor.js";
import { TabBarButtons } from "./Buttons.js";
import { WidgetTabs } from "./Tabs.js";
import { WidgetIdContext } from "./Widget.js";

/** @internal */
export interface WidgetTabBarProps {
  separator?: boolean;
}

/** @internal */
export function WidgetTabBar(props: WidgetTabBarProps) {
  const id = React.useContext(WidgetIdContext);
  assert(!!id);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const className = classnames(
    "nz-widget-tabBar",
    props.separator && "nz-separator"
  );
  return (
    <div ref={containerRef} className={className}>
      <WidgetTabs />
      <TabBarButtons />
    </div>
  );
}

/** Hook to control drag interactions.
 * Starts drag interaction after pointer moves or after timeout.
 * @internal
 */
export function useDrag<T extends HTMLElement>(
  onDragStart?: (initialPointerPosition: Point, pointerPosition: Point) => void,
  onDrag?: (position: Point) => void,
  onDragEnd?: () => void,
  onTouchStart?: () => void,
  onDoubleClick?: () => void
) {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const doubleClickTimer = React.useRef(new Timer(300));
  const clickCount = React.useRef(0);
  const initialPointerPosition = React.useRef<Point>();

  React.useEffect(() => {
    const handleExecute = () => {
      if (clickCount.current === 2) onDoubleClick && onDoubleClick();
      clickCount.current = 0;
    };
    const timer = doubleClickTimer.current;
    timer.setOnExecute(handleExecute);
    return () => {
      timer.setOnExecute(undefined);
    };
  }, [onDoubleClick]);

  const handlePointerDown = React.useCallback(
    (args: PointerCaptorArgs, e: PointerCaptorEvent) => {
      initialPointerPosition.current = new Point(args.clientX, args.clientY);
      e.type === "touchstart" && onTouchStart && onTouchStart();
    },
    [onTouchStart]
  );
  const handlePointerMove = React.useCallback(
    (args: PointerCaptorArgs) => {
      if (initialPointerPosition.current) {
        onDragStart &&
          onDragStart(
            initialPointerPosition.current,
            new Point(args.clientX, args.clientY)
          );
        initialPointerPosition.current = undefined;
        return;
      }
      onDrag && onDrag(new Point(args.clientX, args.clientY));
    },
    [onDragStart, onDrag]
  );
  const handlePointerUp = React.useCallback(() => {
    clickCount.current++;
    doubleClickTimer.current.start();
    initialPointerPosition.current = undefined;
    onDragEnd && onDragEnd();
  }, [onDragEnd]);
  const ref = usePointerCaptor<T>(
    handlePointerDown,
    handlePointerMove,
    handlePointerUp
  );
  return ref;
}
