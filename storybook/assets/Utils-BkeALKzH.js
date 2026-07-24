import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { $t as StagePanelLocation, M as FrontstageUtilities, Nt as StageUsage, Zt as StagePanelSection, q as StandardContentLayouts, t as init_appui_react } from "./appui-react-CpKk3CrH.js";
import { Vr as init_esm, Wi as SvgPlaceholder } from "./components-react-DigDa1CF.js";
//#region src/Utils.tsx
function createFrontstage(overrides) {
	const { content, contentProps, contentManipulation, layout, toolSettings, ...rest } = overrides ?? {};
	const config = FrontstageUtilities.createStandardFrontstage({
		id: "main-frontstage",
		usage: StageUsage.Private,
		version: Math.random(),
		contentGroupProps: {
			id: "ContentGroup",
			layout: StandardContentLayouts.singleView,
			contents: [{
				id: "Content",
				classId: "",
				content: content ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: {
						display: "flex",
						height: "100%",
						justifyContent: "center",
						alignItems: "center"
					},
					children: "Content"
				}),
				...contentProps
			}]
		},
		hideStatusBar: true,
		hideToolSettings: true,
		hideNavigationAid: true,
		...rest
	});
	return {
		...config,
		layout,
		contentManipulation: contentManipulation ?? config.contentManipulation,
		toolSettings: toolSettings ?? config.toolSettings
	};
}
function removeProperty() {
	return { table: { disable: true } };
}
function enumArgType(_enum) {
	return {
		options: Object.values(_enum).filter((value) => typeof value === "number"),
		control: {
			type: "select",
			labels: _enum
		}
	};
}
function unionArgType(options) {
	return {
		control: { type: "inline-radio" },
		options
	};
}
function createWidget(id, overrides) {
	return {
		id: `w${id}`,
		label: `Widget ${id}`,
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Widget ",
			id,
			" content"
		] }),
		iconNode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}),
		layouts: { standard: {
			location: StagePanelLocation.Left,
			section: StagePanelSection.Start
		} },
		...overrides
	};
}
var import_jsx_runtime;
var init_Utils = __esmMin((() => {
	init_appui_react();
	init_esm();
	import_jsx_runtime = require_jsx_runtime();
}));
//#endregion
export { removeProperty as a, init_Utils as i, createWidget as n, unionArgType as o, enumArgType as r, createFrontstage as t };
