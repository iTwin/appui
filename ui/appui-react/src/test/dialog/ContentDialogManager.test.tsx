/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import { Logger } from "@itwin/core-bentley";
import type { DialogChangedEventArgs } from "../../appui-react";
import {
  ContentDialog,
  ContentDialogRenderer,
  UiFramework,
} from "../../appui-react";
import TestUtils, { userEvent } from "../TestUtils";
import { render, screen, waitFor } from "@testing-library/react";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { InternalContentDialogManager } from "../../appui-react/dialog/InternalContentDialogManager";

describe("ContentDialogManager", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
    InternalContentDialogManager.closeAll();
    spyMethod.resetHistory();
  });

  const spyMethod = sinon.spy();

  function handleContentDialogChanged(_args: DialogChangedEventArgs) {
    spyMethod();
  }

  before(async () => {
    await TestUtils.initializeUiFramework(true);
    await NoRenderApp.startup();

    UiFramework.content.dialogs.onContentDialogChangedEvent.addListener(
      handleContentDialogChanged
    );
  });

  after(async () => {
    UiFramework.content.dialogs.onContentDialogChangedEvent.removeListener(
      handleContentDialogChanged
    );
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework(); // clear out the framework key
  });

  it("UiFramework.content.dialogs methods", () => {
    const dialogId = "Test1";
    const reactNode = (
      <ContentDialog opened={true} title="My Title" dialogId={dialogId}>
        <div />
      </ContentDialog>
    );

    expect(UiFramework.content.dialogs.count).to.eq(0);
    UiFramework.content.dialogs.open(reactNode, dialogId);
    expect(spyMethod.calledOnce).to.be.true;

    expect(UiFramework.content.dialogs.active).to.eq(reactNode);

    expect(UiFramework.content.dialogs.count).to.eq(1);
    UiFramework.content.dialogs.open(reactNode, dialogId);
    expect(UiFramework.content.dialogs.count).to.eq(1);

    expect(UiFramework.content.dialogs.dialogs.length).to.eq(1);
    expect(UiFramework.content.dialogs.dialogs[0].reactNode).to.eq(reactNode);

    UiFramework.content.dialogs.update();
    expect(spyMethod.calledTwice).to.be.true;

    UiFramework.content.dialogs.close(dialogId);
    expect(spyMethod.calledThrice).to.be.true;
    expect(UiFramework.content.dialogs.count).to.eq(0);
  });

  it("close should log error if passed a bad id", () => {
    const logSpyMethod = sinon.spy(Logger, "logError");
    UiFramework.content.dialogs.close("bad");
    logSpyMethod.calledOnce.should.true;
  });

  it("ContentDialogRenderer component", async () => {
    const dialogId = "Test1";
    const reactNode = (
      <ContentDialog opened={true} title="My Title" dialogId={dialogId}>
        <button>MyTestButton</button>
      </ContentDialog>
    );

    render(<ContentDialogRenderer />);

    expect(UiFramework.content.dialogs.count).to.eq(0);
    UiFramework.content.dialogs.open(reactNode, dialogId);
    expect(UiFramework.content.dialogs.count).to.eq(1);

    expect(await screen.findByRole("button", { name: "MyTestButton" })).to
      .exist;

    UiFramework.content.dialogs.close(dialogId);
    expect(UiFramework.content.dialogs.count).to.eq(0);

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: "MyTestButton" })).to.be.null;
    });
  });

  it("ContentDialogRenderer component with two dialogs", async () => {
    const dialogId1 = "Test1";
    const reactNode1 = (
      <ContentDialog opened={true} title="My Title1" dialogId={dialogId1}>
        <button>MyTestButton</button>
      </ContentDialog>
    );

    const dialogId2 = "Test2";
    const reactNode2 = (
      <ContentDialog opened={true} title="My Title2" dialogId={dialogId2}>
        <button>MySecondTestButton</button>
      </ContentDialog>
    );

    render(<ContentDialogRenderer />);

    expect(UiFramework.content.dialogs.count).to.eq(0);

    UiFramework.content.dialogs.open(reactNode1, dialogId1);
    expect(UiFramework.content.dialogs.count).to.eq(1);
    expect(await screen.findByRole("button", { name: "MyTestButton" })).to
      .exist;

    UiFramework.content.dialogs.open(reactNode2, dialogId2);
    expect(UiFramework.content.dialogs.count).to.eq(2);
    expect(screen.getByRole("button", { name: "MyTestButton" })).to.exist;
    expect(await screen.findByRole("button", { name: "MySecondTestButton" })).to
      .exist;

    UiFramework.content.dialogs.close(dialogId2);
    expect(UiFramework.content.dialogs.count).to.eq(1);
    expect(screen.getByRole("button", { name: "MyTestButton" })).to.exist;
    await waitFor(() => {
      expect(screen.queryByRole("button", { name: "MySecondTestButton" })).to.be
        .null;
    });

    UiFramework.content.dialogs.close(dialogId1);
    expect(UiFramework.content.dialogs.count).to.eq(0);
    await waitFor(() => {
      expect(screen.queryByRole("button", { name: "MyTestButton" })).to.be.null;
    });
    expect(screen.queryByRole("button", { name: "MySecondTestButton" })).to.be
      .null;
  });

  it("ContentDialogRenderer component with two dialogs closed in FIFO order", async () => {
    const dialogId1 = "Test1";
    const reactNode1 = (
      <ContentDialog opened={true} title="My Title" dialogId={dialogId1}>
        <button>MyTestButton</button>
      </ContentDialog>
    );

    const dialogId2 = "Test2";
    const reactNode2 = (
      <ContentDialog opened={true} title="My Title 2" dialogId={dialogId2}>
        <button>MySecondTestButton</button>
      </ContentDialog>
    );

    render(<ContentDialogRenderer />);

    expect(UiFramework.content.dialogs.count).to.eq(0);

    UiFramework.content.dialogs.open(reactNode1, dialogId1);
    expect(UiFramework.content.dialogs.count).to.eq(1);
    expect(UiFramework.content.dialogs.getInfo(dialogId1)).not.to.be.undefined;

    expect(await screen.findByRole("button", { name: "MyTestButton" })).to
      .exist;

    UiFramework.content.dialogs.open(reactNode2, dialogId2);
    expect(UiFramework.content.dialogs.count).to.eq(2);
    expect(screen.getByRole("button", { name: "MyTestButton" })).to.exist;
    expect(await screen.findByRole("button", { name: "MySecondTestButton" })).to
      .exist;

    UiFramework.content.dialogs.close(dialogId1);
    expect(UiFramework.content.dialogs.count).to.eq(1);
    await waitFor(() => {
      expect(screen.queryByRole("button", { name: "MyTestButton" })).to.be.null;
    });
    expect(screen.getByRole("button", { name: "MySecondTestButton" })).to.exist;

    UiFramework.content.dialogs.close(dialogId2);
    expect(UiFramework.content.dialogs.count).to.eq(0);
    expect(screen.queryByRole("button", { name: "MyTestButton" })).to.be.null;
    await waitFor(() => {
      expect(screen.queryByRole("button", { name: "MySecondTestButton" })).to.be
        .null;
    });
  });

  it("ContentDialogRenderer component with two dialogs and bring forward", async () => {
    const dialogId1 = "Test1";
    const reactNode1 = (
      <ContentDialog opened={true} title="My Title" dialogId={dialogId1}>
        <button>MyTestButton</button>
      </ContentDialog>
    );

    const dialogId2 = "Test2";
    const reactNode2 = (
      <ContentDialog opened={true} title="My Title 2" dialogId={dialogId2}>
        <button>MySecondTestButton</button>
      </ContentDialog>
    );

    render(<ContentDialogRenderer />);

    expect(UiFramework.content.dialogs.count).to.eq(0);

    UiFramework.content.dialogs.open(reactNode1, dialogId1);
    await waitFor(() => {
      expect(UiFramework.content.dialogs.active).to.eq(reactNode1);
    });

    UiFramework.content.dialogs.open(reactNode2, dialogId2);
    await waitFor(() => {
      expect(UiFramework.content.dialogs.active).to.eq(reactNode2);
    });

    // Click the 2nd dialog - should stay forward
    await theUserTo.click(
      await screen.findByRole("button", { name: "MySecondTestButton" })
    );
    expect(UiFramework.content.dialogs.active).to.eq(reactNode2);

    // Click the 1st dialog to bring it forward
    await theUserTo.click(screen.getByRole("button", { name: "MyTestButton" }));
    expect(UiFramework.content.dialogs.active).to.eq(reactNode1);

    UiFramework.content.dialogs.close(dialogId1);
    expect(UiFramework.content.dialogs.active).to.eq(reactNode2);

    UiFramework.content.dialogs.close(dialogId2);
  });

  it("internal: closeAll should not leave active dialogs", () => {
    expect(UiFramework.content.dialogs.count).to.eq(0);
    const dialogId = "closeAll1";
    UiFramework.content.dialogs.open(<div />, dialogId);
    expect(UiFramework.content.dialogs.count).to.eq(1);
    expect(UiFramework.content.dialogs.active).to.not.be.undefined;
    InternalContentDialogManager.closeAll();
    expect(UiFramework.content.dialogs.count).to.eq(0);
    expect(UiFramework.content.dialogs.active).to.be.undefined;
  });

  it("internal: closeAll should clear dialog ids", async () => {
    expect(UiFramework.content.dialogs.count).to.eq(0);
    const dialogId = "closeAll2";
    UiFramework.content.dialogs.open(<div />, dialogId);
    await waitFor(() => {
      expect(UiFramework.content.dialogs.count).to.eq(1);
    });
    InternalContentDialogManager.closeAll();
    await waitFor(() => {
      expect(UiFramework.content.dialogs.count).to.eq(0);
    });
    UiFramework.content.dialogs.open(<div />, dialogId);
    await waitFor(() => {
      expect(UiFramework.content.dialogs.count).to.eq(1);
    });
  });
});
