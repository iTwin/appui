import { D as Dialog } from "./Dialog-CYe55DcV.js";
import { A as AppUiDecorator } from "./Decorators-BplH5p6g.js";
import { b as DialogButtonType } from "./Key.enum-DvCHltQ0.js";
import "./iframe-BmX5H014.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-D8tLZBUo.js";
import "./useTranslation-CXSsjbzK.js";
import "./UiCore-wXQeV45s.js";
import "./appui-react-DXkFctUx.js";
import "./client-M2bM1T3-.js";
import "./index-D95LU0cB.js";
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
