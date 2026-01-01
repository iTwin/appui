import { D as Dialog } from "./Dialog-Bdfc2_XS.js";
import { A as AppUiDecorator } from "./Decorators-dFT355_j.js";
import { b as DialogButtonType } from "./Key.enum-DpqfsKm8.js";
import "./iframe-BMMt6Qh8.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-BMDo69zd.js";
import "./useTranslation-Cz6GCP97.js";
import "./UiCore-sWi27Kpc.js";
import "./appui-react-Cz4Q9cY4.js";
import "./client-BZ3qZmlJ.js";
import "./index-B0PW13ef.js";
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
