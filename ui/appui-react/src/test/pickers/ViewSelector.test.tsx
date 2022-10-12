/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import { shallow } from "enzyme";
import * as React from "react";
import * as moq from "typemoq";
import { IModelConnection } from "@itwin/core-frontend";
import { ViewSelector } from "../../appui-react";
import TestUtils, { mount } from "../TestUtils";
import { Provider } from "react-redux";
import { ToolbarItemContext } from "@itwin/components-react";

// cSpell:ignore Spatials

describe("ViewSelector", () => {
  const imodelMock = moq.Mock.ofType<IModelConnection>();
  const imodelMock2 = moq.Mock.ofType<IModelConnection>();

  before(async () => {
    await TestUtils.initializeUiFramework();
    await TestUtils.flushAsyncOperations();
  });

  after(async () => {
    await TestUtils.flushAsyncOperations();
    TestUtils.terminateUiFramework();
  });

  it("should render correctly", () => {
    const wrapper = shallow(
      <Provider store={TestUtils.store}>
        <ViewSelector imodel={imodelMock.object} />
      </Provider>
    );
    wrapper.should.matchSnapshot();
  });

  it("should set Show settings by ViewSelector.updateShowSettings", () => {
    const wrapper = mount(
      <Provider store={TestUtils.store}>
        <ToolbarItemContext.Provider
          value={{
            hasOverflow: false,
            useHeight: false,
            onResize: () => { },
          }}
        >
          <ViewSelector imodel={imodelMock.object} listenForShowUpdates={true} />
        </ToolbarItemContext.Provider>
      </Provider>
    );
    const vs = wrapper.find(ViewSelector);
    expect(vs).to.not.be.undefined;

    expect(vs.state("showSpatials")).to.be.true;
    expect(vs.state("showDrawings")).to.be.true;
    expect(vs.state("showSheets")).to.be.true;
    expect(vs.state("showUnknown")).to.be.true;

    ViewSelector.updateShowSettings(false, false, false, false);

    expect(vs.state("showSpatials")).to.be.false;
    expect(vs.state("showDrawings")).to.be.false;
    expect(vs.state("showSheets")).to.be.false;
    expect(vs.state("showUnknown")).to.be.false;
  });

  it("should trigger componentDidUpdate processing", async () => {
    const wrapper = mount(
      <Provider store={TestUtils.store}>
        <ToolbarItemContext.Provider
          value={{
            hasOverflow: false,
            useHeight: false,
            onResize: () => { },
          }}
        >
          <ViewSelector imodel={imodelMock.object} />
        </ToolbarItemContext.Provider>
      </Provider>
    );
    wrapper.setProps({ imodel: imodelMock2.object });
    await TestUtils.flushAsyncOperations();
  });
});
