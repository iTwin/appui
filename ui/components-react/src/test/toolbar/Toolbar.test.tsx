/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import { Key } from "ts-key-enum";
import type { ActionButton, CommonToolbarItem } from "@itwin/appui-abstract";
import { ToolbarItemUtilities } from "@itwin/appui-abstract";
import { BadgeType } from "@itwin/core-react";
import { act, fireEvent, render, renderHook } from "@testing-library/react";
import type { CustomToolbarItem } from "../../components-react/toolbar/InternalToolbarComponent";
import {
  ToolbarOpacitySetting,
  ToolbarPanelAlignment,
  ToolbarPanelAlignmentHelpers,
  useToolItemEntryContext,
} from "../../components-react/toolbar/InternalToolbarComponent";
import { Toolbar } from "../../components-react/toolbar/Toolbar";
import { Direction } from "../../components-react/toolbar/utilities/Direction";
import { BackArrow } from "../../components-react/toolbar/groupPanel/BackArrow";
import { GroupTool } from "../../components-react/toolbar/groupPanel/tool/Tool";

/* eslint-disable deprecation/deprecation */
// cSpell:ignore testid

function createBubbledEvent(type: string, props = {}) {
  const event = new Event(type, { bubbles: true });
  Object.assign(event, props);
  return event;
}

describe("<Toolbar (No Overflow) />", () => {
  describe("<Horizontal Toolbar />", () => {
    const spy = vi.fn();

    const basicToolbarItems: CommonToolbarItem[] = [
      ToolbarItemUtilities.createActionButton(
        "Entry1",
        10,
        "icon-developer",
        "Entry1",
        (): void => {},
        { badgeType: BadgeType.TechnicalPreview }
      ),
      ToolbarItemUtilities.createActionButton(
        "Entry2",
        20,
        "icon-developer",
        "Entry2",
        (): void => {}
      ),
      ToolbarItemUtilities.createActionButton(
        "Entry3",
        30,
        "icon-developer",
        "Entry3",
        (): void => {}
      ),
      ToolbarItemUtilities.createActionButton(
        "Entry4",
        40,
        "icon-developer",
        "Entry4",
        (): void => {},
        { isActive: true }
      ),
      ToolbarItemUtilities.createActionButton(
        "Entry5",
        50,
        "icon-developer",
        "Entry5",
        (): void => {},
        { isDisabled: true }
      ),
      ToolbarItemUtilities.createActionButton(
        "Entry6",
        60,
        "icon-developer",
        "Entry6",
        spy
      ),
    ];

    it(" test ToolbarPanelAlignmentHelpers", () => {
      expect(
        ToolbarPanelAlignmentHelpers.getCssClassName(
          ToolbarPanelAlignment.Start
        )
      ).toEqual(ToolbarPanelAlignmentHelpers.START_CLASS_NAME);
      expect(
        ToolbarPanelAlignmentHelpers.getCssClassName(ToolbarPanelAlignment.End)
      ).toEqual(ToolbarPanelAlignmentHelpers.END_CLASS_NAME);
    });

    it("will render 6 items", () => {
      const renderedComponent = render(<Toolbar items={basicToolbarItems} />);
      expect(renderedComponent).toBeTruthy();
      expect(renderedComponent.queryByTitle("Entry6")).toBeTruthy();
    });

    it("will render 6 items - simulate horizontal toolbar at bottom right of window.", () => {
      const renderedComponent = render(
        <Toolbar
          panelAlignment={ToolbarPanelAlignment.End}
          expandsTo={Direction.Top}
          items={basicToolbarItems}
        />
      );
      expect(renderedComponent).toBeTruthy();
      expect(renderedComponent.queryByTitle("Entry6")).toBeTruthy();
    });

    it("will render tool group", () => {
      const childItems: ActionButton[] = [
        ToolbarItemUtilities.createActionButton(
          "Child1",
          10,
          "icon-developer",
          "Child1",
          (): void => {}
        ),
        ToolbarItemUtilities.createActionButton(
          "Child2",
          20,
          "icon-developer",
          "Child2",
          (): void => {},
          { badgeType: BadgeType.TechnicalPreview }
        ),
      ];

      const toolbarItemsWithGroup: CommonToolbarItem[] = [
        ToolbarItemUtilities.createActionButton(
          "Entry1",
          10,
          "icon-developer",
          "Entry1",
          (): void => {}
        ),
        ToolbarItemUtilities.createActionButton(
          "Entry2",
          20,
          "icon-developer",
          "Entry2",
          (): void => {}
        ),
        ToolbarItemUtilities.createActionButton(
          "Entry3",
          30,
          "icon-developer",
          "Entry3",
          (): void => {}
        ),
        ToolbarItemUtilities.createActionButton(
          "Entry4",
          40,
          "icon-developer",
          "Entry4",
          (): void => {}
        ),
        ToolbarItemUtilities.createActionButton(
          "Entry5",
          50,
          "icon-developer",
          "Entry5",
          (): void => {}
        ),
        ToolbarItemUtilities.createGroupButton(
          "Group6",
          60,
          "icon-developer",
          "Group6",
          childItems,
          { isDisabled: true }
        ),
      ];

      const renderedComponent = render(
        <Toolbar
          items={toolbarItemsWithGroup}
          toolbarOpacitySetting={ToolbarOpacitySetting.Transparent}
        />
      );
      expect(renderedComponent).toBeTruthy();
      expect(renderedComponent.queryByTitle("Entry1")).toBeTruthy();
      expect(renderedComponent.queryByTitle("Entry3")).toBeTruthy();
      expect(renderedComponent.queryByTitle("Group6")).toBeTruthy();
      // since group priorities are not defined no separator class should be found.
      expect(
        renderedComponent.container.querySelectorAll(
          ".components-toolbar-button-add-gap-before"
        )
      ).toHaveLength(0);
      // badges should not be displayed when toolbar is transparent
      expect(
        renderedComponent.container.querySelectorAll(
          ".core-badge-technicalPreviewBadge"
        )
      ).toHaveLength(0);
      expect(
        renderedComponent.container.querySelectorAll(".core-badge-newBadge")
      ).toHaveLength(0);
    });

    it("will render with separators when group priority changes ", () => {
      const toolbarItemsWithGroupPriority: CommonToolbarItem[] = [
        ToolbarItemUtilities.createActionButton(
          "Entry1",
          10,
          "icon-developer",
          "Entry1",
          (): void => {}
        ),
        ToolbarItemUtilities.createActionButton(
          "Entry2",
          20,
          "icon-developer",
          "Entry2",
          (): void => {},
          { groupPriority: 5 }
        ),
        ToolbarItemUtilities.createActionButton(
          "Entry3",
          30,
          "icon-developer",
          "Entry3",
          (): void => {},
          { groupPriority: 5 }
        ),
        ToolbarItemUtilities.createActionButton(
          "Entry4",
          40,
          "icon-developer",
          "Entry4",
          (): void => {},
          { groupPriority: 10, badgeType: BadgeType.New }
        ),
        ToolbarItemUtilities.createActionButton(
          "Entry5",
          50,
          "icon-developer",
          "Entry5",
          (): void => {},
          { groupPriority: 10 }
        ),
      ];

      const renderedComponent = render(
        <Toolbar
          items={toolbarItemsWithGroupPriority}
          toolbarOpacitySetting={ToolbarOpacitySetting.Defaults}
        />
      );
      expect(renderedComponent).toBeTruthy();
      expect(
        renderedComponent.container.querySelectorAll(
          ".components-toolbar-show-decorators"
        )
      ).toHaveLength(1);
      // badges should be displayed when toolbar is NOT transparent
      expect(
        renderedComponent.container.querySelectorAll(".core-badge-newBadge")
      ).toHaveLength(1);
      expect(
        renderedComponent.container.querySelectorAll(
          ".components-toolbar-item-container.components-horizontal.components-toolbar-button-add-gap-before"
        )
      ).toHaveLength(2);
    });

    it("will render without separators when group priority changes but in transparent mode", () => {
      const toolbarItemsWithGroupPriority: CommonToolbarItem[] = [
        ToolbarItemUtilities.createActionButton(
          "Entry1",
          10,
          "icon-developer",
          "Entry1",
          (): void => {}
        ),
        ToolbarItemUtilities.createActionButton(
          "Entry2",
          20,
          "icon-developer",
          "Entry2",
          (): void => {},
          { groupPriority: 5 }
        ),
        ToolbarItemUtilities.createActionButton(
          "Entry3",
          30,
          "icon-developer",
          "Entry3",
          (): void => {},
          { groupPriority: 5 }
        ),
        ToolbarItemUtilities.createActionButton(
          "Entry4",
          40,
          "icon-developer",
          "Entry4",
          (): void => {},
          { groupPriority: 10 }
        ),
        ToolbarItemUtilities.createActionButton(
          "Entry5",
          50,
          "icon-developer",
          "Entry5",
          (): void => {},
          { groupPriority: 10 }
        ),
      ];

      const renderedComponent = render(
        <Toolbar
          items={toolbarItemsWithGroupPriority}
          toolbarOpacitySetting={ToolbarOpacitySetting.Transparent}
        />
      );
      expect(renderedComponent).toBeTruthy();

      expect(
        renderedComponent.container.querySelectorAll(
          ".components-toolbar-show-decorators"
        )
      ).toHaveLength(0);
    });

    it("will render transparent background", () => {
      const childItems: ActionButton[] = [
        ToolbarItemUtilities.createActionButton(
          "Child1",
          10,
          "icon-developer",
          "Child1",
          (): void => {}
        ),
        ToolbarItemUtilities.createActionButton(
          "Child2",
          20,
          "icon-developer",
          "Child2",
          (): void => {},
          { badgeType: BadgeType.TechnicalPreview }
        ),
      ];

      const toolbarItemsWithGroup: CommonToolbarItem[] = [
        ToolbarItemUtilities.createActionButton(
          "Entry1",
          10,
          "icon-developer",
          "Entry1",
          (): void => {}
        ),
        ToolbarItemUtilities.createActionButton(
          "Entry2",
          20,
          "icon-developer",
          "Entry2",
          (): void => {}
        ),
        ToolbarItemUtilities.createActionButton(
          "Entry3",
          30,
          "icon-developer",
          "Entry3",
          (): void => {}
        ),
        ToolbarItemUtilities.createActionButton(
          "Entry4",
          40,
          "icon-developer",
          "Entry4",
          (): void => {}
        ),
        ToolbarItemUtilities.createActionButton(
          "Entry5",
          50,
          "icon-developer",
          "Entry5",
          (): void => {}
        ),
        ToolbarItemUtilities.createGroupButton(
          "Group6",
          60,
          "icon-developer",
          "Group6",
          childItems,
          { isDisabled: true }
        ),
      ];

      const renderedComponent = render(
        <Toolbar
          items={toolbarItemsWithGroup}
          toolbarOpacitySetting={ToolbarOpacitySetting.Transparent}
        />
      );
      expect(renderedComponent).toBeTruthy();
      expect(renderedComponent.queryByTitle("Entry3")).toBeTruthy();
      expect(renderedComponent.queryByTitle("Group6")).toBeTruthy();
    });

    it("should open panel when popup item clicked", () => {
      const getCustomDefWithPopupPanel = (): CustomToolbarItem => {
        return {
          id: "TestPopupPanelButton",
          itemPriority: 10,
          icon: "icon-placeholder",
          label: "PopupEntry",
          isCustom: true,
          panelContentNode: <div data-testid="popup-panel">HelloWorld!</div>,
        };
      };

      const toolbarItems: CommonToolbarItem[] = [getCustomDefWithPopupPanel()];

      const onKeyDownSpy = vi.fn();

      const renderedComponent = render(
        <Toolbar items={toolbarItems} onKeyDown={onKeyDownSpy} />
      );
      expect(renderedComponent).toBeTruthy();
      const button = renderedComponent.queryByTitle("PopupEntry");
      expect(button).toBeTruthy();
      expect(renderedComponent.queryByTestId("popup-panel")).toEqual(null);
      fireEvent.click(button!);

      // Also make sure the popup panel can inform user when key down is pressed
      const popupPanel = renderedComponent.queryByTestId("popup-panel");
      expect(popupPanel).toBeTruthy();
      popupPanel!.dispatchEvent(
        createBubbledEvent("keydown", { key: Key.Escape /* <Esc> */ })
      );
      expect(onKeyDownSpy).toHaveBeenCalledOnce();
    });

    it("should call onItemExecuted", async () => {
      const toolSpy = vi.fn();
      const onItemExecuteSpy = vi.fn();
      const testToolbarItems: CommonToolbarItem[] = [
        ToolbarItemUtilities.createActionButton(
          "Entry1",
          10,
          "icon-developer",
          "Entry1",
          toolSpy
        ),
      ];

      const renderedComponent = render(
        <Toolbar items={testToolbarItems} onItemExecuted={onItemExecuteSpy} />
      );

      const actionButton = renderedComponent.queryByTitle("Entry1");
      expect(actionButton).toBeTruthy();
      fireEvent.click(actionButton!);
      expect(toolSpy).toHaveBeenCalledOnce();
      expect(onItemExecuteSpy).toHaveBeenCalledOnce();
    });
  });

  describe("<Vertical Toolbar />", () => {
    const toolbarItems: CommonToolbarItem[] = [
      ToolbarItemUtilities.createActionButton(
        "Entry1",
        10,
        "icon-developer",
        "Entry1",
        (): void => {}
      ),
      ToolbarItemUtilities.createActionButton(
        "Entry2",
        20,
        "icon-developer",
        "Entry2",
        (): void => {}
      ),
      ToolbarItemUtilities.createActionButton(
        "Entry3",
        30,
        "icon-developer",
        "Entry3",
        (): void => {}
      ),
      ToolbarItemUtilities.createActionButton(
        "Entry4",
        40,
        "icon-developer",
        "Entry4",
        (): void => {}
      ),
      ToolbarItemUtilities.createActionButton(
        "Entry5",
        50,
        "icon-developer",
        "Entry5",
        (): void => {}
      ),
      ToolbarItemUtilities.createActionButton(
        "Entry6",
        60,
        "icon-developer",
        "Entry6",
        (): void => {}
      ),
    ];

    it("will render 6 items", () => {
      const renderedComponent = render(
        <Toolbar
          expandsTo={Direction.Right}
          panelAlignment={ToolbarPanelAlignment.Start}
          items={toolbarItems}
        />
      );
      expect(renderedComponent).toBeTruthy();
      expect(renderedComponent.queryByTitle("Entry1")).toBeTruthy();
      expect(renderedComponent.queryByTitle("Entry6")).toBeTruthy();
    });

    it("will render 6 items - simulate vertical bar in Navigation Area", () => {
      const renderedComponent = render(
        <Toolbar
          expandsTo={Direction.Left}
          panelAlignment={ToolbarPanelAlignment.End}
          items={toolbarItems}
        />
      );
      expect(renderedComponent).toBeTruthy();
      expect(renderedComponent.queryByTitle("Entry6")).toBeTruthy();
    });
  });

  describe("<BackArrow />", () => {
    it("renders targeted correctly", async () => {
      const renderedComponent = render(<BackArrow />);
      const pointerMove = new MouseEvent("pointermove");
      vi.spyOn(pointerMove, "target", "get").mockImplementation(
        () => renderedComponent.container.children[0]
      );
      act(() => {
        document.dispatchEvent(pointerMove);
      });
      expect(
        renderedComponent.container.querySelector(".components-targeted")
      ).toBeTruthy();
    });
  });

  describe("<GroupTool />", () => {
    const item = ToolbarItemUtilities.createActionButton(
      "Entry",
      20,
      "icon-developer",
      "Entry",
      (): void => {}
    );

    it("renders badge correctly", () => {
      const renderedComponent = render(<GroupTool item={item} badge />);
      expect(
        renderedComponent.container.querySelector(".components-badge")
      ).toBeTruthy();
    });

    it("renders targeted correctly", () => {
      const renderedComponent = render(<GroupTool item={item} />);
      const pointerMove = new MouseEvent("pointermove");
      vi.spyOn(pointerMove, "target", "get").mockImplementation(
        () => renderedComponent.container.children[0]
      );
      act(() => {
        document.dispatchEvent(pointerMove);
      });
      expect(
        renderedComponent.container.querySelector(".components-targeted")
      ).toBeTruthy();
    });

    it("renders various props correctly", () => {
      const renderedComponent = render(
        <GroupTool item={item} isActive isDisabled isFocused />
      );
      expect(
        renderedComponent.container.querySelector(".components-active")
      ).toBeTruthy();
      expect(
        renderedComponent.container.querySelector(".components-disabled")
      ).toBeTruthy();
      expect(
        renderedComponent.container.querySelector(".components-focused")
      ).toBeTruthy();
    });

    it("should invoke onPointerUp handler", () => {
      const spy = vi.fn();
      const renderedComponent = render(
        <GroupTool item={item} onPointerUp={spy} />
      );
      const div = renderedComponent.container.querySelector(
        ".components-toolbar-item-expandable-group-tool-item"
      );
      expect(div).toBeTruthy();
      fireEvent.pointerUp(div!);
      expect(spy).toHaveBeenCalledOnce();
    });
  });

  describe("useToolItemEntryContext", () => {
    it("do not require explicit context use (have defaults)", () => {
      const { result } = renderHook(() => {
        return useToolItemEntryContext();
      });

      expect(() => result.current.onResize(0)).to.not.throw();
      expect(result.current.onResize).to.exist;
      expect(result.current.hasOverflow).to.exist;
      expect(result.current.useHeight).to.exist;
    });
  });
});
