/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import { BadgeType } from "@itwin/core-react";
import type { CursorMenuItemProps } from "../../appui-react/shared/MenuItem.js";
import {
  MenuItem,
  MenuItemHelpers,
} from "../../appui-react/shared/MenuItem.js";
import TestUtils, { childStructure, selectorMatches } from "../TestUtils.js";

describe("MenuItem", () => {
  const createBubbledEvent = (type: string, props = {}) => {
    return TestUtils.createBubbledEvent(type, props);
  };

  it("should create a valid MenuItem", () => {
    const menuItem = new MenuItem({
      id: "test",
      item: {
        label: "test label",
        icon: "icon-placeholder",
        execute: () => {},
      },
    });

    expect(menuItem.id).toEqual("test");
    expect(menuItem.label).toEqual("test label");
    expect(menuItem.iconSpec).toEqual("icon-placeholder");
    expect(menuItem.actionItem).toBeTruthy();
    expect(menuItem.submenu.length).toEqual(0);
  });

  it("should handle label & icon correctly", () => {
    const menuItem = new MenuItem({
      id: "test",
      label: "test label",
      icon: "icon-placeholder",
      iconRight: "icon-checkmark",
      item: { label: "wrong label", icon: "wrong icon", execute: () => {} },
    });

    expect(menuItem.id).toEqual("test");
    expect(menuItem.label).toEqual("test label");
    expect(menuItem.iconSpec).toEqual("icon-placeholder");
    expect(menuItem.iconRightSpec).toEqual("icon-checkmark");
  });

  it("should create a valid submenu", () => {
    const menuItem = new MenuItem({
      id: "test",
      label: "test label",
      icon: "icon-placeholder",
      submenu: [
        {
          id: "0",
          item: {
            label: "Mode 1",
            icon: "icon-placeholder",
            execute: () => {},
          },
        },
        {
          id: "1",
          item: {
            label: "Mode 2",
            icon: "icon-placeholder",
            execute: () => {},
          },
        },
      ],
    });

    expect(menuItem.id).toEqual("test");
    expect(menuItem.label).toEqual("test label");
    expect(menuItem.iconSpec).toEqual("icon-placeholder");
    expect(menuItem.submenu.length).toEqual(2);
  });

  it("should throw an exception with item or submenu", () => {
    expect(() => {
      new MenuItem({
        id: "test",
      });
    }).toThrow(Error);
  });

  it("createMenuItems should create a valid MenuItem", () => {
    const cursorMenuItemProps: CursorMenuItemProps[] = [
      {
        id: "test",
        item: {
          label: "test label",
          icon: "icon-placeholder",
          execute: () => {},
        },
      },
    ];

    const menuItems = MenuItemHelpers.createMenuItems(cursorMenuItemProps);

    expect(menuItems.length).toEqual(1);

    const menuItem = menuItems[0];
    expect(menuItem.id).toEqual("test");
    expect(menuItem.label).toEqual("test label");
    expect(menuItem.iconSpec).toEqual("icon-placeholder");
    expect(menuItem.actionItem).toBeTruthy();
    expect(menuItem.submenu.length).toEqual(0);
  });

  it("createMenuItems should create a valid submenu", () => {
    const cursorMenuItemProps: CursorMenuItemProps[] = [
      {
        id: "test",
        label: "test label",
        icon: "icon-placeholder",
        submenu: [
          {
            id: "0",
            item: {
              label: "Mode 1",
              icon: "icon-placeholder",
              execute: () => {},
            },
          },
          {
            id: "1",
            item: {
              label: "Mode 2",
              icon: "icon-placeholder",
              execute: () => {},
            },
          },
        ],
      },
    ];

    const menuItems = MenuItemHelpers.createMenuItems(cursorMenuItemProps);

    expect(menuItems.length).toEqual(1);

    const menuItem = menuItems[0];
    expect(menuItem.id).toEqual("test");
    expect(menuItem.label).toEqual("test label");
    expect(menuItem.iconSpec).toEqual("icon-placeholder");
    expect(menuItem.submenu.length).toEqual(2);
  });

  it("createMenuItemNodes should create a valid MenuItem", () => {
    const cursorMenuItemProps: CursorMenuItemProps[] = [
      {
        id: "test",
        badgeType: BadgeType.New,
        isDisabled: true,
        item: {
          label: "test label",
          icon: "icon-placeholder",
          execute: () => {},
        },
        iconRight: "icon-checkmark",
      },
    ];

    const menuItems = MenuItemHelpers.createMenuItems(cursorMenuItemProps);
    expect(menuItems.length).toEqual(1);

    const menuItemNodes = MenuItemHelpers.createMenuItemNodes(menuItems);
    expect(menuItemNodes.length).toEqual(1);

    const component = render(<div>{menuItemNodes}</div>);

    expect(component.getByRole("menuitem"))
      .satisfy(
        selectorMatches(".core-context-menu-item.core-context-menu-disabled")
      )
      .satisfy(
        childStructure([
          ".core-context-menu-icon-right > .icon.icon-checkmark",
          ".core-context-menu-item > .core-context-menu-icon > .icon.icon-placeholder",
          ".core-context-menu-badge .core-badge-newBadge",
        ])
      );
  });

  it("createMenuItemNodes should create a valid MenuItem without item prop", () => {
    const cursorMenuItemProps: CursorMenuItemProps[] = [
      {
        id: "test",
        badgeKind: "technical-preview",
        isDisabled: true,
        label: "test label",
        icon: "icon-placeholder",
        execute: () => {},
        iconRight: "icon-checkmark",
      },
    ];

    const menuItems = MenuItemHelpers.createMenuItems(cursorMenuItemProps);
    expect(menuItems.length).toEqual(1);

    const menuItemNodes = MenuItemHelpers.createMenuItemNodes(menuItems);
    expect(menuItemNodes.length).toEqual(1);

    const component = render(<div>{menuItemNodes}</div>);

    expect(component.getByRole("menuitem"))
      .satisfy(
        selectorMatches(".core-context-menu-item.core-context-menu-disabled")
      )
      .satisfy(
        childStructure([
          ".core-context-menu-icon-right > .icon.icon-checkmark",
          ".core-context-menu-item > .core-context-menu-icon > .icon.icon-placeholder",
          ".core-context-menu-badge .core-badge-technicalPreviewBadge",
        ])
      );
  });

  it("createMenuItemNodes abstract disabled item should create a disabled MenuItem", () => {
    const cursorMenuItemProps: CursorMenuItemProps[] = [
      {
        id: "test",
        badgeType: BadgeType.New,
        item: {
          label: "test label",
          isDisabled: true,
          icon: "icon-placeholder",
          execute: () => {},
        },
        iconRight: "icon-checkmark",
      },
    ];

    const menuItems = MenuItemHelpers.createMenuItems(cursorMenuItemProps);
    expect(menuItems.length).toEqual(1);

    const menuItemNodes = MenuItemHelpers.createMenuItemNodes(menuItems);
    expect(menuItemNodes.length).toEqual(1);

    const component = render(<div>{menuItemNodes}</div>);

    expect(component.getByRole("menuitem")).satisfy(
      selectorMatches(".core-context-menu-item.core-context-menu-disabled")
    );
  });

  it("onSelect handled correctly on click", async () => {
    const handleSelect = vi.fn();
    const handleSelect2 = vi.fn();

    const cursorMenuItemProps: CursorMenuItemProps[] = [
      {
        id: "test",
        item: {
          label: "test label",
          icon: "icon-placeholder",
          badgeType: BadgeType.New,
          execute: handleSelect,
        },
      },
    ];

    const menuItems = MenuItemHelpers.createMenuItems(
      cursorMenuItemProps,
      handleSelect2
    );
    expect(menuItems.length).toEqual(1);

    const menuItemNodes = MenuItemHelpers.createMenuItemNodes(menuItems);
    expect(menuItemNodes.length).toEqual(1);

    const component = render(<div>{menuItemNodes}</div>);
    const item = component.getByTestId("core-context-menu-item");
    item.dispatchEvent(createBubbledEvent("click"));

    await TestUtils.flushAsyncOperations();
    expect(handleSelect).toHaveBeenCalledOnce();
    expect(handleSelect2).toHaveBeenCalledOnce();
    expect(
      component.container.querySelector(".core-badge-newBadge")
    ).toBeTruthy();
  });

  it("createMenuItemNodes should create a valid submenu", () => {
    const cursorMenuItemProps: CursorMenuItemProps[] = [
      {
        id: "test",
        label: "test label",
        icon: "icon-placeholder",
        submenu: [
          {
            id: "0",
            item: {
              label: "Mode 1",
              icon: "icon-placeholder",
              execute: () => {},
            },
          },
          {
            id: "1",
            item: {
              label: "Mode 2",
              icon: "icon-placeholder",
              execute: () => {},
            },
          },
        ],
      },
    ];

    const menuItems = MenuItemHelpers.createMenuItems(cursorMenuItemProps);
    expect(menuItems.length).toEqual(1);

    const menuItemNodes = MenuItemHelpers.createMenuItemNodes(menuItems);
    expect(menuItemNodes.length).toEqual(1);

    const component = render(<div>{menuItemNodes}</div>);

    expect(component.getByText("Mode 2")).toSatisfy(
      selectorMatches(
        ".core-context-submenu .core-context-submenu-popup .core-context-menu-container .core-context-menu-content"
      )
    );
  });
});
