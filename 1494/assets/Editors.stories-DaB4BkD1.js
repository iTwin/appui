import { j as jsxRuntimeExports } from "./iframe-BTOKt8sb.js";
import "./Key.enum-DdwJ-Wkg.js";
import "./appui-react-nOGh2M21.js";
import { E as EditorExampleComponent, A as AppUiStory } from "./AppUiStory-DWrXMzNt.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-BuoZTSzj.js";
import "./index-C8w0C_Xr.js";
import "./blocks-D95ser5u.js";
import "./Utils-DSy70KJB.js";
const meta = {
  title: "Components/Editors",
  component: EditorExampleComponent,
  tags: ["autodocs"]
};
const Basic = {
  render: () => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, { displayChildrenOnly: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      padding: 20,
      position: "relative"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(EditorExampleComponent, {}) }) });
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...Basic.parameters?.docs,
    source: {
      originalSource: '{\n  render: () => {\n    return <AppUiStory displayChildrenOnly>\n        <div style={{\n        padding: 20,\n        position: "relative"\n      }}>\n          <EditorExampleComponent />\n        </div>\n      </AppUiStory>;\n  }\n}',
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
