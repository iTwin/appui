/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { IModelConnection, QuantityTypeArg } from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import {
  type FormatterSpec,
  FormatType,
  parseFormatType,
  type ParserSpec,
} from "@itwin/core-quantity";
import * as React from "react";
import { useIModelConnection } from "../../IModelConnectionContext.js";
import type { KindOfQuantity } from "@itwin/ecschema-metadata";

/* v8 ignore start */

interface UseQuantityInfoProps {
  type: QuantityTypeArg | undefined;
}

/**
 * Hook that finds the formatter and parser in `IModelApp.quantityFormatter` for a given quantity type.
 * @internal
 */
export function useQuantityInfo({ type }: UseQuantityInfoProps) {
  const [{ defaultFormatter, highPrecisionFormatter, parser }, setState] =
    React.useState<{
      defaultFormatter: FormatterSpec | undefined;
      highPrecisionFormatter: FormatterSpec | undefined;
      parser: ParserSpec | undefined;
    }>(() => ({
      defaultFormatter: undefined,
      highPrecisionFormatter: undefined,
      parser: undefined,
    }));

  const imodel = useIModelConnection();

  React.useEffect(() => {
    if (type === undefined) {
      setState({
        defaultFormatter: undefined,
        highPrecisionFormatter: undefined,
        parser: undefined,
      });
      return;
    }

    let disposed = false;
    const loadFormatterParser = async () => {
      const { defaultFormatterSpec, highPrecisionFormatterSpec, parserSpec } =
        await getFormatterParserSpec({
          imodel,
          type,
        });

      if (!disposed) {
        setState({
          defaultFormatter: defaultFormatterSpec,
          highPrecisionFormatter: highPrecisionFormatterSpec,
          parser: parserSpec,
        });
      }
    };

    void loadFormatterParser();

    const removeListeners = [
      IModelApp.quantityFormatter.onActiveFormattingUnitSystemChanged.addListener(
        loadFormatterParser
      ),
      IModelApp.quantityFormatter.onQuantityFormatsChanged.addListener(
        ({ quantityType }) => {
          if (quantityType === type) {
            void loadFormatterParser();
          }
        }
      ),
    ];
    if (IModelApp.formatsProvider) {
      removeListeners.push(
        IModelApp.formatsProvider.onFormatsChanged.addListener(async () =>
          loadFormatterParser()
        )
      );
    }

    return () => {
      disposed = true;
      removeListeners.forEach((remove) => {
        remove();
      });
    };
  }, [imodel, type]);

  return { defaultFormatter, highPrecisionFormatter, parser };
}

async function getFormatterParserSpec({
  imodel,
  type,
}: {
  imodel?: IModelConnection;
  type: QuantityTypeArg;
}) {
  // fallback to IModelApp.quantityFormatter:
  // - if `itwinjs-core` v4 is used
  // - don't have an iModelConnection to look up KOQ
  // - old quantity type enum is used instead of KOQ name
  if (!IModelApp.formatsProvider || !imodel || typeof type !== "string") {
    const quantityFormatterSpec =
      IModelApp.quantityFormatter.findFormatterSpecByQuantityType(type);
    const quantityParserSpec =
      IModelApp.quantityFormatter.findParserSpecByQuantityType(type);

    return {
      highPrecisionFormatterSpec: quantityFormatterSpec,
      defaultFormatterSpec: quantityFormatterSpec,
      parserSpec: quantityParserSpec,
    };
  }

  const koq = await imodel.schemaContext.getSchemaItem(type);
  if (!koq) {
    return {
      highPrecisionFormatterSpec: undefined,
      defaultFormatterSpec: undefined,
      parser: undefined,
    };
  }

  // TODO: `KindOfQuantity` here is used only as a type because we don't have peerDep on `ecschema-metadata`
  // It should be added when dropping `itwinjs-core` v4 support
  const persistenceUnit = await (koq as KindOfQuantity).persistenceUnit;
  const formatProps = await IModelApp.formatsProvider.getFormat(type);
  if (!persistenceUnit || !formatProps) {
    return {
      highPrecisionFormatterSpec: undefined,
      defaultFormatterSpec: undefined,
      parser: undefined,
    };
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
  const defaultFormatterSpec =
    await IModelApp.quantityFormatter.createFormatterSpec({
      formatProps,

      persistenceUnitName,
    });
  const parserSpec = await IModelApp.quantityFormatter.createParserSpec({
    formatProps,
    persistenceUnitName,
  });
  return {
    highPrecisionFormatterSpec,
    defaultFormatterSpec,
    parserSpec,
  };
}

/* v8 ignore stop */
