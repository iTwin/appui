import { v as v4, e, j as jsxRuntimeExports } from "./iframe-BxVIzreG.js";
import { I as IModelApp, be as EmptyLocalization, ao as UiComponents, U as UiFramework, bf as StateManager, bg as ColorTheme, bh as Provider_default, bi as ThemeManager } from "./appui-react-CvaqSdj1.js";
import { L as Logger } from "./Key.enum-D5EC_Md2.js";
const { addons } = __STORYBOOK_MODULE_PREVIEW_API__;
const { ImplicitActionsDuringRendering } = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;
const { global: global$1 } = __STORYBOOK_MODULE_GLOBAL__;
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};
var ADDON_ID = "storybook/actions", EVENT_ID = `${ADDON_ID}/action-event`;
var config = { depth: 10, clearOnStoryChange: true, limit: 50 };
var findProto = (obj, callback) => {
  let proto = Object.getPrototypeOf(obj);
  return !proto || callback(proto) ? proto : findProto(proto, callback);
}, isReactSyntheticEvent = (e2) => !!(typeof e2 == "object" && e2 && findProto(e2, (proto) => /^Synthetic(?:Base)?Event$/.test(proto.constructor.name)) && typeof e2.persist == "function"), serializeArg = (a) => {
  if (isReactSyntheticEvent(a)) {
    let e2 = Object.create(a.constructor.prototype, Object.getOwnPropertyDescriptors(a));
    e2.persist();
    let viewDescriptor = Object.getOwnPropertyDescriptor(e2, "view"), view = viewDescriptor?.value;
    return typeof view == "object" && view?.constructor.name === "Window" && Object.defineProperty(e2, "view", { ...viewDescriptor, value: Object.create(view.constructor.prototype) }), e2;
  }
  return a;
}, generateId = () => typeof crypto == "object" && typeof crypto.getRandomValues == "function" ? v4() : Date.now().toString(36) + Math.random().toString(36).substring(2);
function action(name, options = {}) {
  let actionOptions = { ...config, ...options }, handler = function(...args) {
    if (options.implicit) {
      let storyRenderer = ("__STORYBOOK_PREVIEW__" in global$1 ? global$1.__STORYBOOK_PREVIEW__ : void 0)?.storyRenders.find((render) => render.phase === "playing" || render.phase === "rendering");
      if (storyRenderer) {
        let deprecated = !globalThis?.FEATURES?.disallowImplicitActionsInRenderV8, error = new ImplicitActionsDuringRendering({ phase: storyRenderer.phase, name, deprecated });
        if (deprecated) console.warn(error);
        else throw error;
      }
    }
    let channel = addons.getChannel(), id = generateId(), minDepth = 5, serializedArgs = args.map(serializeArg), normalizedArgs = args.length > 1 ? serializedArgs : serializedArgs[0], actionDisplayToEmit = { id, count: 0, data: { name, args: normalizedArgs }, options: { ...actionOptions, maxDepth: minDepth + (actionOptions.depth || 3), allowFunction: actionOptions.allowFunction || false } };
    channel.emit(EVENT_ID, actionDisplayToEmit);
  };
  return handler.isAction = true, handler.implicit = options.implicit, handler;
}
const { definePreview } = __STORYBOOK_MODULE_PREVIEW_API__;
const { global } = __STORYBOOK_MODULE_GLOBAL__;
var preview_exports = {};
__export(preview_exports, { argsEnhancers: () => argsEnhancers, loaders: () => loaders });
var isInInitialArgs = (name, initialArgs) => typeof initialArgs[name] > "u" && !(name in initialArgs), inferActionsFromArgTypesRegex = (context) => {
  let { initialArgs, argTypes, id, parameters: { actions: actions2 } } = context;
  if (!actions2 || actions2.disable || !actions2.argTypesRegex || !argTypes) return {};
  let argTypesRegex = new RegExp(actions2.argTypesRegex);
  return Object.entries(argTypes).filter(([name]) => !!argTypesRegex.test(name)).reduce((acc, [name, argType]) => (isInInitialArgs(name, initialArgs) && (acc[name] = action(name, { implicit: true, id })), acc), {});
}, addActionsFromArgTypes = (context) => {
  let { initialArgs, argTypes, parameters: { actions: actions2 } } = context;
  return actions2?.disable || !argTypes ? {} : Object.entries(argTypes).filter(([name, argType]) => !!argType.action).reduce((acc, [name, argType]) => (isInInitialArgs(name, initialArgs) && (acc[name] = action(typeof argType.action == "string" ? argType.action : name)), acc), {});
};
var argsEnhancers = [addActionsFromArgTypes, inferActionsFromArgTypesRegex];
var subscribed = false, logActionsWhenMockCalled = (context) => {
  let { parameters: { actions: actions2 } } = context;
  if (!actions2?.disable && !subscribed && "__STORYBOOK_TEST_ON_MOCK_CALL__" in global && typeof global.__STORYBOOK_TEST_ON_MOCK_CALL__ == "function") {
    let onMockCall = global.__STORYBOOK_TEST_ON_MOCK_CALL__;
    onMockCall((mock, args) => {
      let name = mock.getMockName();
      name !== "spy" && (!/^next\/.*::/.test(name) || ["next/router::useRouter()", "next/navigation::useRouter()", "next/navigation::redirect", "next/cache::", "next/headers::cookies().set", "next/headers::cookies().delete", "next/headers::headers().set", "next/headers::headers().delete"].some((prefix) => name.startsWith(prefix))) && action(name)(args);
    }), subscribed = true;
  }
}, loaders = [logActionsWhenMockCalled];
class UiIModelComponents {
  static _initialized = false;
  /**
   * initialize UiIModelComponents.
   */
  static async initialize() {
    if (UiIModelComponents._initialized) {
      Logger.logInfo(
        UiIModelComponents.loggerCategory("UiIModelComponents"),
        `UiIModelComponents.initialize already called`
      );
      return;
    }
    await IModelApp.localization?.registerNamespace(
      UiIModelComponents.localizationNamespace
    );
    if (!IModelApp.localization) {
      const localization = new EmptyLocalization();
      await localization.initialize();
      await UiComponents.initialize(localization);
    } else {
      await UiComponents.initialize(IModelApp.localization);
    }
    UiIModelComponents._initialized = true;
  }
  /** Unregisters the UiIModelComponents localization namespace */
  static terminate() {
    IModelApp.localization?.unregisterNamespace(
      UiIModelComponents.localizationNamespace
    );
    UiComponents.terminate();
    UiIModelComponents._initialized = false;
  }
  /** Determines if UiIModelComponents has been initialized */
  static get initialized() {
    return UiIModelComponents._initialized;
  }
  /** The internationalization service namespace. */
  static get localizationNamespace() {
    return "UiIModelComponents";
  }
  /** @internal */
  static get packageName() {
    return "imodel-components-react";
  }
  /** Calls localization.getLocalizedString with the "UiIModelComponents" namespace. Do NOT include the namespace in the key.
   * @internal
   */
  static translate(key) {
    if (!UiIModelComponents.initialized || !IModelApp.localization) {
      Logger.logError(
        UiIModelComponents.loggerCategory("UiIModelComponents"),
        `translate: IModelApp.localization has not been setup. Returning blank string.`
      );
      return "";
    }
    return IModelApp.localization.getLocalizedString(
      `${UiIModelComponents.localizationNamespace}:${String(key)}`
    );
  }
  /** @internal */
  static loggerCategory(name) {
    return `${UiIModelComponents.packageName}.${name}`;
  }
}
const AppUiDecorator = (Story, context) => {
  new StateManager();
  const darkModeGlobal = context.globals.darkMode;
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
  ).matches;
  const isDark = darkModeGlobal === "dark" || darkModeGlobal !== "light" && prefersDark;
  const theme = isDark ? ColorTheme.Dark : ColorTheme.Light;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Provider_default, { store: StateManager.store, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeManager, { theme, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) }) });
};
const InitializerDecorator = (Story) => {
  const [initialized, setInitialized] = e.useState(false);
  e.useEffect(() => {
    let ignore = false;
    void (async () => {
      await IModelApp.startup({});
      await UiFramework.initialize(void 0);
      await UiIModelComponents.initialize();
      if (ignore) return;
      setInitialized(true);
    })();
    return () => {
      ignore = true;
    };
  }, []);
  if (!initialized) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Initializing..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {});
};
const ConsoleToActionsDecorator = (Story) => {
  e.useEffect(() => {
    const originalConsole = {
      log: console.log.bind(console),
      warn: console.warn.bind(console),
      error: console.error.bind(console),
      info: console.info.bind(console)
    };
    const makeWrapper = (level) => {
      const act = action(`console.${level}`);
      return (...args) => {
        try {
          act(...args);
        } catch {
        }
        originalConsole[level](...args);
      };
    };
    console.log = makeWrapper("log");
    console.warn = makeWrapper("warn");
    console.error = makeWrapper("error");
    console.info = makeWrapper("info");
    return () => {
      console.log = originalConsole.log;
      console.warn = originalConsole.warn;
      console.error = originalConsole.error;
      console.info = originalConsole.info;
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {});
};
AppUiDecorator.__docgenInfo = { "description": "", "methods": [], "displayName": "AppUiDecorator" };
InitializerDecorator.__docgenInfo = { "description": "", "methods": [], "displayName": "InitializerDecorator" };
ConsoleToActionsDecorator.__docgenInfo = { "description": "", "methods": [], "displayName": "ConsoleToActionsDecorator" };
export {
  AppUiDecorator as A,
  ConsoleToActionsDecorator as C,
  InitializerDecorator as I,
  UiIModelComponents as U
};
