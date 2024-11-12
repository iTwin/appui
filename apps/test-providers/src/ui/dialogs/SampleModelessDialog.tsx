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
import { ModelessDialog, UiFramework } from "@itwin/appui-react";
import { Button, ComboBox } from "@itwin/itwinui-react";
import "./SampleModelessDialog.scss";

export interface SampleModelessDialogProps {
  opened: boolean;
  dialogId: string;
  onClose?: () => void;
}

export interface SampleModelessDialogState {
  opened: boolean;
}

export class SampleModelessDialog extends React.Component<
  SampleModelessDialogProps,
  SampleModelessDialogState
> {
  public override readonly state: Readonly<SampleModelessDialogState>;
  private _title = "Sample Dialog";

  constructor(props: SampleModelessDialogProps) {
    super(props);
    this.state = {
      opened: this.props.opened,
    };
  }

  public override render(): React.ReactElement {
    return (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      <ModelessDialog
        title={this._title}
        opened={this.state.opened}
        dialogId={this.props.dialogId}
        width={450}
        height={250}
        onClose={this._closeDialog}
        onEscape={this._closeDialog}
        movable={true}
      >
        <div className="sample-options">
          <div>To demonstrate messagebox behavior in modeless dialog</div>
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

          <div className="sample-grid">
            <Button styleType="cta" onClick={this._onShowMessageBox}>
              Show Message box
            </Button>
            <Button styleType="cta" onClick={this._closeDialog}>
              Close
            </Button>
          </div>
        </div>
      </ModelessDialog>
    );
  }

  private _onShowMessageBox = async () => {
    await IModelApp.notifications.openMessageBox(
      MessageBoxType.LargeOk,
      "I should be displayed over the Sample Modeless dialog.",
      MessageBoxIconType.Warning
    );
  };

  private _closeDialog = () => {
    this.setState(
      { opened: false },
      () => this.props.onClose && this.props.onClose()
    );
    UiFramework.dialogs.modeless.close(this.props.dialogId);
  };
}
