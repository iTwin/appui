import { j as jsxRuntimeExports } from "./iframe-Bw_N4eUI.js";
import "./Key.enum-D-1rx8MU.js";
import "./appui-react-C_1Z-tb4.js";
import { E as EditorExampleComponent, A as AppUiStory } from "./AppUiStory-DvSGBHsI.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-CKwtnCjo.js";
import "./index-Btv7an_F.js";
import "./blocks-CpM4JGSK.js";
import "./Utils-DStvCVQ7.js";
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
