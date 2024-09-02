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
import type { SelectOption } from "@itwin/itwinui-react";
import { Checkbox, Select } from "@itwin/itwinui-react";
import { useTranslation } from "../useTranslation";

// eslint-disable-next-line deprecation/deprecation
interface UomSeparatorSelectorProps extends CommonProps {
  separator: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

function UomSeparatorSelector(props: UomSeparatorSelectorProps) {
  const { separator, onChange, ...otherProps } = props;
  const { translate } = useTranslation();

  const handleOnChange = React.useCallback(
    (newValue: string) => {
      onChange && onChange(newValue);
    },
    [onChange]
  );

  const separatorOptions = React.useMemo(() => {
    const uomDefaultEntries: SelectOption<string>[] = [
      { value: "", label: translate("QuantityFormat.none") },
      { value: " ", label: translate("QuantityFormat.space") },
      { value: "-", label: translate("QuantityFormat.dash") },
    ];
    const completeListOfEntries: SelectOption<string>[] = [];

    if (
      undefined ===
      uomDefaultEntries.find((option) => option.value === separator)
    ) {
      completeListOfEntries.push({ value: separator, label: separator });
    }
    completeListOfEntries.push(...uomDefaultEntries);
    return completeListOfEntries;
  }, [separator, translate]);

  return (
    <Select
      options={separatorOptions}
      value={separator}
      onChange={handleOnChange}
      size="small"
      {...otherProps}
    />
  );
}

/** Properties of [[FormatUnitLabel]] component.
 * @alpha
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof FormatUnitLabel>`
 */
// eslint-disable-next-line deprecation/deprecation
export interface FormatUnitLabelProps extends CommonProps {
  formatProps: FormatProps;
  onUnitLabelChange?: (format: FormatProps) => void;
}

/** Component to set the label separator definition in a Quantity Format and if it the label is to be displayed.
 * @alpha
 */
export function FormatUnitLabel(props: FormatUnitLabelProps) {
  const { formatProps, onUnitLabelChange } = props;
  const { translate } = useTranslation();

  const handleSetFormatProps = React.useCallback(
    (newProps: FormatProps) => {
      onUnitLabelChange && onUnitLabelChange(newProps);
    },
    [onUnitLabelChange]
  );

  const isFormatTraitSet = React.useCallback(
    (trait: FormatTraits) => {
      return Format.isFormatTraitSetInProps(formatProps, trait);
    },
    [formatProps]
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
          if (!traits.find((traitEntry) => traitStr === traitEntry)) {
            formatTraits = [...traits, traitStr];
          }
        }
      } else {
        // clearing trait
        if (!formatProps.formatTraits) return;
        const traits = Array.isArray(formatProps.formatTraits)
          ? formatProps.formatTraits
          : formatProps.formatTraits.split(/,|;|\|/);
        formatTraits = traits.filter((traitEntry) => traitEntry !== traitStr);
      }
      const newFormatProps = { ...formatProps, formatTraits };
      handleSetFormatProps(newFormatProps);
    },
    [formatProps, handleSetFormatProps]
  );

  const handleUomSeparatorChange = React.useCallback(
    (newSeparator: string) => {
      const newFormatProps = { ...formatProps, uomSeparator: newSeparator };
      handleSetFormatProps(newFormatProps);
    },
    [formatProps, handleSetFormatProps]
  );

  const handleShowUnitLabelChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormatTrait(FormatTraits.ShowUnitLabel, e.target.checked);
    },
    [setFormatTrait]
  );

  return (
    <>
      <span className={"uicore-label"}>
        {translate("QuantityFormat.labels.appendUnitLabel")}
      </span>
      <Checkbox
        data-testid="show-unit-label-checkbox"
        checked={isFormatTraitSet(FormatTraits.ShowUnitLabel)}
        onChange={handleShowUnitLabelChange}
      />
      <span
        className={classnames(
          "uicore-label",
          !isFormatTraitSet(FormatTraits.ShowUnitLabel) && "uicore-disabled"
        )}
      >
        {translate("QuantityFormat.labels.labelSeparator")}
      </span>
      <UomSeparatorSelector
        data-testid="uom-separator-select"
        separator={formatProps.uomSeparator ?? ""}
        onChange={handleUomSeparatorChange}
        disabled={!isFormatTraitSet(FormatTraits.ShowUnitLabel)}
      />
    </>
  );
}
