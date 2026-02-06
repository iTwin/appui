import { j as jsxRuntimeExports } from "./iframe-BmX5H014.js";
import "./Key.enum-DvCHltQ0.js";
import "./appui-react-DXkFctUx.js";
import { E as EditorExampleComponent, A as AppUiStory } from "./AppUiStory-Cv85Pvas.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-M2bM1T3-.js";
import "./index-D95LU0cB.js";
import "./blocks-CrcdVEJ9.js";
import "./Utils-C4oq2jmg.js";
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
