import { D as Dialog } from "./Dialog-CeUGsMTh.js";
import { A as AppUiDecorator } from "./Decorators-DmHZSOgx.js";
import { b as DialogButtonType } from "./Key.enum-xIiRVwX2.js";
import "./iframe-B3XUloxp.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-NlJZXA0g.js";
import "./useTranslation-DK1YUrB9.js";
import "./UiCore--TqqrF72.js";
import "./Dialog-DNSDpcXN.js";
import "./appui-react-D3IO1OPE.js";
import "./components-react-B80bIHbV.js";
import "./client-Cds6Vsas.js";
import "./index-BGWDsXqX.js";
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
