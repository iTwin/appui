/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import * as React from "react";
import { assert, Guid } from "@itwin/core-bentley";
import {
  Rectangle,
  useRefs,
  useResizeObserver,
} from "@itwin/core-react/internal";
import type { CursorType } from "../widget-panels/CursorOverlay.js";
import type { PanelSide } from "../widget-panels/PanelTypes.js";
import { WidgetContentManager } from "../widget/ContentManager.js";
import type { FloatingWidgetResizeHandle } from "../widget/FloatingWidget.js";
import { FloatingWidget } from "../widget/FloatingWidget.js";
import {
  DraggedPanelSideContext,
  DraggedResizeHandleContext,
  DraggedWidgetIdContext,
  DragProvider,
} from "./DragManager.js";
import { WidgetTab } from "../widget/Tab.js";
import type { NineZoneAction } from "../state/NineZoneAction.js";
import type { LayoutStore } from "./LayoutStore.js";
import { LayoutStoreContext, useLayout } from "./LayoutStore.js";

/** @internal */
export type NineZoneDispatch = (action: NineZoneAction) => void;

/** @internal */
export interface NineZoneProps {
  children?: React.ReactNode;
  dispatch: NineZoneDispatch;
  layout: LayoutStore;
  labels?: NineZoneLabels;
  toolSettingsContent?: React.ReactNode;
  widgetContent?: React.ReactNode;
  tab?: React.ReactNode;
  floatingWidget?: React.ReactNode;
  showWidgetIcon?: boolean;
  autoCollapseUnpinnedPanels?: boolean;
  animateDockedToolSettings?: boolean;
  uiIsVisible?: boolean;
}

/** @internal */
export interface NineZoneLabels {
  dockToolSettingsTitle?: string;
  moreWidgetsTitle?: string;
  moreToolSettingsTitle?: string;
  pinPanelTitle?: string;
  resizeGripTitle?: string;
  sendWidgetHomeTitle?: string;
  toolSettingsHandleTitle?: string;
  unpinPanelTitle?: string;
  popoutActiveTab?: string;
}

/** @internal */
export function NineZone(props: NineZoneProps) {
  const { children, ...providerProps } = props;
  const measurerRef = React.useRef<HTMLDivElement>(null);
  const measure = React.useCallback<() => Rectangle>(() => {
    assert(!!measurerRef.current);
    return Rectangle.create(measurerRef.current.getBoundingClientRect());
  }, []);
  return (
    <NineZoneProvider measure={measure} {...providerProps}>
      <Measurer ref={measurerRef} />
      {children}
    </NineZoneProvider>
  );
}

/** @internal */
export interface NineZoneProviderProps extends NineZoneProps {
  measure: () => Rectangle;
}

const tab = <WidgetTab />;
const floatingWidget = <FloatingWidget />;

/** @internal */
export function NineZoneProvider(props: NineZoneProviderProps) {
  return (
    <LayoutStoreContext.Provider value={props.layout}>
      <NineZoneDispatchContext.Provider value={props.dispatch}>
        <NineZoneLabelsContext.Provider value={props.labels}>
          <UiIsVisibleContext.Provider value={!!props.uiIsVisible}>
            <ShowWidgetIconContext.Provider value={!!props.showWidgetIcon}>
              <AutoCollapseUnpinnedPanelsContext.Provider
                value={!!props.autoCollapseUnpinnedPanels}
              >
                <WidgetContentNodeContext.Provider value={props.widgetContent}>
                  <ToolSettingsNodeContext.Provider
                    value={props.toolSettingsContent}
                  >
                    <TabNodeContext.Provider value={props.tab || tab}>
                      <FloatingWidgetNodeContext.Provider
                        value={props.floatingWidget || floatingWidget}
                      >
                        <AnimateDockedToolSettingsContext.Provider
                          value={!!props.animateDockedToolSettings}
                        >
                          <DragProvider>
                            <CursorTypeProvider>
                              <WidgetContentManager>
                                <MeasureContext.Provider value={props.measure}>
                                  {props.children}
                                </MeasureContext.Provider>
                              </WidgetContentManager>
                            </CursorTypeProvider>
                          </DragProvider>
                        </AnimateDockedToolSettingsContext.Provider>
                      </FloatingWidgetNodeContext.Provider>
                    </TabNodeContext.Provider>
                  </ToolSettingsNodeContext.Provider>
                </WidgetContentNodeContext.Provider>
              </AutoCollapseUnpinnedPanelsContext.Provider>
            </ShowWidgetIconContext.Provider>
          </UiIsVisibleContext.Provider>
        </NineZoneLabelsContext.Provider>
      </NineZoneDispatchContext.Provider>
    </LayoutStoreContext.Provider>
  );
}

/** @internal */
export const NineZoneDispatchContext = React.createContext<NineZoneDispatch>(
  null!
);
NineZoneDispatchContext.displayName = "nz:NineZoneDispatchContext";

/** @internal */
export const NineZoneLabelsContext = React.createContext<
  NineZoneLabels | undefined
>(undefined);
NineZoneLabelsContext.displayName = "nz:NineZoneLabelsContext";

/** @internal */
export const CursorTypeContext = React.createContext<CursorType | undefined>(
  undefined
);
CursorTypeContext.displayName = "nz:CursorTypeContext";

/** @internal */
export const WidgetContentNodeContext =
  React.createContext<React.ReactNode>(undefined);
WidgetContentNodeContext.displayName = "nz:WidgetContentNodeContext";

/** @internal */
export const ShowWidgetIconContext = React.createContext<boolean>(false);
ShowWidgetIconContext.displayName = "nz:ShowWidgetIconContext";

/** @internal */
export const AutoCollapseUnpinnedPanelsContext =
  React.createContext<boolean>(false);
AutoCollapseUnpinnedPanelsContext.displayName =
  "nz:AutoCollapseUnpinnedPanelsContext";

/** @internal */
export const AnimateDockedToolSettingsContext =
  React.createContext<boolean>(false);
AnimateDockedToolSettingsContext.displayName =
  "nz:AnimateDockedToolSettingsContext";

/** @internal */
export const ToolSettingsNodeContext =
  React.createContext<React.ReactNode>(undefined);
ToolSettingsNodeContext.displayName = "nz:ToolSettingsNodeContext";

/** @internal */
export const TabNodeContext = React.createContext<React.ReactNode>(undefined);
TabNodeContext.displayName = "nz:TabNodeContext";

/** @internal */
export const FloatingWidgetNodeContext =
  React.createContext<React.ReactNode>(undefined);
FloatingWidgetNodeContext.displayName = "nz:FloatingWidgetNodeContext";

/** @internal */
export const MeasureContext = React.createContext<() => Rectangle>(null!);
MeasureContext.displayName = "nz:MeasureContext";

/** @internal */
export const UiIsVisibleContext = React.createContext<boolean>(false);
UiIsVisibleContext.displayName = "nz:UiIsVisibleContext";

function CursorTypeProvider(props: { children?: React.ReactNode }) {
  const draggedTab = useLayout((state) => !!state.draggedTab);
  const draggedWidgetId = React.useContext(DraggedWidgetIdContext);
  const draggedPanelSide = React.useContext(DraggedPanelSideContext);
  const draggedResizeHandle = React.useContext(DraggedResizeHandleContext);
  let type: CursorType | undefined;
  if (draggedTab || draggedWidgetId) type = "grabbing";
  else if (draggedPanelSide) type = sideToCursorType(draggedPanelSide);
  else if (draggedResizeHandle) type = handleToCursorType(draggedResizeHandle);
  return (
    <CursorTypeContext.Provider value={type}>
      {props.children}
    </CursorTypeContext.Provider>
  );
}

const Measurer = React.forwardRef<HTMLDivElement>(function Measurer(_, ref) {
  const size = React.useRef<{ height?: number; width?: number }>({});
  const dispatch = React.useContext(NineZoneDispatchContext);
  const handleResize = React.useCallback(
    (width: number, height: number) => {
      if (size.current.width === width && size.current.height === height)
        return;
      size.current.height = height;
      size.current.width = width;
      dispatch({
        type: "RESIZE",
        size: {
          height,
          width,
        },
      });
    },
    [dispatch]
  );
  const roRef = useResizeObserver(handleResize);
  const refs = useRefs(ref, roRef);
  return (
    <div
      ref={refs}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        visibility: "hidden",
      }}
    />
  );
});

/** @internal */
export function sideToCursorType(side: PanelSide): CursorType {
  switch (side) {
    case "bottom":
    case "top":
      return "ns-resize";
    case "left":
    case "right":
      return "ew-resize";
  }
}

/** @internal */
export function handleToCursorType(
  handle: FloatingWidgetResizeHandle
): CursorType {
  switch (handle) {
    case "bottom":
    case "top":
      return "ns-resize";
    case "left":
    case "right":
      return "ew-resize";
    case "topLeft":
    case "bottomRight":
      return "nwse-resize";
    case "topRight":
    case "bottomLeft":
      return "nesw-resize";
  }
}

/** @internal */
export function getUniqueId() {
  return Guid.createValue();
}

/** @internal */
export function useLabel(labelKey: keyof NineZoneLabels) {
  const labels = React.useContext(NineZoneLabelsContext);
  return labels?.[labelKey];
}
