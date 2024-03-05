/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Timeline
 */

// component is in alpha state - it may change after usability testing - test coverage not complete
/* istanbul ignore file */

import "./SolarTimeline.scss";
import classnames from "classnames";
import * as React from "react";
import {
  Button,
  DatePicker,
  Flex,
  IconButton,
  Label,
  Popover,
  Slider,
  Text,
  Tooltip,
  VisuallyHidden,
} from "@itwin/itwinui-react";

import type { HSVColor } from "@itwin/core-common";
import { ColorByName, ColorDef } from "@itwin/core-common";
import { RelativePosition, TimeDisplay } from "@itwin/appui-abstract";
import type { CommonProps } from "@itwin/core-react";
import { Popup } from "@itwin/core-react";
import type { TimeSpec } from "@itwin/components-react";
import {
  adjustDateToTimezone,
  TimeField,
  UiComponents,
} from "@itwin/components-react";
import { HueSlider } from "../color/HueSlider";
import { SaturationPicker } from "../color/SaturationPicker";
import { ColorSwatch } from "../color/Swatch";
import type { SolarDataProvider } from "./interfaces";
import {
  CustomThumb,
  getPercentageOfRectangle,
  RailMarkers,
  useFocusedThumb,
} from "./Scrubber";
import { UiIModelComponents } from "../UiIModelComponents";
import {
  SvgCalendar,
  SvgLoop,
  SvgMoon,
  SvgSettings,
  SvgSun,
} from "@itwin/itwinui-icons-react";
import { PlayButton } from "./PlayButton";

// cSpell:ignore millisec solarsettings showticks shadowcolor solartimeline datepicker millisecs

const millisecPerMinute = 1000 * 60;
const millisecPerHour = millisecPerMinute * 60;
// const millisecPerDay = millisecPerHour * 24;
const defaultPlaybackDuration = 40 * 1000; // 40 seconds
const addZero = (i: number) => {
  return i < 10 ? `0${i}` : i;
};

interface TimelineProps extends CommonProps {
  dayStartMs: number;
  sunRiseOffsetMs: number;
  sunSetOffsetMs: number;
  currentTimeOffsetMs: number;
  isPlaying: boolean;
  formatTick?: (millisec: number) => string;
  formatTime: (millisec: number) => string;
  onChange?: (values: ReadonlyArray<number>) => void;
  onUpdate?: (values: ReadonlyArray<number>) => void;
}

function Timeline(props: TimelineProps) {
  const [sliderContainer, setSliderContainer] =
    React.useState<HTMLDivElement | null>(null);
  const [pointerPercent, setPointerPercent] = React.useState(0);

  const tooltipProps = React.useCallback(() => {
    return { visible: false };
  }, []);

  const [showRailTooltip, setShowRailTooltip] = React.useState(false);

  const handlePointerEnter = React.useCallback(() => {
    setShowRailTooltip(true);
  }, []);

  const handlePointerLeave = React.useCallback(() => {
    setShowRailTooltip(false);
  }, []);

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent) => {
      sliderContainer &&
        setPointerPercent(
          getPercentageOfRectangle(
            sliderContainer.getBoundingClientRect(),
            event.clientX
          )
        );
    },
    [sliderContainer]
  );

  const {
    formatTick,
    formatTime,
    onChange,
    onUpdate,
    dayStartMs,
    sunSetOffsetMs,
    sunRiseOffsetMs,
    currentTimeOffsetMs,
    isPlaying,
  } = props;

  const thumbHasFocus = useFocusedThumb(sliderContainer ?? undefined);

  const tickLabel = React.useMemo(() => {
    const showTip = isPlaying || showRailTooltip || thumbHasFocus;
    const totalDuration = sunSetOffsetMs - sunRiseOffsetMs;
    const percent =
      isPlaying || thumbHasFocus
        ? (currentTimeOffsetMs - sunRiseOffsetMs) / totalDuration
        : pointerPercent;
    const tooltipText = formatTime(
      isPlaying || thumbHasFocus
        ? dayStartMs + currentTimeOffsetMs
        : dayStartMs + (sunRiseOffsetMs + pointerPercent * totalDuration)
    );
    return (
      <RailMarkers
        showToolTip={showTip}
        percent={percent}
        tooltipText={tooltipText}
      />
    );
  }, [
    isPlaying,
    showRailTooltip,
    thumbHasFocus,
    sunSetOffsetMs,
    sunRiseOffsetMs,
    currentTimeOffsetMs,
    pointerPercent,
    formatTime,
    dayStartMs,
  ]);

  const className = classnames(
    "solar-timeline",
    props.className,
    formatTick && "showticks"
  );
  const sunRiseFormat = formatTime(dayStartMs + sunRiseOffsetMs);
  const sunSetFormat = formatTime(dayStartMs + sunSetOffsetMs);
  return (
    <div className={className}>
      <VisuallyHidden>
        <Label id="timeline" as="div">
          Solar timeline
        </Label>
      </VisuallyHidden>
      <Slider
        thumbProps={() => ({ "aria-labelledby": "timeline" })}
        className={className}
        step={millisecPerMinute}
        min={sunRiseOffsetMs}
        max={sunSetOffsetMs}
        minLabel={<SvgSun />}
        maxLabel={<SvgMoon />}
        onUpdate={onUpdate}
        onChange={onChange}
        values={[currentTimeOffsetMs]}
        tooltipProps={tooltipProps}
        tickLabels={tickLabel}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      />
    </div>
  );
}

interface SolarTimelineComponentProps {
  dataProvider: SolarDataProvider; // provides date, sunrise, sunset in millisecs, also contains timezone offset from UTC, and updates the display style to current time.
  onPlayPause?: (playing: boolean) => void; // callback triggered when play/pause button is pressed
  duration?: number; // playback duration in milliseconds
  speed?: number;
}

interface SolarTimelineComponentState {
  isPlaying: boolean; // timeline is currently playing or paused
  isDateOpened: boolean; // date picker is opened
  isSettingsOpened: boolean; // settings popup is opened
  dayStartMs: number;
  sunRiseOffsetMs: number;
  sunSetOffsetMs: number;
  sunDeltaMs: number;
  currentTimeOffsetMs: number;
  speed: number;
  loop: boolean;
  shadowColor: ColorDef;
  duration: number; // playback duration in milliseconds
  adjustedDuration: number; // playback duration in milliseconds/ speed
}

/** Solar Timeline
 * @alpha
 */
export class SolarTimeline extends React.PureComponent<
  SolarTimelineComponentProps,
  SolarTimelineComponentState
> {
  private _settings: HTMLElement | null = null;
  private _requestFrame = 0;
  private _unmounted = false;
  private _timeLastCycle = 0;
  private _totalPlayTime = 0;
  private _settingsPopupTitle = UiIModelComponents.translate(
    "solarsettings.shadowcolor"
  );
  private _settingLabel = UiIModelComponents.translate(
    "solartimeline.settings"
  );
  private _loopLabel = UiIModelComponents.translate("timeline.repeat");
  private _speedLabel = UiIModelComponents.translate("solartimeline.speed");

  private _months = [
    UiComponents.translate("month.short.january"),
    UiComponents.translate("month.short.february"),
    UiComponents.translate("month.short.march"),
    UiComponents.translate("month.short.april"),
    UiComponents.translate("month.short.may"),
    UiComponents.translate("month.short.june"),
    UiComponents.translate("month.short.july"),
    UiComponents.translate("month.short.august"),
    UiComponents.translate("month.short.september"),
    UiComponents.translate("month.short.october"),
    UiComponents.translate("month.short.november"),
    UiComponents.translate("month.short.december"),
  ];

  private _timeLabel = UiComponents.translate("datepicker.time");
  private _amLabel = UiComponents.translate("time.am");
  private _pmLabel = UiComponents.translate("time.pm");
  private readonly _presetColors = [
    ColorDef.create(ColorByName.grey),
    ColorDef.create(ColorByName.lightGrey),
    ColorDef.create(ColorByName.darkGrey),
    ColorDef.create(ColorByName.lightBlue),
    ColorDef.create(ColorByName.lightGreen),
    ColorDef.create(ColorByName.darkGreen),
    ColorDef.create(ColorByName.tan),
    ColorDef.create(ColorByName.darkBrown),
  ];

  constructor(props: SolarTimelineComponentProps) {
    super(props);

    const dayStartMs = this.props.dataProvider.dayStartMs;
    const sunRiseOffsetMs =
      this.props.dataProvider.sunrise.getTime() - dayStartMs;
    const sunSetOffsetMs =
      this.props.dataProvider.sunset.getTime() - dayStartMs;
    const sunDeltaMs = sunSetOffsetMs - sunRiseOffsetMs;
    const sunOffsetMs =
      this.props.dataProvider.timeOfDay.getTime() - dayStartMs;
    const currentTimeOffsetMs = this.ensureRange(
      sunOffsetMs,
      sunRiseOffsetMs,
      sunSetOffsetMs
    );
    const shadowColor = this.props.dataProvider.shadowColor;
    const duration = this.props.duration
      ? this.props.duration
      : defaultPlaybackDuration;
    const speed = this.props.speed ? this.props.speed : 2;
    const adjustedDuration = duration / speed;
    this.setPlaybackTimeBySunTime(
      currentTimeOffsetMs,
      sunRiseOffsetMs,
      sunDeltaMs,
      adjustedDuration
    );

    this.state = {
      isDateOpened: false,
      isSettingsOpened: false,
      isPlaying: false,
      dayStartMs,
      sunRiseOffsetMs,
      sunSetOffsetMs,
      sunDeltaMs,
      currentTimeOffsetMs,
      speed,
      loop: false,
      shadowColor,
      duration,
      adjustedDuration,
    };
  }

  public override componentWillUnmount() {
    window.cancelAnimationFrame(this._requestFrame);
    this._unmounted = true;
  }

  // recursively update the animation until we hit the end or the pause button is clicked
  private _updateAnimation = (_timestamp: number) => {
    // istanbul ignore else
    if (!this.state.isPlaying || this._unmounted) {
      window.cancelAnimationFrame(this._requestFrame);
      return;
    }

    const currentTime = new Date().getTime();
    this._totalPlayTime += currentTime - this._timeLastCycle;
    this._timeLastCycle = currentTime;
    let percentComplete = this._totalPlayTime / this.state.adjustedDuration;
    if (percentComplete > 1) percentComplete = 1;

    let newPlayingState = true;

    // calculate the next sun time base on the percentage playback complete - should be int value as that is step amount for slider
    let nextSunOffset = Math.floor(
      this.state.sunRiseOffsetMs + percentComplete * this.state.sunDeltaMs
    );

    if (percentComplete > 0.99) {
      if (!this.state.loop) {
        newPlayingState = false;
        nextSunOffset = this.state.sunSetOffsetMs;
        window.cancelAnimationFrame(this._requestFrame);
      } else {
        nextSunOffset = this.state.sunRiseOffsetMs;
        this._totalPlayTime = 0;
      }
    }

    if (this.props.dataProvider.onTimeChanged) {
      const currentSunTime = new Date(this.state.dayStartMs + nextSunOffset);
      this.props.dataProvider.onTimeChanged(currentSunTime);
    }

    this.setState(
      { isPlaying: newPlayingState, currentTimeOffsetMs: nextSunOffset },
      () => {
        if (newPlayingState)
          this._requestFrame = window.requestAnimationFrame(
            this._updateAnimation
          );
      }
    );
  };

  private _play(sunTimeMs: number) {
    this._timeLastCycle = new Date().getTime();

    // start playing
    this.setState({ isPlaying: true, currentTimeOffsetMs: sunTimeMs }, () => {
      this._requestFrame = window.requestAnimationFrame(this._updateAnimation);
      // istanbul ignore else
      if (this.props.onPlayPause) this.props.onPlayPause(true);
    });
  }

  // user clicked pause button
  private _onPause = () => {
    // istanbul ignore if
    if (!this.state.isPlaying) return;

    const currentTime = new Date().getTime();
    this._totalPlayTime += currentTime - this._timeLastCycle;

    // stop requesting frames
    window.cancelAnimationFrame(this._requestFrame);

    // stop playing
    this.setState({ isPlaying: false });

    // istanbul ignore else
    if (this.props.onPlayPause) this.props.onPlayPause(false);
  };

  // user clicked play button
  private _onPlay = () => {
    // istanbul ignore if
    if (this.state.isPlaying) return;

    if (
      this.state.currentTimeOffsetMs >= this.state.sunSetOffsetMs ||
      this.state.currentTimeOffsetMs <= this.state.sunRiseOffsetMs
    ) {
      this._totalPlayTime = 0;
      this._play(this.state.sunRiseOffsetMs);
    } else {
      this._play(this.state.currentTimeOffsetMs);
    }
  };

  private setPlaybackTimeBySunTime(
    sunOffsetMs: number,
    sunRiseOffsetMs: number,
    sunDeltaMs: number,
    adjustedDuration?: number
  ) {
    this._totalPlayTime =
      ((sunOffsetMs - sunRiseOffsetMs) / sunDeltaMs) *
      (adjustedDuration ? adjustedDuration : this.state.adjustedDuration);
  }

  private _onDateChange = (newDate: Date) => {
    this.props.dataProvider.setDateAndTime(newDate);

    const dayStartMs = this.props.dataProvider.dayStartMs;
    const sunRiseOffsetMs =
      this.props.dataProvider.sunrise.getTime() - dayStartMs;
    const sunSetOffsetMs =
      this.props.dataProvider.sunset.getTime() - dayStartMs;
    const sunDeltaMs = sunSetOffsetMs - sunRiseOffsetMs;

    /** call dataProvider to update display style */
    // this.props.dataProvider.onTimeChanged?.(this.props.dataProvider.timeOfDay);

    // Update time
    const newHours = newDate.getHours();
    const newMinutes = newDate.getMinutes();
    const newSunTime =
      newHours * millisecPerHour + newMinutes * millisecPerMinute;
    const dateWithNewTime = new Date(dayStartMs + newSunTime);
    // this.props.dataProvider.setDateAndTime(dateWithNewTime, true);

    const currentTimeOffsetMs = this.ensureRange(
      newSunTime,
      sunRiseOffsetMs,
      sunSetOffsetMs
    );
    this.setPlaybackTimeBySunTime(
      currentTimeOffsetMs,
      sunRiseOffsetMs,
      sunDeltaMs
    );
    this._timeLastCycle = new Date().getTime();

    this.props.dataProvider.onTimeChanged?.(dateWithNewTime);
    this.setState({
      dayStartMs,
      sunRiseOffsetMs,
      sunSetOffsetMs,
      currentTimeOffsetMs,
      sunDeltaMs,
      isDateOpened: false,
    });
  };

  private _onCloseSettingsPopup = () => {
    this.setState({ isSettingsOpened: false });
  };

  private _onOpenSettingsPopup = () => {
    this.setState((prevState) => ({
      isSettingsOpened: !prevState.isSettingsOpened,
    }));
  };

  private ensureRange(value: number, min: number, max: number): number {
    return Math.max(Math.min(value, max), min);
  }

  private processSunTimeChange(sunTime: number) {
    if (sunTime === this.state.currentTimeOffsetMs) return;

    const currentTimeOffsetMs = this.ensureRange(
      sunTime,
      this.state.sunRiseOffsetMs,
      this.state.sunSetOffsetMs
    );

    if (this.props.dataProvider.onTimeChanged) {
      const currentSunTime = new Date(
        this.state.dayStartMs + currentTimeOffsetMs
      );
      this.props.dataProvider.onTimeChanged(currentSunTime);
    }

    this.setState({ currentTimeOffsetMs }, () => {
      const currentTime = new Date().getTime();
      this._timeLastCycle = currentTime;
      const percentComplete =
        (currentTimeOffsetMs - this.state.sunRiseOffsetMs) /
        this.state.sunDeltaMs;
      this._totalPlayTime = percentComplete * this.state.adjustedDuration;
    });
  }

  private _onUpdate = (values: ReadonlyArray<number>) => {
    if (!this.state.isPlaying) this.processSunTimeChange(values[0]);
  };

  private _onChange = (values: ReadonlyArray<number>) => {
    if (!this.state.isPlaying) this.processSunTimeChange(values[0]);
  };

  private _onSpeedChange = (value: number) => {
    const adjustedDuration = this.state.duration / value;
    this.setState({ speed: value, adjustedDuration });
  };

  private _onToggleLoop = () => {
    this.setState((prevState) => ({ loop: !prevState.loop }));
  };

  private _formatTime = (millisec: number) => {
    const date = new Date(millisec);
    // convert project date to browser locale date
    const localTime = adjustDateToTimezone(
      date,
      this.props.dataProvider.timeZoneOffset * 60
    );
    let hours = localTime.getHours();
    const minutes = addZero(date.getMinutes());
    const abbrev =
      hours < 12 ? this._amLabel : hours === 24 ? this._amLabel : this._pmLabel;
    hours = hours > 12 ? hours - 12 : hours;
    return `${hours}:${minutes} ${abbrev}`;
  };

  private _onPresetColorPick = (shadowColor: ColorDef) => {
    this.setState(
      { shadowColor },
      () => (this.props.dataProvider.shadowColor = shadowColor)
    );
  };

  private _handleHueOrSaturationChange = (hueOrSaturation: HSVColor) => {
    if (hueOrSaturation.s === 0)
      // for a ColorDef to be created from hsv s can't be 0
      hueOrSaturation = hueOrSaturation.clone(undefined, 0.5);

    const shadowColor = hueOrSaturation.toColorDef();
    this.setState(
      { shadowColor },
      () => (this.props.dataProvider.shadowColor = shadowColor)
    );
  };

  public getLocalTime(ticks: number): Date {
    const projectTime = new Date(ticks);
    // convert project date to browser locale date
    return adjustDateToTimezone(
      projectTime,
      this.props.dataProvider.timeZoneOffset * 60
    );
  }

  public override render() {
    const { dataProvider } = this.props;
    const {
      speed,
      loop,
      currentTimeOffsetMs,
      sunRiseOffsetMs,
      sunSetOffsetMs,
    } = this.state;
    const localTime = this.getLocalTime(
      this.state.dayStartMs + this.state.currentTimeOffsetMs
    );
    const formattedTime = this._formatTime(
      dataProvider.dayStartMs + currentTimeOffsetMs
    );
    const formattedDate = `${
      this._months[localTime.getMonth()]
    }, ${localTime.getDate()}`;

    const colorSwatchStyle: React.CSSProperties = {
      width: `100%`,
      height: `100%`,
    };

    return (
      <div className={"solar-timeline-wrapper"}>
        <Flex flexWrap="wrap" gap="none" className="solar-timeline-start">
          <PlayButton
            isPlaying={this.state.isPlaying}
            onPlay={this._onPlay}
            onPause={this._onPause}
          />
          <Popover
            content={
              <DatePicker
                date={localTime}
                onChange={this._onDateChange}
                showTime
                use12Hours
              />
            }
            visible={this.state.isDateOpened}
            onVisibleChange={(isDateOpened) => {
              this.setState({ isDateOpened });
            }}
            placement="top"
            middleware={{
              offset: 6,
            }}
          >
            <CalendarButton
              onClick={() => {
                const isDateOpened = !this.state.isDateOpened;
                this.setState({ isDateOpened });
              }}
            >
              {formattedDate} @ {formattedTime}
            </CalendarButton>
          </Popover>
        </Flex>

        <Timeline
          className="solar-timeline"
          dayStartMs={dataProvider.dayStartMs}
          sunSetOffsetMs={sunSetOffsetMs}
          sunRiseOffsetMs={sunRiseOffsetMs}
          currentTimeOffsetMs={currentTimeOffsetMs}
          onChange={this._onChange}
          onUpdate={this._onUpdate}
          formatTime={this._formatTime}
          isPlaying={this.state.isPlaying}
        />

        <Flex
          justifyContent="flex-end"
          flexWrap="wrap"
          gap="none"
          className="solar-timeline-end"
        >
          <VisuallyHidden>
            <Label htmlFor="speed">Timeline speed</Label>
          </VisuallyHidden>
          <Tooltip content={this._speedLabel}>
            <select className="xyz" name="speed" id="speed">
              <option value="1x" selected>
                1x
              </option>
              <option value="2x">2x</option>
              <option value="3x">3x</option>
              <option value="4x">4x</option>
              <option value="5x">5x</option>
              <option value="6x">6x</option>
            </select>
          </Tooltip>

          <IconButton
            styleType="borderless"
            label={this._loopLabel}
            onClick={this._onToggleLoop}
            isActive={loop}
          >
            <SvgLoop />
          </IconButton>

          <IconButton
            styleType="borderless"
            data-testid="shadow-settings-button"
            label={this._settingLabel}
            ref={(element) => (this._settings = element)}
            onClick={this._onOpenSettingsPopup}
          >
            <SvgSettings />
          </IconButton>

          <Popup
            className="shadow-settings-popup"
            target={this._settings}
            offset={11}
            isOpen={this.state.isSettingsOpened}
            onClose={this._onCloseSettingsPopup}
            position={RelativePosition.Top}
          >
            <div className="shadow-settings-popup-container">
              <div className="shadow-settings-header">
                {this._settingsPopupTitle}
              </div>
              <div className="shadow-settings-color">
                <div className="shadow-settings-color-top">
                  <SaturationPicker
                    hsv={this.state.shadowColor.toHSV()}
                    onSaturationChange={this._handleHueOrSaturationChange}
                  />
                </div>
                <div className="shadow-settings-color-bottom">
                  <div className="shadow-settings-color-bottom-left">
                    <HueSlider
                      hsv={this.state.shadowColor.toHSV()}
                      onHueChange={this._handleHueOrSaturationChange}
                      isHorizontal={true}
                    />
                  </div>
                  <div className="shadow-settings-color-bottom-right">
                    <ColorSwatch
                      style={colorSwatchStyle}
                      colorDef={this.state.shadowColor}
                      round={false}
                    />
                  </div>
                </div>
              </div>
              <div className="shadow-settings-color-presets">
                <ColorSwatch
                  colorDef={this._presetColors[0]}
                  round={false}
                  onColorPick={this._onPresetColorPick}
                />
                <ColorSwatch
                  colorDef={this._presetColors[1]}
                  round={false}
                  onColorPick={this._onPresetColorPick}
                />
                <ColorSwatch
                  colorDef={this._presetColors[2]}
                  round={false}
                  onColorPick={this._onPresetColorPick}
                />
                <ColorSwatch
                  colorDef={this._presetColors[3]}
                  round={false}
                  onColorPick={this._onPresetColorPick}
                />
                <ColorSwatch
                  colorDef={this._presetColors[4]}
                  round={false}
                  onColorPick={this._onPresetColorPick}
                />
                <ColorSwatch
                  colorDef={this._presetColors[5]}
                  round={false}
                  onColorPick={this._onPresetColorPick}
                />
                <ColorSwatch
                  colorDef={this._presetColors[6]}
                  round={false}
                  onColorPick={this._onPresetColorPick}
                />
                <ColorSwatch
                  colorDef={this._presetColors[7]}
                  round={false}
                  onColorPick={this._onPresetColorPick}
                />
              </div>
            </div>
          </Popup>
        </Flex>
      </div>
    );
  }
}

interface CalendarButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const CalendarButton = React.forwardRef<HTMLButtonElement, CalendarButtonProps>(
  function CalendarButton({ children, onClick }, ref) {
    const tooltip = React.useMemo(
      () => UiIModelComponents.translate("solartimeline.dateTime"),
      []
    );

    return (
      <Tooltip content={tooltip}>
        <Button
          styleType="borderless"
          startIcon={<SvgCalendar />}
          data-testid="solar-date-time-button"
          title={tooltip}
          onClick={onClick}
          ref={ref}
        >
          <span className="solar-timeline-date-time">{children}</span>
        </Button>
      </Tooltip>
    );
  }
);
