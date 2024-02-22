/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Timeline
 */
import classnames from "classnames";
import * as React from "react";
import { UiAdmin } from "@itwin/appui-abstract";
import {
  toDateString,
  toTimeString,
  UiComponents,
} from "@itwin/components-react";
import { Icon } from "@itwin/core-react";
import { SvgCheckmark, SvgMoreVertical } from "@itwin/itwinui-icons-react";
import { DropdownMenu, MenuDivider, MenuItem } from "@itwin/itwinui-react";
import { UiIModelComponents } from "../UiIModelComponents";
import { InlineEdit } from "./InlineEdit";
import type { TimelinePausePlayArgs } from "./interfaces";
import { TimelinePausePlayAction } from "./interfaces";
import { PlayButton } from "./PlayButton";
import { Scrubber } from "./Scrubber";
import "./TimelineComponent.scss";
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
    startDate,
    endDate,
    showDuration,
    timeZoneOffset,
    dateFormatOptions,
    timeFormatOptions,
    includeRepeat = true,
    onSettingsChange,
    onChange,
  } = props;
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentDuration, setCurrentDuration] = React.useState(
    props.initialDuration ?? 0
  );
  const [totalDuration, setTotalDuration] = React.useState(props.totalDuration);
  const [repeat, setRepeat] = React.useState(props.repeat ?? false);

  const repeatLabel = React.useMemo(
    () => UiIModelComponents.translate("timeline.repeat"),
    []
  );
  const standardTimelineMenuItems: TimelineMenuItemProps[] = React.useMemo(
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
  const play = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    props.onPlayPause?.(true);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const playOrReplay = () => {
    if (isPlaying) return;

    if (currentDuration >= totalDuration) {
      setCurrentDuration(0);
    }

    play();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pause = () => {
    if (!isPlaying) return;
    setIsPlaying(false);
    props.onPlayPause?.(false);
  };

  const onTimelineChange = (values: ReadonlyArray<number>) => {
    const newDuration = values[0];
    updateDuration(newDuration);
  };

  const updateDuration = React.useCallback(
    (newDuration: number) => {
      newDuration = Math.max(newDuration, 0);
      newDuration = Math.min(totalDuration, newDuration);
      setCurrentDuration(newDuration);

      const fraction = newDuration / totalDuration;
      onChange?.(fraction);
    },
    [onChange, totalDuration]
  );

  const displayTime = (time: number) => {
    const addZero = (i: number) => {
      return i < 10 ? `0${i}` : i;
    };

    const date = new Date(time);
    // const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    return `${addZero(minutes)}:${addZero(seconds)}`;
  };

  const getMilliseconds = (time: string) => {
    if (time.indexOf(":") !== -1) {
      return (
        (Number(time.split(":")[0]) * 60 + Number(time.split(":")[1])) * 1000
      );
    } else {
      return Number(time) * 1000;
    }
  };

  const onTotalDurationChange = (value: string) => {
    // NOTE: we should reset the current duration to 0
    const milliseconds = getMilliseconds(value);
    updateTotalDuration(milliseconds);
  };

  const onRepeatClick = () => {
    const newRepeat = !repeat;
    setRepeat(newRepeat);
    props.onSettingsChange?.({ loop: newRepeat });
  };

  const updateTotalDuration = React.useCallback(
    (duration: number) => {
      let changed = false;
      setTotalDuration((prev) => {
        if (prev !== duration) changed = true;
        return duration;
      });

      if (!changed) return;
      onSettingsChange?.({ duration });
    },
    [onSettingsChange]
  );

  const createMenuItemNode = (
    item: TimelineMenuItemProps,
    index: number,
    currentTimelineDuration: number,
    close: () => void
  ): React.ReactElement => {
    const label = item.label;
    const checked = currentTimelineDuration === item.timelineDuration;
    const icon = checked ? (
      <span className="icon">
        <Icon iconSpec={<SvgCheckmark />} />{" "}
      </span>
    ) : (
      <span />
    );
    return (
      <MenuItem
        key={index}
        startIcon={icon}
        onClick={() => {
          updateTotalDuration(item.timelineDuration);
          close();
        }}
      >
        {label}
      </MenuItem>
    );
  };

  const renderSettings = () => {
    const createMenuItemNodes = (close: () => void): React.ReactElement[] => {
      let contextMenuItems: Array<TimelineMenuItemProps> = [];

      if (!props.appMenuItems) {
        contextMenuItems = standardTimelineMenuItems;
      } else {
        if (props.appMenuItemOption === "append") {
          contextMenuItems = standardTimelineMenuItems.concat(
            props.appMenuItems
          );
        } else if (props.appMenuItemOption === "prefix") {
          contextMenuItems = props.appMenuItems.concat(
            standardTimelineMenuItems
          );
        } else {
          contextMenuItems = props.appMenuItems;
        }
      }

      const itemNodes: React.ReactElement[] = [];
      let keyIndex = 0;
      if (includeRepeat) {
        const checked = repeat;
        const icon = checked ? (
          <span className="icon">
            <Icon iconSpec={<SvgCheckmark />} />{" "}
          </span>
        ) : (
          <span />
        );
        itemNodes.push(
          <MenuItem
            key={++keyIndex}
            onClick={() => {
              onRepeatClick();
              close();
            }}
            startIcon={icon}
          >
            {repeatLabel}
          </MenuItem>
        );
        itemNodes.push(<MenuDivider key={++keyIndex} />);
      }

      contextMenuItems.forEach((item: TimelineMenuItemProps, index: number) => {
        itemNodes.push(
          createMenuItemNode(item, index + keyIndex + 1, totalDuration, close)
        );
      });

      return itemNodes;
    };

    return (
      <DropdownMenu menuItems={createMenuItemNodes} placement="top-start">
        <span
          data-testid="timeline-settings"
          className="timeline-settings icon"
          role="button"
          tabIndex={-1}
          title={UiComponents.translate("button.label.settings")}
        >
          <Icon iconSpec={<SvgMoreVertical />} />
        </span>
      </DropdownMenu>
    );
  };

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

  React.useEffect(() => {
    if (props.repeat === undefined) return;
    if (props.repeat === repeat) return;

    setRepeat(props.repeat);
    onSettingsChange?.({ loop: props.repeat });
  }, [props.repeat, onSettingsChange, repeat]);
  React.useEffect(() => {
    updateDuration(props.initialDuration ?? 0);
  }, [props.initialDuration]);
  React.useEffect(() => {
    updateTotalDuration(props.totalDuration);
  }, [props.totalDuration, updateTotalDuration]);
  useAnimation(
    ({ delta }) => {
      const duration = currentDuration + delta;
      updateDuration(duration);

      if (duration >= totalDuration) {
        if (repeat) {
          setCurrentDuration(0);
          return;
        }

        pause();
      }
    },
    () => {},
    isPlaying
  );

  const durationString = displayTime(currentDuration);
  const totalDurationString = displayTime(totalDuration);
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
            <span className="duration-start-time">{durationString}</span>
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
              defaultValue={totalDurationString}
              onChange={onTotalDurationChange}
            />
          )}
        </div>
        {renderSettings()}
      </div>
    </div>
  );
}

function useAnimation(
  onAnimate: (args: { duration: number; delta: number }) => void,
  onCancel: () => void,
  playing = true
) {
  const onAnimateRef = React.useRef(onAnimate);
  onAnimateRef.current = onAnimate;

  const onCancelRef = React.useRef(onCancel);
  onCancelRef.current = onCancel;

  const startTimeRef = React.useRef<number | undefined>();
  const lastTimeRef = React.useRef<number | undefined>();

  React.useEffect(() => {
    if (!playing) return;

    let handle = 0;
    let didCancel = false;
    const cancel = onCancelRef.current;

    const animate = (time: number) => {
      if (startTimeRef.current === undefined) {
        startTimeRef.current = time;
      }
      if (lastTimeRef.current === undefined) {
        lastTimeRef.current = time;
      }

      onAnimateRef.current({
        duration: time - startTimeRef.current,
        delta: time - lastTimeRef.current,
      });
      lastTimeRef.current = time;

      if (didCancel) {
        return;
      }

      handle = window.requestAnimationFrame(animate);
    };

    handle = window.requestAnimationFrame(animate);
    return () => {
      didCancel = true;
      startTimeRef.current = undefined;
      lastTimeRef.current = undefined;
      window.cancelAnimationFrame(handle);
      cancel();
    };
  }, [playing]);
}
