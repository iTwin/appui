/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Rectangle } from "@itwin/core-react";
import { render, screen } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import type { ToolSettingsEntry } from "../../appui-react";
import {
  ConfigurableCreateInfo,
  FrontstageDef,
  ToolSettingsContent,
  ToolSettingsDockedContent,
  ToolSettingsGrid,
  ToolUiProvider,
  UiFramework,
  useHorizontalToolSettingEntries,
  useToolSettingsNode,
  WidgetDef,
  WidgetPanelsToolSettings,
} from "../../appui-react";
import { InternalFrontstageManager } from "../../appui-react/frontstage/InternalFrontstageManager";
import {
  DragManager,
  DragManagerContext,
} from "../../appui-react/layout/base/DragManager";
import { createLayoutStore } from "../../appui-react/layout/base/LayoutStore";
import { NineZoneProvider } from "../../appui-react/layout/base/NineZone";
import { createNineZoneState } from "../../appui-react/layout/state/NineZoneState";
import { addTab } from "../../appui-react/layout/state/internal/TabStateHelpers";
import {
  addDockedToolSettings,
  addWidgetToolSettings,
} from "../../appui-react/layout/state/internal/ToolSettingsStateHelpers";
import { addFloatingWidget } from "../../appui-react/layout/state/internal/WidgetStateHelpers";
import TestUtils, { childStructure } from "../TestUtils";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";

describe("WidgetPanelsToolSettings", () => {
  beforeEach(async () => {
    await NoRenderApp.startup();
    await TestUtils.initializeUiFramework();
  });

  afterEach(async () => {
    TestUtils.terminateUiFramework();
    await IModelApp.shutdown();
  });

  it("should not render w/o tool settings top center zone", () => {
    sinon
      .stub(UiFramework.frontstages, "activeFrontstageDef")
      .get(() => undefined);
    const { container } = render(
      <NineZoneProvider
        dispatch={sinon.spy()}
        layout={createLayoutStore()}
        measure={sinon.spy()}
      >
        <WidgetPanelsToolSettings />
      </NineZoneProvider>
    );
    expect(container.innerHTML).to.eq("");
  });

  it("should render", () => {
    const frontstageDef = new FrontstageDef();
    const toolSettings = new WidgetDef();
    sinon
      .stub(UiFramework.frontstages, "activeFrontstageDef")
      .get(() => frontstageDef);
    sinon
      .stub(InternalFrontstageManager, "activeToolSettingsProvider")
      .get(() => undefined);
    sinon.stub(frontstageDef, "toolSettings").get(() => toolSettings);
    let state = createNineZoneState();
    state = addTab(state, "ts");
    state = addDockedToolSettings(state, "ts");
    const sut = render(
      <NineZoneProvider
        dispatch={sinon.spy()}
        layout={createLayoutStore(state)}
        measure={sinon.spy()}
      >
        <WidgetPanelsToolSettings />
      </NineZoneProvider>
    );
    sut.getByText(/tools.noToolSettingsStart/);
  });
});

describe("ToolSettingsDockedContent", () => {
  class ToolUiProviderMock extends ToolUiProvider {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);
    }
  }

  it("should render settings", () => {
    const activeToolSettingsProvider = new ToolUiProviderMock(
      new ConfigurableCreateInfo("test", "test", "test"),
      undefined
    );
    sinon
      .stub(InternalFrontstageManager, "activeToolSettingsProvider")
      .get(() => activeToolSettingsProvider);
    const horizontalToolSettingNodes: ToolSettingsEntry[] = [
      { labelNode: "Date", editorNode: <input type="date" /> },
    ];
    sinon
      .stub(activeToolSettingsProvider, "horizontalToolSettingNodes")
      .get(() => horizontalToolSettingNodes);
    const sut = render(
      <DragManagerContext.Provider value={new DragManager()}>
        <ToolSettingsDockedContent />
      </DragManagerContext.Provider>
    );
    sut.getByText("Date");
  });
});

describe("ToolSettingsGrid", () => {
  it("should render", () => {
    const entries: ToolSettingsEntry[] = [
      { labelNode: "Date", editorNode: <input type="date" /> },
    ];

    render(<ToolSettingsGrid settings={entries} />);
    expect(
      screen.getByText("Date", {
        selector:
          ".uifw-standard-toolsettings-two-column-grid .uifw-standard-toolsettings-label-entry",
      }).parentElement
    ).to.satisfy(childStructure("input[type='date']"));
  });
});

describe("ToolSettingsContent", () => {
  class ToolUiProviderMock extends ToolUiProvider {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);
    }
  }

  it("should not render if not in 'widget' mode", () => {
    const { container } = render(
      <NineZoneProvider
        dispatch={sinon.spy()}
        measure={sinon.spy()}
        layout={createLayoutStore()}
      >
        <ToolSettingsContent />
      </NineZoneProvider>
    );
    expect(container.firstChild).to.be.null;
  });

  it("should render (Floating Widget mode)", () => {
    const activeToolSettingsProvider = new ToolUiProviderMock(
      new ConfigurableCreateInfo("test", "test", "test"),
      undefined
    );
    sinon
      .stub(InternalFrontstageManager, "activeToolSettingsProvider")
      .get(() => activeToolSettingsProvider);
    sinon
      .stub(activeToolSettingsProvider, "toolSettingsNode")
      .get(() => <div>Hello World</div>);
    let state = createNineZoneState();
    state = addTab(state, "ts");
    state = addFloatingWidget(state, "fw1", ["ts"]);
    state = addWidgetToolSettings(state, "ts");
    const layout = createLayoutStore(state);
    const component = render(
      <NineZoneProvider
        layout={layout}
        dispatch={sinon.stub()}
        measure={() => new Rectangle()}
      >
        <div className="nz-floating-toolsettings">
          <ToolSettingsContent />
        </div>
      </NineZoneProvider>
    );
    component.getByText("Hello World");
  });
});

describe("useHorizontalToolSettingEntries", () => {
  it("should add tool activated event listener", () => {
    const addListenerSpy = sinon.spy(
      UiFramework.frontstages.onToolActivatedEvent,
      "addListener"
    );
    const removeListenerSpy = sinon.spy(
      UiFramework.frontstages.onToolActivatedEvent,
      "removeListener"
    );
    const sut = renderHook(() => useHorizontalToolSettingEntries());
    sut.unmount();
    addListenerSpy.calledOnce.should.true;
    removeListenerSpy.calledOnce.should.true;
  });

  it("should add tool settings reload event listener", () => {
    const addListenerSpy = sinon.spy(
      UiFramework.frontstages.onToolSettingsReloadEvent,
      "addListener"
    );
    const removeListenerSpy = sinon.spy(
      UiFramework.frontstages.onToolSettingsReloadEvent,
      "removeListener"
    );
    const sut = renderHook(() => useHorizontalToolSettingEntries());
    act(() => {
      UiFramework.frontstages.onToolSettingsReloadEvent.emit();
    });
    sut.unmount();
    addListenerSpy.calledOnce.should.true;
    removeListenerSpy.calledOnce.should.true;
  });

  it("should not return undefined if activeToolSettingsProvider is unset", () => {
    const { result } = renderHook(() => useHorizontalToolSettingEntries());
    act(() => {
      UiFramework.frontstages.onToolActivatedEvent.emit({ toolId: "t1" });
    });
    (result.current === undefined).should.false;
  });

  it("should update tool settings", () => {
    const node = <></>;
    const entries: ToolSettingsEntry[] = [
      { labelNode: "Date", editorNode: <input type="date" /> },
    ];

    class Tool1UiProvider extends ToolUiProvider {
      constructor(info: ConfigurableCreateInfo, options: any) {
        super(info, options);
        this.toolSettingsNode = node;
        this.horizontalToolSettingNodes = this.getHorizontalToolSettings();
      }

      private getHorizontalToolSettings(): ToolSettingsEntry[] | undefined {
        return entries;
      }
    }

    sinon
      .stub(InternalFrontstageManager, "activeToolSettingsProvider")
      .get(
        () =>
          new Tool1UiProvider(
            new ConfigurableCreateInfo("test", "test", "test"),
            undefined
          )
      );
    const sut = renderHook(() => useHorizontalToolSettingEntries());

    act(() => {
      sinon
        .stub(InternalFrontstageManager, "activeToolSettingsProvider")
        .get(
          () =>
            new Tool1UiProvider(
              new ConfigurableCreateInfo("test", "test", "test"),
              undefined
            )
        );
      UiFramework.frontstages.onToolActivatedEvent.emit({
        toolId: "",
      });
      UiFramework.frontstages.onToolSettingsReloadEvent.emit();
    });

    expect(sut.result.current).to.eq(entries);
  });
});

describe("useToolSettingsNode", () => {
  class ToolUiProviderMock extends ToolUiProvider {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);
    }
  }

  it("should add/remove tool activated event listener", () => {
    const addListenerSpy = sinon.spy(
      UiFramework.frontstages.onToolActivatedEvent,
      "addListener"
    );
    const removeListenerSpy = sinon.spy(
      UiFramework.frontstages.onToolActivatedEvent,
      "removeListener"
    );
    const sut = renderHook(() => useToolSettingsNode());
    sut.unmount();
    addListenerSpy.calledOnce.should.true;
    removeListenerSpy.calledOnce.should.true;
  });

  it("should add/remove tool settings reload event listener", () => {
    const addListenerSpy = sinon.spy(
      UiFramework.frontstages.onToolSettingsReloadEvent,
      "addListener"
    );
    const removeListenerSpy = sinon.spy(
      UiFramework.frontstages.onToolSettingsReloadEvent,
      "removeListener"
    );
    const sut = renderHook(() => useToolSettingsNode());
    UiFramework.frontstages.onToolSettingsReloadEvent.emit();
    sut.unmount();
    addListenerSpy.calledOnce.should.true;
    removeListenerSpy.calledOnce.should.true;
  });

  it("should update toolSettingsNode", () => {
    const activeToolSettingsProvider = new ToolUiProviderMock(
      new ConfigurableCreateInfo("test", "test", "test"),
      undefined
    );
    sinon
      .stub(InternalFrontstageManager, "activeToolSettingsProvider")
      .get(() => activeToolSettingsProvider);
    const sut = renderHook(() => useToolSettingsNode());

    const node = <div>Hello World</div>;
    act(() => {
      sinon
        .stub(activeToolSettingsProvider, "toolSettingsNode")
        .get(() => node);
      UiFramework.frontstages.onToolActivatedEvent.emit({
        toolId: "",
      });
      UiFramework.frontstages.onToolSettingsReloadEvent.emit();
    });

    sut.result.current!.should.eq(node);
  });

  it("should initialize to undefined w/o active activeToolSettingsProvider", () => {
    sinon
      .stub(InternalFrontstageManager, "activeToolSettingsProvider")
      .get(() => undefined);
    const { result } = renderHook(() => useToolSettingsNode());

    (result.current === undefined).should.true;
  });

  it("should return undefined if activeToolSettingsProvider is unset", () => {
    const { result } = renderHook(() => useToolSettingsNode());
    act(() => {
      UiFramework.frontstages.setActiveToolId("t1");
    });
    (result.current === undefined).should.true;
  });
});
