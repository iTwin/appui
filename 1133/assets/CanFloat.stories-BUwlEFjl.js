var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { W as WidgetState } from "./appui-react-C6TnPkvp.js";
import { A as AppUiStory, a as createWidget, P as Page } from "./AppUiStory-Dbz9woZd.js";
import { A as AppUiDecorator } from "./Decorators-Dhk7XbI1.js";
import "./index-DDLqOySG.js";
import "./Dialog-CrPX6gqC.js";
import "./index-BwI9SQDf.js";
import "./iframe-C6MysNAZ.js";
import "../sb-preview/runtime.js";
import "./inheritsLoose-HEqISCW8.js";
import "./_commonjs-dynamic-modules-DTCOR0lh.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
import "./index-n8dGnLRA.js";
import "./index-DLlB04eo.js";
import "./index-BZDuRpLS.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-B8H6_QN-.js";
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
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
      ...(_c = (_b = Default.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
NotResizable.parameters = {
  ...NotResizable.parameters,
  docs: {
    ...(_d = NotResizable.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  args: {\n    isResizable: false\n  }\n}",
      ...(_f = (_e = NotResizable.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
Position.parameters = {
  ...Position.parameters,
  docs: {
    ...(_g = Position.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: "{\n  args: {\n    defaultPosition: {\n      x: 10,\n      y: 200\n    }\n  }\n}",
      ...(_i = (_h = Position.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
Size.parameters = {
  ...Size.parameters,
  docs: {
    ...(_j = Size.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: "{\n  args: {\n    defaultSize: {\n      height: 100,\n      width: 100\n    }\n  }\n}",
      ...(_l = (_k = Size.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
HideWithUI.parameters = {
  ...HideWithUI.parameters,
  docs: {
    ...(_m = HideWithUI.parameters) == null ? void 0 : _m.docs,
    source: {
      originalSource: "{\n  args: {\n    hideWithUi: true\n  }\n}",
      ...(_o = (_n = HideWithUI.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
    }
  }
};
ContainerId.parameters = {
  ...ContainerId.parameters,
  docs: {
    ...(_p = ContainerId.parameters) == null ? void 0 : _p.docs,
    source: {
      originalSource: '{\n  args: {\n    containerId: "container-1"\n  }\n}',
      ...(_r = (_q = ContainerId.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
    }
  }
};
MultipleOptions.parameters = {
  ...MultipleOptions.parameters,
  docs: {
    ...(_s = MultipleOptions.parameters) == null ? void 0 : _s.docs,
    source: {
      originalSource: "{\n  args: {\n    ...Position.args,\n    ...Size.args,\n    ...HideWithUI.args,\n    ...ContainerId.args\n  }\n}",
      ...(_u = (_t = MultipleOptions.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
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