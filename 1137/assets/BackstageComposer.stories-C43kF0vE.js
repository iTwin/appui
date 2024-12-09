var _a, _b, _c, _d, _e, _f;
import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { U as UiFramework, B as BackstageItemUtilities, S as SvgPlaceholder } from "./appui-react-BrVg_KzD.js";
import { a as action } from "./chunk-D5ZWXAHU-CHda0_Q5.js";
import { A as AppUiStory } from "./AppUiStory-B0zX2lyn.js";
import "./index-DDLqOySG.js";
import { B as BackstageComposer } from "./BackstageComposer-D_ytgRt_.js";
import "./Dialog-_9yF_J_N.js";
import "./index-BwI9SQDf.js";
import "./iframe-EbaAStc9.js";
import "../sb-preview/runtime.js";
import "./inheritsLoose-HEqISCW8.js";
import "./_commonjs-dynamic-modules-DTCOR0lh.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
import "./v4-BL5qiJc1.js";
import "./index-6KBghMCB.js";
import "./index-DLlB04eo.js";
import "./index-BZDuRpLS.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-B8H6_QN-.js";
function createOpenBackstage(itemProvider) {
  return (Story) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, { onFrontstageActivated: () => {
      UiFramework.backstage.open();
    }, appBackstage: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}), itemProviders: [itemProvider] });
  };
}
const meta = {
  title: "Components/BackstageComposer",
  component: BackstageComposer,
  tags: ["autodocs"]
};
const Icons = {
  args: {},
  decorators: [createOpenBackstage({
    id: "p1",
    getBackstageItems: () => [BackstageItemUtilities.createActionItem("item1", 0, 0, action("item1"), "CSS Icon (deprecated)", void 0, "icon-placeholder"), BackstageItemUtilities.createActionItem("item2", 0, 0, action("item2"), "IconSpec ReactNode (deprecated)", void 0, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {})), BackstageItemUtilities.createActionItem("item3", 0, 0, action("item3"), "`iconNode` property (deprecated helper)", void 0, void 0, {
      iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {})
    }), BackstageItemUtilities.createActionItem({
      id: "item4",
      execute: action("item4"),
      label: "`iconNode` property",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {})
    }), BackstageItemUtilities.createActionItem({
      id: "item5",
      execute: action("item5"),
      label: "`iconNode` property",
      icon: "X"
    }), BackstageItemUtilities.createActionItem({
      id: "item6",
      execute: action("item6"),
      label: "No icon"
    })]
  })]
};
const Subtitle = {
  args: {},
  decorators: [createOpenBackstage({
    id: "p1",
    getBackstageItems: () => [BackstageItemUtilities.createActionItem({
      id: "item1",
      execute: action("item1"),
      label: "Item 1",
      subtitle: "Item 1 subtitle",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {})
    }), BackstageItemUtilities.createActionItem({
      id: "item2",
      execute: action("item2"),
      label: "Item 2",
      subtitle: "Item 2 subtitle"
    })]
  })]
};
Icons.parameters = {
  ...Icons.parameters,
  docs: {
    ...(_a = Icons.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {},\n  decorators: [createOpenBackstage({\n    id: "p1",\n    getBackstageItems: () => [BackstageItemUtilities.createActionItem("item1", 0, 0, action("item1"), "CSS Icon (deprecated)", undefined, "icon-placeholder"), BackstageItemUtilities.createActionItem("item2", 0, 0, action("item2"), "IconSpec ReactNode (deprecated)", undefined, <SvgPlaceholder />), BackstageItemUtilities.createActionItem("item3", 0, 0, action("item3"), "`iconNode` property (deprecated helper)", undefined, undefined, {\n      iconNode: <SvgPlaceholder />\n    }), BackstageItemUtilities.createActionItem({\n      id: "item4",\n      execute: action("item4"),\n      label: "`iconNode` property",\n      icon: <SvgPlaceholder />\n    }), BackstageItemUtilities.createActionItem({\n      id: "item5",\n      execute: action("item5"),\n      label: "`iconNode` property",\n      icon: "X"\n    }), BackstageItemUtilities.createActionItem({\n      id: "item6",\n      execute: action("item6"),\n      label: "No icon"\n    })]\n  })]\n}',
      ...(_c = (_b = Icons.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
Subtitle.parameters = {
  ...Subtitle.parameters,
  docs: {
    ...(_d = Subtitle.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: '{\n  args: {},\n  decorators: [createOpenBackstage({\n    id: "p1",\n    getBackstageItems: () => [BackstageItemUtilities.createActionItem({\n      id: "item1",\n      execute: action("item1"),\n      label: "Item 1",\n      subtitle: "Item 1 subtitle",\n      icon: <SvgPlaceholder />\n    }), BackstageItemUtilities.createActionItem({\n      id: "item2",\n      execute: action("item2"),\n      label: "Item 2",\n      subtitle: "Item 2 subtitle"\n    })]\n  })]\n}',
      ...(_f = (_e = Subtitle.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
const __namedExportsOrder = ["Icons", "Subtitle"];
export {
  Icons,
  Subtitle,
  __namedExportsOrder,
  meta as default
};
