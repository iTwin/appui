/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import * as React from "react";
import { useRefEffect } from "@itwin/core-react";
import { DragManagerContext } from "./DragManager";

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
  const isDown = React.useRef(false);
  React.useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      isDown.current && onPointerMove && onPointerMove(e, e);
    };
    document.addEventListener("mousemove", mouseMove);
    return () => {
      document.removeEventListener("mousemove", mouseMove);
    };
  }, [onPointerMove]);
  React.useEffect(() => {
    const mouseUp = (e: MouseEvent) => {
      isDown.current && onPointerUp && onPointerUp(e);
      isDown.current = false;
    };
    document.addEventListener("mouseup", mouseUp);
    return () => {
      document.removeEventListener("mouseup", mouseUp);
    };
  }, [onPointerUp]);
  const setRef = useRefEffect(
    (instance: T | null) => {
      let touchTarget: EventTarget | null = null;
      const mouseDown = (e: MouseEvent) => {
        const isSecondaryButton = (e.button & 2) === 2;
        if (isSecondaryButton) return;

        onPointerDown && onPointerDown(e, e);
        isDown.current = true;
      };
      const touchMove = (e: TouchEvent) => {
        if (e.touches.length !== 1) return;
        isDown.current && onPointerMove && onPointerMove(e.touches[0], e);
        isDown.current &&
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
        isDown.current && onPointerUp && onPointerUp(e);
        isDown.current && dragManager.handleDragEnd();
        isDown.current = false;
        touchTarget = null;
        if (e.target instanceof HTMLElement) {
          e.target.removeEventListener("touchmove", targetTouchMove);
          e.target.removeEventListener("touchend", touchEnd);
        }
        document.removeEventListener("touchmove", documentTouchMove);
        document.removeEventListener("touchend", documentTouchEnd);
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
        document.addEventListener("touchmove", documentTouchMove);
        document.addEventListener("touchend", documentTouchEnd);
        onPointerDown && onPointerDown(e.touches[0], e);
        isDown.current = true;
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
  return setRef;
};
