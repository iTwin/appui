var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { R as React } from "./index-DDLqOySG.js";
import { A as AccuDrawWidget, I as IModelApp, C as CompassMode, F as FrameworkAccuDraw, S as SvgPlaceholder } from "./appui-react-COhwGOAt.js";
import { A as AppUiStory, c as createFrontstage } from "./AppUiStory-DA2rQqTP.js";
import "./Dialog-BrT16ANW.js";
import "./_commonjs-dynamic-modules-DTCOR0lh.js";
import "./inheritsLoose-HEqISCW8.js";
import "./iframe-CAFouKMK.js";
import "../sb-preview/runtime.js";
import "./index-BwI9SQDf.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
import "./index-DiGwLwvx.js";
import "./index-DLlB04eo.js";
import "./index-BZDuRpLS.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-B8H6_QN-.js";
function StoryWrapper(props) {
  React.useEffect(() => {
    IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);
    FrameworkAccuDraw.uiStateStorage = {
      ...FrameworkAccuDraw.uiStateStorage,
      xIcon: "icon-placeholder",
      xIconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {})
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: props.children });
}
const StoryDecorator = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, { frontstages: [createFrontstage({
    content: /* @__PURE__ */ jsxRuntimeExports.jsx(StoryWrapper, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) })
  })] });
};
const meta = {
  title: "Components/AccuDrawWidget",
  component: AccuDrawWidget,
  tags: ["autodocs"],
  decorators: [StoryDecorator]
};
const Basic = {};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};