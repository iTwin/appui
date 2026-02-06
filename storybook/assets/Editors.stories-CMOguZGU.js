import { j as jsxRuntimeExports } from "./iframe-CmD0Hb4y.js";
import "./Key.enum-DiqAEzk8.js";
import "./appui-react-DgImBujK.js";
import { E as EditorExampleComponent, A as AppUiStory } from "./AppUiStory-DV8mE_E8.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-eTkMhgnB.js";
import "./index-CzRyVTiY.js";
import "./blocks-CqC2p7bk.js";
import "./Utils-DGcn9Fj-.js";
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
