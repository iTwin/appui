/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import Title from "../../../../..//toolbar/item/expandable/group/Title";

describe("<Title />", () => {
  it("should render", () => {
    mount(<Title />);
  });

  it("renders correctly", () => {
    shallow(<Title />).should.matchSnapshot();
  });
});
