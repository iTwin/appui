/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Dialog
 */

import * as React from "react";
import type { DialogProps } from "@itwin/core-react";
import { Dialog } from "@itwin/core-react";
import { UiFramework } from "../UiFramework";

/* eslint-disable deprecation/deprecation */

/** Properties for the [[ModelessDialog]] component
 * @public
 * @deprecated in 4.15.0. Props of deprecated {@link ModelessDialog} component.
 */
export interface ModelessDialogProps extends DialogProps {
  dialogId: string;
  movable?: boolean;
}

/** Modeless Dialog React component uses the Dialog component with a modal={false} prop.
 * It controls the z-index to keep the focused dialog above others.
 * @public
 * @deprecated in 4.15.0. Use {@link https://itwinui.bentley.com/docs/dialog iTwinUI Dialog} instead.
 */
export class ModelessDialog extends React.Component<ModelessDialogProps> {
  constructor(props: ModelessDialogProps) {
    super(props);
  }

  public override render(): React.ReactElement {
    const {
      dialogId,
      style,
      modal,
      modelessId,
      onModelessPointerDown,
      ...props
    } = this.props;

    return (
      // eslint-disable-next-line deprecation/deprecation
      <Dialog
        {...props}
        modal={false}
        modelessId={dialogId}
        onModelessPointerDown={(event) =>
          UiFramework.dialogs.modeless.handlePointerDownEvent(
            event,
            dialogId,
            this._updateDialog
          )
        }
        style={{
          zIndex: UiFramework.dialogs.modeless.getZIndex(dialogId),
          ...style,
        }}
      >
        {this.props.children}
      </Dialog>
    );
  }

  private _updateDialog = () => {
    this.forceUpdate();
  };
}
