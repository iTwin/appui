/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module AccuDraw
 */

import "./MenuButton.scss";
import * as React from "react";
import type { XAndY } from "@itwin/core-geometry";
import type { SizeProps } from "@itwin/core-react";
import { ContextMenu, Icon, Size } from "@itwin/core-react";
import type { SquareButtonProps } from "./SquareButton";
import { SquareButton } from "./SquareButton";
import { SvgMore } from "@itwin/itwinui-icons-react";

/** @alpha */
export interface MenuButtonProps extends SquareButtonProps {
  /** Center point */
  point: XAndY;
  /** Function called when size is known. */
  onSizeKnown?: (size: SizeProps) => void;
}

/** @internal */
interface MenuButtonState {
  expanded: boolean;
}

/** @alpha */
export class MenuButton extends React.PureComponent<
  MenuButtonProps,
  MenuButtonState
> {
  private _menu: ContextMenu | null = null;

  constructor(props: MenuButtonProps) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  public override render() {
    const { point, className, style, onSizeKnown, ...buttonProps } = this.props;

    const divStyle: React.CSSProperties = {
      top: point.y,
      left: point.x,
    };

    return (
      <div
        className="uifw-menu-button"
        style={divStyle}
        ref={(e) => this.setDivRef(e)}
      >
        <SquareButton
          {...buttonProps}
          className={className}
          style={style}
          onClick={this._handleClick}
        >
          <Icon iconSpec={<SvgMore />} />
        </SquareButton>
        <ContextMenu
          ref={(el) => {
            this._menu = el;
          }}
          selectedIndex={0}
          onSelect={this._handleClose}
          onOutsideClick={this._handleClose}
          onEsc={this._handleClose}
          opened={this.state.expanded}
          autoflip={false}
        >
          {this.props.children}
        </ContextMenu>
      </div>
    );
  }

  private setDivRef(div: HTMLDivElement | null) {
    if (div) {
      const rect = div.getBoundingClientRect();
      const size = new Size(rect.width, rect.height);

      if (this.props.onSizeKnown) this.props.onSizeKnown(size);
    }
  }

  private _open = () => {
    this.setState({ expanded: true }, () => {
      if (this._menu) this._menu.focus();
    });
  };

  private _handleClick = (event: any) => {
    if (this.state.expanded) {
      event.stopPropagation();
      this.setState({ expanded: false });
    } else {
      this._open();
    }
  };

  private _handleClose = () => {
    this.setState({ expanded: false });
  };
}
