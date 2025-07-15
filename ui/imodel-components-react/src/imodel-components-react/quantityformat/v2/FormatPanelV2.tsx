/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import * as React from "react";
import {
  type FormatProps,
  FormatType,
  parseFormatType,
  type UnitProps,
} from "@itwin/core-quantity";
import type { UnitsProvider } from "@itwin/core-quantity";
import { ExpandableBlock } from "@itwin/itwinui-react";
import {
  getDecimalPrimaryChildren,
  getDecimalSecondaryChildren,
  type PanelProps,
} from "./Panels/Decimal.js";
import {
  getFractionalPrimaryChildren,
  getFractionalSecondaryChildren,
} from "./Panels/Fractional.js";
import {
  getScientificPrimaryChildren,
  getScientificSecondaryChildren,
} from "./Panels/Scientific.js";
import {
  getStationPrimaryChildren,
  getStationSecondaryChildren,
} from "./Panels/Station.js";
import "./FormatPanelV2.scss";

/** Props for FormatPanelV2 */
export interface FormatPanelV2Props {
  formatProps: FormatProps;
  unitsProvider: UnitsProvider;
  onFormatChange: (formatProps: FormatProps) => void;
}

/** Format Panel V2 that uses primary and secondary children based on format type */
export function FormatPanelV2(props: FormatPanelV2Props) {
  const { formatProps, unitsProvider, onFormatChange } = props;
  const [persistenceUnit, setPersistenceUnit] = React.useState<
    UnitProps | undefined
  >(undefined);

  // Generate persistenceUnit from first composite unit
  React.useEffect(() => {
    const loadPersistenceUnit = async () => {
      if (
        formatProps.composite &&
        formatProps.composite.units &&
        formatProps.composite.units.length > 0
      ) {
        const firstUnitName = formatProps.composite.units[0].name;
        try {
          const unit = await unitsProvider.findUnitByName(firstUnitName);
          setPersistenceUnit(unit);
        } catch {
          setPersistenceUnit(undefined);
        }
      } else {
        setPersistenceUnit(undefined);
      }
    };

    void loadPersistenceUnit();
  }, [formatProps.composite, unitsProvider]);

  const [primaryChildren, secondaryChildren] = React.useMemo(() => {
    const panelProps: PanelProps = {
      formatProps,
      unitsProvider,
      onFormatChange,
      persistenceUnit,
    };
    const formatType = parseFormatType(formatProps.type, "format");

    switch (formatType) {
      case FormatType.Decimal:
        return [
          getDecimalPrimaryChildren(panelProps),
          getDecimalSecondaryChildren(panelProps),
        ];
      case FormatType.Fractional:
        return [
          getFractionalPrimaryChildren(panelProps),
          getFractionalSecondaryChildren(panelProps),
        ];
      case FormatType.Scientific:
        return [
          getScientificPrimaryChildren(panelProps),
          getScientificSecondaryChildren(panelProps),
        ];
      case FormatType.Station:
        return [
          getStationPrimaryChildren(panelProps),
          getStationSecondaryChildren(panelProps),
        ];
      default:
        return [
          getDecimalPrimaryChildren(panelProps),
          getDecimalSecondaryChildren(panelProps),
        ];
    }
  }, [formatProps, unitsProvider, onFormatChange, persistenceUnit]);

  return (
    <div className="format-panel-v2">
      <div className="primary-children">{primaryChildren}</div>
      <ExpandableBlock caption="Advanced Options" isExpanded={false}>
        <div className="secondary-children">{secondaryChildren}</div>
      </ExpandableBlock>
    </div>
  );
}
