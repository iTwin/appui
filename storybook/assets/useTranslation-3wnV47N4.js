import { r as reactExports } from "./index-DM9bPmif.js";
import { U as UiCore$1 } from "./UiCore-BpDsbitV.js";
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
const form = {
  submitButtonLabel: "Submit",
  errorPrefix: "Error:",
  errorSuffix: "Please review input and try again."
};
const general = {
  search: "Search",
  clear: "Clear"
};
const dialog = {
  ok: "OK",
  retry: "Retry",
  yes: "Yes",
  no: "No",
  cancel: "Cancel",
  close: "Close",
  next: "Next",
  previous: "Previous"
};
const reactselect = {
  noSelectOption: "Option not found"
};
const tree = {
  expand: "Expand",
  collapse: "Collapse"
};
const elementSeparator = {
  label: "Resizer"
};
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
function LocalizationProvider(props) {
  const { children, localization } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LocalizationContext.Provider, { value: localization, children });
}
function useLocalization() {
  const localization = reactExports.useContext(LocalizationContext);
  return localization;
}
try {
  LocalizationProvider.displayName = "LocalizationProvider";
  LocalizationProvider.__docgenInfo = { "description": "Provides localization capability to the components.", "displayName": "LocalizationProvider", "props": { "localization": { "defaultValue": null, "description": "", "name": "localization", "required": true, "type": { "name": "Localization" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  useLocalization.displayName = "useLocalization";
  useLocalization.__docgenInfo = { "description": "Returns localization context.", "displayName": "useLocalization", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
function usePackageTranslation({
  namespace,
  fallback,
  defaults: defaults2
}) {
  const localization = useLocalization();
  const [registered, setRegistered] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!localization)
      return;
    let ignore = false;
    setRegistered(false);
    void (async () => {
      await localization.registerNamespace(namespace);
      if (ignore)
        return;
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
try {
  usePackageTranslation.displayName = "usePackageTranslation";
  usePackageTranslation.__docgenInfo = { "description": "Used by AppUI packages internally to define package specific `useTranslation` hook.\nUses a localization provider to translate the provided key with a specified namespace. Multiple fallback layers are used to resolve the translation:\n- Return value of a specified `fallback` function.\n- Default value looked up from a specified `defaults` object.\n- Lastly `key` argument of the translation function is returned.", "displayName": "usePackageTranslation", "props": { "namespace": { "defaultValue": null, "description": "", "name": "namespace", "required": true, "type": { "name": "string" } }, "fallback": { "defaultValue": null, "description": "", "name": "fallback", "required": true, "type": { "name": "(key: string) => string | undefined" } }, "defaults": { "defaultValue": null, "description": "", "name": "defaults", "required": true, "type": { "name": "object" } } } };
} catch (__react_docgen_typescript_loader_error) {
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
try {
  useTranslation.displayName = "useTranslation";
  useTranslation.__docgenInfo = { "description": "Returns a translation function to localize package components.", "displayName": "useTranslation", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
export {
  useTranslation as u
};
