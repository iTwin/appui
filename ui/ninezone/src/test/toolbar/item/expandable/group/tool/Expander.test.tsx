/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import { GroupToolExpander } from "../../../../../../ui-ninezone";

describe("<GroupToolExpander />", () => {
  it("should render", () => {
    mount(<GroupToolExpander />);
  });

  it("renders correctly", () => {
    shallow(<GroupToolExpander />).should.matchSnapshot();
  });
});
