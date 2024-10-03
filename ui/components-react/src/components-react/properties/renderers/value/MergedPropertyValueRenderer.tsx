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
import { withContextStyle } from "./WithContextStyle.js";
import { useTranslation } from "../../../l10n/useTranslation.js";

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
    _record: PropertyRecord,
    context?: PropertyValueRendererContext
  ) {
    return withContextStyle(<VariesRenderer />, context);
  }
}

function VariesRenderer() {
  const { translate } = useTranslation();
  return <>{translate("property.varies")}</>;
}
