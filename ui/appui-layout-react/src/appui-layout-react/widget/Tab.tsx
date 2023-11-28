/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./Tab.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import type { CommonProps } from "@itwin/core-react";
import {
  Icon,
  Point,
  Rectangle,
  Timer,
  useRefs,
  useResizeObserver,
} from "@itwin/core-react";
import { useDragTab } from "../base/DragManager";
import {
  MeasureContext,
  NineZoneDispatchContext,
  ShowWidgetIconContext,
  TabNodeContext,
} from "../base/NineZone";
import type { TabState } from "../state/TabState";
import type {
  PointerCaptorArgs,
  PointerCaptorEvent,
} from "../base/usePointerCaptor";
import { usePointerCaptor } from "../base/usePointerCaptor";
import { PanelSideContext } from "../widget-panels/Panel";
import { WidgetTabsEntryContext } from "./Tabs";
import {
  restrainInitialWidgetSize,
  WidgetContext,
  WidgetIdContext,
} from "./Widget";
import { TabIdContext } from "./ContentRenderer";
import { TabTarget } from "../target/TabTarget";
import { WidgetMenuTab } from "./MenuTab";
import { WidgetOverflowContext } from "./Overflow";
import { useLayout, useLayoutStore } from "../base/LayoutStore";
import { useFloatingWidgetId } from "./FloatingWidget";
import { getWidgetState } from "../state/internal/WidgetStateHelpers";
import { Key } from "ts-key-enum";
import { usePreviewFeatures } from "../preview/PreviewFeatures";
import { usePreviewMaximizedWidget } from "./PreviewMaximizeToggle";

/** @internal */
export interface WidgetTabProviderProps extends TabPositionContextArgs {
  id: TabState["id"];
  showOnlyTabIcon?: boolean;
}

/** @internal */
export function WidgetTabProvider({
  id,
  first,
  firstInactive,
  last,
  showOnlyTabIcon,
}: WidgetTabProviderProps) {
  const tabNode = React.useContext(TabNodeContext);
  const position = React.useMemo<TabPositionContextArgs>(
    () => ({
      first,
      firstInactive,
      last,
    }),
    [first, firstInactive, last]
  );
  return (
    <TabIdContext.Provider value={id}>
      <TabPositionContext.Provider value={position}>
        <IconOnlyOnWidgetTabContext.Provider value={!!showOnlyTabIcon}>
          {tabNode}
        </IconOnlyOnWidgetTabContext.Provider>
      </TabPositionContext.Provider>
    </TabIdContext.Provider>
  );
}

/** Properties of [[WidgetTab]] component.
 * @internal
 */
export interface WidgetTabProps extends CommonProps {
  badge?: React.ReactNode;
}

/** Component that displays a tab in a side panel widget.
 * @internal
 */
export function WidgetTab(props: WidgetTabProps) {
  const widgetOverflow = React.useContext(WidgetOverflowContext);
  const overflown = !!widgetOverflow;
  if (overflown) return <WidgetMenuTab {...props} />;
  return <WidgetTabComponent {...props} />;
}

function WidgetTabComponent(props: WidgetTabProps) {
  const id = React.useContext(TabIdContext);
  const { first, firstInactive, last } = React.useContext(TabPositionContext);
  const widgetTabsEntryContext = React.useContext(WidgetTabsEntryContext);
  const side = React.useContext(PanelSideContext);
  const widgetId = React.useContext(WidgetIdContext);
  const showIconOnly = React.useContext(IconOnlyOnWidgetTabContext);
  const showWidgetIcon = React.useContext(ShowWidgetIconContext);
  assert(!!id);
  assert(!!widgetId);

  const iconSpec = useLayout((state) => state.tabs[id].iconSpec);
  const label = useLayout((state) => state.tabs[id].label);
  const activeTabId = useLayout(
    (state) => getWidgetState(state, widgetId).activeTabId
  );
  const minimized = useLayout(
    (state) => getWidgetState(state, widgetId).minimized
  );

  const { enabled: enableMaximizedFloatingWidget, maximizedWidget } =
    usePreviewMaximizedWidget();
  const floatingWidgetId = useFloatingWidgetId();
  // istanbul ignore next (preview)
  const maximized =
    !!floatingWidgetId &&
    maximizedWidget === floatingWidgetId &&
    enableMaximizedFloatingWidget;

  const resizeObserverRef = useResizeObserver<HTMLDivElement>(
    widgetTabsEntryContext?.onResize
  );
  const pointerCaptorRef = useTabInteractions({ clickOnly: maximized });
  const refs = useRefs<HTMLDivElement>(resizeObserverRef, pointerCaptorRef);

  const active = activeTabId === id;
  const className = classnames(
    "nz-widget-tab",
    active && "nz-active",
    undefined === side && minimized && "nz-minimized",
    first && "nz-first",
    last && "nz-last",
    firstInactive && "nz-first-inactive",
    props.className
  );

  const showLabel =
    (showIconOnly && !iconSpec) ||
    (showWidgetIcon && !showIconOnly) ||
    !showWidgetIcon;
  return (
    <div
      data-item-id={id}
      data-item-type="widget-tab"
      className={className}
      ref={refs}
      role="tab"
      style={props.style}
      title={label}
      tabIndex={0}
    >
      {(showWidgetIcon || showIconOnly) && iconSpec && (
        <Icon iconSpec={iconSpec} />
      )}
      {showLabel && <span>{label}</span>}
      {props.badge && <div className="nz-badge">{props.badge}</div>}
      <TabTarget />
    </div>
  );
}

/** @internal */
export interface UseTabInteractionsArgs {
  onClick?: () => void;
  onDoubleClick?: () => void;
  onDragStart?: () => void;
  clickOnly?: boolean;
}

/** @internal */
export function useTabInteractions<T extends HTMLElement>({
  onClick,
  onDoubleClick,
  onDragStart,
  clickOnly,
}: UseTabInteractionsArgs) {
  const id = React.useContext(TabIdContext);
  const widgetContext = React.useContext(WidgetContext);
  const measure = React.useContext(MeasureContext);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const side = React.useContext(PanelSideContext);
  const widgetId = React.useContext(WidgetIdContext);
  const widgetTabsEntryContext = React.useContext(WidgetTabsEntryContext);
  const floatingWidgetId = useFloatingWidgetId();
  assert(!!id);
  assert(!!widgetId);

  const layoutStore = useLayoutStore();
  const tabRef = React.useRef(layoutStore.getState().tabs[id]);
  const clickCount = React.useRef(0);
  const doubleClickTimer = React.useRef(new Timer(300));
  const initialPointerPosition = React.useRef<Point>();

  const overflown = !widgetTabsEntryContext;

  React.useEffect(
    () =>
      layoutStore.subscribe((state) => {
        tabRef.current = state.tabs[id];
      }),
    [layoutStore, id]
  );

  const handleClick = React.useCallback(() => {
    dispatch({
      type: "WIDGET_TAB_CLICK",
      side,
      widgetId,
      id,
    });
    onClick?.();
  }, [dispatch, widgetId, id, side, onClick]);
  const handleDoubleClick = React.useCallback(() => {
    // istanbul ignore next (preview)
    if (clickOnly) return;
    dispatch({
      type: "WIDGET_TAB_DOUBLE_CLICK",
      side,
      widgetId,
      floatingWidgetId,
      id,
    });
    onDoubleClick?.();
  }, [
    clickOnly,
    dispatch,
    floatingWidgetId,
    widgetId,
    id,
    side,
    onDoubleClick,
  ]);

  const handleDragTabStart = useDragTab({
    tabId: id,
  });
  const handleDragStart = React.useCallback(
    (pointerPosition: Point) => {
      // istanbul ignore next (preview)
      if (clickOnly) return;
      assert(!!ref.current);
      assert(!!initialPointerPosition.current);
      const nzBounds = measure();
      const nzOffset = new Point(-nzBounds.left, -nzBounds.top);
      let bounds = Rectangle.create(ref.current.getBoundingClientRect());
      bounds = bounds.offset(nzOffset);

      const tab = tabRef.current;
      const userSized =
        tab.userSized ||
        (tab.isFloatingWidgetResizable &&
          /* istanbul ignore next */ !!tab.preferredFloatingWidgetSize);
      let position = bounds.topLeft();
      const widgetBounds = widgetContext.measure();
      const widgetSize = restrainInitialWidgetSize(
        widgetBounds.getSize(),
        nzBounds.getSize()
      );
      if (overflown) {
        position = initialPointerPosition.current.offset(nzOffset);
        position = position.offset({ x: -7, y: -7 });
      }

      const dragOffset =
        initialPointerPosition.current.getOffsetTo(pointerPosition);
      position = position.offset(dragOffset);

      handleDragTabStart({
        initialPointerPosition: Point.create(initialPointerPosition.current),
        pointerPosition,
        widgetSize,
      });
      dispatch({
        type: "WIDGET_TAB_DRAG_START",
        floatingWidgetId,
        side,
        widgetId,
        id,
        position,
        userSized,
      });
      onDragStart?.();

      initialPointerPosition.current = undefined;
    },
    [
      clickOnly,
      measure,
      widgetContext,
      handleDragTabStart,
      dispatch,
      floatingWidgetId,
      side,
      widgetId,
      id,
      onDragStart,
      overflown,
    ]
  );
  const handlePointerDown = React.useCallback(
    (args: PointerCaptorArgs, e: PointerCaptorEvent) => {
      e.type === "touchstart" &&
        floatingWidgetId &&
        dispatch({
          type: "FLOATING_WIDGET_BRING_TO_FRONT",
          id: floatingWidgetId,
        });

      initialPointerPosition.current = new Point(args.clientX, args.clientY);
    },
    [dispatch, floatingWidgetId]
  );
  const handlePointerMove = React.useCallback(
    (args: PointerCaptorArgs) => {
      // istanbul ignore next
      if (!initialPointerPosition.current) return;

      const pointerPosition = new Point(args.clientX, args.clientY);
      const distance =
        initialPointerPosition.current.getDistanceTo(pointerPosition);
      if (distance < 10) return;
      handleDragStart(pointerPosition);
    },
    [handleDragStart]
  );
  const handlePointerUp = React.useCallback(() => {
    clickCount.current++;
    initialPointerPosition.current = undefined;
    doubleClickTimer.current.start();
  }, []);

  const pointerCaptorRef = usePointerCaptor<T>(
    handlePointerDown,
    handlePointerMove,
    handlePointerUp
  );
  const ref = React.useRef<T>();
  const refs = useRefs(pointerCaptorRef, ref);

  React.useEffect(() => {
    const timer = doubleClickTimer.current;
    timer.setOnExecute(() => {
      if (clickCount.current === 1) handleClick();
      else handleDoubleClick();
      clickCount.current = 0;
    });
    const keydown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === Key.Enter) {
        handleClick();
      }
    };
    const instance = ref.current;
    instance && instance.addEventListener("keydown", keydown);
    return () => {
      timer.setOnExecute(undefined);
      instance && instance.removeEventListener("keydown", keydown);
    };
  }, [handleClick, handleDoubleClick]);
  return refs;
}

/** @internal */
export interface TabPositionContextArgs {
  first?: boolean;
  last?: boolean;
  firstInactive?: boolean;
}

/** @internal */
export const TabPositionContext = React.createContext<TabPositionContextArgs>(
  undefined!
);
TabPositionContext.displayName = "nz:TabPositionContext";

/** @internal */
export const IconOnlyOnWidgetTabContext = React.createContext<boolean>(false);
IconOnlyOnWidgetTabContext.displayName = "nz:IconOnlyOnWidgetTabContext";
