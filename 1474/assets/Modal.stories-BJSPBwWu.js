import { j as jsxRuntimeExports, r as reactExports } from "./iframe-MZ9GDAUV.js";
import { A as AppUiDecorator } from "./Decorators-ByA6YP1P.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-BbgzA-a2.js";
import { s as ToolbarItemUtilities, t as ToolbarUsage, v as ToolbarOrientation, U as UiFramework, S as SvgPlaceholder, bc as ModalFrontstageButton } from "./appui-react-CxqBCL1K.js";
import { c as createFrontstage } from "./Utils-65SDZWWd.js";
import "./Key.enum-BlUwKc_n.js";
import "./blocks-w2bBkgKV.js";
import "./client-CdcWlIUh.js";
var w = Object.defineProperty;
var i = (o, n) => w(o, "name", { value: n, configurable: true });
var a = "storybook/actions", f = `${a}/action-event`;
const { ImplicitActionsDuringRendering: _ } = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;
const { global: d } = __STORYBOOK_MODULE_GLOBAL__;
const { addons: v } = __STORYBOOK_MODULE_PREVIEW_API__;
var c = {
  depth: 10,
  clearOnStoryChange: true,
  limit: 50
};
var u = /* @__PURE__ */ i((o, n) => {
  let t = Object.getPrototypeOf(o);
  return !t || n(t) ? t : u(t, n);
}, "findProto"), D = /* @__PURE__ */ i((o) => !!(typeof o == "object" && o && u(o, (n) => /^Synthetic(?:Base)?Event$/.test(n.constructor.name)) && typeof o.persist == "function"), "isReactSyntheticEvent"), x = /* @__PURE__ */ i((o) => {
  if (D(o)) {
    let n = Object.create(
      o.constructor.prototype,
      Object.getOwnPropertyDescriptors(o)
    );
    n.persist();
    let t = Object.getOwnPropertyDescriptor(n, "view"), e = t?.value;
    return typeof e == "object" && e?.constructor.name === "Window" && Object.defineProperty(n, "view", {
      ...t,
      value: Object.create(e.constructor.prototype)
    }), n;
  }
  return o;
}, "serializeArg");
function g(o, n = {}) {
  let t = {
    ...c,
    ...n
  }, e = /* @__PURE__ */ i(function(...r) {
    if (n.implicit) {
      let m = ("__STORYBOOK_PREVIEW__" in d ? d.__STORYBOOK_PREVIEW__ : void 0)?.storyRenders.find(
        (s) => s.phase === "playing" || s.phase === "rendering"
      );
      if (m) {
        let s = !globalThis?.FEATURES?.disallowImplicitActionsInRenderV8, y = new _({
          phase: m.phase,
          name: o,
          deprecated: s
        });
        if (s)
          console.warn(y);
        else
          throw y;
      }
    }
    let A = v.getChannel(), O = Date.now().toString(36) + Math.random().toString(36).substring(2), h = 5, l = r.map(x), E = r.length > 1 ? l : l[0], b = {
      id: O,
      count: 0,
      data: { name: o, args: E },
      options: {
        ...t,
        maxDepth: h + (t.depth || 3)
      }
    };
    A.emit(f, b);
  }, "actionHandler");
  return e.isAction = true, e.implicit = n.implicit, e;
}
i(g, "action");
function ModalFrontstageStory(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      layout: "fullscreen",
      frontstages: () => [createFrontstage()],
      itemProviders: [
        {
          id: "toolbar",
          getToolbarItems: () => [
            ToolbarItemUtilities.createActionItem({
              id: "open",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
              label: "Open modal frontstage",
              execute: () => {
                UiFramework.frontstages.openModalFrontstage({
                  id: "my-modal-frontstage",
                  content: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Modal frontstage content" }),
                  title: "My Modal Frontstage",
                  ...props
                });
              },
              layouts: {
                standard: {
                  orientation: ToolbarOrientation.Horizontal,
                  usage: ToolbarUsage.ContentManipulation
                }
              }
            })
          ]
        }
      ],
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ModalFrontstageEvents, {})
    }
  );
}
function ModalFrontstageEvents() {
  reactExports.useEffect(() => {
    return UiFramework.frontstages.onModalFrontstageChangedEvent.addListener(
      g("onModalFrontstageChangedEvent")
    );
  }, []);
  reactExports.useEffect(() => {
    return UiFramework.frontstages.onCloseModalFrontstageRequestedEvent.addListener(
      (args) => {
        g("onCloseModalFrontstageRequestedEvent (close after 2s)")(args);
        setTimeout(args.stageCloseFunc, 2e3);
      }
    );
  }, []);
  reactExports.useEffect(() => {
    return UiFramework.frontstages.onModalFrontstageClosedEvent.addListener(
      g("onModalFrontstageClosedEvent")
    );
  }, []);
  return null;
}
ModalFrontstageStory.__docgenInfo = { "description": "[openModalFrontstage](https://www.itwinjs.org/reference/appui-react/frontstage/frameworkfrontstages/#openmodalfrontstage) can be used to open a modal frontstage.", "methods": [], "displayName": "ModalFrontstageStory" };
const meta = {
  title: "Frontstage/ModalFrontstage",
  component: ModalFrontstageStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    },
    layout: "fullscreen"
  },
  args: {
    notifyCloseRequest: false
  }
};
const Basic = {};
const BackButton = {
  args: {
    backButton: /* @__PURE__ */ jsxRuntimeExports.jsx(ModalFrontstageButton, { onClick: () => {
      const result = confirm("Are you sure you want to go back?");
      if (!result) return;
      UiFramework.frontstages.closeModalFrontstage();
    } })
  }
};
const AppBarRight = {
  args: {
    appBarRight: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "appBarRight" })
  }
};
const NotifyCloseRequest = {
  args: {
    notifyCloseRequest: true
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...Basic.parameters?.docs,
    source: {
      originalSource: "{}",
      ...Basic.parameters?.docs?.source
    }
  }
};
BackButton.parameters = {
  ...BackButton.parameters,
  docs: {
    ...BackButton.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    backButton: <ModalFrontstageButton onClick={() => {\n      const result = confirm("Are you sure you want to go back?");\n      if (!result) return;\n      UiFramework.frontstages.closeModalFrontstage();\n    }} />\n  }\n}',
      ...BackButton.parameters?.docs?.source
    }
  }
};
AppBarRight.parameters = {
  ...AppBarRight.parameters,
  docs: {
    ...AppBarRight.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    appBarRight: <>appBarRight</>\n  }\n}",
      ...AppBarRight.parameters?.docs?.source
    }
  }
};
NotifyCloseRequest.parameters = {
  ...NotifyCloseRequest.parameters,
  docs: {
    ...NotifyCloseRequest.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    notifyCloseRequest: true\n  }\n}",
      ...NotifyCloseRequest.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Basic", "BackButton", "AppBarRight", "NotifyCloseRequest"];
export {
  AppBarRight,
  BackButton,
  Basic,
  NotifyCloseRequest,
  __namedExportsOrder,
  meta as default
};
