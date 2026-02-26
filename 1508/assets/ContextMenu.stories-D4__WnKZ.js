import { r as reactExports, c as classnames, j as jsxRuntimeExports } from "./iframe-BnF7kxuI.js";
import { i as Icon, bj as ConditionalBooleanValue, bM as SvgCaretRightSmall, bN as ContextSubMenu$1, bO as ContextMenuItem$1, S as SvgPlaceholder } from "./appui-react-B7iNJbV5.js";
import { k as BadgeType$1, K as Key_enumExports } from "./Key.enum-B3pThNWo.js";
import { D as DivWithOutsideClick } from "./DivWithOutsideClick-D8WYj5fV.js";
import { I as Icon$1 } from "./IconComponent-BU7ivNbK.js";
import { A as AppUiDecorator } from "./Decorators-CwkwcaGG.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-DYbOg5lC.js";
import "./index-CptIXb7J.js";
class ContextMenuDivider extends reactExports.PureComponent {
  render() {
    const { className, ...props } = this.props;
    return reactExports.createElement("div", { ...props, "data-testid": "core-context-menu-divider", className: classnames("core-context-menu-divider", className) });
  }
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
class TildeFinder {
  /**
   * Find character following a tilde character within a React.ReactNode.
   * @param node react node to search within for a tilde.
   * @returns character that was found, and the same node with tilde removed, and following character with an underline.
   */
  static findAfterTilde = (node) => {
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
          character: void 0
        };
        node = node.map((child) => {
          const r = TildeFinder.findAfterTilde(child);
          if (r.character) {
            ret = r;
            return r.node;
          }
          return child;
        });
        if (ret.character) {
          return { character: ret.character, node };
        }
      } else if (reactExports.isValidElement(node)) {
        const ret = {
          character: void 0,
          node
        };
        ret.node = reactExports.cloneElement(node, {
          children: reactExports.Children.map(
            node.props.children,
            (child) => {
              const r = TildeFinder.findAfterTilde(child);
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
}
const BadgeType = BadgeType$1;
function TechnicalPreviewBadge() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "core-badge-technicalPreviewBadge", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      viewBox: "0 0 16 16",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "linearGradient",
          {
            id: "technical-preview-fill",
            x1: "8",
            y1: "15",
            x2: "8",
            y2: "1",
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0", stopColor: "#ffc335" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#ffdf52" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15,1V15L1,1H15", fill: "url(#technical-preview-fill)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M15,1V15L1,1H15m0-1H1A.87458.87458,0,0,0,.1.6.91284.91284,0,0,0,.3,1.7l14,14a.90783.90783,0,0,0,.7.3.60123.60123,0,0,0,.4-.1A.961.961,0,0,0,16,15V1A.94477.94477,0,0,0,15,0Z",
            fill: "#ffc000"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "11",
            cy: "5",
            r: "2",
            opacity: "0.9",
            style: { isolation: "isolate" }
          }
        )
      ]
    }
  ) });
}
TechnicalPreviewBadge.__docgenInfo = { "description": "Technical preview badge component.\n@internal", "methods": [], "displayName": "TechnicalPreviewBadge" };
function NewBadge() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "core-badge-newBadge", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 16 16",
      enableBackground: "new 0 0 16 16",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m15 0h-14c-.4 0-.8.2-.9.6s-.1.8.2 1.1l14 14c.2.2.4.3.7.3.1 0 .3 0 .4-.1.4-.2.6-.5.6-.9v-14c0-.6-.4-1-1-1m-4 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2" })
    }
  ) });
}
NewBadge.__docgenInfo = { "description": "New badge component.\n@internal", "methods": [], "displayName": "NewBadge" };
function DeprecatedBadge() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "core-badge-deprecatedBadge", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 16 16",
      width: "1rem",
      height: "1rem",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "linearGradient",
          {
            id: "deprecated-fill",
            x1: "8.00287",
            y1: "1.00273",
            x2: "8.00287",
            y2: "15.00273",
            gradientTransform: "translate(0 16.00546) scale(1 -1)",
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0", stopColor: "#ff1e35" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#ff5352" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "m15.00287,1.00273v14L1.00287,1.00273h14",
            fill: "url(#deprecated-fill)",
            style: { strokeWidth: 0 }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "m15.00287,1.00273v14L1.00287,1.00273h14M15.00287.00273H1.00287C.60033-.02901.22839.21895.10287.60273-.08907.97211-.00681,1.42455.30287,1.70273l14,14c.17808.19777.43397.30744.7.3.14095.01486.28262-.02056.4-.1.36588-.14828.60385-.50524.6-.9V1.00273c.03145-.52083-.36527-.96855-.8861-1-.03793-.00229-.07596-.00229-.1139,0Z",
            fill: "red",
            style: { strokeWidth: 0 }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "polygon",
          {
            points: "13.15377 6.20045 12.20059 7.15363 11.00287 5.95591 9.80515 7.15363 8.85197 6.20045 10.04969 5.00273 8.85197 3.80501 9.80515 2.85183 11.00287 4.04955 12.20059 2.85183 13.15377 3.80501 11.95606 5.00273 13.15377 6.20045",
            style: { strokeWidth: 0 }
          }
        )
      ]
    }
  ) });
}
DeprecatedBadge.__docgenInfo = { "description": "Deprecated badge component.\n@internal", "methods": [], "displayName": "DeprecatedBadge" };
function Badge({ type }) {
  if (type === BadgeType.TechnicalPreview || type === "technical-preview")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TechnicalPreviewBadge, {});
  if (type === BadgeType.New || type === "new") return /* @__PURE__ */ jsxRuntimeExports.jsx(NewBadge, {});
  if (type === "deprecated") return /* @__PURE__ */ jsxRuntimeExports.jsx(DeprecatedBadge, {});
  return null;
}
Badge.__docgenInfo = { "description": "Badge component that renders based on a badge type.\n@internal", "methods": [], "displayName": "Badge", "props": { "type": { "required": false, "tsType": { "name": "union", "raw": "BadgeType | BadgeKind", "elements": [{ "name": "_BadgeType" }, { "name": "union", "raw": '| "technical-preview"\n| "new"\n| "deprecated"\n| (string & {})', "elements": [{ "name": "literal", "value": '"technical-preview"' }, { "name": "literal", "value": '"new"' }, { "name": "literal", "value": '"deprecated"' }, { "name": "unknown" }] }] }, "description": "" } } };
class ContextMenuItem extends reactExports.PureComponent {
  _root = null;
  _lastChildren;
  _parsedChildren;
  static defaultProps = {
    disabled: false,
    hidden: false,
    isSelected: false
  };
  constructor(props) {
    super(props);
  }
  state = {};
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
      badgeKind,
      iconRight,
      hideIconContainer,
      ...props
    } = this.props;
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
          !hideIconContainer && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core-context-menu-icon", children: icon !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$1, { iconSpec: icon }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core-context-menu-content", children: this._parsedChildren }),
          iconRight && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: classnames(
                "core-context-menu-icon",
                "core-context-menu-icon-right"
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$1, { iconSpec: iconRight })
            }
          ),
          (badgeKind || badgeType) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core-context-menu-badge", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { type: badgeKind || badgeType }) })
        ]
      }
    );
  }
  componentDidMount() {
    this._updateHotkey(this.props.children);
  }
  /** @internal */
  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children) {
      this._updateHotkey(this.props.children);
    }
  }
  _updateHotkey = (node) => {
    let hotKey;
    const isDisabled = ConditionalBooleanValue.getValue(this.props.disabled);
    const isHidden = ConditionalBooleanValue.getValue(this.props.hidden);
    if (!isDisabled && !isHidden)
      hotKey = TildeFinder.findAfterTilde(node).character;
    else hotKey = void 0;
    if (hotKey && hotKey !== this.state.hotKey) {
      this.setState({ hotKey });
      if (this.props.onHotKeyParsed) this.props.onHotKeyParsed(hotKey);
    }
  };
  _handleFocus = (event) => {
    event.stopPropagation();
  };
  _handleMouseOver = (_event) => {
    if (this._root && this._root.style.visibility !== "hidden" && this.props.onHover) {
      this.props.onHover();
    }
  };
  select = () => {
    if (this._root) {
      this._root.click();
      if (this.props.parentMenu && this.props.parentMenu.props.parentSubmenu)
        this.props.parentMenu.props.parentSubmenu.close(true);
    }
  };
  _handleClick = (event) => {
    const isDisabled = ConditionalBooleanValue.getValue(this.props.disabled);
    if (isDisabled) return;
    if (this.props.onClick) this.props.onClick(event);
    if (this.props.onSelect) this.props.onSelect(event);
  };
  _handleKeyUp = (event) => {
    const isDisabled = ConditionalBooleanValue.getValue(this.props.disabled);
    if (event.key === Key_enumExports.Key.Enter.valueOf() && this.props.onSelect !== void 0 && !isDisabled) {
      this.props.onSelect(event);
    }
  };
}
ContextMenuItem.__docgenInfo = { "description": "Menu item component for use within a [[ContextMenu]] component.\n@public\n@deprecated in 4.16.0. Use {@link https://itwinui.bentley.com/docs/dropdownmenu iTwinUI MenuItem} instead.", "methods": [{ "name": "select", "docblock": null, "modifiers": [], "params": [], "returns": null }], "displayName": "ContextMenuItem", "props": { "onSelect": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(event: any) => any", "signature": { "arguments": [{ "type": { "name": "any" }, "name": "event" }], "return": { "name": "any" } } }, "description": "" }, "onHotKeyParsed": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(hotKey: string) => void", "signature": { "arguments": [{ "type": { "name": "string" }, "name": "hotKey" }], "return": { "name": "void" } } }, "description": "@internal" }, "icon": { "required": false, "tsType": { "name": "IconSpec" }, "description": "Icon to display in the left margin." }, "disabled": { "required": false, "tsType": { "name": "union", "raw": "boolean | ConditionalBooleanValue", "elements": [{ "name": "boolean" }, { "name": "ConditionalBooleanValue" }] }, "description": "Disables any onSelect calls, hover/keyboard highlighting, and grays item.", "defaultValue": { "value": "false", "computed": false } }, "hidden": { "required": false, "tsType": { "name": "union", "raw": "boolean | ConditionalBooleanValue", "elements": [{ "name": "boolean" }, { "name": "ConditionalBooleanValue" }] }, "description": "Indicates whether the item is visible or hidden. The default is for the item to be visible.", "defaultValue": { "value": "false", "computed": false } }, "badgeType": { "required": false, "tsType": { "name": "_BadgeType" }, "description": "Badge to be overlaid on the item.\n@deprecated in 4.16.0. Use `badgeKind` property instead." }, "badgeKind": { "required": false, "tsType": { "name": "union", "raw": '"technical-preview" | "new" | "deprecated" | (string & {})', "elements": [{ "name": "literal", "value": '"technical-preview"' }, { "name": "literal", "value": '"new"' }, { "name": "literal", "value": '"deprecated"' }, { "name": "unknown" }] }, "description": "Specifies the kind of badge, if any, to be overlaid on the item." }, "iconRight": { "required": false, "tsType": { "name": "IconSpec" }, "description": "Icon to display in the right margin." }, "hideIconContainer": { "required": false, "tsType": { "name": "boolean" }, "description": "Hide the icon container. This can be used to eliminate space used to display an icon at the left of the menu item." }, "onHover": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => any", "signature": { "arguments": [], "return": { "name": "any" } } }, "description": "@internal" }, "isSelected": { "required": false, "tsType": { "name": "boolean" }, "description": "", "defaultValue": { "value": "false", "computed": false } }, "parentMenu": { "required": false, "tsType": { "name": "ContextMenu" }, "description": "@internal" } }, "composes": ["Omit", "CommonProps"] };
class ContextSubMenu extends reactExports.Component {
  _menuElement = null;
  _subMenuElement = null;
  _menuButtonElement = null;
  _lastLabel;
  _parsedLabel;
  static defaultProps = {
    direction: ContextMenuDirection.BottomRight,
    disabled: false,
    hidden: false,
    autoflip: true,
    isSelected: false,
    selectedIndex: 0
  };
  state;
  constructor(props) {
    super(props);
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
      badgeKind,
      hideIconContainer,
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
                !hideIconContainer && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core-context-menu-icon", children: icon !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$1, { iconSpec: icon }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core-context-menu-content", children: this._parsedLabel }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: classnames("core-context-submenu-arrow", "icon"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$1, { iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCaretRightSmall, {}) }) }),
                (badgeKind || badgeType) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core-context-menu-badge", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { type: badgeKind || badgeType }) })
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
  /** @internal */
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
  _updateHotkey = (node) => {
    let hotKey;
    const isDisabled = ConditionalBooleanValue.getValue(this.props.disabled);
    const isHidden = ConditionalBooleanValue.getValue(this.props.hidden);
    if (!isDisabled && !isHidden)
      hotKey = TildeFinder.findAfterTilde(node).character;
    else hotKey = void 0;
    if (hotKey && hotKey !== this.state.hotKey) {
      this.setState({ hotKey });
      if (this.props.onHotKeyParsed) this.props.onHotKeyParsed(hotKey);
    }
  };
  select = () => {
    this.setState({ opened: true }, () => {
      if (this._menuElement) this._menuElement.focus();
      if (this.props.onSelect !== void 0) this.props.onSelect(void 0);
    });
  };
  close = (propagate) => {
    this.setState({ opened: false }, () => {
      if (this._menuElement) this._menuElement.blur();
    });
    if (propagate && this.props.parentMenu && this.props.parentMenu.props.parentSubmenu) {
      this.props.parentMenu.props.parentSubmenu.close(true);
    }
  };
  _handleMouseOver = (_event) => {
    if (this._menuButtonElement && this._menuButtonElement.style.visibility !== "hidden" && this.props.onHover) {
      this.props.onHover();
    }
  };
  _handleClick = (event) => {
    event.stopPropagation();
    const isDisabled = ConditionalBooleanValue.getValue(this.props.disabled);
    if (!isDisabled) {
      if (this.props.onClick !== void 0) this.props.onClick(event);
      if (this.props.opened) this.close();
      else this.select();
    }
  };
  _handleClickGlobal = (event) => {
    if (this._subMenuElement && !this._subMenuElement.contains(event.target))
      this.setState((_prevState) => ({ opened: false }));
  };
}
ContextSubMenu.__docgenInfo = { "description": "Submenu wrapper class for use within a [[ContextMenu]] component.\n@public\n@deprecated in 4.16.0. Use `subMenuItems` property {@link https://itwinui.bentley.com/docs/dropdownmenu#submenu iTwinUI MenuItem} component instead.", "methods": [{ "name": "select", "docblock": null, "modifiers": [], "params": [], "returns": null }, { "name": "close", "docblock": null, "modifiers": [], "params": [{ "name": "propagate", "optional": true, "type": { "name": "boolean" } }], "returns": null }], "displayName": "ContextSubMenu", "props": { "label": { "required": true, "tsType": { "name": "union", "raw": "string | React.ReactElement", "elements": [{ "name": "string" }, { "name": "ReactReactElement", "raw": "React.ReactElement" }] }, "description": "Text/jsx to display in the list item" }, "onHotKeyParsed": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(hotKey: string) => void", "signature": { "arguments": [{ "type": { "name": "string" }, "name": "hotKey" }], "return": { "name": "void" } } }, "description": "@internal" }, "direction": { "defaultValue": { "value": "ContextMenuDirection.BottomRight", "computed": true }, "required": false }, "disabled": { "defaultValue": { "value": "false", "computed": false }, "required": false }, "hidden": { "defaultValue": { "value": "false", "computed": false }, "required": false }, "autoflip": { "defaultValue": { "value": "true", "computed": false }, "required": false }, "isSelected": { "defaultValue": { "value": "false", "computed": false }, "required": false }, "selectedIndex": { "defaultValue": { "value": "0", "computed": false }, "required": false } }, "composes": ["Omit", "CommonProps"] };
class ContextMenu extends reactExports.PureComponent {
  _rootElement = null;
  _menuElement = null;
  _selectedElement = null;
  _length = 0;
  _hotKeyMap = /* @__PURE__ */ new Map();
  _lastChildren;
  _lastDirection = ContextMenuDirection.BottomRight;
  _lastSelectedIndex = 0;
  _injectedChildren;
  _parentWindowHeight = 0;
  _parentWindowWidth = 0;
  static defaultProps = {
    direction: ContextMenuDirection.BottomRight,
    autoflip: true,
    edgeLimit: true,
    hotkeySelect: true,
    selectedIndex: -1,
    floating: true
  };
  state;
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: this.props.selectedIndex,
      direction: props.direction,
      ignoreNextKeyUp: props.ignoreNextKeyUp
    };
  }
  /** @internal */
  static autoFlip = (dir, rect, windowWidth, windowHeight) => {
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
  _handleHotKeyParsed = (index, hotKey) => {
    this._hotKeyMap.set(index, hotKey);
  };
  _handleOnOutsideClick = (event) => {
    if (this.props.opened && this.props.onOutsideClick)
      this.props.onOutsideClick(event);
  };
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
      offset = 0,
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "presentation",
        className: classnames("core-context-menu", className),
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
              ContextMenu.getCSSClassNameFromDirection(renderDirection)
            ),
            style: {
              "--_core-context-menu-offset": `${offset}px`
            },
            children: this._injectedChildren
          }
        ) })
      }
    );
  }
  /** @internal */
  static getCSSClassNameFromDirection = (direction) => {
    let className = "";
    if (direction === void 0) direction = ContextMenuDirection.BottomRight;
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
  _injectMenuItemProps = (children, direction, selectedIndex) => {
    let index = 0;
    const ch = reactExports.Children.map(
      children,
      (child) => {
        if (child && typeof child === "object" && "props" in child && (child.type === ContextSubMenu || child.type === ContextMenuItem) && reactExports.isValidElement(
          child
        ) && !ConditionalBooleanValue.getValue(child.props.disabled) && !ConditionalBooleanValue.getValue(child.props.hidden)) {
          const id = index;
          const onHover = () => {
            this.setState({ selectedIndex: id });
            this.focus();
          };
          const ref = (el) => {
            if (selectedIndex === id)
              this._selectedElement = el;
          };
          const boundHandleHotKeyParse = this._handleHotKeyParsed.bind(
            this,
            id
          );
          const childProps = {
            parentMenu: this,
            ref,
            onHover,
            isSelected: selectedIndex === id,
            onHotKeyParsed: boundHandleHotKeyParse
          };
          if (child.type === ContextSubMenu && reactExports.isValidElement(child)) {
            childProps.direction = child.props.direction || direction;
          }
          index++;
          return reactExports.cloneElement(child, childProps);
        } else return child;
      }
    );
    this._length = index;
    return ch;
  };
  _rootRef = (el) => {
    this._rootElement = el;
  };
  _menuRef = (el) => {
    this._menuElement = el;
  };
  getWindow() {
    const el = this._rootElement ? this._rootElement : this._menuElement;
    const parentDocument = el.ownerDocument;
    return parentDocument.defaultView ?? window;
  }
  componentDidMount() {
    const parentWindow = this.getWindow();
    parentWindow.addEventListener("focus", this._handleFocusChange);
    parentWindow.addEventListener("mouseup", this._handleFocusChange);
    this.checkRenderDirection();
    if (this.props.opened) this.focus();
  }
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
  focus = () => {
    if (this._menuElement) this._menuElement.focus();
  };
  blur = () => {
    if (this._menuElement) this._menuElement.blur();
  };
  getRect = () => {
    let clientRect = DOMRect.fromRect({ x: 0, y: 0, width: 0, height: 0 });
    if (this._menuElement) {
      clientRect = this._menuElement.getBoundingClientRect();
    }
    return clientRect;
  };
  _handleFocusChange = (event) => {
    if (this._rootElement && this.props.opened && event.target instanceof Node && this.props.onOutsideClick && !this._rootElement.contains(event.target))
      this.props.onOutsideClick(event);
  };
  _handleClick = (event) => {
    if (this.props.onSelect) this.props.onSelect(event);
  };
  _handleKeyUp = (event) => {
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
    if (event.key === Key_enumExports.Key.ArrowLeft.valueOf()) {
      event.stopPropagation();
      if (this.props.parentMenu && this.props.parentSubmenu) {
        this.props.parentSubmenu.close();
        this.props.parentMenu.focus();
      }
      if (this.props.onEsc) this.props.onEsc(event);
    }
    if (event.key === Key_enumExports.Key.Escape.valueOf()) {
      if (this.props.onEsc) this.props.onEsc(event);
    }
    if ((event.key === Key_enumExports.Key.Enter.valueOf() || event.key === Key_enumExports.Key.ArrowRight.valueOf()) && this._selectedElement) {
      event.stopPropagation();
      if (event.key === Key_enumExports.Key.Enter.valueOf() || this._selectedElement instanceof ContextSubMenu) {
        if (this._selectedElement.select) this._selectedElement.select();
      }
    }
    let { selectedIndex } = this.state;
    if (event.key === Key_enumExports.Key.ArrowUp.valueOf() || event.key === Key_enumExports.Key.ArrowDown.valueOf()) {
      event.stopPropagation();
      if (selectedIndex === -1) {
        selectedIndex = 0;
      } else {
        if (event.key === Key_enumExports.Key.ArrowUp.valueOf()) {
          if (this.state.selectedIndex === 0) selectedIndex = this._length - 1;
          else selectedIndex--;
        }
        if (event.key === Key_enumExports.Key.ArrowDown.valueOf()) {
          if (this.state.selectedIndex === this._length - 1) selectedIndex = 0;
          else selectedIndex++;
        }
      }
    }
    this.setState({ selectedIndex });
  };
  /** @internal */
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
}
ContextMenu.__docgenInfo = { "description": "A context menu populated with [[ContextMenuItem]] components.\nCan be nested using [[ContextSubMenu]] component.\n@public\n@deprecated in 4.16.0. Use {@link https://itwinui.bentley.com/docs/dropdownmenu iTwinUI DropdownMenu} component instead.", "methods": [{ "name": "autoFlip", "docblock": "@internal", "modifiers": ["static"], "params": [{ "name": "dir", "optional": false, "type": { "name": "ContextMenuDirection", "alias": "ContextMenuDirection" } }, { "name": "rect", "optional": false, "type": { "name": "DOMRectReadOnly", "alias": "DOMRectReadOnly" } }, { "name": "windowWidth", "optional": false, "type": { "name": "number" } }, { "name": "windowHeight", "optional": false, "type": { "name": "number" } }], "returns": { "type": { "name": "ContextMenuDirection" } }, "description": null }, { "name": "getCSSClassNameFromDirection", "docblock": "@internal", "modifiers": ["static"], "params": [{ "name": "direction", "optional": true, "type": { "name": "ContextMenuDirection", "alias": "ContextMenuDirection" } }], "returns": { "type": { "name": "string" } }, "description": null }, { "name": "focus", "docblock": null, "modifiers": [], "params": [], "returns": null }, { "name": "blur", "docblock": null, "modifiers": [], "params": [], "returns": null }, { "name": "getRect", "docblock": null, "modifiers": [], "params": [], "returns": { "type": { "name": "DOMRect" } } }], "displayName": "ContextMenu", "props": { "opened": { "required": true, "tsType": { "name": "boolean" }, "description": "Whether ContextMenu is currently opened." }, "direction": { "required": false, "tsType": { "name": "ContextMenuDirection" }, "description": "Which direction the menu opens. Default: ContextMenuDirection.BottomRight", "defaultValue": { "value": "ContextMenuDirection.BottomRight", "computed": true } }, "onOutsideClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(event: MouseEvent) => any", "signature": { "arguments": [{ "type": { "name": "MouseEvent" }, "name": "event" }], "return": { "name": "any" } } }, "description": "When click is registered outside of ContextMenu." }, "onSelect": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(event: any) => any", "signature": { "arguments": [{ "type": { "name": "any" }, "name": "event" }], "return": { "name": "any" } } }, "description": "When list item or submenu is selected" }, "onEsc": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(data: any) => any", "signature": { "arguments": [{ "type": { "name": "any" }, "name": "data" }], "return": { "name": "any" } } }, "description": "when Escape button is pressed" }, "autoflip": { "required": false, "tsType": { "name": "boolean" }, "description": "Whether menu flips directions based on screen edge. Default: true", "defaultValue": { "value": "true", "computed": false } }, "edgeLimit": { "required": false, "tsType": { "name": "boolean" }, "description": "Whether menu hugs screen edge when autoflip is off. Default: true", "defaultValue": { "value": "true", "computed": false } }, "hotkeySelect": { "required": false, "tsType": { "name": "boolean" }, "description": "Whether Hotkey press selects item, or just highlights item. Default: true", "defaultValue": { "value": "true", "computed": false } }, "selectedIndex": { "required": false, "tsType": { "name": "number" }, "description": "starting menu item selected index Default: -1", "defaultValue": { "value": "-1", "computed": false } }, "floating": { "required": false, "tsType": { "name": "boolean" }, "description": "whether menu floats on the viewport, or the page. When false, container elements can clip menu with overflow: hidden; Default: true", "defaultValue": { "value": "true", "computed": false } }, "offset": { "required": false, "tsType": { "name": "number" }, "description": "Additional offset to apply." }, "parentMenu": { "required": false, "tsType": { "name": "ContextMenu" }, "description": "@internal" }, "parentSubmenu": { "required": false, "tsType": { "name": "ContextSubMenu" }, "description": "@internal" }, "ignoreNextKeyUp": { "required": false, "tsType": { "name": "boolean" }, "description": "@internal" }, "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Content" } }, "composes": ["CommonProps"] };
const meta = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  args: {
    opened: true
  }
};
const Basic = {
  render: (props) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenu, { ...props, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContextSubMenu$1, { label: "Test 1", id: "1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem$1, { children: "Test 1.1" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextSubMenu$1, { label: "Test 2", id: "2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem$1, { children: "Test 2.1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContextSubMenu$1, { label: "Test 2.2", id: "22", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem$1, { children: "Test 2.2.1" }) })
      ] })
    ] });
  }
};
const WithIcons = {
  render: (props) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenu, { ...props, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextSubMenu$1, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}), label: "Svg Icons", id: "1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem$1, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}), children: "Test 1.1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContextSubMenu$1, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}), label: "Test 1.2", id: "1.2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextSubMenu$1, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}), label: "Web Font Icons", id: "2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem$1, { icon: "icon-placeholder", children: "Test 2.1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContextSubMenu$1, { icon: "icon-placeholder", label: "Test 2.2", id: "2.2" })
      ] })
    ] });
  }
};
const WithDivider = {
  render: (props) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenu, { ...props, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem$1, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}), children: "Test 1.1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem$1, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}), children: "Test 1.2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuDivider, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem$1, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}), children: "Test 1.3" })
    ] });
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...Basic.parameters?.docs,
    source: {
      originalSource: '{\n  render: props => {\n    return <ContextMenu {...props}>\n        <ContextSubMenu label="Test 1" id="1">\n          <ContextMenuItem>Test 1.1</ContextMenuItem>\n        </ContextSubMenu>\n        <ContextSubMenu label="Test 2" id="2">\n          <ContextMenuItem>Test 2.1</ContextMenuItem>\n          <ContextSubMenu label="Test 2.2" id="22">\n            <ContextMenuItem>Test 2.2.1</ContextMenuItem>\n          </ContextSubMenu>\n        </ContextSubMenu>\n      </ContextMenu>;\n  }\n}',
      ...Basic.parameters?.docs?.source
    }
  }
};
WithIcons.parameters = {
  ...WithIcons.parameters,
  docs: {
    ...WithIcons.parameters?.docs,
    source: {
      originalSource: '{\n  render: props => {\n    return <ContextMenu {...props}>\n        <ContextSubMenu icon={<SvgPlaceholder />} label="Svg Icons" id="1">\n          <ContextMenuItem icon={<SvgPlaceholder />}>Test 1.1</ContextMenuItem>\n          <ContextSubMenu icon={<SvgPlaceholder />} label="Test 1.2" id="1.2" />\n        </ContextSubMenu>\n        <ContextSubMenu icon={<SvgPlaceholder />} label="Web Font Icons" id="2">\n          <ContextMenuItem icon="icon-placeholder">Test 2.1</ContextMenuItem>\n          <ContextSubMenu icon="icon-placeholder" label="Test 2.2" id="2.2" />\n        </ContextSubMenu>\n      </ContextMenu>;\n  }\n}',
      ...WithIcons.parameters?.docs?.source
    }
  }
};
WithDivider.parameters = {
  ...WithDivider.parameters,
  docs: {
    ...WithDivider.parameters?.docs,
    source: {
      originalSource: "{\n  render: props => {\n    return <ContextMenu {...props}>\n        <ContextMenuItem icon={<SvgPlaceholder />}>Test 1.1</ContextMenuItem>\n        <ContextMenuItem icon={<SvgPlaceholder />}>Test 1.2</ContextMenuItem>\n        <ContextMenuDivider />\n        <ContextMenuItem icon={<SvgPlaceholder />}>Test 1.3</ContextMenuItem>\n      </ContextMenu>;\n  }\n}",
      ...WithDivider.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Basic", "WithIcons", "WithDivider"];
export {
  Basic,
  WithDivider,
  WithIcons,
  __namedExportsOrder,
  meta as default
};
