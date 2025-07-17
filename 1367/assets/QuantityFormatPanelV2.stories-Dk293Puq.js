var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
import { ap as Select, a1 as Input, a5 as Label, bV as SvgHelpCircularHollow, bW as FormatType, bX as RatioType, bY as FractionalPrecision, bZ as DecimalPrecision, b_ as ScientificType, b$ as parseFormatType, c0 as getTraitString, c1 as Format, c2 as FormatTraits, aB as Checkbox, ac as Text, V as ExpandableBlock, be as Tag, c3 as FormatterSpec, I as IModelApp } from "./appui-react-DM43Y0g2.js";
import { A as AppUiDecorator, I as InitializerDecorator } from "./Decorators-CJLjmAjN.js";
import { r as reactExports, j as jsxRuntimeExports, I as IconButton, c as classnames } from "./iframe-CPf_22bH.js";
import { K as Key_enumExports } from "./Key.enum-xgF-LmbB.js";
import { u as useTranslation } from "./useTranslation-DJzLA55f.js";
import { D as Divider } from "./Divider-CbGHJc5r.js";
import "./client-AY0nUbTQ.js";
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
  if (!ensureCompatibleComposite) return possibleUnits;
  const conversionPromises = await getUnitConversionData(
    possibleUnits,
    parentUnit,
    unitsProvider
  );
  const conversionEntries = await Promise.all(conversionPromises);
  return conversionEntries.filter(
    (entry) => entry.unitProps.system === parentUnit.system && entry.conversion.factor < 1
  ).sort((a, b) => b.conversion.factor - a.conversion.factor).map((value) => value.unitProps);
}
function getUnitName(fullUnitName) {
  const nameParts = fullUnitName.split(/[.:]/);
  if (nameParts.length > 0) return nameParts[nameParts.length - 1];
  throw Error("Bad unit name encountered");
}
function UnitDescr(props) {
  const {
    name,
    label,
    parentUnitName,
    index,
    onUnitChange,
    onLabelChange,
    readonly,
    unitsProvider
  } = props;
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
      const parentUnit = await unitsProvider.findUnitByName(
        parentUnitName ? parentUnitName : name
      );
      if (parentUnit && currentUnitProps) {
        let potentialSubUnit;
        const potentialUnits = await getPossibleUnits(
          parentUnit,
          unitsProvider,
          index !== 0
        );
        if (index < 3) {
          const potentialSubUnits = await getPossibleUnits(
            currentUnitProps,
            unitsProvider,
            true
          );
          if (potentialSubUnits.length) potentialSubUnit = potentialSubUnits[0];
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
        if (index !== 0) options.push({ value: "REMOVEUNIT", label: "Remove" });
        if (isMounted.current) {
          setUnitOptions(options);
          setCurrentUnit(currentUnitProps);
        }
      }
    }
    void fetchAllowableUnitSelections();
  }, [index, label, name, parentUnitName, unitsProvider]);
  const handleOnUnitChange = reactExports.useCallback(
    (newValue) => {
      onUnitChange && onUnitChange(newValue, index);
    },
    [index, onUnitChange]
  );
  const handleOnLabelChange = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      onLabelChange && onLabelChange(e.target.value, index);
    },
    [index, onLabelChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Select,
      {
        options: unitOptions,
        "data-testid": `unit-${currentUnit.name}`,
        value: `${currentUnit.name}:${currentUnit.label}`,
        onChange: handleOnUnitChange,
        disabled: readonly,
        size: "small"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        "data-testid": `unit-label-${currentUnit.name}`,
        value: label,
        onChange: handleOnLabelChange,
        size: "small"
      }
    )
  ] });
}
UnitDescr.__docgenInfo = { "description": "Component use to display dropdown list of possible units.\n@internal", "methods": [], "displayName": "UnitDescr", "props": { "name": { "required": true, "tsType": { "name": "string" }, "description": "" }, "parentUnitName": { "required": false, "tsType": { "name": "string" }, "description": "" }, "label": { "required": true, "tsType": { "name": "string" }, "description": "" }, "index": { "required": true, "tsType": { "name": "number" }, "description": "" }, "unitsProvider": { "required": true, "tsType": { "name": "UnitsProvider" }, "description": "" }, "readonly": { "required": false, "tsType": { "name": "boolean" }, "description": "" }, "onUnitChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(value: string, index: number) => void", "signature": { "arguments": [{ "type": { "name": "string" }, "name": "value" }, { "type": { "name": "number" }, "name": "index" }], "return": { "name": "void" } } }, "description": "" }, "onLabelChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(value: string, index: number) => void", "signature": { "arguments": [{ "type": { "name": "string" }, "name": "value" }, { "type": { "name": "number" }, "name": "index" }], "return": { "name": "void" } } }, "description": "" } }, "composes": ["CommonProps"] };
function FormatUnitsV2(props) {
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
  const handleSetFormatProps = reactExports.useCallback(
    (newProps) => {
      setFormatProps(newProps);
      onUnitsChange && onUnitsChange(newProps);
    },
    [onUnitsChange]
  );
  const handleUnitLabelChange = reactExports.useCallback(
    (newLabel, index) => {
      if (formatProps.composite && formatProps.composite.units.length > index && index >= 0) {
        const units = formatProps.composite.units.map((entry, ndx) => {
          if (index === ndx) return { name: entry.name, label: newLabel };
          else return entry;
        });
        const composite = { ...formatProps.composite, units };
        const newFormatProps = { ...formatProps, composite };
        handleSetFormatProps(newFormatProps);
      }
    },
    [formatProps, handleSetFormatProps]
  );
  const handleUnitChange = reactExports.useCallback(
    (newUnit, index) => {
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
        const units = formatProps.composite && formatProps.composite.units.length ? [...formatProps.composite.units, { name: unitParts[1], label: unitParts[2] }] : [{ name: unitParts[1], label: unitParts[2] }];
        const composite = { ...formatProps.composite, units };
        const newFormatProps = { ...formatProps, composite };
        handleSetFormatProps(newFormatProps);
      } else {
        if (formatProps.composite && formatProps.composite.units.length > index && index >= 0) {
          const units = formatProps.composite.units.map((entry, ndx) => {
            if (index === ndx) return { name: unitParts[0], label: unitParts[1] };
            else return entry;
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
    },
    [formatProps, handleSetFormatProps]
  );
  const handleOnSpacerChange = reactExports.useCallback(
    (e) => {
      if (formatProps.composite) {
        const spacerValue = e.target.value.length ? e.target.value[0] : "";
        const composite = { ...formatProps.composite, spacer: spacerValue };
        const newFormatProps = { ...formatProps, composite };
        handleSetFormatProps(newFormatProps);
      }
    },
    [formatProps, handleSetFormatProps]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    ((_a2 = formatProps.composite) == null ? void 0 : _a2.units) ? formatProps.composite.units.map((value, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      UnitDescr,
      {
        name: value.name,
        label: value.label ?? "",
        parentUnitName: index > 0 ? formatProps.composite.units[index - 1].name : void 0,
        unitsProvider,
        index,
        onUnitChange: handleUnitChange,
        onLabelChange: handleUnitLabelChange,
        readonly: index < formatProps.composite.units.length - 1
      },
      value.name
    )) : persistenceUnit && /* @__PURE__ */ jsxRuntimeExports.jsx(UnitDescr, { name: persistenceUnit.name, label: persistenceUnit.label, unitsProvider, index: 0, onUnitChange: handleUnitChange, onLabelChange: handleUnitLabelChange }, persistenceUnit.name),
    ((_b2 = formatProps.composite) == null ? void 0 : _b2.units) && formatProps.composite.units.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "format-inline-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "uicore-label", as: "div", displayStyle: "inline", children: [
        translate("QuantityFormat.labels.compositeSpacer"),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { size: "small", styleType: "borderless", label: translate("QuantityFormat.labels.compositeSpacerDescription"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgHelpCircularHollow, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { "data-testid": "composite-spacer", value: formatProps.composite.spacer ?? "", onChange: handleOnSpacerChange, size: "small" }, "composite-spacer")
    ] })
  ] });
}
FormatUnitsV2.__docgenInfo = { "description": "Component to show/edit Units used for Quantity Formatting.\n@alpha\n@internal", "methods": [], "displayName": "FormatUnitsV2", "props": { "initialFormat": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "persistenceUnit": { "required": false, "tsType": { "name": "UnitProps" }, "description": "" }, "unitsProvider": { "required": true, "tsType": { "name": "UnitsProvider" }, "description": "" }, "onUnitsChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" } } };
function FormatTypeSelector(props) {
  const { type, onChange, ...rest } = props;
  const { translate } = useTranslation();
  const formatTypeSelectorId = reactExports.useId();
  const formatOptions = reactExports.useMemo(
    () => [
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
    ],
    [translate]
  );
  const handleOnChange = reactExports.useCallback(
    (newValue) => {
      onChange && onChange(newValue);
    },
    [onChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Label,
      {
        className: "uicore-label",
        as: "div",
        displayStyle: "inline",
        id: formatTypeSelectorId,
        children: translate("QuantityFormat.labels.type")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Select,
      {
        options: formatOptions,
        value: type,
        "aria-labelledby": formatTypeSelectorId,
        onChange: handleOnChange,
        size: "small",
        ...rest
      }
    )
  ] });
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
  const handleFormatTypeChange = reactExports.useCallback(
    (type) => {
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
          units: handleUnitsWhenFormatTypeChange(
            formatProps.composite.units,
            type
          )
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
    },
    [formatProps, onChange]
  );
  const formatType = parseFormatType(formatProps.type, "format");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    FormatTypeSelector,
    {
      ...rest,
      type: formatType,
      onChange: handleFormatTypeChange
    }
  ) });
}
FormatTypeOption.__docgenInfo = { "description": "Component to set the Quantity Format type.\n@alpha", "methods": [], "displayName": "FormatTypeOption", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" } }, "composes": ["CommonProps"] };
function UomSeparatorSelectorV2(props) {
  const { formatProps, onFormatChange, disabled, ...rest } = props;
  const { translate } = useTranslation();
  const uomSeparatorSelectorId = reactExports.useId();
  const handleOnChange = reactExports.useCallback(
    (value) => {
      const newFormatProps = { ...formatProps, uomSeparator: value };
      onFormatChange && onFormatChange(newFormatProps);
    },
    [formatProps, onFormatChange]
  );
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "format-inline-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { as: "div", displayStyle: "inline", id: uomSeparatorSelectorId, className: classnames("uicore-label", disabled && "uicore-disabled"), children: translate("QuantityFormat.labels.labelSeparator") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: separatorOptions, value: formatProps.uomSeparator ?? "", onChange: handleOnChange, size: "small", disabled, "aria-labelledby": uomSeparatorSelectorId, ...rest })
  ] });
}
function AppendUnitLabelV2(props) {
  const { formatProps, onFormatChange } = props;
  const { translate } = useTranslation();
  const appendUnitLabelId = reactExports.useId();
  const setFormatTrait = reactExports.useCallback(
    (trait, setActive) => {
      if (setActive) {
        const newFormatProps = { ...formatProps, formatTraits: formatProps.formatTraits ? [...formatProps.formatTraits, getTraitString(trait)] : [getTraitString(trait)] };
        onFormatChange && onFormatChange(newFormatProps);
      } else {
        const formatTraits = formatProps.formatTraits;
        if (Array.isArray(formatTraits)) {
          const newFormatProps = { ...formatProps, formatTraits: formatTraits.filter((entry) => entry !== getTraitString(trait)) };
          onFormatChange && onFormatChange(newFormatProps);
        } else {
          const newFormatProps = { ...formatProps, formatTraits: [] };
          onFormatChange && onFormatChange(newFormatProps);
        }
      }
    },
    [formatProps, onFormatChange]
  );
  const isFormatTraitSet = reactExports.useCallback(
    (trait) => {
      return Format.isFormatTraitSetInProps(formatProps, trait);
    },
    [formatProps]
  );
  const handleShowUnitLabelChange = reactExports.useCallback(
    (e) => {
      setFormatTrait(FormatTraits.ShowUnitLabel, e.target.checked);
    },
    [setFormatTrait]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "format-inline-row append-unit-label", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uicore-label", id: appendUnitLabelId, children: translate("QuantityFormat.labels.appendUnitLabel") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { "aria-labelledby": appendUnitLabelId, checked: isFormatTraitSet(FormatTraits.ShowUnitLabel), onChange: handleShowUnitLabelChange })
  ] });
}
UomSeparatorSelectorV2.__docgenInfo = { "description": "Component to set the unit of measure separator.\n@alpha\n@internal", "methods": [], "displayName": "UomSeparatorSelectorV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onFormatChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(formatProps: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "formatProps" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
AppendUnitLabelV2.__docgenInfo = { "description": "Component to set the append unit label flag.\n@alpha\n@internal", "methods": [], "displayName": "AppendUnitLabelV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onFormatChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(formatProps: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "formatProps" }], "return": { "name": "void" } } }, "description": "" } } };
function DecimalPrecisionSelector(props) {
  const { precision, onChange, ...rest } = props;
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
  const handleOnChange = reactExports.useCallback(
    (newValue) => {
      onChange && onChange(newValue);
    },
    [onChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Select,
    {
      options,
      value: precision,
      onChange: handleOnChange,
      size: "small",
      ...rest
    }
  );
}
DecimalPrecisionSelector.__docgenInfo = { "description": "Component use to set Decimal Precision\nthe unit label.\n@internal", "methods": [], "displayName": "DecimalPrecisionSelector", "props": { "precision": { "required": true, "tsType": { "name": "number" }, "description": "" }, "onChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(value: number) => void", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "value" }], "return": { "name": "void" } } }, "description": "" } }, "composes": ["CommonProps"] };
function FractionPrecisionSelector(props) {
  const { precision, onChange, ...rest } = props;
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
  const handleOnChange = reactExports.useCallback(
    (newValue) => {
      onChange && onChange(newValue);
    },
    [onChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Select,
    {
      options,
      value: precision,
      onChange: handleOnChange,
      size: "small",
      ...rest
    }
  );
}
FractionPrecisionSelector.__docgenInfo = { "description": "Component use to set Fraction precision\n@internal", "methods": [], "displayName": "FractionPrecisionSelector", "props": { "precision": { "required": true, "tsType": { "name": "number" }, "description": "" }, "onChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(value: number) => void", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "value" }], "return": { "name": "void" } } }, "description": "" } }, "composes": ["CommonProps"] };
function FormatPrecisionV2(props) {
  const { formatProps, onChange } = props;
  const { translate } = useTranslation();
  const precisionSelectorId = reactExports.useId();
  const handlePrecisionChange = reactExports.useCallback(
    (precision) => {
      const newFormatProps = { ...formatProps, precision };
      onChange && onChange(newFormatProps);
    },
    [formatProps, onChange]
  );
  const formatType = parseFormatType(formatProps.type, "format");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "format-inline-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "uicore-label", as: "div", displayStyle: "inline", id: precisionSelectorId, children: translate("QuantityFormat.labels.precision") }),
    formatType === FormatType.Fractional ? /* @__PURE__ */ jsxRuntimeExports.jsx(FractionPrecisionSelector, { "aria-labelledby": precisionSelectorId, precision: formatProps.precision ?? 0, onChange: handlePrecisionChange }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DecimalPrecisionSelector, { "aria-labelledby": precisionSelectorId, precision: formatProps.precision ?? 0, onChange: handlePrecisionChange })
  ] });
}
FormatPrecisionV2.__docgenInfo = { "description": "Component to show/edit Quantity Format Precision.\n@alpha\n@internal", "methods": [], "displayName": "FormatPrecisionV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" } } };
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
  const handleOnChange = reactExports.useCallback(
    (newValue) => {
      onChange && onChange(newValue);
    },
    [onChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Select,
    {
      options,
      value: separator,
      onChange: handleOnChange,
      size: "small",
      ...rest
    }
  );
}
DecimalSeparatorSelector.__docgenInfo = { "description": "Component use to set Decimal Separator\n@internal", "methods": [], "displayName": "DecimalSeparatorSelector", "props": { "separator": { "required": true, "tsType": { "name": "string" }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" }, "onChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(value: string) => void", "signature": { "arguments": [{ "type": { "name": "string" }, "name": "value" }], "return": { "name": "void" } } }, "description": "" } }, "composes": ["CommonProps"] };
function ShowTrailingZerosV2(props) {
  const { formatProps, onChange, disabled = false } = props;
  const { translate } = useTranslation();
  const showTrailZerosId = reactExports.useId();
  const setFormatTrait = reactExports.useCallback(
    (trait, setActive) => {
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
        if (!formatProps.formatTraits) return;
        const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
        formatTraits = traits.filter((traitEntry) => traitEntry !== traitStr);
      }
      const newFormatProps = { ...formatProps, formatTraits };
      onChange && onChange(newFormatProps);
    },
    [formatProps, onChange]
  );
  const handleShowTrailingZeroesChange = reactExports.useCallback(
    (e) => {
      setFormatTrait(FormatTraits.TrailZeroes, e.target.checked);
    },
    [setFormatTrait]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "format-inline-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "uicore-label", as: "div", displayStyle: "inline", id: showTrailZerosId, children: translate("QuantityFormat.labels.showTrailZerosLabel") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { "aria-labelledby": showTrailZerosId, checked: Format.isFormatTraitSetInProps(formatProps, FormatTraits.TrailZeroes), onChange: handleShowTrailingZeroesChange, disabled })
  ] });
}
ShowTrailingZerosV2.__docgenInfo = { "description": "Component to show/edit Show Trailing Zeros format trait.\n@alpha\n@internal", "methods": [], "displayName": "ShowTrailingZerosV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
function DecimalPrimaryChildren(props) {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "decimal-primary-children", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "format-type-row", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormatTypeOption, { formatProps, onChange: onFormatChange }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { variant: "small", isMuted: true, children: translate("QuantityFormat.labels.formatTypeSublabel") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: translate("QuantityFormat.labels.units") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormatUnitsV2, { unitsProvider, persistenceUnit, initialFormat: formatProps, onUnitsChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppendUnitLabelV2, { formatProps, onFormatChange }),
    Format.isFormatTraitSetInProps(formatProps, FormatTraits.ShowUnitLabel) && /* @__PURE__ */ jsxRuntimeExports.jsx(UomSeparatorSelectorV2, { formatProps, onFormatChange, disabled: false }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormatPrecisionV2, { formatProps, onChange: onFormatChange })
  ] });
}
function getDecimalPrimaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DecimalPrimaryChildren, { ...props });
}
function DecimalSecondaryChildren(props) {
  const { formatProps, onFormatChange } = props;
  const { translate } = useTranslation();
  const decimalSeparatorSelectorId = reactExports.useId();
  const keepDecimalPointId = reactExports.useId();
  const setFormatTrait = reactExports.useCallback(
    (trait, setActive) => {
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
        if (!formatProps.formatTraits) return;
        const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
        formatTraits = traits.filter((traitEntry) => traitEntry !== traitStr);
      }
      const newFormatProps = { ...formatProps, formatTraits };
      onFormatChange && onFormatChange(newFormatProps);
    },
    [formatProps, onFormatChange]
  );
  const handleDecimalSeparatorChange = reactExports.useCallback(
    (decimalSeparator) => {
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
      onFormatChange && onFormatChange(newFormatProps);
    },
    [formatProps, onFormatChange]
  );
  const handleKeepDecimalPointChange = reactExports.useCallback(
    (e) => {
      setFormatTrait(FormatTraits.KeepDecimalPoint, e.target.checked);
    },
    [setFormatTrait]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "decimal-secondary-children", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "format-inline-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "uicore-label", as: "div", displayStyle: "inline", id: decimalSeparatorSelectorId, children: translate("QuantityFormat.labels.decimalSeparatorLabel") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DecimalSeparatorSelector, { "aria-labelledby": decimalSeparatorSelectorId, separator: formatProps.decimalSeparator ?? ".", onChange: handleDecimalSeparatorChange })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "format-inline-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "uicore-label", as: "div", displayStyle: "inline", id: keepDecimalPointId, children: translate("QuantityFormat.labels.keepDecimalPointLabel") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { "aria-labelledby": keepDecimalPointId, checked: Format.isFormatTraitSetInProps(formatProps, FormatTraits.KeepDecimalPoint), onChange: handleKeepDecimalPointChange })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ShowTrailingZerosV2, { formatProps, onChange: onFormatChange })
  ] });
}
function getDecimalSecondaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DecimalSecondaryChildren, { ...props });
}
DecimalPrimaryChildren.__docgenInfo = { "description": "Primary children component for decimal format", "methods": [], "displayName": "DecimalPrimaryChildren", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "unitsProvider": { "required": true, "tsType": { "name": "UnitsProvider" }, "description": "" }, "onFormatChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(formatProps: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "formatProps" }], "return": { "name": "void" } } }, "description": "" }, "persistenceUnit": { "required": false, "tsType": { "name": "UnitProps" }, "description": "" } } };
getDecimalPrimaryChildren.__docgenInfo = { "description": "Returns the primary children for decimal format", "methods": [], "displayName": "getDecimalPrimaryChildren", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "unitsProvider": { "required": true, "tsType": { "name": "UnitsProvider" }, "description": "" }, "onFormatChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(formatProps: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "formatProps" }], "return": { "name": "void" } } }, "description": "" }, "persistenceUnit": { "required": false, "tsType": { "name": "UnitProps" }, "description": "" } } };
DecimalSecondaryChildren.__docgenInfo = { "description": "Secondary children component for decimal format", "methods": [], "displayName": "DecimalSecondaryChildren", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "unitsProvider": { "required": true, "tsType": { "name": "UnitsProvider" }, "description": "" }, "onFormatChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(formatProps: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "formatProps" }], "return": { "name": "void" } } }, "description": "" }, "persistenceUnit": { "required": false, "tsType": { "name": "UnitProps" }, "description": "" } } };
getDecimalSecondaryChildren.__docgenInfo = { "description": "Returns the secondary children for decimal format", "methods": [], "displayName": "getDecimalSecondaryChildren", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "unitsProvider": { "required": true, "tsType": { "name": "UnitsProvider" }, "description": "" }, "onFormatChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(formatProps: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "formatProps" }], "return": { "name": "void" } } }, "description": "" }, "persistenceUnit": { "required": false, "tsType": { "name": "UnitProps" }, "description": "" } } };
function FractionalPrimaryChildren(props) {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fractional-primary-children", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "format-type-row", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormatTypeOption, { formatProps, onChange: onFormatChange }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { variant: "small", isMuted: true, children: translate("QuantityFormat.labels.formatTypeSublabel") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: translate("QuantityFormat.labels.units") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormatUnitsV2, { unitsProvider, persistenceUnit, initialFormat: formatProps, onUnitsChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppendUnitLabelV2, { formatProps, onFormatChange }),
    Format.isFormatTraitSetInProps(formatProps, FormatTraits.ShowUnitLabel) && /* @__PURE__ */ jsxRuntimeExports.jsx(UomSeparatorSelectorV2, { formatProps, onFormatChange, disabled: false }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormatPrecisionV2, { formatProps, onChange: onFormatChange })
  ] });
}
function getFractionalPrimaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FractionalPrimaryChildren, { ...props });
}
function FractionalSecondaryChildren(props) {
  const { formatProps, onFormatChange } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fractional-secondary-children", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShowTrailingZerosV2, { formatProps, onChange: onFormatChange }) });
}
function getFractionalSecondaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FractionalSecondaryChildren, { ...props });
}
FractionalPrimaryChildren.__docgenInfo = { "description": "Primary children component for fractional format", "methods": [], "displayName": "FractionalPrimaryChildren" };
getFractionalPrimaryChildren.__docgenInfo = { "description": "Returns the primary children for fractional format", "methods": [], "displayName": "getFractionalPrimaryChildren" };
FractionalSecondaryChildren.__docgenInfo = { "description": "Secondary children component for fractional format", "methods": [], "displayName": "FractionalSecondaryChildren" };
getFractionalSecondaryChildren.__docgenInfo = { "description": "Returns the secondary children for fractional format", "methods": [], "displayName": "getFractionalSecondaryChildren" };
function ScientificPrimaryChildren(props) {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "scientific-primary-children", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "format-type-row", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormatTypeOption, { formatProps, onChange: onFormatChange }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { variant: "small", isMuted: true, children: translate("QuantityFormat.labels.formatTypeSublabel") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: translate("QuantityFormat.labels.units") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormatUnitsV2, { unitsProvider, persistenceUnit, initialFormat: formatProps, onUnitsChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppendUnitLabelV2, { formatProps, onFormatChange }),
    Format.isFormatTraitSetInProps(formatProps, FormatTraits.ShowUnitLabel) && /* @__PURE__ */ jsxRuntimeExports.jsx(UomSeparatorSelectorV2, { formatProps, onFormatChange, disabled: false }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormatPrecisionV2, { formatProps, onChange: onFormatChange })
  ] });
}
function getScientificPrimaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScientificPrimaryChildren, { ...props });
}
function ScientificSecondaryChildren(props) {
  const { formatProps, onFormatChange } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "scientific-secondary-children", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShowTrailingZerosV2, { formatProps, onChange: onFormatChange }) });
}
function getScientificSecondaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScientificSecondaryChildren, { ...props });
}
ScientificPrimaryChildren.__docgenInfo = { "description": "Primary children component for scientific format", "methods": [], "displayName": "ScientificPrimaryChildren" };
getScientificPrimaryChildren.__docgenInfo = { "description": "Returns the primary children for scientific format", "methods": [], "displayName": "getScientificPrimaryChildren" };
ScientificSecondaryChildren.__docgenInfo = { "description": "Secondary children component for scientific format", "methods": [], "displayName": "ScientificSecondaryChildren" };
getScientificSecondaryChildren.__docgenInfo = { "description": "Returns the secondary children for scientific format", "methods": [], "displayName": "getScientificSecondaryChildren" };
function StationSeparatorSelector(props) {
  const { separator, disabled, onChange, ...rest } = props;
  const { translate } = useTranslation();
  const handleOnChange = reactExports.useCallback(
    (newValue) => {
      onChange && onChange(newValue);
    },
    [onChange]
  );
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Select,
    {
      options: separatorOptions,
      disabled,
      value: separator,
      onChange: handleOnChange,
      size: "small",
      ...rest
    }
  );
}
StationSeparatorSelector.__docgenInfo = { "description": "Component use to setStation separator.\n@internal", "methods": [], "displayName": "StationSeparatorSelector", "props": { "separator": { "required": true, "tsType": { "name": "string" }, "description": "" }, "disabled": { "required": true, "tsType": { "name": "boolean" }, "description": "" }, "onChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(value: string) => void", "signature": { "arguments": [{ "type": { "name": "string" }, "name": "value" }], "return": { "name": "void" } } }, "description": "" } }, "composes": ["CommonProps"] };
function StationSeparatorV2(props) {
  const { formatProps, onChange, disabled = false } = props;
  const { translate } = useTranslation();
  const stationSeparatorSelectorId = reactExports.useId();
  const handleStationSeparatorChange = reactExports.useCallback(
    (value) => {
      const newFormatProps = { ...formatProps, stationSeparator: value };
      onChange && onChange(newFormatProps);
    },
    [formatProps, onChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "format-inline-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "uicore-label", as: "div", displayStyle: "inline", id: stationSeparatorSelectorId, children: translate("QuantityFormat.labels.stationSeparatorLabel") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StationSeparatorSelector, { "aria-labelledby": stationSeparatorSelectorId, separator: formatProps.stationSeparator ?? "+", disabled, onChange: handleStationSeparatorChange })
  ] });
}
StationSeparatorV2.__docgenInfo = { "description": "Component to show/edit Station Format Separator.\n@alpha\n@internal", "methods": [], "displayName": "StationSeparatorV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
function StationSizeSelector(props) {
  const { value, disabled, onChange, ...rest } = props;
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
  const handleOnChange = reactExports.useCallback(
    (newValue) => {
      onChange && onChange(newValue);
    },
    [onChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Select,
    {
      options: separatorOptions,
      disabled,
      value,
      onChange: handleOnChange,
      size: "small",
      ...rest
    }
  );
}
StationSizeSelector.__docgenInfo = { "description": "Component use to set Station size (number of digits from right until '+').\n@internal", "methods": [], "displayName": "StationSizeSelector", "props": { "value": { "required": true, "tsType": { "name": "number" }, "description": "" }, "disabled": { "required": true, "tsType": { "name": "boolean" }, "description": "" }, "onChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(value: number) => void", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "value" }], "return": { "name": "void" } } }, "description": "" } }, "composes": ["CommonProps"] };
function StationOffsetV2(props) {
  const { formatProps, onChange, disabled = false } = props;
  const { translate } = useTranslation();
  const stationOffsetSelectorId = reactExports.useId();
  const handleStationOffsetChange = reactExports.useCallback(
    (value) => {
      const newFormatProps = { ...formatProps, stationOffsetSize: value };
      onChange && onChange(newFormatProps);
    },
    [formatProps, onChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "format-inline-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "uicore-label", as: "div", displayStyle: "inline", id: stationOffsetSelectorId, children: translate("QuantityFormat.labels.stationOffsetLabel") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StationSizeSelector, { "aria-labelledby": stationOffsetSelectorId, value: formatProps.stationOffsetSize ?? 2, disabled, onChange: handleStationOffsetChange })
  ] });
}
StationOffsetV2.__docgenInfo = { "description": "Component to show/edit Station Format Offset Size.\n@alpha\n@internal", "methods": [], "displayName": "StationOffsetV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
function StationPrimaryChildren(props) {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "station-primary-children", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "format-type-row", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormatTypeOption, { formatProps, onChange: onFormatChange }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { variant: "small", isMuted: true, children: translate("QuantityFormat.labels.formatTypeSublabel") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: translate("QuantityFormat.labels.units") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormatUnitsV2, { unitsProvider, persistenceUnit, initialFormat: formatProps, onUnitsChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppendUnitLabelV2, { formatProps, onFormatChange }),
    Format.isFormatTraitSetInProps(formatProps, FormatTraits.ShowUnitLabel) && /* @__PURE__ */ jsxRuntimeExports.jsx(UomSeparatorSelectorV2, { formatProps, onFormatChange, disabled: false }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormatPrecisionV2, { formatProps, onChange: onFormatChange })
  ] });
}
function getStationPrimaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StationPrimaryChildren, { ...props });
}
function StationSecondaryChildren(props) {
  const { formatProps, onFormatChange } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "station-secondary-children", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StationOffsetV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StationSeparatorV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ShowTrailingZerosV2, { formatProps, onChange: onFormatChange })
  ] });
}
function getStationSecondaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StationSecondaryChildren, { ...props });
}
StationPrimaryChildren.__docgenInfo = { "description": "Primary children component for station format (always visible)", "methods": [], "displayName": "StationPrimaryChildren" };
getStationPrimaryChildren.__docgenInfo = { "description": "Returns the primary children for station format (always visible)", "methods": [], "displayName": "getStationPrimaryChildren" };
StationSecondaryChildren.__docgenInfo = { "description": "Secondary children component for station format", "methods": [], "displayName": "StationSecondaryChildren" };
getStationSecondaryChildren.__docgenInfo = { "description": "Returns the secondary children for station format (expandable/collapsible)", "methods": [], "displayName": "getStationSecondaryChildren" };
function FormatPanelV2(props) {
  const { formatProps, unitsProvider, onFormatChange, persistenceUnit } = props;
  const [isExpanded, setIsExpanded] = reactExports.useState(false);
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
        return [getDecimalPrimaryChildren(panelProps), getDecimalSecondaryChildren(panelProps)];
      case FormatType.Fractional:
        return [getFractionalPrimaryChildren(panelProps), getFractionalSecondaryChildren(panelProps)];
      case FormatType.Scientific:
        return [getScientificPrimaryChildren(panelProps), getScientificSecondaryChildren(panelProps)];
      case FormatType.Station:
        return [getStationPrimaryChildren(panelProps), getStationSecondaryChildren(panelProps)];
      default:
        return [getDecimalPrimaryChildren(panelProps), getDecimalSecondaryChildren(panelProps)];
    }
  }, [formatProps, unitsProvider, onFormatChange, persistenceUnit]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "format-panel-v2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "primary-children", children: primaryChildren }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ExpandableBlock, { caption: "Advanced Options", isExpanded, onToggle: () => setIsExpanded(!isExpanded), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "secondary-children", children: secondaryChildren }) })
  ] });
}
FormatPanelV2.__docgenInfo = { "description": "Format Panel V2 that uses primary and secondary children based on format type", "methods": [], "displayName": "FormatPanelV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "unitsProvider": { "required": true, "tsType": { "name": "UnitsProvider" }, "description": "" }, "onFormatChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(formatProps: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "formatProps" }], "return": { "name": "void" } } }, "description": "" }, "persistenceUnit": { "required": false, "tsType": { "name": "UnitProps" }, "description": "" } } };
function FormatSampleV2(props) {
  const { formatProps, unitsProvider, persistenceUnit, initialMagnitude } = props;
  const initialValue = initialMagnitude ?? 0;
  const [magnitude, setMagnitude] = reactExports.useState(initialValue);
  const [sampleValue, setSampleValue] = reactExports.useState(initialValue.toString());
  const [formatSpec, setFormatSpec] = reactExports.useState(
    void 0
  );
  const { translate } = useTranslation();
  reactExports.useEffect(() => {
    const createFormatterSpec = async () => {
      if (!persistenceUnit) {
        setFormatSpec(void 0);
        return;
      }
      try {
        const actualFormat = await Format.createFromJSON(
          "custom",
          unitsProvider,
          formatProps
        );
        const spec = await FormatterSpec.create(
          actualFormat.name,
          actualFormat,
          unitsProvider,
          persistenceUnit
        );
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
    if (Number.isNaN(newValue)) newValue = 0;
    setMagnitude(newValue);
    setSampleValue(newValue.toString());
  }, [sampleValue]);
  const handleOnValueChange = reactExports.useCallback(
    (event) => {
      setSampleValue(event.target.value);
    },
    []
  );
  const handleKeyDown = reactExports.useCallback(
    (e) => {
      if (e.key === Key_enumExports.Key.Enter.valueOf()) {
        let newValue = Number.parseFloat(sampleValue);
        if (Number.isNaN(newValue)) newValue = 0;
        setMagnitude(newValue);
        setSampleValue(newValue.toString());
        e.preventDefault();
      }
    },
    [sampleValue]
  );
  const activePersistenceUnitLabel = formatSpec ? formatSpec.persistenceUnit.label : (persistenceUnit == null ? void 0 : persistenceUnit.label) ?? "";
  const formattedValue = formatSpec ? formatSpec.applyFormatting(magnitude) : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "format-sample-v2-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "format-sample-v2-box", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { style: { marginBottom: "8px", fontWeight: "600" }, children: translate("QuantityFormat.labels.samplePreview") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "format-sample-v2-preview-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-testid": "format-sample-v2-input",
          className: "components-quantity-persistence-input format-sample-v2-input",
          value: sampleValue,
          onChange: handleOnValueChange,
          onKeyDown: handleKeyDown,
          onBlur: handleOnValueBlur,
          size: "small"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: activePersistenceUnitLabel }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, { orientation: "vertical" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { variant: "default", children: formattedValue }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, { orientation: "vertical" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { variant: "basic", children: formattedValue })
    ] })
  ] }) });
}
FormatSampleV2.__docgenInfo = { "description": "Component to show the persistence value and formatted value for FormatProps.\nCreates its own FormatterSpec internally based on formatProps and persistenceUnit.", "methods": [], "displayName": "FormatSampleV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "unitsProvider": { "required": true, "tsType": { "name": "UnitsProvider" }, "description": "" }, "persistenceUnit": { "required": false, "tsType": { "name": "UnitProps" }, "description": "" }, "initialMagnitude": { "required": false, "tsType": { "name": "number" }, "description": "" }, "hideLabels": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
function QuantityFormatPanelV2(props) {
  const { formatDefinition, unitsProvider, onFormatChange } = props;
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
  const handleOnFormatChanged = reactExports.useCallback(
    async (newProps) => {
      onFormatChange && onFormatChange(newProps);
    },
    [onFormatChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "components-quantityFormat-quantityPanel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormatSampleV2,
      {
        formatProps: formatDefinition,
        unitsProvider,
        persistenceUnit,
        initialMagnitude: props.initialMagnitude
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormatPanelV2,
      {
        formatProps: formatDefinition,
        unitsProvider,
        onFormatChange: handleOnFormatChanged,
        persistenceUnit
      }
    )
  ] });
}
QuantityFormatPanelV2.__docgenInfo = { "description": "Quantity Format Panel V2 that uses the new FormatPanelV2 structure", "methods": [], "displayName": "QuantityFormatPanelV2", "props": { "formatDefinition": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "unitsProvider": { "required": true, "tsType": { "name": "UnitsProvider" }, "description": "" }, "onFormatChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(formatProps: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "formatProps" }], "return": { "name": "void" } } }, "description": "" }, "initialMagnitude": { "required": false, "tsType": { "name": "number" }, "description": "" } } };
function QuantityFormatPanelV2Story(props) {
  const { formatProps, initialMagnitude = 123.456789 } = props;
  const [formatDefinition, setFormatDefinition] = reactExports.useState(formatProps);
  const handleFormatChange = reactExports.useCallback((newFormat) => {
    console.log("Format changed:", newFormat);
    setFormatDefinition(newFormat);
  }, []);
  reactExports.useEffect(() => {
    setFormatDefinition(formatProps);
  }, [formatProps]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "16px",
          width: "75%"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          QuantityFormatPanelV2,
          {
            formatDefinition,
            unitsProvider: IModelApp.quantityFormatter.unitsProvider,
            onFormatChange: handleFormatChange,
            initialMagnitude
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "20px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Current Format Definition:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "pre",
        {
          style: {
            background: "#f5f5f5",
            padding: "10px",
            borderRadius: "4px"
          },
          children: JSON.stringify(formatDefinition, null, 2)
        }
      )
    ] })
  ] });
}
QuantityFormatPanelV2Story.__docgenInfo = { "description": "", "methods": [], "displayName": "QuantityFormatPanelV2Story", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "initialMagnitude": { "required": false, "tsType": { "name": "number" }, "description": "" } } };
const meta = {
  title: "Components/QuantityFormatPanelV2",
  component: QuantityFormatPanelV2Story,
  tags: ["autodocs"],
  decorators: [AppUiDecorator, InitializerDecorator],
  parameters: {
    docs: {
      description: {
        component: "A new V2 Format Panel with primary and secondary children structure. Primary children are always visible, secondary children are expandable (default hidden)."
      }
    }
  },
  args: {
    formatProps: {
      type: FormatType.Decimal,
      precision: 4,
      showSignOption: "onlyNegative",
      decimalSeparator: ".",
      thousandSeparator: ",",
      uomSeparator: " ",
      composite: {
        includeZero: true,
        spacer: "",
        units: [{
          label: "m",
          name: "Units.M"
        }]
      }
    },
    initialMagnitude: 123.456789
  },
  argTypes: {
    formatProps: {
      control: {
        type: "object"
      },
      description: "Format properties object"
    },
    initialMagnitude: {
      control: {
        type: "number",
        step: 0.1
      },
      description: "Test magnitude to preview formatting"
    }
  }
};
const Default = {
  args: {
    formatProps: {
      type: FormatType.Decimal,
      precision: 4,
      composite: {
        includeZero: true,
        spacer: "",
        units: [{
          label: "m",
          name: "Units.M"
        }]
      }
    }
  }
};
const Decimal = {
  args: {
    formatProps: {
      type: FormatType.Decimal,
      precision: 2,
      thousandSeparator: ",",
      decimalSeparator: ".",
      composite: {
        includeZero: true,
        spacer: "",
        units: [{
          label: "m",
          name: "Units.M"
        }]
      }
    },
    initialMagnitude: 12345.6789
  }
};
const Scientific = {
  args: {
    formatProps: {
      type: FormatType.Scientific,
      precision: 3,
      scientificType: "normalized",
      composite: {
        includeZero: true,
        spacer: "",
        units: [{
          label: "m",
          name: "Units.M"
        }]
      }
    },
    initialMagnitude: 123456e-9
  }
};
const ScientificZeroNormalized = {
  args: {
    formatProps: {
      type: FormatType.Scientific,
      precision: 2,
      scientificType: "zeroNormalized",
      composite: {
        includeZero: true,
        spacer: "",
        units: [{
          label: "m",
          name: "Units.M"
        }]
      }
    },
    initialMagnitude: 123456.789
  }
};
const Fractional = {
  args: {
    formatProps: {
      type: FormatType.Fractional,
      precision: 8,
      // For fractional, this represents denominator power
      composite: {
        includeZero: true,
        spacer: "",
        units: [{
          label: "m",
          name: "Units.M"
        }]
      }
    },
    initialMagnitude: 12.375
    // Should show as 12 3/8
  }
};
const Station = {
  args: {
    formatProps: {
      type: FormatType.Station,
      precision: 2,
      stationOffsetSize: 2,
      stationSeparator: "+",
      composite: {
        includeZero: true,
        spacer: "",
        units: [{
          label: "m",
          name: "Units.M"
        }]
      }
    },
    initialMagnitude: 12345.67
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    formatProps: {\n      type: FormatType.Decimal,\n      precision: 4,\n      composite: {\n        includeZero: true,\n        spacer: "",\n        units: [{\n          label: "m",\n          name: "Units.M"\n        }]\n      }\n    }\n  }\n}',
      ...(_c = (_b = Default.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
Decimal.parameters = {
  ...Decimal.parameters,
  docs: {
    ...(_d = Decimal.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: '{\n  args: {\n    formatProps: {\n      type: FormatType.Decimal,\n      precision: 2,\n      thousandSeparator: ",",\n      decimalSeparator: ".",\n      composite: {\n        includeZero: true,\n        spacer: "",\n        units: [{\n          label: "m",\n          name: "Units.M"\n        }]\n      }\n    },\n    initialMagnitude: 12345.6789\n  }\n}',
      ...(_f = (_e = Decimal.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
Scientific.parameters = {
  ...Scientific.parameters,
  docs: {
    ...(_g = Scientific.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: '{\n  args: {\n    formatProps: {\n      type: FormatType.Scientific,\n      precision: 3,\n      scientificType: "normalized",\n      composite: {\n        includeZero: true,\n        spacer: "",\n        units: [{\n          label: "m",\n          name: "Units.M"\n        }]\n      }\n    },\n    initialMagnitude: 0.000123456\n  }\n}',
      ...(_i = (_h = Scientific.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
ScientificZeroNormalized.parameters = {
  ...ScientificZeroNormalized.parameters,
  docs: {
    ...(_j = ScientificZeroNormalized.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: '{\n  args: {\n    formatProps: {\n      type: FormatType.Scientific,\n      precision: 2,\n      scientificType: "zeroNormalized",\n      composite: {\n        includeZero: true,\n        spacer: "",\n        units: [{\n          label: "m",\n          name: "Units.M"\n        }]\n      }\n    },\n    initialMagnitude: 123456.789\n  }\n}',
      ...(_l = (_k = ScientificZeroNormalized.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
Fractional.parameters = {
  ...Fractional.parameters,
  docs: {
    ...(_m = Fractional.parameters) == null ? void 0 : _m.docs,
    source: {
      originalSource: '{\n  args: {\n    formatProps: {\n      type: FormatType.Fractional,\n      precision: 8,\n      // For fractional, this represents denominator power\n      composite: {\n        includeZero: true,\n        spacer: "",\n        units: [{\n          label: "m",\n          name: "Units.M"\n        }]\n      }\n    },\n    initialMagnitude: 12.375 // Should show as 12 3/8\n  }\n}',
      ...(_o = (_n = Fractional.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
    }
  }
};
Station.parameters = {
  ...Station.parameters,
  docs: {
    ...(_p = Station.parameters) == null ? void 0 : _p.docs,
    source: {
      originalSource: '{\n  args: {\n    formatProps: {\n      type: FormatType.Station,\n      precision: 2,\n      stationOffsetSize: 2,\n      stationSeparator: "+",\n      composite: {\n        includeZero: true,\n        spacer: "",\n        units: [{\n          label: "m",\n          name: "Units.M"\n        }]\n      }\n    },\n    initialMagnitude: 12345.67\n  }\n}',
      ...(_r = (_q = Station.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
    }
  }
};
const __namedExportsOrder = ["Default", "Decimal", "Scientific", "ScientificZeroNormalized", "Fractional", "Station"];
export {
  Decimal,
  Default,
  Fractional,
  Scientific,
  ScientificZeroNormalized,
  Station,
  __namedExportsOrder,
  meta as default
};
