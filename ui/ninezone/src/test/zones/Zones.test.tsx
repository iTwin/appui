/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";
import { Zones } from "../../ui-ninezone/zones/Zones";

describe("<Zones />", () => {
  it("should render", () => {
    mount(<Zones />);
  });

  it("renders correctly", () => {
    shallow(<Zones />).should.matchSnapshot();
  });

  it("renders hidden correctly", () => {
    shallow(<Zones isHidden />).should.matchSnapshot();
  });
});
