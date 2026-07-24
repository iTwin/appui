import { a as __exportAll, i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Dt as IconButton, i as init_esm } from "./iframe-DrBiZGmV.js";
import { Gt as init_internal, Hi as SvgPlay, Sr as usePackageTranslation, Vr as init_esm$1, Xi as SvgPause } from "./components-react-DigDa1CF.js";
import { a as init_UiIModelComponents$1, i as UiIModelComponents } from "./Decorators-CA-ZE0kv.js";
//#region ../../ui/imodel-components-react/src/imodel-components-react/UiIModelComponents.json
var UiIModelComponents_exports = /* @__PURE__ */ __exportAll({
	BearingQuantityType: () => BearingQuantityType,
	QuantityFormat: () => QuantityFormat,
	QuantityInput: () => QuantityInput,
	color: () => color,
	cube: () => cube,
	default: () => UiIModelComponents_default,
	drawing: () => drawing,
	errors: () => errors,
	solarsettings: () => solarsettings,
	solartimeline: () => solartimeline,
	timeline: () => timeline
});
var timeline, solartimeline, solarsettings, errors, cube, drawing, color, QuantityInput, QuantityFormat, BearingQuantityType, UiIModelComponents_default;
var init_UiIModelComponents = __esmMin((() => {
	timeline = {
		"expand": "Expand",
		"minimize": "Minimize",
		"repeat": "Repeat",
		"slow": "Speed: slow",
		"medium": "Speed: medium",
		"fast": "Speed: fast",
		"play": "Play",
		"pause": "Pause",
		"backward": "Backward",
		"forward": "Forward",
		"step": "Step",
		"settings": "Settings"
	};
	solartimeline = {
		"speed": "Speed",
		"dateTime": "Date & time"
	};
	solarsettings = { "shadowcolor": "Shadow color" };
	errors = { "unable-to-parse-quantity": "Unable to parse string into quantity" };
	cube = {
		"front": "Front",
		"back": "Back",
		"top": "Top",
		"bottom": "Bottom",
		"left": "Left",
		"right": "Right"
	};
	drawing = {
		"unrotate": "Un-Rotate",
		"rotateStyle": "Toggle background-rotate"
	};
	color = {
		"close": "Close",
		"hue": "Hue",
		"saturation": "Saturation",
		"toggleColorPopup": "Toggle Color Picker Popup",
		"transparency": "Transparency"
	};
	QuantityInput = {
		"ParseError": "Parse Error, status=",
		"NoParserDefined": "No Parser Defined!"
	};
	QuantityFormat = {
		"none": "None",
		"dash": "Dash",
		"space": "Space",
		"decimal": "Decimal",
		"scientific": "Scientific",
		"station": "Station",
		"fractional": "Fractional",
		"bearing": "Bearing",
		"azimuth": "Azimuth",
		"ratio": "Ratio",
		"labels": {
			"compositeSpacer": "Composite Spacer",
			"formatted": "Formatted",
			"precision": "Precision",
			"type": "Type",
			"appendUnitLabel": "Append Unit Label",
			"labelSeparator": "Label Separator",
			"signOptionLabel": "Sign Option",
			"stationOffsetLabel": "Station Offset",
			"stationSeparatorLabel": "Station Separator",
			"decimalSeparatorLabel": "Decimal Separator",
			"showTrailZerosLabel": "Show Trail Zeros",
			"keepSingleZeroLabel": "Keep Single Zero",
			"zeroEmptyLabel": "Zero Empty",
			"moreLabel": "More",
			"lessLabel": "Less",
			"keepDecimalPointLabel": "Keep Decimal Point",
			"fractionDashLabel": "Fraction Dash",
			"scientificTypeLabel": "Scientific Type",
			"useThousandSeparatorLabel": "Use Thousand Separator",
			"thousandSeparatorLabel": "Thousand Separator",
			"value": "Value",
			"ratioTypeLabel": "Ratio Type",
			"azimuthBase": "Azimuth Base",
			"azimuthCounterClockwise": "Enable Azimuth Counter-Clockwise"
		},
		"fraction_precision": {
			"whole": "Whole",
			"half": "1/2",
			"quarter": "1/4",
			"eighth": "1/8",
			"sixteenth": "1/16",
			"over32": "1/32",
			"over64": "1/64",
			"over128": "1/128",
			"over256": "1/256"
		},
		"station_size": {
			"two": "0+00",
			"three": "0+000"
		},
		"station_separator": {
			"plus": "+",
			"minus": "-",
			"blank": "Blank",
			"caret": "^"
		},
		"decimal_precision": {
			"zero": "1",
			"one": "0.1",
			"two": "0.01",
			"three": "0.001",
			"four": "0.0001",
			"five": "0.00001",
			"six": "0.0000001",
			"seven": "0.0000001",
			"eight": "0.00000001",
			"nine": "0.000000001",
			"ten": "0.0000000001",
			"eleven": "0.00000000001",
			"twelve": "0.000000000001"
		},
		"sign_option": {
			"noSign": "No Sign",
			"onlyNegative": "Only Negative",
			"signAlways": "Always",
			"negativeParentheses": "Negative Parentheses"
		},
		"thousand_separator": {
			"comma": "Comma",
			"point": "Point"
		},
		"decimal_separator": {
			"comma": "Comma",
			"point": "Point"
		},
		"scientific-type": {
			"normalized": "Normalized",
			"zero-normalized": "Zero Normalized"
		},
		"popupButton": { "setFormat": "Set Format" },
		"ratio-type": {
			"n-to-one": {
				"label": "N:1",
				"description": "N to 1 ratio (e.g. N:1)"
			},
			"one-to-n": {
				"label": "1:N",
				"description": "1 to N ratio (e.g. 1:N)"
			},
			"use-greatest-common-divisor": {
				"label": "GCD",
				"description": "Simplifies ratio using GCD (e.g. 0.3 → 3:10)"
			},
			"value-based": {
				"label": "Value Based",
				"description": "Scales the smaller value to 1 (e.g. 0.5 → 2:1, 2 → 1:2)"
			},
			"default": { "description": "How properties are shown as a ratio." }
		},
		"azimuthType": {
			"baseTooltip": "The starting direction (base) from which azimuth angles are measured.",
			"ccwFlagTooltip": "If checked, azimuth angles are measured in a counter-clockwise direction from the base."
		}
	};
	BearingQuantityType = {
		"label": "Bearing",
		"description": "Bearing",
		"bearingGap": { "label": "Add Direction Gap" },
		"bearingAngleDirection": {
			"label": "Angle Direction",
			"clockwise": "Clockwise",
			"counter-clockwise": "Counter-Clockwise"
		}
	};
	UiIModelComponents_default = {
		timeline,
		solartimeline,
		solarsettings,
		errors,
		cube,
		drawing,
		color,
		QuantityInput,
		QuantityFormat,
		BearingQuantityType
	};
}));
//#endregion
//#region ../../ui/imodel-components-react/src/imodel-components-react/useTranslation.tsx
/** Returns a translation function.
* @internal
*/
function useTranslation() {
	const fallback = import_react$1.useCallback((key) => {
		if (!UiIModelComponents.initialized) return;
		return UiIModelComponents.translate(key);
	}, []);
	return usePackageTranslation({
		namespace: UiIModelComponents.localizationNamespace,
		fallback,
		defaults: UiIModelComponents_exports
	});
}
var import_react$1;
var init_useTranslation = __esmMin((() => {
	init_UiIModelComponents();
	import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_internal();
	init_UiIModelComponents$1();
}));
//#endregion
//#region ../../ui/imodel-components-react/src/imodel-components-react/timeline/PlayButton.tsx
/** Play/pause button used in timeline components.
* @internal
*/
function PlayButton({ isPlaying, onPlay, onPause }) {
	const { translate } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
		styleType: "borderless",
		label: translate(isPlaying ? "timeline.pause" : "timeline.play"),
		onClick: () => {
			if (isPlaying) {
				onPause?.();
				return;
			}
			onPlay?.();
		},
		children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPause, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgPlay, {})
	});
}
var import_jsx_runtime;
var init_PlayButton = __esmMin((() => {
	require_react();
	init_esm$1();
	init_esm();
	init_useTranslation();
	import_jsx_runtime = require_jsx_runtime();
	PlayButton.__docgenInfo = {
		"description": "Play/pause button used in timeline components.\n@internal",
		"methods": [],
		"displayName": "PlayButton",
		"props": {
			"isPlaying": {
				"required": true,
				"tsType": { "name": "boolean" },
				"description": ""
			},
			"onPlay": {
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
			"onPause": {
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
			}
		}
	};
}));
//#endregion
export { useTranslation as i, init_PlayButton as n, init_useTranslation as r, PlayButton as t };
