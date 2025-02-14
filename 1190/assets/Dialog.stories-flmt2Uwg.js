var _a, _b, _c;
import { D as Dialog } from "./Dialog-Bg0yW2ai.js";
import { A as AppUiDecorator } from "./Decorators-Mmqnx_I7.js";
import { a as DialogButtonType } from "./Dialog-B4HhG4L3.js";
import "./jsx-runtime-CC5-Dj7Q.js";
import "./index-DDLqOySG.js";
import "./DivWithOutsideClick-lyF4-OGH.js";
import "./useTranslation-BSWweqsz.js";
import "./UiCore-DYYROP2L.js";
import "./appui-react-CKEPUBMB.js";
import "./_commonjs-dynamic-modules-6KCvujNB.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./iframe-mvbaxCHW.js";
import "../sb-preview/runtime.js";
import "./index-BwI9SQDf.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
import "./debounce-BQf5aemw.js";
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
