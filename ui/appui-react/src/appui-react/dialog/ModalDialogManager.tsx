/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Dialog
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { DialogRendererBase } from "./DialogManagerBase";
import { InternalModalDialogManager as internal } from "./InternalModalDialogManager";

/** ModalDialogRenderer React component renders modal dialogs
 * @public
 */
export class ModalDialogRenderer extends React.PureComponent<CommonProps> {

  constructor(props: CommonProps) {
    super(props);
  }

  public override render(): React.ReactNode {
    return (
      <DialogRendererBase {...this.props} dialogManager={internal.dialogManager} />
    );
  }
}
