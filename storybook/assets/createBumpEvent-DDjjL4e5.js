import { e as SyncUiEventDispatcher } from "./DefaultToolSettingsProvider-B6B80iEN.js";
import "./Key.enum-BB2gw-WQ.js";
import "./index-DM9bPmif.js";
import "./index-EDRsojbr.js";
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
export {
  createBumpEvent as c
};
