/*---------------------------------------------------------------------------------------------
|  $Copyright: (c) 2018 Bentley Systems, Incorporated. All rights reserved. $
 *--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import ScrollableArea from "@src/widget/tool-settings/settings/popover/ScrollableArea";

describe("<ScrollableArea />", () => {
  it("should render", () => {
    mount(<ScrollableArea />);
  });

  it("renders correctly", () => {
    shallow(<ScrollableArea />).should.matchSnapshot();
  });
});
