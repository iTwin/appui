import { j as jsxRuntimeExports } from "./iframe-CiskuaAf.js";
import { u as StagePanelState } from "./appui-react-CRF-9igQ.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-CJYfqXZz.js";
import { a as createWidget } from "./Utils-CJKj8S7p.js";
import { A as AppUiDecorator } from "./Decorators-u4oHvOsN.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-DEi28OI6.js";
import "./client-DpXMbJf5.js";
import "./index-CkgzJ0FA.js";
import "./blocks-DB3kl8q0.js";
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
    ...Enabled.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    canPopout: true\n  }\n}",
      ...Enabled.parameters?.docs?.source
    }
  }
};
Disabled.parameters = {
  ...Disabled.parameters,
  docs: {
    ...Disabled.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    canPopout: false\n  }\n}",
      ...Disabled.parameters?.docs?.source
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
