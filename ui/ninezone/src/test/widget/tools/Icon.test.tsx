/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";
import { ToolbarIcon } from "../../../ui-ninezone";

describe("<ToolbarIcon  />", () => {
  it("should render", () => {
    mount(<ToolbarIcon />);
  });

  it("renders correctly", () => {
    shallow(<ToolbarIcon />).should.matchSnapshot();
  });
});
