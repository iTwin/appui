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

/**
 * Build x,y,clientX,clientY coord object. (x,y required for user-event to determine a move,
 * but our code validates clientX and clientY)
 * @param x x, clientX value
 * @param y y, clientY value
 */
const coords = (x: number, y: number) => ({ x, y, clientX: x, clientY: y });

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
      const element = component.container.querySelector(
        ".iui-dialog-title-bar"
      ) as HTMLElement;
      expect(element.style.fontWeight).to.equal("bold");
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

  describe("movable and resizable", () => {
    it("should render with movable", () => {
      render(<Dialog opened={true} movable={true} />);
    });
    it("should render with resizable", () => {
      render(<Dialog opened={true} resizable={true} />);
    });
    it("should render with string min/max sizes", () => {
      render(
        <Dialog
          opened={true}
          minHeight={"25%"}
          minWidth={"25%"}
          maxWidth={"75%"}
          maxHeight={"75%"}
        />
      );
    });
    it("should not resize from pointer events on bottom right when resizable={false}", async () => {
      const component = render(
        <Dialog
          opened={true}
          resizable={false}
          height={400}
          width={400}
          minHeight={200}
          minWidth={200}
        />
      );
      expect(component.container.querySelector("drag-right")).to.not.exist;
      expect(component.container.querySelector("drag-bottom-right")).to.not
        .exist;
      expect(component.container.querySelector("drag-bottom")).to.not.exist;
    });
    it("should resize from pointer events on bottom right", async () => {
      const component = render(
        <Dialog
          opened={true}
          resizable={true}
          height={400}
          width={400}
          minHeight={200}
          minWidth={200}
        />
      );
      const bottomRightDragHandle = component.getByTestId(
        "core-dialog-drag-bottom-right"
      );
      await theUserTo.pointer([
        {
          target: bottomRightDragHandle,
          coords: coords(400, 400),
          keys: "[MouseLeft>]",
        },
        {
          target: bottomRightDragHandle,
          coords: coords(200, 200),
        },
        "[/MouseLeft]",
      ]);
      const container = component.getByTestId("core-dialog-container");
      expect(container.style.height).to.equal("200px");
      expect(container.style.width).to.equal("200px");
    });
    it("should resize relative to top right corner from pointer events on bottom right when both resizable and movable", async () => {
      const component = render(
        <Dialog
          opened={true}
          resizable={true}
          movable={true}
          height={400}
          width={400}
          minHeight={200}
          minWidth={200}
        />
      );
      const bottomRightDragHandle = component.getByTestId(
        "core-dialog-drag-bottom-right"
      );
      await theUserTo.pointer([
        {
          target: bottomRightDragHandle,
          coords: coords(400, 400),
          keys: "[MouseLeft>]",
        },
        {
          target: bottomRightDragHandle,
          coords: coords(200, 200),
        },
        "[/MouseLeft]",
      ]);
      const container = component.getByTestId("core-dialog-container");
      expect(container.style.height).to.equal("200px");
      expect(container.style.width).to.equal("200px");
    });
    it("should resize to minWidth and minHeight", async () => {
      const component = render(
        <Dialog
          opened={true}
          resizable={true}
          height={400}
          width={400}
          minHeight={200}
          minWidth={200}
        />
      );
      const bottomRightDragHandle = component.getByTestId(
        "core-dialog-drag-bottom-right"
      );
      await theUserTo.pointer([
        {
          target: bottomRightDragHandle,
          coords: coords(400, 400),
          keys: "[MouseLeft>]",
        },
        {
          target: bottomRightDragHandle,
          coords: coords(100, 100),
        },
        "[/MouseLeft]",
      ]);
      const container = component.getByTestId("core-dialog-container");
      expect(container.style.height).to.equal("200px");
      expect(container.style.width).to.equal("200px");
    });
    it("should resize to maxWidth and maxHeight when defined", async () => {
      const component = render(
        <Dialog
          opened={true}
          resizable={true}
          height={300}
          width={300}
          maxWidth={350}
          maxHeight={350}
        />
      );
      const bottomRightDragHandle = component.getByTestId(
        "core-dialog-drag-bottom-right"
      );
      await theUserTo.pointer([
        {
          target: bottomRightDragHandle,
          coords: coords(300, 300),
          keys: "[MouseLeft>]",
        },
        {
          target: bottomRightDragHandle,
          coords: coords(400, 400),
        },
        "[/MouseLeft]",
      ]);
      const container = component.getByTestId("core-dialog-container");
      expect(container.style.height).to.equal("350px");
      expect(container.style.width).to.equal("350px");
    });
    it("should resize from pointer events on bottom", async () => {
      sinon.replace(Element.prototype, "getBoundingClientRect", () =>
        DOMRect.fromRect({ x: 0, y: 0, height: 400, width: 400 })
      );
      const component = render(
        <Dialog
          opened={true}
          resizable={true}
          height={400}
          width={400}
          minHeight={100}
          minWidth={100}
        />
      );
      const bottomRightDragHandle = component.getByTestId(
        "core-dialog-drag-bottom"
      );
      await theUserTo.pointer([
        {
          target: bottomRightDragHandle,
          coords: coords(400, 400),
          keys: "[MouseLeft>]",
        },
        {
          target: bottomRightDragHandle,
          coords: coords(405, 200),
        },
        "[/MouseLeft]",
      ]);
      const container = component.getByTestId("core-dialog-container");
      expect(container.style.height).to.equal("200px");
      expect(container.style.width).to.equal("400px");
    });
    it("should resize from pointer events on right", async () => {
      sinon.replace(Element.prototype, "getBoundingClientRect", () =>
        DOMRect.fromRect({ x: 0, y: 0, height: 400, width: 400 })
      );
      const component = render(
        <Dialog
          opened={true}
          resizable={true}
          height={400}
          width={400}
          minHeight={100}
          minWidth={100}
        />
      );
      const bottomRightDragHandle = component.getByTestId(
        "core-dialog-drag-right"
      );
      await theUserTo.pointer([
        {
          target: bottomRightDragHandle,
          coords: coords(400, 400),
          keys: "[MouseLeft>]",
        },
        {
          target: bottomRightDragHandle,
          coords: coords(405, 200),
        },
        "[/MouseLeft]",
      ]);
      const container = component.getByTestId("core-dialog-container");
      expect(container.style.height).to.equal("400px");
      expect(container.style.width).to.equal("405px");
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
      expect(component.container.querySelector(".align-top-left")).not.to.be
        .null;
    });
    it("should render top", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.Top} />
      );
      expect(component.container.querySelector(".align-top")).not.to.be.null;
    });
    it("should render top right", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.TopRight} />
      );
      expect(component.container.querySelector(".align-top-right")).not.to.be
        .null;
    });
    it("should render left", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.Left} />
      );
      expect(component.container.querySelector(".align-left")).not.to.be.null;
    });
    it("should render center", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.Center} />
      );
      expect(component.container.querySelector(".align-center")).not.to.be.null;
    });
    it("should render right", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.Right} />
      );
      expect(component.container.querySelector(".align-right")).not.to.be.null;
    });
    it("should render bottom left", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.BottomLeft} />
      );
      expect(component.container.querySelector(".align-bottom-left")).not.to.be
        .null;
    });
    it("should render bottom", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.Bottom} />
      );
      expect(component.container.querySelector(".align-bottom")).not.to.be.null;
    });
    it("should render bottom right", () => {
      const component = render(
        <Dialog opened={true} alignment={DialogAlignment.BottomRight} />
      );
      expect(component.container.querySelector(".align-bottom-right")).not.to.be
        .null;
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
      expect(component.container.querySelector(".iui-dialog-title-bar")).to.be
        .null;
    });
    it("should render with header", () => {
      const component = render(
        <Dialog opened={true} header={<div className="header-test" />} />
      );
      expect(component.container.querySelector(".header-test")).not.to.be.null;
      expect(component.container.querySelector(".iui-dialog-title-bar")).to.be
        .null;
    });
  });
});
