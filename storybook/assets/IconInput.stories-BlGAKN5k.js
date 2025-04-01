var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-f7WWSPSb.js";
import { c as cx } from "./SvgCloseSmall-A2OtI3ac.js";
import { r as reactExports } from "./index-R26Bfrts.js";
import { a6 as Input$1 } from "./appui-react-DeRnklYl.js";
import { S as Svg2D } from "./2D-DzQW5YkV.js";
import { A as AppUiDecorator } from "./Decorators-B9I4cguV.js";
import "./index-CHBBkG1-.js";
import "./iframe-pbfpR55Y.js";
import "../sb-preview/runtime.js";
import "./Dialog-BTC9-vGF.js";
import "./_commonjs-dynamic-modules-lq-lihFa.js";
import "./index-oY8aizO2.js";
import "./client-DRUEp2wC.js";
import "./debounce-CTTNlY27.js";
function isRefCallback(ref) {
  return typeof ref === "function";
}
function useRefs(...refs) {
  return reactExports.useCallback(
    (instance) => {
      for (const ref of refs) {
        if (ref) {
          if (isRefCallback(ref)) {
            ref(instance);
          } else {
            ref.current = instance;
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...refs]
  );
}
const ForwardRefInput = reactExports.forwardRef(
  function ForwardRefInput2(props, ref) {
    const {
      className,
      style,
      setFocus,
      nativeKeyHandler,
      size,
      ...otherProps
    } = props;
    const inputElementRef = reactExports.useRef(null);
    const refs = useRefs(inputElementRef, ref);
    reactExports.useEffect(() => {
      const currentElement = inputElementRef.current;
      const currentHandler = nativeKeyHandler;
      if (currentElement && currentHandler) {
        currentElement.addEventListener("keydown", currentHandler);
      }
      return () => {
        if (currentHandler && currentElement) {
          currentElement.removeEventListener("keydown", currentHandler);
        }
      };
    }, [nativeKeyHandler]);
    reactExports.useEffect(() => {
      if (inputElementRef.current && setFocus) inputElementRef.current.focus();
    }, [setFocus]);
    const handleFocus = reactExports.useCallback(
      (event) => {
        event.currentTarget.select();
      },
      []
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input$1,
      {
        ref: refs,
        type: "text",
        ...otherProps,
        onFocus: handleFocus,
        className: cx("uicore-inputs-input", className),
        style
      }
    );
  }
);
const Input = ForwardRefInput;
ForwardRefInput.__docgenInfo = { "description": "", "methods": [], "displayName": "ForwardRefInput" };
const ForwardRefIconInput = reactExports.forwardRef(
  function ForwardRefIconInput2(props, ref) {
    const { className, icon, containerClassName, size, ...otherProps } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cx("core-iconInput-container", containerClassName),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              ref,
              className: cx("core-input", className),
              ...otherProps
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core-iconInput-icon", children: icon })
        ]
      }
    );
  }
);
const IconInput = ForwardRefIconInput;
ForwardRefIconInput.__docgenInfo = { "description": "Input component with icon to the left of the input field\n@public", "methods": [], "displayName": "ForwardRefIconInput" };
const meta = {
  title: "Deprecated/IconInput",
  component: IconInput,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Basic = {
  args: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Svg2D, {})
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  args: {\n    icon: <Svg2D />\n  }\n}",
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
