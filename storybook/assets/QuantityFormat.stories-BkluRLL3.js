var _a, _b, _c;
import { cj as useTranslation, ar as Select, ck as parseFormatType, cl as FormatType, a7 as Input, H as Icon, cm as formatTypeToString, cn as FractionalPrecision, co as DecimalPrecision, cp as scientificTypeToString, cq as ScientificType, cr as Format, cs as getTraitString, ct as FormatTraits, aK as Checkbox, cu as ShowSignOption, cv as showSignOptionToString, cw as parseShowSignOption, cx as parseScientificType, cy as FormatterSpec, I as IModelApp, cz as getQuantityTypeKey, cA as isCustomQuantityTypeDefinition, G as useTranslation$1, U as UiFramework, cB as useSaveBeforeActivatingNewSettingsTab, cC as useSaveBeforeClosingSettingsContainer, cD as Listbox, cE as ListboxItem, cF as QuantityType } from "./appui-react-CmTEbVJu.js";
import { K as Key_enum, B as Button, b as Dialog$1 } from "./Dialog-DRJza1Fj.js";
import { A as AppUiDecorator, I as InitializerDecorator } from "./Decorators-Dl0WF0ZJ.js";
import { e as enumArgType } from "./Utils-BpDcsy7c.js";
import { j as jsxRuntimeExports } from "./jsx-runtime-f7WWSPSb.js";
import { r as reactExports } from "./index-R26Bfrts.js";
import { c as cx } from "./SvgCloseSmall-QhdYiNU4.js";
import "./_commonjs-dynamic-modules-lq-lihFa.js";
import "./iframe-B_Ok6LzO.js";
import "../sb-preview/runtime.js";
import "./index-CHBBkG1-.js";
import "./index-oY8aizO2.js";
import "./client-DRUEp2wC.js";
import "./debounce-CTTNlY27.js";
class DeepCompare {
  /** Construct comparison object with relative tolerance. */
  constructor(numberRelTol = 1e-12) {
    this.typeCounts = {
      numbers: 0,
      arrays: 0,
      functions: 0,
      objects: 0,
      strings: 0,
      booleans: 0,
      undefined: 0
    };
    this.propertyCounts = {};
    this.errorTracker = [];
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
    if (e.key === Key_enum.Key.Enter.valueOf()) {
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
    var _a2;
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
        stationOffsetSize = ((_a2 = formatProps.composite) == null ? void 0 : _a2.units[0].name.toLocaleLowerCase().endsWith("m")) ? 3 : 2;
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
    if (e.key === Key_enum.Key.Enter.valueOf() || e.key === " ") {
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
function createTextInputFormatPropEditor(key, label, inProps, getString, setString, fireFormatChange) {
  const value = getString(inProps);
  return reactExports.createElement(
    reactExports.Fragment,
    { key: `${key}` },
    reactExports.createElement("span", { key: `${key}-label`, className: "uicore-label" }, label),
    reactExports.createElement(Input, { "data-testid": `${key}-editor`, key: `${key}-editor`, value, size: "small", onChange: (e) => {
      const newProps = setString(inProps, e.currentTarget.value);
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
    reactExports.createElement(Checkbox, { "data-testid": `${key}-editor`, key: `${key}-editor`, checked: isChecked, onChange: (e) => {
      const newProps = setBool(inProps, e.target.checked);
      fireFormatChange(newProps);
    } })
  );
}
function formatAreEqual$1(obj1, obj2) {
  const compare = new DeepCompare();
  return compare.compare(obj1, obj2);
}
function QuantityFormatPanel(props) {
  const { quantityType, onFormatChange, ...otherProps } = props;
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
  return reactExports.createElement("div", { className: "components-quantityFormat-quantityPanel" }, persistenceUnit && formatProps && reactExports.createElement(FormatPanel, { onFormatChange: handleOnFormatChanged, ...otherProps, initialFormat: formatProps, unitsProvider: IModelApp.quantityFormatter.unitsProvider, persistenceUnit, providePrimaryChildren, provideSecondaryChildren, provideFormatSpec }));
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
