var _a, _b, _c;
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { a as action } from "./index-6lyHBX71.js";
import { U as UiFramework, x as ToolbarItemUtilities, a5 as SvgInfo } from "./appui-react-Dl7Zotdf.js";
import { A as AppUiStory } from "./AppUiStory-RiJNuQz6.js";
import "./index-DVOlmhHI.js";
import { S as SvgCut, a as SvgSaveSettings, b as SvgSave, c as SvgSaveAs, d as SvgSaveUpdate } from "./Save-B16TMChf.js";
import "./index-CdGyBOBZ.js";
import "./v4-CjlX8hrF.js";
import "./Dialog-D8X5n1Ze.js";
import "./SvgCloseSmall-DMa1Cocg.js";
import "./iframe-CMr3liut.js";
import "./client-DmvY241V.js";
import "./index-jG0EcXCq.js";
import "./index-XG6mIJUL.js";
import "./index-BdOSk9or.js";
import "./Utils-A70xa9OL.js";
import "./DemoIModel-selgNRA5.js";
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
          action("onItemExecuted"),
          action("onCancel"),
          placement
        );
      }
    }
  );
}
ToolbarPopupStory.__docgenInfo = { "description": "[UiFramework.showToolbar()](https://www.itwinjs.org/reference/appui-react/utilities/uiframework/showtoolbarstatic/) API can be used to show a toolbar popup.", "methods": [], "displayName": "ToolbarPopupStory", "props": { "title": { "required": false, "tsType": { "name": "string" }, "description": "" }, "toolbarProps": { "required": true, "tsType": { "name": "Parameters[0]", "raw": "ShowToolbarParams[0]" }, "description": "" }, "location": { "required": true, "tsType": { "name": "Parameters[1]", "raw": "ShowToolbarParams[1]" }, "description": "" }, "offset": { "required": true, "tsType": { "name": "Parameters[2]", "raw": "ShowToolbarParams[2]" }, "description": "" }, "placement": { "required": true, "tsType": { "name": "Parameters[5]", "raw": "ShowToolbarParams[5]" }, "description": "" } } };
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
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
