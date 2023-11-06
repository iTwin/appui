/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { LineSegment3d, Point3d, XAndY } from "@itwin/core-geometry";

export class VirtualCursorElement extends HTMLElement {
  private _removeListeners: (() => void)[] = [];
  public top = 100;
  public left = 100;

  public connectedCallback() {
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    const overlay = document.createElement("div");
    overlay.setAttribute("class", "overlay");

    const cursor = document.createElement("div");
    cursor.setAttribute("class", "cursor");

    // Create some CSS to apply to the shadow dom
    const cursorSize = 25;
    const style = document.createElement("style");
    style.textContent = `
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 9999;
      }

      .cursor {
        width: ${cursorSize}px;
        height: ${cursorSize}px;

        background: red;
        border-radius: 50%;
        border: 1px solid black;
        opacity: 0.5;
      }

      .cursor.down {
        background: yellow;
      }
    `;

    const setCursorPosition = (top: number, left: number) => {
      this.top = top;
      this.left = left;
      cursor.style.transform = `translate(${left}px, ${top}px)`;
    };
    const setCursorDown = (down: boolean) => {
      if (down) cursor.classList.add("down");
      if (!down) cursor.classList.remove("down");
    };
    setCursorPosition(this.top, this.left);
    setCursorDown(false);

    const getNewPosition = (e: MouseEvent) => {
      const left = e.pageX - cursorSize / 2;
      const top = e.pageY - cursorSize / 2;
      return { left, top };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top } = getNewPosition(e);
      setCursorPosition(top, left);
    };
    const handleMouseDown = (e: MouseEvent) => {
      const { left, top } = getNewPosition(e);
      setCursorPosition(top, left);
      setCursorDown(true);
    };
    const handleMouseUp = (e: MouseEvent) => {
      const { left, top } = getNewPosition(e);
      setCursorPosition(top, left);
      setCursorDown(false);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    const stopPropagation = (e: MouseEvent) => {
      e.stopPropagation();
    };
    overlay.addEventListener("mousemove", stopPropagation);
    overlay.addEventListener("mousedown", stopPropagation);
    overlay.addEventListener("mouseup", stopPropagation);

    this._removeListeners.push(
      () => document.removeEventListener("mousemove", handleMouseMove),
      () => document.removeEventListener("mousedown", handleMouseDown),
      () => document.removeEventListener("mouseup", handleMouseUp),
      () => overlay.removeEventListener("mousemove", stopPropagation),
      () => overlay.removeEventListener("mousedown", stopPropagation),
      () => overlay.removeEventListener("mouseup", stopPropagation)
    );

    shadow.appendChild(style);
    shadow.appendChild(overlay);
    overlay.appendChild(cursor);
  }

  public disconnectedCallback() {
    for (const removeListener of this._removeListeners) {
      removeListener();
    }
  }
}

export function createCursorEvents(
  initialPosition: XAndY,
  onMove: (to: XAndY) => void,
  options?: {
    duration?: number;
  }
) {
  let currentPosition = initialPosition;
  const duration = options?.duration ?? 250;
  return {
    move: async (to: XAndY) => {
      let start = Date.now();
      const line = LineSegment3d.create(
        new Point3d(currentPosition.x, currentPosition.y, 0),
        new Point3d(to.x, to.y, 0)
      );
      return new Promise<void>((resolve) => {
        const move = () => {
          const now = Date.now();
          const elapsed = now - start;
          const fraction = elapsed / duration;
          if (fraction < 1) {
            const position = line.fractionToPoint(fraction);
            onMove({ x: position.x, y: position.y });
            requestAnimationFrame(move);
            return;
          }

          onMove(to);
          currentPosition = to;
          resolve();
        };
        requestAnimationFrame(move);
      });
    },
  };
}

if (!customElements.get("virtual-cursor-element"))
  customElements.define("virtual-cursor-element", VirtualCursorElement);
