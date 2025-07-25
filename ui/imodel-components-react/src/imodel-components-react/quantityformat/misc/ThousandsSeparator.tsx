/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import type { FormatProps } from "@itwin/core-quantity";
import { Format, FormatTraits, getTraitString } from "@itwin/core-quantity";
import { Checkbox, Label } from "@itwin/itwinui-react";
import { ThousandsSelector } from "./ThousandsSelector.js";
import { useTranslation } from "../../useTranslation.js";

/** Properties of [[ThousandsSeparator]] component.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface ThousandsSeparatorProps extends CommonProps {
  formatProps: FormatProps;
  onChange?: (format: FormatProps) => void;
}

/** Component use to set Quantity Format thousand group separator.
 * @internal
 */
export function ThousandsSeparator(props: ThousandsSeparatorProps) {
  const { formatProps, onChange } = props;
  const { translate } = useTranslation();

  const useThousandsId = React.useId();
  const thousandsSelectorId = React.useId();
  const handleSetFormatProps = React.useCallback(
    (newProps: FormatProps) => {
      onChange && onChange(newProps);
    },
    [onChange]
  );

  const setFormatTrait = React.useCallback(
    (trait: FormatTraits, setActive: boolean) => {
      const traitStr = getTraitString(trait);
      let formatTraits: string[] = [traitStr];
      if (setActive) {
        // setting trait
        if (formatProps.formatTraits) {
          const traits = Array.isArray(formatProps.formatTraits)
            ? formatProps.formatTraits
            : formatProps.formatTraits.split(/,|;|\|/);
          formatTraits = [...traits, traitStr];
        }
      } else {
        // clearing trait
        if (formatProps.formatTraits) {
          const traits = Array.isArray(formatProps.formatTraits)
            ? formatProps.formatTraits
            : formatProps.formatTraits.split(/,|;|\|/);
          formatTraits = traits.filter((traitEntry) => traitEntry !== traitStr);
        }
      }
      const newFormatProps = { ...formatProps, formatTraits };
      handleSetFormatProps(newFormatProps);
    },
    [formatProps, handleSetFormatProps]
  );

  const handleUseThousandsSeparatorChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormatTrait(FormatTraits.Use1000Separator, e.target.checked);
    },
    [setFormatTrait]
  );

  const isFormatTraitSet = React.useCallback(
    (trait: FormatTraits) => {
      return Format.isFormatTraitSetInProps(formatProps, trait);
    },
    [formatProps]
  );

  const handleThousandSeparatorChange = React.useCallback(
    (thousandSeparator: string) => {
      let decimalSeparator = formatProps.decimalSeparator;
      // make sure 1000 and decimal separator do not match
      if (isFormatTraitSet(FormatTraits.Use1000Separator)) {
        if (thousandSeparator === ".") decimalSeparator = ",";
        // thousandSeparator === ","
        else decimalSeparator = ".";
      }
      const newFormatProps = {
        ...formatProps,
        thousandSeparator,
        decimalSeparator,
      };
      handleSetFormatProps(newFormatProps);
    },
    [formatProps, isFormatTraitSet, handleSetFormatProps]
  );

  return (
    <>
      <Label
        className={"uicore-label"}
        as="div"
        displayStyle="inline"
        id={useThousandsId}
      >
        {translate("QuantityFormat.labels.useThousandSeparatorLabel")}
      </Label>
      <Checkbox
        aria-labelledby={useThousandsId}
        checked={isFormatTraitSet(FormatTraits.Use1000Separator)}
        onChange={handleUseThousandsSeparatorChange}
      />
      <Label
        className={classnames(
          "uicore-label",
          !isFormatTraitSet(FormatTraits.Use1000Separator) && "uicore-disabled"
        )}
        as="div"
        displayStyle="inline"
        id={thousandsSelectorId}
      >
        {translate("QuantityFormat.labels.thousandSeparatorLabel")}
      </Label>
      <ThousandsSelector
        separator={formatProps.thousandSeparator ?? ","}
        disabled={!isFormatTraitSet(FormatTraits.Use1000Separator)}
        onChange={handleThousandSeparatorChange}
        aria-labelledby={thousandsSelectorId}
      />
    </>
  );
}
