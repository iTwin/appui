var _a, _b, _c;
import { D as Dialog } from "./Dialog-G-0IJBsc.js";
import { A as AppUiDecorator } from "./Decorators-CXFrraVc.js";
import { D as DialogButtonType } from "./Key.enum-Nky5yUvk.js";
import "./jsx-runtime-D2-sc1j1.js";
import "./index-DM9bPmif.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./DivWithOutsideClick-DwNV55q9.js";
import "./useTranslation-3wnV47N4.js";
import "./UiCore-BpDsbitV.js";
import "./DefaultToolSettingsProvider-BeaL6ll4.js";
import "./index-EDRsojbr.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./iframe-vMT8xG5O.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
const meta = {
  title: "Deprecated/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Basic = {
  args: {
    opened: true,
    title: "Title",
    children: "Content",
    buttonCluster: [{
      type: DialogButtonType.Cancel,
      onClick: () => void 0,
      label: "Cancel"
    }, {
      type: DialogButtonType.OK,
      onClick: () => void 0,
      label: "OK"
    }]
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    opened: true,\n    title: "Title",\n    children: "Content",\n    buttonCluster: [{\n      type: DialogButtonType.Cancel,\n      onClick: () => undefined,\n      label: "Cancel"\n    }, {\n      type: DialogButtonType.OK,\n      onClick: () => undefined,\n      label: "OK"\n    }]\n  }\n}',
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
