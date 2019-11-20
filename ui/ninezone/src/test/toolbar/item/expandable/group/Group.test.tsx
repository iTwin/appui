/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import { Group } from "../../../../../ui-ninezone";

describe("<Group />", () => {
  it("should render", () => {
    mount(<Group />);
  });

  it("renders correctly", () => {
    shallow(<Group />).should.matchSnapshot();
  });

  it("renders with title and columns correctly", () => {
    shallow(<Group title="Test" columns={<div>columns</div>} />).should.matchSnapshot();
  });
});
