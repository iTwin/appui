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
import { UiFramework } from "../UiFramework.js";

/* eslint-disable deprecation/deprecation */

/** Properties for the [[ContentDialog]] component
 * @public
 * @deprecated in 4.15.0. Props of deprecated {@link ContentDialog} component.
 */
export interface ContentDialogProps extends DialogProps {
  dialogId: string;
  movable?: boolean;
  children: React.ReactNode;
}

/** Content Dialog React component uses the Dialog component with a modal={false} prop.
 * It controls the z-index to keep the focused dialog above content but below widgets.
 * @public
 * @deprecated in 4.15.0. Use {@link https://itwinui.bentley.com/docs/dialog iTwinUI Dialog} instead.
 */
export function ContentDialog(props: ContentDialogProps) {
  const {
    className,
    children,
    dialogId,
    style,
    modal,
    modelessId,
    onModelessPointerDown,
    ...otherProps
  } = props;

  const [zIndex, setZIndex] = React.useState(
    UiFramework.content.dialogs.getZIndex(dialogId)
  );
  const updateZIndex = React.useCallback(() => {
    const newZ = UiFramework.content.dialogs.getZIndex(dialogId);
    if (newZ !== zIndex) {
      setZIndex(newZ);
    }
  }, [dialogId, zIndex]);

  return (
    <Dialog
      className={className}
      data-item-type="content-dialog"
      data-item-id={dialogId}
      resizable={true}
      movable={true}
      trapFocus={false}
      modal={false}
      {...otherProps}
      modelessId={dialogId}
      onModelessPointerDown={(event) =>
        UiFramework.content.dialogs.handlePointerDownEvent(
          event,
          dialogId,
          updateZIndex
        )
      }
      style={{ zIndex, ...style }}
    >
      {children}
    </Dialog>
  );
}
