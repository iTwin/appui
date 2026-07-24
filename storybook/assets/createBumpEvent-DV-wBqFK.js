import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { t as init_appui_react, tn as SyncUiEventDispatcher } from "./appui-react-CpKk3CrH.js";
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
export { init_createBumpEvent as n, createBumpEvent as t };
