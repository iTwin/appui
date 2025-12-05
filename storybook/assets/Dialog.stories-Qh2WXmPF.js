import { D as Dialog } from "./Dialog-DuHznjhC.js";
import { A as AppUiDecorator } from "./Decorators-D8-YK_D7.js";
import { b as DialogButtonType } from "./Key.enum-DQFIldn9.js";
import "./iframe-CRTLbVkI.js";
import "./DivWithOutsideClick-fyqTttxA.js";
import "./useTranslation-LOAktV5Z.js";
import "./UiCore-DRnQnC8-.js";
import "./appui-react-CRWgJbNo.js";
import "./client-DXbnPzJB.js";
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
