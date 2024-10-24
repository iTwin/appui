var _a, _b, _c;
import { D as Dialog } from "./Dialog-DAIXBnY-.js";
import { A as AppUiDecorator } from "./Decorators-8bDTvl1X.js";
import { a as DialogButtonType } from "./Dialog-hMpGqUOG.js";
import "./jsx-runtime-CC5-Dj7Q.js";
import "./index-DDLqOySG.js";
import "./DivWithOutsideClick-ewx4hdCi.js";
import "./useTranslation-fS7wCCPR.js";
import "./UiCore-D3hqF_oI.js";
import "./appui-react-CX_PfSQ7.js";
import "./_commonjs-dynamic-modules-DTCOR0lh.js";
import "./inheritsLoose-HEqISCW8.js";
import "./iframe-C5R7WXyD.js";
import "../sb-preview/runtime.js";
import "./index-BwI9SQDf.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
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
