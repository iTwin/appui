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
  const placement = usePlacement();
  const orientation = useMenuOrientation();

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
    >
      <IconButton label="More" styleType="borderless">
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
  const childrenArray = React.Children.toArray(children);
  const placement = useSubMenuPlacement();
  return (
    <ToolbarContext.Provider
      value={{
        ...placement,
      }}
    >
      <ToolGroupOverflowContext.Provider value={{ onClose }}>
        {childrenArray}
      </ToolGroupOverflowContext.Provider>
    </ToolbarContext.Provider>
  );
}

function usePlacement() {
  const context = React.useContext(ToolbarContext);
  if (!context) return undefined;

  return `${context.expandsTo}` as const;
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