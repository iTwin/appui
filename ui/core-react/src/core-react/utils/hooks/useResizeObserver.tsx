/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */
import * as React from "react";
import { useRefEffect } from "./useRefEffect";
import { useRefs } from "./useRefs";

/* eslint-disable deprecation/deprecation */

/** Uses ResizeObserver API to notify about element bound changes.
 * @internal
 */
export function useResizeObserver<T extends Element>(
  onResize?: (width: number, height: number) => void
) {
  const bounds = React.useRef({ width: 0, height: 0 });
  const resizeObserver = React.useRef<ResizeObserver | null>(null);
  const rafRef = React.useRef(0); // set to non-zero when requestAnimationFrame processing is active
  const isMountedRef = React.useRef(false);
  const owningWindowRef = React.useRef<any>(null);

  const resizeObserverCleanup = () => {
    if (rafRef.current)
      owningWindowRef.current.cancelAnimationFrame(rafRef.current);

    resizeObserver.current?.disconnect();
    resizeObserver.current = null;
  };

  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (rafRef.current)
        owningWindowRef.current.cancelAnimationFrame(rafRef.current);
      owningWindowRef.current?.removeEventListener(
        "beforeunload",
        resizeObserverCleanup
      );
    };
  }, []);

  const processResize = React.useCallback(
    (target: HTMLElement) => {
      const newBounds = target.getBoundingClientRect();
      if (
        isMountedRef.current &&
        (bounds.current.width !== newBounds.width ||
          bounds.current.height !== newBounds.height)
      ) {
        bounds.current = newBounds;
        onResize && onResize(newBounds.width, newBounds.height);
      }
    },
    [onResize]
  );

  const handleResize = React.useCallback(
    (entries: any[]) => {
      if (
        !isMountedRef.current ||
        !Array.isArray(entries) ||
        0 === entries.length
      ) {
        return;
      }
      const target = entries[0].target as HTMLElement;
      owningWindowRef.current &&
        owningWindowRef.current.removeEventListener(
          "beforeunload",
          resizeObserverCleanup
        );

      owningWindowRef.current = target.ownerDocument.defaultView;
      if (owningWindowRef.current) {
        owningWindowRef.current.addEventListener(
          "unload",
          resizeObserverCleanup
        );

        // using requestAnimationFrame to stop the "ResizeObserver loop completed with undelivered notifications." and
        // "ResizeObserver loop limit exceeded" messages reported to window.onError
        rafRef.current = owningWindowRef.current.requestAnimationFrame(() =>
          processResize(target)
        );
      }
    },
    [processResize]
  );

  const observerRef = useRefEffect(
    (instance: T | null) => {
      resizeObserver.current = new ResizeObserver(handleResize);
      if (instance) {
        resizeObserver.current.observe(instance);
        const newBounds = instance.getBoundingClientRect();
        onResize && onResize(newBounds.width, newBounds.height);
        bounds.current = newBounds;
      }

      return () => {
        instance && resizeObserver.current?.unobserve(instance);
        resizeObserver.current = null;
      };
    },
    [handleResize, onResize]
  );

  const handleRef = React.useCallback(
    (instance: Element | null) => {
      const newBounds = instance && instance.getBoundingClientRect();
      if (
        newBounds &&
        (bounds.current.width !== newBounds.width ||
          bounds.current.height !== newBounds.height)
      ) {
        bounds.current = newBounds;
        onResize && onResize(newBounds.width, newBounds.height);
      }
    },
    [onResize]
  );

  const ref = useRefs(handleRef, observerRef);
  return ref;
}

/** React hook that uses ResizeObserver API to notify about element bound changes. Note: to work similar to ReactResizeDetector
 * width and height are initialized as undefined and only set during after mount if bounds are non-zero. This implementation properly
 * handles observing element in pop-out/child windows.
 * @internal
 */
export function useLayoutResizeObserver(
  inElement: HTMLElement | null,
  onResize?: (width?: number, height?: number) => void
) {
  const inBoundingRect = inElement?.getBoundingClientRect();
  const [bounds, setBounds] = React.useState<{
    width?: number;
    height?: number;
  }>({ width: inBoundingRect?.width, height: inBoundingRect?.height });
  const [watchedElement, setWatchedElement] = React.useState(inElement);
  const resizeObserver = React.useRef<ResizeObserver | null>(null);
  const rafRef = React.useRef(0); // set to non-zero when requestAnimationFrame processing is active
  const isMountedRef = React.useRef(false);
  const owningWindowRef = React.useRef<any>(null);

  const resizeObserverCleanup = () => {
    if (rafRef.current)
      owningWindowRef.current.cancelAnimationFrame(rafRef.current);

    resizeObserver.current?.disconnect();
    resizeObserver.current = null;
  };

  React.useEffect(() => {
    isMountedRef.current = true;
    setWatchedElement(inElement);

    if (inElement) {
      const newBounds = inElement.getBoundingClientRect();
      onResize && onResize(newBounds.width, newBounds.height);
      setBounds(newBounds);
    }

    return () => {
      isMountedRef.current = false;
      rafRef.current &&
        owningWindowRef.current &&
        owningWindowRef.current.cancelAnimationFrame(rafRef.current);
      owningWindowRef.current &&
        owningWindowRef.current.removeEventListener(
          "beforeunload",
          resizeObserverCleanup
        );
    };
  }, [onResize, inElement]);

  const processResize = React.useCallback(
    (target: HTMLElement) => {
      const newBounds = target.getBoundingClientRect();
      if (
        isMountedRef.current &&
        (bounds.width !== newBounds.width || bounds.height !== newBounds.height)
      ) {
        onResize && onResize(newBounds.width, newBounds.height);
        setBounds(newBounds);
      }
    },
    [bounds.height, bounds.width, onResize]
  );

  const handleResize = React.useCallback(
    (entries: any[]) => {
      if (
        !isMountedRef.current ||
        !Array.isArray(entries) ||
        0 === entries.length
      ) {
        return;
      }
      const target = entries[0].target as HTMLElement;
      if (owningWindowRef.current)
        owningWindowRef.current.removeEventListener(
          "beforeunload",
          resizeObserverCleanup
        );

      owningWindowRef.current = target.ownerDocument.defaultView;
      if (owningWindowRef.current) {
        owningWindowRef.current.addEventListener(
          "unload",
          resizeObserverCleanup
        );

        // using requestAnimationFrame to stop the "ResizeObserver loop completed with undelivered notifications." and
        // "ResizeObserver loop limit exceeded" messages reported to window.onError
        rafRef.current = owningWindowRef.current.requestAnimationFrame(() =>
          processResize(target)
        );
      }
    },
    [processResize]
  );

  React.useLayoutEffect(() => {
    if (!watchedElement) {
      return;
    }
    resizeObserver.current = new ResizeObserver(handleResize);
    resizeObserver.current.observe(watchedElement);
    return () => {
      resizeObserver.current?.disconnect();
      resizeObserver.current = null;
    };
  }, [handleResize, watchedElement]);

  return [bounds.width, bounds.height];
}

/** Prop the ElementResizeObserver sends to the render function.
 * @public
 * @deprecated in 4.16.0. Interface used in a deprecated component {@link ElementResizeObserver}.
 */
export interface RenderPropsArgs {
  width?: number;
  height?: number;
}

/** ElementResizeObserver provides functionality similar to ReactResizeDetector when a render function is specified. This implementation properly handles
 * observing element in pop-out/child windows.
 * @public
 * @deprecated in 4.15.0. Used internally.
 */
export function ElementResizeObserver({
  watchedElement,
  render,
}: {
  watchedElement: HTMLElement | null;
  render: (props: RenderPropsArgs) => React.ReactElement;
}) {
  const [width, height] = useLayoutResizeObserver(watchedElement);
  return render({ width, height });
}

/** ResizableContainerObserver is a component that provides the functionality similar to the ReactResizeDetector option that call a function when
 * the observed element is resized. This implementation properly handles observing element in pop-out/child windows. If children nodes are defined then
 * the div added by the component is considered the container whose size will be observed. If no children are provided then the component will report
 * size changes from its parent container.
 * @public
 * @deprecated in 4.15.0. Please use third party packages.
 */
export function ResizableContainerObserver({
  onResize,
  children,
}: {
  onResize: (width: number, height: number) => void;
  children?: React.ReactNode;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null); // set to non-zero when requestAnimationFrame processing is active
  const [containerElement, setContainerElement] =
    React.useState<HTMLElement | null>(null);
  const isMountedRef = React.useRef(false);
  const hasChildren = React.Children.count(children) !== 0;

  // if no children are specified then monitor size of parent element.
  React.useEffect(() => {
    if (!isMountedRef.current && containerRef.current) {
      isMountedRef.current = true;
      const hasParent = !!containerRef.current.parentElement;
      setContainerElement(
        hasChildren && hasParent
          ? containerRef.current
          : containerRef.current.parentElement
      );
    }
  }, [hasChildren]);

  const processResize = React.useCallback(
    (width?: number, height?: number) => {
      onResize(width ?? 0, height ?? 0);
    },
    [onResize]
  );

  useLayoutResizeObserver(containerElement, processResize);
  const style: React.CSSProperties = hasChildren
    ? { width: "100%", height: "100%" }
    : { display: "none" };

  return (
    <div
      ref={containerRef}
      className="uicore-resizable-container"
      style={style}
    >
      {hasChildren && children}
    </div>
  );
}
