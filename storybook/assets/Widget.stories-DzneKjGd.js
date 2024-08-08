var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { i as StagePanelState, W as WidgetState, G as BadgeType, S as SvgPlaceholder } from "./DefaultToolSettingsProvider-B6B80iEN.js";
import "./Key.enum-BB2gw-WQ.js";
import { R as React } from "./index-DM9bPmif.js";
import "./index-EDRsojbr.js";
import { A as AppUiDecorator } from "./Decorators-CU-vvLY2.js";
import { A as AppUiStory, c as createFrontstage, P as Page } from "./AppUiStory-oEM4RWbs.js";
import { a as action } from "./chunk-WFFRPTHA-B_pzO8uN.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./iframe-C1TMdbVu.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
import "./index-n0FlVOjm.js";
import "./index-Cp4dr_sK.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-DuWsADYF.js";
import "./preview-errors-C1TokqVJ.js";
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
    provideWidgets: () => {
      return Array.from({ length: widgets.length }, (_, index) => {
        const widget = widgets[index];
        const id = `w${index + 1}`;
        return {
          id,
          label: `Widget ${index + 1}`,
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(StoryWidget, { id }),
          ...widget
        };
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
try {
  StoryWidget.displayName = "StoryWidget";
  StoryWidget.__docgenInfo = { "description": "", "displayName": "StoryWidget", "props": { "id": { "defaultValue": null, "description": "", "name": "id", "required": true, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  WidgetStory.displayName = "WidgetStory";
  WidgetStory.__docgenInfo = { "description": "[Widget](https://www.itwinjs.org/reference/appui-react/widget/widget) interface allows you to configure the widget.", "displayName": "WidgetStory", "props": { "widgets": { "defaultValue": null, "description": "", "name": "widgets", "required": true, "type": { "name": "Partial<Widget>[]" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
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
      iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx("i", {
        className: "icon icon-placeholder"
      })
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
