/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Popup
 */

import type {
  AbstractToolbarProps,
  DialogLayoutDataProvider,
  OnValueCommitFunc,
  Primitives,
  PrimitiveValue,
  PropertyDescription,
  RelativePosition,
} from "@itwin/appui-abstract";
import {
  PropertyRecord,
  PropertyValueFormat,
  UiEvent,
} from "@itwin/appui-abstract";
import { Logger } from "@itwin/core-bentley";
import type { XAndY } from "@itwin/core-geometry";
import type { Point, SizeProps } from "@itwin/core-react";
import { Orientation, Rectangle } from "@itwin/core-react";
import * as React from "react";
import type { ReactElement } from "react";
import { offsetAndContainInContainer } from "../layout/popup/Tooltip";
import type { KeyinEntry } from "../keyins/Keyins";
import { UiFramework } from "../UiFramework";
import { CardPopup } from "./CardPopup";
import { HTMLElementPopup } from "./HTMLElementPopup";
import { InputEditorCommitHandler, InputEditorPopup } from "./InputEditorPopup";
import { KeyinPalettePopup } from "./KeyinPalettePopup";
import { ToolbarPopup } from "./ToolbarPopup";
import { ToolSettingsPopup } from "./ToolSettingsPopup";
import { ComponentPopup } from "./ComponentPopup";
import { WrapperContext } from "../configurableui/ConfigurableUiContent";
import { mapToPlacement, type Placement } from "../utils/Placement";
import type { ToolbarItem } from "../toolbar/ToolbarItem";
import type { ToolbarProps } from "../toolbar/Toolbar";
import { InternalConfigurableUiManager } from "../configurableui/InternalConfigurableUiManager";

// cSpell:ignore uiadmin

/** Information maintained by PopupManager about a Popup
 * @public
 */
export interface PopupInfo {
  id: string;
  pt: XAndY;
  component: React.ReactNode;
  /** @deprecated in 4.x.11. Please use the optional `parent` property moving forward. */
  parentDocument: Document;
  /** will become standard once `parentDocument` is removed. */
  parent?: Document;
}

/** @internal */
interface CommonPopupOptions {
  onCancel: () => void;
  location: XAndY;
  offset: XAndY;
  placement: Placement;
  anchor?: HTMLElement;
  id?: string;
}

interface DisplayCardPopupOptions extends CommonPopupOptions {
  title: string | PropertyRecord | undefined;
  toolbarProps?: ToolbarProps;
  onItemExecuted: (item: any) => void;
}

/**
 * @public
 * @deprecated in 4.13.x. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface PopupsChangedEventArgs {
  popups: ReadonlyArray<PopupInfo>;
}

/** Popups Changed Event class.
 * @public
 * @deprecated in 4.13.x. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line deprecation/deprecation
export class PopupsChangedEvent extends UiEvent<PopupsChangedEventArgs> {}

/** Props for each popup managed by the PopupManager
 * @public
 */
export interface PopupPropsBase {
  id: string;
  el: HTMLElement;
  pt: XAndY;
  offset: XAndY;
}

/** Describes React based content
 * @public
 */
export interface ReactContent {
  reactNode: React.ReactNode;
}

/** Type for Popup Content
 * @public
 */
export type PopupContentType = HTMLElement | ReactContent;

/** ReactContent type guard.
 * @internal
 */
export const isReactContent = (
  content: PopupContentType
): content is ReactContent => {
  return (content as ReactContent).reactNode !== undefined;
};

/** Popup Manager class
 * @public
 */
export class PopupManager {
  private static _popups: ReadonlyArray<PopupInfo> = [];
  private static _editorId = "InputEditor";
  private static _toolbarId = "Toolbar";
  private static _htmlElementId = "HTMLElement";
  private static _cardId = "Card";
  private static _toolSettingsId = "ToolSettings";
  private static _keyPalettePopupId = "KeyinPalette";

  private static _defaultOffset = { x: 8, y: 8 };

  // eslint-disable-next-line deprecation/deprecation
  public static readonly onPopupsChangedEvent = new PopupsChangedEvent();

  public static get popupCount() {
    return this._popups.length;
  }
  public static get popups() {
    return this._popups;
  }

  public static set popups(popups: ReadonlyArray<PopupInfo>) {
    if (this._popups === popups) return;
    this._popups = popups;
    this.onPopupsChangedEvent.emit({ popups });
  }

  /** @internal */
  public static clearPopups() {
    this.popups = [];
  }

  private static addPopup(popupInfo: PopupInfo): void {
    const popups = [...PopupManager._popups, popupInfo];
    this.popups = popups;
  }

  private static updatePopup(popupInfo: PopupInfo, itemIndex: number): void {
    if (itemIndex < 0) return;

    const popups = [
      ...PopupManager._popups.slice(0, itemIndex),
      popupInfo,
      ...PopupManager._popups.slice(itemIndex + 1),
    ];
    this.popups = popups;
  }

  public static addOrUpdatePopup(popupInfo: PopupInfo): void {
    const itemIndex = PopupManager._popups.findIndex(
      (info: PopupInfo) => info.id === popupInfo.id
    );
    if (itemIndex >= 0) PopupManager.updatePopup(popupInfo, itemIndex);
    else PopupManager.addPopup(popupInfo);
  }

  public static removePopup(id: string): boolean {
    const index = PopupManager._popups.findIndex(
      (info: PopupInfo) => id === info.id
    );
    let result = true;

    if (index >= 0) {
      const popups = PopupManager._popups.filter((info: PopupInfo) => {
        return info.id !== id;
      });
      this.popups = popups;
    } else {
      Logger.logError(
        UiFramework.loggerCategory(this),
        `removePopup: Could not find popup with id of '${id}'`
      );
      result = false;
    }

    return result;
  }

  public static get defaultOffset(): XAndY {
    return PopupManager._defaultOffset;
  }
  public static set defaultOffset(offset: XAndY) {
    PopupManager._defaultOffset = offset;
  }

  public static showInputEditor(
    el: HTMLElement,
    pt: XAndY,
    value: Primitives.Value,
    propertyDescription: PropertyDescription,
    onCommit: OnValueCommitFunc,
    onCancel: () => void
  ): boolean {
    const primitiveValue: PrimitiveValue = {
      value,
      valueFormat: PropertyValueFormat.Primitive,
    };
    const record = new PropertyRecord(primitiveValue, propertyDescription);
    const commitHandler = new InputEditorCommitHandler(onCommit);
    const id = PopupManager._editorId;
    const component = (
      <InputEditorPopup
        id={id}
        el={el}
        pt={pt}
        offset={PopupManager.defaultOffset}
        record={record}
        onCancel={onCancel}
        commitHandler={commitHandler}
      />
    );

    const popupInfo: PopupInfo = {
      id,
      pt,
      component,
      parentDocument: el.ownerDocument,
      parent: el.ownerDocument,
    };
    PopupManager.addOrUpdatePopup(popupInfo);

    return true;
  }

  public static hideInputEditor(): boolean {
    return PopupManager.removePopup(PopupManager._editorId);
  }

  public static showKeyinPalette(
    keyins: KeyinEntry[],
    el: HTMLElement,
    onItemExecuted?: (item: any) => void,
    onCancel?: () => void
  ): boolean {
    const id = PopupManager._keyPalettePopupId;
    const cancelFn = onCancel ?? (() => PopupManager.hideKeyinPalette());
    const component = (
      <KeyinPalettePopup
        keyins={keyins}
        id={id}
        el={el}
        onItemExecuted={onItemExecuted}
        onCancel={cancelFn}
      />
    );

    // since the command palette popup is always at top center of specified HTML element and it does not need to move like
    // cursor popups just set pt to 0,0.
    const pt = { x: 0, y: 0 };
    const popupInfo: PopupInfo = {
      id,
      pt,
      component,
      parentDocument: el?.ownerDocument,
    };
    PopupManager.addOrUpdatePopup(popupInfo);

    return true;
  }

  public static hideKeyinPalette(): boolean {
    return PopupManager.removePopup(PopupManager._keyPalettePopupId);
  }

  // @deprecated in 4.11.x. Use {@link PopupManager.displayToolbar} instead.
  public static showToolbar(
    toolbarProps: AbstractToolbarProps,
    el: HTMLElement,
    pt: XAndY,
    offset: XAndY,
    onItemExecuted: (item: any) => void,
    onCancel: () => void,
    relativePosition: RelativePosition
  ): boolean {
    PopupManager.displayToolbar(toolbarProps.items, {
      anchor: el,
      location: pt,
      offset,
      onCancel,
      placement: mapToPlacement(relativePosition),
      onItemExecuted,
    });
    return true;
  }

  public static displayToolbar(
    items: ToolbarItem[],
    options: CommonPopupOptions & { onItemExecuted: (item: any) => void }
  ): boolean {
    const id = options.id ?? PopupManager._toolbarId;
    const { anchor, location, offset, onCancel, placement, onItemExecuted } =
      options;

    const component = (
      <ToolbarPopup
        id={id}
        el={anchor}
        pt={location}
        offset={offset}
        items={items}
        placement={placement}
        orientation={Orientation.Horizontal}
        onCancel={onCancel}
        onItemExecuted={onItemExecuted}
      />
    );

    const popupInfo: PopupInfo = {
      id,
      pt: location,
      component,
      parentDocument:
        anchor?.ownerDocument ??
        InternalConfigurableUiManager.getWrapperDocument(),
      parent: anchor?.ownerDocument,
    };
    PopupManager.addOrUpdatePopup(popupInfo);

    return true;
  }

  public static hideToolbar(): boolean {
    return PopupManager.removePopup(PopupManager._toolbarId);
  }

  // @deprecated in 4.11.x. Use {@link PopupManager.showComponent} instead.
  public static showHTMLElement(
    displayElement: HTMLElement,
    el: HTMLElement,
    pt: XAndY,
    offset: XAndY,
    onCancel: () => void,
    relativePosition: RelativePosition
  ): boolean {
    const id = PopupManager._htmlElementId;
    const component = (
      // eslint-disable-next-line deprecation/deprecation
      <HTMLElementPopup
        id={id}
        el={el}
        pt={pt}
        offset={offset}
        element={displayElement}
        relativePosition={relativePosition}
        orientation={Orientation.Horizontal}
        onCancel={onCancel}
      />
    );

    const popupInfo: PopupInfo = {
      id,
      pt,
      component,
      parentDocument: el.ownerDocument,
    };
    PopupManager.addOrUpdatePopup(popupInfo);

    return true;
  }

  // @deprecated in 4.11.x. Use {@link PopupManager.hideComponent} instead.
  public static hideHTMLElement(): boolean {
    return PopupManager.removePopup(PopupManager._htmlElementId);
  }

  /**
   * Displays a React component as a popup.
   * @param displayElement The React component to display.
   * @param options for displaying the component.
   */
  public static showComponent(
    displayElement: ReactElement,
    options: CommonPopupOptions
  ): boolean {
    const { onCancel, location, offset, placement, anchor, id } = options;
    const _id = PopupManager._htmlElementId;

    const component = (
      <ComponentPopup
        id={id ?? _id}
        anchor={anchor ?? undefined}
        pt={location}
        offset={offset}
        placement={placement}
        orientation={Orientation.Horizontal}
        onCancel={onCancel}
      >
        {displayElement}
      </ComponentPopup>
    );

    const popupInfo: PopupInfo = {
      id: id ?? _id,
      pt: location,
      component,
      parentDocument:
        anchor?.ownerDocument ??
        InternalConfigurableUiManager.getWrapperDocument(),
    };
    PopupManager.addOrUpdatePopup(popupInfo);

    return true;
  }

  public static hideComponent(id?: string): boolean {
    return PopupManager.removePopup(id ?? PopupManager._htmlElementId);
  }

  // @deprecated in 4.11.x. Use {@link PopupManager.displayCard} instead.
  public static showCard(
    content: PopupContentType,
    title: string | PropertyRecord | undefined,
    toolbarProps: AbstractToolbarProps | undefined,
    el: HTMLElement,
    pt: XAndY,
    offset: XAndY,
    onItemExecuted: (item: any) => void,
    onCancel: () => void,
    relativePosition: RelativePosition
  ): boolean {
    const id = PopupManager._cardId;
    const placement = mapToPlacement(relativePosition);
    const component = (
      <CardPopup
        id={id}
        el={el}
        pt={pt}
        offset={offset}
        content={content}
        title={title}
        items={toolbarProps ? toolbarProps.items : undefined}
        placement={placement}
        orientation={Orientation.Horizontal}
        onCancel={onCancel}
        onItemExecuted={onItemExecuted}
      />
    );

    const popupInfo: PopupInfo = {
      id,
      pt,
      component,
      parentDocument: el.ownerDocument,
      parent: el.ownerDocument,
    };
    PopupManager.addOrUpdatePopup(popupInfo);

    return true;
  }

  public static displayCard(
    content: React.ReactNode,
    options: DisplayCardPopupOptions
  ): boolean {
    const id = options.id ?? PopupManager._cardId;
    const {
      onCancel,
      location,
      placement,
      offset,
      anchor,
      title,
      toolbarProps,
      onItemExecuted,
    } = options;
    const component = (
      <CardPopup
        id={id}
        el={anchor}
        pt={location}
        offset={offset}
        content={{ reactNode: content }}
        title={title}
        items={toolbarProps?.items}
        placement={placement}
        orientation={Orientation.Horizontal}
        onCancel={onCancel}
        onItemExecuted={onItemExecuted}
      />
    );

    const popupInfo: PopupInfo = {
      id,
      pt: location,
      component,
      parentDocument:
        anchor?.ownerDocument ??
        InternalConfigurableUiManager.getWrapperDocument(),
      parent: anchor?.ownerDocument,
    };
    PopupManager.addOrUpdatePopup(popupInfo);

    return true;
  }

  public static hideCard(id?: string): boolean {
    const index = PopupManager._popups.findIndex(
      (info: PopupInfo) => id ?? PopupManager._cardId === info.id
    );
    if (index >= 0) return PopupManager.removePopup(PopupManager._cardId);
    return false;
  }

  public static openToolSettings(
    dataProvider: DialogLayoutDataProvider,
    el: HTMLElement,
    pt: XAndY,
    offset: XAndY,
    onCancel: () => void,
    relativePosition: RelativePosition
  ): boolean {
    const id = PopupManager._toolSettingsId;
    const component = (
      <ToolSettingsPopup
        id={id}
        el={el}
        pt={pt}
        offset={offset}
        dataProvider={dataProvider}
        relativePosition={relativePosition}
        orientation={Orientation.Horizontal}
        onCancel={onCancel}
      />
    );

    const popupInfo: PopupInfo = {
      id,
      pt,
      component,
      parentDocument: el.ownerDocument,
    };
    PopupManager.addOrUpdatePopup(popupInfo);

    return true;
  }

  public static closeToolSettings(): boolean {
    return PopupManager.removePopup(PopupManager._toolSettingsId);
  }

  public static getPopupPosition(
    el: HTMLElement,
    pt: XAndY,
    offset: XAndY,
    size: SizeProps
  ): Point {
    const containerBounds = Rectangle.create(el.getBoundingClientRect());
    const relativeBounds = Rectangle.createFromSize(size).offset(pt);
    const adjustedPosition: Point = offsetAndContainInContainer(
      relativeBounds,
      containerBounds.getSize(),
      offset
    );
    const position = adjustedPosition.offset(containerBounds.topLeft());

    return position;
  }
}

/** @internal */
interface PopupRendererState {
  parentDocument: Document | null;
  popups: ReadonlyArray<PopupInfo>;
}

/**  Popup Renderer
 * @public
 */
export class PopupRenderer extends React.Component<{}, PopupRendererState> {
  /** @internal */
  public static override contextType = WrapperContext;
  /** @internal */
  public declare context: React.ContextType<typeof WrapperContext>;

  public override readonly state: PopupRendererState = {
    parentDocument: null,
    popups: PopupManager.popups,
  };

  public override componentDidMount(): void {
    Logger.logInfo("PopupManager", `mounting PopupManager`);
    PopupManager.onPopupsChangedEvent.addListener(
      this._handlePopupsChangedEvent
    );
  }

  public override componentWillUnmount(): void {
    Logger.logInfo("PopupManager", `un-mounting PopupManager`);
    PopupManager.onPopupsChangedEvent.removeListener(
      this._handlePopupsChangedEvent
    );
  }

  private _handleRefSet = (popupDiv: HTMLElement | null) => {
    this.setState({ parentDocument: popupDiv?.ownerDocument ?? null });
  };

  public override render(): React.ReactNode {
    if (PopupManager.popupCount <= 0) return null;
    return (
      <div
        className="appui-react-popup-render-container"
        ref={this._handleRefSet}
      >
        {this.state.parentDocument &&
          this.state.popups
            .filter(
              (info) =>
                (info.parent ??
                  // eslint-disable-next-line deprecation/deprecation
                  info.parentDocument ??
                  this.context.ownerDocument) === this.state.parentDocument
            )
            .map((popupInfo: PopupInfo) => {
              return (
                <React.Fragment key={popupInfo.id}>
                  {popupInfo.component}
                </React.Fragment>
              );
            })}
      </div>
    );
  }

  // eslint-disable-next-line deprecation/deprecation
  private _handlePopupsChangedEvent = (args: PopupsChangedEventArgs) => {
    this.setState({ popups: args.popups });
  };
}
