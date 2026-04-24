/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Properties
 */

import * as React from "react";
import type { PrimitiveValue, PropertyRecord } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import type {
  IPropertyValueRenderer,
  PropertyValueRendererContext,
} from "../../ValueRendererManager.js";
import { withContextStyle } from "./WithContextStyle.js";

/** Default Merged Property Renderer
 * @public
 */
export class MergedPropertyValueRenderer implements IPropertyValueRenderer {
  /** Checks if the renderer can handle given property */
  public canRender(record: PropertyRecord) {
    return (
      !!record.isMerged &&
      record.value.valueFormat === PropertyValueFormat.Primitive
    );
  }

  /** Method that returns a JSX representation of PropertyRecord */
  public render(
    record: PropertyRecord,
    context?: PropertyValueRendererContext
  ): React.ReactNode {
    const displayValue = (record.value as PrimitiveValue).displayValue;
    const text = displayValue?.startsWith("--") ? displayValue : "--";
    return withContextStyle(<>{text}</>, context);
  }
}
