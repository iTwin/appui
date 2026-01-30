import { j as jsxRuntimeExports } from "./iframe-CLfdfAl1.js";
import "./Key.enum-DZrcflso.js";
import "./appui-react-DlzUwJvs.js";
import { E as EditorExampleComponent, A as AppUiStory } from "./AppUiStory-BLIjtn2Z.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-D8vXmL2m.js";
import "./index-DuJcsXoL.js";
import "./blocks-Bwva7fi3.js";
import "./Utils-BCzx_3pi.js";
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
