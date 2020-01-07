/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import TestUtils from "../TestUtils";
import { DragDropLayerManager, DragDropLayerRenderer } from "../../ui-framework";
import { BeDragDropContext } from "@bentley/ui-components";

describe("DragDropLayerManager", () => {

  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  it("getType returns undefined when no type set", () => {
    expect(DragDropLayerManager.getType()).to.be.undefined;
  });

  it("getActiveLayer returns undefined when no type set", () => {
    expect(DragDropLayerManager.getActiveLayer()).to.be.undefined;
  });

  it("DragDropLayerRenderer should render", () => {
    const wrapper = mount(
      <BeDragDropContext>
        <DragDropLayerRenderer />
      </BeDragDropContext>);
    wrapper.unmount();
  });

  // NEEDSWORK: setType, registerTypeLayer, DragDropLayerRenderer

});
