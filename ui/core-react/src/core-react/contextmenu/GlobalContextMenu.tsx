/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ContextMenu
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import type { ContextMenuProps } from "./ContextMenu.js";
import { ContextMenu } from "./ContextMenu.js";

/* eslint-disable @typescript-eslint/no-deprecated */

/** Properties for the [[GlobalContextMenu]] component
 * @public
 * @deprecated in 4.16.0. Props of deprecated {@link GlobalContextMenu} component.
 */
export interface GlobalContextMenuProps extends ContextMenuProps {
  /** Unique identifier, to distinguish from other GlobalContextMenu components. Needed only if multiple GlobalContextMenus are used simultaneously. */
  identifier?: string;
  /** Specifies the x/horizontal position on the viewport. */
  x: number | string;
  /** Specifies the y/vertical position on the viewport. */
  y: number | string;
  /** Context menu element. Default: ContextMenu */
  contextMenuComponent?: React.ComponentType<ContextMenuProps>;
}

interface GlobalContextMenuState {
  parentDocument: Document | null;
}

/** GlobalContextMenu React component used to display a [[ContextMenu]] at the cursor
 * @public
 * @deprecated in 4.16.0. Use {@link https://itwinui.bentley.com/docs/dropdownmenu iTwinUI DropdownMenu} component instead.
 */
export class GlobalContextMenu extends React.PureComponent<
  GlobalContextMenuProps,
  GlobalContextMenuState
> {
  private _container?: HTMLDivElement;

  public override readonly state: GlobalContextMenuState = {
    parentDocument: null,
  };

  constructor(props: GlobalContextMenuProps) {
    super(props);
  }

  public override componentWillUnmount() {
    if (this._container && this._container.parentElement) {
      // cleanup
      this._container.parentElement.removeChild(this._container);
    }
  }

  private _handleRefSet = (popupDiv: HTMLElement | null) => {
    const parentDocument = popupDiv?.ownerDocument ?? null;
    if (parentDocument) {
      this._container = parentDocument.createElement("div");
      this._container.id =
        this.props.identifier !== undefined
          ? `dialog-${this.props.identifier}`
          : "core-global-context-menu";
      let rt = parentDocument.getElementById(
        "core-global-context-menu-root"
      ) as HTMLDivElement;
      if (!rt) {
        rt = parentDocument.createElement("div");
        rt.id = "core-global-context-menu-root";
        (
          parentDocument.body.querySelector(
            '[data-root-container="appui-root-id"]'
          ) ?? parentDocument.body
        ).appendChild(rt);
      }
      rt.appendChild(this._container);

      // used to support component rendering in pop-out window
      this.setState({ parentDocument });
    }
  };

  public override render(): React.ReactNode {
    const { x, y, identifier, contextMenuComponent, ...props } = this.props;
    const positioningStyle: React.CSSProperties = {
      left: x,
      top: y,
    };

    const CtxMenu = contextMenuComponent || ContextMenu;

    return (
      <div ref={this._handleRefSet} style={{ display: "none" }}>
        {this.state.parentDocument &&
          ReactDOM.createPortal(
            <div className="core-context-menu-global" style={positioningStyle}>
              <CtxMenu {...props} />
            </div>,
            this.state.parentDocument.body.querySelector(
              '[data-root-container="appui-root-id"]'
            ) ?? this.state.parentDocument.body
          )}
      </div>
    );
  }
}
