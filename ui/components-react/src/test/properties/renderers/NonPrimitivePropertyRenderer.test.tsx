/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Orientation } from "@itwin/core-react";
import { NonPrimitivePropertyRenderer } from "../../../components-react/properties/renderers/NonPrimitivePropertyRenderer.js";
import TestUtils, {
  selectorMatches,
  styleMatch,
  userEvent,
} from "../../TestUtils.js";
import { render, screen } from "@testing-library/react";

describe("NonPrimitivePropertyRenderer", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("renders correctly", async () => {
    render(
      <NonPrimitivePropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={TestUtils.createArrayProperty("Pipes", [
          TestUtils.createPrimitiveStringProperty("pipe_1", "Water pipe"),
        ])}
        valueElement={"string[1]"}
        isCollapsible={true}
      />
    );

    expect(screen.getByTitle("Pipes (1)"))
      .satisfy(
        selectorMatches(
          [
            ".components-property-record--horizontal",
            ".components-property-record-label",
            "[role='presentation'].components-nonprimitive-property-label-renderer",
            "span.components-property-label-renderer",
          ].join(" ")
        )
      )
      .have.property("innerHTML", "Pipes (1)");
  });

  it("renders array size in label correctly", async () => {
    render(
      <NonPrimitivePropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={TestUtils.createArrayProperty("Pipes", [
          TestUtils.createPrimitiveStringProperty("pipe_1", "Water pipe"),
          TestUtils.createPrimitiveStringProperty("pipe_2", "Sewage pipe"),
          TestUtils.createPrimitiveStringProperty("pipe_3", "Water pipe"),
        ])}
        valueElement={"string[1]"}
        isCollapsible={true}
      />
    );
    expect(screen.getByTitle("Pipes (3)")).to.exist;
  });

  it("renders as expanded if isCollapsible is not set", () => {
    render(
      <NonPrimitivePropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={TestUtils.createArrayProperty("Pipes", [
          TestUtils.createPrimitiveStringProperty("pipe_1", "Water pipe"),
          TestUtils.createPrimitiveStringProperty("pipe_2", "Sewage pipe"),
        ])}
      />
    );
    expect(screen.getByTitle("Water pipe")).to.exist;
    expect(screen.getByTitle("Sewage pipe")).to.exist;
  });

  it("changes component state from collapsed to expanded when label is clicked", async () => {
    render(
      <NonPrimitivePropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={TestUtils.createStructProperty("House", {
          building: TestUtils.createPrimitiveStringProperty(
            "Building",
            "Residential"
          ),
          street: TestUtils.createPrimitiveStringProperty(
            "Street",
            "Glass st."
          ),
        })}
        isCollapsible={true}
      />
    );

    expect(screen.queryByTitle("Building")).toEqual(null);
    expect(screen.queryByTitle("Street")).toEqual(null);

    await theUserTo.click(screen.getByTitle("House"));

    expect(screen.queryByTitle("Building")).to.exist;
    expect(screen.queryByTitle("Street")).to.exist;

    await theUserTo.click(screen.getByTitle("House"));

    expect(screen.queryByTitle("Building")).toEqual(null);
    expect(screen.queryByTitle("Street")).toEqual(null);
  });

  it("does not render base struct properties", async () => {
    const baseStruct = {
      value: TestUtils.createPrimitiveStringProperty("Size", "Huge"),
    };
    const struct = Object.create(baseStruct);
    struct.label = TestUtils.createPrimitiveStringProperty("Title", "Model");

    const structProperty = TestUtils.createStructProperty("NameStruct", struct);

    render(
      <NonPrimitivePropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={structProperty}
      />
    );

    expect(screen.getByTitle("Title")).to.exist;
    expect(screen.getByTitle("Model")).to.exist;
    expect(screen.queryByTitle("Size")).toEqual(null);
    expect(screen.queryByTitle("Huge")).toEqual(null);
  });

  it("renders property with an offset when indentation is more than 0", () => {
    render(
      <NonPrimitivePropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={TestUtils.createArrayProperty("Pipes", [
          TestUtils.createPrimitiveStringProperty("pipe_1", "Water pipe"),
        ])}
        indentation={1}
      />
    );

    expect(screen.getByTitle("[1]").parentElement).to.satisfy(
      styleMatch({ paddingLeft: "34px" })
    );
  });

  it("uses unique key as a click parameter when used", async () => {
    const keySpy = vi.fn();
    render(
      <NonPrimitivePropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={TestUtils.createArrayProperty("Pipes", [
          TestUtils.createPrimitiveStringProperty("pipe_1", "Water pipe"),
        ])}
        isCollapsible={true}
        onClick={keySpy}
        uniqueKey="unique_key"
      />
    );
    await theUserTo.click(screen.getByTitle("Pipes (1)"));
    expect(keySpy).toHaveBeenCalledWith(expect.anything(), "unique_key");
  });

  it("renders as expanded if property should be automatically expanded", () => {
    const structProperty = TestUtils.createStructProperty("House", {
      building: TestUtils.createPrimitiveStringProperty(
        "Building",
        "Residential"
      ),
      street: TestUtils.createPrimitiveStringProperty("Street", "Glass st."),
    });
    structProperty.autoExpand = true;

    render(
      <NonPrimitivePropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={structProperty}
        isCollapsible={true}
      />
    );

    expect(screen.queryByTitle("Building")).to.exist;
    expect(screen.queryByTitle("Street")).to.exist;
  });
});
