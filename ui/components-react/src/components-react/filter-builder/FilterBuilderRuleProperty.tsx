/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyFilterBuilder
 */

import * as React from "react";
import type { PropertyDescription } from "@itwin/appui-abstract";
import type { SelectOption } from "@itwin/itwinui-react";
import { ComboBox, MenuItem } from "@itwin/itwinui-react";
import { UiComponents } from "../UiComponents";

type ComboBoxProps<T> = React.ComponentPropsWithoutRef<typeof ComboBox<T>>;

/**
 * Props for [[PropertyFilterBuilderRuleProperty]] component.
 * @internal
 */
export interface PropertyFilterBuilderRulePropertyProps {
  /** List of available properties. */
  properties: PropertyDescription[];
  /** Currently selected property. */
  selectedProperty?: PropertyDescription;
  /** Callback that is invoked when selected property changes. */
  onSelectedPropertyChanged: (property?: PropertyDescription) => void;
  /** Custom renderer for property item inside selector. */
  propertyRenderer?: (name: string) => React.ReactNode;
  /** Specifies whether selector should be disabled or not. */
  isDisabled?: boolean;
}

/**
 * Component that renders [[PropertyFilterBuilderRuleRenderer]] property selector.
 * @internal
 */
export function PropertyFilterBuilderRuleProperty(
  props: PropertyFilterBuilderRulePropertyProps
) {
  const {
    selectedProperty,
    properties,
    onSelectedPropertyChanged,
    propertyRenderer,
    isDisabled,
  } = props;

  const selectOptions = React.useMemo<SelectOption<string>[]>(
    () =>
      properties.map((property) => ({
        id: property.name,
        label: property.displayLabel,
        value: property.name,
      })),
    [properties]
  );

  const onPropertyChanged = React.useCallback(
    (name: string) => {
      onSelectedPropertyChanged(
        properties.find((property) => property.name === name)
      );
    },
    [properties, onSelectedPropertyChanged]
  );

  React.useEffect(() => {
    const currentSelectedProperty = properties.find(
      (property) => property.name === selectedProperty?.name
    );
    if (currentSelectedProperty?.name !== selectedProperty?.name)
      onSelectedPropertyChanged(currentSelectedProperty);
  }, [properties, selectedProperty, onSelectedPropertyChanged]);

  const itemRenderer = React.useCallback<
    Required<ComboBoxProps<string>>["itemRenderer"]
  >(
    (selectOption, { isSelected, id }) => {
      return (
        <MenuItem key={id} id={id} isSelected={isSelected}>
          {propertyRenderer
            ? propertyRenderer(selectOption.value)
            : selectOption.label}
        </MenuItem>
      );
    },
    [propertyRenderer]
  );

  return (
    <div className="fb-property-name">
      <ComboBox
        options={selectOptions}
        onChange={onPropertyChanged}
        value={selectedProperty?.name}
        inputProps={{
          placeholder: UiComponents.translate("filterBuilder.chooseProperty"),
          disabled: isDisabled,
          size: "small",
        }}
        itemRenderer={itemRenderer}
        enableVirtualization={true}
      />
    </div>
  );
}
