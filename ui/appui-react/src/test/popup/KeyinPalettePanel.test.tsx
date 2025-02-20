/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Key } from "ts-key-enum";
import { IModelApp, Tool } from "@itwin/core-frontend";
import { fireEvent, render, waitFor } from "@testing-library/react";
import type { KeyinEntry } from "../../appui-react/keyins/Keyins.js";
import { UiFramework } from "../../appui-react.js";
import TestUtils, { storageMock } from "../TestUtils.js";
import { UiStateStorageStatus } from "@itwin/core-react";
import {
  clearKeyinPaletteHistory,
  KeyinPalettePanel,
} from "../../appui-react/popup/KeyinPalettePanel.js";

const myLocalStorage = storageMock();
const KEYIN_PALETTE_NAMESPACE = "KeyinPalettePanel";
const KEYIN_HISTORY_KEY = "historyArray";
const propertyDescriptorToRestore = Object.getOwnPropertyDescriptor(
  window,
  "localStorage"
)!;
const rnaDescriptorToRestore = Object.getOwnPropertyDescriptor(
  IModelApp,
  "requestNextAnimation"
)!;
function requestNextAnimation() {}

describe("<KeyinPalettePanel>", () => {
  beforeEach(() => {
    // Avoid requestAnimationFrame exception during test by temporarily replacing function that calls it. Tried replacing window.requestAnimationFrame first
    // but that did not work.
    Object.defineProperty(IModelApp, "requestNextAnimation", {
      get: () => requestNextAnimation,
    });

    Object.defineProperty(window, "localStorage", {
      get: () => myLocalStorage,
    });
  });

  afterEach(() => {
    // restore the overridden property getter
    Object.defineProperty(window, "localStorage", propertyDescriptorToRestore);
    Object.defineProperty(
      IModelApp,
      "requestNextAnimation",
      rnaDescriptorToRestore
    );
  });

  it("test clearKeyinPaletteHistory", async () => {
    const uiSettingsStorage = UiFramework.getUiStateStorage();
    if (uiSettingsStorage) {
      await uiSettingsStorage.saveSetting(
        KEYIN_PALETTE_NAMESPACE,
        KEYIN_HISTORY_KEY,
        ["keyin1", "keyin2"]
      );
      let settingsResult = await uiSettingsStorage.getSetting(
        KEYIN_PALETTE_NAMESPACE,
        KEYIN_HISTORY_KEY
      );
      expect(UiStateStorageStatus.Success === settingsResult.status);
      clearKeyinPaletteHistory();
      settingsResult = await uiSettingsStorage.getSetting(
        KEYIN_PALETTE_NAMESPACE,
        KEYIN_HISTORY_KEY
      );
      expect(UiStateStorageStatus.NotFound === settingsResult.status);
    }
  });

  it("Renders", async () => {
    const keyins: KeyinEntry[] = [
      { value: "test a" },
      { value: "test b" },
      { value: "keyin one" },
      { value: "keyin two" },
    ];
    const renderedComponent = render(<KeyinPalettePanel keyins={keyins} />);
    expect(renderedComponent).toBeTruthy();

    await TestUtils.flushAsyncOperations();
    const history2 = await waitFor(() =>
      renderedComponent.getByTitle("test b")
    );
    expect(history2).toBeTruthy();
    expect(renderedComponent.container.querySelectorAll("li").length).toEqual(
      4
    );
  });

  it("handles key presses in select input ", async () => {
    const keyins: KeyinEntry[] = [
      { value: "test a" },
      { value: "test b" },
      { value: "keyin one" },
      { value: "keyin two" },
    ];
    const renderedComponent = render(<KeyinPalettePanel keyins={keyins} />);
    expect(renderedComponent).toBeTruthy();
    const selectInput = renderedComponent.getByTestId(
      "command-palette-input"
    ) as HTMLInputElement;

    await TestUtils.flushAsyncOperations();
    const history2 = await waitFor(() =>
      renderedComponent.getByTitle("test b")
    );
    expect(history2).toBeTruthy();
    expect(renderedComponent.container.querySelectorAll("li").length).toEqual(
      4
    );

    fireEvent.change(selectInput, { target: { value: "two" } });
    await TestUtils.flushAsyncOperations();
    expect(renderedComponent.container.querySelectorAll("li").length).toEqual(
      1
    );
    fireEvent.keyDown(selectInput, { key: Key.Enter });
  });

  it("handles ctrl+key presses in select input ", async () => {
    const keyins: KeyinEntry[] = [
      { value: "test a" },
      { value: "test b" },
      { value: "keyin one" },
      { value: "keyin two" },
    ];
    const renderedComponent = render(<KeyinPalettePanel keyins={keyins} />);
    expect(renderedComponent).toBeTruthy();
    const selectInput = renderedComponent.getByTestId(
      "command-palette-input"
    ) as HTMLInputElement;

    await TestUtils.flushAsyncOperations();
    const history2 = await waitFor(() =>
      renderedComponent.getByTitle("test b")
    );
    expect(history2).toBeTruthy();
    expect(renderedComponent.container.querySelectorAll("li").length).toEqual(
      4
    );

    fireEvent.change(selectInput, { target: { value: "two" } });
    await TestUtils.flushAsyncOperations();
    expect(renderedComponent.container.querySelectorAll("li").length).toEqual(
      1
    );
    fireEvent.keyDown(selectInput, { key: Key.Enter, ctrlKey: true });
    await TestUtils.flushAsyncOperations();
    fireEvent.change(selectInput, { target: { value: "two" } });
    await TestUtils.flushAsyncOperations();
    fireEvent.keyDown(selectInput, { key: Key.Tab });
  });

  it("Handles keyboard running selection", async () => {
    const keyins: KeyinEntry[] = [
      { value: "keyin one" },
      { value: "keyin two" },
    ];
    const renderedComponent = render(<KeyinPalettePanel keyins={keyins} />);
    expect(renderedComponent).toBeTruthy();
    const selectInput = renderedComponent.getByTestId(
      "command-palette-input"
    ) as HTMLInputElement;
    fireEvent.keyDown(selectInput, { key: Key.ArrowDown });

    await TestUtils.flushAsyncOperations();
    const listComponent = renderedComponent.container.querySelector("ul");
    expect(listComponent).toBeTruthy();
    fireEvent.keyDown(listComponent!, { key: Key.ArrowDown });
    fireEvent.keyDown(listComponent!, { key: Key.Enter });
  });

  it("Handles keyboard updating input after CTRL + selection", async () => {
    const keyins: KeyinEntry[] = [
      { value: "keyin one" },
      { value: "keyin two" },
    ];
    const renderedComponent = render(<KeyinPalettePanel keyins={keyins} />);
    expect(renderedComponent).toBeTruthy();
    const selectInput = renderedComponent.getByTestId(
      "command-palette-input"
    ) as HTMLInputElement;
    expect(selectInput.value.length === 0);
    await TestUtils.flushAsyncOperations();
    fireEvent.keyDown(selectInput, { key: Key.ArrowDown });
    const listComponent = renderedComponent.container.querySelector("ul");
    expect(listComponent).toBeTruthy();
    fireEvent.keyDown(listComponent!, { key: Key.ArrowDown });
    fireEvent.keyDown(listComponent!, { key: Key.Enter, ctrlKey: true });
    expect(selectInput.value.length > 0);
  });

  it("Handles listbox click processing", async () => {
    const keyins: KeyinEntry[] = [
      { value: "test a" },
      { value: "test b" },
      { value: "keyin one" },
      { value: "keyin two" },
    ];
    const renderedComponent = render(<KeyinPalettePanel keyins={keyins} />);
    expect(renderedComponent).toBeTruthy();
    await TestUtils.flushAsyncOperations();
    const history2 = await waitFor(() =>
      renderedComponent.getByTitle("test b")
    );
    expect(history2).toBeTruthy();

    const selectInput = renderedComponent.getByTestId(
      "command-palette-input"
    ) as HTMLInputElement;
    expect(selectInput.value.length === 0);
    const liItems = renderedComponent.container.querySelectorAll("li");
    expect(liItems.length).toEqual(4);
    fireEvent.click(liItems[1]);
    expect(selectInput.value.length > 0);
  });

  it("Handles listbox CTRL+click processing", async () => {
    const keyins: KeyinEntry[] = [
      { value: "test a" },
      { value: "test b" },
      { value: "keyin one" },
      { value: "keyin two" },
    ];
    const renderedComponent = render(<KeyinPalettePanel keyins={keyins} />);
    expect(renderedComponent).toBeTruthy();
    await TestUtils.flushAsyncOperations();
    const history2 = await waitFor(() =>
      renderedComponent.getByTitle("test b")
    );
    expect(history2).toBeTruthy();

    const selectInput = renderedComponent.getByTestId(
      "command-palette-input"
    ) as HTMLInputElement;
    expect(selectInput.value.length === 0);
    // force a list item to get focus so focus value is set
    fireEvent.keyDown(selectInput, { key: Key.ArrowDown });

    const liItems = renderedComponent.container.querySelectorAll("li");
    expect(liItems.length).toEqual(4);
    fireEvent.click(liItems[1], { ctrlKey: true });
    expect(selectInput.value.length > 0);
  });

  describe("Filters out unavailable History keyins", () => {
    class TestImmediate extends Tool {
      public static override toolId = "Test.Immediate";
      public override async run(): Promise<boolean> {
        return true;
      }
    }

    beforeEach(() => {
      vi.spyOn(IModelApp.tools, "parseKeyin").mockImplementation(
        (keyin: string) => {
          if (keyin === "bogus") return { ok: false, error: 1 };
          return { ok: true, args: [], tool: TestImmediate };
        }
      );
    });

    it("Renders and filters out bogus history entry", async () => {
      const uiSettingsStorage = UiFramework.getUiStateStorage();
      if (uiSettingsStorage) {
        await uiSettingsStorage.saveSetting(
          KEYIN_PALETTE_NAMESPACE,
          KEYIN_HISTORY_KEY,
          ["history1", "history2", "bogus"]
        );
      }
      const keyins: KeyinEntry[] = [
        { value: "keyin one" },
        { value: "keyin two" },
      ];
      const renderedComponent = render(<KeyinPalettePanel keyins={keyins} />);
      expect(renderedComponent).toBeTruthy();

      await TestUtils.flushAsyncOperations();
      const history2 = await waitFor(() =>
        renderedComponent.getByTitle("history2")
      );
      expect(history2).toBeTruthy();
      expect(renderedComponent.container.querySelectorAll("li").length).toEqual(
        4
      );
    });

    it("handles key presses in select input ", async () => {
      const uiSettingsStorage = UiFramework.getUiStateStorage();
      if (uiSettingsStorage) {
        await uiSettingsStorage.saveSetting(
          KEYIN_PALETTE_NAMESPACE,
          KEYIN_HISTORY_KEY,
          ["history1", "history2", "bogus"]
        );
      }
      const keyins: KeyinEntry[] = [
        { value: "keyin one" },
        { value: "keyin two" },
      ];
      const renderedComponent = render(<KeyinPalettePanel keyins={keyins} />);
      expect(renderedComponent).toBeTruthy();
      const selectInput = renderedComponent.getByTestId(
        "command-palette-input"
      ) as HTMLInputElement;

      await TestUtils.flushAsyncOperations();
      const history2 = await waitFor(() =>
        renderedComponent.getByTitle("history2")
      );
      expect(history2).toBeTruthy();
      expect(renderedComponent.container.querySelectorAll("li").length).toEqual(
        4
      );

      fireEvent.change(selectInput, { target: { value: "two" } });
      await TestUtils.flushAsyncOperations();
      expect(renderedComponent.container.querySelectorAll("li").length).toEqual(
        1
      );
      fireEvent.keyDown(selectInput, { key: Key.Enter });
    });

    it("handles ctrl+key presses in select input ", async () => {
      const uiSettingsStorage = UiFramework.getUiStateStorage();
      if (uiSettingsStorage) {
        await uiSettingsStorage.saveSetting(
          KEYIN_PALETTE_NAMESPACE,
          KEYIN_HISTORY_KEY,
          ["history1", "history2", "bogus"]
        );
      }
      const keyins: KeyinEntry[] = [
        { value: "keyin one" },
        { value: "keyin two" },
      ];
      const renderedComponent = render(<KeyinPalettePanel keyins={keyins} />);
      expect(renderedComponent).toBeTruthy();
      const selectInput = renderedComponent.getByTestId(
        "command-palette-input"
      ) as HTMLInputElement;

      await TestUtils.flushAsyncOperations();
      const history2 = await waitFor(() =>
        renderedComponent.getByTitle("history2")
      );
      expect(history2).toBeTruthy();
      expect(renderedComponent.container.querySelectorAll("li").length).toEqual(
        4
      );

      fireEvent.change(selectInput, { target: { value: "two" } });
      await TestUtils.flushAsyncOperations();
      expect(renderedComponent.container.querySelectorAll("li").length).toEqual(
        1
      );
      fireEvent.keyDown(selectInput, { key: Key.Enter, ctrlKey: true });
      await TestUtils.flushAsyncOperations();
      fireEvent.change(selectInput, { target: { value: "two" } });
      await TestUtils.flushAsyncOperations();
      fireEvent.keyDown(selectInput, { key: Key.Tab });
    });

    it("Handles keyboard running selection", async () => {
      const keyins: KeyinEntry[] = [
        { value: "keyin one" },
        { value: "keyin two" },
      ];
      const renderedComponent = render(<KeyinPalettePanel keyins={keyins} />);
      expect(renderedComponent).toBeTruthy();
      const selectInput = renderedComponent.getByTestId(
        "command-palette-input"
      ) as HTMLInputElement;
      fireEvent.keyDown(selectInput, { key: Key.ArrowDown });

      await TestUtils.flushAsyncOperations();
      const listComponent = renderedComponent.container.querySelector("ul");
      expect(listComponent).toBeTruthy();
      fireEvent.keyDown(listComponent!, { key: Key.ArrowDown });
      fireEvent.keyDown(listComponent!, { key: Key.Enter });
    });

    it("Handles listbox click processing", async () => {
      const uiSettingsStorage = UiFramework.getUiStateStorage();
      if (uiSettingsStorage) {
        await uiSettingsStorage.saveSetting(
          KEYIN_PALETTE_NAMESPACE,
          KEYIN_HISTORY_KEY,
          ["history1", "history2", "bogus"]
        );
      }
      const keyins: KeyinEntry[] = [
        { value: "keyin one" },
        { value: "keyin two" },
      ];
      const renderedComponent = render(<KeyinPalettePanel keyins={keyins} />);
      expect(renderedComponent).toBeTruthy();
      await TestUtils.flushAsyncOperations();
      const history2 = await waitFor(() =>
        renderedComponent.getByTitle("history2")
      );
      expect(history2).toBeTruthy();

      const selectInput = renderedComponent.getByTestId(
        "command-palette-input"
      ) as HTMLInputElement;
      expect(selectInput.value.length === 0);
      const liItems = renderedComponent.container.querySelectorAll("li");
      expect(liItems.length).toEqual(4);
      fireEvent.click(liItems[1]);
      expect(selectInput.value.length > 0);
    });

    it("Handles listbox CTRL+click processing", async () => {
      const uiSettingsStorage = UiFramework.getUiStateStorage();
      if (uiSettingsStorage) {
        await uiSettingsStorage.saveSetting(
          KEYIN_PALETTE_NAMESPACE,
          KEYIN_HISTORY_KEY,
          ["history1", "history2", "bogus"]
        );
      }
      const keyins: KeyinEntry[] = [
        { value: "keyin one" },
        { value: "keyin two" },
      ];
      const renderedComponent = render(<KeyinPalettePanel keyins={keyins} />);
      expect(renderedComponent).toBeTruthy();
      await TestUtils.flushAsyncOperations();
      const history2 = await waitFor(() =>
        renderedComponent.getByTitle("history2")
      );
      expect(history2).toBeTruthy();

      const selectInput = renderedComponent.getByTestId(
        "command-palette-input"
      ) as HTMLInputElement;
      expect(selectInput.value.length === 0);
      // force a list item to get focus so focus value is set
      fireEvent.keyDown(selectInput, { key: Key.ArrowDown });

      const liItems = renderedComponent.container.querySelectorAll("li");
      expect(liItems.length).toEqual(4);
      fireEvent.click(liItems[1], { ctrlKey: true });
      expect(selectInput.value.length > 0);
    });
  });
});
