/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import { Dialog } from "../../core-react.js";
import { DialogAlignment } from "../../core-react/dialog/Dialog.js";
import { GlobalDialog } from "../../core-react/dialog/GlobalDialog.js";
import { DialogButtonType } from "@itwin/appui-abstract";
import { userEvent } from "@testing-library/user-event";

describe("Dialog", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(async () => {
    theUserTo = userEvent.setup();
  });

  describe("<GlobalDialog />", () => {
    it("should render with identifier", () => {
      render(<GlobalDialog opened={true} identifier="test" />);
    });
    it("should render", () => {
      render(<GlobalDialog opened={true} />);
    });
    it("should render multiple in same global container", () => {
      render(<GlobalDialog opened={true} />);
      render(<GlobalDialog opened={true} />);
    });
  });

  describe("renders", () => {
    it("should render", () => {
      render(<Dialog opened={true} />);
    });
    it("should render with titleStyle", () => {
      const component = render(
        <Dialog
          opened={true}
          title="Test"
          titleStyle={{ fontWeight: "bold" }}
        />
      );
      component.getByText("Test");
    });
    it("should render without inset", () => {
      const component = render(
        <Dialog opened={true} inset={false}>
          Content
        </Dialog>
      );
      const element = component.getByText("Content");
      expect(element.style.padding).to.equal("0px");
    });
  });

  describe("buttons", () => {
    it("should render with OK & Cancel buttons", () => {
      const component = render(
        <Dialog
          opened={true}
          buttonCluster={[
            { type: DialogButtonType.OK, onClick: () => {} },
            { type: DialogButtonType.Cancel, onClick: () => {} },
          ]}
        />
      );
      component.getByText("OK");
      component.getByText("Cancel");
    });

    it("should render with Close button", () => {
      const component = render(
        <Dialog
          opened={true}
          buttonCluster={[{ type: DialogButtonType.Close, onClick: () => {} }]}
        />
      );
      component.getByText("Close");
    });

    it("should render with Yes, No & Retry buttons", () => {
      const component = render(
        <Dialog
          opened={true}
          buttonCluster={[
            { type: DialogButtonType.Yes, onClick: () => {} },
            { type: DialogButtonType.No, onClick: () => {} },
            { type: DialogButtonType.Retry, onClick: () => {} },
            { type: DialogButtonType.Next, onClick: () => {} },
            { type: DialogButtonType.Previous, onClick: () => {} },
          ]}
        />
      );
      component.getByText("Yes");
      component.getByText("No");
      component.getByText("Retry");
      component.getByText("Next");
      component.getByText("Previous");
    });

    it("should render with custom button", () => {
      const component = render(
        <Dialog
          opened={true}
          buttonCluster={[
            { type: DialogButtonType.Close, onClick: () => {}, label: "XYZ" },
          ]}
        />
      );
      component.getByText("XYZ");
    });
  });

  describe("keyboard support", () => {
    it("should close on Esc key", () => {
      const spyOnEscape = vi.fn();
      const component = render(<Dialog opened={true} onEscape={spyOnEscape} />);

      component.baseElement.dispatchEvent(
        new KeyboardEvent("keyup", { key: "Escape" })
      );
      expect(spyOnEscape).toHaveBeenCalledOnce();
    });
    it("should not respond to other keyboard input", () => {
      const spyOnEscape = vi.fn();
      const component = render(<Dialog opened={true} onEscape={spyOnEscape} />);

      component.baseElement.dispatchEvent(new KeyboardEvent("keyup"));
      expect(spyOnEscape).not.toBeCalled();
    });
  });

  describe("modeless support", () => {
    it("should call handler for pointerDown", async () => {
      const spyOnPointerDown = vi.fn();
      const component = render(
        <Dialog
          opened={true}
          modal={false}
          onModelessPointerDown={spyOnPointerDown}
          modelessId="Test1"
        />
      );
      const head = component.getByTestId("core-dialog-head");
      await theUserTo.click(head);
      expect(spyOnPointerDown).toHaveBeenCalledOnce();
    });
    it("should not call handler for pointerDown if no modelessId", async () => {
      const spyOnPointerDown = vi.fn();
      const component = render(
        <Dialog
          opened={true}
          modal={false}
          onModelessPointerDown={spyOnPointerDown}
        />
      );
      const head = component.getByTestId("core-dialog-head");
      await theUserTo.click(head);
      expect(spyOnPointerDown).not.toBeCalled();
    });
  });

  describe("alignment", () => {
    it("should render top left", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.TopLeft} />
      );
      expect(
        component.container.querySelector(".core-align-top-left")
      ).toBeTruthy();
    });
    it("should render top", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.Top} />
      );
      expect(component.container.querySelector(".core-align-top")).toBeTruthy();
    });
    it("should render top right", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.TopRight} />
      );
      expect(
        component.container.querySelector(".core-align-top-right")
      ).toBeTruthy();
    });
    it("should render left", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.Left} />
      );
      expect(
        component.container.querySelector(".core-align-left")
      ).toBeTruthy();
    });
    it("should render center", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.Center} />
      );
      expect(
        component.container.querySelector(".core-align-center")
      ).toBeTruthy();
    });
    it("should render right", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.Right} />
      );
      expect(
        component.container.querySelector(".core-align-right")
      ).toBeTruthy();
    });
    it("should render bottom left", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.BottomLeft} />
      );
      expect(
        component.container.querySelector(".core-align-bottom-left")
      ).toBeTruthy();
    });
    it("should render bottom", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.Bottom} />
      );
      expect(
        component.container.querySelector(".core-align-bottom")
      ).toBeTruthy();
    });
    it("should render bottom right", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.BottomRight} />
      );
      expect(
        component.container.querySelector(".core-align-bottom-right")
      ).toBeTruthy();
    });
    it("should render with 50px offset from left corner", () => {
      const component = render(<Dialog opened={true} x={50} />);
      const element = component.getByTestId("core-dialog-container");
      expect(element.style.left).to.equal("50px");
      expect(element.style.top).to.equal("0px");
      expect(element.style.transform).to.equal("none");
    });
    it("should render with offset and ignore alignment", () => {
      const component = render(
        <Dialog opened={true} y={50} alignment={DialogAlignment.BottomRight} />
      );
      const element = component.getByTestId("core-dialog-container");
      expect(element.style.left).to.equal("0px");
      expect(element.style.top).to.equal("50px");
      expect(element.style.transform).to.equal("none");
    });
  });

  describe("header", () => {
    it("should render without header", () => {
      const component = render(<Dialog opened={true} hideHeader={true} />);
      expect(component.queryByTestId("core-dialog-head")).toEqual(null);
    });

    it("should render with header", () => {
      const component = render(
        <Dialog opened={true} header={<div>Test Header</div>} />
      );
      component.getByText("Test Header");
    });
  });
});
