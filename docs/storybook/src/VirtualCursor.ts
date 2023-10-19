/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

export class VirtualCursorElement extends HTMLElement {
  private _removeListeners: (() => void)[] = [];

  private _cursorDown = false;
  private _left = 100;
  private _top = 100;

  public connectedCallback() {
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    const overlay = document.createElement("div");
    overlay.setAttribute("class", "overlay");

    const cursor = document.createElement("div");
    cursor.setAttribute("class", "cursor");

    // Create some CSS to apply to the shadow dom
    const cursorSize = 25;
    const duration = 250;
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
        transition: transform ${duration / 1000}s ease-out;

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
      this._left = left;
      this._top = top;
      cursor.style.transform = `translate(${left}px, ${top}px)`;
    };
    setCursorPosition(100, 100);

    const setCursorDown = (down: boolean) => {
      if (down) cursor.classList.add("down");
      if (!down) cursor.classList.remove("down");
    };

    const getNewPosition = (e: MouseEvent) => {
      const left = e.pageX - cursorSize / 2;
      const top = e.pageY - cursorSize / 2;
      return { left, top };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top } = getNewPosition(e);
      setCursorDown(this._cursorDown);
      setCursorPosition(top, left);
    };
    const handleMouseDown = (e: MouseEvent) => {
      this._cursorDown = true;
      const { left, top } = getNewPosition(e);
      if (left === this._left && top === this._top) {
        setCursorDown(true);
        return;
      }
      setCursorPosition(top, left);
    };
    const handleMouseUp = (e: MouseEvent) => {
      this._cursorDown = false;
      const { left, top } = getNewPosition(e);
      if (left === this._left && top === this._top) {
        setCursorDown(false);
        return;
      }
      setCursorPosition(top, left);
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

    const handleTransitionEnd = () => {
      setCursorDown(this._cursorDown);
    };
    cursor.addEventListener("transitionend", handleTransitionEnd);

    this._removeListeners.push(
      () => document.removeEventListener("mousemove", handleMouseMove),
      () => document.removeEventListener("mousedown", handleMouseDown),
      () => document.removeEventListener("mouseup", handleMouseUp),
      () => overlay.removeEventListener("mousemove", stopPropagation),
      () => overlay.removeEventListener("mousedown", stopPropagation),
      () => overlay.removeEventListener("mouseup", stopPropagation),
      () => cursor.removeEventListener("transitionend", handleTransitionEnd)
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

if (!customElements.get("virtual-cursor-element"))
  customElements.define("virtual-cursor-element", VirtualCursorElement);
