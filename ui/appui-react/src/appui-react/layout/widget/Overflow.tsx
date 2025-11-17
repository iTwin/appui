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
import { useResizeObserver } from "@itwin/core-react/internal";
import { useLabel } from "../base/NineZone.js";
import { PanelSideContext } from "../widget-panels/Panel.js";
import { useLayout } from "../base/LayoutStore.js";
import { Popover } from "@itwin/itwinui-react";
import { SvgMoreVertical } from "@itwin/itwinui-icons-react";
import { TabBarButton } from "./Button.js";

/** @internal */
export interface WidgetOverflowProps {
  children?: React.ReactNode;
  hidden?: boolean;
  onResize?: (w: number) => void;
}

/** @internal */
export function WidgetOverflow(props: WidgetOverflowProps) {
  const [open, setOpen] = React.useState(false);
  const resizeObserverRef = useResizeObserver<HTMLDivElement>(props.onResize);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  usePanelPopup(handleClose);
  const overflowContext = React.useMemo<WidgetOverflowContextArgs>(() => {
    return {
      close: handleClose,
    };
  }, [handleClose]);

  const moreWidgetsTitle = useLabel("moreWidgetsTitle");
  return (
    <WidgetOverflowContext.Provider value={overflowContext}>
      <Popover
        className="nz-widget-overflow_menu"
        visible={open}
        onVisibleChange={setOpen}
        content={props.children}
        applyBackground
      >
        <TabBarButton
          label={moreWidgetsTitle}
          className={classnames(
            "nz-widget-overflow",
            props.hidden && "nz-hidden"
          )}
          ref={resizeObserverRef}
        >
          <SvgMoreVertical />
        </TabBarButton>
      </Popover>
    </WidgetOverflowContext.Provider>
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
