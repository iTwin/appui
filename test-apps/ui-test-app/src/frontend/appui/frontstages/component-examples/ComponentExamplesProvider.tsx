/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation */

import * as React from "react";
import { BeDuration } from "@itwin/core-bentley";
import moreSvg from "@bentley/icons-generic/icons/more-circular.svg?sprite";
import moreVerticalSvg from "@bentley/icons-generic/icons/more-vertical-circular.svg?sprite";
import moreWebSvg from "@bentley/icons-generic/icons/more-circular.svg";
import moreVerticalWebSvg from "@bentley/icons-generic/icons/more-vertical-circular.svg";
import { ColorByName, ColorDef } from "@itwin/core-common";
import {
  ActivityMessageDetails, ActivityMessageEndReason, IModelApp, NotifyMessageDetails, OutputMessagePriority, OutputMessageType, QuantityType,
} from "@itwin/core-frontend";
import { Format, FormatProps, FormatterSpec, FormatTraits, getTraitString, UnitProps, UnitsProvider } from "@itwin/core-quantity";
import { DateFormatter, IconSpecUtilities, ParseResults, RelativePosition, TimeDisplay } from "@itwin/appui-abstract";
import {
  adjustDateToTimezone, DatePickerPopupButton, DatePickerPopupButtonProps,
  IntlFormatter, ParsedInput,
} from "@itwin/components-react";
import {
  ColorPickerButton, ColorPickerDialog, ColorPickerPopup, ColorSwatch, LineWeightSwatch,
  QuantityInput, QuantityNumberInput, WeightPickerButton,
} from "@itwin/imodel-components-react";
import {
  Checkbox,
  ExpandableBlock,
  LabeledInput,
} from "@itwin/itwinui-react";
import {
  AutoSuggest,
  AutoSuggestData,
  BetaBadge, BlockText, BodyText, CheckListBox, CheckListBoxItem, CheckListBoxSeparator,
  DisabledText, ExpandableList, FeaturedTile, Headline, HorizontalTabs, Icon, IconInput,
  LabeledToggle, LeadingText, Listbox, ListboxItem, LoadingPrompt, LoadingSpinner, LoadingStatus,
  MinimalFeaturedTile, MinimalTile, MutedText, NewBadge, NumberInput, Popup, ReactMessage,
  SearchBox, SettingsContainer, SettingsTabEntry, SmallText, Subheading, Tile, Title,
  Toggle, ToggleButtonType, UnderlinedButton, VerticalTabs,
} from "@itwin/core-react";
import { MessageManager, ModalDialogManager, QuantityFormatSettingsPage, ReactNotifyMessageDetails, UiFramework } from "@itwin/appui-react";
import { ComponentExampleCategory, ComponentExampleProps } from "./ComponentExamples";
import { SampleContextMenu } from "./SampleContextMenu";
import { SampleExpandableBlock } from "./SampleExpandableBlock";
import { SampleImageCheckBox } from "./SampleImageCheckBox";
import { ButtonWithContextMenu, ButtonWithDropdownMenu, ContextMenuInPopup, DropdownMenuInPopup, GlobalContextMenuInPopup, GlobalItwinContextMenuInPopup, PopupContextMenuInPopup, SamplePopupContextMenu } from "./SamplePopupContextMenu";
import { FormatPopupButton } from "./FormatPopupButton";
import { AccudrawSettingsPageComponent } from "../Settings";
import { CurrentDateMarkedCustomIconSampleTimeline, CurrentDateMarkedSampleTimeline, ItemsAppendedSampleTimeline, ItemsPrefixedSampleTimeline, ItemsReplacedSampleTimeline, LocalizedTimeSampleTimeline, NoLocalizedTimeSampleTimeline, NoRepeatSampleTimeline } from "./SampleTimelineComponent";
function DualColorPickers() {
  const [colorDef, setColorDef] = React.useState(ColorDef.green);
  const onPopupClose = (color: ColorDef) => {
    setColorDef(color);
    const msg = `popup color value: ${color.toRgbaString()}`;
    IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, msg));
  };

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      <ColorPickerPopup initialColor={colorDef} onClose={onPopupClose} colorInputType="rgb" />
      <ColorPickerPopup initialColor={colorDef} onClose={onPopupClose} colorInputType="hsl" showCaret />
    </div>
  );
}

function MySettingsPage() {
  const tabs: SettingsTabEntry[] = [
    {
      itemPriority: 10, tabId: "Quantity", pageWillHandleCloseRequest: true, label: "Quantity", tooltip: "Quantity Format Settings", icon: "icon-measure",
      page: <QuantityFormatSettingsPage initialQuantityType={QuantityType.Length} availableUnitSystems={new Set(["metric", "imperial", "usCustomary", "usSurvey"])} />,
    },
    {
      itemPriority: 20, tabId: "Accudraw", label: "Accudraw", tooltip: "Accudraw Settings", icon: "icon-paintbrush",
      page: <AccudrawSettingsPageComponent />,
    },
    { itemPriority: 30, tabId: "page3", label: "page3", page: <div>Page 3</div> },
    { itemPriority: 40, tabId: "page4", label: "page4", subLabel: "disabled page4", isDisabled: true, page: <div>Page 4</div> },
  ];

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <SettingsContainer tabs={tabs} settingsManager={UiFramework.settingsManager} />
    </div>
  );
}

function setFormatTrait(formatProps: FormatProps, trait: FormatTraits, setActive: boolean) {
  const traitStr = getTraitString(trait);
  if (undefined === traitStr)
    return;
  let formatTraits: string[] | undefined;
  if (setActive) {
    // setting trait
    if (!formatProps.formatTraits) {
      formatTraits = [traitStr];
    } else {
      const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
      if (!traits.find((traitEntry) => traitStr === traitEntry)) {
        formatTraits = [...traits, traitStr];
      }
    }
  } else {
    // clearing trait
    if (!formatProps.formatTraits)
      return;
    const traits = Array.isArray(formatProps.formatTraits) ? formatProps.formatTraits : formatProps.formatTraits.split(/,|;|\|/);
    formatTraits = traits.filter((traitEntry) => traitEntry !== traitStr);
  }
  return { ...formatProps, formatTraits };
}

function provideSecondaryChildren(formatProps: FormatProps, fireFormatChange: (newProps: FormatProps) => void) {
  const inProps = formatProps;
  const onChange = fireFormatChange;
  const handleUseThousandsSeparatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProps = setFormatTrait(inProps, FormatTraits.Use1000Separator, e.target.checked);
    if (newProps)
      onChange(newProps);
  };

  return (
    <>
      <span className={"uicore-label"}>Secondary (1000 sep)</span>
      <Checkbox checked={Format.isFormatTraitSetInProps(formatProps, FormatTraits.Use1000Separator)} onChange={handleUseThousandsSeparatorChange} />
    </>
  );
}

function providePrimaryChildren(formatProps: FormatProps, fireFormatChange: (newProps: FormatProps) => void) {
  const inProps = formatProps;
  const onChange = fireFormatChange;
  const handleUseThousandsSeparatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProps = setFormatTrait(inProps, FormatTraits.Use1000Separator, e.target.checked);
    if (newProps)
      onChange(newProps);
  };

  return (
    <>
      <span className={"uicore-label"}>Primary (1000 sep)</span>
      <Checkbox checked={Format.isFormatTraitSetInProps(formatProps, FormatTraits.Use1000Separator)} onChange={handleUseThousandsSeparatorChange} />
    </>
  );
}

async function provideFormatSpec(formatProps: FormatProps, persistenceUnit: UnitProps, unitsProvider: UnitsProvider, formatName?: string) {
  const actualFormat = await Format.createFromJSON(formatName ?? "custom", unitsProvider, formatProps);
  return FormatterSpec.create(actualFormat.name, actualFormat, unitsProvider, persistenceUnit);
}

function NumericFormatPopup({ persistenceUnitName, initialMagnitude }: { persistenceUnitName: string, initialMagnitude: number }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialFormatProps: FormatProps = {
    formatTraits: ["keepSingleZero", "applyRounding", "showUnitLabel", "trailZeroes"],
    precision: 4,
    type: "Decimal",
    uomSeparator: " ",
    decimalSeparator: ".",
  };

  const [formatterSpec, setFormatterSpec] = React.useState<FormatterSpec>();
  const [formattedValue, setFormattedValue] = React.useState<string>();
  const handleFormatChange = React.useCallback((inProps: FormatProps) => {
    async function fetchFormatSpec(formatProps: FormatProps) {
      const unitsProvider = IModelApp.quantityFormatter.unitsProvider;
      if (formatterSpec) {
        const pu = formatterSpec.persistenceUnit;
        if (pu) {
          const actualFormat = await Format.createFromJSON("custom", unitsProvider, formatProps);
          await actualFormat.fromJSON(unitsProvider, formatProps);
          const newSpec = await FormatterSpec.create(actualFormat.name, actualFormat, unitsProvider, pu);
          setFormattedValue(newSpec.applyFormatting(initialMagnitude));
          setFormatterSpec(newSpec);
        }
      }
    }
    fetchFormatSpec(inProps); // eslint-disable-line @typescript-eslint/no-floating-promises
  }, [formatterSpec, initialMagnitude]);

  React.useEffect(() => {
    async function fetchInitialFormatSpec() {
      const unitsProvider = IModelApp.quantityFormatter.unitsProvider;
      const pu = await unitsProvider.findUnitByName(persistenceUnitName);
      if (pu) {
        const newSpec = await provideFormatSpec(initialFormatProps, pu, unitsProvider);
        setFormattedValue(newSpec.applyFormatting(initialMagnitude));
        setFormatterSpec(newSpec);
      }
    }

    if (undefined === formatterSpec)
      fetchInitialFormatSpec(); // eslint-disable-line @typescript-eslint/no-floating-promises
  }, [formatterSpec, persistenceUnitName, initialMagnitude, initialFormatProps]);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {(formatterSpec && formattedValue) &&
        <>
          <span>{formattedValue}</span>
          <FormatPopupButton initialFormat={formatterSpec.format.toJSON()} showSample={true} onFormatChange={handleFormatChange}
            initialMagnitude={initialMagnitude} unitsProvider={IModelApp.quantityFormatter.unitsProvider} persistenceUnit={formatterSpec.persistenceUnit}
            provideFormatSpec={provideFormatSpec}
            providePrimaryChildren={providePrimaryChildren}
            provideSecondaryChildren={provideSecondaryChildren}
          />
        </>
      }
    </div>
  );
}

function NestedPopup({ closeOnNestedPopupOutsideClick }: { closeOnNestedPopupOutsideClick?: boolean }) {
  const [showPopup, setShowPopup] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const handleOnDateChange = React.useCallback((day: Date) => {
    setCurrentDate(day);
  }, []);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const togglePopup = React.useCallback(() => {
    setShowPopup(!showPopup);
  }, [showPopup]);

  const handleClose = React.useCallback(() => {
    setShowPopup(false);
  }, []);

  return (
    <div>
      <button onClick={togglePopup} ref={buttonRef}>{showPopup ? "Close" : "Open"}</button>

      <Popup isOpen={showPopup} position={RelativePosition.Bottom} target={buttonRef.current}
        onClose={handleClose} showArrow={true} showShadow={true} closeOnNestedPopupOutsideClick={closeOnNestedPopupOutsideClick}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <LabeledInput label="Date" value={currentDate.toLocaleDateString()} disabled />
          <DatePickerPopupButton selected={currentDate} onDateChange={handleOnDateChange} />
        </div>
      </Popup>
    </div>
  );
}

function exoticStep(direction: string) {
  if (direction === "up")
    return .5;
  return .1;
}

function parseDollar(stringValue: string) {
  const noDollarSign = stringValue.replace(/^\$/, "");
  let n = parseFloat(noDollarSign);
  if (isNaN(n) || !isFinite(n))
    n = 0;
  return n;
}

function formatDollar(num: number | undefined | null, fallback: string) {
  if (undefined === num || null === num)
    return fallback;

  return `$${num.toFixed(2)}`;
}

function fahrenheitToCelsius(f: number) {
  return (f - 32) * 5 / 9;
}

function parseStringToCelsius(userInput: string): ParseResults {
  let convertFromFahrenheit = false;
  let temperatureStr = userInput;
  // if explicitly specified honor specification
  if (userInput.endsWith("f") || userInput.endsWith("F")) {
    convertFromFahrenheit = true;
    temperatureStr = userInput.slice(0, userInput.length - 1);
  } else if (userInput.endsWith("c") || userInput.endsWith("C")) {
    convertFromFahrenheit = false;
    temperatureStr = userInput.slice(0, userInput.length - 1);
  }

  try {
    let temperature = Number.parseFloat(temperatureStr);
    if (Number.isNaN(temperature))
      return { parseError: "unable to parse temperature" };
    if (convertFromFahrenheit)
      temperature = fahrenheitToCelsius(temperature);
    return { value: temperature };
  } catch (_e) {
    return { parseError: "unable to parse temperature" };
  }
}

function formatCelsiusValue(temperature: number): string {
  return `${temperature.toFixed(1)}C`;
}

/** An example formatter that both formats and parses dates. */
class MdyFormatter implements DateFormatter {
  private _formatter = new Intl.DateTimeFormat(undefined,
    {
      year: "numeric",    /* "2-digit", "numeric" */
      month: "2-digit",   /* "2-digit", "numeric", "narrow", "short", "long" */
      day: "2-digit",     /* "2-digit", "numeric" */
    });

  public formateDate(date: Date) {
    const formatParts = this._formatter.formatToParts(date);
    const month = formatParts.find((part) => part.type === "month")!.value;
    const day = formatParts.find((part) => part.type === "day")!.value;
    const year = formatParts.find((part) => part.type === "year")!.value;
    return `${month}-${day}-${year}`;
  }

  public parseDate(dateString: string) {
    const mdy = dateString.split("-").filter((value) => !!value);
    if (mdy.length !== 3) return undefined;
    const month = parseInt(mdy[0], 10);
    const day = parseInt(mdy[1], 10);
    const year = parseInt(mdy[2], 10);

    // validate
    if (isNaN(month) || month < 0 || month > 12) return undefined;
    if (isNaN(day) || day < 0 || day > 31) return undefined;
    if (isNaN(year) || year < 1800 || year > 2300) return undefined;

    return new Date(year, month - 1, day);
  }
}

/** A custom date formatter - no parser so edit field will be read only */
const customDayFormatter = new Intl.DateTimeFormat(undefined,
  {
    weekday: "long",    /* "narrow", "short", "long" */
    year: "numeric",    /* "2-digit", "numeric" */
    month: "2-digit",   /* "2-digit", "numeric", "narrow", "short", "long" */
    day: "2-digit",     /* "2-digit", "numeric" */
  });

/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function DatePickerHost(props: DatePickerPopupButtonProps) {
  const { onDateChange, selected, ...otherProp } = props;
  const [currentDate, setCurrentDate] = React.useState(selected);

  const handleOnDateChange = React.useCallback((day: Date) => {
    onDateChange && onDateChange(day);
    setCurrentDate(day);
  }, [onDateChange]);

  return (
    <DatePickerPopupButton selected={currentDate} onDateChange={handleOnDateChange} {...otherProp} />
  );
}

export function WeightPickerHost(props: { activeWeight: number, onLineWeightPick: ((weight: number) => void) }) {
  const { onLineWeightPick, activeWeight } = props;
  const [currentWeight, setCurrentWeight] = React.useState(activeWeight);

  const handleWeightPick = React.useCallback((weight: number) => {
    onLineWeightPick && onLineWeightPick(weight);
    setCurrentWeight(weight);
  }, [onLineWeightPick]);

  return (
    <WeightPickerButton style={{ width: "max-content" }} activeWeight={currentWeight} onLineWeightPick={handleWeightPick} />
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ColorPickerToggle({ hideRgb }: { hideRgb?: boolean }) {
  const [colorDialogTitle] = React.useState("Select Color");
  const [selectedColor, setSelectedColor] = React.useState(ColorDef.red);
  const handleBackgroundColorDialogOk = React.useCallback((newColorDef: ColorDef) => {
    ModalDialogManager.closeDialog();
    setSelectedColor(newColorDef);
  }, []);

  const handleBackgroundColorDialogCancel = React.useCallback(() => {
    ModalDialogManager.closeDialog();
  }, []);

  const presetColors = React.useRef(
    [
      ColorDef.create(ColorByName.red),
      ColorDef.create(ColorByName.orange),
      ColorDef.create(ColorByName.yellow),
      ColorDef.create(ColorByName.green),
      ColorDef.create(ColorByName.blue),
      ColorDef.create(ColorByName.indigo),
      ColorDef.create(ColorByName.violet),
      ColorDef.create(ColorByName.black),
      ColorDef.create(ColorByName.white),
      ColorDef.create(ColorByName.cyan),
      ColorDef.create(ColorByName.fuchsia),
      ColorDef.create(ColorByName.tan),
      ColorDef.create(ColorByName.gray),
      ColorDef.create(ColorByName.brown),
      ColorDef.create(ColorByName.purple),
      ColorDef.create(ColorByName.olive),
    ]);

  const handleBgColorClick = React.useCallback((newColor: ColorDef, e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    ModalDialogManager.openDialog(<ColorPickerDialog dialogTitle={colorDialogTitle} color={newColor} colorPresets={presetColors.current}
      onOkResult={handleBackgroundColorDialogOk} onCancelResult={handleBackgroundColorDialogCancel}
      colorInputType={!!hideRgb ? undefined : "rgb"} />);
  }, [colorDialogTitle, handleBackgroundColorDialogOk, handleBackgroundColorDialogCancel, hideRgb]);

  return (
    <ColorSwatch className="map-manager-base-item-color" colorDef={selectedColor} round={false} onColorPick={handleBgColorClick} />
  );
}

/** Creates a Component Example */
export const createComponentExample = (title: string, description: string | undefined, content: React.ReactNode): ComponentExampleProps => {
  return { title, description, content };
};

/** Provides Component Examples */
export class ComponentExamplesProvider {

  private static get autoSuggestSamples(): ComponentExampleCategory {
    const options: AutoSuggestData[] = [];

    for (let index = 0; index < 100; index++) {
      options.push({ value: index.toString(), label: `Option ${index}` });
    }

    const getSuggestions = async (value: string): Promise<AutoSuggestData[]> => {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;

      return Promise.resolve(
        inputLength === 0 ?
        /* istanbul ignore next */[] :
          options.filter((data: AutoSuggestData) => {
            return data.label.toLowerCase().includes(inputValue) || data.value.toLowerCase().includes(inputValue);
          })
      );
    };

    return {
      title: "AutoSuggest",
      examples: [
        createComponentExample("AutoSuggest", undefined,
          <AutoSuggest placeholder="Type..." onSuggestionSelected={() => { }} getSuggestions={getSuggestions} />
        ),
      ],
    };
  }

  private static get badgeSamples(): ComponentExampleCategory {
    return {
      title: "Badge",
      examples: [
        createComponentExample("BetaBadge", undefined, <BetaBadge />),
        createComponentExample("NewBadge", undefined, <NewBadge />),
      ],
    };
  }

  private static get checkListBoxSamples(): ComponentExampleCategory {
    return {
      title: "CheckListBox",
      examples: [
        createComponentExample("CheckListBox", undefined,
          <CheckListBox>
            <CheckListBoxItem label="Item 1" />
            <CheckListBoxItem label="Item 2" />
            <CheckListBoxItem label="Item 3" />
          </CheckListBox>),
        createComponentExample("CheckListBox with separator", undefined,
          <CheckListBox>
            <CheckListBoxItem label="Item 1" />
            <CheckListBoxItem label="Item 2" />
            <CheckListBoxSeparator />
            <CheckListBoxItem label="Item 3" />
            <CheckListBoxItem label="Item 4" />
          </CheckListBox>),
      ],
    };
  }

  private static get colorSamples(): ComponentExampleCategory {
    let colorDef = ColorDef.blue;
    const handleColorPick = (color: ColorDef) => {
      console.log(`color picked: ${color.toRgbaString()}`);
      colorDef = color;
    };

    const onPopupClose = (color: ColorDef) => {
      const msg = `popup color value: ${color.toRgbaString()}`;
      console.log(msg);
      IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, msg));
    };

    return {
      title: "Color Controls",
      examples: [
        createComponentExample("Color Swatch", undefined,
          <ColorSwatch colorDef={colorDef} onColorPick={handleColorPick} />),
        createComponentExample("Color Picker Button", undefined,
          <ColorPickerButton initialColor={colorDef} onColorPick={handleColorPick} />),
        createComponentExample("Color Picker Button", "with Caret",
          <ColorPickerButton initialColor={colorDef} onColorPick={handleColorPick} showCaret />),
        createComponentExample("Color Picker Button", "disabled with Caret",
          <ColorPickerButton initialColor={colorDef} onColorPick={handleColorPick} disabled showCaret />),
        createComponentExample("Color Picker Button", "Round with Caret",
          <ColorPickerButton initialColor={colorDef} onColorPick={handleColorPick} round showCaret />),
        createComponentExample("Color Picker Dialog", undefined, <ColorPickerToggle />),
        createComponentExample("Color Picker Dialog no rgb", undefined, <ColorPickerToggle hideRgb />),
        createComponentExample("Color Picker Popup", undefined, <ColorPickerPopup initialColor={colorDef} onClose={onPopupClose} />),
        createComponentExample("Color Picker Popup", "with Caret", <ColorPickerPopup initialColor={colorDef} onClose={onPopupClose} showCaret />),
        createComponentExample("Color Picker Popup", "disabled with Caret", <ColorPickerPopup initialColor={colorDef} onClose={onPopupClose} disabled showCaret />),
        createComponentExample("Dual Color Pickers", "test update initialColor", <DualColorPickers />),
      ],
    };
  }

  private static get weightSamples(): ComponentExampleCategory {
    const handleWeightPick = (weight: number) => {
      const msg = `weight picked: ${weight}`;
      IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, msg));
    };

    return {
      title: "Weight Controls",
      examples: [
        createComponentExample("Weight Swatch 1", undefined,
          <LineWeightSwatch weight={1} style={{ width: "100px" }} onClick={() => handleWeightPick(1)} />),
        createComponentExample("Weight Swatch 5", undefined,
          <LineWeightSwatch weight={5} style={{ width: "100px" }} onClick={() => handleWeightPick(5)} />),
        createComponentExample("Weight Picker Button", undefined,
          <WeightPickerHost activeWeight={3} onLineWeightPick={handleWeightPick} />),
      ],
    };
  }

  private static get datePickerSample(): ComponentExampleCategory {
    const londonDate = adjustDateToTimezone(new Date(), 1 * 60);
    const laDate = adjustDateToTimezone(new Date(), -7 * 60);
    // example showing converting to UTC time and using that to format.
    const msPerHour = 60 * 60 * 1000;
    const tzOffset = -4; // this should be similar to Math.floor(.5 + location.longitudeDegrees / 15.0);
    const tzOffsetMs = tzOffset * msPerHour; // offset to project
    const projectSunrise = new Date(Date.UTC(1999, 3, 15, 7, 30) + tzOffsetMs); // this should be same as time returned from calculateSunriseOrSunset
    const projectSunset = new Date(Date.UTC(1999, 3, 15, 20, 30) + tzOffsetMs); // this should be same as time returned from calculateSunriseOrSunset
    const projectSunriseMs = projectSunrise.getTime();
    const projectSunsetMs = projectSunset.getTime();
    const projectSunTimeMs = Date.UTC(1999, 3, 15, 9, 30) + tzOffsetMs;  // this should be same as displayStyle.settings.sunTime
    const dateFormatter = new Intl.DateTimeFormat("default", { month: "numeric", day: "numeric", timeZone: "UTC" } as any);
    const timeFormatter = new Intl.DateTimeFormat("default", { timeStyle: "short", timeZone: "UTC" } as any);
    const monthLetterFormatter = new Intl.DateTimeFormat("default", { month: "narrow", timeZone: "UTC" } as any);
    const projectDate = dateFormatter.format(new Date(projectSunriseMs - tzOffsetMs));
    const projectSunriseTime = timeFormatter.format(new Date(projectSunriseMs - tzOffsetMs));
    const projectSunsetTime = timeFormatter.format(new Date(projectSunsetMs - tzOffsetMs));
    const projectSunTime = timeFormatter.format(new Date(projectSunTimeMs - tzOffsetMs));
    const month = monthLetterFormatter.format(new Date(projectSunriseMs - tzOffsetMs));

    return {
      title: "DatePicker",
      examples: [
        createComponentExample("Date Picker Popup", undefined, <DatePickerHost selected={new Date()} />),
        createComponentExample("Date Picker Popup w/input", undefined, <DatePickerHost selected={new Date()} displayEditField={true} />),
        createComponentExample("Date Picker Popup w/input & 12h time", undefined, <DatePickerHost selected={new Date()} displayEditField={true} timeDisplay={TimeDisplay.H12MC} />),
        createComponentExample("Date Picker Popup w/input & 24h time", undefined, <DatePickerHost selected={new Date()} displayEditField={true} timeDisplay={TimeDisplay.H24MS} />),
        createComponentExample("Date Picker Popup w/London date & time", undefined, <DatePickerHost selected={londonDate} displayEditField={true} timeDisplay={TimeDisplay.H12MSC} />),
        createComponentExample("Date Picker Popup w/LA date & time", undefined, <DatePickerHost selected={laDate} displayEditField={true} timeDisplay={TimeDisplay.H12MSC} />),
        createComponentExample("Date Picker Popup w/custom formatter", undefined, <DatePickerHost selected={new Date()} displayEditField={true} dateFormatter={new IntlFormatter(customDayFormatter)} />),
        createComponentExample("Date Picker Popup w/IntlFormatter", undefined, <DatePickerHost fieldStyle={{ width: "16em" }} selected={new Date()} displayEditField={true} timeDisplay={TimeDisplay.H12MSC} dateFormatter={new IntlFormatter()} />),
        createComponentExample("Date Picker Popup w/MDY Formatter", undefined, <DatePickerHost selected={new Date()} displayEditField={true} timeDisplay={TimeDisplay.H12MSC} dateFormatter={new MdyFormatter()} />),
        createComponentExample("Date Formatting", undefined,
          <div className="component-examples-date-sample">
            <span>{`date: ${projectDate}`}</span>
            <span>{`monthLetter: ${month}`}</span>
            <span>{`sunrise: ${projectSunriseTime}`}</span>
            <span>{`sun time: ${projectSunTime}`}</span>
            <span>{`sunset: ${projectSunsetTime}`}</span>
          </div>),
      ],
    };
  }

  private static get contextMenuSample(): ComponentExampleCategory {
    return {
      title: "ContextMenu",
      examples: [
        createComponentExample("Abstract ContextMenu", undefined, <UnderlinedButton onActivate={() => SampleContextMenu.showContextMenu()}> Open ContextMenu</UnderlinedButton>),
        createComponentExample("ContextMenu", undefined, <ButtonWithContextMenu />),
        createComponentExample("iTwinUI DropdownMenu", "similar to ContextMenu", <ButtonWithDropdownMenu />),
        createComponentExample("ContextMenu in Popup", undefined, <ContextMenuInPopup />),
        createComponentExample("iTwinUi DropdownMenu in Popup", "similar to ContextMenu in Popup", <DropdownMenuInPopup />),
        createComponentExample("Popup ContextMenu", undefined, <SamplePopupContextMenu />),
        createComponentExample("PopupContextMenu in Popup", undefined, <PopupContextMenuInPopup />),
        createComponentExample("Global ContextMenu", undefined, <GlobalContextMenuInPopup />),
        createComponentExample("iTwinUI Menu at cursor", "similar to GlobalContextMenu", <GlobalItwinContextMenuInPopup />),
      ],
    };
  }

  private static get expandableListBlockSamples(): ComponentExampleCategory {
    return {
      title: "ExpandableList/Block",
      examples: [
        createComponentExample("ExpandableList", "ExpandableList with one ExpandableBlock",
          <ExpandableList className="uicore-full-width">
            <SampleExpandableBlock title="Test" isExpanded={true} onToggle={() => { }}>
              Hello World!
            </SampleExpandableBlock>
          </ExpandableList>),
        createComponentExample("ExpandableList", "ExpandableList with 3 ExpandableBlocks",
          <ExpandableList className="uicore-full-width">
            <SampleExpandableBlock title="Test1" isExpanded={false} onToggle={() => { }}>
              Hello World 1
            </SampleExpandableBlock>
            <SampleExpandableBlock title="Test2" isExpanded={false} onToggle={() => { }}>
              Hello World 2
            </SampleExpandableBlock>
            <SampleExpandableBlock title="Test3" isExpanded={false} onToggle={() => { }}>
              Hello World 3
            </SampleExpandableBlock>
          </ExpandableList>),
        createComponentExample("ExpandableList w/ singleExpandOnly", "ExpandableList with singleExpandOnly prop",
          <ExpandableList className="uicore-full-width" singleExpandOnly={true} defaultActiveBlock={0}>
            <ExpandableBlock title="Test1" isExpanded={false} size='small' >
              Hello World 1
            </ExpandableBlock>
            <ExpandableBlock title="Test2" isExpanded={false} size='small' >
              Hello World 2
            </ExpandableBlock>
            <ExpandableBlock title="Test3" isExpanded={false} size='small' >
              Hello World 3
            </ExpandableBlock>
          </ExpandableList>),
        createComponentExample("ExpandableList w/ singleIsCollapsible", "ExpandableList with singleIsCollapsible prop",
          <ExpandableList className="uicore-full-width" singleExpandOnly={true} singleIsCollapsible={true} defaultActiveBlock={0}>
            <ExpandableBlock title="Test1" isExpanded={false} size='small' >
              Hello World 1
            </ExpandableBlock>
            <ExpandableBlock title="Test2" isExpanded={false} size='small' >
              Hello World 2
            </ExpandableBlock>
            <ExpandableBlock title="Test3" isExpanded={false} size='small' >
              Hello World 3
            </ExpandableBlock>
          </ExpandableList>),
      ],
    };
  }

  private static get inputsSamples(): ComponentExampleCategory {
    return {
      title: "Inputs",
      examples: [
        createComponentExample("Number Input .25 step", "New Numeric Input component", <NumberInput value={10.5} precision={2} step={0.25} containerClassName="uicore-full-width" />),
        createComponentExample("Disabled Number Input .25 step", "New Numeric Input component", <NumberInput value={10.5} precision={2} step={0.25} containerClassName="uicore-full-width" disabled />),
        createComponentExample("Number Input .25 step w/snap", "New Numeric Input component", <NumberInput value={10.5} precision={2} step={0.25} snap containerClassName="uicore-full-width" />),
        createComponentExample("Number Input .25 step w/snap custom format and parser", "New Numeric Input component", <NumberInput value={10.5} format={formatDollar} parse={parseDollar} precision={2} step={0.25} snap containerClassName="uicore-full-width" />),
        createComponentExample("Number Input w/touch buttons", "New Numeric Input component", <NumberInput value={10.5} precision={2} step={.5} snap showTouchButtons containerClassName="uicore-full-width" />),
        createComponentExample("Number Input w/snap  & custom step", "New Numeric Input component", <NumberInput value={10.5} precision={2} step={exoticStep} snap containerClassName="uicore-full-width" />),
        createComponentExample("Number Input w/placeholder", "New Numeric Input component", <NumberInput placeholder="Enter Input" precision={2} step={0.25} containerClassName="uicore-full-width" />),
        createComponentExample("Icon Input", "Icon Input component", <IconInput placeholder="Icon Input" icon={<Icon iconSpec="icon-placeholder" />} containerClassName="uicore-full-width" />),

        createComponentExample("Image Checkbox", "ImageCheckbox with WebFonts", <SampleImageCheckBox imageOn="icon-more-circular" imageOff="icon-more-vertical-circular" />),
        createComponentExample("Image Checkbox", "ImageCheckbox with SVG (deprecate sprite)", <SampleImageCheckBox imageOn={IconSpecUtilities.createSvgIconSpec(moreSvg)} imageOff={IconSpecUtilities.createSvgIconSpec(moreVerticalSvg)} />),
        createComponentExample("Image Checkbox", "ImageCheckbox with SVG using web component", <SampleImageCheckBox imageOn={IconSpecUtilities.createWebComponentIconSpec(moreWebSvg)} imageOff={IconSpecUtilities.createWebComponentIconSpec(moreVerticalWebSvg)} />),
      ],
    };
  }

  private static get loadingSamples(): ComponentExampleCategory {
    return {
      title: "Loading",
      examples: [
        createComponentExample("X-Small LoadingSpinner", undefined, <LoadingSpinner size="x-small" message="This is a X-Small LoadingSpinner" />),
        createComponentExample("Small LoadingSpinner", undefined, <LoadingSpinner size="small" message="This is a Small LoadingSpinner" />),
        createComponentExample("Medium LoadingSpinner", undefined, <LoadingSpinner size="" message="This is a Medium LoadingSpinner" />),
        createComponentExample("Large LoadingSpinner", undefined, <LoadingSpinner size="large" message="This is a Large LoadingSpinner" />),
        createComponentExample("LoadingStatus", undefined, <LoadingStatus message="Loading status..." percent={50} />),
        createComponentExample("Basic LoadingPrompt", undefined, <LoadingPrompt title="Title" />),
        createComponentExample("LoadingPrompt with message", undefined, <LoadingPrompt title="Title" message="This is the message" />),
        createComponentExample("LoadingPrompt with Indeterminate Bar", undefined,
          <LoadingPrompt style={{ width: "100%" }} title="Title" message="This is the message" showIndeterminateBar />),
        createComponentExample("Determinate LoadingPrompt with percent", undefined,
          <LoadingPrompt title="Title" message="This is the message" isDeterminate={true} percent={50} />),
        createComponentExample("Determinate LoadingPrompt with cancel", undefined,
          <LoadingPrompt title="Title" message="This is the message" isDeterminate={true} percent={50} showCancel={true} />),
        createComponentExample("Determinate LoadingPrompt with status", undefined,
          <LoadingPrompt title="Title" message="This is the message" isDeterminate={true} showStatus={true} percent={50} status="Updating..." />),
      ],
    };
  }

  private static get _reactMessage(): ReactMessage {
    const reactNode = (
      <span>
        For more details, <UnderlinedButton onClick={() => { }}>click here</UnderlinedButton>.
      </span >
    );
    return ({ reactNode });
  }

  /** Tool that will start a sample activity and display ActivityMessage.
   */
  private static _activityTool = async () => {
    let isCancelled = false;
    let progress = 0;

    const details = new ActivityMessageDetails(true, true, true, true);
    details.onActivityCancelled = () => {
      isCancelled = true;
    };
    IModelApp.notifications.setupActivityMessage(details);

    while (!isCancelled && progress <= 100) {
      IModelApp.notifications.outputActivityMessage("This is a sample activity message", progress);
      await BeDuration.wait(100);
      progress++;
    }

    const endReason = isCancelled ? ActivityMessageEndReason.Cancelled : ActivityMessageEndReason.Completed;
    IModelApp.notifications.endActivityMessage(endReason);
  };

  private static get messageSamples(): ComponentExampleCategory {
    MessageManager.registerAnimateOutToElement(null);
    return {
      title: "Messages",
      examples: [
        createComponentExample("Toast", undefined,
          <UnderlinedButton onActivate={
            () => IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, "This is an info message", undefined, OutputMessageType.Toast))
          }>Toast message</UnderlinedButton>),
        createComponentExample("Toast with link", undefined,
          <UnderlinedButton onActivate={
            () => MessageManager.displayMessage(new ReactNotifyMessageDetails(OutputMessagePriority.Info, "This is an info message", this._reactMessage), undefined, {placement: "top"}
            )}>Toast with link</UnderlinedButton>),
        createComponentExample("Sticky", undefined,
          <UnderlinedButton onActivate={
            () => IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Warning, "This is a warning message", undefined, OutputMessageType.Sticky))
          }>Sticky message</UnderlinedButton>),
        createComponentExample("Activity", undefined,
          <UnderlinedButton onActivate={this._activityTool}>Activity message</UnderlinedButton>),
      ],
    };
  }

  private static get popupSamples(): ComponentExampleCategory {
    return {
      title: "Popups",
      examples: [
        createComponentExample("Allow Nested Popup", "Remain open when clicking in nested popup", <NestedPopup />),
        createComponentExample("Close Nested Popup", "Close when clicking in nested popup", <NestedPopup closeOnNestedPopupOutsideClick={true} />),
      ],
    };
  }

  private static get quantitySamples(): ComponentExampleCategory {
    const onLengthChange = (value: number) => {
      IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, `Length value set to ${value}`));
      console.log(`Length value set to: ${value}`);
    };
    const onAngleChange = (value: number) => {
      IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, `Angle value set to ${value}`));
      console.log(`Angle value set to: ${value}`);
    };
    const onVolumeChange = (value: number) => {
      IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, `Volume value set to ${value}`));
      console.log(`Volume value set to: ${value}`);
    };
    const onTemperatureChange = (value: number) => {
      if (typeof value === "number") {
        IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, `Temperature value set to ${value} C`));
        console.log(`Temperature value set to ${value} C`);
      }
    };

    const initialLength = 3.5; // meters
    const initialAngle = Math.PI / 4; // radians
    const initialVolume = 1.0; // meters^3
    const initialTemperature = 20; // 20 Celsius
    return {
      title: "Quantity Input",
      examples: [
        createComponentExample("Length", undefined,
          <QuantityInput initialValue={initialLength} quantityType={QuantityType.Length} onQuantityChange={onLengthChange} />),
        createComponentExample("Angle", undefined,
          <QuantityInput initialValue={initialAngle} quantityType={QuantityType.Angle} onQuantityChange={onAngleChange} />),
        createComponentExample("Bearing", undefined,
          <QuantityInput initialValue={initialAngle} quantityType={"Bearing"} onQuantityChange={onAngleChange} />),
        createComponentExample("Volume", undefined,
          <QuantityInput initialValue={initialVolume} quantityType={QuantityType.Volume} onQuantityChange={onVolumeChange} />),
        createComponentExample("Temperature (Custom)", undefined,
          <ParsedInput onChange={onTemperatureChange} initialValue={initialTemperature} formatValue={formatCelsiusValue} parseString={parseStringToCelsius} />),
        createComponentExample("Quantity Number Input", "QuantityType.Length",
          <QuantityNumberInput style={{ width: "140px" }} persistenceValue={initialLength} step={0.25} snap quantityType={QuantityType.Length} onChange={onLengthChange} />),
        createComponentExample("Quantity Number Input", "QuantityType.LengthEngineering",
          <QuantityNumberInput style={{ width: "140px" }} placeholder={"Specify Length"} step={0.25} snap quantityType={QuantityType.LengthEngineering} onChange={onLengthChange} />),
        createComponentExample("Quantity Number Input", "Disabled QuantityType.LengthEngineering",
          <QuantityNumberInput style={{ width: "140px" }} placeholder={"Specify Length"} step={0.25} snap quantityType={QuantityType.LengthEngineering} onChange={onLengthChange} disabled />),
        createComponentExample("Quantity Number Input", "QuantityType.Angle",
          <QuantityNumberInput style={{ width: "140px" }} persistenceValue={initialAngle} step={0.5} snap quantityType={QuantityType.Angle} onChange={onAngleChange} />),
        createComponentExample("Quantity Number Input", "QuantityType.Volume",
          <QuantityNumberInput showTouchButtons persistenceValue={initialVolume} step={0.5} snap quantityType={QuantityType.Volume} onChange={onVolumeChange} />),
      ],
    };
  }

  private static get searchBoxSample(): ComponentExampleCategory {
    return {
      title: "SearchBox",
      examples: [
        createComponentExample("SearchBox", undefined,
          // eslint-disable-next-line no-console
          <SearchBox placeholder="Search" onValueChanged={(value: string) => console.log(`Search text: ${value}`)} />),
        createComponentExample("SearchBoxWithDelay", undefined,
          // eslint-disable-next-line no-console
          <SearchBox placeholder="Search" valueChangedDelay={1000} onValueChanged={(value: string) => console.log(`Search text: ${value}`)} />),
      ],
    };
  }

  private static get tabsSamples(): ComponentExampleCategory {
    return {
      title: "Tabs",
      examples: [
        createComponentExample("Horizontal Tabs", "full width",
          <div className="uicore-full-width">
            <HorizontalTabs className="component-examples-horizontal-tabs"
              labels={[
                { label: "Tab 1", tabId: "tab1", icon: "icon-placeholder", subLabel: "Sub-label 1" },
                { label: "Tab 2", tabId: "tab2", icon: "icon-placeholder", subLabel: "Sub-label 2" },
                { label: "Tab 3", tabId: "tab3", icon: "icon-placeholder", subLabel: "Sub-label 3" },
              ]}
              activeIndex={0} />
          </div>
        ),
        createComponentExample("Green Horizontal Tabs", "with green prop", <HorizontalTabs labels={["Tab 1", "Tab 2", "Tab 3"]} activeIndex={0} green />),
        createComponentExample("Horizontal Tabs", undefined,
          <HorizontalTabs className="component-examples-horizontal-tabs"
            labels={[
              { label: "Tab 1", tabId: "tab1", icon: "icon-placeholder", subLabel: "Sub-label 1" },
              { label: "Tab 2", tabId: "tab2", icon: "icon-placeholder", subLabel: "Sub-label 2" },
              { label: "Tab 3", tabId: "tab3", icon: "icon-placeholder", subLabel: "Sub-label 3", disabled: true },
            ]}
            activeIndex={0} />
        ),
        createComponentExample("Vertical Tabs", undefined, <VerticalTabs
          labels={[
            { label: "Tab 1", tabId: "tab1", icon: "icon-placeholder", subLabel: "Sub-label 1" },
            { label: "Tab 2", tabId: "tab2", icon: "icon-placeholder", subLabel: "Sub-label 2" },
            { label: "Tab 3", tabId: "tab3", icon: "icon-placeholder", subLabel: "Sub-label 3", disabled: true },
          ]}
          activeIndex={0} />),
        createComponentExample("Green Vertical Tabs", "with green prop", <VerticalTabs labels={["Tab 1", "Tab 2", "Tab 3"]} activeIndex={0} green />),
      ],
    };
  }

  private static get textSamples(): ComponentExampleCategory {
    return {
      title: "Text",
      examples: [
        createComponentExample("BodyText", undefined, <BodyText>This is Body Text</BodyText>),
        createComponentExample("BlockText", undefined, <BlockText>This is Block Text</BlockText>),
        createComponentExample("DisabledText", undefined, <DisabledText>This is Disabled Text</DisabledText>),
        createComponentExample("Headline", undefined, <Headline>This is Headline Text</Headline>),
        createComponentExample("LeadingText", undefined, <LeadingText>This is Leading Text</LeadingText>),
        createComponentExample("MutedText", undefined, <MutedText>This is Muted Text</MutedText>),
        createComponentExample("SmallText", undefined, <SmallText>This is Small Text</SmallText>),
        createComponentExample("Subheading", undefined, <Subheading>This is Subheading Text</Subheading>),
        createComponentExample("Title", undefined, <Title>This is Title Text</Title>),
      ],
    };
  }

  private static get tileSamples(): ComponentExampleCategory {
    return {
      title: "Tiles",
      examples: [
        createComponentExample("Normal Tile", undefined,
          <Tile title="Normal Tile" icon="icon-placeholder">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>Link 1</a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>Link 2</a>
          </Tile>),
        createComponentExample("Featured Tile", undefined,
          <FeaturedTile title="Featured Tile" icon="icon-placeholder">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>Link 1</a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>Link 2</a>
          </FeaturedTile>),
        createComponentExample("Minimal Tile", undefined, <MinimalTile title="Minimal Tile" icon="icon-placeholder" />),
        createComponentExample("Featured Minimal Tile", undefined, <MinimalFeaturedTile title="Minimal Featured Tile" icon="icon-placeholder" />),
        createComponentExample("Tile stepNum={0}", undefined, <MinimalFeaturedTile stepNum={0} title="Tile stepNum={0}" icon="icon-placeholder" />),
        createComponentExample("Tile stepNum={6}", undefined, <MinimalFeaturedTile stepNum={6} title="Tile stepNum={6}" icon="icon-placeholder" />),
        createComponentExample("Tile stepNum={9}", undefined, <MinimalFeaturedTile stepNum={9} title="Tile stepNum={9}" icon="icon-placeholder" />),
        createComponentExample("Tile stepNum={15}", undefined, <MinimalFeaturedTile stepNum={15} title="Tile stepNum={15}" icon="icon-placeholder" />),
      ],
    };
  }

  private static get toggleSamples(): ComponentExampleCategory {
    return {
      title: "Toggle",
      examples: [
        createComponentExample("Basic Toggle", undefined, <Toggle isOn={true} />),
        // eslint-disable-next-line deprecation/deprecation
        createComponentExample("Primary Toggle", "Toggle with buttonType={ToggleButtonType.Primary}", <Toggle isOn={true} buttonType={ToggleButtonType.Primary} />),
        createComponentExample("Large Toggle", "Toggle with large={true}", <Toggle isOn={true} large={true} />),
        createComponentExample("Square Toggle", "Toggle with rounded={false}", <Toggle isOn={true} rounded={false} />),
        createComponentExample("Toggle with Checkmark", "Toggle with showCheckmark prop", <Toggle isOn={true} showCheckmark={true} />),
        createComponentExample("Disabled Toggle", "Toggle with disabled prop", <Toggle isOn={true} showCheckmark={true} disabled />),
        createComponentExample("LabeledToggle", undefined, <LabeledToggle checked={true} label="Toggle label" />),
      ],
    };
  }

  private static get listboxSamples(): ComponentExampleCategory {
    const listItems = ["London", "Paris", "Stockholm", "Berlin", "Mumbai", "Christchurch", "Johannesburg", "Beijing", "New York"];

    return {
      title: "Listbox",
      examples: [
        createComponentExample("Basic Listbox", undefined,
          <Listbox id="map-sources" className="map-manager-source-list" selectedValue={listItems[1]}
            onKeyDown={(event: React.KeyboardEvent<HTMLUListElement>) => console.log(`item: ${event.currentTarget?.dataset?.value}`)} >
            {
              listItems?.map((cityName) =>
                <ListboxItem key={cityName} className="map-source-list-entry" value={cityName}>
                  <span className="map-source-list-entry-name" title={cityName}>{cityName}</span>
                </ListboxItem>)
            }
          </Listbox>),
        createComponentExample("Listbox with disabled entries", undefined,
          <Listbox id="map-sources" className="map-manager-source-list" selectedValue={listItems[1]}
            onKeyDown={(event: React.KeyboardEvent<HTMLUListElement>) => console.log(`item: ${event.currentTarget?.dataset?.value}`)} >
            {
              listItems?.map((cityName, index) =>
                <ListboxItem key={cityName} className="map-source-list-entry" value={cityName} disabled={0 === index % 2}>
                  <span className="map-source-list-entry-name" title={cityName}>{cityName}</span>
                </ListboxItem>)
            }
          </Listbox>),

      ],
    };
  }

  private static get quantityFormatting(): ComponentExampleCategory {
    const examples = [];
    examples.push(
      createComponentExample("Meter", "Non-composite Formatting", <NumericFormatPopup persistenceUnitName={"Units.M"} initialMagnitude={1234.56} />),
    );
    return {
      title: "Quantity Formatting Component",
      examples,
    };
  }

  private static get settingPage(): ComponentExampleCategory {
    const examples = [];
    examples.push(
      createComponentExample("Setting Page", undefined, <MySettingsPage />),
    );
    return {
      title: "Setting Page Component",
      examples,
    };
  }

  private static get timelineSamples(): ComponentExampleCategory {
    const examples = [];
    examples.push(
      createComponentExample("TimelineComponent", "With appended menu items", <ItemsAppendedSampleTimeline />),
      createComponentExample("TimelineComponent", "With prefixed menu items", <ItemsPrefixedSampleTimeline />),
      createComponentExample("TimelineComponent", "With menu items replaced", <ItemsReplacedSampleTimeline />),
      createComponentExample("TimelineComponent", "With no repeat option", <NoRepeatSampleTimeline />),
      createComponentExample("TimelineComponent", "With timezone offset of 0", <NoLocalizedTimeSampleTimeline />),
      createComponentExample("TimelineComponent", "With no timezone offset specified", <LocalizedTimeSampleTimeline />),
      createComponentExample("TimelineComponent", "With with today's date marked by the default marker", <CurrentDateMarkedSampleTimeline />),
      createComponentExample("TimelineComponent", "With with today's date marked by a star", <CurrentDateMarkedCustomIconSampleTimeline />),
    );
    return {
      title: "Timelines",
      examples,
    };
  }
  public static get categories(): ComponentExampleCategory[] {
    return [
      ComponentExamplesProvider.autoSuggestSamples,
      ComponentExamplesProvider.badgeSamples,
      ComponentExamplesProvider.checkListBoxSamples,
      ComponentExamplesProvider.colorSamples,
      ComponentExamplesProvider.contextMenuSample,
      ComponentExamplesProvider.datePickerSample,
      ComponentExamplesProvider.expandableListBlockSamples,
      ComponentExamplesProvider.inputsSamples,
      ComponentExamplesProvider.listboxSamples,
      ComponentExamplesProvider.loadingSamples,
      ComponentExamplesProvider.messageSamples,
      ComponentExamplesProvider.popupSamples,
      ComponentExamplesProvider.quantitySamples,
      ComponentExamplesProvider.searchBoxSample,
      ComponentExamplesProvider.tabsSamples,
      ComponentExamplesProvider.textSamples,
      ComponentExamplesProvider.tileSamples,
      ComponentExamplesProvider.timelineSamples,
      ComponentExamplesProvider.toggleSamples,
      ComponentExamplesProvider.weightSamples,
      ComponentExamplesProvider.quantityFormatting,
      ComponentExamplesProvider.settingPage,
    ];
  }
}
