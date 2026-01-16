import { D as Dialog } from "./Dialog-BOOJpyIf.js";
import { A as AppUiDecorator } from "./Decorators-BqPf1xM4.js";
import { b as DialogButtonType } from "./Key.enum-CHcihfJj.js";
import "./iframe-DCd7i-3L.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-DGrY6_qG.js";
import "./useTranslation-BUir92BM.js";
import "./UiCore-C4wFchc-.js";
import "./appui-react-Cc0nytPC.js";
import "./client-ByjZ9BLp.js";
import "./index-CTrMaIM3.js";
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
