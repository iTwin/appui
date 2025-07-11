/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import classnames from "classnames";
import * as React from "react";
import { Key } from "ts-key-enum";
import type { CommonProps } from "@itwin/core-react";
import { Checkbox, IconButton, Label } from "@itwin/itwinui-react";
import type { FormatProps, ShowSignOption } from "@itwin/core-quantity";
import {
  Format,
  FormatTraits,
  FormatType,
  getTraitString,
  parseFormatType,
  parseRatioType,
  parseScientificType,
  parseShowSignOption,
  RatioType,
  ScientificType,
} from "@itwin/core-quantity";
import { SignOptionSelector } from "./misc/SignOption.js";
import { ThousandsSeparator } from "./misc/ThousandsSeparator.js";
import { DecimalSeparatorSelector } from "./misc/DecimalSeparator.js";
import { ScientificTypeSelector } from "./misc/ScientificType.js";
import { StationSeparatorSelector } from "./misc/StationSeparatorSelector.js";
import { StationSizeSelector } from "./misc/StationSizeSelector.js";
import { useTranslation } from "../useTranslation.js";
import { RatioTypeSelector } from "./misc/RatioType.js";
import { SvgHelpCircularHollow } from "@itwin/itwinui-icons-react";
import { AzimuthOptions } from "./misc/AzimuthOptions.js";

/** Properties of [[MiscFormatOptions]] component.
 * @alpha
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof MiscFormatOptions>`
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface MiscFormatOptionsProps extends CommonProps {
  formatProps: FormatProps;
  onChange?: (format: FormatProps) => void;
  enableMinimumProperties?: boolean;
  showOptions: boolean;
  onShowHideOptions: (show: boolean) => void;
  children?: React.ReactNode;
}

/** Component use to set miscellaneous properties is a Formatted Quantity.
 * @alpha
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function MiscFormatOptions(props: MiscFormatOptionsProps) {
  const {
    formatProps,
    onChange,
    showOptions,
    onShowHideOptions,
    enableMinimumProperties,
  } = props;
  const { translate } = useTranslation();

  const signOptionSelectorId = React.useId();
  const stationSizeSelectorId = React.useId();
  const stationSeparatorSelectorId = React.useId();
  const decimalSeparatorSelectorId = React.useId();
  const showTrailZerosId = React.useId();
  const keepDecimalPointId = React.useId();
  const keepSingleZeroId = React.useId();
  const keepZeroEmptyId = React.useId();
  const fractionDashId = React.useId();
  const scientficTypeSelectorId = React.useId();
  const ratioTypeSelectorId = React.useId();

  const handleSetFormatProps = React.useCallback(
    (newFormatProps: FormatProps) => {
      onChange && onChange(newFormatProps);
    },
    [onChange]
  );

  const isFormatTraitSet = React.useCallback(
    (trait: FormatTraits) => {
      return Format.isFormatTraitSetInProps(formatProps, trait);
    },
    [formatProps]
  );

  const handleShowSignChange = React.useCallback(
    (option: ShowSignOption) => {
      const newShowSignOption = option;
      const newFormatProps = {
        ...formatProps,
        showSignOption: newShowSignOption,
      };
      handleSetFormatProps(newFormatProps);
    },
    [formatProps, handleSetFormatProps]
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

  const handleShowTrailingZeroesChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormatTrait(FormatTraits.TrailZeroes, e.target.checked);
    },
    [setFormatTrait]
  );

  const handleKeepDecimalPointChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormatTrait(FormatTraits.KeepDecimalPoint, e.target.checked);
    },
    [setFormatTrait]
  );

  const handleKeepSingleZeroChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormatTrait(FormatTraits.KeepSingleZero, e.target.checked);
    },
    [setFormatTrait]
  );

  const handleZeroEmptyChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormatTrait(FormatTraits.ZeroEmpty, e.target.checked);
    },
    [setFormatTrait]
  );

  const handleUseFractionDashChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormatTrait(FormatTraits.FractionDash, e.target.checked);
    },
    [setFormatTrait]
  );

  const handleDecimalSeparatorChange = React.useCallback(
    (decimalSeparator: string) => {
      let thousandSeparator = formatProps.thousandSeparator;
      // make sure 1000 and decimal separator do not match
      if (isFormatTraitSet(FormatTraits.Use1000Separator)) {
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
        decimalSeparator,
      };
      handleSetFormatProps(newFormatProps);
    },
    [formatProps, isFormatTraitSet, handleSetFormatProps]
  );

  const handleScientificTypeChange = React.useCallback(
    (type: ScientificType) => {
      const newFormatProps = {
        ...formatProps,
        scientificType: type,
      };
      handleSetFormatProps(newFormatProps);
    },
    [formatProps, handleSetFormatProps]
  );

  const handleRatioTypeChange = React.useCallback(
    (type: RatioType) => {
      const newFormatProps = {
        ...formatProps,
        ratioType: parseRatioType(type, "format"),
      };
      handleSetFormatProps(newFormatProps);
    },
    [formatProps, handleSetFormatProps]
  );

  const handleFormatChange = React.useCallback(
    (newFormatProps: FormatProps) => {
      handleSetFormatProps(newFormatProps);
    },
    [handleSetFormatProps]
  );

  const formatType = React.useMemo(
    () => parseFormatType(formatProps.type, "format"),
    [formatProps.type]
  );
  const showSignOption = React.useMemo(
    () =>
      parseShowSignOption(
        formatProps.showSignOption ?? "onlyNegative",
        "format"
      ),
    [formatProps.showSignOption]
  );

  const handleToggleButtonClick = React.useCallback(() => {
    onShowHideOptions(!showOptions);
  }, [onShowHideOptions, showOptions]);

  const handleKeyUpOnLink = React.useCallback(
    (e: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (e.key === Key.Enter.valueOf() || e.key === " ") {
        onShowHideOptions(!showOptions);
        e.preventDefault();
      }
    },
    [onShowHideOptions, showOptions]
  );

  const handleStationSeparatorChange = React.useCallback(
    (value: string) => {
      const newFormatProps = { ...formatProps, stationSeparator: value };
      handleSetFormatProps(newFormatProps);
    },
    [formatProps, handleSetFormatProps]
  );

  const handleStationOffsetChange = React.useCallback(
    (value: number) => {
      const newFormatProps = { ...formatProps, stationOffsetSize: value };
      handleSetFormatProps(newFormatProps);
    },
    [formatProps, handleSetFormatProps]
  );

  return (
    <>
      {enableMinimumProperties && !showOptions && (
        <a // eslint-disable-line jsx-a11y/anchor-is-valid
          onClick={handleToggleButtonClick}
          onKeyUp={handleKeyUpOnLink}
          className={"components-quantityFormat-more-less"}
          role="link"
          tabIndex={0}
        >
          {translate("QuantityFormat.labels.moreLabel")}
        </a>
      )}
      {(!enableMinimumProperties || showOptions) && (
        <>
          <Label
            className={"uicore-label"}
            id={signOptionSelectorId}
            as="div"
            displayStyle="inline"
          >
            {translate("QuantityFormat.labels.signOptionLabel")}
          </Label>
          <SignOptionSelector
            aria-labelledby={signOptionSelectorId}
            signOption={showSignOption}
            onChange={handleShowSignChange}
          />

          <Label
            className={classnames(
              "uicore-label",
              formatType !== FormatType.Station && "uicore-disabled"
            )}
            as="div"
            displayStyle="inline"
            id={stationSizeSelectorId}
          >
            {translate("QuantityFormat.labels.stationOffsetLabel")}
          </Label>
          <StationSizeSelector
            aria-labelledby={stationSizeSelectorId}
            value={formatProps.stationOffsetSize ?? 2}
            disabled={formatType !== FormatType.Station}
            onChange={handleStationOffsetChange}
          />

          <Label
            className={classnames(
              "uicore-label",
              formatType !== FormatType.Station && "uicore-disabled"
            )}
            as="div"
            displayStyle="inline"
            id={stationSeparatorSelectorId}
          >
            {translate("QuantityFormat.labels.stationSeparatorLabel")}
          </Label>
          <StationSeparatorSelector
            aria-labelledby={stationSeparatorSelectorId}
            separator={
              undefined !== formatProps.stationSeparator
                ? formatProps.stationSeparator
                : "+"
            }
            disabled={formatType !== FormatType.Station}
            onChange={handleStationSeparatorChange}
          />

          <ThousandsSeparator
            formatProps={formatProps}
            onChange={handleFormatChange}
          />

          <Label
            className={classnames(
              "uicore-label",
              formatType === FormatType.Fractional && "uicore-disabled"
            )}
            as="div"
            displayStyle="inline"
            id={decimalSeparatorSelectorId}
          >
            {translate("QuantityFormat.labels.decimalSeparatorLabel")}
          </Label>
          <DecimalSeparatorSelector
            aria-labelledby={decimalSeparatorSelectorId}
            separator={formatProps.decimalSeparator ?? "."}
            onChange={handleDecimalSeparatorChange}
            disabled={formatType === FormatType.Fractional}
          />

          <Label
            className={"uicore-label"}
            as="div"
            displayStyle="inline"
            id={showTrailZerosId}
          >
            {translate("QuantityFormat.labels.showTrailZerosLabel")}
          </Label>
          <Checkbox
            aria-labelledby={showTrailZerosId}
            checked={isFormatTraitSet(FormatTraits.TrailZeroes)}
            onChange={handleShowTrailingZeroesChange}
          />

          <Label
            className={classnames(
              "uicore-label",
              formatType === FormatType.Fractional && "uicore-disabled"
            )}
            as="div"
            displayStyle="inline"
            id={keepDecimalPointId}
          >
            {translate("QuantityFormat.labels.keepDecimalPointLabel")}
          </Label>
          <Checkbox
            aria-labelledby={keepDecimalPointId}
            checked={isFormatTraitSet(FormatTraits.KeepDecimalPoint)}
            onChange={handleKeepDecimalPointChange}
          />

          <Label
            className={"uicore-label"}
            as="div"
            displayStyle="inline"
            id={keepSingleZeroId}
          >
            {translate("QuantityFormat.labels.keepSingleZeroLabel")}
          </Label>
          <Checkbox
            aria-labelledby={keepSingleZeroId}
            checked={isFormatTraitSet(FormatTraits.KeepSingleZero)}
            onChange={handleKeepSingleZeroChange}
          />

          <Label
            className={"uicore-label"}
            as="div"
            displayStyle="inline"
            id={keepZeroEmptyId}
          >
            {translate("QuantityFormat.labels.zeroEmptyLabel")}
          </Label>
          <Checkbox
            aria-labelledby={keepZeroEmptyId}
            checked={isFormatTraitSet(FormatTraits.ZeroEmpty)}
            onChange={handleZeroEmptyChange}
          />

          <Label
            className={classnames(
              "uicore-label",
              formatType !== FormatType.Fractional && "uicore-disabled"
            )}
            as="div"
            displayStyle="inline"
            id={fractionDashId}
          >
            {translate("QuantityFormat.labels.fractionDashLabel")}
          </Label>
          <Checkbox
            aria-labelledby={fractionDashId}
            checked={isFormatTraitSet(FormatTraits.FractionDash)}
            onChange={handleUseFractionDashChange}
            disabled={formatType !== FormatType.Fractional}
          />

          <Label
            className={classnames(
              "uicore-label",
              formatType !== FormatType.Scientific && "uicore-disabled"
            )}
            as="div"
            displayStyle="inline"
            id={scientficTypeSelectorId}
          >
            {translate("QuantityFormat.labels.scientificTypeLabel")}
          </Label>
          <ScientificTypeSelector
            type={
              formatProps.scientificType &&
              formatProps.scientificType.length > 0
                ? parseScientificType(formatProps.scientificType, "custom")
                : ScientificType.Normalized
            }
            aria-labelledby={scientficTypeSelectorId}
            disabled={formatType !== FormatType.Scientific}
            onChange={handleScientificTypeChange}
          />

          <Label
            className={classnames(
              "uicore-label",
              formatType !== FormatType.Ratio && "uicore-disabled"
            )}
            id={ratioTypeSelectorId}
          >
            {translate("QuantityFormat.labels.ratioTypeLabel")}
            <IconButton
              size="small"
              styleType="borderless"
              label={translate("QuantityFormat.ratio-type.default.description")}
            >
              <SvgHelpCircularHollow />
            </IconButton>
          </Label>
          <RatioTypeSelector
            type={
              formatProps.ratioType && formatProps.ratioType.length > 0
                ? parseRatioType(formatProps.ratioType, "custom")
                : RatioType.NToOne
            }
            disabled={formatType !== FormatType.Ratio}
            onChange={handleRatioTypeChange}
            aria-labelledby={ratioTypeSelectorId}
          />

          <AzimuthOptions
            formatProps={formatProps}
            onChange={handleFormatChange}
            disabled={formatType !== FormatType.Azimuth}
          />

          {props.children}

          {enableMinimumProperties && showOptions && (
            <a // eslint-disable-line jsx-a11y/anchor-is-valid
              onClick={handleToggleButtonClick}
              onKeyUp={handleKeyUpOnLink}
              className={"components-quantityFormat-more-less"}
              role="link"
              tabIndex={0}
            >
              {translate("QuantityFormat.labels.lessLabel")}
            </a>
          )}
        </>
      )}
    </>
  );
}
