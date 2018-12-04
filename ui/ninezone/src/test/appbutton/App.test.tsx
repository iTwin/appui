/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import { AppButton } from "../../ui-ninezone";

describe("<AppButton />", () => {
  it("should render", () => {
    mount(<AppButton />);
  });

  // NEEDSWORK_MODULARIZATION - check for error or update snap.
  it.skip("renders correctly", () => {
    shallow(<AppButton />).should.matchSnapshot();
  });
});
