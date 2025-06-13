var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { c7 as useTranslation, aw as Select, c8 as parseFormatType, bL as FormatType, aa as Input, K as Icon, c9 as formatTypeToString, ca as FractionalPrecision, cb as DecimalPrecision, cc as scientificTypeToString, cd as ScientificType, ce as Format, cf as getTraitString, cg as FormatTraits, aQ as Checkbox, ch as ShowSignOption, ci as showSignOptionToString, cj as parseShowSignOption, ck as parseScientificType, cl as FormatterSpec } from "./appui-react-Dl7Zotdf.js";
import { r as reactExports } from "./index-DVOlmhHI.js";
import { K as Key_enumExports } from "./Dialog-D8X5n1Ze.js";
import { c as cx } from "./SvgCloseSmall-DMa1Cocg.js";
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
const SvgProgressForward = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M5.57 15.5l-1.756-1.756L9.558 8 3.814 2.256 5.57.5l7.5 7.5z" })
  );
};
function DecimalPrecisionSelector(props) {
  const { precision, onChange, ...otherProps } = props;
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
  return reactExports.createElement(Select, { options, value: precision, onChange: handleOnChange, size: "small", ...otherProps });
}
function FractionPrecisionSelector(props) {
  const { precision, onChange, ...otherProps } = props;
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
  return reactExports.createElement(Select, { options, value: precision, onChange: handleOnChange, size: "small", ...otherProps });
}
function FormatPrecision(props) {
  const { formatProps, onChange } = props;
  const { translate } = useTranslation();
  const handlePrecisionChange = reactExports.useCallback((precision) => {
    const newFormatProps = { ...formatProps, precision };
    onChange && onChange(newFormatProps);
  }, [formatProps, onChange]);
  const formatType = parseFormatType(formatProps.type, "format");
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement("span", { className: "uicore-label" }, translate("QuantityFormat.labels.precision")),
    formatType === FormatType.Fractional ? reactExports.createElement(FractionPrecisionSelector, { "data-testid": "fraction-precision-selector", precision: formatProps.precision ?? 0, onChange: handlePrecisionChange }) : reactExports.createElement(DecimalPrecisionSelector, { "data-testid": "decimal-precision-selector", precision: formatProps.precision ?? 0, onChange: handlePrecisionChange })
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
  const handleKeyDown = reactExports.useCallback((e) => {
    if (e.key === Key_enumExports.Key.Enter.valueOf()) {
      let newValue = Number.parseFloat(sampleValue);
      if (Number.isNaN(newValue))
        newValue = 0;
      setMagnitude(newValue);
      setSampleValue(newValue.toString());
      e.preventDefault();
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
  const { type, onChange, ...otherProps } = props;
  const { translate } = useTranslation();
  const formatOptions = reactExports.useRef([
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
    }
  ]);
  const handleOnChange = reactExports.useCallback((newValue) => {
    onChange && onChange(newValue);
  }, [onChange]);
  return reactExports.createElement(Select, { options: formatOptions.current, value: type, onChange: handleOnChange, size: "small", ...otherProps });
}
function FormatTypeOption(props) {
  const { formatProps, onChange } = props;
  const { translate } = useTranslation();
  const handleFormatTypeChange = reactExports.useCallback((newType) => {
    var _a;
    const type = formatTypeToString(newType);
    let precision;
    let stationOffsetSize;
    let scientificType;
    switch (newType) {
      case FormatType.Scientific:
        precision = DecimalPrecision.Six;
        scientificType = scientificTypeToString(ScientificType.Normalized);
        break;
      case FormatType.Decimal:
        precision = DecimalPrecision.Four;
        break;
      case FormatType.Station:
        precision = DecimalPrecision.Two;
        stationOffsetSize = ((_a = formatProps.composite) == null ? void 0 : _a.units[0].name.toLocaleLowerCase().endsWith("m")) ? 3 : 2;
        break;
      case FormatType.Fractional:
        precision = FractionalPrecision.Eight;
        break;
    }
    const newFormatProps = {
      ...formatProps,
      type,
      precision,
      scientificType,
      stationOffsetSize
    };
    onChange && onChange(newFormatProps);
  }, [formatProps, onChange]);
  const formatType = parseFormatType(formatProps.type, "format");
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement("span", { className: "uicore-label.current" }, translate("QuantityFormat.labels.type")),
    reactExports.createElement(FormatTypeSelector, { "data-testid": "format-type-selector", type: formatType, onChange: handleFormatTypeChange })
  );
}
function UomSeparatorSelector(props) {
  const { separator, onChange, ...otherProps } = props;
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
  return reactExports.createElement(Select, { options: separatorOptions, value: separator, onChange: handleOnChange, size: "small", ...otherProps });
}
function FormatUnitLabel(props) {
  const { formatProps, onUnitLabelChange } = props;
  const { translate } = useTranslation();
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
  const handleShowUnitLabelChange = reactExports.useCallback((e) => {
    setFormatTrait(FormatTraits.ShowUnitLabel, e.target.checked);
  }, [setFormatTrait]);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement("span", { className: "uicore-label" }, translate("QuantityFormat.labels.appendUnitLabel")),
    reactExports.createElement(Checkbox, { "data-testid": "show-unit-label-checkbox", checked: isFormatTraitSet(FormatTraits.ShowUnitLabel), onChange: handleShowUnitLabelChange }),
    reactExports.createElement("span", { className: cx("uicore-label", !isFormatTraitSet(FormatTraits.ShowUnitLabel) && "uicore-disabled") }, translate("QuantityFormat.labels.labelSeparator")),
    reactExports.createElement(UomSeparatorSelector, { "data-testid": "uom-separator-select", separator: formatProps.uomSeparator ?? "", onChange: handleUomSeparatorChange, disabled: !isFormatTraitSet(FormatTraits.ShowUnitLabel) })
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
            label: "Add sub-unit"
          });
        }
        if (index !== 0)
          options.push({ value: "REMOVEUNIT", label: "Remove" });
        if (isMounted.current) {
          setUnitOptions(options);
          setCurrentUnit(currentUnitProps);
        }
      }
    }
    void fetchAllowableUnitSelections();
  }, [index, label, name, parentUnitName, unitsProvider]);
  const handleOnUnitChange = reactExports.useCallback((newValue) => {
    onUnitChange && onUnitChange(newValue, index);
  }, [index, onUnitChange]);
  const handleOnLabelChange = reactExports.useCallback((e) => {
    e.preventDefault();
    onLabelChange && onLabelChange(e.target.value, index);
  }, [index, onLabelChange]);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(Select, { options: unitOptions, "data-testid": `unit-${currentUnit.name}`, value: `${currentUnit.name}:${currentUnit.label}`, onChange: handleOnUnitChange, disabled: readonly, size: "small" }),
    reactExports.createElement(Input, { "data-testid": `unit-label-${currentUnit.name}`, value: label, onChange: handleOnLabelChange, size: "small" })
  );
}
function FormatUnits(props) {
  var _a, _b;
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
  const handleOnSpacerChange = reactExports.useCallback((e) => {
    if (formatProps.composite) {
      const spacerValue = e.target.value.length ? e.target.value[0] : "";
      const composite = { ...formatProps.composite, spacer: spacerValue };
      const newFormatProps = { ...formatProps, composite };
      handleSetFormatProps(newFormatProps);
    }
  }, [formatProps, handleSetFormatProps]);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    ((_a = formatProps.composite) == null ? void 0 : _a.units) ? formatProps.composite.units.map((value, index) => reactExports.createElement(UnitDescr, { key: value.name, name: value.name, label: value.label ?? "", parentUnitName: index > 0 ? formatProps.composite.units[index - 1].name : void 0, unitsProvider, index, onUnitChange: handleUnitChange, onLabelChange: handleUnitLabelChange, readonly: index < formatProps.composite.units.length - 1 })) : persistenceUnit && reactExports.createElement(UnitDescr, { key: persistenceUnit.name, name: persistenceUnit.name, label: persistenceUnit.label, unitsProvider, index: 0, onUnitChange: handleUnitChange, onLabelChange: handleUnitLabelChange }),
    ((_b = formatProps.composite) == null ? void 0 : _b.units) && formatProps.composite.units.length > 1 && reactExports.createElement(
      reactExports.Fragment,
      null,
      reactExports.createElement("span", { key: "composite-spacer-label", className: "uicore-label" }, translate("QuantityFormat.labels.compositeSpacer")),
      reactExports.createElement(Input, { key: "composite-spacer", "data-testid": "composite-spacer", value: formatProps.composite.spacer ?? "", onChange: handleOnSpacerChange, size: "small" })
    )
  );
}
function SignOptionSelector(props) {
  const { signOption, onChange, ...otherProps } = props;
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
  return reactExports.createElement(Select, { options, value: signOption, onChange: handleOnChange, size: "small", ...otherProps });
}
function ThousandsSelector(props) {
  const { separator, ...otherProps } = props;
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
  return reactExports.createElement(Select, { options: separatorOptions, value: separator, size: "small", ...otherProps });
}
function ThousandsSeparator(props) {
  const { formatProps, onChange } = props;
  const { translate } = useTranslation();
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
  const handleUseThousandsSeparatorChange = reactExports.useCallback((e) => {
    setFormatTrait(FormatTraits.Use1000Separator, e.target.checked);
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
    reactExports.createElement("span", { className: "uicore-label" }, translate("QuantityFormat.labels.useThousandSeparatorLabel")),
    reactExports.createElement(Checkbox, { "data-testid": "use-thousands-separator", checked: isFormatTraitSet(FormatTraits.Use1000Separator), onChange: handleUseThousandsSeparatorChange }),
    reactExports.createElement("span", { className: cx("uicore-label", !isFormatTraitSet(FormatTraits.Use1000Separator) && "uicore-disabled") }, translate("QuantityFormat.labels.thousandSeparatorLabel")),
    reactExports.createElement(ThousandsSelector, { "data-testid": "thousands-separator-selector", separator: formatProps.thousandSeparator ?? ",", disabled: !isFormatTraitSet(FormatTraits.Use1000Separator), onChange: handleThousandSeparatorChange })
  );
}
function DecimalSeparatorSelector(props) {
  const { separator, onChange, ...otherProps } = props;
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
  return reactExports.createElement(Select, { options, value: separator, onChange: handleOnChange, size: "small", ...otherProps });
}
function ScientificTypeSelector(props) {
  const { type, onChange, ...otherProps } = props;
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
  return reactExports.createElement(Select, { options: formatOptions, value: type, onChange: handleOnChange, size: "small", ...otherProps });
}
function StationSeparatorSelector(props) {
  const { separator, disabled, onChange, ...otherProps } = props;
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
  return reactExports.createElement(Select, { options: separatorOptions, disabled, value: separator, onChange: handleOnChange, size: "small", ...otherProps });
}
function StationSizeSelector(props) {
  const { value, disabled, onChange, ...otherProps } = props;
  const { translate } = useTranslation();
  const separatorOptions = [
    {
      value: 2,
      label: translate("QuantityFormat.station_size.two")
    },
    {
      value: 3,
      label: translate("QuantityFormat.station_size.three")
    }
  ];
  const handleOnChange = reactExports.useCallback((newValue) => {
    onChange && onChange(newValue);
  }, [onChange]);
  return reactExports.createElement(Select, { options: separatorOptions, disabled, value, onChange: handleOnChange, size: "small", ...otherProps });
}
function MiscFormatOptions(props) {
  const { formatProps, onChange, showOptions, onShowHideOptions, enableMinimumProperties } = props;
  const { translate } = useTranslation();
  const handleSetFormatProps = reactExports.useCallback((newFormatProps) => {
    onChange && onChange(newFormatProps);
  }, [onChange]);
  const isFormatTraitSet = reactExports.useCallback((trait) => {
    return Format.isFormatTraitSetInProps(formatProps, trait);
  }, [formatProps]);
  const handleShowSignChange = reactExports.useCallback((option) => {
    const newShowSignOption = showSignOptionToString(option);
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
  const handleShowTrailingZeroesChange = reactExports.useCallback((e) => {
    setFormatTrait(FormatTraits.TrailZeroes, e.target.checked);
  }, [setFormatTrait]);
  const handleKeepDecimalPointChange = reactExports.useCallback((e) => {
    setFormatTrait(FormatTraits.KeepDecimalPoint, e.target.checked);
  }, [setFormatTrait]);
  const handleKeepSingleZeroChange = reactExports.useCallback((e) => {
    setFormatTrait(FormatTraits.KeepSingleZero, e.target.checked);
  }, [setFormatTrait]);
  const handleZeroEmptyChange = reactExports.useCallback((e) => {
    setFormatTrait(FormatTraits.ZeroEmpty, e.target.checked);
  }, [setFormatTrait]);
  const handleUseFractionDashChange = reactExports.useCallback((e) => {
    setFormatTrait(FormatTraits.FractionDash, e.target.checked);
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
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      scientificType: scientificTypeToString(type)
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
  const handleKeyUpOnLink = reactExports.useCallback((e) => {
    if (e.key === Key_enumExports.Key.Enter.valueOf() || e.key === " ") {
      onShowHideOptions(!showOptions);
      e.preventDefault();
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
      reactExports.createElement("span", { className: "uicore-label" }, translate("QuantityFormat.labels.signOptionLabel")),
      reactExports.createElement(SignOptionSelector, { "data-testid": "sign-option-selector", signOption: showSignOption, onChange: handleShowSignChange }),
      reactExports.createElement("span", { className: cx("uicore-label", formatType !== FormatType.Station && "uicore-disabled") }, translate("QuantityFormat.labels.stationOffsetLabel")),
      reactExports.createElement(StationSizeSelector, { "data-testid": "station-size-selector", value: formatProps.stationOffsetSize ?? 2, disabled: formatType !== FormatType.Station, onChange: handleStationOffsetChange }),
      reactExports.createElement("span", { className: cx("uicore-label", formatType !== FormatType.Station && "uicore-disabled") }, translate("QuantityFormat.labels.stationSeparatorLabel")),
      reactExports.createElement(StationSeparatorSelector, { "data-testid": "station-separator-selector", separator: void 0 !== formatProps.stationSeparator ? formatProps.stationSeparator : "+", disabled: formatType !== FormatType.Station, onChange: handleStationSeparatorChange }),
      reactExports.createElement(ThousandsSeparator, { formatProps, onChange: handleFormatChange }),
      reactExports.createElement("span", { className: cx("uicore-label", formatType === FormatType.Fractional && "uicore-disabled") }, translate("QuantityFormat.labels.decimalSeparatorLabel")),
      reactExports.createElement(DecimalSeparatorSelector, { "data-testid": "decimal-separator-selector", separator: formatProps.decimalSeparator ?? ".", onChange: handleDecimalSeparatorChange, disabled: formatType === FormatType.Fractional }),
      reactExports.createElement("span", { className: "uicore-label" }, translate("QuantityFormat.labels.showTrailZerosLabel")),
      reactExports.createElement(Checkbox, { "data-testid": "show-trail-zeros", checked: isFormatTraitSet(FormatTraits.TrailZeroes), onChange: handleShowTrailingZeroesChange }),
      reactExports.createElement("span", { className: cx("uicore-label", formatType === FormatType.Fractional && "uicore-disabled") }, translate("QuantityFormat.labels.keepDecimalPointLabel")),
      reactExports.createElement(Checkbox, { "data-testid": "keep-decimal-point", checked: isFormatTraitSet(FormatTraits.KeepDecimalPoint), onChange: handleKeepDecimalPointChange }),
      reactExports.createElement("span", { className: "uicore-label" }, translate("QuantityFormat.labels.keepSingleZeroLabel")),
      reactExports.createElement(Checkbox, { "data-testid": "keep-single-zero", checked: isFormatTraitSet(FormatTraits.KeepSingleZero), onChange: handleKeepSingleZeroChange }),
      reactExports.createElement("span", { className: "uicore-label" }, translate("QuantityFormat.labels.zeroEmptyLabel")),
      reactExports.createElement(Checkbox, { "data-testid": "zero-empty", checked: isFormatTraitSet(FormatTraits.ZeroEmpty), onChange: handleZeroEmptyChange }),
      reactExports.createElement("span", { className: cx("uicore-label", formatType !== FormatType.Fractional && "uicore-disabled") }, translate("QuantityFormat.labels.fractionDashLabel")),
      reactExports.createElement(Checkbox, { "data-testid": "fraction-dash", checked: isFormatTraitSet(FormatTraits.FractionDash), onChange: handleUseFractionDashChange, disabled: formatType !== FormatType.Fractional }),
      reactExports.createElement("span", { className: cx("uicore-label", formatType !== FormatType.Scientific && "uicore-disabled") }, translate("QuantityFormat.labels.scientificTypeLabel")),
      reactExports.createElement(ScientificTypeSelector, { "data-testid": "scientific-type-selector", type: formatProps.scientificType && formatProps.scientificType.length > 0 ? parseScientificType(formatProps.scientificType, "custom") : ScientificType.Normalized, disabled: formatType !== FormatType.Scientific, onChange: handleScientificTypeChange }),
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
export {
  DeepCompare as D,
  FormatPanel as F,
  FormatSample as a
};
