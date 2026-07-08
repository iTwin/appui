/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import type { PropertyRecord } from "@itwin/appui-abstract";
import { PropertyValueFormat, StandardTypeNames } from "@itwin/appui-abstract";
import { assert } from "@itwin/core-bentley";
import type {
  IPropertyValueRenderer,
  PropertyValueRendererContext,
} from "@itwin/components-react";
import { useIModelConnection } from "../IModelConnectionContext.js";
import { IModelApp, type IModelConnection } from "@itwin/core-frontend";
import {
  convertRecordToString,
  PrimitivePropertyValueRendererImpl,
} from "@itwin/components-react/internal";
import { ValueUtilities } from "@itwin/components-react";
import { getFormatterParserSpec } from "../KoqUtilities.js";

/**
 * Name of the renderer for properties with kind of quantity.
 * @public
 */
export const KOQ_RENDERER_NAME = "KoqPropertyValueRenderer";

/**
 * Renderer for properties with kind of quantity.
 * @internal
 */
export class KoqPropertyValueRenderer implements IPropertyValueRenderer {
  /** Checks if the renderer can handle given property */
  public canRender(record: PropertyRecord) {
    return (
      record.value.valueFormat === PropertyValueFormat.Primitive &&
      (record.property.typename === StandardTypeNames.Double.valueOf() ||
        record.property.typename === StandardTypeNames.Float.valueOf()) &&
      !!record.property.kindOfQuantityName
    );
  }

  /** Method that returns a JSX representation of PropertyRecord */
  public render(
    record: PropertyRecord,
    context?: PropertyValueRendererContext
  ) {
    return <KoqRenderer record={record} context={context} />;
  }
}

function KoqRenderer(props: {
  record: PropertyRecord;
  context?: PropertyValueRendererContext;
}) {
  const { record, context } = props;
  const imodel = useIModelConnection();
  const stringValueCalculator = React.useCallback(
    async (recordToFormat: PropertyRecord) => {
      return imodel
        ? formatKoqValue(recordToFormat, imodel)
        : convertRecordToString(recordToFormat);
    },
    [imodel]
  );
  return (
    <PrimitivePropertyValueRendererImpl
      record={record}
      context={context}
      stringValueCalculator={stringValueCalculator}
    />
  );
}

async function formatKoqValue(
  record: PropertyRecord,
  imodel: IModelConnection
): Promise<string> {
  const value = record.value;
  const koqName = record.property.kindOfQuantityName;
  assert(
    value.valueFormat === PropertyValueFormat.Primitive,
    "PropertyRecord value is not primitive"
  );
  assert(koqName !== undefined, "Kind of quantity name is undefined");

  const { formatterSpec } = (await getFormatterParserSpec({
    imodel,
    type: koqName,
  })) ?? { formatterSpec: undefined };

  if (!formatterSpec) {
    return convertRecordToString(record);
  }

  if (record.isMerged) {
    return `${ValueUtilities.MERGED_VALUE} ${
      formatterSpec.unitConversions?.[0]?.label ?? ""
    }`;
  }

  return IModelApp.quantityFormatter.formatQuantity(
    value.value as number,
    formatterSpec
  );
}
