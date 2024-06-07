/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Admin
 */

import * as React from "react";
import type { XAndY } from "@itwin/core-geometry";
import { IModelApp } from "@itwin/core-frontend";
import type {
  AbstractMenuItemProps,
  AbstractToolbarProps,
  CommonToolbarItem,
  DialogLayoutDataProvider,
  DialogProps,
  OnCancelFunc,
  OnItemExecutedFunc,
  OnNumberCommitFunc,
  OnValueCommitFunc,
  Primitives,
  PropertyDescription,
  PropertyRecord,
} from "@itwin/appui-abstract";
import { RelativePosition, UiAdmin } from "@itwin/appui-abstract";
import { CursorInformation } from "../cursor/CursorInformation";
import { PopupManager } from "../popup/PopupManager";
import { UiFramework } from "../UiFramework";
import type { KeyinEntry } from "../keyins/Keyins";
import {
  getKeyinsFromToolList,
  KeyinFieldLocalization,
} from "../keyins/Keyins";
import { mapToPlacement } from "../utils/Placement";
import type { ToolbarProps } from "../toolbar/Toolbar";
import type { ToolbarItem } from "../toolbar/ToolbarItem";
import type { CursorMenuItemProps } from "../shared/MenuItem";

/** Subclass of `UiAdmin` in `@itwin/core-frontend` to be used to initialize `IModelApp`.
 *
 * This implementation uses themed react components that blends in AppUI look and feel.
 *
 * ```ts
 * await IModelApp.startup({
 *   uiAdmin: new FrameworkUiAdmin()
 * });
 * ```
 * @public
 */
export class FrameworkUiAdmin extends UiAdmin {
  private _localizedKeyinPreference: KeyinFieldLocalization =
    KeyinFieldLocalization.NonLocalized;

  /**
   * @deprecated in 4.11.0. Gathering and filtering of keyins is now left up to the user.
   */
  public get localizedKeyinPreference(): KeyinFieldLocalization {
    return this._localizedKeyinPreference;
  }

  public set localizedKeyinPreference(preference: KeyinFieldLocalization) {
    this._localizedKeyinPreference = preference;
  }

  /** Gets the cursor X and Y position, which is mouseEvent.pageX and mouseEvent.pageY.
   * @deprecated in 4.11.0. Please use {@link CursorInformation.cursorPosition}
   */
  public override get cursorPosition(): XAndY {
    return CursorInformation.cursorPosition;
  }

  /** Determines if focus is set to Home
   * @deprecated in 4.11.0. Please use {@link UiFramework.keyboardShortcuts().isFocusOnHome}
   */
  public override get isFocusOnHome(): boolean {
    return UiFramework.keyboardShortcuts.isFocusOnHome;
  }

  /** Sets focus to Home
   * @deprecated in 4.11.0. Please use {@link UiFramework.keyboardShortcuts().setFocusToHome}
   */
  public override setFocusToHome(): void {
    UiFramework.keyboardShortcuts.setFocusToHome();
  }

  /** Show a context menu at a particular location.
   * @param items Properties of the menu items to display.
   * @param location Location of the context menu, relative to the origin of htmlElement or the overall window.
   * @param htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the menu was displayed, false if the menu could not be displayed.
   * @deprecated in 4.11.0. Use {@link UiFramework.openContextMenu}
   */
  public override showContextMenu(
    items: AbstractMenuItemProps[],
    location: XAndY,
    htmlElement?: HTMLElement
  ): boolean {
    return UiFramework.openContextMenu(
      items as CursorMenuItemProps[],
      location,
      htmlElement
    );
  }

  /**
   * @deprecated in 4.11.0. Construct your own {@link KeyinEntry[]} via {@link @itwin/core-frontend#IModelApp.tools.getToolList}.
   */
  public getKeyins(): KeyinEntry[] {
    const tools = IModelApp.tools.getToolList();
    return getKeyinsFromToolList(tools);
  }

  /** Show the Key-in Palette to display key-in from all registered Tools.
   * @param htmlElement The HTMLElement that anchors the Popup. If undefined, the location is relative to the overall window.
   * @return true if the Command Palette was displayed, false if it could not be displayed.
   * @deprecated in 4.11.0. Use {@link UiFramework.showKeyinPalette}. Please note, the use of feature flags to control whether the KeyinPalette can be opened has been deprecated.
   */
  public override showKeyinPalette(htmlElement?: HTMLElement): boolean {
    if (!this.featureFlags.allowKeyinPalette) return false;

    const tools = IModelApp.tools.getToolList();
    const keyIns = getKeyinsFromToolList(tools);

    return UiFramework.showKeyinPalette(keyIns, htmlElement);
  }

  /**
   * Hides the Key-in Palette.
   * @deprecated in 4.11.0. Use {@link UiFramework.hideKeyinPalette}
   */
  public override hideKeyinPalette(): boolean {
    if (!this.featureFlags.allowKeyinPalette) return false;

    return UiFramework.hideKeyinPalette();
  }

  /** Show a Toolbar at a particular location.
   * @param toolbarProps Properties of the Toolbar to display.
   * @param location Location of the Toolbar, relative to the origin of htmlElement or the overall window.
   * @param offset Offset of the Toolbar from the location.
   * @param onItemExecuted Function invoked after a Toolbar item is executed
   * @param onCancel Function invoked when the Escape key is pressed or a click occurs outside the Toolbar
   * @param relativePosition Position relative to the given location. Defaults to TopRight.
   * @param htmlElement The HTMLElement that anchors the Toolbar. If undefined, the location is relative to the overall window.
   * @return true if the Toolbar was displayed, false if the Toolbar could not be displayed.
   * @deprecated in 4.11.0. Please use {@link UiFramework.showToolbar}.
   */
  public override showToolbar(
    toolbarProps: AbstractToolbarProps,
    location: XAndY,
    offset: XAndY,
    onItemExecuted: OnItemExecutedFunc,
    onCancel: OnCancelFunc,
    relativePosition?: RelativePosition,
    htmlElement?: HTMLElement
  ): boolean {
    const placement = mapToPlacement(relativePosition);

    return UiFramework.showToolbar(
      toolbarProps,
      location,
      offset,
      onItemExecuted,
      onCancel,
      placement,
      htmlElement
    );
  }

  /** Hides the toolbar.
   * @deprecated in 4.11.0. Please use {@link UiFramework.hideToolbar}.
   */
  public override hideToolbar(): boolean {
    return UiFramework.hideToolbar();
  }

  /** Show a menu button at a particular location. A menu button opens a context menu.
   * @param id Id of the menu button. Multiple menu buttons may be displayed.
   * @param menuItemsProps Properties of the menu items to display.
   * @param location Location of the context menu, relative to the origin of htmlElement or the window.
   * @param htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the menu was displayed, false if the menu could not be displayed.
   * @deprecated in 4.11.0. Please use {@link UiFramework.showMenuButton}.
   */
  public override showMenuButton(
    id: string,
    menuItemsProps: AbstractMenuItemProps[],
    location: XAndY,
    htmlElement?: HTMLElement
  ): boolean {
    return UiFramework.showMenuButton(
      id,
      menuItemsProps as CursorMenuItemProps[],
      location,
      htmlElement
    );
  }

  /** Hides a menu button.
   * @param id Id of the menu button. Multiple menu buttons may be displayed.
   * @return true if the menu was hidden, false if the menu could not be hidden.
   * @deprecated in 4.11.0. Please use {@link UiFramework.hideMenuButton}.
   */
  public override hideMenuButton(id: string): boolean {
    return UiFramework.hideMenuButton(id);
  }

  /** Show a calculator at a particular location.
   * @param initialValue Value initially displayed in the calculator.
   * @param resultIcon Icon displayed to the left of the value.
   * @param location Location of the calculator, relative to the origin of htmlElement or the window.
   * @param onOk Function called when the OK button or the Enter key is pressed.
   * @param onCancel Function called when the Cancel button or the Escape key  is pressed.
   * @param htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the menu was displayed, false if the menu could not be displayed.
   * @deprecated in 4.11.0. Use {@link UiFramework.showCalculator}.
   */
  public override showCalculator(
    initialValue: number,
    resultIcon: string,
    location: XAndY,
    onOk: OnNumberCommitFunc,
    onCancel: OnCancelFunc,
    htmlElement?: HTMLElement
  ): boolean {
    return UiFramework.showCalculator(
      initialValue,
      resultIcon,
      location,
      onOk,
      onCancel,
      htmlElement
    );
  }

  /** Hides the calculator.
   * @deprecated in 4.11.0. Use {@link UiFramework.hideCalculator}.
   */
  public override hideCalculator(): boolean {
    return UiFramework.hideCalculator();
  }

  /** Show an input editor for an angle value at a particular location.
   * @param initialValue Value initially displayed in the editor.
   * @param location Location of the editor, relative to the origin of htmlElement or the window.
   * @param onCommit Function called when the OK button or the Enter key is pressed.
   * @param onCancel Function called when the Cancel button or the Escape key  is pressed.
   * @param htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the editor was displayed, false if the editor could not be displayed.
   * @deprecated in 4.11.0. Use {@link UiFramework.showAngleEditor}.
   */
  public override showAngleEditor(
    initialValue: number,
    location: XAndY,
    onCommit: OnNumberCommitFunc,
    onCancel: OnCancelFunc,
    htmlElement?: HTMLElement
  ): boolean {
    return UiFramework.showAngleEditor(
      initialValue,
      location,
      onCommit,
      onCancel,
      htmlElement
    );
  }

  /** Show an input editor for a length value at a particular location.
   * @param initialValue Value initially displayed in the editor.
   * @param location Location of the editor, relative to the origin of htmlElement or the window.
   * @param onCommit Function called when the OK button or the Enter key is pressed.
   * @param onCancel Function called when the Cancel button or the Escape key  is pressed.
   * @param htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the editor was displayed, false if the editor could not be displayed.
   * @deprecated in 4.11.0. Use {@link UiFramework.showDimensionEditor("length")}.
   */
  public override showLengthEditor(
    initialValue: number,
    location: XAndY,
    onCommit: OnNumberCommitFunc,
    onCancel: OnCancelFunc,
    htmlElement?: HTMLElement
  ): boolean {
    return UiFramework.showDimensionEditor(
      "length",
      initialValue,
      location,
      onCommit,
      onCancel,
      htmlElement
    );
  }

  /** Show an input editor for a height value at a particular location.
   * @param initialValue Value initially displayed in the editor.
   * @param location Location of the editor, relative to the origin of htmlElement or the window.
   * @param onCommit Function called when the OK button or the Enter key is pressed.
   * @param onCancel Function called when the Cancel button or the Escape key  is pressed.
   * @param htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the editor was displayed, false if the editor could not be displayed.
   * @deprecated in 4.11.0. Use {@link UiFramework.showDimensionEditor("height")}.
   */
  public override showHeightEditor(
    initialValue: number,
    location: XAndY,
    onCommit: OnNumberCommitFunc,
    onCancel: OnCancelFunc,
    htmlElement?: HTMLElement
  ): boolean {
    return UiFramework.showDimensionEditor(
      "height",
      initialValue,
      location,
      onCommit,
      onCancel,
      htmlElement
    );
  }

  /** Show an input editor for a primitive value at a particular location.
   * @param initialValue Value initially displayed in the editor.
   * @param propertyDescription Description of the primitive value property
   * @param location Location of the editor, relative to the origin of htmlElement or the window.
   * @param onCommit Function called when the OK button or the Enter key is pressed.
   * @param onCancel Function called when the Cancel button or the Escape key  is pressed.
   * @param htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the editor was displayed, false if the editor could not be displayed.
   */
  public override showInputEditor(
    initialValue: Primitives.Value,
    propertyDescription: PropertyDescription,
    location: XAndY,
    onCommit: OnValueCommitFunc,
    onCancel: OnCancelFunc,
    htmlElement?: HTMLElement
  ): boolean {
    return UiFramework.showInputEditor({
      initialValue,
      propertyDescription,
      location,
      onCommit,
      onCancel,
      anchorElement: htmlElement,
    });
  }

  /** Hides the input editor.*/
  public override hideInputEditor(): boolean {
    return UiFramework.hideInputEditor();
  }

  /** Show an HTML element at a particular location.
   * @param displayElement The HTMLElement to display
   * @param location Location of the display element, relative to the origin of htmlElement or the window
   * @param offset Offset of the display element from the location
   * @param onCancel Function invoked when the Escape key is pressed or a click occurs outside the display element
   * @param relativePosition Position relative to the given location. Defaults to TopRight.
   * @param anchorElement The HTMLElement that anchors the display element. If undefined, the location is relative to the overall window.
   * @return true if the display element was displayed, false if the display element could not be displayed.
   * @deprecated in 4.11.0. Use {@link UiFramework.showComponent}
   */
  public override showHTMLElement(
    displayElement: HTMLElement,
    location: XAndY,
    offset: XAndY,
    onCancel: OnCancelFunc,
    relativePosition?: RelativePosition,
    anchorElement?: HTMLElement
  ): boolean {
    const el = anchorElement ?? UiFramework.controls.getWrapperElement();

    if (relativePosition === undefined)
      relativePosition = RelativePosition.TopRight;

    return PopupManager.showHTMLElement(
      displayElement,
      el,
      location,
      offset,
      onCancel,
      relativePosition
    );
  }

  /**
   *  Hides the HTML Element.
   * @deprecated in 4.11.0. Use {@link UiFramework.hideComponent}
   */
  public override hideHTMLElement(): boolean {
    return PopupManager.hideHTMLElement();
  }

  /** Show a Card containing content, a title and a toolbar at a particular location.
   * @param content The HTMLElement of the content to display
   * @param title Title to display at the top of the card.
   * @param toolbarProps Properties of the Toolbar to display.
   * @param location Location of the Card, relative to the origin of htmlElement or the window.
   * @param offset Offset of the Card from the location.
   * @param onItemExecuted Function invoked after a Toolbar item is executed
   * @param onCancel Function invoked when the Escape key is pressed or a click occurs outside the Card
   * @param relativePosition Position relative to the given location. Defaults to TopRight.
   * @param anchorElement The HTMLElement that anchors the Card. If undefined, the location is relative to the overall window.
   * @return true if the Card was displayed, false if the Card could not be displayed.
   */
  public override showCard(
    content: HTMLElement,
    title: string | PropertyRecord | undefined,
    toolbarProps: AbstractToolbarProps | undefined,
    location: XAndY,
    offset: XAndY,
    onItemExecuted: OnItemExecutedFunc,
    onCancel: OnCancelFunc,
    relativePosition?: RelativePosition,
    anchorElement?: HTMLElement
  ): boolean {
    const placement = mapToPlacement(relativePosition);
    return UiFramework.showCard(
      <CardRenderer content={content} />,
      title,
      toolbarProps
        ? AbstractToolbarPropsToToolbarProps(toolbarProps)
        : { items: [] },
      location,
      offset,
      onItemExecuted,
      onCancel,
      placement,
      anchorElement
    );
  }

  /** Show a Card containing React-based content, a title and a toolbar at a particular location.
   * @param content The React node of the content to display
   * @param title Title to display at the top of the card.
   * @param toolbarProps Properties of the Toolbar to display.
   * @param location Location of the Card, relative to the origin of htmlElement or the window.
   * @param offset Offset of the Card from the location.
   * @param onItemExecuted Function invoked after a Toolbar item is executed
   * @param onCancel Function invoked when the Escape key is pressed or a click occurs outside the Card
   * @param relativePosition Position relative to the given location. Defaults to TopRight.
   * @param anchorElement The HTMLElement that anchors the Card. If undefined, the location is relative to the overall window.
   * @return true if the Card was displayed, false if the Card could not be displayed.
   */
  public showReactCard(
    content: React.ReactNode,
    title: string | PropertyRecord | undefined,
    toolbarProps: AbstractToolbarProps | undefined,
    location: XAndY,
    offset: XAndY,
    onItemExecuted: OnItemExecutedFunc,
    onCancel: OnCancelFunc,
    relativePosition?: RelativePosition,
    anchorElement?: HTMLElement
  ): boolean {
    const placement = mapToPlacement(relativePosition);
    return UiFramework.showCard(
      content,
      title,
      toolbarProps
        ? AbstractToolbarPropsToToolbarProps(toolbarProps)
        : { items: [] },
      location,
      offset,
      onItemExecuted,
      onCancel,
      placement,
      anchorElement
    );
  }

  /**
   * Hides the Card.
   * */
  public override hideCard(): boolean {
    return UiFramework.hideCard();
  }

  /** Opens a Tool Settings Ui popup at a particular location.
   * @param dataProvider The DialogLayoutDataProvider for the tool settings popup dialog.
   * @param location Location of the tool settings, relative to the origin of anchorElement or the window
   * @param offset Offset of the tool settings from the location
   * @param onCancel Function invoked when the Escape key is pressed or a click occurs outside the tool settings
   * @param relativePosition Position relative to the given location. Defaults to TopRight.
   * @param anchorElement The HTMLElement that anchors the tool settings. If undefined, the location is relative to the overall window.
   * @return true if the tool settings were displayed, false if the tool settings could not be displayed.
   */
  public override openToolSettingsPopup(
    dataProvider: DialogLayoutDataProvider,
    location: XAndY,
    offset: XAndY,
    onCancel: OnCancelFunc,
    relativePosition?: RelativePosition,
    anchorElement?: HTMLElement
  ): boolean {
    const placement = mapToPlacement(relativePosition);
    return UiFramework.openToolSettingsPopup(
      dataProvider,
      location,
      offset,
      onCancel,
      placement,
      anchorElement
    );
  }

  /** Closes the Tool Settings Ui popup. */
  public override closeToolSettingsPopup(): boolean {
    return UiFramework.closeToolSettingsPopup();
  }

  /** Opens a Dialog and automatically populates it using the properties defined by the UiDataProvider.
   * @param uiDataProvider The UiDataProvider for the tool settings
   * @param title Specify title for dialog.
   * @param isModal Specify if the dialog is opened as a modal or modeless.
   * @param id Id of the dialog that is used to close it.
   * @param optionalProps Optional props for Dialog construction.
   * @return true if the tool settings were displayed, false if the tool settings could not be displayed.
   */
  public override openDialog(
    uiDataProvider: DialogLayoutDataProvider,
    title: string,
    isModal: boolean,
    id: string,
    optionalProps?: DialogProps
  ): boolean {
    return UiFramework.openDialog(
      uiDataProvider,
      title,
      isModal,
      id,
      optionalProps
    );
  }

  /** Closes the Tool Settings Ui popup.*/
  public override closeDialog(dialogId: string): boolean {
    return UiFramework.closeDialog(dialogId);
  }
}

// utility functions to wean off appui-abstract
function AbstractToolbarPropsToToolbarProps(
  props: AbstractToolbarProps
): ToolbarProps {
  return {
    items: props.items.map(CommonToolbarItemToToolBarItem),
    itemId: props.toolbarId,
  };
}

function CommonToolbarItemToToolBarItem(item: CommonToolbarItem): ToolbarItem {
  return {
    ...item,
    badge: item.badgeType,
  };
}

interface CardRendererProps {
  content: HTMLElement;
}

function CardRenderer({ content }: CardRendererProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    el?.appendChild(content);
    return () => {
      el?.removeChild(content);
    };
  }, [content]);

  return <div ref={ref} />;
}
