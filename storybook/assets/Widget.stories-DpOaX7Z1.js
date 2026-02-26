import { w as forwardRef, j as jsxRuntimeExports, x as Role, c as classnames, r as reactExports, y as useLatestRef, z as useSafeContext, A as useRootNode, C as getOwnerDocument, D as spriteSheetId, E as parseDOM, H as HtmlSanitizerContext, R as React } from "./iframe-BENp4d1r.js";
import { w as StagePanelState, W as WidgetState, a0 as BadgeType, S as SvgPlaceholder } from "./appui-react-CEufDDhs.js";
import { A as AppUiDecorator } from "./Decorators-DexZH3uj.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-1k4NCfid.js";
import { c as createFrontstage, a as createWidget } from "./Utils-B8gUJSzA.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-CnwI7CFN.js";
import "./client-S7MnCWX8.js";
import "./index-CsG4pdOs.js";
import "./blocks-DFQpQ9rY.js";
const DEFAULT_ICON_HASH = "#icon";
const Icon$1 = forwardRef((props, forwardedRef) => {
  const { href: hrefProp, size, alt, ...rest } = props;
  const isDecorative = !alt;
  const hrefBase = useNormalizedHrefBase(hrefProp);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Role.svg,
    {
      "aria-hidden": isDecorative ? "true" : void 0,
      role: isDecorative ? void 0 : "img",
      "aria-label": isDecorative ? void 0 : alt,
      ...rest,
      "data-_sk-size": size,
      className: classnames("🥝Icon", props.className),
      ref: forwardedRef,
      children: hrefBase ? /* @__PURE__ */ jsxRuntimeExports.jsx("use", { href: toIconHref(hrefBase) }) : null
    }
  );
});
Icon$1.displayName = "Icon";
function toIconHref(hrefBase) {
  if (!hrefBase.includes("#")) return `${hrefBase}${DEFAULT_ICON_HASH}`;
  return hrefBase;
}
function useNormalizedHrefBase(rawHref) {
  const generatedId = reactExports.useId();
  const sanitizeHtml = useLatestRef(useSafeContext(HtmlSanitizerContext));
  const rootNode = useRootNode();
  const inlineHref = reactExports.useRef(void 0);
  const getClientSnapshot = () => {
    const ownerDocument = getOwnerDocument(rootNode);
    if (!rawHref || !ownerDocument) return void 0;
    if (isHttpProtocol(rawHref, ownerDocument)) return rawHref;
    return inlineHref.current;
  };
  const subscribe = reactExports.useCallback(
    (notify) => {
      const ownerDocument = getOwnerDocument(rootNode);
      const spriteSheet = ownerDocument?.getElementById(spriteSheetId);
      if (!rawHref || !ownerDocument || !spriteSheet) return () => {
      };
      if (isHttpProtocol(rawHref, ownerDocument)) return () => {
      };
      const cache = spriteSheet[Symbol.for("🥝")]?.icons;
      if (!cache) return () => {
      };
      const prefix = `🥝${generatedId}`;
      if (cache.has(rawHref)) {
        inlineHref.current = cache.get(rawHref);
        notify();
        return () => {
        };
      }
      const abortController = new AbortController();
      const { signal } = abortController;
      (async () => {
        try {
          const response = await fetch(rawHref, { signal });
          if (!response.ok) throw new Error(`Failed to fetch ${rawHref}`);
          const hash = new URL(rawHref).hash || DEFAULT_ICON_HASH;
          const fetchedSvgString = sanitizeHtml.current(await response.text());
          const parsedSvgContent = parseDOM(fetchedSvgString, {
            ownerDocument
          });
          const symbols = parsedSvgContent.querySelectorAll("symbol");
          for (const symbol of symbols) {
            symbol.id = `${prefix}--${symbol.id}`;
            if (ownerDocument.getElementById(symbol.id)) continue;
            spriteSheet.appendChild(symbol.cloneNode(true));
          }
          inlineHref.current = `#${prefix}--${hash.slice(1)}`;
          cache.set(rawHref, inlineHref.current);
          if (!signal.aborted) notify();
        } catch (error) {
          if (signal.aborted) return;
          console.error(error);
        }
      })();
      return () => abortController.abort();
    },
    [rawHref, rootNode, sanitizeHtml, generatedId]
  );
  return reactExports.useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    () => rawHref
  );
}
function isHttpProtocol(url, ownerDocument) {
  const { protocol } = new URL(url, ownerDocument.baseURI);
  return ["http:", "https:"].includes(protocol);
}
const { action } = __STORYBOOK_MODULE_ACTIONS__;
function StoryWidget({ id }) {
  React.useEffect(() => {
    action(`Widget ${id} mounted`)();
    return () => {
      action(`Widget ${id} unmounted`)();
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    "Widget ",
    id,
    " content "
  ] });
}
function createProvider(widgets) {
  return {
    id: "widgets",
    getWidgets: () => {
      return Array.from({ length: widgets.length }, (_, index) => {
        const widget = widgets[index];
        const id = index + 1;
        return createWidget(id, {
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(StoryWidget, { id: `${id}` }),
          ...widget
        });
      });
    }
  };
}
function WidgetStory(props) {
  const provider = createProvider(props.widgets);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppUiStory,
    {
      frontstages: [
        createFrontstage({
          leftPanelProps: {
            defaultState: StagePanelState.Open,
            pinned: true
          }
        })
      ],
      itemProviders: [provider],
      ...props
    }
  );
}
StoryWidget.__docgenInfo = { "description": "", "methods": [], "displayName": "StoryWidget", "props": { "id": { "required": true, "tsType": { "name": "string" }, "description": "" } } };
WidgetStory.__docgenInfo = { "description": "[Widget](https://www.itwinjs.org/reference/appui-react/widget/widget) interface allows you to configure the widget.", "methods": [], "displayName": "WidgetStory", "props": { "widgets": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "Partial", "elements": [{ "name": "Widget" }], "raw": "Partial<Widget>" }], "raw": "Partial<Widget>[]" }, "description": "" } } };
const placeholderIcon = "" + new URL("placeholder-DKNetxeO.svg", import.meta.url).href;
const meta = {
  title: "Widget/Widget",
  component: WidgetStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    }
  },
  args: {
    widgets: [{}, {}]
  }
};
const Default = {};
const Unloaded = {
  args: {
    widgets: [{
      defaultState: WidgetState.Unloaded
    }, {}]
  }
};
const Floating = {
  args: {
    widgets: [{
      defaultState: WidgetState.Floating
    }, {}]
  }
};
const Badge = {
  args: {
    widgets: [{
      badge: BadgeType.TechnicalPreview
    }, {
      badgeKind: "deprecated"
    }, {}]
  }
};
const Icon = {
  name: "Icon (iTwinUI)",
  args: {
    widgets: [{
      iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {})
    }, {}, {}, {}, {}]
  }
};
const IconStrataKit = {
  name: "Icon (StrataKit)",
  args: {
    widgets: [{
      iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$1, { href: placeholderIcon })
    }, {
      iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$1, { href: placeholderIcon })
    }, {
      iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$1, { href: placeholderIcon })
    }, {
      iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$1, { href: placeholderIcon })
    }, {
      iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$1, { href: placeholderIcon })
    }]
  }
};
const CSSIcon = {
  args: {
    widgets: [{
      iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "icon icon-placeholder" })
    }, {}, {}, {}, {}]
  }
};
const IconSpec = {
  name: "Icon Spec (deprecated)",
  args: {
    widgets: [{
      icon: "icon-placeholder"
    }, {}, {}, {}, {}]
  }
};
const IconSpecNode = {
  name: "Icon Spec Node (deprecated)",
  args: {
    widgets: [{
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {})
    }, {}, {}, {}, {}]
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...Default.parameters?.docs,
    source: {
      originalSource: "{}",
      ...Default.parameters?.docs?.source
    }
  }
};
Unloaded.parameters = {
  ...Unloaded.parameters,
  docs: {
    ...Unloaded.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    widgets: [{\n      defaultState: WidgetState.Unloaded\n    }, {}]\n  }\n}",
      ...Unloaded.parameters?.docs?.source
    }
  }
};
Floating.parameters = {
  ...Floating.parameters,
  docs: {
    ...Floating.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    widgets: [{\n      defaultState: WidgetState.Floating\n    }, {}]\n  }\n}",
      ...Floating.parameters?.docs?.source
    }
  }
};
Badge.parameters = {
  ...Badge.parameters,
  docs: {
    ...Badge.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    widgets: [{\n      badge: BadgeType.TechnicalPreview\n    }, {\n      badgeKind: "deprecated"\n    }, {}]\n  }\n}',
      ...Badge.parameters?.docs?.source
    }
  }
};
Icon.parameters = {
  ...Icon.parameters,
  docs: {
    ...Icon.parameters?.docs,
    source: {
      originalSource: '{\n  name: "Icon (iTwinUI)",\n  args: {\n    widgets: [{\n      iconNode: <SvgPlaceholder />\n    }, {}, {}, {}, {}]\n  }\n}',
      ...Icon.parameters?.docs?.source
    }
  }
};
IconStrataKit.parameters = {
  ...IconStrataKit.parameters,
  docs: {
    ...IconStrataKit.parameters?.docs,
    source: {
      originalSource: '{\n  name: "Icon (StrataKit)",\n  args: {\n    widgets: [{\n      iconNode: <SKIcon href={placeholderIcon} />\n    }, {\n      iconNode: <SKIcon href={placeholderIcon} />\n    }, {\n      iconNode: <SKIcon href={placeholderIcon} />\n    }, {\n      iconNode: <SKIcon href={placeholderIcon} />\n    }, {\n      iconNode: <SKIcon href={placeholderIcon} />\n    }]\n  }\n}',
      ...IconStrataKit.parameters?.docs?.source
    }
  }
};
CSSIcon.parameters = {
  ...CSSIcon.parameters,
  docs: {
    ...CSSIcon.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    widgets: [{\n      iconNode: <i className="icon icon-placeholder" />\n    }, {}, {}, {}, {}]\n  }\n}',
      ...CSSIcon.parameters?.docs?.source
    }
  }
};
IconSpec.parameters = {
  ...IconSpec.parameters,
  docs: {
    ...IconSpec.parameters?.docs,
    source: {
      originalSource: '{\n  name: "Icon Spec (deprecated)",\n  args: {\n    widgets: [{\n      icon: "icon-placeholder"\n    }, {}, {}, {}, {}]\n  }\n}',
      ...IconSpec.parameters?.docs?.source
    }
  }
};
IconSpecNode.parameters = {
  ...IconSpecNode.parameters,
  docs: {
    ...IconSpecNode.parameters?.docs,
    source: {
      originalSource: '{\n  name: "Icon Spec Node (deprecated)",\n  args: {\n    widgets: [{\n      icon: <SvgPlaceholder />\n    }, {}, {}, {}, {}]\n  }\n}',
      ...IconSpecNode.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Default", "Unloaded", "Floating", "Badge", "Icon", "IconStrataKit", "CSSIcon", "IconSpec", "IconSpecNode"];
export {
  Badge,
  CSSIcon,
  Default,
  Floating,
  Icon,
  IconSpec,
  IconSpecNode,
  IconStrataKit,
  Unloaded,
  __namedExportsOrder,
  meta as default
};
