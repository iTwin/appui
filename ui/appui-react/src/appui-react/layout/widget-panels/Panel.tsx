/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetPanels
 */

import "./Panel.scss";
import { assert } from "@itwin/core-bentley";
import type { RectangleProps } from "@itwin/core-react";
import { useRefs } from "@itwin/core-react";
import classnames from "classnames";
import * as React from "react";
import { DraggedPanelSideContext } from "../base/DragManager";
import { useLayout } from "../base/LayoutStore";
import { PanelOutline } from "../outline/PanelOutline";
import { SectionOutline } from "../outline/SectionOutline";
import { isHorizontalPanelState } from "../state/PanelState";
import { PanelTargets } from "../target/PanelTargets";
import { SectionTargets } from "../target/SectionTargets";
import { usePreviewHorizontalPanelAlign } from "../widget/PreviewHorizontalPanelAlign";
import { WidgetPanelGrip } from "./Grip";
import { PanelSections } from "./PanelSections";
import type {
  BottomPanelSide,
  HorizontalPanelSide,
  LeftPanelSide,
  PanelSide,
  RightPanelSide,
  TopPanelSide,
} from "./PanelTypes";
import { useAnimatePanel } from "./useAnimatePanel";

/** Properties of [[WidgetPanelProvider]] component.
 * @internal
 */
export interface WidgetPanelProviderProps {
  side: PanelSide;
}

/** Widget panel component is a side panel with multiple widgets.
 * @internal
 */
export function WidgetPanelProvider({ side }: WidgetPanelProviderProps) {
  const hasWidgets = useLayout(
    (state) => state.panels[side].widgets.length > 0
  );
  return (
    <PanelSideContext.Provider value={side}>
      <div className="nz-widgetPanels_panelContainer">
        {hasWidgets && <WidgetPanel />}
        <PanelTargets />
        <PanelOutline />
      </div>
    </PanelSideContext.Provider>
  );
}

/** @internal */
export function WidgetPanel() {
  const side = React.useContext(PanelSideContext);
  const draggedPanelSide = React.useContext(DraggedPanelSideContext);
  assert(!!side);
  const { enabled: previewHorizontalPanelAlignmentEnabled, alignments } =
    usePreviewHorizontalPanelAlign();

  const previewHorizontalPanelAlignAttributes = React.useMemo(
    () =>
      previewHorizontalPanelAlignmentEnabled
        ? {
            "data-preview-horizontal-panel-align-top": alignments.top,
            "data-preview-horizontal-panel-align-bottom": alignments.bottom,
          }
        : {},
    [alignments.bottom, alignments.top, previewHorizontalPanelAlignmentEnabled]
  );

  const spanTop = useLayout((state) => state.panels.top.span);
  const spanBottom = useLayout((state) => state.panels.bottom.span);
  const panel = useLayout((state) => {
    const p = state.panels[side];
    const span = isHorizontalPanelState(p) ? p.span : false;
    return {
      collapsed: p.collapsed,
      widgets: p.widgets,
      resizable: p.resizable,
      span,
    };
  }, true);

  const {
    handleTransitionEnd,
    size,
    contentSize,
    transition,
    ref: panelRef,
  } = useAnimatePanel();

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
    if (contentSize === undefined) return undefined;
    if (isHorizontal)
      return {
        minHeight: `${contentSize}px`,
      };
    return {
      minWidth: `${contentSize}px`,
    };
  }, [contentSize, isHorizontal]);

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
    transition && `nz-${transition}`
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
        {...previewHorizontalPanelAlignAttributes}
      >
        <div className="nz-content" style={contentStyle}>
          {singleSection && <SectionOutline sectionIndex={0} />}
          <PanelSections />
          {singleSection && <SectionOutline sectionIndex={1} />}
        </div>
        {showSectionTargets && <SectionTargets widgetId={panel.widgets[0]} />}
        {panel.resizable && (
          <div className="nz-grip-container">
            <WidgetPanelGrip className="nz-grip" />
          </div>
        )}
      </div>
    </WidgetPanelContext.Provider>
  );
}

/** @internal */
export const PanelSideContext = React.createContext<PanelSide | undefined>(
  undefined
);
PanelSideContext.displayName = "nz:PanelSideContext";

/** @internal */
export interface WidgetPanelContextArgs {
  getBounds(): RectangleProps;
}

/** @internal */
export const WidgetPanelContext = React.createContext<
  WidgetPanelContextArgs | undefined
>(undefined);
WidgetPanelContext.displayName = "nz:WidgetPanelContext";

/** @internal */
export const isHorizontalPanelSide = (
  side: PanelSide
): side is HorizontalPanelSide => {
  return side === "top" || side === "bottom";
};

/** @internal */
export const panelSides: [
  LeftPanelSide,
  RightPanelSide,
  TopPanelSide,
  BottomPanelSide
] = ["left", "right", "top", "bottom"];
