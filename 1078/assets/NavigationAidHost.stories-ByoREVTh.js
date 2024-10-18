var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { c as NavigationAidHost, U as UiFramework, d as NavigationWidgetComposer, e as IModelViewportControl, f as NavigationAidControl } from "./appui-react-DGYRwXUL.js";
import { A as AppUiStory, c as createFrontstage, V as ViewportContent } from "./AppUiStory-DaycIAhE.js";
import "./index-DDLqOySG.js";
import { B as Button } from "./Dialog-NGxTPZW5.js";
import "./_commonjs-dynamic-modules-DTCOR0lh.js";
import "./inheritsLoose-HEqISCW8.js";
import "./iframe-BaKlUN2f.js";
import "../sb-preview/runtime.js";
import "./index-BwI9SQDf.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
import "./index-C5tpWVnr.js";
import "./index-DLlB04eo.js";
import "./index-BZDuRpLS.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-B8H6_QN-.js";
function createStoryDecorator({
  contentProps
} = {}) {
  return (Story) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, { demoIModel: {
      default: "blank"
    }, frontstages: [createFrontstage({
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(ViewportContent, {}),
      contentManipulation: {
        id: "content-manipulation",
        content: /* @__PURE__ */ jsxRuntimeExports.jsx(
          NavigationWidgetComposer,
          {
            style: {
              gridColumn: 2
            },
            navigationAidHost: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {})
          }
        )
      },
      contentProps
    })] });
  };
}
const meta = {
  title: "Components/NavigationAidHost",
  component: NavigationAidHost,
  tags: ["autodocs"]
};
const Default = {
  decorators: [createStoryDecorator()]
};
const DefaultControl = {
  name: "Default Control (deprecated)",
  decorators: [createStoryDecorator({
    contentProps: {
      content: void 0,
      classId: IModelViewportControl
    }
  })]
};
const EmptyControl = {
  name: "Empty Control (deprecated)",
  decorators: [createStoryDecorator({
    contentProps: {
      content: void 0,
      classId: class extends IModelViewportControl {
        get navigationAidControl() {
          return "";
        }
      }
    }
  })]
};
class CustomNavigationControl extends NavigationAidControl {
  constructor(info, options) {
    super(info, options);
    this.reactNode = /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Custom" });
  }
}
__publicField(CustomNavigationControl, "navigationAidId", "CustomNavigationControl");
UiFramework.controls.register(CustomNavigationControl.navigationAidId, CustomNavigationControl);
const CustomControl = {
  name: "Custom Control (deprecated)",
  decorators: [createStoryDecorator({
    contentProps: {
      content: void 0,
      classId: class extends IModelViewportControl {
        get navigationAidControl() {
          return CustomNavigationControl.navigationAidId;
        }
      }
    }
  })]
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  decorators: [createStoryDecorator()]\n}",
      ...(_c = (_b = Default.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
DefaultControl.parameters = {
  ...DefaultControl.parameters,
  docs: {
    ...(_d = DefaultControl.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: '{\n  name: "Default Control (deprecated)",\n  decorators: [createStoryDecorator({\n    contentProps: {\n      content: undefined,\n      classId: IModelViewportControl\n    }\n  })]\n}',
      ...(_f = (_e = DefaultControl.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
EmptyControl.parameters = {
  ...EmptyControl.parameters,
  docs: {
    ...(_g = EmptyControl.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: '{\n  name: "Empty Control (deprecated)",\n  decorators: [createStoryDecorator({\n    contentProps: {\n      content: undefined,\n      classId: class extends IModelViewportControl {\n        public override get navigationAidControl() {\n          return ""; // no navigation aid\n        }\n      }\n    }\n  })]\n}',
      ...(_i = (_h = EmptyControl.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
CustomControl.parameters = {
  ...CustomControl.parameters,
  docs: {
    ...(_j = CustomControl.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: '{\n  name: "Custom Control (deprecated)",\n  decorators: [createStoryDecorator({\n    contentProps: {\n      content: undefined,\n      classId: class extends IModelViewportControl {\n        public override get navigationAidControl() {\n          return CustomNavigationControl.navigationAidId;\n        }\n      }\n    }\n  })]\n}',
      ...(_l = (_k = CustomControl.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
const __namedExportsOrder = ["Default", "DefaultControl", "EmptyControl", "CustomControl"];
export {
  CustomControl,
  Default,
  DefaultControl,
  EmptyControl,
  __namedExportsOrder,
  meta as default
};
