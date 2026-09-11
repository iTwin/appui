import { D as Dialog } from "./Dialog-DYCJTqdQ.js";
import { A as AppUiDecorator } from "./Decorators-u4oHvOsN.js";
import { b as DialogButtonType } from "./Key.enum-DEi28OI6.js";
import "./iframe-CiskuaAf.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-D3aBMK9Z.js";
import "./useTranslation-Ds2gbUIJ.js";
import "./UiCore-C7NASY_r.js";
import "./appui-react-CRF-9igQ.js";
import "./client-DpXMbJf5.js";
import "./index-CkgzJ0FA.js";
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
