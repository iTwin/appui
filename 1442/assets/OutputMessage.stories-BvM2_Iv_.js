import { j as jsxRuntimeExports, e } from "./iframe-BIXwoC80.js";
import { U as UiFramework, N as NotifyMessageDetails, I as IModelApp, O as OutputMessagePriority, a1 as OutputMessageType } from "./appui-react-CNLcJNb9.js";
import { R as RelativePosition } from "./Key.enum-B-WhjwuV.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-DrM_MNQm.js";
import { e as enumArgType } from "./Utils-CICO5XQv.js";
import "./client-dvjUKoP6.js";
import "./blocks-DA_2Rxbk.js";
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
    ...Basic.parameters?.docs,
    source: {
      originalSource: "{}",
      ...Basic.parameters?.docs?.source
    }
  }
};
Error.parameters = {
  ...Error.parameters,
  docs: {
    ...Error.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    messagePriority: OutputMessagePriority.Error\n  }\n}",
      ...Error.parameters?.docs?.source
    }
  }
};
Detailed.parameters = {
  ...Detailed.parameters,
  docs: {
    ...Detailed.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    detailedMessage: "Detailed message"\n  }\n}',
      ...Detailed.parameters?.docs?.source
    }
  }
};
Pointer.parameters = {
  ...Pointer.parameters,
  docs: {
    ...Pointer.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    messageType: OutputMessageType.Pointer\n  }\n}",
      ...Pointer.parameters?.docs?.source
    }
  }
};
Alert.parameters = {
  ...Alert.parameters,
  docs: {
    ...Alert.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    messageType: OutputMessageType.Alert\n  }\n}",
      ...Alert.parameters?.docs?.source
    }
  }
};
DetailedAlert.parameters = {
  ...DetailedAlert.parameters,
  docs: {
    ...DetailedAlert.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    messageType: OutputMessageType.Alert,\n    messagePriority: OutputMessagePriority.Error,\n    detailedMessage: "Detailed message that provides additional information to describe the reason for the alert"\n  }\n}',
      ...DetailedAlert.parameters?.docs?.source
    }
  }
};
Sticky.parameters = {
  ...Sticky.parameters,
  docs: {
    ...Sticky.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    messageType: OutputMessageType.Sticky\n  }\n}",
      ...Sticky.parameters?.docs?.source
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
