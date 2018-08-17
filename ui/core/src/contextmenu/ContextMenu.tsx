/*---------------------------------------------------------------------------------------------
| $Copyright: (c) 2018 Bentley Systems, Incorporated. All rights reserved. $
 *--------------------------------------------------------------------------------------------*/
/** @module ContextMenu */

import * as React from "react";
import * as classnames from "classnames";

import "./ContextMenu.scss";

/** Enum to specify where a ContextMenu should anchor to it's parent element */
export enum ContextMenuDirection {
  Left = 1, Right,
  Mid,
  Top, Bottom,
}

/** Property interface for Context Menu */
export interface ContextMenuProps {
  opened: boolean;
  /**
   * Which direction the menu opens in the horizontal direction
   * Default: ContextMenuDirection.Right
   */
  directionX?: ContextMenuDirection;
  /**
   * Which direction the menu opens in the vertical direction
   * Default: ContextMenuDirection.Bottom
   */
  directionY?: ContextMenuDirection;
  /** When Menu, and all submenus, are unfocused */
  onBlur?: (event: any) => any;
  /** When list item or submenu is selected */
  onSelect?: (event: any) => any;
  /** when Escape button is pressed */
  onEsc?: (data: any) => any;
  style?: React.CSSProperties;
  /**
   * Whether menu flips directions based on screen edge
   * Default: true
   */
  autoflip?: boolean;
  /**
   * Whether menu hugs screen edge when autoflip is off.
   * Default: true
   */
  edgeLimit?: boolean;
  /**
   * starting menu item selected index
   * Default: -1
   */
  selected?: number;
  /**
   * whether menu floats on the viewport, or the page.
   * When false, container elements can clip menu with overflow: hidden;
   * Default: true
   */
  floating?: boolean;
  /** Used by menu for sub menus. */
  parent?: ContextMenu;
  parentSubmenu?: ContextSubMenu;
  /** Used by menu for sub menus. */
  parentWidth?: number;
  /** Used by menu for sub menus. */
  parentHeight?: number;
}

/** @hidden */
export interface ContextMenuState {
  selected: number;
}

/**
 * A context menu populated with ContextMenItem components.
 * Can be nested using ContextSubMenu component.
 */
export class ContextMenu extends React.Component<ContextMenuProps, ContextMenuState> {
  private _rootElement: HTMLElement | null = null;
  private _menuElement: HTMLElement | null = null;
  private _selectedElement: ContextMenuItem | ContextSubMenu | null = null;
  private _length: number = 0;

  public static defaultProps: Partial<ContextMenuProps> = {
    directionX: ContextMenuDirection.Right,
    directionY: ContextMenuDirection.Bottom,
    parentWidth: 0,
    parentHeight: 0,
    autoflip: true,
    edgeLimit: true,
    selected: -1,
    floating: true,
  };

  /** @hidden */
  public readonly state: Readonly<ContextMenuState> = {
    selected: this.props.selected!,
  };

  public render(): JSX.Element {
    const menuStyle: React.CSSProperties = { left: 0, top: 0 };
    let dirX = this.props.directionX!, dirY = this.props.directionY!;
    if (this._rootElement && this._menuElement) {
      const containerRect = this._rootElement.getBoundingClientRect();
      const menuRect = this._menuElement.getBoundingClientRect();

      // check if menu should flip
      if (this.props.autoflip) {
        if (dirX === ContextMenuDirection.Right
          && containerRect.left + menuRect.width + this.props.parentWidth! > window.innerWidth) {
          dirX = ContextMenuDirection.Left;
        }
        if (dirX === ContextMenuDirection.Left
          && containerRect.left - menuRect.width < 0) {
          dirX = ContextMenuDirection.Right;
        }

        if (dirY === ContextMenuDirection.Bottom
          && containerRect.top + menuRect.height + this.props.parentHeight! > window.innerHeight) {
          dirY = ContextMenuDirection.Top;
        }
        if (dirY === ContextMenuDirection.Top
          && containerRect.top - menuRect.height < 0) {
          dirY = ContextMenuDirection.Bottom;
        }
      }

      // generate position based on menu direction
      let left: number = 0, top: number = 0;
      if (dirX === ContextMenuDirection.Right) {
        left = (containerRect.left + this.props.parentWidth!);
      } else if (dirX === ContextMenuDirection.Left) {
        left = containerRect.left - menuRect.width;
      } else if (dirX === ContextMenuDirection.Mid) {
        left = containerRect.left + (this.props.parentWidth! - menuRect.width) / 2;
      }
      if (dirY === ContextMenuDirection.Bottom) {
        top = (containerRect.top + this.props.parentHeight!);
      } else if (dirY === ContextMenuDirection.Top) {
        top = containerRect.top - menuRect.height;
      } else if (dirY === ContextMenuDirection.Mid) {
        top = containerRect.top + (this.props.parentHeight! - menuRect.height) / 2;
      }
      if (this.props.edgeLimit) {
        if (left + menuRect.width > window.innerWidth) {
          left = window.innerWidth - menuRect.width;
        }
        if (left < 0) {
          left = 0;
        }
        if (top + menuRect.height > window.innerHeight) {
          left = window.innerHeight - menuRect.height;
        }
        if (top < 0) {
          top = 0;
        }
      }
      menuStyle.left = left;
      menuStyle.top = top;
      if (!this.props.floating) {
        menuStyle.position = "absolute";
        menuStyle.left -= containerRect.left;
        menuStyle.top -= containerRect.top;
      }
      if (this.props.style && this.props.style.width)
        menuStyle.width = this.props.style.width;
    }

    let index = 0;
    // add inheritance data to submenu children
    const children = React.Children.map(this.props.children, (child) => {
      if (typeof child === "string" || typeof child === "number" || child.props.disabled)
        return child;

      const id = index;
      const onHover = () => {
        this.setState({ selected: id });
        this.focus();
      };
      const ref = (el: any) => {
        if (child.props.ref)
          child.props.ref(el);
        if (selected)
          this._selectedElement = el;
      };
      const selected = this.state.selected === index++;
      if (child.type === ContextSubMenu) {
        return React.cloneElement(child, {
          directionX: child.props.directionX || dirX,
          directionY: child.props.directionY || dirY,
          parent: this,
          ref,
          onHover,
          selected,
        });
      }
      if (child.type === ContextMenuItem) {
        return React.cloneElement(child, {
          parent: this,
          ref,
          onHover,
          selected,
        });
      }
      return child;
    });
    this._length = index;

    return (
      <div style={this.props.style}
        className={"context-menu"}
        onKeyUp={this._handleKeyUp}
        onClick={this._handleClick}
        ref={(el) => { this._rootElement = el; }}>
        <div
          ref={(el) => { this._menuElement = el; }}
          tabIndex={0}
          className={classnames("context-menu-container", { opened: this.props.opened })}
          style={menuStyle}>
          {children}
        </div>
      </div>
    );
  }
  public componentDidMount() {
    window.addEventListener("focus", this._handleFocusChange);
    window.addEventListener("mouseup", this._handleFocusChange);
  }
  public componentWillUnmount() {
    window.removeEventListener("focus", this._handleFocusChange);
    window.removeEventListener("mouseup", this._handleFocusChange);
  }
  public focus = () => {
    if (this._menuElement)
      this._menuElement.focus();
  }

  public blur = () => {
    if (this._menuElement)
      this._menuElement.blur();
  }

  private _handleFocusChange = (event: any) => {
    if (this._rootElement && this.props.opened && event.target instanceof Node && this.props.onBlur && !this._rootElement.contains(event.target))
      this.props.onBlur(event);
  }
  private _handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (this.props.onSelect)
      this.props.onSelect(event);
  }
  private _handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 37) /*<Left>*/ {
      event.stopPropagation();
      if (this.props.parent && this.props.parentSubmenu) {
        this.props.parentSubmenu.close();
        this.props.parent.focus();
      }
      if (this.props.onEsc)
        this.props.onEsc(event);
    }
    if (event.keyCode === 27/*<Esc>*/) {
      if (this.props.onEsc)
        this.props.onEsc(event);
    }
    if ((event.keyCode === 13 /*<Return>*/ || event.keyCode === 39 /*<Right>*/) && this._selectedElement) {
      event.stopPropagation();
      if (event.keyCode === 13 || this._selectedElement instanceof ContextSubMenu) {
        if (this._selectedElement.select)
          this._selectedElement.select();
      }
    }
    let { selected } = this.state;
    if (event.keyCode === 38 /*<Up>*/ || event.keyCode === 40/*<Down>*/) {
      event.stopPropagation();
      if (selected === -1) {
        selected = 0;
      } else {
        if (event.keyCode === 38) /*<Up>*/ {
          if (this.state.selected === 0)
            selected = this._length - 1;
          else
            selected--;
        }
        if (event.keyCode === 40) /*<Down>*/ {
          if (this.state.selected === this._length - 1)
            selected = 0;
          else
            selected++;
        }
      }
    }
    this.setState((_prevState) => ({ selected }));
  }

  public componentDidUpdate(prevProps: ContextMenuProps) {
    if (prevProps.selected !== this.props.selected) {
      this.setState((_prevState, props) => ({ selected: props.selected! }));
    }
    if (!prevProps.opened && this.props.opened) {
      this.setState((_prevState, props) => ({ selected: props.selected! }));
    }
  }
}

export default ContextMenu;

/** Property interface for Context Menu Item */
export interface ContextMenuItemProps {
  onClick?: (event: any) => any;
  className?: string;
  style?: React.CSSProperties;
  /** When item has been chosen, through click or keyboard. */
  onSelect?: (event: any) => any;
  /** Icon to display in the left margin. */
  icon?: string;
  /** Disables any onSelect calls, hover/keyboard highlighting, and grays item. */
  disabled?: boolean;
  /** Used by hover highlighting */
  onHover?: () => any;
  /** Used by hover highlighting */
  selected?: boolean;
  /** Used by keyboard navigation */
  parent?: ContextMenu;
}

/**
 * Menu Item class for use within a ContextMenu component.
 */
export class ContextMenuItem extends React.Component<ContextMenuItemProps> {
  private _root: HTMLElement | null = null;
  public static defaultProps: Partial<ContextMenuItemProps> = {
    disabled: false,
    selected: false,
  };
  constructor(props: ContextMenuItemProps) {
    super(props);
  }
  public render(): JSX.Element {
    return (
      <div
        ref={(el) => { this._root = el; }}
        onClick={this._handleClick}
        style={this.props.style}
        onFocus={this._handleFocus}
        onKeyUp={this._handleKeyUp}
        onMouseOver={this._handleMouseOver}
        className={classnames(this.props.className, "context-menu-item", { disabled: this.props.disabled, selected: this.props.selected })}>
        <div className={classnames("context-menu-icon", "icon", this.props.icon)} />
        <div className={"context-menu-content"}>{this.props.children}</div>
      </div>
    );
  }

  private _handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }

  private _handleMouseOver = (_event: React.MouseEvent<HTMLDivElement>) => {
    if (this._root && this._root.style.visibility !== "hidden" && this.props.onHover) {
      this.props.onHover();
    }
  }

  public select = () => {
    if (this._root) {
      this._root.click();
      if (this.props.parent && this.props.parent.props.parentSubmenu)
        this.props.parent.props.parentSubmenu.close(true);
    }
  }

  private _handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (this.props.onClick)
      this.props.onClick(event);
    if (this.props.onSelect)
      this.props.onSelect(event);
  }
  private _handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13 && this.props.onSelect !== undefined) {
      this.props.onSelect(event);
    }
  }
}

/**
 * Menu Divider for Context Menu. Inserts a line between items, used for list item grouping.
 */
export class ContextMenuDivider extends React.Component {
  public render(): JSX.Element {
    return (
      <div {...this.props} className={"context-menu-divider"}>
      </div>
    );
  }
}

/** Property interface for Context Sub-Menu */
export interface ContextSubMenuProps {
  onClick?: (event: any) => any;
  className?: string;
  style?: React.CSSProperties;
  /** Text/jsx to display in the list item */
  label: string | JSX.Element;
  /** When item has been chosen, through click or keyboard. */
  onSelect?: (event: any) => any;
  /** Icon to display in the left margin. */
  icon?: string;
  /**
   * Disables any onSelect calls, hover/keyboard highlighting, and grays item.
   * Default: false
   */
  disabled?: boolean;
  /**
   * Whether menu flips directions based on screen edge
   * Default: true
   */
  autoflip?: boolean;
  /**
   * Which direction the menu opens in the horizontal direction
   * Default: inherit
   */
  directionX?: ContextMenuDirection;
  /**
   * Which direction the menu opens in the vertical direction
   * Default: inherit
   */
  directionY?: ContextMenuDirection;
  /** Used by hover highlighting */
  onHover?: () => any;
  /** Used by hover highlighting */
  selected?: boolean;
  /** Used by keyboard navigation */
  parent?: ContextMenu;
}

/** @hidden */
export interface ContextSubMenuState {
  opened: boolean;
}

/**
 * Submenu wrapper class for use within a ContextMenu component.
 */
export class ContextSubMenu extends React.Component<ContextSubMenuProps, ContextSubMenuState> {
  private _menuElement: ContextMenu | null = null;
  private _subMenuElement: HTMLElement | null = null;
  private _menuButtonElement: HTMLElement | null = null;

  public static defaultProps: Partial<ContextSubMenuProps> = {
    disabled: false,
    autoflip: true,
    directionX: ContextMenuDirection.Right,
    directionY: ContextMenuDirection.Bottom,
    selected: false,
  };

  /** @hidden */
  public readonly state: Readonly<ContextSubMenuState> = { opened: false };

  public render(): JSX.Element {
    let parentWidth: number = 0;
    let parentHeight: number = 0;
    if (this._subMenuElement) {
      const rect = this._subMenuElement.getBoundingClientRect();
      parentWidth = rect.width;
      parentHeight = -rect.height;
    }
    return (
      <div className={"context-submenu"}
        onMouseOver={this._handleMouseOver}
        ref={(el) => { this._subMenuElement = el; }}>
        <div
          onClick={this._handleClick}
          ref={(el) => { this._menuButtonElement = el; }}
          style={this.props.style}
          className={classnames("context-menu-item context-submenu-container", { disabled: this.props.disabled, selected: this.props.selected })}>
          <div className={classnames("context-menu-icon", "icon", this.props.icon)} />
          <div className={"context-menu-content"}>{this.props.label}</div>
          <div className={classnames("context-submenu-arrow", "icon", "icon-caret-right")} />
        </div>
        <ContextMenu
          ref={(el) => { this._menuElement = el; }}
          opened={this.state.opened}
          selected={0}
          directionX={this.props.directionX}
          directionY={this.props.directionY}
          parent={this.props.parent}
          parentSubmenu={this}
          parentWidth={parentWidth}
          parentHeight={parentHeight}
          autoflip={this.props.autoflip}>
          {this.props.children}
        </ContextMenu>
      </div>
    );
  }
  public componentDidMount() {
    document.addEventListener("click", this._handleClickGlobal);
  }

  public componentWillUnmount() {
    document.removeEventListener("click", this._handleClickGlobal);
  }

  public select = () => {
    this.setState({ opened: true }, () => {
      if (this._menuElement)
        this._menuElement.focus();
    });
  }

  public close = (propagate?: boolean) => {
    this.setState({ opened: false }, () => {
      if (this._menuElement)
        this._menuElement.blur();
    });
    if (propagate && this.props.parent && this.props.parent.props.parentSubmenu) {
      this.props.parent.props.parentSubmenu.close(true);
    }
  }

  private _handleMouseOver = (_event: React.MouseEvent<HTMLDivElement>) => {
    if (this._menuButtonElement && this._menuButtonElement.style.visibility !== "hidden" && this.props.onHover) {
      this.props.onHover();
    }
  }

  private _handleClick = (event: any) => {
    event.stopPropagation();
    if (!this.props.disabled) {
      if (this.props.onClick !== undefined)
        this.props.onClick(event);
      this.setState((prevState) => ({ opened: !prevState.opened }));
    }
  }

  private _handleClickGlobal = (event: any) => {
    if (this._subMenuElement && !this._subMenuElement.contains(event.target))
      this.setState((_prevState) => ({ opened: false }));
  }
}
