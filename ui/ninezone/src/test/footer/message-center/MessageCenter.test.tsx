/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import { MessageCenter } from "../../../ui-ninezone";

describe("<MessageCenter />", () => {
  it("should render", () => {
    mount(<MessageCenter />);
  });

  it("renders correctly", () => {
    shallow(<MessageCenter />).should.matchSnapshot();
  });
});
