/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import { mount } from "enzyme";
import sinon from "sinon";
import * as React from "react";
import { Orientation, ElementSeparator } from "@bentley/ui-core";
import TestUtils from "../../TestUtils";
import { PropertyRecord } from "@bentley/imodeljs-frontend";
import { PropertyView } from "../../../ui-components";

describe("PropertyView", () => {
  let propertyRecord: PropertyRecord;

  before(() => {
    propertyRecord = TestUtils.createPrimitiveStringProperty("Label", "Model");

    TestUtils.initializeUiComponents(); // tslint:disable-line:no-floating-promises
  });

  it("renders label and value", () => {
    const propertyRenderer = mount(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        labelElement={"City"}
        valueElement={"Vilnius"}
      />);

    expect(propertyRenderer.find(".components-property-record-label").first().text()).to.be.eq("City");
    expect(propertyRenderer.find(".components-property-record-value").first().text()).to.be.eq("Vilnius");
  });

  it("renders label and value with custom ratio when it's provided", () => {
    const propertyRenderer = mount(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        labelElement={"City"}
        columnRatio={0.6}
      />);

    expect(propertyRenderer.childAt(0).get(0).props.style).to.have.property("gridTemplateColumns", "60% auto");
  });

  it("renders ElementSeparator when orientation is horizontal", () => {
    const propertyRenderer = mount(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        labelElement={"label"}
        onColumnRatioChanged={() => { }}
      />);

    expect(propertyRenderer.childAt(0).hasClass("components-property-record--horizontal"), "class not found").to.be.true;
    expect(propertyRenderer.find(ElementSeparator).first().exists(), "ElementSeparator not found").to.be.true;
    expect(propertyRenderer.childAt(0).get(0).props.style).to.have.property("gridTemplateColumns", "25% 1px auto");
  });

  it("does not render ElementSeparator when onColumnRatioChanged callback is not provided", () => {
    const propertyRenderer = mount(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        labelElement={"label"}
      />);

    expect(propertyRenderer.find(ElementSeparator).first().exists(), "ElementSeparator found").to.be.false;
    expect(propertyRenderer.childAt(0).get(0).props.style).to.have.property("gridTemplateColumns", "25% auto");
  });

  it("does not render ElementSeparator when orientation is vertical", () => {
    const propertyRenderer = mount(
      <PropertyView
        orientation={Orientation.Vertical}
        propertyRecord={propertyRecord}
        labelElement={"label"}
      />);

    expect(propertyRenderer.childAt(0).hasClass("components-property-record--vertical"), "class not found").to.be.true;
    expect(propertyRenderer.find(ElementSeparator).first().exists(), "ElementSeparator found").to.be.false;
    expect(propertyRenderer.childAt(0).get(0).props.style).to.have.property("gridTemplateColumns", "auto");
  });

  it("triggers selection if property gets clicked once", () => {
    const onClick = sinon.spy();

    const propertyRenderer = mount(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        onClick={onClick}
        labelElement={"label"}
      />);

    propertyRenderer.find(".components-property-record--horizontal").first().simulate("click");

    expect(onClick.callCount).to.be.eq(1);
  });

  it("triggers deselection if property gets clicked twice", () => {
    const onClick = sinon.spy();

    const propertyRenderer = mount(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        onClick={onClick}
        labelElement={"label"}
      />);

    const propertyElement = propertyRenderer.find(".components-property-record--horizontal").first();
    propertyElement.simulate("click");
    propertyElement.simulate("click");

    expect(onClick.callCount).to.be.eq(2);
  });

  it("does not throw if property is clicked but onPropertySelected/Deselected props are not supplied", () => {
    const propertyRenderer = mount(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        labelElement={"label"}
      />);

    const propertyElement = propertyRenderer.find(".components-property-record--horizontal").first();
    propertyElement.simulate("click");
    propertyElement.simulate("click");
  });

  it("renders as selected when isSelected prop is true", () => {
    const propertyRenderer = mount(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        isSelected={true}
        labelElement={"label"}
      />);

    expect(propertyRenderer.find(".components--selected").first().exists()).to.be.true;
  });

  it("renders as clickable when onClick prop is given", () => {
    const propertyRenderer = mount(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        onClick={() => { }}
        labelElement={"label"}
      />);

    expect(propertyRenderer.find(".components--clickable").first().exists()).to.be.true;
  });

  it("renders as hoverable when isHoverable prop is true", () => {
    const propertyRenderer = mount(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        labelElement={"label"}
        isHoverable={true}
      />);

    expect(propertyRenderer.find(".components--hoverable").first().exists()).to.be.true;
  });

  it("changes state on hovering if set to hoverable", async () => {
    const propertyRenderer = mount(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        labelElement={"label"}
        isHoverable={true}
      />);
    expect(propertyRenderer.state("isHovered")).to.eq(false);
    propertyRenderer.simulate("mouseenter");
    expect(propertyRenderer.state("isHovered")).to.eq(true);
    propertyRenderer.simulate("mouseleave");
    expect(propertyRenderer.state("isHovered")).to.eq(false);
  });

  it("does not changes state on hovering if not set to hoverable", async () => {
    const propertyRenderer = mount(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        labelElement={"label"}
        isHoverable={false}
      />);
    expect(propertyRenderer.state("isHovered")).to.eq(false);
    propertyRenderer.simulate("mouseenter");
    expect(propertyRenderer.state("isHovered")).to.eq(false);
    propertyRenderer.simulate("mouseleave");
    expect(propertyRenderer.state("isHovered")).to.eq(false);
  });

  it("renders action button list if orientation is horizontal and action button renderers are passed", async () => {
    const propertyRenderer = mount(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        labelElement={"label"}
        onColumnRatioChanged={() => { }}
        actionButtonRenderers={[(_) => undefined]}
      />);
    expect(propertyRenderer.find(".components-property-action-button-list--horizontal").first().exists()).to.be.true;
    expect(propertyRenderer.childAt(0).get(0).props.style).to.have.property("gridTemplateColumns", "25% 1px auto auto");
  });

  it("renders action button list if orientation is vertical and action button renderers are passed", () => {
    const propertyRenderer = mount(
      <PropertyView
        orientation={Orientation.Vertical}
        propertyRecord={propertyRecord}
        labelElement={"label"}
        onColumnRatioChanged={() => { }}
        actionButtonRenderers={[(_) => undefined]}
      />);
    expect(propertyRenderer.find(".components-property-action-button-list--vertical").first().exists()).to.be.true;
    expect(propertyRenderer.childAt(0).get(0).props.style).to.have.property("gridTemplateColumns", "auto auto");
  });

  it("renders only label when property record is non primitive", () => {
    propertyRecord = TestUtils.createStructProperty("StructProperty");
    const propertyRenderer = mount(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        labelElement={"City"}
        valueElement={"Vilnius"}
      />);
    expect(propertyRenderer.find(".components-property-record-label").first().text()).to.be.eq("City");
    expect(propertyRenderer.find(".components-property-record-value").exists()).to.be.false;
  });

  it("calls onContextMenu callback on property right click", () => {
    const callback = sinon.spy();
    const propertyRenderer = mount(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        onContextMenu={callback}
        labelElement={"label"}
      />);
    propertyRenderer.find(".components-property-record--horizontal").first().simulate("contextMenu");
    expect(callback).to.be.calledOnceWith(propertyRecord);
  });

  it("calls onRightClick callback on property right click", () => {
    const callback = sinon.spy();
    const propertyRenderer = mount(
      <PropertyView
        orientation={Orientation.Horizontal}
        propertyRecord={propertyRecord}
        onRightClick={callback}
        labelElement={"label"}
      />);
    propertyRenderer.find(".components-property-record--horizontal").first().simulate("contextMenu");
    expect(callback).to.be.calledOnceWith(propertyRecord);
  });

});
