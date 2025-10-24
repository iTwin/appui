import { j as jsxRuntimeExports, e } from "./iframe-BIXwoC80.js";
import { G as StagePanelState, W as WidgetState, a4 as BadgeType, S as SvgPlaceholder } from "./appui-react-CNLcJNb9.js";
import { A as AppUiDecorator } from "./Decorators-CZIShNLG.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-DrM_MNQm.js";
import { c as createFrontstage, a as createWidget } from "./Utils-CICO5XQv.js";
import "./Key.enum-B-WhjwuV.js";
import "./client-dvjUKoP6.js";
import "./blocks-DA_2Rxbk.js";
const { action } = __STORYBOOK_MODULE_ACTIONS__;
function StoryWidget({ id }) {
  e.useEffect(() => {
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
    ...Default.parameters?.docs,
    source: {
      originalSource: "{}",
      ...Default.parameters?.docs?.source
    }
  }
};
Unloaded.parameters = {
  ...Unloaded.parameters,
  docs: {
    ...Unloaded.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    widgets: [{\n      defaultState: WidgetState.Unloaded\n    }, {}]\n  }\n}",
      ...Unloaded.parameters?.docs?.source
    }
  }
};
Floating.parameters = {
  ...Floating.parameters,
  docs: {
    ...Floating.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    widgets: [{\n      defaultState: WidgetState.Floating\n    }, {}]\n  }\n}",
      ...Floating.parameters?.docs?.source
    }
  }
};
Badge.parameters = {
  ...Badge.parameters,
  docs: {
    ...Badge.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    widgets: [{\n      badge: BadgeType.TechnicalPreview\n    }, {\n      badgeKind: "deprecated"\n    }, {}]\n  }\n}',
      ...Badge.parameters?.docs?.source
    }
  }
};
Icon.parameters = {
  ...Icon.parameters,
  docs: {
    ...Icon.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    widgets: [{\n      iconNode: <SvgPlaceholder />\n    }, {}, {}]\n  }\n}",
      ...Icon.parameters?.docs?.source
    }
  }
};
CSSIcon.parameters = {
  ...CSSIcon.parameters,
  docs: {
    ...CSSIcon.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    widgets: [{\n      iconNode: <i className="icon icon-placeholder" />\n    }, {}, {}]\n  }\n}',
      ...CSSIcon.parameters?.docs?.source
    }
  }
};
IconSpec.parameters = {
  ...IconSpec.parameters,
  docs: {
    ...IconSpec.parameters?.docs,
    source: {
      originalSource: '{\n  name: "Icon Spec (deprecated)",\n  args: {\n    widgets: [{\n      icon: "icon-placeholder"\n    }, {}, {}]\n  }\n}',
      ...IconSpec.parameters?.docs?.source
    }
  }
};
IconSpecNode.parameters = {
  ...IconSpecNode.parameters,
  docs: {
    ...IconSpecNode.parameters?.docs,
    source: {
      originalSource: '{\n  name: "Icon Spec Node (deprecated)",\n  args: {\n    widgets: [{\n      icon: <SvgPlaceholder />\n    }, {}, {}]\n  }\n}',
      ...IconSpecNode.parameters?.docs?.source
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
