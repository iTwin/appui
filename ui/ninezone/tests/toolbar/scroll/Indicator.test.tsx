/*---------------------------------------------------------------------------------------------
|  $Copyright: (c) 2018 Bentley Systems, Incorporated. All rights reserved. $
 *--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import Indicator from "@src/toolbar/scroll/Indicator";

describe("<Indicator />", () => {
  it("should render", () => {
    mount(<Indicator />);
  });

  it("renders correctly", () => {
    shallow(<Indicator />).should.matchSnapshot();
  });
});
