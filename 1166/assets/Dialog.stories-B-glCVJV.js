var _a, _b, _c;
import { D as Dialog } from "./Dialog-C_hUXtAB.js";
import { A as AppUiDecorator } from "./Decorators-rza5Znwg.js";
import { a as DialogButtonType } from "./Dialog-B8k0cTki.js";
import "./jsx-runtime-f7WWSPSb.js";
import "./index-R26Bfrts.js";
import "./SvgCloseSmall-DYo6SMv6.js";
import "./index-CHBBkG1-.js";
import "./iframe-DDTx9BNf.js";
import "../sb-preview/runtime.js";
import "./DivWithOutsideClick-DYCc6MXe.js";
import "./useTranslation-Cg7DGd5l.js";
import "./UiCore-BUtRf_Is.js";
import "./appui-react-B8l5O-cG.js";
import "./_commonjs-dynamic-modules-lq-lihFa.js";
import "./index-oY8aizO2.js";
import "./client-DRUEp2wC.js";
import "./debounce-CTTNlY27.js";
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
