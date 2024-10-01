/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import "./ElementTooltip.scss";
import classnames from "classnames";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { UiEvent } from "@itwin/appui-abstract";
import { BeUiEvent } from "@itwin/core-bentley";
import type { ToolTipOptions } from "@itwin/core-frontend";
import type { XAndY } from "@itwin/core-geometry";
import type { CommonProps } from "@itwin/core-react";
import { MessageRenderer, Rectangle } from "@itwin/core-react";
import type { NotifyMessageType } from "../messages/ReactNotifyMessageDetails.js";
import {
  offsetAndContainInContainer,
  Tooltip,
} from "../layout/popup/Tooltip.js";
import type { SizeProps } from "../utils/SizeProps.js";

/* eslint-disable deprecation/deprecation */

/** [[ElementTooltip]] state. */
interface ElementTooltipState {
  isVisible: boolean;
  message: NotifyMessageType;
  position: XAndY;
  options?: ToolTipOptions;
}

/** [[ElementTooltipChangedEvent]] arguments.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface ElementTooltipChangedEventArgs {
  isTooltipVisible: boolean;
  message: NotifyMessageType;
  el?: HTMLElement;
  pt?: XAndY;
  options?: ToolTipOptions;
}

/** ElementTooltip Changed Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
export class ElementTooltipChangedEvent extends UiEvent<ElementTooltipChangedEventArgs> {}

/** ElementTooltip React component.
 * @public
 */
export class ElementTooltip extends React.Component<
  CommonProps, // eslint-disable-line deprecation/deprecation
  ElementTooltipState
> {
  private static _elementTooltipChangedEvent =
    new BeUiEvent<ElementTooltipChangedEventArgs>();
  private static _isTooltipVisible: boolean;
  private static _isTooltipHalted: boolean;

  public static get onElementTooltipChangedEvent(): ElementTooltipChangedEvent {
    return ElementTooltip._elementTooltipChangedEvent;
  }

  public static get isTooltipVisible(): boolean {
    return ElementTooltip._isTooltipVisible;
  }

  public static showTooltip(
    el: HTMLElement,
    message: NotifyMessageType,
    pt?: XAndY,
    options?: ToolTipOptions
  ): void {
    if (ElementTooltip._isTooltipHalted) return;
    ElementTooltip._isTooltipVisible = true;
    ElementTooltip.onElementTooltipChangedEvent.emit({
      isTooltipVisible: true,
      el,
      message,
      pt,
      options,
    });
  }

  public static hideTooltip(): void {
    ElementTooltip._isTooltipVisible = false;
    ElementTooltip.onElementTooltipChangedEvent.emit({
      isTooltipVisible: false,
      message: "",
    });
  }

  public static get isTooltipHalted(): boolean {
    return ElementTooltip._isTooltipHalted;
  }

  public static set isTooltipHalted(halt: boolean) {
    ElementTooltip._isTooltipHalted = halt;
    if (halt && ElementTooltip._isTooltipVisible) ElementTooltip.hideTooltip();
  }

  public override render() {
    return <ElementTooltipComponent />;
  }
}

function ElementTooltipComponent(props: CommonProps) {
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState<NotifyMessageType>("");
  const [preferredPosition, setPreferredPosition] = React.useState<
    XAndY | undefined
  >(undefined);
  const [position, setPosition] = React.useState<XAndY>({ x: 0, y: 0 });

  // Use a dedicated container for the tooltip to avoid z-index issues in the main window.
  const [mainContainer, setMainContainer] = React.useState<
    HTMLDivElement | undefined
  >(undefined);
  const [container, setContainer] = React.useState<HTMLElement | undefined>(
    undefined
  );
  const [popout, setPopout] = React.useState(false);
  const [size, setSize] = React.useState<SizeProps | undefined>(undefined);

  React.useEffect(() => {
    return ElementTooltip.onElementTooltipChangedEvent.addListener((args) => {
      const isPopout = args.el?.ownerDocument.defaultView !== window;
      setPopout(isPopout);
      setVisible(args.isTooltipVisible);
      setMessage(args.message);
      setContainer(args.el);
      setPreferredPosition(args.pt);
    });
  }, []);

  const portalContainer = popout ? container : mainContainer;

  React.useLayoutEffect(() => {
    if (!preferredPosition) return;

    // Use preferred position by default.
    setPosition(preferredPosition);

    if (!container) return;
    if (!size) return;

    // Contain the tooltip based on the container bounds.
    const containerBounds = Rectangle.create(container.getBoundingClientRect());
    const bounds = Rectangle.createFromSize(size).offset(preferredPosition);
    const adjustedPosition = offsetAndContainInContainer(
      bounds,
      containerBounds.getSize(),
      { x: 8, y: 8 }
    );
    const newPosition = adjustedPosition.offset(containerBounds.topLeft());
    setPosition(newPosition);
  }, [container, size, preferredPosition]);

  return (
    <>
      <div
        className={classnames(
          "uifw-feedback-elementTooltip_container",
          props.className
        )}
        ref={(el) => setMainContainer(el ?? undefined)}
      />
      {portalContainer &&
        visible &&
        ReactDOM.createPortal(
          <Tooltip
            className={classnames(
              "uifw-feedback-elementTooltip",
              props.className
            )}
            style={props.style}
            onSizeChanged={setSize}
            position={position}
          >
            <MessageRenderer message={message} />
          </Tooltip>,
          portalContainer
        )}
    </>
  );
}
