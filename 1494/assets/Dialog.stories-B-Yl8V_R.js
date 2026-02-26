import { D as Dialog } from "./Dialog-vjRVfAcq.js";
import { A as AppUiDecorator } from "./Decorators-BYkUmcDF.js";
import { b as DialogButtonType } from "./Key.enum-szt-ThaG.js";
import "./iframe-B5XhNadd.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-JEHURlpk.js";
import "./useTranslation-B3Le11CI.js";
import "./UiCore-zf9AMQ6q.js";
import "./appui-react-CwKstaKu.js";
import "./client-H2bURNxP.js";
import "./index-B5vH9_xk.js";
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
