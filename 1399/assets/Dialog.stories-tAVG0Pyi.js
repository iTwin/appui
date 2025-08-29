var _a, _b, _c;
import { D as Dialog } from "./Dialog-BZEHLs7e.js";
import { A as AppUiDecorator } from "./Decorators-DBC4coPk.js";
import { b as DialogButtonType } from "./Key.enum-BuPNU8_r.js";
import "./iframe-F4W_oBvD.js";
import "./DivWithOutsideClick-BUAn5FmC.js";
import "./useTranslation-BuiU_MaL.js";
import "./UiCore-D8_xQF58.js";
import "./appui-react-D5aueqJ-.js";
import "./client-D6CAiuV8.js";
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
