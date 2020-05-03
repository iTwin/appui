/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { shallow } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { DragManager, DragManagerContext, ToolSettingsStateContext } from "@bentley/ui-ninezone";
import { render } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import {
  ConfigurableCreateInfo, FrontstageDef, FrontstageManager, ToolSettingsContent, ToolSettingsDockedContent, ToolSettingsEntry, ToolSettingsGrid,
  ToolUiProvider, useHorizontalToolSettingNodes, useToolSettingsNode, WidgetPanelsToolSettings, ZoneDef,
} from "../../ui-framework";

describe("WidgetPanelsToolSettings", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it("should not render w/o tool settings top center zone", () => {
    sandbox.stub(FrontstageManager, "activeFrontstageDef").get(() => undefined);
    const sut = shallow(<WidgetPanelsToolSettings />);
    sut.should.matchSnapshot();
  });

  it("should render", () => {
    const frontstageDef = new FrontstageDef();
    const topCenter = new ZoneDef();
    sandbox.stub(FrontstageManager, "activeFrontstageDef").get(() => frontstageDef);
    sandbox.stub(frontstageDef, "topCenter").get(() => topCenter);
    sandbox.stub(topCenter, "isToolSettings").get(() => true);
    const { container } = render(
      <DragManagerContext.Provider value={new DragManager()}>
        <ToolSettingsStateContext.Provider value={{ type: "docked" }}>
          <WidgetPanelsToolSettings />
        </ToolSettingsStateContext.Provider>
      </DragManagerContext.Provider>,
    );
    container.firstChild!.should.matchSnapshot();
  });
});

describe("ToolSettingsDockedContent", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  class ToolUiProviderMock extends ToolUiProvider {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);
    }
  }

  it("should render settings", () => {
    const activeToolSettingsProvider = new ToolUiProviderMock(new ConfigurableCreateInfo("test", "test", "test"), undefined);
    sandbox.stub(FrontstageManager, "activeToolSettingsProvider").get(() => activeToolSettingsProvider);
    const horizontalToolSettingNodes: ToolSettingsEntry[] = [{ labelNode: "Date", editorNode: <input type="date" /> }];
    sandbox.stub(activeToolSettingsProvider, "horizontalToolSettingNodes").get(() => horizontalToolSettingNodes);
    const { container } = render(
      <DragManagerContext.Provider value={new DragManager()}>
        <ToolSettingsDockedContent />
      </DragManagerContext.Provider>,
    );
    container.firstChild!.should.matchSnapshot();
  });
});

describe("useHorizontalToolSettingNodes", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it("should add tool activated event listener", () => {
    const addListenerSpy = sandbox.spy(FrontstageManager.onToolActivatedEvent, "addListener");
    const removeListenerSpy = sandbox.spy(FrontstageManager.onToolActivatedEvent, "removeListener");
    const sut = renderHook(() => useHorizontalToolSettingNodes());
    sut.unmount();
    addListenerSpy.calledOnce.should.true;
    removeListenerSpy.calledOnce.should.true;
  });

  it("should update tool settings", () => {
    const node = <></>;
    const entries: ToolSettingsEntry[] = [{ labelNode: "Date", editorNode: <input type="date" /> }];

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

    sandbox.stub(FrontstageManager, "activeToolSettingsProvider").get(() => new Tool1UiProvider(new ConfigurableCreateInfo("test", "test", "test"), undefined));
    const sut = renderHook(() => useHorizontalToolSettingNodes());

    act(() => {
      sandbox.stub(FrontstageManager, "activeToolSettingsProvider").get(() => new Tool1UiProvider(new ConfigurableCreateInfo("test", "test", "test"), undefined));
      FrontstageManager.onToolActivatedEvent.emit({
        toolId: "",
      });
    });

    sut.result.current!.should.eq(entries);
  });

  it("ToolSettingsGrid should render", () => {
    const entries: ToolSettingsEntry[] = [{ labelNode: "Date", editorNode: <input type="date" /> }];

    const sut = shallow(<ToolSettingsGrid settings={entries} />);
    sut.should.matchSnapshot();
  });

});

describe("ToolSettingsContent", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  class ToolUiProviderMock extends ToolUiProvider {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);
    }
  }

  it("should not render if not in 'widget' mode", () => {
    const { container } = render(
      <ToolSettingsStateContext.Provider value={{ type: "docked" }}>
        <ToolSettingsContent />
      </ToolSettingsStateContext.Provider>,
    );
    (container.firstChild === null).should.true;
  });

  it("should render", () => {
    const activeToolSettingsProvider = new ToolUiProviderMock(new ConfigurableCreateInfo("test", "test", "test"), undefined);
    sandbox.stub(FrontstageManager, "activeToolSettingsProvider").get(() => activeToolSettingsProvider);
    sandbox.stub(activeToolSettingsProvider, "toolSettingsNode").get(() => <div>Hello World</div>);
    const { container } = render(
      <ToolSettingsStateContext.Provider value={{ type: "widget" }}>
        <ToolSettingsContent />
      </ToolSettingsStateContext.Provider>,
    );
    container.firstChild!.should.matchSnapshot();
  });
});

describe("useToolSettingsNode", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  class ToolUiProviderMock extends ToolUiProvider {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);
    }
  }

  it("should add/remove tool activated event listener", () => {
    const addListenerSpy = sandbox.spy(FrontstageManager.onToolActivatedEvent, "addListener");
    const removeListenerSpy = sandbox.spy(FrontstageManager.onToolActivatedEvent, "removeListener");
    const sut = renderHook(() => useToolSettingsNode());
    sut.unmount();
    addListenerSpy.calledOnce.should.true;
    removeListenerSpy.calledOnce.should.true;
  });

  it("should update toolSettingsNode", () => {
    const activeToolSettingsProvider = new ToolUiProviderMock(new ConfigurableCreateInfo("test", "test", "test"), undefined);
    sandbox.stub(FrontstageManager, "activeToolSettingsProvider").get(() => activeToolSettingsProvider);
    const sut = renderHook(() => useToolSettingsNode());

    const node = <div>Hello World</div>;
    act(() => {
      sandbox.stub(activeToolSettingsProvider, "toolSettingsNode").get(() => node);
      FrontstageManager.onToolActivatedEvent.emit({
        toolId: "",
      });
    });

    sut.result.current!.should.eq(node);
  });

  it("should initialize to undefined w/o active activeToolSettingsProvider", () => {
    sandbox.stub(FrontstageManager, "activeToolSettingsProvider").get(() => undefined);
    const sut = renderHook(() => useToolSettingsNode());

    (sut.result.current === undefined).should.true;
  });
});
