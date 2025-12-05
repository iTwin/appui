import { D as Dialog } from "./Dialog-BNiAuKsf.js";
import { A as AppUiDecorator } from "./Decorators-B-OxG1hD.js";
import { b as DialogButtonType } from "./Key.enum-MqV3Iuz-.js";
import "./iframe-Bhm6mZpx.js";
import "./DivWithOutsideClick-Cpc-MTmt.js";
import "./useTranslation-BsDapJ0B.js";
import "./UiCore-DHbBIZZ_.js";
import "./appui-react-WePxyzLf.js";
import "./client-BV4YAMRx.js";
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
