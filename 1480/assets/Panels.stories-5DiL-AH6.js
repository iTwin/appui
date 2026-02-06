import { j as jsxRuntimeExports, r as reactExports } from "./iframe-DNdoMX4Q.js";
import { w as StagePanelState, U as UiFramework, Z as useActiveFrontstageDef } from "./appui-react-glMK-yaN.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-BWJJvhLI.js";
import { c as createFrontstage, r as removeProperty, a as createWidget } from "./Utils-CtqzyU6g.js";
import { B as Button } from "./Key.enum-YmMvjtrc.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-7SU87-Ux.js";
import "./index-C9p5eh_j.js";
import "./blocks-C7SkmsIk.js";
function PanelsStory(props) {
  const frontstage = createFrontstage({
    leftPanelProps: {
      defaultState: StagePanelState.Open
    }
  });
  const provider = props.getItemProvider?.(props);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      layout: "fullscreen",
      frontstages: [frontstage],
      itemProviders: [provider],
      onInitialize: async () => {
        UiFramework.visibility.autoHideUi = false;
      }
    }
  );
}
PanelsStory.__docgenInfo = { "description": "", "methods": [], "displayName": "PanelsStory", "props": { "getItemProvider": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(props: PanelsStoryProps) => UiItemsProvider", "signature": { "arguments": [{ "type": { "name": "PanelsStoryProps" }, "name": "props" }], "return": { "name": "UiItemsProvider" } } }, "description": "" } } };
const { action } = __STORYBOOK_MODULE_ACTIONS__;
const meta = {
  title: "Frontstage/Panels",
  component: PanelsStory,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    },
    layout: "fullscreen"
  },
  args: {
    getItemProvider: ({}) => {
      return {
        id: "items"
      };
    }
  },
  argTypes: {
    getItemProvider: removeProperty()
  }
};
const DynamicPanel = {
  args: {
    getItemProvider: () => {
      return {
        id: "items",
        getPanels: () => [{
          id: "panel1",
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Panel 1 content" }),
          type: "dynamic",
          placement: "left",
          label: "Dynamic panel 1"
        }, {
          id: "panel2",
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Panel 2 content" }),
          type: "dynamic",
          placement: "right",
          label: "Dynamic panel 2"
        }, {
          id: "panel3",
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Panel 3 content" }),
          type: "dynamic",
          placement: "left",
          label: "Dynamic panel 3"
        }],
        getWidgets: () => [createWidget(1, {
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(Widget, {})
        }), createWidget(2)]
      };
    }
  }
};
function useOpenPanels() {
  const frontstageDef = useActiveFrontstageDef();
  const subscribe = reactExports.useCallback((onStoreChange) => {
    if (!frontstageDef) return () => {
    };
    return frontstageDef.panels.onPanelOpenChanged.addListener((args) => {
      action("onPanelOpenChanged")(args);
      onStoreChange();
    });
  }, [frontstageDef]);
  const getSnapshot = reactExports.useCallback(() => {
    return frontstageDef?.panels.getOpenPanels();
  }, [frontstageDef]);
  return reactExports.useSyncExternalStore(subscribe, getSnapshot);
}
function Widget() {
  const frontstageDef = useActiveFrontstageDef();
  const openPanels = useOpenPanels();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    padding: "var(--iui-size-xs)",
    display: "flex",
    flexDirection: "column",
    gap: 8
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
      const id = "panel1";
      const isActive = openPanels?.some((p) => p === id);
      if (isActive) {
        frontstageDef?.panels.close({
          id
        });
        return;
      }
      frontstageDef?.panels.open({
        id
      });
    }, children: "Toggle panel1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
      const id = "panel2";
      const isActive = openPanels?.some((p) => p === id);
      if (isActive) {
        frontstageDef?.panels.close({
          id
        });
        return;
      }
      frontstageDef?.panels.open({
        id
      });
    }, children: "Toggle panel2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
      const id = "panel3";
      const isActive = openPanels?.some((p) => p === id);
      if (isActive) {
        frontstageDef?.panels.close({
          id
        });
        return;
      }
      frontstageDef?.panels.open({
        id
      });
    }, children: "Toggle panel3" })
  ] });
}
DynamicPanel.parameters = {
  ...DynamicPanel.parameters,
  docs: {
    ...DynamicPanel.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    getItemProvider: () => {\n      return {\n        id: "items",\n        getPanels: () => [{\n          id: "panel1",\n          content: <>Panel 1 content</>,\n          type: "dynamic",\n          placement: "left",\n          label: "Dynamic panel 1"\n        }, {\n          id: "panel2",\n          content: <>Panel 2 content</>,\n          type: "dynamic",\n          placement: "right",\n          label: "Dynamic panel 2"\n        }, {\n          id: "panel3",\n          content: <>Panel 3 content</>,\n          type: "dynamic",\n          placement: "left",\n          label: "Dynamic panel 3"\n        }],\n        getWidgets: () => [createWidget(1, {\n          content: <Widget />\n        }), createWidget(2)]\n      };\n    }\n  }\n}',
      ...DynamicPanel.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["DynamicPanel"];
export {
  DynamicPanel,
  __namedExportsOrder,
  meta as default
};
