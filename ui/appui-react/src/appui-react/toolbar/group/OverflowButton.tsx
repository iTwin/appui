/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./OverflowButton.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { DropdownMenu, IconButton } from "@itwin/itwinui-react";
import { SvgMore } from "@itwin/itwinui-icons-react";
import { ToolbarContext } from "./Toolbar";
import { useLabelProps } from "./Item";
import { usePopoverPlacement } from "./GroupItem";

/** @internal */
interface ToolGroupOverflow {
  onClose?: () => void;
}

/** @internal */
export const ToolGroupOverflowContext = React.createContext<
  ToolGroupOverflow | undefined
>(undefined);

/** @internal */
export function OverflowButton(props: React.PropsWithChildren<{}>) {
  const placement = usePopoverPlacement();
  const orientation = useMenuOrientation();
  const labelProps = useLabelProps();
  const context = React.useContext(ToolbarContext);

  return (
    <DropdownMenu
      className={classnames(
        "uifw-toolbar-group-overflowButton_menu",
        `uifw-${orientation}`
      )}
      menuItems={(close) => {
        return [
          <OverflowMenu key={0} onClose={close}>
            {props.children}
          </OverflowMenu>,
        ];
      }}
      placement={placement}
      onVisibleChange={(newVisible) => {
        context?.setPopoverOpen(newVisible);
      }}
    >
      <IconButton label="More" labelProps={labelProps} styleType="borderless">
        <SvgMore />
      </IconButton>
    </DropdownMenu>
  );
}

interface OverflowMenuProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

function OverflowMenu({ children, onClose }: OverflowMenuProps) {
  const context = React.useContext(ToolbarContext);
  const placement = useSubMenuPlacement();
  return (
    <ToolbarContext.Provider
      value={{
        ...(context ?? {
          setPopoverOpen: () => {},
          popoverOpen: false,
        }),
        ...placement,
      }}
    >
      <ToolGroupOverflowContext.Provider value={{ onClose }}>
        {children}
      </ToolGroupOverflowContext.Provider>
    </ToolbarContext.Provider>
  );
}

function useMenuOrientation() {
  const context = React.useContext(ToolbarContext);
  if (!context) return undefined;

  const horizontal =
    context.expandsTo === "left" || context.expandsTo === "right";
  return horizontal ? "horizontal" : "vertical";
}

function useSubMenuPlacement() {
  const context = React.useContext(ToolbarContext);
  assert(!!context);

  const { expandsTo, panelAlignment } = context;
  if (expandsTo === "bottom" && panelAlignment === "start") {
    return { expandsTo: "right", panelAlignment } as const;
  }
  if (expandsTo === "bottom" && panelAlignment === "end") {
    return { expandsTo: "left", panelAlignment: "start" } as const;
  }
  if (expandsTo === "right" && panelAlignment === "start") {
    return { expandsTo: "bottom", panelAlignment } as const;
  }
  if (expandsTo === "left" && panelAlignment === "start") {
    return { expandsTo: "bottom", panelAlignment: "end" } as const;
  }
  // TODO: other cases & refactor.
  return { expandsTo, panelAlignment };
}
