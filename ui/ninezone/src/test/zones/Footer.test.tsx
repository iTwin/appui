/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";
import Footer from "../..//zones/Footer";

describe("<Footer />", () => {
  it("should render", () => {
    mount(<Footer bounds={{ bottom: 10, left: 0, right: 10, top: 0 }} />);
  });

  it("renders correctly", () => {
    shallow(<Footer bounds={{ bottom: 10, left: 0, right: 10, top: 0 }} />).should.matchSnapshot();
  });
});
