/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";
import { Merge } from "../../../ui-ninezone";

describe("<Merge />", () => {
  it("should render", () => {
    mount(<Merge />);
  });

  it("renders correctly", () => {
    shallow(<Merge />).should.matchSnapshot();
  });
});
