import { D as Dialog } from "./Dialog-IvpVNr7Z.js";
import { A as AppUiDecorator } from "./Decorators-DCdjo0Y2.js";
import { b as DialogButtonType } from "./Key.enum-C6kR_Rex.js";
import "./iframe-Dq7NZ5f-.js";
import "./DivWithOutsideClick-CEUDwQ0V.js";
import "./useTranslation-ESgiSqpd.js";
import "./UiCore-DTkLsZ1p.js";
import "./appui-react-nLGuzzO4.js";
import "./client-Tq8JgO2o.js";
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
