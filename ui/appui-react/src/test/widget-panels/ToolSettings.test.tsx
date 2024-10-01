/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Rectangle } from "@itwin/core-react";
import { act, render, renderHook } from "@testing-library/react";
import * as React from "react";
import type { ToolSettingsEntry } from "../../appui-react.js";
import {
  ConfigurableCreateInfo,
  FrontstageDef,
  ToolSettingsContent,
  ToolSettingsDockedContent,
  ToolUiProvider,
  UiFramework,
  useHorizontalToolSettingEntries,
  useToolSettingsNode,
  WidgetDef,
  WidgetPanelsToolSettings,
} from "../../appui-react.js";
import { InternalFrontstageManager } from "../../appui-react/frontstage/InternalFrontstageManager.js";
import {
  DragManager,
  DragManagerContext,
} from "../../appui-react/layout/base/DragManager.js";
import { createLayoutStore } from "../../appui-react/layout/base/LayoutStore.js";
import { NineZoneProvider } from "../../appui-react/layout/base/NineZone.js";
import { createNineZoneState } from "../../appui-react/layout/state/NineZoneState.js";
import { addTab } from "../../appui-react/layout/state/internal/TabStateHelpers.js";
import {
  addDockedToolSettings,
  addWidgetToolSettings,
} from "../../appui-react/layout/state/internal/ToolSettingsStateHelpers.js";
import { addFloatingWidget } from "../../appui-react/layout/state/internal/WidgetStateHelpers.js";

describe("WidgetPanelsToolSettings", () => {
  it("should not render w/o tool settings top center zone", () => {
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => undefined);
    const { container } = render(
      <NineZoneProvider
        dispatch={vi.fn()}
        layout={createLayoutStore()}
        measure={vi.fn()}
      >
        <WidgetPanelsToolSettings />
      </NineZoneProvider>
    );
    expect(container.innerHTML).toEqual("");
  });

  it("should render", () => {
    const frontstageDef = new FrontstageDef();
    const toolSettings = new WidgetDef();
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstageDef);
    vi.spyOn(
      InternalFrontstageManager,
      "activeToolSettingsProvider",
      "get"
    ).mockImplementation(() => undefined);
    vi.spyOn(frontstageDef, "toolSettings", "get").mockImplementation(
      () => toolSettings
    );
    let state = createNineZoneState();
    state = addTab(state, "ts");
    state = addDockedToolSettings(state, "ts");
    const sut = render(
      <NineZoneProvider
        dispatch={vi.fn()}
        layout={createLayoutStore(state)}
        measure={vi.fn()}
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
    vi.spyOn(
      InternalFrontstageManager,
      "activeToolSettingsProvider",
      "get"
    ).mockImplementation(() => activeToolSettingsProvider);
    const horizontalToolSettingNodes: ToolSettingsEntry[] = [
      { labelNode: "Date", editorNode: <input type="date" /> },
    ];
    vi.spyOn(
      activeToolSettingsProvider,
      "horizontalToolSettingNodes",
      "get"
    ).mockImplementation(() => horizontalToolSettingNodes);
    const sut = render(
      <DragManagerContext.Provider value={new DragManager()}>
        <ToolSettingsDockedContent />
      </DragManagerContext.Provider>
    );
    sut.getByText("Date");
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
        dispatch={vi.fn()}
        measure={vi.fn()}
        layout={createLayoutStore()}
      >
        <ToolSettingsContent />
      </NineZoneProvider>
    );
    expect(container.firstChild).toEqual(null);
  });

  it("should render (Floating Widget mode)", () => {
    const activeToolSettingsProvider = new ToolUiProviderMock(
      new ConfigurableCreateInfo("test", "test", "test"),
      undefined
    );
    vi.spyOn(
      InternalFrontstageManager,
      "activeToolSettingsProvider",
      "get"
    ).mockImplementation(() => activeToolSettingsProvider);
    vi.spyOn(
      activeToolSettingsProvider,
      "toolSettingsNode",
      "get"
    ).mockImplementation(() => <div>Hello World</div>);
    let state = createNineZoneState();
    state = addTab(state, "ts");
    state = addFloatingWidget(state, "fw1", ["ts"]);
    state = addWidgetToolSettings(state, "ts");
    const layout = createLayoutStore(state);
    const component = render(
      <NineZoneProvider
        layout={layout}
        dispatch={vi.fn()}
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
    const addListenerSpy = vi.spyOn(
      UiFramework.frontstages.onToolActivatedEvent,
      "addListener"
    );
    const removeListenerSpy = vi.spyOn(
      UiFramework.frontstages.onToolActivatedEvent,
      "removeListener"
    );
    const sut = renderHook(() => useHorizontalToolSettingEntries());
    sut.unmount();
    expect(addListenerSpy).toHaveBeenCalledOnce();
    expect(removeListenerSpy).toHaveBeenCalledOnce();
  });

  it("should add tool settings reload event listener", () => {
    const addListenerSpy = vi.spyOn(
      UiFramework.frontstages.onToolSettingsReloadEvent,
      "addListener"
    );
    const removeListenerSpy = vi.spyOn(
      UiFramework.frontstages.onToolSettingsReloadEvent,
      "removeListener"
    );
    const sut = renderHook(() => useHorizontalToolSettingEntries());
    act(() => {
      UiFramework.frontstages.onToolSettingsReloadEvent.emit();
    });
    sut.unmount();
    expect(addListenerSpy).toHaveBeenCalledOnce();
    expect(removeListenerSpy).toHaveBeenCalledOnce();
  });

  it("should return undefined if activeToolSettingsProvider is unset", () => {
    const { result } = renderHook(() => useHorizontalToolSettingEntries());
    vi.spyOn(
      InternalFrontstageManager,
      "activeToolSettingsProvider",
      "get"
    ).mockReturnValue(undefined);
    act(() => {
      UiFramework.frontstages.onToolActivatedEvent.emit({ toolId: "t1" });
    });
    expect(result.current).toEqual(undefined);
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

    vi.spyOn(
      InternalFrontstageManager,
      "activeToolSettingsProvider",
      "get"
    ).mockImplementation(
      () =>
        new Tool1UiProvider(
          new ConfigurableCreateInfo("test", "test", "test"),
          undefined
        )
    );
    const sut = renderHook(() => useHorizontalToolSettingEntries());

    act(() => {
      vi.spyOn(
        InternalFrontstageManager,
        "activeToolSettingsProvider",
        "get"
      ).mockImplementation(
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

    expect(sut.result.current).toEqual(entries);
  });
});

describe("useToolSettingsNode", () => {
  class ToolUiProviderMock extends ToolUiProvider {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);
    }
  }

  it("should add/remove tool activated event listener", () => {
    const addListenerSpy = vi.spyOn(
      UiFramework.frontstages.onToolActivatedEvent,
      "addListener"
    );
    const removeListenerSpy = vi.spyOn(
      UiFramework.frontstages.onToolActivatedEvent,
      "removeListener"
    );
    const sut = renderHook(() => useToolSettingsNode());
    sut.unmount();
    expect(addListenerSpy).toHaveBeenCalledOnce();
    expect(removeListenerSpy).toHaveBeenCalledOnce();
  });

  it("should add/remove tool settings reload event listener", () => {
    const addListenerSpy = vi.spyOn(
      UiFramework.frontstages.onToolSettingsReloadEvent,
      "addListener"
    );
    const removeListenerSpy = vi.spyOn(
      UiFramework.frontstages.onToolSettingsReloadEvent,
      "removeListener"
    );
    const sut = renderHook(() => useToolSettingsNode());
    UiFramework.frontstages.onToolSettingsReloadEvent.emit();
    sut.unmount();
    expect(addListenerSpy).toHaveBeenCalledOnce();
    expect(removeListenerSpy).toHaveBeenCalledOnce();
  });

  it("should update toolSettingsNode", () => {
    const activeToolSettingsProvider = new ToolUiProviderMock(
      new ConfigurableCreateInfo("test", "test", "test"),
      undefined
    );
    vi.spyOn(
      InternalFrontstageManager,
      "activeToolSettingsProvider",
      "get"
    ).mockImplementation(() => activeToolSettingsProvider);
    const sut = renderHook(() => useToolSettingsNode());

    const node = <div>Hello World</div>;
    act(() => {
      vi.spyOn(
        activeToolSettingsProvider,
        "toolSettingsNode",
        "get"
      ).mockImplementation(() => node);
      UiFramework.frontstages.onToolActivatedEvent.emit({
        toolId: "",
      });
      UiFramework.frontstages.onToolSettingsReloadEvent.emit();
    });

    expect(sut.result.current).toEqual(node);
  });

  it("should initialize to undefined w/o active activeToolSettingsProvider", () => {
    vi.spyOn(
      InternalFrontstageManager,
      "activeToolSettingsProvider",
      "get"
    ).mockImplementation(() => undefined);
    const { result } = renderHook(() => useToolSettingsNode());

    expect(result.current).toEqual(undefined);
  });

  it("should return undefined if activeToolSettingsProvider is unset", () => {
    const { result } = renderHook(() => useToolSettingsNode());
    act(() => {
      UiFramework.frontstages.setActiveToolId("t1");
    });
    expect(result.current).toEqual(undefined);
  });
});
