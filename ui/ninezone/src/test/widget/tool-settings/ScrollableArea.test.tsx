/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import { ScrollableArea } from "../../../ui-ninezone";

describe("<ScrollableArea />", () => {
  it("should render", () => {
    mount(<ScrollableArea />);
  });

  it("renders correctly", () => {
    shallow(<ScrollableArea />).should.matchSnapshot();
  });
});
