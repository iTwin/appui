var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import { I as InitializerDecorator, A as AppUiDecorator } from "./Decorators-CXFrraVc.js";
import { M as MessageManager, N as NotifyMessageDetails, O as OutputMessagePriority, D as DropdownButton, a as MenuItem } from "./DefaultToolSettingsProvider-BeaL6ll4.js";
import "./Key.enum-Nky5yUvk.js";
import "./index-EDRsojbr.js";
import { M as MessageCenterField } from "./MessageCenterField-B98eYzr7.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./iframe-vMT8xG5O.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
const AlignComponent = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    style: {
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
const NoMessages = (Story) => {
  reactExports.useEffect(() => {
    MessageManager.clearMessages();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {});
};
const Empty = {
  decorators: [NoMessages]
};
const InfoMessages = (Story) => {
  reactExports.useEffect(() => {
    MessageManager.clearMessages();
    ["1", "2", "3", "4"].forEach((num) => {
      MessageManager.addToMessageCenter(new NotifyMessageDetails(OutputMessagePriority.Info, `Message ${num}`));
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {});
};
const Info = {
  decorators: [InfoMessages]
};
const ErrorMessages = (Story) => {
  reactExports.useEffect(() => {
    MessageManager.clearMessages();
    ["1", "2", "3", "4"].forEach((num) => {
      MessageManager.addToMessageCenter(new NotifyMessageDetails(OutputMessagePriority.Error, `Error ${num}`));
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {});
};
const Error = {
  decorators: [ErrorMessages]
};
const DetailedMessages = (Story) => {
  reactExports.useEffect(() => {
    MessageManager.clearMessages();
    [1, 2, 3, 4].forEach(() => {
      MessageManager.addToMessageCenter(new NotifyMessageDetails(1, "This is the brief message", "This is the detailed message"));
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {});
};
const Detailed = {
  decorators: [DetailedMessages]
};
const DynamicDecorator = (Story) => {
  const idRef = reactExports.useRef(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}), /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownButton, {
      menuItems: () => [/* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, {
        onClick: () => {
          MessageManager.addToMessageCenter(new NotifyMessageDetails(OutputMessagePriority.Info, `Info Message ${++idRef.current}`));
        },
        children: "Info"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, {
        onClick: () => {
          MessageManager.addToMessageCenter(new NotifyMessageDetails(OutputMessagePriority.Error, `Error Message ${++idRef.current}`));
        },
        children: "Error"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, {
        onClick: () => {
          MessageManager.addToMessageCenter(new NotifyMessageDetails(1, `Detailed message ${++idRef.current}`, "Additional message details"));
        },
        children: "Detailed"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, {
        onClick: () => {
          MessageManager.clearMessages();
        },
        children: "Clear"
      })],
      styleType: "borderless",
      style: {
        alignSelf: "flex-end"
      },
      children: "Add Messages"
    })]
  });
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
Info.parameters = {
  ...Info.parameters,
  docs: {
    ...(_d = Info.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  decorators: [InfoMessages]\n}",
      ...(_f = (_e = Info.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
Error.parameters = {
  ...Error.parameters,
  docs: {
    ...(_g = Error.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: "{\n  decorators: [ErrorMessages]\n}",
      ...(_i = (_h = Error.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
Detailed.parameters = {
  ...Detailed.parameters,
  docs: {
    ...(_j = Detailed.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: "{\n  decorators: [DetailedMessages]\n}",
      ...(_l = (_k = Detailed.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
Dynamic.parameters = {
  ...Dynamic.parameters,
  docs: {
    ...(_m = Dynamic.parameters) == null ? void 0 : _m.docs,
    source: {
      originalSource: "{\n  decorators: [NoMessages, DynamicDecorator]\n}",
      ...(_o = (_n = Dynamic.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
    }
  }
};
const __namedExportsOrder = ["Empty", "Info", "Error", "Detailed", "Dynamic"];
export {
  Detailed,
  Dynamic,
  Empty,
  Error,
  Info,
  __namedExportsOrder,
  meta as default
};
