/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Input } from "@itwin/itwinui-react";
import type { NumericValue } from "../values/Values.js";

/* v8 ignore start */

/**
 * Props for FormattedNumericInput component.
 * @beta
 */
interface FormattedNumericInputProps {
  value: NumericValue;
  onChange: (value: NumericValue) => void;
  parseValue: (value: string) => number | undefined;
  formatValue: (num: number) => string;
  disabled?: boolean;
  size?: "small" | "large";
}

/**
 * A numeric input that allows to pass custom parsing/formatting logic to handle values with units etc.
 * @beta
 */
export function FormattedNumericInput({
  onChange,
  value,
  parseValue,
  formatValue,
  disabled,
  size,
}: FormattedNumericInputProps) {
  const { currentValue, inputProps } = useParsedNumberInput({
    initialValue: value.rawValue,
    parseValue,
    formatValue,
  });
  const onChangeRef = React.useRef(onChange);
  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  React.useEffect(() => {
    onChangeRef.current(currentValue);
  }, [currentValue]);

  return <Input disabled={disabled} size={size} {...inputProps} />;
}

function useParsedNumberInput({
  initialValue,
  formatValue,
  parseValue,
}: {
  initialValue: number | undefined;
  parseValue: (value: string) => number | undefined;
  formatValue: (num: number) => string;
}) {
  interface State {
    value: NumericValue;
    placeholder: string;
  }

  const [state, setState] = React.useState<State>(() => {
    return {
      value: {
        rawValue: initialValue,
        displayValue:
          initialValue !== undefined ? formatValue(initialValue) : "",
      },
      placeholder: formatValue(initialValue ?? 123.45),
    };
  });

  React.useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        value: {
          ...prevState.value,
          displayValue:
            prevState.value.rawValue !== undefined
              ? formatValue(prevState.value.rawValue)
              : "",
        },
        placeholder: formatValue(123.45),
      };
    });
  }, [formatValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const rawValue = parseValue(newValue);

    setState((prevState) => {
      return {
        ...prevState,
        value: {
          ...prevState.value,
          rawValue,
          displayValue: newValue,
        },
      };
    });
  };

  return {
    currentValue: state.value,
    inputProps: {
      value: state.value.displayValue,
      placeholder: state.placeholder,
      onChange: handleChange,
    },
  };
}

/* v8 ignore stop */
