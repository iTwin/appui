/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { QuantityTypeArg } from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import type { FormatterSpec, ParserSpec } from "@itwin/core-quantity";
import * as React from "react";

interface UseQuantityInfoProps {
  type: QuantityTypeArg | undefined;
}

/**
 * Hook that finds the formatter and parser in `IModelApp.quantityFormatter` for a given quantity type.
 * @internal
 */
export function useQuantityInfo({ type }: UseQuantityInfoProps) {
  const [{ formatter, parser }, setState] = React.useState<{
    formatter: FormatterSpec | undefined;
    parser: ParserSpec | undefined;
  }>(() => ({
    formatter: undefined,
    parser: undefined,
  }));

  React.useEffect(() => {
    if (type === undefined) {
      setState({
        formatter: undefined,
        parser: undefined,
      });
      return;
    }

    const loadFormatterParser = () => {
      const formatterSpec =
        IModelApp.quantityFormatter.findFormatterSpecByQuantityType(type);
      const parserSpec =
        IModelApp.quantityFormatter.findParserSpecByQuantityType(type);

      setState({ formatter: formatterSpec, parser: parserSpec });
    };

    loadFormatterParser();
    const removeListeners = [
      IModelApp.quantityFormatter.onActiveFormattingUnitSystemChanged.addListener(
        loadFormatterParser
      ),
      IModelApp.quantityFormatter.onQuantityFormatsChanged.addListener(
        ({ quantityType }) => {
          if (quantityType === type) {
            loadFormatterParser();
          }
        }
      ),
    ];

    return () => {
      removeListeners.forEach((remove) => {
        remove();
      });
    };
  }, [type]);

  return { formatter, parser };
}
