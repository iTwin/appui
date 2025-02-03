var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { o as IModelConnectedViewSelector, U as UiFramework, i as StandardContentLayouts, e as IModelViewportControl } from "./appui-react-CTZBmOiq.js";
import { P as Page, A as AppUiStory } from "./AppUiStory-Cgbl-5kv.js";
import { c as createFrontstage } from "./Utils-Bl0Xpdri.js";
import "./index-DDLqOySG.js";
import "./Dialog-8v2C4dmj.js";
import "./index-BwI9SQDf.js";
import "./iframe-Soylyosm.js";
import "../sb-preview/runtime.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./_commonjs-dynamic-modules-6KCvujNB.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
import "./debounce-BQf5aemw.js";
import "./index-Dd3ZGpiI.js";
import "./index-DLlB04eo.js";
import "./index-BZDuRpLS.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-B8H6_QN-.js";
const StoryDecorator = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, { layout: "fullscreen", demoIModel: {
    default: "blank"
  }, onInitialize: async () => {
    UiFramework.visibility.autoHideUi = false;
  }, frontstages: [createFrontstage({
    contentGroupProps: {
      id: "ViewportContentGroup",
      layout: StandardContentLayouts.singleView,
      contents: [{
        id: "ViewportContent",
        classId: IModelViewportControl
      }]
    },
    contentManipulation: {
      id: "content-manipulation",
      content: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        pointerEvents: "all",
        width: 50,
        height: 50,
        background: "var(--iui-color-background)",
        zIndex: 1
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) })
    }
  })] });
};
const meta = {
  title: "Components/ViewSelector",
  component: IModelConnectedViewSelector,
  tags: ["autodocs"],
  decorators: [StoryDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    },
    layout: "fullscreen"
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
