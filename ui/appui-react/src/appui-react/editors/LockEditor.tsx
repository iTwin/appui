/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module UiProvider
 */

import * as React from "react";
import type { PropertyEditorProps, TypeEditor } from "@itwin/components-react";
import { PropertyEditorBase } from "@itwin/components-react";
import { IconButton } from "@itwin/itwinui-react";
import { SvgLock, SvgLockUnlocked } from "@itwin/itwinui-icons-react";
import type { PropertyValue } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";

const LockEditor = React.forwardRef<TypeEditor, PropertyEditorProps>(
  function LockEditor(props, forwardedRef) {
    const ref = React.useRef<HTMLButtonElement>(null);
    const getCurrentValue = () => {
      if (
        props.propertyRecord &&
        props.propertyRecord.value.valueFormat === PropertyValueFormat.Primitive
      ) {
        return props.propertyRecord.value.value as boolean;
      }
      return false;
    };
    const currentValue = getCurrentValue();

    React.useImperativeHandle(
      forwardedRef,
      () => ({
        getPropertyValue: async () => {
          let propertyValue: PropertyValue | undefined;
          if (
            props.propertyRecord &&
            props.propertyRecord.value.valueFormat ===
              PropertyValueFormat.Primitive
          ) {
            propertyValue = {
              valueFormat: PropertyValueFormat.Primitive,
              value: currentValue,
              displayValue: "",
            };
          }
          return propertyValue;
        },
        htmlElement: ref.current,
        hasFocus: document.activeElement === ref.current,
      }),
      [currentValue, props.propertyRecord]
    );

    const displayLabel = props.propertyRecord?.property.displayLabel;
    const label = displayLabel ? displayLabel : "Toggle lock";
    const disabled = props.propertyRecord?.isDisabled;
    return (
      <IconButton
        ref={ref}
        label={label}
        size="small"
        styleType="borderless"
        isActive={currentValue}
        disabled={disabled}
        onClick={() => {
          if (!props.propertyRecord || !props.onCommit) return;
          props.onCommit({
            propertyRecord: props.propertyRecord,
            newValue: {
              valueFormat: PropertyValueFormat.Primitive,
              value: !currentValue,
              displayValue: "",
            },
          });
        }}
      >
        {currentValue ? <SvgLock /> : <SvgLockUnlocked />}
      </IconButton>
    );
  }
);

/** @internal */
export class LockPropertyEditor extends PropertyEditorBase {
  public get reactNode() {
    return <LockEditor />;
  }
}

/** @internal */
export const LockPropertyEditorName = "appui-internal:tool-settings-lock";
