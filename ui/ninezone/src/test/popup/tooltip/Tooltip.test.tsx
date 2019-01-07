/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import { Tooltip } from "../../../ui-ninezone";

describe("<Tooltip />", () => {
  it("should render", () => {
    mount(<Tooltip />);
  });

  it("renders correctly", () => {
    shallow(<Tooltip />).should.matchSnapshot();
  });
});
