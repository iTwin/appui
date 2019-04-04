/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import { ToolSettings } from "../../ui-ninezone";

describe("<ToolSettings />", () => {
  it("should render", () => {
    mount(<ToolSettings />);
  });

  it("renders correctly", () => {
    shallow(<ToolSettings />).should.matchSnapshot();
  });
});
