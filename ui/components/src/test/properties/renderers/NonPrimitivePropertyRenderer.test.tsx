/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import { mount } from "enzyme";
import * as React from "react";
import { Orientation } from "@bentley/ui-core";
import TestUtils from "../../TestUtils";
import { NonPrimitivePropertyRenderer } from "../../../ui-components/properties/renderers/NonPrimitivePropertyRenderer";
import { NonPrimitivePropertyLabelRenderer, PrimitivePropertyLabelRenderer } from "../../../ui-components";
import { PropertyRenderer } from "../../../ui-components/properties/renderers/PropertyRenderer";

describe("NonPrimitivePropertyRenderer", () => {
  before(async () => {
    await TestUtils.initializeUiComponents();
  });

  it("renders correctly", async () => {
    const rendererMount = mount(
      <NonPrimitivePropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={TestUtils.createArrayProperty("Pipes", [TestUtils.createPrimitiveStringProperty("pipe_1", "Water pipe")])}
        valueElement={"string[1]"}
        isCollapsible={true}
      />);

    await TestUtils.flushAsyncOperations();

    const labelRenderer = rendererMount.find(NonPrimitivePropertyLabelRenderer);
    expect(labelRenderer.exists()).to.be.true;
    expect(labelRenderer.html().indexOf("Pipes")).to.be.greaterThan(-1);

    expect(rendererMount.find(PropertyRenderer).exists()).to.be.false;
  });

  it("renders as expanded if isCollapsible is not set", () => {
    const rendererMount = mount(
      <NonPrimitivePropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={
          TestUtils.createArrayProperty(
            "Pipes", [
              TestUtils.createPrimitiveStringProperty("pipe_1", "Water pipe"),
              TestUtils.createPrimitiveStringProperty("pipe_2", "Sewage pipe"),
            ])}
      />);

    expect(rendererMount.find(PropertyRenderer).length).to.be.be.eq(3); // Length property + 2 items
  });

  it("changes component state from collapsed to expanded when label is clicked", () => {
    const rendererMount = mount(
      <NonPrimitivePropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={
          TestUtils.createStructProperty(
            "House", {
              building: TestUtils.createPrimitiveStringProperty("Building", "Residential"),
              street: TestUtils.createPrimitiveStringProperty("Street", "Glass st."),
            })}
        isCollapsible={true}
      />);

    expect(rendererMount.find(PropertyRenderer).length).to.be.be.eq(0);

    rendererMount.find(NonPrimitivePropertyLabelRenderer).simulate("click");

    expect(rendererMount.find(PropertyRenderer).length).to.be.be.eq(2);

    rendererMount.find(NonPrimitivePropertyLabelRenderer).simulate("click");

    expect(rendererMount.find(PropertyRenderer).length).to.be.be.eq(0);
  });

  it("does not render base struct properties", async () => {
    const baseStruct = { value: TestUtils.createPrimitiveStringProperty("Size", "Huge") };
    const struct = Object.create(baseStruct);
    struct.label = TestUtils.createPrimitiveStringProperty("Title", "Model");

    const structProperty = TestUtils.createStructProperty("NameStruct", struct);

    const rendererMount = mount(
      <NonPrimitivePropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={structProperty}
      />);

    await TestUtils.flushAsyncOperations();

    const propertyRenderer = rendererMount.find(PropertyRenderer);
    expect(propertyRenderer.length).to.be.eq(1);
    expect(propertyRenderer.find(".components-property-record-label").html().indexOf("Title")).to.be.greaterThan(-1);
    expect(propertyRenderer.find(".components-property-record-value").text()).to.be.eq("Model");
  });

  it("renders property with an offset when indentation is more than 0", () => {
    const rendererMount = mount(
      <NonPrimitivePropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={TestUtils.createArrayProperty("Pipes")}
        indentation={1}
      />);

    expect(rendererMount.find(PrimitivePropertyLabelRenderer).get(0).props.offset).to.be.greaterThan(0);
  });

  it("uses unique key as a template in naming array/struct items", () => {
    const rendererMount = mount(
      <NonPrimitivePropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={TestUtils.createArrayProperty("Pipes")}
        uniqueKey="unique_key"
      />);

    expect(rendererMount.find(PropertyRenderer).at(0).key()).to.be.eq("unique_key_array_length");
  });

  it("renders as expanded if property should be automatically expanded", () => {
    const structProperty = TestUtils.createStructProperty(
      "House", {
        building: TestUtils.createPrimitiveStringProperty("Building", "Residential"),
        street: TestUtils.createPrimitiveStringProperty("Street", "Glass st."),
      });
    structProperty.autoExpand = true;

    const rendererMount = mount(
      <NonPrimitivePropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={structProperty}
        isCollapsible={true}
      />);

    expect(rendererMount.find(PropertyRenderer).length).to.be.be.eq(2);
  });
});
