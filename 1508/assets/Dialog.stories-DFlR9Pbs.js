import { D as Dialog } from "./Dialog-BtEdehll.js";
import { A as AppUiDecorator } from "./Decorators-CwkwcaGG.js";
import { b as DialogButtonType } from "./Key.enum-B3pThNWo.js";
import "./iframe-BnF7kxuI.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-D8WYj5fV.js";
import "./useTranslation-CaOQgx2C.js";
import "./UiCore-C9WXyKH4.js";
import "./appui-react-B7iNJbV5.js";
import "./client-DYbOg5lC.js";
import "./index-CptIXb7J.js";
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
