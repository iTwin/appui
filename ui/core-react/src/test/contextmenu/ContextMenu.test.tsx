/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ConditionalBooleanValue } from "@itwin/appui-abstract";
import { render, screen } from "@testing-library/react";
import {
  BadgeType,
  ContextMenu,
  ContextMenuDirection,
  ContextMenuDivider,
  ContextMenuItem,
  ContextSubMenu,
  GlobalContextMenu,
} from "../../core-react";
import { TildeFinder } from "../../core-react/contextmenu/TildeFinder";
import { classesFromElement } from "../TestUtils";
import userEvent from "@testing-library/user-event";

describe("ContextMenu", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  describe("<ContextMenu />", () => {
    it("renders open correctly", () => {
      const component = render(<ContextMenu opened={true} />);
      expect(component.getByTestId("core-context-menu-container")).to.exist;
      expect(
        component.getByTestId("core-context-menu-container").className
      ).to.contain("opened");
    });
    it("renders close correctly", () => {
      const component = render(<ContextMenu opened={false} />);
      expect(
        component.getByTestId("core-context-menu-container").className
      ).to.not.contain("opened");
    });
    it("renders with ContextMenuItem correctly", () => {
      const component = render(
        <ContextMenu opened={true}>
          <ContextMenuItem> Test </ContextMenuItem>
        </ContextMenu>
      );
      expect(component.getByTestId("core-context-menu-item")).to.exist;
    });
    it("renders with text children correctly", () => {
      const component = render(<ContextMenu opened={true}>Test</ContextMenu>);
      expect(component.queryByTestId("core-context-menu-item")).to.not.exist;
      expect(component.getByText("Test")).to.exist;
    });
    it("renders with non MenuItem children correctly", () => {
      const component = render(
        <ContextMenu opened={true}>
          <div data-testid="core-context-menu-test-div">Test</div>
        </ContextMenu>
      );
      expect(component.getByTestId("core-context-menu-test-div")).to.exist;
    });
    it("should call onOutsideClick on window mouseup", () => {
      const spy = vi.fn();
      render(
        <ContextMenu opened={true} onOutsideClick={spy}>
          <ContextMenuItem> Test </ContextMenuItem>
        </ContextMenu>
      );

      const mouseUp = new MouseEvent("mouseup");
      vi.spyOn(mouseUp, "target", "get").mockReturnValue(
        document.createElement("div")
      );
      window.dispatchEvent(mouseUp);

      expect(spy).toHaveBeenCalled();
    });
    it("should not call onOutsideClick on window mouseup if closed", () => {
      const spy = vi.fn();
      render(
        <ContextMenu onOutsideClick={spy}>
          <ContextMenuItem> Test </ContextMenuItem>
        </ContextMenu>
      );

      const mouseUp = new MouseEvent("mouseup");
      vi.spyOn(mouseUp, "target", "get").mockReturnValue(
        document.createElement("div")
      );
      window.dispatchEvent(mouseUp);

      expect(spy).not.toBeCalled();
    });
    it("should support selectedIndex", () => {
      const component = render(
        <ContextMenu selectedIndex={0}>
          <ContextMenuItem> Test 1 </ContextMenuItem>
          <ContextMenuItem> Test 2 </ContextMenuItem>
        </ContextMenu>
      );

      let items = component.getAllByTestId("core-context-menu-item");
      let idx = items.findIndex(
        (value) => value.className.indexOf("is-selected") !== -1
      );
      expect(idx).to.equal(0);

      component.rerender(
        <ContextMenu selectedIndex={1}>
          <ContextMenuItem> Test 1 </ContextMenuItem>
          <ContextMenuItem> Test 2 </ContextMenuItem>
        </ContextMenu>
      );

      items = component.getAllByTestId("core-context-menu-item");
      idx = items.findIndex(
        (value) => value.className.indexOf("is-selected") !== -1
      );
      expect(idx).to.equal(1);
    });

    describe("Keyboard navigation", () => {
      it("should handle Escape press", async () => {
        const handleEsc = vi.fn();
        render(<ContextMenu opened={true} onEsc={handleEsc} />);
        await theUserTo.keyboard("{Escape}");
        expect(handleEsc).toHaveBeenCalledOnce();
      });
      it("should handle one-level Left press", async () => {
        const handleEsc = vi.fn();
        render(<ContextMenu opened={true} onEsc={handleEsc} />);
        await theUserTo.keyboard("{ArrowLeft}");
        expect(handleEsc).toHaveBeenCalledOnce();
      });
      it("should handle one-level select", async () => {
        const handleSelect = vi.fn();
        const targetSelect = vi.fn();
        render(
          <ContextMenu opened={true} onSelect={handleSelect}>
            <ContextMenuItem onSelect={targetSelect}>Item 1</ContextMenuItem>
          </ContextMenu>
        );
        await theUserTo.keyboard("{ArrowDown}{Enter}");
        expect(handleSelect).toHaveBeenCalledOnce();
        expect(targetSelect).toHaveBeenCalledOnce();
      });
      it("should handle one-level down arrow select", async () => {
        const handleSelect = vi.fn();
        const targetSelect = vi.fn();
        render(
          <ContextMenu opened={true} onSelect={handleSelect}>
            <ContextMenuItem onSelect={targetSelect}>Item 1</ContextMenuItem>
            <ContextMenuItem>Item 2</ContextMenuItem>
          </ContextMenu>
        );
        await theUserTo.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}{Enter}");
        expect(handleSelect).toHaveBeenCalledOnce();
        expect(targetSelect).toHaveBeenCalledOnce();
      });
      it("should handle one-level up arrow select", async () => {
        const handleSelect = vi.fn();
        const targetSelect = vi.fn();
        render(
          <ContextMenu opened={true} onSelect={handleSelect}>
            <ContextMenuItem onSelect={targetSelect}>Item 1</ContextMenuItem>
            <ContextMenuItem>Item 2</ContextMenuItem>
          </ContextMenu>
        );
        await theUserTo.keyboard("{ArrowUp}{ArrowUp}{ArrowUp}{Enter}");
        expect(handleSelect).toHaveBeenCalledOnce();
        expect(targetSelect).toHaveBeenCalledOnce();
      });
      it("should handle multi-level right arrow then enter select", async () => {
        const handleSelect = vi.fn();
        const targetSelect = vi.fn();
        render(
          <ContextMenu opened={true} onSelect={handleSelect}>
            <ContextSubMenu label="Item 1">
              <ContextMenuItem>Item 1.1</ContextMenuItem>
              <ContextMenuItem onSelect={targetSelect}>
                Item 1.2
              </ContextMenuItem>
            </ContextSubMenu>
          </ContextMenu>
        );
        await theUserTo.keyboard("{ArrowDown}{ArrowRight}{ArrowDown}{Enter}");
        expect(handleSelect).toHaveBeenCalledOnce();
        expect(targetSelect).toHaveBeenCalledOnce();
      });
      it("should handle multi-level left arrow select", async () => {
        const handleSelect = vi.fn();
        const targetSelect = vi.fn();
        render(
          <ContextMenu opened={true} onSelect={handleSelect}>
            <ContextSubMenu label="Item 1">
              <ContextMenuItem>Item 1.1</ContextMenuItem>
              <ContextMenuItem>Item 1.2</ContextMenuItem>
            </ContextSubMenu>
            <ContextMenuItem onSelect={targetSelect}>Item 2</ContextMenuItem>
          </ContextMenu>
        );
        await theUserTo.keyboard(
          "{ArrowDown}{ArrowRight}{ArrowLeft}{ArrowDown}{Enter}"
        );
        expect(handleSelect).toHaveBeenCalledOnce();
        expect(targetSelect).toHaveBeenCalledOnce();
      });
      it("should select list item of hotkey", async () => {
        const onSelectFake = vi.fn();
        render(
          <ContextMenu opened={true}>
            <ContextMenuItem onSelect={onSelectFake}>
              ~First item
            </ContextMenuItem>
            <ContextMenuItem>~Second item</ContextMenuItem>
          </ContextMenu>
        );
        await theUserTo.keyboard("f");
        expect(onSelectFake).toHaveBeenCalledOnce();
      });
      it("should not select list item of hotkey if disabled", async () => {
        const onSelectFake = vi.fn();
        render(
          <ContextMenu opened={true}>
            <ContextMenuItem onSelect={onSelectFake} disabled={true}>
              ~First item
            </ContextMenuItem>
            <ContextMenuItem>~Second item</ContextMenuItem>
          </ContextMenu>
        );
        await theUserTo.keyboard("f");
        expect(onSelectFake).not.toBeCalled();
      });
      it("should not select list item of hotkey if hidden", async () => {
        const onSelectFake = vi.fn();
        render(
          <ContextMenu opened={true}>
            <ContextMenuItem onSelect={onSelectFake} hidden={true}>
              ~First item
            </ContextMenuItem>
            <ContextMenuItem>~Second item</ContextMenuItem>
          </ContextMenu>
        );
        await theUserTo.keyboard("f");
        expect(onSelectFake).not.toBeCalled();
      });
      it("should ignore next keyup when ignoreNextKeyUp=true", async () => {
        const onSelectFake = vi.fn();
        render(
          <ContextMenu opened={true} ignoreNextKeyUp={true}>
            <ContextMenuItem onSelect={onSelectFake}>
              ~First item
            </ContextMenuItem>
            <ContextMenuItem>~Second item</ContextMenuItem>
          </ContextMenu>
        );
        await theUserTo.keyboard("f");
        expect(onSelectFake).not.toBeCalled();
        await theUserTo.keyboard("f");
        expect(onSelectFake).toHaveBeenCalledOnce();
      });
      it("should select sub menu list item of hotkey", async () => {
        const onSelectFake = vi.fn();
        render(
          <ContextMenu opened={true}>
            <ContextSubMenu label="~First item" onSelect={onSelectFake}>
              <ContextMenuItem>~First first item</ContextMenuItem>
              <ContextMenuItem>~Second first item</ContextMenuItem>
            </ContextSubMenu>
            <ContextMenuItem>~Second item</ContextMenuItem>
          </ContextMenu>
        );
        await theUserTo.keyboard("f");
        expect(onSelectFake).toHaveBeenCalledOnce();
      });
      it("should not select sub menu list item of hotkey if disabled", async () => {
        const onSelectFake = vi.fn();
        render(
          <ContextMenu opened={true}>
            <ContextSubMenu
              label="~First item"
              onSelect={onSelectFake}
              disabled={true}
            >
              <ContextMenuItem>~First first item</ContextMenuItem>
              <ContextMenuItem>~Second first item</ContextMenuItem>
            </ContextSubMenu>
            <ContextMenuItem>~Second item</ContextMenuItem>
          </ContextMenu>
        );
        await theUserTo.keyboard("f");
        expect(onSelectFake).not.toBeCalled();
      });
      it("should not select sub menu list item of hotkey if hidden", async () => {
        const onSelectFake = vi.fn();
        render(
          <ContextMenu opened={true}>
            <ContextSubMenu
              label="~First item"
              onSelect={onSelectFake}
              hidden={true}
            >
              <ContextMenuItem>~First first item</ContextMenuItem>
              <ContextMenuItem>~Second first item</ContextMenuItem>
            </ContextSubMenu>
            <ContextMenuItem>~Second item</ContextMenuItem>
          </ContextMenu>
        );
        await theUserTo.keyboard("f");
        expect(onSelectFake).not.toBeCalled();
      });
      it("should find list item of hotkey", async () => {
        const onSelectFake = vi.fn();
        render(
          <ContextMenu opened={true} hotkeySelect={false}>
            <ContextMenuItem>~First item</ContextMenuItem>
            <ContextMenuItem onSelect={onSelectFake}>
              ~Second item
            </ContextMenuItem>
          </ContextMenu>
        );
        await theUserTo.keyboard("s{Enter}");
        expect(onSelectFake).toHaveBeenCalledOnce();
      });
      it("should find sub menu list item of hotkey", async () => {
        const onSelectFake = vi.fn();
        render(
          <ContextMenu opened={true} hotkeySelect={false}>
            <ContextSubMenu label="~First item" onSelect={onSelectFake}>
              <ContextMenuItem>~First first item</ContextMenuItem>
              <ContextMenuItem>~Second first item</ContextMenuItem>
            </ContextSubMenu>
            <ContextMenuItem>~Second item</ContextMenuItem>
          </ContextMenu>
        );
        await theUserTo.keyboard("f{enter}");
        expect(onSelectFake).toHaveBeenCalledOnce();
      });
      it("should find next list item of hotkey", async () => {
        const onSelectFake = vi.fn();
        render(
          <ContextMenu opened={true} hotkeySelect={false}>
            <ContextMenuItem>~First item</ContextMenuItem>
            <ContextMenuItem>~Second item</ContextMenuItem>
            <ContextMenuItem>~Third item</ContextMenuItem>
            <ContextMenuItem onSelect={onSelectFake}>
              ~Fourth item
            </ContextMenuItem>
          </ContextMenu>
        );
        await theUserTo.keyboard("ff{enter}");
        expect(onSelectFake).toHaveBeenCalledOnce();
      });
      it("should wrap back to beginning to find next list item of hotkey", async () => {
        const onSelectFake = vi.fn();
        render(
          <ContextMenu opened={true} hotkeySelect={false}>
            <ContextMenuItem>~First item</ContextMenuItem>
            <ContextMenuItem onSelect={onSelectFake}>
              ~Second item
            </ContextMenuItem>
            <ContextMenuItem>~Third item</ContextMenuItem>
            <ContextMenuItem>~Fourth item</ContextMenuItem>
          </ContextMenu>
        );
        await theUserTo.keyboard("ffs{enter}");
        expect(onSelectFake).toHaveBeenCalledOnce();
      });
    });

    describe("direction", () => {
      it("should render bottom right by default", () => {
        const component = render(<ContextMenu opened={true} />);
        expect(
          component.container.querySelector(".core-context-menu-bottom")
        ).toBeTruthy();
        expect(
          component.container.querySelector(".core-context-menu-right")
        ).toBeTruthy();
      });
      it("should render no direction for None", () => {
        const component = render(
          <ContextMenu opened={true} direction={ContextMenuDirection.None} />
        );
        expect(
          component.container.querySelector(".core-context-menu-bottom")
        ).toEqual(null);
        expect(
          component.container.querySelector(".core-context-menu-right")
        ).toEqual(null);
      });
      it("should render top left", () => {
        const component = render(
          <ContextMenu opened={true} direction={ContextMenuDirection.TopLeft} />
        );
        expect(
          component.container.querySelector(".core-context-menu-top")
        ).toBeTruthy();
        expect(
          component.container.querySelector(".core-context-menu-left")
        ).toBeTruthy();
      });
      it("should render top", () => {
        const component = render(
          <ContextMenu opened={true} direction={ContextMenuDirection.Top} />
        );
        expect(
          component.container.querySelector(".core-context-menu-top")
        ).toBeTruthy();
      });
      it("should render top right", () => {
        const component = render(
          <ContextMenu
            opened={true}
            direction={ContextMenuDirection.TopRight}
          />
        );
        expect(
          component.container.querySelector(".core-context-menu-top")
        ).toBeTruthy();
        expect(
          component.container.querySelector(".core-context-menu-right")
        ).toBeTruthy();
      });
      it("should render left", () => {
        const component = render(
          <ContextMenu opened={true} direction={ContextMenuDirection.Left} />
        );
        expect(
          component.container.querySelector(".core-context-menu-left")
        ).toBeTruthy();
      });
      it("should render center", () => {
        const component = render(
          <ContextMenu opened={true} direction={ContextMenuDirection.Center} />
        );
        expect(
          component.container.querySelector(".core-context-menu-center")
        ).toBeTruthy();
      });
      it("should render right", () => {
        const component = render(
          <ContextMenu opened={true} direction={ContextMenuDirection.Right} />
        );
        expect(
          component.container.querySelector(".core-context-menu-right")
        ).toBeTruthy();
      });
      it("should render bottom left", () => {
        const component = render(
          <ContextMenu
            opened={true}
            direction={ContextMenuDirection.BottomLeft}
          />
        );
        expect(
          component.container.querySelector(".core-context-menu-bottom")
        ).toBeTruthy();
        expect(
          component.container.querySelector(".core-context-menu-left")
        ).toBeTruthy();
      });
      it("should render bottom", () => {
        const component = render(
          <ContextMenu opened={true} direction={ContextMenuDirection.Bottom} />
        );
        expect(
          component.container.querySelector(".core-context-menu-bottom")
        ).toBeTruthy();
      });
      it("should render bottom right", () => {
        const component = render(
          <ContextMenu
            opened={true}
            direction={ContextMenuDirection.BottomRight}
          />
        );
        expect(
          component.container.querySelector(".core-context-menu-bottom")
        ).toBeTruthy();
        expect(
          component.container.querySelector(".core-context-menu-right")
        ).toBeTruthy();
      });
    });
  });

  describe("<GlobalContextMenu />", () => {
    it("renders correctly", () => {
      const component = render(
        <GlobalContextMenu opened={true} identifier="test" x="0" y="0" />
      );
      expect(component.getByTestId("core-context-menu-root")).to.exist;
    });
    it("mounts and unmounts correctly", () => {
      const wrapper = render(
        <GlobalContextMenu opened={true} identifier="test" x="0" y="0" />
      );
      wrapper.unmount();
    });
    it("mounts and unmounts without an identifier correctly", () => {
      const wrapper = render(<GlobalContextMenu opened={true} x="0" y="0" />);
      wrapper.unmount();
    });
  });

  describe("<ContextMenuDivider />", () => {
    it("renders correctly", () => {
      const component = render(<ContextMenuDivider />);
      expect(component.getByTestId("core-context-menu-divider")).to.exist;
    });
  });

  describe("<ContextMenuItem />", () => {
    it("renders correctly", () => {
      const component = render(<ContextMenuItem>Test</ContextMenuItem>);
      expect(component.getByText("Test")).to.exist;
    });

    it("renders with icon correctly", () => {
      const component = render(
        <ContextMenuItem icon="icon-placeholder">Test</ContextMenuItem>
      );
      expect(
        component.container.querySelector(".icon-placeholder")
      ).toBeTruthy();
      expect(
        component.container.querySelector(".core-context-menu-icon")
      ).toBeTruthy();
    });

    it("renders with iconRight correctly", () => {
      const component = render(
        <ContextMenuItem iconRight="icon-checkmark">Test</ContextMenuItem>
      );
      expect(component.container.querySelector(".icon-checkmark")).toBeTruthy();
      expect(
        component.container.querySelector(".core-context-menu-icon")
      ).toBeTruthy();
      expect(
        component.container.querySelector(".core-context-menu-icon-right")
      ).toBeTruthy();
    });

    it("handles props changes correctly", () => {
      const component = render(<ContextMenuItem>Test ~A</ContextMenuItem>);
      expect(component.getByText("Test")).to.exist;
      expect(component.getByText("A")).to.exist;
      component.rerender(<ContextMenuItem>Test ~B</ContextMenuItem>);
      expect(component.getByText("Test")).to.exist;
      expect(component.getByText("B")).to.exist;
    });

    it("focuses correctly", () => {
      const component = render(<ContextMenuItem>Test</ContextMenuItem>);
      const item = component.getByTestId("core-context-menu-item");
      item.focus();
      expect(item).to.equal(document.activeElement);
    });

    it("renders disabled correctly", () => {
      const component = render(
        <ContextMenuItem disabled={true}>Test</ContextMenuItem>
      );
      expect(
        component.container.querySelector(".core-context-menu-disabled")
      ).toBeTruthy();
      expect(
        component.container.querySelector(
          ".core-context-menu-item[aria-disabled]"
        )
      ).toBeTruthy();
    });

    it("renders disabled by condition correctly", () => {
      const isDisabled = new ConditionalBooleanValue(
        () => true,
        ["Test:CustomId"]
      );
      const component = render(
        <ContextMenuItem disabled={isDisabled}>Test</ContextMenuItem>
      );
      expect(
        component.container.querySelector(".core-context-menu-disabled")
      ).toBeTruthy();
      expect(
        component.container.querySelector(
          ".core-context-menu-item[aria-disabled]"
        )
      ).toBeTruthy();
    });

    it("renders hidden correctly", () => {
      const component = render(
        <ContextMenuItem hidden={true}>Test</ContextMenuItem>
      );
      expect(
        component.container.querySelector(".core-context-menu-hidden")
      ).toBeTruthy();
      expect(
        component.container.querySelector(
          ".core-context-menu-item[aria-hidden]"
        )
      ).toBeTruthy();
    });

    it("renders hidden by condition correctly", () => {
      const isHidden = new ConditionalBooleanValue(
        () => true,
        ["Test:CustomId"]
      );
      const component = render(
        <ContextMenuItem hidden={isHidden}>Test</ContextMenuItem>
      );
      expect(
        component.container.querySelector(".core-context-menu-hidden")
      ).toBeTruthy();
      expect(
        component.container.querySelector(
          ".core-context-menu-item[aria-hidden]"
        )
      ).toBeTruthy();
    });

    it("renders badge correctly using badgeType (old)", () => {
      const component = render(
        <ContextMenuItem badgeType={BadgeType.New}>Test</ContextMenuItem>
      );
      expect(
        component.container.querySelector(".core-badge-newBadge")
      ).toBeTruthy();
    });

    it("renders badge correctly using badgeKind (new)", () => {
      const component = render(
        <ContextMenuItem badgeKind={"deprecated"}>Test</ContextMenuItem>
      );
      expect(
        component.container.querySelector(".core-badge-deprecatedBadge")
      ).toBeTruthy();
    });

    it("onClick handled correctly", async () => {
      const handleClick = vi.fn();
      const component = render(
        <ContextMenuItem onClick={handleClick}>Test</ContextMenuItem>
      );
      const item = component.getByTestId("core-context-menu-item");
      await theUserTo.click(item);
      expect(handleClick).toHaveBeenCalledOnce();
    });
    it("onSelect handled correctly on click", async () => {
      const handleSelect = vi.fn();
      const component = render(
        <ContextMenuItem onSelect={handleSelect}>Test</ContextMenuItem>
      );
      const item = component.getByTestId("core-context-menu-item");
      await theUserTo.click(item);
      expect(handleSelect).toHaveBeenCalledOnce();
    });
    it("onHover handled correctly", async () => {
      const handleHover = vi.fn();
      const component = render(
        <ContextMenuItem onHover={handleHover}>Test</ContextMenuItem>
      );
      const item = component.getByTestId("core-context-menu-item");
      await theUserTo.hover(item);
      expect(handleHover).toHaveBeenCalledOnce();
    });
    it("onSelect handled correctly on Enter", async () => {
      const handleSelect = vi.fn();
      const component = render(
        <ContextMenuItem onSelect={handleSelect}>Test</ContextMenuItem>
      );
      const item = component.getByTestId("core-context-menu-item");
      item.focus();
      await theUserTo.keyboard("{Enter}");
      expect(handleSelect).toHaveBeenCalledOnce();
    });
    it("onSelect not called on Escape", async () => {
      const handleSelect = vi.fn();
      const component = render(
        <ContextMenuItem onSelect={handleSelect}>Test</ContextMenuItem>
      );
      const item = component.getByTestId("core-context-menu-item");
      item.focus();
      await theUserTo.keyboard("{Escape}");
      expect(handleSelect).not.toBeCalled();
    });
    it("onSelect not called when disabled", async () => {
      const handleSelect = vi.fn();
      const component = render(
        <ContextMenuItem onSelect={handleSelect} disabled={true}>
          Test
        </ContextMenuItem>
      );
      const item = component.getByTestId("core-context-menu-item");
      await theUserTo.type(item, "{Enter}");
      expect(handleSelect).not.toBeCalled();
    });
  });

  describe("<ContextSubMenu />", () => {
    it("renders correctly", () => {
      const component = render(
        <ContextMenu opened={true}>
          <ContextSubMenu label="test">
            <ContextMenuItem> Test </ContextMenuItem>
          </ContextSubMenu>
        </ContextMenu>
      );
      expect(component.getByText("test")).to.exist;
    });

    it("renders disabled correctly", () => {
      const component = render(
        <ContextMenu opened={true}>
          <ContextSubMenu label="test" disabled={true}>
            <ContextMenuItem> Test </ContextMenuItem>
          </ContextSubMenu>
        </ContextMenu>
      );
      expect(
        component.container.querySelector(".core-context-menu-disabled")
      ).toBeTruthy();
      expect(
        component.container.querySelector(
          ".core-context-menu-item[aria-disabled]"
        )
      ).toBeTruthy();
    });

    it("renders disabled by condition correctly", () => {
      const isDisabled = new ConditionalBooleanValue(
        () => true,
        ["Test:CustomId"]
      );
      const component = render(
        <ContextMenu opened={true}>
          <ContextSubMenu label="test" disabled={isDisabled}>
            <ContextMenuItem> Test </ContextMenuItem>
          </ContextSubMenu>
        </ContextMenu>
      );
      expect(
        component.container.querySelector(".core-context-menu-disabled")
      ).toBeTruthy();
      expect(
        component.container.querySelector(
          ".core-context-menu-item[aria-disabled]"
        )
      ).toBeTruthy();
    });

    it("renders hidden correctly", () => {
      const component = render(
        <ContextMenu opened={true}>
          <ContextSubMenu label="test" hidden={true}>
            <ContextMenuItem> Test </ContextMenuItem>
          </ContextSubMenu>
        </ContextMenu>
      );
      expect(
        component.container.querySelector(".core-context-menu-hidden")
      ).toBeTruthy();
      expect(
        component.container.querySelector(
          ".core-context-menu-item[aria-hidden]"
        )
      ).toBeTruthy();
    });

    it("renders hidden by condition correctly", () => {
      const isHidden = new ConditionalBooleanValue(
        () => true,
        ["Test:CustomId"]
      );
      const component = render(
        <ContextMenu opened={true}>
          <ContextSubMenu label="test" hidden={isHidden}>
            <ContextMenuItem> Test </ContextMenuItem>
          </ContextSubMenu>
        </ContextMenu>
      );
      expect(
        component.container.querySelector(".core-context-menu-hidden")
      ).toBeTruthy();
      expect(
        component.container.querySelector(
          ".core-context-menu-item[aria-hidden]"
        )
      ).toBeTruthy();
    });

    it("renders badge correctly using badgeType (old)", () => {
      const component = render(
        <ContextMenu opened={true}>
          <ContextSubMenu label="test" badgeType={BadgeType.TechnicalPreview}>
            <ContextMenuItem> Test </ContextMenuItem>
          </ContextSubMenu>
        </ContextMenu>
      );
      expect(
        component.container.querySelector(".core-badge-technicalPreviewBadge")
      ).toBeTruthy();
    });

    it("renders badge correctly using badgeKind (new)", () => {
      const component = render(
        <ContextMenu opened={true}>
          <ContextSubMenu label="test" badgeKind={"technical-preview"}>
            <ContextMenuItem> Test </ContextMenuItem>
          </ContextSubMenu>
        </ContextMenu>
      );
      expect(
        component.container.querySelector(".core-badge-technicalPreviewBadge")
      ).toBeTruthy();
    });

    it("onHover handled correctly", async () => {
      const handleHover = vi.fn();
      const component = render(
        <ContextSubMenu label="test" onHover={handleHover}>
          <ContextMenuItem> Test </ContextMenuItem>
        </ContextSubMenu>
      );
      const item = component.getByTestId("core-context-submenu");
      await theUserTo.hover(item);
      expect(handleHover).toHaveBeenCalledOnce();
    });

    it("onHover handled internally when in ContextMenu", async () => {
      const handleHover = vi.fn();
      const component = render(
        <ContextMenu opened={true}>
          <ContextSubMenu label="test" onHover={handleHover}>
            <ContextMenuItem> Test </ContextMenuItem>
          </ContextSubMenu>
        </ContextMenu>
      );
      const item = component.getByTestId("core-context-submenu");
      await theUserTo.hover(item);
      expect(handleHover).not.toBeCalled();
    });

    it("onClick handled correctly", async () => {
      const handleClick = vi.fn();
      const component = render(
        <ContextMenu opened={true}>
          <ContextSubMenu label="test" onClick={handleClick}>
            <ContextMenuItem> Test </ContextMenuItem>
          </ContextSubMenu>
        </ContextMenu>
      );
      const item = component.getByTestId("core-context-submenu-container");
      await theUserTo.click(item);
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it("onFocus handled correctly", () => {
      const component = render(
        <ContextMenu opened={true}>
          <ContextSubMenu label="test">
            <ContextMenuItem> Test </ContextMenuItem>
          </ContextSubMenu>
        </ContextMenu>
      );
      const item = component.getByTestId("core-context-menu-item");
      item.focus();
      expect(document.activeElement).toEqual(item);
    });

    it("should support changing direction (COVERAGE ONLY)", () => {
      // THIS TEST IS ONLY ADDING COVERAGE, AS STATED ABOVE, THE DIRECTION DO NOT CHANGE HERE!
      const { rerender } = render(
        <ContextSubMenu label="test" autoflip={true}>
          <ContextMenuItem>Test</ContextMenuItem>
        </ContextSubMenu>
      );
      expect(classesFromElement(screen.getByRole("menu"))).to.include(
        "core-context-menu-bottom"
      );

      rerender(
        <ContextSubMenu
          label="test"
          autoflip={true}
          direction={ContextMenuDirection.Right}
        >
          <ContextMenuItem>Test</ContextMenuItem>
        </ContextSubMenu>
      );
      expect(classesFromElement(screen.getByRole("menu"))).to.include(
        "core-context-menu-right"
      );
    });

    it("handles label change correctly", () => {
      const component = render(
        <ContextSubMenu label="Test ~A">
          <ContextMenuItem>Test Item</ContextMenuItem>
        </ContextSubMenu>
      );
      expect(component.getByText("Test")).to.exist;
      expect(component.getByText("A")).to.exist;
      component.rerender(
        <ContextSubMenu label="Test ~B">
          <ContextMenuItem>Test Item</ContextMenuItem>
        </ContextSubMenu>
      );
      expect(component.getByText("Test")).to.exist;
      expect(component.getByText("B")).to.exist;
    });

    it("should close sub-menu on opening another sub-menu", async () => {
      const fakeClick1 = vi.fn();
      const fakeClick2 = vi.fn();
      const fakeOutsideClick = vi.fn();

      const component = render(
        <ContextMenu opened={true}>
          <ContextSubMenu
            label="Test 1"
            id="1"
            onClick={fakeClick1}
            onOutsideClick={fakeOutsideClick}
          >
            <ContextMenuItem> Test 1 sub-menu </ContextMenuItem>
          </ContextSubMenu>
          <ContextSubMenu label="Test 2" id="2" onClick={fakeClick2}>
            <ContextMenuItem> Test 2 sub-menu </ContextMenuItem>
          </ContextSubMenu>
        </ContextMenu>
      );

      const items = component.getAllByTestId("core-context-submenu-container");

      await theUserTo.click(items[0]);
      expect(fakeClick1).toHaveBeenCalledOnce();

      await theUserTo.click(items[1]);
      expect(fakeClick2).toHaveBeenCalledOnce();
      expect(fakeOutsideClick).toHaveBeenCalledOnce();

      const subMenus = component.getAllByTestId("core-context-menu-container");
      expect(subMenus[1].className).not.to.contain("opened");
      expect(subMenus[2].className).to.contain("opened");
    });
  });

  describe("ContextMenu.autoFlip", () => {
    it("should handle rect overflowing right side of window", () => {
      expect(
        ContextMenu.autoFlip(
          ContextMenuDirection.TopRight,
          DOMRect.fromRect({ x: 51, y: 25, height: 50, width: 50 }),
          100,
          100
        )
      ).to.equal(ContextMenuDirection.TopLeft);
      expect(
        ContextMenu.autoFlip(
          ContextMenuDirection.Right,
          DOMRect.fromRect({ x: 51, y: 25, height: 50, width: 50 }),
          100,
          100
        )
      ).to.equal(ContextMenuDirection.Left);
      expect(
        ContextMenu.autoFlip(
          ContextMenuDirection.BottomRight,
          DOMRect.fromRect({ x: 51, y: 25, height: 50, width: 50 }),
          100,
          100
        )
      ).to.equal(ContextMenuDirection.BottomLeft);
    });
    it("should handle rect overflowing left side of window", () => {
      expect(
        ContextMenu.autoFlip(
          ContextMenuDirection.TopLeft,
          DOMRect.fromRect({ x: -1, y: 25, height: 50, width: 50 }),
          100,
          100
        )
      ).to.equal(ContextMenuDirection.TopRight);
      expect(
        ContextMenu.autoFlip(
          ContextMenuDirection.Left,
          DOMRect.fromRect({ x: -1, y: 25, height: 50, width: 50 }),
          100,
          100
        )
      ).to.equal(ContextMenuDirection.Right);
      expect(
        ContextMenu.autoFlip(
          ContextMenuDirection.BottomLeft,
          DOMRect.fromRect({ x: -1, y: 25, height: 50, width: 50 }),
          100,
          100
        )
      ).to.equal(ContextMenuDirection.BottomRight);
    });
    it("should handle rect overflowing bottom side of window", () => {
      expect(
        ContextMenu.autoFlip(
          ContextMenuDirection.BottomLeft,
          DOMRect.fromRect({ x: 25, y: 51, height: 50, width: 50 }),
          100,
          100
        )
      ).to.equal(ContextMenuDirection.TopLeft);
      expect(
        ContextMenu.autoFlip(
          ContextMenuDirection.Bottom,
          DOMRect.fromRect({ x: 25, y: 51, height: 50, width: 50 }),
          100,
          100
        )
      ).to.equal(ContextMenuDirection.Top);
      expect(
        ContextMenu.autoFlip(
          ContextMenuDirection.BottomRight,
          DOMRect.fromRect({ x: 25, y: 51, height: 50, width: 50 }),
          100,
          100
        )
      ).to.equal(ContextMenuDirection.TopRight);
    });
    it("should handle rect overflowing top side of window", () => {
      expect(
        ContextMenu.autoFlip(
          ContextMenuDirection.TopLeft,
          DOMRect.fromRect({ x: 25, y: -1, height: 50, width: 50 }),
          100,
          100
        )
      ).to.equal(ContextMenuDirection.BottomLeft);
      expect(
        ContextMenu.autoFlip(
          ContextMenuDirection.Top,
          DOMRect.fromRect({ x: 25, y: -1, height: 50, width: 50 }),
          100,
          100
        )
      ).to.equal(ContextMenuDirection.Bottom);
      expect(
        ContextMenu.autoFlip(
          ContextMenuDirection.TopRight,
          DOMRect.fromRect({ x: 25, y: -1, height: 50, width: 50 }),
          100,
          100
        )
      ).to.equal(ContextMenuDirection.BottomRight);
    });
    it("should handle rect overflowing top left side of window", () => {
      expect(
        ContextMenu.autoFlip(
          ContextMenuDirection.TopLeft,
          DOMRect.fromRect({ x: -1, y: -1, height: 50, width: 50 }),
          100,
          100
        )
      ).to.equal(ContextMenuDirection.BottomRight);
    });
    it("should handle rect overflowing top right side of window", () => {
      expect(
        ContextMenu.autoFlip(
          ContextMenuDirection.TopRight,
          DOMRect.fromRect({ x: 51, y: -1, height: 50, width: 50 }),
          100,
          100
        )
      ).to.equal(ContextMenuDirection.BottomLeft);
    });
    it("should handle rect overflowing bottom left side of window", () => {
      expect(
        ContextMenu.autoFlip(
          ContextMenuDirection.BottomLeft,
          DOMRect.fromRect({ x: -1, y: 51, height: 50, width: 50 }),
          100,
          100
        )
      ).to.equal(ContextMenuDirection.TopRight);
    });
    it("should handle rect overflowing bottom right side of window", () => {
      expect(
        ContextMenu.autoFlip(
          ContextMenuDirection.BottomRight,
          DOMRect.fromRect({ x: 51, y: 51, height: 50, width: 50 }),
          100,
          100
        )
      ).to.equal(ContextMenuDirection.TopLeft);
    });
  });

  describe("TildeFinder", () => {
    it("should not find character in string when there is no tilde", () => {
      const tildeFindRet = TildeFinder.findAfterTilde("s");
      expect(tildeFindRet.character).toEqual(undefined);
    });
    it("should find character after tilde in string", () => {
      const tildeFindRet = TildeFinder.findAfterTilde("~s");
      expect(tildeFindRet.character).to.equal("S");
    });
    it("should find remove tilde and add underline in string", () => {
      const tildeFindRet = TildeFinder.findAfterTilde("~s");
      const node = (tildeFindRet.node as Array<React.ReactElement<any>>)[1];
      expect(node.type).to.equal("u");
      expect(node.props.children).to.equal("s");
    });
    it("should not find character after array when there is no tilde", () => {
      const tildeFindRet = TildeFinder.findAfterTilde(["te", "s", "t"]);
      expect(tildeFindRet.character).toEqual(undefined);
    });
    it("should find character after tilde in array", () => {
      const tildeFindRet = TildeFinder.findAfterTilde(["te", "~s", "t"]);
      expect(tildeFindRet.character).to.equal("S");
    });
    it("should find remove tilde and add underline in array", () => {
      const tildeFindRet = TildeFinder.findAfterTilde(["te", "~s", "t"]);
      const node = (
        tildeFindRet.node as Array<Array<React.ReactElement<any>>>
      )[1][1];
      expect(node.type).to.equal("u");
      expect(node.props.children).to.equal("s");
    });
    it("should find character after tilde in node", () => {
      const tildeFindRet = TildeFinder.findAfterTilde(<span>~s</span>);
      expect(tildeFindRet.character).to.equal("S");
    });
    it("should not find character in node when there is no tilde", () => {
      const tildeFindRet = TildeFinder.findAfterTilde(<span>s</span>);
      expect(tildeFindRet.character).toEqual(undefined);
    });
    it("should remove tilde and add underline in node", () => {
      const tildeFindRet = TildeFinder.findAfterTilde(<span>~s</span>);
      const node = (
        (tildeFindRet.node as React.ReactElement<any>).props
          .children as React.ReactNode[]
      )[1] as React.ReactElement<any>;
      expect(node.type).to.equal("u");
      expect(node.props.children).to.equal("s");
    });
    it("should fallback to undefined character when node passed is undefined", () => {
      const tildeFindRet = TildeFinder.findAfterTilde(undefined);
      expect(tildeFindRet.character).to.equal(undefined);
    });
    it("should fallback to undefined character when node passed is not string, array, or node", () => {
      const tildeFindRet = TildeFinder.findAfterTilde(true);
      expect(tildeFindRet.character).to.equal(undefined);
    });
    it("should fallback to undefined character when node passed is an empty object", () => {
      const tildeFindRet = TildeFinder.findAfterTilde({} as any);
      expect(tildeFindRet.character).to.equal(undefined);
    });
    it("should pass node value through when node passed is not string, array, or node", () => {
      const node = true;
      const tildeFindRet = TildeFinder.findAfterTilde(node);
      expect(tildeFindRet.node).to.equal(node);
    });
  });
});
