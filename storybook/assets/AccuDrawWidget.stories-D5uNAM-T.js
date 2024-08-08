var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { R as React } from "./index-DM9bPmif.js";
import { A as AccuDrawWidget, I as IModelApp, C as CompassMode, F as FrameworkAccuDraw, S as SvgPlaceholder } from "./DefaultToolSettingsProvider-B6B80iEN.js";
import "./Key.enum-BB2gw-WQ.js";
import "./index-EDRsojbr.js";
import { A as AppUiStory, c as createFrontstage } from "./AppUiStory-oEM4RWbs.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./iframe-C1TMdbVu.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
import "./index-n0FlVOjm.js";
import "./index-Cp4dr_sK.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-DuWsADYF.js";
function StoryWrapper(props) {
  React.useEffect(() => {
    IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);
    FrameworkAccuDraw.uiStateStorage = {
      ...FrameworkAccuDraw.uiStateStorage,
      xIcon: "icon-placeholder",
      xIconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {})
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
    children: props.children
  });
}
const StoryDecorator = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, {
    frontstages: [createFrontstage({
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(StoryWrapper, {
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {})
      })
    })]
  });
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
