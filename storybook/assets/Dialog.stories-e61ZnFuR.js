import { D as Dialog } from "./Dialog-CcwLK32S.js";
import { A as AppUiDecorator } from "./Decorators-CZIShNLG.js";
import { b as DialogButtonType } from "./Key.enum-B-WhjwuV.js";
import "./iframe-BIXwoC80.js";
import "./DivWithOutsideClick-BTzCWPBF.js";
import "./useTranslation-BOne_TTT.js";
import "./UiCore-C8o6Tirp.js";
import "./appui-react-CNLcJNb9.js";
import "./client-dvjUKoP6.js";
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
