import { r as reactExports, B as Box, c as classnames } from "./iframe-DNdoMX4Q.js";
import { bg as MessageRenderer, R as Text, M as MessageManager, G as useTranslation, O as OutputMessagePriority, bh as StatusBarPopover, bi as TitleBar, i as Icon, z as SvgInfo, b1 as SvgStatusWarning, b3 as SvgStatusError, b2 as SvgStatusSuccess } from "./appui-react-glMK-yaN.js";
import { B as Button } from "./Key.enum-YmMvjtrc.js";
import { T as Tabs } from "./Tabs-DzJew55v.js";
const NotificationMarker = reactExports.forwardRef((props, ref) => {
  let {
    className,
    children,
    status = "primary",
    pulsing = false,
    enabled = true,
    ...rest
  } = props;
  return reactExports.createElement(
    Box,
    {
      as: "span",
      ref,
      className: classnames(
        {
          "iui-notification-marker": enabled
        },
        className
      ),
      "data-iui-variant": enabled ? status : null,
      "data-iui-urgent": enabled ? pulsing : null,
      ...rest
    },
    children
  );
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
    { className: "uifw-statusFields-messageCenter-messageCenterMessage", style },
    icon,
    message && reactExports.createElement(
      "span",
      { className: "uifw-content" },
      reactExports.createElement(MessageRenderer, { message, className, useSpan: true }),
      details && reactExports.createElement(
        Text,
        { variant: "small" },
        reactExports.createElement(MessageRenderer, { message: details })
      )
    )
  );
}
const tabs = ["all", "errors"];
function MessageCenterField(props) {
  const [messages, setMessages] = reactExports.useState(MessageManager.messages);
  const [notify, setNotify] = reactExports.useState(false);
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [status, setStatus] = reactExports.useState("primary");
  const { translate } = useTranslation();
  const indicatorRef = reactExports.useRef(null);
  const handleOpenChange = (isOpenState) => {
    setNotify(false);
    setIsOpen(isOpenState);
  };
  const isErrorMessage = (message) => {
    return message.priority === OutputMessagePriority.Error || message.priority === OutputMessagePriority.Fatal;
  };
  reactExports.useEffect(() => {
    return MessageManager.onOpenMessageCenterEvent.addListener(() => {
      handleOpenChange(true);
    });
  }, []);
  reactExports.useEffect(() => {
    MessageManager.registerAnimateOutToElement(indicatorRef.current);
    return MessageManager.onMessagesUpdatedEvent.addListener(() => {
      const newMessages = MessageManager.messages;
      newMessages.length > 0 ? setNotify(true) : setNotify(false);
      setMessages(newMessages);
      const lastMessage = newMessages[newMessages.length - 1];
      if (!lastMessage)
        return;
      switch (lastMessage.priority) {
        case OutputMessagePriority.Success:
          setStatus("positive");
          break;
        case OutputMessagePriority.Warning:
          setStatus("warning");
          break;
        case OutputMessagePriority.Error:
        case OutputMessagePriority.Fatal:
          setStatus("negative");
          break;
        default:
          setStatus("primary");
      }
    });
  }, []);
  return reactExports.createElement(
    StatusBarPopover,
    { visible: isOpen, onVisibleChange: (visible) => handleOpenChange(visible), className: "uifw-statusFields-messageCenter-messageCenterField_popover", content: reactExports.createElement(
      reactExports.Fragment,
      null,
      reactExports.createElement(TitleBar, { title: translate("messageCenter.messages") }),
      reactExports.createElement(
        Tabs.Wrapper,
        { type: "pill" },
        reactExports.createElement(Tabs.TabList, null, tabs.map((tab) => reactExports.createElement(Tabs.Tab, { label: translate(`messageCenter.${tab}`), key: tab, value: tab }))),
        tabs.map((tab) => {
          let tabMessages = [...messages].reverse();
          tabMessages = tab === "errors" ? tabMessages.filter(isErrorMessage) : tabMessages;
          return reactExports.createElement(Tabs.Panel, { value: tab, key: tab, className: "uifw-statusFields-messageCenter-messageCenterField_panel" }, tabMessages.length === 0 ? reactExports.createElement("span", { className: "uifw-message-prompt" }, translate("messageCenter.prompt")) : tabMessages.map((message, index) => {
            return reactExports.createElement(MessageCenterMessage, { key: index, message: message.briefMessage, details: message.detailedMessage, icon: reactExports.createElement(MessageIcon, { priority: message.priority }) });
          }));
        })
      )
    ) },
    reactExports.createElement(
      Button,
      { ref: indicatorRef, styleType: "borderless", startIcon: reactExports.createElement(
        NotificationMarker,
        { status, enabled: notify },
        reactExports.createElement(SvgChat, null)
      ), className: props.className, style: props.style },
      translate("messageCenter.messages"),
      reactExports.createElement(StatusBarPopover.ExpandIndicator, null)
    )
  );
}
function MessageIcon({ priority }) {
  switch (priority) {
    case OutputMessagePriority.Error:
    case OutputMessagePriority.Fatal:
      return reactExports.createElement(
        Icon,
        { fill: "negative" },
        reactExports.createElement(SvgStatusError, null)
      );
    case OutputMessagePriority.Warning:
      return reactExports.createElement(
        Icon,
        { fill: "warning" },
        reactExports.createElement(SvgStatusWarning, null)
      );
    case OutputMessagePriority.Info:
      return reactExports.createElement(
        Icon,
        { fill: "informational" },
        reactExports.createElement(SvgInfo, null)
      );
  }
  return reactExports.createElement(
    Icon,
    { fill: "positive" },
    reactExports.createElement(SvgStatusSuccess, null)
  );
}
export {
  MessageCenterField as M
};
