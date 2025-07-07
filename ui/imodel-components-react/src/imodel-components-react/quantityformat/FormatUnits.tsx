/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import * as React from "react";
import type {
  FormatProps,
  UnitProps,
  UnitsProvider,
} from "@itwin/core-quantity";
import { Input } from "@itwin/itwinui-react";
import { UnitDescr } from "./misc/UnitDescr.js";
import { useTranslation } from "../useTranslation.js";

/** Properties of [[FormatUnits]] component.
 * @alpha
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof FormatUnits>`
 */
export interface FormatUnitsProps {
  initialFormat: FormatProps;
  persistenceUnit?: UnitProps;
  unitsProvider: UnitsProvider;
  onUnitsChange?: (format: FormatProps) => void;
}

/** Component to show/edit Units used for Quantity Formatting.
 * @alpha
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function FormatUnits(props: FormatUnitsProps) {
  const { initialFormat, persistenceUnit, unitsProvider, onUnitsChange } =
    props;
  const { translate } = useTranslation();
  const initialFormatRef = React.useRef<FormatProps>(initialFormat);
  const [formatProps, setFormatProps] = React.useState(initialFormat);

  React.useEffect(() => {
    if (initialFormatRef.current !== initialFormat) {
      initialFormatRef.current = initialFormat;
      setFormatProps(initialFormat);
    }
  }, [initialFormat]);

  const handleSetFormatProps = React.useCallback(
    (newProps: FormatProps) => {
      setFormatProps(newProps);
      onUnitsChange && onUnitsChange(newProps);
    },
    [onUnitsChange]
  );

  const handleUnitLabelChange = React.useCallback(
    (newLabel: string, index: number) => {
      if (
        formatProps.composite &&
        formatProps.composite.units.length > index &&
        index >= 0
      ) {
        const units = formatProps.composite.units.map((entry, ndx) => {
          if (index === ndx) return { name: entry.name, label: newLabel };
          else return entry;
        });

        const composite = { ...formatProps.composite, units };
        const newFormatProps = { ...formatProps, composite };
        handleSetFormatProps(newFormatProps);
      }
    },
    [formatProps, handleSetFormatProps]
  );

  const handleUnitChange = React.useCallback(
    (newUnit: string, index: number) => {
      const unitParts = newUnit.split(/:/);
      if (unitParts[0] === "REMOVEUNIT") {
        if (formatProps.composite && formatProps.composite.units.length > 1) {
          const units = [...formatProps.composite.units];
          units.pop();
          const composite = { ...formatProps.composite, units };
          const newFormatProps = { ...formatProps, composite };
          handleSetFormatProps(newFormatProps);
        }
      } else if (unitParts[0] === "ADDSUBUNIT") {
        const units =
          formatProps.composite && formatProps.composite.units.length
            ? [
                ...formatProps.composite.units,
                { name: unitParts[1], label: unitParts[2] },
              ]
            : [{ name: unitParts[1], label: unitParts[2] }];
        const composite = { ...formatProps.composite, units };
        const newFormatProps = { ...formatProps, composite };
        handleSetFormatProps(newFormatProps);
      } else {
        if (
          formatProps.composite &&
          formatProps.composite.units.length > index &&
          index >= 0
        ) {
          const units = formatProps.composite.units.map((entry, ndx) => {
            if (index === ndx)
              return { name: unitParts[0], label: unitParts[1] };
            else return entry;
          });
          const composite = { ...formatProps.composite, units };
          const newFormatProps = { ...formatProps, composite };
          handleSetFormatProps(newFormatProps);
        } else if (!formatProps.composite) {
          const composite = {
            units: [{ name: unitParts[0], label: unitParts[1] }],
          };
          const newFormatProps = { ...formatProps, composite };
          handleSetFormatProps(newFormatProps);
        }
      }
    },
    [formatProps, handleSetFormatProps]
  );

  const handleOnSpacerChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (formatProps.composite) {
        const spacerValue = e.target.value.length ? e.target.value[0] : ""; // spacer can only be empty or a single character
        const composite = { ...formatProps.composite, spacer: spacerValue };
        const newFormatProps = { ...formatProps, composite };
        handleSetFormatProps(newFormatProps);
      }
    },
    [formatProps, handleSetFormatProps]
  );

  return (
    <>
      {formatProps.composite?.units
        ? formatProps.composite.units.map((value, index) => (
            <UnitDescr
              key={value.name}
              name={value.name}
              label={value.label ?? ""}
              parentUnitName={
                index > 0
                  ? formatProps.composite!.units[index - 1].name
                  : undefined
              }
              unitsProvider={unitsProvider}
              index={index}
              onUnitChange={handleUnitChange}
              onLabelChange={handleUnitLabelChange}
              readonly={index < formatProps.composite!.units.length - 1}
            />
          ))
        : persistenceUnit && (
            <UnitDescr
              key={persistenceUnit.name}
              name={persistenceUnit.name}
              label={persistenceUnit.label}
              unitsProvider={unitsProvider}
              index={0}
              onUnitChange={handleUnitChange}
              onLabelChange={handleUnitLabelChange}
            />
          )}

      {formatProps.composite?.units &&
        formatProps.composite.units.length > 1 && (
          <>
            <span key={"composite-spacer-label"} className={"uicore-label"}>
              {translate("QuantityFormat.labels.compositeSpacer")}
            </span>
            <Input
              key={"composite-spacer"}
              data-testid="composite-spacer"
              value={formatProps.composite.spacer ?? ""}
              onChange={handleOnSpacerChange}
              size="small"
            />
          </>
        )}
    </>
  );
}
