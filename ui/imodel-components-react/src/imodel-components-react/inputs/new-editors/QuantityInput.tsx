/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { FormattedNumericInput } from "@itwin/components-react";
import type { FormatterSpec, ParserSpec } from "@itwin/core-quantity";

/* v8 ignore start */

type FormattedNumericInputProps = React.ComponentPropsWithoutRef<
  typeof FormattedNumericInput
>;

interface QuantityInputProps
  extends Omit<
    FormattedNumericInputProps,
    "parseValue" | "formatValue" | "disabled"
  > {
  formatter?: FormatterSpec;
  parser?: ParserSpec;
}

/**
 * A component that wraps `FormattedNumericInput` and takes a formatter and parser for quantity values.
 * @internal
 */
export function QuantityInput({
  formatter,
  parser,
  ...props
}: QuantityInputProps) {
  const initialValue = React.useRef(props.value);
  const formatValue = React.useCallback(
    (currValue: number) => {
      if (!formatter) {
        return initialValue.current.displayValue;
      }
      return formatter.applyFormatting(currValue);
    },
    [formatter]
  );

  const parseString = React.useCallback(
    (userInput: string) => {
      if (!parser) {
        return undefined;
      }
      const parseResult = parser.parseToQuantityValue(userInput);
      return parseResult.ok ? parseResult.value : undefined;
    },
    [parser]
  );

  return (
    <FormattedNumericInput
      {...props}
      value={props.value}
      formatValue={formatValue}
      parseValue={parseString}
      disabled={!formatter || !parser}
    />
  );
}

/* v8 ignore stop */
