/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";

import Toolbar, { ToolbarPanelAlignment } from "../..//toolbar/Toolbar";
import { Direction } from "../..//utilities/Direction";

describe("<Toolbar />", () => {
  it("should render", () => {
    mount(<Toolbar />);
  });

  it("renders correctly", () => {
    shallow(<Toolbar />).should.matchSnapshot();
  });

  it("renders with expandsTo", () => {
    shallow(<Toolbar expandsTo={Direction.Right} />).should.matchSnapshot();
  });

  it("renders with panelAlignment", () => {
    shallow(<Toolbar panelAlignment={ToolbarPanelAlignment.End} />).should.matchSnapshot();
  });
});
