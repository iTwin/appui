import { j as jsxRuntimeExports, r as reactExports } from "./iframe-B5XhNadd.js";
import { I as InitializerDecorator, A as AppUiDecorator } from "./Decorators-BYkUmcDF.js";
import { M as MessageManager, O as OutputMessagePriority, N as NotifyMessageDetails, D as DropdownButton, a as MenuItem } from "./appui-react-CwKstaKu.js";
import "./Key.enum-szt-ThaG.js";
import { M as MessageCenterField } from "./MessageCenterField-Bf7zrLgF.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-H2bURNxP.js";
import "./index-B5vH9_xk.js";
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
function createDecorator({
  priority,
  briefMessage = "Message",
  detailedMessage
}) {
  return (Story) => {
    reactExports.useEffect(() => {
      MessageManager.clearMessages();
      Array.from({
        length: 4
      }).forEach((_, index) => {
        const id = index + 1;
        briefMessage = briefMessage ?? "Message";
        MessageManager.addToMessageCenter(new NotifyMessageDetails(priority, `${briefMessage} ${id}`, detailedMessage ? `${detailedMessage} ${id}` : void 0));
      });
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {});
  };
}
const Success = {
  decorators: [createDecorator({
    priority: OutputMessagePriority.Success
  })]
};
const Info = {
  decorators: [createDecorator({
    priority: OutputMessagePriority.Info
  })]
};
const Warning = {
  decorators: [createDecorator({
    priority: OutputMessagePriority.Warning
  })]
};
const Error = {
  decorators: [createDecorator({
    priority: OutputMessagePriority.Error
  })]
};
const Detailed = {
  decorators: [createDecorator({
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
      originalSource: "{\n  decorators: [createDecorator({\n    priority: OutputMessagePriority.Success\n  })]\n}",
      ...Success.parameters?.docs?.source
    }
  }
};
Info.parameters = {
  ...Info.parameters,
  docs: {
    ...Info.parameters?.docs,
    source: {
      originalSource: "{\n  decorators: [createDecorator({\n    priority: OutputMessagePriority.Info\n  })]\n}",
      ...Info.parameters?.docs?.source
    }
  }
};
Warning.parameters = {
  ...Warning.parameters,
  docs: {
    ...Warning.parameters?.docs,
    source: {
      originalSource: "{\n  decorators: [createDecorator({\n    priority: OutputMessagePriority.Warning\n  })]\n}",
      ...Warning.parameters?.docs?.source
    }
  }
};
Error.parameters = {
  ...Error.parameters,
  docs: {
    ...Error.parameters?.docs,
    source: {
      originalSource: "{\n  decorators: [createDecorator({\n    priority: OutputMessagePriority.Error\n  })]\n}",
      ...Error.parameters?.docs?.source
    }
  }
};
Detailed.parameters = {
  ...Detailed.parameters,
  docs: {
    ...Detailed.parameters?.docs,
    source: {
      originalSource: '{\n  decorators: [createDecorator({\n    priority: OutputMessagePriority.Success,\n    briefMessage: "Brief message",\n    detailedMessage: "Detailed message"\n  })]\n}',
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
