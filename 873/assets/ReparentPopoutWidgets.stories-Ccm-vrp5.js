var _a, _b, _c, _d, _e, _f;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { A as AppUiDecorator } from "./Decorators-DFtbw1Rc.js";
import { A as AppUiStory, c as createFrontstageProvider, a as createWidget, P as Page } from "./AppUiStory-DKZH7QVd.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import { P as PreviewFeaturesProvider, g as StagePanelState, W as WidgetState, L as Label, h as Input, k as DropdownMenu, a as MenuItem, l as SvgMore } from "./DefaultToolSettingsProvider-BJ7jnI_c.js";
import { B as Button, I as IconButton } from "./Key.enum-DfmWeVAv.js";
import "./index-EDRsojbr.js";
import "./index-DcLF_y_E.js";
import "./iframe-WFPHwrkb.js";
import "../sb-preview/runtime.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-Cp4dr_sK.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./ToolbarComposer-DdkBAlYT.js";
import "./DemoIModel-DuWsADYF.js";
import "./index-B47T7vRo.js";
function Content({ id }) {
  const [count, setCount] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
      "Widget ",
      id,
      " content"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setCount((prev) => ++prev), children: [
      count,
      "++"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DropdownMenu,
      {
        menuItems: (close) => [...Array(6)].map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { onClick: close, children: [
          "Item ",
          index + 1
        ] }, index + 1)),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgMore, {}) })
      }
    )
  ] });
}
function createProvider() {
  return {
    id: "widgets",
    getWidgets: () => {
      return [
        createWidget(1, {
          canPopout: true,
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(Content, { id: "1" }),
          defaultState: WidgetState.Floating
        }),
        createWidget(2, {
          canPopout: true,
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(Content, { id: "2" })
        }),
        createWidget(3, {
          canPopout: true,
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(Content, { id: "3" })
        })
      ];
    }
  };
}
function PreviewStory(props) {
  const provider = createProvider();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewFeaturesProvider, { features: props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      itemProviders: [provider],
      frontstageProviders: [
        createFrontstageProvider({
          leftPanelProps: {
            defaultState: StagePanelState.Open,
            pinned: true
          }
        })
      ]
    }
  ) });
}
try {
  PreviewStory.displayName = "PreviewStory";
  PreviewStory.__docgenInfo = { "description": "`reparentPopoutWidgets` preview feature. When enabled widget content will be reparented to a popout content container.", "displayName": "PreviewStory", "props": { "reparentPopoutWidgets": { "defaultValue": null, "description": "If `true`, popout widgets will not be rendered in a separate element tree, instead widget content will be re-parented to a popout content container.\nAlternatively, an array of widget ids can be specified to only re-parent specific widgets.\n@note Use {@link useTransientState } to save and restore DOM transient state when re-parenting widgets.\n@note There is a known limitation where iTwinUI v2 popover elements will be rendered in the main window. Prefer using iTwinUI v3 when using this feature.", "name": "reparentPopoutWidgets", "required": true, "type": { "name": "boolean | string[]" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "PreviewFeatures/ReparentPopoutWidgets",
  component: PreviewStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    }
  },
  args: {
    reparentPopoutWidgets: true
  }
};
const Default = {};
const SpecifedIds = {
  args: {
    reparentPopoutWidgets: ["w1", "w2"]
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
      ...(_c = (_b = Default.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
SpecifedIds.parameters = {
  ...SpecifedIds.parameters,
  docs: {
    ...(_d = SpecifedIds.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: '{\n  args: {\n    reparentPopoutWidgets: ["w1", "w2"]\n  }\n}',
      ...(_f = (_e = SpecifedIds.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
const __namedExportsOrder = ["Default", "SpecifedIds"];
export {
  Default,
  SpecifedIds,
  __namedExportsOrder,
  meta as default
};
