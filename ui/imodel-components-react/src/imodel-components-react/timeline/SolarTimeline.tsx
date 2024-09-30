/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Timeline
 */

import "./SolarTimeline.scss";
import classnames from "classnames";
import * as React from "react";
import { ColorByName, ColorDef } from "@itwin/core-common";
import type { CommonProps } from "@itwin/core-react";
import { adjustDateToTimezone, UiComponents } from "@itwin/components-react";
import {
  Button,
  ColorBuilder,
  ColorInputPanel,
  ColorPalette,
  ColorPicker,
  DatePicker,
  Flex,
  Icon,
  IconButton,
  Label,
  Popover,
  Select,
  Slider,
  Text,
  Tooltip,
  VisuallyHidden,
} from "@itwin/itwinui-react";
import {
  SvgCalendar,
  SvgLoop,
  SvgMoon,
  SvgSettings,
  SvgSun,
} from "@itwin/itwinui-icons-react";
import type { SolarDataProvider } from "./interfaces.js";
import { UiIModelComponents } from "../UiIModelComponents.js";
import { PlayButton } from "./PlayButton.js";
import { useTranslation } from "../useTranslation.js";

const msPerMinute = 1000 * 60;
const msPerHour = msPerMinute * 60;
const defaultPlaybackDuration = 40 * 1000;

const offset = 6;

// eslint-disable-next-line deprecation/deprecation
interface TimelineProps extends CommonProps {
  dayStartMs: number;
  sunRiseOffsetMs: number;
  sunSetOffsetMs: number;
  currentTimeOffsetMs: number;
  isPlaying: boolean;
  formatTick?: (ms: number) => string;
  formatTime: (ms: number) => string;
  onChange?: (values: ReadonlyArray<number>) => void;
  onUpdate?: (values: ReadonlyArray<number>) => void;
}

function Timeline(props: TimelineProps) {
  const {
    formatTick,
    formatTime,
    onChange,
    onUpdate,
    dayStartMs,
    sunSetOffsetMs,
    sunRiseOffsetMs,
    currentTimeOffsetMs,
  } = props;

  const tooltipContent = formatTime(dayStartMs + currentTimeOffsetMs);

  const className = classnames(
    "solar-timeline",
    props.className,
    formatTick && "showticks"
  );
  const sunRiseStr = formatTime(dayStartMs + sunRiseOffsetMs);
  const sunSetStr = formatTime(dayStartMs + sunSetOffsetMs);
  return (
    <div className={className}>
      <VisuallyHidden>Solar timeline</VisuallyHidden>
      <Slider
        thumbProps={() => ({ "aria-labelledby": "timeline" })}
        step={msPerMinute}
        min={sunRiseOffsetMs}
        max={sunSetOffsetMs}
        minLabel={
          <Tooltip content={sunRiseStr}>
            <Icon>
              <SvgSun />
            </Icon>
          </Tooltip>
        }
        maxLabel={
          <Tooltip content={sunSetStr}>
            <Icon>
              <SvgMoon />
            </Icon>
          </Tooltip>
        }
        onUpdate={onUpdate}
        onChange={onChange}
        values={[currentTimeOffsetMs]}
        tooltipProps={() => ({
          content: tooltipContent,
        })}
      />
    </div>
  );
}

interface SolarTimelineComponentProps {
  dataProvider: SolarDataProvider; // provides date, sunrise, sunset in ms, also contains timezone offset from UTC, and updates the display style to current time.
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
  private _requestFrame = 0;
  private _unmounted = false;
  private _timeLastCycle = 0;
  private _totalPlayTime = 0;

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

  private readonly _speeds = [1, 2, 3, 4, 5, 6];

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
      if (this.props.onPlayPause) this.props.onPlayPause(true);
    });
  }

  // user clicked pause button
  private _onPause = () => {
    if (!this.state.isPlaying) return;

    const currentTime = new Date().getTime();
    this._totalPlayTime += currentTime - this._timeLastCycle;

    // stop requesting frames
    window.cancelAnimationFrame(this._requestFrame);

    // stop playing
    this.setState({ isPlaying: false });

    if (this.props.onPlayPause) this.props.onPlayPause(false);
  };

  // user clicked play button
  private _onPlay = () => {
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
    const newSunTime = newHours * msPerHour + newMinutes * msPerMinute;
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

  private _formatTime = (ms: number) => {
    const date = new Date(ms);
    const amLabel = UiComponents.translate("time.am");
    const pmLabel = UiComponents.translate("time.pm");
    // convert project date to browser locale date
    const localTime = adjustDateToTimezone(
      date,
      this.props.dataProvider.timeZoneOffset * 60
    );
    let hours = localTime.getHours();
    const minutes = date.getMinutes();
    const abbrev = hours < 12 ? amLabel : hours === 24 ? amLabel : pmLabel;
    hours = hours > 12 ? hours - 12 : hours;
    const hoursStr = hours.toLocaleString(undefined, {
      minimumIntegerDigits: 2,
    });
    const minutesStr = minutes.toLocaleString(undefined, {
      minimumIntegerDigits: 2,
    });
    return `${hoursStr}:${minutesStr} ${abbrev}`;
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
      speed: currentSpeed,
      loop,
      currentTimeOffsetMs,
      sunRiseOffsetMs,
      sunSetOffsetMs,
    } = this.state;
    const months = [
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

    const localTime = this.getLocalTime(
      this.state.dayStartMs + this.state.currentTimeOffsetMs
    );
    const formattedTime = this._formatTime(
      dataProvider.dayStartMs + currentTimeOffsetMs
    );
    const formattedDate = `${
      months[localTime.getMonth()]
    }, ${localTime.getDate()}`;

    return (
      <div className="solar-timeline-wrapper">
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
              offset,
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
          <Tooltip
            content={UiIModelComponents.translate("solartimeline.speed")}
          >
            <Select
              native
              styleType="borderless"
              triggerProps={{
                name: "speed",
              }}
              onChange={(newValue) => this._onSpeedChange(Number(newValue))}
              value={currentSpeed.toString()}
              options={this._speeds.map((speed) => ({
                value: speed.toString(),
                label: `${speed}x`,
              }))}
            />
          </Tooltip>

          <IconButton
            styleType="borderless"
            label={UiIModelComponents.translate("timeline.repeat")}
            onClick={this._onToggleLoop}
            isActive={loop}
          >
            <SvgLoop />
          </IconButton>

          <Popover
            content={
              <ColorPicker
                selectedColor={this.state.shadowColor.colors}
                onChangeComplete={(color) => {
                  const colorDef = ColorDef.create(color.toTbgr());
                  this.setState(
                    { shadowColor: colorDef },
                    () => (this.props.dataProvider.shadowColor = colorDef)
                  );
                }}
              >
                <Text variant="title" as="h2" style={{ textAlign: "center" }}>
                  {UiIModelComponents.translate("solarsettings.shadowcolor")}
                </Text>
                <ColorBuilder />
                <ColorInputPanel defaultColorFormat="hsl" />
                <ColorPalette
                  colors={this._presetColors.map((color) => color.colors)}
                />
              </ColorPicker>
            }
            placement="top"
            middleware={{
              offset,
            }}
          >
            <IconButton
              styleType="borderless"
              data-testid="shadow-settings-button"
              label={UiIModelComponents.translate("timeline.settings")}
              onClick={this._onOpenSettingsPopup}
            >
              <SvgSettings />
            </IconButton>
          </Popover>
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
    const { translate } = useTranslation();
    const tooltip = translate("solartimeline.dateTime");

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
