/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import classnames from "classnames";
import { CommonProps } from "@bentley/ui-core";
import { Slider, Rail, Handles, Ticks, SliderItem } from "react-compound-slider";
import { Milestone } from "./interfaces";
import "./Timeline.scss";

const formatDate = (value: number) => {
  let date = new Date();
  if (value)
    date = new Date(value);
  return date.toLocaleDateString();
};

// *******************************************************
// NEEDLE
// *******************************************************
interface NeedleProps {
  startDate: Date;
  endDate: Date;
  selectedDate: Date;
}

function Needle({ startDate, endDate, selectedDate }: NeedleProps) {
  const percent = (selectedDate.getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime()) * 100;
  return (
    <div className="needle" style={{ left: `${percent}%` }} />
  );
}

// *******************************************************
// TOOLTIP RAIL
// *******************************************************
interface TooltipRailProps {
  activeHandleID: string;
  getRailProps: (props: object) => object;
  getEventData: (e: Event) => object;
}

interface TooltipRailState {
  value: number | null;
  percent: number | null;
}

class TooltipRail extends React.Component<TooltipRailProps, TooltipRailState> {

  public static defaultProps = {
    disabled: false,
  };

  constructor(props: TooltipRailProps) {
    super(props);

    this.state = { value: null, percent: null };
  }

  private _onMouseEnter = () => {
    document.addEventListener("mousemove", this._onMouseMove);
  }

  private _onMouseLeave = () => {
    this.setState({ value: null, percent: null });
    document.removeEventListener("mousemove", this._onMouseMove);
  }

  private _onMouseMove = (e: Event) => {
    const { activeHandleID, getEventData } = this.props;

    if (activeHandleID) {
      this.setState({ value: null, percent: null });
    } else {
      this.setState(getEventData(e));
    }
  }

  public render() {
    const { value, percent } = this.state;
    const { activeHandleID, getRailProps } = this.props;

    return (
      <>
        {!activeHandleID && value ? (
          <div className="tooltip-rail" style={{ left: `${percent}%` }}>
            <div className="tooltip">
              <span className="tooltip-text">{formatDate(value)}</span>
            </div>
          </div>
        ) : null}
        <div
          className="rail"
          {...getRailProps({
            onMouseEnter: this._onMouseEnter,
            onMouseLeave: this._onMouseLeave,
          })}
        />
        <div className="rail-center" />
      </>
    );
  }
}

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
interface HandleProps {
  key: string;
  handle: SliderItem;
  isActive: boolean;
  disabled?: boolean;
  domain: number[];
  milestone: Milestone;
  getHandleProps: (id: string, config: object) => object;
}

interface HandleState {
  mouseOver: boolean;
}

class Handle extends React.Component<HandleProps, HandleState> {
  public static defaultProps = {
    disabled: false,
  };

  constructor(props: HandleProps) {
    super(props);

    this.state = { mouseOver: false };
  }

  private _onMouseEnter = () => {
    this.setState({ mouseOver: true });
  }

  private _onMouseLeave = () => {
    this.setState({ mouseOver: false });
  }

  public render() {
    const {
      domain: [min, max],
      handle: { id, value, percent },
      isActive,
      disabled,
      getHandleProps,
      milestone,
    } = this.props;
    const { mouseOver } = this.state;
    return (
      <>
        {(mouseOver || isActive) && !disabled ? (
          <div className="tooltip-rail" style={{ left: `${percent}%` }}>
            <div className="tooltip">
              <span className="tooltip-text">{formatDate(value)}</span>
            </div>
          </div>
        ) : null}
        <div
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          className="handle"
          style={{ left: `${percent}%` }}
          {...getHandleProps(id, {
            onMouseEnter: this._onMouseEnter,
            onMouseLeave: this._onMouseLeave,
          })} >
          <span>{milestone.label}</span>
        </div>
      </>
    );
  }
}

// *******************************************************
// TICK COMPONENT
// *******************************************************
interface TickProps {
  tick: SliderItem;
  count: number;
  index: number;
}

function Tick({ tick, count, index }: TickProps) {
  if (index === 0) {
    return (
      <span className="tick-label start">Start</span>
    );
  } else if (index === (count - 1)) {
    return (
      <span className="tick-label end">End</span>
    );
  } else {
    return (
      <>
        <div className="tick-line" style={{ left: `${tick.percent}%` }} />
        <span className="tick-label tick" style={{ left: `${tick.percent}%` }}>{index}yr</span>
      </>
    );
  }
}

// {formatDate(tick.value)}

/** Properties used to show milestone timeline in timeline player control
 * @internal
 */
export interface TimelineProps extends CommonProps {
  startDate: Date;
  endDate: Date;
  selectedDate: Date;
  milestones?: Milestone[];
  isPlaying: boolean;
  onChange?: (values: ReadonlyArray<number>) => void;
  onUpdate?: (values: ReadonlyArray<number>) => void;
  onSlideStart?: () => void;
}

interface TimelineState {
  ticks: number[];
}

/** Component used to show milestone timeline in timeline player control
 * @internal
 */
export class Timeline extends React.Component<TimelineProps, TimelineState> {

  constructor(props: TimelineProps) {
    super(props);

    if (props.endDate && props.startDate) {
      const quarter = (props.endDate.getTime() - props.startDate.getTime()) / 4;

      // compute the ticks
      const ticks: number[] = [];
      ticks.push(props.startDate.getTime());
      // for (let i = this.props.startDate.getTime(); i <= (this.props.endDate.getTime()); i += oneDay) {
      for (let i = 1; i < 4; i++) {
        const newDate = props.startDate.getTime() + (quarter * i);
        ticks.push(newDate);
      }
      ticks.push(props.endDate.getTime());
      this.state = { ticks };
    }
  }

  private _milestones = (): number[] => {
    const { milestones } = this.props;
    const handles: number[] = [];

    if (milestones) {
      milestones.forEach((milestone: Milestone) => handles.push(milestone.date.getTime()));
    }

    return handles;
  }

  private _onSliderStart = () => {
  }

  public render() {
    const { startDate, endDate, selectedDate, milestones, onChange, onUpdate } = this.props;
    const domain = [startDate.getTime(), endDate.getTime()];

    return (
      <div className={classnames("timeline", this.props.className)}>
        <Slider
          mode={1}
          step={1}
          domain={domain}
          rootStyle={{ position: "relative", height: "100%", margin: "0 60px" }}
          onUpdate={onUpdate}
          onChange={onChange}
          onSlideStart={this._onSliderStart}
          values={this._milestones()}
        >
          <Rail>
            {(railProps) => <TooltipRail {...railProps} />}
          </Rail>
          <Handles>
            {({ handles, activeHandleID, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map((handle: SliderItem, index: number) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    isActive={handle.id === activeHandleID}
                    milestone={milestones![index]}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Ticks values={this.state.ticks}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map((tick: any, index: number) => (
                  <Tick
                    key={tick.id}
                    tick={tick}
                    count={ticks.length}
                    index={index} />
                ))}
              </div>
            )}
          </Ticks>
          <Needle startDate={startDate} endDate={endDate} selectedDate={selectedDate} />
        </Slider>
      </div>
    );
  }
}
