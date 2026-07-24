import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { i as init_esm, qt as require_classnames, tt as Input } from "./iframe-DrBiZGmV.js";
import { t as require_Key_enum } from "./Key.enum-DhBIjxOv.js";
import { Ho as SvgCaretDown, Mo as SvgCaretUp, Po as SvgCaretUpSmall, Vr as init_esm$1, Wo as SvgCaretDownSmall } from "./components-react-DigDa1CF.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
import { n as init_IconComponent, t as Icon } from "./IconComponent-C_9BlyPG.js";
//#region ../../ui/core-react/src/core-react/inputs/numberinput/NumberInput.scss
var init_NumberInput$1 = __esmMin((() => {}));
//#endregion
//#region ../../ui/core-react/src/core-react/inputs/numberinput/NumberInput.tsx
var import_classnames, import_react, import_Key_enum, import_jsx_runtime, ForwardRefNumberInput, NumberInput;
var init_NumberInput = __esmMin((() => {
	init_NumberInput$1();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	import_Key_enum = require_Key_enum();
	init_esm();
	init_IconComponent();
	init_esm$1();
	import_jsx_runtime = require_jsx_runtime();
	ForwardRefNumberInput = import_react.forwardRef(function ForwardRefNumberInput(props, ref) {
		const { containerClassName, className, value, min, max, precision, format, parse, onChange, onBlur, onKeyDown, step, snap, showTouchButtons, containerStyle, isControlled, ...otherProps } = props;
		const currentValueRef = import_react.useRef(value);
		/**
		* Used internally to parse the argument x to it's numeric representation.
		* If the argument cannot be converted to finite number returns 0; If a
		* "precision" prop is specified uses it round the number with that
		* precision (no fixed precision here because the return value is float, not
		* string).
		*/
		const parseInternal = import_react.useCallback((x) => {
			let n;
			if (parse) n = parse(x);
			if (void 0 === n || null === n) {
				n = parseFloat(x);
				if (isNaN(n) || !isFinite(n)) n = 0;
			}
			const q = Math.pow(10, void 0 === precision ? 10 : precision);
			const localMin = void 0 === min ? Number.MIN_SAFE_INTEGER : min;
			const localMax = void 0 === max ? Number.MAX_SAFE_INTEGER : max;
			n = Math.min(Math.max(n, localMin), localMax);
			n = Math.round(n * q) / q;
			return n;
		}, [
			parse,
			precision,
			min,
			max
		]);
		/**
		* This is used internally to format a number to its display representation.
		* It will invoke the format function if one is provided.
		*/
		const formatInternal = import_react.useCallback((num) => {
			const localPrecision = void 0 === precision || null === precision ? 0 : precision;
			const str = void 0 === num || null === num ? "" : num.toFixed(localPrecision);
			if (format) return format(num, str);
			return str;
		}, [format, precision]);
		const [formattedValue, setFormattedValue] = import_react.useState(() => formatInternal(value));
		import_react.useEffect(() => {
			currentValueRef.current = value;
			const currentFormattedValue = formatInternal(currentValueRef.current);
			setFormattedValue(currentFormattedValue);
		}, [formatInternal, value]);
		const handleChange = import_react.useCallback((event) => {
			const newVal = event.currentTarget.value;
			setFormattedValue(newVal);
			isControlled && onChange && onChange(parseInternal(newVal), newVal);
		}, [
			isControlled,
			onChange,
			parseInternal
		]);
		const updateValue = import_react.useCallback((newVal) => {
			const newFormattedVal = formatInternal(newVal);
			onChange && onChange(newVal, newFormattedVal);
			setFormattedValue(newFormattedVal);
		}, [onChange, formatInternal]);
		const updateValueFromString = import_react.useCallback((strValue) => {
			const newVal = parseInternal(strValue);
			updateValue(newVal);
		}, [parseInternal, updateValue]);
		const handleBlur = import_react.useCallback((event) => {
			const newVal = parseInternal(event.target.value);
			onBlur && onBlur(event);
			updateValue(newVal);
		}, [
			parseInternal,
			updateValue,
			onBlur
		]);
		const getIncrementValue = import_react.useCallback((increment) => {
			if (typeof step === "function") {
				const stepVal = step(increment ? "up" : "down");
				return stepVal ? stepVal : 1;
			}
			return !step ? 1 : step;
		}, [step]);
		/**
		* The internal method that actually sets the new value on the input
		*/
		const applyStep = import_react.useCallback((increment) => {
			const incrementValue = getIncrementValue(increment);
			let num = parseInternal(formattedValue) + (increment ? incrementValue : -incrementValue);
			if (snap) num = Math.round(num / incrementValue) * incrementValue;
			const localMin = void 0 === min ? Number.MIN_SAFE_INTEGER : min;
			const localMax = void 0 === max ? Number.MAX_SAFE_INTEGER : max;
			num = Math.min(Math.max(num, localMin), localMax);
			updateValue(num);
		}, [
			formattedValue,
			getIncrementValue,
			max,
			min,
			parseInternal,
			snap,
			updateValue
		]);
		const handleKeyDown = import_react.useCallback((event) => {
			if (event.key === import_Key_enum.Key.Enter.valueOf()) {
				updateValueFromString(event.currentTarget.value);
				event.preventDefault();
				event.stopPropagation();
			} else if (event.key === import_Key_enum.Key.Escape.valueOf()) {
				setFormattedValue(formatInternal(currentValueRef.current));
				event.preventDefault();
			} else if (event.key === import_Key_enum.Key.ArrowDown.valueOf()) {
				applyStep(false);
				event.preventDefault();
				event.stopPropagation();
			} else if (event.key === import_Key_enum.Key.ArrowUp.valueOf()) {
				applyStep(true);
				event.preventDefault();
				event.stopPropagation();
			}
			onKeyDown && onKeyDown(event);
		}, [
			applyStep,
			formatInternal,
			updateValueFromString,
			onKeyDown
		]);
		const handleDownClick = import_react.useCallback((event) => {
			applyStep(false);
			event.preventDefault();
		}, [applyStep]);
		const handleUpClick = import_react.useCallback((event) => {
			applyStep(true);
			event.preventDefault();
		}, [applyStep]);
		const handleFocus = import_react.useCallback((event) => {
			event.currentTarget.select();
		}, []);
		const isDisabled = !!otherProps.disabled;
		const containerClasses = (0, import_classnames.default)("core-number-input-container", containerClassName, showTouchButtons && "core-number-buttons-for-touch", isDisabled && "core-number-input-disabled");
		const caretUp = showTouchButtons ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgCaretUp, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgCaretUpSmall, {});
		const caretDown = showTouchButtons ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgCaretDown, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgCaretDownSmall, {});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: containerClasses,
			style: containerStyle,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				ref,
				value: formattedValue,
				onChange: handleChange,
				onKeyDown: handleKeyDown,
				onFocus: handleFocus,
				onBlur: handleBlur,
				size: "small",
				className: (0, import_classnames.default)("core-input", className),
				...otherProps
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: (0, import_classnames.default)("core-number-input-buttons-container", showTouchButtons && "core-number-buttons-for-touch"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "core-number-input-button core-number-input-button-up",
					tabIndex: -1,
					onClick: handleUpClick,
					role: "presentation",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { iconSpec: caretUp })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "core-number-input-button core-number-input-button-down",
					tabIndex: -1,
					onClick: handleDownClick,
					role: "presentation",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { iconSpec: caretDown })
				})]
			})]
		});
	});
	NumberInput = ForwardRefNumberInput;
	ForwardRefNumberInput.__docgenInfo = {
		"description": "",
		"methods": [],
		"displayName": "ForwardRefNumberInput",
		"props": {
			"value": {
				"required": false,
				"tsType": { "name": "number" },
				"description": "Numeric value, set to `undefined` to show placeholder text"
			},
			"containerClassName": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "CSS class name for the NumberInput component container div"
			},
			"containerStyle": {
				"required": false,
				"tsType": {
					"name": "ReactCSSProperties",
					"raw": "React.CSSProperties"
				},
				"description": "Style for component container div."
			},
			"min": {
				"required": false,
				"tsType": { "name": "number" },
				"description": "number or function	Number.MIN_SAFE_INTEGER"
			},
			"max": {
				"required": false,
				"tsType": { "name": "number" },
				"description": "number or function	defaults to Number.MAX_SAFE_INTEGER"
			},
			"step": {
				"required": false,
				"tsType": {
					"name": "union",
					"raw": "| number\n| ((direction: string) => number | undefined)",
					"elements": [{ "name": "number" }, { "name": "unknown" }]
				},
				"description": "increment step value used while incrementing or decrementing (up/down buttons or arrow keys) defaults to 1."
			},
			"precision": {
				"required": false,
				"tsType": { "name": "number" },
				"description": "number of decimal places, defaults to 0"
			},
			"parse": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(value: string) => number | null | undefined",
					"signature": {
						"arguments": [{
							"type": { "name": "string" },
							"name": "value"
						}],
						"return": {
							"name": "union",
							"raw": "number | null | undefined",
							"elements": [
								{ "name": "number" },
								{ "name": "null" },
								{ "name": "undefined" }
							]
						}
					}
				},
				"description": "function parseFloat"
			},
			"format": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(num: number | null | undefined, formattedValue: string) => string",
					"signature": {
						"arguments": [{
							"type": {
								"name": "union",
								"raw": "number | null | undefined",
								"elements": [
									{ "name": "number" },
									{ "name": "null" },
									{ "name": "undefined" }
								]
							},
							"name": "num"
						}, {
							"type": { "name": "string" },
							"name": "formattedValue"
						}],
						"return": { "name": "string" }
					}
				},
				"description": "function optional formatting function that takes the number value and the internal formatted value in case function just adds prefix or suffix."
			},
			"snap": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Set to true to \"snap\" to the closest step value while incrementing or decrementing (up/down buttons or arrow keys)."
			},
			"onChange": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(value: number | undefined, stringValue: string) => void",
					"signature": {
						"arguments": [{
							"type": {
								"name": "union",
								"raw": "number | undefined",
								"elements": [{ "name": "number" }, { "name": "undefined" }]
							},
							"name": "value"
						}, {
							"type": { "name": "string" },
							"name": "stringValue"
						}],
						"return": { "name": "void" }
					}
				},
				"description": "Function to call when value is changed."
			},
			"showTouchButtons": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "if true up/down buttons are shown larger and side by side"
			},
			"ref": {
				"required": false,
				"tsType": {
					"name": "ReactRef",
					"raw": "React.Ref<HTMLInputElement>",
					"elements": [{ "name": "HTMLInputElement" }]
				},
				"description": "Provides ability to return reference to HTMLInputElement"
			},
			"isControlled": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Makes this component behave as controlled component.\n@internal"
			}
		},
		"composes": ["Omit"]
	};
}));
//#endregion
//#region src/deprecated/NumberInput.stories.tsx
var meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_NumberInput();
	init_Decorators();
	meta = {
		title: "Deprecated/NumberInput",
		component: NumberInput,
		tags: ["autodocs"],
		decorators: [AppUiDecorator]
	};
	Basic = { args: {} };
	Basic.parameters = {
		...Basic.parameters,
		docs: {
			...Basic.parameters?.docs,
			source: {
				originalSource: "{\n  args: {}\n}",
				...Basic.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Basic"];
}))();
export { Basic, __namedExportsOrder, meta as default };
