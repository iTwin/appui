var _a, _b, _c;
import { D as Dialog } from "./Dialog-wJqDJZgI.js";
import { A as AppUiDecorator } from "./Decorators-B5hwbz68.js";
import { b as DialogButtonType } from "./Key.enum-DoKni0Tv.js";
import "./iframe-CxthnN3M.js";
import "./DivWithOutsideClick-C2KOsYSb.js";
import "./useTranslation-DFt6gYc_.js";
import "./UiCore-CJLjKX0_.js";
import "./appui-react-ARYPQBMf.js";
import "./client-CRBvtWy6.js";
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
