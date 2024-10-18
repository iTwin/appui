var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { R as React } from "./index-DDLqOySG.js";
import { j as Icon, S as SvgPlaceholder, p as placeholderSvg, k as ConditionalIconItem, u as useConditionalProp } from "./appui-react-DGYRwXUL.js";
import { I as ImageRenderer } from "./ImageRenderer-CyVJl9Mu.js";
import { A as AppUiDecorator, I as InitializerDecorator } from "./Decorators-BpxewssG.js";
import { c as createBumpEvent } from "./createBumpEvent-arFyZIMh.js";
import "./Dialog-NGxTPZW5.js";
import "./iframe-BaKlUN2f.js";
import "../sb-preview/runtime.js";
import "./index-BwI9SQDf.js";
import "./inheritsLoose-HEqISCW8.js";
import "./_commonjs-dynamic-modules-DTCOR0lh.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
const meta = {
  title: "Deprecated/Icon",
  component: Icon,
  tags: ["autodocs"],
  decorators: [AppUiDecorator, InitializerDecorator]
};
const {
  getVal,
  bump,
  eventId
} = createBumpEvent();
const ToggleConditionals = (Story) => {
  React.useEffect(() => {
    const id = setInterval(() => {
      bump();
    }, 2e3);
    return () => {
      clearInterval(id);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {});
};
const CSSIcon = {
  args: {
    iconSpec: "icon-placeholder"
  }
};
const ReactNode = {
  args: {
    iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {})
  }
};
const SVGPath = {
  args: {
    iconSpec: placeholderSvg
  }
};
const DataURI = {
  render: () => {
    const renderer = new ImageRenderer();
    const img = renderer.render({
      sourceType: "svg",
      value: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M13,13H9V10h4ZM16,3V15a1,1,0,0,1-1,1H1a1,1,0,0,1-1-1V3A1,1,0,0,1,1,2H3V0H4V2h8V0h1V2h2A1,1,0,0,1,16,3ZM15,6H1v9H15Z" />
          </svg>`
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: img });
  }
};
function ConditionalIcon({
  iconSpec,
  ...props
}) {
  const icon = useConditionalProp(iconSpec);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: icon, ...props });
}
const ConditionalCSSIcon = {
  args: {
    iconSpec: new ConditionalIconItem(() => getVal() % 2 === 0 ? "icon-app-1" : "icon-app-2", [eventId])
  },
  render: (args) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ConditionalIcon, { ...args });
  },
  decorators: [ToggleConditionals]
};
CSSIcon.parameters = {
  ...CSSIcon.parameters,
  docs: {
    ...(_a = CSSIcon.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    iconSpec: "icon-placeholder"\n  }\n}',
      ...(_c = (_b = CSSIcon.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
ReactNode.parameters = {
  ...ReactNode.parameters,
  docs: {
    ...(_d = ReactNode.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  args: {\n    iconSpec: <SvgPlaceholder />\n  }\n}",
      ...(_f = (_e = ReactNode.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
SVGPath.parameters = {
  ...SVGPath.parameters,
  docs: {
    ...(_g = SVGPath.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: "{\n  args: {\n    iconSpec: placeholderSvg\n  }\n}",
      ...(_i = (_h = SVGPath.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
DataURI.parameters = {
  ...DataURI.parameters,
  docs: {
    ...(_j = DataURI.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: '{\n  render: () => {\n    const renderer = new ImageRenderer();\n    const img = renderer.render({\n      sourceType: "svg",\n      value: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">\n            <path d="M13,13H9V10h4ZM16,3V15a1,1,0,0,1-1,1H1a1,1,0,0,1-1-1V3A1,1,0,0,1,1,2H3V0H4V2h8V0h1V2h2A1,1,0,0,1,16,3ZM15,6H1v9H15Z" />\n          </svg>`\n    });\n    return <>{img}</>;\n  }\n}',
      ...(_l = (_k = DataURI.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
ConditionalCSSIcon.parameters = {
  ...ConditionalCSSIcon.parameters,
  docs: {
    ...(_m = ConditionalCSSIcon.parameters) == null ? void 0 : _m.docs,
    source: {
      originalSource: '{\n  args: {\n    iconSpec: new ConditionalIconItem(() => getVal() % 2 === 0 ? "icon-app-1" : "icon-app-2", [eventId])\n  },\n  render: args => {\n    return <ConditionalIcon {...args} />;\n  },\n  decorators: [ToggleConditionals]\n}',
      ...(_o = (_n = ConditionalCSSIcon.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
    }
  }
};
const __namedExportsOrder = ["CSSIcon", "ReactNode", "SVGPath", "DataURI", "ConditionalCSSIcon"];
export {
  CSSIcon,
  ConditionalCSSIcon,
  DataURI,
  ReactNode,
  SVGPath,
  __namedExportsOrder,
  meta as default
};
