var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
import { j as jsxRuntimeExports } from "./jsx-runtime-_iMjpMZ4.js";
import { I as InitializerDecorator, A as AppUiDecorator } from "./Decorators-B2adf99T.js";
import { ax as Box, ay as cx, a2 as Icon, az as MessageRenderer, Y as Text, aA as MessageManager, U as UiFramework, aB as Tabs, M as Popover, aC as TitleBar, B as Button, aD as Icon$1, aE as OutputMessagePriority, aF as NotifyMessageDetails } from "./DefaultToolSettingsProvider-BMCl5D3j.js";
import { r as reactExports } from "./index-DlkhCVTf.js";
import "./index-Cm_5MPU1.js";
import "./getPrototypeOf-BmmMfuHC.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./iframe-BGUnDEVO.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
const NotificationMarker = reactExports.forwardRef((props, ref) => {
  const { className, children, status = "primary", pulsing = false, enabled = true, ...rest } = props;
  return reactExports.createElement(Box, { as: "span", ref, className: cx({ "iui-notification-marker": enabled }, className), "data-iui-variant": enabled ? status : null, "data-iui-urgent": enabled ? pulsing : null, ...rest }, children);
});
const SvgChat = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M5 7.1a.945.945 0 011 1c0 .6-.4.9-1 .9a.945.945 0 01-1-1c0-.6.4-.9 1-.9m3 0a.945.945 0 011 1c0 .6-.4.9-1 .9a.945.945 0 01-1-1c0-.6.4-.9 1-.9m3 0a.945.945 0 011 1 .945.945 0 01-1 1 .945.945 0 01-1-1 .945.945 0 011-1M8 1.6a6.496 6.496 0 016.5 6.2v.3A6.487 6.487 0 018 14.6a6.71 6.71 0 01-2.8-.6l-.6-.3a4.618 4.618 0 01-1.7.6 4.221 4.221 0 00.5-1.6l-.5-.7a6.372 6.372 0 011-9A6.773 6.773 0 018 1.6M8 .1a8.024 8.024 0 00-8 8 7.681 7.681 0 001.8 5 6.5 6.5 0 01-1.1 2.2.442.442 0 00.3.7 6.615 6.615 0 003.5-.8A8.525 8.525 0 008 16a8.024 8.024 0 008-8A7.938 7.938 0 008 .1z" })
  );
};
function MessageCenterMessage(props) {
  const { icon, message, details, style, className } = props;
  return reactExports.createElement(
    "div",
    { className: "uifw-footer-messageCenter-message", style },
    icon && reactExports.createElement(Icon, { size: "small" }, icon),
    message && reactExports.createElement(
      reactExports.Fragment,
      null,
      reactExports.createElement(MessageRenderer, { message, className, useSpan: true }),
      details && reactExports.createElement(
        Text,
        { variant: "small", className: "uifw-content" },
        reactExports.createElement(MessageRenderer, { message: details })
      )
    )
  );
}
function MessageCenterField() {
  const [messages, setMessages] = reactExports.useState(MessageManager.messages);
  const [notify, setNotify] = reactExports.useState(false);
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [NotificationMarkerStatus, setStatus] = reactExports.useState("primary");
  const indicatorRef = reactExports.createRef();
  const title = UiFramework.translate("messageCenter.messages");
  const handleOpenChange = (isOpenState) => {
    setNotify(false);
    setIsOpen(isOpenState);
  };
  const isProblemStatus = (message) => {
    return message.priority === OutputMessagePriority.Error || message.priority === OutputMessagePriority.Fatal;
  };
  const determineStatus = () => messages.some((message) => isProblemStatus(message)) ? setStatus("negative") : setStatus("primary");
  reactExports.useEffect(() => {
    MessageManager.registerAnimateOutToElement(indicatorRef.current);
    return MessageManager.onMessagesUpdatedEvent.addListener(() => {
      messages.length > 0 ? setNotify(true) : setNotify(false);
      setMessages(MessageManager.messages);
      determineStatus();
    });
  });
  const getMessages = (tab) => {
    return [...messages].reverse().map((message, index) => {
      if (messages.length > 0) {
        const iconClassName = MessageManager.getIconClassName(message);
        const iconSpec = MessageManager.getIconSpecFromDetails(message);
        const text = message.briefMessage;
        if (tab === "error" && isProblemStatus(message) || tab === "all") {
          return reactExports.createElement(MessageCenterMessage, { key: index.toString(), message: text, details: message.detailedMessage, icon: reactExports.createElement(Icon$1, { iconSpec, className: iconClassName }) });
        }
        return reactExports.createElement(reactExports.Fragment, null);
      } else {
        return reactExports.createElement("span", { className: "uifw-message-prompt", key: `${index.toString()}` }, "No Messages.");
      }
    });
  };
  const tabs = reactExports.createElement(reactExports.Fragment, null, ["all", "error"].map((tabType) => {
    return reactExports.createElement(
      Tabs.Panel,
      { value: tabType, key: tabType },
      reactExports.createElement("div", { className: ".uifw-statusFields-messageCenter-messageCenterField" }, getMessages(tabType))
    );
  }));
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(
      Popover,
      { style: { width: "305px" }, content: reactExports.createElement(
        reactExports.Fragment,
        null,
        reactExports.createElement(TitleBar, { title }),
        reactExports.createElement(
          Tabs.Wrapper,
          { type: "pill" },
          reactExports.createElement(
            Tabs.TabList,
            null,
            reactExports.createElement(Tabs.Tab, { label: "All", key: "all", value: "all" }),
            reactExports.createElement(Tabs.Tab, { label: "Error", key: "error", value: "error" })
          ),
          tabs
        )
      ), applyBackground: true },
      reactExports.createElement(Button, { onClick: () => handleOpenChange(!isOpen), ref: indicatorRef, styleType: "borderless", labelProps: reactExports.createElement(
        "span",
        null,
        "`$",
        messages.length,
        " $",
        title,
        "`"
      ), startIcon: reactExports.createElement(
        NotificationMarker,
        { status: NotificationMarkerStatus, enabled: notify },
        reactExports.createElement(SvgChat, null)
      ) }, title)
    )
  );
}
const AlignComponent = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    style: {
      height: "100%",
      display: "flex",
      justifyContent: "center",
      paddingBlock: "2em",
      gap: "10"
    },
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {})
  });
};
const meta = {
  title: "Components/MessageCenterField",
  component: MessageCenterField,
  tags: ["autodocs"],
  decorators: [AlignComponent, InitializerDecorator, AppUiDecorator],
  args: {
    style: {
      marginTop: 150
    }
  }
};
const Empty = {};
const NotificationDecorator = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}), /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
      styleType: "borderless",
      onClick: () => {
        MessageManager.clearMessages();
        MessageManager.addToMessageCenter(new NotifyMessageDetails(OutputMessagePriority.Info, "info"));
      },
      children: "Info"
    })]
  });
};
const Notification = {
  decorators: NotificationDecorator
};
const ErrorDecorator = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}), /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
      styleType: "borderless",
      onClick: () => {
        MessageManager.clearMessages();
        MessageManager.addToMessageCenter(new NotifyMessageDetails(OutputMessagePriority.Error, "error"));
      },
      children: "Error"
    })]
  });
};
const Error = {
  decorators: ErrorDecorator
};
const DetailedDecorator = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}), /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
      styleType: "borderless",
      onClick: () => {
        MessageManager.clearMessages();
        MessageManager.addToMessageCenter(new NotifyMessageDetails(1, "This is the brief message", "This is the detailed message", OutputMessagePriority.Success));
      },
      children: "Detailed Message"
    })]
  });
};
const Detailed = {
  decorators: DetailedDecorator
};
Empty.parameters = {
  ...Empty.parameters,
  docs: {
    ...(_a = Empty.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
      ...(_c = (_b = Empty.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
Notification.parameters = {
  ...Notification.parameters,
  docs: {
    ...(_d = Notification.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  decorators: NotificationDecorator\n}",
      ...(_f = (_e = Notification.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
Error.parameters = {
  ...Error.parameters,
  docs: {
    ...(_g = Error.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: "{\n  decorators: ErrorDecorator\n}",
      ...(_i = (_h = Error.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
Detailed.parameters = {
  ...Detailed.parameters,
  docs: {
    ...(_j = Detailed.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: "{\n  decorators: DetailedDecorator\n}",
      ...(_l = (_k = Detailed.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
const __namedExportsOrder = ["Empty", "Notification", "Error", "Detailed"];
export {
  Detailed,
  Empty,
  Error,
  Notification,
  __namedExportsOrder,
  meta as default
};
