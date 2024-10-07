/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Dialog
 */

import type { CommonProps } from "@itwin/core-react";
import * as React from "react";
import { DialogRendererBase } from "./DialogManagerBase.js";
import { InternalContentDialogManager as internal } from "./InternalContentDialogManager.js";

/** ContentDialogRenderer React component renders modeless dialogs.
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export class ContentDialogRenderer extends React.PureComponent<CommonProps> {
  // eslint-disable-next-line deprecation/deprecation
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
