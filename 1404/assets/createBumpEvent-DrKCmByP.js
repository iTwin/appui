import { o as SyncUiEventDispatcher } from "./appui-react-B5el9kXP.js";
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
