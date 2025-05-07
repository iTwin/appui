/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Settings
 */

import * as React from "react";
import { Select } from "@itwin/itwinui-react";
import type { FormatSet } from "@itwin/ecschema-metadata";


/** Props for [[FormatSetSelector]]
 * @beta
 */
interface FormatSetSelectorProps {
  /** The currently selected FormatSet */
  selectedFormatSet: FormatSet;
  /** The callback to call when the FormatSet is changed */
  onFormatSetChanged: (newFormatSet: FormatSet) => void;
  /** The available FormatSets */
  availableFormatSets: FormatSet[];

  createNewFormatSet?: () => void;
}

/** Select control to set the "active" Format Set. This setting determine what units are displayed for quantity values (i.e. foot vs meter).
 * @beta
 */
export function FormatSetSelector(props: FormatSetSelectorProps) {
  const { selectedFormatSet, onFormatSetChanged, availableFormatSets } =
    props;
  const handleFormatSetChanged = React.useCallback(
    (formatSetName: string) => {
      const foundFormatSet = availableFormatSets.find(
        (formatSet) => formatSet.name === formatSetName
      );
      foundFormatSet && onFormatSetChanged && onFormatSetChanged(foundFormatSet);
    },
    [availableFormatSets, onFormatSetChanged]
  );

  const formatSetOptions = availableFormatSets.map((formatSet) => ({
    value: formatSet.name,
    label: formatSet.label,
  }));

  const formatSetKey = selectedFormatSet.label;

  return (
    <div className="quantity-format-set-selector-container">
      <span className={"uicore-label"}>
        Available Format Sets
      </span>
      <Select
        data-testid="format-set-selector"
        value={formatSetKey}
        options={formatSetOptions}
        onChange={handleFormatSetChanged}
        size="small"
      />
      {/* TODO: Add a IconButton that opens a dialog to create a new format set */}

    </div>
  );
}
