import { D as Dialog } from "./Dialog-CxFkixHH.js";
import { A as AppUiDecorator } from "./Decorators-CLX66_jE.js";
import { b as DialogButtonType } from "./Key.enum-D-1rx8MU.js";
import "./iframe-Bw_N4eUI.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-CiuwRPqu.js";
import "./useTranslation--_AX_9Ia.js";
import "./UiCore-Dbp439ul.js";
import "./appui-react-C_1Z-tb4.js";
import "./client-CKwtnCjo.js";
import "./index-Btv7an_F.js";
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
