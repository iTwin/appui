import { g as SyncUiEventDispatcher } from "./appui-react-Cfb3yxNv.js";
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
