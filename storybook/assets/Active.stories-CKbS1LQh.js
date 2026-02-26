import { j as jsxRuntimeExports, r as reactExports } from "./iframe-BENp4d1r.js";
import { A as AppUiDecorator } from "./Decorators-DexZH3uj.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-1k4NCfid.js";
import { w as StagePanelState, K as PreviewFeaturesProvider, B as BackstageItemUtilities, L as UiItemsManager, p as StagePanelSection, q as StagePanelLocation, Q as useActiveFrontstageId, R as Text, X as Input } from "./appui-react-CEufDDhs.js";
import { c as createFrontstage, a as createWidget } from "./Utils-B8gUJSzA.js";
import { B as BackstageAppButton } from "./BackstageAppButton-Ba6pIfc7.js";
import { B as BackstageComposer } from "./BackstageComposer-C5Dw2njM.js";
import { B as Button } from "./Key.enum-CnwI7CFN.js";
import "./preload-helper-UZRgTS1n.js";
import "./blocks-DFQpQ9rY.js";
import "./index-CsG4pdOs.js";
import "./client-S7MnCWX8.js";
function AppContent() {
  const [count, setCount] = reactExports.useState(0);
  const activeFrontstageId = useActiveFrontstageId();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
        gap: 8,
        height: "100%"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: activeFrontstageId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setCount((prev) => ++prev), children: [
          count,
          "++"
        ] })
      ]
    }
  );
}
function ActiveFrontstageStory(props) {
  const { stableContentLayout } = props;
  const frontstage1 = createFrontstage({
    id: "frontstage1",
    content: /* @__PURE__ */ jsxRuntimeExports.jsx(AppContent, {}),
    hideStatusBar: true,
    hideToolSettings: true,
    cornerButton: /* @__PURE__ */ jsxRuntimeExports.jsx(BackstageAppButton, {}),
    leftPanelProps: {
      defaultState: StagePanelState.Open,
      pinned: true
    }
  });
  const frontstage2 = createFrontstage({
    id: "frontstage2",
    content: /* @__PURE__ */ jsxRuntimeExports.jsx(AppContent, {}),
    hideStatusBar: true,
    hideToolSettings: true,
    cornerButton: /* @__PURE__ */ jsxRuntimeExports.jsx(BackstageAppButton, {}),
    rightPanelProps: {
      defaultState: StagePanelState.Open,
      pinned: true
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PreviewFeaturesProvider,
    {
      features: {
        stableContentLayout
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppUiStory,
        {
          appBackstage: /* @__PURE__ */ jsxRuntimeExports.jsx(BackstageComposer, {}),
          layout: "fullscreen",
          frontstages: [frontstage1, frontstage2],
          itemProviders: [
            {
              id: "backstage-items",
              getBackstageItems: () => [
                BackstageItemUtilities.createStageLauncher({
                  stageId: frontstage1.id,
                  label: "Frontstage 1"
                }),
                BackstageItemUtilities.createStageLauncher({
                  stageId: frontstage2.id,
                  label: "Frontstage 2"
                })
              ]
            }
          ],
          onInitialize: async () => {
            UiItemsManager.register(
              {
                id: "frontstage1-widgets",
                getWidgets: () => [createWidget(1)]
              },
              {
                stageIds: [frontstage1.id]
              }
            );
            UiItemsManager.register(
              {
                id: "frontstage2-widgets",
                getWidgets: () => [
                  createWidget(2, {
                    layouts: {
                      standard: {
                        location: StagePanelLocation.Right,
                        section: StagePanelSection.Start
                      }
                    }
                  })
                ]
              },
              {
                stageIds: [frontstage2.id]
              }
            );
          }
        }
      )
    }
  );
}
ActiveFrontstageStory.__docgenInfo = { "description": "", "methods": [], "displayName": "ActiveFrontstageStory" };
const meta = {
  title: "Frontstage/Active",
  component: ActiveFrontstageStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  args: {
    stableContentLayout: true
  },
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    },
    layout: "fullscreen"
  }
};
const Basic = {};
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
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
