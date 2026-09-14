const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Color-6AOWCN3U-3RYGKdrP.js","./rolldown-runtime-htSClZ5J.js","./react-Dtiv5CLt.js","./components-BInfUg2s.js","./preload-helper-BeSU7fTM.js","./chunk-5GYAEUAU-BL4iSSl-.js","./chunk-IMSF75WX-OIrIWSK4.js","./chunk-DRQKCCAG-BV9cmDsC.js","./jsx-runtime-BpuwJHEg.js","./react-dom-COAM6TrF.js","./chunk-W22LQPXL-ChF6hCUR.js","./theming-BErEndj3.js","./chunk-242VQQM5-C8S23hGM.js","./shim-CTbUWdlf.js","./chunk-UAWMPV5J-D51fq2Gn.js","./chunk-QQBDHPVZ-C7Xid1BS.js"])))=>i.map(i=>d[i]);
import { a as __toESM$1, n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-BeSU7fTM.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { h as mergeServiceArgTypes, m as init_chunk_FLUL445Z, n as SourceType, p as getServiceSubcomponentArgTypes, t as SNIPPET_RENDERED, u as init_chunk_OA6XKWIN } from "./chunk-OA6XKWIN-1auXapkm.js";
import { A as DocumentIcon, B as ZoomResetIcon, C as withReset, D as ChevronSmallDownIcon, E as ChevronRightIcon, F as SubtractIcon, H as includeConditionalArg, I as SyncIcon, L as UndoIcon, M as LinkIcon, N as MarkupIcon, O as ChevronSmallUpIcon, P as ShareAltIcon, R as ZoomIcon, S as nameSpaceClassNames, T as ChevronDownIcon$1, U as init_csf, V as init_dist, W as init_open_service, _ as Zoom, a as ErrorFormatter, c as H3, d as PopoverProvider, f as ResetWrapper, g as Toolbar$1, h as ToggleButton, i as EmptyTabContent, j as EditIcon, k as CopyIcon, l as Link2, m as TabsView, n as Button, o as Form, p as SyntaxHighlighter, r as Code, s as H2, t as Bar, u as Loader, v as codeCommon, w as AddIcon, x as init_components, y as components2, z as ZoomOutIcon } from "./components-BInfUg2s.js";
import { t as require_react_dom } from "./react-dom-COAM6TrF.js";
import { i as useMDXComponents, t as init_react } from "./react-CHjXpGuL.js";
import { n as getControlSetterButtonId, r as init_chunk_QQBDHPVZ, t as getControlId } from "./chunk-QQBDHPVZ-C7Xid1BS.js";
import { _ as themes, a as init_theming, c as srOnlyStyles, f as useTheme, i as ignoreSsrWarning, l as srOnlyUnsetStyles, n as convert, r as ensure, t as ThemeProvider, u as styled } from "./theming-BErEndj3.js";
//#region ../../node_modules/.pnpm/storybook@10.5.3_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-GWNTJ7C3.js
function prependImportToSnippet(importBlock, snippet) {
	let trimmedImport = importBlock?.trim();
	return trimmedImport ? `${trimmedImport}

${snippet}` : snippet;
}
function selectStoryDoc(payload, storyId) {
	return payload?.stories[storyId];
}
function selectSnippetForStory(payload, storyId) {
	let story = payload?.stories[storyId];
	if (story?.snippet !== void 0) return prependImportToSnippet(payload?.import, story.snippet);
}
function init_chunk_GWNTJ7C3() {
	return (init_chunk_GWNTJ7C3 = __esmMin((() => {})))();
}
//#endregion
//#region ../../node_modules/.pnpm/storybook@10.5.3_@types+react@19.2.14_prettier@3.8.2_react@19.2.5/node_modules/storybook/dist/_browser-chunks/chunk-QC4HFS6K.js
function buildQueryState(data, lifecycle) {
	let isPending = lifecycle.status === "pending", isLoading = lifecycle.loadStatus === "loading";
	return {
		data,
		error: lifecycle.error,
		status: lifecycle.status,
		loadStatus: lifecycle.loadStatus,
		isPending,
		isSuccess: lifecycle.status === "success",
		isError: lifecycle.status === "error",
		isLoading,
		isInitialLoading: isPending && isLoading && data === void 0,
		isRefreshing: isLoading && !isPending
	};
}
function toError(value) {
	return value instanceof Error ? value : new Error(String(value));
}
function seedQueryState(query, input, selector) {
	try {
		let output = query.get(input);
		return buildQueryState(selector ? selector(output) : output, {
			status: "pending",
			error: void 0,
			loadStatus: "loading"
		});
	} catch (error) {
		return buildQueryState(void 0, {
			status: "error",
			error: toError(error),
			loadStatus: "idle"
		});
	}
}
function init_chunk_QC4HFS6K() {
	return (init_chunk_QC4HFS6K = __esmMin((() => {})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@storybook+addon-docs@10.5.3_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_79f0c9ed95d1b34ec286c75f3993b3a1/node_modules/@storybook/addon-docs/dist/_browser-chunks/chunk-SPXYZZB5.js
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
function _assertThisInitialized(e) {
	if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function _setPrototypeOf(t, e) {
	return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
		return t2.__proto__ = e2, t2;
	}, _setPrototypeOf(t, e);
}
function _inheritsLoose(t, o) {
	t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
function _getPrototypeOf(t) {
	return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
		return t2.__proto__ || Object.getPrototypeOf(t2);
	}, _getPrototypeOf(t);
}
function _isNativeFunction(t) {
	try {
		return Function.toString.call(t).indexOf("[native code]") !== -1;
	} catch {
		return typeof t == "function";
	}
}
function _isNativeReflectConstruct() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch {}
	return (_isNativeReflectConstruct = function() {
		return !!t;
	})();
}
function _construct(t, e, r) {
	if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
	var o = [null];
	o.push.apply(o, e);
	var p = new (t.bind.apply(t, o))();
	return r && _setPrototypeOf(p, r.prototype), p;
}
function _wrapNativeSuper(t) {
	var r = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
	return _wrapNativeSuper = function(t2) {
		if (t2 === null || !_isNativeFunction(t2)) return t2;
		if (typeof t2 != "function") throw new TypeError("Super expression must either be null or a function");
		if (r !== void 0) {
			if (r.has(t2)) return r.get(t2);
			r.set(t2, Wrapper2);
		}
		function Wrapper2() {
			return _construct(t2, arguments, _getPrototypeOf(this).constructor);
		}
		return Wrapper2.prototype = Object.create(t2.prototype, { constructor: {
			value: Wrapper2,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), _setPrototypeOf(Wrapper2, t2);
	}, _wrapNativeSuper(t);
}
function endsWith(string, suffix) {
	return string.substr(-suffix.length) === suffix;
}
function stripUnit(value) {
	if (typeof value != "string") return value;
	return value.match(cssRegex$1) ? parseFloat(value) : value;
}
function colorToInt(color) {
	return Math.round(color * 255);
}
function convertToInt(red, green, blue) {
	return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
}
function hslToRgb(hue, saturation, lightness, convert2) {
	if (convert2 === void 0 && (convert2 = convertToInt), saturation === 0) return convert2(lightness, lightness, lightness);
	var huePrime = (hue % 360 + 360) % 360 / 60, chroma = (1 - Math.abs(2 * lightness - 1)) * saturation, secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1)), red = 0, green = 0, blue = 0;
	huePrime >= 0 && huePrime < 1 ? (red = chroma, green = secondComponent) : huePrime >= 1 && huePrime < 2 ? (red = secondComponent, green = chroma) : huePrime >= 2 && huePrime < 3 ? (green = chroma, blue = secondComponent) : huePrime >= 3 && huePrime < 4 ? (green = secondComponent, blue = chroma) : huePrime >= 4 && huePrime < 5 ? (red = secondComponent, blue = chroma) : huePrime >= 5 && huePrime < 6 && (red = chroma, blue = secondComponent);
	var lightnessModification = lightness - chroma / 2, finalRed = red + lightnessModification, finalGreen = green + lightnessModification, finalBlue = blue + lightnessModification;
	return convert2(finalRed, finalGreen, finalBlue);
}
function nameToHex(color) {
	if (typeof color != "string") return color;
	var normalizedColorName = color.toLowerCase();
	return namedColorMap[normalizedColorName] ? "#" + namedColorMap[normalizedColorName] : color;
}
function parseToRgb(color) {
	if (typeof color != "string") throw new PolishedError(3);
	var normalizedColor = nameToHex(color);
	if (normalizedColor.match(hexRegex)) return {
		red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
		green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
		blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16)
	};
	if (normalizedColor.match(hexRgbaRegex)) {
		var alpha = parseFloat((parseInt("" + normalizedColor[7] + normalizedColor[8], 16) / 255).toFixed(2));
		return {
			red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
			green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
			blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16),
			alpha
		};
	}
	if (normalizedColor.match(reducedHexRegex)) return {
		red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
		green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
		blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16)
	};
	if (normalizedColor.match(reducedRgbaHexRegex)) {
		var _alpha = parseFloat((parseInt("" + normalizedColor[4] + normalizedColor[4], 16) / 255).toFixed(2));
		return {
			red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
			green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
			blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16),
			alpha: _alpha
		};
	}
	var rgbMatched = rgbRegex.exec(normalizedColor);
	if (rgbMatched) return {
		red: parseInt("" + rgbMatched[1], 10),
		green: parseInt("" + rgbMatched[2], 10),
		blue: parseInt("" + rgbMatched[3], 10)
	};
	var rgbaMatched = rgbaRegex.exec(normalizedColor.substring(0, 50));
	if (rgbaMatched) return {
		red: parseInt("" + rgbaMatched[1], 10),
		green: parseInt("" + rgbaMatched[2], 10),
		blue: parseInt("" + rgbaMatched[3], 10),
		alpha: parseFloat("" + rgbaMatched[4]) > 1 ? parseFloat("" + rgbaMatched[4]) / 100 : parseFloat("" + rgbaMatched[4])
	};
	var hslMatched = hslRegex.exec(normalizedColor);
	if (hslMatched) {
		var rgbColorString = "rgb(" + hslToRgb(parseInt("" + hslMatched[1], 10), parseInt("" + hslMatched[2], 10) / 100, parseInt("" + hslMatched[3], 10) / 100) + ")", hslRgbMatched = rgbRegex.exec(rgbColorString);
		if (!hslRgbMatched) throw new PolishedError(4, normalizedColor, rgbColorString);
		return {
			red: parseInt("" + hslRgbMatched[1], 10),
			green: parseInt("" + hslRgbMatched[2], 10),
			blue: parseInt("" + hslRgbMatched[3], 10)
		};
	}
	var hslaMatched = hslaRegex.exec(normalizedColor.substring(0, 50));
	if (hslaMatched) {
		var _rgbColorString = "rgb(" + hslToRgb(parseInt("" + hslaMatched[1], 10), parseInt("" + hslaMatched[2], 10) / 100, parseInt("" + hslaMatched[3], 10) / 100) + ")", _hslRgbMatched = rgbRegex.exec(_rgbColorString);
		if (!_hslRgbMatched) throw new PolishedError(4, normalizedColor, _rgbColorString);
		return {
			red: parseInt("" + _hslRgbMatched[1], 10),
			green: parseInt("" + _hslRgbMatched[2], 10),
			blue: parseInt("" + _hslRgbMatched[3], 10),
			alpha: parseFloat("" + hslaMatched[4]) > 1 ? parseFloat("" + hslaMatched[4]) / 100 : parseFloat("" + hslaMatched[4])
		};
	}
	throw new PolishedError(5);
}
function rgbToHsl(color) {
	var red = color.red / 255, green = color.green / 255, blue = color.blue / 255, max = Math.max(red, green, blue), min = Math.min(red, green, blue), lightness = (max + min) / 2;
	if (max === min) return color.alpha !== void 0 ? {
		hue: 0,
		saturation: 0,
		lightness,
		alpha: color.alpha
	} : {
		hue: 0,
		saturation: 0,
		lightness
	};
	var hue, delta = max - min, saturation = lightness > .5 ? delta / (2 - max - min) : delta / (max + min);
	switch (max) {
		case red:
			hue = (green - blue) / delta + (green < blue ? 6 : 0);
			break;
		case green:
			hue = (blue - red) / delta + 2;
			break;
		default: hue = (red - green) / delta + 4;
	}
	return hue *= 60, color.alpha !== void 0 ? {
		hue,
		saturation,
		lightness,
		alpha: color.alpha
	} : {
		hue,
		saturation,
		lightness
	};
}
function parseToHsl(color) {
	return rgbToHsl(parseToRgb(color));
}
function numberToHex(value) {
	var hex = value.toString(16);
	return hex.length === 1 ? "0" + hex : hex;
}
function colorToHex(color) {
	return numberToHex(Math.round(color * 255));
}
function convertToHex(red, green, blue) {
	return reduceHexValue$1("#" + colorToHex(red) + colorToHex(green) + colorToHex(blue));
}
function hslToHex(hue, saturation, lightness) {
	return hslToRgb(hue, saturation, lightness, convertToHex);
}
function hsl(value, saturation, lightness) {
	if (typeof value == "number" && typeof saturation == "number" && typeof lightness == "number") return hslToHex(value, saturation, lightness);
	if (typeof value == "object" && saturation === void 0 && lightness === void 0) return hslToHex(value.hue, value.saturation, value.lightness);
	throw new PolishedError(1);
}
function hsla(value, saturation, lightness, alpha) {
	if (typeof value == "number" && typeof saturation == "number" && typeof lightness == "number" && typeof alpha == "number") return alpha >= 1 ? hslToHex(value, saturation, lightness) : "rgba(" + hslToRgb(value, saturation, lightness) + "," + alpha + ")";
	if (typeof value == "object" && saturation === void 0 && lightness === void 0 && alpha === void 0) return value.alpha >= 1 ? hslToHex(value.hue, value.saturation, value.lightness) : "rgba(" + hslToRgb(value.hue, value.saturation, value.lightness) + "," + value.alpha + ")";
	throw new PolishedError(2);
}
function rgb(value, green, blue) {
	if (typeof value == "number" && typeof green == "number" && typeof blue == "number") return reduceHexValue$1("#" + numberToHex(value) + numberToHex(green) + numberToHex(blue));
	if (typeof value == "object" && green === void 0 && blue === void 0) return reduceHexValue$1("#" + numberToHex(value.red) + numberToHex(value.green) + numberToHex(value.blue));
	throw new PolishedError(6);
}
function rgba(firstValue, secondValue, thirdValue, fourthValue) {
	if (typeof firstValue == "string" && typeof secondValue == "number") {
		var rgbValue = parseToRgb(firstValue);
		return "rgba(" + rgbValue.red + "," + rgbValue.green + "," + rgbValue.blue + "," + secondValue + ")";
	} else {
		if (typeof firstValue == "number" && typeof secondValue == "number" && typeof thirdValue == "number" && typeof fourthValue == "number") return fourthValue >= 1 ? rgb(firstValue, secondValue, thirdValue) : "rgba(" + firstValue + "," + secondValue + "," + thirdValue + "," + fourthValue + ")";
		if (typeof firstValue == "object" && secondValue === void 0 && thirdValue === void 0 && fourthValue === void 0) return firstValue.alpha >= 1 ? rgb(firstValue.red, firstValue.green, firstValue.blue) : "rgba(" + firstValue.red + "," + firstValue.green + "," + firstValue.blue + "," + firstValue.alpha + ")";
	}
	throw new PolishedError(7);
}
function toColorString(color) {
	if (typeof color != "object") throw new PolishedError(8);
	if (isRgba(color)) return rgba(color);
	if (isRgb(color)) return rgb(color);
	if (isHsla(color)) return hsla(color);
	if (isHsl(color)) return hsl(color);
	throw new PolishedError(8);
}
function curried(f, length, acc) {
	return function() {
		var combined = acc.concat(Array.prototype.slice.call(arguments));
		return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
	};
}
function curry(f) {
	return curried(f, f.length, []);
}
function adjustHue(degree, color) {
	if (color === "transparent") return color;
	var hslColor = parseToHsl(color);
	return toColorString(_extends({}, hslColor, { hue: hslColor.hue + parseFloat(degree) }));
}
function guard(lowerBoundary, upperBoundary, value) {
	return Math.max(lowerBoundary, Math.min(upperBoundary, value));
}
function darken(amount, color) {
	if (color === "transparent") return color;
	var hslColor = parseToHsl(color);
	return toColorString(_extends({}, hslColor, { lightness: guard(0, 1, hslColor.lightness - parseFloat(amount)) }));
}
function desaturate(amount, color) {
	if (color === "transparent") return color;
	var hslColor = parseToHsl(color);
	return toColorString(_extends({}, hslColor, { saturation: guard(0, 1, hslColor.saturation - parseFloat(amount)) }));
}
function lighten(amount, color) {
	if (color === "transparent") return color;
	var hslColor = parseToHsl(color);
	return toColorString(_extends({}, hslColor, { lightness: guard(0, 1, hslColor.lightness + parseFloat(amount)) }));
}
function mix(weight, color, otherColor) {
	if (color === "transparent") return otherColor;
	if (otherColor === "transparent") return color;
	if (weight === 0) return otherColor;
	var parsedColor1 = parseToRgb(color), color1 = _extends({}, parsedColor1, { alpha: typeof parsedColor1.alpha == "number" ? parsedColor1.alpha : 1 }), parsedColor2 = parseToRgb(otherColor), color2 = _extends({}, parsedColor2, { alpha: typeof parsedColor2.alpha == "number" ? parsedColor2.alpha : 1 }), alphaDelta = color1.alpha - color2.alpha, x = parseFloat(weight) * 2 - 1, weight1 = ((x * alphaDelta === -1 ? x : x + alphaDelta) / (1 + x * alphaDelta) + 1) / 2, weight2 = 1 - weight1;
	return rgba({
		red: Math.floor(color1.red * weight1 + color2.red * weight2),
		green: Math.floor(color1.green * weight1 + color2.green * weight2),
		blue: Math.floor(color1.blue * weight1 + color2.blue * weight2),
		alpha: color1.alpha * parseFloat(weight) + color2.alpha * (1 - parseFloat(weight))
	});
}
function opacify(amount, color) {
	if (color === "transparent") return color;
	var parsedColor = parseToRgb(color), alpha = typeof parsedColor.alpha == "number" ? parsedColor.alpha : 1;
	return rgba(_extends({}, parsedColor, { alpha: guard(0, 1, (alpha * 100 + parseFloat(amount) * 100) / 100) }));
}
function saturate(amount, color) {
	if (color === "transparent") return color;
	var hslColor = parseToHsl(color);
	return toColorString(_extends({}, hslColor, { saturation: guard(0, 1, hslColor.saturation + parseFloat(amount)) }));
}
function setHue(hue, color) {
	return color === "transparent" ? color : toColorString(_extends({}, parseToHsl(color), { hue: parseFloat(hue) }));
}
function setLightness(lightness, color) {
	return color === "transparent" ? color : toColorString(_extends({}, parseToHsl(color), { lightness: parseFloat(lightness) }));
}
function setSaturation(saturation, color) {
	return color === "transparent" ? color : toColorString(_extends({}, parseToHsl(color), { saturation: parseFloat(saturation) }));
}
function shade(percentage, color) {
	return color === "transparent" ? color : mix$1(parseFloat(percentage), "rgb(0, 0, 0)", color);
}
function tint(percentage, color) {
	return color === "transparent" ? color : mix$1(parseFloat(percentage), "rgb(255, 255, 255)", color);
}
function transparentize(amount, color) {
	if (color === "transparent") return color;
	var parsedColor = parseToRgb(color), alpha = typeof parsedColor.alpha == "number" ? parsedColor.alpha : 1;
	return rgba(_extends({}, parsedColor, { alpha: guard(0, 1, +(alpha * 100 - parseFloat(amount) * 100).toFixed(2) / 100) }));
}
var import_react$94, import_react$95, PolishedError, cssRegex$1, pxtoFactory, pixelsto, namedColorMap, hexRegex, hexRgbaRegex, reducedHexRegex, reducedRgbaHexRegex, rgbRegex, rgbaRegex, hslRegex, hslaRegex, reduceHexValue, reduceHexValue$1, isRgb, isRgba, isHsl, isHsla, curriedDarken$1, curriedLighten$1, mix$1, curriedOpacify$1, curriedTransparentize$1, Wrapper$1, EmptyBlock, StyledSyntaxHighlighter, SourceSkeletonWrapper, SourceSkeletonPlaceholder, SourceSkeleton, Source;
function init_chunk_SPXYZZB5() {
	return (init_chunk_SPXYZZB5 = __esmMin((() => {
		import_react$94 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		init_components();
		init_theming();
		import_react$95 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		PolishedError = (function(_Error) {
			_inheritsLoose(PolishedError2, _Error);
			function PolishedError2(code) {
				return _assertThisInitialized(_Error.call(this, "An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#" + code + " for more information.") || this);
			}
			return PolishedError2;
		})(_wrapNativeSuper(Error));
		cssRegex$1 = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
		pxtoFactory = function(to) {
			return function(pxval, base) {
				base === void 0 && (base = "16px");
				var newPxval = pxval, newBase = base;
				if (typeof pxval == "string") {
					if (!endsWith(pxval, "px")) throw new PolishedError(69, to, pxval);
					newPxval = stripUnit(pxval);
				}
				if (typeof base == "string") {
					if (!endsWith(base, "px")) throw new PolishedError(70, to, base);
					newBase = stripUnit(base);
				}
				if (typeof newPxval == "string") throw new PolishedError(71, pxval, to);
				if (typeof newBase == "string") throw new PolishedError(72, base, to);
				return "" + newPxval / newBase + to;
			};
		};
		pixelsto = pxtoFactory;
		pixelsto("em");
		pixelsto("rem");
		namedColorMap = {
			aliceblue: "f0f8ff",
			antiquewhite: "faebd7",
			aqua: "00ffff",
			aquamarine: "7fffd4",
			azure: "f0ffff",
			beige: "f5f5dc",
			bisque: "ffe4c4",
			black: "000",
			blanchedalmond: "ffebcd",
			blue: "0000ff",
			blueviolet: "8a2be2",
			brown: "a52a2a",
			burlywood: "deb887",
			cadetblue: "5f9ea0",
			chartreuse: "7fff00",
			chocolate: "d2691e",
			coral: "ff7f50",
			cornflowerblue: "6495ed",
			cornsilk: "fff8dc",
			crimson: "dc143c",
			cyan: "00ffff",
			darkblue: "00008b",
			darkcyan: "008b8b",
			darkgoldenrod: "b8860b",
			darkgray: "a9a9a9",
			darkgreen: "006400",
			darkgrey: "a9a9a9",
			darkkhaki: "bdb76b",
			darkmagenta: "8b008b",
			darkolivegreen: "556b2f",
			darkorange: "ff8c00",
			darkorchid: "9932cc",
			darkred: "8b0000",
			darksalmon: "e9967a",
			darkseagreen: "8fbc8f",
			darkslateblue: "483d8b",
			darkslategray: "2f4f4f",
			darkslategrey: "2f4f4f",
			darkturquoise: "00ced1",
			darkviolet: "9400d3",
			deeppink: "ff1493",
			deepskyblue: "00bfff",
			dimgray: "696969",
			dimgrey: "696969",
			dodgerblue: "1e90ff",
			firebrick: "b22222",
			floralwhite: "fffaf0",
			forestgreen: "228b22",
			fuchsia: "ff00ff",
			gainsboro: "dcdcdc",
			ghostwhite: "f8f8ff",
			gold: "ffd700",
			goldenrod: "daa520",
			gray: "808080",
			green: "008000",
			greenyellow: "adff2f",
			grey: "808080",
			honeydew: "f0fff0",
			hotpink: "ff69b4",
			indianred: "cd5c5c",
			indigo: "4b0082",
			ivory: "fffff0",
			khaki: "f0e68c",
			lavender: "e6e6fa",
			lavenderblush: "fff0f5",
			lawngreen: "7cfc00",
			lemonchiffon: "fffacd",
			lightblue: "add8e6",
			lightcoral: "f08080",
			lightcyan: "e0ffff",
			lightgoldenrodyellow: "fafad2",
			lightgray: "d3d3d3",
			lightgreen: "90ee90",
			lightgrey: "d3d3d3",
			lightpink: "ffb6c1",
			lightsalmon: "ffa07a",
			lightseagreen: "20b2aa",
			lightskyblue: "87cefa",
			lightslategray: "789",
			lightslategrey: "789",
			lightsteelblue: "b0c4de",
			lightyellow: "ffffe0",
			lime: "0f0",
			limegreen: "32cd32",
			linen: "faf0e6",
			magenta: "f0f",
			maroon: "800000",
			mediumaquamarine: "66cdaa",
			mediumblue: "0000cd",
			mediumorchid: "ba55d3",
			mediumpurple: "9370db",
			mediumseagreen: "3cb371",
			mediumslateblue: "7b68ee",
			mediumspringgreen: "00fa9a",
			mediumturquoise: "48d1cc",
			mediumvioletred: "c71585",
			midnightblue: "191970",
			mintcream: "f5fffa",
			mistyrose: "ffe4e1",
			moccasin: "ffe4b5",
			navajowhite: "ffdead",
			navy: "000080",
			oldlace: "fdf5e6",
			olive: "808000",
			olivedrab: "6b8e23",
			orange: "ffa500",
			orangered: "ff4500",
			orchid: "da70d6",
			palegoldenrod: "eee8aa",
			palegreen: "98fb98",
			paleturquoise: "afeeee",
			palevioletred: "db7093",
			papayawhip: "ffefd5",
			peachpuff: "ffdab9",
			peru: "cd853f",
			pink: "ffc0cb",
			plum: "dda0dd",
			powderblue: "b0e0e6",
			purple: "800080",
			rebeccapurple: "639",
			red: "f00",
			rosybrown: "bc8f8f",
			royalblue: "4169e1",
			saddlebrown: "8b4513",
			salmon: "fa8072",
			sandybrown: "f4a460",
			seagreen: "2e8b57",
			seashell: "fff5ee",
			sienna: "a0522d",
			silver: "c0c0c0",
			skyblue: "87ceeb",
			slateblue: "6a5acd",
			slategray: "708090",
			slategrey: "708090",
			snow: "fffafa",
			springgreen: "00ff7f",
			steelblue: "4682b4",
			tan: "d2b48c",
			teal: "008080",
			thistle: "d8bfd8",
			tomato: "ff6347",
			turquoise: "40e0d0",
			violet: "ee82ee",
			wheat: "f5deb3",
			white: "fff",
			whitesmoke: "f5f5f5",
			yellow: "ff0",
			yellowgreen: "9acd32"
		};
		hexRegex = /^#[a-fA-F0-9]{6}$/;
		hexRgbaRegex = /^#[a-fA-F0-9]{8}$/;
		reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
		reducedRgbaHexRegex = /^#[a-fA-F0-9]{4}$/;
		rgbRegex = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i;
		rgbaRegex = /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
		hslRegex = /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i;
		hslaRegex = /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
		reduceHexValue = function(value) {
			return value.length === 7 && value[1] === value[2] && value[3] === value[4] && value[5] === value[6] ? "#" + value[1] + value[3] + value[5] : value;
		};
		reduceHexValue$1 = reduceHexValue;
		isRgb = function(color) {
			return typeof color.red == "number" && typeof color.green == "number" && typeof color.blue == "number" && (typeof color.alpha != "number" || typeof color.alpha > "u");
		};
		isRgba = function(color) {
			return typeof color.red == "number" && typeof color.green == "number" && typeof color.blue == "number" && typeof color.alpha == "number";
		};
		isHsl = function(color) {
			return typeof color.hue == "number" && typeof color.saturation == "number" && typeof color.lightness == "number" && (typeof color.alpha != "number" || typeof color.alpha > "u");
		};
		isHsla = function(color) {
			return typeof color.hue == "number" && typeof color.saturation == "number" && typeof color.lightness == "number" && typeof color.alpha == "number";
		};
		curry(adjustHue);
		curriedDarken$1 = curry(darken);
		curry(desaturate);
		curriedLighten$1 = curry(lighten);
		mix$1 = curry(mix);
		curriedOpacify$1 = curry(opacify);
		curry(saturate);
		curry(setHue);
		curry(setLightness);
		curry(setSaturation);
		curry(shade);
		curry(tint);
		curriedTransparentize$1 = curry(transparentize);
		Wrapper$1 = styled.div(withReset, ({ theme }) => ({
			backgroundColor: theme.base === "light" ? "rgba(0,0,0,.01)" : "rgba(255,255,255,.01)",
			borderRadius: theme.appBorderRadius,
			border: `1px dashed ${theme.appBorderColor}`,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: 20,
			margin: "25px 0 40px",
			color: curriedTransparentize$1(.3, theme.color.defaultText),
			fontSize: theme.typography.size.s2
		}));
		EmptyBlock = (props) => import_react$95.createElement(Wrapper$1, {
			...props,
			className: "docblock-emptyblock sb-unstyled"
		});
		StyledSyntaxHighlighter = styled(SyntaxHighlighter)(({ theme }) => ({
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
		SourceSkeletonWrapper = styled.div(({ theme }) => ({
			background: theme.background.content,
			borderRadius: theme.appBorderRadius,
			border: `1px solid ${theme.appBorderColor}`,
			boxShadow: theme.base === "light" ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0" : "rgba(0, 0, 0, 0.20) 0 2px 5px 0",
			margin: "25px 0 40px",
			padding: "20px 20px 20px 22px"
		}));
		SourceSkeletonPlaceholder = styled.div(({ theme }) => ({
			animation: `${theme.animation.glow} 1.5s ease-in-out infinite`,
			background: theme.appBorderColor,
			height: 17,
			marginTop: 1,
			width: "60%",
			[`&:first-child${ignoreSsrWarning}`]: { margin: 0 }
		}));
		SourceSkeleton = () => import_react$94.createElement(SourceSkeletonWrapper, null, import_react$94.createElement(SourceSkeletonPlaceholder, null), import_react$94.createElement(SourceSkeletonPlaceholder, { style: { width: "80%" } }), import_react$94.createElement(SourceSkeletonPlaceholder, { style: { width: "30%" } }), import_react$94.createElement(SourceSkeletonPlaceholder, { style: { width: "80%" } }));
		Source = ({ isLoading, error, language, code, dark, format: format2 = !0, copyable = !0, ...rest }) => {
			let { typography } = useTheme();
			if (isLoading) return import_react$94.createElement(SourceSkeleton, null);
			if (error) return import_react$94.createElement(EmptyBlock, null, error);
			let syntaxHighlighter = import_react$94.createElement(StyledSyntaxHighlighter, {
				bordered: !0,
				copyable,
				format: format2,
				language: language ?? "jsx",
				className: "docblock-source sb-unstyled",
				...rest
			}, code);
			if (typeof dark > "u") return syntaxHighlighter;
			let overrideTheme = dark ? themes.dark : themes.light;
			return import_react$94.createElement(ThemeProvider, { theme: convert({
				...overrideTheme,
				fontCode: typography.fonts.mono,
				fontBase: typography.fonts.base
			}) }, syntaxHighlighter);
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/ts-dedent@2.2.0/node_modules/ts-dedent/esm/index.js
function dedent(templ) {
	var values = [];
	for (var _i = 1; _i < arguments.length; _i++) values[_i - 1] = arguments[_i];
	var strings = Array.from(typeof templ === "string" ? [templ] : templ);
	strings[strings.length - 1] = strings[strings.length - 1].replace(/\r?\n([\t ]*)$/, "");
	var indentLengths = strings.reduce(function(arr, str) {
		var matches = str.match(/\n([\t ]+|(?!\s).)/g);
		if (matches) return arr.concat(matches.map(function(match) {
			var _a, _b;
			return (_b = (_a = match.match(/[\t ]/g)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
		}));
		return arr;
	}, []);
	if (indentLengths.length) {
		var pattern_1 = new RegExp("\n[	 ]{" + Math.min.apply(Math, indentLengths) + "}", "g");
		strings = strings.map(function(str) {
			return str.replace(pattern_1, "\n");
		});
	}
	strings[0] = strings[0].replace(/^\r?\n/, "");
	var string = strings[0];
	values.forEach(function(value, i) {
		var endentations = string.match(/(?:^|\n)( *)$/);
		var endentation = endentations ? endentations[1] : "";
		var indentedValue = value;
		if (typeof value === "string" && value.includes("\n")) indentedValue = String(value).split("\n").map(function(str, i) {
			return i === 0 ? str : "" + endentation + str;
		}).join("\n");
		string += indentedValue + strings[i + 1];
	});
	return string;
}
function init_esm() {
	return (init_esm = __esmMin((() => {})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@storybook+addon-docs@10.5.3_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_79f0c9ed95d1b34ec286c75f3993b3a1/node_modules/@storybook/addon-docs/dist/blocks.js
function isPrimitive(value) {
	return value == null || typeof value != "object" && typeof value != "function";
}
function isTypedArray(x2) {
	return ArrayBuffer.isView(x2) && !(x2 instanceof DataView);
}
function getSymbols(object) {
	return Object.getOwnPropertySymbols(object).filter((symbol) => Object.prototype.propertyIsEnumerable.call(object, symbol));
}
function getTag(value) {
	return value == null ? value === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value);
}
function cloneDeepWithImpl(valueToClone, keyToClone, objectToClone, stack = /* @__PURE__ */ new Map(), cloneValue = void 0) {
	let cloned = cloneValue?.(valueToClone, keyToClone, objectToClone, stack);
	if (cloned !== void 0) return cloned;
	if (isPrimitive(valueToClone)) return valueToClone;
	if (stack.has(valueToClone)) return stack.get(valueToClone);
	if (Array.isArray(valueToClone)) {
		let result = new Array(valueToClone.length);
		stack.set(valueToClone, result);
		for (let i2 = 0; i2 < valueToClone.length; i2++) result[i2] = cloneDeepWithImpl(valueToClone[i2], i2, objectToClone, stack, cloneValue);
		return Object.hasOwn(valueToClone, "index") && (result.index = valueToClone.index), Object.hasOwn(valueToClone, "input") && (result.input = valueToClone.input), result;
	}
	if (valueToClone instanceof Date) return new Date(valueToClone.getTime());
	if (valueToClone instanceof RegExp) {
		let result = new RegExp(valueToClone.source, valueToClone.flags);
		return result.lastIndex = valueToClone.lastIndex, result;
	}
	if (valueToClone instanceof Map) {
		let result = /* @__PURE__ */ new Map();
		stack.set(valueToClone, result);
		for (let [key, value] of valueToClone) result.set(key, cloneDeepWithImpl(value, key, objectToClone, stack, cloneValue));
		return result;
	}
	if (valueToClone instanceof Set) {
		let result = /* @__PURE__ */ new Set();
		stack.set(valueToClone, result);
		for (let value of valueToClone) result.add(cloneDeepWithImpl(value, void 0, objectToClone, stack, cloneValue));
		return result;
	}
	if (typeof Buffer < "u" && Buffer.isBuffer(valueToClone)) return valueToClone.subarray();
	if (isTypedArray(valueToClone)) {
		let result = new (Object.getPrototypeOf(valueToClone)).constructor(valueToClone.length);
		stack.set(valueToClone, result);
		for (let i2 = 0; i2 < valueToClone.length; i2++) result[i2] = cloneDeepWithImpl(valueToClone[i2], i2, objectToClone, stack, cloneValue);
		return result;
	}
	if (valueToClone instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && valueToClone instanceof SharedArrayBuffer) return valueToClone.slice(0);
	if (valueToClone instanceof DataView) {
		let result = new DataView(valueToClone.buffer.slice(0), valueToClone.byteOffset, valueToClone.byteLength);
		return stack.set(valueToClone, result), copyProperties(result, valueToClone, objectToClone, stack, cloneValue), result;
	}
	if (typeof File < "u" && valueToClone instanceof File) {
		let result = new File([valueToClone], valueToClone.name, { type: valueToClone.type });
		return stack.set(valueToClone, result), copyProperties(result, valueToClone, objectToClone, stack, cloneValue), result;
	}
	if (typeof Blob < "u" && valueToClone instanceof Blob) {
		let result = new Blob([valueToClone], { type: valueToClone.type });
		return stack.set(valueToClone, result), copyProperties(result, valueToClone, objectToClone, stack, cloneValue), result;
	}
	if (valueToClone instanceof Error) {
		let result = new valueToClone.constructor();
		return stack.set(valueToClone, result), result.message = valueToClone.message, result.name = valueToClone.name, result.stack = valueToClone.stack, result.cause = valueToClone.cause, copyProperties(result, valueToClone, objectToClone, stack, cloneValue), result;
	}
	if (valueToClone instanceof Boolean) {
		let result = new Boolean(valueToClone.valueOf());
		return stack.set(valueToClone, result), copyProperties(result, valueToClone, objectToClone, stack, cloneValue), result;
	}
	if (valueToClone instanceof Number) {
		let result = new Number(valueToClone.valueOf());
		return stack.set(valueToClone, result), copyProperties(result, valueToClone, objectToClone, stack, cloneValue), result;
	}
	if (valueToClone instanceof String) {
		let result = new String(valueToClone.valueOf());
		return stack.set(valueToClone, result), copyProperties(result, valueToClone, objectToClone, stack, cloneValue), result;
	}
	if (typeof valueToClone == "object" && isCloneableObject(valueToClone)) {
		let result = Object.create(Object.getPrototypeOf(valueToClone));
		return stack.set(valueToClone, result), copyProperties(result, valueToClone, objectToClone, stack, cloneValue), result;
	}
	return valueToClone;
}
function copyProperties(target, source, objectToClone = target, stack, cloneValue) {
	let keys = [...Object.keys(source), ...getSymbols(source)];
	for (let i2 = 0; i2 < keys.length; i2++) {
		let key = keys[i2], descriptor = Object.getOwnPropertyDescriptor(target, key);
		(descriptor == null || descriptor.writable) && (target[key] = cloneDeepWithImpl(source[key], key, objectToClone, stack, cloneValue));
	}
}
function isCloneableObject(object) {
	switch (getTag(object)) {
		case argumentsTag:
		case arrayTag:
		case arrayBufferTag:
		case dataViewTag:
		case booleanTag:
		case dateTag:
		case float32ArrayTag:
		case float64ArrayTag:
		case int8ArrayTag:
		case int16ArrayTag:
		case int32ArrayTag:
		case mapTag:
		case numberTag:
		case objectTag:
		case regexpTag:
		case setTag:
		case stringTag:
		case symbolTag:
		case uint8ArrayTag:
		case uint8ClampedArrayTag:
		case uint16ArrayTag:
		case uint32ArrayTag: return !0;
		default: return !1;
	}
}
function cloneDeep(obj) {
	return cloneDeepWithImpl(obj, void 0, obj, /* @__PURE__ */ new Map(), void 0);
}
function pickBy(obj, shouldPick) {
	let result = {}, keys = Object.keys(obj);
	for (let i2 = 0; i2 < keys.length; i2++) {
		let key = keys[i2], value = obj[key];
		shouldPick(value, key) && (result[key] = value);
	}
	return result;
}
function n() {
	return n = Object.assign ? Object.assign.bind() : function(e2) {
		for (var n2 = 1; n2 < arguments.length; n2++) {
			var r2 = arguments[n2];
			for (var t in r2) Object.prototype.hasOwnProperty.call(r2, t) && (e2[t] = r2[t]);
		}
		return e2;
	}, n.apply(this, arguments);
}
function le(e2) {
	return "( *)(" + (e2 === 1 ? ie : ue) + ") +";
}
function _e(e2) {
	return RegExp("^" + (e2 === 1 ? se : fe));
}
function ye(e2) {
	return RegExp("^" + (e2 === 1 ? se : fe) + "[^\\n]*(?:\\n(?!\\1" + (e2 === 1 ? ie : ue) + " )[^\\n]*)*(\\n|$)", "gm");
}
function me(e2) {
	let n2 = e2 === 1 ? ie : ue;
	return RegExp("^( *)(" + n2 + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + n2 + " (?!" + n2 + " ))\\n*|\\s*\\n*$)");
}
function qe(e2, n2) {
	let r2 = n2 === 1, t = r2 ? ke : xe, o2 = r2 ? he : ge, a2 = r2 ? de : pe;
	return {
		t: (e3) => a2.test(e3),
		o: je(function(e3, n3) {
			let r3 = ce.exec(n3.prevCapture);
			return r3 && (n3.list || !n3.inline && !n3.simple) ? t.exec(e3 = r3[1] + e3) : null;
		}),
		i: 1,
		u(e3, n3, t2) {
			let c2 = r2 ? +e3[2] : void 0, i2 = e3[0].replace(l, `
`).match(o2), u2 = !1;
			return {
				items: i2.map(function(e4, r3) {
					let o3 = a2.exec(e4)[0].length, c3 = RegExp("^ {1," + o3 + "}", "gm"), l2 = e4.replace(c3, "").replace(a2, ""), s2 = r3 === i2.length - 1, f2 = l2.indexOf(`

`) !== -1 || s2 && u2;
					u2 = f2;
					let _2 = t2.inline, d2 = t2.list, p2;
					t2.list = !0, f2 ? (t2.inline = !1, p2 = Se(l2) + `

`) : (t2.inline = !0, p2 = Se(l2));
					let y2 = n3(p2, t2);
					return t2.inline = _2, t2.list = d2, y2;
				}),
				ordered: r2,
				start: c2
			};
		},
		l: (n3, r3, t2) => e2(n3.ordered ? "ol" : "ul", {
			key: t2.key,
			start: n3.type === "20" ? n3.start : void 0
		}, n3.items.map(function(n4, o3) {
			return e2("li", { key: o3 }, r3(n4, t2));
		}))
	};
}
function $e(e2) {
	return typeof e2 == "string";
}
function Se(e2) {
	let n2 = e2.length;
	for (; n2 > 0 && e2[n2 - 1] <= " ";) n2--;
	return e2.slice(0, n2);
}
function ze(e2, n2) {
	return e2.startsWith(n2);
}
function Ee(e2, n2, r2) {
	if (Array.isArray(r2)) {
		for (let n3 = 0; n3 < r2.length; n3++) if (ze(e2, r2[n3])) return !0;
		return !1;
	}
	return r2(e2, n2);
}
function Ae(e2) {
	return e2.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function Re(e2) {
	return H.test(e2) ? "right" : U.test(e2) ? "center" : V.test(e2) ? "left" : null;
}
function Be(e2, n2, r2, t) {
	let o2 = r2.inTable;
	r2.inTable = !0;
	let a2 = [[]], c2 = "";
	function i2() {
		if (!c2) return;
		let e3 = a2[a2.length - 1];
		e3.push.apply(e3, n2(c2, r2)), c2 = "";
	}
	return e2.trim().split(/(`[^`]*`|\\\||\|)/).filter(Boolean).forEach((e3, n3, r3) => {
		e3.trim() === "|" && (i2(), t) ? n3 !== 0 && n3 !== r3.length - 1 && a2.push([]) : c2 += e3;
	}), i2(), r2.inTable = o2, a2;
}
function Le(e2, n2, r2) {
	r2.inline = !0;
	let t = e2[2] ? e2[2].replace(G, "").split("|").map(Re) : [], o2 = e2[3] ? (function(e3, n3, r3) {
		return e3.trim().split(`
`).map(function(e4) {
			return Be(e4, n3, r3, !0);
		});
	})(e2[3], n2, r2) : [], a2 = Be(e2[1], n2, r2, !!o2.length);
	return r2.inline = !1, o2.length ? {
		align: t,
		cells: o2,
		header: a2,
		type: "25"
	} : {
		children: a2,
		type: "21"
	};
}
function Oe(e2, n2) {
	return e2.align[n2] == null ? {} : { textAlign: e2.align[n2] };
}
function je(e2) {
	return e2.inline = 1, e2;
}
function Ce(e2) {
	return je(function(n2, r2) {
		return r2.inline ? e2.exec(n2) : null;
	});
}
function Ie(e2) {
	return je(function(n2, r2) {
		return r2.inline || r2.simple ? e2.exec(n2) : null;
	});
}
function Te(e2) {
	return function(n2, r2) {
		return r2.inline || r2.simple ? null : e2.exec(n2);
	};
}
function Me(e2) {
	return je(function(n2) {
		return e2.exec(n2);
	});
}
function De(e2) {
	try {
		let n2 = decodeURIComponent(e2).replace(/[^A-Za-z0-9/:]/g, "");
		if (we.test(n2)) return null;
	} catch {
		return null;
	}
	return e2;
}
function Fe(e2) {
	return e2 && e2.replace(re, "$1");
}
function Pe(e2, n2, r2) {
	let t = r2.inline || !1, o2 = r2.simple || !1;
	r2.inline = !0, r2.simple = !0;
	let a2 = e2(n2, r2);
	return r2.inline = t, r2.simple = o2, a2;
}
function Ze(e2, n2, r2) {
	let t = r2.inline || !1, o2 = r2.simple || !1;
	r2.inline = !1, r2.simple = !0;
	let a2 = e2(n2, r2);
	return r2.inline = t, r2.simple = o2, a2;
}
function Ne(e2, n2, r2) {
	let t = r2.inline || !1;
	r2.inline = !1;
	let o2 = e2(n2, r2);
	return r2.inline = t, o2;
}
function Ue() {
	return {};
}
function Ve() {
	return null;
}
function He(...e2) {
	return e2.filter(Boolean).join(" ");
}
function Qe(e2, n2, r2) {
	let t = e2, o2 = n2.split(".");
	for (; o2.length && (t = t[o2[0]], t !== void 0);) o2.shift();
	return t || r2;
}
function We(r2 = "", t = {}) {
	t.overrides = t.overrides || {}, t.namedCodesToUnicode = t.namedCodesToUnicode ? n({}, a, t.namedCodesToUnicode) : a;
	let l2 = t.slugify || Ae, G2 = t.sanitizer || De, U2 = t.createElement || import_react$2.createElement, V2 = [
		s,
		y,
		h,
		t.enforceAtxHeadings ? z : S,
		E,
		M,
		ke,
		xe
	], H4 = [
		...V2,
		w,
		A,
		B,
		O
	];
	function Q2(e2, n2) {
		for (let r3 = 0; r3 < e2.length; r3++) if (e2[r3].test(n2)) return !0;
		return !1;
	}
	function W2(e2, r3, ...o2) {
		let a2 = Qe(t.overrides, e2 + ".props", {});
		return U2((function(e3, n2) {
			let r4 = Qe(n2, e3);
			return r4 ? typeof r4 == "function" || typeof r4 == "object" && "render" in r4 ? r4 : Qe(n2, e3 + ".component", e3) : e3;
		})(e2, t.overrides), n({}, r3, a2, { className: He(r3?.className, a2.className) || void 0 }), ...o2);
	}
	function re2(e2) {
		e2 = e2.replace(b, "");
		let n2 = !1;
		t.forceInline ? n2 = !0 : t.forceBlock || (n2 = Z.test(e2) === !1);
		let r3 = fe2(se2(n2 ? e2 : Se(e2).replace(oe, "") + `

`, { inline: n2 }));
		for (; $e(r3[r3.length - 1]) && !r3[r3.length - 1].trim();) r3.pop();
		if (t.wrapper === null) return r3;
		let o2 = t.wrapper || (n2 ? "span" : "div"), a2;
		if (r3.length > 1 || t.forceWrapper) a2 = r3;
		else {
			if (r3.length === 1) return a2 = r3[0], typeof a2 == "string" ? W2("span", { key: "outer" }, a2) : a2;
			a2 = null;
		}
		return U2(o2, { key: "outer" }, a2);
	}
	function ce2(e2, n2) {
		if (!n2 || !n2.trim()) return null;
		let r3 = n2.match(u);
		return r3 ? r3.reduce(function(n3, r4) {
			let t2 = r4.indexOf("=");
			if (t2 !== -1) {
				let a2 = (function(e3) {
					return e3.indexOf("-") !== -1 && e3.match(L) === null && (e3 = e3.replace(T, function(e4, n4) {
						return n4.toUpperCase();
					})), e3;
				})(r4.slice(0, t2)).trim(), c2 = (function(e3) {
					let n4 = e3[0];
					return (n4 === "\"" || n4 === "'") && e3.length >= 2 && e3[e3.length - 1] === n4 ? e3.slice(1, -1) : e3;
				})(r4.slice(t2 + 1).trim()), u2 = o[a2] || a2;
				if (u2 === "ref") return n3;
				let l3 = n3[u2] = (function(e3, n4, r5, t3) {
					return n4 === "style" ? (function(e4) {
						let n5 = [], r6 = "", t4 = !1, o2 = !1, a3 = "";
						if (!e4) return n5;
						for (let c4 = 0; c4 < e4.length; c4++) {
							let i2 = e4[c4];
							if (i2 !== "\"" && i2 !== "'" || t4 || (o2 ? i2 === a3 && (o2 = !1, a3 = "") : (o2 = !0, a3 = i2)), i2 === "(" && r6.endsWith("url") ? t4 = !0 : i2 === ")" && t4 && (t4 = !1), i2 !== ";" || o2 || t4) r6 += i2;
							else {
								let e5 = r6.trim();
								if (e5) {
									let r7 = e5.indexOf(":");
									if (r7 > 0) {
										let t5 = e5.slice(0, r7).trim(), o3 = e5.slice(r7 + 1).trim();
										n5.push([t5, o3]);
									}
								}
								r6 = "";
							}
						}
						let c3 = r6.trim();
						if (c3) {
							let e5 = c3.indexOf(":");
							if (e5 > 0) {
								let r7 = c3.slice(0, e5).trim(), t5 = c3.slice(e5 + 1).trim();
								n5.push([r7, t5]);
							}
						}
						return n5;
					})(r5).reduce(function(n5, [r6, o2]) {
						return n5[r6.replace(/(-[a-z])/g, (e4) => e4[1].toUpperCase())] = t3(o2, e3, r6), n5;
					}, {}) : i.indexOf(n4) !== -1 ? t3(Fe(r5), e3, n4) : (r5.match(j) && (r5 = Fe(r5.slice(1, r5.length - 1))), r5 === "true" || r5 !== "false" && r5);
				})(e2, a2, c2, G2);
				typeof l3 == "string" && (A.test(l3) || O.test(l3)) && (n3[u2] = re2(l3.trim()));
			} else r4 !== "style" && (n3[o[r4] || r4] = !0);
			return n3;
		}, {}) : null;
	}
	let ie2 = [], ue2 = {}, le2 = {
		0: {
			t: [">"],
			o: Te(s),
			i: 1,
			u(e2, n2, r3) {
				let [, t2, o2] = e2[0].replace(f, "").match(_);
				return {
					alert: t2,
					children: n2(o2, r3)
				};
			},
			l(e2, n2, r3) {
				let t2 = { key: r3.key };
				return e2.alert && (t2.className = "markdown-alert-" + l2(e2.alert.toLowerCase(), Ae), e2.children.unshift({
					attrs: {},
					children: [{
						type: "27",
						text: e2.alert
					}],
					noInnerParse: !0,
					type: "11",
					tag: "header"
				})), W2("blockquote", t2, n2(e2.children, r3));
			}
		},
		1: {
			t: ["  "],
			o: Me(d),
			i: 1,
			u: Ue,
			l: (e2, n2, r3) => W2("br", { key: r3.key })
		},
		2: {
			t: [
				"--",
				"__",
				"**",
				"- ",
				"* ",
				"_ "
			],
			o: Te(p),
			i: 1,
			u: Ue,
			l: (e2, n2, r3) => W2("hr", { key: r3.key })
		},
		3: {
			t: ["    "],
			o: Te(h),
			i: 0,
			u: (e2) => ({
				lang: void 0,
				text: Fe(Se(e2[0].replace(/^ {4}/gm, "")))
			}),
			l: (e2, r3, t2) => W2("pre", { key: t2.key }, W2("code", n({}, e2.attrs, { className: e2.lang ? "lang-" + e2.lang : "" }), e2.text))
		},
		4: {
			t: ["```", "~~~"],
			o: Te(y),
			i: 0,
			u: (e2) => ({
				attrs: ce2("code", e2[3] || ""),
				lang: e2[2] || void 0,
				text: e2[4],
				type: "3"
			})
		},
		5: {
			t: ["`"],
			o: Ie(g),
			i: 3,
			u: (e2) => ({ text: Fe(e2[2]) }),
			l: (e2, n2, r3) => W2("code", { key: r3.key }, e2.text)
		},
		6: {
			t: ["[^"],
			o: Te(x),
			i: 0,
			u: (e2) => (ie2.push({
				footnote: e2[2],
				identifier: e2[1]
			}), {}),
			l: Ve
		},
		7: {
			t: ["[^"],
			o: Ce(q),
			i: 1,
			u: (e2) => ({
				target: "#" + l2(e2[1], Ae),
				text: e2[1]
			}),
			l: (e2, n2, r3) => W2("a", {
				key: r3.key,
				href: G2(e2.target, "a", "href")
			}, W2("sup", { key: r3.key }, e2.text))
		},
		8: {
			t: ["[ ]", "[x]"],
			o: Ce($),
			i: 1,
			u: (e2) => ({ completed: e2[1].toLowerCase() === "x" }),
			l: (e2, n2, r3) => W2("input", {
				checked: e2.completed,
				key: r3.key,
				readOnly: !0,
				type: "checkbox"
			})
		},
		9: {
			t: ["#"],
			o: Te(t.enforceAtxHeadings ? z : S),
			i: 1,
			u: (e2, n2, r3) => ({
				children: Pe(n2, e2[2], r3),
				id: l2(e2[2], Ae),
				level: e2[1].length
			}),
			l: (e2, n2, r3) => W2("h" + e2.level, {
				id: e2.id,
				key: r3.key
			}, n2(e2.children, r3))
		},
		10: {
			t: (e2) => {
				let n2 = e2.indexOf(`
`);
				return n2 > 0 && n2 < e2.length - 1 && (e2[n2 + 1] === "=" || e2[n2 + 1] === "-");
			},
			o: Te(E),
			i: 1,
			u: (e2, n2, r3) => ({
				children: Pe(n2, e2[1], r3),
				level: e2[2] === "=" ? 1 : 2,
				type: "9"
			})
		},
		11: {
			t: ["<"],
			o: Me(A),
			i: 1,
			u(e2, n2, r3) {
				let [, t2] = e2[3].match(ae), o2 = RegExp("^" + t2, "gm"), a2 = e2[3].replace(o2, ""), i2 = Q2(H4, a2) ? Ne : Pe, u2 = e2[1].toLowerCase(), l3 = c.indexOf(u2) !== -1, s2 = (l3 ? u2 : e2[1]).trim(), f2 = {
					attrs: ce2(s2, e2[2]),
					noInnerParse: l3,
					tag: s2
				};
				if (r3.inAnchor = r3.inAnchor || u2 === "a", l3) f2.text = e2[3];
				else {
					let e3 = r3.inHTML;
					r3.inHTML = !0, f2.children = i2(n2, a2, r3), r3.inHTML = e3;
				}
				return r3.inAnchor = !1, f2;
			},
			l: (e2, r3, t2) => W2(e2.tag, n({ key: t2.key }, e2.attrs), e2.text || (e2.children ? r3(e2.children, t2) : ""))
		},
		13: {
			t: ["<"],
			o: Me(O),
			i: 1,
			u(e2) {
				let n2 = e2[1].trim();
				return {
					attrs: ce2(n2, e2[2] || ""),
					tag: n2
				};
			},
			l: (e2, r3, t2) => W2(e2.tag, n({}, e2.attrs, { key: t2.key }))
		},
		12: {
			t: ["<!--"],
			o: Me(B),
			i: 1,
			u: () => ({}),
			l: Ve
		},
		14: {
			t: ["!["],
			o: Ie(be),
			i: 1,
			u: (e2) => ({
				alt: Fe(e2[1]),
				target: Fe(e2[2]),
				title: Fe(e2[3])
			}),
			l: (e2, n2, r3) => W2("img", {
				key: r3.key,
				alt: e2.alt || void 0,
				title: e2.title || void 0,
				src: G2(e2.target, "img", "src")
			})
		},
		15: {
			t: ["["],
			o: Ce(ve),
			i: 3,
			u: (e2, n2, r3) => ({
				children: Ze(n2, e2[1], r3),
				target: Fe(e2[2]),
				title: Fe(e2[3])
			}),
			l: (e2, n2, r3) => W2("a", {
				key: r3.key,
				href: G2(e2.target, "a", "href"),
				title: e2.title
			}, n2(e2.children, r3))
		},
		16: {
			t: ["<"],
			o: Ce(I),
			i: 0,
			u(e2) {
				let n2 = e2[1], r3 = !1;
				return n2.indexOf("@") !== -1 && n2.indexOf("//") === -1 && (r3 = !0, n2 = n2.replace("mailto:", "")), {
					children: [{
						text: n2,
						type: "27"
					}],
					target: r3 ? "mailto:" + n2 : n2,
					type: "15"
				};
			}
		},
		17: {
			t: (e2, n2) => !n2.inAnchor && !t.disableAutoLink && (ze(e2, "http://") || ze(e2, "https://")),
			o: Ce(C),
			i: 0,
			u: (e2) => ({
				children: [{
					text: e2[1],
					type: "27"
				}],
				target: e2[1],
				title: void 0,
				type: "15"
			})
		},
		20: qe(W2, 1),
		33: qe(W2, 2),
		19: {
			t: [`
`],
			o: Te(m),
			i: 3,
			u: Ue,
			l: () => `
`
		},
		21: {
			o: je(function(e2, n2) {
				if (n2.inline || n2.simple || n2.inHTML && e2.indexOf(`

`) === -1 && n2.prevCapture.indexOf(`

`) === -1) return null;
				let r3 = "", t2 = 0;
				for (;;) {
					let n3 = e2.indexOf(`
`, t2), o3 = e2.slice(t2, n3 === -1 ? void 0 : n3 + 1);
					if (Q2(V2, o3) || (r3 += o3, n3 === -1 || !o3.trim())) break;
					t2 = n3 + 1;
				}
				let o2 = Se(r3);
				return o2 === "" ? null : [
					r3,
					,
					o2
				];
			}),
			i: 3,
			u: Ge,
			l: (e2, n2, r3) => W2("p", { key: r3.key }, n2(e2.children, r3))
		},
		22: {
			t: ["["],
			o: Ce(D),
			i: 0,
			u: (e2) => (ue2[e2[1]] = {
				target: e2[2],
				title: e2[4]
			}, {}),
			l: Ve
		},
		23: {
			t: ["!["],
			o: Ie(F),
			i: 0,
			u: (e2) => ({
				alt: e2[1] ? Fe(e2[1]) : void 0,
				ref: e2[2]
			}),
			l: (e2, n2, r3) => ue2[e2.ref] ? W2("img", {
				key: r3.key,
				alt: e2.alt,
				src: G2(ue2[e2.ref].target, "img", "src"),
				title: ue2[e2.ref].title
			}) : null
		},
		24: {
			t: (e2) => e2[0] === "[" && e2.indexOf("](") === -1,
			o: Ce(P),
			i: 0,
			u: (e2, n2, r3) => ({
				children: n2(e2[1], r3),
				fallbackChildren: e2[0],
				ref: e2[2]
			}),
			l: (e2, n2, r3) => ue2[e2.ref] ? W2("a", {
				key: r3.key,
				href: G2(ue2[e2.ref].target, "a", "href"),
				title: ue2[e2.ref].title
			}, n2(e2.children, r3)) : W2("span", { key: r3.key }, e2.fallbackChildren)
		},
		25: {
			t: ["|"],
			o: Te(M),
			i: 1,
			u: Le,
			l(e2, n2, r3) {
				let t2 = e2;
				return W2("table", { key: r3.key }, W2("thead", null, W2("tr", null, t2.header.map(function(e3, o2) {
					return W2("th", {
						key: o2,
						style: Oe(t2, o2)
					}, n2(e3, r3));
				}))), W2("tbody", null, t2.cells.map(function(e3, o2) {
					return W2("tr", { key: o2 }, e3.map(function(e4, o3) {
						return W2("td", {
							key: o3,
							style: Oe(t2, o3)
						}, n2(e4, r3));
					}));
				})));
			}
		},
		27: {
			o: je(function(e2, n2) {
				let r3;
				return ze(e2, ":") && (r3 = ee.exec(e2)), r3 || te.exec(e2);
			}),
			i: 4,
			u(e2) {
				let n2 = e2[0];
				return { text: n2.indexOf("&") === -1 ? n2 : n2.replace(R, (e3, n3) => t.namedCodesToUnicode[n3] || e3) };
			},
			l: (e2) => e2.text
		},
		28: {
			t: ["**", "__"],
			o: Ie(J),
			i: 2,
			u: (e2, n2, r3) => ({ children: n2(e2[2], r3) }),
			l: (e2, n2, r3) => W2("strong", { key: r3.key }, n2(e2.children, r3))
		},
		29: {
			t: (e2) => {
				let n2 = e2[0];
				return (n2 === "*" || n2 === "_") && e2[1] !== n2;
			},
			o: Ie(K),
			i: 3,
			u: (e2, n2, r3) => ({ children: n2(e2[2], r3) }),
			l: (e2, n2, r3) => W2("em", { key: r3.key }, n2(e2.children, r3))
		},
		30: {
			t: ["\\"],
			o: Ie(ne),
			i: 1,
			u: (e2) => ({
				text: e2[1],
				type: "27"
			})
		},
		31: {
			t: ["=="],
			o: Ie(X),
			i: 3,
			u: Ge,
			l: (e2, n2, r3) => W2("mark", { key: r3.key }, n2(e2.children, r3))
		},
		32: {
			t: ["~~"],
			o: Ie(Y),
			i: 3,
			u: Ge,
			l: (e2, n2, r3) => W2("del", { key: r3.key }, n2(e2.children, r3))
		}
	};
	t.disableParsingRawHTML === !0 && (delete le2[11], delete le2[13]);
	let se2 = (function(e2) {
		var n2 = Object.keys(e2);
		function r3(t2, o2) {
			var a2 = [];
			if (o2.prevCapture = o2.prevCapture || "", t2.trim()) for (; t2;) for (var c2 = 0; c2 < n2.length;) {
				var i2 = n2[c2], u2 = e2[i2];
				if (!u2.t || Ee(t2, o2, u2.t)) {
					var l3 = u2.o(t2, o2);
					if (l3 && l3[0]) {
						t2 = t2.substring(l3[0].length);
						var s2 = u2.u(l3, r3, o2);
						o2.prevCapture += l3[0], s2.type || (s2.type = i2), a2.push(s2);
						break;
					}
					c2++;
				} else c2++;
			}
			return o2.prevCapture = "", a2;
		}
		return n2.sort(function(n3, r4) {
			return e2[n3].i - e2[r4].i || (n3 < r4 ? -1 : 1);
		}), function(e3, n3) {
			return r3((function(e4) {
				return e4.replace(k, `
`).replace(v, "").replace(N, "    ");
			})(e3), n3);
		};
	})(le2), fe2 = /* @__PURE__ */ (function(e2, n2) {
		return function r3(t2, o2 = {}) {
			if (Array.isArray(t2)) {
				let e3 = o2.key, n3 = [], a2 = !1;
				for (let e4 = 0; e4 < t2.length; e4++) {
					o2.key = e4;
					let c2 = r3(t2[e4], o2), i2 = $e(c2);
					i2 && a2 ? n3[n3.length - 1] += c2 : c2 !== null && n3.push(c2), a2 = i2;
				}
				return o2.key = e3, n3;
			}
			return (function(r4, t3, o3) {
				let a2 = e2[r4.type].l;
				return n2 ? n2(() => a2(r4, t3, o3), r4, t3, o3) : a2(r4, t3, o3);
			})(t2, r3, o2);
		};
	})(le2, t.renderRule), _e2 = re2(r2);
	return ie2.length ? W2("div", null, _e2, W2("footer", { key: "footer" }, ie2.map(function(e2) {
		return W2("div", {
			id: l2(e2.identifier, Ae),
			key: e2.identifier
		}, e2.identifier, fe2(se2(e2.footnote, { inline: !0 })));
	}))) : _e2;
}
function JsonNodeAccordion({ children, name, collapsed, keyPath, deep, ...props }) {
	let accordionKey = `${keyPath.at(-1) ?? "root"}-${name}-${deep}`, ids = {
		trigger: `${accordionKey}-trigger`,
		region: `${accordionKey}-region`
	}, containerTag = keyPath.length > 0 ? "li" : "div";
	return import_react$15.createElement(Container, { as: containerTag }, import_react$15.createElement(Trigger, {
		type: "button",
		"aria-expanded": !collapsed,
		id: ids.trigger,
		"aria-controls": ids.region,
		className: "rejt-accordion-button",
		...props
	}, name, " :"), import_react$15.createElement(Region, {
		role: "group",
		id: ids.region,
		"aria-labelledby": ids.trigger,
		className: "rejt-accordion-region"
	}, children));
}
function getObjectType(obj) {
	return obj !== null && typeof obj == "object" && !Array.isArray(obj) && typeof obj[Symbol.iterator] == "function" ? "Iterable" : Object.prototype.toString.call(obj).slice(8, -1);
}
function isComponentWillChange(oldValue, newValue) {
	let oldType = getObjectType(oldValue), newType = getObjectType(newValue);
	return (oldType === "Function" || newType === "Function") && newType !== oldType;
}
function parse3(string) {
	let result = string;
	if (result.indexOf("function") === 0) return (0, eval)(`(${result})`);
	try {
		result = JSON.parse(string);
	} catch {}
	return result;
}
function getNumberOfDecimalPlaces(number) {
	let match = number.toString().match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
	return match ? Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0)) : 0;
}
function revokeOldUrls(urls) {
	urls.forEach((url) => {
		url.startsWith("blob:") && URL.revokeObjectURL(url);
	});
}
function uniq(arr) {
	return [...new Set(arr)];
}
function $b5e257d569688ac6$var$useCounter(isDisabled = !1) {
	let ctx = (0, import_react$29.useContext)($b5e257d569688ac6$var$SSRContext), ref = (0, import_react$29.useRef)(null);
	if (ref.current === null && !isDisabled) {
		var _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner, _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
		let currentOwner = (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = import_react$29.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === void 0 || (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner = _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner === void 0 ? void 0 : _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner.current;
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
	let ctx = (0, import_react$29.useContext)($b5e257d569688ac6$var$SSRContext);
	let counter = $b5e257d569688ac6$var$useCounter(!!defaultId), prefix = `react-aria${ctx.prefix}`;
	return defaultId || `${prefix}-${counter}`;
}
function $b5e257d569688ac6$var$useModernSSRSafeId(defaultId) {
	let id = import_react$29.useId(), [didSSR] = (0, import_react$29.useState)($b5e257d569688ac6$export$535bd6ca7f90a273()), prefix = didSSR || false ? "react-aria" : `react-aria${$b5e257d569688ac6$var$defaultContext.prefix}`;
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
	return typeof import_react$29.useSyncExternalStore == "function" ? import_react$29.useSyncExternalStore($b5e257d569688ac6$var$subscribe, $b5e257d569688ac6$var$getSnapshot, $b5e257d569688ac6$var$getServerSnapshot) : (0, import_react$29.useContext)($b5e257d569688ac6$var$IsSSRContext);
}
function $bdb11010cef70236$export$f680877a34711e37(defaultId) {
	let [value, setValue] = (0, import_react$28.useState)(defaultId), nextId = (0, import_react$28.useRef)(null), res = $b5e257d569688ac6$export$619500959fc48b26(value), cleanupRef = (0, import_react$28.useRef)(null);
	if ($bdb11010cef70236$var$registry && $bdb11010cef70236$var$registry.register(cleanupRef, res), $bdb11010cef70236$var$canUseDOM) {
		let cacheIdRef = $bdb11010cef70236$export$d41a04c74483c6ef.get(res);
		cacheIdRef && !cacheIdRef.includes(nextId) ? cacheIdRef.push(nextId) : $bdb11010cef70236$export$d41a04c74483c6ef.set(res, [nextId]);
	}
	return $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		let r2 = res;
		return () => {
			$bdb11010cef70236$var$registry && $bdb11010cef70236$var$registry.unregister(cleanupRef), $bdb11010cef70236$export$d41a04c74483c6ef.delete(r2);
		};
	}, [res]), (0, import_react$28.useEffect)(() => {
		let newId = nextId.current;
		return newId && setValue(newId), () => {
			newId && (nextId.current = null);
		};
	}), res;
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
function $bbed8b41f857bcc0$var$setupGlobalEvents() {
	if (typeof window > "u") return;
	function isTransitionEvent(event) {
		return "propertyName" in event;
	}
	let onTransitionStart = (e2) => {
		if (!isTransitionEvent(e2) || !e2.target) return;
		let transitions = $bbed8b41f857bcc0$var$transitionsByElement.get(e2.target);
		transitions || (transitions = /* @__PURE__ */ new Set(), $bbed8b41f857bcc0$var$transitionsByElement.set(e2.target, transitions), e2.target.addEventListener("transitioncancel", onTransitionEnd, { once: !0 })), transitions.add(e2.propertyName);
	}, onTransitionEnd = (e2) => {
		if (!isTransitionEvent(e2) || !e2.target) return;
		let properties = $bbed8b41f857bcc0$var$transitionsByElement.get(e2.target);
		if (properties && (properties.delete(e2.propertyName), properties.size === 0 && (e2.target.removeEventListener("transitioncancel", onTransitionEnd), $bbed8b41f857bcc0$var$transitionsByElement.delete(e2.target)), $bbed8b41f857bcc0$var$transitionsByElement.size === 0)) {
			for (let cb of $bbed8b41f857bcc0$var$transitionCallbacks) cb();
			$bbed8b41f857bcc0$var$transitionCallbacks.clear();
		}
	};
	document.body.addEventListener("transitionrun", onTransitionStart), document.body.addEventListener("transitionend", onTransitionEnd);
}
function useStory(storyId, context) {
	let stories = useStories([storyId], context);
	return stories && stories[0];
}
function useStories(storyIds, context) {
	let [storiesById, setStories] = (0, import_react$50.useState)({});
	return (0, import_react$50.useEffect)(() => {
		Promise.all(storyIds.map(async (storyId) => {
			let story = await context.loadStory(storyId);
			setStories((current) => current[storyId] === story ? current : {
				...current,
				[storyId]: story
			});
		}));
	}), storyIds.map((storyId) => {
		if (storiesById[storyId]) return storiesById[storyId];
		try {
			return context.storyById(storyId);
		} catch {
			return;
		}
	});
}
function getChildProps(children) {
	if (import_react$25.Children.count(children) === 1) {
		let elt = children;
		if (elt.props) return elt.props;
	}
	return null;
}
function build_html_default(options) {
	let forEach = [].forEach, some = [].some, body = typeof window < "u" && document.body, SPACE_CHAR = " ", tocElement, currentlyHighlighting = !0, eventCount = 0;
	function createEl(d2, container) {
		let link = container.appendChild(createLink(d2));
		if (d2.children.length) {
			let list = createList(d2.isCollapsed);
			d2.children.forEach((child) => {
				createEl(child, list);
			}), link.appendChild(list);
		}
	}
	function render(parent, data) {
		let container = createList(!1);
		if (data.forEach((d2) => {
			createEl(d2, container);
		}), tocElement = parent || tocElement, tocElement !== null) return tocElement.firstChild && tocElement.removeChild(tocElement.firstChild), data.length === 0 ? tocElement : tocElement.appendChild(container);
	}
	function createLink(data) {
		let item = document.createElement("li"), a2 = document.createElement("a");
		return options.listItemClass && item.setAttribute("class", options.listItemClass), options.onClick && (a2.onclick = options.onClick), options.includeTitleTags && a2.setAttribute("title", data.textContent), options.includeHtml && data.childNodes.length ? forEach.call(data.childNodes, (node) => {
			a2.appendChild(node.cloneNode(!0));
		}) : a2.textContent = data.textContent, a2.setAttribute("href", `${options.basePath}#${data.id}`), a2.setAttribute("class", `${options.linkClass + SPACE_CHAR}node-name--${data.nodeName}${SPACE_CHAR}${options.extraLinkClasses}`), item.appendChild(a2), item;
	}
	function createList(isCollapsed) {
		let listElement = options.orderedList ? "ol" : "ul", list = document.createElement(listElement), classes = options.listClass + SPACE_CHAR + options.extraListClasses;
		return isCollapsed && (classes = classes + SPACE_CHAR + options.collapsibleClass, classes = classes + SPACE_CHAR + options.isCollapsedClass), list.setAttribute("class", classes), list;
	}
	function updateFixedSidebarClass() {
		let scrollTop = getScrollTop(), posFixedEl = document.querySelector(options.positionFixedSelector);
		options.fixedSidebarOffset === "auto" && (options.fixedSidebarOffset = tocElement.offsetTop), scrollTop > options.fixedSidebarOffset ? posFixedEl.className.indexOf(options.positionFixedClass) === -1 && (posFixedEl.className += SPACE_CHAR + options.positionFixedClass) : posFixedEl.className = posFixedEl.className.replace(SPACE_CHAR + options.positionFixedClass, "");
	}
	function getHeadingTopPos(obj) {
		let position = 0;
		return obj !== null && (position = obj.offsetTop, options.hasInnerContainers && (position += getHeadingTopPos(obj.offsetParent))), position;
	}
	function updateClassname(obj, className) {
		return obj && obj.className !== className && (obj.className = className), obj;
	}
	function updateToc(headingsArray, event) {
		options.positionFixedSelector && updateFixedSidebarClass();
		let headings = headingsArray, clickedHref = event?.target?.getAttribute ? event?.target?.getAttribute("href") : null, isBottomMode = clickedHref && clickedHref.charAt(0) === "#" ? getIsHeaderBottomMode(clickedHref.replace("#", "")) : !1, shouldUpdate = currentlyHighlighting || isBottomMode;
		if (event && eventCount < 5 && eventCount++, shouldUpdate && tocElement && headings.length > 0) {
			let topHeader = getTopHeader(headings), oldActiveTocLink = tocElement.querySelector(`.${options.activeLinkClass}`), topHeaderId = topHeader.id.replace(/([ #;&,.+*~':"!^$[\]()=>|/\\@])/g, "\\$1"), hashId = window.location.hash.replace("#", ""), activeId = topHeaderId, isPageBottomMode = getIsPageBottomMode();
			clickedHref && isBottomMode ? activeId = clickedHref.replace("#", "") : hashId && hashId !== topHeaderId && isPageBottomMode && (getIsHeaderBottomMode(topHeaderId) || eventCount <= 2) && (activeId = hashId);
			let activeTocLink = tocElement.querySelector(`.${options.linkClass}[href="${options.basePath}#${activeId}"]`);
			if (oldActiveTocLink === activeTocLink) return;
			let tocLinks = tocElement.querySelectorAll(`.${options.linkClass}`);
			forEach.call(tocLinks, (tocLink) => {
				updateClassname(tocLink, tocLink.className.replace(SPACE_CHAR + options.activeLinkClass, ""));
			});
			let tocLis = tocElement.querySelectorAll(`.${options.listItemClass}`);
			forEach.call(tocLis, (tocLi) => {
				updateClassname(tocLi, tocLi.className.replace(SPACE_CHAR + options.activeListItemClass, ""));
			}), activeTocLink && activeTocLink.className.indexOf(options.activeLinkClass) === -1 && (activeTocLink.className += SPACE_CHAR + options.activeLinkClass);
			let li = activeTocLink?.parentNode;
			li && li.className.indexOf(options.activeListItemClass) === -1 && (li.className += SPACE_CHAR + options.activeListItemClass);
			let tocLists = tocElement.querySelectorAll(`.${options.listClass}.${options.collapsibleClass}`);
			forEach.call(tocLists, (list) => {
				list.className.indexOf(options.isCollapsedClass) === -1 && (list.className += SPACE_CHAR + options.isCollapsedClass);
			}), activeTocLink?.nextSibling && activeTocLink.nextSibling.className.indexOf(options.isCollapsedClass) !== -1 && updateClassname(activeTocLink.nextSibling, activeTocLink.nextSibling.className.replace(SPACE_CHAR + options.isCollapsedClass, "")), removeCollapsedFromParents(activeTocLink?.parentNode.parentNode);
		}
	}
	function removeCollapsedFromParents(element) {
		return element && element.className.indexOf(options.collapsibleClass) !== -1 && element.className.indexOf(options.isCollapsedClass) !== -1 ? (updateClassname(element, element.className.replace(SPACE_CHAR + options.isCollapsedClass, "")), removeCollapsedFromParents(element.parentNode.parentNode)) : element;
	}
	function disableTocAnimation(event) {
		let target = event.target || event.srcElement;
		typeof target.className != "string" || target.className.indexOf(options.linkClass) === -1 || (currentlyHighlighting = !1);
	}
	function enableTocAnimation() {
		currentlyHighlighting = !0;
	}
	function getCurrentlyHighlighting() {
		return currentlyHighlighting;
	}
	function getIsHeaderBottomMode(headerId) {
		let scrollEl = getScrollEl();
		return (document?.getElementById(headerId)).offsetTop > scrollEl.offsetHeight - scrollEl.clientHeight * 1.4 - options.bottomModeThreshold;
	}
	function getIsPageBottomMode() {
		let scrollEl = getScrollEl(), isScrollable = scrollEl.scrollHeight > scrollEl.clientHeight, isBottomMode = getScrollTop() + scrollEl.clientHeight > scrollEl.offsetHeight - options.bottomModeThreshold;
		return isScrollable && isBottomMode;
	}
	function getScrollEl() {
		let el;
		return options.scrollContainer && document.querySelector(options.scrollContainer) ? el = document.querySelector(options.scrollContainer) : el = document.documentElement || body, el;
	}
	function getScrollTop() {
		return getScrollEl()?.scrollTop || 0;
	}
	function getTopHeader(headings, scrollTop = getScrollTop()) {
		let topHeader;
		return some.call(headings, (heading, i2) => {
			if (getHeadingTopPos(heading) > scrollTop + options.headingsOffset + 10) return topHeader = headings[i2 === 0 ? i2 : i2 - 1], !0;
			if (i2 === headings.length - 1) return topHeader = headings[headings.length - 1], !0;
		}), topHeader;
	}
	function updateUrlHashForHeader(headingsArray) {
		let scrollTop = getScrollTop(), topHeader = getTopHeader(headingsArray, scrollTop), isPageBottomMode = getIsPageBottomMode();
		if ((!topHeader || scrollTop < 5) && !isPageBottomMode) window.location.hash === "#" || window.location.hash === "" || window.history.pushState(null, null, "#");
		else if (topHeader && !isPageBottomMode) {
			let newHash = `#${topHeader.id}`;
			window.location.hash !== newHash && window.history.pushState(null, null, newHash);
		}
	}
	return {
		enableTocAnimation,
		disableTocAnimation,
		render,
		updateToc,
		getCurrentlyHighlighting,
		getTopHeader,
		getScrollTop,
		updateUrlHashForHeader
	};
}
function parseContent(options) {
	let reduce = [].reduce;
	function getLastItem(array) {
		return array[array.length - 1];
	}
	function getHeadingLevel(heading) {
		return +heading.nodeName.toUpperCase().replace("H", "");
	}
	function isHTMLElement(maybeElement) {
		try {
			return maybeElement instanceof window.HTMLElement || maybeElement instanceof window.parent.HTMLElement;
		} catch {
			return maybeElement instanceof window.HTMLElement;
		}
	}
	function getHeadingObject(heading) {
		if (!isHTMLElement(heading)) return heading;
		if (options.ignoreHiddenElements && (!heading.offsetHeight || !heading.offsetParent)) return null;
		let headingLabel = heading.getAttribute("data-heading-label") || (options.headingLabelCallback ? String(options.headingLabelCallback(heading.innerText)) : (heading.innerText || heading.textContent).trim()), obj = {
			id: heading.id,
			children: [],
			nodeName: heading.nodeName,
			headingLevel: getHeadingLevel(heading),
			textContent: headingLabel
		};
		return options.includeHtml && (obj.childNodes = heading.childNodes), options.headingObjectCallback ? options.headingObjectCallback(obj, heading) : obj;
	}
	function addNode(node, nest) {
		let obj = getHeadingObject(node), level = obj.headingLevel, array = nest, lastItem = getLastItem(array), counter = level - (lastItem ? lastItem.headingLevel : 0);
		for (; counter > 0 && (lastItem = getLastItem(array), !(lastItem && level === lastItem.headingLevel));) lastItem && lastItem.children !== void 0 && (array = lastItem.children), counter--;
		return level >= options.collapseDepth && (obj.isCollapsed = !0), array.push(obj), array;
	}
	function selectHeadings(contentElement, headingSelector) {
		let selectors = headingSelector;
		options.ignoreSelector && (selectors = headingSelector.split(",").map(function(selector) {
			return `${selector.trim()}:not(${options.ignoreSelector})`;
		}));
		try {
			return contentElement.querySelectorAll(selectors);
		} catch {
			return console.warn(`Headers not found with selector: ${selectors}`), null;
		}
	}
	function nestHeadingsArray(headingsArray) {
		return reduce.call(headingsArray, function(prev, curr) {
			let currentHeading = getHeadingObject(curr);
			return currentHeading && addNode(currentHeading, prev.nest), prev;
		}, { nest: [] });
	}
	return {
		nestHeadingsArray,
		selectHeadings
	};
}
function initSmoothScrolling(options) {
	var duration = options.duration, offset = options.offset;
	if (typeof window > "u" || typeof location > "u") return;
	var pageUrl = location.hash ? stripHash(location.href) : location.href;
	delegatedLinkHijacking();
	function delegatedLinkHijacking() {
		document.body.addEventListener("click", onClick, !1);
		function onClick(e2) {
			!isInPageLink(e2.target) || e2.target.className.indexOf("no-smooth-scroll") > -1 || e2.target.href.charAt(e2.target.href.length - 2) === "#" && e2.target.href.charAt(e2.target.href.length - 1) === "!" || e2.target.className.indexOf(options.linkClass) === -1 || jump(e2.target.hash, {
				duration,
				offset,
				callback: function() {
					setFocus(e2.target.hash);
				}
			});
		}
	}
	function isInPageLink(n2) {
		return n2.tagName.toLowerCase() === "a" && (n2.hash.length > 0 || n2.href.charAt(n2.href.length - 1) === "#") && (stripHash(n2.href) === pageUrl || stripHash(n2.href) + "#" === pageUrl);
	}
	function stripHash(url) {
		return url.slice(0, url.lastIndexOf("#"));
	}
	function setFocus(hash) {
		var element = document.getElementById(hash.substring(1));
		element && (/^(?:a|select|input|button|textarea)$/i.test(element.tagName) || (element.tabIndex = -1), element.focus());
	}
}
function jump(target, options) {
	var start = window.pageYOffset, opt = {
		duration: options.duration,
		offset: options.offset || 0,
		callback: options.callback,
		easing: options.easing || easeInOutQuad
	}, tgt = document.querySelector("[id=\"" + decodeURI(target).split("#").join("") + "\"]") || document.querySelector("[id=\"" + target.split("#").join("") + "\"]"), distance = typeof target == "string" ? opt.offset + (target ? tgt && tgt.getBoundingClientRect().top || 0 : -(document.documentElement.scrollTop || document.body.scrollTop)) : target, duration = typeof opt.duration == "function" ? opt.duration(distance) : opt.duration, timeStart, timeElapsed;
	requestAnimationFrame(function(time) {
		timeStart = time, loop(time);
	});
	function loop(time) {
		timeElapsed = time - timeStart, window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration)), timeElapsed < duration ? requestAnimationFrame(loop) : end();
	}
	function end() {
		window.scrollTo(0, start + distance), typeof opt.callback == "function" && opt.callback();
	}
	function easeInOutQuad(t, b2, c2, d2) {
		return t /= d2 / 2, t < 1 ? c2 / 2 * t * t + b2 : (t--, -c2 / 2 * (t * (t - 2) - 1) + b2);
	}
}
function updateTocScroll(options) {
	let toc = options.tocScrollingWrapper || options.tocElement || document.querySelector(options.tocSelector);
	if (toc && toc.scrollHeight > toc.clientHeight) {
		let activeItem = toc.querySelector(`.${options.activeListItemClass}`);
		if (activeItem) {
			let scrollAmount = activeItem.offsetTop - options.tocScrollOffset;
			toc.scrollTop = scrollAmount > 0 ? scrollAmount : 0;
		}
	}
}
function init(customOptions) {
	let hasInitialized = !1;
	_options = extend(default_options_default, customOptions || {}), _options.scrollSmooth && (_options.duration = _options.scrollSmoothDuration, _options.offset = _options.scrollSmoothOffset, initSmoothScrolling(_options)), _buildHtml = build_html_default(_options), _parseContent = parseContent(_options), destroy();
	let contentElement = getContentElement(_options);
	if (contentElement === null) return;
	let tocElement = getTocElement(_options);
	if (tocElement === null || (_headingsArray = _parseContent.selectHeadings(contentElement, _options.headingSelector), _headingsArray === null)) return;
	let nestedHeadings = _parseContent.nestHeadingsArray(_headingsArray).nest;
	if (!_options.skipRendering) _buildHtml.render(tocElement, nestedHeadings);
	else return this;
	let isClick = !1;
	_scrollListener = ((fn, delay) => getScrollHandler(fn, delay, _options.scrollHandlerType))((e2) => {
		_buildHtml.updateToc(_headingsArray, e2), !_options.disableTocScrollSync && !isClick && updateTocScroll(_options), _options.enableUrlHashUpdateOnScroll && hasInitialized && _buildHtml.getCurrentlyHighlighting() && _buildHtml.updateUrlHashForHeader(_headingsArray);
		let isTop = e2?.target?.scrollingElement?.scrollTop === 0;
		(e2 && (e2.eventPhase === 0 || e2.currentTarget === null) || isTop) && (_buildHtml.updateToc(_headingsArray), _options.scrollEndCallback?.(e2));
	}, _options.scrollHandlerTimeout || _options.throttleTimeout), hasInitialized || (_scrollListener(), hasInitialized = !0), window.onhashchange = window.onscrollend = (e2) => {
		_scrollListener(e2);
	}, _options.scrollContainer && document.querySelector(_options.scrollContainer) ? (document.querySelector(_options.scrollContainer).addEventListener("scroll", _scrollListener, !1), document.querySelector(_options.scrollContainer).addEventListener("resize", _scrollListener, !1)) : (document.addEventListener("scroll", _scrollListener, !1), document.addEventListener("resize", _scrollListener, !1));
	let timeout = null;
	clickListener = throttle((event) => {
		isClick = !0, _options.scrollSmooth && _buildHtml.disableTocAnimation(event), _buildHtml.updateToc(_headingsArray, event), timeout && clearTimeout(timeout), timeout = setTimeout(() => {
			_buildHtml.enableTocAnimation();
		}, _options.scrollSmoothDuration), setTimeout(() => {
			isClick = !1;
		}, _options.scrollSmoothDuration + 100);
	}, _options.throttleTimeout), _options.scrollContainer && document.querySelector(_options.scrollContainer) ? document.querySelector(_options.scrollContainer).addEventListener("click", clickListener, !1) : document.addEventListener("click", clickListener, !1);
}
function destroy() {
	let tocElement = getTocElement(_options);
	tocElement !== null && (_options.skipRendering || tocElement && (tocElement.innerHTML = ""), _options.scrollContainer && document.querySelector(_options.scrollContainer) ? (document.querySelector(_options.scrollContainer).removeEventListener("scroll", _scrollListener, !1), document.querySelector(_options.scrollContainer).removeEventListener("resize", _scrollListener, !1), _buildHtml && document.querySelector(_options.scrollContainer).removeEventListener("click", clickListener, !1)) : (document.removeEventListener("scroll", _scrollListener, !1), document.removeEventListener("resize", _scrollListener, !1), _buildHtml && document.removeEventListener("click", clickListener, !1)));
}
function refresh(customOptions) {
	destroy(), init(customOptions || _options);
}
function extend(...args) {
	let target = {};
	for (let i2 = 0; i2 < args.length; i2++) {
		let source = args[i2];
		for (let key in source) hasOwnProp.call(source, key) && (target[key] = source[key]);
	}
	return target;
}
function throttle(fn, threshold, scope) {
	threshold || (threshold = 250);
	let last2, deferTimer;
	return function(...args) {
		let context = scope || this, now = +/* @__PURE__ */ new Date();
		last2 && now < last2 + threshold ? (clearTimeout(deferTimer), deferTimer = setTimeout(() => {
			last2 = now, fn.apply(context, args);
		}, threshold)) : (last2 = now, fn.apply(context, args));
	};
}
function debounce(func, wait) {
	let timeout;
	return (...args) => {
		clearTimeout(timeout), timeout = setTimeout(() => func.apply(this, args), wait);
	};
}
function getScrollHandler(func, timeout, type = "auto") {
	switch (type) {
		case "debounce": return debounce(func, timeout);
		case "throttle": return throttle(func, timeout);
		default: return timeout < 334 ? debounce(func, timeout) : throttle(func, timeout);
	}
}
function getContentElement(options) {
	try {
		return options.contentElement || document.querySelector(options.contentSelector);
	} catch {
		return console.warn(`Contents element not found: ${options.contentSelector}`), null;
	}
}
function getTocElement(options) {
	try {
		return options.tocElement || document.querySelector(options.tocSelector);
	} catch {
		return console.warn(`TOC element not found: ${options.tocSelector}`), null;
	}
}
function useSyncExternalStoreShim(subscribe, getSnapshot) {
	let value = getSnapshot(), [{ inst }, forceUpdate] = (0, import_react$64.useState)({ inst: {
		value,
		getSnapshot
	} });
	return (0, import_react$64.useLayoutEffect)(() => {
		inst.value = value, inst.getSnapshot = getSnapshot, didSnapshotChange(inst) && forceUpdate({ inst });
	}, [
		subscribe,
		value,
		getSnapshot
	]), (0, import_react$64.useEffect)(() => (didSnapshotChange(inst) && forceUpdate({ inst }), subscribe(() => {
		didSnapshotChange(inst) && forceUpdate({ inst });
	})), [subscribe]), value;
}
function didSnapshotChange(inst) {
	let latestGetSnapshot = inst.getSnapshot, prevValue = inst.value;
	try {
		let nextValue = latestGetSnapshot();
		return !Object.is(prevValue, nextValue);
	} catch {
		return !0;
	}
}
function useQuerySubscription(cacheKey, query, input, selector) {
	let cache = (0, import_react$63.useRef)(void 0);
	(cache.current?.key !== cacheKey || cache.current.selector !== selector) && (cache.current = {
		key: cacheKey,
		selector,
		state: selector ? seedQueryState(query, input, selector) : seedQueryState(query, input)
	});
	let inputRef = (0, import_react$63.useRef)(input);
	inputRef.current = input;
	return useSyncExternalStoreShim((0, import_react$63.useCallback)((listener) => {
		let onQueryState = (state) => {
			cache.current = {
				key: cacheKey,
				selector,
				state
			}, listener();
		};
		return selector ? query.subscribe(inputRef.current, selector, onQueryState) : query.subscribe(inputRef.current, onQueryState);
	}, [
		query,
		cacheKey,
		selector
	]), (0, import_react$63.useCallback)(() => cache.current.state, []));
}
function useServiceDocgen(id) {
	return useQuerySubscription(id, getService("core/docgen").queries.docgen, { id });
}
function extractComponentArgTypes(component, parameters) {
	let { extractArgTypes } = parameters.docs || {};
	if (!extractArgTypes) throw new Error("Args unsupported. See Args documentation for your framework.");
	return extractArgTypes(component);
}
function extractSubcomponentArgTypes(subcomponents, parameters) {
	return Object.fromEntries(Object.entries(subcomponents || {}).map(([key, comp]) => [key, extractComponentArgTypes(comp, parameters)]));
}
function useDocgenServiceRows({ componentId, storyId, parameters, initialArgs, customArgTypes }) {
	let { data: servicePayload, isInitialLoading } = useServiceDocgen(componentId);
	return servicePayload ? {
		rows: {
			serviceComponentName: servicePayload.name,
			mainRows: mergeServiceArgTypes({
				payload: servicePayload,
				storyId: storyId ?? componentId,
				parameters,
				initialArgs,
				customArgTypes
			}),
			subcomponentRows: getServiceSubcomponentArgTypes(servicePayload)
		},
		isInitialLoading
	} : {
		rows: null,
		isInitialLoading
	};
}
function scrollToElement(element, block = "start") {
	element.scrollIntoView({
		behavior: "smooth",
		block,
		inline: "nearest"
	});
}
function useResolveArgTypes(props) {
	let { of } = props;
	if ("of" in props && of === void 0) throw new InvalidBlockOfPropError2();
	let context = (0, import_react$62.useContext)(DocsContext), resolved = useOf(of || "meta"), resolvedArgTypes;
	if (resolved.type === "component") {
		let { component, projectAnnotations: { parameters } } = resolved;
		resolvedArgTypes = {
			parameters,
			componentId: context.getComponentId(component),
			argTypes: extractComponentArgTypes(component, parameters),
			component
		};
	} else if (resolved.type === "meta") {
		let { id, argTypes, parameters, initialArgs, component, subcomponents } = resolved.preparedMeta;
		resolvedArgTypes = {
			parameters,
			componentId: id.split("--")[0],
			initialArgs,
			argTypes,
			component,
			subcomponents
		};
	} else {
		let { id, argTypes, parameters, initialArgs, component, subcomponents } = resolved.story;
		resolvedArgTypes = {
			parameters,
			componentId: id.split("--")[0],
			storyId: id,
			initialArgs,
			argTypes,
			component,
			subcomponents
		};
	}
	let argTypesParameters = resolvedArgTypes.parameters?.docs?.argTypes || {};
	return {
		...resolvedArgTypes,
		filterProps: {
			include: props.include ?? argTypesParameters.include,
			exclude: props.exclude ?? argTypesParameters.exclude,
			sort: props.sort ?? argTypesParameters.sort
		}
	};
}
function renderArgTypesTables({ mainName = "Main", mainRows, subcomponentRows, include, exclude, sort, docsLang }) {
	let filteredMainRows = filterArgTypes(mainRows, include, exclude);
	if (Object.keys(subcomponentRows).length === 0) return import_react$62.createElement(ArgsTable, {
		rows: filteredMainRows,
		sort,
		docsLang
	});
	let tabs = {
		[mainName]: {
			rows: filteredMainRows,
			sort
		},
		...Object.fromEntries(Object.entries(subcomponentRows).map(([key, rows]) => [key, {
			rows: filterArgTypes(rows, include, exclude),
			sort
		}]))
	};
	return import_react$62.createElement(TabbedArgsTable, {
		tabs,
		sort,
		docsLang
	});
}
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
function isObject2(value) {
	var type = typeof value;
	return value != null && (type == "object" || type == "function");
}
function isFunction(value) {
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
function memoize(func, resolver) {
	if (typeof func != "function" || resolver != null && typeof resolver != "function") throw new TypeError(FUNC_ERROR_TEXT);
	var memoized = function() {
		var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
		if (cache.has(key)) return cache.get(key);
		var result = func.apply(this, args);
		return memoized.cache = cache.set(key, result) || cache, result;
	};
	return memoized.cache = new (memoize.Cache || MapCache_default)(), memoized;
}
function memoizeCapped(func) {
	var result = memoize_default(func, function(key) {
		return cache.size === MAX_MEMOIZE_SIZE && cache.clear(), key;
	}), cache = result.cache;
	return result;
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
function argsHash(args) {
	return stringify(args, { maxDepth: 50 });
}
function useServiceStory(storyId, selector) {
	let componentId = storyId.split("--")[0], service = getService2("core/story-docs"), boundSelector = (0, import_react$69.useCallback)((payload) => selector(payload, storyId), [selector, storyId]);
	return useQuerySubscription(storyId, service.queries.storyDocs, { id: componentId }, boundSelector);
}
function useServiceStoryDoc(storyId) {
	return useServiceStory(storyId, selectStoryDoc);
}
function useServiceStorySnippet(storyId) {
	return useServiceStory(storyId, selectSnippetForStory);
}
function useTransformCode(source, transform, storyContext) {
	let [transformedCode, setTransformedCode] = (0, import_react$70.useState)("Transforming..."), transformed = transform ? transform?.(source, storyContext) : source;
	return (0, import_react$70.useEffect)(() => {
		async function getTransformedCode() {
			let transformResult = await transformed;
			transformResult !== transformedCode && setTransformedCode(transformResult);
		}
		getTransformedCode();
	}), typeof transformed == "object" && typeof transformed.then == "function" ? transformedCode : transformed;
}
function getControlsFilterProps(story, props) {
	let controlsParameters = story.parameters.docs?.controls || {};
	return {
		include: props.include ?? controlsParameters.include,
		exclude: props.exclude ?? controlsParameters.exclude,
		sort: props.sort ?? controlsParameters.sort
	};
}
function useControlsInteractiveState(story, context) {
	let controlsId = $bdb11010cef70236$export$f680877a34711e37(), [args, updateArgs, resetArgs] = useArgs(story, context), [globals] = useGlobals(story, context);
	return {
		controlsId,
		args,
		globals,
		updateArgs,
		resetArgs
	};
}
function navigate(context, url) {
	context.channel.emit(NAVIGATE_URL2, url);
}
function slug(value, maintainCase) {
	return typeof value != "string" ? "" : (maintainCase || (value = value.toLowerCase()), value.replace(regex, "").replace(/ /g, "-"));
}
function Docs({ context, docsParameter }) {
	let Container2 = docsParameter.container || DocsContainer, Page = docsParameter.page || DocsPage;
	return import_react$78.createElement(Container2, {
		context,
		theme: docsParameter.theme
	}, import_react$78.createElement(Page, null));
}
var import_react, import_react$1, import_react$2, import_react$3, import_react$4, import_react$5, import_react$6, import_react$7, import_react$8, import_react$9, import_react$10, import_react$11, import_react$12, import_react$13, import_react$14, import_react$15, import_react$16, import_react$17, import_react$18, import_react$19, import_react$20, import_react$21, import_react$22, import_react$23, import_react$24, import_react$25, import_react$26, import_react$28, import_react$29, import_react$30, import_react$34, import_react$47, import_react$48, import_react$49, import_react$50, import_react$51, import_react$52, import_react$53, import_react$54, import_react$55, import_react$56, import_react$60, import_react$61, import_react$62, import_react$63, import_react$64, import_react$65, import_react$66, import_react$67, import_react$68, import_react$69, import_react$70, import_react$71, import_react$72, import_react$73, import_react$74, import_react$75, import_react$76, import_react$77, import_react$78, import_react$79, import_react$80, import_react$81, import_react$82, import_react$83, import_react$84, import_react$85, import_react$86, import_react$87, import_react$88, import_react$91, import_react$92, import_react$93, once, regexpTag, stringTag, numberTag, booleanTag, argumentsTag, symbolTag, dateTag, mapTag, setTag, arrayTag, arrayBufferTag, objectTag, dataViewTag, uint8ArrayTag, uint8ClampedArrayTag, uint16ArrayTag, uint32ArrayTag, int8ArrayTag, int16ArrayTag, int32ArrayTag, float32ArrayTag, float64ArrayTag, r, o, a, c, i, u, l, s, f, _, d, p, y, h, g, m, k, x, q, v, b, $, S, z, E, A, R, B, L, O, j, C, I, T, M, w, D, F, P, Z, N, G, U, V, H, Q, W, J, K, X, Y, ee, ne, re, te, oe, ae, ce, ie, ue, se, fe, de, pe, he, ge, ke, xe, ve, be, we, Ge, index_modern_default, getBooleanControlStyles, Label, parse, BooleanControl, parseDate, parseTime, formatDate, formatTime, FormInput, FlexSpaced, DateControl, Wrapper, parse2, FormInput2, NumberControl, logger, selectedKey, selectedKeys, selectedValues, Wrapper2, Text, Label2, CheckboxControl, logger2, Wrapper3, Text2, Label3, RadioControl, logger3, OptionsSelect, SelectWrapper, NO_SELECTION, SingleSelect, MultiSelect, SelectControl, normalizeOptions, Controls, OptionsControl, Container, Trigger, Region, ERROR, OBJECT, ARRAY, STRING, NUMBER, BOOLEAN, DATE, NULL, UNDEFINED, FUNCTION, SYMBOL, ADD_DELTA_TYPE, REMOVE_DELTA_TYPE, UPDATE_DELTA_TYPE, VALUE, JsonAddValue, JsonArray, JsonFunctionValue, JsonNode, JsonObject, JsonValue, JsonTree, globalWindow, Wrapper4, ButtonInline, ActionButton, Input, RawButton, RawInput, ENTER_EVENT, dispatchEnterKey, selectValue, ObjectControl, RangeInput, RangeLabel, RangeCurrentAndMaxLabel, RangeWrapper, RangeControl, Wrapper5, MaxLength, TextControl, FileInput, FilesControl, LazyColorControl, ColorControl, Controls2, NoControl, ArgControl, Table, ArgJsDoc, ITEMS_BEFORE_EXPANSION, Summary, DetailsContainer, AlignedDetails, Text3, ExpandButton, Expandable, Detail, ChevronUpIcon, ChevronDownIcon, EmptyArg, ArgText, getSummaryItems, renderSummaryItems, renderExpandedItems, ArgSummary, ArgValue, Name, Required, Description, Type, TypeWithJsDoc, StyledTd, StyledTr, toSummary, ArgRow, Wrapper6, Links, Empty, ExpanderIconDown, ExpanderIconRight, FlexWrapper, Section, Subsection, StyledTd2, StyledTr2, ClickIntercept, SectionRow, TableWrapper, Row, Column, SkeletonText, Skeleton, TableWrapper2, TablePositionWrapper, ButtonPositionWrapper, StyledButton, sortFns, groupRows, safeIncludeConditionalArg, ArgsTable, toGlobalSelector, breakpoint, Title, Subtitle, DocsContent, DocsWrapper, DocsPageWrapper, logger4, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c, $b5e257d569688ac6$var$defaultContext, $b5e257d569688ac6$var$SSRContext, $b5e257d569688ac6$var$IsSSRContext, $b5e257d569688ac6$var$componentIds, $b5e257d569688ac6$export$619500959fc48b26, $bdb11010cef70236$var$canUseDOM, $bdb11010cef70236$export$d41a04c74483c6ef, $bdb11010cef70236$var$registry, $7215afc6de606d6b$var$supportsPreventScrollCached, $c87311424ea30a05$export$9ac100e40613ea10, $c87311424ea30a05$export$7bef049ce92e4224, $c87311424ea30a05$export$78551043582a6a98, $c87311424ea30a05$export$6446a186d09e379e, $c87311424ea30a05$export$b7d78993b74f766d, $bbed8b41f857bcc0$var$transitionsByElement, $bbed8b41f857bcc0$var$transitionCallbacks, $b4b717babfbb907b$var$focusableElements, $458b0a5536c1a7cf$var$_React_useInsertionEffect, DocsContext, InvalidBlockOfPropError, MDX_WRAPPED_BLOCK, MdxWrappedBlockContext, withMdxComponentOverride, getStoryId, getStoryProps, StoryImpl, Story2, getBlockBackgroundStyle, getStoryHref, globalWindow2, IFrame, ZoomContext, storyBlockIdFromId, InlineStory, IFrameStory, ErrorMessage, Story, StorySkeleton, AbsoluteBar, Wrapper7, IconPlaceholder, Toolbar, ChildrenContainer, ActionBar, StyledSource, PreviewContainer, PositionedToolbar, COPIED_LABEL_ANIMATION_DURATION, Preview, StyledTabsView, TabbedArgsTable, NAVIGATE_URL, default_options_default, _options, _buildHtml, _parseContent, _headingsArray, _scrollListener, clickListener, hasOwnProp, tocbot_default, Aside, Nav, Heading, Title2, TableOfContents, anchorBlockIdFromId, Anchor, InvalidBlockOfPropError2, filterArgTypes, getService, useOf, titleCase, getComponentName, LegacyArgTypes, DocgenServiceArgTypes, ArgTypesImpl, FORCE_REMOUNT, InvalidBlockOfPropError4, InvalidBlockOfPropError3, __create, __defProp, __getOwnPropDesc, __getOwnPropNames, __getProtoOf, __hasOwnProp, __commonJS, __copyProps, __toESM, eventProperties, customEventSpecificProperties, require_es_object_atoms, require_es_errors, require_eval, require_range, require_ref, require_syntax, require_type, require_uri, require_abs, require_floor, require_max, require_min, require_pow, require_round, require_isNaN, require_sign, require_gOPD, require_gopd, require_es_define_property, require_shams, require_has_symbols, require_Reflect_getPrototypeOf, require_Object_getPrototypeOf, require_implementation, require_function_bind, require_functionCall, require_functionApply, require_reflectApply, require_actualApply, require_call_bind_apply_helpers, require_get, require_get_proto, require_hasown, require_get_intrinsic, require_call_bound, require_shams2, require_is_regex, require_is_function, require_safe_regex_test, require_is_symbol, import_is_regex, import_is_function, import_is_symbol, freeGlobal_default, freeSelf, root_default, Symbol_default, objectProto, hasOwnProperty, nativeObjectToString, symToStringTag, getRawTag_default, nativeObjectToString2, objectToString_default, nullTag, undefinedTag, symToStringTag2, baseGetTag_default, symbolProto, isObject_default, asyncTag, funcTag, genTag, proxyTag, isFunction_default, coreJsData_default, maskSrcKey, isMasked_default, funcToString, toSource_default, reRegExpChar, reIsHostCtor, funcProto2, objectProto3, funcToString2, hasOwnProperty2, reIsNative, baseIsNative_default, getValue_default, getNative_default, eq_default, nativeCreate_default, hashClear_default, hashDelete_default, HASH_UNDEFINED, hasOwnProperty3, hashGet_default, hasOwnProperty4, hashHas_default, HASH_UNDEFINED2, hashSet_default, Hash_default, listCacheClear_default, assocIndexOf_default, splice, listCacheDelete_default, listCacheGet_default, listCacheHas_default, listCacheSet_default, ListCache_default, Map_default, mapCacheClear_default, isKeyable_default, getMapData_default, mapCacheDelete_default, mapCacheGet_default, mapCacheHas_default, mapCacheSet_default, MapCache_default, FUNC_ERROR_TEXT, memoize_default, MAX_MEMOIZE_SIZE, memoizeCapped_default, rePropName, reEscapeChar, isObject3, dateFormat, replacer, defaultOptions, stringify, SourceContext, UNKNOWN_ARGS_HASH, SourceContainer, getService2, EMPTY_SOURCE_CONTEXT, getStorySource, useCode, useSourceProps, SourceWithStoryDocsSnippet, SourceWithStorySnippet, SourceWithCode, SourceImpl, CanvasImpl, Canvas, filterArgTypes2, RESET_STORY_ARGS, STORY_ARGS_UPDATED, UPDATE_STORY_ARGS, useArgs, useArgsIfDefined, GLOBALS_UPDATED, useGlobals, Tag, usePrimaryStory, ControlsTables, LegacyControls, DocgenServiceControls, ControlsImpl, Controls3, InvalidBlockOfPropError5, NAVIGATE_URL2, document2, CodeOrSourceMdx, A2, AnchorInPage, AnchorMdx, SUPPORTED_MDX_HEADERS, OcticonHeaders, OcticonAlignmentWrapper, OcticonAnchorWrapper, HeaderWithOcticonAnchor, HeaderMdx, HeadersMdx, MarkdownImpl, Markdown, getDescriptionFromResolvedOf, DescriptionBody, DescriptionStoryWithServices, DescriptionComponentWithServices, DescriptionImpl, Description2, regex, own, BananaSlug, createDocsSlugger, DocsSluggerContext, document3, globalWindow3, DocsContainer, slugs, HeadingImpl, Heading2, SubheadingImpl, Subheading, DocsStoryImpl, DocsStory, PrimaryImpl, Primary, Tag2, StyledHeading, StoriesImpl, Stories, deprecate, InvalidBlockOfPropError6, DEPRECATION_MIGRATION_LINK, SubtitleImpl, Subtitle2, InvalidBlockOfPropError7, STORY_KIND_PATH_SEPARATOR, extractTitle, TitleImpl, Title3, DocsPage, deprecate2, composeConfigs2, Channel, Preview2, composeConfigs, DocsContext2, deprecate3, Meta, UnstyledImpl, WrapperImpl;
function init_blocks() {
	return (init_blocks = __esmMin((() => {
		init_chunk_QQBDHPVZ();
		init_chunk_SPXYZZB5();
		import_react = /* @__PURE__ */ __toESM$1(require_react(), 1);
		init_components();
		init_csf();
		init_dist();
		init_theming();
		import_react$1 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$2 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$3 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$4 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$5 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$6 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$7 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$8 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$9 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$10 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$11 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$12 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$13 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$14 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$15 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$16 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$17 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$18 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$19 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$20 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$21 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$22 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$23 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$24 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$25 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$26 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		require_react();
		import_react$28 = require_react();
		import_react$29 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$30 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		require_react();
		require_react();
		require_react();
		import_react$34 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		require_react();
		require_react();
		require_react();
		require_react();
		require_react();
		require_react();
		require_react();
		require_react();
		require_react();
		require_react();
		require_react();
		require_react_dom();
		require_react();
		import_react$47 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$48 = require_react();
		import_react$49 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$50 = require_react();
		import_react$51 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		init_react();
		import_react$52 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$53 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$54 = require_react();
		import_react$55 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$56 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		require_react();
		require_react();
		require_react();
		import_react$60 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$61 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$62 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		init_chunk_FLUL445Z();
		import_react$63 = require_react();
		init_open_service();
		import_react$64 = require_react();
		import_react$65 = require_react();
		import_react$66 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$67 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		init_chunk_OA6XKWIN();
		import_react$68 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$69 = require_react();
		import_react$70 = require_react();
		import_react$71 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$72 = require_react();
		import_react$73 = require_react();
		import_react$74 = require_react();
		import_react$75 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$76 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		init_esm();
		import_react$77 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$78 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$79 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$80 = require_react();
		import_react$81 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$82 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$83 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$84 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$85 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$86 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$87 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$88 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		require_react();
		require_react();
		import_react$91 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$92 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		import_react$93 = /* @__PURE__ */ __toESM$1(require_react(), 1);
		init_preload_helper();
		({once} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		regexpTag = "[object RegExp]";
		stringTag = "[object String]";
		numberTag = "[object Number]";
		booleanTag = "[object Boolean]";
		argumentsTag = "[object Arguments]";
		symbolTag = "[object Symbol]";
		dateTag = "[object Date]";
		mapTag = "[object Map]";
		setTag = "[object Set]";
		arrayTag = "[object Array]";
		arrayBufferTag = "[object ArrayBuffer]";
		objectTag = "[object Object]";
		dataViewTag = "[object DataView]";
		uint8ArrayTag = "[object Uint8Array]";
		uint8ClampedArrayTag = "[object Uint8ClampedArray]";
		uint16ArrayTag = "[object Uint16Array]";
		uint32ArrayTag = "[object Uint32Array]";
		int8ArrayTag = "[object Int8Array]";
		int16ArrayTag = "[object Int16Array]";
		int32ArrayTag = "[object Int32Array]";
		float32ArrayTag = "[object Float32Array]";
		float64ArrayTag = "[object Float64Array]";
		r = ["children", "options"];
		o = [
			"allowFullScreen",
			"allowTransparency",
			"autoComplete",
			"autoFocus",
			"autoPlay",
			"cellPadding",
			"cellSpacing",
			"charSet",
			"classId",
			"colSpan",
			"contentEditable",
			"contextMenu",
			"crossOrigin",
			"encType",
			"formAction",
			"formEncType",
			"formMethod",
			"formNoValidate",
			"formTarget",
			"frameBorder",
			"hrefLang",
			"inputMode",
			"keyParams",
			"keyType",
			"marginHeight",
			"marginWidth",
			"maxLength",
			"mediaGroup",
			"minLength",
			"noValidate",
			"radioGroup",
			"readOnly",
			"rowSpan",
			"spellCheck",
			"srcDoc",
			"srcLang",
			"srcSet",
			"tabIndex",
			"useMap"
		].reduce((e2, n2) => (e2[n2.toLowerCase()] = n2, e2), {
			class: "className",
			for: "htmlFor"
		});
		a = {
			amp: "&",
			apos: "'",
			gt: ">",
			lt: "<",
			nbsp: "\xA0",
			quot: "“"
		};
		c = [
			"style",
			"script",
			"pre"
		];
		i = [
			"src",
			"href",
			"data",
			"formAction",
			"srcDoc",
			"action"
		];
		u = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi;
		l = /\n{2,}$/;
		s = /^(\s*>[\s\S]*?)(?=\n\n|$)/;
		f = /^ *> ?/gm;
		_ = /^(?:\[!([^\]]*)\]\n)?([\s\S]*)/;
		d = /^ {2,}\n/;
		p = /^(?:([-*_])( *\1){2,}) *(?:\n *)+\n/;
		y = /^(?: {1,3})?(`{3,}|~{3,}) *(\S+)? *([^\n]*?)?\n([\s\S]*?)(?:\1\n?|$)/;
		h = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/;
		g = /^(`+)((?:\\`|(?!\1)`|[^`])+)\1/;
		m = /^(?:\n *)*\n/;
		k = /\r\n?/g;
		x = /^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/;
		q = /^\[\^([^\]]+)]/;
		v = /\f/g;
		b = /^---[ \t]*\n(.|\n)*\n---[ \t]*\n/;
		$ = /^\s*?\[(x|\s)\]/;
		S = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/;
		z = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/;
		E = /^([^\n]+)\n *(=|-)\2{2,} *\n/;
		A = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?((?:[^>]*[^/])?)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i;
		R = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi;
		B = /^<!--[\s\S]*?(?:-->)/;
		L = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/;
		O = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i;
		j = /^\{.*\}$/;
		C = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/;
		I = /^<([^ >]+[:@\/][^ >]+)>/;
		T = /-([a-z])?/gi;
		M = /^(\|.*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*))?\n?/;
		w = /^[^\n]+(?:  \n|\n{2,})/;
		D = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/;
		F = /^!\[([^\]]*)\] ?\[([^\]]*)\]/;
		P = /^\[([^\]]*)\] ?\[([^\]]*)\]/;
		Z = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/;
		N = /\t/g;
		G = /(^ *\||\| *$)/g;
		U = /^ *:-+: *$/;
		V = /^ *:-+ *$/;
		H = /^ *-+: *$/;
		Q = (e2) => `(?=[\\s\\S]+?\\1${e2 ? "\\1" : ""})`;
		W = "((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|\\\\\\1|[\\s\\S])+?)";
		J = RegExp(`^([*_])\\1${Q(1)}${W}\\1\\1(?!\\1)`);
		K = RegExp(`^([*_])${Q(0)}${W}\\1(?!\\1)`);
		X = RegExp(`^(==)${Q(0)}${W}\\1`);
		Y = RegExp(`^(~~)${Q(0)}${W}\\1`);
		ee = /^(:[a-zA-Z0-9-_]+:)/;
		ne = /^\\([^0-9A-Za-z\s])/;
		re = /\\([^0-9A-Za-z\s])/g;
		te = /^[\s\S](?:(?!  \n|[0-9]\.|http)[^=*_~\-\n:<`\\\[!])*/;
		oe = /^\n+/;
		ae = /^([ \t]*)/;
		ce = /(?:^|\n)( *)$/;
		ie = "(?:\\d+\\.)";
		ue = "(?:[*+-])";
		se = le(1);
		fe = le(2);
		de = _e(1);
		pe = _e(2);
		he = ye(1);
		ge = ye(2);
		ke = me(1);
		xe = me(2);
		ve = RegExp(`^\\[((?:\\[[^\\[\\]]*(?:\\[[^\\[\\]]*\\][^\\[\\]]*)*\\]|[^\\[\\]])*)\\]\\(\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`);
		be = /^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/;
		we = /(javascript|vbscript|data(?!:image)):/i;
		Ge = (e2, n2, r2) => ({ children: Pe(n2, e2[2], r2) });
		index_modern_default = (n2) => {
			let { children: t, options: o2 } = n2, a2 = (function(e2, n3) {
				if (e2 == null) return {};
				var r2, t2, o3 = {}, a3 = Object.keys(e2);
				for (t2 = 0; t2 < a3.length; t2++) n3.indexOf(r2 = a3[t2]) >= 0 || (o3[r2] = e2[r2]);
				return o3;
			})(n2, r);
			return import_react$2.cloneElement(We(t ?? "", o2), a2);
		};
		getBooleanControlStyles = (theme) => ({
			lineHeight: "18px",
			alignItems: "center",
			marginBottom: 8,
			display: "inline-block",
			position: "relative",
			whiteSpace: "nowrap",
			background: theme.boolean.background,
			borderRadius: "3em",
			padding: 1,
			"&[aria-disabled=\"true\"]": {
				opacity: .5,
				input: { cursor: "not-allowed" }
			},
			"@media (forced-colors: active)": {
				background: "ButtonFace",
				outline: "1px solid ButtonText"
			},
			"&:focus-within": {
				outline: `1px solid ${theme.color.secondary}`,
				outlineOffset: 1,
				"@media (forced-colors: active)": {
					outline: "1px solid Highlight",
					outlineOffset: 1
				}
			},
			input: {
				...srOnlyStyles,
				appearance: "none",
				left: 0,
				top: 0,
				background: "transparent",
				cursor: "pointer",
				borderRadius: "3em"
			},
			span: {
				textAlign: "center",
				fontSize: theme.typography.size.s1,
				fontWeight: theme.typography.weight.bold,
				lineHeight: "1",
				cursor: "pointer",
				display: "inline-block",
				padding: "7px 15px",
				transition: "all 100ms ease-out",
				userSelect: "none",
				borderRadius: "3em",
				color: curriedTransparentize$1(.5, theme.color.defaultText),
				background: "transparent",
				"&:active": {
					boxShadow: `${curriedOpacify$1(.05, theme.appBorderColor)} 0 0 0 2px inset`,
					color: curriedOpacify$1(1, theme.appBorderColor)
				},
				"&:first-of-type": { paddingRight: 8 },
				"&:last-of-type": { paddingLeft: 8 },
				"@media (forced-colors: active)": {
					color: "ButtonText",
					boxShadow: "none"
				}
			},
			"input:checked ~ span:last-of-type, input:not(:checked) ~ span:first-of-type": {
				background: theme.boolean.selectedBackground,
				boxShadow: theme.base === "light" ? `${curriedOpacify$1(.1, theme.appBorderColor)} 0 0 2px` : `${theme.appBorderColor} 0 0 0 1px`,
				color: theme.color.defaultText,
				padding: "7px 15px",
				"@media (forced-colors: active)": {
					forcedColorAdjust: "none",
					background: "Highlight",
					color: "HighlightText",
					boxShadow: "none",
					outline: "1px solid ButtonText"
				}
			}
		});
		Label = styled.label(({ theme }) => getBooleanControlStyles(theme));
		parse = (value) => value === "true";
		BooleanControl = ({ name, storyId, controlsId, value, onChange, onBlur, onFocus, argType, required }) => {
			let onSetFalse = (0, import_react$5.useCallback)(() => onChange(!1), [onChange]), readonly = !!argType?.table?.readonly;
			if (value === void 0) return import_react$5.createElement(Button, {
				ariaLabel: !1,
				variant: "outline",
				size: "medium",
				id: getControlSetterButtonId(name, storyId, controlsId),
				onClick: onSetFalse,
				disabled: readonly
			}, "Set boolean");
			let controlId = getControlId(name, storyId, controlsId), parsedValue = typeof value == "string" ? parse(value) : value;
			return import_react$5.createElement(Label, {
				"aria-disabled": readonly,
				htmlFor: controlId,
				"aria-label": name
			}, import_react$5.createElement("input", {
				id: controlId,
				type: "checkbox",
				onChange: (e2) => onChange(e2.target.checked),
				checked: parsedValue,
				role: "switch",
				disabled: readonly,
				"aria-required": required || void 0,
				name,
				onBlur,
				onFocus
			}), import_react$5.createElement("span", { "aria-hidden": "true" }, "False"), import_react$5.createElement("span", { "aria-hidden": "true" }, "True"));
		};
		parseDate = (value) => {
			let [year, month, day] = value.split("-"), result = /* @__PURE__ */ new Date();
			return result.setFullYear(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10)), result;
		};
		parseTime = (value) => {
			let [hours, minutes] = value.split(":"), result = /* @__PURE__ */ new Date();
			return result.setHours(parseInt(hours, 10)), result.setMinutes(parseInt(minutes, 10)), result;
		};
		formatDate = (value) => {
			let date = new Date(value);
			return `${`000${date.getFullYear()}`.slice(-4)}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)}`;
		};
		formatTime = (value) => {
			let date = new Date(value);
			return `${`0${date.getHours()}`.slice(-2)}:${`0${date.getMinutes()}`.slice(-2)}`;
		};
		FormInput = styled(Form.Input)(({ theme }) => ({
			"&[readonly]": { background: theme.base === "light" ? theme.color.lighter : "transparent" },
			"&::-webkit-calendar-picker-indicator": {
				opacity: .5,
				height: 12,
				filter: theme.base === "light" ? void 0 : "invert(1)"
			}
		}));
		FlexSpaced = styled.fieldset({
			flex: 1,
			display: "flex",
			border: 0,
			marginInline: 0,
			padding: 0,
			gap: 10,
			"div:first-of-type": { flex: 4 },
			"div:last-of-type": { flex: 3 }
		});
		DateControl = ({ name, storyId, controlsId, value, onChange, onFocus, onBlur, argType, required }) => {
			let [valid, setValid] = (0, import_react$6.useState)(!0), dateRef = (0, import_react$6.useRef)(), timeRef = (0, import_react$6.useRef)(), readonly = !!argType?.table?.readonly;
			(0, import_react$6.useEffect)(() => {
				valid !== !1 && (dateRef && dateRef.current && (dateRef.current.value = value ? formatDate(value) : ""), timeRef && timeRef.current && (timeRef.current.value = value ? formatTime(value) : ""));
			}, [value]);
			let onDateChange = (e2) => {
				if (!e2.target.value) return onChange();
				let parsed = parseDate(e2.target.value), result = new Date(value ?? "");
				result.setFullYear(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
				let time = result.getTime();
				time && onChange(time), setValid(!!time);
			}, onTimeChange = (e2) => {
				if (!e2.target.value) return onChange();
				let parsed = parseTime(e2.target.value), result = new Date(value ?? "");
				result.setHours(parsed.getHours()), result.setMinutes(parsed.getMinutes());
				let time = result.getTime();
				time && onChange(time), setValid(!!time);
			}, controlId = getControlId(name, storyId, controlsId);
			return import_react$6.createElement(FlexSpaced, null, import_react$6.createElement("legend", { className: "sb-sr-only" }, name), import_react$6.createElement("label", {
				htmlFor: `${controlId}-date`,
				className: "sb-sr-only"
			}, "Date"), import_react$6.createElement(FormInput, {
				type: "date",
				max: "9999-12-31",
				ref: dateRef,
				id: `${controlId}-date`,
				name: `${controlId}-date`,
				readOnly: readonly,
				"aria-required": required || void 0,
				onChange: onDateChange,
				onFocus,
				onBlur
			}), import_react$6.createElement("label", {
				htmlFor: `${controlId}-time`,
				className: "sb-sr-only"
			}, "Time"), import_react$6.createElement(FormInput, {
				type: "time",
				id: `${controlId}-time`,
				name: `${controlId}-time`,
				ref: timeRef,
				onChange: onTimeChange,
				readOnly: readonly,
				"aria-required": required || void 0,
				onFocus,
				onBlur
			}), valid ? null : import_react$6.createElement("div", null, "invalid"));
		};
		Wrapper = styled.label({ display: "flex" });
		parse2 = (value) => {
			let result = parseFloat(value);
			return Number.isNaN(result) ? void 0 : result;
		};
		FormInput2 = styled(Form.Input)(({ theme }) => ({ background: theme.base === "light" ? theme.color.lighter : "transparent" }));
		NumberControl = ({ name, storyId, controlsId, value, onChange, min, max, step, onBlur, onFocus, argType, required }) => {
			let [inputValue, setInputValue] = (0, import_react$7.useState)(typeof value == "number" ? value : ""), [forceVisible, setForceVisible] = (0, import_react$7.useState)(!1), [parseError, setParseError] = (0, import_react$7.useState)(null), readonly = !!argType?.table?.readonly, handleChange = (0, import_react$7.useCallback)((event) => {
				setInputValue(event.target.value);
				let result = parseFloat(event.target.value);
				if (Number.isNaN(result)) setParseError(/* @__PURE__ */ new Error(`'${event.target.value}' is not a number`));
				else {
					let finalValue = result;
					typeof min == "number" && finalValue < min && (finalValue = min), typeof max == "number" && finalValue > max && (finalValue = max), onChange(finalValue), setParseError(null), finalValue !== result && setInputValue(String(finalValue));
				}
			}, [
				onChange,
				setParseError,
				min,
				max
			]), onForceVisible = (0, import_react$7.useCallback)(() => {
				setInputValue("0"), onChange(0), setForceVisible(!0);
			}, [setForceVisible]), htmlElRef = (0, import_react$7.useRef)(null);
			return (0, import_react$7.useEffect)(() => {
				forceVisible && htmlElRef.current && htmlElRef.current.select();
			}, [forceVisible]), (0, import_react$7.useEffect)(() => {
				let newInputValue = typeof value == "number" ? value : "";
				inputValue !== newInputValue && setInputValue(newInputValue);
			}, [value]), value === void 0 ? import_react$7.createElement(Button, {
				ariaLabel: !1,
				variant: "outline",
				size: "medium",
				id: getControlSetterButtonId(name, storyId, controlsId),
				onClick: onForceVisible,
				disabled: readonly
			}, "Set number") : import_react$7.createElement(Wrapper, null, import_react$7.createElement(FormInput2, {
				ref: htmlElRef,
				id: getControlId(name, storyId, controlsId),
				type: "number",
				onChange: handleChange,
				size: "flex",
				placeholder: "Edit number...",
				value: inputValue,
				valid: parseError ? "error" : void 0,
				autoFocus: forceVisible,
				"aria-required": required || void 0,
				readOnly: readonly,
				name,
				min,
				max,
				step,
				onFocus,
				onBlur
			}));
		};
		({logger} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		selectedKey = (value, options) => {
			let entry = options && Object.entries(options).find(([_key, val]) => val === value);
			return entry ? entry[0] : void 0;
		};
		selectedKeys = (value, options) => value && options ? Object.entries(options).filter((entry) => value.includes(entry[1])).map((entry) => entry[0]) : [];
		selectedValues = (keys, options) => keys && options && keys.map((key) => options[key]);
		Wrapper2 = styled.fieldset({
			border: "none",
			marginInline: 0,
			padding: 0,
			display: "flex",
			alignItems: "flex-start"
		}, ({ $isInline: isInline }) => isInline ? {
			flexWrap: "wrap",
			gap: 15,
			label: { display: "inline-flex" }
		} : {
			flexDirection: "column",
			gap: 8,
			label: { display: "flex" }
		});
		Text = styled.span(({ $readOnly }) => ({ opacity: $readOnly ? .5 : 1 }));
		Label2 = styled.label(({ $readOnly }) => ({
			lineHeight: "20px",
			alignItems: "center",
			cursor: $readOnly ? "not-allowed" : "pointer",
			input: {
				cursor: $readOnly ? "not-allowed" : "pointer",
				margin: 0,
				marginRight: 6
			}
		}));
		CheckboxControl = ({ name, storyId, controlsId, options, value, onChange, isInline, argType, required }) => {
			if (!options) return logger.warn(`Checkbox with no options: ${name}`), import_react$9.createElement(import_react$9.Fragment, null, "-");
			let initial2 = selectedKeys(value || [], options), [selected, setSelected] = (0, import_react$9.useState)(initial2), readonly = !!argType?.table?.readonly, handleChange = (e2) => {
				let option = e2.target.value, updated = [...selected];
				updated.includes(option) ? updated.splice(updated.indexOf(option), 1) : updated.push(option), onChange(selectedValues(updated, options)), setSelected(updated);
			};
			(0, import_react$9.useEffect)(() => {
				setSelected(selectedKeys(value || [], options));
			}, [value]);
			let controlId = getControlId(name, storyId, controlsId);
			return import_react$9.createElement(Wrapper2, { $isInline: isInline }, import_react$9.createElement("legend", { className: "sb-sr-only" }, name, required ? " (required)" : ""), Object.keys(options).map((key, index) => {
				let id = `${controlId}-${index}`;
				return import_react$9.createElement(Label2, {
					key: id,
					htmlFor: id,
					$readOnly: readonly
				}, import_react$9.createElement("input", {
					type: "checkbox",
					disabled: readonly,
					id,
					name: id,
					value: key,
					onChange: handleChange,
					checked: selected?.includes(key)
				}), import_react$9.createElement(Text, { $readOnly: readonly }, key));
			}));
		};
		({logger: logger2} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		Wrapper3 = styled.fieldset({
			border: "none",
			marginInline: 0,
			padding: 0,
			display: "flex",
			alignItems: "flex-start"
		}, ({ isInline }) => isInline ? {
			flexWrap: "wrap",
			gap: 15,
			label: { display: "inline-flex" }
		} : {
			flexDirection: "column",
			gap: 8,
			label: { display: "flex" }
		});
		Text2 = styled.span(({ $readOnly }) => ({ opacity: $readOnly ? .5 : 1 }));
		Label3 = styled.label(({ $readOnly }) => ({
			lineHeight: "20px",
			alignItems: "center",
			cursor: $readOnly ? "not-allowed" : "pointer",
			input: {
				cursor: $readOnly ? "not-allowed" : "pointer",
				margin: 0,
				marginRight: 6
			}
		}));
		RadioControl = ({ name, storyId, controlsId, options, value, onChange, isInline, argType, required }) => {
			if (!options) return logger2.warn(`Radio with no options: ${name}`), import_react$10.createElement(import_react$10.Fragment, null, "-");
			let selection = selectedKey(value, options), controlId = getControlId(name, storyId, controlsId), readonly = !!argType?.table?.readonly;
			return import_react$10.createElement(Wrapper3, { isInline }, import_react$10.createElement("legend", { className: "sb-sr-only" }, name, required ? " (required)" : ""), Object.keys(options).map((key, index) => {
				let id = `${controlId}-${index}`;
				return import_react$10.createElement(Label3, {
					key: id,
					htmlFor: id,
					$readOnly: readonly
				}, import_react$10.createElement("input", {
					type: "radio",
					id,
					name: controlId,
					disabled: readonly,
					value: key,
					onChange: (e2) => onChange(options[e2.currentTarget.value]),
					checked: key === selection
				}), import_react$10.createElement(Text2, { $readOnly: readonly }, key));
			}));
		};
		({logger: logger3} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		OptionsSelect = styled.select({
			appearance: "none",
			border: "0 none",
			boxSizing: "inherit",
			display: " block",
			margin: " 0",
			background: "transparent",
			padding: 0,
			fontSize: "inherit",
			position: "relative"
		}, ({ theme }) => ({
			boxSizing: "border-box",
			position: "relative",
			padding: "6px 10px",
			width: "100%",
			color: theme.input.color || "inherit",
			background: theme.input.background,
			borderRadius: theme.input.borderRadius,
			boxShadow: `${theme.input.border} 0 0 0 1px inset`,
			fontSize: theme.typography.size.s2 - 1,
			lineHeight: "20px",
			"&:focus": {
				boxShadow: `${theme.color.secondary} 0 0 0 1px inset`,
				outline: "none"
			},
			"&[disabled]": {
				cursor: "not-allowed",
				opacity: .5
			},
			"::placeholder": { color: theme.textMutedColor },
			"&[multiple]": {
				overflow: "auto",
				padding: 0,
				option: {
					display: "block",
					padding: "6px 10px",
					marginLeft: 1,
					marginRight: 1,
					"&:hover": { background: theme.background.hoverable },
					"&:checked": {
						background: "transparent",
						color: theme.color.secondary,
						fontWeight: theme.typography.weight.bold
					}
				}
			}
		}));
		SelectWrapper = styled.span(({ theme }) => ({
			display: "inline-block",
			lineHeight: "normal",
			overflow: "hidden",
			position: "relative",
			verticalAlign: "top",
			width: "100%",
			svg: {
				position: "absolute",
				zIndex: 1,
				pointerEvents: "none",
				height: "12px",
				marginTop: "-6px",
				right: "12px",
				top: "50%",
				fill: theme.textMutedColor,
				path: { fill: theme.textMutedColor }
			}
		}));
		NO_SELECTION = "Choose option...";
		SingleSelect = ({ name, storyId, controlsId, value, options, onChange, argType, required }) => {
			let handleChange = (e2) => {
				onChange(options[e2.currentTarget.value]);
			}, selection = selectedKey(value, options) || NO_SELECTION, controlId = getControlId(name, storyId, controlsId), readonly = !!argType?.table?.readonly;
			return import_react$11.createElement(SelectWrapper, null, import_react$11.createElement(ChevronSmallDownIcon, null), import_react$11.createElement("label", {
				htmlFor: controlId,
				className: "sb-sr-only"
			}, name), import_react$11.createElement(OptionsSelect, {
				disabled: readonly,
				id: controlId,
				value: selection,
				onChange: handleChange,
				"aria-required": required || void 0
			}, import_react$11.createElement("option", {
				disabled: selection === NO_SELECTION,
				key: "no-selection"
			}, NO_SELECTION), Object.keys(options).map((key) => import_react$11.createElement("option", {
				key,
				value: key
			}, key))));
		};
		MultiSelect = ({ name, storyId, controlsId, value, options, onChange, argType, required }) => {
			let handleChange = (e2) => {
				onChange(selectedValues(Array.from(e2.currentTarget.options).filter((option) => option.selected).map((option) => option.value), options));
			}, selection = selectedKeys(value, options), controlId = getControlId(name, storyId, controlsId), readonly = !!argType?.table?.readonly;
			return import_react$11.createElement(SelectWrapper, null, import_react$11.createElement("label", {
				htmlFor: controlId,
				className: "sb-sr-only"
			}, name), import_react$11.createElement(OptionsSelect, {
				disabled: readonly,
				id: controlId,
				multiple: !0,
				value: selection,
				onChange: handleChange,
				"aria-required": required || void 0
			}, Object.keys(options).map((key) => import_react$11.createElement("option", {
				key,
				value: key
			}, key))));
		};
		SelectControl = (props) => {
			let { name, options } = props;
			return options ? props.isMulti ? import_react$11.createElement(MultiSelect, { ...props }) : import_react$11.createElement(SingleSelect, { ...props }) : (logger3.warn(`Select with no options: ${name}`), import_react$11.createElement(import_react$11.Fragment, null, "-"));
		};
		normalizeOptions = (options, labels) => Array.isArray(options) ? options.reduce((acc, item) => {
			let label = labels != null && !Array.isArray(labels) && typeof labels[item] == "string" ? labels[item] : String(item);
			return acc[label] = item, acc;
		}, {}) : options;
		Controls = {
			check: CheckboxControl,
			"inline-check": CheckboxControl,
			radio: RadioControl,
			"inline-radio": RadioControl,
			select: SelectControl,
			"multi-select": SelectControl
		};
		OptionsControl = (props) => {
			let { type = "select", labels, argType } = props, normalized = {
				...props,
				argType,
				options: argType ? normalizeOptions(argType.options, labels) : {},
				isInline: type.includes("inline"),
				isMulti: type.includes("multi")
			}, Control = Controls[type];
			if (Control) return import_react$8.createElement(Control, { ...normalized });
			throw new Error(`Unknown options type: ${type}`);
		};
		Container = styled.div(({ theme }) => ({
			position: "relative",
			":hover": {
				"& > .rejt-accordion-button::after": { background: theme.color.secondary },
				"& > .rejt-accordion-region > :is(.rejt-plus-menu, .rejt-minus-menu)": { opacity: 1 }
			}
		}));
		Trigger = styled.button(({ theme }) => ({
			padding: 0,
			background: "transparent",
			border: "none",
			marginRight: "3px",
			lineHeight: "22px",
			color: theme.color.secondary,
			"::after": {
				content: "\"\"",
				position: "absolute",
				top: 0,
				display: "block",
				width: "100%",
				marginLeft: "-1rem",
				height: "22px",
				background: "transparent",
				borderRadius: 4,
				transition: "background 0.2s",
				opacity: .1,
				paddingRight: "20px"
			},
			"::before": {
				content: "\"\"",
				position: "absolute"
			},
			"&[aria-expanded=\"true\"]::before": {
				left: -10,
				top: 10,
				borderTop: "3px solid rgba(153,153,153,0.6)",
				borderLeft: "3px solid transparent",
				borderRight: "3px solid transparent"
			},
			"&[aria-expanded=\"false\"]::before": {
				left: -8,
				top: 8,
				borderTop: "3px solid transparent",
				borderBottom: "3px solid transparent",
				borderLeft: "3px solid rgba(153,153,153,0.6)"
			}
		}));
		Region = styled.div({ display: "inline" });
		ERROR = "Error";
		OBJECT = "Object";
		ARRAY = "Array";
		STRING = "String";
		NUMBER = "Number";
		BOOLEAN = "Boolean";
		DATE = "Date";
		NULL = "Null";
		UNDEFINED = "Undefined";
		FUNCTION = "Function";
		SYMBOL = "Symbol";
		ADD_DELTA_TYPE = "ADD_DELTA_TYPE";
		REMOVE_DELTA_TYPE = "REMOVE_DELTA_TYPE";
		UPDATE_DELTA_TYPE = "UPDATE_DELTA_TYPE";
		VALUE = "value";
		JsonAddValue = class extends import_react$14.Component {
			constructor(props) {
				super(props), this.state = {
					inputRefKey: null,
					inputRefValue: null
				}, this.refInputValue = this.refInputValue.bind(this), this.refInputKey = this.refInputKey.bind(this), this.onKeydown = this.onKeydown.bind(this), this.onSubmit = this.onSubmit.bind(this);
			}
			componentDidMount() {
				let { inputRefKey, inputRefValue } = this.state, { onlyValue } = this.props;
				inputRefKey && typeof inputRefKey.focus == "function" && inputRefKey.focus(), onlyValue && inputRefValue && typeof inputRefValue.focus == "function" && inputRefValue.focus();
			}
			onKeydown(event) {
				if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat) return;
				let { inputRefKey, inputRefValue } = this.state, { addButtonElement, handleCancel } = this.props;
				[
					inputRefKey,
					inputRefValue,
					addButtonElement
				].some((elm) => elm === event.target) && ((event.code === "Enter" || event.key === "Enter") && (event.preventDefault(), this.onSubmit()), (event.code === "Escape" || event.key === "Escape") && (event.preventDefault(), handleCancel()));
			}
			onSubmit() {
				let { handleAdd, onlyValue, onSubmitValueParser, keyPath, deep } = this.props, { inputRefKey, inputRefValue } = this.state, result = {};
				if (!onlyValue) {
					if (!inputRefKey.value) return;
					result.key = inputRefKey.value;
				}
				result.newValue = onSubmitValueParser(!1, keyPath, deep, result.key, inputRefValue.value), handleAdd(result);
			}
			refInputKey(node) {
				this.state.inputRefKey = node;
			}
			refInputValue(node) {
				this.state.inputRefValue = node;
			}
			render() {
				let { handleCancel, onlyValue, addButtonElement, cancelButtonElement, inputElementGenerator, keyPath, deep } = this.props, addButtonElementLayout = addButtonElement && (0, import_react$14.cloneElement)(addButtonElement, { onClick: this.onSubmit }), cancelButtonElementLayout = cancelButtonElement && (0, import_react$14.cloneElement)(cancelButtonElement, { onClick: handleCancel }), inputElementValue = inputElementGenerator(VALUE, keyPath, deep), inputElementValueLayout = (0, import_react$14.cloneElement)(inputElementValue, {
					placeholder: "Value",
					ref: this.refInputValue,
					onKeyDown: this.onKeydown
				}), inputElementKeyLayout = null;
				if (!onlyValue) {
					let inputElementKey = inputElementGenerator("key", keyPath, deep);
					inputElementKeyLayout = (0, import_react$14.cloneElement)(inputElementKey, {
						placeholder: "Key",
						ref: this.refInputKey,
						onKeyDown: this.onKeydown
					});
				}
				return import_react$14.createElement("span", { className: "rejt-add-value-node" }, inputElementKeyLayout, inputElementValueLayout, addButtonElementLayout, cancelButtonElementLayout);
			}
		};
		JsonAddValue.defaultProps = {
			onlyValue: !1,
			addButtonElement: import_react$14.createElement("button", null, "+"),
			cancelButtonElement: import_react$14.createElement("button", null, "c")
		};
		JsonArray = class extends import_react$14.Component {
			constructor(props) {
				super(props);
				let keyPath = [...props.keyPath || [], props.name];
				this.state = {
					data: props.data,
					name: props.name,
					keyPath: keyPath ?? [],
					deep: props.deep ?? 0,
					nextDeep: (props.deep ?? 0) + 1,
					collapsed: props.isCollapsed(keyPath, props.deep ?? 0, props.data),
					addFormVisible: !1
				}, this.handleCollapseMode = this.handleCollapseMode.bind(this), this.handleRemoveItem = this.handleRemoveItem.bind(this), this.handleAddMode = this.handleAddMode.bind(this), this.handleAddValueAdd = this.handleAddValueAdd.bind(this), this.handleAddValueCancel = this.handleAddValueCancel.bind(this), this.handleEditValue = this.handleEditValue.bind(this), this.onChildUpdate = this.onChildUpdate.bind(this), this.renderCollapsed = this.renderCollapsed.bind(this), this.renderNotCollapsed = this.renderNotCollapsed.bind(this);
			}
			static getDerivedStateFromProps(props, state) {
				return props.data !== state.data ? { data: props.data } : null;
			}
			onChildUpdate(childKey, childData) {
				let { data, keyPath = [] } = this.state;
				data[childKey] = childData, this.setState({ data });
				let { onUpdate } = this.props, size = keyPath.length;
				onUpdate(keyPath[size - 1], data);
			}
			handleAddMode() {
				this.setState({ addFormVisible: !0 });
			}
			handleCollapseMode() {
				this.setState((state) => ({ collapsed: !state.collapsed }));
			}
			handleRemoveItem(index) {
				return () => {
					let { beforeRemoveAction, logger: logger5 } = this.props, { data, keyPath, nextDeep: deep } = this.state, oldValue = data[index];
					(beforeRemoveAction || Promise.resolve.bind(Promise))(index, keyPath, deep, oldValue).then(() => {
						let deltaUpdateResult = {
							keyPath,
							deep,
							key: index,
							oldValue,
							type: REMOVE_DELTA_TYPE
						};
						data.splice(index, 1), this.setState({ data });
						let { onUpdate, onDeltaUpdate } = this.props;
						onUpdate(keyPath[keyPath.length - 1], data), onDeltaUpdate(deltaUpdateResult);
					}).catch(logger5.error);
				};
			}
			handleAddValueAdd({ newValue }) {
				let { data, keyPath = [], nextDeep: deep } = this.state, { beforeAddAction, logger: logger5 } = this.props, key = data.length;
				(beforeAddAction || Promise.resolve.bind(Promise))(key, keyPath, deep, newValue).then(() => {
					data[key] = newValue, this.setState({ data }), this.handleAddValueCancel();
					let { onUpdate, onDeltaUpdate } = this.props;
					onUpdate(keyPath[keyPath.length - 1], data), onDeltaUpdate({
						type: ADD_DELTA_TYPE,
						keyPath,
						deep,
						key,
						newValue
					});
				}).catch(logger5.error);
			}
			handleAddValueCancel() {
				this.setState({ addFormVisible: !1 });
			}
			handleEditValue({ key, value }) {
				return new Promise((resolve, reject) => {
					let { beforeUpdateAction } = this.props, { data, keyPath, nextDeep: deep } = this.state, oldValue = data[key];
					(beforeUpdateAction || Promise.resolve.bind(Promise))(key, keyPath, deep, oldValue, value).then(() => {
						data[key] = value, this.setState({ data });
						let { onUpdate, onDeltaUpdate } = this.props;
						onUpdate(keyPath[keyPath.length - 1], data), onDeltaUpdate({
							type: UPDATE_DELTA_TYPE,
							keyPath,
							deep,
							key,
							newValue: value,
							oldValue
						}), resolve(void 0);
					}).catch(reject);
				});
			}
			renderCollapsed() {
				let { name, data, keyPath, deep } = this.state, { handleRemove, readOnly, dataType, minusMenuElement } = this.props, isReadOnly = readOnly(name, data, keyPath, deep, dataType), removeItemButton = minusMenuElement && (0, import_react$14.cloneElement)(minusMenuElement, {
					onClick: handleRemove,
					className: "rejt-minus-menu",
					"aria-label": `remove the array '${String(name)}'`
				});
				return import_react$14.createElement(import_react$14.Fragment, null, import_react$14.createElement("span", { className: "rejt-collapsed-value" }, "[...] ", data.length, " ", data.length === 1 ? "item" : "items"), !isReadOnly && removeItemButton);
			}
			renderNotCollapsed() {
				let { name, data, keyPath, deep, addFormVisible, nextDeep } = this.state, { isCollapsed, handleRemove, onDeltaUpdate, readOnly, dataType, addButtonElement, cancelButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger5, onSubmitValueParser } = this.props, isReadOnly = readOnly(name, data, keyPath, deep, dataType), addItemButton = plusMenuElement && (0, import_react$14.cloneElement)(plusMenuElement, {
					onClick: this.handleAddMode,
					className: "rejt-plus-menu",
					"aria-label": `add a new item to the '${String(name)}' array`
				}), removeItemButton = minusMenuElement && (0, import_react$14.cloneElement)(minusMenuElement, {
					onClick: handleRemove,
					className: "rejt-minus-menu",
					"aria-label": `remove the array '${String(name)}'`
				});
				return import_react$14.createElement(import_react$14.Fragment, null, import_react$14.createElement("span", { className: "rejt-not-collapsed-delimiter" }, "["), !addFormVisible && addItemButton, import_react$14.createElement("ul", { className: "rejt-not-collapsed-list" }, data.map((item, index) => import_react$14.createElement(JsonNode, {
					key: index,
					name: index.toString(),
					data: item,
					keyPath,
					deep: nextDeep,
					isCollapsed,
					handleRemove: this.handleRemoveItem(index),
					handleUpdateValue: this.handleEditValue,
					onUpdate: this.onChildUpdate,
					onDeltaUpdate,
					readOnly,
					addButtonElement,
					cancelButtonElement,
					inputElementGenerator,
					textareaElementGenerator,
					minusMenuElement,
					plusMenuElement,
					beforeRemoveAction,
					beforeAddAction,
					beforeUpdateAction,
					logger: logger5,
					onSubmitValueParser
				}))), !isReadOnly && addFormVisible && import_react$14.createElement("div", { className: "rejt-add-form" }, import_react$14.createElement(JsonAddValue, {
					handleAdd: this.handleAddValueAdd,
					handleCancel: this.handleAddValueCancel,
					onlyValue: !0,
					addButtonElement,
					cancelButtonElement,
					inputElementGenerator,
					keyPath,
					deep,
					onSubmitValueParser
				})), import_react$14.createElement("span", { className: "rejt-not-collapsed-delimiter" }, "]"), !isReadOnly && removeItemButton);
			}
			render() {
				let { name, collapsed, keyPath, deep } = this.state, value = collapsed ? this.renderCollapsed() : this.renderNotCollapsed();
				return import_react$14.createElement(JsonNodeAccordion, {
					name,
					collapsed,
					deep,
					keyPath,
					onClick: this.handleCollapseMode
				}, value);
			}
		};
		JsonArray.defaultProps = {
			keyPath: [],
			deep: 0,
			minusMenuElement: import_react$14.createElement("span", null, " - "),
			plusMenuElement: import_react$14.createElement("span", null, " + ")
		};
		JsonFunctionValue = class extends import_react$14.Component {
			constructor(props) {
				super(props);
				let keyPath = [...props.keyPath || [], props.name];
				this.state = {
					value: props.value,
					name: props.name,
					keyPath: keyPath ?? [],
					deep: props.deep ?? 0,
					editEnabled: !1,
					inputRef: null
				}, this.handleEditMode = this.handleEditMode.bind(this), this.refInput = this.refInput.bind(this), this.handleCancelEdit = this.handleCancelEdit.bind(this), this.handleEdit = this.handleEdit.bind(this), this.onKeydown = this.onKeydown.bind(this);
			}
			static getDerivedStateFromProps(props, state) {
				return props.value !== state.value ? { value: props.value } : null;
			}
			componentDidUpdate() {
				let { editEnabled, inputRef, name, value, keyPath, deep } = this.state, { readOnly, dataType } = this.props, readOnlyResult = readOnly(name, value, keyPath, deep, dataType);
				editEnabled && !readOnlyResult && typeof inputRef.focus == "function" && inputRef.focus();
			}
			onKeydown(event) {
				let { inputRef } = this.state;
				event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat || inputRef !== event.target || ((event.code === "Enter" || event.key === "Enter") && (event.preventDefault(), this.handleEdit()), (event.code === "Escape" || event.key === "Escape") && (event.preventDefault(), this.handleCancelEdit()));
			}
			handleEdit() {
				let { handleUpdateValue, originalValue, logger: logger5, onSubmitValueParser, keyPath } = this.props, { inputRef, name, deep } = this.state;
				if (!inputRef) return;
				let newValue = onSubmitValueParser(!0, keyPath, deep, name, inputRef.value), result = {
					value: newValue,
					key: name
				};
				(handleUpdateValue || Promise.resolve.bind(Promise))(result).then(() => {
					isComponentWillChange(originalValue, newValue) || this.handleCancelEdit();
				}).catch(logger5.error);
			}
			handleEditMode() {
				this.setState({ editEnabled: !0 });
			}
			refInput(node) {
				this.state.inputRef = node;
			}
			handleCancelEdit() {
				this.setState({ editEnabled: !1 });
			}
			render() {
				let { name, value, editEnabled, keyPath, deep } = this.state, { handleRemove, originalValue, readOnly, dataType, textareaElementGenerator, minusMenuElement, keyPath: comeFromKeyPath = [] } = this.props, result = null, minusElement = null, resultOnlyResult = readOnly(name, originalValue, keyPath, deep, dataType);
				if (editEnabled && !resultOnlyResult) {
					let textareaElement = textareaElementGenerator(VALUE, comeFromKeyPath, deep, name, originalValue, dataType), textareaElementLayout = (0, import_react$14.cloneElement)(textareaElement, {
						ref: this.refInput,
						defaultValue: value,
						onKeyDown: this.onKeydown
					});
					result = import_react$14.createElement("span", { className: "rejt-edit-form" }, textareaElementLayout), minusElement = null;
				} else {
					result = import_react$14.createElement("span", {
						className: "rejt-value",
						onClick: resultOnlyResult ? void 0 : this.handleEditMode
					}, value);
					let parentPropertyName = comeFromKeyPath.at(-1), minusMenuLayout = minusMenuElement && (0, import_react$14.cloneElement)(minusMenuElement, {
						onClick: handleRemove,
						className: "rejt-minus-menu",
						"aria-label": `remove the function '${String(name)}'${String(parentPropertyName) ? ` from '${String(parentPropertyName)}'` : ""}`
					});
					minusElement = resultOnlyResult ? null : minusMenuLayout;
				}
				return import_react$14.createElement("li", { className: "rejt-value-node" }, import_react$14.createElement("span", { className: "rejt-name" }, name, " : "), result, minusElement);
			}
		};
		JsonFunctionValue.defaultProps = {
			keyPath: [],
			deep: 0,
			handleUpdateValue: () => {},
			cancelButtonElement: import_react$14.createElement("button", null, "c"),
			minusMenuElement: import_react$14.createElement("span", null, " - ")
		};
		JsonNode = class extends import_react$14.Component {
			constructor(props) {
				super(props), this.state = {
					data: props.data,
					name: props.name,
					keyPath: props.keyPath ?? [],
					deep: props.deep ?? 0
				};
			}
			static getDerivedStateFromProps(props, state) {
				return props.data !== state.data ? { data: props.data } : null;
			}
			render() {
				let { data, name, keyPath, deep } = this.state, { isCollapsed, handleRemove, handleUpdateValue, onUpdate, onDeltaUpdate, readOnly, addButtonElement, cancelButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger5, onSubmitValueParser } = this.props, readOnlyTrue = () => !0, dataType = getObjectType(data);
				switch (dataType) {
					case ERROR: return import_react$14.createElement(JsonObject, {
						data,
						name,
						isCollapsed,
						keyPath,
						deep,
						handleRemove,
						onUpdate,
						onDeltaUpdate,
						readOnly: readOnlyTrue,
						dataType,
						addButtonElement,
						cancelButtonElement,
						inputElementGenerator,
						textareaElementGenerator,
						minusMenuElement,
						plusMenuElement,
						beforeRemoveAction,
						beforeAddAction,
						beforeUpdateAction,
						logger: logger5,
						onSubmitValueParser
					});
					case OBJECT: return import_react$14.createElement(JsonObject, {
						data,
						name,
						isCollapsed,
						keyPath,
						deep,
						handleRemove,
						onUpdate,
						onDeltaUpdate,
						readOnly,
						dataType,
						addButtonElement,
						cancelButtonElement,
						inputElementGenerator,
						textareaElementGenerator,
						minusMenuElement,
						plusMenuElement,
						beforeRemoveAction,
						beforeAddAction,
						beforeUpdateAction,
						logger: logger5,
						onSubmitValueParser
					});
					case ARRAY: return import_react$14.createElement(JsonArray, {
						data,
						name,
						isCollapsed,
						keyPath,
						deep,
						handleRemove,
						onUpdate,
						onDeltaUpdate,
						readOnly,
						dataType,
						addButtonElement,
						cancelButtonElement,
						inputElementGenerator,
						textareaElementGenerator,
						minusMenuElement,
						plusMenuElement,
						beforeRemoveAction,
						beforeAddAction,
						beforeUpdateAction,
						logger: logger5,
						onSubmitValueParser
					});
					case STRING: return import_react$14.createElement(JsonValue, {
						name,
						value: `"${data}"`,
						originalValue: data,
						keyPath,
						deep,
						handleRemove,
						handleUpdateValue,
						readOnly,
						dataType,
						cancelButtonElement,
						inputElementGenerator,
						minusMenuElement,
						logger: logger5,
						onSubmitValueParser
					});
					case NUMBER: return import_react$14.createElement(JsonValue, {
						name,
						value: data,
						originalValue: data,
						keyPath,
						deep,
						handleRemove,
						handleUpdateValue,
						readOnly,
						dataType,
						cancelButtonElement,
						inputElementGenerator,
						minusMenuElement,
						logger: logger5,
						onSubmitValueParser
					});
					case BOOLEAN: return import_react$14.createElement(JsonValue, {
						name,
						value: data ? "true" : "false",
						originalValue: data,
						keyPath,
						deep,
						handleRemove,
						handleUpdateValue,
						readOnly,
						dataType,
						cancelButtonElement,
						inputElementGenerator,
						minusMenuElement,
						logger: logger5,
						onSubmitValueParser
					});
					case DATE: return import_react$14.createElement(JsonValue, {
						name,
						value: data.toISOString(),
						originalValue: data,
						keyPath,
						deep,
						handleRemove,
						handleUpdateValue,
						readOnly: readOnlyTrue,
						dataType,
						cancelButtonElement,
						inputElementGenerator,
						minusMenuElement,
						logger: logger5,
						onSubmitValueParser
					});
					case NULL: return import_react$14.createElement(JsonValue, {
						name,
						value: "null",
						originalValue: "null",
						keyPath,
						deep,
						handleRemove,
						handleUpdateValue,
						readOnly,
						dataType,
						cancelButtonElement,
						inputElementGenerator,
						minusMenuElement,
						logger: logger5,
						onSubmitValueParser
					});
					case UNDEFINED: return import_react$14.createElement(JsonValue, {
						name,
						value: "undefined",
						originalValue: "undefined",
						keyPath,
						deep,
						handleRemove,
						handleUpdateValue,
						readOnly,
						dataType,
						cancelButtonElement,
						inputElementGenerator,
						minusMenuElement,
						logger: logger5,
						onSubmitValueParser
					});
					case FUNCTION: return import_react$14.createElement(JsonFunctionValue, {
						name,
						value: data.toString(),
						originalValue: data,
						keyPath,
						deep,
						handleRemove,
						handleUpdateValue,
						readOnly,
						dataType,
						cancelButtonElement,
						textareaElementGenerator,
						minusMenuElement,
						logger: logger5,
						onSubmitValueParser
					});
					case SYMBOL: return import_react$14.createElement(JsonValue, {
						name,
						value: data.toString(),
						originalValue: data,
						keyPath,
						deep,
						handleRemove,
						handleUpdateValue,
						readOnly: readOnlyTrue,
						dataType,
						cancelButtonElement,
						inputElementGenerator,
						minusMenuElement,
						logger: logger5,
						onSubmitValueParser
					});
					default: return null;
				}
			}
		};
		JsonNode.defaultProps = {
			keyPath: [],
			deep: 0
		};
		JsonObject = class extends import_react$14.Component {
			constructor(props) {
				super(props);
				let keyPath = props.deep === -1 ? [] : [...props.keyPath || [], props.name];
				this.state = {
					name: props.name,
					data: props.data,
					keyPath: keyPath ?? [],
					deep: props.deep ?? 0,
					nextDeep: (props.deep ?? 0) + 1,
					collapsed: props.isCollapsed(keyPath, props.deep ?? 0, props.data),
					addFormVisible: !1
				}, this.handleCollapseMode = this.handleCollapseMode.bind(this), this.handleRemoveValue = this.handleRemoveValue.bind(this), this.handleAddMode = this.handleAddMode.bind(this), this.handleAddValueAdd = this.handleAddValueAdd.bind(this), this.handleAddValueCancel = this.handleAddValueCancel.bind(this), this.handleEditValue = this.handleEditValue.bind(this), this.onChildUpdate = this.onChildUpdate.bind(this), this.renderCollapsed = this.renderCollapsed.bind(this), this.renderNotCollapsed = this.renderNotCollapsed.bind(this);
			}
			static getDerivedStateFromProps(props, state) {
				return props.data !== state.data ? { data: props.data } : null;
			}
			onChildUpdate(childKey, childData) {
				let { data, keyPath = [] } = this.state;
				data[childKey] = childData, this.setState({ data });
				let { onUpdate } = this.props, size = keyPath.length;
				onUpdate(keyPath[size - 1], data);
			}
			handleAddMode() {
				this.setState({ addFormVisible: !0 });
			}
			handleAddValueCancel() {
				this.setState({ addFormVisible: !1 });
			}
			handleAddValueAdd({ key, newValue }) {
				let { data, keyPath = [], nextDeep: deep } = this.state, { beforeAddAction, logger: logger5 } = this.props;
				(beforeAddAction || Promise.resolve.bind(Promise))(key, keyPath, deep, newValue).then(() => {
					data[key] = newValue, this.setState({ data }), this.handleAddValueCancel();
					let { onUpdate, onDeltaUpdate } = this.props;
					onUpdate(keyPath[keyPath.length - 1], data), onDeltaUpdate({
						type: ADD_DELTA_TYPE,
						keyPath,
						deep,
						key,
						newValue
					});
				}).catch(logger5.error);
			}
			handleRemoveValue(key) {
				return () => {
					let { beforeRemoveAction, logger: logger5 } = this.props, { data, keyPath = [], nextDeep: deep } = this.state, oldValue = data[key];
					(beforeRemoveAction || Promise.resolve.bind(Promise))(key, keyPath, deep, oldValue).then(() => {
						let deltaUpdateResult = {
							keyPath,
							deep,
							key,
							oldValue,
							type: REMOVE_DELTA_TYPE
						};
						delete data[key], this.setState({ data });
						let { onUpdate, onDeltaUpdate } = this.props;
						onUpdate(keyPath[keyPath.length - 1], data), onDeltaUpdate(deltaUpdateResult);
					}).catch(logger5.error);
				};
			}
			handleCollapseMode() {
				this.setState((state) => ({ collapsed: !state.collapsed }));
			}
			handleEditValue({ key, value }) {
				return new Promise((resolve, reject) => {
					let { beforeUpdateAction } = this.props, { data, keyPath = [], nextDeep: deep } = this.state, oldValue = data[key];
					(beforeUpdateAction || Promise.resolve.bind(Promise))(key, keyPath, deep, oldValue, value).then(() => {
						data[key] = value, this.setState({ data });
						let { onUpdate, onDeltaUpdate } = this.props;
						onUpdate(keyPath[keyPath.length - 1], data), onDeltaUpdate({
							type: UPDATE_DELTA_TYPE,
							keyPath,
							deep,
							key,
							newValue: value,
							oldValue
						}), resolve();
					}).catch(reject);
				});
			}
			renderCollapsed() {
				let { name, keyPath, deep, data } = this.state, { handleRemove, readOnly, dataType, minusMenuElement } = this.props, keyList = Object.getOwnPropertyNames(data), isReadOnly = readOnly(name, data, keyPath, deep, dataType), removeItemButton = minusMenuElement && (0, import_react$14.cloneElement)(minusMenuElement, {
					onClick: handleRemove,
					className: "rejt-minus-menu",
					"aria-label": `remove the object '${String(name)}'`
				});
				return import_react$14.createElement(import_react$14.Fragment, null, import_react$14.createElement("span", { className: "rejt-collapsed-value" }, "{...}", " ", keyList.length, " ", keyList.length === 1 ? "key" : "keys"), !isReadOnly && removeItemButton);
			}
			renderNotCollapsed() {
				let { name, data, keyPath, deep, nextDeep, addFormVisible } = this.state, { isCollapsed, handleRemove, onDeltaUpdate, readOnly, dataType, addButtonElement, cancelButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger5, onSubmitValueParser } = this.props, keyList = Object.getOwnPropertyNames(data), isReadOnly = readOnly(name, data, keyPath, deep, dataType), addItemButton = plusMenuElement && (0, import_react$14.cloneElement)(plusMenuElement, {
					onClick: this.handleAddMode,
					className: "rejt-plus-menu",
					"aria-label": `add a new property to the object '${String(name)}'`
				}), removeItemButton = minusMenuElement && (0, import_react$14.cloneElement)(minusMenuElement, {
					onClick: handleRemove,
					className: "rejt-minus-menu",
					"aria-label": `remove the object '${String(name)}'`
				}), list = keyList.map((key) => import_react$14.createElement(JsonNode, {
					key,
					name: key,
					data: data[key],
					keyPath,
					deep: nextDeep,
					isCollapsed,
					handleRemove: this.handleRemoveValue(key),
					handleUpdateValue: this.handleEditValue,
					onUpdate: this.onChildUpdate,
					onDeltaUpdate,
					readOnly,
					addButtonElement,
					cancelButtonElement,
					inputElementGenerator,
					textareaElementGenerator,
					minusMenuElement,
					plusMenuElement,
					beforeRemoveAction,
					beforeAddAction,
					beforeUpdateAction,
					logger: logger5,
					onSubmitValueParser
				}));
				return import_react$14.createElement(import_react$14.Fragment, null, import_react$14.createElement("span", { className: "rejt-not-collapsed-delimiter" }, "{"), !isReadOnly && addItemButton, import_react$14.createElement("ul", { className: "rejt-not-collapsed-list" }, list), !isReadOnly && addFormVisible && import_react$14.createElement("div", { className: "rejt-add-form" }, import_react$14.createElement(JsonAddValue, {
					handleAdd: this.handleAddValueAdd,
					handleCancel: this.handleAddValueCancel,
					addButtonElement,
					cancelButtonElement,
					inputElementGenerator,
					keyPath,
					deep,
					onSubmitValueParser
				})), import_react$14.createElement("span", { className: "rejt-not-collapsed-delimiter" }, "}"), !isReadOnly && removeItemButton);
			}
			render() {
				let { name, collapsed, keyPath, deep = 0 } = this.state, value = collapsed ? this.renderCollapsed() : this.renderNotCollapsed();
				return import_react$14.createElement(JsonNodeAccordion, {
					name,
					collapsed,
					deep,
					keyPath,
					onClick: this.handleCollapseMode
				}, value);
			}
		};
		JsonObject.defaultProps = {
			keyPath: [],
			deep: 0,
			minusMenuElement: import_react$14.createElement("span", null, " - "),
			plusMenuElement: import_react$14.createElement("span", null, " + ")
		};
		JsonValue = class extends import_react$14.Component {
			constructor(props) {
				super(props);
				let keyPath = [...props.keyPath || [], props.name];
				this.state = {
					value: props.value,
					name: props.name,
					keyPath: keyPath ?? [],
					deep: props.deep ?? 0,
					editEnabled: !1,
					inputRef: null
				}, this.handleEditMode = this.handleEditMode.bind(this), this.refInput = this.refInput.bind(this), this.handleCancelEdit = this.handleCancelEdit.bind(this), this.handleEdit = this.handleEdit.bind(this), this.onKeydown = this.onKeydown.bind(this);
			}
			static getDerivedStateFromProps(props, state) {
				return props.value !== state.value ? { value: props.value } : null;
			}
			componentDidUpdate() {
				let { editEnabled, inputRef, name, value, keyPath, deep } = this.state, { readOnly, dataType } = this.props, isReadOnly = readOnly(name, value, keyPath, deep, dataType);
				editEnabled && !isReadOnly && typeof inputRef.focus == "function" && inputRef.focus();
			}
			onKeydown(event) {
				let { inputRef } = this.state;
				event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat || inputRef !== event.target || ((event.code === "Enter" || event.key === "Enter") && (event.preventDefault(), this.handleEdit()), (event.code === "Escape" || event.key === "Escape") && (event.preventDefault(), this.handleCancelEdit()));
			}
			handleEdit() {
				let { handleUpdateValue, originalValue, logger: logger5, onSubmitValueParser, keyPath } = this.props, { inputRef, name, deep } = this.state;
				if (!inputRef) return;
				let newValue = onSubmitValueParser(!0, keyPath, deep, name, inputRef.value), result = {
					value: newValue,
					key: name
				};
				(handleUpdateValue || Promise.resolve.bind(Promise))(result).then(() => {
					isComponentWillChange(originalValue, newValue) || this.handleCancelEdit();
				}).catch(logger5.error);
			}
			handleEditMode() {
				this.setState({ editEnabled: !0 });
			}
			refInput(node) {
				this.state.inputRef = node;
			}
			handleCancelEdit() {
				this.setState({ editEnabled: !1 });
			}
			render() {
				let { name, value, editEnabled, keyPath, deep } = this.state, { handleRemove, originalValue, readOnly, dataType, inputElementGenerator, minusMenuElement, keyPath: comeFromKeyPath } = this.props, isReadOnly = readOnly(name, originalValue, keyPath, deep, dataType), isEditing = editEnabled && !isReadOnly, inputElement = inputElementGenerator(VALUE, comeFromKeyPath, deep, name, originalValue, dataType), inputElementLayout = (0, import_react$14.cloneElement)(inputElement, {
					ref: this.refInput,
					defaultValue: JSON.stringify(originalValue),
					onKeyDown: this.onKeydown
				}), parentPropertyName = keyPath.at(-2), minusMenuLayout = minusMenuElement && (0, import_react$14.cloneElement)(minusMenuElement, {
					onClick: handleRemove,
					className: "rejt-minus-menu",
					"aria-label": `remove the property '${String(name)}' with value '${String(originalValue)}'${String(parentPropertyName) ? ` from '${String(parentPropertyName)}'` : ""}`
				});
				return import_react$14.createElement("li", { className: "rejt-value-node" }, import_react$14.createElement("span", { className: "rejt-name" }, name, " : "), isEditing ? import_react$14.createElement("span", { className: "rejt-edit-form" }, inputElementLayout) : import_react$14.createElement("span", {
					className: "rejt-value",
					onClick: isReadOnly ? void 0 : this.handleEditMode
				}, String(value)), !isReadOnly && !isEditing && minusMenuLayout);
			}
		};
		JsonValue.defaultProps = {
			keyPath: [],
			deep: 0,
			handleUpdateValue: () => Promise.resolve(),
			cancelButtonElement: import_react$14.createElement("button", null, "c"),
			minusMenuElement: import_react$14.createElement("span", null, " - ")
		};
		JsonTree = class extends import_react$13.Component {
			constructor(props) {
				super(props), this.state = {
					data: props.data,
					rootName: props.rootName
				}, this.onUpdate = this.onUpdate.bind(this), this.removeRoot = this.removeRoot.bind(this);
			}
			static getDerivedStateFromProps(props, state) {
				return props.data !== state.data || props.rootName !== state.rootName ? {
					data: props.data,
					rootName: props.rootName
				} : null;
			}
			onUpdate(key, data) {
				this.setState({ data }), this.props.onFullyUpdate?.(data);
			}
			removeRoot() {
				this.onUpdate(null, null);
			}
			render() {
				let { data, rootName } = this.state, { isCollapsed, onDeltaUpdate, readOnly, addButtonElement, cancelButtonElement, inputElement, textareaElement, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger5, onSubmitValueParser, fallback = null } = this.props, dataType = getObjectType(data), readOnlyFunction = readOnly;
				getObjectType(readOnly) === "Boolean" && (readOnlyFunction = () => readOnly);
				let inputElementFunction = inputElement;
				inputElement && getObjectType(inputElement) !== "Function" && (inputElementFunction = () => inputElement);
				let textareaElementFunction = textareaElement;
				return textareaElement && getObjectType(textareaElement) !== "Function" && (textareaElementFunction = () => textareaElement), dataType === "Object" || dataType === "Array" ? import_react$13.createElement("div", { className: "rejt-tree" }, import_react$13.createElement(JsonNode, {
					data,
					name: rootName || "root",
					deep: -1,
					isCollapsed: isCollapsed ?? (() => !1),
					onUpdate: this.onUpdate,
					onDeltaUpdate: onDeltaUpdate ?? (() => {}),
					readOnly: readOnlyFunction,
					addButtonElement,
					cancelButtonElement,
					inputElementGenerator: inputElementFunction,
					textareaElementGenerator: textareaElementFunction,
					minusMenuElement,
					plusMenuElement,
					handleRemove: this.removeRoot,
					beforeRemoveAction,
					beforeAddAction,
					beforeUpdateAction,
					logger: logger5 ?? {},
					onSubmitValueParser: onSubmitValueParser ?? ((val) => val)
				})) : fallback;
			}
		};
		JsonTree.defaultProps = {
			rootName: "root",
			isCollapsed: (keyPath, deep) => deep !== -1,
			readOnly: () => !1,
			onFullyUpdate: () => {},
			onDeltaUpdate: () => {},
			beforeRemoveAction: () => Promise.resolve(),
			beforeAddAction: () => Promise.resolve(),
			beforeUpdateAction: () => Promise.resolve(),
			logger: { error: () => {} },
			onSubmitValueParser: (isEditMode, keyPath, deep, name, rawValue) => parse3(rawValue),
			inputElement: () => import_react$13.createElement("input", null),
			textareaElement: () => import_react$13.createElement("textarea", null),
			fallback: null
		};
		({window: globalWindow} = globalThis), Wrapper4 = styled.div(({ theme }) => ({
			position: "relative",
			display: "flex",
			isolation: "isolate",
			gap: 8,
			".rejt-tree": {
				flex: 1,
				marginLeft: "1rem",
				fontSize: "13px",
				listStyleType: "none"
			},
			".rejt-value-node:hover": { "& > button": { opacity: 1 } },
			".rejt-add-form": { marginLeft: 10 },
			".rejt-add-value-node": {
				display: "inline-flex",
				alignItems: "center"
			},
			".rejt-name": {
				color: theme.color.secondary,
				lineHeight: "22px"
			},
			".rejt-not-collapsed-list": {
				listStyle: "none",
				margin: "0 0 0 1rem",
				padding: 0
			},
			".rejt-not-collapsed-delimiter": { lineHeight: "22px" },
			".rejt-value": {
				display: "inline-block",
				border: "1px solid transparent",
				borderRadius: 4,
				margin: "1px 0",
				padding: "0 4px",
				cursor: "text",
				color: theme.color.defaultText
			},
			".rejt-value-node:hover > .rejt-value": {
				background: theme.base === "light" ? theme.color.lighter : "hsl(0 0 100 / 0.02)",
				borderColor: theme.appBorderColor
			},
			".rejt-collapsed-value": { color: theme.color.defaultText }
		})), ButtonInline = styled.button(({ theme, primary }) => ({
			border: 0,
			height: 20,
			margin: 1,
			borderRadius: 4,
			background: primary ? theme.color.secondary : "transparent",
			color: primary ? theme.color.lightest : theme.color.dark,
			fontWeight: primary ? "bold" : "normal",
			cursor: "pointer"
		})), ActionButton = styled.button(({ theme }) => ({
			background: "none",
			border: 0,
			display: "inline-flex",
			verticalAlign: "middle",
			padding: 3,
			marginLeft: 5,
			color: theme.textMutedColor,
			opacity: 0,
			transition: "opacity 0.2s",
			cursor: "pointer",
			position: "relative",
			svg: {
				width: 9,
				height: 9
			},
			":disabled": { cursor: "not-allowed" },
			":hover, :focus-visible": { opacity: 1 },
			"&:hover:not(:disabled), &:focus-visible:not(:disabled)": {
				"&.rejt-plus-menu": { color: theme.color.ancillary },
				"&.rejt-minus-menu": { color: theme.color.negative }
			}
		})), Input = styled.input(({ theme, placeholder }) => ({
			outline: 0,
			margin: placeholder ? 1 : "1px 0",
			padding: "3px 4px",
			color: theme.color.defaultText,
			background: theme.background.app,
			border: `1px solid ${theme.appBorderColor}`,
			borderRadius: 4,
			lineHeight: "14px",
			width: placeholder === "Key" ? 80 : 120,
			"&:focus": { border: `1px solid ${theme.color.secondary}` }
		})), RawButton = styled(ToggleButton)({
			alignSelf: "flex-start",
			order: 2,
			marginRight: -10
		}), RawInput = styled(Form.Textarea)(({ theme }) => ({
			flex: 1,
			padding: "7px 6px",
			fontFamily: theme.typography.fonts.mono,
			fontSize: "12px",
			lineHeight: "18px",
			"&::placeholder": {
				fontFamily: theme.typography.fonts.base,
				fontSize: "13px"
			},
			"&:placeholder-shown": { padding: "7px 10px" }
		})), ENTER_EVENT = {
			bubbles: !0,
			cancelable: !0,
			key: "Enter",
			code: "Enter",
			keyCode: 13
		}, dispatchEnterKey = (event) => {
			event.currentTarget.dispatchEvent(new globalWindow.KeyboardEvent("keydown", ENTER_EVENT));
		}, selectValue = (event) => {
			event.currentTarget.select();
		}, ObjectControl = ({ name, storyId, controlsId, value, onChange, argType, required }) => {
			let data = (0, import_react$12.useMemo)(() => value && cloneDeep(value), [value]), hasData = data != null, [showRaw, setShowRaw] = (0, import_react$12.useState)(!hasData), hadDataRef = (0, import_react$12.useRef)(hasData), [parseError, setParseError] = (0, import_react$12.useState)(null), readonly = !!argType?.table?.readonly, updateRaw = (0, import_react$12.useCallback)((raw) => {
				try {
					raw && onChange(JSON.parse(raw)), setParseError(null);
				} catch (e2) {
					setParseError(e2);
				}
			}, [onChange]), [forceVisible, setForceVisible] = (0, import_react$12.useState)(!1), onForceVisible = (0, import_react$12.useCallback)(() => {
				onChange({}), setForceVisible(!0);
			}, [onChange, setForceVisible]);
			(0, import_react$12.useEffect)(() => {
				!hadDataRef.current && hasData && showRaw && !forceVisible && setShowRaw(!1), hadDataRef.current = hasData;
			}, [
				forceVisible,
				hasData,
				showRaw
			]);
			let htmlElRef = (0, import_react$12.useRef)(null);
			(0, import_react$12.useEffect)(() => {
				forceVisible && htmlElRef.current && htmlElRef.current.select();
			}, [forceVisible]);
			let jsonString = (0, import_react$12.useMemo)(() => JSON.stringify(data ?? "", null, 2), [data]);
			if (!hasData) return import_react$12.createElement(Button, {
				ariaLabel: !1,
				disabled: readonly,
				id: getControlSetterButtonId(name, storyId, controlsId),
				onClick: onForceVisible
			}, "Set object");
			let rawInputId = getControlId(name, storyId, controlsId), rawJSONForm = import_react$12.createElement(import_react$12.Fragment, null, import_react$12.createElement("label", {
				htmlFor: rawInputId,
				className: "sb-sr-only"
			}, "Edit ", name, " as JSON"), import_react$12.createElement(RawInput, {
				ref: htmlElRef,
				id: rawInputId,
				minRows: 3,
				name,
				key: jsonString,
				defaultValue: jsonString,
				onBlur: (event) => updateRaw(event.target.value),
				placeholder: "Edit JSON string...",
				autoFocus: forceVisible,
				valid: parseError ? "error" : void 0,
				readOnly: readonly,
				"aria-required": required || void 0
			})), isObjectOrArray = Array.isArray(value) || typeof value == "object" && value?.constructor === Object;
			return import_react$12.createElement(Wrapper4, null, isObjectOrArray && import_react$12.createElement(RawButton, {
				disabled: readonly,
				pressed: showRaw,
				ariaLabel: `Edit ${name} as JSON`,
				onClick: (e2) => {
					e2.preventDefault(), setShowRaw((isRaw) => !isRaw);
				},
				variant: "ghost",
				padding: "small",
				size: "small"
			}, import_react$12.createElement(EditIcon, null)), showRaw ? rawJSONForm : import_react$12.createElement(JsonTree, {
				readOnly: readonly || !isObjectOrArray,
				isCollapsed: isObjectOrArray ? void 0 : () => !0,
				data,
				rootName: name,
				onFullyUpdate: onChange,
				cancelButtonElement: import_react$12.createElement(ButtonInline, { type: "button" }, "Cancel"),
				addButtonElement: import_react$12.createElement(ButtonInline, {
					type: "submit",
					primary: !0
				}, "Save"),
				plusMenuElement: import_react$12.createElement(ActionButton, { type: "button" }, import_react$12.createElement(AddIcon, null)),
				minusMenuElement: import_react$12.createElement(ActionButton, { type: "button" }, import_react$12.createElement(SubtractIcon, null)),
				inputElement: (_2, __, ___, key) => key ? import_react$12.createElement(Input, {
					onFocus: selectValue,
					onBlur: dispatchEnterKey
				}) : import_react$12.createElement(Input, null),
				fallback: rawJSONForm
			}));
		};
		RangeInput = styled.input(({ theme, min, max, value, disabled }) => {
			let trackBaseStyles = {
				background: theme.base === "light" ? `linear-gradient(to right, 
          ${theme.color.green} 0%, ${theme.color.green} ${(value - min) / (max - min) * 100}%, 
          ${curriedDarken$1(.02, theme.input.background)} ${(value - min) / (max - min) * 100}%, 
          ${curriedDarken$1(.02, theme.input.background)} 100%)` : `linear-gradient(to right, 
          ${theme.color.green} 0%, ${theme.color.green} ${(value - min) / (max - min) * 100}%, 
          ${curriedLighten$1(.02, theme.input.background)} ${(value - min) / (max - min) * 100}%, 
          ${curriedLighten$1(.02, theme.input.background)} 100%)`,
				borderRadius: 6,
				boxShadow: `${theme.base == "dark" ? "hsl(0 0 100 / 0.4)" : "hsl(0 0 0 / 0.44)"} 0 0 0 1px inset`,
				cursor: disabled ? "not-allowed" : "pointer",
				height: 6,
				width: "100%"
			}, trackFocusStyles = { borderColor: rgba(theme.color.secondary, .4) }, thumbBaseStyles = {
				width: 16,
				height: 16,
				borderRadius: 50,
				cursor: disabled ? "not-allowed" : "grab",
				background: theme.input.background,
				border: `1px solid ${theme.base == "dark" ? "hsl(0 0 100 / 0.4)" : "hsl(0 0 0 / 0.44)"}`,
				boxShadow: theme.base === "light" ? `0 1px 3px 0px ${rgba(theme.appBorderColor, .2)}` : "unset",
				transition: "all 150ms ease-out"
			}, thumbHoverStyles = {
				background: `${curriedDarken$1(.05, theme.input.background)}`,
				transform: "scale3d(1.1, 1.1, 1.1) translateY(-1px)",
				transition: "all 50ms ease-out"
			}, thumbActiveStyles = {
				background: `${theme.input.background}`,
				transform: "scale3d(1, 1, 1) translateY(0px)"
			}, thumbFocusStyles = {
				borderColor: theme.color.secondary,
				boxShadow: theme.base === "light" ? `0 0px 5px 0px ${theme.color.secondary}` : "unset"
			};
			return {
				appearance: "none",
				backgroundColor: "transparent",
				width: "100%",
				"&::-webkit-slider-runnable-track": trackBaseStyles,
				"&::-moz-range-track": trackBaseStyles,
				"&::-ms-track": {
					...trackBaseStyles,
					color: "transparent"
				},
				"&::-moz-range-thumb": {
					...thumbBaseStyles,
					"&:hover": thumbHoverStyles,
					"&:active": thumbActiveStyles
				},
				"&::-webkit-slider-thumb": {
					...thumbBaseStyles,
					marginTop: "-6px",
					appearance: "none",
					"&:hover": thumbHoverStyles,
					"&:active": thumbActiveStyles
				},
				"&::-ms-thumb": {
					...thumbBaseStyles,
					marginTop: 0,
					"&:hover": thumbHoverStyles,
					"&:active": thumbActiveStyles
				},
				"&:focus": {
					outline: "none",
					"&::-webkit-slider-runnable-track": trackFocusStyles,
					"&::-moz-range-track": trackFocusStyles,
					"&::-ms-track": trackFocusStyles,
					"&::-webkit-slider-thumb": thumbFocusStyles,
					"&::-moz-range-thumb": thumbFocusStyles,
					"&::-ms-thumb": thumbFocusStyles
				},
				"&::-ms-fill-lower": { borderRadius: 6 },
				"&::-ms-fill-upper": { borderRadius: 6 },
				"@supports (-ms-ime-align:auto)": { "input[type=range]": { margin: "0" } }
			};
		});
		RangeLabel = styled.span({
			paddingLeft: 5,
			paddingRight: 5,
			fontSize: 12,
			whiteSpace: "nowrap",
			fontFeatureSettings: "tnum",
			fontVariantNumeric: "tabular-nums"
		});
		RangeCurrentAndMaxLabel = styled(RangeLabel)(({ numberOFDecimalsPlaces, max }) => ({
			width: `${numberOFDecimalsPlaces + max.toString().length * 2 + 3}ch`,
			textAlign: "right",
			flexShrink: 0
		}));
		RangeWrapper = styled.div(({ readOnly }) => ({
			display: "flex",
			alignItems: "center",
			width: "100%",
			opacity: readOnly ? .5 : 1
		}));
		RangeControl = ({ name, storyId, controlsId, value, onChange, min = 0, max = 100, step = 1, onBlur, onFocus, argType, required }) => {
			let handleChange = (event) => {
				onChange(parse2(event.target.value));
			}, hasValue = value !== void 0, numberOFDecimalsPlaces = (0, import_react$16.useMemo)(() => getNumberOfDecimalPlaces(step), [step]), readonly = !!argType?.table?.readonly, controlId = getControlId(name, storyId, controlsId);
			return import_react$16.createElement(RangeWrapper, { readOnly: readonly }, import_react$16.createElement("label", {
				htmlFor: controlId,
				className: "sb-sr-only"
			}, name), import_react$16.createElement(RangeLabel, null, min), import_react$16.createElement(RangeInput, {
				id: controlId,
				type: "range",
				disabled: readonly,
				onChange: handleChange,
				"aria-required": required || void 0,
				name,
				min,
				max,
				step,
				onFocus,
				onBlur,
				value: value ?? min
			}), import_react$16.createElement(RangeCurrentAndMaxLabel, {
				numberOFDecimalsPlaces,
				max
			}, hasValue ? value.toFixed(numberOFDecimalsPlaces) : "--", " / ", max));
		};
		Wrapper5 = styled.label({ display: "flex" });
		MaxLength = styled.div(({ isMaxed }) => ({
			marginLeft: "0.75rem",
			paddingTop: "0.35rem",
			color: isMaxed ? "red" : void 0
		}));
		TextControl = ({ name, storyId, controlsId, value, onChange, onFocus, onBlur, maxLength, argType, required }) => {
			let handleChange = (event) => {
				onChange(event.target.value);
			}, readonly = !!argType?.table?.readonly, [forceVisible, setForceVisible] = (0, import_react$17.useState)(!1), onForceVisible = (0, import_react$17.useCallback)(() => {
				onChange(""), setForceVisible(!0);
			}, [setForceVisible]);
			if (value === void 0) return import_react$17.createElement(Button, {
				ariaLabel: !1,
				variant: "outline",
				size: "medium",
				disabled: readonly,
				id: getControlSetterButtonId(name, storyId, controlsId),
				onClick: onForceVisible
			}, "Set string");
			let isValid = typeof value == "string";
			return import_react$17.createElement(Wrapper5, null, import_react$17.createElement(Form.Textarea, {
				id: getControlId(name, storyId, controlsId),
				maxLength,
				onChange: handleChange,
				disabled: readonly,
				size: "flex",
				placeholder: "Edit string...",
				autoFocus: forceVisible,
				"aria-required": required || void 0,
				valid: isValid ? void 0 : "error",
				name,
				value: isValid ? value : "",
				onFocus,
				onBlur
			}), maxLength && import_react$17.createElement(MaxLength, { isMaxed: value?.length === maxLength }, value?.length ?? 0, " / ", maxLength));
		};
		FileInput = styled(Form.Input)({ padding: 10 });
		FilesControl = ({ onChange, name, storyId, controlsId, accept = "image/*", value, argType, required }) => {
			let inputElement = (0, import_react$18.useRef)(null), readonly = argType?.control?.readOnly;
			function handleFileChange(e2) {
				if (!e2.target.files) return;
				onChange(Array.from(e2.target.files).map((file) => URL.createObjectURL(file))), revokeOldUrls(value || []);
			}
			(0, import_react$18.useEffect)(() => {
				value == null && inputElement.current && (inputElement.current.value = "");
			}, [value, name]);
			let controlId = getControlId(name, storyId, controlsId);
			return import_react$18.createElement(import_react$18.Fragment, null, import_react$18.createElement("label", {
				htmlFor: controlId,
				className: "sb-sr-only"
			}, name), import_react$18.createElement(FileInput, {
				ref: inputElement,
				id: controlId,
				type: "file",
				name,
				multiple: !0,
				disabled: readonly,
				onChange: handleFileChange,
				accept,
				"aria-required": required || void 0,
				size: "flex"
			}));
		};
		LazyColorControl = (0, import_react$4.lazy)(() => __vitePreload(() => import("./Color-6AOWCN3U-3RYGKdrP.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]), import.meta.url));
		ColorControl = (props) => import_react$4.createElement(import_react$4.Suspense, { fallback: import_react$4.createElement("div", null) }, import_react$4.createElement(LazyColorControl, { ...props }));
		Controls2 = {
			array: ObjectControl,
			object: ObjectControl,
			boolean: BooleanControl,
			color: ColorControl,
			date: DateControl,
			number: NumberControl,
			check: OptionsControl,
			"inline-check": OptionsControl,
			radio: OptionsControl,
			"inline-radio": OptionsControl,
			select: OptionsControl,
			"multi-select": OptionsControl,
			range: RangeControl,
			text: TextControl,
			file: FilesControl
		};
		NoControl = () => import_react$3.createElement(import_react$3.Fragment, null, "-");
		ArgControl = ({ row, arg, updateArgs, isRequired, storyId, controlsId }) => {
			let { key, control } = row, [isFocused, setFocused] = (0, import_react$3.useState)(!1), [boxedValue, setBoxedValue] = (0, import_react$3.useState)({ value: arg });
			(0, import_react$3.useEffect)(() => {
				isFocused || setBoxedValue({ value: arg });
			}, [isFocused, arg]);
			let onChange = (0, import_react$3.useCallback)((argVal) => (setBoxedValue({ value: argVal }), updateArgs({ [key]: argVal }), argVal), [updateArgs, key]), onBlur = (0, import_react$3.useCallback)(() => setFocused(!1), []), onFocus = (0, import_react$3.useCallback)(() => setFocused(!0), []);
			if (!control || control.disable) return control?.disable !== !0 && row?.type?.name !== "function" ? import_react$3.createElement(import_react$3.Fragment, null, import_react$3.createElement("span", { className: "sbdocs sbdocs-argcontrol-setup" }, import_react$3.createElement(Link2, {
				href: "https://storybook.js.org/docs/essentials/controls?ref=ui",
				target: "_blank",
				withArrow: !0
			}, "Setup controls")), import_react$3.createElement("span", { className: "sbdocs sbdocs-argcontrol-placeholder" }, import_react$3.createElement(NoControl, null))) : import_react$3.createElement(NoControl, null);
			let props = {
				name: key,
				storyId,
				controlsId,
				argType: row,
				value: boxedValue.value,
				required: isRequired,
				onChange,
				onBlur,
				onFocus
			}, Control = Controls2[control.type] || NoControl;
			return import_react$3.createElement(Control, {
				...props,
				...control,
				controlType: control.type
			});
		};
		Table = styled.table(({ theme }) => ({ "&&": {
			borderCollapse: "collapse",
			borderSpacing: 0,
			border: "none",
			tr: {
				border: "none !important",
				background: "none"
			},
			"td, th": {
				padding: 0,
				border: "none",
				width: "auto!important"
			},
			marginTop: 0,
			marginBottom: 0,
			"th:first-of-type, td:first-of-type": { paddingLeft: 0 },
			"th:last-of-type, td:last-of-type": { paddingRight: 0 },
			td: {
				paddingTop: 0,
				paddingBottom: 4,
				"&:not(:first-of-type)": {
					paddingLeft: 10,
					paddingRight: 0
				}
			},
			tbody: {
				boxShadow: "none",
				border: "none"
			},
			code: codeCommon({ theme }),
			div: { span: { fontWeight: "bold" } },
			"& code": {
				margin: 0,
				display: "inline-block",
				fontSize: theme.typography.size.s1
			}
		} }));
		ArgJsDoc = ({ tags }) => {
			let params = (tags.params || []).filter((x2) => x2.description), hasDisplayableParams = params.length !== 0, hasDisplayableDeprecated = tags.deprecated != null, hasDisplayableReturns = tags.returns != null && tags.returns.description != null;
			return !hasDisplayableParams && !hasDisplayableReturns && !hasDisplayableDeprecated ? null : import_react$19.createElement(import_react$19.Fragment, null, import_react$19.createElement(Table, null, import_react$19.createElement("tbody", null, hasDisplayableDeprecated && import_react$19.createElement("tr", { key: "deprecated" }, import_react$19.createElement("td", { colSpan: 2 }, import_react$19.createElement("strong", null, "Deprecated"), ": ", tags.deprecated?.toString())), hasDisplayableParams && params.map((x2) => import_react$19.createElement("tr", { key: x2.name }, import_react$19.createElement("td", null, import_react$19.createElement("code", null, x2.name)), import_react$19.createElement("td", null, x2.description))), hasDisplayableReturns && import_react$19.createElement("tr", { key: "returns" }, import_react$19.createElement("td", null, import_react$19.createElement("code", null, "Returns")), import_react$19.createElement("td", null, tags.returns?.description)))));
		};
		ITEMS_BEFORE_EXPANSION = 8;
		Summary = styled.div(({ isExpanded }) => ({
			display: "flex",
			flexDirection: isExpanded ? "column" : "row",
			flexWrap: "wrap",
			alignItems: "flex-start",
			marginBottom: "-4px",
			minWidth: 100
		}));
		DetailsContainer = styled.details({
			display: "flex",
			flexDirection: "column",
			summary: { order: 2 },
			"summary::-webkit-details-marker": { display: "none" },
			"summary::marker": { content: "none" }
		});
		AlignedDetails = styled.div({
			display: "flex",
			flexDirection: "column",
			flexWrap: "wrap",
			alignItems: "flex-start"
		});
		Text3 = styled.span(codeCommon, ({ theme, simple = !1 }) => ({
			flex: "0 0 auto",
			fontFamily: theme.typography.fonts.mono,
			fontSize: theme.typography.size.s1,
			wordBreak: "break-word",
			whiteSpace: "normal",
			maxWidth: "100%",
			margin: 0,
			marginRight: "4px",
			marginBottom: "4px",
			paddingTop: "2px",
			paddingBottom: "2px",
			lineHeight: "13px",
			...simple && {
				background: "transparent",
				border: "0 none",
				paddingLeft: 0
			}
		}));
		ExpandButton = styled.summary(({ theme }) => ({
			fontFamily: theme.typography.fonts.mono,
			color: theme.color.secondary,
			cursor: "pointer",
			lineHeight: "normal",
			margin: "0 0 4px",
			padding: "1px 6px",
			background: "none",
			border: "none"
		}));
		Expandable = styled.button(codeCommon, ({ theme }) => ({
			fontFamily: theme.typography.fonts.mono,
			color: theme.color.secondary,
			fontSize: theme.typography.size.s1,
			margin: 0,
			whiteSpace: "nowrap",
			display: "flex",
			alignItems: "center",
			cursor: "pointer",
			"&:hover": { border: theme.base === "light" ? "1px solid hsl(0 0 0 / 0.15)" : "1px solid hsl(0 0 100 / 0.15)" },
			"&:focus-visible": {
				outline: `2px solid ${theme.color.secondary}`,
				outlineOffset: "2px"
			}
		}));
		Detail = styled.div(({ theme }) => ({
			minWidth: 200,
			maxWidth: 800,
			paddingRight: 16,
			fontFamily: theme.typography.fonts.mono,
			fontSize: theme.typography.size.s1,
			boxSizing: "content-box",
			"& code": { padding: "0 !important" }
		}));
		ChevronUpIcon = styled(ChevronSmallUpIcon)({ marginLeft: 4 });
		ChevronDownIcon = styled(ChevronSmallDownIcon)({ marginLeft: 4 });
		EmptyArg = () => import_react$20.createElement("span", null, "-");
		ArgText = ({ text, simple }) => import_react$20.createElement(Text3, { simple }, text);
		getSummaryItems = (summary) => {
			if (!summary) return [summary];
			return uniq(summary.split("|").map((value) => value.trim()));
		};
		renderSummaryItems = (summaryItems) => summaryItems.slice(0, ITEMS_BEFORE_EXPANSION).map((item) => import_react$20.createElement(ArgText, {
			key: item,
			text: item === "" ? "\"\"" : item
		}));
		renderExpandedItems = (summaryItems) => summaryItems.slice(ITEMS_BEFORE_EXPANSION).map((item) => import_react$20.createElement(ArgText, {
			key: item,
			text: item === "" ? "\"\"" : item
		}));
		ArgSummary = ({ value, initialExpandedArgs }) => {
			let { summary, detail } = value, [isOpen, setIsOpen] = (0, import_react$20.useState)(!1), [isExpanded, setIsExpanded] = (0, import_react$20.useState)(initialExpandedArgs || !1);
			if (summary == null) return null;
			let summaryAsString = typeof summary.toString == "function" ? summary.toString() : summary;
			if (detail == null) {
				if (/[(){}[\]<>]/.test(summaryAsString)) return import_react$20.createElement(ArgText, { text: summaryAsString });
				let summaryItems = getSummaryItems(summaryAsString), itemsCount = summaryItems.length;
				return itemsCount > ITEMS_BEFORE_EXPANSION ? import_react$20.createElement(Summary, { isExpanded }, renderSummaryItems(summaryItems), import_react$20.createElement(DetailsContainer, {
					open: isExpanded,
					onToggle: (e2) => setIsExpanded(e2.currentTarget.open)
				}, import_react$20.createElement(AlignedDetails, null, renderExpandedItems(summaryItems)), import_react$20.createElement(ExpandButton, { role: "button" }, isExpanded ? "Show less..." : `Show ${itemsCount - ITEMS_BEFORE_EXPANSION} more...`))) : import_react$20.createElement(Summary, null, renderSummaryItems(summaryItems));
			}
			return import_react$20.createElement(PopoverProvider, {
				ariaLabel: "Arg value details",
				placement: "bottom",
				visible: isOpen,
				onVisibleChange: (isVisible) => {
					setIsOpen(isVisible);
				},
				hasCloseButton: !0,
				popover: import_react$20.createElement(Detail, null, import_react$20.createElement(SyntaxHighlighter, {
					language: "jsx",
					format: !1
				}, detail))
			}, import_react$20.createElement(Expandable, { className: "sbdocs-expandable" }, import_react$20.createElement("span", null, summaryAsString), isOpen ? import_react$20.createElement(ChevronUpIcon, null) : import_react$20.createElement(ChevronDownIcon, null)));
		};
		ArgValue = ({ value, initialExpandedArgs }) => value == null ? import_react$20.createElement(EmptyArg, null) : import_react$20.createElement(ArgSummary, {
			value,
			initialExpandedArgs
		});
		Name = styled.span({ fontWeight: "bold" });
		Required = styled.span(({ theme }) => ({
			color: theme.color.negative,
			fontFamily: theme.typography.fonts.mono,
			cursor: "help"
		}));
		Description = styled.div(({ theme }) => ({
			"&&": {
				p: { margin: "0 0 10px 0" },
				a: { color: theme.color.secondary }
			},
			code: {
				...codeCommon({ theme }),
				fontSize: 12,
				fontFamily: theme.typography.fonts.mono
			},
			"& code": {
				margin: 0,
				display: "inline-block"
			},
			"& pre > code": { whiteSpace: "pre-wrap" }
		}));
		Type = styled.div(({ theme, hasDescription }) => ({
			color: theme.base === "light" ? curriedTransparentize$1(.1, theme.color.defaultText) : curriedTransparentize$1(.2, theme.color.defaultText),
			marginTop: hasDescription ? 4 : 0
		}));
		TypeWithJsDoc = styled.div(({ theme, hasDescription }) => ({
			color: theme.base === "light" ? curriedTransparentize$1(.1, theme.color.defaultText) : curriedTransparentize$1(.2, theme.color.defaultText),
			marginTop: hasDescription ? 12 : 0,
			marginBottom: 12
		}));
		StyledTd = styled.td(({ expandable }) => ({ paddingLeft: expandable ? "40px !important" : "20px !important" }));
		StyledTr = styled.tr({
			"span.sbdocs-argcontrol-setup": { ...srOnlyStyles },
			"&:hover, &:focus-within": {
				"span.sbdocs-argcontrol-setup": { ...srOnlyUnsetStyles },
				"span.sbdocs-argcontrol-placeholder": { ...srOnlyStyles }
			}
		});
		toSummary = (value) => value && { summary: typeof value == "string" ? value : value.name };
		ArgRow = (props) => {
			let { row, updateArgs, compact: compact2, expandable, initialExpandedArgs, docsLang } = props, { name, description } = row, table = row.table || {}, type = table.type || toSummary(row.type), defaultValue = table.defaultValue || row.defaultValue, required = row.type?.required, hasDescription = description != null && description !== "";
			return import_react$1.createElement(StyledTr, null, import_react$1.createElement(StyledTd, { expandable: expandable ?? !1 }, import_react$1.createElement(Name, null, name), required ? import_react$1.createElement(Required, {
				"aria-hidden": !0,
				title: "Required"
			}, "*") : null), compact2 ? null : import_react$1.createElement("td", null, hasDescription && import_react$1.createElement(Description, { lang: docsLang }, import_react$1.createElement(index_modern_default, null, description)), table.jsDocTags != null ? import_react$1.createElement(import_react$1.Fragment, null, import_react$1.createElement(TypeWithJsDoc, { hasDescription }, import_react$1.createElement(ArgValue, {
				value: type,
				initialExpandedArgs
			})), import_react$1.createElement(ArgJsDoc, { tags: table.jsDocTags })) : import_react$1.createElement(Type, { hasDescription }, import_react$1.createElement(ArgValue, {
				value: type,
				initialExpandedArgs
			}))), compact2 ? null : import_react$1.createElement("td", null, import_react$1.createElement(ArgValue, {
				value: defaultValue,
				initialExpandedArgs
			})), updateArgs ? import_react$1.createElement("td", null, import_react$1.createElement(ArgControl, {
				...props,
				isRequired: !!required
			})) : null);
		};
		Wrapper6 = styled.div(({ inAddonPanel, theme }) => ({
			height: inAddonPanel ? "100%" : "auto",
			display: "flex",
			border: inAddonPanel ? "none" : `1px solid ${theme.appBorderColor}`,
			borderRadius: inAddonPanel ? 0 : theme.appBorderRadius,
			padding: inAddonPanel ? 0 : 40,
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			gap: 15,
			background: theme.background.content
		}));
		Links = styled.div(({ theme }) => ({
			display: "flex",
			fontSize: theme.typography.size.s2 - 1,
			gap: 25
		}));
		Empty = ({ inAddonPanel }) => {
			let [isLoading, setIsLoading] = (0, import_react$21.useState)(!0);
			return (0, import_react$21.useEffect)(() => {
				let load = setTimeout(() => {
					setIsLoading(!1);
				}, 100);
				return () => clearTimeout(load);
			}, []), isLoading ? null : import_react$21.createElement(Wrapper6, { inAddonPanel }, import_react$21.createElement(EmptyTabContent, {
				title: "This story has no controls",
				description: import_react$21.createElement(import_react$21.Fragment, null, "Storybook couldn't find or generate any controls for this story. Define", " ", import_react$21.createElement("code", null, "args"), " or ", import_react$21.createElement("code", null, "argTypes"), ", or configure docgen to let Storybook generate controls automatically."),
				footer: import_react$21.createElement(Links, null, import_react$21.createElement(Link2, {
					href: "https://storybook.js.org/docs/essentials/controls?ref=ui",
					target: "_blank",
					withArrow: !0
				}, import_react$21.createElement(DocumentIcon, null), " Read docs"))
			}));
		};
		ExpanderIconDown = styled(ChevronDownIcon$1)(({ theme }) => ({
			marginRight: 8,
			marginLeft: -10,
			marginTop: -2,
			height: 12,
			width: 12,
			color: theme.base === "light" ? curriedTransparentize$1(.25, theme.color.defaultText) : curriedTransparentize$1(.3, theme.color.defaultText),
			border: "none",
			display: "inline-block"
		}));
		ExpanderIconRight = styled(ChevronRightIcon)(({ theme }) => ({
			marginRight: 8,
			marginLeft: -10,
			marginTop: -2,
			height: 12,
			width: 12,
			color: theme.base === "light" ? curriedTransparentize$1(.25, theme.color.defaultText) : curriedTransparentize$1(.3, theme.color.defaultText),
			border: "none",
			display: "inline-block"
		}));
		FlexWrapper = styled.span(({ theme }) => ({
			display: "flex",
			lineHeight: "20px",
			alignItems: "center"
		}));
		Section = styled.td(({ theme }) => ({
			position: "relative",
			letterSpacing: "0.35em",
			textTransform: "uppercase",
			fontWeight: theme.typography.weight.bold,
			fontSize: theme.typography.size.s1 - 1,
			color: theme.base === "light" ? curriedTransparentize$1(.4, theme.color.defaultText) : curriedTransparentize$1(.6, theme.color.defaultText),
			background: `${theme.background.app} !important`,
			"& ~ td": { background: `${theme.background.app} !important` }
		}));
		Subsection = styled.td(({ theme }) => ({
			position: "relative",
			fontWeight: theme.typography.weight.bold,
			fontSize: theme.typography.size.s2 - 1,
			background: theme.background.app
		}));
		StyledTd2 = styled.td({ position: "relative" });
		StyledTr2 = styled.tr(({ theme }) => ({ "&:hover > td": {
			backgroundColor: `${curriedLighten$1(.005, theme.background.app)} !important`,
			boxShadow: `${theme.color.mediumlight} 0 - 1px 0 0 inset`,
			cursor: "row-resize"
		} }));
		ClickIntercept = styled.button({
			background: "none",
			border: "none",
			padding: "0",
			font: "inherit",
			position: "absolute",
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			height: "100%",
			width: "100%",
			color: "transparent",
			cursor: "row-resize !important"
		});
		SectionRow = ({ level = "section", label, children, initialExpanded = !0, colSpan = 3 }) => {
			let [expanded, setExpanded] = (0, import_react$22.useState)(initialExpanded), Level = level === "subsection" ? Subsection : Section, itemCount = children?.length || 0, caption = level === "subsection" ? `${itemCount} item${itemCount !== 1 ? "s" : ""}` : "", helperText = `${expanded ? "Hide" : "Show"} ${level === "subsection" ? itemCount : label} item${itemCount !== 1 ? "s" : ""}`;
			return import_react$22.createElement(import_react$22.Fragment, null, import_react$22.createElement(StyledTr2, { title: helperText }, import_react$22.createElement(Level, { colSpan: 1 }, import_react$22.createElement(ClickIntercept, {
				onClick: (e2) => setExpanded(!expanded),
				tabIndex: 0
			}, helperText), import_react$22.createElement(FlexWrapper, null, expanded ? import_react$22.createElement(ExpanderIconDown, null) : import_react$22.createElement(ExpanderIconRight, null), label)), import_react$22.createElement(StyledTd2, { colSpan: colSpan - 1 }, import_react$22.createElement(ClickIntercept, {
				onClick: (e2) => setExpanded(!expanded),
				tabIndex: -1,
				style: { outline: "none" }
			}, helperText), expanded ? null : caption)), expanded ? children : null);
		};
		TableWrapper = styled.div(({ theme }) => ({
			width: "100%",
			borderSpacing: 0,
			color: theme.color.defaultText
		}));
		Row = styled.div(({ theme }) => ({
			display: "flex",
			borderBottom: `1px solid ${theme.appBorderColor}`,
			"&:last-child": { borderBottom: 0 }
		}));
		Column = styled.div(({ position, theme }) => {
			let baseStyles = {
				display: "flex",
				flexDirection: "column",
				gap: 5,
				padding: "10px 15px",
				alignItems: "flex-start"
			};
			switch (position) {
				case "first": return {
					...baseStyles,
					width: "25%",
					paddingLeft: 20
				};
				case "second": return {
					...baseStyles,
					width: "35%"
				};
				case "third": return {
					...baseStyles,
					width: "15%"
				};
				case "last": return {
					...baseStyles,
					width: "25%",
					paddingRight: 20
				};
			}
		});
		SkeletonText = styled.div(({ theme, width, height }) => ({
			animation: `${theme.animation.glow} 1.5s ease-in-out infinite`,
			background: theme.appBorderColor,
			width: width || "100%",
			height: height || 16,
			borderRadius: 3
		}));
		Skeleton = () => import_react$23.createElement(TableWrapper, null, import_react$23.createElement(Row, null, import_react$23.createElement(Column, { position: "first" }, import_react$23.createElement(SkeletonText, { width: "60%" })), import_react$23.createElement(Column, { position: "second" }, import_react$23.createElement(SkeletonText, { width: "30%" })), import_react$23.createElement(Column, { position: "third" }, import_react$23.createElement(SkeletonText, { width: "60%" })), import_react$23.createElement(Column, { position: "last" }, import_react$23.createElement(SkeletonText, { width: "60%" }))), import_react$23.createElement(Row, null, import_react$23.createElement(Column, { position: "first" }, import_react$23.createElement(SkeletonText, { width: "60%" })), import_react$23.createElement(Column, { position: "second" }, import_react$23.createElement(SkeletonText, { width: "80%" }), import_react$23.createElement(SkeletonText, { width: "30%" })), import_react$23.createElement(Column, { position: "third" }, import_react$23.createElement(SkeletonText, { width: "60%" })), import_react$23.createElement(Column, { position: "last" }, import_react$23.createElement(SkeletonText, { width: "60%" }))), import_react$23.createElement(Row, null, import_react$23.createElement(Column, { position: "first" }, import_react$23.createElement(SkeletonText, { width: "60%" })), import_react$23.createElement(Column, { position: "second" }, import_react$23.createElement(SkeletonText, { width: "80%" }), import_react$23.createElement(SkeletonText, { width: "30%" })), import_react$23.createElement(Column, { position: "third" }, import_react$23.createElement(SkeletonText, { width: "60%" })), import_react$23.createElement(Column, { position: "last" }, import_react$23.createElement(SkeletonText, { width: "60%" }))), import_react$23.createElement(Row, null, import_react$23.createElement(Column, { position: "first" }, import_react$23.createElement(SkeletonText, { width: "60%" })), import_react$23.createElement(Column, { position: "second" }, import_react$23.createElement(SkeletonText, { width: "80%" }), import_react$23.createElement(SkeletonText, { width: "30%" })), import_react$23.createElement(Column, { position: "third" }, import_react$23.createElement(SkeletonText, { width: "60%" })), import_react$23.createElement(Column, { position: "last" }, import_react$23.createElement(SkeletonText, { width: "60%" }))));
		TableWrapper2 = styled.table(({ theme, compact: compact2, inAddonPanel, inTabPanel }) => ({ "&&": {
			borderSpacing: 0,
			color: theme.color.defaultText,
			"td, th": {
				padding: 0,
				border: "none",
				verticalAlign: "top",
				textOverflow: "ellipsis"
			},
			fontSize: theme.typography.size.s2 - 1,
			lineHeight: "19px",
			textAlign: "left",
			width: "100%",
			marginTop: inAddonPanel ? 0 : 25,
			marginBottom: inAddonPanel ? 0 : 40,
			"thead th:first-of-type, td:first-of-type": { width: "25%" },
			"th:first-of-type, td:first-of-type": { paddingLeft: 20 },
			"th:nth-of-type(2), td:nth-of-type(2)": { ...compact2 ? null : { width: "35%" } },
			"td:nth-of-type(3)": { ...compact2 ? null : { width: "15%" } },
			"th:last-of-type, td:last-of-type": {
				paddingRight: 20,
				...compact2 ? null : { width: "25%" }
			},
			th: {
				color: theme.textMutedColor,
				paddingTop: 10,
				paddingBottom: 10,
				paddingLeft: 15,
				paddingRight: 15
			},
			td: {
				paddingTop: "10px",
				paddingBottom: "10px",
				"&:not(:first-of-type)": {
					paddingLeft: 15,
					paddingRight: 15
				},
				"&:last-of-type": { paddingRight: 20 }
			},
			marginInline: inAddonPanel || inTabPanel ? 0 : 1,
			paddingInline: inTabPanel ? 3 : 0,
			tbody: {
				...inAddonPanel ? null : { filter: theme.base === "light" ? "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.10))" : "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.20))" },
				"> tr > *": {
					background: theme.background.content,
					borderTop: `1px solid ${theme.appBorderColor}`
				},
				...inAddonPanel ? null : {
					"> tr:first-of-type > *": { borderBlockStart: `1px solid ${theme.appBorderColor}` },
					"> tr:last-of-type > *": { borderBlockEnd: `1px solid ${theme.appBorderColor}` },
					"> tr > *:first-of-type": { borderInlineStart: `1px solid ${theme.appBorderColor}` },
					"> tr > *:last-of-type": { borderInlineEnd: `1px solid ${theme.appBorderColor}` },
					"> tr:first-of-type > td:first-of-type": { borderTopLeftRadius: theme.appBorderRadius },
					"> tr:first-of-type > td:last-of-type": { borderTopRightRadius: theme.appBorderRadius },
					"> tr:last-of-type > td:first-of-type": { borderBottomLeftRadius: theme.appBorderRadius },
					"> tr:last-of-type > td:last-of-type": { borderBottomRightRadius: theme.appBorderRadius }
				}
			},
			"@media (forced-colors: active)": { tbody: {
				filter: "none",
				"> tr > *": { borderColor: "CanvasText" }
			} }
		} }));
		TablePositionWrapper = styled.div({ position: "relative" });
		ButtonPositionWrapper = styled.div({
			position: "absolute",
			right: 22,
			top: 10
		});
		StyledButton = styled(Button)({ margin: "-4px -12px -4px 0" });
		sortFns = {
			alpha: (a2, b2) => (a2.name ?? "").localeCompare(b2.name ?? ""),
			requiredFirst: (a2, b2) => +!!b2.type?.required - +!!a2.type?.required || (a2.name ?? "").localeCompare(b2.name ?? ""),
			none: null
		};
		groupRows = (rows, sort) => {
			let sections = {
				ungrouped: [],
				ungroupedSubsections: {},
				sections: {}
			};
			if (!rows) return sections;
			Object.entries(rows).forEach(([key, row]) => {
				let { category, subcategory } = row?.table || {};
				if (category) {
					let section = sections.sections[category] || {
						ungrouped: [],
						subsections: {}
					};
					if (!subcategory) section.ungrouped.push({
						key,
						...row
					});
					else {
						let subsection = section.subsections[subcategory] || [];
						subsection.push({
							key,
							...row
						}), section.subsections[subcategory] = subsection;
					}
					sections.sections[category] = section;
				} else if (subcategory) {
					let subsection = sections.ungroupedSubsections[subcategory] || [];
					subsection.push({
						key,
						...row
					}), sections.ungroupedSubsections[subcategory] = subsection;
				} else sections.ungrouped.push({
					key,
					...row
				});
			});
			let sortFn = sortFns[sort], sortSubsection = (record) => sortFn ? Object.keys(record).reduce((acc, cur) => ({
				...acc,
				[cur]: record[cur].sort(sortFn)
			}), {}) : record;
			return {
				ungrouped: sortFn ? sections.ungrouped.sort(sortFn) : sections.ungrouped,
				ungroupedSubsections: sortSubsection(sections.ungroupedSubsections),
				sections: Object.keys(sections.sections).reduce((acc, cur) => ({
					...acc,
					[cur]: {
						ungrouped: sortFn ? sections.sections[cur].ungrouped.sort(sortFn) : sections.sections[cur].ungrouped,
						subsections: sortSubsection(sections.sections[cur].subsections)
					}
				}), {})
			};
		};
		safeIncludeConditionalArg = (row, args, globals) => {
			try {
				return includeConditionalArg(row, args, globals);
			} catch (err) {
				return once.warn(err.message), !1;
			}
		};
		ArgsTable = (props) => {
			let { updateArgs, resetArgs, compact: compact2, inAddonPanel, inTabPanel, initialExpandedArgs, sort = "none", isLoading, storyId, controlsId, docsLang } = props, { rows, args, globals } = "rows" in props ? props : {
				rows: void 0,
				args: void 0,
				globals: void 0
			}, isResettingRef = (0, import_react.useRef)(!1), [isResetting, setIsResetting] = (0, import_react.useState)(!1);
			(0, import_react.useEffect)(() => {
				isResettingRef.current = !1, setIsResetting(!1);
			}, [args]);
			let handleResetClick = (0, import_react.useCallback)(() => {
				!isResettingRef.current && resetArgs && (isResettingRef.current = !0, setIsResetting(!0), resetArgs());
			}, [resetArgs]);
			if ("error" in props) {
				let { error } = props;
				return import_react.createElement(EmptyBlock, null, error, "\xA0", import_react.createElement(Link2, {
					href: "http://storybook.js.org/docs/?ref=ui",
					target: "_blank",
					withArrow: !0
				}, import_react.createElement(DocumentIcon, null), " Read the docs"));
			}
			if (isLoading) return import_react.createElement(Skeleton, null);
			let groups = groupRows(pickBy(rows || {}, (row) => !row?.table?.disable && safeIncludeConditionalArg(row, args || {}, globals || {})), sort), hasNoUngrouped = groups.ungrouped.length === 0, hasNoSections = Object.entries(groups.sections).length === 0, hasNoUngroupedSubsections = Object.entries(groups.ungroupedSubsections).length === 0;
			if (hasNoUngrouped && hasNoSections && hasNoUngroupedSubsections) return import_react.createElement(Empty, { inAddonPanel });
			let colSpan = 1;
			updateArgs && (colSpan += 1), compact2 || (colSpan += 2);
			let expandable = Object.keys(groups.sections).length > 0, common = {
				updateArgs,
				compact: compact2,
				inAddonPanel,
				initialExpandedArgs,
				storyId,
				controlsId
			};
			return import_react.createElement(ResetWrapper, null, import_react.createElement(TablePositionWrapper, null, updateArgs && !isLoading && resetArgs && import_react.createElement(ButtonPositionWrapper, null, import_react.createElement(StyledButton, {
				variant: "ghost",
				padding: "small",
				onClick: handleResetClick,
				disabled: isResetting,
				ariaLabel: isResetting ? "Resetting controls..." : "Reset controls",
				lang: "en"
			}, import_react.createElement(UndoIcon, null))), import_react.createElement(TableWrapper2, {
				compact: compact2,
				inAddonPanel,
				inTabPanel,
				className: "docblock-argstable sb-unstyled",
				lang: "en"
			}, import_react.createElement("thead", { className: "docblock-argstable-head" }, import_react.createElement("tr", null, import_react.createElement("th", null, import_react.createElement("span", null, "Name")), compact2 ? null : import_react.createElement("th", null, import_react.createElement("span", null, "Description")), compact2 ? null : import_react.createElement("th", null, import_react.createElement("span", null, "Default")), updateArgs ? import_react.createElement("th", null, import_react.createElement("span", null, "Control")) : null)), import_react.createElement("tbody", { className: "docblock-argstable-body" }, groups.ungrouped.map((row) => import_react.createElement(ArgRow, {
				key: row.key,
				row,
				arg: args && args[row.key],
				docsLang,
				...common
			})), Object.entries(groups.ungroupedSubsections).map(([subcategory, subsection]) => import_react.createElement(SectionRow, {
				key: subcategory,
				label: subcategory,
				level: "subsection",
				colSpan
			}, subsection.map((row) => import_react.createElement(ArgRow, {
				key: row.key,
				row,
				arg: args && args[row.key],
				expandable,
				...common
			})))), Object.entries(groups.sections).map(([category, section]) => import_react.createElement(SectionRow, {
				key: category,
				label: category,
				level: "section",
				colSpan
			}, section.ungrouped.map((row) => import_react.createElement(ArgRow, {
				key: row.key,
				row,
				arg: args && args[row.key],
				...common
			})), Object.entries(section.subsections).map(([subcategory, subsection]) => import_react.createElement(SectionRow, {
				key: subcategory,
				label: subcategory,
				level: "subsection",
				colSpan
			}, subsection.map((row) => import_react.createElement(ArgRow, {
				key: row.key,
				row,
				arg: args && args[row.key],
				expandable,
				...common
			}))))))))));
		};
		toGlobalSelector = (element) => `& :where(${element}:not(.sb-anchor, .sb-unstyled, .sb-unstyled ${element}))`;
		breakpoint = 600;
		Title = styled.h1(({ theme }) => ({
			...withReset({ theme }),
			color: theme.color.defaultText,
			fontSize: theme.typography.size.m3,
			fontWeight: theme.typography.weight.bold,
			lineHeight: "32px",
			[`@media (min-width: ${breakpoint}px)`]: {
				fontSize: theme.typography.size.l1,
				lineHeight: "36px",
				marginBottom: "16px"
			}
		}));
		Subtitle = styled.h2(({ theme }) => ({
			...withReset({ theme }),
			fontWeight: theme.typography.weight.regular,
			fontSize: theme.typography.size.s3,
			lineHeight: "20px",
			borderBottom: "none",
			marginBottom: 15,
			[`@media (min-width: ${breakpoint}px)`]: {
				fontSize: theme.typography.size.m1,
				lineHeight: "28px",
				marginBottom: 24
			},
			color: curriedTransparentize$1(.25, theme.color.defaultText)
		}));
		DocsContent = styled.div(({ theme }) => {
			let reset = {
				fontFamily: theme.typography.fonts.base,
				fontSize: theme.typography.size.s3,
				margin: 0,
				WebkitFontSmoothing: "antialiased",
				MozOsxFontSmoothing: "grayscale",
				WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
				WebkitOverflowScrolling: "touch"
			}, headers = {
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
				"& code": { fontSize: "inherit" }
			}, code = {
				lineHeight: 1,
				margin: "0 2px",
				padding: "3px 5px",
				whiteSpace: "nowrap",
				borderRadius: 3,
				fontSize: theme.typography.size.s2 - 1,
				border: theme.base === "light" ? `1px solid ${theme.color.mediumlight}` : `1px solid ${theme.color.darker}`,
				color: theme.base === "light" ? curriedTransparentize$1(.1, theme.color.defaultText) : curriedTransparentize$1(.3, theme.color.defaultText),
				backgroundColor: theme.base === "light" ? theme.color.lighter : theme.color.border
			};
			return {
				maxWidth: 1e3,
				width: "100%",
				minWidth: 0,
				flex: 1,
				[toGlobalSelector("a")]: {
					...reset,
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
					"&.anchor:hover, &.anchor:focus": { textDecoration: "underline" }
				},
				[toGlobalSelector("blockquote")]: {
					...reset,
					margin: "16px 0",
					borderLeft: `4px solid ${theme.color.medium}`,
					padding: "0 15px",
					color: theme.color.dark,
					"& > :first-of-type": { marginTop: 0 },
					"& > :last-child": { marginBottom: 0 }
				},
				[toGlobalSelector("div")]: reset,
				[toGlobalSelector("dl")]: {
					...reset,
					margin: "16px 0",
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
				},
				[toGlobalSelector("h1")]: {
					...reset,
					...headers,
					fontSize: `${theme.typography.size.l1}px`,
					fontWeight: theme.typography.weight.bold
				},
				[toGlobalSelector("h2")]: {
					...reset,
					...headers,
					fontSize: `${theme.typography.size.m2}px`,
					paddingBottom: 4,
					borderBottom: `1px solid ${theme.appBorderColor}`
				},
				[toGlobalSelector("h3")]: {
					...reset,
					...headers,
					fontSize: `${theme.typography.size.m1}px`,
					fontWeight: theme.typography.weight.bold
				},
				[toGlobalSelector("h4")]: {
					...reset,
					...headers,
					fontSize: `${theme.typography.size.s3}px`
				},
				[toGlobalSelector("h5")]: {
					...reset,
					...headers,
					fontSize: `${theme.typography.size.s2}px`
				},
				[toGlobalSelector("h6")]: {
					...reset,
					...headers,
					fontSize: `${theme.typography.size.s2}px`,
					color: theme.color.dark
				},
				[toGlobalSelector("hr")]: {
					border: "0 none",
					borderTop: `1px solid ${theme.appBorderColor}`,
					height: 4,
					padding: 0
				},
				[toGlobalSelector("img")]: { maxWidth: "100%" },
				[toGlobalSelector("li")]: {
					...reset,
					fontSize: theme.typography.size.s2,
					color: theme.color.defaultText,
					lineHeight: "24px",
					"& + li": { marginTop: ".25em" },
					"& ul, & ol": {
						marginTop: ".25em",
						marginBottom: 0
					},
					"& code": code
				},
				[toGlobalSelector("ol")]: {
					...reset,
					margin: "16px 0",
					paddingLeft: 30,
					"& :first-of-type": { marginTop: 0 },
					"& :last-child": { marginBottom: 0 }
				},
				[toGlobalSelector("p")]: {
					...reset,
					margin: "16px 0",
					fontSize: theme.typography.size.s2,
					lineHeight: "24px",
					color: theme.color.defaultText,
					"& code": code
				},
				[toGlobalSelector("pre")]: {
					...reset,
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
				},
				[toGlobalSelector("span")]: {
					...reset,
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
				},
				[toGlobalSelector("table")]: {
					...reset,
					margin: "16px 0",
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
				},
				[toGlobalSelector("ul")]: {
					...reset,
					margin: "16px 0",
					paddingLeft: 30,
					"& :first-of-type": { marginTop: 0 },
					"& :last-child": { marginBottom: 0 },
					listStyle: "disc"
				}
			};
		});
		DocsWrapper = styled.div(({ theme }) => ({
			background: theme.background.content,
			display: "flex",
			flexDirection: "row-reverse",
			justifyContent: "center",
			padding: "4rem 40px",
			minHeight: "100vh",
			boxSizing: "border-box",
			gap: "3rem",
			[`@media (min-width: ${breakpoint}px)`]: {}
		}));
		DocsPageWrapper = ({ children, toc, lang = "en" }) => import_react$24.createElement(DocsWrapper, { className: "sbdocs sbdocs-wrapper" }, toc, import_react$24.createElement(DocsContent, {
			className: "sbdocs sbdocs-content",
			lang
		}, children));
		({logger: logger4} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c = typeof document < "u" ? import_react$26.useLayoutEffect : () => {};
		$b5e257d569688ac6$var$defaultContext = {
			prefix: String(Math.round(Math.random() * 1e10)),
			current: 0
		};
		$b5e257d569688ac6$var$SSRContext = import_react$29.createContext($b5e257d569688ac6$var$defaultContext);
		$b5e257d569688ac6$var$IsSSRContext = import_react$29.createContext(!1);
		typeof window < "u" && window.document && window.document.createElement;
		$b5e257d569688ac6$var$componentIds = /* @__PURE__ */ new WeakMap();
		$b5e257d569688ac6$export$619500959fc48b26 = typeof import_react$29.useId == "function" ? $b5e257d569688ac6$var$useModernSSRSafeId : $b5e257d569688ac6$var$useLegacySSRSafeId;
		$bdb11010cef70236$var$canUseDOM = !!(typeof window < "u" && window.document && window.document.createElement);
		$bdb11010cef70236$export$d41a04c74483c6ef = /* @__PURE__ */ new Map();
		typeof FinalizationRegistry < "u" && ($bdb11010cef70236$var$registry = new FinalizationRegistry((heldValue) => {
			$bdb11010cef70236$export$d41a04c74483c6ef.delete(heldValue);
		}));
		$7215afc6de606d6b$var$supportsPreventScrollCached = null;
		$c87311424ea30a05$export$9ac100e40613ea10 = $c87311424ea30a05$var$cached(function() {
			return $c87311424ea30a05$var$testPlatform(/^Mac/i);
		});
		$c87311424ea30a05$export$7bef049ce92e4224 = $c87311424ea30a05$var$cached(function() {
			return $c87311424ea30a05$var$testPlatform(/^iPad/i) || $c87311424ea30a05$export$9ac100e40613ea10() && navigator.maxTouchPoints > 1;
		});
		$c87311424ea30a05$export$78551043582a6a98 = $c87311424ea30a05$var$cached(function() {
			return $c87311424ea30a05$var$testUserAgent(/AppleWebKit/i) && !$c87311424ea30a05$export$6446a186d09e379e();
		});
		$c87311424ea30a05$export$6446a186d09e379e = $c87311424ea30a05$var$cached(function() {
			return $c87311424ea30a05$var$testUserAgent(/Chrome/i);
		});
		$c87311424ea30a05$export$b7d78993b74f766d = $c87311424ea30a05$var$cached(function() {
			return $c87311424ea30a05$var$testUserAgent(/Firefox/i);
		});
		(0, import_react$30.createContext)({
			isNative: !0,
			open: $ea8dcbcb9ea1b556$var$openSyntheticLink,
			useHref: (href) => href
		});
		$ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = !1;
		$bbed8b41f857bcc0$var$transitionsByElement = /* @__PURE__ */ new Map();
		$bbed8b41f857bcc0$var$transitionCallbacks = /* @__PURE__ */ new Set();
		typeof document < "u" && (document.readyState !== "loading" ? $bbed8b41f857bcc0$var$setupGlobalEvents() : document.addEventListener("DOMContentLoaded", $bbed8b41f857bcc0$var$setupGlobalEvents));
		import_react$34.useInsertionEffect;
		typeof document < "u" && window.visualViewport;
		typeof Element < "u" && "checkVisibility" in Element.prototype;
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
		$b4b717babfbb907b$var$focusableElements.join(":not([hidden]),") + "";
		$b4b717babfbb907b$var$focusableElements.push("[tabindex]:not([tabindex=\"-1\"]):not([disabled])");
		$b4b717babfbb907b$var$focusableElements.join(":not([hidden]):not([tabindex=\"-1\"]),");
		typeof document < "u" && (($458b0a5536c1a7cf$var$_React_useInsertionEffect = import_react$47.useInsertionEffect) !== null && $458b0a5536c1a7cf$var$_React_useInsertionEffect !== void 0 || import_react$47.useLayoutEffect);
		globalThis && globalThis.__DOCS_CONTEXT__ === void 0 && (globalThis.__DOCS_CONTEXT__ = (0, import_react$48.createContext)(null), globalThis.__DOCS_CONTEXT__.displayName = "DocsContext");
		DocsContext = globalThis ? globalThis.__DOCS_CONTEXT__ : (0, import_react$48.createContext)(null);
		({InvalidBlockOfPropError} = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__);
		MDX_WRAPPED_BLOCK = /* @__PURE__ */ Symbol("mdxWrappedBlock");
		MdxWrappedBlockContext = import_react$51.createContext(null);
		withMdxComponentOverride = (blockName, Block) => {
			let WrappedBlock = (props) => {
				let wrappedBlocks = import_react$51.useContext(MdxWrappedBlockContext), Override = useMDXComponents()[blockName];
				if (wrappedBlocks?.has(blockName) || Override === WrappedBlock) return import_react$51.createElement(Block, { ...props });
				if (Override) {
					let nextWrappedBlocks = new Set(wrappedBlocks ?? []);
					return nextWrappedBlocks.add(blockName), import_react$51.createElement(MdxWrappedBlockContext.Provider, { value: nextWrappedBlocks }, import_react$51.createElement(Override, { ...props }));
				}
				return import_react$51.createElement(Block, { ...props });
			};
			return WrappedBlock.displayName = blockName, WrappedBlock[MDX_WRAPPED_BLOCK] = !0, WrappedBlock;
		};
		getStoryId = (props, context) => {
			let { of, meta } = props;
			if ("of" in props && of === void 0) throw new InvalidBlockOfPropError();
			return meta && context.referenceMeta(meta, !1), context.resolveOf(of || "story", ["story"]).story.id;
		};
		getStoryProps = (props, story, context) => {
			let { parameters = {} } = story || {}, { docs = {} } = parameters, storyParameters = docs.story || {};
			if (docs.disable) return null;
			if (props.inline ?? storyParameters.inline ?? !1) return {
				story,
				inline: !0,
				height: props.height ?? storyParameters.height,
				autoplay: props.autoplay ?? storyParameters.autoplay ?? !1,
				forceInitialArgs: !!props.__forceInitialArgs,
				primary: !!props.__primary,
				renderStoryToElement: context.renderStoryToElement
			};
			return {
				story,
				inline: !1,
				height: props.height ?? storyParameters.height ?? storyParameters.iframeHeight ?? "100px",
				primary: !!props.__primary
			};
		};
		StoryImpl = (props = {
			__forceInitialArgs: !1,
			__primary: !1
		}) => {
			let context = (0, import_react$49.useContext)(DocsContext), story = useStory(getStoryId(props, context), context);
			if (!story) return import_react$49.createElement(StorySkeleton, null);
			let storyProps = getStoryProps(props, story, context);
			return storyProps ? import_react$49.createElement(Story, { ...storyProps }) : null;
		};
		Story2 = withMdxComponentOverride("Story", StoryImpl);
		getBlockBackgroundStyle = (theme) => ({
			borderRadius: theme.appBorderRadius,
			background: theme.background.content,
			boxShadow: theme.base === "light" ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0" : "rgba(0, 0, 0, 0.20) 0 2px 5px 0",
			border: `1px solid ${theme.appBorderColor}`
		});
		getStoryHref = (storyId, additionalParams = {}) => {
			let [url, paramsStr] = (globalThis.PREVIEW_URL || "iframe.html").split("?"), params = new URLSearchParams(paramsStr || "");
			return Object.entries(additionalParams).forEach(([key, value]) => {
				params.set(key, value);
			}), params.set("id", storyId), `${url}?${params.toString()}`;
		};
		({window: globalWindow2} = globalThis), IFrame = class extends import_react$53.Component {
			constructor() {
				super(...arguments);
				this.iframe = null;
			}
			componentDidMount() {
				let { id } = this.props;
				this.iframe = globalWindow2.document.getElementById(id);
			}
			shouldComponentUpdate(nextProps) {
				let { scale } = nextProps;
				return scale !== this.props.scale && this.setIframeBodyStyle({
					width: `${scale * 100}%`,
					height: `${scale * 100}%`,
					transform: `scale(${1 / scale})`,
					transformOrigin: "top left"
				}), !1;
			}
			setIframeBodyStyle(style) {
				return Object.assign(this.iframe.contentDocument.body.style, style);
			}
			render() {
				let { id, title, src, allowFullScreen, scale, ...rest } = this.props;
				return import_react$53.createElement("iframe", {
					id,
					title,
					src,
					...allowFullScreen ? { allow: "fullscreen" } : {},
					loading: "lazy",
					...rest
				});
			}
		};
		ZoomContext = (0, import_react$54.createContext)({ scale: 1 });
		storyBlockIdFromId = ({ story, primary }) => `story--${story.id}${primary ? "--primary" : ""}`;
		InlineStory = (props) => {
			let storyRef = (0, import_react$52.useRef)(), [showLoader, setShowLoader] = (0, import_react$52.useState)(!0), [error, setError] = (0, import_react$52.useState)(), { story, height, autoplay, forceInitialArgs, renderStoryToElement } = props;
			return (0, import_react$52.useEffect)(() => {
				if (!(story && storyRef.current)) return () => {};
				let element = storyRef.current, cleanup = renderStoryToElement(story, element, {
					showMain: () => {},
					showError: ({ title, description }) => setError(/* @__PURE__ */ new Error(`${title} - ${description}`)),
					showException: (err) => setError(err)
				}, {
					autoplay,
					forceInitialArgs
				});
				return setShowLoader(!1), () => {
					Promise.resolve().then(() => cleanup());
				};
			}, [
				autoplay,
				renderStoryToElement,
				story
			]), error ? import_react$52.createElement("pre", null, import_react$52.createElement(ErrorFormatter, { error })) : import_react$52.createElement(import_react$52.Fragment, null, height ? import_react$52.createElement("style", null, `#${storyBlockIdFromId(props)} { min-height: ${height}; transform: translateZ(0); overflow: auto }`) : null, showLoader && import_react$52.createElement(StorySkeleton, null), import_react$52.createElement("div", {
				ref: storyRef,
				id: `${storyBlockIdFromId(props)}-inner`,
				"data-name": story.name,
				lang: story.parameters?.htmlLang || "en"
			}));
		};
		IFrameStory = ({ story, height = "500px" }) => import_react$52.createElement("div", { style: {
			width: "100%",
			height
		} }, import_react$52.createElement(ZoomContext.Consumer, null, ({ scale }) => import_react$52.createElement(IFrame, {
			key: "iframe",
			id: `iframe--${story.id}`,
			title: story.name,
			src: getStoryHref(story.id, { viewMode: "story" }),
			allowFullScreen: !0,
			scale,
			style: {
				width: "100%",
				height: "100%",
				border: "0 none"
			}
		})));
		ErrorMessage = styled.strong(({ theme }) => ({ color: theme.color.orange }));
		Story = (props) => {
			let { inline, story } = props;
			return inline && !props.autoplay && story.usesMount ? import_react$52.createElement(ErrorMessage, null, "This story mounts inside of play. Set", " ", import_react$52.createElement("a", { href: "https://storybook.js.org/docs/api/doc-blocks/doc-block-story?ref=ui#autoplay" }, "autoplay"), " ", "to true to view this story.") : import_react$52.createElement("div", {
				id: storyBlockIdFromId(props),
				className: "sb-story sb-unstyled",
				"data-story-block": "true"
			}, inline ? import_react$52.createElement(InlineStory, { ...props }) : import_react$52.createElement(IFrameStory, { ...props }));
		};
		StorySkeleton = () => import_react$52.createElement(Loader, null);
		AbsoluteBar = styled(Toolbar$1)({
			position: "absolute",
			left: 0,
			right: 0,
			top: 0,
			transition: "transform .2s linear",
			display: "flex",
			alignItems: "center"
		});
		Wrapper7 = styled.div({
			display: "flex",
			alignItems: "center",
			gap: 4
		});
		IconPlaceholder = styled.div(({ theme }) => ({
			width: 14,
			height: 14,
			borderRadius: 2,
			margin: "0 7px",
			backgroundColor: theme.appBorderColor,
			animation: `${theme.animation.glow} 1.5s ease-in-out infinite`
		}));
		Toolbar = ({ isLoading, storyId, zoom, resetZoom, onReloadStory, ...rest }) => import_react$55.createElement(AbsoluteBar, {
			innerStyle: {
				gap: 4,
				paddingInline: 7,
				justifyContent: "space-between"
			},
			lang: "en",
			...rest
		}, import_react$55.createElement(Wrapper7, { key: "left" }, isLoading ? [
			1,
			2,
			3
		].map((key) => import_react$55.createElement(IconPlaceholder, { key })) : import_react$55.createElement(import_react$55.Fragment, null, onReloadStory && import_react$55.createElement(Button, {
			padding: "small",
			variant: "ghost",
			key: "reload",
			onClick: onReloadStory,
			ariaLabel: "Reload story"
		}, import_react$55.createElement(SyncIcon, null)), import_react$55.createElement(Button, {
			padding: "small",
			variant: "ghost",
			key: "zoomin",
			onClick: (e2) => {
				e2.preventDefault(), zoom(.8);
			},
			ariaLabel: "Zoom in"
		}, import_react$55.createElement(ZoomIcon, null)), import_react$55.createElement(Button, {
			padding: "small",
			variant: "ghost",
			key: "zoomout",
			onClick: (e2) => {
				e2.preventDefault(), zoom(1.25);
			},
			ariaLabel: "Zoom out"
		}, import_react$55.createElement(ZoomOutIcon, null)), import_react$55.createElement(Button, {
			padding: "small",
			variant: "ghost",
			key: "zoomreset",
			onClick: (e2) => {
				e2.preventDefault(), resetZoom();
			},
			ariaLabel: "Reset zoom"
		}, import_react$55.createElement(ZoomResetIcon, null)))), isLoading ? import_react$55.createElement(Wrapper7, { key: "right" }, import_react$55.createElement(IconPlaceholder, null)) : storyId && import_react$55.createElement(Wrapper7, { key: "right" }, import_react$55.createElement(Button, {
			asChild: !0,
			padding: "small",
			variant: "ghost",
			key: "opener",
			ariaLabel: "Open canvas in new tab"
		}, import_react$55.createElement("a", {
			href: getStoryHref(storyId),
			target: "_blank",
			rel: "noopener noreferrer"
		}, import_react$55.createElement(ShareAltIcon, null)))));
		ChildrenContainer = styled.div(({ isColumn, columns, layout }) => ({
			display: isColumn || !columns ? "block" : "flex",
			position: "relative",
			flexWrap: "wrap",
			overflow: "auto",
			flexDirection: isColumn ? "column" : "row",
			"& .innerZoomElementWrapper > *": isColumn ? {
				width: layout !== "fullscreen" ? "calc(100% - 20px)" : "100%",
				display: "block"
			} : {
				maxWidth: layout !== "fullscreen" ? "calc(100% - 20px)" : "100%",
				display: "inline-block"
			}
		}), ({ layout = "padded", inline }) => layout === "centered" || layout === "padded" ? {
			padding: inline ? "32px 22px" : "0px",
			"& .innerZoomElementWrapper > *": {
				width: "auto",
				border: "8px solid transparent!important"
			}
		} : {}, ({ layout = "padded", inline }) => layout === "centered" && inline ? {
			display: "flex",
			justifyContent: "center",
			justifyItems: "center",
			alignContent: "center",
			alignItems: "center"
		} : {}, ({ columns }) => columns && columns > 1 ? { ".innerZoomElementWrapper > *": { minWidth: `calc(100% / ${columns} - 20px)` } } : {});
		ActionBar = styled(Bar)({
			marginTop: -40,
			marginBottom: 40
		});
		StyledSource = styled(Source)(({ theme }) => ({
			margin: 0,
			borderTopLeftRadius: 0,
			borderTopRightRadius: 0,
			borderBottomLeftRadius: theme.appBorderRadius,
			borderBottomRightRadius: theme.appBorderRadius,
			border: "none",
			background: theme.base === "light" ? "rgba(0, 0, 0, 0.85)" : curriedDarken$1(.05, theme.background.content),
			color: theme.color.lightest,
			button: { background: theme.base === "light" ? "rgba(0, 0, 0, 0.85)" : curriedDarken$1(.05, theme.background.content) }
		}));
		PreviewContainer = styled.div(({ theme }) => ({
			position: "relative",
			overflow: "hidden",
			margin: "25px 0 40px",
			...getBlockBackgroundStyle(theme),
			"h3 + &": { marginTop: "16px" }
		}), ({ withToolbar }) => withToolbar && { paddingTop: 40 });
		PositionedToolbar = styled(Toolbar)({
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			height: 40
		});
		COPIED_LABEL_ANIMATION_DURATION = 2e3;
		Preview = ({ isLoading, isColumn, columns, children, withSource, withToolbar = !1, isExpanded = !1, additionalActions, className, layout = "padded", inline = !1, onReloadStory, ...props }) => {
			let [expanded, setExpanded] = (0, import_react$25.useState)(isExpanded), [copied, setCopied] = (0, import_react$25.useState)(null), [scale, setScale] = (0, import_react$25.useState)(1), additionalActionItems = (0, import_react$25.useMemo)(() => additionalActions ? [...additionalActions] : [], [additionalActions]), sourceId = $bdb11010cef70236$export$f680877a34711e37(), previewClasses = [className].concat([
				"sbdocs",
				"sbdocs-preview",
				"sb-unstyled"
			]), context = (0, import_react$25.useContext)(DocsContext), copyToClipboard = (0, import_react$25.useCallback)(async (text) => {
				let { createCopyToClipboardFunction } = await __vitePreload(async () => {
					const { createCopyToClipboardFunction } = await import("./components-BInfUg2s.js").then((n) => (n.x(), n.b));
					return { createCopyToClipboardFunction };
				}, __vite__mapDeps([3,1,4,2,5,6,7,8,9,10,11,12,13]), import.meta.url);
				await createCopyToClipboardFunction()(text);
			}, []), handleCopyCode = (0, import_react$25.useCallback)(async () => {
				try {
					await copyToClipboard(withSource?.code ?? ""), setCopied("Copied!");
				} catch (err) {
					logger4.error(err), setCopied("Copy error!");
				}
				globalThis.window.setTimeout(() => setCopied(null), COPIED_LABEL_ANIMATION_DURATION);
			}, [copyToClipboard, withSource?.code]), childProps = getChildProps(children), hasSourceError = !!(withSource && withSource.error), hasValidSource = !!(withSource && !withSource.error);
			return import_react$25.createElement(import_react$25.Fragment, null, import_react$25.createElement(PreviewContainer, {
				withSource,
				withToolbar,
				...props,
				className: previewClasses.join(" ")
			}, withToolbar && import_react$25.createElement(PositionedToolbar, {
				isLoading,
				border: !0,
				zoom: (z2) => setScale(scale * z2),
				resetZoom: () => setScale(1),
				storyId: !isLoading && childProps ? getStoryId(childProps, context) : void 0,
				onReloadStory
			}), import_react$25.createElement(ZoomContext.Provider, { value: { scale } }, import_react$25.createElement(ChildrenContainer, {
				isColumn: isColumn || !Array.isArray(children),
				columns,
				layout,
				inline,
				className: "docs-story"
			}, import_react$25.createElement(Zoom.Element, {
				centered: layout === "centered",
				scale: inline ? scale : 1
			}, Array.isArray(children) ? children.map((child, i2) => import_react$25.createElement("div", { key: i2 }, child)) : import_react$25.createElement("div", null, children)))), hasValidSource && expanded && import_react$25.createElement("div", { id: sourceId }, import_react$25.createElement(StyledSource, {
				...withSource,
				dark: !0,
				copyable: !1
			}))), (withSource || additionalActionItems.length > 0) && import_react$25.createElement(ActionBar, {
				className: "sbdocs sbdocs-preview-actions",
				innerStyle: { paddingInline: 0 }
			}, hasSourceError && import_react$25.createElement(Button, {
				lang: "en",
				ariaLabel: !1,
				disabled: !0,
				variant: "ghost",
				className: "docblock-code-toggle docblock-code-toggle--disabled"
			}, import_react$25.createElement(MarkupIcon, null), " No code available"), hasValidSource && import_react$25.createElement(import_react$25.Fragment, null, import_react$25.createElement(ToggleButton, {
				lang: "en",
				ariaLabel: !1,
				pressed: expanded,
				"aria-expanded": expanded,
				"aria-controls": sourceId,
				onClick: () => setExpanded(!expanded),
				variant: "ghost",
				className: `docblock-code-toggle${expanded ? " docblock-code-toggle--expanded" : ""}`
			}, import_react$25.createElement(MarkupIcon, null), " ", expanded ? "Hide code" : "Show code"), import_react$25.createElement(Button, {
				lang: "en",
				ariaLabel: !1,
				variant: "ghost",
				onClick: handleCopyCode
			}, import_react$25.createElement(CopyIcon, null), " ", copied ?? "Copy code")), additionalActionItems.map(({ title, ariaLabel, className: className2, onClick, disabled }, index) => import_react$25.createElement(Button, {
				key: index,
				ariaLabel: ariaLabel ?? !1,
				className: className2,
				onClick,
				disabled: !!disabled,
				variant: "ghost"
			}, title))));
		};
		styled(Preview)(() => ({ ".docs-story": {
			paddingTop: 32,
			paddingBottom: 40
		} }));
		StyledTabsView = styled(TabsView)({ height: "fit-content" });
		TabbedArgsTable = ({ tabs, ...props }) => {
			let entries = Object.entries(tabs);
			if (entries.length === 1) return import_react$56.createElement(ArgsTable, {
				...entries[0][1],
				...props
			});
			let tabsFromEntries = entries.map(([label, table], index) => {
				let argsTableProps = index === 0 ? props : {
					sort: props.sort,
					docsLang: props.docsLang
				};
				return {
					id: `prop_table_div_${label}`,
					title: label,
					children: import_react$56.createElement(ArgsTable, {
						inTabPanel: !0,
						...table,
						...argsTableProps
					})
				};
			});
			return import_react$56.createElement(StyledTabsView, { tabs: tabsFromEntries });
		};
		styled.div(({ theme }) => ({
			marginRight: 30,
			fontSize: `${theme.typography.size.s1}px`,
			color: theme.base === "light" ? curriedTransparentize$1(.4, theme.color.defaultText) : curriedTransparentize$1(.6, theme.color.defaultText)
		}));
		styled.div({
			overflow: "hidden",
			whiteSpace: "nowrap",
			textOverflow: "ellipsis"
		});
		styled.div({
			display: "flex",
			flexDirection: "row",
			alignItems: "baseline",
			"&:not(:last-child)": { marginBottom: "1rem" }
		});
		styled.div(withReset, ({ theme }) => ({
			...getBlockBackgroundStyle(theme),
			margin: "25px 0 40px",
			padding: "30px 20px"
		}));
		styled.div(({ theme }) => ({
			fontWeight: theme.typography.weight.bold,
			color: theme.color.defaultText
		}));
		styled.div(({ theme }) => ({ color: curriedTransparentize$1(.3, theme.color.defaultText) }));
		styled.div({
			flex: "0 0 30%",
			lineHeight: "20px",
			marginTop: 5
		});
		styled.div(({ theme }) => ({
			flex: 1,
			textAlign: "center",
			fontFamily: theme.typography.fonts.mono,
			fontSize: theme.typography.size.s1,
			lineHeight: 1,
			overflow: "hidden",
			color: curriedTransparentize$1(.3, theme.color.defaultText),
			"> div": {
				display: "inline-block",
				overflow: "hidden",
				maxWidth: "100%",
				textOverflow: "ellipsis"
			},
			span: {
				display: "block",
				marginTop: 2
			}
		}));
		styled.div({
			display: "flex",
			flexDirection: "row"
		});
		styled.div(({ background }) => ({
			position: "relative",
			flex: 1,
			"&::before": {
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				background,
				content: "\"\""
			}
		}));
		styled.div(({ theme }) => ({
			...getBlockBackgroundStyle(theme),
			display: "flex",
			flexDirection: "row",
			height: 50,
			marginBottom: 5,
			overflow: "hidden",
			backgroundColor: "white",
			backgroundImage: "repeating-linear-gradient(-45deg, #ccc, #ccc 1px, #fff 1px, #fff 16px)",
			backgroundClip: "padding-box"
		}));
		styled.div({
			display: "flex",
			flexDirection: "column",
			flex: 1,
			position: "relative",
			marginBottom: 30
		});
		styled.div({
			flex: 1,
			display: "flex",
			flexDirection: "row"
		});
		styled.div({
			display: "flex",
			alignItems: "flex-start"
		});
		styled.div({ flex: "0 0 30%" });
		styled.div({ flex: 1 });
		styled.div(({ theme }) => ({
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			paddingBottom: 20,
			fontWeight: theme.typography.weight.bold,
			color: curriedTransparentize$1(.3, theme.color.defaultText)
		}));
		styled.div(({ theme }) => ({
			fontSize: theme.typography.size.s2,
			lineHeight: "20px",
			display: "flex",
			flexDirection: "column"
		}));
		styled.div(({ theme }) => ({
			fontFamily: theme.typography.fonts.base,
			fontSize: theme.typography.size.s1,
			color: theme.color.defaultText,
			marginLeft: 10,
			lineHeight: 1.2,
			display: "-webkit-box",
			overflow: "hidden",
			wordBreak: "break-word",
			textOverflow: "ellipsis",
			WebkitLineClamp: 2,
			WebkitBoxOrient: "vertical"
		}));
		styled.div(({ theme }) => ({
			...getBlockBackgroundStyle(theme),
			overflow: "hidden",
			height: 40,
			width: 40,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flex: "none",
			"> img, > svg": {
				width: 20,
				height: 20
			}
		}));
		styled.div({
			display: "inline-flex",
			flexDirection: "row",
			alignItems: "center",
			width: "100%"
		});
		styled.div({
			display: "grid",
			gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
			gridGap: "8px 16px",
			gridAutoFlow: "row dense",
			gridAutoRows: 50
		});
		({NAVIGATE_URL} = __STORYBOOK_MODULE_CORE_EVENTS__);
		default_options_default = {
			tocSelector: ".js-toc",
			tocElement: null,
			contentSelector: ".js-toc-content",
			contentElement: null,
			headingSelector: "h1, h2, h3",
			ignoreSelector: ".js-toc-ignore",
			hasInnerContainers: !1,
			linkClass: "toc-link",
			extraLinkClasses: "",
			activeLinkClass: "is-active-link",
			listClass: "toc-list",
			extraListClasses: "",
			isCollapsedClass: "is-collapsed",
			collapsibleClass: "is-collapsible",
			listItemClass: "toc-list-item",
			activeListItemClass: "is-active-li",
			collapseDepth: 0,
			scrollSmooth: !0,
			scrollSmoothDuration: 420,
			scrollSmoothOffset: 0,
			scrollEndCallback: function(e2) {},
			headingsOffset: 1,
			enableUrlHashUpdateOnScroll: !1,
			scrollHandlerType: "auto",
			scrollHandlerTimeout: 50,
			throttleTimeout: 50,
			positionFixedSelector: null,
			positionFixedClass: "is-position-fixed",
			fixedSidebarOffset: "auto",
			includeHtml: !1,
			includeTitleTags: !1,
			onClick: function(e2) {},
			orderedList: !0,
			scrollContainer: null,
			skipRendering: !1,
			headingLabelCallback: !1,
			ignoreHiddenElements: !1,
			headingObjectCallback: null,
			basePath: "",
			disableTocScrollSync: !1,
			tocScrollingWrapper: null,
			tocScrollOffset: 30,
			bottomModeThreshold: 30
		};
		_options = {};
		hasOwnProp = Object.prototype.hasOwnProperty;
		tocbot_default = {
			destroy,
			init,
			refresh
		};
		Aside = styled.aside(() => ({
			width: "10rem",
			"@media (max-width: 768px)": { display: "none" }
		}));
		Nav = styled.nav(({ theme }) => ({
			position: "fixed",
			bottom: 0,
			top: 0,
			width: "10rem",
			paddingTop: "4rem",
			paddingBottom: "2rem",
			overflowY: "auto",
			fontFamily: theme.typography.fonts.base,
			fontSize: theme.typography.size.s2,
			WebkitFontSmoothing: "antialiased",
			MozOsxFontSmoothing: "grayscale",
			WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
			WebkitOverflowScrolling: "touch",
			"& *": { boxSizing: "border-box" },
			"& > .toc-wrapper > .toc-list": {
				paddingLeft: 0,
				borderLeft: `solid 2px ${theme.color.mediumlight}`,
				".toc-list": {
					paddingLeft: 0,
					borderLeft: `solid 2px ${theme.color.mediumlight}`,
					".toc-list": {
						paddingLeft: 0,
						borderLeft: `solid 2px ${theme.color.mediumlight}`
					}
				}
			},
			"& .toc-list-item": {
				position: "relative",
				listStyleType: "none",
				marginLeft: 20,
				paddingTop: 3,
				paddingBottom: 3
			},
			"& .toc-list-item::before": {
				content: "\"\"",
				position: "absolute",
				height: "100%",
				top: 0,
				left: 0,
				transform: "translateX(calc(-2px - 20px))",
				borderLeft: `solid 2px ${theme.color.mediumdark}`,
				opacity: 0,
				transition: "opacity 0.2s"
			},
			"& .toc-list-item.is-active-li::before": { opacity: 1 },
			"& .toc-list-item > a": {
				color: theme.color.defaultText,
				textDecoration: "none"
			},
			"& .toc-list-item.is-active-li > a": {
				fontWeight: 600,
				color: theme.color.secondary,
				textDecoration: "none"
			}
		}));
		Heading = styled.p(({ theme }) => ({
			fontWeight: 600,
			fontSize: "0.875em",
			color: theme.color.defaultText,
			textTransform: "uppercase",
			marginBottom: 10
		}));
		Title2 = ({ headingId, title }) => typeof title == "string" || !title ? import_react$60.createElement(Heading, {
			as: "h2",
			id: headingId,
			className: title ? "" : "sb-sr-only",
			lang: title ? void 0 : "en"
		}, title || "Table of contents") : import_react$60.createElement("div", { id: headingId }, title);
		TableOfContents = ({ title, disable, headingSelector, contentsSelector, ignoreSelector, unsafeTocbotOptions, channel, className }) => {
			(0, import_react$60.useEffect)(() => {
				if (disable) return () => {};
				let configuration = {
					tocSelector: ".toc-wrapper",
					contentSelector: contentsSelector ?? ".sbdocs-content",
					headingSelector: headingSelector ?? "h3",
					/** Ignore headings that did not come from the main markdown code. */
					ignoreSelector: ignoreSelector ?? ".docs-story *, .skip-toc",
					headingsOffset: 40,
					scrollSmoothOffset: -40,
					orderedList: !1,
					/** Prevent default linking behavior, leaving only the smooth scrolling. */
					onClick: (e2) => {
						if (e2.preventDefault(), e2.currentTarget instanceof HTMLAnchorElement) {
							let [, headerId] = e2.currentTarget.href.split("#");
							headerId && channel.emit(NAVIGATE_URL, `#${headerId}`);
						}
					},
					...unsafeTocbotOptions
				}, timeout = setTimeout(() => tocbot_default.init(configuration), 100);
				return () => {
					clearTimeout(timeout), tocbot_default.destroy();
				};
			}, [
				channel,
				disable,
				ignoreSelector,
				contentsSelector,
				headingSelector,
				unsafeTocbotOptions
			]);
			let headingId = "table-of-contents";
			return import_react$60.createElement(Aside, { className }, disable ? null : import_react$60.createElement(Nav, { "aria-labelledby": headingId }, import_react$60.createElement(Title2, {
				headingId,
				title
			}), import_react$60.createElement("div", { className: "toc-wrapper" })));
		};
		anchorBlockIdFromId = (storyId) => `anchor--${storyId}`;
		Anchor = ({ storyId, children }) => import_react$61.createElement("div", {
			id: anchorBlockIdFromId(storyId),
			className: "sb-anchor"
		}, children);
		({InvalidBlockOfPropError: InvalidBlockOfPropError2} = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__);
		({filterArgTypes} = __STORYBOOK_MODULE_PREVIEW_API__);
		({getService} = __STORYBOOK_MODULE_PREVIEW_API__);
		useOf = (moduleExportOrType, validTypes) => (0, import_react$65.useContext)(DocsContext).resolveOf(moduleExportOrType, validTypes);
		titleCase = (str) => str.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
		getComponentName = (component) => {
			if (component) return typeof component == "string" ? component.includes("-") ? titleCase(component) : component : component.__docgenInfo && component.__docgenInfo.displayName ? component.__docgenInfo.displayName : component.name;
		};
		LegacyArgTypes = (props) => {
			let { argTypes, parameters, component, subcomponents, filterProps } = useResolveArgTypes(props);
			return argTypes ? renderArgTypesTables({
				mainName: getComponentName(component),
				mainRows: argTypes,
				subcomponentRows: extractSubcomponentArgTypes(subcomponents, parameters),
				docsLang: parameters?.docs?.lang,
				...filterProps
			}) : null;
		};
		DocgenServiceArgTypes = (props) => {
			let { argTypes, parameters, componentId, storyId, initialArgs, filterProps, component } = useResolveArgTypes(props), { rows: serviceRows, isInitialLoading } = useDocgenServiceRows({
				componentId,
				storyId,
				parameters,
				initialArgs,
				customArgTypes: argTypes
			});
			return isInitialLoading ? import_react$62.createElement(ArgsTable, { isLoading: !0 }) : serviceRows ? renderArgTypesTables({
				mainName: getComponentName(component) ?? serviceRows.serviceComponentName,
				mainRows: serviceRows.mainRows,
				subcomponentRows: serviceRows.subcomponentRows,
				docsLang: parameters?.docs?.lang,
				...filterProps
			}) : null;
		};
		ArgTypesImpl = (props) => globalThis.FEATURES?.experimentalDocgenServer ? import_react$62.createElement(DocgenServiceArgTypes, { ...props }) : import_react$62.createElement(LegacyArgTypes, { ...props });
		withMdxComponentOverride("ArgTypes", ArgTypesImpl);
		({FORCE_REMOUNT} = __STORYBOOK_MODULE_CORE_EVENTS__);
		({InvalidBlockOfPropError: InvalidBlockOfPropError4} = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__);
		({InvalidBlockOfPropError: InvalidBlockOfPropError3} = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__);
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
		require_range = __commonJS({ "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/range.js"(exports, module) {
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
			module.exports = Number.isNaN || function(a2) {
				return a2 !== a2;
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
				for (var _2 in obj) return !1;
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
			var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ", toStr = Object.prototype.toString, max = Math.max, funcType = "[object Function]", concatty = function(a2, b2) {
				for (var arr = [], i2 = 0; i2 < a2.length; i2 += 1) arr[i2] = a2[i2];
				for (var j2 = 0; j2 < b2.length; j2 += 1) arr[j2 + a2.length] = b2[j2];
				return arr;
			}, slicy = function(arrLike, offset) {
				for (var arr = [], i2 = offset || 0, j2 = 0; i2 < arrLike.length; i2 += 1, j2 += 1) arr[j2] = arrLike[i2];
				return arr;
			}, joiny = function(arr, joiner) {
				for (var str = "", i2 = 0; i2 < arr.length; i2 += 1) str += arr[i2], i2 + 1 < arr.length && (str += joiner);
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
				}, boundLength = max(0, target.length - args.length), boundArgs = [], i2 = 0; i2 < boundLength; i2++) boundArgs[i2] = "$" + i2;
				if (bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder), target.prototype) {
					var Empty2 = function() {};
					Empty2.prototype = target.prototype, bound.prototype = new Empty2(), Empty2.prototype = null;
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
			} catch (e2) {
				if (!e2 || typeof e2 != "object" || !("code" in e2) || e2.code !== "ERR_PROTO_ACCESS") throw e2;
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
			module.exports = reflectGetProto ? function(O2) {
				return reflectGetProto(O2);
			} : originalGetProto ? function(O2) {
				if (!O2 || typeof O2 != "object" && typeof O2 != "function") throw new TypeError("getProto: not an object");
				return originalGetProto(O2);
			} : getDunderProto ? function(O2) {
				return getDunderProto(O2);
			} : null;
		} });
		require_hasown = __commonJS({ "node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js"(exports, module) {
			"use strict";
			var call = Function.prototype.call, $hasOwn = Object.prototype.hasOwnProperty;
			module.exports = require_function_bind().call(call, $hasOwn);
		} });
		require_get_intrinsic = __commonJS({ "node_modules/.pnpm/get-intrinsic@1.3.0/node_modules/get-intrinsic/index.js"(exports, module) {
			"use strict";
			var undefined2, $Object = require_es_object_atoms(), $Error = require_es_errors(), $EvalError = require_eval(), $RangeError = require_range(), $ReferenceError = require_ref(), $SyntaxError = require_syntax(), $TypeError = require_type(), $URIError = require_uri(), abs = require_abs(), floor = require_floor(), max = require_max(), min = require_min(), pow = require_pow(), round = require_round(), sign = require_sign(), $Function = Function, getEvalledConstructor = function(expressionSyntax) {
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
			} catch (e2) {
				errorProto = getProto(getProto(e2)), INTRINSICS["%Error.prototype%"] = errorProto;
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
				var first = $strSlice(string, 0, 1), last2 = $strSlice(string, -1);
				if (first === "%" && last2 !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
				if (last2 === "%" && first !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
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
				for (var i2 = 1, isOwn = !0; i2 < parts.length; i2 += 1) {
					var part = parts[i2], first = $strSlice(part, 0, 1), last2 = $strSlice(part, -1);
					if ((first === "\"" || first === "'" || first === "`" || last2 === "\"" || last2 === "'" || last2 === "`") && first !== last2) throw new $SyntaxError("property names with quotes must have matching quotes");
					if ((part === "constructor" || !isOwn) && (skipFurtherCaching = !0), intrinsicBaseName += "." + part, intrinsicRealName = "%" + intrinsicBaseName + "%", hasOwn(INTRINSICS, intrinsicRealName)) value = INTRINSICS[intrinsicRealName];
					else if (value != null) {
						if (!(part in value)) {
							if (!allowMissing) throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
							return;
						}
						if ($gOPD && i2 + 1 >= parts.length) {
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
				} catch (e2) {
					return e2 === isRegexMarker;
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
			module.exports = function(regex2) {
				if (!isRegex(regex2)) throw new $TypeError("`regex` must be a RegExp");
				return function(s2) {
					return $exec(regex2, s2) !== null;
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
		symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
		symbolProto && symbolProto.toString;
		isObject_default = isObject2;
		asyncTag = "[object AsyncFunction]";
		funcTag = "[object Function]";
		genTag = "[object GeneratorFunction]";
		proxyTag = "[object Proxy]";
		isFunction_default = isFunction;
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
		memoize.Cache = MapCache_default;
		memoize_default = memoize;
		MAX_MEMOIZE_SIZE = 500;
		memoizeCapped_default = memoizeCapped;
		rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
		reEscapeChar = /\\(\\)?/g;
		memoizeCapped_default(function(string) {
			var result = [];
			return string.charCodeAt(0) === 46 && result.push(""), string.replace(rePropName, function(match, number, quote, subString) {
				result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
			}), result;
		});
		isObject3 = isObject;
		dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
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
		SourceContext = (0, import_react$68.createContext)({ sources: {} });
		UNKNOWN_ARGS_HASH = "--unknown--";
		SourceContainer = ({ children, channel }) => {
			let [sources, setSources] = (0, import_react$68.useState)({});
			return (0, import_react$68.useEffect)(() => {
				let handleSnippetRendered = (idOrEvent, inputSource = null, inputFormat = !1) => {
					let { id, args = void 0, source, format: format2 } = typeof idOrEvent == "string" ? {
						id: idOrEvent,
						source: inputSource,
						format: inputFormat
					} : idOrEvent, hash = args ? argsHash(args) : UNKNOWN_ARGS_HASH;
					setSources((current) => ({
						...current,
						[id]: {
							...current[id],
							[hash]: {
								code: source || "",
								format: format2
							}
						}
					}));
				};
				return channel.on(SNIPPET_RENDERED, handleSnippetRendered), () => channel.off(SNIPPET_RENDERED, handleSnippetRendered);
			}, []), import_react$68.createElement(SourceContext.Provider, { value: { sources } }, children);
		};
		({getService: getService2} = __STORYBOOK_MODULE_PREVIEW_API__);
		EMPTY_SOURCE_CONTEXT = { sources: {} };
		getStorySource = (storyId, args, sourceContext) => {
			let { sources } = sourceContext, sourceMap = sources?.[storyId];
			return sourceMap?.[argsHash(args)] || sourceMap?.["--unknown--"] || { code: "" };
		};
		useCode = ({ snippet, serviceSnippet, storyContext, typeFromProps, transformFromProps }) => {
			let parameters = storyContext.parameters ?? {}, { __isArgsStory: isArgsStory } = parameters, sourceParameters = parameters.docs?.source || {}, type = typeFromProps || sourceParameters.type || SourceType.AUTO, staticSnippet = serviceSnippet || snippet, code = type === SourceType.DYNAMIC || type === SourceType.AUTO && staticSnippet && isArgsStory ? staticSnippet : sourceParameters.originalSource || "", transformer = transformFromProps ?? sourceParameters.transform, transformedCode = transformer ? useTransformCode(code, transformer, storyContext) : code;
			return sourceParameters.code !== void 0 ? sourceParameters.code : transformedCode;
		};
		useSourceProps = (props, docsContext, sourceContext, serviceSnippet = "") => {
			let { of } = props, story = (0, import_react$67.useMemo)(() => {
				if (of) return docsContext.resolveOf(of, ["story"]).story;
				try {
					return docsContext.storyById();
				} catch {}
			}, [docsContext, of]), storyContext = story ? docsContext.getStoryContext(story) : {}, argsForSource = props.__forceInitialArgs ? storyContext.initialArgs : storyContext.unmappedArgs, source = story ? getStorySource(story.id, argsForSource, sourceContext) : null, transformedCode = useCode({
				snippet: source ? source.code : "",
				serviceSnippet,
				storyContext: {
					...storyContext,
					args: argsForSource
				},
				typeFromProps: props.type,
				transformFromProps: props.transform
			});
			if ("of" in props && of === void 0) throw new InvalidBlockOfPropError3();
			let sourceParameters = story?.parameters?.docs?.source || {}, format2 = props.format, language = props.language ?? sourceParameters.language ?? "jsx", dark = props.dark ?? sourceParameters.dark ?? !1;
			return props.code === void 0 && !story ? { error: "Oh no! The source is not available." } : props.code !== void 0 ? {
				code: props.code,
				format: format2,
				language,
				dark
			} : (format2 = source?.format ?? !0, {
				code: transformedCode,
				format: format2,
				language,
				dark
			});
		};
		SourceWithStoryDocsSnippet = ({ storyId, docsContext, sourceContext, ...props }) => {
			let sourceProps = useSourceProps(props, docsContext, sourceContext, useServiceStorySnippet(storyId).data ?? "");
			return import_react$67.createElement(Source, { ...sourceProps });
		};
		SourceWithStorySnippet = (props) => {
			let { of } = props, sourceContext = (0, import_react$67.useContext)(SourceContext), docsContext = (0, import_react$67.useContext)(DocsContext), story = (0, import_react$67.useMemo)(() => {
				if (of) return docsContext.resolveOf(of, ["story"]).story;
				try {
					return docsContext.storyById();
				} catch {}
			}, [docsContext, of]);
			if (globalThis.FEATURES?.experimentalDocgenServer && story?.id) return import_react$67.createElement(SourceWithStoryDocsSnippet, {
				...props,
				docsContext,
				sourceContext,
				storyId: story.id
			});
			let sourceProps = useSourceProps(props, docsContext, sourceContext);
			return import_react$67.createElement(Source, { ...sourceProps });
		};
		SourceWithCode = (props) => {
			let sourceProps = useSourceProps(props, (0, import_react$67.useContext)(DocsContext), EMPTY_SOURCE_CONTEXT);
			return import_react$67.createElement(Source, { ...sourceProps });
		};
		SourceImpl = (props) => props.code !== void 0 ? import_react$67.createElement(SourceWithCode, { ...props }) : import_react$67.createElement(SourceWithStorySnippet, { ...props });
		withMdxComponentOverride("Source", SourceImpl);
		CanvasImpl = (props) => {
			let docsContext = (0, import_react$66.useContext)(DocsContext), sourceContext = (0, import_react$66.useContext)(SourceContext), { of, source } = props;
			if ("of" in props && of === void 0) throw new InvalidBlockOfPropError4();
			let { story } = useOf(of || "story", ["story"]), sourceProps = useSourceProps({
				...source,
				...of && { of }
			}, docsContext, sourceContext), layout = props.layout ?? story.parameters.layout ?? story.parameters.docs?.canvas?.layout ?? "padded", withToolbar = props.withToolbar ?? story.parameters.docs?.canvas?.withToolbar ?? !1, additionalActions = props.additionalActions ?? story.parameters.docs?.canvas?.additionalActions, sourceState = props.sourceState ?? story.parameters.docs?.canvas?.sourceState ?? "hidden", className = props.className ?? story.parameters.docs?.canvas?.className, inline = props.story?.inline ?? story.parameters?.docs?.story?.inline ?? !1, handleReloadStory = (0, import_react$66.useCallback)(() => {
				docsContext.channel.emit(FORCE_REMOUNT, { storyId: story.id });
			}, [docsContext.channel, story.id]);
			return import_react$66.createElement(Preview, {
				withSource: sourceState === "none" ? void 0 : sourceProps,
				isExpanded: sourceState === "shown",
				withToolbar,
				additionalActions,
				className,
				layout,
				inline,
				onReloadStory: inline ? handleReloadStory : void 0
			}, import_react$66.createElement(Story2, {
				of: of || story.moduleExport,
				meta: props.meta,
				...props.story
			}));
		};
		Canvas = withMdxComponentOverride("Canvas", CanvasImpl);
		({filterArgTypes: filterArgTypes2} = __STORYBOOK_MODULE_PREVIEW_API__);
		({RESET_STORY_ARGS, STORY_ARGS_UPDATED, UPDATE_STORY_ARGS} = __STORYBOOK_MODULE_CORE_EVENTS__);
		useArgs = (story, context) => {
			let result = useArgsIfDefined(story, context);
			if (!result) throw new Error("No result when story was defined");
			return result;
		};
		useArgsIfDefined = (story, context) => {
			let storyContext = story ? context.getStoryContext(story) : { args: {} }, { id: storyId } = story || { id: "none" }, [args, setArgs] = (0, import_react$72.useState)(storyContext.args);
			(0, import_react$72.useEffect)(() => {
				let onArgsUpdated = (changed) => {
					changed.storyId === storyId && setArgs(changed.args);
				};
				return context.channel.on(STORY_ARGS_UPDATED, onArgsUpdated), () => context.channel.off(STORY_ARGS_UPDATED, onArgsUpdated);
			}, [storyId, context.channel]);
			let updateArgs = (0, import_react$72.useCallback)((updatedArgs) => context.channel.emit(UPDATE_STORY_ARGS, {
				storyId,
				updatedArgs
			}), [storyId, context.channel]), resetArgs = (0, import_react$72.useCallback)((argNames) => context.channel.emit(RESET_STORY_ARGS, {
				storyId,
				argNames
			}), [storyId, context.channel]);
			return story && [
				args,
				updateArgs,
				resetArgs
			];
		};
		({GLOBALS_UPDATED} = __STORYBOOK_MODULE_CORE_EVENTS__);
		useGlobals = (story, context) => {
			let storyContext = context.getStoryContext(story), [globals, setGlobals] = (0, import_react$73.useState)(storyContext.globals);
			return (0, import_react$73.useEffect)(() => {
				let onGlobalsUpdated = (changed) => {
					setGlobals(changed.globals);
				};
				return context.channel.on(GLOBALS_UPDATED, onGlobalsUpdated), () => context.channel.off(GLOBALS_UPDATED, onGlobalsUpdated);
			}, [context.channel]), [globals];
		};
		({Tag} = __STORYBOOK_MODULE_PREVIEW_API__);
		usePrimaryStory = () => {
			let context = (0, import_react$74.useContext)(DocsContext), stories = context.componentStories();
			return context.filterByAutodocs === !1 ? stories[0] : stories.find((story) => story.tags.includes(Tag.AUTODOCS));
		};
		ControlsTables = ({ mainName = "Story", mainRows, subcomponentRows, include, exclude, sort, storyId, controlsId, args, globals, updateArgs, resetArgs, docsLang }) => {
			let filteredMainRows = filterArgTypes2(mainRows, include, exclude);
			if (Object.keys(subcomponentRows).length === 0) return Object.keys(filteredMainRows).length > 0 || Object.keys(args).length > 0 ? import_react$71.createElement(ArgsTable, {
				storyId,
				controlsId,
				rows: filteredMainRows,
				sort,
				args,
				globals,
				updateArgs,
				resetArgs,
				docsLang
			}) : null;
			let tabs = {
				[mainName]: {
					rows: filteredMainRows,
					sort
				},
				...Object.fromEntries(Object.entries(subcomponentRows).map(([key, rows]) => [key, {
					rows: filterArgTypes2(rows, include, exclude),
					sort
				}]))
			};
			return import_react$71.createElement(TabbedArgsTable, {
				tabs,
				sort,
				args,
				globals,
				updateArgs,
				resetArgs,
				storyId,
				controlsId,
				docsLang
			});
		};
		LegacyControls = ({ story, context, ...props }) => {
			let { parameters, argTypes, component, subcomponents } = story, filterProps = getControlsFilterProps(story, props), interactiveState = useControlsInteractiveState(story, context);
			return argTypes ? import_react$71.createElement(ControlsTables, {
				mainName: getComponentName(component) || "Story",
				mainRows: argTypes,
				subcomponentRows: extractSubcomponentArgTypes(subcomponents, parameters),
				...filterProps,
				storyId: story.id,
				...interactiveState,
				docsLang: parameters?.docs?.lang
			}) : null;
		};
		DocgenServiceControls = ({ story, context, ...props }) => {
			let { parameters, argTypes, component } = story, filterProps = getControlsFilterProps(story, props), interactiveState = useControlsInteractiveState(story, context), { rows: serviceRows, isInitialLoading } = useDocgenServiceRows({
				componentId: story.id.split("--")[0],
				storyId: story.id,
				parameters,
				initialArgs: story.initialArgs,
				customArgTypes: argTypes
			});
			return isInitialLoading ? import_react$71.createElement(ArgsTable, { isLoading: !0 }) : serviceRows ? import_react$71.createElement(ControlsTables, {
				mainName: getComponentName(component) ?? serviceRows.serviceComponentName,
				mainRows: serviceRows.mainRows,
				subcomponentRows: serviceRows.subcomponentRows,
				...filterProps,
				storyId: story.id,
				...interactiveState,
				docsLang: parameters?.docs?.lang
			}) : null;
		};
		ControlsImpl = (props) => {
			let { of } = props, context = (0, import_react$71.useContext)(DocsContext), primaryStory = usePrimaryStory(), story = of ? context.resolveOf(of, ["story"]).story : primaryStory;
			if (!story) return null;
			let storyProps = {
				...props,
				story,
				context
			};
			return globalThis.FEATURES?.experimentalDocgenServer ? import_react$71.createElement(DocgenServiceControls, { ...storyProps }) : import_react$71.createElement(LegacyControls, { ...storyProps });
		};
		Controls3 = withMdxComponentOverride("Controls", ControlsImpl);
		({InvalidBlockOfPropError: InvalidBlockOfPropError5} = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__);
		({NAVIGATE_URL: NAVIGATE_URL2} = __STORYBOOK_MODULE_CORE_EVENTS__);
		({document: document2} = globalThis), CodeOrSourceMdx = ({ className, children, ...rest }) => {
			if (typeof className != "string" && (typeof children != "string" || !children.match(/[\n\r]/g))) return import_react$77.createElement(Code, null, children);
			let language = className && className.split("-");
			return import_react$77.createElement(Source, {
				language: language && language[1] || "text",
				format: !1,
				code: children,
				...rest
			});
		};
		A2 = components2.a;
		AnchorInPage = ({ hash, children }) => {
			let context = (0, import_react$77.useContext)(DocsContext);
			return import_react$77.createElement(A2, {
				href: hash,
				target: "_self",
				onClick: (event) => {
					let id = hash.substring(1);
					document2.getElementById(id) && navigate(context, hash);
				}
			}, children);
		};
		AnchorMdx = (props) => {
			let { href, target, children, ...rest } = props, context = (0, import_react$77.useContext)(DocsContext);
			return !href || target === "_blank" || /^https?:\/\//.test(href) ? import_react$77.createElement(A2, { ...props }) : href.startsWith("#") ? import_react$77.createElement(AnchorInPage, { hash: href }, children) : import_react$77.createElement(A2, {
				href,
				onClick: (event) => {
					event.button === 0 && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey && (event.preventDefault(), navigate(context, event.currentTarget.getAttribute("href") || ""));
				},
				target,
				...rest
			}, children);
		};
		SUPPORTED_MDX_HEADERS = [
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6"
		];
		OcticonHeaders = SUPPORTED_MDX_HEADERS.reduce((acc, headerType) => ({
			...acc,
			[headerType]: styled(headerType)({})
		}), {});
		OcticonAlignmentWrapper = styled.span({
			display: "block",
			position: "relative",
			"& svg": { visibility: "hidden" },
			"&:hover svg, &:focus-within svg": { visibility: "visible" }
		});
		OcticonAnchorWrapper = styled.span({
			position: "absolute",
			top: "50%",
			right: "100%",
			lineHeight: "inherit",
			paddingRight: "8px",
			"&&": { marginTop: -14 },
			color: "inherit",
			"& a": {
				color: "inherit",
				textDecoration: "none"
			}
		});
		styled.span({});
		HeaderWithOcticonAnchor = ({ as, id, children, ...rest }) => {
			let context = (0, import_react$77.useContext)(DocsContext), OcticonHeader = OcticonHeaders[as], hash = `#${id}`;
			return import_react$77.createElement(OcticonHeader, {
				id,
				...rest
			}, import_react$77.createElement(OcticonAlignmentWrapper, { className: "sb-unstyled" }, import_react$77.createElement(OcticonAnchorWrapper, null, import_react$77.createElement(Button, {
				asChild: !0,
				variant: "ghost",
				size: "small",
				padding: "small",
				ariaLabel: "Copy heading URL to address bar"
			}, import_react$77.createElement("a", {
				href: hash,
				target: "_self",
				onClick: (event) => {
					event.preventDefault(), document2.getElementById(id) && navigate(context, hash);
				}
			}, import_react$77.createElement(LinkIcon, null)))), children));
		};
		HeaderMdx = (props) => {
			let { as, id, children, ...rest } = props;
			if (id) return import_react$77.createElement(HeaderWithOcticonAnchor, {
				as,
				id,
				...rest
			}, children);
			let Component4 = as, { as: omittedAs, ...withoutAs } = props;
			return import_react$77.createElement(Component4, { ...nameSpaceClassNames(withoutAs, as) });
		};
		HeadersMdx = SUPPORTED_MDX_HEADERS.reduce((acc, headerType) => ({
			...acc,
			[headerType]: (props) => import_react$77.createElement(HeaderMdx, {
				as: headerType,
				...props
			})
		}), {});
		MarkdownImpl = (props) => {
			if (!props.children) return null;
			if (typeof props.children != "string") throw new Error(dedent`The Markdown block only accepts children as a single string, but children were of type: '${typeof props.children}'
        This is often caused by not wrapping the child in a template string.
        
        This is invalid:
        <Markdown>
          # Some heading
          A paragraph
        </Markdown>

        Instead do:
        <Markdown>
        {\`
          # Some heading
          A paragraph
        \`}
        </Markdown>
      `);
			return import_react$76.createElement(index_modern_default, {
				...props,
				options: {
					forceBlock: !0,
					overrides: {
						code: CodeOrSourceMdx,
						a: AnchorMdx,
						...HeadersMdx,
						...props?.options?.overrides
					},
					...props?.options
				}
			});
		};
		Markdown = withMdxComponentOverride("Markdown", MarkdownImpl);
		getDescriptionFromResolvedOf = (resolvedOf, serviceComponentDescription, storyDocsDescription) => {
			switch (resolvedOf.type) {
				case "story": {
					let storyDescription = resolvedOf.story.parameters.docs?.description?.story;
					return storyDescription !== void 0 ? storyDescription : storyDocsDescription ?? null;
				}
				case "meta": {
					let { parameters, component } = resolvedOf.preparedMeta;
					return parameters.docs?.description?.component || parameters.docs?.extractComponentDescription?.(component, {
						component,
						parameters
					}) || serviceComponentDescription || null;
				}
				case "component": {
					let { component, projectAnnotations: { parameters } } = resolvedOf;
					return parameters?.docs?.extractComponentDescription?.(component, {
						component,
						parameters
					}) || serviceComponentDescription || null;
				}
				default: throw new Error(`Unrecognized module type resolved from 'useOf', got: ${resolvedOf.type}`);
			}
		};
		DescriptionBody = ({ resolvedOf, serviceComponentDescription, lang, storyDocsDescription }) => {
			let markdown = getDescriptionFromResolvedOf(resolvedOf, serviceComponentDescription, storyDocsDescription);
			return markdown ? import_react$75.createElement(Markdown, { lang }, markdown) : null;
		};
		DescriptionStoryWithServices = ({ resolvedOf }) => {
			let storyDocsDescription = useServiceStoryDoc(resolvedOf.story.id).data?.description, lang = resolvedOf.story.parameters.docs?.lang || "en";
			return import_react$75.createElement(DescriptionBody, {
				resolvedOf,
				storyDocsDescription,
				lang
			});
		};
		DescriptionComponentWithServices = ({ resolvedOf, componentId }) => {
			let serviceComponentDescription = useServiceDocgen(componentId).data?.description || void 0, lang = resolvedOf.type === "meta" ? resolvedOf.preparedMeta.parameters.docs?.lang || "en" : resolvedOf.projectAnnotations.parameters?.docs?.lang || "en";
			return import_react$75.createElement(DescriptionBody, {
				resolvedOf,
				serviceComponentDescription,
				lang
			});
		};
		DescriptionImpl = (props) => {
			let { of } = props, context = (0, import_react$75.useContext)(DocsContext);
			if ("of" in props && of === void 0) throw new InvalidBlockOfPropError5();
			let resolvedOf = useOf(of || "meta");
			if (globalThis.FEATURES?.experimentalDocgenServer) {
				if (resolvedOf.type === "story") return import_react$75.createElement(DescriptionStoryWithServices, { resolvedOf });
				let componentId = resolvedOf.type === "meta" ? resolvedOf.preparedMeta.componentId : context.getComponentId(resolvedOf.component);
				if (componentId) return import_react$75.createElement(DescriptionComponentWithServices, {
					resolvedOf,
					componentId
				});
			}
			let lang = (resolvedOf.type === "story" ? resolvedOf.story.parameters : resolvedOf.type === "meta" ? resolvedOf.preparedMeta.parameters : resolvedOf.projectAnnotations.parameters)?.docs?.lang || "en";
			return import_react$75.createElement(DescriptionBody, {
				resolvedOf,
				lang
			});
		};
		Description2 = withMdxComponentOverride("Description", DescriptionImpl);
		regex = /[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08C8-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1AC1-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\u9FFD-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7CB-\uA7F4\uA828-\uA82B\uA82D-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDE7F\uDEAA\uDEAD-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD48-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC62-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD44-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD824-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEDE-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g;
		own = Object.hasOwnProperty;
		BananaSlug = class {
			/**
			* Create a new slug class.
			*/
			constructor() {
				this.occurrences, this.reset();
			}
			/**
			* Generate a unique slug.
			*
			* Tracks previously generated slugs: repeated calls with the same value
			* will result in different slugs.
			* Use the `slug` function to get same slugs.
			*
			* @param  {string} value
			*   String of text to slugify
			* @param  {boolean} [maintainCase=false]
			*   Keep the current case, otherwise make all lowercase
			* @return {string}
			*   A unique slug string
			*/
			slug(value, maintainCase) {
				let self2 = this, result = slug(value, maintainCase === !0), originalSlug = result;
				for (; own.call(self2.occurrences, result);) self2.occurrences[originalSlug]++, result = originalSlug + "-" + self2.occurrences[originalSlug];
				return self2.occurrences[result] = 0, result;
			}
			/**
			* Reset - Forget all previous slugs
			*
			* @return void
			*/
			reset() {
				this.occurrences = /* @__PURE__ */ Object.create(null);
			}
		};
		createDocsSlugger = () => new BananaSlug();
		DocsSluggerContext = (0, import_react$80.createContext)(null);
		({document: document3, window: globalWindow3} = globalThis), DocsContainer = ({ context, theme, children }) => {
			let slugger = (0, import_react$79.useMemo)(() => createDocsSlugger(), []), toc, lang;
			try {
				let metaParameters = context.resolveOf("meta", ["meta"]).preparedMeta.parameters;
				toc = metaParameters?.docs?.toc, lang = metaParameters?.docs?.lang || "en";
			} catch {
				toc = context?.projectAnnotations?.parameters?.docs?.toc, lang = context?.projectAnnotations?.parameters?.docs?.lang || "en";
			}
			return (0, import_react$79.useEffect)(() => {
				let url;
				try {
					if (url = new URL(globalWindow3.parent.location.toString()), url.hash) {
						let element = document3.getElementById(decodeURIComponent(url.hash.substring(1)));
						element && setTimeout(() => {
							scrollToElement(element);
						}, 200);
					}
				} catch {}
			}), import_react$79.createElement(DocsSluggerContext.Provider, { value: slugger }, import_react$79.createElement(DocsContext.Provider, { value: context }, import_react$79.createElement(SourceContainer, { channel: context.channel }, import_react$79.createElement(ThemeProvider, { theme: ensure(theme) }, import_react$79.createElement(DocsPageWrapper, {
				lang,
				toc: toc ? import_react$79.createElement(TableOfContents, {
					className: "sbdocs sbdocs-toc--custom",
					channel: context.channel,
					...toc
				}) : null
			}, children)))));
		};
		slugs = new BananaSlug();
		HeadingImpl = ({ children, disableAnchor, ...props }) => {
			if (disableAnchor || typeof children != "string") return import_react$85.createElement(H2, null, children);
			let tagID = (import_react$85.useContext(DocsSluggerContext) ?? slugs).slug(children.toLowerCase());
			return import_react$85.createElement(HeaderMdx, {
				as: "h2",
				id: tagID,
				...props
			}, children);
		};
		Heading2 = withMdxComponentOverride("Heading", HeadingImpl);
		SubheadingImpl = ({ children, disableAnchor }) => {
			if (disableAnchor || typeof children != "string") return import_react$84.createElement(H3, null, children);
			let tagID = (import_react$84.useContext(DocsSluggerContext) ?? slugs).slug(children.toLowerCase());
			return import_react$84.createElement(HeaderMdx, {
				as: "h3",
				id: tagID
			}, children);
		};
		Subheading = withMdxComponentOverride("Subheading", SubheadingImpl);
		DocsStoryImpl = ({ of, expanded = !0, withToolbar: withToolbarProp = !1, __forceInitialArgs = !1, __primary = !1 }) => {
			let { story } = useOf(of || "story", ["story"]), withToolbar = story.parameters.docs?.canvas?.withToolbar ?? withToolbarProp;
			return import_react$83.createElement(Anchor, { storyId: __primary ? `primary--${story.id}` : story.id }, expanded && import_react$83.createElement(import_react$83.Fragment, null, import_react$83.createElement(Subheading, null, story.name), import_react$83.createElement(Description2, { of })), import_react$83.createElement(Canvas, {
				of,
				withToolbar,
				story: {
					__forceInitialArgs,
					__primary
				},
				source: { __forceInitialArgs }
			}));
		};
		DocsStory = withMdxComponentOverride("DocsStory", DocsStoryImpl);
		PrimaryImpl = () => {
			let primaryStory = usePrimaryStory();
			return primaryStory ? import_react$82.createElement(DocsStory, {
				of: primaryStory.moduleExport,
				expanded: !1,
				__primary: !0,
				withToolbar: !0
			}) : null;
		};
		Primary = withMdxComponentOverride("Primary", PrimaryImpl);
		({Tag: Tag2} = __STORYBOOK_MODULE_PREVIEW_API__);
		StyledHeading = styled(Heading2)(({ theme }) => ({
			fontSize: `${theme.typography.size.s2 - 1}px`,
			fontWeight: theme.typography.weight.bold,
			lineHeight: "16px",
			letterSpacing: "0.35em",
			textTransform: "uppercase",
			color: theme.textMutedColor,
			border: 0,
			marginBottom: "12px",
			"&:first-of-type": { marginTop: "56px" }
		}));
		StoriesImpl = ({ title = "Stories", includePrimary = !0 }) => {
			let { componentStories, projectAnnotations, getStoryContext } = (0, import_react$86.useContext)(DocsContext), stories = componentStories(), filter = projectAnnotations.parameters?.docs?.stories?.filter;
			return filter && (stories = stories.filter((story) => filter(story, getStoryContext(story)))), stories.some((story) => story.tags?.includes(Tag2.AUTODOCS)) && (stories = stories.filter((story) => story.tags?.includes(Tag2.AUTODOCS) && !story.usesMount)), includePrimary || (stories = stories.slice(1)), !stories || stories.length === 0 ? null : import_react$86.createElement(import_react$86.Fragment, null, typeof title == "string" ? import_react$86.createElement(StyledHeading, null, title) : title, stories.map((story) => story && import_react$86.createElement(DocsStory, {
				key: story.id,
				of: story.moduleExport,
				expanded: !0,
				__forceInitialArgs: !0
			})));
		};
		Stories = withMdxComponentOverride("Stories", StoriesImpl);
		({deprecate} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		({InvalidBlockOfPropError: InvalidBlockOfPropError6} = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__);
		DEPRECATION_MIGRATION_LINK = "https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#subtitle-block-and-parameterscomponentsubtitle";
		SubtitleImpl = (props) => {
			let { of, children } = props;
			if ("of" in props && of === void 0) throw new InvalidBlockOfPropError6();
			let preparedMeta;
			try {
				preparedMeta = useOf(of || "meta", ["meta"]).preparedMeta;
			} catch (error) {
				if (children && !error.message.includes("did you forget to use <Meta of={} />?")) throw error;
			}
			let { componentSubtitle, docs } = preparedMeta?.parameters || {};
			componentSubtitle && deprecate(`Using 'parameters.componentSubtitle' property to subtitle stories is deprecated. See ${DEPRECATION_MIGRATION_LINK}`);
			let content = children || docs?.subtitle || componentSubtitle;
			return content ? import_react$87.createElement(Subtitle, { className: "sbdocs-subtitle sb-unstyled" }, content) : null;
		};
		Subtitle2 = withMdxComponentOverride("Subtitle", SubtitleImpl);
		({InvalidBlockOfPropError: InvalidBlockOfPropError7} = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__);
		STORY_KIND_PATH_SEPARATOR = /\s*\/\s*/;
		extractTitle = (title) => {
			let groups = title.trim().split(STORY_KIND_PATH_SEPARATOR);
			return groups?.[groups?.length - 1] || title;
		};
		TitleImpl = (props) => {
			let { children, of } = props;
			if ("of" in props && of === void 0) throw new InvalidBlockOfPropError7();
			let preparedMeta;
			try {
				preparedMeta = useOf(of || "meta", ["meta"]).preparedMeta;
			} catch (error) {
				if (children && error instanceof Error && !error.message.includes("did you forget to use <Meta of={} />?")) throw error;
			}
			let content = children || extractTitle(preparedMeta?.title || "");
			return content ? import_react$88.createElement(Title, { className: "sbdocs-title sb-unstyled" }, content) : null;
		};
		Title3 = withMdxComponentOverride("Title", TitleImpl);
		DocsPage = () => {
			let { stories } = useOf("meta", ["meta"]).csfFile, isSingleStory = Object.keys(stories).length === 1;
			return import_react$81.createElement(import_react$81.Fragment, null, import_react$81.createElement(Title3, null), import_react$81.createElement(Subtitle2, null), import_react$81.createElement(Description2, { of: "meta" }), isSingleStory ? import_react$81.createElement(Description2, { of: "story" }) : null, import_react$81.createElement(Primary, null), import_react$81.createElement(Controls3, null), isSingleStory ? null : import_react$81.createElement(Stories, null));
		};
		({deprecate: deprecate2} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		({composeConfigs: composeConfigs2} = __STORYBOOK_MODULE_PREVIEW_API__);
		({Channel} = __STORYBOOK_MODULE_CHANNELS__);
		({Preview: Preview2, composeConfigs} = __STORYBOOK_MODULE_PREVIEW_API__);
		({DocsContext: DocsContext2} = __STORYBOOK_MODULE_PREVIEW_API__);
		({deprecate: deprecate3} = __STORYBOOK_MODULE_CLIENT_LOGGER__);
		Meta = ({ of }) => {
			let context = (0, import_react$91.useContext)(DocsContext);
			of && context.referenceMeta(of, !0);
			try {
				let primary = context.storyById();
				return import_react$91.createElement(Anchor, { storyId: primary.id });
			} catch {
				return null;
			}
		};
		UnstyledImpl = (props) => import_react$92.createElement("div", {
			...props,
			className: "sb-unstyled"
		});
		withMdxComponentOverride("Unstyled", UnstyledImpl);
		WrapperImpl = ({ children }) => import_react$93.createElement("div", { style: { fontFamily: "sans-serif" } }, children);
		withMdxComponentOverride("Wrapper", WrapperImpl);
	})))();
}
//#endregion
export { Docs as a, Primary as c, Title3 as d, init_blocks as f, Description2 as i, Story2 as l, init_chunk_GWNTJ7C3 as m, CodeOrSourceMdx as n, HeadersMdx as o, init_chunk_QC4HFS6K as p, Controls3 as r, Meta as s, AnchorMdx as t, Subtitle2 as u };
