import { D as Dialog } from "./Dialog-BQ4h2aZY.js";
import { A as AppUiDecorator } from "./Decorators-C2zB1VJp.js";
import { b as DialogButtonType } from "./Key.enum-CJ9HrJPR.js";
import "./iframe-D8YXFxh5.js";
import "./DivWithOutsideClick-np2RM6ye.js";
import "./useTranslation-6ylOONCD.js";
import "./UiCore-BP3Ef5Mb.js";
import "./appui-react-B4QxuTrb.js";
import "./client-DooKKsJi.js";
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
