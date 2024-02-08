/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import * as ResizeObserverModule from "@itwin/core-react/lib/cjs/core-react/utils/hooks/ResizeObserverPolyfill";
import { act, fireEvent, queryByText, render } from "@testing-library/react";
import {
  DockedToolSettings,
  eqlOverflown,
  getOverflown,
  onOverflowLabelAndEditorResize,
} from "../../../appui-react/layout/tool-settings/Docked";
import { DockedToolSetting } from "../../../appui-react/layout/tool-settings/Setting";
import { DragManagerProvider, TestNineZoneProvider } from "../Providers";
import { flushAsyncOperations, ResizeObserverMock } from "../Utils";

describe("DockedToolSettings", () => {
  it("should render w/o entries", () => {
    const sut = render(<DockedToolSettings />, {
      wrapper: (props) => (
        <TestNineZoneProvider
          labels={{ toolSettingsHandleTitle: "Undock" }}
          {...props}
        />
      ),
    });
    sut.getByTitle("Undock");
  });

  it("should render", () => {
    const sut = render(
      <DockedToolSettings>
        <div>Entry 1</div>
        <>Entry 2</>
        Entry 3<span>Entry 4</span>
      </DockedToolSettings>,
      {
        wrapper: DragManagerProvider,
      }
    );
    sut.getByText("Entry 1");
    sut.getByText("Entry 2");
    sut.getByText("Entry 3");
    sut.getByText("Entry 4");
  });

  it("should render overflow button", () => {
    sinon
      .stub(Element.prototype, "getBoundingClientRect")
      .callsFake(function (this: HTMLElement) {
        if (this.classList.contains("nz-toolSettings-docked")) {
          return DOMRect.fromRect({ width: 100 });
        } else if (this.classList.contains("nz-toolSettings-setting")) {
          return DOMRect.fromRect({ width: 50 });
        }
        return new DOMRect();
      });
    const sut = render(
      <DockedToolSettings>
        <DockedToolSetting>Entry 1</DockedToolSetting>
        <DockedToolSetting>Entry 2</DockedToolSetting>
        <DockedToolSetting>Entry 3</DockedToolSetting>
      </DockedToolSettings>,
      {
        wrapper: DragManagerProvider,
      }
    );
    sut.getByText("Entry 1");
    sut.getByText("Entry 2");
    expect(sut.queryByText("Entry 3")).to.not.exist;
  });

  it("should render overflown entries", () => {
    sinon
      .stub(Element.prototype, "getBoundingClientRect")
      .callsFake(function (this: HTMLElement) {
        if (this.classList.contains("nz-toolSettings-docked")) {
          return DOMRect.fromRect({ width: 100 });
        } else if (this.classList.contains("nz-toolSettings-setting")) {
          return DOMRect.fromRect({ width: 50 });
        }
        return new DOMRect();
      });
    const sut = render(
      <DockedToolSettings>
        <DockedToolSetting>Entry 1</DockedToolSetting>
        <DockedToolSetting>Entry 2</DockedToolSetting>
        <DockedToolSetting>Entry 3</DockedToolSetting>
      </DockedToolSettings>,
      {
        wrapper: DragManagerProvider,
      }
    );

    act(() => {
      fireEvent.click(
        document.getElementsByClassName("nz-toolSettings-overflow")[0]
      );
    });
    sut.getByText("Entry 1");
    sut.getByText("Entry 2");
    sut.getByText("Entry 3");
  });

  it("should render panel container", () => {
    sinon
      .stub(Element.prototype, "getBoundingClientRect")
      .callsFake(function (this: HTMLElement) {
        if (this.classList.contains("nz-toolSettings-docked")) {
          return DOMRect.fromRect({ width: 100 });
        } else if (this.classList.contains("nz-toolSettings-setting")) {
          return DOMRect.fromRect({ width: 50 });
        }
        return new DOMRect();
      });
    const sut = render(
      <DockedToolSettings
        panelContainer={(props) => <div>Overflow:{props.children}</div>}
      >
        <DockedToolSetting>Entry 1</DockedToolSetting>
        <DockedToolSetting>Entry 2</DockedToolSetting>
        <DockedToolSetting>Entry 3</DockedToolSetting>
      </DockedToolSettings>,
      {
        wrapper: DragManagerProvider,
      }
    );

    act(() => {
      fireEvent.click(
        document.getElementsByClassName("nz-toolSettings-overflow")[0]
      );
    });
    sut.getByText("Entry 1");
    sut.getByText("Entry 2");
    sut.getByText("Overflow:Entry 3");
  });

  it("should close overflow panel on outside click", () => {
    sinon
      .stub(Element.prototype, "getBoundingClientRect")
      .callsFake(function (this: HTMLElement) {
        if (this.classList.contains("nz-toolSettings-docked")) {
          return DOMRect.fromRect({ width: 100 });
        } else if (this.classList.contains("nz-toolSettings-setting")) {
          return DOMRect.fromRect({ width: 50 });
        }
        return new DOMRect();
      });
    const sut = render(
      <DockedToolSettings>
        <DockedToolSetting>Entry 1</DockedToolSetting>
        <DockedToolSetting>Entry 2</DockedToolSetting>
        <DockedToolSetting>Entry 3</DockedToolSetting>
      </DockedToolSettings>,
      {
        wrapper: DragManagerProvider,
      }
    );

    act(() => {
      fireEvent.click(
        document.getElementsByClassName("nz-toolSettings-overflow")[0]
      );
    });

    document
      .getElementsByClassName("nz-toolSettings-panel")
      .length.should.eq(1);

    act(() => {
      fireEvent.pointerDown(document);
      fireEvent.pointerUp(document);
    });

    expect(sut.queryByText("Entry 3")).to.not.exist;
  });

  it("should recalculate overflow on resize", async () => {
    let width = 100;
    sinon
      .stub(Element.prototype, "getBoundingClientRect")
      .callsFake(function (this: HTMLElement) {
        if (this.classList.contains("nz-toolSettings-docked")) {
          return DOMRect.fromRect({ width });
        } else if (this.classList.contains("nz-toolSettings-setting")) {
          return DOMRect.fromRect({ width: 50 });
        }
        return new DOMRect();
      });

    let resizeObserver: ResizeObserverMock | undefined;
    let target: Element | undefined;
    sinon
      .stub(ResizeObserverModule, "ResizeObserver")
      .callsFake((callback) => new ResizeObserverMock(callback));
    sinon
      .stub(ResizeObserverMock.prototype, "observe")
      .callsFake(function (this: ResizeObserverMock, element: Element) {
        if (element.classList.contains("nz-toolSettings-docked")) {
          resizeObserver = this; // eslint-disable-line @typescript-eslint/no-this-alias
          target = element;
        }
      });

    const sut = render(
      <DockedToolSettings>
        <DockedToolSetting>Entry 1</DockedToolSetting>
        <DockedToolSetting>Entry 2</DockedToolSetting>
        <DockedToolSetting>Entry 3</DockedToolSetting>
      </DockedToolSettings>,
      {
        wrapper: DragManagerProvider,
      }
    );

    sut.getByText("Entry 1");
    sut.getByText("Entry 2");

    act(() => {
      width = 50;
      resizeObserver!.callback(
        [
          {
            contentRect: new DOMRect(),
            target: target!,
          } as any,
        ],
        resizeObserver!
      );
    });

    await flushAsyncOperations();

    sut.getByText("Entry 1");
    expect(sut.queryByText("Entry 2")).to.not.exist;
  });

  it("should recalculate overflow on entry resize", async () => {
    let width = 50;
    sinon
      .stub(Element.prototype, "getBoundingClientRect")
      .callsFake(function (this: HTMLElement) {
        if (this.classList.contains("nz-toolSettings-docked")) {
          return DOMRect.fromRect({ width: 100 });
        } else if (this.classList.contains("nz-toolSettings-setting")) {
          return DOMRect.fromRect({ width });
        }
        return new DOMRect();
      });

    let resizeObserver: ResizeObserverMock | undefined;
    let target: Element | undefined;
    sinon
      .stub(ResizeObserverModule, "ResizeObserver")
      .callsFake((callback) => new ResizeObserverMock(callback));
    sinon
      .stub(ResizeObserverMock.prototype, "observe")
      .callsFake(function (this: ResizeObserverMock, element: Element) {
        if (
          element instanceof HTMLElement &&
          element.classList.contains("nz-toolSettings-setting") &&
          queryByText(element, "Entry 1")
        ) {
          resizeObserver = this; // eslint-disable-line @typescript-eslint/no-this-alias
          target = element;
        }
      });

    const sut = render(
      <DockedToolSettings>
        <DockedToolSetting>Entry 1</DockedToolSetting>
        <DockedToolSetting>Entry 2</DockedToolSetting>
        <DockedToolSetting>Entry 3</DockedToolSetting>
      </DockedToolSettings>,
      {
        wrapper: DragManagerProvider,
      }
    );

    sut.getByText("Entry 1");
    sut.getByText("Entry 2");

    act(() => {
      width = 100;
      resizeObserver!.callback(
        [
          {
            contentRect: new DOMRect(),
            target: target!,
          } as any,
        ],
        resizeObserver!
      );
    });

    await flushAsyncOperations();

    sut.getByText("Entry 1");
    expect(sut.queryByText("Entry 2")).to.not.exist;
  });
});

describe("getOverflown", () => {
  it("should overflow additional entries when overflow width is known", () => {
    const overflown = getOverflown(
      100,
      [
        ["1", 40],
        ["2", 40],
        ["3", 40],
      ],
      50
    );
    overflown.should.eql(["2", "3"]);
  });

  it("should not overflow active item", () => {
    const overflown = getOverflown(
      100,
      [
        ["1", 40],
        ["2", 40],
        ["3", 40],
      ],
      50,
      1
    );
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
