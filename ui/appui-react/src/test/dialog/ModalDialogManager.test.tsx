/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { MessageBoxIconType, MessageBoxType } from "@itwin/core-frontend";
import {
  ModalDialogRenderer,
  StandardMessageBox,
  UiFramework,
} from "../../appui-react.js";
import { render, screen, waitFor } from "@testing-library/react";

describe("ModalDialogManager", () => {
  const spy = vi.fn();

  beforeEach(() => {
    UiFramework.dialogs.modal.onModalDialogChangedEvent.addListener(spy);
  });

  afterEach(() => {
    UiFramework.dialogs.modal.onModalDialogChangedEvent.removeListener(spy);
  });

  it("ModalDialogRenderer component", async () => {
    const reactNode = (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      <StandardMessageBox
        opened={true}
        title="My Title"
        iconType={MessageBoxIconType.Critical}
        messageBoxType={MessageBoxType.YesNoCancel}
      />
    );

    render(<ModalDialogRenderer />);

    expect(UiFramework.dialogs.modal.count).toEqual(0);
    UiFramework.dialogs.modal.open(reactNode);
    expect(UiFramework.dialogs.modal.count).toEqual(1);
    expect(await screen.findByTestId("message-box-dialog-container")).to.exist;

    UiFramework.dialogs.modal.close();
    expect(UiFramework.dialogs.modal.count).toEqual(0);
    await waitFor(() => {
      expect(screen.queryByTestId("message-box-dialog-container")).toEqual(
        null
      );
    });
  });

  it("ModalDialogRenderer component with two dialogs", async () => {
    const reactNode = (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      <StandardMessageBox
        opened={true}
        title="My Title"
        iconType={MessageBoxIconType.Critical}
        messageBoxType={MessageBoxType.YesNoCancel}
      />
    );
    const reactNode2 = (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      <StandardMessageBox
        opened={true}
        title="My Title 2"
        iconType={MessageBoxIconType.Critical}
        messageBoxType={MessageBoxType.YesNoCancel}
      />
    );

    render(<ModalDialogRenderer />);

    expect(UiFramework.dialogs.modal.count).toEqual(0);

    UiFramework.dialogs.modal.open(reactNode);
    expect(UiFramework.dialogs.modal.count).toEqual(1);
    expect(
      await screen.findAllByTestId("message-box-dialog-container")
    ).to.have.lengthOf(1);

    UiFramework.dialogs.modal.open(reactNode2);
    expect(UiFramework.dialogs.modal.count).toEqual(2);
    await waitFor(() => {
      expect(
        screen.getAllByTestId("message-box-dialog-container")
      ).to.have.lengthOf(2);
    });

    UiFramework.dialogs.modal.close();
    expect(UiFramework.dialogs.modal.count).toEqual(1);
    await waitFor(() => {
      expect(
        screen.getAllByTestId("message-box-dialog-container")
      ).to.have.lengthOf(1);
    });

    UiFramework.dialogs.modal.close();
    expect(UiFramework.dialogs.modal.count).toEqual(0);
    await waitFor(() => {
      expect(
        screen.queryAllByTestId("message-box-dialog-container")
      ).to.have.lengthOf(0);
    });
  });
});
