/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetPanels
 */

import "./Panel.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { RectangleProps, useRefs } from "@itwin/core-react";
import { DraggedPanelSideContext } from "../base/DragManager";
import { NineZoneDispatchContext } from "../base/NineZone";
import { PanelWidget } from "../widget/PanelWidget";
import { WidgetPanelGrip } from "./Grip";
import { PanelTargets } from "../target/PanelTargets";
import { SectionOutline } from "../outline/SectionOutline";
import { PanelOutline } from "../outline/PanelOutline";
import { SectionTargets } from "../target/SectionTargets";
import { isHorizontalPanelState } from "../state/PanelState";
import { useLayout } from "../base/LayoutStore";
import { useAnimatePanel } from "./useAnimatePanel";

/** @internal */
export type TopPanelSide = "top";

/** @internal */
export type BottomPanelSide = "bottom";

/** @internal */
export type LeftPanelSide = "left";

/** @internal */
export type RightPanelSide = "right";

/** @internal */
export type HorizontalPanelSide = TopPanelSide | BottomPanelSide;

/** @internal */
export type VerticalPanelSide = LeftPanelSide | RightPanelSide;

/** @internal */
export type PanelSide = VerticalPanelSide | HorizontalPanelSide;

// istanbul ignore next
function PanelSplitter() {
  const dispatch = React.useContext(NineZoneDispatchContext);
  const side = React.useContext(PanelSideContext);
  assert(!!side);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const splitterProcessingActiveRef = React.useRef<boolean>(false);

  const isHorizontal = isHorizontalPanelSide(side);

  const getPercentage = React.useCallback((min: number, max: number, current: number) => {
    const range = max - min;
    const adjusted = Math.max(min, Math.min(max, current));
    if (adjusted === min)
      return 0;
    if (adjusted === max)
      return 100;
    const percent = ((adjusted - min) * 100) / (range);
    return percent;
  }, []);

  const updatePanelSize = React.useCallback(
    (event: PointerEvent) => {
      if (!containerRef.current)
        return;

      const parentPanel = containerRef.current.closest(".nz-widgetPanels-panel");
      const sectionToResize = containerRef.current.parentElement as HTMLElement;
      if (parentPanel && sectionToResize) {
        const rect = parentPanel.getBoundingClientRect();
        const percent = getPercentage(
          isHorizontal ? rect.left : rect.top,
          isHorizontal ? rect.right : rect.bottom,
          isHorizontal ? event.clientX : event.clientY,
        );

        dispatch({
          type: "PANEL_SET_SPLITTER_VALUE",
          side,
          percent,
        });
      }
    }, [getPercentage, isHorizontal, side, dispatch]);

  const handlePointerMove = React.useCallback((event: Event): void => {
    if (splitterProcessingActiveRef.current) {
      event.preventDefault();
      event.stopPropagation();
      updatePanelSize(event as PointerEvent);
    }
  }, [updatePanelSize]);

  const handlePointerUp = React.useCallback((event: Event) => {
    updatePanelSize(event as PointerEvent);
    event.preventDefault();
    event.stopPropagation();
    containerRef.current?.ownerDocument.removeEventListener("pointermove", handlePointerMove);
    containerRef.current?.ownerDocument.removeEventListener("pointerup", handlePointerUp);
  }, [handlePointerMove, updatePanelSize]);

  const handlePointerDownOnSplitter = React.useCallback(
    (event: React.PointerEvent) => {
      if (containerRef.current) {
        containerRef.current?.ownerDocument.addEventListener("pointermove", handlePointerMove);
        containerRef.current?.ownerDocument.addEventListener("pointerup", handlePointerUp);
        splitterProcessingActiveRef.current = true;
        event.preventDefault();
        event.stopPropagation();
      }
    }, [handlePointerMove, handlePointerUp]);

  const className = isHorizontal ? "nz-horizontal-panel-splitter" : "nz-vertical-panel-splitter";
  return (
    <div ref={containerRef} className={className} onPointerDown={handlePointerDownOnSplitter} />
  );
}

/** Properties of [[WidgetPanelProvider]] component.
 * @internal
 */
export interface WidgetPanelProviderProps {
  side: PanelSide;
}

/** Widget panel component is a side panel with multiple widgets.
 * @internal
 */
export const WidgetPanelProvider = React.memo<WidgetPanelProviderProps>(function WidgetPanelProvider({ side }) { // eslint-disable-line @typescript-eslint/naming-convention, no-shadow
  const hasWidgets = useLayout((state) => state.panels[side].widgets.length > 0);
  return (
    <PanelSideContext.Provider value={side}>
      {hasWidgets && <WidgetPanel />}
      <PanelTargets />
      <PanelOutline />
    </PanelSideContext.Provider>
  );
});

/** @internal */
export const WidgetPanel = React.memo(function WidgetPanel() { // eslint-disable-line @typescript-eslint/naming-convention, no-shadow
  const side = React.useContext(PanelSideContext);
  const draggedPanelSide = React.useContext(DraggedPanelSideContext);
  assert(!!side);

  const spanTop = useLayout((state) => state.panels.top.span);
  const spanBottom = useLayout((state) => state.panels.bottom.span);
  const panel = useLayout((state) => {
    const p = state.panels[side];
    const span = isHorizontalPanelState(p) ? p.span : false;
    return {
      collapsed: p.collapsed,
      splitterPercent: p.splitterPercent,
      widgets: p.widgets,
      resizable: p.resizable,
      span,
    };
  }, true);

  const { handleTransitionEnd, size, contentSize, transition, ref: panelRef } = useAnimatePanel();

  const isHorizontal = isHorizontalPanelSide(side);
  const style = React.useMemo(() => {
    if (isHorizontal)
      return {
        height: `${size}px`,
      };
    return {
      width: `${size}px`,
    };
  }, [size, isHorizontal]);
  const contentStyle = React.useMemo(() => {
    if (contentSize === undefined)
      return undefined;
    if (isHorizontal)
      return {
        minHeight: `${contentSize}px`,
      };
    return {
      minWidth: `${contentSize}px`,
    };
  }, [contentSize, isHorizontal]);
  const splitterControlledPanelStyle = React.useMemo(() => {
    // istanbul ignore next
    const splitterPercent = panel.splitterPercent ?? 50;
    if (isHorizontal) {
      return {
        width: `${splitterPercent}%`,
      };
    }
    return {
      height: `${splitterPercent}%`,
    };
  }, [isHorizontal, panel.splitterPercent]);

  const elementRef = React.useRef<HTMLDivElement>(null);
  const getBounds = React.useCallback(() => {
    assert(!!elementRef.current);
    return elementRef.current.getBoundingClientRect();
  }, []);
  const widgetPanel = React.useMemo<WidgetPanelContextArgs>(() => {
    return {
      getBounds,
    };
  }, [getBounds]);

  const captured = draggedPanelSide === side;
  const className = classnames(
    "nz-widgetPanels-panel",
    `nz-${side}`,
    panel.collapsed && "nz-collapsed",
    captured && "nz-captured",
    panel.span && "nz-span",
    spanTop && "nz-span-top",
    spanBottom && "nz-span-bottom",
    transition && `nz-${transition}`,
  );

  const singleSection = panel.widgets.length === 1;
  const showSectionTargets = singleSection && !panel.collapsed;
  const ref = useRefs(elementRef, panelRef);

  /* istanbul ignore next */
  return (
    <WidgetPanelContext.Provider value={widgetPanel}>
      <div
        className={className}
        ref={ref}
        style={style}
        onTransitionEnd={handleTransitionEnd}
      >
        <div
          className="nz-content"
          style={contentStyle}
        >
          {singleSection && <SectionOutline sectionIndex={0} />}
          {panel.widgets.map((widgetId, index, array) => {
            const last = index === array.length - 1;

            const sectionClassName = classnames(
              `nz-panel-section-${index}`,
              isHorizontal ? "nz-widgetPanels-horizontal" : "nz-widgetPanels-vertical",
              (last && 0 === index) && "nz-panel-section-full-size"
            );

            const panelStyle = index === 0 && array.length > 1 ? splitterControlledPanelStyle : undefined;
            return (
              <div
                key={widgetId}
                className={sectionClassName}
                style={panelStyle}
              >
                <PanelWidget
                  widgetId={widgetId}
                />
                {(!last && 0 === index) && <PanelSplitter />}
              </div>
            );
          })}
          {singleSection && <SectionOutline sectionIndex={1} />}
        </div>
        {showSectionTargets && <SectionTargets widgetId={panel.widgets[0]} />}
        {panel.resizable &&
          <div className="nz-grip-container">
            <WidgetPanelGrip className="nz-grip" />
          </div>
        }
      </div>
    </WidgetPanelContext.Provider>
  );
});

/** @internal */
export const PanelSideContext = React.createContext<PanelSide | undefined>(undefined); // eslint-disable-line @typescript-eslint/naming-convention
PanelSideContext.displayName = "nz:PanelSideContext";

/** @internal */
export interface WidgetPanelContextArgs {
  getBounds(): RectangleProps;
}

/** @internal */
export const WidgetPanelContext = React.createContext<WidgetPanelContextArgs | undefined>(undefined);
WidgetPanelContext.displayName = "nz:WidgetPanelContext";

/** @internal */
export const isHorizontalPanelSide = (side: PanelSide): side is HorizontalPanelSide => {
  return side === "top" || side === "bottom";
};

/** @internal */
export const panelSides: [LeftPanelSide, RightPanelSide, TopPanelSide, BottomPanelSide] = [
  "left",
  "right",
  "top",
  "bottom",
];
