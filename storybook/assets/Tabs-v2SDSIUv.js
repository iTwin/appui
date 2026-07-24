import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { qt as require_classnames } from "./iframe-DrBiZGmV.js";
import { S as ConditionalStringValue, r as init_appui_abstract, t as require_Key_enum } from "./Key.enum-DhBIjxOv.js";
import { i as init_ConditionalIconItem, n as init_IconComponent, r as ConditionalIconItem, t as Icon } from "./IconComponent-C_9BlyPG.js";
import { n as init_Orientation, t as Orientation } from "./Orientation-BU7ZHVnF.js";
//#region ../../ui/core-react/src/core-react/focus/ItemKeyboardNavigator.tsx
var import_Key_enum, ItemKeyboardNavigator;
var init_ItemKeyboardNavigator = __esmMin((() => {
	import_Key_enum = require_Key_enum();
	init_Orientation();
	ItemKeyboardNavigator = class {
		onFocusItem;
		onActivateItem;
		_direction;
		_itemCount = 0;
		_orientation = Orientation.Horizontal;
		_allowWrap = true;
		_crossAxisArrowKeyHandler;
		constructor(onFocusItem, onActivateItem) {
			this.onFocusItem = onFocusItem;
			this.onActivateItem = onActivateItem;
			this._direction = /* @__PURE__ */ new Map([
				[import_Key_enum.Key.ArrowLeft, -1],
				[import_Key_enum.Key.ArrowUp, -1],
				[import_Key_enum.Key.ArrowRight, 1],
				[import_Key_enum.Key.ArrowDown, 1]
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
			switch (event.key) {
				case import_Key_enum.Key.Home.valueOf():
					event.preventDefault();
					this.focusFirstItem();
					break;
				case import_Key_enum.Key.End.valueOf():
					event.preventDefault();
					this.focusLastItem();
					break;
				case import_Key_enum.Key.ArrowUp.valueOf():
				case import_Key_enum.Key.ArrowDown.valueOf():
					this.determineOrientation(event, index);
					break;
				case import_Key_enum.Key.Enter.valueOf():
				case " ":
					this.activateItem(index);
					break;
			}
		}
		/** Handle KeyUp on items */
		handleKeyUpEvent(event, index) {
			switch (event.key) {
				case import_Key_enum.Key.ArrowLeft.valueOf():
				case import_Key_enum.Key.ArrowRight.valueOf():
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
				if (key === import_Key_enum.Key.ArrowUp.valueOf() || key === import_Key_enum.Key.ArrowDown.valueOf()) {
					event.preventDefault();
					proceed = true;
				} else if (this.crossAxisArrowKeyHandler && (key === import_Key_enum.Key.ArrowLeft.valueOf() || key === import_Key_enum.Key.ArrowRight.valueOf())) this.crossAxisArrowKeyHandler(key === import_Key_enum.Key.ArrowRight.valueOf());
			} else if (key === import_Key_enum.Key.ArrowLeft.valueOf() || key === import_Key_enum.Key.ArrowRight.valueOf()) proceed = true;
			else if (this.crossAxisArrowKeyHandler && (key === import_Key_enum.Key.ArrowUp.valueOf() || key === import_Key_enum.Key.ArrowDown.valueOf())) this.crossAxisArrowKeyHandler(key === import_Key_enum.Key.ArrowDown.valueOf());
			if (proceed) this.switchItemOnArrowPress(event, index);
		}
		/** Either focus the next, previous, first, or last item depending on key pressed
		*/
		switchItemOnArrowPress(event, index) {
			const pressed = event.key;
			const targetDirection = this._direction.get(pressed);
			if (targetDirection) {
				const newIndex = index + targetDirection;
				if (0 <= newIndex && newIndex < this._itemCount) this.onFocusItem(newIndex);
				else if (this._allowWrap) if (pressed === import_Key_enum.Key.ArrowLeft.valueOf() || pressed === import_Key_enum.Key.ArrowUp.valueOf()) this.focusLastItem();
				else this.focusFirstItem();
			}
		}
		activateItem(index) {
			this.onActivateItem(index);
		}
	};
}));
//#endregion
//#region ../../ui/core-react/src/core-react/utils/IconHelper.tsx
var import_react$1, import_jsx_runtime$1, IconHelper;
var init_IconHelper = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_abstract();
	init_IconComponent();
	init_ConditionalIconItem();
	import_jsx_runtime$1 = require_jsx_runtime();
	IconHelper = class IconHelper {
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
			if (!icon) return null;
			if (icon instanceof ConditionalIconItem) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Icon, { iconSpec: ConditionalIconItem.getValue(icon) });
			if (import_react$1.isValidElement(icon)) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Icon, { iconSpec: icon });
			if (!(icon instanceof ConditionalStringValue) && typeof icon !== "string") return null;
			const iconString = ConditionalStringValue.getValue(icon);
			if (!iconString) return null;
			if (iconString === IconHelper.reactIconKey) {
				if (internalData) return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Icon, { iconSpec: internalData.get(IconHelper.reactIconKey) });
				return null;
			} else if (iconString === IconHelper.conditionalIconItemKey) {
				if (internalData) {
					const iconItem = internalData.get(IconHelper.conditionalIconItemKey);
					return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Icon, { iconSpec: ConditionalIconItem.getValue(iconItem) });
				}
				return null;
			}
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Icon, { iconSpec: iconString });
		}
		/** Returns an icon definition that can be stored in an abstract item definition. If the iconSpec specifies a ReactNode
		* then the react data is stored in the internalData map and the key to the react data is returned.
		* @param iconSpec any supported variations of how an icon can be defined in an abstract item or IconProps.
		* @param internalData a map supplied by the caller to store away react element if React.ReactNode
		*/
		static getIconData(iconSpec, internalData) {
			let icon;
			if (iconSpec instanceof ConditionalIconItem) {
				icon = IconHelper.conditionalIconItemKey;
				if (internalData) internalData.set(IconHelper.conditionalIconItemKey, iconSpec);
				return icon;
			} else icon = import_react$1.isValidElement(iconSpec) ? IconHelper.reactIconKey : iconSpec;
			if (internalData && typeof icon === "string" && icon === IconHelper.reactIconKey) internalData.set(IconHelper.reactIconKey, iconSpec);
			if (typeof icon === "string" || icon instanceof ConditionalStringValue) return icon;
			return "";
		}
	};
}));
//#endregion
//#region ../../ui/core-react/src/core-react/tabs/Tabs.tsx
function isTabLabelWithIcon(item) {
	return typeof item !== "string" && !!item.icon;
}
function isTabLabel(item) {
	return typeof item !== "string";
}
var import_classnames, import_react, import_jsx_runtime, Tabs;
var init_Tabs = __esmMin((() => {
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Orientation();
	init_ItemKeyboardNavigator();
	init_IconHelper();
	import_jsx_runtime = require_jsx_runtime();
	Tabs = class extends import_react.PureComponent {
		_anchorRefs = [];
		_itemKeyboardNavigator;
		constructor(props) {
			super(props);
			const activeIndex = this.validateActiveIndex(props.activeIndex);
			this.state = { activeIndex };
			props.labels.forEach(() => this._anchorRefs.push(import_react.createRef()));
			this._itemKeyboardNavigator = new ItemKeyboardNavigator(this._handleFocusItem, this._activateTab);
		}
		validateActiveIndex(idx) {
			let activeIndex = 0;
			if (idx && idx >= 0 && idx < this.props.labels.length) activeIndex = idx;
			return activeIndex;
		}
		componentDidMount() {
			this._itemKeyboardNavigator.itemCount = this.props.labels.length;
			this._itemKeyboardNavigator.orientation = this.props.orientation;
		}
		/** @internal */
		componentDidUpdate(prevProps) {
			if (prevProps.labels !== this.props.labels) this._itemKeyboardNavigator.itemCount = this.props.labels.length;
			if (prevProps.orientation !== this.props.orientation) this._itemKeyboardNavigator.orientation = this.props.orientation;
			if (prevProps.activeIndex !== this.props.activeIndex) {
				let hadFocus = false;
				const element = this._anchorRefs[this.state.activeIndex].current;
				if (element && document.activeElement === element) hadFocus = true;
				const activeIndex = this.validateActiveIndex(this.props.activeIndex);
				this.setState(() => ({ activeIndex }), () => {
					if (hadFocus) {
						const newElement = this._anchorRefs[activeIndex].current;
						if (newElement) newElement.focus();
					}
				});
			}
		}
		_handleFocusItem = (index) => {
			const itemRef = this._anchorRefs[index];
			if (itemRef && itemRef.current) itemRef.current.focus();
		};
		_handleTabClick = (index) => {
			this._activateTab(index);
		};
		/** Handle keydown on tabs */
		_handleKeyDownEvent(event, index) {
			this._itemKeyboardNavigator.handleKeyDownEvent(event, index);
		}
		/** Handle keyup on tabs */
		_handleKeyUpEvent(event, index) {
			this._itemKeyboardNavigator.handleKeyUpEvent(event, index);
		}
		_activateTab = (index) => {
			this.props.onActivateTab && this.props.onActivateTab(index);
			this.setState({ activeIndex: index });
		};
		render() {
			const ulClassNames = (0, import_classnames.default)(this.props.mainClassName, this.props.green && "uicore-tabs-green", this.props.className);
			const anyIconsPresent = this.props.labels.reduce((a, b) => a + (isTabLabelWithIcon(b) ? 1 : 0), 0) > 0;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
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
						if (import_react.isValidElement(label.tooltip)) tooltipElement = label.tooltip;
						else if (typeof label.tooltip === "string") title = label.tooltip;
					}
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						title,
						className: (0, import_classnames.default)(index === this.state.activeIndex && "core-active", disabled && "core-tab-item-disabled"),
						role: "tab",
						"aria-selected": index === this.state.activeIndex,
						"data-for": `${tabId}`,
						children: [tooltipElement, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							ref: this._anchorRefs[index],
							tabIndex: index === this.state.activeIndex ? 0 : -1,
							onClick: () => this._handleTabClick(index),
							onKeyDown: (event) => this._handleKeyDownEvent(event, index),
							onKeyUp: (event) => this._handleKeyUpEvent(event, index),
							"data-testid": `${tabId}`,
							role: "button",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: (0, import_classnames.default)("uicore-tabs-inline-label", disabled && "core-tab-item-disabled"),
								children: [anyIconsPresent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "uicore-tabs-icon",
									children: icon
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "uicore-tabs-label-subLabel-container",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: typeof label === "string" ? label : label.label }), subLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "uicore-tabs-subLabel",
										children: subLabel
									})]
								})]
							})
						})]
					}, index);
				})
			});
		}
	};
	Tabs.__docgenInfo = {
		"description": "Tabs meant to represent the current position in a page/section\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/tabs iTwinUI Tabs} instead.",
		"methods": [],
		"displayName": "Tabs",
		"props": {
			"className": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Custom CSS class name"
			},
			"style": {
				"required": false,
				"tsType": {
					"name": "ReactCSSProperties",
					"raw": "React.CSSProperties"
				},
				"description": "Custom CSS style properties"
			},
			"itemId": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id"
			},
			"labels": {
				"required": true,
				"tsType": {
					"name": "Array",
					"elements": [{
						"name": "union",
						"raw": "string | TabLabel",
						"elements": [{ "name": "string" }, { "name": "TabLabel" }]
					}],
					"raw": "Array<string | TabLabel>"
				},
				"description": "Text shown for each tab"
			},
			"onActivateTab": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(index: number) => any",
					"signature": {
						"arguments": [{
							"type": { "name": "number" },
							"name": "index"
						}],
						"return": { "name": "any" }
					}
				},
				"description": "Handler for activating a tab"
			},
			"activeIndex": {
				"required": false,
				"tsType": { "name": "number" },
				"description": "Index of the initial active tab"
			},
			"green": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Indicates whether the bar on the active tab is green instead of the default blue"
			},
			"mainClassName": {
				"required": true,
				"tsType": { "name": "string" },
				"description": "Main CSS class name"
			},
			"orientation": {
				"required": true,
				"tsType": { "name": "Orientation" },
				"description": "Orientation of the Tabs list"
			}
		}
	};
}));
//#endregion
export { init_Tabs as n, Tabs as t };
