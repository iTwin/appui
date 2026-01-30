import { D as Dialog } from "./Dialog-BEujpc-f.js";
import { A as AppUiDecorator } from "./Decorators-D8CF4g__.js";
import { b as DialogButtonType } from "./Key.enum-CiB4OVGn.js";
import "./iframe-A-daL9dH.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-DJeW-U9L.js";
import "./useTranslation-BNe4xU2r.js";
import "./UiCore-B9f5uQku.js";
import "./appui-react-DFr32jNI.js";
import "./client-BinWtdfJ.js";
import "./index-Cv1bF3Cl.js";
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
