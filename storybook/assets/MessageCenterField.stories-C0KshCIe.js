import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { T as MenuItem, i as init_esm, pt as DropdownButton } from "./iframe-DrBiZGmV.js";
import { Xn as NotifyMessageDetails, Zn as OutputMessagePriority, m as MessageCenterField, sn as MessageManager, t as init_appui_react, xn as init_core_frontend } from "./appui-react-CpKk3CrH.js";
import { n as InitializerDecorator, r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region src/components/MessageCenterField.stories.tsx
function createDecorator({ priority, briefMessage = "Message", detailedMessage }) {
	return (Story) => {
		import_react.useEffect(() => {
			MessageManager.clearMessages();
			Array.from({ length: 4 }).forEach((_, index) => {
				const id = index + 1;
				briefMessage = briefMessage ?? "Message";
				MessageManager.addToMessageCenter(new NotifyMessageDetails(priority, `${briefMessage} ${id}`, detailedMessage ? `${detailedMessage} ${id}` : void 0));
			});
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {});
	};
}
var import_react, import_jsx_runtime, AlignComponent, meta, NoMessages, Empty, Success, Info, Warning, Error, Detailed, DynamicDecorator, Dynamic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_Decorators();
	init_appui_react();
	init_core_frontend();
	init_esm();
	import_jsx_runtime = require_jsx_runtime();
	AlignComponent = (Story) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				paddingBlock: "2em",
				gap: "10"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {})
		});
	};
	meta = {
		title: "Components/Status fields/MessageCenterField",
		component: MessageCenterField,
		tags: ["autodocs"],
		decorators: [
			AlignComponent,
			InitializerDecorator,
			AppUiDecorator
		],
		args: { style: { marginTop: 350 } }
	};
	NoMessages = (Story) => {
		import_react.useEffect(() => {
			MessageManager.clearMessages();
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {});
	};
	Empty = { decorators: [NoMessages] };
	Success = { decorators: [createDecorator({ priority: OutputMessagePriority.Success })] };
	Info = { decorators: [createDecorator({ priority: OutputMessagePriority.Info })] };
	Warning = { decorators: [createDecorator({ priority: OutputMessagePriority.Warning })] };
	Error = { decorators: [createDecorator({ priority: OutputMessagePriority.Error })] };
	Detailed = { decorators: [createDecorator({
		priority: OutputMessagePriority.Success,
		briefMessage: "Brief message",
		detailedMessage: "Detailed message"
	})] };
	DynamicDecorator = (Story) => {
		const idRef = import_react.useRef(0);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownButton, {
			menuItems: () => [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
					onClick: () => {
						MessageManager.addToMessageCenter(new NotifyMessageDetails(OutputMessagePriority.Info, `Info Message ${++idRef.current}`));
					},
					children: "Info"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
					onClick: () => {
						MessageManager.addToMessageCenter(new NotifyMessageDetails(OutputMessagePriority.Error, `Error Message ${++idRef.current}`));
					},
					children: "Error"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
					onClick: () => {
						MessageManager.addToMessageCenter(new NotifyMessageDetails(1, `Detailed message ${++idRef.current}`, "Additional message details"));
					},
					children: "Detailed"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
					onClick: () => {
						MessageManager.clearMessages();
					},
					children: "Clear"
				})
			],
			styleType: "borderless",
			style: { alignSelf: "flex-end" },
			children: "Add Messages"
		})] });
	};
	Dynamic = { decorators: [NoMessages, DynamicDecorator] };
	Empty.parameters = {
		...Empty.parameters,
		docs: {
			...Empty.parameters?.docs,
			source: {
				originalSource: "{\n  decorators: [NoMessages]\n}",
				...Empty.parameters?.docs?.source
			}
		}
	};
	Success.parameters = {
		...Success.parameters,
		docs: {
			...Success.parameters?.docs,
			source: {
				originalSource: "{\n  decorators: [createDecorator({\n    priority: OutputMessagePriority.Success\n  })]\n}",
				...Success.parameters?.docs?.source
			}
		}
	};
	Info.parameters = {
		...Info.parameters,
		docs: {
			...Info.parameters?.docs,
			source: {
				originalSource: "{\n  decorators: [createDecorator({\n    priority: OutputMessagePriority.Info\n  })]\n}",
				...Info.parameters?.docs?.source
			}
		}
	};
	Warning.parameters = {
		...Warning.parameters,
		docs: {
			...Warning.parameters?.docs,
			source: {
				originalSource: "{\n  decorators: [createDecorator({\n    priority: OutputMessagePriority.Warning\n  })]\n}",
				...Warning.parameters?.docs?.source
			}
		}
	};
	Error.parameters = {
		...Error.parameters,
		docs: {
			...Error.parameters?.docs,
			source: {
				originalSource: "{\n  decorators: [createDecorator({\n    priority: OutputMessagePriority.Error\n  })]\n}",
				...Error.parameters?.docs?.source
			}
		}
	};
	Detailed.parameters = {
		...Detailed.parameters,
		docs: {
			...Detailed.parameters?.docs,
			source: {
				originalSource: "{\n  decorators: [createDecorator({\n    priority: OutputMessagePriority.Success,\n    briefMessage: \"Brief message\",\n    detailedMessage: \"Detailed message\"\n  })]\n}",
				...Detailed.parameters?.docs?.source
			}
		}
	};
	Dynamic.parameters = {
		...Dynamic.parameters,
		docs: {
			...Dynamic.parameters?.docs,
			source: {
				originalSource: "{\n  decorators: [NoMessages, DynamicDecorator]\n}",
				...Dynamic.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Empty",
		"Success",
		"Info",
		"Warning",
		"Error",
		"Detailed",
		"Dynamic"
	];
}))();
export { Detailed, Dynamic, Empty, Error, Info, Success, Warning, __namedExportsOrder, meta as default };
