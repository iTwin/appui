/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";
import { Dialog } from "../../src/index";
import TestUtils from "../TestUtils";

describe("Dialog", () => {

  before(async () => {
    await TestUtils.initializeUiCore();
  });

  describe("<Dialog />", () => {
    it("should render", () => {
      mount(<Dialog opened={true} />);
    });

    it("renders correctly", () => {
      shallow(<Dialog opened={true} />).should.matchSnapshot();
    });
  });
});
