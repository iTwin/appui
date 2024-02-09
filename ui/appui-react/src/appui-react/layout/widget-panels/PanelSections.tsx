/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetPanels
 */

import "./PanelSections.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { NineZoneDispatchContext } from "../base/NineZone";
import { PanelWidget } from "../widget/PanelWidget";
import { useLayout } from "../base/LayoutStore";
import { isHorizontalPanelSide, PanelSideContext } from "./Panel";

// istanbul ignore next
function PanelSplitter() {
  const dispatch = React.useContext(NineZoneDispatchContext);
  const side = React.useContext(PanelSideContext);
  assert(!!side);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const splitterProcessingActiveRef = React.useRef<boolean>(false);

  const isHorizontal = isHorizontalPanelSide(side);

  const getPercentage = React.useCallback(
    (min: number, max: number, current: number) => {
      const range = max - min;
      const adjusted = Math.max(min, Math.min(max, current));
      if (adjusted === min) return 0;
      if (adjusted === max) return 100;
      const percent = ((adjusted - min) * 100) / range;
      return percent;
    },
    []
  );

  const updatePanelSize = React.useCallback(
    (event: PointerEvent) => {
      if (!containerRef.current) return;

      const parentPanel = containerRef.current.closest(
        ".nz-widgetPanels-panel"
      );
      const sectionToResize = containerRef.current.parentElement as HTMLElement;
      if (parentPanel && sectionToResize) {
        const rect = parentPanel.getBoundingClientRect();
        const percent = getPercentage(
          isHorizontal ? rect.left : rect.top,
          isHorizontal ? rect.right : rect.bottom,
          isHorizontal ? event.clientX : event.clientY
        );

        dispatch({
          type: "PANEL_SET_SPLITTER_VALUE",
          side,
          percent,
        });
      }
    },
    [getPercentage, isHorizontal, side, dispatch]
  );

  const handlePointerMove = React.useCallback(
    (event: Event): void => {
      if (splitterProcessingActiveRef.current) {
        event.preventDefault();
        event.stopPropagation();
        updatePanelSize(event as PointerEvent);
      }
    },
    [updatePanelSize]
  );

  const handlePointerUp = React.useCallback(
    (event: Event) => {
      updatePanelSize(event as PointerEvent);
      event.preventDefault();
      event.stopPropagation();
      containerRef.current?.ownerDocument.removeEventListener(
        "pointermove",
        handlePointerMove
      );
      containerRef.current?.ownerDocument.removeEventListener(
        "pointerup",
        handlePointerUp
      );
    },
    [handlePointerMove, updatePanelSize]
  );

  const handlePointerDownOnSplitter = React.useCallback(
    (event: React.PointerEvent) => {
      if (containerRef.current) {
        containerRef.current?.ownerDocument.addEventListener(
          "pointermove",
          handlePointerMove
        );
        containerRef.current?.ownerDocument.addEventListener(
          "pointerup",
          handlePointerUp
        );
        splitterProcessingActiveRef.current = true;
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [handlePointerMove, handlePointerUp]
  );

  const className = isHorizontal
    ? "nz-horizontal-panel-splitter"
    : "nz-vertical-panel-splitter";
  return (
    <div
      ref={containerRef}
      className={className}
      onPointerDown={handlePointerDownOnSplitter}
    />
  );
}

/** @internal */
export function PanelSections() {
  const side = React.useContext(PanelSideContext);
  assert(!!side);

  const panel = useLayout((state) => {
    const p = state.panels[side];
    return {
      splitterPercent: p.splitterPercent,
      widgets: p.widgets,
    };
  }, true);

  const isHorizontal = isHorizontalPanelSide(side);

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

  /* istanbul ignore next */
  return (
    <>
      {panel.widgets.map((widgetId, index, array) => {
        const last = index === array.length - 1;

        const sectionClassName = classnames(
          `nz-panel-section-${index}`,
          isHorizontal
            ? "nz-widgetPanels-horizontal"
            : "nz-widgetPanels-vertical",
          last && 0 === index && "nz-panel-section-full-size"
        );

        const panelStyle =
          index === 0 && array.length > 1
            ? splitterControlledPanelStyle
            : undefined;
        return (
          <div key={widgetId} className={sectionClassName} style={panelStyle}>
            <PanelWidget widgetId={widgetId} />
            {!last && 0 === index && <PanelSplitter />}
          </div>
        );
      })}
    </>
  );
}
