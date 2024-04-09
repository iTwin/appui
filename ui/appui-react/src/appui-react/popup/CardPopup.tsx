/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Popup
 */

import "./CardPopup.scss";
import * as React from "react";
import classnames from "classnames";
import { Key } from "ts-key-enum";
import type { CommonToolbarItem, PropertyRecord } from "@itwin/appui-abstract";
import type { RelativePosition } from "@itwin/appui-abstract";
import type { Orientation, SizeProps } from "@itwin/core-react";
import {
  DivWithOutsideClick,
  FocusTrap,
  MessageRenderer,
  Point,
  Size,
} from "@itwin/core-react";
import { Text } from "@itwin/itwinui-react";
import { CursorPopup } from "../cursor/cursorpopup/CursorPopup";
import type { PopupContentType, PopupPropsBase } from "./PopupManager";
import { isReactContent, PopupManager } from "./PopupManager";
import { PositionPopup } from "./PositionPopup";
import {
  Direction,
  PropertyValueRendererManager,
  ToolbarOpacitySetting,
  ToolbarPanelAlignment,
} from "@itwin/components-react";
import { ToolbarWithOverflow } from "../toolbar/ToolbarWithOverflow";
import type { ToolbarItem } from "../toolbar/ToolbarItem";
import { mapToPlacement, type Placement } from "../utils/Placement";
import { WrapperContext } from "../configurableui/ConfigurableUiContent";
import type { RequireAtLeastOne } from "@itwin/core-bentley";

/** Props for defining a CardPopup editor
 * @beta */
export type CardPopupProps = Omit<PopupPropsBase, "el"> & {
  content: PopupContentType;
  title: string | PropertyRecord | undefined;
  items: CommonToolbarItem[] | ToolbarItem[] | undefined; // {@link @itwin/appui-abstract#CommonToolbarItem} will be deprecated in 4.11.x. Please use {@link ToolbarItem[]} instead.
  orientation: Orientation;
  onCancel: () => void;
  onItemExecuted: (item: any) => void;
  el?: HTMLElement;
} & RequireAtLeastOne<{
    relativePosition: RelativePosition; // @deprecated in 4.11.x. Please use placement instead.
    placement: Placement;
  }>;

/** @internal */
interface CardPopupState {
  size: Size;
}

/** Popup component for Input Editor
 * @beta
 */
export class CardPopup extends React.PureComponent<
  CardPopupProps,
  CardPopupState
> {
  /** @internal */
  public static override contextType = WrapperContext;
  /** @internal */
  public declare context: React.ContextType<typeof WrapperContext>;
  /** @internal */
  public override readonly state = {
    size: new Size(-1, -1),
  };

  private _onSizeKnown = (newSize: SizeProps) => {
    // istanbul ignore else
    if (!this.state.size.equals(newSize))
      this.setState({ size: Size.create(newSize) });
  };

  private _handleKeyDown = (event: React.KeyboardEvent): void => {
    switch (event.key) {
      case Key.Escape.valueOf():
        this._cancel();
        break;
    }
  };

  private _cancel() {
    // istanbul ignore else
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  public override render() {
    let point = PopupManager.getPopupPosition(
      this.props.el ?? this.context,
      this.props.pt,
      new Point(),
      this.state.size
    );
    const popupRect = CursorPopup.getPopupRect(
      point,
      this.props.offset,
      this.state.size,
      this.props.placement ?? mapToPlacement(this.props.relativePosition)
    );
    point = new Point(popupRect.left, popupRect.top);

    return (
      <PositionPopup
        key={this.props.id}
        className={classnames("uifw-no-border", "uifw-card")}
        point={point}
        onSizeKnown={this._onSizeKnown}
      >
        {/* eslint-disable-next-line deprecation/deprecation */}
        <DivWithOutsideClick
          onOutsideClick={this.props.onCancel}
          onKeyDown={this._handleKeyDown}
        >
          <FocusTrap active={true} returnFocusOnDeactivate={true}>
            <Card
              content={this.props.content}
              title={this.props.title}
              items={this.props.items}
              // toolbarItems={this.props.toolbarItems}
              onItemExecuted={this.props.onItemExecuted}
            />
          </FocusTrap>
        </DivWithOutsideClick>
      </PositionPopup>
    );
  }
}

/** Props defining a Card component
 * @beta */
export interface CardProps {
  content: PopupContentType;
  title: string | PropertyRecord | undefined;
  items?: CommonToolbarItem[] | ToolbarItem[] | undefined; // @deprecated in 4.11.x. Please use {@link CardProps.toolbarItems}
  onItemExecuted: (item: any) => void;
}

/** Card component
 * @beta */
export function Card(props: CardProps) {
  let titleNode: React.ReactNode;
  // istanbul ignore else
  if (props.title) {
    if (typeof props.title === "string")
      titleNode = <Text variant="leading">{props.title}</Text>;
    else {
      const propertyValueRendererManager =
        PropertyValueRendererManager.defaultManager;
      const titleValue = propertyValueRendererManager.render(props.title);
      titleNode = <Text variant="leading">{titleValue}</Text>;
    }
  }

  const content = isReactContent(props.content) ? (
    props.content.reactNode
  ) : (
    <MessageRenderer message={props.content} />
  );

  return (
    <>
      <div className="uifw-card-content">
        {props.title && (
          <>
            {titleNode}
            <div className="uifw-card-gap" />
          </>
        )}
        {content}
      </div>
      {props.items && (
        <>
          <div className="uifw-card-separator" />
          <ToolbarWithOverflow
            expandsTo={Direction.Bottom}
            panelAlignment={ToolbarPanelAlignment.Start}
            items={props.items}
            useDragInteraction={true}
            toolbarOpacitySetting={ToolbarOpacitySetting.Transparent}
            onItemExecuted={props.onItemExecuted}
          />
        </>
      )}
    </>
  );
}
