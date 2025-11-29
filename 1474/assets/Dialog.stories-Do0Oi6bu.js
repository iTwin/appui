import { D as Dialog } from "./Dialog-xpSC4RIn.js";
import { A as AppUiDecorator } from "./Decorators-C_RT8CLB.js";
import { b as DialogButtonType } from "./Key.enum-B-HWoSA2.js";
import "./iframe-CPJTBdlt.js";
import "./DivWithOutsideClick-qMtyRsX2.js";
import "./useTranslation-DN-haObZ.js";
import "./UiCore-DYV4Mwdw.js";
import "./appui-react-C9QUNdjL.js";
import "./client-CmZJ5OHh.js";
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
