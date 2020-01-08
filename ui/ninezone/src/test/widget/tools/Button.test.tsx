/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";
import { ToolbarButton } from "../../../ui-ninezone";

describe("<ToolbarButton  />", () => {
  it("should render", () => {
    mount(<ToolbarButton />);
  });

  it("renders correctly", () => {
    shallow(<ToolbarButton />).should.matchSnapshot();
  });
});
