import { D as Dialog } from "./Dialog-BTSGVo0G.js";
import { A as AppUiDecorator } from "./Decorators-D0L63dT9.js";
import { b as DialogButtonType } from "./Key.enum-DdwJ-Wkg.js";
import "./iframe-BTOKt8sb.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-DrFskyoO.js";
import "./useTranslation-BJZXmqox.js";
import "./UiCore-Dh1oYbCf.js";
import "./appui-react-nOGh2M21.js";
import "./client-BuoZTSzj.js";
import "./index-C8w0C_Xr.js";
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
