var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
import { j as jsxRuntimeExports } from "./jsx-runtime-_iMjpMZ4.js";
import { b as StagePanelState, W as WidgetState, g as BadgeType } from "./DefaultToolSettingsProvider-BMCl5D3j.js";
import { R as React } from "./index-DlkhCVTf.js";
import "./index-Cm_5MPU1.js";
import { A as AppUiDecorator } from "./Decorators-B2adf99T.js";
import { A as AppUiStory, c as createFrontstageProvider, P as Page } from "./AppUiStory-JB1HrQrm.js";
import { a as action } from "./chunk-WFFRPTHA-B_pzO8uN.js";
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
function createProvider(props) {
  return {
    id: "widgets",
    provideWidgets: () => {
      const widget2 = {
        id: "w2",
        label: "Widget 2",
        content: /* @__PURE__ */ jsxRuntimeExports.jsx(StoryWidget, { id: "w2" })
      };
      return [props, widget2];
    }
  };
}
function WidgetStory(props) {
  const provider = createProvider(props);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      frontstageProviders: [
        createFrontstageProvider({
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
  WidgetStory.__docgenInfo = { "description": "[Widget](https://www.itwinjs.org/reference/appui-react/widget/widget) interface allows you to configure the widget.", "displayName": "WidgetStory", "props": { "id": { "defaultValue": null, "description": "", "name": "id", "required": true, "type": { "name": "string" } }, "allowedPanels": { "defaultValue": null, "description": "Stage panels to which this widget can be docked. All stage panels are allowed if nothing is provided. To not allow docking to any panels, provide a blank array.", "name": "allowedPanels", "required": false, "type": { "name": "readonly StagePanelLocation[]" } }, "badge": { "defaultValue": null, "description": "", "name": "badge", "required": false, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }, { "value": "2" }] } }, "canPopout": { "defaultValue": null, "description": "Describes if the widget can be popped out to a separate window. Defaults to `false`.", "name": "canPopout", "required": false, "type": { "name": "boolean" } }, "canFloat": { "defaultValue": null, "description": "Set to `false` to disable floating of a widget. Defaults to `true`.\nAlternatively options object can be provided to configure floating behavior.\nIt is not possible to disable the floating of a widget if `allowedPanels` is an empty array.", "name": "canFloat", "required": false, "type": { "name": "boolean | CanFloatWidgetOptions" } }, "defaultState": { "defaultValue": null, "description": "Defaults to `Floating` if widget is not allowed to dock to any panels. Otherwise defaults to `Closed`.", "name": "defaultState", "required": false, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }, { "value": "2" }, { "value": "3" }, { "value": "4" }] } }, "content": { "defaultValue": null, "description": "Content of the Widget.", "name": "content", "required": false, "type": { "name": "ReactNode" } }, "icon": { "defaultValue": null, "description": "", "name": "icon", "required": false, "type": { "name": "IconSpec" } }, "label": { "defaultValue": null, "description": "", "name": "label", "required": false, "type": { "name": "string | ConditionalStringValue" } }, "priority": { "defaultValue": null, "description": "", "name": "priority", "required": false, "type": { "name": "number" } }, "tooltip": { "defaultValue": null, "description": "", "name": "tooltip", "required": false, "type": { "name": "string | ConditionalStringValue" } }, "layouts": { "defaultValue": null, "description": "Describes layout specific configuration of a widget.\n@note Only used by `get*` methods of [[UiItemsProvider]].\n@alpha", "name": "layouts", "required": false, "type": { "name": "WidgetLayouts" } } } };
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
    id: "w1",
    label: "Widget 1",
    content: /* @__PURE__ */ jsxRuntimeExports.jsx(StoryWidget, {
      id: "w1"
    })
  }
};
const Default = {};
const Unloaded = {
  args: {
    defaultState: WidgetState.Unloaded
  }
};
const Floating = {
  args: {
    defaultState: WidgetState.Floating
  }
};
const Badge = {
  args: {
    badge: BadgeType.TechnicalPreview
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
      originalSource: "{\n  args: {\n    defaultState: WidgetState.Unloaded\n  }\n}",
      ...(_f = (_e = Unloaded.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
Floating.parameters = {
  ...Floating.parameters,
  docs: {
    ...(_g = Floating.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: "{\n  args: {\n    defaultState: WidgetState.Floating\n  }\n}",
      ...(_i = (_h = Floating.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
Badge.parameters = {
  ...Badge.parameters,
  docs: {
    ...(_j = Badge.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: "{\n  args: {\n    badge: BadgeType.TechnicalPreview\n  }\n}",
      ...(_l = (_k = Badge.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
const __namedExportsOrder = ["Default", "Unloaded", "Floating", "Badge"];
export {
  Badge,
  Default,
  Floating,
  Unloaded,
  __namedExportsOrder,
  meta as default
};
