import { D as Dialog } from "./Dialog-3ExouMKD.js";
import { A as AppUiDecorator } from "./Decorators-Bz_dH9pg.js";
import { b as DialogButtonType } from "./Key.enum-DCghlnp9.js";
import "./iframe-CpRh-TYa.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-BrjOEvfb.js";
import "./useTranslation-CqxSDIre.js";
import "./UiCore-CnpVcqeJ.js";
import "./Dialog-BycrGCvo.js";
import "./appui-react-BtU_mNFj.js";
import "./components-react-Dj8XcCyt.js";
import "./client-Cvp-1q-B.js";
import "./index-_JpHN5Jx.js";
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
