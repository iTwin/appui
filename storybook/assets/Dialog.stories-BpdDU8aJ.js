import { D as Dialog } from "./Dialog-CNPWbZBg.js";
import { A as AppUiDecorator } from "./Decorators-DZ6kqoP-.js";
import { b as DialogButtonType } from "./Key.enum-DxiaZ4K2.js";
import "./iframe-D6etZYKx.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-B_1VaNo1.js";
import "./useTranslation-CgclNNA8.js";
import "./UiCore-BSon5p_e.js";
import "./Dialog-CnMxc27J.js";
import "./appui-react-DQPnIqIU.js";
import "./components-react-CcAoSHHf.js";
import "./client-8d8O9vwT.js";
import "./index-D6OYgiXS.js";
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
