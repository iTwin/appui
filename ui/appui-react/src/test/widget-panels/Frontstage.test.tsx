/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { BentleyError, Logger } from "@itwin/core-bentley";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type { UiStateStorageResult } from "@itwin/core-react";
import { Size, UiStateStorageStatus } from "@itwin/core-react";
import { render, screen } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { expect } from "chai";
import produce from "immer";
import * as React from "react";
import { Provider } from "react-redux";
import * as sinon from "sinon";
import * as moq from "typemoq";
import type {
  FrontstageConfig,
  UiItemsProvider,
  Widget,
  WidgetPanelsFrontstageState,
} from "../../appui-react";
import {
  ActiveFrontstageDefProvider,
  addFrontstageWidgetDefs,
  addPanelSectionWidgetDefs,
  FrontstageDef,
  FrontstageProvider,
  getPanelSectionId,
  initializeNineZoneState,
  initializePanel,
  isFrontstageStateSettingResult,
  ModalFrontstageComposer,
  packNineZoneState,
  restoreNineZoneState,
  StagePanelDef,
  StagePanelLocation,
  StagePanelSection,
  stateVersion,
  UiFramework,
  UiItemsManager,
  UiStateStorageHandler,
  useActiveModalFrontstageInfo,
  useFrontstageManager,
  useLayoutStore,
  useNineZoneDispatch,
  useSavedFrontstageState,
  useSaveFrontstageSettings,
  useUpdateNineZoneSize,
  WidgetDef,
  WidgetPanelsFrontstage,
  WidgetState,
} from "../../appui-react";
import { InternalFrontstageManager } from "../../appui-react/frontstage/InternalFrontstageManager";
import { createLayoutStore } from "../../appui-react/layout/base/LayoutStore";
import { getUniqueId } from "../../appui-react/layout/base/NineZone";
import { createNineZoneState } from "../../appui-react/layout/state/NineZoneState";
import { addPanelWidget } from "../../appui-react/layout/state/internal/PanelStateHelpers";
import {
  addTab,
  createDraggedTabState,
} from "../../appui-react/layout/state/internal/TabStateHelpers";
import { addWidgetToolSettings } from "../../appui-react/layout/state/internal/ToolSettingsStateHelpers";
import { addFloatingWidget } from "../../appui-react/layout/state/internal/WidgetStateHelpers";
import TestUtils, {
  childStructure,
  storageMock,
  stubRaf,
  styleMatch,
  UiStateStorageStub,
} from "../TestUtils";
import { defaultFrontstageConfig } from "../frontstage/FrontstageDef.test";

function createFrontstageState(
  nineZone = createNineZoneState()
): WidgetPanelsFrontstageState {
  return {
    id: "frontstage1",
    nineZone,
    stateVersion,
    version: 0,
  };
}

/** @internal */
export class TestFrontstageUi2 extends FrontstageProvider {
  public static stageId = "TestFrontstageUi2";
  public get id(): string {
    return TestFrontstageUi2.stageId;
  }

  public override frontstageConfig(): FrontstageConfig {
    return {
      id: this.id,
      version: 1,
      contentGroup: TestUtils.TestContentGroup1,
      leftPanel: {
        sections: {
          start: [
            {
              id: "LeftStart1",
              label: "Left Start 1",
              content: "Left Start 1 widget",
            },
          ],
        },
      },
    };
  }
}

/** @internal */
export class TestFrontstageWithHiddenWidget extends FrontstageProvider {
  public static stageId = "TestFrontstageWithHiddenWidget";

  public override get id() {
    return TestFrontstageWithHiddenWidget.stageId;
  }

  public override frontstageConfig(): FrontstageConfig {
    return {
      id: this.id,
      version: 1,
      contentGroup: TestUtils.TestContentGroup1,
    };
  }
}

class TestUi2Provider implements UiItemsProvider {
  public static stageId = "TestUi2Provider";
  public get id(): string {
    return TestUi2Provider.stageId;
  }

  public provideWidgets(
    _stageId: string,
    _stageUsage: string,
    location: StagePanelLocation,
    section?: StagePanelSection
  ) {
    const widgets: Widget[] = [];
    widgets.push({
      // should only be added once to Left Start pane
      id: "TestUi2ProviderW1",
      label: "TestUi2Provider W1",
      content: "TestUi2Provider W1 widget",
    });
    if (
      location === StagePanelLocation.Right &&
      section === StagePanelSection.End
    )
      widgets.push({
        id: "TestUi2ProviderRM1",
        label: "TestUi2Provider RM1",
        content: "TestUi2Provider RM1 widget",
      });
    return widgets;
  }
}

class TestDuplicateWidgetProvider implements UiItemsProvider {
  public static stageId = "TestUi2Provider";
  public get id(): string {
    return TestDuplicateWidgetProvider.stageId;
  }

  public provideWidgets(
    _stageId: string,
    _stageUsage: string,
    location: StagePanelLocation,
    section?: StagePanelSection
  ) {
    const widgets: Widget[] = [];
    widgets.push({
      // should only be added once to Left Start pane
      id: "TestUi3ProviderW1",
      label: "TestUi3Provider W1",
      content: "TestUi3Provider W1 widget",
    });
    if (
      location === StagePanelLocation.Right &&
      section === StagePanelSection.End
    )
      widgets.push({
        id: "TestUi2ProviderRM1",
        label: "TestUi2Provider RM1",
        content: "TestUi2Provider RM1 widget",
      });
    widgets.push({
      id: "LeftStart1",
      label: "Provider LeftStart1",
      content: "Provider LeftStart1",
    });

    return widgets;
  }
}

class TestHiddenWidgetProvider implements UiItemsProvider {
  public static stageId = "TestFrontstageWithHiddenWidget";
  public get id(): string {
    return TestHiddenWidgetProvider.stageId;
  }

  public provideWidgets(
    _stageId: string,
    _stageUsage: string,
    location: StagePanelLocation,
    section?: StagePanelSection
  ) {
    const widgets: Widget[] = [];
    if (
      location === StagePanelLocation.Left &&
      section === StagePanelSection.End
    )
      widgets.push({
        id: "TestHiddenWidgetProviderLM1",
        label: "TestHiddenWidgetProvider Hidden LM1",
        content: "TestHiddenWidgetProvider LM1 widget",
        defaultState: WidgetState.Hidden,
      });
    return widgets;
  }
}

describe("Frontstage local storage wrapper", () => {
  const localStorageToRestore = Object.getOwnPropertyDescriptor(
    window,
    "localStorage"
  )!;
  const localStorageMock = storageMock();

  before(async () => {
    await NoRenderApp.startup();
    await TestUtils.initializeUiFramework();
    Object.defineProperty(window, "localStorage", {
      get: () => localStorageMock,
    });
  });

  after(async () => {
    TestUtils.terminateUiFramework();
    await IModelApp.shutdown();
    Object.defineProperty(window, "localStorage", localStorageToRestore);
  });

  describe("WidgetPanelsFrontstage", () => {
    it("should render modal stage content", () => {
      const modalStageInfo = {
        title: "TestModalStage",
        content: <div>Hello World!</div>,
      };
      sinon
        .stub(UiFramework.frontstages, "activeModalFrontstage")
        .get(() => modalStageInfo);
      const frontstageDef = new FrontstageDef();
      const contentGroup = moq.Mock.ofType<FrontstageDef["contentGroup"]>();
      sinon
        .stub(UiFramework.frontstages, "activeFrontstageDef")
        .get(() => frontstageDef);
      sinon.stub(frontstageDef, "contentGroup").get(() => contentGroup.object);
      render(
        <Provider store={TestUtils.store}>
          <WidgetPanelsFrontstage />
        </Provider>
      );
      expect(
        screen.getByText("Hello World!", {
          selector:
            ".uifw-modal-frontstage.uifw-modal-open .uifw-modal-stage-content > div",
        })
      ).to.exist;
    });

    it("should not render w/o frontstage", () => {
      sinon
        .stub(UiFramework.frontstages, "activeFrontstageDef")
        .get(() => undefined);
      const { container } = render(
        <Provider store={TestUtils.store}>
          <WidgetPanelsFrontstage />
        </Provider>
      );
      expect(container.childNodes).lengthOf(0);
    });
  });

  describe("ModalFrontstageComposer", () => {
    before(async () => {
      await TestUtils.initializeUiFramework();
    });

    after(() => {
      TestUtils.terminateUiFramework();
    });

    it("should render modal stage content when mounted", () => {
      const modalStageInfo = {
        title: "TestModalStage",
        content: <div>Hello World!</div>,
      };
      render(<ModalFrontstageComposer stageInfo={modalStageInfo} />);
      expect(
        screen.getByText("Hello World!", {
          selector:
            ".uifw-modal-frontstage.uifw-modal-open .uifw-modal-stage-content > div",
        })
      ).to.exist;
    });

    it("should add tool activated event listener", () => {
      const addListenerSpy = sinon.spy(
        UiFramework.frontstages.onModalFrontstageChangedEvent,
        "addListener"
      );
      const removeListenerSpy = sinon.spy(
        UiFramework.frontstages.onModalFrontstageChangedEvent,
        "removeListener"
      );
      const sut = renderHook(() => useActiveModalFrontstageInfo());
      sut.unmount();
      addListenerSpy.calledOnce.should.true;
      removeListenerSpy.calledOnce.should.true;
    });

    it("should update active modal info", () => {
      const modalStageInfo = {
        title: "TestModalStage",
        content: <div>Hello World!</div>,
      };

      sinon
        .stub(UiFramework.frontstages, "activeModalFrontstage")
        .get(() => undefined);
      renderHook(() => useActiveModalFrontstageInfo());
      act(() => {
        sinon
          .stub(UiFramework.frontstages, "activeModalFrontstage")
          .get(() => undefined);
        UiFramework.frontstages.onModalFrontstageChangedEvent.emit({
          modalFrontstageCount: 0,
        });

        sinon
          .stub(UiFramework.frontstages, "activeModalFrontstage")
          .get(() => modalStageInfo);
        UiFramework.frontstages.onModalFrontstageChangedEvent.emit({
          modalFrontstageCount: 1,
        });
      });
    });

    describe("ActiveFrontstageDefProvider", () => {
      before(async () => {
        await TestUtils.initializeUiFramework();
      });

      after(() => {
        TestUtils.terminateUiFramework();
      });

      beforeEach(() => {
        sinon.stub(InternalFrontstageManager, "nineZoneSize").set(() => {});
      });

      it("should render", async () => {
        const frontstageDef = new FrontstageDef();
        await frontstageDef.initializeFromConfig({
          ...defaultFrontstageConfig,
          leftPanel: {
            sections: {
              start: [
                {
                  id: "w1",
                  content: "Widget 1 content",
                },
              ],
            },
          },
        });
        initializeNineZoneState(frontstageDef);
        sinon
          .stub(UiFramework.frontstages, "activeFrontstageDef")
          .get(() => frontstageDef);
        const component = render(
          <Provider store={TestUtils.store}>
            <ActiveFrontstageDefProvider frontstageDef={frontstageDef} />
          </Provider>
        );
        component.getByText("Widget 1 content");
      });

      it("should fall back to cached NineZoneState", () => {
        const frontstageDef = new FrontstageDef();
        let state = createNineZoneState();
        state = produce(state, (draft) => {
          draft.panels.left.size = 482;
        });
        frontstageDef.nineZoneState = state;

        const { container, rerender } = render(
          <Provider store={TestUtils.store}>
            <ActiveFrontstageDefProvider frontstageDef={frontstageDef} />
          </Provider>
        );
        expect(
          container.querySelector(".nz-outline-panelOutline.nz-hidden.nz-left")
        ).satisfy(styleMatch({ width: "482px" }));

        const newFrontstageDef = new FrontstageDef();
        rerender(
          <Provider store={TestUtils.store}>
            <ActiveFrontstageDefProvider frontstageDef={newFrontstageDef} />
          </Provider>
        );
        expect(
          container.querySelector(".nz-outline-panelOutline.nz-hidden.nz-left")
        ).satisfy(styleMatch({ width: "200px" }));
      });
    });

    describe("useNineZoneDispatch", () => {
      beforeEach(() => {
        sinon.stub(InternalFrontstageManager, "nineZoneSize").set(() => {});
      });

      it("should modify nineZoneState with default NineZoneReducer", () => {
        const frontstageDef = new FrontstageDef();
        const nineZoneState = createNineZoneState();
        frontstageDef.nineZoneState = nineZoneState;
        const { result } = renderHook(() => useNineZoneDispatch(frontstageDef));
        result.current({
          type: "PANEL_INITIALIZE",
          side: "left",
          size: 200,
        });
        frontstageDef.nineZoneState?.should.not.eq(nineZoneState);
        (frontstageDef.nineZoneState?.panels.left.size === 200).should.true;
      });

      it("should not modify when nineZoneState is not defined", () => {
        const frontstageDef = new FrontstageDef();
        const { result } = renderHook(() => useNineZoneDispatch(frontstageDef));
        result.current({
          type: "PANEL_INITIALIZE",
          side: "left",
          size: 200,
        });
        (frontstageDef.nineZoneState === undefined).should.true;
      });

      it("should set nineZoneSize when RESIZE is received", () => {
        const spy = sinon
          .stub(InternalFrontstageManager, "nineZoneSize")
          .set(() => {});
        const frontstageDef = new FrontstageDef();
        frontstageDef.nineZoneState = createNineZoneState();
        const { result } = renderHook(() => useNineZoneDispatch(frontstageDef));
        result.current({
          type: "RESIZE",
          size: {
            width: 5,
            height: 10,
          },
        });
        spy.calledOnceWithExactly(sinon.match({ width: 5, height: 10 }));
      });
    });

    describe("useLayoutStore", () => {
      it("should return initial nineZoneState", () => {
        const frontstageDef = new FrontstageDef();
        sinon
          .stub(UiFramework.frontstages, "activeFrontstageDef")
          .get(() => frontstageDef);
        const nineZoneState = createNineZoneState({
          size: { width: 300, height: 400 },
        });
        frontstageDef.nineZoneState = nineZoneState;
        const { result } = renderHook(() => useLayoutStore(frontstageDef));
        result.current.getState().should.eql(nineZoneState);
      });

      it("should return nineZoneState of provided frontstageDef", () => {
        const frontstageDef = new FrontstageDef();
        sinon
          .stub(UiFramework.frontstages, "activeFrontstageDef")
          .get(() => frontstageDef);
        const nineZoneState = createNineZoneState();
        frontstageDef.nineZoneState = nineZoneState;
        const newFrontstageDef = new FrontstageDef();
        const newNineZoneState = createNineZoneState();
        newFrontstageDef.nineZoneState = newNineZoneState;
        const { result, rerender } = renderHook(
          () => useLayoutStore(frontstageDef),
          {
            initialProps: frontstageDef,
          }
        );
        rerender(newFrontstageDef);
        result.current.getState().should.eql(newNineZoneState);
      });

      it("should return updated nineZoneState", () => {
        const frontstageDef = new FrontstageDef();
        sinon.stub(frontstageDef, "isReady").get(() => true);
        sinon
          .stub(UiFramework.frontstages, "activeFrontstageDef")
          .get(() => frontstageDef);
        const nineZoneState = createNineZoneState();
        const newNineZoneState = createNineZoneState();
        frontstageDef.nineZoneState = nineZoneState;
        const { result } = renderHook(() => useLayoutStore(frontstageDef));
        act(() => {
          frontstageDef.nineZoneState = newNineZoneState;
        });
        result.current.getState().should.eql(newNineZoneState);
      });

      it("should ignore nineZoneState changes of other frontstages", () => {
        const frontstageDef = new FrontstageDef();
        sinon
          .stub(UiFramework.frontstages, "activeFrontstageDef")
          .get(() => frontstageDef);
        const nineZoneState = createNineZoneState({
          size: { width: 200, height: 300 },
        });
        const newNineZoneState = createNineZoneState({
          size: { width: 400, height: 500 },
        });
        frontstageDef.nineZoneState = nineZoneState;
        const { result } = renderHook(() => useLayoutStore(frontstageDef));
        act(() => {
          new FrontstageDef().nineZoneState = newNineZoneState;
        });
        result.current.getState().should.eql(nineZoneState);
      });
    });

    describe("useSavedFrontstageState", () => {
      before(async () => {
        await TestUtils.initializeUiFramework();
      });

      after(() => {
        TestUtils.terminateUiFramework();
      });

      it("should load saved nineZoneState", async () => {
        const setting = createFrontstageState();
        const uiStateStorage = new UiStateStorageStub();
        await UiFramework.setUiStateStorage(uiStateStorage);
        sinon.stub(uiStateStorage, "getSetting").resolves({
          status: UiStateStorageStatus.Success,
          setting,
        });
        const frontstageDef = new FrontstageDef();
        renderHook(() => useSavedFrontstageState(frontstageDef), {
          wrapper: (props) => <UiStateStorageHandler {...props} />,
        });
        await TestUtils.flushAsyncOperations();
        frontstageDef.nineZoneState?.should.matchSnapshot();
      });

      it("should not load nineZoneState when nineZoneState is already initialized", async () => {
        const frontstageDef = new FrontstageDef();
        frontstageDef.nineZoneState = createNineZoneState();
        const uiStateStorage = new UiStateStorageStub();
        await UiFramework.setUiStateStorage(uiStateStorage);

        const spy = sinon.spy(uiStateStorage, "getSetting");
        renderHook(() => useSavedFrontstageState(frontstageDef), {
          wrapper: (props) => <UiStateStorageHandler {...props} />,
        });
        spy.notCalled.should.true;
      });

      it("should initialize nineZoneState", async () => {
        const setting = createFrontstageState();
        const uiStateStorage = new UiStateStorageStub();
        sinon.stub(uiStateStorage, "getSetting").returns(
          Promise.resolve<UiStateStorageResult>({
            status: UiStateStorageStatus.Success,
            setting,
          })
        );
        const frontstageDef = new FrontstageDef();
        await UiFramework.setUiStateStorage(uiStateStorage);

        sinon.stub(frontstageDef, "version").get(() => setting.version + 1);
        renderHook(() => useSavedFrontstageState(frontstageDef), {
          wrapper: (props) => <UiStateStorageHandler {...props} />,
        });
        await TestUtils.flushAsyncOperations();
        expect(frontstageDef.nineZoneState).to.exist;
        frontstageDef.nineZoneState!.should.not.eq(setting.nineZone);
      });

      it("should add missing widgets", async () => {
        const setting = createFrontstageState();
        const uiStateStorage = new UiStateStorageStub();

        sinon.stub(uiStateStorage, "getSetting").resolves({
          status: UiStateStorageStatus.Success,
          setting,
        });
        const frontstageDef = new FrontstageDef();
        await UiFramework.setUiStateStorage(uiStateStorage);

        const leftPanel = StagePanelDef.create(
          {
            resizable: true,
            sections: {
              start: [{ id: "w1" }],
            },
          },
          StagePanelLocation.Left
        );
        sinon.stub(frontstageDef, "leftPanel").get(() => leftPanel);

        renderHook(() => useSavedFrontstageState(frontstageDef), {
          wrapper: (props) => <UiStateStorageHandler {...props} />,
        });
        await TestUtils.flushAsyncOperations();

        expect(frontstageDef.nineZoneState?.tabs.w1).to.exist;
      });
    });

    describe("useSaveFrontstageSettings", () => {
      it("should save frontstage settings", async () => {
        const fakeTimers = sinon.useFakeTimers();
        const uiStateStorage = new UiStateStorageStub();
        const spy = sinon.stub(uiStateStorage, "saveSetting").resolves({
          status: UiStateStorageStatus.Success,
        });
        const frontstageDef = new FrontstageDef();
        frontstageDef.nineZoneState = createNineZoneState();
        await UiFramework.setUiStateStorage(uiStateStorage);

        const layout = createLayoutStore();
        renderHook(() => useSaveFrontstageSettings(frontstageDef, layout), {
          wrapper: (props) => <UiStateStorageHandler {...props} />,
        });
        fakeTimers.tick(1000);
        fakeTimers.restore();

        sinon.assert.calledOnce(spy);
      });

      it("should not save if tab is dragged", async () => {
        const fakeTimers = sinon.useFakeTimers();
        const uiStateStorage = new UiStateStorageStub();
        const spy = sinon.stub(uiStateStorage, "saveSetting").resolves({
          status: UiStateStorageStatus.Success,
        });
        const frontstageDef = new FrontstageDef();
        await UiFramework.setUiStateStorage(uiStateStorage);

        frontstageDef.nineZoneState = produce(
          createNineZoneState(),
          (draft) => {
            draft.draggedTab = createDraggedTabState("t1");
          }
        );

        const layout = createLayoutStore(frontstageDef.nineZoneState);
        renderHook(() => useSaveFrontstageSettings(frontstageDef, layout), {
          wrapper: (props) => <UiStateStorageHandler {...props} />,
        });
        fakeTimers.tick(1000);
        fakeTimers.restore();

        sinon.assert.notCalled(spy);
      });
    });

    describe("useFrontstageManager", () => {
      it("should not handle onWidgetStateChangedEvent when nineZoneState is unset", () => {
        const frontstageDef = new FrontstageDef();
        renderHook(() => useFrontstageManager(frontstageDef));
        const widgetDef = new WidgetDef();
        UiFramework.frontstages.onWidgetStateChangedEvent.emit({
          widgetDef,
          widgetState: WidgetState.Open,
        });
        (frontstageDef.nineZoneState === undefined).should.true;
      });

      it("should handle onWidgetStateChangedEvent", () => {
        const frontstageDef = new FrontstageDef();
        let nineZoneState = createNineZoneState();
        nineZoneState = addTab(nineZoneState, "t1");
        nineZoneState = addTab(nineZoneState, "t2");
        nineZoneState = addPanelWidget(nineZoneState, "left", "w1", ["t1"]);
        nineZoneState = addPanelWidget(nineZoneState, "left", "w2", ["t2"]);
        frontstageDef.nineZoneState = nineZoneState;
        renderHook(() => useFrontstageManager(frontstageDef));
        const widgetDef = WidgetDef.create({
          id: "t1",
        });
        UiFramework.frontstages.onWidgetStateChangedEvent.emit({
          widgetDef,
          widgetState: WidgetState.Closed,
        });
        frontstageDef.nineZoneState?.widgets.w1.minimized.should.false; // Closed has no effect on widgets in panels
      });

      describe("onFrontstageRestoreLayoutEvent", () => {
        it("should delete saved setting", async () => {
          const frontstageDef = new FrontstageDef();
          frontstageDef.nineZoneState = createNineZoneState();
          const uiStateStorage = new UiStateStorageStub();
          await UiFramework.setUiStateStorage(uiStateStorage);

          const spy = sinon.spy(uiStateStorage, "deleteSetting");
          renderHook(() => useFrontstageManager(frontstageDef), {
            wrapper: (props) => <UiStateStorageHandler {...props} />,
          });
          InternalFrontstageManager.onFrontstageRestoreLayoutEvent.emit({
            frontstageDef,
          });
          spy.calledOnce.should.true;
        });

        it("should unset nineZoneState", async () => {
          const frontstageDef = new FrontstageDef();
          frontstageDef.nineZoneState = createNineZoneState();
          const uiStateStorage = new UiStateStorageStub();
          await UiFramework.setUiStateStorage(uiStateStorage);

          renderHook(() => useFrontstageManager(frontstageDef), {
            wrapper: (props) => <UiStateStorageHandler {...props} />,
          });
          const frontstageDef1 = new FrontstageDef();
          sinon.stub(frontstageDef1, "id").get(() => "f1");
          frontstageDef1.nineZoneState = createNineZoneState();
          InternalFrontstageManager.onFrontstageRestoreLayoutEvent.emit({
            frontstageDef: frontstageDef1,
          });
          expect(frontstageDef1.nineZoneState).to.be.undefined;
        });
      });

      describe("useToolAsToolSettingsLabel", () => {
        it("should use localized default name when false", () => {
          const frontstageDef = new FrontstageDef();
          let state = createNineZoneState();
          state = addTab(state, "ts");
          state = addPanelWidget(state, "left", "w1", ["ts"]);
          state = addWidgetToolSettings(state, "ts");
          frontstageDef.nineZoneState = state;

          renderHook(() => useFrontstageManager(frontstageDef, false));

          frontstageDef.nineZoneState?.tabs.ts.label.should.eq(
            "widget.labels.toolSettings"
          );
        });

        it("should use localized default name when tool or flyover is not defined", () => {
          const frontstageDef = new FrontstageDef();
          let state = createNineZoneState();
          state = addTab(state, "ts");
          state = addPanelWidget(state, "left", "w1", ["ts"]);
          state = addWidgetToolSettings(state, "ts");
          frontstageDef.nineZoneState = state;

          renderHook(() => useFrontstageManager(frontstageDef, true));

          frontstageDef.nineZoneState?.tabs.ts.label.should.eq(
            "widget.labels.toolSettings"
          );
        });

        it("should use tool label when true", () => {
          const frontstageDef = new FrontstageDef();
          let state = createNineZoneState();
          state = addTab(state, "ts");
          state = addPanelWidget(state, "left", "w1", ["ts"]);
          state = addWidgetToolSettings(state, "ts");
          frontstageDef.nineZoneState = state;
          const fakeActiveToolId = "activeTool1";
          const fakeToolLabel = "activeToolLabel";

          sinon
            .stub(UiFramework.frontstages, "activeToolId")
            .get(() => fakeActiveToolId);
          const findSpy = sinon
            .stub(IModelApp.tools, "find")
            .returns({ flyover: fakeToolLabel } as any);

          renderHook(() => useFrontstageManager(frontstageDef, true));

          findSpy.calledWith(fakeActiveToolId).should.be.true;
          frontstageDef.nineZoneState?.tabs.ts.label.should.eq(fakeToolLabel);

          sinon.restore();
        });
      });
    });

    describe("initializeNineZoneState", () => {
      it("should initialize widgets", () => {
        const frontstageDef = new FrontstageDef();
        sinon
          .stub(UiFramework.frontstages, "activeFrontstageDef")
          .get(() => frontstageDef);
        sinon.stub(frontstageDef, "leftPanel").get(() => new StagePanelDef());
        sinon.stub(frontstageDef, "rightPanel").get(() => new StagePanelDef());
        sinon.stub(frontstageDef, "topPanel").get(() => new StagePanelDef());
        sinon.stub(frontstageDef, "bottomPanel").get(() => new StagePanelDef());
        initializeNineZoneState(frontstageDef);

        const sut = frontstageDef.nineZoneState!;
        sut.should.matchSnapshot();
      });

      it("should keep one widget open", () => {
        const frontstageDef = new FrontstageDef();
        const panel = StagePanelDef.create(
          {
            sections: {
              end: [{ id: "w1" }],
            },
          },
          StagePanelLocation.Left
        );
        sinon.stub(frontstageDef, "leftPanel").get(() => panel);
        initializeNineZoneState(frontstageDef);

        const sut = frontstageDef.nineZoneState!;
        sut.widgets.leftEnd.activeTabId.should.eq("w1");
      });

      it("should initialize size", () => {
        sinon
          .stub(InternalFrontstageManager, "nineZoneSize")
          .get(() => new Size(10, 20));
        const frontstageDef = new FrontstageDef();
        initializeNineZoneState(frontstageDef);

        const sut = frontstageDef.nineZoneState!;
        sut.size.should.eql({ width: 10, height: 20 });
      });

      it("should not initialize size", () => {
        const frontstageDef = new FrontstageDef();
        initializeNineZoneState(frontstageDef);

        const sut = frontstageDef.nineZoneState!;
        sut.size.should.eql({ width: 0, height: 0 });
      });

      it("should initialize preferredPanelWidgetSize of tool settings widget", () => {
        const frontstageDef = new FrontstageDef();
        const widgetDef = WidgetDef.create({
          id: "w1",
          preferredPanelSize: "fit-content",
          canFloat: {
            defaultSize: { width: 33, height: 33 },
          },
        });
        sinon.stub(frontstageDef, "toolSettings").get(() => widgetDef);
        initializeNineZoneState(frontstageDef);

        const sut = frontstageDef.nineZoneState!;
        sut.tabs.w1.preferredPanelWidgetSize!.should.eq("fit-content");
        expect(sut.toolSettings?.tabId).to.eq("w1");
      });

      it("should add panel zone widgets", () => {
        const frontstageDef = new FrontstageDef();
        const panelDef = StagePanelDef.create(
          {
            sections: {
              start: [{ id: "w1" }],
              end: [{ id: "w3" }],
            },
          },
          StagePanelLocation.Left
        );
        sinon.stub(frontstageDef, "leftPanel").get(() => panelDef);
        initializeNineZoneState(frontstageDef);

        const sut = frontstageDef.nineZoneState!;
        sut.panels.left.widgets.should.eql(["leftStart", "leftEnd"]);
        sut.widgets.leftStart.tabs.should.eql(["w1"]);
        sut.widgets.leftEnd.tabs.should.eql(["w3"]);
      });

      it("should not duplicate widgets", () => {
        const frontstageDef = new FrontstageDef();
        const panelDef = StagePanelDef.create(
          {
            sections: {
              start: [{ id: "w1" }],
              end: [{ id: "w1" }, { id: "w3" }],
            },
          },
          StagePanelLocation.Left
        );
        sinon.stub(frontstageDef, "leftPanel").get(() => panelDef);
        sinon.stub(frontstageDef, "rightPanel").get(() => panelDef);
        initializeNineZoneState(frontstageDef);

        const sut = frontstageDef.nineZoneState!;
        sut.panels.left.widgets.should.eql(["leftStart", "leftEnd"]);
        sut.panels.right.widgets.should.empty;
        sut.widgets.leftStart.tabs.should.eql(["w1"]);
        sut.widgets.leftEnd.tabs.should.eql(["w3"]);
      });

      it("should add widgets from panel zones", () => {
        const frontstageDef = new FrontstageDef();
        frontstageDef.nineZoneState = createNineZoneState();
        const leftPanel = StagePanelDef.create(
          {
            sections: {
              start: [{ id: "w1" }],
            },
          },
          StagePanelLocation.Left
        );
        sinon.stub(frontstageDef, "leftPanel").get(() => leftPanel);
        initializeNineZoneState(frontstageDef);
        const sut = frontstageDef.nineZoneState;
        sut.panels.left.widgets[0].should.eq("leftStart");
      });

      it("should add leftPanel widgets", () => {
        const frontstageDef = new FrontstageDef();
        const panelDef = StagePanelDef.create(
          {
            sections: {
              end: [{ id: "w1" }],
            },
          },
          StagePanelLocation.Left
        );
        sinon.stub(frontstageDef, "leftPanel").get(() => panelDef);
        initializeNineZoneState(frontstageDef);
        const sut = frontstageDef.nineZoneState!;
        sut.panels.left.widgets[0].should.eq("leftEnd");
        sut.widgets.leftEnd.tabs.should.eql(["w1"]);
      });

      it("should add rightPanel widgets", () => {
        const frontstageDef = new FrontstageDef();
        frontstageDef.nineZoneState = createNineZoneState();
        const panelDef = StagePanelDef.create(
          {
            sections: {
              end: [{ id: "w1" }],
            },
          },
          StagePanelLocation.Right
        );
        sinon.stub(frontstageDef, "rightPanel").get(() => panelDef);
        initializeNineZoneState(frontstageDef);
        const sut = frontstageDef.nineZoneState;
        sut.panels.right.widgets[0].should.eq("rightEnd");
        sut.widgets.rightEnd.tabs.should.eql(["w1"]);
      });

      it("should add topPanel widgets", () => {
        const frontstageDef = new FrontstageDef();
        frontstageDef.nineZoneState = createNineZoneState();
        const panelDef = StagePanelDef.create(
          {
            sections: {
              start: [{ id: "w1" }],
            },
          },
          StagePanelLocation.Left
        );
        sinon.stub(frontstageDef, "topPanel").get(() => panelDef);
        initializeNineZoneState(frontstageDef);
        const sut = frontstageDef.nineZoneState;
        sut.panels.top.widgets[0].should.eq("topStart");
        sut.widgets.topStart.tabs.should.eql(["w1"]);
      });

      it("should add bottomPanel widgets", () => {
        const frontstageDef = new FrontstageDef();
        frontstageDef.nineZoneState = createNineZoneState();
        const panelDef = StagePanelDef.create(
          {
            sections: {
              start: [{ id: "w1" }],
            },
          },
          StagePanelLocation.Bottom
        );
        sinon.stub(frontstageDef, "bottomPanel").get(() => panelDef);
        initializeNineZoneState(frontstageDef);
        const sut = frontstageDef.nineZoneState;
        sut.panels.bottom.widgets[0].should.eq("bottomStart");
        sut.widgets.bottomStart.tabs.should.eql(["w1"]);
      });
    });

    describe("initializePanel", () => {
      it("should initialize max size", () => {
        const frontstageDef = new FrontstageDef();
        frontstageDef.nineZoneState = createNineZoneState();
        const leftPanel = new StagePanelDef();
        sinon.stub(frontstageDef, "leftPanel").get(() => leftPanel);
        sinon.stub(leftPanel, "initialConfig").get(() => ({
          maxSize: 100,
        }));
        initializePanel(frontstageDef, StagePanelLocation.Left);
        const sut = frontstageDef.nineZoneState;
        sut.panels.left.maxSize.should.eq(100);
      });

      it("should initialize min size", () => {
        const frontstageDef = new FrontstageDef();
        frontstageDef.nineZoneState = createNineZoneState();
        const leftPanel = new StagePanelDef();
        sinon.stub(frontstageDef, "leftPanel").get(() => leftPanel);
        sinon.stub(leftPanel, "initialConfig").get(() => ({
          minSize: 50,
        }));
        initializePanel(frontstageDef, StagePanelLocation.Left);
        const sut = frontstageDef.nineZoneState;
        sut.panels.left.minSize.should.eq(50);
      });
    });

    describe("addPanelSectionWidgetDefs", () => {
      it("should use widget label", async () => {
        const frontstageDef = new FrontstageDef();
        await frontstageDef.initializeFromConfig({
          ...defaultFrontstageConfig,
          leftPanel: {
            sections: {
              start: [
                {
                  id: "w1",
                  label: "Widget 1",
                  canFloat: {
                    hideWithUi: true,
                  },
                },
              ],
            },
          },
        });
        frontstageDef.nineZoneState = createNineZoneState();
        addPanelSectionWidgetDefs(
          frontstageDef,
          StagePanelLocation.Left,
          StagePanelSection.Start
        );
        const sut = frontstageDef.nineZoneState;
        sut.tabs.w1.label.should.eq("Widget 1");
      });

      it("should activate tab based on widget state", async () => {
        const frontstageDef = new FrontstageDef();
        await frontstageDef.initializeFromConfig({
          ...defaultFrontstageConfig,
          leftPanel: {
            sections: {
              start: [
                {
                  id: "w1",
                  defaultState: WidgetState.Open,
                },
              ],
            },
          },
        });
        frontstageDef.nineZoneState = createNineZoneState();
        addPanelSectionWidgetDefs(
          frontstageDef,
          StagePanelLocation.Left,
          StagePanelSection.Start
        );
        const sut = frontstageDef.nineZoneState;
        sut.widgets.leftStart.activeTabId.should.eq("w1");
      });

      it("should append widgets to a new panel section", async () => {
        const frontstageDef = new FrontstageDef();
        await frontstageDef.initializeFromConfig({
          ...defaultFrontstageConfig,
          leftPanel: {
            sections: {
              end: [{ id: "t2" }],
            },
          },
        });
        let state = createNineZoneState();
        state = addTab(state, "t1");
        state = addPanelWidget(state, "left", "w1", ["t1"]);
        frontstageDef.nineZoneState = state;
        addPanelSectionWidgetDefs(
          frontstageDef,
          StagePanelLocation.Left,
          StagePanelSection.End
        );
        const sut = frontstageDef.nineZoneState;
        expect(sut.panels.left.widgets).to.eql(["w1", "leftEnd"]);
        expect(sut.widgets.leftEnd.tabs).to.eql(["t2"]);
      });

      it("should append widgets to an existing panel section (by preferredWidgetIndex)", async () => {
        const frontstageDef = new FrontstageDef();
        await frontstageDef.initializeFromConfig({
          ...defaultFrontstageConfig,
          leftPanel: {
            sections: {
              end: [{ id: "t3" }],
            },
          },
        });
        let state = createNineZoneState();
        state = addTab(state, "t1");
        state = addTab(state, "t2");
        state = addPanelWidget(state, "left", "w1", ["t1"]);
        state = addPanelWidget(state, "left", "w2", ["t2"]);
        frontstageDef.nineZoneState = state;
        addPanelSectionWidgetDefs(
          frontstageDef,
          StagePanelLocation.Left,
          StagePanelSection.End
        );
        const sut = frontstageDef.nineZoneState;
        expect(sut.widgets.w2.tabs).to.eql(["t2", "t3"]);
      });
    });

    describe("getPanelSectionId", () => {
      it("should return 'leftStart'", () => {
        getPanelSectionId(
          StagePanelLocation.Left,
          StagePanelSection.Start
        ).should.eq("leftStart");
      });

      it("should return 'leftEnd'", () => {
        getPanelSectionId(
          StagePanelLocation.Left,
          StagePanelSection.End
        ).should.eq("leftEnd");
      });

      it("should return 'rightStart'", () => {
        getPanelSectionId(
          StagePanelLocation.Right,
          StagePanelSection.Start
        ).should.eq("rightStart");
      });

      it("should return 'rightEnd'", () => {
        getPanelSectionId(
          StagePanelLocation.Right,
          StagePanelSection.End
        ).should.eq("rightEnd");
      });

      it("should return 'topStart'", () => {
        getPanelSectionId(
          StagePanelLocation.Top,
          StagePanelSection.Start
        ).should.eq("topStart");
      });

      it("should return 'topEnd'", () => {
        getPanelSectionId(
          StagePanelLocation.Top,
          StagePanelSection.End
        ).should.eq("topEnd");
      });

      it("should return 'bottomStart'", () => {
        getPanelSectionId(
          StagePanelLocation.Bottom,
          StagePanelSection.Start
        ).should.eq("bottomStart");
      });

      it("should return 'bottomEnd'", () => {
        getPanelSectionId(
          StagePanelLocation.Bottom,
          StagePanelSection.End
        ).should.eq("bottomEnd");
      });
    });

    describe("isFrontstageStateSettingResult", () => {
      it("isFrontstageStateSettingResult", () => {
        isFrontstageStateSettingResult({
          status: UiStateStorageStatus.UnknownError,
        }).should.false;
      });
    });

    describe("restoreNineZoneState", () => {
      it("should log info if widgetDef is not found", () => {
        const spy = sinon.spy(Logger, "logInfo");
        const frontstageDef = new FrontstageDef();
        let state = createNineZoneState();
        state = addTab(state, "t1");
        restoreNineZoneState(frontstageDef, state);
        spy.calledOnce.should.true;
        (
          BentleyError.getMetaData(spy.firstCall.args[2]) as any
        ).should.matchSnapshot();
      });

      it("should remove tab from widgetState if widgetDef is not found", () => {
        const widgetDef = WidgetDef.create({
          id: "t2",
        });

        const frontstageDef = new FrontstageDef();
        sinon
          .stub(frontstageDef, "findWidgetDef")
          .withArgs("t2")
          .returns(widgetDef);
        let state = createNineZoneState();
        state = addTab(state, "t1", { label: "t1" });
        state = addTab(state, "t2", { label: "t2" });
        state = addTab(state, "t3", {
          label: "t3",
          preferredFloatingWidgetSize: { width: 444, height: 555 },
        });
        state = addPanelWidget(state, "left", "w1", ["t1", "t2"]);
        restoreNineZoneState(frontstageDef, state);

        const sut = frontstageDef.nineZoneState!;
        sut.widgets.w1.tabs.should.eql(["t2"]);
        expect(sut.tabs.t1).to.not.exist;
        expect(sut.tabs.t3).to.not.exist;
      });

      it("should restore tabs", () => {
        const frontstageDef = new FrontstageDef();
        const widgetDef = new WidgetDef();
        sinon.stub(frontstageDef, "findWidgetDef").returns(widgetDef);
        let state = createNineZoneState();
        state = addTab(state, "t1");
        restoreNineZoneState(frontstageDef, state);

        const sut = frontstageDef.nineZoneState!;
        sut.should.matchSnapshot();
      });

      it("should RESIZE", () => {
        sinon
          .stub(InternalFrontstageManager, "nineZoneSize")
          .get(() => new Size(10, 20));
        const frontstageDef = new FrontstageDef();
        let state = createNineZoneState({
          size: {
            width: 1,
            height: 2,
          },
        });
        state = addTab(state, "t1");
        restoreNineZoneState(frontstageDef, state);

        const sut = frontstageDef.nineZoneState!;
        sut.size.should.eql({ width: 10, height: 20 });
      });

      it("should not RESIZE", () => {
        const frontstageDef = new FrontstageDef();
        let state = createNineZoneState({
          size: {
            width: 1,
            height: 2,
          },
        });
        state = addTab(state, "t1");
        restoreNineZoneState(frontstageDef, state);

        const sut = frontstageDef.nineZoneState!;
        sut.size.should.eql({ width: 1, height: 2 });
      });
    });

    describe("packNineZoneState", () => {
      it("should remove labels", () => {
        let nineZone = createNineZoneState();
        nineZone = addTab(nineZone, "t1");
        nineZone = addTab(nineZone, "t2");
        nineZone = addFloatingWidget(nineZone, "w1", ["t1"]);
        const sut = packNineZoneState(nineZone);
        sut.should.matchSnapshot();
      });

      it("should not remove floating widgets with unique id", () => {
        const tabId = getUniqueId();
        const widgetId = getUniqueId();
        let nineZone = createNineZoneState();
        nineZone = addTab(nineZone, tabId);
        nineZone = addFloatingWidget(nineZone, widgetId, [tabId]);
        const sut = packNineZoneState(nineZone);
        sut.floatingWidgets.allIds.should.eql([widgetId]);
        Object.keys(sut.tabs).should.eql([tabId]);
      });
    });

    describe("useUpdateNineZoneSize", () => {
      it("should update size of nine zone state when new frontstage is activated", () => {
        const { rerender } = renderHook(
          (props) => useUpdateNineZoneSize(props),
          { initialProps: new FrontstageDef() }
        );

        const newFrontstageDef = new FrontstageDef();
        newFrontstageDef.nineZoneState = createNineZoneState();

        sinon
          .stub(InternalFrontstageManager, "nineZoneSize")
          .get(() => new Size(10, 20));
        rerender(newFrontstageDef);

        newFrontstageDef.nineZoneState?.size.should.eql({
          width: 10,
          height: 20,
        });
      });

      it("should not update size if InternalFrontstageManager.nineZoneSize is not initialized", () => {
        const { rerender } = renderHook(
          (props) => useUpdateNineZoneSize(props),
          { initialProps: new FrontstageDef() }
        );
        InternalFrontstageManager.nineZoneSize = undefined;

        const newFrontstageDef = new FrontstageDef();
        newFrontstageDef.nineZoneState = createNineZoneState({
          size: { height: 1, width: 2 },
        });

        rerender(newFrontstageDef);

        newFrontstageDef.nineZoneState?.size.should.eql({
          height: 1,
          width: 2,
        });
      });
    });

    describe("addFrontstageWidgetDefs", () => {
      it("should add leftPanel widgets", async () => {
        const frontstageDef = new FrontstageDef();
        await frontstageDef.initializeFromConfig({
          ...defaultFrontstageConfig,
          leftPanel: {
            resizable: true,
            sections: {
              start: [{ id: "ws1" }],
              end: [{ id: "w1" }, { id: "wm1" }, { id: "we1" }],
            },
          },
        });
        let state = createNineZoneState();
        state = addTab(state, "start1");
        state = addTab(state, "end1");
        state = addPanelWidget(state, "left", "leftStart", ["start1"]);
        state = addPanelWidget(state, "left", "leftEnd", ["end1"]);
        frontstageDef.nineZoneState = state;
        addFrontstageWidgetDefs(frontstageDef);
        const sut = frontstageDef.nineZoneState;
        sut.widgets.leftStart.tabs.should.eql(["start1", "ws1"]);
        sut.widgets.leftEnd.tabs.should.eql(["end1", "w1", "wm1", "we1"]);
      });

      it("should add rightPanel widgets", async () => {
        const frontstageDef = new FrontstageDef();
        await frontstageDef.initializeFromConfig({
          ...defaultFrontstageConfig,
          rightPanel: {
            resizable: true,
            sections: {
              start: [{ id: "ws1" }],
              end: [{ id: "w1" }, { id: "wm1" }, { id: "we1" }],
            },
          },
        });
        let state = createNineZoneState();
        state = addTab(state, "start1");
        state = addTab(state, "middle1");
        state = addTab(state, "end1");
        state = addPanelWidget(state, "right", "rightStart", ["start1"]);
        state = addPanelWidget(state, "right", "rightEnd", ["end1"]);
        frontstageDef.nineZoneState = state;
        addFrontstageWidgetDefs(frontstageDef);
        const sut = frontstageDef.nineZoneState;
        sut.widgets.rightStart.tabs.should.eql(["start1", "ws1"]);
        sut.widgets.rightEnd.tabs.should.eql(["end1", "w1", "wm1", "we1"]);
      });

      it("should add topPanel widgets", async () => {
        const frontstageDef = new FrontstageDef();
        await frontstageDef.initializeFromConfig({
          ...defaultFrontstageConfig,
          topPanel: {
            resizable: true,
            sections: {
              start: [{ id: "w1" }, { id: "ws1" }],
              end: [{ id: "we1" }],
            },
          },
        });
        let state = createNineZoneState();
        state = addTab(state, "start1");
        state = addTab(state, "end1");
        state = addPanelWidget(state, "top", "topStart", ["start1"]);
        state = addPanelWidget(state, "top", "topEnd", ["end1"]);
        frontstageDef.nineZoneState = state;
        addFrontstageWidgetDefs(frontstageDef);
        const sut = frontstageDef.nineZoneState;
        sut.widgets.topStart.tabs.should.eql(["start1", "w1", "ws1"]);
        sut.widgets.topEnd.tabs.should.eql(["end1", "we1"]);
      });

      it("should add bottomPanel widgets", async () => {
        const frontstageDef = new FrontstageDef();
        await frontstageDef.initializeFromConfig({
          ...defaultFrontstageConfig,
          bottomPanel: {
            resizable: true,
            sections: {
              start: [{ id: "w1" }, { id: "ws1" }],
              end: [{ id: "we1" }],
            },
          },
        });
        let state = createNineZoneState();
        state = addTab(state, "start1");
        state = addTab(state, "end1");
        state = addPanelWidget(state, "bottom", "bottomStart", ["start1"]);
        state = addPanelWidget(state, "bottom", "bottomEnd", ["end1"]);
        frontstageDef.nineZoneState = state;
        addFrontstageWidgetDefs(frontstageDef);
        const sut = frontstageDef.nineZoneState;
        sut.widgets.bottomStart.tabs.should.eql(["start1", "w1", "ws1"]);
        sut.widgets.bottomEnd.tabs.should.eql(["end1", "we1"]);
      });

      it("should add no duplicate widgets", async () => {
        const frontstageDef = new FrontstageDef();
        await frontstageDef.initializeFromConfig({
          ...defaultFrontstageConfig,
          leftPanel: {
            resizable: true,
            sections: {
              start: [{ id: "w1" }, { id: "w1" }],
              end: [{ id: "w1" }],
            },
          },
          rightPanel: {
            resizable: true,
            sections: {
              start: [{ id: "w1" }],
            },
          },
        });
        frontstageDef.nineZoneState = createNineZoneState();
        addFrontstageWidgetDefs(frontstageDef);
        const sut = frontstageDef.nineZoneState;
        const widgets = Object.values(sut.widgets);
        const widgetIds = widgets.reduce<Array<string>>((acc, w) => {
          acc.push(w.id);
          return acc;
        }, []);
        const tabs = widgets.reduce<Array<string>>((acc, w) => {
          acc.push(...w.tabs);
          return acc;
        }, []);

        widgetIds.should.eql(["leftStart"]);
        tabs.should.eql(["w1"]);
        sut.widgets.leftStart.tabs.should.eql(["w1"]);
      });
    });

    describe("dynamic widgets", () => {
      stubRaf();
      beforeEach(async () => {
        await TestUtils.initializeUiFramework();
        await NoRenderApp.startup();
      });

      afterEach(async () => {
        UiItemsManager.clearAllProviders();
        UiFramework.frontstages.clearFrontstageProviders();
        await UiFramework.frontstages.setActiveFrontstageDef(undefined);
        InternalFrontstageManager.nineZoneSize = undefined;
        TestUtils.terminateUiFramework();
        await IModelApp.shutdown();
      });

      it("should render pre-loaded provider widgets when state is initialized", async () => {
        UiItemsManager.register(new TestUi2Provider());

        const frontstageProvider = new TestFrontstageUi2();
        UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
        const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
          frontstageProvider.id
        );
        await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
        const { findByText } = render(
          <Provider store={TestUtils.store}>
            <WidgetPanelsFrontstage />
          </Provider>
        );
        await findByText("Left Start 1");
        await findByText("TestUi2Provider RM1");
        await findByText("TestUi2Provider W1");
      });

      it("should render pre-loaded provider widgets when state is initialized with no Duplicates", async () => {
        UiItemsManager.register(new TestUi2Provider());
        UiItemsManager.register(new TestDuplicateWidgetProvider());

        const frontstageProvider = new TestFrontstageUi2();
        UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
        const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
          frontstageProvider.id
        );
        await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
        const wrapper = render(
          <Provider store={TestUtils.store}>
            <WidgetPanelsFrontstage />
          </Provider>
        );
        await wrapper.findByText("Left Start 1");
        await wrapper.findByText("TestUi2Provider RM1");
        await wrapper.findByText("TestUi2Provider W1");
        expect(wrapper.queryAllByText("Left Start 1").length).to.equal(1);
        expect(wrapper.queryAllByText("TestUi2Provider RM1").length).to.equal(
          1
        );
      });

      it("should support widgets with default state of hidden", async () => {
        UiItemsManager.register(new TestHiddenWidgetProvider());

        const frontstageProvider = new TestFrontstageWithHiddenWidget();
        UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
        const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
          frontstageProvider.id
        );
        if (frontstageDef) frontstageDef.nineZoneState = createNineZoneState();

        await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
        const widgetDef = frontstageDef?.findWidgetDef(
          "TestHiddenWidgetProviderLM1"
        );
        expect(widgetDef).to.not.be.undefined;

        const wrapper = render(
          <Provider store={TestUtils.store}>
            <WidgetPanelsFrontstage />
          </Provider>
        );
        // should be hidden initially
        expect(
          wrapper.queryAllByText("TestHiddenWidgetProvider LM1 widget").length
        ).to.equal(0);

        act(() => {
          widgetDef?.setWidgetState(WidgetState.Open);
        });

        // should be present after setting state to Open
        expect(
          wrapper.queryAllByText("TestHiddenWidgetProvider LM1 widget").length
        ).to.equal(1);
      });

      it("should open collapsed panel when widget is opened", async () => {
        UiItemsManager.register(new TestHiddenWidgetProvider());

        const frontstageProvider = new TestFrontstageWithHiddenWidget();
        UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
        const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
          frontstageProvider.id
        );
        if (frontstageDef) {
          let state = createNineZoneState();
          state = produce(state, (draft) => {
            draft.panels.left.collapsed = true;
          });
          frontstageDef.nineZoneState = state;
        }

        await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
        const widgetDef = frontstageDef?.findWidgetDef(
          "TestHiddenWidgetProviderLM1"
        );
        expect(widgetDef).to.not.be.undefined;

        const wrapper = render(
          <Provider store={TestUtils.store}>
            <WidgetPanelsFrontstage />
          </Provider>
        );
        // should be hidden initially
        expect(
          wrapper.queryAllByText("TestHiddenWidgetProvider LM1 widget").length
        ).to.equal(0);

        act(() => {
          widgetDef?.setWidgetState(WidgetState.Open);
        });

        // should be present after setting state to Open
        expect(
          wrapper.queryAllByText("TestHiddenWidgetProvider LM1 widget").length
        ).to.equal(1);
      });

      it("should listen for window close event", async () => {
        UiItemsManager.register(new TestUi2Provider());
        const frontstageProvider = new TestFrontstageUi2();
        UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
        const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
          frontstageProvider.id
        );
        await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
        const spy = sinon.stub(frontstageDef!, "setIsApplicationClosing");
        const wrapper = render(
          <Provider store={TestUtils.store}>
            <WidgetPanelsFrontstage />
          </Provider>
        );
        window.dispatchEvent(new Event("unload"));
        sinon.assert.calledOnce(spy);
        wrapper.unmount();
      });

      it("should render pre-loaded extension widgets when state is restored", async () => {
        UiItemsManager.register(new TestUi2Provider());

        const spy = sinon.spy(localStorageMock, "getItem");
        let state = createNineZoneState();
        state = addTab(state, "LeftStart1");
        state = addPanelWidget(state, "left", "leftStart", ["LeftStart1"]);
        const setting = createFrontstageState(state);

        const uiStateStorage = new UiStateStorageStub();
        sinon.stub(uiStateStorage, "getSetting").resolves({
          status: UiStateStorageStatus.Success,
          setting,
        });

        const frontstageProvider = new TestFrontstageUi2();
        UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
        const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
          frontstageProvider.id
        );
        await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
        const { findByText } = render(
          <Provider store={TestUtils.store}>
            <WidgetPanelsFrontstage />
          </Provider>,
          {
            wrapper: (props) => <UiStateStorageHandler {...props} />,
          }
        );
        await findByText("Left Start 1");
        await findByText("TestUi2Provider RM1");
        await findByText("TestUi2Provider W1");

        sinon.assert.notCalled(spy);
      });

      it("should render loaded extension widgets", async () => {
        const frontstageProvider = new TestFrontstageUi2();
        UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
        const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
          frontstageProvider.id
        );
        await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
        const { findByText } = render(
          <Provider store={TestUtils.store}>
            <WidgetPanelsFrontstage />
          </Provider>
        );
        await findByText("Left Start 1");

        act(() => {
          UiItemsManager.register(new TestUi2Provider());
        });
        await findByText("TestUi2Provider RM1");
        await findByText("TestUi2Provider W1");
      });

      it("should stop rendering unloaded extension widgets", async () => {
        const frontstageProvider = new TestFrontstageUi2();
        UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
        const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
          frontstageProvider.id
        );

        await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
        render(
          <Provider store={TestUtils.store}>
            <WidgetPanelsFrontstage />
          </Provider>
        );

        act(() => {
          UiItemsManager.register(new TestUi2Provider());
        });

        await TestUtils.flushAsyncOperations();
        expect(frontstageDef?.nineZoneState?.tabs.LeftStart1, "LeftStart1").to
          .exist;
        expect(
          frontstageDef?.nineZoneState?.tabs.TestUi2ProviderRM1,
          "TestUi2ProviderRM1"
        ).to.exist;
        expect(
          frontstageDef?.nineZoneState?.tabs.TestUi2ProviderW1,
          "TestUi2ProviderW1"
        ).to.exist;
        frontstageDef?.nineZoneState?.widgets.rightEnd.tabs.should.eql(
          ["TestUi2ProviderRM1"],
          "rightEnd widget tabs"
        );
        frontstageDef?.nineZoneState?.widgets.leftStart.tabs.should.eql(
          ["LeftStart1", "TestUi2ProviderW1"],
          "leftStart widget tabs"
        );

        act(() => {
          UiItemsManager.unregister("TestUi2Provider");
        });

        await TestUtils.flushAsyncOperations();
        expect(
          frontstageDef?.nineZoneState?.tabs.LeftStart1,
          "LeftStart1 after unregister"
        ).to.exist;
        // tabs should remain but no widget container should reference them
        expect(
          frontstageDef?.nineZoneState?.tabs.TestUi2ProviderRM1,
          "TestUi2ProviderRM1 after unregister"
        ).to.not.exist;
        expect(
          frontstageDef?.nineZoneState?.tabs.TestUi2ProviderW1,
          "TestUi2ProviderW1 after unregister"
        ).to.not.exist;
        expect(
          frontstageDef?.nineZoneState?.widgets.rightEnd,
          "rightEnd widget"
        ).to.not.exist;
        frontstageDef?.nineZoneState?.widgets.leftStart.tabs.should.eql(
          ["LeftStart1"],
          "leftStart widget tabs"
        );
      });
    });
  });

  it("should set nineZoneSize when FLOATING_WIDGET_SET_BOUNDS is received", () => {
    const frontstageDef = new FrontstageDef();
    let nineZone = createNineZoneState({ size: { height: 1000, width: 1600 } });
    nineZone = addTab(nineZone, "t1");
    nineZone = addFloatingWidget(nineZone, "fw1", ["t1"], {
      bounds: { top: 10, left: 10, bottom: 40, right: 40 },
    });
    frontstageDef.nineZoneState = nineZone;
    const { result } = renderHook(() => useNineZoneDispatch(frontstageDef));
    result.current({
      type: "FLOATING_WIDGET_SET_BOUNDS",
      id: "fw1",
      bounds: { top: 100, left: 100, bottom: 400, right: 400 },
    });
    expect(frontstageDef.nineZoneState?.floatingWidgets.byId.fw1.bounds).to.eql(
      { top: 100, left: 100, bottom: 400, right: 400 }
    );
  });
});
