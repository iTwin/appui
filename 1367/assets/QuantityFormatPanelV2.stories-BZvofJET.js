var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A;
import { a5 as Label, cR as SvgHelpCircularHollow, a1 as Input, ap as Select, cI as FormatType, cJ as RatioType, cK as FractionalPrecision, cL as DecimalPrecision, cM as ScientificType, cH as parseFormatType, cO as getTraitString, cN as Format, cP as FormatTraits, aB as Checkbox, cQ as ShowSignOption, cT as parseShowSignOption, ac as Text, cU as parseScientificType, cS as parseRatioType, an as Flex, d1 as Surface, V as ExpandableBlock, cV as FormatterSpec, I as IModelApp } from "./appui-react-CCwsTewB.js";
import { A as AppUiDecorator, I as InitializerDecorator } from "./Decorators-B499Q7AC.js";
import { r as reactExports, j as jsxRuntimeExports, I as IconButton, c as classnames, e } from "./iframe-CLuD2P-S.js";
import { K as Key_enumExports } from "./Key.enum-CPqlhvPk.js";
import { u as useTranslation } from "./useTranslation-KJMDb-JM.js";
import { D as Divider } from "./Divider-DwuTYpqA.js";
import "./client-DjW6bisg.js";
function getUnitName(fullUnitName) {
  const nameParts = fullUnitName.split(/[.:]/);
  if (nameParts.length > 0) return nameParts[nameParts.length - 1];
  throw Error("Bad unit name encountered");
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
function UnitDescrV2(props) {
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
  const handleOnUnitChange = reactExports.useCallback(
    (newValue) => {
      onUnitChange && onUnitChange(newValue, index);
    },
    [index, onUnitChange]
  );
  const handleOnLabelChange = reactExports.useCallback(
    (e2) => {
      e2.preventDefault();
      onLabelChange && onLabelChange(e2.target.value, index);
    },
    [index, onLabelChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Select,
      {
        id: unitSelectorId,
        options: unitOptions,
        "data-testid": `unit-${currentUnit.name}`,
        value: `${currentUnit.name}:${currentUnit.label}`,
        onChange: handleOnUnitChange,
        disabled: readonly,
        size: "small",
        className: "icr-quantityFormat-v2-unitSelect"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        id: labelInputId,
        "data-testid": `unit-label-${currentUnit.name}`,
        value: label,
        onChange: handleOnLabelChange,
        size: "small",
        disabled: readonly,
        className: "icr-quantityFormat-v2-unitInput"
      }
    )
  ] });
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
    (e2) => {
      if (formatProps.composite) {
        const spacerValue = e2.target.value.length ? e2.target.value[0] : "";
        const composite = { ...formatProps.composite, spacer: spacerValue };
        const newFormatProps = { ...formatProps, composite };
        handleSetFormatProps(newFormatProps);
      }
    },
    [formatProps, handleSetFormatProps]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    ((_a2 = formatProps.composite) == null ? void 0 : _a2.units) ? formatProps.composite.units.map((value, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      UnitDescrV2,
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
    )) : persistenceUnit && /* @__PURE__ */ jsxRuntimeExports.jsx(
      UnitDescrV2,
      {
        name: persistenceUnit.name,
        label: persistenceUnit.label,
        unitsProvider,
        index: 0,
        onUnitChange: handleUnitChange,
        onLabelChange: handleUnitLabelChange
      },
      persistenceUnit.name
    ),
    ((_b2 = formatProps.composite) == null ? void 0 : _b2.units) && formatProps.composite.units.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Label,
        {
          className: "uicore-label",
          displayStyle: "inline",
          htmlFor: compositeSpacerSelectorId,
          children: [
            translate("QuantityFormat.labels.compositeSpacer"),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              IconButton,
              {
                className: "format-help-tooltip",
                size: "small",
                styleType: "borderless",
                label: translate(
                  "QuantityFormat.labels.compositeSpacerDescription"
                ),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgHelpCircularHollow, {})
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: compositeSpacerSelectorId,
          value: formatProps.composite.spacer ?? "",
          onChange: handleOnSpacerChange,
          size: "small"
        }
      )
    ] })
  ] });
}
FormatUnitsV2.__docgenInfo = { "description": "Component to show/edit Units used for Quantity Formatting.\n@internal", "methods": [], "displayName": "FormatUnitsV2", "props": { "initialFormat": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "persistenceUnit": { "required": false, "tsType": { "name": "UnitProps" }, "description": "" }, "unitsProvider": { "required": true, "tsType": { "name": "UnitsProvider" }, "description": "" }, "onUnitsChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" } } };
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Label,
      {
        displayStyle: "inline",
        htmlFor: uomSeparatorSelectorId,
        className: classnames("uicore-label", disabled && "uicore-disabled"),
        children: translate("QuantityFormat.labels.labelSeparator")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Select,
      {
        options: separatorOptions,
        value: formatProps.uomSeparator ?? "",
        onChange: handleOnChange,
        size: "small",
        disabled,
        ...rest
      }
    )
  ] });
}
function AppendUnitLabelV2(props) {
  const { formatProps, onFormatChange } = props;
  const { translate } = useTranslation();
  const appendUnitLabelId = reactExports.useId();
  const setFormatTrait = reactExports.useCallback(
    (trait, setActive) => {
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
            formatTraits: formatTraits.filter(
              (entry) => entry !== getTraitString(trait)
            )
          };
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
    (e2) => {
      setFormatTrait(FormatTraits.ShowUnitLabel, e2.target.checked);
    },
    [setFormatTrait]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow append-unit-label", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "uicore-label", htmlFor: appendUnitLabelId, children: translate("QuantityFormat.labels.appendUnitLabel") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Checkbox,
      {
        id: appendUnitLabelId,
        checked: isFormatTraitSet(FormatTraits.ShowUnitLabel),
        onChange: handleShowUnitLabelChange
      }
    )
  ] });
}
UomSeparatorSelectorV2.__docgenInfo = { "description": "Component to set the unit of measure separator.\n@internal", "methods": [], "displayName": "UomSeparatorSelectorV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onFormatChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(formatProps: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "formatProps" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
AppendUnitLabelV2.__docgenInfo = { "description": "Component to set the append unit label flag.\n@internal", "methods": [], "displayName": "AppendUnitLabelV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onFormatChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(formatProps: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "formatProps" }], "return": { "name": "void" } } }, "description": "" } } };
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
      id,
      ...rest
    }
  );
}
DecimalPrecisionSelector.__docgenInfo = { "description": "Component use to set Decimal Precision\nthe unit label.\n@internal", "methods": [], "displayName": "DecimalPrecisionSelector", "props": { "precision": { "required": true, "tsType": { "name": "number" }, "description": "" }, "onChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(value: number) => void", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "value" }], "return": { "name": "void" } } }, "description": "" }, "id": { "required": false, "tsType": { "name": "string" }, "description": "" } }, "composes": ["CommonProps"] };
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
      id,
      ...rest
    }
  );
}
FractionPrecisionSelector.__docgenInfo = { "description": "Component use to set Fraction precision\n@internal", "methods": [], "displayName": "FractionPrecisionSelector", "props": { "precision": { "required": true, "tsType": { "name": "number" }, "description": "" }, "onChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(value: number) => void", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "value" }], "return": { "name": "void" } } }, "description": "" }, "id": { "required": false, "tsType": { "name": "string" }, "description": "" } }, "composes": ["CommonProps"] };
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Label,
      {
        className: "uicore-label",
        displayStyle: "inline",
        id: precisionSelectorId,
        children: translate("QuantityFormat.labels.precision")
      }
    ),
    formatType === FormatType.Fractional ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      FractionPrecisionSelector,
      {
        precision: formatProps.precision ?? 0,
        onChange: handlePrecisionChange,
        "aria-labelledby": precisionSelectorId
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      DecimalPrecisionSelector,
      {
        precision: formatProps.precision ?? 0,
        onChange: handlePrecisionChange,
        "aria-labelledby": precisionSelectorId
      }
    )
  ] });
}
FormatPrecisionV2.__docgenInfo = { "description": "Component to show/edit Quantity Format Precision.\n@internal", "methods": [], "displayName": "FormatPrecisionV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" } } };
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
function DecimalSeparatorV2(props) {
  const { formatProps, onChange } = props;
  const { translate } = useTranslation();
  const decimalSeparatorSelectorId = reactExports.useId();
  const handleSetFormatProps = reactExports.useCallback(
    (newProps) => {
      onChange && onChange(newProps);
    },
    [onChange]
  );
  const handleDecimalSeparatorChange = reactExports.useCallback(
    (decimalSeparator) => {
      let thousandSeparator = formatProps.thousandSeparator;
      if (Format.isFormatTraitSetInProps(
        formatProps,
        FormatTraits.Use1000Separator
      )) {
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
    },
    [formatProps, handleSetFormatProps]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Label,
      {
        className: "uicore-label",
        displayStyle: "inline",
        id: decimalSeparatorSelectorId,
        children: translate("QuantityFormat.labels.decimalSeparatorLabel")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DecimalSeparatorSelector,
      {
        separator: formatProps.decimalSeparator ?? ".",
        onChange: handleDecimalSeparatorChange,
        "aria-labelledby": decimalSeparatorSelectorId
      }
    )
  ] });
}
DecimalSeparatorV2.__docgenInfo = { "description": "Component to show/edit decimal separator.\n@internal", "methods": [], "displayName": "DecimalSeparatorV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" } }, "composes": ["CommonProps"] };
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
    (e2) => {
      setFormatTrait(FormatTraits.TrailZeroes, e2.target.checked);
    },
    [setFormatTrait]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Label,
      {
        className: "uicore-label",
        displayStyle: "inline",
        htmlFor: showTrailZerosId,
        children: translate("QuantityFormat.labels.showTrailZerosLabel")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Checkbox,
      {
        id: showTrailZerosId,
        checked: Format.isFormatTraitSetInProps(
          formatProps,
          FormatTraits.TrailZeroes
        ),
        onChange: handleShowTrailingZeroesChange,
        disabled
      }
    )
  ] });
}
ShowTrailingZerosV2.__docgenInfo = { "description": "Component to show/edit Show Trailing Zeros format trait.\n@internal", "methods": [], "displayName": "ShowTrailingZerosV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
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
      value: signOption,
      onChange: handleOnChange,
      size: "small",
      disabled,
      id,
      ...rest
    }
  );
}
SignOptionSelector.__docgenInfo = { "description": "Component use to set Sign option.\n@internal", "methods": [], "displayName": "SignOptionSelector", "props": { "signOption": { "required": true, "tsType": { "name": "ShowSignOption" }, "description": "" }, "onChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(value: ShowSignOption) => void", "signature": { "arguments": [{ "type": { "name": "ShowSignOption" }, "name": "value" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" }, "id": { "required": false, "tsType": { "name": "string" }, "description": "" } }, "composes": ["CommonProps"] };
function SignOptionV2(props) {
  const { formatProps, onChange, disabled = false } = props;
  const { translate } = useTranslation();
  const showSignOptionId = reactExports.useId();
  const showSignOption = reactExports.useMemo(
    () => parseShowSignOption(
      formatProps.showSignOption ?? "onlyNegative",
      "format"
    ),
    [formatProps.showSignOption]
  );
  const handleShowSignOptionChange = reactExports.useCallback(
    (value) => {
      const newFormatProps = { ...formatProps, showSignOption: value };
      onChange && onChange(newFormatProps);
    },
    [formatProps, onChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Label,
      {
        className: "uicore-label",
        displayStyle: "inline",
        id: showSignOptionId,
        children: translate("QuantityFormat.labels.signOptionLabel")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      IconButton,
      {
        className: "format-help-tooltip",
        styleType: "borderless",
        size: "small",
        label: translate("QuantityFormat.labels.signOptionTooltip"),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgHelpCircularHollow, {})
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SignOptionSelector,
      {
        "aria-labelledby": showSignOptionId,
        signOption: showSignOption,
        disabled,
        onChange: handleShowSignOptionChange
      }
    )
  ] });
}
SignOptionV2.__docgenInfo = { "description": "Component to show/edit Show Sign Option.\n@internal", "methods": [], "displayName": "SignOptionV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
function KeepDecimalPointV2(props) {
  const { formatProps, onChange, disabled } = props;
  const { translate } = useTranslation();
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
      onChange && onChange(newFormatProps);
    },
    [formatProps, onChange]
  );
  const handleKeepDecimalPointChange = reactExports.useCallback(
    (e2) => {
      setFormatTrait(FormatTraits.KeepDecimalPoint, e2.target.checked);
    },
    [setFormatTrait]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Label,
      {
        className: "uicore-label",
        displayStyle: "inline",
        htmlFor: keepDecimalPointId,
        children: translate("QuantityFormat.labels.keepDecimalPointLabel")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Checkbox,
      {
        id: keepDecimalPointId,
        checked: Format.isFormatTraitSetInProps(
          formatProps,
          FormatTraits.KeepDecimalPoint
        ),
        onChange: handleKeepDecimalPointChange,
        disabled
      }
    )
  ] });
}
KeepDecimalPointV2.__docgenInfo = { "description": "Component to show/edit Keep Decimal Point setting.\n@internal", "methods": [], "displayName": "KeepDecimalPointV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
function KeepSingleZeroV2(props) {
  const { formatProps, onChange, disabled } = props;
  const { translate } = useTranslation();
  const keepSingleZeroId = reactExports.useId();
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
  const handleKeepSingleZeroChange = reactExports.useCallback(
    (e2) => {
      setFormatTrait(FormatTraits.KeepSingleZero, e2.target.checked);
    },
    [setFormatTrait]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Label,
      {
        className: "uicore-label",
        displayStyle: "inline",
        htmlFor: keepSingleZeroId,
        children: translate("QuantityFormat.labels.keepSingleZeroLabel")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Checkbox,
      {
        id: keepSingleZeroId,
        checked: Format.isFormatTraitSetInProps(
          formatProps,
          FormatTraits.KeepSingleZero
        ),
        onChange: handleKeepSingleZeroChange,
        disabled
      }
    )
  ] });
}
KeepSingleZeroV2.__docgenInfo = { "description": "Component to show/edit Keep Single Zero setting.\n@internal", "methods": [], "displayName": "KeepSingleZeroV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
function ZeroEmptyV2(props) {
  const { formatProps, onChange, disabled } = props;
  const { translate } = useTranslation();
  const zeroEmptyId = reactExports.useId();
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
  const handleZeroEmptyChange = reactExports.useCallback(
    (e2) => {
      setFormatTrait(FormatTraits.ZeroEmpty, e2.target.checked);
    },
    [setFormatTrait]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Label,
      {
        className: "uicore-label",
        displayStyle: "inline",
        htmlFor: zeroEmptyId,
        children: translate("QuantityFormat.labels.zeroEmptyLabel")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Checkbox,
      {
        id: zeroEmptyId,
        checked: Format.isFormatTraitSetInProps(
          formatProps,
          FormatTraits.ZeroEmpty
        ),
        onChange: handleZeroEmptyChange,
        disabled
      }
    )
  ] });
}
ZeroEmptyV2.__docgenInfo = { "description": "Component to show/edit Zero Empty setting.\n@internal", "methods": [], "displayName": "ZeroEmptyV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Select,
    {
      options: separatorOptions,
      value: separator,
      size: "small",
      disabled,
      onChange,
      id,
      ...rest
    }
  );
}
ThousandsSelector.__docgenInfo = { "description": "Component use to set Quantity Format thousand group separator.\n@internal", "methods": [], "displayName": "ThousandsSelector", "props": { "separator": { "required": true, "tsType": { "name": "string" }, "description": "" }, "disabled": { "required": true, "tsType": { "name": "boolean" }, "description": "" }, "onChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(value: string) => void", "signature": { "arguments": [{ "type": { "name": "string" }, "name": "value" }], "return": { "name": "void" } } }, "description": "" }, "id": { "required": false, "tsType": { "name": "string" }, "description": "" } }, "composes": ["CommonProps"] };
function UseThousandsSeparator(props) {
  const { formatProps, onChange } = props;
  const { translate } = useTranslation();
  const useThousandsId = reactExports.useId();
  const handleSetFormatProps = reactExports.useCallback(
    (newProps) => {
      onChange && onChange(newProps);
    },
    [onChange]
  );
  const setFormatTrait = reactExports.useCallback(
    (trait, setActive) => {
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
    },
    [formatProps, handleSetFormatProps]
  );
  const handleUseThousandsSeparatorChange = reactExports.useCallback(
    (e2) => {
      setFormatTrait(FormatTraits.Use1000Separator, e2.target.checked);
    },
    [setFormatTrait]
  );
  const isFormatTraitSet = reactExports.useCallback(
    (trait) => {
      return Format.isFormatTraitSetInProps(formatProps, trait);
    },
    [formatProps]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Label,
      {
        className: "uicore-label",
        displayStyle: "inline",
        htmlFor: useThousandsId,
        children: translate("QuantityFormat.labels.useThousandSeparatorLabel")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Checkbox,
      {
        id: useThousandsId,
        checked: isFormatTraitSet(FormatTraits.Use1000Separator),
        onChange: handleUseThousandsSeparatorChange
      }
    )
  ] });
}
function ThousandsSeparatorSelector(props) {
  const { formatProps, onChange } = props;
  const { translate } = useTranslation();
  const thousandsSelectorId = reactExports.useId();
  const handleSetFormatProps = reactExports.useCallback(
    (newProps) => {
      onChange && onChange(newProps);
    },
    [onChange]
  );
  const isFormatTraitSet = reactExports.useCallback(
    (trait) => {
      return Format.isFormatTraitSetInProps(formatProps, trait);
    },
    [formatProps]
  );
  const handleThousandSeparatorChange = reactExports.useCallback(
    (thousandSeparator) => {
      let decimalSeparator = formatProps.decimalSeparator;
      if (isFormatTraitSet(FormatTraits.Use1000Separator)) {
        if (thousandSeparator === ".") decimalSeparator = ",";
        else decimalSeparator = ".";
      }
      const newFormatProps = {
        ...formatProps,
        thousandSeparator,
        decimalSeparator
      };
      handleSetFormatProps(newFormatProps);
    },
    [formatProps, isFormatTraitSet, handleSetFormatProps]
  );
  if (!isFormatTraitSet(FormatTraits.Use1000Separator)) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Label,
      {
        className: "uicore-label",
        displayStyle: "inline",
        htmlFor: thousandsSelectorId,
        children: translate("QuantityFormat.labels.thousandSeparatorLabel")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      IconButton,
      {
        className: "icr-quantityFormat-v2-formatHelpTooltip",
        styleType: "borderless",
        size: "small",
        label: translate("QuantityFormat.labels.thousandSelectorTooltip"),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgHelpCircularHollow, {})
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ThousandsSelector,
      {
        separator: formatProps.thousandSeparator ?? ",",
        disabled: false,
        onChange: handleThousandSeparatorChange,
        id: thousandsSelectorId
      }
    )
  ] });
}
UseThousandsSeparator.__docgenInfo = { "description": "Component to enable/disable the use of thousand separator.\n@internal", "methods": [], "displayName": "UseThousandsSeparator", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" } }, "composes": ["CommonProps"] };
ThousandsSeparatorSelector.__docgenInfo = { "description": "Component to select the thousands separator character.\n@internal", "methods": [], "displayName": "ThousandsSeparatorSelector", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" } }, "composes": ["CommonProps"] };
function DecimalPrimaryChildren(props) {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatPanel-primaryChildren", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icr-quantityFormat-v2-formatTypeRow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormatTypeOption, { formatProps, onChange: onFormatChange }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { variant: "small", isMuted: true, children: translate("QuantityFormat.labels.formatTypeSublabel") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: translate("QuantityFormat.labels.units") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormatUnitsV2,
      {
        unitsProvider,
        persistenceUnit,
        initialFormat: formatProps,
        onUnitsChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppendUnitLabelV2,
      {
        formatProps,
        onFormatChange
      }
    ),
    Format.isFormatTraitSetInProps(
      formatProps,
      FormatTraits.ShowUnitLabel
    ) && /* @__PURE__ */ jsxRuntimeExports.jsx(
      UomSeparatorSelectorV2,
      {
        formatProps,
        onFormatChange,
        disabled: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormatPrecisionV2, { formatProps, onChange: onFormatChange })
  ] });
}
function getDecimalPrimaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DecimalPrimaryChildren, { ...props });
}
function DecimalSecondaryChildren(props) {
  const { formatProps, onFormatChange } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatPanel-secondaryChildren", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SignOptionV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DecimalSeparatorV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      UseThousandsSeparator,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ThousandsSeparatorSelector,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(KeepDecimalPointV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ShowTrailingZerosV2,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(KeepSingleZeroV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ZeroEmptyV2, { formatProps, onChange: onFormatChange })
  ] });
}
function getDecimalSecondaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DecimalSecondaryChildren, { ...props });
}
DecimalPrimaryChildren.__docgenInfo = { "description": "Primary children component for decimal format\n@internal", "methods": [], "displayName": "DecimalPrimaryChildren", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "unitsProvider": { "required": true, "tsType": { "name": "UnitsProvider" }, "description": "" }, "onFormatChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(formatProps: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "formatProps" }], "return": { "name": "void" } } }, "description": "" }, "persistenceUnit": { "required": false, "tsType": { "name": "UnitProps" }, "description": "" } } };
getDecimalPrimaryChildren.__docgenInfo = { "description": "Returns the primary children for decimal format\n@internal", "methods": [], "displayName": "getDecimalPrimaryChildren", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "unitsProvider": { "required": true, "tsType": { "name": "UnitsProvider" }, "description": "" }, "onFormatChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(formatProps: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "formatProps" }], "return": { "name": "void" } } }, "description": "" }, "persistenceUnit": { "required": false, "tsType": { "name": "UnitProps" }, "description": "" } } };
DecimalSecondaryChildren.__docgenInfo = { "description": "Secondary children component for decimal format\n@internal", "methods": [], "displayName": "DecimalSecondaryChildren", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "unitsProvider": { "required": true, "tsType": { "name": "UnitsProvider" }, "description": "" }, "onFormatChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(formatProps: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "formatProps" }], "return": { "name": "void" } } }, "description": "" }, "persistenceUnit": { "required": false, "tsType": { "name": "UnitProps" }, "description": "" } } };
getDecimalSecondaryChildren.__docgenInfo = { "description": "Returns the secondary children for decimal format\n@internal", "methods": [], "displayName": "getDecimalSecondaryChildren", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "unitsProvider": { "required": true, "tsType": { "name": "UnitsProvider" }, "description": "" }, "onFormatChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(formatProps: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "formatProps" }], "return": { "name": "void" } } }, "description": "" }, "persistenceUnit": { "required": false, "tsType": { "name": "UnitProps" }, "description": "" } } };
function FractionDashV2(props) {
  const { formatProps, onChange, disabled = false } = props;
  const { translate } = useTranslation();
  const fractionDashId = reactExports.useId();
  const handleSetFormatProps = reactExports.useCallback(
    (newProps) => {
      onChange && onChange(newProps);
    },
    [onChange]
  );
  const setFormatTrait = reactExports.useCallback(
    (trait, setActive) => {
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
    },
    [formatProps, handleSetFormatProps]
  );
  const handleUseFractionDashChange = reactExports.useCallback(
    (e2) => {
      setFormatTrait(FormatTraits.FractionDash, e2.target.checked);
    },
    [setFormatTrait]
  );
  const isFormatTraitSet = reactExports.useCallback(
    (trait) => {
      return Format.isFormatTraitSetInProps(formatProps, trait);
    },
    [formatProps]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Label,
      {
        className: "uicore-label",
        displayStyle: "inline",
        htmlFor: fractionDashId,
        children: translate("QuantityFormat.labels.fractionDashLabel")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Checkbox,
      {
        id: fractionDashId,
        checked: isFormatTraitSet(FormatTraits.FractionDash),
        onChange: handleUseFractionDashChange,
        disabled
      }
    )
  ] });
}
FractionDashV2.__docgenInfo = { "description": "Component to show/edit Fraction Dash format trait.\n@internal", "methods": [], "displayName": "FractionDashV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" } }, "composes": ["CommonProps"] };
function FractionalPrimaryChildren(props) {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatPanel-primaryChildren", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icr-quantityFormat-v2-formatTypeRow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormatTypeOption, { formatProps, onChange: onFormatChange }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { variant: "small", isMuted: true, children: translate("QuantityFormat.labels.formatTypeSublabel") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: translate("QuantityFormat.labels.units") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormatUnitsV2,
      {
        unitsProvider,
        persistenceUnit,
        initialFormat: formatProps,
        onUnitsChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppendUnitLabelV2,
      {
        formatProps,
        onFormatChange
      }
    ),
    Format.isFormatTraitSetInProps(
      formatProps,
      FormatTraits.ShowUnitLabel
    ) && /* @__PURE__ */ jsxRuntimeExports.jsx(
      UomSeparatorSelectorV2,
      {
        formatProps,
        onFormatChange,
        disabled: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormatPrecisionV2, { formatProps, onChange: onFormatChange })
  ] });
}
function getFractionalPrimaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FractionalPrimaryChildren, { ...props });
}
function FractionalSecondaryChildren(props) {
  const { formatProps, onFormatChange } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatPanel-secondaryChildren", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SignOptionV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FractionDashV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      UseThousandsSeparator,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ThousandsSeparatorSelector,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ShowTrailingZerosV2,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(KeepSingleZeroV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ZeroEmptyV2, { formatProps, onChange: onFormatChange })
  ] });
}
function getFractionalSecondaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FractionalSecondaryChildren, { ...props });
}
FractionalPrimaryChildren.__docgenInfo = { "description": "Primary children component for fractional format\n@internal", "methods": [], "displayName": "FractionalPrimaryChildren" };
getFractionalPrimaryChildren.__docgenInfo = { "description": "Returns the primary children for fractional format\n@internal", "methods": [], "displayName": "getFractionalPrimaryChildren" };
FractionalSecondaryChildren.__docgenInfo = { "description": "Secondary children component for fractional format\n@internal", "methods": [], "displayName": "FractionalSecondaryChildren" };
getFractionalSecondaryChildren.__docgenInfo = { "description": "Returns the secondary children for fractional format\n@internal", "methods": [], "displayName": "getFractionalSecondaryChildren" };
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
  const handleOnChange = reactExports.useCallback(
    (newValue) => {
      onChange && onChange(newValue);
    },
    [onChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Select,
    {
      options: formatOptions,
      value: type,
      onChange: handleOnChange,
      size: "small",
      disabled,
      id,
      ...rest
    }
  );
}
ScientificTypeSelector.__docgenInfo = { "description": "Component use to set Scientific type.\n@internal", "methods": [], "displayName": "ScientificTypeSelector", "props": { "type": { "required": true, "tsType": { "name": "ScientificType" }, "description": "" }, "onChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(value: ScientificType) => void", "signature": { "arguments": [{ "type": { "name": "ScientificType" }, "name": "value" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" }, "id": { "required": false, "tsType": { "name": "string" }, "description": "" } }, "composes": ["CommonProps"] };
function ScientificTypeV2(props) {
  const { formatProps, onChange, disabled = false } = props;
  const { translate } = useTranslation();
  const scientificTypeSelectorId = reactExports.useId();
  const handleSetFormatProps = reactExports.useCallback(
    (newProps) => {
      onChange && onChange(newProps);
    },
    [onChange]
  );
  const handleScientificTypeChange = reactExports.useCallback(
    (type) => {
      const newFormatProps = {
        ...formatProps,
        scientificType: type
      };
      handleSetFormatProps(newFormatProps);
    },
    [formatProps, handleSetFormatProps]
  );
  const currentType = reactExports.useMemo(() => {
    return formatProps.scientificType && formatProps.scientificType.length > 0 ? parseScientificType(formatProps.scientificType, "custom") : ScientificType.Normalized;
  }, [formatProps.scientificType]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Label,
      {
        className: "uicore-label",
        displayStyle: "inline",
        htmlFor: scientificTypeSelectorId,
        children: [
          translate("QuantityFormat.labels.scientificTypeLabel"),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            IconButton,
            {
              className: "icr-quantityFormat-v2-formatHelpTooltip",
              styleType: "borderless",
              size: "small",
              label: translate("QuantityFormat.labels.scientificTypeTooltip"),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgHelpCircularHollow, {})
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScientificTypeSelector,
      {
        type: currentType,
        disabled,
        onChange: handleScientificTypeChange,
        id: scientificTypeSelectorId
      }
    )
  ] });
}
ScientificTypeV2.__docgenInfo = { "description": "Component to show/edit scientific type.\n@internal", "methods": [], "displayName": "ScientificTypeV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" } }, "composes": ["CommonProps"] };
function ScientificPrimaryChildren(props) {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatPanel-primaryChildren", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icr-quantityFormat-v2-formatTypeRow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormatTypeOption, { formatProps, onChange: onFormatChange }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { variant: "small", isMuted: true, children: translate("QuantityFormat.labels.formatTypeSublabel") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: translate("QuantityFormat.labels.units") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormatUnitsV2,
      {
        unitsProvider,
        persistenceUnit,
        initialFormat: formatProps,
        onUnitsChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppendUnitLabelV2,
      {
        formatProps,
        onFormatChange
      }
    ),
    Format.isFormatTraitSetInProps(
      formatProps,
      FormatTraits.ShowUnitLabel
    ) && /* @__PURE__ */ jsxRuntimeExports.jsx(
      UomSeparatorSelectorV2,
      {
        formatProps,
        onFormatChange,
        disabled: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormatPrecisionV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScientificTypeV2, { formatProps, onChange: onFormatChange })
  ] });
}
function getScientificPrimaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScientificPrimaryChildren, { ...props });
}
function ScientificSecondaryChildren(props) {
  const { formatProps, onFormatChange } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatPanel-secondaryChildren", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SignOptionV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DecimalSeparatorV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      UseThousandsSeparator,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ThousandsSeparatorSelector,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(KeepDecimalPointV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ShowTrailingZerosV2,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(KeepSingleZeroV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ZeroEmptyV2, { formatProps, onChange: onFormatChange })
  ] });
}
function getScientificSecondaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScientificSecondaryChildren, { ...props });
}
ScientificPrimaryChildren.__docgenInfo = { "description": "Primary children component for scientific format\n@internal", "methods": [], "displayName": "ScientificPrimaryChildren" };
getScientificPrimaryChildren.__docgenInfo = { "description": "Returns the primary children for scientific format\n@internal", "methods": [], "displayName": "getScientificPrimaryChildren" };
ScientificSecondaryChildren.__docgenInfo = { "description": "Secondary children component for scientific format\n@internal", "methods": [], "displayName": "ScientificSecondaryChildren" };
getScientificSecondaryChildren.__docgenInfo = { "description": "Returns the secondary children for scientific format\n@internal", "methods": [], "displayName": "getScientificSecondaryChildren" };
function StationSeparatorSelector(props) {
  const { separator, disabled, onChange, id, ...rest } = props;
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
      id,
      options: separatorOptions,
      disabled,
      value: separator,
      onChange: handleOnChange,
      size: "small",
      ...rest
    }
  );
}
StationSeparatorSelector.__docgenInfo = { "description": "Component use to setStation separator.\n@internal", "methods": [], "displayName": "StationSeparatorSelector", "props": { "separator": { "required": true, "tsType": { "name": "string" }, "description": "" }, "disabled": { "required": true, "tsType": { "name": "boolean" }, "description": "" }, "onChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(value: string) => void", "signature": { "arguments": [{ "type": { "name": "string" }, "name": "value" }], "return": { "name": "void" } } }, "description": "" }, "id": { "required": false, "tsType": { "name": "string" }, "description": "" } }, "composes": ["CommonProps"] };
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Label,
      {
        className: "uicore-label",
        displayStyle: "inline",
        id: stationSeparatorSelectorId,
        children: translate("QuantityFormat.labels.stationSeparatorLabel")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StationSeparatorSelector,
      {
        "aria-labelledby": stationSeparatorSelectorId,
        separator: formatProps.stationSeparator ?? "+",
        disabled,
        onChange: handleStationSeparatorChange
      }
    )
  ] });
}
StationSeparatorV2.__docgenInfo = { "description": "Component to show/edit Station Format Separator.\n@internal", "methods": [], "displayName": "StationSeparatorV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
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
      id,
      ...rest
    }
  );
}
StationSizeSelector.__docgenInfo = { "description": "Component use to set Station size (number of digits from right until '+').\n@internal", "methods": [], "displayName": "StationSizeSelector", "props": { "value": { "required": true, "tsType": { "name": "number" }, "description": "" }, "disabled": { "required": true, "tsType": { "name": "boolean" }, "description": "" }, "onChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(value: number) => void", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "value" }], "return": { "name": "void" } } }, "description": "" }, "id": { "required": false, "tsType": { "name": "string" }, "description": "" } }, "composes": ["CommonProps"] };
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Label,
      {
        className: "uicore-label",
        displayStyle: "inline",
        id: stationOffsetSelectorId,
        children: translate("QuantityFormat.labels.stationOffsetLabel")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StationSizeSelector,
      {
        "aria-labelledby": stationOffsetSelectorId,
        value: formatProps.stationOffsetSize ?? 2,
        disabled,
        onChange: handleStationOffsetChange
      }
    )
  ] });
}
StationOffsetV2.__docgenInfo = { "description": "Component to show/edit Station Format Offset Size.\n@internal", "methods": [], "displayName": "StationOffsetV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
function StationPrimaryChildren(props) {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatPanel-primaryChildren", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icr-quantityFormat-v2-formatTypeRow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormatTypeOption, { formatProps, onChange: onFormatChange }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { variant: "small", isMuted: true, children: translate("QuantityFormat.labels.formatTypeSublabel") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: translate("QuantityFormat.labels.units") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormatUnitsV2,
      {
        unitsProvider,
        persistenceUnit,
        initialFormat: formatProps,
        onUnitsChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppendUnitLabelV2,
      {
        formatProps,
        onFormatChange
      }
    ),
    Format.isFormatTraitSetInProps(
      formatProps,
      FormatTraits.ShowUnitLabel
    ) && /* @__PURE__ */ jsxRuntimeExports.jsx(
      UomSeparatorSelectorV2,
      {
        formatProps,
        onFormatChange,
        disabled: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormatPrecisionV2, { formatProps, onChange: onFormatChange })
  ] });
}
function getStationPrimaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StationPrimaryChildren, { ...props });
}
function StationSecondaryChildren(props) {
  const { formatProps, onFormatChange } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatPanel-secondaryChildren", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SignOptionV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StationOffsetV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StationSeparatorV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      UseThousandsSeparator,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ThousandsSeparatorSelector,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(KeepDecimalPointV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ShowTrailingZerosV2,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(KeepSingleZeroV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ZeroEmptyV2, { formatProps, onChange: onFormatChange })
  ] });
}
function getStationSecondaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StationSecondaryChildren, { ...props });
}
StationPrimaryChildren.__docgenInfo = { "description": "Primary children component for station format (always visible)\n@internal", "methods": [], "displayName": "StationPrimaryChildren" };
getStationPrimaryChildren.__docgenInfo = { "description": "Returns the primary children for station format (always visible)\n@internal", "methods": [], "displayName": "getStationPrimaryChildren" };
StationSecondaryChildren.__docgenInfo = { "description": "Secondary children component for station format\n@internal", "methods": [], "displayName": "StationSecondaryChildren" };
getStationSecondaryChildren.__docgenInfo = { "description": "Returns the secondary children for station format (expandable/collapsible)\n@internal", "methods": [], "displayName": "getStationSecondaryChildren" };
function AzimuthBaseUnitSelector(props) {
  const { currentUnit, unitsProvider, onChange, disabled } = props;
  const { translate } = useTranslation();
  const [unitOptions, setUnitOptions] = e.useState([
    { value: currentUnit, label: currentUnit }
  ]);
  const unitSelectorId = e.useId();
  e.useEffect(() => {
    async function loadUnitOptions() {
      try {
        const baseUnit = await unitsProvider.findUnitByName(currentUnit);
        if (baseUnit) {
          const familyUnits = await unitsProvider.getUnitsByFamily(
            baseUnit.phenomenon
          );
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
  const handleUnitChange = e.useCallback(
    (value) => {
      onChange(value);
    },
    [onChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Label,
      {
        className: "uicore-label",
        htmlFor: unitSelectorId,
        displayStyle: "inline",
        children: translate("QuantityFormat.labels.azimuthBaseUnit")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      IconButton,
      {
        size: "small",
        styleType: "borderless",
        label: translate("QuantityFormat.azimuthType.baseUnitTooltip"),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgHelpCircularHollow, {})
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Select,
      {
        id: unitSelectorId,
        value: currentUnit,
        options: unitOptions,
        onChange: handleUnitChange,
        size: "small",
        disabled
      }
    )
  ] });
}
function AzimuthOptionsV2(props) {
  var _a2;
  const { formatProps, onChange, disabled, unitsProvider } = props;
  const { translate } = useTranslation();
  const baseInputId = e.useId();
  const ccwCheckboxId = e.useId();
  const handleAzimuthBaseUnitChange = e.useCallback(
    (unitName) => {
      const newFormatProps = { ...formatProps, azimuthBaseUnit: unitName };
      onChange && onChange(newFormatProps);
    },
    [formatProps, onChange]
  );
  const handleAzimuthBaseChange = e.useCallback(
    (value) => {
      const newFormatProps = { ...formatProps, azimuthBase: value };
      onChange && onChange(newFormatProps);
    },
    [formatProps, onChange]
  );
  const handleAzimuthCCWChange = e.useCallback(
    (event) => {
      const newFormatProps = {
        ...formatProps,
        azimuthCounterClockwise: event.target.checked
      };
      onChange && onChange(newFormatProps);
    },
    [formatProps, onChange]
  );
  const onKeyDown = (event) => {
    const isLetter = /^[a-zA-Z]$/.test(event.key);
    if (event.key === "," || isLetter) {
      event.preventDefault();
    }
  };
  const handleInputChange = e.useCallback(
    (e2) => {
      const numValue = Number(e2.target.value);
      if (isNaN(numValue)) {
        e2.preventDefault();
        return;
      }
      handleAzimuthBaseChange(numValue);
    },
    [handleAzimuthBaseChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          className: "uicore-label",
          htmlFor: ccwCheckboxId,
          displayStyle: "inline",
          children: translate("QuantityFormat.labels.azimuthCounterClockwise")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IconButton,
        {
          size: "small",
          styleType: "borderless",
          label: translate("QuantityFormat.azimuthType.ccwFlagTooltip"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgHelpCircularHollow, {})
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Checkbox,
        {
          id: ccwCheckboxId,
          checked: formatProps.azimuthCounterClockwise ?? false,
          onChange: handleAzimuthCCWChange,
          disabled
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AzimuthBaseUnitSelector,
      {
        currentUnit: formatProps.azimuthBaseUnit ?? "Units.ARC_DEG",
        unitsProvider,
        onChange: handleAzimuthBaseUnitChange,
        disabled
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: baseInputId,
          className: "uicore-label",
          displayStyle: "inline",
          children: translate("QuantityFormat.labels.azimuthBase")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IconButton,
        {
          size: "small",
          styleType: "borderless",
          label: translate("QuantityFormat.azimuthType.baseTooltip"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgHelpCircularHollow, {})
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: baseInputId,
          type: "number",
          value: ((_a2 = formatProps.azimuthBase) == null ? void 0 : _a2.toString()) ?? "0",
          onKeyDown,
          onChange: handleInputChange,
          size: "small",
          disabled
        }
      )
    ] })
  ] });
}
AzimuthOptionsV2.__docgenInfo = { "description": "Component used to customize Azimuth options of a Format (V2).\n@alpha", "methods": [], "displayName": "AzimuthOptionsV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": true, "tsType": { "name": "boolean" }, "description": "" }, "unitsProvider": { "required": true, "tsType": { "name": "UnitsProvider" }, "description": "" } } };
function AzimuthPrimaryChildren(props) {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatPanel-primaryChildren", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icr-quantityFormat-v2-formatTypeRow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormatTypeOption, { formatProps, onChange: onFormatChange }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { variant: "small", isMuted: true, children: translate("QuantityFormat.labels.formatTypeSublabel") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: translate("QuantityFormat.labels.units") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormatUnitsV2,
      {
        unitsProvider,
        persistenceUnit,
        initialFormat: formatProps,
        onUnitsChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppendUnitLabelV2,
      {
        formatProps,
        onFormatChange
      }
    ),
    Format.isFormatTraitSetInProps(
      formatProps,
      FormatTraits.ShowUnitLabel
    ) && /* @__PURE__ */ jsxRuntimeExports.jsx(
      UomSeparatorSelectorV2,
      {
        formatProps,
        onFormatChange,
        disabled: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormatPrecisionV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AzimuthOptionsV2,
      {
        formatProps,
        onChange: onFormatChange,
        disabled: false,
        unitsProvider
      }
    )
  ] });
}
function getAzimuthPrimaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AzimuthPrimaryChildren, { ...props });
}
function AzimuthSecondaryChildren(props) {
  const { formatProps, onFormatChange } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatPanel-secondaryChildren", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SignOptionV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DecimalSeparatorV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      UseThousandsSeparator,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ThousandsSeparatorSelector,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(KeepDecimalPointV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ShowTrailingZerosV2,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(KeepSingleZeroV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ZeroEmptyV2, { formatProps, onChange: onFormatChange })
  ] });
}
function getAzimuthSecondaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AzimuthSecondaryChildren, { ...props });
}
AzimuthPrimaryChildren.__docgenInfo = { "description": "Primary children component for azimuth format (always visible)\n@internal", "methods": [], "displayName": "AzimuthPrimaryChildren" };
getAzimuthPrimaryChildren.__docgenInfo = { "description": "Returns the primary children for azimuth format (always visible)\n@internal", "methods": [], "displayName": "getAzimuthPrimaryChildren" };
AzimuthSecondaryChildren.__docgenInfo = { "description": "Secondary children component for azimuth format\n@internal", "methods": [], "displayName": "AzimuthSecondaryChildren" };
getAzimuthSecondaryChildren.__docgenInfo = { "description": "Returns the secondary children for azimuth format (expandable/collapsible)\n@internal", "methods": [], "displayName": "getAzimuthSecondaryChildren" };
function BearingPrimaryChildren(props) {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatPanel-primaryChildren", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icr-quantityFormat-v2-formatTypeRow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormatTypeOption, { formatProps, onChange: onFormatChange }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { variant: "small", isMuted: true, children: translate("QuantityFormat.labels.formatTypeSublabel") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: translate("QuantityFormat.labels.units") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormatUnitsV2,
      {
        unitsProvider,
        persistenceUnit,
        initialFormat: formatProps,
        onUnitsChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppendUnitLabelV2,
      {
        formatProps,
        onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormatPrecisionV2, { formatProps, onChange: onFormatChange })
  ] });
}
function BearingSecondaryChildren(_props) {
  const { formatProps, onFormatChange } = _props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatPanel-secondaryChildren", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DecimalSeparatorV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(KeepDecimalPointV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ShowTrailingZerosV2,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(KeepSingleZeroV2, { formatProps, onChange: onFormatChange })
  ] });
}
function getBearingPrimaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BearingPrimaryChildren, { ...props });
}
function getBearingSecondaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BearingSecondaryChildren, { ...props });
}
BearingPrimaryChildren.__docgenInfo = { "description": "Primary children component for bearing format (always visible)\n@internal", "methods": [], "displayName": "BearingPrimaryChildren" };
BearingSecondaryChildren.__docgenInfo = { "description": "Secondary children component for bearing format (expandable section)\n@internal", "methods": [], "displayName": "BearingSecondaryChildren" };
getBearingPrimaryChildren.__docgenInfo = { "description": "Returns the primary children for bearing format\n@internal", "methods": [], "displayName": "getBearingPrimaryChildren" };
getBearingSecondaryChildren.__docgenInfo = { "description": "Returns the secondary children for bearing format\n@internal", "methods": [], "displayName": "getBearingSecondaryChildren" };
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
      label: translate(
        "QuantityFormat.ratio-type.use-greatest-common-divisor.label"
      ),
      sublabel: translate(
        "QuantityFormat.ratio-type.use-greatest-common-divisor.description"
      )
    },
    {
      value: RatioType.ValueBased,
      label: translate("QuantityFormat.ratio-type.value-based.label"),
      sublabel: translate("QuantityFormat.ratio-type.value-based.description")
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
      options: formatOptions,
      value: type,
      onChange: handleOnChange,
      size: "small",
      disabled,
      menuClassName: "icr-quantityFormat-v2-ratioTypeSelector",
      ...rest
    }
  );
}
RatioTypeSelector.__docgenInfo = { "description": "Component use to set Ratio type.\n@alpha", "methods": [], "displayName": "RatioTypeSelector", "props": { "type": { "required": true, "tsType": { "name": "RatioType" }, "description": "" }, "onChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(value: RatioType) => void", "signature": { "arguments": [{ "type": { "name": "RatioType" }, "name": "value" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" }, "rest": { "required": false, "tsType": { "name": "ReactHTMLAttributes", "raw": "React.HTMLAttributes<HTMLDivElement>", "elements": [{ "name": "HTMLDivElement" }] }, "description": "" } } };
function RatioTypeV2(props) {
  const { formatProps, onChange, disabled = false } = props;
  const { translate } = useTranslation();
  const ratioTypeSelectorId = reactExports.useId();
  const handleSetFormatProps = reactExports.useCallback(
    (newProps) => {
      onChange && onChange(newProps);
    },
    [onChange]
  );
  const handleRatioTypeChange = reactExports.useCallback(
    (type) => {
      const newFormatProps = {
        ...formatProps,
        ratioType: type
      };
      handleSetFormatProps(newFormatProps);
    },
    [formatProps, handleSetFormatProps]
  );
  const currentType = reactExports.useMemo(() => {
    return formatProps.ratioType && formatProps.ratioType.length > 0 ? parseRatioType(formatProps.ratioType, "custom") : RatioType.NToOne;
  }, [formatProps.ratioType]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatInlineRow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Label,
      {
        className: "uicore-label",
        displayStyle: "inline",
        htmlFor: ratioTypeSelectorId,
        children: [
          translate("QuantityFormat.labels.ratioTypeLabel"),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            IconButton,
            {
              className: "icr-quantityFormat-v2-formatHelpTooltip",
              styleType: "borderless",
              size: "small",
              label: translate("QuantityFormat.ratio-type.default.description"),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgHelpCircularHollow, {})
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RatioTypeSelector,
      {
        type: currentType,
        disabled,
        onChange: handleRatioTypeChange,
        rest: { id: ratioTypeSelectorId }
      }
    )
  ] });
}
RatioTypeV2.__docgenInfo = { "description": "Component to show/edit ratio type.\n@internal", "methods": [], "displayName": "RatioTypeV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "onChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(format: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "format" }], "return": { "name": "void" } } }, "description": "" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "" } }, "composes": ["CommonProps"] };
function RatioPrimaryChildren(props) {
  const { formatProps, onFormatChange, unitsProvider, persistenceUnit } = props;
  const { translate } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatPanel-primaryChildren", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icr-quantityFormat-v2-formatTypeRow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormatTypeOption, { formatProps, onChange: onFormatChange }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { variant: "small", isMuted: true, children: translate("QuantityFormat.labels.formatTypeSublabel") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: translate("QuantityFormat.labels.units") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormatUnitsV2,
      {
        unitsProvider,
        persistenceUnit,
        initialFormat: formatProps,
        onUnitsChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppendUnitLabelV2,
      {
        formatProps,
        onFormatChange
      }
    ),
    Format.isFormatTraitSetInProps(
      formatProps,
      FormatTraits.ShowUnitLabel
    ) && /* @__PURE__ */ jsxRuntimeExports.jsx(
      UomSeparatorSelectorV2,
      {
        formatProps,
        onFormatChange,
        disabled: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormatPrecisionV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RatioTypeV2, { formatProps, onChange: onFormatChange })
  ] });
}
function getRatioPrimaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RatioPrimaryChildren, { ...props });
}
function RatioSecondaryChildren(props) {
  const { formatProps, onFormatChange } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatPanel-secondaryChildren", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SignOptionV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DecimalSeparatorV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      UseThousandsSeparator,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ThousandsSeparatorSelector,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(KeepDecimalPointV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ShowTrailingZerosV2,
      {
        formatProps,
        onChange: onFormatChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(KeepSingleZeroV2, { formatProps, onChange: onFormatChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ZeroEmptyV2, { formatProps, onChange: onFormatChange })
  ] });
}
function getRatioSecondaryChildren(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RatioSecondaryChildren, { ...props });
}
RatioPrimaryChildren.__docgenInfo = { "description": "Primary children component for ratio format (always visible)\n@internal", "methods": [], "displayName": "RatioPrimaryChildren" };
getRatioPrimaryChildren.__docgenInfo = { "description": "Returns the primary children for ratio format (always visible)\n@internal", "methods": [], "displayName": "getRatioPrimaryChildren" };
RatioSecondaryChildren.__docgenInfo = { "description": "Secondary children component for ratio format\n@internal", "methods": [], "displayName": "RatioSecondaryChildren" };
getRatioSecondaryChildren.__docgenInfo = { "description": "Returns the secondary children for ratio format (expandable/collapsible)\n@internal", "methods": [], "displayName": "getRatioSecondaryChildren" };
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Flex,
    {
      flexDirection: "column",
      alignItems: "flex-start",
      className: "icr-quantityFormat-v2-formatPanel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Surface,
          {
            elevation: 0,
            className: "icr-quantityFormat-v2-formatPanel-primaryChildren",
            children: primaryChildren
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ExpandableBlock,
          {
            title: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { variant: "leading", children: translate("QuantityFormat.labels.advancedOptions") }),
            isExpanded,
            onToggle: () => setIsExpanded(!isExpanded),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icr-quantityFormat-v2-formatPanel-secondaryChildren", children: secondaryChildren })
          }
        )
      ]
    }
  );
}
FormatPanelV2.__docgenInfo = { "description": "Format Panel V2 that uses primary and secondary children based on format type\n@beta", "methods": [], "displayName": "FormatPanelV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "unitsProvider": { "required": true, "tsType": { "name": "UnitsProvider" }, "description": "" }, "onFormatChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(formatProps: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "formatProps" }], "return": { "name": "void" } } }, "description": "" }, "persistenceUnit": { "required": false, "tsType": { "name": "UnitProps" }, "description": "" } } };
function FormatSampleV2(props) {
  const { formatProps, unitsProvider, persistenceUnit, initialMagnitude } = props;
  const initialValue = initialMagnitude ?? 0;
  const [magnitude, setMagnitude] = reactExports.useState(initialValue);
  const [sampleValue, setSampleValue] = reactExports.useState(initialValue.toString());
  const [formatSpec, setFormatSpec] = reactExports.useState(
    void 0
  );
  const { translate } = useTranslation();
  const inputId = reactExports.useId();
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
    (e2) => {
      if (e2.key === Key_enumExports.Key.Enter.valueOf()) {
        let newValue = Number.parseFloat(sampleValue);
        if (Number.isNaN(newValue)) newValue = 0;
        setMagnitude(newValue);
        setSampleValue(newValue.toString());
        e2.preventDefault();
      }
    },
    [sampleValue]
  );
  const activePersistenceUnitLabel = formatSpec ? formatSpec.persistenceUnit.label : (persistenceUnit == null ? void 0 : persistenceUnit.label) ?? "";
  const formattedValue = formatSpec ? formatSpec.applyFormatting(magnitude) : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icr-quantityFormat-v2-formatSample-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatSample-box", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Label,
      {
        className: "icr-quantityFormat-v2-samplePreviewTitle",
        htmlFor: inputId,
        children: translate("QuantityFormat.labels.samplePreview")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatSample-previewRow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "icr-quantityFormat-v2-formatSample-inputGroup", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: inputId,
            className: "icr-quantityFormat-v2-formatSample-input",
            value: sampleValue,
            onChange: handleOnValueChange,
            onKeyDown: handleKeyDown,
            onBlur: handleOnValueBlur,
            size: "small"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "icr-quantityFormat-v2-persistenceUnitLabel", children: activePersistenceUnitLabel })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, { orientation: "vertical" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "icr-quantityFormat-v2-formattedValueLabel", children: formattedValue })
    ] })
  ] }) });
}
FormatSampleV2.__docgenInfo = { "description": "Component to show the persistence value and formatted value for FormatProps.\nCreates its own FormatterSpec internally based on formatProps and persistenceUnit.\n@beta", "methods": [], "displayName": "FormatSampleV2", "props": { "formatProps": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "unitsProvider": { "required": true, "tsType": { "name": "UnitsProvider" }, "description": "" }, "persistenceUnit": { "required": false, "tsType": { "name": "UnitProps" }, "description": "" }, "initialMagnitude": { "required": false, "tsType": { "name": "number" }, "description": "" }, "hideLabels": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
function QuantityFormatPanelV2(props) {
  const {
    formatDefinition,
    unitsProvider,
    onFormatChange,
    showSample = true
  } = props;
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
    showSample && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormatSampleV2,
        {
          formatProps: formatDefinition,
          unitsProvider,
          persistenceUnit,
          initialMagnitude: props.initialMagnitude
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {})
    ] }),
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
QuantityFormatPanelV2.__docgenInfo = { "description": "Quantity Format Panel V2 that uses the new FormatPanelV2 structure\n@beta", "methods": [], "displayName": "QuantityFormatPanelV2", "props": { "formatDefinition": { "required": true, "tsType": { "name": "FormatProps" }, "description": "" }, "unitsProvider": { "required": true, "tsType": { "name": "UnitsProvider" }, "description": "" }, "onFormatChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(formatProps: FormatProps) => void", "signature": { "arguments": [{ "type": { "name": "FormatProps" }, "name": "formatProps" }], "return": { "name": "void" } } }, "description": "" }, "initialMagnitude": { "required": false, "tsType": { "name": "number" }, "description": "" }, "showSample": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
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
      formatTraits: ["showUnitLabel"],
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
      formatTraits: ["showUnitLabel"],
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
      formatTraits: ["showUnitLabel"],
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
      formatTraits: ["showUnitLabel"],
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
      stationOffsetSize: 3,
      stationSeparator: "+",
      formatTraits: ["showUnitLabel"],
      composite: {
        includeZero: true,
        spacer: "",
        units: [{
          label: "ft",
          name: "Units.FT"
        }]
      }
    },
    initialMagnitude: 12345.67
  }
};
const Azimuth = {
  args: {
    formatProps: {
      type: FormatType.Azimuth,
      precision: 1,
      formatTraits: ["showUnitLabel"],
      composite: {
        includeZero: true,
        spacer: "",
        units: [{
          label: "°",
          name: "Units.ARC_DEG"
        }]
      },
      revolutionUnit: "Units.RAD",
      azimuthBaseUnit: "Units.ARC_DEG",
      azimuthBase: 0
    },
    initialMagnitude: 123.5
    // Should show as azimuth angle
  }
};
const Bearing = {
  args: {
    formatProps: {
      type: FormatType.Bearing,
      precision: 0,
      uomSeparator: "",
      formatTraits: ["showUnitLabel"],
      composite: {
        includeZero: true,
        spacer: "",
        units: [{
          name: "Units.ARC_DEG",
          label: "°"
        }, {
          name: "Units.ARC_MINUTE",
          label: "'"
        }, {
          name: "Units.ARC_SECOND",
          label: '"'
        }]
      },
      revolutionUnit: "Units.RAD"
      // Bearing uses revolution unit
    },
    initialMagnitude: 180
  }
};
const Ratio = {
  args: {
    formatProps: {
      type: FormatType.Ratio,
      precision: 1,
      ratioType: RatioType.NToOne,
      composite: {
        includeZero: true,
        spacer: "",
        units: [{
          label: "m",
          name: "Units.M"
        }]
      }
    },
    initialMagnitude: 4.5
    // Should show as 4.5:1 ratio
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
      originalSource: '{\n  args: {\n    formatProps: {\n      type: FormatType.Decimal,\n      precision: 2,\n      thousandSeparator: ",",\n      decimalSeparator: ".",\n      formatTraits: ["showUnitLabel"],\n      composite: {\n        includeZero: true,\n        spacer: "",\n        units: [{\n          label: "m",\n          name: "Units.M"\n        }]\n      }\n    },\n    initialMagnitude: 12345.6789\n  }\n}',
      ...(_f = (_e = Decimal.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
Scientific.parameters = {
  ...Scientific.parameters,
  docs: {
    ...(_g = Scientific.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: '{\n  args: {\n    formatProps: {\n      type: FormatType.Scientific,\n      precision: 3,\n      scientificType: "normalized",\n      formatTraits: ["showUnitLabel"],\n      composite: {\n        includeZero: true,\n        spacer: "",\n        units: [{\n          label: "m",\n          name: "Units.M"\n        }]\n      }\n    },\n    initialMagnitude: 0.000123456\n  }\n}',
      ...(_i = (_h = Scientific.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
ScientificZeroNormalized.parameters = {
  ...ScientificZeroNormalized.parameters,
  docs: {
    ...(_j = ScientificZeroNormalized.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: '{\n  args: {\n    formatProps: {\n      type: FormatType.Scientific,\n      precision: 2,\n      scientificType: "zeroNormalized",\n      formatTraits: ["showUnitLabel"],\n      composite: {\n        includeZero: true,\n        spacer: "",\n        units: [{\n          label: "m",\n          name: "Units.M"\n        }]\n      }\n    },\n    initialMagnitude: 123456.789\n  }\n}',
      ...(_l = (_k = ScientificZeroNormalized.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
Fractional.parameters = {
  ...Fractional.parameters,
  docs: {
    ...(_m = Fractional.parameters) == null ? void 0 : _m.docs,
    source: {
      originalSource: '{\n  args: {\n    formatProps: {\n      type: FormatType.Fractional,\n      precision: 8,\n      // For fractional, this represents denominator power\n      formatTraits: ["showUnitLabel"],\n      composite: {\n        includeZero: true,\n        spacer: "",\n        units: [{\n          label: "m",\n          name: "Units.M"\n        }]\n      }\n    },\n    initialMagnitude: 12.375 // Should show as 12 3/8\n  }\n}',
      ...(_o = (_n = Fractional.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
    }
  }
};
Station.parameters = {
  ...Station.parameters,
  docs: {
    ...(_p = Station.parameters) == null ? void 0 : _p.docs,
    source: {
      originalSource: '{\n  args: {\n    formatProps: {\n      type: FormatType.Station,\n      precision: 2,\n      stationOffsetSize: 3,\n      stationSeparator: "+",\n      formatTraits: ["showUnitLabel"],\n      composite: {\n        includeZero: true,\n        spacer: "",\n        units: [{\n          label: "ft",\n          name: "Units.FT"\n        }]\n      }\n    },\n    initialMagnitude: 12345.67\n  }\n}',
      ...(_r = (_q = Station.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
    }
  }
};
Azimuth.parameters = {
  ...Azimuth.parameters,
  docs: {
    ...(_s = Azimuth.parameters) == null ? void 0 : _s.docs,
    source: {
      originalSource: '{\n  args: {\n    formatProps: {\n      type: FormatType.Azimuth,\n      precision: 1,\n      formatTraits: ["showUnitLabel"],\n      composite: {\n        includeZero: true,\n        spacer: "",\n        units: [{\n          label: "°",\n          name: "Units.ARC_DEG"\n        }]\n      },\n      revolutionUnit: "Units.RAD",\n      azimuthBaseUnit: "Units.ARC_DEG",\n      azimuthBase: 0.0\n    },\n    initialMagnitude: 123.5 // Should show as azimuth angle\n  }\n}',
      ...(_u = (_t = Azimuth.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
    }
  }
};
Bearing.parameters = {
  ...Bearing.parameters,
  docs: {
    ...(_v = Bearing.parameters) == null ? void 0 : _v.docs,
    source: {
      originalSource: `{
  args: {
    formatProps: {
      type: FormatType.Bearing,
      precision: 0,
      uomSeparator: "",
      formatTraits: ["showUnitLabel"],
      composite: {
        includeZero: true,
        spacer: "",
        units: [{
          name: "Units.ARC_DEG",
          label: "°"
        }, {
          name: "Units.ARC_MINUTE",
          label: "'"
        }, {
          name: "Units.ARC_SECOND",
          label: '"'
        }]
      },
      revolutionUnit: "Units.RAD" // Bearing uses revolution unit
    },
    initialMagnitude: 180
  }
}`,
      ...(_x = (_w = Bearing.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
    }
  }
};
Ratio.parameters = {
  ...Ratio.parameters,
  docs: {
    ...(_y = Ratio.parameters) == null ? void 0 : _y.docs,
    source: {
      originalSource: '{\n  args: {\n    formatProps: {\n      type: FormatType.Ratio,\n      precision: 1,\n      ratioType: RatioType.NToOne,\n      composite: {\n        includeZero: true,\n        spacer: "",\n        units: [{\n          label: "m",\n          name: "Units.M"\n        }]\n      }\n    },\n    initialMagnitude: 4.5 // Should show as 4.5:1 ratio\n  }\n}',
      ...(_A = (_z = Ratio.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
    }
  }
};
const __namedExportsOrder = ["Default", "Decimal", "Scientific", "ScientificZeroNormalized", "Fractional", "Station", "Azimuth", "Bearing", "Ratio"];
export {
  Azimuth,
  Bearing,
  Decimal,
  Default,
  Fractional,
  Ratio,
  Scientific,
  ScientificZeroNormalized,
  Station,
  __namedExportsOrder,
  meta as default
};
