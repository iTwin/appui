import { j as jsxRuntimeExports } from "./iframe-D6etZYKx.js";
import { a as NavigationAidHost, b as NavigationWidgetComposer, I as IModelViewportControl, U as UiFramework, c as NavigationAidControl } from "./appui-react-DQPnIqIU.js";
import { A as AppUiStory } from "./AppUiStory-Cke2SHqr.js";
import { c as createFrontstage } from "./Utils-WX8e-cwd.js";
import { B as Button } from "./Key.enum-DxiaZ4K2.js";
import { V as ViewportContent } from "./ViewportContent-DdbXomyu.js";
import "./components-react-CcAoSHHf.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-D6OYgiXS.js";
import "./Dialog-CnMxc27J.js";
import "./blocks-C98UqoJ1.js";
import "./client-8d8O9vwT.js";
function createStoryDecorator({
  contentProps
} = {}) {
  return ((Story) => {
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
  });
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
  static navigationAidId = "CustomNavigationControl";
  constructor(info, options) {
    super(info, options);
    this.reactNode = /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Custom" });
  }
}
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
    ...Default.parameters?.docs,
    source: {
      originalSource: "{\n  decorators: [createStoryDecorator()]\n}",
      ...Default.parameters?.docs?.source
    }
  }
};
DefaultControl.parameters = {
  ...DefaultControl.parameters,
  docs: {
    ...DefaultControl.parameters?.docs,
    source: {
      originalSource: '{\n  name: "Default Control (deprecated)",\n  decorators: [createStoryDecorator({\n    contentProps: {\n      content: undefined,\n      classId: IModelViewportControl\n    }\n  })]\n}',
      ...DefaultControl.parameters?.docs?.source
    }
  }
};
EmptyControl.parameters = {
  ...EmptyControl.parameters,
  docs: {
    ...EmptyControl.parameters?.docs,
    source: {
      originalSource: '{\n  name: "Empty Control (deprecated)",\n  decorators: [createStoryDecorator({\n    contentProps: {\n      content: undefined,\n      classId: class extends IModelViewportControl {\n        public override get navigationAidControl() {\n          return ""; // no navigation aid\n        }\n      }\n    }\n  })]\n}',
      ...EmptyControl.parameters?.docs?.source
    }
  }
};
CustomControl.parameters = {
  ...CustomControl.parameters,
  docs: {
    ...CustomControl.parameters?.docs,
    source: {
      originalSource: '{\n  name: "Custom Control (deprecated)",\n  decorators: [createStoryDecorator({\n    contentProps: {\n      content: undefined,\n      classId: class extends IModelViewportControl {\n        public override get navigationAidControl() {\n          return CustomNavigationControl.navigationAidId;\n        }\n      }\n    }\n  })]\n}',
      ...CustomControl.parameters?.docs?.source
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
