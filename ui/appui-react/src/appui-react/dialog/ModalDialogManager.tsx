/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Dialog
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { DialogRendererBase } from "./DialogManagerBase.js";
import { InternalModalDialogManager as internal } from "./InternalModalDialogManager.js";

/** ModalDialogRenderer React component renders modal dialogs
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class ModalDialogRenderer extends React.PureComponent<CommonProps> {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  constructor(props: CommonProps) {
    super(props);
  }

  public override render(): React.ReactNode {
    return (
      <DialogRendererBase
        {...this.props}
        dialogManager={internal.dialogManager}
      />
    );
  }
}
