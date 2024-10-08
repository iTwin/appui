/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Properties
 */

import * as React from "react";
import type { PropertyRecord } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import type {
  IPropertyValueRenderer,
  PropertyValueRendererContext,
} from "../../ValueRendererManager.js";
import { PropertyContainerType } from "../../ValueRendererManager.js";
import { TableStructValueRenderer } from "./table/StructValueRenderer.js";
import { withContextStyle } from "./WithContextStyle.js";
import { Orientation } from "../../../common/Orientation.js";

/** Default Struct Property Renderer
 * @public
 */
export class StructPropertyValueRenderer implements IPropertyValueRenderer {
  /** Checks if the renderer can handle given property */
  public canRender(record: PropertyRecord) {
    return record.value.valueFormat === PropertyValueFormat.Struct;
  }

  /** Method that returns a JSX representation of PropertyRecord */
  public render(
    record: PropertyRecord,
    context?: PropertyValueRendererContext
  ) {
    if (context && context.containerType === PropertyContainerType.Table) {
      return withContextStyle(
        <TableStructValueRenderer
          propertyRecord={record}
          onDialogOpen={context.onDialogOpen}
          orientation={
            context.orientation ? context.orientation : Orientation.Horizontal
          }
        />,
        context
      );
    }

    if (
      context &&
      context.containerType === PropertyContainerType.PropertyPane
    ) {
      return withContextStyle("", context);
    }

    return withContextStyle(`{${record.property.typename}}`, context);
  }
}
