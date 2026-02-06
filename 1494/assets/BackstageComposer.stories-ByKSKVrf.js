import { j as jsxRuntimeExports } from "./iframe-BmX5H014.js";
import { U as UiFramework, B as BackstageItemUtilities, S as SvgPlaceholder } from "./appui-react-DXkFctUx.js";
import { A as AppUiStory } from "./AppUiStory-Cv85Pvas.js";
import { B as BackstageComposer } from "./BackstageComposer-C4aLwlT3.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-DvCHltQ0.js";
import "./client-M2bM1T3-.js";
import "./index-D95LU0cB.js";
import "./blocks-CrcdVEJ9.js";
import "./Utils-C4oq2jmg.js";
const { action } = __STORYBOOK_MODULE_ACTIONS__;
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
    ...Icons.parameters?.docs,
    source: {
      originalSource: '{\n  args: {},\n  decorators: [createOpenBackstage({\n    id: "p1",\n    getBackstageItems: () => [BackstageItemUtilities.createActionItem("item1", 0, 0, action("item1"), "CSS Icon (deprecated)", undefined, "icon-placeholder"), BackstageItemUtilities.createActionItem("item2", 0, 0, action("item2"), "IconSpec ReactNode (deprecated)", undefined, <SvgPlaceholder />), BackstageItemUtilities.createActionItem("item3", 0, 0, action("item3"), "`iconNode` property (deprecated helper)", undefined, undefined, {\n      iconNode: <SvgPlaceholder />\n    }), BackstageItemUtilities.createActionItem({\n      id: "item4",\n      execute: action("item4"),\n      label: "`iconNode` property",\n      icon: <SvgPlaceholder />\n    }), BackstageItemUtilities.createActionItem({\n      id: "item5",\n      execute: action("item5"),\n      label: "`iconNode` property",\n      icon: "X"\n    }), BackstageItemUtilities.createActionItem({\n      id: "item6",\n      execute: action("item6"),\n      label: "No icon"\n    })]\n  })]\n}',
      ...Icons.parameters?.docs?.source
    }
  }
};
Subtitle.parameters = {
  ...Subtitle.parameters,
  docs: {
    ...Subtitle.parameters?.docs,
    source: {
      originalSource: '{\n  args: {},\n  decorators: [createOpenBackstage({\n    id: "p1",\n    getBackstageItems: () => [BackstageItemUtilities.createActionItem({\n      id: "item1",\n      execute: action("item1"),\n      label: "Item 1",\n      subtitle: "Item 1 subtitle",\n      icon: <SvgPlaceholder />\n    }), BackstageItemUtilities.createActionItem({\n      id: "item2",\n      execute: action("item2"),\n      label: "Item 2",\n      subtitle: "Item 2 subtitle"\n    })]\n  })]\n}',
      ...Subtitle.parameters?.docs?.source
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
