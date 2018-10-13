/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import Container from "../../../src/zones/target/Container";

describe("<Container />", () => {
  it("should render", () => {
    mount(<Container />);
  });

  it("renders correctly", () => {
    shallow(<Container />).should.matchSnapshot();
  });
});
