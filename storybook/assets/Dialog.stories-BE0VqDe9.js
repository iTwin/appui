var _a, _b, _c;
import { D as Dialog } from "./Dialog-CkZBNuaK.js";
import { A as AppUiDecorator } from "./Decorators-CU-vvLY2.js";
import { b as DialogButtonType } from "./Key.enum-BB2gw-WQ.js";
import "./jsx-runtime-D2-sc1j1.js";
import "./index-DM9bPmif.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./DivWithOutsideClick-BtYkJyVr.js";
import "./useTranslation-CYjOBqFA.js";
import "./UiCore-CzV2ZoNP.js";
import "./DefaultToolSettingsProvider-B6B80iEN.js";
import "./index-EDRsojbr.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./iframe-C1TMdbVu.js";
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
