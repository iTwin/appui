/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Settings
 */

import * as React from "react";
import type { UnitSystemKey } from "@itwin/core-quantity";
import type { SelectOption } from "@itwin/itwinui-react";
import { Select } from "@itwin/itwinui-react";
import { useTranslation } from "../../hooks/useTranslation";

/** Props for [[UnitSystemSelector]]
 * @beta
 */
export interface UnitSystemSelectorProps {
  selectedUnitSystemKey: UnitSystemKey;
  onUnitSystemSelected: (unitSystem: UnitSystemKey) => void;
  availableUnitSystems: Set<UnitSystemKey>;
}

/** Select control to set the "active" Presentation Unit System. This setting determine what units are display for quantity values (i.e. foot vs meter).
 * @alpha
 */
export function UnitSystemSelector(props: UnitSystemSelectorProps) {
  const { translate } = useTranslation();

  const { selectedUnitSystemKey, onUnitSystemSelected, availableUnitSystems } =
    props;
  const handleUnitSystemSelected = React.useCallback(
    (newValue: UnitSystemKey) => {
      onUnitSystemSelected && onUnitSystemSelected(newValue);
    },
    [onUnitSystemSelected]
  );

  const displayUnitSystems: SelectOption<UnitSystemKey>[] = [
    ...availableUnitSystems.values(),
  ].map((sys) => {
    switch (sys) {
      case "imperial":
        return {
          value: "imperial",
          label: translate("presentationUnitSystem.BritishImperial"),
        };
      case "usCustomary":
        return {
          value: "usCustomary",
          label: translate("presentationUnitSystem.USCustomary"),
        };
      case "usSurvey":
        return {
          value: "usSurvey",
          label: translate("presentationUnitSystem.USSurvey"),
        };
      case "metric":
      default:
        return {
          value: "metric",
          label: translate("presentationUnitSystem.Metric"),
        };
    }
  });

  const unitSystemKey = availableUnitSystems.has(selectedUnitSystemKey)
    ? selectedUnitSystemKey
    : displayUnitSystems[0].value;

  return (
    <div className="quantity-unit-system-selector-container">
      <span className={"uicore-label"}>
        {translate("presentationUnitSystem.selector-label")}
      </span>
      <Select
        data-testid="unitSystemSelector"
        value={unitSystemKey}
        options={displayUnitSystems}
        onChange={handleUnitSystemSelected}
        size="small"
      />
    </div>
  );
}
