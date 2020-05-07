/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as sinon from "sinon";
import * as ResizeObserverModule from "@bentley/ui-core/lib/ui-core/utils/hooks/ResizeObserverPolyfill"; // tslint:disable-line: no-direct-imports
import { act, fireEvent, queryByText, render } from "@testing-library/react";
import {
  DockedToolSetting, DockedToolSettings, DragManager, DragManagerContext, eqlOverflown, getOverflown, onOverflowLabelAndEditorResize,
} from "../../ui-ninezone";
import { createDOMRect, ResizeObserverMock } from "../Utils";

function DragManagerProvider(props: { children?: React.ReactNode }) {
  const dragManager = React.useRef(new DragManager());
  return (
    <DragManagerContext.Provider value={dragManager.current}>
      {props.children}
    </DragManagerContext.Provider>
  );
}

describe("DockedToolSettings", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it("should render w/o entries", () => {
    const { container } = render(<DockedToolSettings />,
      {
        wrapper: DragManagerProvider,
      },
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render", () => {
    const { container } = render(
      <DockedToolSettings>
        <div>Entry 1</div>
        <>Entry 2</>
        Entry 3
        <span>Entry 4</span>
      </DockedToolSettings>,
      {
        wrapper: DragManagerProvider,
      },
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render overflow button", () => {
    // tslint:disable-next-line: only-arrow-functions
    sandbox.stub(Element.prototype, "getBoundingClientRect").callsFake(function (this: HTMLElement) {
      if (this.classList.contains("nz-toolSettings-docked")) {
        return createDOMRect({ width: 100 });
      } else if (queryByText(this, /Entry [0-9]$/)) {
        return createDOMRect({ width: 50 });
      }
      return createDOMRect();
    });
    const { container } = render(
      <DockedToolSettings>
        <>Entry 1</>
        <>Entry 2</>
        <>Entry 3</>
      </DockedToolSettings>,
      {
        wrapper: DragManagerProvider,
      },
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render overflown entries", () => {
    // tslint:disable-next-line: only-arrow-functions
    sandbox.stub(Element.prototype, "getBoundingClientRect").callsFake(function (this: HTMLElement) {
      if (this.classList.contains("nz-toolSettings-docked")) {
        return createDOMRect({ width: 100 });
      } else if (queryByText(this, /Entry [0-9]$/)) {
        return createDOMRect({ width: 50 });
      }
      return createDOMRect();
    });
    const { container } = render(
      <DockedToolSettings>
        <>Entry 1</>
        <>Entry 2</>
        <>Entry 3</>
      </DockedToolSettings>,
      {
        wrapper: DragManagerProvider,
      },
    );

    act(() => {
      fireEvent.click(document.getElementsByClassName("nz-toolSettings-overflow")[0]);
    });
    container.firstChild!.should.matchSnapshot();
  });

  it("should render panel container", () => {
    // tslint:disable-next-line: only-arrow-functions
    sandbox.stub(Element.prototype, "getBoundingClientRect").callsFake(function (this: HTMLElement) {
      if (this.classList.contains("nz-toolSettings-docked")) {
        return createDOMRect({ width: 100 });
      } else if (queryByText(this, /Entry [0-9]$/)) {
        return createDOMRect({ width: 50 });
      }
      return createDOMRect();
    });
    const { container } = render(
      <DockedToolSettings
        panelContainer={(props) => <div className="panel-container">{props.children}</div>}
      >
        <DockedToolSetting>Entry 1</DockedToolSetting>
        <DockedToolSetting>Entry 2</DockedToolSetting>
        <DockedToolSetting>Entry 3</DockedToolSetting>
      </DockedToolSettings>,
      {
        wrapper: DragManagerProvider,
      },
    );

    act(() => {
      fireEvent.click(document.getElementsByClassName("nz-toolSettings-overflow")[0]);
    });
    container.firstChild!.should.matchSnapshot();
  });

  it("should close overflow panel on outside click", () => {
    // tslint:disable-next-line: only-arrow-functions
    sandbox.stub(Element.prototype, "getBoundingClientRect").callsFake(function (this: HTMLElement) {
      if (this.classList.contains("nz-toolSettings-docked")) {
        return createDOMRect({ width: 100 });
      } else if (queryByText(this, /Entry [0-9]$/)) {
        return createDOMRect({ width: 50 });
      }
      return createDOMRect();
    });
    render(
      <DockedToolSettings>
        <DockedToolSetting>Entry 1</DockedToolSetting>
        <DockedToolSetting>Entry 2</DockedToolSetting>
        <DockedToolSetting>Entry 3</DockedToolSetting>
      </DockedToolSettings>,
      {
        wrapper: DragManagerProvider,
      },
    );

    act(() => {
      fireEvent.click(document.getElementsByClassName("nz-toolSettings-overflow")[0]);
    });

    document.getElementsByClassName("nz-toolSettings-panel").length.should.eq(1);

    act(() => {
      fireEvent.pointerDown(document);
      fireEvent.pointerUp(document);
    });

    document.getElementsByClassName("nz-toolSettings-panel").length.should.eq(0);
  });

  it("should recalculate overflow on resize", () => {
    let width = 100;
    // tslint:disable-next-line: only-arrow-functions
    sandbox.stub(Element.prototype, "getBoundingClientRect").callsFake(function (this: HTMLElement) {
      if (this.classList.contains("nz-toolSettings-docked")) {
        return createDOMRect({ width });
      } else if (queryByText(this, /Entry [0-9]$/)) {
        return createDOMRect({ width: 50 });
      }
      return createDOMRect();
    });

    let resizeObserver: ResizeObserverMock | undefined;
    let target: Element | undefined;
    sandbox.stub(ResizeObserverModule, "ResizeObserver").callsFake((callback) => new ResizeObserverMock(callback));
    sandbox.stub(ResizeObserverMock.prototype, "observe").callsFake(function (this: ResizeObserverMock, element: Element) {
      if (element.classList.contains("nz-toolSettings-docked")) {
        resizeObserver = this;
        target = element;
      }
    });

    const { queryAllByText } = render(
      <DockedToolSettings>
        <DockedToolSetting>Entry 1</DockedToolSetting>
        <DockedToolSetting>Entry 2</DockedToolSetting>
        <DockedToolSetting>Entry 3</DockedToolSetting>
      </DockedToolSettings>,
      {
        wrapper: DragManagerProvider,
      },
    );

    queryAllByText(/Entry [0-9]$/).length.should.eq(2);

    act(() => {
      width = 50;
      resizeObserver!.callback([{
        contentRect: createDOMRect(),
        target: target!,
      }], resizeObserver!);
    });

    queryAllByText(/Entry [0-9]$/).length.should.eq(1);
  });

  it("should recalculate overflow on entry resize", () => {
    let width = 50;
    // tslint:disable-next-line: only-arrow-functions
    sandbox.stub(Element.prototype, "getBoundingClientRect").callsFake(function (this: HTMLElement) {
      if (this.classList.contains("nz-toolSettings-docked")) {
        return createDOMRect({ width: 100 });
      } else if (queryByText(this, /Entry [0-9]$/)) {
        return createDOMRect({ width });
      }
      return createDOMRect();
    });

    let resizeObserver: ResizeObserverMock | undefined;
    let target: Element | undefined;
    sandbox.stub(ResizeObserverModule, "ResizeObserver").callsFake((callback) => new ResizeObserverMock(callback));
    sandbox.stub(ResizeObserverMock.prototype, "observe").callsFake(function (this: ResizeObserverMock, element: Element) {
      if (element instanceof HTMLElement && element.classList.contains("nz-toolSettings-setting") && queryByText(element, "Entry 1")) {
        resizeObserver = this;
        target = element;
      }
    });

    const { queryAllByText } = render(
      <DockedToolSettings>
        <DockedToolSetting>Entry 1</DockedToolSetting>
        <DockedToolSetting>Entry 2</DockedToolSetting>
        <DockedToolSetting>Entry 3</DockedToolSetting>
      </DockedToolSettings>,
      {
        wrapper: DragManagerProvider,
      },
    );

    queryAllByText(/Entry [0-9]$/).length.should.eq(2);

    act(() => {
      width = 100;
      resizeObserver!.callback([{
        contentRect: createDOMRect(),
        target: target!,
      }], resizeObserver!);
    });

    queryAllByText(/Entry [0-9]$/).length.should.eq(1);
  });
});

describe("getOverflown", () => {
  it("should overflow additional entries when overflow width is known", () => {
    const overflown = getOverflown(100, [
      ["1", 40],
      ["2", 40],
      ["3", 40],
    ], 50);
    overflown.should.eql(["2", "3"]);
  });

  it("should not overflow active item", () => {
    const overflown = getOverflown(100, [
      ["1", 40],
      ["2", 40],
      ["3", 40],
    ], 50, 1);
    overflown.should.eql(["1", "3"]);
  });
});

describe("onOverflowLabelAndEditorResize", () => {
  it("should not throw", () => {
    (() => onOverflowLabelAndEditorResize()).should.not.throw();
  });
});

describe("eqlOverflown", () => {
  it("should return false if entries are not equal", () => {
    eqlOverflown(["a", "b"], ["a", "c"]).should.false;
  });
});
