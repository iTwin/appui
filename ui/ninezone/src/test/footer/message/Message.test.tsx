/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import { Message, Status } from "../../../ui-ninezone";

describe("<Message />", () => {
  it("should render", () => {
    mount(<Message status={Status.Error} />);
  });

  it("renders correctly", () => {
    shallow(<Message status={Status.Error} />).should.matchSnapshot();
  });

  it("renders correctly with icon", () => {
    shallow(<Message status={Status.Error} icon={<i></i>} />).should.matchSnapshot();
  });
});
