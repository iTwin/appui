import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { k as FrontstageUtilities, l as StandardContentLayouts, m as StageUsage, n as StagePanelSection, o as StagePanelLocation } from "./appui-react-BhnF3Zrq.js";
function createFrontstage(overrides) {
  const config = FrontstageUtilities.createStandardFrontstage({
    id: "main-frontstage",
    usage: StageUsage.Private,
    version: Math.random(),
    contentGroupProps: {
      id: "ContentGroup",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "Content",
          classId: "",
          content: (overrides == null ? void 0 : overrides.content) ?? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              style: {
                display: "flex",
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
              },
              children: "Content"
            }
          ),
          ...overrides == null ? void 0 : overrides.contentProps
        }
      ]
    },
    hideStatusBar: true,
    hideToolSettings: true,
    hideNavigationAid: true,
    ...overrides
  });
  const contentManipulation = (overrides == null ? void 0 : overrides.contentManipulation) ?? config.contentManipulation;
  return {
    ...config,
    contentManipulation
  };
}
function removeProperty() {
  return {
    table: {
      disable: true
    }
  };
}
function enumArgType(_enum) {
  const options = Object.values(_enum).filter(
    (value) => typeof value === "number"
  );
  return {
    options,
    control: {
      type: "select",
      labels: _enum
    }
  };
}
function createWidget(id, overrides) {
  return {
    id: `w${id}`,
    label: `Widget ${id}`,
    content: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Widget ",
      id,
      " content"
    ] }),
    layouts: {
      standard: {
        location: StagePanelLocation.Left,
        section: StagePanelSection.Start
      }
    },
    ...overrides
  };
}
export {
  createWidget as a,
  createFrontstage as c,
  enumArgType as e,
  removeProperty as r
};
