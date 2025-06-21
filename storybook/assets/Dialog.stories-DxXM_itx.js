var _a, _b, _c;
import { D as Dialog } from "./Dialog-Bx12dosg.js";
import { A as AppUiDecorator } from "./Decorators-BtLdGomi.js";
import { b as DialogButtonType } from "./Key.enum-BxJht1U4.js";
import "./iframe-C6dO4R-p.js";
import "./DivWithOutsideClick-D_PCFsIl.js";
import "./useTranslation-Yr6_9Mx2.js";
import "./UiCore-Ch3c_0qf.js";
import "./appui-react-B7LIxGJK.js";
import "./client-CWGpl6Kr.js";
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
