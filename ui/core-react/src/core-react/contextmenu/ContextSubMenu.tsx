/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ContextMenu
 */

import * as React from "react";
import classnames from "classnames";
import { ConditionalBooleanValue } from "@itwin/appui-abstract";
import type { ContextMenuItemProps } from "./ContextMenuItem";
import type { ContextMenuProps } from "./ContextMenu";
import { ContextMenu } from "./ContextMenu";
import type { CommonProps } from "../utils/Props";
import { ContextMenuDirection } from "./ContextMenuDirection";
import { TildeFinder } from "./TildeFinder";
import { Icon } from "../icons/IconComponent";
import { SvgCaretRightSmall } from "@itwin/itwinui-icons-react";
import { Badge } from "../badge/Badge";

/* eslint-disable deprecation/deprecation */

/** Properties for the [[ContextSubMenu]] component
 * @public
 * @deprecated in 4.16.0. Props of a deprecated {@link ContextSubMenu} component.
 */
export interface ContextSubMenuProps
  extends Omit<ContextMenuItemProps, "label">,
    Omit<ContextMenuProps, "label">,
    CommonProps {
  /** Text/jsx to display in the list item */
  label: string | React.ReactElement;
  /** @internal */
  onHotKeyParsed?: (hotKey: string) => void;
}

interface ContextSubMenuState {
  opened: boolean;
  direction: ContextMenuDirection;
  hotKey?: string;
}

/** Submenu wrapper class for use within a [[ContextMenu]] component.
 * @public
 * @deprecated in 4.16.0. Use `subMenuItems` property {@link https://itwinui.bentley.com/docs/dropdownmenu#submenu iTwinUI MenuItem} component instead.
 */
export class ContextSubMenu extends React.Component<
  ContextSubMenuProps,
  ContextSubMenuState
> {
  private _menuElement: ContextMenu | null = null;
  private _subMenuElement: HTMLElement | null = null;
  private _menuButtonElement: HTMLElement | null = null;

  private _lastLabel: React.ReactNode;
  private _parsedLabel: React.ReactNode;

  public static defaultProps: Partial<ContextSubMenuProps> = {
    direction: ContextMenuDirection.BottomRight,
    disabled: false,
    hidden: false,
    autoflip: true,
    isSelected: false,
    selectedIndex: 0,
  };

  /** @internal */
  public override readonly state: Readonly<ContextSubMenuState>;
  constructor(props: ContextSubMenuProps) {
    super(props);
    this.state = {
      opened: false,
      direction: props.direction!,
    };
  }

  public override render(): React.ReactElement {
    const {
      label,
      opened,
      direction,
      onOutsideClick,
      onEsc,
      autoflip,
      edgeLimit,
      selectedIndex,
      floating,
      parentMenu,
      parentSubmenu,
      onSelect,
      icon,
      disabled,
      hidden,
      onHover,
      isSelected,
      onHotKeyParsed,
      children,
      onClick,
      className,
      badgeType,
      hideIconContainer,
      ...props
    } = this.props;

    const onOutsideClickWrapper = (event: MouseEvent) => {
      this.close();
      onOutsideClick && onOutsideClick(event);
    };
    const contextMenuProps = {
      onOutsideClick: onOutsideClickWrapper,
      onSelect,
      onEsc,
      autoflip,
      edgeLimit,
      selectedIndex,
      floating,
      parentMenu,
    };
    const renderDirection = this.state.direction;
    const isDisabled = ConditionalBooleanValue.getValue(disabled);
    const isHidden = ConditionalBooleanValue.getValue(hidden);

    if (this._lastLabel !== label) {
      this._parsedLabel = TildeFinder.findAfterTilde(label).node;
      this._lastLabel = label;
    }
    return (
      <div
        className={classnames(
          "core-context-submenu",
          ContextMenu.getCSSClassNameFromDirection(renderDirection),
          className
        )}
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        onMouseOver={this._handleMouseOver}
        ref={(el) => {
          this._subMenuElement = el;
        }}
        data-testid="core-context-submenu"
        {...props}
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          onClick={this._handleClick}
          ref={(el) => {
            this._menuButtonElement = el;
          }}
          className={classnames(
            "core-context-menu-item",
            "core-context-submenu-container",
            isDisabled && "core-context-menu-disabled",
            isHidden && "core-context-menu-hidden",
            isSelected && "core-context-menu-is-selected"
          )}
          data-testid="core-context-submenu-container"
          role="menuitem"
          tabIndex={isSelected ? 0 : -1}
          aria-disabled={isDisabled}
          aria-hidden={isHidden}
          aria-haspopup={true}
        >
          {!hideIconContainer && (
            <div className="core-context-menu-icon">
              {icon !== undefined && <Icon iconSpec={icon} />}
            </div>
          )}
          <div className={"core-context-menu-content"}>{this._parsedLabel}</div>
          <div className={classnames("core-context-submenu-arrow", "icon")}>
            <Icon iconSpec={<SvgCaretRightSmall />} />
          </div>
          {badgeType && (
            <div className="core-context-menu-badge">
              <Badge type={badgeType} />
            </div>
          )}
        </div>
        <ContextMenu
          ref={(el) => {
            this._menuElement = el;
          }}
          className="core-context-submenu-popup"
          opened={this.state.opened}
          direction={renderDirection}
          parentSubmenu={this}
          {...contextMenuProps}
        >
          {children}
        </ContextMenu>
      </div>
    );
  }

  public override componentDidMount() {
    document.addEventListener("click", this._handleClickGlobal);
    this._updateHotkey(this.props.label);

    this.checkRenderDirection();
  }

  public override componentWillUnmount() {
    document.removeEventListener("click", this._handleClickGlobal);
  }

  public override componentDidUpdate(
    prevProps: ContextSubMenuProps,
    prevState: ContextSubMenuState
  ) {
    const direction = this.props.direction!;
    if (
      (this.state.opened !== prevState.opened &&
        direction !== this.state.direction) ||
      prevProps.direction !== direction
    )
      this.checkRenderDirection();
    if (this.props.label !== prevProps.label) {
      this._updateHotkey(this.props.label);
    }
  }

  private getWindow() {
    const el = this._subMenuElement;
    const parentDocument = el!.ownerDocument;
    return parentDocument.defaultView;
  }

  private checkRenderDirection() {
    const { autoflip } = this.props;
    const parentWindow = this.getWindow();
    let renderDirection = this.state.direction;
    if (parentWindow && autoflip && this._menuElement) {
      const menuRect = this._menuElement.getRect();
      renderDirection = ContextMenu.autoFlip(
        renderDirection,
        menuRect,
        parentWindow.innerWidth,
        parentWindow.innerHeight
      );
      if (renderDirection !== this.state.direction)
        this.setState({ direction: renderDirection });
    }
  }

  private _updateHotkey = (node: React.ReactNode) => {
    let hotKey: string | undefined;
    const isDisabled = ConditionalBooleanValue.getValue(this.props.disabled);
    const isHidden = ConditionalBooleanValue.getValue(this.props.hidden);
    if (!isDisabled && !isHidden)
      hotKey = TildeFinder.findAfterTilde(node).character;
    else hotKey = undefined;
    if (hotKey && hotKey !== this.state.hotKey) {
      this.setState({ hotKey });
      if (this.props.onHotKeyParsed) this.props.onHotKeyParsed(hotKey);
    }
  };

  public select = () => {
    this.setState({ opened: true }, () => {
      if (this._menuElement) this._menuElement.focus();
      if (this.props.onSelect !== undefined) this.props.onSelect(undefined);
    });
  };

  public close = (propagate?: boolean) => {
    this.setState({ opened: false }, () => {
      if (this._menuElement) this._menuElement.blur();
    });
    if (
      propagate &&
      this.props.parentMenu &&
      this.props.parentMenu.props.parentSubmenu
    ) {
      this.props.parentMenu.props.parentSubmenu.close(true);
    }
  };

  private _handleMouseOver = (_event: React.MouseEvent<HTMLDivElement>) => {
    if (
      this._menuButtonElement &&
      this._menuButtonElement.style.visibility !== "hidden" &&
      this.props.onHover
    ) {
      this.props.onHover();
    }
  };

  private _handleClick = (event: any) => {
    event.stopPropagation();

    const isDisabled = ConditionalBooleanValue.getValue(this.props.disabled);

    if (!isDisabled) {
      if (this.props.onClick !== undefined) this.props.onClick(event);
      if (this.props.opened) this.close();
      else this.select();
    }
  };

  private _handleClickGlobal = (event: any) => {
    if (this._subMenuElement && !this._subMenuElement.contains(event.target))
      this.setState((_prevState) => ({ opened: false }));
  };
}
