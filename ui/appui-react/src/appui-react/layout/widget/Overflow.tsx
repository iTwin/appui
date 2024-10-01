/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./Overflow.scss";
import classnames from "classnames";
import * as React from "react";
import { useRefs, useRefState, useResizeObserver } from "@itwin/core-react";
import { WidgetMenu } from "./Menu.js";
import { useLabel } from "../base/NineZone.js";
import { PanelSideContext } from "../widget-panels/Panel.js";
import { useLayout } from "../base/LayoutStore.js";

/** @internal */
export interface WidgetOverflowProps {
  children?: React.ReactNode;
  hidden?: boolean;
  onResize?: (w: number) => void;
}

/** @internal */
export function WidgetOverflow(props: WidgetOverflowProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const [targetRef, target] = useRefState<HTMLDivElement>();
  const resizeObserverRef = useResizeObserver<HTMLDivElement>(props.onResize);
  const refs = useRefs(ref, resizeObserverRef);
  const handleClick = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  }, []);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  usePanelPopup(handleClose);
  const className = classnames(
    "nz-widget-overflow",
    props.hidden && "nz-hidden"
  );
  const overflowContext = React.useMemo<WidgetOverflowContextArgs>(() => {
    return {
      close: handleClose,
    };
  }, [handleClose]);
  const moreWidgetsTitle = useLabel("moreWidgetsTitle");
  return (
    <div className={className} ref={refs}>
      <div // eslint-disable-line jsx-a11y/click-events-have-key-events
        className="nz-button"
        onClick={handleClick}
        ref={targetRef}
        role="button"
        tabIndex={-1}
        title={moreWidgetsTitle}
      >
        <div className="nz-icon" />
      </div>
      <WidgetOverflowContext.Provider value={overflowContext}>
        <WidgetMenu
          children={props.children} // eslint-disable-line react/no-children-prop
          open={open}
          onClose={handleClose}
          target={target}
        />
      </WidgetOverflowContext.Provider>
    </div>
  );
}

interface WidgetOverflowContextArgs {
  close(): void;
}

/** @internal */
export const WidgetOverflowContext = React.createContext<
  WidgetOverflowContextArgs | undefined
>(undefined);
WidgetOverflowContext.displayName = "nz:WidgetOverflowContext";

function usePanelPopup(onClose: () => void) {
  const side = React.useContext(PanelSideContext);
  const collapsed = useLayout((state) =>
    side ? state.panels[side].collapsed : false
  );
  React.useEffect(() => {
    if (collapsed) {
      onClose();
    }
  }, [collapsed, onClose]);
}
