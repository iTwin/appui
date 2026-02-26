import { D as Dialog } from "./Dialog-D6js54cQ.js";
import { A as AppUiDecorator } from "./Decorators-DexZH3uj.js";
import { b as DialogButtonType } from "./Key.enum-CnwI7CFN.js";
import "./iframe-BENp4d1r.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-V2AmP4td.js";
import "./useTranslation-Cp38LryN.js";
import "./UiCore-Cb-FqcDW.js";
import "./appui-react-CEufDDhs.js";
import "./client-S7MnCWX8.js";
import "./index-CsG4pdOs.js";
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
