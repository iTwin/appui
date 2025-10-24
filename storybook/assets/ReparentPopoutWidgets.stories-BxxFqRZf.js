import { j as jsxRuntimeExports, r as reactExports, I as IconButton } from "./iframe-BIXwoC80.js";
import { A as AppUiDecorator } from "./Decorators-CZIShNLG.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-DrM_MNQm.js";
import { Y as PreviewFeaturesProvider, G as StagePanelState, W as WidgetState, a5 as Label, a0 as Input, a6 as DropdownMenu, a7 as SvgMore, b as MenuItem } from "./appui-react-CNLcJNb9.js";
import { c as createFrontstage, a as createWidget } from "./Utils-CICO5XQv.js";
import { B as Button } from "./Key.enum-B-WhjwuV.js";
import "./blocks-DA_2Rxbk.js";
import "./client-dvjUKoP6.js";
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
    ...Default.parameters?.docs,
    source: {
      originalSource: "{}",
      ...Default.parameters?.docs?.source
    }
  }
};
SpecifedIds.parameters = {
  ...SpecifedIds.parameters,
  docs: {
    ...SpecifedIds.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    reparentPopoutWidgets: ["w1", "w2"]\n  }\n}',
      ...SpecifedIds.parameters?.docs?.source
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
