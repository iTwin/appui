/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Dialog
 */

import * as React from "react";
import type { DialogButtonDef } from "@itwin/appui-abstract";
import { DialogButtonType, MessageSeverity } from "@itwin/appui-abstract";
import {
  MessageBoxIconType,
  MessageBoxType,
  MessageBoxValue,
} from "@itwin/core-frontend";
import type { CommonProps } from "@itwin/core-react";
import { MessageContainer } from "@itwin/core-react";
import { Button, Dialog } from "@itwin/itwinui-react";
import { DialogManagerBase } from "./DialogManagerBase.js";
import { UiFramework } from "../UiFramework.js";
import { useTranslation } from "../hooks/useTranslation.js";

/** Properties for [[StandardMessageBox]] React component
 * @public
 * @deprecated in 4.15.0. Props of deprecated {@link StandardMessageBox} component.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface StandardMessageBoxProps extends CommonProps {
  /** Indicates whether the message box is open. */
  opened: boolean;
  /** The standard icon to display in the message box. */
  iconType: MessageBoxIconType;
  /** Title to display in the message box. */
  title: string;
  /** Controls the button set displayed. */
  messageBoxType: MessageBoxType;
  /** Callback function for processing the message box result. */
  onResult?: (result: MessageBoxValue) => void;
  /** Content. */
  children?: React.ReactNode;
}

/** StandardMessageBox React component displays a standard icon, message text and a standard button set in the lower right.
 * @public
 * @deprecated in 4.15.0. Use {@link https://itwinui.bentley.com/docs/dialog iTwinUI Dialog} instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function StandardMessageBox(props: StandardMessageBoxProps) {
  const [isOpen, setIsOpen] = React.useState(props.opened);

  let severity = MessageSeverity.None;
  switch (props.iconType) {
    case MessageBoxIconType.NoSymbol:
      severity = MessageSeverity.None;
      break;
    case MessageBoxIconType.Information:
      severity = MessageSeverity.Information;
      break;
    case MessageBoxIconType.Question:
      severity = MessageSeverity.Question;
      break;
    case MessageBoxIconType.Warning:
      severity = MessageSeverity.Warning;
      break;
    case MessageBoxIconType.Critical:
      severity = MessageSeverity.Error;
      break;
    case MessageBoxIconType.Success:
      severity = MessageSeverity.Success;
      break;
  }

  const handleButton = (buttonType: MessageBoxValue) => {
    closeDialog(() => {
      if (props.onResult) props.onResult(buttonType);
    });
  };

  const handleCancel = () => {
    closeDialog(() => {
      if (props.onResult) props.onResult(MessageBoxValue.Cancel);
    });
  };

  const closeDialog = (followUp: () => void) => {
    setIsOpen(false);
    UiFramework.dialogs.modal.close();
    followUp();
  };

  return (
    <Dialog
      isOpen={isOpen}
      style={{ zIndex: DialogManagerBase.topZIndex, ...props.style }}
      className={props.className}
      onClose={handleCancel}
      closeOnEsc
      closeOnExternalClick={false}
      preventDocumentScroll
    >
      <Dialog.Backdrop />
      <Dialog.Main
        style={{ width: 512 }}
        data-testid="message-box-dialog-container"
      >
        <Dialog.TitleBar titleText={props.title} />
        <Dialog.Content>
          {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
          <MessageContainer severity={severity}>
            {props.children}
          </MessageContainer>
        </Dialog.Content>
        <Dialog.ButtonBar>
          <DialogButtons
            messageBoxType={props.messageBoxType}
            handleButton={handleButton}
          />
        </Dialog.ButtonBar>
      </Dialog.Main>
    </Dialog>
  );
}

function DialogButtons(props: {
  messageBoxType: MessageBoxType;
  handleButton: (buttonType: MessageBoxValue) => void;
}) {
  const buttonCluster: DialogButtonDef[] = new Array<DialogButtonDef>();

  switch (props.messageBoxType) {
    case MessageBoxType.Ok:
    case MessageBoxType.LargeOk:
      buttonCluster.push({
        type: DialogButtonType.OK,
        onClick: () => {
          props.handleButton(MessageBoxValue.Ok);
        },
      });
      break;
    case MessageBoxType.OkCancel:
    case MessageBoxType.MediumAlert:
      buttonCluster.push({
        type: DialogButtonType.OK,
        onClick: () => {
          props.handleButton(MessageBoxValue.Ok);
        },
      });
      buttonCluster.push({
        type: DialogButtonType.Cancel,
        onClick: () => {
          props.handleButton(MessageBoxValue.Cancel);
        },
      });
      break;
    case MessageBoxType.YesNo:
    case MessageBoxType.YesNoCancel:
      buttonCluster.push({
        type: DialogButtonType.Yes,
        onClick: () => {
          props.handleButton(MessageBoxValue.Yes);
        },
      });
      buttonCluster.push({
        type: DialogButtonType.No,
        onClick: () => {
          props.handleButton(MessageBoxValue.No);
        },
      });
      if (MessageBoxType.YesNoCancel === props.messageBoxType)
        buttonCluster.push({
          type: DialogButtonType.Cancel,
          onClick: () => {
            props.handleButton(MessageBoxValue.Cancel);
          },
        });
      break;
  }

  return buttonCluster.map((button, index) => {
    return <DialogButton button={button} key={index} />;
  });
}

function DialogButton({ button }: { button: DialogButtonDef }) {
  const { translate } = useTranslation();

  let buttonText = "";
  let usePrimaryStyleType = false;

  switch (button.type) {
    case DialogButtonType.OK:
      buttonText = translate("dialog.ok");
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.Retry:
      buttonText = translate("dialog.retry");
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.Yes:
      buttonText = translate("dialog.yes");
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.No:
      buttonText = translate("dialog.no");
      break;
    case DialogButtonType.Cancel:
      buttonText = translate("dialog.cancel");
      break;
    case DialogButtonType.Close:
      buttonText = translate("dialog.close");
      break;
    case DialogButtonType.Next:
      buttonText = translate("dialog.next");
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.Previous:
      buttonText = translate("dialog.previous");
      usePrimaryStyleType = true;
      break;
  }

  return (
    <Button
      styleType={usePrimaryStyleType ? "high-visibility" : undefined}
      onClick={button.onClick}
    >
      {buttonText}
    </Button>
  );
}
