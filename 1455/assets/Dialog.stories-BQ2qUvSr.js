import { D as Dialog } from "./Dialog-cK4I2sCZ.js";
import { A as AppUiDecorator } from "./Decorators-CSBItz6J.js";
import { b as DialogButtonType } from "./Key.enum-vvj7KXZL.js";
import "./iframe-B7Vu6-Nd.js";
import "./DivWithOutsideClick-C-1OrMKA.js";
import "./useTranslation-CKaklpK1.js";
import "./UiCore-CRiDY6Sx.js";
import "./appui-react-C03ZSW7W.js";
import "./client-cEhHFPCd.js";
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
