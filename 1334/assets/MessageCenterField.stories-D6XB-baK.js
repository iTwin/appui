var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { r as reactExports } from "./index-DVOlmhHI.js";
import { I as InitializerDecorator, A as AppUiDecorator } from "./Decorators-Dzk7d-J6.js";
import { M as MessageManager, O as OutputMessagePriority, N as NotifyMessageDetails, D as DropdownButton, b as MenuItem } from "./appui-react-BhnF3Zrq.js";
import "./Dialog-DI2PG4iL.js";
import { M as MessageCenterField } from "./MessageCenterField-BPim5W4V.js";
import "./index-CdGyBOBZ.js";
import "./iframe-D__3V3e7.js";
import "./SvgCloseSmall-CRuBXn0_.js";
import "./client-DmvY241V.js";
import "./Tabs-BqvClJuE.js";
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
    ...(_a = Empty.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  decorators: [NoMessages]\n}",
      ...(_c = (_b = Empty.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
Success.parameters = {
  ...Success.parameters,
  docs: {
    ...(_d = Success.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  decorators: [createDecorator({\n    priority: OutputMessagePriority.Success\n  })]\n}",
      ...(_f = (_e = Success.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
Info.parameters = {
  ...Info.parameters,
  docs: {
    ...(_g = Info.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: "{\n  decorators: [createDecorator({\n    priority: OutputMessagePriority.Info\n  })]\n}",
      ...(_i = (_h = Info.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
Warning.parameters = {
  ...Warning.parameters,
  docs: {
    ...(_j = Warning.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: "{\n  decorators: [createDecorator({\n    priority: OutputMessagePriority.Warning\n  })]\n}",
      ...(_l = (_k = Warning.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
Error.parameters = {
  ...Error.parameters,
  docs: {
    ...(_m = Error.parameters) == null ? void 0 : _m.docs,
    source: {
      originalSource: "{\n  decorators: [createDecorator({\n    priority: OutputMessagePriority.Error\n  })]\n}",
      ...(_o = (_n = Error.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
    }
  }
};
Detailed.parameters = {
  ...Detailed.parameters,
  docs: {
    ...(_p = Detailed.parameters) == null ? void 0 : _p.docs,
    source: {
      originalSource: '{\n  decorators: [createDecorator({\n    priority: OutputMessagePriority.Success,\n    briefMessage: "Brief message",\n    detailedMessage: "Detailed message"\n  })]\n}',
      ...(_r = (_q = Detailed.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
    }
  }
};
Dynamic.parameters = {
  ...Dynamic.parameters,
  docs: {
    ...(_s = Dynamic.parameters) == null ? void 0 : _s.docs,
    source: {
      originalSource: "{\n  decorators: [NoMessages, DynamicDecorator]\n}",
      ...(_u = (_t = Dynamic.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
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
