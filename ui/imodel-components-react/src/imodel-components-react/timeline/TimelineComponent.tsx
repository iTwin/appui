/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Timeline
 */
import "./TimelineComponent.scss";
import * as React from "react";
import { UiAdmin } from "@itwin/appui-abstract";
import type { DateFormatOptions } from "@itwin/components-react";
import {
  toDateString,
  toTimeString,
  UiComponents,
} from "@itwin/components-react";
import { SvgCheckmark, SvgMoreVertical } from "@itwin/itwinui-icons-react";
import {
  DropdownMenu,
  IconButton,
  MenuDivider,
  MenuItem,
} from "@itwin/itwinui-react";
import { UiIModelComponents } from "../UiIModelComponents";
import { InlineEdit } from "./InlineEdit";
import type { PlaybackSettings, TimelinePausePlayArgs } from "./interfaces";
import { TimelinePausePlayAction } from "./interfaces";
import { PlayButton } from "./PlayButton";
import { Scrubber } from "./Scrubber";

const slowSpeed = 60 * 1000;
const mediumSpeed = 20 * 1000;
const fastSpeed = 10 * 1000;

/** [[TimelineMenuItemOption]]: specifies how the app wants the timeline speeds to be installed on the TimelineComponent's ContextMenu
 * "replace" : use the app-supplied items in place of the standard items
 * "append" : add the app-supplied items following the standard items
 * "prefix" : add the app-supplied items before the standard items
 *
 * @public
 */
export type TimelineMenuItemOption = "replace" | "append" | "prefix";

/** [[TimelineMenuItemProps]] specifies playback speed entries in the Timeline's ContextMenu
 * @public
 */
export interface TimelineMenuItemProps {
  /** localized label for menu item */
  label: string;

  /** duration for the entire timeline to play */
  timelineDuration: number;
}

/** TimelineDateMarkerProps: Mark a date on the timeline with an indicator
 * @public
 */
export interface TimelineDateMarkerProps {
  /** Date to mark. If undefined, today's date will be used. */
  date?: Date;
  /** ReactNode to use as the marker on the timeline. If undefined, a short vertical bar will mark the date. */
  dateMarker?: React.ReactNode;
}

/** [[TimelineComponentProps]] configure the timeline
 * @public
 */
export interface TimelineComponentProps {
  /** Start date: beginning of the date range of a date-based timeline. */
  startDate?: Date;
  /** End date: end of the date range of a date-based timeline. */
  endDate?: Date;
  /** Total duration: range of the timeline in milliseconds. */
  totalDuration: number;
  /** Initial value for the current duration (the location of the thumb) in milliseconds */
  initialDuration?: number;
  /** Show in minimized mode (For future use. This prop will always be treated as true.)
   * @deprecated in 4.10.x. Has no effect.
   */
  minimized?: boolean;
  /** When playing, repeat indefinitely. Defaults to `false`. */
  repeat?: boolean;
  /** Show duration instead of time */
  showDuration?: boolean;
  /** Callback with current duration value (as a fraction) */
  onChange?: (duration: number) => void;
  /** Callback triggered when play/pause button is pressed */
  onPlayPause?: (playing: boolean) => void;
  /** Callback triggered when backward/forward buttons are pressed */
  onJump?: (forward: boolean) => void;
  /** Callback triggered when a setting is changed */
  onSettingsChange?: (arg: PlaybackSettings) => void;
  /** Always display in miniMode with no expand menu (For future use. This prop will always be treated as true)
   * @deprecated in 4.10.x. Has no effect.
   */
  alwaysMinimized?: boolean;
  /** ComponentId -- must be set to use TimelineComponentEvents */
  componentId?: string;
  /** Include the repeat option on the Timeline Context Menu. Defaults to `true`. */
  includeRepeat?: boolean;
  /** App-supplied speed entries in the Timeline Context Menu */
  appMenuItems?: TimelineMenuItemProps[];
  /** How to include the supplied app menu items in the Timeline Context Menu (prefix, append or replace). Defaults to `replace`. */
  appMenuItemOption?: TimelineMenuItemOption;
  /** Display date and time offset by the number of minutes specified. When undefined - local timezone will be used */
  timeZoneOffset?: number;
  /** Display a marker on the timeline rail to indicate current date - will only work if starDate and endDate are defined */
  markDate?: TimelineDateMarkerProps;
  /** Options used to format date string. If not defined it will user browser default locale settings. */
  dateFormatOptions?: DateFormatOptions;
  /** Options used to format time string. If not defined it will user browser default locale settings. */
  timeFormatOptions?: DateFormatOptions;
}

/** @internal */
export function TimelineComponent(props: TimelineComponentProps) {
  const {
    appMenuItemOption = "replace",
    startDate,
    endDate,
    showDuration,
    timeZoneOffset,
    dateFormatOptions,
    timeFormatOptions,
    includeRepeat = true,
    onSettingsChange,
    onChange,
    onPlayPause,
  } = props;
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentDuration, setCurrentDuration] = React.useState(
    props.initialDuration ?? 0
  );
  const [totalDuration, setTotalDuration] = React.useState(props.totalDuration);
  const [repeat, setRepeat] = React.useState(props.repeat ?? false);

  const playOrReplay = React.useCallback(() => {
    if (isPlaying) return;

    if (currentDuration >= totalDuration) {
      setCurrentDuration(0);
    }

    setIsPlaying(true);
    onPlayPause?.(true);
  }, [isPlaying, onPlayPause, currentDuration, totalDuration]);
  const pause = React.useCallback(() => {
    if (!isPlaying) return;
    setIsPlaying(false);
    onPlayPause?.(false);
  }, [isPlaying, onPlayPause]);
  const updateDuration = (newDuration: number) => {
    newDuration = Math.max(newDuration, 0);
    newDuration = Math.min(newDuration, totalDuration);

    if (newDuration === currentDuration) return;
    setCurrentDuration(newDuration);

    const fraction = newDuration / totalDuration;
    onChange?.(fraction);
  };
  const updateRepeat = (newRepeat: boolean) => {
    if (newRepeat === repeat) return;

    setRepeat(newRepeat);
    onSettingsChange?.({ loop: newRepeat });
  };
  const updateTotalDuration = (newTotalDuration: number) => {
    if (newTotalDuration === totalDuration) return;

    const fraction = currentDuration / totalDuration;
    const newCurrentDuration = fraction * newTotalDuration;

    setTotalDuration(newTotalDuration);
    setCurrentDuration(newCurrentDuration);
    onSettingsChange?.({ duration: newTotalDuration });
  };

  const prevInitialDuration = React.useRef(props.initialDuration);
  if (prevInitialDuration.current !== props.initialDuration) {
    updateDuration(props.initialDuration ?? 0);
    prevInitialDuration.current = props.initialDuration;
  }

  const prevRepeat = React.useRef(props.repeat);
  if (prevRepeat.current !== props.repeat) {
    updateRepeat(props.repeat ?? repeat);
    prevRepeat.current = props.repeat;
  }

  const prevTotalDuration = React.useRef(props.totalDuration);
  if (prevTotalDuration.current !== props.totalDuration) {
    updateTotalDuration(props.totalDuration);
    prevTotalDuration.current = props.totalDuration;
  }

  React.useEffect(() => {
    if (!props.componentId) return;
    return UiAdmin.onGenericUiEvent.addListener((args) => {
      const timelineArgs = args as TimelinePausePlayArgs;
      if (
        !timelineArgs ||
        props.componentId !== timelineArgs.uiComponentId ||
        timelineArgs.timelineAction === undefined
      )
        return;

      switch (timelineArgs.timelineAction) {
        case TimelinePausePlayAction.Play:
          playOrReplay();
          break;
        case TimelinePausePlayAction.Pause:
          pause();
          break;
        case TimelinePausePlayAction.Toggle:
          if (isPlaying) {
            pause();
          } else {
            playOrReplay();
          }
          break;
      }
    });
  }, [isPlaying, pause, playOrReplay, props.componentId]);
  useAnimation(({ delta }) => {
    const duration = currentDuration + delta;
    updateDuration(duration);

    if (duration >= totalDuration) {
      if (repeat) {
        setCurrentDuration(0);
        return;
      }

      pause();
    }
  }, isPlaying);

  const onTimelineChange = (values: ReadonlyArray<number>) => {
    const newDuration = values[0];
    updateDuration(newDuration);
  };

  const currentDurationStr = toDisplayTime(currentDuration);
  const totalDurationStr = toDisplayTime(totalDuration);
  const hasDates = !!startDate && !!endDate;
  return (
    <div data-testid="timeline-component" className="timeline-component">
      <PlayButton isPlaying={isPlaying} onPlay={playOrReplay} onPause={pause} />
      <div className="time-container">
        {hasDates && (
          <span data-testid="test-start-date" className="timeline-date">
            {toDateString(startDate, timeZoneOffset, dateFormatOptions)}
          </span>
        )}
        {hasDates && !showDuration && (
          <span data-testid="test-start-time" className="timeline-time">
            {toTimeString(startDate, timeZoneOffset, timeFormatOptions)}
          </span>
        )}
        {showDuration && (
          <span className="timeline-duration-time">{currentDurationStr}</span>
        )}
      </div>
      <Scrubber
        className="slider"
        currentDuration={currentDuration}
        totalDuration={totalDuration}
        startDate={startDate}
        endDate={endDate}
        isPlaying={isPlaying}
        showTime={!showDuration}
        onChange={onTimelineChange}
        onUpdate={onTimelineChange}
        timeZoneOffset={props.timeZoneOffset}
        markDate={props.markDate}
      />
      <div className="time-container">
        {hasDates && (
          <span className="end-date">
            {toDateString(endDate, timeZoneOffset)}
          </span>
        )}
        {hasDates && !showDuration && (
          <span className="timeline-time">
            {toTimeString(endDate, timeZoneOffset, timeFormatOptions)}
          </span>
        )}
        {showDuration && (
          <InlineEdit
            className="timeline-duration-time"
            defaultValue={totalDurationStr}
            onChange={(value) => {
              const newTotalDuration = timeToMs(value);
              updateTotalDuration(newTotalDuration);
            }}
          />
        )}
      </div>
      <SettingsMenu
        appMenuItems={props.appMenuItems}
        appMenuItemOption={appMenuItemOption}
        includeRepeat={includeRepeat}
        repeat={repeat}
        totalDuration={totalDuration}
        onRepeatClick={() => {
          updateRepeat(!repeat);
        }}
        onTotalDurationChange={(newTotalDuration) => {
          updateTotalDuration(newTotalDuration);
        }}
      />
    </div>
  );
}

type SettingsMenuProps = Pick<
  TimelineComponentProps,
  "appMenuItems" | "totalDuration"
> &
  Pick<
    Required<TimelineComponentProps>,
    "appMenuItemOption" | "includeRepeat" | "repeat"
  > & {
    onRepeatClick: () => void;
    onTotalDurationChange: (totalDuration: number) => void;
  };

function SettingsMenu({
  appMenuItems,
  appMenuItemOption,
  includeRepeat,
  repeat,
  totalDuration,
  onRepeatClick,
  onTotalDurationChange,
}: SettingsMenuProps) {
  const settingsLabel = React.useMemo(
    () => UiComponents.translate("button.label.settings"),
    []
  );
  const repeatLabel = React.useMemo(
    () => UiIModelComponents.translate("timeline.repeat"),
    []
  );
  const standardItems: TimelineMenuItemProps[] = React.useMemo(
    () => [
      {
        label: UiIModelComponents.translate("timeline.slow"),
        timelineDuration: slowSpeed,
      },
      {
        label: UiIModelComponents.translate("timeline.medium"),
        timelineDuration: mediumSpeed,
      },
      {
        label: UiIModelComponents.translate("timeline.fast"),
        timelineDuration: fastSpeed,
      },
    ],
    []
  );

  const menuItems = React.useMemo(() => {
    if (!appMenuItems) {
      return standardItems;
    }

    if (appMenuItemOption === "append") {
      return [...standardItems, ...appMenuItems];
    }
    if (appMenuItemOption === "prefix") {
      return [...appMenuItems, ...standardItems];
    }
    // Replace
    return appMenuItems;
  }, [appMenuItemOption, appMenuItems, standardItems]);

  return (
    <DropdownMenu
      menuItems={(close) => {
        return [
          ...(includeRepeat
            ? [
                <MenuItem
                  key="repeat"
                  onClick={() => {
                    onRepeatClick();
                    close();
                  }}
                  startIcon={repeat ? <SvgCheckmark /> : <></>}
                >
                  {repeatLabel}
                </MenuItem>,
                <MenuDivider key="divider" />,
              ]
            : []),
          ...menuItems.map((item, index) => {
            const checked = totalDuration === item.timelineDuration;
            return (
              <MenuItem
                key={index}
                startIcon={checked ? <SvgCheckmark /> : <></>}
                onClick={() => {
                  onTotalDurationChange(item.timelineDuration);
                  close();
                }}
              >
                {item.label}
              </MenuItem>
            );
          }),
        ];
      }}
      placement="top-start"
    >
      <IconButton
        data-testid="timeline-settings"
        title={settingsLabel}
        styleType="borderless"
      >
        <SvgMoreVertical />
      </IconButton>
    </DropdownMenu>
  );
}

function useAnimation(
  onAnimate: (args: { delta: number }) => void,
  playing = true
) {
  const onAnimateRef = React.useRef(onAnimate);
  onAnimateRef.current = onAnimate;

  const lastTimeRef = React.useRef<number | undefined>();

  React.useEffect(() => {
    if (!playing) return;

    let handle = 0;
    let didCancel = false;

    const animate = (time: number) => {
      if (lastTimeRef.current === undefined) {
        lastTimeRef.current = time;
      }

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      onAnimateRef.current({
        delta,
      });

      if (didCancel) return;

      handle = window.requestAnimationFrame(animate);
    };

    handle = window.requestAnimationFrame(animate);
    return () => {
      didCancel = true;
      lastTimeRef.current = undefined;
      window.cancelAnimationFrame(handle);
    };
  }, [playing]);
}

function timeToMs(time: string) {
  if (time.indexOf(":") !== -1) {
    return (
      (Number(time.split(":")[0]) * 60 + Number(time.split(":")[1])) * 1000
    );
  } else {
    return Number(time) * 1000;
  }
}

function toDisplayTime(ms: number) {
  const addZero = (i: number) => {
    return i < 10 ? `0${i}` : i;
  };

  const date = new Date(ms);
  // const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return `${addZero(minutes)}:${addZero(seconds)}`;
}
