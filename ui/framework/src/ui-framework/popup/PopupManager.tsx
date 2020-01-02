/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Popup */

import * as React from "react";

import { Logger } from "@bentley/bentleyjs-core";
import { XAndY } from "@bentley/geometry-core";
import {
  OnNumberCommitFunc, OnCancelFunc, OnItemExecutedFunc,
  AbstractToolbarProps, RelativePosition,
} from "@bentley/ui-abstract";
import {
  PrimitiveValue, PropertyValueFormat, PropertyRecord,
  PropertyDescription,
} from "@bentley/imodeljs-frontend";

import { UiEvent, Rectangle, Point, SizeProps, Orientation } from "@bentley/ui-core";
import { offsetAndContainInContainer } from "@bentley/ui-ninezone";

import { UiFramework } from "../UiFramework";
import { InputEditorPopup, InputEditorCommitHandler } from "./InputEditorPopup";
import { ItemDefFactory } from "../shared/ItemDefFactory";
import { ToolbarPopup } from "./ToolbarPopup";

/** Information maintained by PopupManager about a Popup
 * @alpha
 */
export interface PopupInfo {
  id: string;
  pt: XAndY;
  component: React.ReactNode;
}

/** @alpha */
export interface PopupsChangedEventArgs {
  popups: ReadonlyArray<PopupInfo>;
}

/** Popups Changed Event class.
 * @alpha
 */
export class PopupsChangedEvent extends UiEvent<PopupsChangedEventArgs> { }

/** Props for each popup managed by the PopupManager
 * @alpha
 */
export interface PopupPropsBase {
  id: string;
  el: HTMLElement;
  pt: XAndY;
  offset: XAndY;
}

/** Popup Manager class
 * @alpha
 */
export class PopupManager {
  private static _popups: ReadonlyArray<PopupInfo> = [];
  private static _editorId = "InputEditor";
  private static _toolbarId = "Toolbar";
  private static _defaultOffset = { x: 8, y: 8 };

  public static readonly onPopupsChangedEvent = new PopupsChangedEvent();

  public static get popupCount() { return this._popups.length; }
  public static get popups() { return this._popups; }

  /** @internal */
  public static set popups(popups: ReadonlyArray<PopupInfo>) {
    if (this._popups === popups)
      return;
    this._popups = popups;
    this.onPopupsChangedEvent.emit({ popups });
  }

  /** @internal */
  public static clearPopups() {
    this.popups = [];
  }

  private static addPopup(popupInfo: PopupInfo): void {
    const popups = [
      ...PopupManager._popups,
      popupInfo,
    ];
    this.popups = popups;
  }

  private static updatePopup(popupInfo: PopupInfo, itemIndex: number): void {
    if (itemIndex < 0)
      return;

    const popups = [
      ...PopupManager._popups.slice(0, itemIndex),
      popupInfo,
      ...PopupManager._popups.slice(itemIndex + 1),
    ];
    this.popups = popups;
  }

  public static addOrUpdatePopup(popupInfo: PopupInfo): void {
    const itemIndex = PopupManager._popups.findIndex((info: PopupInfo) => info.id === popupInfo.id);
    if (itemIndex >= 0)
      PopupManager.updatePopup(popupInfo, itemIndex);
    else
      PopupManager.addPopup(popupInfo);
  }

  public static removePopup(id: string): boolean {
    const index = PopupManager._popups.findIndex((info: PopupInfo) => id === info.id);
    let result = true;

    if (index >= 0) {
      const popups = PopupManager._popups.filter((info: PopupInfo) => {
        return info.id !== id;
      });
      this.popups = popups;
    } else {
      Logger.logError(UiFramework.loggerCategory(this), `removePopup: Could not find popup with id of '${id}'`);
      result = false;
    }

    return result;
  }

  public static get defaultOffset(): XAndY { return PopupManager._defaultOffset; }
  public static set defaultOffset(offset: XAndY) { PopupManager._defaultOffset = offset; }

  public static showInputEditor(el: HTMLElement, pt: XAndY, value: number, propertyDescription: PropertyDescription, onCommit: OnNumberCommitFunc, onCancel: OnCancelFunc): boolean {
    const primitiveValue: PrimitiveValue = {
      value,
      valueFormat: PropertyValueFormat.Primitive,
    };
    const record = new PropertyRecord(primitiveValue, propertyDescription);
    const commitHandler = new InputEditorCommitHandler(onCommit);
    const id = PopupManager._editorId;
    const component = (
      <InputEditorPopup id={id} el={el} pt={pt} offset={PopupManager.defaultOffset}
        record={record} onCancel={onCancel} commitHandler={commitHandler} />
    );

    const popupInfo: PopupInfo = {
      id, pt, component,
    };
    PopupManager.addOrUpdatePopup(popupInfo);

    return true;
  }

  public static hideInputEditor(): boolean {
    return PopupManager.removePopup(PopupManager._editorId);
  }

  public static showToolbar(
    toolbarProps: AbstractToolbarProps, el: HTMLElement, pt: XAndY, offset: XAndY,
    onItemExecuted: OnItemExecutedFunc, onCancel: OnCancelFunc, relativePosition: RelativePosition,
  ): boolean {

    const toolbarItems = ItemDefFactory.createItemListForToolbar(toolbarProps.items, onItemExecuted);
    const id = PopupManager._toolbarId;
    const component = (
      <ToolbarPopup id={id} el={el} pt={pt} offset={offset}
        items={toolbarItems} relativePosition={relativePosition} orientation={Orientation.Horizontal} onCancel={onCancel} />
    );

    const popupInfo: PopupInfo = {
      id, pt, component,
    };
    PopupManager.addOrUpdatePopup(popupInfo);

    return true;
  }

  public static hideToolbar(): boolean {
    return PopupManager.removePopup(PopupManager._toolbarId);
  }

  public static getPopupPosition(el: HTMLElement, pt: XAndY, offset: XAndY, size: SizeProps): Point {
    const containerBounds = Rectangle.create(el.getBoundingClientRect());
    const relativeBounds = Rectangle.createFromSize(size).offset(pt);
    const adjustedPosition: Point = offsetAndContainInContainer(relativeBounds, containerBounds.getSize(), offset);
    const position = adjustedPosition.offset(containerBounds.topLeft());

    return position;
  }

}

/** @internal */
interface PopupRendererState {
  popups: ReadonlyArray<PopupInfo>;
}

/**  Popup Renderer
 * @alpha
 */
export class PopupRenderer extends React.Component<{}, PopupRendererState> {
  /** @internal */
  public readonly state: PopupRendererState = {
    popups: PopupManager.popups,
  };

  public componentDidMount(): void {
    PopupManager.onPopupsChangedEvent.addListener(this._handlePopupsChangedEvent);
  }

  public componentWillUnmount(): void {
    PopupManager.onPopupsChangedEvent.removeListener(this._handlePopupsChangedEvent);
  }

  public render(): React.ReactNode {
    if (PopupManager.popupCount <= 0)
      return null;

    return (
      <>
        {
          this.state.popups.map((popupInfo: PopupInfo) => {
            return (
              <React.Fragment key={popupInfo.id}>
                {popupInfo.component}
              </React.Fragment>
            );
          })
        }
      </>
    );
  }

  private _handlePopupsChangedEvent = (args: PopupsChangedEventArgs) => {
    this.setState({ popups: args.popups });
  }

}
