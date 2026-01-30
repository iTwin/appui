import { D as Dialog } from "./Dialog-yWeCp0j8.js";
import { A as AppUiDecorator } from "./Decorators-BdLItF7k.js";
import { b as DialogButtonType } from "./Key.enum-DJvycrum.js";
import "./iframe-mID-VM-4.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-DucVmEJd.js";
import "./useTranslation-D0UAEYbI.js";
import "./UiCore-KUBm0mX1.js";
import "./appui-react-vckN5W79.js";
import "./client-6pR6hfaI.js";
import "./index-DaTRI3hl.js";
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
