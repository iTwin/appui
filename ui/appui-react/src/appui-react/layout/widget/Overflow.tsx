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
import { PanelSideContext } from "../widget-panels/Panel.js";
import { useLayout } from "../base/LayoutStore.js";
import { DropdownMenu } from "@itwin/itwinui-react";
import { SvgChevronRightSmall } from "@itwin/itwinui-icons-react";
import { TabBarButton } from "./Button.js";
import { useTranslation } from "../../hooks/useTranslation.js";

interface WidgetOverflowProps {
  items: React.ReactElement[];
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

  const { translate } = useTranslation();
  const moreWidgetsTitle = translate("widget.tooltips.moreWidgets");
  return (
    <WidgetOverflowContext.Provider value={overflowContext}>
      <DropdownMenu
        className="nz-widget-overflow_menu"
        menuItems={props.items}
        visible={open}
        onVisibleChange={setOpen}
      >
        <TabBarButton
          label={moreWidgetsTitle}
          className={classnames(
            "nz-widget-overflow",
            props.hidden && "nz-hidden"
          )}
          ref={resizeObserverRef}
        >
          <SvgChevronRightSmall />
        </TabBarButton>
      </DropdownMenu>
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
