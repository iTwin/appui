/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import { Key } from "ts-key-enum";
import type { KeyboardShortcutProps } from "../../appui-react";
import { CommandItemDef, KeyboardShortcutMenu } from "../../appui-react";
import TestUtils, { userEvent } from "../TestUtils";
import { UiFramework } from "../../appui-react/UiFramework";
import { render, screen, waitFor } from "@testing-library/react";

describe("KeyboardShortcutMenu", () => {
  const testSpyMethod = sinon.spy();
  let testCommand: CommandItemDef;
  let keyboardShortcutList: KeyboardShortcutProps[];
  let theUserTo: ReturnType<typeof userEvent.setup>;

  before(async () => {
    await TestUtils.initializeUiFramework();

    testCommand = new CommandItemDef({
      commandId: "testCommand",
      iconSpec: "icon-placeholder",
      label: "Test",
      execute: () => {
        testSpyMethod();
      },
    });

    keyboardShortcutList = [
      {
        key: "a",
        item: testCommand,
      },
      {
        key: "d",
        label: "Test",
        shortcuts: [
          {
            key: "1",
            item: testCommand,
          },
        ],
      },
      {
        key: Key.F7,
        item: testCommand,
      },
      {
        key: "h",
        item: testCommand,
        isHidden: true,
      },
      {
        key: "i",
        label: "Test",
        isHidden: true,
        shortcuts: [
          {
            key: "2",
            item: testCommand,
          },
        ],
      },
    ];
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  beforeEach(() => {
    testSpyMethod.resetHistory();
    UiFramework.keyboardShortcuts.shortcutContainer.emptyData();
    theUserTo = userEvent.setup();
  });

  it("Should render shortcuts and close on Escape", async () => {
    UiFramework.keyboardShortcuts.loadShortcuts(keyboardShortcutList);
    expect(UiFramework.isContextMenuOpen).to.be.false;

    render(<KeyboardShortcutMenu />);

    UiFramework.keyboardShortcuts.displayMenu();

    await waitFor(() => {
      expect(screen.queryAllByRole("menuitem")).to.have.lengthOf(3);
    });
    expect(UiFramework.isContextMenuOpen).to.be.true;

    await theUserTo.type(
      screen.getAllByTestId("core-context-menu-root")[0],
      "[Escape]",
      { skipClick: true }
    ); // Does nothing because of ignoreNextKeyUp=true
    expect(screen.queryAllByRole("menuitem")).to.have.lengthOf(3);

    await theUserTo.type(
      screen.getAllByTestId("core-context-menu-root")[0],
      "[Escape]"
    );
    expect(screen.queryAllByRole("menuitem")).to.have.lengthOf(0);
    expect(UiFramework.isContextMenuOpen).to.be.false;
  });

  it("Should render shortcuts and execute item on click", async () => {
    UiFramework.keyboardShortcuts.loadShortcuts(keyboardShortcutList);

    render(<KeyboardShortcutMenu />);

    UiFramework.keyboardShortcuts.displayMenu();

    await waitFor(() => {
      expect(screen.queryAllByRole("menuitem")).to.have.lengthOf(3);
    });

    await theUserTo.click(screen.getByRole("menuitem", { name: "A Test" }));

    expect(screen.queryAllByRole("menuitem")).to.have.lengthOf(0);

    await TestUtils.flushAsyncOperations();
    expect(testSpyMethod.calledOnce).to.be.true;
  });
});
