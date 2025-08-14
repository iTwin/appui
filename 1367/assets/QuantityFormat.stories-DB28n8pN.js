var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b, _c;
import { d0 as useTranslation, Y as Select, cS as parseFormatType, L as Label, cN as FormatType, Z as Input, a4 as Icon, cO as RatioType, cP as FractionalPrecision, cQ as DecimalPrecision, cR as ScientificType, cU as Format, cT as getTraitString, cV as FormatTraits, aG as Checkbox, cW as ShowSignOption, cM as SvgHelpCircularHollow, cZ as parseRatioType, cX as parseShowSignOption, cY as parseScientificType, c$ as FormatterSpec, ai as Text, at as Flex, c_ as Surface, a2 as ExpandableBlock, I as IModelApp, d1 as getQuantityTypeKey, d2 as isCustomQuantityTypeDefinition, a3 as useTranslation$1, U as UiFramework, d3 as useSaveBeforeActivatingNewSettingsTab, d4 as useSaveBeforeClosingSettingsContainer, d5 as Listbox, d6 as ListboxItem, d7 as QuantityType } from "./appui-react-ARYPQBMf.js";
import { K as Key_enumExports, B as Button, c as Dialog$1 } from "./Key.enum-DoKni0Tv.js";
import { A as AppUiDecorator, I as InitializerDecorator } from "./Decorators-B5hwbz68.js";
import { e as enumArgType } from "./Utils-CNFWIpMY.js";
import { r as reactExports, c as classnames, e, I as IconButton, j as jsxRuntimeExports } from "./iframe-CxthnN3M.js";
import { L as LabeledSelect } from "./LabeledSelect-CwIwREAR.js";
import { D as Divider } from "./Divider-BPouWLfT.js";
import "./client-CRBvtWy6.js";
class DeepCompare {
  /** Construct comparison object with relative tolerance. */
  constructor(numberRelTol = 1e-12) {
    /** Statistical accumulations during searchers. */
    __publicField(this, "typeCounts", {
      numbers: 0,
      arrays: 0,
      functions: 0,
      objects: 0,
      strings: 0,
      booleans: 0,
      undefined: 0
    });
    /** Counts of property names encountered during various searches. */
    __publicField(this, "propertyCounts", {});
    /** Array of error descriptions. */
    __publicField(this, "errorTracker", []);
    /** relative tolerance for declaring numeric values equal. */
    __publicField(this, "numberRelTol");
    this.numberRelTol = numberRelTol;
  }
  /** Test if a and b are within tolerance.
   * * If not, push error message to errorTracker.
   */
  compareNumber(a, b) {
    if (Math.abs(b - a) < this.numberRelTol * (1 + Math.abs(a) + Math.abs(b))) {
      return this.announce(true);
    } else {
      this.errorTracker.unshift(b);
      this.errorTracker.unshift(a);
      this.errorTracker.unshift(`In ${this.errorTracker[this.errorTracker.length - 1]} property: Mismatched values`);
      return this.announce(false);
    }
  }
  compareArray(a, b) {
    if (a.length !== b.length) {
      const aCounter = {};
      const bCounter = {};
      for (const i of b) {
        if (typeof i === "object" && typeof i !== "function" && !Array.isArray(i)) {
          for (const property in i) {
            if (i.hasOwnProperty(property)) {
              if (!bCounter.hasOwnProperty(property))
                bCounter[property] = 0;
              bCounter[property]++;
            }
          }
        }
      }
      this.errorTracker.unshift(bCounter);
      for (const i of a) {
        if (typeof i === "object" && typeof i !== "function" && !Array.isArray(i)) {
          for (const property in i) {
            if (i.hasOwnProperty(property)) {
              if (!aCounter.hasOwnProperty(property))
                aCounter[property] = 0;
              aCounter[property]++;
            }
          }
        }
      }
      this.errorTracker.unshift(aCounter);
      this.errorTracker.unshift(`Mismatched array lengths a: [${a.length}] b: [${b.length}]`);
      return this.announce(false);
    }
    let toReturn = true;
    for (let i = 0; i < a.length; i++) {
      if (!this.compareInternal(a[i], b[i])) {
        toReturn = false;
        this.errorTracker.unshift(`[${i.toString()}]`);
        break;
      }
    }
    return this.announce(toReturn);
  }
  compareObject(a, b) {
    if (a == null && b == null)
      return this.announce(true);
    if (Object.keys(a).length !== Object.keys(b).length) {
      this.errorTracker.unshift(`Mismatched property lists [${Object.keys(a)}][${Object.keys(b)}`);
      return this.announce(false);
    }
    let toReturn = true;
    for (const property in a) {
      if (a.hasOwnProperty(property)) {
        if (!this.propertyCounts.hasOwnProperty(property)) {
          this.propertyCounts[property] = 0;
        }
        this.propertyCounts[property]++;
        if (!b.hasOwnProperty(property)) {
          this.errorTracker.unshift(`Property ${property} of A not in B`);
          this.errorTracker.unshift(a);
          this.errorTracker.unshift(b);
          return this.announce(false);
        }
        if (!this.compareInternal(a[property], b[property])) {
          this.errorTracker.unshift(property);
          toReturn = false;
          break;
        }
      }
    }
    return this.announce(toReturn);
  }
  // this is a convenient place for a breakpoint on failures in areSameStructure.
  announce(value) {
    if (value)
      return true;
    return false;
  }
  /** Main entry for comparing deep json objects.
   * * errorTracker, typeCounts, and propertyCounts are cleared.
   */
  compare(a, b, tolerance) {
    if (tolerance !== void 0)
      this.numberRelTol = tolerance;
    this.errorTracker.length = 0;
    this.typeCounts.numbers = this.typeCounts.arrays = this.typeCounts.functions = this.typeCounts.objects = this.typeCounts.strings = this.typeCounts.booleans = this.typeCounts.undefined = 0;
    this.propertyCounts = {};
    return this.compareInternal(a, b);
  }
  // Recursive function for comparing any two nodes in a json object "tree"
  compareInternal(a, b) {
    if (typeof a !== typeof b) {
      return this.announce(false);
    } else if (typeof a === "number" && typeof b === "number") {
      this.typeCounts.numbers++;
      return this.compareNumber(a, b);
    } else if (Array.isArray(a) && Array.isArray(b)) {
      this.typeCounts.arrays++;
      return this.compareArray(a, b);
    } else if (typeof a === "function" && typeof b === "function") {
      this.typeCounts.functions++;
      return true;
    } else if (typeof a === "object" && typeof b === "object") {
      this.typeCounts.objects++;
      return a === b ? true : this.compareObject(a, b);
    } else if (typeof a === "string" && typeof b === "string") {
      this.typeCounts.strings++;
      return a === b;
    } else if (typeof a === "boolean" && typeof b === "boolean") {
      this.typeCounts.booleans++;
      return a === b;
    } else if (typeof a === "undefined" && typeof b === "undefined") {
      this.typeCounts.undefined++;
      return true;
    } else {
      return this.announce(false);
    }
  }
}
const isCheckboxFormatPropEditorSpec = (item) => {
  return item.editorType === "checkbox";
};
const isTextInputFormatPropEditorSpec = (item) => {
  return item.editorType === "text";
};
const isTextSelectFormatPropEditorSpec = (item) => {
  return item.editorType === "select";
};
const SvgProgressForward = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M5.57 15.5l-1.756-1.756L9.558 8 3.814 2.256 5.57.5l7.5 7.5z" })
  );
};
function DecimalPrecisionSelector(props) {
  const { precision, onChange, id, ...rest } = props;
  const { translate } = useTranslation();
  const options = [
    {
      value: 0,
      label: translate("QuantityFormat.decimal_precision.zero")
    },
    {
      value: 1,
      label: translate("QuantityFormat.decimal_precision.one")
    },
    {
      value: 2,
      label: translate("QuantityFormat.decimal_precision.two")
    },
    {
      value: 3,
      label: translate("QuantityFormat.decimal_precision.three")
    },
    {
      value: 4,
      label: translate("QuantityFormat.decimal_precision.four")
    },
    {
      value: 5,
      label: translate("QuantityFormat.decimal_precision.five")
    },
    {
      value: 6,
      label: translate("QuantityFormat.decimal_precision.six")
    },
    {
      value: 7,
      label: translate("QuantityFormat.decimal_precision.seven")
    },
    {
      value: 8,
      label: translate("QuantityFormat.decimal_precision.eight")
    },
    {
      value: 9,
      label: translate("QuantityFormat.decimal_precision.nine")
    },
    {
      value: 10,
      label: translate("QuantityFormat.decimal_precision.ten")
    },
    {
      value: 11,
      label: translate("QuantityFormat.decimal_precision.eleven")
    },
    {
      value: 12,
      label: translate("QuantityFormat.decimal_precision.twelve")
    }
  ];
  const handleOnChange = reactExports.useCallback((newValue) => {
    onChange && onChange(newValue);
  }, [onChange]);
  return reactExports.createElement(Select, { options, value: precision, onChange: handleOnChange, size: "small", id, ...rest });
}
function FractionPrecisionSelector(props) {
  const { precision, onChange, id, ...rest } = props;
  const { translate } = useTranslation();
  const options = [
    {
      value: 1,
      label: translate("QuantityFormat.fraction_precision.whole")
    },
    {
      value: 2,
      label: translate("QuantityFormat.fraction_precision.half")
    },
    {
      value: 4,
      label: translate("QuantityFormat.fraction_precision.quarter")
    },
    {
      value: 8,
      label: translate("QuantityFormat.fraction_precision.eighth")
    },
    {
      value: 16,
      label: translate("QuantityFormat.fraction_precision.sixteenth")
    },
    {
      value: 32,
      label: translate("QuantityFormat.fraction_precision.over32")
    },
    {
      value: 64,
      label: translate("QuantityFormat.fraction_precision.over64")
    },
    {
      value: 128,
      label: translate("QuantityFormat.fraction_precision.over128")
    },
    {
      value: 256,
      label: translate("QuantityFormat.fraction_precision.over256")
    }
  ];
  const handleOnChange = reactExports.useCallback((newValue) => {
    onChange && onChange(newValue);
  }, [onChange]);
  return reactExports.createElement(Select, { options, value: precision, onChange: handleOnChange, size: "small", id, ...rest });
}
function FormatPrecision(props) {
  const { formatProps, onChange } = props;
  const { translate } = useTranslation();
  const precisionSelectorId = reactExports.useId();
  const handlePrecisionChange = reactExports.useCallback((precision) => {
    const newFormatProps = { ...formatProps, precision };
    onChange && onChange(newFormatProps);
  }, [formatProps, onChange]);
  const formatType = parseFormatType(formatProps.type, "format");
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(Label, { className: "uicore-label", as: "div", displayStyle: "inline", id: precisionSelectorId }, translate("QuantityFormat.labels.precision")),
    formatType === FormatType.Fractional ? reactExports.createElement(FractionPrecisionSelector, { "aria-labelledby": precisionSelectorId, precision: formatProps.precision ?? 0, onChange: handlePrecisionChange }) : reactExports.createElement(DecimalPrecisionSelector, { "aria-labelledby": precisionSelectorId, precision: formatProps.precision ?? 0, onChange: handlePrecisionChange })
  );
}
function FormatSample(props) {
  const { initialMagnitude, formatSpec, hideLabels } = props;
  const { translate } = useTranslation();
  const initialValue = initialMagnitude ?? 0;
  const [magnitude, setMagnitude] = reactExports.useState(initialValue);
  const [sampleValue, setSampleValue] = reactExports.useState(initialValue.toString());
  reactExports.useEffect(() => {
    const value = initialMagnitude ?? 0;
    setMagnitude(value);
    setSampleValue(value.toString());
  }, [initialMagnitude]);
  const handleOnValueBlur = reactExports.useCallback(() => {
    let newValue = Number.parseFloat(sampleValue);
    if (Number.isNaN(newValue))
      newValue = 0;
    setMagnitude(newValue);
    setSampleValue(newValue.toString());
  }, [sampleValue]);
  const handleOnValueChange = reactExports.useCallback((event) => {
    setSampleValue(event.target.value);
  }, []);
  const handleKeyDown = reactExports.useCallback((e2) => {
    if (e2.key === Key_enumExports.Key.Enter.valueOf()) {
      let newValue = Number.parseFloat(sampleValue);
      if (Number.isNaN(newValue))
        newValue = 0;
      setMagnitude(newValue);
      setSampleValue(newValue.toString());
      e2.preventDefault();
    }
  }, [sampleValue]);
  const activePersistenceUnitLabel = formatSpec ? formatSpec.persistenceUnit.label : "";
  const formattedValue = formatSpec ? formatSpec.applyFormatting(magnitude) : "";
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    !hideLabels && reactExports.createElement("span", { className: "uicore-label" }, translate("QuantityFormat.labels.value")),
    reactExports.createElement(
      "span",
      { className: "components-inline" },
      reactExports.createElement(Input, { "data-testid": "format-sample-input", className: "components-quantity-persistence-input", value: sampleValue, onChange: handleOnValueChange, onKeyDown: handleKeyDown, onBlur: handleOnValueBlur, size: "small" }),
      activePersistenceUnitLabel
    ),
    !hideLabels && reactExports.createElement("span", { className: "uicore-label" }, translate("QuantityFormat.labels.formatted")),
    reactExports.createElement(
      "span",
      { "data-testid": "progress-forward" },
      hideLabels && formattedValue.length > 0 && // eslint-disable-next-line @typescript-eslint/no-deprecated
      reactExports.createElement(Icon, { iconSpec: reactExports.createElement(SvgProgressForward, null) }),
      reactExports.createElement("span", { "data-testid": "format-sample-formatted", className: "uicore-label components-quantity-formatted-sample" }, formattedValue)
    )
  );
}
function FormatTypeSelector(props) {
  const { type, onChange, ...rest } = props;
  const { translate } = useTranslation();
  const formatTypeSelectorId = reactExports.useId();
  const formatOptions = reactExports.useMemo(() => [
    {
      value: FormatType.Decimal,
      label: translate("QuantityFormat.decimal")
    },
    {
      value: FormatType.Scientific,
      label: translate("QuantityFormat.scientific")
    },
    {
      value: FormatType.Station,
      label: translate("QuantityFormat.station")
    },
    {
      value: FormatType.Fractional,
      label: translate("QuantityFormat.fractional")
    },
    {
      value: FormatType.Bearing,
      label: translate("QuantityFormat.bearing")
    },
    {
      value: FormatType.Azimuth,
      label: translate("QuantityFormat.azimuth")
    },
    {
      value: FormatType.Ratio,
      label: translate("QuantityFormat.ratio")
    }
  ], [translate]);
  const handleOnChange = reactExports.useCallback((newValue) => {
    onChange && onChange(newValue);
  }, [onChange]);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(Label, { className: "uicore-label", displayStyle: "inline", id: formatTypeSelectorId }, translate("QuantityFormat.labels.type")),
    reactExports.createElement(Select, { options: formatOptions, value: type, "aria-labelledby": formatTypeSelectorId, onChange: handleOnChange, size: "small", ...rest })
  );
}
const handleUnitsWhenFormatTypeChange = (units, type) => {
  if (type === FormatType.Ratio) {
    if (units.length > 1) {
      return [units[0]];
    }
  }
  return units;
};
function FormatTypeOption(props) {
  const { formatProps, onChange, ...rest } = props;
  const handleFormatTypeChange = reactExports.useCallback((type) => {
    var _a2;
    let precision;
    let stationOffsetSize;
    let scientificType;
    let azimuthBaseUnit;
    let azimuthBase;
    let revolutionUnit;
    let ratioType;
    switch (type) {
      case FormatType.Scientific:
        precision = DecimalPrecision.Six;
        scientificType = ScientificType.Normalized;
        break;
      case FormatType.Decimal:
        precision = DecimalPrecision.Four;
        break;
      case FormatType.Station:
        precision = DecimalPrecision.Two;
        stationOffsetSize = ((_a2 = formatProps.composite) == null ? void 0 : _a2.units[0].name.toLocaleLowerCase().endsWith("m")) ? 3 : 2;
        break;
      case FormatType.Fractional:
        precision = FractionalPrecision.Eight;
        break;
      case FormatType.Bearing:
        revolutionUnit = "Units.REVOLUTION";
        break;
      case FormatType.Azimuth:
        revolutionUnit = "Units.REVOLUTION";
        azimuthBaseUnit = "Units.ARC_DEG";
        azimuthBase = 0;
        break;
      case FormatType.Ratio:
        ratioType = RatioType.NToOne;
        break;
    }
    const newFormatProps = {
      ...formatProps,
      composite: formatProps.composite ? {
        ...formatProps.composite,
        units: handleUnitsWhenFormatTypeChange(formatProps.composite.units, type)
      } : void 0,
      type,
      precision,
      scientificType,
      stationOffsetSize,
      revolutionUnit,
      azimuthBaseUnit,
      azimuthBase,
      ratioType
    };
    onChange && onChange(newFormatProps);
  }, [formatProps, onChange]);
  const formatType = parseFormatType(formatProps.type, "format");
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(FormatTypeSelector, { ...rest, type: formatType, onChange: handleFormatTypeChange })
  );
}
function UomSeparatorSelector(props) {
  const { separator, onChange, disabled, ...rest } = props;
  const { translate } = useTranslation();
  const handleOnChange = reactExports.useCallback((newValue) => {
    onChange && onChange(newValue);
  }, [onChange]);
  const separatorOptions = reactExports.useMemo(() => {
    const uomDefaultEntries = [
      { value: "", label: translate("QuantityFormat.none") },
      { value: " ", label: translate("QuantityFormat.space") },
      { value: "-", label: translate("QuantityFormat.dash") }
    ];
    const completeListOfEntries = [];
    if (void 0 === uomDefaultEntries.find((option) => option.value === separator)) {
      completeListOfEntries.push({ value: separator, label: separator });
    }
    completeListOfEntries.push(...uomDefaultEntries);
    return completeListOfEntries;
  }, [separator, translate]);
  return reactExports.createElement(Select, { options: separatorOptions, value: separator, onChange: handleOnChange, size: "small", disabled, ...rest });
}
function FormatUnitLabel(props) {
  const { formatProps, onUnitLabelChange } = props;
  const { translate } = useTranslation();
  const uomSeparatorSelectorId = reactExports.useId();
  const handleSetFormatProps = reactExports.useCallback((newProps) => {
    onUnitLabelChange && onUnitLabelChange(newProps);
  }, [onUnitLabelChange]);
  const isFormatTraitSet = reactExports.useCallback((trait) => {
    return Format.isFormatTraitSetInProps(formatProps, trait);
  }, [formatProps]);
  const setFormatTrait = reactExports.useCallback((trait, setActive) => {
    const traitStr = getTraitString(trait);
    let formatTraits = [traitStr];
    if (setActive) {
      if (formatProps.formatTraits) {
        const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
        if (!traits.find((traitEntry) => traitStr === traitEntry)) {
          formatTraits = [...traits, traitStr];
        }
      }
    } else {
      if (!formatProps.formatTraits)
        return;
      const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
      formatTraits = traits.filter((traitEntry) => traitEntry !== traitStr);
    }
    const newFormatProps = { ...formatProps, formatTraits };
    handleSetFormatProps(newFormatProps);
  }, [formatProps, handleSetFormatProps]);
  const handleUomSeparatorChange = reactExports.useCallback((newSeparator) => {
    const newFormatProps = { ...formatProps, uomSeparator: newSeparator };
    handleSetFormatProps(newFormatProps);
  }, [formatProps, handleSetFormatProps]);
  const handleShowUnitLabelChange = reactExports.useCallback((e2) => {
    setFormatTrait(FormatTraits.ShowUnitLabel, e2.target.checked);
  }, [setFormatTrait]);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement("span", { className: "uicore-label" }, translate("QuantityFormat.labels.appendUnitLabel")),
    reactExports.createElement(Checkbox, { "data-testid": "show-unit-label-checkbox", checked: isFormatTraitSet(FormatTraits.ShowUnitLabel), onChange: handleShowUnitLabelChange }),
    reactExports.createElement(Label, { as: "div", displayStyle: "inline", id: uomSeparatorSelectorId, className: classnames("uicore-label", !isFormatTraitSet(FormatTraits.ShowUnitLabel) && "uicore-disabled") }, translate("QuantityFormat.labels.labelSeparator")),
    reactExports.createElement(UomSeparatorSelector, { "aria-labelledby": uomSeparatorSelectorId, separator: formatProps.uomSeparator ?? "", onChange: handleUomSeparatorChange, disabled: !isFormatTraitSet(FormatTraits.ShowUnitLabel) })
  );
}
async function getUnitConversionData$1(possibleUnits, toUnit, unitsProvider) {
  const unitConversionEntries = possibleUnits.map(async (unit) => {
    const conversion = await unitsProvider.getConversion(unit, toUnit);
    return { conversion, unitProps: unit };
  });
  return unitConversionEntries;
}
async function getPossibleUnits$1(parentUnit, unitsProvider, ensureCompatibleComposite) {
  const phenomenon = parentUnit.phenomenon;
  const possibleUnits = await unitsProvider.getUnitsByFamily(phenomenon);
  if (!ensureCompatibleComposite)
    return possibleUnits;
  const conversionPromises = await getUnitConversionData$1(possibleUnits, parentUnit, unitsProvider);
  const conversionEntries = await Promise.all(conversionPromises);
  return conversionEntries.filter((entry) => entry.unitProps.system === parentUnit.system && entry.conversion.factor < 1).sort((a, b) => b.conversion.factor - a.conversion.factor).map((value) => value.unitProps);
}
function getUnitName(fullUnitName) {
  const nameParts = fullUnitName.split(/[.:]/);
  if (nameParts.length > 0)
    return nameParts[nameParts.length - 1];
  throw Error("Bad unit name encountered");
}
function UnitDescr(props) {
  const { name, label, parentUnitName, index, onUnitChange, onLabelChange, readonly, unitsProvider } = props;
  const [unitOptions, setUnitOptions] = reactExports.useState([
    { value: name, label: getUnitName(name) }
  ]);
  const [currentUnit, setCurrentUnit] = reactExports.useState({ name, label });
  const { translate } = useTranslation();
  const isMounted = reactExports.useRef(false);
  reactExports.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  });
  reactExports.useEffect(() => {
    async function fetchAllowableUnitSelections() {
      const currentUnitProps = await unitsProvider.findUnitByName(name);
      const parentUnit = await unitsProvider.findUnitByName(parentUnitName ? parentUnitName : name);
      if (parentUnit && currentUnitProps) {
        let potentialSubUnit;
        const potentialUnits = await getPossibleUnits$1(parentUnit, unitsProvider, index !== 0);
        if (index < 3) {
          const potentialSubUnits = await getPossibleUnits$1(currentUnitProps, unitsProvider, true);
          if (potentialSubUnits.length)
            potentialSubUnit = potentialSubUnits[0];
        }
        const options = potentialUnits.length > 0 ? potentialUnits.map((unitValue) => {
          return {
            value: `${unitValue.name}:${unitValue.label}`,
            label: getUnitName(unitValue.name)
          };
        }).sort((a, b) => a.label.localeCompare(b.label)) : [
          {
            value: `${currentUnitProps.name}:${currentUnitProps.label}`,
            label: getUnitName(name)
          }
        ];
        if (potentialSubUnit) {
          options.push({
            value: `ADDSUBUNIT:${potentialSubUnit.name}:${potentialSubUnit.label}`,
            label: translate("QuantityFormat.labels.addSubUnit")
          });
        }
        if (index !== 0)
          options.push({
            value: "REMOVEUNIT",
            label: translate("QuantityFormat.labels.removeUnit")
          });
        if (isMounted.current) {
          setUnitOptions(options);
          setCurrentUnit(currentUnitProps);
        }
      }
    }
    void fetchAllowableUnitSelections();
  }, [index, label, name, parentUnitName, translate, unitsProvider]);
  const handleOnUnitChange = reactExports.useCallback((newValue) => {
    onUnitChange && onUnitChange(newValue, index);
  }, [index, onUnitChange]);
  const handleOnLabelChange = reactExports.useCallback((e2) => {
    e2.preventDefault();
    onLabelChange && onLabelChange(e2.target.value, index);
  }, [index, onLabelChange]);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(Select, { options: unitOptions, "data-testid": `unit-${currentUnit.name}`, value: `${currentUnit.name}:${currentUnit.label}`, onChange: handleOnUnitChange, disabled: readonly, size: "small" }),
    reactExports.createElement(Input, { "data-testid": `unit-label-${currentUnit.name}`, value: label, onChange: handleOnLabelChange, size: "small" })
  );
}
function FormatUnits(props) {
  var _a2, _b2;
  const { initialFormat, persistenceUnit, unitsProvider, onUnitsChange } = props;
  const { translate } = useTranslation();
  const initialFormatRef = reactExports.useRef(initialFormat);
  const [formatProps, setFormatProps] = reactExports.useState(initialFormat);
  reactExports.useEffect(() => {
    if (initialFormatRef.current !== initialFormat) {
      initialFormatRef.current = initialFormat;
      setFormatProps(initialFormat);
    }
  }, [initialFormat]);
  const handleSetFormatProps = reactExports.useCallback((newProps) => {
    setFormatProps(newProps);
    onUnitsChange && onUnitsChange(newProps);
  }, [onUnitsChange]);
  const handleUnitLabelChange = reactExports.useCallback((newLabel, index) => {
    if (formatProps.composite && formatProps.composite.units.length > index && index >= 0) {
      const units = formatProps.composite.units.map((entry, ndx) => {
        if (index === ndx)
          return { name: entry.name, label: newLabel };
        else
          return entry;
      });
      const composite = { ...formatProps.composite, units };
      const newFormatProps = { ...formatProps, composite };
      handleSetFormatProps(newFormatProps);
    }
  }, [formatProps, handleSetFormatProps]);
  const handleUnitChange = reactExports.useCallback((newUnit, index) => {
    const unitParts = newUnit.split(/:/);
    if (unitParts[0] === "REMOVEUNIT") {
      if (formatProps.composite && formatProps.composite.units.length > 1) {
        const units = [...formatProps.composite.units];
        units.pop();
        const composite = { ...formatProps.composite, units };
        const newFormatProps = { ...formatProps, composite };
        handleSetFormatProps(newFormatProps);
      }
    } else if (unitParts[0] === "ADDSUBUNIT") {
      const units = formatProps.composite && formatProps.composite.units.length ? [
        ...formatProps.composite.units,
        { name: unitParts[1], label: unitParts[2] }
      ] : [{ name: unitParts[1], label: unitParts[2] }];
      const composite = { ...formatProps.composite, units };
      const newFormatProps = { ...formatProps, composite };
      handleSetFormatProps(newFormatProps);
    } else {
      if (formatProps.composite && formatProps.composite.units.length > index && index >= 0) {
        const units = formatProps.composite.units.map((entry, ndx) => {
          if (index === ndx)
            return { name: unitParts[0], label: unitParts[1] };
          else
            return entry;
        });
        const composite = { ...formatProps.composite, units };
        const newFormatProps = { ...formatProps, composite };
        handleSetFormatProps(newFormatProps);
      } else if (!formatProps.composite) {
        const composite = {
          units: [{ name: unitParts[0], label: unitParts[1] }]
        };
        const newFormatProps = { ...formatProps, composite };
        handleSetFormatProps(newFormatProps);
      }
    }
  }, [formatProps, handleSetFormatProps]);
  const handleOnSpacerChange = reactExports.useCallback((e2) => {
    if (formatProps.composite) {
      const spacerValue = e2.target.value.length ? e2.target.value[0] : "";
      const composite = { ...formatProps.composite, spacer: spacerValue };
      const newFormatProps = { ...formatProps, composite };
      handleSetFormatProps(newFormatProps);
    }
  }, [formatProps, handleSetFormatProps]);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    ((_a2 = formatProps.composite) == null ? void 0 : _a2.units) ? formatProps.composite.units.map((value, index) => reactExports.createElement(UnitDescr, { key: value.name, name: value.name, label: value.label ?? "", parentUnitName: index > 0 ? formatProps.composite.units[index - 1].name : void 0, unitsProvider, index, onUnitChange: handleUnitChange, onLabelChange: handleUnitLabelChange, readonly: index < formatProps.composite.units.length - 1 })) : persistenceUnit && reactExports.createElement(UnitDescr, { key: persistenceUnit.name, name: persistenceUnit.name, label: persistenceUnit.label, unitsProvider, index: 0, onUnitChange: handleUnitChange, onLabelChange: handleUnitLabelChange }),
    ((_b2 = formatProps.composite) == null ? void 0 : _b2.units) && formatProps.composite.units.length > 1 && reactExports.createElement(
      reactExports.Fragment,
      null,
      reactExports.createElement("span", { key: "composite-spacer-label", className: "uicore-label" }, translate("QuantityFormat.labels.compositeSpacer")),
      reactExports.createElement(Input, { key: "composite-spacer", "data-testid": "composite-spacer", value: formatProps.composite.spacer ?? "", onChange: handleOnSpacerChange, size: "small" })
    )
  );
}
function SignOptionSelector(props) {
  const { signOption, onChange, disabled, id, ...rest } = props;
  const { translate } = useTranslation();
  const options = [
    {
      value: ShowSignOption.NoSign,
      label: translate("QuantityFormat.sign_option.noSign")
    },
    {
      value: ShowSignOption.OnlyNegative,
      label: translate("QuantityFormat.sign_option.onlyNegative")
    },
    {
      value: ShowSignOption.SignAlways,
      label: translate("QuantityFormat.sign_option.signAlways")
    },
    {
      value: ShowSignOption.NegativeParentheses,
      label: translate("QuantityFormat.sign_option.negativeParentheses")
    }
  ];
  const handleOnChange = reactExports.useCallback((newValue) => {
    onChange && onChange(newValue);
  }, [onChange]);
  return reactExports.createElement(Select, { options, value: signOption, onChange: handleOnChange, size: "small", disabled, id, ...rest });
}
function ThousandsSelector(props) {
  const { separator, disabled, onChange, id, ...rest } = props;
  const { translate } = useTranslation();
  const separatorOptions = reactExports.useMemo(() => {
    const uomDefaultEntries = [
      {
        value: ",",
        label: translate("QuantityFormat.thousand_separator.comma")
      },
      {
        value: ".",
        label: translate("QuantityFormat.thousand_separator.point")
      }
    ];
    const completeListOfEntries = [];
    if (void 0 === uomDefaultEntries.find((option) => option.value === separator)) {
      completeListOfEntries.push({ value: separator, label: separator });
    }
    completeListOfEntries.push(...uomDefaultEntries);
    return completeListOfEntries;
  }, [separator, translate]);
  return reactExports.createElement(Select, { options: separatorOptions, value: separator, size: "small", disabled, onChange, id, ...rest });
}
function ThousandsSeparator(props) {
  const { formatProps, onChange } = props;
  const { translate } = useTranslation();
  const useThousandsId = reactExports.useId();
  const thousandsSelectorId = reactExports.useId();
  const handleSetFormatProps = reactExports.useCallback((newProps) => {
    onChange && onChange(newProps);
  }, [onChange]);
  const setFormatTrait = reactExports.useCallback((trait, setActive) => {
    const traitStr = getTraitString(trait);
    let formatTraits = [traitStr];
    if (setActive) {
      if (formatProps.formatTraits) {
        const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
        formatTraits = [...traits, traitStr];
      }
    } else {
      if (formatProps.formatTraits) {
        const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
        formatTraits = traits.filter((traitEntry) => traitEntry !== traitStr);
      }
    }
    const newFormatProps = { ...formatProps, formatTraits };
    handleSetFormatProps(newFormatProps);
  }, [formatProps, handleSetFormatProps]);
  const handleUseThousandsSeparatorChange = reactExports.useCallback((e2) => {
    setFormatTrait(FormatTraits.Use1000Separator, e2.target.checked);
  }, [setFormatTrait]);
  const isFormatTraitSet = reactExports.useCallback((trait) => {
    return Format.isFormatTraitSetInProps(formatProps, trait);
  }, [formatProps]);
  const handleThousandSeparatorChange = reactExports.useCallback((thousandSeparator) => {
    let decimalSeparator = formatProps.decimalSeparator;
    if (isFormatTraitSet(FormatTraits.Use1000Separator)) {
      if (thousandSeparator === ".")
        decimalSeparator = ",";
      else
        decimalSeparator = ".";
    }
    const newFormatProps = {
      ...formatProps,
      thousandSeparator,
      decimalSeparator
    };
    handleSetFormatProps(newFormatProps);
  }, [formatProps, isFormatTraitSet, handleSetFormatProps]);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(Label, { className: "uicore-label", as: "div", displayStyle: "inline", id: useThousandsId }, translate("QuantityFormat.labels.useThousandSeparatorLabel")),
    reactExports.createElement(Checkbox, { "aria-labelledby": useThousandsId, checked: isFormatTraitSet(FormatTraits.Use1000Separator), onChange: handleUseThousandsSeparatorChange }),
    reactExports.createElement(Label, { className: classnames("uicore-label", !isFormatTraitSet(FormatTraits.Use1000Separator) && "uicore-disabled"), as: "div", displayStyle: "inline", id: thousandsSelectorId }, translate("QuantityFormat.labels.thousandSeparatorLabel")),
    reactExports.createElement(ThousandsSelector, { separator: formatProps.thousandSeparator ?? ",", disabled: !isFormatTraitSet(FormatTraits.Use1000Separator), onChange: handleThousandSeparatorChange, "aria-labelledby": thousandsSelectorId })
  );
}
function DecimalSeparatorSelector(props) {
  const { separator, onChange, ...rest } = props;
  const { translate } = useTranslation();
  const options = [
    {
      value: ".",
      label: translate("QuantityFormat.decimal_separator.point")
    },
    {
      value: ",",
      label: translate("QuantityFormat.decimal_separator.comma")
    }
  ];
  const handleOnChange = reactExports.useCallback((newValue) => {
    onChange && onChange(newValue);
  }, [onChange]);
  return reactExports.createElement(Select, { options, value: separator, onChange: handleOnChange, size: "small", ...rest });
}
function ScientificTypeSelector(props) {
  const { type, onChange, disabled, id, ...rest } = props;
  const { translate } = useTranslation();
  const formatOptions = [
    {
      value: ScientificType.Normalized,
      label: translate("QuantityFormat.scientific-type.normalized")
    },
    {
      value: ScientificType.ZeroNormalized,
      label: translate("QuantityFormat.scientific-type.zero-normalized")
    }
  ];
  const handleOnChange = reactExports.useCallback((newValue) => {
    onChange && onChange(newValue);
  }, [onChange]);
  return reactExports.createElement(Select, { options: formatOptions, value: type, onChange: handleOnChange, size: "small", disabled, id, ...rest });
}
function StationSeparatorSelector(props) {
  const { separator, disabled, onChange, id, ...rest } = props;
  const { translate } = useTranslation();
  const handleOnChange = reactExports.useCallback((newValue) => {
    onChange && onChange(newValue);
  }, [onChange]);
  const separatorOptions = reactExports.useMemo(() => {
    const uomDefaultEntries = [
      {
        value: "+",
        label: translate("QuantityFormat.station_separator.plus")
      },
      {
        value: "-",
        label: translate("QuantityFormat.station_separator.minus")
      },
      {
        value: " ",
        label: translate("QuantityFormat.station_separator.blank")
      },
      {
        value: "^",
        label: translate("QuantityFormat.station_separator.caret")
      }
    ];
    const completeListOfEntries = [];
    if (void 0 === uomDefaultEntries.find((option) => option.value === separator)) {
      completeListOfEntries.push({ value: separator, label: separator });
    }
    completeListOfEntries.push(...uomDefaultEntries);
    return completeListOfEntries;
  }, [separator, translate]);
  return reactExports.createElement(Select, { id, options: separatorOptions, disabled, value: separator, onChange: handleOnChange, size: "small", ...rest });
}
function StationSizeSelector(props) {
  const { value, disabled, onChange, id, ...rest } = props;
  const { translate } = useTranslation();
  const separatorOptions = [
    {
      value: 1,
      label: translate("QuantityFormat.station_size.one")
    },
    {
      value: 2,
      label: translate("QuantityFormat.station_size.two")
    },
    {
      value: 3,
      label: translate("QuantityFormat.station_size.three")
    },
    {
      value: 4,
      label: translate("QuantityFormat.station_size.four")
    }
  ];
  const handleOnChange = reactExports.useCallback((newValue) => {
    onChange && onChange(newValue);
  }, [onChange]);
  return reactExports.createElement(Select, { options: separatorOptions, disabled, value, onChange: handleOnChange, size: "small", id, ...rest });
}
function RatioTypeSelector(props) {
  const { type, onChange, disabled, ...rest } = props;
  const { translate } = useTranslation();
  const formatOptions = [
    {
      value: RatioType.NToOne,
      label: translate("QuantityFormat.ratio-type.n-to-one.label"),
      sublabel: translate("QuantityFormat.ratio-type.n-to-one.description")
    },
    {
      value: RatioType.OneToN,
      label: translate("QuantityFormat.ratio-type.one-to-n.label"),
      sublabel: translate("QuantityFormat.ratio-type.one-to-n.description")
    },
    {
      value: RatioType.UseGreatestCommonDivisor,
      label: translate("QuantityFormat.ratio-type.use-greatest-common-divisor.label"),
      sublabel: translate("QuantityFormat.ratio-type.use-greatest-common-divisor.description")
    },
    {
      value: RatioType.ValueBased,
      label: translate("QuantityFormat.ratio-type.value-based.label"),
      sublabel: translate("QuantityFormat.ratio-type.value-based.description")
    }
  ];
  const handleOnChange = reactExports.useCallback((newValue) => {
    onChange && onChange(newValue);
  }, [onChange]);
  return reactExports.createElement(Select, { options: formatOptions, value: type, onChange: handleOnChange, size: "small", disabled, menuStyle: { maxInlineSize: "60vw" }, ...rest });
}
function AzimuthOptions(props) {
  var _a2;
  const { formatProps, onChange, disabled } = props;
  const { translate } = useTranslation();
  const baseInputId = e.useId();
  const ccwCheckboxId = e.useId();
  const handleAzimuthBaseChange = e.useCallback((value) => {
    const newFormatProps = { ...formatProps, azimuthBase: value };
    onChange && onChange(newFormatProps);
  }, [formatProps, onChange]);
  const handleAzimuthCCWChange = e.useCallback((event) => {
    const newFormatProps = {
      ...formatProps,
      azimuthCounterClockwise: event.target.checked
    };
    onChange && onChange(newFormatProps);
  }, [formatProps, onChange]);
  const onKeyDown = (event) => {
    const isLetter = /^[a-zA-Z]$/.test(event.key);
    if (event.key === "," || isLetter) {
      event.preventDefault();
    }
  };
  const handleInputChange = e.useCallback((e2) => {
    const numValue = Number(e2.target.value);
    if (isNaN(numValue)) {
      e2.preventDefault();
      return;
    }
    handleAzimuthBaseChange(numValue);
  }, [handleAzimuthBaseChange]);
  return e.createElement(
    e.Fragment,
    null,
    e.createElement(
      Label,
      { className: classnames("uicore-label", disabled && "uicore-disabled"), id: ccwCheckboxId, as: "div", displayStyle: "inline" },
      translate("QuantityFormat.labels.azimuthCounterClockwise"),
      e.createElement(
        IconButton,
        { size: "small", styleType: "borderless", label: translate("QuantityFormat.azimuthType.ccwFlagTooltip") },
        e.createElement(SvgHelpCircularHollow, null)
      )
    ),
    e.createElement(Checkbox, { "aria-labelledby": ccwCheckboxId, checked: formatProps.azimuthCounterClockwise ?? false, onChange: handleAzimuthCCWChange, disabled }),
    e.createElement(
      Label,
      { id: baseInputId, className: classnames("uicore-label", disabled && "uicore-disabled"), as: "div", displayStyle: "inline" },
      translate("QuantityFormat.labels.azimuthBase"),
      e.createElement(
        IconButton,
        { size: "small", styleType: "borderless", label: translate("QuantityFormat.azimuthType.baseTooltip") },
        e.createElement(SvgHelpCircularHollow, null)
      )
    ),
    e.createElement(Input, { "aria-labelledby": baseInputId, type: "number", value: ((_a2 = formatProps.azimuthBase) == null ? void 0 : _a2.toString()) ?? "0", onKeyDown, onChange: handleInputChange, size: "small", disabled })
  );
}
function MiscFormatOptions(props) {
  const { formatProps, onChange, showOptions, onShowHideOptions, enableMinimumProperties } = props;
  const { translate } = useTranslation();
  const signOptionSelectorId = reactExports.useId();
  const stationSizeSelectorId = reactExports.useId();
  const stationSeparatorSelectorId = reactExports.useId();
  const decimalSeparatorSelectorId = reactExports.useId();
  const showTrailZerosId = reactExports.useId();
  const keepDecimalPointId = reactExports.useId();
  const keepSingleZeroId = reactExports.useId();
  const keepZeroEmptyId = reactExports.useId();
  const fractionDashId = reactExports.useId();
  const scientificTypeSelectorId = reactExports.useId();
  const ratioTypeSelectorId = reactExports.useId();
  const handleSetFormatProps = reactExports.useCallback((newFormatProps) => {
    onChange && onChange(newFormatProps);
  }, [onChange]);
  const isFormatTraitSet = reactExports.useCallback((trait) => {
    return Format.isFormatTraitSetInProps(formatProps, trait);
  }, [formatProps]);
  const handleShowSignChange = reactExports.useCallback((option) => {
    const newShowSignOption = option;
    const newFormatProps = {
      ...formatProps,
      showSignOption: newShowSignOption
    };
    handleSetFormatProps(newFormatProps);
  }, [formatProps, handleSetFormatProps]);
  const setFormatTrait = reactExports.useCallback((trait, setActive) => {
    const traitStr = getTraitString(trait);
    let formatTraits = [traitStr];
    if (setActive) {
      if (formatProps.formatTraits) {
        const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
        if (!traits.find((traitEntry) => traitStr === traitEntry)) {
          formatTraits = [...traits, traitStr];
        }
      }
    } else {
      if (!formatProps.formatTraits)
        return;
      const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
      formatTraits = traits.filter((traitEntry) => traitEntry !== traitStr);
    }
    const newFormatProps = { ...formatProps, formatTraits };
    handleSetFormatProps(newFormatProps);
  }, [formatProps, handleSetFormatProps]);
  const handleShowTrailingZeroesChange = reactExports.useCallback((e2) => {
    setFormatTrait(FormatTraits.TrailZeroes, e2.target.checked);
  }, [setFormatTrait]);
  const handleKeepDecimalPointChange = reactExports.useCallback((e2) => {
    setFormatTrait(FormatTraits.KeepDecimalPoint, e2.target.checked);
  }, [setFormatTrait]);
  const handleKeepSingleZeroChange = reactExports.useCallback((e2) => {
    setFormatTrait(FormatTraits.KeepSingleZero, e2.target.checked);
  }, [setFormatTrait]);
  const handleZeroEmptyChange = reactExports.useCallback((e2) => {
    setFormatTrait(FormatTraits.ZeroEmpty, e2.target.checked);
  }, [setFormatTrait]);
  const handleUseFractionDashChange = reactExports.useCallback((e2) => {
    setFormatTrait(FormatTraits.FractionDash, e2.target.checked);
  }, [setFormatTrait]);
  const handleDecimalSeparatorChange = reactExports.useCallback((decimalSeparator) => {
    let thousandSeparator = formatProps.thousandSeparator;
    if (isFormatTraitSet(FormatTraits.Use1000Separator)) {
      switch (decimalSeparator) {
        case ".":
          thousandSeparator = ",";
          break;
        case ",":
          thousandSeparator = ".";
          break;
      }
    }
    const newFormatProps = {
      ...formatProps,
      thousandSeparator,
      decimalSeparator
    };
    handleSetFormatProps(newFormatProps);
  }, [formatProps, isFormatTraitSet, handleSetFormatProps]);
  const handleScientificTypeChange = reactExports.useCallback((type) => {
    const newFormatProps = {
      ...formatProps,
      scientificType: type
    };
    handleSetFormatProps(newFormatProps);
  }, [formatProps, handleSetFormatProps]);
  const handleRatioTypeChange = reactExports.useCallback((type) => {
    const newFormatProps = {
      ...formatProps,
      ratioType: parseRatioType(type, "format")
    };
    handleSetFormatProps(newFormatProps);
  }, [formatProps, handleSetFormatProps]);
  const handleFormatChange = reactExports.useCallback((newFormatProps) => {
    handleSetFormatProps(newFormatProps);
  }, [handleSetFormatProps]);
  const formatType = reactExports.useMemo(() => parseFormatType(formatProps.type, "format"), [formatProps.type]);
  const showSignOption = reactExports.useMemo(() => parseShowSignOption(formatProps.showSignOption ?? "onlyNegative", "format"), [formatProps.showSignOption]);
  const handleToggleButtonClick = reactExports.useCallback(() => {
    onShowHideOptions(!showOptions);
  }, [onShowHideOptions, showOptions]);
  const handleKeyUpOnLink = reactExports.useCallback((e2) => {
    if (e2.key === Key_enumExports.Key.Enter.valueOf() || e2.key === " ") {
      onShowHideOptions(!showOptions);
      e2.preventDefault();
    }
  }, [onShowHideOptions, showOptions]);
  const handleStationSeparatorChange = reactExports.useCallback((value) => {
    const newFormatProps = { ...formatProps, stationSeparator: value };
    handleSetFormatProps(newFormatProps);
  }, [formatProps, handleSetFormatProps]);
  const handleStationOffsetChange = reactExports.useCallback((value) => {
    const newFormatProps = { ...formatProps, stationOffsetSize: value };
    handleSetFormatProps(newFormatProps);
  }, [formatProps, handleSetFormatProps]);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    enableMinimumProperties && !showOptions && reactExports.createElement("a", { onClick: handleToggleButtonClick, onKeyUp: handleKeyUpOnLink, className: "components-quantityFormat-more-less", role: "link", tabIndex: 0 }, translate("QuantityFormat.labels.moreLabel")),
    (!enableMinimumProperties || showOptions) && reactExports.createElement(
      reactExports.Fragment,
      null,
      reactExports.createElement(Label, { className: "uicore-label", id: signOptionSelectorId, as: "div", displayStyle: "inline" }, translate("QuantityFormat.labels.signOptionLabel")),
      reactExports.createElement(SignOptionSelector, { "aria-labelledby": signOptionSelectorId, signOption: showSignOption, onChange: handleShowSignChange }),
      reactExports.createElement(Label, { className: classnames("uicore-label", formatType !== FormatType.Station && "uicore-disabled"), as: "div", displayStyle: "inline", id: stationSizeSelectorId }, translate("QuantityFormat.labels.stationOffsetLabel")),
      reactExports.createElement(StationSizeSelector, { "aria-labelledby": stationSizeSelectorId, value: formatProps.stationOffsetSize ?? 2, disabled: formatType !== FormatType.Station, onChange: handleStationOffsetChange }),
      reactExports.createElement(Label, { className: classnames("uicore-label", formatType !== FormatType.Station && "uicore-disabled"), as: "div", displayStyle: "inline", id: stationSeparatorSelectorId }, translate("QuantityFormat.labels.stationSeparatorLabel")),
      reactExports.createElement(StationSeparatorSelector, { "aria-labelledby": stationSeparatorSelectorId, separator: void 0 !== formatProps.stationSeparator ? formatProps.stationSeparator : "+", disabled: formatType !== FormatType.Station, onChange: handleStationSeparatorChange }),
      reactExports.createElement(ThousandsSeparator, { formatProps, onChange: handleFormatChange }),
      reactExports.createElement(Label, { className: classnames("uicore-label", formatType === FormatType.Fractional && "uicore-disabled"), as: "div", displayStyle: "inline", id: decimalSeparatorSelectorId }, translate("QuantityFormat.labels.decimalSeparatorLabel")),
      reactExports.createElement(DecimalSeparatorSelector, { "aria-labelledby": decimalSeparatorSelectorId, separator: formatProps.decimalSeparator ?? ".", onChange: handleDecimalSeparatorChange, disabled: formatType === FormatType.Fractional }),
      reactExports.createElement(Label, { className: "uicore-label", as: "div", displayStyle: "inline", id: showTrailZerosId }, translate("QuantityFormat.labels.showTrailZerosLabel")),
      reactExports.createElement(Checkbox, { "aria-labelledby": showTrailZerosId, checked: isFormatTraitSet(FormatTraits.TrailZeroes), onChange: handleShowTrailingZeroesChange }),
      reactExports.createElement(Label, { className: classnames("uicore-label", formatType === FormatType.Fractional && "uicore-disabled"), as: "div", displayStyle: "inline", id: keepDecimalPointId }, translate("QuantityFormat.labels.keepDecimalPointLabel")),
      reactExports.createElement(Checkbox, { "aria-labelledby": keepDecimalPointId, checked: isFormatTraitSet(FormatTraits.KeepDecimalPoint), onChange: handleKeepDecimalPointChange }),
      reactExports.createElement(Label, { className: "uicore-label", as: "div", displayStyle: "inline", id: keepSingleZeroId }, translate("QuantityFormat.labels.keepSingleZeroLabel")),
      reactExports.createElement(Checkbox, { "aria-labelledby": keepSingleZeroId, checked: isFormatTraitSet(FormatTraits.KeepSingleZero), onChange: handleKeepSingleZeroChange }),
      reactExports.createElement(Label, { className: "uicore-label", as: "div", displayStyle: "inline", id: keepZeroEmptyId }, translate("QuantityFormat.labels.zeroEmptyLabel")),
      reactExports.createElement(Checkbox, { "aria-labelledby": keepZeroEmptyId, checked: isFormatTraitSet(FormatTraits.ZeroEmpty), onChange: handleZeroEmptyChange }),
      reactExports.createElement(Label, { className: classnames("uicore-label", formatType !== FormatType.Fractional && "uicore-disabled"), as: "div", displayStyle: "inline", id: fractionDashId }, translate("QuantityFormat.labels.fractionDashLabel")),
      reactExports.createElement(Checkbox, { "aria-labelledby": fractionDashId, checked: isFormatTraitSet(FormatTraits.FractionDash), onChange: handleUseFractionDashChange, disabled: formatType !== FormatType.Fractional }),
      reactExports.createElement(Label, { className: classnames("uicore-label", formatType !== FormatType.Scientific && "uicore-disabled"), as: "div", displayStyle: "inline", id: scientificTypeSelectorId }, translate("QuantityFormat.labels.scientificTypeLabel")),
      reactExports.createElement(ScientificTypeSelector, { type: formatProps.scientificType && formatProps.scientificType.length > 0 ? parseScientificType(formatProps.scientificType, "custom") : ScientificType.Normalized, "aria-labelledby": scientificTypeSelectorId, disabled: formatType !== FormatType.Scientific, onChange: handleScientificTypeChange }),
      reactExports.createElement(
        Label,
        { className: classnames("uicore-label", formatType !== FormatType.Ratio && "uicore-disabled"), id: ratioTypeSelectorId },
        translate("QuantityFormat.labels.ratioTypeLabel"),
        reactExports.createElement(
          IconButton,
          { size: "small", styleType: "borderless", label: translate("QuantityFormat.ratio-type.default.description") },
          reactExports.createElement(SvgHelpCircularHollow, null)
        )
      ),
      reactExports.createElement(RatioTypeSelector, { type: formatProps.ratioType && formatProps.ratioType.length > 0 ? parseRatioType(formatProps.ratioType, "custom") : RatioType.NToOne, disabled: formatType !== FormatType.Ratio, onChange: handleRatioTypeChange, "aria-labelledby": ratioTypeSelectorId }),
      reactExports.createElement(AzimuthOptions, { formatProps, onChange: handleFormatChange, disabled: formatType !== FormatType.Azimuth }),
      props.children,
      enableMinimumProperties && showOptions && reactExports.createElement("a", { onClick: handleToggleButtonClick, onKeyUp: handleKeyUpOnLink, className: "components-quantityFormat-more-less", role: "link", tabIndex: 0 }, translate("QuantityFormat.labels.lessLabel"))
    )
  );
}
async function generateFormatSpec(formatProps, persistenceUnit, unitsProvider) {
  const actualFormat = await Format.createFromJSON("custom", unitsProvider, formatProps);
  return FormatterSpec.create(actualFormat.name, actualFormat, unitsProvider, persistenceUnit);
}
function FormatPanel(props) {
  const [formatSpec, setFormatSpec] = reactExports.useState();
  const { initialFormat, showSample, initialMagnitude, unitsProvider, persistenceUnit, onFormatChange, provideFormatSpec, enableMinimumProperties } = props;
  const [formatProps, setFormatProps] = reactExports.useState(initialFormat);
  const [showOptions, setShowOptions] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setFormatProps(initialFormat);
    setFormatSpec(void 0);
  }, [initialFormat]);
  const handleUserFormatChanges = reactExports.useCallback((newProps) => {
    setFormatProps(newProps);
    setFormatSpec(void 0);
    onFormatChange && onFormatChange(newProps);
  }, [onFormatChange]);
  const isMounted = reactExports.useRef(false);
  reactExports.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  reactExports.useEffect(() => {
    async function fetchFormatSpec() {
      if (!persistenceUnit)
        return;
      const pu = await persistenceUnit;
      let newFormatSpec;
      if (provideFormatSpec) {
        newFormatSpec = await provideFormatSpec(formatProps, pu, unitsProvider);
      } else {
        newFormatSpec = await generateFormatSpec(formatProps, pu, unitsProvider);
      }
      isMounted.current && setFormatSpec(newFormatSpec);
    }
    if (!formatSpec)
      void fetchFormatSpec();
  }, [
    formatProps,
    formatSpec,
    persistenceUnit,
    provideFormatSpec,
    unitsProvider
  ]);
  const handleFormatChange = reactExports.useCallback((newFormatProps) => {
    handleUserFormatChanges(newFormatProps);
  }, [handleUserFormatChanges]);
  const handleShowOptions = reactExports.useCallback((show) => {
    setShowOptions(show);
  }, []);
  return reactExports.createElement(
    "div",
    { className: "components-quantityFormat-panel" },
    showSample && reactExports.createElement(FormatSample, { formatSpec, initialMagnitude }),
    reactExports.createElement(FormatUnits, { unitsProvider, persistenceUnit: formatSpec == null ? void 0 : formatSpec.persistenceUnit, initialFormat: formatProps, onUnitsChange: handleFormatChange }),
    reactExports.createElement(FormatUnitLabel, { formatProps, onUnitLabelChange: handleFormatChange }),
    reactExports.createElement(FormatTypeOption, { formatProps, onChange: handleFormatChange }),
    reactExports.createElement(FormatPrecision, { formatProps, onChange: handleFormatChange }),
    props.providePrimaryChildren && props.providePrimaryChildren(formatProps, handleFormatChange),
    reactExports.createElement(MiscFormatOptions, { formatProps, onChange: handleFormatChange, enableMinimumProperties, showOptions, onShowHideOptions: handleShowOptions }, props.provideSecondaryChildren && props.provideSecondaryChildren(formatProps, handleFormatChange))
  );
}
async function getUnitConversionData(possibleUnits, toUnit, unitsProvider) {
  const unitConversionEntries = possibleUnits.map(async (unit) => {
    const conversion = await unitsProvider.getConversion(unit, toUnit);
    return { conversion, unitProps: unit };
  });
  return unitConversionEntries;
}
async function getPossibleUnits(parentUnit, unitsProvider, ensureCompatibleComposite) {
  const phenomenon = parentUnit.phenomenon;
  const possibleUnits = await unitsProvider.getUnitsByFamily(phenomenon);
  if (!ensureCompatibleComposite)
    return possibleUnits;
  const conversionPromises = await getUnitConversionData(possibleUnits, parentUnit, unitsProvider);
  const conversionEntries = await Promise.all(conversionPromises);
  return conversionEntries.filter((entry) => entry.unitProps.system === parentUnit.system && entry.conversion.factor < 1).sort((a, b) => b.conversion.factor - a.conversion.factor).map((value) => value.unitProps);
}
function UnitDescrV2(props) {
  const { name, label, parentUnitName, index, onUnitChange, onLabelChange, readonly, unitsProvider } = props;
  const { translate } = useTranslation();
  const [unitOptions, setUnitOptions] = reactExports.useState([
    { value: `${name}:${label}`, label: getUnitName(name) }
  ]);
  const [currentUnit, setCurrentUnit] = reactExports.useState({ name, label });
  const unitSelectorId = reactExports.useId();
  const labelInputId = reactExports.useId();
  const isMounted = reactExports.useRef(false);
  reactExports.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  reactExports.useEffect(() => {
    async function fetchAllowableUnitSelections() {
      try {
        const currentUnitProps = await unitsProvider.findUnitByName(name);
        const parentUnit = await unitsProvider.findUnitByName(parentUnitName ? parentUnitName : name);
        if (parentUnit && currentUnitProps) {
          let potentialSubUnit;
          const potentialUnits = await getPossibleUnits(parentUnit, unitsProvider, index !== 0);
          if (index < 3) {
            const potentialSubUnits = await getPossibleUnits(currentUnitProps, unitsProvider, true);
            if (potentialSubUnits.length)
              potentialSubUnit = potentialSubUnits[0];
          }
          const options = potentialUnits.length > 0 ? potentialUnits.map((unitValue) => {
            return {
              value: `${unitValue.name}:${unitValue.label}`,
              label: getUnitName(unitValue.name)
            };
          }).sort((a, b) => a.label.localeCompare(b.label)) : [
            {
              value: `${currentUnitProps.name}:${currentUnitProps.label}`,
              label: getUnitName(name)
            }
          ];
          if (potentialSubUnit) {
            options.push({
              value: `ADDSUBUNIT:${potentialSubUnit.name}:${potentialSubUnit.label}`,
              label: translate("QuantityFormat.labels.addSubUnit")
            });
          }
          if (index !== 0) {
            options.push({
              value: "REMOVEUNIT",
              label: translate("QuantityFormat.labels.removeUnit")
            });
          }
          if (isMounted.current) {
            setUnitOptions(options);
            setCurrentUnit(currentUnitProps);
          }
        }
      } catch (error) {
        console.warn("Failed to load unit options:", error);
        if (isMounted.current) {
          setUnitOptions([
            { value: `${name}:${label}`, label: getUnitName(name) }
          ]);
        }
      }
    }
    void fetchAllowableUnitSelections();
  }, [index, label, name, parentUnitName, translate, unitsProvider]);
  const handleOnUnitChange = reactExports.useCallback((newValue) => {
    onUnitChange && onUnitChange(newValue, index);
  }, [index, onUnitChange]);
  const handleOnLabelChange = reactExports.useCallback((e2) => {
    e2.preventDefault();
    onLabelChange && onLabelChange(e2.target.value, index);
  }, [index, onLabelChange]);
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatInlineRow" },
    reactExports.createElement(Select, { id: unitSelectorId, options: unitOptions, "data-testid": `unit-${currentUnit.name}`, value: `${currentUnit.name}:${currentUnit.label}`, onChange: handleOnUnitChange, disabled: readonly, size: "small", className: "icr-quantityFormat-v2-unitSelect" }),
    reactExports.createElement(Input, { id: labelInputId, "data-testid": `unit-label-${currentUnit.name}`, value: label, onChange: handleOnLabelChange, size: "small", disabled: readonly, className: "icr-quantityFormat-v2-unitInput" })
  );
}
function FormatUnitsV2(props) {
  var _a2, _b2;
  const { initialFormat, persistenceUnit, unitsProvider, onUnitsChange } = props;
  const { translate } = useTranslation();
  const initialFormatRef = reactExports.useRef(initialFormat);
  const [formatProps, setFormatProps] = reactExports.useState(initialFormat);
  const compositeSpacerSelectorId = reactExports.useId();
  reactExports.useEffect(() => {
    if (initialFormatRef.current !== initialFormat) {
      initialFormatRef.current = initialFormat;
      setFormatProps(initialFormat);
    }
  }, [initialFormat]);
  const handleSetFormatProps = reactExports.useCallback((newProps) => {
    setFormatProps(newProps);
    onUnitsChange && onUnitsChange(newProps);
  }, [onUnitsChange]);
  const handleUnitLabelChange = reactExports.useCallback((newLabel, index) => {
    if (formatProps.composite && formatProps.composite.units.length > index && index >= 0) {
      const units = formatProps.composite.units.map((entry, ndx) => {
        if (index === ndx)
          return { name: entry.name, label: newLabel };
        else
          return entry;
      });
      const composite = { ...formatProps.composite, units };
      const newFormatProps = { ...formatProps, composite };
      handleSetFormatProps(newFormatProps);
    }
  }, [formatProps, handleSetFormatProps]);
  const handleUnitChange = reactExports.useCallback((newUnit, index) => {
    const unitParts = newUnit.split(/:/);
    if (unitParts[0] === "REMOVEUNIT") {
      if (formatProps.composite && formatProps.composite.units.length > 1) {
        const units = [...formatProps.composite.units];
        units.pop();
        const composite = { ...formatProps.composite, units };
        const newFormatProps = { ...formatProps, composite };
        handleSetFormatProps(newFormatProps);
      }
    } else if (unitParts[0] === "ADDSUBUNIT") {
      const units = formatProps.composite && formatProps.composite.units.length ? [
        ...formatProps.composite.units,
        { name: unitParts[1], label: unitParts[2] }
      ] : [{ name: unitParts[1], label: unitParts[2] }];
      const composite = { ...formatProps.composite, units };
      const newFormatProps = { ...formatProps, composite };
      handleSetFormatProps(newFormatProps);
    } else {
      if (formatProps.composite && formatProps.composite.units.length > index && index >= 0) {
        const units = formatProps.composite.units.map((entry, ndx) => {
          if (index === ndx)
            return { name: unitParts[0], label: unitParts[1] };
          else
            return entry;
        });
        const composite = { ...formatProps.composite, units };
        const newFormatProps = { ...formatProps, composite };
        handleSetFormatProps(newFormatProps);
      } else if (!formatProps.composite) {
        const composite = {
          units: [{ name: unitParts[0], label: unitParts[1] }]
        };
        const newFormatProps = { ...formatProps, composite };
        handleSetFormatProps(newFormatProps);
      }
    }
  }, [formatProps, handleSetFormatProps]);
  const handleOnSpacerChange = reactExports.useCallback((e2) => {
    if (formatProps.composite) {
      const spacerValue = e2.target.value.length ? e2.target.value[0] : "";
      const composite = { ...formatProps.composite, spacer: spacerValue };
      const newFormatProps = { ...formatProps, composite };
      handleSetFormatProps(newFormatProps);
    }
  }, [formatProps, handleSetFormatProps]);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    ((_a2 = formatProps.composite) == null ? void 0 : _a2.units) ? formatProps.composite.units.map((value, index) => reactExports.createElement(UnitDescrV2, { key: value.name, name: value.name, label: value.label ?? "", parentUnitName: index > 0 ? formatProps.composite.units[index - 1].name : void 0, unitsProvider, index, onUnitChange: handleUnitChange, onLabelChange: handleUnitLabelChange, readonly: index < formatProps.composite.units.length - 1 })) : persistenceUnit && reactExports.createElement(UnitDescrV2, { key: persistenceUnit.name, name: persistenceUnit.name, label: persistenceUnit.label, unitsProvider, index: 0, onUnitChange: handleUnitChange, onLabelChange: handleUnitLabelChange }),
    ((_b2 = formatProps.composite) == null ? void 0 : _b2.units) && formatProps.composite.units.length > 1 && reactExports.createElement(
      "div",
      { className: "icr-quantityFormat-v2-formatInlineRow" },
      reactExports.createElement(
        Label,
        { displayStyle: "inline", htmlFor: compositeSpacerSelectorId },
        translate("QuantityFormat.labels.compositeSpacer"),
        reactExports.createElement(
          IconButton,
          { className: "format-help-tooltip", size: "small", styleType: "borderless", label: translate("QuantityFormat.labels.compositeSpacerDescription") },
          reactExports.createElement(SvgHelpCircularHollow, null)
        )
      ),
      reactExports.createElement(Input, { id: compositeSpacerSelectorId, value: formatProps.composite.spacer ?? "", onChange: handleOnSpacerChange, size: "small" })
    )
  );
}
function UomSeparatorSelectorV2(props) {
  const { formatProps, onFormatChange, ...rest } = props;
  const { translate } = useTranslation();
  const handleOnChange = reactExports.useCallback((value) => {
    const newFormatProps = { ...formatProps, uomSeparator: value };
    onFormatChange && onFormatChange(newFormatProps);
  }, [formatProps, onFormatChange]);
  const separatorOptions = reactExports.useMemo(() => {
    const uomDefaultEntries = [
      { value: "", label: translate("QuantityFormat.none") },
      { value: " ", label: translate("QuantityFormat.space") },
      { value: "-", label: translate("QuantityFormat.dash") }
    ];
    const completeListOfEntries = [];
    const separator = formatProps.uomSeparator ?? "";
    if (separator.length > 0) {
      if (void 0 === uomDefaultEntries.find((option) => option.value === separator)) {
        completeListOfEntries.push({ value: separator, label: separator });
      }
    }
    completeListOfEntries.push(...uomDefaultEntries);
    return completeListOfEntries;
  }, [formatProps.uomSeparator, translate]);
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatInlineRow" },
    reactExports.createElement(LabeledSelect, { label: translate("QuantityFormat.labels.labelSeparator"), options: separatorOptions, value: formatProps.uomSeparator ?? "", onChange: handleOnChange, size: "small", displayStyle: "inline", ...rest })
  );
}
function AppendUnitLabelV2(props) {
  const { formatProps, onFormatChange } = props;
  const { translate } = useTranslation();
  const appendUnitLabelId = reactExports.useId();
  const setFormatTrait = reactExports.useCallback((trait, setActive) => {
    if (setActive) {
      const newFormatProps = {
        ...formatProps,
        formatTraits: formatProps.formatTraits ? [...formatProps.formatTraits, getTraitString(trait)] : [getTraitString(trait)]
      };
      onFormatChange && onFormatChange(newFormatProps);
    } else {
      const formatTraits = formatProps.formatTraits;
      if (Array.isArray(formatTraits)) {
        const newFormatProps = {
          ...formatProps,
          formatTraits: formatTraits.filter((entry) => entry !== getTraitString(trait))
        };
        onFormatChange && onFormatChange(newFormatProps);
      } else {
        const newFormatProps = { ...formatProps, formatTraits: [] };
        onFormatChange && onFormatChange(newFormatProps);
      }
    }
  }, [formatProps, onFormatChange]);
  const isFormatTraitSet = reactExports.useCallback((trait) => {
    return Format.isFormatTraitSetInProps(formatProps, trait);
  }, [formatProps]);
  const handleShowUnitLabelChange = reactExports.useCallback((e2) => {
    setFormatTrait(FormatTraits.ShowUnitLabel, e2.target.checked);
  }, [setFormatTrait]);
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatInlineRow icr-quantityFormat-v2-appendUnitLabel" },
    reactExports.createElement(Label, { htmlFor: appendUnitLabelId }, translate("QuantityFormat.labels.appendUnitLabel")),
    reactExports.createElement(Checkbox, { id: appendUnitLabelId, checked: isFormatTraitSet(FormatTraits.ShowUnitLabel), onChange: handleShowUnitLabelChange })
  );
}
function FormatPrecisionV2(props) {
  const { formatProps, onChange } = props;
  const { translate } = useTranslation();
  const precisionSelectorId = reactExports.useId();
  const handlePrecisionChange = reactExports.useCallback((precision) => {
    const newFormatProps = { ...formatProps, precision };
    onChange && onChange(newFormatProps);
  }, [formatProps, onChange]);
  const formatType = parseFormatType(formatProps.type, "format");
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatInlineRow" },
    reactExports.createElement(Label, { displayStyle: "inline", id: precisionSelectorId }, translate("QuantityFormat.labels.precision")),
    formatType === FormatType.Fractional ? reactExports.createElement(FractionPrecisionSelector, { precision: formatProps.precision ?? 0, onChange: handlePrecisionChange, "aria-labelledby": precisionSelectorId }) : reactExports.createElement(DecimalPrecisionSelector, { precision: formatProps.precision ?? 0, onChange: handlePrecisionChange, "aria-labelledby": precisionSelectorId })
  );
}
function DecimalSeparatorV2(props) {
  const { formatProps, onChange } = props;
  const { translate } = useTranslation();
  const decimalSeparatorSelectorId = reactExports.useId();
  const handleSetFormatProps = reactExports.useCallback((newProps) => {
    onChange && onChange(newProps);
  }, [onChange]);
  const handleDecimalSeparatorChange = reactExports.useCallback((decimalSeparator) => {
    let thousandSeparator = formatProps.thousandSeparator;
    if (Format.isFormatTraitSetInProps(formatProps, FormatTraits.Use1000Separator)) {
      switch (decimalSeparator) {
        case ".":
          thousandSeparator = ",";
          break;
        case ",":
          thousandSeparator = ".";
          break;
      }
    }
    const newFormatProps = {
      ...formatProps,
      thousandSeparator,
      decimalSeparator
    };
    handleSetFormatProps(newFormatProps);
  }, [formatProps, handleSetFormatProps]);
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatInlineRow" },
    reactExports.createElement(Label, { displayStyle: "inline", id: decimalSeparatorSelectorId }, translate("QuantityFormat.labels.decimalSeparatorLabel")),
    reactExports.createElement(DecimalSeparatorSelector, { separator: formatProps.decimalSeparator ?? ".", onChange: handleDecimalSeparatorChange, "aria-labelledby": decimalSeparatorSelectorId })
  );
}
function ShowTrailingZerosV2(props) {
  const { formatProps, onChange, disabled = false } = props;
  const { translate } = useTranslation();
  const showTrailZerosId = reactExports.useId();
  const setFormatTrait = reactExports.useCallback((trait, setActive) => {
    const traitStr = getTraitString(trait);
    let formatTraits = [traitStr];
    if (setActive) {
      if (formatProps.formatTraits) {
        const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
        if (!traits.find((traitEntry) => traitStr === traitEntry)) {
          formatTraits = [...traits, traitStr];
        }
      }
    } else {
      if (!formatProps.formatTraits)
        return;
      const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
      formatTraits = traits.filter((traitEntry) => traitEntry !== traitStr);
    }
    const newFormatProps = { ...formatProps, formatTraits };
    onChange && onChange(newFormatProps);
  }, [formatProps, onChange]);
  const handleShowTrailingZeroesChange = reactExports.useCallback((e2) => {
    setFormatTrait(FormatTraits.TrailZeroes, e2.target.checked);
  }, [setFormatTrait]);
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatInlineRow" },
    reactExports.createElement(Label, { displayStyle: "inline", htmlFor: showTrailZerosId }, translate("QuantityFormat.labels.showTrailZerosLabel")),
    reactExports.createElement(Checkbox, { id: showTrailZerosId, checked: Format.isFormatTraitSetInProps(formatProps, FormatTraits.TrailZeroes), onChange: handleShowTrailingZeroesChange, disabled })
  );
}
function SignOptionV2(props) {
  const { formatProps, onChange, disabled = false } = props;
  const { translate } = useTranslation();
  const showSignOptionId = reactExports.useId();
  const showSignOption = reactExports.useMemo(() => parseShowSignOption(formatProps.showSignOption ?? "onlyNegative", "format"), [formatProps.showSignOption]);
  const handleShowSignOptionChange = reactExports.useCallback((value) => {
    const newFormatProps = { ...formatProps, showSignOption: value };
    onChange && onChange(newFormatProps);
  }, [formatProps, onChange]);
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatInlineRow" },
    reactExports.createElement(
      Label,
      { displayStyle: "inline", id: showSignOptionId },
      translate("QuantityFormat.labels.signOptionLabel"),
      reactExports.createElement(
        IconButton,
        { className: "icr-quantityFormat-v2-formatHelpTooltip", styleType: "borderless", size: "small", label: translate("QuantityFormat.labels.signOptionTooltip") },
        reactExports.createElement(SvgHelpCircularHollow, null)
      )
    ),
    reactExports.createElement(SignOptionSelector, { "aria-labelledby": showSignOptionId, signOption: showSignOption, disabled, onChange: handleShowSignOptionChange })
  );
}
function KeepDecimalPointV2(props) {
  const { formatProps, onChange, disabled } = props;
  const { translate } = useTranslation();
  const keepDecimalPointId = reactExports.useId();
  const setFormatTrait = reactExports.useCallback((trait, setActive) => {
    const traitStr = getTraitString(trait);
    let formatTraits = [traitStr];
    if (setActive) {
      if (formatProps.formatTraits) {
        const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
        if (!traits.find((traitEntry) => traitStr === traitEntry)) {
          formatTraits = [...traits, traitStr];
        }
      }
    } else {
      if (!formatProps.formatTraits)
        return;
      const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
      formatTraits = traits.filter((traitEntry) => traitEntry !== traitStr);
    }
    const newFormatProps = { ...formatProps, formatTraits };
    onChange && onChange(newFormatProps);
  }, [formatProps, onChange]);
  const handleKeepDecimalPointChange = reactExports.useCallback((e2) => {
    setFormatTrait(FormatTraits.KeepDecimalPoint, e2.target.checked);
  }, [setFormatTrait]);
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatInlineRow" },
    reactExports.createElement(Label, { displayStyle: "inline", htmlFor: keepDecimalPointId }, translate("QuantityFormat.labels.keepDecimalPointLabel")),
    reactExports.createElement(Checkbox, { id: keepDecimalPointId, checked: Format.isFormatTraitSetInProps(formatProps, FormatTraits.KeepDecimalPoint), onChange: handleKeepDecimalPointChange, disabled })
  );
}
function KeepSingleZeroV2(props) {
  const { formatProps, onChange, disabled } = props;
  const { translate } = useTranslation();
  const keepSingleZeroId = reactExports.useId();
  const setFormatTrait = reactExports.useCallback((trait, setActive) => {
    const traitStr = getTraitString(trait);
    let formatTraits = [traitStr];
    if (setActive) {
      if (formatProps.formatTraits) {
        const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
        if (!traits.find((traitEntry) => traitStr === traitEntry)) {
          formatTraits = [...traits, traitStr];
        }
      }
    } else {
      if (!formatProps.formatTraits)
        return;
      const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
      formatTraits = traits.filter((traitEntry) => traitEntry !== traitStr);
    }
    const newFormatProps = { ...formatProps, formatTraits };
    onChange && onChange(newFormatProps);
  }, [formatProps, onChange]);
  const handleKeepSingleZeroChange = reactExports.useCallback((e2) => {
    setFormatTrait(FormatTraits.KeepSingleZero, e2.target.checked);
  }, [setFormatTrait]);
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatInlineRow" },
    reactExports.createElement(Label, { displayStyle: "inline", htmlFor: keepSingleZeroId }, translate("QuantityFormat.labels.keepSingleZeroLabel")),
    reactExports.createElement(Checkbox, { id: keepSingleZeroId, checked: Format.isFormatTraitSetInProps(formatProps, FormatTraits.KeepSingleZero), onChange: handleKeepSingleZeroChange, disabled })
  );
}
function ZeroEmptyV2(props) {
  const { formatProps, onChange, disabled } = props;
  const { translate } = useTranslation();
  const zeroEmptyId = reactExports.useId();
  const setFormatTrait = reactExports.useCallback((trait, setActive) => {
    const traitStr = getTraitString(trait);
    let formatTraits = [traitStr];
    if (setActive) {
      if (formatProps.formatTraits) {
        const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
        if (!traits.find((traitEntry) => traitStr === traitEntry)) {
          formatTraits = [...traits, traitStr];
        }
      }
    } else {
      if (!formatProps.formatTraits)
        return;
      const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
      formatTraits = traits.filter((traitEntry) => traitEntry !== traitStr);
    }
    const newFormatProps = { ...formatProps, formatTraits };
    onChange && onChange(newFormatProps);
  }, [formatProps, onChange]);
  const handleZeroEmptyChange = reactExports.useCallback((e2) => {
    setFormatTrait(FormatTraits.ZeroEmpty, e2.target.checked);
  }, [setFormatTrait]);
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatInlineRow" },
    reactExports.createElement(Label, { displayStyle: "inline", htmlFor: zeroEmptyId }, translate("QuantityFormat.labels.zeroEmptyLabel")),
    reactExports.createElement(Checkbox, { id: zeroEmptyId, checked: Format.isFormatTraitSetInProps(formatProps, FormatTraits.ZeroEmpty), onChange: handleZeroEmptyChange, disabled })
  );
}
function UseThousandsSeparator(props) {
  const { formatProps, onChange } = props;
  const { translate } = useTranslation();
  const useThousandsId = reactExports.useId();
  const handleSetFormatProps = reactExports.useCallback((newProps) => {
    onChange && onChange(newProps);
  }, [onChange]);
  const setFormatTrait = reactExports.useCallback((trait, setActive) => {
    const traitStr = getTraitString(trait);
    let formatTraits = [traitStr];
    if (setActive) {
      if (formatProps.formatTraits) {
        const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
        formatTraits = [...traits, traitStr];
      }
    } else {
      if (formatProps.formatTraits) {
        const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
        formatTraits = traits.filter((traitEntry) => traitEntry !== traitStr);
      }
    }
    const newFormatProps = { ...formatProps, formatTraits };
    handleSetFormatProps(newFormatProps);
  }, [formatProps, handleSetFormatProps]);
  const handleUseThousandsSeparatorChange = reactExports.useCallback((e2) => {
    setFormatTrait(FormatTraits.Use1000Separator, e2.target.checked);
  }, [setFormatTrait]);
  const isFormatTraitSet = reactExports.useCallback((trait) => {
    return Format.isFormatTraitSetInProps(formatProps, trait);
  }, [formatProps]);
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatInlineRow" },
    reactExports.createElement(Label, { displayStyle: "inline", htmlFor: useThousandsId }, translate("QuantityFormat.labels.useThousandSeparatorLabel")),
    reactExports.createElement(Checkbox, { id: useThousandsId, checked: isFormatTraitSet(FormatTraits.Use1000Separator), onChange: handleUseThousandsSeparatorChange })
  );
}
function ThousandsSeparatorSelector(props) {
  const { formatProps, onChange } = props;
  const { translate } = useTranslation();
  const thousandsSelectorId = reactExports.useId();
  const handleSetFormatProps = reactExports.useCallback((newProps) => {
    onChange && onChange(newProps);
  }, [onChange]);
  const isFormatTraitSet = reactExports.useCallback((trait) => {
    return Format.isFormatTraitSetInProps(formatProps, trait);
  }, [formatProps]);
  const handleThousandSeparatorChange = reactExports.useCallback((thousandSeparator) => {
    let decimalSeparator = formatProps.decimalSeparator;
    if (isFormatTraitSet(FormatTraits.Use1000Separator)) {
      if (thousandSeparator === ".")
        decimalSeparator = ",";
      else
        decimalSeparator = ".";
    }
    const newFormatProps = {
      ...formatProps,
      thousandSeparator,
      decimalSeparator
    };
    handleSetFormatProps(newFormatProps);
  }, [formatProps, isFormatTraitSet, handleSetFormatProps]);
  if (!isFormatTraitSet(FormatTraits.Use1000Separator)) {
    return null;
  }
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatInlineRow" },
    reactExports.createElement(Label, { displayStyle: "inline", htmlFor: thousandsSelectorId }, translate("QuantityFormat.labels.thousandSeparatorLabel")),
    reactExports.createElement(
      IconButton,
      { className: "icr-quantityFormat-v2-formatHelpTooltip", styleType: "borderless", size: "small", label: translate("QuantityFormat.labels.thousandSelectorTooltip") },
      reactExports.createElement(SvgHelpCircularHollow, null)
    ),
    reactExports.createElement(ThousandsSelector, { separator: formatProps.thousandSeparator ?? ",", disabled: false, onChange: handleThousandSeparatorChange, id: thousandsSelectorId })
  );
}
function DecimalPrimaryChildren(props) {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatPanel-primaryChildren" },
    reactExports.createElement(
      "div",
      { className: "icr-quantityFormat-v2-formatTypeRow" },
      reactExports.createElement(FormatTypeOption, { formatProps, onChange: onFormatChange })
    ),
    reactExports.createElement(Text, { variant: "small", isMuted: true }, translate("QuantityFormat.labels.formatTypeSublabel")),
    reactExports.createElement(Divider, null),
    reactExports.createElement(Label, null, translate("QuantityFormat.labels.units")),
    reactExports.createElement(FormatUnitsV2, { unitsProvider, persistenceUnit, initialFormat: formatProps, onUnitsChange: onFormatChange }),
    reactExports.createElement(Divider, null),
    reactExports.createElement(AppendUnitLabelV2, { formatProps, onFormatChange }),
    Format.isFormatTraitSetInProps(formatProps, FormatTraits.ShowUnitLabel) && reactExports.createElement(UomSeparatorSelectorV2, { formatProps, onFormatChange }),
    reactExports.createElement(FormatPrecisionV2, { formatProps, onChange: onFormatChange })
  );
}
function getDecimalPrimaryChildren(props) {
  return reactExports.createElement(DecimalPrimaryChildren, { ...props });
}
function DecimalSecondaryChildren(props) {
  const { formatProps, onFormatChange } = props;
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatPanel-secondaryChildren" },
    reactExports.createElement(SignOptionV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(DecimalSeparatorV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(UseThousandsSeparator, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ThousandsSeparatorSelector, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(KeepDecimalPointV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ShowTrailingZerosV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(KeepSingleZeroV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ZeroEmptyV2, { formatProps, onChange: onFormatChange })
  );
}
function getDecimalSecondaryChildren(props) {
  return reactExports.createElement(DecimalSecondaryChildren, { ...props });
}
function FractionDashV2(props) {
  const { formatProps, onChange, disabled = false } = props;
  const { translate } = useTranslation();
  const fractionDashId = reactExports.useId();
  const handleSetFormatProps = reactExports.useCallback((newProps) => {
    onChange && onChange(newProps);
  }, [onChange]);
  const setFormatTrait = reactExports.useCallback((trait, setActive) => {
    const traitStr = getTraitString(trait);
    let formatTraits = [traitStr];
    if (setActive) {
      if (formatProps.formatTraits) {
        const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
        formatTraits = [...traits, traitStr];
      }
    } else {
      if (formatProps.formatTraits) {
        const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
        formatTraits = traits.filter((traitEntry) => traitEntry !== traitStr);
      }
    }
    const newFormatProps = { ...formatProps, formatTraits };
    handleSetFormatProps(newFormatProps);
  }, [formatProps, handleSetFormatProps]);
  const handleUseFractionDashChange = reactExports.useCallback((e2) => {
    setFormatTrait(FormatTraits.FractionDash, e2.target.checked);
  }, [setFormatTrait]);
  const isFormatTraitSet = reactExports.useCallback((trait) => {
    return Format.isFormatTraitSetInProps(formatProps, trait);
  }, [formatProps]);
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatInlineRow" },
    reactExports.createElement(Label, { displayStyle: "inline", htmlFor: fractionDashId }, translate("QuantityFormat.labels.fractionDashLabel")),
    reactExports.createElement(Checkbox, { id: fractionDashId, checked: isFormatTraitSet(FormatTraits.FractionDash), onChange: handleUseFractionDashChange, disabled })
  );
}
function FractionalPrimaryChildren(props) {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatPanel-primaryChildren" },
    reactExports.createElement(
      "div",
      { className: "icr-quantityFormat-v2-formatTypeRow" },
      reactExports.createElement(FormatTypeOption, { formatProps, onChange: onFormatChange })
    ),
    reactExports.createElement(Text, { variant: "small", isMuted: true }, translate("QuantityFormat.labels.formatTypeSublabel")),
    reactExports.createElement(Divider, null),
    reactExports.createElement(Label, null, translate("QuantityFormat.labels.units")),
    reactExports.createElement(FormatUnitsV2, { unitsProvider, persistenceUnit, initialFormat: formatProps, onUnitsChange: onFormatChange }),
    reactExports.createElement(Divider, null),
    reactExports.createElement(AppendUnitLabelV2, { formatProps, onFormatChange }),
    Format.isFormatTraitSetInProps(formatProps, FormatTraits.ShowUnitLabel) && reactExports.createElement(UomSeparatorSelectorV2, { formatProps, onFormatChange }),
    reactExports.createElement(FormatPrecisionV2, { formatProps, onChange: onFormatChange })
  );
}
function getFractionalPrimaryChildren(props) {
  return reactExports.createElement(FractionalPrimaryChildren, { ...props });
}
function FractionalSecondaryChildren(props) {
  const { formatProps, onFormatChange } = props;
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatPanel-secondaryChildren" },
    reactExports.createElement(SignOptionV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(FractionDashV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(UseThousandsSeparator, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ThousandsSeparatorSelector, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ShowTrailingZerosV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(KeepSingleZeroV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ZeroEmptyV2, { formatProps, onChange: onFormatChange })
  );
}
function getFractionalSecondaryChildren(props) {
  return reactExports.createElement(FractionalSecondaryChildren, { ...props });
}
function ScientificTypeV2(props) {
  const { formatProps, onChange, disabled = false } = props;
  const { translate } = useTranslation();
  const handleSetFormatProps = reactExports.useCallback((newProps) => {
    onChange && onChange(newProps);
  }, [onChange]);
  const handleScientificTypeChange = reactExports.useCallback((type) => {
    const newFormatProps = {
      ...formatProps,
      scientificType: type
    };
    handleSetFormatProps(newFormatProps);
  }, [formatProps, handleSetFormatProps]);
  const currentType = reactExports.useMemo(() => {
    return formatProps.scientificType && formatProps.scientificType.length > 0 ? parseScientificType(formatProps.scientificType, "custom") : ScientificType.Normalized;
  }, [formatProps.scientificType]);
  const formatOptions = reactExports.useMemo(() => [
    {
      value: ScientificType.Normalized,
      label: translate("QuantityFormat.scientific-type.normalized")
    },
    {
      value: ScientificType.ZeroNormalized,
      label: translate("QuantityFormat.scientific-type.zero-normalized")
    }
  ], [translate]);
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatInlineRow" },
    reactExports.createElement(LabeledSelect, { label: reactExports.createElement(
      reactExports.Fragment,
      null,
      translate("QuantityFormat.labels.scientificTypeLabel"),
      reactExports.createElement(
        IconButton,
        { className: "icr-quantityFormat-v2-formatHelpTooltip", styleType: "borderless", size: "small", label: translate("QuantityFormat.labels.scientificTypeTooltip") },
        reactExports.createElement(SvgHelpCircularHollow, null)
      )
    ), options: formatOptions, value: currentType, onChange: handleScientificTypeChange, size: "small", disabled })
  );
}
function ScientificPrimaryChildren(props) {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatPanel-primaryChildren" },
    reactExports.createElement(
      "div",
      { className: "icr-quantityFormat-v2-formatTypeRow" },
      reactExports.createElement(FormatTypeOption, { formatProps, onChange: onFormatChange })
    ),
    reactExports.createElement(Text, { variant: "small", isMuted: true }, translate("QuantityFormat.labels.formatTypeSublabel")),
    reactExports.createElement(Divider, null),
    reactExports.createElement(Label, null, translate("QuantityFormat.labels.units")),
    reactExports.createElement(FormatUnitsV2, { unitsProvider, persistenceUnit, initialFormat: formatProps, onUnitsChange: onFormatChange }),
    reactExports.createElement(Divider, null),
    reactExports.createElement(AppendUnitLabelV2, { formatProps, onFormatChange }),
    Format.isFormatTraitSetInProps(formatProps, FormatTraits.ShowUnitLabel) && reactExports.createElement(UomSeparatorSelectorV2, { formatProps, onFormatChange }),
    reactExports.createElement(FormatPrecisionV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ScientificTypeV2, { formatProps, onChange: onFormatChange })
  );
}
function getScientificPrimaryChildren(props) {
  return reactExports.createElement(ScientificPrimaryChildren, { ...props });
}
function ScientificSecondaryChildren(props) {
  const { formatProps, onFormatChange } = props;
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatPanel-secondaryChildren" },
    reactExports.createElement(SignOptionV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(DecimalSeparatorV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(UseThousandsSeparator, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ThousandsSeparatorSelector, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(KeepDecimalPointV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ShowTrailingZerosV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(KeepSingleZeroV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ZeroEmptyV2, { formatProps, onChange: onFormatChange })
  );
}
function getScientificSecondaryChildren(props) {
  return reactExports.createElement(ScientificSecondaryChildren, { ...props });
}
function StationSeparatorV2(props) {
  const { formatProps, onChange, disabled = false } = props;
  const { translate } = useTranslation();
  const stationSeparatorSelectorId = reactExports.useId();
  const handleStationSeparatorChange = reactExports.useCallback((value) => {
    const newFormatProps = { ...formatProps, stationSeparator: value };
    onChange && onChange(newFormatProps);
  }, [formatProps, onChange]);
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatInlineRow" },
    reactExports.createElement(Label, { displayStyle: "inline", id: stationSeparatorSelectorId }, translate("QuantityFormat.labels.stationSeparatorLabel")),
    reactExports.createElement(StationSeparatorSelector, { "aria-labelledby": stationSeparatorSelectorId, separator: formatProps.stationSeparator ?? "+", disabled, onChange: handleStationSeparatorChange })
  );
}
function StationOffsetV2(props) {
  const { formatProps, onChange, disabled = false } = props;
  const { translate } = useTranslation();
  const stationOffsetSelectorId = reactExports.useId();
  const handleStationOffsetChange = reactExports.useCallback((value) => {
    const newFormatProps = { ...formatProps, stationOffsetSize: value };
    onChange && onChange(newFormatProps);
  }, [formatProps, onChange]);
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatInlineRow" },
    reactExports.createElement(Label, { displayStyle: "inline", id: stationOffsetSelectorId }, translate("QuantityFormat.labels.stationOffsetLabel")),
    reactExports.createElement(StationSizeSelector, { "aria-labelledby": stationOffsetSelectorId, value: formatProps.stationOffsetSize ?? 2, disabled, onChange: handleStationOffsetChange })
  );
}
function StationPrimaryChildren(props) {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatPanel-primaryChildren" },
    reactExports.createElement(
      "div",
      { className: "icr-quantityFormat-v2-formatTypeRow" },
      reactExports.createElement(FormatTypeOption, { formatProps, onChange: onFormatChange })
    ),
    reactExports.createElement(Text, { variant: "small", isMuted: true }, translate("QuantityFormat.labels.formatTypeSublabel")),
    reactExports.createElement(Divider, null),
    reactExports.createElement(Label, null, translate("QuantityFormat.labels.units")),
    reactExports.createElement(FormatUnitsV2, { unitsProvider, persistenceUnit, initialFormat: formatProps, onUnitsChange: onFormatChange }),
    reactExports.createElement(Divider, null),
    reactExports.createElement(AppendUnitLabelV2, { formatProps, onFormatChange }),
    Format.isFormatTraitSetInProps(formatProps, FormatTraits.ShowUnitLabel) && reactExports.createElement(UomSeparatorSelectorV2, { formatProps, onFormatChange }),
    reactExports.createElement(FormatPrecisionV2, { formatProps, onChange: onFormatChange })
  );
}
function getStationPrimaryChildren(props) {
  return reactExports.createElement(StationPrimaryChildren, { ...props });
}
function StationSecondaryChildren(props) {
  const { formatProps, onFormatChange } = props;
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatPanel-secondaryChildren" },
    reactExports.createElement(SignOptionV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(StationOffsetV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(StationSeparatorV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(UseThousandsSeparator, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ThousandsSeparatorSelector, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(KeepDecimalPointV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ShowTrailingZerosV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(KeepSingleZeroV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ZeroEmptyV2, { formatProps, onChange: onFormatChange })
  );
}
function getStationSecondaryChildren(props) {
  return reactExports.createElement(StationSecondaryChildren, { ...props });
}
function AzimuthBaseUnitSelector(props) {
  const { currentUnit, unitsProvider, onChange, disabled } = props;
  const { translate } = useTranslation();
  const [unitOptions, setUnitOptions] = e.useState([
    { value: currentUnit, label: currentUnit }
  ]);
  e.useEffect(() => {
    async function loadUnitOptions() {
      try {
        const baseUnit = await unitsProvider.findUnitByName(currentUnit);
        if (baseUnit) {
          const familyUnits = await unitsProvider.getUnitsByFamily(baseUnit.phenomenon);
          const options = familyUnits.map((unit) => ({
            value: unit.name,
            label: getUnitName(unit.name)
          })).sort((a, b) => a.label.localeCompare(b.label));
          setUnitOptions(options);
        }
      } catch (error) {
        console.warn("Failed to load unit family:", error);
        setUnitOptions([{ value: currentUnit, label: currentUnit }]);
      }
    }
    void loadUnitOptions();
  }, [currentUnit, unitsProvider]);
  const handleUnitChange = e.useCallback((value) => {
    onChange(value);
  }, [onChange]);
  return e.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatInlineRow" },
    e.createElement(LabeledSelect, { label: e.createElement(
      e.Fragment,
      null,
      translate("QuantityFormat.labels.azimuthBaseUnit"),
      e.createElement(
        IconButton,
        { size: "small", styleType: "borderless", label: translate("QuantityFormat.azimuthType.baseUnitTooltip") },
        e.createElement(SvgHelpCircularHollow, null)
      )
    ), value: currentUnit, options: unitOptions, onChange: handleUnitChange, size: "small", disabled, displayStyle: "inline" })
  );
}
function AzimuthOptionsV2(props) {
  var _a2;
  const { formatProps, onChange, disabled, unitsProvider } = props;
  const { translate } = useTranslation();
  const baseInputId = e.useId();
  const ccwCheckboxId = e.useId();
  const handleAzimuthBaseUnitChange = e.useCallback((unitName) => {
    const newFormatProps = { ...formatProps, azimuthBaseUnit: unitName };
    onChange && onChange(newFormatProps);
  }, [formatProps, onChange]);
  const handleAzimuthBaseChange = e.useCallback((value) => {
    const newFormatProps = { ...formatProps, azimuthBase: value };
    onChange && onChange(newFormatProps);
  }, [formatProps, onChange]);
  const handleAzimuthCCWChange = e.useCallback((event) => {
    const newFormatProps = {
      ...formatProps,
      azimuthCounterClockwise: event.target.checked
    };
    onChange && onChange(newFormatProps);
  }, [formatProps, onChange]);
  const onKeyDown = (event) => {
    const isLetter = /^[a-zA-Z]$/.test(event.key);
    if (event.key === "," || isLetter) {
      event.preventDefault();
    }
  };
  const handleInputChange = e.useCallback((e2) => {
    const numValue = Number(e2.target.value);
    if (isNaN(numValue)) {
      e2.preventDefault();
      return;
    }
    handleAzimuthBaseChange(numValue);
  }, [handleAzimuthBaseChange]);
  return e.createElement(
    e.Fragment,
    null,
    e.createElement(
      "div",
      { className: "icr-quantityFormat-v2-formatInlineRow" },
      e.createElement(Label, { htmlFor: ccwCheckboxId, displayStyle: "inline" }, translate("QuantityFormat.labels.azimuthCounterClockwise")),
      e.createElement(
        IconButton,
        { size: "small", styleType: "borderless", label: translate("QuantityFormat.azimuthType.ccwFlagTooltip") },
        e.createElement(SvgHelpCircularHollow, null)
      ),
      e.createElement(Checkbox, { id: ccwCheckboxId, checked: formatProps.azimuthCounterClockwise ?? false, onChange: handleAzimuthCCWChange, disabled })
    ),
    e.createElement(AzimuthBaseUnitSelector, { currentUnit: formatProps.azimuthBaseUnit ?? "Units.ARC_DEG", unitsProvider, onChange: handleAzimuthBaseUnitChange, disabled }),
    e.createElement(
      "div",
      { className: "icr-quantityFormat-v2-formatInlineRow" },
      e.createElement(Label, { htmlFor: baseInputId, displayStyle: "inline" }, translate("QuantityFormat.labels.azimuthBase")),
      e.createElement(
        IconButton,
        { size: "small", styleType: "borderless", label: translate("QuantityFormat.azimuthType.baseTooltip") },
        e.createElement(SvgHelpCircularHollow, null)
      ),
      e.createElement(Input, { id: baseInputId, type: "number", value: ((_a2 = formatProps.azimuthBase) == null ? void 0 : _a2.toString()) ?? "0", onKeyDown, onChange: handleInputChange, size: "small", disabled })
    )
  );
}
function AzimuthPrimaryChildren(props) {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatPanel-primaryChildren" },
    reactExports.createElement(
      "div",
      { className: "icr-quantityFormat-v2-formatTypeRow" },
      reactExports.createElement(FormatTypeOption, { formatProps, onChange: onFormatChange })
    ),
    reactExports.createElement(Text, { variant: "small", isMuted: true }, translate("QuantityFormat.labels.formatTypeSublabel")),
    reactExports.createElement(Divider, null),
    reactExports.createElement(Label, null, translate("QuantityFormat.labels.units")),
    reactExports.createElement(FormatUnitsV2, { unitsProvider, persistenceUnit, initialFormat: formatProps, onUnitsChange: onFormatChange }),
    reactExports.createElement(Divider, null),
    reactExports.createElement(AppendUnitLabelV2, { formatProps, onFormatChange }),
    Format.isFormatTraitSetInProps(formatProps, FormatTraits.ShowUnitLabel) && reactExports.createElement(UomSeparatorSelectorV2, { formatProps, onFormatChange }),
    reactExports.createElement(FormatPrecisionV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(AzimuthOptionsV2, { formatProps, onChange: onFormatChange, disabled: false, unitsProvider })
  );
}
function getAzimuthPrimaryChildren(props) {
  return reactExports.createElement(AzimuthPrimaryChildren, { ...props });
}
function AzimuthSecondaryChildren(props) {
  const { formatProps, onFormatChange } = props;
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatPanel-secondaryChildren" },
    reactExports.createElement(SignOptionV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(DecimalSeparatorV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(UseThousandsSeparator, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ThousandsSeparatorSelector, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(KeepDecimalPointV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ShowTrailingZerosV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(KeepSingleZeroV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ZeroEmptyV2, { formatProps, onChange: onFormatChange })
  );
}
function getAzimuthSecondaryChildren(props) {
  return reactExports.createElement(AzimuthSecondaryChildren, { ...props });
}
function BearingPrimaryChildren(props) {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatPanel-primaryChildren" },
    reactExports.createElement(
      "div",
      { className: "icr-quantityFormat-v2-formatTypeRow" },
      reactExports.createElement(FormatTypeOption, { formatProps, onChange: onFormatChange })
    ),
    reactExports.createElement(Text, { variant: "small", isMuted: true }, translate("QuantityFormat.labels.formatTypeSublabel")),
    reactExports.createElement(Divider, null),
    reactExports.createElement(Label, null, translate("QuantityFormat.labels.units")),
    reactExports.createElement(FormatUnitsV2, { unitsProvider, persistenceUnit, initialFormat: formatProps, onUnitsChange: onFormatChange }),
    reactExports.createElement(Divider, null),
    reactExports.createElement(AppendUnitLabelV2, { formatProps, onFormatChange }),
    reactExports.createElement(FormatPrecisionV2, { formatProps, onChange: onFormatChange })
  );
}
function BearingSecondaryChildren(_props) {
  const { formatProps, onFormatChange } = _props;
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatPanel-secondaryChildren" },
    reactExports.createElement(DecimalSeparatorV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(KeepDecimalPointV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ShowTrailingZerosV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(KeepSingleZeroV2, { formatProps, onChange: onFormatChange })
  );
}
function getBearingPrimaryChildren(props) {
  return reactExports.createElement(BearingPrimaryChildren, { ...props });
}
function getBearingSecondaryChildren(props) {
  return reactExports.createElement(BearingSecondaryChildren, { ...props });
}
function RatioTypeV2(props) {
  const { formatProps, onChange, disabled = false } = props;
  const { translate } = useTranslation();
  const handleSetFormatProps = reactExports.useCallback((newProps) => {
    onChange && onChange(newProps);
  }, [onChange]);
  const handleRatioTypeChange = reactExports.useCallback((type) => {
    const newFormatProps = {
      ...formatProps,
      ratioType: type
    };
    handleSetFormatProps(newFormatProps);
  }, [formatProps, handleSetFormatProps]);
  const currentType = reactExports.useMemo(() => {
    return formatProps.ratioType && formatProps.ratioType.length > 0 ? parseRatioType(formatProps.ratioType, "custom") : RatioType.NToOne;
  }, [formatProps.ratioType]);
  const formatOptions = reactExports.useMemo(() => [
    {
      value: RatioType.NToOne,
      label: translate("QuantityFormat.ratio-type.n-to-one.label"),
      sublabel: translate("QuantityFormat.ratio-type.n-to-one.description")
    },
    {
      value: RatioType.OneToN,
      label: translate("QuantityFormat.ratio-type.one-to-n.label"),
      sublabel: translate("QuantityFormat.ratio-type.one-to-n.description")
    },
    {
      value: RatioType.UseGreatestCommonDivisor,
      label: translate("QuantityFormat.ratio-type.use-greatest-common-divisor.label"),
      sublabel: translate("QuantityFormat.ratio-type.use-greatest-common-divisor.description")
    },
    {
      value: RatioType.ValueBased,
      label: translate("QuantityFormat.ratio-type.value-based.label"),
      sublabel: translate("QuantityFormat.ratio-type.value-based.description")
    }
  ], [translate]);
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatInlineRow" },
    reactExports.createElement(LabeledSelect, { label: reactExports.createElement(
      reactExports.Fragment,
      null,
      translate("QuantityFormat.labels.ratioTypeLabel"),
      reactExports.createElement(
        IconButton,
        { className: "icr-quantityFormat-v2-formatHelpTooltip", styleType: "borderless", size: "small", label: translate("QuantityFormat.ratio-type.default.description") },
        reactExports.createElement(SvgHelpCircularHollow, null)
      )
    ), options: formatOptions, value: currentType, onChange: handleRatioTypeChange, size: "small", disabled, displayStyle: "inline", menuStyle: { maxInlineSize: "60vw" } })
  );
}
function RatioPrimaryChildren(props) {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatPanel-primaryChildren" },
    reactExports.createElement(
      "div",
      { className: "icr-quantityFormat-v2-formatTypeRow" },
      reactExports.createElement(FormatTypeOption, { formatProps, onChange: onFormatChange })
    ),
    reactExports.createElement(Text, { variant: "small", isMuted: true }, translate("QuantityFormat.labels.formatTypeSublabel")),
    reactExports.createElement(Divider, null),
    reactExports.createElement(Label, null, translate("QuantityFormat.labels.units")),
    reactExports.createElement(FormatUnitsV2, { unitsProvider, persistenceUnit, initialFormat: formatProps, onUnitsChange: onFormatChange }),
    reactExports.createElement(Divider, null),
    reactExports.createElement(AppendUnitLabelV2, { formatProps, onFormatChange }),
    Format.isFormatTraitSetInProps(formatProps, FormatTraits.ShowUnitLabel) && reactExports.createElement(UomSeparatorSelectorV2, { formatProps, onFormatChange }),
    reactExports.createElement(FormatPrecisionV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(RatioTypeV2, { formatProps, onChange: onFormatChange })
  );
}
function getRatioPrimaryChildren(props) {
  return reactExports.createElement(RatioPrimaryChildren, { ...props });
}
function RatioSecondaryChildren(props) {
  const { formatProps, onFormatChange } = props;
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatPanel-secondaryChildren" },
    reactExports.createElement(SignOptionV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(DecimalSeparatorV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(UseThousandsSeparator, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ThousandsSeparatorSelector, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(KeepDecimalPointV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ShowTrailingZerosV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(KeepSingleZeroV2, { formatProps, onChange: onFormatChange }),
    reactExports.createElement(ZeroEmptyV2, { formatProps, onChange: onFormatChange })
  );
}
function getRatioSecondaryChildren(props) {
  return reactExports.createElement(RatioSecondaryChildren, { ...props });
}
function FormatPanelV2(props) {
  const { formatProps, unitsProvider, onFormatChange, persistenceUnit } = props;
  const [isExpanded, setIsExpanded] = reactExports.useState(false);
  const { translate } = useTranslation();
  const [primaryChildren, secondaryChildren] = reactExports.useMemo(() => {
    const panelProps = {
      formatProps,
      unitsProvider,
      onFormatChange,
      persistenceUnit
    };
    const formatType = parseFormatType(formatProps.type, "format");
    switch (formatType) {
      case FormatType.Decimal:
        return [
          getDecimalPrimaryChildren(panelProps),
          getDecimalSecondaryChildren(panelProps)
        ];
      case FormatType.Fractional:
        return [
          getFractionalPrimaryChildren(panelProps),
          getFractionalSecondaryChildren(panelProps)
        ];
      case FormatType.Scientific:
        return [
          getScientificPrimaryChildren(panelProps),
          getScientificSecondaryChildren(panelProps)
        ];
      case FormatType.Station:
        return [
          getStationPrimaryChildren(panelProps),
          getStationSecondaryChildren(panelProps)
        ];
      case FormatType.Azimuth:
        return [
          getAzimuthPrimaryChildren(panelProps),
          getAzimuthSecondaryChildren(panelProps)
        ];
      case FormatType.Bearing:
        return [
          getBearingPrimaryChildren(panelProps),
          getBearingSecondaryChildren(panelProps)
        ];
      case FormatType.Ratio:
        return [
          getRatioPrimaryChildren(panelProps),
          getRatioSecondaryChildren(panelProps)
        ];
      default:
        return [
          getDecimalPrimaryChildren(panelProps),
          getDecimalSecondaryChildren(panelProps)
        ];
    }
  }, [formatProps, unitsProvider, onFormatChange, persistenceUnit]);
  return reactExports.createElement(
    Flex,
    { flexDirection: "column", alignItems: "flex-start", className: "icr-quantityFormat-v2-formatPanel" },
    reactExports.createElement(Surface, { elevation: 0, className: "icr-quantityFormat-v2-formatPanel-primaryChildren" }, primaryChildren),
    reactExports.createElement(
      ExpandableBlock,
      { title: reactExports.createElement(Text, { variant: "leading" }, translate("QuantityFormat.labels.advancedOptions")), isExpanded, onToggle: () => setIsExpanded(!isExpanded) },
      reactExports.createElement("div", { className: "icr-quantityFormat-v2-formatPanel-secondaryChildren" }, secondaryChildren)
    )
  );
}
function FormatSampleV2(props) {
  const { formatProps, unitsProvider, persistenceUnit, initialMagnitude } = props;
  const initialValue = initialMagnitude ?? 0;
  const [magnitude, setMagnitude] = reactExports.useState(initialValue);
  const [sampleValue, setSampleValue] = reactExports.useState(initialValue.toString());
  const [formatSpec, setFormatSpec] = reactExports.useState(void 0);
  const { translate } = useTranslation();
  const inputId = reactExports.useId();
  reactExports.useEffect(() => {
    const createFormatterSpec = async () => {
      if (!persistenceUnit) {
        setFormatSpec(void 0);
        return;
      }
      try {
        const actualFormat = await Format.createFromJSON("custom", unitsProvider, formatProps);
        const spec = await FormatterSpec.create(actualFormat.name, actualFormat, unitsProvider, persistenceUnit);
        setFormatSpec(spec);
      } catch {
        setFormatSpec(void 0);
      }
    };
    void createFormatterSpec();
  }, [formatProps, unitsProvider, persistenceUnit]);
  reactExports.useEffect(() => {
    const value = initialMagnitude ?? 0;
    setMagnitude(value);
    setSampleValue(value.toString());
  }, [initialMagnitude]);
  const handleOnValueBlur = reactExports.useCallback(() => {
    let newValue = Number.parseFloat(sampleValue);
    if (Number.isNaN(newValue))
      newValue = 0;
    setMagnitude(newValue);
    setSampleValue(newValue.toString());
  }, [sampleValue]);
  const handleOnValueChange = reactExports.useCallback((event) => {
    setSampleValue(event.target.value);
  }, []);
  const handleKeyDown = reactExports.useCallback((e2) => {
    if (e2.key === Key_enumExports.Key.Enter.valueOf()) {
      let newValue = Number.parseFloat(sampleValue);
      if (Number.isNaN(newValue))
        newValue = 0;
      setMagnitude(newValue);
      setSampleValue(newValue.toString());
      e2.preventDefault();
    }
  }, [sampleValue]);
  const activePersistenceUnitLabel = formatSpec ? formatSpec.persistenceUnit.label : (persistenceUnit == null ? void 0 : persistenceUnit.label) ?? "";
  const formattedValue = formatSpec ? formatSpec.applyFormatting(magnitude) : "";
  return reactExports.createElement(
    "div",
    { className: "icr-quantityFormat-v2-formatSample-container" },
    reactExports.createElement(
      "div",
      { className: "icr-quantityFormat-v2-formatSample-box" },
      reactExports.createElement(Label, { className: "icr-quantityFormat-v2-samplePreviewTitle", htmlFor: inputId }, translate("QuantityFormat.labels.samplePreview")),
      reactExports.createElement(
        "div",
        { className: "icr-quantityFormat-v2-formatSample-previewRow" },
        reactExports.createElement(
          "div",
          { className: "icr-quantityFormat-v2-formatSample-inputGroup" },
          reactExports.createElement(Input, { id: inputId, className: "icr-quantityFormat-v2-formatSample-input", value: sampleValue, onChange: handleOnValueChange, onKeyDown: handleKeyDown, onBlur: handleOnValueBlur, size: "small" }),
          reactExports.createElement(Label, { className: "icr-quantityFormat-v2-persistenceUnitLabel" }, activePersistenceUnitLabel)
        ),
        reactExports.createElement(Divider, { orientation: "vertical" }),
        reactExports.createElement(Label, { className: "icr-quantityFormat-v2-formattedValueLabel" }, formattedValue)
      )
    )
  );
}
function QuantityFormatPanelV2(props) {
  const { formatDefinition, unitsProvider, onFormatChange, showSample = true } = props;
  const [persistenceUnit, setPersistenceUnit] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    const loadPersistenceUnit = async () => {
      if (formatDefinition.composite && formatDefinition.composite.units && formatDefinition.composite.units.length > 0) {
        const firstUnitName = formatDefinition.composite.units[0].name;
        try {
          const unit = await unitsProvider.findUnitByName(firstUnitName);
          setPersistenceUnit(unit);
        } catch {
          setPersistenceUnit(void 0);
        }
      } else {
        setPersistenceUnit(void 0);
      }
    };
    void loadPersistenceUnit();
  }, [formatDefinition.composite, unitsProvider]);
  const handleOnFormatChanged = reactExports.useCallback(async (newProps) => {
    onFormatChange && onFormatChange(newProps);
  }, [onFormatChange]);
  return reactExports.createElement(
    "div",
    { className: "components-quantityFormat-quantityPanel" },
    showSample && reactExports.createElement(
      reactExports.Fragment,
      null,
      reactExports.createElement(FormatSampleV2, { formatProps: formatDefinition, unitsProvider, persistenceUnit, initialMagnitude: props.initialMagnitude }),
      reactExports.createElement(Divider, null)
    ),
    reactExports.createElement(FormatPanelV2, { formatProps: formatDefinition, unitsProvider, onFormatChange: handleOnFormatChanged, persistenceUnit })
  );
}
function createTextInputFormatPropEditor(key, label, inProps, getString, setString, fireFormatChange) {
  const value = getString(inProps);
  return reactExports.createElement(
    reactExports.Fragment,
    { key: `${key}` },
    reactExports.createElement("span", { key: `${key}-label`, className: "uicore-label" }, label),
    reactExports.createElement(Input, { "data-testid": `${key}-editor`, key: `${key}-editor`, value, size: "small", onChange: (e2) => {
      const newProps = setString(inProps, e2.currentTarget.value);
      fireFormatChange(newProps);
    } })
  );
}
function createSelectFormatPropEditor(key, label, options, inProps, getString, setString, fireFormatChange) {
  const value = getString(inProps);
  return reactExports.createElement(
    reactExports.Fragment,
    { key: `${key}` },
    reactExports.createElement("span", { key: `${key}-label`, className: "uicore-label" }, label),
    reactExports.createElement(Select, { "data-testid": `${key}-editor`, key: `${key}-editor`, value, options, size: "small", onChange: (newValue) => {
      const newProps = setString(inProps, newValue);
      fireFormatChange(newProps);
    } })
  );
}
function createCheckboxFormatPropEditor(key, label, inProps, getBool, setBool, fireFormatChange) {
  const isChecked = getBool(inProps);
  return reactExports.createElement(
    reactExports.Fragment,
    { key: `${key}` },
    reactExports.createElement("span", { key: `${key}-label`, className: "uicore-label" }, label),
    reactExports.createElement(Checkbox, { "data-testid": `${key}-editor`, key: `${key}-editor`, checked: isChecked, onChange: (e2) => {
      const newProps = setBool(inProps, e2.target.checked);
      fireFormatChange(newProps);
    } })
  );
}
function formatAreEqual$1(obj1, obj2) {
  const compare = new DeepCompare();
  return compare.compare(obj1, obj2);
}
function QuantityFormatPanelV1(props) {
  const { quantityType, onFormatChange, showSample, initialMagnitude, enableMinimumProperties, ...rest } = props;
  const [formatProps, setFormatProps] = reactExports.useState();
  const initialFormatProps = reactExports.useRef();
  const [persistenceUnit, setPersistenceUnit] = reactExports.useState();
  reactExports.useEffect(() => {
    const newFormatProps = IModelApp.quantityFormatter.getFormatPropsByQuantityType(quantityType);
    if (!initialFormatProps.current)
      initialFormatProps.current = newFormatProps;
    setFormatProps(newFormatProps);
    const quantityTypeKey = getQuantityTypeKey(quantityType);
    const quantityTypeDefinition = IModelApp.quantityFormatter.quantityTypesRegistry.get(quantityTypeKey);
    if (quantityTypeDefinition)
      setPersistenceUnit(quantityTypeDefinition.persistenceUnit);
    else
      throw Error(`Unable to locate a quantity type with type ${quantityType}`);
  }, [quantityType]);
  reactExports.useEffect(() => {
    const newFormatProps = IModelApp.quantityFormatter.getFormatPropsByQuantityType(quantityType);
    if (initialFormatProps.current && newFormatProps) {
      if (!formatAreEqual$1(newFormatProps, initialFormatProps.current)) {
        initialFormatProps.current = newFormatProps;
        setFormatProps(newFormatProps);
      }
    }
  });
  const handleOnFormatChanged = reactExports.useCallback(async (newProps) => {
    setFormatProps(newProps);
    onFormatChange && onFormatChange(newProps);
  }, [onFormatChange]);
  const createCustomPropEditors = reactExports.useCallback((specs, inProps, fireFormatChange) => {
    return specs.map((spec, index) => {
      if (isCheckboxFormatPropEditorSpec(spec))
        return createCheckboxFormatPropEditor(`${spec.editorType}-${index}`, spec.label, inProps, spec.getBool, spec.setBool, fireFormatChange);
      if (isTextSelectFormatPropEditorSpec(spec))
        return createSelectFormatPropEditor(`${spec.editorType}-${index}`, spec.label, spec.selectOptions, inProps, spec.getString, spec.setString, fireFormatChange);
      if (isTextInputFormatPropEditorSpec(spec))
        return createTextInputFormatPropEditor(`${spec.editorType}-${index}`, spec.label, inProps, spec.getString, spec.setString, fireFormatChange);
      return reactExports.createElement("div", { key: index });
    });
  }, []);
  const providePrimaryChildren = reactExports.useCallback((inProps, fireFormatChange) => {
    const quantityTypeKey = getQuantityTypeKey(quantityType);
    const quantityTypeDefinition = IModelApp.quantityFormatter.quantityTypesRegistry.get(quantityTypeKey);
    if (quantityTypeDefinition && isCustomQuantityTypeDefinition(quantityTypeDefinition) && quantityTypeDefinition.isCompatibleFormatProps(inProps)) {
      if (quantityTypeDefinition.primaryPropEditorSpecs)
        return createCustomPropEditors(quantityTypeDefinition.primaryPropEditorSpecs, inProps, fireFormatChange);
    }
    return null;
  }, [createCustomPropEditors, quantityType]);
  const provideSecondaryChildren = reactExports.useCallback((inProps, fireFormatChange) => {
    const quantityTypeKey = getQuantityTypeKey(quantityType);
    const quantityTypeDefinition = IModelApp.quantityFormatter.quantityTypesRegistry.get(quantityTypeKey);
    if (quantityTypeDefinition && isCustomQuantityTypeDefinition(quantityTypeDefinition) && quantityTypeDefinition.isCompatibleFormatProps(inProps)) {
      if (quantityTypeDefinition.secondaryPropEditorSpecs)
        return createCustomPropEditors(quantityTypeDefinition.secondaryPropEditorSpecs, inProps, fireFormatChange);
    }
    return null;
  }, [createCustomPropEditors, quantityType]);
  const provideFormatSpec = reactExports.useCallback(async (inProps, _persistenceUnit, _unitsProvider) => {
    return IModelApp.quantityFormatter.generateFormatterSpecByType(quantityType, inProps);
  }, [quantityType]);
  return reactExports.createElement("div", { className: "components-quantityFormat-quantityPanel" }, persistenceUnit && formatProps && reactExports.createElement(FormatPanel, { ...rest, onFormatChange: handleOnFormatChanged, showSample, initialMagnitude, enableMinimumProperties, initialFormat: formatProps, unitsProvider: IModelApp.quantityFormatter.unitsProvider, persistenceUnit, providePrimaryChildren, provideSecondaryChildren, provideFormatSpec }));
}
function isV2(props) {
  return "formatDefinition" in props && "unitsProvider" in props;
}
function QuantityFormatPanel(props) {
  if (isV2(props)) {
    return reactExports.createElement(QuantityFormatPanelV2, { ...props });
  }
  return reactExports.createElement(QuantityFormatPanelV1, { ...props });
}
function UnitSystemSelector(props) {
  const { translate } = useTranslation$1();
  const { selectedUnitSystemKey, onUnitSystemSelected, availableUnitSystems } = props;
  const handleUnitSystemSelected = reactExports.useCallback((newValue) => {
    onUnitSystemSelected && onUnitSystemSelected(newValue);
  }, [onUnitSystemSelected]);
  const displayUnitSystems = [
    ...availableUnitSystems.values()
  ].map((sys) => {
    switch (sys) {
      case "imperial":
        return {
          value: "imperial",
          label: translate("presentationUnitSystem.BritishImperial")
        };
      case "usCustomary":
        return {
          value: "usCustomary",
          label: translate("presentationUnitSystem.USCustomary")
        };
      case "usSurvey":
        return {
          value: "usSurvey",
          label: translate("presentationUnitSystem.USSurvey")
        };
      case "metric":
      default:
        return {
          value: "metric",
          label: translate("presentationUnitSystem.Metric")
        };
    }
  });
  const unitSystemKey = availableUnitSystems.has(selectedUnitSystemKey) ? selectedUnitSystemKey : displayUnitSystems[0].value;
  return reactExports.createElement(
    "div",
    { className: "quantity-unit-system-selector-container" },
    reactExports.createElement("span", { className: "uicore-label" }, translate("presentationUnitSystem.selector-label")),
    reactExports.createElement(Select, { "data-testid": "unitSystemSelector", value: unitSystemKey, options: displayUnitSystems, onChange: handleUnitSystemSelected, size: "small" })
  );
}
function formatAreEqual(obj1, obj2) {
  const compare = new DeepCompare();
  return compare.compare(obj1, obj2);
}
function QuantityFormatSettingsPage({ initialQuantityType, availableUnitSystems }) {
  const { translate } = useTranslation$1();
  const [activeUnitSystemKey, setActiveUnitSystemKey] = reactExports.useState(IModelApp.quantityFormatter.activeUnitSystem);
  const [activeQuantityType, setActiveQuantityType] = reactExports.useState(getQuantityTypeKey(initialQuantityType));
  const [activeFormatterSpec, setActiveFormatterSpec] = reactExports.useState(IModelApp.quantityFormatter.findFormatterSpecByQuantityType(getQuantityTypeKey(activeQuantityType)));
  const [saveEnabled, setSaveEnabled] = reactExports.useState(false);
  const [clearEnabled, setClearEnabled] = reactExports.useState(IModelApp.quantityFormatter.hasActiveOverride(initialQuantityType, true));
  const newQuantityTypeRef = reactExports.useRef();
  reactExports.useEffect(() => {
    return IModelApp.quantityFormatter.onActiveFormattingUnitSystemChanged.addListener(() => {
      if (activeUnitSystemKey !== IModelApp.quantityFormatter.activeUnitSystem) {
        setActiveUnitSystemKey(IModelApp.quantityFormatter.activeUnitSystem);
        setActiveFormatterSpec(IModelApp.quantityFormatter.findFormatterSpecByQuantityType(activeQuantityType));
        setSaveEnabled(false);
        setClearEnabled(IModelApp.quantityFormatter.hasActiveOverride(activeQuantityType, true));
      }
    });
  }, [activeQuantityType, activeUnitSystemKey]);
  reactExports.useEffect(() => {
    return IModelApp.quantityFormatter.onQuantityFormatsChanged.addListener((args) => {
      if (!newQuantityTypeRef.current) {
        const quantityKey = IModelApp.quantityFormatter.getQuantityTypeKey(activeQuantityType);
        if (args.quantityType === quantityKey) {
          setActiveFormatterSpec(IModelApp.quantityFormatter.findFormatterSpecByQuantityType(activeQuantityType));
          setSaveEnabled(false);
          setClearEnabled(IModelApp.quantityFormatter.hasActiveOverride(activeQuantityType, true));
        }
      }
      newQuantityTypeRef.current = void 0;
    });
  }, [activeQuantityType]);
  const saveChanges = reactExports.useCallback((afterSaveFunction, args) => {
    if (activeFormatterSpec) {
      const formatProps = activeFormatterSpec.format.toJSON();
      const formatPropsInUse = IModelApp.quantityFormatter.findFormatterSpecByQuantityType(activeQuantityType).format.toJSON();
      if (formatPropsInUse && !formatAreEqual(formatProps, formatPropsInUse)) {
        UiFramework.dialogs.modal.open(reactExports.createElement(SaveFormatModalDialog, { formatProps, quantityType: activeQuantityType, onDialogCloseArgs: args, onDialogClose: afterSaveFunction }), "saveQuantityFormat");
        return;
      }
    }
    afterSaveFunction(args);
  }, [activeFormatterSpec, activeQuantityType]);
  useSaveBeforeActivatingNewSettingsTab(UiFramework.settingsManager, saveChanges);
  useSaveBeforeClosingSettingsContainer(UiFramework.settingsManager, saveChanges);
  const processListboxValueChange = reactExports.useCallback((newQuantityType) => {
    const volumeFormatterSpec = IModelApp.quantityFormatter.findFormatterSpecByQuantityType(newQuantityType);
    setActiveFormatterSpec(volumeFormatterSpec);
    setActiveQuantityType(newQuantityType);
    setSaveEnabled(false);
    setClearEnabled(IModelApp.quantityFormatter.hasActiveOverride(newQuantityType, true));
  }, []);
  const onListboxValueChange = reactExports.useCallback((newQuantityType) => {
    if (activeFormatterSpec) {
      const formatProps = activeFormatterSpec.format.toJSON();
      const formatPropsInUse = IModelApp.quantityFormatter.findFormatterSpecByQuantityType(activeQuantityType).format.toJSON();
      if (formatPropsInUse && !formatAreEqual(formatProps, formatPropsInUse)) {
        newQuantityTypeRef.current = newQuantityType;
        UiFramework.dialogs.modal.open(reactExports.createElement(SaveFormatModalDialog, { formatProps, quantityType: activeQuantityType, onDialogCloseArgs: newQuantityType, onDialogClose: processListboxValueChange }), "saveQuantityFormat");
        return;
      }
    }
    processListboxValueChange(newQuantityType);
  }, [activeFormatterSpec, activeQuantityType, processListboxValueChange]);
  const handleOnFormatChanged = reactExports.useCallback(async (formatProps) => {
    if (activeFormatterSpec) {
      const newSpec = await IModelApp.quantityFormatter.generateFormatterSpecByType(activeQuantityType, formatProps);
      const formatPropsInUse = IModelApp.quantityFormatter.getFormatPropsByQuantityType(activeQuantityType);
      if (formatPropsInUse)
        setSaveEnabled(!formatAreEqual(formatProps, formatPropsInUse));
      setActiveFormatterSpec(newSpec);
    }
  }, [activeFormatterSpec, activeQuantityType]);
  const handleOnFormatSave = reactExports.useCallback(async () => {
    if (activeFormatterSpec) {
      const format = activeFormatterSpec.format.toJSON();
      await IModelApp.quantityFormatter.setOverrideFormat(activeQuantityType, format);
      setClearEnabled(true);
    }
  }, [activeFormatterSpec, activeQuantityType]);
  const handleOnFormatReset = reactExports.useCallback(async () => {
    await IModelApp.quantityFormatter.clearOverrideFormats(activeQuantityType);
    setClearEnabled(false);
  }, [activeQuantityType]);
  const processNewUnitSystem = reactExports.useCallback(async (unitSystem) => {
    await IModelApp.quantityFormatter.setActiveUnitSystem(unitSystem);
  }, []);
  const handleUnitSystemSelected = reactExports.useCallback(async (unitSystem) => {
    if (unitSystem === activeUnitSystemKey)
      return;
    saveChanges(processNewUnitSystem, unitSystem);
  }, [activeUnitSystemKey, processNewUnitSystem, saveChanges]);
  return reactExports.createElement(
    "div",
    { className: "quantity-formatting-container" },
    reactExports.createElement(UnitSystemSelector, { selectedUnitSystemKey: activeUnitSystemKey, availableUnitSystems, onUnitSystemSelected: handleUnitSystemSelected }),
    reactExports.createElement("span", { className: "uifw-quantity-format-section-label" }, translate("settings.quantity-formatting.formatSectionLabel")),
    reactExports.createElement(
      "div",
      { className: "uifw-quantity-types-container" },
      reactExports.createElement(
        "div",
        { className: "left-panel" },
        reactExports.createElement(Listbox, { id: "uifw-quantity-types-list", className: "uifw-quantity-types", onListboxValueChange, selectedValue: activeQuantityType }, [...IModelApp.quantityFormatter.quantityTypesRegistry.keys()].map((key) => {
          const entry = IModelApp.quantityFormatter.quantityTypesRegistry.get(key);
          const description = entry.description;
          const label = entry.label;
          return (
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            reactExports.createElement(
              ListboxItem,
              { key: entry.key, className: "quantity-type-list-entry", value: entry.key },
              reactExports.createElement("span", { className: "map-source-list-entry-name", title: description }, label)
            )
          );
        }))
      ),
      reactExports.createElement("div", { className: "right-panel" }, activeFormatterSpec && reactExports.createElement(
        reactExports.Fragment,
        null,
        reactExports.createElement(
          "div",
          { className: "uifw-quantity-types-right-top" },
          reactExports.createElement(
            "div",
            { className: "uifw-quantity-types-right-top-sample" },
            reactExports.createElement(FormatSample, { formatSpec: activeFormatterSpec, initialMagnitude: 1234.56, hideLabels: true })
          )
        ),
        reactExports.createElement(
          "div",
          { className: "uifw-quantity-types-formats" },
          reactExports.createElement(QuantityFormatPanel, { onFormatChange: handleOnFormatChanged, quantityType: activeQuantityType })
        ),
        reactExports.createElement(
          "div",
          { className: "components-button-panel" },
          reactExports.createElement(Button, { styleType: "cta", onClick: handleOnFormatSave, disabled: !saveEnabled }, translate("settings.quantity-formatting.setButtonLabel")),
          reactExports.createElement(Button, { styleType: "default", onClick: handleOnFormatReset, disabled: !clearEnabled }, translate("settings.quantity-formatting.clearButtonLabel"))
        )
      ))
    )
  );
}
function SaveFormatModalDialog({ formatProps, quantityType, onDialogCloseArgs, onDialogClose }) {
  const { translate } = useTranslation$1();
  const [isOpen, setIsOpen] = reactExports.useState(true);
  const handleClose = reactExports.useCallback(() => {
    setIsOpen(false);
    UiFramework.dialogs.modal.close();
    onDialogClose && onDialogClose(onDialogCloseArgs);
  }, [onDialogClose, onDialogCloseArgs]);
  const handleOK = reactExports.useCallback(() => {
    void IModelApp.quantityFormatter.setOverrideFormat(quantityType, formatProps);
    handleClose();
  }, [formatProps, handleClose, quantityType]);
  const handleCancel = reactExports.useCallback(() => {
    handleClose();
  }, [handleClose]);
  return reactExports.createElement(
    Dialog$1,
    { isOpen, onClose: handleCancel, className: "uifw-settings-quantityFormatting-saveFormatModalDialog", closeOnEsc: true, closeOnExternalClick: true, preventDocumentScroll: true },
    reactExports.createElement(Dialog$1.Backdrop, null),
    reactExports.createElement(
      Dialog$1.Main,
      { style: { minWidth: 200, maxWidth: 400, minHeight: 150, maxHeight: 400 } },
      reactExports.createElement(Dialog$1.TitleBar, { titleText: "Save Format Changes" }),
      reactExports.createElement(Dialog$1.Content, null, "Do you want to save changes to format before changing to another type?"),
      reactExports.createElement(
        Dialog$1.ButtonBar,
        null,
        reactExports.createElement(Button, { styleType: "high-visibility", onClick: handleOK }, translate("dialog.yes")),
        reactExports.createElement(Button, { onClick: handleCancel }, translate("dialog.no"))
      )
    )
  );
}
function QuantityFormatStory(props) {
  const { availableUnitSystems, ...rest } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    QuantityFormatSettingsPage,
    {
      availableUnitSystems: new Set(availableUnitSystems),
      ...rest
    },
    rest.initialQuantityType
  );
}
QuantityFormatStory.__docgenInfo = { "description": "", "methods": [], "displayName": "QuantityFormatStory", "props": { "availableUnitSystems": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "UnitSystemKey" }], "raw": "UnitSystemKey[]" }, "description": "" } }, "composes": ["Omit"] };
const meta = {
  title: "Components/QuantityFormat",
  component: QuantityFormatStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator, InitializerDecorator],
  args: {
    initialQuantityType: QuantityType.Length,
    availableUnitSystems: ["metric", "imperial", "usCustomary", "usSurvey"]
  },
  argTypes: {
    initialQuantityType: enumArgType(QuantityType)
  }
};
const Default = {};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
      ...(_c = (_b = Default.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Default"];
export {
  Default,
  __namedExportsOrder,
  meta as default
};
