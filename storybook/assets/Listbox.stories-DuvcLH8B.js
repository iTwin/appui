import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { qt as require_classnames } from "./iframe-DrBiZGmV.js";
import { X as init_core_bentley, ln as Guid, t as require_Key_enum } from "./Key.enum-DhBIjxOv.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region ../../ui/core-react/src/core-react/listbox/Listbox.scss
var init_Listbox$1 = __esmMin((() => {}));
//#endregion
//#region ../../ui/core-react/src/core-react/listbox/Listbox.tsx
function makeId(...args) {
	return args.filter((val) => val != null).join("--");
}
function getOptionValueArray(childNodes) {
	return import_react.Children.toArray(childNodes).filter((node) => import_react.isValidElement(node) && !!node.props.value).map((optionNode) => optionNode.props);
}
function processKeyboardNavigation(optionValues, itemIndex, key) {
	let keyProcessed = false;
	let newIndex = itemIndex >= 0 ? itemIndex : 0;
	if (key === import_Key_enum.Key.ArrowDown.valueOf() || key === import_Key_enum.Key.PageDown.valueOf()) {
		for (let i = itemIndex + 1; i < optionValues.length; i++) if (!optionValues[i].disabled) {
			newIndex = i;
			break;
		}
		keyProcessed = true;
	} else if (key === import_Key_enum.Key.ArrowUp.valueOf() || key === import_Key_enum.Key.PageUp.valueOf()) {
		for (let i = itemIndex - 1; i >= 0; i--) if (!optionValues[i].disabled) {
			newIndex = i;
			break;
		}
		keyProcessed = true;
	} else if (key === import_Key_enum.Key.Home.valueOf()) {
		for (let i = 0; i < optionValues.length; i++) if (!optionValues[i].disabled) {
			newIndex = i;
			break;
		}
		keyProcessed = true;
	} else if (key === import_Key_enum.Key.End.valueOf()) {
		for (let i = optionValues.length - 1; i >= 0; i--) if (!optionValues[i].disabled) {
			newIndex = i;
			break;
		}
		keyProcessed = true;
	}
	return [newIndex, keyProcessed];
}
/** Single select `Listbox` component
* @public
* @deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/list iTwinUI list} instead.
*/
function Listbox(props) {
	const { ariaLabel, ariaLabelledBy, id, children, selectedValue, className, onListboxValueChange, onKeyDown, ...otherProps } = props;
	const listRef = import_react.useRef(null);
	const [listId] = import_react.useState(() => {
		return id ?? Guid.createValue();
	});
	const optionValues = import_react.useMemo(() => getOptionValueArray(children), [children]);
	const classes = import_react.useMemo(() => (0, import_classnames.default)("core-listbox", className), [className]);
	const [currentValue, setCurrentValue] = import_react.useState(selectedValue);
	const [focusValue, setFocusValue] = import_react.useState(currentValue);
	import_react.useEffect(() => {
		setCurrentValue(selectedValue);
		setFocusValue(selectedValue);
	}, [selectedValue]);
	const scrollTopRef = import_react.useRef(0);
	const handleValueChange = import_react.useCallback((newValue, isControlOrCommandPressed) => {
		if (newValue !== currentValue) {
			setCurrentValue(newValue);
			setFocusValue(newValue);
			if (onListboxValueChange) onListboxValueChange(newValue, isControlOrCommandPressed);
		}
	}, [
		setCurrentValue,
		currentValue,
		onListboxValueChange
	]);
	const focusOption = import_react.useCallback((itemIndex) => {
		if (itemIndex >= 0 && itemIndex < optionValues.length) {
			const newSelection = optionValues[itemIndex];
			const listElement = listRef.current;
			const optionToFocus = listElement.querySelector(`li[data-value="${newSelection.value}"]`);
			if (optionToFocus && listElement) {
				let newScrollTop = listElement.scrollTop;
				if (listElement.scrollHeight > listElement.clientHeight) {
					const scrollBottom = listElement.clientHeight + listElement.scrollTop;
					const elementBottom = optionToFocus.offsetTop + optionToFocus.offsetHeight;
					if (elementBottom > scrollBottom) newScrollTop = elementBottom - listElement.clientHeight;
					else if (optionToFocus.offsetTop < listElement.scrollTop) newScrollTop = optionToFocus.offsetTop;
					scrollTopRef.current = newScrollTop;
				}
				setFocusValue(newSelection.value);
			}
		}
	}, [optionValues]);
	const handleKeyDown = import_react.useCallback((event) => {
		if (optionValues.length < 1) return;
		const itemIndex = void 0 === focusValue ? -1 : optionValues.findIndex((optionValue) => optionValue.value === focusValue);
		if (event.key === " ") {
			event.preventDefault();
			if (focusValue) handleValueChange(focusValue, event.getModifierState("Control") || event.getModifierState("Meta"));
			return;
		} else {
			const [newItemIndex, keyProcessed] = processKeyboardNavigation(optionValues, itemIndex, event.key);
			if (keyProcessed) {
				event.preventDefault();
				focusOption(newItemIndex);
				return;
			}
		}
		if (onKeyDown) onKeyDown(event);
	}, [
		focusValue,
		optionValues,
		focusOption,
		onKeyDown,
		handleValueChange
	]);
	const isInitialMount = import_react.useRef(true);
	import_react.useEffect(() => {
		const list = listRef.current;
		if (isInitialMount.current) {
			isInitialMount.current = false;
			if (void 0 !== focusValue) {
				const itemIndex = optionValues.findIndex((optionValue) => optionValue.value === focusValue);
				focusOption(itemIndex);
			}
		} else list.scrollTop = scrollTopRef.current;
	}, [
		focusValue,
		focusOption,
		optionValues
	]);
	const handleOnScroll = import_react.useCallback((_event) => {
		if (listRef.current) scrollTopRef.current = listRef.current.scrollTop;
	}, []);
	const handleOnFocus = import_react.useCallback((_event) => {
		if (!focusValue || 0 === focusValue.length) {
			if (currentValue) setFocusValue(currentValue);
			else if (optionValues.length > 0) setFocusValue(optionValues[0].value);
		}
	}, [
		currentValue,
		focusValue,
		optionValues
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("ul", {
		className: classes,
		"aria-labelledby": ariaLabel ? void 0 : ariaLabelledBy,
		"aria-label": ariaLabel,
		role: "listbox",
		tabIndex: 0,
		"aria-activedescendant": makeId(currentValue, listId),
		...otherProps,
		ref: listRef,
		id: listId,
		onKeyDown: handleKeyDown,
		onScroll: handleOnScroll,
		"data-value": currentValue,
		"data-focusvalue": focusValue,
		onFocus: handleOnFocus,
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ListboxContext.Provider, {
			value: {
				listboxValue: currentValue,
				focusValue,
				listboxId: listId,
				onListboxValueChange: handleValueChange,
				listboxRef: listRef
			},
			children
		})
	});
}
/** `ListboxItem` component.
* @public
* @deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/list iTwinUI list} instead.
*/
function ListboxItem(props) {
	const { children, value, className, disabled, ...otherProps } = props;
	const { listboxValue, focusValue, listboxId, onListboxValueChange } = import_react.useContext(ListboxContext);
	const hasFocus = focusValue === value;
	const classes = import_react.useMemo(() => (0, import_classnames.default)("core-listbox-item", hasFocus && "focused", className), [className, hasFocus]);
	const itemRef = import_react.useRef(null);
	const isSelected = listboxValue === value;
	const handleClick = import_react.useCallback((event) => {
		event.preventDefault();
		const selectedValue = event.currentTarget?.dataset?.value;
		if (void 0 !== selectedValue) onListboxValueChange(selectedValue, event.ctrlKey);
	}, [onListboxValueChange]);
	const getItemId = import_react.useCallback(() => {
		return makeId(value, listboxId);
	}, [listboxId, value]);
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("li", {
		"aria-selected": isSelected,
		"aria-disabled": disabled || void 0,
		role: "option",
		className: classes,
		...otherProps,
		ref: itemRef,
		id: getItemId(),
		"data-value": value,
		onClick: handleClick,
		children
	});
}
var import_react, import_classnames, import_Key_enum, import_jsx_runtime$1, ListboxContext;
var init_Listbox = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_Key_enum = require_Key_enum();
	init_Listbox$1();
	init_core_bentley();
	import_jsx_runtime$1 = require_jsx_runtime();
	ListboxContext = import_react.createContext({ onListboxValueChange: (_newValue) => {} });
	Listbox.__docgenInfo = {
		"description": "Single select `Listbox` component\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/list iTwinUI list} instead.",
		"methods": [],
		"displayName": "Listbox",
		"props": {
			"id": {
				"required": false,
				"tsType": { "name": "string" },
				"description": ""
			},
			"selectedValue": {
				"required": false,
				"tsType": { "name": "string" },
				"description": ""
			},
			"ariaLabel": {
				"required": false,
				"tsType": { "name": "any" },
				"description": ""
			},
			"ariaLabelledBy": {
				"required": false,
				"tsType": { "name": "any" },
				"description": ""
			},
			"onListboxValueChange": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(\n  newValue: ListboxValue,\n  isControlOrCommandPressed?: boolean\n) => void",
					"signature": {
						"arguments": [{
							"type": { "name": "string" },
							"name": "newValue"
						}, {
							"type": { "name": "boolean" },
							"name": "isControlOrCommandPressed"
						}],
						"return": { "name": "void" }
					}
				},
				"description": ""
			}
		}
	};
	ListboxItem.__docgenInfo = {
		"description": "`ListboxItem` component.\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/list iTwinUI list} instead.",
		"methods": [],
		"displayName": "ListboxItem",
		"props": {
			"value": {
				"required": true,
				"tsType": { "name": "string" },
				"description": "The unique item's value."
			},
			"disabled": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "set if item is disabled."
			}
		}
	};
}));
//#endregion
//#region src/deprecated/Listbox.stories.tsx
var import_jsx_runtime, meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Listbox();
	init_Decorators();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Deprecated/Listbox",
		component: Listbox,
		tags: ["autodocs"],
		decorators: [AppUiDecorator]
	};
	Basic = { args: { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListboxItem, {
			value: "1",
			children: "Item 1"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListboxItem, {
			value: "2",
			children: "Item 2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListboxItem, {
			value: "3",
			children: "Item 3"
		})
	] }) } };
	Basic.parameters = {
		...Basic.parameters,
		docs: {
			...Basic.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    children: <>\n        <ListboxItem value=\"1\">Item 1</ListboxItem>\n        <ListboxItem value=\"2\">Item 2</ListboxItem>\n        <ListboxItem value=\"3\">Item 3</ListboxItem>\n      </>\n  }\n}",
				...Basic.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Basic"];
}))();
export { Basic, __namedExportsOrder, meta as default };
