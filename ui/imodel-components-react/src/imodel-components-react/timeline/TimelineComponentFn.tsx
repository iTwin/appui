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
import {
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
  } = props;
  const _firstFrame = React.useRef<number | undefined>();

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentDuration, setCurrentDuration] = React.useState(
    props.initialDuration ?? 0
  );
  const [totalDuration, setTotalDuration] = React.useState(props.totalDuration);
  const [repeat, setRepeat] = React.useState(props.repeat ?? false);

  const _repeatLabel = React.useMemo(
    () => UiIModelComponents.translate("timeline.repeat"),
    []
  );
  const _standardTimelineMenuItems: TimelineMenuItemProps[] = React.useMemo(
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

      let startPlaying: boolean;
      switch (timelineArgs.timelineAction) {
        case TimelinePausePlayAction.Play:
          startPlaying = true;
          break;
        case TimelinePausePlayAction.Pause:
          startPlaying = false;
          break;
        case TimelinePausePlayAction.Toggle:
          startPlaying = !isPlaying;
          break;
        default:
          return; // throw error?
      }
      if (startPlaying) play();
      else _onPause();
    });
  }, []);
  React.useEffect(() => {
    _changeRepeatSetting(props.repeat);
  }, [props.repeat]);
  React.useEffect(() => {
    // TODO:
    // const newTotalDuration = props.totalDuration !== prevProps.totalDuration
    // ? this.props.totalDuration
    // : undefined
    setDuration(
      props.initialDuration ? props.initialDuration : 0,
      props.totalDuration
    );
  }, [props.initialDuration]);
  React.useEffect(() => {
    _onSetTotalDuration(props.totalDuration);
  }, [props.totalDuration]);
  const animation = () => {
    if (!isPlaying) {
      return;
    }

    const currentTime = new Date().getTime();
    if (!_firstFrame.current) {
      _firstFrame.current = currentTime;
    }

    const millisecondsElapsed = currentTime - _firstFrame.current;
    const duration = currentDuration + millisecondsElapsed;
    setDuration(duration);

    // stop the animation!
    if (duration >= totalDuration) {
      setIsPlaying(false);
      if (repeat) _replay();
      else {
        props.onPlayPause?.(false);
      }

      return;
    }
  };

  useAnimation(
    animation,
    () => {
      _firstFrame.current = undefined;
    },
    isPlaying
  );
  const onPlay = () => {
    if (isPlaying) return;

    // Timeline was complete, restart from the beginning
    if (currentDuration >= totalDuration) {
      _replay();
    } else {
      play();
    }

    props.onPlayPause?.(true);
  };

  const _onPause = () => {
    if (!isPlaying) return;

    // stop playing
    setIsPlaying(false);

    props.onPlayPause?.(false);
  };

  const play = () => {
    setIsPlaying(true);
  };

  const _onTimelineChange = (values: ReadonlyArray<number>) => {
    const currentDuration = values[0];
    setDuration(currentDuration);
  };

  const setDuration = (newDuration: number, newTotal?: number) => {
    newDuration = Math.max(newDuration, 0);
    newTotal = newTotal ?? totalDuration;
    newDuration = Math.min(newTotal, newDuration);
    setCurrentDuration(newDuration);

    const fraction = newDuration / newTotal;
    props.onChange?.(fraction);
  };

  const _replay = () => {
    setCurrentDuration(0);
    // TODO: setState callback
    play();
  };

  const _displayTime = (millisec: number) => {
    const addZero = (i: number) => {
      return i < 10 ? `0${i}` : i;
    };

    const date = new Date(millisec);
    // const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    return `${addZero(minutes)}:${addZero(seconds)}`;
  };

  const _getMilliseconds = (time: string) => {
    if (time.indexOf(":") !== -1) {
      return (
        (Number(time.split(":")[0]) * 60 + Number(time.split(":")[1])) * 1000
      );
    } else {
      return Number(time) * 1000;
    }
  };

  // user changed the total duration
  const _onTotalDurationChange = (value: string) => {
    // NOTE: we should reset the current duration to 0
    const milliseconds = _getMilliseconds(value);
    _onSetTotalDuration(milliseconds);
  };

  const _changeRepeatSetting = (newValue?: boolean) => {
    if (newValue === undefined) return;

    setRepeat(newValue);
    // TODO: setState callback
    props.onSettingsChange?.({ loop: repeat });
  };

  const _onRepeatChanged = () => {
    setRepeat((prev) => !prev);
    // TODO: setState callback
    props.onSettingsChange?.({ loop: repeat });
  };

  const _onSetTotalDuration = (milliseconds: number) => {
    setTotalDuration(milliseconds);
    // TODO: setState callback
    props.onSettingsChange?.({ duration: milliseconds });
  };

  const _createMenuItemNode = (
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
          _onSetTotalDuration(item.timelineDuration);
          close();
        }}
      >
        {label}
      </MenuItem>
    );
  };

  const _renderSettings = () => {
    const createMenuItemNodes = (close: () => void): React.ReactElement[] => {
      let contextMenuItems: Array<TimelineMenuItemProps> = [];

      if (!props.appMenuItems) {
        contextMenuItems = _standardTimelineMenuItems;
      } else {
        if (props.appMenuItemOption === "append") {
          contextMenuItems = _standardTimelineMenuItems.concat(
            props.appMenuItems
          );
        } else if (props.appMenuItemOption === "prefix") {
          contextMenuItems = props.appMenuItems.concat(
            _standardTimelineMenuItems
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
              _onRepeatChanged();
              close();
            }}
            startIcon={icon}
          >
            {_repeatLabel}
          </MenuItem>
        );
        itemNodes.push(<MenuDivider key={++keyIndex} />);
      }

      contextMenuItems.forEach((item: TimelineMenuItemProps, index: number) => {
        itemNodes.push(
          _createMenuItemNode(item, index + keyIndex + 1, totalDuration, close)
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

  const durationString = _displayTime(currentDuration);
  const totalDurationString = _displayTime(totalDuration);
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
          onPlay={onPlay}
          onPause={_onPause}
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
          onChange={_onTimelineChange}
          onUpdate={_onTimelineChange}
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
              onChange={_onTotalDurationChange}
            />
          )}
        </div>
        {_renderSettings()}
      </div>
    </div>
  );
}

function useAnimation(
  animation: () => void,
  onCancel: () => void,
  playing = true
) {
  React.useEffect(() => {
    let handle = 0;
    let didCancel = false;

    const animate = () => {
      animation();

      // Canceled from within animation.
      if (didCancel) return;

      handle = window.requestAnimationFrame(animate);
    };

    if (playing) {
      animate();
    }
    return () => {
      didCancel = true;
      onCancel();
      window.cancelAnimationFrame(handle);
    };
  }, [playing]);
}
