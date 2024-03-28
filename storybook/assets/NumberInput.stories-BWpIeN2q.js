var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-_iMjpMZ4.js";
import { K as Key_enum, c as classnames, I as Input, q as SvgCaretUp, r as SvgCaretUpSmall, s as SvgCaretDown, t as SvgCaretDownSmall } from "./DefaultToolSettingsProvider-Do4qbEAN.js";
import { r as reactExports } from "./index-DlkhCVTf.js";
import { I as Icon } from "./IconComponent-CTiw7tHs.js";
import { A as AppUiDecorator } from "./Decorators-CXFXT6hr.js";
import "./index-Cm_5MPU1.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./getPrototypeOf-BmmMfuHC.js";
import "./iframe-kR_u1aqe.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
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
      if (parse)
        n = parse(x);
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
      if (format)
        return format(num, str);
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
      if (event.key === Key_enum.Key.Enter.valueOf()) {
        updateValueFromString(event.currentTarget.value);
        event.preventDefault();
        event.stopPropagation();
      } else if (event.key === Key_enum.Key.Escape.valueOf()) {
        setFormattedValue(formatInternal(currentValueRef.current));
        event.preventDefault();
      } else if (event.key === Key_enum.Key.ArrowDown.valueOf()) {
        applyStep(false);
        event.preventDefault();
        event.stopPropagation();
      } else if (event.key === Key_enum.Key.ArrowUp.valueOf()) {
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
const meta = {
  title: "Components/Inputs/NumberInput",
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
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  args: {}\n}",
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
