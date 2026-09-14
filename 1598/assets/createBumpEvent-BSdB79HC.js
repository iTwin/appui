import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { an as SyncUiEventDispatcher, t as init_appui_react } from "./appui-react-LRJiXsWn.js";
//#region assets/placeholder.svg
var placeholder_default;
var init_placeholder = __esmMin((() => {
	placeholder_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20enable-background='new%200%200%2016%2016'%3e%3cpath%20d='M1,1v14h14V1H1z%20M14,2.7v10.6L8.7,8L14,2.7z%20M8,7.3L2.7,2h10.6L8,7.3z%20M7.3,8L2,13.3V2.7L7.3,8z%20M8,8.7l5.3,5.3H2.7L8,8.7z'/%3e%3c/svg%3e";
}));
//#endregion
//#region src/createBumpEvent.tsx
function createBumpEvent() {
	let i = 10;
	const eventId = "bump";
	const bump = () => {
		i++;
		SyncUiEventDispatcher.dispatchSyncUiEvent(eventId);
	};
	return {
		getVal: () => i,
		bump,
		eventId
	};
}
var init_createBumpEvent = __esmMin((() => {
	init_appui_react();
}));
//#endregion
export { placeholder_default as i, init_createBumpEvent as n, init_placeholder as r, createBumpEvent as t };
