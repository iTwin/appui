/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { mount, shallow } from "enzyme";
import TestUtils from "../TestUtils";
import { Widget, WidgetState } from "../../ui-framework";

describe("Widget", () => {

  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  it("should render", () => {
    mount(<Widget id="widget" defaultState={WidgetState.Open} applicationData={{ key: "value" }} />);
  });

  it("renders correctly", () => {
    shallow(<Widget id="widget" defaultState={WidgetState.Open} applicationData={{ key: "value" }} />).should.matchSnapshot();
  });

});
