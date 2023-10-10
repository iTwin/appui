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
import type {
  AbstractMenuItemProps,
  OnCancelFunc,
  OnNumberCommitFunc,
  OnValueCommitFunc,
} from "@itwin/appui-abstract";
import type { PopupInfo } from "../popup/PopupManager";
import { PopupManager } from "../popup/PopupManager";
import { MenuItemHelpers } from "../shared/MenuItem";
import { CalculatorPopup } from "./CalculatorPopup";
import { MenuButtonPopup } from "./MenuButtonPopup";

import angleIcon from "./angle.svg";
import lengthIcon from "./distance.svg";
import heightIcon from "./height-2.svg";
import { createWebComponentIconSpec } from "../utils/IconSpecUtilities";

/** AccuDraw Popup Manager class
 * @alpha
 */
export class AccuDrawPopupManager {
  private static _calculatorId = "Calculator";

  public static showMenuButton(
    id: string,
    el: HTMLElement,
    pt: XAndY,
    menuItemsProps: AbstractMenuItemProps[]
  ): boolean {
    const menuItems = MenuItemHelpers.createMenuItems(menuItemsProps);
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
    onOk: OnNumberCommitFunc,
    onCancel: OnCancelFunc
  ): boolean {
    const id = AccuDrawPopupManager._calculatorId;
    const component = (
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
    onCommit: OnNumberCommitFunc,
    onCancel: OnCancelFunc
  ): boolean {
    const propertyDescription = new AngleDescription(
      undefined,
      undefined,
      createWebComponentIconSpec(angleIcon)
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

  public static showLengthEditor(
    el: HTMLElement,
    pt: XAndY,
    value: number,
    onCommit: OnNumberCommitFunc,
    onCancel: OnCancelFunc
  ): boolean {
    const propertyDescription = new LengthDescription(
      undefined,
      undefined,
      createWebComponentIconSpec(lengthIcon)
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
    onCommit: OnNumberCommitFunc,
    onCancel: OnCancelFunc
  ): boolean {
    const propertyDescription = new LengthDescription(
      undefined,
      undefined,
      createWebComponentIconSpec(heightIcon)
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
