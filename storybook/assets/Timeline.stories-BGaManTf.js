var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
import { j as jsxRuntimeExports } from "./jsx-runtime-_iMjpMZ4.js";
import { r as reactExports } from "./index-DlkhCVTf.js";
import { K as Key_enum, I as Input, c as classnames, aF as useEventListener, a1 as Slider, aG as toDateString, aH as toTimeString, aI as UiAdmin, aJ as DropdownMenu, aK as MenuItem, aL as SvgCheckmark, aM as MenuDivider, O as IconButton, aN as SvgMoreVertical } from "./DefaultToolSettingsProvider-Do4qbEAN.js";
import "./index-Cm_5MPU1.js";
import { P as PlayButton, u as useTranslation } from "./PlayButton-YsCxZLtp.js";
import { a as action } from "./chunk-WFFRPTHA-B_pzO8uN.js";
import { I as InitializerDecorator, A as AppUiDecorator } from "./Decorators-CXFXT6hr.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./getPrototypeOf-BmmMfuHC.js";
import "./iframe-kR_u1aqe.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
import "./preview-errors-C1TokqVJ.js";
import "./index-BdOSk9or.js";
class InlineEdit extends reactExports.Component {
  constructor(props) {
    super(props);
    this._inputRef = reactExports.createRef();
    this._onBlur = (event) => {
      this._sendChange(event.target.value);
    };
    this._onFocus = (event) => {
      event.target.select();
    };
    this._onKeyDown = (event) => {
      switch (event.key) {
        case Key_enum.Key.Escape.valueOf():
          this.setState(
            (prevState) => ({ value: prevState.originalValue }),
            () => this._inputRef.current.select()
          );
          break;
        case Key_enum.Key.Enter.valueOf():
          this._sendChange(this.state.value);
          break;
      }
    };
    this._onChange = (event) => {
      this.setState({ value: event.target.value });
    };
    this.state = {
      value: this.props.defaultValue,
      originalValue: this.props.defaultValue
    };
  }
  /** @internal */
  componentDidUpdate(prevProps, _prevState) {
    if (prevProps.defaultValue !== this.props.defaultValue) {
      this.setState((_, props) => {
        return { value: props.defaultValue, originalValue: props.defaultValue };
      });
    }
  }
  _sendChange(value) {
    if (this.props.onChange)
      this.props.onChange(value);
  }
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        "data-testid": "timeline-duration-edit-input",
        className: classnames("inline-edit-input", this.props.className),
        style: this.props.style,
        ref: this._inputRef,
        type: "text",
        value: this.state.value,
        size: "small",
        onFocus: this._onFocus,
        onBlur: this._onBlur,
        onKeyDown: this._onKeyDown,
        onChange: this._onChange
      }
    );
  }
}
try {
  InlineEdit.displayName = "InlineEdit";
  InlineEdit.__docgenInfo = { "description": "Duration Inline Editor", "displayName": "InlineEdit", "props": { "defaultValue": { "defaultValue": null, "description": "", "name": "defaultValue", "required": true, "type": { "name": "string" } }, "onChange": { "defaultValue": null, "description": "", "name": "onChange", "required": false, "type": { "name": "((value: string) => void)" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
var TimelinePausePlayAction = /* @__PURE__ */ ((TimelinePausePlayAction2) => {
  TimelinePausePlayAction2[TimelinePausePlayAction2["Toggle"] = 0] = "Toggle";
  TimelinePausePlayAction2[TimelinePausePlayAction2["Pause"] = 1] = "Pause";
  TimelinePausePlayAction2[TimelinePausePlayAction2["Play"] = 2] = "Play";
  return TimelinePausePlayAction2;
})(TimelinePausePlayAction || {});
function getPercentageOfRectangle(rect, pointer) {
  const position = Math.min(rect.right, Math.max(rect.left, pointer));
  return (position - rect.left) / rect.width;
}
const formatDuration = (value) => {
  const addZero = (i) => {
    return i < 10 ? `0${i}` : i;
  };
  const date = new Date(value);
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return `${addZero(minutes)}:${addZero(seconds)}`;
};
const formatDate = (startDate, endDate, fraction, timeZoneOffset) => {
  const delta = (endDate.getTime() - startDate.getTime()) * fraction;
  const date = new Date(startDate.getTime() + delta);
  return toDateString(date, timeZoneOffset);
};
const formatTime = (startDate, endDate, fraction, timeZoneOffset) => {
  const delta = (endDate.getTime() - startDate.getTime()) * fraction;
  const date = new Date(startDate.getTime() + delta);
  return ` ${toTimeString(date, timeZoneOffset)}`;
};
function generateToolTipText(showTime, percent, min, max, startDate, endDate, timeZoneOffset = 0) {
  if (startDate && endDate)
    return `${formatDate(startDate, endDate, percent, timeZoneOffset)}${showTime ? formatTime(startDate, endDate, percent, timeZoneOffset) : ""} `;
  const val = Math.round(min + (max - min) * percent);
  return formatDuration(val);
}
function getPercentageFromDate(startDate, endDate, date) {
  const newDate = date ? date : /* @__PURE__ */ new Date();
  const startTime = startDate.getTime();
  const totalDuration = endDate.getTime() - startTime;
  return (newDate.getTime() - startTime) / totalDuration;
}
function getDateMarker(dateMarkerPropsIn, startDate, endDate) {
  const percentage = getPercentageFromDate(
    startDate,
    endDate,
    dateMarkerPropsIn.date
  );
  const marker = dateMarkerPropsIn.dateMarker ? dateMarkerPropsIn.dateMarker : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "date-marker-default" });
  return { datePercentage: percentage, dateMarker: marker };
}
function markDateInTimelineRange(dateMarkerProps, startDate, endDate) {
  if (dateMarkerProps && startDate && endDate) {
    const inDate = dateMarkerProps.date ? dateMarkerProps.date : /* @__PURE__ */ new Date();
    if (inDate.getTime() >= startDate.getTime() && inDate.getTime() <= endDate.getTime())
      return true;
  }
  return false;
}
function RailMarkers({
  showToolTip,
  percent,
  tooltipText,
  markDate
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "components-timeline-rail-marker-container", children: [
    showToolTip && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "components-timeline-tooltip",
        style: { left: `${Math.round(percent * 100)}% ` },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-text", children: tooltipText })
      }
    ),
    markDate && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "components-timeline-date-marker",
        "data-testid": "test-date-marker",
        style: { left: `${Math.round(markDate.datePercentage * 100)}% ` },
        children: markDate.dateMarker
      }
    )
  ] });
}
function CustomThumb() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "scrubber-handle", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
  ] });
}
function useFocusedThumb(sliderContainer) {
  const [thumbElement, setThumbElement] = reactExports.useState();
  reactExports.useLayoutEffect(() => {
    if (!sliderContainer)
      return;
    const element = sliderContainer.querySelector(".components-timeline-thumb");
    if (!element)
      return;
    setThumbElement(element);
  }, [sliderContainer, thumbElement]);
  const [thumbHasFocus, setThumbHasFocus] = reactExports.useState(false);
  const handleThumbFocus = reactExports.useCallback(() => {
    setThumbHasFocus(true);
  }, []);
  const handleThumbBlur = reactExports.useCallback(() => {
    setThumbHasFocus(false);
  }, []);
  useEventListener("focus", handleThumbFocus, thumbElement);
  useEventListener("blur", handleThumbBlur, thumbElement);
  return thumbHasFocus;
}
function Scrubber(props) {
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
    onUpdate
  } = props;
  const [sliderContainer, setSliderContainer] = reactExports.useState(null);
  const [pointerPercent, setPointerPercent] = reactExports.useState(0);
  const tooltipProps = reactExports.useCallback(() => {
    return { visible: false };
  }, []);
  const [showRailTooltip, setShowRailTooltip] = reactExports.useState(false);
  const handlePointerEnter = reactExports.useCallback(() => {
    setShowRailTooltip(true);
  }, []);
  const handlePointerLeave = reactExports.useCallback(() => {
    setShowRailTooltip(false);
  }, []);
  const handlePointerMove = reactExports.useCallback(
    (event) => {
      sliderContainer && setPointerPercent(
        getPercentageOfRectangle(
          sliderContainer.getBoundingClientRect(),
          event.clientX
        )
      );
    },
    [sliderContainer]
  );
  const thumbHasFocus = useFocusedThumb(sliderContainer ?? void 0);
  const tickLabel = reactExports.useMemo(() => {
    const showTip = isPlaying || showRailTooltip || thumbHasFocus;
    const percent = isPlaying || thumbHasFocus ? currentDuration / totalDuration : pointerPercent;
    const markDateInRange = markDateInTimelineRange(
      props.markDate,
      startDate,
      endDate
    );
    const currentDateMarker = props.markDate && markDateInRange && startDate && endDate ? getDateMarker(props.markDate, startDate, endDate) : void 0;
    const tooltipText = generateToolTipText(
      !!showTime,
      percent,
      0,
      totalDuration,
      startDate,
      endDate,
      timeZoneOffset
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      RailMarkers,
      {
        showToolTip: showTip,
        percent,
        tooltipText,
        markDate: currentDateMarker
      }
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
    props.markDate
  ]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Slider,
    {
      ref: setSliderContainer,
      className,
      step: 1,
      min: 0,
      max: totalDuration,
      minLabel: "",
      maxLabel: "",
      onUpdate,
      onChange,
      values: [currentDuration],
      tooltipProps,
      thumbProps: () => ({
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomThumb, {}),
        className: "components-timeline-thumb"
      }),
      tickLabels: tickLabel,
      onPointerEnter: handlePointerEnter,
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave
    }
  );
}
try {
  RailMarkers.displayName = "RailMarkers";
  RailMarkers.__docgenInfo = { "description": "", "displayName": "RailMarkers", "props": { "showToolTip": { "defaultValue": null, "description": "", "name": "showToolTip", "required": true, "type": { "name": "boolean" } }, "percent": { "defaultValue": null, "description": "", "name": "percent", "required": true, "type": { "name": "number" } }, "tooltipText": { "defaultValue": null, "description": "", "name": "tooltipText", "required": true, "type": { "name": "string" } }, "markDate": { "defaultValue": null, "description": "", "name": "markDate", "required": false, "type": { "name": "DateMarkerProps" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  CustomThumb.displayName = "CustomThumb";
  CustomThumb.__docgenInfo = { "description": "Custom Timeline Thumb", "displayName": "CustomThumb", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  useFocusedThumb.displayName = "useFocusedThumb";
  useFocusedThumb.__docgenInfo = { "description": "", "displayName": "useFocusedThumb", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  Scrubber.displayName = "Scrubber";
  Scrubber.__docgenInfo = { "description": "Scrubber/Slider for timeline control", "displayName": "Scrubber", "props": { "currentDuration": { "defaultValue": null, "description": "", "name": "currentDuration", "required": true, "type": { "name": "number" } }, "totalDuration": { "defaultValue": null, "description": "", "name": "totalDuration", "required": true, "type": { "name": "number" } }, "isPlaying": { "defaultValue": null, "description": "", "name": "isPlaying", "required": true, "type": { "name": "boolean" } }, "startDate": { "defaultValue": null, "description": "", "name": "startDate", "required": false, "type": { "name": "Date" } }, "endDate": { "defaultValue": null, "description": "", "name": "endDate", "required": false, "type": { "name": "Date" } }, "showTime": { "defaultValue": null, "description": "", "name": "showTime", "required": false, "type": { "name": "boolean" } }, "onChange": { "defaultValue": null, "description": "", "name": "onChange", "required": false, "type": { "name": "((values: readonly number[]) => void)" } }, "onUpdate": { "defaultValue": null, "description": "", "name": "onUpdate", "required": false, "type": { "name": "((values: readonly number[]) => void)" } }, "timeZoneOffset": { "defaultValue": null, "description": "", "name": "timeZoneOffset", "required": false, "type": { "name": "number" } }, "markDate": { "defaultValue": null, "description": "", "name": "markDate", "required": false, "type": { "name": "TimelineDateMarkerProps" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const slowSpeed = 60 * 1e3;
const mediumSpeed = 20 * 1e3;
const fastSpeed = 10 * 1e3;
function TimelineComponent(props) {
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
    onPlayPause
  } = props;
  const [isPlaying, setIsPlaying] = reactExports.useState(!!props.isPlaying);
  const [currentDuration, setCurrentDuration] = reactExports.useState(
    props.initialDuration ?? 0
  );
  const [totalDuration, setTotalDuration] = reactExports.useState(props.totalDuration);
  const [repeat, setRepeat] = reactExports.useState(props.repeat ?? false);
  const playOrReplay = reactExports.useCallback(() => {
    if (isPlaying)
      return;
    if (currentDuration >= totalDuration) {
      setCurrentDuration(0);
    }
    setIsPlaying(true);
    onPlayPause == null ? void 0 : onPlayPause(true);
  }, [isPlaying, onPlayPause, currentDuration, totalDuration]);
  const pause = reactExports.useCallback(() => {
    if (!isPlaying)
      return;
    setIsPlaying(false);
    onPlayPause == null ? void 0 : onPlayPause(false);
  }, [isPlaying, onPlayPause]);
  const updateTotalDuration = (newTotalDuration) => {
    if (newTotalDuration === totalDuration)
      return;
    const fraction = currentDuration / totalDuration;
    const newCurrentDuration = fraction * newTotalDuration;
    setTotalDuration(newTotalDuration);
    setCurrentDuration(newCurrentDuration);
    onSettingsChange == null ? void 0 : onSettingsChange({ duration: newTotalDuration });
  };
  const updateDuration = (newDuration, currentTotalDuration = totalDuration) => {
    newDuration = Math.max(newDuration, 0);
    newDuration = Math.min(newDuration, currentTotalDuration);
    if (newDuration === currentDuration)
      return;
    setCurrentDuration(newDuration);
    const fraction = newDuration / currentTotalDuration;
    onChange == null ? void 0 : onChange(fraction);
  };
  const updateRepeat = (newRepeat) => {
    if (newRepeat === repeat)
      return;
    setRepeat(newRepeat);
    onSettingsChange == null ? void 0 : onSettingsChange({ loop: newRepeat });
  };
  const [prevTotalDuration, setPrevTotalDuration] = reactExports.useState(
    props.totalDuration
  );
  if (prevTotalDuration !== props.totalDuration) {
    setPrevTotalDuration(props.totalDuration);
    updateTotalDuration(props.totalDuration);
  }
  const [prevInitialDuration, setPrevInitialDuration] = reactExports.useState(
    props.initialDuration
  );
  if (prevInitialDuration !== props.initialDuration) {
    setPrevInitialDuration(props.initialDuration);
    updateDuration(props.initialDuration ?? 0, props.totalDuration);
  }
  const [prevRepeat, setPrevRepeat] = reactExports.useState(props.repeat);
  if (prevRepeat !== props.repeat) {
    setPrevRepeat(props.repeat);
    updateRepeat(props.repeat ?? repeat);
  }
  reactExports.useEffect(() => {
    if (!props.componentId)
      return;
    return UiAdmin.onGenericUiEvent.addListener((args) => {
      const timelineArgs = args;
      if (!timelineArgs || // eslint-disable-next-line deprecation/deprecation
      props.componentId !== timelineArgs.uiComponentId || timelineArgs.timelineAction === void 0)
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
  reactExports.useEffect(() => {
    if (props.isPlaying)
      playOrReplay();
    if (props.isPlaying === false)
      pause();
  }, [props.isPlaying, playOrReplay, pause]);
  const onTimelineChange = (values) => {
    const newDuration = values[0];
    updateDuration(newDuration);
  };
  const currentDurationStr = toDisplayTime(currentDuration);
  const totalDurationStr = toDisplayTime(totalDuration);
  const hasDates = !!startDate && !!endDate;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-testid": "timeline-component", className: "timeline-component", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PlayButton, { isPlaying, onPlay: playOrReplay, onPause: pause }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "time-container", children: [
      hasDates && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-testid": "test-start-date", className: "timeline-date", children: toDateString(startDate, timeZoneOffset, dateFormatOptions) }),
      hasDates && !showDuration && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-testid": "test-start-time", className: "timeline-time", children: toTimeString(startDate, timeZoneOffset, timeFormatOptions) }),
      showDuration && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "timeline-duration-time", children: currentDurationStr })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Scrubber,
      {
        className: "slider",
        currentDuration,
        totalDuration,
        startDate,
        endDate,
        isPlaying,
        showTime: !showDuration,
        onChange: onTimelineChange,
        onUpdate: onTimelineChange,
        timeZoneOffset: props.timeZoneOffset,
        markDate: props.markDate
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "time-container", children: [
      hasDates && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-testid": "test-end-date", className: "timeline-date", children: toDateString(endDate, timeZoneOffset) }),
      hasDates && !showDuration && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "timeline-time", children: toTimeString(endDate, timeZoneOffset, timeFormatOptions) }),
      showDuration && /* @__PURE__ */ jsxRuntimeExports.jsx(
        InlineEdit,
        {
          className: "timeline-duration-time",
          defaultValue: totalDurationStr,
          onChange: (value) => {
            const newTotalDuration = timeToMs(value);
            updateTotalDuration(newTotalDuration);
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SettingsMenu,
      {
        appMenuItems: props.appMenuItems,
        appMenuItemOption,
        includeRepeat,
        repeat,
        totalDuration,
        onRepeatClick: () => {
          updateRepeat(!repeat);
        },
        onTotalDurationChange: (newTotalDuration) => {
          updateTotalDuration(newTotalDuration);
        }
      }
    )
  ] });
}
function SettingsMenu({
  appMenuItems,
  appMenuItemOption,
  includeRepeat,
  repeat,
  totalDuration,
  onRepeatClick,
  onTotalDurationChange
}) {
  const { translate } = useTranslation();
  const menuItems = reactExports.useMemo(() => {
    const standardItems = [
      {
        label: translate("timeline.slow"),
        timelineDuration: slowSpeed
      },
      {
        label: translate("timeline.medium"),
        timelineDuration: mediumSpeed
      },
      {
        label: translate("timeline.fast"),
        timelineDuration: fastSpeed
      }
    ];
    if (!appMenuItems) {
      return standardItems;
    }
    if (appMenuItemOption === "append") {
      return [...standardItems, ...appMenuItems];
    }
    if (appMenuItemOption === "prefix") {
      return [...appMenuItems, ...standardItems];
    }
    return appMenuItems;
  }, [appMenuItemOption, appMenuItems, translate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DropdownMenu,
    {
      menuItems: (close) => {
        return [
          ...includeRepeat ? [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MenuItem,
              {
                onClick: () => {
                  onRepeatClick();
                  close();
                },
                startIcon: repeat ? /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCheckmark, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {}),
                children: translate("timeline.repeat")
              },
              "repeat"
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MenuDivider, {}, "divider")
          ] : [],
          ...menuItems.map((item, index) => {
            const checked = totalDuration === item.timelineDuration;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              MenuItem,
              {
                startIcon: checked ? /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCheckmark, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {}),
                onClick: () => {
                  onTotalDurationChange(item.timelineDuration);
                  close();
                },
                children: item.label
              },
              index
            );
          })
        ];
      },
      placement: "top-start",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        IconButton,
        {
          "data-testid": "timeline-settings",
          label: translate("button.label.settings"),
          styleType: "borderless",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgMoreVertical, {})
        }
      )
    }
  );
}
function useAnimation(onAnimate, playing = true) {
  const onAnimateRef = reactExports.useRef(onAnimate);
  onAnimateRef.current = onAnimate;
  const lastTimeRef = reactExports.useRef();
  reactExports.useEffect(() => {
    if (!playing)
      return;
    let handle = 0;
    let didCancel = false;
    const animate = (time) => {
      if (lastTimeRef.current === void 0) {
        lastTimeRef.current = time;
      }
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      onAnimateRef.current({
        delta
      });
      if (didCancel)
        return;
      handle = window.requestAnimationFrame(animate);
    };
    handle = window.requestAnimationFrame(animate);
    return () => {
      didCancel = true;
      lastTimeRef.current = void 0;
      window.cancelAnimationFrame(handle);
    };
  }, [playing]);
}
function timeToMs(time) {
  if (time.indexOf(":") !== -1) {
    return (Number(time.split(":")[0]) * 60 + Number(time.split(":")[1])) * 1e3;
  } else {
    return Number(time) * 1e3;
  }
}
function toDisplayTime(ms) {
  const addZero = (i) => {
    return i < 10 ? `0${i}` : i;
  };
  const date = new Date(ms);
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return `${addZero(minutes)}:${addZero(seconds)}`;
}
try {
  TimelineComponent.displayName = "TimelineComponent";
  TimelineComponent.__docgenInfo = { "description": "[[TimelineComponent]] is used to playback timeline data", "displayName": "TimelineComponent", "props": { "startDate": { "defaultValue": null, "description": "Start date: beginning of the date range of a date-based timeline.", "name": "startDate", "required": false, "type": { "name": "Date" } }, "endDate": { "defaultValue": null, "description": "End date: end of the date range of a date-based timeline.", "name": "endDate", "required": false, "type": { "name": "Date" } }, "totalDuration": { "defaultValue": null, "description": "Total duration: range of the timeline in milliseconds.\n@note This can be changed by user interaction. See {@link TimelineComponentProps.appMenuItems }.", "name": "totalDuration", "required": true, "type": { "name": "number" } }, "initialDuration": { "defaultValue": null, "description": "Initial value for the current duration (the location of the thumb) in milliseconds", "name": "initialDuration", "required": false, "type": { "name": "number" } }, "minimized": { "defaultValue": null, "description": "Show in minimized mode (For future use. This prop will always be treated as true.)\n@deprecated in 4.10.x. Has no effect.", "name": "minimized", "required": false, "type": { "name": "boolean" } }, "repeat": { "defaultValue": null, "description": "When playing, repeat indefinitely. Defaults to `false`.\n@note This can be changed by user interaction. See {@link TimelineComponentProps.includeRepeat }.", "name": "repeat", "required": false, "type": { "name": "boolean" } }, "showDuration": { "defaultValue": null, "description": "Show duration instead of time", "name": "showDuration", "required": false, "type": { "name": "boolean" } }, "onChange": { "defaultValue": null, "description": "Callback with current duration value (as a fraction)", "name": "onChange", "required": false, "type": { "name": "((duration: number) => void)" } }, "onPlayPause": { "defaultValue": null, "description": "Callback triggered when play/pause button is pressed", "name": "onPlayPause", "required": false, "type": { "name": "((playing: boolean) => void)" } }, "onJump": { "defaultValue": null, "description": "Callback triggered when backward/forward buttons are pressed.\n@deprecated in 4.10.x. Has no effect.", "name": "onJump", "required": false, "type": { "name": "((forward: boolean) => void)" } }, "onSettingsChange": { "defaultValue": null, "description": "Callback triggered when a setting is changed", "name": "onSettingsChange", "required": false, "type": { "name": "((arg: PlaybackSettings) => void)" } }, "alwaysMinimized": { "defaultValue": null, "description": "Always display in miniMode with no expand menu (For future use. This prop will always be treated as true)\n@deprecated in 4.10.x. Has no effect.", "name": "alwaysMinimized", "required": false, "type": { "name": "boolean" } }, "componentId": { "defaultValue": null, "description": "ComponentId -- must be set to use TimelineComponentEvents\n@deprecated in 4.11.x.  Use the isPlaying prop instead.", "name": "componentId", "required": false, "type": { "name": "string" } }, "includeRepeat": { "defaultValue": null, "description": "Include the repeat option on the Timeline Context Menu. Defaults to `true`.", "name": "includeRepeat", "required": false, "type": { "name": "boolean" } }, "appMenuItems": { "defaultValue": null, "description": "App-supplied speed entries in the Timeline Context Menu. Defaults to `[Slow, Medium, Fast]` items.", "name": "appMenuItems", "required": false, "type": { "name": "TimelineMenuItemProps[]" } }, "appMenuItemOption": { "defaultValue": null, "description": "How to include the supplied app menu items in the Timeline Context Menu (prefix, append or replace). Defaults to `replace`.", "name": "appMenuItemOption", "required": false, "type": { "name": "enum", "value": [{ "value": '"prefix"' }, { "value": '"replace"' }, { "value": '"append"' }] } }, "timeZoneOffset": { "defaultValue": null, "description": "Display date and time offset by the number of minutes specified. When undefined - local timezone will be used", "name": "timeZoneOffset", "required": false, "type": { "name": "number" } }, "markDate": { "defaultValue": null, "description": "Display a marker on the timeline rail to indicate current date - will only work if starDate and endDate are defined", "name": "markDate", "required": false, "type": { "name": "TimelineDateMarkerProps" } }, "dateFormatOptions": { "defaultValue": null, "description": "Options used to format date string. If not defined it will user browser default locale settings.", "name": "dateFormatOptions", "required": false, "type": { "name": "DateFormatOptions" } }, "timeFormatOptions": { "defaultValue": null, "description": "Options used to format time string. If not defined it will user browser default locale settings.", "name": "timeFormatOptions", "required": false, "type": { "name": "DateFormatOptions" } }, "isPlaying": { "defaultValue": null, "description": "Used to control the play/pause state of the Timeline.", "name": "isPlaying", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const AlignComponent = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",
      paddingInline: "10%",
      paddingBlock: "2em",
      boxSizing: "border-box"
    },
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {})
  });
};
const PageLayout = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    style: {
      height: "100vh"
    },
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {})
  });
};
const DateDecorator = (Story, context) => {
  if (typeof context.args.startDate === "number") {
    context.args.startDate = new Date(context.args.startDate * 1e3);
  }
  if (typeof context.args.endDate === "number") {
    context.args.endDate = new Date(context.args.endDate * 1e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {});
};
const meta = {
  title: "Components/Timeline",
  component: TimelineComponent,
  tags: ["autodocs"],
  decorators: [AlignComponent, InitializerDecorator, AppUiDecorator, PageLayout, DateDecorator],
  parameters: {
    layout: "fullscreen"
  }
};
const Basic = {
  args: {
    totalDuration: 3e3,
    onChange: action("onChange"),
    onSettingsChange: action("onSettingsChange"),
    onPlayPause: action("onPlayPause")
  }
};
const WithDates = {
  args: {
    ...Basic.args,
    startDate: new Date(2023, 4, 1),
    endDate: new Date(2023, 4, 17)
  }
};
const ShowDuration = {
  args: {
    ...Basic.args,
    showDuration: true
  }
};
const HideRepeatButton = {
  args: {
    ...Basic.args,
    includeRepeat: false
  }
};
const Repeat = {
  args: {
    ...Basic.args,
    repeat: true
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    totalDuration: 3000,\n    onChange: action("onChange"),\n    onSettingsChange: action("onSettingsChange"),\n    onPlayPause: action("onPlayPause")\n  }\n}',
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
WithDates.parameters = {
  ...WithDates.parameters,
  docs: {
    ...(_d = WithDates.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  args: {\n    ...Basic.args,\n    startDate: new Date(2023, 4, 1),\n    endDate: new Date(2023, 4, 17)\n  }\n}",
      ...(_f = (_e = WithDates.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
ShowDuration.parameters = {
  ...ShowDuration.parameters,
  docs: {
    ...(_g = ShowDuration.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: "{\n  args: {\n    ...Basic.args,\n    showDuration: true\n  }\n}",
      ...(_i = (_h = ShowDuration.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
HideRepeatButton.parameters = {
  ...HideRepeatButton.parameters,
  docs: {
    ...(_j = HideRepeatButton.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: "{\n  args: {\n    ...Basic.args,\n    includeRepeat: false\n  }\n}",
      ...(_l = (_k = HideRepeatButton.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
Repeat.parameters = {
  ...Repeat.parameters,
  docs: {
    ...(_m = Repeat.parameters) == null ? void 0 : _m.docs,
    source: {
      originalSource: "{\n  args: {\n    ...Basic.args,\n    repeat: true\n  }\n}",
      ...(_o = (_n = Repeat.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
    }
  }
};
const __namedExportsOrder = ["Basic", "WithDates", "ShowDuration", "HideRepeatButton", "Repeat"];
export {
  Basic,
  HideRepeatButton,
  Repeat,
  ShowDuration,
  WithDates,
  __namedExportsOrder,
  meta as default
};
