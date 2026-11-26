import { j as jsxRuntimeExports } from "./iframe-D8NJimLr.js";
import "./Key.enum-BiZltsZP.js";
import "./appui-react-D6ABwSZ-.js";
import { E as EditorExampleComponent, A as AppUiStory } from "./AppUiStory-CSwfECLM.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-D3QKcxNP.js";
import "./index-50wz-xKp.js";
import "./blocks-Bj0mf2N-.js";
import "./Utils-Djyde08H.js";
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
