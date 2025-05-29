var _a, _b, _c;
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { t as IModelConnectedViewSelector, e as IModelViewportControl, l as StandardContentLayouts, U as UiFramework } from "./appui-react-CDe2sd1_.js";
import { P as Page, A as AppUiStory } from "./AppUiStory-CV1Zw4VQ.js";
import { c as createFrontstage } from "./Utils-Zzjm0Wv2.js";
import "./index-DVOlmhHI.js";
import "./index-CdGyBOBZ.js";
import "./Dialog-BMqOLAkC.js";
import "./SvgCloseSmall-DV74BlAu.js";
import "./iframe-mQ2fpQex.js";
import "./client-DmvY241V.js";
import "./index-D3RNTJPL.js";
import "./index-XG6mIJUL.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-selgNRA5.js";
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
