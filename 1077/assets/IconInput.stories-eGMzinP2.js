var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { c as classnames } from "./Dialog-DTDXG56W.js";
import { r as reactExports } from "./index-DDLqOySG.js";
import { $ as Input$1 } from "./appui-react-CBbJ9xf2.js";
import { S as Svg2D } from "./2D-DLlBlgPB.js";
import { A as AppUiDecorator } from "./Decorators-CDcxSICj.js";
import "./iframe-BXBvyZOg.js";
import "../sb-preview/runtime.js";
import "./index-BwI9SQDf.js";
import "./inheritsLoose-HEqISCW8.js";
import "./_commonjs-dynamic-modules-DTCOR0lh.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
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
        className: classnames("uicore-inputs-input", className),
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
        className: classnames("core-iconInput-container", containerClassName),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              ref,
              className: classnames("core-input", className),
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
