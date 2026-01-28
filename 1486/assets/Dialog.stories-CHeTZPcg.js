import { D as Dialog } from "./Dialog-DWYZMBfE.js";
import { A as AppUiDecorator } from "./Decorators-GSK_4PtH.js";
import { b as DialogButtonType } from "./Key.enum-OlB0m7Wi.js";
import "./iframe-BBMVhVSb.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-DcewM_av.js";
import "./useTranslation-CokqV75A.js";
import "./UiCore-B4hIvo_C.js";
import "./appui-react-CuxmpMO6.js";
import "./client-X93GHqP6.js";
import "./index-DGG_u3yd.js";
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
