import { D as Dialog } from "./Dialog-nIq0a6-d.js";
import { A as AppUiDecorator } from "./Decorators-ytBaitmo.js";
import { b as DialogButtonType } from "./Key.enum-D1Zc0n-Y.js";
import "./iframe-Vh1VhiK6.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-Byqp7-Hq.js";
import "./useTranslation-DK3hww2w.js";
import "./UiCore-CSWxkSvN.js";
import "./Dialog-B-i9zAr5.js";
import "./appui-react-B0bJ_Skp.js";
import "./components-react-DzfsRLZU.js";
import "./client-BgtXd6k0.js";
import "./index-CiwSlqzV.js";
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
