/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import classnames from "classnames";
import isEqual from "lodash/isEqual.js";
import * as React from "react";
import type { XAndY } from "@itwin/core-geometry";
import type {
  MessageBoxValue,
  ToolAssistanceInstructions,
  ToolTipOptions,
} from "@itwin/core-frontend";
import {
  ActivityMessageDetails,
  IModelApp,
  MessageBoxIconType,
  MessageBoxType,
  OutputMessageAlert,
  OutputMessagePriority,
  OutputMessageType,
} from "@itwin/core-frontend";
import { MessageSeverity, UiEvent } from "@itwin/appui-abstract";
import type { IconSpec } from "@itwin/core-react";
import { MessageContainer, MessageRenderer } from "@itwin/core-react";
import { StandardMessageBox } from "../dialog/StandardMessageBox.js";
import { ElementTooltip } from "../feedback/ElementTooltip.js";
import { UiFramework } from "../UiFramework.js";
import { PointerMessage } from "./Pointer.js";
import type {
  NotifyMessageDetailsType,
  NotifyMessageType,
} from "./ReactNotifyMessageDetails.js";
import { StatusMessageManager } from "./StatusMessageManager.js";
import {
  SvgInfo,
  SvgStatusError,
  SvgStatusSuccess,
  SvgStatusWarning,
} from "@itwin/itwinui-icons-react";
import { Text, type useToaster } from "@itwin/itwinui-react";
import { BeUiEvent } from "@itwin/core-bentley";
import { ConfigurableUiActionId } from "../redux/ConfigurableUiState.js";
import { useTranslation } from "../hooks/useTranslation.js";

type Toaster = ReturnType<typeof useToaster>;
type ToasterSettings = Parameters<Toaster["setSettings"]>;
type ToastOptions = Parameters<Toaster["positive"]>[1];

class MessageBoxCallbacks {
  constructor(
    public readonly onFulfilled: (result: MessageBoxValue) => void,
    public readonly onRejected: (result: any) => void
  ) {}

  public handleMessageBoxResult = (result: MessageBoxValue) => {
    this.onFulfilled(result);
  };
}

/** [[MessageAddedEvent]] arguments.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface MessageAddedEventArgs {
  /** Message details for the message added */
  message: NotifyMessageDetailsType;
}

/** Activity Message Event arguments.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface ActivityMessageEventArgs {
  /** Current message for the activity */
  message: NotifyMessageType;
  /** Current percentage for the activity */
  percentage: number;
  /** Message details set by calling NotificationManager.setupActivityMessage */
  details?: ActivityMessageDetails;
  /** Indicates whether the activity message popup is being restored */
  restored?: boolean;
}

/** Input Field Message Event arguments.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface InputFieldMessageEventArgs {
  /** Target HTML element for the Input Field message */
  target: Element;
  /** Message to be displayed near the input field */
  messageText: NotifyMessageType;
  /** Detailed message to be displayed near the input field */
  detailedMessage: NotifyMessageType;
  /** Priority of the input field message */
  priority: OutputMessagePriority;
}

/** Tool Assistance Changed event arguments.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface ToolAssistanceChangedEventArgs {
  /** Tool Assistance instructions for the active tool */
  instructions: ToolAssistanceInstructions | undefined;
}

/** Message Added Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line deprecation/deprecation
export class MessageAddedEvent extends UiEvent<MessageAddedEventArgs> {}

/** Messages Updated Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line deprecation/deprecation
export class MessagesUpdatedEvent extends UiEvent<{}> {}

/** Activity Message Added Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line deprecation/deprecation
export class ActivityMessageUpdatedEvent extends UiEvent<ActivityMessageEventArgs> {}

/** Activity Message Cancelled Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line deprecation/deprecation
export class ActivityMessageCancelledEvent extends UiEvent<{}> {}

/** Input Field Message Added Event class
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line deprecation/deprecation
export class InputFieldMessageAddedEvent extends UiEvent<InputFieldMessageEventArgs> {}

/** Input Field Message Removed Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line deprecation/deprecation
export class InputFieldMessageRemovedEvent extends UiEvent<{}> {}

/** Open Message Center Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line deprecation/deprecation
export class OpenMessageCenterEvent extends UiEvent<{}> {}

/** Tool Assistance Changed event class
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line deprecation/deprecation
export class ToolAssistanceChangedEvent extends UiEvent<ToolAssistanceChangedEventArgs> {}

/**
 * Keeps track of the current activity message, and updates whenever
 * setupActivityMessageDetails() or setupActivityMessageValues()
 * is called.
 * Used to display tracked progress in ActivityMessage.
 */
class OngoingActivityMessage {
  public message: NotifyMessageType = "";
  public percentage: number = 0;
  public details: ActivityMessageDetails = new ActivityMessageDetails(
    true,
    true,
    true
  );
  public isRestored: boolean = false;
}

/** The MessageManager class manages messages and prompts. It is used by the [[AppNotificationManager]] class.
 * @public
 */
export class MessageManager {
  private static _maxCachedMessages = 500;
  private static _maxDisplayedStickyMessages = 3;
  private static _messages: NotifyMessageDetailsType[] = [];
  private static _ongoingActivityMessage: OngoingActivityMessage =
    new OngoingActivityMessage();
  private static _lastMessage?: NotifyMessageDetailsType;
  private static _activeMessageManager = new StatusMessageManager();
  private static _animateOutToElement: HTMLElement[] = [];
  private static _toastCloseCallbacks: {
    close: () => void;
    id: string;
  }[] = [];

  /** The MessageAddedEvent is fired when a message is added via outputMessage(). */
  // eslint-disable-next-line deprecation/deprecation
  public static readonly onMessageAddedEvent = new MessageAddedEvent();

  /** The MessagesUpdatedEvent is fired when a message is added or the messages are cleared. */
  // eslint-disable-next-line deprecation/deprecation
  public static readonly onMessagesUpdatedEvent = new MessagesUpdatedEvent();

  /** The ActivityMessageUpdatedEvent is fired when an Activity message updates via outputActivityMessage(). */
  public static readonly onActivityMessageUpdatedEvent =
    new ActivityMessageUpdatedEvent(); // eslint-disable-line deprecation/deprecation

  /** The ActivityMessageCancelledEvent is fired when an Activity message is cancelled via
   * endActivityMessage(ActivityMessageEndReason.Cancelled) or
   * by the user clicking the 'Cancel' link.
   */
  public static readonly onActivityMessageCancelledEvent =
    new ActivityMessageCancelledEvent(); // eslint-disable-line deprecation/deprecation

  public static readonly onInputFieldMessageAddedEvent =
    new InputFieldMessageAddedEvent(); // eslint-disable-line deprecation/deprecation
  public static readonly onInputFieldMessageRemovedEvent =
    new InputFieldMessageRemovedEvent(); // eslint-disable-line deprecation/deprecation

  public static readonly onOpenMessageCenterEvent =
    new OpenMessageCenterEvent(); // eslint-disable-line deprecation/deprecation

  /** @internal */
  public static readonly onDisplayMessage: BeUiEvent<{
    message: NotifyMessageDetailsType;
    options?: ToastOptions;
    settings?: ToasterSettings;
    animateOutToElement?: HTMLElement;
    // This is set by toast renderer to expose close function.
    close?: () => void;
  }> = new BeUiEvent();

  /** The ToolAssistanceChangedEvent is fired when a tool calls IModelApp.notifications.setToolAssistance().
   * @public
   */
  public static readonly onToolAssistanceChangedEvent =
    new ToolAssistanceChangedEvent(); // eslint-disable-line deprecation/deprecation

  /** List of messages as NotifyMessageDetailsType. */
  public static get messages(): Readonly<NotifyMessageDetailsType[]> {
    return this._messages;
  }

  /** Manager of active messages. */
  public static get activeMessageManager(): StatusMessageManager {
    return this._activeMessageManager;
  }

  /** Clear the message list. */
  public static clearMessages(): void {
    this._messages.splice(0);
    this._activeMessageManager.initialize();

    this._toastCloseCallbacks.forEach(({ close }) => close());
    this._toastCloseCallbacks.splice(0);

    this.onMessagesUpdatedEvent.emit({});
    this._lastMessage = undefined;
  }

  /** Update the message list. */
  public static updateMessages(): void {
    this.onMessagesUpdatedEvent.emit({});
  }

  /** Set the maximum number of cached message. */
  public static setMaxCachedMessages(max: number): void {
    this._maxCachedMessages = max;
    this.checkMaxCachedMessages();
  }

  /** The maximum number of displayed Sticky messages. */
  public static get maxDisplayedStickyMessages(): number {
    return this._maxDisplayedStickyMessages;
  }
  public static set maxDisplayedStickyMessages(max: number) {
    this._maxDisplayedStickyMessages = max;
  }

  /** Output a message and/or alert to the user.
   * @param  message  Details about the message to output.
   */
  public static outputMessage(message: NotifyMessageDetailsType): void {
    if (message.msgType === OutputMessageType.Pointer) {
      PointerMessage.showMessage(message);
    } else if (message.msgType === OutputMessageType.InputField) {
      if (message.inputField)
        MessageManager.displayInputFieldMessage(
          message.inputField,
          message.briefMessage,
          message.detailedMessage,
          message.priority
        );
      else message.msgType = OutputMessageType.Sticky; // Note: Changing the message.msgType here for InputField without inputField
    } else if (message.msgType === OutputMessageType.Alert) {
      if (message.openAlert === OutputMessageAlert.Balloon)
        message.msgType = OutputMessageType.Sticky;
      // Note: Changing the message.msgType here for Balloon
      else MessageManager.showAlertMessageBox(message);
    }

    MessageManager.addMessage(message);
  }

  /** Set the element where messages should be animated out to on exit.
   * @param  element `HTMLElement` to animate out to.
   */
  public static registerAnimateOutToElement(element: HTMLElement | null) {
    this._animateOutToElement = !element
      ? []
      : [element, ...this._animateOutToElement];
  }

  /** Handles disconnected element modal frontstages, revert to last still displayed. */
  private static get animateOutToElement(): HTMLElement | undefined {
    if (this._animateOutToElement.length === 0) {
      return undefined;
    }
    if (this._animateOutToElement[0]?.isConnected) {
      return this._animateOutToElement[0];
    }
    this._animateOutToElement.splice(0, 1);
    return this.animateOutToElement;
  }

  /** Display a message.
   * Works only with `Sticky` and `Toast` message types.
   * @param  message  Details about the message to display.
   * @param options Optionally override individual toast parameters.
   * @param settings Optionally override all toasts settings (i.e. placement or order).
   * @returns Object with reference to the message (i.e. to close it programmatically) if it was displayed.
   */
  public static displayMessage(
    message: NotifyMessageDetailsType,
    options?: ToastOptions,
    settings?: ToasterSettings
  ) {
    if (
      message.msgType !== OutputMessageType.Sticky &&
      message.msgType !== OutputMessageType.Toast
    ) {
      return undefined;
    }

    const args: Parameters<
      (typeof MessageManager.onDisplayMessage)["emit"]
    >[0] = {
      message,
      options,
      settings,
      animateOutToElement: this.animateOutToElement,
    };
    this.onDisplayMessage.emit(args);
    return {
      close: () => {
        args.close?.();
      },
    };
  }

  /** Output a message and/or alert to the user.
   * @param message Details about the message to output.
   */
  public static addMessage(message: NotifyMessageDetailsType): void {
    const activeMessage = this.activeMessageManager.messages.find((m) =>
      isEqual(message, m.messageDetails)
    );
    if (activeMessage) return;

    this.activeMessageManager.add(message);
    this.refreshToastMessages();
    this.onMessageAddedEvent.emit({ message });

    if (!isEqual(message, this._lastMessage)) {
      // Add message to message center if it is not the same as the last message.
      this.addToMessageCenter(message);
      this._lastMessage = message;
    }
  }

  /**
   * Closes sticky messages that are beyond the limit,
   * opens new toast and sticky messages from the active message manager.
   */
  private static refreshToastMessages() {
    this._toastCloseCallbacks = this._toastCloseCallbacks.filter((t) => {
      if (
        MessageManager.activeMessageManager.messages.some(
          (msg) => t.id === msg.id
        )
      ) {
        return true;
      }
      t.close();
      return false;
    });

    const messagesToAdd = MessageManager.activeMessageManager.messages.filter(
      (msg) => !this._toastCloseCallbacks.find((m) => m.id === msg.id)
    );
    messagesToAdd.forEach((msg) => {
      const displayedMessage = MessageManager.displayMessage(
        msg.messageDetails,
        {
          onRemove: () => {
            MessageManager.activeMessageManager.remove(msg.id);
          },
        }
      );
      if (!!displayedMessage)
        this._toastCloseCallbacks.push({
          close: displayedMessage.close,
          id: msg.id,
        });
    });
  }

  /** Add a message to the Message Center.
   * @param  message  Details about the message to output.
   */
  public static addToMessageCenter(message: NotifyMessageDetailsType): void {
    this._messages.push(message);
    this.onMessagesUpdatedEvent.emit({});
    this.checkMaxCachedMessages();
  }

  /** Checks number of messages against the maximum. */
  private static checkMaxCachedMessages(): void {
    if (this._messages.length > this._maxCachedMessages) {
      const numToErase = this._maxCachedMessages / 4;
      this._messages.splice(0, numToErase);
      this.onMessagesUpdatedEvent.emit({});
    }
  }

  /**
   * Sets details for setting up an Activity message.
   * @param details    Details for setup of ActivityMessage
   * @returns true if details is valid and can be used to display ActivityMessage
   */
  public static setupActivityMessageDetails(
    details: ActivityMessageDetails
  ): boolean {
    this._ongoingActivityMessage.details = details;
    this._ongoingActivityMessage.isRestored = details.showDialogInitially;
    return true;
  }

  /**
   * Output an activity message to the user.
   * @param message         The message text.
   * @param percentComplete The percentage of completion.
   * @return true if the message was displayed, false if the message could not be displayed.
   */
  public static outputActivityMessage(
    message: NotifyMessageType,
    percentComplete: number
  ): boolean {
    return MessageManager.setupActivityMessageValues(message, percentComplete);
  }

  /**
   * Sets values on _OngoingActivityMessage to be referenced when displaying
   * an ActivityMessage.
   * @param message     Message of the process that ActivityMessage is tracking
   * @param percentage  Progress made by activity in percentage
   * @param restored    True if original ActivityMessage has been closed and
   *                    is now being restored from the status bar.
   * @returns true if details is valid and can be used to display ActivityMessage
   */
  public static setupActivityMessageValues(
    message: NotifyMessageType,
    percentage: number,
    restored?: boolean
  ): boolean {
    this._ongoingActivityMessage.message = message;
    this._ongoingActivityMessage.percentage = percentage;

    this.onActivityMessageUpdatedEvent.emit({
      message,
      percentage,
      details: this._ongoingActivityMessage.details,
      restored:
        restored !== undefined
          ? restored
          : this._ongoingActivityMessage.isRestored,
    });

    this._ongoingActivityMessage.isRestored = false;

    return true;
  }

  /**
   * Dismisses current ActivityMessage and ends activity if canceled.
   * @param isCompleted   True if the activity was completed, false if it was canceled
   * @returns True if both ActivityMessage and activity process are ended.
   */
  public static endActivityMessage(isCompleted: boolean): boolean {
    this.endActivityProcessing(isCompleted);
    this.onActivityMessageCancelledEvent.emit({});
    return true;
  }

  /**
   * Ends processing for activity according to message definition.
   * @param isCompleted   True if the activity was completed, false if it was canceled
   */
  private static endActivityProcessing(isCompleted: boolean): void {
    if (isCompleted) this._ongoingActivityMessage.details.onActivityCompleted();
    else this._ongoingActivityMessage.details.onActivityCancelled();
  }

  /**
   * Displays an input field message near target element.
   * @param target  The currently focused or recently focused element to place the
   *                input field message near.
   * @param messageText  Text to display in the message.
   * @param detailedMessage   Optional detailed message text to display.
   * @param priority   Optional message priority which controls icon to display.
   */
  public static displayInputFieldMessage(
    target: HTMLElement,
    messageText: NotifyMessageType,
    detailedMessage: NotifyMessageType = "",
    priority = OutputMessagePriority.Error
  ) {
    this.onInputFieldMessageAddedEvent.emit({
      target,
      messageText,
      detailedMessage,
      priority,
    });
  }

  /**
   * Hides the currently displayed input field message.
   */
  public static hideInputFieldMessage() {
    this.onInputFieldMessageRemovedEvent.emit({});
  }

  /**
   * Opens message center.
   */
  public static openMessageCenter() {
    this.onOpenMessageCenterEvent.emit({});
  }

  /** Output a prompt to the user. A 'prompt' indicates an action the user should take to proceed. */
  public static outputPrompt(prompt: string): void {
    // eslint-disable-next-line deprecation/deprecation
    if (UiFramework.frameworkState) {
      // eslint-disable-next-line deprecation/deprecation
      UiFramework.dispatchActionToStore(
        // eslint-disable-next-line deprecation/deprecation
        ConfigurableUiActionId.SetToolPrompt,
        prompt,
        true
      );
      return;
    }
  }

  /** Extracts the message severity from the message details and returns the corresponding React icon.
   * @param details NotifyMessageDetailsType
   * @returns IconSpec
   * @deprecated in 4.16.0. Use {@link https://itwinui.bentley.com/ iTwinUI icons} instead.
   */
  public static getIconSpecFromDetails(
    details: NotifyMessageDetailsType
    // eslint-disable-next-line deprecation/deprecation
  ): IconSpec {
    const severity = MessageManager.getSeverity(details);
    // eslint-disable-next-line deprecation/deprecation
    let iconSpec: IconSpec = <SvgStatusSuccess />;
    switch (severity) {
      case MessageSeverity.Error:
      case MessageSeverity.Fatal:
        iconSpec = <SvgStatusError />;
        break;
      case MessageSeverity.Warning:
        iconSpec = <SvgStatusWarning />;
        break;
      case MessageSeverity.Information:
        iconSpec = <SvgInfo />;
        break;
    }
    return iconSpec;
  }
  /** Gets an icon CSS class name based on a given NotifyMessageDetailsType.
   * @public
   * @deprecated in 4.16.0. Used internally.
   */
  public static getIconClassName(details: NotifyMessageDetailsType): string {
    const severity = MessageManager.getSeverity(details);
    // eslint-disable-next-line deprecation/deprecation
    const className = MessageContainer.getIconClassName(severity);
    const iconClassName = classnames("icon", "notifymessage-icon", className);

    return iconClassName;
  }

  /** Gets a MessageSeverity based on a given NotifyMessageDetailsType. */
  public static getSeverity(
    details: NotifyMessageDetailsType
  ): MessageSeverity {
    let severity = MessageSeverity.None;

    switch (details.priority) {
      case OutputMessagePriority.None:
        severity = MessageSeverity.Success;
        break;
      case OutputMessagePriority.Success:
        severity = MessageSeverity.Success;
        break;
      case OutputMessagePriority.Info:
        severity = MessageSeverity.Information;
        break;
      case OutputMessagePriority.Warning:
        severity = MessageSeverity.Warning;
        break;
      case OutputMessagePriority.Error:
        severity = MessageSeverity.Error;
        break;
      case OutputMessagePriority.Fatal:
        severity = MessageSeverity.Fatal;
        break;
    }

    return severity;
  }

  /** Gets a MessageBoxIconType based on a given NotifyMessageDetailsType. */
  public static getIconType(
    details: NotifyMessageDetailsType
  ): MessageBoxIconType {
    let iconType = MessageBoxIconType.NoSymbol;

    switch (details.priority) {
      case OutputMessagePriority.None:
        iconType = MessageBoxIconType.NoSymbol;
        break;
      case OutputMessagePriority.Success:
        iconType = MessageBoxIconType.Success;
        break;
      case OutputMessagePriority.Info:
        iconType = MessageBoxIconType.Information;
        break;
      case OutputMessagePriority.Warning:
        iconType = MessageBoxIconType.Warning;
        break;
      case OutputMessagePriority.Error:
        iconType = MessageBoxIconType.Critical;
        break;
      case OutputMessagePriority.Fatal:
        iconType = MessageBoxIconType.Critical;
        break;
    }

    return iconType;
  }

  /** Output a MessageBox and wait for response from the user.
   * @param mbType       The MessageBox type.
   * @param message      The message to display.
   * @param icon         The MessageBox icon type.
   * @return the response from the user.
   */
  public static async openMessageBox(
    mbType: MessageBoxType,
    message: NotifyMessageType,
    icon: MessageBoxIconType
  ): Promise<MessageBoxValue> {
    return new Promise(
      (
        onFulfilled: (result: MessageBoxValue) => void,
        onRejected: (reason: any) => void
      ) => {
        const messageBoxCallbacks = new MessageBoxCallbacks(
          onFulfilled,
          onRejected
        );
        // eslint-disable-next-line deprecation/deprecation
        const messageElement = <MessageRenderer message={message} useSpan />;
        UiFramework.dialogs.modal.open(
          // eslint-disable-next-line deprecation/deprecation
          <StandardMessageBox
            opened={true}
            messageBoxType={mbType}
            iconType={icon}
            title={UiFramework.translate("general.alert")}
            onResult={messageBoxCallbacks.handleMessageBoxResult}
          >
            {messageElement}
          </StandardMessageBox>
        );
      }
    );
  }

  /** @internal */
  public static showAlertMessageBox(
    messageDetails: NotifyMessageDetailsType
  ): void {
    UiFramework.dialogs.modal.open(
      <AlertDialog messageDetails={messageDetails} />
    );
  }

  /** Setup tool assistance instructions for a tool. The instructions include the main instruction, which includes the current prompt.
   * @param instructions The tool assistance instructions.
   * @public
   */
  public static setToolAssistance(
    instructions: ToolAssistanceInstructions | undefined
  ) {
    MessageManager.onToolAssistanceChangedEvent.emit({ instructions });
  }

  /** Show a tooltip window. Saves tooltip location for AccuSnap to test if cursor has moved far enough away to close tooltip.
   * @param htmlElement The HTMLElement that anchors the tooltip.
   * @param message     What to display inside the tooltip.
   * @param location    An optional location, relative to the origin of htmlElement, for the tooltip. If undefined, center of `htmlElement`.
   * @param options     Options that supply additional information about how the tooltip should function.
   */
  public static openToolTip(
    htmlElement: HTMLElement,
    message: NotifyMessageType,
    location?: XAndY,
    options?: ToolTipOptions
  ): void {
    IModelApp.notifications.toolTipLocation.setFrom(location);
    ElementTooltip.showTooltip(htmlElement, message, location, options);
  }

  /** @internal */
  public static closeAllMessages(): void {
    ElementTooltip.hideTooltip();
    PointerMessage.hideMessage();
    MessageManager.clearMessages();
    MessageManager.hideInputFieldMessage();
    MessageManager.endActivityMessage(false);
  }
}

interface AlertDialogProps {
  messageDetails: NotifyMessageDetailsType;
}

function AlertDialog({ messageDetails }: AlertDialogProps) {
  const { briefMessage, detailedMessage, priority } = messageDetails;
  const iconType = MessageManager.getIconType(messageDetails);
  const content = (
    <>
      <Text variant="leading">
        {/* eslint-disable-next-line deprecation/deprecation */}
        <MessageRenderer message={briefMessage} useSpan />
      </Text>
      {detailedMessage && (
        <p>
          <Text variant="body">
            {/* eslint-disable-next-line deprecation/deprecation */}
            <MessageRenderer message={detailedMessage} useSpan />
          </Text>
        </p>
      )}
    </>
  );

  const { translate } = useTranslation();
  const title = React.useMemo(() => {
    switch (priority) {
      case OutputMessagePriority.Error:
      case OutputMessagePriority.Fatal:
        return translate("general.error");
      case OutputMessagePriority.Warning:
        return translate("general.warning");
      case OutputMessagePriority.Info:
        return translate("general.information");
      case OutputMessagePriority.Success:
        return translate("general.success");
    }
    return translate("general.alert");
  }, [priority, translate]);
  return (
    // eslint-disable-next-line deprecation/deprecation
    <StandardMessageBox
      opened={true}
      messageBoxType={MessageBoxType.Ok}
      iconType={iconType}
      title={title}
    >
      {content}
    </StandardMessageBox>
  );
}
