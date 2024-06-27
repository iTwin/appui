/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";

import { UiFramework } from "@itwin/appui-react";
import { useTranslation } from "../../useTranslation";
import { Button, Dialog } from "@itwin/itwinui-react";

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
    <Dialog
      isOpen={true}
      onClose={handleCancel}
      closeOnEsc
      closeOnExternalClick
      preventDocumentScroll
    >
      <Dialog.Backdrop />
      <Dialog.Main style={{ width: 450, height: 300 }}>
        <Dialog.TitleBar titleText={translate("Dialogs.SampleModal.title")} />
        <Dialog.Content>
          Lorem ipsum dolor sit amet, posse imperdiet ius in, mundi cotidieque
          ei per. Vel scripta ornatus assentior cu. Duo nonumy equidem te, per
          ad malis deserunt consetetur. In per invidunt conceptam. Ea pri aeque
          corrumpit. Eum ea ipsum perfecto vulputate, an cum oblique ornatus.
        </Dialog.Content>
        <Dialog.ButtonBar>
          <Button styleType="high-visibility" onClick={handleOK}>
            OK
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Dialog.ButtonBar>
      </Dialog.Main>
    </Dialog>
  );
}
