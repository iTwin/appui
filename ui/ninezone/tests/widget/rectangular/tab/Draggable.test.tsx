/*---------------------------------------------------------------------------------------------
|  $Copyright: (c) 2018 Bentley Systems, Incorporated. All rights reserved. $
 *--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import Draggable from "../../../../src/widget/rectangular/tab/Draggable";

describe("<Draggable />", () => {
  it("should render", () => {
    mount(<Draggable />);
  });

  it("renders correctly", () => {
    shallow(<Draggable />).should.matchSnapshot();
  });
});
