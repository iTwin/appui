import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { An as IModelApp, _t as ThemeManager, b as Provider_default, er as init_core_common, lr as EmptyLocalization, pt as StateManager, st as UiFramework, t as init_appui_react, x as init_react_redux, xn as init_core_frontend } from "./appui-react-CpKk3CrH.js";
import { X as init_core_bentley, xn as Logger } from "./Key.enum-DhBIjxOv.js";
import { t as init_components_react, vn as UiComponents } from "./components-react-DigDa1CF.js";
//#region lib/webfont/bentley-icons-generic-webfont.css
var init_bentley_icons_generic_webfont = __esmMin((() => {}));
//#endregion
//#region ../../ui/imodel-components-react/src/imodel-components-react/UiIModelComponents.ts
var UiIModelComponents;
var init_UiIModelComponents = __esmMin((() => {
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
}));
//#endregion
//#region src/Decorators.tsx
var import_react, import_jsx_runtime, AppUiDecorator, InitializerDecorator;
var init_Decorators = __esmMin((() => {
	init_bentley_icons_generic_webfont();
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
}));
//#endregion
export { init_UiIModelComponents as a, UiIModelComponents as i, InitializerDecorator as n, init_Decorators as r, AppUiDecorator as t };
