var _a, _b, _c, _d, _e, _f;
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { A as AppUiDecorator } from "./Decorators-CvdcWmQf.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-CV1Zw4VQ.js";
import { r as reactExports } from "./index-DVOlmhHI.js";
import { ab as PreviewFeaturesProvider, E as StagePanelState, W as WidgetState, ac as Label, aa as Input, ad as DropdownMenu, ae as SvgMore, b as MenuItem } from "./appui-react-CDe2sd1_.js";
import { c as createFrontstage, a as createWidget } from "./Utils-Zzjm0Wv2.js";
import { B as Button } from "./Dialog-BMqOLAkC.js";
import { I as IconButton } from "./SvgCloseSmall-DV74BlAu.js";
import "./index-CdGyBOBZ.js";
import "./index-D3RNTJPL.js";
import "./iframe-mQ2fpQex.js";
import "./index-XG6mIJUL.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-selgNRA5.js";
import "./client-DmvY241V.js";
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
