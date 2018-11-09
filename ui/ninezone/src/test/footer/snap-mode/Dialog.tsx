/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import Dialog from "../../..//footer/snap-mode/Dialog";

describe("<Dialog />", () => {
  it("should render", () => {
    mount(<Dialog />);
  });

  it("renders correctly", () => {
    shallow(<Dialog />).should.matchSnapshot();
  });
});
