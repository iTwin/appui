var _a, _b, _c, _d, _e, _f;
import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { u as StagePanelState } from "./appui-react-CaUuY87j.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-C98lUEtR.js";
import { a as createWidget } from "./Utils-BEkjZltv.js";
import { A as AppUiDecorator } from "./Decorators-C6N3PrYR.js";
import "./index-DDLqOySG.js";
import "./Dialog-B3IrQve8.js";
import "./index-BwI9SQDf.js";
import "./iframe-BHomL3M7.js";
import "../sb-preview/runtime.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./_commonjs-dynamic-modules-6KCvujNB.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
import "./debounce-BQf5aemw.js";
import "./index-eEBk8sx1.js";
import "./index-DLlB04eo.js";
import "./index-BZDuRpLS.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-B8H6_QN-.js";
function createProvider(props) {
  return {
    id: "widgets",
    getWidgets: () => [
      createWidget(1, {
        canPopout: props.canPopout
      })
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
CanPopoutStory.__docgenInfo = { "description": "[canPopout](https://www.itwinjs.org/reference/appui-react/widget/widget/#canpopout) property can be used to enable user to pop the widget out to a separate window.", "methods": [], "displayName": "CanPopoutStory" };
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
