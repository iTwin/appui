/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Logger } from "@itwin/core-bentley";
import type { DialogChangedEventArgs } from "../../appui-react";
import {
  ModelessDialog,
  ModelessDialogRenderer,
  UiFramework,
} from "../../appui-react";
import { userEvent } from "../TestUtils";
import { render, screen, waitFor } from "@testing-library/react";
import { InternalModelessDialogManager } from "../../appui-react/dialog/InternalModelessDialogManager";

describe("InternalModelessDialogManager", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  const spy = vi.fn();
  beforeEach(() => {
    theUserTo = userEvent.setup();
    InternalModelessDialogManager.closeAll();
    spy.mockReset();
  });

  // eslint-disable-next-line deprecation/deprecation
  function handleModelessDialogChanged(_args: DialogChangedEventArgs) {
    spy();
  }

  beforeEach(() => {
    UiFramework.dialogs.modeless.onModelessDialogChangedEvent.addListener(
      handleModelessDialogChanged
    );
  });

  afterEach(() => {
    InternalModelessDialogManager.onModelessDialogChangedEvent.removeListener(
      handleModelessDialogChanged
    );
  });

  it("ModelessDialogManager methods", () => {
    const dialogId = "Test1";
    const reactNode = (
      <ModelessDialog opened={true} title="My Title" dialogId={dialogId} />
    );

    expect(UiFramework.dialogs.modeless.count).toEqual(0);
    UiFramework.dialogs.modeless.open(reactNode, dialogId);
    expect(spy).toHaveBeenCalledOnce();

    expect(UiFramework.dialogs.modeless.active).toEqual(reactNode);

    expect(UiFramework.dialogs.modeless.count).toEqual(1);
    UiFramework.dialogs.modeless.open(reactNode, dialogId);
    expect(UiFramework.dialogs.modeless.count).toEqual(1);

    expect(UiFramework.dialogs.modeless.dialogs.length).toEqual(1);
    expect(UiFramework.dialogs.modeless.dialogs[0].reactNode).toEqual(
      reactNode
    );

    UiFramework.dialogs.modeless.update();
    expect(spy).toHaveBeenCalledTimes(2);

    UiFramework.dialogs.modeless.close(dialogId);
    expect(spy).toHaveBeenCalledTimes(3);
    expect(UiFramework.dialogs.modeless.count).toEqual(0);
  });

  it("close should log error if passed a bad id", () => {
    const logErrorSpy = vi.spyOn(Logger, "logError");
    UiFramework.dialogs.modeless.close("bad");
    expect(logErrorSpy).toHaveBeenCalledOnce();
  });

  it("ModelessDialogRenderer component", async () => {
    const dialogId = "Test1";
    const reactNode = (
      <ModelessDialog opened={true} title="My Title" dialogId={dialogId} />
    );

    render(<ModelessDialogRenderer />);

    expect(UiFramework.dialogs.modeless.count).toEqual(0);
    UiFramework.dialogs.modeless.open(reactNode, dialogId);
    expect(UiFramework.dialogs.modeless.count).toEqual(1);
    expect(await screen.findByText("My Title")).to.exist;

    UiFramework.dialogs.modeless.close(dialogId);
    expect(UiFramework.dialogs.modeless.count).toEqual(0);
    await waitFor(() => {
      expect(screen.queryByText("My Title")).toEqual(null);
    });
  });

  it("ModelessDialogRenderer component with two dialogs", async () => {
    const dialogId1 = "Test1";
    const reactNode1 = (
      <ModelessDialog opened={true} title="My Title" dialogId={dialogId1} />
    );

    const dialogId2 = "Test2";
    const reactNode2 = (
      <ModelessDialog opened={true} title="My Title 2" dialogId={dialogId2} />
    );

    render(<ModelessDialogRenderer />);

    expect(UiFramework.dialogs.modeless.count).toEqual(0);

    UiFramework.dialogs.modeless.open(reactNode1, dialogId1);
    expect(UiFramework.dialogs.modeless.count).toEqual(1);
    expect(await screen.findByText("My Title")).to.exist;

    UiFramework.dialogs.modeless.open(reactNode2, dialogId2);
    expect(UiFramework.dialogs.modeless.count).toEqual(2);
    expect(screen.getByText("My Title")).to.exist;
    expect(await screen.findByText("My Title 2")).to.exist;

    UiFramework.dialogs.modeless.close(dialogId2);
    expect(UiFramework.dialogs.modeless.count).toEqual(1);
    expect(screen.getByText("My Title")).to.exist;
    await waitFor(() => {
      expect(screen.queryByText("My Title 2")).toEqual(null);
    });

    UiFramework.dialogs.modeless.close(dialogId1);
    expect(UiFramework.dialogs.modeless.count).toEqual(0);
    await waitFor(() => {
      expect(screen.queryByText("My Title")).toEqual(null);
    });
    expect(screen.queryByText("My Title 2")).toEqual(null);
  });

  it("ModelessDialogRenderer component with two dialogs closed in FIFO order", async () => {
    const dialogId1 = "Test1";
    const reactNode1 = (
      <ModelessDialog opened={true} title="My Title" dialogId={dialogId1} />
    );

    const dialogId2 = "Test2";
    const reactNode2 = (
      <ModelessDialog opened={true} title="My Title 2" dialogId={dialogId2} />
    );

    render(<ModelessDialogRenderer />);

    expect(UiFramework.dialogs.modeless.count).toEqual(0);

    UiFramework.dialogs.modeless.open(reactNode1, dialogId1);
    expect(UiFramework.dialogs.modeless.count).toEqual(1);
    expect(UiFramework.dialogs.modeless.getInfo(dialogId1)).toBeTruthy();

    UiFramework.dialogs.modeless.open(reactNode2, dialogId2);
    expect(UiFramework.dialogs.modeless.count).toEqual(2);
    expect(await screen.findByText("My Title")).to.exist;
    expect(screen.getByText("My Title 2")).to.exist;

    UiFramework.dialogs.modeless.close(dialogId1);
    expect(UiFramework.dialogs.modeless.count).toEqual(1);
    await waitFor(() => {
      expect(screen.queryByText("My Title")).toEqual(null);
    });
    expect(screen.getByText("My Title 2")).to.exist;

    UiFramework.dialogs.modeless.close(dialogId2);
    expect(UiFramework.dialogs.modeless.count).toEqual(0);
    expect(screen.queryByText("My Title")).toEqual(null);
    await waitFor(() => {
      expect(screen.queryByText("My Title 2")).toEqual(null);
    });
  });

  it("ModelessDialogRenderer component with two dialogs and bring forward", async () => {
    const dialogId1 = "Test1";
    const reactNode1 = (
      <ModelessDialog opened={true} title="My Title" dialogId={dialogId1} />
    );

    const dialogId2 = "Test2";
    const reactNode2 = (
      <ModelessDialog opened={true} title="My Title 2" dialogId={dialogId2} />
    );

    render(<ModelessDialogRenderer />);

    expect(UiFramework.dialogs.modeless.count).toEqual(0);

    UiFramework.dialogs.modeless.open(reactNode1, dialogId1);
    expect(UiFramework.dialogs.modeless.count).toEqual(1);

    UiFramework.dialogs.modeless.open(reactNode2, dialogId2);
    expect(UiFramework.dialogs.modeless.count).toEqual(2);

    expect(UiFramework.dialogs.modeless.active).toEqual(reactNode2);

    // Click the 2nd dialog - should stay forward
    await theUserTo.click(await screen.findByText("My Title 2"));
    expect(UiFramework.dialogs.modeless.active).toEqual(reactNode2);

    // Click the 1st dialog to bring it forward
    await theUserTo.click(screen.getByText("My Title"));
    expect(UiFramework.dialogs.modeless.active).toEqual(reactNode1);

    UiFramework.dialogs.modeless.close(dialogId1);
    expect(UiFramework.dialogs.modeless.count).toEqual(1);

    expect(UiFramework.dialogs.modeless.active).toEqual(reactNode2);

    UiFramework.dialogs.modeless.close(dialogId2);
    expect(UiFramework.dialogs.modeless.count).toEqual(0);
  });

  it("internal: closeAll should not leave active dialogs", () => {
    expect(UiFramework.dialogs.modeless.count).toEqual(0);
    const dialogId = "closeAll1";
    UiFramework.dialogs.modeless.open(<div />, dialogId);
    expect(UiFramework.dialogs.modeless.count).toEqual(1);
    expect(UiFramework.dialogs.modeless.active).toBeTruthy();
    InternalModelessDialogManager.closeAll();
    expect(UiFramework.dialogs.modeless.count).toEqual(0);
    expect(UiFramework.dialogs.modeless.active).toEqual(undefined);
  });

  it("internal: closeAll should clear dialog ids", async () => {
    expect(UiFramework.dialogs.modeless.count).toEqual(0);
    const dialogId = "closeAll2";
    UiFramework.dialogs.modeless.open(<div />, dialogId);
    await waitFor(() => {
      expect(UiFramework.dialogs.modeless.count).toEqual(1);
    });
    InternalModelessDialogManager.closeAll();
    await waitFor(() => {
      expect(UiFramework.dialogs.modeless.count).toEqual(0);
    });
    UiFramework.dialogs.modeless.open(<div />, dialogId);
    await waitFor(() => {
      expect(UiFramework.dialogs.modeless.count).toEqual(1);
    });
  });
});
