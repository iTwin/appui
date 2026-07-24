import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { $ as ColorInputPanel, C as Select, Ct as Text, Dt as IconButton, Gt as Label, Lt as VisuallyHidden, Ut as Icon, Z as ColorPalette, _ as Flex, _t as Button, at as Slider, i as init_esm, kt as Popover, lt as ColorPicker, qt as require_classnames, rt as ColorBuilder, z as DatePicker, zt as Tooltip } from "./iframe-DrBiZGmV.js";
import { er as init_core_common, gn as init_imodel_components_react, hr as ColorByName, pr as ColorDef, yn as BaseSolarDataProvider } from "./appui-react-CpKk3CrH.js";
import { Qo as SvgCalendar, Vr as init_esm$1, fn as adjustDateToTimezone, ma as SvgLoop, oi as SvgSun, t as init_components_react, ua as SvgMoon, vi as SvgSettings, vn as UiComponents } from "./components-react-DigDa1CF.js";
import { a as init_UiIModelComponents, i as UiIModelComponents, n as InitializerDecorator, r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
import { i as useTranslation, n as init_PlayButton, r as init_useTranslation, t as PlayButton } from "./PlayButton-Cb40_CDr.js";
//#region ../../ui/imodel-components-react/src/imodel-components-react/timeline/SolarTimeline.scss
var init_SolarTimeline$1 = __esmMin((() => {}));
//#endregion
//#region ../../ui/imodel-components-react/src/imodel-components-react/timeline/SolarTimeline.tsx
function Timeline(props) {
	const { formatTick, formatTime, onChange, onUpdate, dayStartMs, sunSetOffsetMs, sunRiseOffsetMs, currentTimeOffsetMs } = props;
	const tooltipContent = formatTime(dayStartMs + currentTimeOffsetMs);
	const className = (0, import_classnames.default)("solar-timeline", props.className, formatTick && "showticks");
	const sunRiseStr = formatTime(dayStartMs + sunRiseOffsetMs);
	const sunSetStr = formatTime(dayStartMs + sunSetOffsetMs);
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(VisuallyHidden, { children: "Solar timeline" }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Slider, {
			thumbProps: () => ({ "aria-labelledby": "timeline" }),
			step: msPerMinute,
			min: sunRiseOffsetMs,
			max: sunSetOffsetMs,
			minLabel: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
				content: sunRiseStr,
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Icon, { children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SvgSun, {}) })
			}),
			maxLabel: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
				content: sunSetStr,
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Icon, { children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SvgMoon, {}) })
			}),
			onUpdate,
			onChange,
			values: [currentTimeOffsetMs],
			tooltipProps: () => ({ content: tooltipContent })
		})]
	});
}
var import_classnames, import_react, import_jsx_runtime$1, msPerMinute, msPerHour, defaultPlaybackDuration, offset, SolarTimeline, CalendarButton;
var init_SolarTimeline = __esmMin((() => {
	init_SolarTimeline$1();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_core_common();
	init_components_react();
	init_esm();
	init_esm$1();
	init_UiIModelComponents();
	init_PlayButton();
	init_useTranslation();
	import_jsx_runtime$1 = require_jsx_runtime();
	msPerMinute = 1e3 * 60;
	msPerHour = msPerMinute * 60;
	defaultPlaybackDuration = 40 * 1e3;
	offset = 6;
	SolarTimeline = class extends import_react.PureComponent {
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
		_speeds = [
			1,
			2,
			3,
			4,
			5,
			6
		];
		constructor(props) {
			super(props);
			const dayStartMs = this.props.dataProvider.dayStartMs;
			const sunRiseOffsetMs = this.props.dataProvider.sunrise.getTime() - dayStartMs;
			const sunSetOffsetMs = this.props.dataProvider.sunset.getTime() - dayStartMs;
			const sunDeltaMs = sunSetOffsetMs - sunRiseOffsetMs;
			const sunOffsetMs = this.props.dataProvider.timeOfDay.getTime() - dayStartMs;
			const currentTimeOffsetMs = this.ensureRange(sunOffsetMs, sunRiseOffsetMs, sunSetOffsetMs);
			const shadowColor = this.props.dataProvider.shadowColor;
			const duration = this.props.duration ? this.props.duration : defaultPlaybackDuration;
			const speed = this.props.speed ? this.props.speed : 2;
			const adjustedDuration = duration / speed;
			this.setPlaybackTimeBySunTime(currentTimeOffsetMs, sunRiseOffsetMs, sunDeltaMs, adjustedDuration);
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
			let nextSunOffset = Math.floor(this.state.sunRiseOffsetMs + percentComplete * this.state.sunDeltaMs);
			if (percentComplete > .99) if (!this.state.loop) {
				newPlayingState = false;
				nextSunOffset = this.state.sunSetOffsetMs;
				window.cancelAnimationFrame(this._requestFrame);
			} else {
				nextSunOffset = this.state.sunRiseOffsetMs;
				this._totalPlayTime = 0;
			}
			if (this.props.dataProvider.onTimeChanged) {
				const currentSunTime = new Date(this.state.dayStartMs + nextSunOffset);
				this.props.dataProvider.onTimeChanged(currentSunTime);
			}
			this.setState({
				isPlaying: newPlayingState,
				currentTimeOffsetMs: nextSunOffset
			}, () => {
				if (newPlayingState) this._requestFrame = window.requestAnimationFrame(this._updateAnimation);
			});
		};
		_play(sunTimeMs) {
			this._timeLastCycle = (/* @__PURE__ */ new Date()).getTime();
			this.setState({
				isPlaying: true,
				currentTimeOffsetMs: sunTimeMs
			}, () => {
				this._requestFrame = window.requestAnimationFrame(this._updateAnimation);
				if (this.props.onPlayPause) this.props.onPlayPause(true);
			});
		}
		_onPause = () => {
			if (!this.state.isPlaying) return;
			const currentTime = (/* @__PURE__ */ new Date()).getTime();
			this._totalPlayTime += currentTime - this._timeLastCycle;
			window.cancelAnimationFrame(this._requestFrame);
			this.setState({ isPlaying: false });
			if (this.props.onPlayPause) this.props.onPlayPause(false);
		};
		_onPlay = () => {
			if (this.state.isPlaying) return;
			if (this.state.currentTimeOffsetMs >= this.state.sunSetOffsetMs || this.state.currentTimeOffsetMs <= this.state.sunRiseOffsetMs) {
				this._totalPlayTime = 0;
				this._play(this.state.sunRiseOffsetMs);
			} else this._play(this.state.currentTimeOffsetMs);
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
			/** call dataProvider to update display style */
			const newHours = newDate.getHours();
			const newMinutes = newDate.getMinutes();
			const newSunTime = newHours * msPerHour + newMinutes * msPerMinute;
			const dateWithNewTime = new Date(dayStartMs + newSunTime);
			const currentTimeOffsetMs = this.ensureRange(newSunTime, sunRiseOffsetMs, sunSetOffsetMs);
			this.setPlaybackTimeBySunTime(currentTimeOffsetMs, sunRiseOffsetMs, sunDeltaMs);
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
			this.setState((prevState) => ({ isSettingsOpened: !prevState.isSettingsOpened }));
		};
		ensureRange(value, min, max) {
			return Math.max(Math.min(value, max), min);
		}
		processSunTimeChange(sunTime) {
			if (sunTime === this.state.currentTimeOffsetMs) return;
			const currentTimeOffsetMs = this.ensureRange(sunTime, this.state.sunRiseOffsetMs, this.state.sunSetOffsetMs);
			if (this.props.dataProvider.onTimeChanged) {
				const currentSunTime = new Date(this.state.dayStartMs + currentTimeOffsetMs);
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
			this.setState({
				speed: value,
				adjustedDuration
			});
		};
		_onToggleLoop = () => {
			this.setState((prevState) => ({ loop: !prevState.loop }));
		};
		_formatTime = (ms) => {
			const date = new Date(ms);
			const amLabel = UiComponents.translate("time.am");
			const pmLabel = UiComponents.translate("time.pm");
			let hours = adjustDateToTimezone(date, this.props.dataProvider.timeZoneOffset * 60).getHours();
			const minutes = date.getMinutes();
			const abbrev = hours < 12 ? amLabel : hours === 24 ? amLabel : pmLabel;
			hours = hours > 12 ? hours - 12 : hours;
			return `${hours.toLocaleString(void 0, { minimumIntegerDigits: 2 })}:${minutes.toLocaleString(void 0, { minimumIntegerDigits: 2 })} ${abbrev}`;
		};
		getLocalTime(ticks) {
			return adjustDateToTimezone(new Date(ticks), this.props.dataProvider.timeZoneOffset * 60);
		}
		render() {
			const { dataProvider } = this.props;
			const { speed: currentSpeed, loop, currentTimeOffsetMs, sunRiseOffsetMs, sunSetOffsetMs } = this.state;
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
			const localTime = this.getLocalTime(this.state.dayStartMs + this.state.currentTimeOffsetMs);
			const formattedTime = this._formatTime(dataProvider.dayStartMs + currentTimeOffsetMs);
			const formattedDate = `${months[localTime.getMonth()]}, ${localTime.getDate()}`;
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "solar-timeline-wrapper",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(Flex, {
						flexWrap: "wrap",
						gap: "none",
						className: "solar-timeline-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PlayButton, {
							isPlaying: this.state.isPlaying,
							onPlay: this._onPlay,
							onPause: this._onPause
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Popover, {
							content: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(DatePicker, {
								date: localTime,
								onChange: this._onDateChange,
								showTime: true,
								use12Hours: true
							}),
							visible: this.state.isDateOpened,
							onVisibleChange: (isDateOpened) => {
								this.setState({ isDateOpened });
							},
							placement: "top",
							middleware: { offset },
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(CalendarButton, {
								onClick: () => {
									const isDateOpened = !this.state.isDateOpened;
									this.setState({ isDateOpened });
								},
								children: [
									formattedDate,
									" @ ",
									formattedTime
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Timeline, {
						dayStartMs: dataProvider.dayStartMs,
						sunSetOffsetMs,
						sunRiseOffsetMs,
						currentTimeOffsetMs,
						onChange: this._onChange,
						onUpdate: this._onUpdate,
						formatTime: this._formatTime,
						isPlaying: this.state.isPlaying
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(Flex, {
						justifyContent: "flex-end",
						flexWrap: "wrap",
						gap: "none",
						className: "solar-timeline-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(VisuallyHidden, { children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Label, {
								htmlFor: "speed",
								children: "Timeline speed"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
								content: UiIModelComponents.translate("solartimeline.speed"),
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Select, {
									native: true,
									styleType: "borderless",
									triggerProps: { name: "speed" },
									onChange: (newValue) => this._onSpeedChange(Number(newValue)),
									value: currentSpeed.toString(),
									options: this._speeds.map((speed) => ({
										value: speed.toString(),
										label: `${speed}x`
									}))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(IconButton, {
								styleType: "borderless",
								label: UiIModelComponents.translate("timeline.repeat"),
								onClick: this._onToggleLoop,
								isActive: loop,
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SvgLoop, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Popover, {
								content: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(ColorPicker, {
									selectedColor: this.state.shadowColor.colors,
									onChangeComplete: (color) => {
										const colorDef = ColorDef.create(color.toTbgr());
										this.setState({ shadowColor: colorDef }, () => this.props.dataProvider.shadowColor = colorDef);
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Text, {
											variant: "title",
											as: "h2",
											style: { textAlign: "center" },
											children: UiIModelComponents.translate("solarsettings.shadowcolor")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ColorBuilder, {}),
										/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ColorInputPanel, { defaultColorFormat: "hsl" }),
										/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ColorPalette, { colors: this._presetColors.map((color) => color.colors) })
									]
								}),
								placement: "top",
								middleware: { offset },
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(IconButton, {
									styleType: "borderless",
									"data-testid": "shadow-settings-button",
									label: UiIModelComponents.translate("timeline.settings"),
									onClick: this._onOpenSettingsPopup,
									children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SvgSettings, {})
								})
							})
						]
					})
				]
			});
		}
	};
	CalendarButton = import_react.forwardRef(function CalendarButton({ children, onClick }, ref) {
		const { translate } = useTranslation();
		const tooltip = translate("solartimeline.dateTime");
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Tooltip, {
			content: tooltip,
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Button, {
				styleType: "borderless",
				startIcon: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SvgCalendar, {}),
				"data-testid": "solar-date-time-button",
				title: tooltip,
				onClick,
				ref,
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "solar-timeline-date-time",
					children
				})
			})
		});
	});
	SolarTimeline.__docgenInfo = {
		"description": "Solar Timeline\n@alpha",
		"methods": [{
			"name": "getLocalTime",
			"docblock": null,
			"modifiers": [],
			"params": [{
				"name": "ticks",
				"optional": false,
				"type": { "name": "number" }
			}],
			"returns": { "type": { "name": "Date" } }
		}],
		"displayName": "SolarTimeline",
		"props": {
			"dataProvider": {
				"required": true,
				"tsType": { "name": "SolarDataProvider" },
				"description": ""
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
				"description": ""
			},
			"duration": {
				"required": false,
				"tsType": { "name": "number" },
				"description": ""
			},
			"speed": {
				"required": false,
				"tsType": { "name": "number" },
				"description": ""
			}
		}
	};
}));
//#endregion
//#region src/components/SolarTimeline.stories.tsx
var import_jsx_runtime, AlignComponent, PageLayout, meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_SolarTimeline();
	init_imodel_components_react();
	import_jsx_runtime = require_jsx_runtime();
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
	meta = {
		title: "Components/SolarTimeline",
		component: SolarTimeline,
		tags: ["autodocs"],
		decorators: [
			AlignComponent,
			InitializerDecorator,
			AppUiDecorator,
			PageLayout
		],
		parameters: {
			layout: "fullscreen",
			backgrounds: { default: "background-backdrop" }
		}
	};
	Basic = { args: { dataProvider: new BaseSolarDataProvider() } };
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
	__namedExportsOrder = ["Basic"];
}))();
export { Basic, __namedExportsOrder, meta as default };
