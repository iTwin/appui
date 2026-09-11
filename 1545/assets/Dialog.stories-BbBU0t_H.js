import { D as Dialog } from "./Dialog-DMLpo0MT.js";
import { A as AppUiDecorator } from "./Decorators-s4_sgZvC.js";
import { b as DialogButtonType } from "./Key.enum-BiZltsZP.js";
import "./iframe-D8NJimLr.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-CAZgJYYG.js";
import "./useTranslation-CpO_Srkx.js";
import "./UiCore-CPEuWbaV.js";
import "./appui-react-D6ABwSZ-.js";
import "./client-D3QKcxNP.js";
import "./index-50wz-xKp.js";
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
