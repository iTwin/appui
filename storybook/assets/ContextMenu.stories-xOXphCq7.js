var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-_iMjpMZ4.js";
import { c as classnames, a_ as BadgeType$1, ak as ConditionalBooleanValue, K as Key_enum, a$ as SvgCaretRightSmall, b0 as ContextSubMenu$1, b1 as ContextMenuItem$1 } from "./DefaultToolSettingsProvider-Do4qbEAN.js";
import { r as reactExports } from "./index-DlkhCVTf.js";
import { I as Icon } from "./IconComponent-CTiw7tHs.js";
import { A as AppUiDecorator } from "./Decorators-CXFXT6hr.js";
import "./index-Cm_5MPU1.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./getPrototypeOf-BmmMfuHC.js";
import "./iframe-kR_u1aqe.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
const withOnOutsideClick = (Component, defaultOnOutsideClick, useCapture = true, usePointerEvents = true) => {
  return class WithOnOutsideClick extends reactExports.PureComponent {
    constructor() {
      super(...arguments);
      this.outsideClickContainerDiv = null;
      this.isDownOutside = false;
      this.handleDocumentClick = (e) => {
        if (!this.outsideClickContainerDiv || !(e.target instanceof Node) || this.outsideClickContainerDiv.contains(e.target))
          return;
        return this.onOutsideClick(e);
      };
      this.handleDocumentPointerDown = (e) => {
        this.isDownOutside = true;
        if (this.outsideClickContainerDiv) {
          this.isDownOutside = !!e.target && !this.outsideClickContainerDiv.contains(e.target);
        }
      };
      this.handleDocumentPointerUp = (e) => {
        let isUpOutside = true;
        if (this.outsideClickContainerDiv) {
          isUpOutside = !!e.target && !this.outsideClickContainerDiv.contains(e.target);
        }
        const isOutsideClick = isUpOutside && this.isDownOutside;
        this.isDownOutside = false;
        isOutsideClick && this.onOutsideClick(e);
      };
      this.handleOutsideClickContainerDivSet = (outsideClickContainerDiv) => {
        this.outsideClickContainerDiv = outsideClickContainerDiv;
      };
    }
    /** @internal */
    isInCorePopup(element) {
      if (element.nodeName === "DIV") {
        if (element.classList && element.classList.contains("core-popup"))
          return true;
        if (element.parentElement && this.isInCorePopup(element.parentElement))
          return true;
      } else {
        if (element.parentElement && this.isInCorePopup(element.parentElement))
          return true;
      }
      return false;
    }
    /** @internal */
    onOutsideClick(e) {
      if (e.target instanceof Node && e.target.nodeType === Node.ELEMENT_NODE) {
        if (!this.props.closeOnNestedPopupOutsideClick && this.isInCorePopup(e.target))
          return;
      }
      if (this.props.onOutsideClick)
        return this.props.onOutsideClick(e);
      else if (defaultOnOutsideClick)
        return defaultOnOutsideClick(e);
    }
    getParentDocument() {
      var _a2;
      return ((_a2 = this.outsideClickContainerDiv) == null ? void 0 : _a2.ownerDocument) ?? document;
    }
    componentDidMount() {
      const outsideClickParentDocument = this.getParentDocument();
      if (usePointerEvents) {
        outsideClickParentDocument.addEventListener(
          "pointerdown",
          this.handleDocumentPointerDown,
          useCapture
        );
        outsideClickParentDocument.addEventListener(
          "pointerup",
          this.handleDocumentPointerUp,
          useCapture
        );
      } else
        outsideClickParentDocument.addEventListener(
          "click",
          this.handleDocumentClick,
          useCapture
        );
    }
    /** @internal */
    componentWillUnmount() {
      const outsideClickParentDocument = this.getParentDocument();
      if (usePointerEvents) {
        outsideClickParentDocument.removeEventListener(
          "pointerdown",
          this.handleDocumentPointerDown,
          useCapture
        );
        outsideClickParentDocument.removeEventListener(
          "pointerup",
          this.handleDocumentPointerUp,
          useCapture
        );
      } else
        outsideClickParentDocument.removeEventListener(
          "click",
          this.handleDocumentClick,
          useCapture
        );
    }
    render() {
      const { onOutsideClick, closeOnNestedPopupOutsideClick, ...props } = this.props;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: this.handleOutsideClickContainerDivSet, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Component, { ...props }) });
    }
  };
};
try {
  withOnOutsideClick.displayName = "withOnOutsideClick";
  withOnOutsideClick.__docgenInfo = { "description": "withOnOutsideClick is a React higher-order component that adds outside click support.", "displayName": "withOnOutsideClick", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
const DivWithOutsideClick = withOnOutsideClick(
  (props) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...props })
);
try {
  DivWithOutsideClick.displayName = "DivWithOutsideClick";
  DivWithOutsideClick.__docgenInfo = { "description": "Div element with Outside Click behavior", "displayName": "DivWithOutsideClick", "props": { "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "onOutsideClick": { "defaultValue": null, "description": "Outside click callback function", "name": "onOutsideClick", "required": false, "type": { "name": "((event: MouseEvent) => any)" } }, "closeOnNestedPopupOutsideClick": { "defaultValue": null, "description": "If false outside click processing and closing are skipped if click occurs in another Popup component, default to false.", "name": "closeOnNestedPopupOutsideClick", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
var ContextMenuDirection = /* @__PURE__ */ ((ContextMenuDirection2) => {
  ContextMenuDirection2["None"] = "";
  ContextMenuDirection2["TopLeft"] = "top left";
  ContextMenuDirection2["Top"] = "top";
  ContextMenuDirection2["TopRight"] = "top right";
  ContextMenuDirection2["Left"] = "left";
  ContextMenuDirection2["Center"] = "center";
  ContextMenuDirection2["Right"] = "right";
  ContextMenuDirection2["BottomLeft"] = "bottom left";
  ContextMenuDirection2["Bottom"] = "bottom";
  ContextMenuDirection2["BottomRight"] = "bottom right";
  return ContextMenuDirection2;
})(ContextMenuDirection || {});
class Badge extends reactExports.PureComponent {
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: classnames("core-badge", this.props.className),
        style: this.props.style,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: this.props.svg })
      }
    );
  }
}
try {
  Badge.displayName = "Badge";
  Badge.__docgenInfo = { "description": "Beta Badge React component", "displayName": "Badge", "props": { "svg": { "defaultValue": null, "description": "", "name": "svg", "required": true, "type": { "name": "any" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const betaBadgeIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2016%2016'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='8'%20y1='15'%20x2='8'%20y2='1'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23ffc335'/%3e%3cstop%20offset='1'%20stop-color='%23ffdf52'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20d='M15,1V15L1,1H15'%20fill='url(%23a)'/%3e%3cpath%20d='M15,1V15L1,1H15m0-1H1A.87458.87458,0,0,0,.1.6.91284.91284,0,0,0,.3,1.7l14,14a.90783.90783,0,0,0,.7.3.60123.60123,0,0,0,.4-.1A.961.961,0,0,0,16,15V1A.94477.94477,0,0,0,15,0Z'%20fill='%23ffc000'/%3e%3ccircle%20cx='11'%20cy='5'%20r='2'%20opacity='0.9'%20style='isolation:isolate'/%3e%3c/svg%3e";
function BetaBadge(props) {
  const className = classnames("core-badge-betaBadge", props.className);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { ...props, svg: betaBadgeIcon, className });
}
try {
  BetaBadge.displayName = "BetaBadge";
  BetaBadge.__docgenInfo = { "description": "Beta Badge React component", "displayName": "BetaBadge", "props": { "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const newBadgeIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20enable-background='new%200%200%2016%2016'%3e%3cpath%20d='m15%200h-14c-.4%200-.8.2-.9.6s-.1.8.2%201.1l14%2014c.2.2.4.3.7.3.1%200%20.3%200%20.4-.1.4-.2.6-.5.6-.9v-14c0-.6-.4-1-1-1m-4%207c-1.1%200-2-.9-2-2s.9-2%202-2%202%20.9%202%202-.9%202-2%202'/%3e%3c/svg%3e";
function NewBadge(props) {
  const { className, ...badgeProps } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      ...badgeProps,
      className: classnames("core-new-badge", className),
      svg: newBadgeIcon
    }
  );
}
try {
  NewBadge.displayName = "NewBadge";
  NewBadge.__docgenInfo = { "description": "New Badge React component", "displayName": "NewBadge", "props": { "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const BadgeType = BadgeType$1;
class BadgeUtilities {
  /** Converts BetaType to Badge React component */
  static getComponentForBadgeType(badgeType) {
    if (badgeType === void 0)
      return void 0;
    let component;
    switch (badgeType) {
      case BadgeType.TechnicalPreview:
        component = /* @__PURE__ */ jsxRuntimeExports.jsx(BetaBadge, {});
        break;
      case BadgeType.New:
        component = /* @__PURE__ */ jsxRuntimeExports.jsx(NewBadge, {});
        break;
      case BadgeType.None:
        component = void 0;
        break;
    }
    return component;
  }
}
try {
  BadgeType.displayName = "BadgeType";
  BadgeType.__docgenInfo = { "description": "Specifies type of badge, if any, that should be overlaid on UI component.", "displayName": "BadgeType", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  BadgeUtilities.displayName = "BadgeUtilities";
  BadgeUtilities.__docgenInfo = { "description": "Converts BadgeType to Badge React component", "displayName": "BadgeUtilities", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
const _TildeFinder = class _TildeFinder {
};
_TildeFinder.findAfterTilde = (node) => {
  if (typeof node === "string") {
    const tildeIndex = node.indexOf("~");
    if (tildeIndex !== -1 && tildeIndex <= node.length - 2) {
      const ch = node.charAt(tildeIndex + 1);
      const s1 = node.substring(0, tildeIndex);
      const n = /* @__PURE__ */ jsxRuntimeExports.jsx("u", { children: ch }, "hotkey");
      const s2 = node.substring(tildeIndex + 2);
      return { character: ch.toUpperCase(), node: [s1, n, s2] };
    }
  } else if (node && typeof node === "object") {
    if (Array.isArray(node)) {
      let ret = {
        character: void 0,
        node
      };
      node = node.map((child) => {
        const r = _TildeFinder.findAfterTilde(child);
        if (r.character) {
          ret = r;
          return r.node;
        }
        return child;
      });
      if (ret.character) {
        return { character: ret.character, node };
      }
    } else if ("props" in node) {
      const ret = {
        character: void 0,
        node
      };
      ret.node = reactExports.cloneElement(node, {
        children: reactExports.Children.map(
          node.props.children,
          (child) => {
            const r = _TildeFinder.findAfterTilde(child);
            if (r.character) {
              ret.character = r.character;
              return r.node;
            }
            return child;
          }
        )
      });
      if (ret.character) {
        return ret;
      }
    }
  }
  return { character: void 0, node };
};
let TildeFinder = _TildeFinder;
try {
  TildeFinder.displayName = "TildeFinder";
  TildeFinder.__docgenInfo = { "description": "Finds a tilde character in ContextMenu item label for hot key support", "displayName": "TildeFinder", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  TildeFinder.findAfterTilde.displayName = "TildeFinder.findAfterTilde";
  TildeFinder.findAfterTilde.__docgenInfo = { "description": "Find character following a tilde character within a React.ReactNode.", "displayName": "TildeFinder.findAfterTilde", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
const _ContextMenuItem = class _ContextMenuItem extends reactExports.PureComponent {
  constructor(props) {
    super(props);
    this._root = null;
    this.state = {};
    this._updateHotkey = (node) => {
      let hotKey;
      const isDisabled = ConditionalBooleanValue.getValue(this.props.disabled);
      const isHidden = ConditionalBooleanValue.getValue(this.props.hidden);
      if (!isDisabled && !isHidden)
        hotKey = TildeFinder.findAfterTilde(node).character;
      else
        hotKey = void 0;
      if (hotKey && hotKey !== this.state.hotKey) {
        this.setState({ hotKey });
        if (this.props.onHotKeyParsed)
          this.props.onHotKeyParsed(hotKey);
      }
    };
    this._handleFocus = (event) => {
      event.stopPropagation();
    };
    this._handleMouseOver = (_event) => {
      if (this._root && this._root.style.visibility !== "hidden" && this.props.onHover) {
        this.props.onHover();
      }
    };
    this.select = () => {
      if (this._root) {
        this._root.click();
        if (this.props.parentMenu && this.props.parentMenu.props.parentSubmenu)
          this.props.parentMenu.props.parentSubmenu.close(true);
      }
    };
    this._handleClick = (event) => {
      const isDisabled = ConditionalBooleanValue.getValue(this.props.disabled);
      if (isDisabled)
        return;
      if (this.props.onClick)
        this.props.onClick(event);
      if (this.props.onSelect)
        this.props.onSelect(event);
    };
    this._handleKeyUp = (event) => {
      const isDisabled = ConditionalBooleanValue.getValue(this.props.disabled);
      if (event.key === Key_enum.Key.Enter.valueOf() && this.props.onSelect !== void 0 && !isDisabled) {
        this.props.onSelect(event);
      }
    };
  }
  render() {
    const {
      onClick,
      className,
      style,
      onSelect,
      icon,
      disabled,
      hidden,
      onHover,
      isSelected,
      parentMenu,
      onHotKeyParsed,
      badgeType,
      iconRight,
      hideIconContainer,
      ...props
    } = this.props;
    const badge = BadgeUtilities.getComponentForBadgeType(badgeType);
    const isDisabled = ConditionalBooleanValue.getValue(disabled);
    const isHidden = ConditionalBooleanValue.getValue(hidden);
    if (this._lastChildren !== this.props.children) {
      this._parsedChildren = TildeFinder.findAfterTilde(
        this.props.children
      ).node;
      this._lastChildren = this.props.children;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ...props,
        ref: (el) => {
          this._root = el;
        },
        onClick: this._handleClick,
        style,
        onFocus: this._handleFocus,
        onKeyUp: this._handleKeyUp,
        onMouseOver: this._handleMouseOver,
        "data-testid": "core-context-menu-item",
        className: classnames(
          "core-context-menu-item",
          className,
          isDisabled && "core-context-menu-disabled",
          isHidden && "core-context-menu-hidden",
          isSelected && "core-context-menu-is-selected"
        ),
        role: "menuitem",
        tabIndex: isSelected ? 0 : -1,
        "aria-disabled": isDisabled,
        "aria-hidden": isHidden,
        children: [
          !hideIconContainer && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core-context-menu-icon", children: icon !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: icon }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core-context-menu-content", children: this._parsedChildren }),
          iconRight && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: classnames(
                "core-context-menu-icon",
                "core-context-menu-icon-right"
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: iconRight })
            }
          ),
          badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core-context-menu-badge", children: badge })
        ]
      }
    );
  }
  componentDidMount() {
    this._updateHotkey(this.props.children);
  }
  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children) {
      this._updateHotkey(this.props.children);
    }
  }
};
_ContextMenuItem.defaultProps = {
  disabled: false,
  hidden: false,
  isSelected: false
};
let ContextMenuItem = _ContextMenuItem;
try {
  ContextMenuItem.displayName = "ContextMenuItem";
  ContextMenuItem.__docgenInfo = { "description": "Menu Item class for use within a [[ContextMenu]] component.", "displayName": "ContextMenuItem", "props": { "onSelect": { "defaultValue": null, "description": "", "name": "onSelect", "required": false, "type": { "name": "((event: any) => any)" } }, "onHotKeyParsed": { "defaultValue": null, "description": "@internal", "name": "onHotKeyParsed", "required": false, "type": { "name": "((hotKey: string) => void)" } }, "icon": { "defaultValue": null, "description": "Icon to display in the left margin.", "name": "icon", "required": false, "type": { "name": "IconSpec" } }, "disabled": { "defaultValue": { value: "false" }, "description": "Disables any onSelect calls, hover/keyboard highlighting, and grays item.", "name": "disabled", "required": false, "type": { "name": "boolean | ConditionalBooleanValue" } }, "hidden": { "defaultValue": { value: "false" }, "description": "Indicates whether the item is visible or hidden. The default is for the item to be visible.", "name": "hidden", "required": false, "type": { "name": "boolean | ConditionalBooleanValue" } }, "badgeType": { "defaultValue": null, "description": "Badge to be overlaid on the item.", "name": "badgeType", "required": false, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }, { "value": "2" }] } }, "iconRight": { "defaultValue": null, "description": "Icon to display in the right margin.", "name": "iconRight", "required": false, "type": { "name": "IconSpec" } }, "hideIconContainer": { "defaultValue": null, "description": "Hide the icon container. This can be used to eliminate space used to display an icon at the left of the menu item.", "name": "hideIconContainer", "required": false, "type": { "name": "boolean" } }, "onHover": { "defaultValue": null, "description": "@internal", "name": "onHover", "required": false, "type": { "name": "(() => any)" } }, "isSelected": { "defaultValue": { value: "false" }, "description": "", "name": "isSelected", "required": false, "type": { "name": "boolean" } }, "parentMenu": { "defaultValue": null, "description": "@internal", "name": "parentMenu", "required": false, "type": { "name": "ContextMenu" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const _ContextSubMenu = class _ContextSubMenu extends reactExports.Component {
  constructor(props) {
    super(props);
    this._menuElement = null;
    this._subMenuElement = null;
    this._menuButtonElement = null;
    this._updateHotkey = (node) => {
      let hotKey;
      const isDisabled = ConditionalBooleanValue.getValue(this.props.disabled);
      const isHidden = ConditionalBooleanValue.getValue(this.props.hidden);
      if (!isDisabled && !isHidden)
        hotKey = TildeFinder.findAfterTilde(node).character;
      else
        hotKey = void 0;
      if (hotKey && hotKey !== this.state.hotKey) {
        this.setState({ hotKey });
        if (this.props.onHotKeyParsed)
          this.props.onHotKeyParsed(hotKey);
      }
    };
    this.select = () => {
      this.setState({ opened: true }, () => {
        if (this._menuElement)
          this._menuElement.focus();
        if (this.props.onSelect !== void 0)
          this.props.onSelect(void 0);
      });
    };
    this.close = (propagate) => {
      this.setState({ opened: false }, () => {
        if (this._menuElement)
          this._menuElement.blur();
      });
      if (propagate && this.props.parentMenu && this.props.parentMenu.props.parentSubmenu) {
        this.props.parentMenu.props.parentSubmenu.close(true);
      }
    };
    this._handleMouseOver = (_event) => {
      if (this._menuButtonElement && this._menuButtonElement.style.visibility !== "hidden" && this.props.onHover) {
        this.props.onHover();
      }
    };
    this._handleClick = (event) => {
      event.stopPropagation();
      const isDisabled = ConditionalBooleanValue.getValue(this.props.disabled);
      if (!isDisabled) {
        if (this.props.onClick !== void 0)
          this.props.onClick(event);
        if (this.props.opened)
          this.close();
        else
          this.select();
      }
    };
    this._handleClickGlobal = (event) => {
      if (this._subMenuElement && !this._subMenuElement.contains(event.target))
        this.setState((_prevState) => ({ opened: false }));
    };
    this.state = {
      opened: false,
      direction: props.direction
    };
  }
  render() {
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
      ...props
    } = this.props;
    const onOutsideClickWrapper = (event) => {
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
      parentMenu
    };
    const badge = BadgeUtilities.getComponentForBadgeType(badgeType);
    const renderDirection = this.state.direction;
    const isDisabled = ConditionalBooleanValue.getValue(disabled);
    const isHidden = ConditionalBooleanValue.getValue(hidden);
    if (this._lastLabel !== label) {
      this._parsedLabel = TildeFinder.findAfterTilde(label).node;
      this._lastLabel = label;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: classnames(
          "core-context-submenu",
          ContextMenu.getCSSClassNameFromDirection(renderDirection),
          className
        ),
        onMouseOver: this._handleMouseOver,
        ref: (el) => {
          this._subMenuElement = el;
        },
        "data-testid": "core-context-submenu",
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              onClick: this._handleClick,
              ref: (el) => {
                this._menuButtonElement = el;
              },
              className: classnames(
                "core-context-menu-item",
                "core-context-submenu-container",
                isDisabled && "core-context-menu-disabled",
                isHidden && "core-context-menu-hidden",
                isSelected && "core-context-menu-is-selected"
              ),
              "data-testid": "core-context-submenu-container",
              role: "menuitem",
              tabIndex: isSelected ? 0 : -1,
              "aria-disabled": isDisabled,
              "aria-hidden": isHidden,
              "aria-haspopup": true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: classnames("core-context-menu-icon", "icon", icon) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core-context-menu-content", children: this._parsedLabel }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: classnames("core-context-submenu-arrow", "icon"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCaretRightSmall, {}) }) }),
                badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core-context-menu-badge", children: badge })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ContextMenu,
            {
              ref: (el) => {
                this._menuElement = el;
              },
              className: "core-context-submenu-popup",
              opened: this.state.opened,
              direction: renderDirection,
              parentSubmenu: this,
              ...contextMenuProps,
              children
            }
          )
        ]
      }
    );
  }
  componentDidMount() {
    document.addEventListener("click", this._handleClickGlobal);
    this._updateHotkey(this.props.label);
    this.checkRenderDirection();
  }
  componentWillUnmount() {
    document.removeEventListener("click", this._handleClickGlobal);
  }
  componentDidUpdate(prevProps, prevState) {
    const direction = this.props.direction;
    if (this.state.opened !== prevState.opened && direction !== this.state.direction || prevProps.direction !== direction)
      this.checkRenderDirection();
    if (this.props.label !== prevProps.label) {
      this._updateHotkey(this.props.label);
    }
  }
  getWindow() {
    const el = this._subMenuElement;
    const parentDocument = el.ownerDocument;
    return parentDocument.defaultView;
  }
  checkRenderDirection() {
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
};
_ContextSubMenu.defaultProps = {
  direction: ContextMenuDirection.BottomRight,
  disabled: false,
  hidden: false,
  autoflip: true,
  isSelected: false,
  selectedIndex: 0
};
let ContextSubMenu = _ContextSubMenu;
try {
  ContextSubMenu.displayName = "ContextSubMenu";
  ContextSubMenu.__docgenInfo = { "description": "Submenu wrapper class for use within a [[ContextMenu]] component.", "displayName": "ContextSubMenu", "props": { "label": { "defaultValue": null, "description": "Text/jsx to display in the list item", "name": "label", "required": true, "type": { "name": "string | ReactElement<any, string | JSXElementConstructor<any>>" } }, "onHotKeyParsed": { "defaultValue": null, "description": "@internal", "name": "onHotKeyParsed", "required": false, "type": { "name": "((hotKey: string) => void)" } }, "disabled": { "defaultValue": { value: "false" }, "description": "Disables any onSelect calls, hover/keyboard highlighting, and grays item.", "name": "disabled", "required": false, "type": { "name": "boolean | ConditionalBooleanValue" } }, "hidden": { "defaultValue": { value: "false" }, "description": "Indicates whether the item is visible or hidden. The default is for the item to be visible.", "name": "hidden", "required": false, "type": { "name": "boolean | ConditionalBooleanValue" } }, "onSelect": { "defaultValue": null, "description": "", "name": "onSelect", "required": false, "type": { "name": "((event: any) => any)" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "parentMenu": { "defaultValue": null, "description": "@internal", "name": "parentMenu", "required": false, "type": { "name": "ContextMenu" } }, "isSelected": { "defaultValue": { value: "false" }, "description": "", "name": "isSelected", "required": false, "type": { "name": "boolean" } }, "icon": { "defaultValue": null, "description": "Icon to display in the left margin.", "name": "icon", "required": false, "type": { "name": "IconSpec" } }, "badgeType": { "defaultValue": null, "description": "Badge to be overlaid on the item.", "name": "badgeType", "required": false, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }, { "value": "2" }] } }, "iconRight": { "defaultValue": null, "description": "Icon to display in the right margin.", "name": "iconRight", "required": false, "type": { "name": "IconSpec" } }, "hideIconContainer": { "defaultValue": null, "description": "Hide the icon container. This can be used to eliminate space used to display an icon at the left of the menu item.", "name": "hideIconContainer", "required": false, "type": { "name": "boolean" } }, "onHover": { "defaultValue": null, "description": "@internal", "name": "onHover", "required": false, "type": { "name": "(() => any)" } }, "opened": { "defaultValue": null, "description": "Whether ContextMenu is currently opened.", "name": "opened", "required": true, "type": { "name": "boolean" } }, "direction": { "defaultValue": { value: "ContextMenuDirection.BottomRight" }, "description": "Which direction the menu opens. Default: ContextMenuDirection.BottomRight", "name": "direction", "required": false, "type": { "name": "enum", "value": [{ "value": '""' }, { "value": '"top left"' }, { "value": '"top"' }, { "value": '"top right"' }, { "value": '"left"' }, { "value": '"center"' }, { "value": '"right"' }, { "value": '"bottom left"' }, { "value": '"bottom"' }, { "value": '"bottom right"' }] } }, "onOutsideClick": { "defaultValue": null, "description": "When click is registered outside of ContextMenu.", "name": "onOutsideClick", "required": false, "type": { "name": "((event: MouseEvent) => any)" } }, "onEsc": { "defaultValue": null, "description": "when Escape button is pressed", "name": "onEsc", "required": false, "type": { "name": "((data: any) => any)" } }, "autoflip": { "defaultValue": { value: "true" }, "description": "Whether menu flips directions based on screen edge. Default: true", "name": "autoflip", "required": false, "type": { "name": "boolean" } }, "edgeLimit": { "defaultValue": null, "description": "Whether menu hugs screen edge when autoflip is off. Default: true", "name": "edgeLimit", "required": false, "type": { "name": "boolean" } }, "hotkeySelect": { "defaultValue": null, "description": "Whether Hotkey press selects item, or just highlights item. Default: true", "name": "hotkeySelect", "required": false, "type": { "name": "boolean" } }, "selectedIndex": { "defaultValue": { value: "0" }, "description": "starting menu item selected index Default: -1", "name": "selectedIndex", "required": false, "type": { "name": "number" } }, "floating": { "defaultValue": null, "description": "whether menu floats on the viewport, or the page. When false, container elements can clip menu with overflow: hidden; Default: true", "name": "floating", "required": false, "type": { "name": "boolean" } }, "parentSubmenu": { "defaultValue": null, "description": "@internal", "name": "parentSubmenu", "required": false, "type": { "name": "ContextSubMenu" } }, "ignoreNextKeyUp": { "defaultValue": null, "description": "@internal", "name": "ignoreNextKeyUp", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const _ContextMenu = class _ContextMenu extends reactExports.PureComponent {
  constructor(props) {
    super(props);
    this._rootElement = null;
    this._menuElement = null;
    this._selectedElement = null;
    this._length = 0;
    this._hotKeyMap = /* @__PURE__ */ new Map();
    this._lastDirection = ContextMenuDirection.BottomRight;
    this._lastSelectedIndex = 0;
    this._parentWindowHeight = 0;
    this._parentWindowWidth = 0;
    this._handleHotKeyParsed = (index, hotKey) => {
      this._hotKeyMap.set(index, hotKey);
    };
    this._handleOnOutsideClick = (event) => {
      if (this.props.opened && this.props.onOutsideClick)
        this.props.onOutsideClick(event);
    };
    this._injectMenuItemProps = (children, direction, selectedIndex) => {
      let index = 0;
      const ch = reactExports.Children.map(children, (child) => {
        if (child && typeof child === "object" && "props" in child && (child.type === ContextSubMenu || child.type === ContextMenuItem) && !ConditionalBooleanValue.getValue(child.props.disabled) && !ConditionalBooleanValue.getValue(child.props.hidden)) {
          const id = index;
          const onHover = () => {
            this.setState({ selectedIndex: id });
            this.focus();
          };
          const ref = (el) => {
            if (selectedIndex === id)
              this._selectedElement = el;
          };
          const boundHandleHotKeyParse = this._handleHotKeyParsed.bind(this, id);
          const childProps = {
            parentMenu: this,
            ref,
            onHover,
            isSelected: selectedIndex === id,
            onHotKeyParsed: boundHandleHotKeyParse
          };
          if (child.type === ContextSubMenu) {
            childProps.direction = child.props.direction || /* istanbul ignore next */
            direction;
          }
          index++;
          return reactExports.cloneElement(child, childProps);
        } else
          return child;
      });
      this._length = index;
      return ch;
    };
    this._rootRef = (el) => {
      this._rootElement = el;
    };
    this._menuRef = (el) => {
      this._menuElement = el;
    };
    this.focus = () => {
      if (this._menuElement)
        this._menuElement.focus();
    };
    this.blur = () => {
      if (this._menuElement)
        this._menuElement.blur();
    };
    this.getRect = () => {
      let clientRect = DOMRect.fromRect({ x: 0, y: 0, width: 0, height: 0 });
      if (this._menuElement) {
        clientRect = this._menuElement.getBoundingClientRect();
      }
      return clientRect;
    };
    this._handleFocusChange = (event) => {
      if (this._rootElement && this.props.opened && event.target instanceof Node && this.props.onOutsideClick && !this._rootElement.contains(event.target))
        this.props.onOutsideClick(event);
    };
    this._handleClick = (event) => {
      if (this.props.onSelect)
        this.props.onSelect(event);
    };
    this._handleKeyUp = (event) => {
      if (this.state.ignoreNextKeyUp) {
        this.setState({ ignoreNextKeyUp: false });
        return;
      }
      if (event.key) {
        for (const [key, value] of this._hotKeyMap) {
          if (!this.props.hotkeySelect && key > this.state.selectedIndex) {
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
      if (event.key === Key_enum.Key.ArrowLeft.valueOf()) {
        event.stopPropagation();
        if (this.props.parentMenu && this.props.parentSubmenu) {
          this.props.parentSubmenu.close();
          this.props.parentMenu.focus();
        }
        if (this.props.onEsc)
          this.props.onEsc(event);
      }
      if (event.key === Key_enum.Key.Escape.valueOf()) {
        if (this.props.onEsc)
          this.props.onEsc(event);
      }
      if ((event.key === Key_enum.Key.Enter.valueOf() || event.key === Key_enum.Key.ArrowRight.valueOf()) && this._selectedElement) {
        event.stopPropagation();
        if (event.key === Key_enum.Key.Enter.valueOf() || /* istanbul ignore next */
        this._selectedElement instanceof ContextSubMenu) {
          if (this._selectedElement.select)
            this._selectedElement.select();
        }
      }
      let { selectedIndex } = this.state;
      if (event.key === Key_enum.Key.ArrowUp.valueOf() || event.key === Key_enum.Key.ArrowDown.valueOf()) {
        event.stopPropagation();
        if (selectedIndex === -1) {
          selectedIndex = 0;
        } else {
          if (event.key === Key_enum.Key.ArrowUp.valueOf()) {
            if (this.state.selectedIndex === 0)
              selectedIndex = this._length - 1;
            else
              selectedIndex--;
          }
          if (event.key === Key_enum.Key.ArrowDown.valueOf()) {
            if (this.state.selectedIndex === this._length - 1)
              selectedIndex = 0;
            else
              selectedIndex++;
          }
        }
      }
      this.setState({ selectedIndex });
    };
    this.state = {
      selectedIndex: this.props.selectedIndex,
      direction: props.direction,
      ignoreNextKeyUp: props.ignoreNextKeyUp
    };
  }
  render() {
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
    const renderDirection = parentMenu === void 0 ? this.state.direction : direction;
    if (this._lastChildren !== children || this._lastDirection !== renderDirection || this._lastSelectedIndex !== this.state.selectedIndex) {
      this._injectedChildren = this._injectMenuItemProps(
        children,
        renderDirection,
        this.state.selectedIndex
      );
      this._lastChildren = children;
      this._lastDirection = renderDirection;
      this._lastSelectedIndex = this.state.selectedIndex;
    }
    const classNames = classnames("core-context-menu", className);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "presentation",
        className: classNames,
        onKeyUp: this._handleKeyUp,
        onClick: this._handleClick,
        "data-testid": "core-context-menu-root",
        ...props,
        ref: this._rootRef,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(DivWithOutsideClick, { onOutsideClick: this._handleOnOutsideClick, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: this._menuRef,
            role: "menu",
            tabIndex: 0,
            "data-testid": "core-context-menu-container",
            className: classnames(
              "core-context-menu-container",
              opened && "core-context-menu-opened",
              floating && "core-context-menu-floating",
              _ContextMenu.getCSSClassNameFromDirection(renderDirection)
            ),
            children: this._injectedChildren
          }
        ) })
      }
    );
  }
  getWindow() {
    const el = this._rootElement ? this._rootElement : (
      /* istanbul ignore next */
      this._menuElement
    );
    const parentDocument = el.ownerDocument;
    return parentDocument.defaultView ?? window;
  }
  /** @internal */
  componentDidMount() {
    const parentWindow = this.getWindow();
    parentWindow.addEventListener("focus", this._handleFocusChange);
    parentWindow.addEventListener("mouseup", this._handleFocusChange);
    this.checkRenderDirection();
    if (this.props.opened)
      this.focus();
  }
  /** @internal */
  componentWillUnmount() {
    const parentWindow = this.getWindow();
    parentWindow.removeEventListener("focus", this._handleFocusChange);
    parentWindow.removeEventListener("mouseup", this._handleFocusChange);
  }
  checkRenderDirection() {
    const { direction, autoflip, parentMenu } = this.props;
    const parentWindow = this.getWindow();
    let renderDirection = parentMenu === void 0 ? this.state.direction : direction;
    if (parentWindow.innerHeight === this._parentWindowHeight && parentWindow.innerWidth === this._parentWindowWidth)
      return;
    this._parentWindowHeight = parentWindow.innerHeight;
    this._parentWindowWidth = parentWindow.innerWidth;
    if (parentWindow && autoflip && parentMenu === void 0) {
      const menuRect = this.getRect();
      renderDirection = _ContextMenu.autoFlip(
        renderDirection,
        menuRect,
        parentWindow.innerWidth,
        parentWindow.innerHeight
      );
      if (renderDirection !== this.state.direction)
        this.setState({ direction: renderDirection });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedIndex !== this.props.selectedIndex) {
      this.setState((_, props) => ({ selectedIndex: props.selectedIndex }));
    }
    if (!prevProps.opened && this.props.opened) {
      this.setState((_, props) => ({ selectedIndex: props.selectedIndex }));
    }
    if (!this.props.parentMenu) {
      this.checkRenderDirection();
    }
  }
};
_ContextMenu.defaultProps = {
  direction: ContextMenuDirection.BottomRight,
  autoflip: true,
  edgeLimit: true,
  hotkeySelect: true,
  selectedIndex: -1,
  floating: true
};
_ContextMenu.autoFlip = (dir, rect, windowWidth, windowHeight) => {
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
_ContextMenu.getCSSClassNameFromDirection = (direction) => {
  let className = "";
  if (direction === void 0)
    direction = ContextMenuDirection.BottomRight;
  if (direction === ContextMenuDirection.None)
    return "";
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
let ContextMenu = _ContextMenu;
try {
  ContextMenu.displayName = "ContextMenu";
  ContextMenu.__docgenInfo = { "description": "A context menu populated with [[ContextMenuItem]] components.\nCan be nested using [[ContextSubMenu]] component.", "displayName": "ContextMenu", "props": { "opened": { "defaultValue": null, "description": "Whether ContextMenu is currently opened.", "name": "opened", "required": true, "type": { "name": "boolean" } }, "direction": { "defaultValue": { value: "ContextMenuDirection.BottomRight" }, "description": "Which direction the menu opens. Default: ContextMenuDirection.BottomRight", "name": "direction", "required": false, "type": { "name": "enum", "value": [{ "value": '""' }, { "value": '"top left"' }, { "value": '"top"' }, { "value": '"top right"' }, { "value": '"left"' }, { "value": '"center"' }, { "value": '"right"' }, { "value": '"bottom left"' }, { "value": '"bottom"' }, { "value": '"bottom right"' }] } }, "onOutsideClick": { "defaultValue": null, "description": "When click is registered outside of ContextMenu.", "name": "onOutsideClick", "required": false, "type": { "name": "((event: MouseEvent) => any)" } }, "onSelect": { "defaultValue": null, "description": "When list item or submenu is selected", "name": "onSelect", "required": false, "type": { "name": "((event: any) => any)" } }, "onEsc": { "defaultValue": null, "description": "when Escape button is pressed", "name": "onEsc", "required": false, "type": { "name": "((data: any) => any)" } }, "autoflip": { "defaultValue": { value: "true" }, "description": "Whether menu flips directions based on screen edge. Default: true", "name": "autoflip", "required": false, "type": { "name": "boolean" } }, "edgeLimit": { "defaultValue": { value: "true" }, "description": "Whether menu hugs screen edge when autoflip is off. Default: true", "name": "edgeLimit", "required": false, "type": { "name": "boolean" } }, "hotkeySelect": { "defaultValue": { value: "true" }, "description": "Whether Hotkey press selects item, or just highlights item. Default: true", "name": "hotkeySelect", "required": false, "type": { "name": "boolean" } }, "selectedIndex": { "defaultValue": { value: "-1" }, "description": "starting menu item selected index Default: -1", "name": "selectedIndex", "required": false, "type": { "name": "number" } }, "floating": { "defaultValue": { value: "true" }, "description": "whether menu floats on the viewport, or the page. When false, container elements can clip menu with overflow: hidden; Default: true", "name": "floating", "required": false, "type": { "name": "boolean" } }, "parentMenu": { "defaultValue": null, "description": "@internal", "name": "parentMenu", "required": false, "type": { "name": "ContextMenu" } }, "parentSubmenu": { "defaultValue": null, "description": "@internal", "name": "parentSubmenu", "required": false, "type": { "name": "ContextSubMenu" } }, "ignoreNextKeyUp": { "defaultValue": null, "description": "@internal", "name": "ignoreNextKeyUp", "required": false, "type": { "name": "boolean" } }, "children": { "defaultValue": null, "description": "Content", "name": "children", "required": false, "type": { "name": "ReactNode" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  ContextMenu.getCSSClassNameFromDirection.displayName = "ContextMenu.getCSSClassNameFromDirection";
  ContextMenu.getCSSClassNameFromDirection.__docgenInfo = { "description": "", "displayName": "ContextMenu.getCSSClassNameFromDirection", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Basic = {
  args: {
    opened: true
  },
  render: (props) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenu, {
      ...props,
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx(ContextSubMenu$1, {
        label: "Test 1",
        id: "1",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem$1, {
          children: "Test 1.1"
        })
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextSubMenu$1, {
        label: "Test 2",
        id: "2",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem$1, {
          children: "Test 2.1"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx(ContextSubMenu$1, {
          label: "Test 2.2",
          id: "22",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem$1, {
            children: "Test 2.2.1"
          })
        })]
      })]
    });
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    opened: true\n  },\n  render: props => {\n    return <ContextMenu {...props}>\n        <ContextSubMenu label="Test 1" id="1">\n          <ContextMenuItem>Test 1.1</ContextMenuItem>\n        </ContextSubMenu>\n        <ContextSubMenu label="Test 2" id="2">\n          <ContextMenuItem>Test 2.1</ContextMenuItem>\n          <ContextSubMenu label="Test 2.2" id="22">\n            <ContextMenuItem>Test 2.2.1</ContextMenuItem>\n          </ContextSubMenu>\n        </ContextSubMenu>\n      </ContextMenu>;\n  }\n}',
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
