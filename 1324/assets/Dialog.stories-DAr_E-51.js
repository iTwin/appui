var _a, _b, _c;
import { D as Dialog } from "./Dialog-DaZ5yDpl.js";
import { A as AppUiDecorator } from "./Decorators-DViP6t0a.js";
import { a as DialogButtonType } from "./Dialog-DTkGrnAC.js";
import "./index-C8SlDwFz.js";
import "./index-DVOlmhHI.js";
import "./index-CdGyBOBZ.js";
import "./SvgCloseSmall-Bu3Oy4Gr.js";
import "./iframe-BrzIzMCe.js";
import "./DivWithOutsideClick-DJKUCiID.js";
import "./useTranslation-GJ1dSjy6.js";
import "./UiCore-Dg7aX4UN.js";
import "./appui-react-D5ydBozH.js";
import "./client-DmvY241V.js";
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
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    opened: true,\n    title: "Title",\n    children: "Content",\n    buttonCluster: [{\n      type: DialogButtonType.Cancel,\n      onClick: () => undefined,\n      label: "Cancel"\n    }, {\n      type: DialogButtonType.OK,\n      onClick: () => undefined,\n      label: "OK"\n    }]\n  }\n}',
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
