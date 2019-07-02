/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";
import { TabSeparator } from "../../../../ui-ninezone";

describe("<TabSeparator />", () => {
  it("should render", () => {
    mount(<TabSeparator />);
  });

  it("renders correctly", () => {
    shallow(<TabSeparator />).should.matchSnapshot();
  });

  it("renders horizontal correctly", () => {
    shallow(<TabSeparator isHorizontal />).should.matchSnapshot();
  });
});
