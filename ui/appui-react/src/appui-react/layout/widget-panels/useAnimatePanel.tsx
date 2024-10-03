/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetPanels
 */

import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { DraggedPanelSideContext } from "../base/DragManager.js";
import { NineZoneDispatchContext } from "../base/NineZone.js";
import { useLayout } from "../base/LayoutStore.js";
import { isHorizontalPanelSide, PanelSideContext } from "./Panel.js";
import type { SizeProps } from "../../utils/SizeProps.js";

/** @internal */
export function useAnimatePanel() {
  const side = React.useContext(PanelSideContext);
  assert(!!side);
  const draggedPanelSide = React.useContext(DraggedPanelSideContext);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const captured = draggedPanelSide === side;
  const [contentSize, setContentSize] = React.useState<number | undefined>();
  const [prepareTransition, setPrepareTransition] = React.useState(false);
  const [transition, setTransition] = React.useState<
    "init" | "transition" | undefined
  >();
  const [panelSize, setPanelSize] = React.useState<number | undefined>();
  const [initializing, setInitializing] = React.useState(false);
  const horizontal = isHorizontalPanelSide(side);
  const animateFrom = React.useRef<number | undefined>();
  const animateTo = React.useRef(0);
  const maxPanelSize = React.useRef<number | undefined>();
  const collapsing = React.useRef<"collapsing" | "expanding" | undefined>();
  const ref = React.useRef<HTMLDivElement>(null);

  const panel = useLayout((state) => {
    const p = state.panels[side];
    return {
      collapsed: p.collapsed,
      size: p.size,
      minSize: p.minSize,
    };
  }, true);

  const [prevCollapsed, setPrevCollapsed] = React.useState(panel.collapsed);
  if (prevCollapsed !== panel.collapsed) {
    setPrevCollapsed(panel.collapsed);
    let from = animateFrom.current;
    if (from === undefined && ref.current) {
      const bounds = ref.current.getBoundingClientRect();
      from = getPanelSize(horizontal, bounds);
    }

    animateFrom.current = from;
    setPanelSize(undefined);
    setContentSize(undefined);
    setTransition(undefined);
    setPrepareTransition(true);
    if (panel.collapsed) {
      collapsing.current = "collapsing";
      maxPanelSize.current = from;
    } else {
      collapsing.current = "expanding";
    }
  }

  const [prevSize, setPrevSize] = React.useState(panel.size);
  if (prevSize !== panel.size) {
    setPrevSize(panel.size);

    if (initializing) {
      // Panel is initializing (via dispatched PANEL_INITIALIZE), need to re-measure animateTo.
      maxPanelSize.current = undefined;
      setPanelSize(undefined);
      setContentSize(undefined);
      setTransition(undefined);
      setPrepareTransition(true);
    } else if (collapsing.current === "collapsing") {
      // Panel is collapsing, ignore size changes.
    } else if (!captured && ref.current && prevSize !== undefined) {
      // Panel is expanding
      animateFrom.current = getPanelSize(
        horizontal,
        ref.current.getBoundingClientRect()
      );
      setPanelSize(undefined);
      setContentSize(undefined);
      setTransition(undefined);
      setPrepareTransition(true);
    } else {
      // Panel is resizing, do not transition.
      setPanelSize(undefined);
      setContentSize(undefined);
      setTransition(undefined);
      animateFrom.current = undefined;
      collapsing.current = undefined;
    }
  }

  React.useLayoutEffect(() => {
    if (panel.size !== undefined || panel.collapsed) return;
    assert(!!ref.current);
    const bounds = ref.current.getBoundingClientRect();
    const newSize = getPanelSize(horizontal, bounds);
    dispatch({
      type: "PANEL_INITIALIZE",
      side,
      size: newSize,
    });
    setInitializing(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panel.size, panel.collapsed]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useLayoutEffect(() => {
    if (!prepareTransition) return;

    setPrepareTransition(false);
    assert(!!ref.current);
    animateTo.current = getPanelSize(
      horizontal,
      ref.current.getBoundingClientRect()
    );
    if (animateFrom.current === animateTo.current) {
      maxPanelSize.current = undefined;
      animateFrom.current = undefined;
      collapsing.current = undefined;
      setPanelSize(undefined);
      setContentSize(undefined);
      setTransition(undefined);
      return;
    }
    if (
      collapsing.current === "expanding" &&
      maxPanelSize.current === undefined
    ) {
      maxPanelSize.current = animateTo.current;
    }

    setPanelSize(animateFrom.current);
    setContentSize(maxPanelSize.current);
    setTransition("init");
  });
  React.useLayoutEffect(() => {
    if (transition !== "init") return;

    const handle = window.requestAnimationFrame(() => {
      animateFrom.current = undefined;
      setTransition("transition");
      setPanelSize(animateTo.current);
    });
    return () => {
      window.cancelAnimationFrame(handle);
    };
  });
  React.useEffect(() => {
    setInitializing(false);
  }, [initializing]);

  const handleTransitionEnd = React.useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.target !== ref.current) return;

      maxPanelSize.current = undefined;
      collapsing.current = undefined;
      animateFrom.current = undefined;
      setPanelSize(undefined);
      setContentSize(undefined);
      setTransition(undefined);
    },
    []
  );

  const size = React.useMemo(() => {
    if (panelSize !== undefined) return panelSize;
    return panel.collapsed ? 0 : panel.size ?? panel.minSize;
  }, [panel.size, panel.collapsed, panel.minSize, panelSize]);
  return { ref, size, handleTransitionEnd, contentSize, transition };
}

function getPanelSize(horizontal: boolean, size: SizeProps) {
  return horizontal ? size.height : size.width;
}
