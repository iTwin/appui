/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { IModelConnection, QuantityTypeArg } from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import type { FormatterSpec, ParserSpec } from "@itwin/core-quantity";
import { FormatType, parseFormatType } from "@itwin/core-quantity";
import type { KindOfQuantity } from "@itwin/ecschema-metadata";

/**
 * Finds formatter and parser specs for a given quantity type.
 * @internal
 */
export async function getFormatterParserSpec({
  imodel,
  type,
}: {
  imodel: IModelConnection;
  type: QuantityTypeArg;
}): Promise<
  | {
      formatterSpec: FormatterSpec;
      parserSpec: ParserSpec;
      highPrecisionFormatterSpec: FormatterSpec;
    }
  | undefined
> {
  // fallback to IModelApp.quantityFormatter:
  // - if `itwinjs-core` v4 is used
  // - don't have an iModelConnection to look up KOQ
  // - old quantity type enum is used instead of KOQ name
  if (!IModelApp.formatsProvider || typeof type !== "string") {
    const quantityFormatterSpec =
      IModelApp.quantityFormatter.findFormatterSpecByQuantityType(type);
    const quantityParserSpec =
      IModelApp.quantityFormatter.findParserSpecByQuantityType(type);

    return quantityFormatterSpec && quantityParserSpec
      ? {
          highPrecisionFormatterSpec: quantityFormatterSpec,
          formatterSpec: quantityFormatterSpec,
          parserSpec: quantityParserSpec,
        }
      : undefined;
  }

  const koq = await imodel.schemaContext.getSchemaItem(type);
  if (!koq) {
    return undefined;
  }

  // TODO: `KindOfQuantity` here is used only as a type because we don't have peerDep on `ecschema-metadata`
  // It should be added when dropping `itwinjs-core` v4 support
  const persistenceUnit = await (koq as KindOfQuantity).persistenceUnit;
  const formatProps = await IModelApp.formatsProvider.getFormat(type);
  if (!persistenceUnit || !formatProps) {
    return undefined;
  }

  const persistenceUnitName = persistenceUnit.fullName;
  const highPrecisionFormatterSpec =
    await IModelApp.quantityFormatter.createFormatterSpec({
      formatProps: {
        ...formatProps,
        precision:
          parseFormatType(formatProps.type, "") === FormatType.Decimal
            ? 12
            : formatProps.precision,
      },
      persistenceUnitName,
    });
  const formatterSpec = await IModelApp.quantityFormatter.createFormatterSpec({
    formatProps,
    persistenceUnitName,
  });
  const parserSpec = await IModelApp.quantityFormatter.createParserSpec({
    formatProps,
    persistenceUnitName,
  });
  return {
    highPrecisionFormatterSpec,
    formatterSpec,
    parserSpec,
  };
}
