/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Properties */

import { IPropertyValueRenderer, PropertyValueRendererContext } from "../../ValueRendererManager";
import { PropertyRecord } from "../../Record";
import { PropertyValueFormat, PrimitiveValue } from "../../Value";
import { TypeConverterManager } from "../../../converters/TypeConverterManager";
import { withContextStyle } from "./WithContextStyle";

/** Default Navigation Property Renderer */
export class NavigationPropertyValueRenderer implements IPropertyValueRenderer {

  public canRender(record: PropertyRecord) {
    return record.value.valueFormat === PropertyValueFormat.Primitive
      && record.property.typename === "navigation";
  }

  public render(record: PropertyRecord, context?: PropertyValueRendererContext) {
    const value = (record.value as PrimitiveValue).displayValue;
    if (value !== undefined)
      return withContextStyle(TypeConverterManager.getConverter(record.property.typename).convertPropertyToString(record.property, value), context);
    return "";
  }
}
