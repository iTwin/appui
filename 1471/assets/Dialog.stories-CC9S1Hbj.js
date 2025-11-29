import { D as Dialog } from "./Dialog-CrlxpY5l.js";
import { A as AppUiDecorator } from "./Decorators-DJ6Mk9hz.js";
import { b as DialogButtonType } from "./Key.enum-Dnr03nyZ.js";
import "./iframe-CyhagKHJ.js";
import "./DivWithOutsideClick-Cw5TZLie.js";
import "./useTranslation-4kEyAtRt.js";
import "./UiCore-BA5magPH.js";
import "./appui-react-DIW3BCK3.js";
import "./client-CV4hcD3J.js";
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
