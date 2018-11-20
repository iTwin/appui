/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { mount } from "enzyme";
import { expect } from "chai";

import TestUtils from "../TestUtils";
import { ModalFrontstageInfo, FrontstageManager, FrontstageComposer } from "../../";

class TestModalFrontstage implements ModalFrontstageInfo {
  public title: string = "Test Modal Frontstage";

  public get content(): React.ReactNode {
    return (
      <div />
    );
  }

  public get appBarRight(): React.ReactNode {
    return (
      <input type="text" defaultValue="Hello" />
    );
  }
}

describe("FrontstageComposer", () => {

  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  it("FrontstageComposer support of ModalFrontstage", () => {
    FrontstageManager.setActiveFrontstageDef(undefined); // tslint:disable-line:no-floating-promises
    const wrapper = mount(<FrontstageComposer />);

    const modalFrontstage = new TestModalFrontstage();
    FrontstageManager.openModalFrontstage(modalFrontstage);
    expect(FrontstageManager.modalFrontstageCount).to.eq(1);
    wrapper.update();
    expect(wrapper.find("div.modal-frontstage").length).to.eq(1);

    const backButton = wrapper.find("div.nz-toolbar-button-back");
    expect(backButton.length).to.eq(1);
    backButton.simulate("click");
    expect(FrontstageManager.modalFrontstageCount).to.eq(0);
  });

});
