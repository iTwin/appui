var _a, _b, _c;
import { j as jsxRuntimeExports, e } from "./iframe-N2fj7JLS.js";
import { A as AccuDrawWidget, I as IModelApp, C as CompassMode, F as FrameworkAccuDraw, S as SvgPlaceholder } from "./appui-react-BMIkHgLG.js";
import { A as AppUiStory } from "./AppUiStory--D7avtYM.js";
import { c as createFrontstage } from "./Utils-SDm-TzWl.js";
import "./Key.enum-B1r-IJYZ.js";
import "./client-B-V9a0IV.js";
import "./blocks-BQmKhZDh.js";
function StoryWrapper(props) {
  e.useEffect(() => {
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
