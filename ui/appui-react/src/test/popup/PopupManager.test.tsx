/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Logger } from "@itwin/core-bentley";
import { IModelApp, LengthDescription } from "@itwin/core-frontend";
import type {
  AbstractToolbarProps,
  DialogItem,
  DialogItemValue,
  DialogPropertyItem,
  DialogPropertySyncItem,
  PropertyChangeResult,
  PropertyDescription,
} from "@itwin/appui-abstract";
import {
  DialogLayoutDataProvider,
  PropertyChangeStatus,
  RelativePosition,
  StandardTypeNames,
} from "@itwin/appui-abstract";
import { BadgeType } from "@itwin/core-react";
import { Point } from "@itwin/core-react/internal";
import { AccuDrawPopupManager } from "../../appui-react/accudraw/AccuDrawPopupManager.js";
import {
  PopupManager,
  PopupRenderer,
} from "../../appui-react/popup/PopupManager.js";
import type { CursorMenuItemProps } from "../../appui-react/shared/MenuItem.js";
import TestUtils, { storageMock, userEvent } from "../TestUtils.js";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { Button } from "@itwin/itwinui-react";
import type { KeyinEntry } from "../../appui-react/keyins/Keyins.js";
const myLocalStorage = storageMock();
function requestNextAnimation() {}

describe("PopupManager", () => {
  const propertyDescriptorToRestore = Object.getOwnPropertyDescriptor(
    window,
    "localStorage"
  )!;
  const rnaDescriptorToRestore = Object.getOwnPropertyDescriptor(
    IModelApp,
    "requestNextAnimation"
  )!;

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      get: () => myLocalStorage,
    });

    // Avoid requestAnimationFrame exception during test by temporarily replacing function that calls it. Tried replacing window.requestAnimationFrame first
    // but that did not work.
    Object.defineProperty(IModelApp, "requestNextAnimation", {
      get: () => requestNextAnimation,
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
    act(() => {
      PopupManager.clearPopups();
    });
  });

  describe("Manager API", () => {
    it("showMenuButton should add menuButton", () => {
      const menuItemProps: CursorMenuItemProps[] = [
        {
          id: "test",
          item: {
            label: "test label",
            icon: "icon-placeholder",
            execute: () => {},
          },
        },
      ];
      const doc = new DOMParser().parseFromString(
        "<div>xyz</div>",
        "text/html"
      );

      AccuDrawPopupManager.showMenuButton(
        "test1",
        doc.documentElement,
        new Point(150, 250),
        menuItemProps
      );

      expect(PopupManager.popupCount).toEqual(1);
      let popup = PopupManager.popups[0];
      expect(popup.id).toEqual("test1");
      expect(popup.pt.x).toEqual(150);
      expect(popup.pt.y).toEqual(250);

      AccuDrawPopupManager.showMenuButton(
        "test1",
        doc.documentElement,
        new Point(100, 200),
        menuItemProps
      );

      expect(PopupManager.popupCount).toEqual(1);
      popup = PopupManager.popups[0];
      expect(popup.id).toEqual("test1");
      expect(popup.pt.x).toEqual(100);
      expect(popup.pt.y).toEqual(200);
    });

    it("hideMenuButton should hide menuButton", () => {
      const menuItemProps: CursorMenuItemProps[] = [
        {
          id: "test",
          item: {
            label: "test label",
            icon: "icon-placeholder",
            execute: () => {},
          },
        },
      ];
      const doc = new DOMParser().parseFromString(
        "<div>xyz</div>",
        "text/html"
      );

      AccuDrawPopupManager.showMenuButton(
        "test1",
        doc.documentElement,
        new Point(150, 250),
        menuItemProps
      );

      expect(PopupManager.popupCount).toEqual(1);
      const popup = PopupManager.popups[0];
      expect(popup.id).toEqual("test1");

      AccuDrawPopupManager.hideMenuButton("test1");

      expect(PopupManager.popupCount).toEqual(0);
    });

    it("hideMenuButton should log error when invalid id passed", () => {
      const spy = vi.spyOn(Logger, "logError");

      AccuDrawPopupManager.hideMenuButton("invalid-id");

      expect(spy).toHaveBeenCalledOnce();
    });

    it("showCalculator should show Calculator", () => {
      const doc = new DOMParser().parseFromString(
        "<div>xyz</div>",
        "text/html"
      );
      const spyOk = vi.fn();
      const spyCancel = vi.fn();

      AccuDrawPopupManager.showCalculator(
        doc.documentElement,
        new Point(150, 250),
        100,
        "icon-placeholder",
        spyOk,
        spyCancel
      );

      expect(PopupManager.popupCount).toEqual(1);
      let popup = PopupManager.popups[0];
      expect(popup.pt.x).toEqual(150);
      expect(popup.pt.y).toEqual(250);

      AccuDrawPopupManager.showCalculator(
        doc.documentElement,
        new Point(100, 200),
        100,
        "icon-placeholder",
        spyOk,
        spyCancel
      );

      expect(PopupManager.popupCount).toEqual(1);
      popup = PopupManager.popups[0];
      expect(popup.pt.x).toEqual(100);
      expect(popup.pt.y).toEqual(200);
    });

    it("hideCalculator should hide Calculator", () => {
      const doc = new DOMParser().parseFromString(
        "<div>xyz</div>",
        "text/html"
      );
      const spyOk = vi.fn();
      const spyCancel = vi.fn();

      AccuDrawPopupManager.showCalculator(
        doc.documentElement,
        new Point(150, 250),
        100,
        "icon-placeholder",
        spyOk,
        spyCancel
      );

      expect(PopupManager.popupCount).toEqual(1);

      AccuDrawPopupManager.hideCalculator();

      expect(PopupManager.popupCount).toEqual(0);
    });

    it("showInputEditor should show editor", () => {
      const doc = new DOMParser().parseFromString(
        "<div>xyz</div>",
        "text/html"
      );
      const spyCommit = vi.fn();
      const spyCancel = vi.fn();

      AccuDrawPopupManager.showAngleEditor(
        doc.documentElement,
        new Point(150, 250),
        123,
        spyCommit,
        spyCancel
      );

      expect(PopupManager.popupCount).toEqual(1);
      let popup = PopupManager.popups[0];
      expect(popup.pt.x).toEqual(150);
      expect(popup.pt.y).toEqual(250);

      AccuDrawPopupManager.showLengthEditor(
        doc.documentElement,
        new Point(100, 200),
        123,
        spyCommit,
        spyCancel
      );

      expect(PopupManager.popupCount).toEqual(1);
      popup = PopupManager.popups[0];
      expect(popup.pt.x).toEqual(100);
      expect(popup.pt.y).toEqual(200);

      AccuDrawPopupManager.showHeightEditor(
        doc.documentElement,
        new Point(200, 300),
        256,
        spyCommit,
        spyCancel
      );

      expect(PopupManager.popupCount).toEqual(1);
      popup = PopupManager.popups[0];
      expect(popup.pt.x).toEqual(200);
      expect(popup.pt.y).toEqual(300);

      const propertyDescription: PropertyDescription = {
        name: "test",
        displayLabel: "Test",
        typename: StandardTypeNames.Number,
      };

      PopupManager.showInputEditor(
        doc.documentElement,
        new Point(300, 400),
        256,
        propertyDescription,
        spyCommit,
        spyCancel
      );

      expect(PopupManager.popupCount).toEqual(1);
      popup = PopupManager.popups[0];
      expect(popup.pt.x).toEqual(300);
      expect(popup.pt.y).toEqual(400);
    });

    it("hideInputEditor should hide editor", () => {
      const doc = new DOMParser().parseFromString(
        "<div>xyz</div>",
        "text/html"
      );
      const spyCommit = vi.fn();
      const spyCancel = vi.fn();

      PopupManager.showInputEditor(
        doc.documentElement,
        new Point(150, 250),
        123,
        new LengthDescription(),
        spyCommit,
        spyCancel
      );

      expect(PopupManager.popupCount).toEqual(1);

      PopupManager.hideInputEditor();

      expect(PopupManager.popupCount).toEqual(0);
    });

    it("should be able to set offset", () => {
      expect(PopupManager.defaultOffset.x).toEqual(8);
      expect(PopupManager.defaultOffset.y).toEqual(8);

      PopupManager.defaultOffset = { x: 10, y: 10 };

      expect(PopupManager.defaultOffset.x).toEqual(10);
      expect(PopupManager.defaultOffset.y).toEqual(10);
    });
  });

  describe("PopupRenderer", () => {
    it("PopupRenderer should render (Mount and Unmount)", () => {
      const spyLogger = vi.spyOn(Logger, "logInfo");
      const wrapper = render(<PopupRenderer />);
      wrapper.unmount();
      expect(spyLogger).toHaveBeenCalledTimes(2);
    });

    it("PopupRenderer should render menuButton with menu item", async () => {
      const wrapper = render(<PopupRenderer />);
      const menuItemProps: CursorMenuItemProps[] = [
        {
          id: "test",
          item: {
            label: "test label",
            icon: "icon-placeholder",
            execute: () => {},
          },
        },
      ];
      AccuDrawPopupManager.showMenuButton(
        "test1",
        wrapper.container,
        new Point(150, 250),
        menuItemProps
      );
      await waitFor(() => {
        const menuButtonNode = wrapper.container.querySelector("button");
        expect(menuButtonNode).toBeTruthy();
      });
    });

    it("PopupRenderer should render Calculator", async () => {
      const wrapper = render(<PopupRenderer />);

      const spyOk = vi.fn();
      const spyCancel = vi.fn();

      AccuDrawPopupManager.showCalculator(
        wrapper.container,
        new Point(150, 250),
        100,
        "icon-placeholder",
        spyOk,
        spyCancel
      );
      await waitFor(() => {
        const calculatorDiv = wrapper.container.querySelector(
          "div.uifw-calculator"
        );
        expect(calculatorDiv).toBeTruthy();
      });
    });

    it("PopupRenderer should render InputEditor", async () => {
      const wrapper = render(<PopupRenderer />);

      const spyCommit = vi.fn();
      const spyCancel = vi.fn();
      const description: PropertyDescription = {
        name: "test",
        displayLabel: "Test",
        typename: StandardTypeNames.Text,
      };

      PopupManager.showInputEditor(
        wrapper.container,
        new Point(150, 250),
        123,
        description,
        spyCommit,
        spyCancel
      );

      await waitFor(() => {
        const firstInput = wrapper.container.querySelector("input");
        expect(firstInput).toBeTruthy();

        fireEvent.keyDown(firstInput as HTMLElement, { key: "Enter" });
      });
      await TestUtils.flushAsyncOperations();
      expect(spyCommit).toHaveBeenCalledOnce();

      PopupManager.showInputEditor(
        wrapper.container,
        new Point(150, 250),
        123,
        description,
        spyCommit,
        spyCancel
      );
      await waitFor(() => {
        const inputNode = wrapper.container.querySelector("input");
        expect(inputNode).toBeTruthy();

        fireEvent.keyDown(inputNode as HTMLElement, { key: "Escape" });
      });
      expect(spyCancel).toHaveBeenCalled();
    });

    it("PopupRenderer should render Toolbar", async () => {
      const wrapper = render(<PopupRenderer />);

      const toolbarProps: AbstractToolbarProps = {
        items: [
          {
            id: "Mode-1",
            itemPriority: 10,
            label: "Mode 1",
            icon: "icon-placeholder",
            badgeType: BadgeType.New,
            execute: () => {},
          },
          {
            id: "Mode-2",
            itemPriority: 20,
            label: "Mode 2",
            icon: "icon-placeholder",
            execute: () => {},
          },
        ],
      };

      const spyItemExecuted = vi.fn();
      const spyCancel = vi.fn();

      PopupManager.showToolbar(
        toolbarProps,
        wrapper.container,
        new Point(150, 250),
        new Point(8, 8),
        spyItemExecuted,
        spyCancel,
        RelativePosition.TopRight
      );

      await waitFor(() => {
        const buttonNodes = wrapper.container.querySelectorAll("button");
        expect(buttonNodes.length).toEqual(2);

        fireEvent.keyDown(buttonNodes[0] as HTMLElement, { key: "Escape" });
      });

      expect(spyCancel).toHaveBeenCalledOnce();
    });

    it("PopupRenderer should render HTMLElement", async () => {
      const wrapper = render(<PopupRenderer />);
      const html = "<div class='test-element'>Hello World!</div>";
      const display = new DOMParser().parseFromString(html, "text/html");
      const spyCancel = vi.fn();
      PopupManager.showHTMLElement(
        display.documentElement,
        wrapper.container,
        new Point(150, 250),
        new Point(8, 8),
        spyCancel,
        RelativePosition.TopRight
      );
      await wrapper.findByText("Hello World!");
    });

    it.skip("FLAKY:PopupRenderer should render Card", async () => {
      const wrapper = render(<PopupRenderer />);

      const html =
        '<div style="width: 120px; height: 50px; display: flex; justify-content: center; align-items: center; background-color: aqua;">Hello World!</div>';
      const content = new DOMParser().parseFromString(html, "text/html");

      const toolbarProps: AbstractToolbarProps = {
        items: [
          {
            id: "Mode-1",
            itemPriority: 10,
            label: "Mode 1",
            icon: "icon-placeholder",
            badgeType: BadgeType.New,
            execute: () => {},
          },
          {
            id: "Mode-2",
            itemPriority: 20,
            label: "Mode 2",
            icon: "icon-placeholder",
            execute: () => {},
          },
        ],
      };

      const spyItemExecuted = vi.fn();
      const spyCancel = vi.fn();

      act(() => {
        PopupManager.showCard(
          content.documentElement,
          "Title",
          toolbarProps,
          wrapper.container,
          new Point(150, 250),
          new Point(8, 8),
          spyItemExecuted,
          spyCancel,
          RelativePosition.TopRight
        );
      });
      await waitFor(() => {
        expect(
          wrapper.container.querySelectorAll("div.uifw-card-content").length
        ).toEqual(1);
      });
      wrapper.getByText("Title");

      const buttonNodes = wrapper.container.querySelectorAll("button");
      expect(buttonNodes).toBeTruthy();

      fireEvent.keyDown(buttonNodes[0] as HTMLElement, { key: "Escape" });
      await TestUtils.flushAsyncOperations();
      expect(spyCancel).toHaveBeenCalled();
      act(() => {
        PopupManager.hideCard();
      });

      const record = TestUtils.createPrimitiveStringProperty("record", "Title");
      act(() => {
        PopupManager.showCard(
          content.documentElement,
          record,
          toolbarProps,
          wrapper.container,
          new Point(150, 250),
          new Point(8, 8),
          spyItemExecuted,
          spyCancel,
          RelativePosition.TopRight
        );
      });
      expect(
        wrapper.container.querySelectorAll("div.uifw-card-content").length
      ).toEqual(1);
      wrapper.getByText("Title");
      act(() => {
        PopupManager.hideCard();
      });

      act(() => {
        PopupManager.showCard(
          content.documentElement,
          undefined,
          undefined,
          wrapper.container,
          new Point(150, 250),
          new Point(8, 8),
          spyItemExecuted,
          spyCancel,
          RelativePosition.TopRight
        );
      });
      await waitFor(() => {
        expect(
          wrapper.container.querySelectorAll("div.uifw-card-content").length
        ).toEqual(1);
      });
      act(() => {
        PopupManager.hideCard();
      });

      const reactContent = { reactNode: <Button>Label</Button> };
      act(() => {
        PopupManager.showCard(
          reactContent,
          undefined,
          undefined,
          wrapper.container,
          new Point(150, 250),
          new Point(8, 8),
          spyItemExecuted,
          spyCancel,
          RelativePosition.TopRight
        );
      });
      expect(
        wrapper.container.querySelectorAll("div.uifw-card-content").length
      ).toEqual(1);
      act(() => {
        PopupManager.hideCard();
      });
    });

    it("PopupRenderer should render Tool Settings", async () => {
      const wrapper = render(<PopupRenderer />);
      const spyChange = vi.fn();

      class TestUiDataProvider extends DialogLayoutDataProvider {
        private static _sourcePropertyName = "source";
        private static _getSourceDescription = (): PropertyDescription => {
          return {
            name: TestUiDataProvider._sourcePropertyName,
            displayLabel: "Source",
            typename: StandardTypeNames.String,
          };
        };

        private _sourceValue: DialogItemValue = { value: "unknown" };

        public get source(): string {
          return this._sourceValue.value as string;
        }

        public set source(option: string) {
          this._sourceValue.value = option;
        }

        public override applyUiPropertyChange = (
          updatedValue: DialogPropertySyncItem
        ): void => {
          if (
            updatedValue.propertyName === TestUiDataProvider._sourcePropertyName
          ) {
            this.source = updatedValue.value.value
              ? (updatedValue.value.value as string)
              : "";
            spyChange(this.source);
          }
        };

        /** Called by UI to inform data provider of changes.  */
        public override processChangesInUi(
          properties: DialogPropertyItem[]
        ): PropertyChangeResult {
          if (properties.length > 0) {
            for (const prop of properties) {
              this.applyUiPropertyChange(prop);
            }
          }
          return { status: PropertyChangeStatus.Success };
        }

        /** Used Called by UI to request available properties when UI is manually created. */
        public override supplyDialogItems(): DialogItem[] | undefined {
          return [
            {
              value: this._sourceValue,
              property: TestUiDataProvider._getSourceDescription(),
              editorPosition: { rowPriority: 1, columnIndex: 1 },
            },
          ];
        }
      }

      const uiDataProvider = new TestUiDataProvider();

      const spyCancel = vi.fn();

      PopupManager.openToolSettings(
        uiDataProvider,
        wrapper.container,
        new Point(150, 250),
        new Point(8, 8),
        spyCancel,
        RelativePosition.TopRight
      );
      await waitFor(() => {
        expect(
          wrapper.container.querySelectorAll("div.uifw-default-container")
            .length
        ).toEqual(1);
      });

      let inputNode = wrapper.container.querySelector("input");
      expect(inputNode).toBeTruthy();

      await userEvent.type(inputNode!, "test");

      fireEvent.keyDown(inputNode as HTMLElement, { key: "Enter" });
      await TestUtils.flushAsyncOperations();
      expect(spyChange).toHaveBeenCalledOnce();

      PopupManager.openToolSettings(
        uiDataProvider,
        wrapper.container,
        new Point(150, 250),
        new Point(8, 8),
        spyCancel,
        RelativePosition.TopRight
      );
      expect(
        wrapper.container.querySelectorAll("div.uifw-default-container").length
      ).toEqual(1);

      inputNode = wrapper.container.querySelector("input");
      expect(inputNode).toBeTruthy();
      fireEvent.click(inputNode as HTMLElement);
      fireEvent.keyDown(inputNode as HTMLElement, { key: "Escape" });
      await TestUtils.flushAsyncOperations();
      expect(spyCancel).toHaveBeenCalledOnce();
    });

    it("PopupRenderer should render Keyin Palette", async () => {
      const wrapper = render(<PopupRenderer />);
      const keyins: KeyinEntry[] = [
        { value: "keyin one" },
        { value: "keyin two" },
      ];
      const spyOk = vi.fn();
      const spyCancel = vi.fn();

      PopupManager.showKeyinPalette(
        keyins,
        wrapper.container,
        spyOk,
        spyCancel
      );

      await waitFor(() => {
        expect(
          wrapper.container.querySelectorAll("div.uifw-command-palette-panel")
            .length
        ).toEqual(1);
      });
      const inputNode = wrapper.container.querySelector("input");
      expect(inputNode).toBeTruthy();
      fireEvent.keyDown(inputNode as HTMLElement, { key: "Escape" });
      await TestUtils.flushAsyncOperations();
      expect(spyCancel).toHaveBeenCalledOnce();
    });
  });

  it("Popup renderer should render ComponentPopup", async () => {
    const { getByText, queryByText } = render(<PopupRenderer />);
    const component = <div>Test Component xyz1</div>;
    const spyCancel = vi.fn();

    expect(queryByText("Test Component xyz1")).toEqual(null);

    act(() => {
      PopupManager.showComponent(component, {
        location: new Point(150, 250),
        offset: new Point(8, 8),
        onCancel: spyCancel,
        placement: "top",
      });
    });

    getByText("Test Component xyz1");
  });
});
