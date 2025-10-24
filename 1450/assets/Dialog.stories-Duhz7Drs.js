import { D as Dialog } from "./Dialog-D2dRSXs9.js";
import { A as AppUiDecorator } from "./Decorators-Dm6oIbea.js";
import { b as DialogButtonType } from "./Key.enum-bWQ0azWJ.js";
import "./iframe-qZqPc1fv.js";
import "./DivWithOutsideClick-QtjA0Rto.js";
import "./useTranslation-DwwsoeKD.js";
import "./UiCore-DE6VSxG8.js";
import "./appui-react-CLN8J6gc.js";
import "./client-BmWydt1w.js";
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
    ...Basic.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    opened: true,\n    title: "Title",\n    children: "Content",\n    buttonCluster: [{\n      type: DialogButtonType.Cancel,\n      onClick: () => undefined,\n      label: "Cancel"\n    }, {\n      type: DialogButtonType.OK,\n      onClick: () => undefined,\n      label: "OK"\n    }]\n  }\n}',
      ...Basic.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
