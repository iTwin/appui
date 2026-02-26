import { r as reactExports, j as jsxRuntimeExports, I as IconButton } from "./iframe-BnF7kxuI.js";
import { aH as usePackageTranslation, aI as SvgPause, aJ as SvgPlay } from "./appui-react-B7iNJbV5.js";
import "./Key.enum-B3pThNWo.js";
import { U as UiIModelComponents$1 } from "./Decorators-CwkwcaGG.js";
const timeline = { "expand": "Expand", "minimize": "Minimize", "repeat": "Repeat", "slow": "Speed: slow", "medium": "Speed: medium", "fast": "Speed: fast", "play": "Play", "pause": "Pause", "backward": "Backward", "forward": "Forward", "step": "Step", "settings": "Settings" };
const solartimeline = { "speed": "Speed", "dateTime": "Date & time" };
const solarsettings = { "shadowcolor": "Shadow color" };
const errors = { "unable-to-parse-quantity": "Unable to parse string into quantity" };
const cube = { "front": "Front", "back": "Back", "top": "Top", "bottom": "Bottom", "left": "Left", "right": "Right" };
const drawing = { "unrotate": "Un-Rotate", "rotateStyle": "Toggle background-rotate" };
const color = { "close": "Close", "hue": "Hue", "saturation": "Saturation", "toggleColorPopup": "Toggle Color Picker Popup", "transparency": "Transparency" };
const QuantityInput = { "ParseError": "Parse Error, status=", "NoParserDefined": "No Parser Defined!" };
const QuantityFormat = { "none": "None", "dash": "Dash", "space": "Space", "decimal": "Decimal", "scientific": "Scientific", "station": "Station", "fractional": "Fractional", "bearing": "Bearing", "azimuth": "Azimuth", "ratio": "Ratio", "labels": { "compositeSpacer": "Composite Spacer", "formatted": "Formatted", "precision": "Precision", "type": "Type", "appendUnitLabel": "Append Unit Label", "labelSeparator": "Label Separator", "signOptionLabel": "Sign Option", "stationOffsetLabel": "Station Offset", "stationSeparatorLabel": "Station Separator", "decimalSeparatorLabel": "Decimal Separator", "showTrailZerosLabel": "Show Trail Zeros", "keepSingleZeroLabel": "Keep Single Zero", "zeroEmptyLabel": "Zero Empty", "moreLabel": "More", "lessLabel": "Less", "keepDecimalPointLabel": "Keep Decimal Point", "fractionDashLabel": "Fraction Dash", "scientificTypeLabel": "Scientific Type", "useThousandSeparatorLabel": "Use Thousand Separator", "thousandSeparatorLabel": "Thousand Separator", "value": "Value", "ratioTypeLabel": "Ratio Type", "azimuthBase": "Azimuth Base", "azimuthCounterClockwise": "Enable Azimuth Counter-Clockwise" }, "fraction_precision": { "whole": "Whole", "half": "1/2", "quarter": "1/4", "eighth": "1/8", "sixteenth": "1/16", "over32": "1/32", "over64": "1/64", "over128": "1/128", "over256": "1/256" }, "station_size": { "two": "0+00", "three": "0+000" }, "station_separator": { "plus": "+", "minus": "-", "blank": "Blank", "caret": "^" }, "decimal_precision": { "zero": "1", "one": "0.1", "two": "0.01", "three": "0.001", "four": "0.0001", "five": "0.00001", "six": "0.0000001", "seven": "0.0000001", "eight": "0.00000001", "nine": "0.000000001", "ten": "0.0000000001", "eleven": "0.00000000001", "twelve": "0.000000000001" }, "sign_option": { "noSign": "No Sign", "onlyNegative": "Only Negative", "signAlways": "Always", "negativeParentheses": "Negative Parentheses" }, "thousand_separator": { "comma": "Comma", "point": "Point" }, "decimal_separator": { "comma": "Comma", "point": "Point" }, "scientific-type": { "normalized": "Normalized", "zero-normalized": "Zero Normalized" }, "popupButton": { "setFormat": "Set Format" }, "ratio-type": { "n-to-one": { "label": "N:1", "description": "N to 1 ratio (e.g. N:1)" }, "one-to-n": { "label": "1:N", "description": "1 to N ratio (e.g. 1:N)" }, "use-greatest-common-divisor": { "label": "GCD", "description": "Simplifies ratio using GCD (e.g. 0.3 → 3:10)" }, "value-based": { "label": "Value Based", "description": "Scales the smaller value to 1 (e.g. 0.5 → 2:1, 2 → 1:2)" }, "default": { "description": "How properties are shown as a ratio." } }, "azimuthType": { "baseTooltip": "The starting direction (base) from which azimuth angles are measured.", "ccwFlagTooltip": "If checked, azimuth angles are measured in a counter-clockwise direction from the base." } };
const BearingQuantityType = { "label": "Bearing", "description": "Bearing", "bearingGap": { "label": "Add Direction Gap" }, "bearingAngleDirection": { "label": "Angle Direction", "clockwise": "Clockwise", "counter-clockwise": "Counter-Clockwise" } };
const UiIModelComponents = {
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
const defaults = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BearingQuantityType,
  QuantityFormat,
  QuantityInput,
  color,
  cube,
  default: UiIModelComponents,
  drawing,
  errors,
  solarsettings,
  solartimeline,
  timeline
}, Symbol.toStringTag, { value: "Module" }));
function useTranslation() {
  const fallback = reactExports.useCallback((key) => {
    if (!UiIModelComponents$1.initialized) {
      return void 0;
    }
    return UiIModelComponents$1.translate(key);
  }, []);
  return usePackageTranslation({
    namespace: UiIModelComponents$1.localizationNamespace,
    fallback,
    defaults
  });
}
function PlayButton({ isPlaying, onPlay, onPause }) {
  const { translate } = useTranslation();
  const label = translate(isPlaying ? "timeline.pause" : "timeline.play");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    IconButton,
    {
      styleType: "borderless",
      label,
      onClick: () => {
        if (isPlaying) {
          onPause?.();
          return;
        }
        onPlay?.();
      },
      children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPause, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlay, {})
    }
  );
}
PlayButton.__docgenInfo = { "description": "Play/pause button used in timeline components.\n@internal", "methods": [], "displayName": "PlayButton", "props": { "isPlaying": { "required": true, "tsType": { "name": "boolean" }, "description": "" }, "onPlay": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" }, "onPause": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" } } };
export {
  PlayButton as P,
  useTranslation as u
};
