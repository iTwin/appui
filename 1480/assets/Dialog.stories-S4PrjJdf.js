import { D as Dialog } from "./Dialog-DxwuPHH3.js";
import { A as AppUiDecorator } from "./Decorators-DePPLJKx.js";
import { b as DialogButtonType } from "./Key.enum-YmMvjtrc.js";
import "./iframe-DNdoMX4Q.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-CsbLvJKx.js";
import "./useTranslation-CYVV2OaB.js";
import "./UiCore-BNsF1kyP.js";
import "./appui-react-glMK-yaN.js";
import "./client-7SU87-Ux.js";
import "./index-C9p5eh_j.js";
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
