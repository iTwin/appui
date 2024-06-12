/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ContextMenu
 */

import "./ContextMenu.scss";
import classnames from "classnames";
import * as React from "react";
import { Key } from "ts-key-enum";
import { ConditionalBooleanValue } from "@itwin/appui-abstract";
import type { CommonProps } from "../utils/Props";
import { DivWithOutsideClick } from "../base/DivWithOutsideClick";
import { ContextMenuDirection } from "./ContextMenuDirection";
import type { ContextMenuItemProps } from "./ContextMenuItem";
import { ContextMenuItem } from "./ContextMenuItem";
import type { ContextSubMenuProps } from "./ContextSubMenu";
import { ContextSubMenu } from "./ContextSubMenu";

/** Properties for the [[ContextMenu]] component
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export interface ContextMenuProps extends CommonProps {
  /** Whether ContextMenu is currently opened. */
  opened: boolean;
  /** Which direction the menu opens. Default: ContextMenuDirection.BottomRight */
  direction?: ContextMenuDirection;
  /** When click is registered outside of ContextMenu. */
  onOutsideClick?: (event: MouseEvent) => any;
  /** When list item or submenu is selected */
  onSelect?: (event: any) => any;
  /** when Escape button is pressed */
  onEsc?: (data: any) => any;
  /** Whether menu flips directions based on screen edge. Default: true */
  autoflip?: boolean;
  /** Whether menu hugs screen edge when autoflip is off. Default: true */
  edgeLimit?: boolean;
  /** Whether Hotkey press selects item, or just highlights item. Default: true */
  hotkeySelect?: boolean;
  /** starting menu item selected index Default: -1 */
  selectedIndex?: number;
  /** whether menu floats on the viewport, or the page. When false, container elements can clip menu with overflow: hidden; Default: true */
  floating?: boolean;
  /** @internal */
  parentMenu?: ContextMenu;
  /** @internal */
  parentSubmenu?: ContextSubMenu;
  /** @internal */
  ignoreNextKeyUp?: boolean;
  /** Content */
  children?: React.ReactNode;
}

/** @internal */
interface ContextMenuState {
  selectedIndex: number;
  direction: ContextMenuDirection;
  ignoreNextKeyUp: boolean;
}

/**
 * A context menu populated with [[ContextMenuItem]] components.
 * Can be nested using [[ContextSubMenu]] component.
 * @public
 */
export class ContextMenu extends React.PureComponent<
  ContextMenuProps,
  ContextMenuState
> {
  private _rootElement: HTMLElement | null = null;
  private _menuElement: HTMLElement | null = null;
  private _selectedElement: ContextMenuItem | ContextSubMenu | null = null;
  private _length: number = 0;
  private _hotKeyMap: Map<number, string> = new Map();

  private _lastChildren: React.ReactNode;
  private _lastDirection: ContextMenuDirection | undefined =
    ContextMenuDirection.BottomRight;
  private _lastSelectedIndex: number = 0;
  private _injectedChildren: React.ReactNode;
  private _parentWindowHeight: number = 0;
  private _parentWindowWidth: number = 0;

  public static defaultProps: Partial<ContextMenuProps> = {
    direction: ContextMenuDirection.BottomRight,
    autoflip: true,
    edgeLimit: true,
    hotkeySelect: true,
    selectedIndex: -1,
    floating: true,
  };

  /** @internal */
  public override readonly state: Readonly<ContextMenuState>;
  constructor(props: ContextMenuProps) {
    super(props);
    this.state = {
      selectedIndex: this.props.selectedIndex!,
      direction: props.direction!,
      ignoreNextKeyUp: props.ignoreNextKeyUp!,
    };
  }

  /** @internal */
  public static autoFlip = (
    dir: ContextMenuDirection,
    rect: DOMRectReadOnly,
    windowWidth: number,
    windowHeight: number
  ): ContextMenuDirection => {
    if (rect.right > windowWidth) {
      switch (dir) {
        case ContextMenuDirection.TopRight:
          dir = ContextMenuDirection.TopLeft;
          break;
        case ContextMenuDirection.Right:
          dir = ContextMenuDirection.Left;
          break;
        case ContextMenuDirection.BottomRight:
          dir = ContextMenuDirection.BottomLeft;
          break;
      }
    }
    if (rect.left < 0) {
      switch (dir) {
        case ContextMenuDirection.TopLeft:
          dir = ContextMenuDirection.TopRight;
          break;
        case ContextMenuDirection.Left:
          dir = ContextMenuDirection.Right;
          break;
        case ContextMenuDirection.BottomLeft:
          dir = ContextMenuDirection.BottomRight;
          break;
      }
    }
    if (rect.bottom > windowHeight) {
      switch (dir) {
        case ContextMenuDirection.BottomLeft:
          dir = ContextMenuDirection.TopLeft;
          break;
        case ContextMenuDirection.Bottom:
          dir = ContextMenuDirection.Top;
          break;
        case ContextMenuDirection.BottomRight:
          dir = ContextMenuDirection.TopRight;
          break;
      }
    }
    if (rect.top < 0) {
      switch (dir) {
        case ContextMenuDirection.TopLeft:
          dir = ContextMenuDirection.BottomLeft;
          break;
        case ContextMenuDirection.Top:
          dir = ContextMenuDirection.Bottom;
          break;
        case ContextMenuDirection.TopRight:
          dir = ContextMenuDirection.BottomRight;
          break;
      }
    }
    return dir;
  };

  private _handleHotKeyParsed = (index: number, hotKey: string) => {
    this._hotKeyMap.set(index, hotKey);
  };

  private _handleOnOutsideClick = (event: MouseEvent): void => {
    if (this.props.opened && this.props.onOutsideClick)
      this.props.onOutsideClick(event);
  };

  public override render(): React.ReactElement {
    const {
      opened,
      direction,
      onOutsideClick,
      onSelect,
      onEsc,
      autoflip,
      edgeLimit,
      hotkeySelect,
      selectedIndex,
      floating,
      parentMenu,
      parentSubmenu,
      children,
      className,
      ignoreNextKeyUp,
      ...props
    } = this.props;
    const renderDirection =
      parentMenu === undefined ? this.state.direction : direction;

    if (
      this._lastChildren !== children ||
      this._lastDirection !== renderDirection ||
      this._lastSelectedIndex !== this.state.selectedIndex
    ) {
      this._injectedChildren = this._injectMenuItemProps(
        children,
        renderDirection,
        this.state.selectedIndex
      );
      this._lastChildren = children;
      this._lastDirection = renderDirection;
      this._lastSelectedIndex = this.state.selectedIndex;
    }

    return (
      <div
        role="presentation"
        className={classnames("core-context-menu", className)}
        onKeyUp={this._handleKeyUp}
        onClick={this._handleClick}
        data-testid="core-context-menu-root"
        {...props}
        ref={this._rootRef}
      >
        {/* eslint-disable-next-line deprecation/deprecation */}
        <DivWithOutsideClick onOutsideClick={this._handleOnOutsideClick}>
          <div
            ref={this._menuRef}
            role="menu"
            tabIndex={0}
            data-testid="core-context-menu-container"
            className={classnames(
              "core-context-menu-container",
              opened && "core-context-menu-opened",
              floating && "core-context-menu-floating",
              ContextMenu.getCSSClassNameFromDirection(renderDirection)
            )}
          >
            {this._injectedChildren}
          </div>
        </DivWithOutsideClick>
      </div>
    );
  }

  /** @internal */
  public static getCSSClassNameFromDirection = (
    direction?: ContextMenuDirection
  ): string => {
    let className = "";

    if (direction === undefined) direction = ContextMenuDirection.BottomRight;

    if (direction === ContextMenuDirection.None) return "";

    switch (direction) {
      case ContextMenuDirection.TopLeft:
        className = "core-context-menu-top core-context-menu-left";
        break;
      case ContextMenuDirection.Top:
        className = "core-context-menu-top";
        break;
      case ContextMenuDirection.TopRight:
        className = "core-context-menu-top core-context-menu-right";
        break;
      case ContextMenuDirection.Left:
        className = "core-context-menu-left";
        break;
      case ContextMenuDirection.Center:
        className = "core-context-menu-center";
        break;
      case ContextMenuDirection.Right:
        className = "core-context-menu-right";
        break;
      case ContextMenuDirection.BottomLeft:
        className = "core-context-menu-bottom core-context-menu-left";
        break;
      case ContextMenuDirection.Bottom:
        className = "core-context-menu-bottom";
        break;
      case ContextMenuDirection.BottomRight:
        className = "core-context-menu-bottom core-context-menu-right";
        break;
    }

    return className;
  };

  private _injectMenuItemProps = (
    children: React.ReactNode,
    direction: ContextMenuDirection | undefined,
    selectedIndex: number
  ) => {
    let index = 0;
    // add inheritance data to submenu children
    const ch = React.Children.map(children, (child: React.ReactNode) => {
      // Capture only ContextSubMenus and ContextMenuItems.
      if (
        child &&
        typeof child === "object" &&
        "props" in child &&
        (child.type === ContextSubMenu || child.type === ContextMenuItem) &&
        !ConditionalBooleanValue.getValue(child.props.disabled) &&
        !ConditionalBooleanValue.getValue(child.props.hidden)
      ) {
        const id = index; // get separate id variable so value stays the same when onHover is called later.
        const onHover = () => {
          this.setState({ selectedIndex: id });
          this.focus();
        };
        const ref = (el: ContextSubMenu | ContextMenuItem | null) => {
          if (selectedIndex === id)
            // only save to this._selectedElement if previously captured bool is true
            this._selectedElement = el;
        };
        const boundHandleHotKeyParse = this._handleHotKeyParsed.bind(this, id); // bind local callback for specific index
        const childProps: Partial<
          ContextSubMenuProps & ContextMenuItemProps & { ref: typeof ref }
        > = {
          parentMenu: this,
          ref,
          onHover,
          isSelected: selectedIndex === id,
          onHotKeyParsed: boundHandleHotKeyParse,
        };
        if (child.type === ContextSubMenu) {
          // add direction only to sub-menus
          childProps.direction = child.props.direction || direction;
        }
        index++;
        return React.cloneElement(child, childProps);
      } else return child; // Else, pass through unmodified
    });
    this._length = index;
    return ch;
  };

  private _rootRef = (el: HTMLDivElement | null) => {
    this._rootElement = el;
  };

  private _menuRef = (el: HTMLDivElement | null) => {
    this._menuElement = el;
  };

  private getWindow() {
    const el = this._rootElement ? this._rootElement : this._menuElement;
    const parentDocument = el!.ownerDocument;
    return parentDocument.defaultView ?? window;
  }

  /** @internal */
  public override componentDidMount() {
    const parentWindow = this.getWindow();
    parentWindow.addEventListener("focus", this._handleFocusChange);
    parentWindow.addEventListener("mouseup", this._handleFocusChange);

    this.checkRenderDirection();

    if (this.props.opened) this.focus();
  }

  /** @internal */
  public override componentWillUnmount() {
    const parentWindow = this.getWindow();
    parentWindow.removeEventListener("focus", this._handleFocusChange);
    parentWindow.removeEventListener("mouseup", this._handleFocusChange);
  }

  private checkRenderDirection() {
    const { direction, autoflip, parentMenu } = this.props;
    const parentWindow = this.getWindow();

    let renderDirection =
      parentMenu === undefined ? this.state.direction : direction;

    if (
      parentWindow.innerHeight === this._parentWindowHeight &&
      parentWindow.innerWidth === this._parentWindowWidth
    )
      return;
    this._parentWindowHeight = parentWindow.innerHeight;
    this._parentWindowWidth = parentWindow.innerWidth;

    // check if menu should flip
    if (parentWindow && autoflip && parentMenu === undefined) {
      const menuRect = this.getRect();
      renderDirection = ContextMenu.autoFlip(
        renderDirection!,
        menuRect,
        parentWindow.innerWidth,
        parentWindow.innerHeight
      );
      if (renderDirection !== this.state.direction)
        this.setState({ direction: renderDirection });
    }
  }

  public focus = () => {
    if (this._menuElement) this._menuElement.focus();
  };

  public blur = () => {
    if (this._menuElement) this._menuElement.blur();
  };

  public getRect = (): DOMRect => {
    let clientRect = DOMRect.fromRect({ x: 0, y: 0, width: 0, height: 0 });

    if (this._menuElement) {
      clientRect = this._menuElement.getBoundingClientRect();
    }
    return clientRect;
  };

  private _handleFocusChange = (event: any): void => {
    if (
      this._rootElement &&
      this.props.opened &&
      event.target instanceof Node &&
      this.props.onOutsideClick &&
      !this._rootElement.contains(event.target)
    )
      this.props.onOutsideClick(event);
  };

  private _handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (this.props.onSelect) this.props.onSelect(event);
  };

  private _handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (this.state.ignoreNextKeyUp) {
      this.setState({ ignoreNextKeyUp: false });
      return;
    }

    if (event.key) {
      for (const [key, value] of this._hotKeyMap) {
        if (!this.props.hotkeySelect! && key > this.state.selectedIndex) {
          // Start search at current index.
          if (event.key.toUpperCase() === value) {
            this.setState({ selectedIndex: key });
            return;
          }
        }
      }
      for (const [key, value] of this._hotKeyMap) {
        if (event.key.toUpperCase() === value) {
          this.setState({ selectedIndex: key }, () => {
            if (this.props.hotkeySelect && this._selectedElement) {
              this._selectedElement.select();
            }
          });
          event.stopPropagation();
          return;
        }
      }
    }

    if (event.key === Key.ArrowLeft.valueOf()) {
      event.stopPropagation();
      if (this.props.parentMenu && this.props.parentSubmenu) {
        this.props.parentSubmenu.close();
        this.props.parentMenu.focus();
      }
      if (this.props.onEsc) this.props.onEsc(event);
    }

    if (event.key === Key.Escape.valueOf()) {
      if (this.props.onEsc) this.props.onEsc(event);
    }

    if (
      (event.key === Key.Enter.valueOf() ||
        event.key === Key.ArrowRight.valueOf()) &&
      this._selectedElement
    ) {
      event.stopPropagation();

      if (
        event.key === Key.Enter.valueOf() ||
        this._selectedElement instanceof ContextSubMenu
      ) {
        if (this._selectedElement.select) this._selectedElement.select();
      }
    }

    let { selectedIndex } = this.state;
    if (
      event.key === Key.ArrowUp.valueOf() ||
      event.key === Key.ArrowDown.valueOf()
    ) {
      event.stopPropagation();
      if (selectedIndex === -1) {
        selectedIndex = 0;
      } else {
        if (event.key === Key.ArrowUp.valueOf()) {
          if (this.state.selectedIndex === 0) selectedIndex = this._length - 1;
          else selectedIndex--;
        }
        if (event.key === Key.ArrowDown.valueOf()) {
          if (this.state.selectedIndex === this._length - 1) selectedIndex = 0;
          else selectedIndex++;
        }
      }
    }
    this.setState({ selectedIndex });
  };

  public override componentDidUpdate(prevProps: ContextMenuProps) {
    if (prevProps.selectedIndex !== this.props.selectedIndex) {
      this.setState((_, props) => ({ selectedIndex: props.selectedIndex! }));
    }
    if (!prevProps.opened && this.props.opened) {
      this.setState((_, props) => ({ selectedIndex: props.selectedIndex! }));
    }
    if (!this.props.parentMenu) {
      // const direction = this.props.direction!;
      // if ((!this.props.opened && prevProps.opened && direction !== this.state.direction) || prevProps.direction !== direction)
      this.checkRenderDirection();
    }
  }
}
