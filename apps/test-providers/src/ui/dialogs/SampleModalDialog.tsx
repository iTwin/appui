/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";

import { UiFramework } from "@itwin/appui-react";
import { useTranslation } from "../../useTranslation.js";
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
          The quick brown fox jumps over the lazy dog, wandering silently under
          midnight skies. Swift breezes carry the scent of pine through the
          quiet forest, filling the air with a cool, comforting calm. In the
          distance, mountains rise steeply, their rugged peaks etched against
          the twilight. Stars begin to twinkle, casting a soft glow over winding
          paths and shimmering lakes.
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
