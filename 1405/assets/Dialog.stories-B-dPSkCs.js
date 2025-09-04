var _a, _b, _c;
import { D as Dialog } from "./Dialog-DHub1aip.js";
import { A as AppUiDecorator } from "./Decorators-HnNTMyPw.js";
import { b as DialogButtonType } from "./Key.enum-CmhcI3db.js";
import "./iframe-DQy1AcBq.js";
import "./DivWithOutsideClick-CnfhPGuz.js";
import "./useTranslation-CT9l2HhX.js";
import "./UiCore-DC-FhZ87.js";
import "./appui-react-DY_MpVZu.js";
import "./client-G0M5LdjD.js";
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
