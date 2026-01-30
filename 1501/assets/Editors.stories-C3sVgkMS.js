import { j as jsxRuntimeExports } from "./iframe-A-daL9dH.js";
import "./Key.enum-CiB4OVGn.js";
import "./appui-react-DFr32jNI.js";
import { E as EditorExampleComponent, A as AppUiStory } from "./AppUiStory-BzeGt--P.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-BinWtdfJ.js";
import "./index-Cv1bF3Cl.js";
import "./blocks-Cpp__keO.js";
import "./Utils-DpvN-rTe.js";
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
