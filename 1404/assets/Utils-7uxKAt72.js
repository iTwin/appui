import { j as jsxRuntimeExports } from "./iframe-D_KNlAkp.js";
import { p as FrontstageUtilities, l as StandardContentLayouts, q as StageUsage, r as StagePanelSection, s as StagePanelLocation } from "./appui-react-B5el9kXP.js";
function createFrontstage(overrides) {
  const {
    content,
    contentProps,
    contentManipulation,
    layout,
    toolSettings,
    ...rest
  } = overrides ?? {};
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
          content: content ?? /* @__PURE__ */ jsxRuntimeExports.jsx(
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
          ...contentProps
        }
      ]
    },
    hideStatusBar: true,
    hideToolSettings: true,
    hideNavigationAid: true,
    ...rest
  });
  return {
    ...config,
    layout,
    contentManipulation: contentManipulation ?? config.contentManipulation,
    toolSettings: toolSettings ?? config.toolSettings
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
