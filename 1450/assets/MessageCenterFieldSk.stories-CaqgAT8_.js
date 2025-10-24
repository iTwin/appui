import { J as canUseDOM, K as contains, L as __spreadProps, M as __spreadValues, N as forwardRef, j as jsxRuntimeExports, O as Role, c as classnames, r as reactExports, Q as useLatestRef, U as useSafeContext$1, W as useRootNode, X as getOwnerDocument, Y as spriteSheetId, Z as parseDOM, $ as HtmlSanitizerContext, a0 as isFrame, a1 as getActiveElement, a2 as isVisible, a3 as createHook, a4 as __objRest, a5 as disabledFromProps, a6 as useEvent, a7 as isButton, a8 as useTagName, a9 as __spreadValues$1, aa as __spreadProps$1, ab as useMergeRefs, ac as removeUndefinedValues, ad as forwardRef2, ae as createElement, af as useMetadataProps, ag as isTextField, ah as invariant, ai as omit, aj as pick, ak as getKeys, al as chain, am as hasOwnProperty, an as applyState, ao as noop, o as getDefaultExportFromCjs, ap as identity, aq as useSafeLayoutEffect, ar as useLiveRef, as as createStoreContext, at as useId, au as defaultValue, av as sortBasedOnDOMPosition, aw as getDocument, ax as useUpdateEffect, ay as useWrapElement, k as reactDomExports, az as memo2, aA as isTextbox, aB as useBooleanEvent, aC as getTextboxSelection, aD as getTextboxValue, aE as getScrollingElement, aF as useTransactionState, aG as __objRest$1, aH as useUnreactiveCallback, aI as isBrowser, I as IconButton, T as ThemeProvider, P as Popover } from "./iframe-qZqPc1fv.js";
import { I as InitializerDecorator, A as AppUiDecorator } from "./Decorators-Dm6oIbea.js";
import { d3 as requireShim, aS as purify, M as MessageManager$1, Q as useTranslation$1, O as OutputMessagePriority, aB as StatusBarPopover$1, I as IModelApp, aT as ConditionalStringValue, V as Icon$2, bd as IconHelper, cc as Orientation, d4 as create, c0 as produce, d5 as castDraft, d6 as CubeNavigationAid, d7 as DrawingNavigationAid, d8 as SpatialViewState, d9 as OrthographicViewState, da as DrawingViewState, db as SheetViewState, dc as ScrollView, dd as FlexWrapContainer, de as SvgDocument, df as SearchBox, S as SvgPlaceholder, dg as ViewportComponentEvents, dh as SvgChevronLeft, di as SvgChevronRight, dj as calculateToolbarOpacity, dk as calculateBoxShadowOpacity, dl as calculateBackdropFilterBlur, dm as getToolbarBackgroundColor, dn as getToolbarBoxShadow, dp as TOOLBAR_BOX_SHADOW_OPACITY_DEFAULT, dq as getToolbarBackdropFilter, dr as TOOLBAR_BACKDROP_FILTER_BLUR_DEFAULT, ds as StandardViewId, dt as Popup, du as Panel, dv as Columns, dw as GroupColumn, dx as GroupTool, dy as ToolbarItemUtilities, dz as getCssVariableAsNumber, aG as usePackageTranslation, dA as MessageBoxIconType, dB as MessageContainer, dC as MessageBoxType, dD as MessageBoxValue, co as Point, c9 as Rectangle, aA as MessageRenderer$1, a1 as OutputMessageType, bm as SnapMode, dE as OutputMessageAlert, dF as isEqual, aF as SvgStatusSuccess$1, K as SvgInfo$1, aD as SvgStatusWarning$1, aE as SvgStatusError$1, dG as ActivityMessageDetails, dH as UiEvent, $ as Text$1, aL as UiError, dI as useStoreWithEqualityFn, dJ as shallow$1, dK as createStore$1, dL as useRefs, a6 as DropdownMenu, bq as SvgMoreVertical, b as MenuItem$1, dM as SvgDockLeft, dN as SvgDockRight, dO as SvgDockTop, dP as SvgDockBottom, dQ as useRefEffect, ck as Timer, dR as useResizeObserver, a7 as SvgMore, dS as useRefState, cv as SvgPin, dT as SvgPinHollow, dU as SvgWindowPopout, dV as HorizontalAlignment, dW as SvgWindowMinimize, dX as SvgWindowMaximize, dY as SvgCloseSmall, b9 as SvgAdd, b5 as ConditionalBooleanValue, bA as ContextSubMenu, bB as ContextMenuItem, N as NotifyMessageDetails, dZ as GlobalContextMenu, a$ as SvgClose, t as Icon$3, d_ as SvgInfoCircularHollow, d$ as SvgStatusErrorHollow, e0 as abstract, a4 as BadgeType, e1 as NonIdealState, e2 as SvgError, e3 as ErrorBoundary, e4 as InteractiveTool, a5 as Label, e5 as PopupContext, e6 as Div, e7 as LocalStateStorage$1, b3 as SvgProgressBackwardCircular, bu as Badge$1, e8 as InputWithDecorations, e9 as SvgLock, ea as SvgLockUnlocked, eb as createEditorSpec, ec as isBoolean, ed as isText, ee as isNumeric, ef as CustomNumberEditorSpec$1, eg as CustomNumberEditor$1, eh as EditorsRegistryProvider, ei as UiStateStorageStatus$1, ej as MenuExtraContent, ek as useWidgetOpacityContext, ct as ProcessDetector, el as Surface$1, em as Direction, en as ToolbarPanelAlignment, eo as DivWithOutsideClick, ep as FocusTrap, cH as PropertyValueRendererManager, eq as ToolbarOpacitySetting, er as EditorContainer, es as ToolUtilities, bc as SvgRemove, i as Tool, et as ParseAndRunResult, a0 as Input, d0 as Listbox, d1 as ListboxItem, eu as FilteredText, ev as PropertyRecordEditor, ew as focusIntoContainer, ex as combineReducers, ey as createStore$2, ez as EmphasizeElements, eA as FeatureAppearance, aq as SvgSettings, eB as SettingsContainer, eC as Centered, eD as IconInput, br as SvgCheckmark, eE as ContextMenu, eF as AngleDescription, eG as addIconNodeParam, a9 as LengthDescription, eH as SettingsManager$1, eI as UiIModelComponents, bp as UiAdmin } from "./appui-react-CLN8J6gc.js";
import { a as BeEvent, j as BeUiEvent, d as ProgressRadial, R as RelativePosition, L as Logger, M as MessageSeverity, c as Dialog$1, b as DialogButtonType, B as Button$2, n as assert, K as Key_enumExports, m as BentleyStatus, g as PropertyValueFormat, S as StandardTypeNames, G as Guid, U as UiLayoutDataProvider, k as PropertyRecord, I as Id64 } from "./Key.enum-bWQ0azWJ.js";
import { a as createMessageDecorator } from "./Utils-BlPrrr_h.js";
import { N as NotificationMarker } from "./NotificationMarker-hkqr1pBV.js";
import "./client-BmWydt1w.js";
function isApple() {
  if (!canUseDOM) return false;
  return /mac|iphone|ipad|ipod/i.test(navigator.platform);
}
function isSafari() {
  return canUseDOM && isApple() && /apple/i.test(navigator.vendor);
}
function isFirefox() {
  return canUseDOM && /firefox\//i.test(navigator.userAgent);
}
function isPortalEvent(event) {
  return Boolean(
    event.currentTarget && !contains(event.currentTarget, event.target)
  );
}
function isSelfTarget(event) {
  return event.target === event.currentTarget;
}
function fireBlurEvent(element, eventInit) {
  const event = new FocusEvent("blur", eventInit);
  const defaultAllowed = element.dispatchEvent(event);
  const bubbleInit = __spreadProps(__spreadValues({}, eventInit), { bubbles: true });
  element.dispatchEvent(new FocusEvent("focusout", bubbleInit));
  return defaultAllowed;
}
function fireKeyboardEvent(element, type, eventInit) {
  const event = new KeyboardEvent(type, eventInit);
  return element.dispatchEvent(event);
}
function fireClickEvent(element, eventInit) {
  const event = new MouseEvent("click", eventInit);
  return element.dispatchEvent(event);
}
function isFocusEventOutside(event, container) {
  const containerElement = event.currentTarget;
  const relatedTarget = event.relatedTarget;
  return !relatedTarget || !contains(containerElement, relatedTarget);
}
function queueBeforeEvent(element, type, callback, timeout) {
  const createTimer = (callback2) => {
    const timerId = requestAnimationFrame(callback2);
    return () => cancelAnimationFrame(timerId);
  };
  const cancelTimer = createTimer(() => {
    element.removeEventListener(type, callSync, true);
    callback();
  });
  const callSync = () => {
    cancelTimer();
    callback();
  };
  element.addEventListener(type, callSync, { once: true, capture: true });
  return cancelTimer;
}
function addGlobalEventListener(type, listener, options, scope = window) {
  const children = [];
  try {
    scope.document.addEventListener(type, listener, options);
    for (const frame of Array.from(scope.frames)) {
      children.push(addGlobalEventListener(type, listener, options, frame));
    }
  } catch (e) {
  }
  const removeEventListener = () => {
    try {
      scope.document.removeEventListener(type, listener, options);
    } catch (e) {
    }
    for (const remove of children) {
      remove();
    }
  };
  return removeEventListener;
}
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
  const sanitizeHtml = useLatestRef(useSafeContext$1(HtmlSanitizerContext));
  const rootNode = useRootNode();
  const inlineHref = reactExports.useRef(void 0);
  const getClientSnapshot = () => {
    const ownerDocument = getOwnerDocument(rootNode);
    if (!rawHref || !ownerDocument) return void 0;
    if (isHttpProtocol(rawHref, ownerDocument)) return rawHref;
    return inlineHref.current;
  };
  const subscribe2 = reactExports.useCallback(
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
          for (const symbol2 of symbols) {
            symbol2.id = `${prefix}--${symbol2.id}`;
            if (ownerDocument.getElementById(symbol2.id)) continue;
            spriteSheet.appendChild(symbol2.cloneNode(true));
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
    subscribe2,
    getClientSnapshot,
    () => rawHref
  );
}
function isHttpProtocol(url, ownerDocument) {
  const { protocol } = new URL(url, ownerDocument.baseURI);
  return ["http:", "https:"].includes(protocol);
}
var selector = "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], summary, iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";
function hasNegativeTabIndex(element) {
  const tabIndex = Number.parseInt(element.getAttribute("tabindex") || "0", 10);
  return tabIndex < 0;
}
function isFocusable(element) {
  if (!element.matches(selector)) return false;
  if (!isVisible(element)) return false;
  if (element.closest("[inert]")) return false;
  return true;
}
function isTabbable(element) {
  if (!isFocusable(element)) return false;
  if (hasNegativeTabIndex(element)) return false;
  if (!("form" in element)) return true;
  if (!element.form) return true;
  if (element.checked) return true;
  if (element.type !== "radio") return true;
  const radioGroup = element.form.elements.namedItem(element.name);
  if (!radioGroup) return true;
  if (!("length" in radioGroup)) return true;
  const activeElement = getActiveElement(element);
  if (!activeElement) return true;
  if (activeElement === element) return true;
  if (!("form" in activeElement)) return true;
  if (activeElement.form !== element.form) return true;
  if (activeElement.name !== element.name) return true;
  return false;
}
function getAllTabbableIn(container, includeContainer, fallbackToFocusable) {
  const elements = Array.from(
    container.querySelectorAll(selector)
  );
  const tabbableElements = elements.filter(isTabbable);
  if (includeContainer && isTabbable(container)) {
    tabbableElements.unshift(container);
  }
  tabbableElements.forEach((element, i) => {
    if (isFrame(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      const allFrameTabbable = getAllTabbableIn(
        frameBody,
        false,
        fallbackToFocusable
      );
      tabbableElements.splice(i, 1, ...allFrameTabbable);
    }
  });
  if (!tabbableElements.length && fallbackToFocusable) ;
  return tabbableElements;
}
function getClosestFocusable(element) {
  while (element && !isFocusable(element)) {
    element = element.closest(selector);
  }
  return element || null;
}
function hasFocus(element) {
  const activeElement = getActiveElement(element);
  if (!activeElement) return false;
  if (activeElement === element) return true;
  const activeDescendant = activeElement.getAttribute("aria-activedescendant");
  if (!activeDescendant) return false;
  return activeDescendant === element.id;
}
function hasFocusWithin(element) {
  const activeElement = getActiveElement(element);
  if (!activeElement) return false;
  if (contains(element, activeElement)) return true;
  const activeDescendant = activeElement.getAttribute("aria-activedescendant");
  if (!activeDescendant) return false;
  if (!("id" in element)) return false;
  if (activeDescendant === element.id) return true;
  return !!element.querySelector(`#${CSS.escape(activeDescendant)}`);
}
function focusIfNeeded(element) {
  if (!hasFocusWithin(element) && isFocusable(element)) {
    element.focus();
  }
}
function focusIntoView(element, options) {
  if (!("scrollIntoView" in element)) {
    element.focus();
  } else {
    element.focus({ preventScroll: true });
    element.scrollIntoView(__spreadValues({ block: "nearest", inline: "nearest" }, options));
  }
}
function SvgChat() {
  const chat = new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%3e%3csymbol%20id='icon'%20fill='none'%20viewBox='0%200%2016%2016'%3e%3cpath%20fill='currentColor'%20fill-rule='evenodd'%20d='M8%203c3.314%200%206%202.23%206%205s-2.686%205-6%205c-1.157%200-2.318-.394-3.25-.933a.5.5%200%200%200-.526.016l-.064.05c-.604.562-1.15.845-1.575.959-.08.021-.155.035-.224.046a4.57%204.57%200%200%200%20.336-.769c.221-.674.318-1.538-.075-2.365C2.291%209.307%202%208.657%202%208c0-2.77%202.686-5%206-5Zm0%2011c3.682%200%207-2.51%207-6s-3.318-6-7-6-7%202.51-7%206c0%20.918.402%201.767.719%202.434l.078.194c.153.462.103.963-.05%201.43-.177.54-.466.954-.6%201.088a.5.5%200%200%200%20.096.783c.422.253.997.29%201.6.129.535-.144%201.122-.45%201.725-.954C5.56%2013.621%206.763%2014%208%2014Zm0-5.25a.75.75%200%201%200%200-1.5.75.75%200%200%200%200%201.5ZM11.75%208a.75.75%200%201%201-1.5%200%20.75.75%200%200%201%201.5%200ZM5%208.75a.75.75%200%201%200%200-1.5.75.75%200%200%200%200%201.5Z'%20clip-rule='evenodd'/%3e%3c/symbol%3e%3csymbol%20id='icon-large'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='currentColor'%20fill-rule='evenodd'%20d='M12%204c5.024%200%209%203.633%209%208s-3.976%208-9%208c-1.81%200-3.49-.474-4.897-1.287a.5.5%200%200%200-.527.015l-.063.051c-1.386%201.287-2.82%201.28-3.687%201.029a6.61%206.61%200%200%200%20.842-1.416c.392-.92.6-2.1.039-3.28A7.212%207.212%200%200%201%203%2012c0-4.367%203.976-8%209-8Zm0%2017c5.47%200%2010-3.979%2010-9s-4.53-9-10-9S2%206.979%202%2012a8.21%208.21%200%200%200%20.804%203.542c.395.83.27%201.691-.056%202.457a5.628%205.628%200%200%201-1.102%201.648.5.5%200%200%200%20.097.782c.924.554%203.107%201.03%205.173-.677A10.812%2010.812%200%200%200%2012%2021Zm4-8a1%201%200%201%200%200-2%201%201%200%200%200%200%202Zm-3-1a1%201%200%201%201-2%200%201%201%200%200%201%202%200Zm-5%201a1%201%200%201%200%200-2%201%201%200%200%200%200%202Z'%20clip-rule='evenodd'/%3e%3c/symbol%3e%3cuse%20href='%23icon'/%3e%3c/svg%3e", import.meta.url).href;
  return reactExports.createElement(Icon$1, { href: chat });
}
function SvgInfo() {
  const info = new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%3e%3csymbol%20id='icon'%20fill='none'%20viewBox='0%200%2016%2016'%3e%3cpath%20fill='currentColor'%20d='M8%201.5a6.5%206.5%200%201%201%200%2013%206.5%206.5%200%200%201%200-13Zm0%201a5.5%205.5%200%201%200%200%2011%205.5%205.5%200%200%200%200-11Zm0%204a.5.5%200%200%201%20.5.5v3.5h1a.5.5%200%200%201%200%201h-3a.5.5%200%200%201%200-1h1v-3h-1a.5.5%200%200%201%200-1H8Zm-.125-2.25a.625.625%200%201%201%200%201.25.625.625%200%200%201%200-1.25Z'/%3e%3c/symbol%3e%3csymbol%20id='icon-large'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='currentColor'%20fill-rule='evenodd'%20d='M21%2012a9%209%200%201%200-18%200%209%209%200%200%200%2018%200Zm1%200c0%205.523-4.477%2010-10%2010S2%2017.523%202%2012%206.477%202%2012%202s10%204.477%2010%2010Zm-8%204.5a.5.5%200%200%201-.5.5h-3a.5.5%200%200%201%200-1h1v-5h-1a.5.5%200%200%201%200-1H12a.5.5%200%200%201%20.5.5V16h1a.5.5%200%200%201%20.5.5ZM12%208a.75.75%200%201%200%200-1.5.75.75%200%200%200%200%201.5Z'%20clip-rule='evenodd'/%3e%3c/symbol%3e%3cuse%20href='%23icon'/%3e%3c/svg%3e", import.meta.url).href;
  return reactExports.createElement(Icon$1, { href: info, size: "large", fill: "informational" });
}
function SvgStatusWarning() {
  const info = new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%3e%3csymbol%20id='icon'%20fill='none'%20viewBox='0%200%2016%2016'%3e%3cpath%20fill='currentColor'%20d='M6.94%202.354a1.5%201.5%200%200%201%202.121%200l4.586%204.586a1.5%201.5%200%200%201%200%202.12l-4.586%204.587a1.5%201.5%200%200%201-2.121%200L2.354%209.06a1.5%201.5%200%200%201%200-2.121L6.94%202.354Zm1.414.707a.5.5%200%200%200-.707%200L3.061%207.647a.5.5%200%200%200%200%20.707l4.586%204.586a.5.5%200%200%200%20.707%200l4.586-4.586a.5.5%200%200%200%200-.707L8.354%203.06ZM8%209.5A.75.75%200%201%201%208%2011a.75.75%200%200%201%200-1.5ZM8%205a.5.5%200%200%201%20.5.5V8a.5.5%200%200%201-1%200V5.5A.5.5%200%200%201%208%205Z'/%3e%3c/symbol%3e%3csymbol%20id='icon-large'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='currentColor'%20fill-rule='evenodd'%20d='M10.94%201.853a1.5%201.5%200%200%201%202.12%200l9.086%209.086a1.5%201.5%200%200%201%200%202.121l-9.086%209.086a1.5%201.5%200%200%201-2.12%200L1.852%2013.06a1.5%201.5%200%200%201%200-2.12l9.086-9.087Zm1.414.707a.5.5%200%200%200-.707%200L2.56%2011.646a.5.5%200%200%200%200%20.707l9.085%209.086a.5.5%200%200%200%20.707%200l9.086-9.086a.5.5%200%200%200%200-.707L12.354%202.56Zm.396%2013.19a.75.75%200%201%201-1.5%200%20.75.75%200%200%201%201.5%200ZM11.5%208v5a.5.5%200%201%200%201%200V8a.5.5%200%200%200-1%200Z'%20clip-rule='evenodd'/%3e%3c/symbol%3e%3cuse%20href='%23icon'/%3e%3c/svg%3e", import.meta.url).href;
  return reactExports.createElement(Icon$1, { href: info, size: "large", fill: "warning" });
}
function SvgStatusError() {
  const info = new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%3e%3csymbol%20id='icon'%20fill='none'%20viewBox='0%200%2016%2016'%3e%3cpath%20fill='currentColor'%20d='M7.25%201.855a1.5%201.5%200%200%201%201.5%200l4.196%202.423a1.5%201.5%200%200%201%20.75%201.299v4.846a1.5%201.5%200%200%201-.75%201.298L8.75%2014.144a1.5%201.5%200%200%201-1.5%200l-4.196-2.423a1.5%201.5%200%200%201-.75-1.298V5.577a1.5%201.5%200%200%201%20.75-1.299L7.25%201.855Zm1%20.866a.5.5%200%200%200-.5%200L3.554%205.144a.5.5%200%200%200-.25.433v4.846a.5.5%200%200%200%20.25.432l4.196%202.423a.5.5%200%200%200%20.5%200l4.196-2.423a.5.5%200%200%200%20.25-.432V5.577a.5.5%200%200%200-.25-.433L8.25%202.721ZM8%209.5A.75.75%200%201%201%208%2011a.75.75%200%200%201%200-1.5ZM8%205a.5.5%200%200%201%20.5.5V8a.5.5%200%200%201-1%200V5.5A.5.5%200%200%201%208%205Z'/%3e%3c/symbol%3e%3csymbol%20id='icon-large'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='currentColor'%20fill-rule='evenodd'%20d='M20.5%207.56a.5.5%200%200%200-.24-.426l-8-4.889a.5.5%200%200%200-.52%200l-8%204.889a.5.5%200%200%200-.24.426v8.88a.5.5%200%200%200%20.24.426l8%204.889a.5.5%200%200%200%20.52%200l8-4.889a.5.5%200%200%200%20.24-.427V7.56Zm1%208.88a1.5%201.5%200%200%201-.718%201.279l-8%204.89a1.5%201.5%200%200%201-1.564%200l-8-4.89a1.5%201.5%200%200%201-.718-1.28V7.56a1.5%201.5%200%200%201%20.718-1.279l8-4.89a1.5%201.5%200%200%201%201.564%200l8%204.89a1.5%201.5%200%200%201%20.718%201.28v8.878Zm-8.75-.69a.75.75%200%201%201-1.5%200%20.75.75%200%200%201%201.5%200ZM11.5%208v5a.5.5%200%201%200%201%200V8a.5.5%200%200%200-1%200Z'%20clip-rule='evenodd'/%3e%3c/symbol%3e%3cuse%20href='%23icon'/%3e%3c/svg%3e", import.meta.url).href;
  return reactExports.createElement(Icon$1, { href: info, size: "large", fill: "negative" });
}
function SvgStatusSuccess() {
  const info = new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%3e%3csymbol%20id='icon'%20fill='none'%20viewBox='0%200%2016%2016'%3e%3cpath%20fill='currentColor'%20d='M7.25%201.855a1.5%201.5%200%200%201%201.5%200l4.196%202.423a1.5%201.5%200%200%201%20.75%201.299v4.846a1.5%201.5%200%200%201-.75%201.298L8.75%2014.144a1.5%201.5%200%200%201-1.5%200l-4.196-2.423a1.5%201.5%200%200%201-.75-1.298V5.577a1.5%201.5%200%200%201%20.75-1.299L7.25%201.855Zm1%20.866a.5.5%200%200%200-.5%200L3.554%205.144a.5.5%200%200%200-.25.433v4.846a.5.5%200%200%200%20.25.432l4.196%202.423a.5.5%200%200%200%20.5%200l4.196-2.423a.5.5%200%200%200%20.25-.432V5.577a.5.5%200%200%200-.25-.433L8.25%202.721ZM9.85%205.7a.501.501%200%200%201%20.8.6l-3%204a.502.502%200%200%201-.754.053l-1.5-1.5-.064-.078a.5.5%200%200%201%20.693-.693l.079.064%201.091%201.092L9.85%205.7Z'/%3e%3c/symbol%3e%3csymbol%20id='icon-large'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='currentColor'%20fill-rule='evenodd'%20d='M20.26%207.134a.5.5%200%200%201%20.24.426v8.88a.5.5%200%200%201-.24.426l-8%204.889a.5.5%200%200%201-.52%200l-8-4.889a.5.5%200%200%201-.24-.427V7.56a.5.5%200%200%201%20.24-.426l8-4.889a.5.5%200%200%201%20.52%200l8%204.889Zm.522%2010.585a1.5%201.5%200%200%200%20.718-1.28V7.56a1.5%201.5%200%200%200-.718-1.279l-8-4.89a1.5%201.5%200%200%200-1.564%200l-8%204.89a1.5%201.5%200%200%200-.718%201.28v8.878a1.5%201.5%200%200%200%20.718%201.28l8%204.89a1.5%201.5%200%200%200%201.564%200l8-4.89ZM15.82%209.116a.5.5%200%200%200-.704.064l-4.65%205.579-1.612-1.613a.5.5%200%200%200-.708.707l2%202a.5.5%200%200%200%20.738-.033l5-6a.5.5%200%200%200-.064-.704Z'%20clip-rule='evenodd'/%3e%3c/symbol%3e%3cuse%20href='%23icon'/%3e%3c/svg%3e", import.meta.url).href;
  return reactExports.createElement(Icon$1, { href: info, size: "large", fill: "success" });
}
var FocusableContext = reactExports.createContext(true);
var TagName$9 = "div";
var isSafariBrowser = isSafari();
var alwaysFocusVisibleInputTypes = [
  "text",
  "search",
  "url",
  "tel",
  "email",
  "password",
  "number",
  "date",
  "month",
  "week",
  "time",
  "datetime",
  "datetime-local"
];
var safariFocusAncestorSymbol = Symbol("safariFocusAncestor");
function markSafariFocusAncestor(element, value) {
  if (!element) return;
  element[safariFocusAncestorSymbol] = value;
}
function isAlwaysFocusVisible(element) {
  const { tagName, readOnly, type } = element;
  if (tagName === "TEXTAREA" && !readOnly) return true;
  if (tagName === "SELECT" && !readOnly) return true;
  if (tagName === "INPUT" && !readOnly) {
    return alwaysFocusVisibleInputTypes.includes(type);
  }
  if (element.isContentEditable) return true;
  const role = element.getAttribute("role");
  if (role === "combobox" && element.dataset.name) {
    return true;
  }
  return false;
}
function getLabels(element) {
  if ("labels" in element) {
    return element.labels;
  }
  return null;
}
function isNativeCheckboxOrRadio(element) {
  const tagName = element.tagName.toLowerCase();
  if (tagName === "input" && element.type) {
    return element.type === "radio" || element.type === "checkbox";
  }
  return false;
}
function isNativeTabbable(tagName) {
  if (!tagName) return true;
  return tagName === "button" || tagName === "summary" || tagName === "input" || tagName === "select" || tagName === "textarea" || tagName === "a";
}
function supportsDisabledAttribute(tagName) {
  if (!tagName) return true;
  return tagName === "button" || tagName === "input" || tagName === "select" || tagName === "textarea";
}
function getTabIndex(focusable, trulyDisabled, nativeTabbable, supportsDisabled, tabIndexProp) {
  if (!focusable) {
    return tabIndexProp;
  }
  if (trulyDisabled) {
    if (nativeTabbable && !supportsDisabled) {
      return -1;
    }
    return;
  }
  if (nativeTabbable) {
    return tabIndexProp;
  }
  return tabIndexProp || 0;
}
function useDisableEvent(onEvent, disabled) {
  return useEvent((event) => {
    onEvent == null ? void 0 : onEvent(event);
    if (event.defaultPrevented) return;
    if (disabled) {
      event.stopPropagation();
      event.preventDefault();
    }
  });
}
var hasInstalledGlobalEventListeners = false;
var isKeyboardModality = true;
function onGlobalMouseDown(event) {
  const target = event.target;
  if (target && "hasAttribute" in target) {
    if (!target.hasAttribute("data-focus-visible")) {
      isKeyboardModality = false;
    }
  }
}
function onGlobalKeyDown(event) {
  if (event.metaKey) return;
  if (event.ctrlKey) return;
  if (event.altKey) return;
  isKeyboardModality = true;
}
var useFocusable = createHook(
  function useFocusable2(_a) {
    var _b = _a, {
      focusable = true,
      accessibleWhenDisabled,
      autoFocus,
      onFocusVisible
    } = _b, props = __objRest(_b, [
      "focusable",
      "accessibleWhenDisabled",
      "autoFocus",
      "onFocusVisible"
    ]);
    const ref = reactExports.useRef(null);
    reactExports.useEffect(() => {
      if (!focusable) return;
      if (hasInstalledGlobalEventListeners) return;
      addGlobalEventListener("mousedown", onGlobalMouseDown, true);
      addGlobalEventListener("keydown", onGlobalKeyDown, true);
      hasInstalledGlobalEventListeners = true;
    }, [focusable]);
    if (isSafariBrowser) {
      reactExports.useEffect(() => {
        if (!focusable) return;
        const element = ref.current;
        if (!element) return;
        if (!isNativeCheckboxOrRadio(element)) return;
        const labels = getLabels(element);
        if (!labels) return;
        const onMouseUp = () => queueMicrotask(() => element.focus());
        for (const label2 of labels) {
          label2.addEventListener("mouseup", onMouseUp);
        }
        return () => {
          for (const label2 of labels) {
            label2.removeEventListener("mouseup", onMouseUp);
          }
        };
      }, [focusable]);
    }
    const disabled = focusable && disabledFromProps(props);
    const trulyDisabled = !!disabled && !accessibleWhenDisabled;
    const [focusVisible, setFocusVisible] = reactExports.useState(false);
    reactExports.useEffect(() => {
      if (!focusable) return;
      if (trulyDisabled && focusVisible) {
        setFocusVisible(false);
      }
    }, [focusable, trulyDisabled, focusVisible]);
    reactExports.useEffect(() => {
      if (!focusable) return;
      if (!focusVisible) return;
      const element = ref.current;
      if (!element) return;
      if (typeof IntersectionObserver === "undefined") return;
      const observer = new IntersectionObserver(() => {
        if (!isFocusable(element)) {
          setFocusVisible(false);
        }
      });
      observer.observe(element);
      return () => observer.disconnect();
    }, [focusable, focusVisible]);
    const onKeyPressCapture = useDisableEvent(
      props.onKeyPressCapture,
      disabled
    );
    const onMouseDownCapture = useDisableEvent(
      props.onMouseDownCapture,
      disabled
    );
    const onClickCapture = useDisableEvent(props.onClickCapture, disabled);
    const onMouseDownProp = props.onMouseDown;
    const onMouseDown = useEvent((event) => {
      onMouseDownProp == null ? void 0 : onMouseDownProp(event);
      if (event.defaultPrevented) return;
      if (!focusable) return;
      const element = event.currentTarget;
      if (!isSafariBrowser) return;
      if (isPortalEvent(event)) return;
      if (!isButton(element) && !isNativeCheckboxOrRadio(element)) return;
      let receivedFocus = false;
      const onFocus = () => {
        receivedFocus = true;
      };
      const options = { capture: true, once: true };
      element.addEventListener("focusin", onFocus, options);
      const focusableContainer = getClosestFocusable(element.parentElement);
      markSafariFocusAncestor(focusableContainer, true);
      queueBeforeEvent(element, "mouseup", () => {
        element.removeEventListener("focusin", onFocus, true);
        markSafariFocusAncestor(focusableContainer, false);
        if (receivedFocus) return;
        focusIfNeeded(element);
      });
    });
    const handleFocusVisible = (event, currentTarget) => {
      if (currentTarget) {
        event.currentTarget = currentTarget;
      }
      if (!focusable) return;
      const element = event.currentTarget;
      if (!element) return;
      if (!hasFocus(element)) return;
      onFocusVisible == null ? void 0 : onFocusVisible(event);
      if (event.defaultPrevented) return;
      element.dataset.focusVisible = "true";
      setFocusVisible(true);
    };
    const onKeyDownCaptureProp = props.onKeyDownCapture;
    const onKeyDownCapture = useEvent((event) => {
      onKeyDownCaptureProp == null ? void 0 : onKeyDownCaptureProp(event);
      if (event.defaultPrevented) return;
      if (!focusable) return;
      if (focusVisible) return;
      if (event.metaKey) return;
      if (event.altKey) return;
      if (event.ctrlKey) return;
      if (!isSelfTarget(event)) return;
      const element = event.currentTarget;
      const applyFocusVisible = () => handleFocusVisible(event, element);
      queueBeforeEvent(element, "focusout", applyFocusVisible);
    });
    const onFocusCaptureProp = props.onFocusCapture;
    const onFocusCapture = useEvent((event) => {
      onFocusCaptureProp == null ? void 0 : onFocusCaptureProp(event);
      if (event.defaultPrevented) return;
      if (!focusable) return;
      if (!isSelfTarget(event)) {
        setFocusVisible(false);
        return;
      }
      const element = event.currentTarget;
      const applyFocusVisible = () => handleFocusVisible(event, element);
      if (isKeyboardModality || isAlwaysFocusVisible(event.target)) {
        queueBeforeEvent(event.target, "focusout", applyFocusVisible);
      } else {
        setFocusVisible(false);
      }
    });
    const onBlurProp = props.onBlur;
    const onBlur = useEvent((event) => {
      onBlurProp == null ? void 0 : onBlurProp(event);
      if (!focusable) return;
      if (!isFocusEventOutside(event)) return;
      event.currentTarget.removeAttribute("data-focus-visible");
      setFocusVisible(false);
    });
    const autoFocusOnShow = reactExports.useContext(FocusableContext);
    const autoFocusRef = useEvent((element) => {
      if (!focusable) return;
      if (!autoFocus) return;
      if (!element) return;
      if (!autoFocusOnShow) return;
      queueMicrotask(() => {
        if (hasFocus(element)) return;
        if (!isFocusable(element)) return;
        element.focus();
      });
    });
    const tagName = useTagName(ref);
    const nativeTabbable = focusable && isNativeTabbable(tagName);
    const supportsDisabled = focusable && supportsDisabledAttribute(tagName);
    const styleProp = props.style;
    const style = reactExports.useMemo(() => {
      if (trulyDisabled) {
        return __spreadValues$1({ pointerEvents: "none" }, styleProp);
      }
      return styleProp;
    }, [trulyDisabled, styleProp]);
    props = __spreadProps$1(__spreadValues$1({
      "data-focus-visible": focusable && focusVisible || void 0,
      "data-autofocus": autoFocus || void 0,
      "aria-disabled": disabled || void 0
    }, props), {
      ref: useMergeRefs(ref, autoFocusRef, props.ref),
      style,
      tabIndex: getTabIndex(
        focusable,
        trulyDisabled,
        nativeTabbable,
        supportsDisabled,
        props.tabIndex
      ),
      disabled: supportsDisabled && trulyDisabled ? true : void 0,
      // TODO: Test Focusable contentEditable.
      contentEditable: disabled ? void 0 : props.contentEditable,
      onKeyPressCapture,
      onClickCapture,
      onMouseDownCapture,
      onMouseDown,
      onKeyDownCapture,
      onFocusCapture,
      onBlur
    });
    return removeUndefinedValues(props);
  }
);
forwardRef2(function Focusable2(props) {
  const htmlProps = useFocusable(props);
  return createElement(TagName$9, htmlProps);
});
var TagName$8 = "button";
function isNativeClick(event) {
  if (!event.isTrusted) return false;
  const element = event.currentTarget;
  if (event.key === "Enter") {
    return isButton(element) || element.tagName === "SUMMARY" || element.tagName === "A";
  }
  if (event.key === " ") {
    return isButton(element) || element.tagName === "SUMMARY" || element.tagName === "INPUT" || element.tagName === "SELECT";
  }
  return false;
}
var symbol = Symbol("command");
var useCommand = createHook(
  function useCommand2(_a) {
    var _b = _a, { clickOnEnter = true, clickOnSpace = true } = _b, props = __objRest(_b, ["clickOnEnter", "clickOnSpace"]);
    const ref = reactExports.useRef(null);
    const [isNativeButton, setIsNativeButton] = reactExports.useState(false);
    reactExports.useEffect(() => {
      if (!ref.current) return;
      setIsNativeButton(isButton(ref.current));
    }, []);
    const [active, setActive] = reactExports.useState(false);
    const activeRef = reactExports.useRef(false);
    const disabled = disabledFromProps(props);
    const [isDuplicate, metadataProps] = useMetadataProps(props, symbol, true);
    const onKeyDownProp = props.onKeyDown;
    const onKeyDown = useEvent((event) => {
      onKeyDownProp == null ? void 0 : onKeyDownProp(event);
      const element = event.currentTarget;
      if (event.defaultPrevented) return;
      if (isDuplicate) return;
      if (disabled) return;
      if (!isSelfTarget(event)) return;
      if (isTextField(element)) return;
      if (element.isContentEditable) return;
      const isEnter = clickOnEnter && event.key === "Enter";
      const isSpace = clickOnSpace && event.key === " ";
      const shouldPreventEnter = event.key === "Enter" && !clickOnEnter;
      const shouldPreventSpace = event.key === " " && !clickOnSpace;
      if (shouldPreventEnter || shouldPreventSpace) {
        event.preventDefault();
        return;
      }
      if (isEnter || isSpace) {
        const nativeClick = isNativeClick(event);
        if (isEnter) {
          if (!nativeClick) {
            event.preventDefault();
            const _a2 = event, { view } = _a2, eventInit = __objRest(_a2, ["view"]);
            const click = () => fireClickEvent(element, eventInit);
            if (isFirefox()) {
              queueBeforeEvent(element, "keyup", click);
            } else {
              queueMicrotask(click);
            }
          }
        } else if (isSpace) {
          activeRef.current = true;
          if (!nativeClick) {
            event.preventDefault();
            setActive(true);
          }
        }
      }
    });
    const onKeyUpProp = props.onKeyUp;
    const onKeyUp = useEvent((event) => {
      onKeyUpProp == null ? void 0 : onKeyUpProp(event);
      if (event.defaultPrevented) return;
      if (isDuplicate) return;
      if (disabled) return;
      if (event.metaKey) return;
      const isSpace = clickOnSpace && event.key === " ";
      if (activeRef.current && isSpace) {
        activeRef.current = false;
        if (!isNativeClick(event)) {
          event.preventDefault();
          setActive(false);
          const element = event.currentTarget;
          const _a2 = event, { view } = _a2, eventInit = __objRest(_a2, ["view"]);
          queueMicrotask(() => fireClickEvent(element, eventInit));
        }
      }
    });
    props = __spreadProps$1(__spreadValues$1(__spreadValues$1({
      "data-active": active || void 0,
      type: isNativeButton ? "button" : void 0
    }, metadataProps), props), {
      ref: useMergeRefs(ref, props.ref),
      onKeyDown,
      onKeyUp
    });
    props = useFocusable(props);
    return props;
  }
);
forwardRef2(function Command2(props) {
  const htmlProps = useCommand(props);
  return createElement(TagName$8, htmlProps);
});
var TagName$7 = "button";
var useButton = createHook(
  function useButton2(props) {
    const ref = reactExports.useRef(null);
    const tagName = useTagName(ref, TagName$7);
    const [isNativeButton, setIsNativeButton] = reactExports.useState(
      () => !!tagName && isButton({ tagName, type: props.type })
    );
    reactExports.useEffect(() => {
      if (!ref.current) return;
      setIsNativeButton(isButton(ref.current));
    }, []);
    props = __spreadProps$1(__spreadValues$1({
      role: !isNativeButton && tagName !== "a" ? "button" : void 0
    }, props), {
      ref: useMergeRefs(ref, props.ref)
    });
    props = useCommand(props);
    return props;
  }
);
var Button$1 = forwardRef2(function Button2(props) {
  const htmlProps = useButton(props);
  return createElement(TagName$7, htmlProps);
});
const GhostAlignerContext = reactExports.createContext(void 0);
function useGhostAlignment() {
  return reactExports.useContext(GhostAlignerContext);
}
const Button = forwardRef((props, forwardedRef) => {
  const { variant = "solid", tone = "neutral", ...rest } = props;
  const ghostAlignment = useGhostAlignment();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button$1,
    {
      accessibleWhenDisabled: true,
      ...rest,
      "data-_sk-variant": variant,
      "data-_sk-tone": tone,
      "data-_sk-ghost-align": variant === "ghost" ? ghostAlignment : void 0,
      className: classnames(
        "🥝Button",
        { "🥝GhostAligner": variant === "ghost" },
        props.className
      ),
      ref: forwardedRef
    }
  );
});
var Button_default = Button;
function getInternal(store, key) {
  const internals = store.__unstableInternals;
  invariant(internals, "Invalid store");
  return internals[key];
}
function createStore(initialState, ...stores) {
  let state = initialState;
  let prevStateBatch = state;
  let lastUpdate = Symbol();
  let destroy = noop;
  const instances = /* @__PURE__ */ new Set();
  const updatedKeys = /* @__PURE__ */ new Set();
  const setups = /* @__PURE__ */ new Set();
  const listeners = /* @__PURE__ */ new Set();
  const batchListeners = /* @__PURE__ */ new Set();
  const disposables = /* @__PURE__ */ new WeakMap();
  const listenerKeys = /* @__PURE__ */ new WeakMap();
  const storeSetup = (callback) => {
    setups.add(callback);
    return () => setups.delete(callback);
  };
  const storeInit = () => {
    const initialized = instances.size;
    const instance = Symbol();
    instances.add(instance);
    const maybeDestroy = () => {
      instances.delete(instance);
      if (instances.size) return;
      destroy();
    };
    if (initialized) return maybeDestroy;
    const desyncs = getKeys(state).map(
      (key) => chain(
        ...stores.map((store) => {
          var _a;
          const storeState = (_a = store == null ? void 0 : store.getState) == null ? void 0 : _a.call(store);
          if (!storeState) return;
          if (!hasOwnProperty(storeState, key)) return;
          return sync(store, [key], (state2) => {
            setState(
              key,
              state2[key],
              // @ts-expect-error - Not public API. This is just to prevent
              // infinite loops.
              true
            );
          });
        })
      )
    );
    const teardowns = [];
    for (const setup2 of setups) {
      teardowns.push(setup2());
    }
    const cleanups = stores.map(init);
    destroy = chain(...desyncs, ...teardowns, ...cleanups);
    return maybeDestroy;
  };
  const sub = (keys, listener, set = listeners) => {
    set.add(listener);
    listenerKeys.set(listener, keys);
    return () => {
      var _a;
      (_a = disposables.get(listener)) == null ? void 0 : _a();
      disposables.delete(listener);
      listenerKeys.delete(listener);
      set.delete(listener);
    };
  };
  const storeSubscribe = (keys, listener) => sub(keys, listener);
  const storeSync = (keys, listener) => {
    disposables.set(listener, listener(state, state));
    return sub(keys, listener);
  };
  const storeBatch = (keys, listener) => {
    disposables.set(listener, listener(state, prevStateBatch));
    return sub(keys, listener, batchListeners);
  };
  const storePick = (keys) => createStore(pick(state, keys), finalStore);
  const storeOmit = (keys) => createStore(omit(state, keys), finalStore);
  const getState = () => state;
  const setState = (key, value, fromStores = false) => {
    var _a;
    if (!hasOwnProperty(state, key)) return;
    const nextValue = applyState(value, state[key]);
    if (nextValue === state[key]) return;
    if (!fromStores) {
      for (const store of stores) {
        (_a = store == null ? void 0 : store.setState) == null ? void 0 : _a.call(store, key, nextValue);
      }
    }
    const prevState = state;
    state = __spreadProps(__spreadValues({}, state), { [key]: nextValue });
    const thisUpdate = Symbol();
    lastUpdate = thisUpdate;
    updatedKeys.add(key);
    const run = (listener, prev, uKeys) => {
      var _a2;
      const keys = listenerKeys.get(listener);
      const updated = (k) => uKeys ? uKeys.has(k) : k === key;
      if (!keys || keys.some(updated)) {
        (_a2 = disposables.get(listener)) == null ? void 0 : _a2();
        disposables.set(listener, listener(state, prev));
      }
    };
    for (const listener of listeners) {
      run(listener, prevState);
    }
    queueMicrotask(() => {
      if (lastUpdate !== thisUpdate) return;
      const snapshot = state;
      for (const listener of batchListeners) {
        run(listener, prevStateBatch, updatedKeys);
      }
      prevStateBatch = snapshot;
      updatedKeys.clear();
    });
  };
  const finalStore = {
    getState,
    setState,
    __unstableInternals: {
      setup: storeSetup,
      init: storeInit,
      subscribe: storeSubscribe,
      sync: storeSync,
      batch: storeBatch,
      pick: storePick,
      omit: storeOmit
    }
  };
  return finalStore;
}
function setup(store, ...args) {
  if (!store) return;
  return getInternal(store, "setup")(...args);
}
function init(store, ...args) {
  if (!store) return;
  return getInternal(store, "init")(...args);
}
function subscribe$1(store, ...args) {
  if (!store) return;
  return getInternal(store, "subscribe")(...args);
}
function sync(store, ...args) {
  if (!store) return;
  return getInternal(store, "sync")(...args);
}
function batch(store, ...args) {
  if (!store) return;
  return getInternal(store, "batch")(...args);
}
function omit2(store, ...args) {
  if (!store) return;
  return getInternal(store, "omit")(...args);
}
function mergeStore(...stores) {
  const initialState = stores.reduce((state, store2) => {
    var _a;
    const nextState = (_a = store2 == null ? void 0 : store2.getState) == null ? void 0 : _a.call(store2);
    if (!nextState) return state;
    return Object.assign(state, nextState);
  }, {});
  const store = createStore(initialState, ...stores);
  return Object.assign({}, ...stores, store);
}
function throwOnConflictingProps(props, store) {
  return;
}
var shimExports = requireShim();
const useSyncExternalStoreExports = /* @__PURE__ */ getDefaultExportFromCjs(shimExports);
var { useSyncExternalStore } = useSyncExternalStoreExports;
var noopSubscribe = () => () => {
};
function useStoreState(store, keyOrSelector = identity) {
  const storeSubscribe = reactExports.useCallback(
    (callback) => {
      if (!store) return noopSubscribe();
      return subscribe$1(store, null, callback);
    },
    [store]
  );
  const getSnapshot2 = () => {
    const key = typeof keyOrSelector === "string" ? keyOrSelector : null;
    const selector2 = typeof keyOrSelector === "function" ? keyOrSelector : null;
    const state = store == null ? void 0 : store.getState();
    if (selector2) return selector2(state);
    if (!state) return;
    if (!key) return;
    if (!hasOwnProperty(state, key)) return;
    return state[key];
  };
  return useSyncExternalStore(storeSubscribe, getSnapshot2, getSnapshot2);
}
function useStoreStateObject(store, object) {
  const objRef = reactExports.useRef(
    {}
  );
  const storeSubscribe = reactExports.useCallback(
    (callback) => {
      if (!store) return noopSubscribe();
      return subscribe$1(store, null, callback);
    },
    [store]
  );
  const getSnapshot2 = () => {
    const state = store == null ? void 0 : store.getState();
    let updated = false;
    const obj = objRef.current;
    for (const prop in object) {
      const keyOrSelector = object[prop];
      if (typeof keyOrSelector === "function") {
        const value = keyOrSelector(state);
        if (value !== obj[prop]) {
          obj[prop] = value;
          updated = true;
        }
      }
      if (typeof keyOrSelector === "string") {
        if (!state) continue;
        if (!hasOwnProperty(state, keyOrSelector)) continue;
        const value = state[keyOrSelector];
        if (value !== obj[prop]) {
          obj[prop] = value;
          updated = true;
        }
      }
    }
    if (updated) {
      objRef.current = __spreadValues$1({}, obj);
    }
    return objRef.current;
  };
  return useSyncExternalStore(storeSubscribe, getSnapshot2, getSnapshot2);
}
function useStoreProps(store, props, key, setKey) {
  const value = hasOwnProperty(props, key) ? props[key] : void 0;
  const setValue = setKey ? props[setKey] : void 0;
  const propsRef = useLiveRef({ value, setValue });
  useSafeLayoutEffect(() => {
    return sync(store, [key], (state, prev) => {
      const { value: value2, setValue: setValue2 } = propsRef.current;
      if (!setValue2) return;
      if (state[key] === prev[key]) return;
      if (state[key] === value2) return;
      setValue2(state[key]);
    });
  }, [store, key]);
  useSafeLayoutEffect(() => {
    if (value === void 0) return;
    store.setState(key, value);
    return batch(store, [key], () => {
      if (value === void 0) return;
      store.setState(key, value);
    });
  });
}
function useStore(createStore2, props) {
  const [store, setStore] = reactExports.useState(() => createStore2(props));
  useSafeLayoutEffect(() => init(store), [store]);
  const useState2 = reactExports.useCallback(
    (keyOrSelector) => useStoreState(store, keyOrSelector),
    [store]
  );
  const memoizedStore = reactExports.useMemo(
    () => __spreadProps$1(__spreadValues$1({}, store), { useState: useState2 }),
    [store, useState2]
  );
  const updateStore = useEvent(() => {
    setStore((store2) => createStore2(__spreadValues$1(__spreadValues$1({}, props), store2.getState())));
  });
  return [memoizedStore, updateStore];
}
var ctx$7 = createStoreContext();
var useCollectionContext = ctx$7.useContext;
var CollectionContextProvider = ctx$7.ContextProvider;
var CollectionScopedContextProvider = ctx$7.ScopedContextProvider;
var TagName$6 = "div";
var useCollectionItem = createHook(
  function useCollectionItem2(_a) {
    var _b = _a, {
      store,
      shouldRegisterItem = true,
      getItem = identity,
      element
    } = _b, props = __objRest(_b, [
      "store",
      "shouldRegisterItem",
      "getItem",
      // @ts-expect-error This prop may come from a collection renderer.
      "element"
    ]);
    const context = useCollectionContext();
    store = store || context;
    const id = useId(props.id);
    const ref = reactExports.useRef(element);
    reactExports.useEffect(() => {
      const element2 = ref.current;
      if (!id) return;
      if (!element2) return;
      if (!shouldRegisterItem) return;
      const item = getItem({ id, element: element2 });
      return store == null ? void 0 : store.renderItem(item);
    }, [id, shouldRegisterItem, getItem, store]);
    props = __spreadProps$1(__spreadValues$1({}, props), {
      ref: useMergeRefs(ref, props.ref)
    });
    return removeUndefinedValues(props);
  }
);
forwardRef2(function CollectionItem2(props) {
  const htmlProps = useCollectionItem(props);
  return createElement(TagName$6, htmlProps);
});
function getCommonParent(items) {
  var _a;
  const firstItem = items.find((item) => !!item.element);
  const lastItem = [...items].reverse().find((item) => !!item.element);
  let parentElement = (_a = firstItem == null ? void 0 : firstItem.element) == null ? void 0 : _a.parentElement;
  while (parentElement && (lastItem == null ? void 0 : lastItem.element)) {
    const parent = parentElement;
    if (lastItem && parent.contains(lastItem.element)) {
      return parentElement;
    }
    parentElement = parentElement.parentElement;
  }
  return getDocument(parentElement).body;
}
function getPrivateStore(store) {
  return store == null ? void 0 : store.__unstablePrivateStore;
}
function createCollectionStore(props = {}) {
  var _a;
  throwOnConflictingProps(props, props.store);
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const items = defaultValue(
    props.items,
    syncState == null ? void 0 : syncState.items,
    props.defaultItems,
    []
  );
  const itemsMap = new Map(items.map((item) => [item.id, item]));
  const initialState = {
    items,
    renderedItems: defaultValue(syncState == null ? void 0 : syncState.renderedItems, [])
  };
  const syncPrivateStore = getPrivateStore(props.store);
  const privateStore = createStore(
    { items, renderedItems: initialState.renderedItems },
    syncPrivateStore
  );
  const collection = createStore(initialState, props.store);
  const sortItems2 = (renderedItems) => {
    const sortedItems = sortBasedOnDOMPosition(renderedItems, (i) => i.element);
    privateStore.setState("renderedItems", sortedItems);
    collection.setState("renderedItems", sortedItems);
  };
  setup(collection, () => init(privateStore));
  setup(privateStore, () => {
    return batch(privateStore, ["items"], (state) => {
      collection.setState("items", state.items);
    });
  });
  setup(privateStore, () => {
    return batch(privateStore, ["renderedItems"], (state) => {
      let firstRun = true;
      let raf = requestAnimationFrame(() => {
        const { renderedItems } = collection.getState();
        if (state.renderedItems === renderedItems) return;
        sortItems2(state.renderedItems);
      });
      if (typeof IntersectionObserver !== "function") {
        return () => cancelAnimationFrame(raf);
      }
      const ioCallback = () => {
        if (firstRun) {
          firstRun = false;
          return;
        }
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => sortItems2(state.renderedItems));
      };
      const root = getCommonParent(state.renderedItems);
      const observer = new IntersectionObserver(ioCallback, { root });
      for (const item of state.renderedItems) {
        if (!item.element) continue;
        observer.observe(item.element);
      }
      return () => {
        cancelAnimationFrame(raf);
        observer.disconnect();
      };
    });
  });
  const mergeItem = (item, setItems, canDeleteFromMap = false) => {
    let prevItem;
    setItems((items2) => {
      const index = items2.findIndex(({ id }) => id === item.id);
      const nextItems = items2.slice();
      if (index !== -1) {
        prevItem = items2[index];
        const nextItem = __spreadValues(__spreadValues({}, prevItem), item);
        nextItems[index] = nextItem;
        itemsMap.set(item.id, nextItem);
      } else {
        nextItems.push(item);
        itemsMap.set(item.id, item);
      }
      return nextItems;
    });
    const unmergeItem = () => {
      setItems((items2) => {
        if (!prevItem) {
          if (canDeleteFromMap) {
            itemsMap.delete(item.id);
          }
          return items2.filter(({ id }) => id !== item.id);
        }
        const index = items2.findIndex(({ id }) => id === item.id);
        if (index === -1) return items2;
        const nextItems = items2.slice();
        nextItems[index] = prevItem;
        itemsMap.set(item.id, prevItem);
        return nextItems;
      });
    };
    return unmergeItem;
  };
  const registerItem = (item) => mergeItem(
    item,
    (getItems) => privateStore.setState("items", getItems),
    true
  );
  return __spreadProps(__spreadValues({}, collection), {
    registerItem,
    renderItem: (item) => chain(
      registerItem(item),
      mergeItem(
        item,
        (getItems) => privateStore.setState("renderedItems", getItems)
      )
    ),
    item: (id) => {
      if (!id) return null;
      let item = itemsMap.get(id);
      if (!item) {
        const { items: items2 } = privateStore.getState();
        item = items2.find((item2) => item2.id === id);
        if (item) {
          itemsMap.set(id, item);
        }
      }
      return item || null;
    },
    // @ts-expect-error Internal
    __unstablePrivateStore: privateStore
  });
}
function useCollectionStoreProps(store, update, props) {
  useUpdateEffect(update, [props.store]);
  useStoreProps(store, props, "items", "setItems");
  return store;
}
const Text = forwardRef((props, forwardedRef) => {
  const { variant, ...rest } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Role,
    {
      ...rest,
      className: classnames("🥝Text", props.className),
      "data-_sk-text-variant": variant,
      ref: forwardedRef
    }
  );
});
var Text_default = Text;
var ctx$6 = createStoreContext();
ctx$6.useContext;
ctx$6.useScopedContext;
var useDisclosureProviderContext = ctx$6.useProviderContext;
var DisclosureContextProvider = ctx$6.ContextProvider;
var DisclosureScopedContextProvider = ctx$6.ScopedContextProvider;
var ctx$5 = createStoreContext(
  [DisclosureContextProvider],
  [DisclosureScopedContextProvider]
);
var DialogContextProvider = ctx$5.ContextProvider;
var DialogScopedContextProvider = ctx$5.ScopedContextProvider;
reactExports.createContext(void 0);
reactExports.createContext(void 0);
var ctx$4 = createStoreContext(
  [DialogContextProvider],
  [DialogScopedContextProvider]
);
var PopoverContextProvider = ctx$4.ContextProvider;
var PopoverScopedContextProvider = ctx$4.ScopedContextProvider;
var TagName$5 = "div";
function afterTimeout(timeoutMs, cb) {
  const timeoutId = setTimeout(cb, timeoutMs);
  return () => clearTimeout(timeoutId);
}
function afterPaint(cb) {
  let raf = requestAnimationFrame(() => {
    raf = requestAnimationFrame(cb);
  });
  return () => cancelAnimationFrame(raf);
}
function parseCSSTime(...times) {
  return times.join(", ").split(", ").reduce((longestTime, currentTimeString) => {
    const multiplier = currentTimeString.endsWith("ms") ? 1 : 1e3;
    const currentTime = Number.parseFloat(currentTimeString || "0s") * multiplier;
    if (currentTime > longestTime) return currentTime;
    return longestTime;
  }, 0);
}
function isHidden(mounted, hidden, alwaysVisible) {
  return !alwaysVisible && hidden !== false && (!mounted || !!hidden);
}
var useDisclosureContent = createHook(function useDisclosureContent2(_a) {
  var _b = _a, { store, alwaysVisible } = _b, props = __objRest(_b, ["store", "alwaysVisible"]);
  const context = useDisclosureProviderContext();
  store = store || context;
  invariant(
    store,
    false
  );
  const ref = reactExports.useRef(null);
  const id = useId(props.id);
  const [transition, setTransition] = reactExports.useState(null);
  const open = store.useState("open");
  const mounted = store.useState("mounted");
  const animated = store.useState("animated");
  const contentElement = store.useState("contentElement");
  const otherElement = useStoreState(store.disclosure, "contentElement");
  useSafeLayoutEffect(() => {
    if (!ref.current) return;
    store == null ? void 0 : store.setContentElement(ref.current);
  }, [store]);
  useSafeLayoutEffect(() => {
    let previousAnimated;
    store == null ? void 0 : store.setState("animated", (animated2) => {
      previousAnimated = animated2;
      return true;
    });
    return () => {
      if (previousAnimated === void 0) return;
      store == null ? void 0 : store.setState("animated", previousAnimated);
    };
  }, [store]);
  useSafeLayoutEffect(() => {
    if (!animated) return;
    if (!(contentElement == null ? void 0 : contentElement.isConnected)) {
      setTransition(null);
      return;
    }
    return afterPaint(() => {
      setTransition(open ? "enter" : mounted ? "leave" : null);
    });
  }, [animated, contentElement, open, mounted]);
  useSafeLayoutEffect(() => {
    if (!store) return;
    if (!animated) return;
    if (!transition) return;
    if (!contentElement) return;
    const stopAnimation = () => store == null ? void 0 : store.setState("animating", false);
    const stopAnimationSync = () => reactDomExports.flushSync(stopAnimation);
    if (transition === "leave" && open) return;
    if (transition === "enter" && !open) return;
    if (typeof animated === "number") {
      const timeout2 = animated;
      return afterTimeout(timeout2, stopAnimationSync);
    }
    const {
      transitionDuration,
      animationDuration,
      transitionDelay,
      animationDelay
    } = getComputedStyle(contentElement);
    const {
      transitionDuration: transitionDuration2 = "0",
      animationDuration: animationDuration2 = "0",
      transitionDelay: transitionDelay2 = "0",
      animationDelay: animationDelay2 = "0"
    } = otherElement ? getComputedStyle(otherElement) : {};
    const delay = parseCSSTime(
      transitionDelay,
      animationDelay,
      transitionDelay2,
      animationDelay2
    );
    const duration = parseCSSTime(
      transitionDuration,
      animationDuration,
      transitionDuration2,
      animationDuration2
    );
    const timeout = delay + duration;
    if (!timeout) {
      if (transition === "enter") {
        store.setState("animated", false);
      }
      stopAnimation();
      return;
    }
    const frameRate = 1e3 / 60;
    const maxTimeout = Math.max(timeout - frameRate, 0);
    return afterTimeout(maxTimeout, stopAnimationSync);
  }, [store, animated, contentElement, otherElement, open, transition]);
  props = useWrapElement(
    props,
    (element) => /* @__PURE__ */ jsxRuntimeExports.jsx(DialogScopedContextProvider, { value: store, children: element }),
    [store]
  );
  const hidden = isHidden(mounted, props.hidden, alwaysVisible);
  const styleProp = props.style;
  const style = reactExports.useMemo(() => {
    if (hidden) {
      return __spreadProps$1(__spreadValues$1({}, styleProp), { display: "none" });
    }
    return styleProp;
  }, [hidden, styleProp]);
  props = __spreadProps$1(__spreadValues$1({
    id,
    "data-open": open || void 0,
    "data-enter": transition === "enter" || void 0,
    "data-leave": transition === "leave" || void 0,
    hidden
  }, props), {
    ref: useMergeRefs(id ? store.setContentElement : null, ref, props.ref),
    style
  });
  return removeUndefinedValues(props);
});
var DisclosureContentImpl = forwardRef2(function DisclosureContentImpl2(props) {
  const htmlProps = useDisclosureContent(props);
  return createElement(TagName$5, htmlProps);
});
forwardRef2(function DisclosureContent2(_a) {
  var _b = _a, {
    unmountOnHide
  } = _b, props = __objRest(_b, [
    "unmountOnHide"
  ]);
  const context = useDisclosureProviderContext();
  const store = props.store || context;
  const mounted = useStoreState(
    store,
    (state) => !unmountOnHide || (state == null ? void 0 : state.mounted)
  );
  if (mounted === false) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DisclosureContentImpl, __spreadValues$1({}, props));
});
function createDisclosureStore(props = {}) {
  const store = mergeStore(
    props.store,
    omit2(props.disclosure, ["contentElement", "disclosureElement"])
  );
  const syncState = store == null ? void 0 : store.getState();
  const open = defaultValue(
    props.open,
    syncState == null ? void 0 : syncState.open,
    props.defaultOpen,
    false
  );
  const animated = defaultValue(props.animated, syncState == null ? void 0 : syncState.animated, false);
  const initialState = {
    open,
    animated,
    animating: !!animated && open,
    mounted: open,
    contentElement: defaultValue(syncState == null ? void 0 : syncState.contentElement, null),
    disclosureElement: defaultValue(syncState == null ? void 0 : syncState.disclosureElement, null)
  };
  const disclosure = createStore(initialState, store);
  setup(
    disclosure,
    () => sync(disclosure, ["animated", "animating"], (state) => {
      if (state.animated) return;
      disclosure.setState("animating", false);
    })
  );
  setup(
    disclosure,
    () => subscribe$1(disclosure, ["open"], () => {
      if (!disclosure.getState().animated) return;
      disclosure.setState("animating", true);
    })
  );
  setup(
    disclosure,
    () => sync(disclosure, ["open", "animating"], (state) => {
      disclosure.setState("mounted", state.open || state.animating);
    })
  );
  return __spreadProps(__spreadValues({}, disclosure), {
    disclosure: props.disclosure,
    setOpen: (value) => disclosure.setState("open", value),
    show: () => disclosure.setState("open", true),
    hide: () => disclosure.setState("open", false),
    toggle: () => disclosure.setState("open", (open2) => !open2),
    stopAnimation: () => disclosure.setState("animating", false),
    setContentElement: (value) => disclosure.setState("contentElement", value),
    setDisclosureElement: (value) => disclosure.setState("disclosureElement", value)
  });
}
function useDisclosureStoreProps(store, update, props) {
  useUpdateEffect(update, [props.store, props.disclosure]);
  useStoreProps(store, props, "open", "setOpen");
  useStoreProps(store, props, "mounted", "setMounted");
  useStoreProps(store, props, "animated");
  return Object.assign(store, { disclosure: props.disclosure });
}
function useDisclosureStore(props = {}) {
  const [store, update] = useStore(createDisclosureStore, props);
  return useDisclosureStoreProps(store, update, props);
}
var ctx$3 = createStoreContext(
  [CollectionContextProvider],
  [CollectionScopedContextProvider]
);
var useCompositeContext = ctx$3.useContext;
var useCompositeProviderContext = ctx$3.useProviderContext;
var CompositeContextProvider = ctx$3.ContextProvider;
var CompositeScopedContextProvider = ctx$3.ScopedContextProvider;
var CompositeItemContext = reactExports.createContext(
  void 0
);
var CompositeRowContext = reactExports.createContext(
  void 0
);
function findFirstEnabledItem$1(items, excludeId) {
  return items.find((item) => {
    return !item.disabled;
  });
}
function getEnabledItem(store, id) {
  if (!id) return null;
  return store.item(id) || null;
}
function groupItemsByRows$1(items) {
  const rows = [];
  for (const item of items) {
    const row = rows.find((currentRow) => {
      var _a;
      return ((_a = currentRow[0]) == null ? void 0 : _a.rowId) === item.rowId;
    });
    if (row) {
      row.push(item);
    } else {
      rows.push([item]);
    }
  }
  return rows;
}
function selectTextField(element, collapseToEnd = false) {
  if (isTextField(element)) {
    element.setSelectionRange(
      collapseToEnd ? element.value.length : 0,
      element.value.length
    );
  } else if (element.isContentEditable) {
    const selection = getDocument(element).getSelection();
    selection == null ? void 0 : selection.selectAllChildren(element);
    if (collapseToEnd) {
      selection == null ? void 0 : selection.collapseToEnd();
    }
  }
}
var FOCUS_SILENTLY = Symbol("FOCUS_SILENTLY");
function focusSilently(element) {
  element[FOCUS_SILENTLY] = true;
  element.focus({ preventScroll: true });
}
function silentlyFocused(element) {
  const isSilentlyFocused = element[FOCUS_SILENTLY];
  delete element[FOCUS_SILENTLY];
  return isSilentlyFocused;
}
function isItem(store, element, exclude) {
  if (!element) return false;
  if (element === exclude) return false;
  const item = store.item(element.id);
  if (!item) return false;
  return true;
}
var TagName$4 = "button";
function isEditableElement(element) {
  if (isTextbox(element)) return true;
  return element.tagName === "INPUT" && !isButton(element);
}
function getNextPageOffset(scrollingElement, pageUp = false) {
  const height = scrollingElement.clientHeight;
  const { top } = scrollingElement.getBoundingClientRect();
  const pageSize = Math.max(height * 0.875, height - 40) * 1.5;
  const pageOffset = pageUp ? height - pageSize + top : pageSize + top;
  if (scrollingElement.tagName === "HTML") {
    return pageOffset + scrollingElement.scrollTop;
  }
  return pageOffset;
}
function getItemOffset(itemElement, pageUp = false) {
  const { top } = itemElement.getBoundingClientRect();
  if (pageUp) {
    return top + itemElement.clientHeight;
  }
  return top;
}
function findNextPageItemId(element, store, next, pageUp = false) {
  var _a;
  if (!store) return;
  if (!next) return;
  const { renderedItems } = store.getState();
  const scrollingElement = getScrollingElement(element);
  if (!scrollingElement) return;
  const nextPageOffset = getNextPageOffset(scrollingElement, pageUp);
  let id;
  let prevDifference;
  for (let i = 0; i < renderedItems.length; i += 1) {
    const previousId = id;
    id = next(i);
    if (!id) break;
    if (id === previousId) continue;
    const itemElement = (_a = getEnabledItem(store, id)) == null ? void 0 : _a.element;
    if (!itemElement) continue;
    const itemOffset = getItemOffset(itemElement, pageUp);
    const difference = itemOffset - nextPageOffset;
    const absDifference = Math.abs(difference);
    if (pageUp && difference <= 0 || !pageUp && difference >= 0) {
      if (prevDifference !== void 0 && prevDifference < absDifference) {
        id = previousId;
      }
      break;
    }
    prevDifference = absDifference;
  }
  return id;
}
function targetIsAnotherItem(event, store) {
  if (isSelfTarget(event)) return false;
  return isItem(store, event.target);
}
var useCompositeItem = createHook(
  function useCompositeItem2(_a) {
    var _b = _a, {
      store,
      rowId: rowIdProp,
      preventScrollOnKeyDown = false,
      moveOnKeyPress = true,
      tabbable = false,
      getItem: getItemProp,
      "aria-setsize": ariaSetSizeProp,
      "aria-posinset": ariaPosInSetProp
    } = _b, props = __objRest(_b, [
      "store",
      "rowId",
      "preventScrollOnKeyDown",
      "moveOnKeyPress",
      "tabbable",
      "getItem",
      "aria-setsize",
      "aria-posinset"
    ]);
    const context = useCompositeContext();
    store = store || context;
    const id = useId(props.id);
    const ref = reactExports.useRef(null);
    const row = reactExports.useContext(CompositeRowContext);
    const disabled = disabledFromProps(props);
    const trulyDisabled = disabled && !props.accessibleWhenDisabled;
    const {
      rowId,
      baseElement,
      isActiveItem,
      ariaSetSize,
      ariaPosInSet,
      isTabbable: isTabbable2
    } = useStoreStateObject(store, {
      rowId(state) {
        if (rowIdProp) return rowIdProp;
        if (!state) return;
        if (!(row == null ? void 0 : row.baseElement)) return;
        if (row.baseElement !== state.baseElement) return;
        return row.id;
      },
      baseElement(state) {
        return (state == null ? void 0 : state.baseElement) || void 0;
      },
      isActiveItem(state) {
        return !!state && state.activeId === id;
      },
      ariaSetSize(state) {
        if (ariaSetSizeProp != null) return ariaSetSizeProp;
        if (!state) return;
        if (!(row == null ? void 0 : row.ariaSetSize)) return;
        if (row.baseElement !== state.baseElement) return;
        return row.ariaSetSize;
      },
      ariaPosInSet(state) {
        if (ariaPosInSetProp != null) return ariaPosInSetProp;
        if (!state) return;
        if (!(row == null ? void 0 : row.ariaPosInSet)) return;
        if (row.baseElement !== state.baseElement) return;
        const itemsInRow = state.renderedItems.filter(
          (item) => item.rowId === rowId
        );
        return row.ariaPosInSet + itemsInRow.findIndex((item) => item.id === id);
      },
      isTabbable(state) {
        if (!(state == null ? void 0 : state.renderedItems.length)) return true;
        if (state.virtualFocus) return false;
        if (tabbable) return true;
        if (state.activeId === null) return false;
        const item = store == null ? void 0 : store.item(state.activeId);
        if (item == null ? void 0 : item.disabled) return true;
        if (!(item == null ? void 0 : item.element)) return true;
        return state.activeId === id;
      }
    });
    const getItem = reactExports.useCallback(
      (item) => {
        var _a2;
        const nextItem = __spreadProps$1(__spreadValues$1({}, item), {
          id: id || item.id,
          rowId,
          disabled: !!trulyDisabled,
          children: (_a2 = item.element) == null ? void 0 : _a2.textContent
        });
        if (getItemProp) {
          return getItemProp(nextItem);
        }
        return nextItem;
      },
      [id, rowId, trulyDisabled, getItemProp]
    );
    const onFocusProp = props.onFocus;
    const hasFocusedComposite = reactExports.useRef(false);
    const onFocus = useEvent((event) => {
      onFocusProp == null ? void 0 : onFocusProp(event);
      if (event.defaultPrevented) return;
      if (isPortalEvent(event)) return;
      if (!id) return;
      if (!store) return;
      if (targetIsAnotherItem(event, store)) return;
      const { virtualFocus, baseElement: baseElement2 } = store.getState();
      store.setActiveId(id);
      if (isTextbox(event.currentTarget)) {
        selectTextField(event.currentTarget);
      }
      if (!virtualFocus) return;
      if (!isSelfTarget(event)) return;
      if (isEditableElement(event.currentTarget)) return;
      if (!(baseElement2 == null ? void 0 : baseElement2.isConnected)) return;
      if (isSafari() && event.currentTarget.hasAttribute("data-autofocus")) {
        event.currentTarget.scrollIntoView({
          block: "nearest",
          inline: "nearest"
        });
      }
      hasFocusedComposite.current = true;
      const fromComposite = event.relatedTarget === baseElement2 || isItem(store, event.relatedTarget);
      if (fromComposite) {
        focusSilently(baseElement2);
      } else {
        baseElement2.focus();
      }
    });
    const onBlurCaptureProp = props.onBlurCapture;
    const onBlurCapture = useEvent((event) => {
      onBlurCaptureProp == null ? void 0 : onBlurCaptureProp(event);
      if (event.defaultPrevented) return;
      const state = store == null ? void 0 : store.getState();
      if ((state == null ? void 0 : state.virtualFocus) && hasFocusedComposite.current) {
        hasFocusedComposite.current = false;
        event.preventDefault();
        event.stopPropagation();
      }
    });
    const onKeyDownProp = props.onKeyDown;
    const preventScrollOnKeyDownProp = useBooleanEvent(preventScrollOnKeyDown);
    const moveOnKeyPressProp = useBooleanEvent(moveOnKeyPress);
    const onKeyDown = useEvent((event) => {
      onKeyDownProp == null ? void 0 : onKeyDownProp(event);
      if (event.defaultPrevented) return;
      if (!isSelfTarget(event)) return;
      if (!store) return;
      const { currentTarget } = event;
      const state = store.getState();
      const item = store.item(id);
      const isGrid2 = !!(item == null ? void 0 : item.rowId);
      const isVertical = state.orientation !== "horizontal";
      const isHorizontal = state.orientation !== "vertical";
      const canHomeEnd = () => {
        if (isGrid2) return true;
        if (isHorizontal) return true;
        if (!state.baseElement) return true;
        if (!isTextField(state.baseElement)) return true;
        return false;
      };
      const keyMap = {
        ArrowUp: (isGrid2 || isVertical) && store.up,
        ArrowRight: (isGrid2 || isHorizontal) && store.next,
        ArrowDown: (isGrid2 || isVertical) && store.down,
        ArrowLeft: (isGrid2 || isHorizontal) && store.previous,
        Home: () => {
          if (!canHomeEnd()) return;
          if (!isGrid2 || event.ctrlKey) {
            return store == null ? void 0 : store.first();
          }
          return store == null ? void 0 : store.previous(-1);
        },
        End: () => {
          if (!canHomeEnd()) return;
          if (!isGrid2 || event.ctrlKey) {
            return store == null ? void 0 : store.last();
          }
          return store == null ? void 0 : store.next(-1);
        },
        PageUp: () => {
          return findNextPageItemId(currentTarget, store, store == null ? void 0 : store.up, true);
        },
        PageDown: () => {
          return findNextPageItemId(currentTarget, store, store == null ? void 0 : store.down);
        }
      };
      const action = keyMap[event.key];
      if (action) {
        if (isTextbox(currentTarget)) {
          const selection = getTextboxSelection(currentTarget);
          const isLeft = isHorizontal && event.key === "ArrowLeft";
          const isRight = isHorizontal && event.key === "ArrowRight";
          const isUp = isVertical && event.key === "ArrowUp";
          const isDown = isVertical && event.key === "ArrowDown";
          if (isRight || isDown) {
            const { length: valueLength } = getTextboxValue(currentTarget);
            if (selection.end !== valueLength) return;
          } else if ((isLeft || isUp) && selection.start !== 0) return;
        }
        const nextId = action();
        if (preventScrollOnKeyDownProp(event) || nextId !== void 0) {
          if (!moveOnKeyPressProp(event)) return;
          event.preventDefault();
          store.move(nextId);
        }
      }
    });
    const providerValue = reactExports.useMemo(
      () => ({ id, baseElement }),
      [id, baseElement]
    );
    props = useWrapElement(
      props,
      (element) => /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeItemContext.Provider, { value: providerValue, children: element }),
      [providerValue]
    );
    props = __spreadProps$1(__spreadValues$1({
      id,
      "data-active-item": isActiveItem || void 0
    }, props), {
      ref: useMergeRefs(ref, props.ref),
      tabIndex: isTabbable2 ? props.tabIndex : -1,
      onFocus,
      onBlurCapture,
      onKeyDown
    });
    props = useCommand(props);
    props = useCollectionItem(__spreadProps$1(__spreadValues$1({
      store
    }, props), {
      getItem,
      shouldRegisterItem: id ? props.shouldRegisterItem : false
    }));
    return removeUndefinedValues(__spreadProps$1(__spreadValues$1({}, props), {
      "aria-setsize": ariaSetSize,
      "aria-posinset": ariaPosInSet
    }));
  }
);
var CompositeItem = memo2(
  forwardRef2(function CompositeItem2(props) {
    const htmlProps = useCompositeItem(props);
    return createElement(TagName$4, htmlProps);
  })
);
function flatten2DArray(array) {
  const flattened = [];
  for (const row of array) {
    flattened.push(...row);
  }
  return flattened;
}
function reverseArray(array) {
  return array.slice().reverse();
}
var TagName$3 = "div";
function isGrid(items) {
  return items.some((item) => !!item.rowId);
}
function isPrintableKey(event) {
  const target = event.target;
  if (target && !isTextField(target)) return false;
  return event.key.length === 1 && !event.ctrlKey && !event.metaKey;
}
function isModifierKey(event) {
  return event.key === "Shift" || event.key === "Control" || event.key === "Alt" || event.key === "Meta";
}
function useKeyboardEventProxy(store, onKeyboardEvent, previousElementRef) {
  return useEvent((event) => {
    var _a;
    onKeyboardEvent == null ? void 0 : onKeyboardEvent(event);
    if (event.defaultPrevented) return;
    if (event.isPropagationStopped()) return;
    if (!isSelfTarget(event)) return;
    if (isModifierKey(event)) return;
    if (isPrintableKey(event)) return;
    const state = store.getState();
    const activeElement = (_a = getEnabledItem(store, state.activeId)) == null ? void 0 : _a.element;
    if (!activeElement) return;
    const _b = event, { view } = _b, eventInit = __objRest(_b, ["view"]);
    const previousElement = previousElementRef == null ? void 0 : previousElementRef.current;
    if (activeElement !== previousElement) {
      activeElement.focus();
    }
    if (!fireKeyboardEvent(activeElement, event.type, eventInit)) {
      event.preventDefault();
    }
    if (event.currentTarget.contains(activeElement)) {
      event.stopPropagation();
    }
  });
}
function findFirstEnabledItemInTheLastRow(items) {
  return findFirstEnabledItem$1(
    flatten2DArray(reverseArray(groupItemsByRows$1(items)))
  );
}
function useScheduleFocus(store) {
  const [scheduled, setScheduled] = reactExports.useState(false);
  const schedule = reactExports.useCallback(() => setScheduled(true), []);
  const activeItem = store.useState(
    (state) => getEnabledItem(store, state.activeId)
  );
  reactExports.useEffect(() => {
    const activeElement = activeItem == null ? void 0 : activeItem.element;
    if (!scheduled) return;
    if (!activeElement) return;
    setScheduled(false);
    activeElement.focus({ preventScroll: true });
  }, [activeItem, scheduled]);
  return schedule;
}
var useComposite = createHook(
  function useComposite2(_a) {
    var _b = _a, {
      store,
      composite = true,
      focusOnMove = composite,
      moveOnKeyPress = true
    } = _b, props = __objRest(_b, [
      "store",
      "composite",
      "focusOnMove",
      "moveOnKeyPress"
    ]);
    const context = useCompositeProviderContext();
    store = store || context;
    invariant(
      store,
      false
    );
    const ref = reactExports.useRef(null);
    const previousElementRef = reactExports.useRef(null);
    const scheduleFocus = useScheduleFocus(store);
    const moves = store.useState("moves");
    const [, setBaseElement] = useTransactionState(
      composite ? store.setBaseElement : null
    );
    reactExports.useEffect(() => {
      var _a2;
      if (!store) return;
      if (!moves) return;
      if (!composite) return;
      if (!focusOnMove) return;
      const { activeId: activeId2 } = store.getState();
      const itemElement = (_a2 = getEnabledItem(store, activeId2)) == null ? void 0 : _a2.element;
      if (!itemElement) return;
      focusIntoView(itemElement);
    }, [store, moves, composite, focusOnMove]);
    useSafeLayoutEffect(() => {
      if (!store) return;
      if (!moves) return;
      if (!composite) return;
      const { baseElement, activeId: activeId2 } = store.getState();
      const isSelfAcive = activeId2 === null;
      if (!isSelfAcive) return;
      if (!baseElement) return;
      const previousElement = previousElementRef.current;
      previousElementRef.current = null;
      if (previousElement) {
        fireBlurEvent(previousElement, { relatedTarget: baseElement });
      }
      if (!hasFocus(baseElement)) {
        baseElement.focus();
      }
    }, [store, moves, composite]);
    const activeId = store.useState("activeId");
    const virtualFocus = store.useState("virtualFocus");
    useSafeLayoutEffect(() => {
      var _a2;
      if (!store) return;
      if (!composite) return;
      if (!virtualFocus) return;
      const previousElement = previousElementRef.current;
      previousElementRef.current = null;
      if (!previousElement) return;
      const activeElement = (_a2 = getEnabledItem(store, activeId)) == null ? void 0 : _a2.element;
      const relatedTarget = activeElement || getActiveElement(previousElement);
      if (relatedTarget === previousElement) return;
      fireBlurEvent(previousElement, { relatedTarget });
    }, [store, activeId, virtualFocus, composite]);
    const onKeyDownCapture = useKeyboardEventProxy(
      store,
      props.onKeyDownCapture,
      previousElementRef
    );
    const onKeyUpCapture = useKeyboardEventProxy(
      store,
      props.onKeyUpCapture,
      previousElementRef
    );
    const onFocusCaptureProp = props.onFocusCapture;
    const onFocusCapture = useEvent((event) => {
      onFocusCaptureProp == null ? void 0 : onFocusCaptureProp(event);
      if (event.defaultPrevented) return;
      if (!store) return;
      const { virtualFocus: virtualFocus2 } = store.getState();
      if (!virtualFocus2) return;
      const previousActiveElement = event.relatedTarget;
      const isSilentlyFocused = silentlyFocused(event.currentTarget);
      if (isSelfTarget(event) && isSilentlyFocused) {
        event.stopPropagation();
        previousElementRef.current = previousActiveElement;
      }
    });
    const onFocusProp = props.onFocus;
    const onFocus = useEvent((event) => {
      onFocusProp == null ? void 0 : onFocusProp(event);
      if (event.defaultPrevented) return;
      if (!composite) return;
      if (!store) return;
      const { relatedTarget } = event;
      const { virtualFocus: virtualFocus2 } = store.getState();
      if (virtualFocus2) {
        if (isSelfTarget(event) && !isItem(store, relatedTarget)) {
          queueMicrotask(scheduleFocus);
        }
      } else if (isSelfTarget(event)) {
        store.setActiveId(null);
      }
    });
    const onBlurCaptureProp = props.onBlurCapture;
    const onBlurCapture = useEvent((event) => {
      var _a2;
      onBlurCaptureProp == null ? void 0 : onBlurCaptureProp(event);
      if (event.defaultPrevented) return;
      if (!store) return;
      const { virtualFocus: virtualFocus2, activeId: activeId2 } = store.getState();
      if (!virtualFocus2) return;
      const activeElement = (_a2 = getEnabledItem(store, activeId2)) == null ? void 0 : _a2.element;
      const nextActiveElement = event.relatedTarget;
      const nextActiveElementIsItem = isItem(store, nextActiveElement);
      const previousElement = previousElementRef.current;
      previousElementRef.current = null;
      if (isSelfTarget(event) && nextActiveElementIsItem) {
        if (nextActiveElement === activeElement) {
          if (previousElement && previousElement !== nextActiveElement) {
            fireBlurEvent(previousElement, event);
          }
        } else if (activeElement) {
          fireBlurEvent(activeElement, event);
        } else if (previousElement) {
          fireBlurEvent(previousElement, event);
        }
        event.stopPropagation();
      } else {
        const targetIsItem = isItem(store, event.target);
        if (!targetIsItem && activeElement) {
          fireBlurEvent(activeElement, event);
        }
      }
    });
    const onKeyDownProp = props.onKeyDown;
    const moveOnKeyPressProp = useBooleanEvent(moveOnKeyPress);
    const onKeyDown = useEvent((event) => {
      var _a2;
      onKeyDownProp == null ? void 0 : onKeyDownProp(event);
      if (event.nativeEvent.isComposing) return;
      if (event.defaultPrevented) return;
      if (!store) return;
      if (!isSelfTarget(event)) return;
      const { orientation, renderedItems, activeId: activeId2 } = store.getState();
      const activeItem = getEnabledItem(store, activeId2);
      if ((_a2 = activeItem == null ? void 0 : activeItem.element) == null ? void 0 : _a2.isConnected) return;
      const isVertical = orientation !== "horizontal";
      const isHorizontal = orientation !== "vertical";
      const grid = isGrid(renderedItems);
      const isHorizontalKey = event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "Home" || event.key === "End";
      if (isHorizontalKey && isTextField(event.currentTarget)) return;
      const up = () => {
        if (grid) {
          const item = findFirstEnabledItemInTheLastRow(renderedItems);
          return item == null ? void 0 : item.id;
        }
        return store == null ? void 0 : store.last();
      };
      const keyMap = {
        ArrowUp: (grid || isVertical) && up,
        ArrowRight: (grid || isHorizontal) && store.first,
        ArrowDown: (grid || isVertical) && store.first,
        ArrowLeft: (grid || isHorizontal) && store.last,
        Home: store.first,
        End: store.last,
        PageUp: store.first,
        PageDown: store.last
      };
      const action = keyMap[event.key];
      if (action) {
        const id = action();
        if (id !== void 0) {
          if (!moveOnKeyPressProp(event)) return;
          event.preventDefault();
          store.move(id);
        }
      }
    });
    props = useWrapElement(
      props,
      (element) => /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeContextProvider, { value: store, children: element }),
      [store]
    );
    const activeDescendant = store.useState((state) => {
      var _a2;
      if (!store) return;
      if (!composite) return;
      if (!state.virtualFocus) return;
      return (_a2 = getEnabledItem(store, state.activeId)) == null ? void 0 : _a2.id;
    });
    props = __spreadProps$1(__spreadValues$1({
      "aria-activedescendant": activeDescendant
    }, props), {
      ref: useMergeRefs(ref, setBaseElement, props.ref),
      onKeyDownCapture,
      onKeyUpCapture,
      onFocusCapture,
      onFocus,
      onBlurCapture,
      onKeyDown
    });
    const focusable = store.useState(
      (state) => composite && (state.virtualFocus || state.activeId === null)
    );
    props = useFocusable(__spreadValues$1({ focusable }, props));
    return props;
  }
);
forwardRef2(function Composite2(props) {
  const htmlProps = useComposite(props);
  return createElement(TagName$3, htmlProps);
});
var NULL_ITEM = { id: null };
function findFirstEnabledItem(items, excludeId) {
  return items.find((item) => {
    if (excludeId) {
      return !item.disabled && item.id !== excludeId;
    }
    return !item.disabled;
  });
}
function getEnabledItems(items, excludeId) {
  return items.filter((item) => {
    if (excludeId) {
      return !item.disabled && item.id !== excludeId;
    }
    return !item.disabled;
  });
}
function getItemsInRow(items, rowId) {
  return items.filter((item) => item.rowId === rowId);
}
function flipItems(items, activeId, shouldInsertNullItem = false) {
  const index = items.findIndex((item) => item.id === activeId);
  return [
    ...items.slice(index + 1),
    ...shouldInsertNullItem ? [NULL_ITEM] : [],
    ...items.slice(0, index)
  ];
}
function groupItemsByRows(items) {
  const rows = [];
  for (const item of items) {
    const row = rows.find((currentRow) => {
      var _a;
      return ((_a = currentRow[0]) == null ? void 0 : _a.rowId) === item.rowId;
    });
    if (row) {
      row.push(item);
    } else {
      rows.push([item]);
    }
  }
  return rows;
}
function getMaxRowLength(array) {
  let maxLength = 0;
  for (const { length } of array) {
    if (length > maxLength) {
      maxLength = length;
    }
  }
  return maxLength;
}
function createEmptyItem(rowId) {
  return {
    id: "__EMPTY_ITEM__",
    disabled: true,
    rowId
  };
}
function normalizeRows(rows, activeId, focusShift) {
  const maxLength = getMaxRowLength(rows);
  for (const row of rows) {
    for (let i = 0; i < maxLength; i += 1) {
      const item = row[i];
      if (!item || focusShift && item.disabled) {
        const isFirst = i === 0;
        const previousItem = isFirst && focusShift ? findFirstEnabledItem(row) : row[i - 1];
        row[i] = previousItem && activeId !== previousItem.id && focusShift ? previousItem : createEmptyItem(previousItem == null ? void 0 : previousItem.rowId);
      }
    }
  }
  return rows;
}
function verticalizeItems(items) {
  const rows = groupItemsByRows(items);
  const maxLength = getMaxRowLength(rows);
  const verticalized = [];
  for (let i = 0; i < maxLength; i += 1) {
    for (const row of rows) {
      const item = row[i];
      if (item) {
        verticalized.push(__spreadProps(__spreadValues({}, item), {
          // If there's no rowId, it means that it's not a grid composite, but
          // a single row instead. So, instead of verticalizing it, that is,
          // assigning a different rowId based on the column index, we keep it
          // undefined so they will be part of the same row. This is useful
          // when using up/down on one-dimensional composites.
          rowId: item.rowId ? `${i}` : void 0
        }));
      }
    }
  }
  return verticalized;
}
function createCompositeStore(props = {}) {
  var _a;
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const collection = createCollectionStore(props);
  const activeId = defaultValue(
    props.activeId,
    syncState == null ? void 0 : syncState.activeId,
    props.defaultActiveId
  );
  const initialState = __spreadProps(__spreadValues({}, collection.getState()), {
    id: defaultValue(
      props.id,
      syncState == null ? void 0 : syncState.id,
      `id-${Math.random().toString(36).slice(2, 8)}`
    ),
    activeId,
    baseElement: defaultValue(syncState == null ? void 0 : syncState.baseElement, null),
    includesBaseElement: defaultValue(
      props.includesBaseElement,
      syncState == null ? void 0 : syncState.includesBaseElement,
      activeId === null
    ),
    moves: defaultValue(syncState == null ? void 0 : syncState.moves, 0),
    orientation: defaultValue(
      props.orientation,
      syncState == null ? void 0 : syncState.orientation,
      "both"
    ),
    rtl: defaultValue(props.rtl, syncState == null ? void 0 : syncState.rtl, false),
    virtualFocus: defaultValue(
      props.virtualFocus,
      syncState == null ? void 0 : syncState.virtualFocus,
      false
    ),
    focusLoop: defaultValue(props.focusLoop, syncState == null ? void 0 : syncState.focusLoop, false),
    focusWrap: defaultValue(props.focusWrap, syncState == null ? void 0 : syncState.focusWrap, false),
    focusShift: defaultValue(props.focusShift, syncState == null ? void 0 : syncState.focusShift, false)
  });
  const composite = createStore(initialState, collection, props.store);
  setup(
    composite,
    () => sync(composite, ["renderedItems", "activeId"], (state) => {
      composite.setState("activeId", (activeId2) => {
        var _a2;
        if (activeId2 !== void 0) return activeId2;
        return (_a2 = findFirstEnabledItem(state.renderedItems)) == null ? void 0 : _a2.id;
      });
    })
  );
  const getNextId = (direction = "next", options = {}) => {
    var _a2, _b;
    const defaultState = composite.getState();
    const {
      skip = 0,
      activeId: activeId2 = defaultState.activeId,
      focusShift = defaultState.focusShift,
      focusLoop = defaultState.focusLoop,
      focusWrap = defaultState.focusWrap,
      includesBaseElement = defaultState.includesBaseElement,
      renderedItems = defaultState.renderedItems,
      rtl = defaultState.rtl
    } = options;
    const isVerticalDirection = direction === "up" || direction === "down";
    const isNextDirection = direction === "next" || direction === "down";
    const canReverse = isNextDirection ? rtl && !isVerticalDirection : !rtl || isVerticalDirection;
    const canShift = focusShift && !skip;
    let items = !isVerticalDirection ? renderedItems : flatten2DArray(
      normalizeRows(groupItemsByRows(renderedItems), activeId2, canShift)
    );
    items = canReverse ? reverseArray(items) : items;
    items = isVerticalDirection ? verticalizeItems(items) : items;
    if (activeId2 == null) {
      return (_a2 = findFirstEnabledItem(items)) == null ? void 0 : _a2.id;
    }
    const activeItem = items.find((item) => item.id === activeId2);
    if (!activeItem) {
      return (_b = findFirstEnabledItem(items)) == null ? void 0 : _b.id;
    }
    const isGrid2 = items.some((item) => item.rowId);
    const activeIndex = items.indexOf(activeItem);
    const nextItems = items.slice(activeIndex + 1);
    const nextItemsInRow = getItemsInRow(nextItems, activeItem.rowId);
    if (skip) {
      const nextEnabledItemsInRow = getEnabledItems(nextItemsInRow, activeId2);
      const nextItem2 = nextEnabledItemsInRow.slice(skip)[0] || // If we can't find an item, just return the last one.
      nextEnabledItemsInRow[nextEnabledItemsInRow.length - 1];
      return nextItem2 == null ? void 0 : nextItem2.id;
    }
    const canLoop = focusLoop && (isVerticalDirection ? focusLoop !== "horizontal" : focusLoop !== "vertical");
    const canWrap = isGrid2 && focusWrap && (isVerticalDirection ? focusWrap !== "horizontal" : focusWrap !== "vertical");
    const hasNullItem = isNextDirection ? (!isGrid2 || isVerticalDirection) && canLoop && includesBaseElement : isVerticalDirection ? includesBaseElement : false;
    if (canLoop) {
      const loopItems = canWrap && !hasNullItem ? items : getItemsInRow(items, activeItem.rowId);
      const sortedItems = flipItems(loopItems, activeId2, hasNullItem);
      const nextItem2 = findFirstEnabledItem(sortedItems, activeId2);
      return nextItem2 == null ? void 0 : nextItem2.id;
    }
    if (canWrap) {
      const nextItem2 = findFirstEnabledItem(
        // We can use nextItems, which contains all the next items, including
        // items from other rows, to wrap between rows. However, if there is a
        // null item (the composite container), we'll only use the next items in
        // the row. So moving next from the last item will focus on the
        // composite container. On grid composites, horizontal navigation never
        // focuses on the composite container, only vertical.
        hasNullItem ? nextItemsInRow : nextItems,
        activeId2
      );
      const nextId = hasNullItem ? (nextItem2 == null ? void 0 : nextItem2.id) || null : nextItem2 == null ? void 0 : nextItem2.id;
      return nextId;
    }
    const nextItem = findFirstEnabledItem(nextItemsInRow, activeId2);
    if (!nextItem && hasNullItem) {
      return null;
    }
    return nextItem == null ? void 0 : nextItem.id;
  };
  return __spreadProps(__spreadValues(__spreadValues({}, collection), composite), {
    setBaseElement: (element) => composite.setState("baseElement", element),
    setActiveId: (id) => composite.setState("activeId", id),
    move: (id) => {
      if (id === void 0) return;
      composite.setState("activeId", id);
      composite.setState("moves", (moves) => moves + 1);
    },
    first: () => {
      var _a2;
      return (_a2 = findFirstEnabledItem(composite.getState().renderedItems)) == null ? void 0 : _a2.id;
    },
    last: () => {
      var _a2;
      return (_a2 = findFirstEnabledItem(reverseArray(composite.getState().renderedItems))) == null ? void 0 : _a2.id;
    },
    next: (options) => {
      if (options !== void 0 && typeof options === "number") {
        options = { skip: options };
      }
      return getNextId("next", options);
    },
    previous: (options) => {
      if (options !== void 0 && typeof options === "number") {
        options = { skip: options };
      }
      return getNextId("previous", options);
    },
    down: (options) => {
      if (options !== void 0 && typeof options === "number") {
        options = { skip: options };
      }
      return getNextId("down", options);
    },
    up: (options) => {
      if (options !== void 0 && typeof options === "number") {
        options = { skip: options };
      }
      return getNextId("up", options);
    }
  });
}
function useCompositeStoreProps(store, update, props) {
  store = useCollectionStoreProps(store, update, props);
  useStoreProps(store, props, "activeId", "setActiveId");
  useStoreProps(store, props, "includesBaseElement");
  useStoreProps(store, props, "virtualFocus");
  useStoreProps(store, props, "orientation");
  useStoreProps(store, props, "rtl");
  useStoreProps(store, props, "focusLoop");
  useStoreProps(store, props, "focusWrap");
  useStoreProps(store, props, "focusShift");
  return store;
}
reactExports.createContext(
  void 0
);
var ctx$2 = createStoreContext(
  [PopoverContextProvider, CompositeContextProvider],
  [PopoverScopedContextProvider, CompositeScopedContextProvider]
);
var useComboboxContext = ctx$2.useContext;
reactExports.createContext(
  void 0
);
reactExports.createContext(false);
var ctx$1 = createStoreContext(
  [CompositeContextProvider],
  [CompositeScopedContextProvider]
);
var useTabScopedContext = ctx$1.useScopedContext;
var useTabProviderContext = ctx$1.useProviderContext;
var TabContextProvider = ctx$1.ContextProvider;
var TabScopedContextProvider = ctx$1.ScopedContextProvider;
var TagName$2 = "button";
var useTab = createHook(function useTab2(_a) {
  var _b = _a, {
    store,
    getItem: getItemProp
  } = _b, props = __objRest(_b, [
    "store",
    "getItem"
  ]);
  var _a2;
  const context = useTabScopedContext();
  store = store || context;
  invariant(
    store,
    false
  );
  const defaultId = useId();
  const id = props.id || defaultId;
  const dimmed = disabledFromProps(props);
  const getItem = reactExports.useCallback(
    (item) => {
      const nextItem = __spreadProps$1(__spreadValues$1({}, item), { dimmed });
      if (getItemProp) {
        return getItemProp(nextItem);
      }
      return nextItem;
    },
    [dimmed, getItemProp]
  );
  const onClickProp = props.onClick;
  const onClick = useEvent((event) => {
    onClickProp == null ? void 0 : onClickProp(event);
    if (event.defaultPrevented) return;
    store == null ? void 0 : store.setSelectedId(id);
  });
  const panelId = store.panels.useState(
    (state) => {
      var _a3;
      return (_a3 = state.items.find((item) => item.tabId === id)) == null ? void 0 : _a3.id;
    }
  );
  const shouldRegisterItem = defaultId ? props.shouldRegisterItem : false;
  const isActive = store.useState((state) => !!id && state.activeId === id);
  const selected = store.useState((state) => !!id && state.selectedId === id);
  const hasActiveItem = store.useState((state) => !!store.item(state.activeId));
  const canRegisterComposedItem = isActive || selected && !hasActiveItem;
  const accessibleWhenDisabled = selected || ((_a2 = props.accessibleWhenDisabled) != null ? _a2 : true);
  const isWithinVirtualFocusComposite = useStoreState(
    store.combobox || store.composite,
    "virtualFocus"
  );
  if (isWithinVirtualFocusComposite) {
    props = __spreadProps$1(__spreadValues$1({}, props), {
      tabIndex: -1
    });
  }
  props = __spreadProps$1(__spreadValues$1({
    id,
    role: "tab",
    "aria-selected": selected,
    "aria-controls": panelId || void 0
  }, props), {
    onClick
  });
  if (store.composite) {
    const defaultProps = {
      id,
      accessibleWhenDisabled,
      store: store.composite,
      shouldRegisterItem: canRegisterComposedItem && shouldRegisterItem,
      rowId: props.rowId,
      render: props.render
    };
    props = __spreadProps$1(__spreadValues$1({}, props), {
      render: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CompositeItem,
        __spreadProps$1(__spreadValues$1({}, defaultProps), {
          render: store.combobox && store.composite !== store.combobox ? /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeItem, __spreadProps$1(__spreadValues$1({}, defaultProps), { store: store.combobox })) : defaultProps.render
        })
      )
    });
  }
  props = useCompositeItem(__spreadProps$1(__spreadValues$1({
    store
  }, props), {
    accessibleWhenDisabled,
    getItem,
    shouldRegisterItem
  }));
  return props;
});
var Tab$1 = memo2(
  forwardRef2(function Tab2(props) {
    const htmlProps = useTab(props);
    return createElement(TagName$2, htmlProps);
  })
);
var TagName$1 = "div";
var useTabList = createHook(
  function useTabList2(_a) {
    var _b = _a, { store } = _b, props = __objRest(_b, ["store"]);
    const context = useTabProviderContext();
    store = store || context;
    invariant(
      store,
      false
    );
    const orientation = store.useState(
      (state) => state.orientation === "both" ? void 0 : state.orientation
    );
    props = useWrapElement(
      props,
      (element) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabScopedContextProvider, { value: store, children: element }),
      [store]
    );
    if (store.composite) {
      props = __spreadValues$1({
        focusable: false
      }, props);
    }
    props = __spreadValues$1({
      role: "tablist",
      "aria-orientation": orientation
    }, props);
    props = useComposite(__spreadValues$1({ store }, props));
    return props;
  }
);
var TabList$1 = forwardRef2(function TabList2(props) {
  const htmlProps = useTabList(props);
  return createElement(TagName$1, htmlProps);
});
var TagName = "div";
var useTabPanel = createHook(
  function useTabPanel2(_a) {
    var _b = _a, {
      store,
      unmountOnHide,
      tabId: tabIdProp,
      getItem: getItemProp,
      scrollRestoration,
      scrollElement
    } = _b, props = __objRest(_b, [
      "store",
      "unmountOnHide",
      "tabId",
      "getItem",
      "scrollRestoration",
      "scrollElement"
    ]);
    const context = useTabProviderContext();
    store = store || context;
    invariant(
      store,
      false
    );
    const ref = reactExports.useRef(null);
    const id = useId(props.id);
    const tabId = useStoreState(
      store.panels,
      () => {
        var _a2;
        return tabIdProp || ((_a2 = store == null ? void 0 : store.panels.item(id)) == null ? void 0 : _a2.tabId);
      }
    );
    const open = useStoreState(
      store,
      (state) => !!tabId && state.selectedId === tabId
    );
    const disclosure = useDisclosureStore({ open });
    const mounted = useStoreState(disclosure, "mounted");
    const scrollPositionRef = reactExports.useRef(
      /* @__PURE__ */ new Map()
    );
    const getScrollElement = useEvent(() => {
      const panelElement = ref.current;
      if (!panelElement) return null;
      if (!scrollElement) return panelElement;
      if (typeof scrollElement === "function") {
        return scrollElement(panelElement);
      }
      if ("current" in scrollElement) {
        return scrollElement.current;
      }
      return scrollElement;
    });
    reactExports.useEffect(() => {
      var _a2, _b2;
      if (!scrollRestoration) return;
      if (!mounted) return;
      const element = getScrollElement();
      if (!element) return;
      if (scrollRestoration === "reset") {
        element.scroll(0, 0);
        return;
      }
      if (!tabId) return;
      const position = scrollPositionRef.current.get(tabId);
      element.scroll((_a2 = position == null ? void 0 : position.x) != null ? _a2 : 0, (_b2 = position == null ? void 0 : position.y) != null ? _b2 : 0);
      const onScroll = () => {
        scrollPositionRef.current.set(tabId, {
          x: element.scrollLeft,
          y: element.scrollTop
        });
      };
      element.addEventListener("scroll", onScroll);
      return () => {
        element.removeEventListener("scroll", onScroll);
      };
    }, [scrollRestoration, mounted, tabId, getScrollElement, store]);
    const [hasTabbableChildren, setHasTabbableChildren] = reactExports.useState(false);
    reactExports.useEffect(() => {
      const element = ref.current;
      if (!element) return;
      const tabbable = getAllTabbableIn(element);
      setHasTabbableChildren(!!tabbable.length);
    }, []);
    const getItem = reactExports.useCallback(
      (item) => {
        const nextItem = __spreadProps$1(__spreadValues$1({}, item), { id: id || item.id, tabId: tabIdProp });
        if (getItemProp) {
          return getItemProp(nextItem);
        }
        return nextItem;
      },
      [id, tabIdProp, getItemProp]
    );
    const onKeyDownProp = props.onKeyDown;
    const onKeyDown = useEvent((event) => {
      onKeyDownProp == null ? void 0 : onKeyDownProp(event);
      if (event.defaultPrevented) return;
      if (!(store == null ? void 0 : store.composite)) return;
      const keyMap = {
        ArrowLeft: store.previous,
        ArrowRight: store.next,
        Home: store.first,
        End: store.last
      };
      const action = keyMap[event.key];
      if (!action) return;
      const { selectedId } = store.getState();
      const nextId = action({ activeId: selectedId });
      if (!nextId) return;
      event.preventDefault();
      store.move(nextId);
    });
    props = useWrapElement(
      props,
      (element) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabScopedContextProvider, { value: store, children: element }),
      [store]
    );
    props = __spreadProps$1(__spreadValues$1({
      id,
      role: "tabpanel",
      "aria-labelledby": tabId || void 0
    }, props), {
      children: unmountOnHide && !mounted ? null : props.children,
      ref: useMergeRefs(ref, props.ref),
      onKeyDown
    });
    props = useFocusable(__spreadValues$1({
      // If the tab panel is rendered as part of another composite widget such
      // as combobox, it should not be focusable.
      focusable: !store.composite && !hasTabbableChildren
    }, props));
    props = useDisclosureContent(__spreadValues$1({ store: disclosure }, props));
    props = useCollectionItem(__spreadProps$1(__spreadValues$1({ store: store.panels }, props), { getItem }));
    return props;
  }
);
var TabPanel$1 = forwardRef2(function TabPanel2(props) {
  const htmlProps = useTabPanel(props);
  return createElement(TagName, htmlProps);
});
var ctx = createStoreContext(
  [PopoverContextProvider, CompositeContextProvider],
  [PopoverScopedContextProvider, CompositeScopedContextProvider]
);
var useSelectContext = ctx.useContext;
reactExports.createContext(false);
reactExports.createContext(null);
function createTabStore(_a = {}) {
  var _b = _a, {
    composite: parentComposite,
    combobox
  } = _b, props = __objRest$1(_b, [
    "composite",
    "combobox"
  ]);
  const independentKeys = [
    "items",
    "renderedItems",
    "moves",
    "orientation",
    "virtualFocus",
    "includesBaseElement",
    "baseElement",
    "focusLoop",
    "focusShift",
    "focusWrap"
  ];
  const store = mergeStore(
    props.store,
    omit2(parentComposite, independentKeys),
    omit2(combobox, independentKeys)
  );
  const syncState = store == null ? void 0 : store.getState();
  const composite = createCompositeStore(__spreadProps(__spreadValues({}, props), {
    store,
    // We need to explicitly set the default value of `includesBaseElement` to
    // `false` since we don't want the composite store to default it to `true`
    // when the activeId state is null, which could be the case when rendering
    // combobox with tab.
    includesBaseElement: defaultValue(
      props.includesBaseElement,
      syncState == null ? void 0 : syncState.includesBaseElement,
      false
    ),
    orientation: defaultValue(
      props.orientation,
      syncState == null ? void 0 : syncState.orientation,
      "horizontal"
    ),
    focusLoop: defaultValue(props.focusLoop, syncState == null ? void 0 : syncState.focusLoop, true)
  }));
  const panels = createCollectionStore();
  const initialState = __spreadProps(__spreadValues({}, composite.getState()), {
    selectedId: defaultValue(
      props.selectedId,
      syncState == null ? void 0 : syncState.selectedId,
      props.defaultSelectedId
    ),
    selectOnMove: defaultValue(
      props.selectOnMove,
      syncState == null ? void 0 : syncState.selectOnMove,
      true
    )
  });
  const tab = createStore(initialState, composite, store);
  setup(
    tab,
    () => sync(tab, ["moves"], () => {
      const { activeId, selectOnMove } = tab.getState();
      if (!selectOnMove) return;
      if (!activeId) return;
      const tabItem = composite.item(activeId);
      if (!tabItem) return;
      if (tabItem.dimmed) return;
      if (tabItem.disabled) return;
      tab.setState("selectedId", tabItem.id);
    })
  );
  let syncActiveId = true;
  setup(
    tab,
    () => batch(tab, ["selectedId"], (state, prev) => {
      if (!syncActiveId) {
        syncActiveId = true;
        return;
      }
      if (parentComposite && state.selectedId === prev.selectedId) return;
      tab.setState("activeId", state.selectedId);
    })
  );
  setup(
    tab,
    () => sync(tab, ["selectedId", "renderedItems"], (state) => {
      if (state.selectedId !== void 0) return;
      const { activeId, renderedItems } = tab.getState();
      const tabItem = composite.item(activeId);
      if (tabItem && !tabItem.disabled && !tabItem.dimmed) {
        tab.setState("selectedId", tabItem.id);
      } else {
        const tabItem2 = renderedItems.find(
          (item) => !item.disabled && !item.dimmed
        );
        tab.setState("selectedId", tabItem2 == null ? void 0 : tabItem2.id);
      }
    })
  );
  setup(
    tab,
    () => sync(tab, ["renderedItems"], (state) => {
      const tabs2 = state.renderedItems;
      if (!tabs2.length) return;
      return sync(panels, ["renderedItems"], (state2) => {
        const items = state2.renderedItems;
        const hasOrphanPanels = items.some((panel) => !panel.tabId);
        if (!hasOrphanPanels) return;
        items.forEach((panel, i) => {
          if (panel.tabId) return;
          const tabItem = tabs2[i];
          if (!tabItem) return;
          panels.renderItem(__spreadProps(__spreadValues({}, panel), { tabId: tabItem.id }));
        });
      });
    })
  );
  let selectedIdFromSelectedValue = null;
  setup(tab, () => {
    const backupSelectedId = () => {
      selectedIdFromSelectedValue = tab.getState().selectedId;
    };
    const restoreSelectedId = () => {
      syncActiveId = false;
      tab.setState("selectedId", selectedIdFromSelectedValue);
    };
    if (parentComposite && "setSelectElement" in parentComposite) {
      return chain(
        sync(parentComposite, ["value"], backupSelectedId),
        sync(parentComposite, ["mounted"], restoreSelectedId)
      );
    }
    if (!combobox) return;
    return chain(
      sync(combobox, ["selectedValue"], backupSelectedId),
      sync(combobox, ["mounted"], restoreSelectedId)
    );
  });
  return __spreadProps(__spreadValues(__spreadValues({}, composite), tab), {
    panels,
    setSelectedId: (id) => tab.setState("selectedId", id),
    select: (id) => {
      tab.setState("selectedId", id);
      composite.move(id);
    }
  });
}
function useTabStoreProps(store, update, props) {
  useUpdateEffect(update, [props.composite, props.combobox]);
  store = useCompositeStoreProps(store, update, props);
  useStoreProps(store, props, "selectedId", "setSelectedId");
  useStoreProps(store, props, "selectOnMove");
  const [panels, updatePanels] = useStore(() => store.panels, {});
  useUpdateEffect(updatePanels, [store, updatePanels]);
  return Object.assign(
    reactExports.useMemo(() => __spreadProps$1(__spreadValues$1({}, store), { panels }), [store, panels]),
    { composite: props.composite, combobox: props.combobox }
  );
}
function useTabStore(props = {}) {
  const combobox = useComboboxContext();
  const composite = useSelectContext() || combobox;
  props = __spreadProps$1(__spreadValues$1({}, props), {
    composite: props.composite !== void 0 ? props.composite : composite,
    combobox: props.combobox !== void 0 ? props.combobox : combobox
  });
  const [store, update] = useStore(createTabStore, props);
  return useTabStoreProps(store, update, props);
}
function TabProvider(props = {}) {
  const store = useTabStore(props);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TabContextProvider, { value: store, children: props.children });
}
const supportsAnchorPositioning = isBrowser && CSS?.supports("anchor-name: --foo");
const prefersReducedMotion = () => isBrowser && window.matchMedia("(prefers-reduced-motion)").matches;
function TabsProvider(props) {
  const {
    defaultSelectedId,
    selectedId,
    setSelectedId,
    selectOnMove = false,
    children
  } = props;
  const store = useTabStore({ defaultSelectedId });
  const tablist = useStoreState(store, "baseElement");
  const selectedIdFromStore = useStoreState(store, "selectedId");
  const flipAnimateStripe = (newSelectedId) => {
    if (!supportsAnchorPositioning) return;
    const rootNode = tablist?.getRootNode();
    if (!rootNode || !selectedIdFromStore || !newSelectedId) return;
    const previousTabRect = rootNode.getElementById?.(selectedIdFromStore)?.getBoundingClientRect();
    const nextTabRect = rootNode.getElementById?.(newSelectedId)?.getBoundingClientRect();
    if (!previousTabRect || !nextTabRect) return;
    const deltaX = previousTabRect.left - nextTabRect.left;
    const deltaWidth = previousTabRect.width / nextTabRect.width;
    tablist?.animate(
      [
        { transform: `translateX(${deltaX}px) scaleX(${deltaWidth})` },
        { transform: "none" }
      ],
      {
        pseudoElement: "::after",
        duration: 150,
        easing: "ease-in-out"
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TabProvider,
    {
      store,
      selectedId,
      setSelectedId: useUnreactiveCallback(
        (newSelectedId) => {
          if (!prefersReducedMotion()) flipAnimateStripe(newSelectedId);
          setSelectedId?.(newSelectedId);
        }
      ),
      selectOnMove,
      children
    }
  );
}
const TabList = forwardRef((props, forwardedRef) => {
  const { tone = "neutral", ...rest } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TabList$1,
    {
      ...rest,
      "data-_sk-tone": tone,
      className: classnames("🥝TabList", props.className),
      ref: forwardedRef
    }
  );
});
const Tab = forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Tab$1,
    {
      accessibleWhenDisabled: true,
      ...props,
      className: classnames("🥝Tab", props.className),
      ref: forwardedRef
    }
  );
});
const TabPanel = forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TabPanel$1,
    {
      ...props,
      className: classnames("🥝TabPanel", props.className),
      ref: forwardedRef
    }
  );
});
const isHTMLElement = (message) => {
  return message instanceof HTMLElement && message.outerHTML !== void 0;
};
const isReactNode = (message) => {
  return reactExports.isValidElement(message) || typeof message === "object" && message !== null && !isHTMLElement(message);
};
const validateAnchors = (element) => {
  const anchors = element.querySelectorAll('a[target="_blank"]');
  return Array.from(anchors).every((anchor) => {
    const rel = anchor.getAttribute("rel");
    return rel && (rel.includes("noopener") || rel.includes("noreferrer"));
  });
};
const isValidMainAnchor = (element) => {
  if (element.tagName === "A" && element.getAttribute("target") === "_blank") {
    const rel = element.getAttribute("rel");
    return rel !== null && (rel.includes("noopener") || rel.includes("noreferrer"));
  }
  return true;
};
function MessageRenderer(props) {
  const { message, className, inline = false } = props;
  const getHtmlUnderlyingElement = () => inline ? reactExports.createElement("span", null) : reactExports.createElement("div", null);
  if (typeof message === "string") {
    return reactExports.createElement(Text_default, { className, render: getHtmlUnderlyingElement(), variant: "body-sm" }, message);
  }
  if (isHTMLElement(message)) {
    const hasValidAnchors = isValidMainAnchor(message) && validateAnchors(message);
    const sanitizedHtml = hasValidAnchors ? purify.sanitize(message.outerHTML, { ADD_ATTR: ["target"] }) : purify.sanitize(message.outerHTML);
    return reactExports.createElement(Text_default, {
      render: getHtmlUnderlyingElement(),
      className,
      variant: "body-sm",
      // we can safely disable jam3/no-sanitizer-with-danger as we are sanitizing above
      // eslint-disable-next-line jam3/no-sanitizer-with-danger
      dangerouslySetInnerHTML: { __html: sanitizedHtml }
    });
  }
  if (isReactNode(message)) {
    return reactExports.createElement(Text_default, { render: getHtmlUnderlyingElement(), className, variant: "body-sm" }, message);
  }
  return null;
}
function MessageCenterMessage(props) {
  const { icon, message, details, style, className } = props;
  return reactExports.createElement(
    "div",
    { className: "uifw-statusFields-messageCenter-messageCenterMessage", style },
    icon,
    message && reactExports.createElement(
      "span",
      { className: "uifw-content" },
      reactExports.createElement(MessageRenderer, { message, className, inline: true }),
      ".",
      details && reactExports.createElement(
        Text_default,
        { variant: "body-sm" },
        reactExports.createElement(MessageRenderer, { message: details })
      )
    )
  );
}
function TitleBar$1({ classNames, style, title, children }) {
  const className = classnames("sk-footer-dialog-titleBar", classNames);
  return reactExports.createElement(
    "div",
    { className, style },
    reactExports.createElement(Text_default, { variant: "body-lg", render: reactExports.createElement("span", null), className: "sk-title" }, title),
    children
  );
}
const tabs = ["all", "errors"];
function MessageCenterField() {
  const [messages, setMessages] = reactExports.useState(MessageManager$1.messages);
  const [notify, setNotify] = reactExports.useState(false);
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [status, setStatus] = reactExports.useState("primary");
  const { translate } = useTranslation$1();
  const indicatorRef = reactExports.useRef(null);
  const handleOpenChange = (isOpenState) => {
    setNotify(false);
    setIsOpen(isOpenState);
  };
  const isErrorMessage = (message) => {
    return message.priority === OutputMessagePriority.Error || message.priority === OutputMessagePriority.Fatal;
  };
  reactExports.useEffect(() => {
    return MessageManager$1.onOpenMessageCenterEvent.addListener(() => {
      handleOpenChange(true);
    });
  }, []);
  reactExports.useEffect(() => {
    MessageManager$1.registerAnimateOutToElement(indicatorRef.current);
    return MessageManager$1.onMessagesUpdatedEvent.addListener(() => {
      const newMessages = MessageManager$1.messages;
      newMessages.length > 0 ? setNotify(true) : setNotify(false);
      setMessages([...newMessages]);
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
  function renderPopoverContent() {
    return reactExports.createElement(
      reactExports.Fragment,
      null,
      reactExports.createElement(TitleBar$1, { title: translate("messageCenter.messages") }),
      reactExports.createElement(
        TabsProvider,
        null,
        reactExports.createElement(TabList, { tone: "accent" }, tabs.map((tab) => reactExports.createElement(Tab, { id: `message-center-tab-${tab}`, key: tab }, translate(`messageCenter.${tab}`)))),
        tabs.map((tab) => {
          let tabMessages = [...messages].reverse();
          tabMessages = tab === "errors" ? tabMessages.filter(isErrorMessage) : tabMessages;
          return reactExports.createElement(TabPanel, { tabId: `message-center-tab-${tab}`, key: tab, className: "uifw-statusFields-messageCenter-messageCenterField_sk_panel" }, tabMessages.length === 0 ? reactExports.createElement("span", { className: "uifw-message-prompt" }, translate("messageCenter.prompt")) : tabMessages.map((message, index) => {
            return reactExports.createElement(MessageCenterMessage, { key: index, message: message.briefMessage, details: message.detailedMessage, icon: reactExports.createElement(MessageIcon, { priority: message.priority }) });
          }));
        })
      )
    );
  }
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(
      StatusBarPopover$1,
      { visible: isOpen, onVisibleChange: (visible) => handleOpenChange(visible), className: "uifw-statusFields-messageCenter-messageCenterField_sk_popover", content: renderPopoverContent() },
      reactExports.createElement(
        Button_default,
        { ref: indicatorRef, variant: "ghost", className: `uifw-statusFields-messageCenter-messageCenterField_sk_button ${isOpen ? "pressed" : ""}` },
        reactExports.createElement(
          NotificationMarker,
          { status, enabled: notify },
          reactExports.createElement(SvgChat, null)
        ),
        translate("messageCenter.messages"),
        reactExports.createElement(StatusBarPopover$1.ExpandIndicator, null)
      )
    )
  );
}
function MessageIcon({ priority }) {
  switch (priority) {
    case OutputMessagePriority.Error:
    case OutputMessagePriority.Fatal:
      return reactExports.createElement(SvgStatusError, null);
    case OutputMessagePriority.Warning:
      return reactExports.createElement(SvgStatusWarning, null);
    case OutputMessagePriority.Info:
      return reactExports.createElement(SvgInfo, null);
  }
  return reactExports.createElement(SvgStatusSuccess, null);
}
class PropsHelper {
  /** Get spec for returning a string. Could be a simple string of a 'StringGetter' method used to return the string. */
  static getStringSpec(explicitValue, stringKey) {
    if (explicitValue) {
      return explicitValue;
    }
    const outValue = stringKey ? IModelApp.localization.getLocalizedString(stringKey) : "";
    return outValue;
  }
  /** Get the display string. */
  static getStringFromSpec(spec) {
    let label2 = "";
    if (typeof spec === "string") label2 = spec;
    else if (spec instanceof ConditionalStringValue) label2 = spec.value;
    else label2 = spec();
    return label2;
  }
  /** Get JSX element that defines an icon. If iconSpec is a string, then a web-font icon class is used otherwise a ReactNode holding an SVG icon is assumed. */
  static getIcon(iconSpec) {
    if (iconSpec instanceof ConditionalStringValue)
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$2, { iconSpec: iconSpec.value });
    return iconSpec ? /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$2, { iconSpec }) : void 0;
  }
  /** returns true if the two objects are the same using a shallow compare of each property */
  static isShallowEqual(newObj, prevObj) {
    for (const key in newObj) {
      if (newObj[key] !== prevObj[key]) return false;
    }
    return true;
  }
  /** @deprecated in 4.0 These abstract props types are obsolete. */
  static getAbstractPropsForReactIcon(iconSpec, internalData) {
    if (!iconSpec || !reactExports.isValidElement(iconSpec)) return {};
    if (!internalData) internalData = /* @__PURE__ */ new Map();
    const icon = IconHelper.getIconData(iconSpec, internalData);
    return icon === "" ? { icon } : { icon, internalData };
  }
}
class ItemDefBase {
  _label = "";
  _tooltip = "";
  _description = "";
  isPressed = false;
  _isActive = false;
  get isActive() {
    return this._isActive;
  }
  set isActive(v) {
    this._isActive = v;
  }
  applicationData;
  isHidden;
  isDisabled;
  /** @deprecated in 4.16.0. Use `badgeKind` property instead. */
  badgeType;
  badgeKind;
  iconSpec;
  iconElement;
  static initializeDef(me, itemProps) {
    me.isHidden = itemProps.isHidden;
    me.isDisabled = itemProps.isDisabled;
    me.isPressed = itemProps.isPressed !== void 0 ? itemProps.isPressed : false;
    me.isActive = itemProps.isActive !== void 0 ? itemProps.isActive : false;
    me.badgeType = itemProps.badgeType;
    me.badgeKind = itemProps.badgeKind;
    if (itemProps.applicationData !== void 0)
      me.applicationData = itemProps.applicationData;
    if (itemProps.iconSpec) me.iconSpec = itemProps.iconSpec;
    if (itemProps.icon) me.iconSpec = itemProps.icon;
    me._label = PropsHelper.getStringSpec(itemProps.label, itemProps.labelKey);
    me._tooltip = PropsHelper.getStringSpec(
      itemProps.tooltip,
      itemProps.tooltipKey
    );
    me._description = PropsHelper.getStringSpec(
      itemProps.description,
      itemProps.descriptionKey
    );
  }
  constructor(itemProps) {
    ItemDefBase.initializeDef(this, itemProps);
  }
  get trayId() {
    return void 0;
  }
  /** Get the label string */
  get rawLabel() {
    return this._label;
  }
  /** Get the label string */
  get label() {
    return PropsHelper.getStringFromSpec(this._label);
  }
  /** Set the label.
   * @param v A string or a function to get the string.
   */
  setLabel(v) {
    this._label = v;
  }
  /** Get the tooltip string */
  get tooltip() {
    return PropsHelper.getStringFromSpec(this._tooltip);
  }
  /** Set the tooltip.
   * @param v A string or a function to get the string.
   */
  setTooltip(v) {
    this._tooltip = v;
  }
  /** Get the description string */
  get description() {
    return PropsHelper.getStringFromSpec(this._description);
  }
  /** Set the description.
   * @param v A string or a function to get the string.
   */
  setDescription(v) {
    this._description = v;
  }
}
class ActionButtonItemDef extends ItemDefBase {
  _onItemExecuted;
  /** Command Handler for the action button */
  _commandHandler;
  /** Parameters passed to the Command Handler */
  parameters;
  /** Size of the action button, as set by handleSizeKnown */
  size;
  /** The default button size for all action buttons */
  static defaultButtonSize = 42;
  constructor(itemProps, onItemExecuted) {
    super(itemProps);
    this.execute = this.execute.bind(this);
    this._onItemExecuted = onItemExecuted;
  }
  /** Called when the action button is invoked by a click or touch */
  execute() {
    if (this._commandHandler && this._commandHandler.execute) {
      if (this._commandHandler.getCommandArgs)
        this._commandHandler.execute(this._commandHandler.getCommandArgs());
      else this._commandHandler.execute(this._commandHandler.parameters);
    }
    if (this._onItemExecuted) this._onItemExecuted(this);
  }
  /** Called when the size of the action button is initialized and the size is known */
  handleSizeKnown = (size) => {
    this.size = size;
  };
  /** Determines the dimension in a given orientation */
  getDimension(orientation) {
    let dimension = ActionButtonItemDef.defaultButtonSize;
    if (this.size)
      dimension = orientation === Orientation.Horizontal ? this.size.width : this.size.height;
    return dimension;
  }
}
class CommandItemDef extends ActionButtonItemDef {
  static _sId = 0;
  static commandIdPrefix = "Command-";
  commandId = "";
  constructor(commandItemProps, onItemExecuted) {
    super(commandItemProps, onItemExecuted);
    if (commandItemProps.execute) {
      this._commandHandler = {
        execute: commandItemProps.execute,
        parameters: commandItemProps.parameters,
        getCommandArgs: commandItemProps.getCommandArgs
      };
    }
    if (commandItemProps.commandId) this.commandId = commandItemProps.commandId;
    else {
      CommandItemDef._sId++;
      this.commandId = CommandItemDef.commandIdPrefix + CommandItemDef._sId;
    }
  }
  get id() {
    return this.commandId;
  }
}
class InternalBackstageManager {
  _isOpen = false;
  /** Event raised when backstage is opened or closed. */
  onToggled = new BeEvent();
  get isOpen() {
    return this._isOpen;
  }
  setIsOpen(isOpen) {
    if (isOpen === this._isOpen) return;
    this._isOpen = isOpen;
    this.onToggled.raiseEvent({
      isOpen
    });
  }
  open() {
    this.setIsOpen(true);
  }
  close() {
    this.setIsOpen(false);
  }
  toggle() {
    this.setIsOpen(!this.isOpen);
  }
  /** Get CommandItemDef that will toggle display of Backstage and allow iconSpec to be overridden */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  getBackstageToggleCommand(overrideIconSpec) {
    return new CommandItemDef({
      commandId: "UiFramework.openBackstage",
      iconSpec: overrideIconSpec ? overrideIconSpec : "icon-home",
      labelKey: "UiFramework:buttons.openBackstageMenu",
      execute: () => {
        UiFramework.backstage.toggle();
      }
    });
  }
}
class BackstageManager {
  internal = new InternalBackstageManager();
  /**
   * Override internal implementation for a mock
   * @internal For tests only.
   */
  mockInternal(internal) {
    this.internal = internal;
  }
  /** Event raised when backstage is opened or closed. */
  get onToggled() {
    return this.internal.onToggled;
  }
  get isOpen() {
    return this.internal.isOpen;
  }
  open() {
    return this.internal.open();
  }
  close() {
    return this.internal.close();
  }
  toggle() {
    return this.internal.toggle();
  }
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  getBackstageToggleCommand(overrideIconSpec) {
    return this.internal.getBackstageToggleCommand(overrideIconSpec);
  }
  /** Get CommandItemDef that will toggle display of Backstage and allow iconSpec to be overridden. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static getBackstageToggleCommand(overrideIconSpec) {
    return UiFramework.backstage.getBackstageToggleCommand(overrideIconSpec);
  }
}
const usePopoutsStore = create((set) => ({
  popouts: {},
  setPopout: (widgetId, container) => {
    set(
      (state) => produce(state, (draft) => {
        if (!container) {
          delete draft.popouts[widgetId];
          return;
        }
        draft.popouts[widgetId] = castDraft(container);
      })
    );
  },
  onClosePopoutWidget: new BeEvent()
}));
function addChildHTML(window2) {
  const doc = window2.document;
  const meta2 = doc.createElement("meta");
  meta2.setAttribute("charset", "utf-8");
  doc.head.appendChild(meta2);
  const style = doc.createElement("style");
  style.textContent = `
    html,
    body {
      height: 100%;
      width: 100%;
      margin: 0;
      overflow: hidden;
    }
    #root {
      height: 100%;
    }
  `;
  doc.head.appendChild(style);
  const opener = window2.opener;
  const baseURI = opener?.document.baseURI;
  if (doc.baseURI === "about:blank" && baseURI) {
    const base = doc.createElement("base");
    base.href = baseURI;
    doc.head.appendChild(base);
  }
  const noScript = doc.createElement("noscript");
  noScript.textContent = "You need to enable JavaScript to run this app.";
  doc.body.appendChild(noScript);
  const root = doc.createElement("div");
  root.id = "root";
  doc.body.appendChild(root);
}
class InternalChildWindowManager {
  _openChildWindows = [];
  _childWindowToUnregister = /* @__PURE__ */ new Map();
  onChildWindowsChanged = new BeEvent();
  get openChildWindows() {
    return this._openChildWindows;
  }
  /**
   * Returns the OpenChildWindowInfo for the related id.
   * @param childWindowId Id of the window to retrieve.
   * @returns undefined if not found.
   */
  find(childWindowId) {
    if (void 0 === childWindowId) return void 0;
    return this.openChildWindows.find(
      (openWindow) => openWindow.childWindowId === childWindowId
    );
  }
  /**
   * Return the childWindowId of the provided window.
   * @param contentWindow Window element to identify
   * @returns undefined if not found
   */
  findId(contentWindow) {
    if (!contentWindow) return void 0;
    const childWindow = this.openChildWindows.find(
      (openWindow) => openWindow.window === contentWindow
    );
    return childWindow?.childWindowId;
  }
  renderChildWindowContents(childWindow, childWindowId, content, title, tabId) {
    childWindow.document.title = title;
    this._openChildWindows.push({
      childWindowId,
      window: childWindow,
      parentWindow: window,
      content,
      tabId
    });
    this.onChildWindowsChanged.raiseEvent();
  }
  /** Close all child/pop-out windows. This typically is called when the frontstage is changed. */
  closeAll() {
    this.openChildWindows.forEach(
      (openChildWindow) => openChildWindow.window.close()
    );
    this._childWindowToUnregister.forEach((unregister) => unregister());
    this._childWindowToUnregister.clear();
    this._openChildWindows = [];
    this.onChildWindowsChanged.raiseEvent();
  }
  /**
   * Close a specific child window.
   * @param childWindowId Id of the window to close.
   * @param processWindowClose should the `close` method be called on the closing window. (defaults to true).
   * @returns false if the window could not be found.
   */
  close = (childWindowId, processWindowClose = true) => {
    const windowIndex = this.openChildWindows.findIndex(
      (openWindow) => openWindow.childWindowId === childWindowId
    );
    if (windowIndex === -1) return false;
    const { onClosePopoutWidget } = usePopoutsStore.getState();
    onClosePopoutWidget.raiseEvent({ windowId: childWindowId });
    const childWindow = this.openChildWindows[windowIndex];
    this._openChildWindows.splice(windowIndex, 1);
    this._childWindowToUnregister.get(childWindowId)?.();
    this._childWindowToUnregister.delete(childWindowId);
    this.onChildWindowsChanged.raiseEvent();
    if (processWindowClose) {
      childWindow.window.close();
    } else {
      const frontStageDef = UiFramework.frontstages.activeFrontstageDef;
      frontStageDef?.dockWidgetContainerByContainerId(childWindowId);
    }
    return true;
  };
  adjustWindowLocation(location) {
    if (location.top === 0 && location.left === 0) {
      location.left = window.outerWidth / 2 + window.screenX - location.width / 2;
      location.top = window.outerHeight / 2 + window.screenY - location.height / 2;
    }
  }
  /**
   * Open a new child window.
   * @param childWindowId Id to assign to the newly created window.
   * @param title Title to display on the window.
   * @param content ReactNode to be rendered in the window.
   * @param location Position and size information
   * @param useDefaultPopoutUrl use "/iTwinPopup.html" as the window Url, "" otherwise.
   * @returns true if the window is opened successfully.
   */
  open(childWindowId, title, content, location, useDefaultPopoutUrl) {
    const childWindow = this.openWindow({
      childWindowId,
      title,
      content,
      location,
      useDefaultPopoutUrl: useDefaultPopoutUrl ?? false
    });
    return !!childWindow;
  }
  /** Used internally to open child windows and popout widgets. */
  openWindow({
    childWindowId,
    location,
    useDefaultPopoutUrl,
    content,
    title,
    tabId
  }) {
    if (this.find(childWindowId)) return void 0;
    this.adjustWindowLocation(location);
    const url = useDefaultPopoutUrl ? "/iTwinPopup.html" : "";
    const childWindow = window.open(
      url,
      "",
      `width=${location.width},height=${location.height},left=${location.left},top=${location.top},menubar=no,resizable=yes,scrollbars=no,status=no,location=no`
    );
    if (!childWindow) return void 0;
    const onPageHide = () => {
      const frontStageDef = UiFramework.frontstages.activeFrontstageDef;
      if (!frontStageDef) return;
      frontStageDef.saveChildWindowSizeAndPosition(childWindowId, childWindow);
      this.close(childWindowId, false);
    };
    childWindow.addEventListener("pagehide", onPageHide);
    const onDOMContentLoaded = () => {
      this.renderChildWindowContents(
        childWindow,
        childWindowId,
        content,
        title,
        tabId
      );
    };
    if (url.length === 0) {
      addChildHTML(childWindow);
      onDOMContentLoaded();
    } else {
      childWindow.addEventListener("DOMContentLoaded", onDOMContentLoaded);
    }
    const onUnload = () => {
      const frontStageDef = UiFramework.frontstages.activeFrontstageDef;
      if (frontStageDef) {
        this.close(childWindowId, true);
      }
    };
    window.addEventListener("unload", onUnload);
    this._childWindowToUnregister.set(childWindowId, () => {
      childWindow.removeEventListener("pagehide", onPageHide);
      childWindow.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
      window.removeEventListener("unload", onUnload);
    });
    return childWindow;
  }
}
class ConfigurableCreateInfo {
  constructor(classId, uniqueId, id) {
    this.classId = classId;
    this.uniqueId = uniqueId;
    this.id = id;
  }
}
class ConfigurableBase {
  _uniqueId;
  _classId;
  _name;
  _appDataOptions;
  constructor(info, options) {
    this._uniqueId = info.uniqueId;
    this._classId = info.classId;
    this._name = options && options.hasOwnProperty("name") ? options.name : info.uniqueId;
    this._appDataOptions = options;
  }
  /** @internal */
  get uniqueId() {
    return this._uniqueId;
  }
  /** allow options set via appData to be seen by API calls */
  get applicationData() {
    return this._appDataOptions;
  }
  /** Gets the class Id of configurable element */
  get classId() {
    return this._classId;
  }
  /** Get internal name of configurable element. If no name is defined in configuration
   * then the name will match the UniqueId.
   */
  get name() {
    return this._name;
  }
}
var ConfigurableUiControlType = /* @__PURE__ */ ((ConfigurableUiControlType2) => {
  ConfigurableUiControlType2["Content"] = "ContentControl";
  ConfigurableUiControlType2["NavigationAid"] = "NavigationAidControl";
  ConfigurableUiControlType2["StatusBarWidget"] = "StatusBarWidgetControl";
  ConfigurableUiControlType2["ToolUiProvider"] = "ToolUiProvider";
  ConfigurableUiControlType2["Viewport"] = "ViewportContentControl";
  ConfigurableUiControlType2["Widget"] = "WidgetControl";
  return ConfigurableUiControlType2;
})(ConfigurableUiControlType || {});
class ConfigurableUiControl extends ConfigurableBase {
  _cid;
  /** Creates an instance of ConfigurableUiControl.
   * @param info         An object that the subclass must pass to this base class.
   * @param options      Options provided to the control
   * @note Subclasses must pass all arguments to the base class and not add themselves
   * to any container - the control is added automatically.
   * @protected
   */
  constructor(info, options) {
    super(info, options);
    this._cid = info.id;
  }
  /** @internal
   */
  initialize() {
    this.onInitialize();
  }
  /** Called to initialize the ConfigurableUiControl. */
  onInitialize() {
  }
  /** Called when Frontstage is deactivated. */
  onFrontstageDeactivated() {
  }
  /** Called when Frontstage is ready. */
  onFrontstageReady() {
  }
  /** Returns the ID of this ConfigurableUiControl.
   */
  get controlId() {
    return this._cid;
  }
  /** Returns a promise that resolves when the control is ready for usage.
   */
  get isReady() {
    return Promise.resolve();
  }
}
class NavigationAidControl extends ConfigurableUiControl {
  _reactNode;
  constructor(info, options) {
    super(info, options);
  }
  /** The React element associated with this control */
  get reactNode() {
    return this._reactNode;
  }
  set reactNode(r) {
    this._reactNode = r;
  }
  /** Square size of navigation aid. Default size is "64px". Override to set a different size. */
  getSize() {
    return void 0;
  }
  /** Get the type of this control. */
  getType() {
    return ConfigurableUiControlType.NavigationAid;
  }
}
class CubeNavigationAidControl extends NavigationAidControl {
  static navigationAidId = "CubeNavigationAid";
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  constructor(info, options) {
    super(info, options);
    this.reactNode = /* @__PURE__ */ jsxRuntimeExports.jsx(
      CubeNavigationAid,
      {
        iModelConnection: options.imodel,
        viewport: options.viewport
      }
    );
  }
  getSize() {
    return "96px";
  }
}
class DrawingNavigationAidControl extends NavigationAidControl {
  static navigationAidId = "DrawingNavigationAid";
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  constructor(info, options) {
    super(info, options);
    this.reactNode = /* @__PURE__ */ jsxRuntimeExports.jsx(
      DrawingNavigationAid,
      {
        iModelConnection: options.imodel,
        viewport: options.viewport
      }
    );
  }
  getSize() {
    return "96px";
  }
}
class ViewUtilities {
  /**
   * Extracts the BisBaseClass from a full class name.
   * @param classFullName full class name
   * @returns BisBaseClass name
   */
  static getBisBaseClass(classFullName) {
    const bisBaseClass = classFullName.substring(
      classFullName.indexOf(":") + 1
    );
    return bisBaseClass;
  }
  /**
   * Determines if given class is a spatial view.
   * @param classname Name of class to check
   */
  static isSpatial(classname) {
    return classname === SpatialViewState.className || classname === OrthographicViewState.className;
  }
  /**
   * Determines if given class is a spatial view.
   * @param classname Name of class to check
   */
  static isOrthographic(classname) {
    return classname === OrthographicViewState.className;
  }
  /**
   * Determines if given class is a drawing view.
   * @param classname Name of class to check
   */
  static isDrawing(classname) {
    return classname === DrawingViewState.className;
  }
  /**
   * Determines if given class is a sheet view.
   * @param classname Name of class to check
   */
  static isSheet(classname) {
    return classname === SheetViewState.className;
  }
  /**
   * Determines if viewport displays a Sheet view.
   * @param viewport ScreenViewport to check
   */
  static isSheetView(viewport) {
    return ViewUtilities.isSheet(
      ViewUtilities.getBisBaseClass(viewport.view.classFullName)
    );
  }
  /**
   * Determines if viewport displays a Drawing view.
   * @param viewport ScreenViewport to check
   */
  static isDrawingView(viewport) {
    return ViewUtilities.isDrawing(
      ViewUtilities.getBisBaseClass(viewport.view.classFullName)
    );
  }
  /**
   * Determines if viewport displays a Orthographic view.
   * @param viewport ScreenViewport to check
   */
  static isOrthographicView(viewport) {
    return ViewUtilities.isOrthographic(
      ViewUtilities.getBisBaseClass(viewport.view.classFullName)
    );
  }
  /**
   * Determines if viewport displays a Spatial view.
   * @param viewport ScreenViewport to check
   */
  static isSpatialView(viewport) {
    return ViewUtilities.isSpatial(
      ViewUtilities.getBisBaseClass(viewport.view.classFullName)
    );
  }
  /**
   * Determines if viewport displays a 3d view.
   * @param viewport ScreenViewport to check
   */
  static is3dView(viewport) {
    return viewport.view.is3d();
  }
  /**
   * Determines if viewport supports use of a camera.
   * @param viewport ScreenViewport to check
   */
  static viewSupportsCamera(viewport) {
    return SpatialViewState.className === ViewUtilities.getBisBaseClass(viewport.view.classFullName);
  }
}
class SheetsModalFrontstage {
  title = UiFramework.translate("navigationAid.sheetsModalFrontstage");
  _cards = [];
  _connection;
  _currentIndex;
  _searchValue = "";
  /**
   * Creates a SheetsModalFrontstage
   * @param sheets Collection of sheets available in SheetNavigationAid
   * @param connection IModelConnection to query for sheet ViewState
   */
  constructor(sheets, connection, currentIndex) {
    this._connection = connection;
    this._currentIndex = currentIndex;
    this._storeSheetsAsCards(sheets);
  }
  /**
   * Gathers card info from available sheets
   * @param sheets SheetData from available sheets
   */
  _storeSheetsAsCards(sheets) {
    sheets.forEach((sheet, index) => {
      this._cards.push({
        index,
        label: sheet.name,
        iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgDocument, {}),
        viewId: sheet.viewId,
        isActive: index === this._currentIndex
      });
    });
  }
  /** Gets set of cards */
  get content() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CardContainer,
      {
        cards: this._cards,
        searchValue: this._searchValue,
        connection: this._connection
      }
    );
  }
  /** Gets components to be placed in the app bar */
  get appBarRight() {
    return (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SearchBox,
        {
          placeholder: UiFramework.translate("general.search"),
          onValueChanged: this._handleSearchValueChanged,
          valueChangedDelay: 250
        }
      )
    );
  }
  /** Updates stage based on search value */
  _handleSearchValueChanged = (value) => {
    this._searchValue = value;
    UiFramework.frontstages.updateModalFrontstage();
  };
}
class CardContainer extends reactExports.Component {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static _cardSelectedEvent = new BeUiEvent();
  /** Get CardSelectedEvent event */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static get onCardSelectedEvent() {
    return CardContainer._cardSelectedEvent;
  }
  render() {
    return (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollView, { className: this.props.className, style: this.props.style, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FlexWrapContainer, { children: this.props.cards.map((card, _index) => {
        let includeCard = true;
        if (this.props.searchValue) {
          includeCard = this.contains(card.label, this.props.searchValue);
        }
        if (includeCard) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            SheetCard,
            {
              label: card.label,
              index: card.index,
              iconSpec: card.iconSpec,
              icon: card.icon,
              isActive: card.isActive,
              onClick: async () => this._handleCardSelected(card)
            },
            card.label
          );
        }
        return null;
      }) }) })
    );
  }
  /**
   * Determines if string contains a substring
   * @param valueA The string to search through
   * @param valueB The value to search for
   * @return True if valueB can be found in valueA, false otherwise
   */
  contains(valueA, valueB) {
    if (!valueA || !valueB) return false;
    if (valueB.length > valueA.length) return false;
    return valueA.toLocaleUpperCase().indexOf(valueB.toLocaleUpperCase(), 0) !== -1;
  }
  /**
   * Updates view with ViewState for selected card.
   * @param card Data about the sheet card selected.
   */
  async _handleCardSelected(card) {
    if (IModelApp.viewManager && IModelApp.viewManager.selectedView) {
      const vp = IModelApp.viewManager.selectedView;
      const viewState = await this.props.connection.views.load(card.viewId);
      vp.changeView(viewState);
    }
    card.isActive = true;
    UiFramework.frontstages.closeModalFrontstage();
    CardContainer.onCardSelectedEvent.emit({
      id: card.viewId,
      index: card.index
    });
  }
}
class SheetCard extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = { isActive: this.props.isActive, isPressed: false };
  }
  _onClick = () => {
    this.setState({ isActive: true }, () => this.props.onClick());
  };
  _onMouseDown = () => {
    this.setState({ isPressed: true });
  };
  _onMouseLeave = () => {
    if (this.state.isPressed) this.setState({ isPressed: false });
  };
  render() {
    const { label: label2, index } = this.props;
    const className = classnames(
      "uifw-sheet-card",
      this.state.isActive && "is-active",
      this.state.isPressed && "is-pressed"
    );
    const icon = (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      this.props.icon ?? this.props.iconSpec ? (
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$2, { iconSpec: this.props.iconSpec })
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {})
    );
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className,
          onClick: this._onClick,
          onMouseDown: this._onMouseDown,
          onMouseLeave: this._onMouseLeave,
          role: "button",
          tabIndex: -1,
          children: [
            label2,
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sheet-image-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icon", children: icon }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sheet-index", children: index + 1 })
          ]
        }
      )
    );
  }
}
CardContainer.__docgenInfo = { "description": "Displays cards in SheetModalFrontstage\n@alpha", "methods": [{ "name": "onCardSelectedEvent", "docblock": "Get CardSelectedEvent event", "modifiers": ["static", "get"], "params": [], "returns": { "type": { "name": "CardSelectedEvent" } }, "description": "Get CardSelectedEvent event" }], "displayName": "CardContainer", "props": { "cards": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "CardInfo" }], "raw": "CardInfo[]" }, "description": "" }, "searchValue": { "required": true, "tsType": { "name": "string" }, "description": "" }, "connection": { "required": true, "tsType": { "name": "IModelConnection" }, "description": "" } }, "composes": ["CommonProps"] };
SheetCard.__docgenInfo = { "description": "Displays information about an individual sheet\n@alpha", "methods": [], "displayName": "SheetCard", "props": { "label": { "required": true, "tsType": { "name": "string" }, "description": "" }, "index": { "required": true, "tsType": { "name": "number" }, "description": "" }, "iconSpec": { "required": true, "tsType": { "name": "IconSpec" }, "description": "@deprecated in 4.16.0. Use {@link SheetCardProps.icon} instead." }, "icon": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" }, "isActive": { "required": true, "tsType": { "name": "boolean" }, "description": "" }, "onClick": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" } } };
class SheetNavigationAidControl extends NavigationAidControl {
  static navigationAidId = "SheetNavigationAid";
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  constructor(info, options) {
    super(info, options);
    this.reactNode = /* @__PURE__ */ jsxRuntimeExports.jsx(SheetNavigationAid, { iModelConnection: options.imodel });
  }
  getSize() {
    return "96px";
  }
}
class SheetNavigationAid extends reactExports.Component {
  _isMounted = false;
  state = {
    index: 0,
    sheetData: []
  };
  _viewport;
  constructor(props) {
    super(props);
    this._viewport = IModelApp.viewManager.selectedView;
  }
  /** Adds listeners when components mounts */
  async componentDidMount() {
    this._isMounted = true;
    CardContainer.onCardSelectedEvent.addListener(this._handleCardSelected);
    ViewportComponentEvents.onViewIdChangedEvent.addListener(
      this._handleViewIdChanged
    );
    IModelApp.viewManager.onSelectedViewportChanged.addListener(
      this._handleSelectedViewportChanged
    );
    const stateData = await this._setupSheets();
    if (this._isMounted) this.setState(stateData);
  }
  /** Removes listeners when component will unmount */
  componentWillUnmount() {
    this._isMounted = false;
    CardContainer.onCardSelectedEvent.removeListener(this._handleCardSelected);
    ViewportComponentEvents.onViewIdChangedEvent.removeListener(
      this._handleViewIdChanged
    );
    IModelApp.viewManager.onSelectedViewportChanged.removeListener(
      this._handleSelectedViewportChanged
    );
  }
  /** Queries for sheet info and sets as sheetData */
  async _setupSheets() {
    const stateData = {
      index: 0,
      sheetData: []
    };
    if (!this.props.iModelConnection || !this.props.iModelConnection.views.getViewList)
      return stateData;
    let viewId = "";
    if (this._viewport) {
      viewId = this._viewport.view.id.toString();
    }
    const sheets = await this.props.iModelConnection.views.getViewList({
      from: "BisCore.SheetViewDefinition"
    });
    sheets.forEach((viewSpec, index) => {
      stateData.sheetData.push({ name: viewSpec.name, viewId: viewSpec.id });
      if (viewSpec.id === viewId) stateData.index = index;
    });
    return stateData;
  }
  render() {
    const name = this.state.sheetData.length > 0 ? this.state.sheetData[this.state.index].name : "";
    const leftIndex = this.state.index === 0 ? this.state.sheetData.length - 1 : this.state.index - 1;
    const rightIndex = this.state.index >= this.state.sheetData.length - 1 ? 0 : this.state.index + 1;
    const leftTitle = this.state.sheetData[leftIndex] ? this.state.sheetData[leftIndex].name : void 0;
    const rightTitle = this.state.sheetData[rightIndex] ? this.state.sheetData[rightIndex].name : void 0;
    let content;
    if (this.state.sheetData.length > 0) {
      content = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sheet-title", children: UiFramework.translate("general.sheet") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "sheet-name",
            title: name,
            onClick: this._handleOnClickSheetName,
            role: "button",
            tabIndex: -1,
            children: name
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sheet-container", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            IconButton,
            {
              size: "small",
              styleType: "borderless",
              onClick: this._handleOnClickLeftArrow,
              tabIndex: -1,
              label: leftTitle,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgChevronLeft, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            this.state.index + 1,
            " ",
            UiFramework.translate("general.of"),
            this.state.sheetData.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            IconButton,
            {
              size: "small",
              styleType: "borderless",
              onClick: this._handleOnClickRightArrow,
              role: "button",
              tabIndex: -1,
              label: rightTitle,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgChevronRight, {})
            }
          )
        ] })
      ] });
    } else {
      content = /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressRadial, { size: "x-small", indeterminate: true });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: classnames("uifw-sheet-navigation", this.props.className),
        style: this.props.style,
        children: content
      }
    );
  }
  /** Sets index of newly selected card */
  _handleCardSelected = (event) => {
    event && this.setState({
      index: event.index
    });
  };
  /** Updates view to the next lowest index in sheetData */
  _handleOnClickLeftArrow = () => {
    this.setState(
      (prevState) => ({
        index: prevState.index <= 0 ? prevState.sheetData.length - 1 : prevState.index - 1
      }),
      async () => this._updateView()
    );
  };
  /** Updates view to next highest index in sheetData */
  _handleOnClickRightArrow = () => {
    this.setState(
      (prevState) => ({
        index: (prevState.index + 1) % prevState.sheetData.length
      }),
      async () => this._updateView()
    );
  };
  /** Handles a Viewport change & synchs the index */
  _handleSelectedViewportChanged = (args) => {
    if (args.current) {
      this._handleViewportChanged(args.current);
    }
  };
  _handleViewIdChanged = (args) => {
    if (this._viewport === args.viewport)
      this._handleViewportChanged(args.viewport);
  };
  /** Handles a Viewport change & synchs the index */
  _handleViewportChanged = (viewport) => {
    const className = ViewUtilities.getBisBaseClass(
      viewport.view.classFullName
    );
    if (ViewUtilities.isSheet(className)) {
      this._viewport = viewport;
      const viewId = this._viewport.view.id.toString();
      const index = this.state.sheetData.findIndex((sheetData) => {
        return viewId === sheetData.viewId;
      });
      if (index >= 0) this.setState({ index });
    }
  };
  /** Updates view to currently set sheet */
  async _updateView() {
    const viewState = await this.props.iModelConnection.views.load(
      this.state.sheetData[this.state.index].viewId
    );
    if (this._viewport) this._viewport.changeView(viewState);
  }
  /** Creates a new SheetsModalFrontstage */
  modalFrontstage() {
    return new SheetsModalFrontstage(
      this.state.sheetData,
      this.props.iModelConnection,
      this.state.index
    );
  }
  /** Opens a new SheetsModelFrontstage on sheetName click */
  _handleOnClickSheetName = () => {
    UiFramework.frontstages.openModalFrontstage(this.modalFrontstage());
  };
}
SheetNavigationAid.__docgenInfo = { "description": "A Sheet Navigation Aid.\n@public", "methods": [], "displayName": "SheetNavigationAid", "props": { "iModelConnection": { "required": true, "tsType": { "name": "IModelConnection" }, "description": "" } }, "composes": ["CommonProps"] };
function SvgCubeFaceBottom() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { opacity: ".33", d: "m.56 12.31 4.69 3.25 10-2.06-5.19-3.06z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M11 0h-1L0 2v11l5 3h1l10-2V3Zm4 12.62-4-2.19V5l4-.8Zm-.49-9.35L11 4V1.17ZM10 1v3.19L6 5 1.69 2.68Zm0 4.2V10l-4 .8V6Zm-5 .36V11l-4 .8V3.37Zm-3.51 7.17L5 12v2.82ZM6 11.81l4-.81 4.32 2.32L6 15Z" })
  ] });
}
SvgCubeFaceBottom.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "SvgCubeFaceBottom" };
function SvgCubeFaceFront() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { opacity: ".33", d: "M5.5 5.5v10.06l9.94-2.12V3.56z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M11 0h-1L0 2v11l5 3h1l10-2V3Zm4 12.62-4-2.19V5l4-.8Zm-.49-9.35L11 4V1.17ZM10 1v3.19L6 5 1.69 2.68Zm0 4.2V10l-4 .8V6Zm-5 .36V11l-4 .8V3.37Zm-3.51 7.17L5 12v2.82ZM6 11.81l4-.81 4.32 2.32L6 15Z" })
  ] });
}
SvgCubeFaceFront.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "SvgCubeFaceFront" };
function SvgCubeFaceIsoLeft() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { opacity: ".33", d: "m3.962 4.294 4.51.59L5.398 9.32z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M11 0h-1L0 2v11l5 3h1l10-2V3Zm0 1.166 3.51 2.106-3.51.713Zm-1-.146v3.168l-1.022.208-5.423-.71-1.869-1.003Zm0 4.176V10l-4 .804V9.5l2.819-4.066Zm-5 9.638-3.51-2.107L5 12.016Zm0-3.83-4 .805V3.37l2.38 1.304L5 10.349Zm.502-2.54-1.043-3.65 3.276.428ZM6 14.98v-3.168L10 11l4.322 2.316Zm9-2.356-4-2.187V4.995l4-.804Z" })
  ] });
}
SvgCubeFaceIsoLeft.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "SvgCubeFaceIsoLeft" };
function SvgCubeFaceIsoRight() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { opacity: ".33", d: "m12.165 1.176-.941 3.344 4.485 4.846z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13.052 1.231 11 0h-1L0 2v11l5 3h1l10-2V8.043Zm-.829.669.04.024L15 8.25l-3.5-3.781Zm-.889-.533L11 2.554V1.166ZM5 14.834l-3.51-2.107L5 12.016Zm0-3.83-4 .805V3.37l4 2.192Zm-3.314-8.32L10 1.02v3.168L6 5ZM10 5.196V10l-4 .804V6ZM6 14.98v-3.168L10 11l4.322 2.316Zm5-4.543V5.401l4 4.321v2.902Z" })
  ] });
}
SvgCubeFaceIsoRight.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "SvgCubeFaceIsoRight" };
function SvgCubeFaceLeft() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { opacity: ".33", d: "M.54 2.67v9.83l4.88 3.08V5.21z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M11 0h-1L0 2v11l5 3h1l10-2V3Zm4 12.62-4-2.19V5l4-.8Zm-.49-9.35L11 4V1.17ZM10 1v3.19L6 5 1.69 2.68Zm0 4.2V10l-4 .8V6Zm-5 .36V11l-4 .8V3.37Zm-3.51 7.17L5 12v2.82ZM6 11.81l4-.81 4.32 2.32L6 15Z" })
  ] });
}
SvgCubeFaceLeft.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "SvgCubeFaceLeft" };
function SvgCubeFaceRear() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { opacity: ".33", d: "M.53 2.5v9.81l9.94-1.97V.5z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M11 0h-1L0 2v11l5 3h1l10-2V3Zm4 12.62-4-2.19V5l4-.8Zm-.49-9.35L11 4V1.17ZM10 1v3.19L6 5 1.69 2.68Zm0 4.2V10l-4 .8V6Zm-5 .36V11l-4 .8V3.37Zm-3.51 7.17L5 12v2.82ZM6 11.81l4-.81 4.32 2.32L6 15Z" })
  ] });
}
SvgCubeFaceRear.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "SvgCubeFaceRear" };
function SvgCubeFaceRight() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { opacity: ".33", d: "M10.5.5v10.04l5 2.88V3.46z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M11 0h-1L0 2v11l5 3h1l10-2V3Zm4 12.62-4-2.19V5l4-.8Zm-.49-9.35L11 4V1.17ZM10 1v3.19L6 5 1.69 2.68Zm0 4.2V10l-4 .8V6Zm-5 .36V11l-4 .8V3.37Zm-3.51 7.17L5 12v2.82ZM6 11.81l4-.81 4.32 2.32L6 15Z" })
  ] });
}
SvgCubeFaceRight.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "SvgCubeFaceRight" };
function SvgCubeFaceTop() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { opacity: ".33", d: "m.63 2.5 5.08 3 9.79-2.08L10.58.29z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M11 0h-1L0 2v11l5 3h1l10-2V3Zm4 12.62-4-2.19V5l4-.8Zm-.49-9.35L11 4V1.17ZM10 1v3.19L6 5 1.69 2.68Zm0 4.2V10l-4 .8V6Zm-5 .36V11l-4 .8V3.37Zm-3.51 7.17L5 12v2.82ZM6 11.81l4-.81 4.32 2.32L6 15Z" })
  ] });
}
SvgCubeFaceTop.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "SvgCubeFaceTop" };
class ExpandableButton extends reactExports.PureComponent {
  render() {
    const className = classnames(
      "nz-widget-tools-button-expandable",
      this.props.className
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, style: this.props.style, children: [
      this.props.children,
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nz-triangle" })
    ] });
  }
}
ExpandableButton.__docgenInfo = { "description": "Expandable toolbar button. Used in [[Toolbar]] component.\n@internal", "methods": [], "displayName": "ExpandableButton", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "One of toolbar buttons. I.e. [[Item]]" } }, "composes": ["CommonProps"] };
class ToolbarButton extends reactExports.PureComponent {
  render() {
    const className = classnames(
      "nz-toolbar-button-button",
      this.props.className
    );
    const buttonStyle = {
      ...this.props.style
    };
    if (this.props.small) {
      let backgroundOpacity = Number(
        document.documentElement.style.getPropertyValue(
          "--buic-toolbar-opacity"
        )
      );
      let boxShadowOpacity = TOOLBAR_BOX_SHADOW_OPACITY_DEFAULT;
      let filterBlur = TOOLBAR_BACKDROP_FILTER_BLUR_DEFAULT;
      if (this.props.mouseProximity !== void 0) {
        backgroundOpacity = calculateToolbarOpacity(this.props.mouseProximity);
        boxShadowOpacity = calculateBoxShadowOpacity(this.props.mouseProximity);
        filterBlur = calculateBackdropFilterBlur(this.props.mouseProximity);
      }
      buttonStyle.backgroundColor = getToolbarBackgroundColor(backgroundOpacity);
      buttonStyle.boxShadow = getToolbarBoxShadow(boxShadowOpacity);
      buttonStyle.backdropFilter = getToolbarBackdropFilter(filterBlur);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className,
        style: buttonStyle,
        onClick: this.props.onClick,
        title: this.props.title,
        children: [
          !this.props.small && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nz-gradient" }),
          this.props.children
        ]
      }
    );
  }
}
ToolbarButton.__docgenInfo = { "description": "Basic toolbar button. Used in [[Toolbar]] component.\n@internal", "methods": [], "displayName": "ToolbarButton", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Button content." }, "onClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Function called when the button is clicked." }, "small": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether to use a small App button" }, "mouseProximity": { "required": false, "tsType": { "name": "number" }, "description": "Mouse proximity to button" }, "title": { "required": false, "tsType": { "name": "string" }, "description": "Tooltip for button" } }, "composes": ["CommonProps"] };
class ToolbarIcon extends reactExports.PureComponent {
  render() {
    const { className, small, ...props } = this.props;
    const buttonClassName = classnames(
      "nz-toolbar-button-icon",
      small && "nz-toolbar-button-icon-small",
      className
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(ToolbarButton, { className: buttonClassName, small, ...props, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nz-icon", children: this.props.icon }),
      this.props.children
    ] });
  }
}
ToolbarIcon.__docgenInfo = { "description": "Toolbar button which displays icon. Used in [[Toolbar]] component.\n@note See basic button: [[ToolbarButton]]\n@internal", "methods": [], "displayName": "ToolbarIcon", "props": { "icon": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Button icon." }, "small": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether to use a small App button" }, "mouseProximity": { "required": false, "tsType": { "name": "number" }, "description": "Mouse proximity to button" } }, "composes": ["ToolbarButtonProps"] };
class StandardRotationNavigationAidControl extends NavigationAidControl {
  static navigationAidId = "StandardRotationNavigationAid";
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  constructor(info, options) {
    super(info, options);
    this.reactNode = /* @__PURE__ */ jsxRuntimeExports.jsx(StandardRotationNavigationAid, {});
  }
}
class StandardRotationNavigationAid extends reactExports.Component {
  state;
  constructor(props) {
    super(props);
    const list = [
      {
        label: UiFramework.translate("rotations.top"),
        iconsSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCubeFaceTop, {})
      },
      {
        label: UiFramework.translate("rotations.bottom"),
        iconsSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCubeFaceBottom, {})
      },
      {
        label: UiFramework.translate("rotations.left"),
        iconsSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCubeFaceLeft, {})
      },
      {
        label: UiFramework.translate("rotations.right"),
        iconsSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCubeFaceRight, {})
      },
      {
        label: UiFramework.translate("rotations.front"),
        iconsSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCubeFaceFront, {})
      },
      {
        label: UiFramework.translate("rotations.rear"),
        iconsSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCubeFaceRear, {})
      },
      {
        label: UiFramework.translate("rotations.isoLeft"),
        iconsSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCubeFaceIsoLeft, {})
      },
      {
        label: UiFramework.translate("rotations.isoRight"),
        iconsSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCubeFaceIsoRight, {})
      }
    ];
    this.state = {
      element: null,
      isExpanded: false,
      list,
      selected: StandardViewId.Top
    };
  }
  render() {
    const className = classnames(
      "uifw-standard-rotation-navigation",
      this.props.className
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, style: this.props.style, ref: this._handleRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ExpandableButton, { className: "expandable", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ToolbarIcon,
        {
          className: "icon-button",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: classnames("three-d-icon", "icon"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Icon$2,
            {
              iconSpec: this.state.list[this.state.selected].iconsSpec
            }
          ) }),
          onClick: this._toggleIsExpanded,
          title: UiFramework.translate("standardRotationNavigationAid.title")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Popup,
        {
          isOpen: this.state.isExpanded,
          offset: 0,
          onClose: this._handlePopupClose,
          position: RelativePosition.Bottom,
          target: this.state.element,
          children: this.getExpandedContent()
        }
      )
    ] });
  }
  _handleRef = (element) => {
    this.setState(() => ({ element }));
  };
  _handlePopupClose = () => {
    this.setState(() => ({ isExpanded: false }));
  };
  _toggleIsExpanded = () => {
    this.setState((prevState) => ({ isExpanded: !prevState.isExpanded }));
  };
  _handleListItemClicked = (item) => {
    const selected = item;
    this.setState(
      () => ({ isExpanded: false, selected }),
      () => ViewportComponentEvents.setStandardRotation(selected)
    );
  };
  getExpandedContent() {
    if (!this.state.isExpanded) return void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Columns, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(GroupColumn, { children: this.state.list.map((item, itemIndex) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        GroupTool,
        {
          label: item.label,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$2, { iconSpec: item.iconsSpec }),
          isActive: this.state.selected.valueOf() === itemIndex,
          onClick: () => this._handleListItemClicked(itemIndex),
          item: ToolbarItemUtilities.createActionButton(
            "",
            0,
            "",
            "",
            () => {
            }
          )
        },
        itemIndex.toString()
      );
    }) }) }) });
  }
}
StandardRotationNavigationAid.__docgenInfo = { "description": "A 3D Standard Rotation Navigation Aid.\n@public", "methods": [], "displayName": "StandardRotationNavigationAid" };
const ZINDEX_DEFAULT = 12e3;
class DialogManagerBase {
  static _sId = 0;
  _dialogs = new Array();
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  _onDialogChangedEvent;
  static _topZIndex = ZINDEX_DEFAULT;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  constructor(onDialogChangedEvent) {
    this._onDialogChangedEvent = onDialogChangedEvent;
  }
  /** Initialize the modeless dialog manager */
  static initialize() {
    DialogManagerBase._topZIndex = DialogManagerBase.getDialogZIndexDefault();
  }
  static get topZIndex() {
    return DialogManagerBase._topZIndex;
  }
  static set topZIndex(zIndex) {
    DialogManagerBase._topZIndex = zIndex;
  }
  get dialogs() {
    return this._dialogs;
  }
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  get onDialogChangedEvent() {
    return this._onDialogChangedEvent;
  }
  static getDialogZIndexDefault() {
    const variable = "--uicore-z-index-dialog";
    const value = getCssVariableAsNumber(variable);
    if (!isNaN(value)) return value;
    Logger.logError(
      UiFramework.loggerCategory("DialogManagerBase"),
      `'${variable}' CSS variable not found`
    );
    return ZINDEX_DEFAULT;
  }
  /**
   * Triggers opening a dialog.
   * @param dialog Dialog React component.
   * @param id The unique Id the identifies the dialog.
   * @param parentDocument Optional document required when displaying a dialog in a child popup window.
   */
  openDialog(dialog2, id, parentDocument) {
    if (!id) id = `Dialog-${++DialogManagerBase._sId}`;
    const owningDoc = parentDocument ?? document;
    this.pushDialog({ reactNode: dialog2, id, parentDocument: owningDoc });
  }
  /** @internal */
  pushDialog(dialogInfo) {
    this._dialogs.push(dialogInfo);
    this.emitDialogChangedEvent();
  }
  closeDialog(dialog2) {
    let targetDialog = dialog2;
    if (!dialog2) targetDialog = this.activeDialog;
    this.removeDialog(targetDialog);
    this.emitDialogChangedEvent();
  }
  /** @internal */
  closeAll() {
    this._dialogs = [];
    this.emitDialogChangedEvent();
  }
  /** @internal */
  removeDialog(dialog2) {
    const index = this._dialogs.findIndex((dialogInfo) => {
      return dialog2 === dialogInfo.reactNode;
    });
    if (index >= 0) this._dialogs.splice(index, 1);
    if (this._dialogs.length < 1)
      DialogManagerBase.topZIndex = DialogManagerBase.getDialogZIndexDefault();
  }
  emitDialogChangedEvent() {
    this._onDialogChangedEvent.emit({
      dialogCount: this.dialogCount,
      activeDialog: this.activeDialog
    });
  }
  update() {
    this.emitDialogChangedEvent();
  }
  get activeDialog() {
    if (this._dialogs.length > 0)
      return this._dialogs[this._dialogs.length - 1].reactNode;
    return void 0;
  }
  get dialogCount() {
    return this._dialogs.length;
  }
}
class DialogRendererBase extends reactExports.PureComponent {
  state = {
    parentDocument: void 0,
    renderer: void 0
  };
  _handleRefSet = (el) => {
    this.setState({
      parentDocument: el?.ownerDocument ?? void 0,
      renderer: el ?? void 0
    });
  };
  render() {
    if (this.props.dialogManager.dialogCount <= 0) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "uifw-dialog-dialogManagerBase_renderer",
        ref: this._handleRefSet,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { portalContainer: this.state.renderer, children: this.state.parentDocument && this.props.dialogManager.dialogs.filter(
          (info) => info.parentDocument === this.state.parentDocument
        ).map((info) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: info.reactNode }, info.id);
        }) })
      }
    );
  }
  componentDidMount() {
    this.props.dialogManager.onDialogChangedEvent.addListener(
      this._handleDialogChangedEvent
    );
  }
  componentWillUnmount() {
    this.props.dialogManager.onDialogChangedEvent.removeListener(
      this._handleDialogChangedEvent
    );
  }
  _handleDialogChangedEvent = () => {
    this.forceUpdate();
  };
}
DialogRendererBase.__docgenInfo = { "description": "DialogRenderer React component.\n@internal", "methods": [], "displayName": "DialogRendererBase", "props": { "dialogManager": { "required": true, "tsType": { "name": "DialogManagerBase" }, "description": "" }, "style": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "" } } };
const iModelPanelHeader = { "projects": "Projects" };
const iModelPanel = { "noIModels": "There are no IModels in Project {{projectName}}" };
const keyinbrowser = { "label": "Keyin Browser", "keyin": "Key-in", "args": "Arguments", "argsTip": "'|' separated arguments", "execute": "Execute", "placeholder": "Enter key-in", "incorrectArgs": "Incorrect number of key-in arguments", "failedToRun": "Key-in failed to run", "exceptionOccurred": "Key-in caused the following exception to occur", "couldNotFindTool": "Could not find a tool with the given key-in", "couldNotSaveHistory": "Could not save key-in in history" };
const general = { "sheet": "Sheet", "alert": "Alert", "error": "Error", "warning": "Warning", "information": "Information", "success": "Success", "settings": "Settings", "minimize": "Minimize", "overflow": "Overflow", "no-content": "No data for this content view", "of": "of", "search": "Search" };
const rotations = { "top": "Top", "bottom": "Bottom", "left": "Left", "right": "Right", "front": "Front", "rear": "Rear", "isoLeft": "Iso Left", "isoRight": "Iso Right" };
const messageCenter = { "messages": "Messages", "all": "All", "errors": "Errors", "prompt": "No messages", "export": "Export" };
const activityCenter = { "percentComplete": "% complete", "moreDetails": "Click or tap for more details." };
const snapModeField = { "snapMode": "Snap Mode", "keypoint": "Keypoint", "intersection": "Intersection", "center": "Center", "nearest": "Nearest", "origin": "Origin", "midpoint": "Midpoint", "bisector": "Bisector", "multi": "Multiple", "perpendicularPoint": "Perpendicular point", "tangentPoint": "Tangent point" };
const selectionScopeField = { "label": "Scope", "toolTip": "Selection Scope" };
const tests = { "singleContent": "Single Content", "label": "Test Label", "subtitle": "Test Subtitle" };
const ContentLayoutDef$1 = { "SingleContent": "Single Content", "TwoHalvesVertical": "Two Halves Vertical", "ThreeRightStacked": "Three Right Stacked", "FourQuadrants": "Four Quadrants" };
const pickerButtons = { "showAll": "Show All", "hideAll": "Hide All", "invert": "Invert", "separator": "Separator" };
const categoriesModels = { "categories": "Categories", "models": "Models", "loadingMessage": "Loading...", "options": "Options" };
const realityData = { "title": "Reality Data", "group": "Group", "size": "Size", "kilobytes": "KB", "notAvailable": "N/A", "noneAvailable": "No reality data available.", "bingMap": "Bing Map", "attached": "(Attached)", "settings": "Settings...", "options": "Options", "hybrid": "Hybrid", "aerial": "Aerial", "street": "Street", "showAll": "Show All", "hideAll": "Hide All", "invertDisplay": "Invert", "bingMapSettings": "Bing Map Settings", "elevationOffset": "Elevation Offset:" };
const viewTypes = { "views": "Views", "spatialViews": "Spatial Views", "drawings": "Drawings", "sheets": "Sheets", "others": "Others" };
const buttons = { "yes": "Yes", "no": "No", "clearSelection": "Clear Selection", "openBackstageMenu": "Open backstage menu" };
const navigationAid = { "sheetsModalFrontstage": "Sheet Views" };
const commands = { "backToPreviousFrontstage": "Back to previous frontstage" };
const settings = { "settingsStageLabel": "Settings", "noSettingsProvidersRegistered": "No SettingsProviders have been registered.", "noSettingsAvailable": "No Settings Available", "quantity-formatting": { "label": "Units", "subLabel": "Quantity Formatting", "tooltip": "Define Active Units and Quantity Formats", "formatSectionLabel": "Quantity Formats", "setButtonLabel": "Set", "clearButtonLabel": "Clear" }, "uiSettingsPage": { "label": "UI Settings", "tooltip": "UI Settings", "light": "Light", "dark": "Dark", "lightHighContrast": "Light (High contrast)", "darkHighContrast": "Dark (High contrast)", "inherit": "Inherit", "systemPreferred": "System preferred", "themeTitle": "Theme", "themeDescription": "Change the theme", "autoHideTitle": "Auto-Hide UI", "autoHideDescription": "Toggle the auto-hide of UI after inactivity", "dragInteractionTitle": "Toolbar Group Buttons show child action item", "dragInteractionDescription": "Requires long press to open pop-up panel. Single click executes displayed action.", "useProximityOpacityTitle": "Change Toolbar Opacity", "useProximityOpacityDescription": "Change the toolbar opacity as the mouse gets closer or farther away", "snapWidgetOpacityTitle": "Snap Toolbar Opacity", "snapWidgetOpacityDescription": "Immediately change the toolbar opacity when the mouse gets close", "widgetOpacityTitle": "Widget Opacity", "widgetOpacityDescription": "Opacity when mouse is not hovering floating widgets", "widgetIconTitle": "Show Icon on Widget Tab", "widgetIconDescription": "If widget panel less 320 pixels wide then only icons will display on widget tab.", "autoCollapseUnpinnedPanelsTitle": "Auto Collapse Unpinned Panels", "autoCollapseUnpinnedPanelsDescription": "Collapse unpinned widget panels when mouse leaves panel boundary. If false, mouse down outside is required.", "animateToolSettingsTitle": "Animate Docked Tool Settings on appear", "animateToolSettingsDescription": "Animate tool settings when they appear in the docked bar.", "useToolAsToolSettingsLabelTitle": "Use tool as tool settings label", "useToolAsToolSettingsLabelDescription": "Use active tool name as the Tool Settings tab label, if false, will always be titled 'Tool Settings'.", "toolbarOpacityTitle": "Toolbar Opacity", "toolbarOpacityDescription": "Opacity of toolbars when mouse is not hovering." } };
const tools = { "clearSelection": "Clear Selection", "hideSelected": "Hide Elements", "hide": "Hide Tools", "hideCategories": "Hide Categories", "hideModels": "Hide Models", "isolate": "Isolate Tools", "isolateSelected": "Isolate Elements", "isolateCategories": "Isolate Categories", "isolateModels": "Isolate Models", "emphasizeSelected": "Emphasize Selected", "clearVisibility": "Clear Isolated, Hidden, and Emphasized Elements", "noToolSettingsStart": "", "noToolSettingsEnd": " does not have tool settings.", "noToolSettingsPlaceholderName": "Active Tool", "sectionTools": "Section Tools", "sectionClear": "Clear Sections", "sectionPanelLabel": "Section", "sectionByPlane": "Plane", "sectionByElement": "Element", "sectionByRange": "Range", "sectionByShape": "Shape", "measureTools": "Measure Tools", "sectionShowHandles": "Section Handles", "viewZoomingTools": "Zooming Tools", "View": { "Fly": { "description": "Fly in view", "flyover": "Fly" }, "ToggleCamera": { "description": "Turn on/off use of camera in active view", "flyover": "Toggle Camera", "turnOnFlyover": "Turn Camera On", "turnOffFlyover": "Turn Camera Off" } }, "OpenSettings": { "keyin": "open settings" }, "RestoreAllFrontstages": { "keyin": "restore all frontstages", "description": "Restore all Frontstages to Default Layout", "flyover": "Restore all Stages to Default Layout" }, "RestoreFrontstageLayout": { "keyin": "restore frontstage layout", "description": "Restore Frontstage to Default Layout", "flyover": "Restore Stage to Default Layout", "noStageFound": "Specified stage not found." }, "ClearKeyinPaletteHistory": { "keyin": "clear keyin history", "description": "Clear keyin palette history", "flyover": "Clear keyin palette history" }, "BumpToolSetting": { "keyin": "bump toolsetting", "description": "Bump a Tool Settings value", "flyover": "Bump a Tool Setting" }, "FocusToolSettings": { "keyin": "focus toolsettings", "description": "Focus into the Tool Settings widget", "flyover": "Focus into Tool Settings" } };
const listTools = { "searchViews": "Search Views...", "listView": "List", "thumbnailView": "Thumbnails", "camera": "Camera", "views": "Saved Views", "viewAttributes": "View Attributes", "constructions": "Constructions", "acs": "ACS", "grid": "Grid", "visEdges": "Visible Edges", "hidEdges": "Hidden Edges", "monochrome": "Monochrome Display", "ambientOcclusion": "Ambient Occlusion", "shadows": "Shadows", "backgroundMap": "Background Map" };
const toolAssistance = { "title": "Tool Assistance", "promptAtCursor": "Show prompt at cursor", "moreInfo": "Click for more information", "mouse": "Mouse", "touch": "Touch", "pin": "Pin" };
const widget = { "labels": { "toolSettings": "Tool Settings" }, "tooltips": { "dockToolSettings": "Dock to top", "moreWidgets": "More widgets", "moreToolSettings": "More tool settings", "pinPanel": "Pin widget panel", "sendHome": "Send to panel", "resizeGrip": "Resize widget panel", "toolSettingsHandle": "Drag to undock", "unpinPanel": "Unpin widget panel", "popoutActiveTab": "Pop out active widget tab" }, "errorMessage": { "unknownError": "Something went wrong...", "widgetPopoutFail": "Widget failed to popout, ensure you allow popout for this site." } };
const statusBar = { "overflow": "More status fields" };
const modalFrontstage = { "backButtonTitle": "Return to previous stage" };
const standardRotationNavigationAid = { "title": "Standard Rotations" };
const accuDraw = { "dialogTitle": "AccuDraw", "subMenu": "AccuDraw", "lockSmart": "Smart Lock", "lockX": "Lock X", "lockY": "Lock Y", "lockZ": "Lock Z", "lockAngle": "Lock Angle", "lockDistance": "Lock Distance", "changeCompassMode": "Toggle Mode", "rotateTop": "Rotate Top", "rotateFront": "Rotate Front", "rotateSide": "Rotate Side", "rotateView": "Rotate View", "setOrigin": "Reposition Origin", "rotateCycle": "Rotate Cycle", "rotateAxes": "Rotate Axes", "rotateToElement": "Rotate To Element", "defineACSByPoints": "Define ACS By Points", "bumpToolSetting": "Bump Tool Settings", "focusToolSetting": "Focus into Tool Settings", "rotateSubMenu": "AccuDraw Rotate", "rotationSet": "AccuDraw rotation mode set to {{rotationString}}", "rotation": { "top": "top", "front": "front", "side": "side", "view": "view", "context": "context", "ACS": "ACS" }, "compassModeSet": "AccuDraw compass mode set to {{modeString}}", "compassMode": { "polar": "polar", "rectangular": "rectangular" } };
const presentationUnitSystem = { "selector-label": "Presentation Unit System", "Metric": "Metric", "BritishImperial": "Imperial", "USCustomary": "US Customary", "USSurvey": "US Survey" };
const dialog = { "cancel": "Cancel", "close": "Close", "ok": "OK", "retry": "Retry", "yes": "Yes", "no": "No", "next": "Next", "previous": "Previous" };
const UiFramework$1 = {
  iModelPanelHeader,
  iModelPanel,
  keyinbrowser,
  general,
  rotations,
  messageCenter,
  activityCenter,
  snapModeField,
  selectionScopeField,
  tests,
  ContentLayoutDef: ContentLayoutDef$1,
  pickerButtons,
  categoriesModels,
  realityData,
  viewTypes,
  buttons,
  navigationAid,
  commands,
  settings,
  tools,
  listTools,
  toolAssistance,
  widget,
  statusBar,
  modalFrontstage,
  standardRotationNavigationAid,
  accuDraw,
  presentationUnitSystem,
  dialog
};
const defaults = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentLayoutDef: ContentLayoutDef$1,
  accuDraw,
  activityCenter,
  buttons,
  categoriesModels,
  commands,
  default: UiFramework$1,
  dialog,
  general,
  iModelPanel,
  iModelPanelHeader,
  keyinbrowser,
  listTools,
  messageCenter,
  modalFrontstage,
  navigationAid,
  pickerButtons,
  presentationUnitSystem,
  realityData,
  rotations,
  selectionScopeField,
  settings,
  snapModeField,
  standardRotationNavigationAid,
  statusBar,
  tests,
  toolAssistance,
  tools,
  viewTypes,
  widget
}, Symbol.toStringTag, { value: "Module" }));
function useTranslation() {
  const fallback = reactExports.useCallback((key) => {
    if (!UiFramework.initialized) {
      return void 0;
    }
    return UiFramework.translate(key);
  }, []);
  return usePackageTranslation({
    namespace: UiFramework.localizationNamespace,
    fallback,
    defaults
  });
}
function StandardMessageBox(props) {
  const [isOpen, setIsOpen] = reactExports.useState(props.opened);
  let severity = MessageSeverity.None;
  switch (props.iconType) {
    case MessageBoxIconType.NoSymbol:
      severity = MessageSeverity.None;
      break;
    case MessageBoxIconType.Information:
      severity = MessageSeverity.Information;
      break;
    case MessageBoxIconType.Question:
      severity = MessageSeverity.Question;
      break;
    case MessageBoxIconType.Warning:
      severity = MessageSeverity.Warning;
      break;
    case MessageBoxIconType.Critical:
      severity = MessageSeverity.Error;
      break;
    case MessageBoxIconType.Success:
      severity = MessageSeverity.Success;
      break;
  }
  const handleButton = (buttonType) => {
    closeDialog(() => {
      if (props.onResult) props.onResult(buttonType);
    });
  };
  const handleCancel = () => {
    closeDialog(() => {
      if (props.onResult) props.onResult(MessageBoxValue.Cancel);
    });
  };
  const closeDialog = (followUp) => {
    setIsOpen(false);
    UiFramework.dialogs.modal.close();
    followUp();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Dialog$1,
    {
      isOpen,
      style: { zIndex: DialogManagerBase.topZIndex, ...props.style },
      className: props.className,
      onClose: handleCancel,
      closeOnEsc: true,
      closeOnExternalClick: false,
      preventDocumentScroll: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog$1.Backdrop, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Dialog$1.Main,
          {
            style: { width: 512 },
            "data-testid": "message-box-dialog-container",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog$1.TitleBar, { titleText: props.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog$1.Content, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageContainer, { severity, children: props.children }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog$1.ButtonBar, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                DialogButtons,
                {
                  messageBoxType: props.messageBoxType,
                  handleButton
                }
              ) })
            ]
          }
        )
      ]
    }
  );
}
function DialogButtons(props) {
  const buttonCluster = new Array();
  switch (props.messageBoxType) {
    case MessageBoxType.Ok:
    case MessageBoxType.LargeOk:
      buttonCluster.push({
        type: DialogButtonType.OK,
        onClick: () => {
          props.handleButton(MessageBoxValue.Ok);
        }
      });
      break;
    case MessageBoxType.OkCancel:
    case MessageBoxType.MediumAlert:
      buttonCluster.push({
        type: DialogButtonType.OK,
        onClick: () => {
          props.handleButton(MessageBoxValue.Ok);
        }
      });
      buttonCluster.push({
        type: DialogButtonType.Cancel,
        onClick: () => {
          props.handleButton(MessageBoxValue.Cancel);
        }
      });
      break;
    case MessageBoxType.YesNo:
    case MessageBoxType.YesNoCancel:
      buttonCluster.push({
        type: DialogButtonType.Yes,
        onClick: () => {
          props.handleButton(MessageBoxValue.Yes);
        }
      });
      buttonCluster.push({
        type: DialogButtonType.No,
        onClick: () => {
          props.handleButton(MessageBoxValue.No);
        }
      });
      if (MessageBoxType.YesNoCancel === props.messageBoxType)
        buttonCluster.push({
          type: DialogButtonType.Cancel,
          onClick: () => {
            props.handleButton(MessageBoxValue.Cancel);
          }
        });
      break;
  }
  return buttonCluster.map((button, index) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DialogButton$1, { button }, index);
  });
}
function DialogButton$1({ button }) {
  const { translate } = useTranslation();
  let buttonText = "";
  let usePrimaryStyleType = false;
  switch (button.type) {
    case DialogButtonType.OK:
      buttonText = translate("dialog.ok");
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.Retry:
      buttonText = translate("dialog.retry");
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.Yes:
      buttonText = translate("dialog.yes");
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.No:
      buttonText = translate("dialog.no");
      break;
    case DialogButtonType.Cancel:
      buttonText = translate("dialog.cancel");
      break;
    case DialogButtonType.Close:
      buttonText = translate("dialog.close");
      break;
    case DialogButtonType.Next:
      buttonText = translate("dialog.next");
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.Previous:
      buttonText = translate("dialog.previous");
      usePrimaryStyleType = true;
      break;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button$2,
    {
      styleType: usePrimaryStyleType ? "high-visibility" : void 0,
      onClick: button.onClick,
      children: buttonText
    }
  );
}
StandardMessageBox.__docgenInfo = { "description": "StandardMessageBox React component displays a standard icon, message text and a standard button set in the lower right.\n@public\n@deprecated in 4.15.0. Use {@link https://itwinui.bentley.com/docs/dialog iTwinUI Dialog} instead.", "methods": [], "displayName": "StandardMessageBox", "props": { "opened": { "required": true, "tsType": { "name": "boolean" }, "description": "Indicates whether the message box is open." }, "iconType": { "required": true, "tsType": { "name": "MessageBoxIconType" }, "description": "The standard icon to display in the message box." }, "title": { "required": true, "tsType": { "name": "string" }, "description": "Title to display in the message box." }, "messageBoxType": { "required": true, "tsType": { "name": "MessageBoxType" }, "description": "Controls the button set displayed." }, "onResult": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(result: MessageBoxValue) => void", "signature": { "arguments": [{ "type": { "name": "MessageBoxValue" }, "name": "result" }], "return": { "name": "void" } } }, "description": "Callback function for processing the message box result." }, "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Content." } }, "composes": ["CommonProps"] };
class Tooltip extends reactExports.PureComponent {
  static defaultProps = {
    position: {
      x: 0,
      y: 0
    }
  };
  _lastSize = { width: 0, height: 0 };
  _tooltip = reactExports.createRef();
  render() {
    const className = classnames("nz-popup-tooltip", this.props.className);
    const style = {
      ...this.props.style,
      left: this.props.position.x,
      top: this.props.position.y
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, ref: this._tooltip, style, children: [
      this.props.icon !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: this.props.icon }) : void 0,
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nz-content", children: this.props.children })
    ] });
  }
  componentDidMount() {
    this.onSizeChanged();
  }
  componentDidUpdate() {
    this.onSizeChanged();
  }
  onSizeChanged() {
    const tooltip = this._tooltip.current;
    const rect = tooltip.getBoundingClientRect();
    const size = {
      height: rect.height,
      width: rect.width
    };
    if (this._lastSize.width === size.width && this._lastSize.height === size.height)
      return;
    this._lastSize = size;
    this.props.onSizeChanged && this.props.onSizeChanged(size);
  }
}
const offsetAndContainInContainer = (tooltipBounds, containerSize, offset = new Point(20, 20)) => {
  let newBounds = Rectangle.create(tooltipBounds).offset(offset);
  const containerBounds = Rectangle.createFromSize(containerSize);
  if (containerBounds.contains(newBounds)) return newBounds.topLeft();
  newBounds = newBounds.containIn(containerBounds);
  return newBounds.topLeft();
};
Tooltip.__docgenInfo = { "description": "Positionable tooltip component.\n@internal", "methods": [], "displayName": "Tooltip", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Tooltip content." }, "icon": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Tooltip icon." }, "onSizeChanged": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(size: SizeProps) => void", "signature": { "arguments": [{ "type": { "name": "_SizeProps" }, "name": "size" }], "return": { "name": "void" } } }, "description": "Function called when the bounds of the tooltip changes." }, "position": { "required": false, "tsType": { "name": "XAndY" }, "description": "Position of the tooltip.", "defaultValue": { "value": "{\n  x: 0,\n  y: 0,\n}", "computed": false } } }, "composes": ["CommonProps"] };
class ElementTooltip extends reactExports.Component {
  static _elementTooltipChangedEvent = new BeUiEvent();
  static _isTooltipVisible;
  static _isTooltipHalted;
  static get onElementTooltipChangedEvent() {
    return ElementTooltip._elementTooltipChangedEvent;
  }
  static get isTooltipVisible() {
    return ElementTooltip._isTooltipVisible;
  }
  static showTooltip(el, message, pt, options) {
    if (ElementTooltip._isTooltipHalted) return;
    ElementTooltip._isTooltipVisible = true;
    ElementTooltip.onElementTooltipChangedEvent.emit({
      isTooltipVisible: true,
      el,
      message,
      pt,
      options
    });
  }
  static hideTooltip() {
    ElementTooltip._isTooltipVisible = false;
    ElementTooltip.onElementTooltipChangedEvent.emit({
      isTooltipVisible: false,
      message: ""
    });
  }
  static get isTooltipHalted() {
    return ElementTooltip._isTooltipHalted;
  }
  static set isTooltipHalted(halt) {
    ElementTooltip._isTooltipHalted = halt;
    if (halt && ElementTooltip._isTooltipVisible) ElementTooltip.hideTooltip();
  }
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ElementTooltipComponent, {});
  }
}
function ElementTooltipComponent(props) {
  const [visible, setVisible] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState("");
  const [preferredPosition, setPreferredPosition] = reactExports.useState(void 0);
  const [position, setPosition] = reactExports.useState({ x: 0, y: 0 });
  const [mainContainer, setMainContainer] = reactExports.useState(void 0);
  const [container, setContainer] = reactExports.useState(
    void 0
  );
  const [popout, setPopout] = reactExports.useState(false);
  const [size, setSize] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    return ElementTooltip.onElementTooltipChangedEvent.addListener((args) => {
      const isPopout = args.el?.ownerDocument.defaultView !== window;
      setPopout(isPopout);
      setVisible(args.isTooltipVisible);
      setMessage(args.message);
      setContainer(args.el);
      setPreferredPosition(args.pt);
    });
  }, []);
  const portalContainer = popout ? container : mainContainer;
  reactExports.useLayoutEffect(() => {
    if (!preferredPosition) return;
    setPosition(preferredPosition);
    if (!container) return;
    if (!size) return;
    const containerBounds = Rectangle.create(container.getBoundingClientRect());
    const bounds = Rectangle.createFromSize(size).offset(preferredPosition);
    const adjustedPosition = offsetAndContainInContainer(
      bounds,
      containerBounds.getSize(),
      { x: 8, y: 8 }
    );
    const newPosition = adjustedPosition.offset(containerBounds.topLeft());
    setPosition(newPosition);
  }, [container, size, preferredPosition]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: classnames(
          "uifw-feedback-elementTooltip_container",
          props.className
        ),
        ref: (el) => setMainContainer(el ?? void 0)
      }
    ),
    portalContainer && visible && reactDomExports.createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tooltip,
        {
          className: classnames(
            "uifw-feedback-elementTooltip",
            props.className
          ),
          style: props.style,
          onSizeChanged: setSize,
          position,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageRenderer$1, { message })
        }
      ),
      portalContainer
    )
  ] });
}
ElementTooltip.__docgenInfo = { "description": "ElementTooltip React component.\n@public", "methods": [{ "name": "onElementTooltipChangedEvent", "docblock": null, "modifiers": ["static", "get"], "params": [], "returns": { "type": { "name": "ElementTooltipChangedEvent" } } }, { "name": "isTooltipVisible", "docblock": null, "modifiers": ["static", "get"], "params": [], "returns": { "type": { "name": "boolean" } } }, { "name": "showTooltip", "docblock": null, "modifiers": ["static"], "params": [{ "name": "el", "optional": false, "type": { "name": "HTMLElement", "alias": "HTMLElement" } }, { "name": "message", "optional": false, "type": { "name": "NotifyMessageType", "alias": "NotifyMessageType" } }, { "name": "pt", "optional": true, "type": { "name": "XAndY", "alias": "XAndY" } }, { "name": "options", "optional": true, "type": { "name": "ToolTipOptions", "alias": "ToolTipOptions" } }], "returns": { "type": { "name": "void" } } }, { "name": "hideTooltip", "docblock": null, "modifiers": ["static"], "params": [], "returns": { "type": { "name": "void" } } }, { "name": "isTooltipHalted", "docblock": null, "modifiers": ["static", "get"], "params": [], "returns": { "type": { "name": "boolean" } } }, { "name": "isTooltipHalted", "docblock": null, "modifiers": ["static", "set"], "params": [{ "name": "halt", "optional": false, "type": { "name": "boolean" } }], "returns": null }], "displayName": "ElementTooltip" };
class PointerMessage extends reactExports.Component {
  static _pointerMessageChangedEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  static _onPointerMessagePositionChangedEvent = new BeUiEvent();
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static get onPointerMessageChangedEvent() {
    return PointerMessage._pointerMessageChangedEvent;
  }
  static showMessage(message) {
    PointerMessage.onPointerMessageChangedEvent.emit({
      isVisible: true,
      priority: message.priority,
      message: message.briefMessage,
      detailedMessage: message.detailedMessage,
      relativePosition: message.relativePosition,
      viewport: message.viewport,
      pt: message.displayPoint,
      messageDetails: message
    });
  }
  static updateMessage(displayPoint, relativePosition) {
    PointerMessage._onPointerMessagePositionChangedEvent.emit({
      pt: displayPoint,
      relativePosition
    });
  }
  static hideMessage() {
    PointerMessage.onPointerMessageChangedEvent.emit({
      isVisible: false,
      priority: OutputMessagePriority.None,
      message: ""
    });
  }
  state = {
    message: "",
    isVisible: false,
    position: {
      x: 0,
      y: 0
    }
  };
  _relativePosition;
  _viewport;
  _position;
  _size = {
    height: 0,
    width: 0
  };
  render() {
    if (!this.state.isVisible) return null;
    const className = classnames("uifw-pointer-message", this.props.className);
    const severity = MessageManager.getSeverity(this.state.messageDetails);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        className,
        onSizeChanged: this._handleSizeChanged,
        position: this.state.position,
        style: this.props.style,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "uifw-pointer-message-content", children: [
          severity !== MessageSeverity.None && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uifw-pointer-message-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Icon$2,
            {
              className: `icon ${MessageContainer.getIconClassName(
                severity
              )}`,
              iconSpec: `${MessageContainer.getIcon(severity, false)}`
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "uifw-pointer-message-text", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MessageRenderer$1,
              {
                className: "uifw-pointer-message-brief",
                message: this.state.message,
                useSpan: true
              }
            ),
            this.state.detailedMessage && // eslint-disable-next-line @typescript-eslint/no-deprecated
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MessageRenderer$1,
              {
                className: "uifw-pointer-message-detailed",
                message: this.state.detailedMessage
              }
            )
          ] })
        ] })
      }
    );
  }
  componentDidMount() {
    PointerMessage.onPointerMessageChangedEvent.addListener(
      this._handlePointerMessageChangedEvent
    );
    PointerMessage._onPointerMessagePositionChangedEvent.addListener(
      this._handlePointerMessagePositionChangedEvent
    );
  }
  componentWillUnmount() {
    PointerMessage.onPointerMessageChangedEvent.removeListener(
      this._handlePointerMessageChangedEvent
    );
    PointerMessage._onPointerMessagePositionChangedEvent.removeListener(
      this._handlePointerMessagePositionChangedEvent
    );
  }
  _handleSizeChanged = (size) => {
    this._size = size;
    this.updatePosition();
  };
  _handlePointerMessageChangedEvent = (args) => {
    this._relativePosition = args.relativePosition;
    this._viewport = args.viewport;
    this._position = args.pt;
    this.setState(() => ({
      isVisible: args.isVisible,
      message: args.message,
      detailedMessage: args.detailedMessage,
      messageDetails: args.messageDetails
    }));
    this.updatePosition();
  };
  _handlePointerMessagePositionChangedEvent = (args) => {
    this._relativePosition = args.relativePosition;
    this._position = args.pt;
    this.updatePosition();
  };
  updatePosition() {
    const adjustmentOffset = 20;
    let offset;
    switch (this._relativePosition) {
      case RelativePosition.Top:
        offset = { x: 0, y: -adjustmentOffset };
        break;
      case RelativePosition.TopRight:
        offset = { x: adjustmentOffset, y: -adjustmentOffset };
        break;
      case RelativePosition.Right:
        offset = { x: adjustmentOffset, y: 0 };
        break;
      case RelativePosition.BottomRight:
        offset = { x: adjustmentOffset, y: adjustmentOffset };
        break;
      case RelativePosition.Bottom:
        offset = { x: 0, y: adjustmentOffset };
        break;
      case RelativePosition.BottomLeft:
        offset = { x: -adjustmentOffset, y: adjustmentOffset };
        break;
      case RelativePosition.Left:
        offset = { x: -adjustmentOffset, y: 0 };
        break;
      case RelativePosition.TopLeft:
        offset = { x: -adjustmentOffset, y: -adjustmentOffset };
        break;
    }
    this.setState((prevState) => {
      if (!this._viewport) return null;
      if (!this._position) return null;
      const containerBounds = Rectangle.create(
        this._viewport.getBoundingClientRect()
      );
      const relativeBounds = Rectangle.createFromSize(this._size).offset(
        this._position
      );
      const viewportOffset = new Point().getOffsetTo(containerBounds.topLeft());
      const adjustedPosition = offsetAndContainInContainer(
        relativeBounds,
        containerBounds.getSize(),
        offset
      );
      const position = adjustedPosition.offset(viewportOffset);
      if (position.equals(prevState.position)) return null;
      return {
        position
      };
    });
  }
}
PointerMessage.__docgenInfo = { "description": "Pointer message pops up near pointer when attempting an invalid interaction.\n@public", "methods": [{ "name": "onPointerMessageChangedEvent", "docblock": null, "modifiers": ["static", "get"], "params": [], "returns": { "type": { "name": "PointerMessageChangedEvent" } } }, { "name": "showMessage", "docblock": null, "modifiers": ["static"], "params": [{ "name": "message", "optional": false, "type": { "name": "NotifyMessageDetailsType", "alias": "NotifyMessageDetailsType" } }], "returns": { "type": { "name": "void" } } }, { "name": "updateMessage", "docblock": null, "modifiers": ["static"], "params": [{ "name": "displayPoint", "optional": false, "type": { "name": "XAndY", "alias": "XAndY" } }, { "name": "relativePosition", "optional": false, "type": { "name": "RelativePosition", "alias": "RelativePosition" } }], "returns": { "type": { "name": "void" } } }, { "name": "hideMessage", "docblock": null, "modifiers": ["static"], "params": [], "returns": { "type": { "name": "void" } } }], "displayName": "PointerMessage", "props": { "message": { "required": false, "tsType": { "name": "string" }, "description": "Text to display" } }, "composes": ["CommonProps"] };
class StatusMessageManager {
  _messages = [];
  _messageId = 0;
  initialize() {
    this._messages = [];
    this._messageId = 0;
  }
  get messages() {
    return this._messages;
  }
  add(messageDetails) {
    const id = this._messageId.toString();
    const severity = MessageManager.getSeverity(messageDetails);
    const messages = this._messages.slice();
    messages.splice(0, 0, { id, messageDetails, severity });
    this._messages = messages;
    this._messageId++;
    const stickyMessages = this._messages.filter(
      (message) => message.messageDetails.msgType === OutputMessageType.Sticky
    );
    if (stickyMessages.length > MessageManager.maxDisplayedStickyMessages) {
      const removeMessages = stickyMessages.slice(
        MessageManager.maxDisplayedStickyMessages
      );
      for (const removeMessage of removeMessages) {
        this.remove(removeMessage.id);
      }
    }
  }
  remove(id) {
    let result = false;
    const foundIndex = this._messages.findIndex(
      (message) => message.id === id
    );
    if (foundIndex >= 0) {
      const messages = this._messages.slice();
      messages.splice(foundIndex, 1);
      this._messages = messages;
      result = true;
    }
    return result;
  }
}
const SYSTEM_PREFERRED_COLOR_THEME = "SYSTEM_PREFERRED";
var ColorTheme = /* @__PURE__ */ ((ColorTheme2) => {
  ColorTheme2["Light"] = "light";
  ColorTheme2["Dark"] = "dark";
  ColorTheme2[ColorTheme2["System"] = SYSTEM_PREFERRED_COLOR_THEME] = "System";
  ColorTheme2["Inherit"] = "inherit";
  ColorTheme2["HighContrastLight"] = "high-contrast-light";
  ColorTheme2["HighContrastDark"] = "high-contrast-dark";
  return ColorTheme2;
})(ColorTheme || {});
const WIDGET_OPACITY_DEFAULT = 0.9;
const TOOLBAR_OPACITY_DEFAULT = 0.5;
var ConfigurableUiActionId = /* @__PURE__ */ ((ConfigurableUiActionId2) => {
  ConfigurableUiActionId2["SetSnapMode"] = "configurableui:set_snapmode";
  ConfigurableUiActionId2["SetTheme"] = "configurableui:set_theme";
  ConfigurableUiActionId2["SetToolPrompt"] = "configurableui:set_toolprompt";
  ConfigurableUiActionId2["SetWidgetOpacity"] = "configurableui:set_widget_opacity";
  ConfigurableUiActionId2["SetDragInteraction"] = "configurableui:set-drag-interaction";
  ConfigurableUiActionId2["SetShowWidgetIcon"] = "configurableui:set-show-widget-icon";
  ConfigurableUiActionId2["AutoCollapseUnpinnedPanels"] = "configurableui:set-auto-collapse-unpinned-panels";
  ConfigurableUiActionId2["SetViewOverlayDisplay"] = "configurableui:set-view-overlay-display";
  ConfigurableUiActionId2["AnimateToolSettings"] = "configurableui:set-animate-tool-settings";
  ConfigurableUiActionId2["UseToolAsToolSettingsLabel"] = "configurableui:set-use-tool-as-tool-settings-label";
  ConfigurableUiActionId2["SetToolbarOpacity"] = "configurableui:set-toolbar-opacity";
  return ConfigurableUiActionId2;
})(ConfigurableUiActionId || {});
const initialConfigurableUiState = {
  snapMode: SnapMode.NearestKeypoint,
  toolPrompt: "",
  theme: SYSTEM_PREFERRED_COLOR_THEME,
  widgetOpacity: WIDGET_OPACITY_DEFAULT,
  useDragInteraction: false,
  showWidgetIcon: true,
  autoCollapseUnpinnedPanels: false,
  viewOverlayDisplay: true,
  animateToolSettings: false,
  useToolAsToolSettingsLabel: false,
  toolbarOpacity: TOOLBAR_OPACITY_DEFAULT
};
function ConfigurableUiReducer(state = initialConfigurableUiState, action) {
  const outState = state;
  switch (action.type) {
    case "configurableui:set_snapmode": {
      return { ...state, snapMode: action.payload };
    }
    case "configurableui:set_toolprompt": {
      return { ...state, toolPrompt: action.payload };
    }
    case "configurableui:set_theme": {
      return { ...state, theme: action.payload };
    }
    case "configurableui:set_widget_opacity": {
      return { ...state, widgetOpacity: action.payload };
    }
    case "configurableui:set-drag-interaction": {
      return { ...state, useDragInteraction: action.payload };
    }
    case "configurableui:set-show-widget-icon": {
      return { ...state, showWidgetIcon: action.payload };
    }
    case "configurableui:set-auto-collapse-unpinned-panels": {
      return { ...state, autoCollapseUnpinnedPanels: action.payload };
    }
    case "configurableui:set-view-overlay-display": {
      return { ...state, viewOverlayDisplay: action.payload };
    }
    case "configurableui:set-animate-tool-settings": {
      return { ...state, animateToolSettings: action.payload };
    }
    case "configurableui:set-use-tool-as-tool-settings-label": {
      return { ...state, useToolAsToolSettingsLabel: action.payload };
    }
    case "configurableui:set-toolbar-opacity": {
      return { ...state, toolbarOpacity: action.payload };
    }
  }
  return outState;
}
class MessageBoxCallbacks {
  constructor(onFulfilled, onRejected) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
  }
  handleMessageBoxResult = (result) => {
    this.onFulfilled(result);
  };
}
class MessageAddedEvent extends UiEvent {
}
class MessagesUpdatedEvent extends UiEvent {
}
class ActivityMessageUpdatedEvent extends UiEvent {
}
class ActivityMessageCancelledEvent extends UiEvent {
}
class InputFieldMessageAddedEvent extends UiEvent {
}
class InputFieldMessageRemovedEvent extends UiEvent {
}
class OpenMessageCenterEvent extends UiEvent {
}
class ToolAssistanceChangedEvent extends UiEvent {
}
class OngoingActivityMessage {
  message = "";
  percentage = 0;
  details = new ActivityMessageDetails(
    true,
    true,
    true
  );
  isRestored = false;
}
class MessageManager {
  static _maxCachedMessages = 500;
  static _maxDisplayedStickyMessages = 3;
  static _messages = [];
  static _ongoingActivityMessage = new OngoingActivityMessage();
  static _lastMessage;
  static _activeMessageManager = new StatusMessageManager();
  static _animateOutToElement = [];
  static _toastCloseCallbacks = [];
  /** The MessageAddedEvent is fired when a message is added via outputMessage(). */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static onMessageAddedEvent = new MessageAddedEvent();
  /** The MessagesUpdatedEvent is fired when a message is added or the messages are cleared. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static onMessagesUpdatedEvent = new MessagesUpdatedEvent();
  /** The ActivityMessageUpdatedEvent is fired when an Activity message updates via outputActivityMessage(). */
  static onActivityMessageUpdatedEvent = new ActivityMessageUpdatedEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** The ActivityMessageCancelledEvent is fired when an Activity message is cancelled via
   * endActivityMessage(ActivityMessageEndReason.Cancelled) or
   * by the user clicking the 'Cancel' link.
   */
  static onActivityMessageCancelledEvent = new ActivityMessageCancelledEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  static onInputFieldMessageAddedEvent = new InputFieldMessageAddedEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  static onInputFieldMessageRemovedEvent = new InputFieldMessageRemovedEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  static onOpenMessageCenterEvent = new OpenMessageCenterEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** @internal */
  static onDisplayMessage = new BeUiEvent();
  /** The ToolAssistanceChangedEvent is fired when a tool calls IModelApp.notifications.setToolAssistance().
   * @public
   */
  static onToolAssistanceChangedEvent = new ToolAssistanceChangedEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** List of messages as NotifyMessageDetailsType. */
  static get messages() {
    return this._messages;
  }
  /** Manager of active messages. */
  static get activeMessageManager() {
    return this._activeMessageManager;
  }
  /** Clear the message list. */
  static clearMessages() {
    this._messages.splice(0);
    this._activeMessageManager.initialize();
    this._toastCloseCallbacks.forEach(({ close }) => close());
    this._toastCloseCallbacks.splice(0);
    this.onMessagesUpdatedEvent.emit({});
    this._lastMessage = void 0;
  }
  /** Update the message list. */
  static updateMessages() {
    this.onMessagesUpdatedEvent.emit({});
  }
  /** Set the maximum number of cached message. */
  static setMaxCachedMessages(max) {
    this._maxCachedMessages = max;
    this.checkMaxCachedMessages();
  }
  /** The maximum number of displayed Sticky messages. */
  static get maxDisplayedStickyMessages() {
    return this._maxDisplayedStickyMessages;
  }
  static set maxDisplayedStickyMessages(max) {
    this._maxDisplayedStickyMessages = max;
  }
  /** Output a message and/or alert to the user.
   * @param  message  Details about the message to output.
   */
  static outputMessage(message) {
    if (message.msgType === OutputMessageType.Pointer) {
      PointerMessage.showMessage(message);
    } else if (message.msgType === OutputMessageType.InputField) {
      if (message.inputField)
        MessageManager.displayInputFieldMessage(
          message.inputField,
          message.briefMessage,
          message.detailedMessage,
          message.priority
        );
      else message.msgType = OutputMessageType.Sticky;
    } else if (message.msgType === OutputMessageType.Alert) {
      if (message.openAlert === OutputMessageAlert.Balloon)
        message.msgType = OutputMessageType.Sticky;
      else MessageManager.showAlertMessageBox(message);
    }
    MessageManager.addMessage(message);
  }
  /** Set the element where messages should be animated out to on exit.
   * @param  element `HTMLElement` to animate out to.
   */
  static registerAnimateOutToElement(element) {
    this._animateOutToElement = !element ? [] : [element, ...this._animateOutToElement];
  }
  /** Handles disconnected element modal frontstages, revert to last still displayed. */
  static get animateOutToElement() {
    if (this._animateOutToElement.length === 0) {
      return void 0;
    }
    if (this._animateOutToElement[0]?.isConnected) {
      return this._animateOutToElement[0];
    }
    this._animateOutToElement.splice(0, 1);
    return this.animateOutToElement;
  }
  /** Display a message.
   * Works only with `Sticky` and `Toast` message types.
   * @param  message  Details about the message to display.
   * @param options Optionally override individual toast parameters.
   * @param settings Optionally override all toasts settings (i.e. placement or order).
   * @returns Object with reference to the message (i.e. to close it programmatically) if it was displayed.
   */
  static displayMessage(message, options, settings2) {
    if (message.msgType !== OutputMessageType.Sticky && message.msgType !== OutputMessageType.Toast) {
      return void 0;
    }
    const args = {
      message,
      options,
      settings: settings2,
      animateOutToElement: this.animateOutToElement
    };
    this.onDisplayMessage.emit(args);
    return {
      close: () => {
        args.close?.();
      }
    };
  }
  /** Output a message and/or alert to the user.
   * @param message Details about the message to output.
   */
  static addMessage(message) {
    const activeMessage = this.activeMessageManager.messages.find(
      (m) => isEqual(message, m.messageDetails)
    );
    if (activeMessage) return;
    this.activeMessageManager.add(message);
    this.refreshToastMessages();
    this.onMessageAddedEvent.emit({ message });
    if (!isEqual(message, this._lastMessage)) {
      this.addToMessageCenter(message);
      this._lastMessage = message;
    }
  }
  /**
   * Closes sticky messages that are beyond the limit,
   * opens new toast and sticky messages from the active message manager.
   */
  static refreshToastMessages() {
    this._toastCloseCallbacks = this._toastCloseCallbacks.filter((t) => {
      if (MessageManager.activeMessageManager.messages.some(
        (msg) => t.id === msg.id
      )) {
        return true;
      }
      t.close();
      return false;
    });
    const messagesToAdd = MessageManager.activeMessageManager.messages.filter(
      (msg) => !this._toastCloseCallbacks.find((m) => m.id === msg.id)
    );
    messagesToAdd.forEach((msg) => {
      const displayedMessage = MessageManager.displayMessage(
        msg.messageDetails,
        {
          onRemove: () => {
            MessageManager.activeMessageManager.remove(msg.id);
          }
        }
      );
      if (!!displayedMessage)
        this._toastCloseCallbacks.push({
          close: displayedMessage.close,
          id: msg.id
        });
    });
  }
  /** Add a message to the Message Center.
   * @param  message  Details about the message to output.
   */
  static addToMessageCenter(message) {
    this._messages.push(message);
    this.onMessagesUpdatedEvent.emit({});
    this.checkMaxCachedMessages();
  }
  /** Checks number of messages against the maximum. */
  static checkMaxCachedMessages() {
    if (this._messages.length > this._maxCachedMessages) {
      const numToErase = this._maxCachedMessages / 4;
      this._messages.splice(0, numToErase);
      this.onMessagesUpdatedEvent.emit({});
    }
  }
  /**
   * Sets details for setting up an Activity message.
   * @param details    Details for setup of ActivityMessage
   * @returns true if details is valid and can be used to display ActivityMessage
   */
  static setupActivityMessageDetails(details) {
    this._ongoingActivityMessage.details = details;
    this._ongoingActivityMessage.isRestored = details.showDialogInitially;
    return true;
  }
  /**
   * Output an activity message to the user.
   * @param message         The message text.
   * @param percentComplete The percentage of completion.
   * @return true if the message was displayed, false if the message could not be displayed.
   */
  static outputActivityMessage(message, percentComplete) {
    return MessageManager.setupActivityMessageValues(message, percentComplete);
  }
  /**
   * Sets values on _OngoingActivityMessage to be referenced when displaying
   * an ActivityMessage.
   * @param message     Message of the process that ActivityMessage is tracking
   * @param percentage  Progress made by activity in percentage
   * @param restored    True if original ActivityMessage has been closed and
   *                    is now being restored from the status bar.
   * @returns true if details is valid and can be used to display ActivityMessage
   */
  static setupActivityMessageValues(message, percentage, restored) {
    this._ongoingActivityMessage.message = message;
    this._ongoingActivityMessage.percentage = percentage;
    this.onActivityMessageUpdatedEvent.emit({
      message,
      percentage,
      details: this._ongoingActivityMessage.details,
      restored: restored !== void 0 ? restored : this._ongoingActivityMessage.isRestored
    });
    this._ongoingActivityMessage.isRestored = false;
    return true;
  }
  /**
   * Dismisses current ActivityMessage and ends activity if canceled.
   * @param isCompleted   True if the activity was completed, false if it was canceled
   * @returns True if both ActivityMessage and activity process are ended.
   */
  static endActivityMessage(isCompleted) {
    this.endActivityProcessing(isCompleted);
    this.onActivityMessageCancelledEvent.emit({});
    return true;
  }
  /**
   * Ends processing for activity according to message definition.
   * @param isCompleted   True if the activity was completed, false if it was canceled
   */
  static endActivityProcessing(isCompleted) {
    if (isCompleted) this._ongoingActivityMessage.details.onActivityCompleted();
    else this._ongoingActivityMessage.details.onActivityCancelled();
  }
  /**
   * Displays an input field message near target element.
   * @param target  The currently focused or recently focused element to place the
   *                input field message near.
   * @param messageText  Text to display in the message.
   * @param detailedMessage   Optional detailed message text to display.
   * @param priority   Optional message priority which controls icon to display.
   */
  static displayInputFieldMessage(target, messageText, detailedMessage = "", priority = OutputMessagePriority.Error) {
    this.onInputFieldMessageAddedEvent.emit({
      target,
      messageText,
      detailedMessage,
      priority
    });
  }
  /**
   * Hides the currently displayed input field message.
   */
  static hideInputFieldMessage() {
    this.onInputFieldMessageRemovedEvent.emit({});
  }
  /**
   * Opens message center.
   */
  static openMessageCenter() {
    this.onOpenMessageCenterEvent.emit({});
  }
  /** Output a prompt to the user. A 'prompt' indicates an action the user should take to proceed. */
  static outputPrompt(prompt) {
    if (UiFramework.frameworkState) {
      UiFramework.dispatchActionToStore(
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        ConfigurableUiActionId.SetToolPrompt,
        prompt,
        true
      );
      return;
    }
  }
  /** Extracts the message severity from the message details and returns the corresponding React icon.
   * @param details NotifyMessageDetailsType
   * @returns IconSpec
   * @deprecated in 4.16.0. Use {@link https://itwinui.bentley.com/ iTwinUI icons} instead.
   */
  static getIconSpecFromDetails(details) {
    const severity = MessageManager.getSeverity(details);
    let iconSpec = /* @__PURE__ */ jsxRuntimeExports.jsx(SvgStatusSuccess$1, {});
    switch (severity) {
      case MessageSeverity.Error:
      case MessageSeverity.Fatal:
        iconSpec = /* @__PURE__ */ jsxRuntimeExports.jsx(SvgStatusError$1, {});
        break;
      case MessageSeverity.Warning:
        iconSpec = /* @__PURE__ */ jsxRuntimeExports.jsx(SvgStatusWarning$1, {});
        break;
      case MessageSeverity.Information:
        iconSpec = /* @__PURE__ */ jsxRuntimeExports.jsx(SvgInfo$1, {});
        break;
    }
    return iconSpec;
  }
  /** Gets an icon CSS class name based on a given NotifyMessageDetailsType.
   * @public
   * @deprecated in 4.16.0. Used internally.
   */
  static getIconClassName(details) {
    const severity = MessageManager.getSeverity(details);
    const className = MessageContainer.getIconClassName(severity);
    const iconClassName = classnames("icon", "notifymessage-icon", className);
    return iconClassName;
  }
  /** Gets a MessageSeverity based on a given NotifyMessageDetailsType. */
  static getSeverity(details) {
    let severity = MessageSeverity.None;
    switch (details.priority) {
      case OutputMessagePriority.None:
        severity = MessageSeverity.Success;
        break;
      case OutputMessagePriority.Success:
        severity = MessageSeverity.Success;
        break;
      case OutputMessagePriority.Info:
        severity = MessageSeverity.Information;
        break;
      case OutputMessagePriority.Warning:
        severity = MessageSeverity.Warning;
        break;
      case OutputMessagePriority.Error:
        severity = MessageSeverity.Error;
        break;
      case OutputMessagePriority.Fatal:
        severity = MessageSeverity.Fatal;
        break;
    }
    return severity;
  }
  /** Gets a MessageBoxIconType based on a given NotifyMessageDetailsType. */
  static getIconType(details) {
    let iconType = MessageBoxIconType.NoSymbol;
    switch (details.priority) {
      case OutputMessagePriority.None:
        iconType = MessageBoxIconType.NoSymbol;
        break;
      case OutputMessagePriority.Success:
        iconType = MessageBoxIconType.Success;
        break;
      case OutputMessagePriority.Info:
        iconType = MessageBoxIconType.Information;
        break;
      case OutputMessagePriority.Warning:
        iconType = MessageBoxIconType.Warning;
        break;
      case OutputMessagePriority.Error:
        iconType = MessageBoxIconType.Critical;
        break;
      case OutputMessagePriority.Fatal:
        iconType = MessageBoxIconType.Critical;
        break;
    }
    return iconType;
  }
  /** Output a MessageBox and wait for response from the user.
   * @param mbType       The MessageBox type.
   * @param message      The message to display.
   * @param icon         The MessageBox icon type.
   * @return the response from the user.
   */
  static async openMessageBox(mbType, message, icon) {
    return new Promise(
      (onFulfilled, onRejected) => {
        const messageBoxCallbacks = new MessageBoxCallbacks(
          onFulfilled,
          onRejected
        );
        const messageElement = /* @__PURE__ */ jsxRuntimeExports.jsx(MessageRenderer$1, { message, useSpan: true });
        UiFramework.dialogs.modal.open(
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StandardMessageBox,
            {
              opened: true,
              messageBoxType: mbType,
              iconType: icon,
              title: UiFramework.translate("general.alert"),
              onResult: messageBoxCallbacks.handleMessageBoxResult,
              children: messageElement
            }
          )
        );
      }
    );
  }
  /** @internal */
  static showAlertMessageBox(messageDetails) {
    UiFramework.dialogs.modal.open(
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { messageDetails })
    );
  }
  /** Setup tool assistance instructions for a tool. The instructions include the main instruction, which includes the current prompt.
   * @param instructions The tool assistance instructions.
   * @public
   */
  static setToolAssistance(instructions) {
    MessageManager.onToolAssistanceChangedEvent.emit({ instructions });
  }
  /** Show a tooltip window. Saves tooltip location for AccuSnap to test if cursor has moved far enough away to close tooltip.
   * @param htmlElement The HTMLElement that anchors the tooltip.
   * @param message     What to display inside the tooltip.
   * @param location    An optional location, relative to the origin of htmlElement, for the tooltip. If undefined, center of `htmlElement`.
   * @param options     Options that supply additional information about how the tooltip should function.
   */
  static openToolTip(htmlElement, message, location, options) {
    IModelApp.notifications.toolTipLocation.setFrom(location);
    ElementTooltip.showTooltip(htmlElement, message, location, options);
  }
  /** @internal */
  static closeAllMessages() {
    ElementTooltip.hideTooltip();
    PointerMessage.hideMessage();
    MessageManager.clearMessages();
    MessageManager.hideInputFieldMessage();
    MessageManager.endActivityMessage(false);
  }
}
function AlertDialog({ messageDetails }) {
  const { briefMessage, detailedMessage, priority } = messageDetails;
  const iconType = MessageManager.getIconType(messageDetails);
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text$1, { variant: "leading", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageRenderer$1, { message: briefMessage, useSpan: true }) }),
    detailedMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text$1, { variant: "body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageRenderer$1, { message: detailedMessage, useSpan: true }) }) })
  ] });
  const { translate } = useTranslation();
  const title = reactExports.useMemo(() => {
    switch (priority) {
      case OutputMessagePriority.Error:
      case OutputMessagePriority.Fatal:
        return translate("general.error");
      case OutputMessagePriority.Warning:
        return translate("general.warning");
      case OutputMessagePriority.Info:
        return translate("general.information");
      case OutputMessagePriority.Success:
        return translate("general.success");
    }
    return translate("general.alert");
  }, [priority, translate]);
  return (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StandardMessageBox,
      {
        opened: true,
        messageBoxType: MessageBoxType.Ok,
        iconType,
        title,
        children: content
      }
    )
  );
}
function Dialog(props) {
  const className = classnames("nz-footer-dialog-dialog", props.className);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, style: props.style, "data-testid": "footer-dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: props.titleBar }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: props.children })
  ] });
}
Dialog.__docgenInfo = { "description": "Dialog used in footer indicators.\n@note See [[MessageCenter]], [[ToolAssistance]]\n@note Use [StatusBarDialog]($appui-react) instead\n@internal", "methods": [], "displayName": "Dialog", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Dialog content." }, "titleBar": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Dialog title bar. See [[TitleBar]]" } }, "composes": ["CommonProps"] };
function StatusBarDialogTitleBarButton(props) {
  const { title, ...otherProps } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    IconButton,
    {
      ...otherProps,
      styleType: "borderless",
      size: "small",
      label: title
    }
  );
}
StatusBarDialogTitleBarButton.__docgenInfo = { "description": "Dialog component used in a [[StatusBarDialog]] component.\n@beta", "methods": [], "displayName": "StatusBarDialogTitleBarButton", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Button content." }, "onClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Function called when button is clicked." }, "title": { "required": false, "tsType": { "name": "string" }, "description": "Button title." } }, "composes": ["CommonProps"] };
function TitleBar(props) {
  const className = classnames("nz-footer-dialog-titleBar", props.className);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, style: props.style, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nz-title", children: props.title }),
    props.children
  ] });
}
TitleBar.__docgenInfo = { "description": "Title bar of [[Dialog]] component.\n@note Use [StatusBarDialog.TitleBar]($appui-react) instead\n@internal", "methods": [], "displayName": "TitleBar", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Title bar buttons. I.e. [[TitleBarButton]]" }, "title": { "required": false, "tsType": { "name": "string" }, "description": "Title bar title." } }, "composes": ["CommonProps"] };
function StatusBarDialogTitleBar(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TitleBar, { ...props });
}
StatusBarDialogTitleBar.__docgenInfo = { "description": "Dialog component used in a [[StatusBarDialog]] component.\n@beta", "methods": [], "displayName": "StatusBarDialogTitleBar", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Title bar buttons." }, "title": { "required": false, "tsType": { "name": "string" }, "description": "Title bar title." } }, "composes": ["CommonProps"] };
function StatusBarDialog(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { ...props });
}
((StatusBarDialog2) => {
  StatusBarDialog2.TitleBar = StatusBarDialogTitleBar;
  StatusBarDialog2.TitleBarButton = StatusBarDialogTitleBarButton;
})(StatusBarDialog || (StatusBarDialog = {}));
StatusBarDialog.__docgenInfo = { "description": "Dialog component used in a [[StatusBarIndicator]] component.\n@beta", "methods": [], "displayName": "StatusBarDialog", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Dialog content." }, "titleBar": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Dialog title bar. See [[StatusBarDialog.TitleBar]]" } }, "composes": ["CommonProps"] };
create((set) => ({
  containers: {},
  setContainer: (tabId, container) => {
    set(
      (state) => produce(state, (draft) => {
        if (!container) {
          delete draft.containers[tabId];
          return;
        }
        draft.containers[tabId] = castDraft(container);
      })
    );
  }
}));
const WidgetContentManagerContext = reactExports.createContext(void 0);
WidgetContentManagerContext.displayName = "nz:WidgetContentManagerContext";
function isTabDropTargetState(state) {
  return state.type === "tab";
}
function isPanelDropTargetState(state) {
  return state.type === "panel";
}
function isSectionDropTargetState(state) {
  return state.type === "section";
}
function isWidgetDropTargetState(state) {
  return state.type === "widget";
}
function isWindowDropTargetState(state) {
  return state.type === "window";
}
function isWidgetDragDropTargetState(state) {
  if (state.type === "floatingWidget") return false;
  return true;
}
function isTabDragDropTargetState(state) {
  if (state.type === "window") return false;
  return true;
}
function useDragTab(args) {
  const { tabId, onDrag, onDragEnd } = args;
  const item = reactExports.useMemo(() => {
    return {
      type: "tab",
      id: tabId
    };
  }, [tabId]);
  const handleDrag = reactExports.useCallback(
    (_item, info) => {
      const dragBy = info.lastPointerPosition.getOffsetTo(info.pointerPosition);
      onDrag && onDrag(dragBy);
    },
    [onDrag]
  );
  const handleDragEnd = reactExports.useCallback(
    (_item, info, target) => {
      if (!onDragEnd) return;
      let tabTarget;
      if (target && isTabDragDropTargetState(target)) {
        tabTarget = target;
      } else {
        const tabInfo = info;
        const newFloatingWidgetId = getUniqueId();
        const size = tabInfo.widgetSize;
        tabTarget = {
          type: "floatingWidget",
          newFloatingWidgetId,
          size
        };
      }
      onDragEnd(tabTarget);
    },
    [onDragEnd]
  );
  const onDragStart = useDragItem({
    item,
    onDrag: handleDrag,
    onDragEnd: handleDragEnd
  });
  const handleDragStart = reactExports.useCallback(
    ({
      initialPointerPosition,
      pointerPosition,
      widgetSize
    }) => {
      onDragStart({
        initialPointerPosition,
        pointerPosition,
        lastPointerPosition: initialPointerPosition,
        widgetSize
      });
    },
    [onDragStart]
  );
  return handleDragStart;
}
function useDragWidget(args) {
  const { widgetId, onDragStart, onDrag, onDragEnd } = args;
  const dragManager = reactExports.useContext(DragManagerContext);
  const widgetItem = reactExports.useMemo(() => {
    return {
      type: "widget",
      id: widgetId
    };
  }, [widgetId]);
  const handleDragStart = reactExports.useCallback(
    (_item, info) => {
      onDragStart && onDragStart(
        (id) => {
          dragManager.handleDragUpdate({
            type: "widget",
            id
          });
        },
        info.initialPointerPosition,
        info.pointerPosition
      );
    },
    [dragManager, onDragStart]
  );
  const handleDrag = reactExports.useCallback(
    (_item, info) => {
      const dragBy = info.lastPointerPosition.getOffsetTo(info.pointerPosition);
      onDrag && onDrag(dragBy);
    },
    [onDrag]
  );
  const handleDragEnd = reactExports.useCallback(
    (_item, _info, target) => {
      if (!onDragEnd) return;
      let widgetTarget;
      if (target && isWidgetDragDropTargetState(target)) {
        widgetTarget = target;
      } else {
        widgetTarget = {
          type: "window"
        };
      }
      onDragEnd(widgetTarget);
    },
    [onDragEnd]
  );
  const isDragItem = reactExports.useCallback((item, dragged) => {
    return !!item && defaultIsDragItem(item, dragged);
  }, []);
  const onItemDragStart = useDragItem({
    item: widgetItem,
    isDragItem,
    onDragStart: handleDragStart,
    onDrag: handleDrag,
    onDragEnd: handleDragEnd
  });
  const handleWidgetDragStart = reactExports.useCallback(
    ({ initialPointerPosition, pointerPosition }) => {
      onItemDragStart({
        initialPointerPosition,
        pointerPosition,
        lastPointerPosition: initialPointerPosition
      });
    },
    [onItemDragStart]
  );
  return handleWidgetDragStart;
}
function useDragResizeHandle(args) {
  const { handle, onDrag, widgetId } = args;
  const resizeHandleItem = reactExports.useMemo(() => {
    return {
      type: "resizeHandle",
      id: handle,
      widgetId
    };
  }, [handle, widgetId]);
  const isDragItem = reactExports.useCallback((item, draggedItem) => {
    return !!item && isResizeHandleDragItem(draggedItem) && defaultIsDragItem(item, draggedItem) && item.widgetId === draggedItem.widgetId;
  }, []);
  const handleDrag = reactExports.useCallback(
    (_item, info) => {
      onDrag && onDrag(info.pointerPosition);
    },
    [onDrag]
  );
  const onItemDragStart = useDragItem({
    item: resizeHandleItem,
    isDragItem,
    onDrag: handleDrag
  });
  const handleDragStart = reactExports.useCallback(
    ({ initialPointerPosition }) => {
      onItemDragStart({
        initialPointerPosition,
        pointerPosition: initialPointerPosition,
        lastPointerPosition: initialPointerPosition
      });
    },
    [onItemDragStart]
  );
  return handleDragStart;
}
function useTarget(target) {
  const dragManager = reactExports.useContext(DragManagerContext);
  const [targeted, setTargeted] = reactExports.useState(false);
  const targetedRef = reactExports.useRef(false);
  const onTargeted = reactExports.useCallback(
    (doTarget) => {
      const isTargeted = dragManager.isTargeted(target);
      if (doTarget && !isTargeted) {
        dragManager.handleTargetChanged(target);
      } else if (!doTarget && isTargeted) {
        dragManager.handleTargetChanged(void 0);
      }
      setTargeted(doTarget);
    },
    [dragManager, target]
  );
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    return dragManager.onDrag.addListener((_item, info) => {
      const targetedElement = document.elementFromPoint(
        info.pointerPosition.x,
        info.pointerPosition.y
      );
      const newTargeted = targetedElement === ref.current;
      newTargeted !== targetedRef.current && onTargeted(newTargeted);
      targetedRef.current = newTargeted;
    });
  }, [onTargeted, dragManager]);
  reactExports.useEffect(() => {
    return dragManager.onDragEnd.addListener(() => {
      targetedRef.current && onTargeted(false);
      targetedRef.current = false;
    });
  }, [onTargeted, dragManager]);
  return [ref, targeted];
}
function defaultIsDragItem(item, dragged) {
  return dragged.type === item.type && dragged.id === item.id;
}
function useDragItem(args) {
  const dragManager = reactExports.useContext(DragManagerContext);
  const { item, isDragItem, onDragStart, onDrag, onDragEnd } = args;
  const handleDragStart = reactExports.useCallback(
    (info) => {
      item && dragManager.handleDragStart({
        item,
        info
      });
    },
    [dragManager, item]
  );
  reactExports.useEffect(() => {
    return dragManager.onDragStart.addListener((draggedItem, info, target) => {
      const handleEvent = isDragItem ? isDragItem(item, draggedItem) : defaultIsDragItem(item, draggedItem);
      if (!handleEvent) return;
      onDragStart && onDragStart(draggedItem, info, target);
    });
  }, [dragManager, onDragStart, item, isDragItem]);
  reactExports.useEffect(() => {
    return dragManager.onDrag.addListener((draggedItem, info, target) => {
      const handleEvent = isDragItem ? isDragItem(item, draggedItem) : defaultIsDragItem(item, draggedItem);
      if (!handleEvent) return;
      onDrag && onDrag(draggedItem, info, target);
    });
  }, [dragManager, onDrag, item, isDragItem]);
  reactExports.useEffect(() => {
    return dragManager.onDragEnd.addListener((draggedItem, info, target) => {
      const handleEvent = isDragItem ? isDragItem(item, draggedItem) : defaultIsDragItem(item, draggedItem);
      if (!handleEvent) return;
      onDragEnd && onDragEnd(draggedItem, info, target);
    });
  }, [dragManager, onDragEnd, item, isDragItem]);
  return handleDragStart;
}
function useDraggedItem() {
  const dragManager = reactExports.useContext(DragManagerContext);
  const subscribe2 = reactExports.useCallback(
    (onStoreChange) => {
      const listeners = [
        dragManager.onDragStart.addListener(onStoreChange),
        dragManager.onDragUpdate.addListener(onStoreChange),
        dragManager.onDragEnd.addListener(onStoreChange)
      ];
      return () => listeners.forEach((l) => l());
    },
    [dragManager]
  );
  const getSnapshot2 = reactExports.useCallback(() => {
    return dragManager.draggedItem?.item;
  }, [dragManager]);
  return reactExports.useSyncExternalStore(subscribe2, getSnapshot2);
}
function useIsDraggedItem(item) {
  const draggedItem = useDraggedItem();
  return !!draggedItem && draggedItem.id === item.id && draggedItem.type === item.type;
}
function isResizeHandleDragItem(item) {
  return item.type === "resizeHandle";
}
const DragManagerContext = reactExports.createContext(null);
DragManagerContext.displayName = "nz:DragManagerContext";
const DraggedWidgetIdContext = reactExports.createContext(void 0);
DraggedWidgetIdContext.displayName = "nz:DraggedWidgetIdContext";
const DraggedPanelSideContext = reactExports.createContext(void 0);
DraggedPanelSideContext.displayName = "nz:DraggedPanelSideContext";
const DraggedResizeHandleContext = reactExports.createContext(void 0);
DraggedResizeHandleContext.displayName = "nz:DraggedResizeHandleContext";
function useTargeted() {
  const dragManager = reactExports.useContext(DragManagerContext);
  const [targeted, setTargeted] = reactExports.useState();
  reactExports.useEffect(() => {
    return dragManager.onTargetChanged.addListener((t) => {
      setTargeted(t);
    });
  }, [dragManager]);
  return targeted;
}
function isFloatingWidgetLocation(location) {
  return "floatingWidgetId" in location;
}
function isPopoutWidgetLocation(location) {
  return "popoutWidgetId" in location;
}
function isPanelWidgetLocation(location) {
  return "side" in location;
}
function getWidgetLocation(state, id) {
  if (id in state.floatingWidgets.byId) {
    return {
      floatingWidgetId: id
    };
  }
  if (state.popoutWidgets) {
    if (id in state.popoutWidgets.byId) {
      return {
        popoutWidgetId: id
      };
    }
  }
  for (const side of panelSides) {
    const panel = state.panels[side];
    const index = panel.widgets.indexOf(id);
    if (index >= 0) {
      return {
        side,
        index
      };
    }
  }
  return void 0;
}
function isFloatingTabLocation(location) {
  return "floatingWidgetId" in location;
}
function isPopoutTabLocation(location) {
  return "popoutWidgetId" in location;
}
function isPanelTabLocation(location) {
  return "side" in location;
}
function getTabLocation(state, id) {
  let widgetId;
  for (const [, widget2] of Object.entries(state.widgets)) {
    const index = widget2.tabs.indexOf(id);
    if (index >= 0) {
      widgetId = widget2.id;
      break;
    }
  }
  if (!widgetId) return void 0;
  const location = getWidgetLocation(state, widgetId);
  if (!location) return void 0;
  if (isFloatingWidgetLocation(location))
    return {
      floatingWidgetId: widgetId,
      widgetId
    };
  if (isPopoutWidgetLocation(location))
    return {
      popoutWidgetId: widgetId,
      widgetId
    };
  return {
    side: location.side,
    widgetId
  };
}
function isFloatingWidgetRestoreState(state) {
  return "floatingWidget" in state;
}
function isPanelWidgetRestoreState(state) {
  return "side" in state;
}
function createTabState(id, args) {
  return {
    label: "",
    ...args,
    id,
    unloaded: false
  };
}
function updateTabState(state, id, update) {
  if (!(id in state.tabs)) throw new UiError(category, "Tab does not exist");
  return produce(state, (draft) => {
    const tab = draft.tabs[id];
    update(tab);
  });
}
function updateSavedTabState(state, id, update) {
  return produce(state, (draft) => {
    const allIds = draft.savedTabs.allIds;
    const byId = draft.savedTabs.byId;
    let tab = byId[id];
    if (!tab) {
      allIds.push(id);
      tab = byId[id] = { id };
    } else {
      const index = allIds.indexOf(id);
      allIds.splice(index, 1);
      allIds.push(id);
    }
    update(tab);
  });
}
function addTab(state, id, tabArgs) {
  if (id in state.tabs) throw new UiError(category, "Tab already exists");
  const tab = {
    ...createTabState(id),
    ...tabArgs
  };
  return produce(state, (stateDraft) => {
    stateDraft.tabs[id] = castDraft(tab);
  });
}
function addTabToWidget(state, tabId, widgetId) {
  return insertTabToWidget(state, tabId, widgetId, Infinity);
}
function insertTabToWidget(state, tabId, widgetId, tabIndex) {
  if (!(tabId in state.tabs))
    throw new UiError(category, "Tab does not exist", void 0, () => ({
      tabId
    }));
  assertWidgetState(state, widgetId);
  const location = getTabLocation(state, tabId);
  if (location)
    throw new UiError(
      category,
      "Tab is already in a widget",
      void 0,
      () => ({ tabId, widgetId: location.widgetId })
    );
  return produce(state, (draft) => {
    const widget2 = getWidgetState$1(draft, widgetId);
    widget2.tabs.splice(tabIndex, 0, tabId);
  });
}
function removeTabFromWidget(state, tabId) {
  const location = getTabLocation(state, tabId);
  if (!location) return state;
  const widgetId = location.widgetId;
  const widget2 = getWidgetState$1(state, widgetId);
  const tabs2 = [...widget2.tabs];
  const tabIndex = tabs2.indexOf(tabId);
  tabs2.splice(tabIndex, 1);
  if (tabs2.length === 0) {
    return removeWidget(state, widgetId);
  }
  if (tabId === widget2.activeTabId) {
    state = setWidgetActiveTabId(state, widget2.id, tabs2[0]);
  }
  return updateWidgetState(state, widgetId, {
    tabs: tabs2
  });
}
function removeTab(state, tabId) {
  if (!(tabId in state.tabs)) throw new UiError(category, "Tab does not exist");
  state = removeTabFromWidget(state, tabId);
  return produce(state, (draft) => {
    delete draft.tabs[tabId];
    if (draft.toolSettings?.tabId === tabId) {
      draft.toolSettings = void 0;
    }
  });
}
const defaultHomeState = {
  side: "left",
  widgetId: "",
  widgetIndex: 0,
  tabIndex: 0
};
function addRemovedTab(state, tabId) {
  if (!(tabId in state.tabs))
    throw new UiError(category, "Tab does not exist", void 0, () => ({
      tabId
    }));
  const savedTab = state.savedTabs.byId[tabId];
  const home = savedTab?.home || defaultHomeState;
  const { tabIndex, widgetId } = home;
  if (widgetId in state.widgets) {
    return insertTabToWidget(state, tabId, widgetId, tabIndex);
  }
  if (isFloatingWidgetRestoreState(home)) {
    const nzBounds = Rectangle.createFromSize(state.size);
    const bounds = Rectangle.create(home.floatingWidget.bounds).containIn(
      nzBounds
    );
    return addFloatingWidget(state, widgetId, [tabId], {
      ...home.floatingWidget,
      bounds: bounds.toProps()
    });
  }
  const panel = state.panels[home.side];
  if (panel.widgets.length >= panel.maxWidgetCount) {
    const sectionIndex = Math.min(panel.maxWidgetCount - 1, home.widgetIndex);
    const sectionId = panel.widgets[sectionIndex];
    return insertTabToWidget(state, tabId, sectionId, home.tabIndex);
  }
  const newSectionId = getUniqueId();
  return insertPanelWidget(
    state,
    panel.side,
    newSectionId,
    [tabId],
    home.widgetIndex
  );
}
function createWidgetState(id, tabs2, args) {
  if (tabs2.length === 0)
    throw new UiError(category, "Widget must contain tabs");
  return {
    activeTabId: tabs2[0],
    minimized: false,
    ...args,
    id,
    tabs: tabs2
  };
}
function updateWidgetState(state, id, args) {
  return produce(state, (draft) => {
    const widget2 = getWidgetState$1(draft, id);
    draft.widgets[id] = {
      ...widget2,
      ...castDraft(args)
    };
  });
}
function addWidgetState(state, id, tabs2, args) {
  if (id in state.widgets) throw new UiError(category, "Widget already exists");
  const widget2 = createWidgetState(id, tabs2, args);
  for (const tabId of widget2.tabs) {
    if (!(tabId in state.tabs))
      throw new UiError(category, "Tab does not exist", void 0, () => ({
        tabId
      }));
    const location = getTabLocation(state, tabId);
    if (location)
      throw new UiError(
        category,
        "Tab is already in a widget",
        void 0,
        () => ({ tabId, widgetId: location.widgetId })
      );
  }
  return produce(state, (draft) => {
    draft.widgets[id] = castDraft(widget2);
  });
}
function removeWidget(state, id) {
  const location = getWidgetLocation(state, id);
  if (!location) throw new UiError(category, "Widget not found");
  if (isFloatingWidgetLocation(location))
    return removeFloatingWidget(state, id);
  if (isPopoutWidgetLocation(location)) return removePopoutWidget(state, id);
  return removePanelWidget(state, id, location);
}
function removeWidgetState(state, id) {
  assertWidgetState(state, id);
  return produce(state, (draft) => {
    delete draft.widgets[id];
  });
}
function createFloatingWidgetState(id, args) {
  const bounds = toRectangleProps(args?.bounds);
  return {
    home: {
      side: "left",
      widgetId: "",
      widgetIndex: 0
    },
    ...args,
    bounds,
    id
  };
}
function createPopoutWidgetState(id, args) {
  const bounds = toRectangleProps(args?.bounds);
  const home = args?.home ? args.home : {
    side: "left",
    widgetId: "",
    widgetIndex: 0
  };
  return {
    ...args,
    home,
    bounds,
    id
  };
}
function updateFloatingWidgetState(state, id, args) {
  if (!(id in state.floatingWidgets.byId))
    throw new UiError(category, "Floating widget does not exist");
  return produce(state, (draft) => {
    const floatingWidget = draft.floatingWidgets.byId[id];
    const { bounds, ...other } = args;
    draft.floatingWidgets.byId[id] = {
      ...floatingWidget,
      ...other
    };
    if (bounds) setRectangleProps(floatingWidget.bounds, bounds);
  });
}
function removeFloatingWidget(state, id) {
  if (!(id in state.floatingWidgets.byId))
    throw new UiError(category, "Floating widget does not exist");
  state = produce(state, (draft) => {
    delete draft.floatingWidgets.byId[id];
    const idIndex = draft.floatingWidgets.allIds.indexOf(id);
    draft.floatingWidgets.allIds.splice(idIndex, 1);
  });
  return removeWidgetState(state, id);
}
function removePopoutWidget(state, id) {
  if (!(id in state.popoutWidgets.byId))
    throw new UiError(category, "Popout widget does not exist");
  state = produce(state, (draft) => {
    delete draft.popoutWidgets.byId[id];
    const index = state.popoutWidgets.allIds.indexOf(id);
    draft.popoutWidgets.allIds.splice(index, 1);
  });
  return removeWidgetState(state, id);
}
function removePanelWidget(state, id, location) {
  location = location || findPanelWidget(state, id);
  if (!location) throw new UiError(category, "Panel widget not found");
  state = updatePanelState(state, location.side, (draft) => {
    draft.widgets.splice(location.index, 1);
  });
  const widgets = state.panels[location.side].widgets;
  const expandedWidget = widgets.find((widgetId) => {
    const widget2 = getWidgetState$1(state, widgetId);
    return !widget2.minimized;
  });
  if (!expandedWidget && widgets.length > 0) {
    const firstWidgetId = widgets[0];
    state = updateWidgetState(state, firstWidgetId, {
      minimized: false
    });
  }
  return removeWidgetState(state, id);
}
function findPanelWidget(state, id) {
  const location = getWidgetLocation(state, id);
  if (location && isPanelWidgetLocation(location)) return location;
  return void 0;
}
function assertWidgetState(state, id) {
  if (!(id in state.widgets))
    throw new UiError(category, "Widget does not exist", void 0, () => ({
      id
    }));
}
function getWidgetState$1(state, id) {
  assertWidgetState(state, id);
  return state.widgets[id];
}
function setWidgetActiveTabId(state, widgetId, tabId) {
  const widget2 = getWidgetState$1(state, widgetId);
  if (!widget2.tabs.includes(tabId))
    throw new UiError(category, "Tab is not in a widget");
  state = updateWidgetState(state, widgetId, {
    activeTabId: tabId
  });
  const floatingWidget = state.floatingWidgets.byId[widgetId];
  if (floatingWidget) {
    const activeTab = state.tabs[tabId];
    const preferredFloatingWidgetSize = Rectangle.create(
      floatingWidget.bounds
    ).getSize();
    state = updateTabState(state, activeTab.id, (draft) => {
      initSizeProps(
        draft,
        "preferredFloatingWidgetSize",
        preferredFloatingWidgetSize
      );
    });
  }
  return state;
}
function getNewFloatingWidgetBounds(state) {
  const size = { height: 120, width: 200 };
  const initialPosition = new Point(360, 340);
  const nzBounds = Rectangle.createFromSize(state.size);
  const widgetsBounds = nzBounds.inset(20, 20, 20, 20);
  const offset = new Point(40, 40);
  let bounds = Rectangle.createFromSize(size);
  if (state.floatingWidgets.allIds.length === 0) {
    bounds = bounds.offset(initialPosition);
  } else {
    const widgetId = state.floatingWidgets.allIds[state.floatingWidgets.allIds.length - 1];
    const widget2 = state.floatingWidgets.byId[widgetId];
    const widgetBounds = Rectangle.create(widget2.bounds);
    const topLeft = widgetBounds.topLeft().offset(offset);
    bounds = bounds.offset(topLeft);
    const widgetBottomRight = new Point(
      widgetBounds.right,
      widgetBounds.bottom
    );
    const minBottomRight = widgetBottomRight.offset(offset);
    const x = Math.max(0, minBottomRight.x - bounds.right);
    const y = Math.max(0, minBottomRight.y - bounds.bottom);
    bounds = bounds.offset({ x, y });
  }
  if (bounds.bottom >= widgetsBounds.bottom) {
    bounds = bounds.setPosition({ x: bounds.left, y: widgetsBounds.top });
  }
  if (bounds.right >= widgetsBounds.right) {
    bounds = bounds.setPosition({
      x: widgetsBounds.left,
      y: widgetsBounds.top
    });
  }
  bounds = bounds.containIn(widgetsBounds);
  return bounds.toProps();
}
function addFloatingWidget(state, id, tabs2, floatingWidgetArgs, widgetArgs) {
  if (id in state.floatingWidgets.byId)
    throw new UiError(category, "Floating widget already exists");
  state = addWidgetState(state, id, tabs2, widgetArgs);
  let bounds = floatingWidgetArgs?.bounds;
  if (!bounds) {
    bounds = getNewFloatingWidgetBounds(state);
  }
  const tabId = tabs2[0];
  const tab = state.tabs[tabId];
  const resizable = tab.isFloatingWidgetResizable;
  const floatingWidget = createFloatingWidgetState(id, {
    bounds,
    resizable,
    ...floatingWidgetArgs
  });
  return produce(state, (stateDraft) => {
    stateDraft.floatingWidgets.byId[id] = floatingWidget;
    stateDraft.floatingWidgets.allIds.push(id);
  });
}
function addPopoutWidget(state, id, tabs2, popoutWidgetArgs, widgetArgs) {
  if (tabs2.length !== 1)
    throw new UiError(
      category,
      "Popout widget should contain one tab only",
      void 0,
      () => ({ tabs: tabs2 })
    );
  const popoutWidget = createPopoutWidgetState(id, popoutWidgetArgs);
  state = addWidgetState(state, id, tabs2, widgetArgs);
  return produce(state, (stateDraft) => {
    stateDraft.popoutWidgets.byId[id] = popoutWidget;
    stateDraft.popoutWidgets.allIds.push(id);
  });
}
function floatingWidgetBringToFront(state, floatingWidgetId) {
  return produce(state, (draft) => {
    const idIndex = draft.floatingWidgets.allIds.indexOf(floatingWidgetId);
    const spliced = draft.floatingWidgets.allIds.splice(idIndex, 1);
    draft.floatingWidgets.allIds.push(spliced[0]);
  });
}
const category = "appui-react:layout";
function toRectangleProps(rectangle) {
  if (rectangle) {
    return {
      bottom: rectangle.bottom,
      left: rectangle.left,
      right: rectangle.right,
      top: rectangle.top
    };
  }
  return new Rectangle().toProps();
}
function setRectangleProps(props, bounds) {
  props.left = bounds.left;
  props.right = bounds.right;
  props.top = bounds.top;
  props.bottom = bounds.bottom;
}
function setPointProps(props, point) {
  props.x = point.x;
  props.y = point.y;
}
function setSizeProps(props, size) {
  props.height = size.height;
  props.width = size.width;
}
function initSizeProps(obj, key, size) {
  if (obj[key] && size) {
    setSizeProps(obj[key], size);
    return;
  }
  obj[key] = size ? {
    height: size.height,
    width: size.width
  } : void 0;
}
function isToolSettingsFloatingWidget(state, id) {
  const widget2 = getWidgetState$1(state, id);
  const toolSettingsTabId = state.toolSettings?.tabId;
  return widget2.tabs.length === 1 && widget2.tabs[0] === toolSettingsTabId && id in state.floatingWidgets.byId;
}
function updateHomeOfToolSettingsWidget(state, id, home) {
  if (!isToolSettingsFloatingWidget(state, id)) return state;
  return updateFloatingWidgetState(state, id, {
    home
  });
}
function createPanelState(side) {
  return {
    collapseOffset: 100,
    collapsed: false,
    maxSize: 600,
    minSize: 200,
    pinned: true,
    resizable: true,
    side,
    size: void 0,
    widgets: [],
    maxWidgetCount: 2,
    splitterPercent: 50
  };
}
function createVerticalPanelState(side, args) {
  return {
    ...createPanelState(side),
    ...args,
    side
  };
}
function createHorizontalPanelState(side, args) {
  return {
    ...createPanelState(side),
    minSize: 100,
    span: true,
    ...args,
    side
  };
}
function createPanelsState(args) {
  return {
    bottom: createHorizontalPanelState("bottom"),
    left: createVerticalPanelState("left"),
    right: createVerticalPanelState("right"),
    top: createHorizontalPanelState("top"),
    ...args
  };
}
function updatePanelState(state, side, update) {
  return produce(state, (draft) => {
    const panel = draft.panels[side];
    update(panel);
  });
}
function getPanelPixelSizeFromSpec(side, appSize, panelSize) {
  if (typeof panelSize === "number") {
    return panelSize;
  }
  const fullSize = isHorizontalPanelSide(side) ? appSize.height : appSize.width;
  return panelSize.percentage / 100 * fullSize;
}
function getPanelSize(preferredSizeSpec, side, minSizeSpec, maxSizeSpec, appSize) {
  if (preferredSizeSpec === void 0) return void 0;
  const maxSize = getPanelPixelSizeFromSpec(side, appSize, maxSizeSpec);
  const minSize = getPanelPixelSizeFromSpec(side, appSize, minSizeSpec);
  const preferredSize = getPanelPixelSizeFromSpec(
    side,
    appSize,
    preferredSizeSpec
  );
  return Math.min(Math.max(preferredSize, minSize), maxSize);
}
function addPanelWidget(state, side, id, tabs2, widgetArgs) {
  return insertPanelWidget(state, side, id, tabs2, Infinity, widgetArgs);
}
function insertPanelWidget(state, side, id, tabs2, sectionIndex, widgetArgs) {
  const panel = state.panels[side];
  const maxWidgetCount = panel.maxWidgetCount;
  if (panel.widgets.length >= maxWidgetCount)
    throw new UiError(category, "Max widget count exceeded", void 0, () => ({
      maxWidgetCount
    }));
  state = addWidgetState(state, id, tabs2, widgetArgs);
  return produce(state, (draft) => {
    const widgets = draft.panels[side].widgets;
    widgets.splice(sectionIndex, 0, id);
  });
}
function createNineZoneState(args) {
  return {
    draggedTab: void 0,
    floatingWidgets: {
      byId: {},
      allIds: []
    },
    popoutWidgets: {
      byId: {},
      allIds: []
    },
    panels: createPanelsState(),
    widgets: {},
    tabs: {},
    savedTabs: {
      allIds: [],
      byId: {}
    },
    toolSettings: void 0,
    size: {
      height: 0,
      width: 0
    },
    ...args
  };
}
const LayoutStoreContext = reactExports.createContext(
  void 0
);
LayoutStoreContext.displayName = "appui:LayoutStoreContext";
function useLayoutStore() {
  const store = reactExports.useContext(LayoutStoreContext);
  return store;
}
function useLayout(selector2, multipleSlices = false) {
  const store = useLayoutStore();
  return useStoreWithEqualityFn(
    store,
    selector2,
    multipleSlices ? shallow$1 : void 0
  );
}
const optionalLayoutStore = createStore$1(
  () => void 0
);
function useOptionalLayout(selector2, multipleSlices = false) {
  const store = reactExports.useContext(LayoutStoreContext);
  const slice = useStoreWithEqualityFn(
    store ?? optionalLayoutStore,
    selector2,
    multipleSlices ? shallow$1 : void 0
  );
  return slice;
}
function isHorizontalPanelState(state) {
  return isHorizontalPanelSide(state.side);
}
function getWidgetPanelSectionId(side, panelSectionIndex) {
  return 0 === panelSectionIndex ? `${side}Start` : `${side}End`;
}
function WidgetProvider(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetIdContext.Provider, { value: props.id, children: props.children });
}
const Widget = reactExports.forwardRef(
  function Widget2(props, forwardedRef) {
    const dispatch = reactExports.useContext(NineZoneDispatchContext);
    const side = reactExports.useContext(PanelSideContext);
    const id = reactExports.useContext(WidgetIdContext);
    const measureNz = reactExports.useContext(MeasureContext);
    const floatingWidgetId = useFloatingWidgetId();
    const { preferredFloatingWidgetSize, userSized } = useLayout((state) => {
      const widget2 = getWidgetState$1(state, id);
      const tab = state.tabs[widget2.activeTabId];
      return {
        preferredFloatingWidgetSize: tab.preferredFloatingWidgetSize,
        userSized: tab.userSized || tab.isFloatingWidgetResizable && !!tab.preferredFloatingWidgetSize
      };
    }, true);
    const elementRef = reactExports.useRef(null);
    const widgetId = floatingWidgetId === void 0 ? id : floatingWidgetId;
    const onDragStart = reactExports.useCallback(
      (updateId, initialPointerPosition, pointerPosition) => {
        assert(!!elementRef.current);
        if (floatingWidgetId !== void 0) return;
        const nzBounds = measureNz();
        let bounds = Rectangle.create(
          elementRef.current.getBoundingClientRect()
        );
        const size = restrainInitialWidgetSize(
          bounds.getSize(),
          nzBounds.getSize()
        );
        bounds = bounds.setSize(size);
        if (preferredFloatingWidgetSize) {
          bounds = bounds.setSize(preferredFloatingWidgetSize);
        }
        if (initialPointerPosition.x > bounds.right) {
          const offset = initialPointerPosition.x - bounds.right + 20;
          bounds = bounds.offsetX(offset);
        }
        const dragOffset = initialPointerPosition.getOffsetTo(pointerPosition);
        bounds = bounds.offset(dragOffset);
        bounds = bounds.offset({ x: -nzBounds.left, y: -nzBounds.top });
        const newFloatingWidgetId = getUniqueId();
        updateId(newFloatingWidgetId);
        dispatch({
          type: "PANEL_WIDGET_DRAG_START",
          newFloatingWidgetId,
          id,
          bounds,
          side,
          userSized
        });
      },
      [
        dispatch,
        floatingWidgetId,
        id,
        side,
        measureNz,
        preferredFloatingWidgetSize,
        userSized
      ]
    );
    useDragWidget({
      widgetId,
      onDragStart
    });
    reactExports.useEffect(() => {
      const listener = () => {
        floatingWidgetId && dispatch({
          type: "FLOATING_WIDGET_BRING_TO_FRONT",
          id: floatingWidgetId
        });
      };
      const element = elementRef.current;
      element?.addEventListener("click", listener);
      return () => {
        element?.removeEventListener("click", listener);
      };
    }, [dispatch, floatingWidgetId]);
    const measure = reactExports.useCallback(() => {
      if (!elementRef.current) return new Rectangle();
      const bounds = elementRef.current.getBoundingClientRect();
      return Rectangle.create(bounds);
    }, []);
    const widgetContextValue = reactExports.useMemo(
      () => ({
        measure
      }),
      [measure]
    );
    const ref = useRefs(forwardedRef, elementRef);
    const className = classnames("nz-widget-widget", props.className);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetContext.Provider, { value: widgetContextValue, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className,
        onMouseEnter: props.onMouseEnter,
        onMouseLeave: props.onMouseLeave,
        onTransitionEnd: props.onTransitionEnd,
        ref,
        style: props.style,
        "data-widget-id": props.widgetId,
        children: props.children
      }
    ) });
  }
);
const WidgetIdContext = reactExports.createContext(void 0);
WidgetIdContext.displayName = "nz:WidgetIdContext";
const WidgetContext = reactExports.createContext(null);
WidgetContext.displayName = "nz:WidgetContext";
const minWidth = 200;
const minHeight = 200;
function restrainInitialWidgetSize(size, nzSize) {
  const width = Math.max(Math.min(nzSize.width / 3, size.width), minWidth);
  const height = Math.max(Math.min(nzSize.height / 3, size.height), minHeight);
  return {
    width,
    height
  };
}
function useActiveTabId() {
  const id = reactExports.useContext(WidgetIdContext);
  return useLayout((state) => {
    const widget2 = getWidgetState$1(state, id);
    return widget2.activeTabId;
  });
}
WidgetProvider.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "WidgetProvider", "props": { "id": { "required": true, "tsType": { "name": 'WidgetState["id"]', "raw": 'WidgetState["id"]' }, "description": "" }, "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" } } };
Widget.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "Widget", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" }, "onMouseEnter": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(event: React.MouseEvent<HTMLElement, MouseEvent>) => void", "signature": { "arguments": [{ "type": { "name": "ReactMouseEvent", "raw": "React.MouseEvent<HTMLElement, MouseEvent>", "elements": [{ "name": "HTMLElement" }, { "name": "MouseEvent" }] }, "name": "event" }], "return": { "name": "void" } } }, "description": "" }, "onMouseLeave": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(event: React.MouseEvent<HTMLElement, MouseEvent>) => void", "signature": { "arguments": [{ "type": { "name": "ReactMouseEvent", "raw": "React.MouseEvent<HTMLElement, MouseEvent>", "elements": [{ "name": "HTMLElement" }, { "name": "MouseEvent" }] }, "name": "event" }], "return": { "name": "void" } } }, "description": "" }, "widgetId": { "required": false, "tsType": { "name": "string" }, "description": "" } }, "composes": ["CommonProps"] };
function useIsToolSettingsTab() {
  const activeTabId = useActiveTabId();
  const toolSettingsTabId = useLayout((state) => state.toolSettings?.tabId);
  return activeTabId === toolSettingsTabId;
}
const TabBarButton = reactExports.forwardRef(function TabBarButton2(props, ref) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { ref, styleType: "borderless", size: "small", ...props });
});
TabBarButton.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "TabBarButton" };
function MoreButton(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DropdownMenu,
    {
      placement: "bottom-end",
      menuItems: (onClose) => [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(WidgetActionDropdownContext.Provider, { value: { onClose }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CloseOnPanelCollapse, {}),
          props.children
        ] }, 0)
      ],
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "100%", display: "flex", marginInline: "0.25em" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabBarButton, { label: "More actions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgMoreVertical, {}) }) })
    }
  );
}
const WidgetActionDropdownContext = reactExports.createContext(void 0);
function CloseOnPanelCollapse() {
  const context = reactExports.useContext(WidgetActionDropdownContext);
  const side = reactExports.useContext(PanelSideContext);
  const { onClose } = context;
  const collapsed = useLayout((state) => {
    if (!side) return false;
    return state.panels[side].collapsed;
  });
  reactExports.useEffect(() => {
    if (collapsed) onClose();
  }, [collapsed, onClose]);
  return null;
}
const order = [
  "pin",
  "maximize",
  "popout",
  "horizontalAlign",
  "dock",
  "sendBack"
];
function useDropdownActions(actions) {
  const { widgetActionDropdown } = usePreviewFeatures();
  const threshold = widgetActionDropdown?.threshold ?? Infinity;
  const isDropdown = actions.length > threshold;
  if (!isDropdown) return [actions, false];
  const sorted = [...actions].sort(
    (a, b) => order.indexOf(a) - order.indexOf(b)
  );
  return [sorted, true];
}
MoreButton.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "MoreButton" };
function WidgetAction(props) {
  const { label: label2, icon, onClick, ...rest } = props;
  const dropdownContext = reactExports.useContext(WidgetActionDropdownContext);
  if (dropdownContext !== void 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuItem$1,
      {
        startIcon: icon,
        onClick: () => {
          onClick?.();
          dropdownContext.onClose();
        },
        ...rest,
        children: label2
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TabBarButton, { onClick, label: label2, ...rest, children: icon });
}
WidgetAction.__docgenInfo = { "description": "A widget action rendered in a widget title bar.\nShould be used in {@link WidgetActions} component.\n@alpha", "methods": [], "displayName": "WidgetAction", "props": { "label": { "required": true, "tsType": { "name": "string" }, "description": "" }, "icon": { "required": true, "tsType": { "name": "React.JSX.Element" }, "description": "" }, "onClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" } } };
const MaximizedWidgetContext = reactExports.createContext(
  {
    maximizedWidget: void 0,
    setMaximizedWidget: () => {
    }
  }
);
function useIsMaximizedWidget() {
  const widgetId = reactExports.useContext(WidgetIdContext);
  const maximizedWidgetId = useMaximizedWidgetId();
  if (maximizedWidgetId === void 0) return false;
  return widgetId === maximizedWidgetId;
}
function useMaximizedWidgetId() {
  const { maximizedWidget } = reactExports.useContext(MaximizedWidgetContext);
  const preview = usePreviewFeatures();
  const enabled = preview.enableMaximizedFloatingWidget || preview.enableMaximizedPanelWidget;
  if (!enabled) return void 0;
  return maximizedWidget;
}
function useMaximizedFloatingWidget() {
  const isMaximizedWidget = useIsMaximizedWidget();
  if (!isMaximizedWidget)
    return {
      style: {},
      classNames: {}
    };
  return {
    style: {
      transform: "unset",
      height: "unset",
      width: "unset",
      "max-height": "unset",
      "max-width": "unset"
    },
    classNames: { "uifw-preview-enableMaximizedWidget_floatingWidget": true }
  };
}
function useMaximizedWidgetTabBarHandle() {
  const isMaximizedWidget = useIsMaximizedWidget();
  return {
    "uifw-preview-enableMaximizedWidget_widget-tabBar": isMaximizedWidget
  };
}
const useActiveSendBackWidgetIdStore = create(() => void 0);
function getSendBackHomeState(state, widgetId) {
  const floatingWidget = state.floatingWidgets.byId[widgetId];
  const home = floatingWidget.home;
  const panel = state.panels[home.side];
  const destinationWidgetId = home.widgetId ? home.widgetId : getWidgetPanelSectionId(panel.side, home.widgetIndex);
  let destinationWidget = state.widgets[destinationWidgetId];
  if (!destinationWidget && panel.widgets.length === panel.maxWidgetCount) {
    const id = panel.widgets[home.widgetIndex];
    destinationWidget = state.widgets[id];
  }
  if (destinationWidget) {
    return {
      side: home.side,
      widgetId: destinationWidget.id
    };
  }
  if (panel.widgets.length === 0) {
    return {
      side: home.side
    };
  }
  return {
    side: home.side,
    sectionIndex: destinationWidgetId.endsWith("End") ? 1 : 0
  };
}
function useSendBackHomeState() {
  const widgetId = useActiveSendBackWidgetIdStore((state) => state);
  return useLayout(
    (state) => widgetId ? getSendBackHomeState(state, widgetId) : void 0
  );
}
function Icon() {
  const id = useFloatingWidgetId();
  const home = useLayout((state) => state.floatingWidgets.byId[id].home);
  return home.side === "left" ? /* @__PURE__ */ jsxRuntimeExports.jsx(SvgDockLeft, {}) : home.side === "right" ? /* @__PURE__ */ jsxRuntimeExports.jsx(SvgDockRight, {}) : home.side === "top" ? /* @__PURE__ */ jsxRuntimeExports.jsx(SvgDockTop, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(SvgDockBottom, {});
}
function SendBack() {
  const id = useFloatingWidgetId();
  const dispatch = reactExports.useContext(NineZoneDispatchContext);
  const { translate } = useTranslation();
  const label2 = translate("widget.tooltips.sendHome");
  const setActiveWidgetId = (newId) => useActiveSendBackWidgetIdStore.setState(newId);
  const onClick = () => {
    setActiveWidgetId(void 0);
    dispatch({
      type: "FLOATING_WIDGET_SEND_BACK",
      id
    });
  };
  const onMouseOver = () => {
    setActiveWidgetId(id);
  };
  const onFocus = () => {
    setActiveWidgetId(id);
  };
  const onMouseOut = () => {
    setActiveWidgetId(void 0);
  };
  const onBlur = () => {
    setActiveWidgetId(void 0);
  };
  const eventHandlers = { onMouseOver, onFocus, onMouseOut, onBlur };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    WidgetAction,
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {}),
      label: label2,
      onClick,
      ...eventHandlers
    }
  );
}
function useSendBack() {
  const maximizedWidget = useIsMaximizedWidget();
  const isToolSettings = useIsToolSettingsTab();
  const isFloatingWidget = !!useFloatingWidgetId();
  const canBeDocked = useWidgetAllowedToDock();
  return !maximizedWidget && isFloatingWidget && !isToolSettings && canBeDocked;
}
SendBack.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "SendBack" };
function getCursorClassName(type) {
  return `nz-widgetPanels-cursorOverlay_cursor nz-${type}`;
}
function isAllowedSideTarget(state, draggedWidget, side) {
  const draggedTab = state.draggedTab;
  const tabsState = state.tabs;
  const widgetsState = state.widgets;
  let allowedPanelTargets;
  if (draggedTab) {
    const tab = tabsState[draggedTab.tabId];
    allowedPanelTargets = tab.allowedPanelTargets;
  } else if (draggedWidget && draggedWidget in widgetsState) {
    const widget2 = widgetsState[draggedWidget];
    const activeTabId = widget2.activeTabId;
    const activeTab = tabsState[activeTabId];
    allowedPanelTargets = activeTab.allowedPanelTargets;
    widget2.tabs.forEach((tabId) => {
      const tab = tabsState[tabId];
      if (!allowedPanelTargets) {
        allowedPanelTargets = tab.allowedPanelTargets;
      } else if (tab.allowedPanelTargets !== void 0) {
        const tabPanelTargets = tab.allowedPanelTargets;
        allowedPanelTargets = allowedPanelTargets.filter(
          (x) => tabPanelTargets.includes(x)
        );
      }
    });
  }
  if (allowedPanelTargets) {
    return allowedPanelTargets.includes(side);
  }
  return true;
}
function TargetContainer(props) {
  const className = classnames(
    "nz-target-targetContainer",
    `nz-${props.direction}`,
    props.className
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, style: props.style, children: props.children });
}
TargetContainer.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "TargetContainer", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" }, "direction": { "required": true, "tsType": { "name": "union", "raw": '"horizontal" | "vertical"', "elements": [{ "name": "literal", "value": '"horizontal"' }, { "name": "literal", "value": '"vertical"' }] }, "description": "" } }, "composes": ["CommonProps"] };
function useAllowedWidgetTarget(widgetId) {
  const draggedWidget = reactExports.useContext(DraggedWidgetIdContext);
  return useLayout((state) => {
    const widgetLocation = getWidgetLocation(state, widgetId);
    if (!widgetLocation || isPopoutWidgetLocation(widgetLocation)) {
      return false;
    } else if (isFloatingWidgetLocation(widgetLocation)) {
      return true;
    }
    return isAllowedSideTarget(state, draggedWidget, widgetLocation.side);
  });
}
function MergeTarget(props) {
  const { widgetId } = props;
  const cursorType = reactExports.useContext(CursorTypeContext);
  const draggedWidgetId = reactExports.useContext(DraggedWidgetIdContext);
  const draggedTab = useLayout((state) => !!state.draggedTab);
  const [ref, targeted] = useTarget(useTargetArgs$2(widgetId));
  const allowedTarget = useAllowedWidgetTarget(widgetId);
  const hidden = !allowedTarget || !draggedTab && !draggedWidgetId || draggedWidgetId === widgetId;
  const className = classnames(
    "nz-target-mergeTarget",
    targeted && "nz-targeted",
    hidden && "nz-hidden",
    cursorType && getCursorClassName(cursorType)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, ref });
}
function useTargetArgs$2(widgetId) {
  return reactExports.useMemo(() => {
    return {
      type: "widget",
      widgetId
    };
  }, [widgetId]);
}
MergeTarget.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "MergeTarget", "props": { "widgetId": { "required": true, "tsType": { "name": 'WidgetState["id"]', "raw": 'WidgetState["id"]' }, "description": "" } } };
const usePointerCaptor = (onPointerDown, onPointerMove, onPointerUp) => {
  const dragManager = reactExports.useContext(DragManagerContext);
  const isDown = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const mouseMove = (e) => {
      isDown.current && onPointerMove && onPointerMove(e, e);
    };
    document.addEventListener("mousemove", mouseMove);
    return () => {
      document.removeEventListener("mousemove", mouseMove);
    };
  }, [onPointerMove]);
  reactExports.useEffect(() => {
    const mouseUp = (e) => {
      isDown.current && onPointerUp && onPointerUp(e);
      isDown.current = false;
    };
    document.addEventListener("mouseup", mouseUp);
    return () => {
      document.removeEventListener("mouseup", mouseUp);
    };
  }, [onPointerUp]);
  const setRef = useRefEffect(
    (instance) => {
      let touchTarget = null;
      const mouseDown = (e) => {
        const isSecondaryButton = (e.button & 2) === 2;
        if (isSecondaryButton) return;
        onPointerDown && onPointerDown(e, e);
        isDown.current = true;
      };
      const touchMove = (e) => {
        if (e.touches.length !== 1) return;
        isDown.current && onPointerMove && onPointerMove(e.touches[0], e);
        isDown.current && dragManager.handleDrag(e.touches[0].clientX, e.touches[0].clientY);
      };
      const targetTouchMove = (e) => {
        e.cancelable && e.preventDefault();
        touchMove(e);
      };
      const documentTouchMove = (e) => {
        if (touchTarget === e.target) return;
        touchMove(e);
      };
      const touchEnd = (e) => {
        isDown.current && onPointerUp && onPointerUp(e);
        isDown.current && dragManager.handleDragEnd();
        isDown.current = false;
        touchTarget = null;
        if (e.target instanceof HTMLElement) {
          e.target.removeEventListener("touchmove", targetTouchMove);
          e.target.removeEventListener("touchend", touchEnd);
        }
        document.removeEventListener("touchmove", documentTouchMove);
        document.removeEventListener("touchend", documentTouchEnd);
      };
      const documentTouchEnd = (e) => {
        if (touchTarget === e.target) return;
        touchEnd(e);
      };
      const touchStart = (e) => {
        e.cancelable && e.preventDefault();
        if (e.touches.length !== 1) return;
        touchTarget = e.target;
        if (e.target instanceof HTMLElement) {
          e.target.addEventListener("touchmove", targetTouchMove);
          e.target.addEventListener("touchend", touchEnd);
        }
        document.addEventListener("touchmove", documentTouchMove);
        document.addEventListener("touchend", documentTouchEnd);
        onPointerDown && onPointerDown(e.touches[0], e);
        isDown.current = true;
      };
      instance && instance.addEventListener("mousedown", mouseDown);
      instance && instance.addEventListener("touchstart", touchStart);
      return () => {
        instance && instance.removeEventListener("mousedown", mouseDown);
        instance && instance.removeEventListener("touchstart", touchStart);
      };
    },
    [onPointerDown, onPointerMove, onPointerUp, dragManager]
  );
  return setRef;
};
function useDoubleClick(onDoubleClick) {
  const timer = reactExports.useRef(new Timer(300));
  const clickCount = reactExports.useRef(0);
  timer.current.setOnExecute(() => {
    clickCount.current = 0;
  });
  const handleClick = reactExports.useCallback(() => {
    timer.current.start();
    clickCount.current++;
    if (clickCount.current === 2) {
      onDoubleClick && onDoubleClick();
      clickCount.current = 0;
      timer.current.stop();
    }
  }, [onDoubleClick]);
  return handleClick;
}
const DockedToolSettingsOverflow = reactExports.forwardRef(function DockedToolSettingsOverflow2(props, ref) {
  const roRef = useResizeObserver(props.onResize);
  const refs = useRefs(roRef, ref);
  const className = classnames("nz-toolSettings-overflow", props.className);
  const moreToolSettingsTitle = useLabel("moreToolSettingsTitle");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    IconButton,
    {
      className,
      onClick: props.onClick,
      ref: refs,
      style: props.style,
      styleType: "borderless",
      label: moreToolSettingsTitle,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgMore, {})
    }
  );
});
DockedToolSettingsOverflow.__docgenInfo = { "description": "Entry point to overflown tool settings of [[DockedToolSettings]] component.\n@internal", "methods": [], "displayName": "DockedToolSettingsOverflow", "props": { "onClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Function called when button is clicked." }, "onResize": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(w: number) => void", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "w" }], "return": { "name": "void" } } }, "description": "Function called when button is resized." } }, "composes": ["CommonProps"] };
function getChildKey(child, index) {
  if (reactExports.isValidElement(child) && child.key !== null) {
    return child.key.toString();
  }
  return index.toString();
}
function getOverflown(width, docked, overflowWidth, activeIndex, gapSize = 0) {
  let settingsWidth = 0;
  let firstItem = true;
  const getGapSize = () => {
    if (firstItem) {
      firstItem = false;
      return 0;
    }
    return gapSize;
  };
  if (activeIndex !== void 0 && docked.length > activeIndex) {
    const activeWidth = docked[activeIndex];
    settingsWidth += activeWidth[1] + getGapSize();
  }
  let i = 0;
  for (; i < docked.length; i++) {
    if (i === activeIndex) continue;
    const itemWidth = docked[i][1];
    const newSettingsWidth = settingsWidth + itemWidth + getGapSize();
    if (newSettingsWidth > width) {
      settingsWidth += overflowWidth + getGapSize();
      break;
    }
    settingsWidth = newSettingsWidth;
  }
  let j = i;
  if (j < docked.length) {
    for (; j > 0; j--) {
      if (j === activeIndex) continue;
      if (settingsWidth <= width) break;
      const itemWidth = docked[j][1];
      settingsWidth -= itemWidth + gapSize;
    }
  }
  const overflown = new Array();
  for (i = j; i < docked.length; i++) {
    if (i === activeIndex) continue;
    overflown.push(docked[i][0]);
  }
  return overflown;
}
function useOverflow$1(itemKeys, activeItemIndex) {
  const [overflown, setOverflown] = reactExports.useState();
  const entryWidths = reactExports.useRef(/* @__PURE__ */ new Map());
  const width = reactExports.useRef(void 0);
  const overflowWidth = reactExports.useRef(void 0);
  const gapSize = reactExports.useRef(0);
  const calculateOverflow = reactExports.useCallback(() => {
    const widths = verifiedMapEntries(entryWidths.current);
    if (width.current === void 0 || widths === void 0 || overflowWidth.current === void 0) {
      setOverflown(void 0);
      return;
    }
    const newOverflown = getOverflown(
      width.current,
      [...widths.entries()],
      overflowWidth.current,
      activeItemIndex,
      gapSize.current
    );
    setOverflown((prevOverflown) => {
      return eqlOverflown(prevOverflown, newOverflown) ? prevOverflown : newOverflown;
    });
  }, [activeItemIndex]);
  reactExports.useLayoutEffect(() => {
    const newEntryWidths = /* @__PURE__ */ new Map();
    for (const itemKey of itemKeys) {
      const lastW = entryWidths.current.get(itemKey);
      newEntryWidths.set(itemKey, lastW);
    }
    entryWidths.current = newEntryWidths;
    calculateOverflow();
  }, [itemKeys, calculateOverflow]);
  const handleContainerResize = reactExports.useCallback(
    (w) => {
      const calculate = width.current !== w;
      width.current = w;
      calculate && calculateOverflow();
    },
    [calculateOverflow]
  );
  const handleOverflowResize = reactExports.useCallback(
    (w) => {
      const calculate = overflowWidth.current !== w;
      overflowWidth.current = w;
      calculate && calculateOverflow();
    },
    [calculateOverflow]
  );
  const handleEntryResize = reactExports.useCallback(
    (key) => (w) => {
      const oldW = entryWidths.current.get(key);
      if (oldW === w) return;
      entryWidths.current.set(key, w);
      calculateOverflow();
    },
    [calculateOverflow]
  );
  const handleGapResize = reactExports.useCallback(
    (w) => {
      if (gapSize.current === w) return;
      gapSize.current = w;
      calculateOverflow();
    },
    [calculateOverflow]
  );
  return [
    overflown,
    handleContainerResize,
    handleOverflowResize,
    handleEntryResize,
    handleGapResize
  ];
}
const DockedToolSettingsEntryContext = reactExports.createContext(null);
DockedToolSettingsEntryContext.displayName = "nz:DockedToolSettingsEntryContext";
function verifiedMapEntries(map) {
  for (const [, val] of map) {
    if (val === void 0) return void 0;
  }
  return map;
}
function eqlOverflown(prev, value) {
  if (!prev) return false;
  if (prev.length !== value.length) return false;
  for (let i = 0; i < prev.length; i++) {
    const p = prev[i];
    const v = value[i];
    if (p !== v) return false;
  }
  return true;
}
function WidgetMenu(props) {
  const className = classnames("nz-widget-menu", props.className);
  return (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Popup,
      {
        className,
        isOpen: props.open,
        offset: 0,
        onClose: props.onClose,
        position: RelativePosition.BottomLeft,
        style: props.style,
        showShadow: false,
        target: props.target,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nz-widget-menu_tabs", children: props.children })
      }
    )
  );
}
WidgetMenu.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "WidgetMenu", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" }, "open": { "required": false, "tsType": { "name": "boolean" }, "description": "" }, "onClose": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" }, "target": { "required": false, "tsType": { "name": "HTMLElement" }, "description": "" } }, "composes": ["CommonProps"] };
function WidgetOverflow(props) {
  const [open, setOpen] = reactExports.useState(false);
  const ref = reactExports.useRef(null);
  const [targetRef, target] = useRefState();
  const resizeObserverRef = useResizeObserver(props.onResize);
  const refs = useRefs(ref, resizeObserverRef);
  const handleClick = reactExports.useCallback((e) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  }, []);
  const handleClose = reactExports.useCallback(() => {
    setOpen(false);
  }, []);
  usePanelPopup(handleClose);
  const className = classnames(
    "nz-widget-overflow",
    props.hidden && "nz-hidden"
  );
  const overflowContext = reactExports.useMemo(() => {
    return {
      close: handleClose
    };
  }, [handleClose]);
  const moreWidgetsTitle = useLabel("moreWidgetsTitle");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, ref: refs, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "nz-button",
        onClick: handleClick,
        ref: targetRef,
        role: "button",
        tabIndex: -1,
        title: moreWidgetsTitle,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nz-icon" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetOverflowContext.Provider, { value: overflowContext, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      WidgetMenu,
      {
        children: props.children,
        open,
        onClose: handleClose,
        target
      }
    ) })
  ] });
}
const WidgetOverflowContext = reactExports.createContext(void 0);
WidgetOverflowContext.displayName = "nz:WidgetOverflowContext";
function usePanelPopup(onClose) {
  const side = reactExports.useContext(PanelSideContext);
  const collapsed = useLayout(
    (state) => side ? state.panels[side].collapsed : false
  );
  reactExports.useEffect(() => {
    if (collapsed) {
      onClose();
    }
  }, [collapsed, onClose]);
}
WidgetOverflow.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "WidgetOverflow", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" }, "hidden": { "required": false, "tsType": { "name": "boolean" }, "description": "" }, "onResize": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(w: number) => void", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "w" }], "return": { "name": "void" } } }, "description": "" } } };
function TabTarget() {
  const cursorType = reactExports.useContext(CursorTypeContext);
  const draggedTab = useLayout((state) => !!state.draggedTab);
  const draggedWidgetId = reactExports.useContext(DraggedWidgetIdContext);
  const widgetId = reactExports.useContext(WidgetIdContext);
  const tabIndex = useTabIndex();
  const [ref, targeted] = useTarget(
    useTargetArgs$1(widgetId, tabIndex)
  );
  const allowedTarget = useAllowedWidgetTarget(widgetId);
  const hidden = !allowedTarget || !draggedTab && !draggedWidgetId || draggedWidgetId === widgetId;
  const className = classnames(
    "nz-target-tabTarget",
    hidden && "nz-hidden",
    targeted && "nz-targeted",
    cursorType && getCursorClassName(cursorType)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, ref });
}
function useTabIndex() {
  const widgetId = reactExports.useContext(WidgetIdContext);
  const tabId = reactExports.useContext(TabIdContext);
  return useLayout((state) => {
    const widget2 = getWidgetState$1(state, widgetId);
    return widget2.tabs.findIndex((id) => id === tabId);
  });
}
function useTargetArgs$1(widgetId, tabIndex) {
  return reactExports.useMemo(() => {
    return {
      type: "tab",
      widgetId,
      tabIndex
    };
  }, [widgetId, tabIndex]);
}
TabTarget.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "TabTarget" };
function WidgetMenuTab(props) {
  const id = reactExports.useContext(TabIdContext);
  const overflowContext = reactExports.useContext(WidgetOverflowContext);
  const showWidgetIcon = reactExports.useContext(ShowWidgetIconContext);
  const label2 = useLayout((state) => {
    const tab = state.tabs[id];
    return tab.label;
  });
  const closeOverflow = reactExports.useCallback(() => {
    overflowContext.close();
  }, [overflowContext]);
  const ref = useTabInteractions({
    onDragStart: closeOverflow,
    onClick: closeOverflow,
    onDoubleClick: closeOverflow
  });
  const activeTabId = useActiveTabId();
  const active = activeTabId === id;
  const className = classnames(
    "nz-widget-menuTab",
    !showWidgetIcon && "nz-no-icon",
    props.className
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, ref, title: label2, children: [
    props.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nz-badge", children: props.badge }),
    showWidgetIcon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nz-icon", children: props.icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label2 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: classnames("nz-checkmark", !active && "nz-hidden") })
  ] });
}
WidgetMenuTab.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "WidgetMenuTab", "props": { "badge": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" }, "icon": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" } }, "composes": ["CommonProps"] };
function FloatingTab({ icon }) {
  const { id, position } = useLayout((state) => {
    const draggedTab = state.draggedTab;
    return {
      id: draggedTab?.tabId,
      position: draggedTab?.position
    };
  }, true);
  const label2 = useLayout((state) => {
    const tabId = state.draggedTab?.tabId;
    const tab = tabId ? state.tabs[tabId] : void 0;
    return tab?.label;
  });
  const dispatch = reactExports.useContext(NineZoneDispatchContext);
  const onDrag = reactExports.useCallback(
    (dragBy) => {
      id && dispatch({
        type: "WIDGET_TAB_DRAG",
        dragBy
      });
    },
    [dispatch, id]
  );
  const onDragEnd = reactExports.useCallback(
    (target) => {
      id && dispatch({
        type: "WIDGET_TAB_DRAG_END",
        id,
        target
      });
    },
    [dispatch, id]
  );
  useDragTab({
    tabId: id || "",
    onDrag,
    onDragEnd
  });
  const showWidgetIcon = reactExports.useContext(ShowWidgetIconContext);
  const style = position && {
    transform: `translate(${position.x}px, ${position.y}px)`
  };
  const className = classnames(
    "nz-widget-floatingTab",
    !position && "nz-hidden"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, style, children: [
    showWidgetIcon && icon,
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label2 })
  ] });
}
FloatingTab.__docgenInfo = { "description": "Component that displays a floating tab.\n@internal", "methods": [], "displayName": "FloatingTab", "props": { "icon": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" } } };
function WidgetTabProvider({
  id,
  first,
  firstInactive,
  last,
  showOnlyTabIcon
}) {
  const tabNode = reactExports.useContext(TabNodeContext);
  const position = reactExports.useMemo(
    () => ({
      first,
      firstInactive,
      last
    }),
    [first, firstInactive, last]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TabIdContext.Provider, { value: id, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabPositionContext.Provider, { value: position, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconOnlyOnWidgetTabContext.Provider, { value: !!showOnlyTabIcon, children: tabNode }) }) });
}
function WidgetTab(props) {
  const widgetOverflow = reactExports.useContext(WidgetOverflowContext);
  const tabId = reactExports.useContext(TabIdContext);
  const overflown = !!widgetOverflow;
  const floatingTabId = useLayout((state) => state.draggedTab?.tabId);
  if (tabId === floatingTabId) return /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingTab, { ...props });
  if (overflown) return /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetMenuTab, { ...props });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetTabComponent, { ...props });
}
function WidgetTabComponent(props) {
  const id = reactExports.useContext(TabIdContext);
  const { first, firstInactive, last } = reactExports.useContext(TabPositionContext);
  const widgetTabsEntryContext = reactExports.useContext(WidgetTabsEntryContext);
  const side = reactExports.useContext(PanelSideContext);
  const widgetId = reactExports.useContext(WidgetIdContext);
  const showIconOnly = reactExports.useContext(IconOnlyOnWidgetTabContext);
  const showWidgetIcon = reactExports.useContext(ShowWidgetIconContext);
  const showActiveWidgetLabel = reactExports.useContext(ShowActiveWidgetLabelContext);
  const label2 = useLayout((state) => state.tabs[id].label);
  const activeTabId = useLayout(
    (state) => getWidgetState$1(state, widgetId).activeTabId
  );
  const minimized = useLayout(
    (state) => getWidgetState$1(state, widgetId).minimized
  );
  const maximizedWidget = useIsMaximizedWidget();
  const resizeObserverRef = useResizeObserver(
    widgetTabsEntryContext?.onResize
  );
  const pointerCaptorRef = useTabInteractions({ clickOnly: maximizedWidget });
  const refs = useRefs(resizeObserverRef, pointerCaptorRef);
  const active = activeTabId === id;
  const className = classnames(
    "nz-widget-tab",
    active && "nz-active",
    void 0 === side && minimized && "nz-minimized",
    first && "nz-first",
    last && "nz-last",
    firstInactive && "nz-first-inactive",
    props.className
  );
  const showLabel = showActiveWidgetLabel && active || showIconOnly && !props.icon || showWidgetIcon && !showIconOnly || !showWidgetIcon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-item-id": id,
      "data-item-type": "widget-tab",
      className,
      ref: refs,
      role: "tab",
      style: props.style,
      title: label2,
      tabIndex: 0,
      children: [
        (showWidgetIcon || showIconOnly) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nz-icon", children: props.icon }),
        showLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nz-label", children: label2 }),
        props.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nz-badge", children: props.badge }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabTarget, {})
      ]
    }
  );
}
function useTabInteractions({
  onClick,
  onDoubleClick,
  onDragStart,
  clickOnly
}) {
  const id = reactExports.useContext(TabIdContext);
  const widgetContext = reactExports.useContext(WidgetContext);
  const measure = reactExports.useContext(MeasureContext);
  const dispatch = reactExports.useContext(NineZoneDispatchContext);
  const side = reactExports.useContext(PanelSideContext);
  const widgetId = reactExports.useContext(WidgetIdContext);
  const widgetTabsEntryContext = reactExports.useContext(WidgetTabsEntryContext);
  const floatingWidgetId = useFloatingWidgetId();
  const layoutStore = useLayoutStore();
  const tabRef = reactExports.useRef(layoutStore.getState().tabs[id]);
  const clickCount = reactExports.useRef(0);
  const doubleClickTimer = reactExports.useRef(new Timer(300));
  const initialPointerPosition = reactExports.useRef(void 0);
  const overflown = !widgetTabsEntryContext;
  reactExports.useEffect(
    () => layoutStore.subscribe((state) => {
      tabRef.current = state.tabs[id];
    }),
    [layoutStore, id]
  );
  const handleClick = reactExports.useCallback(() => {
    dispatch({
      type: "WIDGET_TAB_CLICK",
      side,
      widgetId,
      id
    });
    onClick?.();
  }, [dispatch, widgetId, id, side, onClick]);
  const handleDoubleClick = reactExports.useCallback(() => {
    if (clickOnly) return;
    dispatch({
      type: "WIDGET_TAB_DOUBLE_CLICK",
      side,
      widgetId,
      floatingWidgetId,
      id
    });
    onDoubleClick?.();
  }, [
    clickOnly,
    dispatch,
    floatingWidgetId,
    widgetId,
    id,
    side,
    onDoubleClick
  ]);
  const handleDragTabStart = useDragTab({
    tabId: id
  });
  const handleDragStart = reactExports.useCallback(
    (pointerPosition) => {
      if (clickOnly) return;
      assert(!!ref.current);
      assert(!!initialPointerPosition.current);
      const nzBounds = measure();
      const nzOffset = new Point(-nzBounds.left, -nzBounds.top);
      let bounds = Rectangle.create(ref.current.getBoundingClientRect());
      bounds = bounds.offset(nzOffset);
      const tab = tabRef.current;
      const userSized = tab.userSized || tab.isFloatingWidgetResizable && !!tab.preferredFloatingWidgetSize;
      let position = bounds.topLeft();
      const widgetBounds = widgetContext.measure();
      const widgetSize = restrainInitialWidgetSize(
        widgetBounds.getSize(),
        nzBounds.getSize()
      );
      if (overflown) {
        position = initialPointerPosition.current.offset(nzOffset);
        position = position.offset({ x: -7, y: -7 });
      }
      const dragOffset = initialPointerPosition.current.getOffsetTo(pointerPosition);
      position = position.offset(dragOffset);
      handleDragTabStart({
        initialPointerPosition: Point.create(initialPointerPosition.current),
        pointerPosition,
        widgetSize
      });
      dispatch({
        type: "WIDGET_TAB_DRAG_START",
        floatingWidgetId,
        side,
        widgetId,
        id,
        position,
        userSized
      });
      onDragStart?.();
      initialPointerPosition.current = void 0;
    },
    [
      clickOnly,
      measure,
      widgetContext,
      handleDragTabStart,
      dispatch,
      floatingWidgetId,
      side,
      widgetId,
      id,
      onDragStart,
      overflown
    ]
  );
  const handlePointerDown = reactExports.useCallback(
    (args, e) => {
      e.type === "touchstart" && floatingWidgetId && dispatch({
        type: "FLOATING_WIDGET_BRING_TO_FRONT",
        id: floatingWidgetId
      });
      initialPointerPosition.current = new Point(args.clientX, args.clientY);
    },
    [dispatch, floatingWidgetId]
  );
  const handlePointerMove = reactExports.useCallback(
    (args) => {
      if (!initialPointerPosition.current) return;
      const pointerPosition = new Point(args.clientX, args.clientY);
      const distance = initialPointerPosition.current.getDistanceTo(pointerPosition);
      if (distance < 10) return;
      handleDragStart(pointerPosition);
    },
    [handleDragStart]
  );
  const handlePointerUp = reactExports.useCallback(() => {
    clickCount.current++;
    initialPointerPosition.current = void 0;
    doubleClickTimer.current.start();
  }, []);
  const pointerCaptorRef = usePointerCaptor(
    handlePointerDown,
    handlePointerMove,
    handlePointerUp
  );
  const ref = reactExports.useRef(void 0);
  const refs = useRefs(pointerCaptorRef, ref);
  reactExports.useEffect(() => {
    const timer = doubleClickTimer.current;
    timer.setOnExecute(() => {
      if (clickCount.current === 1) handleClick();
      else handleDoubleClick();
      clickCount.current = 0;
    });
    const keydown = (e) => {
      if (e.key === " " || e.key === Key_enumExports.Key.Enter.valueOf()) {
        handleClick();
      }
    };
    const instance = ref.current;
    instance && instance.addEventListener("keydown", keydown);
    return () => {
      timer.setOnExecute(void 0);
      instance && instance.removeEventListener("keydown", keydown);
    };
  }, [handleClick, handleDoubleClick]);
  return refs;
}
const TabPositionContext = reactExports.createContext(
  void 0
);
TabPositionContext.displayName = "nz:TabPositionContext";
const IconOnlyOnWidgetTabContext = reactExports.createContext(false);
IconOnlyOnWidgetTabContext.displayName = "nz:IconOnlyOnWidgetTabContext";
const ShowActiveWidgetLabelContext = reactExports.createContext(false);
ShowActiveWidgetLabelContext.displayName = "nz:ShowActiveWidgetLabelContext";
WidgetTabProvider.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "WidgetTabProvider", "props": { "first": { "required": false, "tsType": { "name": "boolean" }, "description": "" }, "last": { "required": false, "tsType": { "name": "boolean" }, "description": "" }, "firstInactive": { "required": false, "tsType": { "name": "boolean" }, "description": "" }, "id": { "required": true, "tsType": { "name": 'TabState["id"]', "raw": 'TabState["id"]' }, "description": "" }, "showOnlyTabIcon": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
WidgetTab.__docgenInfo = { "description": "Component that displays a tab in a side panel widget.\n@internal", "methods": [], "displayName": "WidgetTab", "props": { "badge": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" }, "icon": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" } }, "composes": ["CommonProps"] };
function TabOutline() {
  const hidden = useHidden$1();
  const className = classnames("nz-outline-tabOutline", hidden && "nz-hidden");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className });
}
function useHidden$1() {
  const widgetId = reactExports.useContext(WidgetIdContext);
  const targeted = useTargeted();
  const activeHomeState = useSendBackHomeState();
  return reactExports.useMemo(() => {
    if (activeHomeState?.widgetId === widgetId) return false;
    if (!targeted) return true;
    if (!isWidgetDropTargetState(targeted)) return true;
    if (targeted.widgetId !== widgetId) return true;
    return false;
  }, [targeted, widgetId, activeHomeState]);
}
TabOutline.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "TabOutline" };
function TitleBarTarget() {
  const cursorType = reactExports.useContext(CursorTypeContext);
  const draggedWidgetId = reactExports.useContext(DraggedWidgetIdContext);
  const widgetId = reactExports.useContext(WidgetIdContext);
  const activeHomeState = useSendBackHomeState();
  const draggedTab = useLayout((state) => !!state.draggedTab);
  const [ref] = useTarget(useTargetArgs(widgetId));
  const allowedTarget = useAllowedWidgetTarget(widgetId);
  const hidden = !allowedTarget || (!draggedTab && !draggedWidgetId || draggedWidgetId === widgetId) && !(activeHomeState?.widgetId === widgetId);
  const className = classnames(
    "nz-target-titleBarTarget",
    hidden && "nz-hidden",
    cursorType && getCursorClassName(cursorType)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, ref, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabOutline, {}) });
}
function useTargetArgs(widgetId) {
  return reactExports.useMemo(() => {
    return {
      type: "widget",
      widgetId
    };
  }, [widgetId]);
}
TitleBarTarget.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "TitleBarTarget" };
function WidgetTabs() {
  const side = reactExports.useContext(PanelSideContext);
  const widgetId = reactExports.useContext(WidgetIdContext);
  const showWidgetIcon = reactExports.useContext(ShowWidgetIconContext);
  const tabIds = useLayout((state) => getWidgetState$1(state, widgetId).tabs);
  const activeTabId = useLayout(
    (state) => getWidgetState$1(state, widgetId).activeTabId
  );
  const minimized = useLayout(
    (state) => getWidgetState$1(state, widgetId).minimized
  );
  const [showOnlyTabIcon, setShowOnlyTabIcon] = reactExports.useState(false);
  const activeTabIndex = tabIds.findIndex((id) => id === activeTabId);
  const children = reactExports.useMemo(() => {
    return tabIds.map((id, index, array) => {
      const firstInactive = activeTabIndex + 1 === index;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        WidgetTabProvider,
        {
          id,
          first: index === 0,
          firstInactive,
          last: index === array.length - 1,
          showOnlyTabIcon: showOnlyTabIcon && showWidgetIcon
        },
        id
      );
    });
  }, [tabIds, activeTabIndex, showOnlyTabIcon, showWidgetIcon]);
  const childrenKeys = reactExports.Children.toArray(children).map(
    (child, index) => getChildKey(child, index)
  );
  const [overflown, handleResize, handleOverflowResize, handleEntryResize] = useOverflow$1(childrenKeys, activeTabIndex);
  const horizontal = side && isHorizontalPanelSide(side);
  const handleContainerResize = reactExports.useCallback(
    (w) => {
      if (showWidgetIcon) setShowOnlyTabIcon(tabIds.length * 158 > w);
      handleResize && handleResize(w);
    },
    [handleResize, showWidgetIcon, tabIds]
  );
  const ref = useResizeObserver(handleContainerResize);
  const childrenArray = reactExports.useMemo(
    () => reactExports.Children.toArray(children),
    [children]
  );
  const tabChildren = childrenArray.reduce(
    (acc, child, index) => {
      const key = getChildKey(child, index);
      if (!overflown) {
        acc.push([key, child]);
        return acc;
      }
      if (horizontal && minimized) return acc;
      overflown.indexOf(key) < 0 && acc.push([key, child]);
      return acc;
    },
    []
  );
  const panelChildren = tabChildren.length !== childrenArray.length ? childrenArray.map((child, index) => {
    const key = getChildKey(child, index);
    return [key, child];
  }) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "nz-widget-tabs", ref, role: "tablist", children: [
    tabChildren.map(([key, child], index, array) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        WidgetTabsEntryProvider,
        {
          children: child,
          id: key,
          lastNotOverflown: index === array.length - 1 && panelChildren.length > 0,
          getOnResize: handleEntryResize
        },
        key
      );
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TitleBarTarget, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      WidgetOverflow,
      {
        hidden: overflown && panelChildren.length === 0,
        onResize: handleOverflowResize,
        children: panelChildren.map(([key, child]) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: child }, key);
        })
      }
    )
  ] });
}
const WidgetTabsEntryContext = reactExports.createContext(void 0);
WidgetTabsEntryContext.displayName = "nz:WidgetTabsEntryContext";
function WidgetTabsEntryProvider(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    WidgetTabsEntryContext.Provider,
    {
      value: {
        lastNotOverflown: props.lastNotOverflown,
        onResize: props.getOnResize(props.id)
      },
      children: props.children
    }
  );
}
WidgetTabs.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "WidgetTabs" };
WidgetTabsEntryProvider.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "WidgetTabsEntryProvider", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" }, "id": { "required": true, "tsType": { "name": "string" }, "description": "" }, "getOnResize": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(id: string) => (w: number) => void", "signature": { "arguments": [{ "type": { "name": "string" }, "name": "id" }], "return": { "name": "signature", "type": "function", "raw": "(w: number) => void", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "w" }], "return": { "name": "void" } } } } }, "description": "" }, "lastNotOverflown": { "required": true, "tsType": { "name": "boolean" }, "description": "" } } };
function Dock() {
  const dispatch = reactExports.useContext(NineZoneDispatchContext);
  const { translate } = useTranslation();
  const label2 = translate("widget.tooltips.dockToolSettings");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    WidgetAction,
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgDockTop, {}),
      label: label2,
      onClick: () => {
        dispatch({
          type: "TOOL_SETTINGS_DOCK"
        });
      }
    }
  );
}
function useDock() {
  const isToolSettings = useIsToolSettingsTab();
  const isMaximizedWidget = useIsMaximizedWidget();
  return isToolSettings && !isMaximizedWidget;
}
Dock.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "Dock" };
function usePanelWidgetId() {
  const side = reactExports.useContext(PanelSideContext);
  const widgetId = reactExports.useContext(WidgetIdContext);
  if (!side || widgetId === void 0) return void 0;
  return widgetId;
}
function useMainPanelWidgetId() {
  const side = reactExports.useContext(PanelSideContext);
  const widgetId = reactExports.useContext(WidgetIdContext);
  return useLayout((state) => {
    if (!side) return void 0;
    const widgets = state.panels[side].widgets;
    const mainWidget = isHorizontalPanelSide(side) ? widgets[widgets.length - 1] : widgets[0];
    return mainWidget === widgetId ? widgetId : void 0;
  });
}
function PinToggle() {
  const side = reactExports.useContext(PanelSideContext);
  const dispatch = reactExports.useContext(NineZoneDispatchContext);
  const { translate } = useTranslation();
  const pinLabel = translate("widget.tooltips.pinPanel");
  const unpinLabel = translate("widget.tooltips.unpinPanel");
  const pinned = useLayout((state) => state.panels[side].pinned);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    WidgetAction,
    {
      icon: pinned ? /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPin, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPinHollow, {}),
      label: pinned ? unpinLabel : pinLabel,
      onClick: () => {
        dispatch({
          side,
          type: "PANEL_TOGGLE_PINNED"
        });
      }
    }
  );
}
function usePinToggle() {
  const isMainPanelWidget = !!useMainPanelWidgetId();
  const isMaximizedWidget = useIsMaximizedWidget();
  return isMainPanelWidget && !isMaximizedWidget;
}
PinToggle.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "PinToggle" };
function PopoutToggle() {
  const dispatch = reactExports.useContext(NineZoneDispatchContext);
  const activeTabId = useActiveTabId();
  const { translate } = useTranslation();
  const label2 = translate("widget.tooltips.popoutActiveTab");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    WidgetAction,
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgWindowPopout, {}),
      label: label2,
      onClick: () => {
        dispatch({
          id: activeTabId,
          type: "WIDGET_TAB_POPOUT"
        });
      }
    }
  );
}
function usePopoutToggle() {
  const tabId = useActiveTabId();
  return useLayout((state) => {
    const tab = state.tabs[tabId];
    return !!tab.canPopout;
  });
}
PopoutToggle.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "PopoutToggle" };
const defaultAlignments = {
  top: HorizontalAlignment.Justify,
  // eslint-disable-line @typescript-eslint/no-deprecated
  bottom: HorizontalAlignment.Justify
  // eslint-disable-line @typescript-eslint/no-deprecated
};
const HorizontalPanelAlignContext = reactExports.createContext({
  enabled: false,
  alignments: defaultAlignments,
  setAlignment: () => {
  }
});
function SvgSide(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1rem",
      height: "1rem",
      viewBox: "0 0 16 16",
      fill: "var(--iui-color-icon-muted, currentColor)",
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 2v12h16V2H0Zm11 7H1V3h10v6Zm4 4h-3V3h3v10Z" })
    }
  );
}
function SvgJustify(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1rem",
      height: "1rem",
      viewBox: "0 0 16 16",
      fill: "var(--iui-color-icon-muted, currentColor)",
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 2v12h16V2H0Zm4 7H1V3h3v6Zm1 0V3h6v6H5Zm10 0h-3V3h3v6Z" })
    }
  );
}
function SvgCenter(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1rem",
      height: "1rem",
      viewBox: "0 0 16 16",
      fill: "var(--iui-color-icon-muted, currentColor)",
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 2v12h16V2H0Zm4 11H1V3h3v10Zm1-4V3h6v6H5Zm10 4h-3V3h3v10Z" })
    }
  );
}
function getIcon(side, alignment) {
  const scaleY = side === "top" ? "-1" : "1";
  if (alignment === HorizontalAlignment.Justify)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SvgJustify, { transform: `scale(1, ${scaleY})` });
  if (alignment === HorizontalAlignment.Center)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCenter, { transform: `scale(1, ${scaleY})` });
  const scaleX = alignment === HorizontalAlignment.Left ? "1" : "-1";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SvgSide, { transform: `scale(${scaleX}, ${scaleY})` });
}
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function PreviewHorizontalPanelAlignButton() {
  const side = reactExports.useContext(PanelSideContext);
  const { alignments, setAlignment } = reactExports.useContext(
    HorizontalPanelAlignContext
  );
  const label2 = "Align panel";
  const getMenuItems = (onClose) => [
    HorizontalAlignment.Justify,
    // eslint-disable-line @typescript-eslint/no-deprecated
    HorizontalAlignment.Center,
    // eslint-disable-line @typescript-eslint/no-deprecated
    HorizontalAlignment.Left,
    // eslint-disable-line @typescript-eslint/no-deprecated
    HorizontalAlignment.Right
    // eslint-disable-line @typescript-eslint/no-deprecated
  ].map((align) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuItem$1,
      {
        onClick: () => {
          setAlignment(side, align);
          onClose?.();
        },
        icon: getIcon(side, align),
        isSelected: alignments[side] === align,
        children: capitalize(align)
      },
      align
    );
  });
  const dropdownContext = reactExports.useContext(WidgetActionDropdownContext);
  if (dropdownContext !== void 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuItem$1,
      {
        icon: getIcon(side, alignments[side]),
        subMenuItems: getMenuItems(dropdownContext.onClose),
        children: label2
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenu, { menuItems: (close) => getMenuItems(close), children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabBarButton, { label: label2, children: getIcon(side, alignments[side]) }) });
}
function useHorizontalPanelAlignButton() {
  const side = reactExports.useContext(PanelSideContext);
  const { enabled } = reactExports.useContext(HorizontalPanelAlignContext);
  const isMainPanelWidget = !!useMainPanelWidgetId();
  const isMaximizedWidget = useIsMaximizedWidget();
  if (!side) return false;
  const isHorizontalPanel = isHorizontalPanelSide(side);
  return enabled && isHorizontalPanel && isMainPanelWidget && !isMaximizedWidget;
}
PreviewHorizontalPanelAlignButton.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "PreviewHorizontalPanelAlignButton" };
function MaximizeToggle() {
  const widgetId = reactExports.useContext(WidgetIdContext);
  const { maximizedWidget, setMaximizedWidget } = reactExports.useContext(
    MaximizedWidgetContext
  );
  const { id, label: label2, iconSpec } = maximizedWidget === widgetId ? {
    id: void 0,
    label: "Restore",
    iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgWindowMinimize, {})
  } : {
    id: widgetId,
    label: "Maximize",
    iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgWindowMaximize, {})
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    WidgetAction,
    {
      icon: iconSpec,
      label: label2,
      onClick: () => {
        setMaximizedWidget(id);
      }
    }
  );
}
function useMaximizeToggle() {
  const { enableMaximizedFloatingWidget, enableMaximizedPanelWidget } = usePreviewFeatures();
  const floatingWidgetId = useFloatingWidgetId();
  const panelWidgetId = usePanelWidgetId();
  if (enableMaximizedFloatingWidget && floatingWidgetId) return true;
  if (enableMaximizedPanelWidget && panelWidgetId) return true;
  return false;
}
MaximizeToggle.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "MaximizeToggle" };
function CloseWidgetButton() {
  const id = useActiveTabId();
  const dispatch = reactExports.useContext(NineZoneDispatchContext);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    WidgetAction,
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCloseSmall, {}),
      label: "Close widget",
      onClick: () => {
        dispatch({
          type: "WIDGET_TAB_HIDE",
          id
        });
      }
    }
  );
}
function useCloseTab() {
  const id = useActiveTabId();
  const { controlWidgetVisibility } = usePreviewFeatures();
  if (Array.isArray(controlWidgetVisibility)) {
    return controlWidgetVisibility.includes(id);
  }
  return !!controlWidgetVisibility;
}
CloseWidgetButton.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "CloseWidgetButton" };
const label = "Add widget";
function AddWidgetButton() {
  const dispatch = reactExports.useContext(NineZoneDispatchContext);
  const widgetId = reactExports.useContext(WidgetIdContext);
  const dropdownContext = reactExports.useContext(WidgetActionDropdownContext);
  const tabs2 = useUserControlledHiddenTabs();
  if (!widgetId) return null;
  const getMenuItems = (close) => tabs2.map((tab) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuItem$1,
      {
        onClick: () => {
          dispatch({
            type: "WIDGET_TAB_ADD_TO_WIDGET",
            id: tab.id,
            widgetId
          });
          dispatch({
            type: "WIDGET_TAB_OPEN",
            id: tab.id
          });
          close?.();
        },
        children: tab.label
      },
      tab.id
    );
  });
  const icon = /* @__PURE__ */ jsxRuntimeExports.jsx(SvgAdd, {});
  if (dropdownContext !== void 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuItem$1,
      {
        startIcon: icon,
        subMenuItems: getMenuItems(dropdownContext.onClose),
        children: label
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenu, { menuItems: (close) => getMenuItems(close), children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabBarButton, { label, children: icon }) });
}
function useAddTab() {
  const tabs2 = useUserControlledHiddenTabs();
  const { controlWidgetVisibility } = usePreviewFeatures();
  if (tabs2.length === 0) return false;
  return !!controlWidgetVisibility;
}
function useUserControlledHiddenTabs() {
  const { controlWidgetVisibility } = usePreviewFeatures();
  const hiddenTabs = useLayout((state) => {
    if (!controlWidgetVisibility) return [];
    const tabs2 = Object.values(state.tabs);
    const toolSettingsTabId = state.toolSettings?.tabId;
    return tabs2.filter((tab) => {
      if (tab.id === toolSettingsTabId) return false;
      const location = getTabLocation(state, tab.id);
      if (!!location) return false;
      if (Array.isArray(controlWidgetVisibility)) {
        return controlWidgetVisibility.includes(tab.id);
      }
      return true;
    });
  }, true);
  return hiddenTabs;
}
AddWidgetButton.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "AddWidgetButton" };
const widgetActions = {
  popout: PopoutToggle,
  sendBack: SendBack,
  dock: Dock,
  pin: PinToggle,
  maximize: MaximizeToggle,
  horizontalAlign: PreviewHorizontalPanelAlignButton,
  closeWidget: CloseWidgetButton,
  addWidget: AddWidgetButton
};
function WidgetActions(props) {
  const { modifyActions } = props;
  const defaultActions = useWidgetActions();
  const [dropdownActions, isDropdown] = useDropdownActions(defaultActions);
  const finalActions = reactExports.useMemo(() => {
    const knownActions = dropdownActions.map((feature) => ({
      id: feature,
      action: widgetActions[feature]
    }));
    if (!modifyActions) return knownActions;
    return modifyActions(knownActions);
  }, [dropdownActions, modifyActions]);
  const buttons2 = finalActions.map(({ id, action: Action }) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Action, {}, id);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nz-widget-widgetActions", children: isDropdown ? /* @__PURE__ */ jsxRuntimeExports.jsx(MoreButton, { children: buttons2 }) : buttons2 });
}
function useWidgetActions() {
  const popoutToggle = usePopoutToggle();
  const maximizeToggle = useMaximizeToggle();
  const sendBack = useSendBack();
  const dock = useDock();
  const horizontalPanelAlignButton = useHorizontalPanelAlignButton();
  const pinToggle = usePinToggle();
  const closeTab = useCloseTab();
  const addTab2 = useAddTab();
  return [
    ...addTab2 ? ["addWidget"] : [],
    ...closeTab ? ["closeWidget"] : [],
    ...popoutToggle ? ["popout"] : [],
    ...maximizeToggle ? ["maximize"] : [],
    ...sendBack ? ["sendBack"] : [],
    ...dock ? ["dock"] : [],
    ...horizontalPanelAlignButton ? ["horizontalAlign"] : [],
    ...pinToggle ? ["pin"] : []
  ];
}
WidgetActions.__docgenInfo = { "description": "Renders widget actions in the widget title bar.\nShould be used in `widgetActions` prop of {@link StandardLayout} component.\n@alpha", "methods": [], "displayName": "WidgetActions", "props": { "modifyActions": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(defaultActions: WidgetActionSpec[]) => WidgetActionSpec[]", "signature": { "arguments": [{ "type": { "name": "Array", "elements": [{ "name": "WidgetActionSpec" }], "raw": "WidgetActionSpec[]" }, "name": "defaultActions" }], "return": { "name": "Array", "elements": [{ "name": "WidgetActionSpec" }], "raw": "WidgetActionSpec[]" } } }, "description": "Function to modify the default widget actions.\nUse {@link WidgetAction} component when adding new widget actions." } } };
class CursorUpdatedEvent extends UiEvent {
}
class CursorInformation {
  static _cursorPosition = new Point();
  static _cursorDocument;
  static _cursorDirection = 17;
  static _cursorDirections = new Array();
  /** The cursor position. */
  static get cursorPosition() {
    return this._cursorPosition;
  }
  static set cursorPosition(pt) {
    this._cursorPosition = Point.create(pt);
  }
  /** Gets the cursor X position. */
  static get cursorX() {
    return this._cursorPosition.x;
  }
  /** Gets the cursor Y position. */
  static get cursorY() {
    return this._cursorPosition.y;
  }
  /** Gets the general cursor movement direction. */
  static get cursorDirection() {
    return this._cursorDirection;
  }
  /** Gets the cursor document. */
  static get cursorDocument() {
    return this._cursorDocument;
  }
  /** Gets the [[CursorUpdatedEvent]]. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static onCursorUpdatedEvent = new CursorUpdatedEvent();
  /** Handles the mouse movement.  Sets the cursor position and direction and emits onCursorUpdatedEvent. */
  static handleMouseMove(point, document2) {
    const oldPt = CursorInformation.cursorPosition;
    const direction = this._determineMostFrequentDirection(
      this._cursorDirections,
      this._cursorPosition,
      Point.create(point)
    );
    this.cursorPosition = point;
    this._cursorDocument = document2;
    this._cursorDirection = direction;
    this.onCursorUpdatedEvent.emit({ oldPt, newPt: point, direction });
  }
  static _determineMostFrequentDirection(cursorDirections, oldPt, newPt) {
    const cursorDirection = this._determineCursorDirection(oldPt, newPt);
    cursorDirections.push(cursorDirection);
    if (cursorDirections.length > 10) cursorDirections.shift();
    return this._mostFrequent(cursorDirections);
  }
  static _mostFrequent(array) {
    const hashMap = /* @__PURE__ */ new Map();
    let maxCount = 0, mostFrequent = 0;
    array.forEach((value) => {
      const key = value;
      let frequency = hashMap.get(key);
      if (frequency !== void 0) frequency++;
      else frequency = 1;
      hashMap.set(key, frequency);
      if (frequency > maxCount) {
        mostFrequent = key;
        maxCount = frequency;
      }
    });
    return mostFrequent;
  }
  static _determineCursorDirection(oldPt, newPt) {
    let directionParts = 0;
    if (newPt.x < oldPt.x) directionParts |= 256;
    else if (newPt.x > oldPt.x) directionParts |= 16;
    if (newPt.y < oldPt.y) directionParts |= 4096;
    else if (newPt.y > oldPt.y) directionParts |= 1;
    const direction = directionParts;
    return direction;
  }
  /** Gets the relative position based on the cursor direction. */
  static getRelativePositionFromCursorDirection(cursorDirection) {
    let relativePosition = RelativePosition.BottomRight;
    switch (cursorDirection) {
      case 4096:
        relativePosition = RelativePosition.Top;
        break;
      case 256:
        relativePosition = RelativePosition.Left;
        break;
      case 16:
        relativePosition = RelativePosition.Right;
        break;
      case 1:
        relativePosition = RelativePosition.Bottom;
        break;
      case 4352:
        relativePosition = RelativePosition.TopLeft;
        break;
      case 4112:
        relativePosition = RelativePosition.TopRight;
        break;
      case 257:
        relativePosition = RelativePosition.BottomLeft;
        break;
      case 17:
        relativePosition = RelativePosition.BottomRight;
        break;
    }
    return relativePosition;
  }
  /** @internal - for testing */
  static clearCursorDirections() {
    this._cursorDirections.length = 0;
  }
}
const useCursorInformationStore = create((set) => ({
  contentHovered: false,
  setContentHovered: (hovered) => {
    set(
      (state) => produce(state, (draft) => {
        draft.contentHovered = hovered;
      })
    );
  }
}));
var SessionStateActionId = /* @__PURE__ */ ((SessionStateActionId2) => {
  SessionStateActionId2["SetNumItemsSelected"] = "sessionstate:set-num-items-selected";
  SessionStateActionId2["SetAvailableSelectionScopes"] = "sessionstate:set-available-selection-scopes";
  SessionStateActionId2["SetSelectionScope"] = "sessionstate:set-selection-scope";
  SessionStateActionId2["SetActiveIModelId"] = "sessionstate:set-active-imodelid";
  SessionStateActionId2["SetIModelConnection"] = "sessionstate:set-imodel-connection";
  SessionStateActionId2["SetDefaultIModelViewportControlId"] = "sessionstate:set-default-viewportid";
  SessionStateActionId2["SetDefaultViewId"] = "sessionstate:set-default-viewid";
  SessionStateActionId2["SetDefaultViewState"] = "sessionstate:set-default-view-state";
  SessionStateActionId2["UpdateCursorMenu"] = "sessionstate:update-cursor-menu";
  return SessionStateActionId2;
})(SessionStateActionId || {});
const defaultSelectionScope = {
  id: "element",
  label: "Element"
};
const initialSessionState = {
  /** number of selected items in Presentation Selection */
  numItemsSelected: 0,
  /** initialize to only support "Element" scope, this will be overwritten when iModelConnection is established */
  availableSelectionScopes: [defaultSelectionScope],
  /** initialize to active selection scope to "Element", this will be overwritten when iModelConnection is established */
  activeSelectionScope: defaultSelectionScope.id,
  /** set to iModelId if an iModel is active else it is an empty string, so initialize to empty string */
  iModelId: "",
  defaultIModelViewportControlId: void 0,
  defaultViewId: void 0,
  defaultViewState: void 0,
  iModelConnection: void 0,
  cursorMenuData: void 0,
  cursorMenuPayload: void 0
};
function SessionStateReducer(state = initialSessionState, action) {
  switch (action.type) {
    case "sessionstate:set-num-items-selected": {
      if (void 0 !== action.payload)
        return { ...state, numItemsSelected: action.payload };
      else return { ...state, numItemsSelected: 0 };
    }
    case "sessionstate:set-available-selection-scopes": {
      const payloadArray = [];
      action.payload.forEach((scope) => payloadArray.push(scope));
      if (void 0 !== action.payload)
        return { ...state, availableSelectionScopes: payloadArray };
      else
        return { ...state, availableSelectionScopes: [defaultSelectionScope] };
    }
    case "sessionstate:set-selection-scope": {
      if (void 0 !== action.payload)
        return { ...state, activeSelectionScope: action.payload };
      else return { ...state, activeSelectionScope: defaultSelectionScope.id };
    }
    case "sessionstate:set-active-imodelid": {
      if (void 0 !== action.payload)
        return { ...state, iModelId: action.payload };
      else return { ...state, iModelId: "" };
    }
    case "sessionstate:set-default-viewportid": {
      return { ...state, defaultIModelViewportControlId: action.payload };
    }
    case "sessionstate:set-default-viewid": {
      return { ...state, defaultViewId: action.payload };
    }
    case "sessionstate:set-default-view-state": {
      return { ...state, defaultViewState: action.payload };
    }
    case "sessionstate:set-imodel-connection": {
      return { ...state, iModelConnection: action.payload };
    }
    case "sessionstate:update-cursor-menu": {
      return {
        ...state,
        cursorMenuPayload: action.payload,
        cursorMenuData: action.payload
      };
    }
  }
  return state;
}
class MenuItem extends ItemDefBase {
  _id = "";
  _actionItem;
  _submenu;
  _onSelection;
  _execute;
  /** onSelection is an optional parameter typically supplied to allow menu parent to close context menu when a menu item is selected. */
  constructor(props, onSelection) {
    super(props);
    this._id = props.id;
    this._submenu = new Array();
    this._onSelection = onSelection;
    if (props.item) {
      this._actionItem = new CommandItemDef(props.item);
      if (!this.label) this.setLabel(this._actionItem.label);
      if (!this.badgeType) this.badgeType = this._actionItem.badgeType;
      if (!this.badgeKind) this.badgeKind = this._actionItem.badgeKind;
      if (!this.isDisabled) this.isDisabled = this._actionItem.isDisabled;
    } else if (props.execute) {
      this._execute = props.execute;
    } else if (props.submenu) {
      props.submenu.forEach((childProps) => {
        const childItem = new MenuItem(childProps, onSelection);
        this._submenu.push(childItem);
      });
    } else {
      throw new UiError(
        UiFramework.loggerCategory("MenuItem"),
        `Either 'item', 'execute' or 'submenu' must be specified for '${props.id}'.`
      );
    }
    this.iconSpec = props.iconNode ?? props.icon ?? this._actionItem?.iconSpec;
    this.iconRightSpec = props.iconRightNode ?? props.iconRight;
  }
  get id() {
    return this._id;
  }
  get submenu() {
    return this._submenu;
  }
  get actionItem() {
    return this._actionItem;
  }
  iconRightSpec;
  itemPicked() {
    setTimeout(() => {
      if (this._actionItem) this._actionItem.execute();
      else if (this._execute) this._execute();
    });
    if (this._onSelection) this._onSelection();
  }
}
class MenuItemHelpers {
  static createMenuItems(itemPropsList, onSelection) {
    const menuItems = new Array();
    itemPropsList.forEach((itemProps) => {
      menuItems.push(new MenuItem(itemProps, onSelection));
    });
    return menuItems;
  }
  static createMenuItemNodes(itemList) {
    const itemNodes = [];
    itemList.forEach((item, index) => {
      const reactItem = this.createMenuItemNode(item, index);
      if (reactItem) itemNodes.push(reactItem);
    });
    return itemNodes;
  }
  static createMenuItemNode(item, index) {
    const label2 = item.label;
    const iconSpec = item.iconSpec;
    const iconRightSpec = item.iconRightSpec;
    const badgeType = item.badgeType;
    const badgeKind = item.badgeKind;
    const isDisabled = ConditionalBooleanValue.getValue(
      item.isDisabled
    );
    if (item.submenu && item.submenu.length > 0) {
      const items = this.createMenuItemNodes(item.submenu);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ContextSubMenu,
        {
          icon: iconSpec,
          label: label2,
          badgeType,
          badgeKind,
          disabled: isDisabled,
          children: items
        },
        index
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ContextMenuItem,
      {
        onSelect: () => item.itemPicked(),
        icon: iconSpec,
        iconRight: iconRightSpec,
        badgeType,
        badgeKind,
        disabled: isDisabled,
        children: label2
      },
      index
    );
  }
}
var SyncUiEventId = /* @__PURE__ */ ((SyncUiEventId2) => {
  SyncUiEventId2["AccuDrawCompassModeChanged"] = "accudrawcompassmodechanged";
  SyncUiEventId2["AccuDrawRotationChanged"] = "accudrawrotationchanged";
  SyncUiEventId2["ActiveContentChanged"] = "activecontentchanged";
  SyncUiEventId2["ActiveViewportChanged"] = "activeviewportchanged";
  SyncUiEventId2["BackstageEvent"] = "backstageevent";
  SyncUiEventId2["ContentLayoutActivated"] = "contentlayoutactivated";
  SyncUiEventId2["ContentControlActivated"] = "contentcontrolactivated";
  SyncUiEventId2["FrontstageActivating"] = "frontstageactivating";
  SyncUiEventId2["FrontstageReady"] = "frontstageready";
  SyncUiEventId2["ModalFrontstageChanged"] = "modalfrontstagechanged";
  SyncUiEventId2["ModalDialogChanged"] = "modaldialogchanged";
  SyncUiEventId2["NavigationAidActivated"] = "navigationaidactivated";
  SyncUiEventId2["ToolActivated"] = "toolactivated";
  SyncUiEventId2["WidgetStateChanged"] = "widgetstatechanged";
  SyncUiEventId2["SelectionSetChanged"] = "selectionsetchanged";
  SyncUiEventId2["SettingsProvidersChanged"] = "settingsproviderschanged";
  SyncUiEventId2["ViewStateChanged"] = "viewstatechanged";
  SyncUiEventId2["UiStateStorageChanged"] = "uistatestoragechanged";
  SyncUiEventId2["ShowHideManagerSettingChange"] = "show-hide-setting-change";
  SyncUiEventId2["FeatureOverridesChanged"] = "featureoverrideschanged";
  SyncUiEventId2["ViewedModelsChanged"] = "viewedmodelschanged";
  return SyncUiEventId2;
})(SyncUiEventId || {});
const SyncUiInternalEventId = {
  AccuDrawViewIs3dChanged: "accudraw-view-is3d-changed"
};
class InternalSyncUiEventDispatcher {
  _syncEventTimerId;
  _eventIds;
  _eventIdAdded;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  _uiSyncEvent;
  _timeoutPeriod;
  _secondaryTimeoutPeriod;
  constructor() {
    this._eventIds = /* @__PURE__ */ new Set();
    this._eventIdAdded = false;
    this._uiSyncEvent = new BeUiEvent();
    this._timeoutPeriod = 100;
    this._secondaryTimeoutPeriod = this._timeoutPeriod / 2;
  }
  /** @internal - used for testing only */
  setTimeoutPeriod(period) {
    this._timeoutPeriod = period;
    this._secondaryTimeoutPeriod = Math.floor(this._timeoutPeriod / 2);
    if (this._secondaryTimeoutPeriod < 1) this._secondaryTimeoutPeriod = 1;
    if (this._syncEventTimerId) {
      window.clearTimeout(this._syncEventTimerId);
      this._syncEventTimerId = void 0;
    }
    if (this._eventIds) this._eventIds.clear();
    this._eventIdAdded = false;
  }
  /** The current timeout period */
  get timeoutPeriod() {
    return this._timeoutPeriod;
  }
  /** Return set of event ids that will be sent to listeners/. */
  get syncEventIds() {
    return this._eventIds;
  }
  /** Return UiSyncEvent so callers can register an event callback. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  get onSyncUiEvent() {
    return this._uiSyncEvent;
  }
  /** Immediately trigger sync event processing. */
  dispatchImmediateSyncUiEvent(eventId) {
    const eventIds = /* @__PURE__ */ new Set();
    eventIds.add(eventId.toLowerCase());
    this.onSyncUiEvent.emit({ eventIds });
  }
  /** Save eventId in Set for processing. */
  dispatchSyncUiEvent(eventId) {
    if (0 === this._timeoutPeriod) {
      return;
    }
    this.syncEventIds.add(eventId.toLowerCase());
    if (!this._syncEventTimerId) {
      this._syncEventTimerId = window.setTimeout(() => {
        this.checkForAdditionalIds();
      }, this._timeoutPeriod);
    } else {
      this._eventIdAdded = true;
    }
  }
  /** Save multiple eventIds in Set for processing. */
  dispatchSyncUiEvents(eventIds) {
    if (0 === this._timeoutPeriod) {
      return;
    }
    eventIds.forEach((id) => this.syncEventIds.add(id.toLowerCase()));
    if (!this._syncEventTimerId) {
      this._syncEventTimerId = window.setTimeout(() => {
        this.checkForAdditionalIds();
      }, this._timeoutPeriod);
    } else {
      this._eventIdAdded = true;
    }
  }
  /** Trigger registered event processing when timer has expired and no addition eventId are added. */
  checkForAdditionalIds() {
    if (!this._eventIdAdded) {
      if (this._syncEventTimerId) {
        window.clearTimeout(this._syncEventTimerId);
        this._syncEventTimerId = void 0;
      }
      this._eventIdAdded = false;
      if (this.syncEventIds.size > 0) {
        const eventIds = /* @__PURE__ */ new Set();
        this.syncEventIds.forEach((value) => eventIds.add(value));
        this._eventIds.clear();
        this.onSyncUiEvent.emit({ eventIds });
      }
      return;
    }
    if (this._syncEventTimerId) {
      window.clearTimeout(this._syncEventTimerId);
      this._syncEventTimerId = void 0;
    }
    this._eventIdAdded = false;
    this._syncEventTimerId = window.setTimeout(() => {
      this.checkForAdditionalIds();
    }, this._secondaryTimeoutPeriod);
  }
  /** Checks to see if an eventId of interest is contained in the set of eventIds */
  hasEventOfInterest(eventIds, idsOfInterest) {
    if (idsOfInterest.length > 0 && idsOfInterest.some(
      (value) => eventIds.has(value.toLowerCase())
    ))
      return true;
    return false;
  }
}
const useAccuDrawStore = create(() => ({ is3d: false }));
class SyncUiEventDispatcher {
  static _uiEventDispatcher = new InternalSyncUiEventDispatcher();
  static _unregisterFuncs = new Array();
  static _connectionUnregisterFuncs = new Array();
  static _iModelConnection;
  static setTimeoutPeriod(period) {
    SyncUiEventDispatcher._uiEventDispatcher.setTimeoutPeriod(period);
  }
  /** Return set of event ids that will be sent to listeners/. */
  static get syncEventIds() {
    return SyncUiEventDispatcher._uiEventDispatcher.syncEventIds;
  }
  /** Return SyncUiEvent so callers can register an event callback. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static get onSyncUiEvent() {
    return SyncUiEventDispatcher._uiEventDispatcher.onSyncUiEvent;
  }
  /** Immediately trigger sync event processing. */
  static dispatchImmediateSyncUiEvent(eventId) {
    SyncUiEventDispatcher._uiEventDispatcher.dispatchImmediateSyncUiEvent(
      eventId
    );
  }
  /** Save eventId in Set for processing. */
  static dispatchSyncUiEvent(eventId) {
    if (0 === SyncUiEventDispatcher._uiEventDispatcher.timeoutPeriod) {
      Logger.logInfo(
        UiFramework.loggerCategory("SyncUiEventDispatcher"),
        `[dispatchSyncUiEvent] not processed because timeoutPeriod=0`
      );
      return;
    }
    SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(eventId);
  }
  /** Save multiple eventIds in Set for processing. */
  static dispatchSyncUiEvents(eventIds) {
    if (0 === SyncUiEventDispatcher._uiEventDispatcher.timeoutPeriod) {
      Logger.logInfo(
        UiFramework.loggerCategory("SyncUiEventDispatcher"),
        `[dispatchSyncUiEvents] not processed because _timeoutPeriod=0`
      );
    }
    SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvents(eventIds);
  }
  /** Checks to see if an eventId of interest is contained in the set of eventIds */
  static hasEventOfInterest(eventIds, idsOfInterest) {
    return SyncUiEventDispatcher._uiEventDispatcher.hasEventOfInterest(
      eventIds,
      idsOfInterest
    );
  }
  static _dispatchViewChange() {
    SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
      SyncUiEventId.ViewStateChanged
    );
  }
  static _dispatchFeatureOverridesChange() {
    SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
      SyncUiEventId.FeatureOverridesChanged
    );
  }
  static _dispatchViewedModelsChanged() {
    SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
      SyncUiEventId.ViewedModelsChanged
    );
  }
  /** Initializes the Monitoring of Events that trigger dispatching sync events */
  static initialize() {
    this._unregisterFuncs.forEach((unregister) => unregister());
    this._unregisterFuncs = [];
    this._unregisterFuncs.push(
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      UiFramework.frontstages.onContentControlActivatedEvent.addListener(() => {
        SyncUiEventDispatcher.dispatchSyncUiEvent(
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          SyncUiEventId.ContentControlActivated
        );
      }),
      UiFramework.frontstages.onContentLayoutActivatedEvent.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.ContentLayoutActivated
        );
      }),
      UiFramework.frontstages.onFrontstageActivatedEvent.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.FrontstageActivating
        );
      }),
      UiFramework.frontstages.onFrontstageReadyEvent.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.FrontstageReady
        );
      }),
      UiFramework.frontstages.onModalFrontstageChangedEvent.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.ModalFrontstageChanged
        );
      }),
      UiFramework.frontstages.onNavigationAidActivatedEvent.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.NavigationAidActivated
        );
      }),
      UiFramework.frontstages.onToolActivatedEvent.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.ToolActivated
        );
      }),
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.WidgetStateChanged
        );
      }),
      UiFramework.backstage.onToggled.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.BackstageEvent
        );
      }),
      UiFramework.content.onActiveContentChangedEvent.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.ActiveContentChanged
        );
      }),
      IModelApp.viewManager.onSelectedViewportChanged.addListener((args) => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.ActiveViewportChanged
        );
        if (void 0 === args.previous) {
          void IModelApp.toolAdmin.startDefaultTool();
        } else {
          args.previous.onViewChanged.removeListener(
            SyncUiEventDispatcher._dispatchViewChange
          );
          args.previous.onFeatureOverridesChanged.removeListener(
            SyncUiEventDispatcher._dispatchFeatureOverridesChange
          );
          args.previous.onViewedModelsChanged.removeListener(
            SyncUiEventDispatcher._dispatchViewedModelsChanged
          );
        }
        if (args.current) {
          args.current.onViewChanged.addListener(
            SyncUiEventDispatcher._dispatchViewChange
          );
          args.current.onFeatureOverridesChanged.addListener(
            SyncUiEventDispatcher._dispatchFeatureOverridesChange
          );
          args.current.onViewedModelsChanged.addListener(
            SyncUiEventDispatcher._dispatchViewedModelsChanged
          );
        }
      }),
      useAccuDrawStore.subscribe((state, prev) => {
        if (state.is3d === prev.is3d) return;
        SyncUiEventDispatcher.dispatchSyncUiEvent(
          SyncUiInternalEventId.AccuDrawViewIs3dChanged
        );
      })
    );
  }
  /** This should be called by IModelApp when the active IModelConnection is closed. */
  static clearConnectionEvents(iModelConnection) {
    if (this._iModelConnection !== iModelConnection) return;
    this._connectionUnregisterFuncs.forEach((unregister) => unregister());
    this._connectionUnregisterFuncs = [];
  }
  /** This should be called by IModelApp when the active IModelConnection is established. */
  static initializeConnectionEvents(iModelConnection) {
    this._iModelConnection && this.clearConnectionEvents(this._iModelConnection);
    this._iModelConnection = iModelConnection;
    this._connectionUnregisterFuncs.push(
      iModelConnection.selectionSet.onChanged.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.SelectionSetChanged
        );
      }),
      iModelConnection.selectionSet.onChanged.addListener((ev) => {
        const numSelected = ev.set.elements.size;
        UiFramework.setNumItemsSelected(numSelected);
      })
    );
  }
}
class InternalModalDialogManager {
  /** Modal Dialog Changed Event */
  static onModalDialogChangedEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** @internal */
  static dialogManager = new DialogManagerBase(InternalModalDialogManager.onModalDialogChangedEvent);
  /** Get the array of modal dialogs */
  static get dialogs() {
    return InternalModalDialogManager.dialogManager.dialogs;
  }
  /** Open a modal dialog
   * @param dialog The Dialog to open
   * @param id The id of the Dialog. If one is not provided, an id is generated.
   * @param parentDocument The Document used to determine the owning window.
   */
  static open(dialog2, id, parentDocument = document) {
    InternalModalDialogManager.dialogManager.openDialog(
      dialog2,
      id,
      parentDocument
    );
  }
  /** Close a modal dialog
   * @param dialog The Dialog to open. If one is not specified, the active dialog will be closed.
   */
  static close(dialog2) {
    InternalModalDialogManager.dialogManager.closeDialog(dialog2);
  }
  /** @internal */
  static closeAll() {
    InternalModalDialogManager.dialogManager.closeAll();
  }
  /** Update the dialogs */
  static update() {
    InternalModalDialogManager.dialogManager.update();
  }
  /** Get the active modal dialog */
  static get active() {
    return InternalModalDialogManager.dialogManager.activeDialog;
  }
  /** Get the count of modal dialogs */
  static get count() {
    return InternalModalDialogManager.dialogManager.dialogCount;
  }
}
class ModalDialogRenderer extends reactExports.PureComponent {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  constructor(props) {
    super(props);
  }
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogRendererBase,
      {
        ...this.props,
        dialogManager: InternalModalDialogManager.dialogManager
      }
    );
  }
}
ModalDialogRenderer.__docgenInfo = { "description": "ModalDialogRenderer React component renders modal dialogs\n@public", "methods": [], "displayName": "ModalDialogRenderer" };
class InternalModelessDialogManager {
  /** Modeless Dialog Changed Event */
  static onModelessDialogChangedEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** @internal */
  static dialogManager = new DialogManagerBase(
    InternalModelessDialogManager.onModelessDialogChangedEvent
  );
  /** Get the array of modeless dialogs */
  static get dialogs() {
    return InternalModelessDialogManager.dialogManager.dialogs;
  }
  static _dialogMap = /* @__PURE__ */ new Map();
  static _idArray = new Array();
  /** Initialize the modeless dialog manager
   * @internal
   */
  static initialize() {
    DialogManagerBase.initialize();
  }
  /** Open a modeless dialog
   * @param dialog The Dialog to open
   * @param id The id of the Dialog to open
   */
  static open(dialog2, id, parentDocument = document) {
    const dialogInfo = InternalModelessDialogManager._dialogMap.get(id);
    if (dialogInfo) {
      const message = `Dialog with id of '${id}' already opened`;
      Logger.logInfo(
        UiFramework.loggerCategory("InternalModelessDialogManager"),
        `openDialog: ${message}`
      );
      IModelApp.notifications.outputMessage(
        new NotifyMessageDetails(
          OutputMessagePriority.Info,
          message,
          void 0,
          OutputMessageType.Toast
        )
      );
      return;
    }
    InternalModelessDialogManager._dialogMap.set(id, {
      reactNode: dialog2,
      zIndex: DialogManagerBase.topZIndex,
      parentDocument
    });
    InternalModelessDialogManager._idArray.push(id);
    InternalModelessDialogManager.dialogManager.openDialog(
      dialog2,
      id,
      parentDocument
    );
  }
  /** Close a modeless dialog
   * @param id The id of the Dialog to close.
   */
  static close(id) {
    const dialogInfo = InternalModelessDialogManager._dialogMap.get(id);
    if (dialogInfo) {
      InternalModelessDialogManager.dialogManager.removeDialog(
        dialogInfo.reactNode
      );
      InternalModelessDialogManager._dialogMap.delete(id);
      const index = InternalModelessDialogManager._idArray.indexOf(id);
      if (index >= 0) InternalModelessDialogManager._idArray.splice(index, 1);
      if (InternalModelessDialogManager.active === void 0)
        DialogManagerBase.topZIndex = DialogManagerBase.getDialogZIndexDefault();
      this.update();
    } else {
      Logger.logError(
        UiFramework.loggerCategory("InternalModelessDialogManager"),
        `closeDialog: Could not find dialog with id of '${id}'`
      );
    }
  }
  /** @internal */
  static closeAll() {
    InternalModelessDialogManager.dialogManager.closeAll();
    InternalModelessDialogManager._dialogMap.clear();
    InternalModelessDialogManager._idArray = [];
  }
  /** Update the dialogs */
  static update() {
    InternalModelessDialogManager.dialogManager.update();
  }
  /** Get the active modeless dialog */
  static get active() {
    if (InternalModelessDialogManager._idArray.length > 0) {
      const id = InternalModelessDialogManager._idArray[InternalModelessDialogManager._idArray.length - 1];
      const dialogInfo = InternalModelessDialogManager._dialogMap.get(id);
      if (dialogInfo) return dialogInfo.reactNode;
    }
    return void 0;
  }
  /** Get the count of modeless dialogs */
  static get count() {
    return InternalModelessDialogManager.dialogManager.dialogCount;
  }
  /** Handle a pointer down event on a modeless dialog */
  static handlePointerDownEvent(_event, id, updateFunc) {
    const dialogInfo = InternalModelessDialogManager._dialogMap.get(id);
    if (dialogInfo && dialogInfo.reactNode !== InternalModelessDialogManager.active) {
      DialogManagerBase.topZIndex += 1;
      dialogInfo.zIndex = DialogManagerBase.topZIndex;
      InternalModelessDialogManager._idArray.splice(
        InternalModelessDialogManager._idArray.indexOf(id),
        1
      );
      InternalModelessDialogManager._idArray.push(id);
      updateFunc();
      this.update();
    }
  }
  /** Get the z-index for a modeless dialog */
  static getZIndex(id) {
    let zIndex = DialogManagerBase.getDialogZIndexDefault();
    const dialogInfo = InternalModelessDialogManager._dialogMap.get(id);
    if (dialogInfo) zIndex = dialogInfo.zIndex;
    return zIndex;
  }
  static getInfo(id) {
    return InternalModelessDialogManager._dialogMap.get(id);
  }
}
class ModelessDialogRenderer extends reactExports.PureComponent {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  constructor(props) {
    super(props);
  }
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogRendererBase,
      {
        ...this.props,
        dialogManager: InternalModelessDialogManager.dialogManager
      }
    );
  }
}
ModelessDialogRenderer.__docgenInfo = { "description": "ModelessDialogRenderer React component renders modeless dialogs.\n@public", "methods": [], "displayName": "ModelessDialogRenderer" };
class KeyboardShortcutMenuEvent extends UiEvent {
}
class KeyboardShortcutMenu extends reactExports.PureComponent {
  state = {
    menuVisible: false,
    menuX: 0,
    menuY: 0
  };
  /** Get KeyboardShortcut Menu Event. */
  static onKeyboardShortcutMenuEvent = new KeyboardShortcutMenuEvent();
  componentDidMount() {
    KeyboardShortcutMenu.onKeyboardShortcutMenuEvent.addListener(
      this._handleKeyboardShortcutMenuEvent
    );
  }
  componentWillUnmount() {
    KeyboardShortcutMenu.onKeyboardShortcutMenuEvent.removeListener(
      this._handleKeyboardShortcutMenuEvent
    );
  }
  _handleKeyboardShortcutMenuEvent = (state) => {
    this.setState(state);
  };
  render() {
    const { shortcuts, menuX, menuY, menuVisible } = this.state;
    const onClose = this._hideContextMenu;
    if (menuVisible) {
      const items = this.getShortcutMenuItems(shortcuts);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlobalContextMenu,
        {
          className: this.props.className,
          style: this.props.style,
          identifier: "keyboard-shortcuts",
          x: menuX,
          y: menuY,
          opened: menuVisible,
          onEsc: onClose,
          onOutsideClick: onClose,
          edgeLimit: false,
          autoflip: true,
          ignoreNextKeyUp: true,
          offset: 12,
          children: items
        }
      );
    }
    return null;
  }
  getShortcutMenuItems(shortcuts) {
    const items = [];
    if (shortcuts) {
      shortcuts.forEach((shortcut, index) => {
        const item = this.getShortcutMenuItem(shortcut, index);
        if (item) items.push(item);
      });
    }
    return items;
  }
  getShortcutMenuItem(shortcut, index) {
    const shortcutKey = shortcut.key;
    const isHidden2 = ConditionalBooleanValue.getValue(shortcut.isHidden);
    if (shortcutKey !== shortcut.keyMapKey || shortcut.isFunctionKey || shortcut.isSpecialKey || isHidden2)
      return null;
    let node = null;
    let label2 = shortcut.label;
    const iconSpec = shortcut.iconSpec;
    label2 = `~${shortcutKey.toLocaleUpperCase()} ${label2}`;
    if (shortcut.shortcutContainer.areKeyboardShortcutsAvailable()) {
      const shortcuts = shortcut.shortcutContainer.getAvailableKeyboardShortcuts();
      const items = this.getShortcutMenuItems(shortcuts);
      node = /* @__PURE__ */ jsxRuntimeExports.jsx(
        ContextSubMenu,
        {
          icon: iconSpec,
          label: label2,
          disabled: shortcut.isDisabled,
          badgeType: shortcut.badgeType,
          badgeKind: shortcut.badgeKind,
          children: items
        },
        index
      );
    } else {
      const sel = () => this._itemPicked(shortcut);
      node = /* @__PURE__ */ jsxRuntimeExports.jsx(
        ContextMenuItem,
        {
          onSelect: sel,
          icon: iconSpec,
          disabled: shortcut.isDisabled,
          badgeType: shortcut.badgeType,
          badgeKind: shortcut.badgeKind,
          children: label2
        },
        index
      );
    }
    return node;
  }
  _hideContextMenu = () => {
    this.setState({ menuVisible: false, shortcuts: void 0 });
  };
  _itemPicked = (shortcut) => {
    this._hideContextMenu();
    shortcut.itemPicked();
  };
}
KeyboardShortcutMenu.__docgenInfo = { "description": "React component that displays a context menu at the cursor containing keyboard shortcuts.\n@public\n@deprecated in 4.15.0. Component used internally to display keyboard shortcuts in a context menu.", "methods": [], "displayName": "KeyboardShortcutMenu" };
class InputFieldMessage extends reactExports.PureComponent {
  state = {
    message: "",
    isVisible: false,
    priority: OutputMessagePriority.None,
    showCloseButton: !!this.props.showCloseButton
  };
  render() {
    const {
      isVisible: isVisible2,
      inputFieldElement,
      message,
      priority,
      detailedMessage,
      showCloseButton
    } = this.state;
    if (!inputFieldElement || !message) {
      return null;
    }
    return (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Popup,
        {
          isOpen: isVisible2,
          position: RelativePosition.BottomLeft,
          onClose: this._onInputMessageClose,
          target: inputFieldElement,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "uifw-popup-message-inputField", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "uifw-popup-message-inputField-content", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "uifw-popup-message-inputField-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FieldIcon, { priority }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "uifw-popup-message-text", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MessageRenderer$1,
                  {
                    className: "uifw-popup-message-brief",
                    message
                  }
                ),
                detailedMessage && // eslint-disable-next-line @typescript-eslint/no-deprecated
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MessageRenderer$1,
                  {
                    className: "uifw-popup-message-detailed",
                    message: detailedMessage
                  }
                )
              ] })
            ] }) }),
            showCloseButton && // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "uifw-popup-message-close",
                onClick: this._onInputMessageClose,
                role: "button",
                tabIndex: -1,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$2, { iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgClose, {}) })
              }
            )
          ] })
        }
      )
    );
  }
  componentDidMount() {
    MessageManager.onInputFieldMessageAddedEvent.addListener(
      this._handleInputFieldMessageAddedEvent
    );
    MessageManager.onInputFieldMessageRemovedEvent.addListener(
      this._handleInputFieldMessageRemovedEvent
    );
  }
  componentWillUnmount() {
    MessageManager.onInputFieldMessageAddedEvent.removeListener(
      this._handleInputFieldMessageAddedEvent
    );
    MessageManager.onInputFieldMessageRemovedEvent.removeListener(
      this._handleInputFieldMessageRemovedEvent
    );
  }
  _onInputMessageClose = () => {
    this.setState({ isVisible: false });
  };
  _handleInputFieldMessageAddedEvent = (args) => {
    this.setState({
      inputFieldElement: args.target,
      message: args.messageText,
      isVisible: true,
      priority: args.priority,
      detailedMessage: args.detailedMessage
    });
  };
  _handleInputFieldMessageRemovedEvent = () => {
    this.setState({ isVisible: false });
  };
}
function FieldIcon({ priority }) {
  let svg = /* @__PURE__ */ jsxRuntimeExports.jsx(SvgInfoCircularHollow, {});
  switch (priority) {
    case OutputMessagePriority.Success:
      svg = /* @__PURE__ */ jsxRuntimeExports.jsx(SvgStatusSuccess$1, {});
      break;
    case OutputMessagePriority.Warning:
      svg = /* @__PURE__ */ jsxRuntimeExports.jsx(SvgStatusWarning$1, {});
      break;
    case OutputMessagePriority.Fatal:
    case OutputMessagePriority.Error:
      svg = /* @__PURE__ */ jsxRuntimeExports.jsx(SvgStatusErrorHollow, {});
      break;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$3, { children: svg });
}
InputFieldMessage.__docgenInfo = { "description": "InputField message pops up near pointer when attempting an invalid interaction.\n@public\n@deprecated in 4.16.0. Component is used internally. Use {@link MessageManager.displayInputFieldMessage} instead to open the message.", "methods": [], "displayName": "InputFieldMessage", "props": { "showCloseButton": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
function useReparentPopoutWidget(id) {
  const { reparentPopoutWidgets } = usePreviewFeatures();
  if (reparentPopoutWidgets === true) {
    return true;
  }
  if (Array.isArray(reparentPopoutWidgets) && reparentPopoutWidgets.indexOf(id) >= 0) {
    return true;
  }
  return false;
}
function ReparentedPopoutWidget({
  widgetId
}) {
  const setPopout = usePopoutsStore((state) => state.setPopout);
  const setPopoutRef = reactExports.useCallback(
    (instance) => {
      setPopout(widgetId, instance ?? void 0);
    },
    [setPopout, widgetId]
  );
  const autoCloseRef = useAutoClosePopovers(widgetId);
  const ref = useRefs(setPopoutRef, autoCloseRef);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "uifw-preview-reparentPopoutWidgets-reparentedPopoutWidget",
      "data-widget-id": widgetId,
      ref
    }
  );
}
function useAutoClosePopovers(widgetContainerId) {
  const ref = reactExports.useRef(null);
  const onClosePopoutWidget = usePopoutsStore(
    (state) => state.onClosePopoutWidget
  );
  reactExports.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    return onClosePopoutWidget.addListener(({ windowId }) => {
      if (windowId !== widgetContainerId) return;
      element.dispatchEvent(new MouseEvent("mousedown"));
      element.dispatchEvent(new PointerEvent("pointerdown"));
    });
  }, [widgetContainerId, onClosePopoutWidget]);
  return ref;
}
ReparentedPopoutWidget.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "ReparentedPopoutWidget", "props": { "widgetId": { "required": true, "tsType": { "name": 'WidgetState["id"]', "raw": 'WidgetState["id"]' }, "description": "" } } };
function useTransientState(onSave, onRestore) {
  const tabId = reactExports.useContext(TabIdContext);
  return useTabTransientState(tabId, onSave, onRestore);
}
function ScrollableWidgetContent(props) {
  const scrollPosition = reactExports.useRef(new Point());
  const contentRef = reactExports.useRef(null);
  const onSave = reactExports.useCallback(() => {
    const content = contentRef.current;
    if (!content) return;
    scrollPosition.current = new Point(content.scrollLeft, content.scrollTop);
  }, []);
  const onRestore = reactExports.useCallback(() => {
    const content = contentRef.current;
    if (!content) return;
    content.scrollLeft = scrollPosition.current.x;
    content.scrollTop = scrollPosition.current.y;
  }, []);
  useTransientState(onSave, onRestore);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-item-id": props.itemId,
      "data-item-provider-id": props.providerId,
      "data-item-type": "widget-content",
      className: "nz-widget-content",
      ref: contentRef,
      children: props.children
    }
  );
}
ScrollableWidgetContent.__docgenInfo = { "description": "Component that enables widget content scrolling.\n@internal", "methods": [], "displayName": "ScrollableWidgetContent", "props": { "itemId": { "required": false, "tsType": { "name": "string" }, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id" }, "providerId": { "required": false, "tsType": { "name": "string" }, "description": "" }, "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" } } };
var StagePanelLocation = /* @__PURE__ */ ((StagePanelLocation2) => {
  StagePanelLocation2[StagePanelLocation2["Top"] = 101] = "Top";
  StagePanelLocation2[StagePanelLocation2["Left"] = 102] = "Left";
  StagePanelLocation2[StagePanelLocation2["Right"] = 103] = "Right";
  StagePanelLocation2[StagePanelLocation2["Bottom"] = 104] = "Bottom";
  return StagePanelLocation2;
})(StagePanelLocation || {});
var StagePanelSection = /* @__PURE__ */ ((StagePanelSection2) => {
  StagePanelSection2[StagePanelSection2["Start"] = 0] = "Start";
  StagePanelSection2[StagePanelSection2["End"] = 1] = "End";
  return StagePanelSection2;
})(StagePanelSection || {});
function isToolbarActionItem(item) {
  return "execute" in item;
}
function isToolbarGroupItem(item) {
  return "items" in item;
}
function isToolbarCustomItem(item) {
  return !isToolbarActionItem(item) && !isToolbarGroupItem(item);
}
var StatusBarSection = /* @__PURE__ */ ((StatusBarSection2) => {
  StatusBarSection2[StatusBarSection2["Message"] = 0] = "Message";
  StatusBarSection2[StatusBarSection2["Left"] = 0] = "Left";
  StatusBarSection2[StatusBarSection2["Stage"] = 1] = "Stage";
  StatusBarSection2[StatusBarSection2["Center"] = 1] = "Center";
  StatusBarSection2[StatusBarSection2["Selection"] = 2] = "Selection";
  StatusBarSection2[StatusBarSection2["Right"] = 2] = "Right";
  StatusBarSection2[StatusBarSection2["Context"] = 3] = "Context";
  return StatusBarSection2;
})(StatusBarSection || {});
var StatusBarLabelSide = /* @__PURE__ */ ((StatusBarLabelSide2) => {
  StatusBarLabelSide2[StatusBarLabelSide2["Left"] = 0] = "Left";
  StatusBarLabelSide2[StatusBarLabelSide2["Right"] = 1] = "Right";
  return StatusBarLabelSide2;
})(StatusBarLabelSide || {});
function isStatusBarActionItem(item) {
  return "execute" in item;
}
function isStatusBarLabelItem(item) {
  return !isStatusBarActionItem(item) && "label" in item;
}
function isStatusBarCustomItem(item) {
  return "content" in item;
}
const _abstract = abstract;
const AbstractUiItemsManager = (
  // @ts-ignore Removed in 4.0
  _abstract.UiItemsManager
);
const isAbstractStatusBarCustomItem = _abstract.isAbstractStatusBarCustomItem;
const AbstractStagePanelLocation = _abstract.StagePanelLocation;
const AbstractStagePanelSection = _abstract.StagePanelSection;
const AbstractToolbarItemUtilities = ToolbarItemUtilities;
const originalDataSymbol = Symbol("originalData");
function createAbstractUiItemsManagerAdapter() {
  if (!AbstractUiItemsManager) return void 0;
  return new AbstractUiItemsManagerAdapter(AbstractUiItemsManager);
}
class AbstractUiItemsManagerAdapter {
  constructor(_adaptee) {
    this._adaptee = _adaptee;
  }
  clearAllProviders() {
    return this._adaptee.clearAllProviders();
  }
  get onUiProviderRegisteredEvent() {
    if (!("emit" in this._adaptee.onUiProviderRegisteredEvent)) {
      this._adaptee.onUiProviderRegisteredEvent.emit = (args) => {
        this._adaptee.onUiProviderRegisteredEvent.raiseEvent(args);
      };
    }
    return this._adaptee.onUiProviderRegisteredEvent;
  }
  unregister(providerId) {
    return this._adaptee.unregister(providerId);
  }
  get hasRegisteredProviders() {
    return this._adaptee.hasRegisteredProviders;
  }
  get registeredProviderIds() {
    return this._adaptee.registeredProviderIds;
  }
  register(provider, overrides) {
    const abstractProvider = createUiItemsProviderToAbstractAdapter(provider);
    return this._adaptee.register(abstractProvider, overrides);
  }
  getUiItemsProvider(providerId) {
    const abstractProvider = this._adaptee.getUiItemsProvider(providerId);
    if (!abstractProvider) return void 0;
    const provider = createAbstractToUiItemsProviderAdapter(abstractProvider);
    return provider;
  }
  getBackstageItems() {
    const abstractItems = this._adaptee.getBackstageItems();
    const items = abstractItems.map((abstractItem) => {
      const item = fromAbstractBackstageItem(abstractItem);
      return {
        ...item,
        providerId: abstractItem.providerId ? abstractItem.providerId : ""
      };
    });
    return items;
  }
  getStatusBarItems(stageId, stageUsage) {
    const abstractItems = this._adaptee.getStatusBarItems(stageId, stageUsage);
    const items = abstractItems.map((abstractItem) => {
      const item = fromAbstractStatusBarItem(abstractItem);
      return {
        ...item,
        providerId: abstractItem.providerId ? abstractItem.providerId : ""
      };
    });
    return items;
  }
  getToolbarButtonItems(stageId, stageUsage, usage, orientation) {
    const abstractItems = this._adaptee.getToolbarButtonItems(
      stageId,
      stageUsage,
      usage,
      orientation
    );
    const items = abstractItems.map((abstractItem) => {
      const item = fromAbstractToolbarItem(abstractItem);
      return {
        ...item,
        providerId: abstractItem.providerId ?? ""
      };
    });
    return items;
  }
  getWidgets(stageId, stageUsage, location, section) {
    const abstractLocations = toAbstractStagePanelLocation(location);
    const abstractSections = section === void 0 ? [void 0] : toAbstractStagePanelSection(section);
    const combos = [];
    abstractLocations.forEach((abstractLocation) => {
      abstractSections.forEach((abstractSection) => {
        combos.push([abstractLocation, abstractSection]);
      });
    });
    let abstractWidgets = combos.reduce(
      (acc, [abstractLocation, abstractSection]) => {
        const w = this._adaptee.getWidgets(
          stageId,
          stageUsage,
          abstractLocation,
          abstractSection
        );
        acc.push(...w);
        return acc;
      },
      []
    );
    abstractWidgets = abstractWidgets.reduce(
      (acc, abstractWidget) => {
        if (-1 === acc.findIndex((w) => w.id === abstractWidget.id))
          acc.push(abstractWidget);
        return acc;
      },
      []
    );
    const widgets = abstractWidgets.map((abstractWidget) => {
      const widget2 = fromAbstractWidget(abstractWidget);
      return {
        ...widget2,
        providerId: abstractWidget.providerId ?? ""
      };
    });
    return widgets;
  }
}
function createUiItemsProviderToAbstractAdapter(adaptee) {
  const {
    id,
    onUnregister,
    provideBackstageItems,
    provideStatusBarItems,
    provideWidgets,
    ...other
  } = adaptee;
  const provider = createGetPropertyAdapter(adaptee);
  return {
    id: adaptee.id,
    onUnregister: adaptee.onUnregister,
    provideBackstageItems: () => {
      const items = provider.provideBackstageItems();
      const abstractItems = items.map((item) => toAbstractBackstageItem(item));
      return abstractItems;
    },
    provideStatusBarItems: (stageId, stageUsage, _stageAppData) => {
      const items = provider.provideStatusBarItems(stageId, stageUsage);
      const abstractItems = items.map((item) => toAbstractStatusBarItem(item));
      return abstractItems;
    },
    provideToolbarButtonItems: (stageId, stageUsage, usage, orientation, _stageAppData) => {
      const items = provider.provideToolbarItems(
        stageId,
        stageUsage,
        usage,
        orientation
      );
      const abstractItems = items.map((item) => toAbstractToolbarItem(item));
      return abstractItems;
    },
    provideWidgets: (stageId, stageUsage, abstractLocation, abstractSection, _zoneLocation, _stageAppData) => {
      const location = fromAbstractStagePanelLocation(abstractLocation);
      const section = abstractSection === void 0 ? void 0 : fromAbstractStagePanelSection(abstractSection);
      const items = provider.provideWidgets(
        stageId,
        stageUsage,
        location,
        section
      );
      const abstractWidgets = items.map((item) => toAbstractWidget(item));
      return abstractWidgets;
    },
    ...other
  };
}
function createAbstractToUiItemsProviderAdapter(adaptee) {
  const {
    id,
    onUnregister,
    provideBackstageItems,
    provideStatusBarItems,
    provideWidgets,
    ...other
  } = adaptee;
  return {
    id: adaptee.id,
    onUnregister: adaptee.onUnregister,
    provideBackstageItems: () => {
      if (!adaptee.provideBackstageItems) return [];
      const abstractItems = adaptee.provideBackstageItems();
      const items = abstractItems.map(
        (abstractItem) => fromAbstractBackstageItem(abstractItem)
      );
      return items;
    },
    provideStatusBarItems: (stageId, stageUsage) => {
      if (!adaptee.provideStatusBarItems) return [];
      const abstractItems = adaptee.provideStatusBarItems(stageId, stageUsage);
      const items = abstractItems.map(
        (abstractItem) => fromAbstractStatusBarItem(abstractItem)
      );
      return items;
    },
    provideWidgets: (stageId, stageUsage, location, section) => {
      if (!adaptee.provideWidgets) return [];
      const abstractLocations = toAbstractStagePanelLocation(location);
      const abstractSections = section === void 0 ? [void 0] : toAbstractStagePanelSection(section);
      const combos = [];
      abstractLocations.forEach((abstractLocation) => {
        abstractSections.forEach((abstractSection) => {
          combos.push([abstractLocation, abstractSection]);
        });
      });
      let abstractWidgets = combos.reduce(
        (acc, [abstractLocation, abstractSection]) => {
          assert(!!adaptee.provideWidgets);
          const w = adaptee.provideWidgets(
            stageId,
            stageUsage,
            abstractLocation,
            abstractSection
          );
          acc.push(...w);
          return acc;
        },
        []
      );
      abstractWidgets = abstractWidgets.reduce(
        (acc, abstractWidget) => {
          if (-1 === acc.findIndex((w) => w.id === abstractWidget.id))
            acc.push(abstractWidget);
          return acc;
        },
        []
      );
      const widgets = abstractWidgets.map(
        (abstractWidget) => fromAbstractWidget(abstractWidget)
      );
      return widgets;
    },
    provideToolbarItems: (stageId, stageUsage, usage, orientation) => {
      if (!adaptee.provideToolbarButtonItems) return [];
      const abstractItems = adaptee.provideToolbarButtonItems(
        stageId,
        stageUsage,
        usage,
        orientation
      );
      const items = abstractItems.map(
        (abstractItem) => fromAbstractToolbarItem(abstractItem)
      );
      return items;
    },
    ...other
  };
}
function getBadgeType(badgeKind) {
  switch (badgeKind) {
    case "new":
      return BadgeType.New;
    case "technical-preview":
      return BadgeType.TechnicalPreview;
    default:
      return void 0;
  }
}
function toAbstractBackstageItem(item) {
  let abstractItem = getOriginalData(item);
  if (abstractItem) return abstractItem;
  const internalData = /* @__PURE__ */ new Map();
  const icon = IconHelper.getIconData(item.icon, internalData);
  abstractItem = {
    ...item,
    badgeType: getBadgeType(item.badgeKind) || item.badge,
    icon,
    internalData
  };
  setOriginalData(abstractItem, item);
  return abstractItem;
}
function toAbstractStatusBarItem(item) {
  let abstractItem = getOriginalData(item);
  if (abstractItem) return abstractItem;
  if (isStatusBarCustomItem(item)) {
    abstractItem = {
      ...item,
      badgeType: getBadgeType(item.badgeKind) || item.badge,
      isCustom: true,
      reactNode: item.content
    };
  } else {
    const internalData = /* @__PURE__ */ new Map();
    const icon = IconHelper.getIconData(item.icon, internalData);
    abstractItem = {
      ...item,
      badgeType: getBadgeType(item.badgeKind) || item.badge,
      icon,
      internalData
    };
  }
  setOriginalData(abstractItem, item);
  return abstractItem;
}
function toAbstractToolbarItem(item) {
  let abstractItem = getOriginalData(item);
  if (abstractItem) return abstractItem;
  const internalData = /* @__PURE__ */ new Map();
  const icon = IconHelper.getIconData(item.icon, internalData);
  if (isToolbarActionItem(item)) {
    abstractItem = {
      ...item,
      badgeType: getBadgeType(item.badgeKind) || item.badge,
      icon,
      internalData,
      parentToolGroupId: item.parentGroupItemId
    };
  } else if (isToolbarGroupItem(item)) {
    abstractItem = {
      ...item,
      badgeType: getBadgeType(item.badgeKind) || item.badge,
      icon,
      internalData,
      parentToolGroupId: item.parentGroupItemId,
      items: item.items.map((i) => toAbstractToolbarItem(i))
    };
  } else {
    abstractItem = {
      ...item,
      badgeType: getBadgeType(item.badgeKind) || item.badge,
      isCustom: true,
      icon,
      internalData
    };
  }
  setOriginalData(abstractItem, item);
  return abstractItem;
}
function toAbstractWidget(widget2) {
  let abstractWidget = getOriginalData(widget2);
  if (abstractWidget) return abstractWidget;
  const allowedPanelTargets = widget2.allowedPanels?.map((location) => {
    const map = {
      [StagePanelLocation.Top]: "top",
      [StagePanelLocation.Left]: "left",
      [StagePanelLocation.Right]: "right",
      [StagePanelLocation.Bottom]: "bottom"
    };
    return map[location];
  });
  const internalData = /* @__PURE__ */ new Map();
  const icon = IconHelper.getIconData(widget2.icon, internalData);
  abstractWidget = {
    ...widget2,
    id: widget2.id ?? "",
    getWidgetContent: () => widget2.content,
    allowedPanelTargets,
    badgeType: getBadgeType(widget2.badgeKind) || widget2.badge,
    defaultFloatingPosition: typeof widget2.canFloat === "object" ? widget2.canFloat.defaultPosition : void 0,
    defaultFloatingSize: typeof widget2.canFloat === "object" ? widget2.canFloat.defaultSize : void 0,
    floatingContainerId: typeof widget2.canFloat === "object" ? widget2.canFloat.containerId : void 0,
    hideWithUiWhenFloating: typeof widget2.canFloat === "object" ? widget2.canFloat.hideWithUi : void 0,
    isFloatingStateSupported: !!widget2.canFloat,
    isFloatingStateWindowResizable: typeof widget2.canFloat === "object" ? widget2.canFloat.isResizable : void 0,
    icon,
    internalData
  };
  setOriginalData(abstractWidget, widget2);
  return abstractWidget;
}
function fromAbstractBackstageItem(abstractItem) {
  let item = getOriginalData(abstractItem);
  if (item) return item;
  const icon = fromAbstractIcon(abstractItem.icon, abstractItem.internalData);
  item = {
    ...abstractItem,
    badge: abstractItem.badgeType,
    icon
  };
  setOriginalData(item, abstractItem);
  return item;
}
function fromAbstractStatusBarItem(abstractItem) {
  let item = getOriginalData(abstractItem);
  if (item) return item;
  if (isAbstractStatusBarCustomItem(abstractItem)) {
    const content = abstractItem.reactNode;
    return {
      ...abstractItem,
      badge: abstractItem.badgeType,
      content
    };
  } else {
    const icon = fromAbstractIcon(abstractItem.icon, abstractItem.internalData);
    item = {
      ...abstractItem,
      badge: abstractItem.badgeType,
      icon
    };
  }
  setOriginalData(item, abstractItem);
  return item;
}
function fromAbstractToolbarItem(abstractItem) {
  let item = getOriginalData(abstractItem);
  if (item) return item;
  const icon = fromAbstractIcon(abstractItem.icon, abstractItem.internalData);
  if (AbstractToolbarItemUtilities.isCustomDefinition(abstractItem)) {
    item = {
      ...abstractItem,
      badge: abstractItem.badgeType,
      icon
    };
  } else {
    item = {
      ...abstractItem,
      badge: abstractItem.badgeType,
      parentGroupItemId: abstractItem.parentToolGroupId,
      icon
    };
  }
  setOriginalData(item, abstractItem);
  return item;
}
function fromAbstractWidget(abstractWidget) {
  let widget2 = getOriginalData(abstractWidget);
  if (widget2) return widget2;
  const allowedPanels = abstractWidget.allowedPanelTargets?.map((target) => {
    const map = {
      top: StagePanelLocation.Top,
      left: StagePanelLocation.Left,
      right: StagePanelLocation.Right,
      bottom: StagePanelLocation.Bottom
    };
    return map[target];
  });
  const icon = fromAbstractIcon(
    abstractWidget.icon,
    abstractWidget.internalData
  );
  widget2 = {
    ...abstractWidget,
    id: abstractWidget.id ?? "",
    content: abstractWidget.getWidgetContent(),
    allowedPanels,
    badge: abstractWidget.badgeType,
    canFloat: abstractWidget.isFloatingStateSupported && {
      containerId: abstractWidget.floatingContainerId,
      defaultPosition: abstractWidget.defaultFloatingPosition,
      defaultSize: abstractWidget.defaultFloatingSize,
      hideWithUi: abstractWidget.hideWithUiWhenFloating,
      isResizable: abstractWidget.isFloatingStateWindowResizable
    },
    icon
  };
  setOriginalData(widget2, abstractWidget);
  return widget2;
}
function fromAbstractStagePanelLocation(location) {
  switch (location) {
    case AbstractStagePanelLocation.Left:
      return StagePanelLocation.Left;
    case AbstractStagePanelLocation.Top:
      return StagePanelLocation.Top;
    case AbstractStagePanelLocation.TopMost:
      return StagePanelLocation.Top;
    case AbstractStagePanelLocation.Bottom:
      return StagePanelLocation.Bottom;
    case AbstractStagePanelLocation.BottomMost:
      return StagePanelLocation.Bottom;
  }
  return StagePanelLocation.Right;
}
function toAbstractStagePanelLocation(location) {
  switch (location) {
    case StagePanelLocation.Left:
      return [AbstractStagePanelLocation.Left];
    case StagePanelLocation.Top:
      return [
        AbstractStagePanelLocation.Top,
        AbstractStagePanelLocation.TopMost
      ];
    case StagePanelLocation.Bottom:
      return [
        AbstractStagePanelLocation.Bottom,
        AbstractStagePanelLocation.BottomMost
      ];
  }
  return [AbstractStagePanelLocation.Right];
}
function fromAbstractStagePanelSection(section) {
  switch (section) {
    case AbstractStagePanelSection.End:
      return StagePanelSection.End;
  }
  return StagePanelSection.Start;
}
function toAbstractStagePanelSection(section) {
  switch (section) {
    case StagePanelSection.End:
      return [AbstractStagePanelSection.End];
  }
  return [AbstractStagePanelSection.Start, AbstractStagePanelSection.Middle];
}
function fromAbstractIcon(icon, internalData) {
  if (!icon) return void 0;
  const iconString = ConditionalStringValue.getValue(icon);
  if (!iconString) return void 0;
  if (iconString === IconHelper.reactIconKey && internalData)
    return internalData.get(IconHelper.reactIconKey);
  return iconString;
}
function getOriginalData(obj) {
  const originalData = obj[originalDataSymbol];
  if (!originalData) return void 0;
  return originalData;
}
function setOriginalData(obj, data) {
  obj[originalDataSymbol] = data;
}
function createGetPropertyAdapter(provider) {
  return {
    ...provider,
    provideBackstageItems: () => {
      return provider.getBackstageItems?.() ?? provider.provideBackstageItems?.() ?? [];
    },
    provideStatusBarItems: (stageId, stageUsage) => {
      return provider.getStatusBarItems?.() ?? provider.provideStatusBarItems?.(stageId, stageUsage) ?? [];
    },
    provideToolbarItems: (stageId, stageUsage, usage, orientation) => {
      if (provider.getToolbarItems) {
        return provider.getToolbarItems().filter((item) => {
          const layout = item.layouts?.standard;
          if (!layout) return false;
          return layout.usage === usage && layout.orientation === orientation;
        });
      }
      return provider.provideToolbarItems?.(
        stageId,
        stageUsage,
        usage,
        orientation
      ) ?? [];
    },
    provideWidgets: (stageId, stageUsage, location, section) => {
      if (provider.getWidgets) {
        return provider.getWidgets().filter((item) => {
          const layout = item.layouts?.standard;
          if (!layout) return false;
          return layout.location === location && layout.section === section;
        });
      }
      return provider.provideWidgets?.(stageId, stageUsage, location, section) ?? [];
    }
  };
}
class UiItemsManager {
  static _registeredUiItemsProviders = /* @__PURE__ */ new Map();
  static _onUiProviderRegisteredEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  static _abstractAdapter = createAbstractUiItemsManagerAdapter();
  /** For use in unit testing
   * @internal
   */
  static useAbstractAdapter(useAbstractAdapter) {
    if (useAbstractAdapter) {
      this._abstractAdapter = createAbstractUiItemsManagerAdapter();
    } else {
      this._abstractAdapter = void 0;
    }
  }
  /** For use in unit testing
   * @internal */
  static clearAllProviders() {
    if (this._abstractAdapter) {
      this._abstractAdapter.clearAllProviders();
    }
    UiItemsManager._registeredUiItemsProviders.clear();
  }
  /** Event raised any time a UiProvider is registered or unregistered. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static get onUiProviderRegisteredEvent() {
    if (this._abstractAdapter)
      return this._abstractAdapter.onUiProviderRegisteredEvent;
    return this._onUiProviderRegisteredEvent;
  }
  /** Return number of registered UiProvider. */
  static get registeredProviderIds() {
    if (this._abstractAdapter)
      return this._abstractAdapter.registeredProviderIds;
    const ids = [...UiItemsManager._registeredUiItemsProviders.keys()];
    return ids;
  }
  /** Return true if there is any registered UiProvider. */
  static get hasRegisteredProviders() {
    if (this._abstractAdapter)
      return this._abstractAdapter.hasRegisteredProviders;
    return this._registeredUiItemsProviders.size > 0;
  }
  /**
   * Retrieves a previously loaded UiItemsProvider.
   * @param providerId id of the UiItemsProvider to get
   */
  static getUiItemsProvider(providerId) {
    if (this._abstractAdapter)
      return this._abstractAdapter.getUiItemsProvider(providerId);
    return UiItemsManager._registeredUiItemsProviders.get(providerId)?.provider;
  }
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static sendRegisteredEvent(args) {
    UiItemsManager.onUiProviderRegisteredEvent.raiseEvent(args);
  }
  /**
   * Registers an {@link UiItemsProvider}.
   * Optional overrides can be specified to limit when the provider is allowed to provide items.
   */
  static register(uiProvider, overrides) {
    const providerId = overrides?.providerId ?? uiProvider.id;
    if (UiItemsManager.getUiItemsProvider(providerId)) {
      Logger.logInfo(
        UiFramework.loggerCategory("UiItemsManager"),
        `UiItemsProvider '${providerId}' is already registered`
      );
      return;
    }
    UiItemsManager._registeredUiItemsProviders.set(providerId, {
      provider: uiProvider,
      overrides
    });
    if (this._abstractAdapter) {
      return this._abstractAdapter.register(uiProvider, overrides);
    }
    Logger.logInfo(
      UiFramework.loggerCategory("UiItemsManager"),
      `UiItemsProvider '${uiProvider.id}' registered as '${providerId}'`
    );
    UiItemsManager.sendRegisteredEvent({ providerId });
  }
  /** Unregisters a specific {@link UiItemsProvider}. */
  static unregister(providerId) {
    const provider = UiItemsManager.getUiItemsProvider(providerId);
    if (!provider) return;
    UiItemsManager._registeredUiItemsProviders.delete(providerId);
    if (this._abstractAdapter) {
      this._abstractAdapter.unregister(providerId);
    }
    provider.onUnregister?.();
    Logger.logInfo(
      UiFramework.loggerCategory("UiItemsManager"),
      `UiItemsProvider '${providerId}' unregistered`
    );
    UiItemsManager.sendRegisteredEvent({ providerId });
  }
  static allowItemsFromProvider(entry, stageId, stageUsage) {
    const overrides = entry.overrides;
    if (void 0 !== stageId && overrides?.stageIds && !overrides.stageIds.some((value) => value === stageId))
      return false;
    if (void 0 !== stageUsage && overrides?.stageUsages && !overrides.stageUsages.some((value) => value === stageUsage))
      return false;
    return true;
  }
  /** Returns registered toolbar items configured for the standard layout that match the specified frontstage id and usage.
   * @note Items registered in `UiItemsManager` of `@itwin/appui-abstract` are returned by this method.
   * @note Items returned by {@link UiItemsProvider.provideToolbarItems} are returned by this method.
   */
  static getToolbarButtonItems(stageId, stageUsage, usage, orientation) {
    if (this._abstractAdapter) {
      return this._abstractAdapter.getToolbarButtonItems(
        stageId,
        stageUsage,
        usage,
        orientation
      );
    }
    const items = [];
    UiItemsManager._registeredUiItemsProviders.forEach((entry) => {
      if (!this.allowItemsFromProvider(entry, stageId, stageUsage)) return;
      const uiProvider = entry.provider;
      const providerId = entry.overrides?.providerId ?? uiProvider.id;
      const provider = createGetPropertyAdapter(uiProvider);
      const providerItems = provider.provideToolbarItems(stageId, stageUsage, usage, orientation).map((item) => ({
        ...item,
        providerId
      }));
      items.push(...providerItems);
    });
    return getUniqueItems(items);
  }
  /** Returns registered toolbar items that match the specified frontstage id and usage.
   * @note Items registered in `UiItemsManager` of `@itwin/appui-abstract` are not returned by this method.
   * @note Items returned by {@link UiItemsProvider.provideToolbarItems} are not returned by this method.
   */
  static getToolbarItems(stageId, stageUsage) {
    const items = [];
    UiItemsManager._registeredUiItemsProviders.forEach((entry) => {
      const uiProvider = entry.provider;
      const providerId = entry.overrides?.providerId ?? uiProvider.id;
      if (!this.allowItemsFromProvider(entry, stageId, stageUsage)) return;
      const providerItems = uiProvider.getToolbarItems?.().map((item) => ({
        ...item,
        providerId
      })) ?? [];
      items.push(...providerItems);
    });
    return getUniqueItems(items);
  }
  /** Returns registered status bar items that match the specified frontstage id and usage.
   * @note Items registered in `UiItemsManager` of `@itwin/appui-abstract` are returned by this method.
   * @note Items returned by {@link UiItemsProvider.provideStatusBarItems} are returned by this method.
   */
  static getStatusBarItems(stageId, stageUsage) {
    if (this._abstractAdapter) {
      return this._abstractAdapter.getStatusBarItems(stageId, stageUsage);
    }
    const items = [];
    UiItemsManager._registeredUiItemsProviders.forEach((entry) => {
      if (!this.allowItemsFromProvider(entry, stageId, stageUsage)) return;
      const uiProvider = entry.provider;
      const providerId = entry.overrides?.providerId ?? uiProvider.id;
      const provider = createGetPropertyAdapter(uiProvider);
      const providerItems = provider.provideStatusBarItems(stageId, stageUsage).map((item) => ({
        ...item,
        providerId
      }));
      items.push(...providerItems);
    });
    return getUniqueItems(items);
  }
  /** Returns registered backstage items.
   * @note Items registered in `UiItemsManager` of `@itwin/appui-abstract` are returned by this method.
   * @note Items returned by {@link UiItemsProvider.provideBackstageItems} are returned by this method.
   */
  static getBackstageItems() {
    if (this._abstractAdapter) {
      return this._abstractAdapter.getBackstageItems();
    }
    const items = [];
    UiItemsManager._registeredUiItemsProviders.forEach((entry) => {
      const uiProvider = entry.provider;
      const providerId = entry.overrides?.providerId ?? uiProvider.id;
      const provider = createGetPropertyAdapter(uiProvider);
      const providerItems = provider.provideBackstageItems().map((item) => ({
        ...item,
        providerId
      }));
      items.push(...providerItems);
    });
    return getUniqueItems(items);
  }
  static getWidgets(stageId, stageUsage, location, section) {
    const items = [];
    if (location === void 0) {
      UiItemsManager._registeredUiItemsProviders.forEach((entry) => {
        const uiProvider = entry.provider;
        const providerId = entry.overrides?.providerId ?? uiProvider.id;
        if (!this.allowItemsFromProvider(entry, stageId, stageUsage)) return;
        const providerItems = uiProvider.getWidgets?.().map((item) => ({
          ...item,
          providerId
        })) ?? [];
        items.push(...providerItems);
      });
      return getUniqueItems(items);
    }
    if (this._abstractAdapter) {
      const abstractWidgets = this._abstractAdapter.getWidgets(
        stageId,
        stageUsage,
        location,
        section
      );
      items.push(...abstractWidgets);
    }
    UiItemsManager._registeredUiItemsProviders.forEach((entry) => {
      const uiProvider = entry.provider;
      const providerId = entry.overrides?.providerId ?? uiProvider.id;
      if (!this.allowItemsFromProvider(entry, stageId, stageUsage)) return;
      const provider = createGetPropertyAdapter(uiProvider);
      const providerItems = provider.provideWidgets(stageId, stageUsage, location, section).map((item) => ({
        ...item,
        providerId
      }));
      items.push(...providerItems);
    });
    return getUniqueItems(items);
  }
}
function getUniqueItems(items) {
  const uniqueItems = [];
  items.forEach((item) => {
    if (uniqueItems.find((existingItem) => item.id === existingItem.id)) return;
    uniqueItems.push(item);
  });
  return uniqueItems;
}
function isProviderItem(item) {
  return "providerId" in item;
}
function PopoutThemeProvider({
  children
}) {
  const tabId = reactExports.useContext(TabIdContext);
  const layoutStore = useLayoutStore();
  const stateRef = reactExports.useRef(layoutStore.getState());
  reactExports.useEffect(
    () => layoutStore.subscribe((state) => stateRef.current = state),
    [layoutStore]
  );
  const portalContainer = usePopoutsStore((state) => {
    if (!tabId) return void 0;
    const tabLocation = getTabLocation(stateRef.current, tabId);
    if (!tabLocation) return void 0;
    if (!isPopoutTabLocation(tabLocation)) return void 0;
    const popout = state.popouts[tabLocation.popoutWidgetId];
    if (!popout) return void 0;
    const container = popout.ownerDocument.querySelector(
      ".uifw-childwindow-internalChildWindowManager_portalContainer"
    );
    return container ?? void 0;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ThemeProvider,
    {
      portalContainer,
      className: "uifw-preview-reparentPopoutWidgets-popoutThemeProvider",
      children
    }
  );
}
PopoutThemeProvider.__docgenInfo = { "description": "Theme provider is required to open floating/popover elements in a popout widget window (instead of a main window).\n@note iTwinUI v2 `ThemeProvider` is not used because of https://github.com/iTwin/appui/issues/612\n@internal", "methods": [], "displayName": "PopoutThemeProvider" };
function WidgetFallback() {
  const { translate } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { role: "alert", style: { position: "relative", minHeight: 400 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    NonIdealState,
    {
      svg: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgError, {}),
      heading: translate("widget.errorMessage.unknownError")
    }
  ) });
}
function WidgetContent() {
  const widget2 = useWidgetDef();
  const itemId = widget2?.id ?? widget2?.label ?? "unknown";
  const onSave = reactExports.useCallback(() => {
    widget2?.saveTransientState();
  }, [widget2]);
  const onRestore = reactExports.useCallback(() => {
    widget2?.restoreTransientState();
  }, [widget2]);
  useTransientState(onSave, onRestore);
  const providerId = widget2?.initialConfig && isProviderItem(widget2?.initialConfig) ? widget2?.initialConfig.providerId : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PopoutThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollableWidgetContent, { itemId, providerId, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { FallbackComponent: WidgetFallback, children: widget2?.reactNode }) }) });
}
function useWidgetDef() {
  const frontstage = useActiveFrontstageDef();
  const tabId = reactExports.useContext(TabIdContext);
  const [widgetDef, setWidgetDef] = reactExports.useState(
    () => frontstage?.findWidgetDef(tabId)
  );
  const [prevTabId, setPrevTabId] = reactExports.useState(tabId);
  if (prevTabId !== tabId) {
    setPrevTabId(tabId);
    setWidgetDef(frontstage?.findWidgetDef(tabId));
  }
  reactExports.useEffect(() => {
    return UiItemsManager.onUiProviderRegisteredEvent.addListener(() => {
      setWidgetDef(frontstage?.findWidgetDef(tabId));
    });
  }, [frontstage, tabId]);
  return widgetDef?.id === tabId ? widgetDef : void 0;
}
WidgetFallback.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "WidgetFallback" };
WidgetContent.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "WidgetContent" };
function ChildWindowWidget({
  widgetContainerId,
  widgetDef
}) {
  const reparent = useReparentPopoutWidget(widgetDef.id);
  if (reparent) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ReparentedPopoutWidget, { widgetId: widgetContainerId });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "uifw-popout-widget-filled-container",
      "data-widget-id": widgetContainerId,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { FallbackComponent: WidgetFallback, children: widgetDef.reactNode })
    }
  );
}
ChildWindowWidget.__docgenInfo = { "description": "Component used to wrap a widget for use in a child window.\n@internal", "methods": [], "displayName": "ChildWindowWidget", "props": { "widgetContainerId": { "required": true, "tsType": { "name": "string" }, "description": "" }, "widgetDef": { "required": true, "tsType": { "name": "WidgetDef" }, "description": "" } } };
class TimeTracker {
  _firstActiveTimestamp = 0;
  _idleStartTimestamp = 0;
  _lastActiveTimestamp = 0;
  _totalIdleTime = 0;
  _idleCount = 0;
  _idleTimeout = 5e3;
  _totalTime = 0;
  _idleTime = 0;
  /** Starts time tracking
   */
  startTiming() {
    this._totalIdleTime = 0;
    this._idleStartTimestamp = 0;
    this._idleCount = 0;
    this._totalTime = 0;
    this._idleTime = 0;
    this._firstActiveTimestamp = Date.now();
    this._lastActiveTimestamp = this._firstActiveTimestamp;
    InternalConfigurableUiManager.onUiIntervalEvent.addListener(
      this._idleTimeCounter
    );
    InternalConfigurableUiManager.onUiActivityEvent.addListener(
      this._trackActivity
    );
  }
  /** Stops time tracking
   */
  stopTiming() {
    InternalConfigurableUiManager.onUiIntervalEvent.removeListener(
      this._idleTimeCounter
    );
    InternalConfigurableUiManager.onUiActivityEvent.removeListener(
      this._trackActivity
    );
    this._totalTime = Date.now() - this._firstActiveTimestamp;
    this._idleTime = this._totalIdleTime + this._idleCount * this._idleTimeout;
  }
  /** Gets engagement time in seconds
   */
  getEngagementTimeSeconds() {
    return (this._totalTime - this._idleTime) / 1e3;
  }
  /** Gets total time in seconds
   */
  getTotalTimeSeconds() {
    return this._totalTime / 1e3;
  }
  /** Gets idle time in seconds
   */
  getIdleTimeSeconds() {
    return this._idleTime / 1e3;
  }
  _idleTimeCounter = (args) => {
    const idleTimeout = args.idleTimeout ?? this._idleTimeout;
    if (this._lastActiveTimestamp > 0 && this._idleStartTimestamp === 0 && Date.now() - this._lastActiveTimestamp >= idleTimeout) {
      this._idleStartTimestamp = Date.now();
      this._idleCount++;
    }
  };
  _trackActivity = () => {
    this._lastActiveTimestamp = Date.now();
    if (this._idleStartTimestamp > 0) {
      const lastIdleTime = this._lastActiveTimestamp - this._idleStartTimestamp;
      this._totalIdleTime += lastIdleTime;
      this._idleStartTimestamp = 0;
    }
  };
}
class ContentGroupProvider {
  /** Allow provider to update any data stored in ContentGroupProps. Typically this may
   * be to remove applicationData entries.
   */
  prepareToSaveProps(contentGroupProps) {
    return contentGroupProps;
  }
  /** Allow provider to update any stored ContentGroupProps be it is to be used to create ContentGroup and layouts.
   * Typically this may be to add applicationData to content entries.
   */
  applyUpdatesToSavedProps(contentGroupProps) {
    return contentGroupProps;
  }
  /** Allow provider to save any content group data before the stage deactivated. */
  async onFrontstageDeactivated() {
  }
}
const CONTENT_DIALOG_ZINDEX_DEFAULT = 2e3;
class InternalContentDialogManager {
  /** Content Dialog Changed Event */
  static onContentDialogChangedEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** @internal */
  static dialogManager = new DialogManagerBase(
    InternalContentDialogManager.onContentDialogChangedEvent
  );
  /** Get the array of modeless dialogs */
  static get dialogs() {
    return InternalContentDialogManager.dialogManager.dialogs;
  }
  static _dialogMap = /* @__PURE__ */ new Map();
  static _idArray = new Array();
  static _topZIndex = CONTENT_DIALOG_ZINDEX_DEFAULT;
  /** Initialize the modeless dialog manager.
   * @internal
   */
  static initialize() {
    InternalContentDialogManager._topZIndex = InternalContentDialogManager.getDialogZIndexDefault();
  }
  static getDialogZIndexDefault() {
    const variable = "--uicore-z-index-view-content-dialog";
    const value = getCssVariableAsNumber(variable);
    if (!isNaN(value)) return value;
    Logger.logError(
      UiFramework.loggerCategory("InternalContentDialogManager"),
      `'${variable}' CSS variable not found`
    );
    return CONTENT_DIALOG_ZINDEX_DEFAULT;
  }
  /** Open a modeless dialog
   * @param dialog The Dialog to open
   * @param id The id of the Dialog to open
   */
  static open(dialog2, id, parentDocument = document) {
    const dialogInfo = InternalContentDialogManager._dialogMap.get(id);
    if (dialogInfo) {
      const message = `Dialog with id of '${id}' already opened`;
      Logger.logInfo(
        UiFramework.loggerCategory("InternalContentDialogManager"),
        `openDialog: ${message}`
      );
      IModelApp.notifications.outputMessage(
        new NotifyMessageDetails(
          OutputMessagePriority.Info,
          message,
          void 0,
          OutputMessageType.Toast
        )
      );
      return;
    }
    InternalContentDialogManager._dialogMap.set(id, {
      reactNode: dialog2,
      zIndex: ++InternalContentDialogManager._topZIndex,
      parentDocument
    });
    InternalContentDialogManager._idArray.push(id);
    InternalContentDialogManager.dialogManager.openDialog(
      dialog2,
      id,
      parentDocument
    );
  }
  /** Close a modeless dialog
   * @param id The id of the Dialog to close.
   */
  static close(id) {
    const dialogInfo = InternalContentDialogManager._dialogMap.get(id);
    if (dialogInfo) {
      InternalContentDialogManager.dialogManager.removeDialog(
        dialogInfo.reactNode
      );
      InternalContentDialogManager._dialogMap.delete(id);
      const index = InternalContentDialogManager._idArray.indexOf(id);
      if (index >= 0) InternalContentDialogManager._idArray.splice(index, 1);
      if (InternalContentDialogManager.active === void 0)
        InternalContentDialogManager._topZIndex = InternalContentDialogManager.getDialogZIndexDefault();
      this.update();
    } else {
      Logger.logError(
        UiFramework.loggerCategory("InternalContentDialogManager"),
        `closeDialog: Could not find dialog with id of '${id}'`
      );
    }
  }
  /** @internal */
  static closeAll() {
    InternalContentDialogManager.dialogManager.closeAll();
    InternalContentDialogManager._dialogMap.clear();
    InternalContentDialogManager._idArray = [];
    InternalContentDialogManager._topZIndex = InternalContentDialogManager.getDialogZIndexDefault();
  }
  /** Update the dialogs */
  static update() {
    InternalContentDialogManager.dialogManager.update();
  }
  /** Get the active modeless dialog */
  static get active() {
    if (InternalContentDialogManager._idArray.length > 0) {
      const id = InternalContentDialogManager._idArray[InternalContentDialogManager._idArray.length - 1];
      const dialogInfo = InternalContentDialogManager._dialogMap.get(id);
      if (dialogInfo) return dialogInfo.reactNode;
    }
    return void 0;
  }
  /** Get the count of modeless dialogs */
  static get count() {
    return InternalContentDialogManager.dialogManager.dialogCount;
  }
  /** Handle a pointer down event on a modeless dialog */
  static handlePointerDownEvent(_event, id, updateFunc) {
    const dialogInfo = InternalContentDialogManager._dialogMap.get(id);
    if (dialogInfo && dialogInfo.reactNode !== InternalContentDialogManager.active) {
      dialogInfo.zIndex = ++InternalContentDialogManager._topZIndex;
      InternalContentDialogManager._idArray.splice(
        InternalContentDialogManager._idArray.indexOf(id),
        1
      );
      InternalContentDialogManager._idArray.push(id);
      updateFunc();
      this.update();
    }
  }
  /** Get the z-index for a modeless dialog */
  static getZIndex(id) {
    let zIndex = InternalContentDialogManager.getDialogZIndexDefault();
    const dialogInfo = InternalContentDialogManager._dialogMap.get(id);
    if (dialogInfo) zIndex = dialogInfo.zIndex;
    return zIndex;
  }
  static getInfo(id) {
    return InternalContentDialogManager._dialogMap.get(id);
  }
}
function addDockedToolSettings(state, tabId, hidden = false) {
  if (state.toolSettings)
    throw new UiError(category, "Tool settings already exist");
  if (!(tabId in state.tabs))
    throw new UiError(category, "Tab does not exist", void 0, () => ({
      tabId
    }));
  const location = getTabLocation(state, tabId);
  if (location)
    throw new UiError(
      category,
      "Tab is already in a widget",
      void 0,
      () => ({ tabId, widgetId: location.widgetId })
    );
  return produce(state, (stateDraft) => {
    stateDraft.toolSettings = {
      tabId,
      type: "docked",
      hidden
    };
  });
}
function addWidgetToolSettings(state, tabId) {
  if (state.toolSettings)
    throw new UiError(category, "Tool settings already exist");
  if (!(tabId in state.tabs))
    throw new UiError(category, "Tab does not exist", void 0, () => ({
      tabId
    }));
  const location = getTabLocation(state, tabId);
  if (!location)
    throw new UiError(category, "Tab is not in a widget", void 0, () => ({
      tabId
    }));
  return produce(state, (stateDraft) => {
    stateDraft.toolSettings = {
      tabId,
      type: "widget"
    };
  });
}
function NineZoneStateReducer(state, action) {
  switch (action.type) {
    case "RESIZE": {
      state = produce(state, (draft) => {
        setSizeProps(draft.size, action.size);
      });
      const nzBounds = Rectangle.createFromSize(action.size);
      for (const id of state.floatingWidgets.allIds) {
        const floatingWidget = state.floatingWidgets.byId[id];
        const bounds = Rectangle.create(floatingWidget.bounds);
        const containedBounds = bounds.containIn(nzBounds);
        state = updateFloatingWidgetState(state, id, {
          bounds: containedBounds.toProps()
        });
      }
      for (const side of panelSides) {
        state = updatePanelState(state, side, (draft) => {
          const size = getPanelSize(
            draft.size,
            side,
            draft.minSize,
            draft.maxSize,
            state.size
          );
          draft.size = size;
        });
      }
      return state;
    }
    case "PANEL_TOGGLE_COLLAPSED": {
      return updatePanelState(state, action.side, (draft) => {
        draft.collapsed = !draft.collapsed;
      });
    }
    case "PANEL_SET_COLLAPSED": {
      return updatePanelState(state, action.side, (draft) => {
        draft.collapsed = action.collapsed;
      });
    }
    case "PANEL_SET_SIZE": {
      const { side, size: preferredSize } = action;
      return updatePanelState(state, side, (draft) => {
        const size = getPanelSize(
          preferredSize,
          draft.side,
          draft.minSize,
          draft.maxSize,
          state.size
        );
        draft.size = size;
      });
    }
    case "PANEL_SET_MIN_SIZE": {
      return updatePanelState(state, action.side, (draft) => {
        const size = getPanelSize(
          draft.size,
          draft.side,
          action.minSize,
          draft.maxSize,
          state.size
        );
        const minSizeInPixels = getPanelPixelSizeFromSpec(
          draft.side,
          state.size,
          action.minSize
        );
        draft.minSize = minSizeInPixels;
        draft.size = size;
      });
    }
    case "PANEL_SET_MAX_SIZE": {
      return updatePanelState(state, action.side, (draft) => {
        const size = getPanelSize(
          draft.size,
          draft.side,
          draft.minSize,
          action.maxSize,
          state.size
        );
        draft.maxSize = action.maxSize;
        draft.size = size;
      });
    }
    case "PANEL_SET_RESIZABLE": {
      return updatePanelState(state, action.side, (draft) => {
        draft.resizable = action.resizable;
      });
    }
    case "PANEL_SET_SPLITTER_VALUE": {
      const splitterPercent = Math.min(Math.max(action.percent, 0), 100);
      return updatePanelState(state, action.side, (draft) => {
        draft.splitterPercent = splitterPercent;
      });
    }
    case "PANEL_TOGGLE_SPAN": {
      const { side } = action;
      return updatePanelState(state, side, (draft) => {
        draft.span = !draft.span;
      });
    }
    case "PANEL_SET_PINNED": {
      return updatePanelState(state, action.side, (draft) => {
        draft.pinned = action.pinned;
      });
    }
    case "PANEL_TOGGLE_PINNED": {
      return updatePanelState(state, action.side, (draft) => {
        draft.pinned = !draft.pinned;
      });
    }
    case "PANEL_INITIALIZE": {
      return updatePanelState(state, action.side, (draft) => {
        const size = getPanelSize(
          action.size,
          draft.side,
          draft.minSize,
          draft.maxSize,
          state.size
        );
        draft.size = size;
      });
    }
    case "PANEL_WIDGET_DRAG_START": {
      const { side, newFloatingWidgetId } = action;
      const panel = state.panels[side];
      const widgetIndex = panel.widgets.indexOf(action.id);
      const widget2 = getWidgetState$1(state, action.id);
      state = removePanelWidget(state, action.id);
      return addFloatingWidget(
        state,
        newFloatingWidgetId,
        widget2.tabs,
        {
          bounds: Rectangle.create(action.bounds).toProps(),
          userSized: action.userSized,
          id: action.newFloatingWidgetId,
          home: {
            side: action.side,
            widgetId: "",
            widgetIndex
          }
        },
        {
          ...widget2,
          minimized: false
        }
      );
    }
    case "WIDGET_DRAG": {
      const { floatingWidgetId, dragBy } = action;
      const floatingWidget = state.floatingWidgets.byId[floatingWidgetId];
      const newBounds = Rectangle.create(floatingWidget.bounds).offset(dragBy);
      return updateFloatingWidgetState(state, floatingWidgetId, {
        bounds: newBounds.toProps()
      });
    }
    case "WIDGET_DRAG_END": {
      const { target, floatingWidgetId } = action;
      const floatingWidget = state.floatingWidgets.byId[floatingWidgetId];
      const draggedWidget = getWidgetState$1(state, floatingWidgetId);
      if (isWindowDropTargetState(target)) {
        const nzBounds = Rectangle.createFromSize(state.size);
        let newBounds = Rectangle.create(floatingWidget.bounds);
        if (draggedWidget.minimized) {
          const containedBounds = newBounds.setHeight(35).containIn(nzBounds);
          newBounds = newBounds.setPosition(containedBounds.topLeft());
        } else {
          newBounds = newBounds.containIn(nzBounds);
        }
        state = updateFloatingWidgetState(state, floatingWidgetId, {
          bounds: newBounds.toProps()
        });
        return floatingWidgetBringToFront(state, floatingWidgetId);
      }
      state = removeFloatingWidget(state, floatingWidgetId);
      if (isTabDropTargetState(target)) {
        state = updateHomeOfToolSettingsWidget(
          state,
          target.widgetId,
          floatingWidget.home
        );
        const targetWidget = getWidgetState$1(state, target.widgetId);
        const tabs2 = [...targetWidget.tabs];
        tabs2.splice(target.tabIndex, 0, ...draggedWidget.tabs);
        state = updateWidgetState(state, target.widgetId, {
          tabs: tabs2,
          activeTabId: draggedWidget.activeTabId
        });
      } else if (isSectionDropTargetState(target)) {
        state = updatePanelState(state, target.side, (draft) => {
          draft.widgets.splice(target.sectionIndex, 0, target.newWidgetId);
          draft.collapsed = false;
        });
        state = addWidgetState(
          state,
          target.newWidgetId,
          draggedWidget.tabs,
          draggedWidget
        );
      } else if (isWidgetDropTargetState(target)) {
        state = updateHomeOfToolSettingsWidget(
          state,
          target.widgetId,
          floatingWidget.home
        );
        const widget2 = getWidgetLocation(state, target.widgetId);
        if (widget2 && isPanelWidgetLocation(widget2)) {
          state = updatePanelState(state, widget2.side, (draft) => {
            draft.collapsed = false;
          });
        }
        const targetWidget = getWidgetState$1(state, target.widgetId);
        const tabs2 = [...targetWidget.tabs];
        tabs2.splice(targetWidget.tabs.length, 0, ...draggedWidget.tabs);
        state = updateWidgetState(state, target.widgetId, {
          tabs: tabs2,
          activeTabId: draggedWidget.activeTabId
        });
      } else {
        const panelSectionId = getWidgetPanelSectionId(target.side, 0);
        state = updatePanelState(state, target.side, (draft) => {
          draft.widgets = [panelSectionId];
          draft.collapsed = false;
        });
        state = addWidgetState(state, panelSectionId, draggedWidget.tabs, {
          ...draggedWidget,
          minimized: false
        });
      }
      return state;
    }
    case "FLOATING_WIDGET_RESIZE": {
      const { resizeBy } = action;
      const widget2 = getWidgetState$1(state, action.id);
      const floatingWidget = state.floatingWidgets.byId[action.id];
      if (!isToolSettingsFloatingWidget(state, action.id)) {
        state = updateFloatingWidgetState(state, action.id, {
          userSized: true
        });
      }
      const minWidth2 = 200;
      const minHeight2 = 120;
      let newBounds = Rectangle.create(floatingWidget.bounds);
      const maxLeft = newBounds.right - minWidth2;
      const maxTop = newBounds.bottom - minHeight2;
      newBounds = newBounds.inset(-resizeBy.left, -resizeBy.top, 0, 0);
      const left = Math.min(maxLeft, newBounds.left);
      const top = Math.min(maxTop, newBounds.top);
      newBounds = new Rectangle(left, top, newBounds.right, newBounds.bottom);
      const minRight = newBounds.left + minWidth2;
      const minBottom = newBounds.top + minHeight2;
      newBounds = newBounds.inset(0, 0, -resizeBy.right, -resizeBy.bottom);
      const right = Math.max(minRight, newBounds.right);
      const bottom = Math.max(minBottom, newBounds.bottom);
      newBounds = new Rectangle(left, top, right, bottom);
      state = updateFloatingWidgetState(state, action.id, {
        bounds: newBounds
      });
      const tab = state.tabs[widget2.activeTabId];
      if (tab.isFloatingWidgetResizable) {
        const size = newBounds.getSize();
        state = updateTabState(state, widget2.activeTabId, (draft) => {
          initSizeProps(draft, "preferredFloatingWidgetSize", size);
          draft.userSized = true;
        });
      }
      return state;
    }
    case "FLOATING_WIDGET_SET_BOUNDS": {
      const nzBounds = Rectangle.createFromSize(state.size);
      const bounds = Rectangle.create(action.bounds).containIn(nzBounds);
      return updateFloatingWidgetState(state, action.id, {
        bounds: bounds.toProps()
      });
    }
    case "FLOATING_WIDGET_CLEAR_USER_SIZED": {
      return produce(state, (draft) => {
        const floatingWidget = draft.floatingWidgets.byId[action.id];
        floatingWidget.userSized = false;
        const widget2 = getWidgetState$1(draft, action.id);
        const tab = draft.tabs[widget2.activeTabId];
        tab.userSized = false;
      });
    }
    case "FLOATING_WIDGET_SET_USER_SIZED": {
      return produce(state, (draft) => {
        const floatingWidget = draft.floatingWidgets.byId[action.id];
        floatingWidget.userSized = action.userSized;
      });
    }
    case "FLOATING_WIDGET_BRING_TO_FRONT": {
      return floatingWidgetBringToFront(state, action.id);
    }
    case "FLOATING_WIDGET_SEND_BACK": {
      const widget2 = getWidgetState$1(state, action.id);
      const sendBackHomeState = getSendBackHomeState(state, action.id);
      if (sendBackHomeState.widgetId) {
        const destinationWidget = state.widgets[sendBackHomeState.widgetId];
        const tabs2 = [...destinationWidget.tabs, ...widget2.tabs];
        state = updateWidgetState(state, destinationWidget.id, {
          tabs: tabs2
        });
        return removeWidget(state, widget2.id);
      }
      const sectionIndex = sendBackHomeState.sectionIndex ?? 0;
      const home = state.floatingWidgets.byId[action.id].home;
      const destinationWidgetId = home.widgetId ? home.widgetId : getWidgetPanelSectionId(home.side, sectionIndex);
      state = removeWidget(state, widget2.id);
      return insertPanelWidget(
        state,
        sendBackHomeState.side,
        destinationWidgetId,
        widget2.tabs,
        sectionIndex
      );
    }
    case "POPOUT_WIDGET_SEND_BACK": {
      const popoutWidget = state.popoutWidgets.byId[action.id];
      const widget2 = getWidgetState$1(state, action.id);
      const home = popoutWidget.home;
      state = removeWidget(state, widget2.id);
      let existingWidget;
      if (home.widgetId in state.widgets) {
        existingWidget = state.widgets[home.widgetId];
      } else if (isPanelWidgetRestoreState(home)) {
        const panel = state.panels[home.side];
        const panelSectionId = getWidgetPanelSectionId(
          home.side,
          home.widgetIndex
        );
        existingWidget = state.widgets[panelSectionId];
        if (!existingWidget && panel.widgets.length >= panel.maxWidgetCount) {
          const sectionIndex = Math.min(
            panel.maxWidgetCount - 1,
            home.widgetIndex
          );
          const sectionId = panel.widgets[sectionIndex];
          existingWidget = state.widgets[sectionId];
        }
      }
      if (existingWidget) {
        const tabs2 = [...existingWidget.tabs, ...widget2.tabs];
        return updateWidgetState(state, existingWidget.id, {
          tabs: tabs2
        });
      }
      if (isPanelWidgetRestoreState(home)) {
        const sectionId = home.widgetId ? home.widgetId : getWidgetPanelSectionId(home.side, home.widgetIndex);
        return insertPanelWidget(
          state,
          home.side,
          sectionId,
          [...widget2.tabs],
          home.widgetIndex
        );
      }
      return addFloatingWidget(
        state,
        home.widgetId,
        widget2.tabs,
        home.floatingWidget
      );
    }
    case "WIDGET_TAB_ADD_TO_WIDGET": {
      const { id, widgetId } = action;
      return addTabToWidget(state, id, widgetId);
    }
    case "WIDGET_TAB_CLICK": {
      const { id, widgetId } = action;
      state = setWidgetActiveTabId(state, widgetId, id);
      return updateWidgetState(state, widgetId, {
        minimized: false
      });
    }
    case "WIDGET_TAB_DOUBLE_CLICK": {
      if (action.floatingWidgetId === void 0) return state;
      const widget2 = getWidgetState$1(state, action.widgetId);
      const active = action.id === widget2.activeTabId;
      if (!active) return setWidgetActiveTabId(state, widget2.id, action.id);
      return updateWidgetState(state, widget2.id, {
        minimized: !widget2.minimized
      });
    }
    case "WIDGET_TAB_DRAG_START": {
      const tabId = action.id;
      let home;
      if (action.floatingWidgetId) {
        const floatingWidget = state.floatingWidgets.byId[action.floatingWidgetId];
        home = floatingWidget.home;
      } else {
        assert(!!action.side);
        const panel = state.panels[action.side];
        const widgetIndex = panel.widgets.indexOf(action.widgetId);
        home = {
          side: action.side,
          widgetId: action.widgetId,
          widgetIndex
        };
      }
      const widget2 = getWidgetState$1(state, action.widgetId);
      const active = action.id === widget2.activeTabId;
      state = produce(state, (draft) => {
        draft.draggedTab = {
          tabId,
          position: Point.create(action.position).toProps(),
          home,
          active
        };
      });
      return removeTabFromWidget(state, tabId);
    }
    case "WIDGET_TAB_DRAG": {
      return produce(state, (draft) => {
        const draggedTab = draft.draggedTab;
        const position = Point.create(draggedTab.position).offset(
          action.dragBy
        );
        setPointProps(draggedTab.position, position);
      });
    }
    case "WIDGET_TAB_DRAG_END": {
      assert(!!state.draggedTab);
      const wasActive = state.draggedTab.active;
      const target = action.target;
      if (isTabDropTargetState(target)) {
        state = updateHomeOfToolSettingsWidget(
          state,
          target.widgetId,
          state.draggedTab.home
        );
        const targetWidget = getWidgetState$1(state, target.widgetId);
        const tabIndex = target.tabIndex;
        const tabs2 = [...targetWidget.tabs];
        tabs2.splice(tabIndex, 0, action.id);
        const activeTabId = wasActive ? action.id : targetWidget.activeTabId;
        state = updateWidgetState(state, targetWidget.id, {
          tabs: tabs2,
          activeTabId
        });
      } else if (isPanelDropTargetState(target)) {
        state = updatePanelState(state, target.side, (draft) => {
          draft.widgets.push(target.newWidgetId);
          draft.collapsed = false;
        });
        state = addWidgetState(state, target.newWidgetId, [action.id]);
      } else if (isSectionDropTargetState(target)) {
        state = updatePanelState(state, target.side, (draft) => {
          draft.widgets.splice(target.sectionIndex, 0, target.newWidgetId);
          draft.collapsed = false;
        });
        state = addWidgetState(state, target.newWidgetId, [action.id]);
      } else if (isWidgetDropTargetState(target)) {
        updateHomeOfToolSettingsWidget(
          state,
          target.widgetId,
          state.draggedTab.home
        );
        const widget2 = getWidgetLocation(state, target.widgetId);
        if (widget2 && isPanelWidgetLocation(widget2)) {
          state = updatePanelState(state, widget2.side, (draft) => {
            draft.collapsed = false;
          });
        }
        const targetWidget = getWidgetState$1(state, target.widgetId);
        const tabIndex = targetWidget.tabs.length;
        const tabs2 = [...targetWidget.tabs];
        tabs2.splice(tabIndex, 0, action.id);
        const activeTabId = wasActive ? action.id : targetWidget.activeTabId;
        state = updateWidgetState(state, targetWidget.id, {
          tabs: tabs2,
          activeTabId
        });
      } else {
        const tab = state.tabs[state.draggedTab.tabId];
        const nzBounds = Rectangle.createFromSize(state.size);
        const bounds = Rectangle.createFromSize(
          tab.preferredFloatingWidgetSize || target.size
        ).offset(state.draggedTab.position);
        const containedBounds = bounds.containIn(nzBounds);
        const userSized = tab.userSized || tab.isFloatingWidgetResizable && !!tab.preferredFloatingWidgetSize;
        state = addFloatingWidget(
          state,
          target.newFloatingWidgetId,
          [action.id],
          {
            bounds: containedBounds,
            home: state.draggedTab.home,
            userSized
          }
        );
      }
      return produce(state, (draft) => {
        draft.draggedTab = void 0;
      });
    }
    case "WIDGET_TAB_POPOUT": {
      const { id, position, size } = action;
      const location = getTabLocation(state, id);
      if (location && isPopoutTabLocation(location)) return state;
      const savedTab = state.savedTabs.byId[id];
      const tab = state.tabs[id];
      let contentHeight = 800;
      let contentWidth = 600;
      if (tab.preferredFloatingWidgetSize) {
        contentWidth = tab.preferredFloatingWidgetSize.width;
        contentHeight = tab.preferredFloatingWidgetSize.height;
      } else {
        const popoutContentContainer = document.getElementById(
          `content-container:${id}`
        );
        if (popoutContentContainer !== null) {
          contentWidth = popoutContentContainer.offsetWidth + 20;
          contentHeight = popoutContentContainer.offsetHeight + 20;
        }
      }
      let preferredBounds = Rectangle.createFromSize({
        height: contentHeight,
        width: contentWidth
      });
      if (savedTab?.popout) {
        preferredBounds = Rectangle.createFromSize(savedTab.popout.contentSize);
        preferredBounds = preferredBounds.offset(savedTab.popout.position);
      }
      if (size) preferredBounds = preferredBounds.setSize(size);
      if (position) preferredBounds = preferredBounds.setPosition(position);
      const popoutWidgetId = getUniqueId();
      let home;
      if (location && isPanelTabLocation(location)) {
        const panel = state.panels[location.side];
        const widgetIndex = panel.widgets.indexOf(location.widgetId);
        home = {
          side: location.side,
          widgetId: location.widgetId,
          widgetIndex
        };
      } else if (location && isFloatingTabLocation(location)) {
        const floatingWidget = state.floatingWidgets.byId[location.floatingWidgetId];
        home = {
          widgetId: floatingWidget.id,
          floatingWidget
        };
      }
      state = removeTabFromWidget(state, id);
      return addPopoutWidget(state, popoutWidgetId, [id], {
        bounds: preferredBounds.toProps(),
        home
      });
    }
    case "WIDGET_TAB_HIDE": {
      return hideTab(state, action.id);
    }
    case "WIDGET_TAB_REMOVE": {
      state = hideTab(state, action.id);
      return removeTab(state, action.id);
    }
    case "WIDGET_TAB_SET_LABEL": {
      return updateTabState(state, action.id, (draft) => {
        draft.label = action.label;
      });
    }
    case "WIDGET_TAB_OPEN": {
      return openWidgetTab(state, action.id);
    }
    case "WIDGET_TAB_CLOSE": {
      const { id } = action;
      if (state.toolSettings?.tabId === id && state.toolSettings.type === "docked") {
        return state;
      }
      let location;
      [state, location] = unhideTab(state, id);
      const widget2 = state.widgets[location.widgetId];
      if (isFloatingTabLocation(location) && id === widget2.activeTabId) {
        state = updateWidgetState(state, widget2.id, {
          minimized: true
        });
      }
      return state;
    }
    case "WIDGET_TAB_FLOAT": {
      const { id, position, size } = action;
      let location;
      [state, location] = unhideTab(state, id);
      if (isFloatingTabLocation(location)) return state;
      const tab = state.tabs[id];
      const preferredSize = size ?? tab.preferredFloatingWidgetSize ?? { height: 400, width: 400 };
      const preferredPosition = position ?? { x: 50, y: 100 };
      const preferredBounds = Rectangle.createFromSize(preferredSize).offset(preferredPosition);
      const nzBounds = Rectangle.createFromSize(state.size);
      const containedBounds = preferredBounds.containIn(nzBounds);
      const userSized = tab.userSized || tab.isFloatingWidgetResizable && !!tab.preferredFloatingWidgetSize;
      if (isPanelTabLocation(location)) {
        const panel = state.panels[location.side];
        const widgetIndex = panel.widgets.indexOf(location.widgetId);
        state = updateTabState(state, id, (draft) => {
          initSizeProps(draft, "preferredFloatingWidgetSize", preferredSize);
        });
        state = removeTabFromWidget(state, id);
        state = addFloatingWidget(state, id, [id], {
          bounds: containedBounds,
          home: {
            side: location.side,
            widgetId: location.widgetId,
            widgetIndex
          },
          userSized
        });
      } else {
        const popoutWidgetId = location.popoutWidgetId;
        const popoutWidget = state.popoutWidgets.byId[popoutWidgetId];
        const widget2 = state.widgets[popoutWidgetId];
        state = removePopoutWidget(state, popoutWidgetId);
        const bounds = popoutWidget.bounds;
        const home = popoutWidget.home;
        state = addFloatingWidget(
          state,
          popoutWidgetId,
          [id],
          {
            bounds,
            home: isPanelWidgetRestoreState(home) ? home : home.floatingWidget.home
          },
          widget2
        );
      }
      const isToolSettings = state.toolSettings?.tabId === id;
      if (isToolSettings) {
        state = produce(state, (draft) => {
          assert(!!draft.toolSettings);
          draft.toolSettings.type = "widget";
        });
      }
      return state;
    }
    case "WIDGET_TAB_SET_POPOUT_BOUNDS": {
      return updateSavedTabState(state, action.id, (draft) => {
        draft.popout = {
          position: action.position,
          contentSize: action.contentSize,
          size: action.size
        };
      });
    }
    case "WIDGET_TAB_SHOW": {
      return showWidgetTab(state, action.id);
    }
    case "WIDGET_TAB_UNLOAD": {
      state = hideTab(state, action.id);
      return updateTabState(state, action.id, (draft) => {
        draft.unloaded = true;
      });
    }
    case "WIDGET_TAB_EXPAND": {
      state = showWidgetTab(state, action.id);
      const location = getTabLocation(state, action.id);
      if (location && isPanelTabLocation(location)) {
        state = updatePanelState(state, location.side, (draft) => {
          draft.splitterPercent = draft.widgets.findIndex((wId) => wId === location.widgetId) === 0 ? 100 : 0;
        });
      }
      return state;
    }
    case "WIDGET_TAB_UPDATE": {
      return updateTabState(state, action.id, (draft) => {
        for (const [key, val] of Object.entries(action.overrides)) {
          draft[key] = val;
        }
      });
    }
    case "TOOL_SETTINGS_ADD_DOCKED": {
      state = addTab(state, action.id, action.overrides);
      return addDockedToolSettings(state, action.id);
    }
    case "TOOL_SETTINGS_ADD_WIDGET": {
      return addWidgetToolSettings(state, action.id);
    }
    case "TOOL_SETTINGS_DRAG_START": {
      if (!state.toolSettings) return state;
      if (state.toolSettings.type === "widget") return state;
      const { newFloatingWidgetId } = action;
      const tabId = state.toolSettings.tabId;
      const tab = state.tabs[tabId];
      const size = tab.preferredFloatingWidgetSize || {
        height: 200,
        width: 300
      };
      state = addFloatingWidget(state, newFloatingWidgetId, [tabId], {
        bounds: Rectangle.createFromSize(size).toProps()
      });
      return produce(state, (draft) => {
        assert(!!draft.toolSettings);
        draft.toolSettings.type = "widget";
      });
    }
    case "TOOL_SETTINGS_DOCK": {
      if (!state.toolSettings) return state;
      if (state.toolSettings.type === "docked") return state;
      state = removeTabFromWidget(state, state.toolSettings.tabId);
      return produce(state, (draft) => {
        assert(!!draft.toolSettings);
        draft.toolSettings.type = "docked";
      });
    }
    case "WIDGET_DEF_ADD": {
      state = addTab(state, action.id, action.overrides);
      const savedTab = state.savedTabs.byId[action.id];
      if (savedTab) {
        return addRemovedTab(state, action.id);
      }
      if (action.location === "floating") {
        if (action.floatingWidget.id in state.widgets) {
          return addTabToWidget(state, action.id, action.floatingWidget.id);
        }
        const size = action.overrides?.preferredFloatingWidgetSize ?? {
          height: 200,
          width: 300
        };
        const position = action.floatingWidget.preferredPosition ?? {
          x: (state.size.width - size.width) / 2,
          y: (state.size.height - size.height) / 2
        };
        const nzBounds = Rectangle.createFromSize(state.size);
        const bounds = Rectangle.createFromSize(size).offset(position);
        const containedBounds = bounds.containIn(nzBounds);
        const userSized = !!action.overrides?.preferredFloatingWidgetSize;
        return addFloatingWidget(state, action.floatingWidget.id, [action.id], {
          bounds: containedBounds.toProps(),
          home: {
            side: action.panelSection.side,
            widgetId: action.panelSection.id,
            widgetIndex: 0
          },
          userSized
        });
      }
      return addTabToPanelSection(state, action.id, action.panelSection);
    }
  }
  return state;
}
function openWidgetTab(state, id) {
  if (state.toolSettings?.tabId === id && state.toolSettings.type === "docked") {
    return produce(state, (draft) => {
      assert(draft.toolSettings.type === "docked");
      draft.toolSettings.hidden = false;
    });
  }
  let location;
  [state, location] = unhideTab(state, id);
  return produce(state, (draft) => {
    const widget2 = draft.widgets[location.widgetId];
    widget2.minimized = false;
    widget2.activeTabId = id;
    if (isPanelTabLocation(location)) {
      const panel = draft.panels[location.side];
      panel.collapsed = false;
      if (void 0 === panel.size || 0 === panel.size) {
        panel.size = panel.minSize ?? 200;
      }
    }
  });
}
function showWidgetTab(state, id) {
  state = openWidgetTab(state, id);
  const location = getTabLocation(state, id);
  if (!location) return state;
  state = updateWidgetState(state, location.widgetId, {
    activeTabId: id,
    minimized: false
  });
  if (isPanelTabLocation(location)) {
    state = updatePanelState(state, location.side, (draft) => {
      draft.collapsed = false;
    });
  }
  if (isFloatingTabLocation(location)) {
    state = floatingWidgetBringToFront(state, location.floatingWidgetId);
  }
  return state;
}
function unhideTab(state, id) {
  let location = getTabLocation(state, id);
  if (!location) {
    state = addRemovedTab(state, id);
    location = getTabLocation(state, id);
  }
  state = updateTabState(state, id, (draft) => {
    draft.unloaded = false;
  });
  return [state, location];
}
function hideTab(state, id) {
  state = produce(state, (draft) => {
    if (!draft.toolSettings) return;
    const isToolSettings = draft.toolSettings.tabId === id;
    if (isToolSettings && draft.toolSettings.type === "docked") {
      draft.toolSettings.hidden = true;
    }
  });
  state = updateTabState(state, id, (draft) => {
    draft.unloaded = false;
  });
  const location = getTabLocation(state, id);
  if (!location) return state;
  const widgetId = location.widgetId;
  const tabIndex = state.widgets[widgetId].tabs.indexOf(id);
  if (isFloatingTabLocation(location)) {
    const floatingWidget = state.floatingWidgets.byId[widgetId];
    state = updateSavedTabState(state, id, (draft) => {
      draft.home = {
        widgetId,
        tabIndex,
        floatingWidget
      };
    });
  } else if (isPanelTabLocation(location)) {
    const side = location.side;
    const widgetIndex = state.panels[side].widgets.indexOf(widgetId);
    state = updateSavedTabState(state, id, (draft) => {
      draft.home = {
        widgetId,
        side,
        widgetIndex,
        tabIndex
      };
    });
  }
  return removeTabFromWidget(state, id);
}
function addTabToPanelSection(state, tabId, panelSection) {
  const { side, id, index } = panelSection;
  if (id in state.widgets) {
    return addTabToWidget(state, tabId, id);
  }
  const panel = state.panels[side];
  if (panel.widgets.length < panel.maxWidgetCount) {
    return addPanelWidget(state, side, id, [tabId]);
  }
  const sectionIndex = Math.min(index, panel.widgets.length - 1);
  const existingSectionId = panel.widgets[sectionIndex];
  return addTabToWidget(state, tabId, existingSectionId);
}
class ToolInformation {
  constructor(toolId) {
    this.toolId = toolId;
  }
  _toolUiProvider;
  /** Get the ToolUiProvider registered for this tool */
  get toolUiProvider() {
    if (!this._toolUiProvider) {
      let provider;
      if (UiFramework.controls.isRegistered(this.toolId)) {
        provider = UiFramework.controls.create(
          this.toolId,
          this.toolId
        );
      } else {
        if (UiFramework.toolSettings.useDefaultToolSettingsProvider && this.toolId === UiFramework.toolSettings.toolIdForToolSettings)
          provider = UiFramework.controls.create(
            "DefaultToolSettings",
            this.toolId
          );
      }
      if (provider) {
        if (provider.getType() !== ConfigurableUiControlType.ToolUiProvider) {
          throw new UiError(
            UiFramework.loggerCategory("ToolInformation"),
            `toolUiProvider: toolId '${this.toolId}' is registered to a control that is NOT a ToolUiProvider`
          );
        }
        this._toolUiProvider = provider;
      }
    }
    return this._toolUiProvider;
  }
}
class FrontstageProvider {
}
class InternalFrontstageManager {
  static _initialized = false;
  static _isLoading = false;
  static _activeToolId = "";
  static _activeFrontstageDef;
  static _frontstageDefs = /* @__PURE__ */ new Map();
  static _modalFrontstages = new Array();
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static _frontstageProviders = /* @__PURE__ */ new Map();
  static _frontstages = /* @__PURE__ */ new Map();
  static _nineZoneSize = void 0;
  static _nestedFrontstages = new Array();
  static _activePrimaryFrontstageDef;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static _toolInformationMap = /* @__PURE__ */ new Map();
  /** This should only be called within InternalFrontstageManager and its tests.
   *  @internal
   */
  static ensureToolInformationIsSet(toolId) {
    if (this._toolInformationMap.has(toolId)) return;
    this._toolInformationMap.set(
      toolId,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      new ToolInformation(toolId)
    );
  }
  static _handleSyncToolSettingsPropertiesEvent = (args) => {
    const provider = this.activeToolSettingsProvider;
    if (!provider) return;
    provider.syncToolSettingsProperties(args);
  };
  // pass on ReloadToolSettingsEvent from ToolAdmin so they are treated by UiProviders
  static _handleReloadToolSettingsEvent = () => {
    const provider = this.activeToolSettingsProvider;
    if (!provider) return;
    provider.reloadPropertiesFromTool();
  };
  /** Initializes the InternalFrontstageManager
   * @internal
   */
  static initialize() {
    if (this._initialized) return;
    IModelApp.toolAdmin.activeToolChanged.addListener((tool) => {
      UiFramework.toolSettings.clearToolSettingsData();
      if (tool instanceof InteractiveTool)
        UiFramework.toolSettings.initializeDataForTool(tool);
      this.ensureToolInformationIsSet(tool.toolId);
      UiFramework.frontstages.setActiveTool(tool);
    });
    UiFramework.toolSettings.onSyncToolSettingsProperties.addListener(
      this._handleSyncToolSettingsPropertiesEvent
    );
    UiFramework.toolSettings.onReloadToolSettingsProperties.addListener(
      this._handleReloadToolSettingsEvent
    );
    IModelApp.viewManager.onSelectedViewportChanged.addListener(
      this._handleSelectedViewportChanged
    );
    UiItemsManager.onUiProviderRegisteredEvent.addListener(() => {
      const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
      if (!frontstageDef) return;
      frontstageDef.updateWidgetDefs();
    });
    this._initialized = true;
  }
  /** Handles a Viewport change & sets the active view accordingly */
  static _handleSelectedViewportChanged = (args) => {
    const frontstageDef = this.activeFrontstageDef;
    if (!args.current || !frontstageDef || UiFramework.frontstages.isLoading)
      return;
    frontstageDef.setActiveViewFromViewport(args.current);
  };
  /** @internal */
  static get isInitialized() {
    return this._initialized;
  }
  static set isInitialized(v) {
    this._initialized = v;
  }
  /** Returns true if Frontstage is loading its controls. If false the Frontstage content and controls have been created. */
  static get isLoading() {
    return this._isLoading;
  }
  /** @internal */
  static get nineZoneSize() {
    return this._nineZoneSize;
  }
  static set nineZoneSize(size) {
    this._nineZoneSize = size;
  }
  /** @internal */
  static get frontstageDefs() {
    return this._frontstageDefs;
  }
  /** Get Frontstage Deactivated event. */
  static onFrontstageDeactivatedEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** Get Frontstage Activated event. */
  static onFrontstageActivatedEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** Get Frontstage Activated event. */
  static onFrontstageReadyEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** Get Modal Frontstage Changed event. */
  static onModalFrontstageChangedEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** Get Modal Frontstage Closed event. */
  static onModalFrontstageClosedEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** Get Modal Frontstage Requested Closed event.
   * @alpha
   */
  static onCloseModalFrontstageRequestedEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** Get Tool Activated event. */
  static onToolActivatedEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** Get ToolSetting Reload event. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static onToolSettingsReloadEvent = new BeUiEvent();
  /** Get Tool Panel Opened event.
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static onToolPanelOpenedEvent = new BeUiEvent();
  /** Get Tool Icon Changed event. */
  static onToolIconChangedEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** Get Content Layout Activated event. */
  static onContentLayoutActivatedEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** Get Content Control Activated event. */
  static onContentControlActivatedEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** Get Navigation Aid Activated event. */
  static onNavigationAidActivatedEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** Get Widget State Changed event. */
  static onWidgetStateChangedEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** @internal */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static onWidgetDefsUpdatedEvent = new BeUiEvent();
  /** @internal */
  static onFrontstageNineZoneStateChangedEvent = (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    new BeUiEvent()
  );
  /** @internal */
  static onFrontstageRestoreLayoutEvent = (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    new BeUiEvent()
  );
  /** @internal */
  static onFrontstageWidgetsChangedEvent = (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    new BeUiEvent()
  );
  /** Get panel state changed event.
   * @alpha
   */
  static onPanelStateChangedEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** Get panel pinned changed event.
   * @alpha
   */
  static onPanelPinnedChangedEvent = (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    new BeUiEvent()
  );
  /** @internal */
  static onPanelSizeChangedEvent = new BeUiEvent();
  /** Clears the Frontstage map.
   */
  static clearFrontstageDefs() {
    this._frontstageDefs.clear();
    this._activeFrontstageDef = void 0;
  }
  /** Clears the Frontstage Providers and the defs that may have been created from them.
   */
  static clearFrontstageProviders() {
    this._frontstageProviders.clear();
    UiFramework.frontstages.clearFrontstageDefs();
  }
  /** Clears the Frontstages, Frontstage Providers and the defs that may have been created from them. */
  static clearFrontstages() {
    this._frontstages.clear();
    UiFramework.frontstages.clearFrontstageProviders();
  }
  static getFrontstageKey(frontstageId) {
    return frontstageId;
  }
  /** @internal */
  static clearFrontstageDefsForIModelId(iModelId) {
    if (!iModelId) return;
    const keysToRemove = [];
    this._frontstageDefs.forEach((_, key) => {
      if (key.startsWith(`[${iModelId}]`)) keysToRemove.push(key);
    });
    keysToRemove.forEach((keyValue) => {
      this._frontstageDefs.delete(keyValue);
    });
  }
  static addFrontstageProvider(frontstageProvider) {
    const key = this.getFrontstageKey(frontstageProvider.id);
    key && this._frontstageDefs.delete(key);
    this._frontstageProviders.set(frontstageProvider.id, frontstageProvider);
  }
  static addFrontstage(frontstage) {
    const key = this.getFrontstageKey(frontstage.id);
    key && this._frontstageDefs.delete(key);
    this._frontstages.set(frontstage.id, frontstage);
  }
  /** Find a loaded Frontstage with a given id. If the id is not provided, the active Frontstage is returned.
   * If the FrontstageDef has not been cached by FrontstageDef then it will not be found. See async function
   * `getFrontstageDef` to get a FrontstageDef.
   * @param id  Id of the Frontstage to find
   * @returns  FrontstageDef with a given id if found, or undefined if not found.
   */
  static findFrontstageDef(id) {
    const key = this.getFrontstageKey(id);
    const frontstageDef = this._frontstageDefs.get(key);
    if (frontstageDef instanceof FrontstageDef) return frontstageDef;
    return void 0;
  }
  static findFrontstageProvider(id) {
    if (!id) {
      return void 0;
    }
    const provider = this._frontstageProviders.get(id);
    if (provider) {
      return provider;
    }
    const frontstage = this._frontstages.get(id);
    if (frontstage) {
      return new class extends FrontstageProvider {
        get id() {
          return frontstage?.id ?? "";
        }
        frontstageConfig() {
          return frontstage;
        }
      }();
    }
    return void 0;
  }
  /** Find a loaded Frontstage with a given id. If the id is not provided, the active Frontstage is returned. If
   * no cached FrontstageDef is found but a FrontstageProvider is registered a FrontstageDef will be created, cached, and
   * returned.
   * @param id  Id of the Frontstage to find
   * @returns  FrontstageDef with a given id if found, or undefined if not found.
   */
  static async getFrontstageDef(id) {
    if (!id) return UiFramework.frontstages.activeFrontstageDef;
    let frontstageDef = this.findFrontstageDef(id);
    if (frontstageDef) return frontstageDef;
    const frontstageProvider = this.findFrontstageProvider(id);
    if (frontstageProvider) {
      frontstageDef = await FrontstageDef.create(frontstageProvider);
      if (frontstageDef) {
        const key = this.getFrontstageKey(frontstageDef.id);
        this._frontstageDefs.set(key, frontstageDef);
      }
      return frontstageDef;
    }
    return void 0;
  }
  /** Gets the active FrontstageDef. If a Frontstage is not active, undefined is returned.
   * @return  Active FrontstageDef, or undefined if one is not active.
   */
  static get activeFrontstageDef() {
    return this._activeFrontstageDef;
  }
  /** Gets the Id of the active FrontstageDef. If a Frontstage is not active, blank is returned.
   * @return  Id of the active FrontstageDef, or blank if one is not active.
   */
  static get activeFrontstageId() {
    const activeFrontstage = this._activeFrontstageDef;
    return activeFrontstage ? activeFrontstage.id : "";
  }
  static hasFrontstage(frontstageId) {
    if (this.findFrontstageDef(frontstageId)) return true;
    if (this.findFrontstageProvider(frontstageId)) return true;
    return false;
  }
  /** Sets the active FrontstageDef give the stageId.
   * @param  frontstageId  Id of the Frontstage to set active.
   * @returns A Promise that is fulfilled when the Frontstage is ready.
   */
  static async setActiveFrontstage(frontstageId) {
    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
      frontstageId
    );
    if (!frontstageDef) {
      Logger.logError(
        UiFramework.loggerCategory("InternalFrontstageManager"),
        `setActiveFrontstage: Could not load a FrontstageDef with id of '${frontstageId}'`
      );
      return;
    }
    return UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
  }
  /** Sets the active FrontstageDef.
   * @param  frontstageDef  FrontstageDef to set active.
   * @returns A Promise that is fulfilled when the [[FrontstageDef]] is ready.
   */
  static async setActiveFrontstageDef(frontstageDef) {
    if (this._activeFrontstageDef === frontstageDef) return;
    this._isLoading = true;
    const deactivatedFrontstageDef = this._activeFrontstageDef;
    if (deactivatedFrontstageDef) {
      await deactivatedFrontstageDef.onDeactivated();
      const timeTracker = deactivatedFrontstageDef.timeTracker;
      UiFramework.frontstages.onFrontstageDeactivatedEvent.emit({
        deactivatedFrontstageDef,
        activatedFrontstageDef: frontstageDef,
        totalTime: timeTracker.getTotalTimeSeconds(),
        engagementTime: timeTracker.getEngagementTimeSeconds(),
        idleTime: timeTracker.getIdleTimeSeconds()
      });
    }
    this._activeFrontstageDef = frontstageDef;
    if (frontstageDef) {
      await frontstageDef.onActivated();
      UiFramework.frontstages.onFrontstageActivatedEvent.emit({
        activatedFrontstageDef: frontstageDef,
        deactivatedFrontstageDef
      });
      await frontstageDef.waitUntilReady();
      this._isLoading = false;
      frontstageDef.onFrontstageReady();
      UiFramework.frontstages.onFrontstageReadyEvent.emit({ frontstageDef });
      UiFramework.visibility.handleFrontstageReady();
      await frontstageDef.setActiveContent();
    }
    this._isLoading = false;
  }
  /** Deactivates the active FrontstageDef.
   */
  static async deactivateFrontstageDef() {
    await UiFramework.frontstages.setActiveFrontstageDef(void 0);
  }
  /** Gets the Id of the active tool. If a tool is not active, blank is returned.
   * @return  Id of the active tool, or blank if one is not active.
   */
  static get activeToolId() {
    return this._activeToolId;
  }
  /** Sets the active tool id */
  static setActiveToolId(toolId) {
    this._activeToolId = toolId;
    const toolSettingsProvider = this.activeToolSettingsProvider;
    if (toolSettingsProvider) toolSettingsProvider.initialize();
    UiFramework.frontstages.onToolActivatedEvent.emit({ toolId });
  }
  /** Sets the active tool */
  static setActiveTool(tool) {
    UiFramework.frontstages.setActiveToolId(tool.toolId);
    UiFramework.frontstages.onToolIconChangedEvent.emit({
      iconSpec: tool.iconSpec
    });
  }
  /** Gets the active tool's [[ToolInformation]] */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static get activeToolInformation() {
    return this._toolInformationMap.get(UiFramework.frontstages.activeToolId);
  }
  /** Gets the Tool Setting React node of the active tool.
   * @return  Tool Setting React node of the active tool, or undefined if there is no active tool or Tool Settings for the active tool.
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static get activeToolSettingsProvider() {
    const activeToolInformation = UiFramework.frontstages.activeToolInformation;
    return activeToolInformation?.toolUiProvider;
  }
  /** Sets the active layout, content group and active content.
   * @param contentLayoutDef  Content layout to make active
   * @param contentGroup  Content Group to make active
   */
  static async setActiveLayout(contentLayoutDef, contentGroup) {
    const activeFrontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (activeFrontstageDef) {
      this._isLoading = false;
      activeFrontstageDef.setContentLayoutAndGroup(
        contentLayoutDef,
        contentGroup
      );
      UiFramework.frontstages.onContentLayoutActivatedEvent.emit({
        contentLayout: contentLayoutDef,
        contentGroup
      });
      await activeFrontstageDef.waitUntilReady();
      this._isLoading = false;
      await activeFrontstageDef.setActiveContent();
    }
  }
  /** Sets the active layout, content group and active content.
   * @param contentGroup  Content Group to make active
   */
  static async setActiveContentGroup(contentGroup) {
    const contentLayoutDef = UiFramework.content.layouts.getForGroup(contentGroup);
    await this.setActiveLayout(contentLayoutDef, contentGroup);
  }
  /** Opens a modal Frontstage. Modal Frontstages can be stacked.
   * @param modalFrontstage  Information about the modal Frontstage
   */
  static openModalFrontstage(modalFrontstage2) {
    this.pushModalFrontstage(modalFrontstage2);
  }
  static pushModalFrontstage(modalFrontstage2) {
    const timeTracker = new TimeTracker();
    timeTracker.startTiming();
    const frontstageItem = {
      modalFrontstage: modalFrontstage2,
      timeTracker
    };
    this._modalFrontstages.push(frontstageItem);
    this.emitModalFrontstageChangedEvent();
  }
  /** Closes the top-most modal Frontstage.
   */
  static closeModalFrontstage() {
    if (this._modalFrontstages.length > 0) {
      const topMostStageItem = this._modalFrontstages[this._modalFrontstages.length - 1];
      if (topMostStageItem.modalFrontstage.notifyCloseRequest)
        UiFramework.frontstages.onCloseModalFrontstageRequestedEvent.emit({
          modalFrontstage: topMostStageItem.modalFrontstage,
          stageCloseFunc: () => this.popModalFrontstage()
        });
      else this.popModalFrontstage();
    }
  }
  static popModalFrontstage() {
    const frontstageItem = this._modalFrontstages.pop();
    if (frontstageItem) {
      const modalFrontstage2 = frontstageItem.modalFrontstage;
      const timeTracker = frontstageItem.timeTracker;
      timeTracker.stopTiming();
      UiFramework.frontstages.onModalFrontstageClosedEvent.emit({
        modalFrontstage: modalFrontstage2,
        totalTime: timeTracker.getTotalTimeSeconds(),
        engagementTime: timeTracker.getEngagementTimeSeconds(),
        idleTime: timeTracker.getIdleTimeSeconds()
      });
    }
    this.emitModalFrontstageChangedEvent();
    UiFramework.visibility.handleFrontstageReady();
  }
  static emitModalFrontstageChangedEvent() {
    UiFramework.frontstages.onModalFrontstageChangedEvent.emit({
      modalFrontstageCount: UiFramework.frontstages.modalFrontstageCount
    });
  }
  /** Updates the top-most modal Frontstage.
   */
  static updateModalFrontstage() {
    this.emitModalFrontstageChangedEvent();
  }
  /** Gets the top-most modal Frontstage.
   * @returns Top-most modal Frontstage, or undefined if there is none.
   */
  static get activeModalFrontstage() {
    if (this._modalFrontstages.length > 0) {
      const frontstageItem = this._modalFrontstages[this._modalFrontstages.length - 1];
      const modalFrontstage2 = frontstageItem.modalFrontstage;
      return modalFrontstage2;
    } else {
      return void 0;
    }
  }
  /** Gets the number of modal Frontstages.
   * @returns Modal Frontstage count
   */
  static get modalFrontstageCount() {
    return this._modalFrontstages.length;
  }
  /** Sets the active Navigation Aid via its Id.
   * @param navigationAidId  Id of the Navigation Aid to set as active
   * @param iModelConnection IModelConnection to query for view data
   */
  static setActiveNavigationAid(navigationAidId, iModelConnection) {
    UiFramework.frontstages.onNavigationAidActivatedEvent.emit({
      navigationAidId,
      iModelConnection
    });
  }
  /** Sets the state of the widget with the given id
   * @param widgetId  Id of the Widget for which to set the state
   * @param state     New state of the widget
   * @returns true if the widget state was set successfully, or false if not.
   */
  static setWidgetState(widgetId, state) {
    const widgetDef = UiFramework.frontstages.findWidget(widgetId);
    if (widgetDef) {
      widgetDef.setWidgetState(state);
      return true;
    } else {
      Logger.logError(
        UiFramework.loggerCategory("InternalFrontstageManager"),
        `setWidgetState: Could not find Widget with id of '${widgetId}'`
      );
    }
    return false;
  }
  /** Finds a widget with the given id in the active frontstage
   * @param widgetId  Id of the Widget to find
   * @returns The WidgetDef with the given id, or undefined if not found.
   */
  static findWidget(widgetId) {
    const activeFrontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!activeFrontstageDef) return void 0;
    return activeFrontstageDef.findWidgetDef(widgetId);
  }
  /** Opens a nested Frontstage. Nested Frontstages can be stacked.
   * @param nestedFrontstage  Information about the nested Frontstage
   */
  static async openNestedFrontstage(nestedFrontstage) {
    if (UiFramework.frontstages.nestedFrontstageCount === 0)
      this._activePrimaryFrontstageDef = this._activeFrontstageDef;
    this.pushNestedFrontstage(nestedFrontstage);
    await UiFramework.frontstages.setActiveFrontstageDef(nestedFrontstage);
  }
  static pushNestedFrontstage(nestedFrontstage) {
    this._nestedFrontstages.push(nestedFrontstage);
  }
  /** Closes the top-most nested Frontstage.
   */
  static async closeNestedFrontstage() {
    this.popNestedFrontstage();
    if (UiFramework.frontstages.nestedFrontstageCount > 0) {
      await UiFramework.frontstages.setActiveFrontstageDef(
        UiFramework.frontstages.activeNestedFrontstage
      );
    } else {
      await UiFramework.frontstages.setActiveFrontstageDef(
        this._activePrimaryFrontstageDef
      );
      this._activePrimaryFrontstageDef = void 0;
    }
  }
  static popNestedFrontstage() {
    this._nestedFrontstages.pop();
  }
  /** Gets the top-most nested Frontstage.
   * @returns Top-most nested Frontstage, or undefined if there is none.
   */
  static get activeNestedFrontstage() {
    if (this._nestedFrontstages.length > 0)
      return this._nestedFrontstages[this._nestedFrontstages.length - 1];
    return void 0;
  }
  /** Gets the number of nested Frontstages.
   * @returns Nested Frontstage count
   */
  static get nestedFrontstageCount() {
    return this._nestedFrontstages.length;
  }
}
var WidgetState = /* @__PURE__ */ ((WidgetState2) => {
  WidgetState2[WidgetState2["Open"] = 0] = "Open";
  WidgetState2[WidgetState2["Closed"] = 1] = "Closed";
  WidgetState2[WidgetState2["Hidden"] = 2] = "Hidden";
  WidgetState2[WidgetState2["Floating"] = 3] = "Floating";
  WidgetState2[WidgetState2["Unloaded"] = 4] = "Unloaded";
  return WidgetState2;
})(WidgetState || {});
function StatusBarPopup(props) {
  const { className, offset, ...other } = props;
  return (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Popup,
      {
        className: classnames("nz-status-bar-popup", className),
        position: RelativePosition.TopLeft,
        showShadow: true,
        ...other,
        showArrow: false
      }
    )
  );
}
StatusBarPopup.__docgenInfo = { "description": "Popup component used in [[StatusBar]] component.\n@beta\n@deprecated in 4.13.0. Use {@link StatusBarPopover} instead.", "methods": [], "displayName": "StatusBarPopup" };
const StatusBarField = reactExports.forwardRef(function StatusBarField2(props, ref) {
  const hasClickAction = !!props.onClick;
  const classNames = classnames(
    "uifw-statusbar-field",
    hasClickAction && "uifw-action",
    props.className
  );
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        className: classNames,
        title: props.title,
        style: props.style,
        onClick: props.onClick,
        ...{
          role: "button",
          tabIndex: -1
        },
        children: props.children
      }
    )
  );
});
StatusBarField.__docgenInfo = { "description": "Field component used in [[StatusBar]] component.\n@beta\n@deprecated in 4.13.0. Use [iTwinUI Button](https://itwinui.bentley.com/docs/button) instead.", "methods": [], "displayName": "StatusBarField", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Field content." }, "onClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Function called when field is clicked." }, "title": { "required": false, "tsType": { "name": "string" }, "description": "Title of a field." } }, "composes": ["CommonProps"] };
function StatusBarIndicator(props) {
  const hasClickAction = !!props.onClick || !!props.popup;
  const [isOpen, setIsOpen] = reactExports.useState(!!props.defaultIsOpen);
  const handleOnIndicatorClick = () => {
    setIsOpen(!isOpen);
    props.onClick?.();
  };
  const target = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatusBarField,
      {
        ref: target,
        className: props.className,
        title: props.title,
        style: props.style,
        onClick: hasClickAction ? handleOnIndicatorClick : void 0,
        children: props.children
      }
    ),
    props.popup && // eslint-disable-next-line @typescript-eslint/no-deprecated
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatusBarPopup,
      {
        target: target.current,
        onClose: () => setIsOpen(false),
        isOpen,
        children: props.popup
      }
    )
  ] });
}
StatusBarIndicator.__docgenInfo = { "description": "General-purpose [[StatusBar]] indicator.\n@beta\n@deprecated in 4.14.0. Use [iTwinUI Button](https://itwinui.bentley.com/docs/button) (or other components) and {@link StatusBarPopover AppUI StatusBarPopover} instead.", "methods": [], "displayName": "StatusBarIndicator", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Indicator content." }, "popup": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Content to display in a popup when indicator is clicked." }, "onClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Function called when indicator is clicked." }, "defaultIsOpen": { "required": false, "tsType": { "name": "boolean" }, "description": "Default state of an indicator popup." }, "title": { "required": false, "tsType": { "name": "string" }, "description": "Title of an indicator." } }, "composes": ["CommonProps"] };
function StatusBarLabelIndicator(props) {
  const { className, iconSpec, label: label2, labelSide, ...other } = props;
  const classNames = classnames(
    "uifw-statusbar-labelIndicator",
    labelSide === StatusBarLabelSide.Right && "uifw-reversed",
    className
  );
  return (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    /* @__PURE__ */ jsxRuntimeExports.jsxs(StatusBarIndicator, { className: classNames, ...other, children: [
      label2 && /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "uifw-label", children: label2 }),
      iconSpec && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$2, { iconSpec })
    ] })
  );
}
StatusBarLabelIndicator.__docgenInfo = { "description": "[[StatusBar]] indicator that shows a label with an icon.\n@beta\n@deprecated in 4.14.0. Use [iTwinUI Label](https://itwinui.bentley.com/docs/typography#label) and {@link Icon AppUI Icon} instead.", "methods": [], "displayName": "StatusBarLabelIndicator", "props": { "iconSpec": { "required": false, "tsType": { "name": "IconSpec" }, "description": "Specification of an icon." }, "label": { "required": false, "tsType": { "name": "string" }, "description": "Indicator label." }, "labelSide": { "required": false, "tsType": { "name": "StatusBarLabelSide" }, "description": "Side to display label." } }, "composes": ["Omit"] };
function ButtonExpandIndicator() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "uifw-statusBar-popup-expandIndicator" });
}
ButtonExpandIndicator.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "ButtonExpandIndicator" };
function StatusBarPopover({
  content,
  middleware,
  ...other
}) {
  const [portalTarget, setPortalTarget] = reactExports.useState(void 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Popover,
    {
      ...other,
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(PopupContext.Provider, { value: portalTarget, children: content }),
      placement: "top-start",
      applyBackground: true,
      middleware: {
        ...middleware,
        offset: 4
      },
      ref: (el) => {
        setPortalTarget(el ?? void 0);
      }
    }
  );
}
((StatusBarPopover2) => {
  function ExpandIndicator2() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonExpandIndicator, {});
  }
  StatusBarPopover2.ExpandIndicator = ExpandIndicator2;
})(StatusBarPopover || (StatusBarPopover = {}));
StatusBarPopover.__docgenInfo = { "description": "Popover component used in `StatusBar` component.\nThis component should wrap the element that triggers the popover.\n@note Add the `StatusBarPopover.ExpandIndicator` to popover trigger buttons.\n@public", "methods": [], "displayName": "StatusBarPopover" };
function StatusBarOverflow(props) {
  const { overflowItems, onResize, ...otherProps } = props;
  const { translate } = useTranslation();
  const roRef = useResizeObserver(onResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    StatusBarPopover,
    {
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "uifw-statusbar-overflow-panel",
          "data-testid": "uifw-statusbar-overflow-panel",
          children: overflowItems
        }
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        IconButton,
        {
          ...otherProps,
          ref: roRef,
          label: translate("statusBar.overflow"),
          styleType: "borderless",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgMore, {})
        }
      )
    }
  );
}
StatusBarOverflow.__docgenInfo = { "description": "Entry point to overflow status bar items of [[StatusBarComposer]] component.\n@internal", "methods": [], "displayName": "StatusBarOverflow", "props": { "onResize": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(w: number) => void", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "w" }], "return": { "name": "void" } } }, "description": "Function called when button is resized." }, "overflowItems": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "ReactReactNode", "raw": "React.ReactNode" }], "raw": "React.ReactNode[]" }, "description": "Fields to be placed in the overflow panel." } }, "composes": ["CommonProps"] };
const SafeAreaContext = reactExports.createContext(
  void 0
);
var SafeAreaInsets = /* @__PURE__ */ ((SafeAreaInsets2) => {
  SafeAreaInsets2[SafeAreaInsets2["Bottom"] = 1] = "Bottom";
  SafeAreaInsets2[SafeAreaInsets2["Left"] = 2] = "Left";
  SafeAreaInsets2[SafeAreaInsets2["Right"] = 4] = "Right";
  SafeAreaInsets2[SafeAreaInsets2["Top"] = 8] = "Top";
  SafeAreaInsets2[SafeAreaInsets2["All"] = 15] = "All";
  return SafeAreaInsets2;
})(SafeAreaInsets || {});
class SafeAreaInsetsHelpers {
  static isBottom(flags) {
    return SafeAreaInsets.Bottom.valueOf() === (flags & SafeAreaInsets.Bottom);
  }
  static isLeft(flags) {
    return SafeAreaInsets.Left.valueOf() === (flags & SafeAreaInsets.Left);
  }
  static isRight(flags) {
    return SafeAreaInsets.Right.valueOf() === (flags & SafeAreaInsets.Right);
  }
  static isTop(flags) {
    return SafeAreaInsets.Top.valueOf() === (flags & SafeAreaInsets.Top);
  }
  static getCssClassNames = (flags) => {
    return {
      "nz-safe-area-bottom": SafeAreaInsetsHelpers.isBottom(flags),
      "nz-safe-area-left": SafeAreaInsetsHelpers.isLeft(flags),
      "nz-safe-area-right": SafeAreaInsetsHelpers.isRight(flags),
      "nz-safe-area-top": SafeAreaInsetsHelpers.isTop(flags)
    };
  };
}
function DockedBar(props) {
  const { className, placement, ...otherProps } = props;
  const divClassName = classnames("uifw-dockedBar", className);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...otherProps, className: divClassName, "data-placement": placement, children: props.children });
}
DockedBar.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "DockedBar", "props": { "placement": { "required": false, "tsType": { "name": "union", "raw": '"top" | "bottom"', "elements": [{ "name": "literal", "value": '"top"' }, { "name": "literal", "value": '"bottom"' }] }, "description": "Placement of the bar." } }, "composes": ["CommonDivProps"] };
function StatusBar(props) {
  const safeAreaInsets = reactExports.useContext(SafeAreaContext);
  const className = classnames(
    "uifw-statusBar",
    safeAreaInsets && SafeAreaInsetsHelpers.getCssClassNames(safeAreaInsets),
    props.className
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DockedBar,
    {
      placement: "bottom",
      className,
      style: props.style,
      onMouseEnter: UiFramework.visibility.handleWidgetMouseEnter,
      children: [
        props.widgetControl?.getReactNode?.() ?? null,
        props.children
      ]
    }
  );
}
function StatusBarSpaceBetween(props) {
  const { className, ...divProps } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Div,
    {
      ...divProps,
      mainClassName: className ? className : "uifw-statusBar-space-between"
    }
  );
}
function StatusBarLeftSection(props) {
  const { className, ...divProps } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Div,
    {
      ...divProps,
      mainClassName: className ? className : "uifw-statusBar-left"
    }
  );
}
function StatusBarCenterSection(props) {
  const { className, ...divProps } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Div,
    {
      ...divProps,
      mainClassName: className ? className : "uifw-statusBar-center"
    }
  );
}
function StatusBarRightSection(props) {
  const { className, ...divProps } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Div,
    {
      ...divProps,
      mainClassName: className ? className : "uifw-statusBar-right"
    }
  );
}
((StatusBar2) => {
  StatusBar2.Field = StatusBarField;
  StatusBar2.Popup = StatusBarPopup;
})(StatusBar || (StatusBar = {}));
StatusBar.__docgenInfo = { "description": "Status Bar React component.\n@public\n@deprecated in 4.14.0. Use {@link StatusBarComposer} instead.", "methods": [], "displayName": "StatusBar", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" }, "widgetControl": { "required": false, "tsType": { "name": "StatusBarWidgetControl" }, "description": "" } }, "composes": ["CommonProps"] };
StatusBarSpaceBetween.__docgenInfo = { "description": "StatusBar With Space Between Items React functional component\n@public", "methods": [], "displayName": "StatusBarSpaceBetween" };
StatusBarLeftSection.__docgenInfo = { "description": "StatusBar Left Section React functional component\n@public", "methods": [], "displayName": "StatusBarLeftSection" };
StatusBarCenterSection.__docgenInfo = { "description": "StatusBar Center Section React functional component\n@public", "methods": [], "displayName": "StatusBarCenterSection" };
StatusBarRightSection.__docgenInfo = { "description": "StatusBar Right Section React functional component\n@public", "methods": [], "displayName": "StatusBarRightSection" };
const isInstance = (args) => {
  return !Array.isArray(args);
};
class StatusBarItemsManager {
  _items = [];
  constructor(items) {
    if (items) this.loadItemsInternal(items, true, false);
  }
  /** Event raised when StatusBar items are changed.
   * @internal
   */
  onItemsChanged = new BeEvent();
  loadItemsInternal(items, processConditions, sendItemChanged) {
    if (processConditions && items) {
      const eventIds = StatusBarItemsManager.getSyncIdsOfInterest(items);
      if (0 !== eventIds.length) {
        const { itemsUpdated, updatedItems } = this.internalRefreshAffectedItems(items, new Set(eventIds));
        if (itemsUpdated) items = updatedItems;
      }
    }
    this._items = items;
    if (sendItemChanged) this.onItemsChanged.raiseEvent({ items });
  }
  /** load items but do not fire onItemsChanged
   * @internal
   */
  loadItems(items) {
    this.loadItemsInternal(items, true, false);
  }
  /** Get an array of the StatusBar items  */
  get items() {
    return this._items;
  }
  set items(items) {
    if (items !== this._items) this.loadItemsInternal(items, true, true);
  }
  add(itemOrItems) {
    let itemsToAdd;
    if (isInstance(itemOrItems)) itemsToAdd = [itemOrItems];
    else {
      itemsToAdd = itemOrItems.filter(
        (itemToAdd, index) => itemOrItems.findIndex((item) => item.id === itemToAdd.id) === index
      );
    }
    itemsToAdd = itemsToAdd.filter(
      (itemToAdd) => this._items.find((item) => item.id === itemToAdd.id) === void 0
    );
    if (itemsToAdd.length === 0) return;
    const items = [...this._items, ...itemsToAdd];
    this.items = items;
  }
  /** Remove StatusBar items based on id */
  remove(itemIdOrItemIds) {
    const items = this._items.filter((item) => {
      return isInstance(itemIdOrItemIds) ? item.id !== itemIdOrItemIds : !itemIdOrItemIds.find((itemId) => itemId === item.id);
    });
    this.items = items;
  }
  /** @internal */
  removeAll() {
    this._items = [];
  }
  static getSyncIdsOfInterest(items) {
    const eventIds = /* @__PURE__ */ new Set();
    items.forEach((item) => {
      for (const [, entry] of Object.entries(item)) {
        if (entry instanceof ConditionalBooleanValue) {
          entry.syncEventIds.forEach(
            (eventId) => eventIds.add(eventId.toLowerCase())
          );
        } else if (entry instanceof ConditionalStringValue) {
          entry.syncEventIds.forEach(
            (eventId) => eventIds.add(eventId.toLowerCase())
          );
        }
      }
    });
    return [...eventIds.values()];
  }
  internalRefreshAffectedItems(items, eventIds) {
    if (0 === eventIds.size) return { itemsUpdated: false, updatedItems: [] };
    let updateRequired = false;
    const newItems = [];
    for (const item of items) {
      const updatedItem = { ...item };
      for (const [, entry] of Object.entries(updatedItem)) {
        if (entry instanceof ConditionalBooleanValue) {
          if (ConditionalBooleanValue.refreshValue(entry, eventIds))
            updateRequired = true;
        } else if (entry instanceof ConditionalStringValue) {
          if (ConditionalStringValue.refreshValue(entry, eventIds))
            updateRequired = true;
        }
      }
      newItems.push(updatedItem);
    }
    return { itemsUpdated: updateRequired, updatedItems: newItems };
  }
  refreshAffectedItems(eventIds) {
    if (0 === eventIds.size) return;
    const { itemsUpdated, updatedItems } = this.internalRefreshAffectedItems(
      this.items,
      eventIds
    );
    if (itemsUpdated) this.loadItemsInternal(updatedItems, false, true);
  }
}
const useDefaultStatusBarItems = (manager) => {
  const [items, setItems] = reactExports.useState(manager.items);
  const isInitialMount = reactExports.useRef(true);
  reactExports.useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else {
      setItems(manager.items);
    }
  }, [manager]);
  reactExports.useEffect(() => {
    return manager.onItemsChanged.addListener((args) => {
      setItems(args.items);
    });
  }, [manager]);
  return items;
};
function useActiveStageId() {
  const [activeStageId, setActiveStageId] = reactExports.useState(
    UiFramework.frontstages.activeFrontstageId
  );
  reactExports.useEffect(() => {
    return UiFramework.frontstages.onFrontstageActivatedEvent.addListener(
      (args) => {
        setActiveStageId(args.activatedFrontstageDef.id);
      }
    );
  }, []);
  return activeStageId;
}
function useAvailableUiItemsProviders() {
  const [uiItemsProviderIds, setUiItemsProviderIds] = reactExports.useState(
    UiItemsManager.registeredProviderIds
  );
  reactExports.useEffect(() => {
    return UiItemsManager.onUiProviderRegisteredEvent.addListener(() => {
      setUiItemsProviderIds(UiItemsManager.registeredProviderIds);
    });
  }, []);
  return uiItemsProviderIds;
}
const useUiItemsProviderStatusBarItems = (manager) => {
  const uiItemProviderIds = useAvailableUiItemsProviders();
  const stageId = useActiveStageId();
  const [items, setItems] = reactExports.useState(manager.items);
  const providersRef = reactExports.useRef("");
  const currentStageRef = reactExports.useRef("");
  reactExports.useEffect(() => {
    const uiProviders = uiItemProviderIds.join("-");
    if (providersRef.current !== uiProviders || currentStageRef.current !== stageId) {
      currentStageRef.current = stageId;
      const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
      if (frontstageDef) {
        providersRef.current = uiProviders;
        const statusBarItems = UiItemsManager.getStatusBarItems(
          stageId,
          frontstageDef.usage
        );
        manager.loadItems(statusBarItems);
        setItems(manager.items);
      }
    }
  }, [manager, uiItemProviderIds, stageId]);
  reactExports.useEffect(() => {
    return manager.onItemsChanged.addListener((args) => {
      setItems(args.items);
    });
  }, [manager]);
  return items;
};
const StatusBarCornerComponentContext = reactExports.createContext(void 0);
StatusBarCornerComponentContext.displayName = "uifw:StatusBarCornerComponentContext";
function getCombinedSectionItemPriority(item) {
  let sectionValue = 0;
  if (item.section === StatusBarSection.Center) sectionValue = 1e5;
  else if (item.section === StatusBarSection.Context) sectionValue = 2e5;
  else if (item.section === StatusBarSection.Right) sectionValue = 3e5;
  return sectionValue + item.itemPriority;
}
function DockedStatusBarItem(props) {
  const ref = useResizeObserver(props.onResize);
  const className = classnames(
    "uifw-statusBar-item-container",
    props.className
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-item-id": props.itemId,
      "data-item-type": "status-bar-item",
      "data-item-location": props.section,
      "data-item-priority": props.itemPriority,
      "data-item-provider-id": props.providerId,
      className,
      ref,
      style: props.style,
      children: props.children
    }
  );
}
function useStatusBarItemSyncEffect(itemsManager, syncIdsOfInterest) {
  reactExports.useEffect(() => {
    return SyncUiEventDispatcher.onSyncUiEvent.addListener((args) => {
      if (0 === syncIdsOfInterest.length) return;
      if (syncIdsOfInterest.some(
        (value) => args.eventIds.has(value.toLowerCase())
      )) {
        itemsManager.refreshAffectedItems(args.eventIds);
      }
    });
  }, [itemsManager, itemsManager.items, syncIdsOfInterest]);
}
function StatusBarLabelItemComponent(props) {
  const label2 = ConditionalStringValue.getValue(props.label);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBarLabelIndicator, { iconSpec: props.icon, label: label2 });
}
function StatusBarActionItemComponent(props) {
  const title = ConditionalStringValue.getValue(props.tooltip);
  return (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatusBarLabelIndicator,
      {
        title,
        onClick: props.execute,
        iconSpec: props.icon
      }
    )
  );
}
function combineItems(stageItems, addonItems) {
  const items = [];
  if (stageItems.length) {
    stageItems.forEach((srcItem) => {
      if (-1 === items.findIndex((item) => item.id === srcItem.id)) {
        items.push(srcItem);
      }
    });
  }
  if (addonItems.length) {
    addonItems.forEach((srcItem) => {
      if (-1 === items.findIndex((item) => item.id === srcItem.id)) {
        items.push(srcItem);
      }
    });
  }
  return items;
}
const sortItems = (items) => {
  const sortedItems = [];
  [
    StatusBarSection.Left,
    StatusBarSection.Center,
    StatusBarSection.Context,
    StatusBarSection.Right
  ].forEach((section) => {
    items.filter((item) => item.section.valueOf() === section.valueOf()).sort((a, b) => a.itemPriority - b.itemPriority).forEach((item) => sortedItems.push(item));
  });
  return sortedItems;
};
function isItemInOverflow(id, overflowItemIds) {
  if (!overflowItemIds || 0 === overflowItemIds.length) return false;
  return !!overflowItemIds.find((value) => value === id);
}
function StatusBarComposer(props) {
  const {
    className,
    style,
    items,
    mainClassName,
    leftClassName,
    centerClassName,
    rightClassName
  } = props;
  const [defaultItemsManager, setDefaultItemsManager] = reactExports.useState(
    () => new StatusBarItemsManager(items)
  );
  const isInitialMount = reactExports.useRef(true);
  reactExports.useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else {
      setDefaultItemsManager(new StatusBarItemsManager(items));
    }
  }, [items]);
  const defaultItems = useDefaultStatusBarItems(defaultItemsManager);
  const syncIdsOfInterest = reactExports.useMemo(
    () => StatusBarItemsManager.getSyncIdsOfInterest(defaultItems),
    [defaultItems]
  );
  useStatusBarItemSyncEffect(defaultItemsManager, syncIdsOfInterest);
  const [addonItemsManager] = reactExports.useState(() => new StatusBarItemsManager());
  const addonItems = useUiItemsProviderStatusBarItems(addonItemsManager);
  const addonSyncIdsOfInterest = reactExports.useMemo(
    () => StatusBarItemsManager.getSyncIdsOfInterest(addonItems),
    [addonItems]
  );
  useStatusBarItemSyncEffect(addonItemsManager, addonSyncIdsOfInterest);
  const statusBarItems = reactExports.useMemo(() => {
    const combinedItems = combineItems(defaultItems, addonItems);
    return sortItems(combinedItems);
  }, [defaultItems, addonItems]);
  const statusBarItemKeys = statusBarItems.map((item) => item.id);
  const [
    overflown,
    handleContainerResize,
    handleOverflowResize,
    getOnEntryResize
  ] = useOverflow$1(statusBarItemKeys);
  const notOverflown = reactExports.useMemo(() => {
    return statusBarItems.filter((item) => !isItemInOverflow(item.id, overflown)).map((item) => item.id);
  }, [overflown, statusBarItems]);
  const getSectionName = (section) => {
    switch (section) {
      case StatusBarSection.Center:
      case StatusBarSection.Stage:
        return "status-bar-center";
      case StatusBarSection.Context:
        return "status-bar-right-start";
      case StatusBarSection.Right:
      case StatusBarSection.Selection:
        return "status-bar-right-end";
      case StatusBarSection.Left:
      case StatusBarSection.Message:
        return "status-bar-left";
    }
  };
  const getComponent = reactExports.useCallback(
    (item, key, itemPriority, section) => {
      const providerId = isProviderItem(item) ? item.providerId : void 0;
      const isOverflown = isItemInOverflow(key, overflown);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        DockedStatusBarItem,
        {
          itemId: item.id,
          itemPriority,
          providerId,
          section: getSectionName(section),
          onResize: isOverflown ? void 0 : getOnEntryResize(key),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            StatusBarCornerComponentContext.Provider,
            {
              value: key === notOverflown[0] ? "left-corner" : key === notOverflown[notOverflown.length - 1] && overflown?.length === 0 || isItemInOverflow(key, overflown) ? "right-corner" : void 0,
              children: [
                isStatusBarCustomItem(item) && item.content,
                isStatusBarActionItem(item) && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBarActionItemComponent, { ...item }),
                isStatusBarLabelItem(item) && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBarLabelItemComponent, { ...item })
              ]
            }
          )
        },
        key
      );
    },
    [getOnEntryResize, notOverflown, overflown]
  );
  const getSectionItems = reactExports.useCallback(
    (section) => {
      const sectionItems = statusBarItems.filter(
        (item) => item.section.valueOf() === section.valueOf() && !isItemInOverflow(item.id, overflown) && !ConditionalBooleanValue.getValue(item.isHidden)
      ).sort((a, b) => a.itemPriority - b.itemPriority);
      return sectionItems.map((sectionItem) => /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: getComponent(
        sectionItem,
        sectionItem.id,
        sectionItem.itemPriority,
        sectionItem.section
      ) }, sectionItem.id));
    },
    [statusBarItems, overflown, getComponent]
  );
  const getOverflowItems = reactExports.useCallback(() => {
    const itemsInOverflow = statusBarItems.filter(
      (item) => isItemInOverflow(item.id, overflown) && !ConditionalBooleanValue.getValue(item.isHidden)
    ).sort(
      (a, b) => getCombinedSectionItemPriority(a) - getCombinedSectionItemPriority(b)
    ).reverse();
    return itemsInOverflow.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: getComponent(item, item.id, item.itemPriority, item.section) }, item.id));
  }, [statusBarItems, overflown, getComponent]);
  const containerRef = reactExports.useRef(null);
  const resizeObserverRef = useResizeObserver(handleContainerResize);
  const refs = useRefs(containerRef, resizeObserverRef);
  const leftItems = reactExports.useMemo(
    () => getSectionItems(StatusBarSection.Left),
    [getSectionItems]
  );
  const centerItems = reactExports.useMemo(
    () => getSectionItems(StatusBarSection.Center),
    [getSectionItems]
  );
  const rightItems = reactExports.useMemo(
    () => getSectionItems(StatusBarSection.Right),
    [getSectionItems]
  );
  const contextItems = reactExports.useMemo(
    () => getSectionItems(StatusBarSection.Context),
    [getSectionItems]
  );
  const overflowItems = reactExports.useMemo(
    () => getOverflowItems(),
    [getOverflowItems]
  );
  const containerClassName = classnames("uifw-statusBar-docked", className);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: containerClassName,
      ref: refs,
      style,
      role: "presentation",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(StatusBarSpaceBetween, { className: mainClassName, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBarLeftSection, { className: leftClassName, children: leftItems }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(StatusBarCenterSection, { className: centerClassName, children: [
          centerItems,
          contextItems
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(StatusBarRightSection, { className: rightClassName, children: [
          rightItems,
          (!overflown || overflown.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatusBarOverflow,
            {
              onResize: handleOverflowResize,
              overflowItems
            }
          )
        ] })
      ] })
    }
  );
}
DockedStatusBarItem.__docgenInfo = { "description": "Used in [[StatusBarComposer]] component to display a statusbar item.\n@internal", "methods": [], "displayName": "DockedStatusBarItem", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Tool setting content." }, "itemPriority": { "required": false, "tsType": { "name": "number" }, "description": "" }, "providerId": { "required": false, "tsType": { "name": "string" }, "description": "" }, "section": { "required": false, "tsType": { "name": "string" }, "description": "" }, "onResize": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(w: number) => void", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "w" }], "return": { "name": "void" } } }, "description": "" } }, "composes": ["CommonProps"] };
StatusBarComposer.__docgenInfo = { "description": "Component to load components into the [[StatusBar]].\n@public", "methods": [], "displayName": "StatusBarComposer", "props": { "items": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "union", "raw": "| StatusBarActionItem\n| StatusBarLabelItem\n| StatusBarCustomItem", "elements": [{ "name": "StatusBarActionItem" }, { "name": "StatusBarLabelItem" }, { "name": "StatusBarCustomItem" }] }], "raw": "StatusBarItem[]" }, "description": "Status Bar items" }, "mainClassName": { "required": false, "tsType": { "name": "string" }, "description": "CSS class name override for the overall Status Bar" }, "leftClassName": { "required": false, "tsType": { "name": "string" }, "description": "CSS class name override for the left section" }, "centerClassName": { "required": false, "tsType": { "name": "string" }, "description": "CSS class name override for the center section" }, "rightClassName": { "required": false, "tsType": { "name": "string" }, "description": "CSS class name override for the right section" } }, "composes": ["CommonProps"] };
class WidgetControl extends ConfigurableUiControl {
  _widgetDef;
  _reactNode;
  constructor(info, options) {
    super(info, options);
  }
  /** The ReactNode associated with this control */
  get reactNode() {
    return this._reactNode;
  }
  set reactNode(r) {
    this._reactNode = r;
  }
  /** The [[WidgetDef]] associated with this control */
  get widgetDef() {
    return this._widgetDef;
  }
  set widgetDef(w) {
    this._widgetDef = w;
  }
  /** Gets the type of ConfigurableUiControl, which is 'Widget' in this case */
  getType() {
    return ConfigurableUiControlType.Widget;
  }
  /** Sets the [[WidgetState]] for this control */
  setWidgetState(state) {
    this.widgetDef.setWidgetState(state);
  }
  /** Called when widget state changes. */
  onWidgetStateChanged() {
  }
  /** Overwrite to save transient DOM state (i.e. scroll offset). */
  saveTransientState() {
  }
  /** Overwrite to restore transient DOM state.
   * @note Return true if the state is restored or the Widget will remount.
   */
  restoreTransientState() {
    return false;
  }
}
class StatusBarWidgetControl extends WidgetControl {
  constructor(info, options) {
    super(info, options);
  }
  /** Gets the type of ConfigurableUiControl, which is 'StatusBarWidget' in this case */
  getType() {
    return ConfigurableUiControlType.StatusBarWidget;
  }
}
class StatusBarWidgetComposerControl extends StatusBarWidgetControl {
  static controlId = "uifw:StatusBarWidgetComposerControl";
  id = StatusBarWidgetComposerControl.controlId;
  getReactNode() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatusBarComposer,
      {
        items: []
      },
      UiFramework.frontstages.activeFrontstageId
    );
  }
}
var WidgetType = /* @__PURE__ */ ((WidgetType2) => {
  WidgetType2[WidgetType2["Tool"] = 0] = "Tool";
  WidgetType2[WidgetType2["Navigation"] = 1] = "Navigation";
  WidgetType2[WidgetType2["Rectangular"] = 2] = "Rectangular";
  WidgetType2[WidgetType2["ToolSettings"] = 3] = "ToolSettings";
  WidgetType2[WidgetType2["StatusBar"] = 4] = "StatusBar";
  return WidgetType2;
})(WidgetType || {});
class WidgetDef {
  static _sId = 0;
  _label = "";
  _tooltip = "";
  _widgetReactNode;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  _widgetControl;
  _defaultState = WidgetState.Closed;
  _id;
  _priority = 0;
  _stateChanged = false;
  _widgetType = 2;
  _applicationData;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  _iconSpec;
  _internalData;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  _badge;
  _badgeKind;
  _saveTransientState;
  _restoreTransientState;
  _preferredPanelSize;
  _defaultFloatingSize;
  _canPopout;
  _floatingContainerId;
  _defaultFloatingPosition;
  _hideWithUiWhenFloating;
  _allowedPanelTargets;
  _initialConfig;
  get state() {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const nineZone = frontstageDef?.nineZoneState;
    if (!nineZone) return this.defaultState;
    if (!frontstageDef.findWidgetDef(this.id)) return this.defaultState;
    return getWidgetState(this.id, nineZone);
  }
  get id() {
    return this._id;
  }
  get priority() {
    return this._priority;
  }
  get isFloatingStateSupported() {
    if (!this.initialConfig) return true;
    const allowedPanels = this.initialConfig.allowedPanels;
    if (allowedPanels && allowedPanels.length === 0) {
      return true;
    }
    const canFloat = this.initialConfig.canFloat;
    if (canFloat === void 0) return true;
    return !!canFloat;
  }
  get isFloatingStateWindowResizable() {
    const canFloat = this.initialConfig?.canFloat;
    if (typeof canFloat === "object") {
      return canFloat.isResizable === void 0 ? true : canFloat.isResizable;
    }
    return true;
  }
  get isToolSettings() {
    return this._widgetType === 3;
  }
  get isStatusBar() {
    return this._widgetType === 4;
  }
  get stateChanged() {
    return this._stateChanged;
  }
  get applicationData() {
    return this._applicationData;
  }
  get isFloating() {
    return this.state === WidgetState.Floating;
  }
  /** @deprecated in 4.16.0. Use {@link Widget.iconNode} instead. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  get iconSpec() {
    return this._iconSpec === IconHelper.reactIconKey ? IconHelper.getIconReactNode(this._iconSpec, this._internalData) : this._iconSpec;
  }
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  set iconSpec(spec) {
    this._iconSpec = this._internalData ? IconHelper.getIconData(spec, this._internalData) : spec;
  }
  /** @deprecated in 4.16.0. Use `badgeKind` instead. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  get badgeType() {
    return this._badge;
  }
  get badgeKind() {
    return this._badgeKind;
  }
  get initialConfig() {
    return this._initialConfig;
  }
  get widgetType() {
    return this._widgetType;
  }
  set widgetType(type) {
    this._widgetType = type;
  }
  /** @internal */
  get defaultFloatingPosition() {
    return this._defaultFloatingPosition;
  }
  set defaultFloatingPosition(position) {
    this._defaultFloatingPosition = position;
  }
  /** @internal */
  get defaultFloatingSize() {
    return this._defaultFloatingSize;
  }
  set defaultFloatingSize(size) {
    this._defaultFloatingSize = size;
  }
  get defaultState() {
    return this._defaultState;
  }
  constructor() {
    WidgetDef._sId++;
    this._id = `Widget-${WidgetDef._sId}`;
  }
  /** @internal */
  static create(config, type = 2) {
    const def = new WidgetDef();
    def.initializeFromConfig(config, type);
    return def;
  }
  initializeFromConfig(config, type) {
    this._widgetType = type;
    this._initialConfig = config;
    this._id = config.id;
    if (config.label) this._label = config.label;
    else if (config.labelKey)
      this._label = IModelApp.localization.getLocalizedString(config.labelKey);
    else if (type === 3) this._label = "Tool Settings";
    this.setCanPopout(config.canPopout);
    const canFloat = config.canFloat;
    if (typeof canFloat === "object") {
      this.setFloatingContainerId(canFloat.containerId);
      this.defaultFloatingPosition = canFloat.defaultPosition;
      this._hideWithUiWhenFloating = !!canFloat.hideWithUi;
      this._defaultFloatingSize = canFloat.defaultSize;
    }
    if ("allowedPanels" in config) {
      this.allowedPanelTargets = config.allowedPanels;
    } else if (type === 3)
      this.allowedPanelTargets = [
        StagePanelLocation.Bottom,
        StagePanelLocation.Left,
        StagePanelLocation.Right
      ];
    if (config.priority !== void 0) this._priority = config.priority;
    if (config.tooltip) this.setTooltip(config.tooltip);
    else if (config.tooltipKey)
      this._tooltip = IModelApp.localization.getLocalizedString(
        config.tooltipKey
      );
    if (config.defaultState !== void 0) {
      this._defaultState = config.defaultState;
    }
    if (config.allowedPanels && config.allowedPanels.length === 0 && config.defaultState === WidgetState.Open) {
      this._defaultState = WidgetState.Floating;
    }
    this._widgetReactNode = config.content;
    this._iconSpec = config.iconNode ?? config.icon;
    this._badge = config.badge;
    this._badgeKind = config.badgeKind;
    this._preferredPanelSize = config.preferredPanelSize;
  }
  /** @alpha */
  get preferredPanelSize() {
    return this._preferredPanelSize;
  }
  /** Get the label string */
  get label() {
    return PropsHelper.getStringFromSpec(this._label);
  }
  /** Set the label.
   * @param labelSpec A string or a function to get the string.
   */
  setLabel(labelSpec) {
    this._label = labelSpec;
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) return;
    const label2 = PropsHelper.getStringFromSpec(labelSpec);
    frontstageDef.dispatch({
      type: "WIDGET_TAB_SET_LABEL",
      id: this.id,
      label: label2
    });
  }
  /** Get the tooltip string */
  get tooltip() {
    return PropsHelper.getStringFromSpec(this._tooltip);
  }
  /** Set the tooltip.
   * @param v A string or a function to get the string.
   */
  setTooltip(v) {
    this._tooltip = v;
  }
  get reactNode() {
    if (!this._widgetReactNode) {
      const widgetControl = this.getWidgetControl(
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        ConfigurableUiControlType.Widget
      );
      if (widgetControl && widgetControl.reactNode)
        this._widgetReactNode = widgetControl.reactNode;
    }
    return this._widgetReactNode;
  }
  set reactNode(node) {
    this._widgetReactNode = node;
  }
  setWidgetState(newState) {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const nineZone = frontstageDef?.nineZoneState;
    if (!nineZone || this.isStatusBar) return;
    if (!frontstageDef.findWidgetDef(this.id)) return;
    switch (newState) {
      case WidgetState.Closed: {
        frontstageDef.dispatch({
          type: "WIDGET_TAB_CLOSE",
          id: this.id
        });
        break;
      }
      case WidgetState.Floating: {
        frontstageDef.dispatch({
          type: "WIDGET_TAB_FLOAT",
          id: this.id,
          position: this._defaultFloatingPosition
        });
        break;
      }
      case WidgetState.Hidden: {
        frontstageDef.dispatch({
          type: "WIDGET_TAB_HIDE",
          id: this.id
        });
        break;
      }
      case WidgetState.Open: {
        frontstageDef.dispatch({
          type: "WIDGET_TAB_OPEN",
          id: this.id
        });
        break;
      }
      case WidgetState.Unloaded: {
        frontstageDef.dispatch({
          type: "WIDGET_TAB_UNLOAD",
          id: this.id
        });
        break;
      }
    }
  }
  /** @internal */
  handleWidgetStateChanged(newState) {
    this._stateChanged = true;
    UiFramework.frontstages.onWidgetStateChangedEvent.emit({
      widgetDef: this,
      widgetState: newState
    });
    this.onWidgetStateChanged();
  }
  setCanPopout(value) {
    this._canPopout = value;
  }
  get canPopout() {
    return this._canPopout;
  }
  setFloatingContainerId(value) {
    this._floatingContainerId = value;
  }
  get floatingContainerId() {
    return this._floatingContainerId;
  }
  canOpen() {
    return this.isFloating || this.isActive;
  }
  get isVisible() {
    return WidgetState.Hidden !== this.state && WidgetState.Unloaded !== this.state;
  }
  get activeState() {
    return this.state;
  }
  get isActive() {
    return WidgetState.Open === this.activeState;
  }
  set hideWithUiWhenFloating(hide) {
    this._hideWithUiWhenFloating = !!hide;
  }
  get hideWithUiWhenFloating() {
    return !!this._hideWithUiWhenFloating;
  }
  get allowedPanelTargets() {
    return this._allowedPanelTargets;
  }
  set allowedPanelTargets(targets) {
    this._allowedPanelTargets = targets;
  }
  onWidgetStateChanged() {
    this.widgetControl && this.widgetControl.onWidgetStateChanged();
  }
  /** Overwrite to save transient DOM state (i.e. scroll offset). */
  saveTransientState() {
    this.widgetControl && this.widgetControl.saveTransientState();
    this._saveTransientState && this._saveTransientState();
  }
  /** Overwrite to restore transient DOM state.
   * @note Return true if the state is restored or the Widget will remount.
   */
  restoreTransientState() {
    let result = true;
    if (this.widgetControl || this._restoreTransientState) {
      let result1 = false, result2 = false;
      if (this.widgetControl)
        result1 = this.widgetControl.restoreTransientState();
      if (this._restoreTransientState) result2 = this._restoreTransientState();
      result = !(result1 || result2);
    }
    return result;
  }
  /** Opens the widget and makes it visible to the user.
   * @note Opens the stage panel if needed.
   * @note Brings the floating widget to the front.
   * @note Brings the window of the popout widget to the front (if allowed by the browser).
   * @public
   */
  show() {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const nineZone = frontstageDef?.nineZoneState;
    if (!nineZone) return;
    if (!frontstageDef.findWidgetDef(this.id)) return;
    const tabLocation = getTabLocation(nineZone, this.id);
    if (tabLocation && isPopoutTabLocation(tabLocation)) {
      const testWindow = UiFramework.childWindows.find(
        tabLocation.popoutWidgetId
      );
      testWindow?.window.focus();
    }
    frontstageDef.dispatch({
      type: "WIDGET_TAB_SHOW",
      id: this.id
    });
  }
  /** Opens the widget and expands it to fill full size of the stage panel.
   * @public
   */
  expand() {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const nineZone = frontstageDef?.nineZoneState;
    if (!nineZone) return;
    if (!frontstageDef.findWidgetDef(this.id)) return;
    frontstageDef.dispatch({
      type: "WIDGET_TAB_EXPAND",
      id: this.id
    });
  }
  /* eslint-disable @typescript-eslint/no-deprecated */
  /** @deprecated in 4.16.0. Uses a deprecated type {@link ConfigurableUiControlConstructor}. */
  get classId() {
    return void 0;
  }
  /** @deprecated in 4.16.0. Returns an instance of a deprecated type {@link WidgetControl}. */
  get widgetControl() {
    return this._widgetControl;
  }
  /** @deprecated in 4.16.0. Returns an instance of a deprecated type {@link WidgetControl}. */
  getWidgetControl(type) {
    if (!this._widgetControl && this.classId) {
      let usedClassId = "";
      if (typeof this.classId === "string") {
        if (this.classId)
          this._widgetControl = UiFramework.controls.create(
            this.classId,
            this.id,
            this.applicationData
          );
        usedClassId = this.classId;
      } else {
        const info = new ConfigurableCreateInfo(
          this.classId.name,
          this.id,
          this.id
        );
        usedClassId = this.classId.name;
        this._widgetControl = new this.classId(
          info,
          this.applicationData
        );
      }
      if (this._widgetControl) {
        if (this._widgetControl.getType() !== type) {
          throw new UiError(
            UiFramework.loggerCategory("WidgetDef"),
            `getWidgetControl: '${usedClassId}' is NOT a ${type}; it is a ${this._widgetControl.getType()}`
          );
        }
        this._widgetControl.widgetDef = this;
        this._widgetControl.initialize();
      }
    }
    if (!this._widgetControl && this.isStatusBar) {
      const info = new ConfigurableCreateInfo(
        "StatusBarWidgetComposerControl",
        StatusBarWidgetComposerControl.controlId,
        StatusBarWidgetComposerControl.controlId
      );
      this._widgetControl = new StatusBarWidgetComposerControl(info, void 0);
      this._widgetControl.widgetDef = this;
      this._widgetControl.initialize();
    }
    return this._widgetControl;
  }
  /* eslint-enable @typescript-eslint/no-deprecated */
}
function getWidgetState(widgetId, nineZone) {
  const tab = nineZone.tabs[widgetId];
  if (tab && tab.unloaded) {
    return WidgetState.Unloaded;
  }
  if (nineZone.draggedTab?.tabId === widgetId) {
    return WidgetState.Closed;
  }
  const toolSettingsTabId = nineZone.toolSettings?.tabId;
  if (toolSettingsTabId === widgetId && nineZone.toolSettings?.type === "docked") {
    return nineZone.toolSettings.hidden ? WidgetState.Hidden : WidgetState.Open;
  }
  const location = getTabLocation(nineZone, widgetId);
  if (!location) {
    return WidgetState.Hidden;
  }
  if (isFloatingTabLocation(location)) {
    return WidgetState.Floating;
  }
  if (isPanelTabLocation(location)) {
    const panel = nineZone.panels[location.side];
    if (panel.collapsed || void 0 === panel.size || 0 === panel.size)
      return WidgetState.Closed;
  }
  const widget2 = nineZone.widgets[location.widgetId];
  if (widget2.minimized || widgetId !== widget2.activeTabId)
    return WidgetState.Closed;
  return WidgetState.Open;
}
class WidgetHost {
  _widgetDefs = new Array();
  _dynamicWidgetDefs;
  _sortedWidgetDefs = [];
  /** Constructor for WidgetHost.
   */
  constructor() {
  }
  /** Adds a WidgetDef to the list of Widgets.
   * @param widgetDef  Definition of the Widget to add
   */
  addWidgetDef(widgetDef) {
    this._widgetDefs.push(widgetDef);
    this.sortWidgetDefs();
  }
  /** Gets the list of Widgets. */
  get widgetDefs() {
    return this._sortedWidgetDefs;
  }
  /** Gets the number of Widgets. */
  get widgetCount() {
    return this.widgetDefs.length;
  }
  /** If there is only one Widget in the Panel, gets the single WidgetDef.
   * @returns The single WidgetDef if there is only one Widget; otherwise, undefined is returned.
   */
  getSingleWidgetDef() {
    if (this.widgetCount === 1) {
      return this.widgetDefs[0];
    }
    return void 0;
  }
  /** Finds a WidgetDef with a given Id.
   * @param id  Id of the WidgetDef to find
   * @returns The WidgetDef if found; otherwise, undefined is returned.
   */
  findWidgetDef(id) {
    return this.widgetDefs.find((widgetDef) => widgetDef.id === id);
  }
  /** Updates the WidgetHost with dynamic widgets
   * @internal
   */
  updateDynamicWidgetDefs(stageId, stageUsage, location, section, allStageWidgetDefs) {
    const uniqueWidgets = this._widgetDefs.filter((widgetDef) => {
      return !allStageWidgetDefs.find((wDef) => wDef.id === widgetDef.id);
    });
    allStageWidgetDefs.push(...uniqueWidgets);
    let dynamicWidgetDefs;
    if (section !== void 0) {
      dynamicWidgetDefs = UiFramework.widgetManager.getWidgetDefs(
        stageId,
        stageUsage,
        location,
        section
      ) ?? [];
    }
    const uniqueDynamicWidgetDefs = dynamicWidgetDefs?.filter((widgetDef) => {
      return !allStageWidgetDefs.find((wDef) => wDef.id === widgetDef.id);
    });
    if (uniqueDynamicWidgetDefs) {
      allStageWidgetDefs.push(...uniqueDynamicWidgetDefs);
      this._dynamicWidgetDefs = [...uniqueDynamicWidgetDefs];
    }
    this.sortWidgetDefs();
  }
  /** Sorts all widgets */
  sortWidgetDefs() {
    let sortedWidgetDefs = [];
    if (this._dynamicWidgetDefs)
      sortedWidgetDefs = this._widgetDefs.concat(this._dynamicWidgetDefs);
    else sortedWidgetDefs = this._widgetDefs.slice();
    sortedWidgetDefs.sort((a, b) => a.priority - b.priority);
    this._sortedWidgetDefs = sortedWidgetDefs;
  }
}
var StagePanelState = /* @__PURE__ */ ((StagePanelState2) => {
  StagePanelState2[StagePanelState2["Off"] = 0] = "Off";
  StagePanelState2[StagePanelState2["Minimized"] = 1] = "Minimized";
  StagePanelState2[StagePanelState2["Open"] = 2] = "Open";
  StagePanelState2[StagePanelState2["Popup"] = 3] = "Popup";
  return StagePanelState2;
})(StagePanelState || {});
class StagePanelDef extends WidgetHost {
  _initialConfig;
  _location = StagePanelLocation.Left;
  _start = new StagePanelSectionDef();
  _end = new StagePanelSectionDef();
  /** Constructor for PanelDef. */
  constructor() {
    super();
  }
  /** @internal */
  static create(config, location) {
    const def = new StagePanelDef();
    def.initializeFromConfig(config, location);
    return def;
  }
  /** @internal */
  initializeFromConfig(config, location) {
    this._location = location;
    this._initialConfig = config;
    this._start.initializeFromConfig(config?.sections?.start);
    this._end.initializeFromConfig(config?.sections?.end);
  }
  /** @internal */
  get initialConfig() {
    return this._initialConfig;
  }
  /** Current size of the panel.
   * @deprecated in 4.12.0. Use {@link StagePanelDef.sizeSpec} instead.
   */
  get size() {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const state = frontstageDef?.nineZoneState;
    if (!state) return this.initialConfig?.size;
    const side = toPanelSide(this.location);
    const panel = state.panels[side];
    return panel.size;
  }
  set size(size) {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) return;
    const side = toPanelSide(this.location);
    frontstageDef.dispatch({
      type: "PANEL_SET_SIZE",
      side,
      size
    });
  }
  /** Current size of the panel */
  get sizeSpec() {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const state = frontstageDef?.nineZoneState;
    if (!state) return this.initialConfig?.sizeSpec;
    const side = toPanelSide(this.location);
    const panel = state.panels[side];
    return panel.size;
  }
  set sizeSpec(size) {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) return;
    const side = toPanelSide(this.location);
    frontstageDef.dispatch({
      type: "PANEL_SET_SIZE",
      side,
      size
    });
  }
  /** @internal */
  handleSizeChanged(size) {
    InternalFrontstageManager.onPanelSizeChangedEvent.emit({
      panelDef: this,
      size
    });
  }
  /** Indicates whether the panel is resizable. */
  get resizable() {
    return this.defaultResizable;
  }
  /** Indicates whether the panel is pinned. */
  get pinned() {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const state = frontstageDef?.nineZoneState;
    if (!state) return this.defaultPinned;
    const side = toPanelSide(this.location);
    const panel = state.panels[side];
    return panel.pinned;
  }
  set pinned(pinned) {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) return;
    const side = toPanelSide(this.location);
    frontstageDef.dispatch({
      type: "PANEL_SET_PINNED",
      side,
      pinned
    });
  }
  /** @internal */
  handlePinnedChanged(pinned) {
    UiFramework.frontstages.onPanelPinnedChangedEvent.emit({
      panelDef: this,
      pinned
    });
  }
  /** Location of panel. */
  get location() {
    return this._location;
  }
  /** Panel state. Defaults to PanelState.Open. */
  get panelState() {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const state = frontstageDef?.nineZoneState;
    if (!state) return this.defaultState;
    const side = toPanelSide(this.location);
    return getPanelState(state, side);
  }
  set panelState(panelState) {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) return;
    const side = toPanelSide(this.location);
    const collapsed = panelState === StagePanelState.Open ? false : true;
    frontstageDef.dispatch({
      type: "PANEL_SET_COLLAPSED",
      collapsed,
      side
    });
  }
  /** @internal */
  handlePanelStateChanged(panelState) {
    UiFramework.frontstages.onPanelStateChangedEvent.emit({
      panelDef: this,
      panelState
    });
  }
  /** @internal */
  get defaultState() {
    const defaultState = this._initialConfig?.defaultState;
    return defaultState ?? StagePanelState.Open;
  }
  /** @internal */
  get defaultPinned() {
    return this._initialConfig?.pinned ?? true;
  }
  /** @internal */
  get defaultResizable() {
    return this._initialConfig?.resizable ?? true;
  }
  /** Gets the list of Widgets. */
  get widgetDefs() {
    return [
      ...super.widgetDefs,
      ...this._start.widgetDefs,
      ...this._end.widgetDefs
    ];
  }
  updateDynamicWidgetDefs(stageId, stageUsage, location, _section, allStageWidgetDefs) {
    this._start.updateDynamicWidgetDefs(
      stageId,
      stageUsage,
      location,
      StagePanelSection.Start,
      allStageWidgetDefs
    );
    this._end.updateDynamicWidgetDefs(
      stageId,
      stageUsage,
      location,
      StagePanelSection.End,
      allStageWidgetDefs
    );
  }
  /** @internal */
  getPanelSectionDef(section) {
    switch (section) {
      case StagePanelSection.Start: {
        return this._start;
      }
      case StagePanelSection.End: {
        return this._end;
      }
    }
  }
}
class StagePanelSectionDef extends WidgetHost {
  /** @internal */
  initializeFromConfig(config) {
    config?.forEach((widgetConfig) => {
      const widgetDef = WidgetDef.create(widgetConfig);
      this.addWidgetDef(widgetDef);
    });
  }
}
function toPanelSide(location) {
  switch (location) {
    case StagePanelLocation.Bottom:
      return "bottom";
    case StagePanelLocation.Left:
      return "left";
    case StagePanelLocation.Right:
      return "right";
    case StagePanelLocation.Top:
      return "top";
  }
}
produce(
  (nineZone, side, pinned) => {
    const panel = nineZone.panels[side];
    panel.pinned = pinned;
  }
);
function getPanelState(state, side) {
  const panel = state.panels[side];
  return panel.collapsed ? StagePanelState.Minimized : StagePanelState.Open;
}
var StageUsage = /* @__PURE__ */ ((StageUsage2) => {
  StageUsage2["Private"] = "Private";
  StageUsage2["General"] = "General";
  StageUsage2["Redline"] = "Redline";
  StageUsage2["ViewOnly"] = "ViewOnly";
  StageUsage2["Edit"] = "Edit";
  StageUsage2["Settings"] = "Settings";
  return StageUsage2;
})(StageUsage || {});
class FrontstageDef {
  _id = "";
  _initialConfig;
  _isStageClosing = false;
  _isReady = false;
  _isApplicationClosing = false;
  _usage;
  _version = 0;
  _toolSettings;
  _activeToolEmptyNode;
  _statusBar;
  _contentManipulation;
  _viewNavigation;
  _topPanel;
  _leftPanel;
  _rightPanel;
  _bottomPanel;
  _contentLayoutDef;
  _contentGroup;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  _frontstageProvider;
  _timeTracker = new TimeTracker();
  _nineZoneState;
  _contentGroupProvider;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  _floatingContentControls;
  _toolAdminDefaultToolId;
  _dispatch;
  _batching = false;
  get id() {
    return this._id;
  }
  get usage() {
    return this._usage !== void 0 ? this._usage : StageUsage.General;
  }
  get version() {
    return this._version;
  }
  get contentGroupProvider() {
    return this._contentGroupProvider;
  }
  /** @deprecated in 4.17.0. Returns instances of a deprecated {@link ContentControl} type. */
  get floatingContentControls() {
    return this._floatingContentControls;
  }
  get toolSettings() {
    return this._toolSettings;
  }
  /** @internal */
  get activeToolEmptyNode() {
    return this._activeToolEmptyNode;
  }
  get statusBar() {
    return this._statusBar;
  }
  get contentManipulation() {
    return this._contentManipulation;
  }
  get viewNavigation() {
    return this._viewNavigation;
  }
  get topPanel() {
    return this._topPanel;
  }
  get leftPanel() {
    return this._leftPanel;
  }
  get rightPanel() {
    return this._rightPanel;
  }
  get bottomPanel() {
    return this._bottomPanel;
  }
  get contentLayoutDef() {
    return this._contentLayoutDef;
  }
  get contentGroup() {
    return this._contentGroup;
  }
  /** @internal */
  get initialConfig() {
    return this._initialConfig;
  }
  toStagePanelLocation(side) {
    switch (side) {
      case "bottom":
        return StagePanelLocation.Bottom;
      case "left":
        return StagePanelLocation.Left;
      case "right":
        return StagePanelLocation.Right;
      case "top":
        return StagePanelLocation.Top;
    }
  }
  populateStateMaps(nineZone) {
    const panelMap = /* @__PURE__ */ new Map();
    const widgetMap = /* @__PURE__ */ new Map();
    for (const panelSide of panelSides) {
      const panel = nineZone.panels[panelSide];
      const location = this.toStagePanelLocation(panelSide);
      const panelDef = this.getStagePanelDef(location);
      if (!panelDef) continue;
      const panelState = panel.collapsed ? StagePanelState.Minimized : StagePanelState.Open;
      panelMap.set(panelDef, panelState);
    }
    for (const widgetDef of this.widgetDefs) {
      const widgetState = getWidgetState(widgetDef.id, nineZone);
      widgetMap.set(widgetDef, widgetState);
    }
    return { panelMap, widgetMap };
  }
  triggerStateChangeEvents(oldState) {
    const newState = this.nineZoneState;
    if (!newState) return;
    if (this._isStageClosing || this._isApplicationClosing) return;
    const { panelMap, widgetMap } = this.populateStateMaps(oldState);
    const { panelMap: newPanelMap, widgetMap: newWidgetMap } = this.populateStateMaps(newState);
    newWidgetMap.forEach((newWidgetState, widgetDef) => {
      const originalState = widgetMap.get(widgetDef);
      if (originalState === newWidgetState) return;
      widgetDef.handleWidgetStateChanged(newWidgetState);
    });
    newPanelMap.forEach((newPanelState, panelDef) => {
      const originalState = panelMap.get(panelDef);
      if (originalState === newPanelState) return;
      panelDef.handlePanelStateChanged(newPanelState);
    });
    for (const panelSide of panelSides) {
      const panel = newState.panels[panelSide];
      const oldPanel = oldState.panels[panelSide];
      const location = this.toStagePanelLocation(panelSide);
      const panelDef = this.getStagePanelDef(location);
      if (!panelDef) continue;
      if (panel.size !== oldPanel.size) {
        panelDef.handleSizeChanged(panel.size);
      }
      if (panel.pinned !== oldPanel.pinned) {
        panelDef.handlePinnedChanged(panel.pinned);
      }
    }
  }
  handlePopouts(oldState) {
    const newState = this.nineZoneState;
    const oldPopouts = oldState?.popoutWidgets.allIds || [];
    const newPopouts = newState?.popoutWidgets.allIds || [];
    const popoutsToClose = oldPopouts.filter((p) => !newPopouts.includes(p));
    const popoutsToOpen = newPopouts.filter((p) => !oldPopouts.includes(p));
    for (const popoutId of popoutsToClose) {
      UiFramework.childWindows.close(popoutId, true);
    }
    for (const popoutId of popoutsToOpen) {
      const result = this.openPopoutWidgetContainer(popoutId, oldState);
      if (!result) return result;
    }
    return true;
  }
  /** @internal */
  get nineZoneState() {
    return this._nineZoneState;
  }
  set nineZoneState(state) {
    if (this._nineZoneState === state) return;
    const oldState = this._nineZoneState;
    this._nineZoneState = state;
    if (this._batching) return;
    const popoutResult = this.handlePopouts(oldState);
    if (oldState) {
      this.triggerStateChangeEvents(oldState);
    }
    const isClosing = this._isStageClosing || this._isApplicationClosing;
    if (isClosing && !this.isReady) return;
    if (popoutResult === false) {
      IModelApp.notifications.outputMessage(
        new NotifyMessageDetails(
          OutputMessagePriority.Error,
          UiFramework.translate("widget.errorMessage.widgetPopoutFail"),
          void 0,
          OutputMessageType.Toast
        )
      );
      return;
    }
    InternalFrontstageManager.onFrontstageNineZoneStateChangedEvent.emit({
      frontstageDef: this,
      state
    });
  }
  /** @internal */
  get dispatch() {
    return this._dispatch ??= (action) => {
      const state = this.nineZoneState;
      if (!state) return;
      this.nineZoneState = NineZoneStateReducer(state, action);
    };
  }
  set dispatch(dispatch) {
    this._dispatch = dispatch;
  }
  /** Dispatch multiple actions inside `fn`, but trigger events once.
   * @internal
   */
  batch(fn) {
    const initialState = this._nineZoneState;
    this._batching = true;
    fn();
    this._batching = false;
    const updatedState = this._nineZoneState;
    this._nineZoneState = initialState;
    this.nineZoneState = updatedState;
  }
  /** @internal */
  get timeTracker() {
    return this._timeTracker;
  }
  /** Creates a [[FrontstageDef]] and initializes it. */
  static async create(providerOrFrontstage) {
    const def = new FrontstageDef();
    let config;
    if ("frontstageConfig" in providerOrFrontstage) {
      def._frontstageProvider = providerOrFrontstage;
      config = providerOrFrontstage.frontstageConfig();
    } else {
      config = providerOrFrontstage;
    }
    await def.initializeFromConfig(config);
    return def;
  }
  /** Handles when the Frontstage becomes activated */
  async _onActivated() {
  }
  /** Handles when the Frontstage becomes activated */
  async onActivated() {
    this.updateWidgetDefs();
    const provider = this._contentGroupProvider;
    if (provider && this._initialConfig) {
      this._contentGroup = await provider.contentGroup(this._initialConfig);
    }
    if (!this._contentGroup)
      throw new UiError(
        UiFramework.loggerCategory("FrontstageDef"),
        `onActivated: Content Group not defined`
      );
    this._contentLayoutDef = UiFramework.content.layouts.getForGroup(
      this._contentGroup
    );
    UiFramework.frontstages.onContentLayoutActivatedEvent.emit({
      contentLayout: this._contentLayoutDef,
      contentGroup: this._contentGroup
    });
    this._timeTracker.startTiming();
    await this._onActivated();
  }
  /** Handles when the Frontstage becomes inactive */
  async _onDeactivated() {
  }
  /** Handles when the Frontstage becomes inactive */
  async onDeactivated() {
    for (const control of this._widgetControls) {
      control.onFrontstageDeactivated();
    }
    for (const control of this.contentControls) {
      control.onFrontstageDeactivated();
    }
    if (this.contentGroup) this.contentGroup.onFrontstageDeactivated();
    if (this.contentGroupProvider)
      await this.contentGroupProvider.onFrontstageDeactivated();
    this._timeTracker.stopTiming();
    this._isStageClosing = true;
    UiFramework.childWindows.closeAll();
    if (this._floatingContentControls) {
      InternalContentDialogManager.closeAll();
      this._floatingContentControls = void 0;
    }
    if (this._toolAdminDefaultToolId) {
      IModelApp.toolAdmin.defaultToolId = this._toolAdminDefaultToolId;
      this._toolAdminDefaultToolId = void 0;
    }
    await this._onDeactivated();
    this._isStageClosing = false;
  }
  /** @internal */
  setIsApplicationClosing(value) {
    this._isApplicationClosing = value;
  }
  /** Returns once the contained widgets and content controls are ready to use */
  async waitUntilReady() {
    this._isReady = false;
    const controlReadyPromises = new Array();
    this._widgetControls.forEach((control) => {
      controlReadyPromises.push(control.isReady);
    });
    if (this.contentLayoutDef) {
      const usedContentIndexes = this.contentLayoutDef.getUsedContentIndexes();
      this.contentControls.forEach((control, index) => {
        if (usedContentIndexes.includes(index))
          controlReadyPromises.push(control.isReady);
      });
    }
    await Promise.all(controlReadyPromises);
    this._isReady = true;
  }
  /** Handles when the Frontstage becomes active */
  _onFrontstageReady() {
  }
  /** Handles when the Frontstage becomes active */
  onFrontstageReady() {
    for (const control of this._widgetControls) {
      control.onFrontstageReady();
    }
    for (const control of this.contentControls) {
      control.onFrontstageReady();
    }
    if (this.contentGroup) this.contentGroup.onFrontstageReady();
    if (IModelApp.toolAdmin && IModelApp.viewManager && this._initialConfig) {
      const defaultTool = this._initialConfig.defaultTool;
      if (defaultTool) {
        this._toolAdminDefaultToolId = IModelApp.toolAdmin.defaultToolId;
        IModelApp.toolAdmin.defaultToolId = defaultTool;
        void IModelApp.tools.run(defaultTool);
      } else {
        void IModelApp.toolAdmin.startDefaultTool();
      }
    }
    this._onFrontstageReady();
  }
  /** Sets the Content Layout and Content Group */
  setContentLayoutAndGroup(contentLayoutDef, contentGroup) {
    this._contentLayoutDef = contentLayoutDef;
    this._contentGroup = contentGroup;
  }
  /** Sets the active view content to the default or first. */
  async setActiveContent() {
    const content = this.contentGroup?.contentPropsList?.[0];
    if (!content) return false;
    let contentReactNode = content.content;
    let control;
    if (!contentReactNode) {
      control = this.contentGroup.getContentControl(content, 0);
      contentReactNode = control?.reactNode;
    }
    if (!contentReactNode) return false;
    UiFramework.content.setActive(contentReactNode, true);
    if (!control?.viewport) return true;
    const status = await IModelApp.viewManager.setSelectedView(
      control.viewport
    );
    return status === BentleyStatus.SUCCESS;
  }
  /** Gets a [[StagePanelDef]] based on a given panel location
   * @beta
   */
  getStagePanelDef(location) {
    let panelDef;
    switch (location) {
      case StagePanelLocation.Top:
        panelDef = this.topPanel;
        break;
      case StagePanelLocation.Left:
        panelDef = this.leftPanel;
        break;
      case StagePanelLocation.Right:
        panelDef = this.rightPanel;
        break;
      case StagePanelLocation.Bottom:
        panelDef = this.bottomPanel;
        break;
    }
    return panelDef;
  }
  /** Gets a list of [[StagePanelDef]]s
   * @beta
   */
  get panelDefs() {
    const locations = [
      StagePanelLocation.Left,
      StagePanelLocation.Right,
      StagePanelLocation.Top,
      StagePanelLocation.Bottom
    ];
    const panels = [];
    locations.forEach((location) => {
      const panel = this.getStagePanelDef(location);
      if (panel) panels.push(panel);
    });
    return panels;
  }
  /** Finds a [[WidgetDef]] based on a given id */
  findWidgetDef(id) {
    for (const widgetDef of this.widgetDefs) {
      if (widgetDef.id === id) return widgetDef;
    }
    return void 0;
  }
  /** Gets the list of [[WidgetControl]]s */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  get _widgetControls() {
    const widgetControls = new Array();
    this.panelDefs.forEach((panelDef) => {
      panelDef.widgetDefs.forEach((widgetDef) => {
        const widgetControl = widgetDef.widgetControl;
        if (widgetControl) widgetControls.push(widgetControl);
      });
    });
    return widgetControls;
  }
  /** Initializes a FrontstageDef from frontstage.
   * @internal
   */
  async initializeFromConfig(config) {
    this._id = config.id;
    this._initialConfig = config;
    if (config.contentGroup instanceof ContentGroupProvider) {
      this._contentGroupProvider = config.contentGroup;
    } else {
      this._contentGroup = config.contentGroup;
    }
    this._usage = config.usage;
    this._version = config.version;
    this._toolSettings = createWidgetDef(
      config.toolSettings,
      WidgetType.ToolSettings
    );
    this._activeToolEmptyNode = config.toolSettings?.activeToolEmptyNode;
    this._statusBar = createWidgetDef(config.statusBar, WidgetType.StatusBar);
    this._contentManipulation = createWidgetDef(
      config.contentManipulation,
      WidgetType.Tool
    );
    this._viewNavigation = createWidgetDef(
      config.viewNavigation,
      WidgetType.Navigation
    );
    this._topPanel = createStagePanelDef(config, StagePanelLocation.Top);
    this._leftPanel = createStagePanelDef(config, StagePanelLocation.Left);
    this._rightPanel = createStagePanelDef(config, StagePanelLocation.Right);
    this._bottomPanel = createStagePanelDef(config, StagePanelLocation.Bottom);
  }
  /** @internal */
  updateWidgetDefs() {
    const allStageWidgetDefs = [];
    this.panelDefs.forEach((stagePanelDef) => {
      stagePanelDef.updateDynamicWidgetDefs(
        this.id,
        this.usage,
        stagePanelDef.location,
        void 0,
        allStageWidgetDefs
      );
    });
    InternalFrontstageManager.onFrontstageWidgetsChangedEvent.emit({
      frontstageDef: this
    });
  }
  /** Restores frontstage layout to initial configuration.
   * @beta
   */
  restoreLayout() {
    for (const panelDef of this.panelDefs) {
      panelDef.size = panelDef.initialConfig?.size;
      panelDef.sizeSpec = panelDef.initialConfig?.sizeSpec;
      panelDef.panelState = panelDef.defaultState;
      panelDef.pinned = panelDef.initialConfig?.pinned ?? true;
    }
    for (const widgetDef of this.widgetDefs) {
      widgetDef.setWidgetState(widgetDef.defaultState);
    }
    const storage = UiFramework.getUiStateStorage();
    void storage.deleteSetting(
      FRONTSTAGE_SETTINGS_NAMESPACE,
      getFrontstageStateSettingName(this.id)
    );
    this.nineZoneState = void 0;
    InternalFrontstageManager.onFrontstageRestoreLayoutEvent.emit({
      frontstageDef: this
    });
  }
  isPopoutWidget(widgetId) {
    if (this.nineZoneState) {
      const location = getTabLocation(this.nineZoneState, widgetId);
      if (location) return isPopoutTabLocation(location);
    }
    return false;
  }
  isFloatingWidget(widgetId) {
    if (this.nineZoneState) {
      const location = getTabLocation(this.nineZoneState, widgetId);
      if (location) return isFloatingTabLocation(location);
    }
    return false;
  }
  /** Create a new floating panel that contains the widget specified by its Id.
   * @param widgetId case sensitive Widget Id
   * @param position Position of top left corner of floating panel in pixels. If undefined {x:50, y:100} is used.
   * @param size defines the width and height of the floating panel. If undefined and widget has been floated before
   * the previous size is used, else {height:400, width:400} is used.
   * @beta
   */
  floatWidget(widgetId, position, size) {
    const state = this.nineZoneState;
    if (!state) return;
    const widgetDef = this.findWidgetDef(widgetId);
    if (!widgetDef) return;
    this.dispatch({
      type: "WIDGET_TAB_FLOAT",
      id: widgetId,
      position,
      size
    });
  }
  /** Check widget and panel state to determine whether the widget is currently displayed
   * @param widgetId case-sensitive Widget Id
   * @public
   */
  isWidgetDisplayed(widgetId) {
    if (!this.nineZoneState) return false;
    const tabLocation = getTabLocation(this.nineZoneState, widgetId);
    if (!tabLocation) return false;
    if (isPanelTabLocation(tabLocation)) {
      const panel = this.nineZoneState.panels[tabLocation.side];
      const widgetDef = this.findWidgetDef(widgetId);
      const isVisible2 = !!widgetDef && widgetDef.state === WidgetState.Open && !panel.collapsed;
      return isVisible2;
    }
    return true;
  }
  /** Opens window for specified PopoutWidget container. Used to reopen popout when running in Electron.
   * @internal
   */
  openPopoutWidgetContainer(widgetContainerId, oldState) {
    const state = this.nineZoneState;
    if (!state) return false;
    const location = getWidgetLocation(state, widgetContainerId);
    if (!location) return false;
    if (!isPopoutWidgetLocation(location)) return false;
    const widget2 = state.widgets[widgetContainerId];
    if (widget2.tabs.length !== 1) return false;
    const tabId = widget2.tabs[0];
    const widgetDef = this.findWidgetDef(tabId);
    if (!widgetDef) return false;
    const popoutContent = /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChildWindowWidget,
      {
        widgetContainerId,
        widgetDef
      }
    );
    const popoutWidget = state.popoutWidgets.byId[location.popoutWidgetId];
    const bounds = Rectangle.create(popoutWidget.bounds);
    const position = {
      width: bounds.getWidth(),
      height: bounds.getHeight(),
      left: bounds.left,
      top: bounds.top
    };
    const childWindow = appUi.windowManager.openWindow({
      childWindowId: widgetContainerId,
      title: widgetDef.label,
      content: popoutContent,
      location: position,
      useDefaultPopoutUrl: UiFramework.useDefaultPopoutUrl,
      tabId
    });
    const savedTab = state.savedTabs.byId[tabId];
    if (childWindow && savedTab?.popout?.size) {
      childWindow.resizeTo(
        savedTab.popout.size.width,
        savedTab.popout.size.height
      );
    }
    if (!childWindow && oldState) {
      this.nineZoneState = oldState;
      return false;
    }
    return true;
  }
  /** Create a new popout/child window that contains the widget specified by its Id.
   * @param widgetId case sensitive Widget Id
   * @param position Position of top left corner of floating panel in pixels. If undefined {x:0, y:0} is used.
   * @param size defines the width and height of the floating panel. If undefined and widget has been floated before
   * the previous size is used, else {height:800, width:600} is used.
   * @beta
   */
  popoutWidget(widgetId, position, size) {
    const state = this.nineZoneState;
    if (!state) return;
    const widgetDef = this.findWidgetDef(widgetId);
    if (!widgetDef) return;
    this.dispatch({
      type: "WIDGET_TAB_POPOUT",
      id: widgetId,
      position,
      size
    });
  }
  get isStageClosing() {
    return this._isStageClosing;
  }
  get isApplicationClosing() {
    return this._isApplicationClosing;
  }
  get isReady() {
    return this._isReady;
  }
  /** @internal */
  saveChildWindowSizeAndPosition(childWindowId, childWindow) {
    const state = this.nineZoneState;
    if (!state) return;
    const location = getWidgetLocation(state, childWindowId);
    if (!location || !isPopoutWidgetLocation(location)) return;
    const widget2 = state.widgets[location.popoutWidgetId];
    const tabId = widget2.tabs[0];
    const widgetDef = this.findWidgetDef(tabId);
    if (!widgetDef) return;
    this.dispatch({
      type: "WIDGET_TAB_SET_POPOUT_BOUNDS",
      id: tabId,
      position: {
        x: childWindow.screenLeft,
        y: childWindow.screenTop
      },
      size: {
        height: childWindow.outerHeight,
        width: childWindow.outerWidth
      },
      contentSize: {
        height: childWindow.innerHeight,
        width: childWindow.innerWidth
      }
    });
  }
  /** @internal */
  dockWidgetContainerByContainerId(widgetContainerId) {
    const state = this.nineZoneState;
    if (!state) return;
    const location = getWidgetLocation(state, widgetContainerId);
    if (!location) return;
    if (isFloatingWidgetLocation(location)) {
      this.dispatch({
        type: "FLOATING_WIDGET_SEND_BACK",
        id: location.floatingWidgetId
      });
      return;
    }
    if (isPopoutWidgetLocation(location)) {
      this.dispatch({
        type: "POPOUT_WIDGET_SEND_BACK",
        id: location.popoutWidgetId
      });
      return;
    }
  }
  /** Finds the container with the specified widget and re-docks all widgets
   * back to the panel zone location that was used when the floating container
   * was generated.
   * @param widgetId  case sensitive Widget Id.
   * @beta
   */
  dockWidgetContainer(widgetId) {
    const state = this.nineZoneState;
    if (!state) return;
    const location = getTabLocation(state, widgetId);
    if (!location) return;
    this.dockWidgetContainerByContainerId(location.widgetId);
  }
  setFloatingWidgetContainerBounds(floatingWidgetId, bounds) {
    if (!this.nineZoneState || !(floatingWidgetId in this.nineZoneState.floatingWidgets.byId))
      return false;
    this.dispatch({
      type: "FLOATING_WIDGET_SET_BOUNDS",
      id: floatingWidgetId,
      bounds
    });
    this.dispatch({
      type: "FLOATING_WIDGET_SET_USER_SIZED",
      id: floatingWidgetId,
      userSized: true
    });
    return true;
  }
  getFloatingWidgetContainerIds() {
    if (!this.nineZoneState) return [];
    return [...this.nineZoneState.floatingWidgets.allIds];
  }
  getFloatingWidgetContainerIdByWidgetId(widgetId) {
    if (!this.nineZoneState) return void 0;
    const location = getTabLocation(this.nineZoneState, widgetId);
    if (location && isFloatingTabLocation(location)) {
      return location.floatingWidgetId;
    }
    return void 0;
  }
  getFloatingWidgetContainerBounds(floatingWidgetId) {
    if (!floatingWidgetId) return void 0;
    if (this.nineZoneState && floatingWidgetId in this.nineZoneState.floatingWidgets.byId) {
      const foundWidget = document.querySelector(
        `div.nz-widget-floatingWidget[data-widget-id='${floatingWidgetId}']`
      );
      if (foundWidget) {
        const domRect = foundWidget.getBoundingClientRect();
        return {
          left: domRect.left,
          right: domRect.right,
          top: domRect.top,
          bottom: domRect.bottom
        };
      }
      return this.nineZoneState.floatingWidgets.byId[floatingWidgetId].bounds;
    }
    return void 0;
  }
  *_widgetDefs() {
    for (const panelDef of this.panelDefs) {
      for (const widgetDef of panelDef.widgetDefs) {
        yield widgetDef;
      }
    }
    if (this.toolSettings) yield this.toolSettings;
    if (this.statusBar) yield this.statusBar;
    return void 0;
  }
  /** Iterable of all widget definitions in a frontstage.
   * @internal
   */
  get widgetDefs() {
    const defs = this._widgetDefs();
    return {
      [Symbol.iterator]() {
        return defs;
      }
    };
  }
  /* eslint-disable @typescript-eslint/no-deprecated */
  /** @deprecated in 4.15.0. Use {@link FrontstageDef.id} to look up a frontstage. */
  get frontstageProvider() {
    return this._frontstageProvider;
  }
  /** Sets the active view content control.
   * @deprecated in 4.16.0. Uses a deprecated class {@link ContentControl}.
   */
  setActiveView(newContent, oldContent) {
    if (oldContent) oldContent.onDeactivated();
    newContent.onActivated();
    UiFramework.frontstages.onContentControlActivatedEvent.emit({
      activeContentControl: newContent,
      oldContentControl: oldContent
    });
  }
  /** @deprecated in 4.16.0. Use {@link UiItemsProvider} to provide a floating widget. */
  addFloatingContentControl(contentControl) {
    if (!contentControl) return;
    if (!this._floatingContentControls)
      this._floatingContentControls = new Array();
    this._floatingContentControls.push(contentControl);
    UiFramework.content.onAvailableContentChangedEvent.emit({
      contentId: contentControl.uniqueId
    });
  }
  /** @deprecated in 4.16.0. Unregister {@link UiItemsProvider} to remove a floating widget. */
  dropFloatingContentControl(contentControl) {
    if (!contentControl || !this._floatingContentControls) return;
    const index = this._floatingContentControls.indexOf(contentControl);
    if (index > -1) {
      this._floatingContentControls.splice(index, 1);
      UiFramework.content.onAvailableContentChangedEvent.emit({
        contentId: contentControl.uniqueId
      });
    }
  }
  /** Gets the list of {@link ContentControl}s.
   * @deprecated in 4.16.0. Uses a deprecated class {@link ContentControl}.
   */
  get contentControls() {
    const contentControls = new Array();
    if (this.contentGroup) {
      contentControls.push(...this.contentGroup.getContentControls());
    }
    if (this._floatingContentControls) {
      contentControls.push(...this._floatingContentControls);
    }
    return contentControls;
  }
  /** Sets the active view content control based on the selected viewport.
   * @deprecated in 4.16.0. Use {@link FrameworkContent.setActiveId} instead.
   */
  setActiveViewFromViewport(viewport) {
    const contentControl = this.contentControls.find(
      (control) => control.viewport === viewport
    );
    if (contentControl) {
      UiFramework.content.setActive(contentControl.reactNode, true);
      return true;
    }
    return false;
  }
  /* eslint-enable @typescript-eslint/no-deprecated */
}
function createWidgetDef(config, type) {
  if (!config) return void 0;
  const widgetDef = WidgetDef.create(config, type);
  return widgetDef;
}
function createStagePanelDef(frontstage, location) {
  const config = getStagePanel(location, frontstage);
  const panelDef = new StagePanelDef();
  panelDef.initializeFromConfig(config, location);
  return panelDef;
}
function getStagePanel(location, config) {
  switch (location) {
    case StagePanelLocation.Top:
      return config.topPanel;
    case StagePanelLocation.Left:
      return config.leftPanel;
    case StagePanelLocation.Right:
      return config.rightPanel;
    case StagePanelLocation.Bottom:
      return config.bottomPanel;
  }
}
function useActiveFrontstageDef() {
  const [def, setDef] = reactExports.useState(
    UiFramework.frontstages.activeFrontstageDef
  );
  reactExports.useEffect(() => {
    return UiFramework.frontstages.onFrontstageActivatedEvent.addListener(
      (args) => {
        setDef(args.activatedFrontstageDef);
      }
    );
  }, []);
  return def;
}
const LocalStateStorage = LocalStateStorage$1;
function useUiStateStorageHandler() {
  return reactExports.useContext(UiStateStorageContext);
}
const UiStateStorageContext = reactExports.createContext(
  new LocalStateStorage()
);
UiStateStorageContext.displayName = "uifw:UiStateStorageContext";
function FloatingWidget$1() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FloatingWidget,
    {
      onMouseEnter: UiFramework.visibility.handleWidgetMouseEnter
    }
  );
}
FloatingWidget$1.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "FloatingWidget" };
function Pane(props) {
  const { children, className, split, style, size, eleRef } = props;
  const paneClasses = reactExports.useMemo(
    () => classnames("Pane", split, className),
    [split, className]
  );
  const paneStyle = reactExports.useMemo(() => {
    const baseStyle = {
      flex: 1,
      position: "relative",
      outline: "none"
    };
    if (size !== void 0) {
      if (split === "vertical") {
        baseStyle.width = size;
      } else {
        baseStyle.height = size;
        baseStyle.display = "flex";
      }
      baseStyle.flex = "none";
    }
    return {
      ...style,
      ...baseStyle
    };
  }, [size, split, style]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: eleRef, className: paneClasses, style: paneStyle, children });
}
Pane.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "Pane", "props": { "className": { "required": false, "tsType": { "name": "string" }, "description": "" }, "size": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "" }, "split": { "required": false, "tsType": { "name": "union", "raw": '"vertical" | "horizontal"', "elements": [{ "name": "literal", "value": '"vertical"' }, { "name": "literal", "value": '"horizontal"' }] }, "description": "" }, "style": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "" }, "eleRef": { "required": true, "tsType": { "name": "ReactRefObject", "raw": "React.RefObject<HTMLDivElement | null>", "elements": [{ "name": "union", "raw": "HTMLDivElement | null", "elements": [{ "name": "HTMLDivElement" }, { "name": "null" }] }] }, "description": "" }, "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" } } };
function Resizer(props) {
  const {
    className,
    onClick,
    onDoubleClick,
    onMouseDown,
    onTouchEnd,
    onTouchStart,
    split,
    style
  } = props;
  const resizerClasses = reactExports.useMemo(
    () => classnames(split, className),
    [split, className]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      role: "presentation",
      className: resizerClasses,
      style,
      onMouseDown: (event) => onMouseDown(event.nativeEvent),
      onTouchStart: (event) => {
        onTouchStart(event.nativeEvent);
      },
      onTouchEnd: (event) => {
        event.preventDefault();
        onTouchEnd();
      },
      onClick: (event) => {
        if (onClick) {
          event.preventDefault();
          onClick(event.nativeEvent);
        }
      },
      onDoubleClick: (event) => {
        if (onDoubleClick) {
          event.preventDefault();
          onDoubleClick(event.nativeEvent);
        }
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nz-resizer-grip" })
    }
  );
}
Resizer.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "Resizer", "props": { "split": { "required": false, "tsType": { "name": "union", "raw": '"vertical" | "horizontal"', "elements": [{ "name": "literal", "value": '"vertical"' }, { "name": "literal", "value": '"horizontal"' }] }, "description": "" }, "style": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "" }, "className": { "required": true, "tsType": { "name": "string" }, "description": "" }, "onMouseDown": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(event: MouseEvent) => void", "signature": { "arguments": [{ "type": { "name": "MouseEvent" }, "name": "event" }], "return": { "name": "void" } } }, "description": "" }, "onTouchEnd": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" }, "onTouchStart": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(event: TouchEvent) => void", "signature": { "arguments": [{ "type": { "name": "TouchEvent" }, "name": "event" }], "return": { "name": "void" } } }, "description": "" }, "onClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(event: MouseEvent) => void", "signature": { "arguments": [{ "type": { "name": "MouseEvent" }, "name": "event" }], "return": { "name": "void" } } }, "description": "" }, "onDoubleClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(event: MouseEvent) => void", "signature": { "arguments": [{ "type": { "name": "MouseEvent" }, "name": "event" }], "return": { "name": "void" } } }, "description": "" } } };
function unFocus(ownerDoc) {
  if (!ownerDoc) return;
  const docSelection = ownerDoc.getSelection();
  if (docSelection) {
    docSelection.empty();
  } else {
    try {
      const winSelection = ownerDoc.defaultView?.getSelection();
      winSelection?.removeAllRanges();
    } catch {
    }
  }
}
function getDefaultSize(defaultSize, minSize, maxSize, draggedSize) {
  if (defaultSize !== void 0) {
    return defaultSize;
  }
  return minSize;
}
function removeNullChildren(children) {
  return reactExports.Children.toArray(children).filter((c) => !!c);
}
function SplitPane(props) {
  const {
    style,
    size,
    defaultSize,
    maxSize,
    children,
    paneStyle,
    pane1Style,
    pane2Style,
    className,
    paneClassName,
    pane1ClassName,
    pane2ClassName,
    onDragStarted,
    onDragFinished,
    step,
    onChange,
    onResizerClick,
    onResizerDoubleClick
  } = props;
  const allowResize = reactExports.useMemo(
    () => void 0 !== props.allowResize ? props.allowResize : true,
    [props.allowResize]
  );
  const minSize = reactExports.useMemo(
    () => void 0 !== props.minSize ? props.minSize : 50,
    [props.minSize]
  );
  const primary = reactExports.useMemo(
    () => void 0 !== props.primary ? props.primary : "first",
    [props.primary]
  );
  const split = reactExports.useMemo(
    () => void 0 !== props.split ? props.split : "vertical",
    [props.split]
  );
  const initialSize = size !== void 0 ? size : getDefaultSize(defaultSize, minSize);
  const [position, setPosition] = reactExports.useState(0);
  const [draggedSize, setDraggedSize] = reactExports.useState();
  const [active, setActive] = reactExports.useState(false);
  const [pane1Size, setPane1Size] = reactExports.useState(
    () => primary === "first" ? initialSize : void 0
  );
  const [pane2Size, setPane2Size] = reactExports.useState(
    () => primary === "second" ? initialSize : void 0
  );
  const splitPane = reactExports.useRef(null);
  const pane1 = reactExports.useRef(null);
  const pane2 = reactExports.useRef(null);
  const notNullChildren = reactExports.useMemo(
    () => removeNullChildren(children),
    [children]
  );
  reactExports.useEffect(() => {
    primary === "first" ? setPane1Size(initialSize) : setPane2Size(initialSize);
    primary === "first" ? setPane2Size(void 0) : setPane1Size(void 0);
  }, [initialSize, primary]);
  const splitPaneStyle = reactExports.useMemo(() => {
    const directionSpecificParts = split === "vertical" ? {
      flexDirection: "row",
      left: 0,
      right: 0
    } : {
      bottom: 0,
      flexDirection: "column",
      minHeight: "100%",
      top: 0,
      width: "100%"
    };
    return {
      display: "flex",
      flex: 1,
      height: "100%",
      position: "absolute",
      outline: "none",
      overflow: "hidden",
      MozUserSelect: "text",
      WebkitUserSelect: "text",
      msUserSelect: "text",
      userSelect: "text",
      ...style,
      ...directionSpecificParts
    };
  }, [split, style]);
  const pane1DivStyle = { ...paneStyle, ...pane1Style };
  const pane2DivStyle = { ...paneStyle, ...pane2Style };
  const resizerStyle = reactExports.useMemo(
    () => props.resizerStyle ?? {},
    [props.resizerStyle]
  );
  const resizerClasses = reactExports.useMemo(
    () => classnames("Resizer", !allowResize && "disabled"),
    [allowResize]
  );
  const splitPaneClasses = reactExports.useMemo(
    () => classnames("SplitPane", className, split, !allowResize && "disabled"),
    [className, split, allowResize]
  );
  const pane1Classes = reactExports.useMemo(
    () => classnames("Pane1", paneClassName, pane1ClassName),
    [paneClassName, pane1ClassName]
  );
  const pane2Classes = reactExports.useMemo(
    () => classnames("Pane2", paneClassName, pane2ClassName),
    [paneClassName, pane2ClassName]
  );
  const initializeDrag = reactExports.useCallback(
    (x, y) => {
      unFocus(splitPane.current?.ownerDocument);
      const newPosition = split === "vertical" ? x : y;
      onDragStarted && onDragStarted();
      setActive(true);
      setPosition(newPosition);
    },
    [onDragStarted, split]
  );
  const onTouchStart = reactExports.useCallback(
    (event) => {
      if (allowResize) {
        initializeDrag(event.touches[0].clientX, event.touches[0].clientY);
      }
    },
    [allowResize, initializeDrag]
  );
  const processMove = reactExports.useCallback(
    (x, y) => {
      unFocus(splitPane.current?.ownerDocument);
      const isPrimaryFirst = primary === "first";
      const ref = isPrimaryFirst ? pane1.current : pane2.current;
      const ref2 = isPrimaryFirst ? pane2.current : pane1.current;
      const splitPaneDiv = splitPane.current;
      if (ref && ref2 && splitPaneDiv) {
        const node = ref;
        const node2 = ref2;
        if (node.getBoundingClientRect) {
          const width = node.getBoundingClientRect().width;
          const height = node.getBoundingClientRect().height;
          const current = split === "vertical" ? x : y;
          const oldSize = split === "vertical" ? width : height;
          let positionDelta = position - current;
          if (step) {
            if (Math.abs(positionDelta) < step) {
              return;
            }
            positionDelta = ~~(positionDelta / step) * step;
          }
          let sizeDelta = isPrimaryFirst ? positionDelta : -positionDelta;
          const pane1Order = parseInt(
            node.ownerDocument?.defaultView?.getComputedStyle(node).order ?? "0",
            10
          );
          const pane2Order = parseInt(
            node2.ownerDocument?.defaultView?.getComputedStyle(node2).order ?? "0",
            10
          );
          if (pane1Order > pane2Order) {
            sizeDelta = -sizeDelta;
          }
          let newMaxSize = maxSize;
          if (typeof maxSize === "number" && maxSize !== void 0 && maxSize <= 0) {
            if (split === "vertical") {
              newMaxSize = splitPaneDiv.getBoundingClientRect().width + maxSize;
            } else {
              newMaxSize = splitPaneDiv.getBoundingClientRect().height + maxSize;
            }
          }
          let newSize = oldSize - sizeDelta;
          const newPosition = position - positionDelta;
          if (typeof minSize === "number" && newSize < minSize) {
            newSize = minSize;
          } else if (typeof newMaxSize === "number" && newMaxSize !== void 0 && newSize > newMaxSize) {
            newSize = newMaxSize;
          } else {
            setPosition(newPosition);
          }
          onChange && onChange(newSize);
          setDraggedSize(newSize);
          isPrimaryFirst ? setPane1Size(newSize) : setPane2Size(newSize);
        }
      }
    },
    [maxSize, minSize, onChange, position, primary, split, step]
  );
  const onTouchMove = reactExports.useCallback(
    (event) => {
      if (!allowResize || !active) return;
      processMove(event.touches[0].clientX, event.touches[0].clientY);
    },
    [active, allowResize, processMove]
  );
  const onMouseMove = reactExports.useCallback(
    (event) => {
      if (!allowResize || !active) return;
      processMove(event.clientX, event.clientY);
    },
    [active, allowResize, processMove]
  );
  const onMouseDown = reactExports.useCallback(
    (event) => {
      if (allowResize) {
        event.preventDefault();
        initializeDrag(event.clientX, event.clientY);
      }
    },
    [allowResize, initializeDrag]
  );
  const processResizeFinished = reactExports.useCallback(() => {
    if (void 0 !== draggedSize && allowResize && active) {
      onDragFinished && onDragFinished(draggedSize);
    }
    setActive(false);
  }, [draggedSize, allowResize, active, onDragFinished]);
  const onMouseUp = reactExports.useCallback(
    (event) => {
      event.preventDefault();
      processResizeFinished();
    },
    [processResizeFinished]
  );
  reactExports.useEffect(() => {
    const ownerDoc = splitPane.current?.ownerDocument;
    if (!ownerDoc) return;
    ownerDoc.addEventListener("mouseup", onMouseUp);
    ownerDoc.addEventListener("mousemove", onMouseMove);
    ownerDoc.addEventListener("touchmove", onTouchMove);
    return () => {
      ownerDoc.removeEventListener("mouseup", onMouseUp);
      ownerDoc.removeEventListener("mousemove", onMouseMove);
      ownerDoc.removeEventListener("touchmove", onTouchMove);
    };
  }, [onMouseMove, onMouseUp, onTouchMove]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: splitPaneClasses, ref: splitPane, style: splitPaneStyle, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Pane,
      {
        className: pane1Classes,
        eleRef: pane1,
        size: pane1Size,
        split,
        style: pane1DivStyle,
        children: notNullChildren[0]
      },
      "pane1"
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Resizer,
      {
        className: resizerClasses,
        onClick: onResizerClick,
        onDoubleClick: onResizerDoubleClick,
        onMouseDown,
        onTouchStart,
        onTouchEnd: processResizeFinished,
        split,
        style: resizerStyle
      },
      "resizer"
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Pane,
      {
        className: pane2Classes,
        eleRef: pane2,
        size: pane2Size,
        split,
        style: pane2DivStyle,
        children: notNullChildren[1]
      },
      "pane2"
    )
  ] });
}
SplitPane.__docgenInfo = { "description": "Local TypeScript implementation of `SplitPane` from `react-split-pane` package since that\npackage is not regularly maintained.\nSee https://github.com/tomkp/react-split-pane/blob/master/LICENSE.\n@public", "methods": [], "displayName": "SplitPane", "props": { "allowResize": { "required": false, "tsType": { "name": "boolean" }, "description": "Pass false to disable resizing" }, "children": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "ReactReactNode", "raw": "React.ReactNode" }], "raw": "React.ReactNode[]" }, "description": "The array of two react nodes, one for each pane." }, "primary": { "required": false, "tsType": { "name": "union", "raw": '"first" | "second"', "elements": [{ "name": "literal", "value": '"first"' }, { "name": "literal", "value": '"second"' }] }, "description": "Determines which pane maintains its size when browser window is resized." }, "minSize": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "" }, "maxSize": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "You can limit the maximal size of the 'fixed' pane using the maxSize parameter with a positive value\n(measured in pixels but state just a number). If you wrap the SplitPane into a container component\n(yes you can, just remember the container has to have the relative or absolute positioning), then you'll need to limit\n the movement of the splitter (resizer) at the end of the SplitPane (otherwise it can be dragged outside the SplitPane\nand you don't catch it never more). For this purpose use the maxSize parameter with value 0. When dragged the splitter/resizer\nwill stop at the border of the SplitPane component and think this you'll be able to pick it again and drag it back then.\n And more: if you set the maxSize to negative value (e.g. -200), then the splitter stops 200px before the border\n(in other words it sets the minimal size of the 'resizable' pane in this case). This can be useful also in the\nfull-screen case of use." }, "defaultSize": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "Default initial size of primary pane" }, "size": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "Size of primary pane" }, "step": { "required": false, "tsType": { "name": "number" }, "description": "You can use the step prop to only allow resizing in fixed increments." }, "split": { "required": false, "tsType": { "name": "union", "raw": '"vertical" | "horizontal"', "elements": [{ "name": "literal", "value": '"vertical"' }, { "name": "literal", "value": '"horizontal"' }] }, "description": "" }, "onDragStarted": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "This callback is invoked when a drag start." }, "onDragFinished": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(newSize: number) => void", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "newSize" }], "return": { "name": "void" } } }, "description": "This callback is invoked when a drag ends." }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(newSize: number) => void", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "newSize" }], "return": { "name": "void" } } }, "description": "Callback is invoked with the current drag during a drag event." }, "onResizerClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(event: MouseEvent) => void", "signature": { "arguments": [{ "type": { "name": "MouseEvent" }, "name": "event" }], "return": { "name": "void" } } }, "description": "Callback is invoked if user clicks on Resizer." }, "onResizerDoubleClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(event: MouseEvent) => void", "signature": { "arguments": [{ "type": { "name": "MouseEvent" }, "name": "event" }], "return": { "name": "void" } } }, "description": "Callback is invoked if user double clicks on Resizer." }, "style": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Styling to be applied to the main container" }, "paneStyle": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Styling to be applied to both panes" }, "pane1Style": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Styling to be applied to the first pane, with precedence over paneStyle" }, "pane2Style": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Styling to be applied to the second pane, with precedence over paneStyle" }, "resizerStyle": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Styling to be applied to the resizer bar" }, "className": { "required": false, "tsType": { "name": "string" }, "description": "Class name to be added to the SplitPane div" }, "paneClassName": { "required": false, "tsType": { "name": "string" }, "description": "Class name to be added to each Pane's div" }, "pane1ClassName": { "required": false, "tsType": { "name": "string" }, "description": "Class name to be added to Pane1's div" }, "pane2ClassName": { "required": false, "tsType": { "name": "string" }, "description": "Class name to be added to Pane2's div" } } };
const useContentOverlayStore = create(() => 0);
function ContentOverlay({
  className,
  children,
  active,
  ...other
}) {
  useTrackContentOverlay();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: classnames("uifw-content-contentOverlay", className),
      onMouseMove: UiFramework.visibility.handleContentMouseMove,
      onMouseLeave: UiFramework.visibility.handleContentMouseLeave,
      ...other,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: classnames(
              "uifw-content-contentOverlay_activeStrip",
              active && "uifw-active"
            )
          }
        )
      ]
    }
  );
}
function useTrackContentOverlay() {
  const tabId = reactExports.useContext(TabIdContext);
  const visible = useOptionalLayout((state) => {
    if (!state) return true;
    if (!tabId) return true;
    const widgetState = getWidgetState(tabId, state);
    if (widgetState === WidgetState.Hidden) return false;
    return true;
  });
  reactExports.useEffect(() => {
    if (!visible) return;
    useContentOverlayStore.setState((prev) => prev + 1);
    return () => {
      useContentOverlayStore.setState((prev) => prev - 1);
    };
  }, [visible]);
}
ContentOverlay.__docgenInfo = { "description": "Overlay used to identify active content views.\nThis component is treated as part of the application content and integrates with the `UiFramework.visibility` system to handle mouse events appropriately.\n@beta", "methods": [], "displayName": "ContentOverlay", "props": { "active": { "required": false, "tsType": { "name": "boolean" }, "description": "Describes if the content is active." } } };
function useConditionalValue(getValue, eventIds) {
  const [value, setValue] = reactExports.useState(() => getValue());
  const getValueRef = reactExports.useRef(getValue);
  reactExports.useEffect(() => {
    getValueRef.current = getValue;
  }, [getValue]);
  const eventIdsRef = reactExports.useRef(eventIds);
  reactExports.useEffect(() => {
    eventIdsRef.current = eventIds;
  }, [eventIds]);
  reactExports.useEffect(() => {
    return SyncUiEventDispatcher.onSyncUiEvent.addListener((args) => {
      if (!SyncUiEventDispatcher.hasEventOfInterest(
        args.eventIds,
        eventIdsRef.current
      ))
        return;
      setValue(getValueRef.current());
    });
  }, []);
  return value;
}
function ContentWrapper(props) {
  const { content, contentIndex } = props;
  const activeFrontstageDef = useActiveFrontstageDef();
  const [isActive, setIsActive] = reactExports.useState(() => {
    return content === UiFramework.content.getActive();
  });
  const contentControlKey = (contentControl) => {
    let controlId;
    if (contentControl && contentControl.key) {
      const key = contentControl.key;
      controlId = key.split("::", 1)[0];
    }
    return controlId;
  };
  const [hasMultipleContents, setHasMultipleContents] = reactExports.useState(
    () => activeFrontstageDef && // eslint-disable-next-line @typescript-eslint/no-deprecated
    !!activeFrontstageDef.floatingContentControls?.length || // eslint-disable-next-line @typescript-eslint/no-deprecated
    (activeFrontstageDef?.contentGroup?.getContentControls().length ?? 0) > 1
  );
  reactExports.useEffect(() => {
    setIsActive(content === UiFramework.content.getActive());
  }, [content]);
  reactExports.useEffect(() => {
    return UiFramework.content.onActiveContentChangedEvent.addListener(
      (args) => {
        const contentIsIdentical = content === args.activeContent;
        if (contentIsIdentical) {
          setIsActive(contentIsIdentical);
        } else {
          const contentId = contentControlKey(content);
          const activeContentId = contentControlKey(args.activeContent);
          setIsActive(!!contentId && contentId === activeContentId);
        }
        setHasMultipleContents(
          activeFrontstageDef && // eslint-disable-next-line @typescript-eslint/no-deprecated
          !!activeFrontstageDef.floatingContentControls?.length || // eslint-disable-next-line @typescript-eslint/no-deprecated
          (activeFrontstageDef?.contentGroup?.getContentControls().length ?? 0) > 1
        );
      }
    );
  }, [activeFrontstageDef, content]);
  const handleMouseDown = reactExports.useCallback(() => {
    UiFramework.content.setActive(content);
    setIsActive(true);
  }, [content]);
  reactExports.useEffect(() => {
    return UiFramework.content.onAvailableContentChangedEvent.addListener(
      () => {
        setHasMultipleContents(
          activeFrontstageDef && // eslint-disable-next-line @typescript-eslint/no-deprecated
          !!activeFrontstageDef.floatingContentControls?.length || // eslint-disable-next-line @typescript-eslint/no-deprecated
          (activeFrontstageDef?.contentGroup?.getContentControls().length ?? 0) > 1
        );
      }
    );
  }, [activeFrontstageDef]);
  const renderActiveStrip = useRenderActiveStrip(contentIndex);
  const contentOverlays = useContentOverlayStore();
  const active = renderActiveStrip !== void 0 ? renderActiveStrip : isActive && (hasMultipleContents || contentOverlays > 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ContentOverlay,
    {
      className: classnames("uifw-contentlayout-wrapper", props.className),
      style: props.style,
      active,
      onMouseDown: handleMouseDown,
      role: "presentation",
      children: content
    }
  );
}
function useRenderActiveStrip(contentIndex) {
  const contentGroup = reactExports.useContext(ContentLayoutContext);
  const contentProps = contentIndex === void 0 ? void 0 : contentGroup?.contentPropsList[contentIndex];
  const renderActiveStrip = contentProps?.renderActiveStrip;
  const getValue = reactExports.useCallback(() => {
    if (renderActiveStrip === void 0) return void 0;
    if (typeof renderActiveStrip === "boolean") return renderActiveStrip;
    return renderActiveStrip.getValue();
  }, [renderActiveStrip]);
  const eventIds = reactExports.useMemo(() => {
    if (renderActiveStrip === void 0) return [];
    if (typeof renderActiveStrip === "boolean") return [];
    return renderActiveStrip.eventIds;
  }, [renderActiveStrip]);
  return useConditionalValue(getValue, eventIds);
}
class SplitContainer extends reactExports.Component {
  _containerDiv = null;
  constructor(props) {
    super(props);
  }
  _onSplitterChange = (size) => {
    let percentage = 0;
    if (this._containerDiv && size > 0) {
      if (this.props.orientation === Orientation.Horizontal) {
        const height = this._containerDiv.getBoundingClientRect().height;
        if (height > 0) percentage = size / height;
      } else {
        const width = this._containerDiv.getBoundingClientRect().width;
        if (width > 0) percentage = size / width;
      }
      if (this.props.onSplitterChange)
        this.props.onSplitterChange(size, percentage);
    }
  };
  render() {
    const orientation = this.props.orientation === Orientation.Horizontal ? "horizontal" : "vertical";
    const defaultSize = `${(this.props.percentage * 100).toString()}%`;
    const minSizeTopLeft = this.props.minSizeTopLeft;
    const minSizeBottomRight = -this.props.minSizeBottomRight;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: (e) => {
          this._containerDiv = e;
        },
        className: classnames(
          "uifw-contentlayout-full-size",
          this.props.className
        ),
        style: this.props.style,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          SplitPane,
          {
            split: orientation,
            minSize: minSizeTopLeft,
            maxSize: minSizeBottomRight,
            defaultSize,
            onChange: this._onSplitterChange,
            allowResize: this.props.resizable,
            children: [
              this.props.contentA,
              this.props.contentB
            ]
          }
        )
      }
    );
  }
}
class SingleContentContainer extends reactExports.Component {
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: classnames(
          "uifw-contentlayout-full-size",
          this.props.className
        ),
        style: this.props.style,
        "data-testid": "single-content-container",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ContentWrapper,
          {
            content: this.props.content,
            style: { height: "100%", position: "relative" },
            contentIndex: this.props.contentIndex
          }
        )
      }
    );
  }
}
const MIN_SPLIT_SIZE = 6;
class BaseSplit {
  defaultPercentage;
  stateId = "";
  isLocked = false;
  constructor(props) {
    this.defaultPercentage = props.percentage;
    if (props.id) this.stateId = props.id;
    if (props.lock) this.isLocked = props.lock;
  }
}
class HorizontalSplit extends BaseSplit {
  _topIndex = -1;
  _bottomIndex = -1;
  _topSplit;
  _bottomSplit;
  _props;
  _minSizeTop = MIN_SPLIT_SIZE;
  _minSizeBottom = MIN_SPLIT_SIZE;
  constructor(props) {
    super(props);
    this._props = props;
    if (typeof props.top === "number") {
      this._topIndex = props.top;
    } else {
      this._topSplit = ContentLayoutDef.createSplit(props.top);
    }
    if (typeof props.bottom === "number") {
      this._bottomIndex = props.bottom;
    } else {
      this._bottomSplit = ContentLayoutDef.createSplit(props.bottom);
    }
    if (props.minSizeTop)
      this._minSizeTop = Math.max(props.minSizeTop, MIN_SPLIT_SIZE);
    if (props.minSizeBottom)
      this._minSizeBottom = Math.max(props.minSizeBottom, MIN_SPLIT_SIZE);
  }
  _handleSplitterChange = (_size, percentage) => {
    this._props.percentage = percentage;
  };
  createContentContainer(contentNodes, resizable) {
    if (this.isLocked) resizable = false;
    const topContent = !this._topSplit ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      ContentWrapper,
      {
        content: contentNodes[this._topIndex],
        contentIndex: this._topIndex
      }
    ) : this._topSplit.createContentContainer(contentNodes, resizable);
    const bottomContent = !this._bottomSplit ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      ContentWrapper,
      {
        content: contentNodes[this._bottomIndex],
        contentIndex: this._bottomIndex
      }
    ) : this._bottomSplit.createContentContainer(contentNodes, resizable);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SplitContainer,
      {
        contentA: topContent,
        contentB: bottomContent,
        orientation: Orientation.Horizontal,
        percentage: this.defaultPercentage,
        resizable,
        minSizeTopLeft: this._minSizeTop,
        minSizeBottomRight: this._minSizeBottom,
        splitterStateId: this.stateId,
        onSplitterChange: this._handleSplitterChange
      }
    );
  }
}
class VerticalSplit extends BaseSplit {
  _leftIndex = -1;
  _rightIndex = -1;
  _leftSplit;
  _rightSplit;
  _props;
  _minSizeLeft = MIN_SPLIT_SIZE;
  _minSizeRight = MIN_SPLIT_SIZE;
  constructor(props) {
    super(props);
    this._props = props;
    if (typeof props.left === "number") {
      this._leftIndex = props.left;
    } else {
      this._leftSplit = ContentLayoutDef.createSplit(props.left);
    }
    if (typeof props.right === "number") {
      this._rightIndex = props.right;
    } else {
      this._rightSplit = ContentLayoutDef.createSplit(props.right);
    }
    if (props.minSizeLeft)
      this._minSizeLeft = Math.max(props.minSizeLeft, MIN_SPLIT_SIZE);
    if (props.minSizeRight)
      this._minSizeRight = Math.max(props.minSizeRight, MIN_SPLIT_SIZE);
  }
  _handleSplitterChange = (_size, percentage) => {
    this._props.percentage = percentage;
  };
  createContentContainer(contentNodes, resizable) {
    if (this.isLocked) resizable = false;
    const leftContent = !this._leftSplit ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      ContentWrapper,
      {
        content: contentNodes[this._leftIndex],
        contentIndex: this._leftIndex
      }
    ) : this._leftSplit.createContentContainer(contentNodes, resizable);
    const rightContent = !this._rightSplit ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      ContentWrapper,
      {
        content: contentNodes[this._rightIndex],
        contentIndex: this._rightIndex
      }
    ) : this._rightSplit.createContentContainer(contentNodes, resizable);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SplitContainer,
      {
        contentA: leftContent,
        contentB: rightContent,
        orientation: Orientation.Vertical,
        percentage: this.defaultPercentage,
        resizable,
        minSizeTopLeft: this._minSizeLeft,
        minSizeBottomRight: this._minSizeRight,
        splitterStateId: this.stateId,
        onSplitterChange: this._handleSplitterChange
      }
    );
  }
}
class ContentLayoutDef {
  _layoutProps;
  _rootSplit;
  /** ID for this Content Layout */
  id = "";
  /** Description of the layout. */
  description = "";
  constructor(layoutProps) {
    this._layoutProps = layoutProps;
    this.id = layoutProps.id;
    if (layoutProps.description !== void 0)
      this.description = layoutProps.description;
  }
  /** @deprecated in 4.16.0. Used internally. */
  get rootSplit() {
    return this._rootSplit;
  }
  /** Creates [[ContentLayoutProps]] for JSON purposes
   * @public
   */
  toJSON() {
    return this._layoutProps;
  }
  /** Fill a layout container with React nodes for each content view.
   * @deprecated in 4.16.0. Used internally.
   */
  fillLayoutContainer(contentNodes, resizable) {
    this._rootSplit = ContentLayoutDef.createSplit(this._layoutProps);
    if (this.rootSplit) {
      return this.rootSplit.createContentContainer(contentNodes, resizable);
    }
    if (contentNodes.length > 0)
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SingleContentContainer, { content: contentNodes[0], contentIndex: 0 });
    return void 0;
  }
  /** Gets the indexes of content views used in this Content Layout. */
  getUsedContentIndexes() {
    let allContentIndexes = [];
    if (!this._layoutProps.horizontalSplit && !this._layoutProps.verticalSplit)
      allContentIndexes.push(0);
    else {
      allContentIndexes = allContentIndexes.concat(
        this.getHorizontalSplitContentIndexes(this._layoutProps.horizontalSplit)
      );
      allContentIndexes = allContentIndexes.concat(
        this.getVerticalSplitContentIndexes(this._layoutProps.verticalSplit)
      );
    }
    const uniqueContentIndexes = [...new Set(allContentIndexes)];
    return uniqueContentIndexes;
  }
  getHorizontalSplitContentIndexes(splitProps) {
    let contentIndexes = [];
    if (!splitProps) return contentIndexes;
    if (typeof splitProps.top === "number") contentIndexes.push(splitProps.top);
    else {
      contentIndexes = contentIndexes.concat(
        this.getHorizontalSplitContentIndexes(splitProps.top.horizontalSplit)
      );
      contentIndexes = contentIndexes.concat(
        this.getVerticalSplitContentIndexes(splitProps.top.verticalSplit)
      );
    }
    if (typeof splitProps.bottom === "number")
      contentIndexes.push(splitProps.bottom);
    else {
      contentIndexes = contentIndexes.concat(
        this.getHorizontalSplitContentIndexes(splitProps.bottom.horizontalSplit)
      );
      contentIndexes = contentIndexes.concat(
        this.getVerticalSplitContentIndexes(splitProps.bottom.verticalSplit)
      );
    }
    return contentIndexes;
  }
  getVerticalSplitContentIndexes(splitProps) {
    let contentIndexes = [];
    if (!splitProps) return contentIndexes;
    if (typeof splitProps.left === "number")
      contentIndexes.push(splitProps.left);
    else {
      contentIndexes = contentIndexes.concat(
        this.getHorizontalSplitContentIndexes(splitProps.left.horizontalSplit)
      );
      contentIndexes = contentIndexes.concat(
        this.getVerticalSplitContentIndexes(splitProps.left.verticalSplit)
      );
    }
    if (typeof splitProps.right === "number")
      contentIndexes.push(splitProps.right);
    else {
      contentIndexes = contentIndexes.concat(
        this.getHorizontalSplitContentIndexes(splitProps.right.horizontalSplit)
      );
      contentIndexes = contentIndexes.concat(
        this.getVerticalSplitContentIndexes(splitProps.right.verticalSplit)
      );
    }
    return contentIndexes;
  }
  /** @internal */
  static createSplit(fragmentDef) {
    if (fragmentDef.horizontalSplit) {
      return new HorizontalSplit(fragmentDef.horizontalSplit);
    } else if (fragmentDef.verticalSplit) {
      return new VerticalSplit(fragmentDef.verticalSplit);
    }
    return void 0;
  }
}
const ContentLayoutContext = reactExports.createContext(
  void 0
);
ContentLayoutContext.displayName = "uifw:ContentLayoutContext";
ContentWrapper.__docgenInfo = { "description": "ContentWrapper React component.\n@internal", "methods": [], "displayName": "ContentWrapper", "props": { "content": { "required": true, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" }, "contentIndex": { "required": true, "tsType": { "name": "union", "raw": "number | undefined", "elements": [{ "name": "number" }, { "name": "undefined" }] }, "description": "" } }, "composes": ["CommonProps"] };
function ModalFrontstageButton(props) {
  const { translate } = useTranslation();
  const { label: label2, icon, onClick } = props;
  const defaultLabel = translate("modalFrontstage.backButtonTitle");
  const defaultIcon = /* @__PURE__ */ jsxRuntimeExports.jsx(SvgProgressBackwardCircular, {});
  const defaultOnClick = reactExports.useCallback(() => {
    UiFramework.frontstages.closeModalFrontstage();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    IconButton,
    {
      className: "uifw-frontstage-modalFrontstageButton",
      onClick: onClick ?? defaultOnClick,
      label: label2 ?? defaultLabel,
      iconProps: {
        className: "uifw-frontstage-modalFrontstageButton_icon"
      },
      children: icon ?? defaultIcon
    }
  );
}
ModalFrontstageButton.__docgenInfo = { "description": "Button usually shown in the top-left corner of the modal frontstage. By default closes the modal frontstage.\n@public", "methods": [], "displayName": "ModalFrontstageButton", "props": { "children": { "required": false, "tsType": { "name": "never" }, "description": "" }, "icon": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "If specified overrides the default icon." }, "label": { "required": false, "tsType": { "name": "string" }, "description": "If specified overrides the default label." }, "onClick": { "required": false, "tsType": { "name": 'ReactComponentProps["onClick"]', "raw": 'IconButtonProps["onClick"]' }, "description": "If specified overrides the default behavior of closing the modal frontstage." } }, "composes": ["Pick"] };
class ModalFrontstage extends reactExports.Component {
  constructor(props) {
    super(props);
  }
  _onGoBack = () => {
    if (this.props.navigateBack) this.props.navigateBack();
    this.props.closeModal();
  };
  render() {
    const classNames = classnames(
      "uifw-modal-frontstage",
      this.props.isOpen && "uifw-modal-open",
      this.props.className
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: classNames, style: this.props.style, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "uifw-modal-app-bar", children: [
          this.props.backButton ? this.props.backButton : /* @__PURE__ */ jsxRuntimeExports.jsx(ModalFrontstageButton, { onClick: this._onGoBack }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text$1, { variant: "headline", className: "uifw-headline", children: this.props.title }),
          this.props.appBarRight && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uifw-modal-app-bar-right", children: this.props.appBarRight })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "uifw-modal-stage-content", children: this.props.children })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "uifw-modal-frontstage-overlay" })
    ] });
  }
}
ModalFrontstage.__docgenInfo = { "description": "ModalFrontstage React component\n@public", "methods": [], "displayName": "ModalFrontstage", "props": { "title": { "required": true, "tsType": { "name": "string" }, "description": "Title displayed at the top of the modal Frontstage" }, "isOpen": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether the modal Frontstage is open" }, "navigateBack": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => any", "signature": { "arguments": [], "return": { "name": "any" } } }, "description": "Callback for navigating back from the modal Frontstage." }, "closeModal": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "() => any", "signature": { "arguments": [], "return": { "name": "any" } } }, "description": "Callback for closing the modal Frontstage." }, "appBarRight": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "An optional React node displayed in the upper right of the modal Frontstage." }, "backButton": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "If specified overrides the default back button." }, "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Content" } }, "composes": ["CommonProps"] };
function WidgetPanelsTab() {
  const widgetDef = useWidgetDef();
  const iconSpec = widgetDef?.initialConfig?.icon;
  const icon = widgetDef?.initialConfig?.iconNode ?? (iconSpec ? (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$2, { iconSpec })
  ) : void 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    WidgetTab,
    {
      badge: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge$1, { type: widgetDef?.badgeKind || widgetDef?.badgeType }),
      icon
    }
  );
}
WidgetPanelsTab.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "WidgetPanelsTab" };
const subscribe = (onStoreChange) => {
  return IModelApp.toolAdmin.activeToolChanged.addListener(onStoreChange);
};
const getSnapshot = () => {
  return IModelApp.toolAdmin.activeTool;
};
function useActiveTool() {
  const activeTool = reactExports.useSyncExternalStore(subscribe, getSnapshot);
  return activeTool;
}
function useActiveToolId() {
  const activeTool = useActiveTool();
  return activeTool?.toolId;
}
const LockContext = reactExports.createContext(void 0);
function LockProvider({ children }) {
  const [lockDecorations, setLockDecorations] = reactExports.useState({});
  const setLockDecoration = reactExports.useCallback(
    (propertyName, lockDecoration) => {
      setLockDecorations(
        produce((draft) => {
          if (lockDecoration) {
            draft[propertyName] = true;
            return;
          }
          delete draft[propertyName];
        })
      );
    },
    []
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    LockContext.Provider,
    {
      value: reactExports.useMemo(
        () => ({
          lockDecorations,
          setLockDecoration
        }),
        [lockDecorations, setLockDecoration]
      ),
      children
    }
  );
}
const PropertyEditorContext = reactExports.createContext(void 0);
function PropertyEditorProvider(props) {
  const { children, uiDataProvider, itemPropertyName, lockPropertyName } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PropertyEditorContext.Provider,
    {
      value: reactExports.useMemo(
        () => ({
          uiDataProvider,
          itemPropertyName,
          lockPropertyName
        }),
        [uiDataProvider, itemPropertyName, lockPropertyName]
      ),
      children
    }
  );
}
function useLockDecoration() {
  const { lockPropertyName, itemPropertyName, uiDataProvider } = reactExports.useContext(PropertyEditorContext) ?? {};
  const { toolSettingsLockButton } = usePreviewFeatures();
  const dialogItem = reactExports.useMemo(
    () => uiDataProvider?.items.find(
      (item) => item.property.name === itemPropertyName
    ),
    [uiDataProvider, itemPropertyName]
  );
  return !!toolSettingsLockButton && !lockPropertyName && !!dialogItem?.lockProperty;
}
function useLockProperty(args) {
  const { provider, itemPropertyName } = args ?? {};
  const subscribe2 = reactExports.useCallback(
    (onStoreChange) => {
      const listeners = provider ? [
        provider.onItemsReloadedEvent.addListener(onStoreChange),
        provider.onSyncPropertiesChangeEvent.addListener(onStoreChange)
      ] : [];
      return () => listeners.forEach((l) => l());
    },
    [provider]
  );
  const getSnapshot2 = reactExports.useCallback(() => {
    const dialogItem = provider?.items.find(
      (item) => item.property.name === itemPropertyName
    );
    return dialogItem?.lockProperty;
  }, [provider, itemPropertyName]);
  return reactExports.useSyncExternalStore(subscribe2, getSnapshot2);
}
function LockButtonInputDecoration() {
  const { itemPropertyName, uiDataProvider: provider } = reactExports.useContext(PropertyEditorContext) ?? {};
  const { setLockDecoration } = reactExports.useContext(LockContext) ?? {};
  const lockDecoration = useLockDecoration();
  const lockProperty = useLockProperty(
    provider && itemPropertyName ? {
      provider,
      itemPropertyName
    } : void 0
  );
  reactExports.useLayoutEffect(() => {
    if (!lockDecoration) return;
    if (!setLockDecoration) return;
    if (!itemPropertyName) return;
    setLockDecoration(itemPropertyName, true);
    return () => {
      setLockDecoration(itemPropertyName, false);
    };
  }, [setLockDecoration, itemPropertyName, lockDecoration]);
  if (!lockDecoration) return null;
  const isLocked = !!lockProperty?.value.value;
  const displayLabel = lockProperty?.property.displayLabel;
  const label2 = displayLabel ? displayLabel : "Toggle lock";
  const disabled = lockProperty?.isDisabled;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    InputWithDecorations.Button,
    {
      isActive: isLocked,
      label: label2,
      disabled,
      size: "small",
      styleType: "borderless",
      onClick: () => {
        if (!provider) return;
        if (!lockProperty) return;
        provider.applyUiPropertyChange({
          value: {
            ...lockProperty.value,
            value: !isLocked
          },
          propertyName: lockProperty.property.name
        });
        provider.reloadDialogItems();
      },
      children: isLocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(SvgLock, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(SvgLockUnlocked, {})
    }
  );
}
LockProvider.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "LockProvider" };
PropertyEditorProvider.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "PropertyEditorProvider", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" } }, "composes": ["NonNullable"] };
LockButtonInputDecoration.__docgenInfo = { "description": "This component displays a lock button in the property editor when the `toolSettingsLockButton` preview feature is enabled.\n@alpha", "methods": [], "displayName": "LockButtonInputDecoration" };
reactExports.forwardRef(
  function LockEditor2(props, forwardedRef) {
    const ref = reactExports.useRef(null);
    const getCurrentValue = () => {
      if (props.propertyRecord && props.propertyRecord.value.valueFormat === PropertyValueFormat.Primitive) {
        return props.propertyRecord.value.value;
      }
      return false;
    };
    const currentValue = getCurrentValue();
    reactExports.useImperativeHandle(
      forwardedRef,
      () => ({
        getPropertyValue: async () => {
          let propertyValue;
          if (props.propertyRecord && props.propertyRecord.value.valueFormat === PropertyValueFormat.Primitive) {
            propertyValue = {
              valueFormat: PropertyValueFormat.Primitive,
              value: currentValue,
              displayValue: ""
            };
          }
          return propertyValue;
        },
        htmlElement: ref.current,
        hasFocus: document.activeElement === ref.current
      }),
      [currentValue, props.propertyRecord]
    );
    const displayLabel = props.propertyRecord?.property.displayLabel;
    const label2 = displayLabel ? displayLabel : "Toggle lock";
    const disabled = props.propertyRecord?.isDisabled;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      IconButton,
      {
        ref,
        label: label2,
        size: "small",
        styleType: "borderless",
        isActive: currentValue,
        disabled,
        onClick: () => {
          if (!props.propertyRecord || !props.onCommit) return;
          props.onCommit({
            propertyRecord: props.propertyRecord,
            newValue: {
              valueFormat: PropertyValueFormat.Primitive,
              value: !currentValue,
              displayValue: ""
            }
          });
        },
        children: currentValue ? /* @__PURE__ */ jsxRuntimeExports.jsx(SvgLock, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(SvgLockUnlocked, {})
      }
    );
  }
);
const LockPropertyEditorName = "appui-internal:tool-settings-lock";
const LockEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata) => metadata.type === "bool" && metadata.preferredEditor === LockPropertyEditorName,
  isValueSupported: isBoolean,
  Editor: LockEditor
});
function LockEditor({
  value,
  onChange,
  commit,
  disabled,
  size
}) {
  const context = reactExports.useContext(PropertyEditorContext);
  const property = useLockProperty(
    context ? {
      provider: context.uiDataProvider,
      itemPropertyName: context.itemPropertyName
    } : void 0
  );
  const displayLabel = property?.property.displayLabel;
  const label2 = displayLabel ? displayLabel : "Toggle lock";
  const currentValue = value?.value ?? false;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    IconButton,
    {
      label: label2,
      size,
      styleType: "borderless",
      isActive: currentValue,
      disabled,
      onClick: () => {
        const newValue = { value: !currentValue };
        onChange(newValue);
        commit?.();
      },
      children: currentValue ? /* @__PURE__ */ jsxRuntimeExports.jsx(SvgLock, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(SvgLockUnlocked, {})
    }
  );
}
const TextEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata) => metadata.type === "string",
  isValueSupported: isText,
  Editor: TextEditor
});
function TextEditor({
  value,
  onChange,
  size,
  disabled
}) {
  const currentValue = value ? value : { value: "" };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(InputWithDecorations, { size, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      InputWithDecorations.Input,
      {
        value: currentValue.value,
        onChange: (e) => onChange({ value: e.target.value }),
        size,
        disabled
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LockButtonInputDecoration, {})
  ] });
}
const NumericEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata) => metadata.type === "number",
  isValueSupported: isNumeric,
  Editor: NumericEditor
});
function NumericEditor({
  value,
  onChange,
  size,
  disabled
}) {
  const currentValue = getNumericValue(value);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(InputWithDecorations, { size, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      InputWithDecorations.Input,
      {
        value: currentValue.displayValue,
        onChange: (e) => {
          const parsedValue = parseFloat(e.target.value);
          onChange({
            rawValue: Number.isNaN(parsedValue) ? void 0 : parseFloat(e.target.value),
            displayValue: e.target.value
          });
        },
        size,
        disabled
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LockButtonInputDecoration, {})
  ] });
}
function getNumericValue(value) {
  return value ? value : { rawValue: void 0, displayValue: "" };
}
const CustomNumberEditorSpec = {
  ...CustomNumberEditorSpec$1,
  Editor: CustomNumberEditor
};
function CustomNumberEditor(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CustomNumberEditor$1,
    {
      ...props,
      decoration: /* @__PURE__ */ jsxRuntimeExports.jsx(LockButtonInputDecoration, {})
    }
  );
}
function useLockButtonPropertyRecord(record, enabled) {
  const { toolSettingsLockButton } = usePreviewFeatures();
  return reactExports.useMemo(() => {
    if (!enabled) return record;
    if (!toolSettingsLockButton) return record;
    if (!isDefaultLockEditor(record.property)) return record;
    const newRecord = record.copyWithNewValue(record.value, {
      ...record.property,
      editor: {
        ...record.property.editor,
        name: LockPropertyEditorName
      }
    });
    return newRecord;
  }, [enabled, toolSettingsLockButton, record]);
}
function isDefaultLockEditor(property) {
  if (property.typename !== StandardTypeNames.Bool.valueOf() && property.typename !== StandardTypeNames.Boolean.valueOf())
    return false;
  if (property.editor?.name) return false;
  return true;
}
function ToolSettingsEditorsProvider({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    EditorsRegistryProvider,
    {
      editors: reactExports.useCallback((editors) => {
        return [
          ...editors,
          CustomNumberEditorSpec,
          LockEditorSpec,
          TextEditorSpec,
          NumericEditorSpec
        ];
      }, []),
      children
    }
  );
}
ToolSettingsEditorsProvider.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "ToolSettingsEditorsProvider" };
const ToolSettingsContext = reactExports.createContext(false);
function EmptyToolSettingsLabel({ toolId }) {
  const { translate } = useTranslation();
  const tool = toolId ? IModelApp.tools.find(toolId) : void 0;
  const toolName = tool?.flyover;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Text$1, { as: "i", isMuted: true, className: "uifw-toolSettings-label-empty", children: [
    translate("tools.noToolSettingsStart"),
    toolName || translate("tools.noToolSettingsPlaceholderName"),
    translate("tools.noToolSettingsEnd")
  ] });
}
function useToolSettingsNode() {
  reactExports.useEffect(() => {
    UiFramework.frontstages.activeToolInformation?.toolUiProvider?.reloadPropertiesFromTool();
  }, []);
  const [settings2, setSettings] = reactExports.useState(
    InternalFrontstageManager.activeToolSettingsProvider?.toolSettingsNode
  );
  reactExports.useEffect(() => {
    return UiFramework.frontstages.onToolActivatedEvent.addListener(() => {
      const nodes = InternalFrontstageManager.activeToolSettingsProvider?.toolSettingsNode;
      setSettings(nodes);
    });
  }, [setSettings]);
  reactExports.useEffect(() => {
    return UiFramework.frontstages.onToolSettingsReloadEvent.addListener(() => {
      const nodes = InternalFrontstageManager.activeToolSettingsProvider?.toolSettingsNode;
      setSettings(nodes);
    });
  }, [setSettings]);
  return settings2;
}
function ToolSettingsContent() {
  const toolSettingsType = useLayout((state) => state.toolSettings?.type);
  if (!toolSettingsType || toolSettingsType === "docked") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ToolSettingsWidgetContent, {});
}
function ToolSettingsWidgetContent() {
  const floatingToolSettingsContainerRef = reactExports.useRef(null);
  const node = useToolSettingsNode();
  const activeToolId = useActiveToolId();
  const forceRefreshKey = useRefreshKey(node);
  const frontstageDef = useActiveFrontstageDef();
  const providerId = InternalFrontstageManager.activeToolSettingsProvider?.uniqueId ?? "none";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-toolsettings-provider": providerId,
      className: "uifw-floating-toolSettings-container",
      ref: floatingToolSettingsContainerRef,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollableWidgetContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ToolSettingsContext.Provider, { value: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ToolSettingsEditorsProvider, { children: node ?? frontstageDef?.activeToolEmptyNode ?? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyToolSettingsLabel, { toolId: activeToolId }) }) }) })
    },
    forceRefreshKey
  );
}
function useRefreshKey(toolSettingNodes) {
  const [forceRefreshKey, setForceRefreshKey] = reactExports.useState(Date.now());
  reactExports.useEffect(() => {
    setForceRefreshKey(Date.now());
  }, [toolSettingNodes]);
  return forceRefreshKey;
}
ToolSettingsContent.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "ToolSettingsContent" };
ToolSettingsWidgetContent.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "ToolSettingsWidgetContent" };
const UiStateStorageStatus = UiStateStorageStatus$1;
createNineZoneState();
const FRONTSTAGE_SETTINGS_NAMESPACE = "uifw-frontstageSettings";
function getFrontstageStateSettingName(frontstageId) {
  return `frontstageState[${frontstageId}]`;
}
class ContentDialogRenderer extends reactExports.PureComponent {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  constructor(props) {
    super(props);
  }
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogRendererBase,
      {
        ...this.props,
        dialogManager: InternalContentDialogManager.dialogManager
      }
    );
  }
}
ContentDialogRenderer.__docgenInfo = { "description": "ContentDialogRenderer React component renders modeless dialogs.\n@public", "methods": [], "displayName": "ContentDialogRenderer" };
const ConfigurableUiContext = reactExports.createContext({});
const WrapperContext = reactExports.createContext(document.body);
function WidgetTabBar(props) {
  const dispatch = reactExports.useContext(NineZoneDispatchContext);
  const id = reactExports.useContext(WidgetIdContext);
  const { widgetActions: widgetActions2 } = reactExports.useContext(ConfigurableUiContext);
  const floatingWidgetId = useFloatingWidgetId();
  const widgetId = floatingWidgetId === void 0 ? id : floatingWidgetId;
  const handleDoubleClick = reactExports.useCallback(() => {
    floatingWidgetId && dispatch({
      type: "FLOATING_WIDGET_CLEAR_USER_SIZED",
      id: floatingWidgetId
    });
  }, [dispatch, floatingWidgetId]);
  const handleActionAreaClick = useDoubleClick(handleDoubleClick);
  const onDrag = reactExports.useCallback(
    (dragBy) => {
      floatingWidgetId !== void 0 && dispatch({
        type: "WIDGET_DRAG",
        dragBy,
        floatingWidgetId
      });
    },
    [dispatch, floatingWidgetId]
  );
  const onDragEnd = reactExports.useCallback(
    (target) => {
      floatingWidgetId !== void 0 && handleActionAreaClick();
      floatingWidgetId !== void 0 && dispatch({
        type: "WIDGET_DRAG_END",
        floatingWidgetId,
        target
      });
    },
    [dispatch, floatingWidgetId, handleActionAreaClick]
  );
  const handleWidgetDragStart = useDragWidget({
    widgetId,
    onDrag,
    onDragEnd
  });
  const containerRef = reactExports.useRef(null);
  const handleDragStart = reactExports.useCallback(
    (initialPointerPosition, pointerPosition) => {
      handleWidgetDragStart({
        initialPointerPosition,
        pointerPosition
      });
    },
    [handleWidgetDragStart]
  );
  const handleTouchStart = reactExports.useCallback(() => {
    floatingWidgetId && dispatch({
      type: "FLOATING_WIDGET_BRING_TO_FRONT",
      id: floatingWidgetId
    });
  }, [dispatch, floatingWidgetId]);
  const ref = useDrag(
    handleDragStart,
    void 0,
    void 0,
    handleTouchStart,
    handleDoubleClick
  );
  const maximizedWidgetHandle = useMaximizedWidgetTabBarHandle();
  const className = classnames(
    "nz-widget-tabBar",
    props.separator && "nz-separator"
  );
  const handleClassName = classnames("nz-handle", maximizedWidgetHandle);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: containerRef, className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: handleClassName, ref }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetTabs, {}),
    widgetActions2 ?? /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetActions, {})
  ] });
}
function useDrag(onDragStart, onDrag, onDragEnd, onTouchStart, onDoubleClick) {
  const doubleClickTimer = reactExports.useRef(new Timer(300));
  const clickCount = reactExports.useRef(0);
  const initialPointerPosition = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    const handleExecute = () => {
      if (clickCount.current === 2) onDoubleClick && onDoubleClick();
      clickCount.current = 0;
    };
    const timer = doubleClickTimer.current;
    timer.setOnExecute(handleExecute);
    return () => {
      timer.setOnExecute(void 0);
    };
  }, [onDoubleClick]);
  const handlePointerDown = reactExports.useCallback(
    (args, e) => {
      initialPointerPosition.current = new Point(args.clientX, args.clientY);
      e.type === "touchstart" && onTouchStart && onTouchStart();
    },
    [onTouchStart]
  );
  const handlePointerMove = reactExports.useCallback(
    (args) => {
      if (initialPointerPosition.current) {
        onDragStart && onDragStart(
          initialPointerPosition.current,
          new Point(args.clientX, args.clientY)
        );
        initialPointerPosition.current = void 0;
        return;
      }
    },
    [onDragStart, onDrag]
  );
  const handlePointerUp = reactExports.useCallback(() => {
    clickCount.current++;
    doubleClickTimer.current.start();
    initialPointerPosition.current = void 0;
  }, [onDragEnd]);
  const ref = usePointerCaptor(
    handlePointerDown,
    handlePointerMove,
    handlePointerUp
  );
  return ref;
}
WidgetTabBar.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "WidgetTabBar", "props": { "separator": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
function WidgetOutline() {
  const hidden = useHidden();
  const className = classnames(
    "nz-outline-widgetOutline",
    hidden && "nz-hidden"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className });
}
function useHidden() {
  const widgetId = reactExports.useContext(WidgetIdContext);
  const targeted = useTargeted();
  const activeHomeState = useSendBackHomeState();
  return reactExports.useMemo(() => {
    if (activeHomeState?.widgetId === widgetId) return false;
    if (!targeted) return true;
    if (isWidgetDropTargetState(targeted) && targeted.widgetId === widgetId)
      return false;
    if (isTabDropTargetState(targeted) && targeted.widgetId === widgetId)
      return false;
    return true;
  }, [targeted, widgetId, activeHomeState]);
}
WidgetOutline.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "WidgetOutline" };
function WidgetTarget() {
  const widgetId = reactExports.useContext(WidgetIdContext);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TargetContainer, { className: "nz-target-widgetTarget", direction: "horizontal", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MergeTarget, { widgetId }) });
}
WidgetTarget.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "WidgetTarget" };
const PanelWidget = reactExports.forwardRef(
  function PanelWidget2({ widgetId }, ref) {
    const side = reactExports.useContext(PanelSideContext);
    const widgetsLength = useLayout((state) => {
      const panel = state.panels[side];
      return panel.widgets.length;
    });
    const minimized = useLayout((state) => {
      const widget2 = getWidgetState$1(state, widgetId);
      return widget2.minimized;
    });
    const horizontal = isHorizontalPanelSide(side);
    const mode = useMode(widgetId);
    const borders = useBorders(widgetId);
    const showTarget = widgetsLength !== 1;
    const className = classnames(
      "nz-widget-panelWidget",
      horizontal && "nz-horizontal",
      `nz-${mode}`,
      borders
    );
    const content = reactExports.useMemo(
      () => /* @__PURE__ */ jsxRuntimeExports.jsxs(WidgetContentContainer, { children: [
        showTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetTarget, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetOutline, {})
      ] }),
      [showTarget]
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetProvider, { id: widgetId, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Widget, { className, ref, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        WidgetTabBar,
        {
          separator: isHorizontalPanelSide(side) ? true : !minimized
        }
      ),
      content
    ] }) });
  }
);
function findFillWidget(state, side) {
  const panelWidgets = state.panels[side].widgets;
  return panelWidgets.find((widgetId) => {
    const widget2 = getWidgetState$1(state, widgetId);
    if (widget2.minimized) return false;
    const tabId = widget2.activeTabId;
    const tab = state.tabs[tabId];
    if (!tab.preferredPanelWidgetSize) return true;
    return false;
  });
}
function useMode(widgetId) {
  const side = reactExports.useContext(PanelSideContext);
  return useLayout((state) => {
    const fillWidget = findFillWidget(state, side);
    if (!fillWidget) {
      const panel = state.panels[side];
      for (let i = panel.widgets.length - 1; i >= 0; i--) {
        const wId = panel.widgets[i];
        const w = getWidgetState$1(state, wId);
        if (w.minimized) continue;
        if (wId === widgetId) return "fill";
        break;
      }
    }
    const widget2 = getWidgetState$1(state, widgetId);
    if (widget2.minimized) return "minimized";
    const tabId = widget2.activeTabId;
    const tab = state.tabs[tabId];
    return tab.preferredPanelWidgetSize ? "fit" : "fill";
  });
}
function useBorders(widgetId) {
  const side = reactExports.useContext(PanelSideContext);
  return useLayout((state) => {
    const panels = state.panels;
    const panel = panels[side];
    const toolSettings = state.toolSettings;
    const isHorizontal = isHorizontalPanelSide(panel.side);
    const isVertical = !isHorizontal;
    const isFirst = panel.widgets[0] === widgetId;
    const isLast = panel.widgets[panel.widgets.length - 1] === widgetId;
    const isTopMostPanelBorder = panel.side === "top" || isVertical && !panels.top.span || isVertical && panels.top.span && panels.top.collapsed || isVertical && panels.top.widgets.length === 0;
    let top = true;
    let bottom = true;
    let left = true;
    let right = true;
    if (panel.side === "bottom") {
      bottom = false;
    }
    if (isVertical && isLast) {
      bottom = false;
    }
    if (isTopMostPanelBorder && toolSettings?.type === "docked") {
      top = false;
    }
    if (isVertical && !isFirst) {
      top = false;
    }
    if (isVertical && panels.top.span && !panels.top.collapsed && panels.top.widgets.length > 0) {
      top = false;
    }
    if (isHorizontal && !isFirst) {
      left = false;
    }
    if (isHorizontalPanelState(panel) && !panel.span && isFirst && !panels.left.collapsed && panels.left.widgets.length > 0) {
      left = false;
    }
    if (isHorizontalPanelState(panel) && !panel.span && isLast && !panels.right.collapsed && panels.right.widgets.length > 0) {
      right = false;
    }
    return {
      "nz-border-top": top,
      "nz-border-bottom": bottom,
      "nz-border-left": left,
      "nz-border-right": right
    };
  }, true);
}
PanelWidget.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "PanelWidget", "props": { "widgetId": { "required": true, "tsType": { "name": 'WidgetState["id"]', "raw": 'WidgetState["id"]' }, "description": "" } } };
const PanelSideContext = reactExports.createContext(
  void 0
);
PanelSideContext.displayName = "nz:PanelSideContext";
const WidgetPanelContext = reactExports.createContext(void 0);
WidgetPanelContext.displayName = "nz:WidgetPanelContext";
const isHorizontalPanelSide = (side) => {
  return side === "top" || side === "bottom";
};
const panelSides = ["left", "right", "top", "bottom"];
function WidgetContentContainer(props) {
  const widgetId = reactExports.useContext(WidgetIdContext);
  const widgetContentManager = reactExports.useContext(WidgetContentManagerContext);
  const side = reactExports.useContext(PanelSideContext);
  const { minimized, activeTabId } = useLayout((state) => {
    const widget2 = getWidgetState$1(state, widgetId);
    return { minimized: widget2.minimized, activeTabId: widget2.activeTabId };
  }, true);
  const ref = reactExports.useCallback(
    (instance) => {
      if (!widgetContentManager) return;
      widgetContentManager.setContainer(activeTabId, instance ?? void 0);
    },
    [widgetContentManager, activeTabId]
  );
  const className = classnames(
    "nz-widget-contentContainer",
    void 0 === side && minimized && "nz-minimized"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nz-content", ref }),
    props.children
  ] });
}
WidgetContentContainer.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "WidgetContentContainer", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" } } };
function FloatingWidget(props) {
  const uiIsVisible = reactExports.useContext(UiIsVisibleContext);
  const id = useFloatingWidgetId();
  const {
    autoSized,
    bounds,
    hideWithUiWhenFloating,
    isToolSettingsTab,
    minimized,
    resizable
  } = useFloatingWidgetState();
  const hideFloatingWidget = !uiIsVisible && hideWithUiWhenFloating;
  const item = reactExports.useMemo(
    () => ({
      id,
      type: "widget"
    }),
    [id]
  );
  const dragged = useIsDraggedItem(item);
  const ref = useHandleAutoSize(dragged);
  const maximizedWidget = useMaximizedFloatingWidget();
  const className = classnames(
    "nz-widget-floatingWidget",
    dragged && "nz-dragged",
    isToolSettingsTab && "nz-floating-toolSettings",
    minimized && "nz-minimized",
    hideFloatingWidget && "nz-hidden",
    maximizedWidget.classNames
  );
  const style = reactExports.useMemo(() => {
    const boundsRect = Rectangle.create(bounds);
    const { height, width } = boundsRect.getSize();
    const position = boundsRect.topLeft();
    return {
      transform: `translate(${position.x}px, ${position.y}px)`,
      height: minimized || autoSized ? void 0 : height,
      width: autoSized ? void 0 : width,
      maxHeight: autoSized ? "60%" : void 0,
      maxWidth: autoSized ? "60%" : void 0
    };
  }, [autoSized, bounds, minimized]);
  const content = reactExports.useMemo(
    () => /* @__PURE__ */ jsxRuntimeExports.jsxs(WidgetContentContainer, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetTarget, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetOutline, {})
    ] }),
    []
  );
  const handles = reactExports.useMemo(
    () => resizable && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingWidgetHandle, { handle: "left" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingWidgetHandle, { handle: "top" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingWidgetHandle, { handle: "right" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingWidgetHandle, { handle: "bottom" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingWidgetHandle, { handle: "topLeft" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingWidgetHandle, { handle: "topRight" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingWidgetHandle, { handle: "bottomLeft" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingWidgetHandle, { handle: "bottomRight" })
    ] }),
    [resizable]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Widget,
    {
      className,
      widgetId: id,
      style: {
        ...style,
        ...maximizedWidget.style
      },
      ref,
      onMouseEnter: props.onMouseEnter,
      onMouseLeave: props.onMouseLeave,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetTabBar, { separator: !minimized }),
        content,
        handles
      ]
    }
  );
}
function useFloatingWidgetState() {
  const id = useFloatingWidgetId();
  return useLayout((state) => {
    const widget2 = getWidgetState$1(state, id);
    const floatingWidget = state.floatingWidgets.byId[id];
    const tabs2 = widget2.tabs;
    const activeTabId = widget2.activeTabId;
    const activeTab = state.tabs[activeTabId];
    const userSized = floatingWidget.userSized;
    const singleTab = 1 === tabs2.length;
    const toolSettingsTabId = state.toolSettings?.tabId;
    const isToolSettingsTab = widget2.tabs[0] === toolSettingsTabId;
    const resizable = !!floatingWidget.resizable && !isToolSettingsTab;
    const autoSized = singleTab && !userSized;
    return {
      autoSized,
      bounds: floatingWidget.bounds,
      hideWithUiWhenFloating: activeTab.hideWithUiWhenFloating,
      isToolSettingsTab,
      minimized: widget2.minimized,
      resizable
    };
  }, true);
}
function useHandleAutoSize(dragged) {
  const dragManager = reactExports.useContext(DragManagerContext);
  const dispatch = reactExports.useContext(NineZoneDispatchContext);
  const measureNz = reactExports.useContext(MeasureContext);
  const id = useFloatingWidgetId();
  const userSized = useLayout(
    (state) => state.floatingWidgets.byId[id].userSized
  );
  const maximizedWidget = useIsMaximizedWidget();
  const updatePosition = reactExports.useRef(true);
  const ref = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    if (!updatePosition.current) return;
    if (!dragged) return;
    if (maximizedWidget) return;
    if (!dragManager.draggedItem) return;
    if (!ref.current) return;
    let bounds = Rectangle.create(ref.current.getBoundingClientRect());
    const nzBounds = measureNz();
    const pointerPosition = dragManager.draggedItem.info.pointerPosition;
    if (bounds.containsPoint(pointerPosition)) return;
    if (pointerPosition.x > bounds.right) {
      const offset = pointerPosition.x - bounds.right + 20;
      bounds = bounds.offsetX(offset);
    }
    bounds = bounds.offset({ x: -nzBounds.left, y: -nzBounds.top });
    dispatch({
      type: "FLOATING_WIDGET_SET_BOUNDS",
      id,
      bounds: bounds.toProps()
    });
    dispatch({
      type: "FLOATING_WIDGET_SET_USER_SIZED",
      id,
      userSized: true
    });
    updatePosition.current = false;
  }, [dragged, dragManager, dispatch, id, measureNz, maximizedWidget]);
  const handleResize = reactExports.useCallback(() => {
    if (!ref.current) return;
    if (dragged) return;
    if (maximizedWidget) return;
    if (userSized) return;
    let bounds = Rectangle.create(ref.current.getBoundingClientRect());
    const nzBounds = measureNz();
    bounds = bounds.offset({ x: -nzBounds.left, y: -nzBounds.top });
    dispatch({
      type: "FLOATING_WIDGET_SET_BOUNDS",
      id,
      bounds
    });
  }, [dispatch, dragged, id, userSized, measureNz, maximizedWidget]);
  const roRef = useResizeObserver(handleResize);
  const refs = useRefs(ref, roRef);
  return refs;
}
function FloatingWidgetHandle(props) {
  const dispatch = reactExports.useContext(NineZoneDispatchContext);
  const id = useFloatingWidgetId();
  const { handle } = props;
  const relativePosition = reactExports.useRef(new Point());
  const onDrag = reactExports.useCallback(
    (pointerPosition) => {
      assert(!!ref.current);
      const bounds = Rectangle.create(ref.current.getBoundingClientRect());
      const newRelativePosition = bounds.topLeft().getOffsetTo(pointerPosition);
      const offset = relativePosition.current.getOffsetTo(newRelativePosition);
      const resizeBy = getResizeBy(handle, offset);
      dispatch({
        type: "FLOATING_WIDGET_RESIZE",
        id,
        resizeBy
      });
    },
    [dispatch, handle, id]
  );
  const handleDragStart = useDragResizeHandle({
    handle,
    widgetId: id,
    onDrag
  });
  const handlePointerDown = reactExports.useCallback(
    (args) => {
      assert(!!ref.current);
      const bounds = Rectangle.create(ref.current.getBoundingClientRect());
      const initialPointerPosition = new Point(args.clientX, args.clientY);
      relativePosition.current = bounds.topLeft().getOffsetTo(initialPointerPosition);
      handleDragStart({
        initialPointerPosition,
        pointerPosition: initialPointerPosition
      });
      dispatch({
        type: "FLOATING_WIDGET_BRING_TO_FRONT",
        id
      });
    },
    [dispatch, handleDragStart, id]
  );
  const pointerCaptorRef = usePointerCaptor(handlePointerDown);
  const ref = reactExports.useRef(null);
  const refs = useRefs(ref, pointerCaptorRef);
  const isMaximized = useIsMaximizedWidget();
  const className = classnames(
    "nz-widget-floatingWidget_handle",
    `nz-${handle}`
  );
  if (isMaximized) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, ref: refs });
}
function getResizeBy(handle, offset) {
  switch (handle) {
    case "left":
      return new Rectangle(-offset.x);
    case "top":
      return new Rectangle(0, -offset.y);
    case "right":
      return new Rectangle(0, 0, offset.x);
    case "bottom":
      return new Rectangle(0, 0, 0, offset.y);
    case "topLeft":
      return new Rectangle(-offset.x, -offset.y);
    case "topRight":
      return new Rectangle(0, -offset.y, offset.x);
    case "bottomLeft":
      return new Rectangle(-offset.x, 0, 0, offset.y);
    case "bottomRight":
      return new Rectangle(0, 0, offset.x, offset.y);
  }
}
function useFloatingWidgetId() {
  const widgetId = reactExports.useContext(WidgetIdContext);
  return useLayout((state) => {
    if (!widgetId) return void 0;
    const floatingWidget = state.floatingWidgets.byId[widgetId];
    if (!floatingWidget) return void 0;
    return widgetId;
  });
}
function useWidgetAllowedToDock() {
  const id = useFloatingWidgetId();
  return useLayout((state) => {
    if (id) {
      const widget2 = getWidgetState$1(state, id);
      const activeTab = state.tabs[widget2.activeTabId];
      if (activeTab.allowedPanelTargets?.length === 0) {
        return false;
      }
    }
    return true;
  });
}
FloatingWidget.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "FloatingWidget", "props": { "onMouseEnter": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(event: React.MouseEvent<HTMLElement, MouseEvent>) => void", "signature": { "arguments": [{ "type": { "name": "ReactMouseEvent", "raw": "React.MouseEvent<HTMLElement, MouseEvent>", "elements": [{ "name": "HTMLElement" }, { "name": "MouseEvent" }] }, "name": "event" }], "return": { "name": "void" } } }, "description": "" }, "onMouseLeave": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(event: React.MouseEvent<HTMLElement, MouseEvent>) => void", "signature": { "arguments": [{ "type": { "name": "ReactMouseEvent", "raw": "React.MouseEvent<HTMLElement, MouseEvent>", "elements": [{ "name": "HTMLElement" }, { "name": "MouseEvent" }] }, "name": "event" }], "return": { "name": "void" } } }, "description": "" } } };
const NineZoneDispatchContext = reactExports.createContext(
  null
);
NineZoneDispatchContext.displayName = "nz:NineZoneDispatchContext";
const NineZoneLabelsContext = reactExports.createContext(void 0);
NineZoneLabelsContext.displayName = "nz:NineZoneLabelsContext";
const CursorTypeContext = reactExports.createContext(
  void 0
);
CursorTypeContext.displayName = "nz:CursorTypeContext";
const WidgetContentNodeContext = reactExports.createContext(void 0);
WidgetContentNodeContext.displayName = "nz:WidgetContentNodeContext";
const ShowWidgetIconContext = reactExports.createContext(false);
ShowWidgetIconContext.displayName = "nz:ShowWidgetIconContext";
const AutoCollapseUnpinnedPanelsContext = reactExports.createContext(false);
AutoCollapseUnpinnedPanelsContext.displayName = "nz:AutoCollapseUnpinnedPanelsContext";
const AnimateDockedToolSettingsContext = reactExports.createContext(false);
AnimateDockedToolSettingsContext.displayName = "nz:AnimateDockedToolSettingsContext";
const ToolSettingsNodeContext = reactExports.createContext(void 0);
ToolSettingsNodeContext.displayName = "nz:ToolSettingsNodeContext";
const TabNodeContext = reactExports.createContext(void 0);
TabNodeContext.displayName = "nz:TabNodeContext";
const FloatingWidgetNodeContext = reactExports.createContext(void 0);
FloatingWidgetNodeContext.displayName = "nz:FloatingWidgetNodeContext";
const MeasureContext = reactExports.createContext(null);
MeasureContext.displayName = "nz:MeasureContext";
const UiIsVisibleContext = reactExports.createContext(false);
UiIsVisibleContext.displayName = "nz:UiIsVisibleContext";
reactExports.forwardRef(function Measurer2(_, ref) {
  const size = reactExports.useRef({});
  const dispatch = reactExports.useContext(NineZoneDispatchContext);
  const handleResize = reactExports.useCallback(
    (width, height) => {
      if (size.current.width === width && size.current.height === height)
        return;
      size.current.height = height;
      size.current.width = width;
      dispatch({
        type: "RESIZE",
        size: {
          height,
          width
        }
      });
    },
    [dispatch]
  );
  const roRef = useResizeObserver(handleResize);
  const refs = useRefs(ref, roRef);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: refs,
      style: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        visibility: "hidden"
      }
    }
  );
});
function getUniqueId() {
  return Guid.createValue();
}
function useLabel(labelKey) {
  const labels = reactExports.useContext(NineZoneLabelsContext);
  return labels?.[labelKey];
}
const TabIdContext = reactExports.createContext(
  void 0
);
TabIdContext.displayName = "nz:TabIdContext";
function useTabTransientState(tabId, onSave, onRestore) {
  const widgetContentManager = reactExports.useContext(WidgetContentManagerContext);
  reactExports.useEffect(() => {
    if (!widgetContentManager) return;
    return widgetContentManager.onSaveTransientState.addListener((id) => {
      tabId === id && onSave && onSave();
    });
  }, [widgetContentManager, onSave, tabId]);
  reactExports.useEffect(() => {
    if (!widgetContentManager) return;
    return widgetContentManager.onRestoreTransientState.addListener((id) => {
      tabId === id && onRestore && onRestore();
    });
  }, [widgetContentManager, onRestore, tabId]);
}
({
  [ColorTheme.Light]: "light",
  [ColorTheme.HighContrastLight]: "light",
  [ColorTheme.Dark]: "dark",
  [ColorTheme.HighContrastDark]: "dark",
  [ColorTheme.System]: "os"
});
[
  ColorTheme.HighContrastDark,
  ColorTheme.HighContrastLight
];
reactExports.createContext(
  void 0
);
class CursorPopupManager {
  static _popups = new Array();
  /** @internal */
  static onCursorPopupUpdatePositionEvent = new BeUiEvent();
  /** @internal */
  static onCursorPopupFadeOutEvent = new BeUiEvent();
  /** @internal */
  static onCursorPopupsChangedEvent = new BeUiEvent();
  /** @internal */
  static clearPopups() {
    this._popups.length = 0;
    CursorPopupManager.onCursorPopupsChangedEvent.emit({});
  }
  static get popups() {
    return this._popups;
  }
  static get popupCount() {
    return this._popups.length;
  }
  static pushPopup(popupInfo) {
    CursorPopupManager._popups.push(popupInfo);
    CursorPopupManager.onCursorPopupsChangedEvent.emit({});
  }
  /** Called to open popup with a new set of properties
   */
  static open(id, content, pt, offset, relativePosition, priority = 0, options, targetDocument) {
    const popupInfo = CursorPopupManager._popups.find((info) => id === info.id);
    if (popupInfo) {
      CursorPopupManager.onCursorPopupFadeOutEvent.emit({
        id,
        show: CursorPopupShow.Open
      });
      popupInfo.content = content;
      popupInfo.offset = Point.create(offset);
      popupInfo.relativePosition = relativePosition;
      popupInfo.renderRelativePosition = relativePosition;
      popupInfo.priority = priority;
      popupInfo.options = options;
      popupInfo.targetDocument = targetDocument;
      CursorPopupManager.updatePosition(pt, targetDocument);
      if (popupInfo.cancelFadeOut) {
        popupInfo.cancelFadeOut();
        popupInfo.cancelFadeOut = void 0;
      }
      return;
    }
    const newPopupInfo = {
      id,
      content,
      offset: Point.create(offset),
      relativePosition,
      options,
      renderRelativePosition: relativePosition,
      priority,
      targetDocument
    };
    CursorPopupManager.pushPopup(newPopupInfo);
    CursorPopupManager.updatePosition(pt, targetDocument);
  }
  /** Called to update popup with a new set of properties
   */
  static update(id, content, pt, offset, relativePosition, priority = 0, targetDocument) {
    const popupInfo = CursorPopupManager._popups.find(
      (info) => id === info.id
    );
    if (popupInfo) {
      popupInfo.content = content;
      popupInfo.offset = Point.create(offset);
      popupInfo.relativePosition = relativePosition;
      popupInfo.renderRelativePosition = relativePosition;
      popupInfo.priority = priority;
      popupInfo.targetDocument = targetDocument;
    } else {
      Logger.logError(
        UiFramework.loggerCategory("CursorPopupManager"),
        `update: Could not find popup with id of '${id}'`
      );
    }
    CursorPopupManager.updatePosition(pt);
  }
  /** Called to move the open popup to new location
   */
  static updatePosition(pt, targetDocument) {
    CursorPopupManager.resetPopupsRenderRelativePosition(
      Point.create(pt),
      targetDocument
    );
    CursorPopupManager.onCursorPopupUpdatePositionEvent.emit({ pt });
  }
  /** Called when tool wants to close the popup
   */
  static close(id, apply, fadeOut) {
    const popupInfo = CursorPopupManager._popups.find(
      (info) => id === info.id
    );
    if (!popupInfo) {
      Logger.logError(
        UiFramework.loggerCategory("CursorPopupManager"),
        `close: Could not find popup with id of '${id}'`
      );
      return;
    }
    if (apply) popupInfo.options?.onApply?.();
    popupInfo.options?.onClose?.();
    if (fadeOut) {
      if (popupInfo.cancelFadeOut) return;
      let cancelled = false;
      popupInfo.cancelFadeOut = () => {
        cancelled = true;
      };
      CursorPopupManager.onCursorPopupFadeOutEvent.emit({ id });
      setTimeout(() => {
        if (cancelled) return;
        CursorPopupManager.removePopup(id);
      }, CursorPopup.fadeOutTime);
      return;
    }
    popupInfo.cancelFadeOut?.();
    popupInfo.cancelFadeOut = void 0;
    CursorPopupManager.removePopup(id);
  }
  static removePopup(id) {
    const index = CursorPopupManager._popups.findIndex(
      (popupInfo) => id === popupInfo.id
    );
    if (index >= 0) {
      CursorPopupManager._popups.splice(index, 1);
      CursorPopupManager.onCursorPopupsChangedEvent.emit({});
    }
  }
  static resetPopupsRenderRelativePosition(pt, targetDocument) {
    CursorPopupManager.popups.forEach((popupInfo) => {
      if (popupInfo.cancelFadeOut && popupInfo.targetDocument !== targetDocument) {
        return;
      }
      popupInfo.renderRelativePosition = popupInfo.relativePosition;
      popupInfo.targetDocument = targetDocument;
      const flipped = CursorPopupManager.validateRenderRelativePosition(
        pt,
        popupInfo,
        targetDocument
      );
      if (flipped) {
        CursorPopupManager.validateRenderRelativePosition(
          pt,
          popupInfo,
          targetDocument
        );
      }
    });
  }
  static validateRenderRelativePosition(pt, popupInfo, targetDocument) {
    const popupRect = CursorPopup.getPopupRect(
      pt,
      Point.create(popupInfo.offset),
      popupInfo.popupSize,
      popupInfo.renderRelativePosition
    );
    const targetWindow = targetDocument?.defaultView ?? window;
    const { outPos, flipped } = CursorPopupManager.autoFlip(
      popupInfo.renderRelativePosition,
      popupRect,
      targetWindow.innerWidth,
      targetWindow.innerHeight
    );
    if (flipped) popupInfo.renderRelativePosition = outPos;
    return flipped;
  }
  static autoFlip(inPos, rect, windowWidth, windowHeight) {
    let flipped = false;
    let outPos = inPos;
    if (rect.right > windowWidth) {
      flipped = true;
      switch (inPos) {
        case RelativePosition.Top:
        case RelativePosition.TopRight:
          outPos = RelativePosition.TopLeft;
          break;
        case RelativePosition.Right:
          outPos = RelativePosition.Left;
          break;
        case RelativePosition.Bottom:
        case RelativePosition.BottomRight:
          outPos = RelativePosition.BottomLeft;
          break;
      }
    }
    if (rect.left < 0) {
      flipped = true;
      switch (inPos) {
        case RelativePosition.Top:
        case RelativePosition.TopLeft:
          outPos = RelativePosition.TopRight;
          break;
        case RelativePosition.Left:
          outPos = RelativePosition.Right;
          break;
        case RelativePosition.Bottom:
        case RelativePosition.BottomLeft:
          outPos = RelativePosition.BottomRight;
          break;
      }
    }
    if (rect.bottom > windowHeight) {
      flipped = true;
      switch (inPos) {
        case RelativePosition.Left:
        case RelativePosition.BottomLeft:
          outPos = RelativePosition.TopLeft;
          break;
        case RelativePosition.Bottom:
          outPos = RelativePosition.Top;
          break;
        case RelativePosition.Right:
        case RelativePosition.BottomRight:
          outPos = RelativePosition.TopRight;
          break;
      }
    }
    if (rect.top < 0) {
      flipped = true;
      switch (inPos) {
        case RelativePosition.Left:
        case RelativePosition.TopLeft:
          outPos = RelativePosition.BottomLeft;
          break;
        case RelativePosition.Top:
          outPos = RelativePosition.Bottom;
          break;
        case RelativePosition.Right:
        case RelativePosition.TopRight:
          outPos = RelativePosition.BottomRight;
          break;
      }
    }
    return { outPos, flipped };
  }
}
Object.values(RelativePosition).filter(
  (value) => typeof value !== "string"
);
var CursorPopupShow = /* @__PURE__ */ ((CursorPopupShow2) => {
  CursorPopupShow2[CursorPopupShow2["Open"] = 0] = "Open";
  CursorPopupShow2[CursorPopupShow2["FadeOut"] = 1] = "FadeOut";
  return CursorPopupShow2;
})(CursorPopupShow || {});
class CursorPopup extends reactExports.Component {
  _isMounted = false;
  /** @internal */
  static fadeOutTime = 500;
  constructor(props) {
    super(props);
    this.state = {
      showPopup: 0,
      size: { width: -1, height: -1 }
    };
  }
  componentDidMount() {
    this._isMounted = true;
    CursorPopupManager.onCursorPopupFadeOutEvent.addListener(
      this._handleCursorPopupFadeOutEvent
    );
  }
  componentWillUnmount() {
    this._isMounted = false;
    CursorPopupManager.onCursorPopupFadeOutEvent.removeListener(
      this._handleCursorPopupFadeOutEvent
    );
  }
  _handleCursorPopupFadeOutEvent = (args) => {
    if (this.props.id === args.id) {
      if (this._isMounted)
        this.setState({
          showPopup: args.show ?? 1
          /* FadeOut */
        });
    }
  };
  /** @internal */
  static getPopupRect(pt, offset, popupSize, relativePosition) {
    const popupRect = { top: 0, left: 0, right: 0, bottom: 0 };
    if (popupSize === void 0) return popupRect;
    if (typeof relativePosition === "string") {
      const placement = relativePosition.split("-");
      const [mainPlacement, subPlacement] = placement;
      switch (mainPlacement) {
        case "top":
          popupRect.left = pt.x - popupSize.width / 2 - offset.x;
          popupRect.top = pt.y - offset.y + popupSize.height;
          break;
        case "left":
          popupRect.left = pt.x - popupSize.width - offset.x;
          popupRect.top = pt.y + popupSize.height / 2 - offset.y;
          break;
        case "right":
          popupRect.left = pt.x + offset.x;
          popupRect.top = pt.y + popupSize.height / 2 - offset.y;
          break;
        case "bottom":
          popupRect.left = pt.x - popupSize.width / 2 - offset.x;
          popupRect.top = pt.y + offset.y;
          break;
      }
      if (subPlacement === "start") {
        switch (mainPlacement) {
          case "top":
          case "bottom":
            popupRect.left = pt.x - offset.x;
            break;
          case "left":
          case "right":
            popupRect.top = pt.y - offset.y;
            break;
        }
      } else if (subPlacement === "end") {
        switch (mainPlacement) {
          case "top":
          case "bottom":
            popupRect.left = pt.x - popupSize.width - offset.x;
            break;
          case "left":
          case "right":
            popupRect.top = popupSize.height + pt.y - offset.y;
            break;
        }
      }
      popupRect.right = popupRect.left + popupSize.width;
      popupRect.bottom = popupRect.top + popupSize.height;
    } else {
      switch (relativePosition) {
        case RelativePosition.Top:
          popupRect.bottom = pt.y - offset.y;
          popupRect.left = pt.x - popupSize.width / 2;
          popupRect.top = popupRect.bottom - popupSize.height;
          popupRect.right = popupRect.left + popupSize.width;
          break;
        case RelativePosition.Left:
          popupRect.right = pt.x - offset.x;
          popupRect.top = pt.y - popupSize.height / 2;
          popupRect.left = popupRect.right - popupSize.width;
          popupRect.bottom = popupRect.top + popupSize.height;
          break;
        case RelativePosition.Right:
          popupRect.left = pt.x + offset.x;
          popupRect.top = pt.y - popupSize.height / 2;
          popupRect.right = popupRect.left + popupSize.width;
          popupRect.bottom = popupRect.top + popupSize.height;
          break;
        case RelativePosition.Bottom:
          popupRect.top = pt.y + offset.y;
          popupRect.left = pt.x - popupSize.width / 2;
          popupRect.bottom = popupRect.top + popupSize.height;
          popupRect.right = popupRect.left + popupSize.width;
          break;
        case RelativePosition.TopLeft:
          popupRect.bottom = pt.y - offset.y;
          popupRect.right = pt.x - offset.x;
          popupRect.top = popupRect.bottom - popupSize.height;
          popupRect.left = popupRect.right - popupSize.width;
          break;
        case RelativePosition.TopRight:
          popupRect.bottom = pt.y - offset.y;
          popupRect.left = pt.x + offset.x;
          popupRect.top = popupRect.bottom - popupSize.height;
          popupRect.right = popupRect.left + popupSize.width;
          break;
        case RelativePosition.BottomLeft:
          popupRect.top = pt.y + offset.y;
          popupRect.right = pt.x - offset.x;
          popupRect.bottom = popupRect.top + popupSize.height;
          popupRect.left = popupRect.right - popupSize.width;
          break;
        case RelativePosition.BottomRight:
          popupRect.top = pt.y + offset.y;
          popupRect.left = pt.x + offset.x;
          popupRect.bottom = popupRect.top + popupSize.height;
          popupRect.right = popupRect.left + popupSize.width;
          break;
      }
    }
    return popupRect;
  }
  setDivRef(div) {
    if (div) {
      const rect = div.getBoundingClientRect();
      const newSize = { width: rect.width, height: rect.height };
      if (newSize.height === this.state.size.height && newSize.width === this.state.size.width)
        return;
      this.props.onSizeKnown?.(newSize);
      if (this._isMounted) this.setState({ size: newSize });
    }
  }
  render() {
    const popupRect = CursorPopup.getPopupRect(
      this.props.pt,
      this.props.offset,
      this.state.size,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      this.props.placement || this.props.relativePosition
    );
    const positioningStyle = {
      left: popupRect.left,
      top: popupRect.top
    };
    const classNames = classnames(
      "uifw-cursorpopup",
      this.props.shadow && "core-popup-shadow",
      this.state.showPopup === 1 && "uifw-cursorpopup-fadeOut"
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: classNames,
        ref: (e) => this.setDivRef(e),
        style: positioningStyle,
        children: [
          this.props.title && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatusBarDialog.TitleBar,
            {
              title: this.props.title,
              className: "uifw-cursorpopup-title"
            }
          ),
          this.props.content
        ]
      }
    );
  }
}
CursorPopup.__docgenInfo = { "description": "CursorPopup React component\n@public", "methods": [{ "name": "getPopupRect", "docblock": "@internal", "modifiers": ["static"], "params": [{ "name": "pt", "optional": false, "type": { "name": "XAndY", "alias": "XAndY" } }, { "name": "offset", "optional": false, "type": { "name": "XAndY", "alias": "XAndY" } }, { "name": "popupSize", "optional": false, "type": { "name": "union", "raw": "SizeProps | undefined", "elements": [{ "name": "_SizeProps" }, { "name": "undefined" }] } }, { "name": "relativePosition", "optional": false, "type": { "name": "union", "raw": "RelativePosition | Placement", "elements": [{ "name": "RelativePosition" }, { "name": "union", "raw": "Side | `${Side}-${Alignment}`", "elements": [{ "name": "union", "raw": '"left" | "top" | "right" | "bottom"', "elements": [{ "name": "literal", "value": '"left"' }, { "name": "literal", "value": '"top"' }, { "name": "literal", "value": '"right"' }, { "name": "literal", "value": '"bottom"' }] }, { "name": "literal", "value": "`${Side}-${Alignment}`" }] }] } }], "returns": { "type": { "name": "_RectangleProps" } }, "description": null }], "displayName": "CursorPopup", "props": { "id": { "required": true, "tsType": { "name": "string" }, "description": "" }, "content": { "required": true, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" }, "pt": { "required": true, "tsType": { "name": "XAndY" }, "description": "" }, "offset": { "required": true, "tsType": { "name": "XAndY" }, "description": "" }, "title": { "required": false, "tsType": { "name": "string" }, "description": "" }, "shadow": { "required": false, "tsType": { "name": "boolean" }, "description": "" }, "onSizeKnown": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(size: SizeProps) => void", "signature": { "arguments": [{ "type": { "name": "_SizeProps" }, "name": "size" }], "return": { "name": "void" } } }, "description": "Function called when size is known." } } };
class PositionPopup extends reactExports.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { point, className, style, onSizeKnown, ...props } = this.props;
    const divStyle = {
      ...style,
      top: point.y,
      left: point.x
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ...props,
        className: classnames("uifw-position-popup", className),
        style: divStyle,
        ref: (e) => this.setDivRef(e),
        children: this.props.children
      }
    );
  }
  setDivRef(div) {
    if (div) {
      const rect = div.getBoundingClientRect();
      this.props.onSizeKnown?.({
        width: rect.width,
        height: rect.height
      });
    }
  }
}
function PositionPopupContent(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Div, { ...props, mainClassName: "uifw-position-popup-content" });
}
PositionPopup.__docgenInfo = { "description": "Popup component at screen position\n@beta", "methods": [], "displayName": "PositionPopup", "props": { "point": { "required": true, "tsType": { "name": "XAndY" }, "description": "Center point" }, "onSizeKnown": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(size: SizeProps) => void", "signature": { "arguments": [{ "type": { "name": "_SizeProps" }, "name": "size" }], "return": { "name": "void" } } }, "description": "Function called when size is known." }, "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Content" } }, "composes": ["CommonProps"] };
PositionPopupContent.__docgenInfo = { "description": "PositionPopup content with padding\n@beta", "methods": [], "displayName": "PositionPopupContent" };
function isConditionalValue(conditionalProp) {
  return typeof conditionalProp === "object" && conditionalProp && "syncEventIds" in conditionalProp && "refresh" in conditionalProp && "value" in conditionalProp;
}
function useConditionalProp(conditionalProp) {
  const refreshedRef = reactExports.useRef(false);
  const subscribe2 = reactExports.useCallback(
    (onStoreChange) => {
      if (isConditionalValue(conditionalProp)) {
        return SyncUiEventDispatcher.onSyncUiEvent.addListener(
          ({ eventIds }) => {
            if (!SyncUiEventDispatcher.hasEventOfInterest(
              eventIds,
              conditionalProp.syncEventIds
            ))
              return;
            if (!conditionalProp.refresh()) return;
            onStoreChange();
          }
        );
      }
      return () => {
      };
    },
    [conditionalProp]
  );
  const getSnapshot2 = reactExports.useCallback(() => {
    if (isConditionalValue(conditionalProp)) {
      if (!refreshedRef.current) {
        conditionalProp.refresh();
        refreshedRef.current = true;
      }
      return conditionalProp.value;
    }
    return conditionalProp;
  }, [conditionalProp]);
  return reactExports.useSyncExternalStore(subscribe2, getSnapshot2);
}
function Badge({
  badge,
  // eslint-disable-line @typescript-eslint/no-deprecated
  badgeKind
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "uifw-toolbar-group-badge", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge$1, { type: badgeKind || badge }) });
}
Badge.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "Badge" };
function useSafeContext(context) {
  const value = reactExports.useContext(context);
  if (value === void 0) {
    throw new Error(`${context.displayName || "Context"} is undefined`);
  }
  return value;
}
function Separator() {
  const context = useSafeContext(ToolbarContext);
  const { orientation } = context;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: classnames(
        "uifw-toolbar-newToolbars-separator",
        `uifw-${orientation}`
      )
    }
  );
}
Separator.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "Separator" };
const Item = reactExports.forwardRef(
  function Item2(props, ref) {
    const { item, ...other } = props;
    const { renderSeparator } = useSafeContext(ToolbarItemContext);
    const label2 = useConditionalProp(item.label);
    const isActiveCondition = useConditionalProp(item.isActiveCondition);
    const isDisabled = useConditionalProp(item.isDisabled);
    const isHidden2 = useConditionalProp(item.isHidden);
    const iconSpec = useConditionalProp(item.icon);
    const labelProps = useLabelProps();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      isHidden2 ? void 0 : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        IconButton,
        {
          styleType: "borderless",
          disabled: isDisabled,
          isActive: isActiveCondition ?? item.isActive,
          label: label2,
          labelProps,
          style: props.style,
          ref,
          "data-item-id": item.id,
          ...other,
          children: [
            item.iconNode ?? /* eslint-disable-next-line @typescript-eslint/no-deprecated */
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$2, { iconSpec }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { badge: item.badge, badgeKind: item.badgeKind }),
            props.children
          ]
        }
      ),
      renderSeparator && /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {})
    ] });
  }
);
function useLabelProps() {
  const { popoverOpen, expandsTo } = useSafeContext(ToolbarContext);
  const [internalVisible, setInternalVisible] = reactExports.useState(false);
  const visible = popoverOpen ? false : internalVisible;
  return {
    placement: expandsTo,
    visible,
    onVisibleChange: setInternalVisible
  };
}
Item.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "Item", "props": { "item": { "required": true, "tsType": { "name": "union", "raw": "| ToolbarActionItem\n| ToolbarGroupItem\n| ToolbarCustomItem", "elements": [{ "name": "ToolbarActionItem" }, { "name": "ToolbarGroupItem" }, { "name": "ToolbarCustomItem" }] }, "description": "" } }, "composes": ["Partial"] };
function ExpandIndicator() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "uifw-toolbar-group-expandIndicator" });
}
ExpandIndicator.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "ExpandIndicator" };
const GroupItem = reactExports.forwardRef(
  function GroupItem2({ item }, ref) {
    const placement = usePopoverPlacement();
    const { setPopoverOpen } = useSafeContext(ToolbarContext);
    const overflowContext = reactExports.useContext(ToolGroupOverflowContext);
    if (overflowContext) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(GroupMenuItem, { item, onClose: overflowContext.onClose });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ToolbarMenu,
      {
        menuItems: (close) => {
          return toMenuItems(item, close);
        },
        placement,
        onVisibleChange: (newVisible) => {
          setPopoverOpen(newVisible);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { item, ref, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExpandIndicator, {}) })
      }
    );
  }
);
function usePopoverPlacement() {
  const { expandsTo, panelAlignment } = useSafeContext(ToolbarContext);
  return `${expandsTo}-${panelAlignment}`;
}
function GroupMenuItem({ item, onClose }) {
  const { onItemExecuted } = useSafeContext(ToolbarContext);
  const iconSpec = useConditionalProp(item.icon);
  const label2 = useConditionalProp(item.label);
  const isDisabled = useConditionalProp(item.isDisabled);
  const isHidden2 = useConditionalProp(item.isHidden);
  const isActiveCondition = useConditionalProp(item.isActiveCondition);
  if (isHidden2) {
    return null;
  }
  const subMenuItems = isDisabled ? void 0 : toMenuItems(item, onClose);
  const startIcon = item.iconNode ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: item.iconNode }) : (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$2, { iconSpec })
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    MenuItem$1,
    {
      className: "uifw-toolbar-newToolbars-groupItem_menuItem",
      startIcon,
      disabled: isDisabled,
      subMenuItems,
      onClick: isToolbarActionItem(item) ? () => {
        item.execute();
        onItemExecuted?.(item);
        onClose?.();
      } : void 0,
      isSelected: isActiveCondition ?? item.isActive,
      "data-item-id": item.id,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { badge: item.badge, badgeKind: item.badgeKind }),
        label2
      ]
    }
  );
}
function toMenuItems(item, onClose) {
  if (isToolbarGroupItem(item)) {
    return item.items.map((groupItem) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(GroupMenuItem, { item: groupItem, onClose }, groupItem.id);
    });
  }
  if (isToolbarCustomItem(item)) {
    return [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenuExtraContent, { children: item.panelContent }, item.id)
    ];
  }
  return [];
}
const ToolbarMenu = reactExports.forwardRef(function DropdownMenu1(props, ref) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DropdownMenu,
    {
      ...props,
      className: classnames(
        "uifw-toolbar-newToolbars-groupItem_menu",
        props.className
      ),
      ref
    }
  );
});
GroupItem.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "GroupItem", "props": { "item": { "required": true, "tsType": { "name": "ToolbarGroupItem" }, "description": "" } } };
GroupMenuItem.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "GroupMenuItem", "props": { "item": { "required": true, "tsType": { "name": "union", "raw": "| ToolbarActionItem\n| ToolbarGroupItem\n| ToolbarCustomItem", "elements": [{ "name": "ToolbarActionItem" }, { "name": "ToolbarGroupItem" }, { "name": "ToolbarCustomItem" }] }, "description": "" }, "onClose": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" } } };
ToolbarMenu.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "ToolbarMenu" };
const ToolGroupOverflowContext = reactExports.createContext(void 0);
const OverflowButton = reactExports.forwardRef(function OverflowButton2(props, ref) {
  const placement = usePopoverPlacement();
  const labelProps = useLabelProps();
  const { setPopoverOpen } = useSafeContext(ToolbarContext);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolbarMenu,
    {
      menuItems: (close) => {
        return [
          /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowMenu, { onClose: close, children: props.children }, 0)
        ];
      },
      placement,
      onVisibleChange: (newVisible) => {
        setPopoverOpen(newVisible);
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        IconButton,
        {
          ref,
          label: "More",
          labelProps,
          styleType: "borderless",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgMore, {})
        }
      )
    }
  );
});
function OverflowMenu({ children, onClose }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ToolGroupOverflowContext.Provider, { value: { onClose }, children });
}
OverflowButton.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "OverflowButton", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" } } };
const useOverflow = (allItems, orientation, getItemSize, getOverflowSize) => {
  const [visible, setVisible] = reactExports.useState(allItems.length);
  const [calculate, setCalculate] = reactExports.useState(false);
  const containerSizeRef = reactExports.useRef(void 0);
  const componentSizeRef = reactExports.useRef(void 0);
  const [prevOrientation, setPrevOrientation] = reactExports.useState(orientation);
  if (prevOrientation !== orientation) {
    setPrevOrientation(orientation);
    setCalculate(true);
  }
  reactExports.useLayoutEffect(() => {
    if (!calculate) return;
    setCalculate(false);
    const containerSize = containerSizeRef.current ? getLength(containerSizeRef.current, orientation) : void 0;
    if (containerSize === void 0) return;
    const componentSize = componentSizeRef.current ? getLength(componentSizeRef.current, orientation) : void 0;
    if (componentSize === void 0) return;
    const itemSizes = allItems.map((item) => {
      const size = getItemSize(item);
      return getLength(size, orientation);
    });
    const overflowSize = getLength(getOverflowSize(), orientation);
    const otherSize = itemSizes.reduce((acc, size) => acc + size, 0);
    if (otherSize < containerSize) {
      setVisible(itemSizes.length);
      return;
    }
    if (overflowSize >= containerSize) {
      setVisible(0);
      return;
    }
    let totalSize = overflowSize;
    let newVisible = 0;
    for (const size of itemSizes) {
      totalSize += size;
      if (totalSize >= containerSize) {
        break;
      }
      newVisible++;
    }
    setVisible(newVisible);
  }, [calculate, allItems, getItemSize, getOverflowSize, orientation]);
  const containerRoRef = useResizeObserver(
    reactExports.useCallback(
      (width, height) => {
        const length = containerSizeRef.current ? getLength(containerSizeRef.current, orientation) : void 0;
        containerSizeRef.current = { width, height };
        const newLength = getLength(containerSizeRef.current, orientation);
        if (newLength === length) return;
        setCalculate(true);
      },
      [orientation]
    )
  );
  const componentRoRef = useResizeObserver(
    reactExports.useCallback(
      (width, height) => {
        const length = componentSizeRef.current ? getLength(componentSizeRef.current, orientation) : void 0;
        componentSizeRef.current = { width, height };
        const newLength = getLength(componentSizeRef.current, orientation);
        if (newLength === length) return;
        setCalculate(true);
      },
      [orientation]
    )
  );
  const overflow = calculate || visible < allItems.length;
  const visibleItems = calculate ? allItems.length : visible;
  return [containerRoRef, componentRoRef, visibleItems, overflow];
};
function getLength(size, orientation) {
  return orientation === "horizontal" ? size.width : size.height;
}
const Surface = reactExports.forwardRef(
  function Surface2({ className, style, orientation, ...rest }, forwardedRed) {
    const { ref, proximityScale } = useWidgetOpacityContext();
    const refs = useRefs(ref, forwardedRed);
    const calculateOpacity = useConditionalValue(() => {
      if (ProcessDetector.isMobileBrowser) return false;
      if (UiFramework.visibility.snapWidgetOpacity) return true;
      return false;
    }, [SyncUiEventId.ShowHideManagerSettingChange]);
    const opacity = reactExports.useMemo(() => {
      if (!calculateOpacity) return void 0;
      return calculateToolbarOpacity(proximityScale);
    }, [proximityScale, calculateOpacity]);
    const backgroundColor = opacity === void 0 ? void 0 : getToolbarBackgroundColor(opacity);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Surface$1,
      {
        ...rest,
        style: {
          backgroundColor,
          ...style
        },
        className: classnames(
          "uifw-toolbar-group-surface",
          `uifw-${orientation}`,
          className
        ),
        ref: refs
      }
    );
  }
);
Surface.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "Surface", "props": { "orientation": { "required": true, "tsType": { "name": 'NonNullable["orientation"]', "raw": 'ToolbarContextProps["orientation"]' }, "description": "" } } };
function ToolGroup({ children, className, ...props }) {
  const { panelAlignment, orientation } = useSafeContext(ToolbarContext);
  const childrenArray = reactExports.Children.toArray(children);
  const keyToChildMap = childrenArray.reduce(
    (acc, child, index) => {
      const childKey = getChildKey(child, index);
      acc.set(childKey, child);
      return acc;
    },
    /* @__PURE__ */ new Map()
  );
  const childrenKeys = Array.from(keyToChildMap.keys());
  const itemRefs = reactExports.useRef(/* @__PURE__ */ new Map());
  const overflowRef = reactExports.useRef(null);
  const getItemSize = reactExports.useCallback((item) => {
    const element = itemRefs.current.get(item);
    if (!element) return { width: 0, height: 0 };
    const elementSize = element.getBoundingClientRect();
    const separatorSize = getSeparatorSize(element);
    if (!separatorSize) return elementSize;
    return {
      width: elementSize.width + separatorSize.width,
      height: elementSize.height + separatorSize.height
    };
  }, []);
  const getOverflowSize = reactExports.useCallback(() => {
    const element = overflowRef.current;
    if (!element) return { width: 0, height: 0 };
    return element.getBoundingClientRect();
  }, []);
  const [containerRef, componentRef, visibleCount, renderOverflow] = useOverflow(childrenKeys, orientation, getItemSize, getOverflowSize);
  const keyToChildEntries = Array.from(keyToChildMap.entries());
  const visibleChildren = keyToChildEntries.slice(0, visibleCount);
  const overflown = keyToChildEntries.slice(visibleCount);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: classnames(
        "uifw-toolbar-group-toolGroup_container",
        `uifw-${orientation}`,
        `uifw-${panelAlignment}`,
        className
      ),
      ref: containerRef,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Surface, { orientation, ref: componentRef, ...props, children: [
        visibleChildren.map(([item, child]) => {
          if (!reactExports.isValidElement(child))
            return child;
          return reactExports.cloneElement(child, {
            ref: (el) => {
              if (!el) {
                itemRefs.current.delete(item);
                return;
              }
              itemRefs.current.set(item, el);
            }
          });
        }),
        renderOverflow && /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowButton, { ref: overflowRef, children: overflown.map(([_, child]) => child) })
      ] })
    }
  );
}
function getSeparatorSize(toolbarItem) {
  const firstInGroup = isFirstInGroup(toolbarItem);
  if (!firstInGroup) return void 0;
  if (isLastGroup(toolbarItem)) return void 0;
  const separator = getSeparator(toolbarItem);
  if (!separator) return void 0;
  return separator.getBoundingClientRect();
}
function isFirstInGroup(toolbarItem) {
  const prev = toolbarItem.previousElementSibling;
  if (prev?.tagName === "BUTTON") return false;
  return true;
}
function isLastGroup(toolbarItem) {
  let el = toolbarItem.nextElementSibling;
  while (el) {
    if (el.tagName === "BUTTON" && el.hasAttribute("data-item-id")) {
      return false;
    }
    el = el.nextElementSibling;
  }
  return true;
}
function getSeparator(toolbarItem) {
  let el = toolbarItem.nextElementSibling;
  while (el) {
    if (el.classList.contains("uifw-toolbar-newToolbars-separator")) {
      return el;
    }
    el = el.nextElementSibling;
  }
  return void 0;
}
ToolGroup.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "ToolGroup", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" } }, "composes": ["CommonProps"] };
const ActionItem = reactExports.forwardRef(
  function ActionItem2({ item }, ref) {
    const { onItemExecuted } = useSafeContext(ToolbarContext);
    const overflowContext = reactExports.useContext(ToolGroupOverflowContext);
    if (overflowContext) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(GroupMenuItem, { item, onClose: overflowContext.onClose });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        ref,
        item,
        onClick: () => {
          item.execute();
          onItemExecuted?.(item);
        }
      }
    );
  }
);
ActionItem.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "ActionItem", "props": { "item": { "required": true, "tsType": { "name": "ToolbarActionItem" }, "description": "" } } };
const CustomItem = reactExports.forwardRef(
  function CustomItem2({ item }, ref) {
    const placement = usePopoverPlacement();
    const { setPopoverOpen } = useSafeContext(ToolbarContext);
    const overflowContext = reactExports.useContext(ToolGroupOverflowContext);
    if (overflowContext) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(GroupMenuItem, { item, onClose: overflowContext.onClose });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DropdownMenu,
      {
        menuItems: () => {
          return [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MenuExtraContent, { children: item.panelContent }, 0)
          ];
        },
        placement,
        onVisibleChange: (newVisible) => {
          setPopoverOpen(newVisible);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { ref, item, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExpandIndicator, {}) })
      }
    );
  }
);
CustomItem.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "CustomItem", "props": { "item": { "required": true, "tsType": { "name": "ToolbarCustomItem" }, "description": "" } } };
function Toolbar$1({
  items,
  expandsTo = "bottom",
  panelAlignment = "start",
  onItemExecuted
}) {
  const [popoverOpen, setPopoverOpen] = reactExports.useState(false);
  const orientation = getOrientation(expandsTo);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolbarContext.Provider,
    {
      value: reactExports.useMemo(
        () => ({
          expandsTo,
          orientation,
          panelAlignment,
          popoverOpen,
          setPopoverOpen,
          onItemExecuted
        }),
        [
          expandsTo,
          orientation,
          panelAlignment,
          popoverOpen,
          setPopoverOpen,
          onItemExecuted
        ]
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ToolGroup, { children: items.map((item, index) => {
        const nextItem = items.length > index + 1 ? items[index + 1] : void 0;
        const renderSeparator = nextItem ? item.groupPriority !== nextItem.groupPriority : false;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          ItemRenderer,
          {
            item,
            renderSeparator
          },
          item.id
        );
      }) })
    }
  );
}
const ItemRenderer = reactExports.forwardRef(
  function ItemRenderer2({ item, renderSeparator }, forwardedRef) {
    let itemElement;
    if (isToolbarActionItem(item)) {
      itemElement = /* @__PURE__ */ jsxRuntimeExports.jsx(ActionItem, { ref: forwardedRef, item });
    }
    if (isToolbarGroupItem(item)) {
      itemElement = /* @__PURE__ */ jsxRuntimeExports.jsx(GroupItem, { ref: forwardedRef, item });
    }
    if (isToolbarCustomItem(item)) {
      itemElement = /* @__PURE__ */ jsxRuntimeExports.jsx(CustomItem, { ref: forwardedRef, item });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarItemContext.Provider, { value: { renderSeparator }, children: itemElement });
  }
);
const ToolbarContext = reactExports.createContext(void 0);
ToolbarContext.displayName = "uifw:ToolbarContext";
const ToolbarItemContext = reactExports.createContext(void 0);
ToolbarContext.displayName = "uifw:ToolbarContext";
function getOrientation(expandsTo) {
  switch (expandsTo) {
    case "left":
    case "right":
      return "vertical";
    case "top":
    case "bottom":
      return "horizontal";
  }
}
Toolbar$1.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "Toolbar", "props": { "items": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "union", "raw": "| ToolbarActionItem\n| ToolbarGroupItem\n| ToolbarCustomItem", "elements": [{ "name": "ToolbarActionItem" }, { "name": "ToolbarGroupItem" }, { "name": "ToolbarCustomItem" }] }], "raw": "ToolbarItem[]" }, "description": "Definitions for items of the toolbar." }, "expandsTo": { "required": false, "tsType": { "name": "union", "raw": '"top" | "bottom" | "left" | "right"', "elements": [{ "name": "literal", "value": '"top"' }, { "name": "literal", "value": '"bottom"' }, { "name": "literal", "value": '"left"' }, { "name": "literal", "value": '"right"' }] }, "description": "Describes direction to which the panels are expanded. Orientation of the toolbar is determined based on this prop. Defaults to `bottom`.", "defaultValue": { "value": '"bottom"', "computed": false } }, "panelAlignment": { "required": false, "tsType": { "name": "union", "raw": '"start" | "end"', "elements": [{ "name": "literal", "value": '"start"' }, { "name": "literal", "value": '"end"' }] }, "description": "Describes how panels are aligned. Defaults to `start`.", "defaultValue": { "value": '"start"', "computed": false } } }, "composes": ["ToolbarInternalProps"] };
function Toolbar(props) {
  const {
    expandsTo: expandsToProp,
    panelAlignment: panelAlignmentProp,
    ...rest
  } = props;
  const expandsTo = toDirection(expandsToProp);
  const panelAlignment = toPanelAlignment(panelAlignmentProp);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toolbar$1,
    {
      expandsTo,
      panelAlignment,
      ...rest
    }
  );
}
function toDirection(direction) {
  switch (direction) {
    case Direction.Bottom:
      return "bottom";
    case Direction.Left:
      return "left";
    case Direction.Right:
      return "right";
    case Direction.Top:
      return "top";
  }
  return void 0;
}
function toPanelAlignment(alignment) {
  switch (alignment) {
    case ToolbarPanelAlignment.End:
      return "end";
    case ToolbarPanelAlignment.Start:
      return "start";
  }
  return void 0;
}
Toolbar.__docgenInfo = { "description": "Component that displays toolbar items.\n@beta", "methods": [], "displayName": "Toolbar", "props": { "expandsTo": { "required": false, "tsType": { "name": "Direction" }, "description": "Describes to which direction the popup panels are expanded, also defines the orientation of the toolbar (Top/Bottom will create an horizontal toolbar, Left/Right will create a vertical toolbar). Defaults to: [[Direction.Bottom]]" }, "enableOverflow": { "required": false, "tsType": { "name": "union", "raw": "boolean | OverflowToolbarOptions", "elements": [{ "name": "boolean" }, { "name": "OverflowToolbarOptions" }] }, "description": "Describes if items that do not fit available space should move to an expandable panel. Defaults to: false" }, "items": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "union", "raw": "| ToolbarActionItem\n| ToolbarGroupItem\n| ToolbarCustomItem", "elements": [{ "name": "ToolbarActionItem" }, { "name": "ToolbarGroupItem" }, { "name": "ToolbarCustomItem" }] }], "raw": "ToolbarItem[]" }, "description": "Definitions for items of the toolbar. Items are expected to be already sorted by group and item." }, "panelAlignment": { "required": false, "tsType": { "name": "ToolbarPanelAlignment" }, "description": "Describes how expanded panels are aligned. Defaults to: [[ToolbarPanelAlignment.Start]]" }, "useDragInteraction": { "required": false, "tsType": { "name": "boolean" }, "description": "Use drag interaction to open popups with nested toolbar buttons." }, "toolbarOpacitySetting": { "required": false, "tsType": { "name": "ToolbarOpacitySetting" }, "description": "Determines whether to use mouse proximity to alter the opacity of the toolbar" }, "onItemExecuted": { "required": false, "tsType": { "name": "OnItemExecutedFunc" }, "description": "Optional function to call on any item execution" }, "onKeyDown": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(e: React.KeyboardEvent) => void", "signature": { "arguments": [{ "type": { "name": "ReactKeyboardEvent", "raw": "React.KeyboardEvent" }, "name": "e" }], "return": { "name": "void" } } }, "description": "Optional function to call on any KeyDown events processed by toolbar" } }, "composes": ["CommonProps", "NoChildrenProps"] };
function ToolbarWithOverflow(props) {
  const { overflowExpandsTo, ...toolbarProps } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Toolbar, { enableOverflow: { overflowExpandsTo }, ...toolbarProps });
}
ToolbarWithOverflow.__docgenInfo = { "description": "Component that displays toolbar items, displaying only the elements that can fit in the available space,\nand put the other items into a single panel.\n@beta", "methods": [], "displayName": "ToolbarWithOverflow", "props": { "expandsTo": { "required": false, "tsType": { "name": "Direction" }, "description": "Describes to which direction the popup panels are expanded, also defines the orientation of the toolbar (Top/Bottom will create an horizontal toolbar, Left/Right will create a vertical toolbar). Defaults to: [[Direction.Bottom]]" }, "overflowExpandsTo": { "required": false, "tsType": { "name": "Direction" }, "description": "Describes to which direction the overflow popup panels are expanded. Defaults to: [[Direction.Right]]" }, "items": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "union", "raw": "| ToolbarActionItem\n| ToolbarGroupItem\n| ToolbarCustomItem", "elements": [{ "name": "ToolbarActionItem" }, { "name": "ToolbarGroupItem" }, { "name": "ToolbarCustomItem" }] }], "raw": "ToolbarItem[]" }, "description": "Definitions for items of the toolbar. Items are expected to be already sorted by group and item." }, "panelAlignment": { "required": false, "tsType": { "name": "ToolbarPanelAlignment" }, "description": "Describes how expanded panels are aligned. Defaults to: [[ToolbarPanelAlignment.Start]]" }, "useDragInteraction": { "required": false, "tsType": { "name": "boolean" }, "description": "Use Drag Interaction to open popups with nest action buttons" }, "toolbarOpacitySetting": { "required": false, "tsType": { "name": "ToolbarOpacitySetting" }, "description": "Determines whether to use mouse proximity to alter the opacity of the toolbar" }, "onItemExecuted": { "required": false, "tsType": { "name": "OnItemExecutedFunc" }, "description": "Optional function to call on any item execution" }, "onKeyDown": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(e: React.KeyboardEvent) => void", "signature": { "arguments": [{ "type": { "name": "ReactKeyboardEvent", "raw": "React.KeyboardEvent" }, "name": "e" }], "return": { "name": "void" } } }, "description": "Optional function to call on any KeyDown events processed by toolbar" } }, "composes": ["CommonProps", "NoChildrenProps"] };
function mapToRelativePosition(input) {
  if (typeof input === "string") return placementToRelativePositionMap[input];
  return input;
}
function mapToPlacement(input) {
  if (!input) return "top-end";
  if (typeof input === "string") return input;
  return relativePositionToPlacementMap[input];
}
const placementToRelativePositionMap = {
  left: RelativePosition.Left,
  top: RelativePosition.Top,
  right: RelativePosition.Right,
  bottom: RelativePosition.Bottom,
  "left-start": RelativePosition.LeftTop,
  "left-end": RelativePosition.Left,
  "right-start": RelativePosition.RightTop,
  "right-end": RelativePosition.Right,
  "top-start": RelativePosition.TopLeft,
  "top-end": RelativePosition.TopRight,
  "bottom-start": RelativePosition.BottomLeft,
  "bottom-end": RelativePosition.BottomRight
};
const relativePositionToPlacementMap = {
  [RelativePosition.Left]: "left",
  [RelativePosition.Top]: "top",
  [RelativePosition.Right]: "right",
  [RelativePosition.Bottom]: "bottom",
  [RelativePosition.LeftTop]: "left-start",
  [RelativePosition.RightTop]: "right-start",
  [RelativePosition.TopLeft]: "top-start",
  [RelativePosition.TopRight]: "top-end",
  [RelativePosition.BottomLeft]: "bottom-start",
  [RelativePosition.BottomRight]: "bottom-end"
};
class CardPopup extends reactExports.PureComponent {
  /** @internal */
  static contextType = WrapperContext;
  state = {
    size: { width: -1, height: -1 }
  };
  _onSizeKnown = (newSize) => {
    if (newSize.height === this.state.size.height && newSize.width === this.state.size.width)
      return;
    this.setState({ size: newSize });
  };
  _handleKeyDown = (event) => {
    switch (event.key) {
      case Key_enumExports.Key.Escape.valueOf():
        this._cancel();
        break;
    }
  };
  _cancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }
  render() {
    let point = PopupManager.getPopupPosition(
      this.props.el ?? this.context,
      this.props.pt,
      new Point(),
      this.state.size
    );
    const popupRect = CursorPopup.getPopupRect(
      point,
      this.props.offset,
      this.state.size,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      this.props.placement ?? mapToPlacement(this.props.relativePosition)
    );
    point = new Point(popupRect.left, popupRect.top);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PositionPopup,
      {
        className: classnames("uifw-no-border", "uifw-card"),
        point,
        onSizeKnown: this._onSizeKnown,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          DivWithOutsideClick,
          {
            onOutsideClick: this.props.onCancel,
            onKeyDown: this._handleKeyDown,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FocusTrap, { active: true, returnFocusOnDeactivate: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                content: this.props.content,
                title: this.props.title,
                items: this.props.items,
                onItemExecuted: this.props.onItemExecuted
              }
            ) })
          }
        )
      },
      this.props.id
    );
  }
}
function Card(props) {
  let titleNode;
  if (props.title) {
    if (typeof props.title === "string")
      titleNode = /* @__PURE__ */ jsxRuntimeExports.jsx(Text$1, { variant: "leading", children: props.title });
    else {
      const propertyValueRendererManager = PropertyValueRendererManager.defaultManager;
      const titleValue = propertyValueRendererManager.render(props.title);
      titleNode = /* @__PURE__ */ jsxRuntimeExports.jsx(Text$1, { variant: "leading", children: titleValue });
    }
  }
  const content = isReactContent(props.content) ? props.content.reactNode : (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageRenderer$1, { message: props.content })
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "uifw-card-content", children: [
      props.title && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        titleNode,
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "uifw-card-gap" })
      ] }),
      content
    ] }),
    props.items && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "uifw-card-separator" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ToolbarWithOverflow,
        {
          expandsTo: Direction.Bottom,
          panelAlignment: ToolbarPanelAlignment.Start,
          items: props.items,
          useDragInteraction: true,
          toolbarOpacitySetting: ToolbarOpacitySetting.Transparent,
          onItemExecuted: props.onItemExecuted
        }
      )
    ] })
  ] });
}
CardPopup.__docgenInfo = { "description": "Popup component for Input Editor\n@beta", "methods": [], "displayName": "CardPopup", "props": { "content": { "required": true, "tsType": { "name": "PopupContentType" }, "description": "" }, "title": { "required": true, "tsType": { "name": "union", "raw": "string | PropertyRecord | undefined", "elements": [{ "name": "string" }, { "name": "PropertyRecord" }, { "name": "undefined" }] }, "description": "" }, "items": { "required": true, "tsType": { "name": "union", "raw": "CommonToolbarItem[] | ToolbarItem[] | undefined", "elements": [{ "name": "Array", "elements": [{ "name": "CommonToolbarItem" }], "raw": "CommonToolbarItem[]" }, { "name": "Array", "elements": [{ "name": "union", "raw": "| ToolbarActionItem\n| ToolbarGroupItem\n| ToolbarCustomItem", "elements": [{ "name": "ToolbarActionItem" }, { "name": "ToolbarGroupItem" }, { "name": "ToolbarCustomItem" }] }], "raw": "ToolbarItem[]" }, { "name": "undefined" }] }, "description": "" }, "orientation": { "required": true, "tsType": { "name": "Orientation" }, "description": "@deprecated in 4.16.0. Not used by the {@link CardPopup} component." }, "onCancel": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" }, "onItemExecuted": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(item: any) => void", "signature": { "arguments": [{ "type": { "name": "any" }, "name": "item" }], "return": { "name": "void" } } }, "description": "" }, "el": { "required": false, "tsType": { "name": "HTMLElement" }, "description": "" } } };
Card.__docgenInfo = { "description": "Card component\n@beta", "methods": [], "displayName": "Card", "props": { "content": { "required": true, "tsType": { "name": "PopupContentType" }, "description": "" }, "title": { "required": true, "tsType": { "name": "union", "raw": "string | PropertyRecord | undefined", "elements": [{ "name": "string" }, { "name": "PropertyRecord" }, { "name": "undefined" }] }, "description": "" }, "items": { "required": false, "tsType": { "name": "union", "raw": "CommonToolbarItem[] | ToolbarItem[] | undefined", "elements": [{ "name": "Array", "elements": [{ "name": "CommonToolbarItem" }], "raw": "CommonToolbarItem[]" }, { "name": "Array", "elements": [{ "name": "union", "raw": "| ToolbarActionItem\n| ToolbarGroupItem\n| ToolbarCustomItem", "elements": [{ "name": "ToolbarActionItem" }, { "name": "ToolbarGroupItem" }, { "name": "ToolbarCustomItem" }] }], "raw": "ToolbarItem[]" }, { "name": "undefined" }] }, "description": "" }, "onItemExecuted": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(item: any) => void", "signature": { "arguments": [{ "type": { "name": "any" }, "name": "item" }], "return": { "name": "void" } } }, "description": "" } } };
class HTMLElementPopup extends reactExports.PureComponent {
  state = {
    size: { width: -1, height: -1 }
  };
  _onSizeKnown = (newSize) => {
    if (newSize.height === this.state.size.height && newSize.width === this.state.size.width)
      return;
    this.setState({ size: newSize });
  };
  render() {
    let point = PopupManager.getPopupPosition(
      this.props.el,
      this.props.pt,
      new Point(),
      this.state.size
    );
    const popupRect = CursorPopup.getPopupRect(
      point,
      this.props.offset,
      this.state.size,
      this.props.relativePosition
    );
    point = new Point(popupRect.left, popupRect.top);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PositionPopup,
      {
        className: "uifw-no-border",
        point,
        onSizeKnown: this._onSizeKnown,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(DivWithOutsideClick, { onOutsideClick: this.props.onCancel, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageRenderer$1, { message: this.props.element }) })
      },
      this.props.id
    );
  }
}
HTMLElementPopup.__docgenInfo = { "description": "Popup component for HTMLElement\n@alpha\n@deprecated in 4.11.0. Though this is alpha, the main interface to using it is not. Please use {@link @itwin/appui-react#UiFramework.showComponent}.", "methods": [], "displayName": "HTMLElementPopup", "props": { "element": { "required": true, "tsType": { "name": "HTMLElement" }, "description": "" }, "relativePosition": { "required": true, "tsType": { "name": "RelativePosition" }, "description": "" }, "orientation": { "required": true, "tsType": { "name": "Orientation" }, "description": "" }, "onCancel": { "required": true, "tsType": { "name": "OnCancelFunc" }, "description": "" } }, "composes": ["PopupPropsBase"] };
class InputEditorCommitHandler {
  constructor(onCommit) {
    this.onCommit = onCommit;
  }
  handleCommit = (args) => {
    let newValue = 0;
    if (args.newValue.valueFormat === PropertyValueFormat.Primitive && args.newValue.value !== void 0) {
      newValue = args.newValue.value;
    }
    this.onCommit(newValue);
  };
}
class InputEditorPopup extends reactExports.PureComponent {
  state = {
    size: { width: -1, height: -1 }
  };
  _onSizeKnown = (newSize) => {
    if (newSize.height === this.state.size.height && newSize.width === this.state.size.width)
      return;
    this.setState({ size: newSize });
  };
  render() {
    const point = PopupManager.getPopupPosition(
      this.props.el,
      this.props.pt,
      this.props.offset,
      this.state.size
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PositionPopup,
      {
        point,
        onSizeKnown: this._onSizeKnown,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(DivWithOutsideClick, { onOutsideClick: this.props.onCancel, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PositionPopupContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          EditorContainer,
          {
            propertyRecord: this.props.record,
            onCommit: this.props.commitHandler.handleCommit,
            onCancel: this.props.onCancel,
            setFocus: true
          }
        ) }) })
      },
      this.props.id
    );
  }
}
InputEditorPopup.__docgenInfo = { "description": "Popup component for Input Editor\n@alpha", "methods": [], "displayName": "InputEditorPopup", "props": { "record": { "required": true, "tsType": { "name": "PropertyRecord" }, "description": "" }, "onCancel": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" }, "commitHandler": { "required": true, "tsType": { "name": "InputEditorCommitHandler" }, "description": "" } }, "composes": ["PopupPropsBase"] };
class ClearKeyinPaletteHistoryCoreTool extends Tool {
  static toolId = "ClearKeyinPaletteHistory";
  static iconSpec = "icon-remove";
  static get minArgs() {
    return 0;
  }
  static get maxArgs() {
    return 0;
  }
  async run() {
    clearKeyinPaletteHistory();
    return true;
  }
}
const ClearKeyinPaletteHistoryTool = ToolUtilities.defineIcon(
  ClearKeyinPaletteHistoryCoreTool,
  /* @__PURE__ */ jsxRuntimeExports.jsx(SvgRemove, {})
);
const keyinPaletteTools = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ClearKeyinPaletteHistoryTool
}, Symbol.toStringTag, { value: "Module" }));
function matchesWords(word, target, contiguous = false) {
  if (!target || target.length === 0) {
    return null;
  }
  let result = null;
  let i = 0;
  word = word.toLowerCase();
  target = target.toLowerCase();
  while (i < target.length && (result = matchesWordsInternal(word, target, 0, i, contiguous)) === null) {
    i = nextWord(target, i + 1);
  }
  return result;
}
function matchesWordsInternal(word, target, i, j, contiguous) {
  if (i === word.length) {
    return [];
  } else if (j === target.length) {
    return null;
  } else if (!charactersMatch(word.charCodeAt(i), target.charCodeAt(j))) {
    return null;
  } else {
    let result = null;
    let nextWordIndex = j + 1;
    result = matchesWordsInternal(word, target, i + 1, j + 1, contiguous);
    if (!contiguous) {
      while (!result && (nextWordIndex = nextWord(target, nextWordIndex)) < target.length) {
        result = matchesWordsInternal(
          word,
          target,
          i + 1,
          nextWordIndex,
          contiguous
        );
        nextWordIndex++;
      }
    }
    return result === null ? null : join({ start: j, end: j + 1 }, result);
  }
}
function nextWord(word, start) {
  for (let i = start; i < word.length; i++) {
    if (isWordSeparator(word.charCodeAt(i)) || i > 0 && isWordSeparator(word.charCodeAt(i - 1))) {
      return i;
    }
  }
  return word.length;
}
function isWhitespace(code) {
  return code === 32 .valueOf() || code === 9 .valueOf() || code === 10 .valueOf() || code === 13 .valueOf();
}
const wordSeparators = /* @__PURE__ */ new Set();
"`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?".split("").forEach((s) => wordSeparators.add(s.charCodeAt(0)));
function isWordSeparator(code) {
  return isWhitespace(code) || wordSeparators.has(code);
}
function charactersMatch(codeA, codeB) {
  return codeA === codeB || isWordSeparator(codeA) && isWordSeparator(codeB);
}
function join(head, tail) {
  if (tail.length === 0) {
    tail = [head];
  } else if (head.end === tail[0].start) {
    tail[0].start = head.start;
  } else {
    tail.unshift(head);
  }
  return tail;
}
const KEYIN_PALETTE_NAMESPACE = "KeyinPalettePanel";
const KEYIN_HISTORY_KEY = "historyArray";
function clearKeyinPaletteHistory() {
  const uiSettingsStorage = UiFramework.getUiStateStorage();
  if (uiSettingsStorage) {
    void uiSettingsStorage.deleteSetting(
      KEYIN_PALETTE_NAMESPACE,
      KEYIN_HISTORY_KEY
    );
  }
}
function KeyinPalettePanel({
  keyins,
  onKeyinExecuted,
  historyLength: allowedHistoryLength = 6
}) {
  const { translate } = useTranslation();
  const [currentKeyin, setCurrentKeyin] = reactExports.useState("");
  const inputRef = reactExports.useRef(null);
  const keyinSeparator = "--#--";
  const [historyKeyins, setHistoryKeyins] = reactExports.useState([]);
  const uiSettingsStorage = useUiStateStorageHandler();
  reactExports.useEffect(() => {
    async function fetchState() {
      const settingsResult = await uiSettingsStorage.getSetting(
        KEYIN_PALETTE_NAMESPACE,
        KEYIN_HISTORY_KEY
      );
      if (UiStateStorageStatus.Success === settingsResult.status) {
        const filteredHistory = settingsResult.setting.filter(
          (keyin) => {
            const result = IModelApp.tools.parseKeyin(keyin);
            return result.ok;
          }
        );
        setHistoryKeyins(filteredHistory);
      } else {
        setHistoryKeyins([]);
      }
    }
    void fetchState();
  }, [uiSettingsStorage]);
  const storeHistoryKeyins = reactExports.useCallback(
    async (value) => {
      const result = await uiSettingsStorage.saveSetting(
        KEYIN_PALETTE_NAMESPACE,
        KEYIN_HISTORY_KEY,
        value
      );
      if (result.status !== UiStateStorageStatus.Success) {
        const errorDetails = new NotifyMessageDetails(
          OutputMessagePriority.Error,
          translate("keyinbrowser.couldNotSaveHistory")
        );
        IModelApp.notifications.outputMessage(errorDetails);
      }
    },
    [translate, uiSettingsStorage]
  );
  const allKeyins = reactExports.useMemo(() => {
    const availableKeyins = [];
    historyKeyins.forEach((value) => {
      availableKeyins.push({ value, isHistory: true });
    });
    availableKeyins.push(
      ...keyins.sort(
        (a, b) => a.value.toLowerCase().localeCompare(b.value.toLowerCase())
      )
    );
    return availableKeyins;
  }, [historyKeyins, keyins]);
  const submitKeyin = reactExports.useCallback(
    async (value) => {
      let detailedMessage;
      let message;
      try {
        switch (await IModelApp.tools.parseAndRun(value)) {
          case ParseAndRunResult.ToolNotFound:
            message = `translate("keyinbrowser.couldNotFindTool")} ${value}`;
            break;
          case ParseAndRunResult.BadArgumentCount:
            message = translate("keyinbrowser.incorrectArgs");
            break;
          case ParseAndRunResult.FailedToRun:
            message = translate("keyinbrowser.failedToRun");
            break;
        }
      } catch (ex) {
        {
          message = translate("keyinbrowser.exceptionOccurred");
          detailedMessage = `${translate(
            "keyinbrowser.exceptionOccurred"
          )}: ${String(ex)}`;
        }
      }
      if (void 0 !== message) {
        const errorDetails = new NotifyMessageDetails(
          OutputMessagePriority.Error,
          message,
          detailedMessage,
          OutputMessageType.Sticky
        );
        IModelApp.notifications.outputMessage(errorDetails);
      } else {
        if (value.length < 400 && value !== ClearKeyinPaletteHistoryTool.keyin && value !== ClearKeyinPaletteHistoryTool.englishKeyin) {
          const newHistoryEntries = [value];
          for (const entry of historyKeyins) {
            if (entry !== value) {
              newHistoryEntries.push(entry);
              if (newHistoryEntries.length >= allowedHistoryLength) break;
            }
          }
          await storeHistoryKeyins(newHistoryEntries);
        }
        if (onKeyinExecuted) onKeyinExecuted(value);
      }
    },
    [
      translate,
      onKeyinExecuted,
      storeHistoryKeyins,
      historyKeyins,
      allowedHistoryLength
    ]
  );
  const selectKeyin = reactExports.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [inputRef]);
  const updateKeyin = reactExports.useCallback(
    (value) => {
      setCurrentKeyin(value);
      selectKeyin();
    },
    [selectKeyin]
  );
  const getKeyinFromListboxValue = (value) => {
    if (value) {
      const indexSeparator = value.search(keyinSeparator);
      if (indexSeparator) return value.substring(0, indexSeparator);
    }
    return void 0;
  };
  const handleKeypressOnKeyinsList = reactExports.useCallback(
    async (event) => {
      const key = event.key;
      if (key === Key_enumExports.Key.Enter.valueOf()) {
        event.preventDefault();
        const keyinToSend = getKeyinFromListboxValue(
          event.currentTarget?.dataset?.focusvalue
        );
        if (keyinToSend) {
          if (event.ctrlKey) updateKeyin(keyinToSend);
          else await submitKeyin(keyinToSend);
        }
      }
    },
    [submitKeyin, updateKeyin]
  );
  const onListboxValueChange = reactExports.useCallback(
    async (value, isControlOrCommandPressed) => {
      const keyin = getKeyinFromListboxValue(value);
      if (keyin) {
        if (isControlOrCommandPressed) updateKeyin(keyin);
        else await submitKeyin(keyin);
      }
    },
    [submitKeyin, updateKeyin]
  );
  const onInputValueChange = reactExports.useCallback(
    (event) => {
      setCurrentKeyin(event.target.value);
    },
    []
  );
  const filteredKeyins = reactExports.useMemo(() => {
    const filteredHistory = [];
    if (void 0 === currentKeyin || 0 === currentKeyin.length) {
      return allKeyins;
    } else {
      const newKeyinSet = [];
      allKeyins.forEach((value) => {
        if (value.value.length >= currentKeyin.length) {
          const matches = matchesWords(
            currentKeyin,
            value.value,
            currentKeyin.length > 60
          );
          if (matches && matches.length) {
            if (value.isHistory) {
              filteredHistory.push(value);
              newKeyinSet.push({ ...value, matches });
            } else {
              if (-1 === filteredHistory.findIndex(
                (historyEntry) => historyEntry.value === value.value
              ))
                newKeyinSet.push({ ...value, matches });
            }
          }
        }
      });
      return newKeyinSet;
    }
  }, [allKeyins, currentKeyin]);
  const onInputValueKeyDown = reactExports.useCallback(
    async (event) => {
      if (Key_enumExports.Key.Enter.valueOf() === event.key) {
        event.preventDefault();
        event.stopPropagation();
        if (1 === filteredKeyins.length) {
          if (event.ctrlKey) updateKeyin(filteredKeyins[0].value);
          else await submitKeyin(filteredKeyins[0].value);
        } else {
          if (currentKeyin) await submitKeyin(currentKeyin);
        }
      } else if (Key_enumExports.Key.Tab.valueOf() === event.key && 1 === filteredKeyins.length) {
        event.preventDefault();
        event.stopPropagation();
        updateKeyin(filteredKeyins[0].value);
      } else {
        if (event.key === Key_enumExports.Key.ArrowDown.valueOf() && filteredKeyins.length > 0) {
          event.preventDefault();
          event.stopPropagation();
          if (inputRef.current) {
            const nextElement = inputRef.current.nextElementSibling;
            nextElement && nextElement.focus();
          }
        }
      }
    },
    [filteredKeyins, submitKeyin, currentKeyin, updateKeyin]
  );
  const lastHistoryIndex = filteredKeyins.findIndex((entry) => true !== entry.isHistory) - 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "uifw-command-palette-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        ref: inputRef,
        type: "text",
        onKeyDown: onInputValueKeyDown,
        className: "uifw-command-palette-input",
        "data-testid": "command-palette-input",
        onChange: onInputValueChange,
        placeholder: translate("keyinbrowser.placeholder"),
        value: currentKeyin,
        size: "small"
      }
    ),
    filteredKeyins.length > 0 && // eslint-disable-next-line @typescript-eslint/no-deprecated
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Listbox,
      {
        id: "uifw-command-sources",
        className: "map-manager-source-list",
        onKeyDown: handleKeypressOnKeyinsList,
        onListboxValueChange,
        children: filteredKeyins.map((entry, index) => {
          const value = `${entry.value}${keyinSeparator}${entry.isHistory ? "history" : "registry"}`;
          const itemClass = `uifw-command-palette-value-entry${index === lastHistoryIndex ? " uifw-history-bottom-border" : ""}`;
          return (
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ListboxItem,
              {
                className: itemClass,
                value,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilteredText, { value: entry.value, matches: entry.matches })
              },
              `${entry.value}-${index}`
            )
          );
        })
      }
    )
  ] });
}
KeyinPalettePanel.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "KeyinPalettePanel", "props": { "keyins": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "KeyinEntry" }], "raw": "KeyinEntry[]" }, "description": "" }, "onKeyinExecuted": { "required": false, "tsType": { "name": "OnItemExecutedFunc" }, "description": "" }, "historyLength": { "required": false, "tsType": { "name": "number" }, "description": "", "defaultValue": { "value": "6", "computed": false } } } };
function KeyinPalettePopup({
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  el,
  id,
  keyins,
  onCancel,
  onItemExecuted,
  anchorEl
}) {
  const _el = anchorEl ?? el;
  const [popupSize, setPopupSize] = reactExports.useState({ width: -1, height: -1 });
  const onSizeKnown = reactExports.useCallback(
    (newSize) => {
      if (newSize.height === popupSize.height && newSize.width === popupSize.width)
        return;
      setPopupSize(newSize);
    },
    [popupSize]
  );
  const cancel = reactExports.useCallback(() => {
    onCancel && onCancel();
  }, [onCancel]);
  const handleKeyDown = reactExports.useCallback(
    (event) => {
      switch (event.key) {
        case Key_enumExports.Key.Escape.valueOf():
          cancel();
          event.preventDefault();
          break;
      }
    },
    [cancel]
  );
  const xMid = _el.getBoundingClientRect().left + _el.getBoundingClientRect().width / 2;
  let point = new Point(xMid, _el.getBoundingClientRect().top);
  if (popupSize.width > 0) point = point.offsetX(popupSize.width / -2);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PositionPopup,
    {
      className: "uifw-command-palette-popup-container",
      point,
      onSizeKnown,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(DivWithOutsideClick, { onOutsideClick: onCancel, onKeyDown: handleKeyDown, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FocusTrap, { active: true, returnFocusOnDeactivate: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyinPalettePanel, { keyins, onKeyinExecuted: onItemExecuted }) }) })
    },
    id
  );
}
KeyinPalettePopup.__docgenInfo = { "description": "Keyin Palette Popup Component\n@public", "methods": [], "displayName": "KeyinPalettePopup", "props": { "id": { "required": true, "tsType": { "name": "string" }, "description": "" }, "el": { "required": true, "tsType": { "name": "HTMLElement" }, "description": "@deprecated in 4.11.0. Please use the optional `anchorEl` property moving forward." }, "keyins": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "KeyinEntry" }], "raw": "KeyinEntry[]" }, "description": "" }, "anchorEl": { "required": false, "tsType": { "name": "HTMLElement" }, "description": "" }, "onCancel": { "required": false, "tsType": { "name": "OnCancelFunc" }, "description": "" }, "onItemExecuted": { "required": false, "tsType": { "name": "OnItemExecutedFunc" }, "description": "" } } };
class ToolbarPopup extends reactExports.PureComponent {
  /** @internal */
  static contextType = WrapperContext;
  state = {
    size: { width: -1, height: -1 }
  };
  _onSizeKnown = (newSize) => {
    if (this.state.size.width === newSize.width && this.state.size.height === newSize.height)
      return;
    this.setState({ size: newSize });
  };
  _handleKeyDown = (event) => {
    switch (event.key) {
      case Key_enumExports.Key.Escape.valueOf():
        this._cancel();
        break;
    }
  };
  _cancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }
  render() {
    let point = PopupManager.getPopupPosition(
      this.props.el ?? this.context,
      this.props.pt,
      new Point(),
      this.state.size
    );
    const popupRect = CursorPopup.getPopupRect(
      point,
      this.props.offset,
      this.state.size,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      this.props.placement ?? mapToPlacement(this.props.relativePosition)
    );
    point = new Point(popupRect.left, popupRect.top);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PositionPopup,
      {
        className: "uifw-no-border",
        point,
        onSizeKnown: this._onSizeKnown,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          DivWithOutsideClick,
          {
            onOutsideClick: this.props.onCancel,
            onKeyDown: this._handleKeyDown,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FocusTrap, { active: true, returnFocusOnDeactivate: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Toolbar,
              {
                expandsTo: Direction.Bottom,
                panelAlignment: ToolbarPanelAlignment.Start,
                items: this.props.items,
                useDragInteraction: true,
                toolbarOpacitySetting: ToolbarOpacitySetting.Defaults,
                onItemExecuted: this.props.onItemExecuted
              }
            ) })
          }
        )
      },
      this.props.id
    );
  }
}
ToolbarPopup.__docgenInfo = { "description": "Popup component for Toolbar\n@beta", "methods": [], "displayName": "ToolbarPopup", "props": { "items": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "union", "raw": "| ToolbarActionItem\n| ToolbarGroupItem\n| ToolbarCustomItem", "elements": [{ "name": "ToolbarActionItem" }, { "name": "ToolbarGroupItem" }, { "name": "ToolbarCustomItem" }] }], "raw": "ToolbarItem[]" }, "description": "" }, "orientation": { "required": true, "tsType": { "name": "Orientation" }, "description": "" }, "onCancel": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" }, "onItemExecuted": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(item: any) => void", "signature": { "arguments": [{ "type": { "name": "any" }, "name": "item" }], "return": { "name": "void" } } }, "description": "" }, "el": { "required": false, "tsType": { "name": "HTMLElement" }, "description": "" } } };
function useToolSettingsNewEditors() {
  const { toolSettingsNewEditors } = usePreviewFeatures();
  return toolSettingsNewEditors;
}
function EditorLabel({
  uiDataProvider,
  item,
  isLeftmostRecord
}) {
  const [isDisabled, setIsDisabled] = reactExports.useState(!!item.isDisabled);
  const displayLabel = reactExports.useMemo(() => {
    return item.property.displayLabel || item.property.name;
  }, [item]);
  reactExports.useEffect(() => {
    return uiDataProvider.onSyncPropertiesChangeEvent.addListener((args) => {
      const mySyncItem = args.properties.find(
        (syncItem) => syncItem.propertyName === item.property.name
      );
      if (mySyncItem) {
        setIsDisabled(!!mySyncItem.isDisabled);
      }
    });
  }, [uiDataProvider, item]);
  const className = classnames(
    "uifw-default-label",
    !!isLeftmostRecord && "uifw-default-narrow-only-display"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Label,
    {
      className,
      htmlFor: item.property.name,
      disabled: isDisabled,
      children: [
        displayLabel,
        ":"
      ]
    }
  );
}
function PropertyEditor(props) {
  const {
    uiDataProvider,
    initialItem,
    itemPropertyName,
    isLock = false,
    setFocus,
    onCancel
  } = props;
  const getLatestRecordValue = reactExports.useCallback(
    (initial) => {
      let newRecord = UiLayoutDataProvider.getPropertyRecord(initial);
      const foundItem = isLock ? uiDataProvider.items.find(
        (item) => item.lockProperty?.property.name === initial.property.name
      ) : uiDataProvider.items.find(
        (item) => item.property.name === initial.property.name
      );
      if (foundItem) {
        if (isLock) {
          newRecord = newRecord.copyWithNewValue({
            value: foundItem.lockProperty.value.value,
            valueFormat: PropertyValueFormat.Primitive
          });
          newRecord.isDisabled = foundItem.lockProperty.isDisabled;
        } else {
          newRecord = newRecord.copyWithNewValue({
            value: foundItem.value.value,
            valueFormat: PropertyValueFormat.Primitive
          });
          newRecord.isDisabled = foundItem.isDisabled;
        }
      }
      return newRecord;
    },
    [isLock, uiDataProvider.items]
  );
  const currentRecord = getLatestRecordValue(initialItem);
  const [_propertyRecord, setPropertyRecord] = reactExports.useState(currentRecord);
  const propertyRecord = useLockButtonPropertyRecord(_propertyRecord, isLock);
  reactExports.useEffect(() => {
    return uiDataProvider.onSyncPropertiesChangeEvent.addListener((args) => {
      const mySyncItem = args.properties.find(
        (syncItem) => syncItem.propertyName === initialItem.property.name
      );
      if (mySyncItem) {
        const newPropertyValue = propertyRecord.copyWithNewValue(
          {
            value: mySyncItem.value.value,
            valueFormat: PropertyValueFormat.Primitive,
            displayValue: mySyncItem.value.displayValue
          },
          mySyncItem.property
        );
        if (mySyncItem.property) {
          if (mySyncItem.property.name === mySyncItem.propertyName) {
            newPropertyValue.isDisabled = mySyncItem.isDisabled;
            setPropertyRecord(newPropertyValue);
          } else {
            Logger.logError(
              "PropertyEditor",
              `Error trying to replace propertyName=${mySyncItem.propertyName} with property named ${mySyncItem.property.name}`
            );
          }
        } else {
          newPropertyValue.isDisabled = mySyncItem.isDisabled;
          setPropertyRecord(newPropertyValue);
        }
      }
    });
  }, [uiDataProvider, propertyRecord, initialItem.property.name]);
  reactExports.useEffect(() => {
    return uiDataProvider.onItemsReloadedEvent.addListener(() => {
      const newItem = findDialogItem(
        uiDataProvider,
        initialItem.property.name,
        isLock
      );
      if (!newItem) return;
      setPropertyRecord(getLatestRecordValue(newItem));
    });
  }, [uiDataProvider, initialItem.property.name, getLatestRecordValue, isLock]);
  const className = reactExports.useMemo(
    () => isLock ? "uifw-default-property-lock" : "uifw-default-editor",
    [isLock]
  );
  const handleCommit = reactExports.useCallback(
    (commit) => {
      assert(
        commit.newValue.valueFormat === PropertyValueFormat.Primitive && commit.propertyRecord.value.valueFormat === PropertyValueFormat.Primitive
      );
      const newPropertyValue = propertyRecord.copyWithNewValue(commit.newValue);
      const syncItem = {
        value: commit.newValue,
        propertyName: initialItem.property.name,
        isDisabled: newPropertyValue.isDisabled
      };
      uiDataProvider.applyUiPropertyChange(syncItem);
      uiDataProvider.reloadDialogItems(true);
    },
    [initialItem.property.name, propertyRecord, uiDataProvider]
  );
  const handleCancel = () => {
  };
  const useNewEditors = useToolSettingsNewEditors();
  const lockPropertyName = isLock ? initialItem.property.name : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PropertyEditorProvider,
    {
      uiDataProvider,
      itemPropertyName: itemPropertyName ?? initialItem.property.name,
      lockPropertyName,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, children: useNewEditors ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        PropertyRecordEditor,
        {
          propertyRecord,
          setFocus,
          onCommit: handleCommit,
          onCancel: onCancel ?? handleCancel,
          editorSystem: "new",
          size: "small"
        },
        initialItem.property.name
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        EditorContainer,
        {
          propertyRecord,
          setFocus,
          onCommit: handleCommit,
          onCancel: onCancel ?? handleCancel
        },
        initialItem.property.name
      ) }, initialItem.property.name)
    }
  );
}
class ComponentGenerator {
  constructor(_uiDataProvider, _onCancel) {
    this._uiDataProvider = _uiDataProvider;
    this._onCancel = _onCancel;
  }
  get uiDataProvider() {
    return this._uiDataProvider;
  }
  getEditor(item, isLock = false, setFocus = false, itemPropertyName) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PropertyEditor,
      {
        uiDataProvider: this.uiDataProvider,
        initialItem: item,
        itemPropertyName: itemPropertyName ?? item.property.name,
        isLock,
        setFocus,
        onCancel: this._onCancel
      },
      item.property.name
    );
  }
  generateRowWithButtonGroupEditors(row, rowIndex) {
    if (1 === row.items.length) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "uifw-default-inline-editor-group uifw-default-center-across-width",
          children: this.getEditor(row.items[0])
        },
        row.items[0].property.name
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "uifw-default-inline-editor-group uifw-default-center-across-width",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "uifw-default-inline-editor-group", children: row.items.map((item) => this.getEditor(item)) })
      },
      rowIndex
    );
  }
  generateEntryWithButtonGroupEditors(row, rowIndex) {
    if (1 === row.items.length) {
      return {
        labelNode: "",
        editorNode: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "uifw-default-inline-editor-group uifw-default-center-across-width",
            children: this.getEditor(row.items[0])
          },
          row.items[0].property.name
        )
      };
    }
    return {
      labelNode: "",
      editorNode: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "uifw-default-inline-editor-group uifw-default-center-across-width",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "uifw-default-inline-editor-group", children: row.items.map((item) => this.getEditor(item)) })
        },
        rowIndex
      )
    };
  }
  getEditorLabel(item, isLeftmostRecord = false) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditorLabel,
      {
        uiDataProvider: this.uiDataProvider,
        item,
        isLeftmostRecord
      }
    );
  }
  getLeftLockAndLabel(rowItem, multiplePropertiesOnRow) {
    const record = UiLayoutDataProvider.getPropertyRecord(rowItem);
    const lockEditor = UiLayoutDataProvider.hasAssociatedLockProperty(rowItem) ? this.getEditor(rowItem.lockProperty, true) : null;
    const label2 = UiLayoutDataProvider.editorWantsLabel(rowItem) ? this.getEditorLabel(rowItem) : null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      LeftLockAndLabel,
      {
        lockEditor,
        label: label2,
        multiplePropertiesOnRow,
        itemPropertyName: rowItem.property.name
      },
      `lock-${record.property.name}`
    );
  }
  getInlineLabelAndEditor(item, isLeftmostRecord) {
    const label2 = UiLayoutDataProvider.editorWantsLabel(item) ? this.getEditorLabel(item, isLeftmostRecord) : null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "uifw-default-inline-label-and-editor",
        children: [
          label2,
          this.getEditor(item)
        ]
      },
      item.property.name
    );
  }
  getRowWithMultipleEditors(row) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "uifw-default-inline-editor-group", children: row.items.map(
      (item, index) => this.getInlineLabelAndEditor(item, index === 0)
    ) });
  }
  getDivForRow(row) {
    if (row.items.length === 1) return this.getEditor(row.items[0]);
    return this.getRowWithMultipleEditors(row);
  }
  getRow(row, rowIndex) {
    if (UiLayoutDataProvider.onlyContainButtonGroupEditors(row)) {
      return this.generateRowWithButtonGroupEditors(row, rowIndex);
    } else {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
        this.getLeftLockAndLabel(row.items[0], row.items.length > 1),
        this.getDivForRow(row)
      ] }, rowIndex);
    }
  }
  getToolSettingsEntry(row, rowIndex) {
    if (UiLayoutDataProvider.onlyContainButtonGroupEditors(row)) {
      return this.generateEntryWithButtonGroupEditors(row, rowIndex);
    } else {
      return {
        labelNode: this.getLeftLockAndLabel(row.items[0], row.items.length > 1),
        editorNode: this.getDivForRow(row)
      };
    }
  }
  /** ToolSettingsEntries are used by the tool settings bar. */
  getToolSettingsEntries() {
    return this.uiDataProvider.rows.map(
      (row, index) => this.getToolSettingsEntry(row, index)
    );
  }
}
function findDialogItem(uiDataProvider, propertyName, isLock) {
  const dialogItem = uiDataProvider.items.find((item) => {
    if (isLock) {
      return item.lockProperty?.property.name === propertyName;
    }
    return item.property.name === propertyName;
  });
  return isLock ? dialogItem?.lockProperty : dialogItem;
}
function LeftLockAndLabel(props) {
  const { lockEditor, label: label2, multiplePropertiesOnRow, itemPropertyName } = props;
  const { lockDecorations } = reactExports.useContext(LockContext) ?? {};
  const lockDecoration = reactExports.useMemo(() => {
    return lockDecorations?.[itemPropertyName];
  }, [lockDecorations, itemPropertyName]);
  const classNames = multiplePropertiesOnRow ? "uifw-default-lock-and-label uifw-default-wide-only-display" : "uifw-default-lock-and-label";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: classNames, children: [
    lockDecoration ? void 0 : lockEditor,
    label2
  ] });
}
const ToolSettingsContentContext = reactExports.createContext({
  availableContentWidth: 0
});
function ToolSettingsGridContainer({
  componentGenerator
}) {
  const { availableContentWidth } = reactExports.useContext(
    ToolSettingsContentContext
  );
  const layoutMode = toLayoutMode(availableContentWidth);
  const className = classnames(
    "uifw-tool-settings-grid-container",
    1 === layoutMode && "uifw-default-narrow"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogGridContainer,
    {
      componentGenerator,
      containerClassName: className
    }
  );
}
function DialogGridContainer({
  componentGenerator,
  containerClassName
}) {
  const className = classnames("uifw-default-container", containerClassName);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, children: componentGenerator.uiDataProvider.rows.map((row, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(LockProvider, { children: componentGenerator.getRow(row, index) }, index)) });
}
function DefaultDialogGridContainer({
  componentGenerator,
  isToolSettings
}) {
  return !!isToolSettings ? /* @__PURE__ */ jsxRuntimeExports.jsx(ToolSettingsGridContainer, { componentGenerator }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DialogGridContainer, { componentGenerator });
}
const toLayoutMode = (width) => {
  return width < 250 && width > 0 ? 1 : 0;
};
ToolSettingsGridContainer.__docgenInfo = { "description": "Component to provide grid of property editors\n@public", "methods": [], "displayName": "ToolSettingsGridContainer", "props": { "componentGenerator": { "required": true, "tsType": { "name": "ComponentGenerator" }, "description": "" } } };
DialogGridContainer.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "DialogGridContainer", "props": { "componentGenerator": { "required": true, "tsType": { "name": "ComponentGenerator" }, "description": "" }, "containerClassName": { "required": false, "tsType": { "name": "string" }, "description": "" } } };
DefaultDialogGridContainer.__docgenInfo = { "description": "DefaultDialogGridContainer populates a React node with the items specified by the UiLayoutDataProvider\n@public", "methods": [], "displayName": "DefaultDialogGridContainer", "props": { "componentGenerator": { "required": true, "tsType": { "name": "ComponentGenerator" }, "description": "" }, "isToolSettings": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
class ToolSettingsPopup extends reactExports.PureComponent {
  state = {
    size: { width: -1, height: -1 }
  };
  constructor(props) {
    super(props);
  }
  _onSizeKnown = (newSize) => {
    if (newSize.height === this.state.size.height && newSize.width === this.state.size.width)
      return;
    this.setState({ size: newSize });
  };
  _handleKeyDown = (e) => {
    switch (e.key) {
      case Key_enumExports.Key.Escape.valueOf():
        if (this.props.onCancel) this.props.onCancel();
        break;
    }
  };
  render() {
    const componentGenerator = new ComponentGenerator(
      this.props.dataProvider,
      this.props.onCancel
    );
    let point = PopupManager.getPopupPosition(
      this.props.el,
      this.props.pt,
      new Point(),
      this.state.size
    );
    const popupRect = CursorPopup.getPopupRect(
      point,
      this.props.offset,
      this.state.size,
      this.props.relativePosition
    );
    point = new Point(popupRect.left, popupRect.top);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PositionPopup,
      {
        point,
        onSizeKnown: this._onSizeKnown,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          DivWithOutsideClick,
          {
            onOutsideClick: this.props.onCancel,
            onKeyDown: this._handleKeyDown,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(PositionPopupContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FocusTrap, { active: true, returnFocusOnDeactivate: true, children: componentGenerator && /* @__PURE__ */ jsxRuntimeExports.jsx(DialogGridContainer, { componentGenerator }) }) })
          }
        )
      },
      this.props.id
    );
  }
}
ToolSettingsPopup.__docgenInfo = { "description": "Popup component for Tool Settings\n@beta", "methods": [], "displayName": "ToolSettingsPopup", "props": { "dataProvider": { "required": true, "tsType": { "name": "DialogLayoutDataProvider" }, "description": "" }, "relativePosition": { "required": true, "tsType": { "name": "RelativePosition" }, "description": "" }, "orientation": { "required": true, "tsType": { "name": "Orientation" }, "description": "" }, "onCancel": { "required": true, "tsType": { "name": "OnCancelFunc" }, "description": "" } }, "composes": ["PopupPropsBase"] };
const ComponentPopup = ({
  pt,
  children,
  offset,
  placement,
  id,
  onCancel,
  anchor
}) => {
  const wrapper = reactExports.useContext(WrapperContext);
  const [size, setSize] = reactExports.useState({ width: -1, height: -1 });
  let point = PopupManager.getPopupPosition(
    anchor ?? wrapper,
    pt,
    new Point(),
    size
  );
  const popupRect = CursorPopup.getPopupRect(point, offset, size, placement);
  point = new Point(popupRect.left, popupRect.top);
  const handleSizeKnown = (newSize) => {
    if (newSize.height === size.height && newSize.width === size.width) return;
    setSize(newSize);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PositionPopup,
    {
      className: "uifw-no-border",
      point,
      onSizeKnown: handleSizeKnown,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(DivWithOutsideClick, { onOutsideClick: onCancel, children })
    },
    id
  );
};
ComponentPopup.__docgenInfo = { "description": "Displays a React Component inside a popup. The user-facing API is the {@link PopupManager} and should be used instead of this component.\n@internal", "methods": [], "displayName": "ComponentPopup", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" }, "placement": { "required": true, "tsType": { "name": "union", "raw": "Side | `${Side}-${Alignment}`", "elements": [{ "name": "union", "raw": '"left" | "top" | "right" | "bottom"', "elements": [{ "name": "literal", "value": '"left"' }, { "name": "literal", "value": '"top"' }, { "name": "literal", "value": '"right"' }, { "name": "literal", "value": '"bottom"' }] }, { "name": "literal", "value": "`${Side}-${Alignment}`" }] }, "description": "" }, "orientation": { "required": true, "tsType": { "name": "Orientation" }, "description": "" }, "onCancel": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" }, "anchor": { "required": false, "tsType": { "name": "HTMLElement" }, "description": "" } }, "composes": ["Omit"] };
class PopupsChangedEvent extends UiEvent {
}
const isReactContent = (content) => {
  return content.reactNode !== void 0;
};
class PopupManager {
  static _popups = [];
  static _editorId = "InputEditor";
  static _toolbarId = "Toolbar";
  static _htmlElementId = "HTMLElement";
  static _cardId = "Card";
  static _toolSettingsId = "ToolSettings";
  static _keyPalettePopupId = "KeyinPalette";
  static _defaultOffset = { x: 8, y: 8 };
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static onPopupsChangedEvent = new PopupsChangedEvent();
  static get popupCount() {
    return this._popups.length;
  }
  static get popups() {
    return this._popups;
  }
  static set popups(popups) {
    if (this._popups === popups) return;
    this._popups = popups;
    this.onPopupsChangedEvent.emit({ popups });
  }
  /** @internal */
  static clearPopups() {
    this.popups = [];
  }
  static addPopup(popupInfo) {
    const popups = [...PopupManager._popups, popupInfo];
    this.popups = popups;
  }
  static updatePopup(popupInfo, itemIndex) {
    if (itemIndex < 0) return;
    const popups = [
      ...PopupManager._popups.slice(0, itemIndex),
      popupInfo,
      ...PopupManager._popups.slice(itemIndex + 1)
    ];
    this.popups = popups;
  }
  static addOrUpdatePopup(popupInfo) {
    const itemIndex = PopupManager._popups.findIndex(
      (info) => info.id === popupInfo.id
    );
    if (itemIndex >= 0) PopupManager.updatePopup(popupInfo, itemIndex);
    else PopupManager.addPopup(popupInfo);
  }
  static removePopup(id) {
    const index = PopupManager._popups.findIndex(
      (info) => id === info.id
    );
    let result = true;
    if (index >= 0) {
      const popups = PopupManager._popups.filter((info) => {
        return info.id !== id;
      });
      this.popups = popups;
    } else {
      Logger.logError(
        UiFramework.loggerCategory("PopupManager"),
        `removePopup: Could not find popup with id of '${id}'`
      );
      result = false;
    }
    return result;
  }
  static get defaultOffset() {
    return PopupManager._defaultOffset;
  }
  static set defaultOffset(offset) {
    PopupManager._defaultOffset = offset;
  }
  static showInputEditor(el, pt, value, propertyDescription, onCommit, onCancel) {
    const primitiveValue = {
      value,
      valueFormat: PropertyValueFormat.Primitive
    };
    const record = new PropertyRecord(primitiveValue, propertyDescription);
    const commitHandler = new InputEditorCommitHandler(onCommit);
    const id = PopupManager._editorId;
    const component = /* @__PURE__ */ jsxRuntimeExports.jsx(
      InputEditorPopup,
      {
        id,
        el,
        pt,
        offset: PopupManager.defaultOffset,
        record,
        onCancel,
        commitHandler
      }
    );
    const popupInfo = {
      id,
      pt,
      component,
      parentDocument: el.ownerDocument,
      parent: el.ownerDocument
    };
    PopupManager.addOrUpdatePopup(popupInfo);
    return true;
  }
  static hideInputEditor() {
    return PopupManager.removePopup(PopupManager._editorId);
  }
  static showKeyinPalette(keyins, el, onItemExecuted, onCancel) {
    const id = PopupManager._keyPalettePopupId;
    const cancelFn = onCancel ?? (() => PopupManager.hideKeyinPalette());
    const component = /* @__PURE__ */ jsxRuntimeExports.jsx(
      KeyinPalettePopup,
      {
        keyins,
        id,
        el,
        onItemExecuted,
        onCancel: cancelFn
      }
    );
    const pt = { x: 0, y: 0 };
    const popupInfo = {
      id,
      pt,
      component,
      parentDocument: el?.ownerDocument
    };
    PopupManager.addOrUpdatePopup(popupInfo);
    return true;
  }
  static hideKeyinPalette() {
    return PopupManager.removePopup(PopupManager._keyPalettePopupId);
  }
  /** @deprecated in 4.16.0. Use {@link PopupManager.displayToolbar} instead. */
  static showToolbar(toolbarProps, el, pt, offset, onItemExecuted, onCancel, relativePosition) {
    PopupManager.displayToolbar(toolbarProps.items, {
      anchor: el,
      location: pt,
      offset,
      onCancel,
      placement: mapToPlacement(relativePosition),
      onItemExecuted
    });
    return true;
  }
  static displayToolbar(items, options) {
    const id = options.id ?? PopupManager._toolbarId;
    const { anchor, location, offset, onCancel, placement, onItemExecuted } = options;
    const component = /* @__PURE__ */ jsxRuntimeExports.jsx(
      ToolbarPopup,
      {
        id,
        el: anchor,
        pt: location,
        offset,
        items,
        placement,
        orientation: Orientation.Horizontal,
        onCancel,
        onItemExecuted
      }
    );
    const popupInfo = {
      id,
      pt: location,
      component,
      parentDocument: anchor?.ownerDocument ?? InternalConfigurableUiManager.getWrapperDocument(),
      parent: anchor?.ownerDocument
    };
    PopupManager.addOrUpdatePopup(popupInfo);
    return true;
  }
  static hideToolbar() {
    return PopupManager.removePopup(PopupManager._toolbarId);
  }
  /** @deprecated in 4.16.0. Use {@link PopupManager.showComponent} instead. */
  static showHTMLElement(displayElement, el, pt, offset, onCancel, relativePosition) {
    const id = PopupManager._htmlElementId;
    const component = (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        HTMLElementPopup,
        {
          id,
          el,
          pt,
          offset,
          element: displayElement,
          relativePosition,
          orientation: Orientation.Horizontal,
          onCancel
        }
      )
    );
    const popupInfo = {
      id,
      pt,
      component,
      parentDocument: el.ownerDocument
    };
    PopupManager.addOrUpdatePopup(popupInfo);
    return true;
  }
  /** @deprecated in 4.16.0. Use {@link PopupManager.hideComponent} instead. */
  static hideHTMLElement() {
    return PopupManager.removePopup(PopupManager._htmlElementId);
  }
  /**
   * Displays a React component as a popup.
   * @param displayElement The React component to display.
   * @param options for displaying the component.
   */
  static showComponent(displayElement, options) {
    const { onCancel, location, offset, placement, anchor, id } = options;
    const _id = PopupManager._htmlElementId;
    const component = /* @__PURE__ */ jsxRuntimeExports.jsx(
      ComponentPopup,
      {
        id: id ?? _id,
        anchor: anchor ?? void 0,
        pt: location,
        offset,
        placement,
        orientation: Orientation.Horizontal,
        onCancel,
        children: displayElement
      }
    );
    const popupInfo = {
      id: id ?? _id,
      pt: location,
      component,
      parentDocument: anchor?.ownerDocument ?? InternalConfigurableUiManager.getWrapperDocument()
    };
    PopupManager.addOrUpdatePopup(popupInfo);
    return true;
  }
  static hideComponent(id) {
    return PopupManager.removePopup(id ?? PopupManager._htmlElementId);
  }
  /** @deprecated in 4.16.0. Use {@link PopupManager.displayCard} instead. */
  static showCard(content, title, toolbarProps, el, pt, offset, onItemExecuted, onCancel, relativePosition) {
    const id = PopupManager._cardId;
    const placement = mapToPlacement(relativePosition);
    const component = /* @__PURE__ */ jsxRuntimeExports.jsx(
      CardPopup,
      {
        id,
        el,
        pt,
        offset,
        content,
        title,
        items: toolbarProps ? toolbarProps.items : void 0,
        placement,
        orientation: Orientation.Horizontal,
        onCancel,
        onItemExecuted
      }
    );
    const popupInfo = {
      id,
      pt,
      component,
      parentDocument: el.ownerDocument,
      parent: el.ownerDocument
    };
    PopupManager.addOrUpdatePopup(popupInfo);
    return true;
  }
  static displayCard(content, options) {
    const id = options.id ?? PopupManager._cardId;
    const {
      onCancel,
      location,
      placement,
      offset,
      anchor,
      title,
      toolbarProps,
      onItemExecuted
    } = options;
    const component = /* @__PURE__ */ jsxRuntimeExports.jsx(
      CardPopup,
      {
        id,
        el: anchor,
        pt: location,
        offset,
        content: { reactNode: content },
        title,
        items: toolbarProps?.items,
        placement,
        orientation: Orientation.Horizontal,
        onCancel,
        onItemExecuted
      }
    );
    const popupInfo = {
      id,
      pt: location,
      component,
      parentDocument: anchor?.ownerDocument ?? InternalConfigurableUiManager.getWrapperDocument(),
      parent: anchor?.ownerDocument
    };
    PopupManager.addOrUpdatePopup(popupInfo);
    return true;
  }
  static hideCard(id) {
    const index = PopupManager._popups.findIndex(
      (info) => id ?? PopupManager._cardId === info.id
    );
    if (index >= 0) return PopupManager.removePopup(PopupManager._cardId);
    return false;
  }
  static openToolSettings(dataProvider, el, pt, offset, onCancel, relativePosition) {
    const id = PopupManager._toolSettingsId;
    const component = /* @__PURE__ */ jsxRuntimeExports.jsx(
      ToolSettingsPopup,
      {
        id,
        el,
        pt,
        offset,
        dataProvider,
        relativePosition,
        orientation: Orientation.Horizontal,
        onCancel
      }
    );
    const popupInfo = {
      id,
      pt,
      component,
      parentDocument: el.ownerDocument
    };
    PopupManager.addOrUpdatePopup(popupInfo);
    return true;
  }
  static closeToolSettings() {
    return PopupManager.removePopup(PopupManager._toolSettingsId);
  }
  static getPopupPosition(el, pt, offset, size) {
    const containerBounds = Rectangle.create(el.getBoundingClientRect());
    const relativeBounds = Rectangle.createFromSize(size).offset(pt);
    const adjustedPosition = offsetAndContainInContainer(
      relativeBounds,
      containerBounds.getSize(),
      offset
    );
    const position = adjustedPosition.offset(containerBounds.topLeft());
    return position;
  }
}
class PopupRenderer extends reactExports.Component {
  /** @internal */
  static contextType = WrapperContext;
  state = {
    parentDocument: null,
    popups: PopupManager.popups
  };
  componentDidMount() {
    Logger.logInfo("PopupManager", `mounting PopupManager`);
    PopupManager.onPopupsChangedEvent.addListener(
      this._handlePopupsChangedEvent
    );
  }
  componentWillUnmount() {
    Logger.logInfo("PopupManager", `un-mounting PopupManager`);
    PopupManager.onPopupsChangedEvent.removeListener(
      this._handlePopupsChangedEvent
    );
  }
  _handleRefSet = (popupDiv) => {
    this.setState({ parentDocument: popupDiv?.ownerDocument ?? null });
  };
  render() {
    if (PopupManager.popupCount <= 0) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "appui-react-popup-render-container",
        ref: this._handleRefSet,
        children: this.state.parentDocument && this.state.popups.filter(
          (info) => (info.parent ?? // eslint-disable-next-line @typescript-eslint/no-deprecated
          info.parentDocument ?? this.context.ownerDocument) === this.state.parentDocument
        ).map((popupInfo) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: popupInfo.component }, popupInfo.id);
        })
      }
    );
  }
  _handlePopupsChangedEvent = (args) => {
    this.setState({ popups: args.popups });
  };
}
PopupRenderer.__docgenInfo = { "description": "Popup Renderer.\n@public", "methods": [], "displayName": "PopupRenderer" };
class ActivityTracker {
  _intervalId;
  _idleTimeout;
  _intervalTimeout = 1e3;
  _events = [
    "keydown",
    "wheel",
    "scroll",
    "mousedown",
    "mousemove",
    "touchstart",
    "touchmove",
    "pointerdown",
    "pointermove",
    "visibilitychange"
  ];
  /** Initializes the time tracker and adds event listeners
   */
  initialize(props) {
    if (props) {
      this._idleTimeout = props.idleTimeout;
      if (props.intervalTimeout !== void 0)
        this._intervalTimeout = props.intervalTimeout;
    }
    this._bindEvents();
    this._intervalId = setInterval(
      this._trackUiInterval,
      this._intervalTimeout
    );
  }
  /** Terminates the time tracker and removes event listeners
   */
  terminate() {
    this._unbindEvents();
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = void 0;
    }
  }
  _bindEvents = () => {
    this._events.forEach((e) => {
      window.addEventListener(e, this._trackUiActivity, { capture: true });
    });
  };
  _unbindEvents = () => {
    this._events.forEach((e) => {
      window.removeEventListener(e, this._trackUiActivity, { capture: true });
    });
  };
  _trackUiInterval = () => {
    InternalConfigurableUiManager.onUiIntervalEvent.emit({
      idleTimeout: this._idleTimeout
    });
  };
  _trackUiActivity = (event) => {
    InternalConfigurableUiManager.onUiActivityEvent.emit({ event });
  };
}
class InternalToolSettingsManager {
  static _useDefaultToolSettingsProvider = false;
  static _toolIdForToolSettings = "";
  static _activeToolLabel = "";
  static _activeToolDescription = "";
  static syncToolSettingsProperties(toolId, syncProperties) {
    InternalToolSettingsManager.onSyncToolSettingsProperties.emit({
      toolId,
      syncProperties
    });
  }
  static reloadToolSettingsProperties() {
    InternalToolSettingsManager.onReloadToolSettingsProperties.emit();
  }
  static dispatchSyncUiEvent(syncEventId, useImmediateDispatch) {
    if (useImmediateDispatch)
      SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(syncEventId);
    else SyncUiEventDispatcher.dispatchSyncUiEvent(syncEventId);
  }
  /** Initializes the ToolSettingsManager
   * @internal
   */
  static initialize() {
    if (IModelApp && IModelApp.toolAdmin) {
      IModelApp.toolAdmin.toolSettingsChangeHandler = InternalToolSettingsManager.syncToolSettingsProperties;
      IModelApp.toolAdmin.reloadToolSettingsHandler = InternalToolSettingsManager.reloadToolSettingsProperties;
      IModelApp.toolAdmin.toolSyncUiEventDispatcher = InternalToolSettingsManager.dispatchSyncUiEvent;
    }
  }
  /** clear cached Tool Settings properties. */
  static clearToolSettingsData() {
    InternalToolSettingsManager.useDefaultToolSettingsProvider = false;
    InternalToolSettingsManager._activeToolLabel = "";
    InternalToolSettingsManager._activeToolDescription = "";
    InternalToolSettingsManager._toolIdForToolSettings = "";
  }
  /** Cache Tool Settings properties */
  static initializeToolSettingsData(toolSettingsProperties, toolId, toolLabel, toolDescription) {
    InternalToolSettingsManager.clearToolSettingsData();
    if (toolLabel) InternalToolSettingsManager._activeToolLabel = toolLabel;
    if (toolDescription)
      InternalToolSettingsManager._activeToolDescription = toolDescription;
    if (toolSettingsProperties && toolSettingsProperties.length > 0) {
      if (toolId) InternalToolSettingsManager._toolIdForToolSettings = toolId;
      InternalToolSettingsManager._useDefaultToolSettingsProvider = true;
      return true;
    }
    return false;
  }
  /** Set of data used in Tool Settings for the specified tool. The tool specified should be the "active" tool.
   */
  static initializeDataForTool(tool) {
    InternalToolSettingsManager.initializeToolSettingsData(
      tool.supplyToolSettingsProperties(),
      tool.toolId,
      tool.flyover,
      tool.description
    );
  }
  /** Returns the toolSettings properties that can be used to populate the tool settings widget. */
  static get toolSettingsProperties() {
    if (IModelApp.toolAdmin && IModelApp.toolAdmin.activeTool && IModelApp.toolAdmin.activeTool.toolId === InternalToolSettingsManager._toolIdForToolSettings) {
      const properties = IModelApp.toolAdmin.activeTool.supplyToolSettingsProperties();
      if (properties) return properties;
    }
    return [];
  }
  /** Returns true if the Tool Settings are to be auto populated from the toolSettingsProperties.
   * The setter is chiefly for testing.
   */
  static get useDefaultToolSettingsProvider() {
    return InternalToolSettingsManager._useDefaultToolSettingsProvider;
  }
  static set useDefaultToolSettingsProvider(useDefaultToolSettings) {
    InternalToolSettingsManager._useDefaultToolSettingsProvider = useDefaultToolSettings;
  }
  /** The name of the active tool. This is typically the flyover text specified for the tool. */
  static get activeToolLabel() {
    return InternalToolSettingsManager._activeToolLabel;
  }
  static set activeToolLabel(label2) {
    InternalToolSettingsManager._activeToolLabel = label2;
  }
  /** Returns the description of the active tool. */
  static get activeToolDescription() {
    return InternalToolSettingsManager._activeToolDescription;
  }
  /** Get ToolSettings Properties sync event. */
  static onSyncToolSettingsProperties = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static onReloadToolSettingsProperties = new BeUiEvent();
  /** Gets the Id of the active tool. If a tool is not active, blank is returned.
   * @return  Id of the active tool, or blank if one is not active.
   */
  static get toolIdForToolSettings() {
    return InternalToolSettingsManager._toolIdForToolSettings;
  }
  static focusIntoToolSettings() {
    let divElement = document.querySelector("div.uifw-toolSettings-docked");
    if (divElement) {
      if (focusIntoContainer(divElement)) return true;
    }
    divElement = document.querySelector(
      "div.uifw-tool-settings-grid-container"
    );
    if (divElement) {
      if (focusIntoContainer(divElement)) return true;
    }
    return false;
  }
}
var FunctionKey = /* @__PURE__ */ ((FunctionKey2) => {
  FunctionKey2["F1"] = "F1";
  FunctionKey2["F2"] = "F2";
  FunctionKey2["F3"] = "F3";
  FunctionKey2["F4"] = "F4";
  FunctionKey2["F5"] = "F5";
  FunctionKey2["F6"] = "F6";
  FunctionKey2["F7"] = "F7";
  FunctionKey2["F8"] = "F8";
  FunctionKey2["F9"] = "F9";
  FunctionKey2["F10"] = "F10";
  FunctionKey2["F11"] = "F11";
  FunctionKey2["F12"] = "F12";
  return FunctionKey2;
})(FunctionKey || {});
var SpecialKey = /* @__PURE__ */ ((SpecialKey2) => {
  SpecialKey2["Home"] = "Home";
  SpecialKey2["End"] = "End";
  SpecialKey2["PageUp"] = "PageUp";
  SpecialKey2["PageDown"] = "PageDown";
  SpecialKey2["Escape"] = "Escape";
  SpecialKey2["Delete"] = "Delete";
  SpecialKey2["Insert"] = "Insert";
  SpecialKey2["Tab"] = "Tab";
  SpecialKey2["ArrowLeft"] = "ArrowLeft";
  SpecialKey2["ArrowRight"] = "ArrowRight";
  SpecialKey2["ArrowUp"] = "ArrowUp";
  SpecialKey2["ArrowDown"] = "ArrowDown";
  SpecialKey2["Enter"] = "Enter";
  SpecialKey2["Return"] = "Enter";
  SpecialKey2["Space"] = " ";
  SpecialKey2["Backspace"] = "Backspace";
  SpecialKey2["Clear"] = "Clear";
  SpecialKey2["Divide"] = "Divide";
  SpecialKey2["Multiply"] = "Multiply";
  SpecialKey2["Subtract"] = "Subtract";
  SpecialKey2["Add"] = "Add";
  SpecialKey2["Decimal"] = "Decimal";
  return SpecialKey2;
})(SpecialKey || {});
class KeyboardShortcut extends ItemDefBase {
  _key;
  _item;
  _shortcuts;
  _execute;
  _isAltKeyRequired = false;
  _isCtrlKeyRequired = false;
  _isShiftKeyRequired = false;
  _isFunctionKey = false;
  _isSpecialKey = false;
  constructor(props) {
    super(props);
    this._key = props.key;
    if (this._key in FunctionKey) this._isFunctionKey = true;
    if (this._key in SpecialKey) this._isSpecialKey = true;
    this._shortcuts = new KeyboardShortcutContainer();
    if (props.item) {
      this._item = props.item;
      if (!this.iconSpec) this.iconSpec = this._item.iconSpec;
      if (!this.label) this.setLabel(this._item.label);
      if (!this.tooltip) this.setTooltip(this._item.tooltip);
      if (this.isDisabled === void 0)
        this.isDisabled = this._item.isDisabled;
      if (this.isHidden === void 0) this.isHidden = this._item.isHidden;
    } else if (props.execute) {
      this._execute = props.execute;
    } else if (props.shortcuts) {
      props.shortcuts.forEach((childProps) => {
        const shortcut = new KeyboardShortcut(childProps);
        this._shortcuts.registerKey(shortcut.keyMapKey, shortcut);
      });
    } else {
      throw new UiError(
        UiFramework.loggerCategory("KeyboardShortcut"),
        `Either 'item', 'execute' or 'shortcuts' must be specified for '${props.key}' key.`
      );
    }
    if (props.isAltKeyRequired !== void 0)
      this._isAltKeyRequired = props.isAltKeyRequired;
    if (props.isCtrlKeyRequired !== void 0)
      this._isCtrlKeyRequired = props.isCtrlKeyRequired;
    if (props.isShiftKeyRequired !== void 0)
      this._isShiftKeyRequired = props.isShiftKeyRequired;
    if (props.iconNode !== void 0) this.iconSpec = /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: props.iconNode });
  }
  /** Returns the id for this shortcut */
  get id() {
    return this.keyMapKey;
  }
  /** Returns the shortcut container */
  get shortcutContainer() {
    return this._shortcuts;
  }
  /** Finds a shortcut with a given key in the shortcut's container */
  getShortcut(mapKey) {
    return this._shortcuts.findKey(mapKey);
  }
  /** Returns the shortcut's key map key used as the id */
  get keyMapKey() {
    const keyMapKey = KeyboardShortcutContainer.generateKeyMapKey(
      this.key,
      this._isAltKeyRequired,
      this._isCtrlKeyRequired,
      this._isShiftKeyRequired
    );
    return keyMapKey;
  }
  /** Returns the [[ActionButtonItemDef]] associated with this shortcut */
  get item() {
    return this._item;
  }
  /** Called when the [[ActionButtonItemDef]] associated with this shortcut is invoked */
  itemPicked() {
    if (this._shortcuts.areKeyboardShortcutsAvailable()) {
      this._shortcuts.showShortcutsMenu();
    } else {
      setTimeout(() => {
        if (this._item) this._item.execute();
        else if (this._execute) this._execute();
      });
    }
  }
  /** Gets the keyboard key */
  get key() {
    return this._key;
  }
  /** Gets whether the Alt key required. */
  get isAltKeyRequired() {
    return this._isAltKeyRequired;
  }
  /** Gets whether the Ctrl key required. */
  get isCtrlKeyRequired() {
    return this._isCtrlKeyRequired;
  }
  /** Gets whether the Shift key required. */
  get isShiftKeyRequired() {
    return this._isShiftKeyRequired;
  }
  /** Gets whether this is a Function key. */
  get isFunctionKey() {
    return this._isFunctionKey;
  }
  /** Gets whether this is a Special key. */
  get isSpecialKey() {
    return this._isSpecialKey;
  }
}
class KeyboardShortcutContainer {
  _keyMap = /* @__PURE__ */ new Map();
  _keyArray = new Array();
  /** Registers a Keyboard Shortcut associated with a given key in the managed list */
  registerKey(keyMapKey, inShortcut) {
    let shortcut;
    if ((shortcut = this.findKey(keyMapKey)) === void 0) {
      shortcut = inShortcut;
      this._keyArray.push(shortcut);
    } else {
      const index = this._keyArray.findIndex((value) => {
        return value.keyMapKey === keyMapKey;
      });
      if (index >= 0) {
        shortcut = inShortcut;
        this._keyArray[index] = shortcut;
      }
    }
    if (shortcut) this._keyMap.set(keyMapKey, shortcut);
    return shortcut;
  }
  /** Finds a Keyboard Shortcut associated with a given key */
  findKey(keyMapKey) {
    return this._keyMap.get(keyMapKey);
  }
  /** Determines if any Keyboard Shortcuts are available in this container */
  areKeyboardShortcutsAvailable() {
    return this._keyMap.size !== 0;
  }
  /** Empties any Keyboard Shortcuts from this container */
  emptyData() {
    this._keyMap.clear();
    this._keyArray.length = 0;
  }
  getAvailableKeyboardShortcuts() {
    return this._keyArray.slice();
  }
  /** Generates a key used for storing and finding the Keyboard Shortcuts in this container */
  static generateKeyMapKey(keyboardKey, isAltKeyRequired, isCtrlKeyRequired, isShiftKeyRequired) {
    let keyMapKey = keyboardKey;
    if (isAltKeyRequired) keyMapKey = `Alt+${keyMapKey}`;
    if (isShiftKeyRequired) keyMapKey = `Shift+${keyMapKey}`;
    if (isCtrlKeyRequired) keyMapKey = `Ctrl+${keyMapKey}`;
    return keyMapKey;
  }
  /** Displays a menu for the Keyboard Shortcuts in this container */
  showShortcutsMenu() {
    KeyboardShortcutMenu.onKeyboardShortcutMenuEvent.emit({
      menuVisible: true,
      menuX: UiFramework.keyboardShortcuts.cursorX,
      menuY: UiFramework.keyboardShortcuts.cursorY,
      shortcuts: this.getAvailableKeyboardShortcuts()
    });
  }
}
class InternalKeyboardShortcutManager {
  static _shortcuts = new KeyboardShortcutContainer();
  /** Initialize the Keyboard Shortcut manager
   * @internal
   */
  static initialize() {
    SyncUiEventDispatcher.onSyncUiEvent.addListener(
      InternalKeyboardShortcutManager._handleSyncUiEvent
    );
  }
  /** Loads Keyboard Shortcuts into the managed list */
  static loadShortcuts(shortcutList) {
    shortcutList.forEach((shortcutProps) => {
      this.loadShortcut(shortcutProps);
    });
  }
  /** Loads a Keyboard Shortcut into the managed list */
  static loadShortcut(shortcutProps) {
    const shortcut = new KeyboardShortcut(shortcutProps);
    this._shortcuts.registerKey(shortcut.keyMapKey, shortcut);
  }
  /** Processes a keystroke and invokes a matching Keyboard Shortcut */
  static processKey(keyboardKey, isAltKeyPressed = false, isCtrlKeyPressed = false, isShiftKeyPressed = false) {
    const keyMapKey = KeyboardShortcutContainer.generateKeyMapKey(
      keyboardKey,
      isAltKeyPressed,
      isCtrlKeyPressed,
      isShiftKeyPressed
    );
    const shortcut = this.getShortcut(keyMapKey);
    if (shortcut) {
      shortcut.itemPicked();
      return true;
    }
    return false;
  }
  /** Returns the managed list of Keyboard Shortcuts */
  static get shortcutContainer() {
    return this._shortcuts;
  }
  /** Returns a Keyboard Shortcut from the managed lists */
  static getShortcut(keyMapKey) {
    return this._shortcuts.findKey(keyMapKey);
  }
  /** Determines if focus is set to Home */
  static get isFocusOnHome() {
    const element = document.activeElement;
    return element && element === document.body;
  }
  /** Sets focus to Home */
  static setFocusToHome() {
    const element = document.activeElement;
    if (element && element !== document.body) {
      element.blur();
      document.body.focus();
    }
  }
  /** Displays the Keyboard Shortcuts menu at the cursor */
  static displayMenu() {
    if (this._shortcuts.areKeyboardShortcutsAvailable()) {
      this._shortcuts.showShortcutsMenu();
    }
  }
  /** Closes the Keyboard Shortcuts menu */
  static closeMenu() {
    KeyboardShortcutMenu.onKeyboardShortcutMenuEvent.emit({
      menuVisible: false,
      menuX: 0,
      menuY: 0,
      shortcuts: void 0
    });
  }
  /** Returns the cursor X position, which is mouseEvent.pageX. */
  static get cursorX() {
    return CursorInformation.cursorX;
  }
  /** Returns the cursor Y position, which is mouseEvent.pageY. */
  static get cursorY() {
    return CursorInformation.cursorY;
  }
  static _handleSyncUiEvent = (args) => {
    const updateBooleanValue = (booleanValue) => {
      if (SyncUiEventDispatcher.hasEventOfInterest(
        args.eventIds,
        booleanValue.syncEventIds
      ))
        booleanValue.refresh();
    };
    const handleForSyncIds = (shortcut) => {
      if (shortcut.isDisabled instanceof ConditionalBooleanValue)
        updateBooleanValue(shortcut.isDisabled);
      if (shortcut.isHidden instanceof ConditionalBooleanValue)
        updateBooleanValue(shortcut.isHidden);
    };
    InternalKeyboardShortcutManager._traverseShortcuts(
      InternalKeyboardShortcutManager._shortcuts.getAvailableKeyboardShortcuts(),
      handleForSyncIds
    );
  };
  static _traverseShortcuts = (shortcuts, callback) => {
    shortcuts.forEach((shortcut) => {
      callback(shortcut);
      if (shortcut.shortcutContainer.areKeyboardShortcutsAvailable()) {
        const childShortcuts = shortcut.shortcutContainer.getAvailableKeyboardShortcuts();
        InternalKeyboardShortcutManager._traverseShortcuts(
          childShortcuts,
          callback
        );
      }
    });
  };
}
class InternalConfigurableUiManager {
  static _registeredControls = /* @__PURE__ */ new Map();
  static _initialized = false;
  /** @internal */
  static activityTracker = new ActivityTracker();
  /** @internal */
  static onUiActivityEvent = new BeUiEvent();
  /** @internal */
  static onUiIntervalEvent = new BeUiEvent();
  /** Initializes the InternalConfigurableUiManager and registers core controls.
   * @internal
   */
  static initialize() {
    if (this._initialized) return;
    InternalConfigurableUiManager.register(
      StandardRotationNavigationAidControl.navigationAidId,
      StandardRotationNavigationAidControl
    );
    InternalConfigurableUiManager.register(
      SheetNavigationAidControl.navigationAidId,
      SheetNavigationAidControl
    );
    InternalConfigurableUiManager.register(
      DrawingNavigationAidControl.navigationAidId,
      DrawingNavigationAidControl
    );
    InternalConfigurableUiManager.register(
      CubeNavigationAidControl.navigationAidId,
      CubeNavigationAidControl
    );
    SyncUiEventDispatcher.initialize();
    InternalFrontstageManager.initialize();
    InternalToolSettingsManager.initialize();
    InternalModelessDialogManager.initialize();
    InternalContentDialogManager.initialize();
    InternalKeyboardShortcutManager.initialize();
    this._initialized = true;
  }
  /** Registers a control implementing the [[ConfigurableUiElement]] interface.
   * These controls can be a
   * [[ContentControl]],
   * [[NavigationAidControl]],
   * [[StatusBarWidgetControl]],
   * [[WidgetControl]] or
   * [ToolUiProvider]($appui-react).
   * @param classId the class id of the control to register
   * @param constructor the constructor of the control to register
   */
  static register(classId, constructor) {
    if (this._registeredControls.get(classId) !== void 0) {
      throw new UiError(
        UiFramework.loggerCategory("InternalConfigurableUiManager"),
        `registerControl: classId '${classId}' already registered`
      );
    }
    this._registeredControls.set(classId, constructor);
  }
  /** Determines if a control has been registered based on its classId.
   * @param classId   the class id of the control to test
   * @returns  true if the control is registered or false if not
   */
  static isRegistered(classId) {
    const constructor = this._registeredControls.get(classId);
    return constructor !== void 0;
  }
  /** Determines if a control has been registered.
   * @internal
   */
  static getConstructorClassId(constructor) {
    for (const [key, value] of this._registeredControls.entries()) {
      if (value === constructor) return key;
    }
    return void 0;
  }
  /** Unregisters a control that has been registered.
   * @param classId   the class id of the control to unregister
   */
  static unregister(classId) {
    const constructor = this._registeredControls.get(classId);
    if (constructor) this._registeredControls.delete(classId);
  }
  /** Creates a control registered by calling registerControl.
   * @param classId   the class id of the control to create
   * @param uniqueId  a unique id for the control
   * @param options   options passed to the constructor of the control
   * @param controlId controlId which may not be unique across all control instances.
   * @returns  the created control
   */
  static create(classId, uniqueId, options, controlId) {
    const info = new ConfigurableCreateInfo(
      classId,
      uniqueId,
      controlId ?? uniqueId
    );
    const constructor = this._registeredControls.get(info.classId);
    if (!constructor) {
      throw new UiError(
        UiFramework.loggerCategory("InternalConfigurableUiManager"),
        `createControl: classId '${classId}' not registered`
      );
    }
    const control = new constructor(info, options);
    return control;
  }
  /** Gets the HTML wrapper element for Configurable UI */
  static getWrapperElement() {
    const wrapper = document.getElementById("uifw-configurableui-wrapper");
    const htmlElement = wrapper;
    return htmlElement;
  }
  /** Assists in the transition to context wrapper exported from Configurable UI */
  static getWrapperDocument() {
    const wrapper = document.getElementById("uifw-configurableui-wrapper");
    return wrapper?.ownerDocument ?? document;
  }
  /** Closes all UI popups currently open */
  static closeUi() {
    MessageManager.closeAllMessages();
    InternalModelessDialogManager.closeAll();
    InternalModalDialogManager.closeAll();
    InternalContentDialogManager.closeAll();
    UiFramework.keyboardShortcuts.closeMenu();
    UiFramework.closeCursorMenu();
    PopupManager.clearPopups();
  }
}
const FrameworkReducer = combineReducers({
  configurableUiState: ConfigurableUiReducer,
  sessionState: SessionStateReducer
});
class ReducerRegistry {
  _onReducerListChanged;
  _reducers;
  /** ReducerRegistry constructor that initializes an empty reducer map to be populated by called to registerReducer. */
  constructor() {
    this._reducers = {};
  }
  /** Call to register a reducer and its name. */
  registerReducer(name, reducer) {
    if (this._reducers[name]) {
      throw new UiError(
        UiFramework.loggerCategory("ReducerRegistry"),
        `Redux Reducer with matching name of '${name}' is already registered`
      );
    }
    this._reducers = { ...this._reducers, [name]: reducer };
    if (this._onReducerListChanged) {
      this._onReducerListChanged(this._reducers);
    }
  }
  /** Supports a single listener which should be the Redux store, see [[StoreManager]].
   * @internal
   */
  setChangeListener(listener) {
    this._onReducerListChanged = listener;
  }
  /** Returns map of registered Reducers. */
  getReducers() {
    return this._reducers;
  }
  /** Clear reducers only required for unit testing
   * @internal
   */
  clearReducers() {
    this._reducers = {};
    if (this._onReducerListChanged) {
      this._onReducerListChanged(this._reducers);
    }
  }
}
const ReducerRegistryInstance = new ReducerRegistry();
class StateManager {
  static _LOG_CATEGORY = "StateManager";
  _store;
  _defaultReducers;
  static _singletonStore;
  /**
   * StateManager construct.
   * @param defaultReducers Default set of Reducers used by the current application. If this object does not contain the [[FrameworkReducer]] it will automatically be added.
   */
  constructor(defaultReducers) {
    if (defaultReducers) {
      this._defaultReducers = defaultReducers;
      const keys = Object.keys(defaultReducers);
      if (-1 === keys.findIndex((key) => key === "frameworkState"))
        this._defaultReducers = {
          ...defaultReducers,
          frameworkState: FrameworkReducer
        };
    } else {
      this._defaultReducers = { frameworkState: FrameworkReducer };
    }
    const dynamicallyRegisteredReducers = ReducerRegistryInstance.getReducers();
    let allReducers = this.combineDynamicAndDefaultReducers(
      dynamicallyRegisteredReducers,
      this._defaultReducers
    );
    this._store = createStore$2(
      allReducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    ReducerRegistryInstance.setChangeListener((newDynamicReducers) => {
      allReducers = this.combineDynamicAndDefaultReducers(
        newDynamicReducers,
        this._defaultReducers
      );
      this._store.replaceReducer(allReducers);
    });
    StateManager._singletonStore = this._store;
  }
  /** Method to test if the StateManager has been initialized.
   * @param suppressErrorLog If true and the StateManager is not initialized a log message will be output.
   */
  static isInitialized(suppressErrorLog = false) {
    if (!StateManager._singletonStore) {
      if (!suppressErrorLog)
        Logger.logError(
          StateManager._LOG_CATEGORY,
          "Accessing store before it is created."
        );
      return false;
    } else {
      return true;
    }
  }
  /** Return the current Redux store. Useful when using connect method to connect a Ui Component to the store. */
  static get store() {
    if (StateManager.isInitialized()) {
      return StateManager._singletonStore;
    } else {
      throw new UiError(
        StateManager._LOG_CATEGORY,
        `Redux Store has not been initialized`
      );
    }
  }
  /** Return the current state from the Redux store. */
  static get state() {
    if (StateManager.isInitialized()) {
      return StateManager._singletonStore.getState();
    } else {
      return void 0;
    }
  }
  combineDynamicAndDefaultReducers(dynamicallyRegisteredReducers, defaultReducers) {
    const allReducers = {
      ...defaultReducers,
      ...dynamicallyRegisteredReducers
    };
    return combineReducers(allReducers);
  }
  /** To be used only in unit test
   * @internal
   */
  static clearStore() {
    StateManager._singletonStore = void 0;
  }
}
class ModelOverrideProvider {
  constructor(modelIds, defaultAppearance) {
    this.modelIds = modelIds;
    this.defaultAppearance = defaultAppearance;
  }
  addFeatureOverrides(overrides, _viewport) {
    overrides.setDefaultOverrides(this.defaultAppearance, true);
    const appearance = FeatureAppearance.fromJSON({});
    this.modelIds.forEach((modelId) => {
      overrides.override({ modelId, appearance, onConflict: "replace" });
    });
  }
}
class SubCategoryOverrideProvider {
  constructor(subCategoryIds, defaultAppearance) {
    this.subCategoryIds = subCategoryIds;
    this.defaultAppearance = defaultAppearance;
  }
  addFeatureOverrides(overrides, _viewport) {
    overrides.setDefaultOverrides(this.defaultAppearance, true);
    const appearance = FeatureAppearance.fromJSON({});
    this.subCategoryIds.forEach((subCategoryId) => {
      overrides.override({ subCategoryId, appearance, onConflict: "replace" });
    });
  }
}
class HideIsolateEmphasizeActionHandler {
  static emphasizeElementsChanged = new BeEvent();
  /** String Id sent to allow UI to refresh its display state.  */
  static get hideIsolateEmphasizeUiSyncId() {
    return "selection-context-emphasize-elements-changed";
  }
}
class HideIsolateEmphasizeManager extends HideIsolateEmphasizeActionHandler {
  static _overrideCategoryIds = /* @__PURE__ */ new Map();
  static _overrideModelIds = /* @__PURE__ */ new Map();
  /** Returns true if there is only a category hilited. */
  static categorySelected(vp) {
    const subcategories = vp.iModel.hilited.subcategories;
    return subcategories.size === 1;
  }
  /** Returns true if only a model is hilited. */
  static modelSelected(vp) {
    const models = vp.iModel.hilited.models;
    return models.size === 1;
  }
  /**
   * Hide the hilited categories.
   * @param vp Viewport to affect
   */
  static hideSelectedCategory(vp) {
    const ids = vp.iModel.hilited.subcategories.toId64Set();
    vp.changeCategoryDisplay(ids, false);
  }
  /** Get sub categories that relate to the category Id */
  static async _getSubCategories(iModelConnection, categoryIds) {
    const allSubcats = [];
    const request = iModelConnection.subcategories.load(categoryIds);
    if (request) await request.promise;
    for (const categoryId of categoryIds) {
      const subcats = iModelConnection.subcategories.getSubCategories(categoryId);
      if (subcats) allSubcats.push(...subcats);
    }
    return allSubcats;
  }
  /**
   * Emphasize hilited categories.
   * @param vp Viewport to affect
   */
  static async emphasizeSelectedCategory(vp) {
    const ids = vp.iModel.hilited.subcategories.toId64Array();
    if (ids.length === 0) return;
    const defaultAppearance = EmphasizeElements.getOrCreate(vp).createDefaultAppearance();
    EmphasizeElements.clear(vp);
    const subcats = await HideIsolateEmphasizeManager._getSubCategories(
      vp.iModel,
      ids
    );
    vp.addFeatureOverrideProvider(
      new SubCategoryOverrideProvider(subcats, defaultAppearance)
    );
  }
  /**
   * Hide the selected model
   * @param vp Viewport to affect
   */
  static hideSelectedModel(vp) {
    const ids = vp.iModel.hilited.models.toId64Array();
    if (ids.length === 0) return;
    vp.changeModelDisplay(ids, false);
  }
  /**
   * Isolate the selected model
   * @param vp Viewport to affect
   */
  static emphasizeSelectedModel(vp) {
    const ids = vp.iModel.hilited.models.toId64Array();
    if (ids.length === 0) return;
    const defaultAppearance = EmphasizeElements.getOrCreate(vp).createDefaultAppearance();
    EmphasizeElements.clear(vp);
    vp.addFeatureOverrideProvider(
      new ModelOverrideProvider(ids, defaultAppearance)
    );
  }
  /**
   * Isolate the selected elements
   * @param vp Viewport to affect
   */
  static isolateSelected(vp) {
    EmphasizeElements.getOrCreate(vp).isolateSelectedElements(vp, true, false);
  }
  /**
   * Hide the selected elements
   * @param vp Viewport to affect
   */
  static hideSelected(vp) {
    EmphasizeElements.getOrCreate(vp).hideSelectedElements(vp, false, false);
  }
  /**
   * Clear Hidden,Isolated, or Emphasized elements in specified view
   * @param vp Viewport to affect
   *
   */
  static clearEmphasize(vp) {
    if (vp) {
      EmphasizeElements.getOrCreate(vp).clearEmphasizedElements(vp);
      EmphasizeElements.clear(vp);
    }
  }
  /**
   * Emphasize the selected elements from either presentation layer's logical selection or selected graphics
   * @param vp Viewport to affect
   * @param emphasisSilhouette defaults to true
   */
  static async emphasizeSelected(vp, emphasisSilhouette = true) {
    if (HideIsolateEmphasizeManager.categorySelected(vp)) {
      await HideIsolateEmphasizeManager.emphasizeSelectedCategory(vp);
      return;
    } else if (HideIsolateEmphasizeManager.modelSelected(vp)) {
      HideIsolateEmphasizeManager.emphasizeSelectedModel(vp);
      return;
    }
    const ee = EmphasizeElements.getOrCreate(vp);
    ee.wantEmphasis = emphasisSilhouette;
    ee.emphasizeSelectedElements(vp, void 0, true, false);
    vp.isFadeOutActive = true;
  }
  /**
   * Isolate hilited models.
   * @param vp Viewport to affect
   */
  static async isolateSelectedModel(vp) {
    const ids = vp.iModel.hilited.models.toId64Array();
    if (ids.length === 0) return;
    await vp.replaceViewedModels(ids);
  }
  /**
   * Isolate hilited categories.
   * @param vp Viewport to affect
   */
  static isolateSelectedCategory(vp) {
    const ids = vp.iModel.hilited.subcategories.toId64Set();
    const categoriesToDrop = [];
    vp.view.categorySelector.categories.forEach((categoryId) => {
      if (!ids.has(categoryId)) categoriesToDrop.push(categoryId);
    });
    vp.changeCategoryDisplay(categoriesToDrop, false);
    vp.changeCategoryDisplay(ids, true);
  }
  static async getSelectionSetElementProps(iModel) {
    const persistentElementIds = /* @__PURE__ */ new Set();
    iModel.selectionSet.elements.forEach((elementId) => {
      if (!Id64.isTransient(elementId)) persistentElementIds.add(elementId);
    });
    return iModel.elements.getProps(persistentElementIds);
  }
  static async getSelectionSetElementModels(iModel) {
    const props = await HideIsolateEmphasizeManager.getSelectionSetElementProps(
      iModel
    );
    const modelIds = /* @__PURE__ */ new Set();
    for (const prop of props) if (prop.model) modelIds.add(prop.model);
    return modelIds;
  }
  static async getSelectionSetElementCategories(iModel) {
    const props = await HideIsolateEmphasizeManager.getSelectionSetElementProps(
      iModel
    );
    const categoryIds = /* @__PURE__ */ new Set();
    for (const prop of props) if (prop.category) categoryIds.add(prop.category);
    return categoryIds;
  }
  /**
   * Isolate either based on Presentation selection, if defined, else the selected graphic elements
   * @param vp Viewport to affect
   */
  static async isolateCommand(vp) {
    if (HideIsolateEmphasizeManager.categorySelected(vp)) {
      HideIsolateEmphasizeManager.isolateSelectedCategory(vp);
      return;
    } else if (HideIsolateEmphasizeManager.modelSelected(vp)) {
      await HideIsolateEmphasizeManager.isolateSelectedModel(vp);
      return;
    }
  }
  /**
   * Isolate model from selected elements
   * @param vp Viewport to affect
   */
  static async isolateSelectedElementsModel(vp) {
    const modelsToKeep = new Set(
      await HideIsolateEmphasizeManager.getSelectionSetElementModels(vp.iModel)
    );
    if (vp.view.isSpatialView()) {
      const modelsToTurnOff = [...vp.view.modelSelector.models].filter(
        (modelId) => !modelsToKeep.has(modelId)
      );
      this.updateModelOverride(vp, modelsToTurnOff);
    }
    await vp.replaceViewedModels(modelsToKeep);
  }
  /**
   * Isolate the selected category found in SelectionSet elements
   * @param vp Viewport to affect
   */
  static async isolateSelectedElementsCategory(vp) {
    const categoriesToKeep = new Set(
      await HideIsolateEmphasizeManager.getSelectionSetElementCategories(
        vp.iModel
      )
    );
    const categoriesToTurnOff = [...vp.view.categorySelector.categories].filter(
      (categoryId) => !categoriesToKeep.has(categoryId)
    );
    vp.changeCategoryDisplay(categoriesToTurnOff, false);
    vp.changeCategoryDisplay(categoriesToKeep, true);
    this.updateCategoryOverride(vp, categoriesToTurnOff);
  }
  /**
   * Hide either based on Presentation selection, if defined, else the selected graphic elements
   * @param vp Viewport to affect
   */
  static async hideCommand(vp) {
    if (HideIsolateEmphasizeManager.categorySelected(vp)) {
      HideIsolateEmphasizeManager.hideSelectedCategory(vp);
      return;
    } else if (HideIsolateEmphasizeManager.modelSelected(vp)) {
      HideIsolateEmphasizeManager.hideSelectedModel(vp);
      return;
    }
    EmphasizeElements.getOrCreate(vp).hideSelectedElements(vp, false, false);
  }
  /**
   * Hide the models defined by the elements in the current SelectionSet
   * @param vp Viewport to affect
   */
  static async hideSelectedElementsModel(vp) {
    const modelIds = await HideIsolateEmphasizeManager.getSelectionSetElementModels(vp.iModel);
    vp.changeModelDisplay(modelIds, false);
    this.updateModelOverride(vp, [...modelIds]);
  }
  /**
   * Clear (restore) the previously hidden/isolated models hidden by hideSelectedElementsModel
   * @param vp Viewport to affect
   */
  static clearOverrideModels(vp) {
    const ids = this._overrideModelIds.get(vp);
    if (ids) {
      vp.changeModelDisplay([...ids], true);
      this.clearModelOverride(vp);
    }
  }
  /**
   * Determine if models are hidden by hideSelectedElementsModel or isolateSelectedElementsModel
   * @param vp Viewport to affect
   */
  static isOverrideModels(vp) {
    const ids = this._overrideModelIds.get(vp);
    return ids ? [...ids].length > 0 : false;
  }
  /**
   * Determine if categories are hidden by hideSelectedElementsCategory or isolateSelectedElementsCategory
   * @param vp Viewport to affect
   */
  static isOverrideCategories(vp) {
    const ids = this._overrideCategoryIds.get(vp);
    return ids ? [...ids].length > 0 : false;
  }
  /**
   * Hide the categories defined by the elements in the current SelectionSet
   * @param vp Viewport to affect
   */
  static async hideSelectedElementsCategory(vp) {
    const categoryIds = await HideIsolateEmphasizeManager.getSelectionSetElementCategories(
      vp.iModel
    );
    vp.changeCategoryDisplay(categoryIds, false);
    this.updateCategoryOverride(vp, [...categoryIds]);
  }
  /**
   * Clear (restore) the previously hidden categories hidden by hideSelectedElementsCategory
   * @param vp Viewport to affect
   */
  static clearOverrideCategories(vp) {
    const ids = this._overrideCategoryIds.get(vp);
    if (ids) {
      vp.changeCategoryDisplay([...ids], true);
      this.clearCategoryOverride(vp);
    }
  }
  /** Checks to see if any featureOverrideProviders are active */
  areFeatureOverridesActive(vp) {
    const emphasizeElementsProvider = vp.findFeatureOverrideProviderOfType(
      EmphasizeElements
    );
    if (void 0 !== emphasizeElementsProvider && emphasizeElementsProvider.isActive(vp))
      return true;
    else if (vp.neverDrawn && vp.neverDrawn.size > 0) return true;
    const modelOverrideProvider = vp.findFeatureOverrideProviderOfType(
      ModelOverrideProvider
    );
    if (void 0 !== modelOverrideProvider && modelOverrideProvider.modelIds.length > 0)
      return true;
    const subCategoryOverrideProvider = vp.findFeatureOverrideProviderOfType(
      SubCategoryOverrideProvider
    );
    if (void 0 !== subCategoryOverrideProvider && subCategoryOverrideProvider.subCategoryIds.length > 0)
      return true;
    if (HideIsolateEmphasizeManager.isOverrideCategories(vp)) return true;
    if (HideIsolateEmphasizeManager.isOverrideModels(vp)) return true;
    return false;
  }
  /**
   * Function that is run when `IsolateSelectedElementsModel` tool button is pressed
   */
  async processIsolateSelectedElementsModel() {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;
    await HideIsolateEmphasizeManager.isolateSelectedElementsModel(vp);
    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: "IsolateSelectedModels"
      /* IsolateSelectedModels */
    });
    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );
  }
  /**
   * Function that is run when `IsolateSelectedElementsCategory` tool button is pressed
   */
  async processIsolateSelectedElementsCategory() {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;
    await HideIsolateEmphasizeManager.isolateSelectedElementsCategory(vp);
    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: "IsolateSelectedCategories"
      /* IsolateSelectedCategories */
    });
    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );
  }
  /**
   * Function that is run when `IsolateSelected` tool button is pressed
   */
  async processIsolateSelected(clearSelection = true) {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;
    HideIsolateEmphasizeManager.isolateSelected(vp);
    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: "IsolateSelectedElements"
      /* IsolateSelectedElements */
    });
    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );
    if (!clearSelection) return;
    const selection = vp.view.iModel.selectionSet;
    if (selection.isActive) selection.emptyAll();
  }
  /**
   * Function that is run when `HideSelectedElementsModel` tool button is pressed
   */
  async processHideSelectedElementsModel() {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;
    await HideIsolateEmphasizeManager.hideSelectedElementsModel(vp);
    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: "HideSelectedModels"
      /* HideSelectedModels */
    });
    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );
  }
  /**
   * Function that is run when `HideSelectedElementsCategory` tool button is pressed
   */
  async processHideSelectedElementsCategory() {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;
    await HideIsolateEmphasizeManager.hideSelectedElementsCategory(vp);
    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: "HideSelectedCategories"
      /* HideSelectedCategories */
    });
    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );
  }
  /**
   * Function that is run when `HideSelected` tool button is pressed
   */
  async processHideSelected() {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;
    HideIsolateEmphasizeManager.hideSelected(vp);
    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: "HideSelectedElements"
      /* HideSelectedElements */
    });
    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );
    const selection = vp.view.iModel.selectionSet;
    if (selection.isActive) selection.emptyAll();
  }
  /**
   * Function that is run when `EmphasizeSelected` tool button is pressed
   */
  async processEmphasizeSelected() {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;
    await HideIsolateEmphasizeManager.emphasizeSelected(vp);
    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: "EmphasizeSelectedElements"
      /* EmphasizeSelectedElements */
    });
    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );
    const selection = vp.view.iModel.selectionSet;
    if (selection.isActive) selection.emptyAll();
  }
  /**
   * Function that is run when `ClearEmphasize` tool button is pressed
   */
  async processClearEmphasize() {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;
    HideIsolateEmphasizeManager.clearEmphasize(vp);
    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: "ClearHiddenIsolatedEmphasized"
      /* ClearHiddenIsolatedEmphasized */
    });
    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );
  }
  /**
   * Function that is run when `ClearOverrideModels` tool button is pressed
   */
  async processClearOverrideModels() {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;
    HideIsolateEmphasizeManager.clearOverrideModels(vp);
    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: "ClearOverrideModels"
      /* ClearOverrideModels */
    });
    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );
  }
  /**
   * Function that is run when `ClearOverrideCategories` tool button is pressed
   */
  async processClearOverrideCategories() {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;
    HideIsolateEmphasizeManager.clearOverrideCategories(vp);
    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: "ClearOverrideCategories"
      /* ClearOverrideCategories */
    });
    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );
  }
  /**
   * Add category ids to the category override cache (hidden or isolated categories)
   */
  static updateCategoryOverride(vp, ids) {
    const prevIds = this._overrideCategoryIds.get(vp);
    const newIds = [...prevIds || [], ...ids];
    this._overrideCategoryIds.set(vp, new Set(newIds));
  }
  /**
   * Add model ids to the model override cache (hidden or isolated models)
   */
  static updateModelOverride(vp, ids) {
    const prevIds = this._overrideModelIds.get(vp);
    const newIds = [...prevIds || [], ...ids];
    this._overrideModelIds.set(vp, new Set(newIds));
  }
  /**
   * Return the list of category overrides (hidden or isolated categories)
   */
  static getCategoryOverrides(vp) {
    return this._overrideCategoryIds.get(vp);
  }
  /**
   * Return the list of model overrides (hidden or isolated models)
   */
  static getModelOverrides(vp) {
    return this._overrideModelIds.get(vp);
  }
  /**
   * Clear the category override cache (hidden or isolated categories)
   */
  static clearCategoryOverride(vp) {
    this._overrideCategoryIds.delete(vp);
  }
  /**
   * Clear the model override cache (hidden or isolated models)
   */
  static clearModelOverride(vp) {
    this._overrideModelIds.delete(vp);
  }
}
var BackstageItemUtilities;
((BackstageItemUtilities2) => {
  function createDeprecatedStageLauncher(...[
    frontstageId,
    groupPriority,
    itemPriority,
    label2,
    subtitle,
    icon,
    overrides
  ]) {
    return {
      id: frontstageId,
      stageId: frontstageId,
      groupPriority,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      icon,
      itemPriority,
      label: label2,
      subtitle,
      ...overrides
    };
  }
  function createStageLauncher(...args) {
    if (isArgsUtil(args)) {
      const {
        stageId,
        groupPriority = 0,
        itemPriority = 0,
        label: label2 = "",
        icon,
        ...other
      } = args[0];
      return {
        id: stageId,
        stageId,
        groupPriority,
        itemPriority,
        label: label2,
        iconNode: icon,
        icon: icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: icon }) : void 0,
        ...other
      };
    }
    return createDeprecatedStageLauncher(...args);
  }
  BackstageItemUtilities2.createStageLauncher = createStageLauncher;
  function createDeprecatedActionItem(...[
    itemId,
    groupPriority,
    itemPriority,
    execute,
    label2,
    subtitle,
    icon,
    overrides
  ]) {
    return {
      execute,
      groupPriority,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      icon,
      id: itemId,
      itemPriority,
      label: label2,
      subtitle,
      ...overrides
    };
  }
  function createActionItem(...args) {
    if (isArgsUtil(args)) {
      const {
        groupPriority = 0,
        itemPriority = 0,
        execute = () => {
        },
        label: label2 = "",
        icon,
        ...other
      } = args[0];
      return {
        groupPriority,
        itemPriority,
        execute,
        label: label2,
        iconNode: icon,
        icon: icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: icon }) : void 0,
        ...other
      };
    }
    return createDeprecatedActionItem(...args);
  }
  BackstageItemUtilities2.createActionItem = createActionItem;
})(BackstageItemUtilities || (BackstageItemUtilities = {}));
function isArgsUtil(args) {
  return args.length === 1 && typeof args[0] === "object";
}
function ModalSettingsStage({
  initialSettingsTabId
}) {
  const { translate } = useTranslation();
  const id = UiFramework.frontstages.activeFrontstageDef?.id ?? "none";
  const stageUsage = UiFramework.frontstages.activeFrontstageDef?.usage ?? StageUsage.General;
  const tabEntries = UiFramework.settingsManager.getSettingEntries(
    id,
    stageUsage
  );
  const currentSettingsTab = reactExports.useCallback(() => {
    const categoryToFind = initialSettingsTabId ? initialSettingsTabId.toLowerCase() : tabEntries[0].tabId.toLowerCase();
    let foundTab = tabEntries.find(
      (entry) => entry.tabId.toLowerCase() === categoryToFind
    );
    if (!foundTab)
      foundTab = tabEntries.find(
        (entry) => entry.label.toLowerCase() === categoryToFind
      );
    return foundTab;
  }, [initialSettingsTabId, tabEntries]);
  reactExports.useEffect(() => {
    return UiFramework.frontstages.onCloseModalFrontstageRequestedEvent.addListener(
      ({ modalFrontstage: modalFrontstage2, stageCloseFunc }) => {
        if (modalFrontstage2 instanceof SettingsModalFrontstage && stageCloseFunc) {
          UiFramework.settingsManager.closeSettingsContainer(stageCloseFunc);
        }
      }
    );
  }, [tabEntries]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "uifw-settings-container", children: tabEntries.length ? (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SettingsContainer,
      {
        tabs: tabEntries,
        currentSettingsTab: currentSettingsTab(),
        settingsManager: UiFramework.settingsManager
      }
    )
  ) : (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    /* @__PURE__ */ jsxRuntimeExports.jsx(Centered, { children: translate("settings.noSettingsAvailable") })
  ) });
}
class SettingsModalFrontstage {
  constructor(initialSettingsTabId) {
    this.initialSettingsTabId = initialSettingsTabId;
  }
  static id = "appui-react.modalSettingsStage";
  title = UiFramework.translate("settings.settingsStageLabel");
  notifyCloseRequest = true;
  get content() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ModalSettingsStage, { initialSettingsTabId: this.initialSettingsTabId });
  }
  static noSettingsAvailable = () => new ConditionalBooleanValue(
    () => 0 === UiFramework.settingsManager.providers.length,
    [SyncUiEventId.SettingsProvidersChanged]
  );
  static getBackstageActionItem(groupPriority, itemPriority) {
    return BackstageItemUtilities.createActionItem({
      id: SettingsModalFrontstage.id,
      groupPriority,
      itemPriority,
      execute: () => UiFramework.frontstages.openModalFrontstage(
        new SettingsModalFrontstage()
      ),
      label: UiFramework.translate("settings.settingsStageLabel"),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgSettings, {}),
      isHidden: SettingsModalFrontstage.noSettingsAvailable()
    });
  }
  static showSettingsStage(initialSettingsTab) {
    if (UiFramework.settingsManager.providers.length) {
      if (UiFramework.frontstages.activeModalFrontstage && UiFramework.frontstages.activeModalFrontstage instanceof SettingsModalFrontstage) {
        if (initialSettingsTab) {
          UiFramework.settingsManager.activateSettingsTab(initialSettingsTab);
          return;
        }
      }
      UiFramework.frontstages.openModalFrontstage(
        new SettingsModalFrontstage(initialSettingsTab)
      );
    } else {
      const detailedMessage = UiFramework.translate(
        "settings.noSettingsProvidersRegistered"
      );
      const info = new NotifyMessageDetails(
        OutputMessagePriority.Info,
        UiFramework.translate("settings.noSettingsAvailable"),
        detailedMessage,
        OutputMessageType.Toast
      );
      IModelApp.notifications.outputMessage(info);
      Logger.logInfo(
        UiFramework.loggerCategory("SettingsModalFrontstage"),
        detailedMessage
      );
    }
  }
}
class OpenSettingsCoreTool extends Tool {
  static toolId = "OpenSettings";
  static iconSpec = "icon-settings";
  static get minArgs() {
    return 0;
  }
  static get maxArgs() {
    return 1;
  }
  async run(settingCategory) {
    SettingsModalFrontstage.showSettingsStage(settingCategory);
    return true;
  }
  async parseAndRun(...args) {
    return this.run(args[0]);
  }
}
const OpenSettingsTool = ToolUtilities.defineIcon(
  OpenSettingsCoreTool,
  /* @__PURE__ */ jsxRuntimeExports.jsx(SvgSettings, {})
);
const openSettingTools = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OpenSettingsTool
}, Symbol.toStringTag, { value: "Module" }));
function SvgViewLayouts() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m15 0h-14a1 1 0 0 0 -1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-14a1 1 0 0 0 -1-1zm0 8h-1v2h1v5h-6v-1h-2v1h-6v-5h1v-2h-1v-5h6v1h2v-1h6zm-4 2h-2v2h-2v-2h-2v-2h2v-2h2v2h2z" }) });
}
SvgViewLayouts.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "SvgViewLayouts" };
class RestoreFrontstageLayoutCoreTool extends Tool {
  static toolId = "RestoreFrontstageLayout";
  static iconSpec = "icon-view-layouts";
  static get minArgs() {
    return 0;
  }
  static get maxArgs() {
    return 1;
  }
  async run(frontstageId) {
    let frontstageDef;
    if (frontstageId) {
      frontstageDef = await UiFramework.frontstages.getFrontstageDef(
        frontstageId
      );
    } else {
      frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    }
    if (frontstageDef) frontstageDef.restoreLayout();
    else
      IModelApp.notifications.outputMessage(
        new NotifyMessageDetails(
          OutputMessagePriority.Info,
          UiFramework.translate("tools.RestoreFrontstageLayout.noStageFound")
        )
      );
    return true;
  }
  async parseAndRun(...args) {
    return this.run(args[0]);
  }
}
const RestoreFrontstageLayoutTool = ToolUtilities.defineIcon(
  RestoreFrontstageLayoutCoreTool,
  /* @__PURE__ */ jsxRuntimeExports.jsx(SvgViewLayouts, {})
);
class RestoreAllFrontstagesCoreTool extends Tool {
  static toolId = "RestoreAllFrontstages";
  static iconSpec = "icon-view-layouts";
  async run() {
    const frontstages = InternalFrontstageManager.frontstageDefs;
    for (const [, frontstage] of frontstages) {
      frontstage.restoreLayout();
    }
    return true;
  }
}
const RestoreAllFrontstagesTool = ToolUtilities.defineIcon(
  RestoreAllFrontstagesCoreTool,
  /* @__PURE__ */ jsxRuntimeExports.jsx(SvgViewLayouts, {})
);
const restoreLayoutTools = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RestoreAllFrontstagesTool,
  RestoreFrontstageLayoutTool
}, Symbol.toStringTag, { value: "Module" }));
class FocusToolSettings extends Tool {
  static toolId = "FocusToolSettings";
  async run() {
    return UiFramework.toolSettings.focusIntoToolSettings();
  }
}
class BumpToolSetting extends Tool {
  static toolId = "BumpToolSetting";
  static get maxArgs() {
    return 1;
  }
  async run(settingIndexStr) {
    let settingIndex;
    if (settingIndexStr) {
      settingIndex = parseInt(settingIndexStr, 10);
      if (isNaN(settingIndex)) return false;
    }
    IModelApp.toolAdmin.bumpToolSetting(settingIndex);
    return true;
  }
  async parseAndRun(...args) {
    return this.run(args[0]);
  }
}
const toolSettingTools = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BumpToolSetting,
  FocusToolSettings
}, Symbol.toStringTag, { value: "Module" }));
class UiShowHideSettingsProvider {
  static _settingsNamespace = "AppUiSettings";
  static _autoHideUiKey = "AutoHideUi";
  static _useProximityOpacityKey = "UseProximityOpacity";
  static _snapWidgetOpacityKey = "SnapWidgetOpacity";
  providerId = "UiShowHideSettingsProvider";
  static initialize() {
    UiFramework.registerUserSettingsProvider(new UiShowHideSettingsProvider());
  }
  async loadUserSettings(storage) {
    let result = await storage.getSetting(
      UiShowHideSettingsProvider._settingsNamespace,
      UiShowHideSettingsProvider._autoHideUiKey
    );
    if (result.status === UiStateStorageStatus.Success)
      InternalUiShowHideManager.setAutoHideUi(result.setting);
    result = await storage.getSetting(
      UiShowHideSettingsProvider._settingsNamespace,
      UiShowHideSettingsProvider._useProximityOpacityKey
    );
    if (result.status === UiStateStorageStatus.Success)
      InternalUiShowHideManager.setUseProximityOpacity(result.setting);
    result = await storage.getSetting(
      UiShowHideSettingsProvider._settingsNamespace,
      UiShowHideSettingsProvider._snapWidgetOpacityKey
    );
    if (result.status === UiStateStorageStatus.Success)
      InternalUiShowHideManager.setSnapWidgetOpacity(result.setting);
  }
  static async storeAutoHideUi(v, storage) {
    void (storage ?? UiFramework.getUiStateStorage()).saveSetting(
      this._settingsNamespace,
      this._autoHideUiKey,
      v
    );
  }
  static async storeUseProximityOpacity(v, storage) {
    void (storage ?? UiFramework.getUiStateStorage()).saveSetting(
      this._settingsNamespace,
      this._useProximityOpacityKey,
      v
    );
  }
  static async storeSnapWidgetOpacity(v, storage) {
    void (storage ?? UiFramework.getUiStateStorage()).saveSetting(
      this._settingsNamespace,
      this._snapWidgetOpacityKey,
      v
    );
  }
}
const INACTIVITY_TIME_DEFAULT = 3500;
class InternalUiShowHideManager {
  static _isUiVisible = true;
  static _autoHideUi = true;
  static _showHidePanels = false;
  static _showHideFooter = false;
  static _inactivityTime = INACTIVITY_TIME_DEFAULT;
  static _timeout;
  static _useProximityOpacity = false;
  static _snapWidgetOpacity = false;
  /** Determines if the Ui is visible */
  static get isUiVisible() {
    return InternalUiShowHideManager._isUiVisible;
  }
  static set isUiVisible(visible) {
    if (this._isUiVisible === visible) return;
    InternalUiShowHideManager._isUiVisible = visible;
    UiFramework.onUiVisibilityChanged.emit({ visible });
  }
  static setAutoHideUi(value) {
    InternalUiShowHideManager._autoHideUi = value;
  }
  static setUseProximityOpacity(value) {
    InternalUiShowHideManager._useProximityOpacity = value;
  }
  static setSnapWidgetOpacity(value) {
    InternalUiShowHideManager._snapWidgetOpacity = value;
  }
  static get autoHideUi() {
    return InternalUiShowHideManager._autoHideUi;
  }
  static set autoHideUi(autoHide) {
    if (this._autoHideUi === autoHide) return;
    void UiShowHideSettingsProvider.storeAutoHideUi(autoHide);
    if (!autoHide) {
      this.isUiVisible = true;
    }
    this._autoHideUi = autoHide;
    SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(
      SyncUiEventId.ShowHideManagerSettingChange
    );
  }
  /** Determines whether the widget panels are shown and hidden. Defaults to false. */
  static get showHidePanels() {
    return InternalUiShowHideManager._showHidePanels;
  }
  static set showHidePanels(showHide) {
    InternalUiShowHideManager._showHidePanels = showHide;
    UiFramework.onUiVisibilityChanged.emit({
      visible: this.isUiVisible
    });
  }
  /** Determines whether the status bar is shown and hidden. Defaults to false. */
  static get showHideFooter() {
    return InternalUiShowHideManager._showHideFooter;
  }
  static set showHideFooter(showHide) {
    InternalUiShowHideManager._showHideFooter = showHide;
    UiFramework.onUiVisibilityChanged.emit({
      visible: this.isUiVisible
    });
  }
  /** Determines the amount of inactivity time before the Ui is hidden. Defaults to 3.5 seconds. */
  static get inactivityTime() {
    return InternalUiShowHideManager._inactivityTime;
  }
  static set inactivityTime(time) {
    InternalUiShowHideManager._inactivityTime = time;
  }
  /** Determines whether the proximity of the mouse should alter the opacity of a toolbar. Defaults to true. */
  static get useProximityOpacity() {
    return InternalUiShowHideManager._useProximityOpacity;
  }
  static set useProximityOpacity(value) {
    InternalUiShowHideManager._useProximityOpacity = value;
    void UiShowHideSettingsProvider.storeUseProximityOpacity(value);
    SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(
      SyncUiEventId.ShowHideManagerSettingChange
    );
    UiFramework.onUiVisibilityChanged.emit({
      visible: this.isUiVisible
    });
  }
  /** Determines whether the opacity of a toolbar should snap. Defaults to false. */
  static get snapWidgetOpacity() {
    return InternalUiShowHideManager._snapWidgetOpacity;
  }
  static set snapWidgetOpacity(value) {
    InternalUiShowHideManager._snapWidgetOpacity = value;
    void UiShowHideSettingsProvider.storeSnapWidgetOpacity(value);
    SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(
      SyncUiEventId.ShowHideManagerSettingChange
    );
    UiFramework.onUiVisibilityChanged.emit({
      visible: this.isUiVisible
    });
  }
  /** Handler for when a Frontstage is ready */
  static handleFrontstageReady() {
    if (!InternalUiShowHideManager._autoHideUi) return;
    InternalUiShowHideManager.showUiAndResetTimer();
  }
  /** Handler for when the mouse moves over the content area */
  static handleContentMouseMove(_event) {
    useCursorInformationStore.getState().setContentHovered(true);
    if (!InternalUiShowHideManager._autoHideUi) return;
    InternalUiShowHideManager.showUiAndResetTimer();
  }
  /** Handler for when the mouse leaves the content area */
  static handleContentMouseLeave(_event) {
    useCursorInformationStore.getState().setContentHovered(false);
  }
  /** Handler for when the mouse enters a widget */
  static handleWidgetMouseEnter(_event) {
    if (!InternalUiShowHideManager._autoHideUi) return;
    InternalUiShowHideManager.showUiAndCancelTimer();
  }
  /** Shows the Ui and resets the inactivity timer */
  static showUiAndResetTimer() {
    this.isUiVisible = true;
    window.clearTimeout(this._timeout);
    if (!this._autoHideUi) return;
    this._timeout = window.setTimeout(() => {
      this.isUiVisible = false;
    }, this._inactivityTime);
  }
  /** Shows the Ui and cancels the inactivity timer */
  static showUiAndCancelTimer() {
    this.isUiVisible = true;
    window.clearTimeout(this._timeout);
  }
  static terminate() {
    window.clearTimeout(this._timeout);
    this._isUiVisible = true;
    this._autoHideUi = true;
    this._showHidePanels = false;
    this._showHideFooter = false;
    this._inactivityTime = INACTIVITY_TIME_DEFAULT;
    this._useProximityOpacity = false;
    this._snapWidgetOpacity = false;
  }
}
function isGenerated(value) {
  return value.startsWith("Widget-");
}
function createStableWidgetDef(widgetDef, stableId) {
  return new Proxy(widgetDef, {
    get(target, name, receiver) {
      const idName = "id";
      const value = Reflect.get(target, name, receiver);
      if (name === idName && isGenerated(value)) {
        return stableId;
      }
      return value;
    }
  });
}
function getWidgetManagerStableWidgetId(stageUsage, location, section, index) {
  return `uifw-wm-${stageUsage || ""}-${StagePanelLocation[location]}-${StagePanelSection[section]}-${index}`;
}
class WidgetManager {
  _widgets = [];
  /** Event raised when Widgets are changed.
   * @internal
   */
  onWidgetsChanged = new BeUiEvent();
  /** @internal */
  get widgetCount() {
    return this._widgets.length;
  }
  /** @internal */
  get widgets() {
    return this._widgets;
  }
  set widgets(w) {
    this._widgets = w;
    this.onWidgetsChanged.emit({ items: w });
  }
  /** Adds a WidgetDef for use in a Frontstage.
   * @note Added `widgetDef` must return unique id to correctly save/restore App layout.
   * Semi-stable id is generated when auto-generated `widgetDef` id is detected,
   * but correctness of such id depends on `addWidgetDef` call order and widget location.
   */
  addWidgetDef(widgetDef, stageId, stageUsage, location, section) {
    if (stageId === void 0 && stageUsage === void 0) {
      Logger.logError(
        UiFramework.loggerCategory("WidgetManager"),
        `addWidgetDef: stageId or stageUsage param must be specified`
      );
      return false;
    }
    section = section !== void 0 ? section : StagePanelSection.Start;
    const index = this._widgets.reduce((acc, info) => {
      if (info.stageId === stageId && info.stageUsage === stageUsage && info.location === location && info.section === section)
        return acc + 1;
      return acc;
    }, 0);
    const stableId = getWidgetManagerStableWidgetId(
      stageUsage,
      location,
      section,
      index
    );
    const stableWidget = createStableWidgetDef(widgetDef, stableId);
    const newWidget = {
      widgetDef: stableWidget,
      stageId,
      stageUsage,
      location,
      section
    };
    const oldWidgets = this._widgets.filter(
      (info) => info.widgetDef.id !== newWidget.widgetDef.id
    );
    const updatedWidgets = [...oldWidgets, newWidget];
    this.widgets = updatedWidgets;
    return true;
  }
  /** Removes a WidgetDef.
   */
  removeWidgetDef(widgetId) {
    let result = false;
    const updatedWidgets = this._widgets.filter(
      (info) => info.widgetDef.id !== widgetId
    );
    if (updatedWidgets.length !== this._widgets.length) {
      this.widgets = updatedWidgets;
      result = true;
    }
    return result;
  }
  /** Gets WidgetDefs for a Frontstage location.
   */
  getWidgetDefs(stageId, stageUsage, location, section) {
    const definedSection = section === void 0 ? StagePanelSection.Start : section;
    const widgetInfos = this._widgets.filter((info) => {
      return (!info.stageId || info.stageId === stageId) && (!info.stageUsage || info.stageUsage === stageUsage) && info.location === location && info.section === definedSection;
    });
    const widgetDefs = widgetInfos.map((info) => info.widgetDef);
    const widgets = UiItemsManager.getWidgets(
      stageId,
      stageUsage,
      location,
      definedSection
    );
    widgets.forEach((abstractProps) => {
      const widgetDef = WidgetDef.create(abstractProps);
      widgetDefs.push(widgetDef);
    });
    return widgetDefs.length > 0 ? widgetDefs : void 0;
  }
}
class InternalContentLayoutManager {
  static _layoutDefs = /* @__PURE__ */ new Map();
  /** build a layout key that is unique for group layout combination */
  static getKey(props) {
    return `${props.contentGroupId}-${props.layoutId}`;
  }
  /** Return a LayoutDef that is specific to a content group.
   * @returns the [[ContentLayoutDef]] if found, or undefined otherwise
   */
  static getForGroup(contentGroupProps, overrideContentLayout) {
    const layoutId = overrideContentLayout?.id ?? contentGroupProps.layout.id;
    const layoutKey = this.getKey({
      contentGroupId: contentGroupProps.id,
      layoutId
    });
    if (!overrideContentLayout && InternalContentLayoutManager._layoutDefs.has(layoutKey)) {
      return InternalContentLayoutManager._layoutDefs.get(layoutKey);
    }
    const newContentLayoutProps = {
      ...contentGroupProps.layout,
      ...overrideContentLayout
    };
    const newLayoutDef = new ContentLayoutDef(newContentLayoutProps);
    this.add(layoutKey, newLayoutDef);
    return newLayoutDef;
  }
  /** Finds a Content Layout with a given id.
   * @param layoutKey  group specific layout id, see `getLayoutKey`
   * @returns the [[ContentLayoutDef]] if found, or undefined otherwise
   */
  static find(layoutKey) {
    return InternalContentLayoutManager._layoutDefs.get(layoutKey);
  }
  /** Adds a Content Layout.
   * @param layoutId  the id of the Content Layout to add
   * @param layoutDef  the Content Layout definition to add
   */
  static add(layoutId, layoutDef) {
    InternalContentLayoutManager._layoutDefs.set(layoutId, layoutDef);
  }
  /** Gets the active Content Layout */
  static get activeLayout() {
    let layoutDef;
    const activeFrontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (activeFrontstageDef) layoutDef = activeFrontstageDef.contentLayoutDef;
    return layoutDef;
  }
  /** Gets the active Content Group */
  static get activeContentGroup() {
    let contentGroup;
    const activeFrontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (activeFrontstageDef) contentGroup = activeFrontstageDef.contentGroup;
    return contentGroup;
  }
  /** Sets the active Content Layout, Content Group and Content Control.
   * @param contentLayoutDef  Content layout to make active
   * @param contentGroup  Content Group to make active
   */
  static async setActive(contentLayoutDef, contentGroup) {
    await InternalFrontstageManager.setActiveLayout(
      contentLayoutDef,
      contentGroup
    );
  }
  /** Sets the active Content Group.
   * @param contentGroup  Content Group to make active
   */
  static async setActiveContentGroup(contentGroup) {
    await InternalFrontstageManager.setActiveContentGroup(contentGroup);
  }
  /** Refreshes the active layout and content group.
   */
  static refreshActive() {
    const activeFrontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (activeFrontstageDef && activeFrontstageDef.contentLayoutDef && activeFrontstageDef.contentGroup) {
      UiFramework.frontstages.onContentLayoutActivatedEvent.emit({
        contentLayout: activeFrontstageDef.contentLayoutDef,
        contentGroup: activeFrontstageDef.contentGroup
      });
      activeFrontstageDef.contentGroup.refreshContentNodes();
    }
  }
}
class InternalContentViewManager {
  static _mouseDown = false;
  static _activeContent;
  /** Gets the [[MouseDownChangedEvent]] */
  static onMouseDownChangedEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** Determines if the mouse is down in a content view */
  static get isMouseDown() {
    return this._mouseDown;
  }
  /** Sets the mouse down status for a content view */
  static setMouseDown(mouseDown) {
    this._mouseDown = mouseDown;
    this.onMouseDownChangedEvent.emit({ mouseDown });
  }
  /** Gets the [[ActiveContentChangedEvent]] */
  static onActiveContentChangedEvent = new BeUiEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** Fires when floating contents are added or removed */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static onAvailableContentChangedEvent = new BeUiEvent();
  /** Gets the active content as a React.ReactNode. */
  static getActive() {
    return this._activeContent;
  }
  static getControlFromElement(content, activeContentGroup, floatingControls, logIfNotFound = false) {
    if (floatingControls?.length) {
      let control = floatingControls.find(
        (contentControl) => contentControl.reactNode === content
      );
      if (control) return control;
      let controlId;
      if (content && content.key) {
        const key = content.key;
        controlId = key.split("::", 1)[0];
      }
      floatingControls.forEach((contentControl) => {
        const node = contentControl.reactNode;
        const key = node?.key;
        const nodeId = key && key.split("::", 1)[0];
        if (nodeId === controlId) control = contentControl;
      });
      if (control) return control;
    }
    if (activeContentGroup) {
      const activeContentControl = (
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        activeContentGroup.getControlFromElement(content)
      );
      if (activeContentControl) return activeContentControl;
    }
    if (logIfNotFound)
      Logger.logError(
        UiFramework.loggerCategory("InternalContentViewManager"),
        `getControlFromElement: no control found for element`
      );
    return void 0;
  }
  /** Return the active ContentControl. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static getActiveContentControl() {
    let activeContentControl;
    const activeFrontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (this._activeContent && activeFrontstageDef) {
      const activeContentGroup = activeFrontstageDef.contentGroup;
      activeContentControl = this.getControlFromElement(
        this._activeContent,
        activeContentGroup,
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        activeFrontstageDef.floatingContentControls
      );
    }
    return activeContentControl;
  }
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static addFloatingContentControl(contentControl) {
    const activeFrontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (activeFrontstageDef && contentControl) {
      activeFrontstageDef.addFloatingContentControl(contentControl);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static dropFloatingContentControl(contentControl) {
    const activeFrontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (activeFrontstageDef && contentControl)
      activeFrontstageDef.dropFloatingContentControl(contentControl);
  }
  /** Sets the active [[ContentControl]]. */
  static setActive(activeContent, forceEventProcessing = false) {
    if (this._activeContent !== activeContent || forceEventProcessing) {
      const oldContent = this._activeContent;
      this._activeContent = activeContent;
      const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
      if (!frontstageDef) return;
      const contentGroup = frontstageDef.contentGroup;
      if (contentGroup) {
        const reactContent = contentGroup.contentPropsList.find(
          (contentProps) => contentProps.content === activeContent
        );
        if (reactContent) {
          this.onActiveContentChangedEvent.emit({
            id: reactContent.id,
            activeContent: reactContent.content
          });
          return;
        }
      }
      const oldContentControl = this.getControlFromElement(
        oldContent,
        contentGroup,
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        frontstageDef.floatingContentControls
      );
      const activeContentControl = this.getControlFromElement(
        activeContent,
        contentGroup,
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        frontstageDef.floatingContentControls,
        true
      );
      if (!activeContentControl) {
        this.onActiveContentChangedEvent.emit({
          activeContent,
          oldContent,
          id: void 0
        });
        return;
      }
      const doSetActiveView = forceEventProcessing || !activeContentControl.viewport || oldContentControl && !oldContentControl.viewport;
      if (doSetActiveView) {
        frontstageDef.setActiveView(activeContentControl, oldContentControl);
        this.onActiveContentChangedEvent.emit({
          id: activeContentControl.controlId,
          activeContent,
          oldContent
        });
      } else {
        if (activeContentControl.viewport && activeContentControl.viewport !== IModelApp.viewManager.selectedView) {
          void IModelApp.viewManager.setSelectedView(
            activeContentControl.viewport
          );
        }
      }
    }
  }
  static setActiveId(contentId) {
    if (!contentId) {
      this.setActive(contentId);
      return;
    }
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) return;
    const contentGroup = frontstageDef.contentGroup;
    if (!contentGroup) return;
    const contentIndex = contentGroup.contentPropsList.findIndex(
      (content) => content.id === contentId
    );
    if (contentIndex < 0) return;
    const contentProps = contentGroup.contentPropsList[contentIndex];
    if (contentProps.content) {
      this.setActive(contentProps.content);
      return;
    }
    const control = contentGroup.getContentControl(contentProps, contentIndex);
    if (!control) return;
    this.setActive(control.reactNode);
  }
  static getActiveId() {
    const activeContentControl = this.getActiveContentControl();
    if (activeContentControl) {
      return activeContentControl.controlId;
    }
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    const contentGroup = frontstageDef?.contentGroup;
    const activeContent = contentGroup?.contentPropsList.find(
      (contentProps) => {
        return contentProps.content === this.getActive();
      }
    );
    return activeContent?.id;
  }
  /** Refreshes the active [[ContentControl]]. */
  static refreshActive(activeContent) {
    this.layouts.refreshActive();
    this.setActive(activeContent, true);
  }
  /**
   * Determines if content displays a Sheet view.
   * @param content ContentControl to check
   */
  static isContentSheetView(content) {
    if (!content || !content.viewport) return false;
    return ViewUtilities.isSheetView(content.viewport);
  }
  /**
   * Determines if content displays a Drawing view.
   * @param content ContentControl to check
   */
  static isContentDrawingView(content) {
    if (!content || !content.viewport) return false;
    return ViewUtilities.isDrawingView(content.viewport);
  }
  /**
   * Determines if content displays a Spatial view.
   * @param content ContentControl to check
   */
  static isContentSpatialView(content) {
    if (!content || !content.viewport) return false;
    return ViewUtilities.isSpatialView(content.viewport);
  }
  /**
   * Determines if content displays a Orthographic view.
   * @param content ContentControl to check
   */
  static isContentOrthographicView(content) {
    if (!content || !content.viewport) return false;
    return ViewUtilities.isOrthographicView(content.viewport);
  }
  /**
   * Determines if content displays a 3d view.
   * @param content ContentControl to check
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static isContent3dView(content) {
    if (!content || !content.viewport) return false;
    return ViewUtilities.is3dView(content.viewport);
  }
  /**
   * Determines if viewport supports use of a camera.
   * @param content ContentControl to check
   */
  static contentSupportsCamera(content) {
    if (!content || !content.viewport) return false;
    return ViewUtilities.viewSupportsCamera(content.viewport);
  }
  /** Manage content layouts. */
  static get layouts() {
    return InternalContentLayoutManager;
  }
  /** Manage dialogs displaying managed content. */
  static get dialogs() {
    return InternalContentDialogManager;
  }
}
var CalculatorOperator = /* @__PURE__ */ ((CalculatorOperator2) => {
  CalculatorOperator2[CalculatorOperator2["None"] = 0] = "None";
  CalculatorOperator2[CalculatorOperator2["Clear"] = 1] = "Clear";
  CalculatorOperator2[CalculatorOperator2["ClearAll"] = 2] = "ClearAll";
  CalculatorOperator2[CalculatorOperator2["Backspace"] = 3] = "Backspace";
  CalculatorOperator2[CalculatorOperator2["Add"] = 4] = "Add";
  CalculatorOperator2[CalculatorOperator2["Subtract"] = 5] = "Subtract";
  CalculatorOperator2[CalculatorOperator2["Multiply"] = 6] = "Multiply";
  CalculatorOperator2[CalculatorOperator2["Divide"] = 7] = "Divide";
  CalculatorOperator2[CalculatorOperator2["NegPos"] = 8] = "NegPos";
  CalculatorOperator2[CalculatorOperator2["Decimal"] = 9] = "Decimal";
  CalculatorOperator2[CalculatorOperator2["Equals"] = 10] = "Equals";
  return CalculatorOperator2;
})(CalculatorOperator || {});
class CalculatorEngine {
  _displayValue = "0";
  _operator;
  _previousKeyType = 0;
  _firstValue = "";
  _modValue = "";
  constructor() {
    this.clearAll();
  }
  clearAll() {
    this._displayValue = "0";
    this._previousKeyType = 0;
    this._firstValue = "";
    this._modValue = "";
    this._operator = void 0;
  }
  get result() {
    return parseFloat(this._displayValue);
  }
  get displayValue() {
    return this._displayValue;
  }
  processValue(value) {
    let resultString;
    if (this._displayValue === "0" || this._previousKeyType === 1 || this._previousKeyType === 2) {
      resultString = value;
    } else {
      resultString = this._displayValue + value;
    }
    this._displayValue = resultString;
    this._previousKeyType = 0;
    return resultString;
  }
  processOperator(operator) {
    const displayedNum = this._displayValue;
    const resultString = this._createResultString(operator, displayedNum);
    this._displayValue = resultString;
    this._updateCalculatorState(operator, resultString, displayedNum);
    return resultString;
  }
  _createResultString = (operator, displayedNum) => {
    let resultString = displayedNum;
    if (this._isMathOperator(operator)) {
      const firstValue = this._firstValue;
      const savedOperator = this._operator;
      resultString = firstValue && savedOperator && this._previousKeyType !== 1 && this._previousKeyType !== 2 ? this._calculate(firstValue, savedOperator, displayedNum) : displayedNum;
    } else {
      switch (operator) {
        case 1:
          resultString = "0";
          break;
        case 2:
          resultString = "0";
          break;
        case 3:
          resultString = resultString.slice(0, -1);
          if (resultString.length === 0) resultString = "0";
          break;
        case 9:
          if (!resultString.includes(".")) resultString = `${displayedNum}.`;
          else if (this._previousKeyType === 1 || this._previousKeyType === 2)
            resultString = "0.";
          break;
        case 8:
          if (displayedNum.length > 0 && displayedNum[0] === "-")
            resultString = displayedNum.substring(1);
          else resultString = `-${displayedNum}`;
          break;
        case 10: {
          const firstValue = this._firstValue;
          const savedOperator = this._operator;
          const modValue = this._modValue;
          if (firstValue && savedOperator) {
            resultString = this._previousKeyType === 2 ? this._calculate(displayedNum, savedOperator, modValue) : this._calculate(firstValue, savedOperator, displayedNum);
          } else {
            resultString = displayedNum;
          }
          break;
        }
      }
    }
    return resultString;
  };
  _isMathOperator = (operator) => {
    switch (operator) {
      case 4:
      case 5:
      case 6:
      case 7:
        return true;
    }
    return false;
  };
  _calculate = (n1Str, operator, n2Str) => {
    let result = 0;
    const n1 = parseFloat(n1Str);
    const n2 = parseFloat(n2Str);
    switch (operator) {
      case 4:
        result = n1 + n2;
        break;
      case 5:
        result = n1 - n2;
        break;
      case 6:
        result = n1 * n2;
        break;
      case 7:
        const displayValue = n2;
        if (displayValue !== 0) result = n1 / displayValue;
        else result = 0;
        break;
    }
    return result.toString();
  };
  _updateCalculatorState = (operator, resultString, displayedNum) => {
    let keyType = 0;
    if (this._isMathOperator(operator)) {
      if (this._firstValue && this._operator && this._previousKeyType === 0) {
        this._firstValue = resultString;
      } else {
        this._firstValue = displayedNum;
      }
      this._operator = operator;
      keyType = 1;
    } else {
      switch (operator) {
        case 2:
          this.clearAll();
          break;
        case 10: {
          let secondValue = displayedNum;
          if (this._firstValue) {
            if (this._previousKeyType === 2) {
              secondValue = this._modValue;
            }
          }
          this._modValue = secondValue;
          keyType = 2;
        }
      }
    }
    this._previousKeyType = keyType;
  };
}
class SquareButton extends reactExports.PureComponent {
  render() {
    const { className, style, ...buttonProps } = this.props;
    const buttonClassNames = classnames("uifw-square-button", className);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button$2,
      {
        ...buttonProps,
        size: "small",
        className: buttonClassNames,
        style
      }
    );
  }
}
SquareButton.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "SquareButton" };
function SvgBackspace() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      version: "1.1",
      id: "Calque_1",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      x: "0px",
      y: "0px",
      viewBox: "0 0 16 16",
      enableBackground: "new 0 0 16 16",
      xmlSpace: "preserve",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M5,2L0,7.5L5,13h11V2H5z M12.21,8.79c0.39,0.39,0.39,1.03,0,1.42c-0.19,0.19-0.44,0.29-0.71,0.29\n			c-0.27,0-0.52-0.1-0.71-0.29L9.5,8.91l-1.29,1.3c-0.38,0.37-1.04,0.37-1.42,0c-0.39-0.39-0.39-1.03,0-1.42l1.3-1.29l-1.3-1.29\n			c-0.39-0.39-0.39-1.03,0-1.42c0.39-0.39,1.03-0.39,1.42,0l1.29,1.3l1.29-1.3c0.39-0.39,1.03-0.39,1.42,0c0.39,0.39,0.39,1.03,0,1.42\n			l-1.3,1.29L12.21,8.79z"
        }
      )
    }
  );
}
SvgBackspace.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "SvgBackspace" };
class Calculator extends reactExports.PureComponent {
  _mainDiv = reactExports.createRef();
  _equalsClicked = false;
  static defaultProps = {
    engine: new CalculatorEngine()
  };
  constructor(props) {
    super(props);
    let displayValue = "0";
    if (this.props.initialValue)
      displayValue = this.props.engine.processValue(
        this.props.initialValue.toString()
      );
    this.state = {
      displayValue
    };
  }
  _onValueButtonClick = (keyChar) => {
    const displayValue = this.props.engine.processValue(keyChar);
    this._mainDivFocus();
    this.setState({ displayValue });
  };
  _onOperatorButtonClick = (operator) => {
    if (operator === CalculatorOperator.Clear && this._equalsClicked)
      operator = CalculatorOperator.ClearAll;
    const displayValue = this.props.engine.processOperator(operator);
    this._mainDivFocus();
    this.setState({ displayValue });
    if (operator === CalculatorOperator.Equals) this._equalsClicked = true;
    else if (operator === CalculatorOperator.ClearAll)
      this._equalsClicked = false;
  };
  _handleOk = (_event) => {
    this._ok();
  };
  _ok() {
    if (this.props.onOk) {
      this.props.onOk(this.props.engine.result);
    }
    this._clearAll();
  }
  _handleCancel = (_event) => {
    this._cancel();
  };
  _cancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    this._clearAll();
  }
  _clearAll() {
    this.props.engine.clearAll();
    this._equalsClicked = false;
  }
  componentDidMount() {
    this._mainDivFocus();
  }
  _mainDivFocus() {
    if (this._mainDiv.current) this._mainDiv.current.focus();
  }
  render() {
    const { className, resultIcon, onOk, onCancel, initialValue, ...props } = this.props;
    const classNames = classnames("uifw-calculator", className);
    const topSection = resultIcon ? (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IconInput,
        {
          containerClassName: "uifw-calculator-top-input",
          value: this.state.displayValue,
          readOnly: true,
          icon: resultIcon
        }
      )
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: this.state.displayValue, readOnly: true, size: "small" });
    return (
      // The event handler is only being used to capture bubbled events
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ...props,
          ref: this._mainDiv,
          tabIndex: -1,
          className: classNames,
          onKeyDown: this._handleKeyDown,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "uifw-calculator-top", children: topSection }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CalculatorKeyPad,
              {
                onValueClick: this._onValueButtonClick,
                onOperatorClick: this._onOperatorButtonClick
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "uifw-calculator-bottom-buttons", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button$2,
                {
                  className: classnames(
                    "uifw-calculator-large-button",
                    "uifw-calculator-ok-button"
                  ),
                  styleType: "cta",
                  onClick: this._handleOk,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$2, { iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCheckmark, {}) })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button$2,
                {
                  className: classnames(
                    "uifw-calculator-large-button",
                    "uifw-calculator-cancel-button"
                  ),
                  onClick: this._handleCancel,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$2, { iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgRemove, {}) })
                }
              )
            ] })
          ]
        }
      )
    );
  }
  _handleKeyDown = (event) => {
    switch (event.key) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this._onValueButtonClick(event.key);
        break;
      case "a":
      case "A":
        this._onOperatorButtonClick(CalculatorOperator.ClearAll);
        break;
      case "c":
      case "C":
      case Key_enumExports.Key.Clear.valueOf():
        this._onOperatorButtonClick(CalculatorOperator.Clear);
        break;
      case Key_enumExports.Key.Escape.valueOf():
        this._cancel();
        break;
      case Key_enumExports.Key.Backspace.valueOf():
        this._onOperatorButtonClick(CalculatorOperator.Backspace);
        break;
      case "/":
      case Key_enumExports.Key.Divide.valueOf():
        this._onOperatorButtonClick(CalculatorOperator.Divide);
        break;
      case "*":
      case Key_enumExports.Key.Multiply.valueOf():
        this._onOperatorButtonClick(CalculatorOperator.Multiply);
        break;
      case "-":
      case Key_enumExports.Key.Subtract.valueOf():
        this._onOperatorButtonClick(CalculatorOperator.Subtract);
        break;
      case "+":
      case Key_enumExports.Key.Add.valueOf():
        this._onOperatorButtonClick(CalculatorOperator.Add);
        break;
      case ".":
      case Key_enumExports.Key.Decimal.valueOf():
        this._onOperatorButtonClick(CalculatorOperator.Decimal);
        break;
      case "=":
        this._onOperatorButtonClick(CalculatorOperator.Equals);
        break;
      case Key_enumExports.Key.Enter.valueOf():
        if (!this._equalsClicked)
          this._onOperatorButtonClick(CalculatorOperator.Equals);
        this._ok();
        break;
    }
  };
}
class CalculatorKeyPad extends reactExports.PureComponent {
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: classnames("uifw-calculator-button-grid"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OperatorButton,
        {
          operator: CalculatorOperator.ClearAll,
          onClick: this.props.onOperatorClick,
          children: "AC"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OperatorButton,
        {
          operator: CalculatorOperator.Clear,
          onClick: this.props.onOperatorClick,
          children: "C"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OperatorButton,
        {
          operator: CalculatorOperator.Backspace,
          onClick: this.props.onOperatorClick,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "uifw-calculator-button-svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$2, { iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgBackspace, {}) }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OperatorButton,
        {
          operator: CalculatorOperator.Divide,
          onClick: this.props.onOperatorClick,
          className: "uifw-calculator-large-font",
          children: "÷"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ValueButton, { keyChar: "7", onClick: this.props.onValueClick }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ValueButton, { keyChar: "8", onClick: this.props.onValueClick }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ValueButton, { keyChar: "9", onClick: this.props.onValueClick }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OperatorButton,
        {
          operator: CalculatorOperator.Multiply,
          onClick: this.props.onOperatorClick,
          className: "uifw-calculator-large-font",
          children: "×"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ValueButton, { keyChar: "4", onClick: this.props.onValueClick }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ValueButton, { keyChar: "5", onClick: this.props.onValueClick }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ValueButton, { keyChar: "6", onClick: this.props.onValueClick }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OperatorButton,
        {
          operator: CalculatorOperator.Subtract,
          onClick: this.props.onOperatorClick,
          className: "uifw-calculator-large-font",
          children: "−"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ValueButton, { keyChar: "1", onClick: this.props.onValueClick }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ValueButton, { keyChar: "2", onClick: this.props.onValueClick }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ValueButton, { keyChar: "3", onClick: this.props.onValueClick }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OperatorButton,
        {
          operator: CalculatorOperator.Add,
          onClick: this.props.onOperatorClick,
          className: "uifw-calculator-large-font",
          children: "+"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ValueButton, { keyChar: "0", onClick: this.props.onValueClick }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OperatorButton,
        {
          operator: CalculatorOperator.NegPos,
          onClick: this.props.onOperatorClick,
          className: "uifw-calculator-large-font",
          children: "±"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OperatorButton,
        {
          operator: CalculatorOperator.Decimal,
          onClick: this.props.onOperatorClick,
          className: "uifw-calculator-large-font",
          children: "."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OperatorButton,
        {
          operator: CalculatorOperator.Equals,
          onClick: this.props.onOperatorClick,
          className: "uifw-calculator-large-font",
          children: "="
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
    ] });
  }
}
class ValueButton extends reactExports.PureComponent {
  _handleOnClick = (_event) => {
    this.props.onClick(this.props.keyChar);
  };
  render() {
    const { className, keyChar, onClick, ...props } = this.props;
    const itemClassNames = classnames("uifw-calculator-item", className);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SquareButton,
      {
        ...props,
        className: itemClassNames,
        onClick: this._handleOnClick,
        children: keyChar
      }
    );
  }
}
class OperatorButton extends reactExports.PureComponent {
  _handleOnClick = (_event) => {
    this.props.onClick(this.props.operator);
  };
  render() {
    const { className, children, operator, onClick, ...props } = this.props;
    const itemClassNames = classnames("uifw-calculator-item", className);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SquareButton,
      {
        ...props,
        className: itemClassNames,
        onClick: this._handleOnClick,
        children
      }
    );
  }
}
Calculator.__docgenInfo = { "description": "@public", "methods": [], "displayName": "Calculator", "props": { "initialValue": { "required": false, "tsType": { "name": "number" }, "description": "Initial value" }, "resultIcon": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Icon to display beside the calculated result" }, "onOk": { "required": false, "tsType": { "name": "OnNumberCommitFunc" }, "description": "A function to be run when the OK button is clicked" }, "onCancel": { "required": false, "tsType": { "name": "OnCancelFunc" }, "description": "A function to be run when the Cancel button is clicked" }, "engine": { "required": false, "tsType": { "name": "CalculatorEngine" }, "description": "@internal Calculator state machine.", "defaultValue": { "value": "new CalculatorEngine()", "computed": false } } }, "composes": ["CommonProps"] };
class CalculatorPopup extends reactExports.PureComponent {
  state = {
    size: { width: -1, height: -1 }
  };
  _onSizeKnown = (newSize) => {
    if (newSize.height === this.state.size.height && newSize.width === this.state.size.width)
      return;
    this.setState({ size: newSize });
  };
  render() {
    const point = PopupManager.getPopupPosition(
      this.props.el,
      this.props.pt,
      this.props.offset,
      this.state.size
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PositionPopup,
      {
        point,
        className: "uifw-calculator-host",
        onSizeKnown: this._onSizeKnown,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(DivWithOutsideClick, { onOutsideClick: this.props.onCancel, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PositionPopupContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Calculator,
          {
            initialValue: this.props.initialValue,
            resultIcon: (
              // eslint-disable-next-line @typescript-eslint/no-deprecated
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$2, { iconSpec: this.props.resultIcon })
            ),
            onOk: this.props.onOk,
            onCancel: this.props.onCancel
          }
        ) }) })
      },
      this.props.id
    );
  }
}
CalculatorPopup.__docgenInfo = { "description": "Popup component for Calculator\n@public\n@deprecated in 4.16.0. Use {@link Calculator} component with {@link https://itwinui.bentley.com/docs/popover iTwinUI Popover} or {@link AccuDrawPopupManager.showCalculator} method instead.", "methods": [], "displayName": "CalculatorPopup", "props": { "initialValue": { "required": true, "tsType": { "name": "number" }, "description": "" }, "resultIcon": { "required": true, "tsType": { "name": "string" }, "description": "" }, "onOk": { "required": true, "tsType": { "name": "OnNumberCommitFunc" }, "description": "" }, "onCancel": { "required": true, "tsType": { "name": "OnCancelFunc" }, "description": "" } }, "composes": ["PopupPropsBase"] };
class MenuButton extends reactExports.PureComponent {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  _menu = null;
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }
  render() {
    const { point, className, style, onSizeKnown, ...buttonProps } = this.props;
    const divStyle = {
      top: point.y,
      left: point.x
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "uifw-menu-button",
        style: divStyle,
        ref: (e) => this.setDivRef(e),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SquareButton,
            {
              ...buttonProps,
              className,
              style,
              onClick: this._handleClick,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon$2, { iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgMore, {}) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ContextMenu,
            {
              ref: (el) => {
                this._menu = el;
              },
              selectedIndex: 0,
              onSelect: this._handleClose,
              onOutsideClick: this._handleClose,
              onEsc: this._handleClose,
              opened: this.state.expanded,
              autoflip: false,
              children: this.props.children
            }
          )
        ]
      }
    );
  }
  setDivRef(div) {
    if (!div) return;
    const rect = div.getBoundingClientRect();
    this.props.onSizeKnown?.({ width: rect.width, height: rect.height });
  }
  _open = () => {
    this.setState({ expanded: true }, () => {
      if (this._menu) this._menu.focus();
    });
  };
  _handleClick = (event) => {
    if (this.state.expanded) {
      event.stopPropagation();
      this.setState({ expanded: false });
    } else {
      this._open();
    }
  };
  _handleClose = () => {
    this.setState({ expanded: false });
  };
}
MenuButton.__docgenInfo = { "description": "@public", "methods": [], "displayName": "MenuButton", "props": { "point": { "required": true, "tsType": { "name": "XAndY" }, "description": "Center point" }, "onSizeKnown": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(size: SizeProps) => void", "signature": { "arguments": [{ "type": { "name": "_SizeProps" }, "name": "size" }], "return": { "name": "void" } } }, "description": "Function called when size is known." } }, "composes": ["Omit"] };
class MenuButtonPopup extends reactExports.PureComponent {
  state = {
    size: { width: -1, height: -1 }
  };
  _onSizeKnown = (newSize) => {
    if (newSize.height === this.state.size.height && newSize.width === this.state.size.width)
      return;
    this.setState({ size: newSize });
  };
  render() {
    const point = PopupManager.getPopupPosition(
      this.props.el,
      this.props.pt,
      this.props.offset,
      this.state.size
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuButton,
      {
        point,
        onSizeKnown: this._onSizeKnown,
        children: this.props.content
      },
      this.props.id
    );
  }
}
MenuButtonPopup.__docgenInfo = { "description": "Popup component for Menu Buttons\n@public", "methods": [], "displayName": "MenuButtonPopup", "props": { "content": { "required": true, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" } }, "composes": ["PopupPropsBase"] };
function SvgDistance() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "distance" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { y: "11", width: "16", height: "1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "15 4 15 5.875 12 4 12 6 4 6 4 4 1 5.875 1 4 0 4 0 9 1 9 1 7.125 4 9 4 7 12 7 12 9 15 7.125 15 9 16 9 16 4 15 4" })
  ] });
}
SvgDistance.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "SvgDistance" };
function SvgAngle() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "angle" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16,10H14a4.9509,4.9509,0,0,0-1.2325-3.2723L14.23,5.2655l-3.4651-.8,2.0773-2.1153-.7139-.7012L0,14H15.9971V13H14.125ZM2.3838,13,9.8974,5.3488l.7967,3.4522,1.3621-1.362A3.95363,3.95363,0,0,1,13,10H11l1.875,3Z" })
  ] });
}
SvgAngle.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "SvgAngle" };
function SvgHeight() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      version: "1.1",
      id: "Calque_1",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      x: "0px",
      y: "0px",
      viewBox: "0 0 16 16",
      enableBackground: "new 0 0 16 16",
      xmlSpace: "preserve",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "height" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "4", width: "1", height: "16" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "12,15 10.125,15 12,12 10,12 10,4 12,4 10.125,1 12,1 12,0 7,0 7,1 8.875,1 7,4 9,4 9,12 7,12 8.875,15 7,15 7,16 12,16" })
        ] })
      ]
    }
  );
}
SvgHeight.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "SvgHeight" };
class AccuDrawPopupManager {
  static _calculatorId = "Calculator";
  static showMenuButton(id, el, pt, menuItemsProps) {
    const menuItems = MenuItemHelpers.createMenuItems(menuItemsProps);
    const menuContent = MenuItemHelpers.createMenuItemNodes(menuItems);
    const component = /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuButtonPopup,
      {
        id,
        el,
        pt,
        offset: PopupManager.defaultOffset,
        content: menuContent
      }
    );
    const popupInfo = {
      id,
      pt,
      component,
      parentDocument: el.ownerDocument,
      parent: el.ownerDocument
    };
    PopupManager.addOrUpdatePopup(popupInfo);
    return true;
  }
  static hideMenuButton(id) {
    return PopupManager.removePopup(id);
  }
  static showCalculator(el, pt, initialValue, resultIcon, onOk, onCancel) {
    const id = AccuDrawPopupManager._calculatorId;
    const component = (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CalculatorPopup,
        {
          id,
          el,
          pt,
          offset: PopupManager.defaultOffset,
          initialValue,
          resultIcon,
          onOk,
          onCancel
        }
      )
    );
    const popupInfo = {
      id,
      pt,
      component,
      parentDocument: el.ownerDocument,
      parent: el.ownerDocument
    };
    PopupManager.addOrUpdatePopup(popupInfo);
    return true;
  }
  static hideCalculator() {
    return PopupManager.removePopup(AccuDrawPopupManager._calculatorId);
  }
  static showAngleEditor(el, pt, value, onCommit, onCancel) {
    const propertyDescription = new AngleDescription();
    addIconNodeParam(propertyDescription, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgAngle, {}));
    return PopupManager.showInputEditor(
      el,
      pt,
      value,
      propertyDescription,
      onCommit,
      onCancel
    );
  }
  /** @internal */
  static showDimensionEditor(dimension, el, pt, value, onCommit, onCancel) {
    if (dimension === "height") {
      return AccuDrawPopupManager.showHeightEditor(
        el,
        pt,
        value,
        onCommit,
        onCancel
      );
    }
    return AccuDrawPopupManager.showLengthEditor(
      el,
      pt,
      value,
      onCommit,
      onCancel
    );
  }
  static showLengthEditor(el, pt, value, onCommit, onCancel) {
    const propertyDescription = new LengthDescription();
    addIconNodeParam(propertyDescription, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgDistance, {}));
    return PopupManager.showInputEditor(
      el,
      pt,
      value,
      propertyDescription,
      onCommit,
      onCancel
    );
  }
  static showHeightEditor(el, pt, value, onCommit, onCancel) {
    const propertyDescription = new LengthDescription();
    addIconNodeParam(propertyDescription, /* @__PURE__ */ jsxRuntimeExports.jsx(SvgHeight, {}));
    return PopupManager.showInputEditor(
      el,
      pt,
      value,
      propertyDescription,
      onCommit,
      onCancel
    );
  }
}
function UiDataProvidedDialog({
  uiDataProvider,
  id,
  isModal,
  title,
  movable,
  resizable,
  minWidth: minWidth2,
  minHeight: minHeight2,
  maxWidth,
  maxHeight,
  width,
  height,
  style
}) {
  const dialogId = reactExports.useRef(id ? id : getUniqueId());
  const dialogIsModal = reactExports.useRef(isModal);
  const onOK = reactExports.useRef(void 0);
  const onCancel = reactExports.useRef(void 0);
  const closeDialog = () => {
    if (dialogIsModal.current) UiFramework.dialogs.modal.close();
    else UiFramework.dialogs.modeless.close(dialogId.current);
  };
  const handleOk = reactExports.useCallback(() => {
    onOK.current && onOK.current();
    closeDialog();
  }, []);
  const handleCancel = reactExports.useCallback(() => {
    onCancel.current && onCancel.current();
    closeDialog();
  }, []);
  const generateButtonCluster = reactExports.useCallback(
    (buttons2) => {
      if (buttons2) {
        for (const button of buttons2) {
          if (DialogButtonType.Cancel === button.type) {
            onCancel.current = button.onClick;
            button.onClick = handleCancel;
            continue;
          }
          if (DialogButtonType.OK === button.type) {
            onOK.current = button.onClick;
            button.onClick = handleOk;
            continue;
          }
        }
      }
      return buttons2;
    },
    [handleCancel, handleOk]
  );
  const [buttonCluster, setButtonCluster] = reactExports.useState(
    () => generateButtonCluster(uiDataProvider.supplyButtonData())
  );
  reactExports.useEffect(() => {
    return uiDataProvider.onItemsReloadedEvent.addListener(() => {
      setButtonCluster(
        generateButtonCluster(uiDataProvider.supplyButtonData())
      );
    });
  }, [generateButtonCluster, uiDataProvider]);
  reactExports.useEffect(() => {
    return uiDataProvider.onButtonsReloadedEvent.addListener(() => {
      setButtonCluster(
        generateButtonCluster(uiDataProvider.supplyButtonData())
      );
    });
  }, [generateButtonCluster, uiDataProvider]);
  const handleClose = reactExports.useCallback(() => closeDialog(), []);
  const containerStyle = {
    minWidth: minWidth2,
    minHeight: minHeight2,
    maxWidth: maxWidth || "100%",
    maxHeight,
    width: width || "50%",
    margin: "",
    height
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Dialog$1,
    {
      isOpen: true,
      onClose: handleClose,
      closeOnEsc: true,
      closeOnExternalClick: false,
      isDraggable: movable,
      isResizable: resizable,
      preventDocumentScroll: true,
      style,
      children: [
        isModal && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog$1.Backdrop, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Dialog$1.Main,
          {
            style: containerStyle,
            "data-testid": "ui-data-provided-dialog-container",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog$1.TitleBar, { titleText: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog$1.Content, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                DefaultDialogGridContainer,
                {
                  componentGenerator: new ComponentGenerator(uiDataProvider)
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog$1.ButtonBar, { children: buttonCluster && buttonCluster.map((button, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(DialogButton, { button }, index)) })
            ]
          }
        )
      ]
    }
  );
}
function DialogButton({ button }) {
  const { translate } = useTranslation();
  let buttonText = "";
  let usePrimaryStyleType = false;
  let buttonClass = button.className;
  switch (button.type) {
    case DialogButtonType.OK:
      buttonText = translate("dialog.ok");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.Retry:
      buttonText = translate("dialog.retry");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.Yes:
      buttonText = translate("dialog.yes");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.No:
      buttonText = translate("dialog.no");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      break;
    case DialogButtonType.Cancel:
      buttonText = translate("dialog.cancel");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      break;
    case DialogButtonType.Close:
      buttonText = translate("dialog.close");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      break;
    case DialogButtonType.Next:
      buttonText = translate("dialog.next");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.Previous:
      buttonText = translate("dialog.previous");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
  }
  buttonText = button.label || buttonText;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button$2,
    {
      className: buttonClass,
      disabled: button.disabled,
      styleType: usePrimaryStyleType ? "high-visibility" : void 0,
      onClick: button.onClick,
      children: buttonText
    }
  );
}
UiDataProvidedDialog.__docgenInfo = { "description": "Component to show dialog populated from properties supplied via uiDataProvider\n@public\n@deprecated in 4.15.0. Use {@link https://itwinui.bentley.com/docs/dialog iTwinUI Dialog} instead.", "methods": [], "displayName": "UiDataProvidedDialog", "props": { "title": { "required": true, "tsType": { "name": "string" }, "description": "Dialog title" }, "uiDataProvider": { "required": true, "tsType": { "name": "DialogLayoutDataProvider" }, "description": "Provider that provides and lays out DialogItems" }, "isModal": { "required": true, "tsType": { "name": "boolean" }, "description": "Indicates if Dialog is Modal" }, "id": { "required": false, "tsType": { "name": "string" }, "description": "Id used to specify dialog." }, "resizable": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether the user can resize dialog with cursor. Default: false" }, "movable": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether the user can move dialog with cursor. Default: false" }, "width": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": 'Initial width of dialog. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: "50%"' }, "height": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "Initial height of dialog. Displayed in px if value is a number; otherwise, displayed in specified CSS unit." }, "minWidth": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "Minimum width that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 300px" }, "minHeight": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "Minimum height that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 100px" }, "maxWidth": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "Maximum width that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit." }, "maxHeight": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "Maximum height that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit." }, "style": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS style properties." } } };
const useGlobalStore = createStore$1(() => ({
  numItemsSelected: 0,
  iModelConnection: void 0,
  viewState: void 0,
  cursorMenuPayload: void 0
}));
const SettingsManager = SettingsManager$1;
class UiVisibilityChangedEvent extends UiEvent {
}
class UiFramework {
  /** Operation on the backstage component. */
  static get backstage() {
    if (!UiFramework._backstageManager)
      throw new UiError(
        UiFramework.loggerCategory("UiFramework"),
        UiFramework._complaint
      );
    return UiFramework._backstageManager;
  }
  /** Manage access to the child windows. */
  static get childWindows() {
    return appUi.windowManager;
  }
  /** Manage registered controls.
   * @deprecated in 4.16.0. Uses a deprecated interface {@link FrameworkControls}.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static get controls() {
    return InternalConfigurableUiManager;
  }
  /** Manage access to frontstages and related helper methods. */
  static get frontstages() {
    if (!UiFramework._frontstages) {
      return InternalFrontstageManager;
    }
    return UiFramework._frontstages;
  }
  /** Manage access and behavior of the tool settings. */
  static get toolSettings() {
    return InternalToolSettingsManager;
  }
  /** Manage content presented by the frontstages. */
  static get content() {
    return InternalContentViewManager;
  }
  /** Manage displayed dialogs. */
  static get dialogs() {
    return {
      modal: InternalModalDialogManager,
      modeless: InternalModelessDialogManager
    };
  }
  /** Manages global keyboard shortcuts
   *
   * Note: This only manages the list of available shortcuts registered with it. It does not listens to the actual
   * keyboard events. In order for these shortcuts to be called upon a keyboard event, the application can
   * override the `IModelApp.toolAdmin` and assign it [[FrameworkToolAdmin]] or create an event listener
   * and call `UiFramework.keyboardShortcuts.processKey`.
   */
  static get keyboardShortcuts() {
    return InternalKeyboardShortcutManager;
  }
  /** Manages UI visibility (Show/Hide). */
  static get visibility() {
    return InternalUiShowHideManager;
  }
  static _initialized = false;
  static _store;
  static _complaint = "UiFramework not initialized";
  static _frameworkStateKeyInStore = "frameworkState";
  // default name
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static _backstageManager;
  static _widgetManager;
  static _hideIsolateEmphasizeActionHandler;
  /** this provides a default state storage handler */
  static _uiStateStorage = new LocalStateStorage();
  static _settingsManager;
  static _uiSettingsProviderRegistry = /* @__PURE__ */ new Map();
  static _frontstages;
  static useDefaultPopoutUrl = false;
  static CONTEXT_MENU_OFFSET = -8;
  /** Event raised within UiFramework.setIModelConnection */
  static onIModelConnectionChanged = new BeUiEvent();
  /** Registers class that will be informed when the UserSettingsStorage location has been set or changed. This allows
   * classes to load any previously saved settings from the new storage location. Common storage locations are the browser's
   * local storage, or the iTwin Product Settings cloud storage available via the SettingsAdmin see `IModelApp.settingsAdmin`.
   */
  static registerUserSettingsProvider(entry) {
    if (this._uiSettingsProviderRegistry.has(entry.providerId)) return false;
    this._uiSettingsProviderRegistry.set(entry.providerId, entry);
    return true;
  }
  /** Get Show Ui event. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static onUiVisibilityChanged = new UiVisibilityChangedEvent();
  static async initialize(storeOrArgs, frameworkStateKey, args) {
    if (UiFramework._initialized) {
      Logger.logInfo(
        UiFramework.loggerCategory("UiFramework"),
        `UiFramework.initialize already called`
      );
      return;
    }
    const { store, args: initializeArgs } = parseInitializeArgs(storeOrArgs);
    args = initializeArgs ?? args;
    const { frontstages } = args ?? {};
    UiFramework._frontstages = frontstages;
    if (void 0 === store && !StateManager.isInitialized(true))
      new StateManager();
    UiFramework._store = store;
    if (frameworkStateKey && store)
      UiFramework._frameworkStateKeyInStore = frameworkStateKey;
    const frameworkNamespace = IModelApp.localization?.registerNamespace(
      UiFramework.localizationNamespace
    );
    [
      restoreLayoutTools,
      keyinPaletteTools,
      openSettingTools,
      toolSettingTools
    ].forEach(
      (tool) => IModelApp.tools.registerModule(tool, this.localizationNamespace)
    );
    UiFramework._backstageManager = new BackstageManager();
    UiFramework._hideIsolateEmphasizeActionHandler = new HideIsolateEmphasizeManager();
    UiFramework._widgetManager = new WidgetManager();
    await UiIModelComponents.initialize();
    UiFramework.settingsManager.onSettingsProvidersChanged.addListener(() => {
      dispatchSyncUiEvent(SyncUiEventId.SettingsProvidersChanged);
    });
    UiAdmin.messagePresenter = IModelApp.notifications;
    UiFramework._initialized = true;
    UiShowHideSettingsProvider.initialize();
    InternalConfigurableUiManager.initialize();
    return frameworkNamespace;
  }
  /** Un-registers the UiFramework internationalization service namespace. */
  static terminate() {
    InternalModalDialogManager.closeAll();
    InternalModelessDialogManager.closeAll();
    InternalKeyboardShortcutManager.shortcutContainer.emptyData();
    UiFramework._store = void 0;
    UiFramework._frameworkStateKeyInStore = "frameworkState";
    if (StateManager.isInitialized(true)) StateManager.clearStore();
    IModelApp.localization?.unregisterNamespace(
      UiFramework.localizationNamespace
    );
    UiFramework._backstageManager = void 0;
    UiFramework._widgetManager = void 0;
    UiFramework._hideIsolateEmphasizeActionHandler = void 0;
    UiFramework._settingsManager = void 0;
    UiIModelComponents.terminate();
    InternalUiShowHideManager.terminate();
    UiFramework._initialized = false;
  }
  /** Determines if UiFramework has been initialized */
  static get initialized() {
    return UiFramework._initialized;
  }
  /** Property that returns the SettingManager used by AppUI-based applications. */
  static get settingsManager() {
    if (void 0 === UiFramework._settingsManager)
      UiFramework._settingsManager = new SettingsManager();
    return UiFramework._settingsManager;
  }
  /** The internationalization service namespace. */
  static get localizationNamespace() {
    return "UiFramework";
  }
  static get hideIsolateEmphasizeActionHandler() {
    if (!UiFramework._hideIsolateEmphasizeActionHandler)
      throw new UiError(
        UiFramework.loggerCategory("UiFramework"),
        UiFramework._complaint
      );
    return UiFramework._hideIsolateEmphasizeActionHandler;
  }
  static setHideIsolateEmphasizeActionHandler(handler) {
    if (handler) UiFramework._hideIsolateEmphasizeActionHandler = handler;
    else
      UiFramework._hideIsolateEmphasizeActionHandler = new HideIsolateEmphasizeManager();
  }
  /** @alpha */
  static get widgetManager() {
    if (!UiFramework._widgetManager)
      throw new UiError(
        UiFramework.loggerCategory("UiFramework"),
        UiFramework._complaint
      );
    return UiFramework._widgetManager;
  }
  /** Calls localization.getLocalizedString with the "UiFramework" namespace. Do NOT include the namespace in the key.
   * @internal
   */
  static translate(key, options) {
    return IModelApp.localization.getLocalizedString(
      `${UiFramework.localizationNamespace}:${String(key)}`,
      options
    );
  }
  /** @internal */
  static get packageName() {
    return "appui-react";
  }
  /** @internal */
  static loggerCategory(name) {
    return `${UiFramework.packageName}.${name}`;
  }
  /** Show a context menu at a particular location.
   * @param items Properties of the menu items to display.
   * @param location Location of the context menu, relative to the origin of anchorElement or the overall window.
   * @param anchorElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the menu was displayed, false if the menu could not be displayed.
   */
  static openContextMenu(items, location, anchorElement) {
    let position = location;
    let childWindowId;
    if (anchorElement) {
      const anchorOffset = anchorElement.getBoundingClientRect();
      position = {
        x: anchorOffset.left + location.x,
        y: anchorOffset.top + location.y
      };
      childWindowId = UiFramework.childWindows.findId(
        anchorElement.ownerDocument.defaultView
      );
    }
    position = {
      x: position.x + UiFramework.CONTEXT_MENU_OFFSET,
      y: position.y + UiFramework.CONTEXT_MENU_OFFSET
    };
    const cursorMenuData = {
      position,
      items,
      childWindowId
    };
    UiFramework.openCursorMenu(cursorMenuData);
    return true;
  }
  static openCursorMenu(menuData) {
    if (this.frameworkState) {
      UiFramework.dispatchActionToStore(
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        SessionStateActionId.UpdateCursorMenu,
        menuData
      );
      return;
    }
    useGlobalStore.setState({ cursorMenuPayload: menuData });
    dispatchSyncUiEvent(SessionStateActionId.UpdateCursorMenu);
  }
  static closeCursorMenu() {
    if (UiFramework.frameworkState) {
      UiFramework.dispatchActionToStore(
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        SessionStateActionId.UpdateCursorMenu,
        void 0
      );
      return;
    }
    useGlobalStore.setState({ cursorMenuPayload: void 0 });
    dispatchSyncUiEvent(SessionStateActionId.UpdateCursorMenu);
  }
  /** @note Returned value is immutable.  */
  static getCursorMenuData() {
    const state = this.frameworkState;
    if (state) {
      return (
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        state.sessionState.cursorMenuPayload ?? // eslint-disable-next-line @typescript-eslint/no-deprecated
        state.sessionState.cursorMenuData
      );
    }
    return useGlobalStore.getState().cursorMenuPayload;
  }
  static setIModelConnection(iModelConnection, immediateSync = false) {
    const oldConnection = UiFramework.getIModelConnection();
    if (oldConnection === iModelConnection) return;
    InternalFrontstageManager.clearFrontstageDefsForIModelId(
      oldConnection?.iModelId
    );
    oldConnection && SyncUiEventDispatcher.clearConnectionEvents(oldConnection);
    iModelConnection && SyncUiEventDispatcher.initializeConnectionEvents(iModelConnection);
    if (UiFramework.frameworkState) {
      UiFramework.dispatchActionToStore(
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        SessionStateActionId.SetIModelConnection,
        iModelConnection,
        immediateSync
      );
    } else {
      useGlobalStore.setState({ iModelConnection });
      dispatchSyncUiEvent(SessionStateActionId.SetIModelConnection);
    }
    const itemsSelected = iModelConnection ? iModelConnection.selectionSet.elements.size : 0;
    UiFramework.setNumItemsSelected(itemsSelected);
    UiFramework.setActiveIModelId(iModelConnection?.iModelId ?? "");
    UiFramework.onIModelConnectionChanged.emit(iModelConnection);
  }
  static getIModelConnection() {
    const frameworkState = UiFramework.frameworkState;
    if (frameworkState) {
      return frameworkState.sessionState.iModelConnection;
    }
    return useGlobalStore.getState().iModelConnection;
  }
  static setNumItemsSelected(numSelected) {
    if (UiFramework.frameworkState) {
      UiFramework.dispatchActionToStore(
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        SessionStateActionId.SetNumItemsSelected,
        numSelected
      );
      return;
    }
    useGlobalStore.setState({ numItemsSelected: numSelected });
    dispatchSyncUiEvent(SessionStateActionId.SetNumItemsSelected);
  }
  static getNumItemsSelected() {
    const state = this.frameworkState;
    if (state) {
      return state.sessionState.numItemsSelected;
    }
    return useGlobalStore.getState().numItemsSelected;
  }
  /** Called by iModelApp to initialize saved UI state from registered UseSettingsProviders. */
  static async initializeStateFromUserSettingsProviders(immediateSync = false) {
    const providerKeys = [...this._uiSettingsProviderRegistry.keys()];
    for (const key of providerKeys) {
      await this._uiSettingsProviderRegistry.get(key).loadUserSettings(UiFramework._uiStateStorage);
    }
    dispatchSyncUiEvent(SyncUiEventId.UiStateStorageChanged, immediateSync);
  }
  static async setUiStateStorage(storage, immediateSync = false) {
    if (UiFramework._uiStateStorage === storage) return;
    UiFramework._uiStateStorage = storage;
    await this.initializeStateFromUserSettingsProviders(immediateSync);
  }
  /** The UI Settings Storage is a convenient wrapper around Local Storage to assist in caching state information across user sessions.
   * It was previously used to conflate both the state information across session and the information driven directly from user explicit action,
   * which are now handled with user preferences.
   */
  static getUiStateStorage() {
    return UiFramework._uiStateStorage;
  }
  static setDefaultViewState(viewState, immediateSync = false) {
    if (UiFramework.frameworkState) {
      UiFramework.dispatchActionToStore(
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        SessionStateActionId.SetDefaultViewState,
        viewState,
        immediateSync
      );
      return;
    }
    useGlobalStore.setState({ viewState });
    dispatchSyncUiEvent(
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      SessionStateActionId.SetDefaultViewState,
      immediateSync
    );
  }
  static getDefaultViewState() {
    const frameworkState = UiFramework.frameworkState;
    if (frameworkState) {
      return frameworkState.sessionState.defaultViewState;
    }
    return useGlobalStore.getState().viewState;
  }
  /** @deprecated in 4.17.0. Use `isUiVisible` of {@link UiFramework.visibility} instead. */
  static getIsUiVisible() {
    return UiFramework.visibility.isUiVisible;
  }
  /** @deprecated in 4.17.0. Use `isUiVisible` of {@link UiFramework.visibility} instead. */
  static setIsUiVisible(visible) {
    UiFramework.visibility.isUiVisible = visible;
  }
  /** @deprecated in 4.13.0. Use {@link @itwin/core-bentley#ProcessDetector.isMobileBrowser} instead. */
  // eslint-disable-next-line @itwin/prefer-get
  static isMobile() {
    return ProcessDetector.isMobileBrowser;
  }
  /** Determines whether a ContextMenu is open
   * @alpha
   */
  static get isContextMenuOpen() {
    const contextMenu = document.querySelector("div.core-context-menu-opened");
    return contextMenu !== null && contextMenu !== void 0;
  }
  /** Show a Card containing content, a title and a toolbar at a particular location.
   * @param content The React component of the content to display
   * @param title Title to display at the top of the card.
   * @param toolbarProps Properties of the Toolbar to display.
   * @param location Location of the Card, relative to the origin of anchorElement or the window.
   * @param offset Offset of the Card from the location.
   * @param onItemExecuted Function invoked after a Toolbar item is executed
   * @param onCancel Function invoked when the Escape key is pressed or a click occurs outside the Card
   * @param placement {@link Placement} relative to the given location. Defaults to top-end.
   * @param anchorElement The HTMLElement that anchors the Card. If undefined, the location is relative to the overall window.
   * @return true if the Card was displayed, false if the Card could not be displayed.
   * @internal
   */
  static showCard(content, title, toolbarProps, location, offset, onItemExecuted, onCancel, placement = "top-end", anchorElement) {
    const anchor = this.resolveHtmlElement(anchorElement);
    return PopupManager.displayCard(content, {
      title,
      toolbarProps,
      location,
      offset,
      onItemExecuted,
      onCancel,
      placement,
      anchor
    });
  }
  /**
   * Hides a Card displayed with {@link UiFramework.showCard}
   * @internal
   */
  static hideCard() {
    return PopupManager.hideCard();
  }
  /** Opens a Tool Settings Ui popup at a particular location.
   * @param dataProvider The DialogLayoutDataProvider for the tool settings popup dialog.
   * @param location Location of the tool settings, relative to the origin of anchorElement or the window
   * @param offset Offset of the tool settings from the location
   * @param onCancel Function invoked when the Escape key is pressed or a click occurs outside the tool settings
   * @param placement {@link Placement} relative to the given location. Defaults to top-end.
   * @param anchorElement The HTMLElement that anchors the tool settings. If undefined, the location is relative to the overall window.
   * @return true if the tool settings were displayed, false if the tool settings could not be displayed.
   * @internal
   */
  static openToolSettingsPopup(dataProvider, location, offset, onCancel, placement = "top-end", anchorElement) {
    const el = this.resolveHtmlElement(anchorElement);
    const relativePosition = mapToRelativePosition(placement);
    return PopupManager.openToolSettings(
      dataProvider,
      el,
      location,
      offset,
      onCancel,
      relativePosition
    );
  }
  /**
   * Closes the Tool Settings Ui popup.
   * @internal
   */
  static closeToolSettingsPopup() {
    return PopupManager.closeToolSettings();
  }
  /** Show a Toolbar at a particular location.
   * @param toolbarProps Properties of the Toolbar to display.
   * @param location Location of the Toolbar, relative to the origin of anchorElement or the overall window.
   * @param offset Offset of the Toolbar from the location.
   * @param onItemExecuted Function invoked after a Toolbar item is executed
   * @param onCancel Function invoked when the Escape key is pressed or a click occurs outside the Toolbar
   * @param placement {@link Placement} relative to the given location. Defaults to top-end.
   * @param anchorElement The HTMLElement that anchors the Toolbar. If undefined, the location is relative to the overall window.
   * @return true if the Toolbar was displayed, false if the Toolbar could not be displayed.
   */
  static showToolbar(toolbarProps, location, offset, onItemExecuted, onCancel, placement = "top-end", anchorElement) {
    const anchor = UiFramework.resolveHtmlElement(anchorElement);
    return PopupManager.displayToolbar(toolbarProps.items, {
      anchor,
      location,
      offset,
      onItemExecuted,
      onCancel,
      placement
    });
  }
  /** Hides a toolbar displayed via {@link UiFramework.showToolbar} */
  static hideToolbar() {
    return PopupManager.hideToolbar();
  }
  /** Show a menu button at a particular location. A menu button opens a context menu.
   * @param id Id of the menu button. Multiple menu buttons may be displayed.
   * @param menuItemsProps Properties of the menu items to display.
   * @param location Location of the context menu, relative to the origin of anchorElement or the window.
   * @param anchorElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the menu was displayed, false if the menu could not be displayed.
   */
  static showMenuButton(id, menuItemsProps, location, anchorElement) {
    const el = this.resolveHtmlElement(anchorElement);
    return AccuDrawPopupManager.showMenuButton(
      id,
      el,
      location,
      menuItemsProps
    );
  }
  /** Hides a menu button.
   * @param id Id of the menu button. Multiple menu buttons may be displayed.
   * @return true if the menu was hidden, false if the menu could not be hidden.
   */
  static hideMenuButton(id) {
    return AccuDrawPopupManager.hideMenuButton(id);
  }
  /** Show a calculator at a particular location.
   * @param initialValue Value initially displayed in the calculator.
   * @param resultIcon Icon displayed to the left of the value.
   * @param location Location of the calculator, relative to the origin of anchorElement or the window.
   * @param onOk Function called when the OK button or the Enter key is pressed.
   * @param onCancel Function called when the Cancel button or the Escape key  is pressed.
   * @param anchorElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the menu was displayed, false if the menu could not be displayed.
   */
  static showCalculator(initialValue, resultIcon, location, onOk, onCancel, anchorElement) {
    const el = this.resolveHtmlElement(anchorElement);
    return AccuDrawPopupManager.showCalculator(
      el,
      location,
      initialValue,
      resultIcon,
      onOk,
      onCancel
    );
  }
  /** Hides the calculator. */
  static hideCalculator() {
    return AccuDrawPopupManager.hideCalculator();
  }
  /** Show a React Element at a particular location.
   * @param component The ReactElement to display
   * @param options - Optional {@link: ShowComponentParams}
   */
  static showComponent(...params) {
    const options = params[1] || {};
    const component = params[0];
    const { anchorRef, id } = options;
    let { location, offset, onCancel, placement } = options;
    if (!location) location = { x: 0, y: 0 };
    if (!offset) offset = { x: 0, y: 0 };
    if (!placement) placement = "top-end";
    if (!onCancel) onCancel = () => UiFramework.hideComponent(id);
    return PopupManager.showComponent(component, {
      location,
      offset,
      onCancel,
      placement,
      anchor: anchorRef?.current ?? void 0,
      id
    });
  }
  /**
   * Hides the Component previously shown with {@link UiFramework.showComponent}
   */
  static hideComponent(id) {
    return PopupManager.hideComponent(id);
  }
  /** Show an input editor for an angle value at a particular location.
   * @param initialValue Value initially displayed in the editor.
   * @param location Location of the editor, relative to the origin of anchorElement or the window.
   * @param onCommit Function called when the OK button or the Enter key is pressed.
   * @param onCancel Function called when the Cancel button or the Escape key  is pressed.
   * @param anchorElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the editor was displayed, false if the editor could not be displayed.
   */
  static showAngleEditor(initialValue, location, onCommit, onCancel, anchorElement) {
    const el = this.resolveHtmlElement(anchorElement);
    return AccuDrawPopupManager.showAngleEditor(
      el,
      location,
      initialValue,
      onCommit,
      onCancel
    );
  }
  /** Show an input editor for a length value at a particular location.
   * @param ShowInputEditorOptions Options detailed below for the input editor
   * @param ShowInputEditorOptions.anchorElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @param ShowInputEditorOptions.propertyDescription Description of the primitive value property
   * @param ShowInputEditorOptions.initialValue Value initially displayed in the editor.
   * @param ShowInputEditorOptions.location Location of the editor, relative to the origin of anchorElement or the window.
   * @param ShowInputEditorOptions.onCommit Function called when the OK button or the Enter key is pressed.
   * @param ShowInputEditorOptions.onCancel Function called when the Cancel button or the Escape key is pressed.
   * @return true if the editor was displayed, false if the editor could not be displayed.
   * @internal
   */
  static showInputEditor({
    anchorElement,
    initialValue,
    location,
    onCancel,
    onCommit,
    propertyDescription
  }) {
    const el = this.resolveHtmlElement(anchorElement);
    PopupManager.showInputEditor(
      el,
      location,
      initialValue,
      propertyDescription,
      onCommit,
      onCancel
    );
    return true;
  }
  /** Show an input editor for a length value at a particular location.
   * @param dimension Dimension determining which editor to display.
   * @param initialValue Value initially displayed in the editor.
   * @param location Location of the editor, relative to the origin of anchorElement or the window.
   * @param onCommit Function called when the OK button or the Enter key is pressed.
   * @param onCancel Function called when the Cancel button or the Escape key  is pressed.
   * @param anchorElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the editor was displayed, false if the editor could not be displayed.
   */
  static showDimensionEditor(dimension, initialValue, location, onCommit, onCancel, anchorElement) {
    const el = this.resolveHtmlElement(anchorElement);
    return AccuDrawPopupManager.showDimensionEditor(
      dimension,
      el,
      location,
      initialValue,
      onCommit,
      onCancel
    );
  }
  /** Hides the input editor.
   * @internal
   */
  static hideInputEditor() {
    return PopupManager.hideInputEditor();
  }
  /** Opens a Dialog and automatically populates it using the properties defined by the UiDataProvider.
   * @param uiDataProvider The UiDataProvider for the tool settings
   * @param title Specify title for dialog.
   * @param isModal Specify if the dialog is opened as a modal or modeless.
   * @param id Id of the dialog that is used to close it.
   * @param optionalProps Optional props for Dialog construction.
   * @return true if the tool settings were displayed, false if the tool settings could not be displayed.
   * @internal
   */
  static openDialog(uiDataProvider, title, isModal, id, optionalProps) {
    const dialog2 = reactExports.createElement(UiDataProvidedDialog, {
      uiDataProvider,
      title,
      isModal,
      id,
      ...optionalProps
    });
    const modalType = isModal ? "modal" : "modeless";
    UiFramework.dialogs[modalType].open(dialog2, id);
    return true;
  }
  /** Closes the Dialog with the specified dialogId.
   * @param dialogId Id of the dialog to close.
   * @internal
   */
  static closeDialog(dialogId) {
    const findFn = (info) => info.id === dialogId;
    if (UiFramework.dialogs.modeless.dialogs.findIndex(findFn) !== -1) {
      UiFramework.dialogs.modeless.close(dialogId);
      return true;
    }
    if (UiFramework.dialogs.modal.dialogs.findIndex(findFn) !== -1) {
      UiFramework.dialogs.modal.close();
      return true;
    }
    return false;
  }
  /** Show the Key-in Palette to display key-in from all registered Tools.
   * @param keyinEntries A list of KeyinEntry to display in the palette. These can be gathered and filtered from iModelApp.tools.getToolList()
   * @param htmlElement The HTMLElement that anchors the Popup. If undefined, the location is relative to the overall window.
   * @return true if the Command Palette was displayed, false if it could not be displayed.
   */
  static showKeyinPalette(keyinEntries, htmlElement) {
    return PopupManager.showKeyinPalette(
      keyinEntries,
      UiFramework.resolveHtmlElement(htmlElement)
    );
  }
  /** Hides the Key-in Palette. */
  static hideKeyinPalette() {
    return PopupManager.hideKeyinPalette();
  }
  static resolveHtmlElement(htmlElement) {
    const el = htmlElement ?? UiFramework.controls.getWrapperElement();
    return el;
  }
  /* eslint-disable @typescript-eslint/no-deprecated */
  /** @deprecated in 4.15.0. Use your preferred state management library instead and {@link SyncUiEventDispatcher} to dispatch sync UI events. */
  static dispatchActionToStore(type, payload, immediateSync = false) {
    const reduxStore = UiFramework.reduxStore;
    const reduxState = reduxStore?.getState();
    const frameworkState = reduxState?.[UiFramework.frameworkStateKey];
    if (!frameworkState) return;
    reduxStore.dispatch({ type, payload });
    dispatchSyncUiEvent(type, immediateSync);
  }
  /** Key used to access framework state from redux store.
   * @deprecated in 4.15.0. Use your preferred state management library instead.
   */
  static get frameworkStateKey() {
    return UiFramework._frameworkStateKeyInStore;
  }
  /** The Redux store.
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Use your preferred state management library instead.
   */
  static get store() {
    const reduxStore = this.reduxStore;
    if (!reduxStore) {
      throw new UiError(
        UiFramework.loggerCategory("UiFramework"),
        `Error trying to access redux store before either store or StateManager has been initialized.`
      );
    }
    return reduxStore;
  }
  /** @internal */
  static get reduxStore() {
    if (UiFramework._store) {
      return UiFramework._store;
    }
    if (StateManager.isInitialized(true)) {
      return StateManager.store;
    }
    return void 0;
  }
  /** The UiFramework state maintained by Redux.
   * @note Returned fields should not be modified. Use the appropriate action dispatchers to modify the state.
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Use your preferred state management library instead.
   */
  static get frameworkState() {
    const store = UiFramework.reduxStore;
    const state = store?.getState();
    const frameworkState = state?.[UiFramework.frameworkStateKey];
    return frameworkState;
  }
  /** Set the theme value used by the [[ThemeManager]] component.
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Components should take `theme` as a prop.
   */
  static getColorTheme() {
    return UiFramework.frameworkState?.configurableUiState.theme ?? SYSTEM_PREFERRED_COLOR_THEME;
  }
  /** Set the theme value used by the [[ThemeManager]] component.
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Use `theme` prop of {@link ThemeManager}.
   */
  static setColorTheme(theme) {
    if (UiFramework.getColorTheme() === theme) return;
    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.SetTheme,
      theme,
      true
    );
  }
  /** Returns the variable controlling whether the overlay is displayed in a Viewport.
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Components should take `viewOverlay` as a prop.
   */
  static get viewOverlayDisplay() {
    return UiFramework.frameworkState?.configurableUiState.viewOverlayDisplay ?? true;
  }
  /** Set the variable that controls display of the view overlay. Applies to all viewports in the app.
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Use {@link ConfigurableUiContentProps.viewOverlay} prop of {@link ConfigurableUiContent}.
   */
  static setViewOverlayDisplay(display) {
    if (UiFramework.viewOverlayDisplay === display) return;
    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.SetViewOverlayDisplay,
      display
    );
  }
  /**
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Components should take `widgetOpacity` as a prop.
   */
  static getWidgetOpacity() {
    return UiFramework.frameworkState?.configurableUiState.widgetOpacity ?? WIDGET_OPACITY_DEFAULT;
  }
  /**
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Use {@link ConfigurableUiContentProps.widgetOpacity} prop of {@link ConfigurableUiContent}.
   */
  static setWidgetOpacity(opacity) {
    if (UiFramework.getWidgetOpacity() === opacity) return;
    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.SetWidgetOpacity,
      opacity,
      true
    );
  }
  /**
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Components should take `snapMode` as a prop.
   */
  static getAccudrawSnapMode() {
    return UiFramework.frameworkState?.configurableUiState.snapMode ?? SnapMode.NearestKeypoint;
  }
  /**
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Use `snapMode` prop of {@link SnapModeField}.
   */
  static setAccudrawSnapMode(snapMode) {
    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.SetSnapMode,
      snapMode,
      true
    );
  }
  /**
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Components should take `useDragInteraction` as a prop.
   */
  static get useDragInteraction() {
    return UiFramework.frameworkState?.configurableUiState.useDragInteraction ?? false;
  }
  /**
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Use `useDragInteraction` prop of {@link Toolbar}.
   */
  static setUseDragInteraction(useDragInteraction) {
    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.SetDragInteraction,
      useDragInteraction,
      true
    );
  }
  /**
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Components should take `widgetIcon` as a prop.
   */
  static get showWidgetIcon() {
    return UiFramework.frameworkState?.configurableUiState.showWidgetIcon ?? false;
  }
  /**
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Use {@link ConfigurableUiContentProps.widgetIcon} prop of {@link ConfigurableUiContent}.
   */
  static setShowWidgetIcon(value) {
    if (UiFramework.showWidgetIcon === value) return;
    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.SetShowWidgetIcon,
      value,
      true
    );
  }
  /** When `true`, panels will close as soon as the mouse leave the panel.
   * When `false` (default), panels will close on next click outside the panel.
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Components should take `collapsePanels` as a prop.
   */
  static get autoCollapseUnpinnedPanels() {
    return UiFramework.frameworkState?.configurableUiState.autoCollapseUnpinnedPanels ?? false;
  }
  /** Method used to enable the automatic closing of an unpinned widget panel as soon as the
   * mouse leaves the widget panel. The default behavior is to require a mouse click outside
   * the panel before it is closed.
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Use {@link ConfigurableUiContentProps.collapsePanels} prop of {@link ConfigurableUiContent}.
   */
  static setAutoCollapseUnpinnedPanels(value) {
    if (UiFramework.autoCollapseUnpinnedPanels === value) return;
    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.AutoCollapseUnpinnedPanels,
      value,
      true
    );
  }
  /** Animate Tool Settings on appear.
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Components should take `animateToolSettings` as a prop.
   */
  static get animateToolSettings() {
    return UiFramework.frameworkState?.configurableUiState.animateToolSettings ?? false;
  }
  /**
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Use {@link ConfigurableUiContentProps.animateToolSettings} prop of {@link ConfigurableUiContent}.
   */
  static setAnimateToolSettings(value) {
    if (UiFramework.animateToolSettings === value) return;
    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.AnimateToolSettings,
      value,
      true
    );
  }
  /** Use Tool Name As Tool Settings Widget Tab Label.
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Components should take `toolAsToolSettingsLabel` as a prop.
   */
  static get useToolAsToolSettingsLabel() {
    return UiFramework.frameworkState?.configurableUiState.useToolAsToolSettingsLabel ?? false;
  }
  /**
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Use {@link ConfigurableUiContentProps.toolAsToolSettingsLabel} prop of {@link ConfigurableUiContent}.
   */
  static setUseToolAsToolSettingsLabel(value) {
    if (UiFramework.useToolAsToolSettingsLabel === value) return;
    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.UseToolAsToolSettingsLabel,
      value,
      true
    );
  }
  /** UiFramework.getToolbarOpacity() returns a number between 0 and 1 that is the non-hovered opacity for toolbars.
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Components should take `opacity` as a prop.
   */
  static getToolbarOpacity() {
    return UiFramework.frameworkState?.configurableUiState.toolbarOpacity ?? TOOLBAR_OPACITY_DEFAULT;
  }
  /** UiFramework.setToolbarOpacity() sets the non-hovered opacity to the value specified.
   * @param opacity a value between 0 and 1. The default value is 0.5. IT IS NOT ADVISED TO USE A VALUE BELOW 0.2
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Use {@link ConfigurableUiContentProps.toolbarOpacity} prop of {@link ConfigurableUiContent}.
   */
  static setToolbarOpacity(opacity) {
    if (UiFramework.getToolbarOpacity() === opacity) return;
    UiFramework.dispatchActionToStore(
      ConfigurableUiActionId.SetToolbarOpacity,
      opacity,
      true
    );
  }
  /**
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Get id from iModel connection.
   */
  static getActiveIModelId() {
    return UiFramework.frameworkState?.sessionState.iModelId ?? "";
  }
  /**
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Not used by AppUI components.
   */
  static setActiveIModelId(iModelId) {
    UiFramework.dispatchActionToStore(
      SessionStateActionId.SetActiveIModelId,
      iModelId
    );
  }
  /** Returns the stored active selection scope id.
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Components should take `activeScope` as a prop.
   */
  static getActiveSelectionScope() {
    return UiFramework.frameworkState?.sessionState.activeSelectionScope ?? "element";
  }
  /** This method stores the active selection scope to the supplied scope id, and triggers
   * a `SessionStateActionId.SetSelectionScope` event in the `SyncUiEventDispatcher`.
   * Note: As of 4.0, this method *does not change* the active selection scope in the `Presentation.selection.scopes.activeScope` property.
   * This event should be listened to and the change should typically be applied to
   * `Presentation.selection.scopes.activeScope` property from the `@itwin/presentation-frontend` package.
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Use `activeScope` prop of {@link SelectionScopeField}.
   */
  static setActiveSelectionScope(selectionScopeId) {
    if (!UiFramework.frameworkState) return;
    const foundIndex = UiFramework.frameworkState.sessionState.availableSelectionScopes.findIndex(
      (selectionScope) => selectionScope.id === selectionScopeId
    );
    if (foundIndex < 0) return;
    UiFramework.dispatchActionToStore(
      SessionStateActionId.SetSelectionScope,
      selectionScopeId
    );
  }
  /** Returns the stored list of available selection scopes. This list should be set by the application
   * by dispatching the `setAvailableSelectionScopes` action.
   * The value for this action typically come from `Presentation.selection.scopes.getSelectionScopes()`
   * method found in the `@itwin/presentation-frontend` package.
   * @note Returned value is immutable.
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Components should take `selectionScopes` as a prop.
   */
  static getAvailableSelectionScopes() {
    return UiFramework.frameworkState?.sessionState.availableSelectionScopes ?? [
      { id: "element", label: "Element" }
    ];
  }
  /**
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Not used by AppUI components.
   */
  static getDefaultIModelViewportControlId() {
    return UiFramework.frameworkState?.sessionState.defaultIModelViewportControlId ?? void 0;
  }
  /**
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Not used by AppUI components.
   */
  static setDefaultIModelViewportControlId(iModelViewportControlId, immediateSync = false) {
    UiFramework.dispatchActionToStore(
      SessionStateActionId.SetDefaultIModelViewportControlId,
      iModelViewportControlId,
      immediateSync
    );
  }
  /**
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Not used by AppUI components.
   */
  static getDefaultViewId() {
    return UiFramework.frameworkState?.sessionState.defaultViewId ?? void 0;
  }
  /**
   * @note Requires redux provider.
   * @deprecated in 4.15.0. Not used by AppUI components.
   */
  static setDefaultViewId(viewId, immediateSync = false) {
    UiFramework.dispatchActionToStore(
      SessionStateActionId.SetDefaultViewId,
      viewId,
      immediateSync
    );
  }
  /* eslint-enable @typescript-eslint/no-deprecated */
}
const appUi = /* @__PURE__ */ (() => {
  let _windowManager;
  function getWindowManager() {
    if (!_windowManager) _windowManager = new InternalChildWindowManager();
    return _windowManager;
  }
  return {
    get windowManager() {
      return getWindowManager();
    }
  };
})();
function dispatchSyncUiEvent(eventId, immediateSync = false) {
  if (immediateSync) {
    SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(eventId);
    return;
  }
  SyncUiEventDispatcher.dispatchSyncUiEvent(eventId);
}
function parseInitializeArgs(arg) {
  if (!arg) {
    return {
      store: void 0,
      args: void 0
    };
  }
  if ("dispatch" in arg) {
    return {
      store: arg,
      args: void 0
    };
  }
  return {
    store: void 0,
    args: arg
  };
}
const knownFeaturesObject = {
  contentAlwaysMaxSize: void 0,
  enableMaximizedFloatingWidget: void 0,
  enableMaximizedPanelWidget: void 0,
  horizontalPanelAlignment: void 0,
  widgetActionDropdown: void 0,
  allowBearingLettersInAccuDrawInputFields: void 0,
  reparentPopoutWidgets: void 0,
  controlWidgetVisibility: void 0,
  toolSettingsNewEditors: void 0,
  toolSettingsLockButton: void 0,
  toolSettingsKeyPressCommit: void 0,
  stableContentLayout: void 0,
  useStratakit: void 0
};
function trimToKnownFeaturesOnly(previewFeatures) {
  const knownFeatureKeys = Object.keys(knownFeaturesObject);
  const [knownFeatures, unknownFeatures] = Object.entries(
    previewFeatures
  ).reduce(
    ([known, unknown], [key, value]) => {
      if (knownFeatureKeys.includes(key)) {
        known[key] = value;
      } else {
        unknown.push(key);
      }
      return [known, unknown];
    },
    [{}, []]
  );
  if (Object.keys(unknownFeatures).length > 0) {
    Logger.logWarning(
      UiFramework.loggerCategory("trimToKnownFeaturesOnly"),
      `Features used in "setPreviewFeatures" are unknown or no longer in preview`,
      {
        unknownFeatures
      }
    );
  }
  return knownFeatures;
}
const usePreviewFeaturesStore = create((set) => {
  return {
    previewFeatures: {},
    setPreviewFeatures: (newPreviewFeatures) => {
      const previewFeatures = trimToKnownFeaturesOnly(newPreviewFeatures);
      set({ previewFeatures });
    }
  };
});
function usePreviewFeatures() {
  return usePreviewFeaturesStore((state) => state.previewFeatures);
}
function PreviewFeaturesProvider({
  children,
  features
}) {
  const setPreviewFeatures = usePreviewFeaturesStore(
    (state) => state.setPreviewFeatures
  );
  reactExports.useEffect(() => {
    setPreviewFeatures(features ?? {});
  }, [features, setPreviewFeatures]);
  reactExports.useEffect(
    () => () => {
      setPreviewFeatures({});
    },
    [setPreviewFeatures]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
PreviewFeaturesProvider.__docgenInfo = { "description": "Set which preview features are enabled. These features are not yet ready for production use nor have\na proper API defined yet.\nThe available set of features are defined in the [[PreviewFeatures]] interface.\n\nThis component should wrap the Provider component.\n\n```tsx\n<PreviewFeaturesProvider features={{ enableMaximizedFloatingWidget: true }}>\n  <Provider store={UiFramework.store}>\n   [...]\n    <ConfigurableUIContent />\n   [/...]\n  </Provider>\n</PreviewFeaturesProvider>\n```\n@beta", "methods": [], "displayName": "PreviewFeaturesProvider", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" }, "features": { "required": false, "tsType": { "name": "PreviewFeatures" }, "description": "" } } };
const meta = {
  title: "PreviewFeatures/MessageCenterFieldWithStratakitUI",
  component: MessageCenterField,
  tags: ["autodocs"],
  globals: {
    themeBridge: true
  },
  decorators: [InitializerDecorator, AppUiDecorator],
  args: {
    style: {
      marginTop: 350
    }
  }
};
const NoMessages = (Story) => {
  reactExports.useEffect(() => {
    MessageManager$1.clearMessages();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewFeaturesProvider, { features: {
    useStratakit: true
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) });
};
const Empty = {
  decorators: [NoMessages]
};
const Success = {
  decorators: [createMessageDecorator({
    priority: OutputMessagePriority.Success,
    detailedMessage: "This is a detailed success message."
  })]
};
const Error$1 = {
  decorators: [createMessageDecorator({
    priority: OutputMessagePriority.Error,
    detailedMessage: "This is a detailed error message."
  })]
};
const Warning = {
  decorators: [createMessageDecorator({
    priority: OutputMessagePriority.Warning,
    detailedMessage: "This is a detailed warning message."
  })]
};
const Info = {
  decorators: [createMessageDecorator({
    priority: OutputMessagePriority.Info,
    detailedMessage: "This is a detailed info message."
  })]
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
      originalSource: '{\n  decorators: [createMessageDecorator({\n    priority: OutputMessagePriority.Success,\n    detailedMessage: "This is a detailed success message."\n  })]\n}',
      ...Success.parameters?.docs?.source
    }
  }
};
Error$1.parameters = {
  ...Error$1.parameters,
  docs: {
    ...Error$1.parameters?.docs,
    source: {
      originalSource: '{\n  decorators: [createMessageDecorator({\n    priority: OutputMessagePriority.Error,\n    detailedMessage: "This is a detailed error message."\n  })]\n}',
      ...Error$1.parameters?.docs?.source
    }
  }
};
Warning.parameters = {
  ...Warning.parameters,
  docs: {
    ...Warning.parameters?.docs,
    source: {
      originalSource: '{\n  decorators: [createMessageDecorator({\n    priority: OutputMessagePriority.Warning,\n    detailedMessage: "This is a detailed warning message."\n  })]\n}',
      ...Warning.parameters?.docs?.source
    }
  }
};
Info.parameters = {
  ...Info.parameters,
  docs: {
    ...Info.parameters?.docs,
    source: {
      originalSource: '{\n  decorators: [createMessageDecorator({\n    priority: OutputMessagePriority.Info,\n    detailedMessage: "This is a detailed info message."\n  })]\n}',
      ...Info.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Empty", "Success", "Error", "Warning", "Info"];
export {
  Empty,
  Error$1 as Error,
  Info,
  Success,
  Warning,
  __namedExportsOrder,
  meta as default
};
