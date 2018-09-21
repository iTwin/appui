/*---------------------------------------------------------------------------------------------
|  $Copyright: (c) 2018 Bentley Systems, Incorporated. All rights reserved. $
*--------------------------------------------------------------------------------------------*/
import { UnitProps, UnitsProvider, UnitConversion, BadUnit } from "@bentley/imodeljs-quantity";

export class ConversionData implements UnitConversion {
  public factor: number = 1.0;
  public offset: number = 0.0;
}

export class Unit implements UnitProps {
  public name = "";
  public label = "";
  public unitGroup = "";
  public isValid = false;

  constructor(name: string, label: string, unitGroup: string) {
    if (name && name.length > 0 && label && label.length > 0 && unitGroup && unitGroup.length > 0) {
      this.name = name;
      this.label = label;
      this.unitGroup = unitGroup;
      this.isValid = true;
    }
  }
}

interface ConversionDef {
  numerator: number;
  denominator: number;
  offset: number;
}

interface UnitDefinition {
  readonly name: string;
  readonly unitGroup: string;
  readonly displayLabel: string;
  readonly altDisplayLabels: string[];
  readonly conversion: ConversionDef;
}

const unitData: UnitDefinition[] = [
  // Angles ( base unit radian )
  { name: "Units.RAD", unitGroup: "Units.ANGLE", conversion: { numerator: 1.0, denominator: 1.0, offset: 0.0 }, displayLabel: "rad", altDisplayLabels: ["radian"] },
  // 1 rad = 180.0/PI °
  { name: "Units.ARC_DEG", unitGroup: "Units.ANGLE", conversion: { numerator: 180.0, denominator: 3.1415926535897932384626433832795, offset: 0.0 }, displayLabel: "°", altDisplayLabels: ["deg"] },
  { name: "Units.ARC_MINUTE", unitGroup: "Units.ANGLE", conversion: { numerator: 10800.0, denominator: 3.14159265358979323846264338327950, offset: 0.0 }, displayLabel: "'", altDisplayLabels: ["min"] },
  { name: "Units.ARC_SECOND", unitGroup: "Units.ANGLE", conversion: { numerator: 648000.0, denominator: 3.1415926535897932384626433832795, offset: 0.0 }, displayLabel: '"', altDisplayLabels: ["sec"] },
  { name: "Units.GRAD", unitGroup: "Units.ANGLE", conversion: { numerator: 200, denominator: 3.1415926535897932384626433832795, offset: 0.0 }, displayLabel: "grad", altDisplayLabels: ["gd"] },
  // Time ( base unit second )
  { name: "Units.S", unitGroup: "Units.TIME", conversion: { numerator: 1.0, denominator: 1.0, offset: 0.0 }, displayLabel: "s", altDisplayLabels: ["sec"] },
  { name: "Units.MIN", unitGroup: "Units.TIME", conversion: { numerator: 1.0, denominator: 60.0, offset: 0.0 }, displayLabel: "min", altDisplayLabels: [] },
  { name: "Units.HR", unitGroup: "Units.TIME", conversion: { numerator: 1.0, denominator: 3600.0, offset: 0.0 }, displayLabel: "h", altDisplayLabels: ["hr"] },
  { name: "Units.DAY", unitGroup: "Units.TIME", conversion: { numerator: 1.0, denominator: 86400.0, offset: 0.0 }, displayLabel: "days", altDisplayLabels: ["day"] },
  { name: "Units.WEEK", unitGroup: "Units.TIME", conversion: { numerator: 1.0, denominator: 604800.0, offset: 0.0 }, displayLabel: "weeks", altDisplayLabels: ["week"] },
  // 1 sec = 1/31536000.0 yr
  { name: "Units.YR", unitGroup: "Units.TIME", conversion: { numerator: 1.0, denominator: 31536000.0, offset: 0.0 }, displayLabel: "years", altDisplayLabels: ["year"] },
  // Length( base unit length )
  { name: "Units.M", unitGroup: "Units.LENGTH", conversion: { numerator: 1.0, denominator: 1.0, offset: 0.0 }, displayLabel: "m", altDisplayLabels: ["meter"] },
  { name: "Units.MM", unitGroup: "Units.LENGTH", conversion: { numerator: 1000.0, denominator: 1.0, offset: 0.0 }, displayLabel: "mm", altDisplayLabels: ["MM"] },
  { name: "Units.CM", unitGroup: "Units.LENGTH", conversion: { numerator: 100.0, denominator: 1.0, offset: 0.0 }, displayLabel: "cm", altDisplayLabels: ["CM"] },
  { name: "Units.DM", unitGroup: "Units.LENGTH", conversion: { numerator: 10.0, denominator: 1.0, offset: 0.0 }, displayLabel: "dm", altDisplayLabels: ["DM"] },
  { name: "Units.KM", unitGroup: "Units.LENGTH", conversion: { numerator: 1.0, denominator: 1000.0, offset: 0.0 }, displayLabel: "km", altDisplayLabels: ["KM"] },
  { name: "Units.UM", unitGroup: "Units.LENGTH", conversion: { numerator: 1000000.0, denominator: 1.0, offset: 0.0 }, displayLabel: "µm", altDisplayLabels: [] },
  { name: "Units.MILLIINCH", unitGroup: "Units.LENGTH", conversion: { numerator: 1000.0, denominator: 0.0254, offset: 0.0 }, displayLabel: "mil", altDisplayLabels: [] },
  { name: "Units.MICROINCH", unitGroup: "Units.LENGTH", conversion: { numerator: 1000000.0, denominator: 0.0254, offset: 0.0 }, displayLabel: "µin", altDisplayLabels: [] },
  { name: "Units.MILLIFOOT", unitGroup: "Units.LENGTH", conversion: { numerator: 1000.0, denominator: 0.3048, offset: 0.0 }, displayLabel: "mft", altDisplayLabels: [] },
  // 1 m = 1/0.0254 "
  { name: "Units.IN", unitGroup: "Units.LENGTH", conversion: { numerator: 1.0, denominator: 0.0254, offset: 0.0 }, displayLabel: "in", altDisplayLabels: ["IN", "\""] },
  { name: "Units.FT", unitGroup: "Units.LENGTH", conversion: { numerator: 1.0, denominator: 0.3048, offset: 0.0 }, displayLabel: "ft", altDisplayLabels: ["F", "FT", "'"] },
  { name: "Units.YRD", unitGroup: "Units.LENGTH", conversion: { numerator: 1.0, denominator: 0.9144, offset: 0.0 }, displayLabel: "yd", altDisplayLabels: ["YRD", "yrd"] },
  { name: "Units.MILE", unitGroup: "Units.LENGTH", conversion: { numerator: 1.0, denominator: 1609.344, offset: 0.0 }, displayLabel: "mi", altDisplayLabels: ["mile", "Miles", "Mile"] },
];

export class AppUnitsProvider extends UnitsProvider {
  constructor() {
    super();
  }

  public findUnit(unitLabel: string, unitGroup?: string): Promise<UnitProps> {
    for (const entry of unitData) {
      if (unitGroup) {
        if (entry.unitGroup !== unitGroup)
          continue;
      }
      if (entry.displayLabel === unitLabel || entry.name === unitLabel) {
        const unitProps = new Unit(entry.name, entry.displayLabel, entry.unitGroup);
        return Promise.resolve(unitProps);
      }

      if (entry.altDisplayLabels && entry.altDisplayLabels.length > 0) {
        if (entry.altDisplayLabels.findIndex((ref) => ref === unitLabel) !== -1) {
          const unitProps = new Unit(entry.name, entry.displayLabel, entry.unitGroup);
          return Promise.resolve(unitProps);
        }
      }
    }

    return Promise.resolve(new BadUnit());
  }

  private findUnitDefinition(name: string): UnitDefinition | undefined {
    for (const entry of unitData) {
      if (entry.name === name)
        return entry;
    }

    return undefined;
  }

  public findUnitByName(unitName: string): Promise<UnitProps> {
    const unitDataEntry = this.findUnitDefinition(unitName);
    if (unitDataEntry) {
      return Promise.resolve(new Unit(unitDataEntry.name, unitDataEntry.displayLabel, unitDataEntry.unitGroup));
    }
    return Promise.resolve(new BadUnit());
  }

  public getConversion(fromUnit: UnitProps, toUnit: UnitProps): Promise<UnitConversion> {
    const fromUnitData = this.findUnitDefinition(fromUnit.name);
    const toUnitData = this.findUnitDefinition(toUnit.name);

    if (fromUnitData && toUnitData) {
      const deltaOffset = toUnitData.conversion.offset - fromUnitData.conversion.offset;
      const deltaNumerator = toUnitData.conversion.numerator * fromUnitData.conversion.denominator;
      const deltaDenominator = toUnitData.conversion.denominator * fromUnitData.conversion.numerator;

      const conversion = new ConversionData();
      conversion.factor = deltaNumerator / deltaDenominator;
      conversion.offset = deltaOffset;
      return Promise.resolve(conversion);
    }

    return Promise.resolve(new ConversionData());
  }
}
