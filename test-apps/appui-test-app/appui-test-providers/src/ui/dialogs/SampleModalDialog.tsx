/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";

import { UiFramework } from "@itwin/appui-react";
import { useTranslation } from "../../useTranslation";
import {
  Button,
  Modal,
  ModalButtonBar,
  ModalContent,
} from "@itwin/itwinui-react";

/**
 *  This is an example of how to create a React-based modal dialog that can be opened via a toolbutton or a key-in.
 */
export function SampleModalDialog() {
  const { translate } = useTranslation();

  const closeDialog = React.useCallback(() => {
    UiFramework.dialogs.modal.close();
  }, []);

  const handleOK = React.useCallback(() => {
    // Do OK processing here
    closeDialog();
  }, [closeDialog]);

  const handleCancel = React.useCallback(() => {
    // Do Cancel processing here
    closeDialog();
  }, [closeDialog]);

  return (
    <Modal
      isOpen={true}
      title={translate("Dialogs.SampleModal.title")}
      onClose={handleCancel}
      style={{ width: 450, height: 300 }}
      portal={false}
      closeOnEsc
      closeOnExternalClick
    >
      <ModalContent>
        Lorem ipsum dolor sit amet, posse imperdiet ius in, mundi cotidieque ei
        per. Vel scripta ornatus assentior cu. Duo nonumy equidem te, per ad
        malis deserunt consetetur. In per invidunt conceptam. Ea pri aeque
        corrumpit. Eum ea ipsum perfecto vulputate, an cum oblique ornatus.
      </ModalContent>
      <ModalButtonBar>
        <Button styleType="high-visibility" onClick={handleOK}>
          OK
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </ModalButtonBar>
    </Modal>
  );
}
