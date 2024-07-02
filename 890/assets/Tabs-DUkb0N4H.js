import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { K as Key_enum, c as classnames } from "./Key.enum-B7uESc6p.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import { O as Orientation } from "./Orientation-6E0suNXD.js";
import { a8 as ConditionalStringValue } from "./DefaultToolSettingsProvider-CLwhashG.js";
import { C as ConditionalIconItem, I as Icon } from "./IconComponent-C0rNnYzE.js";
class ItemKeyboardNavigator {
  constructor(onFocusItem, onActivateItem) {
    this.onFocusItem = onFocusItem;
    this.onActivateItem = onActivateItem;
    this._itemCount = 0;
    this._orientation = Orientation.Horizontal;
    this._allowWrap = true;
    this._direction = /* @__PURE__ */ new Map([
      [Key_enum.Key.ArrowLeft, -1],
      [Key_enum.Key.ArrowUp, -1],
      [Key_enum.Key.ArrowRight, 1],
      [Key_enum.Key.ArrowDown, 1]
    ]);
  }
  /** The item count */
  get itemCount() {
    return this._itemCount;
  }
  set itemCount(count) {
    this._itemCount = count;
  }
  /** The primary orientation */
  get orientation() {
    return this._orientation;
  }
  set orientation(orientation) {
    this._orientation = orientation;
  }
  /** The allow wrap property controls whether the movement will stop at the first and last items or wrap  */
  get allowWrap() {
    return this._allowWrap;
  }
  set allowWrap(v) {
    this._allowWrap = v;
  }
  /** Called when the arrow keys that run perpendicular to the primary orientation are pressed */
  get crossAxisArrowKeyHandler() {
    return this._crossAxisArrowKeyHandler;
  }
  set crossAxisArrowKeyHandler(v) {
    this._crossAxisArrowKeyHandler = v;
  }
  /** Handle KeyDown on items */
  handleKeyDownEvent(event, index) {
    const key = event.key;
    switch (key) {
      case Key_enum.Key.Home.valueOf():
        event.preventDefault();
        this.focusFirstItem();
        break;
      case Key_enum.Key.End.valueOf():
        event.preventDefault();
        this.focusLastItem();
        break;
      case Key_enum.Key.ArrowUp.valueOf():
      case Key_enum.Key.ArrowDown.valueOf():
        this.determineOrientation(event, index);
        break;
      case Key_enum.Key.Enter.valueOf():
      case " ":
        this.activateItem(index);
        break;
    }
  }
  /** Handle KeyUp on items */
  handleKeyUpEvent(event, index) {
    const key = event.key;
    switch (key) {
      case Key_enum.Key.ArrowLeft.valueOf():
      case Key_enum.Key.ArrowRight.valueOf():
        this.determineOrientation(event, index);
        break;
    }
  }
  focusFirstItem() {
    this.onFocusItem(0);
  }
  focusLastItem() {
    const index = this._itemCount - 1;
    this.onFocusItem(index);
  }
  /** When an item list's orientation is set to vertical,
   * only up and down arrow should function.
   * In all other cases only left and right arrow function.
   */
  determineOrientation(event, index) {
    const key = event.key;
    const vertical = this._orientation === Orientation.Vertical;
    let proceed = false;
    if (vertical) {
      if (key === Key_enum.Key.ArrowUp.valueOf() || key === Key_enum.Key.ArrowDown.valueOf()) {
        event.preventDefault();
        proceed = true;
      } else if (this.crossAxisArrowKeyHandler && (key === Key_enum.Key.ArrowLeft.valueOf() || key === Key_enum.Key.ArrowRight.valueOf())) {
        this.crossAxisArrowKeyHandler(key === Key_enum.Key.ArrowRight.valueOf());
      }
    } else {
      if (key === Key_enum.Key.ArrowLeft.valueOf() || key === Key_enum.Key.ArrowRight.valueOf()) {
        proceed = true;
      } else if (this.crossAxisArrowKeyHandler && (key === Key_enum.Key.ArrowUp.valueOf() || key === Key_enum.Key.ArrowDown.valueOf())) {
        this.crossAxisArrowKeyHandler(key === Key_enum.Key.ArrowDown.valueOf());
      }
    }
    if (proceed) {
      this.switchItemOnArrowPress(event, index);
    }
  }
  /** Either focus the next, previous, first, or last item depending on key pressed
   */
  switchItemOnArrowPress(event, index) {
    const pressed = event.key;
    const targetDirection = this._direction.get(pressed);
    if (targetDirection) {
      const newIndex = index + targetDirection;
      if (0 <= newIndex && newIndex < this._itemCount) {
        this.onFocusItem(newIndex);
      } else {
        if (this._allowWrap) {
          if (pressed === Key_enum.Key.ArrowLeft.valueOf() || pressed === Key_enum.Key.ArrowUp.valueOf()) {
            this.focusLastItem();
          } else {
            this.focusFirstItem();
          }
        }
      }
    }
  }
  activateItem(index) {
    this.onActivateItem(index);
  }
}
function isNavigationKey(key) {
  return isArrowKey(key) || key === Key_enum.Key.Home.valueOf() || key === Key_enum.Key.End.valueOf() || key === " " || key === Key_enum.Key.Enter.valueOf();
}
function isArrowKey(key) {
  return key === Key_enum.Key.ArrowLeft.valueOf() || key === Key_enum.Key.ArrowRight.valueOf() || key === Key_enum.Key.ArrowUp.valueOf() || key === Key_enum.Key.ArrowDown.valueOf();
}
try {
  isNavigationKey.displayName = "isNavigationKey";
  isNavigationKey.__docgenInfo = { "description": "Determines if a KeyboardEvent.key is an Item Navigation key", "displayName": "isNavigationKey", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  ItemKeyboardNavigator.displayName = "ItemKeyboardNavigator";
  ItemKeyboardNavigator.__docgenInfo = { "description": "Keyboard Navigator for parent components", "displayName": "ItemKeyboardNavigator", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
class IconHelper {
  static get reactIconKey() {
    return "#-react-iconspec-node-#";
  }
  static get conditionalIconItemKey() {
    return "#-conditional-icon-item-node-#";
  }
  /** Returns an <Icon> ReactNode from the many ways an icon can be specified.
   * @param icon abstract icon specification.
   * @param internalData a map that may hold a React.ReactNode stored in an abstract item definition.
   */
  static getIconReactNode(icon, internalData) {
    if (!icon)
      return null;
    if (ConditionalIconItem.isConditionalIconItem(icon))
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: ConditionalIconItem.getValue(icon) });
    if (reactExports.isValidElement(icon))
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: icon });
    if (!(icon instanceof ConditionalStringValue) && typeof icon !== "string")
      return null;
    const iconString = ConditionalStringValue.getValue(icon);
    if (!iconString)
      return null;
    if (iconString === IconHelper.reactIconKey) {
      if (internalData)
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Icon,
          {
            iconSpec: internalData.get(IconHelper.reactIconKey)
          }
        );
      return null;
    } else if (iconString === IconHelper.conditionalIconItemKey) {
      if (internalData) {
        const iconItem = internalData.get(
          IconHelper.conditionalIconItemKey
        );
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: ConditionalIconItem.getValue(iconItem) });
      }
      return null;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: iconString });
  }
  /** Returns an icon definition that can be stored in an abstract item definition. If the iconSpec specifies a ReactNode
   * then the react data is stored in the internalData map and the key to the react data is returned.
   * @param iconSpec any supported variations of how an icon can be defined in an abstract item or IconProps.
   * @param internalData a map supplied by the caller to store away react element if React.ReactNode
   */
  static getIconData(iconSpec, internalData) {
    let icon;
    if (ConditionalIconItem.isConditionalIconItem(iconSpec)) {
      icon = IconHelper.conditionalIconItemKey;
      if (internalData)
        internalData.set(IconHelper.conditionalIconItemKey, iconSpec);
      return icon;
    } else {
      icon = reactExports.isValidElement(iconSpec) ? IconHelper.reactIconKey : iconSpec;
    }
    if (internalData && typeof icon === "string" && icon === IconHelper.reactIconKey) {
      internalData.set(IconHelper.reactIconKey, iconSpec);
    }
    if (typeof icon === "string" || icon instanceof ConditionalStringValue)
      return icon;
    return "";
  }
}
try {
  IconHelper.displayName = "IconHelper";
  IconHelper.__docgenInfo = { "description": "Icon Helper Class used to store the data needed to generate an <Icon> for use in any control that shows an icon.", "displayName": "IconHelper", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
function isTabLabelWithIcon(item) {
  return typeof item !== "string" && !!item.icon;
}
function isTabLabel(item) {
  return typeof item !== "string";
}
class Tabs extends reactExports.PureComponent {
  constructor(props) {
    super(props);
    this._anchorRefs = [];
    this._handleFocusItem = (index) => {
      const itemRef = this._anchorRefs[index];
      if (itemRef && itemRef.current)
        itemRef.current.focus();
    };
    this._handleTabClick = (index) => {
      this._activateTab(index);
    };
    this._activateTab = (index) => {
      this.props.onActivateTab && this.props.onActivateTab(index);
      this.setState({ activeIndex: index });
    };
    const activeIndex = this.validateActiveIndex(props.activeIndex);
    this.state = {
      activeIndex
    };
    props.labels.forEach(
      () => this._anchorRefs.push(reactExports.createRef())
    );
    this._itemKeyboardNavigator = new ItemKeyboardNavigator(
      this._handleFocusItem,
      this._activateTab
    );
  }
  validateActiveIndex(idx) {
    let activeIndex = 0;
    if (idx && idx >= 0 && idx < this.props.labels.length)
      activeIndex = idx;
    return activeIndex;
  }
  /** @internal */
  componentDidMount() {
    this._itemKeyboardNavigator.itemCount = this.props.labels.length;
    this._itemKeyboardNavigator.orientation = this.props.orientation;
  }
  /** @internal */
  componentDidUpdate(prevProps) {
    if (prevProps.labels !== this.props.labels)
      this._itemKeyboardNavigator.itemCount = this.props.labels.length;
    if (prevProps.orientation !== this.props.orientation)
      this._itemKeyboardNavigator.orientation = this.props.orientation;
    if (prevProps.activeIndex !== this.props.activeIndex) {
      let hadFocus = false;
      const element = this._anchorRefs[this.state.activeIndex].current;
      if (element && document.activeElement === element)
        hadFocus = true;
      const activeIndex = this.validateActiveIndex(this.props.activeIndex);
      this.setState(
        () => ({ activeIndex }),
        () => {
          if (hadFocus) {
            const newElement = this._anchorRefs[activeIndex].current;
            if (newElement)
              newElement.focus();
          }
        }
      );
    }
  }
  /** Handle keydown on tabs */
  _handleKeyDownEvent(event, index) {
    this._itemKeyboardNavigator.handleKeyDownEvent(event, index);
  }
  /** Handle keyup on tabs */
  _handleKeyUpEvent(event, index) {
    this._itemKeyboardNavigator.handleKeyUpEvent(event, index);
  }
  /** @internal */
  render() {
    const ulClassNames = classnames(
      this.props.mainClassName,
      this.props.green && "uicore-tabs-green",
      this.props.className
    );
    const anyIconsPresent = this.props.labels.reduce(
      (a, b) => a + (isTabLabelWithIcon(b) ? 1 : 0),
      0
    ) > 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "ul",
      {
        className: ulClassNames,
        style: this.props.style,
        role: "tablist",
        "aria-orientation": this.props.orientation === Orientation.Vertical ? "vertical" : "horizontal",
        children: this.props.labels.map((label, index) => {
          let disabled;
          let tooltipElement;
          let title;
          let subLabel;
          let tabId = "";
          let icon;
          if (isTabLabel(label)) {
            icon = IconHelper.getIconReactNode(label.icon);
            subLabel = label.subLabel;
            disabled = label.disabled;
            tabId = label.tabId;
            if (reactExports.isValidElement(label.tooltip))
              tooltipElement = label.tooltip;
            else if (typeof label.tooltip === "string")
              title = label.tooltip;
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              title,
              className: classnames(
                index === this.state.activeIndex && "core-active",
                disabled && "core-tab-item-disabled"
              ),
              role: "tab",
              "aria-selected": index === this.state.activeIndex,
              "data-for": `${tabId}`,
              children: [
                tooltipElement,
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    ref: this._anchorRefs[index],
                    tabIndex: index === this.state.activeIndex ? 0 : -1,
                    onClick: () => this._handleTabClick(index),
                    onKeyDown: (event) => this._handleKeyDownEvent(event, index),
                    onKeyUp: (event) => this._handleKeyUpEvent(event, index),
                    "data-testid": `${tabId}`,
                    role: "button",
                    children: [
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: classnames(
                            "uicore-tabs-inline-label",
                            disabled && "core-tab-item-disabled"
                          ),
                          children: [
                            anyIconsPresent && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uicore-tabs-icon", children: icon }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "uicore-tabs-label-subLabel-container", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: typeof label === "string" ? label : label.label }),
                              subLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uicore-tabs-subLabel", children: subLabel })
                            ] })
                          ]
                        }
                      )
                    ]
                  }
                )
              ]
            },
            index
          );
        })
      }
    );
  }
}
try {
  Tabs.displayName = "Tabs";
  Tabs.__docgenInfo = { "description": "Tabs meant to represent the current position in a page/section", "displayName": "Tabs", "props": { "mainClassName": { "defaultValue": null, "description": "Main CSS class name", "name": "mainClassName", "required": true, "type": { "name": "string" } }, "orientation": { "defaultValue": null, "description": "Orientation of the Tabs list", "name": "orientation", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "labels": { "defaultValue": null, "description": "Text shown for each tab", "name": "labels", "required": true, "type": { "name": "(string | TabLabel)[]" } }, "onActivateTab": { "defaultValue": null, "description": "Handler for activating a tab", "name": "onActivateTab", "required": false, "type": { "name": "((index: number) => any)" } }, "activeIndex": { "defaultValue": null, "description": "Index of the initial active tab", "name": "activeIndex", "required": false, "type": { "name": "number" } }, "green": { "defaultValue": null, "description": "Indicates whether the bar on the active tab is green instead of the default blue", "name": "green", "required": false, "type": { "name": "boolean" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
export {
  Tabs as T
};
