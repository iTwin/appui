/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";
import { Div } from "../../ui-core";

describe("Div", () => {

  it("should render", () => {
    mount(<Div />);
  });

  it("renders correctly", () => {
    shallow(<Div />).should.matchSnapshot();
  });

});
