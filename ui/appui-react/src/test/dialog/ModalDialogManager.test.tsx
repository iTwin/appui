/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { MessageBoxIconType, MessageBoxType } from "@itwin/core-frontend";
import type { DialogChangedEventArgs } from "../../appui-react";
import {
  ModalDialogRenderer,
  StandardMessageBox,
  UiFramework,
} from "../../appui-react";
import { render, screen, waitFor } from "@testing-library/react";

describe("ModalDialogManager", () => {
  const spy = vi.fn();

  function handleModalDialogChanged(_args: DialogChangedEventArgs) {
    spy();
  }

  beforeEach(() => {
    UiFramework.dialogs.modal.onModalDialogChangedEvent.addListener(
      handleModalDialogChanged
    );
  });

  afterEach(() => {
    UiFramework.dialogs.modal.onModalDialogChangedEvent.removeListener(
      handleModalDialogChanged
    );
  });

  it("ModalDialogRenderer component", async () => {
    const reactNode = (
      // eslint-disable-next-line deprecation/deprecation
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
    expect(await screen.findByTestId("dialog-container")).to.exist;

    UiFramework.dialogs.modal.close();
    expect(UiFramework.dialogs.modal.count).toEqual(0);
    await waitFor(() => {
      expect(screen.queryByTestId("dialog-container")).toEqual(null);
    });
  });

  it("ModalDialogRenderer component with two dialogs", async () => {
    const reactNode = (
      // eslint-disable-next-line deprecation/deprecation
      <StandardMessageBox
        opened={true}
        title="My Title"
        iconType={MessageBoxIconType.Critical}
        messageBoxType={MessageBoxType.YesNoCancel}
      />
    );
    const reactNode2 = (
      // eslint-disable-next-line deprecation/deprecation
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
    expect(await screen.findAllByTestId("dialog-container")).to.have.lengthOf(
      1
    );

    UiFramework.dialogs.modal.open(reactNode2);
    expect(UiFramework.dialogs.modal.count).toEqual(2);
    await waitFor(() => {
      expect(screen.getAllByTestId("dialog-container")).to.have.lengthOf(2);
    });

    UiFramework.dialogs.modal.close();
    expect(UiFramework.dialogs.modal.count).toEqual(1);
    await waitFor(() => {
      expect(screen.getAllByTestId("dialog-container")).to.have.lengthOf(1);
    });

    UiFramework.dialogs.modal.close();
    expect(UiFramework.dialogs.modal.count).toEqual(0);
    await waitFor(() => {
      expect(screen.queryAllByTestId("dialog-container")).to.have.lengthOf(0);
    });
  });
});
