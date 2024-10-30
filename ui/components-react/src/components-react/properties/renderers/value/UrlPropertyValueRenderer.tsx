/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Properties
 */

import * as React from "react";
import type { LinkElementsInfo, PropertyRecord } from "@itwin/appui-abstract";
import { PropertyValueFormat, StandardTypeNames } from "@itwin/appui-abstract";
import type {
  IPropertyValueRenderer,
  PropertyValueRendererContext,
<<<<<<< HEAD
} from "../../ValueRendererManager";
import { PrimitivePropertyValueRendererImpl } from "./PrimitivePropertyValueRenderer";
import { convertRecordToString } from "./Common";
=======
} from "../../ValueRendererManager.js";
import { PrimitivePropertyValueRendererImpl } from "./PrimitivePropertyValueRenderer.js";
import { convertRecordToString } from "./Common.js";
import { openLink } from "../../../common/Links.js";
>>>>>>> 673112cd7 (Fixed `pw:` links handling in property grid (#1091))

/**
 * URL property value renderer that renders the whole value as a URL without matching it
 * against URL regex.
 *
 * @public
 */
export class UrlPropertyValueRenderer implements IPropertyValueRenderer {
  /** Checks if the renderer can handle given property */
  public canRender(record: PropertyRecord) {
    return (
      record.value.valueFormat === PropertyValueFormat.Primitive &&
      [
        StandardTypeNames.URL,
        StandardTypeNames.String,
        StandardTypeNames.Text,
      ].includes(record.property.typename as StandardTypeNames)
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
        linksHandler={URI_PROPERTY_LINK_HANDLER}
      />
    );
  }
}

const URI_PROPERTY_LINK_HANDLER: LinkElementsInfo = {
  onClick: openLink,
};
