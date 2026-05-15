import { j as jsxRuntimeExports } from "./iframe-D6etZYKx.js";
import "./Key.enum-DxiaZ4K2.js";
import "./appui-react-DQPnIqIU.js";
import { E as EditorExampleComponent, A as AppUiStory } from "./AppUiStory-Cke2SHqr.js";
import "./components-react-CcAoSHHf.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-D6OYgiXS.js";
import "./Dialog-CnMxc27J.js";
import "./blocks-C98UqoJ1.js";
import "./Utils-WX8e-cwd.js";
import "./client-8d8O9vwT.js";
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
