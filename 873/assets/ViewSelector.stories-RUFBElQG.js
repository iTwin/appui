var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { S as StandardContentLayouts } from "./Key.enum-DfmWeVAv.js";
import { I as IModelConnectedViewSelector, U as UiFramework, b as IModelViewportControl } from "./DefaultToolSettingsProvider-BJ7jnI_c.js";
import "./index-DM9bPmif.js";
import "./index-EDRsojbr.js";
import { P as Page, A as AppUiStory, c as createFrontstageProvider } from "./AppUiStory-DKZH7QVd.js";
import "./iframe-WFPHwrkb.js";
import "../sb-preview/runtime.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-B47T7vRo.js";
import "./index-DcLF_y_E.js";
import "./index-Cp4dr_sK.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./ToolbarComposer-DdkBAlYT.js";
import "./DemoIModel-DuWsADYF.js";
const StoryDecorator = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, {
    layout: "fullscreen",
    demoIModel: {
      default: "blank"
    },
    onInitialize: async () => {
      UiFramework.visibility.autoHideUi = false;
    },
    frontstageProviders: [createFrontstageProvider({
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
        content: /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
          style: {
            pointerEvents: "all",
            width: 50,
            height: 50,
            background: "var(--iui-color-background)",
            zIndex: 1
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {})
        })
      }
    })]
  });
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
