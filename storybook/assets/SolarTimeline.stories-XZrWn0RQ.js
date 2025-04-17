var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-f7WWSPSb.js";
import { U as UiIModelComponents, I as InitializerDecorator, A as AppUiDecorator } from "./Decorators-Dl0WF0ZJ.js";
import { i as Tooltip, P as Popover, V as VisuallyHidden, I as IconButton, c as cx } from "./SvgCloseSmall-QhdYiNU4.js";
import { r as reactExports } from "./index-R26Bfrts.js";
import { ak as SvgCalendar, al as ColorDef, am as ColorByName, an as UiComponents, ao as adjustDateToTimezone, ap as Flex, aq as DatePicker, a9 as Label, ar as Select, as as SvgLoop, at as ColorPicker, ae as Text, au as ColorBuilder, av as ColorInputPanel, aw as ColorPalette, ax as SvgSettings, ay as Slider, o as Icon, az as SvgSun, aA as SvgMoon, aB as BaseSolarDataProvider } from "./appui-react-CmTEbVJu.js";
import { B as Button } from "./Dialog-DRJza1Fj.js";
import { u as useTranslation, P as PlayButton } from "./PlayButton-BJoLeB6n.js";
import "./index-CHBBkG1-.js";
import "./iframe-B_Ok6LzO.js";
import "../sb-preview/runtime.js";
import "./_commonjs-dynamic-modules-lq-lihFa.js";
import "./index-oY8aizO2.js";
import "./client-DRUEp2wC.js";
import "./debounce-CTTNlY27.js";
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
  const className = cx(
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
  constructor(props) {
    super(props);
    this._requestFrame = 0;
    this._unmounted = false;
    this._timeLastCycle = 0;
    this._totalPlayTime = 0;
    this._presetColors = [
      ColorDef.create(ColorByName.grey),
      ColorDef.create(ColorByName.lightGrey),
      ColorDef.create(ColorByName.darkGrey),
      ColorDef.create(ColorByName.lightBlue),
      ColorDef.create(ColorByName.lightGreen),
      ColorDef.create(ColorByName.darkGreen),
      ColorDef.create(ColorByName.tan),
      ColorDef.create(ColorByName.darkBrown)
    ];
    this._speeds = [1, 2, 3, 4, 5, 6];
    this._updateAnimation = (_timestamp) => {
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
    this._onPause = () => {
      if (!this.state.isPlaying) return;
      const currentTime = (/* @__PURE__ */ new Date()).getTime();
      this._totalPlayTime += currentTime - this._timeLastCycle;
      window.cancelAnimationFrame(this._requestFrame);
      this.setState({ isPlaying: false });
      if (this.props.onPlayPause) this.props.onPlayPause(false);
    };
    this._onPlay = () => {
      if (this.state.isPlaying) return;
      if (this.state.currentTimeOffsetMs >= this.state.sunSetOffsetMs || this.state.currentTimeOffsetMs <= this.state.sunRiseOffsetMs) {
        this._totalPlayTime = 0;
        this._play(this.state.sunRiseOffsetMs);
      } else {
        this._play(this.state.currentTimeOffsetMs);
      }
    };
    this._onDateChange = (newDate) => {
      var _a2, _b2;
      this.props.dataProvider.setDateAndTime(newDate);
      const dayStartMs2 = this.props.dataProvider.dayStartMs;
      const sunRiseOffsetMs2 = this.props.dataProvider.sunrise.getTime() - dayStartMs2;
      const sunSetOffsetMs2 = this.props.dataProvider.sunset.getTime() - dayStartMs2;
      const sunDeltaMs2 = sunSetOffsetMs2 - sunRiseOffsetMs2;
      const newHours = newDate.getHours();
      const newMinutes = newDate.getMinutes();
      const newSunTime = newHours * msPerHour + newMinutes * msPerMinute;
      const dateWithNewTime = new Date(dayStartMs2 + newSunTime);
      const currentTimeOffsetMs2 = this.ensureRange(
        newSunTime,
        sunRiseOffsetMs2,
        sunSetOffsetMs2
      );
      this.setPlaybackTimeBySunTime(
        currentTimeOffsetMs2,
        sunRiseOffsetMs2,
        sunDeltaMs2
      );
      this._timeLastCycle = (/* @__PURE__ */ new Date()).getTime();
      (_b2 = (_a2 = this.props.dataProvider).onTimeChanged) == null ? void 0 : _b2.call(_a2, dateWithNewTime);
      this.setState({
        dayStartMs: dayStartMs2,
        sunRiseOffsetMs: sunRiseOffsetMs2,
        sunSetOffsetMs: sunSetOffsetMs2,
        currentTimeOffsetMs: currentTimeOffsetMs2,
        sunDeltaMs: sunDeltaMs2,
        isDateOpened: false
      });
    };
    this._onCloseSettingsPopup = () => {
      this.setState({ isSettingsOpened: false });
    };
    this._onOpenSettingsPopup = () => {
      this.setState((prevState) => ({
        isSettingsOpened: !prevState.isSettingsOpened
      }));
    };
    this._onUpdate = (values) => {
      if (!this.state.isPlaying) this.processSunTimeChange(values[0]);
    };
    this._onChange = (values) => {
      if (!this.state.isPlaying) this.processSunTimeChange(values[0]);
    };
    this._onSpeedChange = (value) => {
      const adjustedDuration2 = this.state.duration / value;
      this.setState({ speed: value, adjustedDuration: adjustedDuration2 });
    };
    this._onToggleLoop = () => {
      this.setState((prevState) => ({ loop: !prevState.loop }));
    };
    this._formatTime = (ms) => {
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
  _play(sunTimeMs) {
    this._timeLastCycle = (/* @__PURE__ */ new Date()).getTime();
    this.setState({ isPlaying: true, currentTimeOffsetMs: sunTimeMs }, () => {
      this._requestFrame = window.requestAnimationFrame(this._updateAnimation);
      if (this.props.onPlayPause) this.props.onPlayPause(true);
    });
  }
  setPlaybackTimeBySunTime(sunOffsetMs, sunRiseOffsetMs, sunDeltaMs, adjustedDuration) {
    this._totalPlayTime = (sunOffsetMs - sunRiseOffsetMs) / sunDeltaMs * (adjustedDuration ? adjustedDuration : this.state.adjustedDuration);
  }
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
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  args: {\n    dataProvider: new BaseSolarDataProvider()\n  }\n}",
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
