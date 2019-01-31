/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Properties */

import * as React from "react";
import { IPropertyValueRenderer, PropertyValueRendererContext, PropertyContainerType } from "../../ValueRendererManager";
import { PropertyRecord, PropertyValueFormat } from "@bentley/imodeljs-frontend";
import { Orientation } from "@bentley/ui-core";
import { TableStructValueRenderer } from "./table/StructValueRenderer";
import { withContextStyle } from "./WithContextStyle";

/** Default Struct Property Renderer */
export class StructPropertyValueRenderer implements IPropertyValueRenderer {
  public canRender(record: PropertyRecord) {
    return record.value.valueFormat === PropertyValueFormat.Struct;
  }

  public render(record: PropertyRecord, context?: PropertyValueRendererContext) {
    if (context && context.containerType === PropertyContainerType.Table) {
      return withContextStyle(
        <TableStructValueRenderer
          propertyRecord={record}
          onDialogOpen={context.onDialogOpen}
          orientation={context.orientation ? context.orientation : Orientation.Horizontal}
        />,
        context,
      );
    }

    if (context && context.containerType === PropertyContainerType.PropertyPane) {
      return withContextStyle("", context);
    }

    return withContextStyle(`{${record.property.typename}}`, context);
  }
}
