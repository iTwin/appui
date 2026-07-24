import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { An as IModelApp, Qn as OutputMessageType, Xn as NotifyMessageDetails, Zn as OutputMessagePriority, st as UiFramework, t as init_appui_react, xn as init_core_frontend } from "./appui-react-CpKk3CrH.js";
import { b as RelativePosition, r as init_appui_abstract } from "./Key.enum-DhBIjxOv.js";
import { n as Page, r as init_AppUiStory, t as AppUiStory } from "./AppUiStory-iQnOALuY.js";
import { i as init_Utils, r as enumArgType } from "./Utils-BkeALKzH.js";
//#region src/frontstage/notifications/OutputMessage.tsx
/** [AppNotificationManager.outputMessage](https://www.itwinjs.org/reference/appui-react/notification/appnotificationmanager/) can be used to display notifications. */
function NotificationsStory({ messagePriority, briefMessage, detailedMessage, messageType, messageAlert, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AppUiStory, {
		layout: "fullscreen",
		onFrontstageActivated: () => {
			UiFramework.dialogs.modal.close();
			UiFramework.dialogs.modeless.close();
			const message = new NotifyMessageDetails(messagePriority, briefMessage, detailedMessage, messageType, messageAlert);
			message.viewport = document.documentElement;
			IModelApp.notifications.outputMessage(message);
		},
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PointerPosition, {})
	});
}
function PointerPosition() {
	import_react.useEffect(() => {
		const listener = (e) => {
			IModelApp.notifications.updatePointerMessage({
				x: e.clientX + 10,
				y: e.clientY - 10
			}, RelativePosition.Top);
		};
		document.addEventListener("pointermove", listener);
		return () => {
			document.removeEventListener("pointermove", listener);
		};
	}, []);
	return null;
}
var import_react, import_jsx_runtime$1;
var init_OutputMessage = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_core_frontend();
	init_AppUiStory();
	init_appui_react();
	init_appui_abstract();
	import_jsx_runtime$1 = require_jsx_runtime();
	NotificationsStory.__docgenInfo = {
		"description": "[AppNotificationManager.outputMessage](https://www.itwinjs.org/reference/appui-react/notification/appnotificationmanager/) can be used to display notifications.",
		"methods": [],
		"displayName": "NotificationsStory",
		"props": {
			"messagePriority": {
				"required": true,
				"tsType": { "name": "OutputMessagePriority" },
				"description": ""
			},
			"briefMessage": {
				"required": true,
				"tsType": {
					"name": "union",
					"raw": "string | HTMLElement",
					"elements": [{ "name": "string" }, { "name": "HTMLElement" }]
				},
				"description": ""
			},
			"detailedMessage": {
				"required": false,
				"tsType": {
					"name": "union",
					"raw": "string | HTMLElement",
					"elements": [{ "name": "string" }, { "name": "HTMLElement" }]
				},
				"description": ""
			},
			"messageType": {
				"required": false,
				"tsType": { "name": "OutputMessageType" },
				"description": ""
			},
			"messageAlert": {
				"required": false,
				"tsType": { "name": "OutputMessageAlert" },
				"description": ""
			}
		}
	};
}));
//#endregion
//#region src/frontstage/notifications/OutputMessage.stories.tsx
var import_jsx_runtime, meta, Basic, Error, Detailed, Pointer, Alert, DetailedAlert, Sticky, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_core_frontend();
	init_AppUiStory();
	init_OutputMessage();
	init_Utils();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Frontstage/Notifications/OutputMessage",
		component: NotificationsStory,
		tags: ["autodocs"],
		parameters: {
			docs: { page: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) },
			layout: "fullscreen"
		},
		args: {
			messagePriority: OutputMessagePriority.Debug,
			briefMessage: "Brief message"
		},
		argTypes: {
			messageType: enumArgType(OutputMessageType),
			messagePriority: enumArgType(OutputMessagePriority)
		}
	};
	Basic = {};
	Error = { args: { messagePriority: OutputMessagePriority.Error } };
	Detailed = { args: { detailedMessage: "Detailed message" } };
	Pointer = { args: { messageType: OutputMessageType.Pointer } };
	Alert = { args: { messageType: OutputMessageType.Alert } };
	DetailedAlert = { args: {
		messageType: OutputMessageType.Alert,
		messagePriority: OutputMessagePriority.Error,
		detailedMessage: "Detailed message that provides additional information to describe the reason for the alert"
	} };
	Sticky = { args: { messageType: OutputMessageType.Sticky } };
	Basic.parameters = {
		...Basic.parameters,
		docs: {
			...Basic.parameters?.docs,
			source: {
				originalSource: "{}",
				...Basic.parameters?.docs?.source
			}
		}
	};
	Error.parameters = {
		...Error.parameters,
		docs: {
			...Error.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    messagePriority: OutputMessagePriority.Error\n  }\n}",
				...Error.parameters?.docs?.source
			}
		}
	};
	Detailed.parameters = {
		...Detailed.parameters,
		docs: {
			...Detailed.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    detailedMessage: \"Detailed message\"\n  }\n}",
				...Detailed.parameters?.docs?.source
			}
		}
	};
	Pointer.parameters = {
		...Pointer.parameters,
		docs: {
			...Pointer.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    messageType: OutputMessageType.Pointer\n  }\n}",
				...Pointer.parameters?.docs?.source
			}
		}
	};
	Alert.parameters = {
		...Alert.parameters,
		docs: {
			...Alert.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    messageType: OutputMessageType.Alert\n  }\n}",
				...Alert.parameters?.docs?.source
			}
		}
	};
	DetailedAlert.parameters = {
		...DetailedAlert.parameters,
		docs: {
			...DetailedAlert.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    messageType: OutputMessageType.Alert,\n    messagePriority: OutputMessagePriority.Error,\n    detailedMessage: \"Detailed message that provides additional information to describe the reason for the alert\"\n  }\n}",
				...DetailedAlert.parameters?.docs?.source
			}
		}
	};
	Sticky.parameters = {
		...Sticky.parameters,
		docs: {
			...Sticky.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    messageType: OutputMessageType.Sticky\n  }\n}",
				...Sticky.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"Basic",
		"Error",
		"Detailed",
		"Pointer",
		"Alert",
		"DetailedAlert",
		"Sticky"
	];
}))();
export { Alert, Basic, Detailed, DetailedAlert, Error, Pointer, Sticky, __namedExportsOrder, meta as default };
