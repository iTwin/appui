var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { U as UiFramework, N as NotifyMessageDetails, d as IModelApp, O as OutputMessagePriority, e as OutputMessageType } from "./DefaultToolSettingsProvider-DIShliKp.js";
import { R as RelativePosition } from "./Key.enum-BpJjJDFT.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-nqk_Q9zz.js";
import { R as React } from "./index-DM9bPmif.js";
import "./index-EDRsojbr.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./iframe-pWcJHFO-.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
import "./index-CUkxFfN0.js";
import "./index-Cp4dr_sK.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-DuWsADYF.js";
function NotificationsStory({
  messagePriority,
  briefMessage,
  detailedMessage,
  messageType,
  messageAlert,
  ...props
}) {
  React.useEffect(() => {
    return () => {
      UiFramework.dialogs.modal.close();
      UiFramework.dialogs.modeless.close();
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      layout: "fullscreen",
      onFrontstageActivated: () => {
        const message = new NotifyMessageDetails(
          messagePriority,
          briefMessage,
          detailedMessage,
          messageType,
          messageAlert
        );
        message.viewport = document.documentElement;
        IModelApp.notifications.outputMessage(message);
      },
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(PointerPosition, {})
    }
  );
}
function PointerPosition() {
  React.useEffect(() => {
    const listener = (e) => {
      IModelApp.notifications.updatePointerMessage(
        {
          x: e.clientX + 10,
          y: e.clientY - 10
        },
        // TODO: required in AppNotificationManager
        RelativePosition.Top
      );
    };
    document.addEventListener("pointermove", listener);
    return () => {
      document.removeEventListener("pointermove", listener);
    };
  }, []);
  return null;
}
try {
  NotificationsStory.displayName = "NotificationsStory";
  NotificationsStory.__docgenInfo = { "description": "[AppNotificationManager.outputMessage](https://www.itwinjs.org/reference/appui-react/notification/appnotificationmanager/) can be used to display notifications.", "displayName": "NotificationsStory", "props": { "messagePriority": { "defaultValue": null, "description": "", "name": "messagePriority", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }, { "value": "10" }, { "value": "11" }, { "value": "12" }, { "value": "13" }, { "value": "17" }] } }, "briefMessage": { "defaultValue": null, "description": "", "name": "briefMessage", "required": true, "type": { "name": "string | HTMLElement" } }, "detailedMessage": { "defaultValue": null, "description": "", "name": "detailedMessage", "required": false, "type": { "name": "string | HTMLElement" } }, "messageType": { "defaultValue": null, "description": "", "name": "messageType", "required": false, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }, { "value": "2" }, { "value": "3" }, { "value": "4" }] } }, "messageAlert": { "defaultValue": null, "description": "", "name": "messageAlert", "required": false, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }, { "value": "2" }] } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "Frontstage/Notifications/OutputMessage",
  component: NotificationsStory,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    },
    layout: "fullscreen"
  },
  args: {
    messagePriority: OutputMessagePriority.Debug,
    briefMessage: "Brief message"
  }
};
const Basic = {};
const Error = {
  args: {
    messagePriority: OutputMessagePriority.Error
  }
};
const Detailed = {
  args: {
    detailedMessage: "Detailed message"
  }
};
const Pointer = {
  args: {
    messageType: OutputMessageType.Pointer
  }
};
const Alert = {
  args: {
    messageType: OutputMessageType.Alert
  }
};
const Sticky = {
  args: {
    messageType: OutputMessageType.Sticky
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
Error.parameters = {
  ...Error.parameters,
  docs: {
    ...(_d = Error.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  args: {\n    messagePriority: OutputMessagePriority.Error\n  }\n}",
      ...(_f = (_e = Error.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
Detailed.parameters = {
  ...Detailed.parameters,
  docs: {
    ...(_g = Detailed.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: '{\n  args: {\n    detailedMessage: "Detailed message"\n  }\n}',
      ...(_i = (_h = Detailed.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
Pointer.parameters = {
  ...Pointer.parameters,
  docs: {
    ...(_j = Pointer.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: "{\n  args: {\n    messageType: OutputMessageType.Pointer\n  }\n}",
      ...(_l = (_k = Pointer.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
Alert.parameters = {
  ...Alert.parameters,
  docs: {
    ...(_m = Alert.parameters) == null ? void 0 : _m.docs,
    source: {
      originalSource: "{\n  args: {\n    messageType: OutputMessageType.Alert\n  }\n}",
      ...(_o = (_n = Alert.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
    }
  }
};
Sticky.parameters = {
  ...Sticky.parameters,
  docs: {
    ...(_p = Sticky.parameters) == null ? void 0 : _p.docs,
    source: {
      originalSource: "{\n  args: {\n    messageType: OutputMessageType.Sticky\n  }\n}",
      ...(_r = (_q = Sticky.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
    }
  }
};
const __namedExportsOrder = ["Basic", "Error", "Detailed", "Pointer", "Alert", "Sticky"];
export {
  Alert,
  Basic,
  Detailed,
  Error,
  Pointer,
  Sticky,
  __namedExportsOrder,
  meta as default
};
