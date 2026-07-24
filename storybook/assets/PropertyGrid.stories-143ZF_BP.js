import { a as __exportAll, i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Dt as IconButton, Ft as ButtonGroup, i as init_esm, qt as require_classnames } from "./iframe-DrBiZGmV.js";
import { Cn as BentleyError, I as PropertyValueFormat, P as PropertyRecord, R as StandardTypeNames, X as init_core_bentley, r as init_appui_abstract, wn as BentleyStatus } from "./Key.enum-DhBIjxOv.js";
import { Gt as init_internal, K as PropertyDataChangeEvent, Os as UnderlinedButton, R as VirtualizedPropertyGridWithDataProvider, Sr as usePackageTranslation, Vr as init_esm$1, _r as Orientation$1, an as init_esm5, bi as SvgSelection, bn as init_core_react, cn as Orientation$2, dn as init_linkify_it, fo as SvgCopy, nt as PropertyValueRendererManager, on as from, t as init_components_react, un as LinkifyIt } from "./components-react-DigDa1CF.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
import { n as init_UiComponents$1, t as UiComponents } from "./UiComponents-BSPOVzr_.js";
//#region ../../ui/components-react/src/components-react/common/UseAsyncValue.tsx
/**
* Custom hook for working with possibly async values.
* @public
*/
function useAsyncValue(value) {
	const [result, setResult] = import_react$6.useState(() => {
		if (isPromiseLike(value)) return;
		return value;
	});
	import_react$6.useEffect(() => {
		if (isPromiseLike(value)) {
			const subscription = from(value).subscribe({ next: (resolvedValue) => setResult(resolvedValue) });
			return () => subscription.unsubscribe();
		}
		setResult(value);
	}, [value]);
	return result;
}
/** Checks if the specified argument is a promise
* @internal
*/
function isPromiseLike(obj) {
	return typeof obj === "object" && typeof obj.then === "function";
}
var import_react$6;
var init_UseAsyncValue = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_esm5();
}));
//#endregion
//#region ../../ui/components-react/src/components-react/common/Links.ts
var linkify, matchLinks, openLink;
var init_Links = __esmMin((() => {
	init_linkify_it();
	linkify = new LinkifyIt({ fuzzyLink: false });
	linkify.add("pw:", { validate: (text, pos, self) => {
		const tail = text.slice(pos);
		if (!self.re.pw) self.re.pw = new RegExp(`(//|\\\\\\\\)${self.re.src_host}:([a-zA-Z0-9-._~!$&'()*+,;=@%{}]+/)+[a-zA-Z0-9-._~!$&'()*+,;=@%{}]*`, "i");
		if (self.re.pw.test(tail)) {
			const matches = tail.match(self.re.pw);
			if (matches !== null) return matches[0].length;
		}
		return 0;
	} }).add("www.", {
		validate: (text, pos, self) => {
			const tail = text.slice(pos);
			if (!self.re.www) self.re.www = new RegExp(`^${self.re.src_auth}${self.re.src_host_port_strict}${self.re.src_path}`, "i");
			if (self.re.www.test(tail)) {
				const matches = tail.match(self.re.www);
				if (matches !== null) return matches[0].length;
			}
			return 0;
		},
		normalize: (match) => {
			match.schema = "http:";
			match.url = `http://${match.url}`;
		}
	});
	matchLinks = (text) => {
		const head = text.slice(0, 5);
		if (head === "pw://" || head === "pw:\\\\") return Array({
			index: 0,
			lastIndex: text.length,
			schema: "pw:",
			url: text
		});
		const matches = linkify.match(text);
		return matches ? matches : [];
	};
	openLink = (url) => {
		if (url.startsWith("mailto:")) {
			location.href = url;
			return;
		}
		const openAndFocus = (link) => {
			window.open(link, "_blank")?.focus();
		};
		if (url.startsWith("pw:")) {
			openAndFocus(url.replace(/pw:\/\/|pw:\\\\/g, "pw:"));
			return;
		}
		openAndFocus(url);
	};
}));
//#endregion
//#region ../../ui/components-react/src/components-react/common/Orientation.ts
var Orientation;
var init_Orientation = __esmMin((() => {
	init_core_react();
	Orientation = Orientation$1;
}));
//#endregion
//#region ../../ui/components-react/src/components-react/propertygrid/component/PropertyGridCommons.ts
var PropertyGridCommons;
var init_PropertyGridCommons = __esmMin((() => {
	init_Links();
	init_Orientation();
	PropertyGridCommons = class {
		static getCurrentOrientation(width, preferredOrientation, isOrientationFixed, horizontalOrientationMinWidth) {
			const orientation = preferredOrientation ?? Orientation.Horizontal;
			if (isOrientationFixed) return orientation;
			horizontalOrientationMinWidth = horizontalOrientationMinWidth ?? 300;
			if (width < horizontalOrientationMinWidth) return Orientation.Vertical;
			return orientation;
		}
		/**
		* Helper method to handle link clicks
		* @internal
		*/
		static handleLinkClick(text) {
			const linksArray = matchLinks(text);
			if (linksArray.length <= 0) return;
			const foundLink = linksArray[0];
			if (!foundLink || !foundLink.url) return;
			openLink(foundLink.url);
		}
		/**
		* A helper method to get links from string.
		* @internal
		*/
		static getLinks = (value) => {
			return matchLinks(value).map((linkInfo) => {
				return {
					start: linkInfo.index,
					end: linkInfo.lastIndex
				};
			});
		};
	};
}));
//#endregion
//#region ../../ui/components-react/src/components-react/properties/LinkHandler.tsx
/** Render a single anchor tag */
function renderTag(text, links, highlight) {
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(UnderlinedButton, {
		onClick: (e) => {
			e.preventDefault();
			e.stopPropagation();
			links.onClick(text);
		},
		children: highlight ? highlight(text) : text
	});
}
function matchComparison(matchA, matchB) {
	if (matchA.start > matchB.start) return 1;
	if (matchB.start > matchA.start) return -1;
	return 0;
}
function renderTextPart(text, highlight) {
	return highlight ? highlight(text) : text;
}
function renderText(text, links, highlight) {
	const { matcher } = links;
	if (!matcher) return renderTag(text, links, highlight);
	const matches = matcher(text);
	matches.sort(matchComparison);
	const parts = [];
	let lastIndex = 0;
	for (const match of matches) {
		if (lastIndex > match.start) throw new BentleyError(BentleyStatus.ERROR, "renderText: matcher returned overlapping matches");
		if (lastIndex < match.start) parts.push(renderTextPart(text.substring(lastIndex, match.start), highlight));
		const anchorText = text.substring(match.start, match.end);
		parts.push(renderTag(anchorText, links, highlight));
		lastIndex = match.end;
	}
	if (text.length > lastIndex) parts.push(renderTextPart(text.substring(lastIndex), highlight));
	return parts.map((part, index) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(import_react$5.Fragment, { children: part }, index));
}
function renderHighlighted(text, highlight) {
	return highlight(text);
}
/**
* React component for rendering string with links.
* @public
*/
function LinksRenderer(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(import_jsx_runtime$4.Fragment, { children: withLinks(props.value, props.links, props.highlighter) });
}
var import_react$5, import_jsx_runtime$4, renderLinks, withLinks;
var init_LinkHandler = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_core_bentley();
	init_core_react();
	import_jsx_runtime$4 = require_jsx_runtime();
	renderLinks = (text, links, highlight) => {
		return renderText(text, links, highlight);
	};
	withLinks = (stringValue, links, highlight) => {
		if (links) return renderLinks(stringValue, links, highlight);
		if (highlight) return renderHighlighted(stringValue, highlight);
		return stringValue;
	};
	renderLinks.__docgenInfo = {
		"description": "Renders anchor tag by wrapping or splitting provided text\n@public",
		"methods": [],
		"displayName": "renderLinks"
	};
	withLinks.__docgenInfo = {
		"description": "If record has links, wraps stringValue in them, otherwise returns unchanged stringValue\nOptionally it can highlight text\n@public",
		"methods": [],
		"displayName": "withLinks"
	};
	LinksRenderer.__docgenInfo = {
		"description": "React component for rendering string with links.\n@public",
		"methods": [],
		"displayName": "LinksRenderer",
		"props": {
			"value": {
				"required": true,
				"tsType": { "name": "string" },
				"description": ""
			},
			"links": {
				"required": false,
				"tsType": { "name": "LinkElementsInfo" },
				"description": ""
			},
			"highlighter": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(text: string) => React.ReactNode",
					"signature": {
						"arguments": [{
							"type": { "name": "string" },
							"name": "text"
						}],
						"return": {
							"name": "ReactReactNode",
							"raw": "React.ReactNode"
						}
					}
				},
				"description": ""
			}
		}
	};
}));
//#endregion
//#region ../../ui/components-react/src/components-react/converters/TypeConverter.ts
var TypeConverter;
var init_TypeConverter = __esmMin((() => {
	init_appui_abstract();
	TypeConverter = class {
		/** Converts a primitive value to a string */
		convertToString(value) {
			if (value === void 0) return "";
			return value.toString();
		}
		/** Default implementation just calls convertToString with no options */
		convertToStringWithOptions(value, _options) {
			return this.convertToString(value);
		}
		/** Converts a string to a primitive value */
		convertFromString(_value) {}
		/** Default implementation just calls convertFromString with no options */
		convertFromStringWithOptions(value, _options) {
			return this.convertFromString(value);
		}
		/** Converts a value associated with a property description to a string */
		convertPropertyToString(propertyDescription, value) {
			return this.convertToStringWithOptions(value, propertyDescription.converter?.options);
		}
		/** Converts a string with a property record to a property value */
		async convertFromStringToPropertyValue(value, propertyRecord) {
			const converterOptions = propertyRecord && propertyRecord.property.converter ? propertyRecord.property.converter.options : void 0;
			const stringValue = await this.convertFromStringWithOptions(value, converterOptions);
			return {
				valueFormat: PropertyValueFormat.Primitive,
				value: stringValue,
				displayValue: ""
			};
		}
		/** Determines if two primitive values are equal */
		isEqualTo(valueA, valueB) {
			return valueA === valueB;
		}
		/** Determines if two primitive values are not equal */
		isNotEqualTo(valueA, valueB) {
			return valueA !== valueB;
		}
		/** Determines if a primitive value is null or undefined */
		isNull(value) {
			return value === null || value === void 0;
		}
		/** Determines if a primitive value is not null or not undefined */
		isNotNull(value) {
			return value !== null && value !== void 0;
		}
		/** Determines if the converter is for a string type */
		get isStringType() {
			return false;
		}
		/** Determines if the converter is for a numeric type */
		get isLessGreaterType() {
			return false;
		}
		/** Determines if the converter is for a boolean type */
		get isBooleanType() {
			return false;
		}
		/** Determines if the converter is for a nullable type */
		get isNullableType() {
			return true;
		}
	};
}));
//#endregion
//#region ../../ui/components-react/src/components-react/converters/StringTypeConverter.ts
var StringTypeConverter;
var init_StringTypeConverter = __esmMin((() => {
	init_TypeConverter();
	StringTypeConverter = class extends TypeConverter {
		convertToString(value) {
			return value ? value.toString() : "";
		}
		convertFromString(value) {
			return value;
		}
		sortCompare(valueA, valueB, ignoreCase) {
			if (!this.checkArgTypes(valueA, valueB)) return 0;
			if (ignoreCase) return valueA.toLocaleLowerCase().localeCompare(valueB.toLocaleLowerCase());
			else return valueA.localeCompare(valueB);
		}
		get isStringType() {
			return true;
		}
		startsWith(valueA, valueB, caseSensitive) {
			if (!valueA || !valueB || !this.checkArgTypes(valueA, valueB)) return false;
			if (caseSensitive) return valueA.substring(0, valueB.length) === valueB;
			return valueA.toLocaleUpperCase().substring(0, valueB.length) === valueB.toLocaleUpperCase();
		}
		endsWith(valueA, valueB, caseSensitive) {
			if (!valueA || !valueB || !this.checkArgTypes(valueA, valueB)) return false;
			const position = valueA.length - valueB.length;
			if (position < 0) return false;
			let lastIndex;
			if (caseSensitive) lastIndex = valueA.indexOf(valueB, position);
			else lastIndex = valueA.toLocaleUpperCase().indexOf(valueB.toLocaleUpperCase(), position);
			return lastIndex !== -1 && lastIndex === position;
		}
		contains(valueA, valueB, caseSensitive) {
			if (!valueA || !valueB || !this.checkArgTypes(valueA, valueB)) return false;
			if (valueB.length > valueA.length) return false;
			if (caseSensitive) return valueA.indexOf(valueB, 0) !== -1;
			return valueA.toLocaleUpperCase().indexOf(valueB.toLocaleUpperCase(), 0) !== -1;
		}
		doesNotContain(valueA, valueB, caseSensitive) {
			return !this.contains(valueA, valueB, caseSensitive);
		}
		isContainedIn(valueA, valueB, caseSensitive) {
			return this.contains(valueB, valueA, caseSensitive);
		}
		isNotContainedIn(valueA, valueB, caseSensitive) {
			return this.doesNotContain(valueB, valueA, caseSensitive);
		}
		isEmpty(valueA) {
			if (!this.checkArgTypes(valueA)) return true;
			return valueA.length === 0;
		}
		isNotEmpty(valueA) {
			return !this.isEmpty(valueA);
		}
		checkArgTypes(valueA, valueB) {
			if (typeof valueA !== "string") return false;
			if (valueB && typeof valueB !== "string") return false;
			return true;
		}
	};
}));
//#endregion
//#region ../../ui/components-react/src/components-react/converters/TypeConverterManager.ts
var TypeConverterManager;
var init_TypeConverterManager = __esmMin((() => {
	init_StringTypeConverter();
	TypeConverterManager = class TypeConverterManager {
		static _converters = {};
		static _defaultTypeConverter;
		static getFullConverterName(typename, converterName) {
			let fullConverterName = typename;
			if (converterName) fullConverterName += `:${converterName}`;
			return fullConverterName;
		}
		static registerConverter(typename, converter, converterName) {
			const fullConverterName = TypeConverterManager.getFullConverterName(typename, converterName);
			if (TypeConverterManager._converters.hasOwnProperty(fullConverterName)) {
				const nameOfConverter = TypeConverterManager._converters[fullConverterName].constructor.name;
				throw Error(`TypeConverterManager.registerConverter error: type '${typename}' already registered to '${nameOfConverter}'`);
			}
			const instance = new converter();
			TypeConverterManager._converters[fullConverterName] = instance;
		}
		static unregisterConverter(typename, converterName) {
			const fullConverterName = TypeConverterManager.getFullConverterName(typename, converterName);
			if (TypeConverterManager._converters.hasOwnProperty(fullConverterName)) delete TypeConverterManager._converters[fullConverterName];
		}
		static getConverter(typename, converterName) {
			const fullConverterName = TypeConverterManager.getFullConverterName(typename, converterName);
			if (TypeConverterManager._converters.hasOwnProperty(fullConverterName)) return TypeConverterManager._converters[fullConverterName];
			if (!TypeConverterManager._defaultTypeConverter) TypeConverterManager._defaultTypeConverter = new StringTypeConverter();
			return TypeConverterManager._defaultTypeConverter;
		}
	};
}));
//#endregion
//#region ../../ui/components-react/src/components-react/properties/renderers/value/Common.ts
/** @internal */
function convertRecordToString(record) {
	const primitive = record.value;
	return primitive.displayValue || TypeConverterManager.getConverter(record.property.typename, record.property.converter?.name).convertPropertyToString(record.property, primitive.value);
}
var init_Common = __esmMin((() => {
	init_TypeConverterManager();
}));
//#endregion
//#region ../../ui/components-react/src/components-react/properties/renderers/value/PrimitivePropertyValueRenderer.tsx
/** @internal */
function PrimitivePropertyValueRendererImpl(props) {
	const { stringValue, element } = useRenderedStringValue(props.record, props.stringValueCalculator, props.context, props.linksHandler);
	return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
		style: props.context?.style,
		title: stringValue,
		children: element
	});
}
/** @internal */
function useRenderedStringValue(record, stringValueCalculator, context, linksHandler) {
	const stringValue = useAsyncValue(stringValueCalculator(record));
	return {
		stringValue,
		element: stringValue === void 0 ? context?.defaultValue : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(LinksRenderer, {
			value: stringValue,
			links: record.links ?? linksHandler ?? DEFAULT_LINKS_HANDLER,
			highlighter: context?.textHighlighter
		})
	};
}
var import_jsx_runtime$3, DEFAULT_LINKS_HANDLER;
var init_PrimitivePropertyValueRenderer = __esmMin((() => {
	require_react();
	init_appui_abstract();
	init_UseAsyncValue();
	init_PropertyGridCommons();
	init_LinkHandler();
	init_Common();
	import_jsx_runtime$3 = require_jsx_runtime();
	DEFAULT_LINKS_HANDLER = {
		matcher: PropertyGridCommons.getLinks,
		onClick: PropertyGridCommons.handleLinkClick
	};
	PrimitivePropertyValueRendererImpl.__docgenInfo = {
		"description": "@internal",
		"methods": [],
		"displayName": "PrimitivePropertyValueRendererImpl",
		"props": {
			"record": {
				"required": true,
				"tsType": { "name": "PropertyRecord" },
				"description": ""
			},
			"stringValueCalculator": {
				"required": true,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(record: PropertyRecord) => string | Promise<string>",
					"signature": {
						"arguments": [{
							"type": { "name": "PropertyRecord" },
							"name": "record"
						}],
						"return": {
							"name": "union",
							"raw": "string | Promise<string>",
							"elements": [{ "name": "string" }, {
								"name": "Promise",
								"elements": [{ "name": "string" }],
								"raw": "Promise<string>"
							}]
						}
					}
				},
				"description": ""
			},
			"context": {
				"required": false,
				"tsType": { "name": "PropertyValueRendererContext" },
				"description": ""
			},
			"linksHandler": {
				"required": false,
				"tsType": { "name": "LinkElementsInfo" },
				"description": ""
			}
		}
	};
}));
//#endregion
//#region ../../ui/components-react/src/components-react/UiComponents.json
var UiComponents_exports = /* @__PURE__ */ __exportAll({
	breadcrumb: () => breadcrumb,
	button: () => button,
	datepicker: () => datepicker,
	days: () => days,
	default: () => UiComponents_default,
	dialog: () => dialog,
	editor: () => editor,
	filterBuilder: () => filterBuilder,
	filteringInput: () => filteringInput,
	general: () => general,
	month: () => month,
	property: () => property,
	showhide: () => showhide,
	table: () => table,
	time: () => time,
	timepicker: () => timepicker,
	toolbar: () => toolbar,
	tree: () => tree
});
var general, button, breadcrumb, tree, table, showhide, property, timepicker, datepicker, month, days, time, filteringInput, toolbar, editor, filterBuilder, dialog, UiComponents_default;
var init_UiComponents = __esmMin((() => {
	general = {
		"true": "True",
		"false": "False",
		"loading": "loading",
		"noData": "The data required for this tree layout is not available in this iModel.",
		"length": "Length",
		"label": "Label",
		"of": "of",
		"search": "Search",
		"clear": "Clear"
	};
	button = { "label": {
		"search": "Search",
		"cancel": "Cancel",
		"settings": "Settings",
		"filter": "Filter",
		"selectAll": "Select All"
	} };
	breadcrumb = {
		"invalidBreadcrumbPath": "Path not found.",
		"errorUnknownMode": "Error: Unknown Breadcrumb mode.",
		"name": "Name",
		"icon": "Icon",
		"description": "Description"
	};
	tree = { "noResultsForFilter": "0 matches found for \"{{searchText}}\"" };
	table = { "filter": {
		"numericTooltip": "Input Methods: Range (x-y), Greater Then (>x), Less Then (<y)",
		"numericPlaceholder": "e.g. 3,10-15,>20"
	} };
	showhide = {
		"noLabel": "[unlabeled]",
		"showAll": "Show all",
		"list": "List...",
		"title": "Show/Hide"
	};
	property = {
		"arrayLength": "Number of Items",
		"expand": "See more",
		"collapse": "See less"
	};
	timepicker = {
		"day-period-am": "AM",
		"day-period-pm": "PM"
	};
	datepicker = {
		"selectDate": "Select Date",
		"time": "Time",
		"previousMonth": "Previous Month",
		"nextMonth": "Next Month"
	};
	month = {
		"long": {
			"january": "January",
			"february": "February",
			"march": "March",
			"april": "April",
			"may": "May",
			"june": "June",
			"july": "July",
			"august": "August",
			"september": "September",
			"october": "October",
			"november": "November",
			"december": "December"
		},
		"short": {
			"january": "Jan",
			"february": "Feb",
			"march": "Mar",
			"april": "Apr",
			"may": "May",
			"june": "Jun",
			"july": "Jul",
			"august": "Aug",
			"september": "Sep",
			"october": "Oct",
			"november": "Nov",
			"december": "Dec"
		}
	};
	days = {
		"long": {
			"sunday": "Sunday",
			"monday": "Monday",
			"tuesday": "Tuesday",
			"wednesday": "Wednesday",
			"thursday": "Thursday",
			"friday": "Friday",
			"saturday": "Saturday"
		},
		"short": {
			"sunday": "Su",
			"monday": "Mo",
			"tuesday": "Tu",
			"wednesday": "We",
			"thursday": "Th",
			"friday": "Fr",
			"saturday": "Sa"
		}
	};
	time = {
		"am": "am",
		"pm": "pm"
	};
	filteringInput = { "placeholder": "Search..." };
	toolbar = { "overflow": "More toolbar items" };
	editor = {
		"enum": "Enum Editor",
		"text": "Text Editor",
		"textarea": "Textarea Editor"
	};
	filterBuilder = {
		"rule": "Rule",
		"ruleGroup": "Rule Group",
		"add": "Add",
		"delete": "Delete",
		"operators": {
			"isTrue": "Is true",
			"isFalse": "Is false",
			"equal": "Equal",
			"notEqual": "Not equal",
			"contains": "Contains",
			"isNull": "Is null",
			"isNotNull": "Is not null",
			"and": "And",
			"or": "Or",
			"between": "Between",
			"notBetween": "Not between"
		},
		"chooseProperty": "Choose property",
		"errorMessages": {
			"emptyValue": "Value is required",
			"invalidRange": "Invalid range"
		}
	};
	dialog = {
		"ok": "OK",
		"cancel": "Cancel"
	};
	UiComponents_default = {
		general,
		button,
		breadcrumb,
		tree,
		table,
		showhide,
		property,
		timepicker,
		datepicker,
		month,
		days,
		time,
		filteringInput,
		toolbar,
		editor,
		filterBuilder,
		dialog
	};
}));
//#endregion
//#region ../../ui/components-react/src/components-react/l10n/useTranslation.tsx
/** Returns a translation function.
* @internal
*/
function useTranslation() {
	const fallback = import_react$3.useCallback((key) => {
		if (!UiComponents.initialized) return;
		return UiComponents.translate(key);
	}, []);
	return usePackageTranslation({
		namespace: UiComponents.localizationNamespace,
		fallback,
		defaults: UiComponents_exports
	});
}
var import_react$3;
var init_useTranslation = __esmMin((() => {
	init_UiComponents();
	import_react$3 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_internal();
	init_UiComponents$1();
})), import_react$2, import_classnames, import_jsx_runtime$2, MultilineTextPropertyValueRenderer, MultilineTextPropertyValueRendererImpl, MultilineTextRenderer;
var init_MultilineTextPropertyValueRenderer = __esmMin((() => {
	require_react();
	import_react$2 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_core_bentley();
	init_appui_abstract();
	init_PrimitivePropertyValueRenderer();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	init_Common();
	init_useTranslation();
	import_jsx_runtime$2 = require_jsx_runtime();
	MultilineTextPropertyValueRenderer = class {
		canRender(record) {
			return record.value.valueFormat === PropertyValueFormat.Primitive;
		}
		render(record, context) {
			return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(MultilineTextPropertyValueRendererImpl, {
				record,
				context
			});
		}
	};
	MultilineTextPropertyValueRendererImpl = (props) => {
		const { stringValue, element } = useRenderedStringValue(props.record, convertRecordToString, props.context);
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(MultilineTextRenderer, {
			style: props.context?.style,
			stringValue,
			isExpanded: props.context?.isExpanded,
			onExpansionToggled: props.context?.onExpansionToggled,
			onHeightChanged: props.context?.onHeightChanged,
			children: element
		});
	};
	MultilineTextRenderer = (props) => {
		const { translate } = useTranslation();
		const spanRef = (0, import_react$2.useRef)(null);
		const divRef = (0, import_react$2.useRef)(null);
		const [contentOverflows, setContentOverflows] = (0, import_react$2.useState)(false);
		(0, import_react$2.useLayoutEffect)(() => {
			divRef.current !== null && spanRef.current;
			setContentOverflows(spanRef.current.clientWidth < spanRef.current.scrollWidth);
		});
		const handleExpansionToggleClick = (event) => {
			props.onExpansionToggled?.();
			event.stopPropagation();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			ref: divRef,
			className: "multiline",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("span", {
				ref: spanRef,
				className: (0, import_classnames.default)("content", { expanded: props.isExpanded }),
				style: props.style,
				title: props.isExpanded ? void 0 : props.stringValue,
				children: [props.children, /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
					className: "expand-toggle",
					style: { display: props.isExpanded ? "inline-block" : "none" },
					onClick: handleExpansionToggleClick,
					children: translate("property.collapse")
				})]
			}), contentOverflows && !props.isExpanded && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
				className: "expand-toggle",
				onClick: handleExpansionToggleClick,
				children: translate("property.expand")
			})]
		});
	};
	MultilineTextRenderer.__docgenInfo = {
		"description": "@internal",
		"methods": [],
		"displayName": "MultilineTextRenderer",
		"props": {
			"stringValue": {
				"required": false,
				"tsType": { "name": "string" },
				"description": ""
			},
			"isExpanded": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": ""
			},
			"onExpansionToggled": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "() => void",
					"signature": {
						"arguments": [],
						"return": { "name": "void" }
					}
				},
				"description": ""
			},
			"onHeightChanged": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(newHeight: number) => void",
					"signature": {
						"arguments": [{
							"type": { "name": "number" },
							"name": "newHeight"
						}],
						"return": { "name": "void" }
					}
				},
				"description": ""
			},
			"style": {
				"required": false,
				"tsType": {
					"name": "ReactCSSProperties",
					"raw": "React.CSSProperties"
				},
				"description": ""
			},
			"children": {
				"required": false,
				"tsType": {
					"name": "ReactReactNode",
					"raw": "React.ReactNode"
				},
				"description": "Content"
			}
		}
	};
}));
//#endregion
//#region src/components/PropertyGrid.tsx
function PropertyGridStory(props) {
	const { data, height, width, ...rest } = props;
	const provider = (0, import_react.useMemo)(() => ({
		getData: async () => data,
		onDataChanged: new PropertyDataChangeEvent()
	}), [data]);
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		style: {
			height,
			width,
			padding: "8px",
			backgroundColor: "var(--iui-color-background)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(VirtualizedPropertyGridWithDataProvider, {
			...rest,
			height: height - 16,
			width: width - 16,
			dataProvider: provider
		})
	});
}
var import_react, import_jsx_runtime$1;
var init_PropertyGrid = __esmMin((() => {
	init_components_react();
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	import_jsx_runtime$1 = require_jsx_runtime();
	PropertyGridStory.__docgenInfo = {
		"description": "",
		"methods": [],
		"displayName": "PropertyGridStory",
		"props": { "data": {
			"required": true,
			"tsType": { "name": "PropertyData" },
			"description": ""
		} },
		"composes": ["Omit"]
	};
}));
//#endregion
//#region src/components/PropertyGrid.stories.tsx
function createPropertyRecords(prefix = "", recordProps) {
	return [
		createPropertyRecord({
			valueFormat: PropertyValueFormat.Primitive,
			value: "text value"
		}, {
			name: `${prefix}stringProperty`,
			displayLabel: "String Property",
			typename: StandardTypeNames.String
		}, recordProps),
		createPropertyRecord({
			valueFormat: PropertyValueFormat.Primitive,
			value: 42
		}, {
			name: `${prefix}intProperty`,
			displayLabel: "Int Property",
			typename: StandardTypeNames.Int
		}, recordProps),
		createPropertyRecord({
			valueFormat: PropertyValueFormat.Primitive,
			value: true,
			displayValue: "True"
		}, {
			name: `${prefix}boolProperty`,
			displayLabel: "Boolean Property",
			typename: StandardTypeNames.Boolean
		}, recordProps),
		createPropertyRecord({
			valueFormat: PropertyValueFormat.Primitive,
			value: /* @__PURE__ */ new Date()
		}, {
			name: `${prefix}dateProperty`,
			displayLabel: "Date Property",
			typename: StandardTypeNames.ShortDate
		}, recordProps),
		createPropertyRecord({
			valueFormat: PropertyValueFormat.Primitive,
			value: /* @__PURE__ */ new Date()
		}, {
			name: `${prefix}dateTimeProperty`,
			displayLabel: "DateTime Property",
			typename: StandardTypeNames.DateTime
		}, recordProps),
		createPropertyRecord({
			valueFormat: PropertyValueFormat.Primitive,
			value: 1
		}, {
			name: `${prefix}enumProperty`,
			displayLabel: "Enum Property",
			typename: StandardTypeNames.Enum,
			enum: { choices: [
				{
					value: 1,
					label: "Choice 1"
				},
				{
					value: 2,
					label: "Choice 2"
				},
				{
					value: 3,
					label: "Choice 3"
				}
			] }
		}, recordProps)
	];
}
function createPropertyRecord(value, property, recordProps) {
	const record = new PropertyRecord(value, property);
	record.isDisabled = recordProps?.isDisabled;
	record.isReadonly = recordProps?.isReadonly;
	return record;
}
function createDefaultRecords() {
	return [
		new PropertyRecord({
			valueFormat: PropertyValueFormat.Primitive,
			value: "string value"
		}, {
			name: "stringProperty",
			displayLabel: "String property",
			typename: "string"
		}),
		new PropertyRecord({
			valueFormat: PropertyValueFormat.Primitive,
			value: 123
		}, {
			name: "intProperty",
			displayLabel: "Int property",
			typename: "int"
		}),
		new PropertyRecord({
			valueFormat: PropertyValueFormat.Primitive,
			value: 123.456
		}, {
			name: "doubleProperty",
			displayLabel: "DoubleProperty",
			typename: "double"
		})
	];
}
var import_jsx_runtime, action, multilineString, PaddingDecorator, createStructRecord, createArrayRecord, rendererManager, meta, Basic, ComplexProperties, SimpleCategorization, StructRendering, ArrayRendering, NestedCategories, Links, PropertyActions, Editable, MergedProperties, AlwaysVisibleEditor, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_appui_abstract();
	init_components_react();
	init_MultilineTextPropertyValueRenderer();
	init_Decorators();
	init_PropertyGrid();
	init_esm();
	init_esm$1();
	import_jsx_runtime = require_jsx_runtime();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	multilineString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n";
	PaddingDecorator = (Story) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: { padding: "5px" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {})
		});
	};
	createStructRecord = (property, value) => {
		return new PropertyRecord({
			valueFormat: PropertyValueFormat.Struct,
			members: new Array(value.count).fill(0).reduce((members, _, index) => {
				const name = `member${index + 1}`;
				members[name] = value.createMember(`Member ${index + 1}`);
				return members;
			}, {})
		}, {
			typename: "struct",
			name: property.displayLabel,
			...property
		});
	};
	createArrayRecord = (property, value) => {
		return new PropertyRecord({
			valueFormat: PropertyValueFormat.Array,
			items: Array.from({ length: value.count }, (_, index) => value.createItem(index)),
			itemsTypeName: value.type
		}, {
			typename: "struct",
			name: property.displayLabel,
			...property
		});
	};
	rendererManager = new PropertyValueRendererManager();
	meta = {
		title: "Components/PropertyGrid",
		component: PropertyGridStory,
		tags: ["autodocs"],
		decorators: [PaddingDecorator, AppUiDecorator],
		args: {
			height: 900,
			width: 500
		}
	};
	Basic = { args: {
		data: {
			label: PropertyRecord.fromString("Record 1"),
			categories: [{
				name: "Group_1",
				label: "Group 1",
				expand: true
			}, {
				name: "Group_2",
				label: "Group 2",
				expand: false
			}],
			records: {
				Group_1: [PropertyRecord.fromString("Record 1_1"), PropertyRecord.fromString("Record 1_2")],
				Group_2: [PropertyRecord.fromString("Record 2_1"), PropertyRecord.fromString("Record 2_2")]
			}
		},
		onPropertyContextMenu: void 0
	} };
	ComplexProperties = { args: { data: {
		label: PropertyRecord.fromString("Record 1"),
		categories: [{
			name: "all",
			label: "All",
			expand: true
		}],
		records: { all: [
			new PropertyRecord({
				valueFormat: PropertyValueFormat.Primitive,
				value: multilineString
			}, {
				name: "multilineProperty",
				displayLabel: "Multiline property",
				typename: "string",
				renderer: { name: "multiline" }
			}),
			createArrayRecord({ displayLabel: "Array property" }, {
				count: 2,
				type: "string",
				createItem: (index) => PropertyRecord.fromString(`Item ${index}`, `Item ${index}`)
			}),
			createStructRecord({ displayLabel: "Struct property" }, {
				count: 3,
				createMember: (name) => PropertyRecord.fromString(`Value for ${name}`, name)
			}),
			createArrayRecord({ displayLabel: "Array of Structs property" }, {
				count: 2,
				type: "struct",
				createItem: (index) => createStructRecord({ displayLabel: `Struct in array ${index}` }, {
					count: 3,
					createMember: (name) => PropertyRecord.fromString(`Value for ${name}`, name)
				})
			}),
			createStructRecord({ displayLabel: "Struct with Arrays property" }, {
				count: 2,
				createMember: (name) => createArrayRecord({ displayLabel: `Array in struct ${name}` }, {
					count: 2,
					type: "string",
					createItem: (index) => PropertyRecord.fromString(`Value for ${name} item ${index}`, `Item ${index}`)
				})
			})
		] }
	} } };
	SimpleCategorization = { args: {
		orientation: Orientation$2.Vertical,
		data: {
			label: PropertyRecord.fromString("Record 1"),
			categories: [{
				name: "item",
				label: "Item",
				expand: true,
				childCategories: [{
					name: "relatedSameItem",
					label: "Categorized Properties",
					expand: true
				}]
			}, {
				name: "relatedItem",
				label: "Related Item",
				expand: true
			}],
			records: {
				item: [PropertyRecord.fromString("Item name", "Name"), PropertyRecord.fromString("20m", "Height")],
				relatedSameItem: [
					PropertyRecord.fromString("Name of related direct item", "Name"),
					PropertyRecord.fromString("35m", "Height"),
					PropertyRecord.fromString("Tower", "Type")
				],
				relatedItem: [PropertyRecord.fromString("Name of non directly related item", "Name"), PropertyRecord.fromString("50m", "Width")]
			}
		}
	} };
	StructRendering = { args: {
		orientation: Orientation$2.Vertical,
		propertyValueRendererManager: rendererManager,
		data: {
			label: PropertyRecord.fromString("Record 1"),
			categories: [{
				name: "structPropertyRendering",
				label: "Struct property rendering",
				expand: true
			}],
			records: { structPropertyRendering: [
				new PropertyRecord({
					valueFormat: PropertyValueFormat.Primitive,
					value: "string value"
				}, {
					name: "simpleProperty",
					displayLabel: "Simple property",
					typename: "string"
				}),
				new PropertyRecord({
					valueFormat: PropertyValueFormat.Primitive,
					value: void 0
				}, {
					name: "noValueStruct",
					displayLabel: "Struct property with no value",
					typename: "struct"
				}),
				createStructRecord({
					name: "noRendererStructProperty",
					displayLabel: "Struct property (no renderer)"
				}, {
					count: 3,
					createMember: (name) => PropertyRecord.fromString(`Value for ${name}`, name)
				}),
				createStructRecord({
					name: "defaultRendererStructProperty",
					displayLabel: "Struct property (default renderer)",
					renderer: { name: "defaultRendererPropertyRenderer" }
				}, {
					count: 3,
					createMember: (name) => PropertyRecord.fromString(`Value for ${name}`, name)
				}),
				createStructRecord({
					name: "customRendererStructProperty",
					displayLabel: "Struct property (custom renderer)",
					renderer: { name: "customRendererStructPropertyRenderer" }
				}, {
					count: 3,
					createMember: (name) => PropertyRecord.fromString(`Value for ${name}`, name)
				})
			] }
		}
	} };
	ArrayRendering = { args: {
		orientation: Orientation$2.Horizontal,
		propertyValueRendererManager: rendererManager,
		data: {
			label: PropertyRecord.fromString("Record 1"),
			categories: [{
				name: "arrayPropertyRendering",
				label: "Array property rendering",
				expand: true
			}],
			records: { arrayPropertyRendering: [
				new PropertyRecord({
					valueFormat: PropertyValueFormat.Primitive,
					value: "string value"
				}, {
					name: "simpleProperty",
					displayLabel: "Simple property",
					typename: "string"
				}),
				new PropertyRecord({
					valueFormat: PropertyValueFormat.Array,
					items: [],
					itemsTypeName: "array"
				}, {
					name: "emptyArray",
					displayLabel: "Array property with no items",
					typename: "array"
				}),
				createArrayRecord({
					name: "noRendererStructProperty",
					displayLabel: "Array property (no renderer)",
					typename: "array"
				}, {
					count: 3,
					type: "array",
					createItem: (index) => PropertyRecord.fromString(`Value ${index + 1}`, `Item ${index + 1}`)
				}),
				createArrayRecord({
					name: "defaultRendererArrayProperty",
					displayLabel: "Array property (default renderer)",
					typename: "array",
					renderer: { name: "defaultRendererPropertyRenderer" }
				}, {
					count: 3,
					type: "array",
					createItem: (index) => PropertyRecord.fromString(`Value ${index + 1}`, `Item ${index + 1}`)
				}),
				createArrayRecord({
					name: "customRendererArrayPropertyRenderer",
					displayLabel: "Array property (custom renderer)",
					typename: "array",
					renderer: { name: "customRendererArrayPropertyRenderer" }
				}, {
					count: 3,
					type: "array",
					createItem: (index) => PropertyRecord.fromString(`Value ${index + 1}`, `Item ${index + 1}`)
				})
			] }
		}
	} };
	NestedCategories = { args: {
		orientation: Orientation$2.Horizontal,
		data: {
			label: PropertyRecord.fromString("Record 1"),
			categories: [{
				name: "category1",
				label: "Category 1",
				expand: true,
				childCategories: [{
					name: "category11",
					label: "Category 1-1",
					expand: true,
					childCategories: [{
						name: "category111",
						label: "Category 1-1-1",
						expand: true
					}, {
						name: "category112",
						label: "Category 1-1-2",
						expand: true
					}]
				}, {
					name: "category12",
					label: "Category 1-2",
					expand: true
				}]
			}, {
				name: "category2",
				label: "Category 2",
				expand: true,
				childCategories: [{
					name: "category21",
					label: "Category 2-1",
					expand: true,
					childCategories: [{
						name: "category211",
						label: "Category 2-1-1",
						expand: true
					}, {
						name: "category212",
						label: "Category 2-1-2",
						expand: true
					}]
				}, {
					name: "category22",
					label: "Category 2-2",
					expand: true
				}]
			}],
			records: {
				category1: createDefaultRecords(),
				category11: createDefaultRecords(),
				category111: createDefaultRecords(),
				category112: createDefaultRecords(),
				category12: createDefaultRecords(),
				category2: createDefaultRecords(),
				category21: createDefaultRecords(),
				category211: createDefaultRecords(),
				category212: createDefaultRecords(),
				category22: createDefaultRecords()
			}
		}
	} };
	Links = { args: {
		data: {
			label: PropertyRecord.fromString("Record 1"),
			categories: [{
				name: "Group_1",
				label: "Group 1",
				expand: true
			}],
			records: { Group_1: [PropertyRecord.fromString("https://www.bentley.com"), PropertyRecord.fromString("pw://test")] }
		},
		onPropertyContextMenu: void 0
	} };
	PropertyActions = { args: {
		data: {
			label: PropertyRecord.fromString("Record 1"),
			categories: [{
				name: "item",
				label: "Item",
				expand: true
			}],
			records: { item: [PropertyRecord.fromString("Some value", "Property with actions"), PropertyRecord.fromString("Other value", "Property without actions")] }
		},
		onPropertyContextMenu: void 0,
		isPropertyHoverEnabled: true,
		actionButtonRenderers: [({ property, isPropertyHovered }) => {
			if (property.property.displayLabel === "Property with actions" && isPropertyHovered) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
				label: "Copy",
				styleType: "borderless",
				size: "small",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgCopy, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
				label: "Focus",
				styleType: "borderless",
				size: "small",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgSelection, {})
			})] });
		}]
	} };
	Editable = { args: {
		isPropertyEditingEnabled: true,
		onPropertyUpdated: async ({ propertyRecord, newValue }) => {
			action("onPropertyUpdated")(`Property "${propertyRecord.property.name}" updated to: ${newValue.value}`);
			return true;
		},
		data: {
			label: PropertyRecord.fromString("Record 1"),
			categories: [
				{
					name: "Editable",
					label: "Editable",
					expand: true
				},
				{
					name: "Readonly",
					label: "Readonly",
					expand: true
				},
				{
					name: "Disabled",
					label: "Disabled",
					expand: true
				}
			],
			records: {
				Editable: createPropertyRecords("editable_"),
				Readonly: createPropertyRecords("readonly_", { isReadonly: true }),
				Disabled: createPropertyRecords("disabled_", { isDisabled: true })
			}
		}
	} };
	MergedProperties = { args: {
		data: {
			label: PropertyRecord.fromString("Multi-selection"),
			categories: [{
				name: "Merged",
				label: "Merged Properties",
				expand: true
			}],
			records: { Merged: [
				(() => {
					const record = new PropertyRecord({
						valueFormat: PropertyValueFormat.Primitive,
						value: 42,
						displayValue: "-- ft"
					}, {
						name: "mergedQuantity",
						displayLabel: "Length (quantity with unit)",
						typename: StandardTypeNames.Double,
						quantityType: "Length"
					});
					record.isMerged = true;
					return record;
				})(),
				(() => {
					const record = new PropertyRecord({
						valueFormat: PropertyValueFormat.Primitive,
						value: "hello",
						displayValue: "hello"
					}, {
						name: "mergedString",
						displayLabel: "Name (no unit)",
						typename: StandardTypeNames.String
					});
					record.isMerged = true;
					return record;
				})(),
				(() => {
					const record = new PropertyRecord({
						valueFormat: PropertyValueFormat.Primitive,
						value: 100,
						displayValue: "-- m²"
					}, {
						name: "mergedArea",
						displayLabel: "Area (quantity with unit)",
						typename: StandardTypeNames.Double,
						quantityType: "Area"
					});
					record.isMerged = true;
					return record;
				})(),
				(() => {
					const record = new PropertyRecord({
						valueFormat: PropertyValueFormat.Primitive,
						value: 14.23,
						displayValue: "14.23 ft"
					}, {
						name: "mergedWithValue",
						displayLabel: "Width (value without --)",
						typename: StandardTypeNames.Double,
						quantityType: "Length"
					});
					record.isMerged = true;
					return record;
				})()
			] }
		},
		onPropertyContextMenu: void 0
	} };
	AlwaysVisibleEditor = { args: {
		data: {
			label: PropertyRecord.fromString("Record 1"),
			categories: [{
				name: "Group_1",
				label: "Group 1",
				expand: true
			}, {
				name: "Group_2",
				label: "Group 2",
				expand: true
			}],
			records: {
				Group_1: [new PropertyRecord({
					valueFormat: PropertyValueFormat.Primitive,
					value: true
				}, {
					name: "toggleProperty",
					displayLabel: "Always visible toggle editor",
					typename: "boolean",
					editor: { name: "toggle" }
				}), new PropertyRecord({
					valueFormat: PropertyValueFormat.Primitive,
					value: false
				}, {
					name: "toggleProperty2",
					displayLabel: "Always visible toggle editor",
					typename: "boolean",
					editor: { name: "toggle" }
				})],
				Group_2: [new PropertyRecord({
					valueFormat: PropertyValueFormat.Primitive,
					value: true
				}, {
					name: "toggleProperty3",
					displayLabel: "Not always visible boolean editor",
					typename: "boolean"
				}), new PropertyRecord({
					valueFormat: PropertyValueFormat.Primitive,
					value: "Text"
				}, {
					name: "stringProperty",
					displayLabel: "Not always visible string editor",
					typename: "string"
				})],
				Group_3: []
			}
		},
		onPropertyContextMenu: void 0,
		isPropertyEditingEnabled: true,
		alwaysShowEditor: (propertyRecord) => propertyRecord.property.editor?.name === "toggle"
	} };
	rendererManager.registerRenderer("customRendererStructPropertyRenderer", {
		canRender: () => true,
		render: (record) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: Object.entries(record.value.members).map((entry) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					entry[0],
					" = ",
					entry[1].value.displayValue
				] }, entry[0]);
			}) });
		}
	});
	rendererManager.registerRenderer("customRendererArrayPropertyRenderer", {
		canRender: () => true,
		render: (record) => {
			const items = record.value.items;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: items.map((item, index) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item.value.displayValue }, index);
			}) });
		}
	});
	rendererManager.registerRenderer("defaultRendererPropertyRenderer", {
		canRender: () => false,
		render: () => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Should not render" });
		}
	});
	rendererManager.registerRenderer("multiline", new MultilineTextPropertyValueRenderer());
	Basic.parameters = {
		...Basic.parameters,
		docs: {
			...Basic.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    data: {\n      label: PropertyRecord.fromString(\"Record 1\"),\n      categories: [{\n        name: \"Group_1\",\n        label: \"Group 1\",\n        expand: true\n      }, {\n        name: \"Group_2\",\n        label: \"Group 2\",\n        expand: false\n      }],\n      records: {\n        Group_1: [PropertyRecord.fromString(\"Record 1_1\"), PropertyRecord.fromString(\"Record 1_2\")],\n        Group_2: [PropertyRecord.fromString(\"Record 2_1\"), PropertyRecord.fromString(\"Record 2_2\")]\n      }\n    },\n    onPropertyContextMenu: undefined\n  }\n}",
				...Basic.parameters?.docs?.source
			}
		}
	};
	ComplexProperties.parameters = {
		...ComplexProperties.parameters,
		docs: {
			...ComplexProperties.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    data: {\n      label: PropertyRecord.fromString(\"Record 1\"),\n      categories: [{\n        name: \"all\",\n        label: \"All\",\n        expand: true\n      }],\n      records: {\n        all: [new PropertyRecord({\n          valueFormat: PropertyValueFormat.Primitive,\n          value: multilineString\n        }, {\n          name: \"multilineProperty\",\n          displayLabel: \"Multiline property\",\n          typename: \"string\",\n          renderer: {\n            name: \"multiline\"\n          }\n        }), createArrayRecord({\n          displayLabel: \"Array property\"\n        }, {\n          count: 2,\n          type: \"string\",\n          createItem: index => PropertyRecord.fromString(`Item ${index}`, `Item ${index}`)\n        }), createStructRecord({\n          displayLabel: \"Struct property\"\n        }, {\n          count: 3,\n          createMember: name => PropertyRecord.fromString(`Value for ${name}`, name)\n        }), createArrayRecord({\n          displayLabel: \"Array of Structs property\"\n        }, {\n          count: 2,\n          type: \"struct\",\n          createItem: index => createStructRecord({\n            displayLabel: `Struct in array ${index}`\n          }, {\n            count: 3,\n            createMember: name => PropertyRecord.fromString(`Value for ${name}`, name)\n          })\n        }), createStructRecord({\n          displayLabel: \"Struct with Arrays property\"\n        }, {\n          count: 2,\n          createMember: name => createArrayRecord({\n            displayLabel: `Array in struct ${name}`\n          }, {\n            count: 2,\n            type: \"string\",\n            createItem: index => PropertyRecord.fromString(`Value for ${name} item ${index}`, `Item ${index}`)\n          })\n        })]\n      }\n    }\n  }\n}",
				...ComplexProperties.parameters?.docs?.source
			}
		}
	};
	SimpleCategorization.parameters = {
		...SimpleCategorization.parameters,
		docs: {
			...SimpleCategorization.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    orientation: Orientation.Vertical,\n    data: {\n      label: PropertyRecord.fromString(\"Record 1\"),\n      categories: [{\n        name: \"item\",\n        label: \"Item\",\n        expand: true,\n        childCategories: [{\n          name: \"relatedSameItem\",\n          label: \"Categorized Properties\",\n          expand: true\n        }]\n      }, {\n        name: \"relatedItem\",\n        label: \"Related Item\",\n        expand: true\n      }],\n      records: {\n        item: [PropertyRecord.fromString(\"Item name\", \"Name\"), PropertyRecord.fromString(\"20m\", \"Height\")],\n        relatedSameItem: [PropertyRecord.fromString(\"Name of related direct item\", \"Name\"), PropertyRecord.fromString(\"35m\", \"Height\"), PropertyRecord.fromString(\"Tower\", \"Type\")],\n        relatedItem: [PropertyRecord.fromString(\"Name of non directly related item\", \"Name\"), PropertyRecord.fromString(\"50m\", \"Width\")]\n      }\n    }\n  }\n}",
				...SimpleCategorization.parameters?.docs?.source
			}
		}
	};
	StructRendering.parameters = {
		...StructRendering.parameters,
		docs: {
			...StructRendering.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    orientation: Orientation.Vertical,\n    propertyValueRendererManager: rendererManager,\n    data: {\n      label: PropertyRecord.fromString(\"Record 1\"),\n      categories: [{\n        name: \"structPropertyRendering\",\n        label: \"Struct property rendering\",\n        expand: true\n      }],\n      records: {\n        structPropertyRendering: [new PropertyRecord({\n          valueFormat: PropertyValueFormat.Primitive,\n          value: \"string value\"\n        }, {\n          name: \"simpleProperty\",\n          displayLabel: \"Simple property\",\n          typename: \"string\"\n        }), new PropertyRecord({\n          valueFormat: PropertyValueFormat.Primitive,\n          value: undefined\n        }, {\n          name: \"noValueStruct\",\n          displayLabel: \"Struct property with no value\",\n          typename: \"struct\"\n        }), createStructRecord({\n          name: \"noRendererStructProperty\",\n          displayLabel: \"Struct property (no renderer)\"\n        }, {\n          count: 3,\n          createMember: name => PropertyRecord.fromString(`Value for ${name}`, name)\n        }), createStructRecord({\n          name: \"defaultRendererStructProperty\",\n          displayLabel: \"Struct property (default renderer)\",\n          renderer: {\n            name: \"defaultRendererPropertyRenderer\"\n          }\n        }, {\n          count: 3,\n          createMember: name => PropertyRecord.fromString(`Value for ${name}`, name)\n        }), createStructRecord({\n          name: \"customRendererStructProperty\",\n          displayLabel: \"Struct property (custom renderer)\",\n          renderer: {\n            name: \"customRendererStructPropertyRenderer\"\n          }\n        }, {\n          count: 3,\n          createMember: name => PropertyRecord.fromString(`Value for ${name}`, name)\n        })]\n      }\n    }\n  }\n}",
				...StructRendering.parameters?.docs?.source
			}
		}
	};
	ArrayRendering.parameters = {
		...ArrayRendering.parameters,
		docs: {
			...ArrayRendering.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    orientation: Orientation.Horizontal,\n    propertyValueRendererManager: rendererManager,\n    data: {\n      label: PropertyRecord.fromString(\"Record 1\"),\n      categories: [{\n        name: \"arrayPropertyRendering\",\n        label: \"Array property rendering\",\n        expand: true\n      }],\n      records: {\n        arrayPropertyRendering: [new PropertyRecord({\n          valueFormat: PropertyValueFormat.Primitive,\n          value: \"string value\"\n        }, {\n          name: \"simpleProperty\",\n          displayLabel: \"Simple property\",\n          typename: \"string\"\n        }), new PropertyRecord({\n          valueFormat: PropertyValueFormat.Array,\n          items: [],\n          itemsTypeName: \"array\"\n        }, {\n          name: \"emptyArray\",\n          displayLabel: \"Array property with no items\",\n          typename: \"array\"\n        }), createArrayRecord({\n          name: \"noRendererStructProperty\",\n          displayLabel: \"Array property (no renderer)\",\n          typename: \"array\"\n        }, {\n          count: 3,\n          type: \"array\",\n          createItem: index => PropertyRecord.fromString(`Value ${index + 1}`, `Item ${index + 1}`)\n        }), createArrayRecord({\n          name: \"defaultRendererArrayProperty\",\n          displayLabel: \"Array property (default renderer)\",\n          typename: \"array\",\n          renderer: {\n            name: \"defaultRendererPropertyRenderer\"\n          }\n        }, {\n          count: 3,\n          type: \"array\",\n          createItem: index => PropertyRecord.fromString(`Value ${index + 1}`, `Item ${index + 1}`)\n        }), createArrayRecord({\n          name: \"customRendererArrayPropertyRenderer\",\n          displayLabel: \"Array property (custom renderer)\",\n          typename: \"array\",\n          renderer: {\n            name: \"customRendererArrayPropertyRenderer\"\n          }\n        }, {\n          count: 3,\n          type: \"array\",\n          createItem: index => PropertyRecord.fromString(`Value ${index + 1}`, `Item ${index + 1}`)\n        })]\n      }\n    }\n  }\n}",
				...ArrayRendering.parameters?.docs?.source
			}
		}
	};
	NestedCategories.parameters = {
		...NestedCategories.parameters,
		docs: {
			...NestedCategories.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    orientation: Orientation.Horizontal,\n    data: {\n      label: PropertyRecord.fromString(\"Record 1\"),\n      categories: [{\n        name: \"category1\",\n        label: \"Category 1\",\n        expand: true,\n        childCategories: [{\n          name: \"category11\",\n          label: \"Category 1-1\",\n          expand: true,\n          childCategories: [{\n            name: \"category111\",\n            label: \"Category 1-1-1\",\n            expand: true\n          }, {\n            name: \"category112\",\n            label: \"Category 1-1-2\",\n            expand: true\n          }]\n        }, {\n          name: \"category12\",\n          label: \"Category 1-2\",\n          expand: true\n        }]\n      }, {\n        name: \"category2\",\n        label: \"Category 2\",\n        expand: true,\n        childCategories: [{\n          name: \"category21\",\n          label: \"Category 2-1\",\n          expand: true,\n          childCategories: [{\n            name: \"category211\",\n            label: \"Category 2-1-1\",\n            expand: true\n          }, {\n            name: \"category212\",\n            label: \"Category 2-1-2\",\n            expand: true\n          }]\n        }, {\n          name: \"category22\",\n          label: \"Category 2-2\",\n          expand: true\n        }]\n      }],\n      records: {\n        category1: createDefaultRecords(),\n        category11: createDefaultRecords(),\n        category111: createDefaultRecords(),\n        category112: createDefaultRecords(),\n        category12: createDefaultRecords(),\n        category2: createDefaultRecords(),\n        category21: createDefaultRecords(),\n        category211: createDefaultRecords(),\n        category212: createDefaultRecords(),\n        category22: createDefaultRecords()\n      }\n    }\n  }\n}",
				...NestedCategories.parameters?.docs?.source
			}
		}
	};
	Links.parameters = {
		...Links.parameters,
		docs: {
			...Links.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    data: {\n      label: PropertyRecord.fromString(\"Record 1\"),\n      categories: [{\n        name: \"Group_1\",\n        label: \"Group 1\",\n        expand: true\n      }],\n      records: {\n        Group_1: [PropertyRecord.fromString(\"https://www.bentley.com\"), PropertyRecord.fromString(\"pw://test\")]\n      }\n    },\n    onPropertyContextMenu: undefined\n  }\n}",
				...Links.parameters?.docs?.source
			}
		}
	};
	PropertyActions.parameters = {
		...PropertyActions.parameters,
		docs: {
			...PropertyActions.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    data: {\n      label: PropertyRecord.fromString(\"Record 1\"),\n      categories: [{\n        name: \"item\",\n        label: \"Item\",\n        expand: true\n      }],\n      records: {\n        item: [PropertyRecord.fromString(\"Some value\", \"Property with actions\"), PropertyRecord.fromString(\"Other value\", \"Property without actions\")]\n      }\n    },\n    onPropertyContextMenu: undefined,\n    isPropertyHoverEnabled: true,\n    actionButtonRenderers: [({\n      property,\n      isPropertyHovered\n    }) => {\n      if (property.property.displayLabel === \"Property with actions\" && isPropertyHovered) {\n        return <ButtonGroup>\n              <IconButton label=\"Copy\" styleType=\"borderless\" size=\"small\">\n                <SvgCopy />\n              </IconButton>\n              <IconButton label=\"Focus\" styleType=\"borderless\" size=\"small\">\n                <SvgSelection />\n              </IconButton>\n            </ButtonGroup>;\n      }\n    }]\n  }\n}",
				...PropertyActions.parameters?.docs?.source
			}
		}
	};
	Editable.parameters = {
		...Editable.parameters,
		docs: {
			...Editable.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    isPropertyEditingEnabled: true,\n    onPropertyUpdated: async ({\n      propertyRecord,\n      newValue\n    }) => {\n      action(\"onPropertyUpdated\")(`Property \"${propertyRecord.property.name}\" updated to: ${(newValue as PrimitiveValue).value}`);\n      return true;\n    },\n    data: {\n      label: PropertyRecord.fromString(\"Record 1\"),\n      categories: [{\n        name: \"Editable\",\n        label: \"Editable\",\n        expand: true\n      }, {\n        name: \"Readonly\",\n        label: \"Readonly\",\n        expand: true\n      }, {\n        name: \"Disabled\",\n        label: \"Disabled\",\n        expand: true\n      }],\n      records: {\n        Editable: createPropertyRecords(\"editable_\"),\n        Readonly: createPropertyRecords(\"readonly_\", {\n          isReadonly: true\n        }),\n        Disabled: createPropertyRecords(\"disabled_\", {\n          isDisabled: true\n        })\n      }\n    }\n  }\n}",
				...Editable.parameters?.docs?.source
			}
		}
	};
	MergedProperties.parameters = {
		...MergedProperties.parameters,
		docs: {
			...MergedProperties.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    data: {\n      label: PropertyRecord.fromString(\"Multi-selection\"),\n      categories: [{\n        name: \"Merged\",\n        label: \"Merged Properties\",\n        expand: true\n      }],\n      records: {\n        Merged: [(() => {\n          const record = new PropertyRecord({\n            valueFormat: PropertyValueFormat.Primitive,\n            value: 42,\n            displayValue: \"-- ft\"\n          }, {\n            name: \"mergedQuantity\",\n            displayLabel: \"Length (quantity with unit)\",\n            typename: StandardTypeNames.Double,\n            quantityType: \"Length\"\n          });\n          record.isMerged = true;\n          return record;\n        })(), (() => {\n          const record = new PropertyRecord({\n            valueFormat: PropertyValueFormat.Primitive,\n            value: \"hello\",\n            displayValue: \"hello\"\n          }, {\n            name: \"mergedString\",\n            displayLabel: \"Name (no unit)\",\n            typename: StandardTypeNames.String\n          });\n          record.isMerged = true;\n          return record;\n        })(), (() => {\n          const record = new PropertyRecord({\n            valueFormat: PropertyValueFormat.Primitive,\n            value: 100,\n            displayValue: \"-- m²\"\n          }, {\n            name: \"mergedArea\",\n            displayLabel: \"Area (quantity with unit)\",\n            typename: StandardTypeNames.Double,\n            quantityType: \"Area\"\n          });\n          record.isMerged = true;\n          return record;\n        })(), (() => {\n          const record = new PropertyRecord({\n            valueFormat: PropertyValueFormat.Primitive,\n            value: 14.23,\n            displayValue: \"14.23 ft\"\n          }, {\n            name: \"mergedWithValue\",\n            displayLabel: \"Width (value without --)\",\n            typename: StandardTypeNames.Double,\n            quantityType: \"Length\"\n          });\n          record.isMerged = true;\n          return record;\n        })()]\n      }\n    },\n    onPropertyContextMenu: undefined\n  }\n}",
				...MergedProperties.parameters?.docs?.source
			}
		}
	};
	AlwaysVisibleEditor.parameters = {
		...AlwaysVisibleEditor.parameters,
		docs: {
			...AlwaysVisibleEditor.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    data: {\n      label: PropertyRecord.fromString(\"Record 1\"),\n      categories: [{\n        name: \"Group_1\",\n        label: \"Group 1\",\n        expand: true\n      }, {\n        name: \"Group_2\",\n        label: \"Group 2\",\n        expand: true\n      }],\n      records: {\n        Group_1: [new PropertyRecord({\n          valueFormat: PropertyValueFormat.Primitive,\n          value: true\n        }, {\n          name: \"toggleProperty\",\n          displayLabel: \"Always visible toggle editor\",\n          typename: \"boolean\",\n          editor: {\n            name: \"toggle\"\n          }\n        }), new PropertyRecord({\n          valueFormat: PropertyValueFormat.Primitive,\n          value: false\n        }, {\n          name: \"toggleProperty2\",\n          displayLabel: \"Always visible toggle editor\",\n          typename: \"boolean\",\n          editor: {\n            name: \"toggle\"\n          }\n        })],\n        Group_2: [new PropertyRecord({\n          valueFormat: PropertyValueFormat.Primitive,\n          value: true\n        }, {\n          name: \"toggleProperty3\",\n          displayLabel: \"Not always visible boolean editor\",\n          typename: \"boolean\"\n        }), new PropertyRecord({\n          valueFormat: PropertyValueFormat.Primitive,\n          value: \"Text\"\n        }, {\n          name: \"stringProperty\",\n          displayLabel: \"Not always visible string editor\",\n          typename: \"string\"\n        })],\n        Group_3: []\n      }\n    },\n    onPropertyContextMenu: undefined,\n    isPropertyEditingEnabled: true,\n    alwaysShowEditor: (propertyRecord: PropertyRecord) => propertyRecord.property.editor?.name === \"toggle\"\n  }\n}",
				...AlwaysVisibleEditor.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Basic",
		"ComplexProperties",
		"SimpleCategorization",
		"StructRendering",
		"ArrayRendering",
		"NestedCategories",
		"Links",
		"PropertyActions",
		"Editable",
		"MergedProperties",
		"AlwaysVisibleEditor"
	];
}))();
export { AlwaysVisibleEditor, ArrayRendering, Basic, ComplexProperties, Editable, Links, MergedProperties, NestedCategories, PropertyActions, SimpleCategorization, StructRendering, __namedExportsOrder, meta as default };
