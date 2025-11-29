import { j as jsxRuntimeExports } from "./iframe-CPJTBdlt.js";
import { U as UiFramework, v as ToolbarOrientation, t as ToolbarUsage } from "./appui-react-C9QUNdjL.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-CBZTKTwr.js";
import { c as createFrontstage, e as enumArgType, r as removeProperty, b as createToolbarItemFactory } from "./Utils-qaAQbqnD.js";
import "./Key.enum-B-HWoSA2.js";
import "./client-CmZJ5OHh.js";
import "./blocks-IJCZiXwu.js";
function ToolbarStory(props) {
  const frontstage = createFrontstage({
    rightPanelProps: {
      sizeSpec: 250
    },
    hideStatusBar: true,
    hideToolSettings: true
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
ToolbarStory.__docgenInfo = { "description": "", "methods": [], "displayName": "ToolbarStory", "props": { "usage": { "required": true, "tsType": { "name": "ToolbarUsage" }, "description": "" }, "orientation": { "required": true, "tsType": { "name": "ToolbarOrientation" }, "description": "" }, "getItemProvider": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(props: ToolbarStoryProps) => UiItemsProvider", "signature": { "arguments": [{ "type": { "name": "signature", "type": "object", "raw": "{\n  usage: ToolbarUsage;\n  orientation: ToolbarOrientation;\n  getItemProvider: (props: ToolbarStoryProps) => UiItemsProvider;\n}", "signature": { "properties": [{ "key": "usage", "value": { "name": "ToolbarUsage", "required": true } }, { "key": "orientation", "value": { "name": "ToolbarOrientation", "required": true } }, { "key": "getItemProvider", "value": { "name": "signature", "type": "function", "raw": "(props: ToolbarStoryProps) => UiItemsProvider", "signature": { "arguments": [{ "type": { "name": "ToolbarStoryProps" }, "name": "props" }], "return": { "name": "UiItemsProvider" } }, "required": true } }] } }, "name": "props" }], "return": { "name": "UiItemsProvider" } } }, "description": "" } } };
const meta = {
  title: "Frontstage/Toolbar",
  component: ToolbarStory,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    },
    layout: "fullscreen"
  },
  args: {
    usage: ToolbarUsage.ContentManipulation,
    orientation: ToolbarOrientation.Horizontal,
    getItemProvider: ({
      usage,
      orientation
    }) => {
      return {
        id: "items",
        getToolbarItems: () => {
          const factory = createToolbarItemFactory();
          const layouts = {
            standard: {
              usage,
              orientation
            }
          };
          return [factory.createActionItem({
            layouts
          }), factory.createGroupItem({
            layouts,
            items: [factory.createActionItem(), factory.createActionItem()]
          }), factory.createActionItem({
            layouts
          }), factory.createActionItem({
            layouts
          })];
        }
      };
    }
  },
  argTypes: {
    usage: enumArgType(ToolbarUsage),
    orientation: enumArgType(ToolbarOrientation)
  }
};
const ContentManipulation = {};
const ContentManipulationVertical = {
  name: "Content Manipulation (vertical)",
  args: {
    ...ContentManipulation.args,
    orientation: ToolbarOrientation.Vertical
  }
};
const ViewNavigation = {
  args: {
    usage: ToolbarUsage.ViewNavigation
  }
};
const ViewNavigationVertical = {
  name: "View Navigation (vertical)",
  args: {
    ...ViewNavigation.args,
    orientation: ToolbarOrientation.Vertical
  }
};
const ViewSettings = {
  args: {
    usage: ToolbarUsage.ViewNavigation,
    getItemProvider: ({
      usage,
      orientation
    }) => {
      return {
        id: "items",
        getToolbarItems: () => {
          const factory = createToolbarItemFactory();
          const layouts = {
            standard: {
              usage,
              orientation,
              advancedUsage: "view-settings"
            }
          };
          return [factory.createActionItem({
            layouts
          }), factory.createActionItem({
            layouts
          }), factory.createActionItem({
            layouts
          })];
        }
      };
    }
  }
};
const ViewSettingsVertical = {
  name: "View Settings (vertical)",
  args: {
    ...ViewSettings.args,
    orientation: ToolbarOrientation.Vertical
  }
};
const All = {
  args: {
    getItemProvider: () => {
      return {
        id: "items",
        getToolbarItems: () => {
          const factory = createToolbarItemFactory();
          const allLayouts = [{
            standard: {
              usage: ToolbarUsage.ContentManipulation,
              orientation: ToolbarOrientation.Horizontal
            }
          }, {
            standard: {
              usage: ToolbarUsage.ContentManipulation,
              orientation: ToolbarOrientation.Vertical
            }
          }, {
            standard: {
              usage: ToolbarUsage.ViewNavigation,
              orientation: ToolbarOrientation.Horizontal
            }
          }, {
            standard: {
              usage: ToolbarUsage.ViewNavigation,
              orientation: ToolbarOrientation.Vertical
            }
          }, {
            standard: {
              usage: ToolbarUsage.ViewNavigation,
              orientation: ToolbarOrientation.Horizontal,
              advancedUsage: "view-settings"
            }
          }, {
            standard: {
              usage: ToolbarUsage.ViewNavigation,
              orientation: ToolbarOrientation.Vertical,
              advancedUsage: "view-settings"
            }
          }];
          return allLayouts.flatMap((layouts) => {
            return [factory.createActionItem({
              layouts
            }), factory.createGroupItem({
              layouts,
              items: [factory.createActionItem(), factory.createActionItem()]
            }), factory.createActionItem({
              layouts
            }), factory.createActionItem({
              layouts
            })];
          });
        }
      };
    }
  },
  argTypes: {
    usage: removeProperty(),
    orientation: removeProperty()
  }
};
ContentManipulation.parameters = {
  ...ContentManipulation.parameters,
  docs: {
    ...ContentManipulation.parameters?.docs,
    source: {
      originalSource: "{}",
      ...ContentManipulation.parameters?.docs?.source
    }
  }
};
ContentManipulationVertical.parameters = {
  ...ContentManipulationVertical.parameters,
  docs: {
    ...ContentManipulationVertical.parameters?.docs,
    source: {
      originalSource: '{\n  name: "Content Manipulation (vertical)",\n  args: {\n    ...ContentManipulation.args,\n    orientation: ToolbarOrientation.Vertical\n  }\n}',
      ...ContentManipulationVertical.parameters?.docs?.source
    }
  }
};
ViewNavigation.parameters = {
  ...ViewNavigation.parameters,
  docs: {
    ...ViewNavigation.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    usage: ToolbarUsage.ViewNavigation\n  }\n}",
      ...ViewNavigation.parameters?.docs?.source
    }
  }
};
ViewNavigationVertical.parameters = {
  ...ViewNavigationVertical.parameters,
  docs: {
    ...ViewNavigationVertical.parameters?.docs,
    source: {
      originalSource: '{\n  name: "View Navigation (vertical)",\n  args: {\n    ...ViewNavigation.args,\n    orientation: ToolbarOrientation.Vertical\n  }\n}',
      ...ViewNavigationVertical.parameters?.docs?.source
    }
  }
};
ViewSettings.parameters = {
  ...ViewSettings.parameters,
  docs: {
    ...ViewSettings.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    usage: ToolbarUsage.ViewNavigation,\n    getItemProvider: ({\n      usage,\n      orientation\n    }) => {\n      return {\n        id: "items",\n        getToolbarItems: () => {\n          const factory = createToolbarItemFactory();\n          const layouts = {\n            standard: {\n              usage,\n              orientation,\n              advancedUsage: "view-settings"\n            }\n          } satisfies ToolbarItemLayouts;\n          return [factory.createActionItem({\n            layouts\n          }), factory.createActionItem({\n            layouts\n          }), factory.createActionItem({\n            layouts\n          })];\n        }\n      };\n    }\n  }\n}',
      ...ViewSettings.parameters?.docs?.source
    }
  }
};
ViewSettingsVertical.parameters = {
  ...ViewSettingsVertical.parameters,
  docs: {
    ...ViewSettingsVertical.parameters?.docs,
    source: {
      originalSource: '{\n  name: "View Settings (vertical)",\n  args: {\n    ...ViewSettings.args,\n    orientation: ToolbarOrientation.Vertical\n  }\n}',
      ...ViewSettingsVertical.parameters?.docs?.source
    }
  }
};
All.parameters = {
  ...All.parameters,
  docs: {
    ...All.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    getItemProvider: () => {\n      return {\n        id: "items",\n        getToolbarItems: () => {\n          const factory = createToolbarItemFactory();\n          const allLayouts: ToolbarItemLayouts[] = [{\n            standard: {\n              usage: ToolbarUsage.ContentManipulation,\n              orientation: ToolbarOrientation.Horizontal\n            }\n          }, {\n            standard: {\n              usage: ToolbarUsage.ContentManipulation,\n              orientation: ToolbarOrientation.Vertical\n            }\n          }, {\n            standard: {\n              usage: ToolbarUsage.ViewNavigation,\n              orientation: ToolbarOrientation.Horizontal\n            }\n          }, {\n            standard: {\n              usage: ToolbarUsage.ViewNavigation,\n              orientation: ToolbarOrientation.Vertical\n            }\n          }, {\n            standard: {\n              usage: ToolbarUsage.ViewNavigation,\n              orientation: ToolbarOrientation.Horizontal,\n              advancedUsage: "view-settings"\n            }\n          }, {\n            standard: {\n              usage: ToolbarUsage.ViewNavigation,\n              orientation: ToolbarOrientation.Vertical,\n              advancedUsage: "view-settings"\n            }\n          }];\n          return allLayouts.flatMap(layouts => {\n            return [factory.createActionItem({\n              layouts\n            }), factory.createGroupItem({\n              layouts,\n              items: [factory.createActionItem(), factory.createActionItem()]\n            }), factory.createActionItem({\n              layouts\n            }), factory.createActionItem({\n              layouts\n            })];\n          });\n        }\n      };\n    }\n  },\n  argTypes: {\n    usage: removeProperty(),\n    orientation: removeProperty()\n  }\n}',
      ...All.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["ContentManipulation", "ContentManipulationVertical", "ViewNavigation", "ViewNavigationVertical", "ViewSettings", "ViewSettingsVertical", "All"];
export {
  All,
  ContentManipulation,
  ContentManipulationVertical,
  ViewNavigation,
  ViewNavigationVertical,
  ViewSettings,
  ViewSettingsVertical,
  __namedExportsOrder,
  meta as default
};
