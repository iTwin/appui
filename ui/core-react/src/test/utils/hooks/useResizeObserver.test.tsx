/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import * as ResizeObserverModule from "../../../core-react/utils/hooks/ResizeObserverPolyfill";
import {
  ElementResizeObserver,
  ResizableContainerObserver,
  useResizeObserver,
} from "../../../core-react/utils/hooks/useResizeObserver";
import TestUtils from "../../TestUtils";
import { render, waitFor } from "@testing-library/react";

/** Stubs requestAnimationFrame. */
function stubRaf() {
  const raf = window.requestAnimationFrame;
  const caf = window.cancelAnimationFrame;

  beforeEach(() => {
    window.requestAnimationFrame = (cb: FrameRequestCallback) => {
      return window.setTimeout(cb, 0);
    };
    window.cancelAnimationFrame = (handle: number) => {
      window.clearTimeout(handle);
    };
  });

  afterEach(() => {
    window.requestAnimationFrame = raf;
    window.cancelAnimationFrame = caf;
  });
}

describe("useResizeObserver", () => {
  stubRaf();

  it("should observe instance", async () => {
    const spy = vi.spyOn(
      ResizeObserverModule.ResizeObserver.prototype,
      "observe"
    );
    const { result } = renderHook(() => useResizeObserver());
    const element = document.createElement("div");
    act(() => {
      result.current(element);
    });
    await TestUtils.flushAsyncOperations();
    expect(spy).toBeCalledWith(element);
  });

  it("should unobserve instance", async () => {
    const spy = vi.spyOn(
      ResizeObserverModule.ResizeObserver.prototype,
      "unobserve"
    );
    const { result } = renderHook(() => useResizeObserver());
    const element = document.createElement("div");
    act(() => {
      result.current(element);
    });
    act(() => {
      result.current(null);
    });
    await TestUtils.flushAsyncOperations();
    expect(spy).toBeCalledWith(element);
  });

  it("should call onResize", async () => {
    const resizeObserverSpy = vi.spyOn(ResizeObserverModule, "ResizeObserver");
    const spy = vi.fn();
    const { result } = renderHook(() => useResizeObserver(spy));
    const element = document.createElement("div");
    act(() => {
      result.current(element);
    });
    await TestUtils.flushAsyncOperations();
    spy.mockReset();
    vi.spyOn(element, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ width: 100 })
    );

    // Call the ResizeObserver callback.
    resizeObserverSpy.mock.calls[0][0](
      [
        {
          contentRect: DOMRect.fromRect({ width: 100 }),
          target: element,
        } as unknown as ResizeObserverEntry,
      ],
      resizeObserverSpy.mock.results[0].value
    );
    await TestUtils.flushAsyncOperations();
    expect(spy).toHaveBeenCalledWith(100, 0);
  });

  it("should call onResize (height)", async () => {
    const resizeObserverSpy = vi.spyOn(ResizeObserverModule, "ResizeObserver");
    const spy = vi.fn();
    const { result } = renderHook(() => useResizeObserver(spy));
    const element = document.createElement("div");
    act(() => {
      result.current(element);
    });
    await TestUtils.flushAsyncOperations();

    spy.mockReset();
    vi.spyOn(element, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ height: 100 })
    );
    // Call the ResizeObserver callback.
    resizeObserverSpy.mock.calls[0][0](
      [
        {
          contentRect: DOMRect.fromRect({ height: 100 }),
          target: element,
        } as unknown as ResizeObserverEntry,
      ],
      resizeObserverSpy.mock.results[0].value
    );
    await TestUtils.flushAsyncOperations();
    expect(spy).toHaveBeenCalledWith(0, 100);
  });

  it("should call onResize (width and height)", async () => {
    const resizeObserverSpy = vi.spyOn(ResizeObserverModule, "ResizeObserver");
    const spy = vi.fn();
    const { result } = renderHook(() => useResizeObserver(spy));
    const element = document.createElement("div");
    act(() => {
      result.current(element);
    });

    await TestUtils.flushAsyncOperations();
    spy.mockReset();
    vi.spyOn(element, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ width: 100, height: 100 })
    );
    // Call the ResizeObserver callback.
    resizeObserverSpy.mock.calls[0][0](
      [
        {
          contentRect: DOMRect.fromRect({ width: 100, height: 100 }),
          target: element,
        } as unknown as ResizeObserverEntry,
      ],
      resizeObserverSpy.mock.results[0].value
    );
    await TestUtils.flushAsyncOperations();
    expect(spy).toHaveBeenCalledOnce();
  });
});

describe("useLayoutResizeObserver", () => {
  const size_0_0 = DOMRect.fromRect({ width: 0, height: 0 });
  const size_100_50 = DOMRect.fromRect({ width: 100, height: 50 });
  const size_300_100 = DOMRect.fromRect({ width: 300, height: 100 });
  let boundingClientRect = size_0_0;
  stubRaf();

  const ResizableContainerObserverTester = () => {
    // initial values are not used since size is faked below and value should come from initial layout in 'sizer' container
    const [observedBounds, setObservedBounds] = React.useState({
      width: 0,
      height: 0,
    });
    const onResize = React.useCallback((width: number, height: number) => {
      setObservedBounds({ width, height });
    }, []);

    return (
      <div data-testid="sizer" className="sizer">
        <ResizableContainerObserver onResize={onResize}>
          <span data-testid="width">{observedBounds.width}</span>
          <span data-testid="height">{observedBounds.height}</span>
        </ResizableContainerObserver>
      </div>
    );
  };

  const ResizableContainerObserverNoChildren = ({
    onResize,
  }: {
    onResize: (width: number, height: number) => void;
  }) => {
    return (
      <div data-testid="sizer" className="sizer">
        <ResizableContainerObserver
          onResize={onResize}
        ></ResizableContainerObserver>
      </div>
    );
  };

  const ElementResizeObserverTester = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [containerElement, setContainerElement] =
      React.useState<HTMLDivElement | null>(null);
    const isMountedRef = React.useRef(false);

    React.useEffect(() => {
      if (!isMountedRef.current && containerRef.current) {
        isMountedRef.current = true;
        setContainerElement(containerRef.current);
      }
    }, []);

    return (
      <div data-testid="sizer" ref={containerRef} className="sizer">
        <ElementResizeObserver
          watchedElement={containerElement}
          render={({ width, height }) => (
            <>
              <span data-testid="width">{width ?? 0}</span>
              <span data-testid="height">{height ?? 0}</span>
            </>
          )}
        />
      </div>
    );
  };

  beforeEach(() => {
    boundingClientRect = size_0_0;

    vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
      function (this: HTMLElement) {
        if (
          this.classList.contains("sizer") ||
          this.classList.contains("uicore-resizable-container")
        ) {
          return boundingClientRect;
        }
        return new DOMRect();
      }
    );
  });

  it("ElementResizeObserver - should call onResize (width and height)", async () => {
    const resizeObserverSpy = vi.spyOn(ResizeObserverModule, "ResizeObserver");
    boundingClientRect = size_100_50;

    const wrapper = render(<ElementResizeObserverTester />);
    await TestUtils.flushAsyncOperations();

    expect(wrapper.getByTestId("width").textContent).to.eql("100");
    expect(wrapper.getByTestId("height").textContent).to.eql("50");
    const container = wrapper.getByTestId("sizer");

    boundingClientRect = size_300_100;
    // Call the ResizeObserver callback.
    resizeObserverSpy.mock.calls[0][0](
      [
        {
          contentRect: DOMRect.fromRect({ width: 300, height: 100 }), // we ignore this in hook and just get size from getBoundingClientRect method.
          target: container,
        } as unknown as ResizeObserverEntry,
      ],
      resizeObserverSpy.mock.results[0].value
    );

    await waitFor(() =>
      expect(wrapper.getByTestId("width").textContent).to.eql("300")
    );
    expect(wrapper.getByTestId("height").textContent).to.eql("100");
    wrapper.unmount();
  });

  it("ResizableContainerObserver - should call onResize (width and height)", async () => {
    const resizeObserverSpy = vi.spyOn(ResizeObserverModule, "ResizeObserver");
    boundingClientRect = size_100_50;

    const wrapper = render(<ResizableContainerObserverTester />);
    await TestUtils.flushAsyncOperations();

    expect(wrapper.getByTestId("width").textContent).to.eql("100");
    expect(wrapper.getByTestId("height").textContent).to.eql("50");
    const container = wrapper.container.querySelector(
      "div.uicore-resizable-container"
    );
    expect(container).to.not.be.null;
    await TestUtils.flushAsyncOperations();

    boundingClientRect = size_300_100;
    // Call the ResizeObserver callback.
    resizeObserverSpy.mock.calls[0][0](
      [
        {
          contentRect: DOMRect.fromRect({ width: 300, height: 100 }), // we ignore this in hook and just get size from getBoundingClientRect method.
          target: container,
        } as unknown as ResizeObserverEntry,
      ],
      resizeObserverSpy.mock.results[0].value
    );
    await TestUtils.flushAsyncOperations();

    await TestUtils.flushAsyncOperations();
    expect(wrapper.getByTestId("width").textContent).to.eql("300");
    expect(wrapper.getByTestId("height").textContent).to.eql("100");

    wrapper.unmount();
  });

  it("ResizableContainerObserver - should call onResize (width and height)", async () => {
    const resizeObserverSpy = vi.spyOn(ResizeObserverModule, "ResizeObserver");
    boundingClientRect = size_100_50;
    let currentWidth = 0;
    let currentHeight = 0;
    const onResize = (width: number, height: number) => {
      currentWidth = width;
      currentHeight = height;
    };

    const wrapper = render(
      <ResizableContainerObserverNoChildren onResize={onResize} />
    );
    await TestUtils.flushAsyncOperations();

    const container = wrapper.container.querySelector(
      "div.uicore-resizable-container"
    ) as HTMLDivElement;
    expect(container.style.display).to.be.eql("none");
    expect(currentWidth).to.eql(100);
    expect(currentHeight).to.eql(50);

    boundingClientRect = size_300_100;
    // Call the ResizeObserver callback.
    resizeObserverSpy.mock.calls[0][0](
      [
        {
          contentRect: DOMRect.fromRect({ width: 300, height: 100 }), // we ignore this in hook and just get size from getBoundingClientRect method.
          target: container.parentElement,
        } as unknown as ResizeObserverEntry,
      ],
      resizeObserverSpy.mock.results[0].value
    );
    await TestUtils.flushAsyncOperations();

    expect(currentWidth).to.eql(300);
    expect(currentHeight).to.eql(100);

    wrapper.unmount();
  });
});
