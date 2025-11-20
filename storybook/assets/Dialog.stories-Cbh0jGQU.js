import { D as Dialog } from "./Dialog-SkV-XrLH.js";
import { A as AppUiDecorator } from "./Decorators-vzbzoegO.js";
import { b as DialogButtonType } from "./Key.enum-BciO7xwH.js";
import "./iframe-Ddex7Uec.js";
import "./DivWithOutsideClick-C4rdwP5z.js";
import "./useTranslation-BRdbIsKP.js";
import "./UiCore-Dy_kCn9A.js";
import "./appui-react-DC9EfscU.js";
import "./client-CHs3PkIM.js";
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
