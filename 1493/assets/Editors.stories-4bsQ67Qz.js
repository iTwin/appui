import { j as jsxRuntimeExports } from "./iframe-DCd7i-3L.js";
import "./Key.enum-CHcihfJj.js";
import "./appui-react-Cc0nytPC.js";
import { E as EditorExampleComponent, A as AppUiStory } from "./AppUiStory-BV40lN9q.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-ByjZ9BLp.js";
import "./index-CTrMaIM3.js";
import "./blocks-CVngoSY8.js";
import "./Utils-D4iHIdHU.js";
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
