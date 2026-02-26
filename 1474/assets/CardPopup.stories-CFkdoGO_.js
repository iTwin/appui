import { r as reactExports, j as jsxRuntimeExports } from "./iframe-MZ9GDAUV.js";
import { U as UiFramework, R as Text, s as ToolbarItemUtilities, z as SvgInfo } from "./appui-react-CxqBCL1K.js";
import { A as AppUiStory } from "./AppUiStory-BbgzA-a2.js";
import { S as SvgCut, a as SvgSaveSettings, b as SvgSave, c as SvgSaveAs, d as SvgSaveUpdate } from "./Save-CCkZRhYd.js";
import "./Key.enum-BlUwKc_n.js";
import "./client-CdcWlIUh.js";
import "./blocks-w2bBkgKV.js";
import "./Utils-65SDZWWd.js";
const SvgPasteHollow = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M13 2h-1v1h1v12H3V3h1V2H3a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1z" }),
    reactExports.createElement("path", { d: "M9 1a1 1 0 10-2 0H5.75a.75.75 0 00-.75.75V3h6V1.75a.75.75 0 00-.75-.75zM4.5 4h7a.5.5 0 010 1h-7a.5.5 0 010-1zm0 6h5a.5.5 0 010 1h-5a.5.5 0 010-1zm0-2h7a.5.5 0 010 1h-7a.5.5 0 010-1zm0-2h6a.5.5 0 010 1h-6a.5.5 0 010-1zm0 6h6a.5.5 0 010 1h-6a.5.5 0 010-1z" })
  );
};
const { action: action$1 } = __STORYBOOK_MODULE_ACTIONS__;
function CardPopupStory({
  title,
  toolbarProps,
  location,
  offset,
  placement
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      onInitialize: async () => {
        UiFramework.showCard(
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                columnGap: 10
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { isMuted: true, style: { textAlign: "end" }, children: "Model:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: "A613 V02" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { isMuted: true, style: { textAlign: "end" }, children: "Category:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: "A-43CB-EZT" })
              ]
            }
          ),
          title,
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
CardPopupStory.__docgenInfo = { "description": "[showCard](https://www.itwinjs.org/reference/appui-react/admin/frameworkuiadmin/showcard/) API can be used to show a card-at-cursor popup.", "methods": [], "displayName": "CardPopupStory", "props": { "title": { "required": false, "tsType": { "name": "string" }, "description": "" }, "toolbarProps": { "required": true, "tsType": { "name": "Parameters[2]", "raw": "ShowCardParams[2]" }, "description": "" }, "location": { "required": true, "tsType": { "name": "Parameters[3]", "raw": "ShowCardParams[3]" }, "description": "" }, "offset": { "required": true, "tsType": { "name": "Parameters[4]", "raw": "ShowCardParams[4]" }, "description": "" }, "placement": { "required": true, "tsType": { "name": "Parameters[7]", "raw": "ShowCardParams[7]" }, "description": "" } } };
const { action } = __STORYBOOK_MODULE_ACTIONS__;
const meta = {
  title: "Components/CardPopup",
  component: CardPopupStory,
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
const Overflow = {
  args: {
    toolbarProps: {
      items: [...meta.args.toolbarProps.items, ToolbarItemUtilities.createActionItem("item4", 100, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPasteHollow, {}), "Item 4", action("Item 4"))]
    }
  }
};
const NoTitle = {
  args: {
    title: void 0
  }
};
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
Overflow.parameters = {
  ...Overflow.parameters,
  docs: {
    ...Overflow.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    toolbarProps: {\n      items: [...meta.args.toolbarProps.items, ToolbarItemUtilities.createActionItem("item4", 100, <SvgPasteHollow />, "Item 4", action("Item 4"))]\n    }\n  }\n}',
      ...Overflow.parameters?.docs?.source
    }
  }
};
NoTitle.parameters = {
  ...NoTitle.parameters,
  docs: {
    ...NoTitle.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    title: undefined\n  }\n}",
      ...NoTitle.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Basic", "Overflow", "NoTitle"];
export {
  Basic,
  NoTitle,
  Overflow,
  __namedExportsOrder,
  meta as default
};
