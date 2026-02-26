import { j as jsxRuntimeExports } from "./iframe-B5XhNadd.js";
import { W as WidgetState } from "./appui-react-CwKstaKu.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-iS4J_UUr.js";
import { a as createWidget } from "./Utils-98Mhw6iN.js";
import { A as AppUiDecorator } from "./Decorators-BYkUmcDF.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-szt-ThaG.js";
import "./client-H2bURNxP.js";
import "./index-B5vH9_xk.js";
import "./blocks-CGJKxwwC.js";
function createProvider(props) {
  return {
    id: "widgets",
    getWidgets: () => {
      return [
        createWidget(1, {
          defaultState: WidgetState.Floating,
          canFloat: props
        }),
        createWidget(2, {
          defaultState: props.containerId ? WidgetState.Floating : void 0,
          canFloat: props.containerId ? {
            containerId: props.containerId
          } : void 0
        })
      ];
    }
  };
}
function CanFloatStory(props) {
  const provider = createProvider(props);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, { itemProviders: [provider], ...props });
}
CanFloatStory.__docgenInfo = { "description": "[canFloat](https://www.itwinjs.org/reference/appui-react/widget/widget/canfloat) property can be used to configure a floating widget.", "methods": [], "displayName": "CanFloatStory" };
const meta = {
  title: "Widget/canFloat",
  component: CanFloatStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    }
  }
};
const Default = {};
const NotResizable = {
  args: {
    isResizable: false
  }
};
const Position = {
  args: {
    defaultPosition: {
      x: 10,
      y: 200
    }
  }
};
const Size = {
  args: {
    defaultSize: {
      height: 100,
      width: 100
    }
  }
};
const HideWithUI = {
  args: {
    hideWithUi: true
  }
};
const ContainerId = {
  args: {
    containerId: "container-1"
  }
};
const MultipleOptions = {
  args: {
    ...Position.args,
    ...Size.args,
    ...HideWithUI.args,
    ...ContainerId.args
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
NotResizable.parameters = {
  ...NotResizable.parameters,
  docs: {
    ...NotResizable.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    isResizable: false\n  }\n}",
      ...NotResizable.parameters?.docs?.source
    }
  }
};
Position.parameters = {
  ...Position.parameters,
  docs: {
    ...Position.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    defaultPosition: {\n      x: 10,\n      y: 200\n    }\n  }\n}",
      ...Position.parameters?.docs?.source
    }
  }
};
Size.parameters = {
  ...Size.parameters,
  docs: {
    ...Size.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    defaultSize: {\n      height: 100,\n      width: 100\n    }\n  }\n}",
      ...Size.parameters?.docs?.source
    }
  }
};
HideWithUI.parameters = {
  ...HideWithUI.parameters,
  docs: {
    ...HideWithUI.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    hideWithUi: true\n  }\n}",
      ...HideWithUI.parameters?.docs?.source
    }
  }
};
ContainerId.parameters = {
  ...ContainerId.parameters,
  docs: {
    ...ContainerId.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    containerId: "container-1"\n  }\n}',
      ...ContainerId.parameters?.docs?.source
    }
  }
};
MultipleOptions.parameters = {
  ...MultipleOptions.parameters,
  docs: {
    ...MultipleOptions.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    ...Position.args,\n    ...Size.args,\n    ...HideWithUI.args,\n    ...ContainerId.args\n  }\n}",
      ...MultipleOptions.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Default", "NotResizable", "Position", "Size", "HideWithUI", "ContainerId", "MultipleOptions"];
export {
  ContainerId,
  Default,
  HideWithUI,
  MultipleOptions,
  NotResizable,
  Position,
  Size,
  __namedExportsOrder,
  meta as default
};
