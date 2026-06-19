/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { QuantityTypeArg } from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import { type FormatterSpec, type ParserSpec } from "@itwin/core-quantity";
import * as React from "react";
import { useIModelConnection } from "../../IModelConnectionContext.js";
import { getFormatterParserSpec } from "../../KoqUtilities.js";

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
    if (type === undefined || !imodel) {
      setState({
        defaultFormatter: undefined,
        highPrecisionFormatter: undefined,
        parser: undefined,
      });
      return;
    }

    let disposed = false;
    const loadFormatterParser = async () => {
      const { formatterSpec, highPrecisionFormatterSpec, parserSpec } =
        (await getFormatterParserSpec({
          imodel,
          type,
        })) ?? {
          formatterSpec: undefined,
          highPrecisionFormatterSpec: undefined,
          parserSpec: undefined,
        };

      if (!disposed) {
        setState({
          defaultFormatter: formatterSpec,
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

/* v8 ignore stop */
