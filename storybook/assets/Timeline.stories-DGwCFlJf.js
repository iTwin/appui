import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Dt as IconButton, T as MenuItem, at as Slider, ht as DropdownMenu, i as init_esm, qt as require_classnames, tt as Input, x as MenuDivider } from "./iframe-DrBiZGmV.js";
import { J as UiAdmin, r as init_appui_abstract, t as require_Key_enum } from "./Key.enum-DhBIjxOv.js";
import { Oo as SvgCheckmark, Vr as init_esm$1, ca as SvgMoreVertical, hn as toTimeString, mn as toDateString, t as init_components_react } from "./components-react-DigDa1CF.js";
import { n as InitializerDecorator, r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
import { i as useTranslation, n as init_PlayButton, r as init_useTranslation, t as PlayButton } from "./PlayButton-Cb40_CDr.js";
//#region ../../ui/imodel-components-react/src/imodel-components-react/timeline/TimelineComponent.scss
var init_TimelineComponent$1 = __esmMin((() => {}));
//#endregion
//#region ../../ui/imodel-components-react/src/imodel-components-react/timeline/InlineEdit.scss
var init_InlineEdit$1 = __esmMin((() => {}));
//#endregion
//#region ../../ui/imodel-components-react/src/imodel-components-react/timeline/InlineEdit.tsx
var import_classnames, import_react$2, import_Key_enum, import_jsx_runtime$3, InlineEdit;
var init_InlineEdit = __esmMin((() => {
	init_InlineEdit$1();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react$2 = /* @__PURE__ */ __toESM(require_react(), 1);
	import_Key_enum = require_Key_enum();
	init_esm();
	import_jsx_runtime$3 = require_jsx_runtime();
	InlineEdit = class extends import_react$2.Component {
		_inputRef = import_react$2.createRef();
		constructor(props) {
			super(props);
			this.state = {
				value: this.props.defaultValue,
				originalValue: this.props.defaultValue
			};
		}
		componentDidUpdate(prevProps, _prevState) {
			if (prevProps.defaultValue !== this.props.defaultValue) this.setState((_, props) => {
				return {
					value: props.defaultValue,
					originalValue: props.defaultValue
				};
			});
		}
		_onBlur = (event) => {
			this._sendChange(event.target.value);
		};
		_onFocus = (event) => {
			event.target.select();
		};
		_onKeyDown = (event) => {
			switch (event.key) {
				case import_Key_enum.Key.Escape.valueOf():
					this.setState((prevState) => ({ value: prevState.originalValue }), () => this._inputRef.current.select());
					break;
				case import_Key_enum.Key.Enter.valueOf():
					this._sendChange(this.state.value);
					break;
			}
		};
		_onChange = (event) => {
			this.setState({ value: event.target.value });
		};
		_sendChange(value) {
			if (this.props.onChange) this.props.onChange(value);
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Input, {
				"data-testid": "timeline-duration-edit-input",
				className: (0, import_classnames.default)("inline-edit-input", this.props.className),
				style: this.props.style,
				ref: this._inputRef,
				type: "text",
				value: this.state.value,
				size: "small",
				onFocus: this._onFocus,
				onBlur: this._onBlur,
				onKeyDown: this._onKeyDown,
				onChange: this._onChange
			});
		}
	};
	InlineEdit.__docgenInfo = {
		"description": "Duration Inline Editor\n@internal",
		"methods": [],
		"displayName": "InlineEdit",
		"props": {
			"defaultValue": {
				"required": true,
				"tsType": { "name": "string" },
				"description": ""
			},
			"onChange": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(value: string) => void",
					"signature": {
						"arguments": [{
							"type": { "name": "string" },
							"name": "value"
						}],
						"return": { "name": "void" }
					}
				},
				"description": ""
			}
		},
		"composes": ["CommonProps"]
	};
}));
//#endregion
//#region ../../ui/imodel-components-react/src/imodel-components-react/timeline/interfaces.ts
var TimelinePausePlayAction;
var init_interfaces = __esmMin((() => {
	TimelinePausePlayAction = /* @__PURE__ */ function(TimelinePausePlayAction) {
		TimelinePausePlayAction[TimelinePausePlayAction["Toggle"] = 0] = "Toggle";
		TimelinePausePlayAction[TimelinePausePlayAction["Pause"] = 1] = "Pause";
		TimelinePausePlayAction[TimelinePausePlayAction["Play"] = 2] = "Play";
		return TimelinePausePlayAction;
	}({});
}));
//#endregion
//#region ../../ui/imodel-components-react/src/imodel-components-react/timeline/Scrubber.scss
var init_Scrubber$1 = __esmMin((() => {}));
//#endregion
//#region ../../ui/imodel-components-react/src/imodel-components-react/timeline/Scrubber.tsx
/** @internal */
function getPercentageOfRectangle(rect, pointer) {
	return (Math.min(rect.right, Math.max(rect.left, pointer)) - rect.left) / rect.width;
}
function generateToolTipText(showTime, percent, min, max, startDate, endDate, timeZoneOffset = 0) {
	if (startDate && endDate) return `${formatDate(startDate, endDate, percent, timeZoneOffset)}${showTime ? formatTime(startDate, endDate, percent, timeZoneOffset) : ""} `;
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
	return {
		datePercentage: getPercentageFromDate(startDate, endDate, dateMarkerPropsIn.date),
		dateMarker: dateMarkerPropsIn.dateMarker ? dateMarkerPropsIn.dateMarker : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { className: "date-marker-default" })
	};
}
function markDateInTimelineRange(dateMarkerProps, startDate, endDate) {
	if (dateMarkerProps && startDate && endDate) {
		const inDate = dateMarkerProps.date ? dateMarkerProps.date : /* @__PURE__ */ new Date();
		if (inDate.getTime() >= startDate.getTime() && inDate.getTime() <= endDate.getTime()) return true;
	}
	return false;
}
/** @internal */
function RailMarkers({ showToolTip, percent, tooltipText, markDate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
		className: "components-timeline-rail-marker-container",
		children: [showToolTip && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "components-timeline-tooltip",
			style: { left: `${Math.round(percent * 100)}% ` },
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
				className: "tooltip-text",
				children: tooltipText
			})
		}), markDate && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "components-timeline-date-marker",
			"data-testid": "test-date-marker",
			style: { left: `${Math.round(markDate.datePercentage * 100)}% ` },
			children: markDate.dateMarker
		})]
	});
}
/**
* Custom Timeline Thumb
* @internal
*/
function CustomThumb() {
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
		className: "scrubber-handle",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {})
		]
	});
}
/**
* @internal
*/
function useFocusedThumb(sliderContainer) {
	const [thumbElement, setThumbElement] = import_react$1.useState();
	import_react$1.useLayoutEffect(() => {
		if (!sliderContainer) return;
		const element = sliderContainer.querySelector(".components-timeline-thumb");
		if (!element) return;
		setThumbElement(element);
	}, [sliderContainer, thumbElement]);
	const [thumbHasFocus, setThumbHasFocus] = import_react$1.useState(false);
	import_react$1.useEffect(() => {
		const listener = () => {
			setThumbHasFocus(true);
		};
		thumbElement?.addEventListener("focus", listener);
		return () => {
			thumbElement?.removeEventListener("focus", listener);
		};
	}, [thumbElement]);
	import_react$1.useEffect(() => {
		const listener = () => {
			setThumbHasFocus(false);
		};
		thumbElement?.addEventListener("blur", listener);
		return () => {
			thumbElement?.removeEventListener("blur", listener);
		};
	}, [thumbElement]);
	return thumbHasFocus;
}
/** Scrubber/Slider for timeline control
* @internal
*/
function Scrubber(props) {
	const { startDate, endDate, showTime, isPlaying, totalDuration, timeZoneOffset, currentDuration, className, onChange, onUpdate, trackContainerProps } = props;
	const [sliderContainer, setSliderContainer] = import_react$1.useState(null);
	const [pointerPercent, setPointerPercent] = import_react$1.useState(0);
	const tooltipProps = import_react$1.useCallback(() => {
		return { visible: false };
	}, []);
	const [showRailTooltip, setShowRailTooltip] = import_react$1.useState(false);
	const handlePointerEnter = import_react$1.useCallback(() => {
		setShowRailTooltip(true);
	}, []);
	const handlePointerLeave = import_react$1.useCallback(() => {
		setShowRailTooltip(false);
	}, []);
	const handlePointerMove = import_react$1.useCallback((event) => {
		sliderContainer && setPointerPercent(getPercentageOfRectangle(sliderContainer.getBoundingClientRect(), event.clientX));
	}, [sliderContainer]);
	const thumbHasFocus = useFocusedThumb(sliderContainer ?? void 0);
	const tickLabel = import_react$1.useMemo(() => {
		const showTip = isPlaying || showRailTooltip || thumbHasFocus;
		const percent = isPlaying || thumbHasFocus ? currentDuration / totalDuration : pointerPercent;
		const markDateInRange = markDateInTimelineRange(props.markDate, startDate, endDate);
		const currentDateMarker = props.markDate && markDateInRange && startDate && endDate ? getDateMarker(props.markDate, startDate, endDate) : void 0;
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(RailMarkers, {
			showToolTip: showTip,
			percent,
			tooltipText: generateToolTipText(!!showTime, percent, 0, totalDuration, startDate, endDate, timeZoneOffset),
			markDate: currentDateMarker
		});
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
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Slider, {
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
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CustomThumb, {}),
			className: "components-timeline-thumb"
		}),
		tickLabels: tickLabel,
		onPointerEnter: handlePointerEnter,
		onPointerMove: handlePointerMove,
		onPointerLeave: handlePointerLeave,
		trackContainerProps
	});
}
var import_react$1, import_jsx_runtime$2, formatDuration, formatDate, formatTime;
var init_Scrubber = __esmMin((() => {
	init_Scrubber$1();
	import_react$1 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_esm();
	init_components_react();
	import_jsx_runtime$2 = require_jsx_runtime();
	formatDuration = (value) => {
		const addZero = (i) => {
			return i < 10 ? `0${i}` : i;
		};
		const date = new Date(value);
		const minutes = date.getUTCMinutes();
		const seconds = date.getUTCSeconds();
		return `${addZero(minutes)}:${addZero(seconds)}`;
	};
	formatDate = (startDate, endDate, fraction, timeZoneOffset) => {
		const delta = (endDate.getTime() - startDate.getTime()) * fraction;
		return toDateString(new Date(startDate.getTime() + delta), timeZoneOffset);
	};
	formatTime = (startDate, endDate, fraction, timeZoneOffset) => {
		const delta = (endDate.getTime() - startDate.getTime()) * fraction;
		return ` ${toTimeString(new Date(startDate.getTime() + delta), timeZoneOffset)}`;
	};
	RailMarkers.__docgenInfo = {
		"description": "@internal",
		"methods": [],
		"displayName": "RailMarkers",
		"props": {
			"showToolTip": {
				"required": true,
				"tsType": { "name": "boolean" },
				"description": ""
			},
			"percent": {
				"required": true,
				"tsType": { "name": "number" },
				"description": ""
			},
			"tooltipText": {
				"required": true,
				"tsType": { "name": "string" },
				"description": ""
			},
			"markDate": {
				"required": false,
				"tsType": { "name": "DateMarkerProps" },
				"description": ""
			}
		}
	};
	CustomThumb.__docgenInfo = {
		"description": "Custom Timeline Thumb\n@internal",
		"methods": [],
		"displayName": "CustomThumb"
	};
	Scrubber.__docgenInfo = {
		"description": "Scrubber/Slider for timeline control\n@internal",
		"methods": [],
		"displayName": "Scrubber",
		"props": {
			"currentDuration": {
				"required": true,
				"tsType": { "name": "number" },
				"description": ""
			},
			"totalDuration": {
				"required": true,
				"tsType": { "name": "number" },
				"description": ""
			},
			"isPlaying": {
				"required": true,
				"tsType": { "name": "boolean" },
				"description": ""
			},
			"startDate": {
				"required": false,
				"tsType": { "name": "Date" },
				"description": ""
			},
			"endDate": {
				"required": false,
				"tsType": { "name": "Date" },
				"description": ""
			},
			"showTime": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": ""
			},
			"onChange": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(values: ReadonlyArray<number>) => void",
					"signature": {
						"arguments": [{
							"type": {
								"name": "ReadonlyArray",
								"elements": [{ "name": "number" }],
								"raw": "ReadonlyArray<number>"
							},
							"name": "values"
						}],
						"return": { "name": "void" }
					}
				},
				"description": ""
			},
			"onUpdate": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(values: ReadonlyArray<number>) => void",
					"signature": {
						"arguments": [{
							"type": {
								"name": "ReadonlyArray",
								"elements": [{ "name": "number" }],
								"raw": "ReadonlyArray<number>"
							},
							"name": "values"
						}],
						"return": { "name": "void" }
					}
				},
				"description": ""
			},
			"timeZoneOffset": {
				"required": false,
				"tsType": { "name": "number" },
				"description": ""
			},
			"markDate": {
				"required": false,
				"tsType": { "name": "TimelineDateMarkerProps" },
				"description": ""
			},
			"trackContainerProps": {
				"required": false,
				"tsType": {
					"name": "ReactComponentProps[\"trackContainerProps\"]",
					"raw": "React.ComponentProps<\n  typeof Slider\n>[\"trackContainerProps\"]"
				},
				"description": ""
			}
		},
		"composes": ["CommonProps"]
	};
}));
//#endregion
//#region ../../ui/imodel-components-react/src/imodel-components-react/timeline/TimelineComponent.tsx
/** [[TimelineComponent]] is used to playback timeline data
* @public
*/
function TimelineComponent(props) {
	const { appMenuItemOption = "replace", startDate, endDate, showDuration, timeZoneOffset, dateFormatOptions, timeFormatOptions, includeRepeat = true, onSettingsChange, onChange, onPlayPause } = props;
	const [isPlaying, setIsPlaying] = import_react.useState(!!props.isPlaying);
	const [currentDuration, setCurrentDuration] = import_react.useState(props.initialDuration ?? 0);
	const [totalDuration, setTotalDuration] = import_react.useState(props.totalDuration);
	const [repeat, setRepeat] = import_react.useState(props.repeat ?? false);
	const playOrReplay = import_react.useCallback(() => {
		if (isPlaying) return;
		if (currentDuration >= totalDuration) setCurrentDuration(0);
		setIsPlaying(true);
		onPlayPause?.(true);
	}, [
		isPlaying,
		onPlayPause,
		currentDuration,
		totalDuration
	]);
	const pause = import_react.useCallback(() => {
		if (!isPlaying) return;
		setIsPlaying(false);
		onPlayPause?.(false);
	}, [isPlaying, onPlayPause]);
	const updateTotalDuration = (newTotalDuration) => {
		if (newTotalDuration === totalDuration) return;
		const newCurrentDuration = currentDuration / totalDuration * newTotalDuration;
		setTotalDuration(newTotalDuration);
		setCurrentDuration(newCurrentDuration);
		onSettingsChange?.({ duration: newTotalDuration });
	};
	const updateDuration = (newDuration, currentTotalDuration = totalDuration) => {
		newDuration = Math.max(newDuration, 0);
		newDuration = Math.min(newDuration, currentTotalDuration);
		if (newDuration === currentDuration) return;
		setCurrentDuration(newDuration);
		const fraction = newDuration / currentTotalDuration;
		onChange?.(fraction);
	};
	const updateRepeat = (newRepeat) => {
		if (newRepeat === repeat) return;
		setRepeat(newRepeat);
		onSettingsChange?.({ loop: newRepeat });
	};
	const [prevTotalDuration, setPrevTotalDuration] = import_react.useState(props.totalDuration);
	if (prevTotalDuration !== props.totalDuration) {
		setPrevTotalDuration(props.totalDuration);
		updateTotalDuration(props.totalDuration);
	}
	const [prevInitialDuration, setPrevInitialDuration] = import_react.useState(props.initialDuration);
	if (prevInitialDuration !== props.initialDuration) {
		setPrevInitialDuration(props.initialDuration);
		updateDuration(props.initialDuration ?? 0, props.totalDuration);
	}
	const [prevRepeat, setPrevRepeat] = import_react.useState(props.repeat);
	if (prevRepeat !== props.repeat) {
		setPrevRepeat(props.repeat);
		updateRepeat(props.repeat ?? repeat);
	}
	import_react.useEffect(() => {
		if (!props.componentId) return;
		return UiAdmin.onGenericUiEvent.addListener((args) => {
			const timelineArgs = args;
			if (!timelineArgs || props.componentId !== timelineArgs.uiComponentId || timelineArgs.timelineAction === void 0) return;
			switch (timelineArgs.timelineAction) {
				case TimelinePausePlayAction.Play:
					playOrReplay();
					break;
				case TimelinePausePlayAction.Pause:
					pause();
					break;
				case TimelinePausePlayAction.Toggle:
					if (isPlaying) pause();
					else playOrReplay();
					break;
			}
		});
	}, [
		isPlaying,
		pause,
		playOrReplay,
		props.componentId
	]);
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
	import_react.useEffect(() => {
		if (props.isPlaying) playOrReplay();
		if (props.isPlaying === false) pause();
	}, [
		props.isPlaying,
		playOrReplay,
		pause
	]);
	const onTimelineChange = (values) => {
		const newDuration = values[0];
		updateDuration(newDuration);
	};
	const currentDurationStr = toDisplayTime(currentDuration);
	const totalDurationStr = toDisplayTime(totalDuration);
	const hasDates = !!startDate && !!endDate;
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		"data-testid": "timeline-component",
		className: "timeline-component",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PlayButton, {
				isPlaying,
				onPlay: playOrReplay,
				onPause: pause
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "time-container",
				children: [
					hasDates && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						"data-testid": "test-start-date",
						className: "timeline-date",
						children: toDateString(startDate, timeZoneOffset, dateFormatOptions)
					}),
					hasDates && !showDuration && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						"data-testid": "test-start-time",
						className: "timeline-time",
						children: toTimeString(startDate, timeZoneOffset, timeFormatOptions)
					}),
					showDuration && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "timeline-duration-time",
						children: currentDurationStr
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Scrubber, {
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
				markDate: props.markDate,
				trackContainerProps: props.trackContainerProps
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "time-container",
				children: [
					hasDates && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						"data-testid": "test-end-date",
						className: "timeline-date",
						children: toDateString(endDate, timeZoneOffset)
					}),
					hasDates && !showDuration && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "timeline-time",
						children: toTimeString(endDate, timeZoneOffset, timeFormatOptions)
					}),
					showDuration && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(InlineEdit, {
						className: "timeline-duration-time",
						defaultValue: totalDurationStr,
						onChange: (value) => {
							const newTotalDuration = timeToMs(value);
							updateTotalDuration(newTotalDuration);
						}
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SettingsMenu, {
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
			})
		]
	});
}
function SettingsMenu({ appMenuItems, appMenuItemOption, includeRepeat, repeat, totalDuration, onRepeatClick, onTotalDurationChange }) {
	const { translate } = useTranslation();
	const menuItems = import_react.useMemo(() => {
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
		if (!appMenuItems) return standardItems;
		if (appMenuItemOption === "append") return [...standardItems, ...appMenuItems];
		if (appMenuItemOption === "prefix") return [...appMenuItems, ...standardItems];
		return appMenuItems;
	}, [
		appMenuItemOption,
		appMenuItems,
		translate
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DropdownMenu, {
		menuItems: (close) => {
			return [...includeRepeat ? [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MenuItem, {
				onClick: () => {
					onRepeatClick();
					close();
				},
				startIcon: repeat ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SvgCheckmark, {}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(import_jsx_runtime$1.Fragment, {}),
				children: translate("timeline.repeat")
			}, "repeat"), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MenuDivider, {}, "divider")] : [], ...menuItems.map((item, index) => {
				return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MenuItem, {
					startIcon: totalDuration === item.timelineDuration ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SvgCheckmark, {}) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(import_jsx_runtime$1.Fragment, {}),
					onClick: () => {
						onTotalDurationChange(item.timelineDuration);
						close();
					},
					children: item.label
				}, index);
			})];
		},
		placement: "top-start",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(IconButton, {
			"data-testid": "timeline-settings",
			label: translate("timeline.settings"),
			styleType: "borderless",
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SvgMoreVertical, {})
		})
	});
}
function useAnimation(onAnimate, playing = true) {
	const onAnimateRef = import_react.useRef(onAnimate);
	onAnimateRef.current = onAnimate;
	const lastTimeRef = import_react.useRef(void 0);
	import_react.useEffect(() => {
		if (!playing) return;
		let handle = 0;
		let didCancel = false;
		const animate = (time) => {
			if (lastTimeRef.current === void 0) lastTimeRef.current = time;
			const delta = time - lastTimeRef.current;
			lastTimeRef.current = time;
			onAnimateRef.current({ delta });
			if (didCancel) return;
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
	if (time.indexOf(":") !== -1) return (Number(time.split(":")[0]) * 60 + Number(time.split(":")[1])) * 1e3;
	else return Number(time) * 1e3;
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
var import_react, import_jsx_runtime$1, slowSpeed, mediumSpeed, fastSpeed;
var init_TimelineComponent = __esmMin((() => {
	init_TimelineComponent$1();
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_abstract();
	init_components_react();
	init_esm$1();
	init_esm();
	init_InlineEdit();
	init_interfaces();
	init_PlayButton();
	init_Scrubber();
	init_useTranslation();
	import_jsx_runtime$1 = require_jsx_runtime();
	slowSpeed = 60 * 1e3;
	mediumSpeed = 20 * 1e3;
	fastSpeed = 10 * 1e3;
	TimelineComponent.__docgenInfo = {
		"description": "[[TimelineComponent]] is used to playback timeline data\n@public",
		"methods": [],
		"displayName": "TimelineComponent",
		"props": {
			"startDate": {
				"required": false,
				"tsType": { "name": "Date" },
				"description": "Start date: beginning of the date range of a date-based timeline."
			},
			"endDate": {
				"required": false,
				"tsType": { "name": "Date" },
				"description": "End date: end of the date range of a date-based timeline."
			},
			"totalDuration": {
				"required": true,
				"tsType": { "name": "number" },
				"description": "Total duration: range of the timeline in milliseconds.\n@note This can be changed by user interaction. See {@link TimelineComponentProps.appMenuItems}."
			},
			"initialDuration": {
				"required": false,
				"tsType": { "name": "number" },
				"description": "Initial value for the current duration (the location of the thumb) in milliseconds"
			},
			"minimized": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Show in minimized mode (For future use. This prop will always be treated as true.)\n@deprecated in 4.10.0. Has no effect."
			},
			"repeat": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "When playing, repeat indefinitely. Defaults to `false`.\n@note This can be changed by user interaction. See {@link TimelineComponentProps.includeRepeat}."
			},
			"showDuration": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Show duration instead of time"
			},
			"onChange": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(duration: number) => void",
					"signature": {
						"arguments": [{
							"type": { "name": "number" },
							"name": "duration"
						}],
						"return": { "name": "void" }
					}
				},
				"description": "Callback with current duration value (as a fraction)"
			},
			"onPlayPause": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(playing: boolean) => void",
					"signature": {
						"arguments": [{
							"type": { "name": "boolean" },
							"name": "playing"
						}],
						"return": { "name": "void" }
					}
				},
				"description": "Callback triggered when play/pause button is pressed"
			},
			"onJump": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(forward: boolean) => void",
					"signature": {
						"arguments": [{
							"type": { "name": "boolean" },
							"name": "forward"
						}],
						"return": { "name": "void" }
					}
				},
				"description": "Callback triggered when backward/forward buttons are pressed.\n@deprecated in 4.10.0. Has no effect."
			},
			"onSettingsChange": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(arg: PlaybackSettings) => void",
					"signature": {
						"arguments": [{
							"type": { "name": "PlaybackSettings" },
							"name": "arg"
						}],
						"return": { "name": "void" }
					}
				},
				"description": "Callback triggered when a setting is changed"
			},
			"alwaysMinimized": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Always display in miniMode with no expand menu (For future use. This prop will always be treated as true)\n@deprecated in 4.10.0. Has no effect."
			},
			"componentId": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "ComponentId -- must be set to use TimelineComponentEvents\n@deprecated in 4.11.0.  Use the isPlaying prop instead."
			},
			"includeRepeat": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Include the repeat option on the Timeline Context Menu. Defaults to `true`."
			},
			"appMenuItems": {
				"required": false,
				"tsType": {
					"name": "Array",
					"elements": [{ "name": "TimelineMenuItemProps" }],
					"raw": "TimelineMenuItemProps[]"
				},
				"description": "App-supplied speed entries in the Timeline Context Menu. Defaults to `[Slow, Medium, Fast]` items."
			},
			"appMenuItemOption": {
				"required": false,
				"tsType": {
					"name": "union",
					"raw": "\"replace\" | \"append\" | \"prefix\"",
					"elements": [
						{
							"name": "literal",
							"value": "\"replace\""
						},
						{
							"name": "literal",
							"value": "\"append\""
						},
						{
							"name": "literal",
							"value": "\"prefix\""
						}
					]
				},
				"description": "How to include the supplied app menu items in the Timeline Context Menu (prefix, append or replace). Defaults to `replace`."
			},
			"timeZoneOffset": {
				"required": false,
				"tsType": { "name": "number" },
				"description": "Display date and time offset by the number of minutes specified. When undefined - local timezone will be used"
			},
			"markDate": {
				"required": false,
				"tsType": { "name": "TimelineDateMarkerProps" },
				"description": "Display a marker on the timeline rail to indicate current date - will only work if starDate and endDate are defined"
			},
			"dateFormatOptions": {
				"required": false,
				"tsType": { "name": "DateFormatOptions" },
				"description": "Options used to format date string. If not defined it will user browser default locale settings."
			},
			"timeFormatOptions": {
				"required": false,
				"tsType": { "name": "DateFormatOptions" },
				"description": "Options used to format time string. If not defined it will user browser default locale settings."
			},
			"isPlaying": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Used to control the play/pause state of the Timeline."
			},
			"trackContainerProps": {
				"required": false,
				"tsType": {
					"name": "ReactComponentProps[\"trackContainerProps\"]",
					"raw": "React.ComponentProps<\n  typeof Slider\n>[\"trackContainerProps\"]"
				},
				"description": "Props for a container that holds the slider thumbs and tracks."
			}
		}
	};
}));
//#endregion
//#region src/components/Timeline.stories.tsx
var import_jsx_runtime, action, AlignComponent, PageLayout, DateDecorator, meta, Basic, WithDates, ShowDuration, HideRepeatButton, Repeat, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_TimelineComponent();
	init_Decorators();
	import_jsx_runtime = require_jsx_runtime();
	({action} = __STORYBOOK_MODULE_ACTIONS__);
	AlignComponent = (Story) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "end",
				paddingInline: "10%",
				paddingBlock: "2em",
				boxSizing: "border-box"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {})
		});
	};
	PageLayout = (Story) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: { height: "100vh" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {})
		});
	};
	DateDecorator = (Story, context) => {
		if (typeof context.args.startDate === "number") context.args.startDate = /* @__PURE__ */ new Date(context.args.startDate * 1e3);
		if (typeof context.args.endDate === "number") context.args.endDate = /* @__PURE__ */ new Date(context.args.endDate * 1e3);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {});
	};
	meta = {
		title: "Components/Timeline",
		component: TimelineComponent,
		tags: ["autodocs"],
		decorators: [
			AlignComponent,
			InitializerDecorator,
			AppUiDecorator,
			PageLayout,
			DateDecorator
		],
		parameters: { layout: "fullscreen" }
	};
	Basic = { args: {
		totalDuration: 3e3,
		onChange: action("onChange"),
		onSettingsChange: action("onSettingsChange"),
		onPlayPause: action("onPlayPause")
	} };
	WithDates = { args: {
		...Basic.args,
		startDate: new Date(2023, 4, 1),
		endDate: new Date(2023, 4, 17)
	} };
	ShowDuration = { args: {
		...Basic.args,
		showDuration: true
	} };
	HideRepeatButton = { args: {
		...Basic.args,
		includeRepeat: false
	} };
	Repeat = { args: {
		...Basic.args,
		repeat: true
	} };
	Basic.parameters = {
		...Basic.parameters,
		docs: {
			...Basic.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    totalDuration: 3000,\n    onChange: action(\"onChange\"),\n    onSettingsChange: action(\"onSettingsChange\"),\n    onPlayPause: action(\"onPlayPause\")\n  }\n}",
				...Basic.parameters?.docs?.source
			}
		}
	};
	WithDates.parameters = {
		...WithDates.parameters,
		docs: {
			...WithDates.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    ...Basic.args,\n    startDate: new Date(2023, 4, 1),\n    endDate: new Date(2023, 4, 17)\n  }\n}",
				...WithDates.parameters?.docs?.source
			}
		}
	};
	ShowDuration.parameters = {
		...ShowDuration.parameters,
		docs: {
			...ShowDuration.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    ...Basic.args,\n    showDuration: true\n  }\n}",
				...ShowDuration.parameters?.docs?.source
			}
		}
	};
	HideRepeatButton.parameters = {
		...HideRepeatButton.parameters,
		docs: {
			...HideRepeatButton.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    ...Basic.args,\n    includeRepeat: false\n  }\n}",
				...HideRepeatButton.parameters?.docs?.source
			}
		}
	};
	Repeat.parameters = {
		...Repeat.parameters,
		docs: {
			...Repeat.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    ...Basic.args,\n    repeat: true\n  }\n}",
				...Repeat.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Basic",
		"WithDates",
		"ShowDuration",
		"HideRepeatButton",
		"Repeat"
	];
}))();
export { Basic, HideRepeatButton, Repeat, ShowDuration, WithDates, __namedExportsOrder, meta as default };
