var _a, _b, _c, _d, _e, _f;
import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { A as AppUiDecorator } from "./Decorators-B5wt-bmA.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-DxGmk2wr.js";
import { r as reactExports } from "./index-DDLqOySG.js";
import { a6 as PreviewFeaturesProvider, u as StagePanelState, W as WidgetState, a7 as Label, a5 as Input, a8 as DropdownMenu, b as MenuItem, a9 as SvgMore } from "./appui-react-Cx6bFzkB.js";
import { c as createFrontstage, a as createWidget } from "./Utils-DZ4FdB5e.js";
import { B as Button, I as IconButton } from "./Dialog-DXWiaz89.js";
import "./index-CeK7sbMg.js";
import "./iframe-B1rRuy0Z.js";
import "../sb-preview/runtime.js";
import "./index-BwI9SQDf.js";
import "./index-DLlB04eo.js";
import "./_commonjs-dynamic-modules-6KCvujNB.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./index-BZDuRpLS.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-B8H6_QN-.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
import "./debounce-BQf5aemw.js";
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
      frontstages: [
        createFrontstage({
          leftPanelProps: {
            defaultState: StagePanelState.Open,
            pinned: true
          }
        })
      ]
    }
  ) });
}
PreviewStory.__docgenInfo = { "description": "`reparentPopoutWidgets` preview feature. When enabled widget content will be reparented to a popout content container.", "methods": [], "displayName": "PreviewStory" };
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
