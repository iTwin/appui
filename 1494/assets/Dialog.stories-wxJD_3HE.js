import { D as Dialog } from "./Dialog-KuQAs3r2.js";
import { A as AppUiDecorator } from "./Decorators-Dc4NefC_.js";
import { b as DialogButtonType } from "./Key.enum-DZrcflso.js";
import "./iframe-CLfdfAl1.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-DvgazwEq.js";
import "./useTranslation-Bp0i-EhX.js";
import "./UiCore-DJJANzIa.js";
import "./appui-react-DlzUwJvs.js";
import "./client-D8vXmL2m.js";
import "./index-DuJcsXoL.js";
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
