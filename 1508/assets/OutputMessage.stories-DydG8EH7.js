import { j as jsxRuntimeExports, R as React } from "./iframe-BnF7kxuI.js";
import { U as UiFramework, N as NotifyMessageDetails, j as IModelApp, O as OutputMessagePriority, Z as OutputMessageType } from "./appui-react-B7iNJbV5.js";
import { R as RelativePosition } from "./Key.enum-B3pThNWo.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-C8_Xb5kX.js";
import { e as enumArgType } from "./Utils-IR3EMk7M.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-DYbOg5lC.js";
import "./index-CptIXb7J.js";
import "./blocks-BPELq9PS.js";
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
