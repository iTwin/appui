/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { ZoneTarget } from "../../../ui-ninezone/zones/target/Target";

describe("<ZoneTarget />", () => {
  it("should render", () => {
    mount(<ZoneTarget />);
  });

  it("renders correctly", () => {
    shallow(<ZoneTarget />).should.matchSnapshot();
  });

  it("should invoke onTargetChanged handler when mouse enters", () => {
    const spy = sinon.spy();
    const sut = mount(<ZoneTarget onTargetChanged={spy} />);
    const target = sut.find(".nz-zones-target-target div");
    target.simulate("mouseEnter");
    spy.calledOnceWithExactly(true).should.true;
  });

  it("should invoke onTargetChanged handler when mouse leaves", () => {
    const spy = sinon.spy();
    const sut = mount(<ZoneTarget onTargetChanged={spy} />);
    const target = sut.find(".nz-zones-target-target div");
    target.simulate("mouseLeave");
    spy.calledOnceWithExactly(false).should.true;
  });

  it("should invoke onTargetChanged handler when component unmounts", () => {
    const spy = sinon.spy();
    const sut = mount(<ZoneTarget onTargetChanged={spy} />);
    const target = sut.find(".nz-zones-target-target div");
    target.simulate("mouseEnter");
    sut.unmount();
    spy.firstCall.calledWithExactly(true).should.true;
    spy.secondCall.calledWithExactly(false).should.true;
  });
});
