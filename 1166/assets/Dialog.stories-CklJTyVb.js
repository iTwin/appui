var _a, _b, _c;
import { D as Dialog } from "./Dialog-Df45taQR.js";
import { A as AppUiDecorator } from "./Decorators-CY7-4byT.js";
import { a as DialogButtonType } from "./Dialog-DD-cRevJ.js";
import "./jsx-runtime-f7WWSPSb.js";
import "./index-R26Bfrts.js";
import "./SvgCloseSmall-BizRFSWZ.js";
import "./index-CHBBkG1-.js";
import "./iframe-CVbTZ5MX.js";
import "../sb-preview/runtime.js";
import "./DivWithOutsideClick-DYCc6MXe.js";
import "./useTranslation-Bxj4kMz4.js";
import "./UiCore-B32rVOa0.js";
import "./appui-react-NJEdfdgZ.js";
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
