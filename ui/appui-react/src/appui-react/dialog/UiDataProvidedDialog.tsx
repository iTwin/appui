/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Dialog
 */

import type {
  DialogButtonDef,
  DialogLayoutDataProvider,
} from "@itwin/appui-abstract";
import { DialogButtonType } from "@itwin/appui-abstract";
import * as React from "react";
import { UiFramework } from "../UiFramework";
import { getUniqueId } from "../layout/base/NineZone";
import { ComponentGenerator } from "../uiprovider/ComponentGenerator";
import { DefaultDialogGridContainer } from "../uiprovider/DefaultDialogGridContainer";
import { Button, Dialog } from "@itwin/itwinui-react";
import classnames from "classnames";
import { useTranslation } from "../hooks/useTranslation";

/** Props for [[UiDataProvidedDialog]] component.
 * @public
 * @deprecated in 4.15.0. Props of deprecated {@link UiDataProvidedDialog} component.
 */
export interface UiDataProvidedDialogProps {
  /** Dialog title */
  title: string;
  /** Provider that provides and lays out DialogItems */
  uiDataProvider: DialogLayoutDataProvider;
  /** Indicates if Dialog is Modal */
  isModal: boolean;
  /** Id used to specify dialog. */
  id?: string;
  /** Indicates whether the user can resize dialog with cursor. Default: false */
  resizable?: boolean;
  /** Indicates whether the user can move dialog with cursor. Default: false */
  movable?: boolean;
  /** Initial width of dialog. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: "50%" */
  width?: string | number;
  /** Initial height of dialog. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. */
  height?: string | number;
  /** Minimum width that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 300px */
  minWidth?: string | number;
  /** Minimum height that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 100px */
  minHeight?: string | number;
  /** Maximum width that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. */
  maxWidth?: string | number;
  /** Maximum height that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. */
  maxHeight?: string | number;
  /** Custom CSS style properties. */
  style?: React.CSSProperties;
}

/** Component to show dialog populated from properties supplied via uiDataProvider
 * @public
 * @deprecated in 4.15.0. Use {@link https://itwinui.bentley.com/docs/dialog iTwinUI Dialog} instead.
 */
export function UiDataProvidedDialog({
  uiDataProvider,
  id,
  isModal,
  title,
  movable,
  resizable,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  width,
  height,
  style,
}: // eslint-disable-next-line deprecation/deprecation
UiDataProvidedDialogProps) {
  const dialogId = React.useRef(id ? id : getUniqueId());
  const dialogIsModal = React.useRef(isModal);
  const onOK = React.useRef<() => void>();
  const onCancel = React.useRef<() => void>();
  const closeDialog = () => {
    if (dialogIsModal.current) UiFramework.dialogs.modal.close();
    else UiFramework.dialogs.modeless.close(dialogId.current);
  };

  const handleOk = React.useCallback(() => {
    onOK.current && onOK.current();
    closeDialog();
  }, []);

  const handleCancel = React.useCallback(() => {
    onCancel.current && onCancel.current();
    closeDialog();
  }, []);

  const generateButtonCluster = React.useCallback(
    (buttons: DialogButtonDef[] | undefined) => {
      if (buttons) {
        for (const button of buttons) {
          if (DialogButtonType.Cancel === button.type) {
            onCancel.current = button.onClick;
            button.onClick = handleCancel;
            continue;
          }
          if (DialogButtonType.OK === button.type) {
            onOK.current = button.onClick;
            button.onClick = handleOk;
            continue;
          }
        }
      }
      return buttons;
    },
    [handleCancel, handleOk]
  );
  const [buttonCluster, setButtonCluster] = React.useState(() =>
    generateButtonCluster(uiDataProvider.supplyButtonData())
  );

  React.useEffect(() => {
    return uiDataProvider.onItemsReloadedEvent.addListener(() => {
      setButtonCluster(
        generateButtonCluster(uiDataProvider.supplyButtonData())
      );
    });
  }, [generateButtonCluster, uiDataProvider]);

  React.useEffect(() => {
    return uiDataProvider.onButtonsReloadedEvent.addListener(() => {
      setButtonCluster(
        generateButtonCluster(uiDataProvider.supplyButtonData())
      );
    });
  }, [generateButtonCluster, uiDataProvider]);

  const handleClose = React.useCallback(() => closeDialog(), []);

  const containerStyle: React.CSSProperties = {
    minWidth,
    minHeight,
    maxWidth: maxWidth || "100%",
    maxHeight,
    width: width || "50%",
    margin: "",
    height,
  };

  return (
    <Dialog
      isOpen={true}
      onClose={handleClose}
      closeOnEsc
      closeOnExternalClick={false}
      isDraggable={movable}
      isResizable={resizable}
      preventDocumentScroll
      style={style}
    >
      {isModal && <Dialog.Backdrop />}
      <Dialog.Main
        style={containerStyle}
        data-testid="ui-data-provided-dialog-container"
      >
        <Dialog.TitleBar titleText={title} />
        <Dialog.Content>
          <DefaultDialogGridContainer
            componentGenerator={new ComponentGenerator(uiDataProvider)}
          />
        </Dialog.Content>
        <Dialog.ButtonBar>
          {buttonCluster &&
            buttonCluster.map((button, index) => (
              <DialogButton key={index} button={button} />
            ))}
        </Dialog.ButtonBar>
      </Dialog.Main>
    </Dialog>
  );
}

function DialogButton({ button }: { button: DialogButtonDef }) {
  const { translate } = useTranslation();

  let buttonText = "";
  let usePrimaryStyleType = false;
  let buttonClass = button.className;

  switch (button.type) {
    case DialogButtonType.OK:
      buttonText = translate("dialog.ok");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.Retry:
      buttonText = translate("dialog.retry");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.Yes:
      buttonText = translate("dialog.yes");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.No:
      buttonText = translate("dialog.no");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      break;
    case DialogButtonType.Cancel:
      buttonText = translate("dialog.cancel");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      break;
    case DialogButtonType.Close:
      buttonText = translate("dialog.close");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      break;
    case DialogButtonType.Next:
      buttonText = translate("dialog.next");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
    case DialogButtonType.Previous:
      buttonText = translate("dialog.previous");
      buttonClass = classnames(buttonClass, button.buttonStyle);
      usePrimaryStyleType = true;
      break;
  }

  buttonText = button.label || buttonText;

  return (
    <Button
      className={buttonClass}
      disabled={button.disabled}
      styleType={usePrimaryStyleType ? "high-visibility" : undefined}
      onClick={button.onClick}
    >
      {buttonText}
    </Button>
  );
}
