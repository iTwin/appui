/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import { render } from "@testing-library/react";
import { Dialog } from "../../core-react";
import { DialogAlignment } from "../../core-react/dialog/Dialog";
import { GlobalDialog } from "../../core-react/dialog/GlobalDialog";
import { UiCore } from "../../core-react/UiCore";
import TestUtils from "../TestUtils";
import { DialogButtonType } from "@itwin/appui-abstract";
import userEvent from "@testing-library/user-event";

describe("Dialog", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  before(async () => {
    await TestUtils.initializeUiCore();
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
      expect(component.getByText(UiCore.translate("dialog.ok"))).to.exist;
      expect(component.getByText(UiCore.translate("dialog.cancel"))).to.exist;
    });

    it("should render with Close button", () => {
      const component = render(
        <Dialog
          opened={true}
          buttonCluster={[{ type: DialogButtonType.Close, onClick: () => {} }]}
        />
      );
      expect(component.getByText(UiCore.translate("dialog.close"))).to.exist;
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
      expect(component.getByText(UiCore.translate("dialog.yes"))).to.exist;
      expect(component.getByText(UiCore.translate("dialog.no"))).to.exist;
      expect(component.getByText(UiCore.translate("dialog.retry"))).to.exist;
      expect(component.getByText(UiCore.translate("dialog.next"))).to.exist;
      expect(component.getByText(UiCore.translate("dialog.previous"))).to.exist;
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
      expect(component.getByText("XYZ")).to.exist;
    });
  });

  describe("keyboard support", () => {
    it("should close on Esc key", () => {
      const spyOnEscape = sinon.spy();
      const component = render(<Dialog opened={true} onEscape={spyOnEscape} />);

      component.baseElement.dispatchEvent(
        new KeyboardEvent("keyup", { key: "Escape" })
      );
      expect(spyOnEscape).to.be.calledOnce;
    });
    it("should not respond to other keyboard input", () => {
      const spyOnEscape = sinon.spy();
      const component = render(<Dialog opened={true} onEscape={spyOnEscape} />);

      component.baseElement.dispatchEvent(new KeyboardEvent("keyup"));
      expect(spyOnEscape).to.not.be.called;
    });
  });

  describe("modeless support", () => {
    it("should call handler for pointerDown", async () => {
      const spyOnPointerDown = sinon.spy();
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
      expect(spyOnPointerDown).to.be.calledOnce;
    });
    it("should not call handler for pointerDown if no modelessId", async () => {
      const spyOnPointerDown = sinon.spy();
      const component = render(
        <Dialog
          opened={true}
          modal={false}
          onModelessPointerDown={spyOnPointerDown}
        />
      );
      const head = component.getByTestId("core-dialog-head");
      await theUserTo.click(head);
      expect(spyOnPointerDown).to.not.be.called;
    });
  });

  describe("alignment", () => {
    it("should render top left", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.TopLeft} />
      );
      expect(component.container.querySelector(".core-align-top-left")).not.to
        .be.null;
    });
    it("should render top", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.Top} />
      );
      expect(component.container.querySelector(".core-align-top")).not.to.be
        .null;
    });
    it("should render top right", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.TopRight} />
      );
      expect(component.container.querySelector(".core-align-top-right")).not.to
        .be.null;
    });
    it("should render left", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.Left} />
      );
      expect(component.container.querySelector(".core-align-left")).not.to.be
        .null;
    });
    it("should render center", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.Center} />
      );
      expect(component.container.querySelector(".core-align-center")).not.to.be
        .null;
    });
    it("should render right", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.Right} />
      );
      expect(component.container.querySelector(".core-align-right")).not.to.be
        .null;
    });
    it("should render bottom left", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.BottomLeft} />
      );
      expect(component.container.querySelector(".core-align-bottom-left")).not
        .to.be.null;
    });
    it("should render bottom", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.Bottom} />
      );
      expect(component.container.querySelector(".core-align-bottom")).not.to.be
        .null;
    });
    it("should render bottom right", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.BottomRight} />
      );
      expect(component.container.querySelector(".core-align-bottom-right")).not
        .to.be.null;
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
      expect(component.queryByTestId("core-dialog-head")).to.be.null;
    });

    it("should render with header", () => {
      const component = render(
        <Dialog opened={true} header={<div>Test Header</div>} />
      );
      component.getByText("Test Header");
    });
  });
});
