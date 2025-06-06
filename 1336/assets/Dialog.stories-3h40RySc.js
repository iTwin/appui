var _a, _b, _c;
import { D as Dialog } from "./Dialog-Dgs_fC2q.js";
import { A as AppUiDecorator } from "./Decorators-B6cHw9Aj.js";
import { b as DialogButtonType } from "./Dialog-DgXpX9Dj.js";
import "./index-C8SlDwFz.js";
import "./index-DVOlmhHI.js";
import "./index-CdGyBOBZ.js";
import "./SvgCloseSmall-XFYEkVPL.js";
import "./iframe-C1WTrjKK.js";
import "./DivWithOutsideClick-DJKUCiID.js";
import "./useTranslation-DmvS6pNr.js";
import "./UiCore-BHe7HalO.js";
import "./appui-react-BkfSqS8X.js";
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
