/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";
import { Subheading } from "../../ui-core";

describe("<Subheading />", () => {
  it("should render", () => {
    mount(<Subheading />);
  });
  it("renders correctly", () => {
    shallow(<Subheading />).should.matchSnapshot();
  });

  it("content renders correctly", () => {
    shallow(<Subheading>Test content</Subheading>).should.matchSnapshot();
  });

  it("has correct className", () => {
    const wrapper = shallow(<Subheading />);
    wrapper.find(".uicore-text-subheading").should.exist;
  });

  it("has correct text", () => {
    const wrapper = shallow(<Subheading>Test Content</Subheading>);
    wrapper.find(".uicore-text-subheading").text().should.equal("Test Content");
  });
});
