/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import { Temporary } from "../../../ui-ninezone";

describe("<Temporary />", () => {
  it("should render", () => {
    mount(<Temporary />);
  });

  it("renders correctly", () => {
    shallow(<Temporary />).should.matchSnapshot();
  });
});
