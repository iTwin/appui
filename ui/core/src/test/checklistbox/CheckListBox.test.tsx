/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { mount, shallow } from "enzyme";
import * as sinon from "sinon";

import { CheckListBox, CheckListBoxItem, CheckListBoxSeparator, Checkbox } from "../../ui-core";

describe("<CheckListBox />", () => {
  it("should render", () => {
    const wrapper = mount(
      <CheckListBox>
        <CheckListBoxItem label="label" />
        <CheckListBoxSeparator />
      </CheckListBox>);
    wrapper.unmount();
  });

  it("renders correctly", () => {
    shallow(
      <CheckListBox>
        <CheckListBoxItem label="label" />
        <CheckListBoxSeparator />
      </CheckListBox>,
    ).should.matchSnapshot();
  });

  it("CheckListBoxItem should call onClick method", () => {
    const spyMethod = sinon.spy();

    const wrapper = mount(
      <CheckListBoxItem label="label" onClick={spyMethod} />,
    );

    const cb = wrapper.find(Checkbox);
    cb.should.exist;
    cb.prop("onClick")!(sinon.stub({} as React.MouseEvent));
    spyMethod.calledOnce.should.true;

    wrapper.unmount();
  });

});
