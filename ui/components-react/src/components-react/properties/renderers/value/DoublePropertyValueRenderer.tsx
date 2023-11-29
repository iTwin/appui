/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Properties
 */

import * as React from "react";
import type { PropertyRecord } from "@itwin/appui-abstract";
import { PropertyValueFormat, StandardTypeNames } from "@itwin/appui-abstract";
import type {
  IPropertyValueRenderer,
  PropertyValueRendererContext,
} from "../../ValueRendererManager";
import { PrimitivePropertyValueRendererImpl } from "./PrimitivePropertyValueRenderer";
import { convertRecordToString } from "./Common";

/** Default Double Property Renderer
 * @public
 */
export class DoublePropertyValueRenderer implements IPropertyValueRenderer {
  /** Checks if the renderer can handle given property */
  public canRender(record: PropertyRecord) {
    return (
      record.value.valueFormat === PropertyValueFormat.Primitive &&
      record.property.typename === StandardTypeNames.Double
    );
  }

  /** Method that returns a JSX representation of PropertyRecord */
  public render(
    record: PropertyRecord,
    context?: PropertyValueRendererContext
  ) {
    return (
      <PrimitivePropertyValueRendererImpl
        record={record}
        context={context}
        stringValueCalculator={convertRecordToString}
      />
    );
  }
}
