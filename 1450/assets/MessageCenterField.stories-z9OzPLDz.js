import { j as jsxRuntimeExports, r as reactExports } from "./iframe-qZqPc1fv.js";
import { I as InitializerDecorator, A as AppUiDecorator } from "./Decorators-Dm6oIbea.js";
import { M as MessageManager, O as OutputMessagePriority, D as DropdownButton, b as MenuItem, N as NotifyMessageDetails } from "./appui-react-CLN8J6gc.js";
import "./Key.enum-bWQ0azWJ.js";
import { a as createMessageDecorator } from "./Utils-BlPrrr_h.js";
import { M as MessageCenterField } from "./MessageCenterField-DRbQ0-UZ.js";
import "./client-BmWydt1w.js";
import "./Tabs-CcHvM7wr.js";
import "./NotificationMarker-hkqr1pBV.js";
const AlignComponent = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBlock: "2em",
    gap: "10"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) });
};
const meta = {
  title: "Components/Status fields/MessageCenterField",
  component: MessageCenterField,
  tags: ["autodocs"],
  decorators: [AlignComponent, InitializerDecorator, AppUiDecorator],
  args: {
    style: {
      marginTop: 350
    }
  }
};
const NoMessages = (Story) => {
  reactExports.useEffect(() => {
    MessageManager.clearMessages();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {});
};
const Empty = {
  decorators: [NoMessages]
};
const Success = {
  decorators: [createMessageDecorator({
    priority: OutputMessagePriority.Success
  })]
};
const Info = {
  decorators: [createMessageDecorator({
    priority: OutputMessagePriority.Info
  })]
};
const Warning = {
  decorators: [createMessageDecorator({
    priority: OutputMessagePriority.Warning
  })]
};
const Error = {
  decorators: [createMessageDecorator({
    priority: OutputMessagePriority.Error
  })]
};
const Detailed = {
  decorators: [createMessageDecorator({
    priority: OutputMessagePriority.Success,
    briefMessage: "Brief message",
    detailedMessage: "Detailed message"
  })]
};
const DynamicDecorator = (Story) => {
  const idRef = reactExports.useRef(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownButton, { menuItems: () => [/* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { onClick: () => {
      MessageManager.addToMessageCenter(new NotifyMessageDetails(OutputMessagePriority.Info, `Info Message ${++idRef.current}`));
    }, children: "Info" }), /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { onClick: () => {
      MessageManager.addToMessageCenter(new NotifyMessageDetails(OutputMessagePriority.Error, `Error Message ${++idRef.current}`));
    }, children: "Error" }), /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { onClick: () => {
      MessageManager.addToMessageCenter(new NotifyMessageDetails(1, `Detailed message ${++idRef.current}`, "Additional message details"));
    }, children: "Detailed" }), /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { onClick: () => {
      MessageManager.clearMessages();
    }, children: "Clear" })], styleType: "borderless", style: {
      alignSelf: "flex-end"
    }, children: "Add Messages" })
  ] });
};
const Dynamic = {
  decorators: [NoMessages, DynamicDecorator]
};
Empty.parameters = {
  ...Empty.parameters,
  docs: {
    ...Empty.parameters?.docs,
    source: {
      originalSource: "{\n  decorators: [NoMessages]\n}",
      ...Empty.parameters?.docs?.source
    }
  }
};
Success.parameters = {
  ...Success.parameters,
  docs: {
    ...Success.parameters?.docs,
    source: {
      originalSource: "{\n  decorators: [createMessageDecorator({\n    priority: OutputMessagePriority.Success\n  })]\n}",
      ...Success.parameters?.docs?.source
    }
  }
};
Info.parameters = {
  ...Info.parameters,
  docs: {
    ...Info.parameters?.docs,
    source: {
      originalSource: "{\n  decorators: [createMessageDecorator({\n    priority: OutputMessagePriority.Info\n  })]\n}",
      ...Info.parameters?.docs?.source
    }
  }
};
Warning.parameters = {
  ...Warning.parameters,
  docs: {
    ...Warning.parameters?.docs,
    source: {
      originalSource: "{\n  decorators: [createMessageDecorator({\n    priority: OutputMessagePriority.Warning\n  })]\n}",
      ...Warning.parameters?.docs?.source
    }
  }
};
Error.parameters = {
  ...Error.parameters,
  docs: {
    ...Error.parameters?.docs,
    source: {
      originalSource: "{\n  decorators: [createMessageDecorator({\n    priority: OutputMessagePriority.Error\n  })]\n}",
      ...Error.parameters?.docs?.source
    }
  }
};
Detailed.parameters = {
  ...Detailed.parameters,
  docs: {
    ...Detailed.parameters?.docs,
    source: {
      originalSource: '{\n  decorators: [createMessageDecorator({\n    priority: OutputMessagePriority.Success,\n    briefMessage: "Brief message",\n    detailedMessage: "Detailed message"\n  })]\n}',
      ...Detailed.parameters?.docs?.source
    }
  }
};
Dynamic.parameters = {
  ...Dynamic.parameters,
  docs: {
    ...Dynamic.parameters?.docs,
    source: {
      originalSource: "{\n  decorators: [NoMessages, DynamicDecorator]\n}",
      ...Dynamic.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Empty", "Success", "Info", "Warning", "Error", "Detailed", "Dynamic"];
export {
  Detailed,
  Dynamic,
  Empty,
  Error,
  Info,
  Success,
  Warning,
  __namedExportsOrder,
  meta as default
};
