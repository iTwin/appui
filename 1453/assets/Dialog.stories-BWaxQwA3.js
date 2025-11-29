import { D as Dialog } from "./Dialog-CH8u1OHV.js";
import { A as AppUiDecorator } from "./Decorators-DNqsTAyN.js";
import { b as DialogButtonType } from "./Key.enum-q6sQ_7Ej.js";
import "./iframe-DIqrB2BT.js";
import "./DivWithOutsideClick-ClMuvTqc.js";
import "./useTranslation-oNsZDZAq.js";
import "./UiCore-D7rCXMcs.js";
import "./appui-react-CmcDt8M8.js";
import "./client-BHE0PJ4Z.js";
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
