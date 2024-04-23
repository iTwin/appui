/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as moq from "typemoq";
import type { ScreenViewport } from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import type {
  ActiveContentChangedEventArgs,
  ContentControlActivatedEventArgs,
  ContentLayoutActivatedEventArgs,
  FrontstageActivatedEventArgs,
  FrontstageReadyEventArgs,
  ModalFrontstageChangedEventArgs,
  NavigationAidActivatedEventArgs,
  ToolActivatedEventArgs,
  WidgetStateChangedEventArgs,
} from "../../appui-react";
import { SyncUiEventDispatcher, UiFramework } from "../../appui-react";
import type { UiSyncEventArgs } from "../../appui-react/syncui/UiSyncEvent";

const timeToWaitForUiSyncCallback = 60;

describe("SyncUiEventDispatcher", () => {
  beforeEach(() => {
    SyncUiEventDispatcher.setTimeoutPeriod(2);
  });

  it("test hasEventOfInterest", () => {
    const eventIds = new Set<string>();
    eventIds.add("dog");
    eventIds.add("cat");
    eventIds.add("rabbit");

    expect(
      SyncUiEventDispatcher.hasEventOfInterest(eventIds, [
        "dog",
        "cat",
        "rabbit",
      ])
    ).toEqual(true);
    expect(
      SyncUiEventDispatcher.hasEventOfInterest(eventIds, ["dog", "cat"])
    ).toEqual(true);
    expect(SyncUiEventDispatcher.hasEventOfInterest(eventIds, ["dog"])).toEqual(
      true
    );
    expect(
      SyncUiEventDispatcher.hasEventOfInterest(eventIds, ["cat", "rabbit"])
    ).toEqual(true);
    expect(
      SyncUiEventDispatcher.hasEventOfInterest(eventIds, ["rabbit"])
    ).toEqual(true);
    // idsOfInterest are now case insensitive - the set of eventIds held by the dispacther are in lower case.
    expect(
      SyncUiEventDispatcher.hasEventOfInterest(eventIds, ["Rabbit"])
    ).toEqual(true);
    expect(
      SyncUiEventDispatcher.hasEventOfInterest(eventIds, [
        "DOG",
        "cAT",
        "Rabbit",
      ])
    ).toEqual(true);
    expect(
      SyncUiEventDispatcher.hasEventOfInterest(eventIds, ["horse"])
    ).toEqual(false);

    const dummyImodelId = "dummy";
    UiFramework.setActiveIModelId(dummyImodelId);
    expect(UiFramework.getActiveIModelId()).toEqual(dummyImodelId);
  });

  it("test immediate sync event", () => {
    let callbackCalled = false;
    let callbackHasExpectedEventId = false;

    // eslint-disable-next-line deprecation/deprecation
    const handleSyncUiEvent = (args: UiSyncEventArgs): void => {
      callbackCalled = true;
      callbackHasExpectedEventId = args.eventIds.has("event1");
    };

    SyncUiEventDispatcher.onSyncUiEvent.addListener(handleSyncUiEvent);

    SyncUiEventDispatcher.dispatchImmediateSyncUiEvent("Event1");
    expect(callbackCalled).toEqual(true);
    expect(callbackHasExpectedEventId).toEqual(true);
    SyncUiEventDispatcher.onSyncUiEvent.removeListener(handleSyncUiEvent);
  });

  it("test timed sync event", () => {
    vi.useFakeTimers();
    let callback1Called = false;
    let callback1HasExpectedEventId = false;

    // eslint-disable-next-line deprecation/deprecation
    const handleSyncUiEvent1 = (args: UiSyncEventArgs): void => {
      callback1Called = true;
      callback1HasExpectedEventId = args.eventIds.has("event1");
    };

    SyncUiEventDispatcher.onSyncUiEvent.addListener(handleSyncUiEvent1);
    SyncUiEventDispatcher.dispatchSyncUiEvent("Event1");
    expect(callback1Called).toEqual(false);

    vi.advanceTimersByTime(timeToWaitForUiSyncCallback);

    expect(callback1Called).toEqual(true);
    expect(callback1HasExpectedEventId).toEqual(true);
    SyncUiEventDispatcher.onSyncUiEvent.removeListener(handleSyncUiEvent1);
  });

  it("test multiple event Id with a timed sync event", () => {
    vi.useFakeTimers();
    let callbackCalled = false;
    let callbackHasExpectedEventIds = false;

    // eslint-disable-next-line deprecation/deprecation
    const handleSyncUiEvent = (args: UiSyncEventArgs): void => {
      callbackCalled = true;
      callbackHasExpectedEventIds =
        args.eventIds.has("event1") && args.eventIds.has("event2");
    };

    SyncUiEventDispatcher.onSyncUiEvent.addListener(handleSyncUiEvent);

    SyncUiEventDispatcher.dispatchSyncUiEvents(["Event1", "Event2"]);
    expect(callbackCalled).toEqual(false);

    vi.advanceTimersByTime(timeToWaitForUiSyncCallback);

    expect(callbackCalled).toEqual(true);
    expect(callbackHasExpectedEventIds).toEqual(true);
    SyncUiEventDispatcher.onSyncUiEvent.removeListener(handleSyncUiEvent);
  });

  it("test multiple event Id with a multiple dispatches", () => {
    vi.useFakeTimers();
    let callbackCalled = false;
    let callbackHasExpectedEventIds = false;

    // eslint-disable-next-line deprecation/deprecation
    const handleSyncUiEvent = (args: UiSyncEventArgs): void => {
      callbackCalled = true;
      callbackHasExpectedEventIds =
        args.eventIds.has("event1") &&
        args.eventIds.has("event2") &&
        args.eventIds.has("event3");
    };

    SyncUiEventDispatcher.onSyncUiEvent.addListener(handleSyncUiEvent);

    SyncUiEventDispatcher.dispatchSyncUiEvents(["Event1", "Event2"]);
    expect(callbackCalled).toEqual(false);
    SyncUiEventDispatcher.dispatchSyncUiEvent("Event3");
    expect(callbackCalled).toEqual(false);

    vi.runAllTimers();

    expect(callbackCalled).toEqual(true);
    expect(callbackHasExpectedEventIds).toEqual(true);
    SyncUiEventDispatcher.onSyncUiEvent.removeListener(handleSyncUiEvent);
  });

  it("Test event handlers", () => {
    vi.useFakeTimers();
    const handleSyncUiEvent = vi.fn();

    SyncUiEventDispatcher.initialize();
    SyncUiEventDispatcher.onSyncUiEvent.addListener(handleSyncUiEvent);

    handleSyncUiEvent.mockReset();
    UiFramework.frontstages.onContentControlActivatedEvent.emit(
      {} as ContentControlActivatedEventArgs // eslint-disable-line deprecation/deprecation
    );
    vi.runAllTimers();
    expect(handleSyncUiEvent).toHaveBeenCalledOnce();

    handleSyncUiEvent.mockReset();
    UiFramework.frontstages.onContentLayoutActivatedEvent.emit(
      {} as ContentLayoutActivatedEventArgs // eslint-disable-line deprecation/deprecation
    );
    vi.runAllTimers();
    expect(handleSyncUiEvent).toHaveBeenCalledOnce();

    handleSyncUiEvent.mockReset();
    UiFramework.frontstages.onFrontstageActivatedEvent.emit(
      {} as FrontstageActivatedEventArgs // eslint-disable-line deprecation/deprecation
    );
    vi.runAllTimers();
    expect(handleSyncUiEvent).toHaveBeenCalledOnce();

    handleSyncUiEvent.mockReset();
    UiFramework.frontstages.onFrontstageReadyEvent.emit(
      {} as FrontstageReadyEventArgs // eslint-disable-line deprecation/deprecation
    );
    vi.runAllTimers();
    expect(handleSyncUiEvent).toHaveBeenCalledOnce();

    handleSyncUiEvent.mockReset();
    UiFramework.frontstages.onModalFrontstageChangedEvent.emit(
      {} as ModalFrontstageChangedEventArgs // eslint-disable-line deprecation/deprecation
    );
    vi.runAllTimers();
    expect(handleSyncUiEvent).toHaveBeenCalledOnce();

    handleSyncUiEvent.mockReset();
    UiFramework.frontstages.onNavigationAidActivatedEvent.emit(
      {} as NavigationAidActivatedEventArgs // eslint-disable-line deprecation/deprecation
    );
    vi.runAllTimers();
    expect(handleSyncUiEvent).toHaveBeenCalledOnce();

    handleSyncUiEvent.mockReset();
    UiFramework.frontstages.onToolActivatedEvent.emit(
      {} as ToolActivatedEventArgs // eslint-disable-line deprecation/deprecation
    );
    vi.runAllTimers();
    expect(handleSyncUiEvent).toHaveBeenCalledOnce();

    handleSyncUiEvent.mockReset();
    UiFramework.frontstages.onWidgetStateChangedEvent.emit(
      {} as WidgetStateChangedEventArgs // eslint-disable-line deprecation/deprecation
    );
    vi.runAllTimers();
    expect(handleSyncUiEvent).toHaveBeenCalledOnce();

    handleSyncUiEvent.mockReset();
    UiFramework.backstage.open();
    vi.runAllTimers();
    expect(handleSyncUiEvent).toHaveBeenCalledOnce();

    handleSyncUiEvent.mockReset();
    UiFramework.content.onActiveContentChangedEvent.emit(
      {} as ActiveContentChangedEventArgs // eslint-disable-line deprecation/deprecation
    );
    vi.runAllTimers();
    expect(handleSyncUiEvent).toHaveBeenCalledOnce();

    SyncUiEventDispatcher.onSyncUiEvent.removeListener(handleSyncUiEvent);
  });

  describe("SelectedViewportChanged", () => {
    it("handles onSelectedViewportChanged", () => {
      IModelApp.viewManager.onSelectedViewportChanged.raiseEvent({});
    });

    it("handles onSelectedViewportChanged with previous", () => {
      const viewportMock = moq.Mock.ofType<ScreenViewport>();
      IModelApp.viewManager.onSelectedViewportChanged.raiseEvent({
        previous: viewportMock.object,
      });
    });
  });
});
