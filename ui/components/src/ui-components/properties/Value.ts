/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Properties */

import { PropertyRecord } from "./Record";
import * as Primitives from "../converters/valuetypes/PrimitiveTypes";

/**
 * Enumeration for Format of the property value.
 */
export enum PropertyValueFormat {
  Primitive,
  Array,
  Struct,
}

/** Base interface for a property value */
export interface BasePropertyValue {
  valueFormat: PropertyValueFormat;
}

/** Primitive property value */
export interface PrimitiveValue extends BasePropertyValue {
  valueFormat: PropertyValueFormat.Primitive;
  value?: Primitives.Value;
  displayValue: string;
}

/** Struct property value */
export interface StructValue extends BasePropertyValue {
  valueFormat: PropertyValueFormat.Struct;
  members: { [name: string]: PropertyRecord };
}

/** Array property value */
export interface ArrayValue extends BasePropertyValue {
  valueFormat: PropertyValueFormat.Array;
  items: PropertyRecord[];
  itemsTypeName: string;
}

/** Type for all property values */
export type PropertyValue = PrimitiveValue | StructValue | ArrayValue;
