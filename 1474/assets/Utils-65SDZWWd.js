import { j as jsxRuntimeExports } from "./iframe-MZ9GDAUV.js";
import { F as FrontstageUtilities, A as StageUsage, p as StagePanelSection, q as StagePanelLocation, S as SvgPlaceholder, s as ToolbarItemUtilities, v as ToolbarOrientation, t as ToolbarUsage } from "./appui-react-CxqBCL1K.js";
class StandardContentLayouts {
  static singleView = {
    id: "uia:singleView",
    description: "Single Content View"
  };
  static fourQuadrants = {
    id: "uia:fourQuadrants",
    description: "Four Views, two stacked on the left, two stacked on the right",
    verticalSplit: {
      id: "uia:fourQuadrantVerticalSplit",
      percentage: 0.5,
      lock: false,
      minSizeLeft: 100,
      minSizeRight: 100,
      left: {
        horizontalSplit: {
          id: "uia:fourQuadrantsLeftHorizontal",
          percentage: 0.5,
          top: 0,
          bottom: 1,
          lock: false,
          minSizeTop: 50,
          minSizeBottom: 50
        }
      },
      right: {
        horizontalSplit: {
          id: "uia:fourQuadrantsRightHorizontal",
          percentage: 0.5,
          top: 2,
          bottom: 3,
          lock: false,
          minSizeTop: 50,
          minSizeBottom: 50
        }
      }
    }
  };
  static twoVerticalSplit = {
    id: "uia:twoVerticalSplit",
    description: "Two Views, side by side",
    verticalSplit: {
      id: "uia:twoViewsVerticalSplit",
      percentage: 0.5,
      left: 0,
      right: 1
    }
  };
  static twoHorizontalSplit = {
    id: "uia:twoHorizontalSplit",
    description: "Two views, stack one on top of the other",
    horizontalSplit: {
      id: "uia:twoViewsHorizontalSplit",
      percentage: 0.5,
      lock: false,
      top: 0,
      bottom: 1
    }
  };
  static threeViewsTwoOnLeft = {
    id: "uia:threeViewsTwoOnLeft",
    description: "Three views, one on the right with the two on the left stacked one of top of the other",
    verticalSplit: {
      id: "uia:twoViewsOnLeftSplit",
      percentage: 0.5,
      left: {
        horizontalSplit: {
          id: "uia:twoViewsOnLeftHorizontal",
          percentage: 0.5,
          top: 0,
          bottom: 1,
          lock: false,
          minSizeTop: 50,
          minSizeBottom: 50
        }
      },
      right: 2
    }
  };
  static threeViewsTwoOnRight = {
    id: "uia:threeViewsTwoOnRight",
    description: "Three views, one on the left with the two on the right stacked one of top of the other",
    verticalSplit: {
      id: "uia:twoViewsOnRightSplit",
      percentage: 0.5,
      left: 0,
      right: {
        horizontalSplit: {
          id: "uia:twoViewsOnRightHorizontal",
          percentage: 0.5,
          top: 1,
          bottom: 2,
          lock: false,
          minSizeTop: 50,
          minSizeBottom: 50
        }
      }
    }
  };
  static threeViewsTwoOnBottom = {
    id: "uia:threeViewsTwoOnBottom",
    description: "Three Views, one on top and two side by side on the bottom",
    horizontalSplit: {
      id: "uia:threeViewsTwoOnBottomHorizontal",
      percentage: 0.5,
      lock: false,
      top: 0,
      bottom: {
        verticalSplit: {
          id: "uia:twoViewsOnBottomVertical",
          percentage: 0.5,
          left: 1,
          right: 2,
          lock: false,
          minSizeLeft: 50,
          minSizeRight: 50
        }
      }
    }
  };
  static threeViewsTwoOnTop = {
    id: "uia:threeViewsTwoOnTop",
    description: "Three Views, two side by side on top and one on the bottom",
    horizontalSplit: {
      id: "uia:twoViewsOnTopHorizontal",
      percentage: 0.5,
      lock: false,
      top: {
        verticalSplit: {
          id: "uia:twoViewsOnTopVertical",
          percentage: 0.5,
          left: 0,
          right: 1,
          lock: false,
          minSizeLeft: 50,
          minSizeRight: 50
        }
      },
      bottom: 2
    }
  };
  // provides and iterable list of standard content layouts
  static availableLayouts = [
    StandardContentLayouts.singleView,
    StandardContentLayouts.fourQuadrants,
    StandardContentLayouts.twoVerticalSplit,
    StandardContentLayouts.twoHorizontalSplit,
    StandardContentLayouts.threeViewsTwoOnLeft,
    StandardContentLayouts.threeViewsTwoOnRight,
    StandardContentLayouts.threeViewsTwoOnBottom,
    StandardContentLayouts.threeViewsTwoOnTop
  ];
}
const { action } = __STORYBOOK_MODULE_ACTIONS__;
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
    iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
    layouts: {
      standard: {
        location: StagePanelLocation.Left,
        section: StagePanelSection.Start
      }
    },
    ...overrides
  };
}
function createToolbarItemFactory() {
  let i = 0;
  function createActionItem(overrides) {
    const id = `item${++i}`;
    const label = `Item ${i}`;
    return ToolbarItemUtilities.createActionItem({
      id,
      label,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      execute: () => action(label)(),
      layouts: {
        standard: {
          usage: ToolbarUsage.ContentManipulation,
          orientation: ToolbarOrientation.Horizontal
        }
      },
      ...overrides
    });
  }
  function createGroupItem(overrides) {
    const id = `group${++i}`;
    const label = `Group ${i}`;
    return ToolbarItemUtilities.createGroupItem({
      id,
      label,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
      ...overrides
    });
  }
  return {
    createActionItem,
    createGroupItem
  };
}
export {
  StandardContentLayouts as S,
  createWidget as a,
  createToolbarItemFactory as b,
  createFrontstage as c,
  enumArgType as e,
  removeProperty as r
};
