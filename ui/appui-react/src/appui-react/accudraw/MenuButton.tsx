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
import { ContextMenu, Icon } from "@itwin/core-react";
import { SquareButton } from "./SquareButton.js";
import { SvgMore } from "@itwin/itwinui-icons-react";
import type { SizeProps } from "../utils/SizeProps.js";
import type { Button } from "@itwin/itwinui-react";

type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

/** @public */
export interface MenuButtonProps
  extends Omit<ButtonProps, "size" | "styleType"> {
  /** Center point */
  point: XAndY;
  /** Function called when size is known. */
  onSizeKnown?: (size: SizeProps) => void;
}

interface MenuButtonState {
  expanded: boolean;
}

/** @public */
export class MenuButton extends React.PureComponent<
  MenuButtonProps,
  MenuButtonState
> {
  // eslint-disable-next-line deprecation/deprecation
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
          {/* eslint-disable-next-line deprecation/deprecation */}
          <Icon iconSpec={<SvgMore />} />
        </SquareButton>
        {/* eslint-disable-next-line deprecation/deprecation */}
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
    if (!div) return;

    const rect = div.getBoundingClientRect();
    this.props.onSizeKnown?.({ width: rect.width, height: rect.height });
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
