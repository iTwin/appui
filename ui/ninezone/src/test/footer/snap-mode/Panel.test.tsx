/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";
import { SnapModePanel } from "../../../ui-ninezone";

describe("<SnapModePanel />", () => {
  it("should render", () => {
    mount(<SnapModePanel />);
  });

  it("renders correctly", () => {
    shallow(<SnapModePanel />).should.matchSnapshot();
  });
});
