/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Input } from "@itwin/itwinui-react";
import type { NumericValue } from "../../Types.js";

interface ParsedNumericInputProps {
  value: NumericValue;
  onChange: (value: NumericValue) => void;
  parseValue: (value: string) => number | undefined;
  formatValue: (num: number) => string;
  disabled?: boolean;
  size?: "small" | "large";
  onBlur: () => void;
}

/**
 *
 */
export function ParsedNumericInput({
  onChange,
  value,
  parseValue,
  formatValue,
  disabled,
  onBlur,
  size,
}: ParsedNumericInputProps) {
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

  return (
    <Input disabled={disabled} size={size} onBlur={onBlur} {...inputProps} />
  );
}

interface HookProps {
  initialValue: number | undefined;
  parseValue: (value: string) => number | undefined;
  formatValue: (num: number) => string;
}

function useParsedNumberInput({
  initialValue,
  formatValue,
  parseValue,
}: HookProps) {
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
      placeholder: formatValue(123.45),
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
