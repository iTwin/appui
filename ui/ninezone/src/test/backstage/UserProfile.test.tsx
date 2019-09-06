/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";
import { UserProfile, SafeAreaInsets } from "../../ui-ninezone";

describe("<UserProfile />", () => {
  it("should render", () => {
    mount(<UserProfile />);
  });

  it("renders correctly", () => {
    shallow(<UserProfile />).should.matchSnapshot();
  });

  it("renders safe area aware correctly", () => {
    shallow(<UserProfile safeAreaInsets={SafeAreaInsets.All} />).should.matchSnapshot();
  });
});
