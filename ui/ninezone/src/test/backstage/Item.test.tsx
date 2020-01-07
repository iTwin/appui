/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { mount, shallow } from "enzyme";
import { BackstageItem, SafeAreaInsets } from "../../ui-ninezone";

describe("<Item />", () => {
  it("should render", () => {
    mount(<BackstageItem />);
  });

  it("renders correctly", () => {
    shallow(<BackstageItem />).should.matchSnapshot();
  });

  it("should apply style", () => {
    shallow(<BackstageItem style={{ backgroundColor: "red" }} />).should.matchSnapshot();
  });

  it("should set is-active class", () => {
    shallow(<BackstageItem isActive />).should.matchSnapshot();
  });

  it("should set is-disabled class", () => {
    shallow(<BackstageItem isDisabled />).should.matchSnapshot();
  });

  it("renders safe area aware correctly", () => {
    shallow(<BackstageItem safeAreaInsets={SafeAreaInsets.All} />).should.matchSnapshot();
  });

  it("should render subtitle", () => {
    shallow(<BackstageItem subtitle="custom subtitle" />).should.matchSnapshot();
  });
});
