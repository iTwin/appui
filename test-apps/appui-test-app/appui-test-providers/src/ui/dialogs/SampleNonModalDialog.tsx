/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  IModelApp,
  MessageBoxIconType,
  MessageBoxType,
} from "@itwin/core-frontend";
import { UiFramework } from "@itwin/appui-react";
import { Button, ComboBox, Dialog } from "@itwin/itwinui-react";
import "./SampleNonModalDialog.scss";

export interface SampleNonModalDialogProps {
  dialogId: string;
  onClose?: () => void;
}

export function SampleNonModalDialog(props: SampleNonModalDialogProps) {
  const [isOpen, setIsOpen] = React.useState(true);
  const onShowMessageBox = async () => {
    await IModelApp.notifications.openMessageBox(
      MessageBoxType.LargeOk,
      "I should be displayed over the Sample non-modal dialog.",
      MessageBoxIconType.Warning
    );
  };

  const closeDialog = () => {
    setIsOpen(false);
    props.onClose && props.onClose();
    UiFramework.dialogs.modeless.close(props.dialogId);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={closeDialog}
      closeOnEsc
      isDraggable
      preventDocumentScroll={true}
    >
      <Dialog.Main style={{ width: 450, height: 250 }}>
        <Dialog.TitleBar titleText={"Sample non-modal dialog"} />
        <Dialog.Content>
          <div className="sample-options">
            <div>To demonstrate message box behavior in non-modal dialog</div>
            <ComboBox
              inputProps={{
                placeholder: "Select units",
              }}
              options={[
                {
                  disabled: false,
                  label: "mm",
                  sublabel: "Millimeter",
                  value: "MM",
                },
                {
                  disabled: false,
                  label: "cm",
                  sublabel: "Centimeter",
                  value: "CM",
                },
              ]}
            />
          </div>
        </Dialog.Content>
        <Dialog.ButtonBar>
          <Button styleType="cta" onClick={onShowMessageBox}>
            Show Message box
          </Button>
          <Button styleType="cta" onClick={closeDialog}>
            Close
          </Button>
        </Dialog.ButtonBar>
      </Dialog.Main>
    </Dialog>
  );
}
