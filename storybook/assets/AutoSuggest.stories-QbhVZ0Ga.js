import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { i as init_esm, tt as Input } from "./iframe-DrBiZGmV.js";
import { X as init_core_bentley, t as require_Key_enum, xn as Logger } from "./Key.enum-DhBIjxOv.js";
import { or as require_dist } from "./components-react-DigDa1CF.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
import { n as init_UiCore, t as UiCore } from "./UiCore-DVj5LZGU.js";
//#region ../../ui/core-react/src/core-react/autosuggest/AutoSuggest.scss
var init_AutoSuggest$1 = __esmMin((() => {}));
//#endregion
//#region ../../ui/core-react/src/core-react/autosuggest/AutoSuggest.tsx
var import_react, import_dist, import_Key_enum, import_jsx_runtime, AutoSuggest;
var init_AutoSuggest = __esmMin((() => {
	init_AutoSuggest$1();
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_core_bentley();
	init_esm();
	import_dist = /* @__PURE__ */ __toESM(require_dist(), 1);
	import_Key_enum = require_Key_enum();
	init_UiCore();
	import_jsx_runtime = require_jsx_runtime();
	AutoSuggest = class extends import_react.PureComponent {
		_isMounted = false;
		constructor(props) {
			super(props);
			this.state = {
				inputValue: this.getLabel(props.value),
				suggestions: []
			};
		}
		componentDidMount() {
			this._isMounted = true;
		}
		componentWillUnmount() {
			this._isMounted = false;
		}
		/** @internal */
		componentDidUpdate(prevProps) {
			if (this.props.value !== prevProps.value || this.props.options !== prevProps.options) this.setState((_prevState, props) => ({ inputValue: this.getLabel(props.value) }));
		}
		_onChange = (e) => {
			let newValue = "";
			if (e.target.tagName === "LI" && e.target.textContent) newValue = e.target.textContent;
			else if (e.target.value) newValue = e.target.value;
			this.setState({ inputValue: newValue });
		};
		_onFocus = (e) => {
			if (this.props.onInputFocus) this.props.onInputFocus(e);
		};
		/** Autosuggest will call this function every time you need to update suggestions. */
		_onSuggestionsFetchRequested = async (request) => {
			const value = request.value;
			const suggestions = await this._getSuggestions(value);
			if (this._isMounted) this.setState({ suggestions });
		};
		/** Autosuggest will call this function every time you need to clear suggestions. */
		_onSuggestionsClearRequested = () => {
			this.setState({ suggestions: [] });
			this.props.onSuggestionsClearRequested && this.props.onSuggestionsClearRequested();
		};
		_onSuggestionSelected = (_event, data) => {
			this.props.onSuggestionSelected(data.suggestion);
		};
		/** Teach Autosuggest how to calculate suggestions for any given input value. */
		_getSuggestions = async (value) => {
			if (typeof this.props.options === "function") return Promise.resolve(this.props.options(value));
			if (this.props.getSuggestions) return this.props.getSuggestions(value);
			if (this.props.options === void 0) {
				Logger.logError(UiCore.loggerCategory("AutoSuggest"), `props.options or props.getSuggestions should be provided`);
				return Promise.resolve([]);
			}
			const inputValue = value.trim().toLowerCase();
			const inputLength = inputValue.length;
			return Promise.resolve(inputLength === 0 ? [] : this.props.options.filter((data) => {
				return data.label.toLowerCase().includes(inputValue) || data.value.toLowerCase().includes(inputValue);
			}));
		};
		/** When suggestion is clicked, Autosuggest needs to populate the input based on the clicked suggestion.  */
		_getSuggestionValue = (suggestion) => suggestion.label;
		/** Render each suggestion. */
		_renderSuggestion = (suggestion) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: suggestion.label });
		getLabel(value) {
			let label = "";
			if (this.props.getLabel) label = this.props.getLabel(value);
			else if (this.props.options instanceof Array) {
				const entry = this.props.options.find((data) => data.value === value);
				if (entry) label = entry.label;
			} else Logger.logError(UiCore.loggerCategory("AutoSuggest"), `props.getLabel should be provided when props.options is a function`);
			return label;
		}
		_handleKeyDown = (e) => {
			switch (e.key) {
				case import_Key_enum.Key.Enter.valueOf():
					if (this.props.onPressEnter) this.props.onPressEnter(e);
					break;
				case import_Key_enum.Key.Escape.valueOf():
					if (this.props.onPressEscape) this.props.onPressEscape(e);
					break;
				case import_Key_enum.Key.Tab.valueOf():
					if (this.props.onPressTab) this.props.onPressTab(e);
					break;
			}
		};
		_theme = {
			container: "uicore-autosuggest__container",
			containerOpen: "uicore-autosuggest__container--open",
			input: "uicore-autosuggest__input",
			inputOpen: "uicore-autosuggest__input--open",
			inputFocused: "uicore-autosuggest__input--focused",
			suggestionsContainer: "uicore-autosuggest__suggestions-container",
			suggestionsContainerOpen: "uicore-autosuggest__suggestions-container--open",
			suggestionsList: "uicore-autosuggest__suggestions-list",
			suggestion: "uicore-autosuggest__suggestion",
			suggestionFirst: "uicore-autosuggest__suggestion--first",
			suggestionHighlighted: "uicore-autosuggest__suggestion--highlighted",
			sectionContainer: "uicore-autosuggest__section-container",
			sectionContainerFirst: "uicore-autosuggest__section-container--first",
			sectionTitle: "uicore-autosuggest__section-title"
		};
		render() {
			const { inputValue, suggestions } = this.state;
			const { value, onChange, placeholder, options, onSuggestionSelected, setFocus, alwaysRenderSuggestions, onPressEnter, onPressEscape, onPressTab, onInputFocus, getLabel, getSuggestions, renderInputComponent, renderSuggestionsContainer, onSuggestionsClearRequested, ...props } = this.props;
			const inputPlaceholder = !inputValue ? placeholder : void 0;
			const inputProps = {
				...props,
				value: inputValue,
				onChange: this._onChange,
				onFocus: this._onFocus,
				placeholder: inputPlaceholder,
				autoFocus: setFocus
			};
			const defaultRenderInputComponent = (renderInputProps) => {
				const { size, ...other } = renderInputProps;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...other });
			};
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: this.props.className,
				style: this.props.style,
				onKeyDown: this._handleKeyDown,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dist.default, {
					theme: this._theme,
					suggestions,
					onSuggestionsFetchRequested: this._onSuggestionsFetchRequested,
					onSuggestionsClearRequested: this._onSuggestionsClearRequested,
					getSuggestionValue: this._getSuggestionValue,
					renderSuggestion: this._renderSuggestion,
					inputProps,
					onSuggestionSelected: this._onSuggestionSelected,
					alwaysRenderSuggestions,
					renderInputComponent: renderInputComponent || defaultRenderInputComponent,
					renderSuggestionsContainer
				})
			});
		}
	};
	AutoSuggest.__docgenInfo = {
		"description": "Auto Suggest React component. Uses the react-autosuggest component internally.\n@public\n@deprecated in 4.16.0. Use {@link https://itwinui.bentley.com/ iTwinUI components} instead.",
		"methods": [],
		"displayName": "AutoSuggest",
		"props": {
			"className": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Custom CSS class name"
			},
			"style": {
				"required": false,
				"tsType": {
					"name": "ReactCSSProperties",
					"raw": "React.CSSProperties"
				},
				"description": "Custom CSS style properties"
			},
			"itemId": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id"
			},
			"value": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Optional input value override."
			},
			"options": {
				"required": false,
				"tsType": {
					"name": "union",
					"raw": "AutoSuggestData[] | GetAutoSuggestDataFunc",
					"elements": [{
						"name": "Array",
						"elements": [{ "name": "AutoSuggestData" }],
						"raw": "AutoSuggestData[]"
					}, {
						"name": "signature",
						"type": "function",
						"raw": "(value: string) => AutoSuggestData[]",
						"signature": {
							"arguments": [{
								"type": { "name": "string" },
								"name": "value"
							}],
							"return": {
								"name": "Array",
								"elements": [{ "name": "AutoSuggestData" }],
								"raw": "AutoSuggestData[]"
							}
						}
					}]
				},
				"description": "Options for dropdown."
			},
			"getSuggestions": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(\n  value: string\n) => Promise<AutoSuggestData[]>",
					"signature": {
						"arguments": [{
							"type": { "name": "string" },
							"name": "value"
						}],
						"return": {
							"name": "Promise",
							"elements": [{
								"name": "Array",
								"elements": [{ "name": "AutoSuggestData" }],
								"raw": "AutoSuggestData[]"
							}],
							"raw": "Promise<AutoSuggestData[]>"
						}
					}
				},
				"description": "Asynchronously calculate suggestions for any given input value."
			},
			"getLabel": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(value: string | undefined) => string",
					"signature": {
						"arguments": [{
							"type": {
								"name": "union",
								"raw": "string | undefined",
								"elements": [{ "name": "string" }, { "name": "undefined" }]
							},
							"name": "value"
						}],
						"return": { "name": "string" }
					}
				},
				"description": "Gets a label associated with a given value"
			},
			"onSuggestionSelected": {
				"required": true,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(selected: AutoSuggestData) => void",
					"signature": {
						"arguments": [{
							"type": { "name": "AutoSuggestData" },
							"name": "selected"
						}],
						"return": { "name": "void" }
					}
				},
				"description": "Handler for when suggested selected."
			},
			"onPressEnter": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(e: React.KeyboardEvent<HTMLInputElement>) => void",
					"signature": {
						"arguments": [{
							"type": {
								"name": "ReactKeyboardEvent",
								"raw": "React.KeyboardEvent<HTMLInputElement>",
								"elements": [{ "name": "HTMLInputElement" }]
							},
							"name": "e"
						}],
						"return": { "name": "void" }
					}
				},
				"description": "Handler for Enter key."
			},
			"onPressEscape": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(e: React.KeyboardEvent<HTMLInputElement>) => void",
					"signature": {
						"arguments": [{
							"type": {
								"name": "ReactKeyboardEvent",
								"raw": "React.KeyboardEvent<HTMLInputElement>",
								"elements": [{ "name": "HTMLInputElement" }]
							},
							"name": "e"
						}],
						"return": { "name": "void" }
					}
				},
				"description": "Handler for Escape key."
			},
			"onPressTab": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(e: React.KeyboardEvent<HTMLInputElement>) => void",
					"signature": {
						"arguments": [{
							"type": {
								"name": "ReactKeyboardEvent",
								"raw": "React.KeyboardEvent<HTMLInputElement>",
								"elements": [{ "name": "HTMLInputElement" }]
							},
							"name": "e"
						}],
						"return": { "name": "void" }
					}
				},
				"description": "Handler for Tab key."
			},
			"onInputFocus": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "(e: React.FocusEvent<HTMLInputElement>) => void",
					"signature": {
						"arguments": [{
							"type": {
								"name": "ReactFocusEvent",
								"raw": "React.FocusEvent<HTMLInputElement>",
								"elements": [{ "name": "HTMLInputElement" }]
							},
							"name": "e"
						}],
						"return": { "name": "void" }
					}
				},
				"description": "Handler for input receiving focus."
			},
			"onSuggestionsClearRequested": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "() => void",
					"signature": {
						"arguments": [],
						"return": { "name": "void" }
					}
				},
				"description": "Called every time you need to clear suggestions."
			},
			"setFocus": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Indicates whether to set focus to the input element"
			},
			"renderInputComponent": {
				"required": false,
				"tsType": { "name": "any" },
				"description": "Use it only if you need to customize the rendering of the input.\n@internal"
			},
			"renderSuggestionsContainer": {
				"required": false,
				"tsType": { "name": "ReactAutosuggest.RenderSuggestionsContainer" },
				"description": "Use it if you want to customize things inside the suggestions container beyond rendering the suggestions themselves.\n@internal"
			},
			"alwaysRenderSuggestions": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "@internal"
			}
		}
	};
}));
//#endregion
//#region src/components/AutoSuggest.stories.tsx
var meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_Decorators();
	init_AutoSuggest();
	meta = {
		title: "Components/AutoSuggest",
		component: AutoSuggest,
		tags: ["autodocs"],
		decorators: [AppUiDecorator]
	};
	Basic = { args: { options: [
		{
			value: "1",
			label: "Label 1"
		},
		{
			value: "1_1",
			label: "Label 1_1"
		},
		{
			value: "1_2",
			label: "Label 1_2"
		},
		{
			value: "2",
			label: "Label 2"
		},
		{
			value: "3_1",
			label: "Label 3_1"
		},
		{
			value: "3_2",
			label: "Label 3_2"
		}
	] } };
	Basic.parameters = {
		...Basic.parameters,
		docs: {
			...Basic.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    options: [{\n      value: \"1\",\n      label: \"Label 1\"\n    }, {\n      value: \"1_1\",\n      label: \"Label 1_1\"\n    }, {\n      value: \"1_2\",\n      label: \"Label 1_2\"\n    }, {\n      value: \"2\",\n      label: \"Label 2\"\n    }, {\n      value: \"3_1\",\n      label: \"Label 3_1\"\n    }, {\n      value: \"3_2\",\n      label: \"Label 3_2\"\n    }]\n  }\n}",
				...Basic.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Basic"];
}))();
export { Basic, __namedExportsOrder, meta as default };
