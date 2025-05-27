/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import * as React from "react";
import { IModelApp } from "@itwin/core-frontend";
import type {
  FormatDefinition,
  FormatProps,
  UnitProps,
  UnitsProvider,
} from "@itwin/core-quantity";
import { FormatPanel } from "./FormatPanel.js";

/** Interface for the props of the QuantityFormatPanelV2 component.
 * @alpha
 */
export interface QuantityFormatPanelV2Props {
  formatDefinition: FormatDefinition;
  onFormatChange: (format: FormatDefinition) => void;
  initialMagnitude?: number;
}
/** Component to set properties that control Quantity Formatting.
 * @alpha
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function QuantityFormatPanelV2({
  formatDefinition,
  onFormatChange,
  initialMagnitude,
}: QuantityFormatPanelV2Props) {
  const [formatProps, setFormatProps] = React.useState<FormatProps>({ ...formatDefinition });

  // const [persistenceUnit, setPersistenceUnit] = React.useState<UnitProps>();

  // TODO: Refactor to try to retrieve persistence unit from the sync spec registry in Quantity Formatter, based on formatDefinition.key.
  // React.useEffect(() =>
  //   const quantityTypeKey = getQuantityTypeKey(quantityType);
  //   const quantityTypeDefinition =
  //     IModelApp.quantityFormatter.quantityTypesRegistry.get(quantityTypeKey);
  //   if (quantityTypeDefinition)
  //     setPersistenceUnit(quantityTypeDefinition.persistenceUnit);
  //   else
  //     throw Error(`Unable to locate a quantity type with type ${quantityType}`);
  // }, []); // no dependencies defined as we want this to run on every render

  const handleOnFormatChanged = React.useCallback(
    async (newProps: FormatProps) => {
      setFormatProps(newProps);
      onFormatChange && onFormatChange(newProps);
    },
    [onFormatChange]
  );


  // TODO: Review if we should just drop this useCallback, and move the function into FormatPanel...
  const provideFormatSpec = React.useCallback(
    async (
      inProps: FormatProps,
      _persistenceUnit: UnitProps,
      _unitsProvider: UnitsProvider
    ) => {
      return IModelApp.quantityFormatter.createFormatterSpec(
        {
          formatProps: inProps,
          persistenceUnitName: _persistenceUnit.name,
        }
      );
    },
    []
  );

  return (
    <div className="components-quantityFormat-quantityPanel">
      {formatProps && (
        <FormatPanel
          onFormatChange={handleOnFormatChanged}
          initialFormat={formatProps}
          initialMagnitude={initialMagnitude}
          unitsProvider={IModelApp.quantityFormatter.unitsProvider}
          provideFormatSpec={provideFormatSpec}
        />
      )}
    </div>
  );
}
