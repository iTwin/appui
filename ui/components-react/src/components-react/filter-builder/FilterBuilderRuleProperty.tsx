/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module FilterBuilder
 */

import * as React from "react";
import "./FilterBuilderPropertyName.scss";
import type { PropertyDescription } from "@itwin/appui-abstract";
import type { ComboBoxProps, SelectOption } from "@itwin/itwinui-react";
import { ComboBox, MenuItem } from "@itwin/itwinui-react";
import { UiComponents } from "../UiComponents";

/**
 * Props for [[FilterBuilderRuleProperty]] component.
 * @internal
 */
export interface FilterBuilderRulePropertyProps {
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
  /** Size to render the component */
  size?: "small" | "large";
}

/**
 * Component that renders [[FilterBuilderRuleRenderer]] property selector.
 * @internal
 */
export function FilterBuilderRuleProperty(
  props: FilterBuilderRulePropertyProps
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
    <div className="fb-property-name fb-row-name">
      <ComboBox
        options={selectOptions}
        onChange={onPropertyChanged}
        value={selectedProperty?.name}
        inputProps={{
          placeholder: UiComponents.translate("filterBuilder.chooseProperty"),
          disabled: isDisabled,
          size: props.size,
        }}
        itemRenderer={itemRenderer}
        enableVirtualization={true}
      />
    </div>
  );
}
