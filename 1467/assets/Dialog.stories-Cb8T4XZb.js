import { D as Dialog } from "./Dialog-BGFnRwKU.js";
import { A as AppUiDecorator } from "./Decorators-CPl_vyBN.js";
import { b as DialogButtonType } from "./Key.enum-C7IyTHg1.js";
import "./iframe-BaZp3WKq.js";
import "./DivWithOutsideClick-CDgOTkNo.js";
import "./useTranslation-D5BSNK6k.js";
import "./UiCore-TrgyB9Rd.js";
import "./appui-react-Be32igjM.js";
import "./client-4z9HH6bW.js";
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
