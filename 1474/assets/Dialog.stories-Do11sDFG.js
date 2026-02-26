import { D as Dialog } from "./Dialog-CBoJyEUI.js";
import { A as AppUiDecorator } from "./Decorators-ByA6YP1P.js";
import { b as DialogButtonType } from "./Key.enum-BlUwKc_n.js";
import "./iframe-MZ9GDAUV.js";
import "./DivWithOutsideClick-D518llyX.js";
import "./useTranslation-6fxN148W.js";
import "./UiCore-DGGd_aJx.js";
import "./appui-react-CxqBCL1K.js";
import "./client-CdcWlIUh.js";
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
    ...Basic.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    opened: true,\n    title: "Title",\n    children: "Content",\n    buttonCluster: [{\n      type: DialogButtonType.Cancel,\n      onClick: () => undefined,\n      label: "Cancel"\n    }, {\n      type: DialogButtonType.OK,\n      onClick: () => undefined,\n      label: "OK"\n    }]\n  }\n}',
      ...Basic.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
