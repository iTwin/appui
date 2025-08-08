import { r as reactExports } from "./iframe-CxthnN3M.js";
import "./Key.enum-DoKni0Tv.js";
import { a0 as usePackageTranslation } from "./appui-react-ARYPQBMf.js";
import { U as UiIModelComponents$1 } from "./Decorators-B5hwbz68.js";
const timeline = { "expand": "Expand", "minimize": "Minimize", "repeat": "Repeat", "slow": "Speed: slow", "medium": "Speed: medium", "fast": "Speed: fast", "play": "Play", "pause": "Pause", "backward": "Backward", "forward": "Forward", "step": "Step", "settings": "Settings" };
const solartimeline = { "speed": "Speed", "dateTime": "Date & time" };
const solarsettings = { "shadowcolor": "Shadow color" };
const errors = { "unable-to-parse-quantity": "Unable to parse string into quantity" };
const cube = { "front": "Front", "back": "Back", "top": "Top", "bottom": "Bottom", "left": "Left", "right": "Right" };
const drawing = { "unrotate": "Un-Rotate", "rotateStyle": "Toggle background-rotate" };
const color = { "close": "Close", "hue": "Hue", "saturation": "Saturation", "toggleColorPopup": "Toggle Color Picker Popup", "transparency": "Transparency" };
const QuantityInput = { "ParseError": "Parse Error, status=", "NoParserDefined": "No Parser Defined!" };
const QuantityFormat = { "none": "None", "dash": "Dash", "space": "Space", "decimal": "Decimal", "scientific": "Scientific", "station": "Station", "fractional": "Fractional", "bearing": "Bearing", "azimuth": "Azimuth", "ratio": "Ratio", "labels": { "compositeSpacer": "Composite Spacer", "compositeSpacerDescription": "Character that appears between units when displaying measurements with multiple units", "formatted": "Formatted", "precision": "Precision", "type": "Format Type", "formatTypeSublabel": "Select the format for which you would like to display measurements", "appendUnitLabel": "Show Unit Label", "labelSeparator": "Label Separator", "signOptionLabel": "Sign Option", "signOptionTooltip": "Controls when + or - signs appear", "stationOffsetLabel": "Station Format", "stationSeparatorLabel": "Station Separator", "decimalSeparatorLabel": "Decimal Separator", "showTrailZerosLabel": "Show Trailing Zeros", "keepSingleZeroLabel": "Add Single Zero After Decimal Point", "zeroEmptyLabel": "Hide If Zero", "moreLabel": "More", "lessLabel": "Less", "keepDecimalPointLabel": "Keep Decimal Point", "fractionDashLabel": "Fraction Dash", "scientificTypeLabel": "Scientific Type", "scientificTypeTooltip": "Select which scientific notation to use", "useThousandSeparatorLabel": "Use Thousand Separator", "thousandSeparatorLabel": "Thousand Separator", "thousandSelectorTooltip": "When this and the decimal separator are set to the same character, one will be flipped to avoid conflicts", "value": "Value", "ratioTypeLabel": "Ratio Type", "azimuthBase": "Azimuth Base", "azimuthCounterClockwise": "Enable Azimuth Counter-Clockwise", "samplePreview": "Preview", "units": "Units", "advancedOptions": "Advanced Options", "addSubUnit": "Add Sub Unit", "removeUnit": "Remove Unit", "azimuthBaseUnit": "Azimuth Base Unit" }, "fraction_precision": { "whole": "Whole", "half": "1/2", "quarter": "1/4", "eighth": "1/8", "sixteenth": "1/16", "over32": "1/32", "over64": "1/64", "over128": "1/128", "over256": "1/256" }, "station_size": { "one": "0+0", "two": "0+00", "three": "0+000", "four": "0+0000" }, "station_separator": { "plus": "+", "minus": "-", "blank": "Blank", "caret": "^" }, "decimal_precision": { "zero": "0", "one": "0.1", "two": "0.01", "three": "0.001", "four": "0.0001", "five": "0.00001", "six": "0.0000001", "seven": "0.0000001", "eight": "0.00000001", "nine": "0.000000001", "ten": "0.0000000001", "eleven": "0.00000000001", "twelve": "0.000000000001" }, "sign_option": { "noSign": "No Sign", "onlyNegative": "Only Negative", "signAlways": "Always", "negativeParentheses": "Negative Parentheses" }, "thousand_separator": { "comma": "Comma", "point": "Point" }, "decimal_separator": { "comma": "Comma", "point": "Point" }, "scientific-type": { "normalized": "Normalized", "zero-normalized": "Zero Normalized" }, "popupButton": { "setFormat": "Set Format" }, "ratio-type": { "n-to-one": { "label": "N:1", "description": "N to 1 ratio (e.g. N:1)" }, "one-to-n": { "label": "1:N", "description": "1 to N ratio (e.g. 1:N)" }, "use-greatest-common-divisor": { "label": "GCD", "description": "Simplifies ratio using GCD (e.g. 0.3 → 3:10)" }, "value-based": { "label": "Value Based", "description": "Scales the smaller value to 1 (e.g. 0.5 → 2:1, 2 → 1:2)" }, "default": { "description": "How properties are shown as a ratio." } }, "azimuthType": { "baseTooltip": "The starting direction (base) from which azimuth angles are measured", "baseUnitTooltip": "Unit used as the base for measuring azimuth angles", "ccwFlagTooltip": "If checked, azimuth angles are measured in a counter-clockwise direction from the base" } };
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
export {
  useTranslation as u
};
