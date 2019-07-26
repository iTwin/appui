/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Notification */

import {
  ActivityMessageDetails,
  ActivityMessageEndReason,
  MessageBoxIconType,
  MessageBoxType,
  MessageBoxValue,
  NotificationManager,
  NotifyMessageDetails,
  ToolTipOptions,
  OutputMessageType,
  ToolAssistanceInstructions,
  ToolAssistance,
  RelativePosition,
} from "@bentley/imodeljs-frontend";

import { XAndY } from "@bentley/geometry-core";

import { MessageManager } from "./MessageManager";
import { UiFramework } from "../UiFramework";
import { ElementTooltip } from "../feedback/ElementTooltip";
import { PointerMessage } from "./Pointer";

/**
 * The AppNotificationManager class is a subclass of NotificationManager in @bentley/imodeljs-frontend.
 * This implementation uses the iModel.js UI library to display alerts, messages, prompts and tooltips.
 * @public
 */
export class AppNotificationManager extends NotificationManager {

  /** Output a prompt, given an i18n key.
   */
  public outputPromptByKey(key: string): void {
    this.outputPrompt(UiFramework.i18n.translate(key));
  }

  /** Output a prompt to the user. A 'prompt' indicates an action the user should take to proceed.
   */
  public outputPrompt(prompt: string): void {
    MessageManager.outputPrompt(prompt);

    const mainInstruction = ToolAssistance.createInstruction("", prompt);
    const instructions = ToolAssistance.createInstructions(mainInstruction);
    MessageManager.setToolAssistance(instructions);
  }

  /** Output a message and/or alert to the user. */
  public outputMessage(message: NotifyMessageDetails): void {
    if (message.msgType === OutputMessageType.Pointer) {
      PointerMessage.showMessage(message);
    } else if (message.msgType === OutputMessageType.InputField && message.inputField) {
      MessageManager.displayInputFieldMessage(message.inputField, message.briefMessage, message.detailedMessage, message.priority);
    }
    MessageManager.addMessage(message);
  }

  /** Output a MessageBox and wait for response from the user.
   * @param mbType       The MessageBox type.
   * @param message      The message to display.
   * @param icon         The MessageBox icon type.
   * @return the response from the user.
   */
  public async openMessageBox(mbType: MessageBoxType, message: HTMLElement | string, icon: MessageBoxIconType): Promise<MessageBoxValue> {
    return MessageManager.openMessageBox(mbType, message, icon);
  }

  /**
   * Set up for activity messages.
   * @param details  The activity message details.
   * @return true if the message was displayed, false if an invalid priority is specified.
   */
  public setupActivityMessage(details: ActivityMessageDetails): boolean {
    return MessageManager.setupActivityMessageDetails(details);
  }

  /**
   * Output an activity message to the user.
   * @param messageText      The message text.
   * @param percentComplete  The percentage of completion.
   * @return true if the message was displayed, false if the message could not be displayed.
   */
  public outputActivityMessage(messageText: HTMLElement | string, percentComplete: number): boolean {
    return MessageManager.setupActivityMessageValues(messageText, percentComplete);
  }

  /**
   * End an activity message.
   * @param reason       Reason for the end of the Activity Message.
   * @return true if the message was ended successfully, false if the activityMessage could not be ended.
   */
  public endActivityMessage(reason: ActivityMessageEndReason): boolean {
    let result = false;

    switch (reason) {
      case ActivityMessageEndReason.Completed:
        result = MessageManager.endActivityMessage(true);
        break;
      case ActivityMessageEndReason.Cancelled:
        result = MessageManager.endActivityMessage(false);
        break;
    }

    return result;
  }
  /** Update message position created with [[OutputMessageType.Pointer]].
   * @param displayPoint        Point at which to display the Pointer type message.
   * @param relativePosition    Position relative to displayPoint at which to display the Pointer type message.
   */
  public updatePointerMessage(displayPoint: XAndY, relativePosition: RelativePosition): void {
    PointerMessage.updateMessage(displayPoint, relativePosition);
  }

  /** Hides the Pointer message. */
  public closePointerMessage(): void {
    PointerMessage.hideMessage();
  }

  /** Return true if _showTooltip has an implementation and will display a tooltip. */
  public get isToolTipSupported(): boolean { return true; }

  /** Return true if the tooltip is currently open. */
  public get isToolTipOpen(): boolean { return ElementTooltip.isTooltipVisible; }

  /** Clear the ToolTip if it is currently open. If not open, does nothing. */
  public clearToolTip(): void {
    // istanbul ignore else
    if (this.isToolTipOpen)
      ElementTooltip.hideTooltip();
  }

  /** Show a ToolTip window.
   * @param el       The HTMLElement that anchors the toolTip.
   * @param message  The message to display inside the ToolTip
   * @param pt       An optional location, relative to the origin of el, for the ToolTip. If undefined, center of el.
   * @param options  Options that supply additional information about how the ToolTip should function.
   */
  protected _showToolTip(el: HTMLElement, message: HTMLElement | string, pt?: XAndY, options?: ToolTipOptions): void {
    ElementTooltip.showTooltip(el, message, pt, options);
  }

  /** Hide a InputField message. */
  public closeInputFieldMessage(): void {
    MessageManager.hideInputFieldMessage();
  }

  /** Setup tool assistance instructions for a tool. The instructions include the main instruction, which includes the current prompt.
   * @param instructions The tool assistance instructions.
   * @alpha
   */
  public setToolAssistance(instructions: ToolAssistanceInstructions | undefined) {
    MessageManager.outputPrompt(instructions ? instructions.mainInstruction.text : "");
    MessageManager.setToolAssistance(instructions);
  }

}
