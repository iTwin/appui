import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { gt as useConditionalProp, ht as init_useConditionalProp } from "./appui-react-CpKk3CrH.js";
import { o as UiError, r as init_appui_abstract } from "./Key.enum-DhBIjxOv.js";
import { Ss as Icon, Vr as init_esm, Wi as SvgPlaceholder, bn as init_core_react, sr as WebFontIcon, ws as ConditionalIconItem } from "./components-react-DigDa1CF.js";
import { n as InitializerDecorator, r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
import { n as init_UiComponents, t as UiComponents } from "./UiComponents-BSPOVzr_.js";
import { n as init_createBumpEvent, t as createBumpEvent } from "./createBumpEvent-DV-wBqFK.js";
//#region assets/placeholder.svg
var placeholder_default;
var init_placeholder = __esmMin((() => {
	placeholder_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20enable-background='new%200%200%2016%2016'%3e%3cpath%20d='M1,1v14h14V1H1z%20M14,2.7v10.6L8.7,8L14,2.7z%20M8,7.3L2.7,2h10.6L8,7.3z%20M7.3,8L2,13.3V2.7L7.3,8z%20M8,8.7l5.3,5.3H2.7L8,8.7z'/%3e%3c/svg%3e";
})), import_jsx_runtime$1, ImageRenderer;
var init_ImageRenderer = __esmMin((() => {
	require_react();
	init_core_react();
	init_UiComponents();
	init_appui_abstract();
	import_jsx_runtime$1 = require_jsx_runtime();
	ImageRenderer = class ImageRenderer {
		static _svgCache = /* @__PURE__ */ new Map();
		hexToBase64(hexstring) {
			const match = hexstring.match(/\w{2}/g);
			if (!match) return "";
			return window.btoa(match.map((a) => {
				return String.fromCharCode(parseInt(a, 16));
			}).join(""));
		}
		/** Render raw binary image */
		renderBinary(data, format) {
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
				src: `data:image/${format};base64,${this.hexToBase64(data)}`,
				alt: ""
			});
		}
		isSvg(input) {
			const doc = new DOMParser().parseFromString(input, "application/xml");
			if (doc.querySelector("parsererror")) return false;
			return "svg" === doc.documentElement.nodeName.toLowerCase();
		}
		convertSvgToDataUri(svg) {
			if (!this.isSvg(svg)) return "";
			return `data:image/svg+xml;base64,${window.btoa(svg)}`;
		}
		/** Render svg string into JSX */
		renderSvg(svg) {
			let svgAsDataUri = ImageRenderer._svgCache.get(svg);
			if (void 0 === svgAsDataUri) {
				svgAsDataUri = this.convertSvgToDataUri(svg.trim());
				ImageRenderer._svgCache.set(svg, svgAsDataUri);
			}
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Icon, { iconSpec: svgAsDataUri }) });
		}
		/** Render image from an url */
		renderUrl(url) {
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
				src: url,
				alt: ""
			});
		}
		/** Render image as core-react icon */
		renderCoreIcon(iconName) {
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WebFontIcon, { iconName });
		}
		/** Replaces the escaped instances of "\:" with ":" */
		normalizeEscapedIconString(escapedIconString) {
			return escapedIconString.replace(/\\:/g, ":");
		}
		/**
		* Extract class and name from icon name, if the name follows format "{className}:{fontName}".
		* className and fontName can be escaped using \ if : is needed.
		*/
		extractIconClassAndName(iconName) {
			const matches = iconName.match(/(\\.|[^:])+/g);
			if (!matches || matches.length !== 2) return {
				iconClassName: void 0,
				iconName
			};
			return {
				iconClassName: this.normalizeEscapedIconString(matches[0]),
				iconName: this.normalizeEscapedIconString(matches[1])
			};
		}
		/**
		* Render image as provided webfont icon.
		* Defaults to core-react icon if iconName does not contain className.
		*/
		renderWebfontIcon(iconName) {
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WebFontIcon, { ...this.extractIconClassAndName(iconName) });
		}
		/** Render image from data provided by an image loader */
		render(loadedImage) {
			switch (loadedImage.sourceType) {
				case "binary":
					const image = loadedImage;
					return this.renderBinary(image.value, image.fileFormat);
				case "url": return this.renderUrl(loadedImage.value);
				case "svg": return this.renderSvg(loadedImage.value);
				case "core-icon": return this.renderCoreIcon(loadedImage.value);
				case "webfont-icon": return this.renderWebfontIcon(loadedImage.value);
				default:
					const unhandledSourceType = loadedImage.sourceType;
					throw new UiError(UiComponents.loggerCategory("ImageRenderer"), `Can't handle sourceType: "${String(unhandledSourceType)}"`);
			}
		}
	};
}));
//#endregion
//#region src/deprecated/Icon.stories.tsx
function ConditionalIcon({ iconSpec, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		iconSpec: useConditionalProp(iconSpec),
		...props
	});
}
var import_react, import_jsx_runtime, meta, getVal, bump, eventId, ToggleConditionals, CSSIcon, ReactNode, SVGPath, DataURI, ConditionalCSSIcon, __namedExportsOrder;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_placeholder();
	init_useConditionalProp();
	init_ImageRenderer();
	init_core_react();
	init_esm();
	init_Decorators();
	init_createBumpEvent();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Deprecated/Icon",
		component: Icon,
		tags: ["autodocs"],
		decorators: [AppUiDecorator, InitializerDecorator]
	};
	({getVal, bump, eventId} = createBumpEvent());
	ToggleConditionals = (Story) => {
		import_react.useEffect(() => {
			const id = setInterval(() => {
				bump();
			}, 2e3);
			return () => {
				clearInterval(id);
			};
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {});
	};
	CSSIcon = { args: { iconSpec: "icon-placeholder" } };
	ReactNode = { args: { iconSpec: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlaceholder, {}) } };
	SVGPath = { args: { iconSpec: placeholder_default } };
	DataURI = { render: () => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: new ImageRenderer().render({
			sourceType: "svg",
			value: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M13,13H9V10h4ZM16,3V15a1,1,0,0,1-1,1H1a1,1,0,0,1-1-1V3A1,1,0,0,1,1,2H3V0H4V2h8V0h1V2h2A1,1,0,0,1,16,3ZM15,6H1v9H15Z" />
          </svg>`
		}) });
	} };
	ConditionalCSSIcon = {
		args: { iconSpec: new ConditionalIconItem(() => getVal() % 2 === 0 ? "icon-app-1" : "icon-app-2", [eventId]) },
		render: (args) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionalIcon, { ...args });
		},
		decorators: [ToggleConditionals]
	};
	CSSIcon.parameters = {
		...CSSIcon.parameters,
		docs: {
			...CSSIcon.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    iconSpec: \"icon-placeholder\"\n  }\n}",
				...CSSIcon.parameters?.docs?.source
			}
		}
	};
	ReactNode.parameters = {
		...ReactNode.parameters,
		docs: {
			...ReactNode.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    iconSpec: <SvgPlaceholder />\n  }\n}",
				...ReactNode.parameters?.docs?.source
			}
		}
	};
	SVGPath.parameters = {
		...SVGPath.parameters,
		docs: {
			...SVGPath.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    iconSpec: placeholderSvg\n  }\n}",
				...SVGPath.parameters?.docs?.source
			}
		}
	};
	DataURI.parameters = {
		...DataURI.parameters,
		docs: {
			...DataURI.parameters?.docs,
			source: {
				originalSource: "{\n  render: () => {\n    const renderer = new ImageRenderer();\n    const img = renderer.render({\n      sourceType: \"svg\",\n      value: `<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n            <path d=\"M13,13H9V10h4ZM16,3V15a1,1,0,0,1-1,1H1a1,1,0,0,1-1-1V3A1,1,0,0,1,1,2H3V0H4V2h8V0h1V2h2A1,1,0,0,1,16,3ZM15,6H1v9H15Z\" />\n          </svg>`\n    });\n    return <>{img}</>;\n  }\n}",
				...DataURI.parameters?.docs?.source
			}
		}
	};
	ConditionalCSSIcon.parameters = {
		...ConditionalCSSIcon.parameters,
		docs: {
			...ConditionalCSSIcon.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    iconSpec: new ConditionalIconItem(() => getVal() % 2 === 0 ? \"icon-app-1\" : \"icon-app-2\", [eventId])\n  },\n  render: args => {\n    return <ConditionalIcon {...args} />;\n  },\n  decorators: [ToggleConditionals]\n}",
				...ConditionalCSSIcon.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"CSSIcon",
		"ReactNode",
		"SVGPath",
		"DataURI",
		"ConditionalCSSIcon"
	];
}))();
export { CSSIcon, ConditionalCSSIcon, DataURI, ReactNode, SVGPath, __namedExportsOrder, meta as default };
