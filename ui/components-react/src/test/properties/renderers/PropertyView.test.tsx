/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { PropertyRecord } from "@itwin/appui-abstract";
import { Orientation } from "@itwin/core-react";
import { PropertyView } from "../../../components-react";
import TestUtils, {
  childStructure,
  selectorMatches,
  styleMatch,
  userEvent,
} from "../../TestUtils";
import { render, screen } from "@testing-library/react";

describe("PropertyView", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  let propertyRecord: PropertyRecord;
  beforeEach(() => {
    theUserTo = userEvent.setup();
    propertyRecord = TestUtils.createPrimitiveStringProperty("Label", "Model");
  });

  describe("Minimum column size disabled grid-template-columns", () => {
    it("renders label and value with custom ratio when it's provided", () => {
      render(
        <PropertyView
          orientation={Orientation.Horizontal}
          propertyRecord={propertyRecord}
          labelElement={"City"}
          columnRatio={0.6}
          columnInfo={{
            isMinimumColumnSizeEnabled: false,
            minLabelWidth: 30,
            minValueWidth: 45,
            actionButtonWidth: 60,
          }}
        />
      );

      expect(screen.getByRole("presentation")).satisfy(
        styleMatch({ gridTemplateColumns: "60% auto" })
      );
    });

    it("renders two columns when onColumnRatioChanged callback is not provided", () => {
      render(
        <PropertyView
          orientation={Orientation.Horizontal}
          propertyRecord={propertyRecord}
          labelElement={"label"}
          columnInfo={{
            isMinimumColumnSizeEnabled: false,
            minLabelWidth: 30,
            minValueWidth: 45,
            actionButtonWidth: 60,
          }}
        />
      );

      expect(screen.getByRole("presentation")).satisfy(
        styleMatch({ gridTemplateColumns: "25% auto" })
      );
    });

    it("renders three columns when orientation is horizontal and onColumnRatioChanged is provided", () => {
      render(
        <PropertyView
          orientation={Orientation.Horizontal}
          propertyRecord={propertyRecord}
          labelElement={"label"}
          onColumnRatioChanged={() => ({ ratio: 0.5 })}
          columnInfo={{
            isMinimumColumnSizeEnabled: false,
            minLabelWidth: 30,
            minValueWidth: 45,
            actionButtonWidth: 60,
          }}
        />
      );
      expect(screen.getByRole("presentation")).satisfy(
        styleMatch({ gridTemplateColumns: "25% 1px auto" })
      );
    });

    it("renders four columns if orientation is horizontal and action button renderers are passed", async () => {
      render(
        <PropertyView
          orientation={Orientation.Horizontal}
          propertyRecord={propertyRecord}
          labelElement={"label"}
          onColumnRatioChanged={() => ({ ratio: 0.5 })}
          actionButtonRenderers={[(_) => undefined]}
          columnInfo={{
            isMinimumColumnSizeEnabled: false,
            minLabelWidth: 30,
            minValueWidth: 45,
            actionButtonWidth: 60,
          }}
        />
      );

      expect(screen.getByRole("presentation")).satisfy(
        styleMatch({ gridTemplateColumns: "25% 1px auto 60px" })
      );
    });

    it("renders four columns if orientation is horizontal, action button renderers are passed and columnInfo is not passed", async () => {
      render(
        <PropertyView
          orientation={Orientation.Horizontal}
          propertyRecord={propertyRecord}
          labelElement={"label"}
          onColumnRatioChanged={() => ({ ratio: 0.5 })}
          actionButtonRenderers={[(_) => undefined]}
        />
      );

      expect(screen.getByRole("presentation")).satisfy(
        styleMatch({ gridTemplateColumns: "25% 1px auto auto" })
      );
    });
  });

  describe("Minimum column size enabled grid-template-columns", () => {
    it("renders label and value with custom ratio when it's provided", () => {
      render(
        <PropertyView
          orientation={Orientation.Horizontal}
          propertyRecord={propertyRecord}
          labelElement={"City"}
          columnRatio={0.6}
          columnInfo={{
            isMinimumColumnSizeEnabled: true,
            minLabelWidth: 20,
            minValueWidth: 40,
            actionButtonWidth: 50,
          }}
        />
      );

      expect(screen.getByRole("presentation")).satisfy(
        styleMatch({
          gridTemplateColumns: "minmax(20px, 60%) minmax(40px, 1fr)",
        })
      );
    });

    it("renders two min width columns when onColumnRatioChanged callback is not provided", () => {
      render(
        <PropertyView
          orientation={Orientation.Horizontal}
          propertyRecord={propertyRecord}
          labelElement={"label"}
          columnInfo={{
            isMinimumColumnSizeEnabled: true,
            minLabelWidth: 10,
            minValueWidth: 10,
            actionButtonWidth: 20,
          }}
        />
      );

      expect(screen.getByRole("presentation")).satisfy(
        styleMatch({
          gridTemplateColumns: "minmax(10px, 25%) minmax(10px, 1fr)",
        })
      );
    });

    it("renders three min width columns when orientation is horizontal and onColumnRatioChanged is provided", () => {
      render(
        <PropertyView
          orientation={Orientation.Horizontal}
          propertyRecord={propertyRecord}
          labelElement={"label"}
          onColumnRatioChanged={() => ({ ratio: 0.5 })}
          columnInfo={{
            isMinimumColumnSizeEnabled: true,
            minLabelWidth: 30,
            minValueWidth: 45,
            actionButtonWidth: 60,
          }}
        />
      );

      expect(screen.getByRole("presentation")).satisfy(
        styleMatch({
          gridTemplateColumns: "minmax(30px, 25%) 1px minmax(45px, 1fr)",
        })
      );
    });

    it("renders four min width columns if orientation is horizontal and action button renderers are passed", async () => {
      render(
        <PropertyView
          orientation={Orientation.Horizontal}
          propertyRecord={propertyRecord}
          labelElement={"label"}
          onColumnRatioChanged={() => ({ ratio: 0.5 })}
          actionButtonRenderers={[(_) => undefined]}
          columnInfo={{
            isMinimumColumnSizeEnabled: true,
            minLabelWidth: 30,
            minValueWidth: 45,
            actionButtonWidth: 60,
          }}
        />
      );

      expect(screen.getByRole("presentation")).satisfy(
        styleMatch({
          gridTemplateColumns: "minmax(30px, 25%) 1px minmax(45px, 1fr) 60px",
        })
      );
    });
  });

  it("renders single column if orientation is vertical and action button renderers are not provided", () => {
    render(
      <PropertyView
        orientation={Orientation.Vertical}
        propertyRecord={propertyRecord}
        labelElement={"label"}
        onColumnRatioChanged={() => ({ ratio: 0.5 })}
      />
    );

    expect(screen.getByRole("presentation")).satisfy(
      styleMatch({ gridTemplateColumns: "auto" })
    );
  });

  it("renders two columns if orientation is vertical and action button renderers are provided", () => {
    render(
      <PropertyView
        orientation={Orientation.Vertical}
        propertyRecord={propertyRecord}
        labelElement={"label"}
        onColumnRatioChanged={() => ({ ratio: 0.5 })}
        actionButtonRenderers={[(_) => undefined]}
      />
    );

    expect(screen.getByRole("presentation")).satisfy(
      styleMatch({ gridTemplateColumns: "auto auto" })
    );
  });

  it("renders two auto columns if orientation is vertical, action button renderers are provided and columnInfo is provided", () => {
    render(
      <PropertyView
        orientation={Orientation.Vertical}
        propertyRecord={propertyRecord}
        labelElement={"label"}
        onColumnRatioChanged={() => ({ ratio: 0.5 })}
        actionButtonRenderers={[(_) => undefined]}
        columnInfo={{
          isMinimumColumnSizeEnabled: true,
          minLabelWidth: 30,
          minValueWidth: 45,
          actionButtonWidth: 60,
        }}
      />
    );

    expect(screen.getByRole("presentation")).satisfy(
      styleMatch({ gridTemplateColumns: "auto auto" })
    );
  });

  it("renders label and value", () => {
    render(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        labelElement={"City"}
        valueElement={"Vilnius"}
      />
    );

    expect(screen.getByText("City")).satisfy(
      selectorMatches("div.components-property-record-label")
    );
    expect(screen.getByText("Vilnius")).satisfy(
      selectorMatches("div.components-property-record-value span")
    );
  });

  it("renders ElementSeparator when orientation is horizontal and onColumnRatioChanged is provided", () => {
    render(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        labelElement={"label"}
        onColumnRatioChanged={() => ({ ratio: 0.5 })}
      />
    );

    expect(screen.getByRole("button")).satisfy(
      selectorMatches(
        [
          ".components-property-record--horizontal",
          ".core-element-separator--horizontal",
        ].join(" > ")
      )
    );
  });

  it("does not render ElementSeparator when onColumnRatioChanged is not provided", () => {
    render(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        labelElement={"label"}
      />
    );

    expect(screen.queryByRole("button")).to.be.null;
  });

  it("does not render ElementSeparator when orientation is vertical", () => {
    render(
      <PropertyView
        orientation={Orientation.Vertical}
        propertyRecord={propertyRecord}
        labelElement={"label"}
      />
    );

    expect(screen.queryByRole("button")).to.be.null;
  });

  it("triggers selection if property gets clicked once", async () => {
    const onClick = vi.fn();

    render(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        onClick={onClick}
        labelElement={"label"}
      />
    );

    await theUserTo.click(screen.getByRole("presentation"));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("triggers deselection if property gets clicked twice", async () => {
    const onClick = vi.fn();

    render(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        onClick={onClick}
        labelElement={"label"}
      />
    );

    await theUserTo.click(screen.getByRole("presentation"));
    await theUserTo.click(screen.getByRole("presentation"));

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("renders as selected when isSelected prop is true", () => {
    render(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isSelected={true}
        labelElement={"label"}
      />
    );

    expect(screen.getByRole("presentation")).satisfy(
      selectorMatches(".components--selected")
    );
  });

  it("renders as clickable when onClick prop is given", () => {
    render(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        onClick={() => {}}
        labelElement={"label"}
      />
    );

    expect(screen.getByRole("presentation")).satisfy(
      selectorMatches(".components--clickable")
    );
  });

  it("renders as hoverable when isHoverable prop is true", () => {
    render(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        labelElement={"label"}
        isHoverable={true}
      />
    );

    expect(screen.getByRole("presentation")).satisfy(
      selectorMatches(".components--hoverable")
    );
  });

  it("changes state on hovering if set to hoverable", async () => {
    render(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        labelElement={"label"}
        isHoverable={true}
        actionButtonRenderers={[
          (props) => (
            <div data-testid={"validator"}>
              {props.isPropertyHovered ? "Y" : "N"}
            </div>
          ),
        ]}
      />
    );

    await theUserTo.hover(screen.getByRole("presentation"));
    expect(screen.getByTestId("validator")).have.property("innerHTML", "Y");

    await theUserTo.unhover(screen.getByRole("presentation"));
    expect(screen.getByTestId("validator")).have.property("innerHTML", "N");
  });

  it("does not changes state on hovering if not set to hoverable", async () => {
    render(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        labelElement={"label"}
        isHoverable={false}
        actionButtonRenderers={[
          (props) => (
            <div data-testid={"validator"}>
              {props.isPropertyHovered ? "Y" : "N"}
            </div>
          ),
        ]}
      />
    );
    await theUserTo.hover(screen.getByRole("presentation"));
    expect(screen.getByTestId("validator")).have.property("innerHTML", "N");

    await theUserTo.unhover(screen.getByRole("presentation"));
    expect(screen.getByTestId("validator")).have.property("innerHTML", "N");
  });

  it("renders action button list if orientation is horizontal and action button renderers are passed", async () => {
    render(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        labelElement={"label"}
        onColumnRatioChanged={() => ({ ratio: 0.5 })}
        actionButtonRenderers={[(_) => undefined]}
      />
    );
    expect(screen.getByRole("presentation")).satisfy(
      childStructure(".components-property-action-button-list--horizontal")
    );
  });

  it("renders action button list if orientation is vertical and action button renderers are passed", () => {
    render(
      <PropertyView
        orientation={Orientation.Vertical}
        propertyRecord={propertyRecord}
        labelElement={"label"}
        onColumnRatioChanged={() => ({ ratio: 0.5 })}
        actionButtonRenderers={[(_) => undefined]}
      />
    );
    expect(screen.getByRole("presentation")).satisfy(
      childStructure(".components-property-action-button-list--vertical")
    );
  });

  it("renders label and element when property record is non primitive", () => {
    propertyRecord = TestUtils.createStructProperty("StructProperty");
    render(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        labelElement={"City"}
        valueElement={"Vilnius"}
      />
    );
    expect(
      screen.getByText("City", {
        selector: ".components-property-record-label",
      })
    ).to.exist;
    expect(
      screen.getByText("Vilnius", {
        selector: ".components-property-record-value span",
      })
    ).to.exist;
  });

  it("calls onContextMenu callback on property right click", async () => {
    const callback = vi.fn();
    render(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        onContextMenu={callback}
        labelElement={"label"}
      />
    );
    await theUserTo.pointer({
      target: screen.getByRole("presentation"),
      keys: "[MouseRight]",
    });
    expect(callback).toHaveBeenCalledWith(propertyRecord, expect.anything());
  });

  it("calls onRightClick callback on property right click", async () => {
    const callback = vi.fn();
    render(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        onRightClick={callback}
        labelElement={"label"}
      />
    );
    await theUserTo.pointer({
      target: screen.getByRole("presentation"),
      keys: "[MouseRight]",
    });
    expect(callback).toHaveBeenCalledWith(propertyRecord, undefined);
  });
});
