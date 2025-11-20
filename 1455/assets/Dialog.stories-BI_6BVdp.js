import { D as Dialog } from "./Dialog-W06oWrcP.js";
import { A as AppUiDecorator } from "./Decorators-QJAbI6jH.js";
import { b as DialogButtonType } from "./Key.enum-D5EC_Md2.js";
import "./iframe-BxVIzreG.js";
import "./DivWithOutsideClick-D4XRngye.js";
import "./useTranslation-iy6GvMeR.js";
import "./UiCore-DTi89hGg.js";
import "./appui-react-CvaqSdj1.js";
import "./client-DWlsoIYR.js";
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
