/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as sinon from "sinon";
import * as moq from "typemoq";

import {
  FrontstageManager,
  FrontstageActivatedEventArgs, FrontstageReadyEventArgs,
  ModalFrontstageChangedEventArgs,
  ToolActivatedEventArgs,
} from "../../ui-framework/frontstage/FrontstageManager";
import { Backstage, BackstageEventArgs } from "../../ui-framework/backstage/Backstage";
import { WorkflowManager, TaskActivatedEventArgs, WorkflowActivatedEventArgs } from "../../ui-framework/workflow/Workflow";
import { ContentViewManager, ActiveContentChangedEventArgs } from "../../ui-framework/content/ContentViewManager";
import {
  UiFramework,
  SyncUiEventDispatcher,
  SyncUiEventArgs,
  ContentControlActivatedEventArgs,
  ContentLayoutActivatedEventArgs,
  WidgetStateChangedEventArgs,
  NavigationAidActivatedEventArgs,
} from "../../ui-framework";
import TestUtils from "../TestUtils";

import { IModelToken } from "@bentley/imodeljs-common";
import { IModelConnection, SelectionSet, MockRender, IModelApp, ScreenViewport } from "@bentley/imodeljs-frontend";
import { RpcRequestsHandler, InstanceKey } from "@bentley/presentation-common";
import { Presentation, SelectionManager, SelectionScopesManager, SelectionScopesManagerProps } from "@bentley/presentation-frontend";
// tslint:disable-next-line: no-direct-imports
import {
  createRandomSelectionScope, createRandomECInstanceKey, createRandomId,
} from "@bentley/presentation-common/lib/test/_helpers/random";

const timeToWaitForUiSyncCallback = 60;

describe("SyncUiEventDispatcher", () => {
  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  beforeEach(() => {
    SyncUiEventDispatcher.setTimeoutPeriod(2);
  });

  it("test hasEventOfInterest", () => {
    const eventIds = new Set<string>();
    eventIds.add("dog");
    eventIds.add("cat");
    eventIds.add("rabbit");

    expect(SyncUiEventDispatcher.hasEventOfInterest(eventIds, ["dog", "cat", "rabbit"])).to.be.true;
    expect(SyncUiEventDispatcher.hasEventOfInterest(eventIds, ["dog", "cat"])).to.be.true;
    expect(SyncUiEventDispatcher.hasEventOfInterest(eventIds, ["dog"])).to.be.true;
    expect(SyncUiEventDispatcher.hasEventOfInterest(eventIds, ["cat", "rabbit"])).to.be.true;
    expect(SyncUiEventDispatcher.hasEventOfInterest(eventIds, ["rabbit"])).to.be.true;
    // test is case sensitive
    expect(SyncUiEventDispatcher.hasEventOfInterest(eventIds, ["Rabbit"])).to.be.false;

    const dummyImodelId = "dummy";
    UiFramework.setActiveIModelId(dummyImodelId);
    expect(UiFramework.getActiveIModelId()).to.be.equal(dummyImodelId);
  });

  it("test immediate sync event", () => {
    let callbackCalled = false;
    let callbackHasExpectedEventId = false;

    const handleSyncUiEvent = (args: SyncUiEventArgs): void => {
      callbackCalled = true;
      callbackHasExpectedEventId = args.eventIds.has("event1");
    };

    SyncUiEventDispatcher.onSyncUiEvent.addListener(handleSyncUiEvent);

    SyncUiEventDispatcher.dispatchImmediateSyncUiEvent("Event1");
    expect(callbackCalled).to.be.true;
    expect(callbackHasExpectedEventId).to.be.true;
    SyncUiEventDispatcher.onSyncUiEvent.removeListener(handleSyncUiEvent);
  });

  it("test timed sync event", async () => {
    let callback1Called = false;
    let callback1HasExpectedEventId = false;

    const handleSyncUiEvent1 = (args: SyncUiEventArgs): void => {
      callback1Called = true;
      callback1HasExpectedEventId = args.eventIds.has("event1");
      // tslint:disable-next-line:no-console
      // console.log(`handleSyncUiEvent1 ${[...args.eventIds]}`);
    };

    SyncUiEventDispatcher.onSyncUiEvent.addListener(handleSyncUiEvent1);
    SyncUiEventDispatcher.dispatchSyncUiEvent("Event1");
    expect(callback1Called).to.be.false;

    await TestUtils.tick(timeToWaitForUiSyncCallback);
    // tslint:disable-next-line:no-console
    // console.log(`test1 - just waited ${timeToWaitForUiSyncCallback}ms`);

    expect(callback1Called).to.be.true;
    expect(callback1HasExpectedEventId).to.be.true;
    SyncUiEventDispatcher.onSyncUiEvent.removeListener(handleSyncUiEvent1);
  });

  it("test multiple event Id with a timed sync event", async () => {
    let callbackCalled = false;
    let callbackHasExpectedEventIds = false;

    const handleSyncUiEvent = (args: SyncUiEventArgs): void => {
      callbackCalled = true;
      callbackHasExpectedEventIds = args.eventIds.has("event1") && args.eventIds.has("event2");
      // tslint:disable-next-line:no-console
      // console.log(`handleSyncUiEvent-2 ${[...args.eventIds]}`);
    };

    SyncUiEventDispatcher.onSyncUiEvent.addListener(handleSyncUiEvent);

    SyncUiEventDispatcher.dispatchSyncUiEvents(["Event1", "Event2"]);
    expect(callbackCalled).to.be.false;

    // need to wait until callbacks fire.
    await TestUtils.tick(timeToWaitForUiSyncCallback);
    // tslint:disable-next-line:no-console
    // console.log(`test2 - just waited ${timeToWaitForUiSyncCallback}ms`);

    expect(callbackCalled).to.be.true;
    expect(callbackHasExpectedEventIds).to.be.true;
    SyncUiEventDispatcher.onSyncUiEvent.removeListener(handleSyncUiEvent);
  });

  it.skip("test multiple event Id with a multiple dispatches", async () => {
    let callbackCalled = false;
    let callbackHasExpectedEventIds = false;

    const handleSyncUiEvent = (args: SyncUiEventArgs): void => {
      callbackCalled = true;
      callbackHasExpectedEventIds = args.eventIds.has("event1") && args.eventIds.has("event2") && args.eventIds.has("event3");
      // tslint:disable-next-line:no-console
      // console.log(`handleSyncUiEvent-3 ${[...args.eventIds]}`);
    };

    SyncUiEventDispatcher.onSyncUiEvent.addListener(handleSyncUiEvent);

    SyncUiEventDispatcher.dispatchSyncUiEvents(["Event1", "Event2"]);
    expect(callbackCalled).to.be.false;
    SyncUiEventDispatcher.dispatchSyncUiEvent("Event3");
    expect(callbackCalled).to.be.false;

    await TestUtils.tick(timeToWaitForUiSyncCallback);
    // tslint:disable-next-line:no-console
    // console.log(`test3 - just waited ${timeToWaitForUiSyncCallback}ms`);

    expect(callbackCalled).to.be.true;
    expect(callbackHasExpectedEventIds).to.be.true;
    SyncUiEventDispatcher.onSyncUiEvent.removeListener(handleSyncUiEvent);
  });

  // skipping following because some of these do not get called back within the timeToWaitForUiSyncCallback ms limit when running on Linux.
  it.skip("Test event handlers", async () => {
    const handleSyncUiEvent = sinon.spy();

    SyncUiEventDispatcher.initialize();
    SyncUiEventDispatcher.onSyncUiEvent.addListener(handleSyncUiEvent);

    handleSyncUiEvent.resetHistory();
    FrontstageManager.onContentControlActivatedEvent.emit({} as ContentControlActivatedEventArgs);
    await TestUtils.tick(timeToWaitForUiSyncCallback);
    expect(handleSyncUiEvent.calledOnce).to.be.true;

    handleSyncUiEvent.resetHistory();
    FrontstageManager.onContentLayoutActivatedEvent.emit({} as ContentLayoutActivatedEventArgs);
    await TestUtils.tick(timeToWaitForUiSyncCallback);
    expect(handleSyncUiEvent.calledOnce).to.be.true;

    handleSyncUiEvent.resetHistory();
    FrontstageManager.onFrontstageActivatedEvent.emit({} as FrontstageActivatedEventArgs);
    await TestUtils.tick(timeToWaitForUiSyncCallback);
    expect(handleSyncUiEvent.calledOnce).to.be.true;

    handleSyncUiEvent.resetHistory();
    FrontstageManager.onFrontstageReadyEvent.emit({} as FrontstageReadyEventArgs);
    await TestUtils.tick(timeToWaitForUiSyncCallback);
    expect(handleSyncUiEvent.calledOnce).to.be.true;

    handleSyncUiEvent.resetHistory();
    FrontstageManager.onModalFrontstageChangedEvent.emit({} as ModalFrontstageChangedEventArgs);
    await TestUtils.tick(timeToWaitForUiSyncCallback);
    expect(handleSyncUiEvent.calledOnce).to.be.true;

    handleSyncUiEvent.resetHistory();
    FrontstageManager.onNavigationAidActivatedEvent.emit({} as NavigationAidActivatedEventArgs);
    await TestUtils.tick(timeToWaitForUiSyncCallback);
    expect(handleSyncUiEvent.calledOnce).to.be.true;

    handleSyncUiEvent.resetHistory();
    FrontstageManager.onToolActivatedEvent.emit({} as ToolActivatedEventArgs);
    await TestUtils.tick(timeToWaitForUiSyncCallback);
    expect(handleSyncUiEvent.calledOnce).to.be.true;

    handleSyncUiEvent.resetHistory();
    FrontstageManager.onWidgetStateChangedEvent.emit({} as WidgetStateChangedEventArgs);
    await TestUtils.tick(timeToWaitForUiSyncCallback);
    expect(handleSyncUiEvent.calledOnce).to.be.true;

    handleSyncUiEvent.resetHistory();
    Backstage.onBackstageEvent.emit({} as BackstageEventArgs);
    await TestUtils.tick(timeToWaitForUiSyncCallback);
    expect(handleSyncUiEvent.calledOnce).to.be.true;

    handleSyncUiEvent.resetHistory();
    WorkflowManager.onTaskActivatedEvent.emit({} as TaskActivatedEventArgs);
    await TestUtils.tick(timeToWaitForUiSyncCallback);
    expect(handleSyncUiEvent.calledOnce).to.be.true;

    handleSyncUiEvent.resetHistory();
    WorkflowManager.onWorkflowActivatedEvent.emit({} as WorkflowActivatedEventArgs);
    await TestUtils.tick(timeToWaitForUiSyncCallback);
    expect(handleSyncUiEvent.calledOnce).to.be.true;

    handleSyncUiEvent.resetHistory();
    ContentViewManager.onActiveContentChangedEvent.emit({} as ActiveContentChangedEventArgs);
    await TestUtils.tick(timeToWaitForUiSyncCallback);
    expect(handleSyncUiEvent.calledOnce).to.be.true;

    SyncUiEventDispatcher.onSyncUiEvent.removeListener(handleSyncUiEvent);
  });

  describe("ConnectionEvents", () => {

    const imodelToken = new IModelToken();
    const imodelMock = moq.Mock.ofType<IModelConnection>();
    const rpcRequestsHandlerMock = moq.Mock.ofType<RpcRequestsHandler>();
    const source: string = "test";
    let manager: SelectionScopesManager | undefined;
    let managerProps: SelectionScopesManagerProps;
    let ss: SelectionSet;
    let baseSelection: InstanceKey[];

    const getManager = () => {
      if (!manager)
        manager = new SelectionScopesManager(managerProps);
      return manager;
    };

    const generateSelection = (): InstanceKey[] => {
      return [
        createRandomECInstanceKey(),
        createRandomECInstanceKey(),
        createRandomECInstanceKey(),
      ];
    };

    beforeEach(() => {
      imodelMock.reset();
      imodelMock.setup((x) => x.iModelToken).returns(() => imodelToken);

      ss = new SelectionSet(imodelMock.object);
      imodelMock.setup((x) => x.selectionSet).returns(() => ss);

      rpcRequestsHandlerMock.reset();
      manager = undefined;
      managerProps = {
        rpcRequestsHandler: rpcRequestsHandlerMock.object,
      };

      const result = [createRandomSelectionScope()];
      rpcRequestsHandlerMock
        .setup(async (x) => x.getSelectionScopes(moq.It.isObjectWith({ imodel: imodelToken, locale: undefined })))
        .returns(async () => result)
        .verifiable();

      baseSelection = generateSelection();

      Presentation.selection = new SelectionManager({ scopes: getManager() });
    });

    it("clearConnectionEvents with no intervening initializeConnectionEvents", () => {
      SyncUiEventDispatcher.clearConnectionEvents(imodelMock.object);
      SyncUiEventDispatcher.clearConnectionEvents(imodelMock.object);
    });

    it("initializeConnectionEvents with undefined activeScope", () => {
      getManager().activeScope = undefined;
      SyncUiEventDispatcher.initializeConnectionEvents(imodelMock.object);
    });

    it("initializeConnectionEvents with string activeScope", () => {
      getManager().activeScope = "test";
      SyncUiEventDispatcher.initializeConnectionEvents(imodelMock.object);
    });

    it("initializeConnectionEvents with random activeScope", () => {
      getManager().activeScope = createRandomSelectionScope();
      SyncUiEventDispatcher.initializeConnectionEvents(imodelMock.object);
    });

    it("handles selection change", () => {
      SyncUiEventDispatcher.initializeConnectionEvents(imodelMock.object);

      Presentation.selection.addToSelection(source, imodelMock.object, baseSelection);

      ss.add(createRandomId());

      SyncUiEventDispatcher.clearConnectionEvents(imodelMock.object);
    });

  });

  describe("SelectedViewportChanged", () => {
    before(async () => {
      await TestUtils.initializeUiFramework();
      MockRender.App.startup();
      SyncUiEventDispatcher.initialize();
    });

    after(() => {
      MockRender.App.shutdown();
      TestUtils.terminateUiFramework();
    });

    it("handles onSelectedViewportChanged", () => {
      IModelApp.viewManager.onSelectedViewportChanged.raiseEvent({});
    });

    it("handles onSelectedViewportChanged with previous", () => {
      const viewportMock = moq.Mock.ofType<ScreenViewport>();
      IModelApp.viewManager.onSelectedViewportChanged.raiseEvent({ previous: viewportMock.object });
    });

  });
});
