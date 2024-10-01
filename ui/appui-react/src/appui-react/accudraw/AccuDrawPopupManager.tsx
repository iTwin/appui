/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module AccuDraw
 */

import * as React from "react";
import type { XAndY } from "@itwin/core-geometry";
import { AngleDescription, LengthDescription } from "@itwin/core-frontend";
import type { OnValueCommitFunc } from "@itwin/appui-abstract";
import type { PopupInfo } from "../popup/PopupManager.js";
import { PopupManager } from "../popup/PopupManager.js";
import type { CursorMenuItemProps } from "../shared/MenuItem.js";
import { MenuItemHelpers } from "../shared/MenuItem.js";
import { CalculatorPopup } from "./CalculatorPopup.js";
import { MenuButtonPopup } from "./MenuButtonPopup.js";

import angleIcon from "./angle.svg";
import lengthIcon from "./distance.svg";
import heightIcon from "./height-2.svg";

/** AccuDraw Popup Manager class
 * @public
 */
export class AccuDrawPopupManager {
  private static _calculatorId = "Calculator";

  public static showMenuButton(
    id: string,
    el: HTMLElement,
    pt: XAndY,
    menuItemsProps: CursorMenuItemProps[]
  ): boolean {
    // eslint-disable-next-line deprecation/deprecation
    const menuItems = MenuItemHelpers.createMenuItems(menuItemsProps);
    // eslint-disable-next-line deprecation/deprecation
    const menuContent = MenuItemHelpers.createMenuItemNodes(menuItems);

    const component = (
      <MenuButtonPopup
        id={id}
        el={el}
        pt={pt}
        offset={PopupManager.defaultOffset}
        content={menuContent}
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

  public static hideMenuButton(id: string): boolean {
    return PopupManager.removePopup(id);
  }

  public static showCalculator(
    el: HTMLElement,
    pt: XAndY,
    initialValue: number,
    resultIcon: string,
    onOk: (value: number) => void,
    onCancel: () => void
  ): boolean {
    const id = AccuDrawPopupManager._calculatorId;
    const component = (
      // eslint-disable-next-line deprecation/deprecation
      <CalculatorPopup
        id={id}
        el={el}
        pt={pt}
        offset={PopupManager.defaultOffset}
        initialValue={initialValue}
        resultIcon={resultIcon}
        onOk={onOk}
        onCancel={onCancel}
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

  public static hideCalculator(): boolean {
    return PopupManager.removePopup(AccuDrawPopupManager._calculatorId);
  }

  public static showAngleEditor(
    el: HTMLElement,
    pt: XAndY,
    value: number,
    onCommit: (value: number) => void,
    onCancel: () => void
  ): boolean {
    const propertyDescription = new AngleDescription(
      undefined,
      undefined,
      angleIcon
    );
    return PopupManager.showInputEditor(
      el,
      pt,
      value,
      propertyDescription,
      onCommit as OnValueCommitFunc,
      onCancel
    );
  }

  /** @internal */
  public static showDimensionEditor(
    dimension: "height" | "length",
    el: HTMLElement,
    pt: XAndY,
    value: number,
    onCommit: (value: number) => void,
    onCancel: () => void
  ) {
    if (dimension === "height") {
      return AccuDrawPopupManager.showHeightEditor(
        el,
        pt,
        value,
        onCommit,
        onCancel
      );
    }

    return AccuDrawPopupManager.showLengthEditor(
      el,
      pt,
      value,
      onCommit,
      onCancel
    );
  }

  public static showLengthEditor(
    el: HTMLElement,
    pt: XAndY,
    value: number,
    onCommit: (value: number) => void,
    onCancel: () => void
  ): boolean {
    const propertyDescription = new LengthDescription(
      undefined,
      undefined,
      lengthIcon
    );
    return PopupManager.showInputEditor(
      el,
      pt,
      value,
      propertyDescription,
      onCommit as OnValueCommitFunc,
      onCancel
    );
  }

  public static showHeightEditor(
    el: HTMLElement,
    pt: XAndY,
    value: number,
    onCommit: (value: number) => void,
    onCancel: () => void
  ): boolean {
    const propertyDescription = new LengthDescription(
      undefined,
      undefined,
      heightIcon
    );
    return PopupManager.showInputEditor(
      el,
      pt,
      value,
      propertyDescription,
      onCommit as OnValueCommitFunc,
      onCancel
    );
  }
}
