/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Dialog
 */

import { CommonProps } from "@itwin/core-react";
import * as React from "react";
import { DialogRendererBase } from "./DialogManagerBase";
import { InternalContentDialogManager as internal } from "./InternalContentDialogManager";

/** ContentDialogRenderer React component renders modeless dialogs.
 * @public
 */
export class ContentDialogRenderer extends React.PureComponent<CommonProps> {

  constructor(props: CommonProps) {
    super(props);
  }

  public override render(): React.ReactNode {
    return (
      <DialogRendererBase {...this.props} dialogManager={internal.dialogManager} />
    );
  }
}
