import { j as jsxRuntimeExports } from "./iframe-MZ9GDAUV.js";
import { K as PreviewFeaturesProvider, U as UiFramework, v as ToolbarOrientation, t as ToolbarUsage, W as WidgetState } from "./appui-react-CxqBCL1K.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-BbgzA-a2.js";
import { c as createFrontstage, r as removeProperty, e as enumArgType, b as createToolbarItemFactory, a as createWidget } from "./Utils-65SDZWWd.js";
import { B as BackstageAppButton } from "./BackstageAppButton-Co_9jlKh.js";
import "./Key.enum-BlUwKc_n.js";
import "./client-CdcWlIUh.js";
import "./blocks-w2bBkgKV.js";
function ToolbarsStory(props) {
  const frontstage = createFrontstage({
    rightPanelProps: {
      sizeSpec: 250
    },
    hideNavigationAid: props.hideNavigationAid,
    cornerButton: props.cornerButton ? /* @__PURE__ */ jsxRuntimeExports.jsx(BackstageAppButton, {}) : void 0
  });
  const provider = props.getItemProvider?.(props);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PreviewFeaturesProvider,
    {
      features: { controlWidgetVisibility: props.controlWidgetVisibility },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppUiStory,
        {
          layout: "fullscreen",
          frontstages: [frontstage],
          itemProviders: [provider],
          onInitialize: async () => {
            UiFramework.visibility.autoHideUi = false;
          }
        }
      )
    }
  );
}
ToolbarsStory.__docgenInfo = { "description": "", "methods": [], "displayName": "ToolbarsStory", "props": { "usage": { "required": true, "tsType": { "name": "ToolbarUsage" }, "description": "" }, "orientation": { "required": true, "tsType": { "name": "ToolbarOrientation" }, "description": "" }, "length": { "required": true, "tsType": { "name": "number" }, "description": "" }, "getItemProvider": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(props: ToolbarStoryProps) => UiItemsProvider", "signature": { "arguments": [{ "type": { "name": "ToolbarStoryProps" }, "name": "props" }], "return": { "name": "UiItemsProvider" } } }, "description": "" }, "hideNavigationAid": { "required": true, "tsType": { "name": "boolean" }, "description": "" }, "cornerButton": { "required": true, "tsType": { "name": "boolean" }, "description": "" }, "contentManipulationHorizontalLength": { "required": false, "tsType": { "name": "number" }, "description": "" }, "contentManipulationVerticalLength": { "required": false, "tsType": { "name": "number" }, "description": "" }, "viewNavigationHorizontalLength": { "required": false, "tsType": { "name": "number" }, "description": "" }, "viewNavigationVerticalLength": { "required": false, "tsType": { "name": "number" }, "description": "" }, "viewSettingsHorizontalLength": { "required": false, "tsType": { "name": "number" }, "description": "" }, "viewSettingsVerticalLength": { "required": false, "tsType": { "name": "number" }, "description": "" } }, "composes": ["Pick"] };
function getWidgets() {
  return [createWidget(1, {
    defaultState: WidgetState.Hidden
  })];
}
const meta = {
  title: "Frontstage/Toolbars",
  component: ToolbarsStory,
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
    length: 4,
    hideNavigationAid: true,
    cornerButton: false,
    getItemProvider: ({
      usage,
      orientation,
      length
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
          return Array.from({
            length
          }).map((_, index) => {
            if (index === 1) {
              return factory.createGroupItem({
                layouts,
                items: [factory.createActionItem(), factory.createActionItem()]
              });
            }
            return factory.createActionItem({
              layouts
            });
          });
        },
        getWidgets
      };
    },
    controlWidgetVisibility: false
  },
  argTypes: {
    usage: enumArgType(ToolbarUsage),
    orientation: enumArgType(ToolbarOrientation),
    getItemProvider: removeProperty(),
    contentManipulationHorizontalLength: removeProperty(),
    contentManipulationVerticalLength: removeProperty(),
    viewNavigationHorizontalLength: removeProperty(),
    viewNavigationVerticalLength: removeProperty(),
    viewSettingsHorizontalLength: removeProperty(),
    viewSettingsVerticalLength: removeProperty()
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
      orientation,
      length
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
          return Array.from({
            length
          }).map((_, index) => {
            if (index === 1) {
              return factory.createGroupItem({
                layouts,
                items: [factory.createActionItem(), factory.createActionItem()]
              });
            }
            return factory.createActionItem({
              layouts
            });
          });
        },
        getWidgets
      };
    }
  },
  argTypes: {
    usage: removeProperty()
  }
};
const ViewSettingsVertical = {
  name: "View Settings (vertical)",
  ...ViewSettings,
  args: {
    ...ViewSettings.args,
    orientation: ToolbarOrientation.Vertical
  }
};
const All = {
  args: {
    getItemProvider: ({
      length,
      contentManipulationHorizontalLength,
      contentManipulationVerticalLength,
      viewSettingsHorizontalLength,
      viewSettingsVerticalLength,
      viewNavigationHorizontalLength,
      viewNavigationVerticalLength
    }) => {
      return {
        id: "items",
        getToolbarItems: () => {
          const factory = createToolbarItemFactory();
          const toolbars = [{
            layouts: {
              standard: {
                usage: ToolbarUsage.ContentManipulation,
                orientation: ToolbarOrientation.Horizontal
              }
            },
            length: contentManipulationHorizontalLength ?? length
          }, {
            layouts: {
              standard: {
                usage: ToolbarUsage.ContentManipulation,
                orientation: ToolbarOrientation.Vertical
              }
            },
            length: contentManipulationVerticalLength ?? length
          }, {
            layouts: {
              standard: {
                usage: ToolbarUsage.ViewNavigation,
                orientation: ToolbarOrientation.Horizontal
              }
            },
            length: viewNavigationHorizontalLength ?? length
          }, {
            layouts: {
              standard: {
                usage: ToolbarUsage.ViewNavigation,
                orientation: ToolbarOrientation.Vertical
              }
            },
            length: viewNavigationVerticalLength ?? length
          }, {
            layouts: {
              standard: {
                usage: ToolbarUsage.ViewNavigation,
                orientation: ToolbarOrientation.Horizontal,
                advancedUsage: "view-settings"
              }
            },
            length: viewSettingsHorizontalLength ?? length
          }, {
            layouts: {
              standard: {
                usage: ToolbarUsage.ViewNavigation,
                orientation: ToolbarOrientation.Vertical,
                advancedUsage: "view-settings"
              }
            },
            length: viewSettingsVerticalLength ?? length
          }];
          return toolbars.flatMap((toolbar) => {
            return Array.from({
              length: toolbar.length
            }).map((_, index) => {
              if (index === 1) return factory.createGroupItem({
                layouts: toolbar.layouts,
                items: [factory.createActionItem(), factory.createActionItem()]
              });
              return factory.createActionItem({
                layouts: toolbar.layouts
              });
            });
          });
        },
        getWidgets
      };
    }
  },
  argTypes: {
    usage: removeProperty(),
    orientation: removeProperty()
  }
};
const AllCustom = {
  name: "All (custom)",
  ...All,
  args: {
    ...All.args,
    viewSettingsVerticalLength: 8
  },
  argTypes: {
    ...All.argTypes,
    contentManipulationHorizontalLength: {
      table: {
        disable: false
      }
    },
    contentManipulationVerticalLength: {
      table: {
        disable: false
      }
    },
    viewNavigationHorizontalLength: {
      table: {
        disable: false
      }
    },
    viewNavigationVerticalLength: {
      table: {
        disable: false
      }
    },
    viewSettingsHorizontalLength: {
      table: {
        disable: false
      }
    },
    viewSettingsVerticalLength: {
      table: {
        disable: false
      }
    }
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
      originalSource: '{\n  args: {\n    usage: ToolbarUsage.ViewNavigation,\n    getItemProvider: ({\n      usage,\n      orientation,\n      length\n    }) => {\n      return {\n        id: "items",\n        getToolbarItems: () => {\n          const factory = createToolbarItemFactory();\n          const layouts = {\n            standard: {\n              usage,\n              orientation,\n              advancedUsage: "view-settings"\n            }\n          } satisfies ToolbarItemLayouts;\n          return Array.from({\n            length\n          }).map((_, index) => {\n            if (index === 1) {\n              return factory.createGroupItem({\n                layouts,\n                items: [factory.createActionItem(), factory.createActionItem()]\n              });\n            }\n            return factory.createActionItem({\n              layouts\n            });\n          });\n        },\n        getWidgets\n      };\n    }\n  },\n  argTypes: {\n    usage: removeProperty()\n  }\n}',
      ...ViewSettings.parameters?.docs?.source
    }
  }
};
ViewSettingsVertical.parameters = {
  ...ViewSettingsVertical.parameters,
  docs: {
    ...ViewSettingsVertical.parameters?.docs,
    source: {
      originalSource: '{\n  name: "View Settings (vertical)",\n  ...ViewSettings,\n  args: {\n    ...ViewSettings.args,\n    orientation: ToolbarOrientation.Vertical\n  }\n}',
      ...ViewSettingsVertical.parameters?.docs?.source
    }
  }
};
All.parameters = {
  ...All.parameters,
  docs: {
    ...All.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    getItemProvider: ({\n      length,\n      contentManipulationHorizontalLength,\n      contentManipulationVerticalLength,\n      viewSettingsHorizontalLength,\n      viewSettingsVerticalLength,\n      viewNavigationHorizontalLength,\n      viewNavigationVerticalLength\n    }) => {\n      return {\n        id: "items",\n        getToolbarItems: () => {\n          const factory = createToolbarItemFactory();\n          const toolbars: {\n            layouts: ToolbarItemLayouts;\n            length: number;\n          }[] = [{\n            layouts: {\n              standard: {\n                usage: ToolbarUsage.ContentManipulation,\n                orientation: ToolbarOrientation.Horizontal\n              }\n            },\n            length: contentManipulationHorizontalLength ?? length\n          }, {\n            layouts: {\n              standard: {\n                usage: ToolbarUsage.ContentManipulation,\n                orientation: ToolbarOrientation.Vertical\n              }\n            },\n            length: contentManipulationVerticalLength ?? length\n          }, {\n            layouts: {\n              standard: {\n                usage: ToolbarUsage.ViewNavigation,\n                orientation: ToolbarOrientation.Horizontal\n              }\n            },\n            length: viewNavigationHorizontalLength ?? length\n          }, {\n            layouts: {\n              standard: {\n                usage: ToolbarUsage.ViewNavigation,\n                orientation: ToolbarOrientation.Vertical\n              }\n            },\n            length: viewNavigationVerticalLength ?? length\n          }, {\n            layouts: {\n              standard: {\n                usage: ToolbarUsage.ViewNavigation,\n                orientation: ToolbarOrientation.Horizontal,\n                advancedUsage: "view-settings"\n              }\n            },\n            length: viewSettingsHorizontalLength ?? length\n          }, {\n            layouts: {\n              standard: {\n                usage: ToolbarUsage.ViewNavigation,\n                orientation: ToolbarOrientation.Vertical,\n                advancedUsage: "view-settings"\n              }\n            },\n            length: viewSettingsVerticalLength ?? length\n          }];\n          return toolbars.flatMap(toolbar => {\n            return Array.from({\n              length: toolbar.length\n            }).map((_, index) => {\n              if (index === 1) return factory.createGroupItem({\n                layouts: toolbar.layouts,\n                items: [factory.createActionItem(), factory.createActionItem()]\n              });\n              return factory.createActionItem({\n                layouts: toolbar.layouts\n              });\n            });\n          });\n        },\n        getWidgets\n      };\n    }\n  },\n  argTypes: {\n    usage: removeProperty(),\n    orientation: removeProperty()\n  }\n}',
      ...All.parameters?.docs?.source
    }
  }
};
AllCustom.parameters = {
  ...AllCustom.parameters,
  docs: {
    ...AllCustom.parameters?.docs,
    source: {
      originalSource: '{\n  name: "All (custom)",\n  ...All,\n  args: {\n    ...All.args,\n    viewSettingsVerticalLength: 8\n  },\n  argTypes: {\n    ...All.argTypes,\n    contentManipulationHorizontalLength: {\n      table: {\n        disable: false\n      }\n    },\n    contentManipulationVerticalLength: {\n      table: {\n        disable: false\n      }\n    },\n    viewNavigationHorizontalLength: {\n      table: {\n        disable: false\n      }\n    },\n    viewNavigationVerticalLength: {\n      table: {\n        disable: false\n      }\n    },\n    viewSettingsHorizontalLength: {\n      table: {\n        disable: false\n      }\n    },\n    viewSettingsVerticalLength: {\n      table: {\n        disable: false\n      }\n    }\n  }\n}',
      ...AllCustom.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["ContentManipulation", "ContentManipulationVertical", "ViewNavigation", "ViewNavigationVertical", "ViewSettings", "ViewSettingsVertical", "All", "AllCustom"];
export {
  All,
  AllCustom,
  ContentManipulation,
  ContentManipulationVertical,
  ViewNavigation,
  ViewNavigationVertical,
  ViewSettings,
  ViewSettingsVertical,
  __namedExportsOrder,
  meta as default
};
