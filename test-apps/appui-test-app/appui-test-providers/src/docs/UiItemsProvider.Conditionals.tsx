/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";

const id = "";
const itemPriority = 0;
const icon = "";
const label = "";
const onClick = () => {};

// __PUBLISH_EXTRACT_START__ AppUI.UiItemsProvider.Conditionals
import {
  SyncUiEventDispatcher,
  ToolbarItemUtilities,
} from "@itwin/appui-react";
import { ConditionalBooleanValue } from "@itwin/appui-abstract";

function createBooleanStore(eventId: string, defaultValue: boolean) {
  let value = defaultValue;

  // Updates the state and dispatches the event which causes conditional item to update.
  const toggle = () => {
    value = !value;
    SyncUiEventDispatcher.dispatchSyncUiEvent(eventId);
  };

  // This is called by the conditional item to get the current value.
  const getValue = () => value;
  return {
    getValue,
    toggle,
    eventId,
  };
}

const isHiddenStore = createBooleanStore(
  "example:item-visibility-changed",
  false
);

// Create a toolbar item that can be hidden by an application.
ToolbarItemUtilities.createActionItem(id, itemPriority, icon, label, onClick, {
  isHidden: new ConditionalBooleanValue(() => {
    // This function is called when the `example-is-hidden-changed` event is dispatched.
    return isHiddenStore.getValue();
  }, [isHiddenStore.eventId]),
});

// Toggles the state which causes the conditional item to update.
<button onClick={() => isHiddenStore.toggle()}>Toggle</button>;

// __PUBLISH_EXTRACT_END__
