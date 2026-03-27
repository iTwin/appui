import { r as reactExports, c as classnames, j as jsxRuntimeExports } from "./iframe-BnF7kxuI.js";
import { K as Key_enumExports } from "./Key.enum-B3pThNWo.js";
import { I as Icon } from "./IconComponent-BU7ivNbK.js";
import { X as Input, b5 as SvgCaretUp, b6 as SvgCaretUpSmall, b7 as SvgCaretDown, b8 as SvgCaretDownSmall } from "./appui-react-B7iNJbV5.js";
import { A as AppUiDecorator } from "./Decorators-CwkwcaGG.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-DYbOg5lC.js";
import "./index-CptIXb7J.js";
const ForwardRefNumberInput = reactExports.forwardRef(function ForwardRefNumberInput2(props, ref) {
  const {
    containerClassName,
    className,
    value,
    min,
    max,
    precision,
    format,
    parse,
    onChange,
    onBlur,
    onKeyDown,
    step,
    snap,
    showTouchButtons,
    containerStyle,
    isControlled,
    ...otherProps
  } = props;
  const currentValueRef = reactExports.useRef(value);
  const parseInternal = reactExports.useCallback(
    (x) => {
      let n;
      if (parse) n = parse(x);
      if (void 0 === n || null === n) {
        n = parseFloat(x);
        if (isNaN(n) || !isFinite(n)) {
          n = 0;
        }
      }
      const localPrecision = void 0 === precision ? 10 : precision;
      const q = Math.pow(10, localPrecision);
      const localMin = void 0 === min ? Number.MIN_SAFE_INTEGER : min;
      const localMax = void 0 === max ? Number.MAX_SAFE_INTEGER : max;
      n = Math.min(Math.max(n, localMin), localMax);
      n = Math.round(n * q) / q;
      return n;
    },
    [parse, precision, min, max]
  );
  const formatInternal = reactExports.useCallback(
    (num) => {
      const localPrecision = void 0 === precision || null === precision ? 0 : precision;
      const str = void 0 === num || null === num ? "" : num.toFixed(localPrecision);
      if (format) return format(num, str);
      return str;
    },
    [format, precision]
  );
  const [formattedValue, setFormattedValue] = reactExports.useState(
    () => formatInternal(value)
  );
  reactExports.useEffect(() => {
    currentValueRef.current = value;
    const currentFormattedValue = formatInternal(currentValueRef.current);
    setFormattedValue(currentFormattedValue);
  }, [formatInternal, value]);
  const handleChange = reactExports.useCallback(
    (event) => {
      const newVal = event.currentTarget.value;
      setFormattedValue(newVal);
      isControlled && onChange && onChange(parseInternal(newVal), newVal);
    },
    [isControlled, onChange, parseInternal]
  );
  const updateValue = reactExports.useCallback(
    (newVal) => {
      const newFormattedVal = formatInternal(newVal);
      onChange && onChange(newVal, newFormattedVal);
      setFormattedValue(newFormattedVal);
    },
    [onChange, formatInternal]
  );
  const updateValueFromString = reactExports.useCallback(
    (strValue) => {
      const newVal = parseInternal(strValue);
      updateValue(newVal);
    },
    [parseInternal, updateValue]
  );
  const handleBlur = reactExports.useCallback(
    (event) => {
      const newVal = parseInternal(event.target.value);
      onBlur && onBlur(event);
      updateValue(newVal);
    },
    [parseInternal, updateValue, onBlur]
  );
  const getIncrementValue = reactExports.useCallback(
    (increment) => {
      if (typeof step === "function") {
        const stepVal = step(increment ? "up" : "down");
        return stepVal ? stepVal : 1;
      }
      return !step ? 1 : step;
    },
    [step]
  );
  const applyStep = reactExports.useCallback(
    (increment) => {
      const incrementValue = getIncrementValue(increment);
      let num = parseInternal(formattedValue) + (increment ? incrementValue : -incrementValue);
      if (snap) {
        num = Math.round(num / incrementValue) * incrementValue;
      }
      const localMin = void 0 === min ? Number.MIN_SAFE_INTEGER : min;
      const localMax = void 0 === max ? Number.MAX_SAFE_INTEGER : max;
      num = Math.min(Math.max(num, localMin), localMax);
      updateValue(num);
    },
    [
      formattedValue,
      getIncrementValue,
      max,
      min,
      parseInternal,
      snap,
      updateValue
    ]
  );
  const handleKeyDown = reactExports.useCallback(
    (event) => {
      if (event.key === Key_enumExports.Key.Enter.valueOf()) {
        updateValueFromString(event.currentTarget.value);
        event.preventDefault();
        event.stopPropagation();
      } else if (event.key === Key_enumExports.Key.Escape.valueOf()) {
        setFormattedValue(formatInternal(currentValueRef.current));
        event.preventDefault();
      } else if (event.key === Key_enumExports.Key.ArrowDown.valueOf()) {
        applyStep(false);
        event.preventDefault();
        event.stopPropagation();
      } else if (event.key === Key_enumExports.Key.ArrowUp.valueOf()) {
        applyStep(true);
        event.preventDefault();
        event.stopPropagation();
      }
      onKeyDown && onKeyDown(event);
    },
    [applyStep, formatInternal, updateValueFromString, onKeyDown]
  );
  const handleDownClick = reactExports.useCallback(
    (event) => {
      applyStep(false);
      event.preventDefault();
    },
    [applyStep]
  );
  const handleUpClick = reactExports.useCallback(
    (event) => {
      applyStep(true);
      event.preventDefault();
    },
    [applyStep]
  );
  const handleFocus = reactExports.useCallback(
    (event) => {
      event.currentTarget.select();
    },
    []
  );
  const isDisabled = !!otherProps.disabled;
  const containerClasses = classnames(
    "core-number-input-container",
    containerClassName,
    showTouchButtons && "core-number-buttons-for-touch",
    isDisabled && "core-number-input-disabled"
  );
  const caretUp = showTouchButtons ? /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCaretUp, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCaretUpSmall, {});
  const caretDown = showTouchButtons ? /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCaretDown, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCaretDownSmall, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: containerClasses, style: containerStyle, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        ref,
        value: formattedValue,
        onChange: handleChange,
        onKeyDown: handleKeyDown,
        onFocus: handleFocus,
        onBlur: handleBlur,
        size: "small",
        className: classnames("core-input", className),
        ...otherProps
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: classnames(
          "core-number-input-buttons-container",
          showTouchButtons && "core-number-buttons-for-touch"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "core-number-input-button core-number-input-button-up",
              tabIndex: -1,
              onClick: handleUpClick,
              role: "presentation",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: caretUp })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "core-number-input-button core-number-input-button-down",
              tabIndex: -1,
              onClick: handleDownClick,
              role: "presentation",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: caretDown })
            }
          )
        ]
      }
    )
  ] });
});
const NumberInput = ForwardRefNumberInput;
ForwardRefNumberInput.__docgenInfo = { "description": "", "methods": [], "displayName": "ForwardRefNumberInput", "props": { "value": { "required": false, "tsType": { "name": "number" }, "description": "Numeric value, set to `undefined` to show placeholder text" }, "containerClassName": { "required": false, "tsType": { "name": "string" }, "description": "CSS class name for the NumberInput component container div" }, "containerStyle": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Style for component container div." }, "min": { "required": false, "tsType": { "name": "number" }, "description": "number or function	Number.MIN_SAFE_INTEGER" }, "max": { "required": false, "tsType": { "name": "number" }, "description": "number or function	defaults to Number.MAX_SAFE_INTEGER" }, "step": { "required": false, "tsType": { "name": "union", "raw": "| number\n| ((direction: string) => number | undefined)", "elements": [{ "name": "number" }, { "name": "unknown" }] }, "description": "increment step value used while incrementing or decrementing (up/down buttons or arrow keys) defaults to 1." }, "precision": { "required": false, "tsType": { "name": "number" }, "description": "number of decimal places, defaults to 0" }, "parse": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(value: string) => number | null | undefined", "signature": { "arguments": [{ "type": { "name": "string" }, "name": "value" }], "return": { "name": "union", "raw": "number | null | undefined", "elements": [{ "name": "number" }, { "name": "null" }, { "name": "undefined" }] } } }, "description": "function parseFloat" }, "format": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(num: number | null | undefined, formattedValue: string) => string", "signature": { "arguments": [{ "type": { "name": "union", "raw": "number | null | undefined", "elements": [{ "name": "number" }, { "name": "null" }, { "name": "undefined" }] }, "name": "num" }, { "type": { "name": "string" }, "name": "formattedValue" }], "return": { "name": "string" } } }, "description": "function optional formatting function that takes the number value and the internal formatted value in case function just adds prefix or suffix." }, "snap": { "required": false, "tsType": { "name": "boolean" }, "description": 'Set to true to "snap" to the closest step value while incrementing or decrementing (up/down buttons or arrow keys).' }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(value: number | undefined, stringValue: string) => void", "signature": { "arguments": [{ "type": { "name": "union", "raw": "number | undefined", "elements": [{ "name": "number" }, { "name": "undefined" }] }, "name": "value" }, { "type": { "name": "string" }, "name": "stringValue" }], "return": { "name": "void" } } }, "description": "Function to call when value is changed." }, "showTouchButtons": { "required": false, "tsType": { "name": "boolean" }, "description": "if true up/down buttons are shown larger and side by side" }, "ref": { "required": false, "tsType": { "name": "ReactRef", "raw": "React.Ref<HTMLInputElement>", "elements": [{ "name": "HTMLInputElement" }] }, "description": "Provides ability to return reference to HTMLInputElement" }, "isControlled": { "required": false, "tsType": { "name": "boolean" }, "description": "Makes this component behave as controlled component.\n@internal" } }, "composes": ["Omit"] };
const meta = {
  title: "Deprecated/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Basic = {
  args: {}
};
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
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
