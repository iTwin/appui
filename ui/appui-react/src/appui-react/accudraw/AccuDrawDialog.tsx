/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module AccuDraw
 */

import "./AccuDrawDialog.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { Orientation } from "@itwin/core-react";
import { AccuDrawFieldContainer } from "./AccuDrawFieldContainer";
import { useTranslation } from "../hooks/useTranslation";
import { Dialog } from "@itwin/itwinui-react";

/** Properties for [[AccuDrawDialog]]
 * @beta */
// eslint-disable-next-line deprecation/deprecation
export interface AccuDrawDialogProps extends CommonProps {
  /** Indicates whether the dialog is open */
  opened: boolean;
  /** Unique id for the dialog.
   * @deprecated in 4.15.0. No longer used.
   */
  dialogId?: string;
  /** Orientation of the fields */
  orientation?: Orientation;
  /** Callback for when the dialog closes */
  onClose?: () => void;
}

/** Dialog displays [[AccuDrawFieldContainer]] for AccuDraw Ui
 * @beta */
export function AccuDrawDialog(props: AccuDrawDialogProps) {
  const { translate } = useTranslation();
  const [opened, setOpened] = React.useState(props.opened);

  const closeDialog = React.useCallback(() => {
    setOpened(false);
    props.onClose && props.onClose();
  }, [props]);

  const handleClose = React.useCallback(() => {
    closeDialog();
  }, [closeDialog]);

  const classNames = classnames("uifw-accudraw-dialog", props.className);
  const orientation =
    props.orientation !== undefined ? props.orientation : Orientation.Vertical;
  const dialogWidth = orientation === Orientation.Horizontal ? 500 : 250;

  return (
    <Dialog
      isOpen={opened}
      onClose={handleClose}
      className={classNames}
      style={props.style}
      closeOnEsc
      isDraggable
      preventDocumentScroll
    >
      <Dialog.Main
        style={{ minHeight: 75, width: dialogWidth }}
        data-testid="accudraw-dialog-container"
      >
        <Dialog.TitleBar titleText={translate("accuDraw.dialogTitle")} />
        <Dialog.Content style={{ padding: 0 }}>
          <AccuDrawFieldContainer orientation={orientation} />
        </Dialog.Content>
      </Dialog.Main>
    </Dialog>
  );
}
