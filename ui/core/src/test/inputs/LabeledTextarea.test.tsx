/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";
import { LabeledTextarea, InputStatus } from "../../ui-core";

describe("<LabeledTextarea />", () => {
  it("should render", () => {
    mount(<LabeledTextarea label="textarea test" />);
  });

  it("renders correctly", () => {
    shallow(<LabeledTextarea label="textarea test" />).should.matchSnapshot();
  });

  it("renders status correctly", () => {
    shallow(<LabeledTextarea label="textarea test" status={InputStatus.Success} />).should.matchSnapshot();
  });

  it("renders message correctly", () => {
    shallow(<LabeledTextarea label="textarea test" message="Test message" />).should.matchSnapshot();
  });
});
