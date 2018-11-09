/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import Indicator from "../../..//footer/message-center/Indicator";

describe("<Indicator />", () => {
  it("should render", () => {
    mount(<Indicator />);
  });

  it("renders correctly", () => {
    shallow(<Indicator />).should.matchSnapshot();
  });
});
