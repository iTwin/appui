import { a as __exportAll, i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { n as init_UiCore$1, t as UiCore } from "./UiCore-DVj5LZGU.js";
//#region ../../ui/core-react/src/core-react/UiCore.json
var UiCore_exports = /* @__PURE__ */ __exportAll({
	default: () => UiCore_default,
	dialog: () => dialog,
	elementSeparator: () => elementSeparator,
	form: () => form,
	general: () => general,
	reactselect: () => reactselect,
	tree: () => tree
});
var form, general, dialog, reactselect, tree, elementSeparator, UiCore_default;
var init_UiCore = __esmMin((() => {
	form = {
		"submitButtonLabel": "Submit",
		"errorPrefix": "Error:",
		"errorSuffix": "Please review input and try again."
	};
	general = {
		"search": "Search",
		"clear": "Clear"
	};
	dialog = {
		"ok": "OK",
		"retry": "Retry",
		"yes": "Yes",
		"no": "No",
		"cancel": "Cancel",
		"close": "Close",
		"next": "Next",
		"previous": "Previous"
	};
	reactselect = { "noSelectOption": "Option not found" };
	tree = {
		"expand": "Expand",
		"collapse": "Collapse"
	};
	elementSeparator = { "label": "Resizer" };
	UiCore_default = {
		form,
		general,
		dialog,
		reactselect,
		tree,
		elementSeparator
	};
}));
//#endregion
//#region ../../ui/core-react/src/core-react/l10n/LocalizationProvider.tsx
/** Provides localization capability to the components.
* @alpha
* @deprecated in 4.16.0. Use {@link @itwin/components-react#LocalizationProvider} instead.
*/
function LocalizationProvider(props) {
	const { children, localization } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalizationContext.Provider, {
		value: localization,
		children
	});
}
/** Returns localization context.
* @internal
*/
function useLocalization() {
	return import_react$2.useContext(LocalizationContext);
}
var import_react$2, import_jsx_runtime, LocalizationContext;
var init_LocalizationProvider = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_jsx_runtime = require_jsx_runtime();
	LocalizationContext = import_react$2.createContext(void 0);
	LocalizationProvider.__docgenInfo = {
		"description": "Provides localization capability to the components.\n@alpha\n@deprecated in 4.16.0. Use {@link @itwin/components-react#LocalizationProvider} instead.",
		"methods": [],
		"displayName": "LocalizationProvider",
		"props": {
			"children": {
				"required": false,
				"tsType": {
					"name": "ReactReactNode",
					"raw": "React.ReactNode"
				},
				"description": ""
			},
			"localization": {
				"required": true,
				"tsType": {
					"name": "Pick",
					"elements": [{ "name": "CoreLocalization" }, {
						"name": "union",
						"raw": "\"getLocalizedString\" | \"registerNamespace\"",
						"elements": [{
							"name": "literal",
							"value": "\"getLocalizedString\""
						}, {
							"name": "literal",
							"value": "\"registerNamespace\""
						}]
					}],
					"raw": "Pick<\n  CoreLocalization,\n  \"getLocalizedString\" | \"registerNamespace\"\n>"
				},
				"description": ""
			}
		}
	};
}));
//#endregion
//#region ../../ui/core-react/src/core-react/l10n/usePackageTranslation.tsx
/** Used by AppUI packages internally to define package specific `useTranslation` hook.
* Uses a localization provider to translate the provided key with a specified namespace. Multiple fallback layers are used to resolve the translation:
* - Return value of a specified `fallback` function.
* - Default value looked up from a specified `defaults` object.
* - Lastly `key` argument of the translation function is returned.
* @internal
*/
function usePackageTranslation({ namespace, fallback, defaults }) {
	const localization = useLocalization();
	const [registered, setRegistered] = import_react$1.useState(false);
	import_react$1.useEffect(() => {
		if (!localization) return;
		let ignore = false;
		setRegistered(false);
		(async () => {
			await localization.registerNamespace(namespace);
			if (ignore) return;
			setRegistered(true);
		})();
		return () => {
			ignore = true;
		};
	}, [localization, namespace]);
	return { translate: import_react$1.useCallback((key) => {
		if (localization && registered) return localization.getLocalizedString(`${namespace}:${key}`);
		const fallbackTranslation = fallback(key);
		if (fallbackTranslation !== void 0) return fallbackTranslation;
		return getDefaultValue(defaults, key) ?? key;
	}, [
		localization,
		namespace,
		fallback,
		defaults,
		registered
	]) };
}
function getDefaultValue(defaults, propertyKey) {
	const keys = propertyKey.split(".");
	let prop = defaults;
	for (const key of keys) {
		if (!(key in prop)) {
			prop = void 0;
			break;
		}
		prop = prop[key];
	}
	if (typeof prop !== "string") return;
	return prop;
}
var import_react$1;
var init_usePackageTranslation = __esmMin((() => {
	import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_LocalizationProvider();
}));
//#endregion
//#region ../../ui/core-react/src/core-react/l10n/useTranslation.tsx
/** Returns a translation function to localize package components.
* @internal
*/
function useTranslation() {
	const fallback = import_react.useCallback((key) => {
		if (!UiCore.initialized) return;
		return UiCore.translate(key);
	}, []);
	return usePackageTranslation({
		namespace: UiCore.localizationNamespace,
		fallback,
		defaults: UiCore_exports
	});
}
var import_react;
var init_useTranslation = __esmMin((() => {
	init_UiCore();
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_UiCore$1();
	init_usePackageTranslation();
}));
//#endregion
export { useTranslation as n, init_useTranslation as t };
