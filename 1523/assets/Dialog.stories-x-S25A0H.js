import { D as Dialog } from "./Dialog-LDXXCdt-.js";
import { A as AppUiDecorator } from "./Decorators-Dg8HZSuq.js";
import { b as DialogButtonType } from "./Key.enum-D6GPPVF7.js";
import "./iframe-B9aoDUwz.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-BPfTfqVX.js";
import "./useTranslation-Cboh4TB-.js";
import "./UiCore-BV5Eoyo1.js";
import "./appui-react-k-E-MyO7.js";
import "./client-DpZbCFdu.js";
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
