import { D as Dialog } from "./Dialog-BieeIl8d.js";
import { A as AppUiDecorator } from "./Decorators-JrAS__uJ.js";
import { b as DialogButtonType } from "./Key.enum-COMa1JTT.js";
import "./iframe-BcAvbCVW.js";
import "./DivWithOutsideClick-mmQHd1CU.js";
import "./useTranslation-DCtvMZ2Y.js";
import "./UiCore-u9FUlVub.js";
import "./appui-react-DQI_0K9M.js";
import "./client-BZBZgC4q.js";
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
