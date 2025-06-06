/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Dialog
 */

import "./DialogManagerBase.scss";
import * as React from "react";
import type { BeUiEvent } from "@itwin/core-bentley";
import { Logger } from "@itwin/core-bentley";
import { UiEvent } from "@itwin/appui-abstract";
import { UiFramework } from "../UiFramework.js";
import type { ListenerType } from "@itwin/core-react/internal";
import { getCssVariableAsNumber } from "@itwin/core-react";
import { ThemeProvider } from "@itwin/itwinui-react";

/** Dialog Stack Changed Event Args class.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface DialogChangedEventArgs {
  dialogCount: number;
  activeDialog: React.ReactNode | undefined;
}

/** Dialog Changed Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class DialogChangedEvent extends UiEvent<DialogChangedEventArgs> {}

/** Information maintained by a Dialog Manager about a dialog
 * @public
 */
export interface DialogInfo {
  reactNode: React.ReactNode;
  id: string;
  parentDocument: Document;
}

/** Used if the 'dialog' z-index CSS variable cannot be read */
const ZINDEX_DEFAULT = 12000;

/** Dialog Manager class.
 * @internal
 */
export class DialogManagerBase {
  private static _sId = 0;
  private _dialogs: DialogInfo[] = new Array<DialogInfo>();
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _onDialogChangedEvent: BeUiEvent<DialogChangedEventArgs>;
  private static _topZIndex = ZINDEX_DEFAULT;

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  constructor(onDialogChangedEvent: BeUiEvent<DialogChangedEventArgs>) {
    this._onDialogChangedEvent = onDialogChangedEvent;
  }

  /** Initialize the modeless dialog manager */
  public static initialize(): void {
    DialogManagerBase._topZIndex = DialogManagerBase.getDialogZIndexDefault();
  }

  public static get topZIndex(): number {
    return DialogManagerBase._topZIndex;
  }

  public static set topZIndex(zIndex: number) {
    DialogManagerBase._topZIndex = zIndex;
  }
  public get dialogs() {
    return this._dialogs;
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public get onDialogChangedEvent(): BeUiEvent<DialogChangedEventArgs> {
    return this._onDialogChangedEvent;
  }

  public static getDialogZIndexDefault(): number {
    const variable = "--uicore-z-index-dialog";
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const value = getCssVariableAsNumber(variable);

    if (!isNaN(value)) return value;

    Logger.logError(
      UiFramework.loggerCategory("DialogManagerBase"),
      `'${variable}' CSS variable not found`
    );
    return ZINDEX_DEFAULT;
  }

  /**
   * Triggers opening a dialog.
   * @param dialog Dialog React component.
   * @param id The unique Id the identifies the dialog.
   * @param parentDocument Optional document required when displaying a dialog in a child popup window.
   */
  public openDialog(
    dialog: React.ReactNode,
    id?: string,
    parentDocument?: Document
  ): void {
    if (!id) id = `Dialog-${++DialogManagerBase._sId}`;

    const owningDoc = parentDocument ?? document;
    this.pushDialog({ reactNode: dialog, id, parentDocument: owningDoc });
  }

  /** @internal */
  public pushDialog(dialogInfo: DialogInfo): void {
    this._dialogs.push(dialogInfo);
    this.emitDialogChangedEvent();
  }

  public closeDialog(dialog?: React.ReactNode): void {
    let targetDialog = dialog;
    if (!dialog) targetDialog = this.activeDialog;

    this.removeDialog(targetDialog);
    this.emitDialogChangedEvent();
  }

  /** @internal */
  public closeAll(): void {
    this._dialogs = [];
    this.emitDialogChangedEvent();
  }

  /** @internal */
  public removeDialog(dialog: React.ReactNode): void {
    const index = this._dialogs.findIndex((dialogInfo: DialogInfo) => {
      return dialog === dialogInfo.reactNode;
    });
    if (index >= 0) this._dialogs.splice(index, 1);
    if (this._dialogs.length < 1)
      DialogManagerBase.topZIndex = DialogManagerBase.getDialogZIndexDefault();
  }

  public emitDialogChangedEvent(): void {
    this._onDialogChangedEvent.emit({
      dialogCount: this.dialogCount,
      activeDialog: this.activeDialog,
    });
  }

  public update(): void {
    this.emitDialogChangedEvent();
  }

  public get activeDialog(): React.ReactNode | undefined {
    if (this._dialogs.length > 0)
      return this._dialogs[this._dialogs.length - 1].reactNode;

    return undefined;
  }

  public get dialogCount(): number {
    return this._dialogs.length;
  }
}

/** Properties for the [[DialogRendererBase]] component
 * @internal
 */
export interface DialogRendererProps {
  dialogManager: DialogManagerBase;
  style?: React.CSSProperties;
}

interface DialogRendererState {
  parentDocument: Document | undefined;
  renderer: HTMLElement | undefined;
}
/** DialogRenderer React component.
 * @internal
 */
export class DialogRendererBase extends React.PureComponent<
  DialogRendererProps,
  DialogRendererState
> {
  public override readonly state: DialogRendererState = {
    parentDocument: undefined,
    renderer: undefined,
  };

  private _handleRefSet = (el: HTMLElement | null) => {
    this.setState({
      parentDocument: el?.ownerDocument ?? undefined,
      renderer: el ?? undefined,
    });
  };

  public override render(): React.ReactNode {
    if (this.props.dialogManager.dialogCount <= 0) return null;

    return (
      <div
        className="uifw-dialog-dialogManagerBase_renderer"
        ref={this._handleRefSet}
      >
        <ThemeProvider portalContainer={this.state.renderer}>
          {this.state.parentDocument &&
            this.props.dialogManager.dialogs
              .filter(
                (info) => info.parentDocument === this.state.parentDocument
              )
              .map((info) => {
                return (
                  <React.Fragment key={info.id}>
                    {info.reactNode}
                  </React.Fragment>
                );
              })}
        </ThemeProvider>
      </div>
    );
  }

  public override componentDidMount(): void {
    this.props.dialogManager.onDialogChangedEvent.addListener(
      this._handleDialogChangedEvent
    );
  }

  public override componentWillUnmount(): void {
    this.props.dialogManager.onDialogChangedEvent.removeListener(
      this._handleDialogChangedEvent
    );
  }

  private _handleDialogChangedEvent: ListenerType<
    DialogManagerBase["onDialogChangedEvent"]
  > = () => {
    this.forceUpdate();
  };
}
