var _a, _b, _c;
import { A as AppUiDecorator } from "./Decorators-CXFrraVc.js";
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { K as Key_enum, c as classnames } from "./Key.enum-Nky5yUvk.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import "./DefaultToolSettingsProvider-BeaL6ll4.js";
import "./index-EDRsojbr.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./iframe-vMT8xG5O.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
function UnderlinedButton(props) {
  const handleKeyUp = reactExports.useCallback(
    (event) => {
      const key = event.key;
      switch (key) {
        case Key_enum.Key.Enter.valueOf():
        case " ":
          props.onActivate && props.onActivate();
          break;
      }
    },
    [props]
  );
  const handleClick = reactExports.useCallback(
    (e) => {
      props.onClick && props.onClick(e);
      props.onActivate && props.onActivate();
    },
    [props]
  );
  const className = classnames(
    "core-underlined-button",
    props.className ? props.className : void 0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className,
      title: props.title,
      onClick: handleClick,
      onKeyUp: handleKeyUp,
      tabIndex: 0,
      role: "link",
      children: props.children
    }
  );
}
try {
  UnderlinedButton.displayName = "UnderlinedButton";
  UnderlinedButton.__docgenInfo = { "description": "A React component that makes text clickable and underlined", "displayName": "UnderlinedButton", "props": { "children": { "defaultValue": null, "description": "String that will be rendered by the button", "name": "children", "required": true, "type": { "name": "ReactNode" } }, "className": { "defaultValue": null, "description": "Additional className", "name": "className", "required": false, "type": { "name": "string" } }, "title": { "defaultValue": null, "description": "Title of the button", "name": "title", "required": false, "type": { "name": "string" } }, "onClick": { "defaultValue": null, "description": "Callback to onClick event", "name": "onClick", "required": false, "type": { "name": "((e: MouseEvent<Element, MouseEvent>) => void)" } }, "onActivate": { "defaultValue": null, "description": "Callback to activate", "name": "onActivate", "required": false, "type": { "name": "(() => void)" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "Deprecated/UnderlinedButton",
  component: UnderlinedButton,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  args: {
    children: "Underlined Button"
  }
};
const Basic = {};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
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
