/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Inputs
 */

import "./QuantityNumberInput.scss";
import classnames from "classnames";
import * as React from "react";
import { Key } from "ts-key-enum";
import { Icon } from "@itwin/core-react";
import type { QuantityTypeArg } from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import type {
  ParserSpec,
  UnitConversionSpec,
  UnitProps,
} from "@itwin/core-quantity";
import {
  DecimalPrecision,
  FormatterSpec,
  FormatTraits,
  FormatType,
  Parser,
} from "@itwin/core-quantity";
import { Input } from "@itwin/itwinui-react";
import {
  SvgCaretDown,
  SvgCaretDownSmall,
  SvgCaretUp,
  SvgCaretUpSmall,
} from "@itwin/itwinui-icons-react";

type InputProps = React.ComponentPropsWithoutRef<typeof Input>;

/** Step function prototype for [[QuantityNumberInput]] component
 * @beta
 */
export type StepFunctionProp =
  | number
  | ((direction: string) => number | undefined);

/** Properties for the [[QuantityNumberInput]] component
 * @beta
 */
export interface QuantityNumberInputProps
  extends Omit<
    InputProps,
    "value" | "min" | "max" | "step" | "onFocus" | "onChange"
  > {
  /** Initial magnitude in 'persistence' units. See `getPersistenceUnitByQuantityType` in [QuantityFormatter]($core-frontend).
   * Set to `undefined` to show placeholder text */
  persistenceValue?: number;
  /** CSS class name for the QuantityNumberInput component container div */
  containerClassName?: string;
  /** number or function	Number.MIN_SAFE_INTEGER */
  min?: number;
  /** number or function	defaults to Number.MAX_SAFE_INTEGER */
  max?: number;
  /** increment step value used while incrementing or decrementing (up/down buttons or arrow keys) defaults to 1. */
  step?: StepFunctionProp;
  /** Set to true to "snap" to the closest step value while incrementing or decrementing (up/down buttons or arrow keys). */
  snap?: boolean;
  /** Function to call when the quantity value is changed. The value returned will be in 'persistence' units. */
  onChange?: (value: number) => void;
  /** if true up/down buttons are shown larger and side by side */
  showTouchButtons?: boolean;
  /** Provides ability to return reference to HTMLInputElement */
  ref?: React.Ref<HTMLInputElement>;
  /** Type of quantity being input. */
  quantityType: QuantityTypeArg;
}

/** adjust formatter spec to show only primary unit without a label.  */
function adjustFormatterSpec(formatterSpec: FormatterSpec | undefined) {
  if (undefined === formatterSpec) return formatterSpec;
  const singleUnitConversion: UnitConversionSpec[] = [];
  singleUnitConversion.push(formatterSpec.unitConversions[0]);
  const newFormat = formatterSpec.format.clone({
    showOnlyPrimaryUnit: true,
    traits: formatterSpec.format.formatTraits & ~FormatTraits.ShowUnitLabel,
    type: FormatType.Decimal,
    precision:
      FormatType.Decimal !== formatterSpec.format.type
        ? DecimalPrecision.Four
        : formatterSpec.format.precision,
  });
  return new FormatterSpec(
    "single-value",
    newFormat,
    singleUnitConversion,
    formatterSpec.persistenceUnit
  );
}

function convertValueFromDisplayToPersistence(
  value: number,
  unitConversions: UnitConversionSpec[] | undefined,
  unit: UnitProps
) {
  if (!unitConversions || 0 === unitConversions.length) return value;

  const unitConversion = unitConversions.find(
    (spec) => spec.name === unit.name
  );
  if (!unitConversion) return value;

  const convertedValue =
    value * unitConversion.conversion.factor + unitConversion.conversion.offset;
  return convertedValue;
}

function getUnitLabel(parserSpec: ParserSpec | undefined) {
  if (undefined === parserSpec) return "";

  const format = parserSpec.format;
  if (!format.units || !format.units[0]) return parserSpec.outUnit.label;
  const [unit, label] = format.units[0];
  return label ?? unit.label;
}

const ForwardRefQuantityNumberInput = React.forwardRef<
  HTMLInputElement,
  QuantityNumberInputProps
>(function ForwardRefQuantityNumberInput(props, ref) {
  const {
    containerClassName,
    persistenceValue,
    min,
    max,
    onChange,
    onBlur,
    onKeyDown,
    step,
    snap,
    showTouchButtons,
    quantityType,
    ...otherProps
  } = props;
  const rawValueRef = React.useRef(persistenceValue);

  const [formatterSpec, setFormatterSpec] = React.useState(() =>
    adjustFormatterSpec(
      IModelApp.quantityFormatter.findFormatterSpecByQuantityType(quantityType)
    )
  );
  const [parserSpec, setParserSpec] = React.useState(() =>
    IModelApp.quantityFormatter.findParserSpecByQuantityType(quantityType)
  );

  const formatValue = React.useCallback(
    (value: number | undefined) => {
      if (undefined === value) return "";

      if (formatterSpec) {
        return formatterSpec.applyFormatting(value);
      }
      return value.toFixed(2);
    },
    [formatterSpec]
  );

  const lastFormattedValueRef = React.useRef(formatValue(persistenceValue));
  const [formattedValue, setFormattedValue] = React.useState(
    () => lastFormattedValueRef.current
  );

  React.useEffect(() => {
    return IModelApp.quantityFormatter.onActiveFormattingUnitSystemChanged.addListener(
      () => {
        setFormatterSpec(
          adjustFormatterSpec(
            IModelApp.quantityFormatter.findFormatterSpecByQuantityType(
              quantityType
            )
          )
        );
        setParserSpec(
          IModelApp.quantityFormatter.findParserSpecByQuantityType(quantityType)
        );
      }
    );
  }, [quantityType]);

  React.useEffect(() => {
    return IModelApp.quantityFormatter.onQuantityFormatsChanged.addListener(
      (args) => {
        const quantityKey =
          IModelApp.quantityFormatter.getQuantityTypeKey(quantityType);
        if (args.quantityType === quantityKey) {
          setFormatterSpec(
            adjustFormatterSpec(
              IModelApp.quantityFormatter.findFormatterSpecByQuantityType(
                quantityType
              )
            )
          );
          setParserSpec(
            IModelApp.quantityFormatter.findParserSpecByQuantityType(
              quantityType
            )
          );
        }
      }
    );
  }, [quantityType]);

  const unitLabel = getUnitLabel(parserSpec);

  // See if new initialValue props have changed since component mounted
  React.useEffect(() => {
    rawValueRef.current = persistenceValue;
    const currentFormattedValue = formatValue(rawValueRef.current);
    setFormattedValue(currentFormattedValue);
  }, [formatValue, persistenceValue]);

  // this is the unprocessed input from user, it is not processed until blur or enter key press
  const handleDisplayValueChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormattedValue(event.currentTarget.value);
    },
    []
  );

  const updateValue = React.useCallback(
    (newValue: number) => {
      let persistedValue = newValue;
      if (parserSpec) {
        // convert value from display unit to persistence unit
        const [unit] = parserSpec.format.units
          ? parserSpec.format.units[0]
          : [parserSpec.outUnit];
        persistedValue = convertValueFromDisplayToPersistence(
          newValue,
          parserSpec.unitConversions,
          unit
        );
        rawValueRef.current = persistedValue;
      }
      const newFormattedVal = formatValue(persistedValue);
      onChange && onChange(persistedValue);
      setFormattedValue(newFormattedVal);
    },
    [formatValue, onChange, parserSpec]
  );

  /**
   * Used internally to parse the argument x to it's numeric representation.
   * If the argument cannot be converted to finite number returns 0; If a
   * "precision" prop is specified uses it round the number with that
   * precision (no fixed precision here because the return value is float, not
   * string).
   */
  const parseInternal = React.useCallback(
    (x: string | undefined) => {
      if (!x) return 0;

      let n = parseFloat(x);
      if (isNaN(n) || !isFinite(n)) {
        n = 0;
      }

      const localPrecision = 6; // TODO get a reasonable value from format
      const q = Math.pow(10, localPrecision);
      const localMin = undefined === min ? Number.MIN_SAFE_INTEGER : min;
      const localMax = undefined === max ? Number.MAX_SAFE_INTEGER : max;
      n = Math.min(Math.max(n, localMin), localMax);
      n = Math.round(n * q) / q;

      return n;
    },
    [min, max]
  );

  const updateValueFromString = React.useCallback(
    (strValue: string) => {
      if (parserSpec) {
        const parseResult = IModelApp.quantityFormatter.parseToQuantityValue(
          strValue,
          parserSpec
        );
        // at this point we should have a string value in persistence units without a label
        if (Parser.isParsedQuantity(parseResult)) {
          const persistedValue = parseResult.value; // in persistence units
          // set strValue and let it go through parseInternal which will ensure min/max limits are observed
          strValue = formatValue(persistedValue)!;
        } else {
          if (rawValueRef.current) {
            // restore last known good value
            const lastKnownFormattedVal = formatValue(rawValueRef.current);
            setFormattedValue(lastKnownFormattedVal);
            return;
          }
        }
      }
      const newValue = parseInternal(strValue);
      if (undefined !== newValue) updateValue(newValue);
    },
    [formatValue, parseInternal, parserSpec, updateValue]
  );

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const newVal = parseInternal(event.target.value);
      onBlur && onBlur(event);
      updateValue(newVal);
    },
    [parseInternal, updateValue, onBlur]
  );

  const getIncrementValue = React.useCallback(
    (increment: boolean) => {
      if (typeof step === "function") {
        const stepVal = step(increment ? "up" : "down");
        return stepVal ? stepVal : 1;
      }

      return !step ? 1 : step;
    },
    [step]
  );

  /**
   * The internal method that actually sets the new value on the input
   */
  const applyStep = React.useCallback(
    (increment: boolean) => {
      const incrementValue = getIncrementValue(increment);

      let num =
        parseInternal(formattedValue) +
        (increment ? incrementValue : -incrementValue);
      if (snap) {
        num = Math.round(num / incrementValue) * incrementValue;
      }

      const localMin = undefined === min ? Number.MIN_SAFE_INTEGER : min;
      const localMax = undefined === max ? Number.MAX_SAFE_INTEGER : max;
      num = Math.min(Math.max(num, localMin), localMax);

      updateValue(num);
    },
    [
      formattedValue,
      getIncrementValue,
      max,
      min,
      parseInternal,
      snap,
      updateValue,
    ]
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === Key.Enter.valueOf()) {
        updateValueFromString(event.currentTarget.value);
        event.preventDefault();
      } else if (event.key === Key.Escape.valueOf()) {
        setFormattedValue(formatValue(rawValueRef.current));
        event.preventDefault();
      } else if (event.key === Key.ArrowDown.valueOf()) {
        applyStep(false);
        event.preventDefault();
      } else if (event.key === Key.ArrowUp.valueOf()) {
        applyStep(true);
        event.preventDefault();
      }
      onKeyDown && onKeyDown(event);
    },
    [onKeyDown, updateValueFromString, formatValue, applyStep]
  );

  const handleDownClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      applyStep(false);
      event.preventDefault();
    },
    [applyStep]
  );

  const handleUpClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      applyStep(true);
      event.preventDefault();
    },
    [applyStep]
  );

  const handleFocus = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      event.currentTarget.select();
    },
    []
  );

  const isDisabled = !!otherProps.disabled;
  const containerClasses = classnames(
    "component-quantity-number-input-container",
    containerClassName,
    showTouchButtons && "component-number-buttons-for-touch",
    isDisabled && "component-quantity-number-input-disabled"
  );

  const caretUp = showTouchButtons ? <SvgCaretUp /> : <SvgCaretUpSmall />;
  const caretDown = showTouchButtons ? <SvgCaretDown /> : <SvgCaretDownSmall />;

  return (
    <div className={containerClasses}>
      <div className="component-quantity-number-input-value-and-buttons-container">
        <Input
          ref={ref}
          value={formattedValue}
          onChange={handleDisplayValueChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          size="small"
          {...otherProps}
        />
        <div
          className={classnames(
            "component-quantity-number-input-buttons-container",
            showTouchButtons && "component-number-buttons-for-touch"
          )}
        >
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div
            className="component-quantity-number-input-button component-quantity-number-input-button-up"
            tabIndex={-1}
            onClick={handleUpClick}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
            <Icon iconSpec={caretUp} />
          </div>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div
            className="component-quantity-number-input-button component-quantity-number-input-button-down"
            tabIndex={-1}
            onClick={handleDownClick}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
            <Icon iconSpec={caretDown} />
          </div>
        </div>
      </div>
      <span className="component-quantity-number-input-suffix">
        {unitLabel}
      </span>
    </div>
  );
});

/** The QuantityNumberInput component accepts input for quantity values. The quantity value is shown as a single numeric value and the quantity's
 * "display" unit is shown next to the input control. The "display" unit is determined by the active unit system as defined by the [QuantityFormatter]($frontend).
 * The control also display buttons to increment and decrement the "displayed" value. The value reported by via the onChange function is in "persistence"
 * units that can be stored in the iModel.
 * @beta
 */
export const QuantityNumberInput: (
  props: QuantityNumberInputProps
) => React.ReactNode = ForwardRefQuantityNumberInput;
