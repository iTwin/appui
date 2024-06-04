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
import { Orientation } from "@itwin/core-react";
import type {
  IPropertyValueRenderer,
  PropertyValueRendererContext,
} from "../../ValueRendererManager";
import { PropertyContainerType } from "../../ValueRendererManager";
import { TableStructValueRenderer } from "./table/StructValueRenderer";
import { ContextStyle } from "./WithContextStyle";

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
      return (
        <ContextStyle context={context}>
          <TableStructValueRenderer
            propertyRecord={record}
            onDialogOpen={context.onDialogOpen}
            orientation={
              context.orientation ? context.orientation : Orientation.Horizontal
            }
          />
        </ContextStyle>
      );
    }

    if (
      context &&
      context.containerType === PropertyContainerType.PropertyPane
    ) {
      return <ContextStyle context={context} />;
    }

    return (
      <ContextStyle context={context}>
        {`{${record.property.typename}}`}
      </ContextStyle>
    );
  }
}
