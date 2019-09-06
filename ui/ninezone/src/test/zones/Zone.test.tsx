/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";
import { Zone, SafeAreaInsets } from "../../ui-ninezone";

describe("<Zone />", () => {
  it("should render", () => {
    mount(<Zone id={1} />);
  });

  it("renders correctly", () => {
    shallow(<Zone id={1} />).should.matchSnapshot();
  });

  it("renders correctly positioned", () => {
    mount(<Zone id={1} bounds={{ bottom: 10, left: 0, right: 10, top: 0 }} />);
  });

  it("renders correctly in footer mode", () => {
    shallow(<Zone id={1} isInFooterMode />).should.matchSnapshot();
  });

  it("renders floating correctly", () => {
    shallow(<Zone id={1} isFloating />).should.matchSnapshot();
  });

  it("renders hidden correctly", () => {
    shallow(<Zone id={1} isHidden />).should.matchSnapshot();
  });

  it("renders safe area aware correctly", () => {
    shallow(<Zone id={1} safeAreaInsets={SafeAreaInsets.All} />).should.matchSnapshot();
  });
});
