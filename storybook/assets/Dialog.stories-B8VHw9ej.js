var _a, _b, _c;
import { D as Dialog } from "./Dialog-BIiUFQoN.js";
import { A as AppUiDecorator } from "./Decorators-DQvVBmEf.js";
import { a as DialogButtonType } from "./Dialog-UbQ8tCq7.js";
import "./jsx-runtime-f7WWSPSb.js";
import "./index-R26Bfrts.js";
import "./SvgCloseSmall-CaGNDeaB.js";
import "./index-CHBBkG1-.js";
import "./iframe-a4RReJ30.js";
import "../sb-preview/runtime.js";
import "./DivWithOutsideClick-DYCc6MXe.js";
import "./useTranslation-C80QUDv-.js";
import "./UiCore-Rmxz_2vx.js";
import "./appui-react-Dn_X2li6.js";
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
