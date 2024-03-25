/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import { Orientation } from "@itwin/core-react";
import { FlatNonPrimitivePropertyRenderer } from "../../../../components-react/propertygrid/internal/flat-properties/FlatNonPrimitivePropertyRenderer";
import {
  childStructure,
  selectorMatches,
  TestUtils,
  userEvent,
} from "../../../TestUtils";
import sinon from "sinon";
import { render, screen } from "@testing-library/react";

describe("FlatNonPrimitivePropertyRenderer", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });
  before(async () => {
    await TestUtils.initializeUiComponents();
  });

  it("renders correctly", async () => {
    render(
      <FlatNonPrimitivePropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={TestUtils.createArrayProperty("Pipes", [
          TestUtils.createPrimitiveStringProperty("pipe_1", "Water pipe"),
        ])}
        valueElement={"string[1]"}
        isExpanded={false}
        onExpandToggled={() => {}}
      />
    );

    expect(screen.getByTitle("Pipes (1)")).satisfy(
      selectorMatches(
        [
          ".components-property-record--horizontal",
          ".components-property-record-label",
          ".components-nonprimitive-property-label-renderer",
          ".components-property-label-renderer",
        ].join(" > ")
      )
    );
    expect(screen.getAllByRole("presentation")[0]).not.satisfy(
      childStructure(".components-property-label-renderer-colon")
    );
  });

  it("renders array size in label correctly", async () => {
    render(
      <FlatNonPrimitivePropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={TestUtils.createArrayProperty("Pipes", [
          TestUtils.createPrimitiveStringProperty("pipe_1", "Water pipe"),
          TestUtils.createPrimitiveStringProperty("pipe_2", "Sewage pipe"),
          TestUtils.createPrimitiveStringProperty("pipe_3", "Water pipe"),
        ])}
        valueElement={"string[1]"}
        isExpanded={false}
        onExpandToggled={() => {}}
      />
    );

    expect(screen.getByTitle("Pipes (3)")).to.exist;
  });

  it("Should call onExpandToggled when label is clicked and item is not expanded", async () => {
    const expandSpy = sinon.spy();
    render(
      <FlatNonPrimitivePropertyRenderer
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
        isExpanded={false}
        onExpandToggled={expandSpy}
      />
    );

    expect(expandSpy).toHaveBeenCalledTimes(0);

    await theUserTo.click(screen.getByTitle("House"));
    expect(expandSpy).toHaveBeenCalledTimes(1);

    await theUserTo.click(screen.getByTitle("House"));
    expect(expandSpy).toHaveBeenCalledTimes(2);
  });

  it("Should call onExpandToggled when label is clicked and item is expanded", async () => {
    const expandSpy = sinon.spy();
    render(
      <FlatNonPrimitivePropertyRenderer
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
        isExpanded={true}
        onExpandToggled={expandSpy}
      />
    );

    expect(expandSpy).toHaveBeenCalledTimes(0);

    await theUserTo.click(screen.getByTitle("House"));
    expect(expandSpy).toHaveBeenCalledTimes(1);

    await theUserTo.click(screen.getByTitle("House"));
    expect(expandSpy).toHaveBeenCalledTimes(2);
  });
});
