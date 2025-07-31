var _a, _b, _c;
import { D as Dialog } from "./Dialog-DAfX0PbU.js";
import { A as AppUiDecorator } from "./Decorators-bqwLT6vP.js";
import { b as DialogButtonType } from "./Key.enum-D8YSRJHT.js";
import "./iframe-JYBMU7ZD.js";
import "./DivWithOutsideClick-RHW-4wly.js";
import "./useTranslation-BIlfHxqH.js";
import "./UiCore-NkIyTaF-.js";
import "./appui-react-Bkdl7eTp.js";
import "./client-CxV4gkpD.js";
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
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    opened: true,\n    title: "Title",\n    children: "Content",\n    buttonCluster: [{\n      type: DialogButtonType.Cancel,\n      onClick: () => undefined,\n      label: "Cancel"\n    }, {\n      type: DialogButtonType.OK,\n      onClick: () => undefined,\n      label: "OK"\n    }]\n  }\n}',
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
