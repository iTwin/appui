/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tree
 */

import "./Tree.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "../utils/Props.js";
import { Rectangle } from "../utils/Rectangle.js";

/** Properties for the [[Tree]] presentational React component
 * @public
 * @deprecated in 4.15.0. Props of deprecated {@link Tree} component.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface TreeProps extends CommonProps {
  children?: React.ReactNode;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLDivElement>;
}

/** Presentation React component for a Tree
 * @public
 * @deprecated in 4.15.0. Use {@link https://itwinui.bentley.com/docs/tree iTwinUI Tree} instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class Tree extends React.PureComponent<TreeProps> {
  private _treeElement: React.RefObject<HTMLDivElement> = React.createRef();

  private get _scrollableContainer(): Element | undefined {
    if (!this._treeElement.current) return undefined;

    const isScrollable = (element: Element) => {
      const style = window.getComputedStyle(element);
      return (
        style.overflow === "auto" ||
        style.overflow === "scroll" ||
        style.overflowY === "auto" ||
        style.overflowY === "scroll" ||
        style.overflowX === "auto" ||
        style.overflowX === "scroll"
      );
    };
    let scrollableContainer: Element | undefined = this._treeElement.current;
    while (scrollableContainer && !isScrollable(scrollableContainer))
      scrollableContainer =
        scrollableContainer.children.length > 0
          ? scrollableContainer.children[0]
          : undefined;

    return scrollableContainer;
  }

  public scrollToElement(element: Element) {
    const container = this._scrollableContainer;
    if (!container) return;

    if (!Element.prototype.scrollTo) {
      // workaround for Edge scrollTo issue https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/15534521/
      element.scrollIntoView();
      return;
    }

    const elementBox = element.getBoundingClientRect();
    const elementRange = Rectangle.createXYXY(
      elementBox.left,
      elementBox.top,
      elementBox.right,
      elementBox.bottom
    );
    const containerBox = container.getBoundingClientRect();
    const containerRange = Rectangle.createXYXY(
      containerBox.left - container.scrollLeft,
      containerBox.top - container.scrollTop,
      containerBox.right - container.scrollLeft,
      containerBox.bottom - container.scrollTop
    );

    let left: number;
    if (
      container.scrollLeft > 0 &&
      elementRange.right <= containerRange.right
    ) {
      // always attempt to keep horizontal scroll at 0
      left = 0;
    } else if (
      containerRange.left <= elementRange.left &&
      containerRange.right >= elementRange.right
    ) {
      // already visible - no need to scroll to
      left = container.scrollLeft;
    } else {
      left = elementRange.left - containerRange.left;
    }

    let top: number;
    if (
      containerRange.top <= elementRange.top &&
      containerRange.bottom >= elementRange.bottom
    ) {
      // already visible - no need to scroll to
      top = container.scrollTop;
    } else {
      top = elementRange.top - containerRange.top;
    }

    container.scrollTo({ left, top });
  }

  public getElementsByClassName(className: string): Element[] {
    if (!this._treeElement.current) return [];

    const elements = new Array<Element>();
    const collection =
      this._treeElement.current.getElementsByClassName(className);
    for (let i = 0; i < collection.length; ++i)
      elements.push(collection.item(i)!);
    return elements;
  }
  public setFocusByClassName(selector: string): boolean {
    let status = false;
    if (this._treeElement.current) {
      const element = this._treeElement.current.querySelector(
        selector
      ) as HTMLElement;
      if (element && element.focus) {
        element.focus();
        status = true;
      }
    }
    return status;
  }

  public override render() {
    const className = classnames("core-tree", this.props.className);

    return (
      <div
        ref={this._treeElement}
        className={className}
        style={this.props.style}
        onMouseDown={this.props.onMouseDown}
        onMouseMove={this.props.onMouseMove}
        onMouseUp={this.props.onMouseUp}
        onKeyDown={this.props.onKeyDown}
        onKeyUp={this.props.onKeyUp}
        role="tree"
        tabIndex={-1}
      >
        {this.props.children}
      </div>
    );
  }
}
