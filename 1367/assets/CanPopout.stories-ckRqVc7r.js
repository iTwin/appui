var _a, _b, _c, _d, _e, _f;
import { j as jsxRuntimeExports } from "./iframe-CPf_22bH.js";
import { H as StagePanelState } from "./appui-react-DM43Y0g2.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-Bkt4h7-f.js";
import { a as createWidget } from "./Utils-By4Tr37r.js";
import { A as AppUiDecorator } from "./Decorators-CJLjmAjN.js";
import "./Key.enum-xgF-LmbB.js";
import "./client-AY0nUbTQ.js";
import "./blocks-CklCPdjl.js";
import "./Divider-CbGHJc5r.js";
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
