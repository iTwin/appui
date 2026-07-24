import { j as jsxRuntimeExports } from "./iframe-CpRh-TYa.js";
import { U as UiFramework, B as BackstageItemUtilities } from "./appui-react-BtU_mNFj.js";
import { A as AppUiStory } from "./AppUiStory-Be3BgbZq.js";
import { S as SvgPlaceholder } from "./components-react-Dj8XcCyt.js";
import { B as BackstageComposer } from "./BackstageComposer-DVpKS-mW.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-DCghlnp9.js";
import "./index-_JpHN5Jx.js";
import "./Dialog-BycrGCvo.js";
import "./blocks-DE0lqga4.js";
import "./Utils-BFxNE3WT.js";
import "./client-Cvp-1q-B.js";
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
  tags: ["autodocs"],
  args: {
    header: void 0,
    showOverlay: true
  }
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
const Badges = {
  args: {},
  decorators: [createOpenBackstage({
    id: "p1",
    getBackstageItems: () => [BackstageItemUtilities.createActionItem({
      id: "new",
      execute: action("new"),
      label: "New",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      badgeKind: "new"
    }), BackstageItemUtilities.createActionItem({
      id: "deprecated",
      execute: action("deprecated"),
      label: "Deprecated",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      badgeKind: "deprecated"
    }), BackstageItemUtilities.createActionItem({
      id: "technical-preview",
      execute: action("technical-preview"),
      label: "Technical Preview",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      badgeKind: "technical-preview"
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
Badges.parameters = {
  ...Badges.parameters,
  docs: {
    ...Badges.parameters?.docs,
    source: {
      originalSource: '{\n  args: {},\n  decorators: [createOpenBackstage({\n    id: "p1",\n    getBackstageItems: () => [BackstageItemUtilities.createActionItem({\n      id: "new",\n      execute: action("new"),\n      label: "New",\n      icon: <SvgPlaceholder />,\n      badgeKind: "new"\n    }), BackstageItemUtilities.createActionItem({\n      id: "deprecated",\n      execute: action("deprecated"),\n      label: "Deprecated",\n      icon: <SvgPlaceholder />,\n      badgeKind: "deprecated"\n    }), BackstageItemUtilities.createActionItem({\n      id: "technical-preview",\n      execute: action("technical-preview"),\n      label: "Technical Preview",\n      icon: <SvgPlaceholder />,\n      badgeKind: "technical-preview"\n    })]\n  })]\n}',
      ...Badges.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Icons", "Subtitle", "Badges"];
export {
  Badges,
  Icons,
  Subtitle,
  __namedExportsOrder,
  meta as default
};
