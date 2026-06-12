import { j as jsxRuntimeExports, r as reactExports } from "./iframe-B3XUloxp.js";
import { A as AppUiDecorator } from "./Decorators-DmHZSOgx.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-Cinq1ex4.js";
import { p as StagePanelState, s as PreviewFeaturesProvider, t as UiItemsManager, g as StagePanelSection, h as StagePanelLocation, B as BackstageItemUtilities, v as useActiveFrontstageId } from "./appui-react-D3IO1OPE.js";
import { c as createFrontstage, a as createWidget } from "./Utils-BxprqsbE.js";
import { B as BackstageComposer } from "./BackstageComposer-DmqsgEOo.js";
import { B as BackstageAppButton } from "./BackstageAppButton-BX30lFKu.js";
import { T as Text, I as Input } from "./components-react-B80bIHbV.js";
import { B as Button } from "./Key.enum-xIiRVwX2.js";
import "./preload-helper-UZRgTS1n.js";
import "./blocks-DE9a-9P3.js";
import "./index-BGWDsXqX.js";
import "./Dialog-DNSDpcXN.js";
import "./client-Cds6Vsas.js";
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
