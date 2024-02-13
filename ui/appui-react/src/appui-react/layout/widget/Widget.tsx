/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./Widget.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import type { CommonProps, SizeProps } from "@itwin/core-react";
import { Rectangle, useRefs } from "@itwin/core-react";
import type { UseDragWidgetArgs } from "../base/DragManager";
import { useDragWidget } from "../base/DragManager";
import {
  getUniqueId,
  MeasureContext,
  NineZoneDispatchContext,
} from "../base/NineZone";
import type { WidgetState } from "../state/WidgetState";
import { PanelSideContext } from "../widget-panels/Panel";
import { useLayout } from "../base/LayoutStore";
import { getWidgetState } from "../state/internal/WidgetStateHelpers";
import { useFloatingWidgetId } from "./FloatingWidget";

/** @internal */
export interface WidgetProviderProps {
  id: WidgetState["id"];
  children?: React.ReactNode;
}

/** @internal */
export function WidgetProvider(props: WidgetProviderProps) {
  return (
    <WidgetIdContext.Provider value={props.id}>
      {props.children}
    </WidgetIdContext.Provider>
  );
}

/** @internal */
export interface WidgetProps extends CommonProps {
  children?: React.ReactNode;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onTransitionEnd?(): void;
  widgetId?: string;
}

/** @internal */
export const Widget = React.forwardRef<HTMLDivElement, WidgetProps>(
  function Widget(props, forwardedRef) {
    const dispatch = React.useContext(NineZoneDispatchContext);
    const side = React.useContext(PanelSideContext);
    const id = React.useContext(WidgetIdContext);
    const measureNz = React.useContext(MeasureContext);
    const floatingWidgetId = useFloatingWidgetId();
    assert(!!id);
    const { preferredFloatingWidgetSize, userSized } = useLayout((state) => {
      const widget = getWidgetState(state, id);
      const tab = state.tabs[widget.activeTabId];
      // istanbul ignore next
      return {
        preferredFloatingWidgetSize: tab.preferredFloatingWidgetSize,
        userSized:
          tab.userSized ||
          (tab.isFloatingWidgetResizable && !!tab.preferredFloatingWidgetSize),
      };
    }, true);
    const elementRef = React.useRef<HTMLDivElement>(null);
    const widgetId = floatingWidgetId === undefined ? id : floatingWidgetId;
    const onDragStart = React.useCallback<
      NonNullable<UseDragWidgetArgs["onDragStart"]>
    >(
      (updateId, initialPointerPosition, pointerPosition) => {
        assert(!!elementRef.current);
        if (floatingWidgetId !== undefined) return;
        const nzBounds = measureNz();
        let bounds = Rectangle.create(
          elementRef.current.getBoundingClientRect()
        );

        const size = restrainInitialWidgetSize(
          bounds.getSize(),
          nzBounds.getSize()
        );
        bounds = bounds.setSize(size);

        if (preferredFloatingWidgetSize) {
          bounds = bounds.setSize(preferredFloatingWidgetSize);
        }

        // Pointer is outside of tab area. Need to re-adjust widget bounds so that tab is behind pointer
        if (initialPointerPosition.x > bounds.right) {
          const offset = initialPointerPosition.x - bounds.right + 20;
          bounds = bounds.offsetX(offset);
        }

        const dragOffset = initialPointerPosition.getOffsetTo(pointerPosition);
        bounds = bounds.offset(dragOffset);

        // Adjust bounds to be relative to 9z origin
        bounds = bounds.offset({ x: -nzBounds.left, y: -nzBounds.top });

        const newFloatingWidgetId = getUniqueId();
        updateId(newFloatingWidgetId);

        assert(!!side);
        dispatch({
          type: "PANEL_WIDGET_DRAG_START",
          newFloatingWidgetId,
          id,
          bounds,
          side,
          userSized,
        });
      },
      [
        dispatch,
        floatingWidgetId,
        id,
        side,
        measureNz,
        preferredFloatingWidgetSize,
        userSized,
      ]
    );
    useDragWidget({
      widgetId,
      onDragStart,
    });
    React.useEffect(() => {
      const listener = () => {
        floatingWidgetId &&
          dispatch({
            type: "FLOATING_WIDGET_BRING_TO_FRONT",
            id: floatingWidgetId,
          });
      };
      const element = elementRef.current;
      // istanbul ignore next
      element?.addEventListener("click", listener);
      return () => {
        // istanbul ignore next
        element?.removeEventListener("click", listener);
      };
    }, [dispatch, floatingWidgetId]);
    const measure = React.useCallback<WidgetContextArgs["measure"]>(() => {
      // istanbul ignore next
      if (!elementRef.current) return new Rectangle();
      const bounds = elementRef.current.getBoundingClientRect();
      return Rectangle.create(bounds);
    }, []);
    const widgetContextValue = React.useMemo<WidgetContextArgs>(
      () => ({
        measure,
      }),
      [measure]
    );

    const handleContextMenu = React.useCallback(
      (e: React.MouseEvent): boolean => {
        e.preventDefault();
        return false;
      },
      []
    );
    const ref = useRefs(forwardedRef, elementRef);
    const className = classnames("nz-widget-widget", props.className);
    return (
      <WidgetContext.Provider value={widgetContextValue}>
        <div
          className={className}
          onContextMenu={handleContextMenu}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          onTransitionEnd={props.onTransitionEnd}
          ref={ref}
          style={props.style}
          data-widget-id={props.widgetId}
        >
          {props.children}
        </div>
      </WidgetContext.Provider>
    );
  }
);

/** @internal */
export const WidgetIdContext = React.createContext<
  WidgetState["id"] | undefined
>(undefined);
WidgetIdContext.displayName = "nz:WidgetIdContext";

/** @internal */
export interface WidgetContextArgs {
  measure: () => Rectangle;
}

/** @internal */
export const WidgetContext = React.createContext<WidgetContextArgs>(null!);
WidgetContext.displayName = "nz:WidgetContext";

const minWidth = 200;
const minHeight = 200;

/** @internal */
export function restrainInitialWidgetSize(
  size: SizeProps,
  nzSize: SizeProps
): SizeProps {
  const width = Math.max(Math.min(nzSize.width / 3, size.width), minWidth);
  const height = Math.max(Math.min(nzSize.height / 3, size.height), minHeight);
  return {
    width,
    height,
  };
}

/** @internal */
export function useActiveTabId() {
  const id = React.useContext(WidgetIdContext);
  assert(!!id);
  return useLayout((state) => {
    const widget = getWidgetState(state, id);
    return widget.activeTabId;
  });
}
