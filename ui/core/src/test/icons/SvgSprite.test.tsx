/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";
import { SvgSprite } from "../../ui-core";

describe("<SvgSprite />", () => {
  it("should render", () => {
    mount(<SvgSprite src="#test-sprite" />);
  });

  it("renders correctly", () => {
    shallow(<SvgSprite src="#test-sprite" />).should.matchSnapshot();
  });
});
