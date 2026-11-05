const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./theming-B7mEHq8B.js","./rolldown-runtime-htSClZ5J.js","./react-Dtiv5CLt.js","./chunk-IMSF75WX-C840uHAo.js","./chunk-DRQKCCAG-DqVknKj8.js","./syntaxhighlighter-4REYKNEV-C7duZJGc.js","./chunk-W22LQPXL-DWmBEAvZ.js","./jsx-runtime-BpuwJHEg.js","./react-dom-COAM6TrF.js","./chunk-242VQQM5-hOTZzAFK.js","./formatter-L2YTDE3Q-B2pOGD8Z.js","./WithTooltip-CDUNV5IS-CPiZHYax.js"])))=>i.map(i=>d[i]);
import { a as __toESM$1, n as __esmMin, r as __exportAll, t as __commonJSMin } from "./rolldown-runtime-htSClZ5J.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-BeSU7fTM.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { a as pick$1, c as init_chunk_Z3B64JMR, i as omit, l as isEqual, n as mapValues, r as mergeWith, s as toMerged, t as init_chunk_7PIQR4A3, u as isPlainObject } from "./chunk-7PIQR4A3-CSfxpDQ7.js";
import { a as init_chunk_IMSF75WX, i as __toESM$2, n as __export, o as dedent, t as __commonJS$1 } from "./chunk-IMSF75WX-C840uHAo.js";
import { p as init_csf } from "./blocks-DQglNL1j.js";
import { n as require_memoizerific, t as init_chunk_DRQKCCAG } from "./chunk-DRQKCCAG-DqVknKj8.js";
import { t as require_react_dom } from "./react-dom-COAM6TrF.js";
import { a as $319e236875307eab$export$a9b970dcc4ae71a9, n as ScrollArea2, o as init_chunk_LITCR56V, r as init_chunk_W22LQPXL } from "./chunk-W22LQPXL-DWmBEAvZ.js";
import { C as rgba, S as init_chunk_S6TK43XQ, a as init_theming, b as curriedLighten$1, f as useTheme, g as lightenColor, h as init_chunk_GLOGC42D, i as ignoreSsrWarning, m as create, o as isPropValid, p as color, s as keyframes, u as styled, v as typography, w as _extends$1, x as curriedTransparentize$1, y as curriedDarken$1 } from "./theming-B7mEHq8B.js";
import { t as _objectWithoutPropertiesLoose$1 } from "./chunk-242VQQM5-hOTZzAFK.js";
//#region ../../node_modules/.pnpm/storybook@10.6.2_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-LKJ5WGKT.js
function parseErrorCode({ code, category }) {
	return `SB_${category}_${String(code).padStart(4, "0")}`;
}
function appendErrorRef(url) {
	if (/^(?!.*storybook\.js\.org)|[?&]ref=error\b/.test(url)) return url;
	try {
		let urlObj = new URL(url);
		return urlObj.searchParams.set("ref", "error"), urlObj.toString();
	} catch {
		return url;
	}
}
var StorybookError;
function init_chunk_LKJ5WGKT() {
	return (init_chunk_LKJ5WGKT = __esmMin((() => {
		StorybookError = class _StorybookError extends Error {
			constructor(props) {
				super(_StorybookError.getFullMessage(props), props.cause === void 0 ? void 0 : { cause: props.cause });
				/**
				* Data associated with the error. Used to provide additional information in the error message or
				* to be passed to telemetry.
				*/
				this.data = {};
				/** Flag used to easily determine if the error originates from Storybook. */
				this.fromStorybook = !0;
				/**
				* Flag used to determine if the error is handled by us and should therefore not be shown to the
				* user.
				*/
				this.isHandledError = !1;
				/**
				* A collection of sub errors which relate to a parent error.
				*
				* Sub-errors are used to represent multiple related errors that occurred together. When a
				* StorybookError with sub-errors is sent to telemetry, both the parent error and each sub-error
				* are sent as separate telemetry events. This allows for better error tracking and debugging.
				*
				* @example
				*
				* ```ts
				* const error1 = new SomeError();
				* const error2 = new AnotherError();
				* const parentError = new ParentError({
				*   // ... other props
				*   subErrors: [error1, error2],
				* });
				* ```
				*/
				this.subErrors = [];
				this.category = props.category, this.documentation = props.documentation ?? !1, this.code = props.code, this.isHandledError = props.isHandledError ?? !1, this.agentFacing = props.agentFacing ?? !1, this.name = props.name, this.subErrors = props.subErrors ?? [];
			}
			get fullErrorCode() {
				return parseErrorCode({
					code: this.code,
					category: this.category
				});
			}
			/** Overrides the default `Error.name` property in the format: SB_<CATEGORY>_<CODE>. */
			get name() {
				let errorName = this._name || this.constructor.name;
				return `${this.fullErrorCode} (${errorName})`;
			}
			set name(name) {
				this._name = name;
			}
			/** Generates the error message along with additional documentation link (if applicable). */
			static getFullMessage({ documentation, code, category, message }) {
				let page;
				return documentation === !0 ? page = `https://storybook.js.org/error/${parseErrorCode({
					code,
					category
				})}?ref=error` : typeof documentation == "string" ? page = appendErrorRef(documentation) : Array.isArray(documentation) && (page = `
${documentation.map((doc) => `	- ${appendErrorRef(doc)}`).join(`
`)}`), `${message}${page != null ? `

More info: ${page}
` : ""}`;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.6.2_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-SC67XZST.js
var require_picocolors_browser;
function init_chunk_SC67XZST() {
	return (init_chunk_SC67XZST = __esmMin((() => {
		init_chunk_IMSF75WX();
		require_picocolors_browser = __commonJS$1({ "../../node_modules/picocolors/picocolors.browser.js"(exports, module) {
			var x = String, create = function() {
				return {
					isColorSupported: !1,
					reset: x,
					bold: x,
					dim: x,
					italic: x,
					underline: x,
					inverse: x,
					hidden: x,
					strikethrough: x,
					black: x,
					red: x,
					green: x,
					yellow: x,
					blue: x,
					magenta: x,
					cyan: x,
					white: x,
					gray: x,
					bgBlack: x,
					bgRed: x,
					bgGreen: x,
					bgYellow: x,
					bgBlue: x,
					bgMagenta: x,
					bgCyan: x,
					bgWhite: x,
					blackBright: x,
					redBright: x,
					greenBright: x,
					yellowBright: x,
					blueBright: x,
					magentaBright: x,
					cyanBright: x,
					whiteBright: x,
					bgBlackBright: x,
					bgRedBright: x,
					bgGreenBright: x,
					bgYellowBright: x,
					bgBlueBright: x,
					bgMagentaBright: x,
					bgCyanBright: x,
					bgWhiteBright: x
				};
			};
			module.exports = create();
			module.exports.createColors = create;
		} });
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.6.2_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-3PFG54GG.js
var StatusTypeIdMismatchError$2;
function init_chunk_3PFG54GG() {
	return (init_chunk_3PFG54GG = __esmMin((() => {
		init_chunk_LKJ5WGKT();
		init_chunk_SC67XZST();
		init_chunk_IMSF75WX();
		__toESM$2(require_picocolors_browser(), 1);
		StatusTypeIdMismatchError$2 = class extends StorybookError {
			constructor(data) {
				super({
					name: "StatusTypeIdMismatchError",
					category: "CORE-SERVER",
					code: 16,
					message: `Status has typeId "${data.status.typeId}" but was added to store with typeId "${data.typeId}". Full status: ${JSON.stringify(data.status, null, 2)}`
				});
				this.data = data;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.6.2_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-NULBREPZ.js
var sanitize, sanitizeSafe, toId;
function init_chunk_NULBREPZ() {
	return (init_chunk_NULBREPZ = __esmMin((() => {
		sanitize = (string) => string.toLowerCase().replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-").replace(/-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
		sanitizeSafe = (string, part) => {
			let sanitized = sanitize(string);
			if (sanitized === "") throw new Error(`Invalid ${part} '${string}', must include alphanumeric characters`);
			return sanitized;
		};
		toId = (kind, name) => `${sanitizeSafe(kind, "kind")}${name ? `--${sanitizeSafe(name, "name")}` : ""}`;
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.6.2_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-MEXTPDJG.js
function isTestEnvironment() {
	try {
		return !!globalThis.__vitest_browser__ || !!globalThis.window?.navigator?.userAgent?.match(/StorybookTestRunner/);
	} catch {
		return !1;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.6.2_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-KK3JJ3E4.js
function syncGlobalSlot(next) {
	globalThis.__STORYBOOK_ADDONS_CHANNEL__ = next;
}
function getChannel() {
	let fromGlobal = globalThis.__STORYBOOK_ADDONS_CHANNEL__;
	return fromGlobal && (channel = fromGlobal), channel ?? null;
}
function setChannel(next) {
	channel = next ?? void 0, syncGlobalSlot(channel);
}
function installNoopChannel() {
	setChannel(new Channel$1({}));
}
function ensureChannel() {
	getChannel() || installNoopChannel();
}
var isMulti, generateRandomId, Channel$1, channel;
function init_chunk_KK3JJ3E4() {
	return (init_chunk_KK3JJ3E4 = __esmMin((() => {
		isMulti = (args) => args.transports !== void 0;
		generateRandomId = () => Math.random().toString(16).slice(2);
		Channel$1 = class {
			constructor(input = {}) {
				this.sender = generateRandomId();
				this.events = {};
				this.data = {};
				this.transports = [];
				this.isAsync = input.async || !1, isMulti(input) ? (this.transports = input.transports || [], this.transports.forEach((t) => {
					t.setHandler((event) => this.handleEvent(event));
				})) : this.transports = input.transport ? [input.transport] : [], this.transports.forEach((t) => {
					t.setHandler((event) => this.handleEvent(event));
				});
			}
			get hasTransport() {
				return this.transports.length > 0;
			}
			addListener(eventName, listener) {
				this.events[eventName] = this.events[eventName] || [], this.events[eventName].push(listener);
			}
			emit(eventName, ...args) {
				let event = {
					type: eventName,
					args,
					from: this.sender
				}, options = {};
				args.length >= 1 && args[0] && args[0].options && (options = args[0].options);
				let handler = () => {
					this.transports.forEach((t) => {
						t.send(event, options);
					}), this.handleEvent(event);
				};
				this.isAsync ? setImmediate(handler) : handler();
			}
			last(eventName) {
				return this.data[eventName];
			}
			eventNames() {
				return Object.keys(this.events);
			}
			listenerCount(eventName) {
				let listeners = this.listeners(eventName);
				return listeners ? listeners.length : 0;
			}
			listeners(eventName) {
				return this.events[eventName] || void 0;
			}
			once(eventName, listener) {
				let onceListener = this.onceListener(eventName, listener);
				this.addListener(eventName, onceListener);
			}
			removeAllListeners(eventName) {
				eventName ? this.events[eventName] && delete this.events[eventName] : this.events = {};
			}
			removeListener(eventName, listener) {
				let listeners = this.listeners(eventName);
				listeners && (this.events[eventName] = listeners.filter((l) => l !== listener));
			}
			on(eventName, listener) {
				this.addListener(eventName, listener);
			}
			off(eventName, listener) {
				this.removeListener(eventName, listener);
			}
			handleEvent(event) {
				let listeners = this.listeners(event.type);
				listeners && listeners.length && listeners.forEach((fn) => {
					fn.apply(event, event.args);
				}), this.data[event.type] = event.args;
			}
			onceListener(eventName, listener) {
				let onceListener = (...args) => (this.removeListener(eventName, onceListener), listener(...args));
				return onceListener;
			}
		};
		typeof window > "u" && ensureChannel();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.6.2_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-A26ZOLVJ.js
function mockChannel() {
	return new Channel$1({ transport: {
		setHandler: () => {},
		send: () => {}
	} });
}
var Tag, BUILT_IN_FILTERS, USER_TAG_FILTER;
function init_chunk_A26ZOLVJ() {
	return (init_chunk_A26ZOLVJ = __esmMin((() => {
		init_chunk_KK3JJ3E4();
		Tag = {
			/** Indicates that autodocs should be generated for this component */
			AUTODOCS: "autodocs",
			/** MDX documentation attached to a component's stories file */
			ATTACHED_MDX: "attached-mdx",
			/** Standalone MDX documentation not attached to stories */
			UNATTACHED_MDX: "unattached-mdx",
			/** Story has a play function */
			PLAY_FN: "play-fn",
			/** Story has a test function */
			TEST_FN: "test-fn",
			/** Development environment tag */
			DEV: "dev",
			/** Test environment tag */
			TEST: "test",
			/** Manifest generation tag */
			MANIFEST: "manifest"
		};
		BUILT_IN_FILTERS = {
			_docs: (entry, excluded) => excluded ? entry.type !== "docs" : entry.type === "docs",
			_play: (entry, excluded) => excluded ? entry.type !== "story" || !entry.tags?.includes(Tag.PLAY_FN) : entry.type === "story" && !!entry.tags?.includes(Tag.PLAY_FN),
			_test: (entry, excluded) => excluded ? entry.type !== "story" || entry.subtype !== "test" : entry.type === "story" && entry.subtype === "test"
		};
		USER_TAG_FILTER = (tag) => (entry, excluded) => excluded ? !entry.tags?.includes(tag) : !!entry.tags?.includes(tag);
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.6.2_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-MI5GWNNC.js
var StatusTypeIdMismatchError$1, UniversalStoreFollowerTimeoutError;
function init_chunk_MI5GWNNC() {
	return (init_chunk_MI5GWNNC = __esmMin((() => {
		init_chunk_LKJ5WGKT();
		StatusTypeIdMismatchError$1 = class extends StorybookError {
			constructor(data) {
				super({
					name: "StatusTypeIdMismatchError",
					category: "MANAGER_API",
					code: 1,
					message: `Status has typeId "${data.status.typeId}" but was added to store with typeId "${data.typeId}". Full status: ${JSON.stringify(data.status, null, 2)}`
				});
				this.data = data;
			}
		};
		UniversalStoreFollowerTimeoutError = class extends StorybookError {
			constructor(followerId) {
				super({
					name: "UniversalStoreFollowerTimeoutError",
					category: "MANAGER_UNIVERSAL-STORE",
					code: 1,
					message: `Timed out waiting for leader state for UniversalStore follower with id: '${followerId}'. Ensure a leader with the same id exists and is reachable before creating a follower.`
				});
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.6.2_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-SFVA4SBT.js
function encodeString(str) {
	let len = str.length;
	if (len === 0) return "";
	let out = "", lastPos = 0, i = 0;
	outer: for (; i < len; i++) {
		let c = str.charCodeAt(i);
		for (; c < 128;) {
			if (noEscape[c] !== 1 && (lastPos < i && (out += str.slice(lastPos, i)), lastPos = i + 1, out += hexTable[c]), ++i === len) break outer;
			c = str.charCodeAt(i);
		}
		if (lastPos < i && (out += str.slice(lastPos, i)), c < 2048) {
			lastPos = i + 1, out += hexTable[192 | c >> 6] + hexTable[128 | c & 63];
			continue;
		}
		if (c < 55296 || c >= 57344) {
			lastPos = i + 1, out += hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
			continue;
		}
		if (++i, i >= len) throw new Error("URI malformed");
		let c2 = str.charCodeAt(i) & 1023;
		lastPos = i + 1, c = 65536 + ((c & 1023) << 10 | c2), out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
	}
	return lastPos === 0 ? str : lastPos < len ? out + str.slice(lastPos) : out;
}
function isPrototypeKey(value) {
	return value === "__proto__" || value === "constructor" || value === "prototype";
}
function getDeepObject(obj, key, nextKey, forceObject, forceArray) {
	if (isPrototypeKey(key)) return obj;
	let currObj = obj[key];
	return typeof currObj == "object" && currObj !== null ? currObj : !forceObject && (forceArray || typeof nextKey == "number" || typeof nextKey == "string" && nextKey * 0 === 0 && nextKey.indexOf(".") === -1) ? obj[key] = [] : obj[key] = {};
}
function stringifyObject(obj, options, depth = 0, parentKey, isProbableArray) {
	let { nestingSyntax = defaultOptions$1.nestingSyntax, arrayRepeat = defaultOptions$1.arrayRepeat, arrayRepeatSyntax = defaultOptions$1.arrayRepeatSyntax, nesting = defaultOptions$1.nesting, delimiter = defaultOptions$1.delimiter, valueSerializer = defaultOptions$1.valueSerializer, shouldSerializeObject = defaultOptions$1.shouldSerializeObject } = options, strDelimiter = typeof delimiter == "number" ? String.fromCharCode(delimiter) : delimiter, useArrayRepeatKey = isProbableArray === !0 && arrayRepeat, shouldUseDot = nestingSyntax === "dot" || nestingSyntax === "js" && !isProbableArray;
	if (depth > MAX_DEPTH) return "";
	let result = "", firstKey = !0, valueIsProbableArray = !1;
	for (let key in obj) {
		let value = obj[key];
		if (value === void 0) continue;
		let path;
		parentKey ? (path = parentKey, useArrayRepeatKey ? arrayRepeatSyntax === "bracket" && (path += strBracketPair) : shouldUseDot ? (path += strDot, path += key) : (path += strBracketLeft, path += key, path += strBracketRight)) : path = key, firstKey || (result += strDelimiter), typeof value == "object" && value !== null && !shouldSerializeObject(value) ? (valueIsProbableArray = value.pop !== void 0, (nesting || arrayRepeat && valueIsProbableArray) && (result += stringifyObject(value, options, depth + 1, path, valueIsProbableArray))) : (result += encodeString(path), result += "=", result += valueSerializer(value, key)), firstKey && (firstKey = !1);
	}
	return result;
}
function decodeURIComponent$1(uri) {
	let percentPosition = uri.indexOf("%");
	if (percentPosition === -1) return uri;
	let length = uri.length, decoded = "", last = 0, codepoint = 0, startOfOctets = percentPosition, state = 12;
	for (; percentPosition > -1 && percentPosition < length;) {
		let byte = hexCodeToInt(uri[percentPosition + 1], 4) | hexCodeToInt(uri[percentPosition + 2], 0), type = UTF8_DATA[byte];
		if (state = UTF8_DATA[256 + state + type], codepoint = codepoint << 6 | byte & UTF8_DATA[364 + type], state === 12) decoded += uri.slice(last, startOfOctets), decoded += codepoint <= 65535 ? String.fromCharCode(codepoint) : String.fromCharCode(55232 + (codepoint >> 10), 56320 + (codepoint & 1023)), codepoint = 0, last = percentPosition + 3, percentPosition = startOfOctets = uri.indexOf("%", last);
		else {
			if (state === 0) return null;
			if (percentPosition += 3, percentPosition < length && uri.charCodeAt(percentPosition) === 37) continue;
			return null;
		}
	}
	return decoded + uri.slice(last);
}
function hexCodeToInt(c, shift) {
	let i = HEX[c];
	return i === void 0 ? 255 : i << shift;
}
function computeKeySlice(input, startIndex, endIndex, keyHasPlus, shouldDecodeKey) {
	let chunk = input.substring(startIndex, endIndex);
	return keyHasPlus && (chunk = chunk.replace(regexPlus, " ")), shouldDecodeKey && (chunk = decodeURIComponent$1(chunk) || chunk), chunk;
}
function parse$2(input, options) {
	let { valueDeserializer = defaultOptions$1.valueDeserializer, keyDeserializer = defaultOptions$1.keyDeserializer, arrayRepeatSyntax = defaultOptions$1.arrayRepeatSyntax, nesting = defaultOptions$1.nesting, arrayRepeat = defaultOptions$1.arrayRepeat, nestingSyntax = defaultOptions$1.nestingSyntax, delimiter = defaultOptions$1.delimiter } = options ?? {}, charDelimiter = typeof delimiter == "string" ? delimiter.charCodeAt(0) : delimiter, isJsNestingSyntax = nestingSyntax === "js", result = new Empty();
	if (typeof input != "string") return result;
	let inputLength = input.length, value = "", startingIndex = -1, equalityIndex = -1, keySeparatorIndex = -1, currentObj = result, lastKey, currentKey = "", keyChunk = "", shouldDecodeKey = !1, shouldDecodeValue = !1, keyHasPlus = !1, valueHasPlus = !1, keyIsDot = !1, hasBothKeyValuePair = !1, c = 0, arrayRepeatBracketIndex = -1, prevIndex = -1, prevChar = -1;
	for (let i = 0; i < inputLength + 1; i++) {
		if (c = i !== inputLength ? input.charCodeAt(i) : charDelimiter, c === charDelimiter) {
			if (hasBothKeyValuePair = equalityIndex > startingIndex, hasBothKeyValuePair || (equalityIndex = i), keySeparatorIndex !== equalityIndex - 1 && (keyChunk = computeKeySlice(input, keySeparatorIndex + 1, arrayRepeatBracketIndex > -1 ? arrayRepeatBracketIndex : equalityIndex, keyHasPlus, shouldDecodeKey), currentKey = keyDeserializer(keyChunk), lastKey !== void 0 && (currentObj = getDeepObject(currentObj, lastKey, currentKey, isJsNestingSyntax && keyIsDot, void 0))), hasBothKeyValuePair || currentKey !== "") {
				hasBothKeyValuePair && (value = input.slice(equalityIndex + 1, i), valueHasPlus && (value = value.replace(regexPlus, " ")), shouldDecodeValue && (value = decodeURIComponent$1(value) || value));
				let newValue = valueDeserializer(value, currentKey);
				if (arrayRepeat) {
					let currentValue = currentObj[currentKey];
					currentValue === void 0 ? arrayRepeatBracketIndex > -1 ? currentObj[currentKey] = [newValue] : currentObj[currentKey] = newValue : currentValue.pop ? currentValue.push(newValue) : currentObj[currentKey] = [currentValue, newValue];
				} else currentObj[currentKey] = newValue;
			}
			value = "", startingIndex = i, equalityIndex = i, shouldDecodeKey = !1, shouldDecodeValue = !1, keyHasPlus = !1, valueHasPlus = !1, keyIsDot = !1, arrayRepeatBracketIndex = -1, keySeparatorIndex = i, currentObj = result, lastKey = void 0, currentKey = "";
		} else c === 93 ? (arrayRepeat && arrayRepeatSyntax === "bracket" && prevChar === 91 && (arrayRepeatBracketIndex = prevIndex), nesting && (nestingSyntax === "index" || isJsNestingSyntax) && equalityIndex <= startingIndex && (keySeparatorIndex !== prevIndex && (keyChunk = computeKeySlice(input, keySeparatorIndex + 1, i, keyHasPlus, shouldDecodeKey), currentKey = keyDeserializer(keyChunk), lastKey !== void 0 && (currentObj = getDeepObject(currentObj, lastKey, currentKey, void 0, void 0)), lastKey = currentKey, keyHasPlus = !1, shouldDecodeKey = !1), keySeparatorIndex = i, keyIsDot = !1)) : c === 46 ? nesting && (nestingSyntax === "dot" || isJsNestingSyntax) && equalityIndex <= startingIndex && (keySeparatorIndex !== prevIndex && (keyChunk = computeKeySlice(input, keySeparatorIndex + 1, i, keyHasPlus, shouldDecodeKey), currentKey = keyDeserializer(keyChunk), lastKey !== void 0 && (currentObj = getDeepObject(currentObj, lastKey, currentKey, isJsNestingSyntax)), lastKey = currentKey, keyHasPlus = !1, shouldDecodeKey = !1), keyIsDot = !0, keySeparatorIndex = i) : c === 91 ? nesting && (nestingSyntax === "index" || isJsNestingSyntax) && equalityIndex <= startingIndex && (keySeparatorIndex !== prevIndex && (keyChunk = computeKeySlice(input, keySeparatorIndex + 1, i, keyHasPlus, shouldDecodeKey), currentKey = keyDeserializer(keyChunk), isJsNestingSyntax && lastKey !== void 0 && (currentObj = getDeepObject(currentObj, lastKey, currentKey, isJsNestingSyntax)), lastKey = currentKey, keyHasPlus = !1, shouldDecodeKey = !1, keyIsDot = !1), keySeparatorIndex = i) : c === 61 ? equalityIndex <= startingIndex ? equalityIndex = i : shouldDecodeValue = !0 : c === 43 ? equalityIndex > startingIndex ? valueHasPlus = !0 : keyHasPlus = !0 : c === 37 && (equalityIndex > startingIndex ? shouldDecodeValue = !0 : shouldDecodeKey = !0);
		prevIndex = i, prevChar = c;
	}
	return result;
}
function stringify$1(input, options) {
	return input === null || typeof input != "object" ? "" : stringifyObject(input, options ?? {});
}
var hexTable, noEscape, defaultValueSerializer, defaultShouldSerializeObject, identityFunc, defaultOptions$1, MAX_DEPTH, strBracketPair, strBracketLeft, strBracketRight, strDot, UTF8_DATA, HEX, regexPlus, Empty;
function init_chunk_SFVA4SBT() {
	return (init_chunk_SFVA4SBT = __esmMin((() => {
		hexTable = Array.from({ length: 256 }, (_, i) => "%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
		noEscape = new Int8Array([
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			0,
			1,
			1,
			1,
			1,
			0,
			0,
			1,
			1,
			0,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			0,
			0,
			0,
			1,
			0
		]);
		defaultValueSerializer = (value) => {
			switch (typeof value) {
				case "string": return encodeString(value);
				case "bigint":
				case "boolean": return "" + value;
				case "number": if (Number.isFinite(value)) return value < 1e21 ? "" + value : encodeString("" + value);
			}
			return value instanceof Date ? encodeString(value.toISOString()) : "";
		};
		defaultShouldSerializeObject = (val) => val instanceof Date;
		identityFunc = (v) => v;
		defaultOptions$1 = {
			nesting: !0,
			nestingSyntax: "dot",
			arrayRepeat: !1,
			arrayRepeatSyntax: "repeat",
			delimiter: 38,
			valueDeserializer: identityFunc,
			valueSerializer: defaultValueSerializer,
			keyDeserializer: identityFunc,
			shouldSerializeObject: defaultShouldSerializeObject
		};
		MAX_DEPTH = 20;
		strBracketPair = "[]";
		strBracketLeft = "[";
		strBracketRight = "]";
		strDot = ".";
		UTF8_DATA = [
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			2,
			2,
			2,
			2,
			2,
			2,
			2,
			2,
			2,
			2,
			2,
			2,
			2,
			2,
			2,
			2,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			3,
			4,
			4,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			5,
			6,
			7,
			7,
			7,
			7,
			7,
			7,
			7,
			7,
			7,
			7,
			7,
			7,
			8,
			7,
			7,
			10,
			9,
			9,
			9,
			11,
			4,
			4,
			4,
			4,
			4,
			4,
			4,
			4,
			4,
			4,
			4,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			12,
			0,
			0,
			0,
			0,
			24,
			36,
			48,
			60,
			72,
			84,
			96,
			0,
			12,
			12,
			12,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			24,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			24,
			24,
			24,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			24,
			24,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			48,
			48,
			48,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			48,
			48,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			48,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			127,
			63,
			63,
			63,
			0,
			31,
			15,
			15,
			15,
			7,
			7,
			7
		];
		HEX = {
			0: 0,
			1: 1,
			2: 2,
			3: 3,
			4: 4,
			5: 5,
			6: 6,
			7: 7,
			8: 8,
			9: 9,
			a: 10,
			A: 10,
			b: 11,
			B: 11,
			c: 12,
			C: 12,
			d: 13,
			D: 13,
			e: 14,
			E: 14,
			f: 15,
			F: 15
		};
		regexPlus = /\+/g;
		Empty = function() {};
		Empty.prototype = /* @__PURE__ */ Object.create(null);
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@storybook+icons@2.2.0_react@19.2.5/node_modules/@storybook/icons/dist/index.js
var import_react$186, LightningOffIcon, CrossIcon, CloseIcon, FailedIcon, ChevronRightIcon, ChevronSmallLeftIcon, ChevronSmallRightIcon, RefreshIcon;
function init_dist() {
	return (init_dist = __esmMin((() => {
		import_react$186 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		LightningOffIcon = /* @__PURE__ */ import_react$186.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
			return /* @__PURE__ */ import_react$186.createElement("svg", {
				width: size,
				height: size,
				viewBox: "0 0 14 14",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				ref: forwardedRef,
				...props
			}, /* @__PURE__ */ import_react$186.createElement("path", {
				d: "M10.139 8.725l1.36-1.323a.568.568 0 00.151-.54.534.534 0 00-.377-.396l-2.705-.708 2.22-4.976a.568.568 0 00-.15-.666.497.497 0 00-.648.008L5.464 4.05l.708.71 2.848-2.47-1.64 3.677.697.697 2.164.567-.81.787.708.708zM2.523 6.6a.566.566 0 00-.177.544.534.534 0 00.382.41l2.782.721-1.494 5.013a.563.563 0 00.217.627.496.496 0 00.629-.06l3.843-3.736-.708-.707-2.51 2.44 1.137-3.814-.685-.685-2.125-.55.844-.731-.71-.71L2.524 6.6zM1.854 1.146a.5.5 0 10-.708.708l11 11a.5.5 0 00.708-.708l-11-11z",
				fill: color
			}));
		});
		CrossIcon = /* @__PURE__ */ import_react$186.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
			return /* @__PURE__ */ import_react$186.createElement("svg", {
				width: size,
				height: size,
				viewBox: "0 0 14 14",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				ref: forwardedRef,
				...props
			}, /* @__PURE__ */ import_react$186.createElement("path", {
				d: "M11.146 2.146a.5.5 0 11.707.707L7.708 7l4.147 4.146a.5.5 0 11-.707.707L7 7.708l-4.146 4.147a.5.5 0 01-.707-.708L6.293 7 2.147 2.853a.5.5 0 11.707-.707L7 6.293l4.146-4.147z",
				fill: color
			}));
		});
		CloseIcon = /* @__PURE__ */ import_react$186.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
			return /* @__PURE__ */ import_react$186.createElement("svg", {
				width: size,
				height: size,
				viewBox: "0 0 14 14",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				ref: forwardedRef,
				...props
			}, /* @__PURE__ */ import_react$186.createElement("path", {
				d: "M9.854 4.146a.5.5 0 010 .708L7.707 7l2.147 2.146a.5.5 0 01-.708.708L7 7.707 4.854 9.854a.5.5 0 01-.708-.708L6.293 7 4.146 4.854a.5.5 0 11.708-.708L7 6.293l2.146-2.147a.5.5 0 01.708 0z",
				fill: color
			}), /* @__PURE__ */ import_react$186.createElement("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M7 14A7 7 0 107 0a7 7 0 000 14zm0-1A6 6 0 107 1a6 6 0 000 12z",
				fill: color
			}));
		});
		FailedIcon = /* @__PURE__ */ import_react$186.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
			return /* @__PURE__ */ import_react$186.createElement("svg", {
				width: size,
				height: size,
				viewBox: "0 0 14 14",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				ref: forwardedRef,
				...props
			}, /* @__PURE__ */ import_react$186.createElement("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M7 14A7 7 0 107 0a7 7 0 000 14zm2.854-9.854a.5.5 0 010 .708L7.707 7l2.147 2.146a.5.5 0 01-.708.708L7 7.707 4.854 9.854a.5.5 0 01-.708-.708L6.293 7 4.146 4.854a.5.5 0 11.708-.708L7 6.293l2.146-2.147a.5.5 0 01.708 0z",
				fill: color
			}));
		});
		ChevronRightIcon = /* @__PURE__ */ import_react$186.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
			return /* @__PURE__ */ import_react$186.createElement("svg", {
				width: size,
				height: size,
				viewBox: "0 0 14 14",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				ref: forwardedRef,
				...props
			}, /* @__PURE__ */ import_react$186.createElement("path", {
				d: "M11.104 7.354l-5.5 5.5a.5.5 0 01-.708-.708L10.043 7 4.896 1.854a.5.5 0 11.708-.708l5.5 5.5a.5.5 0 010 .708z",
				fill: color
			}));
		});
		ChevronSmallLeftIcon = /* @__PURE__ */ import_react$186.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
			return /* @__PURE__ */ import_react$186.createElement("svg", {
				width: size,
				height: size,
				viewBox: "0 0 14 14",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				ref: forwardedRef,
				...props
			}, /* @__PURE__ */ import_react$186.createElement("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M9.104 10.146a.5.5 0 01-.708.708l-3.5-3.5a.5.5 0 010-.708l3.5-3.5a.5.5 0 11.708.708L5.957 7l3.147 3.146z",
				fill: color
			}));
		});
		ChevronSmallRightIcon = /* @__PURE__ */ import_react$186.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
			return /* @__PURE__ */ import_react$186.createElement("svg", {
				width: size,
				height: size,
				viewBox: "0 0 14 14",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				ref: forwardedRef,
				...props
			}, /* @__PURE__ */ import_react$186.createElement("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M4.896 10.146a.5.5 0 00.708.708l3.5-3.5a.5.5 0 000-.708l-3.5-3.5a.5.5 0 10-.708.708L8.043 7l-3.147 3.146z",
				fill: color
			}));
		});
		RefreshIcon = /* @__PURE__ */ import_react$186.forwardRef(({ color = "currentColor", size = 14, ...props }, forwardedRef) => {
			return /* @__PURE__ */ import_react$186.createElement("svg", {
				width: size,
				height: size,
				viewBox: "0 0 14 14",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				ref: forwardedRef,
				...props
			}, /* @__PURE__ */ import_react$186.createElement("path", {
				d: "M7.092.5H7a6.5 6.5 0 106.41 7.583.5.5 0 10-.986-.166A5.495 5.495 0 017 12.5a5.5 5.5 0 010-11h.006a5.5 5.5 0 014.894 3H10a.5.5 0 000 1h3a.5.5 0 00.5-.5V2a.5.5 0 00-1 0v1.535A6.495 6.495 0 007.092.5z",
				fill: color
			}));
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.6.2_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-MOVZJCSM.js
function extractEventHiddenProperties(event) {
	let rebuildEvent = eventProperties.filter((value) => event[value] !== void 0).reduce((acc, value) => (acc[value] = event[value], acc), {});
	if (event instanceof CustomEvent) for (let value of customEventSpecificProperties.filter((value2) => event[value2] !== void 0)) rebuildEvent[value] = event[value];
	return rebuildEvent;
}
function isObject(val) {
	return val != null && typeof val == "object" && Array.isArray(val) === !1;
}
function getRawTag(value) {
	var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
	try {
		value[symToStringTag] = void 0;
		var unmasked = !0;
	} catch {}
	var result = nativeObjectToString.call(value);
	return unmasked && (isOwn ? value[symToStringTag] = tag : delete value[symToStringTag]), result;
}
function objectToString(value) {
	return nativeObjectToString2.call(value);
}
function baseGetTag(value) {
	return value == null ? value === void 0 ? undefinedTag : nullTag : symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
}
function isObjectLike(value) {
	return value != null && typeof value == "object";
}
function isSymbol(value) {
	return typeof value == "symbol" || isObjectLike_default(value) && baseGetTag_default(value) == symbolTag;
}
function arrayMap(array, iteratee) {
	for (var index = -1, length = array == null ? 0 : array.length, result = Array(length); ++index < length;) result[index] = iteratee(array[index], index, array);
	return result;
}
function baseToString(value) {
	if (typeof value == "string") return value;
	if (isArray_default(value)) return arrayMap_default(value, baseToString) + "";
	if (isSymbol_default(value)) return symbolToString ? symbolToString.call(value) : "";
	var result = value + "";
	return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
function isObject2(value) {
	var type = typeof value;
	return value != null && (type == "object" || type == "function");
}
function isFunction$1(value) {
	if (!isObject_default(value)) return !1;
	var tag = baseGetTag_default(value);
	return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
function isMasked(func) {
	return !!maskSrcKey && maskSrcKey in func;
}
function toSource(func) {
	if (func != null) {
		try {
			return funcToString.call(func);
		} catch {}
		try {
			return func + "";
		} catch {}
	}
	return "";
}
function baseIsNative(value) {
	if (!isObject_default(value) || isMasked_default(value)) return !1;
	return (isFunction_default(value) ? reIsNative : reIsHostCtor).test(toSource_default(value));
}
function getValue(object, key) {
	return object?.[key];
}
function getNative(object, key) {
	var value = getValue_default(object, key);
	return baseIsNative_default(value) ? value : void 0;
}
function eq(value, other) {
	return value === other || value !== value && other !== other;
}
function isKey(value, object) {
	if (isArray_default(value)) return !1;
	var type = typeof value;
	return type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol_default(value) ? !0 : reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
function hashClear() {
	this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {}, this.size = 0;
}
function hashDelete(key) {
	var result = this.has(key) && delete this.__data__[key];
	return this.size -= result ? 1 : 0, result;
}
function hashGet(key) {
	var data = this.__data__;
	if (nativeCreate_default) {
		var result = data[key];
		return result === HASH_UNDEFINED ? void 0 : result;
	}
	return hasOwnProperty3.call(data, key) ? data[key] : void 0;
}
function hashHas(key) {
	var data = this.__data__;
	return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty4.call(data, key);
}
function hashSet(key, value) {
	var data = this.__data__;
	return this.size += this.has(key) ? 0 : 1, data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value, this;
}
function Hash(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	for (this.clear(); ++index < length;) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
function listCacheClear() {
	this.__data__ = [], this.size = 0;
}
function assocIndexOf(array, key) {
	for (var length = array.length; length--;) if (eq_default(array[length][0], key)) return length;
	return -1;
}
function listCacheDelete(key) {
	var data = this.__data__, index = assocIndexOf_default(data, key);
	if (index < 0) return !1;
	return index == data.length - 1 ? data.pop() : splice.call(data, index, 1), --this.size, !0;
}
function listCacheGet(key) {
	var data = this.__data__, index = assocIndexOf_default(data, key);
	return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
	return assocIndexOf_default(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
	var data = this.__data__, index = assocIndexOf_default(data, key);
	return index < 0 ? (++this.size, data.push([key, value])) : data[index][1] = value, this;
}
function ListCache(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	for (this.clear(); ++index < length;) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
function mapCacheClear() {
	this.size = 0, this.__data__ = {
		hash: new Hash_default(),
		map: new (Map_default || ListCache_default)(),
		string: new Hash_default()
	};
}
function isKeyable(value) {
	var type = typeof value;
	return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map, key) {
	var data = map.__data__;
	return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
	var result = getMapData_default(this, key).delete(key);
	return this.size -= result ? 1 : 0, result;
}
function mapCacheGet(key) {
	return getMapData_default(this, key).get(key);
}
function mapCacheHas(key) {
	return getMapData_default(this, key).has(key);
}
function mapCacheSet(key, value) {
	var data = getMapData_default(this, key), size = data.size;
	return data.set(key, value), this.size += data.size == size ? 0 : 1, this;
}
function MapCache(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	for (this.clear(); ++index < length;) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
function memoize$1(func, resolver) {
	if (typeof func != "function" || resolver != null && typeof resolver != "function") throw new TypeError(FUNC_ERROR_TEXT);
	var memoized = function() {
		var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
		if (cache.has(key)) return cache.get(key);
		var result = func.apply(this, args);
		return memoized.cache = cache.set(key, result) || cache, result;
	};
	return memoized.cache = new (memoize$1.Cache || MapCache_default)(), memoized;
}
function memoizeCapped(func) {
	var result = memoize_default(func, function(key) {
		return cache.size === MAX_MEMOIZE_SIZE && cache.clear(), key;
	}), cache = result.cache;
	return result;
}
function toString(value) {
	return value == null ? "" : baseToString_default(value);
}
function castPath(value, object) {
	return isArray_default(value) ? value : isKey_default(value, object) ? [value] : stringToPath_default(toString_default(value));
}
function toKey(value) {
	if (typeof value == "string" || isSymbol_default(value)) return value;
	var result = value + "";
	return result == "0" && 1 / value == -INFINITY2 ? "-0" : result;
}
function baseGet(object, path) {
	path = castPath_default(path, object);
	for (var index = 0, length = path.length; object != null && index < length;) object = object[toKey_default(path[index++])];
	return index && index == length ? object : void 0;
}
function get$1(object, path, defaultValue) {
	var result = object == null ? void 0 : baseGet_default(object, path);
	return result === void 0 ? defaultValue : result;
}
function convertUnconventionalData(data) {
	if (!isObject3(data)) return data;
	let result = data, wasMutated = !1;
	return typeof Event < "u" && data instanceof Event && (result = extractEventHiddenProperties(result), wasMutated = !0), result = Object.keys(result).reduce((acc, key) => {
		try {
			result[key] && result[key].toJSON, acc[key] = result[key];
		} catch {
			wasMutated = !0;
		}
		return acc;
	}, {}), wasMutated ? result : data;
}
var instances, CHANNEL_EVENT_PREFIX, ProgressState, _UniversalStore, UniversalStore, __create, __defProp, __getOwnPropDesc, __getOwnPropNames, __getProtoOf, __hasOwnProp, __commonJS, __copyProps, __toESM, eventProperties, customEventSpecificProperties, require_es_object_atoms, require_es_errors, require_eval, require_range$1, require_ref, require_syntax, require_type, require_uri, require_abs, require_floor, require_max, require_min, require_pow, require_round, require_isNaN, require_sign, require_gOPD, require_gopd, require_es_define_property, require_shams, require_has_symbols, require_Reflect_getPrototypeOf, require_Object_getPrototypeOf, require_implementation, require_function_bind, require_functionCall, require_functionApply, require_reflectApply, require_actualApply, require_call_bind_apply_helpers, require_get, require_get_proto, require_hasown, require_get_intrinsic, require_call_bound, require_shams2, require_is_regex, require_is_function, require_safe_regex_test, require_is_symbol, import_is_regex, import_is_function, import_is_symbol, freeGlobal_default, freeSelf, root_default, Symbol_default, objectProto, hasOwnProperty, nativeObjectToString, symToStringTag, getRawTag_default, nativeObjectToString2, objectToString_default, nullTag, undefinedTag, symToStringTag2, baseGetTag_default, isObjectLike_default, symbolTag, isSymbol_default, arrayMap_default, isArray_default, INFINITY, symbolProto, symbolToString, baseToString_default, isObject_default, asyncTag, funcTag, genTag, proxyTag, isFunction_default, coreJsData_default, maskSrcKey, isMasked_default, funcToString, toSource_default, reRegExpChar, reIsHostCtor, funcProto2, objectProto3, funcToString2, hasOwnProperty2, reIsNative, baseIsNative_default, getValue_default, getNative_default, eq_default, reIsDeepProp, reIsPlainProp, isKey_default, nativeCreate_default, hashClear_default, hashDelete_default, HASH_UNDEFINED, hasOwnProperty3, hashGet_default, hasOwnProperty4, hashHas_default, HASH_UNDEFINED2, hashSet_default, Hash_default, listCacheClear_default, assocIndexOf_default, splice, listCacheDelete_default, listCacheGet_default, listCacheHas_default, listCacheSet_default, ListCache_default, Map_default, mapCacheClear_default, isKeyable_default, getMapData_default, mapCacheDelete_default, mapCacheGet_default, mapCacheHas_default, mapCacheSet_default, MapCache_default, FUNC_ERROR_TEXT, memoize_default, MAX_MEMOIZE_SIZE, memoizeCapped_default, rePropName, reEscapeChar, stringToPath_default, toString_default, castPath_default, INFINITY2, toKey_default, baseGet_default, get_default, isObject3, dateFormat, isJSON, replacer, reviver, defaultOptions, stringify, mutator, parse$1;
function init_chunk_MOVZJCSM() {
	return (init_chunk_MOVZJCSM = __esmMin((() => {
		init_chunk_MI5GWNNC();
		instances = /* @__PURE__ */ new Map();
		CHANNEL_EVENT_PREFIX = "UNIVERSAL_STORE:";
		ProgressState = {
			PENDING: "PENDING",
			RESOLVED: "RESOLVED",
			REJECTED: "REJECTED"
		};
		_UniversalStore = class _UniversalStore {
			constructor(options, environmentOverrides) {
				/** Enable debug logs for this store */
				this.debugging = !1;
				this.listeners = /* @__PURE__ */ new Map([["*", /* @__PURE__ */ new Set()]]);
				/** Gets the current state */
				this.getState = () => (this.debug("getState", { state: this.state }), this.state);
				/**
				* Subscribes to store events
				*
				* @returns A function to unsubscribe
				*/
				this.subscribe = (eventTypeOrListener, maybeListener) => {
					let subscribesToAllEvents = typeof eventTypeOrListener == "function", eventType = subscribesToAllEvents ? "*" : eventTypeOrListener, listener = subscribesToAllEvents ? eventTypeOrListener : maybeListener;
					if (this.debug("subscribe", {
						eventType,
						listener
					}), !listener) throw new TypeError(`Missing first subscribe argument, or second if first is the event type, when subscribing to a UniversalStore with id '${this.id}'`);
					return this.listeners.has(eventType) || this.listeners.set(eventType, /* @__PURE__ */ new Set()), this.listeners.get(eventType).add(listener), () => {
						this.debug("unsubscribe", {
							eventType,
							listener
						}), this.listeners.has(eventType) && (this.listeners.get(eventType).delete(listener), this.listeners.get(eventType)?.size === 0 && this.listeners.delete(eventType));
					};
				};
				/** Sends a custom event to the other stores */
				this.send = (event) => {
					if (this.debug("send", { event }), this.status !== _UniversalStore.Status.READY) throw new TypeError(dedent`Cannot send event before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify({
						event,
						id: this.id,
						actor: this.actor,
						environment: this.environment
					}, null, 2)}`);
					this.emitToListeners(event, { actor: this.actor }), this.emitToChannel(event, { actor: this.actor });
				};
				if (this.debugging = options.debug ?? !1, !_UniversalStore.isInternalConstructing) throw new TypeError("UniversalStore is not constructable - use UniversalStore.create() instead");
				if (_UniversalStore.isInternalConstructing = !1, this.id = options.id, this.actorId = Date.now().toString(36) + Math.random().toString(36).substring(2), this.actorType = options.leader ? _UniversalStore.ActorType.LEADER : _UniversalStore.ActorType.FOLLOWER, this.state = options.initialState, this.channelEventName = `${CHANNEL_EVENT_PREFIX}${this.id}`, this.debug("constructor", {
					options,
					environmentOverrides,
					channelEventName: this.channelEventName
				}), this.actor.type === _UniversalStore.ActorType.LEADER) this.syncing = {
					state: ProgressState.RESOLVED,
					promise: Promise.resolve()
				};
				else {
					let syncingResolve, syncingReject, syncingPromise = new Promise((resolve, reject) => {
						syncingResolve = () => {
							this.syncing.state === ProgressState.PENDING && (this.syncing.state = ProgressState.RESOLVED, resolve());
						}, syncingReject = (reason) => {
							this.syncing.state === ProgressState.PENDING && (this.syncing.state = ProgressState.REJECTED, reject(reason));
						};
					});
					this.syncing = {
						state: ProgressState.PENDING,
						promise: syncingPromise,
						resolve: syncingResolve,
						reject: syncingReject
					};
				}
				this.getState = this.getState.bind(this), this.setState = this.setState.bind(this), this.subscribe = this.subscribe.bind(this), this.onStateChange = this.onStateChange.bind(this), this.send = this.send.bind(this), this.emitToChannel = this.emitToChannel.bind(this), this.prepareThis = this.prepareThis.bind(this), this.emitToListeners = this.emitToListeners.bind(this), this.handleChannelEvents = this.handleChannelEvents.bind(this), this.debug = this.debug.bind(this), this.channel = environmentOverrides?.channel ?? _UniversalStore.preparation.channel, this.environment = environmentOverrides?.environment ?? _UniversalStore.preparation.environment, this.channel && this.environment ? (environmentOverrides || _UniversalStore.preparation.resolve({
					channel: this.channel,
					environment: this.environment
				}), this.prepareThis({
					channel: this.channel,
					environment: this.environment
				})) : _UniversalStore.preparation.promise.then(this.prepareThis);
			}
			/** The environment this realm was prepared as, or `undefined` before `__prepare`. */
			static get preparedEnvironment() {
				return _UniversalStore.preparation.environment;
			}
			static setupPreparationPromise() {
				let resolveRef, rejectRef, promise = new Promise((resolve, reject) => {
					resolveRef = (args) => {
						resolve(args);
					}, rejectRef = (...args) => {
						reject(args);
					};
				});
				_UniversalStore.preparation = {
					resolve: resolveRef,
					reject: rejectRef,
					promise
				};
			}
			/** The actor object representing the store instance with a unique ID and a type */
			get actor() {
				return Object.freeze({
					id: this.actorId,
					type: this.actorType,
					environment: this.environment ?? _UniversalStore.Environment.UNKNOWN
				});
			}
			/**
			* The current state of the store, that signals both if the store is prepared by Storybook and
			* also - in the case of a follower - if the state has been synced with the leader's state.
			*/
			get status() {
				if (!this.channel || !this.environment) return _UniversalStore.Status.UNPREPARED;
				switch (this.syncing?.state) {
					case ProgressState.PENDING:
					case void 0: return _UniversalStore.Status.SYNCING;
					case ProgressState.REJECTED: return _UniversalStore.Status.ERROR;
					case ProgressState.RESOLVED:
					default: return _UniversalStore.Status.READY;
				}
			}
			/**
			* A promise that resolves when the store is fully ready. A leader will be ready when the store
			* has been prepared by Storybook, which is almost instantly.
			*
			* A follower will be ready when the state has been synced with the leader's state, within a few
			* hundred milliseconds.
			*/
			untilReady() {
				let preparation = this.channel && this.environment ? Promise.resolve() : _UniversalStore.preparation.promise;
				return Promise.all([preparation, this.syncing?.promise]);
			}
			/** Creates a new instance of UniversalStore */
			static create(options) {
				if (!options || typeof options?.id != "string") throw new TypeError("id is required and must be a string, when creating a UniversalStore");
				options.debug && console.debug(dedent`[UniversalStore]
        create`, { options });
				let existing = instances.get(options.id);
				if (existing) return console.warn(dedent`UniversalStore with id "${options.id}" already exists in this environment, re-using existing.
        You should reuse the existing instance instead of trying to create a new one.`), existing;
				_UniversalStore.isInternalConstructing = !0;
				let store = new _UniversalStore(options);
				return instances.set(options.id, store), store;
			}
			/**
			* Used by Storybook to set the channel for all instances of UniversalStore in the given
			* environment.
			*
			* @internal
			*/
			static __prepare(channel, environment) {
				_UniversalStore.preparation.channel = channel, _UniversalStore.preparation.environment = environment, _UniversalStore.preparation.resolve({
					channel,
					environment
				});
			}
			/**
			* Updates the store's state
			*
			* Either a new state or a state updater function can be passed to the method.
			*/
			setState(updater) {
				let previousState = this.state, newState = typeof updater == "function" ? updater(previousState) : updater;
				if (this.debug("setState", {
					newState,
					previousState,
					updater
				}), this.status !== _UniversalStore.Status.READY) throw new TypeError(dedent`Cannot set state before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify({
					newState,
					id: this.id,
					actor: this.actor,
					environment: this.environment
				}, null, 2)}`);
				this.state = newState;
				let event = {
					type: _UniversalStore.InternalEventType.SET_STATE,
					payload: {
						state: newState,
						previousState
					}
				};
				this.emitToChannel(event, { actor: this.actor }), this.emitToListeners(event, { actor: this.actor });
			}
			/**
			* Subscribes to state changes
			*
			* @returns Unsubscribe function
			*/
			onStateChange(listener) {
				return this.debug("onStateChange", { listener }), this.subscribe(_UniversalStore.InternalEventType.SET_STATE, ({ payload }, eventInfo) => {
					listener(payload.state, payload.previousState, eventInfo);
				});
			}
			emitToChannel(event, eventInfo) {
				this.debug("emitToChannel", {
					event,
					eventInfo,
					channel: !!this.channel
				}), this.channel?.emit(this.channelEventName, {
					event,
					eventInfo
				});
			}
			prepareThis({ channel, environment }) {
				this.channel = channel, this.environment = environment, this.debug("prepared", {
					channel: !!channel,
					environment
				}), this.channel.on(this.channelEventName, this.handleChannelEvents), this.actor.type === _UniversalStore.ActorType.LEADER ? this.emitToChannel({ type: _UniversalStore.InternalEventType.LEADER_CREATED }, { actor: this.actor }) : (this.emitToChannel({ type: _UniversalStore.InternalEventType.FOLLOWER_CREATED }, { actor: this.actor }), this.emitToChannel({ type: _UniversalStore.InternalEventType.EXISTING_STATE_REQUEST }, { actor: this.actor }), setTimeout(() => {
					this.syncing.reject(new UniversalStoreFollowerTimeoutError(this.id));
				}, 1e3));
			}
			emitToListeners(event, eventInfo) {
				let eventTypeListeners = this.listeners.get(event.type), everythingListeners = this.listeners.get("*");
				this.debug("emitToListeners", {
					event,
					eventInfo,
					eventTypeListeners,
					everythingListeners
				}), [...eventTypeListeners ?? [], ...everythingListeners ?? []].forEach((listener) => listener(event, eventInfo));
			}
			handleChannelEvents(channelEvent) {
				let { event, eventInfo } = channelEvent;
				if ([eventInfo.actor.id, eventInfo.forwardingActor?.id].includes(this.actor.id)) {
					this.debug("handleChannelEvents: Ignoring event from self", { channelEvent });
					return;
				} else if (this.syncing?.state === ProgressState.PENDING && event.type !== _UniversalStore.InternalEventType.EXISTING_STATE_RESPONSE) {
					this.debug("handleChannelEvents: Ignoring event while syncing", { channelEvent });
					return;
				}
				if (this.debug("handleChannelEvents", { channelEvent }), this.actor.type === _UniversalStore.ActorType.LEADER) {
					let shouldForwardEvent = !0;
					switch (event.type) {
						case _UniversalStore.InternalEventType.EXISTING_STATE_REQUEST:
							shouldForwardEvent = !1;
							let responseEvent = {
								type: _UniversalStore.InternalEventType.EXISTING_STATE_RESPONSE,
								payload: this.state
							};
							this.debug("handleChannelEvents: responding to existing state request", { responseEvent }), this.emitToChannel(responseEvent, { actor: this.actor }), this.emitToListeners(responseEvent, { actor: this.actor });
							break;
						case _UniversalStore.InternalEventType.LEADER_CREATED: shouldForwardEvent = !1, this.syncing.state = ProgressState.REJECTED, this.debug("handleChannelEvents: erroring due to second leader being created", { event }), console.error(dedent`Detected multiple UniversalStore leaders created with the same id "${this.id}".
            Only one leader can exists at a time, your stores are now in an invalid state.
            Leaders detected:
            this: ${JSON.stringify(this.actor, null, 2)}
            other: ${JSON.stringify(eventInfo.actor, null, 2)}`);
					}
					shouldForwardEvent && (this.debug("handleChannelEvents: forwarding event", { channelEvent }), this.emitToChannel(event, {
						actor: eventInfo.actor,
						forwardingActor: this.actor
					}));
				}
				if (this.actor.type === _UniversalStore.ActorType.FOLLOWER) switch (event.type) {
					case _UniversalStore.InternalEventType.EXISTING_STATE_RESPONSE:
						if (this.debug("handleChannelEvents: Setting state from leader's existing state response", { event }), this.syncing?.state !== ProgressState.PENDING) break;
						this.syncing.resolve?.();
						let setStateEvent = {
							type: _UniversalStore.InternalEventType.SET_STATE,
							payload: {
								state: event.payload,
								previousState: this.state
							}
						};
						this.state = event.payload, this.emitToListeners(setStateEvent, eventInfo);
				}
				event.type === _UniversalStore.InternalEventType.SET_STATE && (this.debug("handleChannelEvents: Setting state", { event }), this.state = event.payload.state), this.emitToListeners(event, { actor: eventInfo.actor });
			}
			debug(message, data) {
				this.debugging && console.debug(dedent`[UniversalStore::${this.id}::${this.environment ?? _UniversalStore.Environment.UNKNOWN}]
        ${message}`, JSON.stringify({
					data,
					actor: this.actor,
					state: this.state,
					status: this.status
				}, null, 2));
			}
			/**
			* Used to reset the static fields of the UniversalStore class when cleaning up tests
			*
			* @internal
			*/
			static __reset() {
				_UniversalStore.preparation.reject(/* @__PURE__ */ new Error("reset")), _UniversalStore.setupPreparationPromise(), _UniversalStore.isInternalConstructing = !1;
			}
		};
		/**
		* Defines the possible actor types in the store system
		*
		* @readonly
		*/
		_UniversalStore.ActorType = {
			LEADER: "LEADER",
			FOLLOWER: "FOLLOWER"
		}, _UniversalStore.Environment = {
			SERVER: "SERVER",
			MANAGER: "MANAGER",
			PREVIEW: "PREVIEW",
			UNKNOWN: "UNKNOWN",
			MOCK: "MOCK"
		}, _UniversalStore.InternalEventType = {
			EXISTING_STATE_REQUEST: "__EXISTING_STATE_REQUEST",
			EXISTING_STATE_RESPONSE: "__EXISTING_STATE_RESPONSE",
			SET_STATE: "__SET_STATE",
			LEADER_CREATED: "__LEADER_CREATED",
			FOLLOWER_CREATED: "__FOLLOWER_CREATED"
		}, _UniversalStore.Status = {
			UNPREPARED: "UNPREPARED",
			SYNCING: "SYNCING",
			READY: "READY",
			ERROR: "ERROR"
		}, _UniversalStore.isInternalConstructing = !1, _UniversalStore.setupPreparationPromise();
		UniversalStore = _UniversalStore;
		__create = Object.create;
		__defProp = Object.defineProperty;
		__getOwnPropDesc = Object.getOwnPropertyDescriptor;
		__getOwnPropNames = Object.getOwnPropertyNames;
		__getProtoOf = Object.getPrototypeOf;
		__hasOwnProp = Object.prototype.hasOwnProperty;
		__commonJS = (cb, mod) => function() {
			return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
		};
		__copyProps = (to, from, except, desc) => {
			if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
			return to;
		};
		__toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
			value: mod,
			enumerable: !0
		}) : target, mod));
		eventProperties = [
			"bubbles",
			"cancelBubble",
			"cancelable",
			"composed",
			"currentTarget",
			"defaultPrevented",
			"eventPhase",
			"isTrusted",
			"returnValue",
			"srcElement",
			"target",
			"timeStamp",
			"type"
		];
		customEventSpecificProperties = ["detail"];
		require_es_object_atoms = __commonJS({ "node_modules/.pnpm/es-object-atoms@1.1.1/node_modules/es-object-atoms/index.js"(exports, module) {
			"use strict";
			module.exports = Object;
		} });
		require_es_errors = __commonJS({ "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/index.js"(exports, module) {
			"use strict";
			module.exports = Error;
		} });
		require_eval = __commonJS({ "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/eval.js"(exports, module) {
			"use strict";
			module.exports = EvalError;
		} });
		require_range$1 = __commonJS({ "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/range.js"(exports, module) {
			"use strict";
			module.exports = RangeError;
		} });
		require_ref = __commonJS({ "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/ref.js"(exports, module) {
			"use strict";
			module.exports = ReferenceError;
		} });
		require_syntax = __commonJS({ "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js"(exports, module) {
			"use strict";
			module.exports = SyntaxError;
		} });
		require_type = __commonJS({ "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js"(exports, module) {
			"use strict";
			module.exports = TypeError;
		} });
		require_uri = __commonJS({ "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/uri.js"(exports, module) {
			"use strict";
			module.exports = URIError;
		} });
		require_abs = __commonJS({ "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/abs.js"(exports, module) {
			"use strict";
			module.exports = Math.abs;
		} });
		require_floor = __commonJS({ "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/floor.js"(exports, module) {
			"use strict";
			module.exports = Math.floor;
		} });
		require_max = __commonJS({ "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/max.js"(exports, module) {
			"use strict";
			module.exports = Math.max;
		} });
		require_min = __commonJS({ "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/min.js"(exports, module) {
			"use strict";
			module.exports = Math.min;
		} });
		require_pow = __commonJS({ "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/pow.js"(exports, module) {
			"use strict";
			module.exports = Math.pow;
		} });
		require_round = __commonJS({ "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/round.js"(exports, module) {
			"use strict";
			module.exports = Math.round;
		} });
		require_isNaN = __commonJS({ "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/isNaN.js"(exports, module) {
			"use strict";
			module.exports = Number.isNaN || function(a) {
				return a !== a;
			};
		} });
		require_sign = __commonJS({ "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/sign.js"(exports, module) {
			"use strict";
			var $isNaN = require_isNaN();
			module.exports = function(number) {
				return $isNaN(number) || number === 0 ? number : number < 0 ? -1 : 1;
			};
		} });
		require_gOPD = __commonJS({ "node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/gOPD.js"(exports, module) {
			"use strict";
			module.exports = Object.getOwnPropertyDescriptor;
		} });
		require_gopd = __commonJS({ "node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js"(exports, module) {
			"use strict";
			var $gOPD = require_gOPD();
			if ($gOPD) try {
				$gOPD([], "length");
			} catch {
				$gOPD = null;
			}
			module.exports = $gOPD;
		} });
		require_es_define_property = __commonJS({ "node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js"(exports, module) {
			"use strict";
			var $defineProperty = Object.defineProperty || !1;
			if ($defineProperty) try {
				$defineProperty({}, "a", { value: 1 });
			} catch {
				$defineProperty = !1;
			}
			module.exports = $defineProperty;
		} });
		require_shams = __commonJS({ "node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js"(exports, module) {
			"use strict";
			module.exports = function() {
				if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return !1;
				if (typeof Symbol.iterator == "symbol") return !0;
				var obj = {}, sym = /* @__PURE__ */ Symbol("test"), symObj = Object(sym);
				if (typeof sym == "string" || Object.prototype.toString.call(sym) !== "[object Symbol]" || Object.prototype.toString.call(symObj) !== "[object Symbol]") return !1;
				var symVal = 42;
				obj[sym] = symVal;
				for (var _ in obj) return !1;
				if (typeof Object.keys == "function" && Object.keys(obj).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(obj).length !== 0) return !1;
				var syms = Object.getOwnPropertySymbols(obj);
				if (syms.length !== 1 || syms[0] !== sym || !Object.prototype.propertyIsEnumerable.call(obj, sym)) return !1;
				if (typeof Object.getOwnPropertyDescriptor == "function") {
					var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
					if (descriptor.value !== symVal || descriptor.enumerable !== !0) return !1;
				}
				return !0;
			};
		} });
		require_has_symbols = __commonJS({ "node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/index.js"(exports, module) {
			"use strict";
			var origSymbol = typeof Symbol < "u" && Symbol, hasSymbolSham = require_shams();
			module.exports = function() {
				return typeof origSymbol != "function" || typeof Symbol != "function" || typeof origSymbol("foo") != "symbol" || typeof /* @__PURE__ */ Symbol("bar") != "symbol" ? !1 : hasSymbolSham();
			};
		} });
		require_Reflect_getPrototypeOf = __commonJS({ "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js"(exports, module) {
			"use strict";
			module.exports = typeof Reflect < "u" && Reflect.getPrototypeOf || null;
		} });
		require_Object_getPrototypeOf = __commonJS({ "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js"(exports, module) {
			"use strict";
			module.exports = require_es_object_atoms().getPrototypeOf || null;
		} });
		require_implementation = __commonJS({ "node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js"(exports, module) {
			"use strict";
			var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ", toStr = Object.prototype.toString, max = Math.max, funcType = "[object Function]", concatty = function(a, b) {
				for (var arr = [], i = 0; i < a.length; i += 1) arr[i] = a[i];
				for (var j = 0; j < b.length; j += 1) arr[j + a.length] = b[j];
				return arr;
			}, slicy = function(arrLike, offset) {
				for (var arr = [], i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) arr[j] = arrLike[i];
				return arr;
			}, joiny = function(arr, joiner) {
				for (var str = "", i = 0; i < arr.length; i += 1) str += arr[i], i + 1 < arr.length && (str += joiner);
				return str;
			};
			module.exports = function(that) {
				var target = this;
				if (typeof target != "function" || toStr.apply(target) !== funcType) throw new TypeError(ERROR_MESSAGE + target);
				for (var args = slicy(arguments, 1), bound, binder = function() {
					if (this instanceof bound) {
						var result = target.apply(this, concatty(args, arguments));
						return Object(result) === result ? result : this;
					}
					return target.apply(that, concatty(args, arguments));
				}, boundLength = max(0, target.length - args.length), boundArgs = [], i = 0; i < boundLength; i++) boundArgs[i] = "$" + i;
				if (bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder), target.prototype) {
					var Empty = function() {};
					Empty.prototype = target.prototype, bound.prototype = new Empty(), Empty.prototype = null;
				}
				return bound;
			};
		} });
		require_function_bind = __commonJS({ "node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js"(exports, module) {
			"use strict";
			var implementation = require_implementation();
			module.exports = Function.prototype.bind || implementation;
		} });
		require_functionCall = __commonJS({ "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionCall.js"(exports, module) {
			"use strict";
			module.exports = Function.prototype.call;
		} });
		require_functionApply = __commonJS({ "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionApply.js"(exports, module) {
			"use strict";
			module.exports = Function.prototype.apply;
		} });
		require_reflectApply = __commonJS({ "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/reflectApply.js"(exports, module) {
			"use strict";
			module.exports = typeof Reflect < "u" && Reflect && Reflect.apply;
		} });
		require_actualApply = __commonJS({ "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/actualApply.js"(exports, module) {
			"use strict";
			var bind = require_function_bind(), $apply = require_functionApply(), $call = require_functionCall();
			module.exports = require_reflectApply() || bind.call($call, $apply);
		} });
		require_call_bind_apply_helpers = __commonJS({ "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/index.js"(exports, module) {
			"use strict";
			var bind = require_function_bind(), $TypeError = require_type(), $call = require_functionCall(), $actualApply = require_actualApply();
			module.exports = function(args) {
				if (args.length < 1 || typeof args[0] != "function") throw new $TypeError("a function is required");
				return $actualApply(bind, $call, args);
			};
		} });
		require_get = __commonJS({ "node_modules/.pnpm/dunder-proto@1.0.1/node_modules/dunder-proto/get.js"(exports, module) {
			"use strict";
			var callBind = require_call_bind_apply_helpers(), gOPD = require_gopd(), hasProtoAccessor;
			try {
				hasProtoAccessor = [].__proto__ === Array.prototype;
			} catch (e) {
				if (!e || typeof e != "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") throw e;
			}
			var desc = !!hasProtoAccessor && gOPD && gOPD(
				Object.prototype,
				/** @type {keyof typeof Object.prototype} */
				"__proto__"
			), $Object = Object, $getPrototypeOf = $Object.getPrototypeOf;
			module.exports = desc && typeof desc.get == "function" ? callBind([desc.get]) : typeof $getPrototypeOf == "function" ? (function(value) {
				return $getPrototypeOf(value == null ? value : $Object(value));
			}) : !1;
		} });
		require_get_proto = __commonJS({ "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js"(exports, module) {
			"use strict";
			var reflectGetProto = require_Reflect_getPrototypeOf(), originalGetProto = require_Object_getPrototypeOf(), getDunderProto = require_get();
			module.exports = reflectGetProto ? function(O) {
				return reflectGetProto(O);
			} : originalGetProto ? function(O) {
				if (!O || typeof O != "object" && typeof O != "function") throw new TypeError("getProto: not an object");
				return originalGetProto(O);
			} : getDunderProto ? function(O) {
				return getDunderProto(O);
			} : null;
		} });
		require_hasown = __commonJS({ "node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js"(exports, module) {
			"use strict";
			var call = Function.prototype.call, $hasOwn = Object.prototype.hasOwnProperty;
			module.exports = require_function_bind().call(call, $hasOwn);
		} });
		require_get_intrinsic = __commonJS({ "node_modules/.pnpm/get-intrinsic@1.3.0/node_modules/get-intrinsic/index.js"(exports, module) {
			"use strict";
			var undefined2, $Object = require_es_object_atoms(), $Error = require_es_errors(), $EvalError = require_eval(), $RangeError = require_range$1(), $ReferenceError = require_ref(), $SyntaxError = require_syntax(), $TypeError = require_type(), $URIError = require_uri(), abs = require_abs(), floor = require_floor(), max = require_max(), min = require_min(), pow = require_pow(), round = require_round(), sign = require_sign(), $Function = Function, getEvalledConstructor = function(expressionSyntax) {
				try {
					return $Function("\"use strict\"; return (" + expressionSyntax + ").constructor;")();
				} catch {}
			}, $gOPD = require_gopd(), $defineProperty = require_es_define_property(), throwTypeError = function() {
				throw new $TypeError();
			}, ThrowTypeError = $gOPD ? (function() {
				try {
					return arguments.callee, throwTypeError;
				} catch {
					try {
						return $gOPD(arguments, "callee").get;
					} catch {
						return throwTypeError;
					}
				}
			})() : throwTypeError, hasSymbols = require_has_symbols()(), getProto = require_get_proto(), $ObjectGPO = require_Object_getPrototypeOf(), $ReflectGPO = require_Reflect_getPrototypeOf(), $apply = require_functionApply(), $call = require_functionCall(), needsEval = {}, TypedArray = typeof Uint8Array > "u" || !getProto ? undefined2 : getProto(Uint8Array), INTRINSICS = {
				__proto__: null,
				"%AggregateError%": typeof AggregateError > "u" ? undefined2 : AggregateError,
				"%Array%": Array,
				"%ArrayBuffer%": typeof ArrayBuffer > "u" ? undefined2 : ArrayBuffer,
				"%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
				"%AsyncFromSyncIteratorPrototype%": undefined2,
				"%AsyncFunction%": needsEval,
				"%AsyncGenerator%": needsEval,
				"%AsyncGeneratorFunction%": needsEval,
				"%AsyncIteratorPrototype%": needsEval,
				"%Atomics%": typeof Atomics > "u" ? undefined2 : Atomics,
				"%BigInt%": typeof BigInt > "u" ? undefined2 : BigInt,
				"%BigInt64Array%": typeof BigInt64Array > "u" ? undefined2 : BigInt64Array,
				"%BigUint64Array%": typeof BigUint64Array > "u" ? undefined2 : BigUint64Array,
				"%Boolean%": Boolean,
				"%DataView%": typeof DataView > "u" ? undefined2 : DataView,
				"%Date%": Date,
				"%decodeURI%": decodeURI,
				"%decodeURIComponent%": decodeURIComponent,
				"%encodeURI%": encodeURI,
				"%encodeURIComponent%": encodeURIComponent,
				"%Error%": $Error,
				"%eval%": eval,
				"%EvalError%": $EvalError,
				"%Float16Array%": typeof Float16Array > "u" ? undefined2 : Float16Array,
				"%Float32Array%": typeof Float32Array > "u" ? undefined2 : Float32Array,
				"%Float64Array%": typeof Float64Array > "u" ? undefined2 : Float64Array,
				"%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? undefined2 : FinalizationRegistry,
				"%Function%": $Function,
				"%GeneratorFunction%": needsEval,
				"%Int8Array%": typeof Int8Array > "u" ? undefined2 : Int8Array,
				"%Int16Array%": typeof Int16Array > "u" ? undefined2 : Int16Array,
				"%Int32Array%": typeof Int32Array > "u" ? undefined2 : Int32Array,
				"%isFinite%": isFinite,
				"%isNaN%": isNaN,
				"%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
				"%JSON%": typeof JSON == "object" ? JSON : undefined2,
				"%Map%": typeof Map > "u" ? undefined2 : Map,
				"%MapIteratorPrototype%": typeof Map > "u" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
				"%Math%": Math,
				"%Number%": Number,
				"%Object%": $Object,
				"%Object.getOwnPropertyDescriptor%": $gOPD,
				"%parseFloat%": parseFloat,
				"%parseInt%": parseInt,
				"%Promise%": typeof Promise > "u" ? undefined2 : Promise,
				"%Proxy%": typeof Proxy > "u" ? undefined2 : Proxy,
				"%RangeError%": $RangeError,
				"%ReferenceError%": $ReferenceError,
				"%Reflect%": typeof Reflect > "u" ? undefined2 : Reflect,
				"%RegExp%": RegExp,
				"%Set%": typeof Set > "u" ? undefined2 : Set,
				"%SetIteratorPrototype%": typeof Set > "u" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
				"%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? undefined2 : SharedArrayBuffer,
				"%String%": String,
				"%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
				"%Symbol%": hasSymbols ? Symbol : undefined2,
				"%SyntaxError%": $SyntaxError,
				"%ThrowTypeError%": ThrowTypeError,
				"%TypedArray%": TypedArray,
				"%TypeError%": $TypeError,
				"%Uint8Array%": typeof Uint8Array > "u" ? undefined2 : Uint8Array,
				"%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? undefined2 : Uint8ClampedArray,
				"%Uint16Array%": typeof Uint16Array > "u" ? undefined2 : Uint16Array,
				"%Uint32Array%": typeof Uint32Array > "u" ? undefined2 : Uint32Array,
				"%URIError%": $URIError,
				"%WeakMap%": typeof WeakMap > "u" ? undefined2 : WeakMap,
				"%WeakRef%": typeof WeakRef > "u" ? undefined2 : WeakRef,
				"%WeakSet%": typeof WeakSet > "u" ? undefined2 : WeakSet,
				"%Function.prototype.call%": $call,
				"%Function.prototype.apply%": $apply,
				"%Object.defineProperty%": $defineProperty,
				"%Object.getPrototypeOf%": $ObjectGPO,
				"%Math.abs%": abs,
				"%Math.floor%": floor,
				"%Math.max%": max,
				"%Math.min%": min,
				"%Math.pow%": pow,
				"%Math.round%": round,
				"%Math.sign%": sign,
				"%Reflect.getPrototypeOf%": $ReflectGPO
			};
			if (getProto) try {
				null.error;
			} catch (e) {
				errorProto = getProto(getProto(e)), INTRINSICS["%Error.prototype%"] = errorProto;
			}
			var errorProto, doEval = function doEval2(name) {
				var value;
				if (name === "%AsyncFunction%") value = getEvalledConstructor("async function () {}");
				else if (name === "%GeneratorFunction%") value = getEvalledConstructor("function* () {}");
				else if (name === "%AsyncGeneratorFunction%") value = getEvalledConstructor("async function* () {}");
				else if (name === "%AsyncGenerator%") {
					var fn = doEval2("%AsyncGeneratorFunction%");
					fn && (value = fn.prototype);
				} else if (name === "%AsyncIteratorPrototype%") {
					var gen = doEval2("%AsyncGenerator%");
					gen && getProto && (value = getProto(gen.prototype));
				}
				return INTRINSICS[name] = value, value;
			}, LEGACY_ALIASES = {
				__proto__: null,
				"%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
				"%ArrayPrototype%": ["Array", "prototype"],
				"%ArrayProto_entries%": [
					"Array",
					"prototype",
					"entries"
				],
				"%ArrayProto_forEach%": [
					"Array",
					"prototype",
					"forEach"
				],
				"%ArrayProto_keys%": [
					"Array",
					"prototype",
					"keys"
				],
				"%ArrayProto_values%": [
					"Array",
					"prototype",
					"values"
				],
				"%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
				"%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
				"%AsyncGeneratorPrototype%": [
					"AsyncGeneratorFunction",
					"prototype",
					"prototype"
				],
				"%BooleanPrototype%": ["Boolean", "prototype"],
				"%DataViewPrototype%": ["DataView", "prototype"],
				"%DatePrototype%": ["Date", "prototype"],
				"%ErrorPrototype%": ["Error", "prototype"],
				"%EvalErrorPrototype%": ["EvalError", "prototype"],
				"%Float32ArrayPrototype%": ["Float32Array", "prototype"],
				"%Float64ArrayPrototype%": ["Float64Array", "prototype"],
				"%FunctionPrototype%": ["Function", "prototype"],
				"%Generator%": ["GeneratorFunction", "prototype"],
				"%GeneratorPrototype%": [
					"GeneratorFunction",
					"prototype",
					"prototype"
				],
				"%Int8ArrayPrototype%": ["Int8Array", "prototype"],
				"%Int16ArrayPrototype%": ["Int16Array", "prototype"],
				"%Int32ArrayPrototype%": ["Int32Array", "prototype"],
				"%JSONParse%": ["JSON", "parse"],
				"%JSONStringify%": ["JSON", "stringify"],
				"%MapPrototype%": ["Map", "prototype"],
				"%NumberPrototype%": ["Number", "prototype"],
				"%ObjectPrototype%": ["Object", "prototype"],
				"%ObjProto_toString%": [
					"Object",
					"prototype",
					"toString"
				],
				"%ObjProto_valueOf%": [
					"Object",
					"prototype",
					"valueOf"
				],
				"%PromisePrototype%": ["Promise", "prototype"],
				"%PromiseProto_then%": [
					"Promise",
					"prototype",
					"then"
				],
				"%Promise_all%": ["Promise", "all"],
				"%Promise_reject%": ["Promise", "reject"],
				"%Promise_resolve%": ["Promise", "resolve"],
				"%RangeErrorPrototype%": ["RangeError", "prototype"],
				"%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
				"%RegExpPrototype%": ["RegExp", "prototype"],
				"%SetPrototype%": ["Set", "prototype"],
				"%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
				"%StringPrototype%": ["String", "prototype"],
				"%SymbolPrototype%": ["Symbol", "prototype"],
				"%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
				"%TypedArrayPrototype%": ["TypedArray", "prototype"],
				"%TypeErrorPrototype%": ["TypeError", "prototype"],
				"%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
				"%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
				"%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
				"%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
				"%URIErrorPrototype%": ["URIError", "prototype"],
				"%WeakMapPrototype%": ["WeakMap", "prototype"],
				"%WeakSetPrototype%": ["WeakSet", "prototype"]
			}, bind = require_function_bind(), hasOwn = require_hasown(), $concat = bind.call($call, Array.prototype.concat), $spliceApply = bind.call($apply, Array.prototype.splice), $replace = bind.call($call, String.prototype.replace), $strSlice = bind.call($call, String.prototype.slice), $exec = bind.call($call, RegExp.prototype.exec), rePropName2 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, reEscapeChar2 = /\\(\\)?/g, stringToPath2 = function(string) {
				var first = $strSlice(string, 0, 1), last = $strSlice(string, -1);
				if (first === "%" && last !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
				if (last === "%" && first !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
				var result = [];
				return $replace(string, rePropName2, function(match, number, quote, subString) {
					result[result.length] = quote ? $replace(subString, reEscapeChar2, "$1") : number || match;
				}), result;
			}, getBaseIntrinsic = function(name, allowMissing) {
				var intrinsicName = name, alias;
				if (hasOwn(LEGACY_ALIASES, intrinsicName) && (alias = LEGACY_ALIASES[intrinsicName], intrinsicName = "%" + alias[0] + "%"), hasOwn(INTRINSICS, intrinsicName)) {
					var value = INTRINSICS[intrinsicName];
					if (value === needsEval && (value = doEval(intrinsicName)), typeof value > "u" && !allowMissing) throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
					return {
						alias,
						name: intrinsicName,
						value
					};
				}
				throw new $SyntaxError("intrinsic " + name + " does not exist!");
			};
			module.exports = function(name, allowMissing) {
				if (typeof name != "string" || name.length === 0) throw new $TypeError("intrinsic name must be a non-empty string");
				if (arguments.length > 1 && typeof allowMissing != "boolean") throw new $TypeError("\"allowMissing\" argument must be a boolean");
				if ($exec(/^%?[^%]*%?$/, name) === null) throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
				var parts = stringToPath2(name), intrinsicBaseName = parts.length > 0 ? parts[0] : "", intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing), intrinsicRealName = intrinsic.name, value = intrinsic.value, skipFurtherCaching = !1, alias = intrinsic.alias;
				alias && (intrinsicBaseName = alias[0], $spliceApply(parts, $concat([0, 1], alias)));
				for (var i = 1, isOwn = !0; i < parts.length; i += 1) {
					var part = parts[i], first = $strSlice(part, 0, 1), last = $strSlice(part, -1);
					if ((first === "\"" || first === "'" || first === "`" || last === "\"" || last === "'" || last === "`") && first !== last) throw new $SyntaxError("property names with quotes must have matching quotes");
					if ((part === "constructor" || !isOwn) && (skipFurtherCaching = !0), intrinsicBaseName += "." + part, intrinsicRealName = "%" + intrinsicBaseName + "%", hasOwn(INTRINSICS, intrinsicRealName)) value = INTRINSICS[intrinsicRealName];
					else if (value != null) {
						if (!(part in value)) {
							if (!allowMissing) throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
							return;
						}
						if ($gOPD && i + 1 >= parts.length) {
							var desc = $gOPD(value, part);
							isOwn = !!desc, isOwn && "get" in desc && !("originalValue" in desc.get) ? value = desc.get : value = value[part];
						} else isOwn = hasOwn(value, part), value = value[part];
						isOwn && !skipFurtherCaching && (INTRINSICS[intrinsicRealName] = value);
					}
				}
				return value;
			};
		} });
		require_call_bound = __commonJS({ "node_modules/.pnpm/call-bound@1.0.4/node_modules/call-bound/index.js"(exports, module) {
			"use strict";
			var GetIntrinsic = require_get_intrinsic(), callBindBasic = require_call_bind_apply_helpers(), $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
			module.exports = function(name, allowMissing) {
				var intrinsic = GetIntrinsic(name, !!allowMissing);
				return typeof intrinsic == "function" && $indexOf(name, ".prototype.") > -1 ? callBindBasic(
					/** @type {const} */
					[intrinsic]
				) : intrinsic;
			};
		} });
		require_shams2 = __commonJS({ "node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js"(exports, module) {
			"use strict";
			var hasSymbols = require_shams();
			module.exports = function() {
				return hasSymbols() && !!Symbol.toStringTag;
			};
		} });
		require_is_regex = __commonJS({ "node_modules/.pnpm/is-regex@1.2.1/node_modules/is-regex/index.js"(exports, module) {
			"use strict";
			var callBound = require_call_bound(), hasToStringTag = require_shams2()(), hasOwn = require_hasown(), gOPD = require_gopd(), fn;
			hasToStringTag ? ($exec = callBound("RegExp.prototype.exec"), isRegexMarker = {}, throwRegexMarker = function() {
				throw isRegexMarker;
			}, badStringifier = {
				toString: throwRegexMarker,
				valueOf: throwRegexMarker
			}, typeof Symbol.toPrimitive == "symbol" && (badStringifier[Symbol.toPrimitive] = throwRegexMarker), fn = function(value) {
				if (!value || typeof value != "object") return !1;
				var descriptor = gOPD(
					/** @type {{ lastIndex?: unknown }} */
					value,
					"lastIndex"
				);
				if (!(descriptor && hasOwn(descriptor, "value"))) return !1;
				try {
					$exec(
						value,
						/** @type {string} */
						/** @type {unknown} */
						badStringifier
					);
				} catch (e) {
					return e === isRegexMarker;
				}
			}) : ($toString = callBound("Object.prototype.toString"), regexClass = "[object RegExp]", fn = function(value) {
				return !value || typeof value != "object" && typeof value != "function" ? !1 : $toString(value) === regexClass;
			});
			var $exec, isRegexMarker, throwRegexMarker, badStringifier, $toString, regexClass;
			module.exports = fn;
		} });
		require_is_function = __commonJS({ "node_modules/.pnpm/is-function@1.0.2/node_modules/is-function/index.js"(exports, module) {
			module.exports = isFunction3;
			var toString2 = Object.prototype.toString;
			function isFunction3(fn) {
				if (!fn) return !1;
				var string = toString2.call(fn);
				return string === "[object Function]" || typeof fn == "function" && string !== "[object RegExp]" || typeof window < "u" && (fn === window.setTimeout || fn === window.alert || fn === window.confirm || fn === window.prompt);
			}
		} });
		require_safe_regex_test = __commonJS({ "node_modules/.pnpm/safe-regex-test@1.1.0/node_modules/safe-regex-test/index.js"(exports, module) {
			"use strict";
			var callBound = require_call_bound(), isRegex = require_is_regex(), $exec = callBound("RegExp.prototype.exec"), $TypeError = require_type();
			module.exports = function(regex) {
				if (!isRegex(regex)) throw new $TypeError("`regex` must be a RegExp");
				return function(s) {
					return $exec(regex, s) !== null;
				};
			};
		} });
		require_is_symbol = __commonJS({ "node_modules/.pnpm/is-symbol@1.1.1/node_modules/is-symbol/index.js"(exports, module) {
			"use strict";
			var callBound = require_call_bound(), $toString = callBound("Object.prototype.toString"), hasSymbols = require_has_symbols()(), safeRegexTest = require_safe_regex_test();
			hasSymbols ? ($symToStr = callBound("Symbol.prototype.toString"), isSymString = safeRegexTest(/^Symbol\(.*\)$/), isSymbolObject = function(value) {
				return typeof value.valueOf() != "symbol" ? !1 : isSymString($symToStr(value));
			}, module.exports = function(value) {
				if (typeof value == "symbol") return !0;
				if (!value || typeof value != "object" || $toString(value) !== "[object Symbol]") return !1;
				try {
					return isSymbolObject(value);
				} catch {
					return !1;
				}
			}) : module.exports = function(value) {
				return !1;
			};
			var $symToStr, isSymString, isSymbolObject;
		} });
		import_is_regex = __toESM(require_is_regex());
		import_is_function = __toESM(require_is_function());
		import_is_symbol = __toESM(require_is_symbol());
		freeGlobal_default = typeof global == "object" && global && global.Object === Object && global;
		freeSelf = typeof self == "object" && self && self.Object === Object && self;
		root_default = freeGlobal_default || freeSelf || Function("return this")();
		Symbol_default = root_default.Symbol;
		objectProto = Object.prototype;
		hasOwnProperty = objectProto.hasOwnProperty;
		nativeObjectToString = objectProto.toString;
		symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
		getRawTag_default = getRawTag;
		nativeObjectToString2 = Object.prototype.toString;
		objectToString_default = objectToString;
		nullTag = "[object Null]";
		undefinedTag = "[object Undefined]";
		symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
		baseGetTag_default = baseGetTag;
		isObjectLike_default = isObjectLike;
		symbolTag = "[object Symbol]";
		isSymbol_default = isSymbol;
		arrayMap_default = arrayMap;
		isArray_default = Array.isArray;
		INFINITY = 1 / 0;
		symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
		symbolToString = symbolProto ? symbolProto.toString : void 0;
		baseToString_default = baseToString;
		isObject_default = isObject2;
		asyncTag = "[object AsyncFunction]";
		funcTag = "[object Function]";
		genTag = "[object GeneratorFunction]";
		proxyTag = "[object Proxy]";
		isFunction_default = isFunction$1;
		coreJsData_default = root_default["__core-js_shared__"];
		maskSrcKey = (function() {
			var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
			return uid ? "Symbol(src)_1." + uid : "";
		})();
		isMasked_default = isMasked;
		funcToString = Function.prototype.toString;
		toSource_default = toSource;
		reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
		reIsHostCtor = /^\[object .+?Constructor\]$/;
		funcProto2 = Function.prototype;
		objectProto3 = Object.prototype;
		funcToString2 = funcProto2.toString;
		hasOwnProperty2 = objectProto3.hasOwnProperty;
		reIsNative = RegExp("^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
		baseIsNative_default = baseIsNative;
		getValue_default = getValue;
		getNative_default = getNative;
		eq_default = eq;
		reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
		reIsPlainProp = /^\w*$/;
		isKey_default = isKey;
		nativeCreate_default = getNative_default(Object, "create");
		hashClear_default = hashClear;
		hashDelete_default = hashDelete;
		HASH_UNDEFINED = "__lodash_hash_undefined__";
		hasOwnProperty3 = Object.prototype.hasOwnProperty;
		hashGet_default = hashGet;
		hasOwnProperty4 = Object.prototype.hasOwnProperty;
		hashHas_default = hashHas;
		HASH_UNDEFINED2 = "__lodash_hash_undefined__";
		hashSet_default = hashSet;
		Hash.prototype.clear = hashClear_default;
		Hash.prototype.delete = hashDelete_default;
		Hash.prototype.get = hashGet_default;
		Hash.prototype.has = hashHas_default;
		Hash.prototype.set = hashSet_default;
		Hash_default = Hash;
		listCacheClear_default = listCacheClear;
		assocIndexOf_default = assocIndexOf;
		splice = Array.prototype.splice;
		listCacheDelete_default = listCacheDelete;
		listCacheGet_default = listCacheGet;
		listCacheHas_default = listCacheHas;
		listCacheSet_default = listCacheSet;
		ListCache.prototype.clear = listCacheClear_default;
		ListCache.prototype.delete = listCacheDelete_default;
		ListCache.prototype.get = listCacheGet_default;
		ListCache.prototype.has = listCacheHas_default;
		ListCache.prototype.set = listCacheSet_default;
		ListCache_default = ListCache;
		Map_default = getNative_default(root_default, "Map");
		mapCacheClear_default = mapCacheClear;
		isKeyable_default = isKeyable;
		getMapData_default = getMapData;
		mapCacheDelete_default = mapCacheDelete;
		mapCacheGet_default = mapCacheGet;
		mapCacheHas_default = mapCacheHas;
		mapCacheSet_default = mapCacheSet;
		MapCache.prototype.clear = mapCacheClear_default;
		MapCache.prototype.delete = mapCacheDelete_default;
		MapCache.prototype.get = mapCacheGet_default;
		MapCache.prototype.has = mapCacheHas_default;
		MapCache.prototype.set = mapCacheSet_default;
		MapCache_default = MapCache;
		FUNC_ERROR_TEXT = "Expected a function";
		memoize$1.Cache = MapCache_default;
		memoize_default = memoize$1;
		MAX_MEMOIZE_SIZE = 500;
		memoizeCapped_default = memoizeCapped;
		rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
		reEscapeChar = /\\(\\)?/g;
		stringToPath_default = memoizeCapped_default(function(string) {
			var result = [];
			return string.charCodeAt(0) === 46 && result.push(""), string.replace(rePropName, function(match, number, quote, subString) {
				result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
			}), result;
		});
		toString_default = toString;
		castPath_default = castPath;
		INFINITY2 = 1 / 0;
		toKey_default = toKey;
		baseGet_default = baseGet;
		get_default = get$1;
		isObject3 = isObject;
		dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
		isJSON = (input) => input.match(/^[\[\{\"\}].*[\]\}\"]$/);
		replacer = function(options) {
			let objects, map, stack, keys;
			return function(key, value) {
				try {
					if (key === "") return keys = [], objects = /* @__PURE__ */ new Map([[value, "[]"]]), map = /* @__PURE__ */ new Map(), stack = [], value;
					let origin = map.get(this) || this;
					for (; stack.length && origin !== stack[0];) stack.shift(), keys.pop();
					if (typeof value == "boolean") return value;
					if (value === void 0) return options.allowUndefined ? "_undefined_" : void 0;
					if (value === null) return null;
					if (typeof value == "number") return value === Number.NEGATIVE_INFINITY ? "_-Infinity_" : value === Number.POSITIVE_INFINITY ? "_Infinity_" : Number.isNaN(value) ? "_NaN_" : value;
					if (typeof value == "bigint") return `_bigint_${value.toString()}`;
					if (typeof value == "string") return dateFormat.test(value) ? options.allowDate ? `_date_${value}` : void 0 : value;
					if ((0, import_is_regex.default)(value)) return options.allowRegExp ? `_regexp_${value.flags}|${value.source}` : void 0;
					if ((0, import_is_function.default)(value)) return;
					if ((0, import_is_symbol.default)(value)) {
						if (!options.allowSymbol) return;
						let globalRegistryKey = Symbol.keyFor(value);
						return globalRegistryKey !== void 0 ? `_gsymbol_${globalRegistryKey}` : `_symbol_${value.toString().slice(7, -1)}`;
					}
					if (stack.length >= options.maxDepth) return Array.isArray(value) ? `[Array(${value.length})]` : "[Object]";
					if (value === this) return `_duplicate_${JSON.stringify(keys)}`;
					if (value instanceof Error && options.allowError) return {
						__isConvertedError__: !0,
						errorProperties: {
							...value.cause ? { cause: value.cause } : {},
							...value,
							name: value.name,
							message: value.message,
							stack: value.stack,
							"_constructor-name_": value.constructor.name
						}
					};
					if (value?.constructor?.name && value.constructor.name !== "Object" && !Array.isArray(value)) {
						let found2 = objects.get(value);
						if (!found2) {
							let plainObject = {
								__isClassInstance__: !0,
								__className__: value.constructor.name,
								...Object.getOwnPropertyNames(value).reduce((acc, prop) => {
									try {
										acc[prop] = value[prop];
									} catch {}
									return acc;
								}, {})
							};
							return keys.push(key), stack.unshift(plainObject), objects.set(value, JSON.stringify(keys)), value !== plainObject && map.set(value, plainObject), plainObject;
						}
						return `_duplicate_${found2}`;
					}
					let found = objects.get(value);
					if (!found) {
						let converted = Array.isArray(value) ? value : convertUnconventionalData(value);
						return keys.push(key), stack.unshift(converted), objects.set(value, JSON.stringify(keys)), value !== converted && map.set(value, converted), converted;
					}
					return `_duplicate_${found}`;
				} catch {
					return;
				}
			};
		};
		reviver = function(options) {
			let refs = [], root2;
			return function(key, value) {
				if (key === "" && (root2 = value, refs.forEach(({ target, container, replacement }) => {
					let replacementArr = isJSON(replacement) ? JSON.parse(replacement) : replacement.split(".");
					replacementArr.length === 0 ? container[target] = root2 : container[target] = get_default(root2, replacementArr);
				})), key === "_constructor-name_") return value;
				if (isObject3(value) && value.__isConvertedError__) {
					let { message, ...properties } = value.errorProperties, error = new Error(message);
					return Object.assign(error, properties), error;
				}
				if (typeof value == "string" && value.startsWith("_regexp_") && options.allowRegExp) {
					let [, flags, source] = value.match(/_regexp_([^|]*)\|(.*)/) || [];
					return new RegExp(source, flags);
				}
				return typeof value == "string" && value.startsWith("_date_") && options.allowDate ? new Date(value.replace("_date_", "")) : typeof value == "string" && value.startsWith("_duplicate_") ? (refs.push({
					target: key,
					container: this,
					replacement: value.replace(/^_duplicate_/, "")
				}), null) : typeof value == "string" && value.startsWith("_symbol_") && options.allowSymbol ? Symbol(value.replace("_symbol_", "")) : typeof value == "string" && value.startsWith("_gsymbol_") && options.allowSymbol ? Symbol.for(value.replace("_gsymbol_", "")) : typeof value == "string" && value === "_-Infinity_" ? Number.NEGATIVE_INFINITY : typeof value == "string" && value === "_Infinity_" ? Number.POSITIVE_INFINITY : typeof value == "string" && value === "_NaN_" ? NaN : typeof value == "string" && value.startsWith("_bigint_") && typeof BigInt == "function" ? BigInt(value.replace("_bigint_", "")) : value;
			};
		};
		defaultOptions = {
			maxDepth: 10,
			space: void 0,
			allowRegExp: !0,
			allowDate: !0,
			allowError: !0,
			allowUndefined: !0,
			allowSymbol: !0
		};
		stringify = (data, options = {}) => {
			let mergedOptions = {
				...defaultOptions,
				...options
			};
			return JSON.stringify(convertUnconventionalData(data), replacer(mergedOptions), options.space);
		};
		mutator = () => {
			let mutated = /* @__PURE__ */ new Map();
			return function mutateUndefined(value) {
				isObject3(value) && Object.entries(value).forEach(([k, v]) => {
					v === "_undefined_" ? value[k] = void 0 : mutated.get(v) || (mutated.set(v, !0), mutateUndefined(v));
				}), Array.isArray(value) && value.forEach((v, index) => {
					v === "_undefined_" ? (mutated.set(v, !0), value[index] = void 0) : mutated.get(v) || (mutated.set(v, !0), mutateUndefined(v));
				});
			};
		};
		parse$1 = (data, options = {}) => {
			let mergedOptions = {
				...defaultOptions,
				...options
			}, result = JSON.parse(data, reviver(mergedOptions));
			return mutator()(result), result;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.6.2_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-6N2DC7ON.js
var StatusTypeIdMismatchError;
function init_chunk_6N2DC7ON() {
	return (init_chunk_6N2DC7ON = __esmMin((() => {
		init_chunk_LKJ5WGKT();
		StatusTypeIdMismatchError = class extends StorybookError {
			constructor(data) {
				super({
					name: "StatusTypeIdMismatchError",
					category: "PREVIEW_API",
					code: 16,
					message: `Status has typeId "${data.status.typeId}" but was added to store with typeId "${data.typeId}". Full status: ${JSON.stringify(data.status, null, 2)}`
				});
				this.data = data;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.6.2_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-73YSBJE2.js
function countStatusesByValue(allStatuses) {
	let counts = {};
	for (let statusByTypeId of Object.values(allStatuses)) for (let status of Object.values(statusByTypeId)) counts[status.value] = (counts[status.value] ?? 0) + 1;
	return counts;
}
function createStatusStore({ universalStatusStore, useUniversalStore, environment }) {
	let fullStatusStore = {
		getAll() {
			return universalStatusStore.getState();
		},
		set(statuses) {
			universalStatusStore.setState((state) => {
				let newState = { ...state };
				for (let status of statuses) {
					let { storyId, typeId } = status;
					newState[storyId] = {
						...newState[storyId] ?? {},
						[typeId]: status
					};
				}
				return newState;
			});
		},
		onAllStatusChange(listener) {
			return universalStatusStore.onStateChange((state, prevState) => {
				listener(state, prevState);
			});
		},
		onSelect(listener) {
			return universalStatusStore.subscribe(StatusStoreEventType.SELECT, (event) => {
				listener(event.payload);
			});
		},
		selectStatuses: (statuses) => {
			universalStatusStore.send({
				type: StatusStoreEventType.SELECT,
				payload: statuses
			});
		},
		unset(storyIds) {
			if (!storyIds) {
				universalStatusStore.setState({});
				return;
			}
			universalStatusStore.setState((state) => {
				let newState = { ...state };
				for (let storyId of storyIds) delete newState[storyId];
				return newState;
			});
		},
		typeId: void 0
	}, getStatusStoreByTypeId = (typeId) => ({
		getAll: fullStatusStore.getAll,
		set(statuses) {
			universalStatusStore.setState((state) => {
				let newState = { ...state };
				for (let status of statuses) {
					let { storyId } = status;
					if (status.typeId !== typeId) switch (environment) {
						case "server": throw new StatusTypeIdMismatchError$2({
							status,
							typeId
						});
						case "manager": throw new StatusTypeIdMismatchError$1({
							status,
							typeId
						});
						default: throw new StatusTypeIdMismatchError({
							status,
							typeId
						});
					}
					newState[storyId] = {
						...newState[storyId] ?? {},
						[typeId]: status
					};
				}
				return newState;
			});
		},
		onAllStatusChange: fullStatusStore.onAllStatusChange,
		onSelect(listener) {
			return universalStatusStore.subscribe(StatusStoreEventType.SELECT, (event) => {
				event.payload.some((status) => status.typeId === typeId) && listener(event.payload);
			});
		},
		unset(storyIds) {
			universalStatusStore.setState((state) => {
				let newState = { ...state };
				for (let storyId in newState) if (newState[storyId]?.[typeId] && (!storyIds || storyIds?.includes(storyId))) {
					let { [typeId]: omittedStatus, ...storyStatusesWithoutTypeId } = newState[storyId];
					newState[storyId] = storyStatusesWithoutTypeId;
				}
				return newState;
			});
		},
		typeId
	});
	return useUniversalStore ? {
		getStatusStoreByTypeId,
		fullStatusStore,
		universalStatusStore,
		useStatusStore: (selector) => useUniversalStore(universalStatusStore, selector)[0]
	} : {
		getStatusStoreByTypeId,
		fullStatusStore,
		universalStatusStore
	};
}
var STATUS_VALUE_PREFIX, STATUS_VALUES, toStatusValue, statusValueShortName, UNIVERSAL_STATUS_STORE_OPTIONS, StatusStoreEventType;
function init_chunk_73YSBJE2() {
	return (init_chunk_73YSBJE2 = __esmMin((() => {
		init_chunk_6N2DC7ON();
		init_chunk_3PFG54GG();
		init_chunk_MI5GWNNC();
		STATUS_VALUE_PREFIX = "status-value:";
		STATUS_VALUES = [
			"status-value:pending",
			"status-value:success",
			"status-value:new",
			"status-value:modified",
			"status-value:affected",
			"status-value:reviewing",
			"status-value:warning",
			"status-value:error",
			"status-value:unknown"
		];
		toStatusValue = (shortName) => {
			if (shortName === "related") return "status-value:affected";
			let candidate = `${STATUS_VALUE_PREFIX}${shortName}`;
			return STATUS_VALUES.includes(candidate) ? candidate : void 0;
		};
		statusValueShortName = (value) => value === "status-value:affected" ? "related" : value.slice(STATUS_VALUE_PREFIX.length);
		UNIVERSAL_STATUS_STORE_OPTIONS = {
			id: "storybook/status",
			leader: !0,
			initialState: {}
		};
		StatusStoreEventType = { SELECT: "select" };
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.6.2_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-J3E3FSHW.js
function find(iter, tar, key) {
	for (key of iter.keys()) if (dequal(key, tar)) return key;
}
function dequal(foo, bar) {
	var ctor, len, tmp;
	if (foo === bar) return !0;
	if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
		if (ctor === Date) return foo.getTime() === bar.getTime();
		if (ctor === RegExp) return foo.toString() === bar.toString();
		if (ctor === Array) {
			if ((len = foo.length) === bar.length) for (; len-- && dequal(foo[len], bar[len]););
			return len === -1;
		}
		if (ctor === Set) {
			if (foo.size !== bar.size) return !1;
			for (len of foo) if (tmp = len, tmp && typeof tmp == "object" && (tmp = find(bar, tmp), !tmp) || !bar.has(tmp)) return !1;
			return !0;
		}
		if (ctor === Map) {
			if (foo.size !== bar.size) return !1;
			for (len of foo) if (tmp = len[0], tmp && typeof tmp == "object" && (tmp = find(bar, tmp), !tmp) || !dequal(len[1], bar.get(tmp))) return !1;
			return !0;
		}
		if (ctor === ArrayBuffer) foo = new Uint8Array(foo), bar = new Uint8Array(bar);
		else if (ctor === DataView) {
			if ((len = foo.byteLength) === bar.byteLength) for (; len-- && foo.getInt8(len) === bar.getInt8(len););
			return len === -1;
		}
		if (ArrayBuffer.isView(foo)) {
			if ((len = foo.byteLength) === bar.byteLength) for (; len-- && foo[len] === bar[len];);
			return len === -1;
		}
		if (!ctor || typeof foo == "object") {
			len = 0;
			for (ctor in foo) if (has.call(foo, ctor) && ++len && !has.call(bar, ctor) || !(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return !1;
			return Object.keys(bar).length === len;
		}
	}
	return foo !== foo && bar !== bar;
}
function partition(arr, isInTruthy) {
	let truthy = [], falsy = [];
	for (let i = 0; i < arr.length; i++) {
		let item = arr[i];
		isInTruthy(item) ? truthy.push(item) : falsy.push(item);
	}
	return [truthy, falsy];
}
function countBy(arr, mapper) {
	let result = {};
	for (let i = 0; i < arr.length; i++) {
		let item = arr[i], key = mapper(item);
		result[key] = (result[key] ?? 0) + 1;
	}
	return result;
}
var has;
function init_chunk_J3E3FSHW() {
	return (init_chunk_J3E3FSHW = __esmMin((() => {
		require_react();
		require_react();
		has = Object.prototype.hasOwnProperty;
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.6.2_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-YI2IBIQS.js
var REVIEW_COLLECTION_QUERY_PARAM, isReviewSummaryPath, isReviewCollectionStoryRoute, isReviewManagerRoute;
function init_chunk_YI2IBIQS() {
	return (init_chunk_YI2IBIQS = __esmMin((() => {
		REVIEW_COLLECTION_QUERY_PARAM = "collection";
		isReviewSummaryPath = (path) => path === "/review/" || path === "/review";
		isReviewCollectionStoryRoute = (path, customQueryParams) => !!path && path.startsWith("/story/") && customQueryParams?.[REVIEW_COLLECTION_QUERY_PARAM] !== void 0;
		isReviewManagerRoute = (path, customQueryParams) => !!path && (isReviewSummaryPath(path) || path.startsWith("/review/") || isReviewCollectionStoryRoute(path, customQueryParams));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.6.2_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/router/index.js
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
		}
		return target;
	}, _extends.apply(this, arguments);
}
function invariant(value, message) {
	if (value === !1 || value === null || typeof value > "u") throw new Error(message);
}
function createPath(_ref) {
	let { pathname = "/", search = "", hash = "" } = _ref;
	return search && search !== "?" && (pathname += search.charAt(0) === "?" ? search : "?" + search), hash && hash !== "#" && (pathname += hash.charAt(0) === "#" ? hash : "#" + hash), pathname;
}
function parsePath2(path) {
	let parsedPath = {};
	if (path) {
		let hashIndex = path.indexOf("#");
		hashIndex >= 0 && (parsedPath.hash = path.substr(hashIndex), path = path.substr(0, hashIndex));
		let searchIndex = path.indexOf("?");
		searchIndex >= 0 && (parsedPath.search = path.substr(searchIndex), path = path.substr(0, searchIndex)), path && (parsedPath.pathname = path);
	}
	return parsedPath;
}
function stripBasename(pathname, basename) {
	if (basename === "/") return pathname;
	if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) return null;
	let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length, nextChar = pathname.charAt(startIndex);
	return nextChar && nextChar !== "/" ? null : pathname.slice(startIndex) || "/";
}
function resolvePath(to, fromPathname) {
	fromPathname === void 0 && (fromPathname = "/");
	let { pathname: toPathname, search = "", hash = "" } = typeof to == "string" ? parsePath2(to) : to;
	return {
		pathname: toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname,
		search: normalizeSearch(search),
		hash: normalizeHash(hash)
	};
}
function resolvePathname(relativePath, fromPathname) {
	let segments = fromPathname.replace(/\/+$/, "").split("/");
	return relativePath.split("/").forEach((segment) => {
		segment === ".." ? segments.length > 1 && segments.pop() : segment !== "." && segments.push(segment);
	}), segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
	return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + "a string in <Link to=\"...\"> and the router will parse it for you.";
}
function getPathContributingMatches(matches) {
	return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
	isPathRelative === void 0 && (isPathRelative = !1);
	let to;
	typeof toArg == "string" ? to = parsePath2(toArg) : (to = _extends({}, toArg), invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to)), invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to)), invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to)));
	let isEmptyPath = toArg === "" || to.pathname === "", toPathname = isEmptyPath ? "/" : to.pathname, from;
	if (isPathRelative || toPathname == null) from = locationPathname;
	else {
		let routePathnameIndex = routePathnames.length - 1;
		if (toPathname.startsWith("..")) {
			let toSegments = toPathname.split("/");
			for (; toSegments[0] === "..";) toSegments.shift(), routePathnameIndex -= 1;
			to.pathname = toSegments.join("/");
		}
		from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
	}
	let path = resolvePath(to, from), hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/"), hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
	return !path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash) && (path.pathname += "/"), path;
}
function isRouteErrorResponse(error) {
	return error != null && typeof error.status == "number" && typeof error.statusText == "string" && typeof error.internal == "boolean" && "data" in error;
}
function _extends2() {
	return _extends2 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
		}
		return target;
	}, _extends2.apply(this, arguments);
}
function useHref(to, _temp) {
	let { relative } = _temp === void 0 ? {} : _temp;
	useInRouterContext() || invariant(!1);
	let { basename, navigator } = import_react$183.useContext(NavigationContext), { hash, pathname, search } = useResolvedPath(to, { relative }), joinedPathname = pathname;
	return basename !== "/" && (joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname])), navigator.createHref({
		pathname: joinedPathname,
		search,
		hash
	});
}
function useInRouterContext() {
	return import_react$183.useContext(LocationContext) != null;
}
function useLocation() {
	return useInRouterContext() || invariant(!1), import_react$183.useContext(LocationContext).location;
}
function useIsomorphicLayoutEffect(cb) {
	import_react$183.useContext(NavigationContext).static || import_react$183.useLayoutEffect(cb);
}
function useNavigate() {
	let { isDataRoute } = import_react$183.useContext(RouteContext);
	return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
	useInRouterContext() || invariant(!1);
	let dataRouterContext = import_react$183.useContext(DataRouterContext), { basename, navigator } = import_react$183.useContext(NavigationContext), { matches } = import_react$183.useContext(RouteContext), { pathname: locationPathname } = useLocation(), routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map((match) => match.pathnameBase)), activeRef = import_react$183.useRef(!1);
	return useIsomorphicLayoutEffect(() => {
		activeRef.current = !0;
	}), import_react$183.useCallback(function(to, options) {
		if (options === void 0 && (options = {}), !activeRef.current) return;
		if (typeof to == "number") {
			navigator.go(to);
			return;
		}
		let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
		dataRouterContext == null && basename !== "/" && (path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname])), (options.replace ? navigator.replace : navigator.push)(path, options.state, options);
	}, [
		basename,
		navigator,
		routePathnamesJson,
		locationPathname,
		dataRouterContext
	]);
}
function useResolvedPath(to, _temp2) {
	let { relative } = _temp2 === void 0 ? {} : _temp2, { matches } = import_react$183.useContext(RouteContext), { pathname: locationPathname } = useLocation(), routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map((match) => match.pathnameBase));
	return import_react$183.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [
		to,
		routePathnamesJson,
		locationPathname,
		relative
	]);
}
function DefaultErrorComponent() {
	let error = useRouteError(), message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error), stack = error instanceof Error ? error.stack : null;
	return import_react$183.createElement(import_react$183.Fragment, null, import_react$183.createElement("h2", null, "Unexpected Application Error!"), import_react$183.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? import_react$183.createElement("pre", { style: {
		padding: "0.5rem",
		backgroundColor: "rgba(200,200,200, 0.5)"
	} }, stack) : null, null);
}
function useDataRouterContext(hookName) {
	let ctx = import_react$183.useContext(DataRouterContext);
	return ctx || invariant(!1), ctx;
}
function useDataRouterState(hookName) {
	let state = import_react$183.useContext(DataRouterStateContext);
	return state || invariant(!1), state;
}
function useRouteContext(hookName) {
	let route = import_react$183.useContext(RouteContext);
	return route || invariant(!1), route;
}
function useCurrentRouteId(hookName) {
	let route = useRouteContext(hookName), thisRoute = route.matches[route.matches.length - 1];
	return thisRoute.route.id || invariant(!1), thisRoute.route.id;
}
function useRouteId() {
	return useCurrentRouteId(DataRouterStateHook.UseRouteId);
}
function useRouteError() {
	var _state$errors;
	let error = import_react$183.useContext(RouteErrorContext), state = useDataRouterState(DataRouterStateHook.UseRouteError), routeId = useCurrentRouteId(DataRouterStateHook.UseRouteError);
	return error || ((_state$errors = state.errors) == null ? void 0 : _state$errors[routeId]);
}
function useNavigateStable() {
	let { router } = useDataRouterContext(DataRouterHook.UseNavigateStable), id = useCurrentRouteId(DataRouterStateHook.UseNavigateStable), activeRef = import_react$183.useRef(!1);
	return useIsomorphicLayoutEffect(() => {
		activeRef.current = !0;
	}), import_react$183.useCallback(function(to, options) {
		options === void 0 && (options = {}), activeRef.current && (typeof to == "number" ? router.navigate(to) : router.navigate(to, _extends2({ fromRouteId: id }, options)));
	}, [router, id]);
}
function _extends3() {
	return _extends3 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
		}
		return target;
	}, _extends3.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
	if (source == null) return {};
	var target = {}, sourceKeys = Object.keys(source), key, i = 0;
	for (; i < sourceKeys.length; i++) key = sourceKeys[i], !(excluded.indexOf(key) >= 0) && (target[key] = source[key]);
	return target;
}
function isHtmlElement(object) {
	return object != null && typeof object.tagName == "string";
}
function isButtonElement(object) {
	return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
	return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
	return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
	return event.button === 0 && (!target || target === "_self") && !isModifiedEvent(event);
}
function isFormDataSubmitterSupported() {
	if (_formDataSupportsSubmitter === null) try {
		new FormData(document.createElement("form"), 0), _formDataSupportsSubmitter = !1;
	} catch {
		_formDataSupportsSubmitter = !0;
	}
	return _formDataSupportsSubmitter;
}
function getFormEncType(encType) {
	return encType != null && !supportedFormEncTypes.has(encType) ? null : encType;
}
function getFormSubmissionInfo(target, basename) {
	let method, action, encType, formData, body;
	if (isFormElement(target)) {
		let attr = target.getAttribute("action");
		action = attr ? stripBasename(attr, basename) : null, method = target.getAttribute("method") || defaultMethod, encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType, formData = new FormData(target);
	} else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
		let form = target.form;
		if (form == null) throw new Error("Cannot submit a <button> or <input type=\"submit\"> without a <form>");
		let attr = target.getAttribute("formaction") || form.getAttribute("action");
		if (action = attr ? stripBasename(attr, basename) : null, method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod, encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType, formData = new FormData(form, target), !isFormDataSubmitterSupported()) {
			let { name, type, value } = target;
			if (type === "image") {
				let prefix = name ? name + "." : "";
				formData.append(prefix + "x", "0"), formData.append(prefix + "y", "0");
			} else name && formData.append(name, value);
		}
	} else {
		if (isHtmlElement(target)) throw new Error("Cannot submit element that is not <form>, <button>, or <input type=\"submit|image\">");
		method = defaultMethod, action = null, encType = defaultEncType, body = target;
	}
	return formData && encType === "text/plain" && (body = formData, formData = void 0), {
		action,
		method: method.toLowerCase(),
		encType,
		formData,
		body
	};
}
function useDataRouterContext2(hookName) {
	let ctx = import_react$182.useContext(DataRouterContext);
	return ctx || invariant(!1), ctx;
}
function useLinkClickHandler(to, _temp) {
	let { target, replace: replaceProp, state, preventScrollReset, relative } = _temp === void 0 ? {} : _temp, navigate = useNavigate(), location = useLocation(), path = useResolvedPath(to, { relative });
	return import_react$182.useCallback((event) => {
		if (shouldProcessLinkClick(event, target)) {
			event.preventDefault();
			let replace = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
			navigate(to, {
				replace,
				state,
				preventScrollReset,
				relative
			});
		}
	}, [
		location,
		navigate,
		path,
		replaceProp,
		state,
		target,
		to,
		preventScrollReset,
		relative
	]);
}
function validateClientSideSubmission() {
	if (typeof document > "u") throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
function useSubmit() {
	let { router } = useDataRouterContext2(DataRouterHook2.UseSubmit), { basename } = import_react$182.useContext(NavigationContext), currentRouteId = useRouteId();
	return import_react$182.useCallback(function(target, options) {
		options === void 0 && (options = {}), validateClientSideSubmission();
		let { action, method, encType, formData, body } = getFormSubmissionInfo(target, basename);
		router.navigate(options.action || action, {
			preventScrollReset: options.preventScrollReset,
			formData,
			body,
			formMethod: options.method || method,
			formEncType: options.encType || encType,
			replace: options.replace,
			state: options.state,
			fromRouteId: currentRouteId
		});
	}, [
		router,
		basename,
		currentRouteId
	]);
}
function useFormAction(action, _temp2) {
	let { relative } = _temp2 === void 0 ? {} : _temp2, { basename } = import_react$182.useContext(NavigationContext), routeContext = import_react$182.useContext(RouteContext);
	routeContext || invariant(!1);
	let [match] = routeContext.matches.slice(-1), path = _extends3({}, useResolvedPath(action || ".", { relative })), location = useLocation();
	if (action == null && (path.search = location.search, match.route.index)) {
		let params = new URLSearchParams(path.search);
		params.delete("index"), path.search = params.toString() ? "?" + params.toString() : "";
	}
	return (!action || action === ".") && match.route.index && (path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index"), basename !== "/" && (path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname])), createPath(path);
}
function Match({ children, path: targetPath, startsWith = !1 }) {
	return import_react$181.createElement(Location, null, ({ path: urlPath, ...rest }) => children({
		match: getMatch(urlPath, targetPath, startsWith),
		...rest
	}));
}
function Route2(input) {
	let { children, ...rest } = input;
	return rest.startsWith === void 0 && (rest.startsWith = !1), import_react$181.createElement(Match, { ...rest }, ({ match }) => match ? children : null);
}
var import_react$181, import_react$182, import_react$183, once, import_memoizerific$2, splitPathRegex, parsePath, DEEPLY_EQUAL, deepDiff, VALIDATION_REGEXP, NUMBER_REGEXP, HEX_REGEXP, COLOR_REGEXP, validateArgs, encodeSpecialValues, decodeKnownQueryChar, knownQueryChar, buildArgsParam, queryFromString, queryFromLocation, getMatch, global$3, Action, ResultType, joinPaths, normalizeSearch, normalizeHash, validMutationMethodsArr, validRequestMethodsArr, DataRouterContext, DataRouterStateContext, NavigationContext, LocationContext, RouteContext, RouteErrorContext, DataRouterHook, DataRouterStateHook, AwaitRenderStatus, defaultMethod, defaultEncType, _formDataSupportsSubmitter, supportedFormEncTypes, _excluded$1, _excluded2, _excluded3, isBrowser, ABSOLUTE_URL_REGEX, Link$1, FormImpl, DataRouterHook2, DataRouterStateHook2, NAVIGATE_URL$1, document2$2, getBase, Link2$1, Location;
function init_router() {
	return (init_router = __esmMin((() => {
		init_chunk_YI2IBIQS();
		init_chunk_SFVA4SBT();
		init_chunk_DRQKCCAG();
		init_chunk_Z3B64JMR();
		init_chunk_IMSF75WX();
		import_react$181 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$182 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$183 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		init_manager_api();
		({once} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		import_memoizerific$2 = __toESM$2(require_memoizerific(), 1);
		splitPathRegex = /\/([^/]+)\/(?:(.*)_)?([^/]+)?/;
		parsePath = (0, import_memoizerific$2.default)(1e3)((path) => {
			let result = {
				viewMode: void 0,
				storyId: void 0,
				refId: void 0
			};
			if (path) {
				let [, viewMode, refId, storyId] = path.toLowerCase().match(splitPathRegex) || [];
				viewMode ? Object.assign(result, {
					viewMode,
					storyId,
					refId
				}) : isReviewSummaryPath(path) && (result.viewMode = "review");
			}
			return result;
		});
		DEEPLY_EQUAL = /* @__PURE__ */ Symbol("Deeply equal");
		deepDiff = (value, update) => {
			if (typeof value != typeof update) return update;
			if (isEqual(value, update)) return DEEPLY_EQUAL;
			if (Array.isArray(value) && Array.isArray(update)) {
				let res = update.reduce((acc, upd, index) => {
					let diff = deepDiff(value[index], upd);
					return diff !== DEEPLY_EQUAL && (acc[index] = diff), acc;
				}, new Array(update.length));
				return update.length >= value.length ? res : res.concat(new Array(value.length - update.length).fill(void 0));
			}
			return isPlainObject(value) && isPlainObject(update) ? Object.keys({
				...value,
				...update
			}).reduce((acc, key) => {
				let diff = deepDiff(value?.[key], update?.[key]);
				return diff === DEEPLY_EQUAL ? acc : Object.assign(acc, { [key]: diff });
			}, {}) : update;
		};
		VALIDATION_REGEXP = /^[a-zA-Z0-9 _-]*$/;
		NUMBER_REGEXP = /^-?[0-9]+(\.[0-9]+)?$/;
		HEX_REGEXP = /^#([a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i;
		COLOR_REGEXP = /^(rgba?|hsla?)\(([0-9]{1,3}),\s?([0-9]{1,3})%?,\s?([0-9]{1,3})%?,?\s?([0-9](\.[0-9]{1,2})?)?\)$/i;
		validateArgs = (key = "", value) => key === null || key === "" || !VALIDATION_REGEXP.test(key) ? !1 : value == null || value instanceof Date || typeof value == "number" || typeof value == "boolean" ? !0 : typeof value == "string" ? VALIDATION_REGEXP.test(value) || NUMBER_REGEXP.test(value) || HEX_REGEXP.test(value) || COLOR_REGEXP.test(value) : Array.isArray(value) ? value.every((v) => validateArgs(key, v)) : isPlainObject(value) ? Object.entries(value).every(([k, v]) => validateArgs(k, v)) : !1;
		encodeSpecialValues = (value) => value === void 0 ? "!undefined" : value === null ? "!null" : typeof value == "string" ? HEX_REGEXP.test(value) ? `!hex(${value.slice(1)})` : COLOR_REGEXP.test(value) ? `!${value.replace(/[\s%]/g, "")}` : value : typeof value == "boolean" ? `!${value}` : value instanceof Date ? `!date(${value.toISOString()})` : Array.isArray(value) ? value.map(encodeSpecialValues) : isPlainObject(value) ? Object.entries(value).reduce((acc, [key, val]) => Object.assign(acc, { [key]: encodeSpecialValues(val) }), {}) : value;
		decodeKnownQueryChar = (chr) => {
			switch (chr) {
				case "%20": return "+";
				case "%5B": return "[";
				case "%5D": return "]";
				case "%2C": return ",";
				case "%3A": return ":";
			}
			return chr;
		};
		knownQueryChar = /%[0-9A-F]{2}/g;
		buildArgsParam = (initialArgs, args) => {
			let update = deepDiff(initialArgs, args);
			if (!update || update === DEEPLY_EQUAL) return "";
			let object = Object.entries(update).reduce((acc, [key, value]) => validateArgs(key, value) ? Object.assign(acc, { [key]: value }) : (once.warn(dedent`
      Omitted potentially unsafe URL args.

      More info: https://storybook.js.org/docs/writing-stories/args?ref=error#setting-args-through-the-url
    `), acc), {});
			return stringify$1(encodeSpecialValues(object), {
				delimiter: ";",
				nesting: !0,
				nestingSyntax: "js"
			}).replace(knownQueryChar, decodeKnownQueryChar).split(";").map((part) => part.replace("=", ":")).join(";");
		};
		queryFromString = (0, import_memoizerific$2.default)(1e3)((s) => s !== void 0 ? parse$2(s) : {});
		queryFromLocation = (location) => queryFromString(location?.search ? location.search.slice(1) : "");
		getMatch = (0, import_memoizerific$2.default)(1e3)((current, target, startsWith = !0) => {
			if (startsWith) {
				if (typeof target != "string") throw new Error("startsWith only works with string targets");
				return current && current.startsWith(target) ? { path: current } : null;
			}
			let currentIsTarget = typeof target == "string" && current === target, matchTarget = current && target && current.match(target);
			return currentIsTarget || matchTarget ? { path: current } : null;
		});
		({global: global$3} = __STORYBOOK_MODULE_GLOBAL__);
		(function(Action2) {
			Action2.Pop = "POP", Action2.Push = "PUSH", Action2.Replace = "REPLACE";
		})(Action || (Action = {}));
		(function(ResultType2) {
			ResultType2.data = "data", ResultType2.deferred = "deferred", ResultType2.redirect = "redirect", ResultType2.error = "error";
		})(ResultType || (ResultType = {}));
		joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
		normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
		normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
		validMutationMethodsArr = [
			"post",
			"put",
			"patch",
			"delete"
		];
		new Set(validMutationMethodsArr);
		validRequestMethodsArr = ["get", ...validMutationMethodsArr];
		new Set(validRequestMethodsArr);
		DataRouterContext = import_react$183.createContext(null);
		DataRouterStateContext = import_react$183.createContext(null);
		import_react$183.createContext(null);
		NavigationContext = import_react$183.createContext(null);
		LocationContext = import_react$183.createContext(null);
		RouteContext = import_react$183.createContext({
			outlet: null,
			matches: [],
			isDataRoute: !1
		});
		RouteErrorContext = import_react$183.createContext(null);
		import_react$183.createContext(null);
		import_react$183.createElement(DefaultErrorComponent, null);
		DataRouterHook = (function(DataRouterHook3) {
			return DataRouterHook3.UseBlocker = "useBlocker", DataRouterHook3.UseRevalidator = "useRevalidator", DataRouterHook3.UseNavigateStable = "useNavigate", DataRouterHook3;
		})(DataRouterHook || {});
		DataRouterStateHook = (function(DataRouterStateHook3) {
			return DataRouterStateHook3.UseBlocker = "useBlocker", DataRouterStateHook3.UseLoaderData = "useLoaderData", DataRouterStateHook3.UseActionData = "useActionData", DataRouterStateHook3.UseRouteError = "useRouteError", DataRouterStateHook3.UseNavigation = "useNavigation", DataRouterStateHook3.UseRouteLoaderData = "useRouteLoaderData", DataRouterStateHook3.UseMatches = "useMatches", DataRouterStateHook3.UseRevalidator = "useRevalidator", DataRouterStateHook3.UseNavigateStable = "useNavigate", DataRouterStateHook3.UseRouteId = "useRouteId", DataRouterStateHook3;
		})(DataRouterStateHook || {});
		AwaitRenderStatus = (function(AwaitRenderStatus2) {
			return AwaitRenderStatus2[AwaitRenderStatus2.pending = 0] = "pending", AwaitRenderStatus2[AwaitRenderStatus2.success = 1] = "success", AwaitRenderStatus2[AwaitRenderStatus2.error = 2] = "error", AwaitRenderStatus2;
		})(AwaitRenderStatus || {});
		new Promise(() => {});
		defaultMethod = "get";
		defaultEncType = "application/x-www-form-urlencoded";
		_formDataSupportsSubmitter = null;
		supportedFormEncTypes = /* @__PURE__ */ new Set([
			"application/x-www-form-urlencoded",
			"multipart/form-data",
			"text/plain"
		]);
		_excluded$1 = [
			"onClick",
			"relative",
			"reloadDocument",
			"replace",
			"state",
			"target",
			"to",
			"preventScrollReset"
		];
		_excluded2 = [
			"aria-current",
			"caseSensitive",
			"className",
			"end",
			"style",
			"to",
			"children"
		];
		_excluded3 = [
			"reloadDocument",
			"replace",
			"state",
			"method",
			"action",
			"onSubmit",
			"submit",
			"relative",
			"preventScrollReset"
		];
		isBrowser = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
		ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
		Link$1 = import_react$182.forwardRef(function(_ref4, ref) {
			let { onClick, relative, reloadDocument, replace, state, target, to, preventScrollReset } = _ref4, rest = _objectWithoutPropertiesLoose(_ref4, _excluded$1), { basename } = import_react$182.useContext(NavigationContext), absoluteHref, isExternal = !1;
			if (typeof to == "string" && ABSOLUTE_URL_REGEX.test(to) && (absoluteHref = to, isBrowser)) try {
				let currentUrl = new URL(window.location.href), targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to), path = stripBasename(targetUrl.pathname, basename);
				targetUrl.origin === currentUrl.origin && path != null ? to = path + targetUrl.search + targetUrl.hash : isExternal = !0;
			} catch {}
			let href = useHref(to, { relative }), internalOnClick = useLinkClickHandler(to, {
				replace,
				state,
				target,
				preventScrollReset,
				relative
			});
			function handleClick(event) {
				onClick && onClick(event), event.defaultPrevented || internalOnClick(event);
			}
			return import_react$182.createElement("a", _extends3({}, rest, {
				href: absoluteHref || href,
				onClick: isExternal || reloadDocument ? onClick : handleClick,
				ref,
				target
			}));
		});
		import_react$182.forwardRef(function(_ref5, ref) {
			let { "aria-current": ariaCurrentProp = "page", caseSensitive = !1, className: classNameProp = "", end = !1, style: styleProp, to, children } = _ref5, rest = _objectWithoutPropertiesLoose(_ref5, _excluded2), path = useResolvedPath(to, { relative: rest.relative }), location = useLocation(), routerState = import_react$182.useContext(DataRouterStateContext), { navigator } = import_react$182.useContext(NavigationContext), toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname, locationPathname = location.pathname, nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
			caseSensitive || (locationPathname = locationPathname.toLowerCase(), nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null, toPathname = toPathname.toLowerCase());
			let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/", isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/"), ariaCurrent = isActive ? ariaCurrentProp : void 0, className;
			typeof classNameProp == "function" ? className = classNameProp({
				isActive,
				isPending
			}) : className = [
				classNameProp,
				isActive ? "active" : null,
				isPending ? "pending" : null
			].filter(Boolean).join(" ");
			let style = typeof styleProp == "function" ? styleProp({
				isActive,
				isPending
			}) : styleProp;
			return import_react$182.createElement(Link$1, _extends3({}, rest, {
				"aria-current": ariaCurrent,
				className,
				ref,
				style,
				to
			}), typeof children == "function" ? children({
				isActive,
				isPending
			}) : children);
		});
		import_react$182.forwardRef((props, ref) => {
			let submit = useSubmit();
			return import_react$182.createElement(FormImpl, _extends3({}, props, {
				submit,
				ref
			}));
		});
		FormImpl = import_react$182.forwardRef((_ref6, forwardedRef) => {
			let { reloadDocument, replace, state, method = defaultMethod, action, onSubmit, submit, relative, preventScrollReset } = _ref6, props = _objectWithoutPropertiesLoose(_ref6, _excluded3), formMethod = method.toLowerCase() === "get" ? "get" : "post", formAction = useFormAction(action, { relative });
			return import_react$182.createElement("form", _extends3({
				ref: forwardedRef,
				method: formMethod,
				action: formAction,
				onSubmit: reloadDocument ? onSubmit : (event) => {
					if (onSubmit && onSubmit(event), event.defaultPrevented) return;
					event.preventDefault();
					let submitter = event.nativeEvent.submitter, submitMethod = submitter?.getAttribute("formmethod") || method;
					submit(submitter || event.currentTarget, {
						method: submitMethod,
						replace,
						state,
						relative,
						preventScrollReset
					});
				}
			}, props));
		});
		(function(DataRouterHook3) {
			DataRouterHook3.UseScrollRestoration = "useScrollRestoration", DataRouterHook3.UseSubmit = "useSubmit", DataRouterHook3.UseSubmitFetcher = "useSubmitFetcher", DataRouterHook3.UseFetcher = "useFetcher";
		})(DataRouterHook2 || (DataRouterHook2 = {}));
		(function(DataRouterStateHook3) {
			DataRouterStateHook3.UseFetchers = "useFetchers", DataRouterStateHook3.UseScrollRestoration = "useScrollRestoration";
		})(DataRouterStateHook2 || (DataRouterStateHook2 = {}));
		({NAVIGATE_URL: NAVIGATE_URL$1} = __STORYBOOK_MODULE_CORE_EVENTS__);
		({document: document2$2} = global$3), getBase = () => `${document2$2.location.pathname}?`, Link2$1 = ({ to, children, ...rest }) => import_react$181.createElement(Link$1, {
			to: `${getBase()}path=${to}`,
			...rest
		}, children);
		Link2$1.displayName = "QueryLink";
		Location = ({ children }) => {
			let location = useLocation(), { path = "", singleStory } = queryFromLocation(location), { viewMode, storyId, refId } = parsePath(path);
			return import_react$181.createElement(import_react$181.Fragment, null, children({
				path: path || "/",
				location,
				viewMode,
				storyId,
				refId,
				singleStory: singleStory === "true"
			}));
		};
		Location.displayName = "QueryLocation";
		Match.displayName = "QueryMatch";
		Route2.displayName = "Route";
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/internal/constants.js
var require_constants = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		MAX_LENGTH: 256,
		MAX_SAFE_COMPONENT_LENGTH: 16,
		MAX_SAFE_BUILD_LENGTH: 250,
		MAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER || 
		/* istanbul ignore next */ 9007199254740991,
		RELEASE_TYPES: [
			"major",
			"premajor",
			"minor",
			"preminor",
			"patch",
			"prepatch",
			"prerelease"
		],
		SEMVER_SPEC_VERSION: "2.0.0",
		FLAG_INCLUDE_PRERELEASE: 1,
		FLAG_LOOSE: 2
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/internal/debug.js
var require_debug = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = typeof process === "object" && {}.NODE_DEBUG && /\bsemver\b/i.test({}.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {};
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/internal/re.js
var require_re = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { MAX_SAFE_COMPONENT_LENGTH, MAX_SAFE_BUILD_LENGTH, MAX_LENGTH } = require_constants();
	var debug = require_debug();
	exports = module.exports = {};
	var re = exports.re = [];
	var safeRe = exports.safeRe = [];
	var src = exports.src = [];
	var safeSrc = exports.safeSrc = [];
	var t = exports.t = {};
	var R = 0;
	var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
	var safeRegexReplacements = [
		["\\s", 1],
		["\\d", MAX_LENGTH],
		[LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
	];
	var makeSafeRegex = (value) => {
		for (const [token, max] of safeRegexReplacements) value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
		return value;
	};
	var createToken = (name, value, isGlobal) => {
		const safe = makeSafeRegex(value);
		const index = R++;
		debug(name, index, value);
		t[name] = index;
		src[index] = value;
		safeSrc[index] = safe;
		re[index] = new RegExp(value, isGlobal ? "g" : void 0);
		safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
	};
	createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
	createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
	createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
	createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
	createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
	createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
	createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
	createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
	createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
	createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
	createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
	createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
	createToken("FULL", `^${src[t.FULLPLAIN]}$`);
	createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
	createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
	createToken("GTLT", "((?:<|>)?=?)");
	createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
	createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
	createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
	createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
	createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
	createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
	createToken("COERCEPLAIN", `(^|[^\\d])(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
	createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
	createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
	createToken("COERCERTL", src[t.COERCE], true);
	createToken("COERCERTLFULL", src[t.COERCEFULL], true);
	createToken("LONETILDE", "(?:~>?)");
	createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
	exports.tildeTrimReplace = "$1~";
	createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
	createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
	createToken("LONECARET", "(?:\\^)");
	createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
	exports.caretTrimReplace = "$1^";
	createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
	createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
	createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
	createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
	createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
	exports.comparatorTrimReplace = "$1$2$3";
	createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
	createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
	createToken("STAR", "(<|>)?=?\\s*\\*");
	createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
	createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/internal/parse-options.js
var require_parse_options = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var looseOption = Object.freeze({ loose: true });
	var emptyOpts = Object.freeze({});
	var parseOptions = (options) => {
		if (!options) return emptyOpts;
		if (typeof options !== "object") return looseOption;
		return options;
	};
	module.exports = parseOptions;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/internal/identifiers.js
var require_identifiers = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var numeric = /^[0-9]+$/;
	var compareIdentifiers = (a, b) => {
		if (typeof a === "number" && typeof b === "number") return a === b ? 0 : a < b ? -1 : 1;
		const anum = numeric.test(a);
		const bnum = numeric.test(b);
		if (anum && bnum) {
			a = +a;
			b = +b;
		}
		return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
	};
	var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
	module.exports = {
		compareIdentifiers,
		rcompareIdentifiers
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/classes/semver.js
var require_semver$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var debug = require_debug();
	var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
	var { safeRe: re, t } = require_re();
	var parseOptions = require_parse_options();
	var { compareIdentifiers } = require_identifiers();
	var isPrereleaseIdentifier = (prerelease, identifier) => {
		const identifiers = identifier.split(".");
		if (identifiers.length > prerelease.length) return false;
		for (let i = 0; i < identifiers.length; i++) if (compareIdentifiers(prerelease[i], identifiers[i]) !== 0) return false;
		return true;
	};
	module.exports = class SemVer {
		constructor(version, options) {
			options = parseOptions(options);
			if (version instanceof SemVer) {
				if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) return version;
				else version = version.version;
			} else if (typeof version !== "string") throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
			if (version.length > MAX_LENGTH) throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
			debug("SemVer", version, options);
			this.options = options;
			this.loose = !!options.loose;
			this.includePrerelease = !!options.includePrerelease;
			const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
			if (!m) throw new TypeError(`Invalid Version: ${version}`);
			this.raw = version;
			this.major = +m[1];
			this.minor = +m[2];
			this.patch = +m[3];
			if (this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError("Invalid major version");
			if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError("Invalid minor version");
			if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError("Invalid patch version");
			if (!m[4]) this.prerelease = [];
			else this.prerelease = m[4].split(".").map((id) => {
				if (/^[0-9]+$/.test(id)) {
					const num = +id;
					if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
				}
				return id;
			});
			this.build = m[5] ? m[5].split(".") : [];
			this.format();
		}
		format() {
			this.version = `${this.major}.${this.minor}.${this.patch}`;
			if (this.prerelease.length) this.version += `-${this.prerelease.join(".")}`;
			return this.version;
		}
		toString() {
			return this.version;
		}
		compare(other) {
			debug("SemVer.compare", this.version, this.options, other);
			if (!(other instanceof SemVer)) {
				if (typeof other === "string" && other === this.version) return 0;
				other = new SemVer(other, this.options);
			}
			if (other.version === this.version) return 0;
			return this.compareMain(other) || this.comparePre(other);
		}
		compareMain(other) {
			if (!(other instanceof SemVer)) other = new SemVer(other, this.options);
			if (this.major < other.major) return -1;
			if (this.major > other.major) return 1;
			if (this.minor < other.minor) return -1;
			if (this.minor > other.minor) return 1;
			if (this.patch < other.patch) return -1;
			if (this.patch > other.patch) return 1;
			return 0;
		}
		comparePre(other) {
			if (!(other instanceof SemVer)) other = new SemVer(other, this.options);
			if (this.prerelease.length && !other.prerelease.length) return -1;
			else if (!this.prerelease.length && other.prerelease.length) return 1;
			else if (!this.prerelease.length && !other.prerelease.length) return 0;
			let i = 0;
			do {
				const a = this.prerelease[i];
				const b = other.prerelease[i];
				debug("prerelease compare", i, a, b);
				if (a === void 0 && b === void 0) return 0;
				else if (b === void 0) return 1;
				else if (a === void 0) return -1;
				else if (a === b) continue;
				else return compareIdentifiers(a, b);
			} while (++i);
		}
		compareBuild(other) {
			if (!(other instanceof SemVer)) other = new SemVer(other, this.options);
			let i = 0;
			do {
				const a = this.build[i];
				const b = other.build[i];
				debug("build compare", i, a, b);
				if (a === void 0 && b === void 0) return 0;
				else if (b === void 0) return 1;
				else if (a === void 0) return -1;
				else if (a === b) continue;
				else return compareIdentifiers(a, b);
			} while (++i);
		}
		inc(release, identifier, identifierBase) {
			if (release.startsWith("pre")) {
				if (!identifier && identifierBase === false) throw new Error("invalid increment argument: identifier is empty");
				if (identifier) {
					const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
					if (!match || match[1] !== identifier) throw new Error(`invalid identifier: ${identifier}`);
				}
			}
			switch (release) {
				case "premajor":
					this.prerelease.length = 0;
					this.patch = 0;
					this.minor = 0;
					this.major++;
					this.inc("pre", identifier, identifierBase);
					break;
				case "preminor":
					this.prerelease.length = 0;
					this.patch = 0;
					this.minor++;
					this.inc("pre", identifier, identifierBase);
					break;
				case "prepatch":
					this.prerelease.length = 0;
					this.inc("patch", identifier, identifierBase);
					this.inc("pre", identifier, identifierBase);
					break;
				case "prerelease":
					if (this.prerelease.length === 0) this.inc("patch", identifier, identifierBase);
					this.inc("pre", identifier, identifierBase);
					break;
				case "release":
					if (this.prerelease.length === 0) throw new Error(`version ${this.raw} is not a prerelease`);
					this.prerelease.length = 0;
					break;
				case "major":
					if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) this.major++;
					this.minor = 0;
					this.patch = 0;
					this.prerelease = [];
					break;
				case "minor":
					if (this.patch !== 0 || this.prerelease.length === 0) this.minor++;
					this.patch = 0;
					this.prerelease = [];
					break;
				case "patch":
					if (this.prerelease.length === 0) this.patch++;
					this.prerelease = [];
					break;
				case "pre": {
					const base = Number(identifierBase) ? 1 : 0;
					if (this.prerelease.length === 0) this.prerelease = [base];
					else {
						let i = this.prerelease.length;
						while (--i >= 0) if (typeof this.prerelease[i] === "number") {
							this.prerelease[i]++;
							i = -2;
						}
						if (i === -1) {
							if (identifier === this.prerelease.join(".") && identifierBase === false) throw new Error("invalid increment argument: identifier already exists");
							this.prerelease.push(base);
						}
					}
					if (identifier) {
						let prerelease = [identifier, base];
						if (identifierBase === false) prerelease = [identifier];
						if (isPrereleaseIdentifier(this.prerelease, identifier)) {
							const prereleaseBase = this.prerelease[identifier.split(".").length];
							if (isNaN(prereleaseBase)) this.prerelease = prerelease;
						} else this.prerelease = prerelease;
					}
					break;
				}
				default: throw new Error(`invalid increment argument: ${release}`);
			}
			this.raw = this.format();
			if (this.build.length) this.raw += `+${this.build.join(".")}`;
			return this;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/parse.js
var require_parse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var parse = (version, options, throwErrors = false) => {
		if (version instanceof SemVer) return version;
		try {
			return new SemVer(version, options);
		} catch (er) {
			if (!throwErrors) return null;
			throw er;
		}
	};
	module.exports = parse;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/valid.js
var require_valid$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var parse = require_parse();
	var valid = (version, options) => {
		const v = parse(version, options);
		return v ? v.version : null;
	};
	module.exports = valid;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/clean.js
var require_clean = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var parse = require_parse();
	var clean = (version, options) => {
		const s = parse(version.trim().replace(/^[=v]+/, ""), options);
		return s ? s.version : null;
	};
	module.exports = clean;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/inc.js
var require_inc = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var inc = (version, release, options, identifier, identifierBase) => {
		if (typeof options === "string") {
			identifierBase = identifier;
			identifier = options;
			options = void 0;
		}
		try {
			return new SemVer(version instanceof SemVer ? version.version : version, options).inc(release, identifier, identifierBase).version;
		} catch (er) {
			return null;
		}
	};
	module.exports = inc;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/diff.js
var require_diff = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var parse = require_parse();
	var diff = (version1, version2) => {
		const v1 = parse(version1, null, true);
		const v2 = parse(version2, null, true);
		const comparison = v1.compare(v2);
		if (comparison === 0) return null;
		const v1Higher = comparison > 0;
		const highVersion = v1Higher ? v1 : v2;
		const lowVersion = v1Higher ? v2 : v1;
		const highHasPre = !!highVersion.prerelease.length;
		if (!!lowVersion.prerelease.length && !highHasPre) {
			if (!lowVersion.patch && !lowVersion.minor) return "major";
			if (lowVersion.compareMain(highVersion) === 0) {
				if (lowVersion.minor && !lowVersion.patch) return "minor";
				return "patch";
			}
		}
		const prefix = highHasPre ? "pre" : "";
		if (v1.major !== v2.major) return prefix + "major";
		if (v1.minor !== v2.minor) return prefix + "minor";
		if (v1.patch !== v2.patch) return prefix + "patch";
		return "prerelease";
	};
	module.exports = diff;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/major.js
var require_major = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var major = (a, loose) => new SemVer(a, loose).major;
	module.exports = major;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/minor.js
var require_minor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var minor = (a, loose) => new SemVer(a, loose).minor;
	module.exports = minor;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/patch.js
var require_patch = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var patch = (a, loose) => new SemVer(a, loose).patch;
	module.exports = patch;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/prerelease.js
var require_prerelease = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var parse = require_parse();
	var prerelease = (version, options) => {
		const parsed = parse(version, options);
		return parsed && parsed.prerelease.length ? parsed.prerelease : null;
	};
	module.exports = prerelease;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/compare.js
var require_compare = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
	module.exports = compare;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/rcompare.js
var require_rcompare = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compare = require_compare();
	var rcompare = (a, b, loose) => compare(b, a, loose);
	module.exports = rcompare;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/compare-loose.js
var require_compare_loose = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compare = require_compare();
	var compareLoose = (a, b) => compare(a, b, true);
	module.exports = compareLoose;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/compare-build.js
var require_compare_build = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var compareBuild = (a, b, loose) => {
		const versionA = new SemVer(a, loose);
		const versionB = new SemVer(b, loose);
		return versionA.compare(versionB) || versionA.compareBuild(versionB);
	};
	module.exports = compareBuild;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/sort.js
var require_sort = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compareBuild = require_compare_build();
	var sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
	module.exports = sort;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/rsort.js
var require_rsort = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compareBuild = require_compare_build();
	var rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
	module.exports = rsort;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/gt.js
var require_gt = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compare = require_compare();
	var gt = (a, b, loose) => compare(a, b, loose) > 0;
	module.exports = gt;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/lt.js
var require_lt = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compare = require_compare();
	var lt = (a, b, loose) => compare(a, b, loose) < 0;
	module.exports = lt;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/eq.js
var require_eq = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compare = require_compare();
	var eq = (a, b, loose) => compare(a, b, loose) === 0;
	module.exports = eq;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/neq.js
var require_neq = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compare = require_compare();
	var neq = (a, b, loose) => compare(a, b, loose) !== 0;
	module.exports = neq;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/gte.js
var require_gte = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compare = require_compare();
	var gte = (a, b, loose) => compare(a, b, loose) >= 0;
	module.exports = gte;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/lte.js
var require_lte = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var compare = require_compare();
	var lte = (a, b, loose) => compare(a, b, loose) <= 0;
	module.exports = lte;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/cmp.js
var require_cmp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var eq = require_eq();
	var neq = require_neq();
	var gt = require_gt();
	var gte = require_gte();
	var lt = require_lt();
	var lte = require_lte();
	var cmp = (a, op, b, loose) => {
		switch (op) {
			case "===":
				if (typeof a === "object") a = a.version;
				if (typeof b === "object") b = b.version;
				return a === b;
			case "!==":
				if (typeof a === "object") a = a.version;
				if (typeof b === "object") b = b.version;
				return a !== b;
			case "":
			case "=":
			case "==": return eq(a, b, loose);
			case "!=": return neq(a, b, loose);
			case ">": return gt(a, b, loose);
			case ">=": return gte(a, b, loose);
			case "<": return lt(a, b, loose);
			case "<=": return lte(a, b, loose);
			default: throw new TypeError(`Invalid operator: ${op}`);
		}
	};
	module.exports = cmp;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/coerce.js
var require_coerce = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var parse = require_parse();
	var { safeRe: re, t } = require_re();
	var coerce = (version, options) => {
		if (version instanceof SemVer) return version;
		if (typeof version === "number") version = String(version);
		if (typeof version !== "string") return null;
		options = options || {};
		let match = null;
		if (!options.rtl) match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
		else {
			const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
			let next;
			while ((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)) {
				if (!match || next.index + next[0].length !== match.index + match[0].length) match = next;
				coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
			}
			coerceRtlRegex.lastIndex = -1;
		}
		if (match === null) return null;
		const major = match[2];
		return parse(`${major}.${match[3] || "0"}.${match[4] || "0"}${options.includePrerelease && match[5] ? `-${match[5]}` : ""}${options.includePrerelease && match[6] ? `+${match[6]}` : ""}`, options);
	};
	module.exports = coerce;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/truncate.js
var require_truncate = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var parse = require_parse();
	var constants = require_constants();
	var SemVer = require_semver$1();
	var truncate = (version, truncation, options) => {
		if (!constants.RELEASE_TYPES.includes(truncation)) return null;
		const clonedVersion = cloneInputVersion(version, options);
		return clonedVersion && doTruncation(clonedVersion, truncation);
	};
	var cloneInputVersion = (version, options) => {
		return parse(version instanceof SemVer ? version.version : version, options);
	};
	var doTruncation = (version, truncation) => {
		if (isPrerelease(truncation)) return version.version;
		version.prerelease = [];
		switch (truncation) {
			case "major":
				version.minor = 0;
				version.patch = 0;
				break;
			case "minor": version.patch = 0;
		}
		return version.format();
	};
	var isPrerelease = (type) => {
		return type.startsWith("pre");
	};
	module.exports = truncate;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/internal/lrucache.js
var require_lrucache = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var LRUCache = class {
		constructor() {
			this.max = 1e3;
			this.map = /* @__PURE__ */ new Map();
		}
		get(key) {
			const value = this.map.get(key);
			if (value === void 0) return;
			else {
				this.map.delete(key);
				this.map.set(key, value);
				return value;
			}
		}
		delete(key) {
			return this.map.delete(key);
		}
		set(key, value) {
			if (!this.delete(key) && value !== void 0) {
				if (this.map.size >= this.max) {
					const firstKey = this.map.keys().next().value;
					this.delete(firstKey);
				}
				this.map.set(key, value);
			}
			return this;
		}
	};
	module.exports = LRUCache;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/classes/range.js
var require_range = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SPACE_CHARACTERS = /\s+/g;
	module.exports = class Range {
		constructor(range, options) {
			options = parseOptions(options);
			if (range instanceof Range) {
				if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) return range;
				else return new Range(range.raw, options);
			}
			if (range instanceof Comparator) {
				this.raw = range.value;
				this.set = [[range]];
				this.formatted = void 0;
				return this;
			}
			this.options = options;
			this.loose = !!options.loose;
			this.includePrerelease = !!options.includePrerelease;
			this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
			this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
			if (!this.set.length) throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
			if (this.set.length > 1) {
				const first = this.set[0];
				this.set = this.set.filter((c) => !isNullSet(c[0]));
				if (this.set.length === 0) this.set = [first];
				else if (this.set.length > 1) {
					for (const c of this.set) if (c.length === 1 && isAny(c[0])) {
						this.set = [c];
						break;
					}
				}
			}
			this.formatted = void 0;
		}
		get range() {
			if (this.formatted === void 0) {
				this.formatted = "";
				for (let i = 0; i < this.set.length; i++) {
					if (i > 0) this.formatted += "||";
					const comps = this.set[i];
					for (let k = 0; k < comps.length; k++) {
						if (k > 0) this.formatted += " ";
						this.formatted += comps[k].toString().trim();
					}
				}
			}
			return this.formatted;
		}
		format() {
			return this.range;
		}
		toString() {
			return this.range;
		}
		parseRange(range) {
			range = range.replace(BUILDSTRIPRE, "");
			const memoKey = ((this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE)) + ":" + range;
			const cached = cache.get(memoKey);
			if (cached) return cached;
			const loose = this.options.loose;
			const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
			range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
			debug("hyphen replace", range);
			range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
			debug("comparator trim", range);
			range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
			debug("tilde trim", range);
			range = range.replace(re[t.CARETTRIM], caretTrimReplace);
			debug("caret trim", range);
			let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
			if (loose) rangeList = rangeList.filter((comp) => {
				debug("loose invalid filter", comp, this.options);
				return !!comp.match(re[t.COMPARATORLOOSE]);
			});
			debug("range list", rangeList);
			const rangeMap = /* @__PURE__ */ new Map();
			const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
			for (const comp of comparators) {
				if (isNullSet(comp)) return [comp];
				rangeMap.set(comp.value, comp);
			}
			if (rangeMap.size > 1 && rangeMap.has("")) rangeMap.delete("");
			const result = [...rangeMap.values()];
			cache.set(memoKey, result);
			return result;
		}
		intersects(range, options) {
			if (!(range instanceof Range)) throw new TypeError("a Range is required");
			return this.set.some((thisComparators) => {
				return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
					return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
						return rangeComparators.every((rangeComparator) => {
							return thisComparator.intersects(rangeComparator, options);
						});
					});
				});
			});
		}
		test(version) {
			if (!version) return false;
			if (typeof version === "string") try {
				version = new SemVer(version, this.options);
			} catch (er) {
				return false;
			}
			for (let i = 0; i < this.set.length; i++) if (testSet(this.set[i], version, this.options)) return true;
			return false;
		}
	};
	var cache = new (require_lrucache())();
	var parseOptions = require_parse_options();
	var Comparator = require_comparator();
	var debug = require_debug();
	var SemVer = require_semver$1();
	var { safeRe: re, src, t, comparatorTrimReplace, tildeTrimReplace, caretTrimReplace } = require_re();
	var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants();
	var BUILDSTRIPRE = new RegExp(src[t.BUILD], "g");
	var isNullSet = (c) => c.value === "<0.0.0-0";
	var isAny = (c) => c.value === "";
	var isSatisfiable = (comparators, options) => {
		let result = true;
		const remainingComparators = comparators.slice();
		let testComparator = remainingComparators.pop();
		while (result && remainingComparators.length) {
			result = remainingComparators.every((otherComparator) => {
				return testComparator.intersects(otherComparator, options);
			});
			testComparator = remainingComparators.pop();
		}
		return result;
	};
	var parseComparator = (comp, options) => {
		comp = comp.replace(re[t.BUILD], "");
		debug("comp", comp, options);
		comp = replaceCarets(comp, options);
		debug("caret", comp);
		comp = replaceTildes(comp, options);
		debug("tildes", comp);
		comp = replaceXRanges(comp, options);
		debug("xrange", comp);
		comp = replaceStars(comp, options);
		debug("stars", comp);
		return comp;
	};
	var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
	var invalidXRangeOrder = (M, m, p) => isX(M) && !isX(m) || isX(m) && p && !isX(p);
	var replaceTildes = (comp, options) => {
		return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
	};
	var replaceTilde = (comp, options) => {
		const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
		const z = options.includePrerelease ? "-0" : "";
		return comp.replace(r, (_, M, m, p, pr) => {
			debug("tilde", comp, _, M, m, p, pr);
			let ret;
			if (isX(M)) ret = "";
			else if (isX(m)) ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
			else if (isX(p)) ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
			else if (pr) {
				debug("replaceTilde pr", pr);
				ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
			} else ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
			debug("tilde return", ret);
			return ret;
		});
	};
	var replaceCarets = (comp, options) => {
		return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
	};
	var replaceCaret = (comp, options) => {
		debug("caret", comp, options);
		const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
		const z = options.includePrerelease ? "-0" : "";
		return comp.replace(r, (_, M, m, p, pr) => {
			debug("caret", comp, _, M, m, p, pr);
			let ret;
			if (isX(M)) ret = "";
			else if (isX(m)) ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
			else if (isX(p)) {
				if (M === "0") ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
				else ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
			} else if (pr) {
				debug("replaceCaret pr", pr);
				if (M === "0") {
					if (m === "0") ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
					else ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
				} else ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
			} else {
				debug("no pr");
				if (M === "0") {
					if (m === "0") ret = `>=${M}.${m}.${p} <${M}.${m}.${+p + 1}-0`;
					else ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
				} else ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
			}
			debug("caret return", ret);
			return ret;
		});
	};
	var replaceXRanges = (comp, options) => {
		debug("replaceXRanges", comp, options);
		return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
	};
	var replaceXRange = (comp, options) => {
		comp = comp.trim();
		const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
		return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
			debug("xRange", comp, ret, gtlt, M, m, p, pr);
			if (invalidXRangeOrder(M, m, p)) return comp;
			const xM = isX(M);
			const xm = xM || isX(m);
			const xp = xm || isX(p);
			const anyX = xp;
			if (gtlt === "=" && anyX) gtlt = "";
			pr = options.includePrerelease ? "-0" : "";
			if (xM) {
				if (gtlt === ">" || gtlt === "<") ret = "<0.0.0-0";
				else ret = "*";
			} else if (gtlt && anyX) {
				if (xm) m = 0;
				p = 0;
				if (gtlt === ">") {
					gtlt = ">=";
					if (xm) {
						M = +M + 1;
						m = 0;
						p = 0;
					} else {
						m = +m + 1;
						p = 0;
					}
				} else if (gtlt === "<=") {
					gtlt = "<";
					if (xm) M = +M + 1;
					else m = +m + 1;
				}
				if (gtlt === "<") pr = "-0";
				ret = `${gtlt + M}.${m}.${p}${pr}`;
			} else if (xm) ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
			else if (xp) ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
			debug("xRange return", ret);
			return ret;
		});
	};
	var replaceStars = (comp, options) => {
		debug("replaceStars", comp, options);
		return comp.trim().replace(re[t.STAR], "");
	};
	var replaceGTE0 = (comp, options) => {
		debug("replaceGTE0", comp, options);
		return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
	};
	var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
		if (isX(fM)) from = "";
		else if (isX(fm)) from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
		else if (isX(fp)) from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
		else if (fpr) from = `>=${from}`;
		else from = `>=${from}${incPr ? "-0" : ""}`;
		if (isX(tM)) to = "";
		else if (isX(tm)) to = `<${+tM + 1}.0.0-0`;
		else if (isX(tp)) to = `<${tM}.${+tm + 1}.0-0`;
		else if (tpr) to = `<=${tM}.${tm}.${tp}-${tpr}`;
		else if (incPr) to = `<${tM}.${tm}.${+tp + 1}-0`;
		else to = `<=${to}`;
		return `${from} ${to}`.trim();
	};
	var testSet = (set, version, options) => {
		for (let i = 0; i < set.length; i++) if (!set[i].test(version)) return false;
		if (version.prerelease.length && !options.includePrerelease) {
			for (let i = 0; i < set.length; i++) {
				debug(set[i].semver);
				if (set[i].semver === Comparator.ANY) continue;
				if (set[i].semver.prerelease.length > 0) {
					const allowed = set[i].semver;
					if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return true;
				}
			}
			return false;
		}
		return true;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/classes/comparator.js
var require_comparator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ANY = Symbol("SemVer ANY");
	module.exports = class Comparator {
		static get ANY() {
			return ANY;
		}
		constructor(comp, options) {
			options = parseOptions(options);
			if (comp instanceof Comparator) {
				if (comp.loose === !!options.loose) return comp;
				else comp = comp.value;
			}
			comp = comp.trim().split(/\s+/).join(" ");
			debug("comparator", comp, options);
			this.options = options;
			this.loose = !!options.loose;
			this.parse(comp);
			if (this.semver === ANY) this.value = "";
			else this.value = this.operator + this.semver.version;
			debug("comp", this);
		}
		parse(comp) {
			const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
			const m = comp.match(r);
			if (!m) throw new TypeError(`Invalid comparator: ${comp}`);
			this.operator = m[1] !== void 0 ? m[1] : "";
			if (this.operator === "=") this.operator = "";
			if (!m[2]) this.semver = ANY;
			else this.semver = new SemVer(m[2], this.options.loose);
		}
		toString() {
			return this.value;
		}
		test(version) {
			debug("Comparator.test", version, this.options.loose);
			if (this.semver === ANY || version === ANY) return true;
			if (typeof version === "string") try {
				version = new SemVer(version, this.options);
			} catch (er) {
				return false;
			}
			return cmp(version, this.operator, this.semver, this.options);
		}
		intersects(comp, options) {
			if (!(comp instanceof Comparator)) throw new TypeError("a Comparator is required");
			if (this.operator === "") {
				if (this.value === "") return true;
				return new Range(comp.value, options).test(this.value);
			} else if (comp.operator === "") {
				if (comp.value === "") return true;
				return new Range(this.value, options).test(comp.semver);
			}
			options = parseOptions(options);
			if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) return false;
			if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) return false;
			if (this.operator.startsWith(">") && comp.operator.startsWith(">")) return true;
			if (this.operator.startsWith("<") && comp.operator.startsWith("<")) return true;
			if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) return true;
			if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) return true;
			if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) return true;
			return false;
		}
	};
	var parseOptions = require_parse_options();
	var { safeRe: re, t } = require_re();
	var cmp = require_cmp();
	var debug = require_debug();
	var SemVer = require_semver$1();
	var Range = require_range();
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/satisfies.js
var require_satisfies = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Range = require_range();
	var satisfies = (version, range, options) => {
		try {
			range = new Range(range, options);
		} catch (er) {
			return false;
		}
		return range.test(version);
	};
	module.exports = satisfies;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/to-comparators.js
var require_to_comparators = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Range = require_range();
	var toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
	module.exports = toComparators;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var Range = require_range();
	var maxSatisfying = (versions, range, options) => {
		let max = null;
		let maxSV = null;
		let rangeObj = null;
		try {
			rangeObj = new Range(range, options);
		} catch (er) {
			return null;
		}
		versions.forEach((v) => {
			if (rangeObj.test(v)) {
				if (!max || maxSV.compare(v) === -1) {
					max = v;
					maxSV = new SemVer(max, options);
				}
			}
		});
		return max;
	};
	module.exports = maxSatisfying;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var Range = require_range();
	var minSatisfying = (versions, range, options) => {
		let min = null;
		let minSV = null;
		let rangeObj = null;
		try {
			rangeObj = new Range(range, options);
		} catch (er) {
			return null;
		}
		versions.forEach((v) => {
			if (rangeObj.test(v)) {
				if (!min || minSV.compare(v) === 1) {
					min = v;
					minSV = new SemVer(min, options);
				}
			}
		});
		return min;
	};
	module.exports = minSatisfying;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/min-version.js
var require_min_version = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var Range = require_range();
	var gt = require_gt();
	var minVersion = (range, loose) => {
		range = new Range(range, loose);
		let minver = new SemVer("0.0.0");
		if (range.test(minver)) return minver;
		minver = new SemVer("0.0.0-0");
		if (range.test(minver)) return minver;
		minver = null;
		for (let i = 0; i < range.set.length; ++i) {
			const comparators = range.set[i];
			let setMin = null;
			comparators.forEach((comparator) => {
				const compver = new SemVer(comparator.semver.version);
				switch (comparator.operator) {
					case ">":
						if (compver.prerelease.length === 0) compver.patch++;
						else compver.prerelease.push(0);
						compver.raw = compver.format();
					case "":
					case ">=":
						if (!setMin || gt(compver, setMin)) setMin = compver;
						break;
					case "<":
					case "<=": break;
					/* istanbul ignore next */
					default: throw new Error(`Unexpected operation: ${comparator.operator}`);
				}
			});
			if (setMin && (!minver || gt(minver, setMin))) minver = setMin;
		}
		if (minver && range.test(minver)) return minver;
		return null;
	};
	module.exports = minVersion;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/valid.js
var require_valid = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Range = require_range();
	var validRange = (range, options) => {
		try {
			return new Range(range, options).range || "*";
		} catch (er) {
			return null;
		}
	};
	module.exports = validRange;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/outside.js
var require_outside = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SemVer = require_semver$1();
	var Comparator = require_comparator();
	var { ANY } = Comparator;
	var Range = require_range();
	var satisfies = require_satisfies();
	var gt = require_gt();
	var lt = require_lt();
	var lte = require_lte();
	var gte = require_gte();
	var outside = (version, range, hilo, options) => {
		version = new SemVer(version, options);
		range = new Range(range, options);
		let gtfn, ltefn, ltfn, comp, ecomp;
		switch (hilo) {
			case ">":
				gtfn = gt;
				ltefn = lte;
				ltfn = lt;
				comp = ">";
				ecomp = ">=";
				break;
			case "<":
				gtfn = lt;
				ltefn = gte;
				ltfn = gt;
				comp = "<";
				ecomp = "<=";
				break;
			default: throw new TypeError("Must provide a hilo val of \"<\" or \">\"");
		}
		if (satisfies(version, range, options)) return false;
		for (let i = 0; i < range.set.length; ++i) {
			const comparators = range.set[i];
			let high = null;
			let low = null;
			comparators.forEach((comparator) => {
				if (comparator.semver === ANY) comparator = new Comparator(">=0.0.0");
				high = high || comparator;
				low = low || comparator;
				if (gtfn(comparator.semver, high.semver, options)) high = comparator;
				else if (ltfn(comparator.semver, low.semver, options)) low = comparator;
			});
			if (high.operator === comp || high.operator === ecomp) return false;
			if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) return false;
			else if (low.operator === ecomp && ltfn(version, low.semver)) return false;
		}
		return true;
	};
	module.exports = outside;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/gtr.js
var require_gtr = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var outside = require_outside();
	var gtr = (version, range, options) => outside(version, range, ">", options);
	module.exports = gtr;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/ltr.js
var require_ltr = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var outside = require_outside();
	var ltr = (version, range, options) => outside(version, range, "<", options);
	module.exports = ltr;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/intersects.js
var require_intersects = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Range = require_range();
	var intersects = (r1, r2, options) => {
		r1 = new Range(r1, options);
		r2 = new Range(r2, options);
		return r1.intersects(r2, options);
	};
	module.exports = intersects;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/simplify.js
var require_simplify = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var satisfies = require_satisfies();
	var compare = require_compare();
	module.exports = (versions, range, options) => {
		const set = [];
		let first = null;
		let prev = null;
		const v = versions.sort((a, b) => compare(a, b, options));
		for (const version of v) if (satisfies(version, range, options)) {
			prev = version;
			if (!first) first = version;
		} else {
			if (prev) set.push([first, prev]);
			prev = null;
			first = null;
		}
		if (first) set.push([first, null]);
		const ranges = [];
		for (const [min, max] of set) if (min === max) ranges.push(min);
		else if (!max && min === v[0]) ranges.push("*");
		else if (!max) ranges.push(`>=${min}`);
		else if (min === v[0]) ranges.push(`<=${max}`);
		else ranges.push(`${min} - ${max}`);
		const simplified = ranges.join(" || ");
		const original = typeof range.raw === "string" ? range.raw : String(range);
		return simplified.length < original.length ? simplified : range;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/subset.js
var require_subset = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Range = require_range();
	var Comparator = require_comparator();
	var { ANY } = Comparator;
	var satisfies = require_satisfies();
	var compare = require_compare();
	var subset = (sub, dom, options = {}) => {
		if (sub === dom) return true;
		sub = new Range(sub, options);
		dom = new Range(dom, options);
		let sawNonNull = false;
		OUTER: for (const simpleSub of sub.set) {
			for (const simpleDom of dom.set) {
				const isSub = simpleSubset(simpleSub, simpleDom, options);
				sawNonNull = sawNonNull || isSub !== null;
				if (isSub) continue OUTER;
			}
			if (sawNonNull) return false;
		}
		return true;
	};
	var minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
	var minimumVersion = [new Comparator(">=0.0.0")];
	var simpleSubset = (sub, dom, options) => {
		if (sub === dom) return true;
		if (sub.length === 1 && sub[0].semver === ANY) {
			if (dom.length === 1 && dom[0].semver === ANY) return true;
			else if (options.includePrerelease) sub = minimumVersionWithPreRelease;
			else sub = minimumVersion;
		}
		if (dom.length === 1 && dom[0].semver === ANY) {
			if (options.includePrerelease) return true;
			else dom = minimumVersion;
		}
		const eqSet = /* @__PURE__ */ new Set();
		let gt, lt;
		for (const c of sub) if (c.operator === ">" || c.operator === ">=") gt = higherGT(gt, c, options);
		else if (c.operator === "<" || c.operator === "<=") lt = lowerLT(lt, c, options);
		else eqSet.add(c.semver);
		if (eqSet.size > 1) return null;
		let gtltComp;
		if (gt && lt) {
			gtltComp = compare(gt.semver, lt.semver, options);
			if (gtltComp > 0) return null;
			else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) return null;
		}
		for (const eq of eqSet) {
			if (gt && !satisfies(eq, String(gt), options)) return null;
			if (lt && !satisfies(eq, String(lt), options)) return null;
			for (const c of dom) if (!satisfies(eq, String(c), options)) return false;
			return true;
		}
		let higher, lower;
		let hasDomLT, hasDomGT;
		let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
		let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
		if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) needDomLTPre = false;
		for (const c of dom) {
			hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
			hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
			if (gt) {
				if (needDomGTPre) {
					if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) needDomGTPre = false;
				}
				if (c.operator === ">" || c.operator === ">=") {
					higher = higherGT(gt, c, options);
					if (higher === c && higher !== gt) return false;
				} else if (gt.operator === ">=" && !c.test(gt.semver)) return false;
			}
			if (lt) {
				if (needDomLTPre) {
					if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) needDomLTPre = false;
				}
				if (c.operator === "<" || c.operator === "<=") {
					lower = lowerLT(lt, c, options);
					if (lower === c && lower !== lt) return false;
				} else if (lt.operator === "<=" && !c.test(lt.semver)) return false;
			}
			if (!c.operator && (lt || gt) && gtltComp !== 0) return false;
		}
		if (gt && hasDomLT && !lt && gtltComp !== 0) return false;
		if (lt && hasDomGT && !gt && gtltComp !== 0) return false;
		if (needDomGTPre || needDomLTPre) return false;
		return true;
	};
	var higherGT = (a, b, options) => {
		if (!a) return b;
		const comp = compare(a.semver, b.semver, options);
		return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
	};
	var lowerLT = (a, b, options) => {
		if (!a) return b;
		const comp = compare(a.semver, b.semver, options);
		return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
	};
	module.exports = subset;
}));
//#endregion
//#region ../../node_modules/.pnpm/semver@7.8.5/node_modules/semver/index.js
var require_semver = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var internalRe = require_re();
	var constants = require_constants();
	var SemVer = require_semver$1();
	var identifiers = require_identifiers();
	module.exports = {
		parse: require_parse(),
		valid: require_valid$1(),
		clean: require_clean(),
		inc: require_inc(),
		diff: require_diff(),
		major: require_major(),
		minor: require_minor(),
		patch: require_patch(),
		prerelease: require_prerelease(),
		compare: require_compare(),
		rcompare: require_rcompare(),
		compareLoose: require_compare_loose(),
		compareBuild: require_compare_build(),
		sort: require_sort(),
		rsort: require_rsort(),
		gt: require_gt(),
		lt: require_lt(),
		eq: require_eq(),
		neq: require_neq(),
		gte: require_gte(),
		lte: require_lte(),
		cmp: require_cmp(),
		coerce: require_coerce(),
		truncate: require_truncate(),
		Comparator: require_comparator(),
		Range: require_range(),
		satisfies: require_satisfies(),
		toComparators: require_to_comparators(),
		maxSatisfying: require_max_satisfying(),
		minSatisfying: require_min_satisfying(),
		minVersion: require_min_version(),
		validRange: require_valid(),
		outside: require_outside(),
		gtr: require_gtr(),
		ltr: require_ltr(),
		intersects: require_intersects(),
		simplifyRange: require_simplify(),
		subset: require_subset(),
		SemVer,
		re: internalRe.re,
		src: internalRe.src,
		tokens: internalRe.t,
		SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
		RELEASE_TYPES: constants.RELEASE_TYPES,
		compareIdentifiers: identifiers.compareIdentifiers,
		rcompareIdentifiers: identifiers.rcompareIdentifiers
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.6.2_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/manager-api/index.js
function getAddonsStore() {
	return globalThis[KEY] || (globalThis[KEY] = new AddonStore()), globalThis[KEY];
}
function ensurePanel(panels, selectedPanel, currentPanel) {
	let keys2 = Object.keys(panels ?? {});
	return keys2.indexOf(selectedPanel) >= 0 ? selectedPanel : keys2.length ? keys2[0] : currentPanel;
}
async function handleRequest(request) {
	if (!request) return {};
	try {
		let response = await request;
		if (response === !1 || response === !0) throw new Error("Unexpected boolean response");
		if (!response.ok) {
			if (response.status === 401) try {
				let json2 = await response.json();
				if (json2.loginUrl) return { loginUrl: json2.loginUrl };
			} catch {}
			throw new Error(`Unexpected response not OK: ${response.statusText}`);
		}
		let json = await response.json();
		return json.entries || json.stories ? { storyIndex: json } : json;
	} catch (err) {
		return { indexError: err };
	}
}
function wasFocusInElement(element) {
	return document3$1.activeElement && element?.contains(document3$1.activeElement);
}
function keys(o) {
	return Object.keys(o);
}
function shouldSkipShortcut(event) {
	let target = event.target;
	return !!(/input|textarea/i.test(target.tagName) || target.getAttribute("contenteditable") !== null || target.closest("dialog[open]"));
}
function removeRemovedOptions(options) {
	if (!options || typeof options == "string") return options;
	let result = { ...options };
	return removedOptions.forEach((option) => {
		option in result && delete result[option];
	}), result;
}
function get(storage) {
	return storage.get(STORAGE_KEY) || {};
}
function set(storage, value) {
	return storage.set(STORAGE_KEY, value);
}
function update(storage, patch) {
	return set(storage, {
		...get(storage),
		...patch
	});
}
function ManagerConsumer({ filter = defaultFilter, children }) {
	let managerContext = (0, import_react$176.useContext)(ManagerContext), renderer = (0, import_react$176.useRef)(children), filterer = (0, import_react$176.useRef)(filter);
	if (typeof renderer.current != "function") return import_react$176.createElement(import_react$176.Fragment, null, renderer.current);
	let comboData = filterer.current(managerContext), comboDataArray = (0, import_react$176.useMemo)(() => [...Object.entries(comboData).reduce((acc, keyval) => acc.concat(keyval), [])], [managerContext.state]);
	return (0, import_react$176.useMemo)(() => {
		let Child = renderer.current;
		return import_react$176.createElement(Child, { ...comboData });
	}, comboDataArray);
}
function createTestProviderStore({ universalTestProviderStore: universalTestProviderStore2, useUniversalStore: useUniversalStore2 }) {
	let baseStore = {
		settingsChanged: () => {
			universalTestProviderStore2.untilReady().then(() => {
				universalTestProviderStore2.send({ type: "settings-changed" });
			});
		},
		onRunAll: (listener) => universalTestProviderStore2.subscribe("run-all", listener),
		onClearAll: (listener) => universalTestProviderStore2.subscribe("clear-all", listener)
	}, fullTestProviderStore2 = {
		...baseStore,
		getFullState: universalTestProviderStore2.getState,
		setFullState: universalTestProviderStore2.setState,
		onSettingsChanged: (listener) => universalTestProviderStore2.subscribe("settings-changed", listener),
		runAll: async () => {
			await universalTestProviderStore2.untilReady(), universalTestProviderStore2.send({ type: "run-all" });
		},
		clearAll: async () => {
			await universalTestProviderStore2.untilReady(), universalTestProviderStore2.send({ type: "clear-all" });
		}
	}, getTestProviderStoreById2 = (testProviderId) => {
		let getStateForTestProvider = () => universalTestProviderStore2.getState()[testProviderId] ?? "test-provider-state:pending", setStateForTestProvider = (state) => {
			universalTestProviderStore2.untilReady().then(() => {
				universalTestProviderStore2.setState((currentState) => ({
					...currentState,
					[testProviderId]: state
				}));
			});
		};
		return {
			...baseStore,
			testProviderId,
			getState: getStateForTestProvider,
			setState: setStateForTestProvider,
			runWithState: async (callback) => {
				setStateForTestProvider("test-provider-state:running");
				try {
					await callback(), setStateForTestProvider("test-provider-state:succeeded");
				} catch {
					setStateForTestProvider("test-provider-state:crashed");
				}
			}
		};
	};
	return useUniversalStore2 ? {
		getTestProviderStoreById: getTestProviderStoreById2,
		fullTestProviderStore: fullTestProviderStore2,
		universalTestProviderStore: universalTestProviderStore2,
		useTestProviderStore: (selector) => useUniversalStore2(universalTestProviderStore2, selector)[0]
	} : {
		getTestProviderStoreById: getTestProviderStoreById2,
		fullTestProviderStore: fullTestProviderStore2,
		universalTestProviderStore: universalTestProviderStore2
	};
}
var import_react$176, import_react$177, import_react$178, import_react$179, import_semver, import_react$180, require_toggle_selection, require_copy_to_clipboard, require_store2, DOCS_PREPARED2, SET_STORIES2, SHARED_STATE_CHANGED, SHARED_STATE_SET, STORY_CHANGED2, STORY_PREPARED2, createContext$1, logger, merge_default, noArrayMerge, main, initial_state_default, logger2, SET_CONFIG, Addon_TypesEnum, AddonStore, KEY, addons_exports, logger3, Addon_TypesEnum2, init, channel_exports, init2, globals_exports, logger5, GLOBALS_UPDATED, SET_GLOBALS, UPDATE_GLOBALS, logger4, refs_exports, global$2, import_memoizerific$1, intersect_default, TITLE_PATH_SEPARATOR, denormalizeStoryParameters, transformSetStoriesStoryDataToPreparedStoryIndex, transformStoryIndexV2toV3, transformStoryIndexV3toV4, transformStoryIndexV4toV5, transformStoryIndexToStoriesHash, addPreparedStories, getComponentLookupList, getStoriesLookupList, location$1, fetch, getSourceType, defaultStoryMapper, addRefIds, applyRefStoryUpdates, parseUrl, getRedirectedRefUrl, map, init3, getEventMetadata, init4, layout_exports, SET_CONFIG2, global2$1, deprecate$1, document2$1, isFunction, ActiveTabs, isPagesViewMode, DEFAULT_NAV_SIZE, DEFAULT_BOTTOM_PANEL_HEIGHT, DEFAULT_RIGHT_PANEL_WIDTH, getDefaultLayoutState, focusableUIElements, getIsNavShown, getIsPanelShown, getIsFullscreen, getRecentVisibleSizes, applyLayoutOptions, applyUiOptions, isDesktopViewport, init5, notifications_exports, init6, open_in_editor_exports, OPEN_IN_EDITOR_REQUEST, OPEN_IN_EDITOR_RESPONSE, init7, provider_exports, init8, settings_exports, init9, shortcuts_exports, import_copy_to_clipboard, FORCE_REMOUNT, PREVIEW_KEYDOWN, STORIES_COLLAPSE_ALL, STORIES_EXPAND_ALL, global4, global3, navigator2, isMacLike, optionOrAltSymbol, eventToShortcut, shortcutMatchesShortcut, keyToSymbol, shortcutToHumanString, shortcutToAriaKeyshortcuts, navigator3, document3$1, isMacLike2, controlOrMetaKey2, defaultShortcuts, addonsShortcuts, init10, stories_exports, logger6, CONFIG_ERROR, CURRENT_STORY_WAS_SET, DOCS_PREPARED, PRELOAD_ENTRIES, RESET_STORY_ARGS, SELECT_STORY, SET_CONFIG3, SET_CURRENT_STORY, SET_FILTER, SET_INDEX, SET_STORIES, SIDEBAR_FILTER_CHANGED, STORY_ARGS_UPDATED, STORY_CHANGED, STORY_INDEX_INVALIDATED, STORY_MISSING, STORY_PREPARED, STORY_SPECIFIED, UPDATE_STORY_ARGS, global5, buildNavigationUrl, useUniversalStore, fullStatusStore, getStatusStoreByTypeId, useStatusStore, universalStatusStore, parseFilterParam, parseStatusesParam, serializeStatusesParam, computeStatusFilterFn, import_memoizerific2$1, BUILT_IN_URL_TAG_MAP, parseTagsParam, serializeTagsParam, getDefaultTagsFromPreset, computeStaticFilterFn, computeTagsFilterFn, fetch2, STORY_INDEX_PATH, TAGS_FILTER, STATIC_FILTER, STATUS_FILTER, BUILT_IN_TAG_IDS, removedOptions, FILTER_KEYS, init11, url_exports, GLOBALS_UPDATED2, NAVIGATE_URL, SET_CURRENT_STORY2, STORY_ARGS_UPDATED2, UPDATE_QUERY_PARAMS, global6, parseBoolean, parseSerializedParam, mergeSerializedParams, LAYOUT_QUERY_PARAM_KEYS, getCustomQueryParams, prevParams, initialUrlSupport, init12, versions_exports, import_memoizerific3, global7, version, VERSIONCHECK, getVersionCheckData, normalizeRendererName, init13, whatsnew_exports, REQUEST_WHATS_NEW_DATA, RESULT_WHATS_NEW_DATA, SET_WHATS_NEW_CACHE, TOGGLE_WHATS_NEW_NOTIFICATIONS, global8, WHATS_NEW_NOTIFICATION_ID, StorybookIcon, init14, import_store2, store_setup_default, STORAGE_KEY, Store, ActiveTabs2, ManagerContext, combineParameters, ManagerProvider, EffectOnMount, defaultFilter, STORYBOOK_ADDON_STATE, Channel, UNIVERSAL_TEST_PROVIDER_STORE_OPTIONS, fullTestProviderStore, getTestProviderStoreById, useTestProviderStore, universalTestProviderStore, UNIVERSAL_CHECKLIST_STORE_OPTIONS, createChecklistStore, universalChecklistStore;
function init_manager_api() {
	return (init_manager_api = __esmMin((() => {
		init_chunk_MOVZJCSM();
		init_chunk_73YSBJE2();
		init_chunk_J3E3FSHW();
		init_chunk_YI2IBIQS();
		init_chunk_A26ZOLVJ();
		init_chunk_KK3JJ3E4();
		init_chunk_SFVA4SBT();
		init_chunk_DRQKCCAG();
		init_chunk_7PIQR4A3();
		init_chunk_Z3B64JMR();
		init_chunk_IMSF75WX();
		import_react$176 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$177 = require_react();
		init_csf();
		init_chunk_GLOGC42D();
		import_react$178 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		init_dist();
		init_router();
		import_react$179 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_semver = /* @__PURE__ */ __toESM$1(require_semver(), 1);
		import_react$180 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		init_preload_helper();
		require_toggle_selection = __commonJS$1({ "../../node_modules/toggle-selection/index.js"(exports, module) {
			module.exports = function() {
				var selection = document.getSelection();
				if (!selection.rangeCount) return function() {};
				for (var active = document.activeElement, ranges = [], i = 0; i < selection.rangeCount; i++) ranges.push(selection.getRangeAt(i));
				switch (active.tagName.toUpperCase()) {
					case "INPUT":
					case "TEXTAREA":
						active.blur();
						break;
					default: active = null;
				}
				return selection.removeAllRanges(), function() {
					selection.type === "Caret" && selection.removeAllRanges(), selection.rangeCount || ranges.forEach(function(range) {
						selection.addRange(range);
					}), active && active.focus();
				};
			};
		} });
		require_copy_to_clipboard = __commonJS$1({ "../../node_modules/copy-to-clipboard/index.js"(exports, module) {
			"use strict";
			var deselectCurrent = require_toggle_selection(), clipboardToIE11Formatting = {
				"text/plain": "Text",
				"text/html": "Url",
				default: "Text"
			}, defaultMessage = "Copy to clipboard: #{key}, Enter";
			function format(message) {
				var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
				return message.replace(/#{\s*key\s*}/g, copyKey);
			}
			function copy2(text, options) {
				var debug, message, reselectPrevious, range, selection, mark, success = !1;
				options || (options = {}), debug = options.debug || !1;
				try {
					reselectPrevious = deselectCurrent(), range = document.createRange(), selection = document.getSelection(), mark = document.createElement("span"), mark.textContent = text, mark.ariaHidden = "true", mark.style.all = "unset", mark.style.position = "fixed", mark.style.top = 0, mark.style.clip = "rect(0, 0, 0, 0)", mark.style.whiteSpace = "pre", mark.style.webkitUserSelect = "text", mark.style.MozUserSelect = "text", mark.style.msUserSelect = "text", mark.style.userSelect = "text", mark.addEventListener("copy", function(e) {
						if (e.stopPropagation(), options.format) if (e.preventDefault(), typeof e.clipboardData > "u") {
							debug && console.warn("unable to use e.clipboardData"), debug && console.warn("trying IE specific stuff"), window.clipboardData.clearData();
							var format2 = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting.default;
							window.clipboardData.setData(format2, text);
						} else e.clipboardData.clearData(), e.clipboardData.setData(options.format, text);
						options.onCopy && (e.preventDefault(), options.onCopy(e.clipboardData));
					}), document.body.appendChild(mark), range.selectNodeContents(mark), selection.addRange(range);
					if (!document.execCommand("copy")) throw new Error("copy command was unsuccessful");
					success = !0;
				} catch (err) {
					debug && console.error("unable to copy using execCommand: ", err), debug && console.warn("trying IE specific stuff");
					try {
						window.clipboardData.setData(options.format || "text", text), options.onCopy && options.onCopy(window.clipboardData), success = !0;
					} catch (err2) {
						debug && console.error("unable to copy using clipboardData: ", err2), debug && console.error("falling back to prompt"), message = format("message" in options ? options.message : defaultMessage), window.prompt(message, text);
					}
				} finally {
					selection && (typeof selection.removeRange == "function" ? selection.removeRange(range) : selection.removeAllRanges()), mark && document.body.removeChild(mark), reselectPrevious();
				}
				return success;
			}
			module.exports = copy2;
		} });
		require_store2 = __commonJS$1({ "../../node_modules/store2/dist/store2.js"(exports, module) {
			(function(window2, define) {
				var _ = {
					version: "2.14.4",
					areas: {},
					apis: {},
					nsdelim: ".",
					inherit: function(api, o) {
						for (var p in api) o.hasOwnProperty(p) || Object.defineProperty(o, p, Object.getOwnPropertyDescriptor(api, p));
						return o;
					},
					stringify: function(d, fn) {
						return d === void 0 || typeof d == "function" ? d + "" : JSON.stringify(d, fn || _.replace);
					},
					parse: function(s, fn) {
						try {
							return JSON.parse(s, fn || _.revive);
						} catch {
							return s;
						}
					},
					fn: function(name, fn) {
						_.storeAPI[name] = fn;
						for (var api in _.apis) _.apis[api][name] = fn;
					},
					get: function(area, key) {
						return area.getItem(key);
					},
					set: function(area, key, string) {
						area.setItem(key, string);
					},
					remove: function(area, key) {
						area.removeItem(key);
					},
					key: function(area, i) {
						return area.key(i);
					},
					length: function(area) {
						return area.length;
					},
					clear: function(area) {
						area.clear();
					},
					Store: function(id, area, namespace) {
						var store3 = _.inherit(_.storeAPI, function(key, data, overwrite) {
							return arguments.length === 0 ? store3.getAll() : typeof data == "function" ? store3.transact(key, data, overwrite) : data !== void 0 ? store3.set(key, data, overwrite) : typeof key == "string" || typeof key == "number" ? store3.get(key) : typeof key == "function" ? store3.each(key) : key ? store3.setAll(key, data) : store3.clear();
						});
						store3._id = id;
						try {
							var testKey = "__store2_test";
							area.setItem(testKey, "ok"), store3._area = area, area.removeItem(testKey);
						} catch {
							store3._area = _.storage("fake");
						}
						return store3._ns = namespace || "", _.areas[id] || (_.areas[id] = store3._area), _.apis[store3._ns + store3._id] || (_.apis[store3._ns + store3._id] = store3), store3;
					},
					storeAPI: {
						area: function(id, area) {
							var store3 = this[id];
							return (!store3 || !store3.area) && (store3 = _.Store(id, area, this._ns), this[id] || (this[id] = store3)), store3;
						},
						namespace: function(namespace, singleArea, delim) {
							if (delim = delim || this._delim || _.nsdelim, !namespace) return this._ns ? this._ns.substring(0, this._ns.length - delim.length) : "";
							var ns = namespace, store3 = this[ns];
							if ((!store3 || !store3.namespace) && (store3 = _.Store(this._id, this._area, this._ns + ns + delim), store3._delim = delim, this[ns] || (this[ns] = store3), !singleArea)) for (var name in _.areas) store3.area(name, _.areas[name]);
							return store3;
						},
						isFake: function(force) {
							return force ? (this._real = this._area, this._area = _.storage("fake")) : force === !1 && (this._area = this._real || this._area), this._area.name === "fake";
						},
						toString: function() {
							return "store" + (this._ns ? "." + this.namespace() : "") + "[" + this._id + "]";
						},
						has: function(key) {
							return this._area.has ? this._area.has(this._in(key)) : this._in(key) in this._area;
						},
						size: function() {
							return this.keys().length;
						},
						each: function(fn, fill) {
							for (var i = 0, m = _.length(this._area); i < m; i++) {
								var key = this._out(_.key(this._area, i));
								if (key !== void 0 && fn.call(this, key, this.get(key), fill) === !1) break;
								m > _.length(this._area) && (m--, i--);
							}
							return fill || this;
						},
						keys: function(fillList) {
							return this.each(function(k, v, list) {
								list.push(k);
							}, fillList || []);
						},
						get: function(key, alt) {
							var s = _.get(this._area, this._in(key)), fn;
							return typeof alt == "function" && (fn = alt, alt = null), s !== null ? _.parse(s, fn) : alt ?? s;
						},
						getAll: function(fillObj) {
							return this.each(function(k, v, all) {
								all[k] = v;
							}, fillObj || {});
						},
						transact: function(key, fn, alt) {
							var val = this.get(key, alt), ret = fn(val);
							return this.set(key, ret === void 0 ? val : ret), this;
						},
						set: function(key, data, overwrite) {
							var d = this.get(key), replacer;
							return d != null && overwrite === !1 ? data : (typeof overwrite == "function" && (replacer = overwrite, overwrite = void 0), _.set(this._area, this._in(key), _.stringify(data, replacer), overwrite) || d);
						},
						setAll: function(data, overwrite) {
							var changed, val;
							for (var key in data) val = data[key], this.set(key, val, overwrite) !== val && (changed = !0);
							return changed;
						},
						add: function(key, data, replacer) {
							var d = this.get(key);
							if (d instanceof Array) data = d.concat(data);
							else if (d !== null) {
								var type = typeof d;
								if (type === typeof data && type === "object") {
									for (var k in data) d[k] = data[k];
									data = d;
								} else data = d + data;
							}
							return _.set(this._area, this._in(key), _.stringify(data, replacer)), data;
						},
						remove: function(key, alt) {
							var d = this.get(key, alt);
							return _.remove(this._area, this._in(key)), d;
						},
						clear: function() {
							return this._ns ? this.each(function(k) {
								_.remove(this._area, this._in(k));
							}, 1) : _.clear(this._area), this;
						},
						clearAll: function() {
							var area = this._area;
							for (var id in _.areas) _.areas.hasOwnProperty(id) && (this._area = _.areas[id], this.clear());
							return this._area = area, this;
						},
						_in: function(k) {
							return typeof k != "string" && (k = _.stringify(k)), this._ns ? this._ns + k : k;
						},
						_out: function(k) {
							return this._ns ? k && k.indexOf(this._ns) === 0 ? k.substring(this._ns.length) : void 0 : k;
						}
					},
					storage: function(name) {
						return _.inherit(_.storageAPI, {
							items: {},
							name
						});
					},
					storageAPI: {
						length: 0,
						has: function(k) {
							return this.items.hasOwnProperty(k);
						},
						key: function(i) {
							var c = 0;
							for (var k in this.items) if (this.has(k) && i === c++) return k;
						},
						setItem: function(k, v) {
							this.has(k) || this.length++, this.items[k] = v;
						},
						removeItem: function(k) {
							this.has(k) && (delete this.items[k], this.length--);
						},
						getItem: function(k) {
							return this.has(k) ? this.items[k] : null;
						},
						clear: function() {
							for (var k in this.items) this.removeItem(k);
						}
					}
				}, store2 = _.Store("local", (function() {
					try {
						return localStorage;
					} catch {}
				})());
				store2.local = store2, store2._ = _, store2.area("session", (function() {
					try {
						return sessionStorage;
					} catch {}
				})()), store2.area("page", _.storage("page")), typeof define == "function" && define.amd !== void 0 ? define("store2", [], function() {
					return store2;
				}) : typeof module < "u" && module.exports ? module.exports = store2 : (window2.store && (_.conflict = window2.store), window2.store = store2);
			})(exports, exports && exports.define);
		} });
		({DOCS_PREPARED: DOCS_PREPARED2, SET_STORIES: SET_STORIES2, SHARED_STATE_CHANGED, SHARED_STATE_SET, STORY_CHANGED: STORY_CHANGED2, STORY_PREPARED: STORY_PREPARED2} = __STORYBOOK_MODULE_CORE_EVENTS__);
		createContext$1 = ({ api, state }) => (0, import_react$177.createContext)({
			api,
			state
		});
		({logger} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		merge_default = (a, ...b) => {
			let target = {};
			target = mergeWith({}, a, (objValue, srcValue) => {
				if (Array.isArray(srcValue) && Array.isArray(objValue)) return srcValue.forEach((s) => {
					objValue.find((o) => o === s || isEqual(o, s)) || objValue.push(s);
				}), objValue;
				if (Array.isArray(objValue)) return logger.log(["the types mismatch, picking", objValue]), objValue;
			});
			for (let obj of b) target = mergeWith(target, obj, (objValue, srcValue) => {
				if (Array.isArray(srcValue) && Array.isArray(objValue)) return srcValue.forEach((s) => {
					objValue.find((o) => o === s || isEqual(o, s)) || objValue.push(s);
				}), objValue;
				if (Array.isArray(objValue)) return logger.log(["the types mismatch, picking", objValue]), objValue;
			});
			return target;
		};
		noArrayMerge = (a, ...b) => {
			let target = {};
			target = mergeWith({}, a, (objValue, srcValue) => {
				if (Array.isArray(srcValue)) return srcValue;
			});
			for (let obj of b) target = mergeWith(target, obj, (objValue, srcValue) => {
				if (Array.isArray(srcValue)) return srcValue;
			});
			return target;
		};
		main = (...additions) => additions.reduce((acc, item) => merge_default(acc, item), {});
		initial_state_default = main;
		({logger: logger2} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		({SET_CONFIG} = __STORYBOOK_MODULE_CORE_EVENTS__);
		({Addon_TypesEnum} = __STORYBOOK_MODULE_TYPES__);
		AddonStore = class {
			constructor() {
				this.loaders = {};
				this.elements = {};
				this.config = {};
				this.getChannel = () => {
					if (this.channel) return this.channel;
					let installed = getChannel();
					return installed ? (this.channel = installed, this.resolve(), this.channel) : mockChannel();
				};
				this.ready = () => this.promise;
				this.hasChannel = () => !!this.channel || !!getChannel();
				this.setChannel = (channel) => {
					this.channel = channel, setChannel(channel), this.resolve();
				};
				this.setConfig = (value) => {
					Object.assign(this.config, value), this.hasChannel() ? this.getChannel().emit(SET_CONFIG, this.config) : this.ready().then((channel) => {
						channel.emit(SET_CONFIG, this.config);
					});
				};
				this.getConfig = () => this.config;
				/**
				* Registers an addon loader function.
				*
				* @param {string} id - The id of the addon loader.
				* @param {(api: API) => void} callback - The function that will be called to register the addon.
				* @returns {void}
				*/
				this.register = (id, callback) => {
					this.loaders[id] && logger2.warn(`${id} was loaded twice, this could have bad side-effects`), this.loaders[id] = callback;
				};
				this.loadAddons = (api) => {
					Object.values(this.loaders).forEach((value) => value(api));
				};
				this.promise = new Promise((res) => {
					this.resolve = () => res(this.getChannel());
				});
			}
			getElements(type) {
				return this.elements[type] || (this.elements[type] = {}), this.elements[type];
			}
			/**
			* Adds an addon to the addon store.
			*
			* @param {string} id - The id of the addon.
			* @param {Addon_Type} addon - The addon to add.
			* @returns {void}
			*/
			add(id, addon) {
				let { type } = addon, collection = this.getElements(type);
				collection[id] = {
					...addon,
					id
				};
			}
			experimental_getRegisteredAddons(type) {
				return Object.keys(type ? this.getElements(type) : this.loaders);
			}
		};
		KEY = "__STORYBOOK_ADDONS_MANAGER";
		getAddonsStore();
		addons_exports = {};
		__export(addons_exports, {
			ensurePanel: () => ensurePanel,
			init: () => init
		});
		({logger: logger3} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		({Addon_TypesEnum: Addon_TypesEnum2} = __STORYBOOK_MODULE_TYPES__);
		init = ({ provider, store: store2, fullAPI }) => {
			let api = {
				getElements: (type) => provider.getElements(type),
				clearStatuses: () => {
					let testProviders = api.getElements(Addon_TypesEnum2.experimental_TEST_PROVIDER);
					Object.values(testProviders).forEach((testProvider) => {
						try {
							testProvider.clear?.();
						} catch (e) {
							try {
								logger3.warn(`Failed to clear test provider "${testProvider.id}":`, e);
							} catch {}
						}
					});
				},
				getSelectedPanel: () => {
					let { selectedPanel } = store2.getState();
					return ensurePanel(api.getElements(Addon_TypesEnum2.PANEL), selectedPanel, selectedPanel);
				},
				setSelectedPanel: (panelName) => {
					store2.setState({ selectedPanel: panelName }, { persistence: "session" });
				},
				setAddonState(addonId, newStateOrMerger, options) {
					let merger = typeof newStateOrMerger == "function" ? newStateOrMerger : () => newStateOrMerger;
					return store2.setState((s) => ({
						...s,
						addons: {
							...s.addons,
							[addonId]: merger(s.addons[addonId])
						}
					}), options).then(() => api.getAddonState(addonId));
				},
				getAddonState: (addonId) => store2.getState().addons[addonId] || globalThis?.STORYBOOK_ADDON_STATE[addonId]
			};
			return {
				api,
				state: {
					selectedPanel: ensurePanel(api.getElements(Addon_TypesEnum2.PANEL), store2.getState().selectedPanel),
					addons: {}
				}
			};
		};
		channel_exports = {};
		__export(channel_exports, { init: () => init2 });
		init2 = ({ provider }) => ({
			api: {
				getChannel: () => provider.channel,
				on: (type, handler) => (provider.channel?.on(type, handler), () => provider.channel?.off(type, handler)),
				off: (type, handler) => provider.channel?.off(type, handler),
				once: (type, handler) => provider.channel?.once(type, handler),
				emit: (type, data, ...args) => {
					data?.options?.target && data.options.target !== "storybook-preview-iframe" && !data.options.target.startsWith("storybook-ref-") && (data.options.target = data.options.target !== "storybook_internal" ? `storybook-ref-${data.options.target}` : "storybook-preview-iframe"), provider.channel?.emit(type, data, ...args);
				}
			},
			state: {}
		});
		globals_exports = {};
		__export(globals_exports, { init: () => init4 });
		({logger: logger5} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		({GLOBALS_UPDATED, SET_GLOBALS, UPDATE_GLOBALS} = __STORYBOOK_MODULE_CORE_EVENTS__);
		({logger: logger4} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		refs_exports = {};
		__export(refs_exports, {
			defaultStoryMapper: () => defaultStoryMapper,
			getSourceType: () => getSourceType,
			init: () => init3
		});
		({global: global$2} = __STORYBOOK_MODULE_GLOBAL__);
		import_memoizerific$1 = __toESM$2(require_memoizerific(), 1);
		intersect_default = (a, b) => !Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length ? [] : a.reduce((acc, aValue) => (b.includes(aValue) && acc.push(aValue), acc), []);
		TITLE_PATH_SEPARATOR = /\s*\/\s*/;
		denormalizeStoryParameters = ({ globalParameters, kindParameters, stories }) => mapValues(stories, (storyData) => ({
			...storyData,
			parameters: combineParameters(globalParameters, kindParameters[storyData.kind], storyData.parameters)
		}));
		transformSetStoriesStoryDataToPreparedStoryIndex = (stories) => ({
			v: 5,
			entries: Object.entries(stories).reduce((acc, [id, story]) => {
				if (!story) return acc;
				let { docsOnly, fileName, ...parameters } = story.parameters, base = {
					title: story.kind,
					id,
					name: story.name,
					importPath: fileName
				};
				if (docsOnly) acc[id] = {
					type: "docs",
					tags: ["stories-mdx"],
					storiesImports: [],
					...base
				};
				else {
					let { argTypes, args, initialArgs } = story;
					acc[id] = {
						type: "story",
						subtype: "story",
						...base,
						parameters,
						argTypes,
						args,
						initialArgs
					};
				}
				return acc;
			}, {})
		});
		transformStoryIndexV2toV3 = (index) => ({
			v: 3,
			stories: Object.values(index.stories).reduce((acc, entry) => (acc[entry.id] = {
				...entry,
				title: entry.kind,
				name: entry.name || entry.story,
				importPath: entry.parameters.fileName || ""
			}, acc), {})
		});
		transformStoryIndexV3toV4 = (index) => {
			let countByTitle = countBy(Object.values(index.stories), (item) => item.title);
			return {
				v: 4,
				entries: Object.values(index.stories).reduce((acc, entry) => {
					let type = "story";
					return (entry.parameters?.docsOnly || entry.name === "Page" && countByTitle[entry.title] === 1) && (type = "docs"), acc[entry.id] = {
						type,
						...type === "docs" && {
							tags: ["stories-mdx"],
							storiesImports: []
						},
						...entry
					}, delete acc[entry.id].story, delete acc[entry.id].kind, acc;
				}, {})
			};
		};
		transformStoryIndexV4toV5 = (index) => ({
			v: 5,
			entries: Object.values(index.entries).reduce((acc, entry) => (acc[entry.id] = {
				...entry,
				tags: entry.tags ? [
					Tag.DEV,
					Tag.TEST,
					...entry.tags
				] : [Tag.DEV]
			}, acc), {})
		});
		transformStoryIndexToStoriesHash = (input, { provider, docsOptions, filters, allStatuses, statusFilterKey }) => {
			if (!input.v) throw new Error("Composition: Missing stories.json version");
			let index = input;
			index = index.v === 2 ? transformStoryIndexV2toV3(index) : index, index = index.v === 3 ? transformStoryIndexV3toV4(index) : index, index = index.v === 4 ? transformStoryIndexV4toV5(index) : index, index = index;
			let indexEntries = Object.values(index.entries), filterFunctions = Object.values(filters), statusFilterFn = statusFilterKey ? filters[statusFilterKey] : void 0, entryValues = indexEntries.filter((entry) => {
				let statuses = allStatuses[entry.id] ?? {};
				return statusFilterFn && !statusFilterFn({
					...entry,
					statuses
				}) && !indexEntries.filter((item) => "parent" in item && item.parent === entry.id).some((child) => statusFilterFn({
					...child,
					statuses: allStatuses[child.id] ?? {}
				})) ? !1 : Object.values(statuses).some(({ value }) => value === "status-value:error") || filterFunctions.every((fn) => fn({
					...entry,
					statuses
				})) ? !0 : indexEntries.filter((item) => "parent" in item && item.parent === entry.id).some((child) => filterFunctions.every((fn) => fn({
					...child,
					statuses
				})));
			}), { sidebar = {} } = provider.getConfig(), { showRoots, collapsedRoots = [], renderLabel } = sidebar, setShowRoots = typeof showRoots < "u", storiesHashOutOfOrder = entryValues.reduce((acc, item) => {
				if (docsOptions.docsMode && item.type !== "docs") return acc;
				let { title } = item, groups = title.trim().split(TITLE_PATH_SEPARATOR), root = (!setShowRoots || showRoots) && groups.length > 1 ? [groups.shift()] : [], names = [...root, ...groups], paths = names.reduce((list, name, idx) => {
					let parent = idx > 0 && list[idx - 1], id = sanitize(parent ? `${parent}-${name}` : name);
					if (name.trim() === "") throw new Error(dedent`Invalid title ${title} ending in slash.`);
					if (parent === id) throw new Error(dedent`
          Invalid part '${name}', leading to id === parentId ('${id}'), inside title '${title}'

          Did you create a path that uses the separator char accidentally, such as 'Vue <docs/>' where '/' is a separator char? See https://github.com/storybookjs/storybook/issues/6128
          `);
					return list.push(id), list;
				}, []);
				return paths.forEach((id, idx) => {
					let childId = paths[idx + 1] || item.id;
					root.length && idx === 0 ? acc[id] = merge_default(acc[id] || {}, {
						type: "root",
						id,
						name: names[idx],
						tags: [],
						depth: idx,
						renderLabel,
						startCollapsed: collapsedRoots.includes(id),
						children: [childId]
					}) : (!acc[id] || acc[id].type === "component") && idx === paths.length - 1 ? acc[id] = merge_default(acc[id] || {}, {
						type: "component",
						id,
						name: names[idx],
						tags: [],
						parent: paths[idx - 1],
						depth: idx,
						renderLabel,
						...childId && { children: [childId] }
					}) : acc[id] = merge_default(acc[id] || {}, {
						type: "group",
						id,
						name: names[idx],
						tags: [],
						parent: paths[idx - 1],
						depth: idx,
						renderLabel,
						...childId && { children: [childId] }
					});
				}), acc[item.id] = {
					tags: [],
					...item,
					depth: paths.length,
					parent: "parent" in item ? item.parent : paths[paths.length - 1],
					renderLabel,
					prepared: !!item.parameters
				}, acc;
			}, {});
			function addItem(acc, item) {
				if (acc[item.id] || (acc[item.id] = item, "children" in item && item.children && (item.children.forEach((childId) => addItem(acc, storiesHashOutOfOrder[childId])), item.tags = item.children.reduce((currentTags, childId) => currentTags === null ? acc[childId].tags : intersect_default(currentTags, acc[childId].tags), null) || [])), item.type === "component") {
					let firstChild = acc[item.children[0]];
					firstChild && "importPath" in firstChild && (item.importPath = firstChild.importPath);
				}
				return acc;
			}
			let storiesHash = Object.values(storiesHashOutOfOrder).filter((i) => i.type !== "root" && !i.parent).reduce((acc, item) => addItem(acc, item), {});
			return storiesHash = Object.values(storiesHashOutOfOrder).filter((i) => i.type === "root").reduce(addItem, storiesHash), storiesHash = Object.values(storiesHash).reduce((acc, item) => {
				if (item.type === "story" && item.subtype === "test") {
					let story = acc[item.parent], component = acc[story.parent];
					acc[component.id] = {
						...component,
						children: component.children && component.children.filter((id) => id !== item.id)
					}, acc[story.id] = {
						...story,
						children: (story.children || []).concat(item.id)
					}, acc[item.id] = {
						...item,
						depth: item.depth + 1
					};
				} else acc[item.id] = item;
				return acc;
			}, {}), storiesHash;
		};
		addPreparedStories = (newHash, oldHash) => oldHash ? Object.fromEntries(Object.entries(newHash).map(([id, newEntry]) => {
			let oldEntry = oldHash[id];
			return newEntry.type === "story" && oldEntry?.type === "story" && oldEntry.prepared ? ("children" in oldEntry && delete oldEntry.children, [id, {
				...oldEntry,
				...newEntry,
				prepared: !0
			}]) : [id, newEntry];
		})) : newHash;
		getComponentLookupList = (0, import_memoizerific$1.default)(1)((hash) => Object.entries(hash).reduce((acc, i) => {
			let value = i[1];
			return value.type === "component" && acc.push([...value.children]), acc;
		}, []));
		getStoriesLookupList = (0, import_memoizerific$1.default)(1)((hash) => Object.keys(hash).filter((k) => ["story", "docs"].includes(hash[k].type)));
		({location: location$1, fetch} = global$2), getSourceType = (source, refId) => {
			let { origin: localOrigin, pathname: localPathname } = location$1, { origin: sourceOrigin, pathname: sourcePathname } = new URL(source), localFull = `${localOrigin + localPathname}`.replace(/\/[^\/]*$/, ""), sourceFull = `${sourceOrigin + sourcePathname}`.replace(/\/[^\/]*$/, "");
			return localFull === sourceFull ? ["local", sourceFull] : refId || source ? ["external", sourceFull] : [null, null];
		}, defaultStoryMapper = (b, a) => ({
			...a,
			kind: a.kind.replace("|", "/")
		}), addRefIds = (input, ref) => Object.entries(input).reduce((acc, [id, item]) => ({
			...acc,
			[id]: {
				...item,
				refId: ref.id
			}
		}), {}), applyRefStoryUpdates = (index, storyUpdates) => (storyUpdates && Object.entries(storyUpdates).forEach(([id, update2]) => {
			let entry = index[id];
			entry && (entry.type === "story" || entry.type === "docs") && (index[id] = {
				...entry,
				...update2
			});
		}), index);
		parseUrl = (url) => {
			let credentialsRegex = /https?:\/\/(.+:.+)@/, cleanUrl = url, authorization, [, credentials] = url.match(credentialsRegex) || [];
			return credentials && (cleanUrl = url.replace(`${credentials}@`, ""), authorization = btoa(`${credentials}`)), {
				url: cleanUrl,
				authorization
			};
		};
		getRedirectedRefUrl = (refUrl, indexResponseUrl) => {
			if (!indexResponseUrl) return refUrl;
			let served = new URL(indexResponseUrl);
			return served.origin === new URL(refUrl, location$1.href).origin || !served.pathname.endsWith("/index.json") ? refUrl : served.origin + served.pathname.slice(0, -11);
		};
		map = (input, ref, options) => {
			let { storyMapper } = options;
			return storyMapper ? Object.entries(input).reduce((acc, [id, item]) => ({
				...acc,
				[id]: storyMapper(ref, item)
			}), {}) : input;
		};
		init3 = ({ store: store2, provider, singleStory, docsOptions = {} }, { runCheck = !0 } = {}) => {
			let api = {
				findRef: (source) => {
					let refs2 = api.getRefs();
					return Object.values(refs2).find(({ url }) => url.match(source));
				},
				changeRefVersion: async (id, url) => {
					let { versions, title } = api.getRefs()[id], ref = {
						id,
						url,
						versions,
						title,
						index: {},
						filteredIndex: {},
						expanded: !0
					};
					await api.setRef(id, {
						...ref,
						type: "unknown"
					}, !1), await api.checkRef(ref);
				},
				changeRefState: (id, previewInitialized) => {
					let { [id]: ref, ...updated } = api.getRefs();
					updated[id] = {
						...ref,
						previewInitialized
					}, store2.setState({ refs: updated });
				},
				checkRef: async (ref) => {
					let { id, url, version: version2, type } = ref, isPublic = type === "server-checked", loadedData = {}, query = version2 ? `?version=${version2}` : "", credentials = isPublic ? "omit" : "include", urlParseResult = parseUrl(url), headers = { Accept: "application/json" };
					urlParseResult.authorization && Object.assign(headers, { Authorization: `Basic ${urlParseResult.authorization}` });
					let [indexRequest, storiesRequest] = ["index.json", "stories.json"].map((file) => fetch(`${urlParseResult.url}/${file}${query}`, {
						headers,
						credentials
					})), [indexResult, storiesResult] = await Promise.all([handleRequest(indexRequest), handleRequest(storiesRequest)]), refUrl = global$2.CONFIG_TYPE === "DEVELOPMENT" && indexResult.storyIndex ? getRedirectedRefUrl(urlParseResult.url, (await indexRequest).url) : urlParseResult.url;
					if (!indexResult.indexError || !storiesResult.indexError) {
						let metadata = await handleRequest(fetch(`${urlParseResult.url}/metadata.json${query}`, {
							headers,
							credentials,
							cache: "no-cache"
						}).catch(() => !1));
						Object.assign(loadedData, {
							...indexResult.indexError ? storiesResult : indexResult,
							...!metadata.indexError && metadata
						});
					} else isPublic || (loadedData.indexError = { message: dedent`
            Error: Loading of ref failed
              at fetch (lib/api/src/modules/refs.ts)

            URL: ${urlParseResult.url}

            We weren't able to load the above URL,
            it's possible a CORS error happened.

            Please check your dev-tools network tab.
          ` });
					let versions = ref.versions && Object.keys(ref.versions).length ? ref.versions : loadedData.versions;
					await api.setRef(id, {
						id,
						url: refUrl,
						...loadedData,
						...versions ? { versions } : {},
						type: loadedData.storyIndex ? "lazy" : "auto-inject"
					});
				},
				getRefs: () => {
					let { refs: refs2 = {} } = store2.getState();
					return refs2;
				},
				setRef: async (id, { storyIndex, setStoriesData, ...rest }, ready = !1) => {
					if (singleStory) return;
					let internal_index, index, filteredIndex, { filters } = store2.getState(), { storyMapper = defaultStoryMapper } = provider.getConfig(), ref = api.getRefs()[id];
					(storyIndex || setStoriesData) && (internal_index = setStoriesData ? transformSetStoriesStoryDataToPreparedStoryIndex(map(setStoriesData, ref, { storyMapper })) : storyIndex, filteredIndex = transformStoryIndexToStoriesHash(storyIndex, {
						provider,
						docsOptions,
						filters,
						allStatuses: {}
					}), index = transformStoryIndexToStoriesHash(storyIndex, {
						provider,
						docsOptions,
						filters: {},
						allStatuses: {}
					})), index && (index = addRefIds(index, ref), index = applyRefStoryUpdates(index, ref?.storyUpdates)), filteredIndex && (filteredIndex = addRefIds(filteredIndex, ref), filteredIndex = applyRefStoryUpdates(filteredIndex, ref?.storyUpdates)), await api.updateRef(id, {
						...ref,
						...rest,
						index,
						filteredIndex,
						internal_index
					});
				},
				updateRef: async (id, data) => {
					let { [id]: ref, ...updated } = api.getRefs();
					updated[id] = {
						...ref,
						...data
					};
					let ordered = Object.keys(initialState2).reduce((obj, key) => (obj[key] = updated[key], obj), {});
					await store2.setState({ refs: ordered });
				}
			}, refs = !singleStory && global$2.REFS || {}, initialState2 = refs;
			return runCheck && new Promise(async (resolve) => {
				for (let ref of Object.values(refs)) await api.checkRef({
					...ref,
					stories: {}
				});
				resolve(void 0);
			}), {
				api,
				state: { refs: initialState2 }
			};
		};
		getEventMetadata = (context, fullAPI) => {
			let { source, refId, type } = context, [sourceType, sourceLocation] = getSourceType(source, refId), ref;
			(refId || sourceType === "external") && (ref = refId && fullAPI.getRefs()[refId] ? fullAPI.getRefs()[refId] : fullAPI.findRef(sourceLocation));
			let meta = {
				source,
				sourceType,
				sourceLocation,
				refId,
				ref,
				type
			};
			switch (!0) {
				case typeof refId == "string":
				case sourceType === "local":
				case sourceType === "external": return meta;
				default: return logger4.warn(`Received a ${type} frame that was not configured as a ref`), null;
			}
		};
		init4 = ({ store: store2, fullAPI, provider }) => {
			let api = {
				getGlobals() {
					return store2.getState().globals;
				},
				getUserGlobals() {
					return store2.getState().userGlobals;
				},
				getStoryGlobals() {
					return store2.getState().storyGlobals;
				},
				getGlobalTypes() {
					return store2.getState().globalTypes;
				},
				updateGlobals(newGlobals) {
					provider.channel?.emit(UPDATE_GLOBALS, {
						globals: newGlobals,
						options: { target: "storybook-preview-iframe" }
					});
				}
			}, state = {
				globals: {},
				userGlobals: {},
				storyGlobals: {},
				globalTypes: {}
			}, updateGlobals = ({ globals, storyGlobals, userGlobals }) => {
				let { globals: currentGlobals, userGlobals: currentUserGlobals, storyGlobals: currentStoryGlobals } = store2.getState();
				dequal(globals, currentGlobals) || store2.setState({ globals }), dequal(userGlobals, currentUserGlobals) || store2.setState({ userGlobals }), dequal(storyGlobals, currentStoryGlobals) || store2.setState({ storyGlobals });
			};
			return provider.channel?.on(GLOBALS_UPDATED, function({ globals, storyGlobals, userGlobals }) {
				let { ref } = getEventMetadata(this, fullAPI);
				ref ? logger5.warn("received a GLOBALS_UPDATED from a non-local ref. This is not currently supported.") : updateGlobals({
					globals,
					storyGlobals,
					userGlobals
				});
			}), provider.channel?.on(SET_GLOBALS, function({ globals, globalTypes }) {
				let { ref } = getEventMetadata(this, fullAPI), currentUserGlobals = store2.getState()?.userGlobals;
				ref ? Object.keys(globals).length > 0 && logger5.warn("received globals from a non-local ref. This is not currently supported.") : store2.setState({
					globals,
					userGlobals: globals,
					globalTypes
				}), currentUserGlobals && Object.keys(currentUserGlobals).length !== 0 && !dequal(globals, currentUserGlobals) && api.updateGlobals(currentUserGlobals);
			}), {
				api,
				state
			};
		};
		layout_exports = {};
		__export(layout_exports, {
			ActiveTabs: () => ActiveTabs,
			DEFAULT_BOTTOM_PANEL_HEIGHT: () => DEFAULT_BOTTOM_PANEL_HEIGHT,
			DEFAULT_NAV_SIZE: () => DEFAULT_NAV_SIZE,
			DEFAULT_RIGHT_PANEL_WIDTH: () => DEFAULT_RIGHT_PANEL_WIDTH,
			focusableUIElements: () => focusableUIElements,
			getDefaultLayoutState: () => getDefaultLayoutState,
			init: () => init5,
			isDesktopViewport: () => isDesktopViewport,
			isPagesViewMode: () => isPagesViewMode
		});
		({SET_CONFIG: SET_CONFIG2} = __STORYBOOK_MODULE_CORE_EVENTS__);
		({global: global2$1} = __STORYBOOK_MODULE_GLOBAL__);
		({deprecate: deprecate$1} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		({document: document2$1} = global2$1), isFunction = (val) => typeof val == "function", ActiveTabs = {
			SIDEBAR: "sidebar",
			CANVAS: "canvas",
			ADDONS: "addons"
		}, isPagesViewMode = (viewMode) => viewMode !== void 0 && viewMode !== "story" && viewMode !== "docs" && viewMode !== "review", DEFAULT_NAV_SIZE = 300, DEFAULT_BOTTOM_PANEL_HEIGHT = 300, DEFAULT_RIGHT_PANEL_WIDTH = 400, getDefaultLayoutState = () => ({
			ui: { enableShortcuts: !0 },
			layout: {
				initialActive: ActiveTabs.CANVAS,
				navSize: DEFAULT_NAV_SIZE,
				bottomPanelHeight: DEFAULT_BOTTOM_PANEL_HEIGHT,
				rightPanelWidth: DEFAULT_RIGHT_PANEL_WIDTH,
				recentVisibleSizes: {
					navSize: DEFAULT_NAV_SIZE,
					bottomPanelHeight: DEFAULT_BOTTOM_PANEL_HEIGHT,
					rightPanelWidth: DEFAULT_RIGHT_PANEL_WIDTH
				},
				panelPosition: "bottom",
				showNav: !0,
				showPanel: !0,
				showTabs: !0,
				showToolbar: !0,
				showMobileNavigation: !1
			},
			layoutCustomisations: {
				showPanel: void 0,
				showSidebar: void 0,
				showToolbar: void 0
			},
			selectedPanel: void 0,
			theme: create()
		}), focusableUIElements = {
			addonPanel: "storybook-panel-region",
			storySearchField: "storybook-explorer-searchfield",
			storyListMenu: "storybook-explorer-menu",
			storyPanelRoot: "storybook-panel-root",
			showAddonPanel: "storybook-show-addon-panel",
			sidebarRegion: "storybook-sidebar-region",
			showSidebar: "storybook-show-sidebar"
		}, getIsNavShown = (state) => state.layout.navSize > 0, getIsPanelShown = (state) => {
			let { bottomPanelHeight, rightPanelWidth, panelPosition } = state.layout;
			return panelPosition === "bottom" && bottomPanelHeight > 0 || panelPosition === "right" && rightPanelWidth > 0;
		}, getIsFullscreen = (state) => !getIsNavShown(state) && !getIsPanelShown(state), getRecentVisibleSizes = (layoutState) => ({
			navSize: layoutState.navSize > 0 ? layoutState.navSize : layoutState.recentVisibleSizes.navSize,
			bottomPanelHeight: layoutState.bottomPanelHeight > 0 ? layoutState.bottomPanelHeight : layoutState.recentVisibleSizes.bottomPanelHeight,
			rightPanelWidth: layoutState.rightPanelWidth > 0 ? layoutState.rightPanelWidth : layoutState.recentVisibleSizes.rightPanelWidth
		}), applyLayoutOptions = (layoutState, options, singleStory) => {
			let layoutKeys = Object.keys(layoutState), layoutAtTopLevel = pick$1(options, layoutKeys);
			for (let key of Object.keys(layoutAtTopLevel)) deprecate$1(`Calling \`setConfig({ ${key}: ... })\` is deprecated. Please call \`setConfig({ layout: { ${key}: ... } })\` instead.`);
			let mergedLayoutOptions = toMerged(layoutAtTopLevel, options.layout || {}), { showPanel, showNav } = mergedLayoutOptions, nextLayoutState = toMerged(layoutState, pick$1(mergedLayoutOptions, layoutKeys));
			return showNav === !1 || singleStory ? (nextLayoutState.recentVisibleSizes = getRecentVisibleSizes(nextLayoutState), nextLayoutState.navSize = 0) : showNav === !0 && (nextLayoutState.navSize = nextLayoutState.recentVisibleSizes.navSize), showPanel === !1 ? (nextLayoutState.recentVisibleSizes = getRecentVisibleSizes(nextLayoutState), nextLayoutState.bottomPanelHeight = 0, nextLayoutState.rightPanelWidth = 0) : showPanel === !0 && (nextLayoutState.bottomPanelHeight = nextLayoutState.recentVisibleSizes.bottomPanelHeight, nextLayoutState.rightPanelWidth = nextLayoutState.recentVisibleSizes.rightPanelWidth), nextLayoutState;
		}, applyUiOptions = (uiState, options) => {
			let uiKeys = Object.keys(uiState), uiAtTopLevel = pick$1(options, uiKeys);
			for (let key of Object.keys(uiAtTopLevel)) deprecate$1(`Calling \`setConfig({ ${key}: ... })\` is deprecated. Please call \`setConfig({ ui: { ${key}: ... } })\` instead.`);
			let typedUiKeys = uiKeys;
			return toMerged(uiState, pick$1(toMerged(uiAtTopLevel, options.ui || {}), typedUiKeys));
		}, isDesktopViewport = () => global2$1.matchMedia?.("(min-width: 600px)")?.matches ?? !0, init5 = ({ store: store2, provider, singleStory }) => {
			let api = {
				toggleFullscreen(nextState) {
					return store2.setState((state) => {
						let isFullscreen = getIsFullscreen(state), shouldFullscreen = typeof nextState == "boolean" ? nextState : !isFullscreen;
						return shouldFullscreen === isFullscreen ? { layout: state.layout } : shouldFullscreen ? { layout: {
							...state.layout,
							navSize: 0,
							bottomPanelHeight: 0,
							rightPanelWidth: 0,
							recentVisibleSizes: getRecentVisibleSizes(state.layout)
						} } : { layout: {
							...state.layout,
							navSize: state.singleStory ? 0 : state.layout.recentVisibleSizes.navSize,
							bottomPanelHeight: state.layout.recentVisibleSizes.bottomPanelHeight,
							rightPanelWidth: state.layout.recentVisibleSizes.rightPanelWidth
						} };
					}, { persistence: "session" });
				},
				togglePanel(nextState) {
					return store2.setState((state) => {
						let isPanelShown = getIsPanelShown(state), shouldShowPanel = typeof nextState == "boolean" ? nextState : !isPanelShown;
						return shouldShowPanel === isPanelShown ? { layout: state.layout } : shouldShowPanel ? { layout: {
							...state.layout,
							bottomPanelHeight: state.layout.recentVisibleSizes.bottomPanelHeight,
							rightPanelWidth: state.layout.recentVisibleSizes.rightPanelWidth
						} } : { layout: {
							...state.layout,
							bottomPanelHeight: 0,
							rightPanelWidth: 0,
							recentVisibleSizes: getRecentVisibleSizes(state.layout)
						} };
					}, { persistence: "session" });
				},
				togglePanelPosition(position) {
					return store2.setState((state) => {
						let nextPosition = position || (state.layout.panelPosition === "right" ? "bottom" : "right");
						return { layout: {
							...state.layout,
							panelPosition: nextPosition,
							bottomPanelHeight: state.layout.recentVisibleSizes.bottomPanelHeight,
							rightPanelWidth: state.layout.recentVisibleSizes.rightPanelWidth
						} };
					}, { persistence: "permanent" });
				},
				toggleNav(nextState) {
					return isDesktopViewport() ? store2.setState((state) => {
						if (state.singleStory) return { layout: state.layout };
						let isNavShown = getIsNavShown(state), shouldShowNav = typeof nextState == "boolean" ? nextState : !isNavShown;
						return shouldShowNav === isNavShown ? { layout: state.layout } : shouldShowNav ? { layout: {
							...state.layout,
							navSize: state.layout.recentVisibleSizes.navSize
						} } : { layout: {
							...state.layout,
							navSize: 0,
							recentVisibleSizes: getRecentVisibleSizes(state.layout)
						} };
					}, { persistence: "session" }) : store2.setState((state) => ({ layout: {
						...state.layout,
						showMobileNavigation: typeof nextState == "boolean" ? nextState : !state.layout.showMobileNavigation
					} }));
				},
				setMobileNavigation(show) {
					return store2.setState((state) => ({ layout: {
						...state.layout,
						showMobileNavigation: show
					} }));
				},
				toggleToolbar(toggled) {
					return store2.setState((state) => {
						let value = typeof toggled < "u" ? toggled : !state.layout.showToolbar;
						return { layout: {
							...state.layout,
							showToolbar: value
						} };
					}, { persistence: "session" });
				},
				setSizes({ navSize, bottomPanelHeight, rightPanelWidth }) {
					return store2.setState((state) => {
						let nextLayoutState = {
							...state.layout,
							navSize: navSize ?? state.layout.navSize,
							bottomPanelHeight: bottomPanelHeight ?? state.layout.bottomPanelHeight,
							rightPanelWidth: rightPanelWidth ?? state.layout.rightPanelWidth
						};
						return { layout: {
							...nextLayoutState,
							recentVisibleSizes: getRecentVisibleSizes(nextLayoutState)
						} };
					}, { persistence: "session" });
				},
				/**
				* Attempts to focus (and select) an element identified by its ID. It is the responsibility of
				* the callee to ensure that the element is present in the DOM and that no focus trap is
				* available. When polling is enabled, this API polls and attempts to perform the focus for a
				* set duration (max 500ms), so that race conditions can be avoided with the current API
				* design.
				*
				* @param elementId The id of the element to focus.
				* @param options When a boolean, treated as the `select` option for backwards compatibility.
				*   When an object, may contain `select` and `poll` options.
				* @returns Whether the element was successfully focused. Returns a Promise when polling.
				*/
				focusOnUIElement(elementId, options) {
					let { forceFocus = !1, select = !1, poll = !0 } = typeof options == "boolean" ? { select: options } : options ?? {};
					if (!elementId) return !1;
					let attemptFocus = () => {
						let element = document2$1.getElementById(elementId);
						return !element || (element.focus(), element !== document2$1.activeElement && forceFocus && element.getAttribute("tabindex") === null && (element.setAttribute("tabindex", "-1"), element.focus()), element !== document2$1.activeElement && element.id !== document2$1.activeElement?.id) ? !1 : (select && element.select?.(), !0);
					};
					return attemptFocus() ? !0 : poll ? new Promise((resolve) => {
						let startTime = Date.now(), maxDuration = 500, intervalId = setInterval(() => {
							let elapsed = Date.now() - startTime;
							if (attemptFocus()) {
								clearInterval(intervalId), resolve(!0);
								return;
							}
							elapsed >= maxDuration && (clearInterval(intervalId), resolve(!1));
						}, 50);
					}) : !1;
				},
				getInitialOptions() {
					let userConfig = provider.getConfig(), defaultLayoutState = getDefaultLayoutState(), { theme, selectedPanel, layoutCustomisations } = userConfig;
					return {
						...defaultLayoutState,
						layout: applyLayoutOptions(defaultLayoutState.layout, userConfig, !!singleStory),
						layoutCustomisations: {
							...defaultLayoutState.layoutCustomisations,
							...layoutCustomisations ?? {}
						},
						ui: applyUiOptions(defaultLayoutState.ui, userConfig),
						selectedPanel: selectedPanel || defaultLayoutState.selectedPanel,
						theme: theme || defaultLayoutState.theme
					};
				},
				getIsFullscreen() {
					return getIsFullscreen(store2.getState());
				},
				getIsPanelShown() {
					return getIsPanelShown(store2.getState());
				},
				getIsNavShown() {
					return getIsNavShown(store2.getState());
				},
				getNavAvailability() {
					let state = store2.getState();
					return isReviewManagerRoute(state.path, state.customQueryParams) ? "unavailable" : getIsNavShown(state) ? "shown" : "hidden";
				},
				getShowToolbarWithCustomisations(showToolbar) {
					let state = store2.getState();
					return isFunction(state.layoutCustomisations.showToolbar) ? state.layoutCustomisations.showToolbar(state, showToolbar) ?? showToolbar : showToolbar;
				},
				getShowPanelWithCustomisations(showPanel) {
					let state = store2.getState();
					return isFunction(state.layoutCustomisations.showPanel) ? state.layoutCustomisations.showPanel(state, showPanel) ?? showPanel : showPanel;
				},
				getNavSizeWithCustomisations(navSize) {
					let state = store2.getState();
					if (isFunction(state.layoutCustomisations.showSidebar)) {
						let shouldShowNav = state.layoutCustomisations.showSidebar(state, navSize !== 0);
						if (navSize === 0 && shouldShowNav === !0) return state.layout.recentVisibleSizes.navSize;
						if (navSize !== 0 && shouldShowNav === !1) return 0;
					}
					return navSize;
				},
				setOptions: (options) => {
					let { layout, ui, selectedPanel, theme } = store2.getState();
					if (!options) return;
					let updatedLayout = applyLayoutOptions(layout, options, !!singleStory), updatedUi = applyUiOptions(ui, options), updatedTheme = {
						...theme,
						...options.theme
					}, modification = {};
					isEqual(ui, updatedUi) || (modification.ui = updatedUi), isEqual(layout, updatedLayout) || (modification.layout = updatedLayout), options.selectedPanel && !isEqual(selectedPanel, options.selectedPanel) && (modification.selectedPanel = options.selectedPanel), Object.keys(modification).length && store2.setState(modification, { persistence: "permanent" }), isEqual(theme, updatedTheme) || store2.setState({ theme: updatedTheme });
				}
			}, persisted = pick$1(store2.getState(), ["layout", "selectedPanel"]);
			return persisted.layout && (persisted.layout = {
				...persisted.layout,
				showMobileNavigation: !1
			}), provider.channel?.on(SET_CONFIG2, () => {
				api.setOptions(merge_default(api.getInitialOptions(), persisted));
			}), {
				api,
				state: merge_default(api.getInitialOptions(), persisted)
			};
		};
		notifications_exports = {};
		__export(notifications_exports, { init: () => init6 });
		init6 = ({ store: store2 }) => ({
			api: {
				addNotification: (newNotification) => {
					store2.setState(({ notifications }) => {
						let [existing, others] = partition(notifications, (n) => n.id === newNotification.id);
						return existing.forEach((notification) => {
							notification.onClear && notification.onClear({
								dismissed: !1,
								timeout: !1
							});
						}), { notifications: [...others, newNotification] };
					});
				},
				clearNotification: (notificationId) => {
					store2.setState(({ notifications }) => {
						let [matching, others] = partition(notifications, (n) => n.id === notificationId);
						return matching.forEach((notification) => {
							notification.onClear && notification.onClear({
								dismissed: !1,
								timeout: !1
							});
						}), { notifications: others };
					});
				}
			},
			state: { notifications: [] }
		});
		open_in_editor_exports = {};
		__export(open_in_editor_exports, { init: () => init7 });
		({OPEN_IN_EDITOR_REQUEST, OPEN_IN_EDITOR_RESPONSE} = __STORYBOOK_MODULE_CORE_EVENTS__);
		init7 = ({ provider, fullAPI }) => ({
			api: { openInEditor(payload) {
				return new Promise((resolve) => {
					let { file, line, column } = payload, handler = (res) => {
						res.file === file && res.line === line && res.column === column && (provider.channel?.off(OPEN_IN_EDITOR_RESPONSE, handler), resolve(res));
					};
					provider.channel?.on(OPEN_IN_EDITOR_RESPONSE, handler), provider.channel?.emit(OPEN_IN_EDITOR_REQUEST, payload);
				});
			} },
			state: { notifications: [] },
			init: async () => {
				let { color } = await __vitePreload(async () => {
					const { color } = await import("./theming-B7mEHq8B.js").then((n) => (n.a(), n.d));
					return { color };
				}, __vite__mapDeps([0,1,2,3,4]), import.meta.url);
				provider.channel?.on(OPEN_IN_EDITOR_RESPONSE, (payload) => {
					payload.error !== null && fullAPI.addNotification({
						id: "open-in-editor-error",
						content: {
							headline: "Failed to open in editor",
							subHeadline: payload.error || "Check the Storybook process on the command line for more details."
						},
						icon: import_react$178.createElement(FailedIcon, { color: color.negative }),
						duration: 8e3
					});
				});
			}
		});
		provider_exports = {};
		__export(provider_exports, { init: () => init8 });
		init8 = ({ provider }) => ({
			api: provider.renderPreview ? { renderPreview: provider.renderPreview } : {},
			state: {}
		});
		settings_exports = {};
		__export(settings_exports, { init: () => init9 });
		init9 = ({ store: store2, navigate, fullAPI }) => ({
			state: { settings: { lastTrackedStoryId: null } },
			api: {
				closeSettings: () => {
					let { settings: { lastTrackedStoryId } } = store2.getState();
					lastTrackedStoryId ? fullAPI.selectStory(lastTrackedStoryId) : fullAPI.selectFirstStory();
				},
				changeSettingsTab: (path) => {
					navigate(`/settings/${path}`);
				},
				isSettingsScreenActive: () => {
					let { path } = fullAPI.getUrlState();
					return !!(path || "").match(/^\/settings/);
				},
				retrieveSelection() {
					let { settings } = store2.getState();
					return settings.lastTrackedStoryId;
				},
				storeSelection: async () => {
					let { storyId, settings } = store2.getState();
					await store2.setState({ settings: {
						...settings,
						lastTrackedStoryId: storyId
					} });
				}
			}
		});
		shortcuts_exports = {};
		__export(shortcuts_exports, {
			controlOrMetaKey: () => controlOrMetaKey2,
			defaultShortcuts: () => defaultShortcuts,
			init: () => init10,
			isMacLike: () => isMacLike2,
			keys: () => keys
		});
		import_copy_to_clipboard = __toESM$2(require_copy_to_clipboard(), 1);
		({FORCE_REMOUNT, PREVIEW_KEYDOWN, STORIES_COLLAPSE_ALL, STORIES_EXPAND_ALL} = __STORYBOOK_MODULE_CORE_EVENTS__);
		({global: global4} = __STORYBOOK_MODULE_GLOBAL__);
		({global: global3} = __STORYBOOK_MODULE_GLOBAL__);
		({navigator: navigator2} = global3), isMacLike = () => navigator2 && navigator2.platform ? !!navigator2.platform.match(/(Mac|iPhone|iPod|iPad)/i) : !1;
		optionOrAltSymbol = () => isMacLike() ? "⌥" : "alt";
		eventToShortcut = (e) => {
			if ([
				"Meta",
				"Alt",
				"Control",
				"Shift",
				"Tab"
			].includes(e.key)) return null;
			let keys2 = [];
			e.altKey && keys2.push("alt"), e.ctrlKey && keys2.push("control"), e.metaKey && keys2.push("meta"), e.shiftKey && keys2.push("shift");
			let codeUpper = e.code?.toUpperCase(), codeChar = codeUpper ? codeUpper.startsWith("KEY") && codeUpper.length === 4 ? codeUpper.replace("KEY", "") : codeUpper.startsWith("DIGIT") ? codeUpper.replace("DIGIT", "") : {
				MINUS: "-",
				EQUAL: "=",
				BRACKETLEFT: "[",
				BRACKETRIGHT: "]",
				BACKSLASH: "\\",
				SEMICOLON: ";",
				QUOTE: "'",
				BACKQUOTE: "`",
				COMMA: ",",
				PERIOD: ".",
				SLASH: "/"
			}[codeUpper] : void 0;
			if (e.key && e.key.length === 1 && e.key !== " ") {
				let key = e.key.toUpperCase(), code = codeChar;
				code && code.length === 1 && code !== key ? keys2.push([key, code]) : keys2.push(key);
			} else e.key === "Dead" && codeChar && keys2.push(codeChar);
			return e.key === " " && keys2.push("space"), e.key === "Escape" && keys2.push("escape"), e.key === "ArrowRight" && keys2.push("ArrowRight"), e.key === "ArrowDown" && keys2.push("ArrowDown"), e.key === "ArrowUp" && keys2.push("ArrowUp"), e.key === "ArrowLeft" && keys2.push("ArrowLeft"), keys2.length > 0 ? keys2 : null;
		};
		shortcutMatchesShortcut = (inputShortcut, shortcut) => !inputShortcut || !shortcut || (inputShortcut.join("").startsWith("shift/") && inputShortcut.shift(), inputShortcut.length !== shortcut.length) ? !1 : !inputShortcut.find((input, i) => Array.isArray(input) ? !input.includes(shortcut[i]) : input !== shortcut[i]);
		keyToSymbol = (key) => key === "alt" ? optionOrAltSymbol() : key === "control" ? "⌃" : key === "meta" ? "⌘" : key === "shift" ? "⇧​" : key === "Enter" || key === "Backspace" || key === "Esc" || key === "escape" ? "" : key === " " ? "SPACE" : key === "ArrowUp" ? "↑" : key === "ArrowDown" ? "↓" : key === "ArrowLeft" ? "←" : key === "ArrowRight" ? "→" : key?.toUpperCase();
		shortcutToHumanString = (shortcut) => shortcut.map(keyToSymbol).join(" ");
		shortcutToAriaKeyshortcuts = (shortcut) => shortcut.map((shortcut2) => shortcut2 === "+" ? "plus" : shortcut2 === " " ? "space" : shortcut2).join("+");
		({navigator: navigator3, document: document3$1} = global4);
		isMacLike2 = () => navigator3 && navigator3.platform ? !!navigator3.platform.match(/(Mac|iPhone|iPod|iPad)/i) : !1;
		controlOrMetaKey2 = () => isMacLike2() ? "meta" : "control";
		defaultShortcuts = Object.freeze({
			fullScreen: ["alt", "F"],
			togglePanel: ["alt", "A"],
			panelPosition: ["alt", "D"],
			toggleNav: ["alt", "S"],
			toolbar: ["alt", "T"],
			search: [controlOrMetaKey2(), "K"],
			focusNav: ["1"],
			focusIframe: ["2"],
			focusPanel: ["3"],
			prevComponent: ["alt", "ArrowUp"],
			nextComponent: ["alt", "ArrowDown"],
			prevStory: ["alt", "ArrowLeft"],
			nextStory: ["alt", "ArrowRight"],
			shortcutsPage: [
				controlOrMetaKey2(),
				"shift",
				","
			],
			aboutPage: [controlOrMetaKey2(), ","],
			escape: ["escape"],
			collapseAll: [
				controlOrMetaKey2(),
				"shift",
				"ArrowUp"
			],
			expandAll: [
				controlOrMetaKey2(),
				"shift",
				"ArrowDown"
			],
			remount: ["alt", "R"],
			openInEditor: [
				"alt",
				"shift",
				"E"
			],
			openInIsolation: [
				"alt",
				"shift",
				"I"
			],
			copyStoryLink: [
				"alt",
				"shift",
				"L"
			],
			goToPreviousLandmark: ["shift", "F6"],
			goToNextLandmark: ["F6"]
		});
		addonsShortcuts = {};
		init10 = ({ store: store2, fullAPI, provider }) => {
			let api = {
				getShortcutKeys() {
					return store2.getState().shortcuts;
				},
				getDefaultShortcuts() {
					return {
						...defaultShortcuts,
						...api.getAddonsShortcutDefaults()
					};
				},
				getAddonsShortcuts() {
					return addonsShortcuts;
				},
				getAddonsShortcutLabels() {
					let labels = {};
					return Object.entries(api.getAddonsShortcuts()).forEach(([actionName, { label }]) => {
						labels[actionName] = label;
					}), labels;
				},
				getAddonsShortcutDefaults() {
					let defaults = {};
					return Object.entries(api.getAddonsShortcuts()).forEach(([actionName, { defaultShortcut }]) => {
						defaults[actionName] = defaultShortcut;
					}), defaults;
				},
				async setShortcuts(update2) {
					let { shortcuts } = await store2.setState((state2) => ({ shortcuts: typeof update2 == "function" ? update2(state2.shortcuts) : update2 }), { persistence: "permanent" });
					return shortcuts;
				},
				async restoreAllDefaultShortcuts() {
					return api.setShortcuts(api.getDefaultShortcuts());
				},
				async setShortcut(action, value) {
					return await api.setShortcuts((shortcuts) => ({
						...shortcuts,
						[action]: value
					})), value;
				},
				async setAddonShortcut(addon, shortcut) {
					return await api.setShortcuts((shortcuts) => ({
						...shortcuts,
						[`${addon}-${shortcut.actionName}`]: shortcut.defaultShortcut
					})), addonsShortcuts[`${addon}-${shortcut.actionName}`] = shortcut, shortcut;
				},
				async restoreDefaultShortcut(action) {
					let defaultShortcut = api.getDefaultShortcuts()[action];
					return api.setShortcut(action, defaultShortcut);
				},
				handleKeydownEvent(event) {
					let shortcut = eventToShortcut(event), shortcuts = api.getShortcutKeys(), matchedFeature = keys(shortcuts).find((feature) => shortcutMatchesShortcut(shortcut, shortcuts[feature]));
					matchedFeature && api.handleShortcutFeature(matchedFeature, event);
				},
				handleShortcutFeature(feature, event) {
					let { ui: { enableShortcuts }, storyId, refId, viewMode } = store2.getState();
					if (!enableShortcuts) return;
					let isSidebarShortcutBlocked = fullAPI.getNavAvailability() === "unavailable", isSidebarShortcutFeature = [
						"focusNav",
						"search",
						"toggleNav"
					].includes(feature);
					if (!(isSidebarShortcutBlocked && isSidebarShortcutFeature)) switch (event?.preventDefault && event.preventDefault(), feature) {
						case "escape":
							fullAPI.getIsFullscreen() ? fullAPI.toggleFullscreen(!1) : isDesktopViewport() && fullAPI.getIsNavShown() && fullAPI.toggleNav(!0);
							break;
						case "goToNextLandmark":
						case "goToPreviousLandmark": break;
						case "focusNav":
							fullAPI.getIsFullscreen() && fullAPI.toggleFullscreen(!1), fullAPI.getIsNavShown() || fullAPI.toggleNav(!0), fullAPI.focusOnUIElement(focusableUIElements.storyListMenu);
							break;
						case "search":
							fullAPI.getIsFullscreen() && fullAPI.toggleFullscreen(!1), fullAPI.getIsNavShown() || fullAPI.toggleNav(!0), setTimeout(() => {
								fullAPI.focusOnUIElement(focusableUIElements.storySearchField, !0);
							}, 0);
							break;
						case "focusIframe": {
							let element = document3$1.getElementById("storybook-preview-iframe");
							if (element) try {
								element.contentWindow.focus();
							} catch {}
							break;
						}
						case "focusPanel":
							fullAPI.getIsFullscreen() && fullAPI.toggleFullscreen(!1), fullAPI.getIsPanelShown() || fullAPI.togglePanel(!0), fullAPI.focusOnUIElement(focusableUIElements.storyPanelRoot);
							break;
						case "nextStory":
							fullAPI.jumpToStory(1);
							break;
						case "prevStory":
							fullAPI.jumpToStory(-1);
							break;
						case "nextComponent":
							fullAPI.jumpToComponent(1);
							break;
						case "prevComponent":
							fullAPI.jumpToComponent(-1);
							break;
						case "fullScreen":
							fullAPI.toggleFullscreen();
							break;
						case "togglePanel": {
							let wasPanelShown = fullAPI.getIsPanelShown(), panelElement = document3$1.getElementById(focusableUIElements.addonPanel);
							fullAPI.togglePanel(), wasPanelShown && wasFocusInElement(panelElement) && fullAPI.focusOnUIElement(focusableUIElements.showAddonPanel, { poll: !0 }).then((success) => {
								success === !1 && document3$1.body.focus();
							}), wasPanelShown || fullAPI.focusOnUIElement(focusableUIElements.addonPanel, {
								forceFocus: !0,
								poll: !0
							});
							break;
						}
						case "toggleNav": {
							let isDesktop = isDesktopViewport(), wasNavShown = fullAPI.getIsNavShown(), sidebarElement = document3$1.getElementById(focusableUIElements.sidebarRegion);
							fullAPI.toggleNav(), isDesktop && (wasNavShown && wasFocusInElement(sidebarElement) && fullAPI.focusOnUIElement(focusableUIElements.showSidebar, { poll: !0 }).then((success) => {
								success === !1 && document3$1.body.focus();
							}), wasNavShown || fullAPI.focusOnUIElement(focusableUIElements.sidebarRegion, {
								forceFocus: !0,
								poll: !0
							}));
							break;
						}
						case "toolbar":
							fullAPI.toggleToolbar();
							break;
						case "panelPosition":
							fullAPI.getIsFullscreen() && fullAPI.toggleFullscreen(!1), fullAPI.getIsPanelShown() || fullAPI.togglePanel(!0), fullAPI.togglePanelPosition();
							break;
						case "aboutPage":
							fullAPI.navigate("/settings/about");
							break;
						case "shortcutsPage":
							fullAPI.navigate("/settings/shortcuts");
							break;
						case "collapseAll":
							fullAPI.emit(STORIES_COLLAPSE_ALL);
							break;
						case "expandAll":
							fullAPI.emit(STORIES_EXPAND_ALL);
							break;
						case "remount":
							fullAPI.emit(FORCE_REMOUNT, { storyId });
							break;
						case "openInEditor":
							global4.CONFIG_TYPE === "DEVELOPMENT" && fullAPI.openInEditor({ file: fullAPI.getCurrentStoryData().importPath });
							break;
						case "openInIsolation":
							if (storyId && viewMode === "story") {
								let { previewHref } = fullAPI.getStoryHrefs(storyId, { refId });
								window.open(previewHref, "_blank", "noopener,noreferrer");
							}
							break;
						case "copyStoryLink":
							if (storyId) {
								let { managerHref } = fullAPI.getStoryHrefs(storyId, { refId });
								(0, import_copy_to_clipboard.default)(managerHref);
							}
							break;
						default: addonsShortcuts[feature].action();
					}
				}
			}, { shortcuts: persistedShortcuts = defaultShortcuts } = store2.getState();
			return {
				api,
				state: { shortcuts: keys(defaultShortcuts).reduce((acc, key) => ({
					...acc,
					[key]: persistedShortcuts[key] || defaultShortcuts[key]
				}), defaultShortcuts) },
				init: () => {
					document3$1.addEventListener("keydown", (event) => {
						shouldSkipShortcut(event) || api.handleKeydownEvent(event);
					}), provider.channel?.on(PREVIEW_KEYDOWN, (data) => {
						api.handleKeydownEvent(data.event);
					});
				}
			};
		};
		stories_exports = {};
		__export(stories_exports, { init: () => init11 });
		({logger: logger6} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		({CONFIG_ERROR, CURRENT_STORY_WAS_SET, DOCS_PREPARED, PRELOAD_ENTRIES, RESET_STORY_ARGS, SELECT_STORY, SET_CONFIG: SET_CONFIG3, SET_CURRENT_STORY, SET_FILTER, SET_INDEX, SET_STORIES, SIDEBAR_FILTER_CHANGED, STORY_ARGS_UPDATED, STORY_CHANGED, STORY_INDEX_INVALIDATED, STORY_MISSING, STORY_PREPARED, STORY_SPECIFIED, UPDATE_STORY_ARGS} = __STORYBOOK_MODULE_CORE_EVENTS__);
		({global: global5} = __STORYBOOK_MODULE_GLOBAL__);
		buildNavigationUrl = (path, queryParams = {}) => {
			return [path, ...Object.entries(queryParams).filter(([k, v]) => k !== "path" && v !== null && v !== void 0).sort(([a], [b]) => a < b ? -1 : 1).map(([k, v]) => `${k}=${v}`)].join("&");
		};
		useUniversalStore = (universalStore, selector) => {
			let snapshotRef = import_react$179.useRef(selector ? selector(universalStore.getState()) : universalStore.getState()), subscribe = import_react$179.useCallback((listener) => universalStore.onStateChange((state2, previousState) => {
				if (!selector) {
					snapshotRef.current = state2, listener();
					return;
				}
				let selectedState = selector(state2), selectedPreviousState = selector(previousState);
				!isEqual(selectedState, selectedPreviousState) && (snapshotRef.current = selectedState, listener());
			}), [universalStore, selector]), getSnapshot = import_react$179.useCallback(() => {
				let currentState = universalStore.getState(), selectedState = selector ? selector(currentState) : currentState;
				return isEqual(selectedState, snapshotRef.current) || (snapshotRef.current = selectedState), snapshotRef.current;
			}, [universalStore, selector]);
			return [import_react$179.useSyncExternalStore(subscribe, getSnapshot), universalStore.setState];
		};
		({fullStatusStore, getStatusStoreByTypeId, useStatusStore, universalStatusStore} = createStatusStore({
			universalStatusStore: UniversalStore.create({
				...UNIVERSAL_STATUS_STORE_OPTIONS,
				leader: globalThis.CONFIG_TYPE === "PRODUCTION"
			}),
			useUniversalStore,
			environment: "manager"
		}));
		parseFilterParam = (param, transform) => {
			if (!param) return {
				included: [],
				excluded: []
			};
			let included = [], excluded = [];
			return param.split(";").forEach((raw) => {
				if (!raw) return;
				let isExcluded = raw.startsWith("!"), value = transform(isExcluded ? raw.slice(1) : raw);
				value != null && (isExcluded ? excluded.push(value) : included.push(value));
			}), {
				included,
				excluded
			};
		};
		parseStatusesParam = (statusesParam) => parseFilterParam(statusesParam, toStatusValue);
		serializeStatusesParam = (included, excluded) => {
			if (!included.length && !excluded.length) return;
			let serializedIncluded = included.map((v) => statusValueShortName(v)).sort(), serializedExcluded = excluded.map((v) => `!${statusValueShortName(v)}`).sort();
			return [...serializedIncluded, ...serializedExcluded].join(";");
		};
		computeStatusFilterFn = (includedStatusFilters, excludedStatusFilters) => (entry) => {
			if (!includedStatusFilters.length && !excludedStatusFilters.length) return !0;
			let storyStatuses = (fullStatusStore.getAll() ?? {})[entry.id], storyStatusValues = storyStatuses ? Object.values(storyStatuses).map((s) => s.value) : [], passesInclude = !includedStatusFilters.length || includedStatusFilters.some((v) => storyStatusValues.includes(v)), passesExclude = !excludedStatusFilters.length || excludedStatusFilters.every((v) => !storyStatusValues.includes(v));
			return passesInclude && passesExclude;
		};
		import_memoizerific2$1 = __toESM$2(require_memoizerific(), 1);
		BUILT_IN_URL_TAG_MAP = {
			$docs: "_docs",
			$play: "_play",
			$test: "_test"
		};
		parseTagsParam = (tagsParam) => parseFilterParam(tagsParam, (raw) => BUILT_IN_URL_TAG_MAP[raw] ?? raw);
		serializeTagsParam = (included, excluded) => {
			if (!included.length && !excluded.length) return "";
			let reverseBuiltInUrlTagMap = Object.fromEntries(Object.entries(BUILT_IN_URL_TAG_MAP).map(([urlTag, internalTag]) => [internalTag, urlTag])), serializedIncluded = included.map((tag) => reverseBuiltInUrlTagMap[tag] ?? tag).sort(), serializedExcluded = excluded.map((tag) => `!${reverseBuiltInUrlTagMap[tag] ?? tag}`).sort();
			return [...serializedIncluded, ...serializedExcluded].join(";");
		};
		getDefaultTagsFromPreset = (0, import_memoizerific2$1.default)(1)((presets) => {
			let presetEntries = Object.entries(presets);
			return {
				included: presetEntries.filter(([, option]) => option.defaultFilterSelection === "include").map(([tag]) => tag),
				excluded: presetEntries.filter(([, option]) => option.defaultFilterSelection === "exclude").map(([tag]) => tag)
			};
		});
		computeStaticFilterFn = (tagPresets) => {
			let staticExcludeTags = Object.entries(tagPresets).reduce((acc, entry) => {
				let [tag, option] = entry;
				return option.excludeFromSidebar && (acc[tag] = !0), acc;
			}, {});
			return (item) => {
				let tags = item.tags ?? [], isCsfAutodocsEntry = item.type === "docs" && !tags.includes(Tag.ATTACHED_MDX) && !tags.includes(Tag.UNATTACHED_MDX);
				return (tags.includes(Tag.DEV) || isCsfAutodocsEntry) && tags.filter((tag) => staticExcludeTags[tag]).length === 0;
			};
		};
		computeTagsFilterFn = (includedTagFilters, excludedTagFilters) => {
			let computeFilterFunctions = (set2) => Object.values(set2.reduce((acc, tag) => (Object.hasOwn(BUILT_IN_FILTERS, tag) ? acc["built-in"].push(BUILT_IN_FILTERS[tag]) : acc.user.push(USER_TAG_FILTER(tag)), acc), {
				"built-in": [],
				user: []
			})).filter((group) => group.length > 0);
			return (item) => {
				let included = computeFilterFunctions(includedTagFilters), excluded = computeFilterFunctions(excludedTagFilters);
				return (!included.length || included.every((group) => group.some((filterFn) => filterFn(item, !1)))) && (!excluded.length || excluded.every((group) => group.every((filterFn) => filterFn(item, !0))));
			};
		};
		({fetch: fetch2} = global5), STORY_INDEX_PATH = "./index.json", TAGS_FILTER = "tags-filter", STATIC_FILTER = "static-filter", STATUS_FILTER = "status-filter", BUILT_IN_TAG_IDS = new Set(Object.keys(BUILT_IN_FILTERS)), removedOptions = [
			"enableShortcuts",
			"theme",
			"showRoots"
		];
		FILTER_KEYS = {
			tag: {
				included: "includedTagFilters",
				excluded: "excludedTagFilters"
			},
			status: {
				included: "includedStatusFilters",
				excluded: "excludedStatusFilters"
			}
		};
		init11 = ({ fullAPI, store: store2, navigate, provider, state: { location: location2 } = {}, storyId: initialStoryId, viewMode: initialViewMode, docsOptions = {} }) => {
			let navigateWithQueryParams = (path, options) => {
				let { customQueryParams } = store2.getState();
				navigate(buildNavigationUrl(path, customQueryParams ?? {}), options);
			}, persistFilters = (inputPatch) => store2.setState(inputPatch, {
				persistence: "url",
				serialize: (s) => {
					let tagsValue = serializeTagsParam(s.includedTagFilters, s.excludedTagFilters), statusesValue = serializeStatusesParam(s.includedStatusFilters, s.excludedStatusFilters);
					return {
						tags: tagsValue ?? null,
						statuses: statusesValue ?? null
					};
				}
			}), urlFilterTelemetryEmitted = !1, addFilters = async (type, items, excluded) => {
				let { included, excluded: excludedKey } = FILTER_KEYS[type], state = store2.getState(), newIncluded = new Set(state[included]), newExcluded = new Set(state[excludedKey]);
				for (let item of items) {
					let [target, other] = excluded ? [newExcluded, newIncluded] : [newIncluded, newExcluded];
					other.delete(item), target.add(item);
				}
				await persistFilters({
					[included]: Array.from(newIncluded),
					[excludedKey]: Array.from(newExcluded)
				});
			}, removeFilters = async (type, items) => {
				let { included, excluded } = FILTER_KEYS[type], state = store2.getState(), itemSet = new Set(items);
				await persistFilters({
					[included]: state[included].filter((v) => !itemSet.has(v)),
					[excluded]: state[excluded].filter((v) => !itemSet.has(v))
				});
			}, emitFilterTelemetry = (trigger, changed) => {
				let state = store2.getState(), includedTags = (state.includedTagFilters ?? []).filter((id) => BUILT_IN_TAG_IDS.has(id)), excludedTags = (state.excludedTagFilters ?? []).filter((id) => BUILT_IN_TAG_IDS.has(id)), changeDetectionEnabled = !!globalThis?.FEATURES?.changeDetection, includedStatuses = changeDetectionEnabled ? state.includedStatusFilters ?? [] : [], excludedStatuses = changeDetectionEnabled ? state.excludedStatusFilters ?? [] : [], storyCounts = {}, entries = state.internal_index ? Object.values(state.internal_index.entries) : [];
				for (let tagId of /* @__PURE__ */ new Set([...includedTags, ...excludedTags])) {
					let filterDef = BUILT_IN_FILTERS[tagId];
					storyCounts[tagId] = entries.filter((entry) => filterDef(entry)).length;
				}
				if (includedStatuses.length > 0 || excludedStatuses.length > 0) {
					let statusCounts = countStatusesByValue(fullStatusStore.getAll());
					for (let statusValue of /* @__PURE__ */ new Set([...includedStatuses, ...excludedStatuses])) statusCounts[statusValue] !== void 0 && (storyCounts[statusValue] = statusCounts[statusValue]);
				}
				provider.channel?.emit(SIDEBAR_FILTER_CHANGED, {
					trigger,
					changed,
					activeTagFilters: {
						included: includedTags,
						excluded: excludedTags
					},
					activeStatusFilters: {
						included: includedStatuses,
						excluded: excludedStatuses
					},
					storyCounts
				});
			}, api = {
				storyId: toId,
				getData: (storyId, refId) => {
					let result = api.resolveStory(storyId, refId);
					if (result?.type === "story" || result?.type === "docs") return result;
				},
				isPrepared: (storyId, refId) => {
					let data = api.getData(storyId, refId);
					return data ? data.type === "story" ? data.prepared : !0 : !1;
				},
				resolveStory: (storyId, refId) => {
					let { refs, index } = store2.getState();
					if (!(refId && !refs[refId])) return refId ? refs?.[refId]?.index?.[storyId] ?? void 0 : index ? index[storyId] : void 0;
				},
				getCurrentStoryData: () => {
					let { storyId, refId } = store2.getState();
					return api.getData(storyId, refId);
				},
				getIndex: () => {
					let { internal_index } = store2.getState();
					return internal_index;
				},
				getParameters: (storyIdOrCombo, parameterName) => {
					let { storyId, refId } = typeof storyIdOrCombo == "string" ? {
						storyId: storyIdOrCombo,
						refId: void 0
					} : storyIdOrCombo, data = api.getData(storyId, refId);
					if (["story", "docs"].includes(data?.type)) {
						let { parameters } = data;
						if (parameters) return parameterName ? parameters[parameterName] : parameters;
					}
					return null;
				},
				getCurrentParameter: (parameterName) => {
					let { storyId, refId } = store2.getState();
					return api.getParameters({
						storyId,
						refId
					}, parameterName) || void 0;
				},
				jumpToComponent: (direction) => {
					let { filteredIndex, storyId, refs, refId } = store2.getState();
					if (!api.getData(storyId, refId)) return;
					let hash = refId ? refs[refId].filteredIndex || {} : filteredIndex;
					if (!hash) return;
					let result = api.findSiblingStoryId(storyId, hash, direction, !0);
					result && api.selectStory(result, void 0, { ref: refId });
				},
				jumpToStory: (direction) => {
					let { filteredIndex, storyId, refs, refId } = store2.getState(), story = api.getData(storyId, refId);
					if (!story) return;
					let hash = story.refId ? refs[story.refId].filteredIndex : filteredIndex;
					if (!hash) return;
					let result = api.findSiblingStoryId(storyId, hash, direction, !1);
					result && api.selectStory(result, void 0, { ref: refId });
				},
				selectFirstStory: () => {
					let state = store2.getState(), { filteredIndex } = state;
					if (filteredIndex) {
						let firstStory2 = Object.keys(filteredIndex).find((id) => filteredIndex[id].type === "story");
						firstStory2 && api.selectStory(firstStory2);
						return;
					}
					let { index } = state;
					if (!index) return;
					let firstStory = Object.keys(index).find((id) => index[id].type === "story");
					if (firstStory) {
						api.selectStory(firstStory);
						return;
					}
					navigateWithQueryParams("/");
				},
				selectStory: (titleOrId = void 0, name = void 0, options = {}) => {
					let { ref, scrollTo } = options, { storyId, index, filteredIndex, refs, settings } = store2.getState(), gotoStory = (entry) => entry?.type === "docs" || entry?.type === "story" ? (store2.setState({ settings: {
						...settings,
						lastTrackedStoryId: entry.id
					} }), navigateWithQueryParams(`/${entry.type}/${entry.refId ? `${entry.refId}_${entry.id}` : entry.id}${scrollTo ? `#${scrollTo}` : ""}`), !0) : !1, kindSlug = storyId?.split("--", 2)[0], hash = ref ? refs[ref].index : index, filteredHash = ref ? refs[ref].filteredIndex : filteredIndex;
					if (!(!hash || !filteredHash)) if (name) if (!titleOrId) gotoStory(hash[toId(kindSlug, name)]);
					else {
						let id = ref ? `${ref}_${toId(titleOrId, name)}` : toId(titleOrId, name);
						if (hash[id]) gotoStory(hash[id]);
						else {
							let entry = hash[sanitize(titleOrId)];
							if (entry?.type === "component") {
								let foundId = entry.children.find((childId) => hash[childId].name === name);
								gotoStory(foundId ? hash[foundId] : void 0);
							}
						}
					}
					else {
						let entry = titleOrId ? hash[titleOrId] || hash[sanitize(titleOrId)] : hash[kindSlug];
						if (!entry) throw new Error(`Unknown id or title: '${titleOrId}'`);
						gotoStory(entry) || gotoStory(api.findLeafEntry(filteredHash, entry.id));
					}
				},
				findLeafEntry(index, storyId) {
					let entry = index[storyId];
					if (!entry) return;
					if (entry.type === "docs" || entry.type === "story") return entry;
					let childStoryId = entry.children.find((childId) => index[childId]);
					return childStoryId ? api.findLeafEntry(index, childStoryId) : void 0;
				},
				findLeafStoryId(index, storyId) {
					return api.findLeafEntry(index, storyId)?.id;
				},
				findAllLeafStoryIds(entryId) {
					let { index } = store2.getState();
					if (!index) return [];
					let findChildEntriesRecursively = (currentEntryId, results = []) => {
						let node = index[currentEntryId];
						return node && (node.type === "story" && results.push(node.id), "children" in node && node.children?.forEach((childId) => findChildEntriesRecursively(childId, results))), results;
					};
					return findChildEntriesRecursively(entryId, []);
				},
				findSiblingStoryId(storyId, index, direction, toSiblingGroup) {
					if (toSiblingGroup) {
						let lookupList2 = getComponentLookupList(index), position2 = lookupList2.findIndex((i) => i.includes(storyId));
						return position2 === lookupList2.length - 1 && direction > 0 || position2 === 0 && direction < 0 ? void 0 : lookupList2[position2 + direction] ? lookupList2[position2 + direction][0] : void 0;
					}
					let lookupList = getStoriesLookupList(index), position = lookupList.indexOf(storyId);
					if (!(position === lookupList.length - 1 && direction > 0) && !(position === 0 && direction < 0)) return lookupList[position + direction];
				},
				updateStoryArgs: (story, updatedArgs) => {
					let { id: storyId, refId } = story;
					provider.channel?.emit(UPDATE_STORY_ARGS, {
						storyId,
						updatedArgs,
						options: { target: refId }
					});
				},
				resetStoryArgs: (story, argNames) => {
					let { id: storyId, refId } = story;
					provider.channel?.emit(RESET_STORY_ARGS, {
						storyId,
						argNames,
						options: { target: refId }
					});
				},
				fetchIndex: async () => {
					try {
						let result = await fetch2(STORY_INDEX_PATH);
						if (result.status !== 200) throw new Error(await result.text());
						let storyIndex = await result.json();
						if (storyIndex.v < 3) {
							logger6.warn(`Skipping story index with version v${storyIndex.v}, awaiting SET_STORIES.`);
							return;
						}
						await api.setIndex(storyIndex);
					} catch (err) {
						await store2.setState({ indexError: err });
					}
				},
				setIndex: async (input) => {
					let { filteredIndex: oldFilteredHash, index: oldHash, filters } = store2.getState(), allStatuses = fullStatusStore.getAll(), newFilteredHash = transformStoryIndexToStoriesHash(input, {
						provider,
						docsOptions,
						filters,
						allStatuses,
						statusFilterKey: STATUS_FILTER
					}), newHash = transformStoryIndexToStoriesHash(input, {
						provider,
						docsOptions,
						filters: {},
						allStatuses
					});
					await store2.setState({
						internal_index: input,
						filteredIndex: addPreparedStories(newFilteredHash, oldFilteredHash),
						index: addPreparedStories(newHash, oldHash),
						indexError: void 0
					});
				},
				updateStory: async (storyId, update2, ref) => {
					if (ref) {
						let { id: refId, index, filteredIndex } = ref, storyUpdates = {
							...ref.storyUpdates,
							[storyId]: {
								...ref.storyUpdates?.[storyId],
								...update2
							}
						};
						index && index[storyId] && (index[storyId] = {
							...index[storyId],
							...update2
						}), filteredIndex && filteredIndex[storyId] && (filteredIndex[storyId] = {
							...filteredIndex[storyId],
							...update2
						}), await fullAPI.updateRef(refId, {
							index,
							filteredIndex,
							storyUpdates
						});
					} else {
						let { index, filteredIndex } = store2.getState();
						index && index[storyId] && (index[storyId] = {
							...index[storyId],
							...update2
						}), filteredIndex && filteredIndex[storyId] && (filteredIndex[storyId] = {
							...filteredIndex[storyId],
							...update2
						}), (index || filteredIndex) && await store2.setState({
							index,
							filteredIndex
						});
					}
				},
				updateDocs: async (docsId, update2, ref) => {
					if (ref) {
						let { id: refId, index, filteredIndex } = ref, storyUpdates = {
							...ref.storyUpdates,
							[docsId]: {
								...ref.storyUpdates?.[docsId],
								...update2
							}
						};
						index && index[docsId] && (index[docsId] = {
							...index[docsId],
							...update2
						}), filteredIndex && filteredIndex[docsId] && (filteredIndex[docsId] = {
							...filteredIndex[docsId],
							...update2
						}), await fullAPI.updateRef(refId, {
							index,
							filteredIndex,
							storyUpdates
						});
					} else {
						let { index, filteredIndex } = store2.getState();
						index && (index[docsId] = {
							...index[docsId],
							...update2
						}), filteredIndex && (filteredIndex[docsId] = {
							...filteredIndex[docsId],
							...update2
						}), (index || filteredIndex) && await store2.setState({
							index,
							filteredIndex
						});
					}
				},
				setPreviewInitialized: async (ref) => {
					ref ? fullAPI.updateRef(ref.id, { previewInitialized: !0 }) : store2.setState({ previewInitialized: !0 });
				},
				experimental_setFilter: async (id, filterFunction) => {
					await api.experimental_setFilters({ [id]: filterFunction });
				},
				experimental_setFilters: async (filters) => {
					await store2.setState((state) => ({ filters: {
						...state.filters,
						...filters
					} }));
					let { internal_index: index } = store2.getState();
					if (!index) return;
					await api.setIndex(index);
					let refs = await fullAPI.getRefs();
					for (let [refId, { internal_index, ...ref }] of Object.entries(refs)) await fullAPI.setRef(refId, {
						...ref,
						storyIndex: internal_index
					}, !0);
					for (let id of Object.keys(filters)) provider.channel?.emit(SET_FILTER, { id });
				},
				resetTagFilters: async () => {
					await persistFilters((s) => ({
						includedTagFilters: s.defaultIncludedTagFilters,
						excludedTagFilters: s.defaultExcludedTagFilters
					})), await recomputeTagsFilter();
				},
				setAllTagFilters: async (included, excluded) => {
					await persistFilters({
						includedTagFilters: included,
						excludedTagFilters: excluded
					}), await recomputeTagsFilter();
				},
				addTagFilters: async (tags2, excluded) => {
					await addFilters("tag", tags2, excluded), await recomputeTagsFilter(), tags2.length === 1 && BUILT_IN_TAG_IDS.has(tags2[0]) && emitFilterTelemetry("interaction", {
						filterType: "tag",
						filterId: tags2[0],
						action: excluded ? "exclude" : "include"
					});
				},
				removeTagFilters: async (tags2) => {
					await removeFilters("tag", tags2), await recomputeTagsFilter(), tags2.length === 1 && BUILT_IN_TAG_IDS.has(tags2[0]) && emitFilterTelemetry("interaction", {
						filterType: "tag",
						filterId: tags2[0],
						action: "remove"
					});
				},
				resetStatusFilters: async () => {
					await persistFilters({
						includedStatusFilters: [],
						excludedStatusFilters: []
					}), await recomputeStatusFilter();
				},
				setAllStatusFilters: async (included, excluded) => {
					let prevState = store2.getState(), prevIncluded = new Set(prevState.includedStatusFilters ?? []), prevExcluded = new Set(prevState.excludedStatusFilters ?? []), nextIncluded = new Set(included), nextExcluded = new Set(excluded);
					await persistFilters({
						includedStatusFilters: included,
						excludedStatusFilters: excluded
					}), await recomputeStatusFilter();
					let changedIds = /* @__PURE__ */ new Set([
						...prevIncluded,
						...prevExcluded,
						...nextIncluded,
						...nextExcluded
					]);
					for (let id of changedIds) {
						let wasIncluded = prevIncluded.has(id), wasExcluded = prevExcluded.has(id), isIncluded = nextIncluded.has(id), isExcluded = nextExcluded.has(id);
						if (wasIncluded === isIncluded && wasExcluded === isExcluded) continue;
						let action;
						isIncluded ? action = "include" : isExcluded ? action = "exclude" : action = "remove", emitFilterTelemetry("interaction", {
							filterType: "status",
							filterId: id,
							action
						});
					}
				},
				addStatusFilters: async (statuses2, excluded) => {
					await addFilters("status", statuses2, excluded), await recomputeStatusFilter(), statuses2.length === 1 && emitFilterTelemetry("interaction", {
						filterType: "status",
						filterId: statuses2[0],
						action: excluded ? "exclude" : "include"
					});
				},
				removeStatusFilters: async (statuses2) => {
					await removeFilters("status", statuses2), await recomputeStatusFilter(), statuses2.length === 1 && emitFilterTelemetry("interaction", {
						filterType: "status",
						filterId: statuses2[0],
						action: "remove"
					});
				}
			}, recomputeTagsFilter = () => {
				let { includedTagFilters, excludedTagFilters } = store2.getState();
				return api.experimental_setFilters({ [TAGS_FILTER]: computeTagsFilterFn(includedTagFilters, excludedTagFilters) });
			}, recomputeStatusFilter = () => {
				let { includedStatusFilters, excludedStatusFilters } = store2.getState();
				return api.experimental_setFilters({ [STATUS_FILTER]: computeStatusFilterFn(includedStatusFilters ?? [], excludedStatusFilters ?? []) });
			};
			provider.channel?.on(STORY_SPECIFIED, function({ storyId, viewMode }) {
				let { sourceType } = getEventMetadata(this, fullAPI);
				if (sourceType === "local") {
					let state = store2.getState(), isCanvasRoute = !isReviewManagerRoute(state.path, state.customQueryParams) && (state.path === "/" || state.viewMode === "story" || state.viewMode === "docs"), stateHasSelection = state.viewMode && state.storyId, stateSelectionDifferent = state.viewMode !== viewMode || state.storyId !== storyId, { type } = state.index?.[state.storyId] || {}, isStory = !(type === "root" || type === "component" || type === "group");
					if (isCanvasRoute) {
						let { filteredIndex } = state;
						if (filteredIndex && !stateHasSelection && !(filteredIndex[storyId]?.type === "story")) {
							let firstFiltered = filteredIndex ? Object.keys(filteredIndex).find((id) => {
								let entry = filteredIndex[id];
								return entry.type === "story" || entry.type === "docs";
							}) : void 0;
							firstFiltered && navigateWithQueryParams(`/${viewMode}/${firstFiltered}`);
							return;
						}
						stateHasSelection && stateSelectionDifferent && isStory ? provider.channel?.emit(SET_CURRENT_STORY, {
							storyId: state.storyId,
							viewMode: state.viewMode
						}) : stateSelectionDifferent && navigateWithQueryParams(`/${viewMode}/${storyId}`);
					}
				}
			}), provider.channel?.on(CURRENT_STORY_WAS_SET, function() {
				let { ref } = getEventMetadata(this, fullAPI);
				api.setPreviewInitialized(ref);
			}), provider.channel?.on(STORY_CHANGED, function() {
				let { sourceType } = getEventMetadata(this, fullAPI);
				if (sourceType === "local") {
					let options = api.getCurrentParameter("options");
					options && fullAPI.setOptions(removeRemovedOptions(options));
				}
			}), provider.channel?.on(STORY_PREPARED, function({ id, ...update2 }) {
				let { ref, sourceType } = getEventMetadata(this, fullAPI);
				if (api.updateStory(id, {
					...update2,
					prepared: !0
				}, ref), !ref && !store2.getState().hasCalledSetOptions) {
					let { options } = update2.parameters;
					fullAPI.setOptions(removeRemovedOptions(options)), store2.setState({ hasCalledSetOptions: !0 });
				}
				if (sourceType === "local") {
					let { storyId, index, refId } = store2.getState();
					if (!index) return;
					let toBePreloaded = Array.from(/* @__PURE__ */ new Set([api.findSiblingStoryId(storyId, index, 1, !0), api.findSiblingStoryId(storyId, index, -1, !0)])).filter(Boolean);
					provider.channel?.emit(PRELOAD_ENTRIES, {
						ids: toBePreloaded,
						options: { target: refId }
					});
				}
			}), provider.channel?.on(DOCS_PREPARED, function({ id, ...update2 }) {
				let { ref } = getEventMetadata(this, fullAPI);
				api.updateStory(id, {
					...update2,
					prepared: !0
				}, ref);
			}), provider.channel?.on(SET_INDEX, function(index) {
				let { ref } = getEventMetadata(this, fullAPI);
				if (ref) fullAPI.setRef(ref.id, {
					...ref,
					storyIndex: index
				}, !0);
				else {
					api.setIndex(index);
					let options = api.getCurrentParameter("options");
					fullAPI.setOptions(removeRemovedOptions(options));
				}
			}), provider.channel?.on(SET_STORIES, function(data) {
				let { ref } = getEventMetadata(this, fullAPI), setStoriesData = data.v ? denormalizeStoryParameters(data) : data.stories;
				if (ref) fullAPI.setRef(ref.id, {
					...ref,
					setStoriesData
				}, !0);
				else throw new Error("Cannot call SET_STORIES for local frame");
			}), provider.channel?.on(SELECT_STORY, function({ kind, title = kind, story, name = story, storyId, ...rest }) {
				let { ref } = getEventMetadata(this, fullAPI);
				ref ? fullAPI.selectStory(storyId || title, name, {
					...rest,
					ref: ref.id
				}) : fullAPI.selectStory(storyId || title, name, rest);
			}), provider.channel?.on(STORY_ARGS_UPDATED, function({ storyId, args }) {
				let { ref } = getEventMetadata(this, fullAPI);
				api.updateStory(storyId, { args }, ref);
			}), provider.channel?.on(CONFIG_ERROR, function(err) {
				let { ref } = getEventMetadata(this, fullAPI);
				api.setPreviewInitialized(ref);
			}), provider.channel?.on(STORY_MISSING, function(err) {
				let { ref } = getEventMetadata(this, fullAPI);
				api.setPreviewInitialized(ref);
			}), provider.channel?.on(SET_CONFIG3, async () => {
				let configFilters2 = provider.getConfig()?.sidebar?.filters || {}, { includedTagFilters, excludedTagFilters, includedStatusFilters, excludedStatusFilters, tagPresets: tagPresets2 } = store2.getState();
				await api.experimental_setFilters({
					...configFilters2,
					[STATIC_FILTER]: computeStaticFilterFn(tagPresets2),
					[TAGS_FILTER]: computeTagsFilterFn(includedTagFilters, excludedTagFilters),
					[STATUS_FILTER]: computeStatusFilterFn(includedStatusFilters, excludedStatusFilters)
				});
			}), fullStatusStore.onAllStatusChange(async () => {
				await recomputeStatusFilter();
			});
			let configFilters = provider.getConfig()?.sidebar?.filters || {}, tagPresets = global5.TAGS_OPTIONS || {}, defaultTags = getDefaultTagsFromPreset(tagPresets), { tags, statuses } = queryFromLocation(location2 ?? { search: "" }), parsedTags = parseTagsParam(tags), hasTagsParam = tags !== void 0, initialIncluded = hasTagsParam ? parsedTags.included : defaultTags.included, initialExcluded = hasTagsParam ? parsedTags.excluded : defaultTags.excluded, parsedStatuses = parseStatusesParam(statuses), initialIncludedStatuses = parsedStatuses.included, initialExcludedStatuses = parsedStatuses.excluded;
			return {
				api,
				state: {
					storyId: initialStoryId,
					viewMode: initialViewMode,
					hasCalledSetOptions: !1,
					previewInitialized: !1,
					filters: {
						...configFilters,
						[STATIC_FILTER]: computeStaticFilterFn(tagPresets),
						[TAGS_FILTER]: computeTagsFilterFn(initialIncluded, initialExcluded),
						[STATUS_FILTER]: computeStatusFilterFn(initialIncludedStatuses, initialExcludedStatuses)
					},
					tagPresets,
					defaultIncludedTagFilters: defaultTags.included,
					defaultExcludedTagFilters: defaultTags.excluded,
					includedTagFilters: initialIncluded,
					excludedTagFilters: initialExcluded,
					includedStatusFilters: initialIncludedStatuses,
					excludedStatusFilters: initialExcludedStatuses
				},
				init: async () => {
					if (provider.channel?.on(STORY_INDEX_INVALIDATED, () => api.fetchIndex()), await api.fetchIndex(), urlFilterTelemetryEmitted) return;
					urlFilterTelemetryEmitted = !0;
					let hasBuiltInTagFilters = initialIncluded.some((id) => BUILT_IN_TAG_IDS.has(id)) || initialExcluded.some((id) => BUILT_IN_TAG_IDS.has(id)), hasStatusFilters = !!globalThis?.FEATURES?.changeDetection && (initialIncludedStatuses.length > 0 || initialExcludedStatuses.length > 0);
					(hasBuiltInTagFilters || hasStatusFilters) && emitFilterTelemetry("url");
				}
			};
		};
		url_exports = {};
		__export(url_exports, {
			getCustomQueryParams: () => getCustomQueryParams,
			init: () => init12
		});
		({GLOBALS_UPDATED: GLOBALS_UPDATED2, NAVIGATE_URL, SET_CURRENT_STORY: SET_CURRENT_STORY2, STORY_ARGS_UPDATED: STORY_ARGS_UPDATED2, UPDATE_QUERY_PARAMS} = __STORYBOOK_MODULE_CORE_EVENTS__);
		({global: global6} = __STORYBOOK_MODULE_GLOBAL__);
		parseBoolean = (value) => {
			if (value === "true" || value === "1") return !0;
			if (value === "false" || value === "0") return !1;
		};
		parseSerializedParam = (param) => Object.fromEntries(param.split(";").map((pair) => pair.split(":")).map(([key, value]) => [key, encodeURIComponent(value)]).filter(([key, value]) => key && value));
		mergeSerializedParams = (params, extraParams) => {
			let pairs = parseSerializedParam(params), extra = parseSerializedParam(extraParams);
			return Object.entries({
				...pairs,
				...extra
			}).map(([key, value]) => `${key}:${value}`).join(";");
		};
		LAYOUT_QUERY_PARAM_KEYS = [
			"full",
			"panel",
			"nav",
			"shortcuts",
			"addonPanel",
			"tabs",
			"path"
		];
		getCustomQueryParams = (location2) => omit(queryFromLocation(location2), LAYOUT_QUERY_PARAM_KEYS);
		initialUrlSupport = ({ state: { location: location2, path, viewMode, storyId: storyIdFromUrl }, singleStory }) => {
			let { full, panel, nav, shortcuts, addonPanel, tabs } = queryFromLocation(location2), navSize, bottomPanelHeight, rightPanelWidth;
			parseBoolean(full) === !0 ? (navSize = 0, bottomPanelHeight = 0, rightPanelWidth = 0) : parseBoolean(full) === !1 && (navSize = DEFAULT_NAV_SIZE, bottomPanelHeight = DEFAULT_BOTTOM_PANEL_HEIGHT, rightPanelWidth = DEFAULT_RIGHT_PANEL_WIDTH), singleStory || (parseBoolean(nav) === !0 && (navSize = DEFAULT_NAV_SIZE), parseBoolean(nav) === !1 && (navSize = 0)), parseBoolean(panel) === !1 && (bottomPanelHeight = 0, rightPanelWidth = 0);
			let layout = {
				navSize,
				bottomPanelHeight,
				rightPanelWidth,
				panelPosition: ["right", "bottom"].includes(panel) ? panel : void 0,
				showTabs: parseBoolean(tabs)
			}, ui = { enableShortcuts: parseBoolean(shortcuts) }, selectedPanel = addonPanel || void 0, storyId = storyIdFromUrl, otherParams = getCustomQueryParams(location2), customQueryParams = dequal(prevParams, otherParams) ? prevParams : otherParams;
			return prevParams = customQueryParams, {
				viewMode,
				layout,
				ui,
				selectedPanel,
				location: location2,
				path,
				customQueryParams,
				storyId
			};
		};
		init12 = (moduleArgs) => {
			let { store: store2, navigate, provider, fullAPI } = moduleArgs, navigateTo = (path, queryParams = {}, options = {}) => navigate(buildNavigationUrl(path, queryParams), options), api = {
				getStoryHrefs(storyId, options = {}) {
					let { id: currentStoryId, refId: currentRefId } = fullAPI.getCurrentStoryData() ?? {}, isCurrentStory = storyId === currentStoryId && options.refId === currentRefId, { customQueryParams, location: location2, refs } = store2.getState(), { base, inheritArgs = isCurrentStory, inheritGlobals = !0, queryParams = {}, refId, viewMode = "story", embed = !1, freeze = !1 } = options;
					if (refId && !refs[refId]) throw new Error(`Invalid refId: ${refId}`);
					let pathname = location2.pathname || "/", originAddress = global6.window.location.origin + pathname, networkAddress = global6.STORYBOOK_NETWORK_ADDRESS ?? originAddress, managerBase = base === "origin" ? originAddress : base === "network" ? networkAddress : pathname, previewBase = refId ? refs[refId].url + "/iframe.html" : global6.PREVIEW_URL || `${managerBase.replace(/\/[^/]*\.html$/, "").replace(/\/?$/, "/")}iframe.html`, refParam = refId ? `&refId=${encodeURIComponent(refId)}` : "", { args = "", globals = "", ...otherParams } = queryParams, argsParam = inheritArgs ? mergeSerializedParams(customQueryParams?.args ?? "", args) : args, globalsParam = inheritGlobals ? mergeSerializedParams(customQueryParams?.globals ?? "", globals) : globals, managerQueryParams = omit(otherParams, ["embed", "freeze"]), previewQueryParams = omit(otherParams, [
						"id",
						"viewMode",
						"embed",
						"freeze"
					]), customManagerParams = stringify$1(managerQueryParams, {
						nesting: !0,
						nestingSyntax: "js"
					}), customPreviewParams = stringify$1(previewQueryParams, {
						nesting: !0,
						nestingSyntax: "js"
					});
					argsParam = argsParam && `&args=${argsParam}`, globalsParam = globalsParam && `&globals=${globalsParam}`, customManagerParams = customManagerParams && `&${customManagerParams}`, customPreviewParams = customPreviewParams && `&${customPreviewParams}`;
					let embedParam = embed ? "&embed=true" : "", freezeParam = freeze ? "&freeze=finished" : "";
					return {
						managerHref: `${managerBase}?path=/${viewMode}/${refId ? `${refId}_` : ""}${storyId}${argsParam}${globalsParam}${customManagerParams}`,
						previewHref: `${previewBase}?id=${storyId}&viewMode=${viewMode}${refParam}${argsParam}${refId ? "" : globalsParam}${customPreviewParams}${embedParam}${freezeParam}`
					};
				},
				getQueryParam(key) {
					let { customQueryParams } = store2.getState();
					return customQueryParams ? customQueryParams[key] : void 0;
				},
				getUrlState() {
					let { location: location2, path, customQueryParams, storyId, url, viewMode } = store2.getState();
					return {
						path,
						hash: location2?.hash ?? "",
						queryParams: customQueryParams,
						storyId,
						url,
						viewMode
					};
				},
				setQueryParams(input) {
					let { customQueryParams } = store2.getState(), update2 = { ...customQueryParams };
					for (let [key, value] of Object.entries(input)) value == null ? delete update2[key] : update2[key] = value;
					dequal(customQueryParams, update2) || (store2.setState({ customQueryParams: update2 }), provider.channel?.emit(UPDATE_QUERY_PARAMS, update2));
				},
				applyQueryParams(input, options) {
					let { path, hash = "", queryParams } = api.getUrlState();
					navigateTo(`${path}${hash}`, {
						...queryParams,
						...input
					}, options), api.setQueryParams(input);
				},
				navigateUrl(url, options) {
					navigate(url, {
						plain: !0,
						...options
					});
				}
			}, updateArgsParam = () => {
				let { path, hash = "", queryParams, viewMode } = api.getUrlState();
				if (viewMode !== "story") return;
				let currentStory = fullAPI.getCurrentStoryData();
				if (currentStory?.type !== "story") return;
				let { args, initialArgs } = currentStory, argsString = buildArgsParam(initialArgs, args);
				navigateTo(`${path}${hash}`, {
					...queryParams,
					args: argsString || null
				}, { replace: !0 }), api.setQueryParams({ args: argsString || null });
			};
			provider.channel?.on(SET_CURRENT_STORY2, () => updateArgsParam());
			let handleOrId;
			return provider.channel?.on(STORY_ARGS_UPDATED2, () => {
				"requestIdleCallback" in global6.window ? (handleOrId && global6.window.cancelIdleCallback(handleOrId), handleOrId = global6.window.requestIdleCallback(updateArgsParam, { timeout: 1e3 })) : (handleOrId && clearTimeout(handleOrId), setTimeout(updateArgsParam, 100));
			}), provider.channel?.on(GLOBALS_UPDATED2, ({ userGlobals, initialGlobals }) => {
				let { path, hash = "", queryParams } = api.getUrlState(), globalsString = buildArgsParam(initialGlobals, merge_default(initialGlobals, userGlobals));
				navigateTo(`${path}${hash}`, {
					...queryParams,
					globals: globalsString || null
				}, { replace: !0 }), api.setQueryParams({ globals: globalsString || null });
			}), provider.channel?.on(NAVIGATE_URL, (url, options) => {
				api.navigateUrl(url, options);
			}), {
				api,
				state: initialUrlSupport(moduleArgs),
				init: () => {
					store2.registerPersistenceHandler("url", (_patch, serialize) => {
						if (serialize) {
							let params = serialize(store2.getState());
							api.applyQueryParams(params, { replace: !0 });
						}
					});
				}
			};
		};
		versions_exports = {};
		__export(versions_exports, { init: () => init13 });
		import_memoizerific3 = __toESM$2(require_memoizerific(), 1);
		({global: global7} = __STORYBOOK_MODULE_GLOBAL__);
		version = "10.6.2";
		({VERSIONCHECK} = global7), getVersionCheckData = (0, import_memoizerific3.default)(1)(() => {
			try {
				return { ...JSON.parse(VERSIONCHECK).data || {} };
			} catch {
				return {};
			}
		}), normalizeRendererName = (renderer) => renderer.includes("vue") ? "vue" : renderer, init13 = ({ store: store2 }) => {
			let { dismissedVersionNotification } = store2.getState(), state = {
				versions: {
					current: { version },
					...getVersionCheckData()
				},
				dismissedVersionNotification
			}, api = {
				getCurrentVersion: () => {
					let { versions: { current } } = store2.getState();
					return current;
				},
				getLatestVersion: () => {
					let { versions: { latest, next, current } } = store2.getState();
					return current && import_semver.default.prerelease(current.version) && next ? latest && import_semver.default.gt(latest.version, next.version) ? latest : next : latest;
				},
				getDocsUrl: ({ asset, subpath = asset, versioned, renderer, ref = "ui" }) => {
					let { versions } = store2.getState(), latestVersion = versions.latest?.version, currentVersion = versions.current?.version, activeVersion = currentVersion?.startsWith("0.0.0") && latestVersion || currentVersion, url = `https://storybook.js.org/${asset ? "docs-assets" : "docs"}/`;
					if (asset && activeVersion) url += `${import_semver.default.major(activeVersion)}.${import_semver.default.minor(activeVersion)}/`;
					else if (versioned && activeVersion && latestVersion) {
						let versionDiff = import_semver.default.diff(latestVersion, activeVersion);
						versionDiff === "patch" || versionDiff === null || (url += `${import_semver.default.major(activeVersion)}.${import_semver.default.minor(activeVersion)}/`);
					}
					let [cleanedSubpath, hash] = subpath?.split("#") || [];
					if (cleanedSubpath && (url += asset ? cleanedSubpath : `${cleanedSubpath}/`), renderer && typeof global7.STORYBOOK_RENDERER < "u") {
						let rendererName = global7.STORYBOOK_RENDERER;
						rendererName && (url += `?renderer=${normalizeRendererName(rendererName)}`);
					}
					return ref && (url += `${url.includes("?") ? "&" : "?"}ref=${ref}`), hash && (url += `#${hash}`), url;
				},
				versionUpdateAvailable: () => {
					let latest = api.getLatestVersion(), current = api.getCurrentVersion();
					if (latest) {
						if (!latest.version || !current.version) return !0;
						let actualCurrent = !!import_semver.default.prerelease(current.version) ? `${import_semver.default.major(current.version)}.${import_semver.default.minor(current.version)}.${import_semver.default.patch(current.version)}` : current.version, diff = import_semver.default.diff(actualCurrent, latest.version);
						return import_semver.default.gt(latest.version, actualCurrent) && diff !== "patch" && !diff.includes("pre");
					}
					return !1;
				}
			};
			return {
				init: async () => {
					let { versions = {} } = store2.getState(), { latest, next } = getVersionCheckData();
					await store2.setState({ versions: {
						...versions,
						latest,
						next
					} });
				},
				state,
				api
			};
		};
		whatsnew_exports = {};
		__export(whatsnew_exports, { init: () => init14 });
		({REQUEST_WHATS_NEW_DATA, RESULT_WHATS_NEW_DATA, SET_WHATS_NEW_CACHE, TOGGLE_WHATS_NEW_NOTIFICATIONS} = __STORYBOOK_MODULE_CORE_EVENTS__);
		({global: global8} = __STORYBOOK_MODULE_GLOBAL__);
		WHATS_NEW_NOTIFICATION_ID = "whats-new";
		StorybookIcon = ({ color = "currentColor", size = 14 }) => import_react$180.createElement("svg", {
			width: size,
			height: size,
			viewBox: "0 0 14 14",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg"
		}, import_react$180.createElement("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M2.042.616a.704.704 0 00-.66.729L1.816 12.9c.014.367.306.66.672.677l9.395.422h.032a.704.704 0 00.704-.703V.704c0-.015 0-.03-.002-.044a.704.704 0 00-.746-.659l-.773.049.057 1.615a.105.105 0 01-.17.086l-.52-.41-.617.468a.105.105 0 01-.168-.088L9.746.134 2.042.616zm8.003 4.747c-.247.192-2.092.324-2.092.05.04-1.045-.429-1.091-.689-1.091-.247 0-.662.075-.662.634 0 .57.607.893 1.32 1.27 1.014.538 2.24 1.188 2.24 2.823 0 1.568-1.273 2.433-2.898 2.433-1.676 0-3.141-.678-2.976-3.03.065-.275 2.197-.21 2.197 0-.026.971.195 1.256.753 1.256.43 0 .624-.236.624-.634 0-.602-.633-.958-1.361-1.367-.987-.554-2.148-1.205-2.148-2.7 0-1.494 1.027-2.489 2.86-2.489 1.832 0 2.832.98 2.832 2.845z",
			fill: color
		}));
		init14 = ({ fullAPI, store: store2, provider }) => {
			let state = { whatsNewData: void 0 };
			function setWhatsNewState(newState) {
				store2.setState({ whatsNewData: newState }), state.whatsNewData = newState;
			}
			let api = {
				isWhatsNewUnread() {
					return state.whatsNewData?.status === "SUCCESS" && !state.whatsNewData.postIsRead;
				},
				whatsNewHasBeenRead() {
					state.whatsNewData?.status === "SUCCESS" && (setWhatsNewCache({ lastReadPost: state.whatsNewData.url }), setWhatsNewState({
						...state.whatsNewData,
						postIsRead: !0
					}), fullAPI.clearNotification(WHATS_NEW_NOTIFICATION_ID));
				},
				toggleWhatsNewNotifications() {
					state.whatsNewData?.status === "SUCCESS" && (setWhatsNewState({
						...state.whatsNewData,
						disableWhatsNewNotifications: !state.whatsNewData.disableWhatsNewNotifications
					}), provider.channel?.emit(TOGGLE_WHATS_NEW_NOTIFICATIONS, { disableWhatsNewNotifications: state.whatsNewData.disableWhatsNewNotifications }));
				}
			};
			function getLatestWhatsNewPost() {
				return provider.channel?.emit(REQUEST_WHATS_NEW_DATA), new Promise((resolve) => provider.channel?.once(RESULT_WHATS_NEW_DATA, ({ data }) => resolve(data)));
			}
			function setWhatsNewCache(cache) {
				provider.channel?.emit(SET_WHATS_NEW_CACHE, cache);
			}
			return {
				init: async () => {
					if (global8.CONFIG_TYPE !== "DEVELOPMENT") return;
					let whatsNewData = await getLatestWhatsNewPost();
					setWhatsNewState(whatsNewData);
					let urlState = fullAPI.getUrlState(), isOnboardingView = urlState?.path === "/onboarding" || urlState.queryParams?.onboarding === "true", isReviewView = urlState?.path === "/review/" || urlState?.path === "/review" || urlState?.path?.startsWith("/review/");
					!isOnboardingView && !isReviewView && whatsNewData.status === "SUCCESS" && !whatsNewData.disableWhatsNewNotifications && whatsNewData.showNotification && fullAPI.addNotification({
						id: WHATS_NEW_NOTIFICATION_ID,
						link: "/settings/whats-new",
						content: {
							headline: whatsNewData.title,
							subHeadline: "Learn what's new in Storybook"
						},
						icon: import_react$180.createElement(StorybookIcon, null),
						onClear({ dismissed }) {
							dismissed && setWhatsNewCache({ lastDismissedPost: whatsNewData.url });
						}
					});
				},
				state,
				api
			};
		};
		import_store2 = __toESM$2(require_store2(), 1);
		store_setup_default = (_) => {
			_.fn("set", function(key, data) {
				return _.set(this._area, this._in(key), stringify(data, { maxDepth: 50 }));
			}), _.fn("get", function(key, alt) {
				let value = _.get(this._area, this._in(key));
				return value !== null ? parse$1(value) : alt || value;
			});
		};
		store_setup_default(import_store2.default._);
		STORAGE_KEY = "@storybook/manager/store";
		Store = class {
			constructor({ allowPersistence, setState, getState }) {
				this.persistenceHandlers = /* @__PURE__ */ new Map();
				this.upstreamPersistence = allowPersistence ?? !0, this.upstreamSetState = setState, this.upstreamGetState = getState;
			}
			registerPersistenceHandler(key, handler) {
				this.persistenceHandlers.set(key, handler);
			}
			getInitialState(base) {
				for (let storage of [import_store2.default.local, import_store2.default.session]) {
					let persisted = get(storage);
					if ("includedTagFilters" in persisted || "excludedTagFilters" in persisted) {
						let { includedTagFilters: _i, excludedTagFilters: _e, ...rest } = persisted;
						set(storage, rest);
					}
				}
				let local = get(import_store2.default.local), session = get(import_store2.default.session);
				return {
					...base,
					...local,
					...session
				};
			}
			getState() {
				return this.upstreamGetState();
			}
			async setState(inputPatch, cbOrOptions, inputOptions) {
				let callback, options;
				typeof cbOrOptions == "function" ? (callback = cbOrOptions, options = inputOptions) : options = cbOrOptions;
				let { persistence = "none" } = options || {}, patch = {}, delta = {};
				typeof inputPatch == "function" ? patch = (state) => (delta = inputPatch(state), delta) : (patch = inputPatch, delta = patch);
				let newState = await new Promise((resolve) => {
					this.upstreamSetState(patch, () => {
						resolve(this.getState());
					});
				});
				if (persistence !== "none" && this.upstreamPersistence) if (persistence === "url") {
					let handler = this.persistenceHandlers.get("url");
					handler && await handler(delta, options?.serialize);
				} else await update(persistence === "session" ? import_store2.default.session : import_store2.default.local, delta);
				return callback && callback(newState), newState;
			}
		};
		({ActiveTabs: ActiveTabs2} = layout_exports);
		ManagerContext = createContext$1({
			api: void 0,
			state: initial_state_default({})
		});
		combineParameters = (...parameterSets) => noArrayMerge({}, ...parameterSets);
		ManagerProvider = class extends import_react$176.Component {
			constructor(props) {
				super(props);
				this.api = {};
				this.mounted = !1;
				this.initModules = () => {
					this.modules.forEach((module) => {
						"init" in module && module.init();
					});
				};
				let { location: location2, path, refId, viewMode = props.docsOptions.docsMode ? "docs" : props.viewMode, singleStory, storyId, docsOptions, navigate } = props, store2 = new Store({
					getState: () => this.state,
					setState: (stateChange, callback) => {
						if (!this.mounted) {
							let patch = typeof stateChange == "function" ? stateChange(this.state) : stateChange;
							return this.state = {
								...this.state,
								...patch
							}, callback?.(this.state), this.state;
						}
						return this.setState(stateChange, () => callback(this.state)), this.state;
					}
				}), routeData = {
					location: location2,
					path,
					viewMode,
					singleStory,
					storyId,
					refId
				}, optionsData = { docsOptions };
				this.state = store2.getInitialState(initial_state_default({
					...routeData,
					...optionsData
				}));
				let apiData = {
					navigate,
					store: store2,
					provider: props.provider
				};
				this.modules = [
					provider_exports,
					channel_exports,
					addons_exports,
					layout_exports,
					notifications_exports,
					settings_exports,
					shortcuts_exports,
					stories_exports,
					refs_exports,
					globals_exports,
					url_exports,
					versions_exports,
					whatsnew_exports,
					open_in_editor_exports
				].map((m) => m.init({
					...routeData,
					...optionsData,
					...apiData,
					state: this.state,
					fullAPI: this.api
				}));
				let state = initial_state_default(this.state, ...this.modules.map((m) => m.state)), api = Object.assign(this.api, { navigate }, ...this.modules.map((m) => m.api));
				this.state = state, this.api = api, props.provider.handleAPI(this.api);
			}
			componentDidMount() {
				this.mounted = !0;
			}
			static getDerivedStateFromProps(props, state) {
				let locationSearchChanged = state.location?.search !== props.location?.search, locationHashChanged = state.location?.hash !== props.location?.hash;
				return state.path !== props.path || locationSearchChanged || locationHashChanged ? {
					...state,
					location: props.location,
					path: props.path,
					refId: props.refId,
					viewMode: props.viewMode,
					storyId: props.storyId,
					customQueryParams: getCustomQueryParams(props.location)
				} : null;
			}
			shouldComponentUpdate(nextProps, nextState) {
				let prevProps = this.props, prevState = this.state;
				return prevProps.path !== nextProps.path || !isEqual(prevState, nextState);
			}
			render() {
				let { children } = this.props, value = {
					state: this.state,
					api: this.api
				};
				return import_react$176.createElement(EffectOnMount, { effect: this.initModules }, import_react$176.createElement(ManagerContext.Provider, { value }, import_react$176.createElement(ManagerConsumer, null, children)));
			}
		};
		ManagerProvider.displayName = "Manager";
		EffectOnMount = ({ children, effect }) => (import_react$176.useEffect(effect, []), children);
		defaultFilter = (c) => c;
		globalThis.STORYBOOK_ADDON_STATE = {};
		({STORYBOOK_ADDON_STATE} = globalThis);
		({Channel} = __STORYBOOK_MODULE_CHANNELS__);
		UNIVERSAL_TEST_PROVIDER_STORE_OPTIONS = {
			id: "storybook/test-provider",
			leader: !0,
			initialState: {}
		};
		({fullTestProviderStore, getTestProviderStoreById, useTestProviderStore, universalTestProviderStore} = createTestProviderStore({
			universalTestProviderStore: UniversalStore.create({
				...UNIVERSAL_TEST_PROVIDER_STORE_OPTIONS,
				leader: globalThis.CONFIG_TYPE === "PRODUCTION"
			}),
			useUniversalStore
		}));
		UNIVERSAL_CHECKLIST_STORE_OPTIONS = {
			id: "storybook/checklist",
			initialState: {
				items: {
					accessibilityTests: { status: "open" },
					aiSetup: { status: "open" },
					autodocs: { status: "open" },
					ciTests: { status: "open" },
					controls: { status: "open" },
					coverage: { status: "open" },
					guidedTour: { status: "open" },
					installA11y: { status: "open" },
					installChromatic: { status: "open" },
					installDocs: { status: "open" },
					installVitest: { status: "open" },
					mdxDocs: { status: "open" },
					moreComponents: { status: "open" },
					moreStories: { status: "open" },
					onboardingSurvey: { status: "open" },
					organizeStories: { status: "open" },
					renderComponent: { status: "open" },
					runTests: { status: "open" },
					publishStorybook: { status: "open" },
					shareStorybook: { status: "open" },
					viewports: { status: "open" },
					visualTests: { status: "open" },
					whatsNewStorybook10: { status: "open" },
					writeInteractions: { status: "open" }
				},
				widget: {}
			}
		};
		createChecklistStore = (universalChecklistStore2) => ({
			getValue: (id) => universalChecklistStore2.getState().items[id] ?? {
				status: "open",
				mutedAt: void 0
			},
			accept: (id) => {
				universalChecklistStore2.setState((state) => ({
					...state,
					items: {
						...state.items,
						[id]: {
							...state.items[id],
							status: "accepted"
						}
					}
				}));
			},
			done: (id) => {
				universalChecklistStore2.setState((state) => ({
					...state,
					items: {
						...state.items,
						[id]: {
							...state.items[id],
							status: "done"
						}
					}
				}));
			},
			skip: (id) => {
				universalChecklistStore2.setState((state) => ({
					...state,
					items: {
						...state.items,
						[id]: {
							...state.items[id],
							status: "skipped"
						}
					}
				}));
			},
			reset: (id) => {
				universalChecklistStore2.setState((state) => ({
					...state,
					items: {
						...state.items,
						[id]: {
							...state.items[id],
							status: "open"
						}
					}
				}));
			},
			mute: (itemIds) => {
				universalChecklistStore2.setState((state) => ({
					...state,
					items: itemIds.reduce((acc, id) => ({
						...acc,
						[id]: {
							...state.items[id],
							mutedAt: Date.now()
						}
					}), state.items)
				}));
			},
			disable: (value) => {
				universalChecklistStore2.setState((state) => ({
					...state,
					widget: {
						...state.widget,
						disable: value
					},
					items: Object.entries(state.items).reduce((acc, [id, value2]) => ({
						...acc,
						[id]: {
							...value2,
							mutedAt: void 0
						}
					}), state.items)
				}));
			}
		});
		universalChecklistStore = UniversalStore.create({
			...UNIVERSAL_CHECKLIST_STORE_OPTIONS,
			leader: globalThis.CONFIG_TYPE === "PRODUCTION"
		});
		createChecklistStore(universalChecklistStore);
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/use-sync-external-store@1.7.0_react@19.2.5/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
/**
* @license React
* use-sync-external-store-shim.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_shim_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is;
	var useState = React.useState;
	var useEffect = React.useEffect;
	var useLayoutEffect = React.useLayoutEffect;
	var useDebugValue = React.useDebugValue;
	function useSyncExternalStore$2(subscribe, getSnapshot) {
		var value = getSnapshot(), _useState = useState({ inst: {
			value,
			getSnapshot
		} }), inst = _useState[0].inst, forceUpdate = _useState[1];
		useLayoutEffect(function() {
			inst.value = value;
			inst.getSnapshot = getSnapshot;
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
		}, [
			subscribe,
			value,
			getSnapshot
		]);
		useEffect(function() {
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			return subscribe(function() {
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			});
		}, [subscribe]);
		useDebugValue(value);
		return value;
	}
	function checkIfSnapshotChanged(inst) {
		var latestGetSnapshot = inst.getSnapshot;
		inst = inst.value;
		try {
			var nextValue = latestGetSnapshot();
			return !objectIs(inst, nextValue);
		} catch (error) {
			return !0;
		}
	}
	function useSyncExternalStore$1(subscribe, getSnapshot) {
		return getSnapshot();
	}
	var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
	exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
}));
//#endregion
//#region ../../node_modules/.pnpm/use-sync-external-store@1.7.0_react@19.2.5/node_modules/use-sync-external-store/shim/index.js
var require_shim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_use_sync_external_store_shim_production();
}));
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.6.2_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/components/index.js
var components_exports = /* @__PURE__ */ __exportAll({ createCopyToClipboardFunction: () => createCopyToClipboardFunction });
async function copyUsingClipboardAPI(text) {
	try {
		await globalWindow.top?.navigator.clipboard.writeText(text);
	} catch {
		await globalWindow.navigator.clipboard.writeText(text);
	}
}
async function copyUsingWorkAround(text) {
	let tmp = document2.createElement("TEXTAREA"), focus = document2.activeElement;
	tmp.value = text, document2.body.appendChild(tmp), tmp.select(), document2.execCommand("copy"), document2.body.removeChild(tmp), focus.focus();
}
function createCopyToClipboardFunction() {
	return globalWindow.navigator?.clipboard ? copyUsingClipboardAPI : copyUsingWorkAround;
}
function setRef(ref, value) {
	if (typeof ref == "function") return ref(value);
	ref != null && (ref.current = value);
}
function composeRefs(...refs) {
	return (node) => {
		let hasCleanup = !1, cleanups = refs.map((ref) => {
			let cleanup = setRef(ref, node);
			return !hasCleanup && typeof cleanup == "function" && (hasCleanup = !0), cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				let cleanup = cleanups[i];
				typeof cleanup == "function" ? cleanup() : setRef(refs[i], null);
			}
		};
	};
}
function useComposedRefs(...refs) {
	return import_react$10.useCallback(composeRefs(...refs), refs);
}
function createSlot(ownerName) {
	let Slot2 = import_react$9.forwardRef((props, forwardedRef) => {
		let { children, ...slotProps } = props, slottableElement = null, hasSlottable = !1, newChildren = [];
		isLazyComponent(children) && typeof use == "function" && (children = use(children._payload)), import_react$9.Children.forEach(children, (maybeSlottable) => {
			if (isSlottable(maybeSlottable)) {
				hasSlottable = !0;
				let slottable = maybeSlottable, child = "child" in slottable.props ? slottable.props.child : slottable.props.children;
				isLazyComponent(child) && typeof use == "function" && (child = use(child._payload)), slottableElement = getSlottableElementFromSlottable(slottable, child), newChildren.push(slottableElement?.props?.children);
			} else newChildren.push(maybeSlottable);
		}), slottableElement ? slottableElement = import_react$9.cloneElement(slottableElement, void 0, newChildren) : !hasSlottable && import_react$9.Children.count(children) === 1 && import_react$9.isValidElement(children) && (slottableElement = children);
		let slottableElementRef = slottableElement ? getElementRef(slottableElement) : void 0, composedRef = useComposedRefs(forwardedRef, slottableElementRef);
		if (!slottableElement) {
			if (children || children === 0) throw new Error(hasSlottable ? createSlottableError(ownerName) : createSlotError(ownerName));
			return children;
		}
		let mergedProps = mergeProps(slotProps, slottableElement.props ?? {});
		return slottableElement.type !== import_react$9.Fragment && (mergedProps.ref = forwardedRef ? composedRef : slottableElementRef), import_react$9.cloneElement(slottableElement, mergedProps);
	});
	return Slot2.displayName = `${ownerName}.Slot`, Slot2;
}
function createSlottable(ownerName) {
	let Slottable2 = (props) => "child" in props ? props.children(props.child) : props.children;
	return Slottable2.displayName = `${ownerName}.Slottable`, Slottable2.__radixId = SLOTTABLE_IDENTIFIER, Slottable2;
}
function mergeProps(slotProps, childProps) {
	let overrideProps = { ...childProps };
	for (let propName in childProps) {
		let slotPropValue = slotProps[propName], childPropValue = childProps[propName];
		/^on[A-Z]/.test(propName) ? slotPropValue && childPropValue ? overrideProps[propName] = (...args) => {
			let result = childPropValue(...args);
			return slotPropValue(...args), result;
		} : slotPropValue && (overrideProps[propName] = slotPropValue) : propName === "style" ? overrideProps[propName] = {
			...slotPropValue,
			...childPropValue
		} : propName === "className" && (overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" "));
	}
	return {
		...slotProps,
		...overrideProps
	};
}
function getElementRef(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get, mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	return mayWarn ? element.ref : (getter = Object.getOwnPropertyDescriptor(element, "ref")?.get, mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning, mayWarn ? element.props.ref : element.props.ref || element.ref);
}
function isSlottable(child) {
	return import_react$9.isValidElement(child) && typeof child.type == "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function isLazyComponent(element) {
	return element != null && typeof element == "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
function isPromiseLike(value) {
	return typeof value == "object" && value !== null && "then" in value;
}
function $1dbecbe27a04f9af$export$14d238f342723f25(defaultValue) {
	let [value, setValue] = (0, import_react$15.useState)(defaultValue), currValue = (0, import_react$15.useRef)(value), effect = (0, import_react$15.useRef)(null), nextRef = (0, import_react$15.useRef)(() => {
		if (!effect.current) return;
		let newValue = effect.current.next();
		if (newValue.done) {
			effect.current = null;
			return;
		}
		currValue.current === newValue.value ? nextRef.current() : setValue(newValue.value);
	});
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		currValue.current = value, effect.current && nextRef.current();
	});
	return [value, (0, import_react$15.useCallback)((fn) => {
		effect.current = fn(currValue.current), nextRef.current();
	}, [nextRef])];
}
function $b5e257d569688ac6$var$useCounter(isDisabled = !1) {
	let ctx = (0, import_react$17.useContext)($b5e257d569688ac6$var$SSRContext), ref = (0, import_react$17.useRef)(null);
	if (ref.current === null && !isDisabled) {
		var _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner, _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
		let currentOwner = (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = import_react$17.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === void 0 || (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner = _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner === void 0 ? void 0 : _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner.current;
		if (currentOwner) {
			let prevComponentValue = $b5e257d569688ac6$var$componentIds.get(currentOwner);
			prevComponentValue == null ? $b5e257d569688ac6$var$componentIds.set(currentOwner, {
				id: ctx.current,
				state: currentOwner.memoizedState
			}) : currentOwner.memoizedState !== prevComponentValue.state && (ctx.current = prevComponentValue.id, $b5e257d569688ac6$var$componentIds.delete(currentOwner));
		}
		ref.current = ++ctx.current;
	}
	return ref.current;
}
function $b5e257d569688ac6$var$useLegacySSRSafeId(defaultId) {
	let ctx = (0, import_react$17.useContext)($b5e257d569688ac6$var$SSRContext);
	let counter = $b5e257d569688ac6$var$useCounter(!!defaultId), prefix = `react-aria${ctx.prefix}`;
	return defaultId || `${prefix}-${counter}`;
}
function $b5e257d569688ac6$var$useModernSSRSafeId(defaultId) {
	let id = import_react$17.useId(), [didSSR] = (0, import_react$17.useState)($b5e257d569688ac6$export$535bd6ca7f90a273()), prefix = didSSR || false ? "react-aria" : `react-aria${$b5e257d569688ac6$var$defaultContext.prefix}`;
	return defaultId || `${prefix}-${id}`;
}
function $b5e257d569688ac6$var$getSnapshot() {
	return !1;
}
function $b5e257d569688ac6$var$getServerSnapshot() {
	return !0;
}
function $b5e257d569688ac6$var$subscribe(onStoreChange) {
	return () => {};
}
function $b5e257d569688ac6$export$535bd6ca7f90a273() {
	return typeof import_react$17.useSyncExternalStore == "function" ? import_react$17.useSyncExternalStore($b5e257d569688ac6$var$subscribe, $b5e257d569688ac6$var$getSnapshot, $b5e257d569688ac6$var$getServerSnapshot) : (0, import_react$17.useContext)($b5e257d569688ac6$var$IsSSRContext);
}
function $bdb11010cef70236$export$f680877a34711e37(defaultId) {
	let [value, setValue] = (0, import_react$16.useState)(defaultId), nextId = (0, import_react$16.useRef)(null), res = $b5e257d569688ac6$export$619500959fc48b26(value), cleanupRef = (0, import_react$16.useRef)(null);
	if ($bdb11010cef70236$var$registry && $bdb11010cef70236$var$registry.register(cleanupRef, res), $bdb11010cef70236$var$canUseDOM) {
		let cacheIdRef = $bdb11010cef70236$export$d41a04c74483c6ef.get(res);
		cacheIdRef && !cacheIdRef.includes(nextId) ? cacheIdRef.push(nextId) : $bdb11010cef70236$export$d41a04c74483c6ef.set(res, [nextId]);
	}
	return $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		let r2 = res;
		return () => {
			$bdb11010cef70236$var$registry && $bdb11010cef70236$var$registry.unregister(cleanupRef), $bdb11010cef70236$export$d41a04c74483c6ef.delete(r2);
		};
	}, [res]), (0, import_react$16.useEffect)(() => {
		let newId = nextId.current;
		return newId && setValue(newId), () => {
			newId && (nextId.current = null);
		};
	}), res;
}
function $bdb11010cef70236$export$cd8c9cb68f842629(idA, idB) {
	if (idA === idB) return idA;
	let setIdsA = $bdb11010cef70236$export$d41a04c74483c6ef.get(idA);
	if (setIdsA) return setIdsA.forEach((ref) => ref.current = idB), idB;
	let setIdsB = $bdb11010cef70236$export$d41a04c74483c6ef.get(idB);
	return setIdsB ? (setIdsB.forEach((ref) => ref.current = idA), idA) : idB;
}
function $bdb11010cef70236$export$b4cc09c592e8fdb8(depArray = []) {
	let id = $bdb11010cef70236$export$f680877a34711e37(), [resolvedId, setResolvedId] = $1dbecbe27a04f9af$export$14d238f342723f25(id), updateId = (0, import_react$16.useCallback)(() => {
		setResolvedId(function* () {
			yield id, yield document.getElementById(id) ? id : void 0;
		});
	}, [id, setResolvedId]);
	return $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(updateId, [
		id,
		updateId,
		...depArray
	]), resolvedId;
}
function $ff5963eb1fccf552$export$e08e3b67e392101e(...callbacks) {
	return (...args) => {
		for (let callback of callbacks) typeof callback == "function" && callback(...args);
	};
}
function $431fbd86ca7dc216$var$isNode(value) {
	return value !== null && typeof value == "object" && "nodeType" in value && typeof value.nodeType == "number";
}
function $431fbd86ca7dc216$export$af51f0f06c0f328a(node) {
	return $431fbd86ca7dc216$var$isNode(node) && node.nodeType === Node.DOCUMENT_FRAGMENT_NODE && "host" in node;
}
function $f4e2df6bd15f8569$export$98658e8c59125e6a() {
	return $f4e2df6bd15f8569$var$_shadowDOM;
}
function $d4ee10de306f2510$export$4282f70798064fe0(node, otherNode) {
	if (!$f4e2df6bd15f8569$export$98658e8c59125e6a()) return otherNode && node ? node.contains(otherNode) : !1;
	if (!node || !otherNode) return !1;
	let currentNode = otherNode;
	for (; currentNode !== null;) {
		if (currentNode === node) return !0;
		currentNode.tagName === "SLOT" && currentNode.assignedSlot ? currentNode = currentNode.assignedSlot.parentNode : $431fbd86ca7dc216$export$af51f0f06c0f328a(currentNode) ? currentNode = currentNode.host : currentNode = currentNode.parentNode;
	}
	return !1;
}
function $d4ee10de306f2510$export$e58f029f0fbfdb29(event) {
	return $f4e2df6bd15f8569$export$98658e8c59125e6a() && event.target.shadowRoot && event.composedPath ? event.composedPath()[0] : event.target;
}
function $dfc540311bf7f109$export$4d0f8be8b12a7ef6(doc, root, whatToShow, filter) {
	return $f4e2df6bd15f8569$export$98658e8c59125e6a() ? new $dfc540311bf7f109$export$63eb3ababa9c55c4(doc, root, whatToShow, filter) : doc.createTreeWalker(root, whatToShow, filter);
}
function r(e) {
	var t, f, n = "";
	if (typeof e == "string" || typeof e == "number") n += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
function $3ef42575df84b30b$export$9d1611c77c2fe928(...args) {
	let result = { ...args[0] };
	for (let i = 1; i < args.length; i++) {
		let props = args[i];
		for (let key in props) {
			let a = result[key], b = props[key];
			typeof a == "function" && typeof b == "function" && key[0] === "o" && key[1] === "n" && key.charCodeAt(2) >= 65 && key.charCodeAt(2) <= 90 ? result[key] = $ff5963eb1fccf552$export$e08e3b67e392101e(a, b) : (key === "className" || key === "UNSAFE_className") && typeof a == "string" && typeof b == "string" ? result[key] = clsx_default(a, b) : key === "id" && a && b ? result.id = $bdb11010cef70236$export$cd8c9cb68f842629(a, b) : result[key] = b !== void 0 ? b : a;
		}
	}
	return result;
}
function $5dc95899b306f630$export$c9058316764c140e(...refs) {
	return refs.length === 1 && refs[0] ? refs[0] : (value) => {
		let hasCleanup = !1, cleanups = refs.map((ref) => {
			let cleanup = $5dc95899b306f630$var$setRef(ref, value);
			return hasCleanup || (hasCleanup = typeof cleanup == "function"), cleanup;
		});
		if (hasCleanup) return () => {
			cleanups.forEach((cleanup, i) => {
				typeof cleanup == "function" ? cleanup() : $5dc95899b306f630$var$setRef(refs[i], null);
			});
		};
	};
}
function $5dc95899b306f630$var$setRef(ref, value) {
	if (typeof ref == "function") return ref(value);
	ref != null && (ref.current = value);
}
function $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, opts = {}) {
	let { labelable, isLink: isLink2, global: global3, events = global3, propNames } = opts, filteredProps = {};
	for (let prop in props) Object.prototype.hasOwnProperty.call(props, prop) && ($65484d02dcb7eb3e$var$DOMPropNames.has(prop) || labelable && $65484d02dcb7eb3e$var$labelablePropNames.has(prop) || isLink2 && $65484d02dcb7eb3e$var$linkPropNames.has(prop) || global3 && $65484d02dcb7eb3e$var$globalAttrs.has(prop) || events && ($65484d02dcb7eb3e$var$globalEvents.has(prop) || prop.endsWith("Capture") && $65484d02dcb7eb3e$var$globalEvents.has(prop.slice(0, -7))) || propNames?.has(prop) || $65484d02dcb7eb3e$var$propRe.test(prop)) && (filteredProps[prop] = props[prop]);
	return filteredProps;
}
function $7215afc6de606d6b$export$de79e2c695e052f3(element) {
	if ($7215afc6de606d6b$var$supportsPreventScroll()) element.focus({ preventScroll: !0 });
	else {
		let scrollableElements = $7215afc6de606d6b$var$getScrollableElements(element);
		element.focus(), $7215afc6de606d6b$var$restoreScrollPosition(scrollableElements);
	}
}
function $7215afc6de606d6b$var$supportsPreventScroll() {
	if ($7215afc6de606d6b$var$supportsPreventScrollCached == null) {
		$7215afc6de606d6b$var$supportsPreventScrollCached = !1;
		try {
			document.createElement("div").focus({ get preventScroll() {
				return $7215afc6de606d6b$var$supportsPreventScrollCached = !0, !0;
			} });
		} catch {}
	}
	return $7215afc6de606d6b$var$supportsPreventScrollCached;
}
function $7215afc6de606d6b$var$getScrollableElements(element) {
	let parent = element.parentNode, scrollableElements = [], rootScrollingElement = document.scrollingElement || document.documentElement;
	for (; parent instanceof HTMLElement && parent !== rootScrollingElement;) (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) && scrollableElements.push({
		element: parent,
		scrollTop: parent.scrollTop,
		scrollLeft: parent.scrollLeft
	}), parent = parent.parentNode;
	return rootScrollingElement instanceof HTMLElement && scrollableElements.push({
		element: rootScrollingElement,
		scrollTop: rootScrollingElement.scrollTop,
		scrollLeft: rootScrollingElement.scrollLeft
	}), scrollableElements;
}
function $7215afc6de606d6b$var$restoreScrollPosition(scrollableElements) {
	for (let { element, scrollTop, scrollLeft } of scrollableElements) element.scrollTop = scrollTop, element.scrollLeft = scrollLeft;
}
function $c87311424ea30a05$var$testUserAgent(re2) {
	var _window_navigator_userAgentData;
	if (typeof window > "u" || window.navigator == null) return !1;
	let brands = (_window_navigator_userAgentData = window.navigator.userAgentData) === null || _window_navigator_userAgentData === void 0 ? void 0 : _window_navigator_userAgentData.brands;
	return Array.isArray(brands) && brands.some((brand) => re2.test(brand.brand)) || re2.test(window.navigator.userAgent);
}
function $c87311424ea30a05$var$testPlatform(re2) {
	var _window_navigator_userAgentData;
	return typeof window < "u" && window.navigator != null ? re2.test(((_window_navigator_userAgentData = window.navigator.userAgentData) === null || _window_navigator_userAgentData === void 0 ? void 0 : _window_navigator_userAgentData.platform) || window.navigator.platform) : !1;
}
function $c87311424ea30a05$var$cached(fn) {
	let res = null;
	return () => (res ??= fn(), res);
}
function $ea8dcbcb9ea1b556$export$9a302a45f65d0572() {
	return (0, import_react$18.useContext)($ea8dcbcb9ea1b556$var$RouterContext);
}
function $ea8dcbcb9ea1b556$export$efa8c9099e530235(link, modifiers) {
	let target = link.getAttribute("target");
	return (!target || target === "_self") && link.origin === location.origin && !link.hasAttribute("download") && !modifiers.metaKey && !modifiers.ctrlKey && !modifiers.altKey && !modifiers.shiftKey;
}
function $ea8dcbcb9ea1b556$export$95185d699e05d4d7(target, modifiers, setOpening = !0) {
	var _window_event_type, _window_event;
	let { metaKey, ctrlKey, altKey, shiftKey } = modifiers;
	$c87311424ea30a05$export$b7d78993b74f766d() && (_window_event = window.event) !== null && _window_event !== void 0 && (_window_event_type = _window_event.type) !== null && _window_event_type !== void 0 && _window_event_type.startsWith("key") && target.target === "_blank" && ($c87311424ea30a05$export$9ac100e40613ea10() ? metaKey = !0 : ctrlKey = !0);
	let event = $c87311424ea30a05$export$78551043582a6a98() && $c87311424ea30a05$export$9ac100e40613ea10() && !$c87311424ea30a05$export$7bef049ce92e4224() && true ? new KeyboardEvent("keydown", {
		keyIdentifier: "Enter",
		metaKey,
		ctrlKey,
		altKey,
		shiftKey
	}) : new MouseEvent("click", {
		metaKey,
		ctrlKey,
		altKey,
		shiftKey,
		detail: 1,
		bubbles: !0,
		cancelable: !0
	});
	$ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = setOpening, $7215afc6de606d6b$export$de79e2c695e052f3(target), target.dispatchEvent(event), $ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = !1;
}
function $ea8dcbcb9ea1b556$var$getSyntheticLink(target, open) {
	if (target instanceof HTMLAnchorElement) open(target);
	else if (target.hasAttribute("data-href")) {
		let link = document.createElement("a");
		link.href = target.getAttribute("data-href"), target.hasAttribute("data-target") && (link.target = target.getAttribute("data-target")), target.hasAttribute("data-rel") && (link.rel = target.getAttribute("data-rel")), target.hasAttribute("data-download") && (link.download = target.getAttribute("data-download")), target.hasAttribute("data-ping") && (link.ping = target.getAttribute("data-ping")), target.hasAttribute("data-referrer-policy") && (link.referrerPolicy = target.getAttribute("data-referrer-policy")), target.appendChild(link), open(link), target.removeChild(link);
	}
}
function $ea8dcbcb9ea1b556$var$openSyntheticLink(target, modifiers) {
	$ea8dcbcb9ea1b556$var$getSyntheticLink(target, (link) => $ea8dcbcb9ea1b556$export$95185d699e05d4d7(link, modifiers));
}
function $ea8dcbcb9ea1b556$export$7e924b3091a3bd18(props) {
	let router = $ea8dcbcb9ea1b556$export$9a302a45f65d0572();
	var _props_href;
	let href = router.useHref((_props_href = props?.href) !== null && _props_href !== void 0 ? _props_href : "");
	return {
		href: props?.href ? href : void 0,
		target: props?.target,
		rel: props?.rel,
		download: props?.download,
		ping: props?.ping,
		referrerPolicy: props?.referrerPolicy
	};
}
function $ea8dcbcb9ea1b556$export$13aea1a3cb5e3f1f(e, router, href, routerOptions) {
	!router.isNative && e.currentTarget instanceof HTMLAnchorElement && e.currentTarget.href && !e.isDefaultPrevented() && $ea8dcbcb9ea1b556$export$efa8c9099e530235(e.currentTarget, e) && href && (e.preventDefault(), router.open(e.currentTarget, e, href, routerOptions));
}
function $bbed8b41f857bcc0$var$setupGlobalEvents() {
	if (typeof window > "u") return;
	function isTransitionEvent(event) {
		return "propertyName" in event;
	}
	let onTransitionStart = (e) => {
		if (!isTransitionEvent(e) || !e.target) return;
		let transitions = $bbed8b41f857bcc0$var$transitionsByElement.get(e.target);
		transitions || (transitions = /* @__PURE__ */ new Set(), $bbed8b41f857bcc0$var$transitionsByElement.set(e.target, transitions), e.target.addEventListener("transitioncancel", onTransitionEnd, { once: !0 })), transitions.add(e.propertyName);
	}, onTransitionEnd = (e) => {
		if (!isTransitionEvent(e) || !e.target) return;
		let properties = $bbed8b41f857bcc0$var$transitionsByElement.get(e.target);
		if (properties && (properties.delete(e.propertyName), properties.size === 0 && (e.target.removeEventListener("transitioncancel", onTransitionEnd), $bbed8b41f857bcc0$var$transitionsByElement.delete(e.target)), $bbed8b41f857bcc0$var$transitionsByElement.size === 0)) {
			for (let cb of $bbed8b41f857bcc0$var$transitionCallbacks) cb();
			$bbed8b41f857bcc0$var$transitionCallbacks.clear();
		}
	};
	document.body.addEventListener("transitionrun", onTransitionStart), document.body.addEventListener("transitionend", onTransitionEnd);
}
function $bbed8b41f857bcc0$var$cleanupDetachedElements() {
	for (let [eventTarget] of $bbed8b41f857bcc0$var$transitionsByElement) "isConnected" in eventTarget && !eventTarget.isConnected && $bbed8b41f857bcc0$var$transitionsByElement.delete(eventTarget);
}
function $bbed8b41f857bcc0$export$24490316f764c430(fn) {
	requestAnimationFrame(() => {
		$bbed8b41f857bcc0$var$cleanupDetachedElements(), $bbed8b41f857bcc0$var$transitionsByElement.size === 0 ? fn() : $bbed8b41f857bcc0$var$transitionCallbacks.add(fn);
	});
}
function $03deb23ff14920c4$export$4eaf04e54aa8eed6() {
	let globalListeners = (0, import_react$20.useRef)(/* @__PURE__ */ new Map()), addGlobalListener = (0, import_react$20.useCallback)((eventTarget, type, listener, options) => {
		let fn = options?.once ? (...args) => {
			globalListeners.current.delete(listener), listener(...args);
		} : listener;
		globalListeners.current.set(listener, {
			type,
			eventTarget,
			fn,
			options
		}), eventTarget.addEventListener(type, fn, options);
	}, []), removeGlobalListener = (0, import_react$20.useCallback)((eventTarget, type, listener, options) => {
		var _globalListeners_current_get;
		let fn = ((_globalListeners_current_get = globalListeners.current.get(listener)) === null || _globalListeners_current_get === void 0 ? void 0 : _globalListeners_current_get.fn) || listener;
		eventTarget.removeEventListener(type, fn, options), globalListeners.current.delete(listener);
	}, []), removeAllGlobalListeners = (0, import_react$20.useCallback)(() => {
		globalListeners.current.forEach((value, key) => {
			removeGlobalListener(value.eventTarget, value.type, key, value.options);
		});
	}, [removeGlobalListener]);
	return (0, import_react$20.useEffect)(() => removeAllGlobalListeners, [removeAllGlobalListeners]), {
		addGlobalListener,
		removeGlobalListener,
		removeAllGlobalListeners
	};
}
function $313b98861ee5dd6c$export$d6875122194c7b44(props, defaultLabel) {
	let { id, "aria-label": label, "aria-labelledby": labelledBy } = props;
	return id = $bdb11010cef70236$export$f680877a34711e37(id), labelledBy && label ? labelledBy = [.../* @__PURE__ */ new Set([id, ...labelledBy.trim().split(/\s+/)])].join(" ") : labelledBy && (labelledBy = labelledBy.trim().split(/\s+/).join(" ")), !label && !labelledBy && defaultLabel && (label = defaultLabel), {
		id,
		"aria-label": label,
		"aria-labelledby": labelledBy
	};
}
function $df56164dff5785e2$export$4338b53315abf666(ref) {
	let objRef = (0, import_react$21.useRef)(null), cleanupRef = (0, import_react$21.useRef)(void 0), refEffect = (0, import_react$21.useCallback)((instance) => {
		if (typeof ref == "function") {
			let refCallback = ref, refCleanup = refCallback(instance);
			return () => {
				typeof refCleanup == "function" ? refCleanup() : refCallback(null);
			};
		} else if (ref) return ref.current = instance, () => {
			ref.current = null;
		};
	}, [ref]);
	return (0, import_react$21.useMemo)(() => ({
		get current() {
			return objRef.current;
		},
		set current(value) {
			objRef.current = value, cleanupRef.current && (cleanupRef.current(), cleanupRef.current = void 0), value != null && (cleanupRef.current = refEffect(value));
		}
	}), [refEffect]);
}
function $8ae05eaa5c114e9c$export$7f54fc3180508a52(fn) {
	let ref = (0, import_react$22.useRef)(null);
	return $8ae05eaa5c114e9c$var$useEarlyEffect(() => {
		ref.current = fn;
	}, [fn]), (0, import_react$22.useCallback)((...args) => {
		let f = ref.current;
		return f?.(...args);
	}, []);
}
function $ca9b37712f007381$export$72ef708ab07251f1(effect, dependencies) {
	let isInitialMount = (0, import_react$24.useRef)(!0), lastDeps = (0, import_react$24.useRef)(null);
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => (isInitialMount.current = !0, () => {
		isInitialMount.current = !1;
	}), []), $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		isInitialMount.current ? isInitialMount.current = !1 : (!lastDeps.current || dependencies.some((dep, i) => !Object.is(dep, lastDeps[i]))) && effect(), lastDeps.current = dependencies;
	}, dependencies);
}
function $9daab02d461809db$var$hasResizeObserver() {
	return typeof window.ResizeObserver < "u";
}
function $9daab02d461809db$export$683480f191c0e3ea(options) {
	let { ref, box, onResize } = options, onResizeEvent = $8ae05eaa5c114e9c$export$7f54fc3180508a52(onResize);
	(0, import_react$25.useEffect)(() => {
		let element = ref?.current;
		if (element) if ($9daab02d461809db$var$hasResizeObserver()) {
			let resizeObserverInstance = new window.ResizeObserver((entries) => {
				entries.length && onResizeEvent();
			});
			return resizeObserverInstance.observe(element, { box }), () => {
				element && resizeObserverInstance.unobserve(element);
			};
		} else return window.addEventListener("resize", onResizeEvent, !1), () => {
			window.removeEventListener("resize", onResizeEvent, !1);
		};
	}, [ref, box]);
}
function $e7801be82b4b2a53$export$4debdb1a3f0fa79e(context, ref) {
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		if (context && context.ref && ref) return context.ref.current = ref.current, () => {
			context.ref && (context.ref.current = null);
		};
	});
}
function $cc38e7bd3fc7b213$export$2bb74740c4e19def(node, checkForOverflow) {
	if (!node) return !1;
	let style = window.getComputedStyle(node), isScrollable = /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY);
	return isScrollable && checkForOverflow && (isScrollable = node.scrollHeight !== node.clientHeight || node.scrollWidth !== node.clientWidth), isScrollable;
}
function $62d8ded9296f3872$export$cfa2225e87938781(node, checkForOverflow) {
	let scrollableNode = node;
	for ($cc38e7bd3fc7b213$export$2bb74740c4e19def(scrollableNode, checkForOverflow) && (scrollableNode = scrollableNode.parentElement); scrollableNode && !$cc38e7bd3fc7b213$export$2bb74740c4e19def(scrollableNode, checkForOverflow);) scrollableNode = scrollableNode.parentElement;
	return scrollableNode || document.scrollingElement || document.documentElement;
}
function $a40c673dc9f6d9c7$export$94ed1c92c7beeb22(node, checkForOverflow) {
	let scrollParents = [];
	for (; node && node !== document.documentElement;) $cc38e7bd3fc7b213$export$2bb74740c4e19def(node, checkForOverflow) && scrollParents.push(node), node = node.parentElement;
	return scrollParents;
}
function $21f1aa98acb08317$export$16792effe837dba3(e) {
	return $c87311424ea30a05$export$9ac100e40613ea10() ? e.metaKey : e.ctrlKey;
}
function $21f1aa98acb08317$export$c57958e35f31ed73(target) {
	return target instanceof HTMLInputElement && !$21f1aa98acb08317$var$nonTextInputTypes.has(target.type) || target instanceof HTMLTextAreaElement || target instanceof HTMLElement && target.isContentEditable;
}
function $ef06256079686ba0$export$f8aeda7b10753fa1(description) {
	let [id, setId] = (0, import_react$27.useState)();
	return $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		if (!description) return;
		let desc = $ef06256079686ba0$var$descriptionNodes.get(description);
		if (desc) setId(desc.element.id);
		else {
			let id2 = `react-aria-description-${$ef06256079686ba0$var$descriptionId++}`;
			setId(id2);
			let node = document.createElement("div");
			node.id = id2, node.style.display = "none", node.textContent = description, document.body.appendChild(node), desc = {
				refCount: 0,
				element: node
			}, $ef06256079686ba0$var$descriptionNodes.set(description, desc);
		}
		return desc.refCount++, () => {
			desc && --desc.refCount === 0 && (desc.element.remove(), $ef06256079686ba0$var$descriptionNodes.delete(description));
		};
	}, [description]), { "aria-describedby": description ? id : void 0 };
}
function $e9faafb641e167db$export$90fc3a17d93f704c(ref, event, handler, options) {
	let handleEvent = $8ae05eaa5c114e9c$export$7f54fc3180508a52(handler), isDisabled = handler == null;
	(0, import_react$28.useEffect)(() => {
		if (isDisabled || !ref.current) return;
		let element = ref.current;
		return element.addEventListener(event, handleEvent, options), () => {
			element.removeEventListener(event, handleEvent, options);
		};
	}, [
		ref,
		event,
		options,
		isDisabled
	]);
}
function $2f04cbc44ee30ce0$export$53a0910f038337bd(scrollView, element) {
	let offsetX = $2f04cbc44ee30ce0$var$relativeOffset(scrollView, element, "left"), offsetY = $2f04cbc44ee30ce0$var$relativeOffset(scrollView, element, "top"), width = element.offsetWidth, height = element.offsetHeight, x = scrollView.scrollLeft, y = scrollView.scrollTop, { borderTopWidth, borderLeftWidth, scrollPaddingTop, scrollPaddingRight, scrollPaddingBottom, scrollPaddingLeft } = getComputedStyle(scrollView), borderAdjustedX = x + parseInt(borderLeftWidth, 10), borderAdjustedY = y + parseInt(borderTopWidth, 10), maxX = borderAdjustedX + scrollView.clientWidth, maxY = borderAdjustedY + scrollView.clientHeight, scrollPaddingTopNumber = parseInt(scrollPaddingTop, 10) || 0, scrollPaddingBottomNumber = parseInt(scrollPaddingBottom, 10) || 0, scrollPaddingRightNumber = parseInt(scrollPaddingRight, 10) || 0, scrollPaddingLeftNumber = parseInt(scrollPaddingLeft, 10) || 0;
	offsetX <= x + scrollPaddingLeftNumber ? x = offsetX - parseInt(borderLeftWidth, 10) - scrollPaddingLeftNumber : offsetX + width > maxX - scrollPaddingRightNumber && (x += offsetX + width - maxX + scrollPaddingRightNumber), offsetY <= borderAdjustedY + scrollPaddingTopNumber ? y = offsetY - parseInt(borderTopWidth, 10) - scrollPaddingTopNumber : offsetY + height > maxY - scrollPaddingBottomNumber && (y += offsetY + height - maxY + scrollPaddingBottomNumber), scrollView.scrollLeft = x, scrollView.scrollTop = y;
}
function $2f04cbc44ee30ce0$var$relativeOffset(ancestor, child, axis) {
	let prop = axis === "left" ? "offsetLeft" : "offsetTop", sum = 0;
	for (; child.offsetParent && (sum += child[prop], child.offsetParent !== ancestor);) {
		if (child.offsetParent.contains(ancestor)) {
			sum -= ancestor[prop];
			break;
		}
		child = child.offsetParent;
	}
	return sum;
}
function $2f04cbc44ee30ce0$export$c826860796309d1b(targetElement, opts) {
	if (targetElement && document.contains(targetElement)) {
		let root = document.scrollingElement || document.documentElement, isScrollPrevented = window.getComputedStyle(root).overflow === "hidden";
		if (isScrollPrevented) {
			let scrollParents = $a40c673dc9f6d9c7$export$94ed1c92c7beeb22(targetElement);
			isScrollPrevented || scrollParents.push(root);
			for (let scrollParent of scrollParents) $2f04cbc44ee30ce0$export$53a0910f038337bd(scrollParent, targetElement);
		} else {
			var _targetElement_scrollIntoView;
			let { left: originalLeft, top: originalTop } = targetElement.getBoundingClientRect();
			targetElement == null || (_targetElement_scrollIntoView = targetElement.scrollIntoView) === null || _targetElement_scrollIntoView === void 0 || _targetElement_scrollIntoView.call(targetElement, { block: "nearest" });
			let { left: newLeft, top: newTop } = targetElement.getBoundingClientRect();
			if (Math.abs(originalLeft - newLeft) > 1 || Math.abs(originalTop - newTop) > 1) {
				var _opts_containingElement_scrollIntoView, _opts_containingElement, _targetElement_scrollIntoView1;
				opts == null || (_opts_containingElement = opts.containingElement) === null || _opts_containingElement === void 0 || (_opts_containingElement_scrollIntoView = _opts_containingElement.scrollIntoView) === null || _opts_containingElement_scrollIntoView === void 0 || _opts_containingElement_scrollIntoView.call(_opts_containingElement, {
					block: "center",
					inline: "center"
				}), (_targetElement_scrollIntoView1 = targetElement.scrollIntoView) === null || _targetElement_scrollIntoView1 === void 0 || _targetElement_scrollIntoView1.call(targetElement, { block: "nearest" });
			}
		}
	}
}
function $6a7db85432448f7f$export$60278871457622de(event) {
	return event.pointerType === "" && event.isTrusted ? !0 : $c87311424ea30a05$export$a11b0059900ceec8() && event.pointerType ? event.type === "click" && event.buttons === 1 : event.detail === 0 && !event.pointerType;
}
function $6a7db85432448f7f$export$29bf1b5f2c56cf63(event) {
	return !$c87311424ea30a05$export$a11b0059900ceec8() && event.width === 0 && event.height === 0 || event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "mouse";
}
function $cdc5a6778b766db2$export$a9d04c5684123369(value) {
	let pieces = import_react$33.version.split(".");
	return parseInt(pieces[0], 10) >= 19 ? value : value ? "true" : void 0;
}
function $d3f049242431219c$export$6d3443f2c48bfc20(ref, isReady = !0) {
	let [isEntering, setEntering] = (0, import_react$34.useState)(!0), isAnimationReady = isEntering && isReady;
	return $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		if (isAnimationReady && ref.current && "getAnimations" in ref.current) for (let animation of ref.current.getAnimations()) animation instanceof CSSTransition && animation.cancel();
	}, [ref, isAnimationReady]), $d3f049242431219c$var$useAnimation(ref, isAnimationReady, (0, import_react$34.useCallback)(() => setEntering(!1), [])), isAnimationReady;
}
function $d3f049242431219c$export$45fda7c47f93fd48(ref, isOpen) {
	let [exitState, setExitState] = (0, import_react$34.useState)(isOpen ? "open" : "closed");
	switch (exitState) {
		case "open":
			isOpen || setExitState("exiting");
			break;
		case "closed":
		case "exiting": isOpen && setExitState("open");
	}
	let isExiting = exitState === "exiting";
	return $d3f049242431219c$var$useAnimation(ref, isExiting, (0, import_react$34.useCallback)(() => {
		setExitState((state) => state === "exiting" ? "closed" : state);
	}, [])), isExiting;
}
function $d3f049242431219c$var$useAnimation(ref, isActive, onEnd) {
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		if (isActive && ref.current) {
			if (!("getAnimations" in ref.current)) {
				onEnd();
				return;
			}
			let animations = ref.current.getAnimations();
			if (animations.length === 0) {
				onEnd();
				return;
			}
			let canceled = !1;
			return Promise.all(animations.map((a) => a.finished)).then(() => {
				canceled || (0, import_react_dom.flushSync)(() => {
					onEnd();
				});
			}).catch(() => {}), () => {
				canceled = !0;
			};
		}
	}, [
		ref,
		isActive,
		onEnd
	]);
}
function $7d2416ea0959daaa$var$isStyleVisible(element) {
	let windowObject = $431fbd86ca7dc216$export$f21a1ffae260145a(element);
	if (!(element instanceof windowObject.HTMLElement) && !(element instanceof windowObject.SVGElement)) return !1;
	let { display, visibility } = element.style, isVisible = display !== "none" && visibility !== "hidden" && visibility !== "collapse";
	if (isVisible) {
		let { getComputedStyle: getComputedStyle2 } = element.ownerDocument.defaultView, { display: computedDisplay, visibility: computedVisibility } = getComputedStyle2(element);
		isVisible = computedDisplay !== "none" && computedVisibility !== "hidden" && computedVisibility !== "collapse";
	}
	return isVisible;
}
function $7d2416ea0959daaa$var$isAttributeVisible(element, childElement) {
	return !element.hasAttribute("hidden") && !element.hasAttribute("data-react-aria-prevent-focus") && (element.nodeName === "DETAILS" && childElement && childElement.nodeName !== "SUMMARY" ? element.hasAttribute("open") : !0);
}
function $7d2416ea0959daaa$export$e989c0fffaa6b27a(element, childElement) {
	return $7d2416ea0959daaa$var$supportsCheckVisibility ? element.checkVisibility({ visibilityProperty: !0 }) && !element.closest("[data-react-aria-prevent-focus]") : element.nodeName !== "#comment" && $7d2416ea0959daaa$var$isStyleVisible(element) && $7d2416ea0959daaa$var$isAttributeVisible(element, childElement) && (!element.parentElement || $7d2416ea0959daaa$export$e989c0fffaa6b27a(element.parentElement, element));
}
function $b4b717babfbb907b$export$4c063cf1350e6fed(element) {
	return element.matches($b4b717babfbb907b$var$FOCUSABLE_ELEMENT_SELECTOR) && $7d2416ea0959daaa$export$e989c0fffaa6b27a(element) && !$b4b717babfbb907b$var$isInert(element);
}
function $b4b717babfbb907b$export$bebd5a1431fec25d(element) {
	return element.matches($b4b717babfbb907b$var$TABBABLE_ELEMENT_SELECTOR) && $7d2416ea0959daaa$export$e989c0fffaa6b27a(element) && !$b4b717babfbb907b$var$isInert(element);
}
function $b4b717babfbb907b$var$isInert(element) {
	let node = element;
	for (; node != null;) {
		if (node instanceof node.ownerDocument.defaultView.HTMLElement && node.inert) return !0;
		node = node.parentElement;
	}
	return !1;
}
function $458b0a5536c1a7cf$export$40bfa8c7b0832715(value, defaultValue, onChange) {
	let [stateValue, setStateValue] = (0, import_react$35.useState)(value || defaultValue), valueRef = (0, import_react$35.useRef)(stateValue), isControlledRef = (0, import_react$35.useRef)(value !== void 0), isControlled = value !== void 0;
	(0, import_react$35.useEffect)(() => {
		isControlledRef.current;
		isControlledRef.current = isControlled;
	}, [isControlled]);
	let currentValue = isControlled ? value : stateValue;
	$458b0a5536c1a7cf$var$useEarlyEffect(() => {
		valueRef.current = currentValue;
	});
	let [, forceUpdate] = (0, import_react$35.useReducer)(() => ({}), {});
	return [currentValue, (0, import_react$35.useCallback)((value2, ...args) => {
		let newValue = typeof value2 == "function" ? value2(valueRef.current) : value2;
		Object.is(valueRef.current, newValue) || (valueRef.current = newValue, setStateValue(newValue), forceUpdate(), onChange?.(newValue, ...args));
	}, [onChange])];
}
function $9446cca9a3875146$export$7d15b64cf5a3a4c4(value, min = -1 / 0, max = 1 / 0) {
	return Math.min(Math.max(value, min), max);
}
function $8a9cb279dc87e130$export$525bc4921d56d4a(nativeEvent) {
	let event = nativeEvent;
	return event.nativeEvent = nativeEvent, event.isDefaultPrevented = () => event.defaultPrevented, event.isPropagationStopped = () => event.cancelBubble, event.persist = () => {}, event;
}
function $8a9cb279dc87e130$export$c2b7abe5d61ec696(event, target) {
	Object.defineProperty(event, "target", { value: target }), Object.defineProperty(event, "currentTarget", { value: target });
}
function $8a9cb279dc87e130$export$715c682d09d639cc(onBlur) {
	let stateRef = (0, import_react$36.useRef)({
		isFocused: !1,
		observer: null
	});
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		let state = stateRef.current;
		return () => {
			state.observer && (state.observer.disconnect(), state.observer = null);
		};
	}, []);
	let dispatchBlur = $8ae05eaa5c114e9c$export$7f54fc3180508a52((e) => {
		onBlur?.(e);
	});
	return (0, import_react$36.useCallback)((e) => {
		if (e.target instanceof HTMLButtonElement || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
			stateRef.current.isFocused = !0;
			let target = e.target, onBlurHandler = (e2) => {
				if (stateRef.current.isFocused = !1, target.disabled) {
					let event = $8a9cb279dc87e130$export$525bc4921d56d4a(e2);
					dispatchBlur(event);
				}
				stateRef.current.observer && (stateRef.current.observer.disconnect(), stateRef.current.observer = null);
			};
			target.addEventListener("focusout", onBlurHandler, { once: !0 }), stateRef.current.observer = new MutationObserver(() => {
				if (stateRef.current.isFocused && target.disabled) {
					var _stateRef_current_observer;
					(_stateRef_current_observer = stateRef.current.observer) === null || _stateRef_current_observer === void 0 || _stateRef_current_observer.disconnect();
					let relatedTargetEl = target === document.activeElement ? null : document.activeElement;
					target.dispatchEvent(new FocusEvent("blur", { relatedTarget: relatedTargetEl })), target.dispatchEvent(new FocusEvent("focusout", {
						bubbles: !0,
						relatedTarget: relatedTargetEl
					}));
				}
			}), stateRef.current.observer.observe(target, {
				attributes: !0,
				attributeFilter: ["disabled"]
			});
		}
	}, [dispatchBlur]);
}
function $8a9cb279dc87e130$export$cabe61c495ee3649(target) {
	for (; target && !$b4b717babfbb907b$export$4c063cf1350e6fed(target);) target = target.parentElement;
	let window2 = $431fbd86ca7dc216$export$f21a1ffae260145a(target), activeElement = window2.document.activeElement;
	if (!activeElement || activeElement === target) return;
	$8a9cb279dc87e130$export$fda7da73ab5d4c48 = !0;
	let isRefocusing = !1, onBlur = (e) => {
		(e.target === activeElement || isRefocusing) && e.stopImmediatePropagation();
	}, onFocusOut = (e) => {
		(e.target === activeElement || isRefocusing) && (e.stopImmediatePropagation(), !target && !isRefocusing && (isRefocusing = !0, $7215afc6de606d6b$export$de79e2c695e052f3(activeElement), cleanup()));
	}, onFocus = (e) => {
		(e.target === target || isRefocusing) && e.stopImmediatePropagation();
	}, onFocusIn = (e) => {
		(e.target === target || isRefocusing) && (e.stopImmediatePropagation(), isRefocusing || (isRefocusing = !0, $7215afc6de606d6b$export$de79e2c695e052f3(activeElement), cleanup()));
	};
	window2.addEventListener("blur", onBlur, !0), window2.addEventListener("focusout", onFocusOut, !0), window2.addEventListener("focusin", onFocusIn, !0), window2.addEventListener("focus", onFocus, !0);
	let cleanup = () => {
		cancelAnimationFrame(raf), window2.removeEventListener("blur", onBlur, !0), window2.removeEventListener("focusout", onFocusOut, !0), window2.removeEventListener("focusin", onFocusIn, !0), window2.removeEventListener("focus", onFocus, !0), $8a9cb279dc87e130$export$fda7da73ab5d4c48 = !1, isRefocusing = !1;
	}, raf = requestAnimationFrame(cleanup);
	return cleanup;
}
function $14c0b72509d70225$export$16a4697467175487(target) {
	if ($c87311424ea30a05$export$fedb369cb70207f1()) {
		if ($14c0b72509d70225$var$state === "default") {
			let documentObject = $431fbd86ca7dc216$export$b204af158042fbac(target);
			$14c0b72509d70225$var$savedUserSelect = documentObject.documentElement.style.webkitUserSelect, documentObject.documentElement.style.webkitUserSelect = "none";
		}
		$14c0b72509d70225$var$state = "disabled";
	} else if (target instanceof HTMLElement || target instanceof SVGElement) {
		let property = "userSelect" in target.style ? "userSelect" : "webkitUserSelect";
		$14c0b72509d70225$var$modifiedElementMap.set(target, target.style[property]), target.style[property] = "none";
	}
}
function $14c0b72509d70225$export$b0d6fa1ab32e3295(target) {
	if ($c87311424ea30a05$export$fedb369cb70207f1()) {
		if ($14c0b72509d70225$var$state !== "disabled") return;
		$14c0b72509d70225$var$state = "restoring", setTimeout(() => {
			$bbed8b41f857bcc0$export$24490316f764c430(() => {
				if ($14c0b72509d70225$var$state === "restoring") {
					let documentObject = $431fbd86ca7dc216$export$b204af158042fbac(target);
					documentObject.documentElement.style.webkitUserSelect === "none" && (documentObject.documentElement.style.webkitUserSelect = $14c0b72509d70225$var$savedUserSelect || ""), $14c0b72509d70225$var$savedUserSelect = "", $14c0b72509d70225$var$state = "default";
				}
			});
		}, 300);
	} else if ((target instanceof HTMLElement || target instanceof SVGElement) && target && $14c0b72509d70225$var$modifiedElementMap.has(target)) {
		let targetOldUserSelect = $14c0b72509d70225$var$modifiedElementMap.get(target), property = "userSelect" in target.style ? "userSelect" : "webkitUserSelect";
		target.style[property] === "none" && (target.style[property] = targetOldUserSelect), target.getAttribute("style") === "" && target.removeAttribute("style"), $14c0b72509d70225$var$modifiedElementMap.delete(target);
	}
}
function _class_apply_descriptor_get(receiver, descriptor) {
	return descriptor.get ? descriptor.get.call(receiver) : descriptor.value;
}
function _class_extract_field_descriptor(receiver, privateMap, action) {
	if (!privateMap.has(receiver)) throw new TypeError("attempted to " + action + " private field on non-instance");
	return privateMap.get(receiver);
}
function _class_private_field_get(receiver, privateMap) {
	return _class_apply_descriptor_get(receiver, _class_extract_field_descriptor(receiver, privateMap, "get"));
}
function _check_private_redeclaration(obj, privateCollection) {
	if (privateCollection.has(obj)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _class_private_field_init(obj, privateMap, value) {
	_check_private_redeclaration(obj, privateMap), privateMap.set(obj, value);
}
function _class_apply_descriptor_set(receiver, descriptor, value) {
	if (descriptor.set) descriptor.set.call(receiver, value);
	else {
		if (!descriptor.writable) throw new TypeError("attempted to set read only private field");
		descriptor.value = value;
	}
}
function _class_private_field_set(receiver, privateMap, value) {
	return _class_apply_descriptor_set(receiver, _class_extract_field_descriptor(receiver, privateMap, "set"), value), value;
}
function $f6c31cce2adf654f$var$usePressResponderContext(props) {
	let context = (0, import_react$38.useContext)($ae1eeba8b9eafd08$export$5165eccb35aaadb5);
	if (context) {
		let { register, ...contextProps } = context;
		props = $3ef42575df84b30b$export$9d1611c77c2fe928(contextProps, props), register();
	}
	return $e7801be82b4b2a53$export$4debdb1a3f0fa79e(context, props.ref), props;
}
function $f6c31cce2adf654f$export$45712eceda6fad21(props) {
	let { onPress, onPressChange, onPressStart, onPressEnd, onPressUp, onClick, isDisabled, isPressed: isPressedProp, preventFocusOnPress, shouldCancelOnPointerExit, allowTextSelectionOnPress, ref: domRef, ...domProps } = $f6c31cce2adf654f$var$usePressResponderContext(props), [isPressed, setPressed] = (0, import_react$38.useState)(!1), ref = (0, import_react$38.useRef)({
		isPressed: !1,
		ignoreEmulatedMouseEvents: !1,
		didFirePressStart: !1,
		isTriggeringEvent: !1,
		activePointerId: null,
		target: null,
		isOverTarget: !1,
		pointerType: null,
		disposables: []
	}), { addGlobalListener, removeAllGlobalListeners } = $03deb23ff14920c4$export$4eaf04e54aa8eed6(), triggerPressStart = $8ae05eaa5c114e9c$export$7f54fc3180508a52((originalEvent, pointerType) => {
		let state = ref.current;
		if (isDisabled || state.didFirePressStart) return !1;
		let shouldStopPropagation = !0;
		if (state.isTriggeringEvent = !0, onPressStart) {
			let event = new $f6c31cce2adf654f$var$PressEvent("pressstart", pointerType, originalEvent);
			onPressStart(event), shouldStopPropagation = event.shouldStopPropagation;
		}
		return onPressChange && onPressChange(!0), state.isTriggeringEvent = !1, state.didFirePressStart = !0, setPressed(!0), shouldStopPropagation;
	}), triggerPressEnd = $8ae05eaa5c114e9c$export$7f54fc3180508a52((originalEvent, pointerType, wasPressed = !0) => {
		let state = ref.current;
		if (!state.didFirePressStart) return !1;
		state.didFirePressStart = !1, state.isTriggeringEvent = !0;
		let shouldStopPropagation = !0;
		if (onPressEnd) {
			let event = new $f6c31cce2adf654f$var$PressEvent("pressend", pointerType, originalEvent);
			onPressEnd(event), shouldStopPropagation = event.shouldStopPropagation;
		}
		if (onPressChange && onPressChange(!1), setPressed(!1), onPress && wasPressed && !isDisabled) {
			let event = new $f6c31cce2adf654f$var$PressEvent("press", pointerType, originalEvent);
			onPress(event), shouldStopPropagation && (shouldStopPropagation = event.shouldStopPropagation);
		}
		return state.isTriggeringEvent = !1, shouldStopPropagation;
	}), triggerPressUp = $8ae05eaa5c114e9c$export$7f54fc3180508a52((originalEvent, pointerType) => {
		let state = ref.current;
		if (isDisabled) return !1;
		if (onPressUp) {
			state.isTriggeringEvent = !0;
			let event = new $f6c31cce2adf654f$var$PressEvent("pressup", pointerType, originalEvent);
			return onPressUp(event), state.isTriggeringEvent = !1, event.shouldStopPropagation;
		}
		return !0;
	}), cancel = $8ae05eaa5c114e9c$export$7f54fc3180508a52((e) => {
		let state = ref.current;
		if (state.isPressed && state.target) {
			state.didFirePressStart && state.pointerType != null && triggerPressEnd($f6c31cce2adf654f$var$createEvent(state.target, e), state.pointerType, !1), state.isPressed = !1, state.isOverTarget = !1, state.activePointerId = null, state.pointerType = null, removeAllGlobalListeners(), allowTextSelectionOnPress || $14c0b72509d70225$export$b0d6fa1ab32e3295(state.target);
			for (let dispose of state.disposables) dispose();
			state.disposables = [];
		}
	}), cancelOnPointerExit = $8ae05eaa5c114e9c$export$7f54fc3180508a52((e) => {
		shouldCancelOnPointerExit && cancel(e);
	}), triggerClick = $8ae05eaa5c114e9c$export$7f54fc3180508a52((e) => {
		isDisabled || onClick?.(e);
	}), triggerSyntheticClick = $8ae05eaa5c114e9c$export$7f54fc3180508a52((e, target) => {
		if (!isDisabled && onClick) {
			let event = new MouseEvent("click", e);
			$8a9cb279dc87e130$export$c2b7abe5d61ec696(event, target), onClick($8a9cb279dc87e130$export$525bc4921d56d4a(event));
		}
	}), pressProps = (0, import_react$38.useMemo)(() => {
		let state = ref.current, pressProps2 = {
			onKeyDown(e) {
				if ($f6c31cce2adf654f$var$isValidKeyboardEvent(e.nativeEvent, e.currentTarget) && $d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent))) {
					var _state_metaKeyEvents;
					$f6c31cce2adf654f$var$shouldPreventDefaultKeyboard($d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent), e.key) && e.preventDefault();
					let shouldStopPropagation = !0;
					if (!state.isPressed && !e.repeat) {
						state.target = e.currentTarget, state.isPressed = !0, state.pointerType = "keyboard", shouldStopPropagation = triggerPressStart(e, "keyboard");
						let originalTarget = e.currentTarget, pressUp = (e2) => {
							$f6c31cce2adf654f$var$isValidKeyboardEvent(e2, originalTarget) && !e2.repeat && $d4ee10de306f2510$export$4282f70798064fe0(originalTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e2)) && state.target && triggerPressUp($f6c31cce2adf654f$var$createEvent(state.target, e2), "keyboard");
						};
						addGlobalListener($431fbd86ca7dc216$export$b204af158042fbac(e.currentTarget), "keyup", $ff5963eb1fccf552$export$e08e3b67e392101e(pressUp, onKeyUp), !0);
					}
					shouldStopPropagation && e.stopPropagation(), e.metaKey && $c87311424ea30a05$export$9ac100e40613ea10() && ((_state_metaKeyEvents = state.metaKeyEvents) === null || _state_metaKeyEvents === void 0 || _state_metaKeyEvents.set(e.key, e.nativeEvent));
				} else e.key === "Meta" && (state.metaKeyEvents = /* @__PURE__ */ new Map());
			},
			onClick(e) {
				if (!(e && !$d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent))) && e && e.button === 0 && !state.isTriggeringEvent && !$ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening) {
					let shouldStopPropagation = !0;
					if (isDisabled && e.preventDefault(), !state.ignoreEmulatedMouseEvents && !state.isPressed && (state.pointerType === "virtual" || $6a7db85432448f7f$export$60278871457622de(e.nativeEvent))) {
						let stopPressStart = triggerPressStart(e, "virtual"), stopPressUp = triggerPressUp(e, "virtual"), stopPressEnd = triggerPressEnd(e, "virtual");
						triggerClick(e), shouldStopPropagation = stopPressStart && stopPressUp && stopPressEnd;
					} else if (state.isPressed && state.pointerType !== "keyboard") {
						let pointerType = state.pointerType || e.nativeEvent.pointerType || "virtual", stopPressUp = triggerPressUp($f6c31cce2adf654f$var$createEvent(e.currentTarget, e), pointerType), stopPressEnd = triggerPressEnd($f6c31cce2adf654f$var$createEvent(e.currentTarget, e), pointerType, !0);
						shouldStopPropagation = stopPressUp && stopPressEnd, state.isOverTarget = !1, triggerClick(e), cancel(e);
					}
					state.ignoreEmulatedMouseEvents = !1, shouldStopPropagation && e.stopPropagation();
				}
			}
		}, onKeyUp = (e) => {
			var _state_metaKeyEvents;
			if (state.isPressed && state.target && $f6c31cce2adf654f$var$isValidKeyboardEvent(e, state.target)) {
				var _state_metaKeyEvents1;
				$f6c31cce2adf654f$var$shouldPreventDefaultKeyboard($d4ee10de306f2510$export$e58f029f0fbfdb29(e), e.key) && e.preventDefault();
				let target = $d4ee10de306f2510$export$e58f029f0fbfdb29(e), wasPressed = $d4ee10de306f2510$export$4282f70798064fe0(state.target, $d4ee10de306f2510$export$e58f029f0fbfdb29(e));
				triggerPressEnd($f6c31cce2adf654f$var$createEvent(state.target, e), "keyboard", wasPressed), wasPressed && triggerSyntheticClick(e, state.target), removeAllGlobalListeners(), e.key !== "Enter" && $f6c31cce2adf654f$var$isHTMLAnchorLink(state.target) && $d4ee10de306f2510$export$4282f70798064fe0(state.target, target) && !e[$f6c31cce2adf654f$var$LINK_CLICKED] && (e[$f6c31cce2adf654f$var$LINK_CLICKED] = !0, $ea8dcbcb9ea1b556$export$95185d699e05d4d7(state.target, e, !1)), state.isPressed = !1, (_state_metaKeyEvents1 = state.metaKeyEvents) === null || _state_metaKeyEvents1 === void 0 || _state_metaKeyEvents1.delete(e.key);
			} else if (e.key === "Meta" && !((_state_metaKeyEvents = state.metaKeyEvents) === null || _state_metaKeyEvents === void 0) && _state_metaKeyEvents.size) {
				var _state_target;
				let events = state.metaKeyEvents;
				state.metaKeyEvents = void 0;
				for (let event of events.values()) (_state_target = state.target) === null || _state_target === void 0 || _state_target.dispatchEvent(new KeyboardEvent("keyup", event));
			}
		};
		if (typeof PointerEvent < "u") {
			pressProps2.onPointerDown = (e) => {
				if (e.button !== 0 || !$d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent))) return;
				if ($6a7db85432448f7f$export$29bf1b5f2c56cf63(e.nativeEvent)) {
					state.pointerType = "virtual";
					return;
				}
				state.pointerType = e.pointerType;
				let shouldStopPropagation = !0;
				if (!state.isPressed) {
					state.isPressed = !0, state.isOverTarget = !0, state.activePointerId = e.pointerId, state.target = e.currentTarget, allowTextSelectionOnPress || $14c0b72509d70225$export$16a4697467175487(state.target), shouldStopPropagation = triggerPressStart(e, state.pointerType);
					let target = $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent);
					"releasePointerCapture" in target && target.releasePointerCapture(e.pointerId), addGlobalListener($431fbd86ca7dc216$export$b204af158042fbac(e.currentTarget), "pointerup", onPointerUp, !1), addGlobalListener($431fbd86ca7dc216$export$b204af158042fbac(e.currentTarget), "pointercancel", onPointerCancel, !1);
				}
				shouldStopPropagation && e.stopPropagation();
			}, pressProps2.onMouseDown = (e) => {
				if ($d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent)) && e.button === 0) {
					if (preventFocusOnPress) {
						let dispose = $8a9cb279dc87e130$export$cabe61c495ee3649(e.target);
						dispose && state.disposables.push(dispose);
					}
					e.stopPropagation();
				}
			}, pressProps2.onPointerUp = (e) => {
				!$d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent)) || state.pointerType === "virtual" || e.button === 0 && !state.isPressed && triggerPressUp(e, state.pointerType || e.pointerType);
			}, pressProps2.onPointerEnter = (e) => {
				e.pointerId === state.activePointerId && state.target && !state.isOverTarget && state.pointerType != null && (state.isOverTarget = !0, triggerPressStart($f6c31cce2adf654f$var$createEvent(state.target, e), state.pointerType));
			}, pressProps2.onPointerLeave = (e) => {
				e.pointerId === state.activePointerId && state.target && state.isOverTarget && state.pointerType != null && (state.isOverTarget = !1, triggerPressEnd($f6c31cce2adf654f$var$createEvent(state.target, e), state.pointerType, !1), cancelOnPointerExit(e));
			};
			let onPointerUp = (e) => {
				if (e.pointerId === state.activePointerId && state.isPressed && e.button === 0 && state.target) {
					if ($d4ee10de306f2510$export$4282f70798064fe0(state.target, $d4ee10de306f2510$export$e58f029f0fbfdb29(e)) && state.pointerType != null) {
						let clicked = !1, timeout = setTimeout(() => {
							state.isPressed && state.target instanceof HTMLElement && (clicked ? cancel(e) : ($7215afc6de606d6b$export$de79e2c695e052f3(state.target), state.target.click()));
						}, 80);
						addGlobalListener(e.currentTarget, "click", () => clicked = !0, !0), state.disposables.push(() => clearTimeout(timeout));
					} else cancel(e);
					state.isOverTarget = !1;
				}
			}, onPointerCancel = (e) => {
				cancel(e);
			};
			pressProps2.onDragStart = (e) => {
				$d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent)) && cancel(e);
			};
		}
		return pressProps2;
	}, [
		addGlobalListener,
		isDisabled,
		preventFocusOnPress,
		removeAllGlobalListeners,
		allowTextSelectionOnPress,
		cancel,
		cancelOnPointerExit,
		triggerPressEnd,
		triggerPressStart,
		triggerPressUp,
		triggerClick,
		triggerSyntheticClick
	]);
	return (0, import_react$38.useEffect)(() => {
		if (!domRef || false) return;
		let ownerDocument = $431fbd86ca7dc216$export$b204af158042fbac(domRef.current);
		if (!ownerDocument || !ownerDocument.head || ownerDocument.getElementById($f6c31cce2adf654f$var$STYLE_ID)) return;
		let style = ownerDocument.createElement("style");
		style.id = $f6c31cce2adf654f$var$STYLE_ID, style.textContent = `
@layer {
  [${$f6c31cce2adf654f$var$PRESSABLE_ATTRIBUTE}] {
    touch-action: pan-x pan-y pinch-zoom;
  }
}
    `.trim(), ownerDocument.head.prepend(style);
	}, [domRef]), (0, import_react$38.useEffect)(() => {
		let state = ref.current;
		return () => {
			var _state_target;
			allowTextSelectionOnPress || $14c0b72509d70225$export$b0d6fa1ab32e3295((_state_target = state.target) !== null && _state_target !== void 0 ? _state_target : void 0);
			for (let dispose of state.disposables) dispose();
			state.disposables = [];
		};
	}, [allowTextSelectionOnPress]), {
		isPressed: isPressedProp || isPressed,
		pressProps: $3ef42575df84b30b$export$9d1611c77c2fe928(domProps, pressProps, { [$f6c31cce2adf654f$var$PRESSABLE_ATTRIBUTE]: !0 })
	};
}
function $f6c31cce2adf654f$var$isHTMLAnchorLink(target) {
	return target.tagName === "A" && target.hasAttribute("href");
}
function $f6c31cce2adf654f$var$isValidKeyboardEvent(event, currentTarget) {
	let { key, code } = event, element = currentTarget, role = element.getAttribute("role");
	return (key === "Enter" || key === " " || key === "Spacebar" || code === "Space") && !(element instanceof $431fbd86ca7dc216$export$f21a1ffae260145a(element).HTMLInputElement && !$f6c31cce2adf654f$var$isValidInputKey(element, key) || element instanceof $431fbd86ca7dc216$export$f21a1ffae260145a(element).HTMLTextAreaElement || element.isContentEditable) && !((role === "link" || !role && $f6c31cce2adf654f$var$isHTMLAnchorLink(element)) && key !== "Enter");
}
function $f6c31cce2adf654f$var$createEvent(target, e) {
	let clientX = e.clientX, clientY = e.clientY;
	return {
		currentTarget: target,
		shiftKey: e.shiftKey,
		ctrlKey: e.ctrlKey,
		metaKey: e.metaKey,
		altKey: e.altKey,
		clientX,
		clientY
	};
}
function $f6c31cce2adf654f$var$shouldPreventDefaultUp(target) {
	return target instanceof HTMLInputElement ? !1 : target instanceof HTMLButtonElement ? target.type !== "submit" && target.type !== "reset" : !$f6c31cce2adf654f$var$isHTMLAnchorLink(target);
}
function $f6c31cce2adf654f$var$shouldPreventDefaultKeyboard(target, key) {
	return target instanceof HTMLInputElement ? !$f6c31cce2adf654f$var$isValidInputKey(target, key) : $f6c31cce2adf654f$var$shouldPreventDefaultUp(target);
}
function $f6c31cce2adf654f$var$isValidInputKey(target, key) {
	return target.type === "checkbox" || target.type === "radio" ? key === " " : $f6c31cce2adf654f$var$nonTextInputTypes.has(target.type);
}
function $507fabe10e71c6fb$var$triggerChangeHandlers(modality, e) {
	for (let handler of $507fabe10e71c6fb$var$changeHandlers) handler(modality, e);
}
function $507fabe10e71c6fb$var$isValidKey(e) {
	return !(e.metaKey || !$c87311424ea30a05$export$9ac100e40613ea10() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function $507fabe10e71c6fb$var$handleKeyboardEvent(e) {
	$507fabe10e71c6fb$var$hasEventBeforeFocus = !0, $507fabe10e71c6fb$var$isValidKey(e) && ($507fabe10e71c6fb$var$currentModality = "keyboard", $507fabe10e71c6fb$var$triggerChangeHandlers("keyboard", e));
}
function $507fabe10e71c6fb$var$handlePointerEvent(e) {
	$507fabe10e71c6fb$var$currentModality = "pointer", (e.type === "mousedown" || e.type === "pointerdown") && ($507fabe10e71c6fb$var$hasEventBeforeFocus = !0, $507fabe10e71c6fb$var$triggerChangeHandlers("pointer", e));
}
function $507fabe10e71c6fb$var$handleClickEvent(e) {
	$6a7db85432448f7f$export$60278871457622de(e) && ($507fabe10e71c6fb$var$hasEventBeforeFocus = !0, $507fabe10e71c6fb$var$currentModality = "virtual");
}
function $507fabe10e71c6fb$var$handleFocusEvent(e) {
	e.target === window || e.target === document || $8a9cb279dc87e130$export$fda7da73ab5d4c48 || !e.isTrusted || (!$507fabe10e71c6fb$var$hasEventBeforeFocus && !$507fabe10e71c6fb$var$hasBlurredWindowRecently && ($507fabe10e71c6fb$var$currentModality = "virtual", $507fabe10e71c6fb$var$triggerChangeHandlers("virtual", e)), $507fabe10e71c6fb$var$hasEventBeforeFocus = !1, $507fabe10e71c6fb$var$hasBlurredWindowRecently = !1);
}
function $507fabe10e71c6fb$var$handleWindowBlur() {
	$8a9cb279dc87e130$export$fda7da73ab5d4c48 || ($507fabe10e71c6fb$var$hasEventBeforeFocus = !1, $507fabe10e71c6fb$var$hasBlurredWindowRecently = !0);
}
function $507fabe10e71c6fb$var$setupGlobalFocusEvents(element) {
	if (typeof window > "u" || typeof document > "u" || $507fabe10e71c6fb$export$d90243b58daecda7.get($431fbd86ca7dc216$export$f21a1ffae260145a(element))) return;
	let windowObject = $431fbd86ca7dc216$export$f21a1ffae260145a(element), documentObject = $431fbd86ca7dc216$export$b204af158042fbac(element), focus = windowObject.HTMLElement.prototype.focus;
	windowObject.HTMLElement.prototype.focus = function() {
		$507fabe10e71c6fb$var$hasEventBeforeFocus = !0, focus.apply(this, arguments);
	}, documentObject.addEventListener("keydown", $507fabe10e71c6fb$var$handleKeyboardEvent, !0), documentObject.addEventListener("keyup", $507fabe10e71c6fb$var$handleKeyboardEvent, !0), documentObject.addEventListener("click", $507fabe10e71c6fb$var$handleClickEvent, !0), windowObject.addEventListener("focus", $507fabe10e71c6fb$var$handleFocusEvent, !0), windowObject.addEventListener("blur", $507fabe10e71c6fb$var$handleWindowBlur, !1), typeof PointerEvent < "u" && (documentObject.addEventListener("pointerdown", $507fabe10e71c6fb$var$handlePointerEvent, !0), documentObject.addEventListener("pointermove", $507fabe10e71c6fb$var$handlePointerEvent, !0), documentObject.addEventListener("pointerup", $507fabe10e71c6fb$var$handlePointerEvent, !0)), windowObject.addEventListener("beforeunload", () => {
		$507fabe10e71c6fb$var$tearDownWindowFocusTracking(element);
	}, { once: !0 }), $507fabe10e71c6fb$export$d90243b58daecda7.set(windowObject, { focus });
}
function $507fabe10e71c6fb$export$2f1888112f558a7d(element) {
	let documentObject = $431fbd86ca7dc216$export$b204af158042fbac(element), loadListener;
	return documentObject.readyState !== "loading" ? $507fabe10e71c6fb$var$setupGlobalFocusEvents(element) : (loadListener = () => {
		$507fabe10e71c6fb$var$setupGlobalFocusEvents(element);
	}, documentObject.addEventListener("DOMContentLoaded", loadListener)), () => $507fabe10e71c6fb$var$tearDownWindowFocusTracking(element, loadListener);
}
function $507fabe10e71c6fb$export$b9b3dfddab17db27() {
	return $507fabe10e71c6fb$var$currentModality !== "pointer";
}
function $507fabe10e71c6fb$export$630ff653c5ada6a9() {
	return $507fabe10e71c6fb$var$currentModality;
}
function $507fabe10e71c6fb$export$98e20ec92f614cfe() {
	$507fabe10e71c6fb$var$setupGlobalFocusEvents();
	let [modality, setModality] = (0, import_react$39.useState)($507fabe10e71c6fb$var$currentModality);
	return (0, import_react$39.useEffect)(() => {
		let handler = () => {
			setModality($507fabe10e71c6fb$var$currentModality);
		};
		return $507fabe10e71c6fb$var$changeHandlers.add(handler), () => {
			$507fabe10e71c6fb$var$changeHandlers.delete(handler);
		};
	}, []), $b5e257d569688ac6$export$535bd6ca7f90a273() ? null : modality;
}
function $507fabe10e71c6fb$var$isKeyboardFocusEvent(isTextInput, modality, e) {
	let document1 = $431fbd86ca7dc216$export$b204af158042fbac(e?.target), IHTMLInputElement = typeof window < "u" ? $431fbd86ca7dc216$export$f21a1ffae260145a(e?.target).HTMLInputElement : HTMLInputElement, IHTMLTextAreaElement = typeof window < "u" ? $431fbd86ca7dc216$export$f21a1ffae260145a(e?.target).HTMLTextAreaElement : HTMLTextAreaElement, IHTMLElement = typeof window < "u" ? $431fbd86ca7dc216$export$f21a1ffae260145a(e?.target).HTMLElement : HTMLElement, IKeyboardEvent = typeof window < "u" ? $431fbd86ca7dc216$export$f21a1ffae260145a(e?.target).KeyboardEvent : KeyboardEvent;
	return isTextInput = isTextInput || document1.activeElement instanceof IHTMLInputElement && !$507fabe10e71c6fb$var$nonTextInputTypes.has(document1.activeElement.type) || document1.activeElement instanceof IHTMLTextAreaElement || document1.activeElement instanceof IHTMLElement && document1.activeElement.isContentEditable, !(isTextInput && modality === "keyboard" && e instanceof IKeyboardEvent && !$507fabe10e71c6fb$var$FOCUS_VISIBLE_INPUT_KEYS[e.key]);
}
function $507fabe10e71c6fb$export$ec71b4b83ac08ec3(fn, deps, opts) {
	$507fabe10e71c6fb$var$setupGlobalFocusEvents(), (0, import_react$39.useEffect)(() => {
		let handler = (modality, e) => {
			$507fabe10e71c6fb$var$isKeyboardFocusEvent(!!opts?.isTextInput, modality, e) && fn($507fabe10e71c6fb$export$b9b3dfddab17db27());
		};
		return $507fabe10e71c6fb$var$changeHandlers.add(handler), () => {
			$507fabe10e71c6fb$var$changeHandlers.delete(handler);
		};
	}, deps);
}
function $3ad3f6e1647bc98d$export$80f3e147d781571c(element) {
	let ownerDocument = $431fbd86ca7dc216$export$b204af158042fbac(element), activeElement = $d4ee10de306f2510$export$cd4e5573fbe2b576(ownerDocument);
	if ($507fabe10e71c6fb$export$630ff653c5ada6a9() === "virtual") {
		let lastFocusedElement = activeElement;
		$bbed8b41f857bcc0$export$24490316f764c430(() => {
			$d4ee10de306f2510$export$cd4e5573fbe2b576(ownerDocument) === lastFocusedElement && element.isConnected && $7215afc6de606d6b$export$de79e2c695e052f3(element);
		});
	} else $7215afc6de606d6b$export$de79e2c695e052f3(element);
}
function $a1ea59d68270f0dd$export$f8168d8dd8fd66e6(props) {
	let { isDisabled, onFocus: onFocusProp, onBlur: onBlurProp, onFocusChange } = props, onBlur = (0, import_react$40.useCallback)((e) => {
		if (e.target === e.currentTarget) return onBlurProp && onBlurProp(e), onFocusChange && onFocusChange(!1), !0;
	}, [onBlurProp, onFocusChange]), onSyntheticFocus = $8a9cb279dc87e130$export$715c682d09d639cc(onBlur), onFocus = (0, import_react$40.useCallback)((e) => {
		let ownerDocument = $431fbd86ca7dc216$export$b204af158042fbac(e.target), activeElement = ownerDocument ? $d4ee10de306f2510$export$cd4e5573fbe2b576(ownerDocument) : $d4ee10de306f2510$export$cd4e5573fbe2b576();
		e.target === e.currentTarget && activeElement === $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent) && (onFocusProp && onFocusProp(e), onFocusChange && onFocusChange(!0), onSyntheticFocus(e));
	}, [
		onFocusChange,
		onFocusProp,
		onSyntheticFocus
	]);
	return { focusProps: {
		onFocus: !isDisabled && (onFocusProp || onFocusChange || onBlurProp) ? onFocus : void 0,
		onBlur: !isDisabled && (onBlurProp || onFocusChange) ? onBlur : void 0
	} };
}
function $93925083ecbb358c$export$48d1ea6320830260(handler) {
	if (!handler) return;
	let shouldStopPropagation = !0;
	return (e) => {
		handler({
			...e,
			preventDefault() {
				e.preventDefault();
			},
			isDefaultPrevented() {
				return e.isDefaultPrevented();
			},
			stopPropagation() {
				shouldStopPropagation = !0;
			},
			continuePropagation() {
				shouldStopPropagation = !1;
			},
			isPropagationStopped() {
				return shouldStopPropagation;
			}
		}), shouldStopPropagation && e.stopPropagation();
	};
}
function $46d819fcbaf35654$export$8f71654801c2f7cd(props) {
	return { keyboardProps: props.isDisabled ? {} : {
		onKeyDown: $93925083ecbb358c$export$48d1ea6320830260(props.onKeyDown),
		onKeyUp: $93925083ecbb358c$export$48d1ea6320830260(props.onKeyUp)
	} };
}
function $f645667febf57a63$var$useFocusableContext(ref) {
	let context = (0, import_react$41.useContext)($f645667febf57a63$export$f9762fab77588ecb) || {};
	$e7801be82b4b2a53$export$4debdb1a3f0fa79e(context, ref);
	let { ref: _, ...otherProps } = context;
	return otherProps;
}
function $f645667febf57a63$export$4c014de7c8940b4c(props, domRef) {
	let { focusProps } = $a1ea59d68270f0dd$export$f8168d8dd8fd66e6(props), { keyboardProps } = $46d819fcbaf35654$export$8f71654801c2f7cd(props), interactions = $3ef42575df84b30b$export$9d1611c77c2fe928(focusProps, keyboardProps), domProps = $f645667febf57a63$var$useFocusableContext(domRef), interactionProps = props.isDisabled ? {} : domProps, autoFocusRef = (0, import_react$41.useRef)(props.autoFocus);
	(0, import_react$41.useEffect)(() => {
		autoFocusRef.current && domRef.current && $3ad3f6e1647bc98d$export$80f3e147d781571c(domRef.current), autoFocusRef.current = !1;
	}, [domRef]);
	let tabIndex = props.excludeFromTabOrder ? -1 : 0;
	return props.isDisabled && (tabIndex = void 0), { focusableProps: $3ef42575df84b30b$export$9d1611c77c2fe928({
		...interactions,
		tabIndex
	}, interactionProps) };
}
function $f1ab8c75478c6f73$export$cf75428e0b9ed1ea({ children }) {
	let context = (0, import_react$43.useMemo)(() => ({ register: () => {} }), []);
	return import_react$43.createElement($ae1eeba8b9eafd08$export$5165eccb35aaadb5.Provider, { value: context }, children);
}
function $9ab94262bd0047c7$export$420e68273165f4ec(props) {
	let { isDisabled, onBlurWithin, onFocusWithin, onFocusWithinChange } = props, state = (0, import_react$44.useRef)({ isFocusWithin: !1 }), { addGlobalListener, removeAllGlobalListeners } = $03deb23ff14920c4$export$4eaf04e54aa8eed6(), onBlur = (0, import_react$44.useCallback)((e) => {
		e.currentTarget.contains(e.target) && state.current.isFocusWithin && !e.currentTarget.contains(e.relatedTarget) && (state.current.isFocusWithin = !1, removeAllGlobalListeners(), onBlurWithin && onBlurWithin(e), onFocusWithinChange && onFocusWithinChange(!1));
	}, [
		onBlurWithin,
		onFocusWithinChange,
		state,
		removeAllGlobalListeners
	]), onSyntheticFocus = $8a9cb279dc87e130$export$715c682d09d639cc(onBlur), onFocus = (0, import_react$44.useCallback)((e) => {
		if (!e.currentTarget.contains(e.target)) return;
		let ownerDocument = $431fbd86ca7dc216$export$b204af158042fbac(e.target), activeElement = $d4ee10de306f2510$export$cd4e5573fbe2b576(ownerDocument);
		if (!state.current.isFocusWithin && activeElement === $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent)) {
			onFocusWithin && onFocusWithin(e), onFocusWithinChange && onFocusWithinChange(!0), state.current.isFocusWithin = !0, onSyntheticFocus(e);
			let currentTarget = e.currentTarget;
			addGlobalListener(ownerDocument, "focus", (e2) => {
				if (state.current.isFocusWithin && !$d4ee10de306f2510$export$4282f70798064fe0(currentTarget, e2.target)) {
					let nativeEvent = new ownerDocument.defaultView.FocusEvent("blur", { relatedTarget: e2.target });
					$8a9cb279dc87e130$export$c2b7abe5d61ec696(nativeEvent, currentTarget);
					let event = $8a9cb279dc87e130$export$525bc4921d56d4a(nativeEvent);
					onBlur(event);
				}
			}, { capture: !0 });
		}
	}, [
		onFocusWithin,
		onFocusWithinChange,
		onSyntheticFocus,
		addGlobalListener,
		onBlur
	]);
	return isDisabled ? { focusWithinProps: {
		onFocus: void 0,
		onBlur: void 0
	} } : { focusWithinProps: {
		onFocus,
		onBlur
	} };
}
function $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents() {
	$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = !0, setTimeout(() => {
		$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = !1;
	}, 50);
}
function $6179b936705e76d3$var$handleGlobalPointerEvent(e) {
	e.pointerType === "touch" && $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents();
}
function $6179b936705e76d3$var$setupGlobalTouchEvents() {
	if (!(typeof document > "u")) return $6179b936705e76d3$var$hoverCount === 0 && typeof PointerEvent < "u" && document.addEventListener("pointerup", $6179b936705e76d3$var$handleGlobalPointerEvent), $6179b936705e76d3$var$hoverCount++, () => {
		$6179b936705e76d3$var$hoverCount--, !($6179b936705e76d3$var$hoverCount > 0) && typeof PointerEvent < "u" && document.removeEventListener("pointerup", $6179b936705e76d3$var$handleGlobalPointerEvent);
	};
}
function $6179b936705e76d3$export$ae780daf29e6d456(props) {
	let { onHoverStart, onHoverChange, onHoverEnd, isDisabled } = props, [isHovered, setHovered] = (0, import_react$45.useState)(!1), state = (0, import_react$45.useRef)({
		isHovered: !1,
		ignoreEmulatedMouseEvents: !1,
		pointerType: "",
		target: null
	}).current;
	(0, import_react$45.useEffect)($6179b936705e76d3$var$setupGlobalTouchEvents, []);
	let { addGlobalListener, removeAllGlobalListeners } = $03deb23ff14920c4$export$4eaf04e54aa8eed6(), { hoverProps, triggerHoverEnd } = (0, import_react$45.useMemo)(() => {
		let triggerHoverStart = (event, pointerType) => {
			if (state.pointerType = pointerType, isDisabled || pointerType === "touch" || state.isHovered || !event.currentTarget.contains(event.target)) return;
			state.isHovered = !0;
			let target = event.currentTarget;
			state.target = target, addGlobalListener($431fbd86ca7dc216$export$b204af158042fbac(event.target), "pointerover", (e) => {
				state.isHovered && state.target && !$d4ee10de306f2510$export$4282f70798064fe0(state.target, e.target) && triggerHoverEnd2(e, e.pointerType);
			}, { capture: !0 }), onHoverStart && onHoverStart({
				type: "hoverstart",
				target,
				pointerType
			}), onHoverChange && onHoverChange(!0), setHovered(!0);
		}, triggerHoverEnd2 = (event, pointerType) => {
			let target = state.target;
			state.pointerType = "", state.target = null, pointerType !== "touch" && state.isHovered && target && (state.isHovered = !1, removeAllGlobalListeners(), onHoverEnd && onHoverEnd({
				type: "hoverend",
				target,
				pointerType
			}), onHoverChange && onHoverChange(!1), setHovered(!1));
		}, hoverProps2 = {};
		return typeof PointerEvent < "u" && (hoverProps2.onPointerEnter = (e) => {
			$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents && e.pointerType === "mouse" || triggerHoverStart(e, e.pointerType);
		}, hoverProps2.onPointerLeave = (e) => {
			!isDisabled && e.currentTarget.contains(e.target) && triggerHoverEnd2(e, e.pointerType);
		}), {
			hoverProps: hoverProps2,
			triggerHoverEnd: triggerHoverEnd2
		};
	}, [
		onHoverStart,
		onHoverChange,
		onHoverEnd,
		isDisabled,
		state,
		addGlobalListener,
		removeAllGlobalListeners
	]);
	return (0, import_react$45.useEffect)(() => {
		isDisabled && triggerHoverEnd({ currentTarget: state.target }, state.pointerType);
	}, [isDisabled]), {
		hoverProps,
		isHovered
	};
}
function $e0b6e0b68ec7f50f$export$872b660ac5a1ff98(props) {
	let { ref, onInteractOutside, isDisabled, onInteractOutsideStart } = props, stateRef = (0, import_react$46.useRef)({
		isPointerDown: !1,
		ignoreEmulatedMouseEvents: !1
	}), onPointerDown = $8ae05eaa5c114e9c$export$7f54fc3180508a52((e) => {
		onInteractOutside && $e0b6e0b68ec7f50f$var$isValidEvent(e, ref) && (onInteractOutsideStart && onInteractOutsideStart(e), stateRef.current.isPointerDown = !0);
	}), triggerInteractOutside = $8ae05eaa5c114e9c$export$7f54fc3180508a52((e) => {
		onInteractOutside && onInteractOutside(e);
	});
	(0, import_react$46.useEffect)(() => {
		let state = stateRef.current;
		if (isDisabled) return;
		let element = ref.current, documentObject = $431fbd86ca7dc216$export$b204af158042fbac(element);
		if (typeof PointerEvent < "u") {
			let onClick = (e) => {
				state.isPointerDown && $e0b6e0b68ec7f50f$var$isValidEvent(e, ref) && triggerInteractOutside(e), state.isPointerDown = !1;
			};
			return documentObject.addEventListener("pointerdown", onPointerDown, !0), documentObject.addEventListener("click", onClick, !0), () => {
				documentObject.removeEventListener("pointerdown", onPointerDown, !0), documentObject.removeEventListener("click", onClick, !0);
			};
		}
	}, [
		ref,
		isDisabled,
		onPointerDown,
		triggerInteractOutside
	]);
}
function $e0b6e0b68ec7f50f$var$isValidEvent(event, ref) {
	if (event.button > 0) return !1;
	if (event.target) {
		let ownerDocument = event.target.ownerDocument;
		if (!ownerDocument || !ownerDocument.documentElement.contains(event.target) || event.target.closest("[data-react-aria-top-layer]")) return !1;
	}
	return ref.current ? !event.composedPath().includes(ref.current) : !1;
}
function $8a26561d2877236e$export$c24ed0104d07eab9(props) {
	let { isDisabled, onLongPressStart, onLongPressEnd, onLongPress, threshold = $8a26561d2877236e$var$DEFAULT_THRESHOLD, accessibilityDescription } = props, timeRef = (0, import_react$49.useRef)(void 0), { addGlobalListener, removeGlobalListener } = $03deb23ff14920c4$export$4eaf04e54aa8eed6(), { pressProps } = $f6c31cce2adf654f$export$45712eceda6fad21({
		isDisabled,
		onPressStart(e) {
			if (e.continuePropagation(), (e.pointerType === "mouse" || e.pointerType === "touch") && (onLongPressStart && onLongPressStart({
				...e,
				type: "longpressstart"
			}), timeRef.current = setTimeout(() => {
				e.target.dispatchEvent(new PointerEvent("pointercancel", { bubbles: !0 })), $431fbd86ca7dc216$export$b204af158042fbac(e.target).activeElement !== e.target && $7215afc6de606d6b$export$de79e2c695e052f3(e.target), onLongPress && onLongPress({
					...e,
					type: "longpress"
				}), timeRef.current = void 0;
			}, threshold), e.pointerType === "touch")) {
				let onContextMenu = (e2) => {
					e2.preventDefault();
				};
				addGlobalListener(e.target, "contextmenu", onContextMenu, { once: !0 }), addGlobalListener(window, "pointerup", () => {
					setTimeout(() => {
						removeGlobalListener(e.target, "contextmenu", onContextMenu);
					}, 30);
				}, { once: !0 });
			}
		},
		onPressEnd(e) {
			timeRef.current && clearTimeout(timeRef.current), onLongPressEnd && (e.pointerType === "mouse" || e.pointerType === "touch") && onLongPressEnd({
				...e,
				type: "longpressend"
			});
		}
	});
	return { longPressProps: $3ef42575df84b30b$export$9d1611c77c2fe928(pressProps, $ef06256079686ba0$export$f8aeda7b10753fa1(onLongPress && !isDisabled ? accessibilityDescription : void 0)) };
}
function $64fa3d84918910a7$export$2881499e37b75b9a({ values, children }) {
	for (let [Context, value] of values) children = import_react$50.createElement(Context.Provider, { value }, children);
	return children;
}
function $64fa3d84918910a7$export$4d86445c2cf5e3(props) {
	let { className, style, children, defaultClassName, defaultChildren, defaultStyle, values } = props;
	return (0, import_react$50.useMemo)(() => {
		let computedClassName, computedStyle, computedChildren;
		return typeof className == "function" ? computedClassName = className({
			...values,
			defaultClassName
		}) : computedClassName = className, typeof style == "function" ? computedStyle = style({
			...values,
			defaultStyle: defaultStyle || {}
		}) : computedStyle = style, typeof children == "function" ? computedChildren = children({
			...values,
			defaultChildren
		}) : children == null ? computedChildren = defaultChildren : computedChildren = children, {
			className: computedClassName ?? defaultClassName,
			style: computedStyle || defaultStyle ? {
				...defaultStyle,
				...computedStyle
			} : void 0,
			children: computedChildren ?? defaultChildren,
			"data-rac": ""
		};
	}, [
		className,
		style,
		children,
		defaultClassName,
		defaultChildren,
		defaultStyle,
		values
	]);
}
function $64fa3d84918910a7$export$fabf2dc03a41866e(context, slot) {
	let ctx = (0, import_react$50.useContext)(context);
	if (slot === null) return null;
	if (ctx && typeof ctx == "object" && "slots" in ctx && ctx.slots) {
		let slotKey = slot || $64fa3d84918910a7$export$c62b8e45d58ddad9;
		if (!ctx.slots[slotKey]) {
			let availableSlots = new Intl.ListFormat().format(Object.keys(ctx.slots).map((p) => `"${p}"`)), errorMessage = slot ? `Invalid slot "${slot}".` : "A slot prop is required.";
			throw new Error(`${errorMessage} Valid slot names are ${availableSlots}.`);
		}
		return ctx.slots[slotKey];
	}
	return ctx;
}
function $64fa3d84918910a7$export$29f1550f4b0d4415(props, ref, context) {
	let { ref: contextRef, ...contextProps } = $64fa3d84918910a7$export$fabf2dc03a41866e(context, props.slot) || {}, mergedRef = $df56164dff5785e2$export$4338b53315abf666((0, import_react$50.useMemo)(() => $5dc95899b306f630$export$c9058316764c140e(ref, contextRef), [ref, contextRef])), mergedProps = $3ef42575df84b30b$export$9d1611c77c2fe928(contextProps, props);
	return "style" in contextProps && contextProps.style && "style" in props && props.style && (typeof contextProps.style == "function" || typeof props.style == "function" ? mergedProps.style = (renderProps) => {
		let contextStyle = typeof contextProps.style == "function" ? contextProps.style(renderProps) : contextProps.style, defaultStyle = {
			...renderProps.defaultStyle,
			...contextStyle
		}, style = typeof props.style == "function" ? props.style({
			...renderProps,
			defaultStyle
		}) : props.style;
		return {
			...defaultStyle,
			...style
		};
	} : mergedProps.style = {
		...contextProps.style,
		...props.style
	}), [mergedProps, mergedRef];
}
function $64fa3d84918910a7$export$9d4c57ee4c6ffdd8(initialState = !0) {
	let [hasSlot, setHasSlot] = (0, import_react$50.useState)(initialState), hasRun = (0, import_react$50.useRef)(!1), ref = (0, import_react$50.useCallback)((el) => {
		hasRun.current = !0, setHasSlot(!!el);
	}, []);
	return $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		hasRun.current || setHasSlot(!1);
	}, []), [ref, hasSlot];
}
function $326e436e94273fe1$export$1c4b08e0eca38426(props, state) {
	let domProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { labelable: !0 }), { hoverProps } = $6179b936705e76d3$export$ae780daf29e6d456({
		onHoverStart: () => state?.open(!0),
		onHoverEnd: () => state?.close()
	});
	return { tooltipProps: $3ef42575df84b30b$export$9d1611c77c2fe928(domProps, hoverProps, { role: "tooltip" }) };
}
function $4e1b34546679e357$export$a6da6c504e4bba8b(props, state, ref) {
	let { isDisabled, trigger } = props, tooltipId = $bdb11010cef70236$export$f680877a34711e37(), isHovered = (0, import_react$52.useRef)(!1), isFocused = (0, import_react$52.useRef)(!1), handleShow = () => {
		(isHovered.current || isFocused.current) && state.open(isFocused.current);
	}, handleHide = (immediate) => {
		!isHovered.current && !isFocused.current && state.close(immediate);
	};
	(0, import_react$52.useEffect)(() => {
		let onKeyDown = (e) => {
			ref && ref.current && e.key === "Escape" && (e.stopPropagation(), state.close(!0));
		};
		if (state.isOpen) return document.addEventListener("keydown", onKeyDown, !0), () => {
			document.removeEventListener("keydown", onKeyDown, !0);
		};
	}, [ref, state]);
	let onHoverStart = () => {
		trigger !== "focus" && ($507fabe10e71c6fb$export$630ff653c5ada6a9() === "pointer" ? isHovered.current = !0 : isHovered.current = !1, handleShow());
	}, onHoverEnd = () => {
		trigger !== "focus" && (isFocused.current = !1, isHovered.current = !1, handleHide());
	}, onPressStart = () => {
		isFocused.current = !1, isHovered.current = !1, handleHide(!0);
	}, onFocus = () => {
		$507fabe10e71c6fb$export$b9b3dfddab17db27() && (isFocused.current = !0, handleShow());
	}, onBlur = () => {
		isFocused.current = !1, isHovered.current = !1, handleHide(!0);
	}, { hoverProps } = $6179b936705e76d3$export$ae780daf29e6d456({
		isDisabled,
		onHoverStart,
		onHoverEnd
	}), { focusableProps } = $f645667febf57a63$export$4c014de7c8940b4c({
		isDisabled,
		onFocus,
		onBlur
	}, ref);
	return {
		triggerProps: {
			"aria-describedby": state.isOpen ? tooltipId : void 0,
			...$3ef42575df84b30b$export$9d1611c77c2fe928(focusableProps, hoverProps, {
				onPointerDown: onPressStart,
				onKeyDown: onPressStart
			}),
			tabIndex: void 0
		},
		tooltipProps: { id: tooltipId }
	};
}
function $edcf132a9284368a$var$getContainerDimensions(containerNode) {
	let width = 0, height = 0, totalWidth = 0, totalHeight = 0, top = 0, left = 0, scroll = {};
	var _visualViewport_scale;
	let isPinchZoomedIn = ((_visualViewport_scale = $edcf132a9284368a$var$visualViewport?.scale) !== null && _visualViewport_scale !== void 0 ? _visualViewport_scale : 1) > 1;
	if (containerNode.tagName === "BODY") {
		let documentElement = document.documentElement;
		totalWidth = documentElement.clientWidth, totalHeight = documentElement.clientHeight;
		var _visualViewport_width;
		width = (_visualViewport_width = $edcf132a9284368a$var$visualViewport?.width) !== null && _visualViewport_width !== void 0 ? _visualViewport_width : totalWidth;
		var _visualViewport_height;
		height = (_visualViewport_height = $edcf132a9284368a$var$visualViewport?.height) !== null && _visualViewport_height !== void 0 ? _visualViewport_height : totalHeight, scroll.top = documentElement.scrollTop || containerNode.scrollTop, scroll.left = documentElement.scrollLeft || containerNode.scrollLeft, $edcf132a9284368a$var$visualViewport && (top = $edcf132a9284368a$var$visualViewport.offsetTop, left = $edcf132a9284368a$var$visualViewport.offsetLeft);
	} else ({width, height, top, left} = $edcf132a9284368a$var$getOffset(containerNode, !1)), scroll.top = containerNode.scrollTop, scroll.left = containerNode.scrollLeft, totalWidth = width, totalHeight = height;
	if ($c87311424ea30a05$export$78551043582a6a98() && (containerNode.tagName === "BODY" || containerNode.tagName === "HTML") && isPinchZoomedIn) {
		scroll.top = 0, scroll.left = 0;
		var _visualViewport_pageTop;
		top = (_visualViewport_pageTop = $edcf132a9284368a$var$visualViewport?.pageTop) !== null && _visualViewport_pageTop !== void 0 ? _visualViewport_pageTop : 0;
		var _visualViewport_pageLeft;
		left = (_visualViewport_pageLeft = $edcf132a9284368a$var$visualViewport?.pageLeft) !== null && _visualViewport_pageLeft !== void 0 ? _visualViewport_pageLeft : 0;
	}
	return {
		width,
		height,
		totalWidth,
		totalHeight,
		scroll,
		top,
		left
	};
}
function $edcf132a9284368a$var$getScroll(node) {
	return {
		top: node.scrollTop,
		left: node.scrollLeft,
		width: node.scrollWidth,
		height: node.scrollHeight
	};
}
function $edcf132a9284368a$var$getDelta(axis, offset, size, boundaryDimensions, containerDimensions, padding, containerOffsetWithBoundary) {
	var _containerDimensions_scroll_axis;
	let containerScroll = (_containerDimensions_scroll_axis = containerDimensions.scroll[axis]) !== null && _containerDimensions_scroll_axis !== void 0 ? _containerDimensions_scroll_axis : 0, boundarySize = boundaryDimensions[$edcf132a9284368a$var$AXIS_SIZE[axis]], boundaryStartEdge = boundaryDimensions.scroll[$edcf132a9284368a$var$AXIS[axis]] + padding, boundaryEndEdge = boundarySize + boundaryDimensions.scroll[$edcf132a9284368a$var$AXIS[axis]] - padding, startEdgeOffset = offset - containerScroll + containerOffsetWithBoundary[axis] - boundaryDimensions[$edcf132a9284368a$var$AXIS[axis]], endEdgeOffset = offset - containerScroll + size + containerOffsetWithBoundary[axis] - boundaryDimensions[$edcf132a9284368a$var$AXIS[axis]];
	return startEdgeOffset < boundaryStartEdge ? boundaryStartEdge - startEdgeOffset : endEdgeOffset > boundaryEndEdge ? Math.max(boundaryEndEdge - endEdgeOffset, boundaryStartEdge - startEdgeOffset) : 0;
}
function $edcf132a9284368a$var$getMargins(node) {
	let style = window.getComputedStyle(node);
	return {
		top: parseInt(style.marginTop, 10) || 0,
		bottom: parseInt(style.marginBottom, 10) || 0,
		left: parseInt(style.marginLeft, 10) || 0,
		right: parseInt(style.marginRight, 10) || 0
	};
}
function $edcf132a9284368a$var$parsePlacement(input) {
	if ($edcf132a9284368a$var$PARSED_PLACEMENT_CACHE[input]) return $edcf132a9284368a$var$PARSED_PLACEMENT_CACHE[input];
	let [placement, crossPlacement] = input.split(" "), axis = $edcf132a9284368a$var$AXIS[placement] || "right", crossAxis = $edcf132a9284368a$var$CROSS_AXIS[axis];
	$edcf132a9284368a$var$AXIS[crossPlacement] || (crossPlacement = "center");
	let size = $edcf132a9284368a$var$AXIS_SIZE[axis], crossSize = $edcf132a9284368a$var$AXIS_SIZE[crossAxis];
	return $edcf132a9284368a$var$PARSED_PLACEMENT_CACHE[input] = {
		placement,
		crossPlacement,
		axis,
		crossAxis,
		size,
		crossSize
	}, $edcf132a9284368a$var$PARSED_PLACEMENT_CACHE[input];
}
function $edcf132a9284368a$var$computePosition(childOffset, boundaryDimensions, overlaySize, placementInfo, offset, crossOffset, containerOffsetWithBoundary, isContainerPositioned, arrowSize, arrowBoundaryOffset) {
	let { placement, crossPlacement, axis, crossAxis, size, crossSize } = placementInfo, position = {};
	var _childOffset_crossAxis;
	position[crossAxis] = (_childOffset_crossAxis = childOffset[crossAxis]) !== null && _childOffset_crossAxis !== void 0 ? _childOffset_crossAxis : 0;
	var _childOffset_crossSize, _overlaySize_crossSize, _childOffset_crossSize1, _overlaySize_crossSize1;
	crossPlacement === "center" ? position[crossAxis] += (((_childOffset_crossSize = childOffset[crossSize]) !== null && _childOffset_crossSize !== void 0 ? _childOffset_crossSize : 0) - ((_overlaySize_crossSize = overlaySize[crossSize]) !== null && _overlaySize_crossSize !== void 0 ? _overlaySize_crossSize : 0)) / 2 : crossPlacement !== crossAxis && (position[crossAxis] += ((_childOffset_crossSize1 = childOffset[crossSize]) !== null && _childOffset_crossSize1 !== void 0 ? _childOffset_crossSize1 : 0) - ((_overlaySize_crossSize1 = overlaySize[crossSize]) !== null && _overlaySize_crossSize1 !== void 0 ? _overlaySize_crossSize1 : 0)), position[crossAxis] += crossOffset;
	let minPosition = childOffset[crossAxis] - overlaySize[crossSize] + arrowSize + arrowBoundaryOffset, maxPosition = childOffset[crossAxis] + childOffset[crossSize] - arrowSize - arrowBoundaryOffset;
	if (position[crossAxis] = $9446cca9a3875146$export$7d15b64cf5a3a4c4(position[crossAxis], minPosition, maxPosition), placement === axis) {
		let containerHeight = isContainerPositioned ? containerOffsetWithBoundary[size] : boundaryDimensions[$edcf132a9284368a$var$TOTAL_SIZE[size]];
		position[$edcf132a9284368a$var$FLIPPED_DIRECTION[axis]] = Math.floor(containerHeight - childOffset[axis] + offset);
	} else position[axis] = Math.floor(childOffset[axis] + childOffset[size] + offset);
	return position;
}
function $edcf132a9284368a$var$getMaxHeight(position, boundaryDimensions, containerOffsetWithBoundary, isContainerPositioned, margins, padding, overlayHeight, heightGrowthDirection) {
	let containerHeight = isContainerPositioned ? containerOffsetWithBoundary.height : boundaryDimensions[$edcf132a9284368a$var$TOTAL_SIZE.height];
	var _position_bottom;
	let overlayTop = position.top != null ? containerOffsetWithBoundary.top + position.top : containerOffsetWithBoundary.top + (containerHeight - ((_position_bottom = position.bottom) !== null && _position_bottom !== void 0 ? _position_bottom : 0) - overlayHeight);
	var _boundaryDimensions_scroll_top, _margins_top, _margins_bottom, _boundaryDimensions_scroll_top1, _margins_top1, _margins_bottom1;
	let maxHeight = heightGrowthDirection !== "top" ? Math.max(0, boundaryDimensions.height + boundaryDimensions.top + ((_boundaryDimensions_scroll_top = boundaryDimensions.scroll.top) !== null && _boundaryDimensions_scroll_top !== void 0 ? _boundaryDimensions_scroll_top : 0) - overlayTop - (((_margins_top = margins.top) !== null && _margins_top !== void 0 ? _margins_top : 0) + ((_margins_bottom = margins.bottom) !== null && _margins_bottom !== void 0 ? _margins_bottom : 0) + padding)) : Math.max(0, overlayTop + overlayHeight - (boundaryDimensions.top + ((_boundaryDimensions_scroll_top1 = boundaryDimensions.scroll.top) !== null && _boundaryDimensions_scroll_top1 !== void 0 ? _boundaryDimensions_scroll_top1 : 0)) - (((_margins_top1 = margins.top) !== null && _margins_top1 !== void 0 ? _margins_top1 : 0) + ((_margins_bottom1 = margins.bottom) !== null && _margins_bottom1 !== void 0 ? _margins_bottom1 : 0) + padding));
	return Math.min(boundaryDimensions.height - padding * 2, maxHeight);
}
function $edcf132a9284368a$var$getAvailableSpace(boundaryDimensions, containerOffsetWithBoundary, childOffset, margins, padding, placementInfo) {
	let { placement, axis, size } = placementInfo;
	var _boundaryDimensions_scroll_axis, _margins_axis;
	if (placement === axis) return Math.max(0, childOffset[axis] - boundaryDimensions[axis] - ((_boundaryDimensions_scroll_axis = boundaryDimensions.scroll[axis]) !== null && _boundaryDimensions_scroll_axis !== void 0 ? _boundaryDimensions_scroll_axis : 0) + containerOffsetWithBoundary[axis] - ((_margins_axis = margins[axis]) !== null && _margins_axis !== void 0 ? _margins_axis : 0) - margins[$edcf132a9284368a$var$FLIPPED_DIRECTION[axis]] - padding);
	var _margins_axis1;
	return Math.max(0, boundaryDimensions[size] + boundaryDimensions[axis] + boundaryDimensions.scroll[axis] - containerOffsetWithBoundary[axis] - childOffset[axis] - childOffset[size] - ((_margins_axis1 = margins[axis]) !== null && _margins_axis1 !== void 0 ? _margins_axis1 : 0) - margins[$edcf132a9284368a$var$FLIPPED_DIRECTION[axis]] - padding);
}
function $edcf132a9284368a$export$6839422d1f33cee9(placementInput, childOffset, overlaySize, scrollSize, margins, padding, flip, boundaryDimensions, containerDimensions, containerOffsetWithBoundary, offset, crossOffset, isContainerPositioned, userSetMaxHeight, arrowSize, arrowBoundaryOffset) {
	let placementInfo = $edcf132a9284368a$var$parsePlacement(placementInput), { size, crossAxis, crossSize, placement, crossPlacement } = placementInfo, position = $edcf132a9284368a$var$computePosition(childOffset, boundaryDimensions, overlaySize, placementInfo, offset, crossOffset, containerOffsetWithBoundary, isContainerPositioned, arrowSize, arrowBoundaryOffset), normalizedOffset = offset, space = $edcf132a9284368a$var$getAvailableSpace(boundaryDimensions, containerOffsetWithBoundary, childOffset, margins, padding + offset, placementInfo);
	if (flip && scrollSize[size] > space) {
		let flippedPlacementInfo = $edcf132a9284368a$var$parsePlacement(`${$edcf132a9284368a$var$FLIPPED_DIRECTION[placement]} ${crossPlacement}`), flippedPosition = $edcf132a9284368a$var$computePosition(childOffset, boundaryDimensions, overlaySize, flippedPlacementInfo, offset, crossOffset, containerOffsetWithBoundary, isContainerPositioned, arrowSize, arrowBoundaryOffset);
		$edcf132a9284368a$var$getAvailableSpace(boundaryDimensions, containerOffsetWithBoundary, childOffset, margins, padding + offset, flippedPlacementInfo) > space && (placementInfo = flippedPlacementInfo, position = flippedPosition, normalizedOffset = offset);
	}
	let heightGrowthDirection = "bottom";
	placementInfo.axis === "top" ? placementInfo.placement === "top" ? heightGrowthDirection = "top" : placementInfo.placement === "bottom" && (heightGrowthDirection = "bottom") : placementInfo.crossAxis === "top" && (placementInfo.crossPlacement === "top" ? heightGrowthDirection = "bottom" : placementInfo.crossPlacement === "bottom" && (heightGrowthDirection = "top"));
	let delta = $edcf132a9284368a$var$getDelta(crossAxis, position[crossAxis], overlaySize[crossSize], boundaryDimensions, containerDimensions, padding, containerOffsetWithBoundary);
	position[crossAxis] += delta;
	let maxHeight = $edcf132a9284368a$var$getMaxHeight(position, boundaryDimensions, containerOffsetWithBoundary, isContainerPositioned, margins, padding, overlaySize.height, heightGrowthDirection);
	userSetMaxHeight && userSetMaxHeight < maxHeight && (maxHeight = userSetMaxHeight), overlaySize.height = Math.min(overlaySize.height, maxHeight), position = $edcf132a9284368a$var$computePosition(childOffset, boundaryDimensions, overlaySize, placementInfo, normalizedOffset, crossOffset, containerOffsetWithBoundary, isContainerPositioned, arrowSize, arrowBoundaryOffset), delta = $edcf132a9284368a$var$getDelta(crossAxis, position[crossAxis], overlaySize[crossSize], boundaryDimensions, containerDimensions, padding, containerOffsetWithBoundary), position[crossAxis] += delta;
	let arrowPosition = {}, origin = childOffset[crossAxis] - position[crossAxis] - margins[$edcf132a9284368a$var$AXIS[crossAxis]], preferredArrowPosition = origin + .5 * childOffset[crossSize], arrowMinPosition = arrowSize / 2 + arrowBoundaryOffset;
	var _margins_left, _margins_right, _margins_top, _margins_bottom;
	let overlayMargin = $edcf132a9284368a$var$AXIS[crossAxis] === "left" ? ((_margins_left = margins.left) !== null && _margins_left !== void 0 ? _margins_left : 0) + ((_margins_right = margins.right) !== null && _margins_right !== void 0 ? _margins_right : 0) : ((_margins_top = margins.top) !== null && _margins_top !== void 0 ? _margins_top : 0) + ((_margins_bottom = margins.bottom) !== null && _margins_bottom !== void 0 ? _margins_bottom : 0), arrowMaxPosition = overlaySize[crossSize] - overlayMargin - arrowSize / 2 - arrowBoundaryOffset;
	arrowPosition[crossAxis] = $9446cca9a3875146$export$7d15b64cf5a3a4c4($9446cca9a3875146$export$7d15b64cf5a3a4c4(preferredArrowPosition, childOffset[crossAxis] + arrowSize / 2 - (position[crossAxis] + margins[$edcf132a9284368a$var$AXIS[crossAxis]]), childOffset[crossAxis] + childOffset[crossSize] - arrowSize / 2 - (position[crossAxis] + margins[$edcf132a9284368a$var$AXIS[crossAxis]])), arrowMinPosition, arrowMaxPosition), {placement, crossPlacement} = placementInfo, arrowSize ? origin = arrowPosition[crossAxis] : crossPlacement === "right" ? origin += childOffset[crossSize] : crossPlacement === "center" && (origin += childOffset[crossSize] / 2);
	let crossOrigin = placement === "left" || placement === "top" ? overlaySize[size] : 0, triggerAnchorPoint = {
		x: placement === "top" || placement === "bottom" ? origin : crossOrigin,
		y: placement === "left" || placement === "right" ? origin : crossOrigin
	};
	return {
		position,
		maxHeight,
		arrowOffsetLeft: arrowPosition.left,
		arrowOffsetTop: arrowPosition.top,
		placement,
		triggerAnchorPoint
	};
}
function $edcf132a9284368a$export$b3ceb0cbf1056d98(opts) {
	let { placement, targetNode, overlayNode, scrollNode, padding, shouldFlip, boundaryElement, offset, crossOffset, maxHeight, arrowSize = 0, arrowBoundaryOffset = 0 } = opts, container = overlayNode instanceof HTMLElement ? $edcf132a9284368a$var$getContainingBlock(overlayNode) : document.documentElement, isViewportContainer = container === document.documentElement, containerPositionStyle = window.getComputedStyle(container).position, isContainerPositioned = !!containerPositionStyle && containerPositionStyle !== "static", childOffset = isViewportContainer ? $edcf132a9284368a$var$getOffset(targetNode, !1) : $edcf132a9284368a$var$getPosition(targetNode, container, !1);
	if (!isViewportContainer) {
		let { marginTop, marginLeft } = window.getComputedStyle(targetNode);
		childOffset.top += parseInt(marginTop, 10) || 0, childOffset.left += parseInt(marginLeft, 10) || 0;
	}
	let overlaySize = $edcf132a9284368a$var$getOffset(overlayNode, !0), margins = $edcf132a9284368a$var$getMargins(overlayNode);
	var _margins_left, _margins_right;
	overlaySize.width += ((_margins_left = margins.left) !== null && _margins_left !== void 0 ? _margins_left : 0) + ((_margins_right = margins.right) !== null && _margins_right !== void 0 ? _margins_right : 0);
	var _margins_top, _margins_bottom;
	overlaySize.height += ((_margins_top = margins.top) !== null && _margins_top !== void 0 ? _margins_top : 0) + ((_margins_bottom = margins.bottom) !== null && _margins_bottom !== void 0 ? _margins_bottom : 0);
	let scrollSize = $edcf132a9284368a$var$getScroll(scrollNode), boundaryDimensions = $edcf132a9284368a$var$getContainerDimensions(boundaryElement), containerDimensions = $edcf132a9284368a$var$getContainerDimensions(container), containerOffsetWithBoundary = boundaryElement.tagName === "BODY" ? $edcf132a9284368a$var$getOffset(container, !1) : $edcf132a9284368a$var$getPosition(container, boundaryElement, !1);
	return container.tagName === "HTML" && boundaryElement.tagName === "BODY" && (containerDimensions.scroll.top = 0, containerDimensions.scroll.left = 0), $edcf132a9284368a$export$6839422d1f33cee9(placement, childOffset, overlaySize, scrollSize, margins, padding, shouldFlip, boundaryDimensions, containerDimensions, containerOffsetWithBoundary, offset, crossOffset, isContainerPositioned, maxHeight, arrowSize, arrowBoundaryOffset);
}
function $edcf132a9284368a$export$4b834cebd9e5cebe(node, ignoreScale) {
	let { top, left, width, height } = node.getBoundingClientRect();
	return ignoreScale && node instanceof node.ownerDocument.defaultView.HTMLElement && (width = node.offsetWidth, height = node.offsetHeight), {
		top,
		left,
		width,
		height
	};
}
function $edcf132a9284368a$var$getOffset(node, ignoreScale) {
	let { top, left, width, height } = $edcf132a9284368a$export$4b834cebd9e5cebe(node, ignoreScale), { scrollTop, scrollLeft, clientTop, clientLeft } = document.documentElement;
	return {
		top: top + scrollTop - clientTop,
		left: left + scrollLeft - clientLeft,
		width,
		height
	};
}
function $edcf132a9284368a$var$getPosition(node, parent, ignoreScale) {
	let style = window.getComputedStyle(node), offset;
	if (style.position === "fixed") offset = $edcf132a9284368a$export$4b834cebd9e5cebe(node, ignoreScale);
	else {
		offset = $edcf132a9284368a$var$getOffset(node, ignoreScale);
		let parentOffset = $edcf132a9284368a$var$getOffset(parent, ignoreScale), parentStyle = window.getComputedStyle(parent);
		parentOffset.top += (parseInt(parentStyle.borderTopWidth, 10) || 0) - parent.scrollTop, parentOffset.left += (parseInt(parentStyle.borderLeftWidth, 10) || 0) - parent.scrollLeft, offset.top -= parentOffset.top, offset.left -= parentOffset.left;
	}
	return offset.top -= parseInt(style.marginTop, 10) || 0, offset.left -= parseInt(style.marginLeft, 10) || 0, offset;
}
function $edcf132a9284368a$var$getContainingBlock(node) {
	let offsetParent = node.offsetParent;
	if (offsetParent && offsetParent === document.body && window.getComputedStyle(offsetParent).position === "static" && !$edcf132a9284368a$var$isContainingBlock(offsetParent) && (offsetParent = document.documentElement), offsetParent == null) for (offsetParent = node.parentElement; offsetParent && !$edcf132a9284368a$var$isContainingBlock(offsetParent);) offsetParent = offsetParent.parentElement;
	return offsetParent || document.documentElement;
}
function $edcf132a9284368a$var$isContainingBlock(node) {
	let style = window.getComputedStyle(node);
	return style.transform !== "none" || /transform|perspective/.test(style.willChange) || style.filter !== "none" || style.contain === "paint" || "backdropFilter" in style && style.backdropFilter !== "none" || "WebkitBackdropFilter" in style && style.WebkitBackdropFilter !== "none";
}
function $dd149f63282afbbf$export$18fc8428861184da(opts) {
	let { triggerRef, isOpen, onClose } = opts;
	(0, import_react$53.useEffect)(() => {
		if (!isOpen || onClose === null) return;
		let onScroll = (e) => {
			let target = e.target;
			if (!triggerRef.current || target instanceof Node && !target.contains(triggerRef.current) || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
			let onCloseHandler = onClose || $dd149f63282afbbf$export$f6211563215e3b37.get(triggerRef.current);
			onCloseHandler && onCloseHandler();
		};
		return window.addEventListener("scroll", onScroll, !0), () => {
			window.removeEventListener("scroll", onScroll, !0);
		};
	}, [
		isOpen,
		onClose,
		triggerRef
	]);
}
function $148a7a147e38ea7f$export$702d680b21cbd764(localeString) {
	if (Intl.Locale) {
		let locale = new Intl.Locale(localeString).maximize(), textInfo = typeof locale.getTextInfo == "function" ? locale.getTextInfo() : locale.textInfo;
		if (textInfo) return textInfo.direction === "rtl";
		if (locale.script) return $148a7a147e38ea7f$var$RTL_SCRIPTS.has(locale.script);
	}
	let lang = localeString.split("-")[0];
	return $148a7a147e38ea7f$var$RTL_LANGS.has(lang);
}
function $1e5a04cdaf7d1af8$export$f09106e7c6677ec5() {
	let locale = typeof window < "u" && window[$1e5a04cdaf7d1af8$var$localeSymbol] || typeof navigator < "u" && (navigator.language || navigator.userLanguage) || "en-US";
	try {
		Intl.DateTimeFormat.supportedLocalesOf([locale]);
	} catch {
		locale = "en-US";
	}
	return {
		locale,
		direction: $148a7a147e38ea7f$export$702d680b21cbd764(locale) ? "rtl" : "ltr"
	};
}
function $1e5a04cdaf7d1af8$var$updateLocale() {
	$1e5a04cdaf7d1af8$var$currentLocale = $1e5a04cdaf7d1af8$export$f09106e7c6677ec5();
	for (let listener of $1e5a04cdaf7d1af8$var$listeners) listener($1e5a04cdaf7d1af8$var$currentLocale);
}
function $1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a() {
	let isSSR = $b5e257d569688ac6$export$535bd6ca7f90a273(), [defaultLocale, setDefaultLocale] = (0, import_react$55.useState)($1e5a04cdaf7d1af8$var$currentLocale);
	return (0, import_react$55.useEffect)(() => ($1e5a04cdaf7d1af8$var$listeners.size === 0 && window.addEventListener("languagechange", $1e5a04cdaf7d1af8$var$updateLocale), $1e5a04cdaf7d1af8$var$listeners.add(setDefaultLocale), () => {
		$1e5a04cdaf7d1af8$var$listeners.delete(setDefaultLocale), $1e5a04cdaf7d1af8$var$listeners.size === 0 && window.removeEventListener("languagechange", $1e5a04cdaf7d1af8$var$updateLocale);
	}), []), isSSR ? {
		locale: "en-US",
		direction: "ltr"
	} : defaultLocale;
}
function $18f2051aff69b9bf$export$43bb16f9c6d9e3f7() {
	let defaultLocale = $1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a();
	return (0, import_react$56.useContext)($18f2051aff69b9bf$var$I18nContext) || defaultLocale;
}
function __extends(d, b) {
	if (typeof b != "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	extendStatics(d, b);
	function __() {
		this.constructor = d;
	}
	d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __rest(s, e) {
	var t = {};
	for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
	if (s != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
	return t;
}
function __spreadArray(to, from, pack) {
	if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) (ar || !(i in from)) && (ar || (ar = Array.prototype.slice.call(from, 0, i)), ar[i] = from[i]);
	return to.concat(ar || Array.prototype.slice.call(from));
}
function memoize(fn, options) {
	var cache = options && options.cache ? options.cache : cacheDefault, serializer = options && options.serializer ? options.serializer : serializerDefault;
	return (options && options.strategy ? options.strategy : strategyDefault)(fn, {
		cache,
		serializer
	});
}
function isPrimitive(value) {
	return value == null || typeof value == "number" || typeof value == "boolean";
}
function monadic(fn, cache, serializer, arg) {
	var cacheKey = isPrimitive(arg) ? arg : serializer(arg), computedValue = cache.get(cacheKey);
	return typeof computedValue > "u" && (computedValue = fn.call(this, arg), cache.set(cacheKey, computedValue)), computedValue;
}
function variadic(fn, cache, serializer) {
	var args = Array.prototype.slice.call(arguments, 3), cacheKey = serializer(args), computedValue = cache.get(cacheKey);
	return typeof computedValue > "u" && (computedValue = fn.apply(this, args), cache.set(cacheKey, computedValue)), computedValue;
}
function assemble(fn, context, strategy, cache, serialize) {
	return strategy.bind(context, fn, cache, serialize);
}
function strategyDefault(fn, options) {
	var strategy = fn.length === 1 ? monadic : variadic;
	return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}
function strategyVariadic(fn, options) {
	return assemble(fn, this, variadic, options.cache.create(), options.serializer);
}
function strategyMonadic(fn, options) {
	return assemble(fn, this, monadic, options.cache.create(), options.serializer);
}
function isLiteralElement(el) {
	return el.type === TYPE.literal;
}
function isArgumentElement(el) {
	return el.type === TYPE.argument;
}
function isNumberElement(el) {
	return el.type === TYPE.number;
}
function isDateElement(el) {
	return el.type === TYPE.date;
}
function isTimeElement(el) {
	return el.type === TYPE.time;
}
function isSelectElement(el) {
	return el.type === TYPE.select;
}
function isPluralElement(el) {
	return el.type === TYPE.plural;
}
function isPoundElement(el) {
	return el.type === TYPE.pound;
}
function isTagElement(el) {
	return el.type === TYPE.tag;
}
function isNumberSkeleton(el) {
	return !!(el && typeof el == "object" && el.type === SKELETON_TYPE.number);
}
function isDateTimeSkeleton(el) {
	return !!(el && typeof el == "object" && el.type === SKELETON_TYPE.dateTime);
}
function parseDateTimeSkeleton(skeleton) {
	var result = {};
	return skeleton.replace(DATE_TIME_REGEX, function(match) {
		var len = match.length;
		switch (match[0]) {
			case "G":
				result.era = len === 4 ? "long" : len === 5 ? "narrow" : "short";
				break;
			case "y":
				result.year = len === 2 ? "2-digit" : "numeric";
				break;
			case "Y":
			case "u":
			case "U":
			case "r": throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
			case "q":
			case "Q": throw new RangeError("`q/Q` (quarter) patterns are not supported");
			case "M":
			case "L":
				result.month = [
					"numeric",
					"2-digit",
					"short",
					"long",
					"narrow"
				][len - 1];
				break;
			case "w":
			case "W": throw new RangeError("`w/W` (week) patterns are not supported");
			case "d":
				result.day = ["numeric", "2-digit"][len - 1];
				break;
			case "D":
			case "F":
			case "g": throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
			case "E":
				result.weekday = len === 4 ? "long" : len === 5 ? "narrow" : "short";
				break;
			case "e":
				if (len < 4) throw new RangeError("`e..eee` (weekday) patterns are not supported");
				result.weekday = [
					"short",
					"long",
					"narrow",
					"short"
				][len - 4];
				break;
			case "c":
				if (len < 4) throw new RangeError("`c..ccc` (weekday) patterns are not supported");
				result.weekday = [
					"short",
					"long",
					"narrow",
					"short"
				][len - 4];
				break;
			case "a":
				result.hour12 = !0;
				break;
			case "b":
			case "B": throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
			case "h":
				result.hourCycle = "h12", result.hour = ["numeric", "2-digit"][len - 1];
				break;
			case "H":
				result.hourCycle = "h23", result.hour = ["numeric", "2-digit"][len - 1];
				break;
			case "K":
				result.hourCycle = "h11", result.hour = ["numeric", "2-digit"][len - 1];
				break;
			case "k":
				result.hourCycle = "h24", result.hour = ["numeric", "2-digit"][len - 1];
				break;
			case "j":
			case "J":
			case "C": throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
			case "m":
				result.minute = ["numeric", "2-digit"][len - 1];
				break;
			case "s":
				result.second = ["numeric", "2-digit"][len - 1];
				break;
			case "S":
			case "A": throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
			case "z":
				result.timeZoneName = len < 4 ? "short" : "long";
				break;
			case "Z":
			case "O":
			case "v":
			case "V":
			case "X":
			case "x": throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
		}
		return "";
	}), result;
}
function parseNumberSkeletonFromString(skeleton) {
	if (skeleton.length === 0) throw new Error("Number skeleton cannot be empty");
	for (var stringTokens = skeleton.split(WHITE_SPACE_REGEX).filter(function(x) {
		return x.length > 0;
	}), tokens = [], _i = 0, stringTokens_1 = stringTokens; _i < stringTokens_1.length; _i++) {
		var stemAndOptions = stringTokens_1[_i].split("/");
		if (stemAndOptions.length === 0) throw new Error("Invalid number skeleton");
		for (var stem = stemAndOptions[0], options = stemAndOptions.slice(1), _a2 = 0, options_1 = options; _a2 < options_1.length; _a2++) if (options_1[_a2].length === 0) throw new Error("Invalid number skeleton");
		tokens.push({
			stem,
			options
		});
	}
	return tokens;
}
function icuUnitToEcma(unit) {
	return unit.replace(/^(.*?)-/, "");
}
function parseSignificantPrecision(str) {
	var result = {};
	return str[str.length - 1] === "r" ? result.roundingPriority = "morePrecision" : str[str.length - 1] === "s" && (result.roundingPriority = "lessPrecision"), str.replace(SIGNIFICANT_PRECISION_REGEX, function(_, g1, g2) {
		return typeof g2 != "string" ? (result.minimumSignificantDigits = g1.length, result.maximumSignificantDigits = g1.length) : g2 === "+" ? result.minimumSignificantDigits = g1.length : g1[0] === "#" ? result.maximumSignificantDigits = g1.length : (result.minimumSignificantDigits = g1.length, result.maximumSignificantDigits = g1.length + (typeof g2 == "string" ? g2.length : 0)), "";
	}), result;
}
function parseSign(str) {
	switch (str) {
		case "sign-auto": return { signDisplay: "auto" };
		case "sign-accounting":
		case "()": return { currencySign: "accounting" };
		case "sign-always":
		case "+!": return { signDisplay: "always" };
		case "sign-accounting-always":
		case "()!": return {
			signDisplay: "always",
			currencySign: "accounting"
		};
		case "sign-except-zero":
		case "+?": return { signDisplay: "exceptZero" };
		case "sign-accounting-except-zero":
		case "()?": return {
			signDisplay: "exceptZero",
			currencySign: "accounting"
		};
		case "sign-never":
		case "+_": return { signDisplay: "never" };
	}
}
function parseConciseScientificAndEngineeringStem(stem) {
	var result;
	if (stem[0] === "E" && stem[1] === "E" ? (result = { notation: "engineering" }, stem = stem.slice(2)) : stem[0] === "E" && (result = { notation: "scientific" }, stem = stem.slice(1)), result) {
		var signDisplay = stem.slice(0, 2);
		if (signDisplay === "+!" ? (result.signDisplay = "always", stem = stem.slice(2)) : signDisplay === "+?" && (result.signDisplay = "exceptZero", stem = stem.slice(2)), !CONCISE_INTEGER_WIDTH_REGEX.test(stem)) throw new Error("Malformed concise eng/scientific notation");
		result.minimumIntegerDigits = stem.length;
	}
	return result;
}
function parseNotationOptions(opt) {
	return parseSign(opt) || {};
}
function parseNumberSkeleton(tokens) {
	for (var result = {}, _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
		var token = tokens_1[_i];
		switch (token.stem) {
			case "percent":
			case "%":
				result.style = "percent";
				continue;
			case "%x100":
				result.style = "percent", result.scale = 100;
				continue;
			case "currency":
				result.style = "currency", result.currency = token.options[0];
				continue;
			case "group-off":
			case ",_":
				result.useGrouping = !1;
				continue;
			case "precision-integer":
			case ".":
				result.maximumFractionDigits = 0;
				continue;
			case "measure-unit":
			case "unit":
				result.style = "unit", result.unit = icuUnitToEcma(token.options[0]);
				continue;
			case "compact-short":
			case "K":
				result.notation = "compact", result.compactDisplay = "short";
				continue;
			case "compact-long":
			case "KK":
				result.notation = "compact", result.compactDisplay = "long";
				continue;
			case "scientific":
				result = __assign(__assign(__assign({}, result), { notation: "scientific" }), token.options.reduce(function(all, opt2) {
					return __assign(__assign({}, all), parseNotationOptions(opt2));
				}, {}));
				continue;
			case "engineering":
				result = __assign(__assign(__assign({}, result), { notation: "engineering" }), token.options.reduce(function(all, opt2) {
					return __assign(__assign({}, all), parseNotationOptions(opt2));
				}, {}));
				continue;
			case "notation-simple":
				result.notation = "standard";
				continue;
			case "unit-width-narrow":
				result.currencyDisplay = "narrowSymbol", result.unitDisplay = "narrow";
				continue;
			case "unit-width-short":
				result.currencyDisplay = "code", result.unitDisplay = "short";
				continue;
			case "unit-width-full-name":
				result.currencyDisplay = "name", result.unitDisplay = "long";
				continue;
			case "unit-width-iso-code":
				result.currencyDisplay = "symbol";
				continue;
			case "scale":
				result.scale = parseFloat(token.options[0]);
				continue;
			case "rounding-mode-floor":
				result.roundingMode = "floor";
				continue;
			case "rounding-mode-ceiling":
				result.roundingMode = "ceil";
				continue;
			case "rounding-mode-down":
				result.roundingMode = "trunc";
				continue;
			case "rounding-mode-up":
				result.roundingMode = "expand";
				continue;
			case "rounding-mode-half-even":
				result.roundingMode = "halfEven";
				continue;
			case "rounding-mode-half-down":
				result.roundingMode = "halfTrunc";
				continue;
			case "rounding-mode-half-up":
				result.roundingMode = "halfExpand";
				continue;
			case "integer-width":
				if (token.options.length > 1) throw new RangeError("integer-width stems only accept a single optional option");
				token.options[0].replace(INTEGER_WIDTH_REGEX, function(_, g1, g2, g3, g4, g5) {
					if (g1) result.minimumIntegerDigits = g2.length;
					else {
						if (g3 && g4) throw new Error("We currently do not support maximum integer digits");
						if (g5) throw new Error("We currently do not support exact integer digits");
					}
					return "";
				});
				continue;
		}
		if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
			result.minimumIntegerDigits = token.stem.length;
			continue;
		}
		if (FRACTION_PRECISION_REGEX.test(token.stem)) {
			if (token.options.length > 1) throw new RangeError("Fraction-precision stems only accept a single optional option");
			token.stem.replace(FRACTION_PRECISION_REGEX, function(_, g1, g2, g3, g4, g5) {
				return g2 === "*" ? result.minimumFractionDigits = g1.length : g3 && g3[0] === "#" ? result.maximumFractionDigits = g3.length : g4 && g5 ? (result.minimumFractionDigits = g4.length, result.maximumFractionDigits = g4.length + g5.length) : (result.minimumFractionDigits = g1.length, result.maximumFractionDigits = g1.length), "";
			});
			var opt = token.options[0];
			opt === "w" ? result = __assign(__assign({}, result), { trailingZeroDisplay: "stripIfInteger" }) : opt && (result = __assign(__assign({}, result), parseSignificantPrecision(opt)));
			continue;
		}
		if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
			result = __assign(__assign({}, result), parseSignificantPrecision(token.stem));
			continue;
		}
		var signOpts = parseSign(token.stem);
		signOpts && (result = __assign(__assign({}, result), signOpts));
		var conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);
		conciseScientificAndEngineeringOpts && (result = __assign(__assign({}, result), conciseScientificAndEngineeringOpts));
	}
	return result;
}
function getBestPattern(skeleton, locale) {
	for (var skeletonCopy = "", patternPos = 0; patternPos < skeleton.length; patternPos++) {
		var patternChar = skeleton.charAt(patternPos);
		if (patternChar === "j") {
			for (var extraLength = 0; patternPos + 1 < skeleton.length && skeleton.charAt(patternPos + 1) === patternChar;) extraLength++, patternPos++;
			var hourLen = 1 + (extraLength & 1), dayPeriodLen = extraLength < 2 ? 1 : 3 + (extraLength >> 1), dayPeriodChar = "a", hourChar = getDefaultHourSymbolFromLocale(locale);
			for ((hourChar == "H" || hourChar == "k") && (dayPeriodLen = 0); dayPeriodLen-- > 0;) skeletonCopy += dayPeriodChar;
			for (; hourLen-- > 0;) skeletonCopy = hourChar + skeletonCopy;
		} else patternChar === "J" ? skeletonCopy += "H" : skeletonCopy += patternChar;
	}
	return skeletonCopy;
}
function getDefaultHourSymbolFromLocale(locale) {
	var hourCycle = locale.hourCycle;
	if (hourCycle === void 0 && locale.hourCycles && locale.hourCycles.length && (hourCycle = locale.hourCycles[0]), hourCycle) switch (hourCycle) {
		case "h24": return "k";
		case "h23": return "H";
		case "h12": return "h";
		case "h11": return "K";
		default: throw new Error("Invalid hourCycle");
	}
	var languageTag = locale.language, regionTag;
	languageTag !== "root" && (regionTag = locale.maximize().region);
	return (timeData[regionTag || ""] || timeData[languageTag || ""] || timeData["".concat(languageTag, "-001")] || timeData["001"])[0];
}
function createLocation(start, end) {
	return {
		start,
		end
	};
}
function RE(s, flag) {
	return new RegExp(s, flag);
}
function _isAlpha(codepoint) {
	return codepoint >= 97 && codepoint <= 122 || codepoint >= 65 && codepoint <= 90;
}
function _isAlphaOrSlash(codepoint) {
	return _isAlpha(codepoint) || codepoint === 47;
}
function _isPotentialElementNameChar(c) {
	return c === 45 || c === 46 || c >= 48 && c <= 57 || c === 95 || c >= 97 && c <= 122 || c >= 65 && c <= 90 || c == 183 || c >= 192 && c <= 214 || c >= 216 && c <= 246 || c >= 248 && c <= 893 || c >= 895 && c <= 8191 || c >= 8204 && c <= 8205 || c >= 8255 && c <= 8256 || c >= 8304 && c <= 8591 || c >= 11264 && c <= 12271 || c >= 12289 && c <= 55295 || c >= 63744 && c <= 64975 || c >= 65008 && c <= 65533 || c >= 65536 && c <= 983039;
}
function _isWhiteSpace(c) {
	return c >= 9 && c <= 13 || c === 32 || c === 133 || c >= 8206 && c <= 8207 || c === 8232 || c === 8233;
}
function _isPatternSyntax(c) {
	return c >= 33 && c <= 35 || c === 36 || c >= 37 && c <= 39 || c === 40 || c === 41 || c === 42 || c === 43 || c === 44 || c === 45 || c >= 46 && c <= 47 || c >= 58 && c <= 59 || c >= 60 && c <= 62 || c >= 63 && c <= 64 || c === 91 || c === 92 || c === 93 || c === 94 || c === 96 || c === 123 || c === 124 || c === 125 || c === 126 || c === 161 || c >= 162 && c <= 165 || c === 166 || c === 167 || c === 169 || c === 171 || c === 172 || c === 174 || c === 176 || c === 177 || c === 182 || c === 187 || c === 191 || c === 215 || c === 247 || c >= 8208 && c <= 8213 || c >= 8214 && c <= 8215 || c === 8216 || c === 8217 || c === 8218 || c >= 8219 && c <= 8220 || c === 8221 || c === 8222 || c === 8223 || c >= 8224 && c <= 8231 || c >= 8240 && c <= 8248 || c === 8249 || c === 8250 || c >= 8251 && c <= 8254 || c >= 8257 && c <= 8259 || c === 8260 || c === 8261 || c === 8262 || c >= 8263 && c <= 8273 || c === 8274 || c === 8275 || c >= 8277 && c <= 8286 || c >= 8592 && c <= 8596 || c >= 8597 && c <= 8601 || c >= 8602 && c <= 8603 || c >= 8604 && c <= 8607 || c === 8608 || c >= 8609 && c <= 8610 || c === 8611 || c >= 8612 && c <= 8613 || c === 8614 || c >= 8615 && c <= 8621 || c === 8622 || c >= 8623 && c <= 8653 || c >= 8654 && c <= 8655 || c >= 8656 && c <= 8657 || c === 8658 || c === 8659 || c === 8660 || c >= 8661 && c <= 8691 || c >= 8692 && c <= 8959 || c >= 8960 && c <= 8967 || c === 8968 || c === 8969 || c === 8970 || c === 8971 || c >= 8972 && c <= 8991 || c >= 8992 && c <= 8993 || c >= 8994 && c <= 9e3 || c === 9001 || c === 9002 || c >= 9003 && c <= 9083 || c === 9084 || c >= 9085 && c <= 9114 || c >= 9115 && c <= 9139 || c >= 9140 && c <= 9179 || c >= 9180 && c <= 9185 || c >= 9186 && c <= 9254 || c >= 9255 && c <= 9279 || c >= 9280 && c <= 9290 || c >= 9291 && c <= 9311 || c >= 9472 && c <= 9654 || c === 9655 || c >= 9656 && c <= 9664 || c === 9665 || c >= 9666 && c <= 9719 || c >= 9720 && c <= 9727 || c >= 9728 && c <= 9838 || c === 9839 || c >= 9840 && c <= 10087 || c === 10088 || c === 10089 || c === 10090 || c === 10091 || c === 10092 || c === 10093 || c === 10094 || c === 10095 || c === 10096 || c === 10097 || c === 10098 || c === 10099 || c === 10100 || c === 10101 || c >= 10132 && c <= 10175 || c >= 10176 && c <= 10180 || c === 10181 || c === 10182 || c >= 10183 && c <= 10213 || c === 10214 || c === 10215 || c === 10216 || c === 10217 || c === 10218 || c === 10219 || c === 10220 || c === 10221 || c === 10222 || c === 10223 || c >= 10224 && c <= 10239 || c >= 10240 && c <= 10495 || c >= 10496 && c <= 10626 || c === 10627 || c === 10628 || c === 10629 || c === 10630 || c === 10631 || c === 10632 || c === 10633 || c === 10634 || c === 10635 || c === 10636 || c === 10637 || c === 10638 || c === 10639 || c === 10640 || c === 10641 || c === 10642 || c === 10643 || c === 10644 || c === 10645 || c === 10646 || c === 10647 || c === 10648 || c >= 10649 && c <= 10711 || c === 10712 || c === 10713 || c === 10714 || c === 10715 || c >= 10716 && c <= 10747 || c === 10748 || c === 10749 || c >= 10750 && c <= 11007 || c >= 11008 && c <= 11055 || c >= 11056 && c <= 11076 || c >= 11077 && c <= 11078 || c >= 11079 && c <= 11084 || c >= 11085 && c <= 11123 || c >= 11124 && c <= 11125 || c >= 11126 && c <= 11157 || c === 11158 || c >= 11159 && c <= 11263 || c >= 11776 && c <= 11777 || c === 11778 || c === 11779 || c === 11780 || c === 11781 || c >= 11782 && c <= 11784 || c === 11785 || c === 11786 || c === 11787 || c === 11788 || c === 11789 || c >= 11790 && c <= 11798 || c === 11799 || c >= 11800 && c <= 11801 || c === 11802 || c === 11803 || c === 11804 || c === 11805 || c >= 11806 && c <= 11807 || c === 11808 || c === 11809 || c === 11810 || c === 11811 || c === 11812 || c === 11813 || c === 11814 || c === 11815 || c === 11816 || c === 11817 || c >= 11818 && c <= 11822 || c === 11823 || c >= 11824 && c <= 11833 || c >= 11834 && c <= 11835 || c >= 11836 && c <= 11839 || c === 11840 || c === 11841 || c === 11842 || c >= 11843 && c <= 11855 || c >= 11856 && c <= 11857 || c === 11858 || c >= 11859 && c <= 11903 || c >= 12289 && c <= 12291 || c === 12296 || c === 12297 || c === 12298 || c === 12299 || c === 12300 || c === 12301 || c === 12302 || c === 12303 || c === 12304 || c === 12305 || c >= 12306 && c <= 12307 || c === 12308 || c === 12309 || c === 12310 || c === 12311 || c === 12312 || c === 12313 || c === 12314 || c === 12315 || c === 12316 || c === 12317 || c >= 12318 && c <= 12319 || c === 12320 || c === 12336 || c === 64830 || c === 64831 || c >= 65093 && c <= 65094;
}
function pruneLocation(els) {
	els.forEach(function(el) {
		if (delete el.location, isSelectElement(el) || isPluralElement(el)) for (var k in el.options) delete el.options[k].location, pruneLocation(el.options[k].value);
		else isNumberElement(el) && isNumberSkeleton(el.style) || (isDateElement(el) || isTimeElement(el)) && isDateTimeSkeleton(el.style) ? delete el.style.location : isTagElement(el) && pruneLocation(el.children);
	});
}
function parse(message, opts) {
	opts === void 0 && (opts = {}), opts = __assign({
		shouldParseSkeletons: !0,
		requiresOtherClause: !0
	}, opts);
	var result = new Parser(message, opts).parse();
	if (result.err) {
		var error = SyntaxError(ErrorKind[result.err.kind]);
		throw error.location = result.err.location, error.originalMessage = result.err.message, error;
	}
	return opts?.captureLocation || pruneLocation(result.val), result.val;
}
function mergeLiteral(parts) {
	return parts.length < 2 ? parts : parts.reduce(function(all, part) {
		var lastPart = all[all.length - 1];
		return !lastPart || lastPart.type !== PART_TYPE.literal || part.type !== PART_TYPE.literal ? all.push(part) : lastPart.value += part.value, all;
	}, []);
}
function isFormatXMLElementFn(el) {
	return typeof el == "function";
}
function formatToParts(els, locales, formatters, formats, values, currentPluralValue, originalMessage) {
	if (els.length === 1 && isLiteralElement(els[0])) return [{
		type: PART_TYPE.literal,
		value: els[0].value
	}];
	for (var result = [], _i = 0, els_1 = els; _i < els_1.length; _i++) {
		var el = els_1[_i];
		if (isLiteralElement(el)) {
			result.push({
				type: PART_TYPE.literal,
				value: el.value
			});
			continue;
		}
		if (isPoundElement(el)) {
			typeof currentPluralValue == "number" && result.push({
				type: PART_TYPE.literal,
				value: formatters.getNumberFormat(locales).format(currentPluralValue)
			});
			continue;
		}
		var varName = el.value;
		if (!(values && varName in values)) throw new MissingValueError(varName, originalMessage);
		var value = values[varName];
		if (isArgumentElement(el)) {
			(!value || typeof value == "string" || typeof value == "number") && (value = typeof value == "string" || typeof value == "number" ? String(value) : ""), result.push({
				type: typeof value == "string" ? PART_TYPE.literal : PART_TYPE.object,
				value
			});
			continue;
		}
		if (isDateElement(el)) {
			var style = typeof el.style == "string" ? formats.date[el.style] : isDateTimeSkeleton(el.style) ? el.style.parsedOptions : void 0;
			result.push({
				type: PART_TYPE.literal,
				value: formatters.getDateTimeFormat(locales, style).format(value)
			});
			continue;
		}
		if (isTimeElement(el)) {
			var style = typeof el.style == "string" ? formats.time[el.style] : isDateTimeSkeleton(el.style) ? el.style.parsedOptions : formats.time.medium;
			result.push({
				type: PART_TYPE.literal,
				value: formatters.getDateTimeFormat(locales, style).format(value)
			});
			continue;
		}
		if (isNumberElement(el)) {
			var style = typeof el.style == "string" ? formats.number[el.style] : isNumberSkeleton(el.style) ? el.style.parsedOptions : void 0;
			style && style.scale && (value = value * (style.scale || 1)), result.push({
				type: PART_TYPE.literal,
				value: formatters.getNumberFormat(locales, style).format(value)
			});
			continue;
		}
		if (isTagElement(el)) {
			var children = el.children, value_1 = el.value, formatFn = values[value_1];
			if (!isFormatXMLElementFn(formatFn)) throw new InvalidValueTypeError(value_1, "function", originalMessage);
			var chunks = formatFn(formatToParts(children, locales, formatters, formats, values, currentPluralValue).map(function(p) {
				return p.value;
			}));
			Array.isArray(chunks) || (chunks = [chunks]), result.push.apply(result, chunks.map(function(c) {
				return {
					type: typeof c == "string" ? PART_TYPE.literal : PART_TYPE.object,
					value: c
				};
			}));
		}
		if (isSelectElement(el)) {
			var opt = el.options[value] || el.options.other;
			if (!opt) throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
			result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
			continue;
		}
		if (isPluralElement(el)) {
			var opt = el.options["=".concat(value)];
			if (!opt) {
				if (!Intl.PluralRules) throw new FormatError(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, ErrorCode.MISSING_INTL_API, originalMessage);
				var rule = formatters.getPluralRules(locales, { type: el.pluralType }).select(value - (el.offset || 0));
				opt = el.options[rule] || el.options.other;
			}
			if (!opt) throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
			result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el.offset || 0)));
			continue;
		}
	}
	return mergeLiteral(result);
}
function mergeConfig(c1, c2) {
	return c2 ? __assign(__assign(__assign({}, c1 || {}), c2 || {}), Object.keys(c1).reduce(function(all, k) {
		return all[k] = __assign(__assign({}, c1[k]), c2[k] || {}), all;
	}, {})) : c1;
}
function mergeConfigs(defaultConfig, configs) {
	return configs ? Object.keys(defaultConfig).reduce(function(all, k) {
		return all[k] = mergeConfig(defaultConfig[k], configs[k]), all;
	}, __assign({}, defaultConfig)) : defaultConfig;
}
function createFastMemoizeCache(store) {
	return { create: function() {
		return {
			get: function(key) {
				return store[key];
			},
			set: function(key, value) {
				store[key] = value;
			}
		};
	} };
}
function createDefaultFormatters(cache) {
	return cache === void 0 && (cache = {
		number: {},
		dateTime: {},
		pluralRules: {}
	}), {
		getNumberFormat: memoize(function() {
			for (var _a2, args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
			return new ((_a2 = Intl.NumberFormat).bind.apply(_a2, __spreadArray([void 0], args, !1)))();
		}, {
			cache: createFastMemoizeCache(cache.number),
			strategy: strategies.variadic
		}),
		getDateTimeFormat: memoize(function() {
			for (var _a2, args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
			return new ((_a2 = Intl.DateTimeFormat).bind.apply(_a2, __spreadArray([void 0], args, !1)))();
		}, {
			cache: createFastMemoizeCache(cache.dateTime),
			strategy: strategies.variadic
		}),
		getPluralRules: memoize(function() {
			for (var _a2, args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
			return new ((_a2 = Intl.PluralRules).bind.apply(_a2, __spreadArray([void 0], args, !1)))();
		}, {
			cache: createFastMemoizeCache(cache.pluralRules),
			strategy: strategies.variadic
		})
	};
}
function $5b160d28a433310d$var$getStringsForLocale(locale, strings, defaultLocale = "en-US") {
	if (strings[locale]) return strings[locale];
	let language = $5b160d28a433310d$var$getLanguage(locale);
	if (strings[language]) return strings[language];
	for (let key in strings) if (key.startsWith(language + "-")) return strings[key];
	return strings[defaultLocale];
}
function $5b160d28a433310d$var$getLanguage(locale) {
	return Intl.Locale ? new Intl.Locale(locale).language : locale.split("-")[0];
}
function $fca6afa0e843324b$var$getCachedDictionary(strings) {
	let dictionary = $fca6afa0e843324b$var$cache.get(strings);
	return dictionary || (dictionary = new $5b160d28a433310d$export$c17fa47878dc55b6(strings), $fca6afa0e843324b$var$cache.set(strings, dictionary)), dictionary;
}
function $fca6afa0e843324b$export$87b761675e8eaa10(strings, packageName) {
	return packageName && $5b160d28a433310d$export$c17fa47878dc55b6.getGlobalDictionaryForPackage(packageName) || $fca6afa0e843324b$var$getCachedDictionary(strings);
}
function $fca6afa0e843324b$export$f12b703ca79dfbb1(strings, packageName) {
	let { locale } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7(), dictionary = $fca6afa0e843324b$export$87b761675e8eaa10(strings, packageName);
	return (0, import_react$58.useMemo)(() => new $6db58dc88e78b024$export$2f817fcdc4b89ae0(locale, dictionary), [locale, dictionary]);
}
function $488c6ddbf4ef74c2$var$getCachedNumberFormatter(locale, options = {}) {
	let { numberingSystem } = options;
	if (numberingSystem && locale.includes("-nu-") && (locale.includes("-u-") || (locale += "-u-"), locale += `-nu-${numberingSystem}`), options.style === "unit" && !$488c6ddbf4ef74c2$var$supportsUnit) {
		var _UNITS_unit;
		let { unit, unitDisplay = "short" } = options;
		if (!unit) throw new Error("unit option must be provided with style: \"unit\"");
		if (!(!((_UNITS_unit = $488c6ddbf4ef74c2$var$UNITS[unit]) === null || _UNITS_unit === void 0) && _UNITS_unit[unitDisplay])) throw new Error(`Unsupported unit ${unit} with unitDisplay = ${unitDisplay}`);
		options = {
			...options,
			style: "decimal"
		};
	}
	let cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
	if ($488c6ddbf4ef74c2$var$formatterCache.has(cacheKey)) return $488c6ddbf4ef74c2$var$formatterCache.get(cacheKey);
	let numberFormatter = new Intl.NumberFormat(locale, options);
	return $488c6ddbf4ef74c2$var$formatterCache.set(cacheKey, numberFormatter), numberFormatter;
}
function $488c6ddbf4ef74c2$export$711b50b3c525e0f2(numberFormat, signDisplay, num) {
	if (signDisplay === "auto") return numberFormat.format(num);
	if (signDisplay === "never") return numberFormat.format(Math.abs(num));
	{
		let needsPositiveSign = !1;
		if (signDisplay === "always" ? needsPositiveSign = num > 0 || Object.is(num, 0) : signDisplay === "exceptZero" && (Object.is(num, -0) || Object.is(num, 0) ? num = Math.abs(num) : needsPositiveSign = num > 0), needsPositiveSign) {
			let negative = numberFormat.format(-num), noSign = numberFormat.format(num), minus = negative.replace(noSign, "").replace(/\u200e|\u061C/, "");
			return [...minus].length !== 1 && console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case"), negative.replace(noSign, "!!!").replace(minus, "+").replace("!!!", noSign);
		} else return numberFormat.format(num);
	}
}
function $a916eb452884faea$export$b7a616150fdb9f44(options = {}) {
	let { locale } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7();
	return (0, import_react$61.useMemo)(() => new $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5(locale, options), [locale, options]);
}
function $325a3faab7a68acd$export$a16aca283550c30d(options) {
	let { locale } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7(), cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
	if ($325a3faab7a68acd$var$cache.has(cacheKey)) return $325a3faab7a68acd$var$cache.get(cacheKey);
	let formatter = new Intl.Collator(locale, options);
	return $325a3faab7a68acd$var$cache.set(cacheKey, formatter), formatter;
}
function $2a41e45df1593e64$export$d39e1813b3bdd0e1(props) {
	let { direction } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7(), { arrowSize, targetRef, overlayRef, arrowRef, scrollRef = overlayRef, placement = "bottom", containerPadding = 12, shouldFlip = !0, boundaryElement = typeof document < "u" ? document.body : null, offset = 0, crossOffset = 0, shouldUpdatePosition = !0, isOpen = !0, onClose, maxHeight, arrowBoundaryOffset = 0 } = props, [position, setPosition] = (0, import_react$54.useState)(null), deps = [
		shouldUpdatePosition,
		placement,
		overlayRef.current,
		targetRef.current,
		arrowRef?.current,
		scrollRef.current,
		containerPadding,
		shouldFlip,
		boundaryElement,
		offset,
		crossOffset,
		isOpen,
		direction,
		maxHeight,
		arrowBoundaryOffset,
		arrowSize
	], lastScale = (0, import_react$54.useRef)($2a41e45df1593e64$var$visualViewport?.scale);
	(0, import_react$54.useEffect)(() => {
		isOpen && (lastScale.current = $2a41e45df1593e64$var$visualViewport?.scale);
	}, [isOpen]);
	let updatePosition = (0, import_react$54.useCallback)(() => {
		if (shouldUpdatePosition === !1 || !isOpen || !overlayRef.current || !targetRef.current || !boundaryElement || $2a41e45df1593e64$var$visualViewport?.scale !== lastScale.current) return;
		let anchor = null;
		if (scrollRef.current && scrollRef.current.contains(document.activeElement)) {
			var _document_activeElement;
			let anchorRect = (_document_activeElement = document.activeElement) === null || _document_activeElement === void 0 ? void 0 : _document_activeElement.getBoundingClientRect(), scrollRect = scrollRef.current.getBoundingClientRect();
			var _anchorRect_top;
			if (anchor = {
				type: "top",
				offset: ((_anchorRect_top = anchorRect?.top) !== null && _anchorRect_top !== void 0 ? _anchorRect_top : 0) - scrollRect.top
			}, anchor.offset > scrollRect.height / 2) {
				anchor.type = "bottom";
				var _anchorRect_bottom;
				anchor.offset = ((_anchorRect_bottom = anchorRect?.bottom) !== null && _anchorRect_bottom !== void 0 ? _anchorRect_bottom : 0) - scrollRect.bottom;
			}
		}
		let overlay = overlayRef.current;
		if (!maxHeight && overlayRef.current) {
			var _window_visualViewport;
			overlay.style.top = "0px", overlay.style.bottom = "";
			var _window_visualViewport_height;
			overlay.style.maxHeight = ((_window_visualViewport_height = (_window_visualViewport = window.visualViewport) === null || _window_visualViewport === void 0 ? void 0 : _window_visualViewport.height) !== null && _window_visualViewport_height !== void 0 ? _window_visualViewport_height : window.innerHeight) + "px";
		}
		let position2 = $edcf132a9284368a$export$b3ceb0cbf1056d98({
			placement: $2a41e45df1593e64$var$translateRTL(placement, direction),
			overlayNode: overlayRef.current,
			targetNode: targetRef.current,
			scrollNode: scrollRef.current || overlayRef.current,
			padding: containerPadding,
			shouldFlip,
			boundaryElement,
			offset,
			crossOffset,
			maxHeight,
			arrowSize: arrowSize ?? (arrowRef?.current ? $edcf132a9284368a$export$4b834cebd9e5cebe(arrowRef.current, !0).width : 0),
			arrowBoundaryOffset
		});
		if (position2.position) {
			if (overlay.style.top = "", overlay.style.bottom = "", overlay.style.left = "", overlay.style.right = "", Object.keys(position2.position).forEach((key) => overlay.style[key] = position2.position[key] + "px"), overlay.style.maxHeight = position2.maxHeight != null ? position2.maxHeight + "px" : "", anchor && document.activeElement && scrollRef.current) {
				let anchorRect = document.activeElement.getBoundingClientRect(), scrollRect = scrollRef.current.getBoundingClientRect(), newOffset = anchorRect[anchor.type] - scrollRect[anchor.type];
				scrollRef.current.scrollTop += newOffset - anchor.offset;
			}
			setPosition(position2);
		}
	}, deps);
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(updatePosition, deps), $2a41e45df1593e64$var$useResize(updatePosition), $9daab02d461809db$export$683480f191c0e3ea({
		ref: overlayRef,
		onResize: updatePosition
	}), $9daab02d461809db$export$683480f191c0e3ea({
		ref: targetRef,
		onResize: updatePosition
	});
	let isResizing = (0, import_react$54.useRef)(!1);
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		let timeout, onResize = () => {
			isResizing.current = !0, clearTimeout(timeout), timeout = setTimeout(() => {
				isResizing.current = !1;
			}, 500), updatePosition();
		}, onScroll = () => {
			isResizing.current && onResize();
		};
		return $2a41e45df1593e64$var$visualViewport?.addEventListener("resize", onResize), $2a41e45df1593e64$var$visualViewport?.addEventListener("scroll", onScroll), () => {
			$2a41e45df1593e64$var$visualViewport?.removeEventListener("resize", onResize), $2a41e45df1593e64$var$visualViewport?.removeEventListener("scroll", onScroll);
		};
	}, [updatePosition]);
	let close = (0, import_react$54.useCallback)(() => {
		isResizing.current || onClose?.();
	}, [onClose, isResizing]);
	$dd149f63282afbbf$export$18fc8428861184da({
		triggerRef: targetRef,
		isOpen,
		onClose: onClose && close
	});
	var _position_maxHeight, _position_placement, _position_triggerAnchorPoint;
	return {
		overlayProps: { style: {
			position: position ? "absolute" : "fixed",
			top: position ? void 0 : 0,
			left: position ? void 0 : 0,
			zIndex: 1e5,
			...position?.position,
			maxHeight: (_position_maxHeight = position?.maxHeight) !== null && _position_maxHeight !== void 0 ? _position_maxHeight : "100vh"
		} },
		placement: (_position_placement = position?.placement) !== null && _position_placement !== void 0 ? _position_placement : null,
		triggerAnchorPoint: (_position_triggerAnchorPoint = position?.triggerAnchorPoint) !== null && _position_triggerAnchorPoint !== void 0 ? _position_triggerAnchorPoint : null,
		arrowProps: {
			"aria-hidden": "true",
			role: "presentation",
			style: {
				left: position?.arrowOffsetLeft,
				top: position?.arrowOffsetTop
			}
		},
		updatePosition
	};
}
function $2a41e45df1593e64$var$useResize(onResize) {
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => (window.addEventListener("resize", onResize, !1), () => {
		window.removeEventListener("resize", onResize, !1);
	}), [onResize]);
}
function $2a41e45df1593e64$var$translateRTL(position, direction) {
	return direction === "rtl" ? position.replace("start", "right").replace("end", "left") : position.replace("start", "left").replace("end", "right");
}
function $9bf71ea28793e738$export$20e40289641fbbb6(props) {
	let { children, contain, restoreFocus, autoFocus } = props, startRef = (0, import_react$63.useRef)(null), endRef = (0, import_react$63.useRef)(null), scopeRef = (0, import_react$63.useRef)([]), { parentNode } = (0, import_react$63.useContext)($9bf71ea28793e738$var$FocusContext) || {}, node = (0, import_react$63.useMemo)(() => new $9bf71ea28793e738$var$TreeNode({ scopeRef }), [scopeRef]);
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		let parent = parentNode || $9bf71ea28793e738$export$d06fae2ee68b101e.root;
		if ($9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(parent.scopeRef) && $9bf71ea28793e738$var$activeScope && !$9bf71ea28793e738$var$isAncestorScope($9bf71ea28793e738$var$activeScope, parent.scopeRef)) {
			let activeNode = $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode($9bf71ea28793e738$var$activeScope);
			activeNode && (parent = activeNode);
		}
		parent.addChild(node), $9bf71ea28793e738$export$d06fae2ee68b101e.addNode(node);
	}, [node, parentNode]), $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		let node2 = $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(scopeRef);
		node2 && (node2.contain = !!contain);
	}, [contain]), $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		var _startRef_current;
		let node2 = (_startRef_current = startRef.current) === null || _startRef_current === void 0 ? void 0 : _startRef_current.nextSibling, nodes = [], stopPropagation = (e) => e.stopPropagation();
		for (; node2 && node2 !== endRef.current;) nodes.push(node2), node2.addEventListener($9bf71ea28793e738$var$RESTORE_FOCUS_EVENT, stopPropagation), node2 = node2.nextSibling;
		return scopeRef.current = nodes, () => {
			for (let node3 of nodes) node3.removeEventListener($9bf71ea28793e738$var$RESTORE_FOCUS_EVENT, stopPropagation);
		};
	}, [children]), $9bf71ea28793e738$var$useActiveScopeTracker(scopeRef, restoreFocus, contain), $9bf71ea28793e738$var$useFocusContainment(scopeRef, contain), $9bf71ea28793e738$var$useRestoreFocus(scopeRef, restoreFocus, contain), $9bf71ea28793e738$var$useAutoFocus(scopeRef, autoFocus), (0, import_react$63.useEffect)(() => {
		let activeElement = $d4ee10de306f2510$export$cd4e5573fbe2b576($431fbd86ca7dc216$export$b204af158042fbac(scopeRef.current ? scopeRef.current[0] : void 0)), scope = null;
		if ($9bf71ea28793e738$var$isElementInScope(activeElement, scopeRef.current)) {
			for (let node2 of $9bf71ea28793e738$export$d06fae2ee68b101e.traverse()) node2.scopeRef && $9bf71ea28793e738$var$isElementInScope(activeElement, node2.scopeRef.current) && (scope = node2);
			scope === $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(scopeRef) && ($9bf71ea28793e738$var$activeScope = scope.scopeRef);
		}
	}, [scopeRef]), $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => () => {
		var _focusScopeTree_getTreeNode_parent, _focusScopeTree_getTreeNode, _focusScopeTree_getTreeNode_parent_scopeRef;
		let parentScope = (_focusScopeTree_getTreeNode_parent_scopeRef = (_focusScopeTree_getTreeNode = $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(scopeRef)) === null || _focusScopeTree_getTreeNode === void 0 || (_focusScopeTree_getTreeNode_parent = _focusScopeTree_getTreeNode.parent) === null || _focusScopeTree_getTreeNode_parent === void 0 ? void 0 : _focusScopeTree_getTreeNode_parent.scopeRef) !== null && _focusScopeTree_getTreeNode_parent_scopeRef !== void 0 ? _focusScopeTree_getTreeNode_parent_scopeRef : null;
		(scopeRef === $9bf71ea28793e738$var$activeScope || $9bf71ea28793e738$var$isAncestorScope(scopeRef, $9bf71ea28793e738$var$activeScope)) && (!parentScope || $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(parentScope)) && ($9bf71ea28793e738$var$activeScope = parentScope), $9bf71ea28793e738$export$d06fae2ee68b101e.removeTreeNode(scopeRef);
	}, [scopeRef]);
	let focusManager = (0, import_react$63.useMemo)(() => $9bf71ea28793e738$var$createFocusManagerForScope(scopeRef), []), value = (0, import_react$63.useMemo)(() => ({
		focusManager,
		parentNode: node
	}), [node, focusManager]);
	return import_react$63.createElement($9bf71ea28793e738$var$FocusContext.Provider, { value }, import_react$63.createElement("span", {
		"data-focus-scope-start": !0,
		hidden: !0,
		ref: startRef
	}), children, import_react$63.createElement("span", {
		"data-focus-scope-end": !0,
		hidden: !0,
		ref: endRef
	}));
}
function $9bf71ea28793e738$var$createFocusManagerForScope(scopeRef) {
	return {
		focusNext(opts = {}) {
			let scope = scopeRef.current, { from, tabbable, wrap, accept } = opts;
			var _scope_;
			let node = from || $d4ee10de306f2510$export$cd4e5573fbe2b576($431fbd86ca7dc216$export$b204af158042fbac((_scope_ = scope[0]) !== null && _scope_ !== void 0 ? _scope_ : void 0)), sentinel = scope[0].previousElementSibling, walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa($9bf71ea28793e738$var$getScopeRoot(scope), {
				tabbable,
				accept
			}, scope);
			walker.currentNode = $9bf71ea28793e738$var$isElementInScope(node, scope) ? node : sentinel;
			let nextNode = walker.nextNode();
			return !nextNode && wrap && (walker.currentNode = sentinel, nextNode = walker.nextNode()), nextNode && $9bf71ea28793e738$var$focusElement(nextNode, !0), nextNode;
		},
		focusPrevious(opts = {}) {
			let scope = scopeRef.current, { from, tabbable, wrap, accept } = opts;
			var _scope_;
			let node = from || $d4ee10de306f2510$export$cd4e5573fbe2b576($431fbd86ca7dc216$export$b204af158042fbac((_scope_ = scope[0]) !== null && _scope_ !== void 0 ? _scope_ : void 0)), sentinel = scope[scope.length - 1].nextElementSibling, walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa($9bf71ea28793e738$var$getScopeRoot(scope), {
				tabbable,
				accept
			}, scope);
			walker.currentNode = $9bf71ea28793e738$var$isElementInScope(node, scope) ? node : sentinel;
			let previousNode = walker.previousNode();
			return !previousNode && wrap && (walker.currentNode = sentinel, previousNode = walker.previousNode()), previousNode && $9bf71ea28793e738$var$focusElement(previousNode, !0), previousNode;
		},
		focusFirst(opts = {}) {
			let scope = scopeRef.current, { tabbable, accept } = opts, walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa($9bf71ea28793e738$var$getScopeRoot(scope), {
				tabbable,
				accept
			}, scope);
			walker.currentNode = scope[0].previousElementSibling;
			let nextNode = walker.nextNode();
			return nextNode && $9bf71ea28793e738$var$focusElement(nextNode, !0), nextNode;
		},
		focusLast(opts = {}) {
			let scope = scopeRef.current, { tabbable, accept } = opts, walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa($9bf71ea28793e738$var$getScopeRoot(scope), {
				tabbable,
				accept
			}, scope);
			walker.currentNode = scope[scope.length - 1].nextElementSibling;
			let previousNode = walker.previousNode();
			return previousNode && $9bf71ea28793e738$var$focusElement(previousNode, !0), previousNode;
		}
	};
}
function $9bf71ea28793e738$var$getScopeRoot(scope) {
	return scope[0].parentElement;
}
function $9bf71ea28793e738$var$shouldContainFocus(scopeRef) {
	let scope = $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode($9bf71ea28793e738$var$activeScope);
	for (; scope && scope.scopeRef !== scopeRef;) {
		if (scope.contain) return !1;
		scope = scope.parent;
	}
	return !0;
}
function $9bf71ea28793e738$var$isTabbableRadio(element) {
	if (element.checked) return !0;
	let radios = [];
	if (!element.form) radios = [...$431fbd86ca7dc216$export$b204af158042fbac(element).querySelectorAll(`input[type="radio"][name="${CSS.escape(element.name)}"]`)].filter((radio) => !radio.form);
	else {
		var _element_form_elements, _element_form;
		radios = [...((_element_form = element.form) === null || _element_form === void 0 || (_element_form_elements = _element_form.elements) === null || _element_form_elements === void 0 ? void 0 : _element_form_elements.namedItem(element.name)) ?? []];
	}
	return radios ? !radios.some((radio) => radio.checked) : !1;
}
function $9bf71ea28793e738$var$useFocusContainment(scopeRef, contain) {
	let focusedNode = (0, import_react$63.useRef)(void 0), raf = (0, import_react$63.useRef)(void 0);
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		let scope = scopeRef.current;
		if (!contain) {
			raf.current && (cancelAnimationFrame(raf.current), raf.current = void 0);
			return;
		}
		let ownerDocument = $431fbd86ca7dc216$export$b204af158042fbac(scope ? scope[0] : void 0), onKeyDown = (e) => {
			if (e.key !== "Tab" || e.altKey || e.ctrlKey || e.metaKey || !$9bf71ea28793e738$var$shouldContainFocus(scopeRef) || e.isComposing) return;
			let focusedElement = $d4ee10de306f2510$export$cd4e5573fbe2b576(ownerDocument), scope2 = scopeRef.current;
			if (!scope2 || !$9bf71ea28793e738$var$isElementInScope(focusedElement, scope2)) return;
			let walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa($9bf71ea28793e738$var$getScopeRoot(scope2), { tabbable: !0 }, scope2);
			if (!focusedElement) return;
			walker.currentNode = focusedElement;
			let nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
			nextElement || (walker.currentNode = e.shiftKey ? scope2[scope2.length - 1].nextElementSibling : scope2[0].previousElementSibling, nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode()), e.preventDefault(), nextElement && $9bf71ea28793e738$var$focusElement(nextElement, !0);
		}, onFocus = (e) => {
			(!$9bf71ea28793e738$var$activeScope || $9bf71ea28793e738$var$isAncestorScope($9bf71ea28793e738$var$activeScope, scopeRef)) && $9bf71ea28793e738$var$isElementInScope($d4ee10de306f2510$export$e58f029f0fbfdb29(e), scopeRef.current) ? ($9bf71ea28793e738$var$activeScope = scopeRef, focusedNode.current = $d4ee10de306f2510$export$e58f029f0fbfdb29(e)) : $9bf71ea28793e738$var$shouldContainFocus(scopeRef) && !$9bf71ea28793e738$var$isElementInChildScope($d4ee10de306f2510$export$e58f029f0fbfdb29(e), scopeRef) ? focusedNode.current ? focusedNode.current.focus() : $9bf71ea28793e738$var$activeScope && $9bf71ea28793e738$var$activeScope.current && $9bf71ea28793e738$var$focusFirstInScope($9bf71ea28793e738$var$activeScope.current) : $9bf71ea28793e738$var$shouldContainFocus(scopeRef) && (focusedNode.current = $d4ee10de306f2510$export$e58f029f0fbfdb29(e));
		}, onBlur = (e) => {
			raf.current && cancelAnimationFrame(raf.current), raf.current = requestAnimationFrame(() => {
				let modality = $507fabe10e71c6fb$export$630ff653c5ada6a9(), shouldSkipFocusRestore = (modality === "virtual" || modality === null) && $c87311424ea30a05$export$a11b0059900ceec8() && $c87311424ea30a05$export$6446a186d09e379e(), activeElement = $d4ee10de306f2510$export$cd4e5573fbe2b576(ownerDocument);
				if (!shouldSkipFocusRestore && activeElement && $9bf71ea28793e738$var$shouldContainFocus(scopeRef) && !$9bf71ea28793e738$var$isElementInChildScope(activeElement, scopeRef)) {
					$9bf71ea28793e738$var$activeScope = scopeRef;
					let target = $d4ee10de306f2510$export$e58f029f0fbfdb29(e);
					if (target && target.isConnected) {
						var _focusedNode_current;
						focusedNode.current = target, (_focusedNode_current = focusedNode.current) === null || _focusedNode_current === void 0 || _focusedNode_current.focus();
					} else $9bf71ea28793e738$var$activeScope.current && $9bf71ea28793e738$var$focusFirstInScope($9bf71ea28793e738$var$activeScope.current);
				}
			});
		};
		return ownerDocument.addEventListener("keydown", onKeyDown, !1), ownerDocument.addEventListener("focusin", onFocus, !1), scope?.forEach((element) => element.addEventListener("focusin", onFocus, !1)), scope?.forEach((element) => element.addEventListener("focusout", onBlur, !1)), () => {
			ownerDocument.removeEventListener("keydown", onKeyDown, !1), ownerDocument.removeEventListener("focusin", onFocus, !1), scope?.forEach((element) => element.removeEventListener("focusin", onFocus, !1)), scope?.forEach((element) => element.removeEventListener("focusout", onBlur, !1));
		};
	}, [scopeRef, contain]), $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => () => {
		raf.current && cancelAnimationFrame(raf.current);
	}, [raf]);
}
function $9bf71ea28793e738$var$isElementInAnyScope(element) {
	return $9bf71ea28793e738$var$isElementInChildScope(element);
}
function $9bf71ea28793e738$var$isElementInScope(element, scope) {
	return !element || !scope ? !1 : scope.some((node) => node.contains(element));
}
function $9bf71ea28793e738$var$isElementInChildScope(element, scope = null) {
	if (element instanceof Element && element.closest("[data-react-aria-top-layer]")) return !0;
	for (let { scopeRef: s } of $9bf71ea28793e738$export$d06fae2ee68b101e.traverse($9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(scope))) if (s && $9bf71ea28793e738$var$isElementInScope(element, s.current)) return !0;
	return !1;
}
function $9bf71ea28793e738$export$1258395f99bf9cbf(element) {
	return $9bf71ea28793e738$var$isElementInChildScope(element, $9bf71ea28793e738$var$activeScope);
}
function $9bf71ea28793e738$var$isAncestorScope(ancestor, scope) {
	var _focusScopeTree_getTreeNode;
	let parent = (_focusScopeTree_getTreeNode = $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(scope)) === null || _focusScopeTree_getTreeNode === void 0 ? void 0 : _focusScopeTree_getTreeNode.parent;
	for (; parent;) {
		if (parent.scopeRef === ancestor) return !0;
		parent = parent.parent;
	}
	return !1;
}
function $9bf71ea28793e738$var$focusElement(element, scroll = !1) {
	if (element != null && !scroll) try {
		$3ad3f6e1647bc98d$export$80f3e147d781571c(element);
	} catch {}
	else if (element != null) try {
		element.focus();
	} catch {}
}
function $9bf71ea28793e738$var$getFirstInScope(scope, tabbable = !0) {
	let sentinel = scope[0].previousElementSibling, scopeRoot = $9bf71ea28793e738$var$getScopeRoot(scope), walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa(scopeRoot, { tabbable }, scope);
	walker.currentNode = sentinel;
	let nextNode = walker.nextNode();
	return tabbable && !nextNode && (scopeRoot = $9bf71ea28793e738$var$getScopeRoot(scope), walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa(scopeRoot, { tabbable: !1 }, scope), walker.currentNode = sentinel, nextNode = walker.nextNode()), nextNode;
}
function $9bf71ea28793e738$var$focusFirstInScope(scope, tabbable = !0) {
	$9bf71ea28793e738$var$focusElement($9bf71ea28793e738$var$getFirstInScope(scope, tabbable));
}
function $9bf71ea28793e738$var$useAutoFocus(scopeRef, autoFocus) {
	let autoFocusRef = import_react$63.useRef(autoFocus);
	(0, import_react$63.useEffect)(() => {
		if (autoFocusRef.current) {
			$9bf71ea28793e738$var$activeScope = scopeRef;
			!$9bf71ea28793e738$var$isElementInScope($d4ee10de306f2510$export$cd4e5573fbe2b576($431fbd86ca7dc216$export$b204af158042fbac(scopeRef.current ? scopeRef.current[0] : void 0)), $9bf71ea28793e738$var$activeScope.current) && scopeRef.current && $9bf71ea28793e738$var$focusFirstInScope(scopeRef.current);
		}
		autoFocusRef.current = !1;
	}, [scopeRef]);
}
function $9bf71ea28793e738$var$useActiveScopeTracker(scopeRef, restore, contain) {
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		if (restore || contain) return;
		let scope = scopeRef.current, ownerDocument = $431fbd86ca7dc216$export$b204af158042fbac(scope ? scope[0] : void 0), onFocus = (e) => {
			let target = $d4ee10de306f2510$export$e58f029f0fbfdb29(e);
			$9bf71ea28793e738$var$isElementInScope(target, scopeRef.current) ? $9bf71ea28793e738$var$activeScope = scopeRef : $9bf71ea28793e738$var$isElementInAnyScope(target) || ($9bf71ea28793e738$var$activeScope = null);
		};
		return ownerDocument.addEventListener("focusin", onFocus, !1), scope?.forEach((element) => element.addEventListener("focusin", onFocus, !1)), () => {
			ownerDocument.removeEventListener("focusin", onFocus, !1), scope?.forEach((element) => element.removeEventListener("focusin", onFocus, !1));
		};
	}, [
		scopeRef,
		restore,
		contain
	]);
}
function $9bf71ea28793e738$var$shouldRestoreFocus(scopeRef) {
	let scope = $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode($9bf71ea28793e738$var$activeScope);
	for (; scope && scope.scopeRef !== scopeRef;) {
		if (scope.nodeToRestore) return !1;
		scope = scope.parent;
	}
	return scope?.scopeRef === scopeRef;
}
function $9bf71ea28793e738$var$useRestoreFocus(scopeRef, restoreFocus, contain) {
	let nodeToRestoreRef = (0, import_react$63.useRef)(typeof document < "u" ? $d4ee10de306f2510$export$cd4e5573fbe2b576($431fbd86ca7dc216$export$b204af158042fbac(scopeRef.current ? scopeRef.current[0] : void 0)) : null);
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		let scope = scopeRef.current, ownerDocument = $431fbd86ca7dc216$export$b204af158042fbac(scope ? scope[0] : void 0);
		if (!restoreFocus || contain) return;
		let onFocus = () => {
			(!$9bf71ea28793e738$var$activeScope || $9bf71ea28793e738$var$isAncestorScope($9bf71ea28793e738$var$activeScope, scopeRef)) && $9bf71ea28793e738$var$isElementInScope($d4ee10de306f2510$export$cd4e5573fbe2b576(ownerDocument), scopeRef.current) && ($9bf71ea28793e738$var$activeScope = scopeRef);
		};
		return ownerDocument.addEventListener("focusin", onFocus, !1), scope?.forEach((element) => element.addEventListener("focusin", onFocus, !1)), () => {
			ownerDocument.removeEventListener("focusin", onFocus, !1), scope?.forEach((element) => element.removeEventListener("focusin", onFocus, !1));
		};
	}, [scopeRef, contain]), $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		let ownerDocument = $431fbd86ca7dc216$export$b204af158042fbac(scopeRef.current ? scopeRef.current[0] : void 0);
		if (!restoreFocus) return;
		let onKeyDown = (e) => {
			if (e.key !== "Tab" || e.altKey || e.ctrlKey || e.metaKey || !$9bf71ea28793e738$var$shouldContainFocus(scopeRef) || e.isComposing) return;
			let focusedElement = ownerDocument.activeElement;
			if (!$9bf71ea28793e738$var$isElementInChildScope(focusedElement, scopeRef) || !$9bf71ea28793e738$var$shouldRestoreFocus(scopeRef)) return;
			let treeNode = $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(scopeRef);
			if (!treeNode) return;
			let nodeToRestore = treeNode.nodeToRestore, walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa(ownerDocument.body, { tabbable: !0 });
			walker.currentNode = focusedElement;
			let nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
			if ((!nodeToRestore || !nodeToRestore.isConnected || nodeToRestore === ownerDocument.body) && (nodeToRestore = void 0, treeNode.nodeToRestore = void 0), (!nextElement || !$9bf71ea28793e738$var$isElementInChildScope(nextElement, scopeRef)) && nodeToRestore) {
				walker.currentNode = nodeToRestore;
				do
					nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
				while ($9bf71ea28793e738$var$isElementInChildScope(nextElement, scopeRef));
				e.preventDefault(), e.stopPropagation(), nextElement ? $9bf71ea28793e738$var$focusElement(nextElement, !0) : $9bf71ea28793e738$var$isElementInAnyScope(nodeToRestore) ? $9bf71ea28793e738$var$focusElement(nodeToRestore, !0) : focusedElement.blur();
			}
		};
		return contain || ownerDocument.addEventListener("keydown", onKeyDown, !0), () => {
			contain || ownerDocument.removeEventListener("keydown", onKeyDown, !0);
		};
	}, [
		scopeRef,
		restoreFocus,
		contain
	]), $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		let ownerDocument = $431fbd86ca7dc216$export$b204af158042fbac(scopeRef.current ? scopeRef.current[0] : void 0);
		if (!restoreFocus) return;
		let treeNode = $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(scopeRef);
		if (treeNode) {
			var _nodeToRestoreRef_current;
			return treeNode.nodeToRestore = (_nodeToRestoreRef_current = nodeToRestoreRef.current) !== null && _nodeToRestoreRef_current !== void 0 ? _nodeToRestoreRef_current : void 0, () => {
				let treeNode2 = $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(scopeRef);
				if (!treeNode2) return;
				let nodeToRestore = treeNode2.nodeToRestore, activeElement = $d4ee10de306f2510$export$cd4e5573fbe2b576(ownerDocument);
				if (restoreFocus && nodeToRestore && (activeElement && $9bf71ea28793e738$var$isElementInChildScope(activeElement, scopeRef) || activeElement === ownerDocument.body && $9bf71ea28793e738$var$shouldRestoreFocus(scopeRef))) {
					let clonedTree = $9bf71ea28793e738$export$d06fae2ee68b101e.clone();
					requestAnimationFrame(() => {
						if (ownerDocument.activeElement === ownerDocument.body) {
							let treeNode3 = clonedTree.getTreeNode(scopeRef);
							for (; treeNode3;) {
								if (treeNode3.nodeToRestore && treeNode3.nodeToRestore.isConnected) {
									$9bf71ea28793e738$var$restoreFocusToElement(treeNode3.nodeToRestore);
									return;
								}
								treeNode3 = treeNode3.parent;
							}
							for (treeNode3 = clonedTree.getTreeNode(scopeRef); treeNode3;) {
								if (treeNode3.scopeRef && treeNode3.scopeRef.current && $9bf71ea28793e738$export$d06fae2ee68b101e.getTreeNode(treeNode3.scopeRef)) {
									$9bf71ea28793e738$var$restoreFocusToElement($9bf71ea28793e738$var$getFirstInScope(treeNode3.scopeRef.current, !0));
									return;
								}
								treeNode3 = treeNode3.parent;
							}
						}
					});
				}
			};
		}
	}, [scopeRef, restoreFocus]);
}
function $9bf71ea28793e738$var$restoreFocusToElement(node) {
	node.dispatchEvent(new CustomEvent($9bf71ea28793e738$var$RESTORE_FOCUS_EVENT, {
		bubbles: !0,
		cancelable: !0
	})) && $9bf71ea28793e738$var$focusElement(node);
}
function $9bf71ea28793e738$export$2d6ec8fc375ceafa(root, opts, scope) {
	let filter = opts?.tabbable ? $b4b717babfbb907b$export$bebd5a1431fec25d : $b4b717babfbb907b$export$4c063cf1350e6fed, doc = $431fbd86ca7dc216$export$b204af158042fbac(root?.nodeType === Node.ELEMENT_NODE ? root : null), walker = $dfc540311bf7f109$export$4d0f8be8b12a7ef6(doc, root || doc, NodeFilter.SHOW_ELEMENT, { acceptNode(node) {
		var _opts_from;
		return !(opts == null || (_opts_from = opts.from) === null || _opts_from === void 0) && _opts_from.contains(node) || opts?.tabbable && node.tagName === "INPUT" && node.getAttribute("type") === "radio" && (!$9bf71ea28793e738$var$isTabbableRadio(node) || walker.currentNode.tagName === "INPUT" && walker.currentNode.type === "radio" && walker.currentNode.name === node.name) ? NodeFilter.FILTER_REJECT : filter(node) && (!scope || $9bf71ea28793e738$var$isElementInScope(node, scope)) && (!opts?.accept || opts.accept(node)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	return opts?.from && (walker.currentNode = opts.from), walker;
}
function $9bf71ea28793e738$export$c5251b9e124bf29(ref, defaultOptions = {}) {
	return {
		focusNext(opts = {}) {
			let root = ref.current;
			if (!root) return null;
			let { from, tabbable = defaultOptions.tabbable, wrap = defaultOptions.wrap, accept = defaultOptions.accept } = opts, node = from || $d4ee10de306f2510$export$cd4e5573fbe2b576($431fbd86ca7dc216$export$b204af158042fbac(root)), walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa(root, {
				tabbable,
				accept
			});
			root.contains(node) && (walker.currentNode = node);
			let nextNode = walker.nextNode();
			return !nextNode && wrap && (walker.currentNode = root, nextNode = walker.nextNode()), nextNode && $9bf71ea28793e738$var$focusElement(nextNode, !0), nextNode;
		},
		focusPrevious(opts = defaultOptions) {
			let root = ref.current;
			if (!root) return null;
			let { from, tabbable = defaultOptions.tabbable, wrap = defaultOptions.wrap, accept = defaultOptions.accept } = opts, node = from || $d4ee10de306f2510$export$cd4e5573fbe2b576($431fbd86ca7dc216$export$b204af158042fbac(root)), walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa(root, {
				tabbable,
				accept
			});
			if (root.contains(node)) walker.currentNode = node;
			else {
				let next = $9bf71ea28793e738$var$last(walker);
				return next && $9bf71ea28793e738$var$focusElement(next, !0), next ?? null;
			}
			let previousNode = walker.previousNode();
			if (!previousNode && wrap) {
				walker.currentNode = root;
				let lastNode = $9bf71ea28793e738$var$last(walker);
				if (!lastNode) return null;
				previousNode = lastNode;
			}
			return previousNode && $9bf71ea28793e738$var$focusElement(previousNode, !0), previousNode ?? null;
		},
		focusFirst(opts = defaultOptions) {
			let root = ref.current;
			if (!root) return null;
			let { tabbable = defaultOptions.tabbable, accept = defaultOptions.accept } = opts, nextNode = $9bf71ea28793e738$export$2d6ec8fc375ceafa(root, {
				tabbable,
				accept
			}).nextNode();
			return nextNode && $9bf71ea28793e738$var$focusElement(nextNode, !0), nextNode;
		},
		focusLast(opts = defaultOptions) {
			let root = ref.current;
			if (!root) return null;
			let { tabbable = defaultOptions.tabbable, accept = defaultOptions.accept } = opts, next = $9bf71ea28793e738$var$last($9bf71ea28793e738$export$2d6ec8fc375ceafa(root, {
				tabbable,
				accept
			}));
			return next && $9bf71ea28793e738$var$focusElement(next, !0), next ?? null;
		}
	};
}
function $9bf71ea28793e738$var$last(walker) {
	let next, last;
	do
		last = walker.lastChild(), last && (next = last);
	while (last);
	return next;
}
function $f7dceffc5ad7768b$export$4e328f61c538687f(props = {}) {
	let { autoFocus = !1, isTextInput, within } = props, state = (0, import_react$64.useRef)({
		isFocused: !1,
		isFocusVisible: autoFocus || $507fabe10e71c6fb$export$b9b3dfddab17db27()
	}), [isFocused, setFocused] = (0, import_react$64.useState)(!1), [isFocusVisibleState, setFocusVisible] = (0, import_react$64.useState)(() => state.current.isFocused && state.current.isFocusVisible), updateState2 = (0, import_react$64.useCallback)(() => setFocusVisible(state.current.isFocused && state.current.isFocusVisible), []), onFocusChange = (0, import_react$64.useCallback)((isFocused2) => {
		state.current.isFocused = isFocused2, setFocused(isFocused2), updateState2();
	}, [updateState2]);
	$507fabe10e71c6fb$export$ec71b4b83ac08ec3((isFocusVisible) => {
		state.current.isFocusVisible = isFocusVisible, updateState2();
	}, [], { isTextInput });
	let { focusProps } = $a1ea59d68270f0dd$export$f8168d8dd8fd66e6({
		isDisabled: within,
		onFocusChange
	}), { focusWithinProps } = $9ab94262bd0047c7$export$420e68273165f4ec({
		isDisabled: !within,
		onFocusWithinChange: onFocusChange
	});
	return {
		isFocused,
		isFocusVisible: isFocusVisibleState,
		focusProps: within ? focusWithinProps : focusProps
	};
}
function $83013635b024ae3d$export$eac1895992b9f3d6(ref, options) {
	let isDisabled = options?.isDisabled, [hasTabbableChild, setHasTabbableChild] = (0, import_react$66.useState)(!1);
	return $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		if (ref?.current && !isDisabled) {
			let update = () => {
				if (ref.current) {
					let walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa(ref.current, { tabbable: !0 });
					setHasTabbableChild(!!walker.nextNode());
				}
			};
			update();
			let observer = new MutationObserver(update);
			return observer.observe(ref.current, {
				subtree: !0,
				childList: !0,
				attributes: !0,
				attributeFilter: ["tabIndex", "disabled"]
			}), () => {
				observer.disconnect();
			};
		}
	}), isDisabled ? !1 : hasTabbableChild;
}
function $55f9b1ae81f22853$export$76e4e37e5339496d(to) {
	let from = $55f9b1ae81f22853$export$759df0d867455a91($431fbd86ca7dc216$export$b204af158042fbac(to));
	from !== to && (from && $55f9b1ae81f22853$export$6c5dc7e81d2cc29a(from, to), to && $55f9b1ae81f22853$export$2b35b76d2e30e129(to, from));
}
function $55f9b1ae81f22853$export$6c5dc7e81d2cc29a(from, to) {
	from.dispatchEvent(new FocusEvent("blur", { relatedTarget: to })), from.dispatchEvent(new FocusEvent("focusout", {
		bubbles: !0,
		relatedTarget: to
	}));
}
function $55f9b1ae81f22853$export$2b35b76d2e30e129(to, from) {
	to.dispatchEvent(new FocusEvent("focus", { relatedTarget: from })), to.dispatchEvent(new FocusEvent("focusin", {
		bubbles: !0,
		relatedTarget: from
	}));
}
function $55f9b1ae81f22853$export$759df0d867455a91(document4) {
	let activeElement = $d4ee10de306f2510$export$cd4e5573fbe2b576(document4), activeDescendant = activeElement?.getAttribute("aria-activedescendant");
	return activeDescendant && document4.getElementById(activeDescendant) || activeElement;
}
function $a11501f3d1d39e6c$export$ea8f71083e90600f(props, ref) {
	let { onClose, shouldCloseOnBlur, isOpen, isDismissable = !1, isKeyboardDismissDisabled = !1, shouldCloseOnInteractOutside } = props;
	(0, import_react$67.useEffect)(() => {
		if (isOpen && !$a11501f3d1d39e6c$var$visibleOverlays.includes(ref)) return $a11501f3d1d39e6c$var$visibleOverlays.push(ref), () => {
			let index3 = $a11501f3d1d39e6c$var$visibleOverlays.indexOf(ref);
			index3 >= 0 && $a11501f3d1d39e6c$var$visibleOverlays.splice(index3, 1);
		};
	}, [isOpen, ref]);
	let onHide = () => {
		$a11501f3d1d39e6c$var$visibleOverlays[$a11501f3d1d39e6c$var$visibleOverlays.length - 1] === ref && onClose && onClose();
	}, onInteractOutsideStart = (e) => {
		(!shouldCloseOnInteractOutside || shouldCloseOnInteractOutside(e.target)) && $a11501f3d1d39e6c$var$visibleOverlays[$a11501f3d1d39e6c$var$visibleOverlays.length - 1] === ref && (e.stopPropagation(), e.preventDefault());
	}, onInteractOutside = (e) => {
		(!shouldCloseOnInteractOutside || shouldCloseOnInteractOutside(e.target)) && ($a11501f3d1d39e6c$var$visibleOverlays[$a11501f3d1d39e6c$var$visibleOverlays.length - 1] === ref && (e.stopPropagation(), e.preventDefault()), onHide());
	}, onKeyDown = (e) => {
		e.key === "Escape" && !isKeyboardDismissDisabled && !e.nativeEvent.isComposing && (e.stopPropagation(), e.preventDefault(), onHide());
	};
	$e0b6e0b68ec7f50f$export$872b660ac5a1ff98({
		ref,
		onInteractOutside: isDismissable && isOpen ? onInteractOutside : void 0,
		onInteractOutsideStart
	});
	let { focusWithinProps } = $9ab94262bd0047c7$export$420e68273165f4ec({
		isDisabled: !shouldCloseOnBlur,
		onBlurWithin: (e) => {
			!e.relatedTarget || $9bf71ea28793e738$export$1258395f99bf9cbf(e.relatedTarget) || (!shouldCloseOnInteractOutside || shouldCloseOnInteractOutside(e.relatedTarget)) && onClose?.();
		}
	}), onPointerDownUnderlay = (e) => {
		e.target === e.currentTarget && e.preventDefault();
	};
	return {
		overlayProps: {
			onKeyDown,
			...focusWithinProps
		},
		underlayProps: { onPointerDown: onPointerDownUnderlay }
	};
}
function $628037886ba31236$export$f9d5c8beee7d008d(props, state, ref) {
	let { type } = props, { isOpen } = state;
	(0, import_react$68.useEffect)(() => {
		ref && ref.current && $dd149f63282afbbf$export$f6211563215e3b37.set(ref.current, state.close);
	});
	let ariaHasPopup;
	type === "menu" ? ariaHasPopup = !0 : type === "listbox" && (ariaHasPopup = "listbox");
	let overlayId = $bdb11010cef70236$export$f680877a34711e37();
	return {
		triggerProps: {
			"aria-haspopup": ariaHasPopup,
			"aria-expanded": isOpen,
			"aria-controls": isOpen ? overlayId : void 0,
			onPress: state.toggle
		},
		overlayProps: { id: overlayId }
	};
}
function $49c51c25361d4cd2$export$ee0f7cc6afcd1c18(options = {}) {
	let { isDisabled } = options;
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		if (!isDisabled) return $49c51c25361d4cd2$var$preventScrollCount++, $49c51c25361d4cd2$var$preventScrollCount === 1 && ($c87311424ea30a05$export$fedb369cb70207f1() ? $49c51c25361d4cd2$var$restore = $49c51c25361d4cd2$var$preventScrollMobileSafari() : $49c51c25361d4cd2$var$restore = $49c51c25361d4cd2$var$preventScrollStandard()), () => {
			$49c51c25361d4cd2$var$preventScrollCount--, $49c51c25361d4cd2$var$preventScrollCount === 0 && $49c51c25361d4cd2$var$restore();
		};
	}, [isDisabled]);
}
function $49c51c25361d4cd2$var$preventScrollStandard() {
	let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
	return $ff5963eb1fccf552$export$e08e3b67e392101e(scrollbarWidth > 0 && ("scrollbarGutter" in document.documentElement.style ? $49c51c25361d4cd2$var$setStyle(document.documentElement, "scrollbarGutter", "stable") : $49c51c25361d4cd2$var$setStyle(document.documentElement, "paddingRight", `${scrollbarWidth}px`)), $49c51c25361d4cd2$var$setStyle(document.documentElement, "overflow", "hidden"));
}
function $49c51c25361d4cd2$var$preventScrollMobileSafari() {
	let scrollable, allowTouchMove = !1, onTouchStart = (e) => {
		let target = e.target;
		scrollable = $cc38e7bd3fc7b213$export$2bb74740c4e19def(target) ? target : $62d8ded9296f3872$export$cfa2225e87938781(target, !0), allowTouchMove = !1;
		let selection = target.ownerDocument.defaultView.getSelection();
		selection && !selection.isCollapsed && selection.containsNode(target, !0) && (allowTouchMove = !0), "selectionStart" in target && "selectionEnd" in target && target.selectionStart < target.selectionEnd && target.ownerDocument.activeElement === target && (allowTouchMove = !0);
	}, style = document.createElement("style");
	style.textContent = `
@layer {
  * {
    overscroll-behavior: contain;
  }
}`.trim(), document.head.prepend(style);
	let onTouchMove = (e) => {
		if (!(e.touches.length === 2 || allowTouchMove)) {
			if (!scrollable || scrollable === document.documentElement || scrollable === document.body) {
				e.preventDefault();
				return;
			}
			scrollable.scrollHeight === scrollable.clientHeight && scrollable.scrollWidth === scrollable.clientWidth && e.preventDefault();
		}
	}, onBlur = (e) => {
		let target = e.target, relatedTarget = e.relatedTarget;
		if (relatedTarget && $21f1aa98acb08317$export$c57958e35f31ed73(relatedTarget)) relatedTarget.focus({ preventScroll: !0 }), $49c51c25361d4cd2$var$scrollIntoViewWhenReady(relatedTarget, $21f1aa98acb08317$export$c57958e35f31ed73(target));
		else if (!relatedTarget) {
			var _target_parentElement;
			((_target_parentElement = target.parentElement) === null || _target_parentElement === void 0 ? void 0 : _target_parentElement.closest("[tabindex]"))?.focus({ preventScroll: !0 });
		}
	}, focus = HTMLElement.prototype.focus;
	HTMLElement.prototype.focus = function(opts) {
		let wasKeyboardVisible = document.activeElement != null && $21f1aa98acb08317$export$c57958e35f31ed73(document.activeElement);
		focus.call(this, {
			...opts,
			preventScroll: !0
		}), (!opts || !opts.preventScroll) && $49c51c25361d4cd2$var$scrollIntoViewWhenReady(this, wasKeyboardVisible);
	};
	let removeEvents = $ff5963eb1fccf552$export$e08e3b67e392101e($49c51c25361d4cd2$var$addEvent(document, "touchstart", onTouchStart, {
		passive: !1,
		capture: !0
	}), $49c51c25361d4cd2$var$addEvent(document, "touchmove", onTouchMove, {
		passive: !1,
		capture: !0
	}), $49c51c25361d4cd2$var$addEvent(document, "blur", onBlur, !0));
	return () => {
		removeEvents(), style.remove(), HTMLElement.prototype.focus = focus;
	};
}
function $49c51c25361d4cd2$var$setStyle(element, style, value) {
	let cur = element.style[style];
	return element.style[style] = value, () => {
		element.style[style] = cur;
	};
}
function $49c51c25361d4cd2$var$addEvent(target, event, handler, options) {
	return target.addEventListener(event, handler, options), () => {
		target.removeEventListener(event, handler, options);
	};
}
function $49c51c25361d4cd2$var$scrollIntoViewWhenReady(target, wasKeyboardVisible) {
	wasKeyboardVisible || !$49c51c25361d4cd2$var$visualViewport ? $49c51c25361d4cd2$var$scrollIntoView(target) : $49c51c25361d4cd2$var$visualViewport.addEventListener("resize", () => $49c51c25361d4cd2$var$scrollIntoView(target), { once: !0 });
}
function $49c51c25361d4cd2$var$scrollIntoView(target) {
	let root = document.scrollingElement || document.documentElement, nextTarget = target;
	for (; nextTarget && nextTarget !== root;) {
		let scrollable = $62d8ded9296f3872$export$cfa2225e87938781(nextTarget);
		if (scrollable !== document.documentElement && scrollable !== document.body && scrollable !== nextTarget) {
			let scrollableRect = scrollable.getBoundingClientRect(), targetRect = nextTarget.getBoundingClientRect();
			if (targetRect.top < scrollableRect.top || targetRect.bottom > scrollableRect.top + nextTarget.clientHeight) {
				let bottom = scrollableRect.bottom;
				$49c51c25361d4cd2$var$visualViewport && (bottom = Math.min(bottom, $49c51c25361d4cd2$var$visualViewport.offsetTop + $49c51c25361d4cd2$var$visualViewport.height));
				let adjustment = targetRect.top - scrollableRect.top - ((bottom - scrollableRect.top) / 2 - targetRect.height / 2);
				scrollable.scrollTo({
					top: Math.max(0, Math.min(scrollable.scrollHeight - scrollable.clientHeight, scrollable.scrollTop + adjustment)),
					behavior: "smooth"
				});
			}
		}
		nextTarget = scrollable.parentElement;
	}
}
function $96b38030c423d352$export$9fc1347d4195ccb3() {
	var _useContext;
	return (_useContext = (0, import_react$69.useContext)($96b38030c423d352$export$60d741e20e0aa309)) !== null && _useContext !== void 0 ? _useContext : {};
}
function $f57aed4a881a3485$export$178405afcd8c5eb(props) {
	let { children } = props, parent = (0, import_react$70.useContext)($f57aed4a881a3485$var$Context), [modalCount, setModalCount] = (0, import_react$70.useState)(0), context = (0, import_react$70.useMemo)(() => ({
		parent,
		modalCount,
		addModal() {
			setModalCount((count) => count + 1), parent && parent.addModal();
		},
		removeModal() {
			setModalCount((count) => count - 1), parent && parent.removeModal();
		}
	}), [parent, modalCount]);
	return import_react$70.createElement($f57aed4a881a3485$var$Context.Provider, { value: context }, children);
}
function $f57aed4a881a3485$export$d9aaed4c3ece1bc0() {
	let context = (0, import_react$70.useContext)($f57aed4a881a3485$var$Context);
	return { modalProviderProps: { "aria-hidden": context && context.modalCount > 0 ? !0 : void 0 } };
}
function $f57aed4a881a3485$var$OverlayContainerDOM(props) {
	let { modalProviderProps } = $f57aed4a881a3485$export$d9aaed4c3ece1bc0();
	return import_react$70.createElement("div", {
		"data-overlay-container": !0,
		...props,
		...modalProviderProps
	});
}
function $f57aed4a881a3485$export$bf688221f59024e5(props) {
	return import_react$70.createElement($f57aed4a881a3485$export$178405afcd8c5eb, null, import_react$70.createElement($f57aed4a881a3485$var$OverlayContainerDOM, props));
}
function $f57aed4a881a3485$export$b47c3594eab58386(props) {
	let isSSR = $b5e257d569688ac6$export$535bd6ca7f90a273(), { portalContainer = isSSR ? null : document.body, ...rest } = props, { getContainer } = $96b38030c423d352$export$9fc1347d4195ccb3();
	if (!props.portalContainer && getContainer && (portalContainer = getContainer()), import_react$70.useEffect(() => {
		if (portalContainer?.closest("[data-overlay-container]")) throw new Error("An OverlayContainer must not be inside another container. Please change the portalContainer prop.");
	}, [portalContainer]), !portalContainer) return null;
	let contents = import_react$70.createElement($f57aed4a881a3485$export$bf688221f59024e5, rest);
	return import_react_dom$2.createPortal(contents, portalContainer);
}
function $5c3e21d68f1c4674$export$a966af930f325cab(props = {}) {
	let { style, isFocusable } = props, [isFocused, setFocused] = (0, import_react$72.useState)(!1), { focusWithinProps } = $9ab94262bd0047c7$export$420e68273165f4ec({
		isDisabled: !isFocusable,
		onFocusWithinChange: (val) => setFocused(val)
	}), combinedStyles = (0, import_react$72.useMemo)(() => isFocused ? style : style ? {
		...$5c3e21d68f1c4674$var$styles,
		...style
	} : $5c3e21d68f1c4674$var$styles, [isFocused]);
	return { visuallyHiddenProps: {
		...focusWithinProps,
		style: combinedStyles
	} };
}
function $5c3e21d68f1c4674$export$439d29a4e110a164(props) {
	let { children, elementType: Element2 = "div", isFocusable, style, ...otherProps } = props, { visuallyHiddenProps } = $5c3e21d68f1c4674$export$a966af930f325cab(props);
	return import_react$72.createElement(Element2, $3ef42575df84b30b$export$9d1611c77c2fe928(otherProps, visuallyHiddenProps), children);
}
function $parcel$interopDefault(a) {
	return a && a.__esModule ? a.default : a;
}
function $86ea4cb521eb2e37$export$2317d149ed6f78c4(props) {
	let { onDismiss, ...otherProps } = props, labels = $313b98861ee5dd6c$export$d6875122194c7b44(otherProps, $fca6afa0e843324b$export$f12b703ca79dfbb1($parcel$interopDefault($a2f21f5f14f60553$exports), "@react-aria/overlays").format("dismiss")), onClick = () => {
		onDismiss && onDismiss();
	};
	return import_react$71.createElement($5c3e21d68f1c4674$export$439d29a4e110a164, null, import_react$71.createElement("button", {
		...labels,
		tabIndex: -1,
		onClick,
		style: {
			width: 1,
			height: 1
		}
	}));
}
function $5e3802645cc19319$export$1c3ebcada18427bf(targets, options) {
	let windowObj = $431fbd86ca7dc216$export$f21a1ffae260145a(targets?.[0]), opts = options instanceof windowObj.Element ? { root: options } : options;
	var _opts_root;
	let root = (_opts_root = opts?.root) !== null && _opts_root !== void 0 ? _opts_root : document.body, shouldUseInert = opts?.shouldUseInert && $5e3802645cc19319$var$supportsInert, visibleNodes = new Set(targets), hiddenNodes = /* @__PURE__ */ new Set(), getHidden = (element) => shouldUseInert && element instanceof windowObj.HTMLElement ? element.inert : element.getAttribute("aria-hidden") === "true", setHidden = (element, hidden) => {
		shouldUseInert && element instanceof windowObj.HTMLElement ? element.inert = hidden : hidden ? element.setAttribute("aria-hidden", "true") : (element.removeAttribute("aria-hidden"), element instanceof windowObj.HTMLElement && (element.inert = !1));
	}, walk = (root2) => {
		for (let element of root2.querySelectorAll("[data-live-announcer], [data-react-aria-top-layer]")) visibleNodes.add(element);
		let acceptNode = (node) => {
			if (hiddenNodes.has(node) || visibleNodes.has(node) || node.parentElement && hiddenNodes.has(node.parentElement) && node.parentElement.getAttribute("role") !== "row") return NodeFilter.FILTER_REJECT;
			for (let target of visibleNodes) if (node.contains(target)) return NodeFilter.FILTER_SKIP;
			return NodeFilter.FILTER_ACCEPT;
		}, walker = document.createTreeWalker(root2, NodeFilter.SHOW_ELEMENT, { acceptNode }), acceptRoot = acceptNode(root2);
		if (acceptRoot === NodeFilter.FILTER_ACCEPT && hide(root2), acceptRoot !== NodeFilter.FILTER_REJECT) {
			let node = walker.nextNode();
			for (; node != null;) hide(node), node = walker.nextNode();
		}
	}, hide = (node) => {
		var _refCountMap_get;
		let refCount = (_refCountMap_get = $5e3802645cc19319$var$refCountMap.get(node)) !== null && _refCountMap_get !== void 0 ? _refCountMap_get : 0;
		getHidden(node) && refCount === 0 || (refCount === 0 && setHidden(node, !0), hiddenNodes.add(node), $5e3802645cc19319$var$refCountMap.set(node, refCount + 1));
	};
	$5e3802645cc19319$var$observerStack.length && $5e3802645cc19319$var$observerStack[$5e3802645cc19319$var$observerStack.length - 1].disconnect(), walk(root);
	let observer = new MutationObserver((changes) => {
		for (let change of changes) if (change.type === "childList" && ![...visibleNodes, ...hiddenNodes].some((node) => node.contains(change.target))) for (let node of change.addedNodes) (node instanceof HTMLElement || node instanceof SVGElement) && (node.dataset.liveAnnouncer === "true" || node.dataset.reactAriaTopLayer === "true") ? visibleNodes.add(node) : node instanceof Element && walk(node);
	});
	observer.observe(root, {
		childList: !0,
		subtree: !0
	});
	let observerWrapper = {
		visibleNodes,
		hiddenNodes,
		observe() {
			observer.observe(root, {
				childList: !0,
				subtree: !0
			});
		},
		disconnect() {
			observer.disconnect();
		}
	};
	return $5e3802645cc19319$var$observerStack.push(observerWrapper), () => {
		observer.disconnect();
		for (let node of hiddenNodes) {
			let count = $5e3802645cc19319$var$refCountMap.get(node);
			count != null && (count === 1 ? (setHidden(node, !1), $5e3802645cc19319$var$refCountMap.delete(node)) : $5e3802645cc19319$var$refCountMap.set(node, count - 1));
		}
		observerWrapper === $5e3802645cc19319$var$observerStack[$5e3802645cc19319$var$observerStack.length - 1] ? ($5e3802645cc19319$var$observerStack.pop(), $5e3802645cc19319$var$observerStack.length && $5e3802645cc19319$var$observerStack[$5e3802645cc19319$var$observerStack.length - 1].observe()) : $5e3802645cc19319$var$observerStack.splice($5e3802645cc19319$var$observerStack.indexOf(observerWrapper), 1);
	};
}
function $5e3802645cc19319$export$1020fa7f77e17884(element) {
	let observer = $5e3802645cc19319$var$observerStack[$5e3802645cc19319$var$observerStack.length - 1];
	if (observer && !observer.visibleNodes.has(element)) return observer.visibleNodes.add(element), () => {
		observer.visibleNodes.delete(element);
	};
}
function $f2f8a6077418541e$export$542a6fd13ac93354(props, state) {
	let { triggerRef, popoverRef, groupRef, isNonModal, isKeyboardDismissDisabled, shouldCloseOnInteractOutside, ...otherProps } = props, isSubmenu = otherProps.trigger === "SubmenuTrigger", { overlayProps, underlayProps } = $a11501f3d1d39e6c$export$ea8f71083e90600f({
		isOpen: state.isOpen,
		onClose: state.close,
		shouldCloseOnBlur: !0,
		isDismissable: !isNonModal || isSubmenu,
		isKeyboardDismissDisabled,
		shouldCloseOnInteractOutside
	}, groupRef ?? popoverRef), { overlayProps: positionProps, arrowProps, placement, triggerAnchorPoint: origin } = $2a41e45df1593e64$export$d39e1813b3bdd0e1({
		...otherProps,
		targetRef: triggerRef,
		overlayRef: popoverRef,
		isOpen: state.isOpen,
		onClose: isNonModal && !isSubmenu ? state.close : null
	});
	return $49c51c25361d4cd2$export$ee0f7cc6afcd1c18({ isDisabled: isNonModal || !state.isOpen }), (0, import_react$73.useEffect)(() => {
		if (state.isOpen && popoverRef.current) {
			var _groupRef_current, _groupRef_current1;
			return isNonModal ? $5e3802645cc19319$export$1020fa7f77e17884((_groupRef_current = groupRef?.current) !== null && _groupRef_current !== void 0 ? _groupRef_current : popoverRef.current) : $5e3802645cc19319$export$1c3ebcada18427bf([(_groupRef_current1 = groupRef?.current) !== null && _groupRef_current1 !== void 0 ? _groupRef_current1 : popoverRef.current], { shouldUseInert: !0 });
		}
	}, [
		isNonModal,
		state.isOpen,
		popoverRef,
		groupRef
	]), {
		popoverProps: $3ef42575df84b30b$export$9d1611c77c2fe928(overlayProps, positionProps),
		arrowProps,
		underlayProps,
		placement,
		triggerAnchorPoint: origin
	};
}
function $337b884510726a0d$export$c6fdb837b070b4ff(props) {
	let isSSR = $b5e257d569688ac6$export$535bd6ca7f90a273(), { portalContainer = isSSR ? null : document.body, isExiting } = props, [contain, setContain] = (0, import_react$74.useState)(!1), contextValue = (0, import_react$74.useMemo)(() => ({
		contain,
		setContain
	}), [contain, setContain]), { getContainer } = $96b38030c423d352$export$9fc1347d4195ccb3();
	if (!props.portalContainer && getContainer && (portalContainer = getContainer()), !portalContainer) return null;
	let contents = props.children;
	return props.disableFocusManagement || (contents = import_react$74.createElement($9bf71ea28793e738$export$20e40289641fbbb6, {
		restoreFocus: !0,
		contain: (props.shouldContainFocus || contain) && !isExiting
	}, contents)), contents = import_react$74.createElement($337b884510726a0d$export$a2200b96afd16271.Provider, { value: contextValue }, import_react$74.createElement($f1ab8c75478c6f73$export$cf75428e0b9ed1ea, null, contents)), import_react_dom$3.createPortal(contents, portalContainer);
}
function $337b884510726a0d$export$14c98a7594375490() {
	let setContain = (0, import_react$74.useContext)($337b884510726a0d$export$a2200b96afd16271)?.setContain;
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		setContain?.(!0);
	}, [setContain]);
}
function $8ac8429251c45e4b$export$dbc0f175b25fb0fb(props, state, ref) {
	let { overlayProps, underlayProps } = $a11501f3d1d39e6c$export$ea8f71083e90600f({
		...props,
		isOpen: state.isOpen,
		onClose: state.close
	}, ref);
	return $49c51c25361d4cd2$export$ee0f7cc6afcd1c18({ isDisabled: !state.isOpen }), $337b884510726a0d$export$14c98a7594375490(), (0, import_react$75.useEffect)(() => {
		if (state.isOpen && ref.current) return $5e3802645cc19319$export$1c3ebcada18427bf([ref.current], { shouldUseInert: !0 });
	}, [state.isOpen, ref]), {
		modalProps: $3ef42575df84b30b$export$9d1611c77c2fe928(overlayProps),
		underlayProps
	};
}
function $fc909762b330b746$export$61c6a8c84e605fb6(props) {
	let [isOpen, setOpen] = $458b0a5536c1a7cf$export$40bfa8c7b0832715(props.isOpen, props.defaultOpen || !1, props.onOpenChange);
	return {
		isOpen,
		setOpen,
		open: (0, import_react$77.useCallback)(() => {
			setOpen(!0);
		}, [setOpen]),
		close: (0, import_react$77.useCallback)(() => {
			setOpen(!1);
		}, [setOpen]),
		toggle: (0, import_react$77.useCallback)(() => {
			setOpen(!isOpen);
		}, [setOpen, isOpen])
	};
}
function $8796f90736e175cb$export$4d40659c25ecb50b(props = {}) {
	let { delay = $8796f90736e175cb$var$TOOLTIP_DELAY, closeDelay = $8796f90736e175cb$var$TOOLTIP_COOLDOWN } = props, { isOpen, open, close } = $fc909762b330b746$export$61c6a8c84e605fb6(props), id = (0, import_react$76.useMemo)(() => `${++$8796f90736e175cb$var$tooltipId}`, []), closeTimeout = (0, import_react$76.useRef)(null), closeCallback = (0, import_react$76.useRef)(close), ensureTooltipEntry = () => {
		$8796f90736e175cb$var$tooltips[id] = hideTooltip;
	}, closeOpenTooltips = () => {
		for (let hideTooltipId in $8796f90736e175cb$var$tooltips) hideTooltipId !== id && ($8796f90736e175cb$var$tooltips[hideTooltipId](!0), delete $8796f90736e175cb$var$tooltips[hideTooltipId]);
	}, showTooltip = () => {
		closeTimeout.current && clearTimeout(closeTimeout.current), closeTimeout.current = null, closeOpenTooltips(), ensureTooltipEntry(), $8796f90736e175cb$var$globalWarmedUp = !0, open(), $8796f90736e175cb$var$globalWarmUpTimeout && (clearTimeout($8796f90736e175cb$var$globalWarmUpTimeout), $8796f90736e175cb$var$globalWarmUpTimeout = null), $8796f90736e175cb$var$globalCooldownTimeout && (clearTimeout($8796f90736e175cb$var$globalCooldownTimeout), $8796f90736e175cb$var$globalCooldownTimeout = null);
	}, hideTooltip = (immediate) => {
		immediate || closeDelay <= 0 ? (closeTimeout.current && clearTimeout(closeTimeout.current), closeTimeout.current = null, closeCallback.current()) : closeTimeout.current || (closeTimeout.current = setTimeout(() => {
			closeTimeout.current = null, closeCallback.current();
		}, closeDelay)), $8796f90736e175cb$var$globalWarmUpTimeout && (clearTimeout($8796f90736e175cb$var$globalWarmUpTimeout), $8796f90736e175cb$var$globalWarmUpTimeout = null), $8796f90736e175cb$var$globalWarmedUp && ($8796f90736e175cb$var$globalCooldownTimeout && clearTimeout($8796f90736e175cb$var$globalCooldownTimeout), $8796f90736e175cb$var$globalCooldownTimeout = setTimeout(() => {
			delete $8796f90736e175cb$var$tooltips[id], $8796f90736e175cb$var$globalCooldownTimeout = null, $8796f90736e175cb$var$globalWarmedUp = !1;
		}, Math.max($8796f90736e175cb$var$TOOLTIP_COOLDOWN, closeDelay)));
	}, warmupTooltip = () => {
		closeOpenTooltips(), ensureTooltipEntry(), !isOpen && !$8796f90736e175cb$var$globalWarmUpTimeout && !$8796f90736e175cb$var$globalWarmedUp ? $8796f90736e175cb$var$globalWarmUpTimeout = setTimeout(() => {
			$8796f90736e175cb$var$globalWarmUpTimeout = null, $8796f90736e175cb$var$globalWarmedUp = !0, showTooltip();
		}, delay) : isOpen || showTooltip();
	};
	return (0, import_react$76.useEffect)(() => {
		closeCallback.current = close;
	}, [close]), (0, import_react$76.useEffect)(() => () => {
		closeTimeout.current && clearTimeout(closeTimeout.current), $8796f90736e175cb$var$tooltips[id] && delete $8796f90736e175cb$var$tooltips[id];
	}, [id]), {
		isOpen,
		open: (immediate) => {
			!immediate && delay > 0 && !closeTimeout.current ? warmupTooltip() : showTooltip();
		},
		close: hideTooltip
	};
}
function $4e3b923658d69c60$export$8c610744efcf8a1d(props) {
	let state = $8796f90736e175cb$export$4d40659c25ecb50b(props), ref = (0, import_react$78.useRef)(null), { triggerProps, tooltipProps } = $4e1b34546679e357$export$a6da6c504e4bba8b(props, state, ref);
	return import_react$78.createElement($64fa3d84918910a7$export$2881499e37b75b9a, { values: [[$4e3b923658d69c60$export$7a7623236eec67fa, state], [$4e3b923658d69c60$export$39ae08fa83328b12, {
		...tooltipProps,
		triggerRef: ref
	}]] }, import_react$78.createElement($f645667febf57a63$export$13f3202a3e5ddd5, {
		...triggerProps,
		ref
	}, props.children));
}
function $4e3b923658d69c60$var$TooltipInner(props) {
	let state = (0, import_react$78.useContext)($4e3b923658d69c60$export$7a7623236eec67fa), arrowRef = (0, import_react$78.useRef)(null), { overlayProps, arrowProps, placement, triggerAnchorPoint } = $2a41e45df1593e64$export$d39e1813b3bdd0e1({
		placement: props.placement || "top",
		targetRef: props.triggerRef,
		overlayRef: props.tooltipRef,
		arrowRef,
		offset: props.offset,
		crossOffset: props.crossOffset,
		isOpen: state.isOpen,
		arrowBoundaryOffset: props.arrowBoundaryOffset,
		shouldFlip: props.shouldFlip,
		containerPadding: props.containerPadding,
		onClose: () => state.close(!0)
	}), isEntering = $d3f049242431219c$export$6d3443f2c48bfc20(props.tooltipRef, !!placement) || props.isEntering || !1, renderProps = $64fa3d84918910a7$export$4d86445c2cf5e3({
		...props,
		defaultClassName: "react-aria-Tooltip",
		values: {
			placement,
			isEntering,
			isExiting: props.isExiting,
			state
		}
	});
	props = $3ef42575df84b30b$export$9d1611c77c2fe928(props, overlayProps);
	let { tooltipProps } = $326e436e94273fe1$export$1c4b08e0eca38426(props, state), DOMProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { global: !0 });
	return import_react$78.createElement("div", {
		...$3ef42575df84b30b$export$9d1611c77c2fe928(DOMProps, renderProps, tooltipProps),
		ref: props.tooltipRef,
		style: {
			...overlayProps.style,
			"--trigger-anchor-point": triggerAnchorPoint ? `${triggerAnchorPoint.x}px ${triggerAnchorPoint.y}px` : void 0,
			...renderProps.style
		},
		"data-placement": placement ?? void 0,
		"data-entering": isEntering || void 0,
		"data-exiting": props.isExiting || void 0
	}, import_react$78.createElement($44f671af83e7d9e0$export$2de4954e8ae13b9f.Provider, { value: {
		...arrowProps,
		placement,
		ref: arrowRef
	} }, renderProps.children));
}
function useAriaDescription(description = "") {
	let describedbyId = description.toLowerCase().trim().replace(/\s+/g, "-");
	return {
		ariaDescriptionAttrs: { "aria-describedby": description ? describedbyId : void 0 },
		AriaDescription: () => description ? import_react$80.createElement("span", {
			id: describedbyId,
			hidden: !0
		}, description) : null
	};
}
function useMediaQuery(query) {
	let getMatches = (queryMatch) => typeof window < "u" ? window.matchMedia(queryMatch).matches : !1, [matches, setMatches] = (0, import_react$87.useState)(getMatches(query));
	function handleChange() {
		setMatches(getMatches(query));
	}
	return (0, import_react$87.useEffect)(() => {
		let matchMedia = window.matchMedia(query);
		return handleChange(), matchMedia.addEventListener("change", handleChange), () => {
			matchMedia.removeEventListener("change", handleChange);
		};
	}, [query]), matches;
}
function BaseModal({ container, portalSelector, children, width, height, ariaLabel, dismissOnClickOutside = !0, dismissOnEscape = !0, className, open, onEscapeKeyDown, onInteractOutside, onOpenChange, defaultOpen, transitionDuration = 200, variant = "dialog", ...props }) {
	let deprecated;
	(ariaLabel === void 0 || ariaLabel === "") && (deprecated = "ariaLabel", deprecate5("The `ariaLabel` prop on `Modal` will become mandatory in Storybook 11.")), onEscapeKeyDown !== void 0 && (deprecated = "onEscapeKeyDown", deprecate5("The `onEscapeKeyDown` prop is deprecated and will be removed in Storybook 11. Use `dismissOnEscape` instead.")), onInteractOutside !== void 0 && (deprecated = "onInteractOutside", deprecate5("The `onInteractOutside` prop is deprecated and will be removed in Storybook 11. Use `dismissOnInteractOutside` instead."));
	let overlayRef = (0, import_react$84.useRef)(null), [{ status, isMounted }, toggle] = useTransitionState({
		timeout: useMediaQuery("(prefers-reduced-motion: reduce)") ? 0 : transitionDuration,
		mountOnEnter: !0,
		unmountOnExit: !0
	}), state = $fc909762b330b746$export$61c6a8c84e605fb6({
		isOpen: open || isMounted,
		defaultOpen,
		onOpenChange: (isOpen) => {
			toggle(isOpen), onOpenChange?.(isOpen);
		}
	}), close = () => {
		state.close();
	}, { modalProps, underlayProps } = $8ac8429251c45e4b$export$dbc0f175b25fb0fb({
		isDismissable: dismissOnClickOutside,
		isKeyboardDismissDisabled: !0,
		shouldCloseOnInteractOutside: onInteractOutside ? (element) => {
			let mockedEvent = new MouseEvent("click", {
				bubbles: !0,
				cancelable: !0,
				relatedTarget: element
			});
			return onInteractOutside(mockedEvent), !mockedEvent.defaultPrevented;
		} : void 0
	}, state, overlayRef);
	if ((0, import_react$84.useEffect)(() => {
		let shouldBeOpen = open ?? defaultOpen ?? !1;
		shouldBeOpen && !isMounted ? toggle(!0) : !shouldBeOpen && isMounted && toggle(!1);
	}, [
		open,
		defaultOpen,
		isMounted,
		toggle
	]), (0, import_react$84.useEffect)(() => {
		isMounted && (open || defaultOpen) && onOpenChange?.(!0);
	}, [isMounted]), (0, import_react$84.useEffect)(() => {
		if (isMounted && (open || defaultOpen) && overlayRef.current) return $5e3802645cc19319$export$1c3ebcada18427bf([overlayRef.current], { shouldUseInert: !0 });
	}, [
		isMounted,
		open,
		defaultOpen,
		overlayRef
	]), !isMounted || status === "exited" || status === "unmounted") return null;
	let finalModalProps = $3ef42575df84b30b$export$9d1611c77c2fe928(modalProps, { onKeyDown: (e) => {
		e.key !== "Escape" ? modalProps.onKeyDown?.(e) : dismissOnEscape && (onEscapeKeyDown?.(e.nativeEvent), e.nativeEvent.defaultPrevented || close());
	} }), containerElement = container ?? (portalSelector ? document.querySelector(portalSelector) : void 0);
	return import_react$84.createElement($337b884510726a0d$export$c6fdb837b070b4ff, {
		disableFocusManagement: !0,
		portalContainer: containerElement || void 0
	}, import_react$84.createElement($9bf71ea28793e738$export$20e40289641fbbb6, {
		restoreFocus: !0,
		contain: !0,
		autoFocus: !0
	}, import_react$84.createElement(Overlay, {
		$status: status,
		$transitionDuration: transitionDuration,
		...underlayProps
	}), import_react$84.createElement("div", {
		role: "dialog",
		"aria-label": ariaLabel,
		ref: overlayRef,
		...finalModalProps
	}, import_react$84.createElement(ModalContext.Provider, { value: { close } }, import_react$84.createElement("div", { tabIndex: -1 }, import_react$84.createElement(Container2, {
		"data-deprecated": deprecated,
		$variant: variant,
		$status: status,
		$transitionDuration: transitionDuration,
		className,
		width,
		height,
		...props
	}, children))))));
}
function useResolvedElement(subscriber, refOrElement) {
	var lastReportRef = (0, import_react$95.useRef)(null), refOrElementRef = (0, import_react$95.useRef)(null);
	refOrElementRef.current = refOrElement;
	var cbElementRef = (0, import_react$95.useRef)(null);
	(0, import_react$95.useEffect)(function() {
		evaluateSubscription();
	});
	var evaluateSubscription = (0, import_react$95.useCallback)(function() {
		var cbElement = cbElementRef.current, refOrElement2 = refOrElementRef.current, element = cbElement || (refOrElement2 ? refOrElement2 instanceof Element ? refOrElement2 : refOrElement2.current : null);
		lastReportRef.current && lastReportRef.current.element === element && lastReportRef.current.subscriber === subscriber || (lastReportRef.current && lastReportRef.current.cleanup && lastReportRef.current.cleanup(), lastReportRef.current = {
			element,
			subscriber,
			cleanup: element ? subscriber(element) : void 0
		});
	}, [subscriber]);
	return (0, import_react$95.useEffect)(function() {
		return function() {
			lastReportRef.current && lastReportRef.current.cleanup && (lastReportRef.current.cleanup(), lastReportRef.current = null);
		};
	}, []), (0, import_react$95.useCallback)(function(element) {
		cbElementRef.current = element, evaluateSubscription();
	}, [evaluateSubscription]);
}
function extractSize(entry, boxProp, sizeType) {
	return entry[boxProp] ? entry[boxProp][0] ? entry[boxProp][0][sizeType] : entry[boxProp][sizeType] : boxProp === "contentBoxSize" ? entry.contentRect[sizeType === "inlineSize" ? "width" : "height"] : void 0;
}
function useResizeObserver(opts) {
	opts === void 0 && (opts = {});
	var onResize = opts.onResize, onResizeRef = (0, import_react$95.useRef)(void 0);
	onResizeRef.current = onResize;
	var round = opts.round || Math.round, resizeObserverRef = (0, import_react$95.useRef)(), _useState = (0, import_react$95.useState)({
		width: void 0,
		height: void 0
	}), size = _useState[0], setSize = _useState[1], didUnmount = (0, import_react$95.useRef)(!1);
	(0, import_react$95.useEffect)(function() {
		return didUnmount.current = !1, function() {
			didUnmount.current = !0;
		};
	}, []);
	var previous = (0, import_react$95.useRef)({
		width: void 0,
		height: void 0
	}), refCallback = useResolvedElement((0, import_react$95.useCallback)(function(element) {
		return (!resizeObserverRef.current || resizeObserverRef.current.box !== opts.box || resizeObserverRef.current.round !== round) && (resizeObserverRef.current = {
			box: opts.box,
			round,
			instance: new ResizeObserver(function(entries) {
				var entry = entries[0], boxProp = opts.box === "border-box" ? "borderBoxSize" : opts.box === "device-pixel-content-box" ? "devicePixelContentBoxSize" : "contentBoxSize", reportedWidth = extractSize(entry, boxProp, "inlineSize"), reportedHeight = extractSize(entry, boxProp, "blockSize"), newWidth = reportedWidth ? round(reportedWidth) : void 0, newHeight = reportedHeight ? round(reportedHeight) : void 0;
				if (previous.current.width !== newWidth || previous.current.height !== newHeight) {
					var newSize = {
						width: newWidth,
						height: newHeight
					};
					previous.current.width = newWidth, previous.current.height = newHeight, onResizeRef.current ? onResizeRef.current(newSize) : didUnmount.current || setSize(newSize);
				}
			})
		}), resizeObserverRef.current.instance.observe(element, { box: opts.box }), function() {
			resizeObserverRef.current && resizeObserverRef.current.instance.unobserve(element);
		};
	}, [opts.box, round]), opts.ref);
	return (0, import_react$95.useMemo)(function() {
		return {
			ref: refCallback,
			width: size.width,
			height: size.height
		};
	}, [
		refCallback,
		size.width,
		size.height
	]);
}
function ZoomElement({ centered, scale, children }) {
	let componentWrapperRef = (0, import_react$94.useRef)(null), [elementHeight, setElementHeight] = (0, import_react$94.useState)(0), onResize = (0, import_react$94.useCallback)(({ height }) => {
		height && setElementHeight(height / scale);
	}, [scale]);
	return (0, import_react$94.useEffect)(() => {
		componentWrapperRef.current && setElementHeight(componentWrapperRef.current.getBoundingClientRect().height);
	}, [scale]), useResizeObserver({
		ref: componentWrapperRef,
		onResize
	}), import_react$94.createElement(ZoomElementWrapper, {
		centered,
		scale,
		elementHeight
	}, import_react$94.createElement("div", {
		ref: componentWrapperRef,
		className: "innerZoomElementWrapper"
	}, children));
}
function calculateNodeHeight(sizingData, value, minRows, maxRows) {
	minRows === void 0 && (minRows = 1), maxRows === void 0 && (maxRows = 1 / 0), hiddenTextarea || (hiddenTextarea = document.createElement("textarea"), hiddenTextarea.setAttribute("tabindex", "-1"), hiddenTextarea.setAttribute("aria-hidden", "true"), forceHiddenStyles$1(hiddenTextarea)), hiddenTextarea.parentNode === null && document.body.appendChild(hiddenTextarea);
	var paddingSize = sizingData.paddingSize, borderSize = sizingData.borderSize, sizingStyle = sizingData.sizingStyle, boxSizing = sizingStyle.boxSizing;
	Object.keys(sizingStyle).forEach(function(_key) {
		var key = _key;
		hiddenTextarea.style[key] = sizingStyle[key];
	}), forceHiddenStyles$1(hiddenTextarea), hiddenTextarea.value = value;
	var height = getHeight(hiddenTextarea, sizingData);
	hiddenTextarea.value = value, height = getHeight(hiddenTextarea, sizingData), hiddenTextarea.value = "x";
	var rowHeight = hiddenTextarea.scrollHeight - paddingSize, minHeight = rowHeight * minRows;
	boxSizing === "border-box" && (minHeight = minHeight + paddingSize + borderSize), height = Math.max(minHeight, height);
	var maxHeight = rowHeight * maxRows;
	return boxSizing === "border-box" && (maxHeight = maxHeight + paddingSize + borderSize), height = Math.min(maxHeight, height), [height, rowHeight];
}
function useListener(target, type, listener) {
	var latestListener = useLatest(listener);
	import_react$106.useLayoutEffect(function() {
		var handler = function(ev) {
			return latestListener.current(ev);
		};
		if (target) return target.addEventListener(type, handler), function() {
			return target.removeEventListener(type, handler);
		};
	}, []);
}
function isLiteralValue(value) {
	return value == null || typeof value == "string" || typeof value == "number" || typeof value == "boolean" || typeof value == "symbol";
}
function optionToInternal(option) {
	return {
		...option,
		type: "option",
		value: externalToValue(option.value)
	};
}
function optionOrResetToInternal(option) {
	return "type" in option && option.type === "reset" ? option : optionToInternal(option);
}
function valueToExternal(value) {
	if (value !== UNDEFINED_VALUE) return value;
}
function externalToValue(value) {
	return value === void 0 ? UNDEFINED_VALUE : value;
}
function valueToId(parentId, { value }) {
	return `${parentId}-opt-${String(value) ?? "sb-reset"}`;
}
function setSelectedFromDefault(options, defaultOptions) {
	return defaultOptions === void 0 ? [] : isLiteralValue(defaultOptions) ? options.filter((opt) => opt.value === defaultOptions).map(optionToInternal) : options.filter((opt) => defaultOptions.some((def) => opt.value === def)).map(optionToInternal);
}
function $23b9f4fcf0fe224b$var$filterChildren(collection, newCollection, firstChildKey, filterFn) {
	if (firstChildKey == null) return [null, null];
	let firstNode = null, lastNode = null, currentNode = collection.getItem(firstChildKey);
	for (; currentNode != null;) {
		let newNode = currentNode.filter(collection, newCollection, filterFn);
		newNode != null && (newNode.nextKey = null, lastNode && (newNode.prevKey = lastNode.key, lastNode.nextKey = newNode.key), firstNode ??= newNode, newCollection.addNode(newNode), lastNode = newNode), currentNode = currentNode.nextKey ? collection.getItem(currentNode.nextKey) : null;
	}
	if (lastNode && lastNode.type === "separator") {
		let prevKey = lastNode.prevKey;
		newCollection.removeNode(lastNode.key), prevKey ? (lastNode = newCollection.getItem(prevKey), lastNode.nextKey = null) : lastNode = null;
	}
	var _firstNode_key, _lastNode_key;
	return [(_firstNode_key = firstNode?.key) !== null && _firstNode_key !== void 0 ? _firstNode_key : null, (_lastNode_key = lastNode?.key) !== null && _lastNode_key !== void 0 ? _lastNode_key : null];
}
function $e948873055cbafe4$export$727c8fc270210f13(props) {
	let { children, items, idScope, addIdAndValue, dependencies = [] } = props, cache = (0, import_react$113.useMemo)(() => /* @__PURE__ */ new WeakMap(), dependencies);
	return (0, import_react$113.useMemo)(() => {
		if (items && typeof children == "function") {
			let res = [];
			for (let item of items) {
				let rendered = cache.get(item);
				if (!rendered) {
					rendered = children(item);
					var _rendered_props_id, _ref;
					let key = (_ref = (_rendered_props_id = rendered.props.id) !== null && _rendered_props_id !== void 0 ? _rendered_props_id : item.key) !== null && _ref !== void 0 ? _ref : item.id;
					if (key == null) throw new Error("Could not determine key for item");
					idScope && (key = idScope + ":" + key), rendered = (0, import_react$113.cloneElement)(rendered, addIdAndValue ? {
						key,
						id: key,
						value: item
					} : { key }), cache.set(item, rendered);
				}
				res.push(rendered);
			}
			return res;
		} else if (typeof children != "function") return children;
	}, [
		children,
		items,
		cache,
		idScope,
		addIdAndValue
	]);
}
function $f39a9eba43920ace$export$8dc98ba7eadeaa56(props) {
	if ((0, import_react$114.useContext)($f39a9eba43920ace$export$94b6d0abf7d33e8c)) return import_react$114.createElement(import_react$114.Fragment, null, props.children);
	let children = import_react$114.createElement($f39a9eba43920ace$export$94b6d0abf7d33e8c.Provider, { value: !0 }, props.children);
	return import_react$114.createElement("template", { "data-react-aria-hidden": !0 }, children);
}
function $f39a9eba43920ace$export$86427a43e3e48ebb(fn) {
	let Wrapper7 = (props, ref) => (0, import_react$114.useContext)($f39a9eba43920ace$export$94b6d0abf7d33e8c) ? null : fn(props, ref);
	return Wrapper7.displayName = fn.displayName || fn.name, (0, import_react$114.forwardRef)(Wrapper7);
}
function $f39a9eba43920ace$export$b5d7cc18bb8d2b59() {
	return (0, import_react$114.useContext)($f39a9eba43920ace$export$94b6d0abf7d33e8c);
}
function $e1995378a142960e$export$bf788dd355e3a401(props) {
	if ((0, import_react$115.useContext)($e1995378a142960e$var$CollectionDocumentContext)) return props.content;
	let { collection, document: document4 } = $e1995378a142960e$var$useCollectionDocument(props.createCollection);
	return import_react$115.createElement(import_react$115.Fragment, null, import_react$115.createElement($f39a9eba43920ace$export$8dc98ba7eadeaa56, null, import_react$115.createElement($e1995378a142960e$var$CollectionDocumentContext.Provider, { value: document4 }, props.content)), import_react$115.createElement($e1995378a142960e$var$CollectionInner, {
		render: props.children,
		collection
	}));
}
function $e1995378a142960e$var$CollectionInner({ collection, render }) {
	return render(collection);
}
function $e1995378a142960e$var$useSyncExternalStoreFallback(subscribe, getSnapshot, getServerSnapshot) {
	let isSSR = $b5e257d569688ac6$export$535bd6ca7f90a273(), isSSRRef = (0, import_react$115.useRef)(isSSR);
	isSSRRef.current = isSSR;
	let getSnapshotWrapper = (0, import_react$115.useCallback)(() => isSSRRef.current ? getServerSnapshot() : getSnapshot(), [getSnapshot, getServerSnapshot]);
	return (0, import_shim.useSyncExternalStore)(subscribe, getSnapshotWrapper);
}
function $e1995378a142960e$var$useCollectionDocument(createCollection) {
	let [document4] = (0, import_react$115.useState)(() => new $681cc3c98f569e39$export$b34a105447964f9f(createCollection?.() || new $23b9f4fcf0fe224b$export$408d25a4e12db025())), collection = $e1995378a142960e$var$useSyncExternalStore((0, import_react$115.useCallback)((fn) => document4.subscribe(fn), [document4]), (0, import_react$115.useCallback)(() => {
		let collection2 = document4.getCollection();
		return document4.isSSR && document4.resetAfterSSR(), collection2;
	}, [document4]), (0, import_react$115.useCallback)(() => (document4.isSSR = !0, document4.getCollection()), [document4]));
	return $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => (document4.isMounted = !0, () => {
		document4.isMounted = !1;
	}), [document4]), {
		collection,
		document: document4
	};
}
function $e1995378a142960e$var$createCollectionNodeClass(type) {
	var _class = class extends $23b9f4fcf0fe224b$export$d68d59712b04d9d1 {};
	return _class.type = type, _class;
}
function $e1995378a142960e$var$useSSRCollectionNode(CollectionNodeClass, props, ref, rendered, children, render) {
	typeof CollectionNodeClass == "string" && (CollectionNodeClass = $e1995378a142960e$var$createCollectionNodeClass(CollectionNodeClass));
	let itemRef = (0, import_react$115.useCallback)((element) => {
		element?.setProps(props, ref, CollectionNodeClass, rendered, render);
	}, [
		props,
		ref,
		rendered,
		render,
		CollectionNodeClass
	]), parentNode = (0, import_react$115.useContext)($e1995378a142960e$var$SSRContext);
	if (parentNode) {
		let element = parentNode.ownerDocument.nodesByProps.get(props);
		return element || (element = parentNode.ownerDocument.createElement(CollectionNodeClass.type), element.setProps(props, ref, CollectionNodeClass, rendered, render), parentNode.appendChild(element), parentNode.ownerDocument.updateCollection(), parentNode.ownerDocument.nodesByProps.set(props, element)), children ? import_react$115.createElement($e1995378a142960e$var$SSRContext.Provider, { value: element }, children) : null;
	}
	return import_react$115.createElement(CollectionNodeClass.type, { ref: itemRef }, children);
}
function $e1995378a142960e$export$18af5c7a9e9b3664(CollectionNodeClass, render) {
	let Component3 = ({ node }) => render(node.props, node.props.ref, node), Result = (0, import_react$115.forwardRef)((props, ref) => {
		let focusableProps = (0, import_react$115.useContext)($f645667febf57a63$export$f9762fab77588ecb);
		if (!(0, import_react$115.useContext)($e1995378a142960e$var$ShallowRenderContext)) {
			if (render.length >= 3) throw new Error(render.name + " cannot be rendered outside a collection.");
			return render(props, ref);
		}
		return $e1995378a142960e$var$useSSRCollectionNode(CollectionNodeClass, props, ref, "children" in props ? props.children : null, null, (node) => import_react$115.createElement($f645667febf57a63$export$f9762fab77588ecb.Provider, { value: focusableProps }, import_react$115.createElement(Component3, { node })));
	});
	return Result.displayName = render.name, Result;
}
function $e1995378a142960e$export$e953bb1cd0f19726(CollectionNodeClass, render, useChildren = $e1995378a142960e$var$useCollectionChildren) {
	let Component3 = ({ node }) => render(node.props, node.props.ref, node), Result = (0, import_react$115.forwardRef)((props, ref) => {
		let children = useChildren(props);
		var _useSSRCollectionNode;
		return (_useSSRCollectionNode = $e1995378a142960e$var$useSSRCollectionNode(CollectionNodeClass, props, ref, null, children, (node) => import_react$115.createElement(Component3, { node }))) !== null && _useSSRCollectionNode !== void 0 ? _useSSRCollectionNode : import_react$115.createElement(import_react$115.Fragment, null);
	});
	return Result.displayName = render.name, Result;
}
function $e1995378a142960e$var$useCollectionChildren(options) {
	return $e948873055cbafe4$export$727c8fc270210f13({
		...options,
		addIdAndValue: !0
	});
}
function $e1995378a142960e$export$fb8073518f34e6ec(props) {
	let ctx = (0, import_react$115.useContext)($e1995378a142960e$var$CollectionContext), dependencies = (ctx?.dependencies || []).concat(props.dependencies), idScope = props.idScope || ctx?.idScope, children = $e1995378a142960e$var$useCollectionChildren({
		...props,
		idScope,
		dependencies
	});
	return (0, import_react$115.useContext)($e1995378a142960e$var$CollectionDocumentContext) && (children = import_react$115.createElement($e1995378a142960e$var$CollectionRoot, null, children)), ctx = (0, import_react$115.useMemo)(() => ({
		dependencies,
		idScope
	}), [idScope, ...dependencies]), import_react$115.createElement($e1995378a142960e$var$CollectionContext.Provider, { value: ctx }, children);
}
function $e1995378a142960e$var$CollectionRoot({ children }) {
	let doc = (0, import_react$115.useContext)($e1995378a142960e$var$CollectionDocumentContext), wrappedChildren = (0, import_react$115.useMemo)(() => import_react$115.createElement($e1995378a142960e$var$CollectionDocumentContext.Provider, { value: null }, import_react$115.createElement($e1995378a142960e$var$ShallowRenderContext.Provider, { value: !0 }, children)), [children]);
	return $b5e257d569688ac6$export$535bd6ca7f90a273() ? import_react$115.createElement($e1995378a142960e$var$SSRContext.Provider, { value: doc }, wrappedChildren) : (0, import_react_dom$4.createPortal)(wrappedChildren, doc);
}
function $d191a55c9702f145$export$8467354a121f1b9f(props) {
	let { id, label, "aria-labelledby": ariaLabelledby, "aria-label": ariaLabel, labelElementType = "label" } = props;
	id = $bdb11010cef70236$export$f680877a34711e37(id);
	let labelId = $bdb11010cef70236$export$f680877a34711e37(), labelProps = {};
	label && (ariaLabelledby = ariaLabelledby ? `${labelId} ${ariaLabelledby}` : labelId, labelProps = {
		id: labelId,
		htmlFor: labelElementType === "label" ? id : void 0
	});
	let fieldProps = $313b98861ee5dd6c$export$d6875122194c7b44({
		id,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby
	});
	return {
		labelProps,
		fieldProps
	};
}
function $204d9ebcedfb8806$export$ed5abd763a836edc(props) {
	let { value = 0, minValue = 0, maxValue = 100, valueLabel, isIndeterminate, formatOptions = { style: "percent" } } = props, domProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { labelable: !0 }), { labelProps, fieldProps } = $d191a55c9702f145$export$8467354a121f1b9f({
		...props,
		labelElementType: "span"
	});
	value = $9446cca9a3875146$export$7d15b64cf5a3a4c4(value, minValue, maxValue);
	let percentage = (value - minValue) / (maxValue - minValue), formatter = $a916eb452884faea$export$b7a616150fdb9f44(formatOptions);
	if (!isIndeterminate && !valueLabel) {
		let valueToFormat = formatOptions.style === "percent" ? percentage : value;
		valueLabel = formatter.format(valueToFormat);
	}
	return {
		progressBarProps: $3ef42575df84b30b$export$9d1611c77c2fe928(domProps, {
			...fieldProps,
			"aria-valuenow": isIndeterminate ? void 0 : value,
			"aria-valuemin": minValue,
			"aria-valuemax": maxValue,
			"aria-valuetext": isIndeterminate ? void 0 : valueLabel,
			role: "progressbar"
		}),
		labelProps
	};
}
function $701a24aa0da5b062$export$ea18c227d4417cc3(props, ref) {
	let { elementType = "button", isDisabled, onPress, onPressStart, onPressEnd, onPressUp, onPressChange, preventFocusOnPress, allowFocusWhenDisabled, onClick, href, target, rel, type = "button" } = props, additionalProps;
	elementType === "button" ? additionalProps = {
		type,
		disabled: isDisabled,
		form: props.form,
		formAction: props.formAction,
		formEncType: props.formEncType,
		formMethod: props.formMethod,
		formNoValidate: props.formNoValidate,
		formTarget: props.formTarget,
		name: props.name,
		value: props.value
	} : additionalProps = {
		role: "button",
		href: elementType === "a" && !isDisabled ? href : void 0,
		target: elementType === "a" ? target : void 0,
		type: elementType === "input" ? type : void 0,
		disabled: elementType === "input" ? isDisabled : void 0,
		"aria-disabled": !isDisabled || elementType === "input" ? void 0 : isDisabled,
		rel: elementType === "a" ? rel : void 0
	};
	let { pressProps, isPressed } = $f6c31cce2adf654f$export$45712eceda6fad21({
		onPressStart,
		onPressEnd,
		onPressChange,
		onPress,
		onPressUp,
		onClick,
		isDisabled,
		preventFocusOnPress,
		ref
	}), { focusableProps } = $f645667febf57a63$export$4c014de7c8940b4c(props, ref);
	allowFocusWhenDisabled && (focusableProps.tabIndex = isDisabled ? -1 : focusableProps.tabIndex);
	let buttonProps = $3ef42575df84b30b$export$9d1611c77c2fe928(focusableProps, pressProps, $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { labelable: !0 }));
	return {
		isPressed,
		buttonProps: $3ef42575df84b30b$export$9d1611c77c2fe928(additionalProps, buttonProps, {
			"aria-haspopup": props["aria-haspopup"],
			"aria-expanded": props["aria-expanded"],
			"aria-controls": props["aria-controls"],
			"aria-pressed": props["aria-pressed"],
			"aria-current": props["aria-current"],
			"aria-disabled": props["aria-disabled"]
		})
	};
}
function $d2b4bc8c273e7be6$var$disablePendingProps(props) {
	return props.isPending && (props.onPress = void 0, props.onPressStart = void 0, props.onPressEnd = void 0, props.onPressChange = void 0, props.onPressUp = void 0, props.onKeyDown = void 0, props.onKeyUp = void 0, props.onClick = void 0, props.href = void 0), props;
}
function $07b14b47974efb58$var$PopoverInner({ state, isExiting, UNSTABLE_portalContainer, clearContexts, ...props }) {
	let arrowRef = (0, import_react$120.useRef)(null), containerRef = (0, import_react$120.useRef)(null), groupCtx = (0, import_react$120.useContext)($07b14b47974efb58$var$PopoverGroupContext), isSubPopover = groupCtx && props.trigger === "SubmenuTrigger";
	var _props_offset;
	let { popoverProps, underlayProps, arrowProps, placement, triggerAnchorPoint } = $f2f8a6077418541e$export$542a6fd13ac93354({
		...props,
		offset: (_props_offset = props.offset) !== null && _props_offset !== void 0 ? _props_offset : 8,
		arrowRef,
		groupRef: isSubPopover ? groupCtx : containerRef
	}, state), ref = props.popoverRef, isEntering = $d3f049242431219c$export$6d3443f2c48bfc20(ref, !!placement) || props.isEntering || !1, renderProps = $64fa3d84918910a7$export$4d86445c2cf5e3({
		...props,
		defaultClassName: "react-aria-Popover",
		values: {
			trigger: props.trigger || null,
			placement,
			isEntering,
			isExiting
		}
	}), shouldBeDialog = !props.isNonModal || props.trigger === "SubmenuTrigger", [isDialog, setDialog] = (0, import_react$120.useState)(!1);
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		ref.current && setDialog(shouldBeDialog && !ref.current.querySelector("[role=dialog]"));
	}, [ref, shouldBeDialog]), (0, import_react$120.useEffect)(() => {
		isDialog && props.trigger !== "SubmenuTrigger" && ref.current && !ref.current.contains(document.activeElement) && $3ad3f6e1647bc98d$export$80f3e147d781571c(ref.current);
	}, [
		isDialog,
		ref,
		props.trigger
	]);
	let children = (0, import_react$120.useMemo)(() => {
		let children2 = renderProps.children;
		if (clearContexts) for (let Context of clearContexts) children2 = import_react$120.createElement(Context.Provider, { value: null }, children2);
		return children2;
	}, [renderProps.children, clearContexts]), style = {
		...popoverProps.style,
		"--trigger-anchor-point": triggerAnchorPoint ? `${triggerAnchorPoint.x}px ${triggerAnchorPoint.y}px` : void 0,
		...renderProps.style
	}, overlay = import_react$120.createElement("div", {
		...$3ef42575df84b30b$export$9d1611c77c2fe928($65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { global: !0 }), popoverProps),
		...renderProps,
		role: isDialog ? "dialog" : void 0,
		tabIndex: isDialog ? -1 : void 0,
		"aria-label": props["aria-label"],
		"aria-labelledby": props["aria-labelledby"],
		ref,
		slot: props.slot || void 0,
		style,
		dir: props.dir,
		"data-trigger": props.trigger,
		"data-placement": placement,
		"data-entering": isEntering || void 0,
		"data-exiting": isExiting || void 0
	}, !props.isNonModal && import_react$120.createElement($86ea4cb521eb2e37$export$2317d149ed6f78c4, { onDismiss: state.close }), import_react$120.createElement($44f671af83e7d9e0$export$2de4954e8ae13b9f.Provider, { value: {
		...arrowProps,
		placement,
		ref: arrowRef
	} }, children), import_react$120.createElement($86ea4cb521eb2e37$export$2317d149ed6f78c4, { onDismiss: state.close }));
	if (!isSubPopover) return import_react$120.createElement($337b884510726a0d$export$c6fdb837b070b4ff, {
		...props,
		shouldContainFocus: isDialog,
		isExiting,
		portalContainer: UNSTABLE_portalContainer
	}, !props.isNonModal && state.isOpen && import_react$120.createElement("div", {
		"data-testid": "underlay",
		...underlayProps,
		style: {
			position: "fixed",
			inset: 0
		}
	}), import_react$120.createElement("div", {
		ref: containerRef,
		style: { display: "contents" }
	}, import_react$120.createElement($07b14b47974efb58$var$PopoverGroupContext.Provider, { value: containerRef }, overlay)));
	var _ref;
	return import_react$120.createElement($337b884510726a0d$export$c6fdb837b070b4ff, {
		...props,
		shouldContainFocus: isDialog,
		isExiting,
		portalContainer: (_ref = UNSTABLE_portalContainer ?? groupCtx?.current) !== null && _ref !== void 0 ? _ref : void 0
	}, overlay);
}
function $7135fc7d473fd974$var$useCollectionRender(collection, parent, renderDropIndicator) {
	return $e948873055cbafe4$export$727c8fc270210f13({
		items: parent ? collection.getChildren(parent.key) : collection,
		dependencies: [renderDropIndicator],
		children(node) {
			let rendered = node.render(node);
			return !renderDropIndicator || node.type !== "item" ? rendered : import_react$121.createElement(import_react$121.Fragment, null, renderDropIndicator({
				type: "item",
				key: node.key,
				dropPosition: "before"
			}), rendered, $7135fc7d473fd974$export$2dbbd341daed716d(collection, node, renderDropIndicator));
		}
	});
}
function $7135fc7d473fd974$export$2dbbd341daed716d(collection, node, renderDropIndicator) {
	let key = node.key, keyAfter = collection.getKeyAfter(key), nextItemInFlattenedCollection = keyAfter != null ? collection.getItem(keyAfter) : null;
	for (; nextItemInFlattenedCollection != null && nextItemInFlattenedCollection.type !== "item";) keyAfter = collection.getKeyAfter(nextItemInFlattenedCollection.key), nextItemInFlattenedCollection = keyAfter != null ? collection.getItem(keyAfter) : null;
	let nextItemInSameLevel = node.nextKey != null ? collection.getItem(node.nextKey) : null;
	for (; nextItemInSameLevel != null && nextItemInSameLevel.type !== "item";) nextItemInSameLevel = nextItemInSameLevel.nextKey != null ? collection.getItem(nextItemInSameLevel.nextKey) : null;
	let afterIndicators = [];
	if (nextItemInSameLevel == null) {
		let current = node;
		for (; current && (!nextItemInFlattenedCollection || current.parentKey !== nextItemInFlattenedCollection.parentKey && nextItemInFlattenedCollection.level < current.level);) {
			let indicator = renderDropIndicator({
				type: "item",
				key: current.key,
				dropPosition: "after"
			});
			(0, import_react$121.isValidElement)(indicator) && afterIndicators.push((0, import_react$121.cloneElement)(indicator, { key: `${current.key}-after` })), current = current.parentKey != null ? collection.getItem(current.parentKey) : null;
		}
	}
	return afterIndicators;
}
function $7135fc7d473fd974$export$90e00781bc59d8f9(focusedKey) {
	return (0, import_react$121.useMemo)(() => focusedKey != null ? /* @__PURE__ */ new Set([focusedKey]) : null, [focusedKey]);
}
function $f4b273590fab9f93$export$52210f68a14655d0(props) {
	let domProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { labelable: !0 }), ariaOrientation;
	return props.orientation === "vertical" && (ariaOrientation = "vertical"), props.elementType !== "hr" ? { separatorProps: {
		...domProps,
		role: "separator",
		"aria-orientation": ariaOrientation
	} } : { separatorProps: domProps };
}
function $feb5ffebff200149$export$d3e3bd3e26688c04(e) {
	return $c87311424ea30a05$export$e1865c3bedcd822b() ? e.altKey : e.ctrlKey;
}
function $feb5ffebff200149$export$c3d8340acf92597f(collectionRef, key) {
	var _collectionRef_current, _collectionRef_current1;
	let selector = `[data-key="${CSS.escape(String(key))}"]`, collection = (_collectionRef_current = collectionRef.current) === null || _collectionRef_current === void 0 ? void 0 : _collectionRef_current.dataset.collection;
	return collection && (selector = `[data-collection="${CSS.escape(collection)}"]${selector}`), (_collectionRef_current1 = collectionRef.current) === null || _collectionRef_current1 === void 0 ? void 0 : _collectionRef_current1.querySelector(selector);
}
function $feb5ffebff200149$export$881eb0d9f3605d9d(collection) {
	let id = $bdb11010cef70236$export$f680877a34711e37();
	return $feb5ffebff200149$var$collectionMap.set(collection, id), id;
}
function $feb5ffebff200149$export$6aeb1680a0ae8741(collection) {
	return $feb5ffebff200149$var$collectionMap.get(collection);
}
function $fb3050f43d946246$export$e32c88dfddc6e1d8(options) {
	let { keyboardDelegate, selectionManager, onTypeSelect } = options, state = (0, import_react$126.useRef)({
		search: "",
		timeout: void 0
	}).current, onKeyDown = (e) => {
		let character = $fb3050f43d946246$var$getStringForKey(e.key);
		if (!(!character || e.ctrlKey || e.metaKey || !e.currentTarget.contains(e.target) || state.search.length === 0 && character === " ")) {
			if (character === " " && state.search.trim().length > 0 && (e.preventDefault(), "continuePropagation" in e || e.stopPropagation()), state.search += character, keyboardDelegate.getKeyForSearch != null) {
				let key = keyboardDelegate.getKeyForSearch(state.search, selectionManager.focusedKey);
				key ??= keyboardDelegate.getKeyForSearch(state.search), key != null && (selectionManager.setFocusedKey(key), onTypeSelect && onTypeSelect(key));
			}
			clearTimeout(state.timeout), state.timeout = setTimeout(() => {
				state.search = "";
			}, $fb3050f43d946246$var$TYPEAHEAD_DEBOUNCE_WAIT_MS);
		}
	};
	return { typeSelectProps: { onKeyDownCapture: keyboardDelegate.getKeyForSearch ? onKeyDown : void 0 } };
}
function $fb3050f43d946246$var$getStringForKey(key) {
	return key.length === 1 || !/^[A-Z]/i.test(key) ? key : "";
}
function $ae20dd8cbca75726$export$d6daf82dcd84e87c(options) {
	let { selectionManager: manager, keyboardDelegate: delegate, ref, autoFocus = !1, shouldFocusWrap = !1, disallowEmptySelection = !1, disallowSelectAll = !1, escapeKeyBehavior = "clearSelection", selectOnFocus = manager.selectionBehavior === "replace", disallowTypeAhead = !1, shouldUseVirtualFocus, allowsTabNavigation = !1, isVirtualized, scrollRef = ref, linkBehavior = "action" } = options, { direction } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7(), router = $ea8dcbcb9ea1b556$export$9a302a45f65d0572(), onKeyDown = (e) => {
		var _ref_current;
		if (e.altKey && e.key === "Tab" && e.preventDefault(), !(!((_ref_current = ref.current) === null || _ref_current === void 0) && _ref_current.contains(e.target))) return;
		let navigateToKey = (key, childFocus) => {
			if (key != null) {
				if (manager.isLink(key) && linkBehavior === "selection" && selectOnFocus && !$feb5ffebff200149$export$d3e3bd3e26688c04(e)) {
					(0, import_react_dom$5.flushSync)(() => {
						manager.setFocusedKey(key, childFocus);
					});
					let item = $feb5ffebff200149$export$c3d8340acf92597f(ref, key), itemProps = manager.getItemProps(key);
					item && router.open(item, e, itemProps.href, itemProps.routerOptions);
					return;
				}
				if (manager.setFocusedKey(key, childFocus), manager.isLink(key) && linkBehavior === "override") return;
				e.shiftKey && manager.selectionMode === "multiple" ? manager.extendSelection(key) : selectOnFocus && !$feb5ffebff200149$export$d3e3bd3e26688c04(e) && manager.replaceSelection(key);
			}
		};
		switch (e.key) {
			case "ArrowDown":
				if (delegate.getKeyBelow) {
					var _delegate_getKeyBelow, _delegate_getFirstKey, _delegate_getFirstKey1;
					let nextKey = manager.focusedKey != null ? (_delegate_getKeyBelow = delegate.getKeyBelow) === null || _delegate_getKeyBelow === void 0 ? void 0 : _delegate_getKeyBelow.call(delegate, manager.focusedKey) : (_delegate_getFirstKey = delegate.getFirstKey) === null || _delegate_getFirstKey === void 0 ? void 0 : _delegate_getFirstKey.call(delegate);
					nextKey == null && shouldFocusWrap && (nextKey = (_delegate_getFirstKey1 = delegate.getFirstKey) === null || _delegate_getFirstKey1 === void 0 ? void 0 : _delegate_getFirstKey1.call(delegate, manager.focusedKey)), nextKey != null && (e.preventDefault(), navigateToKey(nextKey));
				}
				break;
			case "ArrowUp":
				if (delegate.getKeyAbove) {
					var _delegate_getKeyAbove, _delegate_getLastKey, _delegate_getLastKey1;
					let nextKey = manager.focusedKey != null ? (_delegate_getKeyAbove = delegate.getKeyAbove) === null || _delegate_getKeyAbove === void 0 ? void 0 : _delegate_getKeyAbove.call(delegate, manager.focusedKey) : (_delegate_getLastKey = delegate.getLastKey) === null || _delegate_getLastKey === void 0 ? void 0 : _delegate_getLastKey.call(delegate);
					nextKey == null && shouldFocusWrap && (nextKey = (_delegate_getLastKey1 = delegate.getLastKey) === null || _delegate_getLastKey1 === void 0 ? void 0 : _delegate_getLastKey1.call(delegate, manager.focusedKey)), nextKey != null && (e.preventDefault(), navigateToKey(nextKey));
				}
				break;
			case "ArrowLeft":
				if (delegate.getKeyLeftOf) {
					var _delegate_getKeyLeftOf, _delegate_getFirstKey2, _delegate_getLastKey2;
					let nextKey = manager.focusedKey != null ? (_delegate_getKeyLeftOf = delegate.getKeyLeftOf) === null || _delegate_getKeyLeftOf === void 0 ? void 0 : _delegate_getKeyLeftOf.call(delegate, manager.focusedKey) : null;
					nextKey == null && shouldFocusWrap && (nextKey = direction === "rtl" ? (_delegate_getFirstKey2 = delegate.getFirstKey) === null || _delegate_getFirstKey2 === void 0 ? void 0 : _delegate_getFirstKey2.call(delegate, manager.focusedKey) : (_delegate_getLastKey2 = delegate.getLastKey) === null || _delegate_getLastKey2 === void 0 ? void 0 : _delegate_getLastKey2.call(delegate, manager.focusedKey)), nextKey != null && (e.preventDefault(), navigateToKey(nextKey, direction === "rtl" ? "first" : "last"));
				}
				break;
			case "ArrowRight":
				if (delegate.getKeyRightOf) {
					var _delegate_getKeyRightOf, _delegate_getLastKey3, _delegate_getFirstKey3;
					let nextKey = manager.focusedKey != null ? (_delegate_getKeyRightOf = delegate.getKeyRightOf) === null || _delegate_getKeyRightOf === void 0 ? void 0 : _delegate_getKeyRightOf.call(delegate, manager.focusedKey) : null;
					nextKey == null && shouldFocusWrap && (nextKey = direction === "rtl" ? (_delegate_getLastKey3 = delegate.getLastKey) === null || _delegate_getLastKey3 === void 0 ? void 0 : _delegate_getLastKey3.call(delegate, manager.focusedKey) : (_delegate_getFirstKey3 = delegate.getFirstKey) === null || _delegate_getFirstKey3 === void 0 ? void 0 : _delegate_getFirstKey3.call(delegate, manager.focusedKey)), nextKey != null && (e.preventDefault(), navigateToKey(nextKey, direction === "rtl" ? "last" : "first"));
				}
				break;
			case "Home":
				if (delegate.getFirstKey) {
					if (manager.focusedKey === null && e.shiftKey) return;
					e.preventDefault();
					let firstKey = delegate.getFirstKey(manager.focusedKey, $21f1aa98acb08317$export$16792effe837dba3(e));
					manager.setFocusedKey(firstKey), firstKey != null && ($21f1aa98acb08317$export$16792effe837dba3(e) && e.shiftKey && manager.selectionMode === "multiple" ? manager.extendSelection(firstKey) : selectOnFocus && manager.replaceSelection(firstKey));
				}
				break;
			case "End":
				if (delegate.getLastKey) {
					if (manager.focusedKey === null && e.shiftKey) return;
					e.preventDefault();
					let lastKey = delegate.getLastKey(manager.focusedKey, $21f1aa98acb08317$export$16792effe837dba3(e));
					manager.setFocusedKey(lastKey), lastKey != null && ($21f1aa98acb08317$export$16792effe837dba3(e) && e.shiftKey && manager.selectionMode === "multiple" ? manager.extendSelection(lastKey) : selectOnFocus && manager.replaceSelection(lastKey));
				}
				break;
			case "PageDown":
				if (delegate.getKeyPageBelow && manager.focusedKey != null) {
					let nextKey = delegate.getKeyPageBelow(manager.focusedKey);
					nextKey != null && (e.preventDefault(), navigateToKey(nextKey));
				}
				break;
			case "PageUp":
				if (delegate.getKeyPageAbove && manager.focusedKey != null) {
					let nextKey = delegate.getKeyPageAbove(manager.focusedKey);
					nextKey != null && (e.preventDefault(), navigateToKey(nextKey));
				}
				break;
			case "a":
				$21f1aa98acb08317$export$16792effe837dba3(e) && manager.selectionMode === "multiple" && disallowSelectAll !== !0 && (e.preventDefault(), manager.selectAll());
				break;
			case "Escape":
				escapeKeyBehavior === "clearSelection" && !disallowEmptySelection && manager.selectedKeys.size !== 0 && (e.stopPropagation(), e.preventDefault(), manager.clearSelection());
				break;
			case "Tab": if (!allowsTabNavigation) {
				if (e.shiftKey) ref.current.focus();
				else {
					let walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa(ref.current, { tabbable: !0 }), next, last;
					do
						last = walker.lastChild(), last && (next = last);
					while (last);
					next && !next.contains(document.activeElement) && $7215afc6de606d6b$export$de79e2c695e052f3(next);
				}
				break;
			}
		}
	}, scrollPos = (0, import_react$127.useRef)({
		top: 0,
		left: 0
	});
	$e9faafb641e167db$export$90fc3a17d93f704c(scrollRef, "scroll", isVirtualized ? void 0 : () => {
		var _scrollRef_current, _scrollRef_current1, _scrollRef_current_scrollTop, _scrollRef_current_scrollLeft;
		scrollPos.current = {
			top: (_scrollRef_current_scrollTop = (_scrollRef_current = scrollRef.current) === null || _scrollRef_current === void 0 ? void 0 : _scrollRef_current.scrollTop) !== null && _scrollRef_current_scrollTop !== void 0 ? _scrollRef_current_scrollTop : 0,
			left: (_scrollRef_current_scrollLeft = (_scrollRef_current1 = scrollRef.current) === null || _scrollRef_current1 === void 0 ? void 0 : _scrollRef_current1.scrollLeft) !== null && _scrollRef_current_scrollLeft !== void 0 ? _scrollRef_current_scrollLeft : 0
		};
	});
	let onFocus = (e) => {
		if (manager.isFocused) {
			e.currentTarget.contains(e.target) || manager.setFocused(!1);
			return;
		}
		if (e.currentTarget.contains(e.target)) {
			if (manager.setFocused(!0), manager.focusedKey == null) {
				var _delegate_getLastKey, _delegate_getFirstKey;
				let navigateToKey = (key) => {
					key != null && (manager.setFocusedKey(key), selectOnFocus && !manager.isSelected(key) && manager.replaceSelection(key));
				}, relatedTarget = e.relatedTarget;
				var _manager_lastSelectedKey, _manager_firstSelectedKey;
				relatedTarget && e.currentTarget.compareDocumentPosition(relatedTarget) & Node.DOCUMENT_POSITION_FOLLOWING ? navigateToKey((_manager_lastSelectedKey = manager.lastSelectedKey) !== null && _manager_lastSelectedKey !== void 0 ? _manager_lastSelectedKey : (_delegate_getLastKey = delegate.getLastKey) === null || _delegate_getLastKey === void 0 ? void 0 : _delegate_getLastKey.call(delegate)) : navigateToKey((_manager_firstSelectedKey = manager.firstSelectedKey) !== null && _manager_firstSelectedKey !== void 0 ? _manager_firstSelectedKey : (_delegate_getFirstKey = delegate.getFirstKey) === null || _delegate_getFirstKey === void 0 ? void 0 : _delegate_getFirstKey.call(delegate));
			} else !isVirtualized && scrollRef.current && (scrollRef.current.scrollTop = scrollPos.current.top, scrollRef.current.scrollLeft = scrollPos.current.left);
			if (manager.focusedKey != null && scrollRef.current) {
				let element = $feb5ffebff200149$export$c3d8340acf92597f(ref, manager.focusedKey);
				element instanceof HTMLElement && (!element.contains(document.activeElement) && !shouldUseVirtualFocus && $7215afc6de606d6b$export$de79e2c695e052f3(element), $507fabe10e71c6fb$export$630ff653c5ada6a9() === "keyboard" && $2f04cbc44ee30ce0$export$c826860796309d1b(element, { containingElement: ref.current }));
			}
		}
	}, onBlur = (e) => {
		e.currentTarget.contains(e.relatedTarget) || manager.setFocused(!1);
	}, shouldVirtualFocusFirst = (0, import_react$127.useRef)(!1);
	$e9faafb641e167db$export$90fc3a17d93f704c(ref, $5671b20cf9b562b2$export$831c820ad60f9d12, shouldUseVirtualFocus ? (e) => {
		let { detail } = e;
		e.stopPropagation(), manager.setFocused(!0), detail?.focusStrategy === "first" && (shouldVirtualFocusFirst.current = !0);
	} : void 0);
	let updateActiveDescendant = $8ae05eaa5c114e9c$export$7f54fc3180508a52(() => {
		var _delegate_getFirstKey, _delegate_getFirstKey1;
		let keyToFocus = (_delegate_getFirstKey1 = (_delegate_getFirstKey = delegate.getFirstKey) === null || _delegate_getFirstKey === void 0 ? void 0 : _delegate_getFirstKey.call(delegate)) !== null && _delegate_getFirstKey1 !== void 0 ? _delegate_getFirstKey1 : null;
		if (keyToFocus == null) {
			let previousActiveElement = $d4ee10de306f2510$export$cd4e5573fbe2b576();
			$55f9b1ae81f22853$export$76e4e37e5339496d(ref.current), $55f9b1ae81f22853$export$2b35b76d2e30e129(previousActiveElement, null), manager.collection.size > 0 && (shouldVirtualFocusFirst.current = !1);
		} else manager.setFocusedKey(keyToFocus), shouldVirtualFocusFirst.current = !1;
	});
	$ca9b37712f007381$export$72ef708ab07251f1(() => {
		shouldVirtualFocusFirst.current && updateActiveDescendant();
	}, [manager.collection, updateActiveDescendant]);
	let resetFocusFirstFlag = $8ae05eaa5c114e9c$export$7f54fc3180508a52(() => {
		manager.collection.size > 0 && (shouldVirtualFocusFirst.current = !1);
	});
	$ca9b37712f007381$export$72ef708ab07251f1(() => {
		resetFocusFirstFlag();
	}, [manager.focusedKey, resetFocusFirstFlag]), $e9faafb641e167db$export$90fc3a17d93f704c(ref, $5671b20cf9b562b2$export$447a38995de2c711, shouldUseVirtualFocus ? (e) => {
		var _e_detail;
		e.stopPropagation(), manager.setFocused(!1), (_e_detail = e.detail) !== null && _e_detail !== void 0 && _e_detail.clearFocusKey && manager.setFocusedKey(null);
	} : void 0);
	let autoFocusRef = (0, import_react$127.useRef)(autoFocus), didAutoFocusRef = (0, import_react$127.useRef)(!1);
	(0, import_react$127.useEffect)(() => {
		if (autoFocusRef.current) {
			var _delegate_getFirstKey, _delegate_getLastKey;
			let focusedKey = null;
			var _delegate_getFirstKey1;
			autoFocus === "first" && (focusedKey = (_delegate_getFirstKey1 = (_delegate_getFirstKey = delegate.getFirstKey) === null || _delegate_getFirstKey === void 0 ? void 0 : _delegate_getFirstKey.call(delegate)) !== null && _delegate_getFirstKey1 !== void 0 ? _delegate_getFirstKey1 : null);
			var _delegate_getLastKey1;
			autoFocus === "last" && (focusedKey = (_delegate_getLastKey1 = (_delegate_getLastKey = delegate.getLastKey) === null || _delegate_getLastKey === void 0 ? void 0 : _delegate_getLastKey.call(delegate)) !== null && _delegate_getLastKey1 !== void 0 ? _delegate_getLastKey1 : null);
			let selectedKeys = manager.selectedKeys;
			if (selectedKeys.size) {
				for (let key of selectedKeys) if (manager.canSelectItem(key)) {
					focusedKey = key;
					break;
				}
			}
			manager.setFocused(!0), manager.setFocusedKey(focusedKey), focusedKey == null && !shouldUseVirtualFocus && ref.current && $3ad3f6e1647bc98d$export$80f3e147d781571c(ref.current), manager.collection.size > 0 && (autoFocusRef.current = !1, didAutoFocusRef.current = !0);
		}
	});
	let lastFocusedKey = (0, import_react$127.useRef)(manager.focusedKey), raf = (0, import_react$127.useRef)(null);
	(0, import_react$127.useEffect)(() => {
		if (manager.isFocused && manager.focusedKey != null && (manager.focusedKey !== lastFocusedKey.current || didAutoFocusRef.current) && scrollRef.current && ref.current) {
			let modality = $507fabe10e71c6fb$export$630ff653c5ada6a9(), element = $feb5ffebff200149$export$c3d8340acf92597f(ref, manager.focusedKey);
			if (!(element instanceof HTMLElement)) return;
			(modality === "keyboard" || didAutoFocusRef.current) && (raf.current && cancelAnimationFrame(raf.current), raf.current = requestAnimationFrame(() => {
				scrollRef.current && ($2f04cbc44ee30ce0$export$53a0910f038337bd(scrollRef.current, element), modality !== "virtual" && $2f04cbc44ee30ce0$export$c826860796309d1b(element, { containingElement: ref.current }));
			}));
		}
		!shouldUseVirtualFocus && manager.isFocused && manager.focusedKey == null && lastFocusedKey.current != null && ref.current && $3ad3f6e1647bc98d$export$80f3e147d781571c(ref.current), lastFocusedKey.current = manager.focusedKey, didAutoFocusRef.current = !1;
	}), (0, import_react$127.useEffect)(() => () => {
		raf.current && cancelAnimationFrame(raf.current);
	}, []), $e9faafb641e167db$export$90fc3a17d93f704c(ref, "react-aria-focus-scope-restore", (e) => {
		e.preventDefault(), manager.setFocused(!0);
	});
	let handlers = {
		onKeyDown,
		onFocus,
		onBlur,
		onMouseDown(e) {
			scrollRef.current === e.target && e.preventDefault();
		}
	}, { typeSelectProps } = $fb3050f43d946246$export$e32c88dfddc6e1d8({
		keyboardDelegate: delegate,
		selectionManager: manager
	});
	disallowTypeAhead || (handlers = $3ef42575df84b30b$export$9d1611c77c2fe928(typeSelectProps, handlers));
	let tabIndex;
	shouldUseVirtualFocus || (tabIndex = manager.focusedKey == null ? 0 : -1);
	let collectionId = $feb5ffebff200149$export$881eb0d9f3605d9d(manager.collection);
	return { collectionProps: $3ef42575df84b30b$export$9d1611c77c2fe928(handlers, {
		tabIndex,
		"data-collection": collectionId
	}) };
}
function $880e95eb8b93ba9a$export$ecf600387e221c37(options) {
	let { id, selectionManager: manager, key, ref, shouldSelectOnPressUp, shouldUseVirtualFocus, focus, isDisabled, onAction, allowsDifferentPressOrigin, linkBehavior = "action" } = options, router = $ea8dcbcb9ea1b556$export$9a302a45f65d0572();
	id = $bdb11010cef70236$export$f680877a34711e37(id);
	let onSelect = (e) => {
		if (e.pointerType === "keyboard" && $feb5ffebff200149$export$d3e3bd3e26688c04(e)) manager.toggleSelection(key);
		else {
			if (manager.selectionMode === "none") return;
			if (manager.isLink(key)) {
				if (linkBehavior === "selection" && ref.current) {
					let itemProps2 = manager.getItemProps(key);
					router.open(ref.current, e, itemProps2.href, itemProps2.routerOptions), manager.setSelectedKeys(manager.selectedKeys);
					return;
				} else if (linkBehavior === "override" || linkBehavior === "none") return;
			}
			manager.selectionMode === "single" ? manager.isSelected(key) && !manager.disallowEmptySelection ? manager.toggleSelection(key) : manager.replaceSelection(key) : e && e.shiftKey ? manager.extendSelection(key) : manager.selectionBehavior === "toggle" || e && ($21f1aa98acb08317$export$16792effe837dba3(e) || e.pointerType === "touch" || e.pointerType === "virtual") ? manager.toggleSelection(key) : manager.replaceSelection(key);
		}
	};
	(0, import_react$128.useEffect)(() => {
		key === manager.focusedKey && manager.isFocused && (shouldUseVirtualFocus ? $55f9b1ae81f22853$export$76e4e37e5339496d(ref.current) : focus ? focus() : document.activeElement !== ref.current && ref.current && $3ad3f6e1647bc98d$export$80f3e147d781571c(ref.current));
	}, [
		ref,
		key,
		manager.focusedKey,
		manager.childFocusStrategy,
		manager.isFocused,
		shouldUseVirtualFocus
	]), isDisabled = isDisabled || manager.isDisabled(key);
	let itemProps = {};
	!shouldUseVirtualFocus && !isDisabled ? itemProps = {
		tabIndex: key === manager.focusedKey ? 0 : -1,
		onFocus(e) {
			e.target === ref.current && manager.setFocusedKey(key);
		}
	} : isDisabled && (itemProps.onMouseDown = (e) => {
		e.preventDefault();
	});
	let isLinkOverride = manager.isLink(key) && linkBehavior === "override", isActionOverride = onAction && options.UNSTABLE_itemBehavior === "action", hasLinkAction = manager.isLink(key) && linkBehavior !== "selection" && linkBehavior !== "none", allowsSelection = !isDisabled && manager.canSelectItem(key) && !isLinkOverride && !isActionOverride, allowsActions = (onAction || hasLinkAction) && !isDisabled, hasPrimaryAction = allowsActions && (manager.selectionBehavior === "replace" ? !allowsSelection : !allowsSelection || manager.isEmpty), hasSecondaryAction = allowsActions && allowsSelection && manager.selectionBehavior === "replace", hasAction = hasPrimaryAction || hasSecondaryAction, modality = (0, import_react$128.useRef)(null), longPressEnabled = hasAction && allowsSelection, longPressEnabledOnPressStart = (0, import_react$128.useRef)(!1), hadPrimaryActionOnPressStart = (0, import_react$128.useRef)(!1), collectionItemProps = manager.getItemProps(key), performAction = (e) => {
		if (onAction) {
			var _ref_current;
			onAction(), (_ref_current = ref.current) === null || _ref_current === void 0 || _ref_current.dispatchEvent(new CustomEvent("react-aria-item-action", { bubbles: !0 }));
		}
		hasLinkAction && ref.current && router.open(ref.current, e, collectionItemProps.href, collectionItemProps.routerOptions);
	}, itemPressProps = { ref };
	if (shouldSelectOnPressUp ? (itemPressProps.onPressStart = (e) => {
		modality.current = e.pointerType, longPressEnabledOnPressStart.current = longPressEnabled, e.pointerType === "keyboard" && (!hasAction || $880e95eb8b93ba9a$var$isSelectionKey()) && onSelect(e);
	}, allowsDifferentPressOrigin ? (itemPressProps.onPressUp = hasPrimaryAction ? void 0 : (e) => {
		e.pointerType === "mouse" && allowsSelection && onSelect(e);
	}, itemPressProps.onPress = hasPrimaryAction ? performAction : (e) => {
		e.pointerType !== "keyboard" && e.pointerType !== "mouse" && allowsSelection && onSelect(e);
	}) : itemPressProps.onPress = (e) => {
		if (hasPrimaryAction || hasSecondaryAction && e.pointerType !== "mouse") {
			if (e.pointerType === "keyboard" && !$880e95eb8b93ba9a$var$isActionKey()) return;
			performAction(e);
		} else e.pointerType !== "keyboard" && allowsSelection && onSelect(e);
	}) : (itemPressProps.onPressStart = (e) => {
		modality.current = e.pointerType, longPressEnabledOnPressStart.current = longPressEnabled, hadPrimaryActionOnPressStart.current = hasPrimaryAction, allowsSelection && (e.pointerType === "mouse" && !hasPrimaryAction || e.pointerType === "keyboard" && (!allowsActions || $880e95eb8b93ba9a$var$isSelectionKey())) && onSelect(e);
	}, itemPressProps.onPress = (e) => {
		(e.pointerType === "touch" || e.pointerType === "pen" || e.pointerType === "virtual" || e.pointerType === "keyboard" && hasAction && $880e95eb8b93ba9a$var$isActionKey() || e.pointerType === "mouse" && hadPrimaryActionOnPressStart.current) && (hasAction ? performAction(e) : allowsSelection && onSelect(e));
	}), itemProps["data-collection"] = $feb5ffebff200149$export$6aeb1680a0ae8741(manager.collection), itemProps["data-key"] = key, itemPressProps.preventFocusOnPress = shouldUseVirtualFocus, shouldUseVirtualFocus && (itemPressProps = $3ef42575df84b30b$export$9d1611c77c2fe928(itemPressProps, {
		onPressStart(e) {
			e.pointerType !== "touch" && (manager.setFocused(!0), manager.setFocusedKey(key));
		},
		onPress(e) {
			e.pointerType === "touch" && (manager.setFocused(!0), manager.setFocusedKey(key));
		}
	})), collectionItemProps) for (let key2 of [
		"onPressStart",
		"onPressEnd",
		"onPressChange",
		"onPress",
		"onPressUp",
		"onClick"
	]) collectionItemProps[key2] && (itemPressProps[key2] = $ff5963eb1fccf552$export$e08e3b67e392101e(itemPressProps[key2], collectionItemProps[key2]));
	let { pressProps, isPressed } = $f6c31cce2adf654f$export$45712eceda6fad21(itemPressProps), onDoubleClick = hasSecondaryAction ? (e) => {
		modality.current === "mouse" && (e.stopPropagation(), e.preventDefault(), performAction(e));
	} : void 0, { longPressProps } = $8a26561d2877236e$export$c24ed0104d07eab9({
		isDisabled: !longPressEnabled,
		onLongPress(e) {
			e.pointerType === "touch" && (onSelect(e), manager.setSelectionBehavior("toggle"));
		}
	}), onDragStartCapture = (e) => {
		modality.current === "touch" && longPressEnabledOnPressStart.current && e.preventDefault();
	}, onClick = linkBehavior !== "none" && manager.isLink(key) ? (e) => {
		$ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening || e.preventDefault();
	} : void 0;
	return {
		itemProps: $3ef42575df84b30b$export$9d1611c77c2fe928(itemProps, allowsSelection || hasPrimaryAction || shouldUseVirtualFocus && !isDisabled ? pressProps : {}, longPressEnabled ? longPressProps : {}, {
			onDoubleClick,
			onDragStartCapture,
			onClick,
			id
		}, shouldUseVirtualFocus ? { onMouseDown: (e) => e.preventDefault() } : void 0),
		isPressed,
		isSelected: manager.isSelected(key),
		isFocused: manager.isFocused && manager.focusedKey === key,
		isDisabled,
		allowsSelection,
		hasAction
	};
}
function $880e95eb8b93ba9a$var$isActionKey() {
	return window.event?.key === "Enter";
}
function $880e95eb8b93ba9a$var$isSelectionKey() {
	let event = window.event;
	return event?.key === " " || event?.code === "Space";
}
function $982254629710d113$export$b95089534ab7c1fd(props) {
	let { selectionManager, collection, disabledKeys, ref, keyboardDelegate, layoutDelegate } = props, collator = $325a3faab7a68acd$export$a16aca283550c30d({
		usage: "search",
		sensitivity: "base"
	}), disabledBehavior = selectionManager.disabledBehavior, delegate = (0, import_react$129.useMemo)(() => keyboardDelegate || new $2a25aae57d74318e$export$a05409b8bb224a5a({
		collection,
		disabledKeys,
		disabledBehavior,
		ref,
		collator,
		layoutDelegate
	}), [
		keyboardDelegate,
		layoutDelegate,
		collection,
		disabledKeys,
		ref,
		collator,
		disabledBehavior
	]), { collectionProps } = $ae20dd8cbca75726$export$d6daf82dcd84e87c({
		...props,
		ref,
		selectionManager,
		keyboardDelegate: delegate
	});
	return { listProps: collectionProps };
}
function $d5336fe17ce95402$export$38eaa17faae8f579(props, state, ref) {
	let { shouldFocusWrap = !0, onKeyDown, onKeyUp, ...otherProps } = props;
	!props["aria-label"] && props["aria-labelledby"];
	let domProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { labelable: !0 }), { listProps } = $982254629710d113$export$b95089534ab7c1fd({
		...otherProps,
		ref,
		selectionManager: state.selectionManager,
		collection: state.collection,
		disabledKeys: state.disabledKeys,
		shouldFocusWrap,
		linkBehavior: "override"
	});
	return $fc79756100351201$export$6f49b4016bfc8d56.set(state, {
		onClose: props.onClose,
		onAction: props.onAction,
		shouldUseVirtualFocus: props.shouldUseVirtualFocus
	}), { menuProps: $3ef42575df84b30b$export$9d1611c77c2fe928(domProps, {
		onKeyDown,
		onKeyUp
	}, {
		role: "menu",
		...listProps,
		onKeyDown: (e) => {
			var _listProps_onKeyDown;
			(e.key !== "Escape" || props.shouldUseVirtualFocus) && ((_listProps_onKeyDown = listProps.onKeyDown) === null || _listProps_onKeyDown === void 0 || _listProps_onKeyDown.call(listProps, e));
		}
	}) };
}
function $c1d7fb2ec91bae71$var$Item(props) {
	return null;
}
function $c1d7fb2ec91bae71$var$hasChildItems(props) {
	return props.hasChildItems != null ? props.hasChildItems : !!(props.childItems || props.title && import_react$130.Children.count(props.children) > 0);
}
function $9fc4852771d079eb$var$Section(props) {
	return null;
}
function $eb2240fc39a57fa5$var$iterable(iterator) {
	let cache = [], iterable = null;
	return { *[Symbol.iterator]() {
		for (let item of cache) yield item;
		iterable || (iterable = iterator());
		for (let item of iterable) cache.push(item), yield item;
	} };
}
function $eb2240fc39a57fa5$var$compose(outer, inner) {
	if (outer && inner) return (element) => outer(inner(element));
	if (outer) return outer;
	if (inner) return inner;
}
function $eb2240fc39a57fa5$var$capitalize(str) {
	return str[0].toUpperCase() + str.slice(1);
}
function $7613b1592d41b092$export$6cd28814d92fa9c9(props, factory, context) {
	let builder = (0, import_react$133.useMemo)(() => new $eb2240fc39a57fa5$export$bf788dd355e3a401(), []), { children, items, collection } = props;
	return (0, import_react$133.useMemo)(() => {
		if (collection) return collection;
		return factory(builder.build({
			children,
			items
		}, context));
	}, [
		builder,
		children,
		items,
		collection,
		context,
		factory
	]);
}
function $c5a24bc478652b5f$export$1005530eda016c13(node, collection) {
	return typeof collection.getChildren == "function" ? collection.getChildren(node.key) : node.childNodes;
}
function $c5a24bc478652b5f$export$fbdeaa6a76694f71(iterable) {
	return $c5a24bc478652b5f$export$5f3398f8733f90e2(iterable, 0);
}
function $c5a24bc478652b5f$export$5f3398f8733f90e2(iterable, index3) {
	if (index3 < 0) return;
	let i = 0;
	for (let item of iterable) {
		if (i === index3) return item;
		i++;
	}
}
function $c5a24bc478652b5f$export$8c434b3a7a4dad6(collection, a, b) {
	if (a.parentKey === b.parentKey) return a.index - b.index;
	let aAncestors = [...$c5a24bc478652b5f$var$getAncestors(collection, a), a], bAncestors = [...$c5a24bc478652b5f$var$getAncestors(collection, b), b], firstNonMatchingAncestor = aAncestors.slice(0, bAncestors.length).findIndex((a2, i) => a2 !== bAncestors[i]);
	return firstNonMatchingAncestor !== -1 ? (a = aAncestors[firstNonMatchingAncestor], b = bAncestors[firstNonMatchingAncestor], a.index - b.index) : aAncestors.findIndex((node) => node === b) >= 0 ? 1 : (bAncestors.findIndex((node) => node === a), -1);
}
function $c5a24bc478652b5f$var$getAncestors(collection, node) {
	let parents = [], currNode = node;
	for (; currNode?.parentKey != null;) currNode = collection.getItem(currNode.parentKey), currNode && parents.unshift(currNode);
	return parents;
}
function $453cc9f0df89c0a5$export$77d5aafae4e095b2(collection) {
	let count = $453cc9f0df89c0a5$var$cache.get(collection);
	if (count != null) return count;
	let counter = 0, countItems = (items) => {
		for (let item of items) item.type === "section" ? countItems($c5a24bc478652b5f$export$1005530eda016c13(item, collection)) : item.type === "item" && counter++;
	};
	return countItems(collection), $453cc9f0df89c0a5$var$cache.set(collection, counter), counter;
}
function $a2e5df62f93c7633$export$9d32628fc2aea7da(props, state, ref) {
	let { id, key, closeOnSelect, isVirtualized, "aria-haspopup": hasPopup, onPressStart, onPressUp: pressUpProp, onPress, onPressChange: pressChangeProp, onPressEnd, onClick: onClickProp, onHoverStart: hoverStartProp, onHoverChange, onHoverEnd, onKeyDown, onKeyUp, onFocus, onFocusChange, onBlur, selectionManager = state.selectionManager } = props, isTrigger = !!hasPopup, isTriggerExpanded = isTrigger && props["aria-expanded"] === "true";
	var _props_isDisabled;
	let isDisabled = (_props_isDisabled = props.isDisabled) !== null && _props_isDisabled !== void 0 ? _props_isDisabled : selectionManager.isDisabled(key);
	var _props_isSelected;
	let isSelected = (_props_isSelected = props.isSelected) !== null && _props_isSelected !== void 0 ? _props_isSelected : selectionManager.isSelected(key), data = $fc79756100351201$export$6f49b4016bfc8d56.get(state), item = state.collection.getItem(key), onClose = props.onClose || data.onClose, router = $ea8dcbcb9ea1b556$export$9a302a45f65d0572(), performAction = () => {
		var _item_props;
		if (!isTrigger && (!(item == null || (_item_props = item.props) === null || _item_props === void 0) && _item_props.onAction ? item.props.onAction() : props.onAction && props.onAction(key), data.onAction)) {
			let onAction = data.onAction;
			onAction(key);
		}
	}, role = "menuitem";
	isTrigger || (selectionManager.selectionMode === "single" ? role = "menuitemradio" : selectionManager.selectionMode === "multiple" && (role = "menuitemcheckbox"));
	let labelId = $bdb11010cef70236$export$b4cc09c592e8fdb8(), descriptionId = $bdb11010cef70236$export$b4cc09c592e8fdb8(), keyboardId = $bdb11010cef70236$export$b4cc09c592e8fdb8(), ariaProps = {
		id,
		"aria-disabled": isDisabled || void 0,
		role,
		"aria-label": props["aria-label"],
		"aria-labelledby": labelId,
		"aria-describedby": [descriptionId, keyboardId].filter(Boolean).join(" ") || void 0,
		"aria-controls": props["aria-controls"],
		"aria-haspopup": hasPopup,
		"aria-expanded": props["aria-expanded"]
	};
	selectionManager.selectionMode !== "none" && !isTrigger && (ariaProps["aria-checked"] = isSelected), isVirtualized && (ariaProps["aria-posinset"] = item?.index, ariaProps["aria-setsize"] = $453cc9f0df89c0a5$export$77d5aafae4e095b2(state.collection));
	let isPressedRef = (0, import_react$134.useRef)(!1), onPressChange = (isPressed2) => {
		pressChangeProp?.(isPressed2), isPressedRef.current = isPressed2;
	}, interaction = (0, import_react$134.useRef)(null), onPressUp = (e) => {
		e.pointerType !== "keyboard" && (interaction.current = { pointerType: e.pointerType }), e.pointerType === "mouse" && (isPressedRef.current || e.target.click()), pressUpProp?.(e);
	}, onClick = (e) => {
		var _interaction_current, _interaction_current1;
		onClickProp?.(e), performAction(), $ea8dcbcb9ea1b556$export$13aea1a3cb5e3f1f(e, router, item.props.href, item?.props.routerOptions);
		let shouldClose = ((_interaction_current = interaction.current) === null || _interaction_current === void 0 ? void 0 : _interaction_current.pointerType) === "keyboard" ? ((_interaction_current1 = interaction.current) === null || _interaction_current1 === void 0 ? void 0 : _interaction_current1.key) === "Enter" || selectionManager.selectionMode === "none" || selectionManager.isLink(key) : selectionManager.selectionMode !== "multiple" || selectionManager.isLink(key);
		shouldClose = closeOnSelect ?? shouldClose, onClose && !isTrigger && shouldClose && onClose(), interaction.current = null;
	}, { itemProps, isFocused } = $880e95eb8b93ba9a$export$ecf600387e221c37({
		id,
		selectionManager,
		key,
		ref,
		shouldSelectOnPressUp: !0,
		allowsDifferentPressOrigin: !0,
		linkBehavior: "none",
		shouldUseVirtualFocus: data.shouldUseVirtualFocus
	}), { pressProps, isPressed } = $f6c31cce2adf654f$export$45712eceda6fad21({
		onPressStart,
		onPress,
		onPressUp,
		onPressChange,
		onPressEnd,
		isDisabled
	}), { hoverProps } = $6179b936705e76d3$export$ae780daf29e6d456({
		isDisabled,
		onHoverStart(e) {
			!$507fabe10e71c6fb$export$b9b3dfddab17db27() && !(isTriggerExpanded && hasPopup) && (selectionManager.setFocused(!0), selectionManager.setFocusedKey(key)), hoverStartProp?.(e);
		},
		onHoverChange,
		onHoverEnd
	}), { keyboardProps } = $46d819fcbaf35654$export$8f71654801c2f7cd({
		onKeyDown: (e) => {
			if (e.repeat) {
				e.continuePropagation();
				return;
			}
			switch (e.key) {
				case " ":
					interaction.current = {
						pointerType: "keyboard",
						key: " "
					}, e.target.click();
					break;
				case "Enter":
					interaction.current = {
						pointerType: "keyboard",
						key: "Enter"
					}, e.target.tagName !== "A" && e.target.click();
					break;
				default: isTrigger || e.continuePropagation(), onKeyDown?.(e);
			}
		},
		onKeyUp
	}), { focusProps } = $a1ea59d68270f0dd$export$f8168d8dd8fd66e6({
		onBlur,
		onFocus,
		onFocusChange
	}), domProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(item?.props);
	delete domProps.id;
	let linkProps = $ea8dcbcb9ea1b556$export$7e924b3091a3bd18(item?.props);
	return {
		menuItemProps: {
			...ariaProps,
			...$3ef42575df84b30b$export$9d1611c77c2fe928(domProps, linkProps, isTrigger ? {
				onFocus: itemProps.onFocus,
				"data-collection": itemProps["data-collection"],
				"data-key": itemProps["data-key"]
			} : itemProps, pressProps, hoverProps, keyboardProps, focusProps, data.shouldUseVirtualFocus || isTrigger ? { onMouseDown: (e) => e.preventDefault() } : void 0, isDisabled ? void 0 : { onClick }),
			tabIndex: itemProps.tabIndex != null && isTriggerExpanded && !data.shouldUseVirtualFocus ? -1 : itemProps.tabIndex
		},
		labelProps: { id: labelId },
		descriptionProps: { id: descriptionId },
		keyboardShortcutProps: { id: keyboardId },
		isFocused,
		isFocusVisible: isFocused && selectionManager.isFocused && $507fabe10e71c6fb$export$b9b3dfddab17db27() && !isTriggerExpanded,
		isSelected,
		isPressed,
		isDisabled
	};
}
function $3e5eb2498db5b506$export$73f7a44322579622(props) {
	let { heading, "aria-label": ariaLabel } = props, headingId = $bdb11010cef70236$export$f680877a34711e37();
	return {
		itemProps: { role: "presentation" },
		headingProps: heading ? {
			id: headingId,
			role: "presentation"
		} : {},
		groupProps: {
			role: "group",
			"aria-label": ariaLabel,
			"aria-labelledby": heading ? headingId : void 0
		}
	};
}
function $d275435c250248f8$export$85ec83e04c95f50a(options) {
	let { menuRef, submenuRef, isOpen, isDisabled } = options, prevPointerPos = (0, import_react$135.useRef)(void 0), submenuRect = (0, import_react$135.useRef)(void 0), lastProcessedTime = (0, import_react$135.useRef)(0), timeout = (0, import_react$135.useRef)(void 0), autoCloseTimeout = (0, import_react$135.useRef)(void 0), submenuSide = (0, import_react$135.useRef)(void 0), movementsTowardsSubmenuCount = (0, import_react$135.useRef)(2), [preventPointerEvents, setPreventPointerEvents] = (0, import_react$135.useState)(!1);
	$9daab02d461809db$export$683480f191c0e3ea({
		ref: submenuRef,
		onResize: () => {
			submenuRef.current && (submenuRect.current = submenuRef.current.getBoundingClientRect(), submenuSide.current = void 0);
		}
	});
	let reset = () => {
		setPreventPointerEvents(!1), movementsTowardsSubmenuCount.current = $d275435c250248f8$var$ALLOWED_INVALID_MOVEMENTS, prevPointerPos.current = void 0;
	}, modality = $507fabe10e71c6fb$export$98e20ec92f614cfe(), onPointerDown = $8ae05eaa5c114e9c$export$7f54fc3180508a52((e) => {
		preventPointerEvents && e.preventDefault();
	});
	(0, import_react$135.useEffect)(() => {
		preventPointerEvents && menuRef.current ? menuRef.current.style.pointerEvents = "none" : menuRef.current.style.pointerEvents = "";
	}, [menuRef, preventPointerEvents]), (0, import_react$135.useEffect)(() => {
		let submenu = submenuRef.current, menu = menuRef.current;
		if (isDisabled || !submenu || !isOpen || modality !== "pointer" || !menu) {
			reset();
			return;
		}
		submenuRect.current = submenu.getBoundingClientRect();
		let onPointerMove = (e) => {
			if (e.pointerType === "touch" || e.pointerType === "pen") return;
			let currentTime = Date.now();
			if (currentTime - lastProcessedTime.current < $d275435c250248f8$var$THROTTLE_TIME) return;
			clearTimeout(timeout.current), clearTimeout(autoCloseTimeout.current);
			let { clientX: mouseX, clientY: mouseY } = e;
			if (!prevPointerPos.current) {
				prevPointerPos.current = {
					x: mouseX,
					y: mouseY
				};
				return;
			}
			if (!submenuRect.current) return;
			if (submenuSide.current || (submenuSide.current = mouseX > submenuRect.current.right ? "left" : "right"), mouseX < menu.getBoundingClientRect().left || mouseX > menu.getBoundingClientRect().right || mouseY < menu.getBoundingClientRect().top || mouseY > menu.getBoundingClientRect().bottom) {
				reset();
				return;
			}
			let prevMouseX = prevPointerPos.current.x, prevMouseY = prevPointerPos.current.y, toSubmenuX = submenuSide.current === "right" ? submenuRect.current.left - prevMouseX : prevMouseX - submenuRect.current.right, angleTop = Math.atan2(prevMouseY - submenuRect.current.top, toSubmenuX) + $d275435c250248f8$var$ANGLE_PADDING, angleBottom = Math.atan2(prevMouseY - submenuRect.current.bottom, toSubmenuX) - $d275435c250248f8$var$ANGLE_PADDING, anglePointer = Math.atan2(prevMouseY - mouseY, submenuSide.current === "left" ? -(mouseX - prevMouseX) : mouseX - prevMouseX), isMovingTowardsSubmenu = anglePointer < angleTop && anglePointer > angleBottom;
			movementsTowardsSubmenuCount.current = isMovingTowardsSubmenu ? Math.min(movementsTowardsSubmenuCount.current + 1, $d275435c250248f8$var$ALLOWED_INVALID_MOVEMENTS) : Math.max(movementsTowardsSubmenuCount.current - 1, 0), movementsTowardsSubmenuCount.current >= $d275435c250248f8$var$ALLOWED_INVALID_MOVEMENTS ? setPreventPointerEvents(!0) : setPreventPointerEvents(!1), lastProcessedTime.current = currentTime, prevPointerPos.current = {
				x: mouseX,
				y: mouseY
			}, isMovingTowardsSubmenu && (timeout.current = setTimeout(() => {
				reset(), autoCloseTimeout.current = setTimeout(() => {
					let target = document.elementFromPoint(mouseX, mouseY);
					target && menu.contains(target) && target.dispatchEvent(new PointerEvent("pointerover", {
						bubbles: !0,
						cancelable: !0
					}));
				}, 100);
			}, $d275435c250248f8$var$TIMEOUT_TIME));
		};
		return window.addEventListener("pointermove", onPointerMove), window.addEventListener("pointerdown", onPointerDown, !0), () => {
			window.removeEventListener("pointermove", onPointerMove), window.removeEventListener("pointerdown", onPointerDown, !0), clearTimeout(timeout.current), clearTimeout(autoCloseTimeout.current), movementsTowardsSubmenuCount.current = $d275435c250248f8$var$ALLOWED_INVALID_MOVEMENTS;
		};
	}, [
		isDisabled,
		isOpen,
		menuRef,
		modality,
		setPreventPointerEvents,
		onPointerDown,
		submenuRef
	]);
}
function $0065b146e7192841$export$7138b0d059a6e743(props, state, ref) {
	let { parentMenuRef, submenuRef, type = "menu", isDisabled, delay = 200, shouldUseVirtualFocus } = props, submenuTriggerId = $bdb11010cef70236$export$f680877a34711e37(), overlayId = $bdb11010cef70236$export$f680877a34711e37(), { direction } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7(), openTimeout = (0, import_react$136.useRef)(void 0), cancelOpenTimeout = (0, import_react$136.useCallback)(() => {
		openTimeout.current && (clearTimeout(openTimeout.current), openTimeout.current = void 0);
	}, [openTimeout]), onSubmenuOpen = $8ae05eaa5c114e9c$export$7f54fc3180508a52((focusStrategy) => {
		cancelOpenTimeout(), state.open(focusStrategy);
	}), onSubmenuClose = $8ae05eaa5c114e9c$export$7f54fc3180508a52(() => {
		cancelOpenTimeout(), state.close();
	});
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => () => {
		cancelOpenTimeout();
	}, [cancelOpenTimeout]);
	let submenuKeyDown = (e) => {
		if (e.currentTarget.contains(document.activeElement)) switch (e.key) {
			case "ArrowLeft":
				direction === "ltr" && e.currentTarget.contains(e.target) && (e.preventDefault(), e.stopPropagation(), onSubmenuClose(), !shouldUseVirtualFocus && ref.current && $7215afc6de606d6b$export$de79e2c695e052f3(ref.current));
				break;
			case "ArrowRight":
				direction === "rtl" && e.currentTarget.contains(e.target) && (e.preventDefault(), e.stopPropagation(), onSubmenuClose(), !shouldUseVirtualFocus && ref.current && $7215afc6de606d6b$export$de79e2c695e052f3(ref.current));
				break;
			case "Escape":
				var _submenuRef_current;
				(_submenuRef_current = submenuRef.current) !== null && _submenuRef_current !== void 0 && _submenuRef_current.contains(e.target) && (e.stopPropagation(), onSubmenuClose(), !shouldUseVirtualFocus && ref.current && $7215afc6de606d6b$export$de79e2c695e052f3(ref.current));
		}
	};
	var _state_focusStrategy;
	let submenuProps = {
		id: overlayId,
		"aria-labelledby": submenuTriggerId,
		submenuLevel: state.submenuLevel,
		...type === "menu" && {
			onClose: state.closeAll,
			autoFocus: (_state_focusStrategy = state.focusStrategy) !== null && _state_focusStrategy !== void 0 ? _state_focusStrategy : void 0,
			onKeyDown: submenuKeyDown
		}
	}, submenuTriggerKeyDown = (e) => {
		switch (e.key) {
			case "ArrowRight":
				isDisabled || (direction === "ltr" ? (e.preventDefault(), state.isOpen || onSubmenuOpen("first"), type === "menu" && submenuRef?.current && document.activeElement === ref?.current && $7215afc6de606d6b$export$de79e2c695e052f3(submenuRef.current)) : state.isOpen ? onSubmenuClose() : e.continuePropagation());
				break;
			case "ArrowLeft":
				isDisabled || (direction === "rtl" ? (e.preventDefault(), state.isOpen || onSubmenuOpen("first"), type === "menu" && submenuRef?.current && document.activeElement === ref?.current && $7215afc6de606d6b$export$de79e2c695e052f3(submenuRef.current)) : state.isOpen ? onSubmenuClose() : e.continuePropagation());
				break;
			default: e.continuePropagation();
		}
	}, onPressStart = (e) => {
		!isDisabled && (e.pointerType === "virtual" || e.pointerType === "keyboard") && onSubmenuOpen("first");
	}, onPress = (e) => {
		!isDisabled && (e.pointerType === "touch" || e.pointerType === "mouse") && onSubmenuOpen();
	}, onHoverChange = (isHovered) => {
		isDisabled || (isHovered && !state.isOpen ? openTimeout.current || (openTimeout.current = setTimeout(() => {
			onSubmenuOpen();
		}, delay)) : isHovered || cancelOpenTimeout());
	};
	$e9faafb641e167db$export$90fc3a17d93f704c(parentMenuRef, "focusin", (e) => {
		var _parentMenuRef_current;
		state.isOpen && (_parentMenuRef_current = parentMenuRef.current) !== null && _parentMenuRef_current !== void 0 && _parentMenuRef_current.contains(e.target) && e.target !== ref.current && onSubmenuClose();
	});
	let shouldCloseOnInteractOutside = (target) => target !== ref.current;
	return $d275435c250248f8$export$85ec83e04c95f50a({
		menuRef: parentMenuRef,
		submenuRef,
		isOpen: state.isOpen,
		isDisabled
	}), {
		submenuTriggerProps: {
			id: submenuTriggerId,
			"aria-controls": state.isOpen ? overlayId : void 0,
			"aria-haspopup": isDisabled ? void 0 : type,
			"aria-expanded": state.isOpen ? "true" : "false",
			onPressStart,
			onPress,
			onHoverChange,
			onKeyDown: submenuTriggerKeyDown,
			isOpen: state.isOpen
		},
		submenuProps,
		popoverProps: {
			isNonModal: !0,
			shouldCloseOnInteractOutside
		}
	};
}
function $a28c903ee9ad8dc5$export$79fefeb1c2091ac3(props) {
	let overlayTriggerState = $fc909762b330b746$export$61c6a8c84e605fb6(props), [focusStrategy, setFocusStrategy] = (0, import_react$137.useState)(null), [expandedKeysStack, setExpandedKeysStack] = (0, import_react$137.useState)([]), closeAll = () => {
		setExpandedKeysStack([]), overlayTriggerState.close();
	};
	return {
		focusStrategy,
		...overlayTriggerState,
		open(focusStrategy2 = null) {
			setFocusStrategy(focusStrategy2), overlayTriggerState.open();
		},
		toggle(focusStrategy2 = null) {
			setFocusStrategy(focusStrategy2), overlayTriggerState.toggle();
		},
		close() {
			closeAll();
		},
		expandedKeysStack,
		openSubmenu: (triggerKey, level) => {
			setExpandedKeysStack((oldStack) => level > oldStack.length ? oldStack : [...oldStack.slice(0, level), triggerKey]);
		},
		closeSubmenu: (triggerKey, level) => {
			setExpandedKeysStack((oldStack) => oldStack[level] === triggerKey ? oldStack.slice(0, level) : oldStack);
		}
	};
}
function $e5614764aa47eb35$export$cfc51cf86138bf98(props, state) {
	let { triggerKey } = props, { expandedKeysStack, openSubmenu, closeSubmenu, close: closeAll } = state, [submenuLevel] = (0, import_react$138.useState)(expandedKeysStack?.length), isOpen = (0, import_react$138.useMemo)(() => expandedKeysStack[submenuLevel] === triggerKey, [
		expandedKeysStack,
		triggerKey,
		submenuLevel
	]), [focusStrategy, setFocusStrategy] = (0, import_react$138.useState)(null), open = (0, import_react$138.useCallback)((focusStrategy2) => {
		setFocusStrategy(focusStrategy2 ?? null), openSubmenu(triggerKey, submenuLevel);
	}, [
		openSubmenu,
		submenuLevel,
		triggerKey
	]), close = (0, import_react$138.useCallback)(() => {
		setFocusStrategy(null), closeSubmenu(triggerKey, submenuLevel);
	}, [
		closeSubmenu,
		submenuLevel,
		triggerKey
	]), toggle = (0, import_react$138.useCallback)((focusStrategy2) => {
		setFocusStrategy(focusStrategy2 ?? null), isOpen ? close() : open(focusStrategy2);
	}, [
		close,
		open,
		isOpen
	]);
	return (0, import_react$138.useMemo)(() => ({
		focusStrategy,
		isOpen,
		open,
		close,
		closeAll,
		submenuLevel,
		setOpen: () => {},
		toggle
	}), [
		isOpen,
		open,
		close,
		closeAll,
		focusStrategy,
		toggle,
		submenuLevel
	]);
}
function $7af3f5b51489e0b5$var$equalSets(setA, setB) {
	if (setA.size !== setB.size) return !1;
	for (let item of setA) if (!setB.has(item)) return !1;
	return !0;
}
function $7af3f5b51489e0b5$export$253fe78d46329472(props) {
	let { selectionMode = "none", disallowEmptySelection = !1, allowDuplicateSelectionEvents, selectionBehavior: selectionBehaviorProp = "toggle", disabledBehavior = "all" } = props, isFocusedRef = (0, import_react$139.useRef)(!1), [, setFocused] = (0, import_react$139.useState)(!1), focusedKeyRef = (0, import_react$139.useRef)(null), childFocusStrategyRef = (0, import_react$139.useRef)(null), [, setFocusedKey] = (0, import_react$139.useState)(null), [selectedKeys, setSelectedKeys] = $458b0a5536c1a7cf$export$40bfa8c7b0832715((0, import_react$139.useMemo)(() => $7af3f5b51489e0b5$var$convertSelection(props.selectedKeys), [props.selectedKeys]), (0, import_react$139.useMemo)(() => $7af3f5b51489e0b5$var$convertSelection(props.defaultSelectedKeys, new $e40ea825a81a3709$export$52baac22726c72bf()), [props.defaultSelectedKeys]), props.onSelectionChange), disabledKeysProp = (0, import_react$139.useMemo)(() => props.disabledKeys ? new Set(props.disabledKeys) : /* @__PURE__ */ new Set(), [props.disabledKeys]), [selectionBehavior, setSelectionBehavior] = (0, import_react$139.useState)(selectionBehaviorProp);
	selectionBehaviorProp === "replace" && selectionBehavior === "toggle" && typeof selectedKeys == "object" && selectedKeys.size === 0 && setSelectionBehavior("replace");
	let lastSelectionBehavior = (0, import_react$139.useRef)(selectionBehaviorProp);
	return (0, import_react$139.useEffect)(() => {
		selectionBehaviorProp !== lastSelectionBehavior.current && (setSelectionBehavior(selectionBehaviorProp), lastSelectionBehavior.current = selectionBehaviorProp);
	}, [selectionBehaviorProp]), {
		selectionMode,
		disallowEmptySelection,
		selectionBehavior,
		setSelectionBehavior,
		get isFocused() {
			return isFocusedRef.current;
		},
		setFocused(f) {
			isFocusedRef.current = f, setFocused(f);
		},
		get focusedKey() {
			return focusedKeyRef.current;
		},
		get childFocusStrategy() {
			return childFocusStrategyRef.current;
		},
		setFocusedKey(k, childFocusStrategy = "first") {
			focusedKeyRef.current = k, childFocusStrategyRef.current = childFocusStrategy, setFocusedKey(k);
		},
		selectedKeys,
		setSelectedKeys(keys) {
			(allowDuplicateSelectionEvents || !$7af3f5b51489e0b5$var$equalSets(keys, selectedKeys)) && setSelectedKeys(keys);
		},
		disabledKeys: disabledKeysProp,
		disabledBehavior
	};
}
function $7af3f5b51489e0b5$var$convertSelection(selection, defaultValue) {
	return selection ? selection === "all" ? "all" : new $e40ea825a81a3709$export$52baac22726c72bf(selection) : defaultValue;
}
function $875d6693e12af071$export$728d6ba534403756(props) {
	let { onExpandedChange } = props, [expandedKeys, setExpandedKeys] = $458b0a5536c1a7cf$export$40bfa8c7b0832715(props.expandedKeys ? new Set(props.expandedKeys) : void 0, props.defaultExpandedKeys ? new Set(props.defaultExpandedKeys) : /* @__PURE__ */ new Set(), onExpandedChange), selectionState = $7af3f5b51489e0b5$export$253fe78d46329472(props), disabledKeys = (0, import_react$140.useMemo)(() => props.disabledKeys ? new Set(props.disabledKeys) : /* @__PURE__ */ new Set(), [props.disabledKeys]), tree = $7613b1592d41b092$export$6cd28814d92fa9c9(props, (0, import_react$140.useCallback)((nodes) => new $05ca4cd7c4a5a999$export$863faf230ee2118a(nodes, { expandedKeys }), [expandedKeys]), null);
	return (0, import_react$140.useEffect)(() => {
		selectionState.focusedKey != null && !tree.getItem(selectionState.focusedKey) && selectionState.setFocusedKey(null);
	}, [tree, selectionState.focusedKey]), {
		collection: tree,
		expandedKeys,
		disabledKeys,
		toggleKey: (key) => {
			setExpandedKeys($875d6693e12af071$var$toggleKey(expandedKeys, key));
		},
		setExpandedKeys,
		selectionManager: new $d496c0a20b6e58ec$export$6c8a5aaad13c9852(tree, selectionState)
	};
}
function $875d6693e12af071$var$toggleKey(set, key) {
	let res = new Set(set);
	return res.has(key) ? res.delete(key) : res.add(key), res;
}
function $3674c52c6b3c5bce$var$MenuInner({ props, collection, menuRef: ref }) {
	[props, ref] = $64fa3d84918910a7$export$29f1550f4b0d4415(props, ref, $8e6cc465cc68f603$export$b0d3ecf7112093a7);
	let { filter, ...autocompleteMenuProps } = props, filteredCollection = (0, import_react$141.useMemo)(() => filter ? collection.filter(filter) : collection, [collection, filter]), state = $875d6693e12af071$export$728d6ba534403756({
		...props,
		collection: filteredCollection,
		children: void 0
	}), triggerState = (0, import_react$141.useContext)($3674c52c6b3c5bce$export$795aec4671cbae19), { isVirtualized, CollectionRoot } = (0, import_react$141.useContext)($7135fc7d473fd974$export$4feb769f8ddf26c5), { menuProps } = $d5336fe17ce95402$export$38eaa17faae8f579({
		...props,
		isVirtualized,
		onClose: props.onClose || triggerState?.close
	}, state, ref), renderProps = $64fa3d84918910a7$export$4d86445c2cf5e3({
		defaultClassName: "react-aria-Menu",
		className: props.className,
		style: props.style,
		values: { isEmpty: state.collection.size === 0 }
	}), emptyState = null;
	state.collection.size === 0 && props.renderEmptyState && (emptyState = import_react$141.createElement("div", {
		role: "menuitem",
		style: { display: "contents" }
	}, props.renderEmptyState()));
	let DOMProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { global: !0 });
	return import_react$141.createElement($9bf71ea28793e738$export$20e40289641fbbb6, null, import_react$141.createElement("div", {
		...$3ef42575df84b30b$export$9d1611c77c2fe928(DOMProps, renderProps, menuProps),
		ref,
		slot: props.slot || void 0,
		"data-empty": state.collection.size === 0 || void 0,
		onScroll: props.onScroll
	}, import_react$141.createElement($64fa3d84918910a7$export$2881499e37b75b9a, { values: [
		[$3674c52c6b3c5bce$export$24aad8519b95b41b, state],
		[$431f98aba6844401$export$6615d83f6de245ce, { elementType: "div" }],
		[$7135fc7d473fd974$export$d40e14dec8b060a8, {
			name: "MenuSection",
			render: $3674c52c6b3c5bce$var$MenuSectionInner
		}],
		[$3674c52c6b3c5bce$var$SubmenuTriggerContext, {
			parentMenuRef: ref,
			shouldUseVirtualFocus: autocompleteMenuProps?.shouldUseVirtualFocus
		}],
		[$3674c52c6b3c5bce$var$MenuItemContext, null],
		[$8e6cc465cc68f603$export$b0d3ecf7112093a7, null],
		[$8e6cc465cc68f603$export$698f465ec27e93df, null],
		[$3674c52c6b3c5bce$var$SelectionManagerContext, state.selectionManager],
		[$3674c52c6b3c5bce$export$795aec4671cbae19, triggerState ?? $a28c903ee9ad8dc5$export$79fefeb1c2091ac3({})]
	] }, import_react$141.createElement(CollectionRoot, {
		collection: state.collection,
		persistedKeys: $7135fc7d473fd974$export$90e00781bc59d8f9(state.selectionManager.focusedKey),
		scrollRef: ref
	})), emptyState));
}
function $3674c52c6b3c5bce$var$MenuSectionInner(props, ref, section, className = "react-aria-MenuSection") {
	var _section_props, _section_props1;
	let state = (0, import_react$141.useContext)($3674c52c6b3c5bce$export$24aad8519b95b41b), { CollectionBranch } = (0, import_react$141.useContext)($7135fc7d473fd974$export$4feb769f8ddf26c5), [headingRef, heading] = $64fa3d84918910a7$export$9d4c57ee4c6ffdd8();
	var _section_props_arialabel;
	let { headingProps, groupProps } = $3e5eb2498db5b506$export$73f7a44322579622({
		heading,
		"aria-label": (_section_props_arialabel = section.props["aria-label"]) !== null && _section_props_arialabel !== void 0 ? _section_props_arialabel : void 0
	}), renderProps = $64fa3d84918910a7$export$4d86445c2cf5e3({
		defaultClassName: className,
		className: (_section_props = section.props) === null || _section_props === void 0 ? void 0 : _section_props.className,
		style: (_section_props1 = section.props) === null || _section_props1 === void 0 ? void 0 : _section_props1.style,
		values: {}
	}), parent = (0, import_react$141.useContext)($3674c52c6b3c5bce$var$SelectionManagerContext), selectionState = $7af3f5b51489e0b5$export$253fe78d46329472(props), manager = props.selectionMode != null ? new $3674c52c6b3c5bce$var$GroupSelectionManager(parent, selectionState) : parent, DOMProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { global: !0 });
	return delete DOMProps.id, import_react$141.createElement("section", {
		...$3ef42575df84b30b$export$9d1611c77c2fe928(DOMProps, renderProps, groupProps),
		ref
	}, import_react$141.createElement($64fa3d84918910a7$export$2881499e37b75b9a, { values: [[$72a5793c14baf454$export$e0e4026c12a8bdbb, {
		...headingProps,
		ref: headingRef
	}], [$3674c52c6b3c5bce$var$SelectionManagerContext, manager]] }, import_react$141.createElement(CollectionBranch, {
		collection: state.collection,
		parent: section
	})));
}
function $40df3f8667284809$export$d55e7ee900f34e93(props, ref) {
	let { role = "dialog" } = props, titleId = $bdb11010cef70236$export$b4cc09c592e8fdb8();
	titleId = props["aria-label"] ? void 0 : titleId;
	let isRefocusing = (0, import_react$142.useRef)(!1);
	return (0, import_react$142.useEffect)(() => {
		if (ref.current && !ref.current.contains(document.activeElement)) {
			$3ad3f6e1647bc98d$export$80f3e147d781571c(ref.current);
			let timeout = setTimeout(() => {
				(document.activeElement === ref.current || document.activeElement === document.body) && (isRefocusing.current = !0, ref.current && (ref.current.blur(), $3ad3f6e1647bc98d$export$80f3e147d781571c(ref.current)), isRefocusing.current = !1);
			}, 500);
			return () => {
				clearTimeout(timeout);
			};
		}
	}, [ref]), $337b884510726a0d$export$14c98a7594375490(), {
		dialogProps: {
			...$65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { labelable: !0 }),
			role,
			tabIndex: -1,
			"aria-labelledby": props["aria-labelledby"] || titleId,
			onBlur: (e) => {
				isRefocusing.current && e.stopPropagation();
			}
		},
		titleProps: { id: titleId }
	};
}
function $de32f1b87079253c$export$2e1e1122cf0cba88(props) {
	let state = $a28c903ee9ad8dc5$export$79fefeb1c2091ac3(props), buttonRef = (0, import_react$143.useRef)(null), { triggerProps, overlayProps } = $628037886ba31236$export$f9d5c8beee7d008d({ type: "dialog" }, state, buttonRef), [buttonWidth, setButtonWidth] = (0, import_react$143.useState)(null);
	return $9daab02d461809db$export$683480f191c0e3ea({
		ref: buttonRef,
		onResize: (0, import_react$143.useCallback)(() => {
			buttonRef.current && setButtonWidth(buttonRef.current.offsetWidth + "px");
		}, [buttonRef])
	}), triggerProps.id = $bdb11010cef70236$export$f680877a34711e37(), overlayProps["aria-labelledby"] = triggerProps.id, import_react$143.createElement($64fa3d84918910a7$export$2881499e37b75b9a, { values: [
		[$de32f1b87079253c$export$d2f961adcb0afbe, state],
		[$3674c52c6b3c5bce$export$795aec4671cbae19, state],
		[$de32f1b87079253c$export$8b93a07348a7730c, overlayProps],
		[$07b14b47974efb58$export$9b9a0cd73afb7ca4, {
			trigger: "DialogTrigger",
			triggerRef: buttonRef,
			"aria-labelledby": overlayProps["aria-labelledby"],
			style: { "--trigger-width": buttonWidth }
		}]
	] }, import_react$143.createElement($f1ab8c75478c6f73$export$3351871ee4b288b8, {
		...triggerProps,
		ref: buttonRef,
		isPressed: state.isOpen
	}, props.children));
}
function ForwardRefFunction({ children, ...rest }, ref) {
	let o = {
		props: rest,
		ref
	};
	if (isLink(o)) return import_react$151.createElement("a", {
		ref: o.ref,
		...o.props
	}, children);
	if (isButton(o)) return import_react$151.createElement("button", {
		ref: o.ref,
		type: "button",
		...o.props
	}, children);
	throw new Error("invalid props");
}
function useList(list) {
	deprecate13("The `useList` tabs hook is deprecated. Use `TabsView` instead.");
	let tabBarRef = (0, import_react$154.useRef)(), addonsRef = (0, import_react$154.useRef)(), tabRefs = (0, import_react$154.useRef)(/* @__PURE__ */ new Map()), { width: tabBarWidth = 1 } = useResizeObserver({ ref: tabBarRef }), [visibleList, setVisibleList] = (0, import_react$154.useState)(list), [invisibleList, setInvisibleList] = (0, import_react$154.useState)([]), previousList = (0, import_react$154.useRef)(list), AddonTab = (0, import_react$154.useCallback)(({ menuName, actions }) => {
		let isAddonsActive = invisibleList.some(({ active }) => active), [isTooltipVisible, setTooltipVisible] = (0, import_react$154.useState)(!1);
		return import_react$154.createElement(import_react$154.Fragment, null, import_react$154.createElement(PopoverProvider, {
			ariaLabel: "Additional tabs",
			visible: isTooltipVisible,
			onVisibleChange: setTooltipVisible,
			placement: "bottom",
			popover: import_react$154.createElement(TooltipLinkList, { links: invisibleList.map(({ title, id, color: color4, active }) => ({
				id,
				title,
				color: color4,
				active,
				onClick: (e) => {
					e.preventDefault(), actions.onSelect(id);
				}
			})) })
		}, import_react$154.createElement(AddonButton, {
			id: "addons-menu-button",
			ref: addonsRef,
			active: isAddonsActive,
			preActive: isTooltipVisible,
			style: { visibility: invisibleList.length ? "visible" : "hidden" },
			"aria-hidden": !invisibleList.length,
			className: "tabbutton",
			type: "button",
			role: "tab"
		}, menuName, import_react$154.createElement(CollapseIcon, {
			className: "addon-collapsible-icon",
			isActive: isAddonsActive || isTooltipVisible
		}))), invisibleList.map(({ title, id, color: color4 }, index3) => {
			let indexId = `index-${index3}`;
			return import_react$154.createElement(TabButton, {
				id: `tabbutton-${sanitize(id) ?? indexId}`,
				style: { visibility: "hidden" },
				"aria-hidden": !0,
				tabIndex: -1,
				ref: (ref) => {
					tabRefs.current.set(id, ref);
				},
				className: "tabbutton",
				type: "button",
				key: id,
				textColor: color4,
				role: "tab"
			}, title);
		}));
	}, [invisibleList]), setTabLists = (0, import_react$154.useCallback)(() => {
		if (!tabBarRef.current || !addonsRef.current) return;
		let { x, width } = tabBarRef.current.getBoundingClientRect(), { width: widthAddonsTab } = addonsRef.current.getBoundingClientRect(), rightBorder = invisibleList.length ? x + width - widthAddonsTab : x + width, newVisibleList = [], widthSum = 0, newInvisibleList = list.filter((item) => {
			let { id } = item, tabButton = tabRefs.current.get(id), { width: tabWidth = 0 } = tabButton?.getBoundingClientRect() || {}, crossBorder = x + widthSum + tabWidth > rightBorder;
			return (!crossBorder || !tabButton) && newVisibleList.push(item), widthSum += tabWidth, crossBorder;
		});
		(newVisibleList.length !== visibleList.length || previousList.current !== list) && (setVisibleList(newVisibleList), setInvisibleList(newInvisibleList), previousList.current = list);
	}, [
		invisibleList.length,
		list,
		visibleList
	]);
	return (0, import_react$154.useLayoutEffect)(setTabLists, [setTabLists, tabBarWidth]), {
		tabRefs,
		addonsRef,
		tabBarRef,
		visibleList,
		invisibleList,
		AddonTab
	};
}
function TabsImpl({ children, selected, actions, absolute = !1, bordered = !1, tools = null, backgroundColor, id: htmlId, menuName = "Tabs", emptyState, showToolsWhenEmpty }) {
	deprecate14("The `Tabs` component is deprecated. Use `TabsView` instead.");
	let list = (0, import_react$149.useMemo)(() => childrenToList(children).map((i, index3) => ({
		...i,
		active: selected ? i.id === selected : index3 === 0
	})), [children, selected]), { visibleList, tabBarRef, tabRefs, AddonTab } = useList(list), EmptyContent = emptyState ?? import_react$149.createElement(EmptyTabContent, { title: "Nothing found" });
	return !showToolsWhenEmpty && list.length === 0 ? EmptyContent : import_react$149.createElement(Wrapper5, {
		"data-deprecated": "Tabs",
		absolute,
		bordered,
		id: htmlId
	}, import_react$149.createElement(FlexBar, {
		scrollable: !1,
		border: !0,
		backgroundColor
	}, import_react$149.createElement(TabBar, {
		style: { whiteSpace: "normal" },
		ref: tabBarRef,
		role: "tablist"
	}, visibleList.map(({ title, id, active, color: color4 }, index3) => {
		let indexId = `index-${index3}`;
		return import_react$149.createElement(TabButton, {
			id: `tabbutton-${sanitize(id) ?? indexId}`,
			ref: (ref) => {
				tabRefs.current.set(id, ref);
			},
			className: `tabbutton ${active ? "tabbutton-active" : ""}`,
			type: "button",
			key: id,
			active,
			textColor: color4,
			onClick: (e) => {
				e.preventDefault(), actions.onSelect(id);
			},
			role: "tab",
			"aria-selected": active
		}, typeof title == "function" ? import_react$149.createElement("title", null) : title);
	}), import_react$149.createElement(AddonTab, {
		menuName,
		actions
	})), tools), import_react$149.createElement(Content3, {
		id: "panel-tab-content",
		bordered,
		absolute
	}, list.length ? list.map(({ id, active, render }) => import_react$149.createElement(TabErrorBoundary, {
		key: id,
		active
	}, import_react$149.createElement(render, { active }, null))) : EmptyContent));
}
function $2680b1829e803644$export$fa142eb1681c5202(props, ref) {
	let { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, orientation = "horizontal" } = props, [isInToolbar, setInToolbar] = (0, import_react$158.useState)(!1);
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		var _ref_current_parentElement;
		setInToolbar(!!(ref.current && !((_ref_current_parentElement = ref.current.parentElement) === null || _ref_current_parentElement === void 0) && _ref_current_parentElement.closest("[role=\"toolbar\"]")));
	});
	let { direction } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7(), shouldReverse = direction === "rtl" && orientation === "horizontal", focusManager = $9bf71ea28793e738$export$c5251b9e124bf29(ref), onKeyDown = (e) => {
		if (e.currentTarget.contains(e.target)) {
			if (orientation === "horizontal" && e.key === "ArrowRight" || orientation === "vertical" && e.key === "ArrowDown") shouldReverse ? focusManager.focusPrevious() : focusManager.focusNext();
			else if (orientation === "horizontal" && e.key === "ArrowLeft" || orientation === "vertical" && e.key === "ArrowUp") shouldReverse ? focusManager.focusNext() : focusManager.focusPrevious();
			else if (e.key === "Tab") {
				e.stopPropagation(), lastFocused.current = document.activeElement, e.shiftKey ? focusManager.focusFirst() : focusManager.focusLast();
				return;
			} else return;
			e.stopPropagation(), e.preventDefault();
		}
	}, lastFocused = (0, import_react$158.useRef)(null), onBlur = (e) => {
		!e.currentTarget.contains(e.relatedTarget) && !lastFocused.current && (lastFocused.current = e.target);
	}, onFocus = (e) => {
		var _ref_current;
		if (lastFocused.current && !e.currentTarget.contains(e.relatedTarget) && !((_ref_current = ref.current) === null || _ref_current === void 0) && _ref_current.contains(e.target)) {
			var _lastFocused_current;
			(_lastFocused_current = lastFocused.current) === null || _lastFocused_current === void 0 || _lastFocused_current.focus(), lastFocused.current = null;
		}
	};
	return { toolbarProps: {
		...$65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { labelable: !0 }),
		role: isInToolbar ? "group" : "toolbar",
		"aria-orientation": orientation,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabel == null ? ariaLabelledBy : void 0,
		onKeyDownCapture: isInToolbar ? void 0 : onKeyDown,
		onFocusCapture: isInToolbar ? void 0 : onFocus,
		onBlurCapture: isInToolbar ? void 0 : onBlur
	} };
}
function $99b62ae3ff97ec45$export$567fc7097e064344(state, key, role) {
	if (!state) return "";
	typeof key == "string" && (key = key.replace(/\s+/g, ""));
	return `${$99b62ae3ff97ec45$export$c5f62239608282b6.get(state)}-${role}-${key}`;
}
function $0175d55c2a017ebc$export$fdf4756d5b8ef90a(props, state, ref) {
	let { key, isDisabled: propsDisabled, shouldSelectOnPressUp } = props, { selectionManager: manager, selectedKey } = state, isSelected = key === selectedKey, isDisabled = propsDisabled || state.isDisabled || state.selectionManager.isDisabled(key), { itemProps, isPressed } = $880e95eb8b93ba9a$export$ecf600387e221c37({
		selectionManager: manager,
		key,
		ref,
		isDisabled,
		shouldSelectOnPressUp,
		linkBehavior: "selection"
	}), tabId = $99b62ae3ff97ec45$export$567fc7097e064344(state, key, "tab"), tabPanelId = $99b62ae3ff97ec45$export$567fc7097e064344(state, key, "tabpanel"), { tabIndex } = itemProps, item = state.collection.getItem(key), domProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(item?.props, { labelable: !0 });
	delete domProps.id;
	let linkProps = $ea8dcbcb9ea1b556$export$7e924b3091a3bd18(item?.props), { focusableProps } = $f645667febf57a63$export$4c014de7c8940b4c({ isDisabled }, ref);
	return {
		tabProps: $3ef42575df84b30b$export$9d1611c77c2fe928(domProps, focusableProps, linkProps, itemProps, {
			id: tabId,
			"aria-selected": isSelected,
			"aria-disabled": isDisabled || void 0,
			"aria-controls": isSelected ? tabPanelId : void 0,
			tabIndex: isDisabled ? void 0 : tabIndex,
			role: "tab"
		}),
		isSelected,
		isDisabled,
		isPressed
	};
}
function $34bce698202e07cb$export$fae0121b5afe572d(props, state, ref) {
	let tabIndex = $83013635b024ae3d$export$eac1895992b9f3d6(ref) ? void 0 : 0;
	var _props_id;
	let id = $99b62ae3ff97ec45$export$567fc7097e064344(state, (_props_id = props.id) !== null && _props_id !== void 0 ? _props_id : state?.selectedKey, "tabpanel");
	return { tabPanelProps: $3ef42575df84b30b$export$9d1611c77c2fe928($313b98861ee5dd6c$export$d6875122194c7b44({
		...props,
		id,
		"aria-labelledby": $99b62ae3ff97ec45$export$567fc7097e064344(state, state?.selectedKey, "tab")
	}), {
		tabIndex,
		role: "tabpanel",
		"aria-describedby": props["aria-describedby"],
		"aria-details": props["aria-details"]
	}) };
}
function $58d314389b21fa3f$export$773e389e644c5874(props, state, ref) {
	let { orientation = "horizontal", keyboardActivation = "automatic" } = props, { collection, selectionManager: manager, disabledKeys } = state, { direction } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7(), { collectionProps } = $ae20dd8cbca75726$export$d6daf82dcd84e87c({
		ref,
		selectionManager: manager,
		keyboardDelegate: (0, import_react$160.useMemo)(() => new $bfc6f2d60b8a4c40$export$15010ca3c1abe90b(collection, direction, orientation, disabledKeys), [
			collection,
			disabledKeys,
			orientation,
			direction
		]),
		selectOnFocus: keyboardActivation === "automatic",
		disallowEmptySelection: !0,
		scrollRef: ref,
		linkBehavior: "selection"
	}), tabsId = $bdb11010cef70236$export$f680877a34711e37();
	$99b62ae3ff97ec45$export$c5f62239608282b6.set(state, tabsId);
	return { tabListProps: {
		...$3ef42575df84b30b$export$9d1611c77c2fe928(collectionProps, $313b98861ee5dd6c$export$d6875122194c7b44({
			...props,
			id: tabsId
		})),
		role: "tablist",
		"aria-orientation": orientation,
		tabIndex: void 0
	} };
}
function $e72dd72e1c76a225$export$2f645645f7bca764(props) {
	let { filter, layoutDelegate } = props, selectionState = $7af3f5b51489e0b5$export$253fe78d46329472(props), disabledKeys = (0, import_react$163.useMemo)(() => props.disabledKeys ? new Set(props.disabledKeys) : /* @__PURE__ */ new Set(), [props.disabledKeys]), collection = $7613b1592d41b092$export$6cd28814d92fa9c9(props, (0, import_react$163.useCallback)((nodes) => filter ? new $a02d57049d202695$export$d085fb9e920b5ca7(filter(nodes)) : new $a02d57049d202695$export$d085fb9e920b5ca7(nodes), [filter]), (0, import_react$163.useMemo)(() => ({ suppressTextValueWarning: props.suppressTextValueWarning }), [props.suppressTextValueWarning])), selectionManager = (0, import_react$163.useMemo)(() => new $d496c0a20b6e58ec$export$6c8a5aaad13c9852(collection, selectionState, { layoutDelegate }), [
		collection,
		selectionState,
		layoutDelegate
	]);
	return $e72dd72e1c76a225$var$useFocusedKeyReset(collection, selectionManager), {
		collection,
		disabledKeys,
		selectionManager
	};
}
function $e72dd72e1c76a225$var$useFocusedKeyReset(collection, selectionManager) {
	let cachedCollection = (0, import_react$163.useRef)(null);
	(0, import_react$163.useEffect)(() => {
		if (selectionManager.focusedKey != null && !collection.getItem(selectionManager.focusedKey) && cachedCollection.current) {
			let startItem = cachedCollection.current.getItem(selectionManager.focusedKey), cachedItemNodes = [...cachedCollection.current.getKeys()].map((key) => {
				let itemNode = cachedCollection.current.getItem(key);
				return itemNode?.type === "item" ? itemNode : null;
			}).filter((node) => node !== null), itemNodes = [...collection.getKeys()].map((key) => {
				let itemNode = collection.getItem(key);
				return itemNode?.type === "item" ? itemNode : null;
			}).filter((node) => node !== null);
			var _cachedItemNodes_length, _itemNodes_length;
			let diff = ((_cachedItemNodes_length = cachedItemNodes?.length) !== null && _cachedItemNodes_length !== void 0 ? _cachedItemNodes_length : 0) - ((_itemNodes_length = itemNodes?.length) !== null && _itemNodes_length !== void 0 ? _itemNodes_length : 0);
			var _startItem_index, _startItem_index1, _itemNodes_length1;
			let index3 = Math.min(diff > 1 ? Math.max(((_startItem_index = startItem?.index) !== null && _startItem_index !== void 0 ? _startItem_index : 0) - diff + 1, 0) : (_startItem_index1 = startItem?.index) !== null && _startItem_index1 !== void 0 ? _startItem_index1 : 0, ((_itemNodes_length1 = itemNodes?.length) !== null && _itemNodes_length1 !== void 0 ? _itemNodes_length1 : 0) - 1), newNode = null, isReverseSearching = !1;
			for (; index3 >= 0;) {
				if (!selectionManager.isDisabled(itemNodes[index3].key)) {
					newNode = itemNodes[index3];
					break;
				}
				if (index3 < itemNodes.length - 1 && !isReverseSearching) index3++;
				else {
					isReverseSearching = !0;
					var _startItem_index2, _startItem_index3;
					index3 > ((_startItem_index2 = startItem?.index) !== null && _startItem_index2 !== void 0 ? _startItem_index2 : 0) && (index3 = (_startItem_index3 = startItem?.index) !== null && _startItem_index3 !== void 0 ? _startItem_index3 : 0), index3--;
				}
			}
			selectionManager.setFocusedKey(newNode ? newNode.key : null);
		}
		cachedCollection.current = collection;
	}, [collection, selectionManager]);
}
function $a0d645289fe9b86b$export$e7f05e985daf4b5f(props) {
	var _props_defaultSelectedKey;
	let [selectedKey, setSelectedKey] = $458b0a5536c1a7cf$export$40bfa8c7b0832715(props.selectedKey, (_props_defaultSelectedKey = props.defaultSelectedKey) !== null && _props_defaultSelectedKey !== void 0 ? _props_defaultSelectedKey : null, props.onSelectionChange), selectedKeys = (0, import_react$164.useMemo)(() => selectedKey != null ? [selectedKey] : [], [selectedKey]), { collection, disabledKeys, selectionManager } = $e72dd72e1c76a225$export$2f645645f7bca764({
		...props,
		selectionMode: "single",
		disallowEmptySelection: !0,
		allowDuplicateSelectionEvents: !0,
		selectedKeys,
		onSelectionChange: (keys) => {
			if (keys === "all") return;
			var _keys_values_next_value;
			let key = (_keys_values_next_value = keys.values().next().value) !== null && _keys_values_next_value !== void 0 ? _keys_values_next_value : null;
			key === selectedKey && props.onSelectionChange && props.onSelectionChange(key), setSelectedKey(key);
		}
	});
	return {
		collection,
		disabledKeys,
		selectionManager,
		selectedKey,
		setSelectedKey,
		selectedItem: selectedKey != null ? collection.getItem(selectedKey) : null
	};
}
function $76f919a04c5a7d14$export$4ba071daf4e486(props) {
	var _props_defaultSelectedKey, _ref;
	let state = $a0d645289fe9b86b$export$e7f05e985daf4b5f({
		...props,
		onSelectionChange: props.onSelectionChange ? (key) => {
			var _props_onSelectionChange;
			key != null && ((_props_onSelectionChange = props.onSelectionChange) === null || _props_onSelectionChange === void 0 || _props_onSelectionChange.call(props, key));
		} : void 0,
		suppressTextValueWarning: !0,
		defaultSelectedKey: (_ref = (_props_defaultSelectedKey = props.defaultSelectedKey) !== null && _props_defaultSelectedKey !== void 0 ? _props_defaultSelectedKey : $76f919a04c5a7d14$var$findDefaultSelectedKey(props.collection, props.disabledKeys ? new Set(props.disabledKeys) : /* @__PURE__ */ new Set())) !== null && _ref !== void 0 ? _ref : void 0
	}), { selectionManager, collection, selectedKey: currentSelectedKey } = state, lastSelectedKey = (0, import_react$165.useRef)(currentSelectedKey);
	return (0, import_react$165.useEffect)(() => {
		let selectedKey = currentSelectedKey;
		props.selectedKey == null && (selectionManager.isEmpty || selectedKey == null || !collection.getItem(selectedKey)) && (selectedKey = $76f919a04c5a7d14$var$findDefaultSelectedKey(collection, state.disabledKeys), selectedKey != null && selectionManager.setSelectedKeys([selectedKey])), (selectedKey != null && selectionManager.focusedKey == null || !selectionManager.isFocused && selectedKey !== lastSelectedKey.current) && selectionManager.setFocusedKey(selectedKey), lastSelectedKey.current = selectedKey;
	}), {
		...state,
		isDisabled: props.isDisabled || !1
	};
}
function $76f919a04c5a7d14$var$findDefaultSelectedKey(collection, disabledKeys) {
	let selectedKey = null;
	if (collection) {
		var _collection_getItem_props, _collection_getItem, _collection_getItem_props1, _collection_getItem1;
		for (selectedKey = collection.getFirstKey(); selectedKey != null && (disabledKeys.has(selectedKey) || !((_collection_getItem = collection.getItem(selectedKey)) === null || _collection_getItem === void 0 || (_collection_getItem_props = _collection_getItem.props) === null || _collection_getItem_props === void 0) && _collection_getItem_props.isDisabled) && selectedKey !== collection.getLastKey();) selectedKey = collection.getKeyAfter(selectedKey);
		selectedKey != null && (disabledKeys.has(selectedKey) || (_collection_getItem1 = collection.getItem(selectedKey)) !== null && _collection_getItem1 !== void 0 && (_collection_getItem_props1 = _collection_getItem1.props) !== null && _collection_getItem_props1 !== void 0 && _collection_getItem_props1.isDisabled) && selectedKey === collection.getLastKey() && (selectedKey = collection.getFirstKey());
	}
	return selectedKey;
}
function $5e8ad37a45e1c704$var$TabsInner({ props, tabsRef: ref, collection }) {
	let { orientation = "horizontal" } = props, state = $76f919a04c5a7d14$export$4ba071daf4e486({
		...props,
		collection,
		children: void 0
	}), { focusProps, isFocused, isFocusVisible } = $f7dceffc5ad7768b$export$4e328f61c538687f({ within: !0 }), values = (0, import_react$167.useMemo)(() => ({
		orientation,
		isFocusWithin: isFocused,
		isFocusVisible
	}), [
		orientation,
		isFocused,
		isFocusVisible
	]), renderProps = $64fa3d84918910a7$export$4d86445c2cf5e3({
		...props,
		defaultClassName: "react-aria-Tabs",
		values
	}), DOMProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { global: !0 });
	return import_react$167.createElement("div", {
		...$3ef42575df84b30b$export$9d1611c77c2fe928(DOMProps, renderProps, focusProps),
		ref,
		slot: props.slot || void 0,
		"data-focused": isFocused || void 0,
		"data-orientation": orientation,
		"data-focus-visible": isFocusVisible || void 0,
		"data-disabled": state.isDisabled || void 0
	}, import_react$167.createElement($64fa3d84918910a7$export$2881499e37b75b9a, { values: [[$5e8ad37a45e1c704$export$cfa7aa87c26e7d1f, props], [$5e8ad37a45e1c704$export$364712098d2aa57c, state]] }, renderProps.children));
}
function $5e8ad37a45e1c704$var$TabListInner({ props, forwardedRef: ref }) {
	let state = (0, import_react$167.useContext)($5e8ad37a45e1c704$export$364712098d2aa57c), { CollectionRoot } = (0, import_react$167.useContext)($7135fc7d473fd974$export$4feb769f8ddf26c5), { orientation = "horizontal", keyboardActivation = "automatic" } = $64fa3d84918910a7$export$fabf2dc03a41866e($5e8ad37a45e1c704$export$cfa7aa87c26e7d1f), objectRef = $df56164dff5785e2$export$4338b53315abf666(ref), { tabListProps } = $58d314389b21fa3f$export$773e389e644c5874({
		...props,
		orientation,
		keyboardActivation
	}, state, objectRef), renderProps = $64fa3d84918910a7$export$4d86445c2cf5e3({
		...props,
		children: null,
		defaultClassName: "react-aria-TabList",
		values: {
			orientation,
			state
		}
	}), DOMProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { global: !0 });
	return delete DOMProps.id, import_react$167.createElement("div", {
		...$3ef42575df84b30b$export$9d1611c77c2fe928(DOMProps, renderProps, tabListProps),
		ref: objectRef,
		"data-orientation": orientation || void 0
	}, import_react$167.createElement(CollectionRoot, {
		collection: state.collection,
		persistedKeys: $7135fc7d473fd974$export$90e00781bc59d8f9(state.selectionManager.focusedKey)
	}));
}
var import_react, import_react$1, import_react$2, import_react$3, import_react$4, import_react$6, import_react$7, import_react$8, import_react$9, import_react$10, import_react$11, import_react$12, import_react$13, import_react$14, import_react$15, import_react$16, import_react$17, import_react$18, import_react$20, import_react$21, import_react$22, import_react$24, import_react$25, import_react$27, import_react$28, import_react$33, import_react_dom, import_react$34, import_react$35, import_react$36, import_react$37, import_react$38, import_react$39, import_react$40, import_react$41, import_react$42, import_react$43, import_react$44, import_react$45, import_react$46, import_react$49, import_react$50, import_react$51, import_react$52, import_react$53, import_react$54, import_react$55, import_react$56, import_react$58, import_react$61, import_react$63, import_react$64, import_react$66, import_react$67, import_react$68, import_react$69, import_react$70, import_react_dom$2, import_react$71, import_react$72, import_react$73, import_react$74, import_react_dom$3, import_react$75, import_react$76, import_react$77, import_react$78, import_react$79, import_react$80, import_react$81, import_react$82, import_react$83, import_react$84, import_react$85, import_react$87, import_react$88, import_react$89, import_react$90, import_react$91, import_react$94, import_react$95, import_react$96, import_react$97, import_react$98, import_react$99, import_react$100, import_react$101, import_react$102, import_react$103, import_react$104, import_react$105, import_react$106, import_react$107, import_react$108, import_react$109, import_react$110, import_react$111, import_react$112, import_react$113, import_react$114, import_react_dom$4, import_react$115, import_shim, import_react$116, import_react$117, import_react$119, import_react$120, import_react$121, import_react$122, import_react$123, import_react$124, import_react$125, import_react$126, import_react_dom$5, import_react$127, import_react$128, import_react$129, import_react$130, import_react$131, import_react$132, import_react$133, import_react$134, import_react$135, import_react$136, import_react$137, import_react$138, import_react$139, import_react$140, import_react$141, import_react$142, import_react$143, import_react$144, import_react$145, import_react$147, import_react$148, import_react$149, import_react$150, import_react$151, import_react$152, import_react$153, import_react$154, import_react$157, import_react$158, import_react$159, import_react$160, import_react$161, import_react$162, import_react$163, import_react$164, import_react$165, import_react$167, import_react$173, nameSpaceClassNames, headerCommon, codeCommon, withReset, withMargin, ResetWrapper, Link, A, Blockquote, languages, Comp, LazySyntaxHighlighter, LazySyntaxHighlighterWithFormatter, SyntaxHighlighter, isReactChildString, isInlineCodeRegex, DefaultCodeBlock, StyledSyntaxHighlighter, Code, DL, Div, H1, H2, H3, H4, H5, H6, HR, Img, LI, listCommon, OL, P, Pre, Span, TT, Table, listCommon2, UL, components, deprecate, LEFT_BUTTON, isPlainLeftClick, cancelled, LinkInner, A2, Link2, global$1, document2, globalWindow, deprecate3, Slot, SLOTTABLE_IDENTIFIER, getSlottableElementFromSlottable, REACT_LAZY_TYPE, createSlotError, createSlottableError, use, DEFAULT_MAX_WIDTH, Note, TooltipNote, deprecate2, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c, $b5e257d569688ac6$var$defaultContext, $b5e257d569688ac6$var$SSRContext, $b5e257d569688ac6$var$IsSSRContext, $b5e257d569688ac6$var$componentIds, $b5e257d569688ac6$export$619500959fc48b26, $bdb11010cef70236$var$canUseDOM, $bdb11010cef70236$export$d41a04c74483c6ef, $bdb11010cef70236$var$registry, $431fbd86ca7dc216$export$b204af158042fbac, $431fbd86ca7dc216$export$f21a1ffae260145a, $f4e2df6bd15f8569$var$_shadowDOM, $d4ee10de306f2510$export$cd4e5573fbe2b576, $dfc540311bf7f109$export$63eb3ababa9c55c4, clsx_default, $65484d02dcb7eb3e$var$DOMPropNames, $65484d02dcb7eb3e$var$labelablePropNames, $65484d02dcb7eb3e$var$linkPropNames, $65484d02dcb7eb3e$var$globalAttrs, $65484d02dcb7eb3e$var$globalEvents, $65484d02dcb7eb3e$var$propRe, $7215afc6de606d6b$var$supportsPreventScrollCached, $c87311424ea30a05$export$9ac100e40613ea10, $c87311424ea30a05$export$186c6964ca17d99, $c87311424ea30a05$export$7bef049ce92e4224, $c87311424ea30a05$export$fedb369cb70207f1, $c87311424ea30a05$export$e1865c3bedcd822b, $c87311424ea30a05$export$78551043582a6a98, $c87311424ea30a05$export$6446a186d09e379e, $c87311424ea30a05$export$a11b0059900ceec8, $c87311424ea30a05$export$b7d78993b74f766d, $ea8dcbcb9ea1b556$var$RouterContext, $bbed8b41f857bcc0$var$transitionsByElement, $bbed8b41f857bcc0$var$transitionCallbacks, $8ae05eaa5c114e9c$var$_React_useInsertionEffect, $8ae05eaa5c114e9c$var$useEarlyEffect, $21f1aa98acb08317$var$nonTextInputTypes, $ef06256079686ba0$var$descriptionId, $ef06256079686ba0$var$descriptionNodes, $5671b20cf9b562b2$export$447a38995de2c711, $5671b20cf9b562b2$export$831c820ad60f9d12, $7d2416ea0959daaa$var$supportsCheckVisibility, $b4b717babfbb907b$var$focusableElements, $b4b717babfbb907b$var$FOCUSABLE_ELEMENT_SELECTOR, $b4b717babfbb907b$var$TABBABLE_ELEMENT_SELECTOR, $458b0a5536c1a7cf$var$_React_useInsertionEffect, $458b0a5536c1a7cf$var$useEarlyEffect, $8a9cb279dc87e130$export$fda7da73ab5d4c48, $14c0b72509d70225$var$state, $14c0b72509d70225$var$savedUserSelect, $14c0b72509d70225$var$modifiedElementMap, $ae1eeba8b9eafd08$export$5165eccb35aaadb5, $f6c31cce2adf654f$var$_shouldStopPropagation, $f6c31cce2adf654f$var$PressEvent, $f6c31cce2adf654f$var$LINK_CLICKED, $f6c31cce2adf654f$var$STYLE_ID, $f6c31cce2adf654f$var$PRESSABLE_ATTRIBUTE, $f6c31cce2adf654f$var$nonTextInputTypes, $507fabe10e71c6fb$var$currentModality, $507fabe10e71c6fb$var$changeHandlers, $507fabe10e71c6fb$export$d90243b58daecda7, $507fabe10e71c6fb$var$hasEventBeforeFocus, $507fabe10e71c6fb$var$hasBlurredWindowRecently, $507fabe10e71c6fb$var$FOCUS_VISIBLE_INPUT_KEYS, $507fabe10e71c6fb$var$tearDownWindowFocusTracking, $507fabe10e71c6fb$var$nonTextInputTypes, $f645667febf57a63$export$f9762fab77588ecb, $f645667febf57a63$export$13f3202a3e5ddd5, $f645667febf57a63$export$35a3bebf7ef2d934, $3b117e43dc0ca95d$export$27c701ed9e449e99, $f1ab8c75478c6f73$export$3351871ee4b288b8, $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents, $6179b936705e76d3$var$hoverCount, $8a26561d2877236e$var$DEFAULT_THRESHOLD, $64fa3d84918910a7$export$c62b8e45d58ddad9, $44f671af83e7d9e0$export$2de4954e8ae13b9f, $edcf132a9284368a$var$AXIS, $edcf132a9284368a$var$FLIPPED_DIRECTION, $edcf132a9284368a$var$CROSS_AXIS, $edcf132a9284368a$var$AXIS_SIZE, $edcf132a9284368a$var$TOTAL_SIZE, $edcf132a9284368a$var$PARSED_PLACEMENT_CACHE, $edcf132a9284368a$var$visualViewport, $dd149f63282afbbf$export$f6211563215e3b37, $148a7a147e38ea7f$var$RTL_SCRIPTS, $148a7a147e38ea7f$var$RTL_LANGS, $1e5a04cdaf7d1af8$var$localeSymbol, $1e5a04cdaf7d1af8$var$currentLocale, $1e5a04cdaf7d1af8$var$listeners, $18f2051aff69b9bf$var$I18nContext, extendStatics, __assign, serializerDefault, ObjectWithoutPrototypeCache, cacheDefault, strategies, ErrorKind, TYPE, SKELETON_TYPE, SPACE_SEPARATOR_REGEX, DATE_TIME_REGEX, WHITE_SPACE_REGEX, FRACTION_PRECISION_REGEX, SIGNIFICANT_PRECISION_REGEX, INTEGER_WIDTH_REGEX, CONCISE_INTEGER_WIDTH_REGEX, timeData, _a, SPACE_SEPARATOR_START_REGEX, SPACE_SEPARATOR_END_REGEX, hasNativeStartsWith, hasNativeFromCodePoint, hasNativeFromEntries, hasNativeCodePointAt, hasTrimStart, hasTrimEnd, isSafeInteger, REGEX_SUPPORTS_U_AND_Y, re, startsWith, fromCodePoint, fromEntries, codePointAt, trimStart, trimEnd, matchIdentifierAtIndex, IDENTIFIER_PREFIX_RE_1, Parser, ErrorCode, FormatError, InvalidValueError, InvalidValueTypeError, MissingValueError, PART_TYPE, $5b160d28a433310d$var$localeSymbol, $5b160d28a433310d$var$stringsSymbol, $5b160d28a433310d$var$cachedGlobalStrings, $5b160d28a433310d$export$c17fa47878dc55b6, $6db58dc88e78b024$var$pluralRulesCache, $6db58dc88e78b024$var$numberFormatCache, $6db58dc88e78b024$export$2f817fcdc4b89ae0, $fca6afa0e843324b$var$cache, $7c5f6fbf42389787$var$HOUR_PARTS, $7c5f6fbf42389787$var$DAY_PARTS, $7c5f6fbf42389787$var$MONTH_DAYS, $7c5f6fbf42389787$var$MONTH_FRACT, $488c6ddbf4ef74c2$var$formatterCache, $488c6ddbf4ef74c2$var$supportsSignDisplay, $488c6ddbf4ef74c2$var$supportsUnit, $488c6ddbf4ef74c2$var$UNITS, $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5, $325a3faab7a68acd$var$cache, $2a41e45df1593e64$var$visualViewport, $9bf71ea28793e738$var$FocusContext, $9bf71ea28793e738$var$RESTORE_FOCUS_EVENT, $9bf71ea28793e738$var$activeScope, $9bf71ea28793e738$var$Tree, $9bf71ea28793e738$var$TreeNode, $9bf71ea28793e738$export$d06fae2ee68b101e, $a11501f3d1d39e6c$var$visibleOverlays, $49c51c25361d4cd2$var$visualViewport, $49c51c25361d4cd2$var$preventScrollCount, $49c51c25361d4cd2$var$restore, $96b38030c423d352$export$60d741e20e0aa309, $f57aed4a881a3485$var$Context, $773d5888b972f1cf$exports, $d11f19852b941573$exports, $b983974c2ee1efb3$exports, $5809cc9d4e92de73$exports, $c68c2e4fc74398d1$exports, $0898b4c153db2b77$exports, $6d74810286a15183$exports, $309d73dc65f78055$exports, $44ad94f7205cf593$exports, $7c28f5687f0779a9$exports, $e6d75df4b68bd73a$exports, $87505c9dab186d0f$exports, $553439c3ffb3e492$exports, $74cf411061b983a2$exports, $e933f298574dc435$exports, $ac91fc9fe02f71f6$exports, $52b96f86422025af$exports, $c0d724c3e51dafa6$exports, $c92899672a3fe72e$exports, $9f576b39d8e7a9d6$exports, $9d025808aeec81a7$exports, $fce709921e2c0fa6$exports, $2599cf0c4ab37f59$exports, $3c220ae7ef8a35fd$exports, $93562b5094072f54$exports, $cd9e2abd0d06c7b4$exports, $45375701f409adf1$exports, $27fab53a576de9dd$exports, $4438748d9952e7c7$exports, $0936d7347ef4da4c$exports, $29700c92185d38f8$exports, $662ccaf2be4c25b3$exports, $d80a27deda7cdb3c$exports, $2b2734393847c884$exports, $a2f21f5f14f60553$exports, $5c3e21d68f1c4674$var$styles, $5e3802645cc19319$var$supportsInert, $5e3802645cc19319$var$refCountMap, $5e3802645cc19319$var$observerStack, $337b884510726a0d$export$a2200b96afd16271, $8796f90736e175cb$var$TOOLTIP_DELAY, $8796f90736e175cb$var$TOOLTIP_COOLDOWN, $8796f90736e175cb$var$tooltips, $8796f90736e175cb$var$tooltipId, $8796f90736e175cb$var$globalWarmedUp, $8796f90736e175cb$var$globalWarmUpTimeout, $8796f90736e175cb$var$globalCooldownTimeout, $4e3b923658d69c60$export$7a7623236eec67fa, $4e3b923658d69c60$export$39ae08fa83328b12, $4e3b923658d69c60$export$28c660c63b792dea, import_memoizerific, convertToReactAriaPlacement, Trigger, TooltipProvider, InteractiveTooltipWrapper, Button, StyledButton, IconButton, ToggleButton, StyledToggle, ActionListItem, ActionListHoverItem, StyledButton2, StyledToggleButton, ActionListButton, ActionListToggle, ActionListAction, ActionListLink, ActionListText, ActionListIcon, ActionList, CollapsibleContent, useSessionState, useCollapsible, resolveThemeColor, getColor, getBorderColor, getBackgroundColor, getOpaqueBackground, fadeInOut, spin, slide, CardContent, CardOutline, deprecate5, STATUS, getState, startOrEnd, getEndStatus, getTimeout, nextTick, updateState, useTransitionState, Modal_styled_exports, deprecate4, $4e85f108e88277b8$export$d688439359537581, $5cb03073d3f54797$export$a8a3e93435678ff9, $514c0188e459b4c0$export$9afb8bc826b033ea, $514c0188e459b4c0$export$5f1af8db9871e1d6, fadeIn, fadeOut, expand, zoomIn, zoomOut, slideFromBottom, slideToBottom, Overlay, Container2, Close, Dialog, CloseButton, Content, Row, Col, Header, Title, Description, Actions, ErrorWrapper, Error2, ModalContext, ZoomElementWrapper, ZoomIFrame, Zoom, global2, document3, ErrorName, ErrorImportant, ErrorDetail, firstLineRegex, linesRegexChromium, linesRegexFirefox, linesRegexSafari, ErrorFormatter, Input, Checkbox, Wrapper, Label, Field, sizes, alignment, validation, styleResets, styles, Wrapper2, Mask, Input2, Input4, Radio, BaseSelect, Select, index, useLatest, updateRef, useComposedRef, HIDDEN_TEXTAREA_STYLE, forceHiddenStyles, forceHiddenStyles$1, hiddenTextarea, getHeight, noop, pick, SIZING_STYLE, isIE, getSizingData, getSizingData$1, useFormResetListener, useWindowResizeListener, useFontsLoadedListener, _excluded, TextareaAutosize, index2, Textarea, Form, Wrapper3, AbsoluteButton, Popover, SelectOption, PAGE_STEP_SIZE, UNDEFINED_VALUE, Listbox, SelectedOptionCount, StyledButton3, Underlay, MinimalistPopover, Select2, deprecate6, $23b9f4fcf0fe224b$export$d68d59712b04d9d1, $23b9f4fcf0fe224b$export$b1918e978f1ee46f, $23b9f4fcf0fe224b$export$5ae2504e948afce5, $23b9f4fcf0fe224b$export$8258a0665a675899, $23b9f4fcf0fe224b$export$fd11f34e1d07f134, $23b9f4fcf0fe224b$export$437f11dc9b403b78, $23b9f4fcf0fe224b$export$408d25a4e12db025, $681cc3c98f569e39$export$410b0c854570d131, $681cc3c98f569e39$export$dc064fe9e59310fd, $681cc3c98f569e39$export$b34a105447964f9f, $f39a9eba43920ace$export$94b6d0abf7d33e8c, $e1995378a142960e$var$ShallowRenderContext, $e1995378a142960e$var$CollectionDocumentContext, $e1995378a142960e$var$useSyncExternalStore, $e1995378a142960e$var$SSRContext, $e1995378a142960e$var$CollectionContext, $01b77f81d0f07f68$export$75b6ee27786ba447, $0393f8ab869a0f1a$export$e9f3bf65a26ce129, $d2b4bc8c273e7be6$export$24d547caef80ccd1, $07b14b47974efb58$export$9b9a0cd73afb7ca4, $07b14b47974efb58$var$PopoverGroupContext, $07b14b47974efb58$export$5b6b19405a83ff9d, $7135fc7d473fd974$export$d40e14dec8b060a8, $7135fc7d473fd974$export$a164736487e3f0ae, $7135fc7d473fd974$export$4feb769f8ddf26c5, $8e6cc465cc68f603$export$b0d3ecf7112093a7, $8e6cc465cc68f603$export$698f465ec27e93df, $72a5793c14baf454$export$e0e4026c12a8bdbb, $63df2425e2108aa8$export$744d98a3b8a94e1c, $431f98aba6844401$export$6615d83f6de245ce, $431f98aba6844401$export$7750289ca694c0b5, $fc79756100351201$export$6f49b4016bfc8d56, $feb5ffebff200149$var$collectionMap, $fb3050f43d946246$var$TYPEAHEAD_DEBOUNCE_WAIT_MS, $657e4dc4a6e88df0$export$8f5ed9ff9f511381, $2a25aae57d74318e$export$a05409b8bb224a5a, $c1d7fb2ec91bae71$export$6d08773d2e66f8f2, $eb2240fc39a57fa5$export$bf788dd355e3a401, $453cc9f0df89c0a5$var$cache, $d275435c250248f8$var$ALLOWED_INVALID_MOVEMENTS, $d275435c250248f8$var$THROTTLE_TIME, $d275435c250248f8$var$TIMEOUT_TIME, $d275435c250248f8$var$ANGLE_PADDING, $05ca4cd7c4a5a999$export$863faf230ee2118a, $e40ea825a81a3709$export$52baac22726c72bf, $d496c0a20b6e58ec$export$6c8a5aaad13c9852, $3674c52c6b3c5bce$export$c7e742effb1c51e2, $3674c52c6b3c5bce$export$24aad8519b95b41b, $3674c52c6b3c5bce$export$795aec4671cbae19, $3674c52c6b3c5bce$var$SelectionManagerContext, $3674c52c6b3c5bce$var$SubmenuTriggerContext, $3674c52c6b3c5bce$var$SubmenuTriggerNode, $3674c52c6b3c5bce$var$GroupSelectionManager, $3674c52c6b3c5bce$var$MenuItemContext, $de32f1b87079253c$export$8b93a07348a7730c, $de32f1b87079253c$export$d2f961adcb0afbe, PopoverProvider, Tooltip2, deprecate7, deprecate9, import_memoizerific2, deprecate8, Title4, Right, Center, CenterText, Left, Item, getItemProps, ListItem, ListItem_default, List, Group, Item2, TooltipLinkList, deprecate14, deprecate10, StyledBar, HeightPreserver, Bar, Side, BarInner, BarWithoutPadding, FlexBar, deprecate11, isLink, isButton, ButtonOrLink, StyledTabButton, TabButton, Wrapper4, Content2, Title5, Footer, Description2, EmptyTabContent, deprecate12, VisuallyHidden, childrenToList, deprecate13, CollapseIcon, AddonButton, ignoreSsrWarning2, Wrapper5, StyledTabBar, TabBar, Content3, TabWrapper, TabErrorBoundary, Tabs, TabsState, Separator2, Toolbar, $99b62ae3ff97ec45$export$c5f62239608282b6, $bfc6f2d60b8a4c40$export$15010ca3c1abe90b, StyledTabButton2, TabListContainer, ScrollContainer, StyledTabList, SCROLL_BUTTON_WIDTH, ScrollButtonContainer, ScrollButton, TabButton2, TabList, Panel, TabPanel, $a02d57049d202695$export$d085fb9e920b5ca7, useTabsState, Container4, FlexTabPanel, FlexTabList, TabsView, $5e8ad37a45e1c704$export$cfa7aa87c26e7d1f, $5e8ad37a45e1c704$export$364712098d2aa57c, $5e8ad37a45e1c704$export$b2539bed5023c21c, $5e8ad37a45e1c704$export$e51a686c67fdaa2d, $5e8ad37a45e1c704$var$TabItemNode, $5e8ad37a45e1c704$export$3e41faf802a29e71, $5e8ad37a45e1c704$export$3d96ec278d3efce4, rotate360, LoaderWrapper, ProgressWrapper, ProgressTrack, ProgressBar2, ProgressMessage, ErrorIcon, ellipsis, Ellipsis, Loader, rotate, deprecate15, components2, resetComponents;
function init_components() {
	return (init_components = __esmMin((() => {
		init_chunk_W22LQPXL();
		init_chunk_LITCR56V();
		init_chunk_S6TK43XQ();
		init_chunk_DRQKCCAG();
		init_chunk_IMSF75WX();
		import_react = require_react();
		import_react$1 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		init_theming();
		import_react$2 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$3 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$4 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		require_react();
		import_react$6 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		init_dist();
		import_react$7 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$8 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$9 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$10 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		init_manager_api();
		import_react$11 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$12 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$13 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$14 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$15 = require_react();
		import_react$16 = require_react();
		import_react$17 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$18 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		require_react();
		import_react$20 = require_react();
		import_react$21 = require_react();
		import_react$22 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		require_react();
		import_react$24 = require_react();
		import_react$25 = require_react();
		require_react();
		import_react$27 = require_react();
		import_react$28 = require_react();
		require_react();
		require_react();
		require_react();
		require_react();
		import_react$33 = require_react();
		import_react_dom = require_react_dom();
		import_react$34 = require_react();
		import_react$35 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$36 = require_react();
		import_react$37 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		require_react_dom();
		import_react$38 = require_react();
		import_react$39 = require_react();
		import_react$40 = require_react();
		import_react$41 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$42 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$43 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$44 = require_react();
		import_react$45 = require_react();
		import_react$46 = require_react();
		require_react();
		require_react();
		import_react$49 = require_react();
		import_react$50 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$51 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$52 = require_react();
		import_react$53 = require_react();
		import_react$54 = require_react();
		import_react$55 = require_react();
		import_react$56 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		require_react();
		import_react$58 = require_react();
		require_react();
		require_react();
		import_react$61 = require_react();
		require_react();
		import_react$63 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$64 = require_react();
		require_react();
		import_react$66 = require_react();
		import_react$67 = require_react();
		import_react$68 = require_react();
		import_react$69 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$70 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react_dom$2 = /* @__PURE__ */ __toESM$1(require_react_dom(), 1);
		import_react$71 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$72 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$73 = require_react();
		import_react$74 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react_dom$3 = /* @__PURE__ */ __toESM$1(require_react_dom(), 1);
		import_react$75 = require_react();
		import_react$76 = require_react();
		import_react$77 = require_react();
		import_react$78 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$79 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$80 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$81 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$82 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$83 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$84 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$85 = require_react();
		require_react();
		import_react$87 = require_react();
		import_react$88 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$89 = require_react();
		import_react$90 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$91 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		require_react();
		require_react();
		import_react$94 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$95 = require_react();
		import_react$96 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$97 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$98 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$99 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$100 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$101 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$102 = require_react();
		import_react$103 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$104 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$105 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$106 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$107 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$108 = require_react();
		import_react$109 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$110 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$111 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$112 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$113 = require_react();
		import_react$114 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react_dom$4 = require_react_dom();
		import_react$115 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_shim = require_shim();
		import_react$116 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$117 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		require_react();
		import_react$119 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$120 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$121 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$122 = require_react();
		import_react$123 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$124 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$125 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$126 = require_react();
		import_react_dom$5 = require_react_dom();
		import_react$127 = require_react();
		import_react$128 = require_react();
		import_react$129 = require_react();
		import_react$130 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$131 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$132 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$133 = require_react();
		import_react$134 = require_react();
		import_react$135 = require_react();
		import_react$136 = require_react();
		import_react$137 = require_react();
		import_react$138 = require_react();
		import_react$139 = require_react();
		import_react$140 = require_react();
		import_react$141 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$142 = require_react();
		import_react$143 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$144 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$145 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		require_react();
		import_react$147 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$148 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$149 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		init_csf();
		import_react$150 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$151 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$152 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$153 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$154 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		require_react();
		require_react();
		import_react$157 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$158 = require_react();
		import_react$159 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$160 = require_react();
		import_react$161 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$162 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$163 = require_react();
		import_react$164 = require_react();
		import_react$165 = require_react();
		require_react();
		import_react$167 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		require_react();
		require_react();
		require_react();
		require_react();
		require_react();
		import_react$173 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		require_react();
		require_react();
		init_preload_helper();
		nameSpaceClassNames = ({ ...props }, key) => {
			let classes = [props.class, props.className];
			return delete props.class, props.className = [
				"sbdocs",
				`sbdocs-${key}`,
				...classes
			].filter(Boolean).join(" "), props;
		};
		headerCommon = ({ theme }) => ({
			margin: "20px 0 8px",
			padding: 0,
			cursor: "text",
			position: "relative",
			color: theme.color.defaultText,
			"&:first-of-type": {
				marginTop: 0,
				paddingTop: 0
			},
			"&:hover a.anchor": { textDecoration: "none" },
			"& tt, & code": { fontSize: "inherit" }
		});
		codeCommon = ({ theme }) => ({
			lineHeight: 1,
			margin: "0 2px",
			padding: "3px 5px",
			whiteSpace: "nowrap",
			borderRadius: 3,
			fontSize: theme.typography.size.s2 - 1,
			border: theme.base === "light" ? "1px solid hsl(0 0 0 / 0.05)" : "1px solid hsl(0 0 100 / 0.05)",
			color: theme.color.defaultText,
			backgroundColor: theme.base === "light" ? "hsl(0 0 0 / 0.01)" : "hsl(0 0 100 / 0.02)"
		});
		withReset = ({ theme }) => ({
			fontFamily: theme.typography.fonts.base,
			fontSize: theme.typography.size.s3,
			margin: 0,
			WebkitFontSmoothing: "antialiased",
			MozOsxFontSmoothing: "grayscale",
			WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
			WebkitOverflowScrolling: "touch"
		});
		withMargin = { margin: "16px 0" };
		ResetWrapper = styled.div(withReset);
		Link = ({ href: input = "", ...props }) => {
			let href = /^\//.test(input) ? `./?path=${input}` : input, target = /^#.*/.test(input) ? "_self" : "_top";
			return import_react$2.createElement("a", {
				href,
				target,
				...props
			});
		};
		A = styled(Link)(({ theme }) => ({
			...withReset({ theme }),
			fontSize: "inherit",
			lineHeight: "24px",
			color: theme.color.secondary,
			textDecoration: "underline",
			textDecorationThickness: "0.03125rem",
			textUnderlineOffset: "0.11em",
			"&.absent": { color: "#cc0000" },
			"&.anchor": {
				display: "block",
				paddingLeft: 30,
				marginLeft: -30,
				cursor: "pointer",
				position: "absolute",
				top: 0,
				left: 0,
				bottom: 0,
				textDecoration: "none"
			},
			"&.anchor:hover, &.anchor:focus": { textDecoration: "underline" },
			"& code": {
				color: "inherit",
				textDecoration: "underline",
				textDecorationThickness: "0.03125rem",
				paddingLeft: 0,
				paddingRight: 0,
				"&::before": {
					content: "\"\\00a0\"",
					fontSize: "0.5em"
				},
				"&::after": {
					content: "\"\\00a0\"",
					fontSize: "0.5em"
				}
			}
		}));
		Blockquote = styled.blockquote(({ theme }) => ({
			...withReset({ theme }),
			...withMargin,
			borderLeft: `4px solid ${theme.color.medium}`,
			padding: "0 15px",
			color: theme.color.dark,
			"& > :first-of-type": { marginTop: 0 },
			"& > :last-child": { marginBottom: 0 }
		}));
		languages = [];
		Comp = null;
		LazySyntaxHighlighter = (0, import_react$4.lazy)(async () => {
			let { SyntaxHighlighter: SyntaxHighlighter2 } = await __vitePreload(async () => {
				const { SyntaxHighlighter: SyntaxHighlighter2 } = await import("./syntaxhighlighter-4REYKNEV-C7duZJGc.js");
				return { SyntaxHighlighter: SyntaxHighlighter2 };
			}, __vite__mapDeps([5,1,2,3,4,6,7,8,0,9]), import.meta.url);
			return languages.length > 0 && (languages.forEach((args) => {
				SyntaxHighlighter2.registerLanguage(...args);
			}), languages = []), Comp === null && (Comp = SyntaxHighlighter2), { default: (props) => import_react$4.createElement(SyntaxHighlighter2, { ...props }) };
		});
		LazySyntaxHighlighterWithFormatter = (0, import_react$4.lazy)(async () => {
			let [{ SyntaxHighlighter: SyntaxHighlighter2 }, { formatter }] = await Promise.all([__vitePreload(() => import("./syntaxhighlighter-4REYKNEV-C7duZJGc.js"), __vite__mapDeps([5,1,2,3,4,6,7,8,0,9]), import.meta.url), __vitePreload(() => import("./formatter-L2YTDE3Q-B2pOGD8Z.js"), __vite__mapDeps([10,1,3,4]), import.meta.url)]);
			return languages.length > 0 && (languages.forEach((args) => {
				SyntaxHighlighter2.registerLanguage(...args);
			}), languages = []), Comp === null && (Comp = SyntaxHighlighter2), { default: (props) => import_react$4.createElement(SyntaxHighlighter2, {
				...props,
				formatter
			}) };
		});
		SyntaxHighlighter = (props) => import_react$4.createElement(import_react$4.Suspense, { fallback: import_react$4.createElement("div", null) }, props.format !== !1 ? import_react$4.createElement(LazySyntaxHighlighterWithFormatter, { ...props }) : import_react$4.createElement(LazySyntaxHighlighter, { ...props }));
		SyntaxHighlighter.registerLanguage = (...args) => {
			if (Comp !== null) {
				Comp.registerLanguage(...args);
				return;
			}
			languages.push(args);
		};
		isReactChildString = (child) => typeof child == "string";
		isInlineCodeRegex = /[\n\r]/g;
		DefaultCodeBlock = styled.code(({ theme }) => ({
			fontFamily: theme.typography.fonts.mono,
			WebkitFontSmoothing: "antialiased",
			MozOsxFontSmoothing: "grayscale",
			display: "inline-block",
			paddingLeft: 2,
			paddingRight: 2,
			verticalAlign: "baseline",
			color: "inherit",
			...codeCommon({ theme })
		}));
		StyledSyntaxHighlighter = styled(SyntaxHighlighter)(({ theme }) => ({
			fontFamily: theme.typography.fonts.mono,
			fontSize: `${theme.typography.size.s2 - 1}px`,
			lineHeight: "19px",
			margin: "25px 0 40px",
			borderRadius: theme.appBorderRadius,
			boxShadow: theme.base === "light" ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0" : "rgba(0, 0, 0, 0.20) 0 2px 5px 0",
			"pre.prismjs": {
				padding: 20,
				background: "inherit"
			}
		}));
		Code = ({ className, children, ...props }) => {
			let language = (className || "").match(/lang-(\S+)/), childrenArray = import_react$3.Children.toArray(children);
			return childrenArray.filter(isReactChildString).some((child) => child.match(isInlineCodeRegex)) ? import_react$3.createElement(StyledSyntaxHighlighter, {
				bordered: !0,
				copyable: !0,
				language: language?.[1] ?? "text",
				format: !1,
				...props
			}, children) : import_react$3.createElement(DefaultCodeBlock, {
				...props,
				className
			}, childrenArray);
		};
		DL = styled.dl(({ theme }) => ({
			...withReset({ theme }),
			...withMargin,
			padding: 0,
			"& dt": {
				fontSize: "14px",
				fontWeight: "bold",
				fontStyle: "italic",
				padding: 0,
				margin: "16px 0 4px"
			},
			"& dt:first-of-type": { padding: 0 },
			"& dt > :first-of-type": { marginTop: 0 },
			"& dt > :last-child": { marginBottom: 0 },
			"& dd": {
				margin: "0 0 16px",
				padding: "0 15px"
			},
			"& dd > :first-of-type": { marginTop: 0 },
			"& dd > :last-child": { marginBottom: 0 }
		}));
		Div = styled.div(withReset);
		H1 = styled.h1(({ theme }) => ({
			...withReset({ theme }),
			...headerCommon({ theme }),
			fontSize: `${theme.typography.size.l1}px`,
			fontWeight: theme.typography.weight.bold
		}));
		H2 = styled.h2(({ theme }) => ({
			...withReset({ theme }),
			...headerCommon({ theme }),
			fontSize: `${theme.typography.size.m2}px`,
			paddingBottom: 4,
			borderBottom: `1px solid ${theme.appBorderColor}`
		}));
		H3 = styled.h3(({ theme }) => ({
			...withReset({ theme }),
			...headerCommon({ theme }),
			fontSize: `${theme.typography.size.m1}px`
		}));
		H4 = styled.h4(({ theme }) => ({
			...withReset({ theme }),
			...headerCommon({ theme }),
			fontSize: `${theme.typography.size.s3}px`
		}));
		H5 = styled.h5(({ theme }) => ({
			...withReset({ theme }),
			...headerCommon({ theme }),
			fontSize: `${theme.typography.size.s2}px`
		}));
		H6 = styled.h6(({ theme }) => ({
			...withReset({ theme }),
			...headerCommon({ theme }),
			fontSize: `${theme.typography.size.s2}px`,
			color: theme.color.dark
		}));
		HR = styled.hr(({ theme }) => ({
			border: "0 none",
			borderTop: `1px solid ${theme.appBorderColor}`,
			height: 4,
			padding: 0
		}));
		Img = styled.img({ maxWidth: "100%" });
		LI = styled.li(({ theme }) => ({
			...withReset({ theme }),
			fontSize: theme.typography.size.s2,
			color: theme.color.defaultText,
			lineHeight: "24px",
			"& + li": { marginTop: ".25em" },
			"& ul, & ol": {
				marginTop: ".25em",
				marginBottom: 0
			},
			"& code": codeCommon({ theme })
		}));
		listCommon = {
			paddingLeft: 30,
			"& :first-of-type": { marginTop: 0 },
			"& :last-child": { marginBottom: 0 }
		};
		OL = styled.ol(({ theme }) => ({
			...withReset({ theme }),
			...withMargin,
			...listCommon,
			listStyle: "decimal"
		}));
		P = styled.p(({ theme }) => ({
			...withReset({ theme }),
			...withMargin,
			fontSize: theme.typography.size.s2,
			lineHeight: "24px",
			color: theme.color.defaultText,
			"& code": codeCommon({ theme })
		}));
		Pre = styled.pre(({ theme }) => ({
			...withReset({ theme }),
			...withMargin,
			fontFamily: theme.typography.fonts.mono,
			WebkitFontSmoothing: "antialiased",
			MozOsxFontSmoothing: "grayscale",
			lineHeight: "18px",
			padding: "11px 1rem",
			whiteSpace: "pre-wrap",
			color: "inherit",
			borderRadius: 3,
			margin: "1rem 0",
			"&:not(.prismjs)": {
				background: "transparent",
				border: "none",
				borderRadius: 0,
				padding: 0,
				margin: 0
			},
			"& pre, &.prismjs": {
				padding: 15,
				margin: 0,
				whiteSpace: "pre-wrap",
				color: "inherit",
				fontSize: "13px",
				lineHeight: "19px",
				code: {
					color: "inherit",
					fontSize: "inherit"
				}
			},
			"& code": { whiteSpace: "pre" },
			"& code, & tt": { border: "none" }
		}));
		Span = styled.span(({ theme }) => ({
			...withReset({ theme }),
			"&.frame": {
				display: "block",
				overflow: "hidden",
				"& > span": {
					border: `1px solid ${theme.color.medium}`,
					display: "block",
					float: "left",
					overflow: "hidden",
					margin: "13px 0 0",
					padding: 7,
					width: "auto"
				},
				"& span img": {
					display: "block",
					float: "left"
				},
				"& span span": {
					clear: "both",
					color: theme.color.darkest,
					display: "block",
					padding: "5px 0 0"
				}
			},
			"&.align-center": {
				display: "block",
				overflow: "hidden",
				clear: "both",
				"& > span": {
					display: "block",
					overflow: "hidden",
					margin: "13px auto 0",
					textAlign: "center"
				},
				"& span img": {
					margin: "0 auto",
					textAlign: "center"
				}
			},
			"&.align-right": {
				display: "block",
				overflow: "hidden",
				clear: "both",
				"& > span": {
					display: "block",
					overflow: "hidden",
					margin: "13px 0 0",
					textAlign: "right"
				},
				"& span img": {
					margin: 0,
					textAlign: "right"
				}
			},
			"&.float-left": {
				display: "block",
				marginRight: 13,
				overflow: "hidden",
				float: "left",
				"& span": { margin: "13px 0 0" }
			},
			"&.float-right": {
				display: "block",
				marginLeft: 13,
				overflow: "hidden",
				float: "right",
				"& > span": {
					display: "block",
					overflow: "hidden",
					margin: "13px auto 0",
					textAlign: "right"
				}
			}
		}));
		TT = styled.title(codeCommon);
		Table = styled.table(({ theme }) => ({
			...withReset({ theme }),
			...withMargin,
			fontSize: theme.typography.size.s2,
			lineHeight: "24px",
			padding: 0,
			borderCollapse: "collapse",
			"& tr": {
				borderTop: `1px solid ${theme.appBorderColor}`,
				backgroundColor: theme.appContentBg,
				margin: 0,
				padding: 0
			},
			"& tr:nth-of-type(2n)": { backgroundColor: theme.base === "dark" ? theme.color.darker : theme.color.lighter },
			"& tr th": {
				fontWeight: "bold",
				color: theme.color.defaultText,
				border: `1px solid ${theme.appBorderColor}`,
				margin: 0,
				padding: "6px 13px"
			},
			"& tr td": {
				border: `1px solid ${theme.appBorderColor}`,
				color: theme.color.defaultText,
				margin: 0,
				padding: "6px 13px"
			},
			"& tr th :first-of-type, & tr td :first-of-type": { marginTop: 0 },
			"& tr th :last-child, & tr td :last-child": { marginBottom: 0 }
		}));
		listCommon2 = {
			paddingLeft: 30,
			"& :first-of-type": { marginTop: 0 },
			"& :last-child": { marginBottom: 0 }
		};
		UL = styled.ul(({ theme }) => ({
			...withReset({ theme }),
			...withMargin,
			...listCommon2,
			listStyle: "disc"
		}));
		components = {
			h1: (props) => import_react$1.createElement(H1, { ...nameSpaceClassNames(props, "h1") }),
			h2: (props) => import_react$1.createElement(H2, { ...nameSpaceClassNames(props, "h2") }),
			h3: (props) => import_react$1.createElement(H3, { ...nameSpaceClassNames(props, "h3") }),
			h4: (props) => import_react$1.createElement(H4, { ...nameSpaceClassNames(props, "h4") }),
			h5: (props) => import_react$1.createElement(H5, { ...nameSpaceClassNames(props, "h5") }),
			h6: (props) => import_react$1.createElement(H6, { ...nameSpaceClassNames(props, "h6") }),
			pre: (props) => import_react$1.createElement(Pre, { ...nameSpaceClassNames(props, "pre") }),
			a: (props) => import_react$1.createElement(A, { ...nameSpaceClassNames(props, "a") }),
			hr: (props) => import_react$1.createElement(HR, { ...nameSpaceClassNames(props, "hr") }),
			dl: (props) => import_react$1.createElement(DL, { ...nameSpaceClassNames(props, "dl") }),
			blockquote: (props) => import_react$1.createElement(Blockquote, { ...nameSpaceClassNames(props, "blockquote") }),
			table: (props) => import_react$1.createElement(Table, { ...nameSpaceClassNames(props, "table") }),
			img: (props) => import_react$1.createElement(Img, { ...nameSpaceClassNames(props, "img") }),
			div: (props) => import_react$1.createElement(Div, { ...nameSpaceClassNames(props, "div") }),
			span: (props) => import_react$1.createElement(Span, { ...nameSpaceClassNames(props, "span") }),
			li: (props) => import_react$1.createElement(LI, { ...nameSpaceClassNames(props, "li") }),
			ul: (props) => import_react$1.createElement(UL, { ...nameSpaceClassNames(props, "ul") }),
			ol: (props) => import_react$1.createElement(OL, { ...nameSpaceClassNames(props, "ol") }),
			p: (props) => import_react$1.createElement(P, { ...nameSpaceClassNames(props, "p") }),
			code: (props) => import_react$1.createElement(Code, { ...nameSpaceClassNames(props, "code") }),
			tt: (props) => import_react$1.createElement(TT, { ...nameSpaceClassNames(props, "tt") }),
			resetwrapper: (props) => import_react$1.createElement(ResetWrapper, { ...nameSpaceClassNames(props, "resetwrapper") })
		};
		styled.div(({ theme, compact }) => ({
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			fontSize: theme.typography.size.s1,
			fontWeight: theme.typography.weight.bold,
			lineHeight: "12px",
			minWidth: 20,
			borderRadius: 20,
			padding: compact ? "4px 7px" : "4px 10px"
		}), { svg: {
			height: 12,
			width: 12,
			marginRight: 4,
			marginTop: -2,
			path: { fill: "currentColor" }
		} }, ({ theme, status }) => {
			switch (status) {
				case "critical": return {
					color: theme.fgColor.critical,
					background: theme.bgColor.critical,
					boxShadow: `inset 0 0 0 1px ${theme.borderColor.critical}`
				};
				case "negative": return {
					color: theme.fgColor.negative,
					background: theme.bgColor.negative,
					boxShadow: `inset 0 0 0 1px ${theme.borderColor.negative}`
				};
				case "warning": return {
					color: theme.fgColor.warning,
					background: theme.bgColor.warning,
					boxShadow: `inset 0 0 0 1px ${theme.borderColor.warning}`
				};
				case "neutral": return {
					color: theme.fgColor.muted,
					background: theme.base === "dark" ? theme.barBg : theme.background.app,
					boxShadow: `inset 0 0 0 1px ${curriedTransparentize$1(.8, theme.textMutedColor)}`
				};
				case "positive": return {
					color: theme.fgColor.positive,
					background: theme.bgColor.positive,
					boxShadow: `inset 0 0 0 1px ${theme.borderColor.positive}`
				};
				case "active": return {
					color: theme.base === "light" ? curriedDarken$1(.1, theme.color.secondary) : theme.color.secondary,
					background: theme.background.hoverable,
					boxShadow: `inset 0 0 0 1px ${curriedTransparentize$1(.9, theme.color.secondary)}`
				};
				default: return {};
			}
		});
		({deprecate} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		LEFT_BUTTON = 0;
		isPlainLeftClick = (e) => e.button === LEFT_BUTTON && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey;
		cancelled = (e, cb) => {
			isPlainLeftClick(e) && (e.preventDefault(), cb(e));
		};
		LinkInner = styled.span(({ withArrow }) => withArrow ? { "> svg:last-of-type": {
			height: "0.7em",
			width: "0.7em",
			marginRight: 0,
			marginLeft: "0.25em",
			bottom: "auto",
			verticalAlign: "inherit"
		} } : {}, ({ containsIcon }) => containsIcon ? { svg: {
			height: "1em",
			width: "1em",
			verticalAlign: "middle",
			position: "relative",
			bottom: 0,
			marginRight: 0
		} } : {});
		A2 = styled.a(({ theme }) => ({
			display: "inline-block",
			transition: "all 150ms ease-out",
			textDecoration: "none",
			color: theme.color.secondary,
			"&:hover, &:focus": {
				cursor: "pointer",
				color: curriedDarken$1(.07, theme.color.secondary),
				"svg path:not([fill])": { fill: curriedDarken$1(.07, theme.color.secondary) }
			},
			"&:active": {
				color: curriedDarken$1(.1, theme.color.secondary),
				"svg path:not([fill])": { fill: curriedDarken$1(.1, theme.color.secondary) }
			},
			svg: {
				display: "inline-block",
				height: "1em",
				width: "1em",
				verticalAlign: "text-top",
				position: "relative",
				bottom: "-0.125em",
				marginRight: "0.4em",
				"& path": { fill: theme.color.secondary }
			}
		}), ({ theme, secondary, tertiary }) => {
			let colors;
			return secondary && (colors = [
				theme.textMutedColor,
				theme.color.secondary,
				theme.color.secondary
			]), tertiary && (colors = [
				theme.color.dark,
				theme.color.secondary,
				theme.color.secondary
			]), colors ? {
				color: colors[0],
				"svg path:not([fill])": { fill: colors[0] },
				"&:hover": {
					color: colors[1],
					"svg path:not([fill])": { fill: colors[1] }
				},
				"&:active": {
					color: colors[2],
					"svg path:not([fill])": { fill: colors[2] }
				}
			} : {};
		}, ({ nochrome }) => nochrome ? {
			color: "inherit",
			"&:hover, &:active": {
				color: "inherit",
				textDecoration: "underline"
			}
		} : {}, ({ theme, inverse }) => inverse ? {
			color: theme.color.lightest,
			":not([fill])": { fill: theme.color.lightest },
			"&:hover": {
				color: theme.color.lighter,
				"svg path:not([fill])": { fill: theme.color.lighter }
			},
			"&:active": {
				color: theme.color.light,
				"svg path:not([fill])": { fill: theme.color.light }
			}
		} : {}, ({ isButton: isButton2, theme }) => isButton2 ? {
			border: 0,
			borderRadius: theme.input.borderRadius,
			background: "none",
			padding: 0,
			fontSize: "inherit",
			lineHeight: "inherit",
			"&:focus-visible": {
				outline: `2px solid ${theme.color.secondary}`,
				outlineOffset: 2,
				zIndex: "1"
			}
		} : {});
		Link2 = (0, import_react$6.forwardRef)(({ cancel = !0, children, onClick = void 0, withArrow = !1, containsIcon = !1, className = void 0, isButton: isButton2 = void 0, href, ...rest }, ref) => (isButton2 !== void 0 && deprecate("Link: `isButton` is deprecated and will be removed in Storybook 11. Links without a `href` are automatically rendered as buttons."), import_react$6.createElement(A2, {
			as: href ? "a" : "button",
			href,
			...rest,
			ref,
			isButton: !href || isButton2 === !0,
			onClick: onClick && cancel ? (e) => cancelled(e, onClick) : onClick,
			className
		}, import_react$6.createElement(LinkInner, {
			withArrow,
			containsIcon
		}, children, withArrow && import_react$6.createElement(ChevronRightIcon, null)))));
		Link2.displayName = "Link";
		styled.div(({ theme }) => ({
			fontSize: `${theme.typography.size.s2}px`,
			lineHeight: "1.6",
			h1: {
				fontSize: `${theme.typography.size.l1}px`,
				fontWeight: theme.typography.weight.bold
			},
			h2: {
				fontSize: `${theme.typography.size.m2}px`,
				borderBottom: `1px solid ${theme.appBorderColor}`
			},
			h3: { fontSize: `${theme.typography.size.m1}px` },
			h4: { fontSize: `${theme.typography.size.s3}px` },
			h5: { fontSize: `${theme.typography.size.s2}px` },
			h6: {
				fontSize: `${theme.typography.size.s2}px`,
				color: theme.color.dark
			},
			"pre:not(.prismjs)": {
				background: "transparent",
				border: "none",
				borderRadius: 0,
				padding: 0,
				margin: 0
			},
			"pre pre, pre.prismjs": {
				padding: 15,
				margin: 0,
				whiteSpace: "pre-wrap",
				color: "inherit",
				fontSize: "13px",
				lineHeight: "19px"
			},
			"pre pre code, pre.prismjs code": {
				color: "inherit",
				fontSize: "inherit"
			},
			"pre code": {
				margin: 0,
				padding: 0,
				whiteSpace: "pre",
				border: "none",
				background: "transparent"
			},
			"pre code, pre tt": {
				backgroundColor: "transparent",
				border: "none"
			},
			"body > *:first-of-type": { marginTop: "0 !important" },
			"body > *:last-child": { marginBottom: "0 !important" },
			a: {
				color: theme.color.secondary,
				textDecoration: "underline",
				textDecorationThickness: "0.03125rem",
				textUnderlineOffset: "0.11em",
				"& code": {
					color: "inherit",
					textDecoration: "underline",
					textDecorationThickness: "0.03125rem",
					paddingLeft: 0,
					paddingRight: 0,
					"&::before": {
						content: "\"\\00a0\"",
						fontSize: "0.5em"
					},
					"&::after": {
						content: "\"\\00a0\"",
						fontSize: "0.5em"
					}
				}
			},
			"a.absent": { color: "#cc0000" },
			"a.anchor": {
				display: "block",
				paddingLeft: 30,
				marginLeft: -30,
				cursor: "pointer",
				position: "absolute",
				top: 0,
				left: 0,
				bottom: 0,
				textDecoration: "none"
			},
			"&.anchor:hover, &.anchor:focus": { textDecoration: "underline" },
			"h1, h2, h3, h4, h5, h6": {
				margin: "20px 0 10px",
				padding: 0,
				cursor: "text",
				position: "relative",
				"&:first-of-type": {
					marginTop: 0,
					paddingTop: 0
				},
				"&:hover a.anchor": { textDecoration: "none" },
				"& tt, & code": { fontSize: "inherit" }
			},
			"h1:first-of-type + h2": {
				marginTop: 0,
				paddingTop: 0
			},
			"p, blockquote, ul, ol, dl, li, table, pre": { margin: "15px 0" },
			hr: {
				border: "0 none",
				borderTop: `1px solid ${theme.appBorderColor}`,
				height: 4,
				padding: 0
			},
			"body > h1:first-of-type, body > h2:first-of-type, body > h3:first-of-type, body > h4:first-of-type, body > h5:first-of-type, body > h6:first-of-type": {
				marginTop: 0,
				paddingTop: 0
			},
			"body > h1:first-of-type + h2": {
				marginTop: 0,
				paddingTop: 0
			},
			"a:first-of-type h1, a:first-of-type h2, a:first-of-type h3, a:first-of-type h4, a:first-of-type h5, a:first-of-type h6": {
				marginTop: 0,
				paddingTop: 0
			},
			"h1 p, h2 p, h3 p, h4 p, h5 p, h6 p": { marginTop: 0 },
			"li p.first": { display: "inline-block" },
			"ul, ol": {
				paddingLeft: 30,
				"& :first-of-type": { marginTop: 0 },
				"& :last-child": { marginBottom: 0 }
			},
			dl: { padding: 0 },
			"dl dt": {
				fontSize: "14px",
				fontWeight: "bold",
				fontStyle: "italic",
				margin: "0 0 15px",
				padding: "0 15px",
				"&:first-of-type": { padding: 0 },
				"& > :first-of-type": { marginTop: 0 },
				"& > :last-child": { marginBottom: 0 }
			},
			blockquote: {
				borderLeft: `4px solid ${theme.color.medium}`,
				padding: "0 15px",
				color: theme.color.dark,
				"& > :first-of-type": { marginTop: 0 },
				"& > :last-child": { marginBottom: 0 }
			},
			table: {
				padding: 0,
				borderCollapse: "collapse",
				"& tr": {
					borderTop: `1px solid ${theme.appBorderColor}`,
					backgroundColor: "white",
					margin: 0,
					padding: 0,
					"& th": {
						fontWeight: "bold",
						border: `1px solid ${theme.appBorderColor}`,
						textAlign: "left",
						margin: 0,
						padding: "6px 13px"
					},
					"& td": {
						border: `1px solid ${theme.appBorderColor}`,
						textAlign: "left",
						margin: 0,
						padding: "6px 13px"
					},
					"&:nth-of-type(2n)": { backgroundColor: theme.color.lighter },
					"& th :first-of-type, & td :first-of-type": { marginTop: 0 },
					"& th :last-child, & td :last-child": { marginBottom: 0 }
				}
			},
			img: { maxWidth: "100%" },
			"span.frame": {
				display: "block",
				overflow: "hidden",
				"& > span": {
					border: `1px solid ${theme.color.medium}`,
					display: "block",
					float: "left",
					overflow: "hidden",
					margin: "13px 0 0",
					padding: 7,
					width: "auto"
				},
				"& span img": {
					display: "block",
					float: "left"
				},
				"& span span": {
					clear: "both",
					color: theme.color.darkest,
					display: "block",
					padding: "5px 0 0"
				}
			},
			"span.align-center": {
				display: "block",
				overflow: "hidden",
				clear: "both",
				"& > span": {
					display: "block",
					overflow: "hidden",
					margin: "13px auto 0",
					textAlign: "center"
				},
				"& span img": {
					margin: "0 auto",
					textAlign: "center"
				}
			},
			"span.align-right": {
				display: "block",
				overflow: "hidden",
				clear: "both",
				"& > span": {
					display: "block",
					overflow: "hidden",
					margin: "13px 0 0",
					textAlign: "right"
				},
				"& span img": {
					margin: 0,
					textAlign: "right"
				}
			},
			"span.float-left": {
				display: "block",
				marginRight: 13,
				overflow: "hidden",
				float: "left",
				"& span": { margin: "13px 0 0" }
			},
			"span.float-right": {
				display: "block",
				marginLeft: 13,
				overflow: "hidden",
				float: "right",
				"& > span": {
					display: "block",
					overflow: "hidden",
					margin: "13px auto 0",
					textAlign: "right"
				}
			},
			"code, tt": {
				margin: "0 2px",
				padding: "0 5px",
				whiteSpace: "nowrap",
				border: `1px solid ${theme.color.mediumlight}`,
				backgroundColor: theme.color.lighter,
				borderRadius: 3,
				color: theme.base === "dark" ? theme.color.darkest : theme.color.dark
			}
		}));
		({global: global$1} = __STORYBOOK_MODULE_GLOBAL__);
		({document: document2, window: globalWindow} = global$1);
		({deprecate: deprecate3} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		Slot = createSlot("Slot");
		SLOTTABLE_IDENTIFIER = /* @__PURE__ */ Symbol.for("radix.slottable");
		createSlottable("Slottable");
		getSlottableElementFromSlottable = (slottable, child) => {
			if ("child" in slottable.props) {
				let child2 = slottable.props.child;
				return import_react$9.isValidElement(child2) ? import_react$9.cloneElement(child2, void 0, slottable.props.children(child2.props.children)) : null;
			}
			return import_react$9.isValidElement(child) ? child : null;
		};
		REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
		createSlotError = (ownerName) => `${ownerName} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`;
		createSlottableError = (ownerName) => `${ownerName} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`;
		use = import_react$9[" use ".trim().toString()];
		DEFAULT_MAX_WIDTH = 260;
		Note = styled.div(({ theme }) => ({
			fontFamily: theme.typography.fonts.base,
			padding: "2px 6px",
			lineHeight: "16px",
			fontSize: 10,
			fontWeight: theme.typography.weight.bold,
			color: theme.color.lightest,
			boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.3)",
			borderRadius: 4,
			pointerEvents: "none",
			zIndex: -1,
			background: theme.base === "light" ? "rgba(60, 60, 60, 0.9)" : "rgba(0, 0, 0, 0.95)"
		}), ({ maxWidth }) => ({ maxWidth }));
		TooltipNote = ({ note, maxWidth = DEFAULT_MAX_WIDTH, ...props }) => import_react$12.createElement(Note, {
			maxWidth,
			...props
		}, note);
		({deprecate: deprecate2} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c = typeof document < "u" ? import_react$14.useLayoutEffect : () => {};
		$b5e257d569688ac6$var$defaultContext = {
			prefix: String(Math.round(Math.random() * 1e10)),
			current: 0
		};
		$b5e257d569688ac6$var$SSRContext = import_react$17.createContext($b5e257d569688ac6$var$defaultContext);
		$b5e257d569688ac6$var$IsSSRContext = import_react$17.createContext(!1);
		typeof window < "u" && window.document && window.document.createElement;
		$b5e257d569688ac6$var$componentIds = /* @__PURE__ */ new WeakMap();
		$b5e257d569688ac6$export$619500959fc48b26 = typeof import_react$17.useId == "function" ? $b5e257d569688ac6$var$useModernSSRSafeId : $b5e257d569688ac6$var$useLegacySSRSafeId;
		$bdb11010cef70236$var$canUseDOM = !!(typeof window < "u" && window.document && window.document.createElement);
		$bdb11010cef70236$export$d41a04c74483c6ef = /* @__PURE__ */ new Map();
		typeof FinalizationRegistry < "u" && ($bdb11010cef70236$var$registry = new FinalizationRegistry((heldValue) => {
			$bdb11010cef70236$export$d41a04c74483c6ef.delete(heldValue);
		}));
		$431fbd86ca7dc216$export$b204af158042fbac = (el) => {
			var _el_ownerDocument;
			return (_el_ownerDocument = el?.ownerDocument) !== null && _el_ownerDocument !== void 0 ? _el_ownerDocument : document;
		};
		$431fbd86ca7dc216$export$f21a1ffae260145a = (el) => el && "window" in el && el.window === el ? el : $431fbd86ca7dc216$export$b204af158042fbac(el).defaultView || window;
		$f4e2df6bd15f8569$var$_shadowDOM = !1;
		$d4ee10de306f2510$export$cd4e5573fbe2b576 = (doc = document) => {
			var _activeElement_shadowRoot;
			if (!$f4e2df6bd15f8569$export$98658e8c59125e6a()) return doc.activeElement;
			let activeElement = doc.activeElement;
			for (; activeElement && "shadowRoot" in activeElement && !((_activeElement_shadowRoot = activeElement.shadowRoot) === null || _activeElement_shadowRoot === void 0) && _activeElement_shadowRoot.activeElement;) activeElement = activeElement.shadowRoot.activeElement;
			return activeElement;
		};
		$dfc540311bf7f109$export$63eb3ababa9c55c4 = class {
			get currentNode() {
				return this._currentNode;
			}
			set currentNode(node) {
				if (!$d4ee10de306f2510$export$4282f70798064fe0(this.root, node)) throw new Error("Cannot set currentNode to a node that is not contained by the root node.");
				let walkers = [], curNode = node, currentWalkerCurrentNode = node;
				for (this._currentNode = node; curNode && curNode !== this.root;) if (curNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
					let shadowRoot = curNode, walker2 = this._doc.createTreeWalker(shadowRoot, this.whatToShow, { acceptNode: this._acceptNode });
					walkers.push(walker2), walker2.currentNode = currentWalkerCurrentNode, this._currentSetFor.add(walker2), curNode = currentWalkerCurrentNode = shadowRoot.host;
				} else curNode = curNode.parentNode;
				let walker = this._doc.createTreeWalker(this.root, this.whatToShow, { acceptNode: this._acceptNode });
				walkers.push(walker), walker.currentNode = currentWalkerCurrentNode, this._currentSetFor.add(walker), this._walkerStack = walkers;
			}
			get doc() {
				return this._doc;
			}
			firstChild() {
				let currentNode = this.currentNode, newNode = this.nextNode();
				return $d4ee10de306f2510$export$4282f70798064fe0(currentNode, newNode) ? (newNode && (this.currentNode = newNode), newNode) : (this.currentNode = currentNode, null);
			}
			lastChild() {
				let newNode = this._walkerStack[0].lastChild();
				return newNode && (this.currentNode = newNode), newNode;
			}
			nextNode() {
				let nextNode = this._walkerStack[0].nextNode();
				if (nextNode) {
					if (nextNode.shadowRoot) {
						var _this_filter;
						let nodeResult;
						if (typeof this.filter == "function" ? nodeResult = this.filter(nextNode) : (_this_filter = this.filter) !== null && _this_filter !== void 0 && _this_filter.acceptNode && (nodeResult = this.filter.acceptNode(nextNode)), nodeResult === NodeFilter.FILTER_ACCEPT) return this.currentNode = nextNode, nextNode;
						let newNode = this.nextNode();
						return newNode && (this.currentNode = newNode), newNode;
					}
					return nextNode && (this.currentNode = nextNode), nextNode;
				} else if (this._walkerStack.length > 1) {
					this._walkerStack.shift();
					let newNode = this.nextNode();
					return newNode && (this.currentNode = newNode), newNode;
				} else return null;
			}
			previousNode() {
				let currentWalker = this._walkerStack[0];
				if (currentWalker.currentNode === currentWalker.root) {
					if (this._currentSetFor.has(currentWalker)) if (this._currentSetFor.delete(currentWalker), this._walkerStack.length > 1) {
						this._walkerStack.shift();
						let newNode = this.previousNode();
						return newNode && (this.currentNode = newNode), newNode;
					} else return null;
					return null;
				}
				let previousNode = currentWalker.previousNode();
				if (previousNode) {
					if (previousNode.shadowRoot) {
						var _this_filter;
						let nodeResult;
						if (typeof this.filter == "function" ? nodeResult = this.filter(previousNode) : (_this_filter = this.filter) !== null && _this_filter !== void 0 && _this_filter.acceptNode && (nodeResult = this.filter.acceptNode(previousNode)), nodeResult === NodeFilter.FILTER_ACCEPT) return previousNode && (this.currentNode = previousNode), previousNode;
						let newNode = this.lastChild();
						return newNode && (this.currentNode = newNode), newNode;
					}
					return previousNode && (this.currentNode = previousNode), previousNode;
				} else if (this._walkerStack.length > 1) {
					this._walkerStack.shift();
					let newNode = this.previousNode();
					return newNode && (this.currentNode = newNode), newNode;
				} else return null;
			}
			/**
			* @deprecated
			*/
			nextSibling() {
				return null;
			}
			/**
			* @deprecated
			*/
			previousSibling() {
				return null;
			}
			/**
			* @deprecated
			*/
			parentNode() {
				return null;
			}
			constructor(doc, root, whatToShow, filter) {
				this._walkerStack = [], this._currentSetFor = /* @__PURE__ */ new Set(), this._acceptNode = (node) => {
					if (node.nodeType === Node.ELEMENT_NODE) {
						let shadowRoot2 = node.shadowRoot;
						if (shadowRoot2) {
							let walker = this._doc.createTreeWalker(shadowRoot2, this.whatToShow, { acceptNode: this._acceptNode });
							return this._walkerStack.unshift(walker), NodeFilter.FILTER_ACCEPT;
						} else {
							var _this_filter;
							if (typeof this.filter == "function") return this.filter(node);
							if (!((_this_filter = this.filter) === null || _this_filter === void 0) && _this_filter.acceptNode) return this.filter.acceptNode(node);
							if (this.filter === null) return NodeFilter.FILTER_ACCEPT;
						}
					}
					return NodeFilter.FILTER_SKIP;
				}, this._doc = doc, this.root = root, this.filter = filter ?? null, this.whatToShow = whatToShow ?? NodeFilter.SHOW_ALL, this._currentNode = root, this._walkerStack.unshift(doc.createTreeWalker(root, whatToShow, this._acceptNode));
				let shadowRoot = root.shadowRoot;
				if (shadowRoot) {
					let walker = this._doc.createTreeWalker(shadowRoot, this.whatToShow, { acceptNode: this._acceptNode });
					this._walkerStack.unshift(walker);
				}
			}
		};
		clsx_default = clsx;
		$65484d02dcb7eb3e$var$DOMPropNames = /* @__PURE__ */ new Set(["id"]);
		$65484d02dcb7eb3e$var$labelablePropNames = /* @__PURE__ */ new Set([
			"aria-label",
			"aria-labelledby",
			"aria-describedby",
			"aria-details"
		]);
		$65484d02dcb7eb3e$var$linkPropNames = /* @__PURE__ */ new Set([
			"href",
			"hrefLang",
			"target",
			"rel",
			"download",
			"ping",
			"referrerPolicy"
		]);
		$65484d02dcb7eb3e$var$globalAttrs = /* @__PURE__ */ new Set([
			"dir",
			"lang",
			"hidden",
			"inert",
			"translate"
		]);
		$65484d02dcb7eb3e$var$globalEvents = /* @__PURE__ */ new Set([
			"onClick",
			"onAuxClick",
			"onContextMenu",
			"onDoubleClick",
			"onMouseDown",
			"onMouseEnter",
			"onMouseLeave",
			"onMouseMove",
			"onMouseOut",
			"onMouseOver",
			"onMouseUp",
			"onTouchCancel",
			"onTouchEnd",
			"onTouchMove",
			"onTouchStart",
			"onPointerDown",
			"onPointerMove",
			"onPointerUp",
			"onPointerCancel",
			"onPointerEnter",
			"onPointerLeave",
			"onPointerOver",
			"onPointerOut",
			"onGotPointerCapture",
			"onLostPointerCapture",
			"onScroll",
			"onWheel",
			"onAnimationStart",
			"onAnimationEnd",
			"onAnimationIteration",
			"onTransitionCancel",
			"onTransitionEnd",
			"onTransitionRun",
			"onTransitionStart"
		]);
		$65484d02dcb7eb3e$var$propRe = /^(data-.*)$/;
		$7215afc6de606d6b$var$supportsPreventScrollCached = null;
		$c87311424ea30a05$export$9ac100e40613ea10 = $c87311424ea30a05$var$cached(function() {
			return $c87311424ea30a05$var$testPlatform(/^Mac/i);
		});
		$c87311424ea30a05$export$186c6964ca17d99 = $c87311424ea30a05$var$cached(function() {
			return $c87311424ea30a05$var$testPlatform(/^iPhone/i);
		});
		$c87311424ea30a05$export$7bef049ce92e4224 = $c87311424ea30a05$var$cached(function() {
			return $c87311424ea30a05$var$testPlatform(/^iPad/i) || $c87311424ea30a05$export$9ac100e40613ea10() && navigator.maxTouchPoints > 1;
		});
		$c87311424ea30a05$export$fedb369cb70207f1 = $c87311424ea30a05$var$cached(function() {
			return $c87311424ea30a05$export$186c6964ca17d99() || $c87311424ea30a05$export$7bef049ce92e4224();
		});
		$c87311424ea30a05$export$e1865c3bedcd822b = $c87311424ea30a05$var$cached(function() {
			return $c87311424ea30a05$export$9ac100e40613ea10() || $c87311424ea30a05$export$fedb369cb70207f1();
		});
		$c87311424ea30a05$export$78551043582a6a98 = $c87311424ea30a05$var$cached(function() {
			return $c87311424ea30a05$var$testUserAgent(/AppleWebKit/i) && !$c87311424ea30a05$export$6446a186d09e379e();
		});
		$c87311424ea30a05$export$6446a186d09e379e = $c87311424ea30a05$var$cached(function() {
			return $c87311424ea30a05$var$testUserAgent(/Chrome/i);
		});
		$c87311424ea30a05$export$a11b0059900ceec8 = $c87311424ea30a05$var$cached(function() {
			return $c87311424ea30a05$var$testUserAgent(/Android/i);
		});
		$c87311424ea30a05$export$b7d78993b74f766d = $c87311424ea30a05$var$cached(function() {
			return $c87311424ea30a05$var$testUserAgent(/Firefox/i);
		});
		$ea8dcbcb9ea1b556$var$RouterContext = (0, import_react$18.createContext)({
			isNative: !0,
			open: $ea8dcbcb9ea1b556$var$openSyntheticLink,
			useHref: (href) => href
		});
		$ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = !1;
		$bbed8b41f857bcc0$var$transitionsByElement = /* @__PURE__ */ new Map();
		$bbed8b41f857bcc0$var$transitionCallbacks = /* @__PURE__ */ new Set();
		typeof document < "u" && (document.readyState !== "loading" ? $bbed8b41f857bcc0$var$setupGlobalEvents() : document.addEventListener("DOMContentLoaded", $bbed8b41f857bcc0$var$setupGlobalEvents));
		$8ae05eaa5c114e9c$var$useEarlyEffect = ($8ae05eaa5c114e9c$var$_React_useInsertionEffect = import_react$22.useInsertionEffect) !== null && $8ae05eaa5c114e9c$var$_React_useInsertionEffect !== void 0 ? $8ae05eaa5c114e9c$var$_React_useInsertionEffect : $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c;
		$21f1aa98acb08317$var$nonTextInputTypes = /* @__PURE__ */ new Set([
			"checkbox",
			"radio",
			"range",
			"color",
			"file",
			"image",
			"button",
			"submit",
			"reset"
		]);
		typeof document < "u" && window.visualViewport;
		$ef06256079686ba0$var$descriptionId = 0;
		$ef06256079686ba0$var$descriptionNodes = /* @__PURE__ */ new Map();
		$5671b20cf9b562b2$export$447a38995de2c711 = "react-aria-clear-focus";
		$5671b20cf9b562b2$export$831c820ad60f9d12 = "react-aria-focus";
		$7d2416ea0959daaa$var$supportsCheckVisibility = typeof Element < "u" && "checkVisibility" in Element.prototype;
		$b4b717babfbb907b$var$focusableElements = [
			"input:not([disabled]):not([type=hidden])",
			"select:not([disabled])",
			"textarea:not([disabled])",
			"button:not([disabled])",
			"a[href]",
			"area[href]",
			"summary",
			"iframe",
			"object",
			"embed",
			"audio[controls]",
			"video[controls]",
			"[contenteditable]:not([contenteditable^=\"false\"])",
			"permission"
		];
		$b4b717babfbb907b$var$FOCUSABLE_ELEMENT_SELECTOR = $b4b717babfbb907b$var$focusableElements.join(":not([hidden]),") + ",[tabindex]:not([disabled]):not([hidden])";
		$b4b717babfbb907b$var$focusableElements.push("[tabindex]:not([tabindex=\"-1\"]):not([disabled])");
		$b4b717babfbb907b$var$TABBABLE_ELEMENT_SELECTOR = $b4b717babfbb907b$var$focusableElements.join(":not([hidden]):not([tabindex=\"-1\"]),");
		$458b0a5536c1a7cf$var$useEarlyEffect = typeof document < "u" ? ($458b0a5536c1a7cf$var$_React_useInsertionEffect = import_react$35.useInsertionEffect) !== null && $458b0a5536c1a7cf$var$_React_useInsertionEffect !== void 0 ? $458b0a5536c1a7cf$var$_React_useInsertionEffect : import_react$35.useLayoutEffect : () => {};
		$8a9cb279dc87e130$export$fda7da73ab5d4c48 = !1;
		$14c0b72509d70225$var$state = "default";
		$14c0b72509d70225$var$savedUserSelect = "";
		$14c0b72509d70225$var$modifiedElementMap = /* @__PURE__ */ new WeakMap();
		$ae1eeba8b9eafd08$export$5165eccb35aaadb5 = import_react$37.createContext({ register: () => {} });
		$ae1eeba8b9eafd08$export$5165eccb35aaadb5.displayName = "PressResponderContext";
		$f6c31cce2adf654f$var$_shouldStopPropagation = /* @__PURE__ */ new WeakMap();
		$f6c31cce2adf654f$var$PressEvent = class {
			continuePropagation() {
				_class_private_field_set(this, $f6c31cce2adf654f$var$_shouldStopPropagation, !1);
			}
			get shouldStopPropagation() {
				return _class_private_field_get(this, $f6c31cce2adf654f$var$_shouldStopPropagation);
			}
			constructor(type, pointerType, originalEvent, state) {
				_class_private_field_init(this, $f6c31cce2adf654f$var$_shouldStopPropagation, {
					writable: !0,
					value: void 0
				}), _class_private_field_set(this, $f6c31cce2adf654f$var$_shouldStopPropagation, !0);
				var _state_target;
				let rect = ((_state_target = state?.target) !== null && _state_target !== void 0 ? _state_target : originalEvent.currentTarget)?.getBoundingClientRect(), x, y = 0, clientX, clientY = null;
				originalEvent.clientX != null && originalEvent.clientY != null && (clientX = originalEvent.clientX, clientY = originalEvent.clientY), rect && (clientX != null && clientY != null ? (x = clientX - rect.left, y = clientY - rect.top) : (x = rect.width / 2, y = rect.height / 2)), this.type = type, this.pointerType = pointerType, this.target = originalEvent.currentTarget, this.shiftKey = originalEvent.shiftKey, this.metaKey = originalEvent.metaKey, this.ctrlKey = originalEvent.ctrlKey, this.altKey = originalEvent.altKey, this.x = x, this.y = y;
			}
		};
		$f6c31cce2adf654f$var$LINK_CLICKED = /* @__PURE__ */ Symbol("linkClicked");
		$f6c31cce2adf654f$var$STYLE_ID = "react-aria-pressable-style";
		$f6c31cce2adf654f$var$PRESSABLE_ATTRIBUTE = "data-react-aria-pressable";
		$f6c31cce2adf654f$var$nonTextInputTypes = /* @__PURE__ */ new Set([
			"checkbox",
			"radio",
			"range",
			"color",
			"file",
			"image",
			"button",
			"submit",
			"reset"
		]);
		$507fabe10e71c6fb$var$currentModality = null;
		$507fabe10e71c6fb$var$changeHandlers = /* @__PURE__ */ new Set();
		$507fabe10e71c6fb$export$d90243b58daecda7 = /* @__PURE__ */ new Map();
		$507fabe10e71c6fb$var$hasEventBeforeFocus = !1;
		$507fabe10e71c6fb$var$hasBlurredWindowRecently = !1;
		$507fabe10e71c6fb$var$FOCUS_VISIBLE_INPUT_KEYS = {
			Tab: !0,
			Escape: !0
		};
		$507fabe10e71c6fb$var$tearDownWindowFocusTracking = (element, loadListener) => {
			let windowObject = $431fbd86ca7dc216$export$f21a1ffae260145a(element), documentObject = $431fbd86ca7dc216$export$b204af158042fbac(element);
			loadListener && documentObject.removeEventListener("DOMContentLoaded", loadListener), $507fabe10e71c6fb$export$d90243b58daecda7.has(windowObject) && (windowObject.HTMLElement.prototype.focus = $507fabe10e71c6fb$export$d90243b58daecda7.get(windowObject).focus, documentObject.removeEventListener("keydown", $507fabe10e71c6fb$var$handleKeyboardEvent, !0), documentObject.removeEventListener("keyup", $507fabe10e71c6fb$var$handleKeyboardEvent, !0), documentObject.removeEventListener("click", $507fabe10e71c6fb$var$handleClickEvent, !0), windowObject.removeEventListener("focus", $507fabe10e71c6fb$var$handleFocusEvent, !0), windowObject.removeEventListener("blur", $507fabe10e71c6fb$var$handleWindowBlur, !1), typeof PointerEvent < "u" && (documentObject.removeEventListener("pointerdown", $507fabe10e71c6fb$var$handlePointerEvent, !0), documentObject.removeEventListener("pointermove", $507fabe10e71c6fb$var$handlePointerEvent, !0), documentObject.removeEventListener("pointerup", $507fabe10e71c6fb$var$handlePointerEvent, !0)), $507fabe10e71c6fb$export$d90243b58daecda7.delete(windowObject));
		};
		typeof document < "u" && $507fabe10e71c6fb$export$2f1888112f558a7d();
		$507fabe10e71c6fb$var$nonTextInputTypes = /* @__PURE__ */ new Set([
			"checkbox",
			"radio",
			"range",
			"color",
			"file",
			"image",
			"button",
			"submit",
			"reset"
		]);
		$f645667febf57a63$export$f9762fab77588ecb = import_react$41.createContext(null);
		$f645667febf57a63$export$13f3202a3e5ddd5 = import_react$41.forwardRef(function(props, ref) {
			let { children, ...otherProps } = props, objRef = $df56164dff5785e2$export$4338b53315abf666(ref), context = {
				...otherProps,
				ref: objRef
			};
			return import_react$41.createElement($f645667febf57a63$export$f9762fab77588ecb.Provider, { value: context }, children);
		});
		$f645667febf57a63$export$35a3bebf7ef2d934 = (0, import_react$41.forwardRef)(({ children, ...props }, ref) => {
			ref = $df56164dff5785e2$export$4338b53315abf666(ref);
			let { focusableProps } = $f645667febf57a63$export$4c014de7c8940b4c(props, ref), child = import_react$41.Children.only(children);
			(0, import_react$41.useEffect)(() => {}, [ref, props.isDisabled]);
			let childRef = parseInt("19.2.5", 10) < 19 ? child.ref : child.props.ref;
			return import_react$41.cloneElement(child, {
				...$3ef42575df84b30b$export$9d1611c77c2fe928(focusableProps, child.props),
				ref: $5dc95899b306f630$export$c9058316764c140e(childRef, ref)
			});
		});
		$3b117e43dc0ca95d$export$27c701ed9e449e99 = import_react$42.forwardRef(({ children, ...props }, ref) => {
			ref = $df56164dff5785e2$export$4338b53315abf666(ref);
			let { pressProps } = $f6c31cce2adf654f$export$45712eceda6fad21({
				...props,
				ref
			}), { focusableProps } = $f645667febf57a63$export$4c014de7c8940b4c(props, ref), child = import_react$42.Children.only(children);
			(0, import_react$42.useEffect)(() => {}, [ref, props.isDisabled]);
			let childRef = parseInt("19.2.5", 10) < 19 ? child.ref : child.props.ref;
			return import_react$42.cloneElement(child, {
				...$3ef42575df84b30b$export$9d1611c77c2fe928(pressProps, focusableProps, child.props),
				ref: $5dc95899b306f630$export$c9058316764c140e(childRef, ref)
			});
		});
		$f1ab8c75478c6f73$export$3351871ee4b288b8 = import_react$43.forwardRef(({ children, ...props }, ref) => {
			let isRegistered = (0, import_react$43.useRef)(!1), prevContext = (0, import_react$43.useContext)($ae1eeba8b9eafd08$export$5165eccb35aaadb5);
			ref = $df56164dff5785e2$export$4338b53315abf666(ref || prevContext?.ref);
			let context = $3ef42575df84b30b$export$9d1611c77c2fe928(prevContext || {}, {
				...props,
				ref,
				register() {
					isRegistered.current = !0, prevContext && prevContext.register();
				}
			});
			return $e7801be82b4b2a53$export$4debdb1a3f0fa79e(prevContext, ref), (0, import_react$43.useEffect)(() => {
				isRegistered.current || (isRegistered.current = !0);
			}, []), import_react$43.createElement($ae1eeba8b9eafd08$export$5165eccb35aaadb5.Provider, { value: context }, children);
		});
		$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = !1;
		$6179b936705e76d3$var$hoverCount = 0;
		$8a26561d2877236e$var$DEFAULT_THRESHOLD = 500;
		$64fa3d84918910a7$export$c62b8e45d58ddad9 = /* @__PURE__ */ Symbol("default");
		$44f671af83e7d9e0$export$2de4954e8ae13b9f = (0, import_react$51.createContext)({ placement: "bottom" });
		(0, import_react$51.forwardRef)(function(props, ref) {
			[props, ref] = $64fa3d84918910a7$export$29f1550f4b0d4415(props, ref, $44f671af83e7d9e0$export$2de4954e8ae13b9f);
			let placement = props.placement, style = {
				position: "absolute",
				transform: placement === "top" || placement === "bottom" ? "translateX(-50%)" : "translateY(-50%)"
			};
			placement != null && (style[placement] = "100%");
			let renderProps = $64fa3d84918910a7$export$4d86445c2cf5e3({
				...props,
				defaultClassName: "react-aria-OverlayArrow",
				values: { placement }
			});
			renderProps.style && Object.keys(renderProps.style).forEach((key) => renderProps.style[key] === void 0 && delete renderProps.style[key]);
			let DOMProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props);
			return import_react$51.createElement("div", {
				...DOMProps,
				...renderProps,
				style: {
					...style,
					...renderProps.style
				},
				ref,
				"data-placement": placement
			});
		});
		$edcf132a9284368a$var$AXIS = {
			top: "top",
			bottom: "top",
			left: "left",
			right: "left"
		};
		$edcf132a9284368a$var$FLIPPED_DIRECTION = {
			top: "bottom",
			bottom: "top",
			left: "right",
			right: "left"
		};
		$edcf132a9284368a$var$CROSS_AXIS = {
			top: "left",
			left: "top"
		};
		$edcf132a9284368a$var$AXIS_SIZE = {
			top: "height",
			left: "width"
		};
		$edcf132a9284368a$var$TOTAL_SIZE = {
			width: "totalWidth",
			height: "totalHeight"
		};
		$edcf132a9284368a$var$PARSED_PLACEMENT_CACHE = {};
		$edcf132a9284368a$var$visualViewport = typeof document < "u" ? window.visualViewport : null;
		$dd149f63282afbbf$export$f6211563215e3b37 = /* @__PURE__ */ new WeakMap();
		$148a7a147e38ea7f$var$RTL_SCRIPTS = /* @__PURE__ */ new Set([
			"Arab",
			"Syrc",
			"Samr",
			"Mand",
			"Thaa",
			"Mend",
			"Nkoo",
			"Adlm",
			"Rohg",
			"Hebr"
		]);
		$148a7a147e38ea7f$var$RTL_LANGS = /* @__PURE__ */ new Set([
			"ae",
			"ar",
			"arc",
			"bcc",
			"bqi",
			"ckb",
			"dv",
			"fa",
			"glk",
			"he",
			"ku",
			"mzn",
			"nqo",
			"pnb",
			"ps",
			"sd",
			"ug",
			"ur",
			"yi"
		]);
		$1e5a04cdaf7d1af8$var$localeSymbol = /* @__PURE__ */ Symbol.for("react-aria.i18n.locale");
		$1e5a04cdaf7d1af8$var$currentLocale = $1e5a04cdaf7d1af8$export$f09106e7c6677ec5();
		$1e5a04cdaf7d1af8$var$listeners = /* @__PURE__ */ new Set();
		$18f2051aff69b9bf$var$I18nContext = import_react$56.createContext(null);
		extendStatics = function(d, b) {
			return extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
				d2.__proto__ = b2;
			} || function(d2, b2) {
				for (var p in b2) Object.prototype.hasOwnProperty.call(b2, p) && (d2[p] = b2[p]);
			}, extendStatics(d, b);
		};
		__assign = function() {
			return __assign = Object.assign || function(t) {
				for (var s, i = 1, n = arguments.length; i < n; i++) {
					s = arguments[i];
					for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
				}
				return t;
			}, __assign.apply(this, arguments);
		};
		serializerDefault = function() {
			return JSON.stringify(arguments);
		};
		ObjectWithoutPrototypeCache = (function() {
			function ObjectWithoutPrototypeCache2() {
				this.cache = /* @__PURE__ */ Object.create(null);
			}
			return ObjectWithoutPrototypeCache2.prototype.get = function(key) {
				return this.cache[key];
			}, ObjectWithoutPrototypeCache2.prototype.set = function(key, value) {
				this.cache[key] = value;
			}, ObjectWithoutPrototypeCache2;
		})();
		cacheDefault = { create: function() {
			return new ObjectWithoutPrototypeCache();
		} };
		strategies = {
			variadic: strategyVariadic,
			monadic: strategyMonadic
		};
		(function(ErrorKind2) {
			ErrorKind2[ErrorKind2.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE", ErrorKind2[ErrorKind2.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT", ErrorKind2[ErrorKind2.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT", ErrorKind2[ErrorKind2.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE", ErrorKind2[ErrorKind2.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE", ErrorKind2[ErrorKind2.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE", ErrorKind2[ErrorKind2.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON", ErrorKind2[ErrorKind2.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON", ErrorKind2[ErrorKind2.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON", ErrorKind2[ErrorKind2.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON", ErrorKind2[ErrorKind2.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE", ErrorKind2[ErrorKind2.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS", ErrorKind2[ErrorKind2.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE", ErrorKind2[ErrorKind2.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE", ErrorKind2[ErrorKind2.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR", ErrorKind2[ErrorKind2.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR", ErrorKind2[ErrorKind2.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT", ErrorKind2[ErrorKind2.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT", ErrorKind2[ErrorKind2.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR", ErrorKind2[ErrorKind2.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR", ErrorKind2[ErrorKind2.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR", ErrorKind2[ErrorKind2.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE", ErrorKind2[ErrorKind2.INVALID_TAG = 23] = "INVALID_TAG", ErrorKind2[ErrorKind2.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME", ErrorKind2[ErrorKind2.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG", ErrorKind2[ErrorKind2.UNCLOSED_TAG = 27] = "UNCLOSED_TAG";
		})(ErrorKind || (ErrorKind = {}));
		(function(TYPE2) {
			TYPE2[TYPE2.literal = 0] = "literal", TYPE2[TYPE2.argument = 1] = "argument", TYPE2[TYPE2.number = 2] = "number", TYPE2[TYPE2.date = 3] = "date", TYPE2[TYPE2.time = 4] = "time", TYPE2[TYPE2.select = 5] = "select", TYPE2[TYPE2.plural = 6] = "plural", TYPE2[TYPE2.pound = 7] = "pound", TYPE2[TYPE2.tag = 8] = "tag";
		})(TYPE || (TYPE = {}));
		(function(SKELETON_TYPE2) {
			SKELETON_TYPE2[SKELETON_TYPE2.number = 0] = "number", SKELETON_TYPE2[SKELETON_TYPE2.dateTime = 1] = "dateTime";
		})(SKELETON_TYPE || (SKELETON_TYPE = {}));
		SPACE_SEPARATOR_REGEX = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;
		DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
		WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
		FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
		SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?[rs]?$/g;
		INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
		CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;
		timeData = {
			"001": ["H", "h"],
			419: [
				"h",
				"H",
				"hB",
				"hb"
			],
			AC: [
				"H",
				"h",
				"hb",
				"hB"
			],
			AD: ["H", "hB"],
			AE: [
				"h",
				"hB",
				"hb",
				"H"
			],
			AF: [
				"H",
				"hb",
				"hB",
				"h"
			],
			AG: [
				"h",
				"hb",
				"H",
				"hB"
			],
			AI: [
				"H",
				"h",
				"hb",
				"hB"
			],
			AL: [
				"h",
				"H",
				"hB"
			],
			AM: ["H", "hB"],
			AO: ["H", "hB"],
			AR: [
				"h",
				"H",
				"hB",
				"hb"
			],
			AS: ["h", "H"],
			AT: ["H", "hB"],
			AU: [
				"h",
				"hb",
				"H",
				"hB"
			],
			AW: ["H", "hB"],
			AX: ["H"],
			AZ: [
				"H",
				"hB",
				"h"
			],
			BA: [
				"H",
				"hB",
				"h"
			],
			BB: [
				"h",
				"hb",
				"H",
				"hB"
			],
			BD: [
				"h",
				"hB",
				"H"
			],
			BE: ["H", "hB"],
			BF: ["H", "hB"],
			BG: [
				"H",
				"hB",
				"h"
			],
			BH: [
				"h",
				"hB",
				"hb",
				"H"
			],
			BI: ["H", "h"],
			BJ: ["H", "hB"],
			BL: ["H", "hB"],
			BM: [
				"h",
				"hb",
				"H",
				"hB"
			],
			BN: [
				"hb",
				"hB",
				"h",
				"H"
			],
			BO: [
				"h",
				"H",
				"hB",
				"hb"
			],
			BQ: ["H"],
			BR: ["H", "hB"],
			BS: [
				"h",
				"hb",
				"H",
				"hB"
			],
			BT: ["h", "H"],
			BW: [
				"H",
				"h",
				"hb",
				"hB"
			],
			BY: ["H", "h"],
			BZ: [
				"H",
				"h",
				"hb",
				"hB"
			],
			CA: [
				"h",
				"hb",
				"H",
				"hB"
			],
			CC: [
				"H",
				"h",
				"hb",
				"hB"
			],
			CD: ["hB", "H"],
			CF: [
				"H",
				"h",
				"hB"
			],
			CG: ["H", "hB"],
			CH: [
				"H",
				"hB",
				"h"
			],
			CI: ["H", "hB"],
			CK: [
				"H",
				"h",
				"hb",
				"hB"
			],
			CL: [
				"h",
				"H",
				"hB",
				"hb"
			],
			CM: [
				"H",
				"h",
				"hB"
			],
			CN: [
				"H",
				"hB",
				"hb",
				"h"
			],
			CO: [
				"h",
				"H",
				"hB",
				"hb"
			],
			CP: ["H"],
			CR: [
				"h",
				"H",
				"hB",
				"hb"
			],
			CU: [
				"h",
				"H",
				"hB",
				"hb"
			],
			CV: ["H", "hB"],
			CW: ["H", "hB"],
			CX: [
				"H",
				"h",
				"hb",
				"hB"
			],
			CY: [
				"h",
				"H",
				"hb",
				"hB"
			],
			CZ: ["H"],
			DE: ["H", "hB"],
			DG: [
				"H",
				"h",
				"hb",
				"hB"
			],
			DJ: ["h", "H"],
			DK: ["H"],
			DM: [
				"h",
				"hb",
				"H",
				"hB"
			],
			DO: [
				"h",
				"H",
				"hB",
				"hb"
			],
			DZ: [
				"h",
				"hB",
				"hb",
				"H"
			],
			EA: [
				"H",
				"h",
				"hB",
				"hb"
			],
			EC: [
				"h",
				"H",
				"hB",
				"hb"
			],
			EE: ["H", "hB"],
			EG: [
				"h",
				"hB",
				"hb",
				"H"
			],
			EH: [
				"h",
				"hB",
				"hb",
				"H"
			],
			ER: ["h", "H"],
			ES: [
				"H",
				"hB",
				"h",
				"hb"
			],
			ET: [
				"hB",
				"hb",
				"h",
				"H"
			],
			FI: ["H"],
			FJ: [
				"h",
				"hb",
				"H",
				"hB"
			],
			FK: [
				"H",
				"h",
				"hb",
				"hB"
			],
			FM: [
				"h",
				"hb",
				"H",
				"hB"
			],
			FO: ["H", "h"],
			FR: ["H", "hB"],
			GA: ["H", "hB"],
			GB: [
				"H",
				"h",
				"hb",
				"hB"
			],
			GD: [
				"h",
				"hb",
				"H",
				"hB"
			],
			GE: [
				"H",
				"hB",
				"h"
			],
			GF: ["H", "hB"],
			GG: [
				"H",
				"h",
				"hb",
				"hB"
			],
			GH: ["h", "H"],
			GI: [
				"H",
				"h",
				"hb",
				"hB"
			],
			GL: ["H", "h"],
			GM: [
				"h",
				"hb",
				"H",
				"hB"
			],
			GN: ["H", "hB"],
			GP: ["H", "hB"],
			GQ: [
				"H",
				"hB",
				"h",
				"hb"
			],
			GR: [
				"h",
				"H",
				"hb",
				"hB"
			],
			GT: [
				"h",
				"H",
				"hB",
				"hb"
			],
			GU: [
				"h",
				"hb",
				"H",
				"hB"
			],
			GW: ["H", "hB"],
			GY: [
				"h",
				"hb",
				"H",
				"hB"
			],
			HK: [
				"h",
				"hB",
				"hb",
				"H"
			],
			HN: [
				"h",
				"H",
				"hB",
				"hb"
			],
			HR: ["H", "hB"],
			HU: ["H", "h"],
			IC: [
				"H",
				"h",
				"hB",
				"hb"
			],
			ID: ["H"],
			IE: [
				"H",
				"h",
				"hb",
				"hB"
			],
			IL: ["H", "hB"],
			IM: [
				"H",
				"h",
				"hb",
				"hB"
			],
			IN: ["h", "H"],
			IO: [
				"H",
				"h",
				"hb",
				"hB"
			],
			IQ: [
				"h",
				"hB",
				"hb",
				"H"
			],
			IR: ["hB", "H"],
			IS: ["H"],
			IT: ["H", "hB"],
			JE: [
				"H",
				"h",
				"hb",
				"hB"
			],
			JM: [
				"h",
				"hb",
				"H",
				"hB"
			],
			JO: [
				"h",
				"hB",
				"hb",
				"H"
			],
			JP: [
				"H",
				"K",
				"h"
			],
			KE: [
				"hB",
				"hb",
				"H",
				"h"
			],
			KG: [
				"H",
				"h",
				"hB",
				"hb"
			],
			KH: [
				"hB",
				"h",
				"H",
				"hb"
			],
			KI: [
				"h",
				"hb",
				"H",
				"hB"
			],
			KM: [
				"H",
				"h",
				"hB",
				"hb"
			],
			KN: [
				"h",
				"hb",
				"H",
				"hB"
			],
			KP: [
				"h",
				"H",
				"hB",
				"hb"
			],
			KR: [
				"h",
				"H",
				"hB",
				"hb"
			],
			KW: [
				"h",
				"hB",
				"hb",
				"H"
			],
			KY: [
				"h",
				"hb",
				"H",
				"hB"
			],
			KZ: ["H", "hB"],
			LA: [
				"H",
				"hb",
				"hB",
				"h"
			],
			LB: [
				"h",
				"hB",
				"hb",
				"H"
			],
			LC: [
				"h",
				"hb",
				"H",
				"hB"
			],
			LI: [
				"H",
				"hB",
				"h"
			],
			LK: [
				"H",
				"h",
				"hB",
				"hb"
			],
			LR: [
				"h",
				"hb",
				"H",
				"hB"
			],
			LS: ["h", "H"],
			LT: [
				"H",
				"h",
				"hb",
				"hB"
			],
			LU: [
				"H",
				"h",
				"hB"
			],
			LV: [
				"H",
				"hB",
				"hb",
				"h"
			],
			LY: [
				"h",
				"hB",
				"hb",
				"H"
			],
			MA: [
				"H",
				"h",
				"hB",
				"hb"
			],
			MC: ["H", "hB"],
			MD: ["H", "hB"],
			ME: [
				"H",
				"hB",
				"h"
			],
			MF: ["H", "hB"],
			MG: ["H", "h"],
			MH: [
				"h",
				"hb",
				"H",
				"hB"
			],
			MK: [
				"H",
				"h",
				"hb",
				"hB"
			],
			ML: ["H"],
			MM: [
				"hB",
				"hb",
				"H",
				"h"
			],
			MN: [
				"H",
				"h",
				"hb",
				"hB"
			],
			MO: [
				"h",
				"hB",
				"hb",
				"H"
			],
			MP: [
				"h",
				"hb",
				"H",
				"hB"
			],
			MQ: ["H", "hB"],
			MR: [
				"h",
				"hB",
				"hb",
				"H"
			],
			MS: [
				"H",
				"h",
				"hb",
				"hB"
			],
			MT: ["H", "h"],
			MU: ["H", "h"],
			MV: ["H", "h"],
			MW: [
				"h",
				"hb",
				"H",
				"hB"
			],
			MX: [
				"h",
				"H",
				"hB",
				"hb"
			],
			MY: [
				"hb",
				"hB",
				"h",
				"H"
			],
			MZ: ["H", "hB"],
			NA: [
				"h",
				"H",
				"hB",
				"hb"
			],
			NC: ["H", "hB"],
			NE: ["H"],
			NF: [
				"H",
				"h",
				"hb",
				"hB"
			],
			NG: [
				"H",
				"h",
				"hb",
				"hB"
			],
			NI: [
				"h",
				"H",
				"hB",
				"hb"
			],
			NL: ["H", "hB"],
			NO: ["H", "h"],
			NP: [
				"H",
				"h",
				"hB"
			],
			NR: [
				"H",
				"h",
				"hb",
				"hB"
			],
			NU: [
				"H",
				"h",
				"hb",
				"hB"
			],
			NZ: [
				"h",
				"hb",
				"H",
				"hB"
			],
			OM: [
				"h",
				"hB",
				"hb",
				"H"
			],
			PA: [
				"h",
				"H",
				"hB",
				"hb"
			],
			PE: [
				"h",
				"H",
				"hB",
				"hb"
			],
			PF: [
				"H",
				"h",
				"hB"
			],
			PG: ["h", "H"],
			PH: [
				"h",
				"hB",
				"hb",
				"H"
			],
			PK: [
				"h",
				"hB",
				"H"
			],
			PL: ["H", "h"],
			PM: ["H", "hB"],
			PN: [
				"H",
				"h",
				"hb",
				"hB"
			],
			PR: [
				"h",
				"H",
				"hB",
				"hb"
			],
			PS: [
				"h",
				"hB",
				"hb",
				"H"
			],
			PT: ["H", "hB"],
			PW: ["h", "H"],
			PY: [
				"h",
				"H",
				"hB",
				"hb"
			],
			QA: [
				"h",
				"hB",
				"hb",
				"H"
			],
			RE: ["H", "hB"],
			RO: ["H", "hB"],
			RS: [
				"H",
				"hB",
				"h"
			],
			RU: ["H"],
			RW: ["H", "h"],
			SA: [
				"h",
				"hB",
				"hb",
				"H"
			],
			SB: [
				"h",
				"hb",
				"H",
				"hB"
			],
			SC: [
				"H",
				"h",
				"hB"
			],
			SD: [
				"h",
				"hB",
				"hb",
				"H"
			],
			SE: ["H"],
			SG: [
				"h",
				"hb",
				"H",
				"hB"
			],
			SH: [
				"H",
				"h",
				"hb",
				"hB"
			],
			SI: ["H", "hB"],
			SJ: ["H"],
			SK: ["H"],
			SL: [
				"h",
				"hb",
				"H",
				"hB"
			],
			SM: [
				"H",
				"h",
				"hB"
			],
			SN: [
				"H",
				"h",
				"hB"
			],
			SO: ["h", "H"],
			SR: ["H", "hB"],
			SS: [
				"h",
				"hb",
				"H",
				"hB"
			],
			ST: ["H", "hB"],
			SV: [
				"h",
				"H",
				"hB",
				"hb"
			],
			SX: [
				"H",
				"h",
				"hb",
				"hB"
			],
			SY: [
				"h",
				"hB",
				"hb",
				"H"
			],
			SZ: [
				"h",
				"hb",
				"H",
				"hB"
			],
			TA: [
				"H",
				"h",
				"hb",
				"hB"
			],
			TC: [
				"h",
				"hb",
				"H",
				"hB"
			],
			TD: [
				"h",
				"H",
				"hB"
			],
			TF: [
				"H",
				"h",
				"hB"
			],
			TG: ["H", "hB"],
			TH: ["H", "h"],
			TJ: ["H", "h"],
			TL: [
				"H",
				"hB",
				"hb",
				"h"
			],
			TM: ["H", "h"],
			TN: [
				"h",
				"hB",
				"hb",
				"H"
			],
			TO: ["h", "H"],
			TR: ["H", "hB"],
			TT: [
				"h",
				"hb",
				"H",
				"hB"
			],
			TW: [
				"hB",
				"hb",
				"h",
				"H"
			],
			TZ: [
				"hB",
				"hb",
				"H",
				"h"
			],
			UA: [
				"H",
				"hB",
				"h"
			],
			UG: [
				"hB",
				"hb",
				"H",
				"h"
			],
			UM: [
				"h",
				"hb",
				"H",
				"hB"
			],
			US: [
				"h",
				"hb",
				"H",
				"hB"
			],
			UY: [
				"h",
				"H",
				"hB",
				"hb"
			],
			UZ: [
				"H",
				"hB",
				"h"
			],
			VA: [
				"H",
				"h",
				"hB"
			],
			VC: [
				"h",
				"hb",
				"H",
				"hB"
			],
			VE: [
				"h",
				"H",
				"hB",
				"hb"
			],
			VG: [
				"h",
				"hb",
				"H",
				"hB"
			],
			VI: [
				"h",
				"hb",
				"H",
				"hB"
			],
			VN: ["H", "h"],
			VU: ["h", "H"],
			WF: ["H", "hB"],
			WS: ["h", "H"],
			XK: [
				"H",
				"hB",
				"h"
			],
			YE: [
				"h",
				"hB",
				"hb",
				"H"
			],
			YT: ["H", "hB"],
			ZA: [
				"H",
				"h",
				"hb",
				"hB"
			],
			ZM: [
				"h",
				"hb",
				"H",
				"hB"
			],
			ZW: ["H", "h"],
			"af-ZA": [
				"H",
				"h",
				"hB",
				"hb"
			],
			"ar-001": [
				"h",
				"hB",
				"hb",
				"H"
			],
			"ca-ES": [
				"H",
				"h",
				"hB"
			],
			"en-001": [
				"h",
				"hb",
				"H",
				"hB"
			],
			"en-HK": [
				"h",
				"hb",
				"H",
				"hB"
			],
			"en-IL": [
				"H",
				"h",
				"hb",
				"hB"
			],
			"en-MY": [
				"h",
				"hb",
				"H",
				"hB"
			],
			"es-BR": [
				"H",
				"h",
				"hB",
				"hb"
			],
			"es-ES": [
				"H",
				"h",
				"hB",
				"hb"
			],
			"es-GQ": [
				"H",
				"h",
				"hB",
				"hb"
			],
			"fr-CA": [
				"H",
				"h",
				"hB"
			],
			"gl-ES": [
				"H",
				"h",
				"hB"
			],
			"gu-IN": [
				"hB",
				"hb",
				"h",
				"H"
			],
			"hi-IN": [
				"hB",
				"h",
				"H"
			],
			"it-CH": [
				"H",
				"h",
				"hB"
			],
			"it-IT": [
				"H",
				"h",
				"hB"
			],
			"kn-IN": [
				"hB",
				"h",
				"H"
			],
			"ml-IN": [
				"hB",
				"h",
				"H"
			],
			"mr-IN": [
				"hB",
				"hb",
				"h",
				"H"
			],
			"pa-IN": [
				"hB",
				"hb",
				"h",
				"H"
			],
			"ta-IN": [
				"hB",
				"h",
				"hb",
				"H"
			],
			"te-IN": [
				"hB",
				"h",
				"H"
			],
			"zu-ZA": [
				"H",
				"hB",
				"hb",
				"h"
			]
		};
		SPACE_SEPARATOR_START_REGEX = new RegExp("^".concat(SPACE_SEPARATOR_REGEX.source, "*"));
		SPACE_SEPARATOR_END_REGEX = new RegExp("".concat(SPACE_SEPARATOR_REGEX.source, "*$"));
		hasNativeStartsWith = !!String.prototype.startsWith && "_a".startsWith("a", 1);
		hasNativeFromCodePoint = !!String.fromCodePoint;
		hasNativeFromEntries = !!Object.fromEntries;
		hasNativeCodePointAt = !!String.prototype.codePointAt;
		hasTrimStart = !!String.prototype.trimStart;
		hasTrimEnd = !!String.prototype.trimEnd;
		isSafeInteger = !!Number.isSafeInteger ? Number.isSafeInteger : function(n) {
			return typeof n == "number" && isFinite(n) && Math.floor(n) === n && Math.abs(n) <= 9007199254740991;
		};
		REGEX_SUPPORTS_U_AND_Y = !0;
		try {
			re = RE("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu"), REGEX_SUPPORTS_U_AND_Y = ((_a = re.exec("a")) === null || _a === void 0 ? void 0 : _a[0]) === "a";
		} catch {
			REGEX_SUPPORTS_U_AND_Y = !1;
		}
		startsWith = hasNativeStartsWith ? (function(s, search, position) {
			return s.startsWith(search, position);
		}) : (function(s, search, position) {
			return s.slice(position, position + search.length) === search;
		});
		fromCodePoint = hasNativeFromCodePoint ? String.fromCodePoint : (function() {
			for (var codePoints = [], _i = 0; _i < arguments.length; _i++) codePoints[_i] = arguments[_i];
			for (var elements = "", length = codePoints.length, i = 0, code; length > i;) {
				if (code = codePoints[i++], code > 1114111) throw RangeError(code + " is not a valid code point");
				elements += code < 65536 ? String.fromCharCode(code) : String.fromCharCode(((code -= 65536) >> 10) + 55296, code % 1024 + 56320);
			}
			return elements;
		});
		fromEntries = hasNativeFromEntries ? Object.fromEntries : (function(entries) {
			for (var obj = {}, _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
				var _a2 = entries_1[_i], k = _a2[0];
				obj[k] = _a2[1];
			}
			return obj;
		});
		codePointAt = hasNativeCodePointAt ? (function(s, index3) {
			return s.codePointAt(index3);
		}) : (function(s, index3) {
			var size = s.length;
			if (!(index3 < 0 || index3 >= size)) {
				var first = s.charCodeAt(index3), second;
				return first < 55296 || first > 56319 || index3 + 1 === size || (second = s.charCodeAt(index3 + 1)) < 56320 || second > 57343 ? first : (first - 55296 << 10) + (second - 56320) + 65536;
			}
		});
		trimStart = hasTrimStart ? (function(s) {
			return s.trimStart();
		}) : (function(s) {
			return s.replace(SPACE_SEPARATOR_START_REGEX, "");
		});
		trimEnd = hasTrimEnd ? (function(s) {
			return s.trimEnd();
		}) : (function(s) {
			return s.replace(SPACE_SEPARATOR_END_REGEX, "");
		});
		REGEX_SUPPORTS_U_AND_Y ? (IDENTIFIER_PREFIX_RE_1 = RE("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu"), matchIdentifierAtIndex = function(s, index3) {
			var _a2;
			IDENTIFIER_PREFIX_RE_1.lastIndex = index3;
			return (_a2 = IDENTIFIER_PREFIX_RE_1.exec(s)[1]) !== null && _a2 !== void 0 ? _a2 : "";
		}) : matchIdentifierAtIndex = function(s, index3) {
			for (var match = [];;) {
				var c = codePointAt(s, index3);
				if (c === void 0 || _isWhiteSpace(c) || _isPatternSyntax(c)) break;
				match.push(c), index3 += c >= 65536 ? 2 : 1;
			}
			return fromCodePoint.apply(void 0, match);
		};
		Parser = (function() {
			function Parser2(message, options) {
				options === void 0 && (options = {}), this.message = message, this.position = {
					offset: 0,
					line: 1,
					column: 1
				}, this.ignoreTag = !!options.ignoreTag, this.locale = options.locale, this.requiresOtherClause = !!options.requiresOtherClause, this.shouldParseSkeletons = !!options.shouldParseSkeletons;
			}
			return Parser2.prototype.parse = function() {
				if (this.offset() !== 0) throw Error("parser can only be used once");
				return this.parseMessage(0, "", !1);
			}, Parser2.prototype.parseMessage = function(nestingLevel, parentArgType, expectingCloseTag) {
				for (var elements = []; !this.isEOF();) {
					var char = this.char();
					if (char === 123) {
						var result = this.parseArgument(nestingLevel, expectingCloseTag);
						if (result.err) return result;
						elements.push(result.val);
					} else {
						if (char === 125 && nestingLevel > 0) break;
						if (char === 35 && (parentArgType === "plural" || parentArgType === "selectordinal")) {
							var position = this.clonePosition();
							this.bump(), elements.push({
								type: TYPE.pound,
								location: createLocation(position, this.clonePosition())
							});
						} else if (char === 60 && !this.ignoreTag && this.peek() === 47) {
							if (expectingCloseTag) break;
							return this.error(ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(this.clonePosition(), this.clonePosition()));
						} else if (char === 60 && !this.ignoreTag && _isAlpha(this.peek() || 0)) {
							var result = this.parseTag(nestingLevel, parentArgType);
							if (result.err) return result;
							elements.push(result.val);
						} else {
							var result = this.parseLiteral(nestingLevel, parentArgType);
							if (result.err) return result;
							elements.push(result.val);
						}
					}
				}
				return {
					val: elements,
					err: null
				};
			}, Parser2.prototype.parseTag = function(nestingLevel, parentArgType) {
				var startPosition = this.clonePosition();
				this.bump();
				var tagName = this.parseTagName();
				if (this.bumpSpace(), this.bumpIf("/>")) return {
					val: {
						type: TYPE.literal,
						value: "<".concat(tagName, "/>"),
						location: createLocation(startPosition, this.clonePosition())
					},
					err: null
				};
				if (this.bumpIf(">")) {
					var childrenResult = this.parseMessage(nestingLevel + 1, parentArgType, !0);
					if (childrenResult.err) return childrenResult;
					var children = childrenResult.val, endTagStartPosition = this.clonePosition();
					if (this.bumpIf("</")) {
						if (this.isEOF() || !_isAlpha(this.char())) return this.error(ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
						var closingTagNameStartPosition = this.clonePosition();
						return tagName !== this.parseTagName() ? this.error(ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(closingTagNameStartPosition, this.clonePosition())) : (this.bumpSpace(), this.bumpIf(">") ? {
							val: {
								type: TYPE.tag,
								value: tagName,
								children,
								location: createLocation(startPosition, this.clonePosition())
							},
							err: null
						} : this.error(ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition())));
					} else return this.error(ErrorKind.UNCLOSED_TAG, createLocation(startPosition, this.clonePosition()));
				} else return this.error(ErrorKind.INVALID_TAG, createLocation(startPosition, this.clonePosition()));
			}, Parser2.prototype.parseTagName = function() {
				var startOffset = this.offset();
				for (this.bump(); !this.isEOF() && _isPotentialElementNameChar(this.char());) this.bump();
				return this.message.slice(startOffset, this.offset());
			}, Parser2.prototype.parseLiteral = function(nestingLevel, parentArgType) {
				for (var start = this.clonePosition(), value = "";;) {
					var parseQuoteResult = this.tryParseQuote(parentArgType);
					if (parseQuoteResult) {
						value += parseQuoteResult;
						continue;
					}
					var parseUnquotedResult = this.tryParseUnquoted(nestingLevel, parentArgType);
					if (parseUnquotedResult) {
						value += parseUnquotedResult;
						continue;
					}
					var parseLeftAngleResult = this.tryParseLeftAngleBracket();
					if (parseLeftAngleResult) {
						value += parseLeftAngleResult;
						continue;
					}
					break;
				}
				var location2 = createLocation(start, this.clonePosition());
				return {
					val: {
						type: TYPE.literal,
						value,
						location: location2
					},
					err: null
				};
			}, Parser2.prototype.tryParseLeftAngleBracket = function() {
				return !this.isEOF() && this.char() === 60 && (this.ignoreTag || !_isAlphaOrSlash(this.peek() || 0)) ? (this.bump(), "<") : null;
			}, Parser2.prototype.tryParseQuote = function(parentArgType) {
				if (this.isEOF() || this.char() !== 39) return null;
				switch (this.peek()) {
					case 39: return this.bump(), this.bump(), "'";
					case 123:
					case 60:
					case 62:
					case 125: break;
					case 35:
						if (parentArgType === "plural" || parentArgType === "selectordinal") break;
						return null;
					default: return null;
				}
				this.bump();
				var codePoints = [this.char()];
				for (this.bump(); !this.isEOF();) {
					var ch = this.char();
					if (ch === 39) if (this.peek() === 39) codePoints.push(39), this.bump();
					else {
						this.bump();
						break;
					}
					else codePoints.push(ch);
					this.bump();
				}
				return fromCodePoint.apply(void 0, codePoints);
			}, Parser2.prototype.tryParseUnquoted = function(nestingLevel, parentArgType) {
				if (this.isEOF()) return null;
				var ch = this.char();
				return ch === 60 || ch === 123 || ch === 35 && (parentArgType === "plural" || parentArgType === "selectordinal") || ch === 125 && nestingLevel > 0 ? null : (this.bump(), fromCodePoint(ch));
			}, Parser2.prototype.parseArgument = function(nestingLevel, expectingCloseTag) {
				var openingBracePosition = this.clonePosition();
				if (this.bump(), this.bumpSpace(), this.isEOF()) return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
				if (this.char() === 125) return this.bump(), this.error(ErrorKind.EMPTY_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
				var value = this.parseIdentifierIfPossible().value;
				if (!value) return this.error(ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
				if (this.bumpSpace(), this.isEOF()) return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
				switch (this.char()) {
					case 125: return this.bump(), {
						val: {
							type: TYPE.argument,
							value,
							location: createLocation(openingBracePosition, this.clonePosition())
						},
						err: null
					};
					case 44: return this.bump(), this.bumpSpace(), this.isEOF() ? this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition())) : this.parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition);
					default: return this.error(ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
				}
			}, Parser2.prototype.parseIdentifierIfPossible = function() {
				var startingPosition = this.clonePosition(), startOffset = this.offset(), value = matchIdentifierAtIndex(this.message, startOffset), endOffset = startOffset + value.length;
				this.bumpTo(endOffset);
				return {
					value,
					location: createLocation(startingPosition, this.clonePosition())
				};
			}, Parser2.prototype.parseArgumentOptions = function(nestingLevel, expectingCloseTag, value, openingBracePosition) {
				var _a2, typeStartPosition = this.clonePosition(), argType = this.parseIdentifierIfPossible().value, typeEndPosition = this.clonePosition();
				switch (argType) {
					case "": return this.error(ErrorKind.EXPECT_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
					case "number":
					case "date":
					case "time":
						this.bumpSpace();
						var styleAndLocation = null;
						if (this.bumpIf(",")) {
							this.bumpSpace();
							var styleStartPosition = this.clonePosition(), result = this.parseSimpleArgStyleIfPossible();
							if (result.err) return result;
							var style = trimEnd(result.val);
							if (style.length === 0) return this.error(ErrorKind.EXPECT_ARGUMENT_STYLE, createLocation(this.clonePosition(), this.clonePosition()));
							styleAndLocation = {
								style,
								styleLocation: createLocation(styleStartPosition, this.clonePosition())
							};
						}
						var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
						if (argCloseResult.err) return argCloseResult;
						var location_1 = createLocation(openingBracePosition, this.clonePosition());
						if (styleAndLocation && startsWith(styleAndLocation?.style, "::", 0)) {
							var skeleton = trimStart(styleAndLocation.style.slice(2));
							if (argType === "number") {
								var result = this.parseNumberSkeletonFromString(skeleton, styleAndLocation.styleLocation);
								return result.err ? result : {
									val: {
										type: TYPE.number,
										value,
										location: location_1,
										style: result.val
									},
									err: null
								};
							} else {
								if (skeleton.length === 0) return this.error(ErrorKind.EXPECT_DATE_TIME_SKELETON, location_1);
								var dateTimePattern = skeleton;
								this.locale && (dateTimePattern = getBestPattern(skeleton, this.locale));
								var style = {
									type: SKELETON_TYPE.dateTime,
									pattern: dateTimePattern,
									location: styleAndLocation.styleLocation,
									parsedOptions: this.shouldParseSkeletons ? parseDateTimeSkeleton(dateTimePattern) : {}
								};
								return {
									val: {
										type: argType === "date" ? TYPE.date : TYPE.time,
										value,
										location: location_1,
										style
									},
									err: null
								};
							}
						}
						return {
							val: {
								type: argType === "number" ? TYPE.number : argType === "date" ? TYPE.date : TYPE.time,
								value,
								location: location_1,
								style: (_a2 = styleAndLocation?.style) !== null && _a2 !== void 0 ? _a2 : null
							},
							err: null
						};
					case "plural":
					case "selectordinal":
					case "select":
						var typeEndPosition_1 = this.clonePosition();
						if (this.bumpSpace(), !this.bumpIf(",")) return this.error(ErrorKind.EXPECT_SELECT_ARGUMENT_OPTIONS, createLocation(typeEndPosition_1, __assign({}, typeEndPosition_1)));
						this.bumpSpace();
						var identifierAndLocation = this.parseIdentifierIfPossible(), pluralOffset = 0;
						if (argType !== "select" && identifierAndLocation.value === "offset") {
							if (!this.bumpIf(":")) return this.error(ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, createLocation(this.clonePosition(), this.clonePosition()));
							this.bumpSpace();
							var result = this.tryParseDecimalInteger(ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, ErrorKind.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
							if (result.err) return result;
							this.bumpSpace(), identifierAndLocation = this.parseIdentifierIfPossible(), pluralOffset = result.val;
						}
						var optionsResult = this.tryParsePluralOrSelectOptions(nestingLevel, argType, expectingCloseTag, identifierAndLocation);
						if (optionsResult.err) return optionsResult;
						var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
						if (argCloseResult.err) return argCloseResult;
						var location_2 = createLocation(openingBracePosition, this.clonePosition());
						return argType === "select" ? {
							val: {
								type: TYPE.select,
								value,
								options: fromEntries(optionsResult.val),
								location: location_2
							},
							err: null
						} : {
							val: {
								type: TYPE.plural,
								value,
								options: fromEntries(optionsResult.val),
								offset: pluralOffset,
								pluralType: argType === "plural" ? "cardinal" : "ordinal",
								location: location_2
							},
							err: null
						};
					default: return this.error(ErrorKind.INVALID_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
				}
			}, Parser2.prototype.tryParseArgumentClose = function(openingBracePosition) {
				return this.isEOF() || this.char() !== 125 ? this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition())) : (this.bump(), {
					val: !0,
					err: null
				});
			}, Parser2.prototype.parseSimpleArgStyleIfPossible = function() {
				for (var nestedBraces = 0, startPosition = this.clonePosition(); !this.isEOF();) switch (this.char()) {
					case 39:
						this.bump();
						var apostrophePosition = this.clonePosition();
						if (!this.bumpUntil("'")) return this.error(ErrorKind.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, createLocation(apostrophePosition, this.clonePosition()));
						this.bump();
						break;
					case 123:
						nestedBraces += 1, this.bump();
						break;
					case 125:
						if (nestedBraces > 0) nestedBraces -= 1;
						else return {
							val: this.message.slice(startPosition.offset, this.offset()),
							err: null
						};
						break;
					default: this.bump();
				}
				return {
					val: this.message.slice(startPosition.offset, this.offset()),
					err: null
				};
			}, Parser2.prototype.parseNumberSkeletonFromString = function(skeleton, location2) {
				var tokens = [];
				try {
					tokens = parseNumberSkeletonFromString(skeleton);
				} catch {
					return this.error(ErrorKind.INVALID_NUMBER_SKELETON, location2);
				}
				return {
					val: {
						type: SKELETON_TYPE.number,
						tokens,
						location: location2,
						parsedOptions: this.shouldParseSkeletons ? parseNumberSkeleton(tokens) : {}
					},
					err: null
				};
			}, Parser2.prototype.tryParsePluralOrSelectOptions = function(nestingLevel, parentArgType, expectCloseTag, parsedFirstIdentifier) {
				for (var _a2, hasOtherClause = !1, options = [], parsedSelectors = /* @__PURE__ */ new Set(), selector = parsedFirstIdentifier.value, selectorLocation = parsedFirstIdentifier.location;;) {
					if (selector.length === 0) {
						var startPosition = this.clonePosition();
						if (parentArgType !== "select" && this.bumpIf("=")) {
							var result = this.tryParseDecimalInteger(ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, ErrorKind.INVALID_PLURAL_ARGUMENT_SELECTOR);
							if (result.err) return result;
							selectorLocation = createLocation(startPosition, this.clonePosition()), selector = this.message.slice(startPosition.offset, this.offset());
						} else break;
					}
					if (parsedSelectors.has(selector)) return this.error(parentArgType === "select" ? ErrorKind.DUPLICATE_SELECT_ARGUMENT_SELECTOR : ErrorKind.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, selectorLocation);
					selector === "other" && (hasOtherClause = !0), this.bumpSpace();
					var openingBracePosition = this.clonePosition();
					if (!this.bumpIf("{")) return this.error(parentArgType === "select" ? ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, createLocation(this.clonePosition(), this.clonePosition()));
					var fragmentResult = this.parseMessage(nestingLevel + 1, parentArgType, expectCloseTag);
					if (fragmentResult.err) return fragmentResult;
					var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
					if (argCloseResult.err) return argCloseResult;
					options.push([selector, {
						value: fragmentResult.val,
						location: createLocation(openingBracePosition, this.clonePosition())
					}]), parsedSelectors.add(selector), this.bumpSpace(), _a2 = this.parseIdentifierIfPossible(), selector = _a2.value, selectorLocation = _a2.location;
				}
				return options.length === 0 ? this.error(parentArgType === "select" ? ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR : ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, createLocation(this.clonePosition(), this.clonePosition())) : this.requiresOtherClause && !hasOtherClause ? this.error(ErrorKind.MISSING_OTHER_CLAUSE, createLocation(this.clonePosition(), this.clonePosition())) : {
					val: options,
					err: null
				};
			}, Parser2.prototype.tryParseDecimalInteger = function(expectNumberError, invalidNumberError) {
				var sign = 1, startingPosition = this.clonePosition();
				this.bumpIf("+") || this.bumpIf("-") && (sign = -1);
				for (var hasDigits = !1, decimal = 0; !this.isEOF();) {
					var ch = this.char();
					if (ch >= 48 && ch <= 57) hasDigits = !0, decimal = decimal * 10 + (ch - 48), this.bump();
					else break;
				}
				var location2 = createLocation(startingPosition, this.clonePosition());
				return hasDigits ? (decimal *= sign, isSafeInteger(decimal) ? {
					val: decimal,
					err: null
				} : this.error(invalidNumberError, location2)) : this.error(expectNumberError, location2);
			}, Parser2.prototype.offset = function() {
				return this.position.offset;
			}, Parser2.prototype.isEOF = function() {
				return this.offset() === this.message.length;
			}, Parser2.prototype.clonePosition = function() {
				return {
					offset: this.position.offset,
					line: this.position.line,
					column: this.position.column
				};
			}, Parser2.prototype.char = function() {
				var offset = this.position.offset;
				if (offset >= this.message.length) throw Error("out of bound");
				var code = codePointAt(this.message, offset);
				if (code === void 0) throw Error("Offset ".concat(offset, " is at invalid UTF-16 code unit boundary"));
				return code;
			}, Parser2.prototype.error = function(kind, location2) {
				return {
					val: null,
					err: {
						kind,
						message: this.message,
						location: location2
					}
				};
			}, Parser2.prototype.bump = function() {
				if (!this.isEOF()) {
					var code = this.char();
					code === 10 ? (this.position.line += 1, this.position.column = 1, this.position.offset += 1) : (this.position.column += 1, this.position.offset += code < 65536 ? 1 : 2);
				}
			}, Parser2.prototype.bumpIf = function(prefix) {
				if (startsWith(this.message, prefix, this.offset())) {
					for (var i = 0; i < prefix.length; i++) this.bump();
					return !0;
				}
				return !1;
			}, Parser2.prototype.bumpUntil = function(pattern) {
				var currentOffset = this.offset(), index3 = this.message.indexOf(pattern, currentOffset);
				return index3 >= 0 ? (this.bumpTo(index3), !0) : (this.bumpTo(this.message.length), !1);
			}, Parser2.prototype.bumpTo = function(targetOffset) {
				if (this.offset() > targetOffset) throw Error("targetOffset ".concat(targetOffset, " must be greater than or equal to the current offset ").concat(this.offset()));
				for (targetOffset = Math.min(targetOffset, this.message.length);;) {
					var offset = this.offset();
					if (offset === targetOffset) break;
					if (offset > targetOffset) throw Error("targetOffset ".concat(targetOffset, " is at invalid UTF-16 code unit boundary"));
					if (this.bump(), this.isEOF()) break;
				}
			}, Parser2.prototype.bumpSpace = function() {
				for (; !this.isEOF() && _isWhiteSpace(this.char());) this.bump();
			}, Parser2.prototype.peek = function() {
				if (this.isEOF()) return null;
				var code = this.char(), offset = this.offset();
				return this.message.charCodeAt(offset + (code >= 65536 ? 2 : 1)) ?? null;
			}, Parser2;
		})();
		(function(ErrorCode2) {
			ErrorCode2.MISSING_VALUE = "MISSING_VALUE", ErrorCode2.INVALID_VALUE = "INVALID_VALUE", ErrorCode2.MISSING_INTL_API = "MISSING_INTL_API";
		})(ErrorCode || (ErrorCode = {}));
		FormatError = (function(_super) {
			__extends(FormatError2, _super);
			function FormatError2(msg, code, originalMessage) {
				var _this = _super.call(this, msg) || this;
				return _this.code = code, _this.originalMessage = originalMessage, _this;
			}
			return FormatError2.prototype.toString = function() {
				return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
			}, FormatError2;
		})(Error);
		InvalidValueError = (function(_super) {
			__extends(InvalidValueError2, _super);
			function InvalidValueError2(variableId, value, options, originalMessage) {
				return _super.call(this, "Invalid values for \"".concat(variableId, "\": \"").concat(value, "\". Options are \"").concat(Object.keys(options).join("\", \""), "\""), ErrorCode.INVALID_VALUE, originalMessage) || this;
			}
			return InvalidValueError2;
		})(FormatError);
		InvalidValueTypeError = (function(_super) {
			__extends(InvalidValueTypeError2, _super);
			function InvalidValueTypeError2(value, type, originalMessage) {
				return _super.call(this, "Value for \"".concat(value, "\" must be of type ").concat(type), ErrorCode.INVALID_VALUE, originalMessage) || this;
			}
			return InvalidValueTypeError2;
		})(FormatError);
		MissingValueError = (function(_super) {
			__extends(MissingValueError2, _super);
			function MissingValueError2(variableId, originalMessage) {
				return _super.call(this, "The intl string context variable \"".concat(variableId, "\" was not provided to the string \"").concat(originalMessage, "\""), ErrorCode.MISSING_VALUE, originalMessage) || this;
			}
			return MissingValueError2;
		})(FormatError);
		(function(PART_TYPE2) {
			PART_TYPE2[PART_TYPE2.literal = 0] = "literal", PART_TYPE2[PART_TYPE2.object = 1] = "object";
		})(PART_TYPE || (PART_TYPE = {}));
		/** @class */
		(function() {
			function IntlMessageFormat2(message, locales, overrideFormats, opts) {
				locales === void 0 && (locales = IntlMessageFormat2.defaultLocale);
				var _this = this;
				if (this.formatterCache = {
					number: {},
					dateTime: {},
					pluralRules: {}
				}, this.format = function(values) {
					var parts = _this.formatToParts(values);
					if (parts.length === 1) return parts[0].value;
					var result = parts.reduce(function(all, part) {
						return !all.length || part.type !== PART_TYPE.literal || typeof all[all.length - 1] != "string" ? all.push(part.value) : all[all.length - 1] += part.value, all;
					}, []);
					return result.length <= 1 ? result[0] || "" : result;
				}, this.formatToParts = function(values) {
					return formatToParts(_this.ast, _this.locales, _this.formatters, _this.formats, values, void 0, _this.message);
				}, this.resolvedOptions = function() {
					var _a3;
					return { locale: ((_a3 = _this.resolvedLocale) === null || _a3 === void 0 ? void 0 : _a3.toString()) || Intl.NumberFormat.supportedLocalesOf(_this.locales)[0] };
				}, this.getAst = function() {
					return _this.ast;
				}, this.locales = locales, this.resolvedLocale = IntlMessageFormat2.resolveLocale(locales), typeof message == "string") {
					if (this.message = message, !IntlMessageFormat2.__parse) throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
					var _a2 = opts || {};
					_a2.formatters;
					var parseOpts = __rest(_a2, ["formatters"]);
					this.ast = IntlMessageFormat2.__parse(message, __assign(__assign({}, parseOpts), { locale: this.resolvedLocale }));
				} else this.ast = message;
				if (!Array.isArray(this.ast)) throw new TypeError("A message must be provided as a String or AST.");
				this.formats = mergeConfigs(IntlMessageFormat2.formats, overrideFormats), this.formatters = opts && opts.formatters || createDefaultFormatters(this.formatterCache);
			}
			return Object.defineProperty(IntlMessageFormat2, "defaultLocale", {
				get: function() {
					return IntlMessageFormat2.memoizedDefaultLocale || (IntlMessageFormat2.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale), IntlMessageFormat2.memoizedDefaultLocale;
				},
				enumerable: !1,
				configurable: !0
			}), IntlMessageFormat2.memoizedDefaultLocale = null, IntlMessageFormat2.resolveLocale = function(locales) {
				if (!(typeof Intl.Locale > "u")) {
					var supportedLocales = Intl.NumberFormat.supportedLocalesOf(locales);
					return supportedLocales.length > 0 ? new Intl.Locale(supportedLocales[0]) : new Intl.Locale(typeof locales == "string" ? locales : locales[0]);
				}
			}, IntlMessageFormat2.__parse = parse, IntlMessageFormat2.formats = {
				number: {
					integer: { maximumFractionDigits: 0 },
					currency: { style: "currency" },
					percent: { style: "percent" }
				},
				date: {
					short: {
						month: "numeric",
						day: "numeric",
						year: "2-digit"
					},
					medium: {
						month: "short",
						day: "numeric",
						year: "numeric"
					},
					long: {
						month: "long",
						day: "numeric",
						year: "numeric"
					},
					full: {
						weekday: "long",
						month: "long",
						day: "numeric",
						year: "numeric"
					}
				},
				time: {
					short: {
						hour: "numeric",
						minute: "numeric"
					},
					medium: {
						hour: "numeric",
						minute: "numeric",
						second: "numeric"
					},
					long: {
						hour: "numeric",
						minute: "numeric",
						second: "numeric",
						timeZoneName: "short"
					},
					full: {
						hour: "numeric",
						minute: "numeric",
						second: "numeric",
						timeZoneName: "short"
					}
				}
			}, IntlMessageFormat2;
		})();
		$5b160d28a433310d$var$localeSymbol = /* @__PURE__ */ Symbol.for("react-aria.i18n.locale");
		$5b160d28a433310d$var$stringsSymbol = /* @__PURE__ */ Symbol.for("react-aria.i18n.strings");
		$5b160d28a433310d$export$c17fa47878dc55b6 = class _$5b160d28a433310d$export$c17fa47878dc55b6 {
			/** Returns a localized string for the given key and locale. */
			getStringForLocale(key, locale) {
				let string = this.getStringsForLocale(locale)[key];
				if (!string) throw new Error(`Could not find intl message ${key} in ${locale} locale`);
				return string;
			}
			/** Returns all localized strings for the given locale. */
			getStringsForLocale(locale) {
				let strings = this.strings[locale];
				return strings || (strings = $5b160d28a433310d$var$getStringsForLocale(locale, this.strings, this.defaultLocale), this.strings[locale] = strings), strings;
			}
			static getGlobalDictionaryForPackage(packageName) {
				if (typeof window > "u") return null;
				let locale = window[$5b160d28a433310d$var$localeSymbol];
				if ($5b160d28a433310d$var$cachedGlobalStrings === void 0) {
					let globalStrings = window[$5b160d28a433310d$var$stringsSymbol];
					if (!globalStrings) return null;
					$5b160d28a433310d$var$cachedGlobalStrings = {};
					for (let pkg in globalStrings) $5b160d28a433310d$var$cachedGlobalStrings[pkg] = new _$5b160d28a433310d$export$c17fa47878dc55b6({ [locale]: globalStrings[pkg] }, locale);
				}
				let dictionary = $5b160d28a433310d$var$cachedGlobalStrings?.[packageName];
				if (!dictionary) throw new Error(`Strings for package "${packageName}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);
				return dictionary;
			}
			constructor(messages, defaultLocale = "en-US") {
				this.strings = Object.fromEntries(Object.entries(messages).filter(([, v]) => v)), this.defaultLocale = defaultLocale;
			}
		};
		$6db58dc88e78b024$var$pluralRulesCache = /* @__PURE__ */ new Map();
		$6db58dc88e78b024$var$numberFormatCache = /* @__PURE__ */ new Map();
		$6db58dc88e78b024$export$2f817fcdc4b89ae0 = class {
			/** Formats a localized string for the given key with the provided variables. */
			format(key, variables) {
				let message = this.strings.getStringForLocale(key, this.locale);
				return typeof message == "function" ? message(variables, this) : message;
			}
			plural(count, options, type = "cardinal") {
				let opt = options["=" + count];
				if (opt) return typeof opt == "function" ? opt() : opt;
				let key = this.locale + ":" + type, pluralRules = $6db58dc88e78b024$var$pluralRulesCache.get(key);
				pluralRules || (pluralRules = new Intl.PluralRules(this.locale, { type }), $6db58dc88e78b024$var$pluralRulesCache.set(key, pluralRules));
				return opt = options[pluralRules.select(count)] || options.other, typeof opt == "function" ? opt() : opt;
			}
			number(value) {
				let numberFormat = $6db58dc88e78b024$var$numberFormatCache.get(this.locale);
				return numberFormat || (numberFormat = new Intl.NumberFormat(this.locale), $6db58dc88e78b024$var$numberFormatCache.set(this.locale, numberFormat)), numberFormat.format(value);
			}
			select(options, value) {
				let opt = options[value] || options.other;
				return typeof opt == "function" ? opt() : opt;
			}
			constructor(locale, strings) {
				this.locale = locale, this.strings = strings;
			}
		};
		$fca6afa0e843324b$var$cache = /* @__PURE__ */ new WeakMap();
		$7c5f6fbf42389787$var$HOUR_PARTS = 1080;
		$7c5f6fbf42389787$var$DAY_PARTS = 24 * $7c5f6fbf42389787$var$HOUR_PARTS;
		$7c5f6fbf42389787$var$MONTH_DAYS = 29;
		$7c5f6fbf42389787$var$MONTH_FRACT = 12 * $7c5f6fbf42389787$var$HOUR_PARTS + 793;
		$7c5f6fbf42389787$var$MONTH_DAYS * $7c5f6fbf42389787$var$DAY_PARTS + $7c5f6fbf42389787$var$MONTH_FRACT;
		$488c6ddbf4ef74c2$var$formatterCache = /* @__PURE__ */ new Map();
		$488c6ddbf4ef74c2$var$supportsSignDisplay = !1;
		try {
			$488c6ddbf4ef74c2$var$supportsSignDisplay = new Intl.NumberFormat("de-DE", { signDisplay: "exceptZero" }).resolvedOptions().signDisplay === "exceptZero";
		} catch {}
		$488c6ddbf4ef74c2$var$supportsUnit = !1;
		try {
			$488c6ddbf4ef74c2$var$supportsUnit = new Intl.NumberFormat("de-DE", {
				style: "unit",
				unit: "degree"
			}).resolvedOptions().style === "unit";
		} catch {}
		$488c6ddbf4ef74c2$var$UNITS = { degree: { narrow: {
			default: "°",
			"ja-JP": " 度",
			"zh-TW": "度",
			"sl-SI": " °"
		} } };
		$488c6ddbf4ef74c2$export$cc77c4ff7e8673c5 = class {
			/** Formats a number value as a string, according to the locale and options provided to the constructor. */
			format(value) {
				let res = "";
				if (!$488c6ddbf4ef74c2$var$supportsSignDisplay && this.options.signDisplay != null ? res = $488c6ddbf4ef74c2$export$711b50b3c525e0f2(this.numberFormatter, this.options.signDisplay, value) : res = this.numberFormatter.format(value), this.options.style === "unit" && !$488c6ddbf4ef74c2$var$supportsUnit) {
					var _UNITS_unit;
					let { unit, unitDisplay = "short", locale } = this.resolvedOptions();
					if (!unit) return res;
					let values = (_UNITS_unit = $488c6ddbf4ef74c2$var$UNITS[unit]) === null || _UNITS_unit === void 0 ? void 0 : _UNITS_unit[unitDisplay];
					res += values[locale] || values.default;
				}
				return res;
			}
			/** Formats a number to an array of parts such as separators, digits, punctuation, and more. */
			formatToParts(value) {
				return this.numberFormatter.formatToParts(value);
			}
			/** Formats a number range as a string. */
			formatRange(start, end) {
				if (typeof this.numberFormatter.formatRange == "function") return this.numberFormatter.formatRange(start, end);
				if (end < start) throw new RangeError("End date must be >= start date");
				return `${this.format(start)} \u2013 ${this.format(end)}`;
			}
			/** Formats a number range as an array of parts. */
			formatRangeToParts(start, end) {
				if (typeof this.numberFormatter.formatRangeToParts == "function") return this.numberFormatter.formatRangeToParts(start, end);
				if (end < start) throw new RangeError("End date must be >= start date");
				let startParts = this.numberFormatter.formatToParts(start), endParts = this.numberFormatter.formatToParts(end);
				return [
					...startParts.map((p) => ({
						...p,
						source: "startRange"
					})),
					{
						type: "literal",
						value: " – ",
						source: "shared"
					},
					...endParts.map((p) => ({
						...p,
						source: "endRange"
					}))
				];
			}
			/** Returns the resolved formatting options based on the values passed to the constructor. */
			resolvedOptions() {
				let options = this.numberFormatter.resolvedOptions();
				return !$488c6ddbf4ef74c2$var$supportsSignDisplay && this.options.signDisplay != null && (options = {
					...options,
					signDisplay: this.options.signDisplay
				}), !$488c6ddbf4ef74c2$var$supportsUnit && this.options.style === "unit" && (options = {
					...options,
					style: "unit",
					unit: this.options.unit,
					unitDisplay: this.options.unitDisplay
				}), options;
			}
			constructor(locale, options = {}) {
				this.numberFormatter = $488c6ddbf4ef74c2$var$getCachedNumberFormatter(locale, options), this.options = options;
			}
		};
		$325a3faab7a68acd$var$cache = /* @__PURE__ */ new Map();
		$2a41e45df1593e64$var$visualViewport = typeof document < "u" ? window.visualViewport : null;
		$9bf71ea28793e738$var$FocusContext = import_react$63.createContext(null);
		$9bf71ea28793e738$var$RESTORE_FOCUS_EVENT = "react-aria-focus-scope-restore";
		$9bf71ea28793e738$var$activeScope = null;
		$9bf71ea28793e738$var$Tree = class _$9bf71ea28793e738$var$Tree {
			get size() {
				return this.fastMap.size;
			}
			getTreeNode(data) {
				return this.fastMap.get(data);
			}
			addTreeNode(scopeRef, parent, nodeToRestore) {
				let parentNode = this.fastMap.get(parent ?? null);
				if (!parentNode) return;
				let node = new $9bf71ea28793e738$var$TreeNode({ scopeRef });
				parentNode.addChild(node), node.parent = parentNode, this.fastMap.set(scopeRef, node), nodeToRestore && (node.nodeToRestore = nodeToRestore);
			}
			addNode(node) {
				this.fastMap.set(node.scopeRef, node);
			}
			removeTreeNode(scopeRef) {
				if (scopeRef === null) return;
				let node = this.fastMap.get(scopeRef);
				if (!node) return;
				let parentNode = node.parent;
				for (let current of this.traverse()) current !== node && node.nodeToRestore && current.nodeToRestore && node.scopeRef && node.scopeRef.current && $9bf71ea28793e738$var$isElementInScope(current.nodeToRestore, node.scopeRef.current) && (current.nodeToRestore = node.nodeToRestore);
				let children = node.children;
				parentNode && (parentNode.removeChild(node), children.size > 0 && children.forEach((child) => parentNode && parentNode.addChild(child))), this.fastMap.delete(node.scopeRef);
			}
			*traverse(node = this.root) {
				if (node.scopeRef != null && (yield node), node.children.size > 0) for (let child of node.children) yield* this.traverse(child);
			}
			clone() {
				var _node_parent;
				let newTree = new _$9bf71ea28793e738$var$Tree();
				var _node_parent_scopeRef;
				for (let node of this.traverse()) newTree.addTreeNode(node.scopeRef, (_node_parent_scopeRef = (_node_parent = node.parent) === null || _node_parent === void 0 ? void 0 : _node_parent.scopeRef) !== null && _node_parent_scopeRef !== void 0 ? _node_parent_scopeRef : null, node.nodeToRestore);
				return newTree;
			}
			constructor() {
				this.fastMap = /* @__PURE__ */ new Map(), this.root = new $9bf71ea28793e738$var$TreeNode({ scopeRef: null }), this.fastMap.set(null, this.root);
			}
		};
		$9bf71ea28793e738$var$TreeNode = class {
			addChild(node) {
				this.children.add(node), node.parent = this;
			}
			removeChild(node) {
				this.children.delete(node), node.parent = void 0;
			}
			constructor(props) {
				this.children = /* @__PURE__ */ new Set(), this.contain = !1, this.scopeRef = props.scopeRef;
			}
		};
		$9bf71ea28793e738$export$d06fae2ee68b101e = new $9bf71ea28793e738$var$Tree();
		$a11501f3d1d39e6c$var$visibleOverlays = [];
		$49c51c25361d4cd2$var$visualViewport = typeof document < "u" && window.visualViewport;
		$49c51c25361d4cd2$var$preventScrollCount = 0;
		$96b38030c423d352$export$60d741e20e0aa309 = (0, import_react$69.createContext)({});
		$f57aed4a881a3485$var$Context = import_react$70.createContext(null);
		$773d5888b972f1cf$exports = {};
		$773d5888b972f1cf$exports = { dismiss: "تجاهل" };
		$d11f19852b941573$exports = {};
		$d11f19852b941573$exports = { dismiss: "Отхвърляне" };
		$b983974c2ee1efb3$exports = {};
		$b983974c2ee1efb3$exports = { dismiss: "Odstranit" };
		$5809cc9d4e92de73$exports = {};
		$5809cc9d4e92de73$exports = { dismiss: "Luk" };
		$c68c2e4fc74398d1$exports = {};
		$c68c2e4fc74398d1$exports = { dismiss: "Schließen" };
		$0898b4c153db2b77$exports = {};
		$0898b4c153db2b77$exports = { dismiss: "Απόρριψη" };
		$6d74810286a15183$exports = {};
		$6d74810286a15183$exports = { dismiss: "Dismiss" };
		$309d73dc65f78055$exports = {};
		$309d73dc65f78055$exports = { dismiss: "Descartar" };
		$44ad94f7205cf593$exports = {};
		$44ad94f7205cf593$exports = { dismiss: "Lõpeta" };
		$7c28f5687f0779a9$exports = {};
		$7c28f5687f0779a9$exports = { dismiss: "Hylkää" };
		$e6d75df4b68bd73a$exports = {};
		$e6d75df4b68bd73a$exports = { dismiss: "Rejeter" };
		$87505c9dab186d0f$exports = {};
		$87505c9dab186d0f$exports = { dismiss: "התעלם" };
		$553439c3ffb3e492$exports = {};
		$553439c3ffb3e492$exports = { dismiss: "Odbaci" };
		$74cf411061b983a2$exports = {};
		$74cf411061b983a2$exports = { dismiss: "Elutasítás" };
		$e933f298574dc435$exports = {};
		$e933f298574dc435$exports = { dismiss: "Ignora" };
		$ac91fc9fe02f71f6$exports = {};
		$ac91fc9fe02f71f6$exports = { dismiss: "閉じる" };
		$52b96f86422025af$exports = {};
		$52b96f86422025af$exports = { dismiss: "무시" };
		$c0d724c3e51dafa6$exports = {};
		$c0d724c3e51dafa6$exports = { dismiss: "Atmesti" };
		$c92899672a3fe72e$exports = {};
		$c92899672a3fe72e$exports = { dismiss: "Nerādīt" };
		$9f576b39d8e7a9d6$exports = {};
		$9f576b39d8e7a9d6$exports = { dismiss: "Lukk" };
		$9d025808aeec81a7$exports = {};
		$9d025808aeec81a7$exports = { dismiss: "Negeren" };
		$fce709921e2c0fa6$exports = {};
		$fce709921e2c0fa6$exports = { dismiss: "Zignoruj" };
		$2599cf0c4ab37f59$exports = {};
		$2599cf0c4ab37f59$exports = { dismiss: "Descartar" };
		$3c220ae7ef8a35fd$exports = {};
		$3c220ae7ef8a35fd$exports = { dismiss: "Dispensar" };
		$93562b5094072f54$exports = {};
		$93562b5094072f54$exports = { dismiss: "Revocare" };
		$cd9e2abd0d06c7b4$exports = {};
		$cd9e2abd0d06c7b4$exports = { dismiss: "Пропустить" };
		$45375701f409adf1$exports = {};
		$45375701f409adf1$exports = { dismiss: "Zrušiť" };
		$27fab53a576de9dd$exports = {};
		$27fab53a576de9dd$exports = { dismiss: "Opusti" };
		$4438748d9952e7c7$exports = {};
		$4438748d9952e7c7$exports = { dismiss: "Odbaci" };
		$0936d7347ef4da4c$exports = {};
		$0936d7347ef4da4c$exports = { dismiss: "Avvisa" };
		$29700c92185d38f8$exports = {};
		$29700c92185d38f8$exports = { dismiss: "Kapat" };
		$662ccaf2be4c25b3$exports = {};
		$662ccaf2be4c25b3$exports = { dismiss: "Скасувати" };
		$d80a27deda7cdb3c$exports = {};
		$d80a27deda7cdb3c$exports = { dismiss: "取消" };
		$2b2734393847c884$exports = {};
		$2b2734393847c884$exports = { dismiss: "關閉" };
		$a2f21f5f14f60553$exports = {};
		$a2f21f5f14f60553$exports = {
			"ar-AE": $773d5888b972f1cf$exports,
			"bg-BG": $d11f19852b941573$exports,
			"cs-CZ": $b983974c2ee1efb3$exports,
			"da-DK": $5809cc9d4e92de73$exports,
			"de-DE": $c68c2e4fc74398d1$exports,
			"el-GR": $0898b4c153db2b77$exports,
			"en-US": $6d74810286a15183$exports,
			"es-ES": $309d73dc65f78055$exports,
			"et-EE": $44ad94f7205cf593$exports,
			"fi-FI": $7c28f5687f0779a9$exports,
			"fr-FR": $e6d75df4b68bd73a$exports,
			"he-IL": $87505c9dab186d0f$exports,
			"hr-HR": $553439c3ffb3e492$exports,
			"hu-HU": $74cf411061b983a2$exports,
			"it-IT": $e933f298574dc435$exports,
			"ja-JP": $ac91fc9fe02f71f6$exports,
			"ko-KR": $52b96f86422025af$exports,
			"lt-LT": $c0d724c3e51dafa6$exports,
			"lv-LV": $c92899672a3fe72e$exports,
			"nb-NO": $9f576b39d8e7a9d6$exports,
			"nl-NL": $9d025808aeec81a7$exports,
			"pl-PL": $fce709921e2c0fa6$exports,
			"pt-BR": $2599cf0c4ab37f59$exports,
			"pt-PT": $3c220ae7ef8a35fd$exports,
			"ro-RO": $93562b5094072f54$exports,
			"ru-RU": $cd9e2abd0d06c7b4$exports,
			"sk-SK": $45375701f409adf1$exports,
			"sl-SI": $27fab53a576de9dd$exports,
			"sr-SP": $4438748d9952e7c7$exports,
			"sv-SE": $0936d7347ef4da4c$exports,
			"tr-TR": $29700c92185d38f8$exports,
			"uk-UA": $662ccaf2be4c25b3$exports,
			"zh-CN": $d80a27deda7cdb3c$exports,
			"zh-TW": $2b2734393847c884$exports
		};
		$5c3e21d68f1c4674$var$styles = {
			border: 0,
			clip: "rect(0 0 0 0)",
			clipPath: "inset(50%)",
			height: "1px",
			margin: "-1px",
			overflow: "hidden",
			padding: 0,
			position: "absolute",
			width: "1px",
			whiteSpace: "nowrap"
		};
		$5e3802645cc19319$var$supportsInert = typeof HTMLElement < "u" && "inert" in HTMLElement.prototype;
		$5e3802645cc19319$var$refCountMap = /* @__PURE__ */ new WeakMap();
		$5e3802645cc19319$var$observerStack = [];
		$337b884510726a0d$export$a2200b96afd16271 = import_react$74.createContext(null);
		$8796f90736e175cb$var$TOOLTIP_DELAY = 1500;
		$8796f90736e175cb$var$TOOLTIP_COOLDOWN = 500;
		$8796f90736e175cb$var$tooltips = {};
		$8796f90736e175cb$var$tooltipId = 0;
		$8796f90736e175cb$var$globalWarmedUp = !1;
		$8796f90736e175cb$var$globalWarmUpTimeout = null;
		$8796f90736e175cb$var$globalCooldownTimeout = null;
		$4e3b923658d69c60$export$7a7623236eec67fa = (0, import_react$78.createContext)(null);
		$4e3b923658d69c60$export$39ae08fa83328b12 = (0, import_react$78.createContext)(null);
		$4e3b923658d69c60$export$28c660c63b792dea = (0, import_react$78.forwardRef)(function({ UNSTABLE_portalContainer, ...props }, ref) {
			[props, ref] = $64fa3d84918910a7$export$29f1550f4b0d4415(props, ref, $4e3b923658d69c60$export$39ae08fa83328b12);
			let contextState = (0, import_react$78.useContext)($4e3b923658d69c60$export$7a7623236eec67fa), localState = $8796f90736e175cb$export$4d40659c25ecb50b(props), state = props.isOpen != null || props.defaultOpen != null || !contextState ? localState : contextState, isExiting = $d3f049242431219c$export$45fda7c47f93fd48(ref, state.isOpen) || props.isExiting || !1;
			return !state.isOpen && !isExiting ? null : import_react$78.createElement($f57aed4a881a3485$export$b47c3594eab58386, { portalContainer: UNSTABLE_portalContainer }, import_react$78.createElement($4e3b923658d69c60$var$TooltipInner, {
				...props,
				tooltipRef: ref,
				isExiting
			}));
		});
		import_memoizerific = __toESM$2(require_memoizerific(), 1);
		convertToReactAriaPlacement = (0, import_memoizerific.default)(1e3)((p) => p === "left-end" ? "left bottom" : p === "right-end" ? "right bottom" : p === "left-start" ? "left top" : p === "right-start" ? "right top" : p.replace("-", " "));
		styled.div({
			width: 500,
			height: 500,
			paddingTop: 100,
			overflowY: "scroll",
			background: "#eee",
			position: "relative"
		});
		Trigger = (0, import_react$79.forwardRef)((props, ref) => import_react$79.createElement("button", {
			...props,
			ref,
			style: {
				width: 120,
				height: 50,
				margin: 10
			}
		}));
		Trigger.displayName = "Trigger";
		TooltipProvider = ({ triggerOnFocusOnly = !1, placement: placementProp = "top", offset = 8, tooltip, children, defaultVisible, startOpen, delayShow = 400, delayHide = 200, visible, onVisibleChange, ...props }) => {
			let placement = convertToReactAriaPlacement(placementProp), child = import_react$13.Children.only(children);
			startOpen !== void 0 && deprecate2("The `startOpen` prop is deprecated. Please use `defaultVisible` instead.");
			let [isOpen, setIsOpen] = (0, import_react$13.useState)(defaultVisible ?? startOpen ?? !1), onOpenChange = (0, import_react$13.useCallback)((isOpen2) => {
				setIsOpen(isOpen2), onVisibleChange?.(isOpen2);
			}, [onVisibleChange]);
			return import_react$13.createElement($4e3b923658d69c60$export$8c610744efcf8a1d, {
				delay: delayShow,
				closeDelay: delayHide,
				isOpen: visible ?? isOpen,
				onOpenChange,
				trigger: triggerOnFocusOnly ? "focus" : void 0,
				...props
			}, import_react$13.createElement($f645667febf57a63$export$35a3bebf7ef2d934, null, import_react$13.cloneElement(child, { "aria-describedby": null })), import_react$13.createElement($4e3b923658d69c60$export$28c660c63b792dea, {
				"data-testid": "tooltip",
				placement,
				offset,
				onOpenChange,
				style: { outline: "none" },
				...props
			}, tooltip));
		};
		InteractiveTooltipWrapper = ({ children, disableAllTooltips, shortcut, tooltip }) => {
			let tooltipLabel = (0, import_react$11.useMemo)(() => {
				let hasShortcuts = document?.body?.getAttribute("data-shortcuts-enabled") !== "false";
				if (!(!tooltip && (!shortcut || !hasShortcuts))) return [tooltip, shortcut && hasShortcuts && `[${shortcutToHumanString(shortcut)}]`].filter(Boolean).join(" ");
			}, [shortcut, tooltip]);
			return tooltipLabel ? import_react$11.createElement(TooltipProvider, {
				placement: "top",
				tooltip: import_react$11.createElement(TooltipNote, { note: tooltipLabel }),
				visible: disableAllTooltips ? !1 : void 0
			}, children) : import_react$11.createElement(import_react$11.Fragment, null, children);
		};
		InteractiveTooltipWrapper.displayName = "InteractiveTooltipWrapper";
		Button = (0, import_react$8.forwardRef)(({ as = "button", asChild = !1, animation = "none", size = "small", appearance = "default", variant = "outline", padding = "medium", disabled = !1, readOnly = !1, active, onClick, ariaLabel, ariaDescription = void 0, tooltip = void 0, shortcut = void 0, disableAllTooltips = !1, ...props }, ref) => {
			let Comp2 = asChild ? Slot : as, deprecated;
			!readOnly && (ariaLabel === void 0 || ariaLabel === "") && (deprecated = "ariaLabel", deprecate3(`The 'ariaLabel' prop on 'Button' will become mandatory in Storybook 11. Buttons with text content should set 'ariaLabel={false}' to indicate that they are accessible as-is. Buttons without text content must provide a meaningful 'ariaLabel' for accessibility. The button content is: ${props.children}.`)), active !== void 0 && (deprecated = "active", deprecate3("The `active` prop on `Button` is deprecated and will be removed in Storybook 11. Use specialized components like `ToggleButton` or `Select` instead."));
			let { ariaDescriptionAttrs, AriaDescription } = useAriaDescription(ariaDescription), shortcutAttribute = (0, import_react$8.useMemo)(() => shortcut ? shortcutToAriaKeyshortcuts(shortcut) : void 0, [shortcut]), [isAnimating, setIsAnimating] = (0, import_react$8.useState)(!1), handleClick = (event) => {
				onClick && onClick(event), animation !== "none" && setIsAnimating(!0);
			};
			return (0, import_react$8.useEffect)(() => {
				let timer = setTimeout(() => {
					isAnimating && setIsAnimating(!1);
				}, 1e3);
				return () => clearTimeout(timer);
			}, [isAnimating]), import_react$8.createElement(import_react$8.Fragment, null, import_react$8.createElement(InteractiveTooltipWrapper, {
				disableAllTooltips,
				shortcut,
				tooltip: tooltip || (ariaLabel !== !1 ? ariaLabel : void 0)
			}, import_react$8.createElement(StyledButton, {
				"data-deprecated": deprecated,
				as: Comp2,
				ref,
				appearance,
				variant,
				size,
				padding,
				$disabled: disabled || readOnly,
				"aria-disabled": disabled || readOnly ? "true" : void 0,
				readOnly,
				active,
				animating: isAnimating,
				animation,
				onClick: disabled || readOnly ? void 0 : handleClick,
				"aria-label": !readOnly && ariaLabel !== !1 ? ariaLabel : void 0,
				"aria-keyshortcuts": readOnly ? void 0 : shortcutAttribute,
				...readOnly ? {} : ariaDescriptionAttrs,
				...props
			})), import_react$8.createElement(AriaDescription, null));
		});
		Button.displayName = "Button";
		StyledButton = styled("button", { shouldForwardProp: (prop) => isPropValid(prop) })(({ theme, appearance, variant, size, $disabled, readOnly, active, animating, animation = "none", padding }) => {
			let colors = appearance === "agentic" ? {
				foreground: theme.fgColor.agentic,
				background: theme.bgColor.agentic,
				outline: theme.borderColor.agentic
			} : {
				foreground: theme.color.secondary,
				background: theme.button.background,
				outline: theme.button.border
			};
			return {
				border: 0,
				cursor: readOnly ? "inherit" : $disabled ? "not-allowed" : "pointer",
				display: "inline-flex",
				gap: "6px",
				alignItems: "center",
				justifyContent: "center",
				overflow: "hidden",
				padding: padding === "none" ? 0 : padding === "small" && size === "small" ? "0 7px" : padding === "small" && size === "medium" ? "0 9px" : size === "small" ? "0 10px" : size === "medium" ? "0 12px" : 0,
				height: size === "small" ? "28px" : "32px",
				position: "relative",
				textAlign: "center",
				textDecoration: "none",
				transitionProperty: "background, box-shadow",
				transitionDuration: "150ms",
				transitionTimingFunction: "ease-out",
				verticalAlign: "top",
				whiteSpace: "nowrap",
				userSelect: "none",
				opacity: $disabled && !readOnly ? .5 : 1,
				margin: 0,
				fontSize: `${theme.typography.size.s1}px`,
				fontWeight: theme.typography.weight.bold,
				lineHeight: "1",
				background: variant === "solid" ? theme.base === "light" ? colors.foreground : curriedDarken$1(.18, colors.foreground) : variant === "outline" ? colors.background : variant === "ghost" && active ? curriedTransparentize$1(.93, appearance === "agentic" ? theme.bgColor.agentic : theme.barSelectedColor) : "transparent",
				color: variant === "solid" ? theme.color.lightest : variant === "outline" ? appearance === "agentic" ? theme.fgColor.agentic : theme.input.color : variant === "ghost" && active ? theme.base === "light" ? curriedDarken$1(.1, colors.foreground) : colors.foreground : variant === "ghost" ? theme.textMutedColor : theme.input.color,
				boxShadow: variant === "outline" ? `${colors.outline} 0 0 0 1px inset` : "none",
				borderRadius: theme.input.borderRadius,
				flexShrink: 0,
				...!readOnly && {
					"&:hover": {
						color: variant === "ghost" ? colors.foreground : void 0,
						background: (() => {
							let bgColor = colors.foreground;
							return variant === "solid" && (bgColor = theme.base === "light" ? curriedLighten$1(.1, colors.foreground) : curriedDarken$1(.3, colors.foreground)), variant === "outline" && (bgColor = colors.background), variant === "ghost" ? curriedTransparentize$1(.86, colors.foreground) : theme.base === "light" ? curriedDarken$1(.02, bgColor) : curriedLighten$1(.03, bgColor);
						})()
					},
					"&:active": {
						color: variant === "ghost" ? colors.foreground : void 0,
						background: (() => {
							let bgColor = colors.foreground;
							return variant === "solid" && (bgColor = colors.foreground), variant === "outline" && (bgColor = colors.background), variant === "ghost" ? appearance === "agentic" ? theme.bgColor.agentic : theme.background.hoverable : theme.base === "light" ? curriedDarken$1(.02, bgColor) : curriedLighten$1(.03, bgColor);
						})()
					},
					"&:focus-visible": {
						outline: `2px solid ${rgba(colors.foreground, 1)}`,
						outlineOffset: 2,
						zIndex: "1"
					},
					".sb-bar &:focus-visible, .sb-list &:focus-visible": { outlineOffset: 0 }
				},
				"> svg": {
					flex: "0 0 auto",
					animation: animating && animation !== "none" ? `${theme.animation[animation]} 1000ms ease-out` : ""
				}
			};
		});
		IconButton = (0, import_react$8.forwardRef)((props, ref) => (deprecate3("`IconButton` is deprecated and will be removed in Storybook 11, use `Button` instead."), import_react$8.createElement(Button, {
			ref,
			...props,
			"data-deprecated": "IconButton"
		})));
		IconButton.displayName = "IconButton";
		ToggleButton = (0, import_react$81.forwardRef)(({ pressed, ...props }, ref) => import_react$81.createElement(StyledToggle, {
			role: "switch",
			"aria-checked": pressed,
			ref,
			pressed,
			...props
		}));
		ToggleButton.displayName = "ToggleButton";
		StyledToggle = styled(Button)(({ theme, variant = "outline", pressed }) => ({ ...pressed ? {
			...variant === "solid" ? { background: theme.base === "lighten" ? curriedDarken$1(.1, theme.color.secondary) : curriedDarken$1(.2, theme.color.secondary) } : {},
			...variant === "outline" ? {
				background: curriedTransparentize$1(.94, theme.barSelectedColor),
				boxShadow: `${theme.barSelectedColor} 0 0 0 1px inset`,
				color: theme.barSelectedColor
			} : {},
			...variant === "ghost" ? {
				background: curriedTransparentize$1(.93, theme.barSelectedColor),
				color: theme.base === "light" ? curriedDarken$1(.1, theme.color.secondary) : theme.color.secondary
			} : {}
		} : {} }));
		ActionListItem = styled.li(({ active, theme }) => ({
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			flex: "0 0 auto",
			overflow: "hidden",
			minHeight: 32,
			gap: 4,
			fontSize: theme.typography.size.s1,
			fontWeight: active ? theme.typography.weight.bold : theme.typography.weight.regular,
			color: active ? "var(--listbox-item-active-color)" : theme.color.defaultText,
			"--listbox-item-active-color": theme.base === "light" ? curriedDarken$1(.1, theme.color.secondary) : theme.color.secondary,
			"--listbox-item-muted-color": active ? "var(--listbox-item-active-color)" : theme.color.mediumdark,
			"&[aria-disabled=\"true\"]": {
				opacity: .5,
				cursor: "not-allowed"
			},
			"&[aria-selected=\"true\"]": {
				color: "var(--listbox-item-active-color)",
				fontWeight: theme.typography.weight.bold,
				"--listbox-item-muted-color": "var(--listbox-item-active-color)"
			},
			"&:not(:hover, :has(:focus-visible)) :not(input) + input": {
				position: "absolute",
				opacity: 0
			},
			"&[role=\"option\"]": {
				cursor: "pointer",
				borderRadius: theme.input.borderRadius,
				outlineOffset: -2,
				padding: "0 9px",
				gap: 8,
				"&:hover": { background: curriedTransparentize$1(.86, theme.color.secondary) },
				"&:focus-visible": { outline: `2px solid ${theme.color.secondary}` }
			},
			"@supports (interpolate-size: allow-keywords)": {
				interpolateSize: "allow-keywords",
				transitionBehavior: "allow-discrete",
				transitionDuration: "var(--transition-duration, 0.2s)",
				transitionProperty: "opacity, block-size, content-visibility"
			},
			"@media (prefers-reduced-motion: reduce)": { transition: "none" }
		}), ({ transitionStatus }) => {
			switch (transitionStatus) {
				case "preEnter":
				case "exiting":
				case "exited": return {
					opacity: 0,
					blockSize: 0,
					contentVisibility: "hidden"
				};
				default: return {
					opacity: 1,
					blockSize: "auto",
					contentVisibility: "visible"
				};
			}
		});
		ActionListHoverItem = styled(ActionListItem)(({ targetId }) => ({
			gap: 0,
			[`& [data-target-id="${targetId}"]`]: {
				inlineSize: "auto",
				marginLeft: 4,
				opacity: 1,
				"@supports (interpolate-size: allow-keywords)": {
					interpolateSize: "allow-keywords",
					transitionProperty: "inline-size, margin-left, opacity, padding-inline",
					transitionDuration: "var(--transition-duration, 0.2s)"
				}
			},
			[`&:not(:hover, :has(:focus-visible)) [data-target-id="${targetId}"]`]: {
				inlineSize: 0,
				marginLeft: 0,
				opacity: 0,
				paddingInline: 0
			}
		}));
		StyledButton2 = styled(Button)(({ size }) => ({
			gap: size === "small" ? 6 : 8,
			"&:focus-visible": { outlineOffset: -2 }
		}));
		StyledToggleButton = styled(ToggleButton)({ "&:focus-visible": { outlineOffset: -2 } });
		ActionListButton = (0, import_react$7.forwardRef)(function({ padding = "small", size = "medium", variant = "ghost", ...props }, ref) {
			return import_react$7.createElement(StyledButton2, {
				...props,
				variant,
				padding,
				size,
				ref
			});
		});
		ActionListToggle = (0, import_react$7.forwardRef)(function({ padding = "small", size = "medium", variant = "ghost", ...props }, ref) {
			return import_react$7.createElement(StyledToggleButton, {
				...props,
				variant,
				padding,
				size,
				ref
			});
		});
		ActionListAction = styled(ActionListButton)(({ theme }) => ({
			height: "auto",
			minHeight: 32,
			flex: "0 1 100%",
			textAlign: "start",
			justifyContent: "space-between",
			fontWeight: "inherit",
			color: "inherit",
			"&:hover": { color: "inherit" },
			"& input:enabled:focus-visible": { outline: "none" },
			"&:has(input:focus-visible)": {
				outline: `2px solid ${theme.color.secondary}`,
				outlineOffset: -2
			}
		}));
		ActionListLink = (props) => import_react$7.createElement(ActionListAction, {
			as: "a",
			...props
		});
		ActionListText = styled.div(({ theme }) => ({
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			flexGrow: 1,
			minWidth: 0,
			padding: "8px 0",
			lineHeight: "16px",
			"& > *": {
				margin: 0,
				whiteSpace: "normal"
			},
			"& > span": {
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			},
			"& small": {
				fontSize: "inherit",
				color: theme.textMutedColor
			},
			"&:first-child": { paddingLeft: 8 },
			"&:last-child": { paddingRight: 8 },
			"button > &:first-child, [role=\"option\"] > &:first-child": { paddingLeft: 0 },
			"button > &:last-child, [role=\"option\"] > &:last-child": { paddingRight: 0 }
		}));
		ActionListIcon = styled.div({
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flex: "0 0 14px",
			width: 14,
			height: 14,
			color: "var(--listbox-item-muted-color)"
		});
		ActionList = Object.assign(styled.ul(({ theme, onClick }) => ({
			listStyle: "none",
			margin: 0,
			padding: 4,
			cursor: onClick ? "pointer" : "default",
			"& + *": { borderTop: `1px solid ${theme.appBorderColor}` }
		})), {
			Item: ActionListItem,
			HoverItem: ActionListHoverItem,
			Button: ActionListButton,
			Toggle: ActionListToggle,
			Action: ActionListAction,
			Link: ActionListLink,
			Text: ActionListText,
			Icon: ActionListIcon
		});
		CollapsibleContent = styled.div(({ collapsed = !1 }) => ({
			blockSize: collapsed ? 0 : "auto",
			contentVisibility: collapsed ? "hidden" : "visible",
			transform: collapsed ? "translateY(-10px)" : "translateY(0)",
			opacity: collapsed ? 0 : 1,
			overflow: "hidden",
			"@supports (interpolate-size: allow-keywords)": {
				interpolateSize: "allow-keywords",
				transition: "all var(--transition-duration, 0.2s)",
				transitionBehavior: "allow-discrete"
			},
			"@media (prefers-reduced-motion: reduce)": { transition: "none" }
		}));
		Object.assign(function({ children, summary, collapsed, disabled, initialCollapsed, storageKey, state: providedState, ...props }) {
			let internalState = useCollapsible({
				collapsed,
				disabled,
				initialCollapsed,
				storageKey
			}), state = providedState || internalState;
			return import_react$82.createElement(import_react$82.Fragment, null, typeof summary == "function" ? summary(state) : summary, import_react$82.createElement(CollapsibleContent, {
				...props,
				id: state.contentId,
				collapsed: state.isCollapsed,
				"aria-hidden": state.isCollapsed
			}, typeof children == "function" ? children(state) : children));
		}, { Content: CollapsibleContent });
		useSessionState = (key, initialValue) => {
			let [value, setValue] = (0, import_react$82.useState)(() => {
				try {
					return JSON.parse(sessionStorage.getItem(key)) ?? initialValue;
				} catch {
					return initialValue;
				}
			});
			return (0, import_react$82.useEffect)(() => {
				try {
					key && sessionStorage.setItem(key, JSON.stringify(value));
				} catch {}
			}, [key, value]), [value, setValue];
		};
		useCollapsible = ({ collapsed, disabled, initialCollapsed = collapsed, storageKey }) => {
			let [isCollapsed, setCollapsed] = useSessionState(storageKey && `useCollapsible:${storageKey}`, !!initialCollapsed);
			(0, import_react$82.useEffect)(() => {
				collapsed !== void 0 && setCollapsed(collapsed);
			}, [collapsed, setCollapsed]);
			let toggleCollapsed = (0, import_react$82.useCallback)((event) => {
				event?.stopPropagation(), disabled || setCollapsed((value) => !value);
			}, [disabled, setCollapsed]), contentId = $bdb11010cef70236$export$f680877a34711e37();
			return {
				contentId,
				isCollapsed,
				isDisabled: !!disabled,
				setCollapsed,
				toggleCollapsed,
				toggleProps: {
					disabled,
					onClick: toggleCollapsed,
					"aria-controls": contentId,
					"aria-expanded": !isCollapsed
				}
			};
		};
		resolveThemeColor = (colors, key) => key && key in colors ? colors[key] : void 0;
		getColor = (theme, color4) => resolveThemeColor(theme.fgColor, color4) ?? resolveThemeColor(theme.color, color4);
		getBorderColor = (theme, color4, outlineColor) => resolveThemeColor(theme.borderColor, color4) ?? resolveThemeColor(theme.color, outlineColor);
		getBackgroundColor = (theme, color4) => resolveThemeColor(theme.bgColor, color4) ?? theme.background.content;
		getOpaqueBackground = (theme, color4) => {
			let bg = getBackgroundColor(theme, color4);
			return `linear-gradient(${bg}, ${bg}), ${theme.background.content}`;
		};
		fadeInOut = keyframes({
			"0%": { opacity: 0 },
			"5%": { opacity: 1 },
			"25%": { opacity: 1 },
			"30%": { opacity: 0 }
		});
		spin = keyframes({
			"0%": { transform: "rotate(0deg)" },
			"10%": { transform: "rotate(20deg)" },
			"40%": { transform: "rotate(170deg)" },
			"50%": { transform: "rotate(180deg)" },
			"60%": { transform: "rotate(190deg)" },
			"90%": { transform: "rotate(340deg)" },
			"100%": { transform: "rotate(360deg)" }
		});
		slide = keyframes({ to: { backgroundPositionX: "36%" } });
		CardContent = styled.div(({ color: color4, theme }) => ({
			color: getColor(theme, color4),
			borderRadius: theme.appBorderRadius,
			background: getOpaqueBackground(theme, color4),
			position: "relative"
		}));
		CardOutline = styled.div(({ animation = "none", color: color4, outlineColor = color4, theme }) => ({
			position: "relative",
			width: "100%",
			padding: 1,
			overflow: "hidden",
			backgroundColor: getBackgroundColor(theme, color4),
			borderRadius: theme.appBorderRadius + 1,
			boxShadow: `inset 0 0 0 1px ${animation === "none" && getBorderColor(theme, color4, outlineColor) || theme.appBorderColor}, var(--card-box-shadow, transparent 0 0)`,
			transition: "box-shadow 1s",
			"@supports (interpolate-size: allow-keywords)": {
				interpolateSize: "allow-keywords",
				transition: "all var(--transition-duration, 0.2s), box-shadow 1s",
				transitionBehavior: "allow-discrete"
			},
			"@media (prefers-reduced-motion: reduce)": { transition: "box-shadow 1s" },
			"&:before": {
				content: "\"\"",
				display: animation === "none" ? "none" : "block",
				position: "absolute",
				left: 0,
				top: 0,
				width: "100%",
				height: "100%",
				opacity: 1,
				...animation === "rainbow" && {
					animation: `${slide} 10s infinite linear, ${fadeInOut} 60s infinite linear`,
					backgroundImage: "linear-gradient(45deg,rgb(234, 0, 0),rgb(255, 157, 0),rgb(255, 208, 0),rgb(0, 172, 0),rgb(0, 166, 255),rgb(181, 0, 181), rgb(234, 0, 0),rgb(255, 157, 0),rgb(255, 208, 0),rgb(0, 172, 0),rgb(0, 166, 255),rgb(181, 0, 181))",
					backgroundSize: "1000%",
					backgroundPositionX: "100%"
				},
				...animation === "spin" && {
					left: "50%",
					top: "50%",
					marginLeft: "calc(max(100vw, 100vh) * -0.5)",
					marginTop: "calc(max(100vw, 100vh) * -0.5)",
					height: "max(100vw, 100vh)",
					width: "max(100vw, 100vh)",
					animation: `${spin} 5s linear infinite`,
					backgroundImage: outlineColor === "negative" ? "conic-gradient(transparent 90deg, #FC521F 150deg, #FFAE00 210deg, transparent 270deg)" : outlineColor === "agentic" ? theme.base === "dark" ? "conic-gradient(transparent 90deg, rgba(114,58,166,0.65) 150deg, rgba(157,98,214,0.6) 210deg, transparent 270deg)" : "conic-gradient(transparent 90deg, #b6a7ff 150deg, #d8aeff 210deg, transparent 270deg)" : "conic-gradient(transparent 90deg, #029CFD 150deg, #37D5D3 210deg, transparent 270deg)"
				}
			}
		}));
		Object.assign((0, import_react$83.forwardRef)(function({ outlineAnimation = "none", color: color4, outlineColor, outlineAttrs = {}, ...props }, ref) {
			return import_react$83.createElement(CardOutline, {
				animation: outlineAnimation,
				color: color4,
				outlineColor,
				ref,
				...outlineAttrs
			}, import_react$83.createElement(CardContent, {
				color: color4,
				...props
			}));
		}), {
			Content: CardContent,
			Outline: CardOutline
		});
		({deprecate: deprecate5} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		STATUS = [
			"preEnter",
			"entering",
			"entered",
			"preExit",
			"exiting",
			"exited",
			"unmounted"
		];
		getState = (status) => ({
			_s: status,
			status: STATUS[status],
			isEnter: status < 3,
			isMounted: status !== 6,
			isResolved: status === 2 || status > 4
		});
		startOrEnd = (unmounted) => unmounted ? 6 : 5;
		getEndStatus = (status, unmountOnExit) => {
			switch (status) {
				case 1:
				case 0: return 2;
				case 4:
				case 3: return startOrEnd(unmountOnExit);
			}
		};
		getTimeout = (timeout) => typeof timeout == "object" ? [timeout.enter, timeout.exit] : [timeout, timeout];
		nextTick = (transitState, status) => setTimeout(() => {
			isNaN(document.body.offsetTop) || transitState(status + 1);
		}, 0);
		updateState = (status, setState, latestState, timeoutId, onChange) => {
			clearTimeout(timeoutId.current);
			let state = getState(status);
			setState(state), latestState.current = state, onChange && onChange({ current: state });
		};
		useTransitionState = ({ enter = !0, exit = !0, preEnter, preExit, timeout, initialEntered, mountOnEnter, unmountOnExit, onStateChange: onChange } = {}) => {
			let [state, setState] = (0, import_react$85.useState)(() => getState(initialEntered ? 2 : startOrEnd(mountOnEnter))), latestState = (0, import_react$85.useRef)(state), timeoutId = (0, import_react$85.useRef)(), [enterTimeout, exitTimeout] = getTimeout(timeout), endTransition = (0, import_react$85.useCallback)(() => {
				let status = getEndStatus(latestState.current._s, unmountOnExit);
				status && updateState(status, setState, latestState, timeoutId, onChange);
			}, [onChange, unmountOnExit]);
			return [
				state,
				(0, import_react$85.useCallback)((toEnter) => {
					let transitState = (status) => {
						switch (updateState(status, setState, latestState, timeoutId, onChange), status) {
							case 1:
								enterTimeout >= 0 && (timeoutId.current = setTimeout(endTransition, enterTimeout));
								break;
							case 4:
								exitTimeout >= 0 && (timeoutId.current = setTimeout(endTransition, exitTimeout));
								break;
							case 0:
							case 3: timeoutId.current = nextTick(transitState, status);
						}
					}, enterStage = latestState.current.isEnter;
					typeof toEnter != "boolean" && (toEnter = !enterStage), toEnter ? !enterStage && transitState(enter ? preEnter ? 0 : 1 : 2) : enterStage && transitState(exit ? preExit ? 3 : 4 : startOrEnd(unmountOnExit));
				}, [
					endTransition,
					onChange,
					enter,
					exit,
					preEnter,
					preExit,
					enterTimeout,
					exitTimeout,
					unmountOnExit
				]),
				endTransition
			];
		};
		Modal_styled_exports = {};
		__export(Modal_styled_exports, {
			Actions: () => Actions,
			Close: () => Close,
			CloseButton: () => CloseButton,
			Col: () => Col,
			Container: () => Container2,
			Content: () => Content,
			Description: () => Description,
			Dialog: () => Dialog,
			Error: () => Error2,
			ErrorWrapper: () => ErrorWrapper,
			Header: () => Header,
			Overlay: () => Overlay,
			Row: () => Row,
			Title: () => Title
		});
		({deprecate: deprecate4} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		(0, import_react$89.createContext)(null);
		(0, import_react$89.createContext)(null);
		(0, import_react$89.createContext)(null);
		(0, import_react$89.createContext)(null);
		(0, import_react$89.createContext)(null);
		$4e85f108e88277b8$export$d688439359537581 = (0, import_react$89.createContext)({});
		$5cb03073d3f54797$export$a8a3e93435678ff9 = (0, import_react$90.forwardRef)(function(props, ref) {
			[props, ref] = $64fa3d84918910a7$export$29f1550f4b0d4415(props, ref, $4e85f108e88277b8$export$d688439359537581);
			let { children, level = 3, className, ...domProps } = props, Element2 = `h${level}`;
			return import_react$90.createElement(Element2, {
				...domProps,
				ref,
				className: className ?? "react-aria-Heading"
			}, children);
		});
		$514c0188e459b4c0$export$9afb8bc826b033ea = (0, import_react$91.createContext)({});
		$514c0188e459b4c0$export$5f1af8db9871e1d6 = (0, import_react$91.forwardRef)(function(props, ref) {
			[props, ref] = $64fa3d84918910a7$export$29f1550f4b0d4415(props, ref, $514c0188e459b4c0$export$9afb8bc826b033ea);
			let { elementType: ElementType = "span", ...domProps } = props;
			return import_react$91.createElement(ElementType, {
				className: "react-aria-Text",
				...domProps,
				ref
			});
		});
		fadeIn = keyframes({
			from: { opacity: 0 },
			to: { opacity: 1 }
		});
		fadeOut = keyframes({
			from: { opacity: 1 },
			to: { opacity: 0 }
		});
		expand = keyframes({
			from: { maxHeight: 0 },
			to: {}
		});
		zoomIn = keyframes({
			from: {
				opacity: 0,
				transform: "translate(-50%, -50%) scale(0.9)"
			},
			to: {
				opacity: 1,
				transform: "translate(-50%, -50%) scale(1)"
			}
		});
		zoomOut = keyframes({
			from: {
				opacity: 1,
				transform: "translate(-50%, -50%) scale(1)"
			},
			to: {
				opacity: 0,
				transform: "translate(-50%, -50%) scale(0.9)"
			}
		});
		slideFromBottom = keyframes({
			from: {
				opacity: 0,
				maxHeight: "0px"
			},
			to: {
				opacity: 1,
				maxHeight: "80dvh"
			}
		});
		slideToBottom = keyframes({
			from: {
				opacity: 1,
				maxHeight: "80dvh"
			},
			to: {
				opacity: 0,
				maxHeight: "0px"
			}
		});
		Overlay = styled.div(({ $status, $transitionDuration }) => ({
			backdropFilter: "blur(24px)",
			background: "rgba(0, 0, 0, 0.4)",
			position: "absolute",
			inset: 0,
			width: "100%",
			height: "100%",
			zIndex: 1e5,
			"@media (prefers-reduced-motion: no-preference)": {
				animation: $status === "exiting" || $status === "preExit" ? `${fadeOut} ${$transitionDuration}ms` : `${fadeIn} ${$transitionDuration}ms`,
				animationFillMode: "forwards"
			}
		}));
		Container2 = styled.div(({ theme }) => ({
			backgroundColor: theme.background.bar,
			borderRadius: 6,
			boxShadow: "0px 4px 67px 0px #00000040",
			position: "absolute",
			overflow: "auto",
			zIndex: 1e5,
			"&:focus-visible": { outline: "none" }
		}), ({ theme, width, height, $variant, $status, $transitionDuration }) => $variant === "dialog" ? {
			top: "50%",
			left: "50%",
			width: width ?? 740,
			height: height ?? "auto",
			maxWidth: "calc(100% - 40px)",
			maxHeight: "85vh",
			"@media (prefers-reduced-motion: no-preference)": {
				willChange: "transform, opacity",
				animationTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
				animation: $status === "exiting" || $status === "preExit" ? `${zoomOut} ${$transitionDuration}ms` : `${zoomIn} ${$transitionDuration}ms`,
				animationFillMode: "forwards !important"
			},
			"@media (prefers-reduced-motion: reduce)": { transform: "translate(-50%, -50%) scale(1)" }
		} : {
			position: "fixed",
			bottom: "0",
			left: "0",
			right: "0",
			borderRadius: "10px 10px 0 0",
			overflow: "hidden",
			width: width ?? "100%",
			height: height ?? "80%",
			maxWidth: "100%",
			background: theme.background.content,
			"@supports (interpolate-size: allow-keywords)": { interpolateSize: "allow-keywords" },
			"@media (prefers-reduced-motion: no-preference)": {
				animationTimingFunction: "cubic-bezier(.9,.16,.77,.64)",
				animation: $status === "exiting" || $status === "preExit" ? `${slideToBottom} ${$transitionDuration}ms` : `${slideFromBottom} ${$transitionDuration}ms`,
				animationFillMode: "forwards !important"
			}
		});
		Close = ({ asChild, children, onClick, ...props }) => {
			let { close } = (0, import_react$88.useContext)(ModalContext);
			if (asChild && import_react$88.isValidElement(children)) {
				let handleClick = (event) => {
					onClick?.(event), children.props.onClick?.(event), close?.();
				};
				return import_react$88.cloneElement(children, {
					...props,
					onClick: handleClick
				});
			}
			return import_react$88.createElement(Button, {
				type: "button",
				padding: "small",
				ariaLabel: "Close modal",
				variant: "ghost",
				shortcut: ["Escape"],
				onClick: close
			}, import_react$88.createElement(CrossIcon, null));
		};
		Dialog = { Close: () => (deprecate4("Modal.Dialog.Close is deprecated, please use Modal.Close instead."), import_react$88.createElement(Close, { "data-deprecated": "Modal.Dialog.Close" })) };
		CloseButton = ({ ariaLabel, ...props }) => (deprecate4("Modal.CloseButton is deprecated, please use Modal.Close instead."), import_react$88.createElement(Close, { asChild: !0 }, import_react$88.createElement(Button, {
			ariaLabel: ariaLabel || "Close",
			"data-deprecated": "Modal.CloseButton",
			...props
		}, import_react$88.createElement(CrossIcon, null))));
		Content = styled.div({
			display: "flex",
			flexDirection: "column",
			margin: 16,
			gap: 16
		});
		Row = styled.div({
			display: "flex",
			justifyContent: "space-between",
			gap: 16
		});
		Col = styled.div({
			display: "flex",
			flexDirection: "column",
			gap: 4
		});
		Header = ({ hasClose = !0, onClose, ...props }) => import_react$88.createElement(Row, null, import_react$88.createElement(Col, { ...props }), hasClose && import_react$88.createElement(Close, { onClick: onClose }));
		Title = styled((props) => import_react$88.createElement($5cb03073d3f54797$export$a8a3e93435678ff9, {
			level: 2,
			...props
		}))(({ theme }) => ({
			margin: 0,
			fontSize: theme.typography.size.s3,
			fontWeight: theme.typography.weight.bold
		}));
		Description = styled($514c0188e459b4c0$export$5f1af8db9871e1d6)(({ theme }) => ({
			position: "relative",
			zIndex: 1,
			margin: 0,
			fontSize: theme.typography.size.s2
		}));
		Actions = styled.div({
			display: "flex",
			flexDirection: "row-reverse",
			gap: 8
		});
		ErrorWrapper = styled.div(({ theme }) => ({
			maxHeight: 100,
			overflow: "auto",
			"@media (prefers-reduced-motion: no-preference)": { animation: `${expand} 300ms, ${fadeIn} 300ms` },
			backgroundColor: theme.background.critical,
			color: theme.color.lightest,
			fontSize: theme.typography.size.s2,
			"& > div": {
				position: "relative",
				padding: "8px 16px"
			}
		}));
		Error2 = ({ children, ...props }) => import_react$88.createElement(ErrorWrapper, { ...props }, import_react$88.createElement("div", null, children));
		ModalContext = (0, import_react$84.createContext)({});
		Object.assign(BaseModal, Modal_styled_exports);
		styled.div(({ theme, col, row = 1 }) => col ? {
			display: "inline-block",
			verticalAlign: "inherit",
			"& > *": {
				marginLeft: col * theme.layoutMargin,
				verticalAlign: "inherit"
			},
			[`& > *:first-child${ignoreSsrWarning}`]: { marginLeft: 0 }
		} : {
			"& > *": { marginTop: row * theme.layoutMargin },
			[`& > *:first-child${ignoreSsrWarning}`]: { marginTop: 0 }
		}, ({ theme, outer, col, row }) => {
			switch (!0) {
				case !!(outer && col): return {
					marginLeft: outer * theme.layoutMargin,
					marginRight: outer * theme.layoutMargin
				};
				case !!(outer && row): return {
					marginTop: outer * theme.layoutMargin,
					marginBottom: outer * theme.layoutMargin
				};
				default: return {};
			}
		});
		styled.div(({ theme }) => ({ fontWeight: theme.typography.weight.bold }));
		styled.div();
		styled.div(({ theme }) => ({
			padding: 30,
			textAlign: "center",
			color: theme.color.defaultText,
			fontSize: theme.typography.size.s2 - 1
		}));
		ZoomElementWrapper = styled.div(({ centered = !1, scale = 1, elementHeight }) => ({
			height: elementHeight || "auto",
			transformOrigin: centered ? "center top" : "left top",
			transform: `scale(${1 / scale})`
		}));
		ZoomIFrame = class extends import_react$96.Component {
			constructor() {
				super(...arguments);
				this.iframe = null;
			}
			componentDidMount() {
				let { iFrameRef } = this.props;
				this.iframe = iFrameRef.current;
			}
			shouldComponentUpdate(nextProps) {
				let { scale, active } = this.props;
				return scale !== nextProps.scale && this.setIframeInnerZoom(nextProps.scale), active !== nextProps.active && this.iframe.setAttribute("data-is-storybook", nextProps.active ? "true" : "false"), nextProps.children.props.src !== this.props.children.props.src;
			}
			setIframeInnerZoom(scale) {
				try {
					Object.assign(this.iframe.contentDocument.body.style, {
						width: `${1 / scale * 100}%`,
						height: `${1 / scale * 100}%`,
						transform: `scale(${scale})`,
						transformOrigin: "top left"
					});
				} catch {
					this.setIframeZoom(scale);
				}
			}
			setIframeZoom(scale) {
				Object.assign(this.iframe.style, {
					width: `${1 / scale * 100}%`,
					height: `${1 / scale * 100}%`,
					transform: `scale(${scale})`,
					transformOrigin: "top left"
				});
			}
			render() {
				let { children } = this.props;
				return import_react$96.createElement(import_react$96.Fragment, null, children);
			}
		};
		Zoom = {
			Element: ZoomElement,
			IFrame: ZoomIFrame
		};
		({global: global2} = __STORYBOOK_MODULE_GLOBAL__);
		({document: document3} = global2), ErrorName = styled.strong(({ theme }) => ({ color: theme.color.orange })), ErrorImportant = styled.strong(({ theme }) => ({
			color: theme.color.ancillary,
			textDecoration: "underline"
		})), ErrorDetail = styled.em(({ theme }) => ({ color: theme.textMutedColor })), firstLineRegex = /(Error): (.*)\n/, linesRegexChromium = /at (?:(.*) )?\(?(.+)\)?/, linesRegexFirefox = /([^@]+)?(?:\/<)?@(.+)?/, linesRegexSafari = /([^@]+)?@(.+)?/, ErrorFormatter = ({ error }) => {
			if (!error) return import_react$97.createElement(import_react$97.Fragment, null, "This error has no stack or message");
			if (!error.stack) return import_react$97.createElement(import_react$97.Fragment, null, error.message || "This error has no stack or message");
			let input = error.stack.toString();
			input && error.message && !input.includes(error.message) && (input = `Error: ${error.message}

${input}`);
			let match = input.match(firstLineRegex);
			if (!match) return import_react$97.createElement(import_react$97.Fragment, null, input);
			let [, type, name] = match, [, ...lines] = input.split(/\n/).slice(1).map((line) => {
				let result = line.match(linesRegexChromium) || line.match(linesRegexFirefox) || line.match(linesRegexSafari);
				return result ? {
					name: (result[1] || "").replace("/<", ""),
					location: result[2].replace(document3.location.origin, "")
				} : null;
			}).filter(Boolean);
			return import_react$97.createElement(import_react$97.Fragment, null, import_react$97.createElement("span", null, type), ": ", import_react$97.createElement(ErrorName, null, name), import_react$97.createElement("br", null), lines.map((l, i) => l?.name ? import_react$97.createElement(import_react$97.Fragment, { key: i }, "  ", "at ", import_react$97.createElement(ErrorImportant, null, l.name), " (", import_react$97.createElement(ErrorDetail, null, l.location), ")", import_react$97.createElement("br", null)) : import_react$97.createElement(import_react$97.Fragment, { key: i }, "  ", "at ", import_react$97.createElement(ErrorDetail, null, l?.location), import_react$97.createElement("br", null))));
		};
		Input = styled.input(({ theme }) => ({
			appearance: "none",
			backgroundColor: theme.input.background,
			border: `1px solid ${theme.base === "dark" ? "hsl(0 0 100 / 0.4)" : "hsl(0 0 0 / 0.44)"}`,
			borderRadius: 2,
			display: "grid",
			flexShrink: 0,
			height: 14,
			margin: 0,
			placeContent: "center",
			transition: "background-color 0.1s",
			width: 14,
			"&:enabled": { cursor: "pointer" },
			"&:disabled": {
				backgroundColor: "transparent",
				borderColor: theme.input.border
			},
			"&:disabled:checked, &:disabled:indeterminate": { backgroundColor: theme.base === "dark" ? color.dark : theme.color.mediumdark },
			"&:checked, &:indeterminate": {
				border: "none",
				backgroundColor: color.secondary
			},
			"&:checked::before": {
				content: "\"\"",
				width: 14,
				height: 14,
				background: `no-repeat center url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14'%3E%3Cpath fill='none' stroke='%23fff' stroke-width='2' d='m3 7 2.5 2.5L11 4'/%3E%3C/svg%3E")`
			},
			"&:indeterminate::before": {
				content: "\"\"",
				width: 8,
				height: 2,
				background: "white"
			},
			"&:enabled:focus-visible": {
				outline: `2px solid ${theme.color.secondary}`,
				outlineOffset: 2
			}
		}));
		Checkbox = (props) => import_react$99.createElement(Input, {
			...props,
			type: "checkbox"
		});
		Wrapper = styled.label(({ theme }) => ({
			display: "flex",
			borderBottom: `1px solid ${theme.appBorderColor}`,
			margin: "0 15px",
			padding: "8px 0",
			"&:last-child": { marginBottom: "3rem" }
		}));
		Label = styled.span(({ theme }) => ({
			minWidth: 100,
			fontWeight: theme.typography.weight.bold,
			marginRight: 15,
			display: "flex",
			justifyContent: "flex-start",
			alignItems: "center",
			lineHeight: "16px"
		}));
		Field = ({ label, children, ...props }) => import_react$100.createElement(Wrapper, { ...props }, label ? import_react$100.createElement(Label, null, import_react$100.createElement("span", null, label)) : null, children);
		sizes = (({ size }) => {
			switch (size) {
				case "100%": return { width: "100%" };
				case "flex": return { flex: 1 };
				default: return { display: "inline" };
			}
		});
		alignment = (({ align }) => {
			switch (align) {
				case "end": return { textAlign: "right" };
				case "center": return { textAlign: "center" };
				default: return { textAlign: "left" };
			}
		});
		validation = (({ valid, theme }) => {
			switch (valid) {
				case "valid": return { boxShadow: `${theme.color.positive} 0 0 0 1px inset !important` };
				case "error": return { boxShadow: `${theme.color.negative} 0 0 0 1px inset !important` };
				case "warn": return { boxShadow: `${theme.color.warning} 0 0 0 1px inset` };
				default: return {};
			}
		});
		styleResets = {
			appearance: "none",
			border: "0 none",
			boxSizing: "inherit",
			display: "block",
			margin: " 0",
			background: "transparent",
			padding: 0,
			fontSize: "inherit",
			position: "relative"
		};
		styles = (({ theme }) => ({
			...styleResets,
			transition: "box-shadow 200ms ease-out, opacity 200ms ease-out",
			color: theme.input.color || "inherit",
			background: theme.input.background,
			boxShadow: `${theme.input.border} 0 0 0 1px inset`,
			borderRadius: theme.input.borderRadius,
			fontSize: theme.typography.size.s2 - 1,
			lineHeight: "20px",
			padding: "6px 10px",
			boxSizing: "border-box",
			height: 32,
			"&[type=\"file\"]": { height: "auto" },
			"&:focus": {
				boxShadow: `${theme.color.secondary} 0 0 0 1px inset`,
				outline: "none",
				"@media (forced-colors: active)": { outline: "1px solid highlight" }
			},
			"&[disabled], &[aria-disabled=\"true\"]": {
				background: theme.base === "light" ? theme.color.lighter : "transparent",
				cursor: "not-allowed"
			},
			"&:-webkit-autofill": { WebkitBoxShadow: `0 0 0 3em ${theme.color.lightest} inset` },
			"&::placeholder": {
				color: theme.textMutedColor,
				opacity: 1
			}
		}));
		Wrapper2 = styled.div({
			position: "relative",
			width: "100%"
		});
		Mask = styled.div(({ theme }) => ({
			position: "absolute",
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			display: "flex",
			alignItems: "center",
			pointerEvents: "none",
			overflow: "hidden",
			color: theme.textMutedColor,
			"span:first-of-type": { opacity: 0 }
		}), (props) => {
			let { fontSize, lineHeight, padding } = styles(props);
			return {
				fontSize,
				lineHeight,
				padding
			};
		});
		Input2 = Object.assign(styled((0, import_react$102.forwardRef)(function({ size, valid, align, value, suffix, ...props }, ref) {
			let suffixId = $bdb11010cef70236$export$f680877a34711e37();
			return import_react$101.createElement(Wrapper2, null, import_react$101.createElement("input", {
				...props,
				value,
				ref,
				"aria-describedby": suffix ? suffixId : void 0
			}), suffix && import_react$101.createElement(Mask, { "aria-hidden": !0 }, import_react$101.createElement("span", null, value), import_react$101.createElement("span", { id: suffixId }, suffix)));
		}))(styles, sizes, alignment, validation, {
			minHeight: 32,
			width: "100%"
		}), { displayName: "Input" });
		Input4 = styled.input(({ theme }) => ({
			appearance: "none",
			backgroundColor: theme.input.background,
			border: `1px solid ${theme.base === "dark" ? "hsl(0 0 100 / 0.4)" : "hsl(0 0 0 / 0.44)"}`,
			borderRadius: 8,
			display: "grid",
			flexShrink: 0,
			height: 16,
			margin: -1,
			placeContent: "center",
			transition: "background-color 0.1s",
			width: 16,
			"&:enabled": { cursor: "pointer" },
			"&:disabled": {
				backgroundColor: "transparent",
				borderColor: theme.input.border
			},
			"&:disabled:checked": {
				backgroundColor: theme.base === "dark" ? color.dark : theme.color.mediumdark,
				borderColor: theme.base === "dark" ? color.dark : theme.color.mediumdark
			},
			"&:checked": {
				backgroundColor: color.secondary,
				borderColor: color.secondary,
				boxShadow: `inset 0 0 0 2px ${theme.input.background}`
			},
			"&:enabled:focus-visible": {
				outline: `2px solid ${theme.color.secondary}`,
				outlineOffset: 2
			}
		}));
		Radio = (props) => import_react$103.createElement(Input4, {
			...props,
			type: "radio"
		});
		BaseSelect = styled.select(sizes, ({ theme }) => ({
			appearance: "none",
			background: `calc(100% - 12px) center no-repeat url("data:image/svg+xml,%3Csvg width='8' height='4' viewBox='0 0 8 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.30303 0.196815C1.13566 0.0294472 0.864304 0.0294472 0.696937 0.196815C0.529569 0.364182 0.529569 0.635539 0.696937 0.802906L3.69694 3.80291C3.8643 3.97027 4.13566 3.97027 4.30303 3.80291L7.30303 0.802906C7.4704 0.635539 7.4704 0.364182 7.30303 0.196815C7.13566 0.0294473 6.8643 0.0294473 6.69694 0.196815L3.99998 2.89377L1.30303 0.196815Z' fill='%2373828C'/%3E%3C/svg%3E%0A")`,
			backgroundSize: 10,
			padding: "6px 30px 6px 10px",
			"@supports (appearance: base-select)": {
				appearance: "base-select",
				background: theme.input.background,
				padding: "6px 10px"
			},
			transition: "box-shadow 200ms ease-out, opacity 200ms ease-out",
			color: theme.input.color || "inherit",
			boxShadow: `${theme.input.border} 0 0 0 1px inset`,
			borderRadius: theme.input.borderRadius,
			fontSize: theme.typography.size.s2 - 1,
			lineHeight: "20px",
			boxSizing: "border-box",
			border: "none",
			cursor: "pointer",
			"& > button": {
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				width: "100%",
				gap: 8,
				"& > svg": {
					width: 14,
					height: 14,
					color: theme.textMutedColor
				}
			},
			"&:has(option:not([hidden]):checked)": { color: theme.color.defaultText },
			"&:focus-visible, &:focus-within": {
				outline: "none",
				boxShadow: `${theme.color.secondary} 0 0 0 1px inset`
			},
			"&::picker-icon": { display: "none" },
			"&::picker(select)": {
				appearance: "base-select",
				border: `1px solid ${theme.input.border}`,
				padding: 4,
				marginTop: 4,
				background: theme.base === "light" ? lightenColor(theme.background.app) : theme.background.app,
				filter: `
      drop-shadow(0 5px 5px rgba(0,0,0,0.05))
      drop-shadow(0 0 3px rgba(0,0,0,0.1))
    `,
				borderRadius: theme.appBorderRadius + 2,
				fontSize: theme.typography.size.s1,
				cursor: "default",
				transition: "opacity 100ms ease-in-out, transform 100ms ease-in-out",
				transformOrigin: "top",
				transform: "translateY(0)",
				opacity: 1,
				"@starting-style": {
					transform: "translateY(-0.25rem) scale(0.95)",
					opacity: 0
				}
			},
			"& optgroup label": {
				display: "block",
				padding: "3px 6px"
			},
			"& option": {
				lineHeight: "18px",
				padding: "7px 10px",
				borderRadius: 4,
				outline: "none",
				cursor: "pointer",
				color: theme.color.defaultText,
				"&::checkmark": { display: "none" },
				"&:hover, &:focus-visible": { backgroundColor: theme.background.hoverable },
				"&:checked": {
					color: theme.color.secondary,
					fontWeight: theme.typography.weight.bold
				},
				"&:disabled": {
					backgroundColor: "transparent",
					cursor: "default",
					color: theme.color.defaultText
				}
			}
		}));
		Select = ({ children, ...props }) => import_react$104.createElement(BaseSelect, { ...props }, !isTestEnvironment() && import_react$104.createElement("button", null, import_react$104.createElement("selectedcontent", null), import_react$104.createElement("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true"
		}, import_react$104.createElement("path", { d: "m6 9 6 6 6-6" }))), import_react$104.createElement("optgroup", null, children));
		index = import_react$108.useLayoutEffect;
		useLatest = function(value) {
			var ref = import_react$107.useRef(value);
			return index(function() {
				ref.current = value;
			}), ref;
		};
		updateRef = function(ref, value) {
			if (typeof ref == "function") {
				ref(value);
				return;
			}
			ref.current = value;
		};
		useComposedRef = function(libRef, userRef) {
			var prevUserRef = import_react$109.useRef();
			return import_react$109.useCallback(function(instance) {
				libRef.current = instance, prevUserRef.current && updateRef(prevUserRef.current, null), prevUserRef.current = userRef, userRef && updateRef(userRef, instance);
			}, [userRef]);
		};
		HIDDEN_TEXTAREA_STYLE = {
			"min-height": "0",
			"max-height": "none",
			height: "0",
			visibility: "hidden",
			overflow: "hidden",
			position: "absolute",
			"z-index": "-1000",
			top: "0",
			right: "0",
			display: "block"
		};
		forceHiddenStyles = function(node) {
			Object.keys(HIDDEN_TEXTAREA_STYLE).forEach(function(key) {
				node.style.setProperty(key, HIDDEN_TEXTAREA_STYLE[key], "important");
			});
		};
		forceHiddenStyles$1 = forceHiddenStyles;
		hiddenTextarea = null;
		getHeight = function(node, sizingData) {
			var height = node.scrollHeight;
			return sizingData.sizingStyle.boxSizing === "border-box" ? height + sizingData.borderSize : height - sizingData.paddingSize;
		};
		noop = function() {};
		pick = function(props, obj) {
			return props.reduce(function(acc, prop) {
				return acc[prop] = obj[prop], acc;
			}, {});
		};
		SIZING_STYLE = [
			"borderBottomWidth",
			"borderLeftWidth",
			"borderRightWidth",
			"borderTopWidth",
			"boxSizing",
			"fontFamily",
			"fontSize",
			"fontStyle",
			"fontWeight",
			"letterSpacing",
			"lineHeight",
			"paddingBottom",
			"paddingLeft",
			"paddingRight",
			"paddingTop",
			"tabSize",
			"textIndent",
			"textRendering",
			"textTransform",
			"width",
			"wordBreak",
			"wordSpacing",
			"scrollbarGutter"
		];
		isIE = !!document.documentElement.currentStyle;
		getSizingData = function(node) {
			var style = window.getComputedStyle(node);
			if (style === null) return null;
			var sizingStyle = pick(SIZING_STYLE, style), boxSizing = sizingStyle.boxSizing;
			if (boxSizing === "") return null;
			isIE && boxSizing === "border-box" && (sizingStyle.width = parseFloat(sizingStyle.width) + parseFloat(sizingStyle.borderRightWidth) + parseFloat(sizingStyle.borderLeftWidth) + parseFloat(sizingStyle.paddingRight) + parseFloat(sizingStyle.paddingLeft) + "px");
			return {
				sizingStyle,
				paddingSize: parseFloat(sizingStyle.paddingBottom) + parseFloat(sizingStyle.paddingTop),
				borderSize: parseFloat(sizingStyle.borderBottomWidth) + parseFloat(sizingStyle.borderTopWidth)
			};
		};
		getSizingData$1 = getSizingData;
		useFormResetListener = function(libRef, listener) {
			useListener(document.body, "reset", function(ev) {
				libRef.current.form === ev.target && listener(ev);
			});
		};
		useWindowResizeListener = function(listener) {
			useListener(window, "resize", listener);
		};
		useFontsLoadedListener = function(listener) {
			useListener(document.fonts, "loadingdone", listener);
		};
		_excluded = [
			"cacheMeasurements",
			"maxRows",
			"minRows",
			"onChange",
			"onHeightChange"
		];
		TextareaAutosize = function(_ref, userRef) {
			var cacheMeasurements = _ref.cacheMeasurements, maxRows = _ref.maxRows, minRows = _ref.minRows, _ref$onChange = _ref.onChange, onChange = _ref$onChange === void 0 ? noop : _ref$onChange, _ref$onHeightChange = _ref.onHeightChange, onHeightChange = _ref$onHeightChange === void 0 ? noop : _ref$onHeightChange, props = _objectWithoutPropertiesLoose$1(_ref, _excluded), isControlled = props.value !== void 0, libRef = import_react$106.useRef(null), ref = useComposedRef(libRef, userRef), heightRef = import_react$106.useRef(0), measurementsCacheRef = import_react$106.useRef(), resizeTextarea = function() {
				var node = libRef.current, nodeSizingData = cacheMeasurements && measurementsCacheRef.current ? measurementsCacheRef.current : getSizingData$1(node);
				if (nodeSizingData) {
					measurementsCacheRef.current = nodeSizingData;
					var _calculateNodeHeight = calculateNodeHeight(nodeSizingData, node.value || node.placeholder || "x", minRows, maxRows), height = _calculateNodeHeight[0], rowHeight = _calculateNodeHeight[1];
					heightRef.current !== height && (heightRef.current = height, node.style.setProperty("height", height + "px", "important"), onHeightChange(height, { rowHeight }));
				}
			}, handleChange = function(event) {
				isControlled || resizeTextarea(), onChange(event);
			};
			return import_react$106.useLayoutEffect(resizeTextarea), useFormResetListener(libRef, function() {
				if (!isControlled) {
					var currentValue = libRef.current.value;
					requestAnimationFrame(function() {
						var node = libRef.current;
						node && currentValue !== node.value && resizeTextarea();
					});
				}
			}), useWindowResizeListener(resizeTextarea), useFontsLoadedListener(resizeTextarea), import_react$106.createElement("textarea", _extends$1({}, props, {
				onChange: handleChange,
				ref
			}));
		};
		index2 = import_react$106.forwardRef(TextareaAutosize);
		Textarea = Object.assign(styled((0, import_react$105.forwardRef)(function({ size, valid, align, ...props }, ref) {
			return import_react$105.createElement(index2, {
				...props,
				ref
			});
		}))(styles, sizes, alignment, validation, ({ height = 400 }) => ({
			overflow: "visible",
			maxHeight: height
		})), { displayName: "Textarea" });
		Form = Object.assign(styled.form({
			boxSizing: "border-box",
			width: "100%"
		}), {
			Field,
			Input: Input2,
			Select,
			Textarea,
			Button,
			Checkbox,
			Radio
		});
		Wrapper3 = styled.div(({ hasCloseButton, padding }) => ({
			display: "inline-block",
			position: "relative",
			minHeight: hasCloseButton ? 36 : void 0,
			zIndex: 2147483647,
			colorScheme: "light dark",
			padding
		}), ({ theme, hasChrome }) => hasChrome ? {
			filter: `
            drop-shadow(0px 5px 5px rgba(0,0,0,0.05))
            drop-shadow(0 1px 3px rgba(0,0,0,0.1))
          `,
			borderRadius: theme.appBorderRadius + 2,
			fontFamily: theme.typography.fonts.base,
			fontSize: theme.typography.size.s1
		} : {}, ({ theme, bgColor }) => bgColor === "default" && {
			background: theme.base === "light" ? lightenColor(theme.background.app) : theme.background.app,
			color: theme.color.defaultText
		}, ({ theme, bgColor }) => bgColor === "inverse" && {
			background: theme.base === "light" ? theme.color.darkest : theme.color.lightest,
			color: theme.color.inverseText
		}, ({ theme, bgColor }) => (bgColor === "positive" || bgColor === "negative" || bgColor === "warning") && {
			background: theme.background[bgColor],
			color: theme.color[`${bgColor}Text`]
		});
		AbsoluteButton = styled(Button)({
			position: "absolute",
			top: 4,
			right: 4
		});
		Popover = (0, import_react$110.forwardRef)(({ children, color: color4 = "default", hasChrome = !0, hideLabel = "Close", onHide, padding = 8, ...props }, ref) => import_react$110.createElement(Wrapper3, {
			bgColor: color4,
			hasChrome,
			hasCloseButton: !!onHide,
			padding,
			ref,
			...props
		}, children, onHide && import_react$110.createElement(AbsoluteButton, {
			ariaLabel: hideLabel,
			onClick: onHide,
			padding: "small",
			variant: "ghost",
			size: "small"
		}, import_react$110.createElement(CloseIcon, null))));
		Popover.displayName = "Popover";
		SelectOption = ({ id, title, description, icon, aside, children, isSelected, isActive, onClick, onFocus, onKeyDown, shouldLookDisabled = !1, ...props }) => import_react$111.createElement(ActionList.Item, {
			...props,
			id,
			role: "option",
			tabIndex: isActive ? 0 : -1,
			"aria-selected": isSelected,
			"aria-disabled": shouldLookDisabled ? !0 : void 0,
			onClick,
			onFocus,
			onKeyDown
		}, children ?? import_react$111.createElement(import_react$111.Fragment, null, icon && import_react$111.createElement(ActionList.Icon, null, icon), import_react$111.createElement(ActionList.Text, null, import_react$111.createElement("p", null, title), description && import_react$111.createElement("small", null, description)), aside));
		SelectOption.displayName = "SelectOption";
		PAGE_STEP_SIZE = 5;
		UNDEFINED_VALUE = /* @__PURE__ */ Symbol.for("undefined");
		Listbox = styled("ul")({
			minWidth: 180,
			height: "100%",
			borderRadius: 6,
			overflow: "hidden auto",
			listStyle: "none",
			margin: 0,
			padding: 4
		});
		SelectedOptionCount = styled.span(({ theme }) => ({
			appearance: "none",
			color: theme.textMutedColor,
			fontSize: 12
		}));
		StyledButton3 = styled(Button)(({ $isOpen: isOpen, $hasSelection: hasSelection, theme }) => isOpen || hasSelection ? {
			boxShadow: "none",
			background: curriedTransparentize$1(.93, theme.barSelectedColor),
			color: theme.base === "light" ? curriedDarken$1(.1, theme.color.secondary) : theme.color.secondary
		} : {});
		Underlay = styled.div({
			position: "fixed",
			inset: 0,
			zIndex: 1e3
		});
		MinimalistPopover = ({ children, handleClose, triggerRef }) => {
			let popoverRef = import_react$98.useRef(null);
			$e0b6e0b68ec7f50f$export$872b660ac5a1ff98({
				ref: popoverRef,
				onInteractOutside: handleClose
			}), (0, import_react$98.useEffect)(() => {
				if (popoverRef.current) return $5e3802645cc19319$export$1c3ebcada18427bf([popoverRef.current], { shouldUseInert: !0 });
			}, []);
			let { overlayProps: positionProps } = $2a41e45df1593e64$export$d39e1813b3bdd0e1({
				targetRef: triggerRef,
				overlayRef: popoverRef,
				placement: "bottom start",
				offset: 8,
				maxHeight: 504,
				isOpen: !0
			}), { overlayProps, underlayProps } = $a11501f3d1d39e6c$export$ea8f71083e90600f({
				isOpen: !0,
				onClose: handleClose,
				isDismissable: !0,
				shouldCloseOnBlur: !1,
				isKeyboardDismissDisabled: !0
			}, popoverRef), theme = useTheme();
			return positionProps.style = {
				...positionProps.style,
				overflow: "hidden auto",
				scrollbarColor: `${theme.barTextColor} transparent`,
				scrollbarWidth: "thin"
			}, import_react$98.createElement($337b884510726a0d$export$c6fdb837b070b4ff, {
				disableFocusManagement: !0,
				...overlayProps
			}, import_react$98.createElement(Underlay, { ...underlayProps }), import_react$98.createElement(Popover, {
				hasChrome: !0,
				ref: popoverRef,
				padding: 0,
				...positionProps
			}, children));
		};
		Select2 = (0, import_react$98.forwardRef)(({ children, icon, disabled = !1, options: calleeOptions, defaultOptions, multiSelect = !1, onReset, padding = "small", resetLabel, onSelect, onDeselect, onChange, tooltip, ariaLabel, showSelectedOptionTitle = !0, ...props }, ref) => {
			let [isOpen, setIsOpen] = (0, import_react$98.useState)(props.defaultOpen || !1), [shouldRefocusTrigger, setShouldRefocusTrigger] = (0, import_react$98.useState)(!1), triggerRef = $df56164dff5785e2$export$4338b53315abf666(ref), id = (0, import_react$98.useMemo)(() => "select-" + Math.random().toString(36).substring(2, 15), []), listboxId = `${id}-listbox`, listboxRef = (0, import_react$98.useRef)(null), otState = $fc909762b330b746$export$61c6a8c84e605fb6({
				isOpen: isOpen && !disabled,
				onOpenChange: setIsOpen
			}), handleClose = (0, import_react$98.useCallback)(() => {
				setIsOpen(!1), setShouldRefocusTrigger(!0);
			}, []);
			(0, import_react$98.useEffect)(() => {
				!otState.isOpen && shouldRefocusTrigger && (triggerRef.current?.ownerDocument?.defaultView && triggerRef.current.focus(), setShouldRefocusTrigger(!1));
			}, [
				otState.isOpen,
				shouldRefocusTrigger,
				triggerRef
			]);
			let [selectedOptions, setSelectedOptions] = (0, import_react$98.useState)(setSelectedFromDefault(calleeOptions, defaultOptions)), handleSelectOption = (0, import_react$98.useCallback)((option) => {
				option.type === "reset" ? (onChange?.([]), onReset?.(), setSelectedOptions([])) : setSelectedOptions(multiSelect ? (previous) => {
					let newSelected = [];
					return previous?.some((opt) => opt.value === option.value) ? (onDeselect?.(valueToExternal(option.value)), newSelected = previous?.filter((opt) => opt.value !== option.value) ?? []) : (onSelect?.(valueToExternal(option.value)), newSelected = [...previous ?? [], option]), onChange?.(newSelected.map((opt) => valueToExternal(opt.value))), newSelected;
				} : (current) => current.every((opt) => opt.value !== option.value) ? (onSelect?.(valueToExternal(option.value)), onChange?.([valueToExternal(option.value)]), [option]) : current);
			}, [
				multiSelect,
				onChange,
				onSelect,
				onDeselect,
				onReset
			]), resetOption = (0, import_react$98.useMemo)(() => onReset ? {
				type: "reset",
				value: void 0,
				title: resetLabel ?? "Reset selection",
				icon: import_react$98.createElement(RefreshIcon, null),
				description: void 0,
				children: void 0
			} : void 0, [onReset, resetLabel]), options = (0, import_react$98.useMemo)(() => resetOption ? [resetOption, ...calleeOptions] : calleeOptions, [calleeOptions, resetOption]);
			(0, import_react$98.useEffect)(() => {
				defaultOptions && setSelectedOptions(setSelectedFromDefault(calleeOptions, defaultOptions));
			}, [defaultOptions, calleeOptions]);
			let [activeOption, setActiveOptionState] = (0, import_react$98.useState)(void 0), setActiveOption = (0, import_react$98.useCallback)((option, changeSelection = !0) => {
				setActiveOptionState(optionOrResetToInternal(option)), !multiSelect && changeSelection && handleSelectOption(optionOrResetToInternal(option));
			}, [multiSelect, handleSelectOption]), moveActiveOptionDown = (0, import_react$98.useCallback)((step = 1) => {
				if (!isOpen || !activeOption) {
					setActiveOption(options[step === 1 ? 0 : Math.min(step, options.length - 1)]);
					return;
				}
				let currentIndex = options.findIndex((option) => activeOption.type === "reset" ? "type" in option && option.type === "reset" : externalToValue(option.value) === activeOption.value), nextIndex = currentIndex + step, newActiveOption;
				nextIndex >= options.length && currentIndex === options.length - 1 ? newActiveOption = options[0] : newActiveOption = options[Math.min(options.length - 1, nextIndex)], setActiveOption(newActiveOption);
			}, [
				isOpen,
				activeOption,
				setActiveOption,
				options
			]), moveActiveOptionUp = (0, import_react$98.useCallback)((step = 1) => {
				if (!isOpen || !activeOption) {
					setActiveOption(options[Math.max(0, options.length - step)]);
					return;
				}
				let currentIndex = options.findIndex((option) => activeOption.type === "reset" ? "type" in option && option.type === "reset" : externalToValue(option.value) === activeOption.value), nextIndex = currentIndex - step, newActiveOption;
				nextIndex < 0 && currentIndex === 0 ? newActiveOption = options[options.length - 1] : newActiveOption = options[Math.max(0, nextIndex)], setActiveOption(newActiveOption);
			}, [
				isOpen,
				activeOption,
				setActiveOption,
				options
			]), handleButtonKeyDown = (0, import_react$98.useCallback)((e) => {
				let openAt = (index3) => {
					e.preventDefault(), setActiveOption(options[index3]), setIsOpen(!0);
				}, indexOfFirstSelected = options.findIndex((option) => selectedOptions.some((sel) => sel.value === externalToValue(option.value))), hasSelection = indexOfFirstSelected !== -1, listStart = resetOption && !hasSelection ? 1 : 0, listEnd = options.length - 1;
				e.key === "Enter" || e.key === " " ? openAt(hasSelection ? Math.min(indexOfFirstSelected, listEnd) : listStart) : e.key === "ArrowDown" ? openAt(hasSelection ? Math.min(indexOfFirstSelected + 1, listEnd) : listStart) : e.key === "ArrowUp" ? openAt(hasSelection ? Math.max(indexOfFirstSelected - 1, listStart) : listEnd) : e.key === "Home" ? openAt(listStart) : e.key === "End" ? openAt(listEnd) : e.key === "PageDown" ? openAt(Math.min((hasSelection ? indexOfFirstSelected : listStart) + PAGE_STEP_SIZE, listEnd)) : e.key === "PageUp" && openAt(Math.max(0, (hasSelection ? indexOfFirstSelected : listEnd) - PAGE_STEP_SIZE));
			}, [
				options,
				resetOption,
				setActiveOption,
				selectedOptions
			]), handleListboxKeyDown = (0, import_react$98.useCallback)((e) => {
				e.key !== "Tab" ? e.preventDefault() : handleClose(), e.key === "Escape" ? handleClose() : e.key === "ArrowDown" ? moveActiveOptionDown() : e.key === "ArrowUp" ? moveActiveOptionUp() : e.key === "Home" ? setActiveOption(options[0]) : e.key === "End" ? setActiveOption(options[options.length - 1]) : e.key === "PageDown" ? moveActiveOptionDown(PAGE_STEP_SIZE) : e.key === "PageUp" && moveActiveOptionUp(PAGE_STEP_SIZE);
			}, [
				handleClose,
				moveActiveOptionDown,
				moveActiveOptionUp,
				options,
				setActiveOption
			]);
			(0, import_react$98.useEffect)(() => {
				if (isOpen && activeOption) {
					let optionElement = document.getElementById(valueToId(id, activeOption));
					optionElement && (optionElement.scrollIntoView({ block: "nearest" }), optionElement.focus());
				} else isOpen && listboxRef.current?.focus();
			}, [
				isOpen,
				activeOption,
				id
			]);
			let finalAriaLabel = (0, import_react$98.useMemo)(() => selectedOptions.length === 1 ? `${ariaLabel} ${selectedOptions[0].title}` : selectedOptions.length ? `${ariaLabel}, ${selectedOptions.length} values selected` : ariaLabel, [ariaLabel, selectedOptions]);
			return import_react$98.createElement(import_react$98.Fragment, null, import_react$98.createElement(StyledButton3, {
				...props,
				variant: "ghost",
				ariaLabel: finalAriaLabel,
				tooltip: tooltip ?? ariaLabel,
				disableAllTooltips: isOpen,
				id,
				ref: triggerRef,
				padding,
				$isOpen: isOpen,
				$hasSelection: !!selectedOptions.length,
				"aria-disabled": disabled,
				disabled,
				onClick: () => {
					isOpen ? handleClose() : setIsOpen(!0);
				},
				tabIndex: isOpen ? -1 : 0,
				onKeyDown: handleButtonKeyDown,
				role: "button",
				"aria-controls": isOpen ? listboxId : void 0,
				"aria-expanded": isOpen,
				"aria-haspopup": "listbox"
			}, !multiSelect && import_react$98.createElement(import_react$98.Fragment, null, icon, showSelectedOptionTitle && selectedOptions[0]?.title || children), multiSelect && import_react$98.createElement(import_react$98.Fragment, null, icon, children, !!selectedOptions.length && import_react$98.createElement(SelectedOptionCount, { "aria-label": `${selectedOptions.length} ${selectedOptions.length > 1 ? "items" : "item"} selected` }, selectedOptions?.length))), otState.isOpen && import_react$98.createElement(MinimalistPopover, {
				handleClose,
				triggerRef
			}, import_react$98.createElement(Listbox, {
				"aria-label": ariaLabel,
				role: "listbox",
				id: listboxId,
				ref: listboxRef,
				"aria-multiselectable": multiSelect,
				onKeyDown: handleListboxKeyDown,
				tabIndex: isOpen ? 0 : -1
			}, options.map((opt) => ({
				option: optionOrResetToInternal(opt),
				externalOption: opt
			})).map(({ externalOption, option }) => {
				let isSelected = selectedOptions?.some((sel) => sel.value === option.value) && option !== resetOption, isReset = option === resetOption;
				return import_react$98.createElement(SelectOption, {
					key: option.value === void 0 ? "sb-reset" : String(option.value),
					title: option.title,
					description: option.description,
					aside: option.aside,
					icon: !isReset && multiSelect ? import_react$98.createElement(Form.Checkbox, {
						checked: isSelected,
						hidden: !0,
						role: "presentation"
					}) : option.icon,
					id: valueToId(id, option),
					isActive: isOpen && activeOption?.value === option.value,
					isSelected,
					onClick: () => {
						handleSelectOption(option), multiSelect || handleClose();
					},
					onFocus: () => setActiveOption(externalOption, !1),
					shouldLookDisabled: isReset && selectedOptions.length === 0 && multiSelect,
					onKeyDown: (e) => {
						e.key === "Enter" || e.key === " " ? (e.preventDefault(), handleSelectOption(option), multiSelect || handleClose()) : e.key === "Tab" && (multiSelect || handleSelectOption(option), handleClose());
					}
				}, option.children);
			}))));
		});
		Select2.displayName = "Select";
		({deprecate: deprecate6} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		$23b9f4fcf0fe224b$export$d68d59712b04d9d1 = class {
			get childNodes() {
				throw new Error("childNodes is not supported");
			}
			clone() {
				let node = new this.constructor(this.key);
				return node.value = this.value, node.level = this.level, node.hasChildNodes = this.hasChildNodes, node.rendered = this.rendered, node.textValue = this.textValue, node["aria-label"] = this["aria-label"], node.index = this.index, node.parentKey = this.parentKey, node.prevKey = this.prevKey, node.nextKey = this.nextKey, node.firstChildKey = this.firstChildKey, node.lastChildKey = this.lastChildKey, node.props = this.props, node.render = this.render, node.colSpan = this.colSpan, node.colIndex = this.colIndex, node;
			}
			filter(collection, newCollection, filterFn) {
				let clone = this.clone();
				return newCollection.addDescendants(clone, collection), clone;
			}
			constructor(key) {
				this.value = null, this.level = 0, this.hasChildNodes = !1, this.rendered = null, this.textValue = "", this["aria-label"] = void 0, this.index = 0, this.parentKey = null, this.prevKey = null, this.nextKey = null, this.firstChildKey = null, this.lastChildKey = null, this.props = {}, this.colSpan = null, this.colIndex = null, this.type = this.constructor.type, this.key = key;
			}
		};
		$23b9f4fcf0fe224b$export$b1918e978f1ee46f = class extends $23b9f4fcf0fe224b$export$d68d59712b04d9d1 {
			filter(collection, newCollection, filterFn) {
				let [firstKey, lastKey] = $23b9f4fcf0fe224b$var$filterChildren(collection, newCollection, this.firstChildKey, filterFn), newNode = this.clone();
				return newNode.firstChildKey = firstKey, newNode.lastChildKey = lastKey, newNode;
			}
		};
		$23b9f4fcf0fe224b$export$5ae2504e948afce5 = class extends $23b9f4fcf0fe224b$export$d68d59712b04d9d1 {};
		$23b9f4fcf0fe224b$export$5ae2504e948afce5.type = "header";
		$23b9f4fcf0fe224b$export$8258a0665a675899 = class extends $23b9f4fcf0fe224b$export$d68d59712b04d9d1 {};
		$23b9f4fcf0fe224b$export$8258a0665a675899.type = "loader";
		$23b9f4fcf0fe224b$export$fd11f34e1d07f134 = class extends $23b9f4fcf0fe224b$export$b1918e978f1ee46f {
			filter(collection, newCollection, filterFn) {
				if (filterFn(this.textValue, this)) {
					let clone = this.clone();
					return newCollection.addDescendants(clone, collection), clone;
				}
				return null;
			}
		};
		$23b9f4fcf0fe224b$export$fd11f34e1d07f134.type = "item";
		$23b9f4fcf0fe224b$export$437f11dc9b403b78 = class extends $23b9f4fcf0fe224b$export$b1918e978f1ee46f {
			filter(collection, newCollection, filterFn) {
				let filteredSection = super.filter(collection, newCollection, filterFn);
				if (filteredSection && filteredSection.lastChildKey !== null) {
					let lastChild = collection.getItem(filteredSection.lastChildKey);
					if (lastChild && lastChild.type !== "header") return filteredSection;
				}
				return null;
			}
		};
		$23b9f4fcf0fe224b$export$437f11dc9b403b78.type = "section";
		$23b9f4fcf0fe224b$export$408d25a4e12db025 = class {
			get size() {
				return this.itemCount;
			}
			getKeys() {
				return this.keyMap.keys();
			}
			*[Symbol.iterator]() {
				let node = this.firstKey != null ? this.keyMap.get(this.firstKey) : void 0;
				for (; node;) yield node, node = node.nextKey != null ? this.keyMap.get(node.nextKey) : void 0;
			}
			getChildren(key) {
				let keyMap = this.keyMap;
				return { *[Symbol.iterator]() {
					let parent = keyMap.get(key), node = parent?.firstChildKey != null ? keyMap.get(parent.firstChildKey) : null;
					for (; node;) yield node, node = node.nextKey != null ? keyMap.get(node.nextKey) : void 0;
				} };
			}
			getKeyBefore(key) {
				let node = this.keyMap.get(key);
				if (!node) return null;
				if (node.prevKey != null) {
					for (node = this.keyMap.get(node.prevKey); node && node.type !== "item" && node.lastChildKey != null;) node = this.keyMap.get(node.lastChildKey);
					var _node_key;
					return (_node_key = node?.key) !== null && _node_key !== void 0 ? _node_key : null;
				}
				return node.parentKey;
			}
			getKeyAfter(key) {
				let node = this.keyMap.get(key);
				if (!node) return null;
				if (node.type !== "item" && node.firstChildKey != null) return node.firstChildKey;
				for (; node;) {
					if (node.nextKey != null) return node.nextKey;
					if (node.parentKey != null) node = this.keyMap.get(node.parentKey);
					else return null;
				}
				return null;
			}
			getFirstKey() {
				return this.firstKey;
			}
			getLastKey() {
				let node = this.lastKey != null ? this.keyMap.get(this.lastKey) : null;
				for (; node?.lastChildKey != null;) node = this.keyMap.get(node.lastChildKey);
				var _node_key;
				return (_node_key = node?.key) !== null && _node_key !== void 0 ? _node_key : null;
			}
			getItem(key) {
				var _this_keyMap_get;
				return (_this_keyMap_get = this.keyMap.get(key)) !== null && _this_keyMap_get !== void 0 ? _this_keyMap_get : null;
			}
			at() {
				throw new Error("Not implemented");
			}
			clone() {
				let Constructor = this.constructor, collection = new Constructor();
				return collection.keyMap = new Map(this.keyMap), collection.firstKey = this.firstKey, collection.lastKey = this.lastKey, collection.itemCount = this.itemCount, collection;
			}
			addNode(node) {
				if (this.frozen) throw new Error("Cannot add a node to a frozen collection");
				node.type === "item" && this.keyMap.get(node.key) == null && this.itemCount++, this.keyMap.set(node.key, node);
			}
			addDescendants(node, oldCollection) {
				this.addNode(node);
				let children = oldCollection.getChildren(node.key);
				for (let child of children) this.addDescendants(child, oldCollection);
			}
			removeNode(key) {
				if (this.frozen) throw new Error("Cannot remove a node to a frozen collection");
				let node = this.keyMap.get(key);
				node != null && node.type === "item" && this.itemCount--, this.keyMap.delete(key);
			}
			commit(firstKey, lastKey, isSSR = !1) {
				if (this.frozen) throw new Error("Cannot commit a frozen collection");
				this.firstKey = firstKey, this.lastKey = lastKey, this.frozen = !isSSR;
			}
			filter(filterFn) {
				let newCollection = new this.constructor(), [firstKey, lastKey] = $23b9f4fcf0fe224b$var$filterChildren(this, newCollection, this.firstKey, filterFn);
				return newCollection?.commit(firstKey, lastKey), newCollection;
			}
			constructor() {
				this.keyMap = /* @__PURE__ */ new Map(), this.firstKey = null, this.lastKey = null, this.frozen = !1, this.itemCount = 0;
			}
		};
		$681cc3c98f569e39$export$410b0c854570d131 = class {
			*[Symbol.iterator]() {
				let node = this.firstChild;
				for (; node;) yield node, node = node.nextSibling;
			}
			get firstChild() {
				return this._firstChild;
			}
			set firstChild(firstChild) {
				this._firstChild = firstChild, this.ownerDocument.markDirty(this);
			}
			get lastChild() {
				return this._lastChild;
			}
			set lastChild(lastChild) {
				this._lastChild = lastChild, this.ownerDocument.markDirty(this);
			}
			get previousSibling() {
				return this._previousSibling;
			}
			set previousSibling(previousSibling) {
				this._previousSibling = previousSibling, this.ownerDocument.markDirty(this);
			}
			get nextSibling() {
				return this._nextSibling;
			}
			set nextSibling(nextSibling) {
				this._nextSibling = nextSibling, this.ownerDocument.markDirty(this);
			}
			get parentNode() {
				return this._parentNode;
			}
			set parentNode(parentNode) {
				this._parentNode = parentNode, this.ownerDocument.markDirty(this);
			}
			get isConnected() {
				var _this_parentNode;
				return ((_this_parentNode = this.parentNode) === null || _this_parentNode === void 0 ? void 0 : _this_parentNode.isConnected) || !1;
			}
			invalidateChildIndices(child) {
				(this._minInvalidChildIndex == null || !this._minInvalidChildIndex.isConnected || child.index < this._minInvalidChildIndex.index) && (this._minInvalidChildIndex = child, this.ownerDocument.markDirty(this));
			}
			updateChildIndices() {
				let node = this._minInvalidChildIndex;
				for (; node;) node.index = node.previousSibling ? node.previousSibling.index + 1 : 0, node = node.nextSibling;
				this._minInvalidChildIndex = null;
			}
			appendChild(child) {
				child.parentNode && child.parentNode.removeChild(child), this.firstChild ??= child, this.lastChild ? (this.lastChild.nextSibling = child, child.index = this.lastChild.index + 1, child.previousSibling = this.lastChild) : (child.previousSibling = null, child.index = 0), child.parentNode = this, child.nextSibling = null, this.lastChild = child, this.ownerDocument.markDirty(this), this.isConnected && this.ownerDocument.queueUpdate();
			}
			insertBefore(newNode, referenceNode) {
				if (referenceNode == null) return this.appendChild(newNode);
				newNode.parentNode && newNode.parentNode.removeChild(newNode), newNode.nextSibling = referenceNode, newNode.previousSibling = referenceNode.previousSibling, newNode.index = referenceNode.index - 1, this.firstChild === referenceNode ? this.firstChild = newNode : referenceNode.previousSibling && (referenceNode.previousSibling.nextSibling = newNode), referenceNode.previousSibling = newNode, newNode.parentNode = referenceNode.parentNode, this.invalidateChildIndices(newNode), this.isConnected && this.ownerDocument.queueUpdate();
			}
			removeChild(child) {
				child.parentNode !== this || !this.ownerDocument.isMounted || (this._minInvalidChildIndex === child && (this._minInvalidChildIndex = null), child.nextSibling && (this.invalidateChildIndices(child.nextSibling), child.nextSibling.previousSibling = child.previousSibling), child.previousSibling && (child.previousSibling.nextSibling = child.nextSibling), this.firstChild === child && (this.firstChild = child.nextSibling), this.lastChild === child && (this.lastChild = child.previousSibling), child.parentNode = null, child.nextSibling = null, child.previousSibling = null, child.index = 0, this.ownerDocument.markDirty(child), this.isConnected && this.ownerDocument.queueUpdate());
			}
			addEventListener() {}
			removeEventListener() {}
			get previousVisibleSibling() {
				let node = this.previousSibling;
				for (; node && node.isHidden;) node = node.previousSibling;
				return node;
			}
			get nextVisibleSibling() {
				let node = this.nextSibling;
				for (; node && node.isHidden;) node = node.nextSibling;
				return node;
			}
			get firstVisibleChild() {
				let node = this.firstChild;
				for (; node && node.isHidden;) node = node.nextSibling;
				return node;
			}
			get lastVisibleChild() {
				let node = this.lastChild;
				for (; node && node.isHidden;) node = node.previousSibling;
				return node;
			}
			constructor(ownerDocument) {
				this._firstChild = null, this._lastChild = null, this._previousSibling = null, this._nextSibling = null, this._parentNode = null, this._minInvalidChildIndex = null, this.ownerDocument = ownerDocument;
			}
		};
		$681cc3c98f569e39$export$dc064fe9e59310fd = class _$681cc3c98f569e39$export$dc064fe9e59310fd extends $681cc3c98f569e39$export$410b0c854570d131 {
			get index() {
				return this._index;
			}
			set index(index3) {
				this._index = index3, this.ownerDocument.markDirty(this);
			}
			get level() {
				var _this_node;
				return this.parentNode instanceof _$681cc3c98f569e39$export$dc064fe9e59310fd ? this.parentNode.level + (((_this_node = this.node) === null || _this_node === void 0 ? void 0 : _this_node.type) === "item" ? 1 : 0) : 0;
			}
			/**
			* Lazily gets a mutable instance of a Node. If the node has already
			* been cloned during this update cycle, it just returns the existing one.
			*/
			getMutableNode() {
				return this.node == null ? null : (this.isMutated || (this.node = this.node.clone(), this.isMutated = !0), this.ownerDocument.markDirty(this), this.node);
			}
			updateNode() {
				var _this_parentNode_node, _this_previousVisibleSibling_node, _this_previousVisibleSibling, _nextSibling_node, _this_firstVisibleChild_node, _this_firstVisibleChild, _this_lastVisibleChild_node, _this_lastVisibleChild;
				let nextSibling = this.nextVisibleSibling, node = this.getMutableNode();
				if (node != null) {
					node.index = this.index, node.level = this.level;
					var _this_parentNode_node_key;
					node.parentKey = this.parentNode instanceof _$681cc3c98f569e39$export$dc064fe9e59310fd && (_this_parentNode_node_key = (_this_parentNode_node = this.parentNode.node) === null || _this_parentNode_node === void 0 ? void 0 : _this_parentNode_node.key) !== null && _this_parentNode_node_key !== void 0 ? _this_parentNode_node_key : null;
					var _this_previousVisibleSibling_node_key;
					node.prevKey = (_this_previousVisibleSibling_node_key = (_this_previousVisibleSibling = this.previousVisibleSibling) === null || _this_previousVisibleSibling === void 0 || (_this_previousVisibleSibling_node = _this_previousVisibleSibling.node) === null || _this_previousVisibleSibling_node === void 0 ? void 0 : _this_previousVisibleSibling_node.key) !== null && _this_previousVisibleSibling_node_key !== void 0 ? _this_previousVisibleSibling_node_key : null;
					var _nextSibling_node_key;
					node.nextKey = (_nextSibling_node_key = nextSibling == null || (_nextSibling_node = nextSibling.node) === null || _nextSibling_node === void 0 ? void 0 : _nextSibling_node.key) !== null && _nextSibling_node_key !== void 0 ? _nextSibling_node_key : null, node.hasChildNodes = !!this.firstChild;
					var _this_firstVisibleChild_node_key;
					node.firstChildKey = (_this_firstVisibleChild_node_key = (_this_firstVisibleChild = this.firstVisibleChild) === null || _this_firstVisibleChild === void 0 || (_this_firstVisibleChild_node = _this_firstVisibleChild.node) === null || _this_firstVisibleChild_node === void 0 ? void 0 : _this_firstVisibleChild_node.key) !== null && _this_firstVisibleChild_node_key !== void 0 ? _this_firstVisibleChild_node_key : null;
					var _this_lastVisibleChild_node_key;
					if (node.lastChildKey = (_this_lastVisibleChild_node_key = (_this_lastVisibleChild = this.lastVisibleChild) === null || _this_lastVisibleChild === void 0 || (_this_lastVisibleChild_node = _this_lastVisibleChild.node) === null || _this_lastVisibleChild_node === void 0 ? void 0 : _this_lastVisibleChild_node.key) !== null && _this_lastVisibleChild_node_key !== void 0 ? _this_lastVisibleChild_node_key : null, (node.colSpan != null || node.colIndex != null) && nextSibling) {
						var _node_colIndex, _node_colSpan;
						let nextColIndex = ((_node_colIndex = node.colIndex) !== null && _node_colIndex !== void 0 ? _node_colIndex : node.index) + ((_node_colSpan = node.colSpan) !== null && _node_colSpan !== void 0 ? _node_colSpan : 1);
						if (nextSibling.node != null && nextColIndex !== nextSibling.node.colIndex) {
							let siblingNode = nextSibling.getMutableNode();
							siblingNode.colIndex = nextColIndex;
						}
					}
				}
			}
			setProps(obj, ref, CollectionNodeClass, rendered, render) {
				let node, { value: value1, textValue, id, ...props } = obj;
				if (this.node == null ? (node = new CollectionNodeClass(id ?? `react-aria-${++this.ownerDocument.nodeId}`), this.node = node) : node = this.getMutableNode(), props.ref = ref, node.props = props, node.rendered = rendered, node.render = render, node.value = value1, node.textValue = textValue || (typeof props.children == "string" ? props.children : "") || obj["aria-label"] || "", id != null && id !== node.key) throw new Error("Cannot change the id of an item");
				props.colSpan != null && (node.colSpan = props.colSpan), this.isConnected && this.ownerDocument.queueUpdate();
			}
			get style() {
				let element = this;
				return {
					get display() {
						return element.isHidden ? "none" : "";
					},
					set display(value) {
						let isHidden = value === "none";
						if (element.isHidden !== isHidden) {
							var _element_parentNode, _element_parentNode1;
							(((_element_parentNode = element.parentNode) === null || _element_parentNode === void 0 ? void 0 : _element_parentNode.firstVisibleChild) === element || ((_element_parentNode1 = element.parentNode) === null || _element_parentNode1 === void 0 ? void 0 : _element_parentNode1.lastVisibleChild) === element) && element.ownerDocument.markDirty(element.parentNode);
							let prev = element.previousVisibleSibling, next = element.nextVisibleSibling;
							prev && element.ownerDocument.markDirty(prev), next && element.ownerDocument.markDirty(next), element.isHidden = isHidden, element.ownerDocument.markDirty(element);
						}
					}
				};
			}
			hasAttribute() {}
			setAttribute() {}
			setAttributeNS() {}
			removeAttribute() {}
			constructor(type, ownerDocument) {
				super(ownerDocument), this.nodeType = 8, this.isMutated = !0, this._index = 0, this.isHidden = !1, this.node = null;
			}
		};
		$681cc3c98f569e39$export$b34a105447964f9f = class extends $681cc3c98f569e39$export$410b0c854570d131 {
			get isConnected() {
				return this.isMounted;
			}
			createElement(type) {
				return new $681cc3c98f569e39$export$dc064fe9e59310fd(type, this);
			}
			getMutableCollection() {
				return this.nextCollection || (this.nextCollection = this.collection.clone()), this.nextCollection;
			}
			markDirty(node) {
				this.dirtyNodes.add(node);
			}
			addNode(element) {
				if (element.isHidden || element.node == null) return;
				let collection = this.getMutableCollection();
				if (!collection.getItem(element.node.key)) for (let child of element) this.addNode(child);
				collection.addNode(element.node);
			}
			removeNode(node) {
				if (node.node == null) return;
				for (let child of node) this.removeNode(child);
				this.getMutableCollection().removeNode(node.node.key);
			}
			/** Finalizes the collection update, updating all nodes and freezing the collection. */
			getCollection() {
				return this.inSubscription ? this.collection.clone() : (this.queuedRender = !1, this.updateCollection(), this.collection);
			}
			updateCollection() {
				for (let element of this.dirtyNodes) element instanceof $681cc3c98f569e39$export$dc064fe9e59310fd && (!element.isConnected || element.isHidden) ? this.removeNode(element) : element.updateChildIndices();
				for (let element of this.dirtyNodes) element instanceof $681cc3c98f569e39$export$dc064fe9e59310fd && (element.isConnected && !element.isHidden && (element.updateNode(), this.addNode(element)), element.isMutated = !1);
				if (this.dirtyNodes.clear(), this.nextCollection) {
					var _this_firstVisibleChild_node, _this_firstVisibleChild, _this_lastVisibleChild_node, _this_lastVisibleChild, _this_firstVisibleChild_node_key, _this_lastVisibleChild_node_key;
					this.nextCollection.commit((_this_firstVisibleChild_node_key = (_this_firstVisibleChild = this.firstVisibleChild) === null || _this_firstVisibleChild === void 0 || (_this_firstVisibleChild_node = _this_firstVisibleChild.node) === null || _this_firstVisibleChild_node === void 0 ? void 0 : _this_firstVisibleChild_node.key) !== null && _this_firstVisibleChild_node_key !== void 0 ? _this_firstVisibleChild_node_key : null, (_this_lastVisibleChild_node_key = (_this_lastVisibleChild = this.lastVisibleChild) === null || _this_lastVisibleChild === void 0 || (_this_lastVisibleChild_node = _this_lastVisibleChild.node) === null || _this_lastVisibleChild_node === void 0 ? void 0 : _this_lastVisibleChild_node.key) !== null && _this_lastVisibleChild_node_key !== void 0 ? _this_lastVisibleChild_node_key : null, this.isSSR), this.isSSR || (this.collection = this.nextCollection, this.nextCollection = null);
				}
			}
			queueUpdate() {
				if (!(this.dirtyNodes.size === 0 || this.queuedRender)) {
					this.queuedRender = !0, this.inSubscription = !0;
					for (let fn of this.subscriptions) fn();
					this.inSubscription = !1;
				}
			}
			subscribe(fn) {
				return this.subscriptions.add(fn), () => this.subscriptions.delete(fn);
			}
			resetAfterSSR() {
				this.isSSR && (this.isSSR = !1, this.firstChild = null, this.lastChild = null, this.nodeId = 0);
			}
			constructor(collection) {
				super(null), this.nodeType = 11, this.ownerDocument = this, this.dirtyNodes = /* @__PURE__ */ new Set(), this.isSSR = !1, this.nodeId = 0, this.nodesByProps = /* @__PURE__ */ new WeakMap(), this.isMounted = !0, this.nextCollection = null, this.subscriptions = /* @__PURE__ */ new Set(), this.queuedRender = !1, this.inSubscription = !1, this.collection = collection, this.nextCollection = collection;
			}
		};
		if (typeof HTMLTemplateElement < "u") {
			let getFirstChild = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild").get;
			Object.defineProperty(HTMLTemplateElement.prototype, "firstChild", {
				configurable: !0,
				enumerable: !0,
				get: function() {
					return this.dataset.reactAriaHidden ? this.content.firstChild : getFirstChild.call(this);
				}
			});
		}
		$f39a9eba43920ace$export$94b6d0abf7d33e8c = (0, import_react$114.createContext)(!1);
		$e1995378a142960e$var$ShallowRenderContext = (0, import_react$115.createContext)(!1);
		$e1995378a142960e$var$CollectionDocumentContext = (0, import_react$115.createContext)(null);
		$e1995378a142960e$var$useSyncExternalStore = typeof import_react$115.useSyncExternalStore == "function" ? import_react$115.useSyncExternalStore : $e1995378a142960e$var$useSyncExternalStoreFallback;
		$e1995378a142960e$var$SSRContext = (0, import_react$115.createContext)(null);
		$e1995378a142960e$var$CollectionContext = (0, import_react$115.createContext)(null);
		$01b77f81d0f07f68$export$75b6ee27786ba447 = (0, import_react$116.createContext)({});
		$f39a9eba43920ace$export$86427a43e3e48ebb(function(props, ref) {
			[props, ref] = $64fa3d84918910a7$export$29f1550f4b0d4415(props, ref, $01b77f81d0f07f68$export$75b6ee27786ba447);
			let { elementType: ElementType = "label", ...labelProps } = props;
			return import_react$116.createElement(ElementType, {
				className: "react-aria-Label",
				...labelProps,
				ref
			});
		});
		$0393f8ab869a0f1a$export$e9f3bf65a26ce129 = (0, import_react$117.createContext)(null);
		(0, import_react$117.forwardRef)(function(props, ref) {
			[props, ref] = $64fa3d84918910a7$export$29f1550f4b0d4415(props, ref, $0393f8ab869a0f1a$export$e9f3bf65a26ce129);
			let { value = 0, minValue = 0, maxValue = 100, isIndeterminate = !1 } = props;
			value = $9446cca9a3875146$export$7d15b64cf5a3a4c4(value, minValue, maxValue);
			let [labelRef, label] = $64fa3d84918910a7$export$9d4c57ee4c6ffdd8(!props["aria-label"] && !props["aria-labelledby"]), { progressBarProps, labelProps } = $204d9ebcedfb8806$export$ed5abd763a836edc({
				...props,
				label
			}), percentage = isIndeterminate ? void 0 : (value - minValue) / (maxValue - minValue) * 100, renderProps = $64fa3d84918910a7$export$4d86445c2cf5e3({
				...props,
				defaultClassName: "react-aria-ProgressBar",
				values: {
					percentage,
					valueText: progressBarProps["aria-valuetext"],
					isIndeterminate
				}
			}), DOMProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { global: !0 });
			return import_react$117.createElement("div", {
				...$3ef42575df84b30b$export$9d1611c77c2fe928(DOMProps, renderProps, progressBarProps),
				ref,
				slot: props.slot || void 0
			}, import_react$117.createElement($01b77f81d0f07f68$export$75b6ee27786ba447.Provider, { value: {
				...labelProps,
				ref: labelRef,
				elementType: "span"
			} }, renderProps.children));
		});
		$d2b4bc8c273e7be6$export$24d547caef80ccd1 = (0, import_react$119.createContext)({});
		$f39a9eba43920ace$export$86427a43e3e48ebb(function(props, ref) {
			[props, ref] = $64fa3d84918910a7$export$29f1550f4b0d4415(props, ref, $d2b4bc8c273e7be6$export$24d547caef80ccd1), props = $d2b4bc8c273e7be6$var$disablePendingProps(props);
			let ctx = props, { isPending } = ctx, { buttonProps, isPressed } = $701a24aa0da5b062$export$ea18c227d4417cc3(props, ref), { focusProps, isFocused, isFocusVisible } = $f7dceffc5ad7768b$export$4e328f61c538687f(props), { hoverProps, isHovered } = $6179b936705e76d3$export$ae780daf29e6d456({
				...props,
				isDisabled: props.isDisabled || isPending
			}), renderValues = {
				isHovered,
				isPressed: (ctx.isPressed || isPressed) && !isPending,
				isFocused,
				isFocusVisible,
				isDisabled: props.isDisabled || !1,
				isPending: isPending ?? !1
			}, renderProps = $64fa3d84918910a7$export$4d86445c2cf5e3({
				...props,
				values: renderValues,
				defaultClassName: "react-aria-Button"
			}), buttonId = $bdb11010cef70236$export$f680877a34711e37(buttonProps.id), progressId = $bdb11010cef70236$export$f680877a34711e37(), ariaLabelledby = buttonProps["aria-labelledby"];
			isPending && (ariaLabelledby ? ariaLabelledby = `${ariaLabelledby} ${progressId}` : buttonProps["aria-label"] && (ariaLabelledby = `${buttonId} ${progressId}`));
			let wasPending = (0, import_react$119.useRef)(isPending);
			(0, import_react$119.useEffect)(() => {
				let message = { "aria-labelledby": ariaLabelledby || buttonId };
				!wasPending.current && isFocused && isPending ? $319e236875307eab$export$a9b970dcc4ae71a9(message, "assertive") : wasPending.current && isFocused && !isPending && $319e236875307eab$export$a9b970dcc4ae71a9(message, "assertive"), wasPending.current = isPending;
			}, [
				isPending,
				isFocused,
				ariaLabelledby,
				buttonId
			]);
			let DOMProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { global: !0 });
			return delete DOMProps.onClick, import_react$119.createElement("button", {
				...$3ef42575df84b30b$export$9d1611c77c2fe928(DOMProps, renderProps, buttonProps, focusProps, hoverProps),
				type: buttonProps.type === "submit" && isPending ? "button" : buttonProps.type,
				id: buttonId,
				ref,
				"aria-labelledby": ariaLabelledby,
				slot: props.slot || void 0,
				"aria-disabled": isPending ? "true" : buttonProps["aria-disabled"],
				"data-disabled": props.isDisabled || void 0,
				"data-pressed": renderValues.isPressed || void 0,
				"data-hovered": isHovered || void 0,
				"data-focused": isFocused || void 0,
				"data-pending": isPending || void 0,
				"data-focus-visible": isFocusVisible || void 0
			}, import_react$119.createElement($0393f8ab869a0f1a$export$e9f3bf65a26ce129.Provider, { value: { id: progressId } }, renderProps.children));
		});
		$07b14b47974efb58$export$9b9a0cd73afb7ca4 = (0, import_react$120.createContext)(null);
		$07b14b47974efb58$var$PopoverGroupContext = (0, import_react$120.createContext)(null);
		$07b14b47974efb58$export$5b6b19405a83ff9d = (0, import_react$120.forwardRef)(function(props, ref) {
			[props, ref] = $64fa3d84918910a7$export$29f1550f4b0d4415(props, ref, $07b14b47974efb58$export$9b9a0cd73afb7ca4);
			let contextState = (0, import_react$120.useContext)($de32f1b87079253c$export$d2f961adcb0afbe), localState = $fc909762b330b746$export$61c6a8c84e605fb6(props), state = props.isOpen != null || props.defaultOpen != null || !contextState ? localState : contextState, isExiting = $d3f049242431219c$export$45fda7c47f93fd48(ref, state.isOpen) || props.isExiting || !1, isHidden = $f39a9eba43920ace$export$b5d7cc18bb8d2b59(), { direction } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7();
			if (isHidden) {
				let children = props.children;
				return typeof children == "function" && (children = children({
					trigger: props.trigger || null,
					placement: "bottom",
					isEntering: !1,
					isExiting: !1,
					defaultChildren: null
				})), import_react$120.createElement(import_react$120.Fragment, null, children);
			}
			return state && !state.isOpen && !isExiting ? null : import_react$120.createElement($07b14b47974efb58$var$PopoverInner, {
				...props,
				triggerRef: props.triggerRef,
				state,
				popoverRef: ref,
				isExiting,
				dir: direction
			});
		});
		$7135fc7d473fd974$export$d40e14dec8b060a8 = (0, import_react$121.createContext)(null);
		$e1995378a142960e$export$e953bb1cd0f19726("section", (props, ref, section) => {
			let { name, render } = (0, import_react$121.useContext)($7135fc7d473fd974$export$d40e14dec8b060a8);
			return render(props, ref, section, "react-aria-Section");
		});
		$7135fc7d473fd974$export$a164736487e3f0ae = {
			CollectionRoot({ collection, renderDropIndicator }) {
				return $7135fc7d473fd974$var$useCollectionRender(collection, null, renderDropIndicator);
			},
			CollectionBranch({ collection, parent, renderDropIndicator }) {
				return $7135fc7d473fd974$var$useCollectionRender(collection, parent, renderDropIndicator);
			}
		};
		$7135fc7d473fd974$export$4feb769f8ddf26c5 = (0, import_react$121.createContext)($7135fc7d473fd974$export$a164736487e3f0ae);
		$8e6cc465cc68f603$export$b0d3ecf7112093a7 = (0, import_react$122.createContext)(null);
		$8e6cc465cc68f603$export$698f465ec27e93df = (0, import_react$122.createContext)(null);
		$72a5793c14baf454$export$e0e4026c12a8bdbb = (0, import_react$123.createContext)({});
		$e1995378a142960e$export$18af5c7a9e9b3664($23b9f4fcf0fe224b$export$5ae2504e948afce5, function(props, ref) {
			return [props, ref] = $64fa3d84918910a7$export$29f1550f4b0d4415(props, ref, $72a5793c14baf454$export$e0e4026c12a8bdbb), import_react$123.createElement("header", {
				className: "react-aria-Header",
				...props,
				ref
			}, props.children);
		});
		$63df2425e2108aa8$export$744d98a3b8a94e1c = (0, import_react$124.createContext)({});
		(0, import_react$124.forwardRef)(function(props, ref) {
			return [props, ref] = $64fa3d84918910a7$export$29f1550f4b0d4415(props, ref, $63df2425e2108aa8$export$744d98a3b8a94e1c), import_react$124.createElement("kbd", {
				dir: "ltr",
				...props,
				ref
			});
		});
		$431f98aba6844401$export$6615d83f6de245ce = (0, import_react$125.createContext)({});
		$431f98aba6844401$export$7750289ca694c0b5 = class extends $23b9f4fcf0fe224b$export$d68d59712b04d9d1 {
			filter(collection, newCollection) {
				let prevItem = newCollection.getItem(this.prevKey);
				if (prevItem && prevItem.type !== "separator") {
					let clone = this.clone();
					return newCollection.addDescendants(clone, collection), clone;
				}
				return null;
			}
		};
		$431f98aba6844401$export$7750289ca694c0b5.type = "separator";
		$e1995378a142960e$export$18af5c7a9e9b3664($431f98aba6844401$export$7750289ca694c0b5, function(props, ref) {
			[props, ref] = $64fa3d84918910a7$export$29f1550f4b0d4415(props, ref, $431f98aba6844401$export$6615d83f6de245ce);
			let { elementType, orientation, style, className, slot, ...otherProps } = props, Element2 = elementType || "hr";
			Element2 === "hr" && orientation === "vertical" && (Element2 = "div");
			let { separatorProps } = $f4b273590fab9f93$export$52210f68a14655d0({
				...otherProps,
				elementType,
				orientation
			}), DOMProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { global: !0 });
			return import_react$125.createElement(Element2, {
				...$3ef42575df84b30b$export$9d1611c77c2fe928(DOMProps, separatorProps),
				style,
				className: className ?? "react-aria-Separator",
				ref,
				slot: slot || void 0
			});
		});
		$fc79756100351201$export$6f49b4016bfc8d56 = /* @__PURE__ */ new WeakMap();
		$feb5ffebff200149$var$collectionMap = /* @__PURE__ */ new WeakMap();
		$fb3050f43d946246$var$TYPEAHEAD_DEBOUNCE_WAIT_MS = 1e3;
		$657e4dc4a6e88df0$export$8f5ed9ff9f511381 = class {
			getItemRect(key) {
				let container = this.ref.current;
				if (!container) return null;
				let item = key != null ? $feb5ffebff200149$export$c3d8340acf92597f(this.ref, key) : null;
				if (!item) return null;
				let containerRect = container.getBoundingClientRect(), itemRect = item.getBoundingClientRect();
				return {
					x: itemRect.left - containerRect.left - container.clientLeft + container.scrollLeft,
					y: itemRect.top - containerRect.top - container.clientTop + container.scrollTop,
					width: itemRect.width,
					height: itemRect.height
				};
			}
			getContentSize() {
				let container = this.ref.current;
				var _container_scrollWidth, _container_scrollHeight;
				return {
					width: (_container_scrollWidth = container?.scrollWidth) !== null && _container_scrollWidth !== void 0 ? _container_scrollWidth : 0,
					height: (_container_scrollHeight = container?.scrollHeight) !== null && _container_scrollHeight !== void 0 ? _container_scrollHeight : 0
				};
			}
			getVisibleRect() {
				let container = this.ref.current;
				var _container_scrollLeft, _container_scrollTop, _container_clientWidth, _container_clientHeight;
				return {
					x: (_container_scrollLeft = container?.scrollLeft) !== null && _container_scrollLeft !== void 0 ? _container_scrollLeft : 0,
					y: (_container_scrollTop = container?.scrollTop) !== null && _container_scrollTop !== void 0 ? _container_scrollTop : 0,
					width: (_container_clientWidth = container?.clientWidth) !== null && _container_clientWidth !== void 0 ? _container_clientWidth : 0,
					height: (_container_clientHeight = container?.clientHeight) !== null && _container_clientHeight !== void 0 ? _container_clientHeight : 0
				};
			}
			constructor(ref) {
				this.ref = ref;
			}
		};
		$2a25aae57d74318e$export$a05409b8bb224a5a = class {
			isDisabled(item) {
				var _item_props;
				return this.disabledBehavior === "all" && (((_item_props = item.props) === null || _item_props === void 0 ? void 0 : _item_props.isDisabled) || this.disabledKeys.has(item.key));
			}
			findNextNonDisabled(key, getNext) {
				let nextKey = key;
				for (; nextKey != null;) {
					let item = this.collection.getItem(nextKey);
					if (item?.type === "item" && !this.isDisabled(item)) return nextKey;
					nextKey = getNext(nextKey);
				}
				return null;
			}
			getNextKey(key) {
				let nextKey = key;
				return nextKey = this.collection.getKeyAfter(nextKey), this.findNextNonDisabled(nextKey, (key2) => this.collection.getKeyAfter(key2));
			}
			getPreviousKey(key) {
				let nextKey = key;
				return nextKey = this.collection.getKeyBefore(nextKey), this.findNextNonDisabled(nextKey, (key2) => this.collection.getKeyBefore(key2));
			}
			findKey(key, nextKey, shouldSkip) {
				let tempKey = key, itemRect = this.layoutDelegate.getItemRect(tempKey);
				if (!itemRect || tempKey == null) return null;
				let prevRect = itemRect;
				do {
					if (tempKey = nextKey(tempKey), tempKey == null) break;
					itemRect = this.layoutDelegate.getItemRect(tempKey);
				} while (itemRect && shouldSkip(prevRect, itemRect) && tempKey != null);
				return tempKey;
			}
			isSameRow(prevRect, itemRect) {
				return prevRect.y === itemRect.y || prevRect.x !== itemRect.x;
			}
			isSameColumn(prevRect, itemRect) {
				return prevRect.x === itemRect.x || prevRect.y !== itemRect.y;
			}
			getKeyBelow(key) {
				return this.layout === "grid" && this.orientation === "vertical" ? this.findKey(key, (key2) => this.getNextKey(key2), this.isSameRow) : this.getNextKey(key);
			}
			getKeyAbove(key) {
				return this.layout === "grid" && this.orientation === "vertical" ? this.findKey(key, (key2) => this.getPreviousKey(key2), this.isSameRow) : this.getPreviousKey(key);
			}
			getNextColumn(key, right) {
				return right ? this.getPreviousKey(key) : this.getNextKey(key);
			}
			getKeyRightOf(key) {
				let layoutDelegateMethod = this.direction === "ltr" ? "getKeyRightOf" : "getKeyLeftOf";
				return this.layoutDelegate[layoutDelegateMethod] ? (key = this.layoutDelegate[layoutDelegateMethod](key), this.findNextNonDisabled(key, (key2) => this.layoutDelegate[layoutDelegateMethod](key2))) : this.layout === "grid" ? this.orientation === "vertical" ? this.getNextColumn(key, this.direction === "rtl") : this.findKey(key, (key2) => this.getNextColumn(key2, this.direction === "rtl"), this.isSameColumn) : this.orientation === "horizontal" ? this.getNextColumn(key, this.direction === "rtl") : null;
			}
			getKeyLeftOf(key) {
				let layoutDelegateMethod = this.direction === "ltr" ? "getKeyLeftOf" : "getKeyRightOf";
				return this.layoutDelegate[layoutDelegateMethod] ? (key = this.layoutDelegate[layoutDelegateMethod](key), this.findNextNonDisabled(key, (key2) => this.layoutDelegate[layoutDelegateMethod](key2))) : this.layout === "grid" ? this.orientation === "vertical" ? this.getNextColumn(key, this.direction === "ltr") : this.findKey(key, (key2) => this.getNextColumn(key2, this.direction === "ltr"), this.isSameColumn) : this.orientation === "horizontal" ? this.getNextColumn(key, this.direction === "ltr") : null;
			}
			getFirstKey() {
				let key = this.collection.getFirstKey();
				return this.findNextNonDisabled(key, (key2) => this.collection.getKeyAfter(key2));
			}
			getLastKey() {
				let key = this.collection.getLastKey();
				return this.findNextNonDisabled(key, (key2) => this.collection.getKeyBefore(key2));
			}
			getKeyPageAbove(key) {
				let menu = this.ref.current, itemRect = this.layoutDelegate.getItemRect(key);
				if (!itemRect) return null;
				if (menu && !$cc38e7bd3fc7b213$export$2bb74740c4e19def(menu)) return this.getFirstKey();
				let nextKey = key;
				if (this.orientation === "horizontal") {
					let pageX = Math.max(0, itemRect.x + itemRect.width - this.layoutDelegate.getVisibleRect().width);
					for (; itemRect && itemRect.x > pageX && nextKey != null;) nextKey = this.getKeyAbove(nextKey), itemRect = nextKey == null ? null : this.layoutDelegate.getItemRect(nextKey);
				} else {
					let pageY = Math.max(0, itemRect.y + itemRect.height - this.layoutDelegate.getVisibleRect().height);
					for (; itemRect && itemRect.y > pageY && nextKey != null;) nextKey = this.getKeyAbove(nextKey), itemRect = nextKey == null ? null : this.layoutDelegate.getItemRect(nextKey);
				}
				return nextKey ?? this.getFirstKey();
			}
			getKeyPageBelow(key) {
				let menu = this.ref.current, itemRect = this.layoutDelegate.getItemRect(key);
				if (!itemRect) return null;
				if (menu && !$cc38e7bd3fc7b213$export$2bb74740c4e19def(menu)) return this.getLastKey();
				let nextKey = key;
				if (this.orientation === "horizontal") {
					let pageX = Math.min(this.layoutDelegate.getContentSize().width, itemRect.y - itemRect.width + this.layoutDelegate.getVisibleRect().width);
					for (; itemRect && itemRect.x < pageX && nextKey != null;) nextKey = this.getKeyBelow(nextKey), itemRect = nextKey == null ? null : this.layoutDelegate.getItemRect(nextKey);
				} else {
					let pageY = Math.min(this.layoutDelegate.getContentSize().height, itemRect.y - itemRect.height + this.layoutDelegate.getVisibleRect().height);
					for (; itemRect && itemRect.y < pageY && nextKey != null;) nextKey = this.getKeyBelow(nextKey), itemRect = nextKey == null ? null : this.layoutDelegate.getItemRect(nextKey);
				}
				return nextKey ?? this.getLastKey();
			}
			getKeyForSearch(search, fromKey) {
				if (!this.collator) return null;
				let collection = this.collection, key = fromKey || this.getFirstKey();
				for (; key != null;) {
					let item = collection.getItem(key);
					if (!item) return null;
					let substring = item.textValue.slice(0, search.length);
					if (item.textValue && this.collator.compare(substring, search) === 0) return key;
					key = this.getNextKey(key);
				}
				return null;
			}
			constructor(...args) {
				if (args.length === 1) {
					let opts = args[0];
					this.collection = opts.collection, this.ref = opts.ref, this.collator = opts.collator, this.disabledKeys = opts.disabledKeys || /* @__PURE__ */ new Set(), this.disabledBehavior = opts.disabledBehavior || "all", this.orientation = opts.orientation || "vertical", this.direction = opts.direction, this.layout = opts.layout || "stack", this.layoutDelegate = opts.layoutDelegate || new $657e4dc4a6e88df0$export$8f5ed9ff9f511381(opts.ref);
				} else this.collection = args[0], this.disabledKeys = args[1], this.ref = args[2], this.collator = args[3], this.layout = "stack", this.orientation = "vertical", this.disabledBehavior = "all", this.layoutDelegate = new $657e4dc4a6e88df0$export$8f5ed9ff9f511381(this.ref);
				this.layout === "stack" && this.orientation === "vertical" && (this.getKeyLeftOf = void 0, this.getKeyRightOf = void 0);
			}
		};
		$c1d7fb2ec91bae71$var$Item.getCollectionNode = function* (props, context) {
			let { childItems, title, children } = props, rendered = props.title || props.children, textValue = props.textValue || (typeof rendered == "string" ? rendered : "") || props["aria-label"] || "";
			!textValue && context?.suppressTextValueWarning, yield {
				type: "item",
				props,
				rendered,
				textValue,
				"aria-label": props["aria-label"],
				hasChildNodes: $c1d7fb2ec91bae71$var$hasChildItems(props),
				*childNodes() {
					if (childItems) for (let child of childItems) yield {
						type: "item",
						value: child
					};
					else if (title) {
						let items = [];
						import_react$130.Children.forEach(children, (child) => {
							items.push({
								type: "item",
								element: child
							});
						}), yield* items;
					}
				}
			};
		};
		$c1d7fb2ec91bae71$export$6d08773d2e66f8f2 = $c1d7fb2ec91bae71$var$Item;
		$9fc4852771d079eb$var$Section.getCollectionNode = function* (props) {
			let { children, title, items } = props;
			yield {
				type: "section",
				props,
				hasChildNodes: !0,
				rendered: title,
				"aria-label": props["aria-label"],
				*childNodes() {
					if (typeof children == "function") {
						if (!items) throw new Error("props.children was a function but props.items is missing");
						for (let item of items) yield {
							type: "item",
							value: item,
							renderer: children
						};
					} else {
						let items2 = [];
						import_react$131.Children.forEach(children, (child) => {
							items2.push({
								type: "item",
								element: child
							});
						}), yield* items2;
					}
				}
			};
		};
		$eb2240fc39a57fa5$export$bf788dd355e3a401 = class {
			build(props, context) {
				return this.context = context, $eb2240fc39a57fa5$var$iterable(() => this.iterateCollection(props));
			}
			*iterateCollection(props) {
				let { children, items } = props;
				if (import_react$132.isValidElement(children) && children.type === import_react$132.Fragment) yield* this.iterateCollection({
					children: children.props.children,
					items
				});
				else if (typeof children == "function") {
					if (!items) throw new Error("props.children was a function but props.items is missing");
					let index3 = 0;
					for (let item of items) yield* this.getFullNode({
						value: item,
						index: index3
					}, { renderer: children }), index3++;
				} else {
					let items2 = [];
					import_react$132.Children.forEach(children, (child) => {
						child && items2.push(child);
					});
					let index3 = 0;
					for (let item of items2) {
						let nodes = this.getFullNode({
							element: item,
							index: index3
						}, {});
						for (let node of nodes) index3++, yield node;
					}
				}
			}
			getKey(item, partialNode, state, parentKey) {
				if (item.key != null) return item.key;
				if (partialNode.type === "cell" && partialNode.key != null) return `${parentKey}${partialNode.key}`;
				let v = partialNode.value;
				if (v != null) {
					var _v_key;
					let key = (_v_key = v.key) !== null && _v_key !== void 0 ? _v_key : v.id;
					if (key == null) throw new Error("No key found for item");
					return key;
				}
				return parentKey ? `${parentKey}.${partialNode.index}` : `$.${partialNode.index}`;
			}
			getChildState(state, partialNode) {
				return { renderer: partialNode.renderer || state.renderer };
			}
			*getFullNode(partialNode, state, parentKey, parentNode) {
				if (import_react$132.isValidElement(partialNode.element) && partialNode.element.type === import_react$132.Fragment) {
					let children = [];
					import_react$132.Children.forEach(partialNode.element.props.children, (child) => {
						children.push(child);
					});
					var _partialNode_index;
					let index3 = (_partialNode_index = partialNode.index) !== null && _partialNode_index !== void 0 ? _partialNode_index : 0;
					for (let child of children) yield* this.getFullNode({
						element: child,
						index: index3++
					}, state, parentKey, parentNode);
					return;
				}
				let element = partialNode.element;
				if (!element && partialNode.value && state && state.renderer) {
					let cached = this.cache.get(partialNode.value);
					if (cached && (!cached.shouldInvalidate || !cached.shouldInvalidate(this.context))) {
						cached.index = partialNode.index, cached.parentKey = parentNode ? parentNode.key : null, yield cached;
						return;
					}
					element = state.renderer(partialNode.value);
				}
				if (import_react$132.isValidElement(element)) {
					let type = element.type;
					if (typeof type != "function" && typeof type.getCollectionNode != "function") {
						let name = element.type;
						throw new Error(`Unknown element <${name}> in collection.`);
					}
					let childNodes = type.getCollectionNode(element.props, this.context);
					var _partialNode_index1;
					let index3 = (_partialNode_index1 = partialNode.index) !== null && _partialNode_index1 !== void 0 ? _partialNode_index1 : 0, result = childNodes.next();
					for (; !result.done && result.value;) {
						let childNode = result.value;
						partialNode.index = index3;
						var _childNode_key;
						let nodeKey = (_childNode_key = childNode.key) !== null && _childNode_key !== void 0 ? _childNode_key : null;
						nodeKey ??= childNode.element ? null : this.getKey(element, partialNode, state, parentKey);
						let children = [...this.getFullNode({
							...childNode,
							key: nodeKey,
							index: index3,
							wrapper: $eb2240fc39a57fa5$var$compose(partialNode.wrapper, childNode.wrapper)
						}, this.getChildState(state, childNode), parentKey ? `${parentKey}${element.key}` : element.key, parentNode)];
						for (let node2 of children) {
							var _childNode_value, _ref;
							node2.value = (_ref = (_childNode_value = childNode.value) !== null && _childNode_value !== void 0 ? _childNode_value : partialNode.value) !== null && _ref !== void 0 ? _ref : null, node2.value && this.cache.set(node2.value, node2);
							var _parentNode_type;
							if (partialNode.type && node2.type !== partialNode.type) throw new Error(`Unsupported type <${$eb2240fc39a57fa5$var$capitalize(node2.type)}> in <${$eb2240fc39a57fa5$var$capitalize((_parentNode_type = parentNode?.type) !== null && _parentNode_type !== void 0 ? _parentNode_type : "unknown parent type")}>. Only <${$eb2240fc39a57fa5$var$capitalize(partialNode.type)}> is supported.`);
							index3++, yield node2;
						}
						result = childNodes.next(children);
					}
					return;
				}
				if (partialNode.key == null || partialNode.type == null) return;
				let builder = this;
				var _partialNode_value, _partialNode_textValue;
				let node = {
					type: partialNode.type,
					props: partialNode.props,
					key: partialNode.key,
					parentKey: parentNode ? parentNode.key : null,
					value: (_partialNode_value = partialNode.value) !== null && _partialNode_value !== void 0 ? _partialNode_value : null,
					level: parentNode ? parentNode.level + 1 : 0,
					index: partialNode.index,
					rendered: partialNode.rendered,
					textValue: (_partialNode_textValue = partialNode.textValue) !== null && _partialNode_textValue !== void 0 ? _partialNode_textValue : "",
					"aria-label": partialNode["aria-label"],
					wrapper: partialNode.wrapper,
					shouldInvalidate: partialNode.shouldInvalidate,
					hasChildNodes: partialNode.hasChildNodes || !1,
					childNodes: $eb2240fc39a57fa5$var$iterable(function* () {
						if (!partialNode.hasChildNodes || !partialNode.childNodes) return;
						let index3 = 0;
						for (let child of partialNode.childNodes()) {
							child.key != null && (child.key = `${node.key}${child.key}`);
							let nodes = builder.getFullNode({
								...child,
								index: index3
							}, builder.getChildState(state, child), node.key, node);
							for (let node2 of nodes) index3++, yield node2;
						}
					})
				};
				yield node;
			}
			constructor() {
				this.cache = /* @__PURE__ */ new WeakMap();
			}
		};
		$453cc9f0df89c0a5$var$cache = /* @__PURE__ */ new WeakMap();
		$d275435c250248f8$var$ALLOWED_INVALID_MOVEMENTS = 2;
		$d275435c250248f8$var$THROTTLE_TIME = 50;
		$d275435c250248f8$var$TIMEOUT_TIME = 1e3;
		$d275435c250248f8$var$ANGLE_PADDING = Math.PI / 12;
		$05ca4cd7c4a5a999$export$863faf230ee2118a = class {
			*[Symbol.iterator]() {
				yield* this.iterable;
			}
			get size() {
				return this.keyMap.size;
			}
			getKeys() {
				return this.keyMap.keys();
			}
			getKeyBefore(key) {
				let node = this.keyMap.get(key);
				var _node_prevKey;
				return node && (_node_prevKey = node.prevKey) !== null && _node_prevKey !== void 0 ? _node_prevKey : null;
			}
			getKeyAfter(key) {
				let node = this.keyMap.get(key);
				var _node_nextKey;
				return node && (_node_nextKey = node.nextKey) !== null && _node_nextKey !== void 0 ? _node_nextKey : null;
			}
			getFirstKey() {
				return this.firstKey;
			}
			getLastKey() {
				return this.lastKey;
			}
			getItem(key) {
				var _this_keyMap_get;
				return (_this_keyMap_get = this.keyMap.get(key)) !== null && _this_keyMap_get !== void 0 ? _this_keyMap_get : null;
			}
			at(idx) {
				let keys = [...this.getKeys()];
				return this.getItem(keys[idx]);
			}
			constructor(nodes, { expandedKeys } = {}) {
				this.keyMap = /* @__PURE__ */ new Map(), this.firstKey = null, this.lastKey = null, this.iterable = nodes, expandedKeys = expandedKeys || /* @__PURE__ */ new Set();
				let visit = (node) => {
					if (this.keyMap.set(node.key, node), node.childNodes && (node.type === "section" || expandedKeys.has(node.key))) for (let child of node.childNodes) visit(child);
				};
				for (let node of nodes) visit(node);
				let last = null, index3 = 0;
				for (let [key, node] of this.keyMap) last ? (last.nextKey = key, node.prevKey = last.key) : (this.firstKey = key, node.prevKey = void 0), node.type === "item" && (node.index = index3++), last = node, last.nextKey = void 0;
				var _last_key;
				this.lastKey = (_last_key = last?.key) !== null && _last_key !== void 0 ? _last_key : null;
			}
		};
		$e40ea825a81a3709$export$52baac22726c72bf = class _$e40ea825a81a3709$export$52baac22726c72bf extends Set {
			constructor(keys, anchorKey, currentKey) {
				super(keys), keys instanceof _$e40ea825a81a3709$export$52baac22726c72bf ? (this.anchorKey = anchorKey ?? keys.anchorKey, this.currentKey = currentKey ?? keys.currentKey) : (this.anchorKey = anchorKey ?? null, this.currentKey = currentKey ?? null);
			}
		};
		$d496c0a20b6e58ec$export$6c8a5aaad13c9852 = class _$d496c0a20b6e58ec$export$6c8a5aaad13c9852 {
			/**
			* The type of selection that is allowed in the collection.
			*/
			get selectionMode() {
				return this.state.selectionMode;
			}
			/**
			* Whether the collection allows empty selection.
			*/
			get disallowEmptySelection() {
				return this.state.disallowEmptySelection;
			}
			/**
			* The selection behavior for the collection.
			*/
			get selectionBehavior() {
				return this.state.selectionBehavior;
			}
			/**
			* Sets the selection behavior for the collection.
			*/
			setSelectionBehavior(selectionBehavior) {
				this.state.setSelectionBehavior(selectionBehavior);
			}
			/**
			* Whether the collection is currently focused.
			*/
			get isFocused() {
				return this.state.isFocused;
			}
			/**
			* Sets whether the collection is focused.
			*/
			setFocused(isFocused) {
				this.state.setFocused(isFocused);
			}
			/**
			* The current focused key in the collection.
			*/
			get focusedKey() {
				return this.state.focusedKey;
			}
			/** Whether the first or last child of the focused key should receive focus. */
			get childFocusStrategy() {
				return this.state.childFocusStrategy;
			}
			/**
			* Sets the focused key.
			*/
			setFocusedKey(key, childFocusStrategy) {
				(key == null || this.collection.getItem(key)) && this.state.setFocusedKey(key, childFocusStrategy);
			}
			/**
			* The currently selected keys in the collection.
			*/
			get selectedKeys() {
				return this.state.selectedKeys === "all" ? new Set(this.getSelectAllKeys()) : this.state.selectedKeys;
			}
			/**
			* The raw selection value for the collection.
			* Either 'all' for select all, or a set of keys.
			*/
			get rawSelection() {
				return this.state.selectedKeys;
			}
			/**
			* Returns whether a key is selected.
			*/
			isSelected(key) {
				if (this.state.selectionMode === "none") return !1;
				let mappedKey = this.getKey(key);
				return mappedKey == null ? !1 : this.state.selectedKeys === "all" ? this.canSelectItem(mappedKey) : this.state.selectedKeys.has(mappedKey);
			}
			/**
			* Whether the selection is empty.
			*/
			get isEmpty() {
				return this.state.selectedKeys !== "all" && this.state.selectedKeys.size === 0;
			}
			/**
			* Whether all items in the collection are selected.
			*/
			get isSelectAll() {
				if (this.isEmpty) return !1;
				if (this.state.selectedKeys === "all") return !0;
				if (this._isSelectAll != null) return this._isSelectAll;
				let allKeys = this.getSelectAllKeys(), selectedKeys = this.state.selectedKeys;
				return this._isSelectAll = allKeys.every((k) => selectedKeys.has(k)), this._isSelectAll;
			}
			get firstSelectedKey() {
				let first = null;
				for (let key of this.state.selectedKeys) {
					let item = this.collection.getItem(key);
					(!first || item && $c5a24bc478652b5f$export$8c434b3a7a4dad6(this.collection, item, first) < 0) && (first = item);
				}
				var _first_key;
				return (_first_key = first?.key) !== null && _first_key !== void 0 ? _first_key : null;
			}
			get lastSelectedKey() {
				let last = null;
				for (let key of this.state.selectedKeys) {
					let item = this.collection.getItem(key);
					(!last || item && $c5a24bc478652b5f$export$8c434b3a7a4dad6(this.collection, item, last) > 0) && (last = item);
				}
				var _last_key;
				return (_last_key = last?.key) !== null && _last_key !== void 0 ? _last_key : null;
			}
			get disabledKeys() {
				return this.state.disabledKeys;
			}
			get disabledBehavior() {
				return this.state.disabledBehavior;
			}
			/**
			* Extends the selection to the given key.
			*/
			extendSelection(toKey) {
				if (this.selectionMode === "none") return;
				if (this.selectionMode === "single") {
					this.replaceSelection(toKey);
					return;
				}
				let mappedToKey = this.getKey(toKey);
				if (mappedToKey == null) return;
				let selection;
				if (this.state.selectedKeys === "all") selection = new $e40ea825a81a3709$export$52baac22726c72bf([mappedToKey], mappedToKey, mappedToKey);
				else {
					let selectedKeys = this.state.selectedKeys;
					var _selectedKeys_anchorKey;
					let anchorKey = (_selectedKeys_anchorKey = selectedKeys.anchorKey) !== null && _selectedKeys_anchorKey !== void 0 ? _selectedKeys_anchorKey : mappedToKey;
					selection = new $e40ea825a81a3709$export$52baac22726c72bf(selectedKeys, anchorKey, mappedToKey);
					var _selectedKeys_currentKey;
					for (let key of this.getKeyRange(anchorKey, (_selectedKeys_currentKey = selectedKeys.currentKey) !== null && _selectedKeys_currentKey !== void 0 ? _selectedKeys_currentKey : mappedToKey)) selection.delete(key);
					for (let key of this.getKeyRange(mappedToKey, anchorKey)) this.canSelectItem(key) && selection.add(key);
				}
				this.state.setSelectedKeys(selection);
			}
			getKeyRange(from, to) {
				let fromItem = this.collection.getItem(from), toItem = this.collection.getItem(to);
				return fromItem && toItem ? $c5a24bc478652b5f$export$8c434b3a7a4dad6(this.collection, fromItem, toItem) <= 0 ? this.getKeyRangeInternal(from, to) : this.getKeyRangeInternal(to, from) : [];
			}
			getKeyRangeInternal(from, to) {
				var _this_layoutDelegate;
				if (!((_this_layoutDelegate = this.layoutDelegate) === null || _this_layoutDelegate === void 0) && _this_layoutDelegate.getKeyRange) return this.layoutDelegate.getKeyRange(from, to);
				let keys = [], key = from;
				for (; key != null;) {
					let item = this.collection.getItem(key);
					if (item && (item.type === "item" || item.type === "cell" && this.allowsCellSelection) && keys.push(key), key === to) return keys;
					key = this.collection.getKeyAfter(key);
				}
				return [];
			}
			getKey(key) {
				let item = this.collection.getItem(key);
				if (!item || item.type === "cell" && this.allowsCellSelection) return key;
				for (; item && item.type !== "item" && item.parentKey != null;) item = this.collection.getItem(item.parentKey);
				return !item || item.type !== "item" ? null : item.key;
			}
			/**
			* Toggles whether the given key is selected.
			*/
			toggleSelection(key) {
				if (this.selectionMode === "none") return;
				if (this.selectionMode === "single" && !this.isSelected(key)) {
					this.replaceSelection(key);
					return;
				}
				let mappedKey = this.getKey(key);
				if (mappedKey == null) return;
				let keys = new $e40ea825a81a3709$export$52baac22726c72bf(this.state.selectedKeys === "all" ? this.getSelectAllKeys() : this.state.selectedKeys);
				keys.has(mappedKey) ? keys.delete(mappedKey) : this.canSelectItem(mappedKey) && (keys.add(mappedKey), keys.anchorKey = mappedKey, keys.currentKey = mappedKey), !(this.disallowEmptySelection && keys.size === 0) && this.state.setSelectedKeys(keys);
			}
			/**
			* Replaces the selection with only the given key.
			*/
			replaceSelection(key) {
				if (this.selectionMode === "none") return;
				let mappedKey = this.getKey(key);
				if (mappedKey == null) return;
				let selection = this.canSelectItem(mappedKey) ? new $e40ea825a81a3709$export$52baac22726c72bf([mappedKey], mappedKey, mappedKey) : new $e40ea825a81a3709$export$52baac22726c72bf();
				this.state.setSelectedKeys(selection);
			}
			/**
			* Replaces the selection with the given keys.
			*/
			setSelectedKeys(keys) {
				if (this.selectionMode === "none") return;
				let selection = new $e40ea825a81a3709$export$52baac22726c72bf();
				for (let key of keys) {
					let mappedKey = this.getKey(key);
					if (mappedKey != null && (selection.add(mappedKey), this.selectionMode === "single")) break;
				}
				this.state.setSelectedKeys(selection);
			}
			getSelectAllKeys() {
				let keys = [], addKeys = (key) => {
					for (; key != null;) {
						if (this.canSelectItem(key)) {
							var _getFirstItem;
							let item = this.collection.getItem(key);
							item?.type === "item" && keys.push(key);
							var _getFirstItem_key;
							item?.hasChildNodes && (this.allowsCellSelection || item.type !== "item") && addKeys((_getFirstItem_key = (_getFirstItem = $c5a24bc478652b5f$export$fbdeaa6a76694f71($c5a24bc478652b5f$export$1005530eda016c13(item, this.collection))) === null || _getFirstItem === void 0 ? void 0 : _getFirstItem.key) !== null && _getFirstItem_key !== void 0 ? _getFirstItem_key : null);
						}
						key = this.collection.getKeyAfter(key);
					}
				};
				return addKeys(this.collection.getFirstKey()), keys;
			}
			/**
			* Selects all items in the collection.
			*/
			selectAll() {
				!this.isSelectAll && this.selectionMode === "multiple" && this.state.setSelectedKeys("all");
			}
			/**
			* Removes all keys from the selection.
			*/
			clearSelection() {
				!this.disallowEmptySelection && (this.state.selectedKeys === "all" || this.state.selectedKeys.size > 0) && this.state.setSelectedKeys(new $e40ea825a81a3709$export$52baac22726c72bf());
			}
			/**
			* Toggles between select all and an empty selection.
			*/
			toggleSelectAll() {
				this.isSelectAll ? this.clearSelection() : this.selectAll();
			}
			select(key, e) {
				this.selectionMode !== "none" && (this.selectionMode === "single" ? this.isSelected(key) && !this.disallowEmptySelection ? this.toggleSelection(key) : this.replaceSelection(key) : this.selectionBehavior === "toggle" || e && (e.pointerType === "touch" || e.pointerType === "virtual") ? this.toggleSelection(key) : this.replaceSelection(key));
			}
			/**
			* Returns whether the current selection is equal to the given selection.
			*/
			isSelectionEqual(selection) {
				if (selection === this.state.selectedKeys) return !0;
				let selectedKeys = this.selectedKeys;
				if (selection.size !== selectedKeys.size) return !1;
				for (let key of selection) if (!selectedKeys.has(key)) return !1;
				for (let key of selectedKeys) if (!selection.has(key)) return !1;
				return !0;
			}
			canSelectItem(key) {
				var _item_props;
				if (this.state.selectionMode === "none" || this.state.disabledKeys.has(key)) return !1;
				let item = this.collection.getItem(key);
				return !(!item || !(item == null || (_item_props = item.props) === null || _item_props === void 0) && _item_props.isDisabled || item.type === "cell" && !this.allowsCellSelection);
			}
			isDisabled(key) {
				var _this_collection_getItem_props, _this_collection_getItem;
				return this.state.disabledBehavior === "all" && (this.state.disabledKeys.has(key) || !!(!((_this_collection_getItem = this.collection.getItem(key)) === null || _this_collection_getItem === void 0 || (_this_collection_getItem_props = _this_collection_getItem.props) === null || _this_collection_getItem_props === void 0) && _this_collection_getItem_props.isDisabled));
			}
			isLink(key) {
				var _this_collection_getItem_props, _this_collection_getItem;
				return !!(!((_this_collection_getItem = this.collection.getItem(key)) === null || _this_collection_getItem === void 0 || (_this_collection_getItem_props = _this_collection_getItem.props) === null || _this_collection_getItem_props === void 0) && _this_collection_getItem_props.href);
			}
			getItemProps(key) {
				var _this_collection_getItem;
				return (_this_collection_getItem = this.collection.getItem(key)) === null || _this_collection_getItem === void 0 ? void 0 : _this_collection_getItem.props;
			}
			withCollection(collection) {
				return new _$d496c0a20b6e58ec$export$6c8a5aaad13c9852(collection, this.state, {
					allowsCellSelection: this.allowsCellSelection,
					layoutDelegate: this.layoutDelegate || void 0
				});
			}
			constructor(collection, state, options) {
				this.collection = collection, this.state = state;
				var _options_allowsCellSelection;
				this.allowsCellSelection = (_options_allowsCellSelection = options?.allowsCellSelection) !== null && _options_allowsCellSelection !== void 0 ? _options_allowsCellSelection : !1, this._isSelectAll = null, this.layoutDelegate = options?.layoutDelegate || null;
			}
		};
		$3674c52c6b3c5bce$export$c7e742effb1c51e2 = (0, import_react$141.createContext)(null);
		$3674c52c6b3c5bce$export$24aad8519b95b41b = (0, import_react$141.createContext)(null);
		$3674c52c6b3c5bce$export$795aec4671cbae19 = (0, import_react$141.createContext)(null);
		$3674c52c6b3c5bce$var$SelectionManagerContext = (0, import_react$141.createContext)(null);
		$3674c52c6b3c5bce$var$SubmenuTriggerContext = (0, import_react$141.createContext)(null);
		$3674c52c6b3c5bce$var$SubmenuTriggerNode = class extends $23b9f4fcf0fe224b$export$d68d59712b04d9d1 {
			filter(collection, newCollection, filterFn) {
				let triggerNode = collection.getItem(this.firstChildKey);
				if (triggerNode && filterFn(triggerNode.textValue, this)) {
					let clone = this.clone();
					return newCollection.addDescendants(clone, collection), clone;
				}
				return null;
			}
		};
		$3674c52c6b3c5bce$var$SubmenuTriggerNode.type = "submenutrigger";
		$e1995378a142960e$export$e953bb1cd0f19726($3674c52c6b3c5bce$var$SubmenuTriggerNode, (props, ref, item) => {
			let { CollectionBranch } = (0, import_react$141.useContext)($7135fc7d473fd974$export$4feb769f8ddf26c5), state = (0, import_react$141.useContext)($3674c52c6b3c5bce$export$24aad8519b95b41b), rootMenuTriggerState = (0, import_react$141.useContext)($3674c52c6b3c5bce$export$795aec4671cbae19), submenuTriggerState = $e5614764aa47eb35$export$cfc51cf86138bf98({ triggerKey: item.key }, rootMenuTriggerState), submenuRef = (0, import_react$141.useRef)(null), itemRef = $df56164dff5785e2$export$4338b53315abf666(ref), { parentMenuRef, shouldUseVirtualFocus } = (0, import_react$141.useContext)($3674c52c6b3c5bce$var$SubmenuTriggerContext), { submenuTriggerProps, submenuProps, popoverProps } = $0065b146e7192841$export$7138b0d059a6e743({
				parentMenuRef,
				submenuRef,
				delay: props.delay,
				shouldUseVirtualFocus
			}, submenuTriggerState, itemRef);
			return import_react$141.createElement($64fa3d84918910a7$export$2881499e37b75b9a, { values: [
				[$3674c52c6b3c5bce$var$MenuItemContext, {
					...submenuTriggerProps,
					onAction: void 0,
					ref: itemRef
				}],
				[$3674c52c6b3c5bce$export$c7e742effb1c51e2, {
					ref: submenuRef,
					...submenuProps
				}],
				[$de32f1b87079253c$export$d2f961adcb0afbe, submenuTriggerState],
				[$07b14b47974efb58$export$9b9a0cd73afb7ca4, {
					trigger: "SubmenuTrigger",
					triggerRef: itemRef,
					placement: "end top",
					"aria-labelledby": submenuProps["aria-labelledby"],
					...popoverProps
				}]
			] }, import_react$141.createElement(CollectionBranch, {
				collection: state.collection,
				parent: item
			}), props.children[1]);
		}, (props) => props.children[0]);
		(0, import_react$141.forwardRef)(function(props, ref) {
			return [props, ref] = $64fa3d84918910a7$export$29f1550f4b0d4415(props, ref, $3674c52c6b3c5bce$export$c7e742effb1c51e2), import_react$141.createElement($e1995378a142960e$export$bf788dd355e3a401, { content: import_react$141.createElement($e1995378a142960e$export$fb8073518f34e6ec, props) }, (collection) => import_react$141.createElement($3674c52c6b3c5bce$var$MenuInner, {
				props,
				collection,
				menuRef: ref
			}));
		});
		$3674c52c6b3c5bce$var$GroupSelectionManager = class extends $d496c0a20b6e58ec$export$6c8a5aaad13c9852 {
			get focusedKey() {
				return this.parent.focusedKey;
			}
			get isFocused() {
				return this.parent.isFocused;
			}
			setFocusedKey(key, childFocusStrategy) {
				return this.parent.setFocusedKey(key, childFocusStrategy);
			}
			setFocused(isFocused) {
				this.parent.setFocused(isFocused);
			}
			get childFocusStrategy() {
				return this.parent.childFocusStrategy;
			}
			constructor(parent, state) {
				super(parent.collection, state), this.parent = parent;
			}
		};
		$e1995378a142960e$export$e953bb1cd0f19726($23b9f4fcf0fe224b$export$437f11dc9b403b78, $3674c52c6b3c5bce$var$MenuSectionInner);
		$3674c52c6b3c5bce$var$MenuItemContext = (0, import_react$141.createContext)(null);
		$e1995378a142960e$export$18af5c7a9e9b3664($23b9f4fcf0fe224b$export$fd11f34e1d07f134, function(props, forwardedRef, item) {
			var _useSlottedContext;
			[props, forwardedRef] = $64fa3d84918910a7$export$29f1550f4b0d4415(props, forwardedRef, $3674c52c6b3c5bce$var$MenuItemContext);
			let id = (_useSlottedContext = $64fa3d84918910a7$export$fabf2dc03a41866e($3674c52c6b3c5bce$var$MenuItemContext)) === null || _useSlottedContext === void 0 ? void 0 : _useSlottedContext.id, state = (0, import_react$141.useContext)($3674c52c6b3c5bce$export$24aad8519b95b41b), ref = $df56164dff5785e2$export$4338b53315abf666(forwardedRef), selectionManager = (0, import_react$141.useContext)($3674c52c6b3c5bce$var$SelectionManagerContext), { menuItemProps, labelProps, descriptionProps, keyboardShortcutProps, ...states } = $a2e5df62f93c7633$export$9d32628fc2aea7da({
				...props,
				id,
				key: item.key,
				selectionManager
			}, state, ref), { hoverProps, isHovered } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: states.isDisabled }), renderProps = $64fa3d84918910a7$export$4d86445c2cf5e3({
				...props,
				id: void 0,
				children: item.rendered,
				defaultClassName: "react-aria-MenuItem",
				values: {
					...states,
					isHovered,
					isFocusVisible: states.isFocusVisible,
					selectionMode: selectionManager.selectionMode,
					selectionBehavior: selectionManager.selectionBehavior,
					hasSubmenu: !!props["aria-haspopup"],
					isOpen: props["aria-expanded"] === "true"
				}
			}), ElementType = props.href ? "a" : "div", DOMProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { global: !0 });
			return delete DOMProps.id, delete DOMProps.onClick, import_react$141.createElement(ElementType, {
				...$3ef42575df84b30b$export$9d1611c77c2fe928(DOMProps, renderProps, menuItemProps, hoverProps),
				ref,
				"data-disabled": states.isDisabled || void 0,
				"data-hovered": isHovered || void 0,
				"data-focused": states.isFocused || void 0,
				"data-focus-visible": states.isFocusVisible || void 0,
				"data-pressed": states.isPressed || void 0,
				"data-selected": states.isSelected || void 0,
				"data-selection-mode": selectionManager.selectionMode === "none" ? void 0 : selectionManager.selectionMode,
				"data-has-submenu": !!props["aria-haspopup"] || void 0,
				"data-open": props["aria-expanded"] === "true" || void 0
			}, import_react$141.createElement($64fa3d84918910a7$export$2881499e37b75b9a, { values: [[$514c0188e459b4c0$export$9afb8bc826b033ea, { slots: {
				[$64fa3d84918910a7$export$c62b8e45d58ddad9]: labelProps,
				label: labelProps,
				description: descriptionProps
			} }], [$63df2425e2108aa8$export$744d98a3b8a94e1c, keyboardShortcutProps]] }, renderProps.children));
		});
		$de32f1b87079253c$export$8b93a07348a7730c = (0, import_react$143.createContext)(null);
		$de32f1b87079253c$export$d2f961adcb0afbe = (0, import_react$143.createContext)(null);
		(0, import_react$143.forwardRef)(function(props, ref) {
			let originalAriaLabelledby = props["aria-labelledby"];
			[props, ref] = $64fa3d84918910a7$export$29f1550f4b0d4415(props, ref, $de32f1b87079253c$export$8b93a07348a7730c);
			let { dialogProps, titleProps } = $40df3f8667284809$export$d55e7ee900f34e93({
				...props,
				"aria-labelledby": originalAriaLabelledby
			}, ref), state = (0, import_react$143.useContext)($de32f1b87079253c$export$d2f961adcb0afbe);
			!dialogProps["aria-label"] && !dialogProps["aria-labelledby"] && props["aria-labelledby"] && (dialogProps["aria-labelledby"] = props["aria-labelledby"]);
			let renderProps = $64fa3d84918910a7$export$4d86445c2cf5e3({
				defaultClassName: "react-aria-Dialog",
				className: props.className,
				style: props.style,
				children: props.children,
				values: { close: state?.close || (() => {}) }
			}), DOMProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { global: !0 });
			return import_react$143.createElement("section", {
				...$3ef42575df84b30b$export$9d1611c77c2fe928(DOMProps, renderProps, dialogProps),
				ref,
				slot: props.slot || void 0
			}, import_react$143.createElement($64fa3d84918910a7$export$2881499e37b75b9a, { values: [[$4e85f108e88277b8$export$d688439359537581, { slots: {
				[$64fa3d84918910a7$export$c62b8e45d58ddad9]: {},
				title: {
					...titleProps,
					level: 2
				}
			} }], [$d2b4bc8c273e7be6$export$24d547caef80ccd1, { slots: {
				[$64fa3d84918910a7$export$c62b8e45d58ddad9]: {},
				close: { onPress: () => state?.close() }
			} }]] }, renderProps.children));
		});
		PopoverProvider = ({ ariaLabel, placement: placementProp = "bottom-start", hasChrome = !0, hasCloseButton = !1, closeLabel, offset = 8, padding, popover, children, defaultVisible, visible, onVisibleChange, ...props }) => {
			ariaLabel || deprecate6("The 'ariaLabel' prop on 'PopoverProvider' will become mandatory in Storybook 11. Provide a concise, accessible label describing the popover's purpose.");
			let placement = convertToReactAriaPlacement(placementProp), [isOpen, setIsOpen] = (0, import_react$112.useState)(defaultVisible ?? !1), onOpenChange = (0, import_react$112.useCallback)((isOpen2) => {
				setIsOpen(isOpen2), onVisibleChange?.(isOpen2);
			}, [onVisibleChange]), onHide = (0, import_react$112.useCallback)(() => onOpenChange(!1), [onOpenChange]);
			return import_react$112.createElement($de32f1b87079253c$export$2e1e1122cf0cba88, {
				defaultOpen: defaultVisible,
				isOpen: visible ?? isOpen,
				onOpenChange,
				...props
			}, import_react$112.createElement($3b117e43dc0ca95d$export$27c701ed9e449e99, null, (0, import_react$112.cloneElement)(children, { "aria-haspopup": "dialog" })), import_react$112.createElement($07b14b47974efb58$export$5b6b19405a83ff9d, {
				"aria-label": ariaLabel,
				placement,
				offset,
				style: { outline: "none" }
			}, import_react$112.createElement(Popover, {
				hasChrome,
				hideLabel: closeLabel,
				onHide: hasCloseButton ? onHide : void 0,
				padding
			}, typeof popover == "function" ? popover({ onHide }) : popover)));
		};
		Tooltip2 = (0, import_react$144.forwardRef)((props, ref) => import_react$144.createElement(Popover, {
			ref,
			...props
		}));
		Tooltip2.displayName = "Tooltip";
		(0, import_react$145.lazy)(() => __vitePreload(() => import("./WithTooltip-CDUNV5IS-CPiZHYax.js").then((mod) => ({ default: mod.WithTooltip })), __vite__mapDeps([11,1,2,3,4,8,0,9]), import.meta.url));
		(0, import_react$145.lazy)(() => __vitePreload(() => import("./WithTooltip-CDUNV5IS-CPiZHYax.js").then((mod) => ({ default: mod.WithTooltipPure })), __vite__mapDeps([11,1,2,3,4,8,0,9]), import.meta.url));
		({deprecate: deprecate7} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		styled.div(({ theme }) => ({ fontWeight: theme.typography.weight.bold }));
		styled.span();
		styled.div(({ theme }) => ({
			marginTop: 8,
			textAlign: "center",
			"> *": {
				margin: "0 8px",
				fontWeight: theme.typography.weight.bold
			}
		}));
		styled.div(({ theme }) => ({
			color: theme.color.defaultText,
			lineHeight: "18px"
		}));
		styled.div({
			padding: 15,
			width: 280,
			boxSizing: "border-box"
		});
		({deprecate: deprecate9} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		import_memoizerific2 = __toESM$2(require_memoizerific(), 1);
		({deprecate: deprecate8} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		Title4 = styled(({ active, loading, disabled, ...rest }) => import_react$148.createElement("span", { ...rest }))(({ theme }) => ({
			color: theme.color.defaultText,
			fontWeight: theme.typography.weight.regular
		}), ({ active, theme }) => active ? {
			color: theme.color.secondary,
			fontWeight: theme.typography.weight.bold
		} : {}, ({ loading, theme }) => loading ? {
			display: "inline-block",
			flex: "none",
			...theme.animation.inlineGlow
		} : {}, ({ disabled, theme }) => disabled ? { color: theme.textMutedColor } : {});
		Right = styled.span({
			display: "flex",
			"& svg": {
				height: 12,
				width: 12,
				margin: "3px 0",
				verticalAlign: "top"
			}
		});
		Center = styled.span({
			flex: 1,
			textAlign: "left",
			display: "flex",
			flexDirection: "column",
			minWidth: 0
		}, ({ isIndented }) => isIndented ? { marginLeft: 24 } : {});
		CenterText = styled.span(({ theme }) => ({
			fontSize: "11px",
			lineHeight: "14px"
		}), ({ active, theme }) => active ? { color: theme.color.secondary } : {}, ({ theme, disabled }) => disabled ? { color: theme.textMutedColor } : {});
		Left = styled.span(({ active, theme }) => active ? { color: theme.color.secondary } : {}, () => ({
			display: "flex",
			maxWidth: 14
		}));
		Item = styled.button(({ theme }) => ({
			width: "100%",
			minWidth: 0,
			border: "none",
			borderRadius: theme.appBorderRadius,
			background: "none",
			fontSize: theme.typography.size.s1,
			transition: "background 150ms ease-out",
			color: theme.color.dark,
			textDecoration: "none",
			justifyContent: "space-between",
			lineHeight: "18px",
			padding: "7px 10px",
			display: "flex",
			alignItems: "center",
			"& > * + *": { paddingLeft: 10 },
			"&:focus-visible": {
				outline: `2px solid ${theme.color.secondary}`,
				outlineOffset: 0
			}
		}), ({ theme, href, onClick }) => (href || onClick) && {
			cursor: "pointer",
			"&:hover": { background: theme.background.hoverable },
			"&:hover svg": { opacity: 1 }
		}, ({ theme, as }) => as === "label" && { "&:has(input:not(:disabled))": {
			cursor: "pointer",
			"&:hover": { background: theme.background.hoverable }
		} }, ({ disabled }) => disabled && { cursor: "not-allowed" });
		getItemProps = (0, import_memoizerific2.default)(100)(({ onClick, input, href, LinkWrapper }) => ({
			...onClick && {
				as: "button",
				role: "button",
				onClick
			},
			...input && { as: "label" },
			...href && {
				as: "a",
				role: "link",
				href,
				...LinkWrapper && {
					as: LinkWrapper,
					to: href
				}
			}
		}));
		ListItem = (0, import_react$148.forwardRef)((props, ref) => {
			let { loading = !1, title = import_react$148.createElement("span", null, "Loading state"), center = null, right = null, active = !1, disabled = !1, isIndented = !1, href = void 0, onClick = void 0, icon, input, LinkWrapper = void 0, ...rest } = props, commonProps = {
				active,
				disabled
			}, itemProps = getItemProps(props), left = icon || input;
			return deprecate8("`ListItem` is deprecated and will be removed in Storybook 11, use `MenuItem` instead."), import_react$148.createElement(Item, {
				"data-deprecated": "ListItem",
				ref,
				...rest,
				...commonProps,
				...itemProps
			}, import_react$148.createElement(import_react$148.Fragment, null, left && import_react$148.createElement(Left, { ...commonProps }, left), title || center ? import_react$148.createElement(Center, { isIndented: isIndented && !left }, title && import_react$148.createElement(Title4, {
				...commonProps,
				loading
			}, title), center && import_react$148.createElement(CenterText, { ...commonProps }, center)) : null, right && import_react$148.createElement(Right, { ...commonProps }, right)));
		});
		ListItem.displayName = "ListItem";
		ListItem_default = ListItem;
		List = styled.div({
			minWidth: 180,
			overflow: "hidden",
			overflowY: "auto",
			maxHeight: 504
		}, ({ theme }) => ({ borderRadius: theme.appBorderRadius + 2 }), ({ theme }) => theme.base === "dark" ? { background: theme.background.content } : {});
		Group = styled.div(({ theme }) => ({
			padding: 4,
			"& + &": { borderTop: `1px solid ${theme.appBorderColor}` }
		}));
		Item2 = ({ id, onClick, ...rest }) => {
			let { active, disabled, title, href } = rest, handleClick = (0, import_react$147.useCallback)((event) => onClick?.(event, {
				id,
				active,
				disabled,
				title,
				href
			}), [
				onClick,
				id,
				active,
				disabled,
				title,
				href
			]);
			return import_react$147.createElement(ListItem_default, {
				id: `list-item-${id}`,
				...rest,
				...onClick && { onClick: handleClick }
			});
		};
		TooltipLinkList = ({ links, LinkWrapper, ...props }) => {
			deprecate9("`TooltipLinkList` is deprecated and will be removed in Storybook 11, use `ActionList` or `MenuItem` and `WithMenu` instead.");
			let groups = Array.isArray(links[0]) ? links : [links], isIndented = groups.some((group) => group.some((link) => "icon" in link && link.icon || "input" in link && link.input));
			return import_react$147.createElement(List, {
				"data-deprecated": "TooltipLinkList",
				...props,
				className: "sb-list"
			}, groups.filter((group) => group.length).map((group, index3) => import_react$147.createElement(Group, { key: group.map((link) => link.id).join(`~${index3}~`) }, group.map((link) => "content" in link ? import_react$147.createElement(import_react$147.Fragment, { key: link.id }, link.content) : import_react$147.createElement(Item2, {
				key: link.id,
				isIndented,
				LinkWrapper,
				...link
			})))));
		};
		({deprecate: deprecate14} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		({deprecate: deprecate10} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		StyledBar = styled.div(({ backgroundColor, border = !1, innerStyle = {}, scrollable, theme }) => ({
			color: theme.barTextColor,
			width: "100%",
			minHeight: 40,
			flexShrink: 0,
			scrollbarColor: `${theme.barTextColor} ${border ? backgroundColor || theme.barBg : "transparent"}`,
			scrollbarWidth: "thin",
			overflow: scrollable ? "auto" : "hidden",
			overflowY: "hidden",
			display: "flex",
			alignItems: "center",
			gap: scrollable ? 0 : 6,
			paddingInline: scrollable ? 0 : 6,
			...border ? {
				boxShadow: `${theme.appBorderColor}  0 -1px 0 0 inset`,
				background: backgroundColor || theme.barBg
			} : {},
			...innerStyle
		}));
		HeightPreserver = styled.div(({ innerStyle }) => ({
			minHeight: 40,
			display: "flex",
			alignItems: "center",
			width: "100%",
			gap: 6,
			paddingInline: 6,
			...innerStyle
		}));
		Bar = (0, import_react$150.forwardRef)(({ scrollable = !0, children, innerStyle, ...rest }, ref) => import_react$150.createElement(StyledBar, {
			...rest,
			ref,
			innerStyle: scrollable ? void 0 : innerStyle,
			scrollable
		}, scrollable ? import_react$150.createElement(HeightPreserver, { innerStyle }, children) : children));
		Bar.displayName = "Bar";
		Side = styled.div({
			display: "flex",
			whiteSpace: "nowrap",
			flexBasis: "auto",
			marginLeft: 3,
			marginRight: 10
		}, ({ scrollable }) => scrollable ? { flexShrink: 0 } : {}, ({ left }) => left ? { "& > *": { marginLeft: 4 } } : {}, ({ right }) => right ? { gap: 6 } : {});
		Side.displayName = "Side";
		BarInner = styled.div(({ bgColor }) => ({
			display: "flex",
			justifyContent: "space-between",
			position: "relative",
			flexWrap: "nowrap",
			flexShrink: 0,
			height: 40,
			width: "100%",
			backgroundColor: bgColor || ""
		}));
		BarWithoutPadding = styled(Bar)({ paddingInline: 0 });
		FlexBar = ({ children, backgroundColor, className = "", ...rest }) => {
			deprecate10("FlexBar is deprecated. Use Bar with justifyContent: \"space-between\" instead.");
			let [left, right] = import_react$150.Children.toArray(children);
			return import_react$150.createElement(BarWithoutPadding, {
				"data-deprecated": "FlexBar",
				backgroundColor,
				className: `sb-bar ${className}`,
				...rest
			}, import_react$150.createElement(BarInner, { bgColor: backgroundColor }, import_react$150.createElement(Side, {
				scrollable: rest.scrollable,
				left: !0
			}, left), right ? import_react$150.createElement(Side, { right: !0 }, right) : null));
		};
		FlexBar.displayName = "FlexBar";
		({deprecate: deprecate11} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		isLink = (obj) => typeof obj.props.href == "string";
		isButton = (obj) => typeof obj.props.href != "string";
		ButtonOrLink = (0, import_react$151.forwardRef)(ForwardRefFunction);
		ButtonOrLink.displayName = "ButtonOrLink";
		StyledTabButton = styled(ButtonOrLink, { shouldForwardProp: isPropValid })({
			whiteSpace: "normal",
			display: "inline-flex",
			overflow: "hidden",
			verticalAlign: "top",
			justifyContent: "center",
			alignItems: "center",
			textAlign: "center",
			textDecoration: "none",
			"&:empty": { display: "none" },
			"&[hidden]": { display: "none" }
		}, ({ theme }) => ({
			padding: "0 15px",
			transition: "color 0.2s linear, border-bottom-color 0.2s linear",
			height: 40,
			lineHeight: "12px",
			cursor: "pointer",
			background: "transparent",
			border: "0 solid transparent",
			borderTop: "3px solid transparent",
			borderBottom: "3px solid transparent",
			fontWeight: "bold",
			fontSize: 13,
			"&:focus": {
				outline: "0 none",
				borderBottomColor: theme.barSelectedColor
			}
		}), ({ active, textColor, theme }) => active ? {
			color: textColor || theme.barSelectedColor,
			borderBottomColor: theme.barSelectedColor
		} : {
			color: textColor || theme.barTextColor,
			borderBottomColor: "transparent",
			"&:hover": { color: theme.barHoverColor }
		});
		TabButton = (0, import_react$151.forwardRef)((props, ref) => (deprecate11("The `TabButton` component is deprecated. Use `TabList` instead."), import_react$151.createElement(StyledTabButton, {
			"data-deprecated": "TabButton",
			ref,
			...props
		})));
		TabButton.displayName = "TabButton";
		Wrapper4 = styled.div(({ theme }) => ({
			height: "100%",
			display: "flex",
			padding: 30,
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			gap: 15,
			background: theme.background.content
		}));
		Content2 = styled.div({
			display: "flex",
			flexDirection: "column",
			gap: 4,
			maxWidth: 415
		});
		Title5 = styled.div(({ theme }) => ({
			fontWeight: theme.typography.weight.bold,
			fontSize: theme.typography.size.s2 - 1,
			textAlign: "center",
			color: theme.color.defaultText
		}));
		Footer = styled.div(({ theme }) => ({ fontSize: theme.typography.size.s2 - 1 }));
		Description2 = styled.div(({ theme }) => ({
			fontWeight: theme.typography.weight.regular,
			fontSize: theme.typography.size.s2 - 1,
			textAlign: "center",
			color: theme.textMutedColor
		}));
		EmptyTabContent = ({ title, description, footer }) => import_react$152.createElement(Wrapper4, null, import_react$152.createElement(Content2, null, import_react$152.createElement(Title5, null, title), description && import_react$152.createElement(Description2, null, description)), footer && import_react$152.createElement(Footer, null, footer));
		({deprecate: deprecate12} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		VisuallyHidden = styled.div(({ active }) => active ? { display: "block" } : { display: "none" });
		childrenToList = (children) => (deprecate12("The `childrenToList` tabs helper is deprecated. Use `TabsView` instead."), import_react$153.Children.toArray(children).map(({ props: { title, id, color: color4, children: childrenOfChild } }) => {
			let content = Array.isArray(childrenOfChild) ? childrenOfChild[0] : childrenOfChild;
			return {
				title,
				id,
				...color4 ? { color: color4 } : {},
				render: typeof content == "function" ? content : ({ active }) => import_react$153.createElement(VisuallyHidden, {
					active,
					role: "tabpanel"
				}, content)
			};
		}));
		({deprecate: deprecate13} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		CollapseIcon = styled.span(({ theme, isActive }) => ({
			display: "inline-block",
			width: 0,
			height: 0,
			marginLeft: 8,
			color: isActive ? theme.color.secondary : theme.color.mediumdark,
			borderRight: "3px solid transparent",
			borderLeft: "3px solid transparent",
			borderTop: "3px solid",
			transition: "transform .1s ease-out"
		}));
		AddonButton = styled(TabButton)(({ active, theme, preActive }) => `
    color: ${preActive || active ? theme.barSelectedColor : theme.barTextColor};
    .addon-collapsible-icon {
      color: ${preActive || active ? theme.barSelectedColor : theme.barTextColor};
    }
    &:hover {
      color: ${theme.barHoverColor};
      .addon-collapsible-icon {
        color: ${theme.barHoverColor};
      }
    }
  `);
		ignoreSsrWarning2 = "/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */";
		Wrapper5 = styled.div(({ theme, bordered }) => bordered ? {
			backgroundClip: "padding-box",
			border: `1px solid ${theme.appBorderColor}`,
			borderRadius: theme.appBorderRadius,
			overflow: "hidden",
			boxSizing: "border-box"
		} : {}, ({ absolute }) => absolute ? {
			width: "100%",
			height: "100%",
			boxSizing: "border-box",
			display: "flex",
			flexDirection: "column"
		} : { display: "block" });
		StyledTabBar = styled.div({
			overflow: "hidden",
			"&:first-of-type": { marginLeft: -3 },
			whiteSpace: "nowrap",
			flexGrow: 1
		});
		TabBar = (0, import_react$149.forwardRef)((props, ref) => (deprecate14("The `TabBar` component is deprecated. Use `TabsView` instead."), import_react$149.createElement(StyledTabBar, {
			"data-deprecated": "TabBar",
			...props,
			ref
		})));
		TabBar.displayName = "TabBar";
		Content3 = styled.div({
			display: "block",
			position: "relative",
			container: "tab-content / inline-size"
		}, ({ theme }) => ({
			fontSize: theme.typography.size.s2 - 1,
			background: theme.background.content
		}), ({ bordered, theme }) => bordered ? { borderRadius: `0 0 ${theme.appBorderRadius - 1}px ${theme.appBorderRadius - 1}px` } : {}, ({ absolute, bordered }) => absolute ? {
			height: `calc(100% - ${bordered ? 42 : 40}px)`,
			position: "absolute",
			left: 0 + (bordered ? 1 : 0),
			right: 0 + (bordered ? 1 : 0),
			bottom: 0 + (bordered ? 1 : 0),
			top: 40 + (bordered ? 1 : 0),
			overflow: "auto",
			[`& > *:first-child${ignoreSsrWarning2}`]: {
				position: "absolute",
				left: 0 + (bordered ? 1 : 0),
				right: 0 + (bordered ? 1 : 0),
				bottom: 0 + (bordered ? 1 : 0),
				top: 0 + (bordered ? 1 : 0),
				height: `calc(100% - ${bordered ? 2 : 0}px)`,
				overflow: "auto"
			}
		} : {});
		TabWrapper = (0, import_react$149.forwardRef)(({ active, render, children }, ref) => (deprecate14("The `TabWrapper` component is deprecated. Use `TabsView` instead."), import_react$149.createElement(VisuallyHidden, {
			"data-deprecated": "TabWrapper",
			ref,
			active
		}, render ? render() : children)));
		TabWrapper.displayName = "TabWrapper";
		TabErrorBoundary = class extends import_react$149.Component {
			constructor(props) {
				super(props), this.state = { hasError: !1 };
			}
			static getDerivedStateFromError() {
				return { hasError: !0 };
			}
			componentDidCatch(error, info) {
				console.error("Error rendering addon panel"), console.error(error), console.error(info.componentStack);
			}
			render() {
				return this.state.hasError && this.props.active ? import_react$149.createElement(EmptyTabContent, {
					title: "This addon has errors",
					description: "Check your browser logs and addon code to pinpoint what went wrong. This issue was not caused by Storybook."
				}) : this.props.children;
			}
		};
		Tabs = (0, import_react$149.memo)(TabsImpl);
		Tabs.displayName = "Tabs";
		TabsState = class extends import_react$149.Component {
			constructor(props) {
				super(props);
				this.handlers = { onSelect: (id) => this.setState({ selected: id }) };
				deprecate14("The `TabsState` class is deprecated. Use `TabsView` instead."), this.state = { selected: props.initial };
			}
			render() {
				let { bordered = !1, absolute = !1, children, backgroundColor, menuName } = this.props, { selected } = this.state;
				return import_react$149.createElement(Tabs, {
					bordered,
					absolute,
					selected,
					backgroundColor,
					menuName,
					actions: this.handlers
				}, children);
			}
		};
		TabsState.defaultProps = {
			children: [],
			initial: null,
			absolute: !1,
			bordered: !1,
			backgroundColor: "",
			menuName: void 0
		};
		Separator2 = styled.span(({ theme }) => ({
			display: "inline-block",
			width: 1,
			height: 20,
			background: theme.appBorderColor,
			marginLeft: 2,
			marginRight: 2
		}), ({ force }) => force ? {} : { "& + &": { display: "none" } });
		Separator2.displayName = "Separator";
		styled.div(({ theme }) => ({
			fontSize: theme.typography.size.s2 - 1,
			height: "100%"
		}));
		Toolbar = ({ "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, ...rest }) => {
			let ref = (0, import_react$157.useRef)(null), { toolbarProps } = $2680b1829e803644$export$fa142eb1681c5202({
				"aria-label": ariaLabel,
				"aria-labelledby": ariaLabelledby,
				orientation: "horizontal"
			}, ref);
			return import_react$157.createElement(Bar, {
				ref,
				...toolbarProps,
				...rest
			});
		};
		$99b62ae3ff97ec45$export$c5f62239608282b6 = /* @__PURE__ */ new WeakMap();
		$bfc6f2d60b8a4c40$export$15010ca3c1abe90b = class {
			getKeyLeftOf(key) {
				return this.flipDirection ? this.getNextKey(key) : this.getPreviousKey(key);
			}
			getKeyRightOf(key) {
				return this.flipDirection ? this.getPreviousKey(key) : this.getNextKey(key);
			}
			isDisabled(key) {
				var _this_collection_getItem_props, _this_collection_getItem;
				return this.disabledKeys.has(key) || !!(!((_this_collection_getItem = this.collection.getItem(key)) === null || _this_collection_getItem === void 0 || (_this_collection_getItem_props = _this_collection_getItem.props) === null || _this_collection_getItem_props === void 0) && _this_collection_getItem_props.isDisabled);
			}
			getFirstKey() {
				let key = this.collection.getFirstKey();
				return key != null && this.isDisabled(key) && (key = this.getNextKey(key)), key;
			}
			getLastKey() {
				let key = this.collection.getLastKey();
				return key != null && this.isDisabled(key) && (key = this.getPreviousKey(key)), key;
			}
			getKeyAbove(key) {
				return this.tabDirection ? null : this.getPreviousKey(key);
			}
			getKeyBelow(key) {
				return this.tabDirection ? null : this.getNextKey(key);
			}
			getNextKey(startKey) {
				let key = startKey;
				do
					key = this.collection.getKeyAfter(key), key ??= this.collection.getFirstKey();
				while (key != null && this.isDisabled(key));
				return key;
			}
			getPreviousKey(startKey) {
				let key = startKey;
				do
					key = this.collection.getKeyBefore(key), key ??= this.collection.getLastKey();
				while (key != null && this.isDisabled(key));
				return key;
			}
			constructor(collection, direction, orientation, disabledKeys = /* @__PURE__ */ new Set()) {
				this.collection = collection, this.flipDirection = direction === "rtl" && orientation === "horizontal", this.disabledKeys = disabledKeys, this.tabDirection = orientation === "horizontal";
			}
		};
		StyledTabButton2 = styled.button({
			whiteSpace: "normal",
			display: "inline-flex",
			overflow: "hidden",
			verticalAlign: "top",
			justifyContent: "center",
			alignItems: "center",
			textAlign: "center",
			textDecoration: "none",
			scrollSnapAlign: "start",
			"&:empty": { display: "none" },
			"&[hidden]": { display: "none" }
		}, ({ theme }) => ({
			padding: "0 15px",
			transition: "color 0.2s linear, border-bottom-color 0.2s linear",
			height: 40,
			lineHeight: "12px",
			cursor: "pointer",
			background: "transparent",
			border: "0 solid transparent",
			borderTop: "3px solid transparent",
			borderBottom: "3px solid transparent",
			fontWeight: "bold",
			fontSize: 13,
			"&:focus-visible": {
				outline: "0 none",
				boxShadow: `inset 0 0 0 2px ${theme.barSelectedColor}`
			}
		}), ({ isSelected, theme }) => isSelected ? {
			color: theme.barSelectedColor,
			borderBottomColor: theme.barSelectedColor
		} : {
			color: theme.barTextColor,
			borderBottomColor: "transparent",
			"&:hover": { color: theme.barHoverColor }
		});
		TabListContainer = styled.div({
			display: "flex",
			alignItems: "center",
			flexShrink: 0,
			position: "relative",
			overflow: "hidden"
		});
		ScrollContainer = styled.div({
			display: "flex",
			overflowX: "auto",
			scrollbarWidth: "none",
			msOverflowStyle: "none",
			WebkitScrollbar: "none",
			scrollSnapType: "x mandatory",
			flex: 1,
			"&::-webkit-scrollbar": { display: "none" }
		});
		StyledTabList = styled.div({
			display: "flex",
			flexShrink: 0
		});
		SCROLL_BUTTON_WIDTH = 28;
		ScrollButtonContainer = styled.div(({ $showStartBorder, $showEndBorder, theme }) => ({
			flexShrink: 0,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: 6,
			boxShadow: $showStartBorder ? `inset 1px 0 0 ${theme.appBorderColor}` : $showEndBorder ? `inset -1px 0 0 ${theme.appBorderColor}` : "none"
		}));
		ScrollButton = styled(Button)({
			flexShrink: 0,
			paddingInline: 0,
			width: 16
		});
		TabButton2 = ({ item, state }) => {
			let { rendered } = item, tabRef = import_react$159.useRef(null), { tabProps, isDisabled, isPressed, isSelected } = $0175d55c2a017ebc$export$fdf4756d5b8ef90a(item, state, tabRef);
			return import_react$159.createElement(StyledTabButton2, {
				...tabProps,
				isDisabled,
				isPressed,
				isSelected,
				className: `tabbutton ${isSelected ? "tabbutton-active" : ""}`,
				ref: tabRef
			}, rendered);
		};
		TabList = ({ state, ...rest }) => {
			let containerRef = (0, import_react$159.useRef)(null), scrollContainerRef = (0, import_react$159.useRef)(null), tabListRef = (0, import_react$159.useRef)(null), { tabListProps } = $58d314389b21fa3f$export$773e389e644c5874({ orientation: "horizontal" }, state, tabListRef), [showScrollButtons, setShowScrollButtons] = (0, import_react$159.useState)(!1), [canScrollLeft, setCanScrollLeft] = (0, import_react$159.useState)(!1), [canScrollRight, setCanScrollRight] = (0, import_react$159.useState)(!1), updateScrollState = (0, import_react$159.useCallback)(() => {
				let scrollContainer = scrollContainerRef.current, container = containerRef.current;
				if (!scrollContainer || !container) return;
				let { scrollLeft, scrollWidth, clientWidth } = scrollContainer, needsScrolling = scrollWidth > container.clientWidth - (showScrollButtons ? SCROLL_BUTTON_WIDTH * 2 : 0);
				setShowScrollButtons(needsScrolling), needsScrolling ? (setCanScrollLeft(scrollLeft > 0), setCanScrollRight(scrollLeft < scrollWidth - clientWidth)) : (setCanScrollLeft(!1), setCanScrollRight(!1));
			}, [showScrollButtons]), throttledUpdateScrollState = (0, import_react$159.useCallback)(() => {
				updateScrollState();
			}, [updateScrollState]);
			(0, import_react$159.useEffect)(() => {
				let scrollContainer = scrollContainerRef.current;
				if (!scrollContainer || typeof window > "u") return;
				scrollContainer.addEventListener("scroll", throttledUpdateScrollState, { passive: !0 });
				let resizeObserver = null;
				typeof ResizeObserver < "u" && (resizeObserver = new ResizeObserver(throttledUpdateScrollState), resizeObserver.observe(scrollContainer));
				let timeoutId = setTimeout(throttledUpdateScrollState, 0);
				return () => {
					clearTimeout(timeoutId), scrollContainer.removeEventListener("scroll", throttledUpdateScrollState), resizeObserver && resizeObserver.disconnect();
				};
			}, [throttledUpdateScrollState]);
			let scroll = (0, import_react$159.useCallback)((direction) => {
				let scrollContainer = scrollContainerRef.current, container = containerRef.current;
				if (!scrollContainer || !container || typeof window > "u") return;
				let availableWidth = container.clientWidth - SCROLL_BUTTON_WIDTH * 2, scrollDistance = direction === "backward" ? -availableWidth : availableWidth;
				typeof scrollContainer.scrollBy == "function" ? scrollContainer.scrollBy({
					left: scrollDistance,
					behavior: "smooth"
				}) : scrollContainer.scrollLeft += scrollDistance;
			}, []), scrollBackward = (0, import_react$159.useCallback)(() => scroll("backward"), [scroll]), scrollForward = (0, import_react$159.useCallback)(() => scroll("forward"), [scroll]);
			return import_react$159.createElement(TabListContainer, {
				...rest,
				ref: containerRef,
				"data-show-scroll-buttons": showScrollButtons
			}, showScrollButtons && import_react$159.createElement(ScrollButtonContainer, { $showEndBorder: canScrollLeft }, import_react$159.createElement(ScrollButton, {
				variant: "ghost",
				padding: "small",
				size: "small",
				ariaLabel: "Scroll backward",
				disabled: !canScrollLeft,
				onClick: scrollBackward,
				tabIndex: -1
			}, import_react$159.createElement(ChevronSmallLeftIcon, null))), import_react$159.createElement(ScrollContainer, { ref: scrollContainerRef }, import_react$159.createElement(StyledTabList, {
				ref: tabListRef,
				...tabListProps
			}, [...state.collection].map((item) => import_react$159.createElement(TabButton2, {
				key: item.key,
				item,
				state
			})))), showScrollButtons && import_react$159.createElement(ScrollButtonContainer, { $showStartBorder: canScrollRight }, import_react$159.createElement(ScrollButton, {
				variant: "ghost",
				padding: "small",
				size: "small",
				ariaLabel: "Scroll forward",
				disabled: !canScrollRight,
				onClick: scrollForward,
				tabIndex: -1
			}, import_react$159.createElement(ChevronSmallRightIcon, null))));
		};
		Panel = styled.div({
			overflowY: "hidden",
			height: "100%"
		});
		TabPanel = ({ hasScrollbar = !0, renderAllChildren = !1, state }) => {
			let ref = (0, import_react$161.useRef)(null), typedState = state, { tabPanelProps } = $34bce698202e07cb$export$fae0121b5afe572d(typedState.selectedItem ?? {}, typedState, ref);
			return (renderAllChildren ? [...typedState.collection] : [typedState.selectedItem]).filter((item) => !!item).map((item) => {
				let isSelected = typedState.selectedKey === item.key;
				return import_react$161.createElement(Panel, {
					key: item.key,
					ref: isSelected ? ref : void 0,
					...isSelected ? tabPanelProps : {},
					id: isSelected ? `${tabPanelProps.id}`.replace(/null$/, `${item.key}`) : void 0,
					hidden: isSelected ? void 0 : !0
				}, hasScrollbar ? import_react$161.createElement(ScrollArea2, { vertical: !0 }, item.props.children) : item.props.children);
			});
		};
		$a02d57049d202695$export$d085fb9e920b5ca7 = class {
			*[Symbol.iterator]() {
				yield* this.iterable;
			}
			get size() {
				return this._size;
			}
			getKeys() {
				return this.keyMap.keys();
			}
			getKeyBefore(key) {
				let node = this.keyMap.get(key);
				var _node_prevKey;
				return node && (_node_prevKey = node.prevKey) !== null && _node_prevKey !== void 0 ? _node_prevKey : null;
			}
			getKeyAfter(key) {
				let node = this.keyMap.get(key);
				var _node_nextKey;
				return node && (_node_nextKey = node.nextKey) !== null && _node_nextKey !== void 0 ? _node_nextKey : null;
			}
			getFirstKey() {
				return this.firstKey;
			}
			getLastKey() {
				return this.lastKey;
			}
			getItem(key) {
				var _this_keyMap_get;
				return (_this_keyMap_get = this.keyMap.get(key)) !== null && _this_keyMap_get !== void 0 ? _this_keyMap_get : null;
			}
			at(idx) {
				let keys = [...this.getKeys()];
				return this.getItem(keys[idx]);
			}
			getChildren(key) {
				return this.keyMap.get(key)?.childNodes || [];
			}
			constructor(nodes) {
				this.keyMap = /* @__PURE__ */ new Map(), this.firstKey = null, this.lastKey = null, this.iterable = nodes;
				let visit = (node) => {
					if (this.keyMap.set(node.key, node), node.childNodes && node.type === "section") for (let child of node.childNodes) visit(child);
				};
				for (let node of nodes) visit(node);
				let last = null, index3 = 0, size = 0;
				for (let [key, node] of this.keyMap) last ? (last.nextKey = key, node.prevKey = last.key) : (this.firstKey = key, node.prevKey = void 0), node.type === "item" && (node.index = index3++), (node.type === "section" || node.type === "item") && size++, last = node, last.nextKey = void 0;
				this._size = size;
				var _last_key;
				this.lastKey = (_last_key = last?.key) !== null && _last_key !== void 0 ? _last_key : null;
			}
		};
		useTabsState = ({ defaultSelected, onSelectionChange, selected, tabs }) => $76f919a04c5a7d14$export$4ba071daf4e486({
			children: tabs.map(({ children: Children6, id, "aria-label": ariaLabel, title: Title6 }) => import_react$162.createElement($c1d7fb2ec91bae71$export$6d08773d2e66f8f2, {
				key: id,
				"aria-label": ariaLabel,
				title: typeof Title6 == "function" ? import_react$162.createElement(Title6, null) : Title6
			}, typeof Children6 == "function" ? import_react$162.createElement(Children6, null) : Children6)),
			disabledKeys: tabs.filter(({ isDisabled }) => isDisabled).map(({ id }) => id),
			defaultSelectedKey: defaultSelected,
			onSelectionChange: (key) => onSelectionChange?.(`${key}`),
			selectedKey: selected
		});
		Container4 = styled.div({
			display: "flex",
			flexDirection: "column",
			height: "100%"
		});
		FlexTabPanel = styled(TabPanel)(() => ({ flex: 1 }));
		FlexTabList = styled(TabList)(({ $simulatedGap }) => ({
			flex: "1 1 0%",
			"&[data-show-scroll-buttons=\"true\"]": { marginInlineEnd: $simulatedGap }
		}));
		TabsView = ({ backgroundColor, barInnerStyle, defaultSelected, emptyState, onSelectionChange, panelProps = {}, selected, showToolsWhenEmpty, tabs, tools, ...props }) => {
			let state = useTabsState({
				defaultSelected,
				onSelectionChange,
				selected,
				tabs
			}), EmptyContent = emptyState ?? import_react$162.createElement(EmptyTabContent, { title: "Nothing found" }), hasContent = tabs.length > 0;
			return !showToolsWhenEmpty && !hasContent ? EmptyContent : import_react$162.createElement(Container4, { ...props }, import_react$162.createElement(Bar, {
				scrollable: !1,
				border: !0,
				backgroundColor,
				innerStyle: {
					display: "flex",
					justifyContent: "space-between",
					paddingInlineStart: 0,
					paddingInlineEnd: 10,
					"> *:not(:last-child)": { order: 2 },
					"> *": { flexShrink: 0 },
					...barInnerStyle,
					gap: 0
				}
			}, tools, hasContent ? import_react$162.createElement(FlexTabList, {
				state,
				$simulatedGap: barInnerStyle?.gap ?? 6
			}) : import_react$162.createElement("div", null)), hasContent ? import_react$162.createElement(FlexTabPanel, {
				state,
				...panelProps
			}) : EmptyContent);
		};
		$5e8ad37a45e1c704$export$cfa7aa87c26e7d1f = (0, import_react$167.createContext)(null);
		$5e8ad37a45e1c704$export$364712098d2aa57c = (0, import_react$167.createContext)(null);
		$5e8ad37a45e1c704$export$b2539bed5023c21c = (0, import_react$167.forwardRef)(function(props, ref) {
			[props, ref] = $64fa3d84918910a7$export$29f1550f4b0d4415(props, ref, $5e8ad37a45e1c704$export$cfa7aa87c26e7d1f);
			let { children, orientation = "horizontal" } = props;
			return children = (0, import_react$167.useMemo)(() => typeof children == "function" ? children({
				orientation,
				defaultChildren: null
			}) : children, [children, orientation]), import_react$167.createElement($e1995378a142960e$export$bf788dd355e3a401, { content: children }, (collection) => import_react$167.createElement($5e8ad37a45e1c704$var$TabsInner, {
				props,
				collection,
				tabsRef: ref
			}));
		});
		$5e8ad37a45e1c704$export$e51a686c67fdaa2d = (0, import_react$167.forwardRef)(function(props, ref) {
			return (0, import_react$167.useContext)($5e8ad37a45e1c704$export$364712098d2aa57c) ? import_react$167.createElement($5e8ad37a45e1c704$var$TabListInner, {
				props,
				forwardedRef: ref
			}) : import_react$167.createElement($e1995378a142960e$export$fb8073518f34e6ec, props);
		});
		$5e8ad37a45e1c704$var$TabItemNode = class extends $23b9f4fcf0fe224b$export$d68d59712b04d9d1 {};
		$5e8ad37a45e1c704$var$TabItemNode.type = "item";
		$5e8ad37a45e1c704$export$3e41faf802a29e71 = $e1995378a142960e$export$18af5c7a9e9b3664($5e8ad37a45e1c704$var$TabItemNode, (props, forwardedRef, item) => {
			let state = (0, import_react$167.useContext)($5e8ad37a45e1c704$export$364712098d2aa57c), ref = $df56164dff5785e2$export$4338b53315abf666(forwardedRef), { tabProps, isSelected, isDisabled, isPressed } = $0175d55c2a017ebc$export$fdf4756d5b8ef90a({
				key: item.key,
				...props
			}, state, ref), { focusProps, isFocused, isFocusVisible } = $f7dceffc5ad7768b$export$4e328f61c538687f(), { hoverProps, isHovered } = $6179b936705e76d3$export$ae780daf29e6d456({
				isDisabled,
				onHoverStart: props.onHoverStart,
				onHoverEnd: props.onHoverEnd,
				onHoverChange: props.onHoverChange
			}), renderProps = $64fa3d84918910a7$export$4d86445c2cf5e3({
				...props,
				id: void 0,
				children: item.rendered,
				defaultClassName: "react-aria-Tab",
				values: {
					isSelected,
					isDisabled,
					isFocused,
					isFocusVisible,
					isPressed,
					isHovered
				}
			}), ElementType = item.props.href ? "a" : "div", DOMProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { global: !0 });
			return delete DOMProps.id, delete DOMProps.onClick, import_react$167.createElement(ElementType, {
				...$3ef42575df84b30b$export$9d1611c77c2fe928(DOMProps, renderProps, tabProps, focusProps, hoverProps),
				ref,
				"data-selected": isSelected || void 0,
				"data-disabled": isDisabled || void 0,
				"data-focused": isFocused || void 0,
				"data-focus-visible": isFocusVisible || void 0,
				"data-pressed": isPressed || void 0,
				"data-hovered": isHovered || void 0
			}, renderProps.children);
		});
		$5e8ad37a45e1c704$export$3d96ec278d3efce4 = $f39a9eba43920ace$export$86427a43e3e48ebb(function(props, forwardedRef) {
			let state = (0, import_react$167.useContext)($5e8ad37a45e1c704$export$364712098d2aa57c), ref = $df56164dff5785e2$export$4338b53315abf666(forwardedRef), { id, ...otherProps } = props, { tabPanelProps } = $34bce698202e07cb$export$fae0121b5afe572d(props, state, ref), { focusProps, isFocused, isFocusVisible } = $f7dceffc5ad7768b$export$4e328f61c538687f(), isSelected = state.selectedKey === props.id, renderProps = $64fa3d84918910a7$export$4d86445c2cf5e3({
				...props,
				defaultClassName: "react-aria-TabPanel",
				values: {
					isFocused,
					isFocusVisible,
					isInert: $cdc5a6778b766db2$export$a9d04c5684123369(!isSelected),
					state
				}
			});
			if (!isSelected && !props.shouldForceMount) return null;
			let DOMProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(otherProps, { global: !0 });
			delete DOMProps.id;
			let domProps = isSelected ? $3ef42575df84b30b$export$9d1611c77c2fe928(DOMProps, tabPanelProps, focusProps, renderProps) : renderProps;
			return import_react$167.createElement("div", {
				...domProps,
				ref,
				"data-focused": isFocused || void 0,
				"data-focus-visible": isFocusVisible || void 0,
				inert: $cdc5a6778b766db2$export$a9d04c5684123369(!isSelected || props.inert),
				"data-inert": isSelected ? void 0 : "true"
			}, import_react$167.createElement($64fa3d84918910a7$export$2881499e37b75b9a, { values: [[$5e8ad37a45e1c704$export$cfa7aa87c26e7d1f, null], [$5e8ad37a45e1c704$export$364712098d2aa57c, null]] }, import_react$167.createElement($7135fc7d473fd974$export$4feb769f8ddf26c5.Provider, { value: $7135fc7d473fd974$export$a164736487e3f0ae }, renderProps.children)));
		});
		styled.div({
			display: "flex",
			alignItems: "center",
			flexShrink: 0,
			position: "relative",
			overflow: "hidden"
		});
		styled.div({
			display: "flex",
			overflowX: "auto",
			scrollbarWidth: "none",
			msOverflowStyle: "none",
			WebkitScrollbar: "none",
			scrollSnapType: "x mandatory",
			flex: 1,
			"&::-webkit-scrollbar": { display: "none" }
		});
		styled($5e8ad37a45e1c704$export$e51a686c67fdaa2d)({
			display: "flex",
			flexShrink: 0
		});
		styled.div(({ $showStartBorder, $showEndBorder, theme }) => ({
			flexShrink: 0,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: 6,
			boxShadow: $showStartBorder ? `inset 1px 0 0 ${theme.appBorderColor}` : $showEndBorder ? `inset -1px 0 0 ${theme.appBorderColor}` : "none"
		}));
		styled(Button)({
			flexShrink: 0,
			paddingInline: 0,
			width: 16
		});
		styled($5e8ad37a45e1c704$export$3d96ec278d3efce4)({
			overflowY: "hidden",
			height: "100%",
			display: "block",
			"&[inert=\"true\"]": { display: "none" }
		});
		styled($5e8ad37a45e1c704$export$b2539bed5023c21c)(({ $simulatedGap }) => ({
			display: "flex",
			flexDirection: "column",
			height: "100%",
			".tablist": { flex: "1 1 100%" },
			".tablist.tablist-has-scroll": { marginInlineEnd: $simulatedGap },
			"& > :not(:first-child)": { flex: 1 }
		}));
		styled($5e8ad37a45e1c704$export$3e41faf802a29e71)(({ theme }) => ({
			whiteSpace: "normal",
			display: "inline-flex",
			overflow: "hidden",
			verticalAlign: "top",
			justifyContent: "center",
			alignItems: "center",
			textAlign: "center",
			textDecoration: "none",
			scrollSnapAlign: "start",
			"&:empty": { display: "none" },
			"&[hidden]": { display: "none" },
			padding: "0 15px",
			transition: "color 0.2s linear, border-bottom-color 0.2s linear",
			height: 40,
			lineHeight: "12px",
			cursor: "pointer",
			background: "transparent",
			border: "0 solid transparent",
			borderTop: "3px solid transparent",
			borderBottom: "3px solid transparent",
			fontWeight: "bold",
			fontSize: 13,
			"&:focus-visible": {
				outline: "0 none",
				boxShadow: `inset 0 0 0 2px ${theme.barSelectedColor}`
			},
			color: theme.barTextColor,
			borderBottomColor: "transparent",
			"&:hover": { color: theme.barHoverColor },
			"&[data-selected]": {
				color: theme.barSelectedColor,
				borderBottomColor: theme.barSelectedColor
			}
		}));
		rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;
		LoaderWrapper = styled.div(({ size = 32 }) => ({
			borderRadius: "50%",
			cursor: "progress",
			display: "inline-block",
			overflow: "hidden",
			position: "absolute",
			transition: "all 200ms ease-out",
			verticalAlign: "top",
			top: "50%",
			left: "50%",
			marginTop: -(size / 2),
			marginLeft: -(size / 2),
			height: size,
			width: size,
			zIndex: 4,
			borderWidth: 2,
			borderStyle: "solid",
			borderColor: "rgba(97, 97, 97, 0.29)",
			borderTopColor: "rgb(100,100,100)",
			animation: `${rotate360} 0.7s linear infinite`,
			mixBlendMode: "difference"
		}));
		ProgressWrapper = styled.div({
			position: "absolute",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			width: "100%",
			height: "100%"
		});
		ProgressTrack = styled.div(({ theme }) => ({
			position: "relative",
			width: "80%",
			marginBottom: "0.75rem",
			maxWidth: 300,
			height: 5,
			borderRadius: 5,
			background: curriedTransparentize$1(.8, theme.color.secondary),
			overflow: "hidden",
			cursor: "progress"
		}));
		ProgressBar2 = styled.div(({ theme }) => ({
			position: "absolute",
			top: 0,
			left: 0,
			height: "100%",
			background: theme.color.secondary
		}));
		ProgressMessage = styled.div(({ theme }) => ({
			minHeight: "2em",
			fontSize: `${theme.typography.size.s1}px`,
			color: theme.textMutedColor
		}));
		ErrorIcon = styled(LightningOffIcon)(({ theme }) => ({
			width: 20,
			height: 20,
			marginBottom: "0.5rem",
			color: theme.textMutedColor
		}));
		ellipsis = keyframes`
  from { content: "..." }
  33% { content: "." }
  66% { content: ".." }
  to { content: "..." }
`;
		Ellipsis = styled.span({ "&::after": {
			content: "'...'",
			animation: `${ellipsis} 1s linear infinite`,
			animationDelay: "1s",
			display: "inline-block",
			width: "1em",
			height: "auto"
		} });
		Loader = ({ progress, error, size, ...props }) => {
			if (error) return import_react$173.createElement(ProgressWrapper, {
				"aria-label": error.toString(),
				"aria-live": "polite",
				role: "status",
				...props
			}, import_react$173.createElement(ErrorIcon, null), import_react$173.createElement(ProgressMessage, null, error.message));
			if (progress) {
				let { value, modules } = progress, { message } = progress;
				return modules && (message += ` ${modules.complete} / ${modules.total} modules`), import_react$173.createElement(ProgressWrapper, {
					"aria-label": "Content is loading...",
					"aria-live": "polite",
					"aria-valuemin": 0,
					"aria-valuemax": 100,
					"aria-valuenow": value * 100,
					"aria-valuetext": message,
					role: "progressbar",
					...props
				}, import_react$173.createElement(ProgressTrack, null, import_react$173.createElement(ProgressBar2, { style: { width: `${value * 100}%` } })), import_react$173.createElement(ProgressMessage, null, message, value < 1 && import_react$173.createElement(Ellipsis, { key: message })));
			}
			return import_react$173.createElement(LoaderWrapper, {
				"aria-label": "Content is loading...",
				"aria-live": "polite",
				role: "status",
				size,
				...props
			});
		};
		rotate = keyframes({
			"0%": { transform: "rotate(0deg)" },
			"100%": { transform: "rotate(360deg)" }
		});
		styled.div(({ size }) => ({
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			position: "relative",
			minWidth: size,
			minHeight: size
		}));
		styled.svg(({ size, width }) => ({
			position: "absolute",
			width: `${size}px!important`,
			height: `${size}px!important`,
			transform: "rotate(-90deg)",
			circle: {
				r: (size - Math.ceil(width)) / 2,
				cx: size / 2,
				cy: size / 2,
				opacity: .15,
				fill: "transparent",
				stroke: "currentColor",
				strokeWidth: width,
				strokeLinecap: "round",
				strokeDasharray: Math.PI * (size - Math.ceil(width))
			}
		}), ({ progress }) => progress && { circle: { opacity: .75 } }, ({ spinner }) => spinner && {
			animation: `${rotate} 1s linear infinite`,
			circle: { opacity: .25 }
		});
		({deprecate: deprecate15} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		styled.pre`
  line-height: 18px;
  padding: 11px 1rem;
  white-space: pre-wrap;
  background: rgba(0, 0, 0, 0.05);
  color: ${color.darkest};
  border-radius: 3px;
  margin: 1rem 0;
  width: 100%;
  display: block;
  overflow: hidden;
  font-family: ${typography.fonts.mono};
  font-size: ${typography.size.s2 - 1}px;
`;
		components2 = components;
		resetComponents = {};
		Object.keys(components).forEach((key) => {
			resetComponents[key] = (0, import_react.forwardRef)((props, ref) => (0, import_react.createElement)(key, {
				...props,
				ref
			}));
		});
	})))();
}
//#endregion
export { withReset as C, nameSpaceClassNames as S, Zoom as _, ErrorFormatter as a, components_exports as b, H3 as c, PopoverProvider as d, ResetWrapper as f, Toolbar as g, ToggleButton as h, EmptyTabContent as i, Link2 as l, TabsView as m, Button as n, Form as o, SyntaxHighlighter as p, Code as r, H2 as s, Bar as t, Loader as u, codeCommon as v, init_chunk_NULBREPZ as w, init_components as x, components2 as y };
