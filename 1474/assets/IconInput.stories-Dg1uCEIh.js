import { r as reactExports, j as jsxRuntimeExports, c as classnames } from "./iframe-MZ9GDAUV.js";
import { X as Input$1 } from "./appui-react-CxqBCL1K.js";
import { S as Svg2D } from "./2D-C_I84eoA.js";
import { A as AppUiDecorator } from "./Decorators-ByA6YP1P.js";
import "./Key.enum-BlUwKc_n.js";
import "./client-CdcWlIUh.js";
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
ForwardRefInput.__docgenInfo = { "description": "", "methods": [], "displayName": "ForwardRefInput", "props": { "setFocus": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether to set focus to the input element" }, "nativeKeyHandler": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(e: KeyboardEvent) => void", "signature": { "arguments": [{ "type": { "name": "KeyboardEvent" }, "name": "e" }], "return": { "name": "void" } } }, "description": "Native keydown event handler" }, "ref": { "required": false, "tsType": { "name": "ReactRef", "raw": "React.Ref<HTMLInputElement>", "elements": [{ "name": "HTMLInputElement" }] }, "description": "Provides ability to return reference to HTMLInputElement" } }, "composes": ["CommonProps"] };
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
ForwardRefIconInput.__docgenInfo = { "description": "Input component with icon to the left of the input field\n@public", "methods": [], "displayName": "ForwardRefIconInput", "props": { "icon": { "required": true, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Icon displayed to the left of the Input field within the IconInput component" }, "containerClassName": { "required": false, "tsType": { "name": "string" }, "description": "CSS class name for the IconInput component container div" }, "ref": { "required": false, "tsType": { "name": "ReactRef", "raw": "React.Ref<HTMLInputElement>", "elements": [{ "name": "HTMLInputElement" }] }, "description": "Provides ability to return reference to HTMLInputElement" }, "size": { "required": false, "tsType": { "name": "union", "raw": '"small" | "large"', "elements": [{ "name": "literal", "value": '"small"' }, { "name": "literal", "value": '"large"' }] }, "description": "Modify size of the input." } }, "composes": ["Omit"] };
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
    ...Basic.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    icon: <Svg2D />\n  }\n}",
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
