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
import { InternalModelessDialogManager as internal } from "./InternalModelessDialogManager.js";

// cSpell:ignore ZINDEX modeless

/** ModelessDialogRenderer React component renders modeless dialogs.
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export class ModelessDialogRenderer extends React.PureComponent<CommonProps> {
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
