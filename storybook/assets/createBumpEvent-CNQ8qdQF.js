import { k as SyncUiEventDispatcher } from "./appui-react-D3IO1OPE.js";
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
