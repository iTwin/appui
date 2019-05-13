/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";
import { Zone } from "../../ui-ninezone";

describe("<Zone />", () => {
  it("should render", () => {
    mount(<Zone bounds={{ bottom: 10, left: 0, right: 10, top: 0 }} />);
  });

  it("renders correctly", () => {
    shallow(<Zone bounds={{ bottom: 10, left: 0, right: 10, top: 0 }} />).should.matchSnapshot();
  });

  it("renders correctly in footer mode", () => {
    shallow(<Zone bounds={{ bottom: 10, left: 0, right: 10, top: 0 }} isInFooterMode />).should.matchSnapshot();
  });
});
