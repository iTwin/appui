/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Dialog
 */

import * as React from "react";
import { CommonProps } from "@itwin/core-react";
import { DialogRendererBase } from "./DialogManagerBase";
import { InternalModelessDialogManager as internal } from "./InternalModelessDialogManager";

// cSpell:ignore ZINDEX modeless

/** ModelessDialogRenderer React component renders modeless dialogs.
 * @public
 */
export class ModelessDialogRenderer extends React.PureComponent<CommonProps> {

  constructor(props: CommonProps) {
    super(props);
  }

  public override render(): React.ReactNode {
    return (
      <DialogRendererBase {...this.props} dialogManager={internal.dialogManager} />
    );
  }
}

