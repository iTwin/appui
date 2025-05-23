var _a, _b, _c;
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { R as React } from "./index-DVOlmhHI.js";
import { A as AccuDrawWidget, I as IModelApp, C as CompassMode, F as FrameworkAccuDraw, S as SvgPlaceholder } from "./appui-react-CNAmluxy.js";
import { A as AppUiStory } from "./AppUiStory-z_MZM47Q.js";
import { c as createFrontstage } from "./Utils-DYuxPKAh.js";
import "./Dialog-1sHMNaKw.js";
import "./index-CdGyBOBZ.js";
import "./iframe-gwwAaeJc.js";
import "./SvgCloseSmall-CAp7J-07.js";
import "./client-DmvY241V.js";
import "./index-DL6zFbuj.js";
import "./index-XG6mIJUL.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-selgNRA5.js";
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
