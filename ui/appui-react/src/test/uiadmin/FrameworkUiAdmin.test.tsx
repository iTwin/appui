/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation */
import * as React from "react";
import { render } from "@testing-library/react";
import type {
  AbstractMenuItemProps,
  AbstractToolbarProps,
  DialogButtonDef,
  DialogItem,
  DialogItemValue,
  DialogPropertyItem,
  DialogPropertySyncItem,
  PropertyChangeResult,
  PropertyDescription,
} from "@itwin/appui-abstract";
import {
  DialogButtonType,
  DialogLayoutDataProvider,
  PropertyChangeStatus,
  RelativePosition,
  StandardTypeNames,
} from "@itwin/appui-abstract";
import { Point } from "@itwin/core-react";
import {
  CursorInformation,
  FrameworkUiAdmin,
  KeyinFieldLocalization,
} from "../../appui-react";
import { ClearKeyinPaletteHistoryTool } from "../../appui-react/tools/KeyinPaletteTools";
import * as keyinExports from "../../appui-react/popup/KeyinPalettePanel";
import { Tool } from "@itwin/core-frontend";
import { Button } from "@itwin/itwinui-react";

class TestDialogUiDataProvider extends DialogLayoutDataProvider {
  public currentPageIndex = 0;
  public numberOfPages = 2;
  public static userPropertyName = "username";
  private static _getUserDescription = (): PropertyDescription => {
    return {
      name: TestDialogUiDataProvider.userPropertyName,
      displayLabel: "User",
      typename: StandardTypeNames.String,
    };
  };

  private _userValue: DialogItemValue = { value: "unknown" };
  private get user(): string {
    return this._userValue.value as string;
  }
  private set user(option: string) {
    this._userValue.value = option;
  }

  public static cityPropertyName = "city";
  private static _getCityDescription = (): PropertyDescription => {
    return {
      name: TestDialogUiDataProvider.cityPropertyName,
      displayLabel: "City",
      typename: StandardTypeNames.String,
    };
  };

  private _cityValue: DialogItemValue = { value: "unknown" };
  private get city(): string {
    return this._cityValue.value as string;
  }
  private set city(option: string) {
    this._cityValue.value = option;
  }

  // called to apply a single property value change.
  public override applyUiPropertyChange = (
    updatedValue: DialogPropertySyncItem
  ): void => {
    this.processChangesInUi([updatedValue]);
  };

  /** Called by UI to inform data provider of changes.  */
  public override processChangesInUi(
    properties: DialogPropertyItem[]
  ): PropertyChangeResult {
    if (properties.length > 0) {
      for (const prop of properties) {
        if (prop.propertyName === TestDialogUiDataProvider.userPropertyName) {
          this.user = prop.value.value ? (prop.value.value as string) : "";
          continue;
        } else if (
          prop.propertyName === TestDialogUiDataProvider.cityPropertyName
        ) {
          this.city = prop.value.value ? (prop.value.value as string) : "";
          continue;
        }
      }
    }

    this.fireDialogButtonsReloadEvent();
    return { status: PropertyChangeStatus.Success };
  }

  /** Used Called by UI to request available properties when UI is manually created. */
  public override supplyDialogItems(): DialogItem[] | undefined {
    const items: DialogItem[] = [];

    items.push({
      value: this._userValue,
      property: TestDialogUiDataProvider._getUserDescription(),
      editorPosition: { rowPriority: 1, columnIndex: 1 },
    });
    if (this.currentPageIndex > 0) {
      items.push({
        value: this._cityValue,
        property: TestDialogUiDataProvider._getCityDescription(),
        editorPosition: { rowPriority: 2, columnIndex: 1 },
      });
    }
    return items;
  }

  public handleNext = () => {
    if (this.currentPageIndex < this.numberOfPages) {
      this.currentPageIndex++;
      this.reloadDialogItems();
    }
  };

  public handlePrevious = () => {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
      this.reloadDialogItems();
    }
  };

  public override supplyButtonData(): DialogButtonDef[] | undefined {
    const buttons: DialogButtonDef[] = [];

    if (this.currentPageIndex > 0 && this.currentPageIndex < this.numberOfPages)
      buttons.push({
        type: DialogButtonType.Previous,
        onClick: this.handlePrevious,
      });

    if (this.currentPageIndex < this.numberOfPages - 1)
      buttons.push({ type: DialogButtonType.Next, onClick: this.handleNext });

    if (this.currentPageIndex === this.numberOfPages - 1) {
      buttons.push({
        type: DialogButtonType.OK,
        onClick: () => {},
        disabled: this.user === "unknown" || this.city === "unknown",
      });
    }

    buttons.push({ type: DialogButtonType.Cancel, onClick: () => {} });
    return buttons;
  }
}

const descriptorToRestore1 = Object.getOwnPropertyDescriptor(
  Tool,
  "englishKeyin"
)!;
const descriptorToRestore2 = Object.getOwnPropertyDescriptor(Tool, "keyin")!;

describe("FrameworkUiAdmin", () => {
  let uiAdmin: FrameworkUiAdmin;

  // avoid problems due to no real localization resources by return dummy values for englishKeyin and keyin properties.
  beforeEach(() => {
    Object.defineProperty(Tool, "englishKeyin", {
      get: () => {
        return "english";
      },
    });

    Object.defineProperty(Tool, "keyin", {
      get: () => {
        return "localized";
      },
    });

    uiAdmin = new FrameworkUiAdmin();
  });

  afterEach(() => {
    Object.defineProperty(Tool, "englishKeyin", descriptorToRestore1);
    Object.defineProperty(Tool, "keyin", descriptorToRestore2);
  });

  it("onInitialized should do nothing", () => {
    uiAdmin.onInitialized();
  });

  it("cursorPosition should return cursor position", () => {
    CursorInformation.cursorPosition = new Point(100, 200);
    expect(uiAdmin.cursorPosition.x).toEqual(100);
    expect(uiAdmin.cursorPosition.y).toEqual(200);
  });

  it("setFocusToHome should set focus to home", () => {
    const buttonElement = document.createElement("button");
    document.body.appendChild(buttonElement);
    buttonElement.focus();
    let activeElement = document.activeElement as HTMLElement;
    expect(activeElement === buttonElement).toEqual(true);
    expect(uiAdmin.isFocusOnHome).toEqual(false);

    uiAdmin.setFocusToHome();
    activeElement = document.activeElement as HTMLElement;
    expect(activeElement === document.body).toEqual(true);
    expect(uiAdmin.isFocusOnHome).toEqual(true);
    document.body.removeChild(buttonElement);
  });

  it("showContextMenu should return true", () => {
    const wrapper = render(<div id="uifw-configurableui-wrapper" />);
    const menuItemProps: AbstractMenuItemProps[] = [
      {
        id: "test",
        item: {
          label: "test label",
          icon: "icon-placeholder",
          execute: () => {},
        },
      },
      {
        id: "test2",
        item: {
          label: "test label",
          icon: "icon-placeholder",
          execute: () => {},
        },
      },
    ];

    expect(
      uiAdmin.showContextMenu(
        menuItemProps,
        { x: 150, y: 250 },
        wrapper.container
      )
    ).toEqual(true);
    expect(uiAdmin.showContextMenu(menuItemProps, { x: 150, y: 250 })).toEqual(
      true
    );
  });

  it("showToolbar should return true", () => {
    const wrapper = render(<div id="uifw-configurableui-wrapper" />);
    const toolbarProps: AbstractToolbarProps = {
      toolbarId: "test",
      items: [
        {
          id: "tool",
          itemPriority: 1,
          label: "tool label",
          icon: "icon-placeholder",
          execute: () => {},
        },
        {
          id: "command",
          itemPriority: 2,
          label: "command label",
          icon: "icon-placeholder",
          execute: () => {},
        },
        {
          id: "command2",
          itemPriority: 3,
          label: "command label",
          icon: "icon-placeholder",
          execute: () => {},
        },
      ],
    };

    const spySelect = vi.fn();
    const spyCancel = vi.fn();

    expect(
      uiAdmin.showToolbar(
        toolbarProps,
        { x: 150, y: 250 },
        { x: 8, y: 8 },
        spySelect,
        spyCancel,
        RelativePosition.BottomRight,
        wrapper.container
      )
    ).toEqual(true);
    document = wrapper.container.ownerDocument;
    expect(
      uiAdmin.showToolbar(
        toolbarProps,
        { x: 150, y: 250 },
        { x: 8, y: 8 },
        spySelect,
        spyCancel
      )
    ).toEqual(true);
    expect(uiAdmin.hideToolbar()).toEqual(true);
  });

  it("showMenuButton should return true", () => {
    const wrapper = render(<div id="uifw-configurableui-wrapper" />);
    const menuItemProps: AbstractMenuItemProps[] = [
      {
        id: "test",
        item: {
          label: "test label",
          icon: "icon-placeholder",
          execute: () => {},
        },
      },
      {
        id: "test2",
        item: {
          label: "test label",
          icon: "icon-placeholder",
          execute: () => {},
        },
      },
    ];
    expect(
      uiAdmin.showMenuButton(
        "test",
        menuItemProps,
        { x: 150, y: 250 },
        wrapper.container
      )
    ).toEqual(true);
    expect(
      uiAdmin.showMenuButton("test", menuItemProps, { x: 150, y: 250 })
    ).toEqual(true);
    expect(uiAdmin.hideMenuButton("test")).toEqual(true);
  });

  it("showKeyinPalette should return true", () => {
    const wrapper = render(<div id="uifw-configurableui-wrapper" />);
    expect(uiAdmin.showKeyinPalette(wrapper.container)).toEqual(false);
    expect(uiAdmin.hideKeyinPalette()).toEqual(false);
    uiAdmin.updateFeatureFlags({ allowKeyinPalette: true });
    expect(uiAdmin.showKeyinPalette(wrapper.container)).toEqual(true);
    expect(uiAdmin.hideKeyinPalette()).toEqual(true);
  });

  it("showCalculator should return true", () => {
    const wrapper = render(<div id="uifw-configurableui-wrapper" />);
    const spyCommit = vi.fn();
    const spyCancel = vi.fn();

    expect(
      uiAdmin.showCalculator(
        100,
        "icon-placeholder",
        { x: 150, y: 250 },
        spyCommit,
        spyCancel,
        wrapper.container
      )
    ).toEqual(true);
    document = wrapper.container.ownerDocument;
    expect(
      uiAdmin.showCalculator(
        100,
        "icon-placeholder",
        { x: 150, y: 250 },
        spyCommit,
        spyCancel
      )
    ).toEqual(true);
    expect(uiAdmin.hideCalculator()).toEqual(true);
  });

  it("showAngleEditor should return true", () => {
    const wrapper = render(<div id="uifw-configurableui-wrapper" />);
    const spyCommit = vi.fn();
    const spyCancel = vi.fn();

    expect(
      uiAdmin.showAngleEditor(
        100,
        { x: 150, y: 250 },
        spyCommit,
        spyCancel,
        wrapper.container
      )
    ).toEqual(true);
    document = wrapper.container.ownerDocument;
    expect(
      uiAdmin.showAngleEditor(100, { x: 150, y: 250 }, spyCommit, spyCancel)
    ).toEqual(true);
    expect(uiAdmin.hideInputEditor()).toEqual(true);
  });

  it("showLengthEditor should return true", () => {
    const wrapper = render(<div id="uifw-configurableui-wrapper" />);
    const spyCommit = vi.fn();
    const spyCancel = vi.fn();

    expect(
      uiAdmin.showLengthEditor(
        100,
        { x: 150, y: 250 },
        spyCommit,
        spyCancel,
        wrapper.container
      )
    ).toEqual(true);
    document = wrapper.container.ownerDocument;
    expect(
      uiAdmin.showLengthEditor(100, { x: 150, y: 250 }, spyCommit, spyCancel)
    ).toEqual(true);
    expect(uiAdmin.hideInputEditor()).toEqual(true);
  });

  it("showHeightEditor should return true", () => {
    const wrapper = render(<div id="uifw-configurableui-wrapper" />);
    const spyCommit = vi.fn();
    const spyCancel = vi.fn();

    expect(
      uiAdmin.showHeightEditor(
        100,
        { x: 150, y: 250 },
        spyCommit,
        spyCancel,
        wrapper.container
      )
    ).toEqual(true);
    document = wrapper.container.ownerDocument;
    expect(
      uiAdmin.showHeightEditor(100, { x: 150, y: 250 }, spyCommit, spyCancel)
    ).toEqual(true);
    expect(uiAdmin.hideInputEditor()).toEqual(true);
  });

  it("showInputEditor should return true", () => {
    const wrapper = render(<div id="uifw-configurableui-wrapper" />);
    const spyCommit = vi.fn();
    const spyCancel = vi.fn();
    const propertyDescription: PropertyDescription = {
      name: "test",
      displayLabel: "Test",
      typename: "number",
    };

    expect(
      uiAdmin.showInputEditor(
        100,
        propertyDescription,
        { x: 150, y: 250 },
        spyCommit,
        spyCancel,
        wrapper.container
      )
    ).toEqual(true);
    document = wrapper.container.ownerDocument;
    expect(
      uiAdmin.showInputEditor(
        100,
        propertyDescription,
        { x: 150, y: 250 },
        spyCommit,
        spyCancel
      )
    ).toEqual(true);
    expect(uiAdmin.hideInputEditor()).toEqual(true);
  });

  it("showHTMLElement should return true", () => {
    const html =
      "<div style='width: 120px; height: 50px; display: flex; justify-content: center; align-items: center; background-color: aqua;'>Hello World!</div>";
    const display = new DOMParser().parseFromString(html, "text/html");
    const wrapper = render(<div id="uifw-configurableui-wrapper" />);
    const spyCancel = vi.fn();

    expect(
      uiAdmin.showHTMLElement(
        display.documentElement,
        { x: 150, y: 250 },
        { x: 8, y: 8 },
        spyCancel,
        RelativePosition.BottomRight,
        wrapper.container
      )
    ).toEqual(true);
    document = wrapper.container.ownerDocument;
    expect(
      uiAdmin.showHTMLElement(
        display.documentElement,
        { x: 150, y: 250 },
        { x: 8, y: 8 },
        spyCancel,
        RelativePosition.BottomRight
      )
    ).toEqual(true);
    expect(
      uiAdmin.showHTMLElement(
        display.documentElement,
        { x: 150, y: 250 },
        { x: 8, y: 8 },
        spyCancel
      )
    ).toEqual(true);
    expect(uiAdmin.hideHTMLElement()).toEqual(true);
  });

  it("showCard should return true", () => {
    const html =
      '<div style="width: 120px; height: 50px; display: flex; justify-content: center; align-items: center; background-color: aqua;">Hello World!</div>';
    const content = new DOMParser().parseFromString(html, "text/html");
    const toolbarProps: AbstractToolbarProps = {
      toolbarId: "test",
      items: [
        {
          id: "tool",
          itemPriority: 10,
          label: "tool label",
          icon: "icon-placeholder",
          execute: () => {},
        },
        {
          id: "command",
          itemPriority: 20,
          label: "command label",
          icon: "icon-placeholder",
          execute: () => {},
        },
        {
          id: "command2",
          itemPriority: 30,
          label: "command label",
          icon: "icon-placeholder",
          execute: () => {},
        },
      ],
    };
    const spySelect = vi.fn();
    const spyCancel = vi.fn();
    const wrapper = render(<div id="uifw-configurableui-wrapper" />);

    expect(
      uiAdmin.showCard(
        content.documentElement,
        "Title",
        toolbarProps,
        { x: 150, y: 250 },
        { x: 8, y: 8 },
        spySelect,
        spyCancel,
        RelativePosition.BottomRight,
        wrapper.container
      )
    ).toEqual(true);
    document = wrapper.container.ownerDocument;
    expect(
      uiAdmin.showCard(
        content.documentElement,
        "Title",
        toolbarProps,
        { x: 150, y: 250 },
        { x: 8, y: 8 },
        spySelect,
        spyCancel,
        RelativePosition.BottomRight
      )
    ).toEqual(true);
    expect(
      uiAdmin.showCard(
        content.documentElement,
        "Title",
        toolbarProps,
        { x: 150, y: 250 },
        { x: 8, y: 8 },
        spySelect,
        spyCancel
      )
    ).toEqual(true);
    expect(uiAdmin.hideCard()).toEqual(true);
    expect(uiAdmin.hideCard()).toEqual(false);
  });

  it("showReactCard should return true", () => {
    const content = <Button>Label</Button>;
    const toolbarProps: AbstractToolbarProps = {
      toolbarId: "test",
      items: [
        {
          id: "tool",
          itemPriority: 10,
          label: "tool label",
          icon: "icon-placeholder",
          execute: () => {},
        },
        {
          id: "command",
          itemPriority: 20,
          label: "command label",
          icon: "icon-placeholder",
          execute: () => {},
        },
        {
          id: "command2",
          itemPriority: 30,
          label: "command label",
          icon: "icon-placeholder",
          execute: () => {},
        },
      ],
    };
    const spySelect = vi.fn();
    const spyCancel = vi.fn();
    const wrapper = render(<div id="uifw-configurableui-wrapper" />);

    expect(
      uiAdmin.showReactCard(
        content,
        "Title",
        toolbarProps,
        { x: 150, y: 250 },
        { x: 8, y: 8 },
        spySelect,
        spyCancel,
        RelativePosition.BottomRight,
        wrapper.container
      )
    ).toEqual(true);
    document = wrapper.container.ownerDocument;
    expect(
      uiAdmin.showReactCard(
        content,
        "Title",
        toolbarProps,
        { x: 150, y: 250 },
        { x: 8, y: 8 },
        spySelect,
        spyCancel,
        RelativePosition.BottomRight
      )
    ).toEqual(true);
    expect(
      uiAdmin.showReactCard(
        content,
        "Title",
        toolbarProps,
        { x: 150, y: 250 },
        { x: 8, y: 8 },
        spySelect,
        spyCancel
      )
    ).toEqual(true);
    expect(uiAdmin.hideCard()).toEqual(true);
    expect(uiAdmin.hideCard()).toEqual(false);
  });

  it("openToolSettingsPopup should return true", () => {
    class TestUiDataProvider extends DialogLayoutDataProvider {}
    const uiDataProvider = new TestUiDataProvider();
    const wrapper = render(<div id="uifw-configurableui-wrapper" />);
    const spyCancel = vi.fn();

    expect(
      uiAdmin.openToolSettingsPopup(
        uiDataProvider,
        { x: 150, y: 250 },
        { x: 8, y: 8 },
        spyCancel,
        RelativePosition.BottomRight,
        wrapper.container
      )
    ).toEqual(true);
    document = wrapper.container.ownerDocument;
    expect(
      uiAdmin.openToolSettingsPopup(
        uiDataProvider,
        { x: 150, y: 250 },
        { x: 8, y: 8 },
        spyCancel,
        RelativePosition.BottomRight
      )
    ).toEqual(true);
    expect(
      uiAdmin.openToolSettingsPopup(
        uiDataProvider,
        { x: 150, y: 250 },
        { x: 8, y: 8 },
        spyCancel
      )
    ).toEqual(true);
    expect(uiAdmin.closeToolSettingsPopup()).toEqual(true);
  });

  it("should ClearKeyinPaletteHistoryTool", async () => {
    const stub = vi
      .spyOn(keyinExports, "clearKeyinPaletteHistory")
      .mockReturnValue();
    const tool = new ClearKeyinPaletteHistoryTool();
    await tool.parseAndRun();
    expect(stub).toHaveBeenCalledOnce();
  });

  it("should get/set keyin preference", () => {
    expect(uiAdmin.localizedKeyinPreference).toEqual(
      KeyinFieldLocalization.NonLocalized
    );
    const nonLocalKeyins = uiAdmin.getKeyins();
    uiAdmin.localizedKeyinPreference = KeyinFieldLocalization.Localized;
    const localizedKeyins = uiAdmin.getKeyins();
    expect(localizedKeyins.length === nonLocalKeyins.length);
    uiAdmin.localizedKeyinPreference = KeyinFieldLocalization.Both;
    let bothKeyins = uiAdmin.getKeyins();
    expect(bothKeyins.length > nonLocalKeyins.length);
    expect(uiAdmin.localizedKeyinPreference).toEqual(
      KeyinFieldLocalization.Both
    );
    // test when both keyin and english keyin are the same
    Object.defineProperty(Tool, "keyin", {
      get: () => {
        return "english";
      },
    });
    bothKeyins = uiAdmin.getKeyins();
  });

  it("openUiDialog (modal) should return true", () => {
    const wrapper = render(<div id="uifw-configurableui-wrapper" />);
    document = wrapper.container.ownerDocument;
    const uiDataProvider = new TestDialogUiDataProvider();
    expect(
      uiAdmin.openDialog(uiDataProvider, "title", true, "modal-id")
    ).toEqual(true);
    expect(uiAdmin.closeDialog("modal-id")).toEqual(true);
  });

  it("openUiDialog (modeless) should return true", () => {
    const wrapper = render(<div id="uifw-configurableui-wrapper" />);
    document = wrapper.container.ownerDocument;
    const uiDataProvider = new TestDialogUiDataProvider();
    expect(
      uiAdmin.openDialog(uiDataProvider, "title", false, "modeless-id")
    ).toEqual(true);
    expect(uiAdmin.closeDialog("modeless-id")).toEqual(true);
  });
});
