import { j as jsxRuntimeExports } from "./jsx-runtime-f7WWSPSb.js";
const withResizer = (Story, context) => {
  const resizer = !!context.globals.resizer;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: resizer ? {
        resize: "both",
        overflow: "auto",
        padding: "10px",
        border: "2px solid black"
      } : void 0,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {})
    }
  );
};
const resizerGlobalType = {
  description: "Story resizer",
  defaultValue: void 0,
  toolbar: {
    title: "Resizer",
    icon: "tablet",
    items: [
      { title: "Enable", value: "true" },
      { title: "Disable", type: "reset" }
    ]
  }
};
withResizer.__docgenInfo = { "description": "", "methods": [], "displayName": "withResizer" };
export {
  resizerGlobalType as r,
  withResizer as w
};
