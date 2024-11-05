/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Rectangle } from "@itwin/core-react/internal";
import { render, renderHook } from "@testing-library/react";
import * as React from "react";
import { createLayoutStore } from "../../../appui-react/layout/base/LayoutStore.js";
import type {
  NineZoneDispatch,
  NineZoneLabels,
} from "../../../appui-react/layout/base/NineZone.js";
import {
  handleToCursorType,
  MeasureContext,
  NineZone,
  NineZoneLabelsContext,
  sideToCursorType,
  useLabel,
} from "../../../appui-react/layout/base/NineZone.js";
import {
  createRect,
  createResizeObserverMock,
  flushAsyncOperations,
} from "../Utils.js";

describe("<NineZone />", () => {
  it("renders correctly", () => {
    const component = render(
      <NineZone dispatch={vi.fn()} layout={createLayoutStore()}>
        9-Zone
      </NineZone>
    );
    component.getByText("9-Zone");
  });

  it("should measure NineZone bounds", () => {
    // eslint-disable-next-line react/display-name
    const Measurer = React.forwardRef<{ measure: () => Rectangle }>(
      (_, ref) => {
        const measure = React.useContext(MeasureContext);
        React.useImperativeHandle(ref, () => ({
          measure,
        }));
        return <></>;
      }
    );
    const measurerRef = React.createRef<{ measure: () => Rectangle }>();
    const { container } = render(
      <NineZone dispatch={vi.fn()} layout={createLayoutStore()}>
        <Measurer ref={measurerRef} />
      </NineZone>
    );
    vi.spyOn(
      container.firstChild! as HTMLElement,
      "getBoundingClientRect"
    ).mockReturnValue(
      DOMRect.fromRect({
        width: 200,
      })
    );

    const sut = measurerRef.current!.measure().toProps();
    expect(sut).toEqual({
      left: 0,
      right: 200,
      top: 0,
      bottom: 0,
    });
  });

  it("should dispatch RESIZE", async () => {
    const ResizeObserver = createResizeObserverMock();
    vi.stubGlobal("ResizeObserver", ResizeObserver);
    const observe = vi.spyOn(ResizeObserver.prototype, "observe");

    const spy = vi.fn<Parameters<NineZoneDispatch>>();
    render(<NineZone dispatch={spy} layout={createLayoutStore()} />);
    spy.mockReset();

    const measurer = observe.mock.calls[0][0];
    vi.spyOn(measurer, "getBoundingClientRect").mockReturnValue(
      createRect(0, 0, 10, 20)
    );

    const resizeObserver = observe.mock.instances[0] as unknown as InstanceType<
      typeof ResizeObserver
    >;
    resizeObserver.callback(
      [
        {
          contentRect: new DOMRect(),
          target: measurer,
        } as any,
      ],
      resizeObserver
    );
    await flushAsyncOperations();
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "RESIZE",
        size: {
          width: 10,
          height: 20,
        },
      })
    );
  });

  it("should not dispatch RESIZE if size did not change", async () => {
    const ResizeObserver = createResizeObserverMock();
    vi.stubGlobal("ResizeObserver", ResizeObserver);
    const observe = vi.spyOn(ResizeObserver.prototype, "observe");

    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(
      createRect(0, 0, 10, 20)
    );

    const spy = vi.fn<Parameters<NineZoneDispatch>>();
    render(<NineZone dispatch={spy} layout={createLayoutStore()} />);

    spy.mockReset();

    await flushAsyncOperations();

    const measurer = observe.mock.calls[0][0];
    const resizeObserver = observe.mock.instances[0] as unknown as InstanceType<
      typeof ResizeObserver
    >;
    resizeObserver.callback(
      [
        {
          contentRect: new DOMRect(),
          target: measurer,
        } as any,
      ],
      resizeObserver
    );

    expect(spy).not.toBeCalled();
  });
});

describe("useLabel", () => {
  it("should return label", () => {
    const labels: NineZoneLabels = {
      dockToolSettingsTitle: "test",
    };
    const { result } = renderHook(() => useLabel("dockToolSettingsTitle"), {
      wrapper: (props: object) => (
        <NineZoneLabelsContext.Provider value={labels} {...props} />
      ),
    });
    expect(result.current).toEqual("test");
  });
});

describe("handleToCursorType", () => {
  it("bottom", () => {
    expect(handleToCursorType("bottom")).toEqual("ns-resize");
  });

  it("top", () => {
    expect(handleToCursorType("top")).toEqual("ns-resize");
  });

  it("left", () => {
    expect(handleToCursorType("left")).toEqual("ew-resize");
  });

  it("right", () => {
    expect(handleToCursorType("right")).toEqual("ew-resize");
  });

  it("topLeft", () => {
    expect(handleToCursorType("topLeft")).toEqual("nwse-resize");
  });

  it("bottomRight", () => {
    expect(handleToCursorType("bottomRight")).toEqual("nwse-resize");
  });

  it("topRight", () => {
    expect(handleToCursorType("topRight")).toEqual("nesw-resize");
  });

  it("bottomLeft", () => {
    expect(handleToCursorType("bottomLeft")).toEqual("nesw-resize");
  });
});

describe("sideToCursorType", () => {
  it("bottom", () => {
    expect(sideToCursorType("bottom")).toEqual("ns-resize");
  });

  it("top", () => {
    expect(sideToCursorType("top")).toEqual("ns-resize");
  });

  it("left", () => {
    expect(sideToCursorType("left")).toEqual("ew-resize");
  });

  it("right", () => {
    expect(sideToCursorType("right")).toEqual("ew-resize");
  });
});
