/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";
import { Draggable } from "../../../../ui-ninezone";
import { HorizontalAnchor } from "../../../../ui-ninezone/widget/Stacked";
import { TabMode } from "../../../../ui-ninezone/widget/rectangular/tab/Tab";

describe("<Draggable />", () => {
  it("should render", () => {
    mount(<Draggable
      anchor={HorizontalAnchor.Left}
      mode={TabMode.Open}
    />);
  });

  it("renders correctly", () => {
    shallow(<Draggable
      anchor={HorizontalAnchor.Left}
      mode={TabMode.Open}
    />).should.matchSnapshot();
  });
});
