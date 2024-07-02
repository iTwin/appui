var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { c as classnames } from "./Key.enum-B7uESc6p.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import { h as Input$1 } from "./DefaultToolSettingsProvider-CLwhashG.js";
import { S as Svg2D } from "./2D-BxdbF6B_.js";
import { A as AppUiDecorator } from "./Decorators-DcOwcMQU.js";
import "./iframe-C9wXFbML.js";
import "../sb-preview/runtime.js";
import "./index-EDRsojbr.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-B47T7vRo.js";
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
function mergeRefs(...refs) {
  return (instance) => {
    for (const ref of refs) {
      if (ref) {
        if (isRefCallback(ref)) {
          ref(instance);
        } else {
          ref.current = instance;
        }
      }
    }
  };
}
try {
  useRefs.displayName = "useRefs";
  useRefs.__docgenInfo = { "description": "Hook used to combine multiple refs.", "displayName": "useRefs", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  mergeRefs.displayName = "mergeRefs";
  mergeRefs.__docgenInfo = { "description": "Used to combine multiple refs for a class component.", "displayName": "mergeRefs", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
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
      if (inputElementRef.current && setFocus)
        inputElementRef.current.focus();
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
try {
  Input.displayName = "Input";
  Input.__docgenInfo = { "description": 'Basic text input, is a wrapper for the `<input type="text">` HTML element.', "displayName": "Input", "props": { "setFocus": { "defaultValue": null, "description": "Indicates whether to set focus to the input element", "name": "setFocus", "required": false, "type": { "name": "boolean" } }, "nativeKeyHandler": { "defaultValue": null, "description": "Native keydown event handler", "name": "nativeKeyHandler", "required": false, "type": { "name": "((e: KeyboardEvent) => void)" } }, "ref": { "defaultValue": null, "description": "Provides ability to return reference to HTMLInputElement", "name": "ref", "required": false, "type": { "name": "Ref<HTMLInputElement>" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
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
