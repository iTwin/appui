/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import * as React from "react";
import { useRefEffect, useRefs } from "@itwin/core-react/internal";
import { DragManagerContext } from "./DragManager.js";

/** @internal */
export interface PointerCaptorArgs {
  readonly clientX: number;
  readonly clientY: number;
}

/** @internal */
export type PointerCaptorEvent = MouseEvent | TouchEvent;

/** Captures mouse and touch events of an element. Used in drag or resize interactions.
 * @internal
 */
export const usePointerCaptor = <T extends HTMLElement>(
  onPointerDown?: (args: PointerCaptorArgs, e: PointerCaptorEvent) => void,
  onPointerMove?: (args: PointerCaptorArgs, e: PointerCaptorEvent) => void,
  onPointerUp?: (e: PointerCaptorEvent) => void
) => {
  const dragManager = React.useContext(DragManagerContext);
  const isDownRef = React.useRef(false);
  const ref = React.useRef<T>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mouseMove = (e: MouseEvent) => {
      isDownRef.current && onPointerMove && onPointerMove(e, e);
    };
    el.ownerDocument.addEventListener("mousemove", mouseMove);
    return () => {
      el.ownerDocument.removeEventListener("mousemove", mouseMove);
    };
  }, [onPointerMove]);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mouseUp = (e: MouseEvent) => {
      isDownRef.current && onPointerUp && onPointerUp(e);
      isDownRef.current = false;
    };
    el.ownerDocument.addEventListener("mouseup", mouseUp);
    return () => {
      el.ownerDocument.removeEventListener("mouseup", mouseUp);
    };
  }, [onPointerUp]);
  const setRef = useRefEffect(
    (instance: T | null) => {
      let touchTarget: EventTarget | null = null;
      const mouseDown = (e: MouseEvent) => {
        const isSecondaryButton = (e.button & 2) === 2;
        if (isSecondaryButton) return;

        onPointerDown && onPointerDown(e, e);
        isDownRef.current = true;
      };
      const touchMove = (e: TouchEvent) => {
        if (e.touches.length !== 1) return;
        isDownRef.current && onPointerMove && onPointerMove(e.touches[0], e);
        isDownRef.current &&
          dragManager.handleDrag(e.touches[0].clientX, e.touches[0].clientY);
      };
      const targetTouchMove = (e: TouchEvent) => {
        e.cancelable && e.preventDefault();
        touchMove(e);
      };
      const documentTouchMove = (e: TouchEvent) => {
        // Do not handle document touch move if it was handled by target handler.
        if (touchTarget === e.target) return;
        touchMove(e);
      };
      const touchEnd = (e: TouchEvent) => {
        isDownRef.current && onPointerUp && onPointerUp(e);
        isDownRef.current && dragManager.handleDragEnd();
        isDownRef.current = false;
        touchTarget = null;
        if (e.target instanceof HTMLElement) {
          e.target.removeEventListener("touchmove", targetTouchMove);
          e.target.removeEventListener("touchend", touchEnd);
        }
        e.view?.removeEventListener("touchmove", documentTouchMove);
        e.view?.removeEventListener("touchend", documentTouchEnd);
      };
      const documentTouchEnd = (e: TouchEvent) => {
        // Do not handle document touch move if it was handled by target handler.
        if (touchTarget === e.target) return;
        touchEnd(e);
      };
      const touchStart = (e: TouchEvent) => {
        e.cancelable && e.preventDefault();
        if (e.touches.length !== 1) return;
        touchTarget = e.target;
        // In case of implicit pointer capture attach to event target.
        if (e.target instanceof HTMLElement) {
          e.target.addEventListener("touchmove", targetTouchMove);
          e.target.addEventListener("touchend", touchEnd);
        }
        // Add to document in case the target looses capture (i.e. is removed)
        e.view?.addEventListener("touchmove", documentTouchMove);
        e.view?.addEventListener("touchend", documentTouchEnd);
        onPointerDown && onPointerDown(e.touches[0], e);
        isDownRef.current = true;
      };

      instance && instance.addEventListener("mousedown", mouseDown);
      instance && instance.addEventListener("touchstart", touchStart);
      return () => {
        instance && instance.removeEventListener("mousedown", mouseDown);
        instance && instance.removeEventListener("touchstart", touchStart);
      };
    },
    [onPointerDown, onPointerMove, onPointerUp, dragManager]
  );
  return useRefs(ref, setRef);
};
