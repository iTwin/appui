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
import { CommonProps, Rectangle, SizeProps } from "@bentley/ui-core";
import { assert } from "../base/assert";
import { useDragWidget, UseDragWidgetArgs } from "../base/DragManager";
import { getUniqueId, NineZoneDispatchContext } from "../base/NineZone";
import { FLOATING_WIDGET_BRING_TO_FRONT, PANEL_WIDGET_DRAG_START, WidgetState } from "../base/NineZoneState";
import { PanelSideContext } from "../widget-panels/Panel";
import { FloatingWidgetIdContext } from "./FloatingWidget";

/** @internal */
export interface WidgetProviderProps {
  widget: WidgetState;
  children?: React.ReactNode;
}

/** @internal */
export const WidgetProvider = React.memo<WidgetProviderProps>(function WidgetProvider(props) { // tslint:disable-line: variable-name no-shadowed-variable
  return (
    <WidgetStateContext.Provider value={props.widget}>
      <WidgetIdContext.Provider value={props.widget.id}>
        <ActiveTabIdContext.Provider value={props.widget.activeTabId}>
          {props.children}
        </ActiveTabIdContext.Provider>
      </WidgetIdContext.Provider>
    </WidgetStateContext.Provider>
  );
});

/** @internal */
export interface WidgetProps extends CommonProps {
  children?: React.ReactNode;
}

/** @internal */
export const Widget = React.memo<WidgetProps>(function Widget(props) { // tslint:disable-line: variable-name no-shadowed-variable
  const dispatch = React.useContext(NineZoneDispatchContext);
  const side = React.useContext(PanelSideContext);
  const id = React.useContext(WidgetIdContext);
  assert(id !== undefined);
  const floatingWidgetId = React.useContext(FloatingWidgetIdContext);
  const ref = React.useRef<HTMLDivElement>(null);
  const widgetId = floatingWidgetId === undefined ? id : floatingWidgetId;
  const onDragStart = React.useCallback<NonNullable<UseDragWidgetArgs["onDragStart"]>>((updateId) => {
    assert(ref.current);
    const bounds = Rectangle.create(ref.current.getBoundingClientRect()).toProps();
    let newFloatingWidgetId;
    if (floatingWidgetId === undefined) {
      newFloatingWidgetId = getUniqueId();
      updateId(newFloatingWidgetId);
    }
    newFloatingWidgetId && side && dispatch({
      type: PANEL_WIDGET_DRAG_START,
      newFloatingWidgetId,
      id,
      bounds,
      side,
    });
  }, [dispatch, floatingWidgetId, id, side]);
  useDragWidget({
    widgetId,
    onDragStart,
  });
  React.useEffect(() => {
    const listener = () => {
      floatingWidgetId && dispatch({
        type: FLOATING_WIDGET_BRING_TO_FRONT,
        id: floatingWidgetId,
      });
    };
    const element = ref.current!;
    element.addEventListener("click", listener);
    return () => {
      element.removeEventListener("click", listener);
    };
  }, [dispatch, floatingWidgetId]);
  const measure = React.useCallback<WidgetContextArgs["measure"]>(() => {
    const bounds = ref.current!.getBoundingClientRect();
    return bounds;
  }, []);
  const widgetContextValue = React.useMemo<WidgetContextArgs>(() => ({
    measure,
  }), [measure]);
  const className = classnames(
    "nz-widget-widget",
    props.className,
  );
  return (
    <WidgetContext.Provider value={widgetContextValue}>
      <div
        className={className}
        ref={ref}
        style={props.style}
      >
        {props.children}
      </div>
    </WidgetContext.Provider>
  );
});

/** @internal */
export const WidgetIdContext = React.createContext<WidgetState["id"] | undefined>(undefined); // tslint:disable-line: variable-name
WidgetIdContext.displayName = "nz:WidgetIdContext";

/** @internal */
export const WidgetStateContext = React.createContext<WidgetState | undefined>(undefined); // tslint:disable-line: variable-name
WidgetStateContext.displayName = "nz:WidgetStateContext";

/** @internal */
export const ActiveTabIdContext = React.createContext<WidgetState["activeTabId"]>(undefined); // tslint:disable-line: variable-name
ActiveTabIdContext.displayName = "nz:ActiveTabIdContext";

/** @internal */
export interface WidgetContextArgs {
  measure: () => SizeProps;
}

/** @internal */
export const WidgetContext = React.createContext<WidgetContextArgs>(null!); // tslint:disable-line: variable-name
WidgetContext.displayName = "nz:WidgetContext";
