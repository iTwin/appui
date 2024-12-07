var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { m as StagePanelState, W as WidgetState, r as BadgeType, S as SvgPlaceholder } from "./appui-react-DqP69g9p.js";
import { R as React } from "./index-DDLqOySG.js";
import { A as AppUiDecorator } from "./Decorators-BvVtzpu4.js";
import { A as AppUiStory, c as createFrontstage, a as createWidget, P as Page } from "./AppUiStory-CPHcYWlQ.js";
import { a as action } from "./chunk-D5ZWXAHU-CHda0_Q5.js";
import "./Dialog-4AEpYroS.js";
import "./index-BwI9SQDf.js";
import "./iframe-DmgdPuW7.js";
import "../sb-preview/runtime.js";
import "./inheritsLoose-HEqISCW8.js";
import "./_commonjs-dynamic-modules-DTCOR0lh.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
import "./index-CpW6vRnh.js";
import "./index-DLlB04eo.js";
import "./index-BZDuRpLS.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-B8H6_QN-.js";
import "./v4-BL5qiJc1.js";
function StoryWidget({ id }) {
  React.useEffect(() => {
    action(`Widget ${id} mounted`)();
    return () => {
      action(`Widget ${id} unmounted`)();
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    "Widget ",
    id,
    " content "
  ] });
}
function createProvider(widgets) {
  return {
    id: "widgets",
    getWidgets: () => {
      return Array.from({ length: widgets.length }, (_, index) => {
        const widget = widgets[index];
        const id = index + 1;
        return createWidget(id, {
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(StoryWidget, { id: `${id}` }),
          ...widget
        });
      });
    }
  };
}
function WidgetStory(props) {
  const provider = createProvider(props.widgets);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      frontstages: [
        createFrontstage({
          leftPanelProps: {
            defaultState: StagePanelState.Open,
            pinned: true
          }
        })
      ],
      itemProviders: [provider],
      ...props
    }
  );
}
StoryWidget.__docgenInfo = { "description": "", "methods": [], "displayName": "StoryWidget", "props": { "id": { "required": true, "tsType": { "name": "string" }, "description": "" } } };
WidgetStory.__docgenInfo = { "description": "[Widget](https://www.itwinjs.org/reference/appui-react/widget/widget) interface allows you to configure the widget.", "methods": [], "displayName": "WidgetStory", "props": { "widgets": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "Partial", "elements": [{ "name": "Widget" }], "raw": "Partial<Widget>" }], "raw": "Partial<Widget>[]" }, "description": "" } } };
const meta = {
  title: "Widget/Widget",
  component: WidgetStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    }
  },
  args: {
    widgets: [{}, {}]
  }
};
const Default = {};
const Unloaded = {
  args: {
    widgets: [{
      defaultState: WidgetState.Unloaded
    }, {}]
  }
};
const Floating = {
  args: {
    widgets: [{
      defaultState: WidgetState.Floating
    }, {}]
  }
};
const Badge = {
  args: {
    widgets: [{
      badge: BadgeType.TechnicalPreview
    }, {
      badgeKind: "deprecated"
    }, {}]
  }
};
const Icon = {
  args: {
    widgets: [{
      iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {})
    }, {}, {}]
  }
};
const CSSIcon = {
  args: {
    widgets: [{
      iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "icon icon-placeholder" })
    }, {}, {}]
  }
};
const IconSpec = {
  name: "Icon Spec (deprecated)",
  args: {
    widgets: [{
      icon: "icon-placeholder"
    }, {}, {}]
  }
};
const IconSpecNode = {
  name: "Icon Spec Node (deprecated)",
  args: {
    widgets: [{
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {})
    }, {}, {}]
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
Unloaded.parameters = {
  ...Unloaded.parameters,
  docs: {
    ...(_d = Unloaded.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  args: {\n    widgets: [{\n      defaultState: WidgetState.Unloaded\n    }, {}]\n  }\n}",
      ...(_f = (_e = Unloaded.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
Floating.parameters = {
  ...Floating.parameters,
  docs: {
    ...(_g = Floating.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: "{\n  args: {\n    widgets: [{\n      defaultState: WidgetState.Floating\n    }, {}]\n  }\n}",
      ...(_i = (_h = Floating.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
Badge.parameters = {
  ...Badge.parameters,
  docs: {
    ...(_j = Badge.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: '{\n  args: {\n    widgets: [{\n      badge: BadgeType.TechnicalPreview\n    }, {\n      badgeKind: "deprecated"\n    }, {}]\n  }\n}',
      ...(_l = (_k = Badge.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
Icon.parameters = {
  ...Icon.parameters,
  docs: {
    ...(_m = Icon.parameters) == null ? void 0 : _m.docs,
    source: {
      originalSource: "{\n  args: {\n    widgets: [{\n      iconNode: <SvgPlaceholder />\n    }, {}, {}]\n  }\n}",
      ...(_o = (_n = Icon.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
    }
  }
};
CSSIcon.parameters = {
  ...CSSIcon.parameters,
  docs: {
    ...(_p = CSSIcon.parameters) == null ? void 0 : _p.docs,
    source: {
      originalSource: '{\n  args: {\n    widgets: [{\n      iconNode: <i className="icon icon-placeholder" />\n    }, {}, {}]\n  }\n}',
      ...(_r = (_q = CSSIcon.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
    }
  }
};
IconSpec.parameters = {
  ...IconSpec.parameters,
  docs: {
    ...(_s = IconSpec.parameters) == null ? void 0 : _s.docs,
    source: {
      originalSource: '{\n  name: "Icon Spec (deprecated)",\n  args: {\n    widgets: [{\n      icon: "icon-placeholder"\n    }, {}, {}]\n  }\n}',
      ...(_u = (_t = IconSpec.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
    }
  }
};
IconSpecNode.parameters = {
  ...IconSpecNode.parameters,
  docs: {
    ...(_v = IconSpecNode.parameters) == null ? void 0 : _v.docs,
    source: {
      originalSource: '{\n  name: "Icon Spec Node (deprecated)",\n  args: {\n    widgets: [{\n      icon: <SvgPlaceholder />\n    }, {}, {}]\n  }\n}',
      ...(_x = (_w = IconSpecNode.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
    }
  }
};
const __namedExportsOrder = ["Default", "Unloaded", "Floating", "Badge", "Icon", "CSSIcon", "IconSpec", "IconSpecNode"];
export {
  Badge,
  CSSIcon,
  Default,
  Floating,
  Icon,
  IconSpec,
  IconSpecNode,
  Unloaded,
  __namedExportsOrder,
  meta as default
};
