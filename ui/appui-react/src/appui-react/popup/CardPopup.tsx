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
import type { Orientation } from "@itwin/components-react";
import {
  Direction,
  PropertyValueRendererManager,
  ToolbarOpacitySetting,
  ToolbarPanelAlignment,
} from "@itwin/components-react";
import type { RequireAtLeastOne } from "@itwin/core-bentley";
import { DivWithOutsideClick, MessageRenderer } from "@itwin/core-react";
import { FocusTrap, Point } from "@itwin/core-react/internal";
import { Text } from "@itwin/itwinui-react";
import { CursorPopup } from "../cursor/cursorpopup/CursorPopup.js";
import type { PopupContentType, PopupPropsBase } from "./PopupManager.js";
import { isReactContent, PopupManager } from "./PopupManager.js";
import { PositionPopup } from "./PositionPopup.js";
import { ToolbarWithOverflow } from "../toolbar/ToolbarWithOverflow.js";
import type { ToolbarItem } from "../toolbar/ToolbarItem.js";
import { mapToPlacement, type Placement } from "../utils/Placement.js";
import { WrapperContext } from "../configurableui/ConfigurableUiContent.js";
import type { SizeProps } from "../utils/SizeProps.js";

/** Props for defining a CardPopup editor.
 * @beta */
export type CardPopupProps = Omit<PopupPropsBase, "el"> & {
  content: PopupContentType;
  title: string | PropertyRecord | undefined;
  items: CommonToolbarItem[] | ToolbarItem[] | undefined;
  /** @deprecated in 4.16.0. Not used by the {@link CardPopup} component. */
  orientation: Orientation;
  onCancel: () => void;
  onItemExecuted: (item: any) => void;
  el?: HTMLElement;
} & RequireAtLeastOne<{
    /** @deprecated in 4.16.0. Use `placement` property instead. */
    relativePosition: RelativePosition;
    placement: Placement;
  }>;

interface CardPopupState {
  size: SizeProps;
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
  public override readonly state = {
    size: { width: -1, height: -1 },
  };

  private _onSizeKnown = (newSize: SizeProps) => {
    if (
      newSize.height === this.state.size.height &&
      newSize.width === this.state.size.width
    )
      return;
    this.setState({ size: newSize });
  };

  private _handleKeyDown = (event: React.KeyboardEvent): void => {
    switch (event.key) {
      case Key.Escape.valueOf():
        this._cancel();
        break;
    }
  };

  private _cancel() {
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
      // eslint-disable-next-line @typescript-eslint/no-deprecated
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
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <DivWithOutsideClick
          onOutsideClick={this.props.onCancel}
          onKeyDown={this._handleKeyDown}
        >
          <FocusTrap active={true} returnFocusOnDeactivate={true}>
            <Card
              content={this.props.content}
              title={this.props.title}
              items={this.props.items}
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
  items?: CommonToolbarItem[] | ToolbarItem[] | undefined;
  onItemExecuted: (item: any) => void;
}

/** Card component
 * @beta */
export function Card(props: CardProps) {
  let titleNode: React.ReactNode;
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
    // eslint-disable-next-line @typescript-eslint/no-deprecated
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
