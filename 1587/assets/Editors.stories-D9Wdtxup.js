import { j as jsxRuntimeExports } from "./iframe-CpRh-TYa.js";
import "./Key.enum-DCghlnp9.js";
import "./appui-react-BtU_mNFj.js";
import { E as EditorExampleComponent, A as AppUiStory } from "./AppUiStory-Be3BgbZq.js";
import "./components-react-Dj8XcCyt.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-_JpHN5Jx.js";
import "./Dialog-BycrGCvo.js";
import "./blocks-DE0lqga4.js";
import "./Utils-BFxNE3WT.js";
import "./client-Cvp-1q-B.js";
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
