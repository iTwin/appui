var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
import { j as jsxRuntimeExports, e } from "./iframe-6wCQlzbQ.js";
import { U as UiFramework, N as NotifyMessageDetails, I as IModelApp, O as OutputMessagePriority, a1 as OutputMessageType } from "./appui-react-J8mIGY7J.js";
import { R as RelativePosition } from "./Key.enum-BlhmG3rp.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-BAOH6QaT.js";
import { e as enumArgType } from "./Utils--AFg1FSw.js";
import "./client-BEc9SNOE.js";
import "./blocks-D5BbEkRZ.js";
function NotificationsStory({
  messagePriority,
  briefMessage,
  detailedMessage,
  messageType,
  messageAlert,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      layout: "fullscreen",
      onFrontstageActivated: () => {
        UiFramework.dialogs.modal.close();
        UiFramework.dialogs.modeless.close();
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
  e.useEffect(() => {
    const listener = (e2) => {
      IModelApp.notifications.updatePointerMessage(
        {
          x: e2.clientX + 10,
          y: e2.clientY - 10
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
NotificationsStory.__docgenInfo = { "description": "[AppNotificationManager.outputMessage](https://www.itwinjs.org/reference/appui-react/notification/appnotificationmanager/) can be used to display notifications.", "methods": [], "displayName": "NotificationsStory", "props": { "messagePriority": { "required": true, "tsType": { "name": "OutputMessagePriority" }, "description": "" }, "briefMessage": { "required": true, "tsType": { "name": "union", "raw": "string | HTMLElement", "elements": [{ "name": "string" }, { "name": "HTMLElement" }] }, "description": "" }, "detailedMessage": { "required": false, "tsType": { "name": "union", "raw": "string | HTMLElement", "elements": [{ "name": "string" }, { "name": "HTMLElement" }] }, "description": "" }, "messageType": { "required": false, "tsType": { "name": "OutputMessageType" }, "description": "" }, "messageAlert": { "required": false, "tsType": { "name": "OutputMessageAlert" }, "description": "" } } };
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
  },
  argTypes: {
    messageType: enumArgType(OutputMessageType),
    messagePriority: enumArgType(OutputMessagePriority)
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
const DetailedAlert = {
  args: {
    messageType: OutputMessageType.Alert,
    messagePriority: OutputMessagePriority.Error,
    detailedMessage: "Detailed message that provides additional information to describe the reason for the alert"
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
DetailedAlert.parameters = {
  ...DetailedAlert.parameters,
  docs: {
    ...(_p = DetailedAlert.parameters) == null ? void 0 : _p.docs,
    source: {
      originalSource: '{\n  args: {\n    messageType: OutputMessageType.Alert,\n    messagePriority: OutputMessagePriority.Error,\n    detailedMessage: "Detailed message that provides additional information to describe the reason for the alert"\n  }\n}',
      ...(_r = (_q = DetailedAlert.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
    }
  }
};
Sticky.parameters = {
  ...Sticky.parameters,
  docs: {
    ...(_s = Sticky.parameters) == null ? void 0 : _s.docs,
    source: {
      originalSource: "{\n  args: {\n    messageType: OutputMessageType.Sticky\n  }\n}",
      ...(_u = (_t = Sticky.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
    }
  }
};
const __namedExportsOrder = ["Basic", "Error", "Detailed", "Pointer", "Alert", "DetailedAlert", "Sticky"];
export {
  Alert,
  Basic,
  Detailed,
  DetailedAlert,
  Error,
  Pointer,
  Sticky,
  __namedExportsOrder,
  meta as default
};
