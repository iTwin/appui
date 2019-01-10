/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import { NestedGroup } from "../../../../../ui-ninezone";

describe("<NestedGroup />", () => {
  it("should render", () => {
    mount(<NestedGroup />);
  });

  it("renders correctly", () => {
    shallow(<NestedGroup />).should.matchSnapshot();
  });
});
