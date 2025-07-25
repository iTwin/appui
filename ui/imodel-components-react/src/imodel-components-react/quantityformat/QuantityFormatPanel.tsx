/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module QuantityFormat
 */

import * as React from "react";
import type {
  CustomFormatPropEditorSpec,
  QuantityTypeArg,
} from "@itwin/core-frontend";
import {
  getQuantityTypeKey,
  IModelApp,
  isCheckboxFormatPropEditorSpec,
  isCustomQuantityTypeDefinition,
  isTextInputFormatPropEditorSpec,
  isTextSelectFormatPropEditorSpec,
} from "@itwin/core-frontend";
import type {
  FormatProps,
  UnitProps,
  UnitsProvider,
} from "@itwin/core-quantity";
import type { CommonProps } from "@itwin/core-react";
import { Checkbox, Input, Select } from "@itwin/itwinui-react";
import { FormatPanel } from "./FormatPanel.js";
import { DeepCompare } from "@itwin/core-geometry";

function createTextInputFormatPropEditor(
  key: string,
  label: string,
  inProps: FormatProps,
  getString: (props: FormatProps) => string,
  setString: (props: FormatProps, value: string) => FormatProps,
  fireFormatChange: (newProps: FormatProps) => void
) {
  const value = getString(inProps);
  return (
    <React.Fragment key={`${key}`}>
      <span key={`${key}-label`} className={"uicore-label"}>
        {label}
      </span>
      <Input
        data-testid={`${key}-editor`}
        key={`${key}-editor`}
        value={value}
        size="small"
        onChange={(e) => {
          const newProps = setString(inProps, e.currentTarget.value);
          fireFormatChange(newProps);
        }}
      />
    </React.Fragment>
  );
}
function createSelectFormatPropEditor(
  key: string,
  label: string,
  options: { label: string; value: string }[],
  inProps: FormatProps,
  getString: (props: FormatProps) => string,
  setString: (props: FormatProps, value: string) => FormatProps,
  fireFormatChange: (newProps: FormatProps) => void
) {
  const value = getString(inProps);
  return (
    <React.Fragment key={`${key}`}>
      <span key={`${key}-label`} className={"uicore-label"}>
        {label}
      </span>
      <Select
        data-testid={`${key}-editor`}
        key={`${key}-editor`}
        value={value}
        options={options}
        size={"small"}
        onChange={(newValue) => {
          const newProps = setString(inProps, newValue);
          fireFormatChange(newProps);
        }}
      />
    </React.Fragment>
  );
}

function createCheckboxFormatPropEditor(
  key: string,
  label: string,
  inProps: FormatProps,
  getBool: (props: FormatProps) => boolean,
  setBool: (props: FormatProps, isChecked: boolean) => FormatProps,
  fireFormatChange: (newProps: FormatProps) => void
) {
  const isChecked = getBool(inProps);
  return (
    <React.Fragment key={`${key}`}>
      <span key={`${key}-label`} className={"uicore-label"}>
        {label}
      </span>
      <Checkbox
        data-testid={`${key}-editor`}
        key={`${key}-editor`}
        checked={isChecked}
        onChange={(e) => {
          const newProps = setBool(inProps, e.target.checked);
          fireFormatChange(newProps);
        }}
      />
    </React.Fragment>
  );
}

function formatAreEqual(obj1: FormatProps, obj2: FormatProps) {
  const compare = new DeepCompare();
  return compare.compare(obj1, obj2);
}

/** Properties of [[QuantityFormatPanel]] component.
 * @alpha
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof QuantityFormatPanel>`
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface QuantityFormatPanelProps extends CommonProps {
  quantityType: QuantityTypeArg;
  onFormatChange?: (format: FormatProps) => void;
  /** props below are to be passed on to FormatPanel */
  showSample?: boolean;
  initialMagnitude?: number;
  enableMinimumProperties?: boolean;
}

/** Component to set properties that control Quantity Formatting.
 * @alpha
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function QuantityFormatPanel(props: QuantityFormatPanelProps) {
  const {
    quantityType,
    onFormatChange,
    showSample,
    initialMagnitude,
    enableMinimumProperties,
    ...rest
  } = props;
  const [formatProps, setFormatProps] = React.useState<FormatProps>();
  const initialFormatProps = React.useRef<FormatProps>();

  const [persistenceUnit, setPersistenceUnit] = React.useState<UnitProps>();

  React.useEffect(() => {
    const newFormatProps =
      IModelApp.quantityFormatter.getFormatPropsByQuantityType(quantityType);
    if (!initialFormatProps.current)
      initialFormatProps.current = newFormatProps;
    setFormatProps(newFormatProps);
    const quantityTypeKey = getQuantityTypeKey(quantityType);
    const quantityTypeDefinition =
      IModelApp.quantityFormatter.quantityTypesRegistry.get(quantityTypeKey);
    if (quantityTypeDefinition)
      setPersistenceUnit(quantityTypeDefinition.persistenceUnit);
    else
      throw Error(`Unable to locate a quantity type with type ${quantityType}`);
  }, [quantityType]); // no dependencies defined as we want this to run on every render

  // handle case where quantityType does not change but the formatProps for that quantity type has (ie after a Set or Clear)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    const newFormatProps =
      IModelApp.quantityFormatter.getFormatPropsByQuantityType(quantityType);
    if (initialFormatProps.current && newFormatProps) {
      if (!formatAreEqual(newFormatProps, initialFormatProps.current)) {
        initialFormatProps.current = newFormatProps;
        setFormatProps(newFormatProps);
      }
    }
  }); // no dependencies defined as we want this to run on every render

  const handleOnFormatChanged = React.useCallback(
    async (newProps: FormatProps) => {
      setFormatProps(newProps);
      onFormatChange && onFormatChange(newProps);
    },
    [onFormatChange]
  );

  const createCustomPropEditors = React.useCallback(
    (
      specs: CustomFormatPropEditorSpec[],
      inProps: FormatProps,
      fireFormatChange: (newProps: FormatProps) => void
    ) => {
      return specs.map((spec, index) => {
        if (isCheckboxFormatPropEditorSpec(spec))
          return createCheckboxFormatPropEditor(
            `${spec.editorType}-${index}`,
            spec.label,
            inProps,
            spec.getBool,
            spec.setBool,
            fireFormatChange
          );
        if (isTextSelectFormatPropEditorSpec(spec))
          return createSelectFormatPropEditor(
            `${spec.editorType}-${index}`,
            spec.label,
            spec.selectOptions,
            inProps,
            spec.getString,
            spec.setString,
            fireFormatChange
          );

        if (isTextInputFormatPropEditorSpec(spec))
          return createTextInputFormatPropEditor(
            `${spec.editorType}-${index}`,
            spec.label,
            inProps,
            spec.getString,
            spec.setString,
            fireFormatChange
          );

        return <div key={index} />;
      });
    },
    []
  );

  const providePrimaryChildren = React.useCallback(
    (
      inProps: FormatProps,
      fireFormatChange: (newProps: FormatProps) => void
    ) => {
      const quantityTypeKey = getQuantityTypeKey(quantityType);
      const quantityTypeDefinition =
        IModelApp.quantityFormatter.quantityTypesRegistry.get(quantityTypeKey);
      if (
        quantityTypeDefinition &&
        isCustomQuantityTypeDefinition(quantityTypeDefinition) &&
        quantityTypeDefinition.isCompatibleFormatProps(inProps)
      ) {
        if (quantityTypeDefinition.primaryPropEditorSpecs)
          return createCustomPropEditors(
            quantityTypeDefinition.primaryPropEditorSpecs,
            inProps,
            fireFormatChange
          );
      }
      return null;
    },
    [createCustomPropEditors, quantityType]
  );

  const provideSecondaryChildren = React.useCallback(
    (
      inProps: FormatProps,
      fireFormatChange: (newProps: FormatProps) => void
    ) => {
      const quantityTypeKey = getQuantityTypeKey(quantityType);
      const quantityTypeDefinition =
        IModelApp.quantityFormatter.quantityTypesRegistry.get(quantityTypeKey);
      if (
        quantityTypeDefinition &&
        isCustomQuantityTypeDefinition(quantityTypeDefinition) &&
        quantityTypeDefinition.isCompatibleFormatProps(inProps)
      ) {
        if (quantityTypeDefinition.secondaryPropEditorSpecs)
          return createCustomPropEditors(
            quantityTypeDefinition.secondaryPropEditorSpecs,
            inProps,
            fireFormatChange
          );
      }
      return null;
    },
    [createCustomPropEditors, quantityType]
  );

  const provideFormatSpec = React.useCallback(
    async (
      inProps: FormatProps,
      _persistenceUnit: UnitProps,
      _unitsProvider: UnitsProvider
    ) => {
      return IModelApp.quantityFormatter.generateFormatterSpecByType(
        quantityType,
        inProps
      );
    },
    [quantityType]
  );

  return (
    <div className="components-quantityFormat-quantityPanel">
      {persistenceUnit && formatProps && (
        <FormatPanel
          {...rest}
          onFormatChange={handleOnFormatChanged}
          showSample={showSample}
          initialMagnitude={initialMagnitude}
          enableMinimumProperties={enableMinimumProperties}
          initialFormat={formatProps}
          unitsProvider={IModelApp.quantityFormatter.unitsProvider}
          persistenceUnit={persistenceUnit}
          providePrimaryChildren={providePrimaryChildren}
          provideSecondaryChildren={provideSecondaryChildren}
          provideFormatSpec={provideFormatSpec}
        />
      )}
    </div>
  );
}
