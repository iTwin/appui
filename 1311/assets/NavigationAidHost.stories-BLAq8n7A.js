var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { c as NavigationAidHost, d as NavigationWidgetComposer, e as IModelViewportControl, f as NavigationAidControl, U as UiFramework } from "./appui-react-CshDS9F4.js";
import { A as AppUiStory, V as ViewportContent } from "./AppUiStory-BQKHRroc.js";
import { c as createFrontstage } from "./Utils-C8WlYJ7Q.js";
import "./index-DVOlmhHI.js";
import { B as Button } from "./Dialog-B4AlSohG.js";
import "./SvgCloseSmall-D3lYHYdV.js";
import "./index-CdGyBOBZ.js";
import "./iframe-CY2-t6FD.js";
import "./client-DmvY241V.js";
import "./index-BkPtAnId.js";
import "./index-XG6mIJUL.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-selgNRA5.js";
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
