import { r as reactExports } from "./iframe-MZ9GDAUV.js";
import { U as UiCore$1 } from "./UiCore-DGGd_aJx.js";
const form = { "submitButtonLabel": "Submit", "errorPrefix": "Error:", "errorSuffix": "Please review input and try again." };
const general = { "search": "Search", "clear": "Clear" };
const dialog = { "ok": "OK", "retry": "Retry", "yes": "Yes", "no": "No", "cancel": "Cancel", "close": "Close", "next": "Next", "previous": "Previous" };
const reactselect = { "noSelectOption": "Option not found" };
const tree = { "expand": "Expand", "collapse": "Collapse" };
const elementSeparator = { "label": "Resizer" };
const UiCore = {
  form,
  general,
  dialog,
  reactselect,
  tree,
  elementSeparator
};
const defaults = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UiCore,
  dialog,
  elementSeparator,
  form,
  general,
  reactselect,
  tree
}, Symbol.toStringTag, { value: "Module" }));
const LocalizationContext = reactExports.createContext(
  void 0
);
function useLocalization() {
  const localization = reactExports.useContext(LocalizationContext);
  return localization;
}
function usePackageTranslation({
  namespace,
  fallback,
  defaults: defaults2
}) {
  const localization = useLocalization();
  const [registered, setRegistered] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!localization) return;
    let ignore = false;
    setRegistered(false);
    void (async () => {
      await localization.registerNamespace(namespace);
      if (ignore) return;
      setRegistered(true);
    })();
    return () => {
      ignore = true;
    };
  }, [localization, namespace]);
  const translate = reactExports.useCallback(
    (key) => {
      if (localization && registered) {
        return localization.getLocalizedString(`${namespace}:${key}`);
      }
      const fallbackTranslation = fallback(key);
      if (fallbackTranslation !== void 0) {
        return fallbackTranslation;
      }
      const defaultValue = getDefaultValue(defaults2, key);
      return defaultValue ?? key;
    },
    [localization, namespace, fallback, defaults2, registered]
  );
  return { translate };
}
function getDefaultValue(defaults2, propertyKey) {
  const keys = propertyKey.split(".");
  let prop = defaults2;
  for (const key of keys) {
    if (!(key in prop)) {
      prop = void 0;
      break;
    }
    prop = prop[key];
  }
  if (typeof prop !== "string") {
    return void 0;
  }
  return prop;
}
function useTranslation() {
  const fallback = reactExports.useCallback((key) => {
    if (!UiCore$1.initialized) {
      return void 0;
    }
    return UiCore$1.translate(key);
  }, []);
  return usePackageTranslation({
    namespace: UiCore$1.localizationNamespace,
    fallback,
    defaults
  });
}
export {
  useTranslation as u
};
