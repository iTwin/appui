/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Inputs
 */

import * as React from "react";
import classnames from "classnames";
import { Key } from "ts-key-enum";
import { Input } from "@itwin/itwinui-react";
import type { CommonProps } from "@itwin/core-react";
import type { ParseResults } from "@itwin/appui-abstract";
import "./ParsedInput.scss";

/** Props for [[ParsedInput]] control
 * @public
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof ParsedInput>`
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface ParsedInputProps extends CommonProps {
  /** InitialValue which is used to restore input field if ESC is pressed */
  initialValue: number;
  /** Function used to format the value */
  formatValue: (value: number) => string;
  /** Function used to parse user input into a value */
  parseString: (stringValue: string) => ParseResults;
  /** Function to call when value is changed */
  onChange?: (newValue: number) => void;
  /** if readonly then only the formatValue function is used. */
  readonly?: boolean;
  /** Provides ability to return reference to HTMLInputElement */
  ref?: React.Ref<HTMLInputElement>;
}

const ForwardRefParsedInput = React.forwardRef<
  HTMLInputElement,
  /* eslint-disable-next-line @typescript-eslint/no-deprecated */
  ParsedInputProps
>(function ForwardRefParsedInput(
  {
    initialValue,
    formatValue,
    parseString,
    readonly,
    className,
    style,
    onChange,
  },
  ref
) {
  const currentValueRef = React.useRef(initialValue);
  const isMountedRef = React.useRef(false);
  const lastFormattedValueRef = React.useRef(formatValue(initialValue));
  const [formattedValue, setFormattedValue] = React.useState(
    () => lastFormattedValueRef.current
  );
  const [hasBadInput, setHasBadInput] = React.useState(false);

  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // See if new initialValue props have changed since component mounted
  React.useEffect(() => {
    currentValueRef.current = initialValue;
    const currentFormattedValue = formatValue(currentValueRef.current);
    if (currentFormattedValue !== lastFormattedValueRef.current) {
      lastFormattedValueRef.current = currentFormattedValue;
      setFormattedValue(lastFormattedValueRef.current);
      setHasBadInput(false);
    }
  }, [formatValue, initialValue]);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormattedValue(event.currentTarget.value);
    },
    []
  );

  const updateValueFromString = React.useCallback(
    (strVal: string) => {
      if (lastFormattedValueRef.current === strVal) return;

      const parseResults = parseString(strVal);
      if (!parseResults.parseError) {
        if (
          undefined !== parseResults.value &&
          typeof parseResults.value === "number"
        ) {
          const currentValue = parseResults.value;
          if (currentValue !== currentValueRef.current) {
            currentValueRef.current = currentValue;
            onChange && onChange(currentValueRef.current);
          }
          if (isMountedRef.current) {
            lastFormattedValueRef.current = formatValue(currentValue);
            setFormattedValue(lastFormattedValueRef.current);
            setHasBadInput(false);
          }
        }
      } else {
        setHasBadInput(true);
      }
    },
    [formatValue, onChange, parseString]
  );

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      updateValueFromString(event.target.value);
    },
    [updateValueFromString]
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === Key.Enter.valueOf()) {
        updateValueFromString(event.currentTarget.value);
        event.preventDefault();
      }
      if (event.key === Key.Escape.valueOf()) {
        setFormattedValue(formatValue(currentValueRef.current));
        setHasBadInput(false);
        event.preventDefault();
      }
    },
    [formatValue, updateValueFromString]
  );

  const classNames = classnames(
    className,
    "components-parsed-input",
    hasBadInput && "components-parsed-input-has-error"
  );

  return (
    <Input
      data-testid="components-parsed-input"
      ref={ref}
      style={style}
      className={classNames}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onChange={handleChange}
      value={formattedValue}
      disabled={readonly}
      size="small"
    />
  );
});

/** Generic Input component that requires formatting and parsing functions to be passed in as props.
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export const ParsedInput: (props: ParsedInputProps) => React.ReactNode =
  ForwardRefParsedInput;
