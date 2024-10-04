/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Dialog
 */

import type * as React from "react";
import { BeUiEvent, Logger } from "@itwin/core-bentley";
import { getCssVariableAsNumber } from "@itwin/core-react";
import { UiFramework } from "../UiFramework.js";
import type { DialogChangedEventArgs } from "./DialogManagerBase.js";
import { DialogManagerBase } from "./DialogManagerBase.js";
import {
  IModelApp,
  NotifyMessageDetails,
  OutputMessagePriority,
  OutputMessageType,
} from "@itwin/core-frontend";
import type { ContentDialogInfo } from "../framework/FrameworkContent.js";

// cSpell:ignore ZINDEX modeless

/** Used if the 'dialog' z-index CSS variable cannot be read */
const CONTENT_DIALOG_ZINDEX_DEFAULT = 2000;

/** Content Dialog Manager class displays and manages multiple modeless dialogs
 * @internal
 */
export class InternalContentDialogManager {
  /** Content Dialog Changed Event */
  public static readonly onContentDialogChangedEvent =
    new BeUiEvent<DialogChangedEventArgs>(); // eslint-disable-line @typescript-eslint/no-deprecated

  /** @internal */
  public static readonly dialogManager: DialogManagerBase =
    new DialogManagerBase(
      InternalContentDialogManager.onContentDialogChangedEvent
    );

  /** Get the array of modeless dialogs */
  public static get dialogs() {
    return InternalContentDialogManager.dialogManager.dialogs;
  }

  private static _dialogMap = new Map<string, ContentDialogInfo>();
  private static _idArray = new Array<string>();

  private static _topZIndex = CONTENT_DIALOG_ZINDEX_DEFAULT;

  /** Initialize the modeless dialog manager.
   * @internal
   */
  public static initialize(): void {
    InternalContentDialogManager._topZIndex =
      InternalContentDialogManager.getDialogZIndexDefault();
  }

  private static getDialogZIndexDefault(): number {
    const variable = "--uicore-z-index-view-content-dialog";
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const value = getCssVariableAsNumber(variable);

    if (!isNaN(value)) return value;

    Logger.logError(
      UiFramework.loggerCategory("InternalContentDialogManager"),
      `'${variable}' CSS variable not found`
    );
    return CONTENT_DIALOG_ZINDEX_DEFAULT;
  }

  /** Open a modeless dialog
   * @param dialog The Dialog to open
   * @param id The id of the Dialog to open
   */
  public static open(
    dialog: React.ReactNode,
    id: string,
    parentDocument = document
  ): void {
    const dialogInfo = InternalContentDialogManager._dialogMap.get(id);
    if (dialogInfo) {
      const message = `Dialog with id of '${id}' already opened`;
      Logger.logInfo(
        UiFramework.loggerCategory("InternalContentDialogManager"),
        `openDialog: ${message}`
      );
      IModelApp.notifications.outputMessage(
        new NotifyMessageDetails(
          OutputMessagePriority.Info,
          message,
          undefined,
          OutputMessageType.Toast
        )
      );
      return;
    }
    InternalContentDialogManager._dialogMap.set(id, {
      reactNode: dialog,
      zIndex: ++InternalContentDialogManager._topZIndex,
      parentDocument,
    });
    InternalContentDialogManager._idArray.push(id);
    InternalContentDialogManager.dialogManager.openDialog(
      dialog,
      id,
      parentDocument
    );
  }

  /** Close a modeless dialog
   * @param id The id of the Dialog to close.
   */
  public static close(id: string): void {
    const dialogInfo = InternalContentDialogManager._dialogMap.get(id);
    if (dialogInfo) {
      InternalContentDialogManager.dialogManager.removeDialog(
        dialogInfo.reactNode
      );
      InternalContentDialogManager._dialogMap.delete(id);
      const index = InternalContentDialogManager._idArray.indexOf(id);
      if (index >= 0) InternalContentDialogManager._idArray.splice(index, 1);

      if (InternalContentDialogManager.active === undefined)
        InternalContentDialogManager._topZIndex =
          InternalContentDialogManager.getDialogZIndexDefault();

      this.update();
    } else {
      Logger.logError(
        UiFramework.loggerCategory("InternalContentDialogManager"),
        `closeDialog: Could not find dialog with id of '${id}'`
      );
    }
  }

  /** @internal */
  public static closeAll(): void {
    InternalContentDialogManager.dialogManager.closeAll();
    InternalContentDialogManager._dialogMap.clear();
    InternalContentDialogManager._idArray = [];
    InternalContentDialogManager._topZIndex =
      InternalContentDialogManager.getDialogZIndexDefault();
  }

  /** Update the dialogs */
  public static update(): void {
    InternalContentDialogManager.dialogManager.update();
  }

  /** Get the active modeless dialog */
  public static get active(): React.ReactNode | undefined {
    if (InternalContentDialogManager._idArray.length > 0) {
      const id =
        InternalContentDialogManager._idArray[
          InternalContentDialogManager._idArray.length - 1
        ];
      const dialogInfo = InternalContentDialogManager._dialogMap.get(id);
      if (dialogInfo) return dialogInfo.reactNode;
    }

    return undefined;
  }

  /** Get the count of modeless dialogs */
  public static get count(): number {
    return InternalContentDialogManager.dialogManager.dialogCount;
  }

  /** Handle a pointer down event on a modeless dialog */
  public static handlePointerDownEvent(
    _event: React.PointerEvent,
    id: string,
    updateFunc: () => void
  ): void {
    const dialogInfo = InternalContentDialogManager._dialogMap.get(id);
    if (
      dialogInfo &&
      dialogInfo.reactNode !== InternalContentDialogManager.active
    ) {
      dialogInfo.zIndex = ++InternalContentDialogManager._topZIndex;

      InternalContentDialogManager._idArray.splice(
        InternalContentDialogManager._idArray.indexOf(id),
        1
      );
      InternalContentDialogManager._idArray.push(id);

      updateFunc();
      this.update();
    }
  }

  /** Get the z-index for a modeless dialog */
  public static getZIndex(id: string): number {
    let zIndex = InternalContentDialogManager.getDialogZIndexDefault();
    const dialogInfo = InternalContentDialogManager._dialogMap.get(id);
    if (dialogInfo) zIndex = dialogInfo.zIndex;
    return zIndex;
  }

  public static getInfo(id: string): ContentDialogInfo | undefined {
    return InternalContentDialogManager._dialogMap.get(id);
  }
}
