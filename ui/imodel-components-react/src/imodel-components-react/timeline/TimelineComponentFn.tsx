/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Timeline
 */
import "./TimelineComponent.scss";
import classnames from "classnames";
import * as React from "react";
import { UiAdmin } from "@itwin/appui-abstract";
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
import type { TimelinePausePlayArgs } from "./interfaces";
import { TimelinePausePlayAction } from "./interfaces";
import { PlayButton } from "./PlayButton";
import { Scrubber } from "./Scrubber";
import type {
  TimelineComponentProps,
  TimelineMenuItemProps,
} from "./TimelineComponent";

const slowSpeed = 60 * 1000;
const mediumSpeed = 20 * 1000;
const fastSpeed = 10 * 1000;

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
  const updateTotalDuration = (newDuration: number) => {
    if (newDuration === totalDuration) return;

    setTotalDuration(newDuration);
    onSettingsChange?.({ duration: newDuration });
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
    <div
      data-testid="timeline-component"
      className={classnames("timeline-component", hasDates && "has-dates")}
    >
      <div className="scrubber">
        <PlayButton
          className="play-button"
          isPlaying={isPlaying}
          onPlay={playOrReplay}
          onPause={pause}
        />
        <div className="start-time-container">
          {hasDates && (
            <span data-testid="test-start-date" className="start-date">
              {toDateString(startDate, timeZoneOffset, dateFormatOptions)}
            </span>
          )}
          {hasDates && !showDuration && (
            <span data-testid="test-start-time" className="start-time">
              {toTimeString(startDate, timeZoneOffset, timeFormatOptions)}
            </span>
          )}
          {showDuration && (
            <span className="duration-start-time">{currentDurationStr}</span>
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
        <div className="end-time-container">
          {hasDates && (
            <span className="end-date">
              {toDateString(endDate, timeZoneOffset)}
            </span>
          )}
          {hasDates && !showDuration && (
            <span className="end-time">
              {toTimeString(endDate, timeZoneOffset, timeFormatOptions)}
            </span>
          )}
          {showDuration && (
            <InlineEdit
              className="duration-end-time"
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
