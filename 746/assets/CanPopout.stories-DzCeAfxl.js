var _a, _b, _c, _d, _e, _f;
import { j as jsxRuntimeExports } from "./jsx-runtime-_iMjpMZ4.js";
import { b as StagePanelState } from "./DefaultToolSettingsProvider-BMCl5D3j.js";
import "./index-DlkhCVTf.js";
import "./index-Cm_5MPU1.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-JB1HrQrm.js";
import { A as AppUiDecorator } from "./Decorators-B2adf99T.js";
import "./getPrototypeOf-BmmMfuHC.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./iframe-BGUnDEVO.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
import "./index-z82J1YTj.js";
import "./index-Cp4dr_sK.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./ToolbarComposer-BAliddVT.js";
import "./DemoIModel-4Lmk67sy.js";
function createProvider(props) {
  return {
    id: "widgets",
    provideWidgets: () => [
      {
        id: "w1",
        label: "Widget 1",
        content: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Widget 1 content" }),
        canPopout: props.canPopout
      }
    ]
  };
}
function CanPopoutStory(props) {
  const provider = createProvider(props);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      frontstage: {
        leftPanelProps: {
          defaultState: StagePanelState.Open
        }
      },
      itemProviders: [provider]
    }
  );
}
try {
  CanPopoutStory.displayName = "CanPopoutStory";
  CanPopoutStory.__docgenInfo = { "description": "[canPopout](https://www.itwinjs.org/reference/appui-react/widget/widget/#canpopout) property can be used to enable user to pop the widget out to a separate window.", "displayName": "CanPopoutStory", "props": { "canPopout": { "defaultValue": null, "description": "Describes if the widget can be popped out to a separate window. Defaults to `false`.", "name": "canPopout", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "Widget/canPopout",
  component: CanPopoutStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    }
  }
};
const Enabled = {
  args: {
    canPopout: true
  }
};
const Disabled = {
  args: {
    canPopout: false
  }
};
Enabled.parameters = {
  ...Enabled.parameters,
  docs: {
    ...(_a = Enabled.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  args: {\n    canPopout: true\n  }\n}",
      ...(_c = (_b = Enabled.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
Disabled.parameters = {
  ...Disabled.parameters,
  docs: {
    ...(_d = Disabled.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  args: {\n    canPopout: false\n  }\n}",
      ...(_f = (_e = Disabled.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
const __namedExportsOrder = ["Enabled", "Disabled"];
export {
  Disabled,
  Enabled,
  __namedExportsOrder,
  meta as default
};
