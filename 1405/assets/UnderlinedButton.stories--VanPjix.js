var _a, _b, _c;
import { A as AppUiDecorator } from "./Decorators-HnNTMyPw.js";
import { r as reactExports, c as classnames, j as jsxRuntimeExports } from "./iframe-DQy1AcBq.js";
import { K as Key_enumExports } from "./Key.enum-CmhcI3db.js";
import "./appui-react-DY_MpVZu.js";
import "./client-G0M5LdjD.js";
function UnderlinedButton(props) {
  const handleKeyUp = reactExports.useCallback(
    (event) => {
      const key = event.key;
      switch (key) {
        case Key_enumExports.Key.Enter.valueOf():
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
UnderlinedButton.__docgenInfo = { "description": "A React component that makes text clickable and underlined\n@public\n@deprecated in 4.13.0. Use {@link https://itwinui.bentley.com/docs/anchor iTwinUI anchor} or {@link https://itwinui.bentley.com/docs/button button} instead.", "methods": [], "displayName": "UnderlinedButton", "props": { "children": { "required": true, "tsType": { "name": "union", "raw": "string | React.ReactNode", "elements": [{ "name": "string" }, { "name": "ReactReactNode", "raw": "React.ReactNode" }] }, "description": "String that will be rendered by the button" }, "className": { "required": false, "tsType": { "name": "string" }, "description": "Additional className" }, "title": { "required": false, "tsType": { "name": "string" }, "description": "Title of the button" }, "onClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(e: React.MouseEvent) => void", "signature": { "arguments": [{ "type": { "name": "ReactMouseEvent", "raw": "React.MouseEvent" }, "name": "e" }], "return": { "name": "void" } } }, "description": "Callback to onClick event" }, "onActivate": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Callback to activate" } } };
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
