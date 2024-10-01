/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Inputs
 */

import classnames from "classnames";
import * as React from "react";
import type { QuantityTypeArg } from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import { Parser } from "@itwin/core-quantity";
import type { ParseResults } from "@itwin/appui-abstract";
import type { CommonProps } from "@itwin/core-react";
import { ParsedInput } from "@itwin/components-react";
import { useTranslation } from "../useTranslation.js";

/** Props for [[QuantityInput]] control
 * @beta
 */
// eslint-disable-next-line deprecation/deprecation
export interface QuantityProps extends CommonProps {
  /** Initial magnitude in 'persistence' units. See `getPersistenceUnitByQuantityType` in [QuantityFormatter]($core-frontend) */
  initialValue: number;
  /** Type of quantity being input. */
  quantityType: QuantityTypeArg;
  /** Function to call in the quantity value is changed. The value returned will be in 'persistence' units. */
  onQuantityChange: (newQuantityValue: number) => void;
  /** Set to `true` if value is for display only */
  readonly?: boolean;
  /** Provides ability to return reference to HTMLInputElement */
  ref?: React.Ref<HTMLInputElement>;
}

/** Input control that allows users to input a quantity and show the formatted string that represents the value.
 * @beta
 */
export function QuantityInput({
  initialValue,
  quantityType,
  readonly,
  className,
  style,
  onQuantityChange,
  ref,
}: QuantityProps) {
  const { translate } = useTranslation();
  const [formatterSpec, setFormatterSpec] = React.useState(() =>
    IModelApp.quantityFormatter.findFormatterSpecByQuantityType(quantityType)
  );
  const [parserSpec, setParserSpec] = React.useState(() =>
    IModelApp.quantityFormatter.findParserSpecByQuantityType(quantityType)
  );

  const formatValue = React.useCallback(
    (value: number) => {
      if (formatterSpec) {
        return formatterSpec.applyFormatting(value);
      }
      return value.toFixed(2);
    },
    [formatterSpec]
  );

  const parseString = React.useCallback(
    (userInput: string): ParseResults => {
      if (parserSpec) {
        const parseResult = IModelApp.quantityFormatter.parseToQuantityValue(
          userInput,
          parserSpec
        );
        if (Parser.isParsedQuantity(parseResult)) {
          return { value: parseResult.value };
        } else {
          const statusId = Parser.isParseError(parseResult)
            ? parseResult.error.toString()
            : "Unknown";
          return {
            parseError: `${translate(
              "QuantityInput.NoParserDefined"
            )}${statusId}`,
          };
        }
      }
      return {
        parseError: translate("QuantityInput.NoParserDefined"),
      };
    },
    [parserSpec, translate]
  );

  const classNames = classnames(className, "components-quantity-input");

  React.useEffect(() => {
    return IModelApp.quantityFormatter.onActiveFormattingUnitSystemChanged.addListener(
      () => {
        setFormatterSpec(
          IModelApp.quantityFormatter.findFormatterSpecByQuantityType(
            quantityType
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
            IModelApp.quantityFormatter.findFormatterSpecByQuantityType(
              quantityType
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

  return (
    <ParsedInput
      data-testid="components-quantity-input"
      ref={ref}
      style={style}
      className={classNames}
      onChange={onQuantityChange}
      initialValue={initialValue}
      readonly={readonly}
      formatValue={formatValue}
      parseString={parseString}
    />
  );
}
