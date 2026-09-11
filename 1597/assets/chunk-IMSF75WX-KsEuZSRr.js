import { i as __esmMin, o as __require$1 } from "./preload-helper-C_PogYeJ.js";
//#region ../../node_modules/.pnpm/storybook@10.5.3_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-3LY4VQVK.js
function dedent(templ) {
	for (var values = [], _i = 1; _i < arguments.length; _i++) values[_i - 1] = arguments[_i];
	var strings = Array.from(typeof templ == "string" ? [templ] : templ);
	strings[strings.length - 1] = strings[strings.length - 1].replace(/\r?\n([\t ]*)$/, "");
	var indentLengths = strings.reduce(function(arr, str) {
		var matches = str.match(/\n([\t ]+|(?!\s).)/g);
		return matches ? arr.concat(matches.map(function(match) {
			var _a, _b;
			return (_b = (_a = match.match(/[\t ]/g)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
		})) : arr;
	}, []);
	if (indentLengths.length) {
		var pattern_1 = new RegExp(`
[	 ]{` + Math.min.apply(Math, indentLengths) + "}", "g");
		strings = strings.map(function(str) {
			return str.replace(pattern_1, `
`);
		});
	}
	strings[0] = strings[0].replace(/^\r?\n/, "");
	var string = strings[0];
	return values.forEach(function(value, i) {
		var endentations = string.match(/(?:^|\n)( *)$/), endentation = endentations ? endentations[1] : "", indentedValue = value;
		typeof value == "string" && value.includes(`
`) && (indentedValue = String(value).split(`
`).map(function(str, i2) {
			return i2 === 0 ? str : "" + endentation + str;
		}).join(`
`)), string += indentedValue + strings[i + 1];
	}), string;
}
var init_chunk_3LY4VQVK = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.5.3_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-IMSF75WX.js
var __create, __defProp, __getOwnPropDesc, __getOwnPropNames, __getProtoOf, __hasOwnProp, __require, __commonJS, __export, __copyProps, __toESM;
var init_chunk_IMSF75WX = __esmMin((() => {
	__create = Object.create;
	__defProp = Object.defineProperty;
	__getOwnPropDesc = Object.getOwnPropertyDescriptor;
	__getOwnPropNames = Object.getOwnPropertyNames;
	__getProtoOf = Object.getPrototypeOf;
	__hasOwnProp = Object.prototype.hasOwnProperty;
	__require = /* @__PURE__ */ ((x) => typeof __require$1 < "u" ? __require$1 : typeof Proxy < "u" ? new Proxy(x, { get: (a, b) => (typeof __require$1 < "u" ? __require$1 : a)[b] }) : x)(function(x) {
		if (typeof __require$1 < "u") return __require$1.apply(this, arguments);
		throw Error("Dynamic require of \"" + x + "\" is not supported");
	});
	__commonJS = (cb, mod) => function() {
		try {
			return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
		} catch (e) {
			throw mod = 0, e;
		}
	};
	__export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: !0
		});
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
}));
//#endregion
export { init_chunk_IMSF75WX as a, __toESM as i, __export as n, dedent as o, __require as r, init_chunk_3LY4VQVK as s, __commonJS as t };
