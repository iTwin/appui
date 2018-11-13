/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import MouseTracker from "../..//context/MouseTracker";

describe("<MouseTracker />", () => {
  it("should render", () => {
    mount(<MouseTracker />);
  });

  it("renders correctly", () => {
    shallow(<MouseTracker />).should.matchSnapshot();
  });
});
