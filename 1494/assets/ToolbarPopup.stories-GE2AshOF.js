import { j as jsxRuntimeExports } from "./iframe-B5XhNadd.js";
import { U as UiFramework, r as ToolbarItemUtilities, x as SvgInfo } from "./appui-react-CwKstaKu.js";
import { A as AppUiStory } from "./AppUiStory-iS4J_UUr.js";
import { S as SvgCut, a as SvgSaveSettings, b as SvgSave, c as SvgSaveAs, d as SvgSaveUpdate } from "./Save-DXxEIe5w.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-szt-ThaG.js";
import "./client-H2bURNxP.js";
import "./index-B5vH9_xk.js";
import "./blocks-CGJKxwwC.js";
import "./Utils-98Mhw6iN.js";
const { action: action$1 } = __STORYBOOK_MODULE_ACTIONS__;
function ToolbarPopupStory({
  toolbarProps,
  location,
  offset,
  placement
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      onInitialize: async () => {
        UiFramework.showToolbar(
          toolbarProps,
          location,
          offset,
          action$1("onItemExecuted"),
          action$1("onCancel"),
          placement
        );
      }
    }
  );
}
ToolbarPopupStory.__docgenInfo = { "description": "[UiFramework.showToolbar()](https://www.itwinjs.org/reference/appui-react/utilities/uiframework/showtoolbarstatic/) API can be used to show a toolbar popup.", "methods": [], "displayName": "ToolbarPopupStory", "props": { "title": { "required": false, "tsType": { "name": "string" }, "description": "" }, "toolbarProps": { "required": true, "tsType": { "name": "Parameters[0]", "raw": "ShowToolbarParams[0]" }, "description": "" }, "location": { "required": true, "tsType": { "name": "Parameters[1]", "raw": "ShowToolbarParams[1]" }, "description": "" }, "offset": { "required": true, "tsType": { "name": "Parameters[2]", "raw": "ShowToolbarParams[2]" }, "description": "" }, "placement": { "required": true, "tsType": { "name": "Parameters[5]", "raw": "ShowToolbarParams[5]" }, "description": "" } } };
const { action } = __STORYBOOK_MODULE_ACTIONS__;
const meta = {
  title: "Components/ToolbarPopup",
  component: ToolbarPopupStory,
  tags: ["autodocs"],
  args: {
    title: "Platform ABC123",
    location: {
      x: 100,
      y: 100
    },
    offset: {
      x: 0,
      y: 0
    },
    toolbarProps: {
      items: [ToolbarItemUtilities.createActionItem("item1", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgInfo, {}), "Item 1", action("Item 1")), ToolbarItemUtilities.createActionItem("item2", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCut, {}), "Item 2", action("Item 2")), ToolbarItemUtilities.createGroupItem("item3", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgSaveSettings, {}), "Item 3", [ToolbarItemUtilities.createActionItem("item3_1", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgSave, {}), "Item 3_1", action("Item 3_1")), ToolbarItemUtilities.createActionItem("item3_2", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgSaveAs, {}), "Item 3_2", action("Item 3_2")), ToolbarItemUtilities.createActionItem("item3_3", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgSaveUpdate, {}), "Item 3_3", action("Item 3_3"))])]
    },
    placement: "right-start"
  }
};
const Basic = {};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...Basic.parameters?.docs,
    source: {
      originalSource: "{}",
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
