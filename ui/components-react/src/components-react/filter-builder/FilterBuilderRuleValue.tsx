/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { PropertyDescription, PropertyValue} from "@itwin/appui-abstract";
import { PropertyRecord, PropertyValueFormat } from "@itwin/appui-abstract";
import type { PropertyUpdatedArgs } from "../editors/EditorContainer";
import { EditorContainer } from "../editors/EditorContainer";

/** @alpha */
export interface PropertyFilterBuilderRuleValueProps {
  value?: PropertyValue;
  property: PropertyDescription;
  onChange: (value: PropertyValue) => void;
}

/** @alpha */
export function PropertyFilterBuilderRuleValue(props: PropertyFilterBuilderRuleValueProps) {
  const { value, property, onChange } = props;

  const propertyRecord = React.useMemo(() => {
    return new PropertyRecord(value ?? { valueFormat: PropertyValueFormat.Primitive }, property);
  }, [value, property]);

  const onValueChange = React.useCallback(({ newValue }: PropertyUpdatedArgs) => {
    onChange(newValue);
  }, [onChange]);

  return <div className="rule-value">
    <EditorContainer
      propertyRecord={propertyRecord}
      onCancel={/* istanbul ignore next */ () => { }}
      onCommit={onValueChange}
      setFocus={false}
    />
  </div>;
}
