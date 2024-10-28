import type { FormatProps, UnitSystemKey } from "@itwin/core-quantity";

/**
 * A data structure that associates unit systems with property value formatting props. The associations are used for
 * assigning formatting props for specific phenomenon and unit system combinations (see [[FormatsMap]]).
 *
 * @public
 */
export interface UnitSystemFormat {
  unitSystems: UnitSystemKey[];
  format: FormatProps;
}
/**
 * A data structure that associates specific phenomenon with one or more formatting props for specific unit system.
 *
 * Example:
 * ```json
 * {
 *   length: [{
 *     unitSystems: ["metric"],
 *     format: formatForCentimeters,
 *   }, {
 *     unitSystems: ["imperial", "usCustomary"],
 *     format: formatForInches,
 *   }, {
 *     unitSystems: ["usSurvey"],
 *     format: formatForUsSurveyInches,
 *   }]
 * }
 * ```
 *
 * @public
 */
export interface FormatOverrides {
  [phenomenon: string]: UnitSystemFormat | UnitSystemFormat[];
}

interface MatchingFormatOverrideProps {
  overrides: FormatOverrides;
  phenomenon: string;
  unitSystem: UnitSystemKey;
}

/** @public */
export function getMatchingFormatOverride({
  overrides,
  phenomenon,
  unitSystem,
}: MatchingFormatOverrideProps): FormatProps | undefined {
  const overridesForPhenomenon = overrides[phenomenon];
  if (!overridesForPhenomenon) {
    return undefined;
  }

  const overridesArray = Array.isArray(overridesForPhenomenon)
    ? overridesForPhenomenon
    : [overridesForPhenomenon];
  return overridesArray.find((override) =>
    override.unitSystems.includes(unitSystem)
  )?.format;
}
