/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import Settings from "../../../src/widget/tool-settings/Settings";

describe("<Settings />", () => {
  it("should render", () => {
    mount(<Settings />);
  });

  it("renders correctly", () => {
    shallow(<Settings />).should.matchSnapshot();
  });
});
