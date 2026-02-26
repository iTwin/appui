import { r as reactExports, j as jsxRuntimeExports, P as Popover, V as VisuallyHidden, q as Tooltip, I as IconButton, c as classnames } from "./iframe-DNdoMX4Q.js";
import { U as UiIModelComponents, I as InitializerDecorator, A as AppUiDecorator } from "./Decorators-DePPLJKx.js";
import { aq as ColorDef, ar as ColorByName, as as UiComponents, at as adjustDateToTimezone, au as Flex, av as DatePicker, a2 as Label, aw as Select, ax as SvgLoop, ay as SvgSettings, az as ColorPicker, R as Text, aA as ColorBuilder, aB as ColorInputPanel, aC as ColorPalette, aD as SvgCalendar, aE as Slider, i as Icon, aF as SvgMoon, aG as SvgSun, aH as BaseSolarDataProvider } from "./appui-react-glMK-yaN.js";
import { B as Button } from "./Key.enum-YmMvjtrc.js";
import { P as PlayButton, u as useTranslation } from "./PlayButton-DQg2VvZa.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-7SU87-Ux.js";
import "./index-C9p5eh_j.js";
const msPerMinute = 1e3 * 60;
const msPerHour = msPerMinute * 60;
const defaultPlaybackDuration = 40 * 1e3;
const offset = 6;
function Timeline(props) {
  const {
    formatTick,
    formatTime,
    onChange,
    onUpdate,
    dayStartMs,
    sunSetOffsetMs,
    sunRiseOffsetMs,
    currentTimeOffsetMs
  } = props;
  const tooltipContent = formatTime(dayStartMs + currentTimeOffsetMs);
  const className = classnames(
    "solar-timeline",
    props.className,
    formatTick && "showticks"
  );
  const sunRiseStr = formatTime(dayStartMs + sunRiseOffsetMs);
  const sunSetStr = formatTime(dayStartMs + sunSetOffsetMs);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(VisuallyHidden, { children: "Solar timeline" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Slider,
      {
        thumbProps: () => ({ "aria-labelledby": "timeline" }),
        step: msPerMinute,
        min: sunRiseOffsetMs,
        max: sunSetOffsetMs,
        minLabel: /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: sunRiseStr, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgSun, {}) }) }),
        maxLabel: /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: sunSetStr, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgMoon, {}) }) }),
        onUpdate,
        onChange,
        values: [currentTimeOffsetMs],
        tooltipProps: () => ({
          content: tooltipContent
        })
      }
    )
  ] });
}
class SolarTimeline extends reactExports.PureComponent {
  _requestFrame = 0;
  _unmounted = false;
  _timeLastCycle = 0;
  _totalPlayTime = 0;
  _presetColors = [
    ColorDef.create(ColorByName.grey),
    ColorDef.create(ColorByName.lightGrey),
    ColorDef.create(ColorByName.darkGrey),
    ColorDef.create(ColorByName.lightBlue),
    ColorDef.create(ColorByName.lightGreen),
    ColorDef.create(ColorByName.darkGreen),
    ColorDef.create(ColorByName.tan),
    ColorDef.create(ColorByName.darkBrown)
  ];
  _speeds = [1, 2, 3, 4, 5, 6];
  constructor(props) {
    super(props);
    const dayStartMs = this.props.dataProvider.dayStartMs;
    const sunRiseOffsetMs = this.props.dataProvider.sunrise.getTime() - dayStartMs;
    const sunSetOffsetMs = this.props.dataProvider.sunset.getTime() - dayStartMs;
    const sunDeltaMs = sunSetOffsetMs - sunRiseOffsetMs;
    const sunOffsetMs = this.props.dataProvider.timeOfDay.getTime() - dayStartMs;
    const currentTimeOffsetMs = this.ensureRange(
      sunOffsetMs,
      sunRiseOffsetMs,
      sunSetOffsetMs
    );
    const shadowColor = this.props.dataProvider.shadowColor;
    const duration = this.props.duration ? this.props.duration : defaultPlaybackDuration;
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
      adjustedDuration
    };
  }
  componentWillUnmount() {
    window.cancelAnimationFrame(this._requestFrame);
    this._unmounted = true;
  }
  // recursively update the animation until we hit the end or the pause button is clicked
  _updateAnimation = (_timestamp) => {
    if (!this.state.isPlaying || this._unmounted) {
      window.cancelAnimationFrame(this._requestFrame);
      return;
    }
    const currentTime = (/* @__PURE__ */ new Date()).getTime();
    this._totalPlayTime += currentTime - this._timeLastCycle;
    this._timeLastCycle = currentTime;
    let percentComplete = this._totalPlayTime / this.state.adjustedDuration;
    if (percentComplete > 1) percentComplete = 1;
    let newPlayingState = true;
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
  _play(sunTimeMs) {
    this._timeLastCycle = (/* @__PURE__ */ new Date()).getTime();
    this.setState({ isPlaying: true, currentTimeOffsetMs: sunTimeMs }, () => {
      this._requestFrame = window.requestAnimationFrame(this._updateAnimation);
      if (this.props.onPlayPause) this.props.onPlayPause(true);
    });
  }
  // user clicked pause button
  _onPause = () => {
    if (!this.state.isPlaying) return;
    const currentTime = (/* @__PURE__ */ new Date()).getTime();
    this._totalPlayTime += currentTime - this._timeLastCycle;
    window.cancelAnimationFrame(this._requestFrame);
    this.setState({ isPlaying: false });
    if (this.props.onPlayPause) this.props.onPlayPause(false);
  };
  // user clicked play button
  _onPlay = () => {
    if (this.state.isPlaying) return;
    if (this.state.currentTimeOffsetMs >= this.state.sunSetOffsetMs || this.state.currentTimeOffsetMs <= this.state.sunRiseOffsetMs) {
      this._totalPlayTime = 0;
      this._play(this.state.sunRiseOffsetMs);
    } else {
      this._play(this.state.currentTimeOffsetMs);
    }
  };
  setPlaybackTimeBySunTime(sunOffsetMs, sunRiseOffsetMs, sunDeltaMs, adjustedDuration) {
    this._totalPlayTime = (sunOffsetMs - sunRiseOffsetMs) / sunDeltaMs * (adjustedDuration ? adjustedDuration : this.state.adjustedDuration);
  }
  _onDateChange = (newDate) => {
    this.props.dataProvider.setDateAndTime(newDate);
    const dayStartMs = this.props.dataProvider.dayStartMs;
    const sunRiseOffsetMs = this.props.dataProvider.sunrise.getTime() - dayStartMs;
    const sunSetOffsetMs = this.props.dataProvider.sunset.getTime() - dayStartMs;
    const sunDeltaMs = sunSetOffsetMs - sunRiseOffsetMs;
    const newHours = newDate.getHours();
    const newMinutes = newDate.getMinutes();
    const newSunTime = newHours * msPerHour + newMinutes * msPerMinute;
    const dateWithNewTime = new Date(dayStartMs + newSunTime);
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
    this._timeLastCycle = (/* @__PURE__ */ new Date()).getTime();
    this.props.dataProvider.onTimeChanged?.(dateWithNewTime);
    this.setState({
      dayStartMs,
      sunRiseOffsetMs,
      sunSetOffsetMs,
      currentTimeOffsetMs,
      sunDeltaMs,
      isDateOpened: false
    });
  };
  _onCloseSettingsPopup = () => {
    this.setState({ isSettingsOpened: false });
  };
  _onOpenSettingsPopup = () => {
    this.setState((prevState) => ({
      isSettingsOpened: !prevState.isSettingsOpened
    }));
  };
  ensureRange(value, min, max) {
    return Math.max(Math.min(value, max), min);
  }
  processSunTimeChange(sunTime) {
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
      const currentTime = (/* @__PURE__ */ new Date()).getTime();
      this._timeLastCycle = currentTime;
      const percentComplete = (currentTimeOffsetMs - this.state.sunRiseOffsetMs) / this.state.sunDeltaMs;
      this._totalPlayTime = percentComplete * this.state.adjustedDuration;
    });
  }
  _onUpdate = (values) => {
    if (!this.state.isPlaying) this.processSunTimeChange(values[0]);
  };
  _onChange = (values) => {
    if (!this.state.isPlaying) this.processSunTimeChange(values[0]);
  };
  _onSpeedChange = (value) => {
    const adjustedDuration = this.state.duration / value;
    this.setState({ speed: value, adjustedDuration });
  };
  _onToggleLoop = () => {
    this.setState((prevState) => ({ loop: !prevState.loop }));
  };
  _formatTime = (ms) => {
    const date = new Date(ms);
    const amLabel = UiComponents.translate("time.am");
    const pmLabel = UiComponents.translate("time.pm");
    const localTime = adjustDateToTimezone(
      date,
      this.props.dataProvider.timeZoneOffset * 60
    );
    let hours = localTime.getHours();
    const minutes = date.getMinutes();
    const abbrev = hours < 12 ? amLabel : hours === 24 ? amLabel : pmLabel;
    hours = hours > 12 ? hours - 12 : hours;
    const hoursStr = hours.toLocaleString(void 0, {
      minimumIntegerDigits: 2
    });
    const minutesStr = minutes.toLocaleString(void 0, {
      minimumIntegerDigits: 2
    });
    return `${hoursStr}:${minutesStr} ${abbrev}`;
  };
  getLocalTime(ticks) {
    const projectTime = new Date(ticks);
    return adjustDateToTimezone(
      projectTime,
      this.props.dataProvider.timeZoneOffset * 60
    );
  }
  render() {
    const { dataProvider } = this.props;
    const {
      speed: currentSpeed,
      loop,
      currentTimeOffsetMs,
      sunRiseOffsetMs,
      sunSetOffsetMs
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
      UiComponents.translate("month.short.december")
    ];
    const localTime = this.getLocalTime(
      this.state.dayStartMs + this.state.currentTimeOffsetMs
    );
    const formattedTime = this._formatTime(
      dataProvider.dayStartMs + currentTimeOffsetMs
    );
    const formattedDate = `${months[localTime.getMonth()]}, ${localTime.getDate()}`;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "solar-timeline-wrapper", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { flexWrap: "wrap", gap: "none", className: "solar-timeline-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PlayButton,
          {
            isPlaying: this.state.isPlaying,
            onPlay: this._onPlay,
            onPause: this._onPause
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Popover,
          {
            content: /* @__PURE__ */ jsxRuntimeExports.jsx(
              DatePicker,
              {
                date: localTime,
                onChange: this._onDateChange,
                showTime: true,
                use12Hours: true
              }
            ),
            visible: this.state.isDateOpened,
            onVisibleChange: (isDateOpened) => {
              this.setState({ isDateOpened });
            },
            placement: "top",
            middleware: {
              offset
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              CalendarButton,
              {
                onClick: () => {
                  const isDateOpened = !this.state.isDateOpened;
                  this.setState({ isDateOpened });
                },
                children: [
                  formattedDate,
                  " @ ",
                  formattedTime
                ]
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Timeline,
        {
          dayStartMs: dataProvider.dayStartMs,
          sunSetOffsetMs,
          sunRiseOffsetMs,
          currentTimeOffsetMs,
          onChange: this._onChange,
          onUpdate: this._onUpdate,
          formatTime: this._formatTime,
          isPlaying: this.state.isPlaying
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Flex,
        {
          justifyContent: "flex-end",
          flexWrap: "wrap",
          gap: "none",
          className: "solar-timeline-end",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(VisuallyHidden, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "speed", children: "Timeline speed" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                content: UiIModelComponents.translate("solartimeline.speed"),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Select,
                  {
                    native: true,
                    styleType: "borderless",
                    triggerProps: {
                      name: "speed"
                    },
                    onChange: (newValue) => this._onSpeedChange(Number(newValue)),
                    value: currentSpeed.toString(),
                    options: this._speeds.map((speed) => ({
                      value: speed.toString(),
                      label: `${speed}x`
                    }))
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              IconButton,
              {
                styleType: "borderless",
                label: UiIModelComponents.translate("timeline.repeat"),
                onClick: this._onToggleLoop,
                isActive: loop,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgLoop, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Popover,
              {
                content: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  ColorPicker,
                  {
                    selectedColor: this.state.shadowColor.colors,
                    onChangeComplete: (color) => {
                      const colorDef = ColorDef.create(color.toTbgr());
                      this.setState(
                        { shadowColor: colorDef },
                        () => this.props.dataProvider.shadowColor = colorDef
                      );
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { variant: "title", as: "h2", style: { textAlign: "center" }, children: UiIModelComponents.translate("solarsettings.shadowcolor") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ColorBuilder, {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ColorInputPanel, { defaultColorFormat: "hsl" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ColorPalette,
                        {
                          colors: this._presetColors.map((color) => color.colors)
                        }
                      )
                    ]
                  }
                ),
                placement: "top",
                middleware: {
                  offset
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  IconButton,
                  {
                    styleType: "borderless",
                    "data-testid": "shadow-settings-button",
                    label: UiIModelComponents.translate("timeline.settings"),
                    onClick: this._onOpenSettingsPopup,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgSettings, {})
                  }
                )
              }
            )
          ]
        }
      )
    ] });
  }
}
const CalendarButton = reactExports.forwardRef(
  function CalendarButton2({ children, onClick }, ref) {
    const { translate } = useTranslation();
    const tooltip = translate("solartimeline.dateTime");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: tooltip, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        styleType: "borderless",
        startIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCalendar, {}),
        "data-testid": "solar-date-time-button",
        title: tooltip,
        onClick,
        ref,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "solar-timeline-date-time", children })
      }
    ) });
  }
);
SolarTimeline.__docgenInfo = { "description": "Solar Timeline\n@alpha", "methods": [{ "name": "getLocalTime", "docblock": null, "modifiers": [], "params": [{ "name": "ticks", "optional": false, "type": { "name": "number" } }], "returns": { "type": { "name": "Date" } } }], "displayName": "SolarTimeline", "props": { "dataProvider": { "required": true, "tsType": { "name": "SolarDataProvider" }, "description": "" }, "onPlayPause": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(playing: boolean) => void", "signature": { "arguments": [{ "type": { "name": "boolean" }, "name": "playing" }], "return": { "name": "void" } } }, "description": "" }, "duration": { "required": false, "tsType": { "name": "number" }, "description": "" }, "speed": { "required": false, "tsType": { "name": "number" }, "description": "" } } };
const AlignComponent = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    paddingInline: "10%",
    paddingBlock: "2em",
    boxSizing: "border-box"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) });
};
const PageLayout = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    height: "100vh"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) });
};
const meta = {
  title: "Components/SolarTimeline",
  component: SolarTimeline,
  tags: ["autodocs"],
  decorators: [AlignComponent, InitializerDecorator, AppUiDecorator, PageLayout],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "background-backdrop"
    }
  }
};
const Basic = {
  args: {
    dataProvider: new BaseSolarDataProvider()
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...Basic.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    dataProvider: new BaseSolarDataProvider()\n  }\n}",
      ...Basic.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
