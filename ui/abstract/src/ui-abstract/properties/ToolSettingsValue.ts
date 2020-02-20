/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Properties
 */

import { PropertyDescription } from "./Description";
import { PrimitiveValue, PropertyValue, PropertyValueFormat } from "./Value";
import { PropertyRecord } from "./Record";
import { EditorPosition } from "../dialogs/DialogItem";

/** Primitive ToolSettings Value.
 * @beta
 */
export class ToolSettingsValue implements PrimitiveValue {
  public readonly valueFormat = PropertyValueFormat.Primitive;
  public value?: number | string | boolean | Date;
  public displayValue?: string;

  public constructor(value?: number | string | boolean | Date, displayValue?: string) {
    this.value = value;
    this.displayValue = displayValue;
  }

  public get isNullValue(): boolean {
    return undefined === this.value;
  }

  public get hasDisplayValue(): boolean {
    return undefined !== this.displayValue;
  }

  public update(newValue: ToolSettingsValue): boolean {
    // istanbul ignore next
    if (newValue.valueFormat !== this.valueFormat)
      throw new Error("ToolSettingsValue.update requires both values to be of the same format");

    // istanbul ignore else
    if (this.value === newValue.value && this.displayValue === newValue.displayValue)
      return false;

    this.value = newValue.value;
    this.displayValue = newValue.displayValue;
    return true;
  }

  public clone(): ToolSettingsValue {
    return new ToolSettingsValue(this.value, this.displayValue);
  }
}

/** Class used to identify a specific ToolSettings property value. This is the minimal amount of info necessary to specify which property a value is associated with. This is used to both
 * display property in UI, save and retrieve the state of the property, and to allow the UI to inform the Tool code about property changes.
 * @beta
 */
export class ToolSettingsPropertyItem {
  public value: ToolSettingsValue;
  public propertyName: string;

  public constructor(value: ToolSettingsValue, propertyName: string) {
    this.value = value;
    this.propertyName = propertyName;
  }
}
/** Class used to identify a specific ToolSettings property value that can be enabled/disabled in UI.
 * @beta
 */
export class ToolSettingsPropertySyncItem extends ToolSettingsPropertyItem {
  /** used to pass enable state to Ui from Tool so property record can be updated */
  public isDisabled?: boolean;

  public constructor(value: ToolSettingsValue, propertyName: string, isDisabled?: boolean) {
    super(value, propertyName);
    this.isDisabled = isDisabled;
  }
}

/** Property Record to specify an editor in Tool Settings zone.
 * @beta
 */
export class ToolSettingsPropertyRecord extends PropertyRecord {
  public editorPosition: EditorPosition;
  public lockProperty?: PropertyRecord;

  public constructor(value: PropertyValue, property: PropertyDescription, editorPosition: EditorPosition, isReadonly = false, lockProperty?: PropertyRecord) {
    super(value, property);
    this.editorPosition = editorPosition;
    this.isReadonly = isReadonly;
    this.lockProperty = lockProperty;
  }

  public static clone(record: ToolSettingsPropertyRecord, newValue?: ToolSettingsValue): ToolSettingsPropertyRecord {
    const value = Object.assign({}, newValue ? newValue : record.value);
    const newRecord = new ToolSettingsPropertyRecord(value, record.property, record.editorPosition, record.isReadonly, record.lockProperty);
    newRecord.isDisabled = record.isDisabled;
    return newRecord;
  }
}
