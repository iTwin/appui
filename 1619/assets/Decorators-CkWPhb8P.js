import { a as __toESM, n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { pn as UiComponents, t as init_components_react } from "./components-react-2-ltnsUD.js";
import { Vt as Logger, X as init_core_bentley } from "./Key.enum-CqsoxW_A.js";
import { Nn as init_core_frontend, Wn as IModelApp, b as Provider_default, hr as init_core_common, ht as StateManager, lt as UiFramework, t as init_appui_react, wr as EmptyLocalization, x as init_react_redux, yt as ThemeManager } from "./appui-react-p-O3mm3j.js";
//#endregion
//#region ../../ui/imodel-components-react/src/imodel-components-react/UiIModelComponents.ts
var UiIModelComponents;
function init_UiIModelComponents() {
	return (init_UiIModelComponents = __esmMin((() => {
		init_core_bentley();
		init_core_frontend();
		init_components_react();
		init_core_common();
		UiIModelComponents = class UiIModelComponents {
			static _initialized = false;
			/**
			* initialize UiIModelComponents.
			*/
			static async initialize() {
				if (UiIModelComponents._initialized) {
					Logger.logInfo(UiIModelComponents.loggerCategory("UiIModelComponents"), `UiIModelComponents.initialize already called`);
					return;
				}
				await IModelApp.localization?.registerNamespace(UiIModelComponents.localizationNamespace);
				if (!IModelApp.localization) {
					const localization = new EmptyLocalization();
					await localization.initialize();
					await UiComponents.initialize(localization);
				} else await UiComponents.initialize(IModelApp.localization);
				UiIModelComponents._initialized = true;
			}
			/** Unregisters the UiIModelComponents localization namespace */
			static terminate() {
				IModelApp.localization?.unregisterNamespace(UiIModelComponents.localizationNamespace);
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
					Logger.logError(UiIModelComponents.loggerCategory("UiIModelComponents"), `translate: IModelApp.localization has not been setup. Returning blank string.`);
					return "";
				}
				return IModelApp.localization.getLocalizedString(`${UiIModelComponents.localizationNamespace}:${String(key)}`);
			}
			/** @internal */
			static loggerCategory(name) {
				return `${UiIModelComponents.packageName}.${name}`;
			}
		};
	})))();
}
//#endregion
//#region src/Decorators.tsx
var import_react, import_jsx_runtime, AppUiDecorator, InitializerDecorator;
function init_Decorators() {
	return (init_Decorators = __esmMin((() => {
		import_react = /* @__PURE__ */ __toESM(require_react(), 1);
		init_react_redux();
		init_appui_react();
		init_core_frontend();
		init_UiIModelComponents();
		import_jsx_runtime = require_jsx_runtime();
		AppUiDecorator = (Story) => {
			new StateManager();
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider_default, {
				store: StateManager.store,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeManager, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}) })
			});
		};
		InitializerDecorator = (Story) => {
			const [initialized, setInitialized] = import_react.useState(false);
			import_react.useEffect(() => {
				let ignore = false;
				(async () => {
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
			if (!initialized) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Initializing..." });
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {});
		};
		AppUiDecorator.__docgenInfo = {
			"description": "",
			"methods": [],
			"displayName": "AppUiDecorator"
		};
		InitializerDecorator.__docgenInfo = {
			"description": "",
			"methods": [],
			"displayName": "InitializerDecorator"
		};
	})))();
}
//#endregion
export { init_UiIModelComponents as a, UiIModelComponents as i, InitializerDecorator as n, init_Decorators as r, AppUiDecorator as t };
