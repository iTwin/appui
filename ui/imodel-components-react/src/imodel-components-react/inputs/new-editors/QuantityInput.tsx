/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Input } from "@itwin/itwinui-react";
import type { NumericValue } from "@itwin/components-react";
import type { FormatterSpec, ParserSpec } from "@itwin/core-quantity";

/* v8 ignore start */

interface QuantityInputProps
  extends Pick<
    React.ComponentPropsWithoutRef<typeof Input>,
    "onBlur" | "onFocus" | "size"
  > {
  value: NumericValue;
  onChange: (value: NumericValue) => void;
  formatter?: FormatterSpec;
  parser?: ParserSpec;
  isMerged?: boolean;
}

/**
 * A quantity input that manages its own display state and uses formatter/parser for quantity values.
 * @internal
 */
export function QuantityInput(props: QuantityInputProps) {
  const { formatter, parser, size, onBlur } = props;
  const { inputProps } = useQuantityInput(props);
  const placeholder = formatter?.unitConversions?.[0]?.label;
  const delayedDisabled = useDelayed({
    initial: false,
    current: !formatter || !parser,
  });

  return (
    <Input
      {...inputProps}
      placeholder={placeholder}
      disabled={delayedDisabled}
      size={size}
      onBlur={onBlur}
    />
  );
}

function useDelayed<T>({ initial, current }: { initial: T; current: T }) {
  const [value, setValue] = React.useState(initial);

  React.useEffect(() => {
    if (current === initial) {
      setValue(current);
      return;
    }
    const timeoutId = setTimeout(() => {
      setValue(current);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [current, initial]);

  return value;
}

function useQuantityInput({
  value,
  onChange,
  formatter,
  parser,
  onFocus,
  isMerged,
}: QuantityInputProps) {
  const [state, setState] = React.useState<NumericValue>(() => {
    if (value.rawValue !== undefined && formatter) {
      return {
        rawValue: value.rawValue,
        displayValue: formatter.applyFormatting(value.rawValue),
      };
    }
    return value;
  });

  React.useLayoutEffect(() => {
    if (!formatter) {
      return;
    }
    setState((prev) => {
      if (prev.rawValue !== undefined) {
        const displayValue = formatter.applyFormatting(prev.rawValue);
        return prev.displayValue === displayValue
          ? prev
          : { ...prev, displayValue };
      }

      if (prev.displayValue !== "") {
        return prev;
      }

      if (isMerged) {
        return {
          ...prev,
          displayValue: `-- ${formatter.unitConversions?.[0]?.label ?? ""}`,
        };
      }

      return {
        ...prev,
        displayValue: formatter.unitConversions?.[0]?.label ?? "",
      };
    });
  }, [formatter, isMerged]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    const unit = formatter?.unitConversions?.[0]?.label;
    const rawValue = parseInput(inputText, parser, unit);
    const newValue: NumericValue = { rawValue, displayValue: inputText };
    setState(newValue);
    onChange(newValue);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(e);

    const input = e.currentTarget;
    const unit = formatter?.unitConversions?.[0]?.label ?? "";

    if (state.rawValue === undefined && state.displayValue === unit) {
      requestAnimationFrame(() => {
        input.setSelectionRange(0, 0);
      });
      return;
    }

    requestAnimationFrame(() => {
      input.select();
    });
  };

  return {
    inputProps: {
      value: state.displayValue,
      onChange: handleChange,
      onFocus: handleFocus,
    },
  };
}

function parseInput(
  userInput: string,
  parser: ParserSpec | undefined,
  placeholder: string | undefined
): number | undefined {
  if (!parser || userInput === placeholder) {
    return undefined;
  }
  const parseResult = parser.parseToQuantityValue(userInput);
  return parseResult.ok ? parseResult.value : undefined;
}

/* v8 ignore stop */
