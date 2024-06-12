/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "./Scrubber.scss";
import * as React from "react";
import { Slider } from "@itwin/itwinui-react";
import type { CommonProps } from "@itwin/core-react";
import { useEventListener } from "@itwin/core-react";
import { toDateString, toTimeString } from "@itwin/components-react";
import type { TimelineDateMarkerProps } from "./TimelineComponent";

/**
 * @internal
 */
export function getPercentageOfRectangle(rect: DOMRect, pointer: number) {
  const position = Math.min(rect.right, Math.max(rect.left, pointer));
  return (position - rect.left) / rect.width;
}

const formatDuration = (value: number) => {
  const addZero = (i: number) => {
    return i < 10 ? `0${i}` : i;
  };

  const date = new Date(value);
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return `${addZero(minutes)}:${addZero(seconds)}`;
};

const formatDate = (
  startDate: Date,
  endDate: Date,
  fraction: number,
  timeZoneOffset?: number
) => {
  const delta = (endDate.getTime() - startDate.getTime()) * fraction;
  const date = new Date(startDate.getTime() + delta);
  return toDateString(date, timeZoneOffset);
};

const formatTime = (
  startDate: Date,
  endDate: Date,
  fraction: number,
  timeZoneOffset?: number
) => {
  const delta = (endDate.getTime() - startDate.getTime()) * fraction;
  const date = new Date(startDate.getTime() + delta);
  return ` ${toTimeString(date, timeZoneOffset)}`;
};

function generateToolTipText(
  showTime: boolean,
  percent: number,
  min: number,
  max: number,
  startDate?: Date,
  endDate?: Date,
  timeZoneOffset = 0
) {
  if (startDate && endDate)
    return `${formatDate(startDate, endDate, percent, timeZoneOffset)}${
      showTime ? formatTime(startDate, endDate, percent, timeZoneOffset) : ""
    } `;

  const val = Math.round(min + (max - min) * percent);
  return formatDuration(val);
}

function getPercentageFromDate(startDate: Date, endDate: Date, date?: Date) {
  const newDate = date ? date : new Date();
  const startTime = startDate.getTime();
  const totalDuration = endDate.getTime() - startTime;
  return (newDate.getTime() - startTime) / totalDuration;
}

function getDateMarker(
  dateMarkerPropsIn: TimelineDateMarkerProps,
  startDate: Date,
  endDate: Date
): DateMarkerProps {
  const percentage = getPercentageFromDate(
    startDate,
    endDate,
    dateMarkerPropsIn.date
  );
  const marker = dateMarkerPropsIn.dateMarker ? (
    dateMarkerPropsIn.dateMarker
  ) : (
    <span className="date-marker-default"></span>
  );
  return { datePercentage: percentage, dateMarker: marker };
}

function markDateInTimelineRange(
  dateMarkerProps?: TimelineDateMarkerProps,
  startDate?: Date,
  endDate?: Date
): boolean {
  if (dateMarkerProps && startDate && endDate) {
    const inDate = dateMarkerProps.date ? dateMarkerProps.date : new Date();
    if (
      inDate.getTime() >= startDate.getTime() &&
      inDate.getTime() <= endDate.getTime()
    )
      return true;
  }
  return false;
}

/** @internal */
export function RailMarkers({
  showToolTip,
  percent,
  tooltipText,
  markDate,
}: {
  showToolTip: boolean;
  percent: number;
  tooltipText: string;
  markDate?: DateMarkerProps;
}) {
  return (
    <div className="components-timeline-rail-marker-container">
      {showToolTip && (
        <div
          className="components-timeline-tooltip"
          style={{ left: `${Math.round(percent * 100)}% ` }}
        >
          <span className="tooltip-text">{tooltipText}</span>
        </div>
      )}
      {markDate && (
        <div
          className="components-timeline-date-marker"
          data-testid="test-date-marker"
          style={{ left: `${Math.round(markDate.datePercentage * 100)}% ` }}
        >
          {markDate.dateMarker}
        </div>
      )}
    </div>
  );
}

/**
 * Custom Timeline Thumb
 * @internal
 */
export function CustomThumb() {
  return (
    <div className="scrubber-handle">
      <div />
      <div />
      <div />
    </div>
  );
}

/**
 * @internal
 */
export function useFocusedThumb(sliderContainer: HTMLDivElement | undefined) {
  const [thumbElement, setThumbElement] = React.useState<HTMLDivElement>();

  React.useLayoutEffect(() => {
    if (!sliderContainer) return;
    const element = sliderContainer.querySelector(".components-timeline-thumb");
    if (!element) return;
    setThumbElement(element as HTMLDivElement);
  }, [sliderContainer, thumbElement]);

  const [thumbHasFocus, setThumbHasFocus] = React.useState(false);

  const handleThumbFocus = React.useCallback(() => {
    setThumbHasFocus(true);
  }, []);

  const handleThumbBlur = React.useCallback(() => {
    setThumbHasFocus(false);
  }, []);

  useEventListener("focus", handleThumbFocus, thumbElement);
  useEventListener("blur", handleThumbBlur, thumbElement);
  return thumbHasFocus;
}

/** Properties for Scrubber/Slider used on timeline control
 * @internal
 */
// eslint-disable-next-line deprecation/deprecation
export interface ScrubberProps extends CommonProps {
  currentDuration: number;
  totalDuration: number;
  isPlaying: boolean;
  startDate?: Date;
  endDate?: Date;
  showTime?: boolean;
  onChange?: (values: ReadonlyArray<number>) => void;
  onUpdate?: (values: ReadonlyArray<number>) => void;
  timeZoneOffset?: number;
  markDate?: TimelineDateMarkerProps;
}

/** Properties for marking current date in RailMarkers
 * @internal
 */
interface DateMarkerProps {
  datePercentage: number;
  dateMarker?: React.ReactNode;
}
/** Scrubber/Slider for timeline control
 * @internal
 */
export function Scrubber(props: ScrubberProps) {
  const {
    startDate,
    endDate,
    showTime,
    isPlaying,
    totalDuration,
    timeZoneOffset,
    currentDuration,
    className,
    onChange,
    onUpdate,
  } = props;

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

  const thumbHasFocus = useFocusedThumb(sliderContainer ?? undefined);

  const tickLabel = React.useMemo(() => {
    const showTip = isPlaying || showRailTooltip || thumbHasFocus;
    const percent =
      isPlaying || thumbHasFocus
        ? currentDuration / totalDuration
        : pointerPercent;
    const markDateInRange = markDateInTimelineRange(
      props.markDate,
      startDate,
      endDate
    );
    const currentDateMarker =
      props.markDate && markDateInRange && startDate && endDate
        ? getDateMarker(props.markDate, startDate, endDate)
        : undefined;
    const tooltipText = generateToolTipText(
      !!showTime,
      percent,
      0,
      totalDuration,
      startDate,
      endDate,
      timeZoneOffset
    );
    return (
      <RailMarkers
        showToolTip={showTip}
        percent={percent}
        tooltipText={tooltipText}
        markDate={currentDateMarker}
      />
    );
  }, [
    isPlaying,
    showRailTooltip,
    currentDuration,
    totalDuration,
    pointerPercent,
    startDate,
    endDate,
    timeZoneOffset,
    showTime,
    thumbHasFocus,
    props.markDate,
  ]);

  return (
    <Slider
      ref={setSliderContainer}
      className={className}
      step={1}
      min={0}
      max={totalDuration}
      minLabel=""
      maxLabel=""
      onUpdate={onUpdate}
      onChange={onChange}
      values={[currentDuration]}
      tooltipProps={tooltipProps}
      thumbProps={() => ({
        children: <CustomThumb />,
        className: "components-timeline-thumb",
      })}
      tickLabels={tickLabel}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    />
  );
}
