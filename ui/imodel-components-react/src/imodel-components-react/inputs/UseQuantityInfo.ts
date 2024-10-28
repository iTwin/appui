import type { FormatOverrides } from "@itwin/components-react";
import { getMatchingFormatOverride } from "@itwin/components-react";
import type { QuantityTypeArg } from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import { Format, FormatterSpec, ParserSpec } from "@itwin/core-quantity";
import * as React from "react";

interface UseQuantityInfoProps {
  type: QuantityTypeArg | undefined;
  formatOverrides?: FormatOverrides;
}

/**
 *
 */
export function useQuantityInfo({
  type,
  formatOverrides,
}: UseQuantityInfoProps) {
  const [{ formatter, parser }, setState] = React.useState<{
    formatter: FormatterSpec | undefined;
    parser: ParserSpec | undefined;
  }>(() => ({
    formatter: undefined,
    parser: undefined,
  }));

  React.useEffect(() => {
    const defaultFormatterSpec =
      type !== undefined
        ? IModelApp.quantityFormatter.findFormatterSpecByQuantityType(type)
        : undefined;
    if (defaultFormatterSpec === undefined) {
      setState({
        formatter: undefined,
        parser: undefined,
      });
      return;
    }

    const persistenceUnit = defaultFormatterSpec.persistenceUnit;
    const defaultFormat = defaultFormatterSpec.format;

    let disposed = false;
    const loadFormatterParser = async () => {
      const unitsProvider = IModelApp.quantityFormatter.unitsProvider;
      const phenomenon = persistenceUnit.phenomenon;
      const overrideFormatProps = getMatchingFormatOverride({
        overrides: formatOverrides ?? {},
        phenomenon,
        unitSystem: IModelApp.quantityFormatter.activeUnitSystem,
      });

      const format =
        overrideFormatProps !== undefined
          ? await Format.createFromJSON("", unitsProvider, overrideFormatProps)
          : defaultFormat;

      const newFormatter = await FormatterSpec.create(
        "",
        format,
        unitsProvider,
        persistenceUnit
      );
      const newParser = await ParserSpec.create(
        format,
        unitsProvider,
        persistenceUnit
      );

      if (disposed) {
        return;
      }

      setState({ formatter: newFormatter, parser: newParser });
    };

    void loadFormatterParser();
    const removeListeners = [
      IModelApp.quantityFormatter.onActiveFormattingUnitSystemChanged.addListener(
        () => void loadFormatterParser()
      ),
      IModelApp.quantityFormatter.onQuantityFormatsChanged.addListener(
        ({ quantityType }) => {
          if (quantityType === type) {
            void loadFormatterParser();
          }
        }
      ),
    ];

    return () => {
      disposed = true;
      removeListeners.forEach((remove) => {
        remove();
      });
    };
  }, [type, formatOverrides]);

  return { formatter, parser };
}
